"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** 跟随系统的「减少动态效果」设置。服务端渲染时视为未开启。 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** 复制文本到剪贴板，并在 `timeout` 毫秒内返回已复制的值用于反馈。 */
export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // 剪贴板不可用时（非安全上下文等）仍然给出视觉反馈
      }
      setCopied(text);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), timeout);
    },
    [timeout],
  );
  return { copied, copy };
}

/** `enabled` 为 false 时停止计时。 */
export function useInterval(callback: () => void, ms: number, enabled = true) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => saved.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, enabled]);
}
