import type { PluginKey } from "./plugins";

export const postTags = ["产品", "方法", "案例", "更新"] as const;
export type PostTag = (typeof postTags)[number];

export type Block =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly text: string }
  | { readonly type: "quote"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] }
  | { readonly type: "code"; readonly text: string };

export type Post = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly tag: PostTag;
  /** 发布日期，ISO 格式 YYYY-MM-DD；sitemap 的 lastModified 用它，不用构建时间。 */
  readonly date: string;
  readonly minutes: number;
  readonly plugin?: PluginKey;
  readonly body: readonly Block[];
};

/** 按发布日期从新到旧排列。 */
export const posts = [
  {
    slug: "why-plugins",
    title: "为什么我们不做又一个 Agent",
    summary: "通用 Agent 越来越强。我们决定把 Clipo 装进你已经在用的 Agent 里。",
    tag: "产品",
    date: "2026-10-28",
    minutes: 4,
    body: [
      {
        type: "p",
        text: "Codex、WorkBuddy、Claude Code 已经很会理解需求、写文案、分析数据。再做一个 Agent，只是在和它们比谁更聪明。",
      },
      {
        type: "p",
        text: "它们缺的是你的生意：品牌的事实和禁区、私域的用户反馈、手里的素材，以及能批量做出成片的能力。",
      },
      { type: "h2", text: "我们只做 Agent 做不了的事" },
      {
        type: "list",
        items: [
          "品牌资料和规范，只维护一份",
          "批量探索几十个创意方向",
          "看懂素材、记得授权",
          "按脚本批量生成和渲染",
        ],
      },
      { type: "quote", text: "你的 Agent 负责思考，Clipo 负责它没有的资料和生产能力。" },
      { type: "p", text: "所以我们把 Clipo 拆成五个插件。装上哪个，你的 Agent 就多一个角色。" },
    ],
  },
  {
    slug: "idea-batch",
    title: "一次探索 24 个方向，是怎么做到的",
    summary: "Idea 在后台并行跑多条创意路线，再把重复的整理掉。",
    tag: "方法",
    date: "2026-10-24",
    minutes: 5,
    plugin: "idea",
    body: [
      {
        type: "p",
        text: "让 Agent 想点子，它通常给你三五个。想要更多，就得一轮轮追问，再自己从一堆相似的说法里挑。",
      },
      { type: "h2", text: "并行探索，再整理" },
      {
        type: "p",
        text: "Idea 会按洞察、产品特征、语言、画面等不同路线同时探索，跑完后把机制相同的候选归到一组，给出代表候选和主要差异。",
      },
      { type: "code", text: "clipo_start_idea_generation → clipo_get_idea_generation → clipo_create_idea" },
      { type: "h2", text: "分组只是建议" },
      {
        type: "p",
        text: "原始候选都保留着，随时可以展开。我们不用模型打分替你做决定，最后选哪个，由你和团队来定。",
      },
    ],
  },
  {
    slug: "dishwasher-case",
    title: "案例：一天做完 8 条小红书种草",
    summary: "一个桌面洗碗机品牌，用五个插件跑完了从机会到成片的一轮。",
    tag: "案例",
    date: "2026-10-20",
    minutes: 6,
    plugin: "remix",
    body: [
      { type: "p", text: "需求只有一句话：下周小红书要做 8 条新品种草，素材在 ./0612-shoot。" },
      {
        type: "list",
        items: [
          "Signal：两份访谈都提到「饭后收尾负担」",
          "Play：排成周二、周四、周六三批",
          "Idea：24 个候选整理成 4 个方向",
          "Asset：42 段素材里找到 18 段可用",
          "Remix：生成 8 条成片，花额度前先确认",
        ],
      },
      { type: "quote", text: "最省时间的不是生成，而是不用再从头整理资料。" },
      { type: "p", text: "规范里写着禁止说「完全免清洁」，第 3 镜的字幕因此被拦下，改写后才进入生成。" },
    ],
  },
  {
    slug: "brand-rules",
    title: "让 Agent 记住你的品牌禁区",
    summary: "强制规范在审核、生成和交付时都会检查，说错的话进不了成片。",
    tag: "方法",
    date: "2026-10-16",
    minutes: 3,
    body: [
      { type: "p", text: "每个品牌都有不能说的话：功效宣称、竞品对比、平台敏感词。靠人记，迟早漏掉。" },
      { type: "h2", text: "规范只维护一份" },
      {
        type: "p",
        text: "在 Clipo 里写一次规范，五个插件都会遵守。被否掉的表达也会被记下来，下次你的 Agent 自然就知道。",
      },
      { type: "list", items: ["必须、禁止、建议三档", "可以指定到品牌或某个产品", "强制规范冲突时阻止生成"] },
    ],
  },
  {
    slug: "workbuddy-launch",
    title: "Clipo 现已支持 WorkBuddy",
    summary: "在技能市场搜索 Clipo，一键添加，和 Codex 共用同一份额度。",
    tag: "更新",
    date: "2026-10-12",
    minutes: 2,
    body: [
      { type: "p", text: "WorkBuddy 用户现在可以在技能市场直接添加 Clipo，不用敲命令。" },
      { type: "p", text: "登录同一个账号后，WorkBuddy、Codex 和网页用的是同一个工作空间和同一份额度。" },
    ],
  },
  {
    slug: "asset-rights",
    title: "素材授权过期了，Agent 怎么知道",
    summary: "Asset 记得每段素材的使用权和有效期，过期的会被自动跳过。",
    tag: "产品",
    date: "2026-10-08",
    minutes: 3,
    plugin: "asset",
    body: [
      { type: "p", text: "达人授权半年、模特肖像权一年、音乐只能用在某个平台。素材一多，谁都记不住。" },
      {
        type: "p",
        text: "Asset 为每段素材记录授权范围和有效期。Remix 生成前会重新检查，无法确认的素材不会被用进成片。",
      },
    ],
  },
] as const satisfies readonly Post[];

export const ALL_POSTS = "全部";
export type PostFilter = typeof ALL_POSTS | PostTag;
export const postFilters: readonly PostFilter[] = [ALL_POSTS, ...postTags];

export function filterPosts(filter: PostFilter, list: readonly Post[] = posts): readonly Post[] {
  return filter === ALL_POSTS ? list : list.filter((p) => p.tag === filter);
}

/** 每类文章封面的渐变色。 */
export const coverTint: Record<PostTag, readonly [string, string]> = {
  产品: ["#E7EEFF", "#F1E9FF"],
  方法: ["#F0EBFF", "#FFEAF2"],
  案例: ["#FFF1DC", "#FFE6EC"],
  更新: ["#DDF5EC", "#E7F0FF"],
};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** 文章页底部的「较新 / 较早」导航。 */
export function adjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}
