import { siteProfile } from "@/config/site-profile";
import { absoluteUrl } from "@/config/site-url";
import type { Post } from "@/content/posts";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteProfile.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/mark.svg"),
    description: siteProfile.description,
  };
}

export function softwareJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteProfile.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Codex, WorkBuddy, Claude Code",
    description: siteProfile.description,
    url: absoluteUrl("/"),
    inLanguage: siteProfile.language,
  };
}

export function articleJsonLd(post: Post): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: siteProfile.language,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: siteProfile.name },
    publisher: { "@type": "Organization", name: siteProfile.name },
  };
}

/** 输出到 <script type="application/ld+json">；转义 `<` 防止内容提前闭合 script 标签。 */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
