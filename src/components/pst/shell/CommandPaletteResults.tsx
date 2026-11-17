"use client";

import type { useCommandPaletteSearch } from "./useCommandPaletteSearch";
import { PaletteCourseAndPlanningResults } from "./palette/PaletteCourseAndPlanningResults";
import { PaletteGlossaryAndConceptsResults } from "./palette/PaletteGlossaryAndConceptsResults";
import { PaletteSynthesesAndVisualsResults } from "./palette/PaletteSynthesesAndVisualsResults";

type SearchResults = ReturnType<typeof useCommandPaletteSearch>;

interface CommandPaletteResultsProps {
  results: SearchResults;
  onNavigate: (path: string) => void;
  onPushRoute: (path: string) => void;
  onClose: () => void;
  onOpenWorkshopSlideOver?: (moduleId: string) => void;
}

export function CommandPaletteResults({
  results,
  onNavigate,
  onPushRoute,
  onClose,
  onOpenWorkshopSlideOver,
}: CommandPaletteResultsProps) {
  const {
    matchedSessions,
    matchedErrors,
    matchedResources,
    matchedWorkshops,
    matchedAuthors,
    matchedConcepts,
    matchedGlossary,
    matchedDefinitions,
    matchedEssentiels,
    matchedSchemas,
    matchedDuels,
  } = results;

  return (
    <>
      <PaletteCourseAndPlanningResults
        sessions={matchedSessions}
        errors={matchedErrors}
        resources={matchedResources}
        onNavigate={onNavigate}
      />

      <PaletteGlossaryAndConceptsResults
        workshops={matchedWorkshops}
        authors={matchedAuthors}
        concepts={matchedConcepts}
        glossary={matchedGlossary}
        onNavigate={onNavigate}
        onClose={onClose}
        onOpenWorkshopSlideOver={onOpenWorkshopSlideOver}
      />

      <PaletteSynthesesAndVisualsResults
        definitions={matchedDefinitions}
        essentiels={matchedEssentiels}
        schemas={matchedSchemas}
        duels={matchedDuels}
        onClose={onClose}
        onPushRoute={onPushRoute}
      />
    </>
  );
}
