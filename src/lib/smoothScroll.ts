import Lenis from "lenis";

// Configuration - set to false to disable Lenis globally
export const ENABLE_LENIS = process.env.NEXT_PUBLIC_ENABLE_LENIS !== "false";

// Detect mobile devices
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Detect touch devices
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
}

// Check if Lenis should be enabled
export function shouldEnableLenis(): boolean {
  if (!ENABLE_LENIS) return false;
  // Disable on mobile/touch devices to preserve native scroll
  if (isMobileDevice() || isTouchDevice()) return false;
  return true;
}

// Initialize Lenis instance
let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (!shouldEnableLenis()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, // Disable smooth touch to preserve native mobile scroll
    touchMultiplier: 2,
    infinite: false,
  });

  return lenisInstance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

// Smooth scroll to element (works with or without Lenis)
export function smoothScrollTo(elementId: string, offset: number = 0) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) return;

  if (lenisInstance && shouldEnableLenis()) {
    // Use Lenis for smooth scrolling
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    lenisInstance.scrollTo(offsetPosition, {
      duration: 1.2,
      offset: -offset,
    });
  } else {
    // Fallback to native smooth scroll
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
