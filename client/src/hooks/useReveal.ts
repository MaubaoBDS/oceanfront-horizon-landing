import { useEffect, useRef } from "react";

/**
 * Hook to add reveal-on-scroll animation. Add `className="reveal"` on the
 * target element and pass the ref to it. When the element enters the viewport,
 * an `in-view` class is added and the reveal animation plays.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.05) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px 80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
