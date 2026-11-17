"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
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
import { AdWorkspaceSidebar } from "./ad-workspace/AdWorkspaceSidebar";
import { AdWorkspaceEditor } from "./ad-workspace/AdWorkspaceEditor";

interface AdInteractiveWorkspaceProps {
  ads: UnifiedAdItem[];
  defaultAdId?: string;
  moduleTheme: "emerald" | "amber" | "indigo";
}

export function AdInteractiveWorkspace({
  ads,
  defaultAdId,
  moduleTheme,
}: AdInteractiveWorkspaceProps) {
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

  const themeClasses = {
    emerald: {
      accent:
        "text-emerald-700 dark:text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
      btn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs",
      ring: "focus:border-emerald-500 focus:ring-emerald-500/30",
      activeTab:
        "bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-300 font-bold shadow-2xs",
    },
    amber: {
      accent:
        "text-amber-700 dark:text-amber-300 border-amber-500/40 bg-amber-500/10",
      btn: "bg-amber-600 hover:bg-amber-500 text-white shadow-xs",
      ring: "focus:border-amber-500 focus:ring-amber-500/30",
      activeTab:
        "bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold shadow-2xs",
    },
    indigo: {
      accent:
        "text-indigo-700 dark:text-indigo-300 border-indigo-500/40 bg-indigo-500/10",
      btn: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs",
      ring: "focus:border-indigo-500 focus:ring-indigo-500/30",
      activeTab:
        "bg-indigo-500/15 border-indigo-500/50 text-indigo-900 dark:text-indigo-300 font-bold shadow-2xs",
    },
  }[moduleTheme];

  if (!activeAd) {
    return <div className="p-8 text-muted-foreground">Aucune AD configurée.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Barre de sélection des ADs (Apple iOS Segmented Style) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-muted/60 dark:bg-slate-900/80 border border-border/60 rounded-2xl">
        {ads.map((ad, idx) => {
          const adStat = loadAdStatus(ad.id, "todo");
          const isSelected = ad.id === selectedAdId;
          const cfg = AD_STATUS_CONFIG[adStat];

          return (
            <button
              key={ad.id}
              onClick={() => {
                playClickSound();
                setSelectedAdId(ad.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? themeClasses.activeTab
                  : "bg-card/70 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <span className="font-bold text-muted-foreground font-mono">
                #{idx + 1}
              </span>
              <span className="truncate max-w-[200px] md:max-w-[240px]">
                {ad.titre.replace(/AD\s*\d+\s*—\s*/i, "")}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${cfg.dotColor} shrink-0`}
                title={cfg.label}
              />
            </button>
          );
        })}
      </div>

      {/* En-tête de l'AD active (Apple HIG Card) */}
      <div className="p-5 sm:p-6 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-amber-500/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider bg-muted text-muted-foreground border border-border/60">
              {activeAd.moduleLabel}
            </span>
            <span className="text-xs text-muted-foreground">
              Professeur :{" "}
              <b className="text-foreground">{activeAd.enseignant}</b>
            </span>
            <span className="text-border">·</span>
            <span className="text-xs text-muted-foreground">
              Séance : <b className="text-foreground">{activeAd.dateSeance}</b>
            </span>
            {activeAd.dateLimite && (
              <>
                <span className="text-border">·</span>
                <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  Échéance : {activeAd.dateLimite}
                </span>
              </>
            )}
          </div>
          <h2 className="text-lg md:text-xl font-serif font-bold text-foreground tracking-tight">
            {activeAd.titre}
          </h2>
        </div>

        {/* Sélecteur de statut */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-card p-1.5 rounded-2xl border border-border/60 shadow-2xs">
          <span className="text-xs text-muted-foreground pl-2 font-medium">
            Statut :
          </span>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as AdStatus)}
            aria-label="Statut du travail distant"
            className="text-xs font-semibold bg-muted/60 text-foreground border border-border/60 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-border cursor-pointer"
          >
            {(Object.keys(AD_STATUS_CONFIG) as AdStatus[]).map((k) => (
              <option key={k} value={k}>
                {AD_STATUS_CONFIG[k].label}
              </option>
            ))}
          </select>
          <span
            className={`w-2.5 h-2.5 rounded-full ${AD_STATUS_CONFIG[status].dotColor} mr-2`}
          />
        </div>
      </div>

      {/* Espace de travail en 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <AdWorkspaceSidebar
          activeAd={activeAd}
          conceptsChecklist={conceptsChecklist}
          presentConceptsCount={presentConceptsCount}
          showCorrige={showCorrige}
          onToggleCorrige={() => {
            playClickSound();
            setShowCorrige(!showCorrige);
          }}
          postNotes={postNotes}
          onNotesChange={handleNotesChange}
        />

        <AdWorkspaceEditor
          draft={draft}
          wordCount={wordCount}
          charCount={charCount}
          copied={copied}
          forumMoodleHint={activeAd.forumMoodleHint}
          themeClasses={themeClasses}
          onDraftChange={handleDraftChange}
          onInsertTemplate={handleInsertTemplate}
          onResetDraft={() => {
            if (window.confirm("Voulez-vous effacer tout le texte rédigé ?")) {
              handleDraftChange("");
            }
          }}
          onCopyForMoodle={handleCopyForMoodle}
        />
      </div>
    </div>
  );
}

export default AdInteractiveWorkspace;
