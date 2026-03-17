import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";

// Source: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
export function SiteFooter() {
  return (
    <footer className="border-t border-[rgb(var(--border-subtle-rgb)/0.55)] bg-[rgb(var(--bg-base-rgb)/1)]">
      <Container size="full" className="py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="metric text-xs tracking-[0.22em] text-[rgb(var(--text-primary-rgb)/0.78)]">
              SKYBRIC
            </div>
            <p className="text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
              Стратегия, дизайн и инженерия для систем, которые выдерживают рост.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="text-[rgb(var(--text-primary-rgb)/0.9)]">Навигация</div>
              <ul className="space-y-2 text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/services">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/case-studies">
                    Кейсы
                  </Link>
                </li>
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/contact">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-[rgb(var(--text-primary-rgb)/0.9)]">Юридическое</div>
              <ul className="space-y-2 text-[rgb(var(--text-primary-rgb)/0.72)]">
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/privacy">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/terms">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link className="focus-ring rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="/nda">
                    NDA‑friendly
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-[rgb(var(--text-primary-rgb)/0.9)]">Связь</div>
            <div className="space-y-2 text-sm text-[rgb(var(--text-primary-rgb)/0.72)]">
              <a className="focus-ring block rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="mailto:hello@skybric.digital">
                hello@skybric.digital
              </a>
              <a className="focus-ring block rounded-md hover:text-[rgb(var(--text-primary-rgb)/1)]" href="tel:+74957409979">
                +7 (495) 740‑99‑79
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[rgb(var(--border-subtle-rgb)/0.55)] pt-6 text-xs text-[rgb(var(--text-primary-rgb)/0.6)] lg:flex-row lg:items-center lg:justify-between">
          <div>© {new Date().getFullYear()} SKybric. Все права защищены.</div>
          <div className="metric">WCAG AA · SEO‑first · App Router</div>
        </div>
      </Container>
    </footer>
  );
}

