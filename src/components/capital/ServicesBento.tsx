import type { PointerEvent, ReactNode } from "react";
import { BodyClassSwitcher } from "./BodyClassSwitcher";
import { FadeIn } from "./FadeIn";
import { Accent } from "./SectionHeading";

type ServiceCardData = {
  id: string;
  tag: string;
  title: string;
  copy: string;
  chips?: readonly string[];
  art: ReactNode;
  /** Drop a studio photo here later. Until then the line drawing stays. */
  image?: string;
  className: string;
  titleClassName?: string;
};

function trackGlow(event: PointerEvent<HTMLAnchorElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <a
      href="#booking"
      onPointerMove={trackGlow}
      className={`group relative isolate flex min-w-0 flex-col justify-end gap-2.5 overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-b from-[#17171c] to-[#111115] p-[22px] text-inherit no-underline transition duration-300 hover:-translate-y-0.5 hover:border-[#d8c39a]/40 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d8c39a] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${card.className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(360px_circle_at_var(--mx,70%)_var(--my,0%),rgba(216,195,154,0.13),transparent_65%)] opacity-55 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {card.image ? (
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      ) : (
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {card.art}
          <span className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[#111115]" />
        </span>
      )}
      <span className="self-start rounded-full border border-[#d8c39a]/30 bg-zinc-950/45 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.16em] text-[#d8c39a] uppercase">
        {card.tag}
      </span>
      <h3
        className={`mt-1 font-display font-medium tracking-tight text-balance text-zinc-100 ${card.titleClassName ?? "text-[17px] leading-snug"}`}
      >
        {card.title}
      </h3>
      <p className="m-0 max-w-[46ch] text-[13.5px] leading-relaxed text-zinc-400">{card.copy}</p>
      {card.chips ? (
        <ul className="mt-1 flex list-none flex-wrap gap-1.5 p-0">
          {card.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-white/6 px-2.5 py-0.5 text-xs text-zinc-100/80"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
      <span
        aria-hidden
        className="absolute top-[18px] right-[18px] grid size-[34px] place-items-center rounded-full border border-white/8 bg-zinc-950/50 text-[15px] text-zinc-100 transition duration-300 group-hover:rotate-45 group-hover:bg-[#d8c39a] group-hover:text-[#17140d] group-focus-visible:rotate-45 group-focus-visible:bg-[#d8c39a] group-focus-visible:text-[#17140d] motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
      >
        →
      </span>
    </a>
  );
}

const artClass =
  "absolute top-0 right-0 h-[72%] w-full fill-none stroke-[#d8c39a]/55 stroke-[1.2] [stroke-linecap:round] [stroke-linejoin:round] [&_.dim]:stroke-[#7f93b5]/35";

const bodyServices: readonly ServiceCardData[] = [
  {
    id: "ppf",
    tag: "Защита",
    title: "Антигравийная плёнка (бронеплёнка)",
    copy: "Защита кузова от сколов, царапин и внешних повреждений. Лак остаётся заводским.",
    chips: ["Сколы", "Царапины", "Реагенты"],
    className: "min-h-[340px] lg:col-span-6 lg:row-span-2 lg:min-h-full",
    titleClassName: "text-[clamp(20px,2.4vw,26px)] leading-tight",
    art: (
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={`${artClass} h-[62%]`}>
        <path d="M40 190 L120 70 L360 70 L300 190 Z" />
        <path className="dim" d="M60 205 L140 85 L380 85 L320 205 Z" />
        <path className="dim" d="M80 220 L160 100 L400 100 L340 220 Z" />
        <path d="M360 70 C 372 50, 392 52, 392 74 C 392 96, 372 92, 366 84" />
        <path className="dim" d="M150 110 L330 110 M135 135 L315 135 M120 160 L300 160" />
      </svg>
    ),
  },
  {
    id: "film",
    tag: "Стиль",
    title: "Тонировка и оклейка плёнкой",
    copy: "Тонирование стёкол, смена цвета, стилизация элементов.",
    className: "min-h-[232px] md:col-span-6 lg:col-span-3",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <path d="M50 150 L90 50 H250 L270 150 Z" />
        <path className="dim" d="M50 150 L90 50 H170 L160 150 Z" />
        <path className="dim" d="M70 100 H260 M60 125 H265" />
      </svg>
    ),
  },
  {
    id: "windshield",
    tag: "Защита",
    title: "Защита лобового стекла",
    copy: "Защитная плёнка от камней и пескоструя.",
    className: "min-h-[232px] md:col-span-6 lg:col-span-3",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <path d="M30 150 C 70 40, 230 40, 270 150 Z" />
        <circle cx="170" cy="100" r="4" />
        <path className="dim" d="M170 100 L205 70 M170 100 L215 108 M170 100 L150 62 M170 100 L132 118 M170 100 L180 140" />
        <circle className="dim" cx="170" cy="100" r="18" />
      </svg>
    ),
  },
  {
    id: "polish",
    tag: "Блеск",
    title: "Полировка кузова",
    copy: "Восстановительная и защитная полировка лака, керамические и защитные составы.",
    className: "min-h-[232px] md:col-span-6 lg:col-span-3",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <circle cx="170" cy="95" r="62" />
        <circle className="dim" cx="170" cy="95" r="42" />
        <circle className="dim" cx="170" cy="95" r="22" />
        <path d="M120 60 C 150 35, 200 35, 225 58" />
      </svg>
    ),
  },
  {
    id: "pdr",
    tag: "Геометрия",
    title: "Удаление вмятин без покраски (PDR)",
    copy: "Восстановление геометрии элементов без перекраса.",
    className: "min-h-[232px] md:col-span-6 lg:col-span-3",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <path d="M20 120 C 90 100, 210 100, 290 120" />
        <ellipse cx="160" cy="112" rx="56" ry="14" />
        <ellipse className="dim" cx="160" cy="112" rx="34" ry="8" />
        <ellipse className="dim" cx="160" cy="112" rx="14" ry="3.5" />
        <path className="dim" d="M20 140 C 90 124, 210 124, 290 140" />
      </svg>
    ),
  },
];

const salonServices: readonly ServiceCardData[] = [
  {
    id: "interior",
    tag: "Чистота",
    title: "Детейлинг-химчистка салона",
    copy: "Глубокая чистка сидений, потолка, пластика и ковролина. Устраняем запахи и бактерии.",
    chips: ["Сиденья", "Потолок", "Пластик", "Ковролин"],
    className: "min-h-[300px] md:col-span-6 lg:col-span-4",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <path d="M90 160 V70 C 90 50, 130 45, 140 70 V110 H200 C 220 110, 225 160, 205 160 Z" />
        <path className="dim" d="M50 40 l6 12 l12 6 l-12 6 l-6 12 l-6 -12 l-12 -6 l12 -6 z" />
        <path className="dim" d="M240 60 l4 8 l8 4 l-8 4 l-4 8 l-4 -8 l-8 -4 l8 -4 z" />
      </svg>
    ),
  },
  {
    id: "sound",
    tag: "Тишина",
    title: "Шумоизоляция салона",
    copy: "Комплексная или частичная вибро- и шумоизоляция, чтобы в дороге было тише.",
    className: "min-h-[300px] md:col-span-6 lg:col-span-4",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <path d="M90 85 H115 L145 60 V140 L115 115 H90 Z" />
        <path className="dim" d="M170 85 C 182 95, 182 105, 170 115" />
        <path className="dim" d="M188 70 C 212 90, 212 110, 188 130" />
        <path className="dim" d="M206 55 C 242 85, 242 115, 206 145" />
      </svg>
    ),
  },
  {
    id: "restore",
    tag: "Уход",
    title: "Реставрация и уход за интерьером",
    copy: "Чистка, защита и восстановление кожаных и пластиковых элементов.",
    chips: ["Кожа", "Пластик"],
    className: "min-h-60 md:col-span-12 lg:col-span-4 lg:min-h-[300px]",
    art: (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className={artClass}>
        <rect x="70" y="45" width="170" height="105" rx="16" />
        <rect className="dim" x="82" y="57" width="146" height="81" rx="10" strokeDasharray="5 5" />
        <path className="dim" d="M110 98 H200 M110 78 H200 M110 118 H200" />
      </svg>
    ),
  },
];

export function ServicesBento() {
  return (
    <section id="services">
      <FadeIn className="mx-auto flex max-w-[1120px] flex-col gap-14 px-5 py-16 md:px-6 md:py-24">
        <header className="flex max-w-2xl flex-col">
          <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-500 uppercase">Услуги</p>
          <h2 className="mt-3.5 font-display text-[clamp(1.75rem,4.4vw,2.875rem)] leading-[1.12] font-semibold tracking-tight text-balance text-zinc-100">
            Два направления <Accent>студии</Accent>
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">
            Восемь услуг для кузова и салона. Срок и состав работ называем после осмотра, без
            фиксированного прайса на сайте.
          </p>
        </header>

        <BodyClassSwitcher idPrefix="services-class" />

        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/8 pb-4">
            <h3 className="font-display text-[clamp(1.125rem,2.2vw,1.375rem)] font-medium tracking-tight text-zinc-100">
              Кузов и экстерьер
            </h3>
            <span className="font-mono text-xs tracking-[0.08em] text-zinc-500 uppercase">
              5 услуг
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-12 lg:auto-rows-[minmax(232px,auto)]">
            {bodyServices.map((card) => (
              <ServiceCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/8 pb-4">
            <h3 className="font-display text-[clamp(1.125rem,2.2vw,1.375rem)] font-medium tracking-tight text-zinc-100">
              Салон и комфорт
            </h3>
            <span className="font-mono text-xs tracking-[0.08em] text-zinc-500 uppercase">
              3 услуги
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-12 lg:auto-rows-[minmax(300px,auto)]">
            {salonServices.map((card) => (
              <ServiceCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div
          id="zapis"
          className="flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-white/8 bg-[#111115] px-6 py-[22px]"
        >
          <p className="m-0 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
            Не уверены, что подойдёт именно вашему автомобилю? Привезите его на осмотр, и мы
            подберём состав работ и назовём срок.
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-[#d8c39a] px-5 py-3 text-sm font-semibold text-[#17140d] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-zinc-100"
          >
            Записаться на осмотр →
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
