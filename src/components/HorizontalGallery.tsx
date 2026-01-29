"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const topRowImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
];

const bottomRowImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !topRowRef.current || !bottomRowRef.current)
      return;

    const ctx = gsap.context(() => {
      // Calculate total width for seamless loop (half since we duplicated)
      const topRowWidth = topRowRef.current!.scrollWidth / 2;
      const bottomRowWidth = bottomRowRef.current!.scrollWidth / 2;

      // Top row - moves left
      gsap.to(topRowRef.current, {
        x: -topRowWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Bottom row - moves right
      gsap.to(bottomRowRef.current, {
        x: bottomRowWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="space-y-8 sm:space-y-12">
        {/* Top Row - Moves Left */}
        <div className="overflow-hidden">
          <div
            ref={topRowRef}
            className="flex gap-4 sm:gap-6 md:gap-8"
            style={{ width: "fit-content" }}
          >
            {[...topRowImages, ...topRowImages].map((image, index) => (
              <div
                key={index}
                className="relative w-64 sm:w-80 md:w-96 h-48 sm:h-64 md:h-80 flex-shrink-0 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="overflow-hidden">
          <div
            ref={bottomRowRef}
            className="flex gap-4 sm:gap-6 md:gap-8"
            style={{ width: "fit-content" }}
          >
            {[...bottomRowImages, ...bottomRowImages].map((image, index) => (
              <div
                key={index}
                className="relative w-64 sm:w-80 md:w-96 h-48 sm:h-64 md:h-80 flex-shrink-0 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

