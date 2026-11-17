"use client";

import type { PstStore } from "@/lib/pst/store";
import { SosieWidget } from "./SosieWidget";
import { EncartOutilsExclusifsUe } from "@/components/pst/shell/EncartOutilsExclusifsUe";
import { ComparateurTripartite } from "./outils/ComparateurTripartite";
import { GenerateurIntroUniverselle } from "./outils/GenerateurIntroUniverselle";
import { MemoMethodoCard } from "./outils/MemoMethodoCard";
import { RepereAnalyseCard } from "./outils/RepereAnalyseCard";

interface Outils106Props {
  store: PstStore;
  onStoreChange: () => void;
}

export function Outils106({ store, onStoreChange }: Outils106Props) {
  return (
    <div className="space-y-6">
      <EncartOutilsExclusifsUe unitId="pst106" allowUeSwitch />

      <p className="text-xs text-muted-foreground italic leading-relaxed m-0 px-1">
        Une sélection d&apos;outils interactifs d&apos;élite conçue pour
        éliminer les pièges récurrents de l&apos;examen PST106 et structurer vos
        écrits académiques.
      </p>

      {/* 1. Comparateur de Synthèse */}
      <ComparateurTripartite />

      {/* 2. Générateur d'Introduction Universelle */}
      <GenerateurIntroUniverselle />

      {/* 3. Mémo Méthodologique de l'Examen */}
      <MemoMethodoCard />

      {/* 4. Repère Clé d'Analyse Clinique (Arme Ultime) */}
      <RepereAnalyseCard />

      {/* 5. Atelier Instruction au Sosie */}
      <SosieWidget store={store} onStoreChange={onStoreChange} />
    </div>
  );
}
