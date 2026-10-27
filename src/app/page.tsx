import { CasesSection } from "@/components/CasesSection";
import { CompareSection } from "@/components/CompareSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { InstallSection } from "@/components/InstallSection";
import { PluginsSection } from "@/components/PluginsSection";
import { PricingSection } from "@/components/PricingSection";
import { RelaySection } from "@/components/RelaySection";
import { serializeJsonLd, softwareJsonLd } from "./structured-data";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareJsonLd()) }}
      />
      <Hero />
      <main id="main">
        <RelaySection />
        <PluginsSection />
        <CasesSection />
        <CompareSection />
        <InstallSection />
        <PricingSection />
        <FinalCta />
        <FaqSection />
      </main>
    </>
  );
}
