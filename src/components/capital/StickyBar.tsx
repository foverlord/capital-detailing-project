import { Button } from "@/components/ui/button";
import { studio } from "./site";

export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800/80 bg-zinc-950/85 backdrop-blur-lg md:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button variant="glass" asChild className="min-h-12">
          <a href={studio.phoneWhatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Button>
        <Button variant="luxury" asChild className="min-h-12">
          <a href={studio.phoneTelHref}>Позвонить</a>
        </Button>
      </div>
    </div>
  );
}
