import styles from "./Pennant.module.css";

// "Safe, Reliable, Professional" banner from the concept, built in CSS and
// inline SVG. The stripe, hat and base are decorative; the words are text.
export function Pennant() {
  return (
    <div className={styles.pennant}>
      <div className={styles.stripe} aria-hidden="true" />
      <div className={styles.panel}>
        <svg
          className={styles.hat}
          viewBox="0 0 64 44"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M8 34C8 18 18 7 32 7s24 11 24 27Z" />
          <path d="M2 34h60v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" />
          <path className={styles.ridge} d="M26 9.5V30M38 9.5V30" />
        </svg>
        <p className={styles.words}>
          <span>Safe</span> <span>Reliable</span> <span>Professional</span>
        </p>
      </div>
      <div className={styles.base} aria-hidden="true" />
    </div>
  );
}
