"use client";

import type { ComponentType } from "react";
import {
  Activity,
  BookMarked,
  Briefcase,
  Calendar,
  ClipboardList,
  Clock,
  Compass,
  Database,
  FileSearch,
  FileSignature,
  FileText,
  Film,
  Flame,
  Gavel,
  GitFork,
  GraduationCap,
  HeartHandshake,
  History,
  Layers,
  MessageSquare,
  Mic,
  Palette,
  Printer,
  Quote,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Swords,
  Target,
  Timer,
  User,
  Zap,
} from "lucide-react";

interface ToolEntry {
  label: string;
  icon: ComponentType<{ className?: string }>;
  iconClass: string;
  cardClass?: string;
  labelClass?: string;
  event?: string;
  href?: string;
}

const TOOLS: ToolEntry[] = [
  {
    label: "Match des Auteurs (Comparateur 1 vs 1)",
    icon: Swords,
    iconClass: "text-rose-500",
    event: "pst:open-match-auteurs",
  },
  {
    label: "Coffre des Définitions Clés (Auto-Test 18/20)",
    icon: ShieldCheck,
    iconClass: "text-indigo-500",
    event: "pst:open-definitions",
  },
  {
    label: "Fiche Mémo de Poche A4 (Imprimable)",
    icon: Printer,
    iconClass: "text-emerald-500",
    event: "pst:open-fiche-poche",
  },
  {
    label: "Sprint Chronométré 3 Min (Mémorisation)",
    icon: Flame,
    iconClass: "text-amber-500",
    event: "pst:open-speed-run",
  },
  {
    label: "Détective des Pièges d'Examen (18/20)",
    icon: ShieldAlert,
    iconClass: "text-purple-500",
    event: "pst:open-detective",
  },
  {
    label: "Sujets de Dissertation & Plans 18/20",
    icon: GraduationCap,
    iconClass: "text-indigo-500",
    event: "pst:open-sujets-dissertation",
  },
  {
    label: "Jeu de Rôle Clinique & Négociation IOD",
    icon: HeartHandshake,
    iconClass: "text-teal-500",
    event: "pst:open-roleplay",
  },
  {
    label: "Schémas Vectoriels & Matrices SVG 18/20 (Mémoire Visuelle)",
    icon: Palette,
    iconClass: "text-cyan-500",
    event: "pst:open-schemas",
  },
  {
    label: "Défi Citations Mystères & Blind-Test Auteurs Cnam",
    icon: Quote,
    iconClass: "text-violet-500",
    event: "pst:open-blind-test",
  },
  {
    label: "Frise Historique & Généalogie (1880-2026)",
    icon: History,
    iconClass: "text-emerald-500",
    event: "pst:open-chronologie",
  },
  {
    label:
      "Ponts & Passerelles Transversales inter-PST (17 Synergies & 7 Courants)",
    icon: GitFork,
    iconClass: "text-amber-500",
    event: "pst:open-ponts-transversaux",
  },
  {
    label: "Le Palais de la Mémoire Tri-Module (PST 106-108-123)",
    icon: Compass,
    iconClass: "text-purple-500",
    event: "pst:open-palais-memoire",
  },
  {
    label: "Ponts Conceptuels S1 (PST 106 - 108 - 123) ✦",
    icon: Compass,
    iconClass: "text-indigo-500",
    cardClass: "border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20",
    labelClass: "text-indigo-600 dark:text-indigo-300",
    event: "pst:open-ponts-s1",
  },
  {
    label: "Flash-Citations Incontournables S1 (Mode Trous / Audio) ✦",
    icon: Quote,
    iconClass: "text-amber-500",
    cardClass: "border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20",
    labelClass: "text-amber-600 dark:text-amber-300",
    event: "pst:open-flash-citations-s1",
  },
  {
    label: "Simulateur Chrono-Examen Écrit (2h / 3h CNAM) ✦",
    icon: Timer,
    iconClass: "text-emerald-500",
    cardClass:
      "border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20",
    labelClass: "text-emerald-600 dark:text-emerald-300",
    event: "pst:open-chrono-examen",
  },
  {
    label: "Matrice Dubar & Sainsaulieu (PST123 Cas Pratiques) ✦",
    icon: Layers,
    iconClass: "text-purple-500",
    cardClass: "border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20",
    labelClass: "text-purple-600 dark:text-purple-300",
    href: "/pst/123/#matrice",
  },
  {
    label: "Générateur d'Introductions & Problématiques 18/20 ✦",
    icon: FileSignature,
    iconClass: "text-indigo-500",
    cardClass: "border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20",
    labelClass: "text-indigo-600 dark:text-indigo-300",
    event: "pst:open-generateur-intro",
  },
  {
    label: "Dictaphone Vocal d'Auto-Évaluation (Flash-Oral 2 min) ✦",
    icon: Mic,
    iconClass: "text-purple-500",
    cardClass: "border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20",
    labelClass: "text-purple-600 dark:text-purple-300",
    event: "pst:open-dictaphone-oral",
  },
  {
    label: "Labo Diagnostic 106 (Leplat & Hoc × Yves Clot) ✦",
    icon: Activity,
    iconClass: "text-teal-500",
    cardClass: "border border-teal-500/20 bg-teal-50/30 dark:bg-teal-950/20",
    labelClass: "text-teal-600 dark:text-teal-300",
    href: "/pst/106/#diagnostic",
  },
  {
    label: "Simulateur de Négociation IOD (Francis Valls & Castra) ✦",
    icon: HeartHandshake,
    iconClass: "text-amber-500",
    cardClass: "border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20",
    labelClass: "text-amber-600 dark:text-amber-300",
    href: "/pst/108/#iod",
  },
  {
    label: "Tribunal Déontologique du Titre (Loi 1985 & Code 2021) ✦",
    icon: Gavel,
    iconClass: "text-indigo-500",
    cardClass: "border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20",
    labelClass: "text-indigo-600 dark:text-indigo-300",
    href: "/pst/123/#deonto",
  },
  {
    label: "Simulateur d'Autoconfrontation & Sosie (PST106) ✦",
    icon: Film,
    iconClass: "text-teal-500",
    cardClass: "border border-teal-500/20 bg-teal-50/30 dark:bg-teal-950/20",
    labelClass: "text-teal-600 dark:text-teal-300",
    href: "/pst/106/#autoconfrontation",
  },
  {
    label: "Décodeur Langage & Pragmatique (PST108 Bühler & Habermas) ✦",
    icon: MessageSquare,
    iconClass: "text-amber-500",
    cardClass: "border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20",
    labelClass: "text-amber-600 dark:text-amber-300",
    href: "/pst/108/#langage",
  },
  {
    label: "Annotateur de Récits de Vie (PST123 Bourdieu & Hughes) ✦",
    icon: User,
    iconClass: "text-purple-500",
    cardClass: "border border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20",
    labelClass: "text-purple-600 dark:text-purple-300",
    href: "/pst/123/#biographie",
  },
  {
    label: "Correcteur & Scanner Anti-Psychologisation CNAM ✦",
    icon: FileSearch,
    iconClass: "text-rose-500",
    cardClass: "border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20",
    labelClass: "text-rose-600 dark:text-rose-300",
    event: "pst:open-correcteur-copie",
  },
  {
    label: "Radar de Maîtrise S1 & Bootcamp Express (15 min) ✦",
    icon: Target,
    iconClass: "text-indigo-500",
    cardClass: "border border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20",
    labelClass: "text-indigo-600 dark:text-indigo-300",
    event: "pst:open-radar-s1",
  },
  {
    label: "Tableau de Bord Unifié des AD (13 Travaux Distants S1) ✦",
    icon: Calendar,
    iconClass: "text-amber-500",
    cardClass: "border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20",
    labelClass: "text-amber-600 dark:text-amber-300",
    event: "pst:open-tableau-ad",
  },
  {
    label: "Briefing Tactique 30s (Oral / Partiel)",
    icon: Zap,
    iconClass: "text-amber-500",
    event: "pst:open-briefing-30s",
  },
  {
    label: "Studio Mémoire & Verrou Pré-Soutenance",
    icon: FileText,
    iconClass: "text-indigo-500",
    event: "pst:open-memoire-studio",
  },
  {
    label: "Actes & Protocoles Cliniques (6 modèles)",
    icon: FileSignature,
    iconClass: "text-emerald-500",
    event: "pst:open-clinical-protocols",
  },
  {
    label: "Coffre Bibliographique APA 7",
    icon: BookMarked,
    iconClass: "text-amber-600 dark:text-amber-400",
    event: "pst:open-biblio-vault",
  },
  {
    label: "Simulateur Examen Blanc (2h00)",
    icon: Clock,
    iconClass: "text-rose-500",
    event: "pst:open-exam-simulator",
  },
  {
    label: "Banque de Cas Cliniques Corrigés",
    icon: Briefcase,
    iconClass: "text-cyan-500",
    event: "pst:open-clinical-cases",
  },
  {
    label: "Chronique d'Activité & Dictée Vocale",
    icon: ClipboardList,
    iconClass: "text-teal-500",
    event: "pst:open-field-journal",
  },
  {
    label: "Audit Déontologique & Dilemmes (Code 2021)",
    icon: Scale,
    iconClass: "text-rose-500",
    event: "pst:open-deonto-audit",
  },
  {
    label: "Soutenance Orale & Grand Jury (15m/30m)",
    icon: GraduationCap,
    iconClass: "text-amber-500",
    event: "pst:open-oral-defense",
  },
  {
    label: "Courriers & Notes d'Intervention Terrain",
    icon: FileSignature,
    iconClass: "text-accent",
    event: "pst:open-intervention-comms",
  },
  {
    label: "Inspecteur Stockage & Restauration",
    icon: Database,
    iconClass: "text-cyan-500",
    event: "pst:open-disaster-recovery",
  },
];

interface CommandPaletteToolsGridProps {
  onTriggerModal: (eventName: string) => void;
  onNavigate: (path: string) => void;
}

export function CommandPaletteToolsGrid({
  onTriggerModal,
  onNavigate,
}: CommandPaletteToolsGridProps) {
  return (
    <div className="space-y-1 pt-1 border-t border-border/60">
      <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
        Exercices Cliniques &amp; Outils d&apos;Étude RNCP 7
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              onClick={() => {
                if (tool.href) onNavigate(tool.href);
                else if (tool.event) onTriggerModal(tool.event);
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer ${
                tool.cardClass ?? ""
              }`}
            >
              <Icon className={`size-4 shrink-0 ${tool.iconClass}`} />
              <span className={`font-medium ${tool.labelClass ?? ""}`}>
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
