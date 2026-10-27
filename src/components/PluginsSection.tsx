import { plugins } from "@/content/plugins";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** 五个插件 = 五个角色，每块只放角色、名字和一句话。 */
export function PluginsSection() {
  return (
    <section className="section" id="plugins" aria-labelledby="plugins-title">
      <div className="wrap">
        <SectionHead id="plugins-title" title="五个插件，五个角色" sub="按需开通，资料共用。" />
        <ul className="tiles">
          {plugins.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 0.06} className={`tile t-${p.key}`}>
              <span className="tile-glow" aria-hidden="true" />
              <span className="tile-role">{p.role}</span>
              <h3 className="tile-name">
                {p.name}
                {"isNew" in p && p.isNew && <span className="soon">即将推出</span>}
              </h3>
              <p className="tile-line">{p.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
