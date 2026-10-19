'use strict';
const crypto = require('crypto');

const API = () => (process.env.GITHUB_API || 'https://api.github.com').replace(/\/+$/, '');

function cfg() {
  const repo = process.env.GITHUB_REPO, token = process.env.GITHUB_TOKEN, pass = process.env.ADMIN_PASSWORD;
  if (!repo || !token || !pass) return { error: 'Server is not configured: set ADMIN_PASSWORD, GITHUB_TOKEN and GITHUB_REPO in Vercel.' };
  const dir = (process.env.SITE_DIR || '').replace(/^\/+|\/+$/g, '');
  return { repo, token, pass, branch: process.env.GITHUB_BRANCH || 'main', prefix: dir ? dir + '/' : '' };
}

function safeEqual(a, b) {
  const A = crypto.createHash('sha256').update(String(a)).digest();
  const B = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(A, B);
}

async function authorize(req, res) {
  const c = cfg();
  if (c.error) { res.status(500).json({ error: c.error }); return null; }
  const given = req.headers['x-admin-password'] || '';
  if (!safeEqual(given, c.pass)) {
    await new Promise(r => setTimeout(r, 800));
    res.status(401).json({ error: 'Wrong password.' });
    return null;
  }
  return c;
}

async function gh(c, method, path, body) {
  const r = await fetch(API() + path, {
    method,
    headers: {
      Authorization: 'Bearer ' + c.token,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'wuxiaodong-admin',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await r.text();
  let json = null; try { json = text ? JSON.parse(text) : null; } catch (e) {}
  return { status: r.status, ok: r.ok, json, text };
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  const chunks = []; for await (const ch of req) chunks.push(ch);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch (e) { return {}; }
}

// Light structural validation so a bad save cannot break the public site.
function validateContent(d) {
  if (!d || typeof d !== 'object') return 'Content must be an object.';
  for (const k of ['site', 'about', 'video']) if (!d[k] || typeof d[k] !== 'object') return 'Missing section: ' + k;
  for (const k of ['works', 'exhibitions', 'news']) if (!Array.isArray(d[k])) return 'Section must be a list: ' + k;
  for (const w of d.works) if (!w || typeof w !== 'object' || !w.image) return 'Every work needs an image.';
  if (d.concept != null) { if (typeof d.concept !== 'object' || (d.concept.sections != null && !Array.isArray(d.concept.sections))) return 'Concept section is malformed.'; for (const sc of (d.concept.sections || [])) if (!sc || typeof sc !== 'object' || (sc.items != null && !Array.isArray(sc.items))) return 'Concept section is malformed.'; }
  const bad = u => u && !/^(https?:\/\/|mailto:|\/|images\/|media\/)/i.test(u);
  for (const x of d.exhibitions) { if (bad(x.link)) return 'Invalid link in exhibitions.'; if (x.start && !/^\d{4}-\d{2}-\d{2}$/.test(x.start)) return 'Dates must look like 2026-05-30.'; if (x.end && !/^\d{4}-\d{2}-\d{2}$/.test(x.end)) return 'Dates must look like 2026-05-30.'; }
  for (const x of d.news) if (bad(x.link)) return 'Invalid link in news.';
  if (bad(d.site.instagram)) return 'Invalid Instagram link.';
  return null;
}

module.exports = { cfg, authorize, gh, readBody, validateContent };
