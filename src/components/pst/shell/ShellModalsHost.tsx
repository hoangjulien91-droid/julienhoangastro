"use client";

import { lazy, Suspense } from "react";

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
const PstCommandPalette = lazy(() =>
  import("./PstCommandPalette").then((m) => ({ default: m.PstCommandPalette })),
);
const AtelierSlideOver = lazy(() =>
  import("@/components/pst/hub/AtelierSlideOver").then((m) => ({
    default: m.AtelierSlideOver,
  })),
);
const DisasterRecoveryModal = lazy(() =>
  import("@/components/pst/hub/DisasterRecoveryModal").then((m) => ({
    default: m.DisasterRecoveryModal,
  })),
);
const ExamSimulatorModal = lazy(() =>
  import("@/components/pst/hub/ExamSimulatorModal").then((m) => ({
    default: m.ExamSimulatorModal,
  })),
);
const PstClinicalProtocolsModal = lazy(() =>
  import("@/components/pst/hub/PstClinicalProtocolsModal").then((m) => ({
    default: m.PstClinicalProtocolsModal,
  })),
);
const PstMemoireStudioModal = lazy(() =>
  import("@/components/pst/hub/PstMemoireStudioModal").then((m) => ({
    default: m.PstMemoireStudioModal,
  })),
);
const PstBibliographyVaultModal = lazy(() =>
  import("@/components/pst/hub/PstBibliographyVaultModal").then((m) => ({
    default: m.PstBibliographyVaultModal,
  })),
);
const PstDeontoAuditModal = lazy(() =>
  import("@/components/pst/hub/PstDeontoAuditModal").then((m) => ({
    default: m.PstDeontoAuditModal,
  })),
);
const PstClinicalCasesModal = lazy(() =>
  import("@/components/pst/hub/PstClinicalCasesModal").then((m) => ({
    default: m.PstClinicalCasesModal,
  })),
);
const PstFieldJournalModal = lazy(() =>
  import("@/components/pst/hub/PstFieldJournalModal").then((m) => ({
    default: m.PstFieldJournalModal,
  })),
);
const PstOralDefenseSimulatorModal = lazy(() =>
  import("@/components/pst/hub/PstOralDefenseSimulatorModal").then((m) => ({
    default: m.PstOralDefenseSimulatorModal,
  })),
);
const PstInterventionCommsModal = lazy(() =>
  import("@/components/pst/hub/PstInterventionCommsModal").then((m) => ({
    default: m.PstInterventionCommsModal,
  })),
);
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

export interface ShellModalsState {
  matchAuteursOpen: boolean;
  definitionsOpen: boolean;
  fichePocheOpen: boolean;
  speedRunOpen: boolean;
  detectiveOpen: boolean;
  sujetsOpen: boolean;
  roleplayOpen: boolean;
  schemasOpen: boolean;
  blindTestOpen: boolean;
  chronologieOpen: boolean;
  palaisMemoireOpen: boolean;
  briefingOpen: boolean;
  pontsTransversauxOpen: boolean;
  commandPaletteOpen: boolean;
  selectedWorkshop: string | null;
  disasterRecoveryOpen: boolean;
  examSimulatorOpen: boolean;
  clinicalProtocolsOpen: boolean;
  memoireStudioOpen: boolean;
  biblioVaultOpen: boolean;
  deontoAuditOpen: boolean;
  clinicalCasesOpen: boolean;
  fieldJournalOpen: boolean;
  oralDefenseOpen: boolean;
  interventionCommsOpen: boolean;
  pontsS1Open: boolean;
  flashCitationsS1Open: boolean;
  chronoExamenOpen: boolean;
  generateurIntroOpen: boolean;
  dictaphoneOralOpen: boolean;
  correcteurCopieOpen: boolean;
  radarMaitriseOpen: boolean;
  tableauAdOpen: boolean;
}

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
    <Suspense fallback={null}>
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
      {state.selectedWorkshop && (
        <AtelierSlideOver
          moduleId={state.selectedWorkshop}
          isOpen={!!state.selectedWorkshop}
          onClose={() => onSelectWorkshop(null)}
        />
      )}
      {state.disasterRecoveryOpen && (
        <DisasterRecoveryModal
          isOpen={state.disasterRecoveryOpen}
          onClose={() => closeModal("disasterRecoveryOpen")}
        />
      )}
      {state.examSimulatorOpen && (
        <ExamSimulatorModal
          isOpen={state.examSimulatorOpen}
          onClose={() => closeModal("examSimulatorOpen")}
        />
      )}
      {state.clinicalProtocolsOpen && (
        <PstClinicalProtocolsModal
          isOpen={state.clinicalProtocolsOpen}
          onClose={() => closeModal("clinicalProtocolsOpen")}
        />
      )}
      {state.memoireStudioOpen && (
        <PstMemoireStudioModal
          isOpen={state.memoireStudioOpen}
          onClose={() => closeModal("memoireStudioOpen")}
        />
      )}
      {state.biblioVaultOpen && (
        <PstBibliographyVaultModal
          isOpen={state.biblioVaultOpen}
          onClose={() => closeModal("biblioVaultOpen")}
        />
      )}
      {state.deontoAuditOpen && (
        <PstDeontoAuditModal
          isOpen={state.deontoAuditOpen}
          onClose={() => closeModal("deontoAuditOpen")}
        />
      )}
      {state.clinicalCasesOpen && (
        <PstClinicalCasesModal
          isOpen={state.clinicalCasesOpen}
          onClose={() => closeModal("clinicalCasesOpen")}
        />
      )}
      {state.fieldJournalOpen && (
        <PstFieldJournalModal
          isOpen={state.fieldJournalOpen}
          onClose={() => closeModal("fieldJournalOpen")}
        />
      )}
      {state.oralDefenseOpen && (
        <PstOralDefenseSimulatorModal
          isOpen={state.oralDefenseOpen}
          onClose={() => closeModal("oralDefenseOpen")}
        />
      )}
      {state.interventionCommsOpen && (
        <PstInterventionCommsModal
          isOpen={state.interventionCommsOpen}
          onClose={() => closeModal("interventionCommsOpen")}
        />
      )}
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
