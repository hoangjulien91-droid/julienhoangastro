"use client";

import { useEffect, useState } from "react";
import type { ShellModalsState } from "./ShellModalsHost";

export function useShellModals(moduleKey: string) {
  const [matchAuteursOpen, setMatchAuteursOpen] = useState(false);
  const [definitionsOpen, setDefinitionsOpen] = useState(false);
  const [fichePocheOpen, setFichePocheOpen] = useState(false);
  const [fichePocheModule, setFichePocheModule] = useState(
    /^pst(106|108|120|123|124)$/.test(moduleKey) ? moduleKey : "pst108",
  );
  const [speedRunOpen, setSpeedRunOpen] = useState(false);
  const [detectiveOpen, setDetectiveOpen] = useState(false);
  const [sujetsOpen, setSujetsOpen] = useState(false);
  const [roleplayOpen, setRoleplayOpen] = useState(false);
  const [schemasOpen, setSchemasOpen] = useState(false);
  const [blindTestOpen, setBlindTestOpen] = useState(false);
  const [chronologieOpen, setChronologieOpen] = useState(false);
  const [palaisMemoireOpen, setPalaisMemoireOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [pontsTransversauxOpen, setPontsTransversauxOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [disasterRecoveryOpen, setDisasterRecoveryOpen] = useState(false);
  const [examSimulatorOpen, setExamSimulatorOpen] = useState(false);
  const [clinicalProtocolsOpen, setClinicalProtocolsOpen] = useState(false);
  const [memoireStudioOpen, setMemoireStudioOpen] = useState(false);
  const [biblioVaultOpen, setBiblioVaultOpen] = useState(false);
  const [deontoAuditOpen, setDeontoAuditOpen] = useState(false);
  const [clinicalCasesOpen, setClinicalCasesOpen] = useState(false);
  const [fieldJournalOpen, setFieldJournalOpen] = useState(false);
  const [oralDefenseOpen, setOralDefenseOpen] = useState(false);
  const [interventionCommsOpen, setInterventionCommsOpen] = useState(false);
  const [pontsS1Open, setPontsS1Open] = useState(false);
  const [flashCitationsS1Open, setFlashCitationsS1Open] = useState(false);
  const [chronoExamenOpen, setChronoExamenOpen] = useState(false);
  const [generateurIntroOpen, setGenerateurIntroOpen] = useState(false);
  const [dictaphoneOralOpen, setDictaphoneOralOpen] = useState(false);
  const [correcteurCopieOpen, setCorrecteurCopieOpen] = useState(false);
  const [radarMaitriseOpen, setRadarMaitriseOpen] = useState(false);
  const [tableauAdOpen, setTableauAdOpen] = useState(false);
  const [modalModuleOverride, setModalModuleOverride] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
      setFichePocheModule(moduleKey);
    }
  }, [moduleKey]);

  const anyShellModalOpen =
    matchAuteursOpen ||
    definitionsOpen ||
    fichePocheOpen ||
    speedRunOpen ||
    detectiveOpen ||
    sujetsOpen ||
    roleplayOpen ||
    schemasOpen ||
    blindTestOpen ||
    chronologieOpen ||
    palaisMemoireOpen ||
    briefingOpen ||
    pontsTransversauxOpen ||
    commandPaletteOpen ||
    Boolean(selectedWorkshop) ||
    disasterRecoveryOpen ||
    examSimulatorOpen ||
    clinicalProtocolsOpen ||
    memoireStudioOpen ||
    biblioVaultOpen ||
    deontoAuditOpen ||
    clinicalCasesOpen ||
    fieldJournalOpen ||
    oralDefenseOpen ||
    interventionCommsOpen ||
    pontsS1Open ||
    flashCitationsS1Open ||
    chronoExamenOpen ||
    generateurIntroOpen ||
    dictaphoneOralOpen ||
    correcteurCopieOpen ||
    radarMaitriseOpen ||
    tableauAdOpen;

  useEffect(() => {
    if (!anyShellModalOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setMatchAuteursOpen(false);
      setDefinitionsOpen(false);
      setFichePocheOpen(false);
      setSpeedRunOpen(false);
      setDetectiveOpen(false);
      setSujetsOpen(false);
      setRoleplayOpen(false);
      setSchemasOpen(false);
      setBlindTestOpen(false);
      setChronologieOpen(false);
      setPalaisMemoireOpen(false);
      setBriefingOpen(false);
      setPontsTransversauxOpen(false);
      setCommandPaletteOpen(false);
      setSelectedWorkshop(null);
      setDisasterRecoveryOpen(false);
      setExamSimulatorOpen(false);
      setClinicalProtocolsOpen(false);
      setMemoireStudioOpen(false);
      setBiblioVaultOpen(false);
      setDeontoAuditOpen(false);
      setClinicalCasesOpen(false);
      setFieldJournalOpen(false);
      setOralDefenseOpen(false);
      setInterventionCommsOpen(false);
      setPontsS1Open(false);
      setFlashCitationsS1Open(false);
      setChronoExamenOpen(false);
      setGenerateurIntroOpen(false);
      setDictaphoneOralOpen(false);
      setCorrecteurCopieOpen(false);
      setRadarMaitriseOpen(false);
      setTableauAdOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [anyShellModalOpen]);

  useEffect(() => {
    const captureModuleDetail = (e?: Event) => {
      const customMod = (e as CustomEvent)?.detail?.module;
      if (customMod && /^pst(106|108|120|123|124)$/.test(customMod)) {
        setModalModuleOverride(customMod);
        return customMod;
      }
      setModalModuleOverride(null);
      return null;
    };

    const handleOpenMatch = (e?: Event) => {
      captureModuleDetail(e);
      setMatchAuteursOpen(true);
    };
    const handleOpenDefs = (e?: Event) => {
      captureModuleDetail(e);
      setDefinitionsOpen(true);
    };
    const handleOpenPoche = (e?: Event) => {
      const customMod = captureModuleDetail(e);
      if (customMod) {
        setFichePocheModule(customMod);
      } else if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
        setFichePocheModule(moduleKey);
      }
      setFichePocheOpen(true);
    };
    const handleOpenSpeedRun = (e?: Event) => {
      captureModuleDetail(e);
      setSpeedRunOpen(true);
    };
    const handleOpenDetective = (e?: Event) => {
      captureModuleDetail(e);
      setDetectiveOpen(true);
    };
    const handleOpenSujets = (e?: Event) => {
      captureModuleDetail(e);
      setSujetsOpen(true);
    };
    const handleOpenRoleplay = (e?: Event) => {
      captureModuleDetail(e);
      setRoleplayOpen(true);
    };
    const handleOpenSchemas = (e?: Event) => {
      captureModuleDetail(e);
      setSchemasOpen(true);
    };
    const handleOpenBlindTest = (e?: Event) => {
      captureModuleDetail(e);
      setBlindTestOpen(true);
    };
    const handleOpenChronologie = (e?: Event) => {
      captureModuleDetail(e);
      setChronologieOpen(true);
    };
    const handleOpenPalaisMemoire = (e?: Event) => {
      captureModuleDetail(e);
      setPalaisMemoireOpen(true);
    };
    const handleOpenBriefing = (e?: Event) => {
      captureModuleDetail(e);
      setBriefingOpen(true);
    };
    const handleOpenPonts = () => setPontsTransversauxOpen(true);
    const handleOpenCommandPalette = () => setCommandPaletteOpen(true);
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
    const handleOpenPontsS1 = () => setPontsS1Open(true);
    const handleOpenFlashCitationsS1 = (e?: Event) => {
      captureModuleDetail(e);
      setFlashCitationsS1Open(true);
    };
    const handleOpenChronoExamen = (e?: Event) => {
      captureModuleDetail(e);
      setChronoExamenOpen(true);
    };
    const handleOpenGenerateurIntro = (e?: Event) => {
      captureModuleDetail(e);
      setGenerateurIntroOpen(true);
    };
    const handleOpenDictaphoneOral = (e?: Event) => {
      captureModuleDetail(e);
      setDictaphoneOralOpen(true);
    };
    const handleOpenCorrecteurCopie = (e?: Event) => {
      captureModuleDetail(e);
      setCorrecteurCopieOpen(true);
    };
    const handleOpenRadarS1 = () => setRadarMaitriseOpen(true);
    const handleOpenTableauAd = () => setTableauAdOpen(true);
    const handleOpenSlideOver = (e?: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.moduleId;
      if (targetMod) {
        setSelectedWorkshop(targetMod);
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA" ||
        (activeEl as HTMLElement)?.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("pst:open-match-auteurs", handleOpenMatch);
    window.addEventListener("pst:open-definitions", handleOpenDefs);
    window.addEventListener("pst:open-fiche-poche", handleOpenPoche);
    window.addEventListener("pst:open-speed-run", handleOpenSpeedRun);
    window.addEventListener("pst:open-pieges-detective", handleOpenDetective);
    window.addEventListener("pst:open-sujets-dissertation", handleOpenSujets);
    window.addEventListener("pst:open-simulateur-roleplay", handleOpenRoleplay);
    window.addEventListener("pst:open-schemas", handleOpenSchemas);
    window.addEventListener("pst:open-blind-test", handleOpenBlindTest);
    window.addEventListener("pst:open-chronologie", handleOpenChronologie);
    window.addEventListener("pst:open-palais-memoire", handleOpenPalaisMemoire);
    window.addEventListener("pst:open-briefing-30s", handleOpenBriefing);
    window.addEventListener(
      "pst:open-ponts-transversaux",
      handleOpenPonts,
    );
    window.addEventListener(
      "pst:open-command-palette",
      handleOpenCommandPalette,
    );
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
    window.addEventListener("pst:open-ponts-s1", handleOpenPontsS1);
    window.addEventListener("pst:open-flash-citations-s1", handleOpenFlashCitationsS1);
    window.addEventListener("pst:open-chrono-examen", handleOpenChronoExamen);
    window.addEventListener("pst:open-generateur-intro", handleOpenGenerateurIntro);
    window.addEventListener("pst:open-dictaphone-oral", handleOpenDictaphoneOral);
    window.addEventListener("pst:open-correcteur-copie", handleOpenCorrecteurCopie);
    window.addEventListener("pst:open-radar-s1", handleOpenRadarS1);
    window.addEventListener("pst:open-tableau-ad", handleOpenTableauAd);
    window.addEventListener(
      "pst:open-atelier-slideover",
      handleOpenSlideOver,
    );
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("pst:open-match-auteurs", handleOpenMatch);
      window.removeEventListener("pst:open-definitions", handleOpenDefs);
      window.removeEventListener("pst:open-fiche-poche", handleOpenPoche);
      window.removeEventListener("pst:open-speed-run", handleOpenSpeedRun);
      window.removeEventListener(
        "pst:open-pieges-detective",
        handleOpenDetective,
      );
      window.removeEventListener(
        "pst:open-sujets-dissertation",
        handleOpenSujets,
      );
      window.removeEventListener(
        "pst:open-simulateur-roleplay",
        handleOpenRoleplay,
      );
      window.removeEventListener("pst:open-schemas", handleOpenSchemas);
      window.removeEventListener("pst:open-blind-test", handleOpenBlindTest);
      window.removeEventListener("pst:open-chronologie", handleOpenChronologie);
      window.removeEventListener(
        "pst:open-palais-memoire",
        handleOpenPalaisMemoire,
      );
      window.removeEventListener("pst:open-briefing-30s", handleOpenBriefing);
      window.removeEventListener(
        "pst:open-ponts-transversaux",
        handleOpenPonts,
      );
      window.removeEventListener(
        "pst:open-command-palette",
        handleOpenCommandPalette,
      );
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
      window.removeEventListener("pst:open-ponts-s1", handleOpenPontsS1);
      window.removeEventListener("pst:open-flash-citations-s1", handleOpenFlashCitationsS1);
      window.removeEventListener("pst:open-chrono-examen", handleOpenChronoExamen);
      window.removeEventListener("pst:open-generateur-intro", handleOpenGenerateurIntro);
      window.removeEventListener("pst:open-dictaphone-oral", handleOpenDictaphoneOral);
      window.removeEventListener("pst:open-correcteur-copie", handleOpenCorrecteurCopie);
      window.removeEventListener("pst:open-radar-s1", handleOpenRadarS1);
      window.removeEventListener("pst:open-tableau-ad", handleOpenTableauAd);
      window.removeEventListener(
        "pst:open-atelier-slideover",
        handleOpenSlideOver,
      );
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [moduleKey]);

  const state: ShellModalsState = {
    matchAuteursOpen,
    definitionsOpen,
    fichePocheOpen,
    speedRunOpen,
    detectiveOpen,
    sujetsOpen,
    roleplayOpen,
    schemasOpen,
    blindTestOpen,
    chronologieOpen,
    palaisMemoireOpen,
    briefingOpen,
    pontsTransversauxOpen,
    commandPaletteOpen,
    selectedWorkshop,
    disasterRecoveryOpen,
    examSimulatorOpen,
    clinicalProtocolsOpen,
    memoireStudioOpen,
    biblioVaultOpen,
    deontoAuditOpen,
    clinicalCasesOpen,
    fieldJournalOpen,
    oralDefenseOpen,
    interventionCommsOpen,
    pontsS1Open,
    flashCitationsS1Open,
    chronoExamenOpen,
    generateurIntroOpen,
    dictaphoneOralOpen,
    correcteurCopieOpen,
    radarMaitriseOpen,
    tableauAdOpen,
  };

  const closeModal = (key: keyof ShellModalsState) => {
    const setters: Record<keyof ShellModalsState, () => void> = {
      matchAuteursOpen: () => setMatchAuteursOpen(false),
      definitionsOpen: () => setDefinitionsOpen(false),
      fichePocheOpen: () => setFichePocheOpen(false),
      speedRunOpen: () => setSpeedRunOpen(false),
      detectiveOpen: () => setDetectiveOpen(false),
      sujetsOpen: () => setSujetsOpen(false),
      roleplayOpen: () => setRoleplayOpen(false),
      schemasOpen: () => setSchemasOpen(false),
      blindTestOpen: () => setBlindTestOpen(false),
      chronologieOpen: () => setChronologieOpen(false),
      palaisMemoireOpen: () => setPalaisMemoireOpen(false),
      briefingOpen: () => setBriefingOpen(false),
      pontsTransversauxOpen: () => setPontsTransversauxOpen(false),
      commandPaletteOpen: () => setCommandPaletteOpen(false),
      selectedWorkshop: () => setSelectedWorkshop(null),
      disasterRecoveryOpen: () => setDisasterRecoveryOpen(false),
      examSimulatorOpen: () => setExamSimulatorOpen(false),
      clinicalProtocolsOpen: () => setClinicalProtocolsOpen(false),
      memoireStudioOpen: () => setMemoireStudioOpen(false),
      biblioVaultOpen: () => setBiblioVaultOpen(false),
      deontoAuditOpen: () => setDeontoAuditOpen(false),
      clinicalCasesOpen: () => setClinicalCasesOpen(false),
      fieldJournalOpen: () => setFieldJournalOpen(false),
      oralDefenseOpen: () => setOralDefenseOpen(false),
      interventionCommsOpen: () => setInterventionCommsOpen(false),
      pontsS1Open: () => setPontsS1Open(false),
      flashCitationsS1Open: () => setFlashCitationsS1Open(false),
      chronoExamenOpen: () => setChronoExamenOpen(false),
      generateurIntroOpen: () => setGenerateurIntroOpen(false),
      dictaphoneOralOpen: () => setDictaphoneOralOpen(false),
      correcteurCopieOpen: () => setCorrecteurCopieOpen(false),
      radarMaitriseOpen: () => setRadarMaitriseOpen(false),
      tableauAdOpen: () => setTableauAdOpen(false),
    };
    setters[key]();
  };

  const effectiveModalModule = modalModuleOverride || moduleKey;

  return {
    state,
    effectiveModalModule,
    fichePocheModule,
    setSelectedWorkshop,
    closeModal,
  };
}
