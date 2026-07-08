"use client";

import { useEffect, useRef } from "react";

/**
 * Zachte gloed die de muis volgt. Alleen zichtbaar op apparaten met een
 * muis; op touch (het gros van Meta-traffic) blijft hij verborgen.
 */
const Spotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `translate(${event.clientX - 300}px, ${event.clientY - 300}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full bg-volt/[0.06] blur-3xl lg:block"
    />
  );
};

export default Spotlight;
