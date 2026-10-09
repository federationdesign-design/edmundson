import type { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { Quotation } from "../../components/services/Quotation";
import { ServiceChecklist } from "../../components/services/ServiceChecklist";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From bespoke fabrication to on-site maintenance, Edmondson Lifting Ltd provides a complete range of lifting and safety solutions. See our services and examples of our recent work.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        id="services-hero-title"
        src="/images/site/services-hero-staircase.jpg"
        alt="Yellow steel staircase with chequer plate treads rising to a guarded mezzanine platform"
        imageClassName={styles.heroImage}
        label="Our services & work"
        titleWhite="Expertise. Quality."
        titleYellow="On time."
        body="From bespoke fabrication to on-site maintenance, we provide a complete range of lifting and safety solutions. Take a look at our services below and view examples of our recent work."
      />
      <ServiceChecklist />
      <Quotation />
    </>
  );
}
