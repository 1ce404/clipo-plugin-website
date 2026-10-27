"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { siteProfile } from "@/config/site-profile";
import { useInterval, usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { AgentStack } from "./AgentStack";
import { InstallCommand } from "./InstallCommand";
import { Lights } from "./Lights";

export const HOST_WORDS = ["你的 Agent", "Codex", "WorkBuddy", "Claude Code"] as const;
const ROTATE_MS = 2400;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % HOST_WORDS.length), []);
  useInterval(next, ROTATE_MS, !reduced);
  const rise = (delay: number, y = 16) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <header className="hero">
      <Lights />
      <div className="wrap hero-inner">
        <h1 className="hero-title" aria-label={siteProfile.tagline}>
          <span className="ht-line" aria-hidden="true">
            <HostWord word={HOST_WORDS[index] ?? HOST_WORDS[0]} reduced={reduced} />
            <span className="op">+</span>
            <span>Clipo</span>
          </span>
          <motion.span className="ht-line ht-result" aria-hidden="true" {...rise(0.15, 30)}>
            <span className="op">=</span> 一支营销团队
          </motion.span>
        </h1>

        <motion.p className="hero-sub" {...rise(0.3)}>
          研究、运营、创意、素材、制作，装进你已经在用的 Agent。
        </motion.p>

        <motion.div {...rise(0.42)}>
          <InstallCommand id="hero-install" />
        </motion.div>

        <motion.div {...rise(0.6, 10)}>
          <AgentStack />
        </motion.div>
      </div>
    </header>
  );
}

/** 轮换的宿主名，黑色底框按每个词的宽度平滑伸缩。 */
function HostWord({ word, reduced }: { word: string; reduced: boolean }) {
  const measure = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = measure.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    // 字体加载完成后宽度会变，持续跟踪
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [word]);

  return (
    <motion.span
      className="host-slot"
      animate={width ? { width } : undefined}
      transition={reduced ? { duration: 0 } : { duration: 0.7, ease }}
    >
      <span ref={measure} className="host-measure">
        {word}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="host-word"
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
