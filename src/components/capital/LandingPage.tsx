import { Booking } from "./Booking";
import { Contacts, Process, Services, Works } from "./ContentSections";
import { Header, Hero } from "./HeaderHero";

export function LandingPage() {
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground"><Header /><main><Hero /><Services /><Works /><Process /><Booking /><Contacts /></main><footer className="border-t border-border px-5 py-7"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-[11px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© Capital Detailing Astana</p><p>Digital experience by Amir</p></div></footer></div>;
}