import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Runs as a `pre*` hook before both `npm start` and `npm run build:github-pages`
// (see package.json), so the article-post page's "created"/"edited" dates are
// always read straight from git history instead of hand-maintained strings
// that go stale the moment someone forgets to update them.
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const postDirs = [
  { dir: join(rootDir, 'src', 'assets', 'posts'), gitPrefix: 'src/assets/posts' },
  { dir: join(rootDir, 'src', 'assets', 'draft-posts'), gitPrefix: 'src/assets/draft-posts' },
];
const outFile = join(rootDir, 'src', 'generated', 'post-dates.json');

function commitDatesFor(relativePath) {
  const result = spawnSync(
    'git',
    ['log', '--follow', '--format=%ad', '--date=short', '--', relativePath],
    { cwd: rootDir, encoding: 'utf8' },
  );
  if (result.status !== 0 || !result.stdout) {
    return [];
  }
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// Uncommitted (or untracked) files have no git history yet - fall back to
// the file's own mtime so a brand-new draft still shows a sane date instead
// of nothing.
function fallbackDate(absolutePath) {
  return statSync(absolutePath).mtime.toISOString().slice(0, 10);
}

const dates = {};

for (const { dir, gitPrefix } of postDirs) {
  if (!existsSync(dir)) {
    continue;
  }
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) {
      continue;
    }
    const slug = file.replace(/\.md$/, '');
    const commits = commitDatesFor(`${gitPrefix}/${file}`);

    if (commits.length === 0) {
      dates[slug] = { createdAt: fallbackDate(join(dir, file)) };
      continue;
    }

    // git log lists newest first, so the oldest entry (created) is last.
    const createdAt = commits[commits.length - 1];
    const updatedAt = commits[0];
    dates[slug] = updatedAt === createdAt ? { createdAt } : { createdAt, updatedAt };
  }
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`Wrote post dates for ${Object.keys(dates).length} post(s) to ${outFile}`);
