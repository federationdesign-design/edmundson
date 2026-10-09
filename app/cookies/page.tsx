import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "../../components/consent/CookieSettingsButton";
import { LegalPage, type LegalSection } from "../../components/legal/LegalPage";
import styles from "../../components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The cookies used on the Edmondson Lifting Limited website, what they do, how long they last, and how to change your cookie choices.",
  alternates: { canonical: "/cookies" },
};

// Every cookie the site can set. el_consent is written by
// components/consent/consent.ts; the _ga cookies are set by Google Analytics
// with its default settings, only after analytics consent.
const COOKIES = [
  {
    name: "el_consent",
    type: "Strictly necessary",
    purpose:
      "Records your cookie choices (whether you accepted analytics cookies) and when you made them, so we do not ask you again on every page.",
    duration: "12 months",
  },
  {
    name: "_ga",
    type: "Analytics",
    purpose:
      "Set by Google Analytics to distinguish visitors, so we can count visits and see how the site is used. Only set if you accept analytics cookies.",
    duration: "2 years",
  },
  {
    name: "_ga_<ID>",
    type: "Analytics",
    purpose:
      "Set by Google Analytics to keep track of your current visit. <ID> is our Google Analytics measurement ID. Only set if you accept analytics cookies.",
    duration: "2 years",
  },
];

const sections: LegalSection[] = [
  {
    heading: "What are cookies",
    content: (
      <p>
        Cookies are small text files placed on your device when you visit a website. They
        are widely used to make websites work and to give website owners information about
        how their site is used. Under UK GDPR and the Privacy and Electronic
        Communications Regulations (PECR), we must ask for your consent before placing any
        cookie that is not strictly necessary.
      </p>
    ),
  },
  {
    heading: "Cookies we use",
    content: (
      <>
        <p>
          Our website uses one strictly necessary cookie and, only if you accept them,
          Google Analytics cookies. No analytics cookie is set and no analytics script is
          loaded until you give consent.
        </p>
        <div
          className={styles.tableWrap}
          role="region"
          aria-label="Cookies we use"
          tabIndex={0}
        >
          <table>
            <caption className={styles.caption}>Cookies used on this website</caption>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie) => (
                <tr key={cookie.name}>
                  <th scope="row">
                    <code>{cookie.name}</code>
                  </th>
                  <td>{cookie.type}</td>
                  <td>{cookie.purpose}</td>
                  <td>{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The photographs in our Our Work gallery are delivered through our own website,
          so viewing them does not set any Google cookies. Our Open in Google Maps link
          opens Google Maps in a new tab; we do not embed a map, so no Google Maps cookies
          are set on our website.
        </p>
      </>
    ),
  },
  {
    heading: "Managing your cookie choices",
    content: (
      <>
        <p>
          When you first visit our website, we ask whether you accept analytics cookies.
          You can change your choice at any time using the{" "}
          <CookieSettingsButton className={styles.linkButton} /> button, which also
          appears in the footer of every page.
        </p>
        <p>
          If you withdraw consent, Google Analytics stops immediately and we delete its
          cookies from your browser.
        </p>
      </>
    ),
  },
  {
    heading: "Controlling cookies in your browser",
    content: (
      <p>
        You can also block or delete cookies in your browser settings. If you block the
        strictly necessary <code>el_consent</code> cookie, we will not be able to remember
        your choice and will ask you again on each visit. Your browser&apos;s help pages
        explain how to manage cookies.
      </p>
    ),
  },
  {
    heading: "More information",
    content: (
      <p>
        Our <Link href="/privacy">privacy policy</Link> explains how we use personal data,
        including the data collected by Google Analytics.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    content: (
      <p>
        We may update this cookie policy from time to time, for example if we start using
        a new cookie. The current version will always be available on this page with the
        date it was last updated.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie policy" sections={sections} />;
}
