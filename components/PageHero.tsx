import type { ReactNode } from "react";
import { PhotoHero } from "./PhotoHero";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  id: string;
  src: string;
  alt: string;
  /** Page-specific class setting object-position for the crop. */
  imageClassName?: string;
  label: string;
  titleWhite: string;
  titleYellow: string;
  /** Plain text, or text containing inline links. */
  body: ReactNode;
};

// Short inner-page hero: yellow label, two-line H1 (white then yellow), body.
export function PageHero({
  id,
  src,
  alt,
  imageClassName,
  label,
  titleWhite,
  titleYellow,
  body,
}: PageHeroProps) {
  return (
    <PhotoHero
      src={src}
      alt={alt}
      labelledBy={id}
      imageClassName={imageClassName}
      size="short"
    >
      <p className={styles.label}>{label}</p>
      <h1 id={id} className={styles.title}>
        <span className={styles.titleWhite}>{titleWhite}</span>{" "}
        <span className={styles.titleYellow}>{titleYellow}</span>
      </h1>
      <p className={styles.body}>{body}</p>
    </PhotoHero>
  );
}
