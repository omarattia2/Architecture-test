"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import FullscreenGalleryModal from "./FullscreenGalleryModal";

interface ServiceGalleryProps {
  images: string[];
  title: string;
}

export default function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative w-full group">
        {/* Carousel Container - Clickable */}
        <div
          className="relative overflow-hidden rounded-lg cursor-pointer"
          ref={emblaRef}
          onClick={handleOpenModal}
        >
          <div className="flex">
            {images.map((image, index) => (
              <motion.div
                key={index}
                layoutId={
                  selectedIndex === index && !isModalOpen
                    ? `gallery-image-${index}`
                    : undefined
                }
                className="relative flex-[0_0_100%] min-w-0 aspect-[4/3] sm:aspect-[16/10]"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: selectedIndex === index ? 1 : 0.7,
                  y: selectedIndex === index ? 0 : 10,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            scrollPrev();
          }}
          disabled={prevBtnDisabled}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          )}
          aria-label="Previous image"
        >
          <svg
            className="w-5 h-5 text-gray-900"
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
          onClick={(e) => {
            e.stopPropagation();
            scrollNext();
          }}
          disabled={nextBtnDisabled}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          )}
          aria-label="Next image"
        >
          <svg
            className="w-5 h-5 text-gray-900"
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

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>

        {/* "Bekijk galerij" Button - Bottom Right Overlay */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal();
          }}
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 right-4 z-10 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-sm rounded-lg font-semibold text-gray-900 hover:bg-white shadow-lg flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-100 opacity-0 sm:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Open gallery"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
          <span className="text-sm sm:text-base">Bekijk galerij</span>
        </motion.button>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenGalleryModal
        images={images}
        title={title}
        isOpen={isModalOpen}
        initialIndex={selectedIndex}
        onClose={handleCloseModal}
      />
    </>
  );
}
