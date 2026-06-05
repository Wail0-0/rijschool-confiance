/* ============================================================
   Rijschool Confiance - app
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- content data ---------- */
const GOOGLE_REVIEW_COUNT = 17;

const GOOGLE_REVIEWS = [
  { name: "michano ramdjielal", text: "Zeer goeie rijschool. Komt afspraken na.", when: "een jaar geleden" },
  { name: "One Drive", text: "Top gozer! Goeie samenwerking gehad.", when: "een jaar geleden" },
  { name: "Bilal Cho", text: "Een jonge, maar toch ervaren instructeur. Werkt geduldig en is sterk in zijn vak. Een echte aanrader!", when: "een jaar geleden" },
  { name: "Divano Zandgrond", text: "Eindelijk mijn rijbewijs behaald! Hele fijne rijschool en betaalbaar!", when: "2 jaar geleden" },
  { name: "Ayoub C", text: "Zeker tevreden over rijschool Confiance. Er wordt duidelijk gecommuniceerd tijdens de lessen waardoor ik alles snel oppikte, hierdoor ook mijn rijbewijs binnen korte periode behaald. Zeker een aanrader!", when: "2 jaar geleden" },
  { name: "Noortje B", text: "Echt een aanrader! Super goeie duidelijke lessen gehad! Top rijschool.", when: "2 jaar geleden" },
  { name: "Speedy E", text: "Top rijschool, heb mijn rijbewijs in een keer gehaald. Duidelijke uitleg en instructies — waar je vastloopt weet de rijinstructeur altijd een goede oplossing.", when: "2 jaar geleden" },
  { name: "Zakaria El Haddioui", text: "In 1x mijn rijbewijs gehaald, rij instructeur geeft goed les en advies. Echt een aanrader! Als je je rijbewijs snel wilt halen, les bij Confiance.", when: "2 jaar geleden" },
  { name: "Ilias Aouladzian", text: "Om met één woord Rijschool Confiance te beschrijven: top! De instructeurs leveren hele goede diensten. Ze hebben mij tot aan de kleinste details opgeleid om in één keer te slagen. Dikke aanrader!", when: "2 jaar geleden" },
  { name: "ayoub ouh", text: "Bedankt voor het helpen behalen van rijbewijs. Zonder jouw hulp zou ik het niet zo snel hebben gehaald.", when: "2 jaar geleden" },
  { name: "Jaouad el Arkoubi", text: "Top rijschool! Al na een paar lessen mijn rijbewijs gehaald. Rij-instructeur is duidelijk en heeft een goed plan van aanpak. Goeie aanrader.", when: "2 jaar geleden" },
  { name: "anass hadioui", text: "Fijne instructeur! Werkt duidelijk en volgens een strakke planning.", when: "2 jaar geleden" },
  { name: "achmed jan", text: "Dankzij Rijschool Confiance in één keer geslaagd voor mijn praktijkexamen. Dankjewel voor de fijne, leerzame en betrouwbare omgeving!", when: "2 jaar geleden" },
  { name: "Ibrahim B", text: "Kwalitatieve rijschool! In één keer mijn rijbewijs gehaald. Aardige rij-instructeur die op een gestructureerde, educatieve manier zijn rijlessen geeft.", when: "2 jaar geleden" },
];

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

const WHATSAPP_URL =
  "https://web.whatsapp.com/send?phone=31684346439&text=" +
  encodeURIComponent(
    "Hallo! Ik zou graag een proefles willen inplannen. Wanneer zou ik kunnen beginnen?"
  );

const FAQ = [
  { q: "Is de proefles echt gratis?", a: "Ja! Je eerste les van 60 minuten is volledig gratis en vrijblijvend. Zo ervaar je rustig hoe het rijden bevalt in Rotterdam en of het klikt met je instructeur, zonder verplichtingen." },
  { q: "In welke wijken en gemeenten geven jullie rijles?", a: "We zijn een rijschool voor heel Rotterdam en de directe Rijnmond-regio: van Centrum en Rotterdam-Zuid tot Kralingen, Charlois, Delfshaven, Hillegersberg, Prins Alexander, Schiedam, Capelle aan den IJssel en Vlaardingen. Twijfel je over jouw adres? Stuur een berichtje, we kijken altijd mee." },
  { q: "Lessen jullie in schakel- of automaat?", a: "Ja, we bieden rijlessen in zowel schakel- als automaat. Kies de auto die bij jouw plannen past. Automaatlessen zijn €5 duurder per losse les en €100 duurder per lespakket." },
  { q: "Wat kost een rijles in Rotterdam?", a: "Een losse les van 60 minuten kost €55 (schakel) of €60 (automaat). Een les van 90 minuten kost €75 of €80. Met een lespakket rijd je voordeliger richting je praktijkexamen. De gratis proefles staat hier los van." },
  { q: "Hoe zit het met de tussentijdse toets en het CBR-examen?", a: "We begeleiden je richting de tussentijdse toets en het praktijkexamen bij CBR Rotterdam, inclusief je vertrouwde lesauto. De examenkosten van het CBR betaal je apart aan het CBR." },
  { q: "Waar halen jullie op voor de rijles?", a: "We halen je op in je eigen buurt in Rotterdam of de Rijnmond, zodat je direct oefent op straten en routes die je dagelijks tegenkomt en die relevant zijn voor het examen." },
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
    <section className="hero section-pad" id="top" aria-label="Rijschool Rotterdam — intro">
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
          <Reveal as="p" style={{ color: "var(--muted)", fontSize: "1.05rem", marginTop: "14px" }}>
            Je rijdt met dezelfde lesauto en dezelfde instructeur van je eerste proefles tot je examen bij
            CBR Rotterdam. We oefenen bewust op routes en verkeerssituaties die examinatoren in Rotterdam vaak
            laten zien — van drukke kruispunten in Charlois tot invoegen op de ring richting Schiedam.
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
const TRANSMISSIE_OPTS = [
  { value: "schakel", label: "Schakel" },
  { value: "automaat", label: "Automaat" },
];

const PAKKET_BASE = [
  {
    tag: "Zilveren pakket", base: 1320,
    desc: "Een stevige basis om vol vertrouwen op te bouwen richting je examen.",
    feat: false,
    list: ["20 rijlessen", "Inclusief praktijkexamen", "Vaste, vertrouwde instructeur"],
  },
  {
    tag: "Gouden pakket", base: 1800,
    desc: "Onze meest gekozen optie: ruim de tijd om alles goed onder de knie te krijgen.",
    feat: true,
    list: ["30 rijlessen", "Inclusief praktijkexamen", "Ideaal voor de meeste leerlingen"],
  },
  {
    tag: "Diamanten pakket", base: 2250,
    desc: "Alle ruimte en rust, zonder zorgen over extra lessen tot je er klaar voor bent.",
    feat: false,
    list: ["40 rijlessen", "Inclusief praktijkexamen", "Maximale voorbereiding"],
  },
];

const LOSSE_BASE = [
  { naam: "Losse les", per: "60 minuten", base: 55, automaatExtra: true },
  { naam: "Losse les", per: "90 minuten", base: 75, automaatExtra: true },
  { naam: "Los examen", per: "praktijkexamen", base: 350, automaatExtra: false },
];

const formatEuro = (n) => "€" + n;

function TransmissieToggle({ value, onChange, id, block = false }) {
  return (
    <div
      className={"transmissie-toggle" + (block ? " transmissie-toggle--block" : "")}
      role="group"
      aria-label="Schakel of automaat"
      id={id}
    >
      {TRANSMISSIE_OPTS.map((o) => {
        const active = value === o.value;
        return (
          <button
            type="button"
            key={o.value}
            className={"transmissie-btn" + (active ? " on" : "")}
            aria-pressed={active}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Tarieven() {
  const [transmissie, setTransmissie] = useState("schakel");
  const isAutomaat = transmissie === "automaat";
  const pakketExtra = isAutomaat ? 100 : 0;
  const losseExtra = isAutomaat ? 5 : 0;

  const cards = PAKKET_BASE.map((c) => ({
    ...c,
    val: formatEuro(c.base + pakketExtra),
  }));
  const losse = LOSSE_BASE.map((l) => ({
    ...l,
    val: formatEuro(l.base + (l.automaatExtra ? losseExtra : 0)),
  }));

  return (
    <section className="section-pad band-light" id="tarieven">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Tarieven</span>
          <h2>Heldere prijzen, geen verrassingen</h2>
          <p>Kies het pakket dat bij je past. Je start altijd met een gratis proefles.</p>
        </Reveal>
        <Reveal className="tarieven-transmissie">
          <span className="tarieven-transmissie-label">Schakel of automaat?</span>
          <TransmissieToggle value={transmissie} onChange={setTransmissie} />
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
function ReviewCarousel() {
  const scrollerRef = useRef(null);

  const handleScroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".review-card");
    const gap = 18;
    const step = card ? card.offsetWidth + gap : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="reviews-block">
      <div className="reviews-block-head">
        <h3 className="reviews-block-title">Wat leerlingen zeggen op Google</h3>
        <div className="reviews-nav" aria-label="Reviews navigeren">
          <button
            type="button"
            className="reviews-nav-btn"
            aria-label="Vorige review"
            onClick={() => handleScroll(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="reviews-nav-btn"
            aria-label="Volgende review"
            onClick={() => handleScroll(1)}
          >
            ›
          </button>
        </div>
      </div>
      <div className="reviews-carousel" ref={scrollerRef} aria-label="Google reviews van leerlingen">
        {GOOGLE_REVIEWS.map((review, i) => (
          <article className="review-card" key={review.name + "-" + i}>
            <div className="review-card-top">
              <Stars n={5} />
              <GoogleG size={18} />
            </div>
            <blockquote className="review-card-text">"{review.text}"</blockquote>
            <footer className="review-card-foot">
              <cite className="review-card-name">{review.name}</cite>
              <span className="review-card-when">{review.when}</span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

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
              <small>5,0 · {GOOGLE_REVIEW_COUNT} reviews op Google</small>
              <a
                className="rev-google-link"
                href="https://www.google.com/maps/search/?api=1&query=Rijschool+Confiance+Watergeusstraat+28E+Rotterdam"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bekijk reviews op Google
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <ReviewCarousel />
        </Reveal>
      </div>
      <div className="geslaagd-marquee" ref={scrollerRef} aria-label="Foto's van geslaagde leerlingen">
        <div className="geslaagd-track">
          {track.map((src, k) => (
            <figure className="geslaagd-item" key={src + "-" + k}>
              <img src={src} alt={"Geslaagde leerling rijschool Rotterdam — Rijschool Confiance " + (k % GESLAAGD_PHOTOS.length + 1)} loading="lazy" decoding="async" draggable="false" />
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
            const handleToggle = () => setOpen(isOpen ? -1 : k);
            return (
              <div className={"faq-item" + (isOpen ? " open" : "")} key={k}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={"faq-a-" + k}
                  id={"faq-q-" + k}
                  onClick={handleToggle}
                >
                  {f.q}
                  <span className="ico" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="faq-a" id={"faq-a-" + k} role="region" aria-labelledby={"faq-q-" + k}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
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
  { value: "Gratis proefles", title: "Gratis proefles", icon: "car" },
  { value: "Losse rijlessen", title: "Losse rijlessen", icon: "clock" },
  { value: "Lespakket", title: "Lespakket", icon: "award" },
  { value: "Een vraag", title: "Ik heb een vraag", icon: "smile" },
];
const ASIDE_POINTS = [
  "Je eerste proefles van 60 minuten is gratis",
  "Eén vaste, vertrouwde instructeur",
  "Lessen in schakel én automaat",
  "Meestal binnen 24 uur een reactie",
];
const ASIDE_QUOTE = {
  text: "Eindelijk mijn rijbewijs behaald! Hele fijne rijschool en betaalbaar!",
  name: "Divano Zandgrond",
};
const EMPTY_FORM = { type: "Gratis proefles", transmissie: "schakel", naam: "", email: "", tel: "", plaats: "", bericht: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const honeypotRef = useRef(null);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const firstName = form.naam.trim().split(" ")[0] || "rijder";

  const validate = () => {
    const e = {};
    if (!form.naam.trim()) e.naam = "Vul je naam in";
    if (!form.tel.trim() || form.tel.replace(/\D/g, "").length < 8) e.tel = "Vul je telefoonnummer in";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Vul een geldig e-mailadres in";
    setErrors(e);
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (sending) return;
    const found = validate();
    const firstError = Object.keys(found)[0];
    if (firstError) {
      const el = document.getElementById(firstError);
      if (el) el.focus();
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          transmissie: form.transmissie,
          naam: form.naam,
          email: form.email,
          tel: form.tel,
          plaats: form.plaats,
          bericht: form.bericht,
          company: honeypotRef.current ? honeypotRef.current.value : "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Versturen mislukt.");
      }
      setSent(true);
    } catch (err) {
      setSendError(
        "Versturen lukte niet. Probeer het opnieuw of mail ons direct via de knop hieronder."
      );
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSent(false);
    setSendError("");
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
      "\nAuto: " + (form.transmissie === "automaat" ? "Automaat" : "Schakel") +
      "\n\n" + form.bericht
    );

  return (
    <section className="section-pad band-muted" id="contact">
      <div className="wrap">
        <div className="aanmeld-layout">
          <Reveal as="aside" className="aanmeld-aside">
            <div className="aanmeld-aside-glow" aria-hidden="true" />
            <div className="aanmeld-aside-top">
              <span className="eyebrow aanmeld-aside-eyebrow">Aanmelden</span>
              <h2 className="aanmeld-aside-title">Plan je gratis proefles</h2>
              <p className="aanmeld-aside-lead">
                Laat je gegevens achter, dan plannen we samen een vrijblijvende proefles in.
                Geen verplichtingen, gewoon kennismaken achter het stuur.
              </p>
            </div>

            <ul className="aanmeld-aside-points">
              {ASIDE_POINTS.map((p) => (
                <li key={p}>
                  <span className="aanmeld-aside-check" aria-hidden="true">
                    <Icon name="check" size={14} stroke={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <figure className="aanmeld-aside-quote">
              <Stars n={5} />
              <blockquote>"{ASIDE_QUOTE.text}"</blockquote>
              <figcaption>
                <GoogleG size={16} />
                {ASIDE_QUOTE.name}
              </figcaption>
            </figure>

            <div className="aanmeld-aside-foot">
              <a className="aanmeld-aside-contact" href="tel:+31684346439">
                <Icon name="phone" size={18} stroke={2} />
                <span>06 84 34 64 39</span>
              </a>
              <div className="aanmeld-aside-rating">
                <GoogleG size={20} />
                <span><strong>5,0</strong> <Stars n={5} /></span>
                <small>{GOOGLE_REVIEW_COUNT} reviews</small>
              </div>
            </div>
          </Reveal>

          <Reveal className="aanmeld-card">
            {sent ? (
              <div className="aanmeld-done">
                <span className="aanmeld-done-mark"><Icon name="check" size={30} stroke={2.5} /></span>
                <h3>Bedankt, {firstName}!</h3>
                <p>
                  We hebben je aanvraag goed ontvangen en nemen snel contact met je op over je{" "}
                  <strong>{form.type.toLowerCase()}</strong>.
                </p>
                <div className="aanmeld-done-actions">
                  <a className="btn btn-primary" href={mailHref}>
                    Mail ons direct
                    <Icon name="arrow" size={18} />
                  </a>
                  <button type="button" className="aanmeld-link" onClick={handleReset}>
                    Nieuwe aanmelding
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Aanmeldformulier" className="aanmeld-form">
                <input
                  ref={honeypotRef}
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="aanmeld-hp"
                />

                <div className="aanmeld-group">
                  <span className="aanmeld-group-label">Waarvoor meld je je aan?</span>
                  <div className="aanmeld-types" role="group" aria-label="Soort aanmelding">
                    {CONTACT_TYPES.map((t) => {
                      const active = form.type === t.value;
                      return (
                        <button
                          type="button"
                          key={t.value}
                          className={"aanmeld-type" + (active ? " on" : "")}
                          aria-pressed={active}
                          onClick={() => set("type", t.value)}
                        >
                          <span className="aanmeld-type-ico" aria-hidden="true">
                            <Icon name={t.icon} size={24} stroke={2} />
                          </span>
                          <span className="aanmeld-type-title">{t.title}</span>
                          <span className="aanmeld-type-check" aria-hidden="true">
                            <Icon name="check" size={12} stroke={3} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="aanmeld-group">
                  <span className="aanmeld-group-label">Schakel of automaat?</span>
                  <TransmissieToggle
                    value={form.transmissie}
                    onChange={(v) => set("transmissie", v)}
                    block
                  />
                </div>

                <hr className="aanmeld-divider" />

                <div className="aanmeld-fields">
                  <div className={"aanmeld-field" + (errors.naam ? " err" : "")}>
                    <label htmlFor="naam">Naam</label>
                    <div className="aanmeld-input">
                      <span className="aanmeld-input-ico" aria-hidden="true"><Icon name="user" size={18} stroke={2} /></span>
                      <input id="naam" value={form.naam} onChange={(e) => set("naam", e.target.value)} placeholder="Voor- en achternaam" autoComplete="name" />
                    </div>
                    {errors.naam && <span className="aanmeld-msg">{errors.naam}</span>}
                  </div>

                  <div className="aanmeld-frow">
                    <div className={"aanmeld-field" + (errors.tel ? " err" : "")}>
                      <label htmlFor="tel">Telefoon</label>
                      <div className="aanmeld-input">
                        <span className="aanmeld-input-ico" aria-hidden="true"><Icon name="phone" size={17} stroke={2} /></span>
                        <input id="tel" value={form.tel} onChange={(e) => set("tel", e.target.value)} placeholder="06 12 34 56 78" inputMode="tel" autoComplete="tel" />
                      </div>
                      {errors.tel && <span className="aanmeld-msg">{errors.tel}</span>}
                    </div>
                    <div className={"aanmeld-field" + (errors.email ? " err" : "")}>
                      <label htmlFor="email">E-mail</label>
                      <div className="aanmeld-input">
                        <span className="aanmeld-input-ico" aria-hidden="true"><Icon name="mail" size={17} stroke={2} /></span>
                        <input id="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jij@email.nl" inputMode="email" autoComplete="email" />
                      </div>
                      {errors.email && <span className="aanmeld-msg">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="aanmeld-field">
                    <label htmlFor="plaats">Woonplaats <span className="aanmeld-opt-label">(optioneel)</span></label>
                    <div className="aanmeld-input">
                      <span className="aanmeld-input-ico" aria-hidden="true"><Icon name="pin" size={17} stroke={2} /></span>
                      <input id="plaats" value={form.plaats} onChange={(e) => set("plaats", e.target.value)} placeholder="Bijv. Rotterdam-Zuid" autoComplete="address-level2" />
                    </div>
                  </div>

                  <div className="aanmeld-field">
                    <label htmlFor="bericht">Bericht <span className="aanmeld-opt-label">(optioneel)</span></label>
                    <textarea id="bericht" value={form.bericht} onChange={(e) => set("bericht", e.target.value)} placeholder="Bijv. wanneer je wilt starten of een vraag" rows={3} />
                  </div>
                </div>

                {sendError && (
                  <p className="aanmeld-senderror" role="alert">{sendError}</p>
                )}

                <div className="aanmeld-foot">
                  {sendError ? (
                    <a className="btn btn-primary aanmeld-submit" href={mailHref}>
                      Mail ons direct
                      <Icon name="arrow" size={18} />
                    </a>
                  ) : (
                    <button type="submit" className="btn btn-primary aanmeld-submit" disabled={sending} aria-busy={sending}>
                      {sending ? "Bezig met versturen…" : "Verstuur aanmelding"}
                      {!sending && <Icon name="arrow" size={18} />}
                    </button>
                  )}
                  <p className="aanmeld-reassure">
                    <Icon name="shield" size={15} stroke={2} />
                    Geen verplichtingen · meestal binnen 24 uur reactie
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHATSAPP FAB
   ============================================================ */
function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur een WhatsApp-bericht voor een proefles"
    >
      <WhatsAppIcon size={28} />
    </a>
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
              Dé rijschool in Rotterdam voor persoonlijke rijlessen. Eén vaste instructeur begeleidt je rustig en op jouw tempo naar je rijbewijs B.
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
            <address className="footer-contact footer-address">
              <span className="footer-contact-label">Adres</span>
              <span className="footer-contact-value">
                Watergeusstraat 28E<br />
                3025HS Rotterdam
              </span>
            </address>
            <a
              className="footer-contact"
              href="https://www.google.com/maps/search/?api=1&query=Watergeusstraat+28E+3025HS+Rotterdam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="footer-contact-label">Route</span>
              <span className="footer-contact-value">Bekijk op Google Maps</span>
            </a>
            <div className="footer-contact">
              <span className="footer-contact-label">Lesgebied</span>
              <span className="footer-contact-value">Rotterdam &amp; Rijnmond</span>
            </div>
            <div className="footer-contact">
              <span className="footer-contact-label">CBR-nummer</span>
              <span className="footer-contact-value">2001N9</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Rijschool Confiance · Alle rechten voorbehouden</span>
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
  "heroTitle": "Rijschool Rotterdam leer rijden met <span class=\"hl\">vertrouwen</span>",
  "heroSub": "Persoonlijke rijlessen in Rotterdam en de Rijnmond. Rustige aanpak, vaste instructeur en je eerste proefles is gratis."
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

  /* reveal-on-scroll - alleen inschakelen als animatieframes echt draaien,
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
      <WhatsAppFab />

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
