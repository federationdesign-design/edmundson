"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { readConsent, writeConsent, type Consent } from "./consent";

type ConsentContextValue = {
  /** False until the cookie has been read on the client. */
  ready: boolean;
  consent: Consent | null;
  /** True when the user has reopened the panel from the footer. */
  reopened: boolean;
  save: (analytics: boolean) => void;
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [reopened, setReopened] = useState(false);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Reading document.cookie must wait until after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  const save = useCallback((analytics: boolean) => {
    setConsent(writeConsent(analytics));
    setReopened(false);
    // Hand focus back to the control that reopened the panel.
    const target = returnFocusTo.current;
    returnFocusTo.current = null;
    if (target) requestAnimationFrame(() => target.focus());
  }, []);

  const reopen = useCallback(() => {
    returnFocusTo.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setReopened(true);
  }, []);

  const value = useMemo(
    () => ({ ready, consent, reopened, save, reopen }),
    [ready, consent, reopened, save, reopen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside ConsentProvider");
  return ctx;
}
