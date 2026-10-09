import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "../../components/legal/LegalPage";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  EMAIL,
  EMAIL_HREF,
  REGISTERED_OFFICE,
  SITE_URL,
} from "../../lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms that apply to your use of the Edmondson Lifting Limited website, including acceptable use, intellectual property and governing law.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    content: (
      <>
        <p>
          These terms of use apply to your use of {SITE_URL}, the website of{" "}
          {COMPANY_NAME}
          (company number {COMPANY_NUMBER}), whose registered office is{" "}
          {REGISTERED_OFFICE}. By using this website, you agree to these terms.
        </p>
        <p>
          These terms cover the website only. They do not cover any work, equipment or
          services we supply, which are agreed separately with each customer.
        </p>
      </>
    ),
  },
  {
    heading: "Using this website",
    content: (
      <>
        <p>You may use this website for lawful purposes only. You must not:</p>
        <ul>
          <li>use the website in any way that breaks the law or is fraudulent;</li>
          <li>
            send unsolicited advertising or spam through our contact form, or misuse it in
            any other way;
          </li>
          <li>
            try to gain unauthorised access to the website, the server it is hosted on, or
            any system connected to it;
          </li>
          <li>
            introduce viruses or other harmful material, or attack the website in any way.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Accuracy of information",
    content: (
      <p>
        We aim to keep the information on this website accurate and up to date, but it is
        provided for general information only. It is not advice for your particular site,
        equipment or circumstances, and we do not guarantee that it is complete or free of
        errors. Please contact us before relying on anything you read here.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    content: (
      <p>
        The content of this website, including its text, photographs, logo and design, is
        owned by or licensed to {COMPANY_NAME}. You may view it and print or download
        extracts for your own reference, but you must not copy, reproduce or republish it
        for any other purpose without our written permission. The logos of the
        accreditation bodies shown on this website belong to those bodies.
      </p>
    ),
  },
  {
    heading: "Links to other websites",
    content: (
      <p>
        This website contains links to other websites, such as Google Maps. These links
        are provided for your convenience only. We have no control over those websites and
        are not responsible for their content or how they handle your data.
      </p>
    ),
  },
  {
    heading: "Availability",
    content: (
      <p>
        We do not guarantee that this website will always be available or uninterrupted.
        We may suspend, change or withdraw any part of it at any time without notice.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    content: (
      <>
        <p>
          To the extent permitted by law, we are not liable for any loss or damage arising
          from your use of, or inability to use, this website, or from relying on any
          content on it.
        </p>
        <p>
          Nothing in these terms excludes or limits our liability for death or personal
          injury caused by our negligence, for fraud or fraudulent misrepresentation, or
          for any other liability that cannot be excluded or limited under the law of
          England and Wales.
        </p>
      </>
    ),
  },
  {
    heading: "Your personal data",
    content: (
      <p>
        Our <Link href="/privacy">privacy policy</Link> explains how we use any personal
        data you give us through this website, and our{" "}
        <Link href="/cookies">cookie policy</Link> explains the cookies we use.
      </p>
    ),
  },
  {
    heading: "Governing law",
    content: (
      <p>
        These terms are governed by the laws of England and Wales. Any disputes will be
        subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
  {
    heading: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. The current version will always be
        available on this page with the date it was last updated. If you have any
        questions about these terms, contact us at <a href={EMAIL_HREF}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of use" sections={sections} />;
}
