import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRef, useState, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BodyClassSwitcher } from "./BodyClassSwitcher";
import {
  PRICE_FOOTNOTE,
  formatRange,
  getService,
  rangeFor,
  type PricedService,
} from "./pricing";
import { useQuote } from "./quote-context";

type ServicePanelProps = {
  /** Open service, or null when closed. */
  serviceId: string | null;
  /** Short service description from the bento card (shown in the panel, not on the card). */
  serviceCopy?: string | undefined;
  onOpenChange: (open: boolean) => void;
  /** Card that opened the panel. Focus goes back to it on close. */
  returnFocusRef: RefObject<HTMLElement | null>;
};

/**
 * Detailed prices for one service. Bottom sheet on phones, side panel from md.
 * Esc, the close button and a click outside all close it (Radix Dialog).
 */
export function ServicePanel({
  serviceId,
  serviceCopy,
  onOpenChange,
  returnFocusRef,
}: ServicePanelProps) {
  // Keep the last service so the content doesn't vanish during the exit animation.
  const lastServiceId = useRef<string | null>(serviceId);
  if (serviceId) lastServiceId.current = serviceId;
  const service = lastServiceId.current ? getService(lastServiceId.current) : null;

  const lastCopy = useRef<string | undefined>(undefined);
  if (serviceCopy) lastCopy.current = serviceCopy;
  const panelCopy = serviceCopy ?? lastCopy.current;

  // Set when the user leaves through "Получить точный расчёт": focus then goes to the form.
  const goToForm = useRef(false);

  return (
    <Dialog.Root open={serviceId !== null} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (goToForm.current) {
              goToForm.current = false;
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
              document.getElementById("lead-phone")?.focus({ preventScroll: true });
              return;
            }
            returnFocusRef.current?.focus();
          }}
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col rounded-t-[20px] border border-white/8 bg-[#111115] text-zinc-100 shadow-2xl duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[480px] md:rounded-l-[20px] md:rounded-tr-none md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-bottom-0 md:data-[state=open]:slide-in-from-right"
        >
          {service ? (
            <PanelBody
              key={service.id}
              service={service}
              copy={panelCopy}
              onChooseQuote={() => {
                goToForm.current = true;
                onOpenChange(false);
              }}
            />
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PanelBody({
  service,
  copy,
  onChooseQuote,
}: {
  service: PricedService;
  copy?: string | undefined;
  onChooseQuote: () => void;
}) {
  const { bodyClass, chooseQuote } = useQuote();
  const [variantId, setVariantId] = useState<string>(service.variants[0].id);

  return (
    <>
      <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 pb-4 md:px-6 md:pt-6">
        <div className="flex min-w-0 flex-col gap-1.5">
          <Dialog.Title className="font-display text-xl leading-snug font-medium tracking-tight text-balance text-zinc-100">
            {service.title}
          </Dialog.Title>
          <Dialog.Description className="m-0 flex flex-col gap-2.5">
            {copy ? (
              <span className="text-[14px] leading-snug font-medium text-[#d8c39a] text-pretty">
                {copy}
              </span>
            ) : null}
            <span className="text-[13px] leading-relaxed text-zinc-500">
              Ориентировочные цены для выбранного класса автомобиля
            </span>
          </Dialog.Description>
        </div>
        <Dialog.Close className="grid size-11 shrink-0 place-items-center rounded-full border border-white/8 text-zinc-100 transition-colors hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c39a]">
          <X className="size-4" aria-hidden />
          <span className="sr-only">Закрыть</span>
        </Dialog.Close>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-5 pb-4 md:px-6">
        <BodyClassSwitcher idPrefix="panel-class" />

        <ToggleGroup
          type="single"
          value={variantId}
          onValueChange={(value) => {
            if (value) setVariantId(value);
          }}
          variant="outline"
          aria-label="Вариант работ"
          className="flex w-full flex-col items-stretch gap-2"
        >
          {service.variants.map((variant) => (
            <ToggleGroupItem
              key={variant.id}
              value={variant.id}
              className="h-auto min-h-14 w-full items-start justify-between gap-4 rounded-xl border-white/8 bg-white/[0.02] px-4 py-3 text-left font-normal shadow-none hover:bg-white/5 hover:text-zinc-100 data-[state=on]:border-[#d8c39a]/50 data-[state=on]:bg-[#d8c39a]/10 data-[state=on]:text-zinc-100"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[15px] leading-snug font-medium text-zinc-100">
                  {variant.name}
                </span>
                {variant.note ? (
                  <span className="text-xs leading-snug text-zinc-400">{variant.note}</span>
                ) : null}
              </span>
              <span className="max-w-[9.5rem] shrink-0 text-right text-[15px] leading-snug font-semibold text-[#d8c39a] tabular-nums md:max-w-none">
                {formatRange(rangeFor(variant, bodyClass))}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <p className="m-0 text-xs leading-relaxed text-zinc-500">{PRICE_FOOTNOTE}</p>
      </div>

      <div className="shrink-0 border-t border-white/8 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
        <Button
          variant="luxury"
          type="button"
          className="min-h-12 w-full rounded-full"
          onClick={() => {
            chooseQuote(service.id, variantId);
            onChooseQuote();
          }}
        >
          Получить точный расчёт
        </Button>
      </div>
    </>
  );
}
