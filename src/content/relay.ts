import type { PluginKey } from "./plugins";

export type RelayStep = {
  readonly plugin: PluginKey;
  readonly title: string;
  readonly call: string;
  readonly status: string;
  readonly result: string;
  readonly detail: readonly string[];
  /** 需要用户确认花费的步骤。 */
  readonly confirm?: string;
};

export const relayPrompt = "下周小红书要做 8 条新品种草，素材在 ./0612-shoot";

/** 首屏下方「一句话，五个角色接力」的演示脚本，按插件顺序依次点亮。 */
export const relaySteps = [
  {
    plugin: "signal",
    title: "先找机会",
    call: "clipo_search_evidence",
    status: "检索访谈和笔记",
    result: "找到 3 条信号",
    detail: ["两份访谈都提到「饭后收尾负担」", "「租房厨房」话题近两周升温"],
  },
  {
    plugin: "play",
    title: "再排日程",
    call: "clipo_create_calendar",
    status: "排一周内容",
    result: "排好一周日历",
    detail: ["周二 3 条场景", "周四 3 条实测，周六 2 条合集"],
  },
  {
    plugin: "idea",
    title: "批量出方向",
    call: "clipo_start_idea_generation",
    status: "探索 24 个候选",
    result: "整理成 4 个方向",
    detail: ["推荐「厨房也该下班」", "另有小空间、分工、实测三个方向"],
  },
  {
    plugin: "asset",
    title: "找能用的素材",
    call: "clipo_search_assets",
    status: "理解 42 段素材",
    result: "找到 18 段可用",
    detail: ["「加水动作」在 A-03 第 2–5 秒", "3 段授权过期，已跳过"],
  },
  {
    plugin: "remix",
    title: "做出来",
    call: "clipo_render",
    status: "生成脚本和分镜",
    result: "8 条成片方案就绪",
    detail: ["已通过品牌规范检查"],
    confirm: "预计消耗 320 额度，确认生成？",
  },
] as const satisfies readonly RelayStep[];
