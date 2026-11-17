"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import type { ShellModalsState, ModalKey } from "./shellModalsTypes";

type BooleanModalKey = Exclude<keyof ShellModalsState, "selectedWorkshop">;

const INITIAL_BOOLEAN_MODALS: Record<BooleanModalKey, boolean> = {
  matchAuteursOpen: false,
  definitionsOpen: false,
  fichePocheOpen: false,
  speedRunOpen: false,
  detectiveOpen: false,
  sujetsOpen: false,
  roleplayOpen: false,
  schemasOpen: false,
  blindTestOpen: false,
  chronologieOpen: false,
  palaisMemoireOpen: false,
  briefingOpen: false,
  pontsTransversauxOpen: false,
  commandPaletteOpen: false,
  disasterRecoveryOpen: false,
  examSimulatorOpen: false,
  clinicalProtocolsOpen: false,
  memoireStudioOpen: false,
  biblioVaultOpen: false,
  deontoAuditOpen: false,
  clinicalCasesOpen: false,
  fieldJournalOpen: false,
  oralDefenseOpen: false,
  interventionCommsOpen: false,
  pontsS1Open: false,
  flashCitationsS1Open: false,
  chronoExamenOpen: false,
  generateurIntroOpen: false,
  dictaphoneOralOpen: false,
  correcteurCopieOpen: false,
  radarMaitriseOpen: false,
  tableauAdOpen: false,
};

// Événements simples déclenchant l'ouverture d'une modale
// Le 3e paramètre indique s'il faut extraire le module de l'événement custom
const SIMPLE_MODAL_EVENTS: Array<[string, BooleanModalKey, boolean?]> = [
  ["pst:open-match-auteurs", "matchAuteursOpen", true],
  ["pst:open-definitions", "definitionsOpen", true],
  ["pst:open-speed-run", "speedRunOpen", true],
  ["pst:open-pieges-detective", "detectiveOpen", true],
  ["pst:open-sujets-dissertation", "sujetsOpen", true],
  ["pst:open-simulateur-roleplay", "roleplayOpen", true],
  ["pst:open-schemas", "schemasOpen", true],
  ["pst:open-blind-test", "blindTestOpen", true],
  ["pst:open-chronologie", "chronologieOpen", true],
  ["pst:open-palais-memoire", "palaisMemoireOpen", true],
  ["pst:open-briefing-30s", "briefingOpen", true],
  ["pst:open-ponts-transversaux", "pontsTransversauxOpen"],
  ["pst:open-command-palette", "commandPaletteOpen"],
  ["pst:open-clinical-protocols", "clinicalProtocolsOpen"],
  ["pst:open-memoire-studio", "memoireStudioOpen"],
  ["pst:open-biblio-vault", "biblioVaultOpen"],
  ["pst:open-exam-simulator", "examSimulatorOpen"],
  ["pst:open-disaster-recovery", "disasterRecoveryOpen"],
  ["pst:open-deonto-audit", "deontoAuditOpen"],
  ["pst:open-clinical-cases", "clinicalCasesOpen"],
  ["pst:open-field-journal", "fieldJournalOpen"],
  ["pst:open-oral-defense", "oralDefenseOpen"],
  ["pst:open-intervention-comms", "interventionCommsOpen"],
  ["pst:open-ponts-s1", "pontsS1Open"],
  ["pst:open-flash-citations-s1", "flashCitationsS1Open", true],
  ["pst:open-chrono-examen", "chronoExamenOpen", true],
  ["pst:open-generateur-intro", "generateurIntroOpen", true],
  ["pst:open-dictaphone-oral", "dictaphoneOralOpen", true],
  ["pst:open-correcteur-copie", "correcteurCopieOpen", true],
  ["pst:open-radar-s1", "radarMaitriseOpen"],
  ["pst:open-tableau-ad", "tableauAdOpen"],
];

export function useShellModals(moduleKey: string) {
  const [modals, setModals] = useState<Record<BooleanModalKey, boolean>>(INITIAL_BOOLEAN_MODALS);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [fichePocheModule, setFichePocheModule] = useState(
    /^pst(106|108|120|123|124)$/.test(moduleKey) ? moduleKey : "pst108",
  );
  const [modalModuleOverride, setModalModuleOverride] = useState<string | null>(null);

  useEffect(() => {
    if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
      setFichePocheModule(moduleKey);
    }
  }, [moduleKey]);

  const anyShellModalOpen = useMemo(() => {
    return Boolean(selectedWorkshop) || Object.values(modals).some(Boolean);
  }, [modals, selectedWorkshop]);

  useEffect(() => {
    if (!anyShellModalOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModals(INITIAL_BOOLEAN_MODALS);
        setSelectedWorkshop(null);
      }
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

    const listeners: Array<{ event: string; handler: (e?: Event) => void }> = [];

    // Enregistrement des événements simples
    SIMPLE_MODAL_EVENTS.forEach(([eventName, modalKeyName, capturesModule]) => {
      const handler = (e?: Event) => {
        if (capturesModule) {
          captureModuleDetail(e);
        }
        setModals((prev) => ({ ...prev, [modalKeyName]: true }));
      };
      listeners.push({ event: eventName, handler });
      window.addEventListener(eventName, handler);
    });

    // Cas particulier : Fiche poche (met à jour fichePocheModule)
    const handleOpenPoche = (e?: Event) => {
      const customMod = captureModuleDetail(e);
      if (customMod) {
        setFichePocheModule(customMod);
      } else if (/^pst(106|108|120|123|124)$/.test(moduleKey)) {
        setFichePocheModule(moduleKey);
      }
      setModals((prev) => ({ ...prev, fichePocheOpen: true }));
    };
    listeners.push({ event: "pst:open-fiche-poche", handler: handleOpenPoche });
    window.addEventListener("pst:open-fiche-poche", handleOpenPoche);

    // Cas particulier : Atelier slide-over
    const handleOpenSlideOver = (e?: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.moduleId;
      if (targetMod) {
        setSelectedWorkshop(targetMod);
      }
    };
    listeners.push({ event: "pst:open-atelier-slideover", handler: handleOpenSlideOver });
    window.addEventListener("pst:open-atelier-slideover", handleOpenSlideOver);

    // Raccourci global ⌘K / Ctrl+K
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA" ||
        (activeEl as HTMLElement)?.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setModals((prev) => ({ ...prev, commandPaletteOpen: !prev.commandPaletteOpen }));
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      listeners.forEach(({ event, handler }) => {
        window.removeEventListener(event, handler);
      });
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [moduleKey]);

  const closeModal = useCallback((key: ModalKey) => {
    if (key === "selectedWorkshop") {
      setSelectedWorkshop(null);
    } else {
      setModals((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  const state: ShellModalsState = useMemo(() => {
    return {
      ...modals,
      selectedWorkshop,
    };
  }, [modals, selectedWorkshop]);

  const effectiveModalModule = modalModuleOverride || moduleKey;

  return {
    state,
    effectiveModalModule,
    fichePocheModule,
    setSelectedWorkshop,
    closeModal,
  };
}
