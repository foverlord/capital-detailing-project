import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./FadeIn";
import { Accent } from "./SectionHeading";
import { studio } from "./site";

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
              <p className="text-lg font-medium text-zinc-100">{studio.phoneDisplay}</p>
              {studio.phoneIsPlaceholder ? (
                <p className="text-sm text-zinc-500">
                  Номер на сайте временный — заменим на рабочий, как только он будет в карточке
                  студии.
                </p>
              ) : null}
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
        <div className="flex min-h-72 flex-col justify-end gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">2ГИС</p>
          <p className="text-2xl font-semibold tracking-tight text-zinc-100">Бухар жырау, 36н</p>
          <p className="max-w-xs text-sm leading-6 text-zinc-400">
            Карточка студии и маршрут открываются в 2ГИС. Координаты филиала уже стоят в кнопках.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
