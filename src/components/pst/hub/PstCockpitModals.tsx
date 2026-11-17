"use client";

import { useState, useEffect, lazy, Suspense } from "react";

const AtelierSlideOver = lazy(() =>
  import("./AtelierSlideOver").then((m) => ({ default: m.AtelierSlideOver })),
);
const DisasterRecoveryModal = lazy(() =>
  import("./DisasterRecoveryModal").then((m) => ({
    default: m.DisasterRecoveryModal,
  })),
);
const ExamSimulatorModal = lazy(() =>
  import("./ExamSimulatorModal").then((m) => ({
    default: m.ExamSimulatorModal,
  })),
);
const PstBriefing30sModal = lazy(() =>
  import("./PstBriefing30sModal").then((m) => ({
    default: m.PstBriefing30sModal,
  })),
);
const PstClinicalProtocolsModal = lazy(() =>
  import("./PstClinicalProtocolsModal").then((m) => ({
    default: m.PstClinicalProtocolsModal,
  })),
);
const PstMemoireStudioModal = lazy(() =>
  import("./PstMemoireStudioModal").then((m) => ({
    default: m.PstMemoireStudioModal,
  })),
);
const PstBibliographyVaultModal = lazy(() =>
  import("./PstBibliographyVaultModal").then((m) => ({
    default: m.PstBibliographyVaultModal,
  })),
);
const PstDeontoAuditModal = lazy(() =>
  import("./PstDeontoAuditModal").then((m) => ({
    default: m.PstDeontoAuditModal,
  })),
);
const PstClinicalCasesModal = lazy(() =>
  import("./PstClinicalCasesModal").then((m) => ({
    default: m.PstClinicalCasesModal,
  })),
);
const PstFieldJournalModal = lazy(() =>
  import("./PstFieldJournalModal").then((m) => ({
    default: m.PstFieldJournalModal,
  })),
);
const PstOralDefenseSimulatorModal = lazy(() =>
  import("./PstOralDefenseSimulatorModal").then((m) => ({
    default: m.PstOralDefenseSimulatorModal,
  })),
);
const PstInterventionCommsModal = lazy(() =>
  import("./PstInterventionCommsModal").then((m) => ({
    default: m.PstInterventionCommsModal,
  })),
);
const PstCommandPalette = lazy(() =>
  import("@/components/pst/shell/PstCommandPalette").then((m) => ({
    default: m.PstCommandPalette,
  })),
);

export function PstCockpitModals() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [disasterRecoveryOpen, setDisasterRecoveryOpen] = useState(false);
  const [examSimulatorOpen, setExamSimulatorOpen] = useState(false);
  const [briefing30sOpen, setBriefing30sOpen] = useState(false);
  const [clinicalProtocolsOpen, setClinicalProtocolsOpen] = useState(false);
  const [memoireStudioOpen, setMemoireStudioOpen] = useState(false);
  const [biblioVaultOpen, setBiblioVaultOpen] = useState(false);
  const [deontoAuditOpen, setDeontoAuditOpen] = useState(false);
  const [clinicalCasesOpen, setClinicalCasesOpen] = useState(false);
  const [fieldJournalOpen, setFieldJournalOpen] = useState(false);
  const [oralDefenseOpen, setOralDefenseOpen] = useState(false);
  const [interventionCommsOpen, setInterventionCommsOpen] = useState(false);

  useEffect(() => {
    const handleOpenPalette = () => setCommandPaletteOpen(true);
    const handleOpenBriefing = () => setBriefing30sOpen(true);
    const handleOpenProtocols = () => setClinicalProtocolsOpen(true);
    const handleOpenMemoire = () => setMemoireStudioOpen(true);
    const handleOpenBiblio = () => setBiblioVaultOpen(true);
    const handleOpenExam = () => setExamSimulatorOpen(true);
    const handleOpenRecovery = () => setDisasterRecoveryOpen(true);
    const handleOpenDeonto = () => setDeontoAuditOpen(true);
    const handleOpenCases = () => setClinicalCasesOpen(true);
    const handleOpenJournal = () => setFieldJournalOpen(true);
    const handleOpenOralDefense = () => setOralDefenseOpen(true);
    const handleOpenInterventionComms = () => setInterventionCommsOpen(true);
    const handleOpenWorkshop = (e: Event) => {
      const custom = e as CustomEvent<{ moduleId?: string }>;
      if (custom.detail?.moduleId) {
        setSelectedWorkshop(custom.detail.moduleId);
      }
    };

    window.addEventListener("pst:open-command-palette", handleOpenPalette);
    window.addEventListener("pst:open-briefing-30s", handleOpenBriefing);
    window.addEventListener("pst:open-clinical-protocols", handleOpenProtocols);
    window.addEventListener("pst:open-memoire-studio", handleOpenMemoire);
    window.addEventListener("pst:open-biblio-vault", handleOpenBiblio);
    window.addEventListener("pst:open-exam-simulator", handleOpenExam);
    window.addEventListener("pst:open-disaster-recovery", handleOpenRecovery);
    window.addEventListener("pst:open-deonto-audit", handleOpenDeonto);
    window.addEventListener("pst:open-clinical-cases", handleOpenCases);
    window.addEventListener("pst:open-field-journal", handleOpenJournal);
    window.addEventListener("pst:open-oral-defense", handleOpenOralDefense);
    window.addEventListener(
      "pst:open-intervention-comms",
      handleOpenInterventionComms,
    );
    window.addEventListener(
      "pst:open-workshop-slideover",
      handleOpenWorkshop,
    );

    const openBtn = document.getElementById("open-command-palette-btn");
    if (openBtn) {
      openBtn.addEventListener("click", handleOpenPalette);
    }

    // Check if redirected from a subpage with ?open=pst:open-...
    const params = new URLSearchParams(window.location.search);
    const openTarget = params.get("open");
    if (openTarget) {
      window.dispatchEvent(new CustomEvent(openTarget));
      window.history.replaceState({}, "", window.location.pathname);
    }

    return () => {
      window.removeEventListener("pst:open-command-palette", handleOpenPalette);
      window.removeEventListener("pst:open-briefing-30s", handleOpenBriefing);
      window.removeEventListener(
        "pst:open-clinical-protocols",
        handleOpenProtocols,
      );
      window.removeEventListener("pst:open-memoire-studio", handleOpenMemoire);
      window.removeEventListener("pst:open-biblio-vault", handleOpenBiblio);
      window.removeEventListener("pst:open-exam-simulator", handleOpenExam);
      window.removeEventListener(
        "pst:open-disaster-recovery",
        handleOpenRecovery,
      );
      window.removeEventListener("pst:open-deonto-audit", handleOpenDeonto);
      window.removeEventListener("pst:open-clinical-cases", handleOpenCases);
      window.removeEventListener("pst:open-field-journal", handleOpenJournal);
      window.removeEventListener(
        "pst:open-oral-defense",
        handleOpenOralDefense,
      );
      window.removeEventListener(
        "pst:open-intervention-comms",
        handleOpenInterventionComms,
      );
      window.removeEventListener(
        "pst:open-workshop-slideover",
        handleOpenWorkshop,
      );
      if (openBtn) {
        openBtn.removeEventListener("click", handleOpenPalette);
      }
    };
  }, []);

  const anyModalOpen =
    Boolean(selectedWorkshop) ||
    commandPaletteOpen ||
    disasterRecoveryOpen ||
    examSimulatorOpen ||
    briefing30sOpen ||
    clinicalProtocolsOpen ||
    memoireStudioOpen ||
    biblioVaultOpen ||
    deontoAuditOpen ||
    clinicalCasesOpen ||
    fieldJournalOpen ||
    oralDefenseOpen ||
    interventionCommsOpen;

  useEffect(() => {
    if (!anyModalOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedWorkshop(null);
        setDisasterRecoveryOpen(false);
        setExamSimulatorOpen(false);
        setBriefing30sOpen(false);
        setClinicalProtocolsOpen(false);
        setMemoireStudioOpen(false);
        setBiblioVaultOpen(false);
        setDeontoAuditOpen(false);
        setClinicalCasesOpen(false);
        setFieldJournalOpen(false);
        setOralDefenseOpen(false);
        setInterventionCommsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  return (
    <Suspense fallback={null}>
      {selectedWorkshop && (
        <AtelierSlideOver
          moduleId={selectedWorkshop}
          isOpen={!!selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
        />
      )}

      {disasterRecoveryOpen && (
        <DisasterRecoveryModal
          isOpen={disasterRecoveryOpen}
          onClose={() => setDisasterRecoveryOpen(false)}
        />
      )}

      {examSimulatorOpen && (
        <ExamSimulatorModal
          isOpen={examSimulatorOpen}
          onClose={() => setExamSimulatorOpen(false)}
        />
      )}

      {briefing30sOpen && (
        <PstBriefing30sModal
          isOpen={briefing30sOpen}
          onClose={() => setBriefing30sOpen(false)}
        />
      )}

      {clinicalProtocolsOpen && (
        <PstClinicalProtocolsModal
          isOpen={clinicalProtocolsOpen}
          onClose={() => setClinicalProtocolsOpen(false)}
        />
      )}

      {memoireStudioOpen && (
        <PstMemoireStudioModal
          isOpen={memoireStudioOpen}
          onClose={() => setMemoireStudioOpen(false)}
        />
      )}

      {biblioVaultOpen && (
        <PstBibliographyVaultModal
          isOpen={biblioVaultOpen}
          onClose={() => setBiblioVaultOpen(false)}
        />
      )}

      {deontoAuditOpen && (
        <PstDeontoAuditModal
          isOpen={deontoAuditOpen}
          onClose={() => setDeontoAuditOpen(false)}
        />
      )}

      {clinicalCasesOpen && (
        <PstClinicalCasesModal
          isOpen={clinicalCasesOpen}
          onClose={() => setClinicalCasesOpen(false)}
        />
      )}

      {fieldJournalOpen && (
        <PstFieldJournalModal
          isOpen={fieldJournalOpen}
          onClose={() => setFieldJournalOpen(false)}
        />
      )}

      {oralDefenseOpen && (
        <PstOralDefenseSimulatorModal
          isOpen={oralDefenseOpen}
          onClose={() => setOralDefenseOpen(false)}
        />
      )}

      {interventionCommsOpen && (
        <PstInterventionCommsModal
          isOpen={interventionCommsOpen}
          onClose={() => setInterventionCommsOpen(false)}
        />
      )}

      {commandPaletteOpen && (
        <PstCommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenWorkshopSlideOver={(id) => setSelectedWorkshop(id)}
        />
      )}
    </Suspense>
  );
}
