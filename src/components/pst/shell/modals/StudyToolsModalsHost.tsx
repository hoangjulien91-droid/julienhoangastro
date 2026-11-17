"use client";

import { lazy } from "react";
import type { ShellModalsState } from "../shellModalsTypes";

const MatchAuteursModal = lazy(() =>
  import("@/components/pst/study-tools/MatchAuteursModal").then((m) => ({
    default: m.MatchAuteursModal,
  })),
);
const CoffreDefinitionsModal = lazy(() =>
  import("@/components/pst/study-tools/CoffreDefinitionsModal").then((m) => ({
    default: m.CoffreDefinitionsModal,
  })),
);
const FichePocheModal = lazy(() =>
  import("@/components/pst/study-tools/FichePocheModal").then((m) => ({
    default: m.FichePocheModal,
  })),
);
const SpeedRunChronoModal = lazy(() =>
  import("@/components/pst/study-tools/SpeedRunChronoModal").then((m) => ({
    default: m.SpeedRunChronoModal,
  })),
);
const PiegesDetectiveModal = lazy(() =>
  import("@/components/pst/study-tools/PiegesDetectiveModal").then((m) => ({
    default: m.PiegesDetectiveModal,
  })),
);
const SujetsDissertationModal = lazy(() =>
  import("@/components/pst/study-tools/SujetsDissertationModal").then((m) => ({
    default: m.SujetsDissertationModal,
  })),
);
const SimulateurJeuDeRoleModal = lazy(() =>
  import("@/components/pst/study-tools/SimulateurJeuDeRoleModal").then((m) => ({
    default: m.SimulateurJeuDeRoleModal,
  })),
);
const SchemasMatricesModal = lazy(() =>
  import("@/components/pst/study-tools/SchemasMatricesModal").then((m) => ({
    default: m.SchemasMatricesModal,
  })),
);
const BlindTestAudioModal = lazy(() =>
  import("@/components/pst/study-tools/BlindTestAudioModal").then((m) => ({
    default: m.BlindTestAudioModal,
  })),
);
const ChronologieHistoriqueModal = lazy(() =>
  import("@/components/pst/study-tools/ChronologieHistoriqueModal").then(
    (m) => ({ default: m.ChronologieHistoriqueModal }),
  ),
);
const PalaisMemoireModal = lazy(() =>
  import("@/components/pst/study-tools/PalaisMemoireModal").then((m) => ({
    default: m.PalaisMemoireModal,
  })),
);
const PstBriefing30sModal = lazy(() =>
  import("@/components/pst/hub/PstBriefing30sModal").then((m) => ({
    default: m.PstBriefing30sModal,
  })),
);
const PontsTransversauxModal = lazy(() =>
  import("@/components/pst/study-tools/PontsTransversauxModal").then((m) => ({
    default: m.PontsTransversauxModal,
  })),
);

interface StudyToolsModalsHostProps {
  state: ShellModalsState;
  effectiveModalModule: string;
  fichePocheModule: string;
  closeModal: (key: keyof ShellModalsState) => void;
}

export function StudyToolsModalsHost({
  state,
  effectiveModalModule,
  fichePocheModule,
  closeModal,
}: StudyToolsModalsHostProps) {
  return (
    <>
      {state.matchAuteursOpen && (
        <MatchAuteursModal
          isOpen={state.matchAuteursOpen}
          onClose={() => closeModal("matchAuteursOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.definitionsOpen && (
        <CoffreDefinitionsModal
          isOpen={state.definitionsOpen}
          onClose={() => closeModal("definitionsOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.fichePocheOpen && (
        <FichePocheModal
          isOpen={state.fichePocheOpen}
          onClose={() => closeModal("fichePocheOpen")}
          defaultModule={fichePocheModule}
        />
      )}
      {state.speedRunOpen && (
        <SpeedRunChronoModal
          isOpen={state.speedRunOpen}
          onClose={() => closeModal("speedRunOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.detectiveOpen && (
        <PiegesDetectiveModal
          isOpen={state.detectiveOpen}
          onClose={() => closeModal("detectiveOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.sujetsOpen && (
        <SujetsDissertationModal
          isOpen={state.sujetsOpen}
          onClose={() => closeModal("sujetsOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.roleplayOpen && (
        <SimulateurJeuDeRoleModal
          isOpen={state.roleplayOpen}
          onClose={() => closeModal("roleplayOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.schemasOpen && (
        <SchemasMatricesModal
          isOpen={state.schemasOpen}
          onClose={() => closeModal("schemasOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.blindTestOpen && (
        <BlindTestAudioModal
          isOpen={state.blindTestOpen}
          onClose={() => closeModal("blindTestOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.chronologieOpen && (
        <ChronologieHistoriqueModal
          isOpen={state.chronologieOpen}
          onClose={() => closeModal("chronologieOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.palaisMemoireOpen && (
        <PalaisMemoireModal
          isOpen={state.palaisMemoireOpen}
          onClose={() => closeModal("palaisMemoireOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.briefingOpen && (
        <PstBriefing30sModal
          isOpen={state.briefingOpen}
          onClose={() => closeModal("briefingOpen")}
          defaultModule={effectiveModalModule}
        />
      )}
      {state.pontsTransversauxOpen && (
        <PontsTransversauxModal
          isOpen={state.pontsTransversauxOpen}
          onClose={() => closeModal("pontsTransversauxOpen")}
        />
      )}
    </>
  );
}
