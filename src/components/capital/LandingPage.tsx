import { MotionConfig } from "framer-motion";
import { Contacts } from "./Contacts";
import { FaqSection } from "./FaqSection";
import { Hero } from "./Hero";
import { LeadForm } from "./LeadForm";
import { Navbar } from "./Navbar";
import { Portfolio } from "./Portfolio";
import { QuoteProvider } from "./quote-context";
import { ServicesBento } from "./ServicesBento";
import { Standards } from "./Standards";
import { StickyBar } from "./StickyBar";

export function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>
        <div className="min-h-screen bg-zinc-950 pb-28 text-zinc-100 md:pb-0">
          <Navbar />
          <main className="pt-[calc(4rem+env(safe-area-inset-top,0px))] md:pt-0">
            <Hero />
            <LeadForm />
            <ServicesBento />
            <Portfolio />
            <Standards />
            <FaqSection />
            <Contacts />
          </main>
          <footer className="border-t border-zinc-800/80 px-4 py-8 md:px-6">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© Capital Detailing Astana</p>
              <p>Digital experience by Amir</p>
            </div>
          </footer>
          <StickyBar />
        </div>
      </QuoteProvider>
    </MotionConfig>
  );
}
