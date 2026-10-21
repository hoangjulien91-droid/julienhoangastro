"use client";

import { useState } from "react";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Briefcase,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
    playClickSound();
    triggerHaptic("selection");
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
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
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
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify([newEntry, ...arr]));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      triggerHaptic("success");
      setExportedJournal(true);
    } catch {
      /* ignore */
    }
  }

  const progress = Math.round((step * 100) / SIM_SCENARIOS.length);

  return (
    <div className="space-y-4">
      <p className="hint">
        Incarne un psychologue du travail confronté à une demande délicate en entreprise et gère l&apos;intervention pas à pas.
      </p>

      <div id="simHost">
        {step >= SIM_SCENARIOS.length ? (
          (() => {
            const pct = Math.round((score * 100) / SIM_SCENARIOS.length);
            const isHigh = pct >= 80;
            const isMid = pct >= 50;

            const badgeCls = isHigh
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              : isMid
                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";

            return (
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-4 animate-fadeIn">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${badgeCls}`}
                >
                  <ShieldCheck className="size-3.5" />
                  <span>Intervention Clinique Terminée</span>
                </span>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                    {pct}%
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0 font-medium">
                    Votre score de posture déontologique : <b>{score} / {SIM_SCENARIOS.length}</b>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={exportToJournal}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer active:scale-95 ${
                      exportedJournal
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <BookOpen className="size-3.5" />
                    <span>{exportedJournal ? "✓ Ajouté au Carnet" : "Archiver au Carnet Terrain"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Rejouer le simulateur</span>
                  </button>
                </div>
              </div>
            );
          })()
        ) : (
          (() => {
            const s = SIM_SCENARIOS[step];
            if (!s) return null;
            const isAnswered = selected !== null;

            return (
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="size-3 text-indigo-600 dark:text-indigo-400" />
                    <span>Étape {step + 1} / {SIM_SCENARIOS.length}</span>
                  </span>

                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Score : {score} pts
                  </span>
                </div>

                {/* Minimal Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Situation Prompt */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
                  {s.q}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {s.opts.map((opt, i) => {
                    const isChosen = selected === i;
                    let btnCls = "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                    if (isAnswered) {
                      if (i === s.ok) {
                        btnCls = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold";
                      } else if (isChosen) {
                        btnCls = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
                      } else {
                        btnCls = "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500";
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
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback on answer */}
                {isAnswered && (
                  <div className="space-y-3 pt-1 animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
                    <div
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                        selected === s.ok
                          ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                          : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                      }`}
                    >
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        {selected === s.ok ? (
                          <>
                            <CheckCircle2 className="size-3.5 text-emerald-600" />
                            <span>✓ Posture clinique et déontologique validée</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="size-3.5 text-rose-600" />
                            <span>✗ Posture contestable</span>
                          </>
                        )}
                      </div>
                      <p className="m-0 leading-relaxed">{s.expl}</p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          triggerHaptic("selection");
                          setStep((st) => st + 1);
                          setSelected(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                      >
                        <span>{step + 1 >= SIM_SCENARIOS.length ? "Voir le débriefing clinique" : "Étape suivante"}</span>
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
    </div>
  );
}
