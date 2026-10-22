"use client";

import { useEffect, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { EXAM_SUBJECTS } from "@/lib/pst/data/pst123";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  GraduationCap,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  History,
  Trash2,
  FileText,
} from "lucide-react";

type ExamType =
  | "random"
  | "dubar"
  | "bourdieu"
  | "sainsaulieu"
  | "honneth"
  | "deontologie"
  | "cas";

function pickSubject(type: ExamType) {
  const pool =
    type === "random"
      ? EXAM_SUBJECTS
      : EXAM_SUBJECTS.filter((s) => s.type === type);
  const list = pool.length ? pool : EXAM_SUBJECTS;
  return list[Math.floor(Math.random() * list.length)] ?? EXAM_SUBJECTS[0];
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

interface ExamProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Exam({ store, onStoreChange }: ExamProps) {
  const [view, setView] = useState<"setup" | "active" | "debrief">("setup");
  const [examType, setExamType] = useState<ExamType>("random");
  const [duration, setDuration] = useState(45);
  const [subject, setSubject] = useState(() => EXAM_SUBJECTS[0]);
  const [draft, setDraft] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (view !== "active" || remaining <= 0 || paused) return;
    const iv = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(iv);
  }, [view, remaining, paused]);

  function start() {
    playClickSound();
    triggerHaptic("selection");
    setSubject(pickSubject(examType));
    setDraft("");
    setRemaining(duration * 60);
    setPaused(false);
    setChecked(new Set());
    setSaved(false);
    setView("active");
  }

  function finish() {
    playSuccessSound();
    triggerHaptic("success");
    setView("debrief");
  }

  function abandon() {
    playClickSound();
    triggerHaptic("selection");
    setView("setup");
  }

  function toggleCriterion(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        playClickSound();
        triggerHaptic("selection");
      } else {
        next.add(i);
        playSuccessSound();
        triggerHaptic("success");
      }
      return next;
    });
  }

  function save() {
    if (!subject) return;
    store.addExam({
      score: checked.size,
      total: subject.criteria.length,
      date: new Date().toISOString().slice(0, 10),
      type: subject.type,
    });
    playSuccessSound();
    triggerHaptic("success");
    onStoreChange();
    setSaved(true);
  }

  function copyDraft() {
    if (
      !draft.trim() ||
      typeof navigator === "undefined" ||
      !navigator.clipboard
    )
      return;
    navigator.clipboard
      .writeText(
        `${subject ? (subject.titre || subject.t) + "\n\n" : ""}${draft}`,
      )
      .then(() => {
        playSuccessSound();
        triggerHaptic("success");
        setCopiedDraft(true);
        setTimeout(() => setCopiedDraft(false), 1800);
      })
      .catch(() => {});
  }

  const history = store.getExams();
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const totalSec = duration * 60;
  const timePct =
    totalSec > 0 ? Math.round(((totalSec - remaining) * 100) / totalSec) : 0;
  const isUrgent = remaining <= 300;

  return (
    <div className="space-y-5">
      <p className="hint">
        Mets-toi en conditions réelles d&apos;examen : sujet tiré au sort ou
        choisi, chrono, zone de rédaction de brouillon, et auto-évaluation
        guidée avec corrigé d&apos;élite.
      </p>

      {/* 1. Setup Screen */}
      {view === "setup" && (
        <div
          id="examSetup"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Simulateur d&apos;Épreuve d&apos;Examen Cnam PST123</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Préparer mon entraînement d&apos;examen blanc
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Sélectionne ton mode de tirage et la durée pour démarrer le
            simulateur d&apos;examen blanc dans les conditions du titre RNCP 7.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Type d&apos;exercice :
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                <option value="random">
                  Tirage Aléatoire (8 sujets d&apos;annales)
                </option>
                <option value="dubar">
                  Claude Dubar (Double transaction &amp; Formes)
                </option>
                <option value="bourdieu">
                  Pierre Bourdieu (Habitus, Capitaux &amp; Illusio)
                </option>
                <option value="sainsaulieu">
                  Renaud Sainsaulieu (Modèles de pouvoir)
                </option>
                <option value="honneth">
                  Axel Honneth (3 Sphères &amp; Travail invisible)
                </option>
                <option value="deontologie">
                  Déontologie &amp; Posture du Psychologue (Code 2021)
                </option>
                <option value="cas">
                  Étude de situation de travail (Cas clinique)
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Durée de composition :
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                <option value={15}>
                  15 minutes (Brouillon &amp; Plan express)
                </option>
                <option value={45}>45 minutes (Rédaction accélérée)</option>
                <option value={90}>90 minutes (Conditions réelles CNAM)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={start}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Play className="size-3.5 fill-current" />
              <span>Commencer l&apos;épreuve</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Active Exam Screen */}
      {view === "active" && subject && (
        <div
          id="examActive"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Sujet d&apos;Examen en Cours</span>
            </span>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold tabular-nums border ${
                  isUrgent
                    ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 animate-pulse"
                    : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20"
                }`}
              >
                <Clock className="size-3" />
                <span>{fmtTime(remaining)}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  setPaused((p) => !p);
                }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                {paused ? (
                  <Play className="size-3 fill-current" />
                ) : (
                  <Pause className="size-3 fill-current" />
                )}
                <span>{paused ? "Reprendre" : "Pause"}</span>
              </button>
            </div>
          </div>

          {/* Minimal Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                isUrgent ? "bg-rose-500" : "bg-indigo-500"
              }`}
              style={{ width: `${timePct}%` }}
            />
          </div>

          {/* Subject Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0 leading-snug">
            {subject.titre || subject.t}
          </h3>

          {/* Draft Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Zone de composition / Brouillon
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  {wordCount} mots · {draft.length} car.
                </span>

                {draft.trim() && (
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    {copiedDraft ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{copiedDraft ? "Copié !" : "Copier"}</span>
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={9}
              placeholder="Rédigez votre introduction, problématique, structure de plan dialectique et mobilisation des auteurs ici..."
              className="w-full p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-y leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <button
              type="button"
              onClick={abandon}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer active:scale-95"
            >
              <span>Abandonner</span>
            </button>

            <button
              type="button"
              onClick={finish}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="size-3.5" />
              <span>Terminer et auto-évaluer</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Debrief & Self-evaluation Screen */}
      {view === "debrief" && subject && (
        <div
          id="examDebrief"
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xs space-y-4 animate-fadeIn"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-3 text-emerald-600" />
              <span>Épreuve Terminée · Grille d&apos;Auto-évaluation</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Score : {checked.size} / {subject.criteria.length} (
              {Math.round((100 * checked.size) / subject.criteria.length)}%)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
            Prends le temps de relire ta copie. Coche ci-dessous les critères de
            déontologie, de posture et de concepts que tu as réussi à intégrer
            dans tes écrits :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Criteria Checklist */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Critères d&apos;évaluation du jury
              </span>

              <div className="space-y-2">
                {subject.criteria.map((c, i) => {
                  const isChecked = checked.has(i);
                  return (
                    <label
                      key={i}
                      onClick={() => toggleCriterion(i)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                        isChecked
                          ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200"
                          : "bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by label onClick
                        className="mt-0.5 size-3.5 rounded text-indigo-600 border-slate-300 pointer-events-none"
                      />
                      <span className="flex-1">{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Model Solution Accordion */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
                Corrigé d&apos;Excellence Rédigé
              </span>

              <div
                className="max-h-80 overflow-y-auto text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2 prose dark:prose-invert max-w-none pr-1"
                dangerouslySetInnerHTML={{ __html: subject.corrige }}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setView("setup")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <RotateCcw className="size-3" />
              <span>Retour au menu</span>
            </button>

            <button
              type="button"
              disabled={saved}
              onClick={save}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                saved
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
              }`}
            >
              <Check className="size-3.5" />
              <span>
                {saved ? "Essai enregistré ✓" : "Enregistrer mon score"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Past Exams History Card */}
      <div
        id="examHistoryCard"
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <History className="size-3 text-slate-500" />
            <span>Historique de vos examens blancs</span>
          </span>

          {history.length > 0 && (
            <button
              type="button"
              onClick={() => {
                store.clearExams();
                onStoreChange();
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <Trash2 className="size-3" />
              <span>Effacer l&apos;historique</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="p-4 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 italic">
              Aucun essai enregistré pour le moment. Réalisez un premier examen
              blanc pour suivre votre progression.
            </div>
          ) : (
            history.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  {h.date} {h.type ? `· ${h.type}` : ""}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold">
                  {h.score} / {h.total} (
                  {Math.round((100 * h.score) / (h.total || 1))}%)
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
