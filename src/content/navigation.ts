/** 导航和页脚共用的站内链接。首页区块用 `/#id`，next/link 会自动加上 basePath。 */
export const navItems = [
  { href: "/#plugins", label: "产品" },
  { href: "/#cases", label: "案例" },
  { href: "/#compare", label: "对比" },
  { href: "/#pricing", label: "价格" },
  { href: "/blog", label: "博客" },
] as const;

export const footerColumns = [
  {
    title: "产品",
    links: [
      { href: "/#plugins", label: "五个插件" },
      { href: "/#compare", label: "对比" },
      { href: "/#pricing", label: "价格" },
      { href: "/#install", label: "接入" },
    ],
  },
  {
    title: "资源",
    links: [
      { href: "/blog", label: "博客" },
      { href: "/#cases", label: "案例" },
      { href: "/#faq", label: "常见问题" },
    ],
  },
  {
    title: "公司",
    links: [{ href: "/#contact", label: "联系我们" }],
  },
] as const;
