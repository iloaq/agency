"use client";

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

/* Next.js Link: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating */

type HeroSlide = {
  eyebrow: string;
  title: string;
  /** Превью кейса; из `public/` — путь вида `/photo.jpg` */
  image?: string;
};

const slides: HeroSlide[] = [
  { eyebrow: "Проекты", title: "ExchangeBRO" },
  { eyebrow: "Проекты", title: "FinFlow" },
];

function SlidePreview({ image, title }: { image?: string; title: string }) {
  if (image) {
    return (
      // Source: https://nextjs.org/docs/app/api-reference/components/image#fill
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 450px"
      />
    );
  }
  return (
    <div
      className="absolute inset-0 bg-black/[0.06]"
      aria-hidden
    />
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  const slide = slides[i];

  const prev = useCallback(() => {
    setI((v) => (v <= 0 ? slides.length - 1 : v - 1));
  }, []);

  const next = useCallback(() => {
    setI((v) => (v >= slides.length - 1 ? 0 : v + 1));
  }, []);

  return (
    <section
      className="relative z-[1] w-full max-w-none overflow-hidden bg-background-primary px-space-lg pb-space-xl4 pt-space-xl2 md:pb-space-xl5 md:pt-space-xl3"
      aria-labelledby="hero-heading"
    >
      {/* Верх: только текст, слева, как на макете */}
      <div className="mb-10 max-w-[77%] space-y-6 md:mb-14 lg:mb-16 ">
        <h1
          id="hero-heading"
          className="text-heading-h1 text-fonts-black"
        >
          Сайты, веб-сервисы и автоматизация для задач бизнеса, где важны заявки,
          данные и контроль.
        </h1>
        <p className="max-w-[80%] text-heading-subtitle2 text-fonts-black">
          Проектируем сайты, личные кабинеты, Telegram-боты, CRM-интеграции и
          SEO-систему. AI подключаем только там, где он сокращает ручную работу
          и помогает команде быстрее обрабатывать задачи.
        </p>
      </div>

      {/* Низ: flex вместо grid; lg пропорции 5+3+4 как ~12-колоночный ряд */}
      {/* Source: https://tailwindcss.com/docs/flex-basis */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-space-lg">
        {/* Карточка: на мобилке первая, на lg справа */}
        <div className="order-1 flex min-w-0 flex-col gap-space-lg lg:order-3 lg:basis-0 lg:grow-[4]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-fonts-grey">
              {slide.eyebrow}
            </p>
            <p className="mt-1 text-lg font-semibold text-fonts-black md:text-xl">
              {slide.title}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[450px] overflow-hidden rounded-3xl border border-black/6 bg-background-secondary shadow-[0_24px_60px_-20px_rgba(15,15,25,0.35)] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[450/320] w-full max-h-[320px]">
              <SlidePreview image={slide.image} title={slide.title} />
            </div>
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-fonts-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Предыдущий проект"
              >
                <ChevronLeft sx={{ fontSize: 22 }} aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-fonts-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Следующий проект"
              >
                <ChevronRight sx={{ fontSize: 22 }} aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Статистика: на мобилке вторая, на lg по центру */}
        <div className="order-2 flex justify-end self-start lg:order-2 lg:basis-0 lg:grow-[3] lg:self-end">
          <p className="text-heading-h3 text-fonts-black">
            Задача
            <br />
            система
            <br />
            запуск
          </p>
        </div>

        {/* Marquee по SVG-path (иконки стека) + CTA — идея: https://www.fancycomponents.dev/docs/components/blocks/marquee-along-svg-path */}
        <div className="relative order-3 flex min-h-[14rem] flex-col justify-end lg:order-1 lg:min-h-[18rem] lg:basis-0 lg:grow-[5] lg:self-stretch">
          {/* <HeroStackMarquee className="relative z-0 -mb-1 w-full max-lg:mx-auto lg:-left-2" /> */}
          <div className="relative z-10 flex w-full flex-col items-end gap-4 pb-2 sm:flex-row sm:flex-wrap lg:pb-6">
            <Button variant="violet" size="large">Обсудить проект</Button>
            <Button variant="secondary" size="large">Смотреть кейсы</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
