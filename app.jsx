/* ============================================================
   Rijschool Confiance — app
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- content data ---------- */
const AREAS = [
  "Rotterdam-Centrum", "Rotterdam-Zuid", "Kralingen", "Charlois", "Feijenoord",
  "Hillegersberg", "Delfshaven", "Schiedam", "Capelle a/d IJssel", "Barendrecht",
  "Vlaardingen", "Ridderkerk",
];

const PACKAGES = [
  { name: "Starterspakket", meta: "10 rijlessen × 60 min", price: 495, was: 500, save: "Voordeliger dan los" },
  { name: "Doorpakker", meta: "20 rijlessen × 90 min", price: 1450, was: 1500, save: "€50 voordeel", feat: true },
  { name: "Examenpakket", meta: "Tussentijdse toets + examen", price: null, note: "Op aanvraag. Incl. lesauto bij CBR, CBR-kosten apart." },
];

const REVIEWS = [
  { stars: 5, quote: "Super rustige instructeur. Door de persoonlijke aanpak ben ik in één keer geslaagd. Echt een aanrader voor regio Rotterdam!", name: "Sanne de Vries", meta: "Geslaagd · Rotterdam-Zuid", id: "rev1" },
  { stars: 5, quote: "Begon met flink wat examenstress, maar Confiance nam alle tijd voor me. Vertrouwen kreeg ik echt terug achter het stuur.", name: "Younes el Amrani", meta: "Geslaagd · Kralingen", id: "rev2" },
  { stars: 5, quote: "Duidelijke uitleg, flexibel inplannen en een nette lesauto. Top begeleiding van proefles tot examen.", name: "Lisa Bakker", meta: "Geslaagd · Schiedam", id: "rev3" },
];

const FAQ = [
  { q: "Is de proefles echt gratis?", a: "Ja! Je eerste les van 60 minuten is volledig gratis en vrijblijvend. Zo ervaar je rustig hoe het rijden bevalt en of het klikt met je instructeur, zonder verplichtingen." },
  { q: "In welke regio geven jullie les?", a: "We lessen in heel groot-Rotterdam: van Centrum en Rotterdam-Zuid tot Kralingen, Charlois, Schiedam, Capelle en omliggende gemeenten. Twijfel je over jouw plaats? Stuur een berichtje, we kijken altijd mee." },
  { q: "Lessen jullie in een schakelauto of automaat?", a: "Onze lessen zijn standaard in een schakelauto. Wil je liever in een automaat rijden? Geef het aan bij je aanmelding, dan bespreken we de mogelijkheden." },
  { q: "Wat kost een rijles?", a: "Een losse les van 60 minuten kost €50 en een les van 90 minuten €75. Met een pakket les je voordeliger. De gratis proefles staat hier los van." },
  { q: "Hoe zit het met de tussentijdse toets en het examen?", a: "We bieden begeleiding richting de tussentijdse toets en het praktijkexamen, inclusief je vertrouwde lesauto bij het CBR. De examenkosten van het CBR zelf betaal je apart aan het CBR." },
  { q: "Hoe kan ik betalen?", a: "Je kunt per les of per pakket betalen. We stemmen samen een ritme af dat bij jou past, daar maken we het graag makkelijk in." },
];

/* ---------- kleine helpers ---------- */
function Stars({ n = 5 }) {
  return <span className="stars" aria-label={n + " van 5 sterren"}>{"★".repeat(n)}</span>;
}
function Reveal({ as = "div", className = "", children, ...rest }) {
  const Tag = as;
  return <Tag className={"reveal " + className} {...rest}>{children}</Tag>;
}

/* ============================================================
   NAVBAR
   ============================================================ */
const NAV_LINKS = [
  ["#over", "Over ons"],
  ["#lesgebied", "Lesgebied"],
  ["#tarieven", "Tarieven"],
  ["#pakketten", "Pakketten"],
  ["#reviews", "Reviews"],
  ["#faq", "FAQ"],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* sluit het mobiele menu zodra het scherm weer breed genoeg is of bij Escape */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 920) setMenuOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "") + (menuOpen ? " menu-open" : "")}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="Rijschool Confiance, naar boven" onClick={handleNavClick}>
          <span className="mark">C</span>
          <span>Confiance<small>Rijschool · Rotterdam</small></span>
        </a>
        <nav className="nav-links" aria-label="Hoofdmenu">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn btn-primary" href="#contact">Gratis proefles</a>
        </div>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={menuOpen}
          aria-controls="mobiel-menu"
          onClick={handleToggle}
        >
          <span /><span /><span />
        </button>
      </div>
      <div id="mobiel-menu" className={"nav-mobile" + (menuOpen ? " open" : "")}>
        <nav aria-label="Mobiel menu">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={handleNavClick}>{label}</a>
          ))}
          <a className="btn btn-primary" href="#contact" onClick={handleNavClick}>Gratis proefles</a>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ title, sub }) {
  return (
    <section className="hero section-pad" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal as="span" className="eyebrow">Rijschool in regio Rotterdam</Reveal>
          <Reveal as="h1" style={{ transitionDelay: ".05s" }}
            dangerouslySetInnerHTML={{ __html: title }} />
          <Reveal as="p" className="hero-sub" style={{ transitionDelay: ".1s" }}>{sub}</Reveal>
          <Reveal className="hero-actions" style={{ transitionDelay: ".15s" }}>
            <a className="btn btn-primary btn-lg" href="#contact">
              Plan je gratis proefles
            </a>
            <a className="btn btn-ghost btn-lg" href="#tarieven">Bekijk tarieven</a>
          </Reveal>
          <Reveal className="hero-trust" style={{ transitionDelay: ".2s" }}>
            <Stars n={5} />
            <small>Beoordeeld met een 9,4 door geslaagde leerlingen</small>
          </Reveal>
        </div>
        <Reveal className="hero-media" style={{ transitionDelay: ".1s" }}>
          <image-slot id="hero-photo" class="hero-photo" shape="rect"
            placeholder="Sleep hier een foto: lesauto of leerling"></image-slot>
          <div className="float-card tl">
            <div className="big">9,4</div>
            <div className="lbl">Gem. cijfer leerlingen</div>
          </div>
          <div className="float-card br">
            <div className="big" style={{ fontSize: "1.12rem" }}>Gratis proefles</div>
            <div className="lbl">Vrijblijvend kennismaken</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   TRUSTBAR
   ============================================================ */
function TrustBar() {
  const items = [
    "Gratis & vrijblijvende proefles",
    "Vaste, vertrouwde instructeur",
    "Flexibel lessen inplannen",
    "Nette, moderne lesauto",
  ];
  return (
    <div className="trustbar">
      <div className="wrap">
        {items.map((tx, k) => (
          <div className="ti" key={k}>{tx}</div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   OVER ONS
   ============================================================ */
function Over() {
  const feats = [
    { h: "Rijden met vertrouwen", p: "‘Confiance’ betekent vertrouwen. Dat is precies waar wij voor gaan: jij stapt zelfverzekerd de weg op." },
    { h: "Jouw eigen instructeur", p: "Geen wisselende gezichten. Je houdt dezelfde instructeur die jou en je leerdoelen door en door kent." },
    { h: "Op jouw tempo", p: "De één heeft meer tijd nodig dan de ander. We stemmen elke les af op waar jij staat, zonder druk." },
  ];
  return (
    <section className="section-pad" id="over">
      <div className="wrap split">
        <Reveal className="split-media">
          <image-slot id="over-photo" shape="rect"
            placeholder="Sleep hier een foto: instructeur"></image-slot>
        </Reveal>
        <div className="split-copy">
          <Reveal as="span" className="eyebrow">Over Confiance</Reveal>
          <Reveal as="h2" className="" style={{ fontSize: "clamp(2rem,3.6vw,3rem)", marginTop: "16px" }}>
            Een rijschool die naast je staat, niet boven je
          </Reveal>
          <Reveal as="p" style={{ color: "var(--muted)", fontSize: "1.1rem", marginTop: "16px" }}>
            Bij Rijschool Confiance draait alles om rust en vertrouwen. We leren je niet alleen
            slagen voor je examen, maar zelfstandig en veilig rijden in en rond Rotterdam, voor de rest van je leven.
          </Reveal>
          <div className="feature-list">
            {feats.map((f, k) => (
              <Reveal className="fi" key={k} style={{ transitionDelay: (k * 0.06) + "s" }}>
                <h4>{f.h}</h4>
                <p>{f.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LESGEBIED
   ============================================================ */
function Lesgebied() {
  return (
    <section className="section-pad" id="lesgebied">
      <div className="wrap">
        <Reveal className="region">
          <div className="region-grid">
            <div className="region-copy">
              <span className="eyebrow">Lesgebied</span>
              <h2>Wij lessen in heel groot-Rotterdam</h2>
              <p>
                Van de Erasmusbrug tot de buitenwijken: we kennen de straten, rotondes en
                examenroutes van de regio op ons duimpje. Je oefent precies daar waar het examen plaatsvindt.
              </p>
              <div className="area-tags">
                {AREAS.map((a) => <span key={a}>{a}</span>)}
              </div>
              <a className="btn btn-light" href="#contact" style={{ marginTop: "28px" }}>
                Lessen jullie bij mij? Vraag het ons
              </a>
            </div>
            <div className="region-media">
              <image-slot id="region-photo" shape="rect"
                placeholder="Sleep hier een foto: Rotterdam / Erasmusbrug"></image-slot>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   TARIEVEN
   ============================================================ */
function Tarieven() {
  const cards = [
    {
      tag: "Kennismaken", name: "Gratis proefles", val: "€0", per: "60 min",
      desc: "Maak vrijblijvend kennis en ervaar of het klikt.",
      feat: false,
      list: ["Volledig gratis", "Geen verplichtingen", "Direct goede indruk"],
      cta: "Plan proefles",
    },
    {
      tag: "Populair", name: "Rijles 90 min", val: "€75", per: "per les",
      desc: "Langere lessen = sneller leren en meer kilometers maken.",
      feat: true,
      list: ["90 minuten effectief rijden", "Meer voortgang per les", "Ideaal richting examen"],
      cta: "Kies 90 minuten",
    },
    {
      tag: "Flexibel", name: "Rijles 60 min", val: "€50", per: "per les",
      desc: "De vertrouwde losse rijles van een uur.",
      feat: false,
      list: ["60 minuten rijles", "Per les af te rekenen", "Flexibel in te plannen"],
      cta: "Kies 60 minuten",
    },
  ];
  return (
    <section className="section-pad" id="tarieven">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Tarieven</span>
          <h2>Heldere prijzen, geen verrassingen</h2>
          <p>Eerlijke tarieven voor de regio Rotterdam. Je start altijd met een gratis proefles.</p>
        </Reveal>
        <div className="price-grid">
          {cards.map((c, k) => (
            <Reveal className={"price-card" + (c.feat ? " feat" : "")} key={k} style={{ transitionDelay: (k * 0.07) + "s" }}>
              <span className="chip pc-tag">{c.tag}</span>
              <h3>{c.name}</h3>
              <div className="amount"><span className="val">{c.val}</span><span className="per">/ {c.per}</span></div>
              <p className="desc">{c.desc}</p>
              <ul>
                {c.list.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
              <a className={"btn " + (c.feat ? "btn-light" : "btn-primary")} href="#contact">{c.cta}</a>
            </Reveal>
          ))}
        </div>
        <p className="price-note">Prijzen incl. btw. Examen- en CBR-kosten worden apart in rekening gebracht door het CBR.</p>
      </div>
    </section>
  );
}

/* ============================================================
   PAKKETTEN
   ============================================================ */
function Pakketten() {
  return (
    <section className="section-pad" id="pakketten" style={{ background: "var(--surface)" }}>
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Pakketten</span>
          <h2>Voordeliger met een lespakket</h2>
          <p>Liever in één keer geregeld? Met een pakket les je gestructureerd én voordeliger.</p>
        </Reveal>
        <div className="pack-grid">
          {PACKAGES.map((p, k) => (
            <Reveal className="pack" key={k} style={{ transitionDelay: (k * 0.07) + "s", ...(p.feat ? { borderColor: "color-mix(in oklab, var(--accent) 45%, var(--line))", boxShadow: "var(--shadow-md)" } : {}) }}>
              {p.feat && <span className="chip pc-tag" style={{ alignSelf: "flex-start", marginBottom: "4px" }}>Meest gekozen</span>}
              <div className="pk-name">{p.name}</div>
              <div className="pk-meta">{p.meta}</div>
              {p.price != null ? (
                <>
                  <div className="pk-price"><b>€{p.price.toLocaleString("nl-NL")}</b>{p.was && <s>€{p.was.toLocaleString("nl-NL")}</s>}</div>
                  {p.save && <span className="pk-save">{p.save}</span>}
                </>
              ) : (
                <>
                  <div className="pk-price"><b style={{ fontSize: "1.5rem" }}>Op aanvraag</b></div>
                  <p style={{ color: "var(--muted)", fontSize: ".92rem", marginTop: "8px" }}>{p.note}</p>
                </>
              )}
              <a className="btn btn-ghost" href="#contact" style={{ marginTop: "auto", justifyContent: "center" }}>Meer weten</a>
            </Reveal>
          ))}
        </div>
        <p className="price-note">Pakketprijzen zijn richtprijzen. We stellen samen een plan op dat past bij jouw rij-ervaring.</p>
      </div>
    </section>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function Reviews() {
  return (
    <section className="section-pad" id="reviews">
      <div className="wrap">
        <Reveal className="rev-head">
          <div className="sec-head" style={{ margin: 0 }}>
            <span className="eyebrow">Ervaringen</span>
            <h2>Leerlingen rijden met vertrouwen</h2>
          </div>
          <div className="rev-score">
            <div className="num">9,4</div>
            <div>
              <Stars n={5} />
              <small style={{ display: "block" }}>Gem. beoordeling van geslaagden</small>
            </div>
          </div>
        </Reveal>
        <div className="rev-grid">
          {REVIEWS.map((r, k) => (
            <Reveal className="rev-card" key={k} style={{ transitionDelay: (k * 0.07) + "s" }}>
              <Stars n={r.stars} />
              <p className="quote">“{r.quote}”</p>
              <div className="who">
                <image-slot id={r.id} shape="rect" placeholder="foto"></image-slot>
                <div><b>{r.name}</b><span>{r.meta}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="price-note">Voorbeeldreviews. Vervang ze door echte ervaringen van je geslaagden.</p>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" id="faq" style={{ background: "var(--surface)" }}>
      <div className="wrap faq-grid">
        <Reveal className="sec-head" style={{ margin: 0 }}>
          <span className="eyebrow">Veelgestelde vragen</span>
          <h2>Goed om te weten</h2>
          <p>Staat jouw vraag er niet bij? Bel of mail ons gerust. We denken graag met je mee.</p>
          <a className="btn btn-primary" href="#contact" style={{ marginTop: "22px" }}>Stel je vraag</a>
        </Reveal>
        <div className="faq-list">
          {FAQ.map((f, k) => {
            const isOpen = open === k;
            return (
              <Reveal className={"faq-item" + (isOpen ? " open" : "")} key={k} style={{ transitionDelay: (k * 0.04) + "s" }}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : k)}>
                  {f.q}
                  <span className="ico">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? "260px" : "0" }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT / FORMULIER
   ============================================================ */
function Contact() {
  const [form, setForm] = useState({ naam: "", email: "", tel: "", type: "Gratis proefles", bericht: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.naam.trim()) e.naam = "Vul je naam in";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Vul een geldig e-mailadres in";
    if (!form.tel.trim() || form.tel.replace(/\D/g, "").length < 8) e.tel = "Vul je telefoonnummer in";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };
  const types = ["Gratis proefles", "Rijles 60 min", "Rijles 90 min", "Pakket", "Vraag"];

  return (
    <section className="contact section-pad" id="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--accent) 55%, #fff)" }}>Aanmelden</span>
          <h2 style={{ marginTop: "16px" }}>Klaar om te starten?</h2>
          <p className="lead">Laat je gegevens achter voor een <strong>gratis proefles</strong> of stel je vraag. We nemen snel contact met je op.</p>
          <div className="contact-info">
            <a href="tel:+31684346439">
              <small>Bel of app ons</small>
              <strong>+31 6 84 34 64 39</strong>
            </a>
            <a href="mailto:rijschoolconfiance@gmail.com">
              <small>Mail ons je vraag</small>
              <strong>rijschoolconfiance@gmail.com</strong>
            </a>
            <div className="ci">
              <small>Lesgebied</small>
              <strong>Regio Rotterdam</strong>
            </div>
          </div>
        </div>

        <div className="form">
          {sent ? (
            <div className="form-success">
              <h3>Bedankt, {form.naam.split(" ")[0]}!</h3>
              <p>We hebben je aanmelding ontvangen en nemen snel contact met je op voor je {form.type.toLowerCase()}.</p>
              <a className="btn btn-ghost" style={{ marginTop: "22px", display: "inline-flex", width: "auto" }}
                href={"mailto:rijschoolconfiance@gmail.com?subject=" + encodeURIComponent("Aanmelding: " + form.type) + "&body=" + encodeURIComponent("Naam: " + form.naam + "\nTelefoon: " + form.tel + "\n\n" + form.bericht)}>
                Of mail ons direct
              </a>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="frow">
                <div className={"field" + (errors.naam ? " err" : "")}>
                  <label htmlFor="naam">Naam</label>
                  <input id="naam" value={form.naam} onChange={(e) => set("naam", e.target.value)} placeholder="Voor- en achternaam" />
                  {errors.naam && <span className="msg">{errors.naam}</span>}
                </div>
                <div className={"field" + (errors.tel ? " err" : "")}>
                  <label htmlFor="tel">Telefoon</label>
                  <input id="tel" value={form.tel} onChange={(e) => set("tel", e.target.value)} placeholder="06 12 34 56 78" inputMode="tel" />
                  {errors.tel && <span className="msg">{errors.tel}</span>}
                </div>
              </div>
              <div className={"field" + (errors.email ? " err" : "")}>
                <label htmlFor="email">E-mail</label>
                <input id="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jij@email.nl" inputMode="email" />
                {errors.email && <span className="msg">{errors.email}</span>}
              </div>
              <div className="field">
                <label>Ik wil graag</label>
                <div className="segmented">
                  {types.map((t) => (
                    <button type="button" key={t} className={form.type === t ? "on" : ""} onClick={() => set("type", t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="bericht">Bericht <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optioneel)</span></label>
                <textarea id="bericht" value={form.bericht} onChange={(e) => set("bericht", e.target.value)} placeholder="Bijv. je woonplaats of wanneer je wilt starten" />
              </div>
              <button className="btn btn-primary" type="submit">
                Verstuur aanmelding
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="brand" href="#top"><span className="mark">C</span><span>Confiance<small>Rijschool · Rotterdam</small></span></a>
            <p style={{ marginTop: "16px", maxWidth: "30ch", color: "rgba(255,255,255,.6)" }}>Leer rijden met vertrouwen in de regio Rotterdam. Start met een gratis proefles.</p>
          </div>
          <div className="footer-cols">
            <div>
              <h5>Menu</h5>
              <a href="#over">Over ons</a>
              <a href="#lesgebied">Lesgebied</a>
              <a href="#tarieven">Tarieven</a>
              <a href="#pakketten">Pakketten</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h5>Contact</h5>
              <a href="tel:+31684346439">+31 6 84 34 64 39</a>
              <a href="mailto:rijschoolconfiance@gmail.com">rijschoolconfiance@gmail.com</a>
              <span className="fl">Regio Rotterdam</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Rijschool Confiance</span>
          <span>Rijden met vertrouwen 🚗</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   TWEAKS DEFAULTS + APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "stijl": "warm",
  "accent": "#2f6fd0",
  "koppen": "auto",
  "heroTitle": "Leer rijden met <span class=\"hl\">vertrouwen</span>",
  "heroSub": "Persoonlijke rijlessen in de regio Rotterdam. Rustige aanpak, vaste instructeur en je eerste les is gratis."
}/*EDITMODE-END*/;

const FONT_MAP = {
  auto: null,
  bricolage: '"Bricolage Grotesque", sans-serif',
  schibsted: '"Schibsted Grotesk", sans-serif',
  space: '"Space Grotesk", sans-serif',
  hanken: '"Hanken Grotesk", sans-serif',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* pas stijl + accent toe op <html> */
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-style", t.stijl);
    r.style.setProperty("--accent", t.accent);
    if (t.koppen && t.koppen !== "auto" && FONT_MAP[t.koppen]) {
      r.style.setProperty("--font-display", FONT_MAP[t.koppen]);
    } else {
      r.style.removeProperty("--font-display");
    }
  }, [t.stijl, t.accent, t.koppen]);

  /* reveal-on-scroll — alleen inschakelen als animatieframes echt draaien,
     anders blijft alles gewoon zichtbaar (basisstijl). */
  useEffect(() => {
    let frames = 0;
    let stop = false;
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach((e) => {
        if (e.getBoundingClientRect().top < vh * 0.92) e.classList.add("in");
      });
    };
    const onScroll = () => requestAnimationFrame(check);
    const enable = () => {
      document.documentElement.setAttribute("data-anim", "on");
      check();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };
    // twee opeenvolgende frames = de compositor draait echt → animaties aan
    const tick = () => {
      if (stop) return;
      frames++;
      if (frames >= 2) enable();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      stop = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero title={t.heroTitle} sub={t.heroSub} />
        <TrustBar />
        <Over />
        <Lesgebied />
        <Tarieven />
        <Pakketten />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Ontwerprichting" />
        <TweakRadio label="Stijl" value={t.stijl}
          options={[{ value: "warm", label: "Warm" }, { value: "strak", label: "Strak" }, { value: "energiek", label: "Energiek" }]}
          onChange={(v) => setTweak("stijl", v)} />
        <TweakSection label="Kleur & type" />
        <TweakColor label="Accentkleur" value={t.accent}
          options={["#2f6fd0", "#1b50a3", "#12305f", "#1d9bd1", "#3aa17e"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Koppen-lettertype" value={t.koppen}
          options={[
            { value: "auto", label: "Automatisch (bij stijl)" },
            { value: "bricolage", label: "Bricolage Grotesque" },
            { value: "schibsted", label: "Schibsted Grotesk" },
            { value: "space", label: "Space Grotesk" },
            { value: "hanken", label: "Hanken Grotesk" },
          ]}
          onChange={(v) => setTweak("koppen", v)} />
        <TweakSection label="Hero-tekst" />
        <TweakText label="Titel" value={t.heroTitle} onChange={(v) => setTweak("heroTitle", v)} />
        <TweakText label="Subtitel" value={t.heroSub} onChange={(v) => setTweak("heroSub", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
