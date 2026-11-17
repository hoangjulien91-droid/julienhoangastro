"use client";

import React from "react";

export interface Atelier123BrouillonSectionProps {
  draftDissert: string;
  onUpdateDraftDissert: (val: string) => void;
  dissertWordCount: number;
}

export function Atelier123BrouillonSection({
  draftDissert,
  onUpdateDraftDissert,
  dissertWordCount,
}: Atelier123BrouillonSectionProps) {
  return (
    <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Mon plan dialectique &amp; brouillon libre PST123
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rédigez votre introduction, problématique, plan d&apos;analyse
            et conclusion. Sauvegardé automatiquement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold ${
              dissertWordCount >= 60 ? "text-emerald-600" : "text-slate-500"
            }`}
          >
            {dissertWordCount} mot{dissertWordCount > 1 ? "s" : ""}
          </span>
          {dissertWordCount > 0 && (
            <button
              type="button"
              onClick={() => onUpdateDraftDissert("")}
              className="text-xs text-red-500 hover:underline cursor-pointer"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      <textarea
        value={draftDissert}
        onChange={(e) => onUpdateDraftDissert(e.target.value)}
        rows={14}
        placeholder="Introduction :
- Accroche (tension contemporaine / crise identitaire) :
- Définition des concepts (Dubar, Bourdieu, Sainsaulieu, Honneth) :
- Problématique :
- Annonce du plan :

I. Première partie (Thèse / Diagnostic sociologique) :
- Processus relationnels (actes d'attribution, institutions, violences symboliques) :
- Processus biographiques (récit de soi, continuités/ruptures) :

II. Deuxième partie (Antithèse / Conflits de reconnaissance & dynamiques de pouvoir) :
- Formes identitaires résultantes (blocage, retrait, conversion) :
- Déni d'estime sociale et travail invisible :

III. Troisième partie (Dépassement / Posture et intervention du psychologue) :
- Triangulation du mandat (commande vs demande) :
- Cadre déontologique (consentement, secret, indépendance) :
- Restauration des espaces de délibération collective :

Conclusion :
- Réponse à la problématique :
- Ouverture sur l'éthique de la reconnaissance :"
        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
      />
    </div>
  );
}
