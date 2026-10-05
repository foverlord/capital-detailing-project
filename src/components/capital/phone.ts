/** Kazakhstan phone mask: +7 (7XX) XXX-XX-XX. */

export const PHONE_PLACEHOLDER = "+7 (7XX) XXX-XX-XX";
export const PHONE_ERROR = "Введите номер полностью, например +7 700 123 45 67";

/** Up to 10 digits after the country code. Accepts typed, pasted and autofilled values. */
export function toLocalDigits(value: string): string {
  const digits = value.replace(/\D/g, "");
  // Pasted without a country code: "7001234567".
  if (!value.includes("+") && digits.length === 10) return digits;
  // "+7…" and "8…" carry a country/trunk prefix that is not part of the local number.
  if (digits.startsWith("7") || digits.startsWith("8")) return digits.slice(1, 11);
  return digits.slice(0, 10);
}

export function formatPhone(value: string): string {
  return formatLocal(toLocalDigits(value));
}

/** Formats digits that are already without the country code. */
function formatLocal(local: string): string {
  const area = local.slice(0, 3);
  const prefix = local.slice(3, 6);
  const line = local.slice(6, 8);
  const last = local.slice(8, 10);

  let result = "+7";
  if (area) result += ` (${area}`;
  if (area.length === 3) result += ")";
  if (prefix) result += ` ${prefix}`;
  if (line) result += `-${line}`;
  if (last) result += `-${last}`;
  return result;
}

/**
 * Next value for the input. The mask re-adds ")" and separators, so a plain backspace on
 * them would change nothing. In that case drop the last digit instead.
 */
export function nextPhoneValue(previous: string, typed: string): string {
  // Exactly one character gone and no digit lost: the user hit backspace on a mask character.
  const removedOnlyMask =
    typed.length === previous.length - 1 && toLocalDigits(typed) === toLocalDigits(previous);
  if (removedOnlyMask) return formatLocal(toLocalDigits(previous).slice(0, -1));
  return formatPhone(typed);
}

export function isCompletePhone(value: string): boolean {
  return toLocalDigits(value).length === 10;
}

/** "+77001234567" for the lead payload. */
export function normalizePhone(value: string): string {
  return `+7${toLocalDigits(value)}`;
}
