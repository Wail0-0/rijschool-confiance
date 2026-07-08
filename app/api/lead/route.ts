import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  postcode?: string;
  source?: string;
};

export const POST = async (request: Request) => {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const phone = payload.phone?.replace(/[\s-]/g, "") ?? "";
  const postcode = payload.postcode?.trim().toUpperCase().replace(/\s+/g, "") ?? "";

  if (name.length < 2 || !/^(\+31|0031|0)6\d{8}$/.test(phone) || !/^\d{4}[A-Z]{2}$/.test(postcode)) {
    return NextResponse.json({ error: "Ongeldige naam, telefoonnummer of postcode." }, { status: 400 });
  }

  // TODO: koppel hier je CRM, e-mail (bijv. Resend) of Google Sheet aan.
  // Voor nu loggen we de lead op de server zodat niets verloren gaat.
  console.log("[NIEUWE LEAD]", {
    name,
    phone,
    postcode,
    source: payload.source ?? "onbekend",
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
};
