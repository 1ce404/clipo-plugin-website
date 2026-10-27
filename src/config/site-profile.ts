/**
 * 站点基础信息的唯一来源：metadata、sitemap、robots、OG 图和 JSON-LD 都从这里取值。
 */
export const siteProfile = {
  name: "Clipo",
  title: "Clipo：你的 Agent + Clipo = 一支营销团队",
  tagline: "你的 Agent + Clipo = 一支营销团队",
  description:
    "研究、运营、创意、素材、制作五个插件，装进你已经在用的 Codex、WorkBuddy、Claude Code，用你品牌自己的资料和素材。",
  language: "zh-CN",
  locale: "zh_CN",
  keywords: [
    "Clipo",
    "Agent 插件",
    "营销 Agent",
    "MCP",
    "Codex 插件",
    "WorkBuddy 连接器",
    "Claude Code 插件",
    "内容营销",
    "批量生成视频",
  ],
  themeColor: "#0E1116",
  copyrightYear: 2026,
  /** 内容最近一次有实质修改的日期；不要填构建时间。 */
  updatedAt: "2026-10-27",
} as const;

export type SiteProfile = typeof siteProfile;
