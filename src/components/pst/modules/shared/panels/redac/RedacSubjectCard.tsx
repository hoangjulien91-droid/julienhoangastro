"use client";

import {
  Sparkles,
  Award,
  Eye,
  CheckCircle2,
  Check,
  Copy,
} from "lucide-react";
import {
  CNAM_REDAC_CRITERIA,
  type IntroComponents,
} from "@/lib/pst/data/redac-data";
import { RedacIntroAtelier } from "./RedacIntroAtelier";

interface RedacSubjectCardProps {
  subject: string;
  points: string[];
  corrige: string;
  activeIdx: number;
  totalSubjects: number;
  draftVal: string;
  onUpdateDraft: (val: string) => void;
  planOpen: boolean;
  onTogglePlan: () => void;
  corrigeOpen: boolean;
  onToggleCorrige: () => void;
  atelierOpen: boolean;
  onToggleAtelier: () => void;
  gridOpen: boolean;
  onToggleGrid: () => void;
  gridScore: { c1: boolean; c2: boolean; c3: boolean; c4: boolean };
  onToggleCriterion: (crit: "c1" | "c2" | "c3" | "c4") => void;
  doneItems: Set<string>;
  onToggleDone: (key: string) => void;
  introInput: IntroComponents;
  onChangeIntro: (field: keyof IntroComponents, value: string) => void;
  onInsertIntro: () => void;
  onCopyCorrige: () => void;
  isCopied: boolean;
}

export function RedacSubjectCard({
  subject,
  points,
  corrige,
  activeIdx,
  totalSubjects,
  draftVal,
  onUpdateDraft,
  planOpen,
  onTogglePlan,
  corrigeOpen,
  onToggleCorrige,
  atelierOpen,
  onToggleAtelier,
  gridOpen,
  onToggleGrid,
  gridScore,
  onToggleCriterion,
  doneItems,
  onToggleDone,
  introInput,
  onChangeIntro,
  onInsertIntro,
  onCopyCorrige,
  isCopied,
}: RedacSubjectCardProps) {
  const wordCount = draftVal.trim()
    ? draftVal.trim().split(/\s+/).length
    : 0;

  const totalSubjectScore =
    (gridScore.c1 ? 5 : 0) +
    (gridScore.c2 ? 5 : 0) +
    (gridScore.c3 ? 5 : 0) +
    (gridScore.c4 ? 5 : 0);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      {/* En-tête du Sujet */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-2.5">
        <span className="font-mono text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Sujet d&apos;Examen {activeIdx + 1} / {totalSubjects}
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
          onChange={(e) => onUpdateDraft(e.target.value)}
          placeholder="Ébauchez ici votre problématique, vos 2 ou 3 axes dialectiques (Thèse / Antithèse / Synthèse) et vos références d'auteurs avant de révéler le corrigé..."
          className="w-full min-h-[90px] sm:min-h-[110px] p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-sans"
        />
      </div>

      {/* Bouton d'Action : Révélation et Auto-Évaluation */}
      <div className="pt-1 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={onToggleAtelier}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            atelierOpen
              ? "bg-amber-600 text-white border-amber-600 shadow-xs"
              : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-500/20"
          }`}
        >
          <Sparkles className="size-3.5" />
          <span>
            {atelierOpen
              ? "Masquer l'atelier"
              : "Atelier Guidé : Composer l'intro 18/20"}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleGrid}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            gridOpen
              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
              : "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border-indigo-500/20"
          }`}
        >
          <Award className="size-3.5" />
          <span>
            Grille Correcteur Cnam ({totalSubjectScore}/20)
          </span>
        </button>

        <button
          type="button"
          onClick={onTogglePlan}
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
      {atelierOpen && (
        <RedacIntroAtelier
          intro={introInput}
          onChangeIntro={onChangeIntro}
          onInsertIntro={onInsertIntro}
        />
      )}

      {/* GRILLE D'ÉVALUATION DU CORRECTEUR CNAM */}
      {gridOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-200 m-0">
                Barème Officiel du Correcteur Cnam (Titre RNCP Psychologue du Travail)
              </h4>
            </div>
            <span className="text-sm font-black font-mono text-indigo-700 dark:text-indigo-300">
              {totalSubjectScore} / 20 pts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {CNAM_REDAC_CRITERIA.map((crit) => {
              const isChecked = gridScore[crit.key] ?? false;
              return (
                <div
                  key={crit.key}
                  onClick={() => onToggleCriterion(crit.key)}
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
                Squelette dialectique attendu (cliquez pour auto-évaluer) :
              </span>
            </div>

            <ol className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200 list-decimal list-inside">
              {points.map((point, pi) => {
                const key = `${activeIdx}-${pi}`;
                const isDone = doneItems.has(key);
                return (
                  <li
                    key={pi}
                    onClick={() => onToggleDone(key)}
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
              onClick={onToggleCorrige}
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
              <button
                type="button"
                onClick={onCopyCorrige}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                {isCopied ? (
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
}
