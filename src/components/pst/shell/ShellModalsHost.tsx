"use client";

import { lazy, Suspense } from "react";
import type { ShellModalsState } from "./shellModalsTypes";
import { StudyToolsModalsHost } from "./modals/StudyToolsModalsHost";
import { HubToolsModalsHost } from "./modals/HubToolsModalsHost";
import { SemesterToolsModalsHost } from "./modals/SemesterToolsModalsHost";

export type { ShellModalsState } from "./shellModalsTypes";

const PstCommandPalette = lazy(() =>
  import("./PstCommandPalette").then((m) => ({ default: m.PstCommandPalette })),
);

interface ShellModalsHostProps {
  state: ShellModalsState;
  effectiveModalModule: string;
  fichePocheModule: string;
  onSelectWorkshop: (id: string | null) => void;
  closeModal: (key: keyof ShellModalsState) => void;
}

export function ShellModalsHost({
  state,
  effectiveModalModule,
  fichePocheModule,
  onSelectWorkshop,
  closeModal,
}: ShellModalsHostProps) {
  return (
    <Suspense fallback={null}>
      <StudyToolsModalsHost
        state={state}
        effectiveModalModule={effectiveModalModule}
        fichePocheModule={fichePocheModule}
        closeModal={closeModal}
      />
      <HubToolsModalsHost
        state={state}
        onSelectWorkshop={onSelectWorkshop}
        closeModal={closeModal}
      />
      <SemesterToolsModalsHost
        state={state}
        effectiveModalModule={effectiveModalModule}
        closeModal={closeModal}
      />
      {state.commandPaletteOpen && (
        <PstCommandPalette
          isOpen={state.commandPaletteOpen}
          onClose={() => closeModal("commandPaletteOpen")}
          onOpenWorkshopSlideOver={(id) => onSelectWorkshop(id)}
        />
      )}
    </Suspense>
  );
}
