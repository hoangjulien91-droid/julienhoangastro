"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { RedacItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface RedacProps {
  data: RedacItem[];
  hint: string;
}

const REDAC_DRAFTS_KEY = "pst_redac_drafts_v1";

export function Redac({ data, hint }: RedacProps) {
  const [openPlan, setOpenPlan] = useState<Set<number>>(new Set([0]));
  const [openCorrige, setOpenCorrige] = useState<Set<number>>(new Set());
  const [doneItems, setDoneItems] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(REDAC_DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setDrafts(parsed);
      }
    } catch {
      // ignore
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function updateDraft(subjectKey: string, val: string) {
    setDrafts((prev) => {
      const next = { ...prev, [subjectKey]: val };
      try {
        window.localStorage.setItem(REDAC_DRAFTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function toggleSet(
    setFn: Dispatch<SetStateAction<Set<number>>>,
    idx: number,
  ) {
    playClickSound();
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleDone(key: string) {
    playClickSound();
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleSpeakCorrige(subject: string, corrige: string, idx: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = corrige.replace(/<[^>]*>/g, " ");
    const utter = new SpeechSynthesisUtterance(
      `Sujet : ${subject}. Copie modèle : ${cleanText}`,
    );
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utter);
  }

  function copyCorrige(subject: string, corrige: string, idx: number) {
    const cleanText = corrige.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${subject}\n\n${cleanText}`);
      playSuccessSound();
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      // ignore
    }
  }

  const totalPoints = data.reduce((acc, [, pts]) => acc + pts.length, 0);
  const doneCount = doneItems.size;
  const pct =
    totalPoints > 0 ? Math.round((doneCount * 100) / totalPoints) : 0;
  const allPlansOpen = openPlan.size === data.length;

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
            Attendus cochés : {doneCount} / {totalPoints} ({pct}%)
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              className="btn small"
              style={{ padding: "3px 10px", fontSize: 11 }}
              onClick={() => {
                playClickSound();
                if (allPlansOpen) setOpenPlan(new Set());
                else setOpenPlan(new Set(data.map((_, i) => i)));
              }}
            >
              {allPlansOpen ? "Tout replier" : "Déplier tous les plans"}
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

      <div id="redacHost">
        {data.map(([subject, points, corrige], idx) => {
          const planOpen = openPlan.has(idx);
          const corrigeOpen = openCorrige.has(idx);
          const draftKey = subject.slice(0, 48);
          const draftVal = drafts[draftKey] ?? "";
          const wordCount = draftVal.trim()
            ? draftVal.trim().split(/\s+/).length
            : 0;
          return (
            <div className="rcard" key={idx}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div className="qnum">
                  Sujet {idx + 1} / {data.length}
                </div>
                {wordCount > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--font-mono, monospace)",
                      color: "var(--accent)",
                      fontWeight: 700,
                    }}
                  >
                    Brouillon : {wordCount} mots
                  </span>
                )}
              </div>
              <div className="qtext">{subject}</div>

              {/* Zone de brouillon personnel auto-sauvegardé */}
              <textarea
                value={draftVal}
                onChange={(e) => updateDraft(draftKey, e.target.value)}
                placeholder="Ébauche ici ta problématique et tes axes (sauvegardé automatiquement) avant de révéler le plan..."
                style={{
                  width: "100%",
                  minHeight: 72,
                  marginBottom: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--ink)",
                  fontSize: 12.5,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />

              <button
                className="btn"
                onClick={() => toggleSet(setOpenPlan, idx)}
              >
                {planOpen
                  ? "Masquer le plan"
                  : "Voir le plan d'une bonne réponse"}
              </button>
              {planOpen && (
                <div className="plan show">
                  <div className="lbl">
                    Squelette de réponse attendu (cliquer pour cocher)
                  </div>
                  <ol>
                    {points.map((point, pi) => {
                      const key = `${idx}-${pi}`;
                      return (
                        <li
                          key={pi}
                          className={doneItems.has(key) ? "done" : ""}
                          onClick={() => toggleDone(key)}
                        >
                          {point}
                        </li>
                      );
                    })}
                  </ol>
                  <div className="corrige-wrap">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        className="corrige-btn"
                        onClick={() => toggleSet(setOpenCorrige, idx)}
                      >
                        {corrigeOpen
                          ? "Masquer la copie rédigée"
                          : "Lire la copie modèle rédigée"}
                      </button>
                      {corrigeOpen && (
                        <>
                          <button
                            type="button"
                            className="btn small"
                            style={{ padding: "4px 10px", fontSize: 11 }}
                            onClick={() =>
                              toggleSpeakCorrige(subject, corrige, idx)
                            }
                          >
                            {speakingIdx === idx
                              ? "■ Stop audio"
                              : "▶ Écouter la copie"}
                          </button>
                          <button
                            type="button"
                            className="btn small"
                            style={{ padding: "4px 10px", fontSize: 11 }}
                            onClick={() => copyCorrige(subject, corrige, idx)}
                          >
                            {copiedIdx === idx ? "✓ Copié" : "Copier la copie"}
                          </button>
                        </>
                      )}
                    </div>
                    {corrigeOpen && (
                      <div className="corrige show">
                        <div className="lab">
                          Copie modèle d&apos;excellence (Validation méthodologique)
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: corrige }} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
