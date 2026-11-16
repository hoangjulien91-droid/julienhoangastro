"use client";

export function PlanningFootnotes() {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
      <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200">
        Notes de Référence Officielle CNAM Bègles &amp; ENF
      </h3>
      <p>
        · <b>Lieu unique de cours présentiel :</b> Cnam Bègles — 2 rue Marc
        Sangnier, Cité du Numérique, 33130 Bègles (Salle 1 Abbé Grégoire pour
        PST123, Salle 2 Sadi Carnot et Salle 5 Michel Valton pour PST106, Salle 5
        pour PST108 et PST120).
      </p>
      <p>
        · <b>Raccourcis Clavier Pro :</b>{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          1
        </kbd>
        –
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          4
        </kbd>{" "}
        (Vues),{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          T
        </kbd>{" "}
        (Prochaine séance),{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          /
        </kbd>{" "}
        (Recherche),{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          ←
        </kbd>
        /
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          →
        </kbd>{" "}
        (Semaine suivante/précédente),{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
          Échap
        </kbd>{" "}
        (Fermer l&apos;inspecteur).
      </p>
    </div>
  );
}
