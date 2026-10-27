import Link from "next/link";
import { siteProfile } from "@/config/site-profile";
import { footerColumns } from "@/content/navigation";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <BrandMark size={22} />
            <span>{siteProfile.name}</span>
          </div>
          <p>{siteProfile.tagline}</p>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <b>{col.title}</b>
            {col.links.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="wrap footer-base">
        © {siteProfile.copyrightYear} {siteProfile.name}。第三方 Agent 的名称和图标归各自所有者所有，图标来自{" "}
        <a href="https://github.com/lobehub/lobe-icons" rel="noreferrer" target="_blank">
          LobeHub Icons
        </a>
        。
      </div>
    </footer>
  );
}
