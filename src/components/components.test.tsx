import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { compareRows } from "@/content/compare";
import { agents } from "@/content/hosts";
import { AgentStack, VISIBLE_AGENTS } from "./AgentStack";
import { CasesSection } from "./CasesSection";
import { CompareSection } from "./CompareSection";
import { FaqSection } from "./FaqSection";
import { InstallCommand } from "./InstallCommand";

describe("InstallCommand", () => {
  it("默认显示 Codex 的安装命令，切换宿主后命令跟着变", async () => {
    const user = userEvent.setup();
    render(<InstallCommand id="test" />);
    expect(screen.getByText("codex plugin add clipo")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Claude Code" }));
    expect(await screen.findByText("claude plugin install clipo")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Claude Code" })).toHaveAttribute("aria-selected", "true");
  });

  it("WorkBuddy 没有命令行，不显示复制按钮", async () => {
    const user = userEvent.setup();
    render(<InstallCommand id="test" />);
    await user.click(screen.getByRole("tab", { name: "WorkBuddy" }));
    expect(await screen.findByText(/技能市场/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "复制" })).not.toBeInTheDocument();
  });
});

describe("AgentStack", () => {
  it("直接露出前几个图标，其余收进 +N，点开能看到全部", async () => {
    const user = userEvent.setup();
    render(<AgentStack />);
    const more = screen.getByRole("button", { name: `查看全部 ${agents.length} 种 Agent` });
    expect(more).toHaveTextContent(`+${agents.length - VISIBLE_AGENTS}`);

    await user.click(more);
    const list = await screen.findByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(agents.length);
  });
});

describe("CasesSection", () => {
  it("按分类筛选案例", async () => {
    const user = userEvent.setup();
    render(<CasesSection />);
    expect(screen.getAllByRole("article")).toHaveLength(6);

    await user.click(screen.getByRole("tab", { name: "大促" }));
    // 退出动画结束后被筛掉的卡片才会离开 DOM
    await waitFor(() => expect(screen.getAllByRole("article")).toHaveLength(2));
    const titles = screen.getAllByRole("article").map((a) => within(a).getByRole("heading").textContent);
    expect(titles).toEqual(["618 抖音投放素材", "季度内容日历"]);
  });
});

describe("CompareSection", () => {
  it("每条能力一行，并给出屏幕阅读器可读的「能 / 不能」", () => {
    render(<CompareSection />);
    const table = screen.getByRole("table");
    const rows = within(table)
      .getAllByRole("row")
      .filter((r) => within(r).queryAllByRole("cell").length > 0);
    expect(rows).toHaveLength(compareRows.length);
    expect(within(table).getAllByText("不能").length).toBeGreaterThan(0);
  });
});

describe("FaqSection", () => {
  it("点击问题展开答案，再点收起", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const q = screen.getByRole("button", { name: /要换掉现在用的 Agent 吗/ });
    expect(q).toHaveAttribute("aria-expanded", "false");

    await user.click(q);
    expect(q).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByText(/装进你现有的 Codex/)).toBeInTheDocument();
  });
});
