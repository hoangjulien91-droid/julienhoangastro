"use client";

import { useMemo, useState } from "react";
import type { AMap, ClozeItem } from "@/lib/pst/types";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface ClozeProps {
  data: ClozeItem[];
  authors: AMap;
  hint: string;
}

export function Cloze({ data, authors, hint }: ClozeProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const allBlankKeys = useMemo(() => {
    const keys: string[] = [];
    data.forEach(([, segments], ci) => {
      segments.forEach((sg, si) => {
        if (typeof sg !== "string") {
          keys.push(`${ci}-${si}`);
        }
      });
    });
    return keys;
  }, [data]);

  const totalBlanks = allBlankKeys.length;
  const revealedCount = revealed.size;
  const pct = totalBlanks > 0 ? Math.round((revealedCount * 100) / totalBlanks) : 0;

  function toggle(key: string) {
    playClickSound();
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
      <div
        className="qcard"
        style={{
          position: "sticky",
          top: 52,
          zIndex: 15,
          marginBottom: 14,
          padding: "10px 14px",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span className="qnum" style={{ fontWeight: 700 }}>
            Termes révélés : {revealedCount} / {totalBlanks} ({pct}%)
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              className="btn small"
              style={{ padding: "3px 10px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setRevealed(new Set(allBlankKeys));
              }}
            >
              Tout révéler
            </button>
            <button
              type="button"
              className="btn small"
              style={{ padding: "3px 10px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                setRevealed(new Set());
              }}
            >
              Tout masquer (Réinitialiser)
            </button>
          </div>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "var(--rule)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "var(--accent)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

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
