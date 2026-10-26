"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Scale,
  Brain,
  Quote,
  Users,
} from "lucide-react";
import { PST123_AD_DATA } from "@/lib/pst/data/pst123-ad";
import { AdInteractiveWorkspace } from "@/components/pst/modules/shared/panels/AdInteractiveWorkspace";
import { playClickSound } from "@/lib/pst/audio-feedback";

export function ActivitesDistantes123() {
  const [activeTab, setActiveTab] = useState<"workspace" | "reperes">("workspace");

  return (
    <div className="space-y-6">
      {/* En-tête du panneau PST123 (Apple HIG Card) */}
      <div className="p-6 sm:p-7 rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-card via-card to-indigo-500/[0.05] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30">
                PST123 · Élisabeth LUCY
              </span>
              <span className="text-xs text-muted-foreground">
                Travaux à préparer entre les cours (AD)
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-foreground tracking-tight">
              Activités Distantes (AD) — L&apos;Identité Sociale et Professionnelle
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Préparez chaque quinzaine vos analyses de cas pour le cours de Mme
              Lucy. Vos rédactions sont sauvegardées localement et prêtes à être
              copiées en un clic sur le forum officiel de Moodle.
            </p>
          </div>

          {/* Onglets internes (Apple iOS Segmented Control) */}
          <div className="inline-flex items-center p-1 bg-muted/60 dark:bg-slate-900/80 rounded-2xl border border-border/60 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("workspace");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "workspace"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Espace de Rédaction (4 AD)
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("reperes");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "reperes"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Repères &amp; Grille de Notation
            </button>
          </div>
        </div>
      </div>

      {/* Contenu de l'onglet actif */}
      {activeTab === "workspace" ? (
        <AdInteractiveWorkspace
          ads={PST123_AD_DATA}
          moduleTheme="indigo"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grille d'évaluation Mme Lucy */}
          <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Grille d&apos;évaluation des AD par Mme Élisabeth Lucy</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-3 leading-relaxed">
              <li className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <b className="text-indigo-700 dark:text-indigo-300 block mb-1">
                  1. Rigueur de la conceptualisation (8 points)
                </b>
                Ne pas faire de paraphrase de bon sens ni de psychologisation.
                Utiliser le vocabulaire exact des auteurs : « transaction
                biographique », « actes d&apos;attribution », « habitus », « régulation
                autonome », etc.
              </li>
              <li className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <b className="text-indigo-700 dark:text-indigo-300 block mb-1">
                  2. Articulation théorie ↔ situation réelle (7 points)
                </b>
                Chaque concept doit être illustré par un extrait concret de la
                situation de travail décrite. Pas de récitation théorique hors-sol.
              </li>
              <li className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <b className="text-indigo-700 dark:text-indigo-300 block mb-1">
                  3. Structure argumentative et clarté (5 points)
                </b>
                Plan apparent en parties équilibrées, transitions logiques, et
                conclusion synthétique ouvrant sur les préconisations du
                psychologue du travail.
              </li>
            </ul>
          </div>

          {/* Passerelles vers les simulateurs de PST123 */}
          <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Outils interactifs complémentaires pour vos AD</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Matrice Dubar &amp; Sainsaulieu (Onglet Matrice)
                </span>
                Pour croiser les formes identitaires de Dubar avec les 4 modèles
                d&apos;accès au pouvoir de Sainsaulieu avant de rédiger les AD 1 et 2.
              </div>
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Tribunal Déontologique (Onglet Tribunal)
                </span>
                Pour vérifier les articles du Code de déontologie 2021 et la Loi
                de 1985 avant de rédiger l&apos;AD 3.
              </div>
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">
                  Annotateur de Récit de Vie (Onglet Récits)
                </span>
                Pour surligner en direct les bifurcations biographiques et actes
                d&apos;attribution.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
