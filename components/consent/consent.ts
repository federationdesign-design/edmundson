export const CONSENT_COOKIE = "el_consent";
const CONSENT_VERSION = 1;
const TWELVE_MONTHS_SECONDS = 60 * 60 * 24 * 365;

export type Consent = {
  v: number;
  necessary: true;
  analytics: boolean;
  timestamp: string;
};

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)),
    ) as Partial<Consent>;
    if (parsed.v !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") {
      return null;
    }
    return {
      v: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      timestamp: String(parsed.timestamp ?? ""),
    };
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): Consent {
  const consent: Consent = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}` +
    `; Max-Age=${TWELVE_MONTHS_SECONDS}; Path=/; SameSite=Lax${secure}`;
  return consent;
}

// GA4 sets _ga and _ga_<container> on the registrable domain, so expire them
// on every parent domain of the current host as well as host-only.
export function clearAnalyticsCookies() {
  const names = document.cookie
    .split("; ")
    .map((part) => part.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  if (names.length === 0) return;

  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) {
    domains.push(`; Domain=.${labels.slice(i).join(".")}`);
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
    }
  }
}
