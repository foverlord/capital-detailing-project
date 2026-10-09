import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./FadeIn";
import { Accent } from "./SectionHeading";
import { getGisWidgetEmbedUrl, studio } from "./site";

export function Contacts() {
  return (
    <section id="contacts" className="border-t border-zinc-800/80">
      <FadeIn className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
              Контакты
            </p>
            <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-100 md:text-4xl">
              Студия в <Accent>Астане</Accent>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Адрес</p>
              <p className="text-lg font-medium text-zinc-100">
                {studio.city}, {studio.addressLines[0]}
                <span className="mt-1 block text-base font-normal text-zinc-400">
                  {studio.addressLines[1]}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Режим</p>
              <p className="text-lg font-medium text-zinc-100">{studio.hours}</p>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                Телефон · WhatsApp
              </p>
              <a href={studio.phoneTelHref} className="text-lg font-medium text-zinc-100">
                {studio.phoneDisplay}
              </a>
              <a
                href={studio.phoneWhatsappHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="luxury" asChild className="min-h-12">
              <a href={studio.gisFirmUrl} target="_blank" rel="noreferrer">
                Открыть в 2ГИС
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
            <Button variant="glass" asChild className="min-h-12">
              <a href={studio.gisRouteUrl} target="_blank" rel="noreferrer">
                Построить маршрут
              </a>
            </Button>
          </div>
        </div>
        <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
          <div className="flex flex-col gap-1 border-b border-zinc-800/80 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">2ГИС</p>
            <p className="text-base font-semibold tracking-tight text-zinc-100">
              {studio.addressLines[0]}
            </p>
          </div>
          <iframe
            title="Capital Detailing на карте 2ГИС"
            src={getGisWidgetEmbedUrl()}
            className="min-h-[320px] w-full flex-1 border-0 bg-[#101115]"
            loading="lazy"
          />
        </div>
      </FadeIn>
    </section>
  );
}
