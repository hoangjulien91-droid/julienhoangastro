"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { FICHES } from "@/lib/pst/data/pst108";
import { Fiches } from "@/components/pst/modules/shared/panels/Fiches";
import { type ProfKey } from "./cours/profConfigs";
import { TeacherSpotlightCard } from "./cours/TeacherSpotlightCard";
import { CoursPst108Header } from "./cours/CoursPst108Header";
import { useCoursPst108Data } from "./cours/useCoursPst108Data";

interface CoursPst108Props {
  store: PstStore;
  onStoreChange: () => void;
  onGoTab?: (panel: string) => void;
  onLaunchExam?: (prof: "lucy" | "valls" | "marot") => void;
}

export function CoursPst108({
  store,
  onStoreChange,
  onGoTab,
  onLaunchExam,
}: CoursPst108Props) {
  const [selectedProf, setSelectedProf] = useState<ProfKey>("marot");

  const {
    fichesByProf,
    filtersForCurrentProf,
    currentFiches,
    currentProfConfig,
    hintText,
  } = useCoursPst108Data(selectedProf);

  return (
    <div className="space-y-6">
      {/* ── BANNIÈRE D'ENTÊTE GÉNÉRALE & SÉLECTEUR PROFESSEURS ─────────────── */}
      <CoursPst108Header
        selectedProf={selectedProf}
        onSelectProf={setSelectedProf}
        fichesByProf={fichesByProf}
        totalFichesCount={FICHES.length}
        onGoTab={onGoTab}
      />

      {/* ── CARTE SPOTLIGHT DE L'ENSEIGNANT SÉLECTIONNÉ ───────────────────── */}
      {currentProfConfig && (
        <TeacherSpotlightCard
          config={currentProfConfig}
          fichesCount={currentFiches.length}
          onLaunchExam={onLaunchExam}
          onGoTab={onGoTab}
        />
      )}

      {/* ── CORPUS DES FICHES DU PROFESSEUR (MOTEUR FICHES RÉUTILISABLE) ─── */}
      <div className="pt-2">
        <Fiches
          key={selectedProf}
          store={store}
          onStoreChange={onStoreChange}
          data={currentFiches}
          filters={filtersForCurrentProf}
          hint={hintText}
        />
      </div>
    </div>
  );
}
