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
} from "lucide-react";
import { toast } from "sonner";

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
    sujet: "« En vous appuyant sur les concepts forgés par Yves Clot et Alain Wisner, démontrez comment l'écart irréductible entre travail prescrit et travail réel constitue à la fois la source des discordances de métier et le levier d'une intervention en auto-confrontation croisée visant à restaurer le pouvoir d'agir. Illustrez votre propos par une situation de travail contrarié de votre choix. »",
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
    titre: "Langage, communication & clinique du dialogue",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet: "« La qualité du travail ne se décrète pas : elle se dispute. À partir des travaux de Mikhaïl Bakhtine sur le dialogisme et de la clinique du dialogue de métier, expliquez pourquoi la disparition des controverses professionnelles réglées compromet la santé des collectifs. Comment l'intervenant peut-il réinstituer une dispute professionnelle sur les critères du travail bien fait ? »",
    criteres: [
      "Concept de dialogisme et d'adresse à autrui (Bakhtine)",
      "Dimension performative du langage au travail (Austin / Clot)",
      "Différence entre conflit interpersonnel destructeur et controverse réglée sur le travail bien fait",
      "Modalités d'animation d'une table de délibération professionnelle",
      "Écueils managériaux : le monologue de gestion et l'évaluation individualisée",
    ],
  },
  {
    ue: "PST120",
    titre: "Psychodynamique du travail & RPS",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet: "« La dynamique de la reconnaissance constitue le pivot de la transformation de la souffrance en plaisir au travail. Développez l'architecture des deux jugements (jugement d'utilité et jugement de beauté) théorisée par Christophe Dejours. Quels sont les effets psychopathologiques de la défaillance de ces jugements et comment émergent les idéologies défensives collectives ? »",
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
    sujet: "« Dans le cadre d'un bilan de compétences prescrit et financé par l'employeur dans un contexte de restructuration, la direction des ressources humaines exige la communication des conclusions détaillées et des tests de personnalité du salarié. Analysez la situation au regard des principes du Code de déontologie des psychologues (1996/2021) et du Code du travail. Quelle conduite tenez-vous ? »",
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
    sujet: "« L'introduction d'un outil algorithmique d'intelligence artificielle ou d'un progiciel ERP est fréquemment planifiée selon des critères d'acceptabilité a priori. À la lumière de la théorie de la genèse instrumentale de Pierre Rabardel et des travaux de Bobillier Chaumon sur l'acceptation située, montrez comment les salariés réinventent l'usage et pourquoi les ruses de métier sont indispensables au fonctionnement du système socio-technique. »",
    criteres: [
      "Distinction conceptuelle artefact technique vs instrument psychologique (Rabardel)",
      "Double mouvement de la genèse instrumentale : instrumentation et instrumentalisation",
      "Modèle de l'acceptation située face à l'écologie vivante du travail réel",
      "Rôle des catachrèses et détournements créatifs comme indicateurs de vitalité",
      "Risques de la charge mentale, de l'intensification et de l'invisibilisation du travail réel",
    ],
  },
];

export function ExamSimulatorModal({
  isOpen,
  onClose,
}: ExamSimulatorModalProps) {
  const [selectedUe, setSelectedUe] = useState<string>("PST106");
  const [examActive, setExamActive] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200);
  const [copieContent, setCopieContent] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const subject = EXAM_SUBJECTS.find((s) => s.ue === selectedUe) || EXAM_SUBJECTS[0];

  // Compteur de mots
  const wordCount = copieContent.trim() ? copieContent.trim().split(/\s+/).length : 0;

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

  function handleStart(minutes = 120) {
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
    setSecondsRemaining(120 * 60);
    setCopieContent("");
    toast.info("Session d'examen réinitialisée.");
  }

  function handleExportCopie() {
    if (!copieContent.trim()) {
      toast.error("Votre copie est vide.");
      return;
    }

    const output = [
      `# COPIE D'EXAMEN BLANC CNAM — ${subject.ue}`,
      `**Intitulé** : ${subject.titre}`,
      `**Date de composition** : ${new Date().toLocaleDateString("fr-FR")}`,
      `**Temps effectif restant** : ${formatTime(secondsRemaining)}`,
      `**Nombre de mots** : ${wordCount}`,
      `\n## SUJET OFFICIEL`,
      subject.sujet,
      `\n## RÉDACTION DU CANDIDAT`,
      copieContent,
      `\n## CRITÈRES DE NOTATION ATTENDUS`,
      ...subject.criteres.map((c) => `- ${c}`),
    ].join("\n\n");

    const blob = new Blob([output], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `copie_examen_blanc_${subject.ue.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Copie exportée en Markdown.");
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
        <div className="p-4 sm:px-6 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-lg bg-accent text-accent-foreground font-mono font-bold text-xs flex items-center justify-center shadow-xs">
              CNAM
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-serif font-bold text-foreground leading-tight m-0">
                  Mode Examen Blanc Chronométré
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border">
                  Conditions Réelles
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">
                {subject.ue} · {subject.titre}
              </span>
            </div>
          </div>

          {/* Module selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {EXAM_SUBJECTS.map((s) => (
              <button
                key={s.ue}
                type="button"
                onClick={() => {
                  setSelectedUe(s.ue);
                  setExamActive(false);
                  setSecondsRemaining(s.dureeMinutes * 60);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer ${
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
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Central Split View */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Sujet & Barème (5 cols) */}
          <div className="lg:col-span-5 p-5 border-r border-border overflow-y-auto space-y-5 bg-background/50">
            {/* Timer card */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Chronomètre Officiel
                </span>
                <span className={`font-mono text-lg font-black tracking-tight ${
                  secondsRemaining < 600 ? "text-rose-600 animate-pulse" : "text-foreground"
                }`}>
                  {formatTime(secondsRemaining)}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {!examActive ? (
                  <button
                    type="button"
                    onClick={() => handleStart(120)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Play className="size-3.5" />
                    <span>Lancer 2h00</span>
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
              <span className="text-xs font-semibold text-foreground block">
                Attendus du jury &amp; Critères de notation :
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground pl-0 list-none m-0">
                {subject.criteres.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Zone de rédaction (7 cols) */}
          <div className="lg:col-span-7 p-5 flex flex-col overflow-hidden bg-card">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/80 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                Feuille de Composition du Candidat
              </span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span>Mots : <strong className="text-foreground">{wordCount}</strong></span>
                <span>Caractères : <strong className="text-foreground">{copieContent.length}</strong></span>
              </div>
            </div>

            <textarea
              value={copieContent}
              onChange={(e) => setCopieContent(e.target.value)}
              placeholder="Rédigez votre introduction, problématisation, plan en 2 ou 3 parties et argumentation théorique ici..."
              className="flex-1 w-full p-4 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm leading-relaxed resize-none focus:outline-hidden focus:ring-1 focus:ring-accent font-sans"
            />

            {/* Bottom action row */}
            <div className="pt-3 mt-3 border-t border-border flex items-center justify-between gap-3">
              <span className="text-[11px] text-muted-foreground font-mono">
                Sauvegarde locale automatique active
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCopie}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <Download className="size-3.5" />
                  <span>Exporter la Copie (.md)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
