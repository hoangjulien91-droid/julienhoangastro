"use client";

import React from "react";
import type { Pst108CaseValls } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface VallsCasCliniquesTabProps {
  etudesDeCas?: Pst108CaseValls[];
  expandedCasId: string | null;
  onToggleExpandedCasId: (id: string | null) => void;
}

export const VallsCasCliniquesTab: React.FC<VallsCasCliniquesTabProps> = ({
  etudesDeCas,
  expandedCasId,
  onToggleExpandedCasId,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
        <span className="font-bold">Scènes d&apos;interlocution de M. Valls :</span>{" "}
        « Au travers de situations concrètes d&apos;échanges verbaux tendus ou
        asymétriques, nous mettons au jour la co-construction de la référence, la
        rupture des scripts et la pluralité des grandeurs en jeu. »
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {etudesDeCas?.map((cas: Pst108CaseValls) => (
          <div
            key={cas.id}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-800/50">
                  {cas.auteurRef}
                </span>
              </div>
              <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                {cas.titre}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {cas.contexte}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Analyse clinique du psychologue :
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {cas.analyseClinique}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="size-3 shrink-0" />
                <span>{cas.notionCle}</span>
              </div>

              {cas.questionsOfficielles && cas.questionsOfficielles.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Questions officielles posées par M. Valls :
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-0.5">
                    {cas.questionsOfficielles.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {cas.transcriptionDialogue && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onToggleExpandedCasId(
                        expandedCasId === cas.id ? null : cas.id,
                      );
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>
                      {expandedCasId === cas.id
                        ? "Masquer le verbatim intégral"
                        : "Lire la transcription intégrale du dialogue"}
                    </span>
                    <ChevronDown
                      className={`size-3 transition-transform ${expandedCasId === cas.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedCasId === cas.id && (
                    <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed border border-slate-800">
                      {cas.transcriptionDialogue}
                    </pre>
                  )}
                </div>
              )}

              {cas.fichierTelechargeable && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                  <a
                    href={cas.fichierTelechargeable}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors"
                  >
                    <FileText className="size-3.5" />
                    <span>Télécharger le support officiel</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
