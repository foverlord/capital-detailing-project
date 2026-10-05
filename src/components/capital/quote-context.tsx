import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_BODY_CLASS,
  getService,
  isBodyClassId,
  services,
  type BodyClassId,
} from "./pricing";

const STORAGE_KEY = "cd-body-class";

type QuoteContextValue = {
  bodyClass: BodyClassId;
  setBodyClass: (value: BodyClassId) => void;
  serviceId: string;
  variantId: string;
  setService: (serviceId: string) => void;
  setVariant: (variantId: string) => void;
  /** Used by the service panel: fill the quote form and let the caller scroll to it. */
  chooseQuote: (serviceId: string, variantId: string) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function readStoredClass(): BodyClassId | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isBodyClassId(value) ? value : null;
  } catch {
    return null;
  }
}

function storeClass(value: BodyClassId) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be blocked (private mode, policies). The choice just won't persist.
  }
}

/** Shared body class and quote selection for the services block and the quote form. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [bodyClass, setBodyClassState] = useState<BodyClassId>(DEFAULT_BODY_CLASS);
  const [serviceId, setServiceId] = useState<string>(services[0].id);
  const [variantId, setVariantId] = useState<string>(services[0].variants[0].id);

  // Read the saved class after hydration so server and client markup match.
  useEffect(() => {
    const stored = readStoredClass();
    if (stored) setBodyClassState(stored);
  }, []);

  const setBodyClass = useCallback((value: BodyClassId) => {
    setBodyClassState(value);
    storeClass(value);
  }, []);

  const setService = useCallback((nextServiceId: string) => {
    const service = getService(nextServiceId);
    setServiceId(service.id);
    setVariantId(service.variants[0].id);
  }, []);

  const chooseQuote = useCallback((nextServiceId: string, nextVariantId: string) => {
    const service = getService(nextServiceId);
    const variant = service.variants.find((item) => item.id === nextVariantId);
    setServiceId(service.id);
    setVariantId((variant ?? service.variants[0]).id);
  }, []);

  const value = useMemo<QuoteContextValue>(
    () => ({
      bodyClass,
      setBodyClass,
      serviceId,
      variantId,
      setService,
      setVariant: setVariantId,
      chooseQuote,
    }),
    [bodyClass, setBodyClass, serviceId, variantId, setService, chooseQuote],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside QuoteProvider");
  return context;
}
