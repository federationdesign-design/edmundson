import Link from "next/link";
import type { ReactNode } from "react";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";
import styles from "./LegalPage.module.css";

export type LegalSection = { heading: string; content: ReactNode };

// Last updated date shared by the three legal pages.
export const LEGAL_LAST_UPDATED = "9 October 2026";

// Simple text page for the privacy, cookie and terms pages: breadcrumb, title,
// last updated date, numbered sections and a closing contact box.
export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{title}</span>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Last updated: {LEGAL_LAST_UPDATED}</p>
        </div>
      </header>

      <div className={styles.inner}>
        {sections.map(({ heading, content }) => (
          <section key={heading} className={styles.section}>
            <h2 className={styles.heading}>{heading}</h2>
            <div className={styles.content}>{content}</div>
          </section>
        ))}

        <aside className={styles.contact} aria-label="Questions about this page">
          <p>
            Questions about this page? Contact us at <a href={EMAIL_HREF}>{EMAIL}</a> or
            call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
          </p>
        </aside>
      </div>
    </article>
  );
}
