"use client";

import { useState } from "react";
import { GLOBAL_ERAS } from "@/lib/pst/data/global-eras";

export function GlobalTimeline() {
  const [activeKey, setActiveKey] = useState("era2");
  const era = GLOBAL_ERAS.find((e) => e.key === activeKey) ?? GLOBAL_ERAS[0];
  if (!era) return null;

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)" }}>
        Parcourez la chronologie historique et l&apos;évolution conjointe des
        concepts théoriques du travail à travers tous les modules PST.
      </p>
      <div className="global-frise-axis" id="globalFriseAxis">
        {GLOBAL_ERAS.map((e) => (
          <button
            key={e.key}
            className={`global-frise-dot${e.key === activeKey ? " active" : ""}`}
            onClick={() => setActiveKey(e.key)}
          >
            <span className="yr">{e.year}</span>
            <span className="nm">{e.name}</span>
          </button>
        ))}
      </div>
      <div id="globalFriseHost" style={{ marginTop: 20 }}>
        <div
          className="schema"
          style={{ borderLeft: "4px solid var(--accent)", paddingLeft: 16 }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: 6,
            }}
          >
            {era.year} — {era.name}
          </div>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.5,
              margin: "0 0 16px",
              fontStyle: "italic",
              color: "var(--muted)",
            }}
          >
            {era.desc}
          </p>
          <div className="global-frise-cols">
            <div className="global-frise-col">
              <h4>PST106 / PST108</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst106 || era.pst108 || "Non applicable",
                }}
              />
            </div>
            <div className="global-frise-col">
              <h4>PST120 / PST124</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst120 || era.pst124 || "Non applicable",
                }}
              />
            </div>
            <div className="global-frise-col">
              <h4>PST123</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst123 || "Non applicable",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
