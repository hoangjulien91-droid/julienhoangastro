"use client";

import { useEffect, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { RedacItem } from "@/lib/pst/types";
import { QuizBilan } from "@/components/pst/quiz/QuizBilan";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, "0")}`;
}

interface ExamenProps {
  store: PstStore;
  onStoreChange: () => void;
  data: RedacItem[];
  hint: string;
}

export function Examen({ store, onStoreChange, data, hint }: ExamenProps) {
  function pickSubject(): RedacItem {
    return data[Math.floor(Math.random() * data.length)] as RedacItem;
  }

  const [subject, setSubject] = useState<RedacItem>(pickSubject);
  const [startTs, setStartTs] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scoreShown, setScoreShown] = useState(false);

  useEffect(() => {
    if (finished) return;
    const iv = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTs) / 1000)),
      1000,
    );
    return () => clearInterval(iv);
  }, [startTs, finished]);

  function newSubject() {
    setSubject(pickSubject());
    setStartTs(Date.now());
    setElapsed(0);
    setFinished(false);
    setChecked(new Set());
    setScoreShown(false);
  }

  function finish() {
    setFinished(true);
  }

  function toggleAttendu(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function computeScore() {
    store.recordScore("examen", checked.size, subject[1].length);
    onStoreChange();
    setScoreShown(true);
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="examenHost">
        <div
          className="schema"
          style={{
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--accent)",
                fontWeight: 700,
              }}
            >
              Sujet tiré au sort · objectif 30 min
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              Rédige ton plan détaillé (intro, parties, conclusion).
            </div>
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtTime(elapsed)}
          </div>
        </div>
        <div className="qcard">
          <div className="qtext" style={{ fontWeight: 600 }}>
            {subject[0]}
          </div>
          <textarea
            placeholder="Ton plan au brouillon…"
            style={{
              width: "100%",
              minHeight: 180,
              marginTop: 12,
              padding: 12,
              border: "1px solid var(--line)",
              borderRadius: 10,
              fontFamily: "inherit",
              fontSize: 14,
              resize: "vertical",
            }}
          />
          {!finished && (
            <div className="navrow" style={{ marginTop: 12 }}>
              <button className="btn small" onClick={newSubject}>
                Nouveau sujet
              </button>
              <button className="btn solid" onClick={finish}>
                Terminer &amp; m&apos;auto-évaluer
              </button>
            </div>
          )}
        </div>

        {finished && (
          <div
            className="qcard"
            style={{ marginTop: 14, borderLeft: "4px solid var(--accent)" }}
          >
            <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
              Auto-évaluation contre la grille
            </h3>
            <p style={{ fontSize: 13, margin: "0 0 8px" }}>
              Coche chaque attendu que tu as réellement traité dans ton plan :
            </p>
            {subject[1].map((a, i) => (
              <label
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  margin: "6px 0",
                  fontSize: 13.5,
                }}
              >
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggleAttendu(i)}
                />
                <span>{a}</span>
              </label>
            ))}
            <button
              className="btn solid"
              style={{ marginTop: 10 }}
              onClick={computeScore}
            >
              Calculer mon score
            </button>
            <div className="bilan" style={{ marginTop: 10 }}>
              {scoreShown && (
                <QuizBilan correct={checked.size} total={subject[1].length} />
              )}
            </div>
            <details style={{ marginTop: 14 }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                Voir un corrigé modèle
              </summary>
              <div
                style={{ marginTop: 10, fontSize: 13.5 }}
                dangerouslySetInnerHTML={{ __html: subject[2] }}
              />
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
