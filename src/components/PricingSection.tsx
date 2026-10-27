import Link from "next/link";
import { plugins } from "@/content/plugins";
import { packages } from "@/content/pricing";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function PricingSection() {
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="wrap">
        <SectionHead
          id="pricing-title"
          title="需要哪些角色，就开哪些"
          sub="订阅开通插件，生成和渲染按额度扣。"
        />
        <ul className="pkgs">
          {packages.map((pkg, i) => {
            const featured = "featured" in pkg && pkg.featured;
            return (
              <Reveal as="li" key={pkg.name} delay={i * 0.05} className={`pkg ${featured ? "featured" : ""}`}>
                <h3>{pkg.name}</h3>
                <p>{pkg.line}</p>
                <ul className="pkg-roles" aria-label={`包含 ${pkg.includes.length} 个插件`}>
                  {plugins.map((pl) => {
                    const included = (pkg.includes as readonly string[]).includes(pl.key);
                    return (
                      <li key={pl.key} className={`pr t-${pl.key} ${included ? "in" : ""}`}>
                        <i aria-hidden="true" />
                        {pl.name}
                        <span className="visually-hidden">{included ? "（包含）" : "（不包含）"}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link href="/#contact" className={`btn ${featured ? "light" : "ghost"}`}>
                  {featured ? "联系我们" : "查看价格"}
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
