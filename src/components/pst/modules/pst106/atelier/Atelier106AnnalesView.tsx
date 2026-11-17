"use client";

import {
  ANNALES_TEXTES_106,
  type AnnaleTexteItem,
} from "@/lib/pst/data/pst106";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface Atelier106AnnalesViewProps {
  selectedSubjectIdx: number;
  onSelectSubject: (idx: number) => void;
  currentSubject: AnnaleTexteItem;
  annaleDrafts: Record<number, string>;
  onUpdateDraft: (id: number, val: string) => void;
  showCorrige: boolean;
  onToggleCorrige: () => void;
  copied: boolean;
  onCopyCorrige: (titre: string, citation: string, corrigeHtml: string) => void;
}

export function Atelier106AnnalesView({
  selectedSubjectIdx,
  onSelectSubject,
  currentSubject,
  annaleDrafts,
  onUpdateDraft,
  showCorrige,
  onToggleCorrige,
  copied,
  onCopyCorrige,
}: Atelier106AnnalesViewProps) {
  const currentAnnaleDraft = annaleDrafts[currentSubject.id] || "";
  const annaleWordCount = currentAnnaleDraft.trim()
    ? currentAnnaleDraft.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Sélecteur horizontal des 8 sujets */}
      <div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          Sélectionnez un sujet d&apos;annale authentique du Cnam :
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ANNALES_TEXTES_106.map((s, idx) => {
            const isSelected = idx === selectedSubjectIdx;
            const draft = annaleDrafts[s.id] || "";
            const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectSubject(idx);
                }}
                className={`shrink-0 min-w-[200px] max-w-[240px] px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-slate-100 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-amber-700 dark:text-amber-400">
                    Sujet {s.id}
                  </span>
                  {words > 0 && (
                    <span className="text-[10px] text-emerald-600 font-mono">
                      {words} m.
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold truncate mt-0.5">
                  {s.citation.auteur}
                </div>
                <div className="text-[11px] opacity-75 truncate">{s.theme}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fiche détaillée du sujet sélectionné */}
      <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
        {/* Titre & Thème */}
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
            <span>Thème clé</span>
            <span>•</span>
            <span>{currentSubject.theme}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {currentSubject.titre}
          </h3>
        </div>

        {/* Encadré citation support */}
        <div className="p-4 sm:p-5 rounded-2xl border-l-4 border-amber-500 bg-gradient-to-br from-amber-500/10 to-rose-500/5 dark:from-amber-500/15 dark:to-rose-500/10">
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <span>💬 Citation de support à analyser</span>
          </div>
          <blockquote className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-slate-100 leading-snug">
            {currentSubject.citation.texte}
          </blockquote>
          <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span className="text-amber-700 dark:text-amber-400 font-bold">
              — {currentSubject.citation.auteur}
            </span>
            <span>•</span>
            <span>{currentSubject.citation.source}</span>
            {currentSubject.citation.annee && (
              <>
                <span>•</span>
                <span className="font-mono">
                  ({currentSubject.citation.annee})
                </span>
              </>
            )}
          </div>
        </div>

        {/* Concepts clés & Auteurs associés */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Concepts à mobiliser :
          </span>
          {currentSubject.conceptsCles.map((c, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Questions officielles d'examen */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Questions d&apos;examen à traiter :
          </div>
          <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
            {currentSubject.questions.map((q, idx) => (
              <li
                key={idx}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5"
              >
                <span className="shrink-0 w-6 h-6 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                  Q{idx + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critères attendus par le jury Cnam */}
        <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
          <summary className="font-bold text-amber-700 dark:text-amber-400 cursor-pointer select-none">
            🎯 Grille des attendus et critères de correction Cnam (clique pour
            déplier)
          </summary>
          <ul className="mt-3 space-y-1.5 list-disc pl-5 text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentSubject.criteres.map((cr, idx) => (
              <li key={idx}>{cr}</li>
            ))}
          </ul>
        </details>

        {/* Plan conseillé */}
        <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
          <summary className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            🗺️ Démarche &amp; Plan de réponse conseillé (clique pour déplier)
          </summary>
          <div className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentSubject.planConseille.map((step, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                {step}
              </div>
            ))}
          </div>
        </details>

        {/* Zone de brouillon personnel pour ce sujet */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span>Mon entraînement rédigé (sauvegarde automatique)</span>
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`font-semibold ${
                  annaleWordCount >= 60
                    ? "text-emerald-600 font-bold"
                    : "text-slate-500"
                }`}
              >
                {annaleWordCount} mot{annaleWordCount > 1 ? "s" : ""}
              </span>
              {annaleWordCount > 0 && (
                <button
                  type="button"
                  onClick={() => onUpdateDraft(currentSubject.id, "")}
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
          <textarea
            value={currentAnnaleDraft}
            onChange={(e) => onUpdateDraft(currentSubject.id, e.target.value)}
            rows={6}
            placeholder={`Rédigez ici votre analyse de la citation de ${currentSubject.citation.auteur} et vos réponses aux questions Q1 à Q${currentSubject.questions.length}...`}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
          />
        </div>

        {/* Actions Corrigé : Lecture Audio & Déplier Copie Modèle */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onToggleCorrige();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                showCorrige
                  ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
              }`}
            >
              <span>
                {showCorrige
                  ? "Masquer la copie modèle"
                  : "✨ Dévoiler la Copie Modèle d'Excellence"}
              </span>
            </button>

            {showCorrige && (
              <button
                type="button"
                onClick={() =>
                  onCopyCorrige(
                    currentSubject.titre,
                    currentSubject.citation.texte,
                    currentSubject.corrige,
                  )
                }
                className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{copied ? "✅ Copié !" : "📋 Copier"}</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500">
            Sujet {currentSubject.id} sur 8 · Cnam
          </div>
        </div>

        {/* Rendu du corrigé modèle rédigé */}
        {showCorrige && (
          <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Copie modèle rédigée (Standard 18+/20 Cnam)
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                Rédaction intégrale
              </span>
            </div>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentSubject.corrige }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
