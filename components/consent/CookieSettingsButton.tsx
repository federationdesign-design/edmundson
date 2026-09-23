"use client";

import { useConsent } from "./ConsentProvider";

export function CookieSettingsButton({ className }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" className={className} onClick={reopen}>
      Cookie settings
    </button>
  );
}
