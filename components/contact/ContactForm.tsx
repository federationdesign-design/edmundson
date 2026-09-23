"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { submitEnquiry } from "../../app/contact/actions";
import {
  HONEYPOT_FIELD,
  INITIAL_ENQUIRY_STATE,
  MAX_LENGTH,
  MESSAGE_MAX,
  SERVICE_OPTIONS,
  STARTED_FIELD,
  type EnquiryField,
} from "../../lib/enquiry";
import { PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";
import button from "../Button.module.css";
import section from "../Section.module.css";
import styles from "./ContactForm.module.css";

const ORDER: EnquiryField[] = [
  "name",
  "company",
  "email",
  "telephone",
  "service",
  "message",
];

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={error ? `${styles.field} ${styles.fieldError}` : styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}> (required)</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <span className={section.visuallyHidden}>Error: </span>
          {error}
        </p>
      )}
      {children}
      {hint}
    </div>
  );
}

export function ContactForm({ startedAt }: { startedAt: number }) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    INITIAL_ENQUIRY_STATE,
  );
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const summaryRef = useRef<HTMLDivElement>(null);
  const failedRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(state.values.message.length);

  // After each submission, move focus to whatever the result needs read first.
  useEffect(() => {
    if (state.attempt === 0) return;
    if (state.status === "invalid") summaryRef.current?.focus();
    else if (state.status === "failed") failedRef.current?.focus();
    else if (state.status === "sent") sentRef.current?.focus();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(state.values.message.length);
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={sentRef} tabIndex={-1} className={styles.sent} role="status">
        <p>
          Thank you. Your enquiry has been sent and a member of our team will be in touch
          shortly.
        </p>
      </div>
    );
  }

  const { errors, values } = state;
  const describedBy = (field: EnquiryField, extra?: string) =>
    [errors[field] ? `${id(field)}-error` : "", extra ?? ""].filter(Boolean).join(" ") ||
    undefined;
  const errorList = ORDER.filter((field) => errors[field]);

  return (
    // The server validates every submission, so browser validation is off to
    // keep one consistent error pattern.
    // Keyed on the attempt so every field, including the select, remounts
    // with the values returned by the server rather than React's form reset.
    <form key={state.attempt} action={formAction} noValidate className={styles.form}>
      {state.status === "invalid" && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className={styles.summary}
          aria-labelledby={`${uid}-summary-title`}
        >
          <h3 id={`${uid}-summary-title`} className={styles.summaryTitle}>
            There is a problem
          </h3>
          <ul className={styles.summaryList}>
            {errorList.map((field) => (
              <li key={field}>
                <a
                  href={`#${id(field)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id(field))?.focus();
                  }}
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.status === "failed" && (
        <div ref={failedRef} tabIndex={-1} className={styles.summary}>
          <p>
            Your enquiry could not be sent. Please try again, or call the office on{" "}
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
          </p>
        </div>
      )}

      <div className={styles.pair}>
        <Field id={id("name")} label="Name" required error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={MAX_LENGTH.name}
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={styles.input}
          />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company}>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={MAX_LENGTH.company}
            defaultValue={values.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={styles.input}
          />
        </Field>
      </div>

      <div className={styles.pair}>
        <Field id={id("email")} label="Email" required error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            maxLength={MAX_LENGTH.email}
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={styles.input}
          />
        </Field>
        <Field id={id("telephone")} label="Telephone" error={errors.telephone}>
          <input
            id={id("telephone")}
            name="telephone"
            type="tel"
            autoComplete="tel"
            maxLength={MAX_LENGTH.telephone}
            defaultValue={values.telephone}
            aria-invalid={errors.telephone ? true : undefined}
            aria-describedby={describedBy("telephone")}
            className={styles.input}
          />
        </Field>
      </div>

      <Field id={id("service")} label="Service" error={errors.service}>
        <select
          id={id("service")}
          name="service"
          defaultValue={values.service}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={describedBy("service")}
          className={`${styles.input} ${styles.select}`}
        >
          <option value="">Choose a service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={id("message")}
        label="Message"
        required
        error={errors.message}
        hint={
          <p id={`${id("message")}-count`} className={styles.count}>
            {count.toLocaleString("en-GB")} of {MESSAGE_MAX.toLocaleString("en-GB")}{" "}
            characters
          </p>
        }
      >
        <textarea
          id={id("message")}
          name="message"
          rows={7}
          required
          maxLength={MESSAGE_MAX}
          defaultValue={values.message}
          onChange={(e) => setCount(e.target.value.length)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", `${id("message")}-count`)}
          className={`${styles.input} ${styles.textarea}`}
        />
      </Field>

      {/* Spam traps: hidden from people and assistive technology. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={id(HONEYPOT_FIELD)}>Leave this field empty</label>
        <input
          id={id(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input type="hidden" name={STARTED_FIELD} value={startedAt} />

      <p className={styles.privacy}>
        We use the details you provide only to respond to your enquiry. See our{" "}
        <Link href="/privacy">privacy policy</Link> for more information.
      </p>

      <button
        type="submit"
        className={`${button.button} ${button.primary} ${styles.submit}`}
        disabled={pending}
      >
        {pending ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}
