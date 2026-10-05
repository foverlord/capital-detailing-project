import type { BodyClassId, ServiceId } from "./pricing";

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

export type LeadRequest = {
  bodyClass: BodyClassId;
  packageId: ServiceId;
  phone: string;
};

/**
 * UI-only lead capture. Persistence is intentionally not wired yet.
 * TODO: Supabase insert + Telegram notify.
 */
export async function saveLead(lead: LeadRequest): Promise<void> {
  void lead;
}
