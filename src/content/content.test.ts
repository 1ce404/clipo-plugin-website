import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_CASES, caseCategories, cases, filterCases } from "./cases";
import { compareRows, groupCompareRows } from "./compare";
import { agents, hosts } from "./hosts";
import { pluginByKey, pluginKeys, plugins } from "./plugins";
import { ALL_POSTS, adjacentPosts, filterPosts, getPost, posts } from "./posts";
import { packages } from "./pricing";
import { relaySteps } from "./relay";

const publicDir = join(process.cwd(), "public");

describe("插件", () => {
  it("五个插件各出现一次，顺序和 pluginKeys 一致", () => {
    expect(plugins.map((p) => p.key)).toEqual([...pluginKeys]);
  });

  it("pluginByKey 覆盖所有插件", () => {
    for (const key of pluginKeys) expect(pluginByKey[key].key).toBe(key);
  });
});

describe("接力演示", () => {
  it("五个插件依次出场，各一步", () => {
    expect(relaySteps.map((s) => s.plugin)).toEqual([...pluginKeys]);
  });

  it("只有最后一步需要确认花费", () => {
    const withConfirm = relaySteps.filter((s) => "confirm" in s);
    expect(withConfirm.map((s) => s.plugin)).toEqual(["remix"]);
  });
});

describe("Agent 图标", () => {
  it("名称和图标不重复", () => {
    expect(new Set(agents.map((a) => a.name)).size).toBe(agents.length);
    expect(new Set(agents.map((a) => a.icon)).size).toBe(agents.length);
  });

  it("每个图标在 public/agents 里都有对应文件", () => {
    for (const a of agents) expect(existsSync(join(publicDir, "agents", `${a.icon}.svg`)), a.icon).toBe(true);
  });

  it("首屏可切换的宿主都在图标墙里", () => {
    const names = agents.map((a) => a.name);
    for (const h of hosts) expect(names).toContain(h.name);
  });
});

describe("案例", () => {
  it("每个案例的分类都在筛选项里", () => {
    for (const c of cases) expect(caseCategories).toContain(c.category);
  });

  it("「全部」返回所有案例，其余按分类筛选", () => {
    expect(filterCases(ALL_CASES)).toHaveLength(cases.length);
    for (const cat of caseCategories) {
      expect(filterCases(cat).every((c) => c.category === cat)).toBe(true);
    }
  });
});

describe("能力对比", () => {
  it("分组后不丢行，组的顺序按首次出现", () => {
    const groups = groupCompareRows();
    expect(groups.flatMap((g) => g.items)).toHaveLength(compareRows.length);
    expect(groups[0]?.name).toBe(compareRows[0]?.group);
  });

  it("「部分能」都带说明", () => {
    for (const row of compareRows) {
      if (row.agent === "part") expect("agentNote" in row && row.agentNote).toBeTruthy();
    }
  });
});

describe("套餐", () => {
  it("只有一个主推套餐，且包含全部插件", () => {
    const featured = packages.filter((p) => "featured" in p && p.featured);
    expect(featured).toHaveLength(1);
    expect([...(featured[0]?.includes ?? [])].sort()).toEqual([...pluginKeys].sort());
  });
});

describe("博客", () => {
  it("slug 唯一且只含小写字母、数字和连字符", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const p of posts) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("按日期从新到旧排列，日期是 YYYY-MM-DD", () => {
    for (const p of posts) expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("getPost 和 adjacentPosts", () => {
    const [first, second] = posts;
    expect(getPost(first.slug)).toBe(first);
    expect(getPost("missing")).toBeUndefined();
    expect(adjacentPosts(first.slug)).toEqual({ newer: undefined, older: second });
    expect(adjacentPosts("missing")).toEqual({});
  });

  it("「全部」返回所有文章", () => {
    expect(filterPosts(ALL_POSTS)).toHaveLength(posts.length);
  });
});
