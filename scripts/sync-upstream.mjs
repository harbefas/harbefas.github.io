// Refresh src/data/upstream.json from the one list that is maintained by hand.
//
// The upstream PRs live in the personal site (site/src/data/portfolio.js),
// published at nicholas-velten.xyz/api/resume.json with written descriptions.
// This site used to keep its own copy; the two drifted. Now it only reads.
//
// The open-PR count comes from GitHub, because nobody maintains it by hand.
// Every failure keeps the committed file: a flaky network never breaks a deploy.
//
// Also warns about merged PRs on GitHub that the hand list is missing. Search
// by author misses PRs a maintainer re-opened under their own name, so the
// check only ever adds a warning, never removes anything.
import { readFileSync, writeFileSync } from 'node:fs';

const RESUME = 'https://nicholas-velten.xyz/api/resume.json';
const AUTHOR = 'nfvelten';
const OWN = ['nfvelten', 'harbefas'];
const OUT = new URL('../src/data/upstream.json', import.meta.url);

const previous = JSON.parse(readFileSync(OUT, 'utf8'));

async function github(q) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const own = OWN.map((o) => `-user:${o}`).join(' ');
  const url = `https://api.github.com/search/issues?per_page=100&q=${encodeURIComponent(`type:pr author:${AUTHOR} ${own} ${q}`)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub search ${res.status}`);
  return res.json();
}

let resume;
try {
  const res = await fetch(RESUME);
  if (!res.ok) throw new Error(`${RESUME} ${res.status}`);
  resume = await res.json();
} catch (err) {
  console.warn(`sync-upstream: ${err.message}; keeping the committed list`);
  process.exit(0);
}

const contributions = resume.contributions;
const upstream = contributions.map((c) => ({
  name: c.project,
  repo: c.repo,
  what: c.prs[0].description,
  prs: c.prs.length,
}));

let open = previous.counts.open;
try {
  open = (await github('is:open')).total_count;
  const listed = new Set(contributions.flatMap((c) => c.prs.map((p) => p.href)));
  for (const pr of (await github('is:merged')).items) {
    if (!listed.has(pr.html_url)) console.warn(`sync-upstream: merged but not listed: ${pr.html_url}`);
  }
} catch (err) {
  console.warn(`sync-upstream: ${err.message}; keeping open count ${open}`);
}

const data = {
  source: RESUME,
  counts: { merged: upstream.reduce((n, u) => n + u.prs, 0), open, projects: upstream.length },
  upstream,
};
writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
console.log(`sync-upstream: ${data.counts.merged} merged, ${open} open, ${data.counts.projects} projects`);
