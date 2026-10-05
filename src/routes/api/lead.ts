import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  formatRange,
  getBodyClass,
  getService,
  isBodyClassId,
  isServiceId,
  rangeFor,
} from "@/components/capital/pricing";

const leadSchema = z.object({
  bodyClass: z.string().refine(isBodyClassId),
  serviceId: z.string().refine(isServiceId),
  variantId: z.string().min(1).max(60),
  phone: z.string().regex(/^\+7\d{10}$/),
});

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function formatDisplayPhone(phone: string) {
  const d = phone.slice(2);
  return `+7 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}

/**
 * Receives a lead from the quote form and forwards it to Telegram.
 * Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the server environment (never in code).
 * Without them the endpoint answers 503, so the form shows an error instead of faking success.
 */
export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env["TELEGRAM_BOT_TOKEN"];
        const chatId = process.env["TELEGRAM_CHAT_ID"];
        if (!token || !chatId) {
          console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured");
          return json({ ok: false, error: "not_configured" }, 503);
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "bad_json" }, 400);
        }

        const parsed = leadSchema.safeParse(payload);
        if (!parsed.success) return json({ ok: false, error: "invalid" }, 400);

        const { bodyClass, serviceId, variantId, phone } = parsed.data;
        if (!isBodyClassId(bodyClass)) return json({ ok: false, error: "invalid" }, 400);

        const service = getService(serviceId);
        const variant = service.variants.find((item) => item.id === variantId);
        if (!variant) return json({ ok: false, error: "invalid" }, 400);

        const text = [
          "Новая заявка с сайта Capital Detailing",
          `Телефон: ${formatDisplayPhone(phone)}`,
          `Класс авто: ${getBodyClass(bodyClass).fullLabel}`,
          `Услуга: ${service.title}`,
          `Вариант: ${variant.name}`,
          `Ориентир на сайте: ${formatRange(rangeFor(variant, bodyClass))}`,
        ].join("\n");

        try {
          const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
            signal: AbortSignal.timeout(10_000),
          });
          if (!response.ok) {
            console.error(`[lead] Telegram answered ${response.status}`);
            return json({ ok: false, error: "delivery_failed" }, 502);
          }
        } catch (error) {
          console.error("[lead] Telegram request failed", error);
          return json({ ok: false, error: "delivery_failed" }, 502);
        }

        return json({ ok: true }, 200);
      },
    },
  },
});
