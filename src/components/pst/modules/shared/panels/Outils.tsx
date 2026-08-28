"use client";

import { useState, type ReactNode } from "react";

export interface SynthAxisOption {
  key: string;
  label: string;
}
export interface SynthAxisData {
  [axisKey: string]: Record<string, string>;
}
export interface ComparateurColumn {
  key: string;
  label: string;
  color: string;
}

export interface IntroThemeOption {
  key: string;
  label: string;
}
export interface IntroStepData {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
export interface IntroData {
  [themeKey: string]: IntroStepData;
}
export interface IntroCues {
  [themeKey: string]: string[];
}

export interface ArmeUltime {
  title: string;
  intro: ReactNode;
  items: ReactNode[];
}

interface OutilsProps {
  hint: string;
  comparateurTitle: string;
  comparateurHint: string;
  synthAxes: SynthAxisOption[];
  comparateurColumns: ComparateurColumn[];
  comparateurData: SynthAxisData;
  defaultSynthAxis: string;
  introThemes: IntroThemeOption[];
  introData: IntroData;
  introCues: IntroCues;
  defaultIntroTheme: string;
  specialWidget?: ReactNode;
  arme: ArmeUltime;
}

export function Outils({
  hint,
  comparateurTitle,
  comparateurHint,
  synthAxes,
  comparateurColumns,
  comparateurData,
  defaultSynthAxis,
  introThemes,
  introData,
  introCues,
  defaultIntroTheme,
  specialWidget,
  arme,
}: OutilsProps) {
  const [synthAxis, setSynthAxis] = useState(defaultSynthAxis);
  const [introTheme, setIntroTheme] = useState(defaultIntroTheme);
  const [introHidden, setIntroHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const synth = comparateurData[synthAxis];
  const intro = introData[introTheme];
  const cues = introCues[introTheme] ?? [];

  function wrapText(text: string, cue: string) {
    if (!introHidden) return text;
    return `${text} · [Indice: ${cue}]`;
  }

  function copyIntro() {
    if (!intro) return;
    const raw = [intro.step1, intro.step2, intro.step3, intro.step4].join(
      "\n\n",
    );
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>

      <div className="qbox" style={{ marginBottom: 25 }}>
        <div
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: 14,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {comparateurTitle}
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
          {comparateurHint}
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 15,
            flexWrap: "wrap",
          }}
        >
          {synthAxes.map((axis) => (
            <button
              key={axis.key}
              className={`chip synth-btn${synthAxis === axis.key ? " active" : ""}`}
              style={{ flex: 1, minWidth: 80 }}
              onClick={() => setSynthAxis(axis.key)}
            >
              {axis.label}
            </button>
          ))}
        </div>
        <div
          className="comp-synth-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 15,
          }}
        >
          {comparateurColumns.map((col) => (
            <div
              key={col.key}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderLeft: `4px solid ${col.color}`,
                borderRadius: 10,
                padding: 15,
                minHeight: 140,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: col.color,
                  marginBottom: 6,
                }}
              >
                {col.label}
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}>
                {synth?.[col.key]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="qbox" style={{ marginBottom: 25 }}>
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
          <div
            className="vh"
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            Générateur d&apos;Introduction Universelle
          </div>
          <button
            className="btn small"
            onClick={() => setIntroHidden((h) => !h)}
          >
            {introHidden ? "Révéler les indices" : "Masquer les indices"}
          </button>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
          Sélectionne l&apos;une des thématiques d&apos;examen pour charger le
          squelette dialectique parfait (Accroche ➔ Cadrage ➔ Problématique ➔
          Plan).
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {introThemes.map((theme) => (
            <button
              key={theme.key}
              className={`chip intro-theme-btn${introTheme === theme.key ? " active" : ""}`}
              onClick={() => setIntroTheme(theme.key)}
            >
              {theme.label}
            </button>
          ))}
        </div>
        {intro && (
          <div
            className="intro-skeleton"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {(["step1", "step2", "step3", "step4"] as const).map((step, i) => (
              <div
                key={step}
                style={{
                  borderLeft: "3px solid var(--accent)",
                  paddingLeft: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  Étape {i + 1}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: "var(--ink)",
                  }}
                >
                  {wrapText(intro[step], cues[i] ?? "")}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          className="btn solid small"
          style={{
            marginTop: 15,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onClick={copyIntro}
        >
          <span>📋</span>
          <span>{copied ? "Copié !" : "Copier l'Introduction rédigée"}</span>
        </button>
      </div>

      {specialWidget}

      <div
        className="schema"
        style={{
          padding: 15,
          borderLeft: "4px solid var(--accent)",
          marginTop: 25,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: 13.5,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {arme.title}
        </div>
        <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.5 }}>
          {arme.intro}
        </p>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 12.5,
            lineHeight: 1.5,
            color: "var(--ink)",
          }}
        >
          {arme.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
