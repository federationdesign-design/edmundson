import Image from "next/image";
import styles from "./Partner.module.css";

export function Partner() {
  return (
    <section className={styles.partner} aria-labelledby="partner-title">
      <div className={styles.text}>
        <h2 id="partner-title" className={styles.title}>
          Your lifting &amp; safety partner
        </h2>
        <p className={styles.body}>
          Whether you require loose lifting equipment or a fabricated runway system, we
          are happy to assist. Our comprehensive range of products and services means we
          can meet all your lifting needs, however complex or simple the project.
        </p>
      </div>
      <div className={styles.media}>
        <Image
          src="/images/site/walkway-handrail.jpg"
          alt="Yellow steel handrails either side of a galvanised grating walkway over water"
          fill
          sizes="(min-width: 56.25em) 50vw, 100vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}
