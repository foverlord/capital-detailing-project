import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "./site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#101115]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
        <a href="#top" className="flex min-w-0 items-center gap-2.5" onClick={close}>
          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-zinc-500/80 text-[10px] font-semibold tracking-wide text-zinc-100">
            CD
          </span>
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-100">
            CD Capital Detailing
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Главное меню">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm whitespace-nowrap text-zinc-300 transition-colors hover:text-white"
            >
              {link.compactLabel ? (
                <>
                  <span className="lg:hidden">{link.compactLabel}</span>
                  <span className="hidden lg:inline">{link.label}</span>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className="hidden min-h-10 items-center rounded-full bg-white px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 md:inline-flex"
        >
          Онлайн расчёт
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center text-zinc-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/[0.06] px-5 py-3 md:hidden"
          aria-label="Мобильное меню"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="flex min-h-12 items-center border-b border-white/[0.06] text-sm text-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={close}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-zinc-950"
            >
              Онлайн расчёт
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
