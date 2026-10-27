import type { PluginKey } from "./plugins";

export type Package = {
  readonly name: string;
  readonly line: string;
  readonly includes: readonly PluginKey[];
  readonly featured?: boolean;
};

/** 套餐组合来自内部方案；具体价格以购买页面为准。 */
export const packages = [
  { name: "创意包", line: "想清楚做什么", includes: ["idea"] },
  { name: "洞察创意包", line: "从机会出发", includes: ["signal", "idea"] },
  { name: "运营包", line: "从机会到排期", includes: ["signal", "play", "idea"] },
  { name: "内容生产包", line: "从创意到成片", includes: ["idea", "asset", "remix"] },
  {
    name: "完整套装",
    line: "一支营销团队",
    includes: ["signal", "play", "idea", "asset", "remix"],
    featured: true,
  },
] as const satisfies readonly Package[];

export const connectWays = [
  { name: "Skill", line: "教你的 Agent 怎么做" },
  { name: "MCP", line: "让你的 Agent 能做到" },
  { name: "CLI", line: "大文件不走对话" },
] as const;

export const installSteps = [
  { title: "复制命令", detail: "或在 WorkBuddy 一键添加" },
  { title: "登录授权", detail: "不用填 API Key" },
  { title: "说一句话", detail: "剩下的交给它" },
] as const;
