import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  ADDRESS,
  EMAIL,
  EMAIL_HREF,
  MAPS_URL,
  MOBILE_DISPLAY,
  MOBILE_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "../../lib/site";
import {
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SmartphoneIcon,
} from "../icons";
import section from "../Section.module.css";
import styles from "./ContactDetails.module.css";

function Item({
  label,
  Icon,
  children,
}: {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
}) {
  return (
    <div className={styles.item}>
      <Icon className={styles.icon} />
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}

export function ContactDetails() {
  return (
    <section className={styles.details} aria-labelledby="contact-details-title">
      <h2 id="contact-details-title" className={section.visuallyHidden}>
        Contact details
      </h2>
      <dl className={styles.list}>
        <Item label="Office" Icon={PhoneIcon}>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </Item>
        <Item label="Mobile" Icon={SmartphoneIcon}>
          <a href={MOBILE_HREF}>{MOBILE_DISPLAY}</a>
        </Item>
        <Item label="Email" Icon={MailIcon}>
          <a href={EMAIL_HREF} className={styles.email}>
            {EMAIL}
          </a>
        </Item>
        <Item label="Address" Icon={MapPinIcon}>
          <address className={styles.address}>
            {ADDRESS.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          {/* A link, not an embedded map: an embed sets cookies before consent. */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.maps}
          >
            Open in Google Maps
            <ExternalLinkIcon className={styles.external} />
            <span className={section.visuallyHidden}> (opens in a new tab)</span>
          </a>
        </Item>
      </dl>
    </section>
  );
}
