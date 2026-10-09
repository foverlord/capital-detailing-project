import { useEffect } from "react";

/** Avoid iOS/WebView scroll restore glitches and bfcache offset at scrollY=0. */
export function MobileScrollFix() {
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => {
      history.scrollRestoration = previous;
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
