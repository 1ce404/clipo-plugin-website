"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { hosts, type HostId } from "@/content/hosts";
import { useCopy } from "@/lib/hooks";
import { spring } from "@/lib/motion";

type InstallCommandProps = {
  /** 同一页面出现两次时，用不同的 id 避免切换动画互相干扰。 */
  id: string;
};

/** 按宿主 Agent 切换的安装命令，带复制按钮。 */
export function InstallCommand({ id }: InstallCommandProps) {
  const [hostId, setHostId] = useState<HostId>("codex");
  const { copied, copy } = useCopy();
  const current = hosts.find((h) => h.id === hostId) ?? hosts[0];

  return (
    <div className="install">
      <div className="install-tabs" role="tablist" aria-label="选择你的 Agent">
        {hosts.map((h) => {
          const selected = hostId === h.id;
          return (
            <button
              key={h.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={selected ? "on" : ""}
              onClick={() => setHostId(h.id)}
            >
              {selected && <motion.span layoutId={`${id}-pill`} className="tab-pill" transition={spring} />}
              <span className="tab-label">{h.name}</span>
            </button>
          );
        })}
      </div>
      <div className="install-line">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.id}
            className="install-cmd"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {current.command ? (
              <code>
                <span className="prompt">$</span>
                {current.install}
              </code>
            ) : (
              <span className="install-text">{current.install}</span>
            )}
          </motion.span>
        </AnimatePresence>
        {current.command && (
          <button type="button" className="copy" onClick={() => copy(current.install)}>
            {copied === current.install ? "已复制 ✓" : "复制"}
          </button>
        )}
      </div>
    </div>
  );
}
