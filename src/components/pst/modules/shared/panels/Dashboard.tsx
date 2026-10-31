"use client";

import type { ReactNode } from "react";
import {
  Compass,
  Zap,
  BarChart2,
  TrendingUp,
  Wrench,
  Award,
  Flame,
  BookOpen,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap } from "@/lib/pst/types";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { ALL_BADGE_DESCS, QUIZ_LABELS } from "@/lib/pst/data/badges";
import {
  BackupReminder,
  BackupRestorePanel,
} from "@/components/pst/quiz/BackupRestorePanel";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface DashboardAdvice {
  title: string;
  text: string;
  btn: string;
  panel: string;
  leitner: boolean;
}

interface DashboardProps {
  store: PstStore;
  cards: { id: string; axis: string }[];
  ficheCount: number;
  authors: AMap;
  cardAxes: string[];
  streakHint: string;
  toolboxTitle: string;
  toolboxDesc: ReactNode;
  mindmapLabel: string;
  protocoleLabel: string;
  advice: DashboardAdvice;
  onStoreChange: () => void;
  onGoTab: (panel: string) => void;
  onTriggerRevision: () => void;
  /** Extra module-specific cards rendered after the standard toolbox card. */
  extraCards?: ReactNode;
}

export function Dashboard({
  store,
  cards,
  ficheCount,
  authors,
  cardAxes,
  streakHint,
  toolboxTitle,
  toolboxDesc,
  mindmapLabel,
  protocoleLabel,
  advice,
  onStoreChange,
  onGoTab,
  onTriggerRevision,
  extraCards,
}: DashboardProps) {
  const badges = store.getBadges();
  const streak = store.getStreak();
  const marks = store.getMarks();
  const masteredFiches = Object.keys(marks).filter(
    (k) => k.startsWith("fiche_mastery_") && marks[k],
  ).length;
  const pctFiches = ficheCount
    ? Math.round((100 * masteredFiches) / ficheCount)
    : 0;
  const masteredCards = cards.filter((c) => store.getBox(c.id) >= 4).length;
  const dueIds = store.getDueCardIds(cards.map((c) => c.id));
  const dueCount = dueIds.length;
  const dueNew = dueIds.filter((id) => marks[id] === undefined).length;
  const dueReview = dueCount - dueNew;
  const isFreshStart = dueNew === cards.length && masteredCards === 0;
  const errorsCount = store.getErrors().length;

  const unitMatch = store.key.match(/^pst(106|108|120|123|124)/);
  const unitId = (
    unitMatch ? `pst${unitMatch[1]}` : "pst106"
  ) as PlanningUnitId;
  const unitEssentielCards = getEssentielByUnit(unitId);

  const axisRows = cardAxes
    .map((ax) => {
      const ids = cards.filter((c) => c.axis === ax).map((c) => c.id);
      return {
        ax,
        mast: ids.filter((id) => store.getBox(id) >= 4).length,
        tot: ids.length,
      };
    })
    .filter((r) => r.tot > 0);

  return (
    <div id="dashHost" className="space-y-4">
      <BackupReminder store={store} />

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Streak */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <Flame className="size-3.5 text-amber-500" />
            <span>Série de révision</span>
          </div>
          <div className="font-mono text-3xl font-black text-foreground">
            {streak}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              jours
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">{streakHint}</p>
        </div>

        {/* Fiches mémorisées */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <BookOpen className="size-3.5 text-emerald-500" />
            <span>Fiches mémorisées</span>
          </div>
          <div className="font-mono text-3xl font-black text-emerald-700 dark:text-emerald-400">
            {masteredFiches}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / {ficheCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            {pctFiches}% du programme maîtrisé
          </p>
        </div>

        {/* Cartes maîtrisées */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <Brain className="size-3.5 text-indigo-500" />
            <span>Cartes maîtrisées</span>
          </div>
          <div className="font-mono text-3xl font-black text-indigo-700 dark:text-indigo-400">
            {masteredCards}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / {cards.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Boîtes 4-5 de la répétition espacée
          </p>
        </div>
      </div>

      {/* Prochaine étape conseillée */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Prochaine étape conseillée</span>
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase hidden sm:inline">
            Guidage personnalisé
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {advice.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {advice.text}
          </p>
        </div>

        <div className="pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab(advice.panel);
              if (advice.leitner) onTriggerRevision();
            }}
          >
            <span>{advice.btn}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Encart Fiche L'Essentiel du Cours (Synthèse UE & Séances) */}
      {unitEssentielCards.length > 0 && (
        <EncartEssentielCours cards={unitEssentielCards} />
      )}

      {/* Progression par axe théorique */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <BarChart2 className="size-3 text-slate-600 dark:text-slate-400" />
            <span>Progression par axe théorique</span>
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {masteredCards}/{cards.length} cartes acquises
          </span>
        </div>

        <h3 className="text-sm font-serif font-bold text-foreground m-0">
          Cartes maîtrisées par perspective
        </h3>

        {axisRows.length === 0 ? (
          <p className="text-xs text-muted-foreground italic m-0">
            Marquez vos premières cartes pour visualiser votre progression par
            axe théorique.
          </p>
        ) : (
          <div className="space-y-2.5 pt-1">
            {axisRows.map((r) => {
              const pct = r.tot ? Math.round((100 * r.mast) / r.tot) : 0;
              return (
                <div key={r.ax} className="flex items-center gap-3 text-xs">
                  <span className="w-36 sm:w-44 font-semibold text-foreground truncate shrink-0">
                    {authors[r.ax]}
                  </span>
                  <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono font-bold text-accent shrink-0">
                    {r.mast}/{r.tot}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Suivi des performances & QCM */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <TrendingUp className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Suivi des performances QCM</span>
          </span>
        </div>

        <h3 className="text-sm font-serif font-bold text-foreground m-0">
          Derniers scores obtenus
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {Object.keys(QUIZ_LABELS).map((m) => {
            const s = store.getScore(m);
            const hist = store.getScoreHistory(m);
            const last = hist[hist.length - 1];
            const prev = hist[hist.length - 2];
            const trend =
              last && prev
                ? last.pct > prev.pct
                  ? " ↗"
                  : last.pct < prev.pct
                    ? " ↘"
                    : " →"
                : "";

            const scoreBadge = !s
              ? "text-muted-foreground"
              : s.pct >= 80
                ? "text-emerald-700 dark:text-emerald-400"
                : s.pct >= 60
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-rose-700 dark:text-rose-400";

            return (
              <div
                key={m}
                className="p-3 rounded-2xl border border-border bg-muted/20 text-center space-y-0.5"
                title={
                  hist.length
                    ? `Dernières tentatives : ${hist
                        .slice(-5)
                        .map((h) => h.pct + "%")
                        .join(" → ")}`
                    : undefined
                }
              >
                <div className={`font-mono text-xl font-black ${scoreBadge}`}>
                  {s ? `${s.pct}%${trend}` : "—"}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground truncate">
                  {QUIZ_LABELS[m]}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(QUIZ_LABELS).every((m) => !store.getScore(m)) && (
          <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
            <span className="text-muted-foreground">
              Aucun score encore enregistré pour ce module.
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-accent hover:underline cursor-pointer"
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onGoTab("qcm");
              }}
            >
              <span>Lancer le premier QCM</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        )}
      </div>

      {/* Révision du jour (SM-2) */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Zap className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Répétition espacée SM-2</span>
          </span>
          {isFreshStart ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-2xs">
              Prêt à démarrer ({cards.length} cartes)
            </span>
          ) : dueCount > 0 ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
              {dueReview > 0
                ? `${dueReview} à revoir${dueNew > 0 ? ` · ${dueNew} nouv.` : ""}`
                : `${dueNew} nouvelles cartes`}
            </span>
          ) : (
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              À jour ✓
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {isFreshStart
              ? "Initialiser votre répétition espacée SM-2"
              : "Session de révision du jour"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {isFreshStart ? (
              <>
                Découvrez les{" "}
                <strong className="text-foreground">
                  {cards.length} notions clés
                </strong>{" "}
                de ce module en rappel actif pour activer votre échéancier
                d&apos;ancrage mémoriel SM-2.
              </>
            ) : dueCount > 0 ? (
              <>
                <strong className="text-foreground">{dueCount} carte(s)</strong>{" "}
                à traiter aujourd&apos;hui selon l&apos;échéancier SM-2.
                {dueNew > 0 && dueReview > 0
                  ? ` Dont ${dueNew} nouvelles notions et ${dueReview} à revoir pour consolider la trace mnésique.`
                  : dueReview > 0
                    ? " Révisez en priorité les notions les plus fragiles pour les ancrer définitivement."
                    : " Toutes nouvelles notions doctrinales, à découvrir à votre rythme."}
              </>
            ) : (
              "Aucune carte en retard aujourd'hui — votre échéancier SM-2 est parfaitement à jour. Session d'entraînement libre recommandée."
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("cartes");
              onTriggerRevision();
            }}
          >
            <span>
              {isFreshStart
                ? `Démarrer les ${cards.length} cartes`
                : dueCount > 0
                  ? `Réviser les ${dueCount} cartes dues`
                  : "Réviser librement"}
            </span>
            <ArrowRight className="size-3.5" />
          </button>

          {errorsCount > 0 && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/30 transition-all active:scale-95 cursor-pointer"
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onGoTab("errors");
              }}
            >
              <span>
                Rattraper {errorsCount} erreur{errorsCount > 1 ? "s" : ""}
              </span>
              <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Boîte à outils / Méthodologie */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Wrench className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Méthodologie &amp; Analyse Clinique</span>
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {toolboxTitle}
          </h3>
          <div className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {toolboxDesc}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("mindmap");
            }}
          >
            <span>{mindmapLabel}</span>
            <ArrowRight className="size-3" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("protocole");
            }}
          >
            <span>{protocoleLabel}</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>

      {extraCards}

      {/* Badges déverrouillés */}
      {badges.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-card shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
              <Award className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Récompenses &amp; Progression Cnam</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
              {badges.length} débloqué(s)
            </span>
          </div>

          <h3 className="text-sm font-serif font-bold text-foreground m-0">
            Vos Badges Déverrouillés
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-2xs"
              >
                <span>🏆</span>
                <span>{ALL_BADGE_DESCS[b] || b}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <BackupRestorePanel store={store} onUpdate={onStoreChange} />
    </div>
  );
}
