const steps = [
  {
    n: "01",
    title: "Приём и детальный осмотр",
    copy: "Фиксируем состояние кузова и салона в акте приёма-передачи. Вы точно знаете, в каком состоянии передали автомобиль.",
    tags: ["Кузов", "Салон", "Акт приёма-передачи"],
  },
  {
    n: "02",
    title: "Подготовка и чистая камера",
    copy: "Тщательная мойка, деконтаминация кузова и работа в закрытой чистой студии без песка и уличной пыли.",
    tags: ["Мойка", "Деконтаминация", "Закрытая студия"],
  },
  {
    n: "03",
    title: "Точные лекала и заворот краёв",
    copy: "Крой по оригинальным лекалам под модель авто. Края заводим под элементы, чтобы плёнка была незаметна и не задиралась.",
    tags: ["Оригинальные лекала", "Заворот краёв"],
  },
] as const;

const reportShots = ["Осмотр", "Мойка", "Плёнка"] as const;

export function Standards() {
  return (
    <section id="standards" className="border-t border-white/8 bg-[#09090b]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-11 px-5 py-12 min-[901px]:grid-cols-[minmax(0,360px)_minmax(0,1fr)] min-[901px]:gap-[72px] min-[901px]:py-[72px] max-[560px]:py-12">
        <header className="flex min-w-0 flex-col gap-7 min-[901px]:sticky min-[901px]:top-10">
          <span className="text-xs tracking-[0.22em] text-[#8d8f9c] uppercase">
            Астана · Процесс работы
          </span>
          <h2 className="font-display text-[clamp(2.375rem,5vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance text-white">
            Как принимаем{" "}
            <em className="bg-[linear-gradient(100deg,#e6d7bf,#cbb69a_55%,#9c8a72)] bg-clip-text text-transparent not-italic">
              автомобиль
            </em>
          </h2>
          <p className="max-w-[34ch] text-[17px] leading-relaxed font-light text-[#8d8f9c]">
            Пять этапов, по которым идёт каждая машина в Астане.
          </p>
          <div className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-b from-[#14141a] to-[#101013]">
            <div className="flex min-w-0 flex-col gap-1 px-5 py-[18px]">
              <small className="text-[11px] tracking-[0.18em] text-[#8d8f9c] uppercase">Этапов</small>
              <b className="font-display text-[22px] font-semibold tracking-[-0.02em] text-white tabular-nums">
                5
              </b>
            </div>
            <div className="flex min-w-0 flex-col gap-1 border-l border-white/8 px-5 py-[18px]">
              <small className="text-[11px] tracking-[0.18em] text-[#8d8f9c] uppercase">
                Гарантия
              </small>
              <b className="font-display text-[22px] font-semibold tracking-[-0.02em] text-white tabular-nums">
                до 5 лет
              </b>
            </div>
          </div>
          <a
            href="#booking"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-[30px] py-[17px] text-base font-medium text-[#0b0b0d] transition duration-300 hover:-translate-y-px hover:bg-[#e6d7bf] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cbb69a] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Онлайн расчет
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-[18px]"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </header>

        <ol className="relative m-0 flex min-w-0 list-none flex-col gap-5 p-0 before:absolute before:top-7 before:bottom-7 before:left-[27px] before:w-px before:bg-[linear-gradient(180deg,#cbb69a_0%,rgba(203,182,154,0.35)_70%,rgba(203,182,154,0.9)_100%)] max-[560px]:before:top-5 max-[560px]:before:bottom-5 max-[560px]:before:left-[19px]">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group grid grid-cols-[56px_minmax(0,1fr)] items-start gap-6 max-[560px]:grid-cols-[40px_minmax(0,1fr)] max-[560px]:gap-3.5"
            >
              <span className="relative z-[1] grid size-14 place-items-center rounded-full border border-[#cbb69a]/40 bg-[#09090b] font-display text-[15px] font-semibold tracking-[0.04em] text-[#cbb69a] tabular-nums shadow-[0_0_0_6px_#09090b] transition duration-300 group-hover:bg-[#cbb69a] group-hover:text-[#0b0b0d] max-[560px]:size-10 max-[560px]:text-xs max-[560px]:shadow-[0_0_0_5px_#09090b] motion-reduce:transition-none">
                {step.n}
              </span>
              <div className="flex min-w-0 flex-col gap-3.5 rounded-3xl border border-white/8 bg-gradient-to-b from-[#14141a] to-[#101013] px-[30px] py-7 transition duration-300 group-hover:translate-x-1 group-hover:border-[#cbb69a]/40 max-[560px]:rounded-[20px] max-[560px]:px-5 max-[560px]:py-[22px] max-[560px]:group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                <h3 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-white max-[560px]:text-xl">
                  {step.title}
                </h3>
                <p className="max-w-[58ch] font-light text-[#8d8f9c]">{step.copy}</p>
                <ul className="mt-1 flex list-none flex-wrap gap-2 p-0">
                  {step.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/8 bg-[#cbb69a]/6 px-[13px] py-1.5 text-[12.5px] tracking-[0.02em] text-[#e6d7bf]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          <li className="group grid grid-cols-[56px_minmax(0,1fr)] items-start gap-6 max-[560px]:grid-cols-[40px_minmax(0,1fr)] max-[560px]:gap-3.5">
            <span className="relative z-[1] grid size-14 place-items-center rounded-full border border-[#cbb69a]/40 bg-[#09090b] font-display text-[15px] font-semibold tracking-[0.04em] text-[#cbb69a] tabular-nums shadow-[0_0_0_6px_#09090b] transition duration-300 group-hover:bg-[#cbb69a] group-hover:text-[#0b0b0d] max-[560px]:size-10 max-[560px]:text-xs max-[560px]:shadow-[0_0_0_5px_#09090b] motion-reduce:transition-none">
              04
            </span>
            <div className="flex min-w-0 flex-col gap-3.5 rounded-3xl border border-white/8 bg-gradient-to-b from-[#14141a] to-[#101013] px-[30px] py-7 transition duration-300 group-hover:translate-x-1 group-hover:border-[#cbb69a]/40 max-[560px]:rounded-[20px] max-[560px]:px-5 max-[560px]:py-[22px] max-[560px]:group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
              <h3 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-white max-[560px]:text-xl">
                Ежедневный фото/видео отчёт
              </h3>
              <p className="max-w-[58ch] font-light text-[#8d8f9c]">
                Присылаем отчёты в WhatsApp/Telegram на каждом этапе, чтобы вы видели процесс без
                визита в цех.
              </p>
              <div className="mt-1.5 grid max-w-[420px] gap-2" aria-label="Пример отчёта в мессенджере">
                <span className="text-[11px] tracking-[0.18em] text-[#8d8f9c] uppercase">
                  Пример отчёта
                </span>
                <div className="grid gap-2.5 rounded-[18px] rounded-bl-[6px] border border-white/8 bg-[#181820] px-3.5 py-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {reportShots.map((label) => (
                      <div
                        key={label}
                        className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[radial-gradient(120%_90%_at_30%_10%,#2a2a33,#121216)] after:absolute after:inset-x-0 after:bottom-0 after:h-[45%] after:bg-gradient-to-b after:from-transparent after:to-[#cbb69a]/20"
                      >
                        <span className="absolute top-[7px] left-2 z-[1] text-[10px] tracking-[0.14em] text-[#e6d7bf] uppercase">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between gap-3 text-sm text-[#d9dae0]">
                    <span>Этап 3 в работе, капот готов</span>
                    <time className="text-xs whitespace-nowrap text-[#8d8f9c] tabular-nums">18:40</time>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="group grid grid-cols-[56px_minmax(0,1fr)] items-start gap-6 max-[560px]:grid-cols-[40px_minmax(0,1fr)] max-[560px]:gap-3.5">
            <span className="relative z-[1] grid size-14 place-items-center rounded-full border border-[#cbb69a]/40 bg-[#09090b] font-display text-[15px] font-semibold tracking-[0.04em] text-[#cbb69a] tabular-nums shadow-[0_0_0_6px_#09090b] transition duration-300 group-hover:bg-[#cbb69a] group-hover:text-[#0b0b0d] max-[560px]:size-10 max-[560px]:text-xs max-[560px]:shadow-[0_0_0_5px_#09090b] motion-reduce:transition-none">
              05
            </span>
            <div className="flex min-w-0 flex-col rounded-3xl border border-white/8 bg-gradient-to-b from-[#14141a] to-[#101013] px-[30px] py-7 transition duration-300 group-hover:translate-x-1 group-hover:border-[#cbb69a]/40 group-hover:bg-[radial-gradient(90%_140%_at_100%_0%,rgba(203,182,154,0.16),transparent_60%),linear-gradient(180deg,#14141a,#101013)] max-[560px]:rounded-[20px] max-[560px]:px-5 max-[560px]:py-[22px] max-[560px]:group-hover:translate-x-0 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
              <div className="flex flex-wrap items-center justify-between gap-7">
                <div className="flex min-w-0 flex-1 basis-[300px] flex-col gap-3.5">
                  <h3 className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-white max-[560px]:text-xl">
                    Официальный договор и гарантия до 5 лет
                  </h3>
                  <p className="max-w-[58ch] font-light text-[#8d8f9c]">
                    Фиксируем стоимость и обязательства в договоре. Выдаём гарантийный талон на
                    выполненные работы.
                  </p>
                  <ul className="mt-1 flex list-none flex-wrap gap-2 p-0">
                    {["Договор", "Гарантийный талон"].map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/8 bg-[#cbb69a]/6 px-[13px] py-1.5 text-[12.5px] tracking-[0.02em] text-[#e6d7bf]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-baseline gap-2.5" aria-hidden="true">
                  <b className="bg-gradient-to-b from-[#e6d7bf] to-[#9c8a72] bg-clip-text font-display text-[88px] leading-[0.85] font-extrabold tracking-[-0.05em] text-transparent max-[560px]:text-[68px]">
                    5
                  </b>
                  <span className="text-xs leading-snug tracking-[0.18em] text-[#8d8f9c] uppercase">
                    лет
                    <br />
                    гарантии
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
