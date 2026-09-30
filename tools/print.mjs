// Renders the printable PDFs with a locally installed Chrome or Edge in headless mode:
//   tools/baby-logboek.html -> assets/baby-logboek.pdf
//   tools/baby-log.html     -> assets/baby-log.pdf (US Letter)
// No npm dependencies. Usage, from the repo root:  node tools/print.mjs
// Set CHROME_PATH to use a browser outside the default install locations.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const JOBS = [
  ['baby-logboek.html', 'baby-logboek.pdf'],
  ['baby-log.html', 'baby-log.pdf'],
];

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

for (const [src, dest] of JOBS) {
  const out = join(root, 'assets', dest);
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=2000',
    `--print-to-pdf=${out}`,
    pathToFileURL(join(root, 'tools', src)).href,
  ], { stdio: 'ignore' });

  // Count pages as a sanity check: each page object has "/Type /Page" (not "/Pages").
  const pdf = readFileSync(out).toString('latin1');
  const pages = (pdf.match(/\/Type\s*\/Page(?!s)/g) || []).length;
  console.log(`${out}  ${pages} page(s)  ${(pdf.length / 1024).toFixed(0)} KB`);
}
