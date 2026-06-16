import type Lenis from "lenis";

// Shared handle to the single Lenis instance created in SmoothScrollProvider, so
// UI (e.g. the navbar) can drive animated scroll-to without prop drilling.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

/** Pixels reserved at the top so anchored sections clear the fixed navbar. */
const NAV_OFFSET = -90;

/** Smoothly scroll to a hash target (e.g. "#about") via Lenis, with a graceful
 *  native fallback when Lenis is unavailable (reduced-motion / not yet mounted). */
export function scrollToHash(hash: string) {
  const target = hash.startsWith("#") ? hash : `#${hash}`;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: NAV_OFFSET,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4), // quart-out, weighty settle
    });
    return;
  }

  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

/** Smoothly scroll to an absolute Y pixel offset. */
export function scrollToY(y: number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(y, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  window.scrollTo({ top: y, behavior: "smooth" });
}

/** Smoothly scroll back to the very top (logo / home). */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
