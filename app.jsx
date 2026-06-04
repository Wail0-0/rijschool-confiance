/* ============================================================
   Rijschool Confiance — app
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- content data ---------- */
const GESLAAGD_PHOTOS = [
  "images/geslaagd/505117845_18013138370746836_4240643234952017786_n.jpg",
  "images/geslaagd/505499879_18013138052746836_4856793965508230546_n.jpg",
  "images/geslaagd/510954290_18013139231746836_2285980070674998542_n.jpg",
  "images/geslaagd/541676020_18020237564746836_1842049651904237913_n.jpg",
  "images/geslaagd/568743199_18026839310746836_245520182515483839_n.jpg",
  "images/geslaagd/586276401_18029985632746836_6827936111124191817_n.jpg",
  "images/geslaagd/587490408_18032689802746836_1364934646307047012_n.jpg",
  "images/geslaagd/619614281_18009798722825199_1543830528189020152_n.jpg",
  "images/geslaagd/628416926_18040843136746836_112453354783511683_n.jpg",
  "images/geslaagd/628574731_18379335250086567_7025918174924890030_n.jpg",
  "images/geslaagd/640922325_18040781093746836_8709303707900824573_n.jpg",
  "images/geslaagd/649240675_18042423716746836_8282710191229587838_n.jpg",
  "images/geslaagd/656148640_18044205065746836_3048059604311403503_n.jpg",
  "images/geslaagd/703298290_18051672371746836_6290228324899031866_n.jpg",
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

function Brand({ onClick, className = "" }) {
  return (
    <a
      className={"brand" + (className ? " " + className : "")}
      href="#top"
      aria-label="Rijschool Confiance, naar boven"
      onClick={onClick}
    >
      <img
        className="brand-logo"
        src="images/logo.png"
        alt="Rijschool Confiance"
        width="200"
        height="56"
        decoding="async"
      />
    </a>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
const NAV_LINKS = [
  ["#over", "Over ons"],
  ["#lesgebied", "Lesgebied"],
  ["#tarieven", "Tarieven"],
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

  /* voorkom scrollen achter het open mobiele menu */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);
  const handleBackdropClick = () => setMenuOpen(false);

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "") + (menuOpen ? " menu-open" : "")}>
        <div className="wrap nav-inner">
          <Brand onClick={handleNavClick} />
          <nav className="nav-links" aria-label="Hoofdmenu">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href="tel:+31684346439" aria-label="Bel 06 84 34 64 39">
              <Icon name="phone" size={17} />
              <span>06 84 34 64 39</span>
            </a>
            <a className="btn btn-primary nav-cta-btn" href="#contact">Gratis proefles</a>
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
      </header>

      <div
        className={"nav-backdrop" + (menuOpen ? " visible" : "")}
        aria-hidden="true"
        onClick={handleBackdropClick}
      />
      <div
        id="mobiel-menu"
        className={"nav-mobile" + (menuOpen ? " open" : "")}
        role="dialog"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
        aria-label="Navigatiemenu"
      >
        <div className="nav-mobile-head">
          <Brand onClick={handleNavClick} />
          <button
            type="button"
            className="nav-close"
            aria-label="Menu sluiten"
            onClick={handleNavClick}
          >
            <span /><span />
          </button>
        </div>
        <nav aria-label="Mobiel menu">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={handleNavClick}>{label}</a>
          ))}
        </nav>
        <div className="nav-mobile-foot">
          <a className="btn btn-primary" href="#contact" onClick={handleNavClick}>
            Gratis proefles
            <Icon name="arrow" size={18} />
          </a>
          <a className="nav-mobile-phone" href="tel:+31684346439" onClick={handleNavClick}>
            <Icon name="phone" size={18} />
            Bel 06 84 34 64 39
          </a>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ title, sub }) {
  const usps = [
    "Je eerste proefles is volledig gratis",
    "Eén vaste, vertrouwde instructeur",
    "Lessen op jouw tempo, zonder druk",
  ];
  return (
    <section className="hero section-pad" id="top" aria-label="Intro">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <Reveal as="h1" style={{ transitionDelay: ".05s" }}
            dangerouslySetInnerHTML={{ __html: title }} />
          <Reveal as="p" className="hero-sub" style={{ transitionDelay: ".1s" }}>{sub}</Reveal>
          <Reveal as="ul" className="hero-usps" style={{ transitionDelay: ".15s" }}>
            {usps.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </Reveal>
          <Reveal className="hero-actions" style={{ transitionDelay: ".2s" }}>
            <a className="btn btn-primary btn-lg" href="#contact">
              Plan je gratis proefles
              <Icon name="arrow" size={19} />
            </a>
            <a className="btn btn-ghost btn-lg" href="tel:+31684346439">
              <Icon name="phone" size={18} />
              Bel direct
            </a>
          </Reveal>
          <Reveal as="p" className="hero-reassure" style={{ transitionDelay: ".25s" }}>
            Vrijblijvend &amp; zonder verplichtingen
          </Reveal>
        </div>
      </div>
    </section>
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
    <section className="section-pad band-light" id="over">
      <div className="wrap split">
        <Reveal className="split-media">
          <image-slot id="over-photo" shape="rect" fit="cover"
            src="images/geslaagd/505499879_18013138052746836_4856793965508230546_n.jpg"
            placeholder="Geslaagde leerling bij Rijschool Confiance"></image-slot>
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
    <section className="section-pad band-muted" id="lesgebied">
      <div className="wrap split rev">
        <Reveal className="split-media">
          <image-slot id="region-photo" shape="rect" fit="cover"
            src="images/rotterdam.jpg"
            placeholder="Rotterdam skyline"></image-slot>
        </Reveal>
        <div className="split-copy">
          <Reveal as="span" className="eyebrow">Lesgebied</Reveal>
          <Reveal as="h2" style={{ fontSize: "clamp(2rem,3.6vw,3rem)", marginTop: "16px" }}>
            Wij lessen in heel Rotterdam
          </Reveal>
          <Reveal as="p" style={{ color: "var(--muted)", fontSize: "1.1rem", marginTop: "16px" }}>
            Van de Erasmusbrug tot de buitenwijken: we kennen de straten, rotondes en
            examenroutes van de regio op ons duimpje. Je oefent precies daar waar het examen plaatsvindt.
          </Reveal>
          <Reveal>
            <a className="btn btn-primary" href="#contact" style={{ marginTop: "28px" }}>
              Plan een proefles
            </a>
          </Reveal>
        </div>
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
      tag: "Zilveren pakket", val: "€1320",
      desc: "Een stevige basis om vol vertrouwen op te bouwen richting je examen.",
      feat: false,
      list: ["20 rijlessen", "Inclusief praktijkexamen", "Vaste, vertrouwde instructeur"],
    },
    {
      tag: "Gouden pakket", val: "€1800",
      desc: "Onze meest gekozen optie: ruim de tijd om alles goed onder de knie te krijgen.",
      feat: true,
      list: ["30 rijlessen", "Inclusief praktijkexamen", "Ideaal voor de meeste leerlingen"],
    },
    {
      tag: "Diamanten pakket", val: "€2250",
      desc: "Alle ruimte en rust, zonder zorgen over extra lessen tot je er klaar voor bent.",
      feat: false,
      list: ["40 rijlessen", "Inclusief praktijkexamen", "Maximale voorbereiding"],
    },
  ];
  const losse = [
    { naam: "Losse les", per: "60 minuten", val: "€55" },
    { naam: "Losse les", per: "90 minuten", val: "€75" },
    { naam: "Los examen", per: "praktijkexamen", val: "€350" },
  ];
  return (
    <section className="section-pad band-light" id="tarieven">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Tarieven</span>
          <h2>Heldere prijzen, geen verrassingen</h2>
          <p>Kies het pakket dat bij je past. Je start altijd met een gratis proefles.</p>
        </Reveal>
        <div className="price-grid">
          {cards.map((c, k) => (
            <Reveal className={"price-card" + (c.feat ? " feat" : "")} key={k} style={{ transitionDelay: (k * 0.07) + "s" }}>
              {c.feat && <span className="chip pc-tag">Meest gekozen</span>}
              <h3>{c.tag}</h3>
              <div className="amount"><span className="val">{c.val}</span></div>
              <p className="desc">{c.desc}</p>
              <ul>
                {c.list.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
              <a className={"btn " + (c.feat ? "btn-light" : "btn-primary")} href="#contact">Kies dit pakket</a>
            </Reveal>
          ))}
        </div>

        <Reveal className="losse-prices">
          {losse.map((l, k) => (
            <div className="losse-item" key={k}>
              <div>
                <div className="losse-name">{l.naam}</div>
                <div className="losse-per">{l.per}</div>
              </div>
              <div className="losse-val">{l.val}</div>
            </div>
          ))}
        </Reveal>

        <p className="price-note">Prijzen incl. btw. CBR-kosten worden apart in rekening gebracht door het CBR.</p>
      </div>
    </section>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function Reviews() {
  const track = [...GESLAAGD_PHOTOS, ...GESLAAGD_PHOTOS];
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const SPEED = 38;
    let paused = false;
    let resumeTimer = null;
    let raf = null;
    let last = null;
    let pos = el.scrollLeft;
    let lastSet = pos;

    const half = () => el.scrollWidth / 2;

    const step = (now) => {
      if (last == null) last = now;
      const dt = (now - last) / 1000;
      last = now;

      if (Math.abs(el.scrollLeft - lastSet) > 1.5) pos = el.scrollLeft;

      if (!paused) {
        pos += SPEED * dt;
        const h = half();
        if (h > 0 && pos >= h) pos -= h;
        el.scrollLeft = pos;
        lastSet = el.scrollLeft;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    const pauseBriefly = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 1800);
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    el.addEventListener("wheel", pauseBriefly, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", pauseBriefly, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      el.removeEventListener("wheel", pauseBriefly);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", pauseBriefly);
    };
  }, []);

  return (
    <section className="section-pad band-muted" id="reviews">
      <div className="wrap">
        <Reveal className="rev-head">
          <div className="sec-head" style={{ margin: 0 }}>
            <span className="eyebrow">Ervaringen</span>
            <h2>Leerlingen rijden met vertrouwen</h2>
          </div>
          <div className="rev-score">
            <GoogleG size={40} />
            <div>
              <div className="rev-score-top">
                <span className="num">5,0</span>
                <Stars n={5} />
              </div>
              <small>Beoordeling op Google</small>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="geslaagd-marquee" ref={scrollerRef} aria-label="Foto's van geslaagde leerlingen">
        <div className="geslaagd-track">
          {track.map((src, k) => (
            <figure className="geslaagd-item" key={src + "-" + k}>
              <img src={src} alt="Geslaagde leerling bij Rijschool Confiance" loading="lazy" decoding="async" draggable="false" />
            </figure>
          ))}
        </div>
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
    <section className="section-pad band-light" id="faq">
      <div className="wrap faq-grid">
        <Reveal className="sec-head" style={{ margin: 0 }}>
          <span className="eyebrow">Veelgestelde vragen</span>
          <h2>Goed om te weten</h2>
          <p>Staat jouw vraag er niet bij? Bel of mail ons gerust. We denken graag met je mee.</p>
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
const CONTACT_TYPES = [
  { value: "Gratis proefles", title: "Gratis proefles", desc: "Maak vrijblijvend kennis — zonder verplichtingen.", tag: "Gratis" },
  { value: "Losse rijlessen", title: "Losse rijlessen", desc: "Flexibel per les, 60 of 90 minuten." },
  { value: "Lespakket", title: "Lespakket", desc: "Voordelig en gericht richting je examen." },
  { value: "Een vraag", title: "Ik heb een vraag", desc: "Stel je vraag, we reageren snel." },
];
const CONTACT_STEPS = ["Jouw keuze", "Gegevens", "Bevestigen"];
const TRANSMISSIES = ["Schakelauto", "Automaat", "Weet ik nog niet"];
const EMPTY_FORM = { type: "Gratis proefles", transmissie: "Schakelauto", naam: "", email: "", tel: "", plaats: "", bericht: "" };

function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const wantsLessons = form.type === "Losse rijlessen" || form.type === "Lespakket";
  const isLastStep = step === CONTACT_STEPS.length - 1;
  const firstName = form.naam.trim().split(" ")[0] || "rijder";

  const validateDetails = () => {
    const e = {};
    if (!form.naam.trim()) e.naam = "Vul je naam in";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Vul een geldig e-mailadres in";
    if (!form.tel.trim() || form.tel.replace(/\D/g, "").length < 8) e.tel = "Vul je telefoonnummer in";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateDetails()) return;
    setStep((s) => Math.min(s + 1, CONTACT_STEPS.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validateDetails()) {
      setStep(1);
      return;
    }
    setSent(true);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStep(0);
    setSent(false);
  };

  const mailHref =
    "mailto:rijschoolconfiance@gmail.com?subject=" +
    encodeURIComponent("Aanmelding: " + form.type) +
    "&body=" +
    encodeURIComponent(
      "Naam: " + form.naam +
      "\nTelefoon: " + form.tel +
      "\nE-mail: " + form.email +
      (form.plaats ? "\nWoonplaats: " + form.plaats : "") +
      (wantsLessons ? "\nVoorkeur: " + form.transmissie : "") +
      "\n\n" + form.bericht
    );

  const summaryRows = [
    ["Aanmelding", form.type],
    wantsLessons && ["Voorkeur", form.transmissie],
    ["Naam", form.naam],
    ["Telefoon", form.tel],
    ["E-mail", form.email],
    form.plaats && ["Woonplaats", form.plaats],
  ].filter(Boolean);

  return (
    <section className="section-pad band-muted" id="contact">
      <div className="wrap aanmeld-wrap">
        <Reveal className="aanmeld-card">
          {sent ? (
            <div className="aanmeld-done">
              <span className="aanmeld-done-mark"><Icon name="check" size={26} stroke={2.5} /></span>
              <h3>Bedankt, {firstName}</h3>
              <p>
                We nemen snel contact met je op over je <strong>{form.type.toLowerCase()}</strong>.
              </p>
              <div className="aanmeld-done-actions">
                <a className="btn btn-primary" href={mailHref}>Mail ons direct</a>
                <button type="button" className="aanmeld-link" onClick={handleReset}>
                  Nieuwe aanmelding
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Aanmeldformulier">
              <div className="aanmeld-head">
                <ol className="aanmeld-steps" aria-label="Voortgang">
                  {CONTACT_STEPS.map((label, i) => (
                    <li
                      key={label}
                      className={"aanmeld-step-tab" + (i === step ? " active" : "") + (i < step ? " done" : "")}
                      aria-current={i === step ? "step" : undefined}
                    >
                      <span className="aanmeld-step-num">
                        {i < step ? <Icon name="check" size={14} stroke={3} /> : i + 1}
                      </span>
                      <span className="aanmeld-step-name">{label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="aanmeld-step" key={step}>
                {step === 0 && (
                  <>
                    <h3 className="aanmeld-step-title">Waarvoor meld je je aan?</h3>
                    <div className="aanmeld-opts" role="group" aria-label="Soort aanmelding">
                      {CONTACT_TYPES.map((t) => {
                        const active = form.type === t.value;
                        return (
                          <button
                            type="button"
                            key={t.value}
                            className={"aanmeld-opt" + (active ? " on" : "")}
                            aria-pressed={active}
                            onClick={() => set("type", t.value)}
                          >
                            <span className="aanmeld-opt-radio" aria-hidden="true" />
                            <span className="aanmeld-opt-body">
                              <span className="aanmeld-opt-head">
                                <span className="aanmeld-opt-title">{t.title}</span>
                                {t.tag && <span className="aanmeld-opt-tag">{t.tag}</span>}
                              </span>
                              <span className="aanmeld-opt-desc">{t.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {wantsLessons && (
                      <fieldset className="aanmeld-fieldset">
                        <legend>Voorkeur auto</legend>
                        <div className="aanmeld-pills">
                          {TRANSMISSIES.map((o) => (
                            <button
                              type="button"
                              key={o}
                              className={"aanmeld-pill" + (form.transmissie === o ? " on" : "")}
                              aria-pressed={form.transmissie === o}
                              onClick={() => set("transmissie", o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    )}
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3 className="aanmeld-step-title">Jouw gegevens</h3>
                    <div className={"aanmeld-field" + (errors.naam ? " err" : "")}>
                      <label htmlFor="naam">Naam</label>
                      <input id="naam" value={form.naam} onChange={(e) => set("naam", e.target.value)} placeholder="Voor- en achternaam" autoComplete="name" />
                      {errors.naam && <span className="aanmeld-msg">{errors.naam}</span>}
                    </div>
                    <div className="aanmeld-frow">
                      <div className={"aanmeld-field" + (errors.tel ? " err" : "")}>
                        <label htmlFor="tel">Telefoon</label>
                        <input id="tel" value={form.tel} onChange={(e) => set("tel", e.target.value)} placeholder="06 12 34 56 78" inputMode="tel" autoComplete="tel" />
                        {errors.tel && <span className="aanmeld-msg">{errors.tel}</span>}
                      </div>
                      <div className={"aanmeld-field" + (errors.email ? " err" : "")}>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jij@email.nl" inputMode="email" autoComplete="email" />
                        {errors.email && <span className="aanmeld-msg">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="aanmeld-field">
                      <label htmlFor="plaats">Woonplaats <span className="aanmeld-opt-label">(optioneel)</span></label>
                      <input id="plaats" value={form.plaats} onChange={(e) => set("plaats", e.target.value)} placeholder="Bijv. Rotterdam-Zuid" autoComplete="address-level2" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="aanmeld-step-title">Controleer en verstuur</h3>
                    <dl className="aanmeld-review">
                      {summaryRows.map(([label, value]) => (
                        <div key={label} className="aanmeld-review-row">
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="aanmeld-field">
                      <label htmlFor="bericht">Bericht <span className="aanmeld-opt-label">(optioneel)</span></label>
                      <textarea id="bericht" value={form.bericht} onChange={(e) => set("bericht", e.target.value)} placeholder="Bijv. wanneer je wilt starten" rows={4} />
                    </div>
                  </>
                )}
              </div>

              <div className="aanmeld-actions">
                {step > 0 ? (
                  <button type="button" className="aanmeld-link" onClick={handleBack}>
                    Terug
                  </button>
                ) : (
                  <span />
                )}
                {isLastStep ? (
                  <button type="submit" className="btn btn-primary">
                    Verstuur aanmelding
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Volgende stap
                  </button>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="footer-logo" href="#top" aria-label="Rijschool Confiance, naar boven">
              <span className="footer-logo-mark" aria-hidden="true">L</span>
              <span className="footer-logo-text">
                <span className="footer-logo-name">Rijschool Confiance</span>
                <span className="footer-logo-tag">Vertrouwen in het proces</span>
              </span>
            </a>
            <p className="footer-about">
              Persoonlijke rijlessen in de regio Rotterdam. Eén vaste, vertrouwde instructeur die je rustig en op jouw tempo naar je rijbewijs begeleidt.
            </p>
          </div>

          <nav className="footer-col" aria-label="Footer navigatie">
            <h5>Navigatie</h5>
            <a href="#over">Over ons</a>
            <a href="#lesgebied">Lesgebied</a>
            <a href="#tarieven">Tarieven</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">Veelgestelde vragen</a>
          </nav>

          <div className="footer-col">
            <h5>Contact</h5>
            <a className="footer-contact" href="tel:+31684346439">
              <span className="footer-contact-label">Telefoon</span>
              <span className="footer-contact-value">06 84 34 64 39</span>
            </a>
            <a className="footer-contact" href="mailto:rijschoolconfiance@gmail.com">
              <span className="footer-contact-label">E-mail</span>
              <span className="footer-contact-value">rijschoolconfiance@gmail.com</span>
            </a>
            <div className="footer-contact">
              <span className="footer-contact-label">Lesgebied</span>
              <span className="footer-contact-value">Regio Rotterdam</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Rijschool Confiance — Alle rechten voorbehouden</span>
          <span className="footer-motto">Rijden met vertrouwen</span>
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
        <Over />
        <Lesgebied />
        <Tarieven />
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
