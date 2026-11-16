"use client";

/**
 * Root wrapper for every /pst* route. Intentionally does NOT render the
 * site's Navbar/Footer (InnerPageLayout) — these are self-contained app
 * pages (quiz/flashcards), not editorial content, matching the standalone
 * HTML documents the original Astro pages were.
 */

import "./pst-globals.css";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  Columns2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { PstThemeProvider } from "./PstThemeProvider";
import { CurrentCardProvider } from "./CurrentCardContext";
import { ModulesNav } from "./ModulesNav";
import { PstAccessGate } from "./PstAccessGate";
import { hasValidPstSession, clearPstSession } from "@/lib/pst/access-gate";
import { StudyTools } from "@/components/pst/study-tools/StudyTools";
import { ShellModalsHost, type ShellModalsState } from "./ShellModalsHost";

import { playClickSound } from "@/lib/pst/audio-feedback";
import { Toaster } from "@/components/ui/sonner";
import { SplitCalepinSidebar } from "./SplitCalepinSidebar";

interface PstPageShellProps {
  moduleKey: string;
  activeNav?: string;
  children?: ReactNode;
  /** Désactive le max-width: 760px de `.wrap` (cf. planning.css) pour les
   * pages qui ont besoin de toute la largeur de l'écran, comme la frise du
   * planning — inutile pour les pages quiz/flashcards, centrées à dessein. */
  wide?: boolean;
}

type LayoutMode = "standard" | "wide" | "split";

export function PstPageShell({
  moduleKey,
  activeNav,
  children,
  wide,
}: PstPageShellProps) {
  const [matchAuteursOpen, setMatchAuteursOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<
    "checking" | "locked" | "unlocked"
  >("checking");

  useEffect(() => {
    setAuthStatus(hasValidPstSession() ? "unlocked" : "locked");
    const handleLock = () => {
      clearPstSession();
      setAuthStatus("locked");
    };
    window.addEventListener("pst:lock", handleLock);
    return () => window.removeEventListener("pst:lock", handleLock);
  }, []);
  const [definitionsOpen, setDefinitionsOpen] = useState(false);
  const [fichePocheOpen, setFichePocheOpen] = useState(false);
  const [fichePocheModule, setFichePocheModule] = useState(
    /^pst(106|108|120|123|124)$/.test(moduleKey) ? moduleKey : "pst108",
  );
  const [speedRunOpen, setSpeedRunOpen] = useState(false);

  useEffect(() => {
    if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
      setFichePocheModule(moduleKey);
    }
  }, [moduleKey]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      import.meta.env.PROD
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
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
  const [modalModuleOverride, setModalModuleOverride] = useState<string | null>(
    null,
  );
  const effectiveModalModule = modalModuleOverride || moduleKey;
  const isWorkshopModule = /^pst(106|108|120|123|124)$/.test(moduleKey);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>("standard");

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
    const handleOpenCorrecteurCopie = () => setCorrecteurCopieOpen(true);
    const handleOpenRadarS1 = () => setRadarMaitriseOpen(true);
    const handleOpenTableauAd = () => setTableauAdOpen(true);
    const handleOpenSlideOver = (e?: Event) => {
      const modId = (e as CustomEvent)?.detail?.moduleId;
      if (modId) setSelectedWorkshop(modId);
    };

    window.addEventListener("pst:open-match-auteurs", handleOpenMatch);
    window.addEventListener("pst:open-definitions", handleOpenDefs);
    window.addEventListener("pst:open-fiche-poche", handleOpenPoche);
    window.addEventListener("pst:open-speed-run", handleOpenSpeedRun);
    window.addEventListener("pst:open-detective", handleOpenDetective);
    window.addEventListener("pst:open-sujets-dissertation", handleOpenSujets);
    window.addEventListener("pst:open-roleplay", handleOpenRoleplay);
    window.addEventListener("pst:open-schemas", handleOpenSchemas);
    window.addEventListener("pst:open-blind-test", handleOpenBlindTest);
    window.addEventListener("pst:open-chronologie", handleOpenChronologie);
    window.addEventListener("pst:open-palais-memoire", handleOpenPalaisMemoire);
    window.addEventListener("pst:open-briefing-30s", handleOpenBriefing);
    window.addEventListener("pst:open-ponts-transversaux", handleOpenPonts);
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
    window.addEventListener("pst:open-atelier-slideover", handleOpenSlideOver);

    // Global shortcuts (Ctrl+K / Cmd+K et Escape pour fermer les modales)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "Escape") {
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
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Support ouverture directe via paramètre d'URL ?open=
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const openParam = params.get("open");
        if (openParam) {
          if (openParam === "pst:open-briefing-30s") setBriefingOpen(true);
          else if (openParam === "pst:open-fiche-poche")
            setFichePocheOpen(true);
          else if (openParam === "pst:open-schemas") setSchemasOpen(true);
          else if (openParam === "pst:open-speed-run") setSpeedRunOpen(true);
          else if (openParam === "pst:open-detective") setDetectiveOpen(true);
          else if (openParam === "pst:open-sujets-dissertation")
            setSujetsOpen(true);
          else if (openParam === "pst:open-roleplay") setRoleplayOpen(true);
          else if (openParam === "pst:open-match-auteurs")
            setMatchAuteursOpen(true);
          else if (openParam === "pst:open-definitions")
            setDefinitionsOpen(true);
          else if (openParam === "pst:open-blind-test") setBlindTestOpen(true);
          else if (openParam === "pst:open-chronologie")
            setChronologieOpen(true);
          else if (openParam === "pst:open-palais-memoire")
            setPalaisMemoireOpen(true);
          else if (openParam === "pst:open-ponts-transversaux")
            setPontsTransversauxOpen(true);
          else if (openParam === "pst:open-command-palette")
            setCommandPaletteOpen(true);
          else if (openParam === "pst:open-clinical-protocols")
            setClinicalProtocolsOpen(true);
          else if (openParam === "pst:open-memoire-studio")
            setMemoireStudioOpen(true);
          else if (openParam === "pst:open-biblio-vault")
            setBiblioVaultOpen(true);
          else if (openParam === "pst:open-exam-simulator")
            setExamSimulatorOpen(true);
          else if (openParam === "pst:open-disaster-recovery")
            setDisasterRecoveryOpen(true);
          else if (openParam === "pst:open-deonto-audit")
            setDeontoAuditOpen(true);
          else if (openParam === "pst:open-clinical-cases")
            setClinicalCasesOpen(true);
          else if (openParam === "pst:open-field-journal")
            setFieldJournalOpen(true);
          else if (openParam === "pst:open-oral-defense")
            setOralDefenseOpen(true);
          else if (openParam === "pst:open-intervention-comms")
            setInterventionCommsOpen(true);
          else if (openParam === "pst:open-ponts-s1")
            setPontsS1Open(true);
          else if (openParam === "pst:open-flash-citations-s1")
            setFlashCitationsS1Open(true);
          else if (openParam === "pst:open-chrono-examen")
            setChronoExamenOpen(true);
          else if (openParam === "pst:open-generateur-intro")
            setGenerateurIntroOpen(true);
          else if (openParam === "pst:open-dictaphone-oral")
            setDictaphoneOralOpen(true);
          else if (openParam === "pst:open-correcteur-copie")
            setCorrecteurCopieOpen(true);
          else if (openParam === "pst:open-radar-s1")
            setRadarMaitriseOpen(true);
          else if (openParam === "pst:open-tableau-ad")
            setTableauAdOpen(true);
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch {
        /* ignore */
      }
    }

    return () => {
      window.removeEventListener("pst:open-match-auteurs", handleOpenMatch);
      window.removeEventListener("pst:open-definitions", handleOpenDefs);
      window.removeEventListener("pst:open-fiche-poche", handleOpenPoche);
      window.removeEventListener("pst:open-speed-run", handleOpenSpeedRun);
      window.removeEventListener("pst:open-detective", handleOpenDetective);
      window.removeEventListener(
        "pst:open-sujets-dissertation",
        handleOpenSujets,
      );
      window.removeEventListener("pst:open-roleplay", handleOpenRoleplay);
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
  }, []);

  useEffect(() => {
    if (!isWorkshopModule) return;
    try {
      const savedMode = localStorage.getItem(
        "pst_layout_mode_v1",
      ) as LayoutMode | null;
      if (
        savedMode === "standard" ||
        savedMode === "wide" ||
        savedMode === "split"
      ) {
        setLayoutMode(savedMode);
      }
    } catch {
      // ignore
    }
  }, [isWorkshopModule]);

  function changeLayoutMode(mode: LayoutMode) {
    playClickSound();
    setLayoutMode(mode);
    try {
      localStorage.setItem("pst_layout_mode_v1", mode);
    } catch {
      // ignore
    }
  }

  const isEffectiveWide =
    wide || layoutMode === "wide" || layoutMode === "split";

  if (authStatus === "checking") {
    return (
      <PstThemeProvider moduleKey={moduleKey}>
        <div
          className="min-h-[75vh] flex items-center justify-center"
          aria-busy="true"
          aria-label="Chargement de l'espace PST"
        >
          <div className="size-8 rounded-full border-2 border-slate-300 dark:border-slate-700 border-t-[#891B29] animate-spin" />
        </div>
      </PstThemeProvider>
    );
  }

  if (authStatus === "locked") {
    return (
      <PstThemeProvider moduleKey={moduleKey}>
        <PstAccessGate onUnlock={() => setAuthStatus("unlocked")} />
        <Toaster />
      </PstThemeProvider>
    );
  }

  return (
    <PstThemeProvider moduleKey={moduleKey}>
      <CurrentCardProvider>
        {/* Navigation principale PST - Pleine largeur 7xl sur Desktop */}
        <ModulesNav
          active={activeNav ?? (moduleKey === "pst" ? "hub" : moduleKey)}
        />

        {isWorkshopModule && (
          <div className="hidden lg:flex items-center justify-end gap-2 max-w-6xl mx-auto mb-3">
            <div className="inline-flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl shadow-2xs text-xs">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Disposition :
              </span>
              <button
                type="button"
                onClick={() => changeLayoutMode("standard")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "standard"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Colonne centrée de lecture (760px)"
              >
                <Minimize2 className="size-3.5" />
                <span>Confort</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("wide")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "wide"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Mode Large (1120px)"
              >
                <Maximize2 className="size-3.5" />
                <span>Large</span>
              </button>
              <button
                type="button"
                onClick={() => changeLayoutMode("split")}
                className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === "split"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Double écran : Atelier à gauche + Calepin & Glossaire épinglé à droite"
              >
                <Columns2 className="size-3.5" />
                <span>Double Écran Calepin</span>
              </button>
            </div>
          </div>
        )}

        <div
          className={
            isWorkshopModule && layoutMode === "split"
              ? "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              : undefined
          }
        >
          <div
            className={
              isWorkshopModule && layoutMode === "split"
                ? "lg:col-span-8 min-w-0"
                : `wrap${isEffectiveWide ? " wrap-wide" : ""}`
            }
          >
            {children}
          </div>

          {isWorkshopModule && layoutMode === "split" && (
            <SplitCalepinSidebar moduleKey={moduleKey} />
          )}
        </div>

        <StudyTools moduleKey={moduleKey} />
        <ShellModalsHost
          state={{
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
          }}
          effectiveModalModule={effectiveModalModule}
          fichePocheModule={fichePocheModule}
          onSelectWorkshop={setSelectedWorkshop}
          closeModal={(key: keyof ShellModalsState) => {
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
          }}
        />
        <Toaster />
      </CurrentCardProvider>
    </PstThemeProvider>
  );
}
