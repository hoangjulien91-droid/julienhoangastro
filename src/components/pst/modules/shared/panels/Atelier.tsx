"use client";

import { useEffect, useState } from "react";
import { PenTool, FileText } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AtelierSujet } from "@/lib/pst/types";
import { playSuccessSound } from "@/lib/pst/audio-feedback";

interface AtelierProps {
  store: PstStore;
  onStoreChange: () => void;
  data: AtelierSujet[];
  hint: string;
}

const ATELIER_DRAFTS_KEY = "pst_atelier_drafts_v1";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function Atelier({ store, onStoreChange, data, hint }: AtelierProps) {
  const [idx, setIdx] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ATELIER_DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed && typeof parsed === "object") setDrafts(parsed);
      }
    } catch {
      /* ignore */
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const s = data[idx];
  if (!s) return null;

  const draftKey = `${store.key}_atelier_${idx}`;
  const currentDraft = drafts[draftKey] || "";
  const wordCount = currentDraft.trim()
    ? currentDraft.trim().split(/\s+/).length
    : 0;

  function updateDraft(val: string) {
    const next = { ...drafts, [draftKey]: val };
    setDrafts(next);
    try {
      localStorage.setItem(ATELIER_DRAFTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  const marks = store.getMarks();
  const checked = s.grid.filter(
    (_, gi) => !!marks[`atelier_${idx}_point_${gi}`],
  ).length;
  const total = s.grid.length;
  const pct = total ? Math.round((checked * 100) / total) : 0;

  function toggle(gi: number) {
    const key = `atelier_${idx}_point_${gi}`;
    const cur = !!store.getMarks()[key];
    store.setMark(key, !cur);
    if (!cur) playSuccessSound();
    onStoreChange();
  }

  function toggleSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !s) {
      return;
    }
    const synth = window.speechSynthesis;
    if (speakingIdx === idx) {
      synth.cancel();
      setSpeakingIdx(null);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(
      `${s.t}. Corrigé modèle : ${stripHtml(s.corrige)}`,
    );
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    synth.speak(utter);
  }

  function copyCorrige() {
    if (!s || typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(`${s.t}\n\n${stripHtml(s.corrige)}`)
      .then(() => {
        setCopiedIdx(idx);
        setTimeout(
          () => setCopiedIdx((cur) => (cur === idx ? null : cur)),
          1800,
        );
      })
      .catch(() => {});
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="fiches-controls-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <PenTool className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Auto-évaluation interactive · Sujet #{idx + 1} / {data.length}</span>
          </span>
          <span
            style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}
          >
            {checked} / {total} points ({pct}%)
          </span>
        </div>
        <div className="fiche-progress-bar">
          <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="chips" style={{ marginBottom: 14 }}>
        {data.map((sujet, i) => (
          <button
            key={i}
            className={`chip${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
          >
            {sujet.t.split(" : ")[0]}
          </button>
        ))}
      </div>
      <div id="atelierHost">
        <div className="qcard">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
              <FileText className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Sujet de Rédaction Officiel Cnam</span>
            </span>
          </div>
          <h3 style={{ marginTop: 0, fontSize: 16 }}>
            Énoncé de l&apos;Atelier
          </h3>
          <p style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 14 }}>
            « {s.t} »
          </p>

          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  letterSpacing: "0.05em",
                }}
              >
                Mon brouillon &amp; plan dialectique (sauvegarde auto)
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: wordCount >= 40 ? "var(--good)" : "var(--muted)",
                }}
              >
                {wordCount} mot{wordCount > 1 ? "s" : ""}
              </span>
            </div>
            <textarea
              value={currentDraft}
              onChange={(e) => updateDraft(e.target.value)}
              rows={4}
              placeholder="Esquissez votre problématique, vos axes I / II / III et vos auteurs clés avant d'ouvrir le corrigé-modèle..."
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid var(--line)",
                background: "var(--card)",
                color: "var(--ink)",
                fontFamily: "inherit",
                fontSize: 13,
                lineHeight: 1.45,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 8,
            }}
          >
            Grille du correcteur
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginBottom: 14,
            }}
          >
            {s.grid.map((g, gi) => {
              const isDone = !!marks[`atelier_${idx}_point_${gi}`];
              return (
                <label
                  key={gi}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(gi)}
                  />
                  <span
                    style={
                      isDone
                        ? {
                            textDecoration: "line-through",
                            color: "var(--muted)",
                          }
                        : undefined
                    }
                  >
                    {g}
                  </span>
                </label>
              );
            })}
          </div>
          <details className="fcard">
            <summary>Lire le corrigé-modèle</summary>
            <div style={{ padding: "8px 0 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <button
                  type="button"
                  className={`btn small${speakingIdx === idx ? " active" : ""}`}
                  onClick={toggleSpeech}
                >
                  {speakingIdx === idx ? "■ Stop audio" : "▶ Écouter le corrigé"}
                </button>
                <button
                  type="button"
                  className="btn small"
                  onClick={copyCorrige}
                >
                  {copiedIdx === idx ? "✓ Copié" : "Copier le corrigé"}
                </button>
              </div>
              <div
                className="fbody"
                style={{ fontSize: 13.5 }}
                dangerouslySetInnerHTML={{ __html: s.corrige }}
              />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
