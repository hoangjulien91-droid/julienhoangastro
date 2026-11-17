"use client";

interface Examen108ModelAnswerProps {
  profName: string;
  conceptsCles: string[];
  corrigeExcellence: string;
  piegesAEviter: string[];
}

export function Examen108ModelAnswer({
  profName,
  conceptsCles,
  corrigeExcellence,
  piegesAEviter,
}: Examen108ModelAnswerProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950 border border-indigo-500/30 space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
          Corrigé modèle d&apos;excellence (18+/20) — {profName}
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {conceptsCles.slice(0, 3).join(" · ")}
        </span>
      </div>

      <div
        className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: corrigeExcellence }}
      />

      <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/25 border border-rose-500/20">
        <div className="text-xs font-bold text-rose-800 dark:text-rose-300 mb-1">
          Pièges à éviter absolument :
        </div>
        <ul className="m-0 pl-4 space-y-0.5 text-xs text-rose-900 dark:text-rose-200">
          {piegesAEviter.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
