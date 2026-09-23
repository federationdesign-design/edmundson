import type { Metadata } from "next";
import { connection } from "next/server";
import { ContactDetails } from "../../components/contact/ContactDetails";
import { ContactForm } from "../../components/contact/ContactForm";
import { PageHero } from "../../components/PageHero";
import section from "../../components/Section.module.css";
import { formIssuedAt } from "../../lib/enquiry";
import { PHONE_DISPLAY } from "../../lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Edmondson Lifting Ltd for enquiries or quotations. Our friendly and capable sales staff are on hand to help: send us a message or call the office on ${PHONE_DISPLAY}.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  // Rendered per request so the form carries the time it was served, used to
  // reject submissions made faster than a person could type.
  await connection();
  const startedAt = formIssuedAt();

  return (
    <>
      <PageHero
        id="contact-hero-title"
        src="/images/site/contact-hero-mesh-gate.jpg"
        alt="Yellow steel mesh safety gate with a bolt latch, fabricated and installed on site"
        imageClassName={styles.heroImage}
        label="Contact"
        titleWhite="Get in touch"
        titleYellow="today."
        body="For all enquiries or quotations, our friendly and capable sales staff are on hand to help. Send us a message below or call the office."
      />
      <section className={styles.contact} aria-labelledby="enquiry-title">
        <div className={styles.inner}>
          <div className={styles.detailsColumn}>
            <ContactDetails />
          </div>
          <div className={styles.formColumn}>
            <h2 id="enquiry-title" className={styles.title}>
              Send us an <span className={section.highlight}>enquiry</span>
            </h2>
            <ContactForm startedAt={startedAt} />
          </div>
        </div>
      </section>
    </>
  );
}
