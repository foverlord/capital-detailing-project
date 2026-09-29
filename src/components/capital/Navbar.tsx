import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "./site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="#top"
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-xs sm:tracking-[0.18em]"
          onClick={close}
        >
          CD Capital Detailing
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Главное меню">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="luxury" asChild className="min-h-11 px-5">
            <a href="#booking">Онлайн расчёт</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-11 text-zinc-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-800/80 px-4 py-3 md:hidden"
          aria-label="Мобильное меню"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="flex min-h-12 items-center border-b border-zinc-800/80 text-sm text-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <Button variant="luxury" asChild className="mt-4 min-h-12">
              <a href="#booking" onClick={close}>
                Онлайн расчёт
              </a>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
