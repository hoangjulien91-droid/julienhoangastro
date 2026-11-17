"use client";

import { lazy } from "react";
import type { ShellModalsState } from "../shellModalsTypes";

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

interface HubToolsModalsHostProps {
  state: ShellModalsState;
  onSelectWorkshop: (id: string | null) => void;
  closeModal: (key: keyof ShellModalsState) => void;
}

export function HubToolsModalsHost({
  state,
  onSelectWorkshop,
  closeModal,
}: HubToolsModalsHostProps) {
  return (
    <>
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
    </>
  );
}
