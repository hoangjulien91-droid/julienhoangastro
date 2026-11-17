"use client";

interface Atelier106BrouillonViewProps {
  draftDissert: string;
  onUpdateDraftDissert: (val: string) => void;
  dissertWordCount: number;
}

export function Atelier106BrouillonView({
  draftDissert,
  onUpdateDraftDissert,
  dissertWordCount,
}: Atelier106BrouillonViewProps) {
  return (
    <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Mon plan dialectique &amp; brouillon libre
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rédigez votre introduction, problématique, plan I / II / III et
            conclusion. Sauvegardé automatiquement.
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
        placeholder={`Introduction :
- Accroche (tension contemporaine / paradoxe) :
- Définition des termes clés & auteurs :
- Problématique :
- Annonce du plan dialectique :

I. Première partie (thèse / le prescrit / la tâche) :
II. Deuxième partie (antithèse / le réel de l'activité / l'obstacle) :
III. Troisième partie (dépassement / pouvoir d'agir / dispute professionnelle & santé) :

Conclusion :
- Réponse à la problématique :
- Ouverture sur l'intervention clinique :`}
        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
      />
    </div>
  );
}
