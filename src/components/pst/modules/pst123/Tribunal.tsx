"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Award,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

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
    playClickSound();
    triggerHaptic("selection");
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  function answer(oIdx: number) {
    if (selected !== null) return;
    setSelected(oIdx);
    const c = TRIBUNAL_CASES[idx];
    if (c && oIdx === c.ok) {
      setScore((s) => s + 1);
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
  }

  function next() {
    playClickSound();
    triggerHaptic("selection");
    const newIdx = idx + 1;
    setIdx(newIdx);
    setSelected(null);
    if (
      newIdx >= TRIBUNAL_CASES.length &&
      score + (selected === TRIBUNAL_CASES[idx]?.ok ? 1 : 0) ===
        TRIBUNAL_CASES.length &&
      !store.getBadges().includes("tribunal_master")
    ) {
      store.unlockBadge("tribunal_master");
      onStoreChange();
    }
  }

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Le Tribunal Déontologique · Code 2021</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
          Affaire #{idx + 1} / {TRIBUNAL_CASES.length}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
        Incarne un membre de la commission d&apos;éthique. Examine la plainte et
        rends ton verdict en accord strict avec le Code de Déontologie des
        Psychologues (actualisé 2021).
      </p>

      {idx >= TRIBUNAL_CASES.length ? (
        <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-3.5 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Award className="size-3.5" />
            <span>Session du Tribunal Déontologique close</span>
          </span>

          <div className="space-y-1">
            <div className="text-3xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
              {score} / {TRIBUNAL_CASES.length}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed m-0 font-medium">
              {score === TRIBUNAL_CASES.length
                ? "Verdict parfait ! Tu es un garant rigoureux du Code de Déontologie du Psychologue du Travail."
                : "Certains verdicts violent les règles déontologiques cardinales (secret, autonomie, indépendance)."}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="size-3.5" />
              <span>Réexaminer les dossiers</span>
            </button>
          </div>
        </div>
      ) : (
        (() => {
          const c = TRIBUNAL_CASES[idx];
          if (!c) return null;
          const isAnswered = selected !== null;

          return (
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <ShieldAlert className="size-3" />
                  <span>Plainte / Situation déontologique soumise :</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed m-0">
                  {c.q}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {c.opts.map((o, i) => {
                  const isChosen = selected === i;
                  let btnCls =
                    "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                  if (isAnswered) {
                    if (i === c.ok) {
                      btnCls =
                        "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold";
                    } else if (isChosen) {
                      btnCls =
                        "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
                    } else {
                      btnCls =
                        "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => answer(i)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                    >
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{o}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback on answer */}
              {isAnswered && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  <div
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                      selected === c.ok
                        ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                        : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {selected === c.ok ? (
                        <>
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          <span>Verdict conforme au Code de Déontologie</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="size-3.5 text-rose-600" />
                          <span>Violation déontologique</span>
                        </>
                      )}
                    </div>
                    <p className="m-0 leading-relaxed">{c.expl}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                      <span>
                        {idx + 1 >= TRIBUNAL_CASES.length
                          ? "Clôturer la session"
                          : "Affaire suivante"}
                      </span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()
      )}
    </div>
  );
}
