"use client";

import { useState } from "react";
import type { AMap, ClozeItem } from "@/lib/pst/types";

interface ClozeProps {
  data: ClozeItem[];
  authors: AMap;
  hint: string;
}

export function Cloze({ data, authors, hint }: ClozeProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="clozeHost">
        {data.map(([axis, segments], ci) => (
          <div className="qcard clcard" key={ci}>
            <div className="qhead">
              <span className="qnum">{authors[axis]}</span>
            </div>
            <div className="clz">
              {segments.map((sg, si) => {
                if (typeof sg === "string") {
                  return (
                    <span key={si} dangerouslySetInnerHTML={{ __html: sg }} />
                  );
                }
                const key = `${ci}-${si}`;
                const isRevealed = revealed.has(key);
                return (
                  <button
                    key={si}
                    className={`blank${isRevealed ? " revealed" : ""}`}
                    onClick={() => toggle(key)}
                  >
                    {sg.h}
                  </button>
                );
              })}
            </div>
            <div className="clnote">
              Clique sur le mot souligné pour vérifier.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
