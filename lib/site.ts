export const SITE_NAME = "Edmondson Lifting Ltd";
export const SITE_URL = "https://edmondsonlifting.co.uk";

export const PHONE_DISPLAY = "0161 6370368";
export const PHONE_HREF = "tel:+441616370368";
export const EMAIL = "sales@edmondsonlifting.co.uk";
export const EMAIL_HREF = `mailto:${EMAIL}`;

// PLACEHOLDER: see PLACEHOLDERS.md. Replace once supplied by the client.
export const COMPANY_NUMBER = "[COMPANY NUMBER]";
export const REGISTERED_OFFICE = "[REGISTERED OFFICE ADDRESS]";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/cookies", label: "Cookies" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const ROUTES = [
  "/",
  "/services",
  "/our-work",
  "/contact",
  "/cookies",
  "/privacy",
  "/terms",
] as const;
