/* ============================================================
   Rijschool Confiance - productiebuild
   - Precompileert/bundelt de JSX tot één geminificeerde bundle.js
     (geen @babel/standalone meer in productie).
   - Genereert een productie-index.html met productie-React.
   - Genereert statische landingspagina's (SSG) + sitemap.
   Output: dist/  (wordt in productie geserveerd door server.js / nginx).
   ============================================================ */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as esbuild from "esbuild";
import { BASE, LANDING_PAGES, renderLandingPage } from "./landing.mjs";

const root = process.cwd();
const out = join(root, "dist");
const today = new Date().toISOString().slice(0, 10);

/* ---------- FAQ-schema synchroniseren vanuit app.jsx ---------- */
function extractFaqFromApp(source) {
  const match = source.match(/const FAQ = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error("FAQ-array niet gevonden in app.jsx");
  return Function(`"use strict"; return (${match[1]});`)();
}

function buildFaqSchemaEntities(faq) {
  return faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  }));
}

function injectFaqSchema(html, faq) {
  const entities = buildFaqSchemaEntities(faq);
  const block = JSON.stringify(entities, null, 6).replace(/\n/g, "\n      ");
  const re = /("@type": "FAQPage"[\s\S]*?"mainEntity": )\[[\s\S]*?\](\s*\n\s*\})/;
  if (!re.test(html)) throw new Error("FAQPage-schema niet gevonden in index.html");
  return html.replace(re, `$1${block}$2`);
}

/* ---------- productie-index.html: scripts + fonts optimaliseren ---------- */
const PROD_FONTS =
  '<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />';

const PROD_SCRIPTS = [
  '<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous" defer></script>',
  '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous" defer></script>',
  '<script src="bundle.js" defer></script>',
].join("\n");

function toProductionHtml(html) {
  // Fonts terugbrengen tot de in productie gebruikte familie (warm = Hanken Grotesk).
  let result = html.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=[\s\S]*?" rel="stylesheet" \/>/,
    PROD_FONTS
  );
  // Dev-scripts (React dev + Babel + losse JSX-bestanden) vervangen door productie-React + bundle.js.
  const scriptsRe = /<script src="https:\/\/unpkg\.com\/react@[\s\S]*?src="app\.jsx"><\/script>/;
  if (!scriptsRe.test(result)) {
    throw new Error("Script-blok niet gevonden in index.html (kan productie-scripts niet injecteren)");
  }
  result = result.replace(scriptsRe, PROD_SCRIPTS);
  return result;
}

/* ---------- JS-bundel bouwen (esbuild) ---------- */
async function buildBundle() {
  const imageSlot = readFileSync(join(root, "image-slot.js"), "utf8");
  const jsxSource = [
    readFileSync(join(root, "tweaks-panel.jsx"), "utf8"),
    readFileSync(join(root, "icons.jsx"), "utf8"),
    readFileSync(join(root, "app.jsx"), "utf8"),
  ].join("\n\n");

  const slotOut = await esbuild.transform(imageSlot, {
    loader: "js",
    minify: true,
    target: "es2019",
  });
  const jsxOut = await esbuild.transform(jsxSource, {
    loader: "jsx",
    jsx: "transform",
    minify: true,
    target: "es2019",
  });

  return `${slotOut.code}\n${jsxOut.code}`;
}

/* ---------- sitemap ---------- */
function buildSitemap() {
  const urls = [
    { loc: `${BASE}/`, priority: "1.0", changefreq: "weekly" },
    ...LANDING_PAGES.map((p) => ({
      loc: `${BASE}/${p.slug}/`,
      priority: "0.8",
      changefreq: "monthly",
    })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/* ============================================================
   Build
   ============================================================ */
async function main() {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  // 1. FAQ-schema synchroniseren in de bron-index.html (dev + prod gelijk).
  const appSource = readFileSync(join(root, "app.jsx"), "utf8");
  const faq = extractFaqFromApp(appSource);
  let indexHtml = readFileSync(join(root, "index.html"), "utf8");
  indexHtml = injectFaqSchema(indexHtml, faq);
  writeFileSync(join(root, "index.html"), indexHtml);

  // 2. Sitemap synchroniseren (root + dist).
  const sitemap = buildSitemap();
  writeFileSync(join(root, "sitemap.xml"), sitemap);

  // 3. JS-bundel bouwen.
  const bundle = await buildBundle();
  writeFileSync(join(out, "bundle.js"), bundle);

  // 4. Productie-index.html.
  writeFileSync(join(out, "index.html"), toProductionHtml(indexHtml));

  // 5. Statische assets kopiëren.
  const assets = [
    "styles.css",
    "robots.txt",
    "favicon.ico",
    "favicon.svg",
    "favicon-48x48.png",
    "favicon-192x192.png",
    "apple-touch-icon.png",
  ];
  for (const file of assets) cpSync(join(root, file), join(out, file));
  cpSync(join(root, "images"), join(out, "images"), { recursive: true });
  writeFileSync(join(out, "sitemap.xml"), sitemap);

  // 6. Landingspagina's genereren.
  for (const page of LANDING_PAGES) {
    const dir = join(out, page.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), renderLandingPage(page));
  }

  console.log(
    `Build OK: dist/ (bundle.js zonder Babel, ${LANDING_PAGES.length} landingspagina's, FAQ-schema gesynchroniseerd met ${faq.length} vragen)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
