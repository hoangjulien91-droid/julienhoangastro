"use client";

import React from "react";
import type { Pst108Document, Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  BookOpen,
  Check,
  Compass,
  Copy,
  ExternalLink,
  FileText,
  Quote,
  Search,
  Sparkles,
} from "lucide-react";

export const LUCY_CATEGORIES = [
  { key: "all", label: "Tous les documents Moodle & Supports (31)" },
  { key: "lucy", label: "Éric Lucy (Clinique & Enquêtes)" },
  { key: "habermas", label: "Jürgen Habermas (Agir communicationnel)" },
  { key: "honneth", label: "Axel Honneth (Reconnaissance & Mépris)" },
  { key: "bourdieu", label: "Pierre Bourdieu (Pouvoir symbolique)" },
  { key: "linguistique", label: "Linguistique & Structuralisme (Sapir, Lévi-Strauss...)" },
  { key: "organisation", label: "Organisations & Travail (France Télécom, Philorama...)" },
];

export interface AdTeacherLucySectionProps {
  teacherData: Pst108TeacherAd;
  selectedCat: string;
  onSelectCat: (cat: string) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  filteredDocs: Pst108Document[];
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export function AdTeacherLucySection({
  teacherData,
  selectedCat,
  onSelectCat,
  searchQuery,
  onSearchQueryChange,
  filteredDocs,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}: AdTeacherLucySectionProps) {
  return (
    <div className="space-y-4">
      {teacherData.slideMasterclass && (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="size-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                  {teacherData.slideMasterclass.titre}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Cadre de référence officiel : {teacherData.slideMasterclass.oeuvreArt} ({teacherData.slideMasterclass.annee})
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
              Programme Examen RNCP 7
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {teacherData.slideMasterclass.axes.map((axe) => (
              <div
                key={axe.num}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                      {axe.num}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                      {axe.titre}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {axe.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                  <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                    Notions maîtresses :
                  </div>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                    {axe.notionsCles.map((nc, idx) => (
                      <li key={idx} className="leading-snug">
                        {nc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {axe.auteurs.map((aut, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {aut}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
              Documents Ressources ({filteredDocs.length})
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              Index local des supports d&apos;enseignement
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            aria-label="Rechercher un auteur ou concept Lucy"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Rechercher un auteur, concept..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {LUCY_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectCat(cat.key);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCat === cat.key
                ? "bg-indigo-600 text-white font-bold shadow-2xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {filteredDocs.map((doc: Pst108Document) => {
          const isExpanded = selectedDocId === doc.id;
          return (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border transition-all ${
                isExpanded
                  ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                  : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
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
                        <span>Lien direct web / vidéo</span>
                      </a>
                    )}
                  </div>
                  <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                    {doc.titre}
                  </h5>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <FileText className="size-3 shrink-0" />
                    <span className="break-all">{doc.fichierLocal}</span>
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
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <Quote className="size-3 text-indigo-500" />
                      <span>Résumé analytique pour le cours &amp; l&apos;examen :</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                      {doc.resumePedagogique}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                    <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        Notion Maîtresse 18/20 pour l&apos;examen RNCP 7 :
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
}
