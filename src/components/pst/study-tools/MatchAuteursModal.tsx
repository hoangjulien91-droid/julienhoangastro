"use client";

import { useState, useEffect } from "react";
import { MATCHS_AUTEURS, type DuelAuteurs } from "@/lib/pst/data/match-auteurs";
import { playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { MatchAuteursHeader } from "./match-auteurs/MatchAuteursHeader";
import { MatchAuteurSideCard } from "./match-auteurs/MatchAuteurSideCard";
import { MatchAuteursSyntheseCard } from "./match-auteurs/MatchAuteursSyntheseCard";

interface MatchAuteursModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function MatchAuteursModal({
  isOpen,
  onClose,
  defaultModule,
}: MatchAuteursModalProps) {
  const [moduleFilter, setModuleFilter] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedDuelId, setSelectedDuelId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [hideSynthese, setHideSynthese] = useState(false);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setModuleFilter(defaultModule);
      const firstInMod = MATCHS_AUTEURS.find((m) =>
        m.modules.includes(defaultModule),
      );
      if (firstInMod) setSelectedDuelId(firstInMod.id);
    }
  }, [defaultModule, isOpen]);

  if (!isOpen) return null;

  const filteredMatches =
    moduleFilter === "all"
      ? MATCHS_AUTEURS
      : MATCHS_AUTEURS.filter((m) => m.modules.includes(moduleFilter));

  const currentMatch: DuelAuteurs =
    filteredMatches.find((m) => m.id === selectedDuelId) ??
    filteredMatches[0] ??
    MATCHS_AUTEURS[0];

  function copySynthese() {
    triggerHaptic("success");
    playSuccessSound();
    const text = `${currentMatch.titre}\n\nSITUATION :\n${currentMatch.situationTravailReel}\n\nAUTEUR A (${currentMatch.auteurA.nom}) :\n${currentMatch.auteurA.diagnosticSituation}\n\nAUTEUR B (${currentMatch.auteurB.nom}) :\n${currentMatch.auteurB.diagnosticSituation}\n\nSYNTHÈSE DIALECTIQUE (18/20) :\n${currentMatch.syntheseDialectiqueExamen}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSelectModule(key: string) {
    setModuleFilter(key);
    const first =
      key === "all"
        ? MATCHS_AUTEURS[0]
        : MATCHS_AUTEURS.find((m) => m.modules.includes(key));
    if (first) setSelectedDuelId(first.id);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3.5 sm:p-7 space-y-4 sm:space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <MatchAuteursHeader
          onClose={onClose}
          moduleFilter={moduleFilter}
          onSelectModule={handleSelectModule}
          filteredMatches={filteredMatches}
          currentMatch={currentMatch}
          onSelectDuel={(id) => setSelectedDuelId(id)}
        />

        {/* CONFRONTATION 2 COLONNES (SPLIT-VIEW iOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MatchAuteurSideCard auteur={currentMatch.auteurA} variant="indigo" />
          <MatchAuteurSideCard auteur={currentMatch.auteurB} variant="amber" />
        </div>

        <MatchAuteursSyntheseCard
          currentMatch={currentMatch}
          hideSynthese={hideSynthese}
          onToggleHideSynthese={() => setHideSynthese((v) => !v)}
          copied={copied}
          onCopySynthese={copySynthese}
        />
      </div>
    </div>
  );
}
