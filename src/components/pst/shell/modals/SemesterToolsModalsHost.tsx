"use client";

import { lazy } from "react";
import type { ShellModalsState } from "../shellModalsTypes";

const PontsConceptuelsS1Modal = lazy(() =>
  import("@/components/pst/study-tools/PontsConceptuelsS1Modal").then((m) => ({
    default: m.PontsConceptuelsS1Modal,
  })),
);
const FlashCitationsS1Modal = lazy(() =>
  import("@/components/pst/study-tools/FlashCitationsS1Modal").then((m) => ({
    default: m.FlashCitationsS1Modal,
  })),
);
const ChronoExamenEcritModal = lazy(() =>
  import("@/components/pst/study-tools/ChronoExamenEcritModal").then((m) => ({
    default: m.ChronoExamenEcritModal,
  })),
);
const GenerateurIntro1820Modal = lazy(() =>
  import("@/components/pst/study-tools/GenerateurIntro1820Modal").then((m) => ({
    default: m.GenerateurIntro1820Modal,
  })),
);
const DictaphoneOralModal = lazy(() =>
  import("@/components/pst/study-tools/DictaphoneOralModal").then((m) => ({
    default: m.DictaphoneOralModal,
  })),
);
const CorrecteurCopieCnamModal = lazy(() =>
  import("@/components/pst/study-tools/CorrecteurCopieCnamModal").then((m) => ({
    default: m.CorrecteurCopieCnamModal,
  })),
);
const RadarMaitriseS1Modal = lazy(() =>
  import("@/components/pst/study-tools/RadarMaitriseS1Modal").then((m) => ({
    default: m.RadarMaitriseS1Modal,
  })),
);
const TableauBordAdModal = lazy(() =>
  import("@/components/pst/study-tools/TableauBordAdModal").then((m) => ({
    default: m.TableauBordAdModal,
  })),
);

interface SemesterToolsModalsHostProps {
  state: ShellModalsState;
  effectiveModalModule: string;
  closeModal: (key: keyof ShellModalsState) => void;
}

export function SemesterToolsModalsHost({
  state,
  effectiveModalModule,
  closeModal,
}: SemesterToolsModalsHostProps) {
  const s1ModuleOrAll =
    effectiveModalModule === "pst106" ||
    effectiveModalModule === "pst108" ||
    effectiveModalModule === "pst123"
      ? effectiveModalModule
      : "all";

  const s1ModuleOrTransversal =
    effectiveModalModule === "pst106" ||
    effectiveModalModule === "pst108" ||
    effectiveModalModule === "pst123"
      ? effectiveModalModule
      : "transversal";

  const s1ModuleOr106 =
    effectiveModalModule === "pst106" ||
    effectiveModalModule === "pst108" ||
    effectiveModalModule === "pst123"
      ? effectiveModalModule
      : "pst106";

  return (
    <>
      {state.pontsS1Open && (
        <PontsConceptuelsS1Modal
          isOpen={state.pontsS1Open}
          onClose={() => closeModal("pontsS1Open")}
        />
      )}
      {state.flashCitationsS1Open && (
        <FlashCitationsS1Modal
          isOpen={state.flashCitationsS1Open}
          onClose={() => closeModal("flashCitationsS1Open")}
          defaultModuleKey={s1ModuleOrAll}
        />
      )}
      {state.chronoExamenOpen && (
        <ChronoExamenEcritModal
          isOpen={state.chronoExamenOpen}
          onClose={() => closeModal("chronoExamenOpen")}
          defaultModuleKey={s1ModuleOrTransversal}
        />
      )}
      {state.generateurIntroOpen && (
        <GenerateurIntro1820Modal
          isOpen={state.generateurIntroOpen}
          onClose={() => closeModal("generateurIntroOpen")}
          defaultModuleKey={s1ModuleOr106}
        />
      )}
      {state.dictaphoneOralOpen && (
        <DictaphoneOralModal
          isOpen={state.dictaphoneOralOpen}
          onClose={() => closeModal("dictaphoneOralOpen")}
          defaultModuleKey={s1ModuleOr106}
        />
      )}
      {state.correcteurCopieOpen && (
        <CorrecteurCopieCnamModal
          isOpen={state.correcteurCopieOpen}
          onClose={() => closeModal("correcteurCopieOpen")}
        />
      )}
      {state.radarMaitriseOpen && (
        <RadarMaitriseS1Modal
          isOpen={state.radarMaitriseOpen}
          onClose={() => closeModal("radarMaitriseOpen")}
        />
      )}
      {state.tableauAdOpen && (
        <TableauBordAdModal
          isOpen={state.tableauAdOpen}
          onClose={() => closeModal("tableauAdOpen")}
        />
      )}
    </>
  );
}
