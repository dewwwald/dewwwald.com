import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = join('dist', 'dewwwald-github-io', 'browser');
const indexPath = join(outputDir, 'index.html');
const fallbackPath = join(outputDir, '404.html');

if (!existsSync(indexPath)) {
  throw new Error(`Expected Angular build output at ${indexPath}`);
}

copyFileSync(indexPath, fallbackPath);
console.log(`Created GitHub Pages SPA fallback at ${fallbackPath}`);
