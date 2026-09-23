import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { Analytics } from "../components/consent/Analytics";
import { ConsentProvider } from "../components/consent/ConsentProvider";
import { CookieBanner } from "../components/consent/CookieBanner";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SITE_NAME, SITE_URL } from "../lib/site";
import styles from "./layout.module.css";
import "./globals.css";

const heading = Roboto_Condensed({
  variable: "--font-heading",
  weight: ["700", "800"],
  subsets: ["latin"],
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const body = Roboto({
  variable: "--font-body",
  weight: ["400", "500"],
  subsets: ["latin"],
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description:
    "Edmondson Lifting Ltd are lifting gear specialists with experience across a wide range of industries, offering bespoke lifting and safety equipment solutions built on safety, efficiency and reliability.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    url: "/",
    images: [
      {
        url: "/images/site/og-gantry-crane.jpg",
        width: 900,
        height: 473,
        alt: "Yellow gantry crane with an electric chain hoist in a warehouse",
      },
    ],
  },
  ...(gscToken ? { verification: { google: gscToken } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${heading.variable} ${body.variable}`}>
      <body>
        <ConsentProvider>
          <a href="#main" className={styles.skipLink}>
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
