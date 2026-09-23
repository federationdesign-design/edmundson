import type { Metadata } from "next";
import { Gallery } from "../../components/our-work/Gallery";
import { PageHero } from "../../components/PageHero";
import section from "../../components/Section.module.css";
import { Quotation } from "../../components/services/Quotation";
import { getWorkPhotos } from "../../lib/drive";
import styles from "./page.module.css";

// Matches the Drive listing cache, so new uploads appear within an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Recent projects and installations by Edmondson Lifting Ltd, from bespoke fabrication to on-site inspections across England, Scotland and Wales.",
  alternates: { canonical: "/our-work" },
};

export default async function OurWorkPage() {
  const { photos } = await getWorkPhotos();
  return (
    <>
      <PageHero
        id="our-work-hero-title"
        src="/images/site/our-work-hero-frame-lift.jpg"
        alt="Fabricated yellow steel frame being lifted by a lorry-mounted crane in a yard"
        imageClassName={styles.heroImage}
        label="Our work"
        titleWhite="Built, installed"
        titleYellow="and inspected."
        body="A selection of recent projects and installations carried out by our team, from bespoke fabrication to on-site inspections across England, Scotland and Wales."
      />
      <section
        className={`${styles.gallery} ${section.textured}`}
        aria-label="Project photos"
      >
        <div className={styles.inner}>
          <Gallery photos={photos} />
        </div>
      </section>
      <Quotation />
    </>
  );
}
