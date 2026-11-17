"use client";

import { BookOpen, Copy, Sparkles } from "lucide-react";
import { Link } from "@/components/common/Link";

interface UnitConcept {
  w: string;
  def: string;
}

interface InspectorConceptsBriefingProps {
  unit: string;
  sessionIndex?: number | null;
  totalSessions?: number;
  unitConcepts: UnitConcept[];
  briefingCopied: boolean;
  onCopyBriefing: () => void;
}

export function InspectorConceptsBriefing({
  unit,
  sessionIndex,
  totalSessions,
  unitConcepts,
  briefingCopied,
  onCopyBriefing,
}: InspectorConceptsBriefingProps) {
  if (unitConcepts.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-2.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
          <span>
            Programme de révision{" "}
            {sessionIndex
              ? `(Séance ${sessionIndex}/${totalSessions})`
              : "de l'UE"}{" "}
            : 3 concepts ciblés
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link
            href={`/pst/${unit.replace("pst", "")}/#fiches`}
            className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
          >
            <BookOpen className="size-3" />
            <span>Fiches du cours →</span>
          </Link>
          <button
            type="button"
            onClick={onCopyBriefing}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold flex items-center gap-1.5 hover:bg-amber-500/10 cursor-pointer transition-colors"
            title="Copier la fiche de briefing avec notes et concepts"
          >
            <Copy className="size-3" />
            <span>
              {briefingCopied ? "✓ Fiche copiée !" : "Copier le briefing"}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {unitConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs flex flex-col justify-between gap-1.5 shadow-2xs group hover:border-amber-500/40 transition-all"
          >
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 min-w-0">
              <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">{concept.w}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-3 m-0">
              {concept.def}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
