"use client";

import { useMemo, type ReactNode } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap } from "@/lib/pst/types";
import { PLANNING_EVENTS, type PlanningUnitId } from "@/lib/pst/data/planning";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { EncartOutilsExclusifsUe } from "@/components/pst/shell/EncartOutilsExclusifsUe";
import type { UeId } from "@/lib/pst/data/outils-par-ue";
import {
  BackupReminder,
  BackupRestorePanel,
} from "@/components/pst/quiz/BackupRestorePanel";
import { DashboardKpiHero } from "./dashboard/DashboardKpiHero";
import { DashboardProgressAnalytics } from "./dashboard/DashboardProgressAnalytics";
import { DashboardSm2AndToolbox } from "./dashboard/DashboardSm2AndToolbox";

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

  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const nextEvent = useMemo(() => {
    return (
      PLANNING_EVENTS.filter(
        (e) => e.unit === unitId && !e.cancelled && e.date >= todayIso,
      ).sort(
        (a, b) =>
          a.date.localeCompare(b.date) || a.start.localeCompare(b.start),
      )[0] ?? null
    );
  }, [unitId, todayIso]);

  const axisRows = useMemo(() => {
    return cardAxes
      .map((ax) => {
        const ids = cards.filter((c) => c.axis === ax).map((c) => c.id);
        return {
          ax,
          mast: ids.filter((id) => store.getBox(id) >= 4).length,
          tot: ids.length,
        };
      })
      .filter((r) => r.tot > 0);
  }, [cardAxes, cards, store]);

  return (
    <div id="dashHost" className="space-y-4">
      <BackupReminder store={store} />

      {/* KPI Cards, Prochaine étape, Prochaine séance */}
      <DashboardKpiHero
        streak={streak}
        streakHint={streakHint}
        masteredFiches={masteredFiches}
        ficheCount={ficheCount}
        pctFiches={pctFiches}
        masteredCards={masteredCards}
        totalCards={cards.length}
        advice={advice}
        nextEvent={nextEvent}
        todayIso={todayIso}
        onGoTab={onGoTab}
        onTriggerRevision={onTriggerRevision}
      />

      {/* Encart Fiche L'Essentiel du Cours (Synthèse UE & Séances) */}
      {unitEssentielCards.length > 0 && (
        <EncartEssentielCours cards={unitEssentielCards} />
      )}

      {/* Arsenal d'Outils 18/20 Exclusifs de l'UE */}
      <EncartOutilsExclusifsUe unitId={unitId as UeId} compact />

      {/* Progression par axe & Suivi des performances QCM */}
      <DashboardProgressAnalytics
        store={store}
        authors={authors}
        axisRows={axisRows}
        masteredCards={masteredCards}
        totalCards={cards.length}
        onGoTab={onGoTab}
      />

      {/* Répétition espacée SM-2, Boîte à outils, Badges */}
      <DashboardSm2AndToolbox
        isFreshStart={isFreshStart}
        cardsCount={cards.length}
        dueCount={dueCount}
        dueReview={dueReview}
        dueNew={dueNew}
        errorsCount={errorsCount}
        toolboxTitle={toolboxTitle}
        toolboxDesc={toolboxDesc}
        mindmapLabel={mindmapLabel}
        protocoleLabel={protocoleLabel}
        badges={badges}
        onGoTab={onGoTab}
        onTriggerRevision={onTriggerRevision}
      />

      {extraCards}

      <BackupRestorePanel store={store} onUpdate={onStoreChange} />
    </div>
  );
}
