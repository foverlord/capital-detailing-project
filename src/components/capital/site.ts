import type { BodyClassId } from "./pricing";

/** Studio facts already present in the repo. Phone is still a placeholder. */

export const studio = {
  name: "Capital Detailing",
  logo: "CD CAPITAL DETAILING",
  city: "Астана",
  addressLines: ["ул. Бухар жырау, 36н", "ЖК Адал"] as const,
  hours: "Ежедневно 10:00–20:00",
  phoneDisplay: "+7 XXX XXX XX XX",
  /** TODO: replace with the studio's real number before launch. */
  phoneTelHref: "tel:+7XXXXXXXXXX",
  /** TODO: replace with the studio's real WhatsApp number. */
  phoneWhatsappHref: "https://wa.me/7XXXXXXXXXX",
  phoneIsPlaceholder: true,
  rating: "4.9",
  ratingSource: "2ГИС",
  reviewCount: "128+",
  warranty: "5 лет гарантии",
  films: "STEK / SunTek",
  gisFirmUrl: "https://2gis.kz/astana/firm/70000001054354013",
  gisRouteUrl: "https://2gis.kz/astana/directions/points/|71.4304,51.1282",
} as const;

export const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Работы", href: "#works" },
  { label: "Онлайн расчёт", href: "#booking" },
  { label: "Контакты", href: "#contacts" },
] as const;

/** Ids only: the server resolves names and the price range from the same price data. */
export type LeadRequest = {
  bodyClass: BodyClassId;
  serviceId: string;
  variantId: string;
  /** "+77001234567" */
  phone: string;
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
