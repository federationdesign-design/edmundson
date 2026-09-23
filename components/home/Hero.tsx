import Image from "next/image";
import Link from "next/link";
import button from "../Button.module.css";
import { ChevronRightIcon } from "../icons";
import styles from "./Hero.module.css";

const STRAPLINE = ["Bespoke solutions", "Safety", "Efficiency", "Reliability"];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/images/site/hero-gantry-crane.jpg"
        alt="Yellow gantry crane with an electric chain hoist spanning a warehouse aisle"
        fill
        preload
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleWhite}>Lifting &amp; Safety</span>{" "}
          <span className={styles.titleYellow}>Equipment</span>
        </h1>
        <div className={styles.straplineWrap}>
          <ul className={styles.strapline} role="list">
            {STRAPLINE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className={styles.body}>
          We are lifting gear specialists with experience across a wide range of
          industries. Edmondson Lifting Ltd offers bespoke solutions tailored to the
          unique needs of each sector. Our team is dedicated to ensuring safety,
          efficiency and reliability in every project we undertake.
        </p>
        <Link href="/contact" className={`${button.button} ${button.primary}`}>
          Get in touch
          <ChevronRightIcon className={button.icon} />
        </Link>
      </div>
    </section>
  );
}
