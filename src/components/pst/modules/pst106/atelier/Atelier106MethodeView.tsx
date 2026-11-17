"use client";

import {
  ATELIER_SQUELETTE,
  ATELIER_CRITERES,
  METHODE_TEXTE_SUPPORT,
  CRITERES_TEXTE_SUPPORT,
} from "@/lib/pst/data/pst106";

interface Atelier106MethodeViewProps {
  checkedTexte: boolean[];
  onToggleTexteCheck: (i: number) => void;
  pctTexte: number;
  doneTexte: number;
  checkedDissert: boolean[];
  onToggleDissertCheck: (i: number) => void;
  pctDissert: number;
  doneDissert: number;
}

export function Atelier106MethodeView({
  checkedTexte,
  onToggleTexteCheck,
  pctTexte,
  doneTexte,
  checkedDissert,
  onToggleDissertCheck,
  pctDissert,
  doneDissert,
}: Atelier106MethodeViewProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tableau comparatif Option A vs Option B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
            Option A · Dissertation classique
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Sujet théorique ou comparatif (ex: Clot vs Dejours)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <b>Objectif :</b> Construire un plan dialectique en 2 ou 3 parties
            (I. Le prescrit et ses limites / II. L&apos;épreuve du réel / III. Le
            développement du pouvoir d&apos;agir et la dispute professionnelle).
          </p>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
            Idéal si vous aimez déployer une pensée libre et argumentée.
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            Option B · Question avec texte en support
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Citation clé + Série de sous-questions guidées
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <b>Objectif :</b> Déconstruire la citation sans paraphraser, définir
            les concepts implicites, traiter chaque sous-question avec rigueur et
            proposer des perspectives cliniques d&apos;intervention.
          </p>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
            Idéal si vous préférez être guidé par une série de questions
            précises.
          </div>
        </div>
      </div>

      {/* Les 4 étapes de la méthode pour le texte en support */}
      <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>
            📋 Méthode officielle de l&apos;épreuve avec texte en support
          </span>
        </h3>
        <div className="space-y-3">
          {METHODE_TEXTE_SUPPORT.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
            >
              <div className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-1.5">
                {step.etape}
              </div>
              <ul className="space-y-1 list-disc pl-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {step.regles.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Squelette de la dissertation */}
      <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>🏛️ Squelette dialectique universel de dissertation</span>
        </h3>
        <div className="space-y-3">
          {ATELIER_SQUELETTE.map(([title, desc], i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60"
            >
              <div className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-1">
                {i + 1}. {title}
              </div>
              <p
                className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0"
                dangerouslySetInnerHTML={{ __html: desc ?? "" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Les 2 Checklists d'auto-évaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Checklist Texte en support */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Checklist Texte en Support ({doneTexte}/
              {CRITERES_TEXTE_SUPPORT.length})
            </span>
            <span className="font-bold text-xs text-amber-600">
              {pctTexte}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${pctTexte}%` }}
            />
          </div>
          <ul className="space-y-2 pt-1">
            {CRITERES_TEXTE_SUPPORT.map((c, i) => (
              <li key={i}>
                <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedTexte[i]}
                    onChange={() => onToggleTexteCheck(i)}
                    className="mt-0.5 rounded border-slate-300"
                  />
                  <span
                    className={
                      checkedTexte[i] ? "line-through opacity-60" : ""
                    }
                  >
                    {c}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Checklist Dissertation */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
              Checklist Dissertation ({doneDissert}/{ATELIER_CRITERES.length})
            </span>
            <span className="font-bold text-xs text-amber-600">
              {pctDissert}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${pctDissert}%` }}
            />
          </div>
          <ul className="space-y-2 pt-1">
            {ATELIER_CRITERES.map((c, i) => (
              <li key={i}>
                <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedDissert[i]}
                    onChange={() => onToggleDissertCheck(i)}
                    className="mt-0.5 rounded border-slate-300"
                  />
                  <span
                    className={
                      checkedDissert[i] ? "line-through opacity-60" : ""
                    }
                  >
                    {c}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
