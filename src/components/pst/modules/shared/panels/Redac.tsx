"use client";

import {
  useEffect,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
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
  Award,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Send,
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

  // Atelier Intro & Grille Cnam
  const [openAtelier, setOpenAtelier] = useState<Set<number>>(new Set());
  const [openGrid, setOpenGrid] = useState<Set<number>>(new Set());
  const [gridScores, setGridScores] = useState<
    Record<string, { c1: boolean; c2: boolean; c3: boolean; c4: boolean }>
  >({});
  const [introInputs, setIntroInputs] = useState<
    Record<string, { amorce: string; defs: string; pb: string; plan: string }>
  >({});

  function toggleGridCriterion(
    subjectKey: string,
    crit: "c1" | "c2" | "c3" | "c4",
  ) {
    playClickSound();
    setGridScores((prev) => {
      const current = prev[subjectKey] ?? {
        c1: false,
        c2: false,
        c3: false,
        c4: false,
      };
      return {
        ...prev,
        [subjectKey]: {
          ...current,
          [crit]: !current[crit],
        },
      };
    });
  }

  function getSubjectScore(subjectKey: string): number {
    const s = gridScores[subjectKey];
    if (!s) return 0;
    return (s.c1 ? 5 : 0) + (s.c2 ? 5 : 0) + (s.c3 ? 5 : 0) + (s.c4 ? 5 : 0);
  }

  function insertIntroIntoDraft(subjectKey: string, subjectTitle: string) {
    playSuccessSound();
    const cur = introInputs[subjectKey] ?? {
      amorce:
        "Dans les contextes contemporains de mutation du travail, l'activité est soumise à des impératifs croissants de performance et d'adaptation.",
      defs: `Le sujet (« ${subjectTitle} ») interroge la dialectique entre travail prescrit et travail réel.`,
      pb: `Dès lors, dans quelle mesure ce dilemme interroge-t-il les fondements théoriques et les pratiques d'intervention du psychologue du travail ?`,
      plan: "Dans un premier temps, nous analyserons les impasses cliniques observées sur le terrain ; dans un second temps, nous examinerons la rupture conceptuelle qui permet de refonder le pouvoir d'agir.",
    };

    const compiled = `--- INTRODUCTION TYPE 18/20 ---\n[Accroche] ${cur.amorce.trim()}\n[Définitions] ${cur.defs.trim()}\n[Problématique] ${cur.pb.trim()}\n[Annonce de plan] ${cur.plan.trim()}\n--------------------------------\n\n`;

    setDrafts((prev) => {
      const existing = prev[subjectKey] ?? "";
      const next = compiled + existing;
      try {
        window.localStorage.setItem(
          REDAC_DRAFTS_KEY,
          JSON.stringify({ ...prev, [subjectKey]: next }),
        );
      } catch {
        // ignore
      }
      return { ...prev, [subjectKey]: next };
    });
  }

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
  const pct = totalPoints > 0 ? Math.round((doneCount * 100) / totalPoints) : 0;
  const allPlansOpen =
    filteredData.length > 0 && openPlan.size === filteredData.length;

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
                <span className="text-slate-400 font-medium">
                  Chronomètre :
                </span>
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
                <span
                  className={
                    timerSeconds === 0
                      ? "text-rose-600 animate-pulse"
                      : "text-amber-700 dark:text-amber-300"
                  }
                >
                  ⏱ {formatTime(timerSeconds)}
                </span>
                <button
                  type="button"
                  onClick={toggleTimerActive}
                  className="p-1 rounded-lg hover:bg-amber-500/20 text-slate-700 dark:text-slate-200 cursor-pointer"
                  title={timerActive ? "Pause" : "Reprendre"}
                >
                  {timerActive ? (
                    <Pause className="size-3.5" />
                  ) : (
                    <Play className="size-3.5" />
                  )}
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
              {blindMode ? (
                <EyeOff className="size-3.5 text-amber-400" />
              ) : (
                <Eye className="size-3.5" />
              )}
              <span>
                {blindMode ? "Mode Examen Actif" : "Mode Consultation"}
              </span>
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
                    Votre brouillon / plan de dissertation (sauvegardé
                    automatiquement) :
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
              <div className="pt-1 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleSet(setOpenAtelier, activeIdx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    openAtelier.has(activeIdx)
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-500/20"
                  }`}
                >
                  <Sparkles className="size-3.5" />
                  <span>
                    {openAtelier.has(activeIdx)
                      ? "Masquer l'atelier"
                      : "Atelier Guidé : Composer l'intro 18/20"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSet(setOpenGrid, activeIdx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    openGrid.has(activeIdx)
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border-indigo-500/20"
                  }`}
                >
                  <Award className="size-3.5" />
                  <span>
                    Grille Correcteur Cnam ({getSubjectScore(draftKey)}/20)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSet(setOpenPlan, activeIdx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                    planOpen
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-xs"
                  }`}
                >
                  <Eye className="size-3.5 text-amber-500" />
                  <span>
                    {planOpen ? "Masquer corrigé" : "Plan & Copie Modèle 18/20"}
                  </span>
                </button>
              </div>

              {/* ATELIER GUIDÉ INTRODUCTION 18/20 */}
              {openAtelier.has(activeIdx) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-amber-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 m-0">
                        Atelier Guidé : Les 4 Éléments Clés de
                        l&apos;Introduction Cnam
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300">
                      Standard Académique 18/20
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                        1. Accroche Clinique (Situation réelle de travail) :
                      </label>
                      <input
                        type="text"
                        value={
                          introInputs[draftKey]?.amorce ??
                          "Dans les contextes contemporains de mutation du travail, l'activité est soumise à des impératifs croissants de flexibilité."
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          setIntroInputs((prev) => ({
                            ...prev,
                            [draftKey]: {
                              ...(prev[draftKey] ?? {
                                defs: "",
                                pb: "",
                                plan: "",
                              }),
                              amorce: v,
                            },
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                        2. Définitions Verbatim des Concepts :
                      </label>
                      <input
                        type="text"
                        value={
                          introInputs[draftKey]?.defs ??
                          "Le sujet pose la tension dialectique entre travail prescrit (consignes) et travail réel (activité vécue)."
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          setIntroInputs((prev) => ({
                            ...prev,
                            [draftKey]: {
                              ...(prev[draftKey] ?? {
                                amorce: "",
                                pb: "",
                                plan: "",
                              }),
                              defs: v,
                            },
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                        3. Problématique Dialectique :
                      </label>
                      <input
                        type="text"
                        value={
                          introInputs[draftKey]?.pb ??
                          "Dans quelle mesure ce dilemme interroge-t-il les fondements théoriques et les pratiques d'intervention du psychologue ?"
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          setIntroInputs((prev) => ({
                            ...prev,
                            [draftKey]: {
                              ...(prev[draftKey] ?? {
                                amorce: "",
                                defs: "",
                                plan: "",
                              }),
                              pb: v,
                            },
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                        4. Annonce des 2 ou 3 Axes du Plan :
                      </label>
                      <input
                        type="text"
                        value={
                          introInputs[draftKey]?.plan ??
                          "I. Les impasses cliniques du travail prescrit / II. La refondation du pouvoir d'agir par la controverse délibérative."
                        }
                        onChange={(e) => {
                          const v = e.target.value;
                          setIntroInputs((prev) => ({
                            ...prev,
                            [draftKey]: {
                              ...(prev[draftKey] ?? {
                                amorce: "",
                                defs: "",
                                pb: "",
                              }),
                              plan: v,
                            },
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => insertIntroIntoDraft(draftKey, subject)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Send className="size-3.5" />
                      <span>Insérer ce paragraphe dans mon brouillon</span>
                    </button>
                  </div>
                </div>
              )}

              {/* GRILLE D'ÉVALUATION DU CORRECTEUR CNAM */}
              {openGrid.has(activeIdx) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-200 m-0">
                        Barème Officiel du Correcteur Cnam (Titre RNCP
                        Psychologue du Travail)
                      </h4>
                    </div>
                    <span className="text-sm font-black font-mono text-indigo-700 dark:text-indigo-300">
                      {getSubjectScore(draftKey)} / 20 pts
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {[
                      {
                        key: "c1" as const,
                        title: "1. Problématisation & Cadrage (5 pts)",
                        desc: "Évite la récitation brute, délimite le sujet, formule une tension dialectique nette.",
                      },
                      {
                        key: "c2" as const,
                        title: "2. Concepts & Verbatim (5 pts)",
                        desc: "Auteurs canoniques cités, définitions exactes du référentiel (Leplat, Clot, Dejours, Bourdieu...).",
                      },
                      {
                        key: "c3" as const,
                        title: "3. Structure Dialectique (5 pts)",
                        desc: "Plan équilibré en 2 parties démontrées, transitions argumentées, confrontation théorique.",
                      },
                      {
                        key: "c4" as const,
                        title: "4. Posture Clinique & Déontologie (5 pts)",
                        desc: "Code de déontologie des psychologues, indépendance, refus de l'instrumentalisation.",
                      },
                    ].map((crit) => {
                      const isChecked =
                        gridScores[draftKey]?.[crit.key] ?? false;
                      return (
                        <div
                          key={crit.key}
                          onClick={() =>
                            toggleGridCriterion(draftKey, crit.key)
                          }
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChecked
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                              : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                          }`}
                        >
                          <div
                            className={`size-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked
                                ? "bg-white text-indigo-600 border-white"
                                : "border-slate-400"
                            }`}
                          >
                            {isChecked && (
                              <Check className="size-3 stroke-[3]" />
                            )}
                          </div>
                          <div>
                            <span className="block font-bold text-xs">
                              {crit.title}
                            </span>
                            <span
                              className={`block text-[10.5px] mt-0.5 leading-snug ${isChecked ? "text-indigo-100" : "text-slate-500"}`}
                            >
                              {crit.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONTENU RÉVÉLÉ : GRILLE DIALECTIQUE & COPIE MODÈLE */}
              {planOpen && (
                <div className="space-y-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 animate-in fade-in">
                  {/* Grille des attendus */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-amber-600 dark:text-amber-400" />
                      <span>
                        Squelette dialectique attendu (cliquez pour
                        auto-évaluer) :
                      </span>
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
                            <span className="flex-1 leading-relaxed">
                              {point}
                            </span>
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
                          onClick={() =>
                            toggleSpeakCorrige(subject, corrige, activeIdx)
                          }
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Volume2 className="size-3.5 text-amber-500" />
                          <span>
                            {speakingIdx === activeIdx
                              ? "Arrêter la lecture"
                              : "Écouter la copie"}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            copyCorrige(subject, corrige, activeIdx)
                          }
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          {copiedIdx === activeIdx ? (
                            <>
                              <Check className="size-3.5 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">
                                Copié
                              </span>
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
