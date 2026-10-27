"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { agents } from "@/content/hosts";
import { assetPath } from "@/config/site-url";
import { ease } from "@/lib/motion";

/** 直接露出的图标数量，其余收进「+N」。 */
export const VISIBLE_AGENTS = 8;

/** 重叠的 Agent 图标，悬停看名字；「+N」展开完整列表。 */
export function AgentStack() {
  const [open, setOpen] = useState(false);
  const shown = agents.slice(0, VISIBLE_AGENTS);
  const rest = agents.length - VISIBLE_AGENTS;

  return (
    <div className="agent-stack">
      <span className="as-label">支持 {agents.length} 种 Agent，持续增加中</span>
      <div className="as-row" onMouseLeave={() => setOpen(false)}>
        {shown.map((a, i) => (
          <span
            key={a.name}
            className="as-chip"
            style={{ zIndex: VISIBLE_AGENTS - i }}
            tabIndex={0}
            aria-label={a.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- 小尺寸 SVG，无需 next/image 优化 */}
            <img src={assetPath(`/agents/${a.icon}.svg`)} alt="" width={24} height={24} />
            <span className="as-tip" role="tooltip">
              {a.name}
            </span>
          </span>
        ))}
        {rest > 0 && (
          <button
            type="button"
            className={`as-chip as-more ${open ? "on" : ""}`}
            aria-expanded={open}
            aria-controls="agent-list"
            aria-label={`查看全部 ${agents.length} 种 Agent`}
            onClick={() => setOpen(true)}
            onMouseEnter={() => setOpen(true)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          >
            +{rest}
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.ul
              id="agent-list"
              className="as-pop"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease }}
            >
              {agents.map((a) => (
                <li key={a.name} className="as-item">
                  <i>
                    {/* eslint-disable-next-line @next/next/no-img-element -- 同上 */}
                    <img src={assetPath(`/agents/${a.icon}.svg`)} alt="" width={18} height={18} />
                  </i>
                  {a.name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
