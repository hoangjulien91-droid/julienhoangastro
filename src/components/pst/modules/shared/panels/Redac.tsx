"use client";

import { useEffect, useState, useMemo, type Dispatch, type SetStateAction } from "react";
import type { RedacItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Volume2,
  Copy,
  Check,
  Search,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface RedacProps {
  data: RedacItem[];
  hint: string;
}

const REDAC_DRAFTS_KEY = "pst_redac_drafts_v1";

export function Redac({ data, hint }: RedacProps) {
  const [openPlan, setOpenPlan] = useState<Set<number>>(new Set());
  const [openCorrige, setOpenCorrige] = useState<Set<number>>(new Set());
  const [doneItems, setDoneItems] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Exam Timer State
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTotal, setTimerTotal] = useState<number>(1800); // default 30 min

  // Filter & Blind Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [blindMode, setBlindMode] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(REDAC_DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setDrafts(parsed);
      }
    } catch {
      // ignore
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Timer Tick Effect
  useEffect(() => {
    if (!timerActive || timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setTimerActive(false);
      playSuccessSound();
      return;
    }
    const id = setInterval(() => {
      setTimerSeconds((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [timerActive, timerSeconds]);

  function startExamTimer(minutes: number) {
    playClickSound();
    const secs = minutes * 60;
    setTimerTotal(secs);
    setTimerSeconds(secs);
    setTimerActive(true);
  }

  function toggleTimerActive() {
    playClickSound();
    setTimerActive((a) => !a);
  }

  function resetTimer() {
    playClickSound();
    setTimerActive(false);
    setTimerSeconds(null);
  }

  function formatTime(s: number) {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
    }
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function updateDraft(subjectKey: string, val: string) {
    setDrafts((prev) => {
      const next = { ...prev, [subjectKey]: val };
      try {
        window.localStorage.setItem(REDAC_DRAFTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function toggleSet(
    setFn: Dispatch<SetStateAction<Set<number>>>,
    idx: number,
  ) {
    playClickSound();
    setFn((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleDone(key: string) {
    playClickSound();
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleSpeakCorrige(subject: string, corrige: string, idx: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = corrige.replace(/<[^>]*>/g, " ");
    const utter = new SpeechSynthesisUtterance(
      `Sujet : ${subject}. Copie modèle : ${cleanText}`,
    );
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utter);
  }

  function copyCorrige(subject: string, corrige: string, idx: number) {
    const cleanText = corrige.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${subject}\n\n${cleanText}`);
      playSuccessSound();
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      // ignore
    }
  }

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data;
    return data.filter(([subj, pts, corr]) => {
      return (
        subj.toLowerCase().includes(q) ||
        corr.toLowerCase().includes(q) ||
        pts.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [data, searchQuery]);

  const totalPoints = data.reduce((acc, [, pts]) => acc + pts.length, 0);
  const doneCount = doneItems.size;
  const pct =
    totalPoints > 0 ? Math.round((doneCount * 100) / totalPoints) : 0;
  const allPlansOpen = filteredData.length > 0 && openPlan.size === filteredData.length;

  return (
    <div className="space-y-4">
      <p className="hint">{hint}</p>

      {/* 1. BARRE DE PILOTAGE ÉPREUVE (Minuteur, Progression & Mode Aveugle) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5 sticky top-14 z-15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
          {/* Progression des Attendus */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                Attendus méthodologiques validés :
              </span>
              <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                {doneCount} / {totalPoints} ({pct}%)
              </span>
            </div>
            <div className="w-48 sm:w-64 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Minuteur d'Examen */}
          <div className="flex items-center gap-2 flex-wrap">
            {timerSeconds === null ? (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Chronomètre :</span>
                <button
                  type="button"
                  onClick={() => startExamTimer(30)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                  title="30 minutes pour problématiser et structurer le plan détaillé"
                >
                  <Timer className="size-3 text-amber-500" />
                  <span>30 min (Plan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => startExamTimer(120)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                  title="2 heures en conditions réelles d'examen Cnam"
                >
                  <Timer className="size-3 text-rose-500" />
                  <span>2h (Épreuve)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold">
                <span className={timerSeconds === 0 ? "text-rose-600 animate-pulse" : "text-amber-700 dark:text-amber-300"}>
                  ⏱ {formatTime(timerSeconds)}
                </span>
                <button
                  type="button"
                  onClick={toggleTimerActive}
                  className="p-1 rounded-lg hover:bg-amber-500/20 text-slate-700 dark:text-slate-200 cursor-pointer"
                  title={timerActive ? "Pause" : "Reprendre"}
                >
                  {timerActive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-1 rounded-lg hover:bg-amber-500/20 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  title="Réinitialiser"
                >
                  <RotateCcw className="size-3" />
                </button>
              </div>
            )}

            {/* Mode Aveugle Toggle */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setBlindMode((b) => !b);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                blindMode
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
              title="Cache les plans et corrigés pour forcer l'effort de mémorisation pur avant comparaison"
            >
              {blindMode ? <EyeOff className="size-3.5 text-amber-400" /> : <Eye className="size-3.5" />}
              <span>{blindMode ? "Mode Examen Actif" : "Mode Consultation"}</span>
            </button>
          </div>
        </div>

        {/* Barre de Recherche de Sujets */}
        <div className="relative">
          <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un sujet officiel, un auteur ou une notion (ex: Wisner, Clot, déontologie)..."
            className="w-full pl-8.5 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. LISTE DES SUJETS DE DISSERTATION */}
      <div id="redacHost" className="space-y-4">
        {filteredData.map(([subject, points, corrige], idx) => {
          const originalIdx = data.findIndex(([s]) => s === subject);
          const activeIdx = originalIdx >= 0 ? originalIdx : idx;
          const planOpen = openPlan.has(activeIdx);
          const corrigeOpen = openCorrige.has(activeIdx);
          const draftKey = subject.slice(0, 48);
          const draftVal = drafts[draftKey] ?? "";
          const wordCount = draftVal.trim()
            ? draftVal.trim().split(/\s+/).length
            : 0;

          return (
            <div
              key={activeIdx}
              className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4"
            >
              {/* En-tête du Sujet */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-2.5">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Sujet d&apos;Examen {activeIdx + 1} / {data.length}
                </span>

                {wordCount > 0 && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                    Brouillon : {wordCount} mots
                  </span>
                )}
              </div>

              {/* Libellé du Sujet d'Examen */}
              <div className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                « {subject} »
              </div>

              {/* Zone de Brouillon & Rédaction Zen */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">
                    Votre brouillon / plan de dissertation (sauvegardé automatiquement) :
                  </span>
                  <span className="text-[10px] opacity-70">
                    Option A : 2h00 sans document
                  </span>
                </div>
                <textarea
                  value={draftVal}
                  onChange={(e) => updateDraft(draftKey, e.target.value)}
                  placeholder="Ébauchez ici votre problématique, vos 2 ou 3 axes dialectiques (Thèse / Antithèse / Synthèse) et vos références d'auteurs avant de révéler le corrigé..."
                  className="w-full min-h-[90px] sm:min-h-[110px] p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-sans"
                />
              </div>

              {/* Bouton d'Action : Révélation et Auto-Évaluation */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleSet(setOpenPlan, activeIdx)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    planOpen
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-xs"
                  }`}
                >
                  <Sparkles className="size-3.5 text-amber-500" />
                  <span>
                    {planOpen
                      ? "Masquer les attendus et le corrigé"
                      : "Comparer avec le plan attendu & la Copie Modèle 18/20"}
                  </span>
                </button>
              </div>

              {/* CONTENU RÉVÉLÉ : GRILLE DIALECTIQUE & COPIE MODÈLE */}
              {planOpen && (
                <div className="space-y-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 animate-in fade-in">
                  {/* Grille des attendus */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Squelette dialectique attendu (cliquez pour auto-évaluer) :</span>
                    </div>

                    <ol className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 list-decimal list-inside">
                      {points.map((point, pi) => {
                        const key = `${activeIdx}-${pi}`;
                        const isDone = doneItems.has(key);
                        return (
                          <li
                            key={pi}
                            onClick={() => toggleDone(key)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-start gap-2 ${
                              isDone
                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 font-semibold"
                                : "bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="shrink-0 mt-0.5">
                              {isDone ? "✓" : "○"}
                            </span>
                            <span className="flex-1 leading-relaxed">{point}</span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* Boutons d'Action Corrigé */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => toggleSet(setOpenCorrige, activeIdx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        corrigeOpen
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {corrigeOpen
                        ? "Masquer la rédaction complète"
                        : "Lire la dissertation modèle complète"}
                    </button>

                    {corrigeOpen && (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleSpeakCorrige(subject, corrige, activeIdx)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Volume2 className="size-3.5 text-amber-500" />
                          <span>
                            {speakingIdx === activeIdx ? "Arrêter la lecture" : "Écouter la copie"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => copyCorrige(subject, corrige, activeIdx)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          {copiedIdx === activeIdx ? (
                            <>
                              <Check className="size-3.5 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">Copié</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5" />
                              <span>Copier</span>
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Copie Rédigée d'Excellence */}
                  {corrigeOpen && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 animate-in fade-in">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 pb-1 border-b border-slate-200/60 dark:border-slate-800">
                        Copie Modèle de Référence (Normes Académiques Cnam)
                      </div>
                      <div
                        className="prose dark:prose-invert max-w-none text-xs sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: corrige }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
