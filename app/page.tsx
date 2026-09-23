import type { Metadata } from "next";
import { ContactCta } from "../components/home/ContactCta";
import { Hero } from "../components/home/Hero";
import { Industries } from "../components/home/Industries";
import { Partner } from "../components/home/Partner";
import { Qualifications } from "../components/home/Qualifications";
import { Services } from "../components/home/Services";
import { EMAIL, PHONE_HREF, SITE_NAME, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  // The layout title template does not apply to its own segment, so set it in full.
  title: { absolute: `Lifting & Safety Equipment Specialists | ${SITE_NAME}` },
  alternates: { canonical: "/" },
};

// Address fields are omitted until supplied (see PLACEHOLDERS.md).
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE_HREF.replace("tel:", ""),
  email: EMAIL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Partner />
      <Services />
      <Industries />
      <Qualifications />
      <ContactCta />
    </>
  );
}
