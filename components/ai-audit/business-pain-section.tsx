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
    tag: "рутина · документы",
    title: "Ручная рутина и долгая сборка документов",
    symptomLabel: "Как проявляется",
    symptom:
      "Команда копирует данные между таблицами, CRM, мессенджерами, документами и внутренними системами. КП, счета, заявки, отчёты и другие документы собираются вручную из разных источников.",
    lossLabel: "Что теряет бизнес",
    loss:
      "Время сотрудников уходит на повторяющиеся операции вместо продаж и сервиса; процессы тормозятся, растут ошибки, клиент дольше ждёт ответ.",
    checkLabel: "Что проверим",
    check:
      "Какие действия и документы повторяются каждый день, где убрать ручной ввод, связать системы и автоматически подтягивать данные.",
    gridSpan: "xl:col-span-2",
  },
  {
    number: "05",
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
    <article
      className="group flex h-full min-w-0 flex-col rounded-[28px] border border-[#E6E0D8] bg-white p-6 shadow-[0_12px_36px_rgba(72,57,41,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#6D4AFF]/35 hover:shadow-[0_18px_52px_rgba(72,57,41,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1EAFF] text-sm font-bold text-[#6D4AFF] ring-1 ring-[#D8CCFF]">
          {pain.number}
        </span>
      </div>

      <h3 className="text-[1.38rem] font-semibold leading-[1.18] tracking-normal text-[#121212] sm:text-2xl">
        {pain.title}
      </h3>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6B6B6B]">
            {pain.symptomLabel}
          </p>
          <p className="mt-2 text-[15px] leading-[1.58] text-[#4B4B4B]">{pain.symptom}</p>
        </div>

        <div className="rounded-[18px] bg-[#18181B] p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#B8FF5C]">
            {pain.lossLabel}
          </p>
          <p className="mt-2 text-[15px] font-semibold leading-[1.55] text-white/90">
            {pain.loss}
          </p>
        </div>
      </div>
    </article>
  );
}

export function BusinessPainSection() {
  return (
    <section
      className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      aria-labelledby="business-pain-heading"
    >
      <div className="grid w-full min-w-0 gap-10 lg:gap-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="business-pain-heading"
              className="max-w-4xl text-[clamp(2.4rem,4.8vw,4.8rem)] font-semibold leading-[0.98] tracking-normal text-[#121212]"
            >
              Где бизнес чаще всего теряет время и деньги
            </h2>
          </div>
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
