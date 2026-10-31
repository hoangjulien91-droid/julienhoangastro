"use client";

import { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  FileSearch,
  Award,
  Wand2,
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
  remplacementDirect: string;
}

const PIEGES_PSYCHOLOGISATION: PiegeLangageItem[] = [
  {
    motifRegex: /résistance\s+au\s+changement/gi,
    termeDetecte: "Résistance au changement",
    explication:
      "Terme managérial condescendant qui disqualifie la parole des salariés. En ergonomie et clinique, le refus du changement est une défense légitime du métier.",
    remplacementRecommande:
      "« stratégie collective de préservation des règles de l'art et du travail bien fait » ou « attachement au genre professionnel »",
    remplacementDirect: "défense légitime du genre professionnel et des critères du travail bien fait",
  },
  {
    motifRegex: /manque\s+de\s+motivation|pas\s+motivé|démotivé/gi,
    termeDetecte: "Manque de motivation / Démotivé",
    explication:
      "Psychologisation individualisante qui masque les contraintes organisationnelles. On ne naît pas 'démotivé', on subit un empêchement d'agir.",
    remplacementRecommande:
      "« perte de sens consécutive au travail empêché » ou « amputation du pouvoir d'agir »",
    remplacementDirect: "perte de sens consécutive à l'activité empêchée et à l'amputation du pouvoir d'agir",
  },
  {
    motifRegex: /conflit\s+de\s+personnalité|problème\s+de\s+personne/gi,
    termeDetecte: "Conflit de personnalité",
    explication:
      "Réduit un dysfonctionnement organisationnel ou une divergence de critères de qualité à une incompatibilité d'humeur individuelle.",
    remplacementRecommande:
      "« controverse de métier non arbitrée » ou « divergence sur les critères de la qualité du travail »",
    remplacementDirect: "controverse de métier non arbitrée faute d'espaces de délibération",
  },
  {
    motifRegex: /gestion\s+du\s+stress|gérer\s+son\s+stress|salarié\s+stressé/gi,
    termeDetecte: "Gestion du stress / Salarié stressé",
    explication:
      "Le 'stress' est une notion biomédicale réductrice qui fait porter la responsabilité de l'adaptation au seul salarié.",
    remplacementRecommande:
      "« souffrance liée à la réduction des marges de manœuvre » ou « tension entre exigences prescrites et moyens alloués »",
    remplacementDirect: "souffrance pathogène liée au rétrécissement des marges de régulation opératoire",
  },
  {
    motifRegex: /erreur\s+humaine|faute\s+de\s+l'opérateur/gi,
    termeDetecte: "Erreur humaine / Faute de l'opérateur",
    explication:
      "L'ergonomie de Wisner et Leplat a démontré que l'erreur est le résultat d'un piège organisationnel ou d'un compromis opératoire sous forte variabilité.",
    remplacementRecommande:
      "« défaillance de la régulation face à la variabilité imprévue » ou « compromis opératoire dégradé »",
    remplacementDirect: "compromis opératoire dégradé face à la variabilité non anticipée par le prescrit",
  },
  {
    motifRegex: /burnout\s+individuel|fragilité\s+individuelle|personnalité\s+fragile/gi,
    termeDetecte: "Fragilité individuelle / Burnout individuel",
    explication:
      "Fait porter la responsabilité de la décompensation sur la psychologie intime du sujet plutôt que sur l'emprise gestionnaire.",
    remplacementRecommande:
      "« décompensation psychopathologique liée à l'effondrement des défenses collectives » (Dejours/Gaulejac)",
    remplacementDirect: "décompensation liée à l'effondrement des stratégies collectives de défense",
  },
  {
    motifRegex: /capital\s+humain|ressources\s+humaines/gi,
    termeDetecte: "Capital humain / Ressources humaines",
    explication:
      "Réification gestionnaire assimilant les sujets travaillants à un stock comptable ou une matière première consommable (Gaulejac).",
    remplacementRecommande:
      "« collectifs de travail » ou « sujets agissants porteurs de savoirs d'expérience »",
    remplacementDirect: "collectifs de travail porteurs de savoirs d'expérience",
  },
  {
    motifRegex: /savoir-être|savoir\s+être/gi,
    termeDetecte: "Savoir-être",
    explication:
      "Notion floue de sélection RH qui juge la conformité comportementale et sociale au lieu d'analyser les compétences incorporées dans l'activité réelle (Valls / IOD).",
    remplacementRecommande:
      "« compétences opératoires en situation réelle » ou « habiletés incorporées dans le métier »",
    remplacementDirect: "compétences opératoires situées dans l'activité réelle",
  },
  {
    motifRegex: /bonheur\s+au\s+travail|bienveillance\s+managériale/gi,
    termeDetecte: "Bonheur au travail / Bienveillance managériale",
    explication:
      "Injonction paradoxale qui occulte la réalité des rapports sociaux et la nécessité de débattre du travail réel.",
    remplacementRecommande:
      "« construction de la santé par le pouvoir d'agir et la reconnaissance du travail réel »",
    remplacementDirect: "construction de la santé par le développement du pouvoir d'agir",
  },
  {
    motifRegex: /absentéisme\s+de\s+confort/gi,
    termeDetecte: "Absentéisme de confort",
    explication:
      "Jugement moralisateur ignorant que le retrait est une ultime régulation d'autopréservation face à une organisation délétère.",
    remplacementRecommande:
      "« conduite de retrait défensif face à l'usure professionnelle et au travail empêché »",
    remplacementDirect: "conduite de retrait défensif face à l'usure et au travail empêché",
  },
];

const AUTEURS_CANONIQUES_S1 = [
  { nom: "Wisner", ue: "PST106" },
  { nom: "Leplat", ue: "PST106" },
  { nom: "Clot", ue: "PST106" },
  { nom: "Oddone", ue: "PST106" },
  { nom: "Canguilhem", ue: "PST106" },
  { nom: "Vygotski", ue: "PST106" },
  { nom: "Pacaud", ue: "PST106" },
  { nom: "Lahy", ue: "PST106" },
  { nom: "Faverge", ue: "PST106" },
  { nom: "Honneth", ue: "PST108" },
  { nom: "Dejours", ue: "PST108" },
  { nom: "Gaulejac", ue: "PST108" },
  { nom: "Enriquez", ue: "PST108" },
  { nom: "Kaës", ue: "PST108" },
  { nom: "Valls", ue: "PST108" },
  { nom: "Habermas", ue: "PST108" },
  { nom: "Bühler", ue: "PST108" },
  { nom: "Jakobson", ue: "PST108" },
  { nom: "Austin", ue: "PST108" },
  { nom: "Moscovici", ue: "PST108" },
  { nom: "Lewin", ue: "PST108" },
  { nom: "Dubar", ue: "PST123" },
  { nom: "Sainsaulieu", ue: "PST123" },
  { nom: "Bourdieu", ue: "PST123" },
  { nom: "Hughes", ue: "PST123" },
  { nom: "Wittorski", ue: "PST123" },
  { nom: "Goffman", ue: "PST123" },
  { nom: "Ombredane", ue: "PST120" },
  { nom: "Leontiev", ue: "PST120" },
  { nom: "Engeström", ue: "PST120" },
  { nom: "Pearson", ue: "PST124" },
  { nom: "Fisher", ue: "PST124" },
  { nom: "Cronbach", ue: "PST124" },
];

const EXEMPLE_PIEGE_RH = `Face à la réorganisation de l'atelier, on observe une forte résistance au changement et un manque de motivation chez plusieurs opérateurs. Certains présentent même une fragilité individuelle qui complique la gestion du stress au quotidien, provoquant un conflit de personnalité avec l'encadrement et des erreurs humaines répétées par défaut de savoir-être.`;

const EXEMPLE_MODELE_2020 = `Dans quelle mesure le déni gestionnaire de l'écart irréductible entre tâche prescrite et activité réelle condamne-t-il les opérateurs à une amputation de leur pouvoir d'agir ? Comme l'ont démontré Alain Wisner et Jacques Leplat, l'activité réelle ne se réduit jamais à l'exécution mécanique de la consigne : elle constitue un compromis opératoire permanent face à la variabilité technique et humaine du terrain. Or, lorsque l'idéologie gestionnaire décrite par Vincent de Gaulejac impose des cadences standardisées sans espace de délibération, le collectif de travail voit son genre professionnel (Yves Clot) s'étioler. Dès lors, ce que le management qualifie à tort de désengagement relève en réalité d'une activité empêchée et d'un déni de reconnaissance du jugement de beauté par les pairs (Christophe Dejours, Axel Honneth), engendrant une souffrance éthique majeure.`;

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
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Analyse psychologisation
  const piegesDetectes = PIEGES_PSYCHOLOGISATION.filter((p) => {
    const regex = new RegExp(p.motifRegex.source, "i");
    return regex.test(texteCopie);
  });

  // Analyse auteurs
  const auteursPresents = AUTEURS_CANONIQUES_S1.filter((a) =>
    new RegExp(`\\b${a.nom}\\b`, "i").test(texteCopie),
  );

  const motsCount = texteCopie.trim() ? texteCopie.trim().split(/\s+/).length : 0;

  // Calcul du Barème Cnam sur 20 points :
  // 1. Problématisation & connecteurs dialectiques (/4 pts)
  const hasQuestion = /\?|dans quelle mesure|en quoi|comment expliquer/i.test(texteCopie);
  const hasDialectique = /\b(or|cependant|toutefois|néanmoins|dès lors|paradoxe|tension|tandis que)\b/i.test(texteCopie);
  const ptsProblematisation = !texteCopie.trim()
    ? 0
    : (hasQuestion ? 2.5 : 1) + (hasDialectique ? 1.5 : 0);

  // 2. Rigueur Conceptuelle & Auteurs (/8 pts)
  const ptsAuteurs = !texteCopie.trim()
    ? 0
    : Math.min(8, auteursPresents.length * 2.5 + (motsCount >= 50 ? 0.5 : 0));

  // 3. Ancrage Clinique & Travail Réel (/5 pts)
  const termesCliniques = [
    "prescrit",
    "réel",
    "activité",
    "opérateur",
    "collectif",
    "genre",
    "compromis",
    "reconnaissance",
    "pouvoir d'agir",
    "terrain",
    "marge",
    "régulation",
  ].filter((t) => new RegExp(t, "i").test(texteCopie));
  const ptsClinique = !texteCopie.trim()
    ? 0
    : Math.min(5, Math.round(termesCliniques.length * 1.25 * 2) / 2);

  // 4. Posture Anti-Psychologisation (/3 pts)
  const ptsPosture = !texteCopie.trim()
    ? 0
    : Math.max(0, 3 - piegesDetectes.length * 1.5);

  const noteSur20 = Math.min(
    20,
    Math.round((ptsProblematisation + ptsAuteurs + ptsClinique + ptsPosture) * 2) / 2,
  );

  // Score académique global (/100)
  let score = 100;
  score -= piegesDetectes.length * 15;
  score = Math.max(0, score);

  const handleReplaceSingleTrap = (piege: PiegeLangageItem) => {
    const regex = new RegExp(piege.motifRegex.source, "gi");
    setTexteCopie((prev) => prev.replace(regex, piege.remplacementDirect));
    playSuccessSound();
    triggerHaptic();
  };

  const handleReplaceAllTraps = () => {
    let next = texteCopie;
    PIEGES_PSYCHOLOGISATION.forEach((p) => {
      const regex = new RegExp(p.motifRegex.source, "gi");
      next = next.replace(regex, p.remplacementDirect);
    });
    setTexteCopie(next);
    playSuccessSound();
    triggerHaptic();
  };

  const handleCopyText = () => {
    if (!texteCopie.trim()) return;
    navigator.clipboard.writeText(texteCopie);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Correcteur de Copie CNAM — Barème et Anti-Psychologisation"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-rose-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-rose-500/15 dark:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <FileSearch className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 truncate">
                  Scanner Anti-Psychologisation
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Contrôle Qualité
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Correcteur Stylistique &amp; Biais RH
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Mobile View Switcher */}
        <div className="lg:hidden flex items-center border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("texte")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "texte"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Copie ({motsCount} mots)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("diagnostic")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "diagnostic"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Award className="size-3.5" />
            <span>2. Barème ({noteSur20}/20)</span>
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
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Collez votre texte de dissertation ou d&apos;analyse :
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setTexteCopie(EXEMPLE_PIEGE_RH);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-[11px] font-bold transition-colors cursor-pointer"
                    title="Charger un exemple de copie contenant des biais RH à corriger"
                  >
                    Tester brouillon piégé
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTexteCopie(EXEMPLE_MODELE_2020);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Charger un exemple de paragraphe calibré 20/20 au barème CNAM"
                  >
                    <Sparkles className="size-3" />
                    <span>Modèle 20/20</span>
                  </button>
                  {texteCopie.trim() && (
                    <>
                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="px-2 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                        <span>{copied ? "Copié" : "Copier"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTexteCopie("");
                          playClickSound();
                        }}
                        className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title="Effacer le texte"
                      >
                        <RotateCcw className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <textarea
                value={texteCopie}
                onChange={(e) => setTexteCopie(e.target.value)}
                placeholder="Collez ici votre paragraphe rédigé (ou cliquez sur « Tester brouillon piégé » ou « Modèle 20/20 » ci-dessus)... Le scanner évalue votre copie sur 20 selon les 4 critères du jury CNAM et remplace en 1 clic les biais managériaux."
                rows={13}
                className="w-full flex-1 min-h-[280px] p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-rose-500 font-sans leading-relaxed resize-none scrollbar-thin"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Volume analysé : <strong className="font-mono text-slate-700 dark:text-slate-200">{motsCount} mots</strong></span>
                <span>Auteurs détectés : <strong className="font-mono text-emerald-600 dark:text-emerald-400">{auteursPresents.length}</strong></span>
              </div>
            </div>

            {/* Right: Real-Time Diagnostic Dashboard */}
            <div
              className={`lg:col-span-5 space-y-4 ${
                mobileTab === "diagnostic" ? "block" : "hidden lg:block"
              }`}
            >
              {/* Simulated CNAM Rubric Card (/20) */}
              <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
                      Simulateur Barème Jury CNAM
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span
                        className={`text-2xl sm:text-3xl font-black font-mono ${
                          noteSur20 >= 15
                            ? "text-emerald-600 dark:text-emerald-400"
                            : noteSur20 >= 10
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {noteSur20} / 20
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        (Rigueur : {score}%)
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    {piegesDetectes.length === 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>0 biais RH</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold text-[11px]">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>{piegesDetectes.length} biais RH</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 4 Criteria Breakdown */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px]">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>1. Problématisation</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{ptsProblematisation}/4</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 transition-all"
                        style={{ width: `${(ptsProblematisation / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>2. Auteurs &amp; Concepts</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">{ptsAuteurs}/8</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{ width: `${(ptsAuteurs / 8) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>3. Ancrage Clinique</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400">{ptsClinique}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all"
                        style={{ width: `${(ptsClinique / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>4. Posture Anti-RH</span>
                      <span className="font-mono text-rose-600 dark:text-rose-400">{ptsPosture}/3</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-rose-500 transition-all"
                        style={{ width: `${(ptsPosture / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detected Pitfalls list */}
              {piegesDetectes.length > 0 && (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                      Pièges de Psychologisation ({piegesDetectes.length}) :
                    </span>
                    <button
                      type="button"
                      onClick={handleReplaceAllTraps}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      <Wand2 className="size-3" />
                      <span>Tout corriger en 1 clic</span>
                    </button>
                  </div>
                  {piegesDetectes.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-50/90 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-bold">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                          <span>À bannir : « {p.termeDetecte} »</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleReplaceSingleTrap(p)}
                          className="px-2 py-0.5 rounded-md bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                        >
                          <Wand2 className="size-2.5" />
                          <span>Remplacer</span>
                        </button>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-snug">
                        {p.explication}
                      </p>
                      <div className="pt-1 border-t border-rose-200/80 dark:border-rose-900/30 text-emerald-700 dark:text-emerald-300 text-[11px]">
                        <strong>Remplacement CNAM :</strong> {p.remplacementRecommande}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Auteurs Scanner */}
              <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
                  Auteurs Canoniques Cités ({auteursPresents.length}) :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {auteursPresents.map((a) => (
                    <span
                      key={a.nom}
                      className="px-2 py-0.5 rounded bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1"
                    >
                      <Check className="h-2.5 w-2.5" />
                      <span>{a.nom} ({a.ue})</span>
                    </span>
                  ))}
                  {auteursPresents.length === 0 && (
                    <span className="text-xs text-slate-500 italic">
                      Aucun auteur canonique détecté (ex: Clot, Wisner, Leplat, Dejours, Honneth, Dubar, Sainsaulieu, Lhuilier, Daniellou...).
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
