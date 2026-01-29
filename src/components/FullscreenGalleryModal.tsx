"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import CinematicSlide from "./CinematicSlide";

interface FullscreenGalleryModalProps {
  images: string[];
  title: string;
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function FullscreenGalleryModal({
  images,
  title,
  isOpen,
  initialIndex,
  onClose,
}: FullscreenGalleryModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    startIndex: initialIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward" | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      setDirection("backward");
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      setDirection("forward");
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    // Reset direction after animation
    setTimeout(() => setDirection(null), 1200);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Sync with initial index when modal opens
  useEffect(() => {
    if (isOpen && emblaApi && initialIndex !== selectedIndex) {
      emblaApi.scrollTo(initialIndex);
    }
  }, [isOpen, emblaApi, initialIndex, selectedIndex]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Focus close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Text animation variants
  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-black"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <motion.button
            ref={closeButtonRef}
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Close gallery"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          {/* Gallery Container */}
          <div className="relative w-full h-full">
            <div
              className="relative w-full h-full overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex h-full">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="relative flex-[0_0_100%] min-w-0 h-full"
                  >
                    {/* This div will contain the cinematic slide */}
                  </div>
                ))}
              </div>
            </div>

            {/* Cinematic Slides Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence mode="wait" custom={direction}>
                <CinematicSlide
                  key={`slide-${selectedIndex}`}
                  image={images[selectedIndex]}
                  title={title}
                  index={selectedIndex}
                  isActive={true}
                  direction={direction}
                  layoutId={`gallery-image-${selectedIndex}`}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className={cn(
                "absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-4 sm:p-5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto",
                "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              )}
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className={cn(
                "absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-4 sm:p-5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto",
                "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              )}
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Text Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8 lg:p-12 pointer-events-none">
              <div className="max-w-4xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                      {title}
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80">
                      Image {selectedIndex + 1} of {images.length}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slide Counter - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-medium"
            >
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
