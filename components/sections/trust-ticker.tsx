"use client";

import { TRUST_STATS, TrustTickerStatsScroll } from "./trust-ticker-marquee";

/* Семантика секции: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section */

const SR_SUMMARY = TRUST_STATS.map(
  (s) => `${s.value}: ${s.label}`,
).join(". ");

export function TrustTicker() {
  return (
    <section
      aria-labelledby="trust-ticker-heading"
      className="relative z-[15] flex w-full max-w-none flex-col rounded-t-[2rem]"
    >
      <h2 id="trust-ticker-heading" className="sr-only shrink-0">{SR_SUMMARY}</h2>
      <TrustTickerStatsScroll />
    </section>
  );
}
