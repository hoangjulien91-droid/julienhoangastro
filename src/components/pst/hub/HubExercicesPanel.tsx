"use client";

import React from "react";
import {
  ArrowRight,
  Compass,
  GitFork,
  GraduationCap,
  HeartHandshake,
  Printer,
  Quote,
  ShieldAlert,
  Swords,
  Zap,
} from "lucide-react";
import { EncartOutilsExclusifsUe } from "@/components/pst/shell/EncartOutilsExclusifsUe";

interface ExerciceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  event: string;
}

const EXERCICES: ExerciceItem[] = [
  {
    id: "ponts",
    title: "Ponts & Passerelles Transversales",
    description:
      "Articulations dialectiques, résonances conceptuelles et matrice comparée des 7 courants pour faire le lien inter-PST.",
    badge: "Synergies & Liens",
    icon: GitFork,
    event: "pst:open-ponts-transversaux",
  },
  {
    id: "match",
    title: "Match des Auteurs (1 vs 1)",
    description:
      "Confrontez deux théoriciens sur une situation réelle (Clot vs Dejours, Austin vs Bourdieu, Honneth vs Castel...).",
    badge: "Dialectique",
    icon: Swords,
    event: "pst:open-match-auteurs",
  },
  {
    id: "speedrun",
    title: "Sprint Chronométré (3 min)",
    description:
      "Entraînement réflexe sous contrainte temporelle pour consolider les notions clés.",
    badge: "Chrono 180s",
    icon: Zap,
    event: "pst:open-speed-run",
  },
  {
    id: "detective",
    title: "Détective des Pièges d'Examen",
    description:
      "Identifiez les confusions classiques (prescrit vs réel, tâche vs activité, déviance vs étiquetage...).",
    badge: "Auto-Évaluation",
    icon: ShieldAlert,
    event: "pst:open-detective",
  },
  {
    id: "sujets",
    title: "Sujets de Dissertation & Plans",
    description:
      "Banque d'annales officielles décortiquées avec problématiques et plans détaillés d'examen.",
    badge: "Écrit & Plans",
    icon: GraduationCap,
    event: "pst:open-sujets-dissertation",
  },
  {
    id: "fiche",
    title: "Fiche Mémo de Poche A4",
    description:
      "Support synthétique imprimable recto-verso regroupant l'essentiel des 5 UE pour les révisions nomades.",
    badge: "Support A4",
    icon: Printer,
    event: "pst:open-fiche-poche",
  },
  {
    id: "blind-test",
    title: "Défi Citations Mystères",
    description:
      "Quiz de rappel actif de citations et thèses canoniques à identifier pour consolider vos repères d'auteurs.",
    badge: "Blind-Test Auteurs",
    icon: Quote,
    event: "pst:open-blind-test",
  },
  {
    id: "palais",
    title: "Palais de la Mémoire",
    description:
      "Cartographie spatiale et conceptuelle articulant PST106, PST108 et PST123 en un seul édifice.",
    badge: "Transversal",
    icon: Compass,
    event: "pst:open-palais-memoire",
  },
  {
    id: "briefing",
    title: "Briefing Flash 30s (Jour J)",
    description:
      "Thèse centrale, citations clés, concepts incontournables et erreurs fatales par UE pour les révisions express.",
    badge: "Réflexe 30s",
    icon: Zap,
    event: "pst:open-briefing-30s",
  },
  {
    id: "roleplay",
    title: "Simulation & Négociation IOD",
    description:
      "Mise en situation professionnelle : posture du psychologue face aux demandes managériales et d'insertion.",
    badge: "Posture Clinique",
    icon: HeartHandshake,
    event: "pst:open-roleplay",
  },
];

export interface HubExercicesPanelProps {
  unitId: "pst106" | "pst108" | "pst123" | "pst120" | "pst124";
}

export function HubExercicesPanel({ unitId }: HubExercicesPanelProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Arsenal d'Outils Exclusifs 18/20 par UE (Sélecteur 106 · 108 · 123 · 120 · 124) */}
      <EncartOutilsExclusifsUe unitId={unitId} allowUeSwitch />

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-600 dark:text-amber-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
            Outils d&apos;Entraînement Clinique Transversaux
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {EXERCICES.length} Exercices Interactifs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {EXERCICES.map((ex) => {
          const Icon = ex.icon;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent(ex.event))}
              className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs transition-all text-left flex flex-col justify-between group active:scale-[0.98] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="size-4.5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80">
                    {ex.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                  {ex.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {ex.description}
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                <span>Lancer l&apos;exercice</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
