import {
  Zap,
  Check,
  Copy,
  AlertTriangle,
} from "lucide-react";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";

interface EncartEssentielBlitzViewProps {
  card: EssentielCoursCard;
  copiedPunchlineIdx: number | null;
  onCopyPunchline: (text: string, idx: number) => void;
}

export function EncartEssentielBlitzView({
  card,
  copiedPunchlineIdx,
  onCopyPunchline,
}: EncartEssentielBlitzViewProps) {
  return (
    <div className="space-y-3 animate-in fade-in duration-150">
      <div className="p-3 rounded-2xl bg-card/90 border border-rose-500/30 text-xs sm:text-sm text-foreground leading-relaxed flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-2.5 shadow-2xs">
        <span className="self-start px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-800 dark:text-rose-300 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 sm:mt-0.5">
          Thèse Centrale
        </span>
        <p className="m-0 font-semibold">{card.filConducteur}</p>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl bg-card/90 border border-amber-500/35 space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <Zap className="size-3.5 text-amber-500 shrink-0" />
            <span>
              Les 4 Punchlines 20/20 à placer mot pour mot sur la copie (Clic = Copier)
            </span>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {card.ceQuIlFautRetenir.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onCopyPunchline(item, i)}
              className="text-left p-2.5 rounded-xl bg-amber-500/[0.06] hover:bg-amber-500/[0.12] border border-amber-500/25 text-xs text-foreground leading-relaxed flex items-start justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-2">
                <span className="size-4 rounded-full bg-amber-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-medium">{item}</span>
              </div>
              {copiedPunchlineIdx === i ? (
                <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground opacity-60 group-hover:opacity-100 shrink-0 mt-0.5" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bandeau synoptique Auteurs + Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 rounded-2xl bg-card/85 border border-border/60 space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 block">
            Auteurs réflexes à citer :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {card.auteursCles.map((a, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-950 dark:text-indigo-200 border border-indigo-500/25 text-[11px] font-semibold"
                title={a.apport}
              >
                <strong>{a.nom}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-card/85 border border-border/60 space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
            Concepts-clés obligatoires :
          </span>
          <div className="flex flex-wrap gap-1.5">
            {card.conceptsCles.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 border border-emerald-500/25 text-[11px] font-mono font-bold"
                title={c.definitionCourte}
              >
                {c.terme}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/35 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2">
        <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold uppercase text-[10px] tracking-wider block text-rose-700 dark:text-rose-300">
            Sanction immédiate du jury à éviter :
          </strong>
          <span className="font-medium">{card.piegeExamen}</span>
        </div>
      </div>
    </div>
  );
}
