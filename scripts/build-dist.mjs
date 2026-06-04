import { cpSync, mkdirSync, rmSync } from "node:fs";
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
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const file of files) {
  cpSync(join(root, file), join(out, file));
}

cpSync(join(root, "images"), join(out, "images"), { recursive: true });

console.log("Build OK: dist/");
