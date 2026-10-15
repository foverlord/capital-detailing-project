import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./FadeIn";
import { Accent } from "./SectionHeading";
import { getGisWidgetEmbedUrl, studio } from "./site";

/** Empty when the file is not in the repo yet, so the build still succeeds. */
const mapAstanaModules = import.meta.glob("../../assets/map-astana.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const mapAstanaSrc = Object.values(mapAstanaModules)[0];

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
            className="hidden min-h-[320px] w-full flex-1 border-0 bg-[#101115] md:block"
            loading="lazy"
          />
          <a
            href={studio.gisFirmUrl}
            target="_blank"
            rel="noopener"
            aria-label="Открыть Capital Detailing в 2ГИС"
            className="relative min-h-[320px] w-full flex-1 overflow-hidden bg-[#1a1b20] md:hidden"
          >
            {mapAstanaSrc ? (
              <img
                src={mapAstanaSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <span className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <span className="relative flex h-full min-h-[320px] flex-col items-center justify-center gap-2 px-4 text-center">
              <MapPin className="size-8 text-zinc-100" aria-hidden="true" />
              <span className="text-base font-semibold text-zinc-100">
                {studio.addressLines[0]}
              </span>
              <span className="mt-3 inline-flex min-h-10 items-center rounded-md border border-white/20 bg-white/10 px-4 text-sm font-medium text-zinc-100">
                Посмотреть на карте Астаны
              </span>
            </span>
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
