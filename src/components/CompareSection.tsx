"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { groupCompareRows, type AgentAbility } from "@/content/compare";
import { pluginByKey, type PluginKey } from "@/content/plugins";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { SectionHead } from "./SectionHead";

const abilityLabel: Record<AgentAbility, string> = { yes: "能", part: "部分能", no: "不能" };

/** 能力对比表：只用 Agent 能做什么，装上 Clipo 后多了什么。 */
export function CompareSection() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const shown = reduced || inView;
  let rowIndex = 0;

  return (
    <section className="section" id="compare" aria-labelledby="compare-title">
      <div className="wrap">
        <SectionHead id="compare-title" title="装上 Clipo，你的 Agent 多了什么" />
        <div className="sheet" ref={ref} role="table" aria-labelledby="compare-title">
          <div className="sheet-head" role="row">
            <span role="columnheader">能力</span>
            <span role="columnheader">只用你的 Agent</span>
            <span role="columnheader" className="sh-clipo">
              <span className="sh-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              你的 Agent + Clipo
            </span>
          </div>
          {groupCompareRows().map((group) => (
            <div key={group.name} className="sheet-group" role="rowgroup">
              <div className="sg-name" role="row">
                <span role="rowheader">{group.name}</span>
              </div>
              {group.items.map((row) => {
                const delay = shown ? rowIndex++ * 0.04 : 0;
                return (
                  <motion.div
                    key={row.item}
                    className="sheet-row"
                    role="row"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={shown ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.5, ease, delay }}
                  >
                    <span role="cell" className="sr-item">
                      {row.item}
                    </span>
                    <span role="cell" className={`sr-agent ${row.agent}`}>
                      <AbilityMark kind={row.agent} />
                      {row.agent === "part" && row.agentNote && <em>{row.agentNote}</em>}
                      <span className="visually-hidden">{abilityLabel[row.agent]}</span>
                    </span>
                    <span role="cell" className="sr-clipo">
                      <AbilityMark kind="yes" plugin={row.plugin} />
                      <span className="sr-text">{row.clipo}</span>
                      {row.plugin && (
                        <span className={`sr-plugin t-${row.plugin}`}>{pluginByKey[row.plugin].name}</span>
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AbilityMark({ kind, plugin }: { kind: AgentAbility; plugin?: PluginKey | undefined }) {
  const tint = kind === "yes" && plugin ? ` t-${plugin}` : "";
  return <span className={`mk mk-${kind}${tint}`} aria-hidden="true" />;
}
