import CountUp from "@/components/CountUp";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";

const StarRating = () => (
  <span className="flex items-center gap-0.5 text-volt" aria-label="5 van 5 sterren">
    {[0, 1, 2, 3, 4].map((star) => (
      <svg key={star} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.3 4a1 1 0 0 0 .95.69h4.2c.97 0 1.37 1.24.59 1.81l-3.4 2.47a1 1 0 0 0-.36 1.12l1.3 4c.3.92-.76 1.69-1.54 1.12l-3.4-2.47a1 1 0 0 0-1.18 0l-3.4 2.47c-.78.57-1.84-.2-1.54-1.12l1.3-4a1 1 0 0 0-.36-1.12L2.01 9.43c-.78-.57-.38-1.81.59-1.81h4.2a1 1 0 0 0 .95-.69l1.3-4z" />
      </svg>
    ))}
  </span>
);

const marqueeItems = [
  "Eerste proefles met 50% korting",
  "Bij een pakket is je eerste les gratis",
  "84% slaagt in één keer",
  "Gratis thuis opgehaald",
  "Binnen een week starten",
  "Geen verplichtingen",
  "500+ vijfsterrenreviews",
];

const usps = [
  {
    number: "01",
    title: "84% slaagt in één keer",
    description:
      "Ver boven het landelijk gemiddelde van 50%. Geen trucjes, gewoon een bewezen lesmethode die elke week opnieuw werkt.",
  },
  {
    number: "02",
    title: "Gratis opgehaald, waar je ook bent",
    description: "Thuis, school of werk — wij staan voor de deur. Jij hoeft alleen maar in te stappen.",
  },
  {
    number: "03",
    title: "Instructeurs waar je je goed bij voelt",
    description:
      "Geduldig, gecertificeerd en met humor. Ook als je zenuwachtig bent, zit je binnen tien minuten ontspannen achter het stuur.",
  },
  {
    number: "04",
    title: "Lessen die in jóuw agenda passen",
    description: "Ook 's avonds en in het weekend. Jouw leven is leidend, niet ons rooster.",
  },
];

const steps = [
  {
    number: "1",
    title: "Vul het formulier in",
    description: "Alleen je naam, 06-nummer en postcode. Het kost je letterlijk 20 seconden.",
  },
  {
    number: "2",
    title: "Wij bellen je vandaag",
    description: "We plannen samen een moment dat jou uitkomt. Vaak rijd je al binnen een week.",
  },
  {
    number: "3",
    title: "Rij je proefles met 50% korting",
    description: "Stap in bij een topinstructeur, ervaar de klik en beslis daarna zelf of je verder wilt.",
  },
];

const testimonials = [
  {
    name: "Sophie, 19",
    text: "Na die proefles met 50% korting wist ik het meteen: hier wil ik mijn rijbewijs halen. In één keer geslaagd!",
  },
  {
    name: "Mehmet, 22",
    text: "Ik was best zenuwachtig, maar mijn instructeur stelde me meteen op mijn gemak. Voelde totaal niet als een verkooppraatje.",
  },
  {
    name: "Lisa, 18",
    text: "Superfijn dat ik thuis werd opgehaald. Binnen 4 maanden mijn rijbewijs, terwijl vriendinnen elders nog op de wachtlijst stonden.",
  },
  {
    name: "Daan, 21",
    text: "De proefles was meteen serieus rijden, geen rondje parkeerplaats. Eerlijk advies gekregen en direct ingestapt.",
  },
  {
    name: "Yara, 20",
    text: "Plannen via WhatsApp, opgehaald bij college, lessen op zondag. Alles draait hier om jou.",
  },
];

const stats = [
  { end: 84, suffix: "%", label: "Slagingspercentage", decimals: 0 },
  { end: 2300, suffix: "+", label: "Geslaagde leerlingen", decimals: 0 },
  { end: 4.9, suffix: "", label: "Gemiddelde Google-score", decimals: 1 },
  { end: 500, suffix: "+", label: "Vijfsterrenreviews", decimals: 0 },
];

const HomePage = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip bg-ink">
      <Spotlight />

      {/* Fixed glass header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="font-display text-xl font-bold tracking-tight text-white">
            RIJSCHOOL<span className="text-volt">.</span>
          </a>
          <a
            href="#aanmelden"
            className="rounded-full bg-volt px-6 py-2.5 text-sm font-bold text-ink transition duration-300 hover:shadow-[0_0_30px_-5px] hover:shadow-volt/70"
          >
            50% korting
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen items-center pt-28 lg:pt-24">
        {/* Decoratieve gloed-orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] animate-float rounded-full bg-volt/[0.07] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] animate-float-delayed rounded-full bg-indigo-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col items-start gap-8">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-volt/25 bg-volt/[0.08] px-5 py-2 text-sm font-semibold text-volt">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
                </span>
                Nog 7 proeflessen met 50% korting beschikbaar deze week
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Jouw rijbewijs.
                <br />
                Sneller,{" "}
                <span className="font-serif font-normal italic text-volt">zonder stress</span>.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="max-w-xl text-lg leading-relaxed text-white/55 sm:text-xl">
                Ontdek met een <span className="font-semibold text-white">eerste proefles voor de helft van de prijs</span>{" "}
                hoe snel jij kunt slagen. Kies je daarna voor een pakket, dan is je{" "}
                <span className="font-semibold text-white">eerste les zelfs gratis</span>. Geen verplichtingen, geen
                verkooppraatje en direct duidelijkheid over jouw beste start.
              </p>
            </Reveal>

            <Reveal delay={300} className="w-full">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {["S", "M", "L", "D"].map((initial, index) => (
                      <span
                        key={initial}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-xs font-bold ${
                          ["bg-indigo-400 text-ink", "bg-volt text-ink", "bg-rose-400 text-ink", "bg-amber-300 text-ink"][index]
                        }`}
                      >
                        {initial}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <StarRating />
                    <p className="text-sm text-white/50">
                      <span className="font-bold text-white">4,9/5</span> uit 500+ reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/50">
                  <span className="font-bold text-white">2.300+</span> geslaagde leerlingen gingen je voor
                </p>
              </div>
            </Reveal>
          </div>

          {/* Leadformulier boven de vouw */}
          <Reveal delay={250}>
            <div id="aanmelden" className="scroll-mt-28">
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent opacity-50"
                  style={{ maskImage: "linear-gradient(black, transparent 40%)" }}
                />
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-volt">50% korting</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-white">Claim jouw plek</h2>
                <p className="mb-7 mt-2 text-white/55">
                  Vul je gegevens en postcode in. Wij bellen je vandaag nog. Kies je een pakket, dan is je eerste les
                  gratis.
                </p>
                <LeadForm variant="hero" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volt marquee strip */}
      <div className="marquee relative z-10 -rotate-1 overflow-hidden border-y border-volt/30 bg-volt py-4">
        <div className="marquee-track flex w-max animate-marquee items-center gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-lg font-bold uppercase tracking-wide text-ink">{item}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-ink" aria-hidden="true">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* Statistieken */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-14 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/40">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* USP's — redactionele genummerde rijen */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-volt">Waarom hier</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Je rijbewijs halen hoeft niet{" "}
              <span className="font-serif font-normal italic text-white/60">duur, traag of stressvol</span> te zijn.
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col">
            {usps.map((usp, index) => (
              <Reveal key={usp.number} delay={index * 75}>
                <div className="group grid gap-4 border-t border-white/10 py-10 transition-colors duration-300 last:border-b hover:bg-white/[0.02] sm:grid-cols-[100px_1fr_1.2fr] sm:items-baseline sm:gap-8 lg:py-12">
                  <span className="font-display text-sm font-bold text-volt/70 transition-colors group-hover:text-volt">
                    /{usp.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                    {usp.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/50">{usp.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stappen */}
      <section className="relative py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/[0.04] blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-center font-display text-sm font-bold uppercase tracking-[0.25em] text-volt">
              Zo werkt het
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              In drie stappen achter het stuur
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 120}>
                <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-volt/40 hover:bg-white/[0.05]">
                  <span className="font-display text-7xl font-bold text-white/[0.07] transition-colors duration-500 group-hover:text-volt/20">
                    {step.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">{step.title}</h3>
                  <p className="leading-relaxed text-white/50">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 flex justify-center">
              <a
                href="#aanmelden"
                className="group relative overflow-hidden rounded-full bg-volt px-10 py-5 font-display text-lg font-bold text-ink shadow-[0_0_50px_-10px] shadow-volt/60 transition duration-300 hover:shadow-[0_0_70px_-10px] hover:shadow-volt/80 active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Ja, ik wil 50% korting</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials marquee */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <Reveal>
          <p className="text-center font-display text-sm font-bold uppercase tracking-[0.25em] text-volt">Reviews</p>
          <h2 className="mx-auto mt-4 max-w-2xl px-5 text-center font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Zij gingen je voor
          </h2>
        </Reveal>

        <div className="marquee relative mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent"
          />
          <div className="marquee-track flex w-max animate-marquee-slow gap-5">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <figure
                key={index}
                className="flex w-[320px] flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:w-[400px]"
              >
                <StarRating />
                <blockquote className="leading-relaxed text-white/70">&ldquo;{testimonial.text}&rdquo;</blockquote>
                <figcaption className="mt-auto font-display font-bold text-white">{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-volt">FAQ</p>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Nog twijfels?
                </h2>
                <p className="mt-4 max-w-sm text-lg text-white/50">
                  Dit vragen anderen ons het vaakst. Staat jouw vraag er niet bij? Stel hem tijdens het belmoment.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <FaqAccordion />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Finale CTA */}
      <section className="relative overflow-hidden py-28 lg:py-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-volt/[0.08] blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Klaar om{" "}
              <span className="font-serif font-normal italic text-volt">achter het stuur</span> te stappen?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/55">
              Het aantal proeflessen met 50% korting per week is beperkt. Vul nu je gegevens en postcode in en wij
              regelen de rest. Kies je daarna voor een pakket, dan krijg je je eerste les gratis.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12">
              <LeadForm variant="footer" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] pb-28 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-10 text-center sm:px-8">
          <p className="font-display text-lg font-bold text-white">
            RIJSCHOOL<span className="text-volt">.</span>
          </p>
          <p className="text-sm text-white/40">KvK 12345678 &middot; info@rijschool.nl &middot; 06 12 34 56 78</p>
        </div>
      </footer>

      {/* Sticky mobiele CTA-balk */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/85 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#aanmelden"
          className="flex w-full items-center justify-center rounded-2xl bg-volt px-6 py-4 font-display text-base font-bold text-ink shadow-[0_0_40px_-8px] shadow-volt/60 transition active:scale-[0.98]"
        >
          Claim je 50% korting
        </a>
      </div>
    </main>
  );
};

export default HomePage;
