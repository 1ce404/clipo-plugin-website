import type { PluginKey } from "./plugins";

/** yes：Agent 自己能做；part：能做一部分；no：做不到。 */
export type AgentAbility = "yes" | "part" | "no";

export type CompareRow = {
  readonly group: string;
  readonly item: string;
  readonly agent: AgentAbility;
  /** `agent: "part"` 时说明能做到哪一步。 */
  readonly agentNote?: string;
  readonly clipo: string;
  /** 补上这项能力的插件；共用底座提供的能力留空。 */
  readonly plugin?: PluginKey;
};

export const compareRows = [
  { group: "理解和写作", item: "理解需求、写文案、改脚本", agent: "yes", clipo: "照常由你的 Agent 来做" },
  { group: "理解和写作", item: "分析数据、写方案", agent: "yes", clipo: "照常由你的 Agent 来做" },
  { group: "品牌", item: "知道你的产品事实和禁区", agent: "no", clipo: "共用品牌资料，只维护一份" },
  { group: "品牌", item: "说错话时拦下来", agent: "no", clipo: "强制规范，生成和交付前都检查" },
  { group: "研究", item: "公网搜索", agent: "yes", clipo: "照常可用" },
  {
    group: "研究",
    item: "私域访谈和用户反馈",
    agent: "no",
    clipo: "带出处的信号和品牌机会",
    plugin: "signal",
  },
  {
    group: "运营",
    item: "排每周发什么",
    agent: "part",
    agentNote: "能写，但不会追踪",
    clipo: "内容日历，派任务，到期复盘",
    plugin: "play",
  },
  {
    group: "创意",
    item: "想点子",
    agent: "part",
    agentNote: "一次三五个",
    clipo: "一次几十个，整理成方向",
    plugin: "idea",
  },
  { group: "创意", item: "下次接着做", agent: "no", clipo: "构想、依据、每一版都存着", plugin: "idea" },
  { group: "素材", item: "看懂视频画面", agent: "no", clipo: "转录、镜头定位、片段检索", plugin: "asset" },
  { group: "素材", item: "记得授权和有效期", agent: "no", clipo: "过期素材自动跳过", plugin: "asset" },
  { group: "制作", item: "批量生成、渲染成片", agent: "no", clipo: "按脚本批量出片", plugin: "remix" },
  { group: "团队", item: "老板和同事一起评审", agent: "no", clipo: "每个方向和成片都有网页链接" },
  { group: "团队", item: "换个 Agent 继续用", agent: "no", clipo: "资料和成果都存在 Clipo" },
] as const satisfies readonly CompareRow[];

/** 按首次出现的顺序分组，供表格渲染。 */
export function groupCompareRows(rows: readonly CompareRow[] = compareRows) {
  const groups = new Map<string, CompareRow[]>();
  for (const row of rows) {
    const list = groups.get(row.group) ?? [];
    list.push(row);
    groups.set(row.group, list);
  }
  return [...groups].map(([name, items]) => ({ name, items }));
}
