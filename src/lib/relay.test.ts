import { describe, expect, it } from "vitest";
import { formatElapsed, stageForProgress } from "./relay";

describe("stageForProgress", () => {
  it("从第一步开始，滚到底停在最后一步", () => {
    expect(stageForProgress(0, 5)).toBe(0);
    expect(stageForProgress(1, 5)).toBe(4);
  });

  it("按进度均分到每一步", () => {
    expect(stageForProgress(0.25, 5)).toBe(1);
    expect(stageForProgress(0.5, 5)).toBe(2);
  });

  it("超出 0–1 的进度会被截断", () => {
    expect(stageForProgress(-0.3, 5)).toBe(0);
    expect(stageForProgress(1.7, 5)).toBe(4);
  });

  it("没有步骤时返回 0", () => {
    expect(stageForProgress(0.5, 0)).toBe(0);
  });
});

describe("formatElapsed", () => {
  it("补齐两位秒数", () => {
    expect(formatElapsed(12)).toBe("0m 12s");
    expect(formatElapsed(65)).toBe("1m 05s");
  });

  it("负数和小数按 0 和整秒处理", () => {
    expect(formatElapsed(-4)).toBe("0m 00s");
    expect(formatElapsed(9.9)).toBe("0m 09s");
  });
});
