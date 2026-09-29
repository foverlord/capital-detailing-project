import { processImages } from "./assets";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

const points = [
  {
    title: "Чистая камера с климат-контролем",
    copy: "Плёнку и шумоизоляцию делаем в чистой студии, без уличной пыли на кромках.",
  },
  {
    title: "Точные лекала & заворот краёв",
    copy: "Крой по модели автомобиля. Края закрываем, а не оставляем на самом видном месте.",
  },
  {
    title: "Официальный договор / гарантия 5 лет",
    copy: "Работы фиксируем договором. Гарантия на выполненные работы — 5 лет.",
  },
  {
    title: "Ежедневный фото/видео отчёт",
    copy: "По ходу работ присылаем фото и короткое видео, чтобы процесс был виден без визита в цех.",
  },
] as const;

export function Standards() {
  return (
    <section id="standards" className="scroll-mt-20 border-t border-zinc-800/80">
      <FadeIn className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Студия"
          title="Как принимаем автомобиль"
          copy="Четыре правила, по которым идёт каждая машина в Астане."
        />
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="flex flex-col gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
            >
              <span className="font-mono text-xs text-zinc-500">0{index + 1}</span>
              <h3 className="text-lg font-semibold leading-snug text-zinc-100">{point.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{point.copy}</p>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {processImages.map((image) => (
            <figure
              key={image.alt}
              className="overflow-hidden rounded-xl border border-zinc-800/80"
            >
              <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full object-cover" />
              <figcaption className="border-t border-zinc-800/80 px-4 py-3 text-xs uppercase tracking-[0.14em] text-zinc-400">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
