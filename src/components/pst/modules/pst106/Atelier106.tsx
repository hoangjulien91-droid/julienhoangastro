"use client";

import { useState } from "react";
import { ATELIER_SQUELETTE, ATELIER_CRITERES } from "@/lib/pst/data/pst106";

export function Atelier106() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    ATELIER_CRITERES.map(() => false),
  );

  function toggle(i: number) {
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  const done = checked.filter(Boolean).length;

  return (
    <div>
      <p className="hint">
        L&apos;<b>atelier de dissertation</b> : le squelette dialectique
        universel à suivre pour structurer n&apos;importe quel sujet de la
        discipline, plus une checklist d&apos;auto-évaluation avant remise.
      </p>

      <div className="atelier-squelette">
        {ATELIER_SQUELETTE.map(([title, desc], i) => (
          <div className="qbox" key={i} style={{ marginBottom: 14 }}>
            <div
              className="vh"
              style={{
                fontWeight: 700,
                color: "var(--accent)",
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              {i + 1}. {title}
            </div>
            <p
              style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: desc ?? "" }}
            />
          </div>
        ))}
      </div>

      <div className="qbox" style={{ marginTop: 20 }}>
        <div
          className="vh"
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          Checklist avant remise ({done}/{ATELIER_CRITERES.length})
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {ATELIER_CRITERES.map((c, i) => (
            <li key={i}>
              <label
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  fontSize: 13.5,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => toggle(i)}
                  style={{ marginTop: 3 }}
                />
                <span
                  style={{
                    textDecoration: checked[i] ? "line-through" : "none",
                    opacity: checked[i] ? 0.6 : 1,
                  }}
                >
                  {c}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
