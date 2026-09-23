import type { Metadata } from "next";
import { OurWork } from "../../components/services/OurWork";
import { Quotation } from "../../components/services/Quotation";
import { ServiceChecklist } from "../../components/services/ServiceChecklist";
import { ServicesHero } from "../../components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From bespoke fabrication to on-site maintenance, Edmondson Lifting Ltd provides a complete range of lifting and safety solutions. See our services and examples of our recent work.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceChecklist />
      <OurWork />
      <Quotation />
    </>
  );
}
