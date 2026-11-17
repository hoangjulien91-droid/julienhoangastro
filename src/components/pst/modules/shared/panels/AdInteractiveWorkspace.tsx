"use client";

import { Clock } from "lucide-react";
import {
  type UnifiedAdItem,
  type AdStatus,
  AD_STATUS_CONFIG,
  loadAdStatus,
} from "@/lib/pst/data/ad-common";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { AdWorkspaceSidebar } from "./ad-workspace/AdWorkspaceSidebar";
import { AdWorkspaceEditor } from "./ad-workspace/AdWorkspaceEditor";
import { useAdWorkspaceState } from "./ad-workspace/useAdWorkspaceState";

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
  const {
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
  } = useAdWorkspaceState(ads, defaultAdId);

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
    return (
      <div className="p-8 text-muted-foreground">Aucune AD configurée.</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── SÉLECTEUR RAPIDE D'ACTIVITÉ DISTANTE ──────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {ads.map((ad, idx) => {
          const adStat = loadAdStatus(ad.id, "todo");
          const isSelected = ad.id === selectedAdId;
          const cfg = AD_STATUS_CONFIG[adStat];

          return (
            <button
              key={ad.id}
              type="button"
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

      {/* ── EN-TÊTE DE L'AD ACTIVE (Apple HIG Card) ─────────────────────── */}
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

      {/* ── ESPACE DE TRAVAIL EN 2 COLONNES ──────────────────────────────── */}
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

      {/* ── ASTUCE MÉTHODOLOGIQUE DE BAS DE PAGE ────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-amber-500 shrink-0" />
          <span>
            <b>Conseil Cnam :</b> Les enseignants exigent des réponses concises,
            argumentées et appuyées sur des citations textuelles des auteurs.
          </span>
        </div>
        <span className="font-mono text-[11px]">
          Sauvegarde automatique locale activée · Sécurisé sur cet appareil
        </span>
      </div>
    </div>
  );
}

export default AdInteractiveWorkspace;
