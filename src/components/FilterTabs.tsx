"use client";

import { motion } from "motion/react";
import { spring } from "@/lib/motion";

type FilterTabsProps<T extends string> = {
  /** 页面内唯一，用于选中底色的 layout 动画。 */
  id: string;
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

/** 胶囊形的筛选标签，选中底色会在选项之间滑动。 */
export function FilterTabs<T extends string>({ id, label, options, value, onChange }: FilterTabsProps<T>) {
  return (
    <div className="filters" role="tablist" aria-label={label}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={selected}
            className={selected ? "on" : undefined}
            onClick={() => onChange(option)}
          >
            {selected && <motion.span layoutId={`${id}-pill`} className="filter-pill" transition={spring} />}
            <span className="filter-label">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
