/* ============================================================
   Rijschool Confiance - server
   Serveert de statische site en verstuurt aanmeldingen via Resend.
   De Resend API-key komt uit de env-var RESEND_API_KEY (nooit hardcoden).
   ============================================================ */
import express from "express";
import { Resend } from "resend";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = express();

// In productie serveren we de geoptimaliseerde build (dist/); valt terug op de
// projectroot wanneer er nog geen build is gemaakt.
const distDir = join(here, "dist");
const staticDir = existsSync(join(distDir, "index.html")) ? distDir : here;

const PORT = process.env.PORT || 3000;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_TO = process.env.MAIL_TO || "Rijschoolconfiance@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || "Rijschool Confiance <onboarding@resend.dev>";

if (!RESEND_API_KEY) {
  console.warn("[server] Let op: RESEND_API_KEY ontbreekt. /api/contact werkt pas zodra deze env-var is gezet.");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

app.use(express.json({ limit: "32kb" }));

const isEmail = (v) => typeof v === "string" && /^\S+@\S+\.\S+$/.test(v);
const clean = (v) => (typeof v === "string" ? v.trim() : "");
const escapeHtml = (v) =>
  clean(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildRows = (fields) =>
  fields
    .filter(([, value]) => clean(value))
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;color:#5b6b82;font:600 14px system-ui,sans-serif;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#0f1b2e;font:600 15px system-ui,sans-serif">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`
    )
    .join("");

app.post("/api/contact", async (req, res) => {
  if (!resend) {
    return res.status(503).json({ ok: false, error: "E-mailservice is niet geconfigureerd." });
  }

  const body = req.body || {};

  // Honeypot: bots vullen dit verborgen veld in.
  if (clean(body.company)) {
    return res.json({ ok: true });
  }

  const type = clean(body.type) || "Aanmelding";
  const transmissie = clean(body.transmissie) === "automaat" ? "Automaat" : "Schakel";
  const naam = clean(body.naam);
  const email = clean(body.email);
  const tel = clean(body.tel);
  const plaats = clean(body.plaats);
  const bericht = clean(body.bericht);

  if (!naam || !isEmail(email) || tel.replace(/\D/g, "").length < 8) {
    return res.status(400).json({ ok: false, error: "Controleer je naam, e-mailadres en telefoonnummer." });
  }

  const rows = buildRows([
    ["Aanmelding", type],
    ["Auto", transmissie],
    ["Naam", naam],
    ["Telefoon", tel],
    ["E-mail", email],
    ["Woonplaats", plaats],
    ["Bericht", bericht],
  ]);

  const html = `
    <div style="background:#f6f8fc;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e1e8f2;border-radius:12px;overflow:hidden">
        <div style="background:#0d1f3c;color:#fff;padding:20px 24px;font:800 18px system-ui,sans-serif">
          Nieuwe aanmelding via de website
        </div>
        <div style="padding:20px 24px">
          <table style="border-collapse:collapse;width:100%">${rows}</table>
        </div>
      </div>
    </div>`;

  const text = [
    `Nieuwe aanmelding via de website`,
    ``,
    `Aanmelding: ${type}`,
    `Auto: ${transmissie}`,
    `Naam: ${naam}`,
    `Telefoon: ${tel}`,
    `E-mail: ${email}`,
    plaats ? `Woonplaats: ${plaats}` : null,
    bericht ? `\nBericht:\n${bericht}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: email,
      subject: `Nieuwe aanmelding: ${type} — ${naam}`,
      html,
      text,
    });

    if (error) {
      console.error("[server] Resend-fout:", error);
      return res.status(502).json({ ok: false, error: "Versturen mislukt. Probeer het later opnieuw." });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("[server] Onverwachte fout:", err);
    return res.status(500).json({ ok: false, error: "Er ging iets mis. Probeer het later opnieuw." });
  }
});

app.use(express.static(staticDir));
app.get("*", (req, res) => res.sendFile(join(staticDir, "index.html")));

app.listen(PORT, () => {
  console.log(`[server] Rijschool Confiance draait op poort ${PORT}`);
});
