import { InstallCommand } from "./InstallCommand";
import { Lights } from "./Lights";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="final" id="contact" aria-labelledby="contact-title">
      <Lights />
      <div className="wrap final-inner">
        <Reveal>
          <h2 className="final-title" id="contact-title">
            给你的 Agent
            <br />
            一支营销团队
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <InstallCommand id="final-install" />
          <p className="final-sub">新工作空间送体验额度</p>
        </Reveal>
      </div>
    </section>
  );
}
