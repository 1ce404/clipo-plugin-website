import type { PluginKey } from "./plugins";

export const caseCategories = ["种草", "新品上市", "大促", "多平台改版"] as const;
export type CaseCategory = (typeof caseCategories)[number];

export type Case = {
  readonly title: string;
  readonly category: CaseCategory;
  readonly industry: string;
  readonly prompt: string;
  readonly output: string;
  readonly duration: string;
  readonly uses: readonly PluginKey[];
  readonly cover: { readonly from: string; readonly to: string; readonly label: string };
};

/** 示意案例：上线前替换为真实试点数据。 */
export const cases = [
  {
    title: "小红书新品种草",
    category: "种草",
    industry: "家电",
    prompt: "下周做 8 条新品种草",
    output: "8 条成片",
    duration: "1 天",
    uses: ["signal", "play", "idea", "asset", "remix"],
    cover: { from: "#E7EEFF", to: "#F3E9FF", label: "厨房也该下班" },
  },
  {
    title: "新品上市创意提案",
    category: "新品上市",
    industry: "美妆",
    prompt: "给新品出一轮提案",
    output: "5 个方向",
    duration: "40 分钟",
    uses: ["signal", "idea"],
    cover: { from: "#FFE9F1", to: "#FFF3E2", label: "熬夜后的第一步" },
  },
  {
    title: "618 抖音投放素材",
    category: "大促",
    industry: "母婴",
    prompt: "618 要 30 条投放素材",
    output: "30 条成片",
    duration: "2 天",
    uses: ["play", "idea", "asset", "remix"],
    cover: { from: "#FFF1DC", to: "#FFE3E3", label: "整夜干爽" },
  },
  {
    title: "一条视频改五个平台",
    category: "多平台改版",
    industry: "3C",
    prompt: "把主视频改成各平台版本",
    output: "15 条成片",
    duration: "2 小时",
    uses: ["asset", "remix"],
    cover: { from: "#DDF5EC", to: "#E3EEFF", label: "通勤静音" },
  },
  {
    title: "竞品话题追热点",
    category: "种草",
    industry: "食品",
    prompt: "最近有什么热点能接",
    output: "6 个机会",
    duration: "30 分钟",
    uses: ["signal", "idea", "remix"],
    cover: { from: "#E9F7FF", to: "#E8F8EE", label: "办公室下午三点" },
  },
  {
    title: "季度内容日历",
    category: "大促",
    industry: "运动",
    prompt: "排下个季度的内容",
    output: "96 条任务",
    duration: "1 小时",
    uses: ["signal", "play", "idea"],
    cover: { from: "#F0EBFF", to: "#FFEAF2", label: "第一个 5 公里" },
  },
] as const satisfies readonly Case[];

export const ALL_CASES = "全部";
export type CaseFilter = typeof ALL_CASES | CaseCategory;
export const caseFilters: readonly CaseFilter[] = [ALL_CASES, ...caseCategories];

export function filterCases(filter: CaseFilter, list: readonly Case[] = cases): readonly Case[] {
  return filter === ALL_CASES ? list : list.filter((c) => c.category === filter);
}
