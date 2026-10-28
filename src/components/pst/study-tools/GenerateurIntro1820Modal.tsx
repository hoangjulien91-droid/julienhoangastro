"use client";

import { useState } from "react";
import {
  X,
  FileSignature,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Eye,
  PenTool,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SujetIntroPrecharge {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "transversal";
  titre: string;
  enonce: string;
  accrocheExemple: string;
  definitionsExemple: string;
  paradoxeExemple: string;
  problematiqueExemple: string;
  annoncePlanExemple: string;
}

const SUJETS_INTRO_BANQUE: SujetIntroPrecharge[] = [
  {
    id: "s1",
    moduleKey: "pst106",
    titre: "Écart Tâche / Activité & Qualité du Travail",
    enonce:
      "« Si le travailleur se contentait d'appliquer les consignes prescrites, l'organisation s'effondrerait. » Analysez les fonctions psychologiques et productives de l'écart entre le travail prescrit et le travail réel.",
    accrocheExemple:
      "À l'heure où les démarches qualité et la traçabilité algorithmique prétendent normer le moindre geste productif, les dysfonctionnements quotidiens rappellent l'illusion d'une maîtrise absolue de l'organisation sur le vivant du travail.",
    definitionsExemple:
      "Alain Wisner a fondé l'analyse ergonomique sur la distinction cardinale entre la 'tâche prescrite' (l'ensemble des buts, cadences et procédures fixés par l'entreprise) et l'activité réelle' (l'engagement cognitif, corporel et subjectif de l'opérateur pour accomplir cette tâche face aux aléas).",
    paradoxeExemple:
      "Dès lors surgit un paradoxe fécond : alors que le management perçoit souvent l'écart à la consigne comme une anomalie ou une faute à corriger, l'observation montre que cet écart est la condition sine qua non de la réussite productive et de la préservation de la santé mentale de l'opérateur.",
    problematiqueExemple:
      "Dans quelle mesure l'écart irréductible entre prescrit et réel constitue-t-il non un défaut de conformité, mais le lieu même où se fabriquent simultanément l'ingéniosité productive et le pouvoir d'agir des travailleurs ?",
    annoncePlanExemple:
      "Nous analyserons dans un premier temps l'écart prescrit/réel comme un compromis opératoire indispensable à la régulation productive (Leplat & Hoc, Wisner). Puis, nous démontrerons dans un second temps que le déni gestionnaire de cet écart contrarie l'activité et détruit la ressource vitale du genre professionnel (Clot).",
  },
  {
    id: "s2",
    moduleKey: "pst108",
    titre: "Reconnaissance et Mépris Social au Travail",
    enonce:
      "En quoi le déni de reconnaissance dans les organisations modernes constitue-t-il une atteinte à l'intégrité psychique des salariés ?",
    accrocheExemple:
      "L'intensification du travail contemporain et la démultiplication des métriques de performance s'accompagnent paradoxalement d'un sentiment diffus mais grandissant d'invisibilisation chez les professionnels de tous secteurs.",
    definitionsExemple:
      "Pour Axel Honneth, la reconnaissance n'est pas une simple flatterie individuelle, mais une exigence morale et intersubjective conditionnant la dignité du sujet à travers les sphères de l'amour, du droit et de l'estime sociale. Christophe Dejours en précise la double valence opératoire : le jugement d'utilité (hiérarchique) et le jugement de beauté (pairs).",
    paradoxeExemple:
      "Le paradoxe des organisations gestionnaires actuelles réside dans leur injonction permanente à 'l'implication totale' des salariés, alors même que les mécanismes de reporting chiffré dénient la réalité humaine des arbitrages consentis.",
    problematiqueExemple:
      "Comment le déni de reconnaissance de l'apport subjectif bascule-t-il en mépris social destructeur de l'estime de soi, contraignant les collectifs à forger des défenses psychiques au prix de leur propre santé ?",
    annoncePlanExemple:
      "Nous étudierons d'abord la dynamique intersubjective de la reconnaissance comme socle de l'identité et de la sublimation (Honneth, Dejours). Nous mettrons ensuite en évidence comment l'idéologie gestionnaire fabrique une souffrance éthique que les collectifs tentent d'endiguer par des pactes dénégatifs (Gaulejac, Kaës).",
  },
  {
    id: "s3",
    moduleKey: "pst123",
    titre: "Double Transaction Identitaire & Modèles de Pouvoir",
    enonce:
      "« L'identité au travail n'est jamais donnée d'emblée, elle se négocie dans l'épreuve des relations de pouvoir. » Discutez cette affirmation à partir des apports de Dubar et de Sainsaulieu.",
    accrocheExemple:
      "La précarisation des statuts, les restructurations à répétition et l'automatisation des métiers bousculent en profondeur les repères séculaires qui permettaient aux individus de répondre avec certitude à la question 'qui suis-je professionnellement ?'.",
    definitionsExemple:
      "Claude Dubar conçoit l'identité comme le produit d'une double transaction : biographique (pour soi dans le temps) et relationnelle (pour autrui dans l'espace des institutions). Renaud Sainsaulieu démontre pour sa part que l'entreprise est un lieu d'apprentissage culturel où l'identité se forge selon l'accès réel au pouvoir sur le poste.",
    paradoxeExemple:
      "La tension centrale tient à ce que l'institution prétend assigner des identités statutaires unilatérales, alors que les acteurs sociaux ne cessent de subvertir ou de négocier ces étiquettes à travers leurs actes d'appartenance et leurs solidarités d'atelier.",
    problematiqueExemple:
      "En quoi la construction de l'identité professionnelle résulte-t-elle d'un arbitrage permanent entre la fidélité à son histoire personnelle et l'épreuve des rapports de force organisationnels ?",
    annoncePlanExemple:
      "Nous analyserons en premier lieu la matrice de la double transaction de Dubar articulant revendications pour soi et attributions institutionnelles. Nous verrons en second lieu comment Sainsaulieu décline cette dialectique en 4 modèles culturels de pouvoir au travail.",
  },
];

interface GenerateurIntro1820ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "transversal";
}

export function GenerateurIntro1820Modal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: GenerateurIntro1820ModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(SUJETS_INTRO_BANQUE[0].id);

  // Intro parts state
  const [accroche, setAccroche] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [paradoxe, setParadoxe] = useState("");
  const [problematique, setProblematique] = useState("");
  const [annoncePlan, setAnnoncePlan] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  if (!isOpen) return null;

  const currentSujet =
    SUJETS_INTRO_BANQUE.find((s) => s.id === selectedSujetId) ?? SUJETS_INTRO_BANQUE[0];

  const handleLoadTemplate = (s: SujetIntroPrecharge) => {
    setSelectedSujetId(s.id);
    setAccroche(s.accrocheExemple);
    setDefinitions(s.definitionsExemple);
    setParadoxe(s.paradoxeExemple);
    setProblematique(s.problematiqueExemple);
    setAnnoncePlan(s.annoncePlanExemple);
    playSuccessSound();
    triggerHaptic();
  };

  const handleClear = () => {
    setAccroche("");
    setDefinitions("");
    setParadoxe("");
    setProblematique("");
    setAnnoncePlan("");
    playClickSound();
    triggerHaptic();
  };

  const fullIntroduction = [
    accroche.trim(),
    definitions.trim(),
    paradoxe.trim(),
    problematique.trim(),
    annoncePlan.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const wordCount = fullIntroduction.trim()
    ? fullIntroduction.trim().split(/\s+/).length
    : 0;

  // Checklist score (/5)
  const scoreIntro =
    (accroche.trim() ? 1 : 0) +
    (definitions.trim() ? 1 : 0) +
    (paradoxe.trim() ? 1 : 0) +
    (problematique.trim() ? 1 : 0) +
    (annoncePlan.trim() ? 1 : 0);

  const handleCopyIntro = () => {
    navigator.clipboard.writeText(fullIntroduction);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Générateur d'Introduction Parfaite 18/20"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:px-6 sm:py-4 border-b border-slate-800 bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <FileSignature className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-400 truncate">
                  <span className="hidden sm:inline">Méthodologie CNAM · </span>Titre Psycho. du Travail
                </span>
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium shrink-0">
                  5 Temps
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white truncate m-0">
                <span>Générateur d&apos;Intro 18/20</span>
                <span className="hidden sm:inline">&amp; Problématiques</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Fermer"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Sujet selector bank */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Sujets d&apos;annales modèles 18/20 :
              </span>
              <button
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Effacer</span>
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap pb-1">
              {SUJETS_INTRO_BANQUE.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleLoadTemplate(s)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                    s.id === selectedSujetId
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-xs"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase font-bold mr-1 opacity-80">{s.moduleKey.toUpperCase()}</span>
                  <span>{s.titre}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] sm:text-xs text-indigo-300 italic pt-0.5 m-0 leading-relaxed">
              Énoncé : « {currentSujet.enonce} »
            </p>
          </div>

          {/* Mobile-Only Tab Switcher: Formulaire vs Rendu Final */}
          <div className="flex lg:hidden items-center p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === "form"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>1. Saisie (5 étapes)</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === "preview"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="size-3.5" />
              <span>2. Aperçu 18/20 ({scoreIntro}/5)</span>
            </button>
          </div>

          {/* 5-Step Inputs Form & Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            <div className={`lg:col-span-7 space-y-3.5 sm:space-y-4 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
              {/* Step 1 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[11px]">1</span>
                    1. Accroche Contextuelle (Mutations du travail)
                  </label>
                  <span className="text-[10px] text-slate-500">2-3 phrases</span>
                </div>
                <textarea
                  value={accroche}
                  onChange={(e) => setAccroche(e.target.value)}
                  placeholder="Situez le sujet dans l'actualité des organisations du travail..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Step 2 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[11px]">2</span>
                    2. Définitions Conceptuelles &amp; Auteurs de référence
                  </label>
                  <span className="text-[10px] text-slate-500">Définir les 2 notions clés</span>
                </div>
                <textarea
                  value={definitions}
                  onChange={(e) => setDefinitions(e.target.value)}
                  placeholder="Définissez les termes du sujet avec leurs auteurs canoniques..."
                  rows={3}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Step 3 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px]">3</span>
                    3. La Tension / Le Paradoxe Clinique
                  </label>
                  <span className="text-[10px] text-amber-400 font-semibold">Le nœud du problème</span>
                </div>
                <textarea
                  value={paradoxe}
                  onChange={(e) => setParadoxe(e.target.value)}
                  placeholder="Pourquoi y a-t-il tension ou contradiction apparente ?"
                  rows={2}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Step 4 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[11px]">4</span>
                    4. La Problématique Centrale
                  </label>
                  <span className="text-[10px] text-purple-400 font-semibold">Une seule phrase interrogative</span>
                </div>
                <textarea
                  value={problematique}
                  onChange={(e) => setProblematique(e.target.value)}
                  placeholder="En quoi... ? Dans quelle mesure... ?"
                  rows={2}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Step 5 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">5</span>
                    5. Annonce du Plan Dialectique (I &amp; II)
                  </label>
                  <span className="text-[10px] text-emerald-400 font-semibold">I. Thèse ➔ II. Dépassement</span>
                </div>
                <textarea
                  value={annoncePlan}
                  onChange={(e) => setAnnoncePlan(e.target.value)}
                  placeholder="Nous verrons d'abord que... puis nous démontrerons que..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Live Preview Panel */}
            <div className={`lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 ${mobileTab === "form" ? "hidden lg:flex" : "flex"}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">Rendu Final pour la Copie</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {wordCount} mots · Score : {scoreIntro}/5
                  </span>
                </div>

                {/* Score bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${(scoreIntro / 5) * 100}%` }}
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-200 font-serif leading-relaxed max-h-[380px] overflow-y-auto whitespace-pre-wrap scrollbar-thin">
                  {fullIntroduction || (
                    <span className="text-slate-500 italic">
                      Remplissez les étapes à gauche ou chargez un sujet modèle pour voir l&apos;introduction complète s&apos;assembler...
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Recommandé : 250 à 400 mots
                </span>
                <button
                  disabled={!fullIntroduction.trim()}
                  onClick={handleCopyIntro}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    fullIntroduction.trim()
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/40"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Introduction copiée !" : "Copier l'introduction"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
