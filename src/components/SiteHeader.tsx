"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteProfile } from "@/config/site-profile";
import { defaultHost } from "@/content/hosts";
import { navItems } from "@/content/navigation";
import { useCopy } from "@/lib/hooks";
import { BrandMark } from "./BrandMark";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const pathname = usePathname();
  const onBlog = pathname.startsWith("/blog");
  const { copied, copy } = useCopy();

  return (
    <div className="nav-holder">
      <nav className={`nav ${scrolled || onBlog ? "floating" : ""}`} aria-label="主导航">
        <Link href="/" className="brand" aria-label={`${siteProfile.name} 首页`}>
          <BrandMark size={26} />
          <span>{siteProfile.name}</span>
        </Link>
        <div className="nav-links">
          {navItems.map((item) => {
            const active = item.href === "/blog" && onBlog;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "on" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link className="nav-login" href="/#contact">
          登录
        </Link>
        <button type="button" className="nav-cta" onClick={() => copy(defaultHost.install)}>
          {copied ? "已复制 ✓" : "免费开始"}
        </button>
      </nav>
    </div>
  );
}
