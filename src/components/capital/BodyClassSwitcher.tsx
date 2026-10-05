import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { bodyClasses, getBodyClass, isBodyClassId } from "./pricing";
import { useQuote } from "./quote-context";

type BodyClassSwitcherProps = {
  className?: string;
  /** Used to tie the hint text to the group. Must be unique per instance on the page. */
  idPrefix: string;
};

/** One switcher for three body classes. State is shared across the whole page. */
export function BodyClassSwitcher({ className, idPrefix }: BodyClassSwitcherProps) {
  const { bodyClass, setBodyClass } = useQuote();
  const hintId = `${idPrefix}-hint`;

  return (
    <div className={cn("flex w-full max-w-md flex-col gap-2", className)}>
      <ToggleGroup
        type="single"
        value={bodyClass}
        onValueChange={(value) => {
          // Radix sends "" when the active item is pressed again. A class is always selected.
          if (isBodyClassId(value)) setBodyClass(value);
        }}
        variant="outline"
        aria-label="Класс автомобиля"
        aria-describedby={hintId}
        className="grid w-full grid-cols-3 gap-2"
      >
        {bodyClasses.map((item) => (
          <ToggleGroupItem
            key={item.id}
            value={item.id}
            className="min-h-11 w-full min-w-0 px-1.5 text-[13px] sm:px-3 sm:text-sm"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p id={hintId} className="m-0 text-xs text-zinc-400" aria-live="polite">
        {getBodyClass(bodyClass).fullLabel}
      </p>
    </div>
  );
}
