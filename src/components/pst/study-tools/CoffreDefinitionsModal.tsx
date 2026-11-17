"use client";

import { useMemo, useState, useEffect } from "react";
import {
  DEFINITIONS_CANONIQUES,
  type DefinitionCanonique,
} from "@/lib/pst/data/definitions-canoniques";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { CoffreDefinitionsHeader } from "./definitions/CoffreDefinitionsHeader";
import { CoffreDefinitionCard } from "./definitions/CoffreDefinitionCard";

interface CoffreDefinitionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function CoffreDefinitionsModal({
  isOpen,
  onClose,
  defaultModule,
}: CoffreDefinitionsModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
    }
  }, [defaultModule, isOpen]);

  const [query, setQuery] = useState("");
  const [revealedSet, setRevealedSet] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: DEFINITIONS_CANONIQUES.length };
    for (const def of DEFINITIONS_CANONIQUES) {
      for (const m of def.modules) {
        map[m] = (map[m] || 0) + 1;
      }
    }
    return map;
  }, []);

  if (!isOpen) return null;

  const filtered = DEFINITIONS_CANONIQUES.filter((d) => {
    if (selectedModule !== "all" && !d.modules.includes(selectedModule)) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      d.terme.toLowerCase().includes(q) ||
      d.auteur.toLowerCase().includes(q) ||
      d.definitionOfficielle.toLowerCase().includes(q) ||
      d.motsClesObligatoires.some((m) => m.toLowerCase().includes(q))
    );
  });

  function toggleReveal(id: string) {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function revealAll() {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet(new Set(filtered.map((d) => d.id)));
  }

  function hideAll() {
    triggerHaptic("selection");
    playClickSound();
    setRevealedSet(new Set());
  }

  function copyDef(d: DefinitionCanonique) {
    triggerHaptic("success");
    playSuccessSound();
    const text = `${d.terme} (${d.auteur})\n\nDÉFINITION OFFICIELLE (CNAM) :\n${d.definitionOfficielle}\n\nMOTS-CLÉS OBLIGATOIRES :\n${d.motsClesObligatoires.join(" · ")}\n\nEXEMPLE :\n${d.exemplePratique}`;
    navigator.clipboard.writeText(text);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <CoffreDefinitionsHeader
          onClose={onClose}
          selectedModule={selectedModule}
          onSelectModule={(key) => setSelectedModule(key)}
          counts={counts}
          onRevealAll={revealAll}
          onHideAll={hideAll}
          query={query}
          onQueryChange={setQuery}
        />

        {/* LISTE DES CARTES DE DÉFINITIONS CANONIQUES */}
        <div className="space-y-4">
          {filtered.map((d) => (
            <CoffreDefinitionCard
              key={d.id}
              definition={d}
              isRevealed={revealedSet.has(d.id)}
              isCopied={copiedId === d.id}
              onToggleReveal={toggleReveal}
              onCopyDef={copyDef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
