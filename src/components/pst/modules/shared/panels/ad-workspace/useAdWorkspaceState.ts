import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  type UnifiedAdItem,
  type AdStatus,
  AD_STATUS_CONFIG,
  loadAdDraft,
  saveAdDraft,
  loadAdStatus,
  saveAdStatus,
  loadAdPostNotes,
  saveAdPostNotes,
} from "@/lib/pst/data/ad-common";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function useAdWorkspaceState(
  ads: UnifiedAdItem[],
  defaultAdId?: string,
) {
  const [selectedAdId, setSelectedAdId] = useState<string>(
    defaultAdId || ads[0]?.id || "",
  );
  const [draft, setDraft] = useState<string>("");
  const [status, setStatus] = useState<AdStatus>("todo");
  const [postNotes, setPostNotes] = useState<string>("");
  const [showCorrige, setShowCorrige] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeAd = useMemo(() => {
    return ads.find((a) => a.id === selectedAdId) || ads[0];
  }, [ads, selectedAdId]);

  // Chargement initial des données locales lors du changement d'AD
  useEffect(() => {
    if (!activeAd) return;
    const initialDraft = loadAdDraft(activeAd.id, "");
    const initialStatus = loadAdStatus(activeAd.id, "todo");
    const initialNotes = loadAdPostNotes(activeAd.id);

    setDraft(initialDraft);
    setStatus(initialStatus);
    setPostNotes(initialNotes);
    setShowCorrige(false);
  }, [activeAd]);

  // Sauvegarde automatique du brouillon
  function handleDraftChange(value: string) {
    setDraft(value);
    if (!activeAd) return;
    saveAdDraft(activeAd.id, value);

    // Si on commence à écrire et que le statut est "todo", on passe en "draft"
    if (status === "todo" && value.trim().length > 15) {
      setStatus("draft");
      saveAdStatus(activeAd.id, "draft");
    }
  }

  // Changement de statut
  function handleStatusChange(newStatus: AdStatus) {
    playClickSound();
    setStatus(newStatus);
    if (activeAd) {
      saveAdStatus(activeAd.id, newStatus);
      toast.success(`Statut mis à jour : ${AD_STATUS_CONFIG[newStatus].label}`);
    }
  }

  // Sauvegarde des notes post-correction
  function handleNotesChange(value: string) {
    setPostNotes(value);
    if (activeAd) {
      saveAdPostNotes(activeAd.id, value);
    }
  }

  // Injection du gabarit
  function handleInsertTemplate() {
    if (!activeAd) return;
    if (
      draft.trim().length > 0 &&
      !window.confirm(
        "Remplacer votre brouillon actuel par la structure type recommandée ?",
      )
    ) {
      return;
    }
    playClickSound();
    handleDraftChange(activeAd.gabaritReponse);
    toast.info("Gabarit de réponse inséré dans l'éditeur.");
  }

  // Copie pour le forum Moodle
  function handleCopyForMoodle() {
    if (!draft.trim()) {
      toast.warning("Votre brouillon est vide. Rédigez d'abord votre réponse.");
      return;
    }
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(draft);
      setCopied(true);
      playSuccessSound();
      triggerHaptic();
      toast.success(
        "Texte copié ! Vous pouvez le coller directement sur le forum Moodle.",
      );
      setTimeout(() => setCopied(false), 3000);

      // Si le statut n'est pas encore "submitted", proposer de le marquer comme prêt
      if (status === "draft" || status === "todo") {
        setStatus("ready");
        if (activeAd) saveAdStatus(activeAd.id, "ready");
      }
    }
  }

  // Calculs métriques
  const wordCount = useMemo(() => {
    const trimmed = draft.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [draft]);

  const charCount = draft.length;

  // Analyse en direct des concepts clés et auteurs présents dans le brouillon
  const conceptsChecklist = useMemo(() => {
    if (!activeAd) return [];
    const textLower = draft.toLowerCase();
    return activeAd.conceptsCles.map((concept) => {
      const words = concept
        .toLowerCase()
        .replace(/[^a-z0-9àâäéèêëîïôöùûüç]/gi, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 4);

      const isPresent = words.some((w) => textLower.includes(w));
      return { concept, isPresent };
    });
  }, [activeAd, draft]);

  const presentConceptsCount = conceptsChecklist.filter(
    (c) => c.isPresent,
  ).length;

  return {
    selectedAdId,
    setSelectedAdId,
    activeAd,
    draft,
    status,
    postNotes,
    showCorrige,
    setShowCorrige,
    copied,
    wordCount,
    charCount,
    conceptsChecklist,
    presentConceptsCount,
    handleDraftChange,
    handleStatusChange,
    handleNotesChange,
    handleInsertTemplate,
    handleCopyForMoodle,
  };
}
