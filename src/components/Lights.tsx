"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";
import type { PluginKey } from "@/content/plugins";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

const orbs: readonly { plugin: PluginKey; x: number; y: number; size: number }[] = [
  { plugin: "signal", x: 14, y: 22, size: 46 },
  { plugin: "play", x: 78, y: 14, size: 40 },
  { plugin: "idea", x: 54, y: 62, size: 52 },
  { plugin: "asset", x: 8, y: 78, size: 38 },
  { plugin: "remix", x: 90, y: 70, size: 42 },
];

type LightsProps = {
  /** 只点亮某个插件的光晕；不传则全部点亮。 */
  active?: PluginKey | null;
  dim?: boolean;
};

/** 五个插件颜色的柔光，是全站唯一的装饰元素，跟随指针缓慢漂移。 */
export function Lights({ active = null, dim = false }: LightsProps) {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  return (
    <div className={`lights ${dim ? "dim" : ""}`} aria-hidden="true">
      {orbs.map((o, i) => (
        <Orb
          key={o.plugin}
          {...o}
          depth={(i % 2 ? -1 : 1) * (18 + i * 6)}
          sx={sx}
          sy={sy}
          on={!active || active === o.plugin}
        />
      ))}
    </div>
  );
}

type OrbProps = {
  plugin: PluginKey;
  x: number;
  y: number;
  size: number;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  on: boolean;
};

function Orb({ plugin, x, y, size, depth, sx, sy, on }: OrbProps) {
  const tx = useTransform(sx, (v) => v * depth);
  const ty = useTransform(sy, (v) => v * depth);
  return (
    <motion.span
      className={`orb o-${plugin}`}
      style={{ left: `${x}%`, top: `${y}%`, width: `${size}vmax`, height: `${size}vmax`, x: tx, y: ty }}
      animate={{ opacity: on ? 1 : 0.18, scale: on ? 1 : 0.85 }}
      transition={{ duration: 1.1, ease }}
    />
  );
}
