import { describe, expect, it } from "vitest";
import { posts } from "@/content/posts";
import manifest from "./manifest";
import robots from "./robots";
import sitemap from "./sitemap";
import { articleJsonLd, organizationJsonLd, serializeJsonLd } from "./structured-data";

describe("sitemap", () => {
  const entries = sitemap();

  it("包含首页、博客列表和每篇文章", () => {
    expect(entries).toHaveLength(2 + posts.length);
    for (const p of posts) expect(entries.some((e) => e.url.endsWith(`/blog/${p.slug}`))).toBe(true);
  });

  it("文章的 lastModified 用发布日期；首页和列表不填，避免报构建时间", () => {
    const [home, blog] = entries;
    expect(home?.lastModified).toBeUndefined();
    expect(blog?.lastModified).toBeUndefined();
    for (const p of posts) {
      expect(entries.find((e) => e.url.endsWith(`/blog/${p.slug}`))?.lastModified).toBe(p.date);
    }
  });
});

describe("robots", () => {
  it("允许抓取并指向 sitemap", () => {
    const r = robots();
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
    expect(r.rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });
});

describe("manifest", () => {
  it("名称、语言和图标齐全", () => {
    const m = manifest();
    expect(m.short_name).toBe("Clipo");
    expect(m.lang).toBe("zh-CN");
    expect(m.icons?.[0]?.src).toMatch(/mark\.svg$/);
  });
});

describe("结构化数据", () => {
  it("Organization 和 BlogPosting 字段正确", () => {
    expect(organizationJsonLd()).toMatchObject({ "@type": "Organization", name: "Clipo" });
    const post = posts[0];
    expect(articleJsonLd(post)).toMatchObject({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
    });
  });

  it("序列化时转义 <，防止提前闭合 script 标签", () => {
    expect(serializeJsonLd({ text: "</script><b>" })).not.toContain("</script>");
  });
});
