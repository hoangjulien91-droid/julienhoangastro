"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Layers,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
  Users,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  ANNALES_PST108,
  PST108_PROF_EXAMS,
  type AnnalePst108Item,
  type Pst108ProfId,
} from "@/lib/pst/data/pst108-annales";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

const PART_SECONDS = 60 * 60; // 1h00 par enseignant
const TOTAL_EXAM_SECONDS = PART_SECONDS * 3; // 3h00 au total

const PROF_ORDER: Pst108ProfId[] = ["lucy", "valls", "marot"];

const PROF_UI: Record<
  Pst108ProfId,
  {
    icon: typeof Users;
    pillActive: string;
    cardActive: string;
    badgeBg: string;
    barBg: string;
  }
> = {
  lucy: {
    icon: GraduationCap,
    pillActive:
      "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20",
    cardActive:
      "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/35 ring-2 ring-indigo-500/20",
    badgeBg:
      "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
    barBg: "bg-indigo-600",
  },
  valls: {
    icon: Building2,
    pillActive:
      "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20",
    cardActive:
      "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/35 ring-2 ring-emerald-500/20",
    badgeBg:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    barBg: "bg-emerald-600",
  },
  marot: {
    icon: Users,
    pillActive:
      "bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/20",
    cardActive:
      "border-rose-500 bg-rose-50/70 dark:bg-rose-950/35 ring-2 ring-rose-500/20",
    badgeBg:
      "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
    barBg: "bg-rose-600",
  },
};

function fmtTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export interface Examen108Props {
  store: PstStore;
  onStoreChange: () => void;
  initialProf?: Pst108ProfId;
}

export function Examen108({
  store,
  onStoreChange,
  initialProf,
}: Examen108Props) {
  const [activeProf, setActiveProf] = useState<Pst108ProfId>(
    initialProf ?? "lucy",
  );
  const [fullExamMode, setFullExamMode] = useState(false);

  // Sync si un autre onglet (ex: CoursPst108) demande un prof précis
  useEffect(() => {
    if (initialProf) {
      setActiveProf(initialProf);
    }
  }, [initialProf]);

  const subjectsByProf = useMemo(() => {
    return {
      lucy: ANNALES_PST108.filter((a) => a.prof === "lucy"),
      valls: ANNALES_PST108.filter((a) => a.prof === "valls"),
      marot: ANNALES_PST108.filter((a) => a.prof === "marot"),
    };
  }, []);

  const [subjectIdxByProf, setSubjectIdxByProf] = useState<
    Record<Pst108ProfId, number>
  >({
    lucy: 0,
    valls: 0,
    marot: 0,
  });

  const [elapsedByProf, setElapsedByProf] = useState<
    Record<Pst108ProfId, number>
  >({
    lucy: 0,
    valls: 0,
    marot: 0,
  });

  const [running, setRunning] = useState(false);
  const [finishedByProf, setFinishedByProf] = useState<
    Record<Pst108ProfId, boolean>
  >({
    lucy: false,
    valls: false,
    marot: false,
  });

  const [checkedByProf, setCheckedByProf] = useState<
    Record<Pst108ProfId, number[]>
  >({
    lucy: [],
    valls: [],
    marot: [],
  });

  const [recordedScores, setRecordedScores] = useState<
    Record<Pst108ProfId, number | null>
  >({
    lucy: null,
    valls: null,
    marot: null,
  });

  const [showPlan, setShowPlan] = useState(false);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  const profSubjects = subjectsByProf[activeProf];
  const currentSubjectIdx = subjectIdxByProf[activeProf] % profSubjects.length;
  const activeSubject: AnnalePst108Item =
    profSubjects[currentSubjectIdx] ?? profSubjects[0];

  const draftKey = `exam108_${activeProf}_${activeSubject.id}`;
  const [draft, setDraft] = useState<string>(() =>
    String(store.getMarks()[draftKey] ?? ""),
  );
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(String(store.getMarks()[draftKey] ?? ""));
  }, [draftKey, store]);

  function handleDraftChange(val: string) {
    setDraft(val);
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      store.setMark(draftKey, val);
    }, 250);
  }

  useEffect(() => {
    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, []);

  // Chronomètre 1h00 par professeur actif
  useEffect(() => {
    if (!running || finishedByProf[activeProf]) return;
    const iv = setInterval(() => {
      setElapsedByProf((prev) => ({
        ...prev,
        [activeProf]: prev[activeProf] + 1,
      }));
    }, 1000);
    return () => clearInterval(iv);
  }, [running, activeProf, finishedByProf]);

  function selectProf(prof: Pst108ProfId) {
    playClickSound();
    triggerHaptic("selection");
    setActiveProf(prof);
    setShowPlan(false);
    setShowCorrige(false);
  }

  function selectSubject(idx: number) {
    playClickSound();
    triggerHaptic("selection");
    setSubjectIdxByProf((prev) => ({ ...prev, [activeProf]: idx }));
    setElapsedByProf((prev) => ({ ...prev, [activeProf]: 0 }));
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
    setCheckedByProf((prev) => ({ ...prev, [activeProf]: [] }));
    setRecordedScores((prev) => ({ ...prev, [activeProf]: null }));
    setShowPlan(false);
    setShowCorrige(false);
  }

  function drawRandomSubject() {
    if (profSubjects.length <= 1) return;
    const nextIdx = (currentSubjectIdx + 1) % profSubjects.length;
    selectSubject(nextIdx);
  }

  function toggleFinishCurrentProf() {
    if (finishedByProf[activeProf]) {
      playClickSound();
      setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
      return;
    }
    playSuccessSound();
    triggerHaptic("success");
    setRunning(false);
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: true }));
    setShowPlan(true);
  }

  function resetCurrentProfTimer() {
    playClickSound();
    setRunning(false);
    setElapsedByProf((prev) => ({ ...prev, [activeProf]: 0 }));
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
  }

  function toggleCriterion(idx: number) {
    playClickSound();
    triggerHaptic("selection");
    setCheckedByProf((prev) => {
      const current = prev[activeProf];
      const next = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx];
      return { ...prev, [activeProf]: next };
    });
  }

  function validateSelfEval() {
    const score = checkedByProf[activeProf].length;
    const total = activeSubject.criteres.length;
    playSuccessSound();
    triggerHaptic("success");
    store.recordScore(`examen_${activeProf}`, score, total);
    store.recordScore("examen", score, total);
    onStoreChange();
    const note20 = Math.round((score / Math.max(1, total)) * 20);
    setRecordedScores((prev) => ({ ...prev, [activeProf]: note20 }));
  }

  function copyDraft() {
    if (!draft.trim()) return;
    navigator.clipboard.writeText(draft);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 1800);
  }

  function goNextProf() {
    const idx = PROF_ORDER.indexOf(activeProf);
    const nextProf = PROF_ORDER[(idx + 1) % PROF_ORDER.length];
    selectProf(nextProf);
    if (fullExamMode && !finishedByProf[nextProf]) {
      setRunning(true);
    }
  }

  const profMeta = PST108_PROF_EXAMS[activeProf];
  const ui = PROF_UI[activeProf];
  const ProfIcon = ui.icon;

  const activeElapsed = elapsedByProf[activeProf];
  const activeRemaining = Math.max(0, PART_SECONDS - activeElapsed);
  const isOverTime = activeElapsed > PART_SECONDS;
  const pctPart = Math.min(100, Math.round((activeElapsed * 100) / PART_SECONDS));

  const totalElapsed3h =
    elapsedByProf.lucy + elapsedByProf.valls + elapsedByProf.marot;
  const completedPartsCount = PROF_ORDER.filter((p) => finishedByProf[p]).length;

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const checkedSet = new Set(checkedByProf[activeProf]);
  const noteEstimee = Math.round(
    (checkedSet.size / Math.max(1, activeSubject.criteres.length)) * 20,
  );

  return (
    <div className="space-y-6">
      {/* ── EN-TÊTE ARCHITECTURE 3H00 = 3 × 1H00 ─────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-indigo-500/20 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25">
              <Clock className="size-3" />
              <span>PST108 · Épreuve Finale de 3h00 = 3 × 1h00 par Enseignant</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 dark:text-white m-0">
              Les 3 Petits Examens d&apos;1h00 (Lucy · Valls · Marot)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              L&apos;examen de <b>PST108 dure 3h00</b> mais est divisé en{" "}
              <b>3 épreuves distinctes de 1h00 chacune</b>, rédigées et corrigées
              indépendamment par chaque professeur. Entraînez-vous soit{" "}
              <b>professeur par professeur (format 1h00)</b>, soit en{" "}
              <b>enchaînant le parcours complet 3h00</b>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              setFullExamMode((m) => !m);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              fullExamMode
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-500/50"
            }`}
          >
            <Layers className="size-4" />
            <span>
              {fullExamMode
                ? `Parcours 3h00 actif (${fmtTime(totalElapsed3h)} / 3h00)`
                : "Activer le Parcours Complet 3h00"}
            </span>
          </button>
        </div>

        {/* Barre récapitulative des 3 épreuves */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PROF_ORDER.map((profId, index) => {
            const meta = PST108_PROF_EXAMS[profId];
            const pUi = PROF_UI[profId];
            const Icon = pUi.icon;
            const isSelected = activeProf === profId;
            const isDone = finishedByProf[profId];
            const pElapsed = elapsedByProf[profId];
            const pCount = subjectsByProf[profId].length;
            const pScore = recordedScores[profId];

            return (
              <button
                key={profId}
                type="button"
                onClick={() => selectProf(profId)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? pUi.cardActive
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-8 rounded-xl border flex items-center justify-center shrink-0 ${pUi.badgeBg}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                        Partie {index + 1} · 1h00
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {meta.nom}
                      </div>
                    </div>
                  </div>

                  {isDone ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      ✓ Terminée
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {pCount} sujets
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-snug">
                  {meta.sousTitre}
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-500 dark:text-slate-400">
                    Chrono : <b className="text-slate-800 dark:text-slate-200">{fmtTime(pElapsed)}</b> / 60:00
                  </span>
                  {pScore !== null ? (
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      Auto-éval : {pScore}/20
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-500">
                      {isSelected ? "● Actif" : "Ouvrir →"}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {fullExamMode && (
          <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-500/25 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                Épreuve globale 3h00 : {completedPartsCount}/3 sous-épreuves terminées · Temps cumulé :{" "}
                <span className="font-mono font-bold">{fmtTime(totalElapsed3h)}</span> /{" "}
                <span className="font-mono">{fmtTime(TOTAL_EXAM_SECONDS)}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={goNextProf}
              className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer transition-colors"
            >
              Passer au prof suivant →
            </button>
          </div>
        )}
      </div>

      {/* ── FICHE DE CETTE SOUS-ÉPREUVE 1H00 ──────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        {/* Bandeau prof actif + Règle d'or + Piège */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5 flex-1 min-w-[240px]">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${ui.badgeBg}`}
              >
                <ProfIcon className="size-3.5" />
                <span>Mini-Examen · {profMeta.nom}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Durée impartie : {profMeta.dureeLabel}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              <b>Périmètre révisé :</b> {profMeta.programme}
            </p>
          </div>

          {/* Contrôles chronomètre 1h00 */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1.5 rounded-xl font-mono text-sm font-black border ${
                  isOverTime
                    ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40"
                    : running
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                }`}
              >
                {isOverTime
                  ? `+${fmtTime(activeElapsed - PART_SECONDS)} dépassé`
                  : `Reste ${fmtTime(activeRemaining)}`}
              </div>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setRunning((r) => !r);
                }}
                disabled={finishedByProf[activeProf]}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-45 text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {running ? (
                  <>
                    <Pause className="size-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3.5" />
                    <span>{activeElapsed > 0 ? "Reprendre" : "Lancer 1h00"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetCurrentProfTimer}
                title="Réinitialiser le chronomètre de ce professeur"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>

            <div className="w-56 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isOverTime ? "bg-rose-500" : ui.barBg
                }`}
                style={{ width: `${pctPart}%` }}
              />
            </div>
          </div>
        </div>

        {/* Règle d'or & Piège spécifique au prof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Attendu n°1 de {profMeta.nom}</span>
            </div>
            {profMeta.regleOr}
          </div>
          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-500/20 text-amber-900 dark:text-amber-200 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>Piège éliminatoire à éviter</span>
            </div>
            {profMeta.piegePrincipal}
          </div>
        </div>

        {/* Sélecteur de sujets pour CE professeur uniquement */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sujets d&apos;entraînement 1h00 — {profMeta.nom} ({profSubjects.length})
            </span>
            {profSubjects.length > 1 && (
              <button
                type="button"
                onClick={drawRandomSubject}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="size-3.5" />
                <span>Sujet suivant de {profMeta.nom}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {profSubjects.map((subj, idx) => {
              const active = idx === currentSubjectIdx;
              const saved = Boolean(
                String(store.getMarks()[`exam108_${activeProf}_${subj.id}`] ?? "").trim(),
              );
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => selectSubject(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? ui.pillActive
                      : "bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">
                    #{idx + 1}
                  </span>
                  <span className="truncate max-w-[230px]">
                    {subj.titre.replace(/^Sujet \d+ :\s*|^Dissertation :\s*/i, "")}
                  </span>
                  {saved && (
                    <span
                      className="size-2 rounded-full bg-amber-400 shrink-0"
                      title="Brouillon sauvegardé"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ÉNONCÉ DU SUJET */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${ui.badgeBg}`}>
              {activeSubject.session}
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
              Format 1h00 · Copie structurée 2 parties
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug m-0">
            {activeSubject.titre}
          </h3>

          {activeSubject.contexteCitation && (
            <blockquote className="p-3 rounded-xl bg-white dark:bg-slate-900 border-l-4 border-indigo-500 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 m-0">
              {activeSubject.contexteCitation}
            </blockquote>
          )}

          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Consignes / Questions à traiter en 60 minutes :
            </div>
            <ul className="m-0 pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              {activeSubject.questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ZONE DE RÉDACTION 1H00 */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="exam108-draft-box"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <FileText className="size-3.5 text-indigo-500" />
              <span>Copie d&apos;examen ({profMeta.nom} · 1h00)</span>
            </label>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400">
                <b>{wordCount}</b> mots (repère 1h00 : ~450–650 mots)
              </span>
              {draft.trim() && (
                <button
                  type="button"
                  onClick={copyDraft}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <textarea
            id="exam108-draft-box"
            rows={10}
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            placeholder={`Rédigez votre réponse de 1h00 pour ${profMeta.nom} (Introduction courte avec problématique + Plan en 2 parties avec définitions rigoureuses, auteurs justifiés et exemple clinique du travail réel)...`}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowPlan((v) => !v);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="size-3.5" />
                <span>{showPlan ? "Masquer le plan" : "Voir plan conseillé (1h00)"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowCorrige((v) => !v);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
              >
                {showCorrige ? (
                  <>
                    <EyeOff className="size-3.5" />
                    <span>Masquer le corrigé modèle</span>
                  </>
                ) : (
                  <>
                    <Eye className="size-3.5" />
                    <span>Corrigé d&apos;excellence (18+/20)</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleFinishCurrentProf}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                finishedByProf[activeProf]
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
              }`}
            >
              <Award className="size-4" />
              <span>
                {finishedByProf[activeProf]
                  ? "Reprendre cette sous-épreuve"
                  : `Terminer & Auto-évaluer (${profMeta.nom})`}
              </span>
            </button>
          </div>
        </div>

        {/* PLAN CONSEILLÉ */}
        {showPlan && (
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-500/25 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              Plan conseillé pour 1h00 · {profMeta.nom}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSubject.planConseille.map((p, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/60 space-y-1"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {p.partie}
                  </div>
                  <ul className="m-0 pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                    {p.sousParties.map((sp, j) => (
                      <li key={j}>{sp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRILLE D'AUTO-ÉVALUATION APRÈS FIN OU SUR DEMANDE */}
        {finishedByProf[activeProf] && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-500/25 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 m-0">
                  Auto-évaluation de la sous-épreuve ({profMeta.nom})
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 m-0">
                  Cochez les attendus effectivement traités dans votre copie de 1h00 :
                </p>
              </div>
              <div className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-200">
                Note estimée : {noteEstimee} / 20
              </div>
            </div>

            <div className="space-y-2">
              {activeSubject.criteres.map((crit, idx) => {
                const isChecked = checkedSet.has(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCriterion(idx)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                      isChecked
                        ? "bg-white dark:bg-slate-900 border-emerald-500 text-slate-900 dark:text-white"
                        : "bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 size-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-400"
                      }`}
                    >
                      {isChecked && <Check className="size-3" />}
                    </span>
                    <span>{crit}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={validateSelfEval}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
              >
                Enregistrer ce score ({noteEstimee}/20)
              </button>

              <button
                type="button"
                onClick={goNextProf}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
              >
                Passer à l&apos;épreuve 1h00 suivante →
              </button>
            </div>
          </div>
        )}

        {/* CORRIGÉ MODÈLE DÉTAILLÉ */}
        {showCorrige && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Corrigé modèle d&apos;excellence (18+/20) — {profMeta.nom}
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {activeSubject.conceptsCles.slice(0, 3).join(" · ")}
              </span>
            </div>

            <div
              className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeSubject.corrigeExcellence }}
            />

            <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/25 border border-rose-500/20">
              <div className="text-xs font-bold text-rose-800 dark:text-rose-300 mb-1">
                Pièges à éviter absolument :
              </div>
              <ul className="m-0 pl-4 space-y-0.5 text-xs text-rose-900 dark:text-rose-200">
                {activeSubject.piegesAEviter.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
