import Link from "next/link";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  EMAIL,
  EMAIL_HREF,
  LEGAL_LINKS,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGISTERED_OFFICE,
  SITE_NAME,
} from "../lib/site";
import { CookieSettingsButton } from "./consent/CookieSettingsButton";
import { CurrentYear } from "./CurrentYear";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <p className={styles.copyright}>
            <span>
              &copy; <CurrentYear initial={new Date().getFullYear()} /> {SITE_NAME}
            </span>
            <span className={styles.sep} aria-hidden="true" />
            <span>Lifting and Safety Equipment</span>
          </p>
          <ul className={styles.contact} role="list">
            <li>
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            </li>
            <li className={styles.sepItem} aria-hidden="true" />
            <li>
              <a href={EMAIL_HREF}>{EMAIL}</a>
            </li>
          </ul>
        </div>

        <div className={`${styles.row} ${styles.secondary}`}>
          <p className={styles.company}>
            {COMPANY_NAME}. Company number: {COMPANY_NUMBER}. Registered office:{" "}
            {REGISTERED_OFFICE}.
          </p>
          <nav aria-label="Legal">
            <ul className={styles.legal} role="list">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className={styles.settings} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
