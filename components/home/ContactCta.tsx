import { EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";
import button from "../Button.module.css";
import { MailIcon, PhoneIcon } from "../icons";
import styles from "./ContactCta.module.css";

export function ContactCta() {
  return (
    // PLACEHOLDER: no engineer photograph was supplied, so the band uses a
    // neutral dark background (see PLACEHOLDERS.md).
    <section
      className={styles.cta}
      aria-labelledby="cta-title"
      data-placeholder="engineer-image"
    >
      <div className={styles.inner}>
        <PhoneIcon className={styles.phoneIcon} />
        <div className={styles.text}>
          <h2 id="cta-title" className={styles.title}>
            Get in touch today
          </h2>
          <p className={styles.body}>
            For all enquiries or quotations, our friendly and capable sales staff are on
            hand to help with any form of enquiry.
          </p>
        </div>
        <div className={styles.actions}>
          <a href={PHONE_HREF} className={`${button.button} ${button.primary}`}>
            <PhoneIcon className={button.icon} />
            Call {PHONE_DISPLAY}
          </a>
          <a href={EMAIL_HREF} className={`${button.button} ${button.outline}`}>
            <MailIcon className={button.icon} />
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
