// Teksten van de gids- en hulpmiddelpagina's van nuvoapp.nl (NL + EN), toegevoegd 2026-09-30
// om beter gevonden te worden. tools/build-guides.mjs maakt er pagina's van. Regels: geen
// medisch advies (vuistregels met bron, "je baby geeft zelf aan", bij twijfel het
// consultatiebureau of de huisarts), en elke pagina verwijst met een eigen campagnelabel naar de
// App Store.
//
// Een sectie is [kop, onderdelen]; een onderdeel is een alinea (string), { list: [...] } of
// { table: { head: [...], rows: [[...], ...] } }.

export const GUIDE_PAIRS = {
  formula: { nl: 'flesvoeding-berekenen/', en: 'formula-calculator/' },
  sleep: { nl: 'hoeveel-slaap-baby/', en: 'baby-sleep-by-age/' },
  log: { nl: 'baby-logboek/', en: 'baby-log/' },
};

export const TOOL_LINKS = {
  nl: {
    title: 'Gratis hulpmiddelen',
    links: [
      ['formula', 'Bereken hoeveel flesvoeding je baby nodig heeft'],
      ['sleep', 'Hoeveel slaap heeft een baby nodig?'],
      ['log', 'Baby-logboek om te printen (PDF)'],
    ],
  },
  en: {
    title: 'Free tools',
    links: [
      ['formula', 'Work out how much formula your baby needs'],
      ['sleep', 'How much sleep does a baby need?'],
      ['log', 'Printable baby log (PDF)'],
    ],
  },
};

export const GUIDES = [
  {
    key: 'formula',
    lang: 'nl',
    campaign: 'flesvoeding-berekenen',
    tool: 'formula',
    title: 'Hoeveel flesvoeding heeft mijn baby nodig? Bereken het · Nuvo',
    description:
      'Gratis calculator: vul het gewicht van je baby en het aantal voedingen per dag in en zie hoeveel ml flesvoeding per dag en per voeding past bij de vuistregel van het Voedingscentrum.',
    h1: 'Hoeveel flesvoeding heeft je baby nodig?',
    lede:
      'Een veelgebruikte vuistregel is ongeveer 150 ml flesvoeding per kilo lichaamsgewicht per dag. Vul hieronder het gewicht van je baby in en hoe vaak je voedt, dan zie je wat dat per dag en per fles betekent. Er wordt niets opgeslagen of verstuurd.',
    sections: [
      [
        'Hoe rekent dit?',
        [
          { list: [
            'Per dag: gewicht in kilo × 150 ml. Een baby van 5 kilo komt zo op ongeveer 750 ml per dag.',
            'Per voeding: de hoeveelheid per dag gedeeld door het aantal voedingen.',
          ] },
          'Deze vuistregel komt van het <a href="https://www.voedingscentrum.nl/nl/zwanger-en-kind/borstvoeding-en-flesvoeding/flesvoeding-geven/hoeveel-flesvoeding-heeft-mijn-baby-nodig-.aspx" rel="noopener">Voedingscentrum</a>.',
        ],
      ],
      [
        'Een richtlijn, geen regel',
        [
          'Je baby geeft zelf aan hoeveel en hoe vaak hij of zij wil drinken. Op de ene dag is dat meer, op de andere minder, en ook per voeding verschilt het. Kijk vooral naar je baby: drinkt het goed, plast het genoeg en groeit het? Twijfel je, vraag het dan aan het consultatiebureau of je huisarts.',
          'Eet je baby ook vaste voeding, meestal vanaf ongeveer 6 maanden, dan past deze vuistregel niet meer.',
        ],
      ],
      [
        'Waarom bijhouden handig is',
        [
          'Om 3 uur ’s nachts weet bijna niemand nog precies wanneer de laatste fles was en hoeveel erin ging. Wie het bijhoudt, ziet in één oogopslag hoeveel het vandaag was en wanneer de volgende voeding ongeveer komt.',
        ],
      ],
    ],
    appTitle: 'Houd voedingen bij met Nuvo',
    appBody:
      'Log een fles of borstvoeding met één gebaar op het wiel, ook ’s nachts met één hand. Zie hoeveel ml het vandaag was, per voeding en per dag.',
    related: 'Zie ook: <a href="/nl/hoeveel-slaap-baby/">hoeveel slaap heeft een baby nodig?</a> en het <a href="/nl/baby-logboek/">gratis baby-logboek om te printen</a>.',
  },
  {
    key: 'formula',
    lang: 'en',
    campaign: 'formula-calculator',
    tool: 'formula',
    title: 'How much formula does my baby need? Calculator · Nuvo',
    description:
      "Free calculator: enter your baby's weight and number of feeds per day and see how much formula per day and per feed fits a common guideline. In ml or oz.",
    h1: 'How much formula does your baby need?',
    lede:
      "A common guideline is about 150 ml of formula per kilo of body weight per day. Enter your baby's weight and how often you feed below, and see what that means per day and per bottle. Nothing is stored or sent anywhere.",
    sections: [
      [
        'How is this calculated?',
        [
          { list: [
            'Per day: weight in kilos × 150 ml. A baby of 5 kg (11 lb) comes to about 750 ml (25 oz) a day.',
            'Per feed: the daily amount divided by the number of feeds.',
            'Pounds are converted at 1 lb = 0.4536 kg, ounces at 1 fl oz = 29.57 ml.',
          ] },
          'The guideline used here is the one from the Dutch <a href="https://www.voedingscentrum.nl/nl/zwanger-en-kind/borstvoeding-en-flesvoeding/flesvoeding-geven/hoeveel-flesvoeding-heeft-mijn-baby-nodig-.aspx" rel="noopener">Voedingscentrum</a> (Netherlands Nutrition Centre). Guidance in your country may use a slightly different range.',
        ],
      ],
      [
        'A guideline, not a rule',
        [
          'Your baby shows how much and how often they want to drink. Some days it is more, some days less, and it varies per feed too. Look at your baby first: are they feeding well, wetting enough diapers and growing? If in doubt, ask your health visitor, paediatrician or doctor.',
          'Once your baby also eats solid food, usually from around 6 months, this guideline no longer applies.',
        ],
      ],
      [
        'Why tracking helps',
        [
          'At 3 a.m., hardly anyone remembers exactly when the last bottle was or how much went in. When you track it, you see at a glance how much it was today and roughly when the next feed is due.',
        ],
      ],
    ],
    appTitle: 'Track feeds with Nuvo',
    appBody:
      'Log a bottle or breastfeed with one gesture on the wheel, even one-handed at night. See how much it was today, per feed and per day.',
    related: 'See also: <a href="/en/baby-sleep-by-age/">how much sleep does a baby need?</a> and the <a href="/en/baby-log/">free printable baby log</a>.',
  },
  {
    key: 'sleep',
    lang: 'nl',
    campaign: 'hoeveel-slaap-baby',
    title: 'Hoeveel slaap heeft een baby nodig? Uren per leeftijd · Nuvo',
    description:
      'Hoeveel uur slaapt een baby per dag? Overzicht per leeftijd, van pasgeboren tot 2 jaar, met dutjes en nachtslaap. Plus waarom bijhouden helpt om het ritme van je baby te zien.',
    h1: 'Hoeveel slaap heeft een baby nodig?',
    lede:
      'Slaapt je baby genoeg? Het antwoord verschilt per leeftijd, en per baby. Hieronder staan de gangbare richtlijnen, met dutjes overdag meegeteld. Gebruik ze als kompas, niet als wet.',
    sections: [
      [
        'Uren slaap per dag, per leeftijd',
        [
          { table: {
            head: ['Leeftijd', 'Totaal per 24 uur', 'Hoe ziet het eruit?'],
            rows: [
              ['0 – 3 maanden', '14 – 17 uur', 'Korte stukjes van 2 tot 4 uur, dag en nacht door elkaar.'],
              ['4 – 11 maanden', '12 – 15 uur', 'Langere nachten, overdag 2 tot 3 dutjes.'],
              ['1 – 2 jaar', '11 – 14 uur', 'Vooral ’s nachts, overdag 1 of 2 dutjes.'],
            ],
          } },
          'Deze bandbreedtes komen van de Amerikaanse National Sleep Foundation en worden ook in Nederland veel gebruikt. Sommige baby’s slapen iets meer of minder en zijn toch helemaal in orde.',
        ],
      ],
      [
        'Dag en nacht vinden hun plek',
        [
          'Een pasgeboren baby kent nog geen verschil tussen dag en nacht. In de eerste maanden groeit dat ritme langzaam: de nachten worden langer, de dutjes overdag korter en minder. Licht overdag, rust en donker ’s avonds helpen daarbij.',
        ],
      ],
      [
        'Waarom bijhouden helpt',
        [
          { list: [
            '<b>Je ziet het totaal.</b> Alle dutjes bij elkaar zijn vaak meer (of minder) dan je denkt.',
            '<b>Je ziet het ritme.</b> Wanneer wordt je baby moe, en hoe lang is hij wakker tussen twee slaapjes?',
            '<b>Je kunt het laten zien.</b> Aan je partner, of aan het consultatiebureau als je ergens over twijfelt.',
          ] },
          'Maak je je zorgen over de slaap van je baby, bespreek het dan met het consultatiebureau of je huisarts.',
        ],
      ],
    ],
    appTitle: 'Slaap bijhouden met Nuvo, altijd gratis',
    appBody:
      'Start en stop een slaapje met één gebaar, of in één tik vanaf je beginscherm. Nuvo telt de uren per dag voor je op. Slaap bijhouden is in Nuvo altijd gratis.',
    related: 'Zie ook: <a href="/nl/flesvoeding-berekenen/">bereken hoeveel flesvoeding je baby nodig heeft</a> en het <a href="/nl/baby-logboek/">gratis baby-logboek om te printen</a>.',
  },
  {
    key: 'sleep',
    lang: 'en',
    campaign: 'baby-sleep-by-age',
    title: 'How much sleep does a baby need? Hours by age · Nuvo',
    description:
      'How many hours does a baby sleep a day? An overview by age, from newborn to 2 years, naps included. Plus why tracking helps you see your baby’s rhythm.',
    h1: 'How much sleep does a baby need?',
    lede:
      'Is your baby getting enough sleep? The answer depends on age, and on the baby. Below are the common guidelines, with daytime naps included. Use them as a compass, not a rule.',
    sections: [
      [
        'Hours of sleep per day, by age',
        [
          { table: {
            head: ['Age', 'Total per 24 hours', 'What it looks like'],
            rows: [
              ['0 – 3 months', '14 – 17 hours', 'Short stretches of 2 to 4 hours, day and night mixed.'],
              ['4 – 11 months', '12 – 15 hours', 'Longer nights, 2 to 3 naps during the day.'],
              ['1 – 2 years', '11 – 14 hours', 'Mostly at night, 1 or 2 naps during the day.'],
            ],
          } },
          'These ranges come from the US National Sleep Foundation and are widely used. Some babies sleep a little more or less and are perfectly fine.',
        ],
      ],
      [
        'Day and night find their place',
        [
          'A newborn does not yet know the difference between day and night. Over the first months that rhythm grows slowly: nights get longer, daytime naps shorter and fewer. Daylight during the day, and calm and darkness in the evening, help.',
        ],
      ],
      [
        'Why tracking helps',
        [
          { list: [
            '<b>You see the total.</b> All naps together are often more (or less) than you think.',
            '<b>You see the rhythm.</b> When does your baby get tired, and how long are they awake between naps?',
            '<b>You can show it.</b> To your partner, or to your health visitor or paediatrician if you are unsure about something.',
          ] },
          'If you are worried about your baby’s sleep, talk to your health visitor, paediatrician or doctor.',
        ],
      ],
    ],
    appTitle: 'Track sleep with Nuvo, always free',
    appBody:
      'Start and stop a nap with one gesture, or in one tap from your home screen. Nuvo adds up the hours per day for you. Tracking sleep in Nuvo is always free.',
    related: 'See also: <a href="/en/formula-calculator/">work out how much formula your baby needs</a> and the <a href="/en/baby-log/">free printable baby log</a>.',
  },
  {
    key: 'log',
    lang: 'nl',
    campaign: 'baby-logboek',
    download: { file: 'baby-logboek.pdf', label: 'Download het baby-logboek (PDF)', note: 'A4 staand, 2 pagina’s: het logboek voor één dag en een invulvoorbeeld met tips. Gratis, zonder e-mailadres.' },
    title: 'Gratis baby-logboek: voeding, slaap en luiers bijhouden (PDF) · Nuvo',
    description:
      'Download een gratis baby-logboek om per dag voedingen, slaapjes en luiers bij te houden. Handig voor de eerste weken, voor je partner of het consultatiebureau. Om te printen, zonder e-mailadres.',
    h1: 'Gratis baby-logboek om voeding, slaap en luiers bij te houden',
    lede:
      'Liever op papier, bijvoorbeeld in de eerste weken of voor de oppas? Met dit logboek schrijf je per dag op wanneer je baby dronk, sliep en een schone luier kreeg. Handig voor jezelf, je partner en het consultatiebureau.',
    sections: [
      [
        'Zo vul je het in',
        [
          { list: [
            '<b>Voeding:</b> de tijd, en borst links/rechts of het aantal ml bij een fles.',
            '<b>Slaap:</b> van hoe laat tot hoe laat.',
            '<b>Luier:</b> een vinkje bij plas of poep.',
            'Schrijf het meteen op; achteraf weet je het ’s nachts echt niet meer.',
          ] },
        ],
      ],
      [
        'Wat zie je na een paar dagen?',
        [
          'Tel per dag de voedingen, slaapuren en luiers op. Je ziet dan vanzelf het ritme van je baby: wanneer het honger krijgt, hoe lang het wakker is en of het genoeg plast. Precies de vragen die het consultatiebureau vaak stelt.',
        ],
      ],
    ],
    appTitle: 'Of houd het bij op je telefoon',
    appBody:
      'Nuvo doet hetzelfde met één gebaar op het wiel, ook ’s nachts met één hand. Je partner kan versleuteld meekijken, en je maakt er in één tik een PDF van voor het consultatiebureau.',
    related: 'Zie ook: <a href="/nl/flesvoeding-berekenen/">bereken hoeveel flesvoeding je baby nodig heeft</a> en <a href="/nl/hoeveel-slaap-baby/">hoeveel slaap heeft een baby nodig?</a>',
  },
  {
    key: 'log',
    lang: 'en',
    campaign: 'baby-log',
    download: { file: 'baby-log.pdf', label: 'Download the baby log (PDF)', note: 'US Letter, portrait, 2 pages: a one-day log and a filled-in example with tips. Free, no email address needed.' },
    title: 'Free printable baby log: track feeds, sleep and diapers (PDF) · Nuvo',
    description:
      'Download a free baby log to track feeds, naps and diapers each day. Handy for the first weeks, for your partner or your paediatrician. Printable, no email address needed.',
    h1: 'Free baby log to track feeds, sleep and diapers',
    lede:
      'Prefer paper, for instance in the first weeks or for a babysitter? With this log you write down each day when your baby fed, slept and had a clean diaper. Handy for you, your partner and your paediatrician.',
    sections: [
      [
        'How to fill it in',
        [
          { list: [
            '<b>Feed:</b> the time, and breast left/right or the amount for a bottle.',
            '<b>Sleep:</b> from what time until what time.',
            '<b>Diaper:</b> a tick for wet or dirty.',
            'Write it down straight away; at night you really will not remember later.',
          ] },
        ],
      ],
      [
        'What do you see after a few days?',
        [
          'Add up the feeds, hours of sleep and diapers per day. Your baby’s rhythm shows by itself: when they get hungry, how long they stay awake and whether they are wetting enough. Exactly the questions a health visitor or paediatrician often asks.',
        ],
      ],
    ],
    appTitle: 'Or track it on your phone',
    appBody:
      'Nuvo does the same with one gesture on the wheel, even one-handed at night. Your partner can follow along, encrypted, and you turn it into a PDF for your paediatrician in one tap.',
    related: 'See also: <a href="/en/formula-calculator/">work out how much formula your baby needs</a> and <a href="/en/baby-sleep-by-age/">how much sleep does a baby need?</a>',
  },
];

export const FORMULA = {
  nl: {
    weightLabel: 'Gewicht van je baby (kg)',
    feedsLabel: 'Aantal voedingen per dag',
    perDay: 'per dag',
    perFeed: 'per voeding',
    locale: 'nl-NL',
    units: false,
  },
  en: {
    weightLabel: "Your baby's weight",
    feedsLabel: 'Feeds per day',
    perDay: 'per day',
    perFeed: 'per feed',
    locale: 'en-GB',
    units: true,
  },
};
