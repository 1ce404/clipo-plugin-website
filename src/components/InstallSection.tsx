import { connectWays, installSteps } from "@/content/pricing";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function InstallSection() {
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <div className="wrap connect">
        <SectionHead id="install-title" title="三步装好" sub="一条命令，Skill、MCP、CLI 一起装。" />
        <ol className="steps3">
          {installSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="step3">
              <span className="s3-n" aria-hidden="true">
                {i + 1}
              </span>
              <b>{step.title}</b>
              <span>{step.detail}</span>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2} className="ways-row">
          {connectWays.map((w) => (
            <span key={w.name} className="way-pill">
              <code>{w.name}</code>
              {w.line}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
