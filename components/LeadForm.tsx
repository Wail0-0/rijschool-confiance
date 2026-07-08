"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

type LeadFormProps = {
  variant?: "hero" | "footer";
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const LeadForm = ({ variant = "hero" }: LeadFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isFooter = variant === "footer";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot) return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/[\s-]/g, "");
    const normalizedPostcode = postcode.trim().toUpperCase().replace(/\s+/g, "");

    if (trimmedName.length < 2) {
      setErrorMessage("Vul je voornaam in.");
      setStatus("error");
      return;
    }

    if (!/^(\+31|0031|0)6\d{8}$/.test(trimmedPhone)) {
      setErrorMessage("Vul een geldig 06-nummer in, bijv. 06 12 34 56 78.");
      setStatus("error");
      return;
    }

    if (!/^\d{4}[A-Z]{2}$/.test(normalizedPostcode)) {
      setErrorMessage("Vul een geldige postcode in, bijv. 1234AB.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          postcode: normalizedPostcode,
          source: variant,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      window.fbq?.("track", "Lead");
      setStatus("success");
    } catch {
      setErrorMessage("Er ging iets mis. Probeer het opnieuw of bel ons direct.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-volt/30 bg-volt/10 p-8 text-center backdrop-blur"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt text-ink">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-display text-2xl font-bold text-white">Gelukt. Je staat op de lijst.</p>
        <p className="text-white/70">
          We bellen of appen je vandaag nog om je proefles met 50% korting in te plannen. Kies je daarna een pakket,
          dan is je eerste les gratis.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-3 ${isFooter ? "mx-auto w-full max-w-md" : "w-full"}`}
      aria-label="Vraag je proefles voor de helft van de prijs aan"
    >
      <label className="sr-only" htmlFor={`name-${variant}`}>
        Voornaam
      </label>
      <input
        id={`name-${variant}`}
        type="text"
        autoComplete="given-name"
        placeholder="Je voornaam"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-base text-white transition placeholder:text-white/35 focus:border-volt/60 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-volt/40"
        required
      />

      <label className="sr-only" htmlFor={`phone-${variant}`}>
        Telefoonnummer
      </label>
      <input
        id={`phone-${variant}`}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="Je 06-nummer"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-base text-white transition placeholder:text-white/35 focus:border-volt/60 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-volt/40"
        required
      />

      <label className="sr-only" htmlFor={`postcode-${variant}`}>
        Postcode
      </label>
      <input
        id={`postcode-${variant}`}
        type="text"
        autoComplete="postal-code"
        inputMode="text"
        placeholder="Je postcode"
        value={postcode}
        onChange={(event) => setPostcode(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-base text-white uppercase transition placeholder:normal-case placeholder:text-white/35 focus:border-volt/60 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-volt/40"
        required
      />

      {/* Honeypot tegen spam-bots, onzichtbaar voor echte bezoekers */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-volt px-6 py-4 text-lg font-bold text-ink shadow-[0_0_40px_-8px] shadow-volt/60 transition duration-300 hover:shadow-[0_0_60px_-8px] hover:shadow-volt/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{status === "submitting" ? "Versturen..." : "Claim mijn 50% korting"}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="flex items-center justify-center gap-1.5 text-sm text-white/45">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-volt" aria-hidden="true">
          <path
            d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        50% korting &middot; 1e les gratis bij pakket &middot; Binnen 24 uur contact
      </p>
    </form>
  );
};

export default LeadForm;
