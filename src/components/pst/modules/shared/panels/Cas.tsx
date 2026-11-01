"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  CheckCircle2,
  RotateCcw,
  ListFilter,
  Target,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Scale,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

interface CaseAnswers {
  q1: number | null;
  q2: number | null;
}

interface CasProps {
  data: CaseItem[];
  hint: string;
}

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";
const METHODE_NOTES_KEY = "pst_cas_methode_notes_v1";
const METHODE_CRITERIA_KEY = "pst_cas_methode_criteria_v1";

interface MethodeStepNotes {
  temps1: string;
  temps2: string;
  temps3: string;
}

const METHODE_CRITERIA = [
  {
    step: "Temps 1 (6 pts)",
    label: "Identification explicite de l'écart travail prescrit vs travail réel (Wisner, Leplat)",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Recueil objectif des manifestations physiques, somatiques ou relationnelles sans jugement de valeur",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Repérage des contraintes matérielles, temporelles et logicielles pesant sur l'opérateur",
    pts: "1.5 pt",
  },
  {
    step: "Temps 1 (6 pts)",
    label: "Cartographie des asymétries de pouvoir et des marges de manœuvre réelles",
    pts: "1.5 pt",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Refus catégorique du psychologisme (zéro incrimination individuelle ou 'faiblesse')",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Mobilisation précise d'au moins 2 auteurs majeurs du cours avec leurs concepts opératoires",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Démonstration du mécanisme : comment l'organisation prescrite génère directement la tension",
    pts: "2 pts",
  },
  {
    step: "Temps 2 (8 pts)",
    label: "Prise en compte de la dimension collective (présence ou destruction des collectifs/défenses)",
    pts: "2 pts",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Refus motivé de la posture RH d'expertise punitive ou de sélection individuelle",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Réouverture d'un espace de controverse et de délibération collective sur le travail bien fait",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Respect strict du secret professionnel (Art. 226-13 CP) et de l'autonomie technique (Code 2021)",
    pts: "1.5 pt",
  },
  {
    step: "Temps 3 (6 pts)",
    label: "Formulation de préconisations d'aménagement organisationnel capacitantes et durables",
    pts: "1.5 pt",
  },
];

export function Cas({ data, hint }: CasProps) {
  const [answers, setAnswers] = useState<CaseAnswers[]>(() =>
    data.map(() => ({ q1: null, q2: null })),
  );
  const [mode, setMode] = useState<"list" | "focus" | "methode">("list");
  const [focusIdx, setFocusIdx] = useState(0);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);

  // Méthodologie en 3 temps (Cnam)
  const [methodeVignetteIdx, setMethodeVignetteIdx] = useState(0);
  const [methodeNotes, setMethodeNotes] = useState<Record<number, MethodeStepNotes>>({});
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    METHODE_CRITERIA.map(() => false),
  );
  const [copiedMethode, setCopiedMethode] = useState(false);

  useEffect(() => {
    try {
      const rawNotes = localStorage.getItem(METHODE_NOTES_KEY);
      if (rawNotes) {
        const parsed = JSON.parse(rawNotes);
        if (parsed && typeof parsed === "object") setMethodeNotes(parsed);
      }
      const rawCriteria = localStorage.getItem(METHODE_CRITERIA_KEY);
      if (rawCriteria) {
        const parsed = JSON.parse(rawCriteria);
        if (Array.isArray(parsed) && parsed.length === METHODE_CRITERIA.length) {
          setCheckedCriteria(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  function updateMethodeNote(step: "temps1" | "temps2" | "temps3", value: string) {
    const cur = methodeNotes[methodeVignetteIdx] ?? { temps1: "", temps2: "", temps3: "" };
    const next = {
      ...methodeNotes,
      [methodeVignetteIdx]: { ...cur, [step]: value },
    };
    setMethodeNotes(next);
    try {
      localStorage.setItem(METHODE_NOTES_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function toggleCriterion(idx: number) {
    setCheckedCriteria((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      if (next[idx]) {
        playSuccessSound();
        triggerHaptic("success");
      } else {
        playClickSound();
        triggerHaptic("selection");
      }
      try {
        localStorage.setItem(METHODE_CRITERIA_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function handleCopyMethode() {
    const v = data[methodeVignetteIdx];
    const n = methodeNotes[methodeVignetteIdx] ?? { temps1: "", temps2: "", temps3: "" };
    const validCount = checkedCriteria.filter(Boolean).length;

    const fullText = `ANALYSE DE CAS CLINIQUE — MÉTHODOLOGIE CNAM EN 3 TEMPS (/20)
${v ? `Vignette #${methodeVignetteIdx + 1} : « ${v.vignette} »` : "Cas clinique"}

1. TEMPS 1 : DIAGNOSTIC CLINIQUE DES FAITS & RECUEIL DU TRAVAIL RÉEL (6 pts)
${n.temps1.trim() || "[Non renseigné]"}

2. TEMPS 2 : MODÉLISATION THÉORIQUE ANTI-PSYCHOLOGISME (8 pts)
${n.temps2.trim() || "[Non renseigné]"}

3. TEMPS 3 : PRÉCONISATIONS D'INTERVENTION & POSTURE DÉONTOLOGIQUE (6 pts)
${n.temps3.trim() || "[Non renseigné]"}

AUTO-ÉVALUATION CNAM :
${validCount} / ${METHODE_CRITERIA.length} critères d'excellence validés (${Math.round((validCount / METHODE_CRITERIA.length) * 20)}/20)`;

    navigator.clipboard.writeText(fullText);
    playSuccessSound();
    triggerHaptic("success");
    setCopiedMethode(true);
    toast.success("Analyse clinique en 3 temps copiée au presse-papier !");
    setTimeout(() => setCopiedMethode(false), 2000);
  }

  function answer(caseIdx: number, question: "q1" | "q2", optIdx: number) {
    const c = data[caseIdx];
    if (!c) return;
    const isOk = !!c[question].options[optIdx]?.ok;
    if (isOk) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }

    setAnswers((prev) => {
      const next = prev.slice();
      const cur = next[caseIdx];
      if (!cur || cur[question] !== null) return prev;
      next[caseIdx] = { ...cur, [question]: optIdx };
      return next;
    });
  }

  function exportCaseToJournal(c: CaseItem, idx: number) {
    try {
      const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const ok1 = c.q1.options.find((o) => o.ok);
      const ok2 = c.q2.options.find((o) => o.ok);
      const entry = {
        id: `cas-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        context: `Vignette clinique #${idx + 1}`,
        ue: "PST106",
        observation: c.vignette,
        concept: ok1 ? ok1.label : c.q1.prompt,
        posture: ok2 ? `${ok2.label} — ${ok2.fb}` : c.q2.prompt,
      };
      const next = Array.isArray(list) ? [entry, ...list] : [entry];
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      triggerHaptic("success");
      setExportedIdx(idx);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  const totalQuestions = data.length * 2;
  let answeredQuestions = 0;
  let correctQuestions = 0;
  answers.forEach((ans, idx) => {
    const c = data[idx];
    if (!c) return;
    if (ans.q1 !== null) {
      answeredQuestions++;
      if (c.q1.options[ans.q1]?.ok) correctQuestions++;
    }
    if (ans.q2 !== null) {
      answeredQuestions++;
      if (c.q2.options[ans.q2]?.ok) correctQuestions++;
    }
  });

  const pct =
    totalQuestions > 0
      ? Math.round((answeredQuestions * 100) / totalQuestions)
      : 0;
  const pctAcc =
    answeredQuestions > 0
      ? Math.round((correctQuestions * 100) / answeredQuestions)
      : 0;

  function renderCaseCard(c: CaseItem, idx: number) {
    const ans = answers[idx] ?? { q1: null, q2: null };
    const q1Answered = ans.q1 !== null;
    const q2Answered = ans.q2 !== null;

    return (
      <div
        key={idx}
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Briefcase className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Vignette Clinique #{idx + 1} / {data.length}
            </span>
          </span>

          <button
            type="button"
            onClick={() => exportCaseToJournal(c, idx)}
            title="Archiver cette vignette clinique et sa résolution dans le Carnet de Terrain"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <BookmarkPlus className="size-3 text-slate-500" />
            <span>{exportedIdx === idx ? "✓ Archivé" : "Carnet Terrain"}</span>
          </button>
        </div>

        {/* Clinical Vignette Quote */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
            « {c.vignette} »
          </p>
        </div>

        {/* Question 1: Concept clinique */}
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              Question 1
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {c.q1.prompt}
            </span>
          </div>

          <div className="space-y-2">
            {c.q1.options.map((opt, oIdx) => {
              const isChosen = ans.q1 === oIdx;
              let btnCls =
                "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

              if (q1Answered) {
                if (opt.ok) {
                  btnCls =
                    "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                } else if (isChosen) {
                  btnCls =
                    "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
                } else {
                  btnCls =
                    "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={q1Answered}
                  onClick={() => answer(idx, "q1", oIdx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                >
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {q1Answered && ans.q1 !== null && (
            <div
              className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                c.q1.options[ans.q1]?.ok
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                  : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
              }`}
              dangerouslySetInnerHTML={{
                __html: c.q1.options[ans.q1]?.fb ?? "",
              }}
            />
          )}
        </div>

        {/* Question 2: Posture clinique */}
        {q1Answered && (
          <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Question 2
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                {c.q2.prompt}
              </span>
            </div>

            <div className="space-y-2">
              {c.q2.options.map((opt, oIdx) => {
                const isChosen = ans.q2 === oIdx;
                let btnCls =
                  "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

                if (q2Answered) {
                  if (opt.ok) {
                    btnCls =
                      "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                  } else if (isChosen) {
                    btnCls =
                      "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
                  } else {
                    btnCls =
                      "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={q2Answered}
                    onClick={() => answer(idx, "q2", oIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                  >
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {q2Answered && ans.q2 !== null && (
              <div
                className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                  c.q2.options[ans.q2]?.ok
                    ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                    : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                }`}
                dangerouslySetInnerHTML={{
                  __html: c.q2.options[ans.q2]?.fb ?? "",
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Mode Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Target className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Étapes : {answeredQuestions} / {totalQuestions} ({pct}%)
              </span>
            </span>

            {answeredQuestions > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>
                  Diagnostic : {correctQuestions}/{answeredQuestions} ({pctAcc}
                  %)
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setMode("list");
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "list"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Vue Liste ({data.length})
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setMode("focus");
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "focus"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Focus 1 par 1
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setMode("methode");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "methode"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
              }`}
            >
              <GraduationCap className="size-3" />
              <span>Méthode 3 Temps (/20)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setAnswers(data.map(() => ({ q1: null, q2: null })));
                setFocusIdx(0);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {mode === "methode" ? (
        <div className="space-y-5 animate-fadeIn">
          {/* Header Banner */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                <GraduationCap className="size-3.5" />
                <span>Méthodologie Officielle CNAM · Option B /20</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/80 dark:bg-slate-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>
                  {checkedCriteria.filter(Boolean).length} / {METHODE_CRITERIA.length} critères validés (
                  {Math.round((checkedCriteria.filter(Boolean).length / METHODE_CRITERIA.length) * 20)}/20)
                </span>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
              La Démarche d&apos;Analyse Clinique en 3 Temps Canoniques
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
              À l&apos;examen du Titre RNCP 7 Psychologue du Travail, l&apos;étude de cas clinique (Option B) sanctionne
              sévèrement toute posture de « bon sens » ou de « gestion RH ». Votre copie doit impérativement articuler
              les 3 temps académiques ci-dessous.
            </p>
          </div>

          {/* 3 Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Temps 1 */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                  Temps 1 · 6 Points
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">Faits &amp; Réel</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                1. Diagnostic Clinique des Faits &amp; Recueil du Travail Réel
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                Relever objectivement ce que font concrètement les opérateurs face aux failles de la prescription.
                Dégager l&apos;écart prescrit vs réel (Wisner, Leplat) et les signaux de souffrance (somatisation, conflits, turnover).
              </p>
              <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                <strong className="block font-bold">Règle d&apos;or :</strong>
                <span>Ne jamais qualifier un écart de « faute » : c&apos;est une régulation pour faire tourner le système.</span>
              </div>
            </div>

            {/* Temps 2 */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  Temps 2 · 8 Points
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">Concepts Clés</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                2. Modélisation Théorique Anti-Psychologisme
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                Interpréter les faits par les concepts du cours (Clot, Wisner, Dejours, Sainsaulieu, Dubar, Rabardel).
                Démontrer que la souffrance découle de l&apos;organisation du travail et non d&apos;une faiblesse individuelle.
              </p>
              <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-[11px] text-purple-900 dark:text-purple-200 space-y-1">
                <strong className="block font-bold">Interdiction absolue :</strong>
                <span>Le psychologisme (« manque de résilience », « profil anxieux »). Tout est clinique et organisationnel.</span>
              </div>
            </div>

            {/* Temps 3 */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  Temps 3 · 6 Points
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">Déontologie</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                3. Préconisations d&apos;Intervention &amp; Déontologie
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                Refuser la commande de sélection ou d&apos;évaluation individuelle de la DRH.
                Restituer collectivement les déterminants du travail et réouvrir des espaces de controverse sur le travail bien fait.
              </p>
              <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong className="block font-bold">Cadre légal impératif :</strong>
                <span>Art. 1, 5, 7, 9 du Code 2021 &amp; Secret professionnel (Art. 226-13 CP).</span>
              </div>
            </div>
          </div>

          {/* Interactive Scratchpad Trainer */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  <FileText className="size-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Atelier d&apos;Entraînement Clinique</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Vignette #{methodeVignetteIdx + 1} / {data.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyMethode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  {copiedMethode ? (
                    <>
                      <Check className="size-3 text-emerald-300" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copier l&apos;analyse</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Vignette switcher pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {data.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setMethodeVignetteIdx(i);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    i === methodeVignetteIdx
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  Cas #{i + 1}
                </button>
              ))}
            </div>

            {/* Selected Vignette Quote */}
            {data[methodeVignetteIdx] && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
                  « {data[methodeVignetteIdx]!.vignette} »
                </p>
              </div>
            )}

            {/* 3 Textareas */}
            <div className="space-y-4 pt-1">
              {/* Step 1 input */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                  <span>1. Diagnostic des Faits Cliniques &amp; Travail Réel (Temps 1)</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {(methodeNotes[methodeVignetteIdx]?.temps1 ?? "").trim().split(/\s+/).filter(Boolean).length} mots
                  </span>
                </label>
                <textarea
                  value={methodeNotes[methodeVignetteIdx]?.temps1 ?? ""}
                  onChange={(e) => updateMethodeNote("temps1", e.target.value)}
                  placeholder="Relevez les faits observables : prescriptions formelles, écarts au travail réel, manifestations physiques/somatiques, dysfonctionnements..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
                />
              </div>

              {/* Step 2 input */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
                  <span>2. Modélisation Théorique Anti-Psychologisme (Temps 2)</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {(methodeNotes[methodeVignetteIdx]?.temps2 ?? "").trim().split(/\s+/).filter(Boolean).length} mots
                  </span>
                </label>
                <textarea
                  value={methodeNotes[methodeVignetteIdx]?.temps2 ?? ""}
                  onChange={(e) => updateMethodeNote("temps2", e.target.value)}
                  placeholder="Mobilisez 2 à 3 concepts d'auteurs (activité empêchée, souffrance éthique, double transaction, genèse instrumentale, défenses collectives). Zéro explication par la personnalité !"
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              {/* Step 3 input */}
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  <span>3. Préconisations d&apos;Intervention &amp; Déontologie (Temps 3)</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {(methodeNotes[methodeVignetteIdx]?.temps3 ?? "").trim().split(/\s+/).filter(Boolean).length} mots
                  </span>
                </label>
                <textarea
                  value={methodeNotes[methodeVignetteIdx]?.temps3 ?? ""}
                  onChange={(e) => updateMethodeNote("temps3", e.target.value)}
                  placeholder="Posez votre cadre déontologique : refus d'évaluer les personnes, respect du secret professionnel, restitution collective, réouverture des espaces de délibération sur le travail bien fait..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>
          </div>

          {/* Grille d'Auto-Évaluation (12 Critères Cnam /20) */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Grille Officielle d&apos;Auto-Évaluation CNAM (12 Critères)</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  const empty = METHODE_CRITERIA.map(() => false);
                  setCheckedCriteria(empty);
                  try {
                    localStorage.setItem(METHODE_CRITERIA_KEY, JSON.stringify(empty));
                  } catch {
                    /* ignore */
                  }
                }}
                className="text-xs font-mono font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
              >
                Tout réinitialiser
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {METHODE_CRITERIA.map((crit, cIdx) => {
                const isChecked = !!checkedCriteria[cIdx];
                return (
                  <label
                    key={cIdx}
                    onClick={() => toggleCriterion(cIdx)}
                    className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 select-none active:scale-99 ${
                      isChecked
                        ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-medium"
                        : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 size-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {crit.step}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-md bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                          {crit.pts}
                        </span>
                      </div>
                      <p className={`text-xs m-0 ${isChecked ? "" : "text-slate-600 dark:text-slate-400"}`}>
                        {crit.label}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : mode === "focus" ? (
        <div className="space-y-4">
          {data[focusIdx] && renderCaseCard(data[focusIdx]!, focusIdx)}

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              disabled={focusIdx <= 0}
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setFocusIdx((i) => Math.max(0, i - 1));
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="size-3.5" />
              <span>Précédente</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              {focusIdx + 1} / {data.length}
            </span>

            <button
              type="button"
              disabled={focusIdx >= data.length - 1}
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setFocusIdx((i) => Math.min(data.length - 1, i + 1));
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>Suivante</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div id="casHost" className="space-y-4">
          {data.map((c, idx) => renderCaseCard(c, idx))}
        </div>
      )}
    </div>
  );
}
