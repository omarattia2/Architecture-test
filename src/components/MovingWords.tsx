"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = [
  "Innovation",
  "Excellence",
  "Precision",
  "Design",
  "Quality",
  "Craftsmanship",
  "Vision",
  "Architecture",
];

export default function MovingWords() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wordsRef.current) return;

    const ctx = gsap.context(() => {
      const words = wordsRef.current?.children;
      if (!words || words.length === 0) return;

      // Calculate width of one set of words
      let totalWidth = 0;
      Array.from(words).forEach((word) => {
        totalWidth += (word as HTMLElement).offsetWidth;
      });
      totalWidth += 8 * 16; // gap spacing (8 * 1rem = 8rem = 128px)

      // Duplicate words for seamless loop
      const clonedWords = Array.from(words).map((word) => word.cloneNode(true));
      clonedWords.forEach((word) => wordsRef.current?.appendChild(word));

      // Create scroll-triggered animation
      gsap.to(wordsRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-32 overflow-hidden bg-gray-50"
    >
      <div className="relative">
        <div
          ref={wordsRef}
          className="flex items-center gap-8 sm:gap-12 md:gap-16 whitespace-nowrap"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200 select-none"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

