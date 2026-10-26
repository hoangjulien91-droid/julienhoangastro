"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Copy,
  Sparkles,
  BookOpen,
  AlertTriangle,
  RotateCcw,
  Eye,
  EyeOff,
  GraduationCap,
  ChevronRight,
  ListChecks,
  BookmarkCheck,
  Check,
} from "lucide-react";
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
      // Découpage simple pour chercher les mots significatifs
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
      accent: "text-emerald-700 dark:text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
      btn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs",
      ring: "focus:border-emerald-500 focus:ring-emerald-500/30",
      activeTab: "bg-emerald-500/15 border-emerald-500/50 text-emerald-900 dark:text-emerald-300 font-bold shadow-2xs",
    },
    amber: {
      accent: "text-amber-700 dark:text-amber-300 border-amber-500/40 bg-amber-500/10",
      btn: "bg-amber-600 hover:bg-amber-500 text-white shadow-xs",
      ring: "focus:border-amber-500 focus:ring-amber-500/30",
      activeTab: "bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold shadow-2xs",
    },
    indigo: {
      accent: "text-indigo-700 dark:text-indigo-300 border-indigo-500/40 bg-indigo-500/10",
      btn: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs",
      ring: "focus:border-indigo-500 focus:ring-indigo-500/30",
      activeTab: "bg-indigo-500/15 border-indigo-500/50 text-indigo-900 dark:text-indigo-300 font-bold shadow-2xs",
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
              <span className="font-bold text-muted-foreground font-mono">#{idx + 1}</span>
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
        {/* COLONNE GAUCHE (5 cols) : Consignes, ressources, grille d'analyse, corrigé */}
        <div className="lg:col-span-5 space-y-5">
          {/* Cadre Consigne officielle */}
          <div className="p-4 md:p-5 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>Consigne officielle du Cnam</span>
            </div>
            <div className="text-xs md:text-sm text-foreground leading-relaxed whitespace-pre-line bg-muted/40 p-4 rounded-xl border border-border/60 font-sans">
              {activeAd.consigne}
            </div>

            {/* Contexte pédagogique */}
            {activeAd.contextePedagogique && (
              <div className="text-xs text-muted-foreground italic bg-muted/50 p-3 rounded-xl border border-border/60">
                <span className="font-semibold text-foreground not-italic block mb-1">
                  Enjeu théorique &amp; pédagogique :
                </span>
                {activeAd.contextePedagogique}
              </div>
            )}
          </div>

          {/* Concepts attendus & Checklist d'incorporation */}
          <div className="p-4 md:p-5 bg-card border border-border/70 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span className="flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-muted-foreground" />
                Concepts &amp; Auteurs attendus
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                {presentConceptsCount}/{conceptsChecklist.length} détectés
              </span>
            </div>

            <div className="space-y-1.5">
              {conceptsChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 text-xs p-2 rounded-xl border transition-all ${
                    item.isPresent
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300 font-medium"
                      : "bg-muted/30 border-border/60 text-muted-foreground"
                  }`}
                >
                  {item.isPresent ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-border/80 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{item.concept}</span>
                </div>
              ))}
            </div>

            {/* Auteurs à citer */}
            {activeAd.auteursAttendus.length > 0 && (
              <div className="pt-2 border-t border-border/60 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Auteurs académiques de référence :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeAd.auteursAttendus.map((auteur, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[11px] px-2.5 py-1 bg-muted/70 text-foreground rounded-lg border border-border/60 font-mono"
                    >
                      {auteur}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Points de vigilance & Recommandation examen */}
          {activeAd.pointsVigilance.length > 0 && (
            <div className="p-4 sm:p-5 bg-amber-500/10 border border-amber-500/25 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Points de vigilance (Conseils enseignants)</span>
              </div>
              <ul className="text-xs text-amber-950 dark:text-amber-200/90 space-y-1.5 pl-5 list-disc leading-relaxed">
                {activeAd.pointsVigilance.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Corrigé Modèle / Débriefing du cours (Révélable) */}
          <div className="p-4 md:p-5 bg-card border border-border/70 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                Corrigé type &amp; repères collectifs
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  setShowCorrige(!showCorrige);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showCorrige ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Masquer
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Consulter le corrigé
                  </>
                )}
              </button>
            </div>

            {showCorrige ? (
              <div className="space-y-3 pt-2 text-xs text-foreground leading-relaxed whitespace-pre-line bg-muted/40 p-4 rounded-xl border border-border/60 font-mono max-h-80 overflow-y-auto">
                {activeAd.corrigeModel}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Rédigez d&apos;abord votre propre proposition avant de révéler le
                corrigé type pour maximiser l&apos;effort d&apos;ancrage en mémoire.
              </p>
            )}
          </div>

          {/* Bloc Post-Correction : "Ce que j'avais raté / Notes de la séance" */}
          <div className="p-4 md:p-5 bg-card border border-border/70 rounded-2xl space-y-2 shadow-xs">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4 text-purple-500" />
              Retour de séance collective (« Ce que j&apos;avais raté »)
            </span>
            <p className="text-[11px] text-muted-foreground">
              Notez ici les précisions orales apportées par l&apos;enseignant lors de
              la correction en direct.
            </p>
            <textarea
              rows={3}
              value={postNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Ex : Mme Lucy a insisté sur la différence entre acte d'attribution et stigmate..."
              className="w-full text-xs bg-muted/30 text-foreground border border-border/60 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-sans resize-none"
            />
          </div>
        </div>

        {/* COLONNE DROITE (7 cols) : Éditeur de brouillon interactif */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
            {/* Barre d'outils de l'éditeur */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold text-foreground">
                  Votre espace de rédaction personnelle
                </h3>
              </div>

              {/* Compteurs de mots & statut sauvegarde */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground font-mono">
                  <b className="text-foreground">{wordCount}</b> mots · {charCount}{" "}
                  caractères
                </span>
                <span className="text-border">|</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Auto-sauvegardé
                </span>
              </div>
            </div>

            {/* Actions rapides au-dessus de l'éditeur */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={handleInsertTemplate}
                className="px-3 py-1.5 text-xs font-medium rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Insérer structure recommandée
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (
                      window.confirm("Voulez-vous effacer tout le texte rédigé ?")
                    ) {
                      handleDraftChange("");
                    }
                  }}
                  className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                  title="Réinitialiser le texte"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyForMoodle}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : themeClasses.btn
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copié pour Moodle !
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copier pour Moodle
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Zone de texte principale avec auto-save */}
            <textarea
              rows={18}
              value={draft}
              onChange={(e) => handleDraftChange(e.target.value)}
              placeholder="Rédigez votre travail ici... Vos modifications sont automatiquement enregistrées sur votre ordinateur. Utilisez le bouton 'Copier pour Moodle' pour déposer votre texte en un clic sur le forum officiel du Cnam."
              className={`w-full text-sm leading-relaxed bg-muted/20 text-foreground border border-border/70 rounded-2xl p-4 font-sans focus:outline-none focus:ring-2 ${themeClasses.ring} transition-all resize-y min-h-[380px] shadow-inner`}
            />

            {/* Conseil de dépôt & Moodle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-muted-foreground" />
                {activeAd.forumMoodleHint ||
                  "Déposez votre texte sur l'espace d'échange Moodle de votre enseignant."}
              </span>

              {/* Recommandation de volume */}
              <span className="text-muted-foreground font-medium">
                Volume recommandé : 300 à 600 mots
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
