import { Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FadeIn } from "./FadeIn";
import { bodyClasses, leadPackages, saveLead, type BodyClassId, type LeadPackageId } from "./site";

type FormErrors = {
  bodyClass?: string;
  packageId?: string;
  phone?: string;
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const withoutCountry =
    digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  const local = withoutCountry.slice(0, 10);
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

function clearError(current: FormErrors, key: keyof FormErrors): FormErrors {
  const next = { ...current };
  delete next[key];
  return next;
}

function localDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  const withoutCountry =
    digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  return withoutCountry.slice(0, 10);
}

function isBodyClass(value: string): value is BodyClassId {
  return bodyClasses.some((item) => item.id === value);
}

function isPackage(value: string): value is LeadPackageId {
  return leadPackages.some((item) => item.id === value);
}

export function LeadForm() {
  const [bodyClass, setBodyClass] = useState<BodyClassId | "">("");
  const [packageId, setPackageId] = useState<LeadPackageId | "">("");
  const [phone, setPhone] = useState("+7");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!isBodyClass(bodyClass)) nextErrors.bodyClass = "Выберите класс кузова";
    if (!isPackage(packageId)) nextErrors.packageId = "Выберите услугу";
    if (localDigits(phone).length < 10) nextErrors.phone = "Введите телефон полностью";
    setErrors(nextErrors);
    if (nextErrors.bodyClass || nextErrors.packageId || nextErrors.phone) return;
    if (!isBodyClass(bodyClass) || !isPackage(packageId)) return;

    const payload = { bodyClass, packageId, phone };
    setStatus("submitting");
    void saveLead(payload).then(() => {
      setStatus("success");
    });
  };

  return (
    <section id="booking" className="scroll-mt-20 border-y border-zinc-800/80 bg-zinc-950">
      <FadeIn className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Заявка
          </p>
          <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-100 md:text-4xl">
            Онлайн расчёт
          </h2>
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">
            Это не калькулятор с фиксированной ценой. Оставьте класс кузова, пакет и телефон —
            перезвоним и назовём стоимость по вашему авто.
          </p>
          <p className="text-sm text-zinc-500">Студия на связи ежедневно, 10:00–20:00.</p>
        </div>

        {status === "success" ? (
          <div className="flex min-h-80 flex-col items-start justify-center gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8">
            <span className="grid size-12 place-items-center rounded-full border border-zinc-700 text-zinc-100">
              <Check />
            </span>
            <p className="max-w-sm text-lg font-medium leading-snug text-zinc-100">
              Заявка принята. Перезвоним и уточним стоимость и детали по авто.
            </p>
            <Button
              variant="glass"
              className="min-h-12"
              type="button"
              onClick={() => {
                setStatus("idle");
                setBodyClass("");
                setPackageId("");
                setPhone("+7");
                setErrors({});
              }}
            >
              Новая заявка
            </Button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            noValidate
            className="flex flex-col gap-6 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 backdrop-blur-md md:p-7"
          >
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-zinc-200">1. Класс кузова</legend>
              <ToggleGroup
                type="single"
                value={bodyClass}
                onValueChange={(value) => {
                  setBodyClass(isBodyClass(value) ? value : "");
                  setErrors((current) => clearError(current, "bodyClass"));
                }}
                variant="outline"
                aria-label="Класс кузова"
                aria-invalid={errors.bodyClass ? true : undefined}
                aria-describedby={errors.bodyClass ? "body-class-error" : undefined}
                className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3"
              >
                {bodyClasses.map((item) => (
                  <ToggleGroupItem
                    key={item.id}
                    value={item.id}
                    className="min-h-12 w-full px-3 text-sm"
                  >
                    {item.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {errors.bodyClass ? (
                <p id="body-class-error" className="text-sm text-destructive">
                  {errors.bodyClass}
                </p>
              ) : null}
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-zinc-200">2. Услуга / пакет</legend>
              <ToggleGroup
                type="single"
                value={packageId}
                onValueChange={(value) => {
                  setPackageId(isPackage(value) ? value : "");
                  setErrors((current) => clearError(current, "packageId"));
                }}
                variant="outline"
                aria-label="Услуга или пакет"
                aria-invalid={errors.packageId ? true : undefined}
                aria-describedby={errors.packageId ? "package-error" : undefined}
                className="grid w-full grid-cols-1 gap-2"
              >
                {leadPackages.map((item) => (
                  <ToggleGroupItem
                    key={item.id}
                    value={item.id}
                    className="min-h-12 w-full justify-start px-4 text-sm"
                  >
                    {item.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {errors.packageId ? (
                <p id="package-error" className="text-sm text-destructive">
                  {errors.packageId}
                </p>
              ) : null}
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="lead-phone" className="text-sm font-medium text-zinc-200">
                3. Телефон
              </label>
              <Input
                id="lead-phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                placeholder="+7 (___) ___-__-__"
                onChange={(event) => {
                  setPhone(formatPhone(event.target.value));
                  setErrors((current) => clearError(current, "phone"));
                }}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                className="h-12"
              />
              {errors.phone ? (
                <p id="lead-phone-error" className="text-sm text-destructive">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <Button
              variant="luxury"
              type="submit"
              className="min-h-12"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Отправляем…" : "Отправить заявку"}
            </Button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
