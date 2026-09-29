type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="flex max-w-2xl flex-col gap-3">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-100 md:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="max-w-xl text-sm leading-7 text-zinc-400 md:text-base">{copy}</p>
      ) : null}
    </div>
  );
}
