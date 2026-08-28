"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { SOSIE_SCENARIOS } from "@/lib/pst/data/pst106-sosie";

type ScenarioKey = keyof typeof SOSIE_SCENARIOS;

interface Msg {
  sender: "sosie" | "user";
  text: string;
}

interface SosieWidgetProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function SosieWidget({ store, onStoreChange }: SosieWidgetProps) {
  const [scenarioName, setScenarioName] = useState<
    "bus" | "guichet" | "machine"
  >("bus");
  const [difficulty, setDifficulty] = useState<"normal" | "hard">("normal");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const key = `${scenarioName}_${difficulty}` as ScenarioKey;
  const sc = SOSIE_SCENARIOS[key];

  function start(name = scenarioName, diff = difficulty) {
    const k = `${name}_${diff}` as ScenarioKey;
    const scenario = SOSIE_SCENARIOS[k];
    setStep(0);
    setScore(0);
    setFinished(false);
    setLocked(false);
    setMessages([
      { sender: "sosie", text: scenario.intro },
      { sender: "sosie", text: scenario.steps[0]?.question ?? "" },
    ]);
  }

  function handleScenarioChange(name: "bus" | "guichet" | "machine") {
    setScenarioName(name);
    start(name, difficulty);
  }
  function handleDifficultyChange(diff: "normal" | "hard") {
    setDifficulty(diff);
    start(scenarioName, diff);
  }

  if (messages.length === 0) {
    start();
    return null;
  }

  const pct = Math.min((step / sc.steps.length) * 100, 100);
  const currentStep = !finished ? sc.steps[step] : undefined;

  function choose(opt: { text: string; score: number; feedback: string }) {
    if (locked) return;
    setLocked(true);
    setMessages((m) => [
      ...m,
      { sender: "user", text: opt.text },
      { sender: "sosie", text: opt.feedback },
    ]);
    const newScore = score + opt.score;
    setScore(newScore);
    window.setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      setLocked(false);
      if (nextStep >= sc.steps.length) {
        setFinished(true);
        const average = Math.round(newScore / sc.steps.length);
        if (average === 100) {
          store.unlockBadge("sosie_director");
          onStoreChange();
        }
      } else {
        setMessages((m) => [
          ...m,
          { sender: "sosie", text: sc.steps[nextStep]?.question ?? "" },
        ]);
      }
    }, 1200);
  }

  const averageScore = finished ? Math.round(score / sc.steps.length) : null;

  return (
    <div className="qbox" style={{ marginTop: 25, marginBottom: 25 }}>
      <div
        className="vh"
        style={{
          fontWeight: 700,
          color: "var(--accent)",
          fontSize: 14,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        👥 Atelier interactif &quot;Instruction au Sosie&quot;
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px 0" }}>
        Instruisez votre sosie virtuel. Le sosie suivra vos consignes mais sera
        confronté aux variabilités du réel. Saurez-vous lui transmettre le «
        genre professionnel » plutôt que le simple « travail prescrit » ?
      </p>

      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 15,
          }}
        >
          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Scénario d&apos;activité :
            </label>
            <select
              value={scenarioName}
              onChange={(e) =>
                handleScenarioChange(
                  e.target.value as "bus" | "guichet" | "machine",
                )
              }
              style={{
                width: "100%",
                padding: 8,
                borderRadius: "var(--r)",
                border: "1px solid var(--line)",
                background: "var(--card)",
                color: "var(--ink)",
                fontSize: 13,
              }}
            >
              <option value="bus">Chauffeur de bus de nuit (Ligne 99)</option>
              <option value="guichet">
                Agent d&apos;accueil (Client agressif)
              </option>
              <option value="machine">
                Opérateur d&apos;usine (Presse hydraulique)
              </option>
            </select>
          </div>
          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Niveau de complexité :
            </label>
            <select
              value={difficulty}
              onChange={(e) =>
                handleDifficultyChange(e.target.value as "normal" | "hard")
              }
              style={{
                width: "100%",
                padding: 8,
                borderRadius: "var(--r)",
                border: "1px solid var(--line)",
                background: "var(--card)",
                color: "var(--ink)",
                fontSize: 13,
              }}
            >
              <option value="normal">🟢 Normal (Variabilités standards)</option>
              <option value="hard">
                🔥 Difficile (Double contrainte &amp; crise)
              </option>
            </select>
          </div>
        </div>

        <div
          style={{
            background: "var(--line)",
            height: 5,
            borderRadius: 3,
            marginBottom: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "var(--accent)",
              width: `${pct}%`,
              height: "100%",
              transition: "width 0.3s",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--accent)",
            marginBottom: 12,
            background: "var(--card)",
            border: "1px solid var(--line)",
            padding: "6px 10px",
            borderRadius: 6,
          }}
        >
          <span>Score de Transmission du Genre :</span>
          <span>{finished ? `${averageScore}/100` : "--"}</span>
        </div>

        <div
          style={{
            maxHeight: 280,
            overflowY: "auto",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: 12,
            background: "var(--card)",
            marginBottom: 15,
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                maxWidth: "85%",
                fontSize: 12.5,
                lineHeight: 1.45,
                alignSelf: m.sender === "sosie" ? "flex-start" : "flex-end",
                background:
                  m.sender === "sosie" ? "var(--paper)" : "var(--accent)",
                color: m.sender === "sosie" ? "var(--ink)" : "#fff",
                border:
                  m.sender === "sosie" ? "1px solid var(--line)" : undefined,
              }}
            >
              <strong>
                {m.sender === "sosie" ? "👥 Sosie :" : "👤 Vous :"}
              </strong>{" "}
              {m.text}
            </div>
          ))}
        </div>

        {finished && (
          <div
            style={{
              background: "var(--card)",
              borderLeft: "4px solid var(--accent)",
              borderRadius: 6,
              padding: 12,
              marginBottom: 15,
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--accent)",
                marginBottom: 8,
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              Synthèse clinique de l&apos;activité
            </div>
            <div dangerouslySetInnerHTML={{ __html: sc.synthesis }} />
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
              Alignement final : {averageScore}%{" "}
              {averageScore === 100 ? "⭐ (Parfait - Badge Débloqué)" : ""}
            </div>
          </div>
        )}

        <div>
          {finished ? (
            <button
              type="button"
              className="btn"
              style={{ width: "100%" }}
              onClick={() => start()}
            >
              🔄 Recommencer le scénario
            </button>
          ) : (
            currentStep?.opts.map((opt, i) => (
              <button
                key={i}
                type="button"
                className="btn ghost"
                disabled={locked}
                style={{
                  width: "100%",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  height: "auto",
                  padding: "10px 12px",
                  marginBottom: 6,
                  fontSize: 12,
                  whiteSpace: "normal",
                }}
                onClick={() => choose(opt)}
                dangerouslySetInnerHTML={{ __html: opt.text }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
