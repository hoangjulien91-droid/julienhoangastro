"use client";

import { useState, type CSSProperties } from "react";
import type { PstStore } from "@/lib/pst/store";

const TRIBUNAL_CASES = [
  {
    q: "Un psychologue du travail est recruté par le DRH pour faire passer des tests de personnalité aux salariés sous prétexte de bilan de compétences. Le DRH exige ensuite d'obtenir tous les résultats nominatifs détaillés pour 'adapter les parcours de carrière'. Que doit faire le psychologue ?",
    opts: [
      "Transmettre les résultats bruts puisque la hiérarchie en a fait la commande officielle.",
      "Refuser la transmission nominative en invoquant le respect du secret professionnel et le consentement éclairé (Art. 7).",
      "N'envoyer que les points négatifs pour aider aux futurs licenciements constructifs.",
    ],
    ok: 1,
    expl: "Conforme à l'indépendance professionnelle et au secret : le psychologue est seul juge de ses conclusions et préserve la confidentialité des personnes reçues.",
  },
  {
    q: "Dans le cadre d'une enquête RPS commandée par le CSE, la direction demande à assister aux entretiens individuels pour 'soutenir la démarche'. Le psychologue accepte pour garantir la transparence.",
    opts: [
      "Le psychologue a raison, la transparence renforce la co-construction.",
      "C'est une violation flagrante de l'obligation de préserver la confidentialité, la neutralité, et la liberté de parole de l'interlocuteur.",
      "Il doit demander l'avis des représentants du personnel d'abord.",
    ],
    ok: 1,
    expl: "La préservation de la confidentialité et de la liberté d'expression du salarié est le pilier absolu de l'entretien clinique en psychologie du travail.",
  },
  {
    q: "Un responsable de production propose de financer une formation de sophrologie au psychologue si celui-ci accepte en échange de lui fournir un rapport discret sur les personnes prêtes à faire grève.",
    opts: [
      "Le psychologue refuse catégoriquement, car il ne doit pas détourner son action à des fins de surveillance ou de contrôle syndical (Intégrité et Indépendance).",
      "Il accepte, car la sophrologie profitera au bien-être général des équipes.",
      "Il accepte mais filtre uniquement les leaders syndicaux pour préserver la paix sociale.",
    ],
    ok: 0,
    expl: "Art. 3 & 4 du Code : le psychologue du travail ne se prête à aucune entreprise d'aliénation ou de surveillance de l'activité syndicale.",
  },
];

interface TribunalProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Tribunal({ store, onStoreChange }: TribunalProps) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  function restart() {
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  function answer(oIdx: number) {
    if (selected !== null) return;
    setSelected(oIdx);
    const c = TRIBUNAL_CASES[idx];
    if (c && oIdx === c.ok) setScore((s) => s + 1);
  }

  function next() {
    const newIdx = idx + 1;
    setIdx(newIdx);
    setSelected(null);
    if (
      newIdx >= TRIBUNAL_CASES.length &&
      score === TRIBUNAL_CASES.length &&
      !store.getBadges().includes("tribunal_master")
    ) {
      store.unlockBadge("tribunal_master");
      onStoreChange();
    }
  }

  return (
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
        ⚖️ Le Tribunal Déontologique
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
        Incarne un membre de la commission d&apos;éthique. Examine la plainte et
        rends ton verdict en accord avec le Code de Déontologie.
      </p>
      <div className="qcard" style={{ padding: 18 }}>
        {idx >= TRIBUNAL_CASES.length
          ? (() => {
              const color = score >= 2 ? "var(--good)" : "var(--bad)";
              return (
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      marginTop: 0,
                      color,
                      fontFamily: "'Fraunces', serif",
                    }}
                  >
                    Session du Tribunal close ⚖️
                  </h3>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      margin: "12px 0",
                      color: "var(--ink)",
                    }}
                  >
                    {score} / {TRIBUNAL_CASES.length}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      marginBottom: 15,
                    }}
                  >
                    {score === TRIBUNAL_CASES.length
                      ? "Verdict parfait ! Tu es un garant rigoureux du Code de Déontologie."
                      : "Certains verdicts violent les règles déontologiques de base."}
                  </p>
                  <button
                    className="btn solid small"
                    style={{ margin: "0 auto" }}
                    onClick={restart}
                  >
                    Recommencer
                  </button>
                </div>
              );
            })()
          : (() => {
              const c = TRIBUNAL_CASES[idx];
              if (!c) return null;
              const isAnswered = selected !== null;
              return (
                <>
                  <div
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    Affaire en cours #{idx + 1}
                  </div>
                  <p
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      margin: "0 0 14px",
                      lineHeight: 1.45,
                      color: "var(--ink)",
                    }}
                  >
                    {c.q}
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {c.opts.map((o, i) => {
                      const style: CSSProperties = {
                        textAlign: "left",
                        justifyContent: "flex-start",
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                      };
                      if (isAnswered && i === c.ok) {
                        style.borderColor = "var(--good)";
                        style.color = "var(--good)";
                        style.background = "var(--goodbg)";
                      } else if (isAnswered && i === selected) {
                        style.borderColor = "var(--bad)";
                        style.color = "var(--bad)";
                        style.background = "var(--badbg)";
                      }
                      return (
                        <button
                          key={i}
                          className="btn opt"
                          style={style}
                          disabled={isAnswered}
                          onClick={() => answer(i)}
                        >
                          <span>{o}</span>
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: 12,
                        borderRadius: 8,
                        fontSize: 13,
                        lineHeight: 1.45,
                        border: `1px solid ${selected === c.ok ? "var(--good)" : "var(--bad)"}`,
                        background:
                          selected === c.ok ? "var(--goodbg)" : "var(--badbg)",
                        color: selected === c.ok ? "var(--good)" : "var(--bad)",
                      }}
                    >
                      {c.expl}
                    </div>
                  )}
                  {isAnswered && (
                    <button
                      className="btn solid small"
                      style={{
                        display: "block",
                        marginTop: 12,
                        marginLeft: "auto",
                      }}
                      onClick={next}
                    >
                      Continuer ➔
                    </button>
                  )}
                </>
              );
            })()}
      </div>
    </div>
  );
}
