"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { ALL_CASES, caseFilters, filterCases, type Case, type CaseFilter } from "@/content/cases";
import { pluginByKey } from "@/content/plugins";
import { ease } from "@/lib/motion";
import { FilterTabs } from "./FilterTabs";
import { SectionHead } from "./SectionHead";

export function CasesSection() {
  const [filter, setFilter] = useState<CaseFilter>(ALL_CASES);
  const list = filterCases(filter);

  return (
    <section className="section" id="cases" aria-labelledby="cases-title">
      <div className="wrap">
        <div className="cases-top">
          <SectionHead id="cases-title" title="一句话，做完一个项目" />
          <FilterTabs
            id="case-filter"
            label="案例分类"
            options={caseFilters}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <LayoutGroup>
          <motion.div layout className="cases">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((c) => (
                <motion.article
                  key={c.title}
                  layout
                  className="case"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <CaseCard item={c} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <p className="note">案例为示意，数据仅供演示。</p>
      </div>
    </section>
  );
}

function CaseCard({ item }: { item: Case }) {
  return (
    <>
      <div
        className="case-cover"
        style={{ background: `linear-gradient(135deg, ${item.cover.from}, ${item.cover.to})` }}
      >
        <span className="cc-tag">{item.category}</span>
        <span className="cc-label">「{item.cover.label}」</span>
        <span className="cc-prompt">
          <i aria-hidden="true">你</i>
          {item.prompt}
        </span>
      </div>
      <div className="case-body">
        <div className="case-title">
          <h3>{item.title}</h3>
          <span>{item.industry}</span>
        </div>
        <dl className="case-stats">
          <div>
            <dt>产出</dt>
            <dd>{item.output}</dd>
          </div>
          <div>
            <dt>用时</dt>
            <dd>{item.duration}</dd>
          </div>
        </dl>
        <ul className="case-uses" aria-label="用到的插件">
          {item.uses.map((u) => (
            <li key={u} className={`cu t-${u}`}>
              {pluginByKey[u].name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
