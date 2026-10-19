'use strict';
const { authorize, gh } = require('./_lib');

// Returns the latest content.json straight from GitHub (not the possibly stale deployed copy).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only.' });
  const c = await authorize(req, res); if (!c) return;
  const r = await gh(c, 'GET', `/repos/${c.repo}/contents/content.json?ref=${encodeURIComponent(c.branch)}`);
  if (!r.ok) return res.status(502).json({ error: 'GitHub said ' + r.status + '. Check GITHUB_REPO, GITHUB_BRANCH and the token.' });
  const content = JSON.parse(Buffer.from(r.json.content, 'base64').toString('utf8'));
  res.status(200).json({ content, sha: r.json.sha });
};
