"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  SYNTH_COMPARISONS,
  SYNTH_AXES,
  INTRO_THEMES,
  INTRO_THEME_LABELS,
  MEMO_METHODO,
  ARME_ULTIME,
  type SynthAxisKey,
  type IntroThemeKey,
} from "@/lib/pst/data/pst106-outils";
import { SosieWidget } from "./SosieWidget";

interface Outils106Props {
  store: PstStore;
  onStoreChange: () => void;
}

export function Outils106({ store, onStoreChange }: Outils106Props) {
  const [axis, setAxis] = useState<SynthAxisKey>("objectif");
  const [theme, setTheme] = useState<IntroThemeKey>("activite");
  const [hintsHidden, setHintsHidden] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copier l'Introduction rédigée");

  const synth = SYNTH_COMPARISONS[axis];
  const intro = INTRO_THEMES[theme];

  function copyIntro() {
    const text = [intro.step1, intro.step2, intro.step3, intro.step4]
      .map((s) => s.replace(/<[^>]+>/g, ""))
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopyLabel("Copié !");
      window.setTimeout(
        () => setCopyLabel("Copier l'Introduction rédigée"),
        1500,
      );
    });
  }

  return (
    <div>
      <p
        className="outils-intro"
        style={{ marginBottom: 20, fontSize: 14, color: "var(--muted)" }}
      >
        Une <b>sélection d&apos;outils interactifs d&apos;élite</b> conçue pour
        éliminer les pièges récurrents de l&apos;examen et structurer tes
        écrits.
      </p>

      {/* 1. Comparateur synthèse */}
      <div className="qbox" style={{ marginBottom: 25 }}>
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
          ⏰ Comparateur interactif de Synthèse (Wisner vs Clot vs Dejours)
        </div>
        <p
          style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px 0" }}
        >
          Le correcteur attend une comparaison structurée des courants sur les
          notions clés. Sélectionne une thématique ci-dessous pour voir la
          comparaison conceptuelle synchrone.
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 15,
            flexWrap: "wrap",
          }}
        >
          {SYNTH_AXES.map((a) => (
            <button
              key={a.key}
              type="button"
              className={`chip synth-btn${axis === a.key ? " active" : ""}`}
              style={{
                flex: 1,
                minWidth: 80,
                background: axis === a.key ? "var(--ink)" : undefined,
                color: axis === a.key ? "#fff" : undefined,
                borderColor: axis === a.key ? "var(--ink)" : undefined,
              }}
              onClick={() => setAxis(a.key)}
            >
              {a.label}
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
          {(["wisner", "clot", "dejours"] as const).map((author) => (
            <div
              key={author}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderLeft: `4px solid var(--${author})`,
                borderRadius: 10,
                padding: 15,
                minHeight: 140,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--accent)",
                  marginBottom: 6,
                }}
              >
                {synth[author].title}
              </div>
              <p
                style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}
                dangerouslySetInnerHTML={{ __html: synth[author].desc }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Générateur d'introduction */}
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
              marginBottom: 0,
            }}
          >
            Générateur d&apos;Introduction Universelle
          </div>
          <button
            type="button"
            className="btn small"
            style={{ padding: "4px 10px", fontSize: 11 }}
            onClick={() => setHintsHidden((h) => !h)}
          >
            {hintsHidden ? "Afficher les indices" : "Masquer les indices"}
          </button>
        </div>
        <p
          style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px 0" }}
        >
          Sélectionne l&apos;une des thématiques d&apos;examen pour charger le
          squelette dialectique parfait (Accroche ➔ Définitions/Auteurs ➔
          Problématique ➔ Plan).
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {INTRO_THEME_LABELS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`chip intro-theme-btn${theme === t.key ? " active" : ""}`}
              style={
                theme === t.key
                  ? {
                      background: "var(--ink)",
                      color: "#fff",
                      borderColor: "var(--ink)",
                    }
                  : undefined
              }
              onClick={() => setTheme(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="intro-skeleton"
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {[
            {
              label: "Étape 1 : Accroche & Opposition de Courants",
              color: "var(--accent)",
              text: intro.step1,
              hidden: "[Accroche masquée - clique pour voir]",
            },
            {
              label: "Étape 2 : Cadrage Théorique & Auteurs",
              color: "var(--clot)",
              text: intro.step2,
              hidden: "[Définitions masquées - clique pour voir]",
            },
            {
              label: "Étape 3 : Problématique Ciselée",
              color: "var(--dejours)",
              text: intro.step3,
              hidden: "[Problématique masquée - clique pour voir]",
            },
            {
              label: "Étape 4 : Annonce du Plan Dialectique",
              color: "var(--histoire)",
              text: intro.step4,
              hidden: "[Annonce de plan masquée - clique pour voir]",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{ borderLeft: `3px solid ${s.color}`, paddingLeft: 12 }}
            >
              <span
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 3,
                }}
              >
                {s.label}
              </span>
              {hintsHidden ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    lineHeight: 1.45,
                    filter: "blur(4px)",
                    cursor: "pointer",
                    userSelect: "none",
                    display: "inline-block",
                  }}
                  onClick={(e) => (e.currentTarget.style.filter = "none")}
                >
                  {s.hidden}
                </p>
              ) : (
                <p
                  style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: s.text }}
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
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
          <span>{copyLabel}</span>
        </button>
      </div>

      {/* 3. Mémo méthodologique */}
      <div className="qbox" style={{ marginBottom: 25 }}>
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
          Mémo Méthodologique de l&apos;Examen
        </div>
        <p
          style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px 0" }}
        >
          Contrastes fondamentaux des approches méthodologiques à restituer
          impérativement pour illustrer la rigueur de chaque auteur face au
          terrain.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 15,
          }}
        >
          {MEMO_METHODO.map((m) => (
            <div
              key={m.key}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 15,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: m.color,
                  marginBottom: 8,
                }}
              >
                {m.title}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {m.items.map((it, i) => (
                  <li key={i}>
                    <b>{it.b}</b> : {it.t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Arme ultime */}
      <div
        className="schema"
        style={{ padding: 15, borderLeft: "4px solid var(--histoire)" }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "var(--histoire)",
            fontSize: 13.5,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          💡 {ARME_ULTIME.title}
        </div>
        <p
          style={{ margin: "0 0 10px 0", fontSize: 13, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: ARME_ULTIME.intro }}
        />
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 12.5,
            lineHeight: 1.5,
            color: "var(--ink)",
          }}
        >
          {ARME_ULTIME.points.map((p, i) => (
            <li key={i}>
              <b>{p.b}</b> : {p.t}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Atelier Instruction au Sosie */}
      <SosieWidget store={store} onStoreChange={onStoreChange} />
    </div>
  );
}
