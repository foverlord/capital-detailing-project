import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getBodyClass, getService, isBodyClassId, isServiceId } from "@/components/capital/pricing";

const leadSchema = z.object({
  bodyClass: z.string().refine(isBodyClassId),
  serviceId: z.string().refine(isServiceId),
  variantId: z.string().min(1).max(60),
  carModel: z.string().trim().min(2).max(80),
  phone: z.string().regex(/^\+7\d{10}$/),
  hp: z.string().max(200).optional(),
});

const DELIVERY_TIMEOUT_MS = 10_000;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function formatDisplayPhone(phone: string) {
  const d = phone.slice(2);
  return `+7 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}

function almatyStamp(now = new Date()) {
  const formatted = new Intl.DateTimeFormat("ru-KZ", {
    timeZone: "Asia/Almaty",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  return `${formatted} (Asia/Almaty)`;
}

function logFailure(channel: string, error: unknown) {
  const message = error instanceof Error ? error.message : "unknown error";
  console.error(`[lead] ${channel} failed: ${message}`);
}

/** Tokens stay in process.env. Errors are generic so a thrown fetch URL never reaches the log. */
async function notifyTelegram(text: string) {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  const chatId = process.env["TELEGRAM_CHAT_ID"];
  if (!token || !chatId) throw new Error("not configured");

  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });
  } catch {
    throw new Error("request failed");
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

async function notifySheets(payload: {
  date: string;
  carClass: string;
  service: string;
  carModel: string;
  phone: string;
}) {
  const raw = process.env["GOOGLE_SHEETS_WEBHOOK_URL"];
  if (!raw) throw new Error("not configured");

  let webhook: URL;
  try {
    webhook = new URL(raw);
  } catch {
    throw new Error("invalid webhook url");
  }
  if (webhook.protocol !== "https:") throw new Error("webhook must be https");

  let response: Response;
  try {
    response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });
  } catch {
    throw new Error("request failed");
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

/**
 * Receives a lead and forwards it to Telegram and Google Sheets in parallel.
 * Secrets are read from the server environment only.
 * One failed channel is logged; the lead is still accepted if the other succeeds.
 */
export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "bad_json" }, 400);
        }

        if (
          payload != null &&
          typeof payload === "object" &&
          "hp" in payload &&
          typeof payload.hp === "string" &&
          payload.hp.trim() !== ""
        ) {
          return json({ ok: true }, 200);
        }

        const parsed = leadSchema.safeParse(payload);
        if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);

        const { bodyClass, serviceId, variantId, carModel, phone } = parsed.data;
        if (!isBodyClassId(bodyClass)) return json({ ok: false, error: "invalid" }, 400);

        const service = getService(serviceId);
        const variant = service.variants.find((item) => item.id === variantId);
        if (!variant) return json({ ok: false, error: "invalid" }, 400);

        const carClass = getBodyClass(bodyClass).fullLabel;
        const serviceLabel = `${service.title} — ${variant.name}`;
        const phoneLabel = formatDisplayPhone(phone);
        const date = almatyStamp();

        const text = [
          "🚗 Новая заявка Capital Detailing",
          `Класс: ${carClass}`,
          `Услуга: ${serviceLabel}`,
          `Марка: ${carModel}`,
          `Телефон: ${phoneLabel}`,
          `Дата: ${date}`,
        ].join("\n");

        const results = await Promise.allSettled([
          notifyTelegram(text),
          notifySheets({ date, carClass, service: serviceLabel, carModel, phone: phoneLabel }),
        ]);

        results.forEach((result, index) => {
          if (result.status === "rejected") {
            logFailure(index === 0 ? "telegram" : "sheets", result.reason);
          }
        });

        const delivered = results.some((result) => result.status === "fulfilled");
        if (!delivered) return json({ ok: false, error: "delivery_failed" }, 502);

        return json({ ok: true }, 200);
      },
    },
  },
});
