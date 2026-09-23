import "server-only";
import { Resend } from "resend";
import type { EnquiryValues } from "./enquiry";

// Sends contact form enquiries through Resend. Never logs enquiry content or
// the API key: only whether a send succeeded, and Resend's error name/status.

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ROWS: [keyof EnquiryValues, string][] = [
  ["name", "Name"],
  ["company", "Company"],
  ["email", "Email"],
  ["telephone", "Telephone"],
  ["service", "Service"],
];

function text(values: EnquiryValues) {
  const lines = ROWS.map(([field, label]) => `${label}: ${values[field] || "Not given"}`);
  return `New enquiry from the website contact form.\n\n${lines.join("\n")}\n\nMessage:\n${values.message}\n`;
}

function html(values: EnquiryValues) {
  const rows = ROWS.map(
    ([field, label]) =>
      `<tr><th align="left" style="padding:4px 12px 4px 0">${label}</th><td style="padding:4px 0">${
        values[field] ? escapeHtml(values[field]) : "Not given"
      }</td></tr>`,
  ).join("");
  const message = escapeHtml(values.message).replace(/\n/g, "<br>");
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">
<p>New enquiry from the website contact form.</p>
<table cellpadding="0" cellspacing="0">${rows}</table>
<p><strong>Message</strong></p>
<p>${message}</p>
</body></html>`;
}

/** Returns true when Resend accepted the email. */
export async function sendEnquiry(values: EnquiryValues): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) {
    console.error("[contact] send failed: Resend is not configured");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Website enquiry from ${values.name.replace(/\s+/g, " ")}`,
      text: text(values),
      html: html(values),
    });
    if (error) {
      // Resend's message can echo submitted values, so log only name and status.
      const status = "statusCode" in error ? ` ${String(error.statusCode)}` : "";
      console.error(`[contact] send failed: ${error.name}${status}`);
      return false;
    }
    console.info("[contact] enquiry sent");
    return true;
  } catch (error) {
    console.error(
      `[contact] send failed: ${error instanceof Error ? error.name : "unknown error"}`,
    );
    return false;
  }
}
