/**
 * 粘性演示区的滚动进度（0–1）对应到第几步。
 * 末尾多留 2% 余量，保证滚到底之前就停在最后一步。
 */
export function stageForProgress(progress: number, steps: number): number {
  if (steps <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(steps - 1, Math.floor(clamped * steps * 1.02));
}

/** 演示窗口里的「工作中 Xm XXs」计时。 */
export function formatElapsed(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}
