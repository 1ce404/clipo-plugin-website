import { describe, expect, it } from "vitest";
import { readBasePath, readSiteUrl } from "./site-url";

describe("readSiteUrl", () => {
  it("未配置时回落到本地地址", () => {
    expect(readSiteUrl({})).toBe("http://localhost:3000");
  });

  it("去掉结尾斜杠，保留子路径", () => {
    expect(readSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://clipo.cloud/" })).toBe("https://clipo.cloud");
    expect(readSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://1ce404.github.io/clipo-plugin-website/" })).toBe(
      "https://1ce404.github.io/clipo-plugin-website",
    );
  });

  it("拒绝非法地址和非 http 协议", () => {
    expect(() => readSiteUrl({ NEXT_PUBLIC_SITE_URL: "not a url" })).toThrow(/不是合法的 URL/);
    expect(() => readSiteUrl({ NEXT_PUBLIC_SITE_URL: "ftp://clipo.cloud" })).toThrow(/http 或 https/);
  });
});

describe("readBasePath", () => {
  it("默认为空", () => {
    expect(readBasePath({})).toBe("");
  });

  it("接受以 / 开头、不以 / 结尾的路径", () => {
    expect(readBasePath({ NEXT_PUBLIC_BASE_PATH: "/clipo-plugin-website" })).toBe("/clipo-plugin-website");
  });

  it("拒绝格式错误的路径", () => {
    expect(() => readBasePath({ NEXT_PUBLIC_BASE_PATH: "clipo" })).toThrow();
    expect(() => readBasePath({ NEXT_PUBLIC_BASE_PATH: "/clipo/" })).toThrow();
  });
});
