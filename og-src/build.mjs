// Renders og-src/template.html to assets/og-nl.png and assets/og-en.png
// (1200x630) with a locally installed Chrome or Edge in headless mode.
// No npm dependencies. Usage, from the repo root:  node og-src/build.mjs
// Set CHROME_PATH to use a browser outside the default install locations.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to the browser executable.');
  process.exit(1);
}

for (const lang of ['nl', 'en']) {
  const out = join(root, 'assets', `og-${lang}.png`);
  const url = `${pathToFileURL(join(root, 'og-src', 'template.html')).href}?lang=${lang}`;
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${WIDTH},${HEIGHT}`,
    '--virtual-time-budget=2000',
    `--screenshot=${out}`,
    url,
  ], { stdio: 'ignore' });

  // PNG header: width and height are big-endian uint32s at byte 16 and 20.
  const png = readFileSync(out);
  const w = png.readUInt32BE(16);
  const h = png.readUInt32BE(20);
  if (w !== WIDTH || h !== HEIGHT) {
    console.error(`${out} is ${w}x${h}, expected ${WIDTH}x${HEIGHT}`);
    process.exit(1);
  }
  console.log(`${out}  ${w}x${h}  ${(png.length / 1024).toFixed(0)} KB`);
}
