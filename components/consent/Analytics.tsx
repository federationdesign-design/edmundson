"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { clearAnalyticsCookies } from "./consent";
import { useConsent } from "./ConsentProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

// Sets up the gtag queue with Consent Mode v2 defaults, all denied. Runs once,
// before gtag.js is requested, so the defaults are always first in the queue.
function ensureGtag(): Gtag {
  if (window.gtag) return window.gtag;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "denied",
  });
  return window.gtag;
}

export function Analytics() {
  const { consent } = useConsent();
  const granted = consent?.analytics === true;
  const hasChoice = consent !== null;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    if (granted) {
      const gtag = ensureGtag();
      window[`ga-disable-${GA_ID}`] = false;
      gtag("consent", "update", { analytics_storage: "granted" });
      gtag("js", new Date());
      gtag("config", GA_ID);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoad(true);
    } else if (window.gtag) {
      // Consent withdrawn after GA had loaded: stop immediately.
      window.gtag("consent", "update", { analytics_storage: "denied" });
      window[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
    } else if (hasChoice) {
      clearAnalyticsCookies();
    }
  }, [granted, hasChoice]);

  if (!GA_ID || !load) return null;

  return (
    <Script
      id="ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
      strategy="afterInteractive"
    />
  );
}
