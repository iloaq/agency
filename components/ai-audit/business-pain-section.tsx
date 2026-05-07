const businessPains = [
  {
    number: "01",
    tag: "процесс",
    title: "Заявки теряются",
    symptomLabel: "Как проявляется",
    symptom:
      "Клиенты пишут в сайт, Telegram, WhatsApp или звонят, но часть обращений не фиксируется и не доводится до сделки.",
    lossLabel: "Что теряет бизнес",
    loss: "Потерянные обращения, задержки в реакции и размытая картина по входящему потоку.",
    checkLabel: "Что проверим",
    check: "Где заявка теряет скорость, кто отвечает, где нет фиксации и follow-up.",
  },
  {
    number: "02",
    tag: "скорость",
    title: "Клиенты ждут ответа",
    symptomLabel: "Как проявляется",
    symptom:
      "Менеджеры вручную отвечают на однотипные вопросы, задерживаются с реакцией и часть клиентов уходит к конкурентам.",
    lossLabel: "Что теряет бизнес",
    loss: "Клиент ждёт, а нагрузка на отдел продаж и поддержку растёт.",
    checkLabel: "Что проверим",
    check:
      "Какие вопросы повторяются, какие ответы можно собрать в базу знаний, где нужна подсказка менеджеру.",
  },
  {
    number: "03",
    tag: "CRM",
    title: "CRM заполнена хаотично",
    symptomLabel: "Как проявляется",
    symptom:
      "Карточки клиентов заполняются вручную, данные неполные, задачи не создаются вовремя.",
    lossLabel: "Что теряет бизнес",
    loss: "Руководитель не видит реальную воронку, менеджеры работают по памяти, часть сделок зависает.",
    checkLabel: "Что проверим",
    check:
      "Какие поля не заполняются, где теряется история общения, какие действия можно автоматизировать.",
  },
  {
    number: "04",
    tag: "рутина",
    title: "Сотрудники делают рутину вручную",
    symptomLabel: "Как проявляется",
    symptom:
      "Команда копирует данные между таблицами, CRM, мессенджерами, документами и внутренними системами.",
    lossLabel: "Что теряет бизнес",
    loss: "Время сотрудников уходит на повторяющиеся операции вместо продаж, сервиса и развития.",
    checkLabel: "Что проверим",
    check:
      "Какие действия повторяются каждый день, где можно убрать ручной ввод и связать системы.",
  },
  {
    number: "05",
    tag: "документы",
    title: "Документы собираются долго",
    symptomLabel: "Как проявляется",
    symptom:
      "КП, счета, заявки, отчёты или внутренние документы собираются вручную из разных источников.",
    lossLabel: "Что теряет бизнес",
    loss: "Процессы тормозятся, сотрудники ошибаются, клиент дольше ждёт ответ.",
    checkLabel: "Что проверим",
    check:
      "Какие документы формируются часто, какие данные нужны и откуда их можно подтягивать автоматически.",
  },
  {
    number: "06",
    tag: "контроль",
    title: "Руководитель не видит реальную картину",
    symptomLabel: "Как проявляется",
    symptom:
      "Данные разбросаны по CRM, чатам, таблицам и менеджерам. Нет единого понятного среза.",
    lossLabel: "Что теряет бизнес",
    loss: "Сложно понять, где проседают продажи, кто перегружен и какие процессы реально тормозят рост.",
    checkLabel: "Что проверим",
    check:
      "Какие метрики нужны руководителю, где сейчас лежат данные и как собрать их в понятную панель.",
  },
] as const;

function PainCard({ pain }: { pain: (typeof businessPains)[number] }) {
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-[28px] border border-[#E4E7EC] bg-white p-6 shadow-[0_14px_40px_rgba(16,24,40,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/35 hover:shadow-[0_20px_55px_rgba(16,24,40,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-extrabold text-[#2563EB] ring-1 ring-[#BFDBFE]">
          {pain.number}
        </span>
        <span className="shrink-0 rounded-full border border-[#E4E7EC] bg-[#F7F8FB] px-3 py-1.5 text-right text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
          {pain.tag}
        </span>
      </div>

      <h3 className="text-[1.38rem] font-bold leading-[1.18] tracking-[-0.01em] text-[#101828] sm:text-2xl">
        {pain.title}
      </h3>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            {pain.symptomLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.58] text-[#475467]">{pain.symptom}</p>
        </div>

        <div className="rounded-2xl bg-[#101828] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#93C5FD]">
            {pain.lossLabel}
          </p>
          <p className="mt-2 text-[15px] font-semibold leading-[1.55] text-white/92">
            {pain.loss}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#7C3AED]">
            {pain.checkLabel}
          </p>
          <p className="mt-2 text-[15px] font-medium leading-[1.55] text-[#101828]">
            {pain.check}
          </p>
        </div>
      </div>
    </article>
  );
}

export function BusinessPainSection() {
  return (
    <section
      className="bg-[#F7F8FB] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      aria-labelledby="business-pain-heading"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:gap-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#7C3AED]">
              БОЛИ БИЗНЕСА
            </p>
            <h2
              id="business-pain-heading"
              className="max-w-[760px] text-[clamp(2rem,4.4vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#101828]"
            >
              Где бизнес чаще всего теряет время и деньги
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.65] text-[#475467] sm:text-lg">
              На аудите мы ищем не абстрактные проблемы, а конкретные процессы: где заявки
              теряются, сотрудники делают одно и то же вручную, документы собираются долго,
              а руководитель не видит реальную картину.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-[28px] border border-[#E4E7EC] bg-white p-6 shadow-[0_16px_45px_rgba(16,24,40,0.055)]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold leading-8 tracking-[-0.01em] text-[#101828]">
                  Что ищем на аудите
                </h3>
                <span className="rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-bold text-[#2563EB]">
                  фокус
                </span>
              </div>
              <ul className="mt-6 grid gap-3">
                {[
                  "где теряются заявки",
                  "где сотрудники делают рутину вручную",
                  "где руководитель не видит данные",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[#EEF0F4] bg-[#F7F8FB] px-4 py-3 text-[15px] font-bold leading-6 text-[#101828]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-[#101828] px-4 py-3 text-sm font-semibold leading-6 text-white">
                Находим точки потерь и фиксируем, что проверить первым.
              </p>
            </div>
          </aside>
        </div>

        <div className="grid min-w-0 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {businessPains.map((pain) => (
            <PainCard key={pain.number} pain={pain} />
          ))}
        </div>
      </div>
    </section>
  );
}
