// IntersectionObserver hook (custom).
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(options?: {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once) observer.disconnect();
        } else if (!options?.once) {
          setInView(false);
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "0px",
        threshold: options?.threshold ?? 0.2,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.root, options?.rootMargin, options?.once, options?.threshold]);

  return { ref, inView } as const;
}

