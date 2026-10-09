export const SITE_NAME = "Edmondson Lifting Ltd";
export const SITE_URL = "https://edmondsonlifting.co.uk";

export const PHONE_DISPLAY = "0161 637 0368";
export const PHONE_HREF = "tel:+441616370368";
export const EMAIL = "sales@edmondsonlifting.co.uk";
export const EMAIL_HREF = `mailto:${EMAIL}`;

// Trading address, which is also the registered office.
export const ADDRESS = {
  lines: ["Unit 2, Wharf Street", "Chadderton", "Oldham", "Lancashire", "OL9 7PF"],
  streetAddress: "Unit 2, Wharf Street, Chadderton",
  locality: "Oldham",
  region: "Lancashire",
  postalCode: "OL9 7PF",
  country: "GB",
} as const;

// PLACEHOLDER: a search including the company name, pending the exact
// Google Maps link from Steve (see PLACEHOLDERS.md).
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Edmondson Lifting Ltd, Unit 2, Wharf Street, Chadderton, Oldham, OL9 7PF",
)}`;

// Registered company details, shown in the footer.
export const COMPANY_NAME = "Edmondson Lifting Limited";
export const COMPANY_NUMBER = "08144417";
export const REGISTERED_OFFICE = [
  ADDRESS.streetAddress,
  ADDRESS.locality,
  ADDRESS.postalCode,
].join(", ");

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
