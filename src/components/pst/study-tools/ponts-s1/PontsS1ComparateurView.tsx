import { Sparkles, Copy, Check } from "lucide-react";
import type { ConceptTransversalS1 } from "@/lib/pst/data/ponts-s1";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface PontsS1ComparateurViewProps {
  concepts: ConceptTransversalS1[];
  currentConcept: ConceptTransversalS1;
  onSelectConcept: (id: string) => void;
  copiedFormula: boolean;
  onCopyFormula: (text: string) => void;
}

export function PontsS1ComparateurView({
  concepts,
  currentConcept,
  onSelectConcept,
  copiedFormula,
  onCopyFormula,
}: PontsS1ComparateurViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Horizontal Concept Selector */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {concepts.map((c) => {
          const isSelected = c.id === currentConcept.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                onSelectConcept(c.id);
                playClickSound();
                triggerHaptic();
              }}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/20 dark:shadow-indigo-950/50"
                  : "bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {c.nom}
            </button>
          );
        })}
      </div>

      {/* Question Headline */}
      <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Problématique transversale de dissertation :
          </span>
          <h3 className="text-sm sm:text-base font-bold text-indigo-700 dark:text-indigo-300">
            {currentConcept.questionCentrale}
          </h3>
        </div>

        <button
          onClick={() => onCopyFormula(currentConcept.phraseMagiqueExamen)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-800 dark:text-indigo-200 border border-indigo-500/30 text-xs font-medium shrink-0 transition-colors cursor-pointer"
          title="Copier la phrase magique d'examen"
        >
          {copiedFormula ? (
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span>Copier formule 18/20</span>
        </button>
      </div>

      {/* 3 Columns Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PST106 Column */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/30 dark:to-slate-900/90 p-5 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                PST106 · Clinique Activité
              </span>
              <span className="text-[10px] bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md font-semibold">
                Ergonomie
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Angle d&apos;analyse :
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {currentConcept.pst106.focus}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Auteurs majeurs :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst106.auteursCles.map((a) => (
                  <span
                    key={a}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300/60 dark:border-emerald-700/40"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Concepts clés :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst106.concepts.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-800/40 text-[11px] text-emerald-900 dark:text-emerald-200 italic">
              {currentConcept.pst106.formuleChoc}
            </div>

            <div className="text-[11px] text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-200 block text-[10px] uppercase">
                Dispositif clé :
              </strong>
              {currentConcept.pst106.methode}
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-500/20 text-[11px] text-rose-800 dark:text-rose-300/90 bg-rose-50/80 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-200/80 dark:border-rose-900/30">
            <strong>Piège copie :</strong> {currentConcept.pst106.piegeEviter}
          </div>
        </div>

        {/* PST108 Column */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-50/70 to-white dark:from-amber-950/30 dark:to-slate-900/90 p-5 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                PST108 · Clinique Sociale
              </span>
              <span className="text-[10px] bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md font-semibold">
                Psychosociologie
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Angle d&apos;analyse :
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {currentConcept.pst108.focus}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Auteurs majeurs :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst108.auteursCles.map((a) => (
                  <span
                    key={a}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300/60 dark:border-amber-700/40"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Concepts clés :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst108.concepts.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200 italic">
              {currentConcept.pst108.formuleChoc}
            </div>

            <div className="text-[11px] text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-200 block text-[10px] uppercase">
                Dispositif clé :
              </strong>
              {currentConcept.pst108.methode}
            </div>
          </div>

          <div className="pt-3 border-t border-amber-500/20 text-[11px] text-rose-800 dark:text-rose-300/90 bg-rose-50/80 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-200/80 dark:border-rose-900/30">
            <strong>Piège copie :</strong> {currentConcept.pst108.piegeEviter}
          </div>
        </div>

        {/* PST123 Column */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/30 dark:to-slate-900/90 p-5 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                PST123 · Sociologie &amp; Emploi
              </span>
              <span className="text-[10px] bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-md font-semibold">
                Sociologie
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Angle d&apos;analyse :
              </span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                {currentConcept.pst123.focus}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Auteurs majeurs :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst123.auteursCles.map((a) => (
                  <span
                    key={a}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-700/40"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Concepts clés :
              </span>
              <div className="flex flex-wrap gap-1">
                {currentConcept.pst123.concepts.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-100/60 dark:bg-indigo-950/40 border border-indigo-300/60 dark:border-indigo-800/40 text-[11px] text-indigo-900 dark:text-indigo-200 italic">
              {currentConcept.pst123.formuleChoc}
            </div>

            <div className="text-[11px] text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-200 block text-[10px] uppercase">
                Dispositif clé :
              </strong>
              {currentConcept.pst123.methode}
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-500/20 text-[11px] text-rose-800 dark:text-rose-300/90 bg-rose-50/80 dark:bg-rose-950/20 p-2 rounded-lg border border-rose-200/80 dark:border-rose-900/30">
            <strong>Piège copie :</strong> {currentConcept.pst123.piegeEviter}
          </div>
        </div>
      </div>

      {/* Synthetic Exam paragraph */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/90 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-purple-200/80 dark:border-purple-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span>Phrase magique d&apos;articulation pour la copie d&apos;examen :</span>
        </div>
        <p className="text-xs sm:text-sm text-purple-950 dark:text-purple-100 italic leading-relaxed">
          {currentConcept.phraseMagiqueExamen}
        </p>
      </div>
    </div>
  );
}
