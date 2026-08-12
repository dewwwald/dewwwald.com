import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const deployDir = resolve(rootDir, '..', 'dewwwald.github.io');
const buildDir = join(rootDir, 'dist', 'dewwwald-github-io', 'browser');
const commitMessage = process.argv.slice(2).join(' ') || 'Deploy profile site updates';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? rootDir,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }

  return result.stdout?.trim() ?? '';
}

if (!existsSync(deployDir)) {
  throw new Error(`Expected adjacent GitHub Pages repository at ${deployDir}`);
}

run('npm', ['run', 'build:github-pages']);

if (!existsSync(join(buildDir, 'index.html'))) {
  throw new Error(`Expected build output at ${buildDir}`);
}

run('rsync', ['-a', '--delete', '--exclude', '.git', '--exclude', 'CNAME', `${buildDir}/`, `${deployDir}/`]);

const status = run('git', ['status', '--short'], { cwd: deployDir, capture: true });

if (!status) {
  console.log('No GitHub Pages changes to deploy.');
  process.exit(0);
}

run('git', ['add', '.'], { cwd: deployDir });
run('git', ['commit', '-m', commitMessage], { cwd: deployDir });
run('git', ['push', 'origin', 'main'], { cwd: deployDir });

console.log(`Deployed ${deployDir} to origin/main.`);
