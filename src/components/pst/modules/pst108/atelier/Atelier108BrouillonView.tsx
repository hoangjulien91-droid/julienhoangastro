"use client";

interface Atelier108BrouillonViewProps {
  draftDissert: string;
  onUpdateDraftDissert: (val: string) => void;
}

export function Atelier108BrouillonView({
  draftDissert,
  onUpdateDraftDissert,
}: Atelier108BrouillonViewProps) {
  const wordCount = draftDissert.trim()
    ? draftDissert.trim().split(/\s+/).length
    : 0;

  return (
    <div className="qbox p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Mon plan dialectique &amp; brouillon libre PST108
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rédigez votre introduction, problématique, plan d&apos;analyse et
            conclusion. Sauvegardé automatiquement.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-mono">{wordCount} mots</span>
          {draftDissert.trim() && (
            <button
              type="button"
              onClick={() => onUpdateDraftDissert("")}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      <textarea
        value={draftDissert}
        onChange={(e) => onUpdateDraftDissert(e.target.value)}
        rows={16}
        placeholder={`Structurez ici votre devoir :

1. INTRODUCTION (Accroche sur la communication au travail, définitions des concepts clés, tension dialectique, problématique, annonce du plan en 2 parties).
2. PREMIÈRE PARTIE : I.A (...) et I.B (...)
3. SECONDE PARTIE : II.A (...) et II.B (...)
4. CONCLUSION (Bilan dialectique, ouverture sur la posture déontologique du psychologue du travail et l'intervention réelle sans tri)...`}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
      />
    </div>
  );
}
