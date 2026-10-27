"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { pluginByKey } from "@/content/plugins";
import { relayPrompt, relaySteps, type RelayStep } from "@/content/relay";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { formatElapsed, stageForProgress } from "@/lib/relay";
import { Lights } from "./Lights";

/** 每一步占用的滚动距离（vh）。 */
const VH_PER_STEP = 70;

/**
 * 全站唯一的重头戏：粘性的 Agent 窗口。往下滚动时五个插件依次被调用，
 * 左侧步骤、窗口内容和背景光晕一起切换。开启「减少动态效果」时改成静态列表。
 */
export function RelaySection() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(stageForProgress(v, relaySteps.length)));

  if (reduced) return <RelayStatic />;

  const active = relaySteps[stage]?.plugin ?? null;
  return (
    <section
      className="relay"
      id="relay"
      ref={ref}
      aria-labelledby="relay-title"
      style={{ height: `${relaySteps.length * VH_PER_STEP + 40}vh` }}
    >
      <div className="relay-sticky">
        <Lights active={active} dim />
        <div className="wrap relay-grid">
          <div className="relay-copy">
            <h2 className="relay-head" id="relay-title">
              一句话，
              <br />
              五个角色接力
            </h2>
            <ol className="relay-list">
              {relaySteps.map((s, i) => (
                <li
                  key={s.plugin}
                  className={`t-${s.plugin} ${i === stage ? "now" : i < stage ? "done" : ""}`}
                  aria-current={i === stage ? "step" : undefined}
                >
                  <span className="rl-dot" />
                  <span className="rl-name">{pluginByKey[s.plugin].name}</span>
                  <span className="rl-title">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
          <AgentWindow stage={stage} confirmed={confirmed} onConfirm={() => setConfirmed(true)} />
        </div>
      </div>
    </section>
  );
}

type AgentWindowProps = { stage: number; confirmed: boolean; onConfirm: () => void };

function AgentWindow({ stage, confirmed, onConfirm }: AgentWindowProps) {
  return (
    <div className="agent" role="group" aria-label="演示：Agent 依次调用 Clipo 的五个插件">
      <div className="agent-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="agent-title">Codex ~/brand/一平方</span>
        <span className="agent-time">工作中 {formatElapsed(12 + stage * 23)}</span>
      </div>
      <div className="agent-body">
        <div className="msg-you">
          <span className="avatar" aria-hidden="true">
            你
          </span>
          <p>{relayPrompt}</p>
        </div>
        <ol className="calls">
          {relaySteps.map((s, i) => (
            <CallRow
              key={s.plugin}
              step={s}
              state={i < stage ? "done" : i === stage ? "now" : "todo"}
              confirmed={confirmed}
              onConfirm={onConfirm}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

type CallState = "done" | "now" | "todo";

function CallRow({
  step,
  state,
  confirmed,
  onConfirm,
}: {
  step: RelayStep;
  state: CallState;
  confirmed: boolean;
  onConfirm: () => void;
}) {
  const plugin = pluginByKey[step.plugin];
  const stateLabel = state === "done" ? "完成" : state === "now" ? step.status : "等待";
  return (
    <motion.li
      className={`call t-${plugin.key} ${state}`}
      layout
      transition={{ layout: { duration: 0.5, ease } }}
    >
      <div className="call-head">
        <span className="call-chip">{plugin.name}</span>
        <code>{step.call}</code>
        <span className="call-state">{stateLabel}</span>
      </div>
      {state === "now" && <span className="call-progress" aria-hidden="true" />}
      <AnimatePresence initial={false}>
        {state !== "todo" && (
          <motion.div
            className="call-result"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="cr-head">{step.result}</p>
            {state === "now" && (
              <ul>
                {step.detail.map((d, j) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + j * 0.12, duration: 0.4, ease }}
                  >
                    {d}
                  </motion.li>
                ))}
              </ul>
            )}
            {step.confirm && state === "now" && (
              <div className="cr-confirm">
                {confirmed ? (
                  <b>已开始生成，完成后发你评审链接</b>
                ) : (
                  <>
                    <span>{step.confirm}</span>
                    <button type="button" onClick={onConfirm}>
                      确认
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function RelayStatic() {
  return (
    <section className="section" id="relay" aria-labelledby="relay-title">
      <div className="wrap">
        <h2 className="h2" id="relay-title">
          一句话，五个角色接力
        </h2>
        <ol className="relay-static">
          {relaySteps.map((s) => (
            <li key={s.plugin} className={`t-${s.plugin}`}>
              <b>{pluginByKey[s.plugin].name}</b>
              <h3>{s.title}</h3>
              <p>{s.result}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
