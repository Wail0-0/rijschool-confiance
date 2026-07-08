# Rijschool — Proefles Met 50% Korting

Conversiegerichte one-pager voor leads uit Meta-ads. Gebouwd met Next.js (App Router), TypeScript en Tailwind CSS v4.

## Starten

```bash
npm install
npm run dev
```

De site draait dan op [http://localhost:3000](http://localhost:3000).

## Meta Pixel instellen

1. Kopieer `.env.example` naar `.env.local`.
2. Vul je Pixel ID in bij `NEXT_PUBLIC_META_PIXEL_ID`.

De pagina vuurt automatisch een `PageView` af en een `Lead`-event zodra het formulier succesvol wordt verzonden. Hierop kun je je Meta-campagnes optimaliseren.

## Leads ontvangen

Leads komen binnen op de API-route `app/api/lead/route.ts`. Daar staat nu een `console.log`; koppel hier je CRM, e-mailservice (bijv. Resend) of een Google Sheet aan.

## Aanpassen

- **Teksten en cijfers** (slagingspercentage, reviews, aantal geslaagden): `app/page.tsx`
- **FAQ-vragen**: `components/FaqAccordion.tsx`
- **Formulier en validatie**: `components/LeadForm.tsx`
- **Bedrijfsgegevens** (KvK, e-mail, telefoon): footer in `app/page.tsx`

Let op: de statistieken en testimonials zijn voorbeeldcontent — vervang ze door je echte cijfers en reviews voordat je live gaat.
