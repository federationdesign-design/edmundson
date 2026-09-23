import { SERVICE_TITLES } from "./services";

// Contact form fields, limits and validation. Shared by the form (limits and
// initial state) and the server action (the validation that counts).

export const ENQUIRY_FIELDS = [
  "name",
  "company",
  "email",
  "telephone",
  "service",
  "message",
] as const;
export type EnquiryField = (typeof ENQUIRY_FIELDS)[number];
export type EnquiryValues = Record<EnquiryField, string>;

export const MESSAGE_MAX = 2000;
export const MAX_LENGTH: Record<EnquiryField, number> = {
  name: 100,
  company: 100,
  email: 254,
  telephone: 30,
  service: 100,
  message: MESSAGE_MAX,
};

export const OTHER_SERVICE = "Something else";
export const SERVICE_OPTIONS: readonly string[] = [...SERVICE_TITLES, OTHER_SERVICE];

// Honeypot and timing fields: not shown to people, never returned to the page.
export const HONEYPOT_FIELD = "website";
export const STARTED_FIELD = "startedAt";
export const MIN_FILL_MS = 3000;

/** Timestamp embedded in the form when the page is served. The contact page
 * renders per request, so this is the time this visitor received the form. */
export function formIssuedAt() {
  return Date.now();
}

export type EnquiryState = {
  status: "idle" | "invalid" | "failed" | "sent";
  errors: Partial<Record<EnquiryField, string>>;
  values: EnquiryValues;
  /** Increments on every submission so the form can react to repeat results. */
  attempt: number;
};

export const EMPTY_VALUES: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  telephone: "",
  service: "",
  message: "",
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = {
  status: "idle",
  errors: {},
  values: EMPTY_VALUES,
  attempt: 0,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEPHONE_PATTERN = /^[0-9+()\-\s]*$/;

const LABELS: Record<EnquiryField, string> = {
  name: "Your name",
  company: "Company",
  email: "Email address",
  telephone: "Telephone number",
  service: "Service",
  message: "Your message",
};

/** Reads and normalises the submitted values. Newlines become \n, so the
 * browser's \r\n does not count double against the length limit. */
export function readValues(form: FormData): EnquiryValues {
  const values = { ...EMPTY_VALUES };
  for (const field of ENQUIRY_FIELDS) {
    const raw = form.get(field);
    values[field] = typeof raw === "string" ? raw.replace(/\r\n?/g, "\n").trim() : "";
  }
  return values;
}

export function validate(values: EnquiryValues): EnquiryState["errors"] {
  const errors: EnquiryState["errors"] = {};

  if (!values.name) errors.name = "Enter your name";
  if (!values.email) errors.email = "Enter your email address";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter an email address in the correct format, like name@example.com";
  if (values.telephone && !TELEPHONE_PATTERN.test(values.telephone))
    errors.telephone = "Enter a telephone number using only numbers, spaces and + ( ) -";
  if (values.service && !SERVICE_OPTIONS.includes(values.service))
    errors.service = "Choose a service from the list";
  if (!values.message) errors.message = "Enter your message";

  for (const field of ENQUIRY_FIELDS) {
    if (!errors[field] && values[field].length > MAX_LENGTH[field]) {
      errors[field] =
        `${LABELS[field]} must be ${MAX_LENGTH[field].toLocaleString("en-GB")} characters or fewer`;
    }
  }
  return errors;
}
