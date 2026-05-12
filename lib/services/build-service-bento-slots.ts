import type { ServiceData } from "@/lib/services/services-data";

export type ServiceBentoSlot =
  | { type: "spacer" }
  | { type: "card"; service: ServiceData; xlColSpan?: 2 };

/**
 * Плоский список слотов под `xl:grid-cols-4`: ритм с пустыми ячейками и редкой широкой карточкой (как на референсе).
 * Спейсеры ниже `xl` скрываются (`hidden xl:block`), карточки на sm уходят в 2 колонки.
 */
export function buildServiceBentoSlots(items: ServiceData[]): ServiceBentoSlot[] {
  const slots: ServiceBentoSlot[] = [];
  let i = 0;
  const n = items.length;
  const take = (): ServiceData | null => (i < n ? items[i++] : null);

  const padRowToMultipleOf4 = () => {
    while (slots.length % 4 !== 0) {
      slots.push({ type: "spacer" });
    }
  };

  let wave = 0;
  while (i < n) {
    const w = wave % 4;
    if (w === 0) {
      for (let c = 0; c < 4; c++) {
        const s = take();
        slots.push(s ? { type: "card", service: s } : { type: "spacer" });
      }
    } else if (w === 1 || w === 3) {
      const a = take();
      if (!a) break;
      slots.push({ type: "card", service: a });
      slots.push({ type: "spacer" });
      const b = take();
      slots.push(b ? { type: "card", service: b } : { type: "spacer" });
      const c = take();
      slots.push(c ? { type: "card", service: c } : { type: "spacer" });
    } else {
      const a = take();
      if (!a) break;
      slots.push({ type: "card", service: a });
      const b = take();
      if (b) {
        slots.push({ type: "card", service: b, xlColSpan: 2 });
      } else {
        slots.push({ type: "spacer" });
        slots.push({ type: "spacer" });
      }
      const c = take();
      slots.push(c ? { type: "card", service: c } : { type: "spacer" });
    }
    wave++;
  }
  padRowToMultipleOf4();
  return slots;
}
