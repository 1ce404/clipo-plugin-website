import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadProps = {
  title: ReactNode;
  sub?: string;
  /** 标题的 id，供区块用 aria-labelledby 关联。 */
  id?: string;
};

export function SectionHead({ title, sub, id }: SectionHeadProps) {
  return (
    <Reveal className="head">
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {sub && <p className="sub">{sub}</p>}
    </Reveal>
  );
}
