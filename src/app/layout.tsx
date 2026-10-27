import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteProfile } from "@/config/site-profile";
import { assetPath, siteUrl } from "@/config/site-url";
import { organizationJsonLd, serializeJsonLd } from "./structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteProfile.name,
  title: { default: siteProfile.title, template: `%s | ${siteProfile.name}` },
  description: siteProfile.description,
  keywords: [...siteProfile.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteProfile.name,
    title: siteProfile.title,
    description: siteProfile.description,
    locale: siteProfile.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteProfile.title, description: siteProfile.description },
  icons: { icon: assetPath("/mark.svg") },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: siteProfile.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteProfile.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router 根布局，全站共用 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          跳到正文
        </a>
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
