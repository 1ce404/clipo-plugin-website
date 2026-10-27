import type { MetadataRoute } from "next";
import { siteProfile } from "@/config/site-profile";
import { assetPath } from "@/config/site-url";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteProfile.title,
    short_name: siteProfile.name,
    description: siteProfile.description,
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: siteProfile.themeColor,
    lang: siteProfile.language,
    icons: [{ src: assetPath("/mark.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
