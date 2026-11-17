"use client";

import {
  PST108_PROF_EXAMS,
  type AnnalePst108Item,
} from "@/lib/pst/data/pst108-annales";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface Atelier108SubjectDetailProps {
  currentSubject: AnnalePst108Item;
  currentSubjectIdxInFiltered: number;
  filteredSubjectsCount: number;
  currentAnnaleDraft: string;
  onUpdateAnnaleDraft: (id: string, val: string) => void;
  showCorrige: boolean;
  onToggleCorrige: () => void;
  copied: boolean;
  onCopyCorrige: (titre: string, corrigeHtml: string) => void;
}

export function Atelier108SubjectDetail({
  currentSubject,
  currentSubjectIdxInFiltered,
  filteredSubjectsCount,
  currentAnnaleDraft,
  onUpdateAnnaleDraft,
  showCorrige,
  onToggleCorrige,
  copied,
  onCopyCorrige,
}: Atelier108SubjectDetailProps) {
  const annaleWordCount = currentAnnaleDraft.trim()
    ? currentAnnaleDraft.trim().split(/\s+/).length
    : 0;

  return (
    <div className="qbox p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5 animate-fadeIn">
      {/* Header du sujet */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            {currentSubject.session}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Sous-épreuve {PST108_PROF_EXAMS[currentSubject.prof].dureeLabel} ·{" "}
            {PST108_PROF_EXAMS[currentSubject.prof].nom}
          </span>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          PST108 · {PST108_PROF_EXAMS[currentSubject.prof].nom} (Cnam)
        </div>
      </div>

      {/* Titre */}
      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
        {currentSubject.titre}
      </h3>

      {/* Citation ou contexte officiel */}
      {currentSubject.contexteCitation && (
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
          «&nbsp;
          {currentSubject.contexteCitation.replace(/^[«\s]+|[»\s]+$/g, "")}
          &nbsp;»
        </div>
      )}

      {/* Questions d'examen */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Questions d&apos;examen officiel (CNAM) :
        </div>
        <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
          {currentSubject.questions.map((q, qIdx) => (
            <li key={qIdx}>{q}</li>
          ))}
        </ul>
      </div>

      {/* Concepts clés et pièges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40">
          <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">
            💡 Concepts indispensables à mobiliser :
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {currentSubject.conceptsCles.join(" · ")}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
          <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
            ⚠️ Piège majeur à éviter :
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {currentSubject.piegesAEviter[0]}
          </span>
        </div>
      </div>

      {/* Plan conseillé (2 parties, 4 sous-parties) */}
      <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Structure dialectique attendue (I.A, I.B / II.A, II.B)
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
            Plan en 4 sous-parties
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {currentSubject.planConseille.map((p, pIdx) => (
            <div
              key={pIdx}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 space-y-1.5"
            >
              <div className="font-bold text-xs text-amber-900 dark:text-amber-300">
                {p.partie}
              </div>
              <ul className="text-[11px] space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-3.5 leading-relaxed">
                {p.sousParties.map((sp, spIdx) => (
                  <li key={spIdx}>{sp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Espace brouillon interactif du candidat */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>✍️ Mon brouillon / Ma composition pour ce sujet :</span>
          </label>
          <div className="flex items-center gap-3 text-xs">
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
                onClick={() => onUpdateAnnaleDraft(currentSubject.id, "")}
                className="text-xs text-red-500 hover:underline cursor-pointer"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
        <textarea
          value={currentAnnaleDraft}
          onChange={(e) =>
            onUpdateAnnaleDraft(currentSubject.id, e.target.value)
          }
          rows={6}
          placeholder={`Rédigez ici votre réponse ou votre ébauche pour : ${currentSubject.titre}...`}
          className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
        />
      </div>

      {/* Actions Corrigé : Déplier Copie Modèle & Copier */}
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
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
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
                  currentSubject.corrigeExcellence,
                )
              }
              className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{copied ? "✅ Copié !" : "📋 Copier"}</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-500">
          Sujet {currentSubjectIdxInFiltered + 1} sur {filteredSubjectsCount} ·
          Cnam PST108 ({PST108_PROF_EXAMS[currentSubject.prof].nom} · 1h00)
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
            dangerouslySetInnerHTML={{
              __html: currentSubject.corrigeExcellence,
            }}
          />
        </div>
      )}
    </div>
  );
}
