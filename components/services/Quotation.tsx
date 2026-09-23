import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";
import button from "../Button.module.css";
import { HandshakeIcon, MailIcon, PhoneIcon } from "../icons";
import styles from "./Quotation.module.css";

export function Quotation() {
  return (
    <section className={styles.quotation} aria-labelledby="quotation-title">
      <div className={styles.inner}>
        <HandshakeIcon className={styles.handshake} />
        <div>
          <h2 id="quotation-title" className={styles.title}>
            Get a quotation
          </h2>
          <p className={styles.body}>
            For all enquiries or quotations, our friendly and capable sales staff are on
            hand to help with any form of enquiry.
          </p>
        </div>
        <div className={styles.actions}>
          <Link href="/contact" className={`${button.button} ${button.dark}`}>
            <MailIcon className={button.icon} />
            Contact us
          </Link>
          <a href={PHONE_HREF} className={styles.phone}>
            <PhoneIcon className={styles.phoneIcon} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
