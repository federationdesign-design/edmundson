import Image from "next/image";
import Link from "next/link";
import logoWhiteText from "../public/images/brand/logo-white-text.png";
import styles from "./Logo.module.css";

// Supplied logo, white-text version for the black header, sticky header and
// mobile menu. public/images/brand/logo.png is the version for light
// backgrounds.
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src={logoWhiteText}
        alt="Edmondson Lifting Ltd"
        className={compact ? `${styles.image} ${styles.compact}` : styles.image}
        sizes={compact ? "9rem" : "14rem"}
        // The static header logo is visible on load; the compact copies sit in
        // the hidden sticky header and closed menu panel.
        loading={compact ? "lazy" : "eager"}
      />
    </Link>
  );
}
