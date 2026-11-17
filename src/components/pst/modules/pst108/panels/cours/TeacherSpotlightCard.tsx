import {
  ExternalLink,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
  FileText,
} from "lucide-react";
import type { ProfConfig } from "./profConfigs";

interface TeacherSpotlightCardProps {
  config: ProfConfig;
  fichesCount: number;
  onLaunchExam?: (prof: "lucy" | "valls" | "marot") => void;
  onGoTab?: (panel: string) => void;
}

export function TeacherSpotlightCard({
  config,
  fichesCount,
  onLaunchExam,
  onGoTab,
}: TeacherSpotlightCardProps) {
  const Icon = config.icon;

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border ${config.colorBorder} ${config.colorBg} backdrop-blur-xl shadow-xs space-y-4`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-border/60">
            <Icon className={`size-5 ${config.colorText}`} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground m-0">
                {config.nom}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-border/60 font-mono font-semibold">
                {config.titreCourt}
              </span>
            </div>
            <p className="text-xs text-muted-foreground m-0">{config.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={config.moodleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 border border-border/80 text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs"
          >
            <span>{config.moodleSection}</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>

          {onLaunchExam && (
            <button
              type="button"
              onClick={() =>
                onLaunchExam(config.key as "lucy" | "valls" | "marot")
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <GraduationCap className="size-3.5" />
              <span>Lancer l&apos;Examen 1h00</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1.5 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
          <span className="size-1.5 rounded-full bg-current" />
          <span>Fil Conducteur &amp; Cadre Théorique :</span>
        </div>
        <p className="text-foreground leading-relaxed m-0 font-medium bg-card/60 p-3 rounded-xl border border-border/40">
          {config.filConducteur}
        </p>
      </div>

      {/* Badges Notions clés */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
          Notions &amp; Dispositifs Cles mobilisés dans les fiches :
        </span>
        <div className="flex flex-wrap gap-1.5">
          {config.notionsCles.map((notion, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-card/80 border border-border/60 text-xs font-medium text-foreground/90 shadow-2xs"
            >
              {notion}
            </span>
          ))}
        </div>
      </div>

      {/* Raccourcis pédagogiques spécifiques */}
      <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2 flex-wrap text-xs">
        <span className="text-muted-foreground font-mono">
          Volume horaire officiel : <b>{config.volumeHoraire}</b>
        </span>

        {config.key === "marot" && onGoTab && (
          <button
            type="button"
            onClick={() => onGoTab("sosie")}
            className="text-rose-700 dark:text-rose-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="size-3" />
            <span>Ouvrir l&apos;Atelier de la Méthode des Sosies →</span>
          </button>
        )}
        {config.key === "valls" && onGoTab && (
          <button
            type="button"
            onClick={() => onGoTab("negociation-iod")}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="size-3" />
            <span>
              Ouvrir le Simulateur de Négociation IOD en Entreprise →
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
