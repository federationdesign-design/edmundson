import Link from "next/link";
import styles from "./Logo.module.css";

// PLACEHOLDER: no logo file was supplied, so the company name is set as a
// text wordmark. Swap for the supplied logo artwork (see PLACEHOLDERS.md).
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={compact ? `${styles.logo} ${styles.compact}` : styles.logo}
      aria-label="Edmondson Lifting Ltd, home"
      data-placeholder="logo"
    >
      <span className={styles.top}>Edmondson</span>
      <span className={styles.bottom}>
        Lifting <span className={styles.ltd}>Ltd</span>
      </span>
    </Link>
  );
}
