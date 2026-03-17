// ResizeObserver hook (custom).
// Source: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
import { useEffect, useRef, useState } from "react";

export function useElementSize<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const box = entry.contentRect;
      setSize({ width: box.width, height: box.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, size } as const;
}

