"use client";

import { useEffect, useState } from "react";
import { ATELIER_SQUELETTE, ATELIER_CRITERES } from "@/lib/pst/data/pst106";
import { playSuccessSound } from "@/lib/pst/audio-feedback";

const CHECKLIST_KEY = "pst106_atelier_checklist_v1";
const DRAFT_KEY = "pst106_atelier_draft_v1";

export function Atelier106() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    ATELIER_CRITERES.map(() => false),
  );
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECKLIST_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setChecked(ATELIER_CRITERES.map((_, i) => Boolean(parsed[i])));
        }
      }
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) setDraft(savedDraft);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(i: number) {
    setChecked((c) => {
      const next = c.map((v, idx) => (idx === i ? !v : v));
      if (next[i]) playSuccessSound();
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function updateDraft(val: string) {
    setDraft(val);
    try {
      localStorage.setItem(DRAFT_KEY, val);
    } catch {
      /* ignore */
    }
  }

  const done = checked.filter(Boolean).length;
  const pct = ATELIER_CRITERES.length
    ? Math.round((done * 100) / ATELIER_CRITERES.length)
    : 0;
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  return (
    <div>
      <p className="hint">
        L&apos;<b>atelier de dissertation</b> : le squelette dialectique
        universel à suivre pour structurer n&apos;importe quel sujet de la
        discipline, plus une checklist d&apos;auto-évaluation avant remise.
      </p>

      <div className="fiches-controls-card" style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 13 }}>
            Checklist méthodologique PST 106
          </span>
          <span
            style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}
          >
            {done} / {ATELIER_CRITERES.length} critères ({pct}%)
          </span>
        </div>
        <div className="fiche-progress-bar">
          <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

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

      <div className="qbox" style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div
            className="vh"
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              fontSize: 14,
            }}
          >
            Mon plan dialectique (sauvegarde auto)
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: wordCount >= 40 ? "var(--good)" : "var(--muted)",
            }}
          >
            {wordCount} mot{wordCount > 1 ? "s" : ""}
          </span>
        </div>
        <textarea
          value={draft}
          onChange={(e) => updateDraft(e.target.value)}
          rows={5}
          placeholder="Rédigez ici votre accroche, problématique et plan I / II / III..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            color: "var(--ink)",
            fontFamily: "inherit",
            fontSize: 13,
            lineHeight: 1.5,
            resize: "vertical",
          }}
        />
      </div>

      <div className="qbox" style={{ marginTop: 18 }}>
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
