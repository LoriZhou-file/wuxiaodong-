'use strict';
const { authorize, gh, readBody, validateContent } = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only.' });
  const c = await authorize(req, res); if (!c) return;
  const body = await readBody(req);
  const err = validateContent(body.content);
  if (err) return res.status(400).json({ error: err });

  const path = `/repos/${c.repo}/contents/${c.prefix}content.json`;
  const cur = await gh(c, 'GET', `${path}?ref=${encodeURIComponent(c.branch)}`);
  if (!cur.ok) return res.status(502).json({ error: 'Could not read current content (GitHub ' + cur.status + ').' });
  // Refuse to overwrite edits made elsewhere since this editor loaded.
  if (body.baseSha && body.baseSha !== cur.json.sha) {
    return res.status(409).json({ error: 'The content was changed elsewhere. Reload the editor and try again.' });
  }
  const text = JSON.stringify(body.content, null, 2) + '\n';
  const put = await gh(c, 'PUT', path, {
    message: 'Update site content via admin',
    content: Buffer.from(text, 'utf8').toString('base64'),
    sha: cur.json.sha,
    branch: c.branch
  });
  if (!put.ok) return res.status(502).json({ error: 'GitHub refused the save (' + put.status + '). The token needs Contents: read and write.' });
  res.status(200).json({ ok: true, sha: put.json.content.sha });
};
