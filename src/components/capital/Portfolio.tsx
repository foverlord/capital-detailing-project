import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { galleryImages, type GalleryWork } from "./assets";
import { FadeIn } from "./FadeIn";
import { Accent, SectionHeading } from "./SectionHeading";

export function Portfolio() {
  const [active, setActive] = useState<GalleryWork | null>(null);

  return (
    <section id="works" className="border-t border-zinc-800/80">
      <FadeIn className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Работы"
          title={
            <>
              Автомобили из <Accent>студии</Accent>
            </>
          }
        />
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((work) => (
            <li key={work.title}>
              <button
                type="button"
                onClick={() => setActive(work)}
                aria-label={`Открыть фото: ${work.title}`}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-left transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
              >
                <span className="block overflow-hidden">
                  <img
                    src={work.src}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex flex-col gap-3 p-4">
                  <span className="text-base font-semibold text-zinc-100">{work.title}</span>
                  <span className="text-sm text-zinc-400">{work.detail}</span>
                  {work.tags.length > 0 ? (
                    <span className="flex flex-wrap gap-1.5">
                      {work.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </FadeIn>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="max-w-5xl gap-3 p-3 sm:max-w-5xl sm:p-4">
          <DialogHeader className="pr-8">
            <DialogTitle>{active ? active.title : "Работа"}</DialogTitle>
            <DialogDescription>{active ? active.detail : "Фото из студии"}</DialogDescription>
          </DialogHeader>
          {active ? (
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[72vh] w-full rounded-md object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
