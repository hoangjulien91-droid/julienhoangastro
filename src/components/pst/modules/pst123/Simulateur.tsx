"use client";

import { useState } from "react";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

const SIM_SCENARIOS = [
  {
    q: "Le DRH vous appelle en urgence : 'Nous avons un cadre, M. Martin, qui est ingérable. Il est agressif et bloque le travail. Je veux que vous lui fassiez passer un test de personnalité pour valider s'il a sa place chez nous.' Quelle est votre posture clinique ?",
    opts: [
      "Accepter. Après tout, le DRH est le payeur et le test de personnalité permettra d'objectiver le problème.",
      "Refuser fermement la demande brute en expliquant que le but assigné n'est pas éthique et qu'un test ne peut servir à exclure un salarié.",
      "Accepter de rencontrer M. Martin pour un entretien clinique du travail, tout en expliquant au DRH que le test de personnalité n'est pas adapté et que l'évaluation nécessite son consentement éclairé.",
    ],
    ok: 2,
    expl: "Le psychologue négocie le mandat. Il refuse l'instrumentalisation du test à des fins d'exclusion, mais propose une analyse clinique du rapport au travail, respectueuse de la déontologie.",
  },
  {
    q: "Lors de votre entretien de demande avec le DRH, celui-ci insiste : 'Si vous refusez le test, notre direction estime que vous manquez de loyauté. Vous devez me faire un rapport écrit détaillé de tout ce que M. Martin vous dira.'",
    opts: [
      "Accepter par crainte de perdre votre contrat ou votre poste de salarié.",
      "Défendre l'article du Code de déontologie sur le secret professionnel : vous ne transmettrez aucun propos nominatif. Vous rédigerez un avis technique anonymisé sur l'organisation de son poste de travail.",
      "Proposer un compromis : vous ferez un résumé oral informel des confidences de M. Martin.",
    ],
    ok: 1,
    expl: "L'indépendance professionnelle et le secret professionnel sont non négociables. Le psychologue protège le sujet et se limite à des conclusions d'ordre général ou organisationnel.",
  },
  {
    q: "M. Martin accepte de vous rencontrer. Pendant l'entretien, il exprime une souffrance éthique majeure : son manager lui demande de falsifier des rapports de sécurité. Comment réagissez-vous ?",
    opts: [
      "Lui conseiller d'obéir car l'entreprise passe avant tout.",
      "L'aider à analyser la tension entre la prescription (falsifier) et les règles de l'art (sécurité), et lui proposer de l'accompagner pour en parler au médecin du travail ou aux IRP.",
      "Rapporter immédiatement les faits au DRH pour dénoncer le manager.",
    ],
    ok: 1,
    expl: "Le psychologue replace le problème sur le terrain de l'organisation et de la déontologie professionnelle. Il aide le salarié à mobiliser les relais compétents sous secret partagé.",
  },
];

export function Simulateur() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [exportedJournal, setExportedJournal] = useState(false);

  function restart() {
    setStep(0);
    setScore(0);
    setSelected(null);
    setExportedJournal(false);
  }

  function answer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const s = SIM_SCENARIOS[step];
    if (s && idx === s.ok) {
      setScore((sc) => sc + 1);
      playSuccessSound();
    } else {
      playReviewSound();
    }
  }

  function exportToJournal() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(list) ? list : [];
      const newEntry = {
        id: `jt-sim123-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        moduleCode: "PST123",
        situation:
          "[Simulateur PST 123 · Demande DRH et souffrance éthique (M. Martin)] Demande d'exclusion par test de personnalité et injonction de falsification de rapports de sécurité.",
        prescrit: `Score de posture déontologique : ${score} / ${SIM_SCENARIOS.length}.`,
        reel: "Négociation du mandat, consentement éclairé, secret professionnel opposable à l'employeur, relais médecin du travail / IRP.",
        conceptKey: "Secret professionnel & Indépendance technique",
        authorRef: "Code de déontologie des psychologues",
      };
      localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify([newEntry, ...arr]),
      );
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      setExportedJournal(true);
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      <p className="hint">
        Incarne un psychologue du travail confronté à une demande délicate en
        entreprise et gère l&apos;intervention pas à pas.
      </p>
      <div id="simHost" className="qbox">
        {step >= SIM_SCENARIOS.length
          ? (() => {
              const pct = Math.round((score * 100) / SIM_SCENARIOS.length);
              const color =
                pct >= 80
                  ? "var(--good, #10b981)"
                  : pct >= 50
                    ? "var(--warning, #f59e0b)"
                    : "var(--bad, #ef4444)";
              return (
                <div
                  className="qcard"
                  style={{
                    borderTop: `4px solid ${color}`,
                    padding: 20,
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ color, marginTop: 0, fontSize: 18 }}>
                    Intervention Terminée !
                  </h3>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color,
                      margin: "15px 0",
                    }}
                  >
                    {pct}%
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      marginBottom: 20,
                    }}
                  >
                    Votre score de posture déontologique :{" "}
                    <b>
                      {score} / {SIM_SCENARIOS.length}
                    </b>
                    .
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className={`btn${exportedJournal ? " active" : ""}`}
                      style={{ flex: 1 }}
                      onClick={exportToJournal}
                    >
                      {exportedJournal
                        ? "✓ Ajouté au Carnet Terrain"
                        : "→ Carnet Terrain"}
                    </button>
                    <button
                      type="button"
                      className="btn solid"
                      style={{ flex: 1 }}
                      onClick={restart}
                    >
                      ↻ Rejouer le simulateur
                    </button>
                  </div>
                </div>
              );
            })()
          : (() => {
              const s = SIM_SCENARIOS[step];
              if (!s) return null;
              const progress = Math.round((step * 100) / SIM_SCENARIOS.length);
              const isAnswered = selected !== null;
              return (
                <>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontWeight: 700,
                      marginBottom: 8,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      Étape {step + 1} sur {SIM_SCENARIOS.length}
                    </span>
                    <span>Score : {score}</span>
                  </div>
                  <div
                    className="sim-progress"
                    style={{
                      height: 5,
                      background: "var(--line)",
                      borderRadius: 3,
                      overflow: "hidden",
                      marginBottom: 15,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "var(--accent)",
                        width: `${progress}%`,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      margin: "0 0 15px",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    {s.q}
                  </h3>
                  <div className="opts" style={{ marginBottom: 15 }}>
                    {s.opts.map((opt, i) => {
                      const cls = isAnswered
                        ? i === s.ok
                          ? "opt correct"
                          : i === selected
                            ? "opt wrong"
                            : "opt"
                        : "opt";
                      return (
                        <button
                          key={i}
                          className={cls}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "12px 15px",
                            marginBottom: 8,
                          }}
                          disabled={isAnswered}
                          onClick={() => answer(i)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        fontSize: 12.5,
                        marginBottom: 15,
                        borderLeft: `4px solid ${selected === s.ok ? "var(--good)" : "var(--bad)"}`,
                        background:
                          selected === s.ok
                            ? "var(--goodbg, #e6f4ea)"
                            : "var(--badbg, #fbeae8)",
                        color:
                          selected === s.ok
                            ? "var(--good, #137333)"
                            : "var(--bad, #ef4444)",
                      }}
                    >
                      <b>{selected === s.ok ? "✓ Correct." : "✗ Incorrect."}</b>{" "}
                      {selected !== s.ok && (
                        <>
                          La réponse attendue était : &quot;{s.opts[s.ok]}
                          &quot;. <br />
                        </>
                      )}
                      {s.expl}
                    </div>
                  )}
                  {isAnswered && (
                    <button
                      className="btn solid small"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setStep((st) => st + 1);
                        setSelected(null);
                      }}
                    >
                      Continuer →
                    </button>
                  )}
                </>
              );
            })()}
      </div>
    </div>
  );
}
