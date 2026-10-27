"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { faqs } from "@/content/faq";
import { ease } from "@/lib/motion";
import { SectionHead } from "./SectionHead";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-wrap">
        <SectionHead id="faq-title" title="常见问题" />
        <div className="faqs">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-${i}`;
            return (
              <div key={f.q} className={`faq ${isOpen ? "open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <motion.span
                      className="faq-icon"
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
