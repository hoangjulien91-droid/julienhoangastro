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
      {/* En-tête du panneau PST123 */}
      <div className="p-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-neutral-900 border border-indigo-900/40 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                PST123 · Élisabeth LUCY
              </span>
              <span className="text-xs text-neutral-400">
                Travaux à préparer entre les cours (AD)
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Activités Distantes (AD) — L&apos;Identité Sociale et Professionnelle
            </h1>
            <p className="text-xs md:text-sm text-neutral-300 max-w-3xl">
              Préparez chaque quinzaine vos analyses de cas pour le cours de Mme
              Lucy. Vos rédactions sont sauvegardées localement et prêtes à être
              copiées en un clic sur le forum officiel de Moodle.
            </p>
          </div>

          {/* Onglets internes */}
          <div className="flex items-center gap-2 bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab("workspace");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "workspace"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-neutral-400 hover:text-neutral-200"
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "reperes"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Repères & Grille de Notation
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
          <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Grille d'évaluation des AD par Mme Élisabeth Lucy</span>
            </div>
            <ul className="text-xs text-neutral-300 space-y-3 leading-relaxed">
              <li className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <b className="text-indigo-300 block mb-1">
                  1. Rigueur de la conceptualisation (8 points)
                </b>
                Ne pas faire de paraphrase de bon sens ni de psychologisation.
                Utiliser le vocabulaire exact des auteurs : « transaction
                biographique », « actes d&apos;attribution », « habitus », « régulation
                autonome », etc.
              </li>
              <li className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <b className="text-indigo-300 block mb-1">
                  2. Articulation théorie ↔ situation réelle (7 points)
                </b>
                Chaque concept doit être illustré par un extrait concret de la
                situation de travail décrite. Pas de récitation théorique hors-sol.
              </li>
              <li className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <b className="text-indigo-300 block mb-1">
                  3. Structure argumentative et clarté (5 points)
                </b>
                Plan apparent en parties équilibrées, transitions logiques, et
                conclusion synthétique ouvrant sur les préconisations du
                psychologue du travail.
              </li>
            </ul>
          </div>

          {/* Passerelles vers les simulateurs de PST123 */}
          <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Outils interactifs complémentaires pour vos AD</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-semibold text-indigo-300 block mb-1">
                  Matrice Dubar & Sainsaulieu (Onglet Matrice)
                </span>
                Pour croiser les formes identitaires de Dubar avec les 4 modèles
                d&apos;accès au pouvoir de Sainsaulieu avant de rédiger les AD 1 et 2.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-semibold text-indigo-300 block mb-1">
                  Tribunal Déontologique (Onglet Tribunal)
                </span>
                Pour vérifier les articles du Code de déontologie 2021 et la Loi
                de 1985 avant de rédiger l&apos;AD 3.
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="font-semibold text-indigo-300 block mb-1">
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
