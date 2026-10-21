"use client";

import { useEffect, useState } from "react";
import { GraduationCap, CheckCircle2, Clock } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { RedacItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
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

const TARGET_SECONDS = 30 * 60;

export function Examen({ store, onStoreChange, data, hint }: ExamenProps) {
  const [subjectIdx, setSubjectIdx] = useState(0);
  const subject = (data[subjectIdx] ?? data[0]) as RedacItem;
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scoreShown, setScoreShown] = useState(false);

  useEffect(() => {
    if (finished || paused) return;
    const iv = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(iv);
  }, [finished, paused]);

  function selectSubject(nextIdx: number) {
    playClickSound();
    setSubjectIdx(nextIdx);
    setElapsed(0);
    setPaused(false);
    setFinished(false);
    setChecked(new Set());
    setScoreShown(false);
  }

  function newSubject() {
    const nextIdx = (subjectIdx + 1) % data.length;
    selectSubject(nextIdx);
  }

  function finish() {
    playSuccessSound();
    setFinished(true);
  }

  function toggleAttendu(i: number) {
    playClickSound();
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function computeScore() {
    playSuccessSound();
    store.recordScore("examen", checked.size, subject[1].length);
    onStoreChange();
    setScoreShown(true);
  }

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const pctTime = Math.min(100, Math.round((elapsed * 100) / TARGET_SECONDS));

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="examenHost">
        <div
          className="schema"
          style={{
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 8,
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
                Sujet {subjectIdx + 1} / {data.length} · Objectif 30 min (
                {pctTime}%)
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                Rédige ton plan détaillé (intro, parties, conclusion) en
                conditions réelles.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {!finished && (
                <button
                  type="button"
                  className="btn small"
                  onClick={() => {
                    playClickSound();
                    setPaused((p) => !p);
                  }}
                >
                  {paused ? "▶ Reprendre" : "❚❚ Pause"}
                </button>
              )}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color:
                    elapsed > TARGET_SECONDS
                      ? "var(--bad)"
                      : "var(--accent)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {fmtTime(elapsed)}
              </div>
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
                width: `${pctTime}%`,
                background:
                  elapsed > TARGET_SECONDS ? "var(--bad)" : "var(--accent)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        <div className="qcard">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div className="chips" style={{ margin: 0 }}>
              {data.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chip${idx === subjectIdx ? " active" : ""}`}
                  style={{ padding: "2px 8px", fontSize: 11 }}
                  onClick={() => selectSubject(idx)}
                >
                  Sujet #{idx + 1}
                </button>
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--muted)",
              }}
            >
              {wordCount} mots · {draft.length} caract.
            </span>
          </div>

          <div className="qtext" style={{ fontWeight: 600 }}>
            {subject[0]}
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ton plan détaillé au brouillon (1. Accroche & définition des termes, 2. Problématique dialectique, 3. Plan en 2 ou 3 axes avec auteurs et exemples cliniques)…"
            style={{
              width: "100%",
              minHeight: 190,
              marginTop: 12,
              padding: 12,
              border: "1px solid var(--line)",
              borderRadius: 10,
              background: "var(--bg)",
              color: "var(--ink)",
              fontFamily: "inherit",
              fontSize: 14,
              resize: "vertical",
            }}
          />
          <div
            className="navrow"
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="btn small" onClick={newSubject}>
                ↻ Sujet suivant
              </button>
              {draft.trim() && (
                <button
                  type="button"
                  className="btn small"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(
                        `${subject[0]}\n\n${draft}`,
                      );
                      playSuccessSound();
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    } catch {
                      // ignore
                    }
                  }}
                >
                  {copied ? "✓ Plan copié" : "Copier mon plan"}
                </button>
              )}
            </div>
            {!finished ? (
              <button className="btn solid" onClick={finish}>
                Terminer &amp; m&apos;auto-évaluer
              </button>
            ) : (
              <button
                className="btn small"
                onClick={() => setFinished(false)}
              >
                Continuer à rédiger
              </button>
            )}
          </div>
        </div>

        {finished && (
          <div
            className="qcard"
            style={{ marginTop: 14, borderLeft: "4px solid var(--accent)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Grille Officielle de Correction Cnam</span>
              </span>
            </div>
            <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--accent)" }}>
              Auto-évaluation contre la grille ({checked.size} /{" "}
              {subject[1].length})
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
                  cursor: "pointer",
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
                Voir un corrigé modèle d&apos;excellence
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
