/**
 * Single source of truth for prices.
 * Amounts are stored in thousands of tenge (as in the studio price table).
 * Cards, the quote form, hero and SEO read only from here.
 */

export const bodyClasses = [
  { id: "sedan", label: "Седан", fullLabel: "Седан / Хэтчбек" },
  { id: "crossover", label: "Кроссовер", fullLabel: "Кроссовер / Бизнес-класс" },
  { id: "suv", label: "Внедорожник", fullLabel: "Внедорожник / Minivan" },
] as const;

export type BodyClassId = (typeof bodyClasses)[number]["id"];

export const DEFAULT_BODY_CLASS: BodyClassId = "sedan";

/** [from, to] in thousands of tenge. */
export type PriceRange = readonly [from: number, to: number];

export type ServiceVariant = {
  id: string;
  name: string;
  /** Grey explanation under the name. */
  note?: string;
  /** Short lowercase label shown next to the "from" price on a card. */
  short: string;
  prices: Record<BodyClassId, PriceRange>;
};

export type PricedService = {
  id: string;
  /** Same title is used on the card, in the panel and in the quote form. */
  title: string;
  variants: readonly [ServiceVariant, ...ServiceVariant[]];
};

export const services = [
  {
    id: "ppf",
    title: "Антигравийная плёнка (бронеплёнка)",
    variants: [
      {
        id: "risk-zone",
        name: "Зона риска",
        note: "Бампер, капот, фары, зеркала, стойки, полоса на крышу",
        short: "зона риска",
        prices: { sedan: [250, 300], crossover: [300, 350], suv: [350, 420] },
      },
      {
        id: "full-body",
        name: "Полная оклейка кузова",
        note: "Весь автомобиль в матовую или глянцевую плёнку",
        short: "полная оклейка",
        prices: { sedan: [850, 1000], crossover: [1000, 1200], suv: [1200, 1500] },
      },
    ],
  },
  {
    id: "film",
    title: "Тонировка и оклейка плёнкой",
    variants: [
      {
        id: "rear-hemisphere",
        name: "Тонировка задней полусферы",
        note: "Премиум-плёнки США",
        short: "задняя полусфера",
        prices: { sedan: [25, 35], crossover: [35, 45], suv: [45, 60] },
      },
      {
        id: "athermal",
        name: "Атермальная тонировка",
        note: "Лобовое + 2 передних стекла",
        short: "атермальная",
        prices: { sedan: [35, 45], crossover: [45, 55], suv: [55, 70] },
      },
      {
        id: "antichrome",
        name: "Антихром",
        note: "Молдинги, решётка, элементы кузова",
        short: "антихром",
        prices: { sedan: [45, 65], crossover: [60, 85], suv: [80, 120] },
      },
    ],
  },
  {
    id: "windshield",
    title: "Защита лобового стекла",
    variants: [
      {
        id: "windshield-film",
        name: "Бронеплёнка на лобовое стекло",
        note: "Защита от сколов и гравия",
        short: "лобовое стекло",
        prices: { sedan: [60, 75], crossover: [75, 90], suv: [90, 110] },
      },
    ],
  },
  {
    id: "polish",
    title: "Полировка кузова",
    variants: [
      {
        id: "restoring",
        name: "Восстановительная полировка",
        note: "Удаление царапин, паутинки, голограмм",
        short: "восстановительная",
        prices: { sedan: [70, 90], crossover: [90, 115], suv: [115, 140] },
      },
      {
        id: "ceramic",
        name: "Защитное керамическое покрытие",
        note: "2 слоя керамики + жидкое стекло",
        short: "керамика",
        prices: { sedan: [50, 70], crossover: [70, 90], suv: [90, 120] },
      },
    ],
  },
  {
    id: "pdr",
    title: "Удаление вмятин без покраски (PDR)",
    variants: [
      {
        id: "small",
        name: "Мелкие вмятины",
        note: "До 3–5 см",
        short: "мелкие вмятины",
        prices: { sedan: [10, 20], crossover: [15, 25], suv: [15, 30] },
      },
      {
        id: "complex",
        name: "Сложные вмятины",
        note: "С заломами, рёбрами жёсткости, разбором",
        short: "сложные вмятины",
        prices: { sedan: [25, 45], crossover: [35, 60], suv: [45, 80] },
      },
    ],
  },
  {
    id: "interior",
    title: "Детейлинг-химчистка салона",
    variants: [
      {
        id: "full-cleaning",
        name: "Комплексная химчистка с разбором",
        note: "С сушкой и обработкой кондиционером",
        short: "комплексная химчистка",
        prices: { sedan: [50, 65], crossover: [65, 80], suv: [80, 100] },
      },
    ],
  },
  {
    id: "sound",
    title: "Шумоизоляция салона",
    variants: [
      {
        id: "partial",
        name: "Частичная",
        note: "4 двери + багажник",
        short: "частичная",
        prices: { sedan: [90, 115], crossover: [115, 140], suv: [140, 170] },
      },
      {
        id: "premium",
        name: "Полная премиум",
        note: "Пол, потолок, двери, багажник, арки",
        short: "полная премиум",
        prices: { sedan: [280, 340], crossover: [340, 420], suv: [420, 520] },
      },
    ],
  },
  {
    id: "restore",
    title: "Реставрация и уход за интерьером",
    variants: [
      {
        id: "local-restoration",
        name: "Локальная покраска / реставрация кожи",
        note: "Боковина сиденья, руль",
        short: "локальная реставрация",
        prices: { sedan: [20, 35], crossover: [25, 40], suv: [25, 45] },
      },
      {
        id: "interior-ceramic",
        name: "Защитное керамическое покрытие кожи и пластика салона",
        short: "керамика салона",
        prices: { sedan: [35, 50], crossover: [50, 65], suv: [65, 85] },
      },
    ],
  },
] as const satisfies readonly PricedService[];

export type ServiceId = (typeof services)[number]["id"];

export function isBodyClassId(value: unknown): value is BodyClassId {
  return bodyClasses.some((item) => item.id === value);
}

export function getBodyClass(id: BodyClassId) {
  return bodyClasses.find((item) => item.id === id) ?? bodyClasses[0];
}

export function getService(id: string): PricedService {
  return services.find((item) => item.id === id) ?? services[0];
}

export function getVariant(service: PricedService, variantId: string): ServiceVariant {
  return service.variants.find((item) => item.id === variantId) ?? service.variants[0];
}

export function isServiceId(value: unknown): value is ServiceId {
  return services.some((item) => item.id === value);
}

export function rangeFor(variant: ServiceVariant, bodyClass: BodyClassId): PriceRange {
  return variant.prices[bodyClass];
}

/** Variant with the lowest starting price for the given class (first one wins on ties). */
export function cheapestVariant(service: PricedService, bodyClass: BodyClassId): ServiceVariant {
  return service.variants.reduce((best, item) =>
    item.prices[bodyClass][0] < best.prices[bodyClass][0] ? item : best,
  );
}

/** Lowest and highest price of a service across every variant and class (thousands). */
export function serviceBounds(service: PricedService): { low: number; high: number } {
  let low = Infinity;
  let high = -Infinity;
  for (const variant of service.variants) {
    for (const [from, to] of Object.values(variant.prices)) {
      low = Math.min(low, from);
      high = Math.max(high, to);
    }
  }
  return { low, high };
}

/** Lowest starting price in the whole price list (thousands). */
export const minPriceThousands: number = Math.min(
  ...services.map((service) => serviceBounds(service).low),
);

const NBSP = "\u00A0";

/** 250 -> "250 000 ₸" with non-breaking spaces. */
export function formatKzt(thousands: number): string {
  return `${formatAmount(thousands)}${NBSP}₸`;
}

function formatAmount(thousands: number): string {
  return String(Math.round(thousands * 1000)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** [250, 300] -> "250 000 – 300 000 ₸". */
export function formatRange([from, to]: PriceRange): string {
  if (from === to) return formatKzt(from);
  return `${formatAmount(from)}${NBSP}– ${formatAmount(to)}${NBSP}₸`;
}

export const PRICE_FOOTNOTE =
  "Указанные цены являются ориентировочными. Точная стоимость зависит от марки, состояния автомобиля и выбранных материалов. Оставьте заявку на бесплатный осмотр и расчёт.";

/** "от 250 000 ₸" with a non-breaking space after "от". */
export function formatFrom(thousands: number): string {
  return `от${NBSP}${formatKzt(thousands)}`;
}
