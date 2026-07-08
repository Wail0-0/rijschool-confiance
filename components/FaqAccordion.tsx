"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Is de proefles echt voor de helft van de prijs?",
    answer:
      "Ja. Je eerste proefles krijg je direct met 50% korting. Kies je daarna voor een pakket, dan is je eerste les gratis. Je krijgt altijd een eerlijk advies en beslist daarna zelf of je verder wilt.",
  },
  {
    question: "Ik heb nog nooit gereden, is dat een probleem?",
    answer:
      "Helemaal niet, juist perfect! De meeste leerlingen starten zonder enige ervaring. We beginnen rustig op een rustige plek, zodat je vol vertrouwen achter het stuur stapt.",
  },
  {
    question: "Word ik thuis opgehaald?",
    answer:
      "Ja. We halen je gratis op bij je thuis, school of werk, en brengen je daarna ook weer terug. Wel zo makkelijk.",
  },
  {
    question: "Hoe snel kan ik beginnen?",
    answer:
      "Meestal binnen één week. Na je aanvraag bellen of appen we je vandaag nog om direct een moment in te plannen dat jou uitkomt.",
  },
  {
    question: "Zit ik ergens aan vast na de proefles?",
    answer:
      "Nee, nergens aan. Na de proefles krijg je een persoonlijk lesadvies en een prijsvoorstel. Vond je het niets? Dan zit je nergens aan vast.",
  },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            >
              <span
                className={`font-display text-lg font-semibold transition-colors sm:text-xl ${
                  isOpen ? "text-volt" : "text-white group-hover:text-volt"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen ? "rotate-45 border-volt bg-volt text-ink" : "border-white/15 text-white group-hover:border-volt/50"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-16 text-white/60">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
