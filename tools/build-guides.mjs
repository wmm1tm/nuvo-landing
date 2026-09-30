// Bouwt de gids- en hulpmiddelpagina's van nuvoapp.nl (NL + EN) uit tools/guides.mjs, plus
// sitemap.xml (ook de bestaande pagina's). De startpagina's en privacypagina's blijven met de
// hand geschreven. Geen npm-pakketten. Gebruik, vanuit de repo-map:
//   node tools/build-guides.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FORMULA, GUIDES, GUIDE_PAIRS, TOOL_LINKS } from './guides.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://nuvoapp.nl';
const CONTACT = 'wmtmbu@proton.me';
const LOCALE = { nl: 'nl_NL', en: 'en_US' };
// Staat Nuvo live? Vul hier het App Store-ID in (6813427228), dan krijgen de gidsen een App
// Store-knop en de Safari-smartbanner. Leeg = het label "Binnenkort in de App Store", net als de
// startpagina nu.
const APP_STORE_ID = '';

const T = {
  nl: {
    soon: 'Binnenkort in de App Store',
    soonNote: 'Voor iPhone. De knop verschijnt zodra de nieuwe versie live staat.',
    store: 'Probeer 7 dagen gratis',
    storeNote: 'Download in de App Store · geen account nodig',
    privacy: 'Privacybeleid',
    contact: 'Contact',
    home: 'Naar de startpagina',
    honest: 'Nuvo is een logboek, geen medisch advies. Twijfel je over de gezondheid van je baby? Neem contact op met het consultatiebureau of je huisarts.',
  },
  en: {
    soon: 'Coming soon to the App Store',
    soonNote: 'For iPhone. The button appears as soon as the new version is live.',
    store: 'Try 7 days free',
    storeNote: 'Download on the App Store · no account needed',
    privacy: 'Privacy policy',
    contact: 'Contact',
    home: 'Back to the home page',
    honest: "Nuvo is a logbook, not medical advice. Worried about your baby's health? Contact your health visitor, paediatrician or doctor.",
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(g, pairs) {
  const url = `${SITE}/${g.lang}/${pairs[g.lang]}`;
  const other = g.lang === 'nl' ? 'en' : 'nl';
  return `<!DOCTYPE html>
<html lang="${g.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(g.title)}</title>
<meta name="description" content="${esc(g.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="nl" href="${SITE}/nl/${pairs.nl}">
<link rel="alternate" hreflang="en" href="${SITE}/en/${pairs.en}">
<link rel="alternate" hreflang="x-default" href="${SITE}/en/${pairs.en}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Nuvo">
<meta property="og:locale" content="${LOCALE[g.lang]}">
<meta property="og:locale:alternate" content="${LOCALE[other]}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(g.title)}">
<meta property="og:description" content="${esc(g.description)}">
<meta property="og:image" content="${SITE}/assets/og-${g.lang}.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png">
${APP_STORE_ID ? `<meta name="apple-itunes-app" content="app-id=${APP_STORE_ID}">\n` : ''}<link rel="stylesheet" href="/assets/style.css">
</head>`;
}

function langSwitch(g, pairs) {
  const link = (l) => `<a href="/${l}/${pairs[l]}?lang=none"${l === g.lang ? ' class="active"' : ''} hreflang="${l}">${l.toUpperCase()}</a>`;
  return `<div class="lang-switch">
  ${link('nl')} · ${link('en')}
</div>`;
}

function callToAction(g) {
  const t = T[g.lang];
  if (APP_STORE_ID) {
    return `<div class="cta-row">
    <a class="cta" href="https://apps.apple.com/app/id${APP_STORE_ID}?pt=129476149&ct=${g.campaign}&mt=8">${t.store}</a>
    <p class="cta-note">${t.storeNote}</p>
  </div>`;
  }
  return `<div class="cta-row">
    <span class="cta soon">${t.soon}</span>
    <p class="cta-note">${t.soonNote}</p>
  </div>`;
}

function part(x) {
  if (typeof x === 'string') return `  <p>${x}</p>`;
  if (x.list) return `  <ul>${x.list.map((li) => `<li>${li}</li>`).join('')}</ul>`;
  const { head: cols, rows } = x.table;
  return `  <div class="table-wrap"><table>
    <thead><tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

/** Flesvoedingcalculator: rekent alleen in de browser, slaat niets op en verstuurt niets.
 * 150 ml per kilo per dag (vuistregel Voedingscentrum). */
function formulaCalculator(lang) {
  const c = FORMULA[lang];
  const feeds = [5, 6, 7, 8, 9, 10, 11, 12].map((n) => `<option value="${n}"${n === 8 ? ' selected' : ''}>${n}</option>`).join('');
  const unit = c.units
    ? `<select id="unit" aria-label="Unit"><option value="kg">kg</option><option value="lb">lb</option></select>`
    : '';
  return `<form class="calc" onsubmit="return false">
    <div class="calc-row">
      <label>${c.weightLabel}<span class="calc-weight"><input type="number" inputmode="decimal" min="0" step="0.1" id="weight" value="4.5">${unit}</span></label>
      <label>${c.feedsLabel}<select id="feeds">${feeds}</select></label>
    </div>
    <div class="calc-result" aria-live="polite">
      <div><b id="r-day">–</b><span>${c.perDay}</span></div>
      <div><b id="r-feed">–</b><span>${c.perFeed}</span></div>
    </div>
  </form>
<script>
(function () {
  var units = ${c.units ? 'true' : 'false'};
  var fmt = new Intl.NumberFormat('${c.locale}', { maximumFractionDigits: 0 });
  var fmt1 = new Intl.NumberFormat('${c.locale}', { maximumFractionDigits: 1 });
  function update() {
    var w = parseFloat(String(document.getElementById('weight').value).replace(',', '.'));
    if (!isFinite(w) || w <= 0) w = 0;
    var unit = document.getElementById('unit');
    var kg = unit && unit.value === 'lb' ? w * 0.4536 : w;
    var feeds = parseInt(document.getElementById('feeds').value, 10) || 8;
    var day = kg * 150;
    var feed = Math.round(day / feeds / 5) * 5;
    var oz = function (ml) { return ' · ' + fmt1.format(ml / 29.57) + ' oz'; };
    document.getElementById('r-day').textContent = fmt.format(day) + ' ml' + (units ? oz(day) : '');
    document.getElementById('r-feed').textContent = fmt.format(feed) + ' ml' + (units ? oz(feed) : '');
  }
  document.querySelector('.calc').addEventListener('input', update);
  document.querySelector('.calc').addEventListener('change', update);
  update();
})();
</script>`;
}

function page(g) {
  const t = T[g.lang];
  const pairs = GUIDE_PAIRS[g.key];
  const sections = g.sections.map(([title, parts]) => `  <h2>${title}</h2>\n${parts.map(part).join('\n')}`).join('\n\n');
  const download = g.download
    ? `  <p class="download"><a class="cta" href="/assets/${g.download.file}" download>${g.download.label}</a></p>
  <p class="cta-note">${g.download.note}</p>
`
    : '';
  const tool = g.tool === 'formula' ? `  ${formulaCalculator(g.lang)}\n` : '';
  const tools = TOOL_LINKS[g.lang].links
    .map(([key, label]) => `\n    <span class="sep">·</span>\n    <a href="/${g.lang}/${GUIDE_PAIRS[key][g.lang]}">${label}</a>`)
    .join('');
  return `${head(g, pairs)}
<body>

${langSwitch(g, pairs)}

<div class="wrap guide">

  <a class="brand" href="/${g.lang}/">
    <img src="/assets/icon.png" alt="">
    <span>Nuvo</span>
  </a>

  <h1>${g.h1}</h1>
  <p class="sub">${g.lede}</p>
${download}${tool}
${sections}

  <section class="appbox">
    <h2>${g.appTitle}</h2>
    <p>${g.appBody}</p>
    ${callToAction(g)}
  </section>

  <p>${g.related}</p>
  <p class="honest">${t.honest}</p>

  <footer>
    <a href="/${g.lang}/">${t.home}</a>
    <span class="sep">·</span>
    <a href="/${g.lang}/privacy/">${t.privacy}</a>
    <span class="sep">·</span>
    <a href="mailto:${CONTACT}">${t.contact}</a>${tools}
  </footer>

</div>
</body>
</html>
`;
}

function write(rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('wrote', rel);
}

for (const g of GUIDES) write(`${g.lang}/${GUIDE_PAIRS[g.key][g.lang]}index.html`, page(g));

// Sitemap: de bestaande pagina's (start, privacy) plus de gidsen.
const alt = (nl, en, xDefault) =>
  [
    `    <xhtml:link rel="alternate" hreflang="nl" href="${SITE}/${nl}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/${en}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/${xDefault}"/>`,
  ].join('\n');
const entries = [
  ['', alt('nl/', 'en/', '')],
  ['nl/', alt('nl/', 'en/', '')],
  ['en/', alt('nl/', 'en/', '')],
  ['privacy/', alt('nl/privacy/', 'en/privacy/', 'privacy/')],
  ['nl/privacy/', alt('nl/privacy/', 'en/privacy/', 'privacy/')],
  ['en/privacy/', alt('nl/privacy/', 'en/privacy/', 'privacy/')],
  ...Object.values(GUIDE_PAIRS).flatMap((p) => [
    [`nl/${p.nl}`, alt(`nl/${p.nl}`, `en/${p.en}`, `en/${p.en}`)],
    [`en/${p.en}`, alt(`nl/${p.nl}`, `en/${p.en}`, `en/${p.en}`)],
  ]),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(([loc, links]) => `  <url>\n    <loc>${SITE}/${loc}</loc>\n${links}\n  </url>`).join('\n')}
</urlset>
`
);
