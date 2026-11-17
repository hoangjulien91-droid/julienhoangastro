interface IntroFormStepsProps {
  accroche: string;
  setAccroche: (val: string) => void;
  definitions: string;
  setDefinitions: (val: string) => void;
  paradoxe: string;
  setParadoxe: (val: string) => void;
  problematique: string;
  setProblematique: (val: string) => void;
  annoncePlan: string;
  setAnnoncePlan: (val: string) => void;
}

export function IntroFormSteps({
  accroche,
  setAccroche,
  definitions,
  setDefinitions,
  paradoxe,
  setParadoxe,
  problematique,
  setProblematique,
  annoncePlan,
  setAnnoncePlan,
}: IntroFormStepsProps) {
  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* Step 1 */}
      <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[11px]">
              1
            </span>
            1. Accroche Contextuelle (Mutations du travail)
          </label>
          <span className="text-[10px] text-slate-500">2-3 phrases</span>
        </div>
        <textarea
          value={accroche}
          onChange={(e) => setAccroche(e.target.value)}
          placeholder="Situez le sujet dans l'actualité des organisations du travail..."
          rows={2}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Step 2 */}
      <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[11px]">
              2
            </span>
            2. Définitions Conceptuelles &amp; Auteurs de référence
          </label>
          <span className="text-[10px] text-slate-500">
            Définir les 2 notions clés
          </span>
        </div>
        <textarea
          value={definitions}
          onChange={(e) => setDefinitions(e.target.value)}
          placeholder="Définissez les termes du sujet avec leurs auteurs canoniques..."
          rows={3}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Step 3 */}
      <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            3. La Tension / Le Paradoxe Clinique
          </label>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
            Le nœud du problème
          </span>
        </div>
        <textarea
          value={paradoxe}
          onChange={(e) => setParadoxe(e.target.value)}
          placeholder="Pourquoi y a-t-il tension ou contradiction apparente ?"
          rows={2}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Step 4 */}
      <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-[11px]">
              4
            </span>
            4. La Problématique Centrale
          </label>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
            Une seule phrase interrogative
          </span>
        </div>
        <textarea
          value={problematique}
          onChange={(e) => setProblematique(e.target.value)}
          placeholder="En quoi... ? Dans quelle mesure... ?"
          rows={2}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Step 5 */}
      <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className="h-5 w-5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[11px]">
              5
            </span>
            5. Annonce du Plan Dialectique (I &amp; II)
          </label>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            I. Thèse ➔ II. Dépassement
          </span>
        </div>
        <textarea
          value={annoncePlan}
          onChange={(e) => setAnnoncePlan(e.target.value)}
          placeholder="Nous verrons d'abord que... puis nous démontrerons que..."
          rows={2}
          className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}
