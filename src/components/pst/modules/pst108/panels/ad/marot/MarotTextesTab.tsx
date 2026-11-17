"use client";

import React from "react";
import type { Pst108Document } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Sparkles,
} from "lucide-react";

interface MarotTextesTabProps {
  documentsClefs: Pst108Document[];
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const MarotTextesTab: React.FC<MarotTextesTabProps> = ({
  documentsClefs,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
            Articles &amp; Textes de Référence de Mme Marot (
            {documentsClefs.length})
          </h4>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Dossier local :{" "}
          <code className="text-indigo-600 font-mono text-[11px]">
            ~/Downloads/
          </code>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {documentsClefs.map((doc: Pst108Document) => {
          const isExpanded = selectedDocId === doc.id;
          return (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border transition-all ${
                isExpanded
                  ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                  : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {doc.type} · {doc.annee}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {doc.auteur}
                    </span>
                    {doc.externalUrl && (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        <ExternalLink className="size-2.5" />
                        <span>Lien Cairn / Persée</span>
                      </a>
                    )}
                  </div>
                  <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                    {doc.titre}
                  </h5>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <FileText className="size-3 shrink-0" />
                    <span>{doc.fichierLocal}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSelectDocId(isExpanded ? null : doc.id);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    {isExpanded ? "Replier" : "Fiche synthèse"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onCopy(
                        `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                        doc.id,
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                  >
                    {copiedKey === doc.id ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                  {doc.externalUrl && (
                    <a
                      href={doc.externalUrl}
                      download
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      <span>Télécharger</span>
                    </a>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                    {doc.resumePedagogique}
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                    <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        Notion Maîtresse 18/20 :
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                        {doc.concept18}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
