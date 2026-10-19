'use strict';
const { authorize, gh, readBody } = require('./_lib');

// Accepts a JPEG/PNG/WebP as base64 (resized in the browser) and commits it to images/uploads/.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only.' });
  const c = await authorize(req, res); if (!c) return;
  const b = await readBody(req);
  const m = /^[A-Za-z0-9+/=]+$/.test(b.data || '') ? 1 : 0;
  if (!m) return res.status(400).json({ error: 'Missing image data.' });
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[b.type];
  if (!ext) return res.status(400).json({ error: 'Only JPEG, PNG or WebP images.' });
  if (b.data.length > 4.2 * 1024 * 1024) return res.status(413).json({ error: 'Image too large. Try a smaller one.' });
  const base = String(b.name || 'image').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'image';
  const rel = `images/uploads/${Date.now()}-${base}.${ext}`;
  const put = await gh(c, 'PUT', `/repos/${c.repo}/contents/${c.prefix}${rel}`, {
    message: 'Upload image via admin', content: b.data, branch: c.branch
  });
  if (!put.ok) return res.status(502).json({ error: 'GitHub refused the upload (' + put.status + ').' });
  res.status(200).json({ ok: true, path: rel });
};
