"use client";

import { useState } from "react";
import {
  X,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  FileSearch,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PiegeLangageItem {
  motifRegex: RegExp;
  termeDetecte: string;
  explication: string;
  remplacementRecommande: string;
}

const PIEGES_PSYCHOLOGISATION: PiegeLangageItem[] = [
  {
    motifRegex: /résistance\s+au\s+changement/gi,
    termeDetecte: "Résistance au changement",
    explication:
      "Terme managérial condescendant qui disqualifie la parole des salariés. En ergonomie et clinique, le refus du changement est une défense légitime du métier.",
    remplacementRecommande:
      "« stratégie collective de préservation des règles de l'art et du travail bien fait » ou « attachement au genre professionnel »",
  },
  {
    motifRegex: /manque\s+de\s+motivation|pas\s+motivé/gi,
    termeDetecte: "Manque de motivation",
    explication:
      "Psychologisation individualisante qui masque les contraintes organisationnelles. On ne naît pas 'démotivé', on subit un empêchement d'agir.",
    remplacementRecommande:
      "« perte de sens consécutive au travail empêché » ou « désinvestissement défensif »",
  },
  {
    motifRegex: /conflit\s+de\s+personnalité|problème\s+de\s+personne/gi,
    termeDetecte: "Conflit de personnalité",
    explication:
      "Réduit un dysfonctionnement organisationnel ou une divergence de critères de qualité à une incompatibilité d'humeur individuelle.",
    remplacementRecommande:
      "« controverse de métier non arbitrée » ou « divergence sur les critères de la qualité du travail »",
  },
  {
    motifRegex: /gestion\s+du\s+stress|gérer\s+son\s+stress|salarié\s+stressé/gi,
    termeDetecte: "Gestion du stress / Salarié stressé",
    explication:
      "Le 'stress' est une notion biomédicale réductrice qui fait porter la responsabilité de l'adaptation au seul salarié.",
    remplacementRecommande:
      "« souffrance liée à la réduction des marges de manœuvre » ou « tension entre exigences prescrites et moyens alloués »",
  },
  {
    motifRegex: /erreur\s+humaine|faute\s+de\s+l'opérateur/gi,
    termeDetecte: "Erreur humaine / Faute de l'opérateur",
    explication:
      "L'ergonomie de Wisner et Leplat a démontré que l'erreur est le résultat d'un piège organisationnel ou d'un compromis opératoire sous forte variabilité.",
    remplacementRecommande:
      "« défaillance de la régulation face à la variabilité imprévue » ou « compromis opératoire dégradé »",
  },
  {
    motifRegex: /burnout\s+individuel|fragilité\s+individuelle/gi,
    termeDetecte: "Burnout individuel / Fragilité individuelle",
    explication:
      "Fait porter la responsabilité de la décompensation sur la psychologie intime du sujet plutôt que sur l'emprise gestionnaire.",
    remplacementRecommande:
      "« décompensation psychopathologique liée à l'effondrement des défenses collectives » (Dejours/Gaulejac)",
  },
];

const AUTEURS_CANONIQUES_S1 = [
  { nom: "Wisner", ue: "PST106" },
  { nom: "Leplat", ue: "PST106" },
  { nom: "Clot", ue: "PST106" },
  { nom: "Oddone", ue: "PST106" },
  { nom: "Canguilhem", ue: "PST106" },
  { nom: "Honneth", ue: "PST108" },
  { nom: "Dejours", ue: "PST108" },
  { nom: "Gaulejac", ue: "PST108" },
  { nom: "Enriquez", ue: "PST108" },
  { nom: "Kaës", ue: "PST108" },
  { nom: "Valls", ue: "PST108" },
  { nom: "Habermas", ue: "PST108" },
  { nom: "Bühler", ue: "PST108" },
  { nom: "Dubar", ue: "PST123" },
  { nom: "Sainsaulieu", ue: "PST123" },
  { nom: "Bourdieu", ue: "PST123" },
  { nom: "Hughes", ue: "PST123" },
  { nom: "Wittorski", ue: "PST123" },
];

interface CorrecteurCopieCnamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CorrecteurCopieCnamModal({
  isOpen,
  onClose,
}: CorrecteurCopieCnamModalProps) {
  const [texteCopie, setTexteCopie] = useState("");
  const [mobileTab, setMobileTab] = useState<"texte" | "diagnostic">("texte");

  if (!isOpen) return null;

  // Analyse psychologisation
  const piegesDetectes = PIEGES_PSYCHOLOGISATION.filter((p) =>
    p.motifRegex.test(texteCopie),
  );

  // Analyse auteurs
  const auteursPresents = AUTEURS_CANONIQUES_S1.filter((a) =>
    new RegExp(`\\b${a.nom}\\b`, "i").test(texteCopie),
  );
  const auteursAbsents = AUTEURS_CANONIQUES_S1.filter(
    (a) => !new RegExp(`\\b${a.nom}\\b`, "i").test(texteCopie),
  );

  const motsCount = texteCopie.trim() ? texteCopie.trim().split(/\s+/).length : 0;

  // Score académique global (/100)
  let score = 100;
  score -= piegesDetectes.length * 15;
  score = Math.max(0, score);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Correcteur de Copie CNAM — Barème et Anti-Psychologisation"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-rose-500/30 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-800 bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <FileSearch className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-400 truncate">
                  Scanner Anti-Psychologisation
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Contrôle Qualité
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white truncate">
                Correcteur Stylistique &amp; Biais RH
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Mobile View Switcher */}
        <div className="lg:hidden flex items-center border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("texte")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "texte"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Copie ({motsCount} mots)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("diagnostic")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "diagnostic"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="size-3.5" />
            <span>2. Diagnostic ({score}%)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left: Input Textarea */}
            <div
              className={`lg:col-span-7 space-y-3 flex flex-col ${
                mobileTab === "texte" ? "flex" : "hidden lg:flex"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">
                  Collez votre texte de dissertation ou d&apos;analyse :
                </span>
                <span className="text-slate-400 font-mono">{motsCount} mots</span>
              </div>
              <textarea
                value={texteCopie}
                onChange={(e) => setTexteCopie(e.target.value)}
                placeholder="Collez ici votre paragraphe rédigé... Le scanner détectera instantanément les pièges de psychologisation managériale et vérifiera la présence des auteurs canoniques."
                rows={12}
                className="w-full flex-1 min-h-[260px] p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-rose-500 font-sans leading-relaxed resize-none scrollbar-thin"
              />
            </div>

            {/* Right: Real-Time Diagnostic Dashboard */}
            <div
              className={`lg:col-span-5 space-y-4 ${
                mobileTab === "diagnostic" ? "block" : "hidden lg:block"
              }`}
            >
              {/* Score Card */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Indice de Rigueur Académique
                  </span>
                  <span
                    className={`text-2xl font-bold font-mono ${
                      score >= 80 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {score}%
                  </span>
                </div>
                <div className="text-right text-xs">
                  <div className="text-slate-300 font-medium">
                    {piegesDetectes.length === 0 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>0 biais détecté</span>
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1 font-bold">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>{piegesDetectes.length} biais à corriger</span>
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400">
                    {auteursPresents.length} auteurs cités
                  </div>
                </div>
              </div>

              {/* Detected Pitfalls list */}
              {piegesDetectes.length > 0 && (
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  <span className="text-xs font-bold uppercase text-rose-400 tracking-wider block">
                    Pièges de Psychologisation Détectés :
                  </span>
                  {piegesDetectes.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>À bannir : « {p.termeDetecte} »</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-snug">
                        {p.explication}
                      </p>
                      <div className="pt-1 border-t border-rose-900/30 text-emerald-300 text-[11px]">
                        <strong>Remplacement CNAM :</strong> {p.remplacementRecommande}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Auteurs Scanner */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                  Auteurs Canoniques S1 Cités :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {auteursPresents.map((a) => (
                    <span
                      key={a.nom}
                      className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Check className="h-2.5 w-2.5" />
                      <span>{a.nom} ({a.ue})</span>
                    </span>
                  ))}
                  {auteursPresents.length === 0 && (
                    <span className="text-xs text-slate-500 italic">
                      Aucun auteur canonique du S1 détecté pour l&apos;instant.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
