/* ============================================================
   Rijschool Confiance - statische landingspagina's (SSG)
   Genereert volledig statische, snel-ladende HTML met eigen URL,
   title, description, canonical en schema. Zero-JS voor maximale
   Core Web Vitals; deelt styles.css met de hoofdsite.
   ============================================================ */

export const BASE = "https://rijschoolconfiance.nl";

const PHONE_TEL = "+31684346439";
const PHONE_DISPLAY = "06 84 34 64 39";
const EMAIL = "rijschoolconfiance@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/31684346439?text=" +
  encodeURIComponent("Hallo! Ik zou graag een proefles willen inplannen. Wanneer zou ik kunnen beginnen?");

const ADDRESS_LD = {
  "@type": "PostalAddress",
  streetAddress: "Watergeusstraat 28E",
  postalCode: "3025HS",
  addressLocality: "Rotterdam",
  addressRegion: "Zuid-Holland",
  addressCountry: "NL",
};

const RATING_LD = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  reviewCount: "17",
  bestRating: "5",
  worstRating: "1",
};

const PHONE_SVG =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

const ARROW_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const WHATSAPP_SVG =
  '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

/* ── Per-pagina styles (zelfstandige header + zero-JS FAQ) ── */
const LP_STYLE = `
  .lp-nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);
    -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
    border-bottom:1px solid var(--line);box-shadow:var(--shadow-sm)}
  .lp-nav-inner{display:flex;align-items:center;gap:16px;min-height:72px}
  .lp-nav .brand-logo{height:44px;width:auto;display:block}
  .lp-nav-actions{margin-left:auto;display:inline-flex;align-items:center;gap:12px}
  .lp-nav-phone{display:inline-flex;align-items:center;gap:8px;font-weight:600;
    font-size:.92rem;color:var(--ink-soft);padding:10px 12px;border-radius:var(--pill)}
  .lp-nav-phone:hover{color:var(--accent-deep);background:var(--surface-2)}
  .lp-hero{padding-block:clamp(56px,8vw,104px)}
  .lp-hero h1{font-size:clamp(2.1rem,4.4vw,3.4rem)}
  .lp-lead{color:var(--muted);font-size:1.18rem;margin-top:18px;max-width:62ch}
  .lp-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:30px}
  .lp-reassure{margin-top:18px;color:var(--muted);font-size:.95rem}
  .lp-prose h2{font-size:clamp(1.7rem,3vw,2.4rem);margin-top:0}
  .lp-prose p{color:var(--muted);font-size:1.08rem;margin-top:16px;max-width:70ch}
  .lp-prose ul{margin:18px 0 0;padding-left:0;list-style:none;display:grid;gap:12px;max-width:70ch}
  .lp-prose li{position:relative;padding-left:30px;color:var(--ink-soft);font-size:1.05rem}
  .lp-prose li::before{content:"";position:absolute;left:0;top:9px;width:14px;height:14px;
    border-radius:50%;background:color-mix(in oklab,var(--accent) 22%,transparent);
    box-shadow:inset 0 0 0 4px var(--accent)}
  .lp-faq{display:grid;gap:12px;margin-top:28px;max-width:780px}
  .lp-faq details{border:1px solid var(--line);border-radius:14px;background:var(--surface);
    padding:4px 20px;overflow:hidden}
  .lp-faq summary{cursor:pointer;list-style:none;padding:18px 0;font-family:var(--font-display);
    font-weight:700;font-size:1.06rem;color:var(--ink);display:flex;justify-content:space-between;gap:16px}
  .lp-faq summary::-webkit-details-marker{display:none}
  .lp-faq summary::after{content:"+";color:var(--accent);font-weight:700;font-size:1.3rem;line-height:1}
  .lp-faq details[open] summary::after{content:"\u2212"}
  .lp-faq details[open] summary{border-bottom:1px solid var(--line)}
  .lp-faq p{color:var(--muted);font-size:1.02rem;padding:16px 0 20px;margin:0}
  .lp-cta{text-align:center}
  .lp-cta .lp-actions{justify-content:center}
  .lp-crumbs{font-size:.9rem;color:var(--muted);padding-top:18px}
  .lp-crumbs a{color:var(--accent-deep);font-weight:600}
  .lp-related{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
  .lp-related a{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);
    background:var(--surface);border-radius:var(--pill);padding:10px 16px;font-weight:600;
    color:var(--ink-soft)}
  .lp-related a:hover{border-color:var(--accent);color:var(--accent-deep)}
`;

const head = (page) => {
  const url = `${BASE}/${page.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: page.crumb, item: url },
        ],
      },
      {
        "@type": "Service",
        name: page.serviceName,
        serviceType: page.serviceType,
        areaServed: { "@type": "City", name: page.area || "Rotterdam" },
        provider: {
          "@type": ["LocalBusiness", "DrivingSchool"],
          name: "Rijschool Confiance",
          telephone: PHONE_TEL,
          email: EMAIL,
          url: `${BASE}/`,
          image: `${BASE}/images/hero.jpg`,
          address: ADDRESS_LD,
          aggregateRating: RATING_LD,
        },
      },
    ],
  };
  if (page.faq && page.faq.length) {
    ld["@graph"].push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>${page.title}</title>
<meta name="description" content="${page.description}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="author" content="Rijschool Confiance" />
<meta name="geo.region" content="NL-ZH" />
<meta name="geo.placename" content="Rotterdam" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="nl-NL" href="${url}" />
<link rel="icon" href="${BASE}/favicon.ico" sizes="48x48" />
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="${BASE}/favicon-48x48.png" type="image/png" sizes="48x48" />
<link rel="icon" href="${BASE}/favicon-192x192.png" type="image/png" sizes="192x192" />
<link rel="apple-touch-icon" href="${BASE}/apple-touch-icon.png" sizes="180x180" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="nl_NL" />
<meta property="og:site_name" content="Rijschool Confiance" />
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${BASE}/images/hero.jpg" />
<meta property="og:image:width" content="1086" />
<meta property="og:image:height" content="1448" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${page.title}" />
<meta name="twitter:description" content="${page.description}" />
<meta name="twitter:image" content="${BASE}/images/hero.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/styles.css" />
<style>${LP_STYLE}</style>
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>`;
};

const header = () => `
<header class="lp-nav">
  <div class="wrap lp-nav-inner">
    <a class="brand" href="/" aria-label="Rijschool Confiance, naar de homepage">
      <img class="brand-logo" src="/images/logo.png" alt="Rijschool Confiance" width="200" height="56" decoding="async" />
    </a>
    <div class="lp-nav-actions">
      <a class="lp-nav-phone" href="tel:${PHONE_TEL}" aria-label="Bel ${PHONE_DISPLAY}">
        ${PHONE_SVG}<span>${PHONE_DISPLAY}</span>
      </a>
      <a class="btn btn-primary nav-cta-btn" href="/#contact">Gratis proefles</a>
    </div>
  </div>
</header>`;

const heroSection = (page) => `
<section class="section-pad band-light lp-hero">
  <div class="wrap">
    <nav class="lp-crumbs" aria-label="Kruimelpad">
      <a href="/">Home</a> &rsaquo; <span>${page.crumb}</span>
    </nav>
    <span class="eyebrow" style="margin-top:18px">${page.eyebrow}</span>
    <h1 style="margin-top:14px">${page.h1}</h1>
    <p class="lp-lead">${page.lead}</p>
    <div class="lp-actions">
      <a class="btn btn-primary btn-lg" href="/#contact">Plan je gratis proefles ${ARROW_SVG}</a>
      <a class="btn btn-ghost btn-lg" href="tel:${PHONE_TEL}">${PHONE_SVG} Bel direct</a>
    </div>
    <p class="lp-reassure">Vrijblijvend &amp; zonder verplichtingen &middot; 5,0 &#9733; uit 17 Google-reviews</p>
  </div>
</section>`;

const proseSection = (block, i) => `
<section class="section-pad ${i % 2 === 0 ? "band-muted" : "band-light"}">
  <div class="wrap lp-prose">
    <h2>${block.h}</h2>
    ${block.p.map((p) => `<p>${p}</p>`).join("\n    ")}
    ${block.list ? `<ul>\n      ${block.list.map((li) => `<li>${li}</li>`).join("\n      ")}\n    </ul>` : ""}
  </div>
</section>`;

const faqSection = (page) => {
  if (!page.faq || !page.faq.length) return "";
  return `
<section class="section-pad band-light">
  <div class="wrap">
    <span class="eyebrow">Veelgestelde vragen</span>
    <h2 style="font-size:clamp(1.7rem,3vw,2.4rem);margin-top:14px">Goed om te weten</h2>
    <div class="lp-faq">
      ${page.faq
        .map(
          (f) => `<details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>`;
};

const ctaSection = (page) => `
<section class="section-pad band-muted lp-cta">
  <div class="wrap">
    <span class="eyebrow" style="justify-content:center">Aan de slag</span>
    <h2 style="font-size:clamp(1.8rem,3.2vw,2.6rem);margin-top:14px">${page.ctaTitle}</h2>
    <p class="lp-lead" style="margin-inline:auto">${page.ctaText}</p>
    <div class="lp-actions">
      <a class="btn btn-primary btn-lg" href="/#contact">Plan je gratis proefles ${ARROW_SVG}</a>
      <a class="btn btn-ghost btn-lg" href="tel:${PHONE_TEL}">${PHONE_SVG} Bel ${PHONE_DISPLAY}</a>
    </div>
    ${
      page.related && page.related.length
        ? `<div class="lp-related">
      ${page.related.map((r) => `<a href="/${r.slug}/">${r.label}</a>`).join("\n      ")}
    </div>`
        : ""
    }
  </div>
</section>`;

const footer = () => `
<footer class="footer">
  <div class="wrap footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="footer-logo" href="/" aria-label="Rijschool Confiance, naar de homepage">
          <span class="footer-logo-mark" aria-hidden="true">L</span>
          <span class="footer-logo-text">
            <span class="footer-logo-name">Rijschool Confiance</span>
            <span class="footer-logo-tag">Vertrouwen in het proces</span>
          </span>
        </a>
        <p class="footer-about">D&eacute; rijschool in Rotterdam voor persoonlijke rijlessen. E&eacute;n vaste instructeur begeleidt je rustig en op jouw tempo naar je rijbewijs B.</p>
      </div>
      <nav class="footer-col" aria-label="Footer navigatie">
        <h5>Navigatie</h5>
        <a href="/#over">Over ons</a>
        <a href="/#lesgebied">Lesgebied</a>
        <a href="/#tarieven">Tarieven</a>
        <a href="/#reviews">Reviews</a>
        <a href="/#faq">Veelgestelde vragen</a>
      </nav>
      <div class="footer-col">
        <h5>Contact</h5>
        <a class="footer-contact" href="tel:${PHONE_TEL}">
          <span class="footer-contact-label">Telefoon</span>
          <span class="footer-contact-value">${PHONE_DISPLAY}</span>
        </a>
        <a class="footer-contact" href="mailto:${EMAIL}">
          <span class="footer-contact-label">E-mail</span>
          <span class="footer-contact-value">${EMAIL}</span>
        </a>
        <address class="footer-contact footer-address">
          <span class="footer-contact-label">Adres</span>
          <span class="footer-contact-value">Watergeusstraat 28E<br />3025HS Rotterdam</span>
        </address>
        <div class="footer-contact">
          <span class="footer-contact-label">Lesgebied</span>
          <span class="footer-contact-value">Rotterdam &amp; Rijnmond</span>
        </div>
        <div class="footer-contact">
          <span class="footer-contact-label">CBR-nummer</span>
          <span class="footer-contact-value">2001N9</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Rijschool Confiance &middot; Alle rechten voorbehouden</span>
      <span class="footer-motto">Rijden met vertrouwen</span>
    </div>
  </div>
</footer>`;

const whatsappFab = () => `
<a class="whatsapp-fab" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="Stuur een WhatsApp-bericht voor een proefles">
  ${WHATSAPP_SVG}
</a>`;

export const renderLandingPage = (page) =>
  `${head(page)}
<body>
${header()}
<main>
${heroSection(page)}
${page.blocks.map((b, i) => proseSection(b, i)).join("\n")}
${faqSection(page)}
${ctaSection(page)}
</main>
${footer()}
${whatsappFab()}
</body>
</html>
`;

/* ============================================================
   Content per landingspagina (uniek, geen dunne doorway-pagina's)
   ============================================================ */
export const LANDING_PAGES = [
  {
    slug: "automaat-rijles-rotterdam",
    crumb: "Automaat rijles Rotterdam",
    title: "Automaat rijles Rotterdam | Rijschool Confiance",
    description:
      "Automaat rijles in Rotterdam bij Rijschool Confiance: ontspannen leren rijden zonder schakelen, vaste instructeur en een gratis proefles. Bel 06 84 34 64 39.",
    eyebrow: "Automaat rijles",
    h1: "Automaat rijles in Rotterdam",
    lead: "Leer rijden zonder gedoe met de koppeling. In een automaat focus je volledig op het verkeer, de routes en je examen bij CBR Rotterdam. Rustig, persoonlijk en op jouw tempo.",
    serviceName: "Automaat rijles Rotterdam",
    serviceType: "Rijles automaat",
    blocks: [
      {
        h: "Waarom automaat rijles?",
        p: [
          "Bij een automaat hoef je niet te schakelen of te koppelen. Daardoor heb je meteen meer aandacht over voor het verkeer, de spiegels en de drukke kruispunten in Rotterdam. Veel leerlingen halen hun rijbewijs hierdoor sneller en met minder stress.",
          "Je krijgt bij Rijschool Confiance dezelfde lesauto en dezelfde instructeur van je eerste proefles tot je examen. Zo bouw je rust en vertrouwen op, precies waar onze naam voor staat.",
        ],
        list: [
          "Geen koppeling: alle aandacht voor het verkeer",
          "Vaak sneller examenklaar",
          "Ideaal bij examenstress of faalangst",
          "Rijden in heel Rotterdam en de Rijnmond",
        ],
      },
      {
        h: "Wat kost automaat rijles in Rotterdam?",
        p: [
          "Een losse automaatles van 60 minuten kost \u20ac60 en een les van 90 minuten \u20ac80. Met een lespakket rijd je voordeliger richting je praktijkexamen; automaatpakketten zijn \u20ac100 hoger dan de schakelvariant en zijn inclusief praktijkexamen.",
          "Je start altijd met een gratis proefles van 60 minuten. Zo ervaar je rustig hoe rijden in een automaat bevalt en of het klikt met je instructeur, zonder enige verplichting.",
        ],
      },
      {
        h: "Mag ik met een automaat-rijbewijs later schakel rijden?",
        p: [
          "Als je je examen in een automaat doet, krijg je een rijbewijs met code 78: je mag dan automaten rijden. Wil je later alsnog schakelen, dan kun je via een omwisseltraject je code laten verwijderen. Voor de meeste leerlingen die vooral comfortabel willen rijden, is automaat een prima keuze.",
          "Twijfel je tussen schakel en automaat? We denken graag met je mee tijdens de gratis proefles en kijken wat het beste bij jouw doel past.",
        ],
      },
    ],
    faq: [
      {
        q: "Is automaat rijles duurder dan schakel?",
        a: "Een losse automaatles is \u20ac5 duurder en een automaatpakket \u20ac100 duurder dan de schakelvariant. Daar staat tegenover dat veel leerlingen in een automaat sneller examenklaar zijn.",
      },
      {
        q: "Kan ik in een automaat sneller mijn rijbewijs halen?",
        a: "Omdat je niet hoeft te schakelen, heb je meer aandacht voor het verkeer. Veel leerlingen pikken het rijden daardoor sneller op, al verschilt het tempo per persoon.",
      },
      {
        q: "Geven jullie automaat rijles in heel Rotterdam?",
        a: "Ja, we lessen in heel Rotterdam en de Rijnmond en halen je op in je eigen buurt, zodat je oefent op routes die relevant zijn voor je examen bij CBR Rotterdam.",
      },
    ],
    ctaTitle: "Probeer een gratis automaat-proefles",
    ctaText: "Ervaar zelf hoe ontspannen rijden in een automaat is. Je eerste les van 60 minuten is gratis en vrijblijvend.",
    related: [
      { slug: "spoedcursus-rijbewijs-rotterdam", label: "Spoedcursus rijbewijs" },
      { slug: "gratis-proefles-rotterdam", label: "Gratis proefles" },
    ],
  },
  {
    slug: "spoedcursus-rijbewijs-rotterdam",
    crumb: "Spoedcursus rijbewijs Rotterdam",
    title: "Spoedcursus rijbewijs Rotterdam | Rijschool Confiance",
    description:
      "Snel je rijbewijs halen in Rotterdam? Met een spoedcursus van Rijschool Confiance rijd je in korte tijd examenklaar. Vaste instructeur en gratis proefles. Bel 06 84 34 64 39.",
    eyebrow: "Spoedcursus",
    h1: "Spoedcursus rijbewijs in Rotterdam",
    lead: "Heb je je rijbewijs snel nodig voor werk, studie of een nieuwe baan? Met een intensief lestraject bij Rijschool Confiance werk je in korte tijd gericht naar je praktijkexamen toe.",
    serviceName: "Spoedcursus rijbewijs Rotterdam",
    serviceType: "Spoedcursus rijbewijs",
    blocks: [
      {
        h: "Hoe werkt een spoedcursus?",
        p: [
          "Bij een spoedcursus rijd je meerdere lessen per week, vaak in langere lesblokken. Daardoor blijft alles wat je leert beter hangen en bouw je snel routine op. We stemmen het tempo af op jouw beginniveau en plannen samen een realistisch traject richting je examen bij CBR Rotterdam.",
          "Je rijdt met \u00e9\u00e9n vaste instructeur die jouw leerdoelen door en door kent. Geen wisselende gezichten, wel een strakke planning en duidelijke feedback na elke les.",
        ],
        list: [
          "Meerdere lessen per week, snel resultaat",
          "Eén vaste instructeur met een strak plan",
          "Gerichte voorbereiding op de CBR-routes in Rotterdam",
          "Schakel of automaat mogelijk",
        ],
      },
      {
        h: "Voor wie is een spoedcursus geschikt?",
        p: [
          "Een spoedcursus is ideaal als je gemotiveerd bent en veel tijd kunt vrijmaken in een korte periode. Heb je al wat rijervaring, dan kan een korter traject volstaan; ben je beginner, dan plannen we voldoende lessen in om je echt examenklaar te krijgen.",
          "Tijdens de gratis proefles bepalen we samen je startniveau en geven we een eerlijke inschatting van het aantal lessen dat je nodig hebt. Geen loze beloftes, wel een haalbaar plan.",
        ],
      },
    ],
    faq: [
      {
        q: "Hoe snel kan ik mijn rijbewijs halen?",
        a: "Dat hangt af van je beginniveau en beschikbaarheid. Tijdens de gratis proefles maken we een eerlijke inschatting en stellen we samen een haalbaar spoedtraject op.",
      },
      {
        q: "Zit het praktijkexamen bij de spoedcursus inbegrepen?",
        a: "We begeleiden je volledig richting het praktijkexamen bij CBR Rotterdam. De examenkosten van het CBR betaal je apart aan het CBR; deze staan los van de lesprijs.",
      },
      {
        q: "Kan een spoedcursus ook in automaat?",
        a: "Ja, een spoedcursus kan zowel in schakel als in automaat. In een automaat zijn leerlingen vaak nog sneller examenklaar omdat het schakelen wegvalt.",
      },
    ],
    ctaTitle: "Start snel met een gratis proefles",
    ctaText: "We bepalen samen je startniveau en stellen een realistisch spoedtraject op. De proefles is gratis en vrijblijvend.",
    related: [
      { slug: "automaat-rijles-rotterdam", label: "Automaat rijles" },
      { slug: "gratis-proefles-rotterdam", label: "Gratis proefles" },
    ],
  },
  {
    slug: "gratis-proefles-rotterdam",
    crumb: "Gratis proefles Rotterdam",
    title: "Gratis proefles rijles Rotterdam | Rijschool Confiance",
    description:
      "Plan een gratis proefles van 60 minuten bij Rijschool Confiance in Rotterdam. Vrijblijvend kennismaken met je instructeur en ervaren hoe rijden bevalt. Bel 06 84 34 64 39.",
    eyebrow: "Gratis proefles",
    h1: "Gratis proefles in Rotterdam",
    lead: "Maak vrijblijvend kennis achter het stuur. Je eerste rijles van 60 minuten is volledig gratis, zodat je rustig ervaart hoe het rijden bevalt en of het klikt met je instructeur.",
    serviceName: "Gratis proefles Rotterdam",
    serviceType: "Gratis proefrijles",
    blocks: [
      {
        h: "Wat kun je verwachten tijdens de proefles?",
        p: [
          "Tijdens de gratis proefles van 60 minuten rijd je echt zelf. Je instructeur haalt je op in je eigen buurt in Rotterdam en je oefent meteen op straten die je dagelijks tegenkomt. Zo merk je direct hoe persoonlijk en rustig onze aanpak is.",
          "Aan het einde van de les bespreken we je startniveau en wat een logisch vervolg is. Je zit nergens aan vast: de proefles is volledig vrijblijvend.",
        ],
        list: [
          "60 minuten echt zelf rijden",
          "We halen je op in je eigen buurt",
          "Eerlijke inschatting van je startniveau",
          "Zonder verplichtingen achteraf",
        ],
      },
      {
        h: "Waarom een proefles bij Rijschool Confiance?",
        p: [
          "Een rijbewijs haal je het prettigst bij iemand bij wie je je op je gemak voelt. Daarom begin je bij ons altijd met een gratis proefles: kennismaken met je vaste instructeur zonder druk. Onze leerlingen waarderen ons met een 5,0 op Google uit 17 reviews.",
          "Bevalt het? Dan ga je verder met dezelfde instructeur en dezelfde lesauto richting je examen bij CBR Rotterdam. Bevalt het onverhoopt niet, dan ben je nergens toe verplicht.",
        ],
      },
    ],
    faq: [
      {
        q: "Is de proefles echt helemaal gratis?",
        a: "Ja, je eerste les van 60 minuten is volledig gratis en vrijblijvend. Er zijn geen verborgen kosten en je zit nergens aan vast.",
      },
      {
        q: "Waar vindt de proefles plaats?",
        a: "We halen je op in je eigen buurt in Rotterdam of de Rijnmond, zodat je meteen oefent op routes die je dagelijks tegenkomt.",
      },
      {
        q: "Kan de proefles in automaat?",
        a: "Zeker. Geef bij je aanmelding aan of je in schakel of automaat wilt rijden, dan zorgen we voor de juiste lesauto.",
      },
    ],
    ctaTitle: "Plan vandaag je gratis proefles",
    ctaText: "Laat je gegevens achter, dan plannen we samen een vrijblijvende proefles in. Meestal reageren we binnen 24 uur.",
    related: [
      { slug: "automaat-rijles-rotterdam", label: "Automaat rijles" },
      { slug: "spoedcursus-rijbewijs-rotterdam", label: "Spoedcursus rijbewijs" },
    ],
  },
  {
    slug: "rijschool-rotterdam-zuid",
    crumb: "Rijschool Rotterdam-Zuid",
    title: "Rijschool Rotterdam-Zuid | Rijles in Charlois & Feijenoord",
    description:
      "Rijles in Rotterdam-Zuid bij Rijschool Confiance: van Charlois en Feijenoord tot Katendrecht en IJsselmonde. Vaste instructeur, gratis proefles. Bel 06 84 34 64 39.",
    eyebrow: "Rotterdam-Zuid",
    h1: "Rijschool in Rotterdam-Zuid",
    lead: "Rijles op de wegen die je zelf dagelijks gebruikt. We geven rijles in heel Rotterdam-Zuid, van Charlois en Feijenoord tot Katendrecht, Zuidwijk en IJsselmonde.",
    serviceName: "Rijles Rotterdam-Zuid",
    serviceType: "Rijles",
    area: "Rotterdam-Zuid",
    blocks: [
      {
        h: "Rijles in jouw wijk op Zuid",
        p: [
          "Rotterdam-Zuid heeft zijn eigen uitdagingen: drukke kruispunten, trams, fietsers en de routes rond de Maastunnel en de ring. Wij kennen deze wegen op ons duimpje en oefenen bewust op de situaties die examinatoren in dit deel van de stad vaak laten zien.",
          "Je instructeur haalt je op in je eigen buurt, of dat nu Charlois, Feijenoord, Katendrecht, Zuidwijk, Pendrecht of IJsselmonde is. Zo oefen je meteen op vertrouwde wegen en bouw je gericht aan je examenroutes.",
        ],
        list: [
          "Lesgebied: Charlois, Feijenoord, Katendrecht, Zuidwijk, IJsselmonde",
          "Bekend met de examenroutes van CBR Rotterdam",
          "Opgehaald in je eigen buurt",
          "Schakel én automaat mogelijk",
        ],
      },
      {
        h: "Persoonlijk en op jouw tempo",
        p: [
          "Bij Rijschool Confiance rijd je met \u00e9\u00e9n vaste instructeur van je eerste proefles tot je examen. Geen wisselende gezichten, wel iemand die jouw leerdoelen kent en je rustig en zelfverzekerd naar je rijbewijs begeleidt.",
          "Leerlingen uit Rotterdam-Zuid waarderen ons met een 5,0 op Google. Begin vrijblijvend met een gratis proefles en ervaar zelf hoe onze rustige aanpak werkt.",
        ],
      },
    ],
    faq: [
      {
        q: "In welke wijken op Zuid geven jullie rijles?",
        a: "Onder andere Charlois, Feijenoord, Katendrecht, Zuidwijk, Pendrecht, Carnisse en IJsselmonde. Twijfel je over jouw adres? Stuur een berichtje, we kijken altijd mee.",
      },
      {
        q: "Oefenen jullie op de examenroutes in Rotterdam-Zuid?",
        a: "Ja, we oefenen bewust op de kruispunten, rotondes en routes die examinatoren van CBR Rotterdam vaak laten zien, zodat je goed voorbereid op examen gaat.",
      },
      {
        q: "Worden jullie leerlingen op Zuid opgehaald?",
        a: "Zeker, we halen je op in je eigen buurt zodat je direct oefent op straten die je dagelijks tegenkomt.",
      },
    ],
    ctaTitle: "Start met rijles op Rotterdam-Zuid",
    ctaText: "Plan een gratis, vrijblijvende proefles en ervaar onze persoonlijke aanpak in jouw eigen wijk.",
    related: [
      { slug: "rijschool-rotterdam-noord", label: "Rijschool Rotterdam-Noord" },
      { slug: "automaat-rijles-rotterdam", label: "Automaat rijles" },
    ],
  },
  {
    slug: "rijschool-rotterdam-noord",
    crumb: "Rijschool Rotterdam-Noord",
    title: "Rijschool Rotterdam-Noord | Rijles in Hillegersberg & Blijdorp",
    description:
      "Rijles in Rotterdam-Noord bij Rijschool Confiance: van Hillegersberg en Blijdorp tot Kralingen en Prins Alexander. Vaste instructeur, gratis proefles. Bel 06 84 34 64 39.",
    eyebrow: "Rotterdam-Noord",
    h1: "Rijschool in Rotterdam-Noord",
    lead: "Leer rijden in het noorden van de stad. We geven rijles in heel Rotterdam-Noord, van Hillegersberg en Blijdorp tot Kralingen, Schiebroek en Prins Alexander.",
    serviceName: "Rijles Rotterdam-Noord",
    serviceType: "Rijles",
    area: "Rotterdam-Noord",
    blocks: [
      {
        h: "Rijles in het noorden van Rotterdam",
        p: [
          "Rotterdam-Noord kent rustige woonwijken \u00e9n drukke doorgaande wegen, plus de routes rond de ring en Prins Alexander. We oefenen op precies die mix, zodat je leert omgaan met elke verkeerssituatie die je op je examen kunt tegenkomen.",
          "Je instructeur haalt je op in je eigen buurt, of dat nu Hillegersberg, Blijdorp, Schiebroek, Kralingen of Prins Alexander is. Vertrouwde wegen, gerichte oefening en een duidelijk plan richting je examen bij CBR Rotterdam.",
        ],
        list: [
          "Lesgebied: Hillegersberg, Blijdorp, Schiebroek, Kralingen, Prins Alexander",
          "Bekend met de examenroutes van CBR Rotterdam",
          "Opgehaald in je eigen buurt",
          "Schakel én automaat mogelijk",
        ],
      },
      {
        h: "Eén vaste instructeur die je kent",
        p: [
          "Rust en vertrouwen staan bij ons centraal. Je rijdt met dezelfde instructeur en lesauto van je eerste proefles tot je examen, zodat je zelfverzekerd de weg op stapt.",
          "Leerlingen uit Rotterdam-Noord beoordelen ons met een 5,0 op Google uit 17 reviews. Begin vrijblijvend met een gratis proefles en ontdek of het klikt.",
        ],
      },
    ],
    faq: [
      {
        q: "In welke wijken in het noorden geven jullie rijles?",
        a: "Onder andere Hillegersberg, Blijdorp, Schiebroek, Kralingen, Crooswijk en Prins Alexander. Twijfel je over jouw adres? Stuur gerust een berichtje.",
      },
      {
        q: "Halen jullie me op in Rotterdam-Noord?",
        a: "Ja, we halen je op in je eigen buurt zodat je meteen oefent op de wegen die je dagelijks gebruikt.",
      },
      {
        q: "Kan ik in automaat lessen in Rotterdam-Noord?",
        a: "Zeker, we bieden zowel schakel- als automaatlessen in heel Rotterdam-Noord.",
      },
    ],
    ctaTitle: "Start met rijles in Rotterdam-Noord",
    ctaText: "Plan een gratis, vrijblijvende proefles en ervaar onze rustige, persoonlijke aanpak in jouw eigen wijk.",
    related: [
      { slug: "rijschool-rotterdam-zuid", label: "Rijschool Rotterdam-Zuid" },
      { slug: "spoedcursus-rijbewijs-rotterdam", label: "Spoedcursus rijbewijs" },
    ],
  },
];
