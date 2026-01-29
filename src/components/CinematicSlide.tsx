"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CinematicSlideProps {
  image: string;
  title: string;
  index: number;
  isActive: boolean;
  direction: "forward" | "backward" | null;
  layoutId?: string;
}

export default function CinematicSlide({
  image,
  title,
  index,
  isActive,
  direction,
  layoutId,
}: CinematicSlideProps) {
  // Clip-path animation based on direction (wipe effect)
  const clipPathVariants = {
    initial: (dir: "forward" | "backward" | null) => {
      if (dir === "forward") {
        return { clipPath: "inset(0% 0% 0% 100%)" };
      } else if (dir === "backward") {
        return { clipPath: "inset(0% 100% 0% 0%)" };
      }
      return { clipPath: "inset(0% 0% 0% 0%)" };
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: (dir: "forward" | "backward" | null) => {
      if (dir === "forward") {
        return {
          clipPath: "inset(0% 100% 0% 0%)",
          transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        };
      } else if (dir === "backward") {
        return {
          clipPath: "inset(0% 0% 0% 100%)",
          transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        };
      }
      return {
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1] as const,
        },
      };
    },
  };

  // Scale and opacity for crossfade + zoom effect
  const imageVariants = {
    initial: {
      scale: 1.15,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
    exit: {
      scale: 0.98,
      opacity: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  if (!isActive) return null;

  return (
    <motion.div
      key={`slide-${index}`}
      layoutId={layoutId}
      custom={direction}
      variants={clipPathVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 w-full h-full"
    >
      <motion.div
        variants={imageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full h-full"
      >
        <Image
          src={image}
          alt={`${title} - Image ${index + 1}`}
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  );
}

