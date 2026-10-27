"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const NAV_OFFSET = -80;

/**
 * 全站平滑滚动。挂在根布局里，开启「减少动态效果」时不启用。
 * 切换页面时重新计算页面高度，并处理带 #锚点 的跳转。
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor || anchor.origin !== window.location.origin) return;
      if (anchor.pathname !== window.location.pathname) return; // 跨页面交给 next/link
      const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", anchor.hash);
      lenis.scrollTo(target, { offset: NAV_OFFSET });
    };
    document.addEventListener("click", onClick);

    // 从其他页面带锚点进来时：Next 会先按元素顶部对齐滚一次，这里等它和布局都稳定后，
    // 再按导航高度校正，避免标题被悬浮导航挡住。
    const hash = window.location.hash.slice(1);
    let settle = 0;
    if (hash) {
      settle = window.setTimeout(() => {
        lenis.resize();
        const target = document.getElementById(decodeURIComponent(hash));
        if (target) lenis.scrollTo(target, { offset: NAV_OFFSET, immediate: true, force: true });
      }, 120);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced, pathname]);

  return null;
}
