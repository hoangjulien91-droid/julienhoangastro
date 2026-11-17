"use client";

import { useEffect, useState, useMemo } from "react";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import {
  CLOZE_CHALLENGES,
  EXTRA_DISTRACTORS,
} from "@/lib/pst/data/schemas-matrices-cloze";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

export function useSchemasMatricesState(
  defaultModule?: string,
  initialSchemaId?: string,
  onClose?: () => void,
) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|123)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>(
    initialSchemaId || SCHEMAS_MATRICES[0]?.id || "",
  );
  const [viewMode, setViewMode] = useState<"svg" | "cloze" | "ascii">("svg");
  const [copied, setCopied] = useState(false);

  // Cloze Challenge State
  const [clozeAnswers, setClozeAnswers] = useState<Record<string, string>>({});
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Listen for global open events that specify a schemaId
  useEffect(() => {
    function handleOpenEvent(e: Event) {
      const customEvent = e as CustomEvent<{
        schemaId?: string;
        moduleKey?: string;
      }>;
      if (customEvent.detail?.schemaId) {
        setSelectedSchemaId(customEvent.detail.schemaId);
      }
      if (
        customEvent.detail?.moduleKey &&
        /^pst(106|108|123)$/.test(customEvent.detail.moduleKey)
      ) {
        setSelectedModule(customEvent.detail.moduleKey);
      }
    }
    window.addEventListener("pst:open-schemas", handleOpenEvent);
    return () =>
      window.removeEventListener("pst:open-schemas", handleOpenEvent);
  }, []);

  // Reset cloze state when changing schema
  useEffect(() => {
    setClozeAnswers({});
    setSelectedSlotId(null);
  }, [selectedSchemaId]);

  const filtered = SCHEMAS_MATRICES.filter((s) =>
    selectedModule === "all" ? true : s.moduleKey === selectedModule,
  );

  const activeSchema =
    filtered.find((s) => s.id === selectedSchemaId) ||
    filtered[0] ||
    SCHEMAS_MATRICES[0]!;

  const challenges = CLOZE_CHALLENGES[activeSchema.id] || [];
  const correctCount = challenges.filter(
    (c) => clozeAnswers[c.id] === c.answer,
  ).length;
  const isAllSolved =
    challenges.length > 0 && correctCount === challenges.length;

  const allAvailableBadges = useMemo(() => {
    return [
      ...challenges.map((c) => c.answer),
      EXTRA_DISTRACTORS[0]!,
      EXTRA_DISTRACTORS[1]!,
    ].sort(() => 0.5 - Math.random());
  }, [activeSchema.id, challenges]);

  function handleCopyAscii() {
    triggerHaptic("success");
    playClickSound();
    navigator.clipboard.writeText(activeSchema.asciiRepresentation.trim());
    setCopied(true);
    toast.success("Schéma copié au presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrintPlanche() {
    triggerHaptic("success");
    playSuccessSound();
    if (typeof window !== "undefined") {
      document.body.classList.add("printing-schemas");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-schemas");
      }, 1000);
    }
  }

  function handleOpenPalais() {
    playClickSound();
    onClose?.();
    window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"));
  }

  function handleSelectClozeOption(chosenText: string) {
    if (!selectedSlotId) {
      const firstEmpty = challenges.find((c) => !clozeAnswers[c.id]);
      if (firstEmpty) {
        applyOption(firstEmpty.id, chosenText);
      } else {
        toast.info(
          "Tous les emplacements sont remplis. Cliquez sur une case pour la modifier.",
        );
      }
      return;
    }
    applyOption(selectedSlotId, chosenText);
  }

  function applyOption(slotId: string, chosenText: string) {
    const targetChallenge = challenges.find((c) => c.id === slotId);
    if (!targetChallenge) return;

    if (targetChallenge.answer === chosenText) {
      triggerHaptic("success");
      playSuccessSound();
      toast.success(`Correct ! ${chosenText}`);
    } else {
      triggerHaptic("error");
      playReviewSound();
      toast.error(`Erreur : Ce n'est pas le bon emplacement.`);
    }

    const nextAnswers = { ...clozeAnswers, [slotId]: chosenText };
    setClozeAnswers(nextAnswers);
    setSelectedSlotId(null);
  }

  return {
    selectedModule,
    setSelectedModule,
    selectedSchemaId,
    setSelectedSchemaId,
    viewMode,
    setViewMode,
    copied,
    clozeAnswers,
    selectedSlotId,
    setSelectedSlotId,
    filtered,
    activeSchema,
    challenges,
    correctCount,
    isAllSolved,
    allAvailableBadges,
    handleCopyAscii,
    handlePrintPlanche,
    handleOpenPalais,
    handleSelectClozeOption,
  };
}
