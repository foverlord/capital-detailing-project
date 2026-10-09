import { useEffect, useRef, useState } from "react";
import { getGisWidgetLoaderConfig } from "./site";

declare global {
  interface Window {
    DGWidgetLoader?: new (config: ReturnType<typeof getGisWidgetLoaderConfig>) => void;
  }
}

const LOADER_SRC = "https://widgets.2gis.com/js/DGWidgetLoader.js";
const MAP_HEIGHT = 320;

export function GisMapEmbed() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(320, Math.round(entry.contentRect.width)));
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    host.replaceChildren();

    const mountWidget = () => {
      if (cancelled || !hostRef.current) return;
      hostRef.current.replaceChildren();
      const init = document.createElement("script");
      init.charset = "UTF-8";
      init.text = `new DGWidgetLoader(${JSON.stringify(getGisWidgetLoaderConfig(width, MAP_HEIGHT))});`;
      hostRef.current.appendChild(init);
    };

    const existing = document.querySelector(`script[src="${LOADER_SRC}"]`);
    if (window.DGWidgetLoader) {
      mountWidget();
      return () => {
        cancelled = true;
        host.replaceChildren();
      };
    }

    const loader = existing ?? document.createElement("script");
    if (!existing) {
      loader.src = LOADER_SRC;
      loader.charset = "UTF-8";
      loader.async = true;
      document.head.appendChild(loader);
    }

    const onReady = () => {
      if (!cancelled) mountWidget();
    };

    loader.addEventListener("load", onReady);
    if (window.DGWidgetLoader) onReady();

    return () => {
      cancelled = true;
      loader.removeEventListener("load", onReady);
      host.replaceChildren();
    };
  }, [width]);

  return (
    <div
      ref={hostRef}
      className="min-h-[320px] w-full flex-1 bg-[#101115]"
      aria-label="Карта 2ГИС — Capital Detailing"
    />
  );
}
