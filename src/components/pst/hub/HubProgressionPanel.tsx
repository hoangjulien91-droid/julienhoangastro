"use client";

import React from "react";
import {
  ArrowRight,
  BookMarked,
  Briefcase,
  Check,
  ClipboardList,
  Clock,
  Copy,
  Download,
  FileSignature,
  FileText,
  GraduationCap,
  Scale,
  Smartphone,
  Upload,
} from "lucide-react";
import { exportGlobalPstBackup } from "@/lib/pst/global-sync";
import { computeGlobalStats } from "@/lib/pst/hub-stats";
import { StatsCards } from "./StatsCards";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { ExamCountdownCard } from "./ExamCountdownCard";
import { CurriculumPyramidCard } from "./CurriculumPyramidCard";

interface StudioItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  event: string;
}

const STUDIOS: StudioItem[] = [
  {
    id: "exam-simulator",
    title: "Simulateur Examen Blanc (2h00)",
    description:
      "Conditions réelles d'examen Cnam sans documents : tirage de sujet officiel, chronomètre et barème d'auto-évaluation.",
    badge: "Épreuve 2h00",
    icon: Clock,
    event: "pst:open-exam-simulator",
  },
  {
    id: "oral-defense",
    title: "Grand Jury Soutenance Orale (15m/30m)",
    description:
      "Entraînement à la soutenance du mémoire RNCP 7 : minuteur séquencé et questions contradictoires du jury Cnam.",
    badge: "Grand Jury",
    icon: GraduationCap,
    event: "pst:open-oral-defense",
  },
  {
    id: "clinical-cases",
    title: "Banque de Cas Cliniques Corrigés",
    description:
      "Études de cas terrain décortiquées (diagnostic ergonomique, psychodynamique, clinique de l'activité et IOD).",
    badge: "Corrigés Types",
    icon: Briefcase,
    event: "pst:open-clinical-cases",
  },
  {
    id: "memoire-studio",
    title: "Studio Mémoire & Verrou Pré-Soutenance",
    description:
      "Checklist méthodologique RNCP 7, structure canonique du mémoire professionnel et validation avant dépôt.",
    badge: "Mémoire Bac+5",
    icon: FileText,
    event: "pst:open-memoire-studio",
  },
  {
    id: "clinical-protocols",
    title: "Actes & Protocoles Cliniques (6 modèles)",
    description:
      "Protocoles d'autoconfrontation croisée, instruction au sosie, enquête psychodynamique et analyse ergonomique.",
    badge: "6 Protocoles",
    icon: FileSignature,
    event: "pst:open-clinical-protocols",
  },
  {
    id: "biblio-vault",
    title: "Coffre Bibliographique APA 7",
    description:
      "Références canoniques formatées selon les normes APA 7e éd. avec thèses clés prêtes à citer en copie ou mémoire.",
    badge: "Norme APA 7",
    icon: BookMarked,
    event: "pst:open-biblio-vault",
  },
  {
    id: "deonto-audit",
    title: "Audit Déontologique & Dilemmes (Code 2021)",
    description:
      "Mise à l'épreuve face aux dilemmes éthiques de terrain : secret professionnel, indépendance et demande sociale.",
    badge: "Code 2021",
    icon: Scale,
    event: "pst:open-deonto-audit",
  },
  {
    id: "field-journal",
    title: "Chronique d'Activité & Dictée Vocale",
    description:
      "Carnet d'observation clinique pour consigner vos notes réflexives de stage ou d'intervention par UE.",
    badge: "Terrain & Notes",
    icon: ClipboardList,
    event: "pst:open-field-journal",
  },
];

export interface HubProgressionPanelProps {
  stats: ReturnType<typeof computeGlobalStats>;
  syncCopied: boolean;
  onCopySync: () => void;
  onOpenSyncModal: () => void;
  onTriggerFileInput: () => void;
}

export function HubProgressionPanel({
  stats,
  syncCopied,
  onCopySync,
  onOpenSyncModal,
  onTriggerFileInput,
}: HubProgressionPanelProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Synchronisation & Sauvegarde Intégrale Mac ↔ Mobile (en tête d'onglet) */}
      <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Smartphone className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                Synchronisation Mac ↔ Mobile &amp; Sauvegarde Intégrale
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Sauvegardez l&apos;ensemble de vos 5 UE, notes de planning,
                brouillons d&apos;examen et studios.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 self-start sm:self-auto">
            100% Local &amp; Confidentialité
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Passerelle Directe (1 Clic)
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
              Générez un code compact et collez-le sur votre téléphone ou autre
              machine.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onCopySync}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-transform"
              >
                {syncCopied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                <span>{syncCopied ? "Code Copié !" : "Copier le code"}</span>
              </button>
              <button
                type="button"
                onClick={onOpenSyncModal}
                className="py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-950/70 transition-colors"
              >
                Importer / Coller
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Sauvegarde Fichier JSON
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
              Exportez un instantané complet sur votre disque pour ne jamais
              rien perdre.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={exportGlobalPstBackup}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Télécharger</span>
              </button>
              <button
                type="button"
                onClick={onTriggerFileInput}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="size-3.5" />
                <span>Charger JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progression Globale */}
      <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
          Progression Globale &amp; Assiduité SM-2
        </h4>
        <StatsCards stats={stats} />
        <div className="pt-2">
          <ActivityHeatmap activeDays={stats.activeDays} />
        </div>
      </div>

      {/* Échéancier Examens & Pyramide Cursus */}
      <div
        id="pyramide"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800"
      >
        <ExamCountdownCard />
        <CurriculumPyramidCard />
      </div>

      {/* Studios RNCP 7 */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Studios Professionnels, Examen Blanc &amp; Soutenance RNCP 7
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {STUDIOS.length} Studios Exécutifs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {STUDIOS.map((st) => {
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(st.event))
                }
                className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 shadow-2xs transition-all text-left flex flex-col justify-between group active:scale-[0.98] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="size-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="size-4.5" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                      {st.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {st.description}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-400 transition-colors">
                  <span>Ouvrir le studio</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
