import { Check, Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BodyClassSwitcher } from "./BodyClassSwitcher";
import { FadeIn } from "./FadeIn";
import {
  PRICE_FOOTNOTE,
  formatRange,
  getBodyClass,
  getService,
  getVariant,
  isServiceId,
  rangeFor,
  services,
} from "./pricing";
import {
  PHONE_ERROR,
  PHONE_PLACEHOLDER,
  isCompletePhone,
  nextPhoneValue,
  normalizePhone,
} from "./phone";
import { useQuote } from "./quote-context";
import { Accent } from "./SectionHeading";
import { saveLead, studio } from "./site";

type Status = "idle" | "submitting" | "success" | "error";

/** Estimate for the current selection. Rendered twice: left column (lg+) and above the button. */
function EstimateBlock() {
  const { bodyClass, serviceId, variantId } = useQuote();
  const service = getService(serviceId);
  const variant = getVariant(service, variantId);
  const range = formatRange(rangeFor(variant, bodyClass));

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#d8c39a]/25 bg-zinc-900/40 p-5 backdrop-blur-md">
      <p className="m-0 text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">
        Оценка по вашему выбору
      </p>
      <p className="m-0 text-sm leading-snug text-zinc-400">
        {service.title} · {variant.name} · {getBodyClass(bodyClass).fullLabel}
      </p>
      <p
        className="m-0 font-display text-zinc-100 tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="block font-sans text-sm font-normal text-zinc-400">Ориентировочно</span>{" "}
        <span className="block text-2xl leading-tight font-semibold text-[#d8c39a] sm:text-[1.75rem]">
          {range}
        </span>
      </p>
      <p className="m-0 text-xs leading-relaxed text-zinc-500">{PRICE_FOOTNOTE}</p>
    </div>
  );
}

export function LeadForm() {
  const { bodyClass, serviceId, variantId, setService, setVariant } = useQuote();
  const service = getService(serviceId);
  const variant = getVariant(service, variantId);
  const hasVariants = service.variants.length > 1;

  const [carModel, setCarModel] = useState("");
  const [carModelError, setCarModelError] = useState(false);
  const [phone, setPhone] = useState("+7");
  const [phoneError, setPhoneError] = useState(false);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  // State updates are async; the ref stops a fast second click from sending a duplicate.
  const sending = useRef(false);

  const whatsappMessage = `Здравствуйте! Интересует: ${service.title} — ${variant.name}, ${
    getBodyClass(bodyClass).fullLabel
  }. Ориентир на сайте: ${formatRange(rangeFor(variant, bodyClass))}.`;
  const whatsappHref = `${studio.phoneWhatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;

    const model = carModel.trim();
    const modelOk = model.length >= 2 && model.length <= 80;
    const phoneOk = isCompletePhone(phone);
    setCarModelError(!modelOk);
    setPhoneError(!phoneOk);
    if (!modelOk) {
      document.getElementById("lead-car-model")?.focus();
      return;
    }
    if (!phoneOk) {
      document.getElementById("lead-phone")?.focus();
      return;
    }

    // Hidden trap field is filled only by bots: look successful, send nothing.
    if (trap.trim() !== "") {
      setStatus("success");
      return;
    }

    sending.current = true;
    setStatus("submitting");
    saveLead({
      bodyClass,
      serviceId: service.id,
      variantId: variant.id,
      carModel: model,
      phone: normalizePhone(phone),
      hp: trap,
    })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
      .finally(() => {
        sending.current = false;
      });
  };

  const submitting = status === "submitting";
  const modelStep = hasVariants ? 4 : 3;
  const phoneStep = modelStep + 1;

  return (
    <section id="booking" className="border-y border-zinc-800/80 bg-zinc-950">
      <FadeIn className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="flex flex-col gap-4 lg:self-stretch">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Заявка
          </p>
          <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-100 md:text-4xl">
            Онлайн <Accent>расчёт</Accent>
          </h2>
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">
            Выберите класс авто и услугу, мы покажем ориентировочную стоимость. Точную цену назовём
            после осмотра и зафиксируем в договоре.
          </p>
          <p className="text-sm text-zinc-500">Студия на связи ежедневно, 10:00–20:00.</p>
          <div className="hidden max-w-md lg:sticky lg:top-24 lg:mt-4 lg:block">
            <EstimateBlock />
          </div>
        </div>

        {status === "success" ? (
          <div
            role="status"
            className="flex min-h-80 flex-col items-start justify-center gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md md:p-8"
          >
            <span className="grid size-12 place-items-center rounded-full border border-zinc-700 text-zinc-100">
              <Check />
            </span>
            <p className="max-w-sm text-lg font-medium leading-snug text-zinc-100">
              Спасибо! Перезвоним в течение 20 минут
            </p>
            <Button
              variant="glass"
              className="min-h-12"
              type="button"
              onClick={() => {
                setStatus("idle");
                setCarModel("");
                setCarModelError(false);
                setPhone("+7");
                setPhoneError(false);
                setTrap("");
              }}
            >
              Новая заявка
            </Button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            noValidate
            className="relative flex flex-col gap-6 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 backdrop-blur-md md:p-7"
          >
            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-zinc-200">1. Класс кузова</legend>
              <BodyClassSwitcher idPrefix="lead-class" />
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-medium text-zinc-200">2. Услуга / пакет</legend>
              <ToggleGroup
                type="single"
                value={serviceId}
                onValueChange={(value) => {
                  if (isServiceId(value)) setService(value);
                }}
                variant="outline"
                aria-label="Услуга или пакет"
                className="grid w-full grid-cols-1 gap-2"
              >
                {services.map((item) => (
                  <ToggleGroupItem
                    key={item.id}
                    value={item.id}
                    className="min-h-12 w-full justify-start px-4 text-left text-sm"
                  >
                    {item.title}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </fieldset>

            {hasVariants ? (
              <fieldset className="flex flex-col gap-3">
                <legend className="text-sm font-medium text-zinc-200">3. Вариант работ</legend>
                <ToggleGroup
                  type="single"
                  value={variant.id}
                  onValueChange={(value) => {
                    if (value) setVariant(value);
                  }}
                  variant="outline"
                  aria-label="Вариант работ"
                  className="flex w-full flex-wrap justify-start gap-2"
                >
                  {service.variants.map((item) => (
                    <ToggleGroupItem
                      key={item.id}
                      value={item.id}
                      className="h-auto min-h-11 max-w-full px-3 py-2 text-left text-[13px] leading-snug sm:text-sm"
                    >
                      {item.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </fieldset>
            ) : null}

            <div className="flex flex-col gap-2">
              <label htmlFor="lead-car-model" className="text-sm font-medium text-zinc-200">
                {modelStep}. Марка и модель
              </label>
              <Input
                id="lead-car-model"
                name="carModel"
                type="text"
                autoComplete="off"
                required
                maxLength={80}
                value={carModel}
                placeholder="Например, Toyota Camry"
                disabled={submitting}
                onChange={(event) => {
                  setCarModel(event.target.value);
                  setCarModelError(false);
                }}
                aria-invalid={carModelError ? true : undefined}
                aria-describedby={carModelError ? "lead-car-model-error" : undefined}
                className="h-12"
              />
              {carModelError ? (
                <p id="lead-car-model-error" className="m-0 text-sm text-destructive">
                  Укажите марку и модель, например Toyota Camry
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lead-phone" className="text-sm font-medium text-zinc-200">
                {phoneStep}. Телефон
              </label>
              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                placeholder={PHONE_PLACEHOLDER}
                disabled={submitting}
                onChange={(event) => {
                  setPhone((previous) => nextPhoneValue(previous, event.target.value));
                  setPhoneError(false);
                }}
                aria-invalid={phoneError ? true : undefined}
                aria-describedby={phoneError ? "lead-phone-error" : undefined}
                className="h-12"
              />
              {phoneError ? (
                <p id="lead-phone-error" className="m-0 text-sm text-destructive">
                  {PHONE_ERROR}
                </p>
              ) : null}
            </div>

            {/* Spam trap: invisible to people, tempting to bots. */}
            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label>
                Оставьте это поле пустым
                <input
                  type="text"
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(event) => setTrap(event.target.value)}
                />
              </label>
            </div>

            <div className="lg:hidden">
              <EstimateBlock />
            </div>

            {status === "error" ? (
              <p role="alert" className="m-0 text-sm leading-relaxed text-destructive">
                Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в{" "}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  WhatsApp
                </a>
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="luxury"
                type="submit"
                className="min-h-12 sm:flex-1"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden />
                    Отправляем…
                  </>
                ) : (
                  "Получить точный расчёт"
                )}
              </Button>
              <Button variant="glass" asChild className="min-h-12">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Написать в WhatsApp
                </a>
              </Button>
            </div>
            {/*
              TODO(owner): consent line for personal data processing goes here.
              There is no privacy policy on the site yet, so no legal text is added.
            */}
          </form>
        )}
      </FadeIn>
    </section>
  );
}
