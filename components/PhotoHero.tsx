import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./PhotoHero.module.css";

type PhotoHeroProps = {
  src: string;
  alt: string;
  labelledBy: string;
  /** Page-specific class, used to set object-position for the crop. */
  imageClassName?: string;
  size?: "tall" | "short";
  children: ReactNode;
};

// Full-width dark photographic hero with a left-weighted overlay. The image
// is the page's largest contentful paint, so it is always preloaded.
export function PhotoHero({
  src,
  alt,
  labelledBy,
  imageClassName,
  size = "tall",
  children,
}: PhotoHeroProps) {
  return (
    <section className={`${styles.hero} ${styles[size]}`} aria-labelledby={labelledBy}>
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="100vw"
        className={imageClassName ? `${styles.image} ${imageClassName}` : styles.image}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
