"use server";

import {
  EMPTY_VALUES,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_FIELD,
  readValues,
  validate,
  type EnquiryState,
} from "../../lib/enquiry";
import { sendEnquiry } from "../../lib/email";

export async function submitEnquiry(
  previous: EnquiryState,
  form: FormData,
): Promise<EnquiryState> {
  const attempt = previous.attempt + 1;
  const values = readValues(form);

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values, attempt };
  }

  // Spam checks, after validation so a person who submits too quickly still
  // sees their errors: a filled honeypot, or a valid form submitted within
  // three seconds of the page rendering, gets the normal success response and
  // sends nothing.
  const honeypot = form.get(HONEYPOT_FIELD);
  const started = form.get(STARTED_FIELD);
  const startedAt = typeof started === "string" && started ? Number(started) : NaN;
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof honeypot === "string" && honeypot !== "") || tooFast) {
    return { status: "sent", errors: {}, values: EMPTY_VALUES, attempt };
  }

  const sent = await sendEnquiry(values);
  return sent
    ? { status: "sent", errors: {}, values: EMPTY_VALUES, attempt }
    : { status: "failed", errors: {}, values, attempt };
}
