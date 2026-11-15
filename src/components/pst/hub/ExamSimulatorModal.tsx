"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Award,
  Play,
  Square,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { triggerHaptic } from "@/lib/pst/audio-feedback";

interface ExamSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExamSubject {
  ue: string;
  titre: string;
  dureeMinutes: number;
  bareme: string;
  sujet: string;
  criteres: string[];
}

const EXAM_SUBJECTS: ExamSubject[] = [
  {
    ue: "PST106",
    titre: "Clinique de l'activité & Ergonomie",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« En vous appuyant sur les concepts forgés par Yves Clot et Alain Wisner, démontrez comment l'écart irréductible entre travail prescrit et travail réel constitue à la fois la source des discordances de métier et le levier d'une intervention en auto-confrontation croisée visant à restaurer le pouvoir d'agir. Illustrez votre propos par une situation de travail contrarié de votre choix. »",
    criteres: [
      "Distinction rigoureuse tâche prescrite vs activité réelle (Leplat / Wisner)",
      "Définition du réel de l'activité (l'activité suspendue, empêchée, contrariée)",
      "Articulation dialectique entre Genre professionnel et Style personnel",
      "Déroulement méthodologique précis du cadre d'auto-confrontation (simple puis croisée)",
      "Poste du psychologue : non pas expert prescripteur, mais garant du cadre dialogique",
    ],
  },
  {
    ue: "PST108",
    titre: "Examen 3h00 (3 × 1h00 : Lucy · Valls · Marot)",
    dureeMinutes: 180,
    bareme: "3 × 1h00 = 3h00",
    sujet:
      "L'épreuve officielle de PST108 (3h00) est divisée en 3 sous-épreuves de 1h00 chacune : 1h00 M. Éric LUCY, 1h00 M. Francis VALLS, 1h00 Mme Véronique MAROT. Sélectionne ci-dessous le petit examen de 1h00 à simuler ou l'épreuve complète 3h00.",
    criteres: [
      "Partie 1 (1h00 — É. Lucy) : Pouvoir symbolique (Bourdieu), agir communicationnel (Habermas), reconnaissance (Honneth) & critique de l'insulte",
      "Partie 2 (1h00 — F. Valls) : Contrat de communication (Ghiglione), ethnométhodologie (Garfinkel), faces & stigmate (Goffman) & Méthode IOD sans tri",
      "Partie 3 (1h00 — V. Marot) : Instrument psychologique (Vygotski), sosie/autoconfrontation, variables psychosociales (Abric/Lewin/Razran 1950/Porter)",
      "Gestion stricte du temps : 60 minutes maximum par enseignant (10m lecture + 10m plan + 35m rédaction + 5m relecture)",
    ],
  },
  {
    ue: "PST120",
    titre: "Psychodynamique du travail & RPS",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« La dynamique de la reconnaissance constitue le pivot de la transformation de la souffrance en plaisir au travail. Développez l'architecture des deux jugements (jugement d'utilité et jugement de beauté) théorisée par Christophe Dejours. Quels sont les effets psychopathologiques de la défaillance de ces jugements et comment émergent les idéologies défensives collectives ? »",
    criteres: [
      "Définition de l'expérience du réel comme résistance du monde physique/social",
      "Distinction nette jugement d'utilité (hiérarchie) vs jugement de beauté (pairs)",
      "Mécanismes des stratégies collectives de défense (virilisme, cynisme, déni partagé)",
      "Impact des nouvelles formes d'organisation du travail (NPM, reporting permanent)",
      "Cadre de l'enquête en psychodynamique : demande, volontariat, restitution",
    ],
  },
  {
    ue: "PST123",
    titre: "Déontologie & Bilan de compétences",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« Dans le cadre d'un bilan de compétences prescrit et financé par l'employeur dans un contexte de restructuration, la direction des ressources humaines exige la communication des conclusions détaillées et des tests de personnalité du salarié. Analysez la situation au regard des principes du Code de déontologie des psychologues (1996/2021) et du Code du travail. Quelle conduite tenez-vous ? »",
    criteres: [
      "Respect du secret professionnel et confidentialité absolue du document de synthèse",
      "Propriété exclusive des résultats du bilan au seul bénéficiaire (Art. L. 6313-4 C. Travail)",
      "Principe fondamental d'indépendance professionnelle et de libre arbitre du psychologue",
      "Refus d'instrumentalisation de l'évaluation à des fins de gestion managériale ou de licenciement",
      "Gestion de la restitution tripartite : accord préalable et explicite du bénéficiaire",
    ],
  },
  {
    ue: "PST124",
    titre: "Transformations numériques & Usages situés",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« L'introduction d'un outil algorithmique d'intelligence artificielle ou d'un progiciel ERP est fréquemment planifiée selon des critères d'acceptabilité a priori. À la lumière de la théorie de la genèse instrumentale de Pierre Rabardel et des travaux de Bobillier Chaumon sur l'acceptation située, montrez comment les salariés réinventent l'usage et pourquoi les ruses de métier sont indispensables au fonctionnement du système socio-technique. »",
    criteres: [
      "Distinction conceptuelle artefact technique vs instrument psychologique (Rabardel)",
      "Double mouvement de la genèse instrumentale : instrumentation et instrumentalisation",
      "Modèle de l'acceptation située face à l'écologie vivante du travail réel",
      "Rôle des catachrèses et détournements créatifs comme indicateurs de vitalité",
      "Risques de la charge mentale, de l'intensification et de l'invisibilisation du travail réel",
    ],
  },
];

type Pst108SubExamId = "lucy" | "valls" | "marot" | "complet";

const PST108_SUBEXAMS: Record<
  Pst108SubExamId,
  {
    shortLabel: string;
    titre: string;
    dureeMinutes: number;
    bareme: string;
    sujet: string;
    criteres: string[];
  }
> = {
  lucy: {
    shortLabel: "1h00 É. Lucy",
    titre: "PST108 · Sous-épreuve M. Éric LUCY (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« L'acte de langage ne tient jamais sa force des mots seuls mais de l'autorité déléguée par l'institution. » À partir de la critique d'Austin par Pierre Bourdieu et des apports de Jürgen Habermas et d'Axel Honneth, analysez comment une parole professionnelle au travail peut à la fois exercer une violence symbolique ou restaurer un espace délibératif et de reconnaissance.",
    criteres: [
      "Critique bourdieusienne de l'illusion linguistique d'Austin (Ce que parler veut dire, 1982)",
      "Acte d'institution et légitimité sociale du porte-parole (sceptre d'Homère / lit de justice de Sarah Hanley)",
      "Distinction nette Agir stratégique vs Agir communicationnel et 4 prétentions à la validité (Habermas)",
      "3 sphères de reconnaissance d'Axel Honneth (amour, droit, estime sociale) et lutte contre le mépris",
      "Gestion serrée du format 1h00 : problématisation rapide et exemples situés (ex. SAMU social, insulte)",
    ],
  },
  valls: {
    shortLabel: "1h00 F. Valls",
    titre: "PST108 · Sous-épreuve M. Francis VALLS (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« Le stigmate et l'échec d'une communication professionnelle ne sont jamais des défauts individuels isolés mais des productions interactionnelles et organisationnelles. » En articulant Erving Goffman (Scène, Coulisses, Face, Stigmate) et la Méthode IOD (Castra & Valls), montrez comment l'intervenant agit sur les conditions réelles d'interaction plutôt que de trier ou corriger l'individu.",
    criteres: [
      "Articulation rigoureuse du modèle théâtral de Goffman (Scène / Coulisses / Distance au rôle / Figuration)",
      "Stigmate comme rapport social lors des contacts mixtes et indifférence civique (1963)",
      "Allants de soi et asynchronie interlocutoire (Garfinkel) ou tensions de justice (Dubet)",
      "Méthode IOD : refus absolu du tri préalable et négociation sur les contraintes réelles du poste",
      "Cadence 1h00 : articulation clinique du cas sans survol superficiel",
    ],
  },
  marot: {
    shortLabel: "1h00 V. Marot",
    titre: "PST108 · Sous-épreuve Mme Véronique MAROT (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« En situation d'entretien ou de travail, le locuteur n'émet jamais un message neutre : son énonciation est traversée par ses cadres psychosociaux, sa représentation de soi et son rapport à l'adresse. » Mobilisez l'expérience de Gregory Razran (1950), les variables psychosociologiques d'Abric/Lewin et l'approche clinique (Vygotski, Sosie ou Porter) pour montrer comment conduire un entretien professionnel sans enfermer l'interlocuteur.",
    criteres: [
      "Protocole complet de Razran (1950) et fonction anticipatrice des préjugés / stéréotypes",
      "Tension Moi intime vs Moi public et effets de la rigidité de rôle en entretien",
      "Variables des acteurs (Anzieu & Martin / Abric 1999), 4 mécanismes de défense (Lewin) et biais de l'influence",
      "Dialogue comme instrument psychologique et développemental (Vygotski, Sosie, Autoconfrontation ou attitudes de Porter)",
      "Méthode de copie 'déplier la pensée' en 1h00 : justifier chaque auteur par un exemple clinique",
    ],
  },
  complet: {
    shortLabel: "3h00 Complet",
    titre: "PST108 · Épreuve Complète 3h00 (3 × 1h00 enchaînés)",
    dureeMinutes: 180,
    bareme: "Épreuve complète 3h00 (3 × 1h00)",
    sujet:
      "Simulation intégrale de l'examen terminal de PST108 (3h00) : composez successivement les 3 sous-épreuves de 1h00 — Partie 1 (M. Éric LUCY : Bourdieu / Habermas / Honneth), Partie 2 (M. Francis VALLS : Goffman / Garfinkel / Dubet / IOD) et Partie 3 (Mme Véronique MAROT : Vygotski / Sosie / Abric / Lewin / Razran 1950 / Porter).",
    criteres: [
      "Partie 1 traitée en ≤ 60 min (cadre socio-critique & délibératif d'Éric Lucy)",
      "Partie 2 traitée en ≤ 60 min (cadre interactionniste & IOD de Francis Valls)",
      "Partie 3 traitée en ≤ 60 min (cadre développemental & psychosocial de Véronique Marot)",
      "Clarté des 3 sous-copies distinctes avec concepts définis et exemples situés dans chaque partie",
    ],
  },
};

const EXAM_STORAGE_KEY = "pst_exam_simulator_v1";

interface ExamSimulatorSavedState {
  ue: string;
  copieContent: string;
  secondsRemaining: number;
  lastUpdated: string;
}

export function ExamSimulatorModal({
  isOpen,
  onClose,
}: ExamSimulatorModalProps) {
  const [selectedUe, setSelectedUe] = useState<string>("PST106");
  const [pst108Part, setPst108Part] = useState<Pst108SubExamId>("lucy");
  const [examActive, setExamActive] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200);
  const [copieContent, setCopieContent] = useState<string>("");
  const [checkedCriteria, setCheckedCriteria] = useState<
    Record<string, boolean>
  >({});
  const [mobileTab, setMobileTab] = useState<"sujet" | "copie">("sujet");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function toggleCriterion(c: string) {
    triggerHaptic("light");
    setCheckedCriteria((prev) => ({ ...prev, [c]: !prev[c] }));
  }

  function handleCopyCopie() {
    if (!copieContent.trim()) {
      toast.error("Votre copie est vide.");
      return;
    }
    navigator.clipboard.writeText(copieContent);
    toast.success("Copie copiée dans le presse-papier !");
  }

  // Restauration de la sauvegarde locale au montage ou à l'ouverture
  useEffect(() => {
    try {
      const raw = localStorage.getItem(EXAM_STORAGE_KEY);
      if (raw) {
        const saved: ExamSimulatorSavedState = JSON.parse(raw);
        if (saved && saved.ue) {
          setSelectedUe(saved.ue);
          setCopieContent(saved.copieContent || "");
          if (
            typeof saved.secondsRemaining === "number" &&
            saved.secondsRemaining > 0
          ) {
            setSecondsRemaining(saved.secondsRemaining);
          }
        }
      }
    } catch {
      /* ignore */
    }
  }, [isOpen]);

  const baseSubject =
    EXAM_SUBJECTS.find((s) => s.ue === selectedUe) || EXAM_SUBJECTS[0];
  const subject =
    selectedUe === "PST108"
      ? {
          ...baseSubject,
          ...PST108_SUBEXAMS[pst108Part],
        }
      : baseSubject;

  // Sauvegarde automatique en temps réel dès modification
  useEffect(() => {
    if (!copieContent.trim() && secondsRemaining === subject.dureeMinutes * 60)
      return;
    try {
      const state: ExamSimulatorSavedState = {
        ue: selectedUe,
        copieContent,
        secondsRemaining,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [selectedUe, copieContent, secondsRemaining, subject.dureeMinutes]);

  // Compteur de mots
  const wordCount = copieContent.trim()
    ? copieContent.trim().split(/\s+/).length
    : 0;

  useEffect(() => {
    if (examActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setExamActive(false);
            toast.info("Temps écoulé ! Épreuve terminée.");
            return 0;
          }
          if (prev === 600) {
            toast.warning("Attention : il ne reste que 10 minutes d'épreuve.");
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examActive, secondsRemaining]);

  function handleStart(minutes = subject.dureeMinutes) {
    setSecondsRemaining(minutes * 60);
    setExamActive(true);
    toast.success(`Épreuve lancée : ${minutes} minutes au chronomètre.`);
  }

  function handleStop() {
    setExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    toast.info("Chronomètre mis en pause.");
  }

  function handleReset() {
    setExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsRemaining(subject.dureeMinutes * 60);
    setCopieContent("");
    try {
      localStorage.removeItem(EXAM_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast.info("Session d'examen réinitialisée.");
  }

  function handleExportCopie() {
    if (!copieContent.trim()) {
      toast.error("Votre copie est vide.");
      return;
    }

    const checkedCount = subject.criteres.filter(
      (c) => checkedCriteria[c],
    ).length;

    const output = [
      `# COPIE D'EXAMEN BLANC CNAM — ${subject.ue}`,
      `**Intitulé** : ${subject.titre}`,
      `**Date de composition** : ${new Date().toLocaleDateString("fr-FR")}`,
      `**Temps effectif restant** : ${formatTime(secondsRemaining)}`,
      `**Nombre de mots** : ${wordCount}`,
      `**Critères validés en auto-évaluation** : ${checkedCount} / ${subject.criteres.length}`,
      `\n## SUJET OFFICIEL`,
      subject.sujet,
      `\n## RÉDACTION DU CANDIDAT`,
      copieContent,
      `\n## GRILLE DES CRITÈRES ET ATTENDUS DU JURY`,
      ...subject.criteres.map(
        (c) => `- [${checkedCriteria[c] ? "x" : " "}] ${c}`,
      ),
    ].join("\n\n");

    const blob = new Blob([output], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `copie_examen_blanc_${subject.ue.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Copie exportée en Markdown avec la grille d'évaluation.");
  }

  function formatTime(totalSec: number) {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
    }
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur d'Examen Blanc Chronométré CNAM"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-6xl h-[92vh] bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="size-8 rounded-lg bg-accent text-accent-foreground font-mono font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              CNAM
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <h2 className="text-xs sm:text-sm font-serif font-bold text-foreground leading-tight m-0 truncate">
                  Examen Blanc Chronométré
                </h2>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border shrink-0 hidden xs:inline">
                  Réel
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate block">
                {subject.ue} · {subject.titre}
              </span>
            </div>
          </div>

          {/* Module selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {EXAM_SUBJECTS.map((s) => (
              <button
                key={s.ue}
                type="button"
                onClick={() => {
                  setSelectedUe(s.ue);
                  setExamActive(false);
                  const nextMinutes =
                    s.ue === "PST108"
                      ? PST108_SUBEXAMS[pst108Part].dureeMinutes
                      : s.dureeMinutes;
                  setSecondsRemaining(nextMinutes * 60);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedUe === s.ue
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.ue}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Mobile View Switcher (phones and portrait tablets) */}
        <div className="lg:hidden flex items-center border-b border-border bg-muted/30 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("sujet")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "sujet"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Sujet &amp; Critères</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("copie")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "copie"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="size-3.5" />
            <span>2. Copie ({wordCount} mots)</span>
          </button>
        </div>

        {/* Central Split View */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Sujet & Barème (5 cols) */}
          <div
            className={`lg:col-span-5 p-3.5 sm:p-5 border-r border-border overflow-y-auto space-y-4 sm:space-y-5 bg-background/50 ${
              mobileTab === "sujet" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Sélecteur 3 × 1h00 dédié PST108 */}
            {selectedUe === "PST108" && (
              <div className="p-3 rounded-xl border border-indigo-500/25 bg-indigo-500/5 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-700 dark:text-indigo-400">
                  PST108 · Examen 3h00 divisé en 3 × 1h00
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["lucy", "valls", "marot", "complet"] as const).map(
                    (partKey) => {
                      const part = PST108_SUBEXAMS[partKey];
                      const active = pst108Part === partKey;
                      return (
                        <button
                          key={partKey}
                          type="button"
                          onClick={() => {
                            setPst108Part(partKey);
                            setExamActive(false);
                            setSecondsRemaining(part.dureeMinutes * 60);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer border text-left ${
                            active
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-card text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {part.shortLabel}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            )}

            {/* Timer card */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Chronomètre Officiel
                </span>
                <span
                  className={`font-mono text-lg font-black tracking-tight ${
                    secondsRemaining < 600
                      ? "text-rose-600 animate-pulse"
                      : "text-foreground"
                  }`}
                >
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {!examActive ? (
                  <button
                    type="button"
                    onClick={() => handleStart(subject.dureeMinutes)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Play className="size-3.5" />
                    <span>
                      {subject.dureeMinutes === 60
                        ? "Lancer 1h00"
                        : subject.dureeMinutes === 180
                          ? "Lancer 3h00"
                          : "Lancer 2h00"}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStop}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Square className="size-3.5" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleStart(45)}
                  className="px-2.5 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  title="Entraînement court 45 min"
                >
                  Flash 45m
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  title="Réinitialiser"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Sujet de l'épreuve */}
            <div className="p-4 rounded-xl border border-accent/25 bg-accent/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                  Sujet d'Épreuve Type
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {subject.bareme}
                </span>
              </div>
              <p className="text-foreground text-xs sm:text-sm font-serif leading-relaxed italic m-0">
                {subject.sujet}
              </p>
            </div>

            {/* Critères d'évaluation attendus */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Attendus du jury &amp; Critères :
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {subject.criteres.filter((c) => checkedCriteria[c]).length} /{" "}
                  {subject.criteres.length} cochés
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground pl-0 list-none m-0">
                {subject.criteres.map((c, idx) => {
                  const isChecked = !!checkedCriteria[c];
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => toggleCriterion(c)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer ${
                          isChecked
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200 font-medium"
                            : "bg-muted/30 border-border/70 hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <span
                          className={`size-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                            isChecked
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-border bg-card"
                          }`}
                        >
                          {isChecked && <Check className="size-3" />}
                        </span>
                        <span className="leading-relaxed text-xs">{c}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column: Zone de rédaction (7 cols) */}
          <div
            className={`lg:col-span-7 p-3.5 sm:p-5 flex flex-col overflow-hidden bg-card ${
              mobileTab === "copie" ? "flex" : "hidden lg:flex"
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/80 text-xs text-muted-foreground gap-2">
              <span className="font-semibold text-foreground truncate">
                Feuille de Composition
              </span>
              <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] shrink-0">
                <span>
                  Mots :{" "}
                  <strong className="text-foreground">{wordCount}</strong>
                </span>
                <span>
                  Caractères :{" "}
                  <strong className="text-foreground">
                    {copieContent.length}
                  </strong>
                </span>
              </div>
            </div>

            <textarea
              value={copieContent}
              onChange={(e) => setCopieContent(e.target.value)}
              placeholder="Rédigez votre introduction, problématisation, plan en 2 ou 3 parties et argumentation théorique ici..."
              className="flex-1 w-full min-h-[300px] p-3.5 sm:p-4 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm leading-relaxed resize-none focus:outline-hidden focus:ring-1 focus:ring-accent font-sans"
            />

            {/* Bottom action row */}
            <div className="pt-2.5 sm:pt-3 mt-2 sm:mt-3 border-t border-border flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono">
                Sauvegarde locale automatique active
              </span>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleCopyCopie}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border transition-colors cursor-pointer shadow-2xs active:scale-95"
                >
                  <Copy className="size-3.5" />
                  <span>Copier</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCopie}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="size-3.5" />
                  <span>Exporter (.md)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
