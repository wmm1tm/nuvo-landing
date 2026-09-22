# Nuvo landingspagina

Statische site, geen framework, geen build-stap. NL en EN als losse volledige pagina's
(`/nl/index.html`, `/en/index.html`), `/index.html` detecteert de browsertaal (geen
IP-geolocatie) en stuurt door. Geen externe scripts, geen tracking, geen cookies.

## Structuur

```
index.html          — taalredirect (navigator.language) + no-JS fallback-links
nl/index.html        — Nederlandse landingspagina
en/index.html        — Engelse landingspagina
assets/style.css     — gedeelde stijl (donker thema, zelfde tokens als de app)
assets/icon.png       — app-icoon
assets/favicon.png    — favicon
assets/hero-wheel.png — hero-screenshot (het wiel + tijdlijn), verkleind voor web
netlify.toml          — publish-map + wat lichte security-headers
```

## Deployen op Netlify

**Optie A — snelst, geen git nodig:** ga naar app.netlify.com → "Add new site" →
"Deploy manually" → sleep deze hele map (`nuvo-landing`) in het uploadvak.

**Optie B — met git (handiger voor latere updates):** dit een eigen git-repo maken
(`git init`, pushen naar GitHub, bv. `github.com/wmm1tm/nuvo-landing`), dan in Netlify
"Import from Git" gebruiken — elke push naar main deployt dan automatisch opnieuw.

## Domein koppelen (nuvoapp.nl, geregistreerd bij TransIP)

1. In Netlify: Site settings → Domain management → "Add a domain" → `nuvoapp.nl`.
2. Netlify geeft ofwel nameservers (makkelijkst: hele domein naar Netlify verhuizen) of
   een CNAME/A-record-combinatie om zelf bij TransIP in te stellen.
3. Bij TransIP: DNS-instellingen van `nuvoapp.nl` aanpassen naar wat Netlify aangeeft
   (nu staan ze nog op TransIP's eigen standaardinstellingen).
4. Netlify regelt zelf een gratis SSL-certificaat zodra de DNS klopt (kan tot enkele
   uren duren na de wijziging).

## Nog te doen / bewust nog open

- **Video ontbreekt nog** — de pagina gebruikt nu de bestaande App Store-screenshot
  (het wiel) als hero-afbeelding. Zodra de 60-90-seconden-VSL er is (zie
  `MARKETING_PLAN.md` §6 in de BabyTracker-repo), de `<img class="hero-shot">` in beide
  taalversies vervangen door een `<video>`-element.
- **EN-pagina noemt bewust geen hardcoded prijs** ("shown in your local currency") —
  zelfde overweging als eerder bij de meertalige App Store-listing: een vast €-bedrag
  klopt niet voor niet-eurozone-bezoekers. NL-pagina noemt wel gewoon €5,99/€49,99.
  Zie `reference_app_store_launch_playbook.md`.
- Geen FAQ/JSON-LD-schema toegevoegd — dat hoort bij de aparte, nog niet gestarte
  SEO-tool-pagina's-uitbreiding (zie `project_seo_tool_pages_idea.md` in memory), niet
  bij deze ene landingspagina.
- Screenshot is nu 640px breed (~330KB) — prima voor nu, kan later vervangen worden door
  een geëxporteerde videoframe of een lichtere WebP-versie.
