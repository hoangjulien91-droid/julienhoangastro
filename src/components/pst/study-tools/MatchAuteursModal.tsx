"use client";

import { useState, useEffect } from "react";
import { MATCHS_AUTEURS, type DuelAuteurs } from "@/lib/pst/data/match-auteurs";
import {
  X,
  Swords,
  Copy,
  Check,
  Headphones,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface MatchAuteursModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function MatchAuteursModal({
  isOpen,
  onClose,
  defaultModule,
}: MatchAuteursModalProps) {
  const [moduleFilter, setModuleFilter] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedDuelId, setSelectedDuelId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [hideSynthese, setHideSynthese] = useState(false);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setModuleFilter(defaultModule);
      const firstInMod = MATCHS_AUTEURS.find((m) =>
        m.modules.includes(defaultModule),
      );
      if (firstInMod) setSelectedDuelId(firstInMod.id);
    }
  }, [defaultModule, isOpen]);

  if (!isOpen) return null;

  const filteredMatches =
    moduleFilter === "all"
      ? MATCHS_AUTEURS
      : MATCHS_AUTEURS.filter((m) => m.modules.includes(moduleFilter));

  const currentMatch: DuelAuteurs =
    filteredMatches.find((m) => m.id === selectedDuelId) ??
    filteredMatches[0] ??
    MATCHS_AUTEURS[0];

  function copySynthese() {
    triggerHaptic("success");
    playSuccessSound();
    const text = `${currentMatch.titre}\n\nSITUATION :\n${currentMatch.situationTravailReel}\n\nAUTEUR A (${currentMatch.auteurA.nom}) :\n${currentMatch.auteurA.diagnosticSituation}\n\nAUTEUR B (${currentMatch.auteurB.nom}) :\n${currentMatch.auteurB.diagnosticSituation}\n\nSYNTHÈSE DIALECTIQUE (18/20) :\n${currentMatch.syntheseDialectiqueExamen}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function playAudioMatch() {
    triggerHaptic("selection");
    playClickSound();
    const text = `Match des auteurs : ${currentMatch.auteurA.nom} contre ${currentMatch.auteurB.nom}. Situation : ${currentMatch.situationTravailReel}. D'un côté, ${currentMatch.auteurA.nom} analyse : ${currentMatch.auteurA.diagnosticSituation}. De l'autre, ${currentMatch.auteurB.nom} réplique : ${currentMatch.auteurB.diagnosticSituation}. Synthèse dialectique d'examen : ${currentMatch.syntheseDialectiqueExamen}`;
    window.dispatchEvent(
      new CustomEvent("pst:play-audio", {
        detail: {
          title: `Match : ${currentMatch.auteurA.nom} vs ${currentMatch.auteurB.nom}`,
          author: "Dialectique d'Examen Cnam",
          text,
        },
      }),
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER MODAL iOS */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Swords className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Outil Dialectique Cnam
                </span>
                <span className="text-xs text-slate-500">
                  {filteredMatches.length} duel
                  {filteredMatches.length > 1 ? "s" : ""} disponible
                  {filteredMatches.length > 1 ? "s" : ""}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                Le Match des Auteurs (1 vs 1)
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* BARRE DE SÉLECTION DU MODULE PST (RÉVISION MODULE PAR MODULE) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/70 dark:border-slate-800 pb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Module :
          </span>
          {[
            { key: "all", label: "Tous les duels" },
            { key: "pst106", label: "PST106 (Activité)" },
            { key: "pst108", label: "PST108 (Psychologie du langage & clinique du dialogue)" },
            { key: "pst120", label: "PST120 (Psychodynamique)" },
            { key: "pst123", label: "PST123 (Déonto & Identité)" },
            { key: "pst124", label: "PST124 (Digital)" },
          ].map((item) => {
            const isCurrent = moduleFilter === item.key;
            const count =
              item.key === "all"
                ? MATCHS_AUTEURS.length
                : MATCHS_AUTEURS.filter((m) => m.modules.includes(item.key))
                    .length;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setModuleFilter(item.key);
                  const first =
                    item.key === "all"
                      ? MATCHS_AUTEURS[0]
                      : MATCHS_AUTEURS.find((m) =>
                          m.modules.includes(item.key),
                        );
                  if (first) setSelectedDuelId(first.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  isCurrent
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="ml-1 opacity-75 font-mono text-[10px]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* SÉLECTEUR DE DUELS DU MODULE ACTIF */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filteredMatches.map((m) => {
            const isSelected = m.id === currentMatch.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setSelectedDuelId(m.id);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900"
                }`}
              >
                <span>{m.titre.replace(/^Duel \d+ : /, "")}</span>
              </button>
            );
          })}
        </div>

        {/* SITUATION DE TRAVAIL RÉEL SOUMISE AU DUEL */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              🛠️ Situation de Travail Réel soumise à l&apos;analyse
            </span>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
              {currentMatch.modules.map((m) => m.toUpperCase()).join(" · ")}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic font-serif m-0">
            « {currentMatch.situationTravailReel} »
          </p>
        </div>

        {/* CONFRONTATION 2 COLONNES (SPLIT-VIEW iOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CARTE AUTEUR A */}
          <div className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border-2 border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black text-white bg-indigo-600 shadow-xs">
                {currentMatch.auteurA.nom}
              </span>
              <span className="text-[10px] text-slate-500 truncate max-w-[180px]">
                {currentMatch.auteurA.ouvrageConcept}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Diagnostic théorique :
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {currentMatch.auteurA.diagnosticSituation}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-500/20 text-xs italic font-serif text-indigo-900 dark:text-indigo-200">
              {currentMatch.auteurA.citationChoc}
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-400">
              <b>Préconisation :</b> {currentMatch.auteurA.preconisationAction}
            </div>
          </div>

          {/* CARTE AUTEUR B */}
          <div className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border-2 border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black text-white bg-amber-600 shadow-xs">
                {currentMatch.auteurB.nom}
              </span>
              <span className="text-[10px] text-slate-500 truncate max-w-[180px]">
                {currentMatch.auteurB.ouvrageConcept}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Diagnostic théorique :
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {currentMatch.auteurB.diagnosticSituation}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 text-xs italic font-serif text-amber-900 dark:text-amber-200">
              {currentMatch.auteurB.citationChoc}
            </div>

            <div className="text-[11px] text-slate-600 dark:text-slate-400">
              <b>Préconisation :</b> {currentMatch.auteurB.preconisationAction}
            </div>
          </div>
        </div>

        {/* CRITIQUE CROISÉE */}
        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
          <span className="font-bold block mb-1">
            ⚡️ Le point de rupture / Ce qui les sépare :
          </span>
          {currentMatch.critiqueCroisee}
        </div>

        {/* LA SYNTHÈSE DIALECTIQUE D'EXAMEN (18+/20) */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-2 border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-emerald-600" />
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 m-0">
                La Synthèse Dialectique d&apos;Examen (Partie II
                d&apos;excellence)
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setHideSynthese((v) => !v)}
              className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {hideSynthese ? (
                <Eye className="size-3.5" />
              ) : (
                <EyeOff className="size-3.5" />
              )}
              <span>
                {hideSynthese ? "Révéler" : "Masquer pour m'auto-tester"}
              </span>
            </button>
          </div>

          {!hideSynthese ? (
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif m-0">
              {currentMatch.syntheseDialectiqueExamen}
            </p>
          ) : (
            <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-dashed border-emerald-500/40 text-center text-xs text-emerald-700 dark:text-emerald-400">
              Essayez de formuler à voix haute comment concilier ces deux
              auteurs, puis cliquez sur « Révéler ».
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-500/20">
            <div className="text-[11px] text-slate-500">
              Mots-clés valorisés :{" "}
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {currentMatch.motsClesCopies.join(" · ")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={playAudioMatch}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Headphones className="size-3.5 text-indigo-500" />
                <span>Écouter en audio</span>
              </button>

              <button
                type="button"
                onClick={copySynthese}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>{copied ? "Copié !" : "Copier la synthèse"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
