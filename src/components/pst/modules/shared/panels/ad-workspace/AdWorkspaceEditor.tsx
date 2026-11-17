"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  RotateCcw,
  Check,
  Copy,
  Send,
} from "lucide-react";

interface AdWorkspaceEditorProps {
  draft: string;
  wordCount: number;
  charCount: number;
  copied: boolean;
  forumMoodleHint?: string;
  themeClasses: {
    accent: string;
    btn: string;
    ring: string;
    activeTab: string;
  };
  onDraftChange: (value: string) => void;
  onInsertTemplate: () => void;
  onResetDraft: () => void;
  onCopyForMoodle: () => void;
}

export const AdWorkspaceEditor: React.FC<AdWorkspaceEditorProps> = ({
  draft,
  wordCount,
  charCount,
  copied,
  forumMoodleHint,
  themeClasses,
  onDraftChange,
  onInsertTemplate,
  onResetDraft,
  onCopyForMoodle,
}) => {
  return (
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
            type="button"
            onClick={onInsertTemplate}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Insérer structure recommandée
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetDraft}
              className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
              title="Réinitialiser le texte"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onCopyForMoodle}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                copied ? "bg-emerald-600 text-white" : themeClasses.btn
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
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="Rédigez votre travail ici... Vos modifications sont automatiquement enregistrées sur votre ordinateur. Utilisez le bouton 'Copier pour Moodle' pour déposer votre texte en un clic sur le forum officiel du Cnam."
          className={`w-full text-sm leading-relaxed bg-muted/20 text-foreground border border-border/70 rounded-2xl p-4 font-sans focus:outline-none focus:ring-2 ${themeClasses.ring} transition-all resize-y min-h-[380px] shadow-inner`}
        />

        {/* Conseil de dépôt & Moodle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/60 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-muted-foreground" />
            {forumMoodleHint ||
              "Déposez votre texte sur l'espace d'échange Moodle de votre enseignant."}
          </span>

          {/* Recommandation de volume */}
          <span className="text-muted-foreground font-medium">
            Volume recommandé : 300 à 600 mots
          </span>
        </div>
      </div>
    </div>
  );
};
