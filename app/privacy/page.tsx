import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "../../components/legal/LegalPage";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGISTERED_OFFICE,
  SITE_URL,
} from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Edmondson Lifting Limited collects, uses and protects personal data from this website and its contact form, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

// PLACEHOLDER: retention periods and transfer safeguards are not yet confirmed
// (see PLACEHOLDERS.md).
const sections: LegalSection[] = [
  {
    heading: "Who we are",
    content: (
      <>
        <p>
          {COMPANY_NAME} (company number {COMPANY_NUMBER}) is the data controller for the
          personal information collected through {SITE_URL}. Our registered office is{" "}
          {REGISTERED_OFFICE}.
        </p>
        <p>
          This policy explains what personal data we collect, why we collect it, how we
          use it, and your rights under UK GDPR and the Data Protection Act 2018.
        </p>
      </>
    ),
  },
  {
    heading: "What data we collect",
    content: (
      <>
        <p>We collect and process the following personal data:</p>
        <ul>
          <li>
            The details you give us in our contact form: your name, company, email
            address, telephone number, the service you are interested in and your message.
            Only your name, email address and message are required.
          </li>
          <li>
            Any details you give us when you contact us directly by email or telephone.
          </li>
          <li>
            Information about how you use our website, collected by Google Analytics, but
            only if you accept analytics cookies.
          </li>
          <li>
            Technical information, such as your IP address, that our hosting provider
            processes to deliver the website to your device.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Why we collect your data",
    content: (
      <ul>
        <li>
          To respond to your enquiry or request for a quotation, and to discuss work you
          may want us to carry out.
        </li>
        <li>
          To understand how our website is used and improve it, using Google Analytics,
          where you have consented to this.
        </li>
        <li>To keep our website running securely.</li>
      </ul>
    ),
  },
  {
    heading: "How the contact form works",
    content: (
      <p>
        When you send an enquiry, your details are sent by email to our sales team through
        Resend, an email delivery service. The website does not store your enquiry in a
        database. We do not send you a copy of your enquiry, and we do not add you to any
        mailing list.
      </p>
    ),
  },
  {
    heading: "Legal basis for processing",
    content: (
      <>
        <p>Under UK GDPR, we rely on the following legal bases:</p>
        <ul>
          <li>
            Legitimate interests: to respond to enquiries sent to us, and to keep our
            website running securely.
          </li>
          <li>
            Steps prior to a contract: where your enquiry is about work you would like us
            to quote for or carry out.
          </li>
          <li>
            Consent: for Google Analytics. You can withdraw your consent at any time, as
            explained in our <Link href="/cookies">cookie policy</Link>.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Third parties we share data with",
    content: (
      <>
        <p>
          We share your data with the following service providers only where necessary:
        </p>
        <ul>
          <li>Vercel: hosts our website.</li>
          <li>Resend: delivers contact form enquiries to our sales team by email.</li>
          <li>
            Google: provides Google Analytics, only if you accept analytics cookies.
          </li>
        </ul>
        <p>
          The photographs in our Our Work gallery are stored in Google Drive but are
          delivered through our own website, so Google does not set cookies on your device
          when you view them. Our Open in Google Maps link simply opens Google Maps; we do
          not embed a map on our website.
        </p>
        <p>We do not sell your personal data to any third party.</p>
      </>
    ),
  },
  {
    heading: "International transfers",
    content: (
      <p>
        Vercel, Resend and Google may process your data outside the UK. Where they do, we
        rely on the following safeguards: [INTERNATIONAL TRANSFER SAFEGUARDS].
      </p>
    ),
  },
  {
    heading: "How long we keep your data",
    content: (
      <>
        <p>
          We keep personal data only for as long as we need it for the purposes it was
          collected for:
        </p>
        <ul>
          <li>Enquiries received by email: [ENQUIRY RETENTION PERIOD]</li>
          <li>Copies of enquiry emails held by Resend: [RESEND RETENTION PERIOD]</li>
          <li>Google Analytics data: [GOOGLE ANALYTICS DATA RETENTION PERIOD]</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Your rights",
    content: (
      <>
        <p>Under UK GDPR you have the following rights:</p>
        <ul>
          <li>
            Right of access: you can request a copy of the personal data we hold about
            you.
          </li>
          <li>Right to rectification: you can ask us to correct inaccurate data.</li>
          <li>
            Right to erasure: you can ask us to delete your data in certain circumstances.
          </li>
          <li>
            Right to restrict processing: you can ask us to limit how we use your data.
          </li>
          <li>
            Right to data portability: you can request your data in a structured,
            machine-readable format.
          </li>
          <li>
            Right to object: you can object to processing based on legitimate interests.
          </li>
          <li>
            Right to withdraw consent: where we rely on consent, you can withdraw it at
            any time.
          </li>
          <li>
            Rights related to automated decision-making: we do not carry out automated
            decision-making or profiling.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at <a href={EMAIL_HREF}>{EMAIL}</a>{" "}
          or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>. We will respond within one
          month.
        </p>
      </>
    ),
  },
  {
    heading: "How to complain",
    content: (
      <p>
        If you are unhappy with how we have handled your data, you have the right to
        complain to the Information Commissioner&apos;s Office (ICO) at{" "}
        <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a> or on 0303 123 1113.
        We would appreciate the chance to resolve your concern first, so please contact us
        before you go to the ICO.
      </p>
    ),
  },
  {
    heading: "Cookies",
    content: (
      <p>
        Our website uses cookies. Please see our{" "}
        <Link href="/cookies">cookie policy</Link> for details of the cookies we use and
        how to manage them.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    content: (
      <p>
        We may update this privacy policy from time to time. The current version will
        always be available on this page with the date it was last updated.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy policy" sections={sections} />;
}
