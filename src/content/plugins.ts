export const pluginKeys = ["signal", "play", "idea", "asset", "remix"] as const;

export type PluginKey = (typeof pluginKeys)[number];

export type Plugin = {
  readonly key: PluginKey;
  readonly name: string;
  readonly role: string;
  readonly line: string;
  /** 尚未上线的插件，页面上标「即将推出」。 */
  readonly isNew?: boolean;
};

export const plugins = [
  { key: "signal", name: "Signal", role: "研究员", line: "找到值得做的机会" },
  { key: "play", name: "Play", role: "运营", line: "排好每周发什么", isNew: true },
  { key: "idea", name: "Idea", role: "创意", line: "一次探索几十个方向" },
  { key: "asset", name: "Asset", role: "素材", line: "看懂你的每一段素材" },
  { key: "remix", name: "Remix", role: "制作", line: "批量做出成片" },
] as const satisfies readonly Plugin[];

export const pluginByKey: Readonly<Record<PluginKey, Plugin>> = Object.fromEntries(
  plugins.map((p) => [p.key, p]),
) as Record<PluginKey, Plugin>;
