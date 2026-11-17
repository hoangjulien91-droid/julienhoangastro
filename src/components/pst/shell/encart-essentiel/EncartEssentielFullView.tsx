import {
  BookOpen,
  CheckCircle2,
  Users,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";

interface EncartEssentielFullViewProps {
  card: EssentielCoursCard;
}

export function EncartEssentielFullView({
  card,
}: EncartEssentielFullViewProps) {
  return (
    <>
      {/* Thèse / Fil conducteur */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-card/90 border border-amber-500/25 text-xs sm:text-sm text-foreground leading-relaxed flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-2.5 shadow-2xs">
        <span className="self-start px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 sm:mt-0.5">
          Fil directeur
        </span>
        <p className="m-0 font-medium">{card.filConducteur}</p>
      </div>

      {/* Grille 2 colonnes : Ce qu'il faut savoir vs Ce qu'il faut retenir */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
        {/* 1. Ce qu'il faut savoir */}
        <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
          <div className="font-bold uppercase tracking-wider text-[11px] text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-sky-500 shrink-0" />
            <span>1. Ce qu&apos;il faut savoir (Comprendre le cours)</span>
          </div>
          <ul className="space-y-2 text-foreground/90 leading-relaxed pl-0 list-none m-0">
            {card.ceQuIlFautSavoir.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Ce qu'il faut retenir */}
        <div className="p-4 rounded-2xl bg-card/85 border border-amber-500/30 space-y-2.5 shadow-2xs">
          <div className="font-bold uppercase tracking-wider text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
            <span>2. Ce qu&apos;il faut retenir (À placer en copie)</span>
          </div>
          <ul className="space-y-2 text-foreground/90 leading-relaxed pl-0 list-none m-0">
            {card.ceQuIlFautRetenir.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">→</span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grille 2 colonnes : Auteurs clés & Concepts clés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
        {/* 3. Auteurs clés */}
        <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
          <div className="font-bold uppercase tracking-wider text-[11px] text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
            <Users className="size-3.5 text-indigo-500 shrink-0" />
            <span>
              3. Auteurs incontournables ({card.auteursCles.length})
            </span>
          </div>
          <div className="space-y-1.5">
            {card.auteursCles.map((a, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-muted/40 border border-border/40 leading-snug"
              >
                <strong className="text-indigo-800 dark:text-indigo-300 font-semibold">
                  {a.nom}
                </strong>{" "}
                <span className="text-muted-foreground">—</span>{" "}
                <span className="text-foreground/85">{a.apport}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Concepts clés */}
        <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
          <div className="font-bold uppercase tracking-wider text-[11px] text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-emerald-500 shrink-0" />
            <span>
              4. Concepts &amp; Notions clés ({card.conceptsCles.length})
            </span>
          </div>
          <div className="space-y-1.5">
            {card.conceptsCles.map((c, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-muted/40 border border-border/40 leading-snug"
              >
                <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 font-mono text-[10px] font-bold mr-1.5 border border-emerald-500/25">
                  {c.terme}
                </span>
                <span className="text-foreground/85">
                  {c.definitionCourte}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Point de vigilance examen */}
      <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2">
        <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Piège d&apos;examen à éviter : </strong>
          <span>{card.piegeExamen}</span>
        </div>
      </div>
    </>
  );
}
