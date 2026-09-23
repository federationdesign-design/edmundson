import { PhotoHero } from "../PhotoHero";
import styles from "./ServicesHero.module.css";

export function ServicesHero() {
  return (
    <PhotoHero
      src="/images/site/services-hero-staircase.jpg"
      alt="Yellow steel staircase with chequer plate treads rising to a guarded mezzanine platform"
      labelledBy="services-hero-title"
      imageClassName={styles.image}
      size="short"
    >
      <p className={styles.label}>Our services &amp; work</p>
      <h1 id="services-hero-title" className={styles.title}>
        <span className={styles.titleWhite}>Expertise. Quality.</span>{" "}
        <span className={styles.titleYellow}>On time.</span>
      </h1>
      <p className={styles.body}>
        From bespoke fabrication to on-site maintenance, we provide a complete range of
        lifting and safety solutions. Take a look at our services below and view examples
        of our recent work.
      </p>
    </PhotoHero>
  );
}
