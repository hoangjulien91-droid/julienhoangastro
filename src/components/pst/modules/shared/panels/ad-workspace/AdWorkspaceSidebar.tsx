"use client";

import React from "react";
import {
  BookOpen,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Eye,
  EyeOff,
  BookmarkCheck,
} from "lucide-react";
import { type UnifiedAdItem } from "@/lib/pst/data/ad-common";

interface AdWorkspaceSidebarProps {
  activeAd: UnifiedAdItem;
  conceptsChecklist: { concept: string; isPresent: boolean }[];
  presentConceptsCount: number;
  showCorrige: boolean;
  onToggleCorrige: () => void;
  postNotes: string;
  onNotesChange: (value: string) => void;
}

export const AdWorkspaceSidebar: React.FC<AdWorkspaceSidebarProps> = ({
  activeAd,
  conceptsChecklist,
  presentConceptsCount,
  showCorrige,
  onToggleCorrige,
  postNotes,
  onNotesChange,
}) => {
  return (
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
            onClick={onToggleCorrige}
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
          Notez ici les précisions orales apportées par l&apos;enseignant lors de la
          correction en direct.
        </p>
        <textarea
          rows={3}
          value={postNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Ex : Mme Lucy a insisté sur la différence entre acte d'attribution et stigmate..."
          className="w-full text-xs bg-muted/30 text-foreground border border-border/60 rounded-xl p-3 focus:outline-none focus:border-purple-500 font-sans resize-none"
        />
      </div>
    </div>
  );
};
