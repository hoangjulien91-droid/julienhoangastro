"use client";

import { useState, type CSSProperties } from "react";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";

interface SwipeGameProps {
  cartes: Flashcard[];
  currentAxis: string;
  authors: AMap;
}

function buildDeck(cartes: Flashcard[], currentAxis: string) {
  const base = cartes.filter(
    (c) => currentAxis === "all" || c.axis === currentAxis,
  );
  return shuffleArr(base).slice(0, 10);
}

export function SwipeGame({ cartes, currentAxis, authors }: SwipeGameProps) {
  const [deck, setDeck] = useState(() => buildDeck(cartes, currentAxis));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  function restart() {
    setDeck(buildDeck(cartes, currentAxis));
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  if (idx >= deck.length) {
    const verdict =
      score >= 8 ? "Excellent !" : score >= 5 ? "Pas mal !" : "À retravailler.";
    const color =
      score >= 8 ? "var(--good)" : score >= 5 ? "var(--accent)" : "var(--bad)";
    return (
      <div id="swipeGameHost" style={{ marginTop: 10 }}>
        <div
          className="qcard"
          style={{
            textAlign: "center",
            padding: 24,
            borderTop: `4px solid ${color}`,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color,
              fontFamily: "'Fraunces', serif",
              fontSize: 18,
            }}
          >
            Classification Terminée ! 🃏
          </h3>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: "16px 0",
              color: "var(--ink)",
            }}
          >
            {score} / {deck.length}
          </div>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--muted)",
              margin: "0 0 20px",
            }}
          >
            {verdict} Tu as classé les concepts clés dans leurs perspectives
            théoriques respectives.
          </p>
          <button
            className="btn solid"
            style={{ margin: "0 auto" }}
            onClick={restart}
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  const card = deck[idx];
  if (!card) return null;
  const answered = selected !== null;
  const correctKey = card.a;

  function handleSelect(key: string) {
    if (answered) return;
    setSelected(key);
    if (key === correctKey) setScore((s) => s + 1);
  }

  function next() {
    setIdx((i) => i + 1);
    setSelected(null);
  }

  return (
    <div id="swipeGameHost" style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <span>
          Progression :{" "}
          <b>
            {idx + 1} / {deck.length}
          </b>
        </span>
        <span>
          Score : <b style={{ color: "var(--accent)" }}>{score}</b>
        </span>
      </div>
      <div
        className="pbar"
        style={{
          height: 6,
          background: "var(--line)",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: "var(--accent)",
            height: "100%",
            width: `${Math.round((100 * idx) / deck.length)}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div
        className="fc"
        style={{
          cursor: "default",
          transform: answered
            ? selected === correctKey
              ? "translateX(50px) rotate(5deg)"
              : "translateX(-50px) rotate(-5deg)"
            : "none",
          opacity: answered ? 0.9 : 1,
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 20,
          boxSizing: "border-box",
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            fontWeight: 700,
            color: "var(--muted)",
            letterSpacing: "0.05em",
            marginBottom: 6,
          }}
        >
          Axe : {card.tag}
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.45,
          }}
        >
          {card.q}
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 8,
          textAlign: "center",
          letterSpacing: "0.05em",
        }}
      >
        Associer à la bonne catégorie :
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.keys(authors).map((key) => {
          const isCorrectKey = key === correctKey;
          const isSelected = key === selected;
          const style: CSSProperties = {
            textAlign: "left",
            justifyContent: "flex-start",
            width: "100%",
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 500,
          };
          if (answered && isCorrectKey) {
            style.borderColor = "var(--good)";
            style.color = "var(--good)";
            style.background = "var(--goodbg)";
          } else if (answered && isSelected) {
            style.borderColor = "var(--bad)";
            style.color = "var(--bad)";
            style.background = "var(--badbg)";
          }
          return (
            <button
              key={key}
              className="btn opt btn-swipe-opt"
              style={style}
              disabled={answered}
              onClick={() => handleSelect(key)}
            >
              <span>{authors[key]}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          id="swipeFeedback"
          style={{
            display: "block",
            marginTop: 14,
            padding: 12,
            borderRadius: 8,
            fontSize: 13,
            lineHeight: 1.45,
            border: `1px solid ${selected === correctKey ? "var(--good)" : "var(--bad)"}`,
            background:
              selected === correctKey ? "var(--goodbg)" : "var(--badbg)",
            color: selected === correctKey ? "var(--good)" : "var(--bad)",
          }}
        >
          {selected === correctKey ? (
            <>
              <b>✓ Correct.</b> {card.deep}
            </>
          ) : (
            <>
              <b>✗ Incorrect.</b> C&apos;est lié à :{" "}
              <b>{authors[correctKey]}</b>.<br />
              {card.deep}
            </>
          )}
        </div>
      )}
      <div
        style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}
      >
        {answered && (
          <button className="btn solid" onClick={next}>
            Continuer ➔
          </button>
        )}
      </div>
    </div>
  );
}
