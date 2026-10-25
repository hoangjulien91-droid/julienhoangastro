"use client";

import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  User,
  Quote,
  Tag,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SegmentExtrait {
  id: string;
  verbatim: string;
  bonneReponseConcept:
    | "hysteresis"
    | "sale_boulot"
    | "capital_institutionnalise"
    | "licence_mandat"
    | "illusio"
    | "professionnalisation";
  options: {
    id:
      | "hysteresis"
      | "sale_boulot"
      | "capital_institutionnalise"
      | "licence_mandat"
      | "illusio"
      | "professionnalisation";
    label: string;
    auteur: string;
  }[];
  explicationSociologique: string;
  phraseCommentaireCopie: string;
}

const SEGMENTS_RECIT_LAURENT: SegmentExtrait[] = [
  {
    id: "seg1",
    verbatim:
      "« J'ai passé 10 ans sur les chantiers comme électricien. Pour moi, le travail, c'était le bleu de chauffe, le cambouis et les mains calleuses. Quand je me suis retrouvé dans un bureau climatisé du siège à assister à des comités de direction, je me sentais coupable et illégitime, comme si j'étais un imposteur qui volait son salaire sans transpirer. »",
    bonneReponseConcept: "hysteresis",
    options: [
      { id: "hysteresis", label: "Hystérésis de l'Habitus", auteur: "Pierre Bourdieu" },
      { id: "sale_boulot", label: "Le 'Sale Boulot' (Dirty Work)", auteur: "Everett Hughes" },
      { id: "illusio", label: "L'Illusio", auteur: "Pierre Bourdieu" },
    ],
    explicationSociologique:
      "L'hystérésis de l'habitus désigne l'inertie des dispositions incorporées qui continuent d'appliquer les schémas mentaux du champ d'origine (la culture ouvrière du labeur physique) à un nouveau champ social (le travail intellectuel de bureau), générant un sentiment d'incongruité et d'imposture.",
    phraseCommentaireCopie:
      "Ce malaise biographique s'analyse à travers le concept bourdieusien d'hystérésis de l'habitus : les dispositions intériorisées dans le monde ouvrier heurtent les codes du nouveau champ tertiaire.",
  },
  {
    id: "seg2",
    verbatim:
      "« Quand les chefs avaient un entretien de recadrage difficile ou une annonce de refus d'augmentation à faire, ils me disaient : 'Laurent, toi qui es à l'écoute et qui prépares ton diplôme de psy, va leur parler en douceur pour calmer le jeu'. C'était à moi de nettoyer les dégâts relationnels qu'ils avaient créés. »",
    bonneReponseConcept: "sale_boulot",
    options: [
      { id: "sale_boulot", label: "Le 'Sale Boulot' (Dirty Work) délégué", auteur: "Everett Hughes" },
      { id: "licence_mandat", label: "Licence et Mandat", auteur: "Everett Hughes" },
      { id: "capital_institutionnalise", label: "Capital Institutionnalisé", auteur: "Pierre Bourdieu" },
    ],
    explicationSociologique:
      "Everett Hughes a conceptualisé le 'sale boulot' comme l'ensemble des tâches physiquement pénibles ou moralement dégradantes que les professionnels dominants délèguent volontiers à des subordonnés ou à des tiers tout en conservant les tâches prestigieuses.",
    phraseCommentaireCopie:
      "La direction délègue à l'intervenant ce que le sociologue Everett Hughes nomme le 'sale boulot' émotionnel, instrumentalisant la compétence d'écoute pour amortir les violences managériales.",
  },
  {
    id: "seg3",
    verbatim:
      "« Le jour où j'ai enfin reçu mon attestation d'enregistrement ADELI de psychologue et mon diplôme officiel du CNAM, mon regard sur moi a basculé. Je n'étais plus un bricoleur autodidacte qui donnait des conseils : j'avais un parchemin délivré par la République qui imposait le respect. »",
    bonneReponseConcept: "capital_institutionnalise",
    options: [
      { id: "capital_institutionnalise", label: "Capital Culturel Institutionnalisé", auteur: "Pierre Bourdieu" },
      { id: "hysteresis", label: "Hystérésis de l'Habitus", auteur: "Pierre Bourdieu" },
      { id: "professionnalisation", label: "Logique de Traduction", auteur: "Richard Wittorski" },
    ],
    explicationSociologique:
      "Pour Bourdieu, le capital culturel sous sa forme institutionnalisée (le diplôme d'État, le titre légal) confère une reconnaissance officielle et une valeur sur le marché du travail indépendante des propriétés physiques du porteur.",
    phraseCommentaireCopie:
      "L'obtention du titre RNCP illustre la conversion du savoir d'expérience en capital culturel institutionnalisé (Bourdieu), opérant un acte d'attribution étatique décisif pour l'identité pour autrui (Dubar).",
  },
  {
    id: "seg4",
    verbatim:
      "« Être psychologue du travail, ce n'est pas seulement avoir le droit légal de poser des diagnostics que personne d'autre ne peut contester : c'est porter la responsabilité morale d'expliquer à la direction comment le travail doit être organisé pour respecter la santé des êtres humains. »",
    bonneReponseConcept: "licence_mandat",
    options: [
      { id: "licence_mandat", label: "Licence et Mandat professionnel", auteur: "Everett Hughes" },
      { id: "illusio", label: "L'Illusio institutionnelle", auteur: "Pierre Bourdieu" },
      { id: "sale_boulot", label: "Le 'Sale Boulot'", auteur: "Everett Hughes" },
    ],
    explicationSociologique:
      "Hughes articule la 'Licence' (autorisation légale exclusive de pratiquer des actes réservés et confidentiels) et le 'Mandat' (légitimité morale et sociétale que le groupe professionnel s'arroge pour dicter ce qui est sain ou pathologique dans la société).",
    phraseCommentaireCopie:
      "Cette revendication traduit le double statut théorisé par Everett Hughes : la Licence (monopole technique des diagnostics) couplée à un Mandat moral et social sur l'organisation saine du travail.",
  },
];

export function AnnotateurRecitVie123() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSelectAnswer = (segmentId: string, conceptId: string) => {
    if (selectedAnswers[segmentId]) return;
    playClickSound();
    triggerHaptic();

    const segment = SEGMENTS_RECIT_LAURENT.find((s) => s.id === segmentId);
    const isCorrect = segment?.bonneReponseConcept === conceptId;

    if (isCorrect) {
      playSuccessSound();
      setScore((s) => s + 5);
    } else {
      playReviewSound();
    }

    setSelectedAnswers((prev) => ({ ...prev, [segmentId]: conceptId }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setScore(0);
    playClickSound();
    triggerHaptic();
  };

  const handleCopySynthesis = () => {
    const text = `SYNTHÈSE SOCIOLOGIQUE DU RÉCIT BIOGRAPHIQUE DE LAURENT (PST123)

1. L'hystérésis de l'habitus ouvrier (Pierre Bourdieu) :
${SEGMENTS_RECIT_LAURENT[0].phraseCommentaireCopie}

2. La délégation du « sale boulot » relationnel (Everett Hughes) :
${SEGMENTS_RECIT_LAURENT[1].phraseCommentaireCopie}

3. La légitimation par le capital institutionnalisé (Pierre Bourdieu) :
${SEGMENTS_RECIT_LAURENT[2].phraseCommentaireCopie}

4. La conquête de la Licence et du Mandat professionnel (Everett Hughes) :
${SEGMENTS_RECIT_LAURENT[3].phraseCommentaireCopie}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              <span>PST123 · Analyse Sociologique de Trajectoires</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              L&apos;Annotateur de Récits de Vie (Bourdieu &amp; Hughes)
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Analysez les bifurcations de carrière. Étiquetez chaque extrait de verbatim avec le concept sociologique exact attendu par <b>Élisabeth Lucy</b> (Hystérésis, Sale boulot, Licence/Mandat, Capital culturel).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySynthesis}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Synthèse copiée !" : "Copier la synthèse d'examen"}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Narrative segments list */}
      <div className="space-y-4">
        {SEGMENTS_RECIT_LAURENT.map((seg, idx) => {
          const userChoice = selectedAnswers[seg.id];
          const isAnswered = Boolean(userChoice);
          const isCorrect = userChoice === seg.bonneReponseConcept;

          return (
            <div
              key={seg.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                isAnswered
                  ? isCorrect
                    ? "bg-slate-900/90 border-emerald-500/40"
                    : "bg-slate-900/90 border-rose-500/40"
                  : "bg-slate-900/80 border-slate-800"
              }`}
            >
              {/* Segment Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-indigo-400">
                  Extrait n°{idx + 1} · Entretien Biographique
                </span>
                {isAnswered && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : <HelpCircle className="h-3.5 w-3.5" />}
                    <span>{isCorrect ? "Correct (+5 pts)" : "Concept erroné"}</span>
                  </span>
                )}
              </div>

              {/* Verbatim */}
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {seg.verbatim}
              </p>

              {/* Tagging choices */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                  Quel concept sociologique modélise ce passage ?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {seg.options.map((opt) => {
                    const isSelected = userChoice === opt.id;
                    const isOptCorrect = isAnswered && opt.id === seg.bonneReponseConcept;

                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswered}
                        onClick={() => handleSelectAnswer(seg.id, opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                          isOptCorrect
                            ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold"
                            : isSelected && !isCorrect
                            ? "bg-rose-950/40 border-rose-500 text-rose-200"
                            : isSelected
                            ? "bg-indigo-600 border-indigo-400 text-white font-bold"
                            : "bg-slate-950/60 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                        }`}
                      >
                        <span className="font-bold block leading-snug">{opt.label}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Auteur : {opt.auteur}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation upon answer */}
              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-800/30 text-xs space-y-1.5 animate-fadeIn">
                  <strong className="text-indigo-300 block">
                    Explication sociologique CNAM :
                  </strong>
                  <p className="text-slate-300">{seg.explicationSociologique}</p>
                  <p className="text-indigo-200 italic pt-1 border-t border-indigo-800/30">
                    Formulation d&apos;examen : « {seg.phraseCommentaireCopie} »
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
