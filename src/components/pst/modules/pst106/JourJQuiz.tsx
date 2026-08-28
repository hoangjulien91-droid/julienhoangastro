"use client";

import { useEffect, useRef, useState } from "react";
import { QCM } from "@/lib/pst/data/pst106";
import { PIEGES } from "@/lib/pst/data/pst106-inline";
import { shuffleArr } from "@/lib/pst/utils";

interface JJItem {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

function buildPool(): JJItem[] {
  const qcmItems: JJItem[] = QCM.map((q) => ({
    q: q[0] as string,
    options: q[1] as string[],
    correct: q[2] as number,
    explain: q[3] as string,
  }));
  const piegeItems: JJItem[] = PIEGES.map((p) => ({
    q: "Vrai ou Faux : " + (p[0] as string),
    options: ["✅ Vrai", "❌ Faux"],
    correct: p[1] ? 0 : 1,
    explain: p[2] as string,
  }));
  return shuffleArr(qcmItems.concat(piegeItems)).slice(0, 10);
}

function fmt(ms: number) {
  const clamped = Math.max(0, ms);
  const s = Math.floor(clamped / 1000);
  return (
    String(Math.floor(s / 60)).padStart(2, "0") +
    ":" +
    String(s % 60).padStart(2, "0")
  );
}

interface JourJQuizProps {
  onClose: () => void;
}

export function JourJQuiz({ onClose }: JourJQuizProps) {
  const [items] = useState<JJItem[]>(() => buildPool());
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(5 * 60 * 1000);
  const deadlineRef = useRef(Date.now() + 5 * 60 * 1000);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ne PAS clearInterval ici : ce useEffect ne tourne qu'une fois (deps
    // []), donc un clear au timeout tuait l'intervalle pour de bon — après
    // "Refaire un quiz" (qui ne fait que réarmer deadlineRef), le chrono
    // restait figé à 05:00 sans jamais redécompter. Laisser tourner est
    // sans risque : une fois `finished`, l'écran de résultat ne montre
    // plus le chrono.
    const t = window.setInterval(() => {
      const left = deadlineRef.current - Date.now();
      setRemaining(left);
      if (left <= 0) setFinished(true);
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Sans ça, le focus clavier restait sur le bouton "Lancer le quiz" en
  // arrière-plan — Tab/lecteur d'écran continuaient d'atteindre le contenu
  // caché derrière l'overlay au lieu d'entrer dans la modale.
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const current = items[idx];

  function choose(i: number) {
    if (answered !== null || finished) return;
    setAnswered(i);
    if (i === current?.correct) setScore((s) => s + 1);
  }

  function next() {
    setAnswered(null);
    if (idx + 1 >= items.length) setFinished(true);
    else setIdx((v) => v + 1);
  }

  function restart() {
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    deadlineRef.current = Date.now() + 5 * 60 * 1000;
    setRemaining(5 * 60 * 1000);
  }

  const pct = Math.round((100 * score) / (items.length || 1));
  const verdict =
    pct >= 80
      ? "Prêt(e) pour le Jour J ! 🎯"
      : pct >= 50
        ? "Bientôt au point — encore un effort 💪"
        : "Reprends tes cartes avant le grand jour 📚";

  if (!current) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quiz du Jour J"
        tabIndex={-1}
        style={{
          background: "var(--card)",
          borderRadius: 12,
          padding: 20,
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          color: "var(--ink)",
          outline: "none",
        }}
      >
        {finished || idx >= items.length ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: 36, fontWeight: 700, color: "var(--accent)" }}
            >
              {score} / {items.length}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, margin: "6px 0" }}>
              {pct}%
            </div>
            <p style={{ fontSize: 14 }}>{verdict}</p>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <button type="button" className="btn solid" onClick={restart}>
                Refaire un quiz →
              </button>
              <button type="button" className="btn" onClick={onClose}>
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                Question {idx + 1} / {items.length}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: remaining < 60000 ? "var(--bad)" : "var(--accent)",
                }}
              >
                {fmt(remaining)}
              </span>
              <button
                type="button"
                aria-label="Fermer"
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>
              {current.q}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correct;
                const isChosen = i === answered;
                let bg: string | undefined;
                if (answered !== null) {
                  if (isCorrect) bg = "var(--goodbg)";
                  else if (isChosen) bg = "var(--badbg)";
                }
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={answered !== null}
                    onClick={() => choose(i)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--line)",
                      background: bg ?? "var(--paper)",
                      color: "var(--ink)",
                      cursor: answered === null ? "pointer" : "default",
                      fontSize: 13.5,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered !== null && (
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color:
                      answered === current.correct
                        ? "var(--good)"
                        : "var(--bad)",
                  }}
                >
                  {answered === current.correct ? "✅ Correct" : "❌ Raté"}
                </div>
                <p
                  style={{ fontSize: 13, lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: current.explain }}
                />
                <button type="button" className="btn solid" onClick={next}>
                  {idx + 1 < items.length
                    ? "Question suivante →"
                    : "Voir mon score →"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
