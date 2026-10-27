import { describe, expect, it } from "vitest";
import { formatChineseDate } from "./date";

describe("formatChineseDate", () => {
  it("去掉月和日的前导零", () => {
    expect(formatChineseDate("2026-10-08")).toBe("2026 年 10 月 8 日");
    expect(formatChineseDate("2026-01-20")).toBe("2026 年 1 月 20 日");
  });

  it("拒绝不是 YYYY-MM-DD 的输入", () => {
    expect(() => formatChineseDate("2026/10/08")).toThrow(/YYYY-MM-DD/);
  });
});
