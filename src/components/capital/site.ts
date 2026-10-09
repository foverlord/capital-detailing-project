import type { BodyClassId } from "./pricing";

/** Studio facts. Phone and WhatsApp are the studio line. */

const gisMap = {
  orgId: "70000001054354013",
  city: "astana",
  /** From https://2gis.kz/astana/firm/70000001054354013?m=71.438782,51.097421/17.43 */
  lat: 51.097421,
  lon: 71.438782,
  zoom: 17.43,
} as const;

/** Isolated iframe URL. Never inject DGWidgetLoader into the page: it calls document.write. */
export function getGisWidgetEmbedUrl(): string {
  const options = {
    pos: { lat: gisMap.lat, lon: gisMap.lon, zoom: 17 },
    opt: { city: gisMap.city },
    org: gisMap.orgId,
  };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}

export const studio = {
  name: "Capital Detailing",
  logo: "CD CAPITAL DETAILING",
  city: "Астана",
  addressLines: ["ул. Бухар жырау, 36н", "ЖК Адал"] as const,
  hours: "Ежедневно 10:00–20:00",
  phoneDisplay: "+7 708 111 96 96",
  phoneTelHref: "tel:+77081119696",
  phoneWhatsappHref: "https://wa.me/77081119696",
  rating: "4.9",
  ratingSource: "2ГИС",
  reviewCount: "128+",
  warranty: "5 лет гарантии",
  films: "STEK / SunTek",
  gisFirmUrl: `https://2gis.kz/astana/firm/${gisMap.orgId}?m=${gisMap.lon}%2C${gisMap.lat}%2F${gisMap.zoom}`,
  gisRouteUrl: `https://2gis.kz/astana/directions/points/|${gisMap.lon},${gisMap.lat}`,
} as const;

export interface NavLink {
  label: string;
  /** Shorter label for tablet widths (768–1023 px) where the full one does not fit. */
  compactLabel?: string;
  href: string;
}

export const navLinks: readonly NavLink[] = [
  { label: "Услуги и цены", compactLabel: "Цены", href: "#services" },
  { label: "Работы", href: "#works" },
  { label: "Онлайн расчёт", href: "#booking" },
  { label: "Контакты", href: "#contacts" },
];

/** Ids only: the server resolves names from the same price data. */
export type LeadRequest = {
  bodyClass: BodyClassId;
  serviceId: string;
  variantId: string;
  /** Trimmed make and model, 2–80 characters. */
  carModel: string;
  /** "+77001234567" */
  phone: string;
  /** Honeypot. People leave this empty; a filled value is dropped on the server. */
  hp?: string;
};

const SEND_TIMEOUT_MS = 15_000;

/** Sends the lead to /api/lead. Throws on network errors, timeouts and non-2xx answers. */
export async function saveLead(lead: LeadRequest): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new Error("offline");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`lead request failed: ${response.status}`);
  } finally {
    clearTimeout(timer);
  }
}
