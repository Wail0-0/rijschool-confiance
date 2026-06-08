import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

const files = [
  "index.html",
  "styles.css",
  "app.jsx",
  "icons.jsx",
  "tweaks-panel.jsx",
  "image-slot.js",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "favicon.svg",
  "favicon-48x48.png",
  "favicon-192x192.png",
  "apple-touch-icon.png",
];

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

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const appSource = readFileSync(join(root, "app.jsx"), "utf8");
const faq = extractFaqFromApp(appSource);

let indexHtml = readFileSync(join(root, "index.html"), "utf8");
indexHtml = injectFaqSchema(indexHtml, faq);
writeFileSync(join(root, "index.html"), indexHtml);

for (const file of files) {
  if (file === "index.html") {
    writeFileSync(join(out, file), indexHtml);
    continue;
  }
  cpSync(join(root, file), join(out, file));
}

cpSync(join(root, "images"), join(out, "images"), { recursive: true });

console.log("Build OK: dist/ (FAQ-schema gesynchroniseerd, " + faq.length + " vragen)");
