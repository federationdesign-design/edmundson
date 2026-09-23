"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";
import styles from "./CookieBanner.module.css";

export function CookieBanner() {
  const { ready, consent, reopened, save } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const descId = useId();
  const analyticsId = useId();

  const open = ready && (consent === null || reopened);

  // When reopened from the footer, go straight to preferences showing the
  // stored choice, and move focus into the panel.
  useEffect(() => {
    if (!reopened) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowPrefs(true);
    setAnalytics(consent?.analytics ?? false);
    headingRef.current?.focus();
  }, [reopened, consent]);

  // The live region is always in the DOM so screen readers announce the
  // banner when its content is inserted.
  return (
    <div aria-live="polite">
      {open && (
        <section
          className={styles.banner}
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className={styles.inner}>
            <div className={styles.text}>
              <h2 id={titleId} ref={headingRef} tabIndex={-1} className={styles.title}>
                Cookies on this site
              </h2>
              <p id={descId}>
                We use strictly necessary cookies to make this site work. With your
                permission we would also like to use analytics cookies to understand how
                the site is used. See our <Link href="/cookies">cookie policy</Link>.
              </p>
            </div>

            {showPrefs && (
              <fieldset className={styles.prefs}>
                <legend className={styles.legend}>Cookie preferences</legend>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    id={`${analyticsId}-necessary`}
                    checked
                    disabled
                  />
                  <label htmlFor={`${analyticsId}-necessary`}>
                    <strong>Strictly necessary</strong>
                    <span>
                      Always on. Needed for the site to work and to remember your cookie
                      choice.
                    </span>
                  </label>
                </div>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    id={analyticsId}
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <label htmlFor={analyticsId}>
                    <strong>Analytics</strong>
                    <span>
                      Google Analytics, used to count visits and see which pages are
                      useful.
                    </span>
                  </label>
                </div>
              </fieldset>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.button} onClick={() => save(true)}>
                Accept all
              </button>
              <button type="button" className={styles.button} onClick={() => save(false)}>
                Reject all
              </button>
              {showPrefs ? (
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => save(analytics)}
                >
                  Save preferences
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => setShowPrefs(true)}
                >
                  Manage preferences
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
