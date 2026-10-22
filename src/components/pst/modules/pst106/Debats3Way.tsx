"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Scale,
  ChevronDown,
  ChevronUp,
  Check,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";

interface Author {
  name: string;
  tag: string;
  color: string;
  body: string;
}
interface DebatAxis {
  axis: string;
  title: string;
  intro: string;
  authors: Author[];
  synthesis: string;
}

const AXES: DebatAxis[] = [
  {
    axis: "Axe 1",
    title: "Le Statut de l'Activité : Tâche vs Activité",
    intro:
      "Comment chaque courant définit-il et étudie-t-il l'activité humaine en situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Tâche vs Activité",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'écart régulateur</strong>. L'ergonomie distingue la tâche (les consignes organisationnelles) de l'activité réelle (l'adaptation cognitive et corporelle de l'opérateur pour gérer les aléas).",
      },
      {
        name: "Clot",
        tag: "Le Réel de l'Activité",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>Le possible et l'empêché</strong>. L'activité dépasse ce qui s'observe (l'activité réalisée). Elle inclut le réel de l'activité : ce qui aurait pu être fait, le suspendu, le contrarié, le conflictuel.",
      },
      {
        name: "Dejours",
        tag: "L'Épreuve du Réel",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La résistance de la matière</strong>. Le réel est ce qui résiste à la prescription de l'organisation. Travailler, c'est buter sur cette résistance et faire preuve d'intelligence pratique pour la surmonter.",
      },
    ],
    synthesis:
      "Tous trois s'accordent sur le fait que la prescription organisationnelle est structurellement insuffisante pour accomplir le travail. <strong>Exemple à placer :</strong> les régulations informelles des opérateurs face aux pannes ou aux fluctuations de matières (Wisner), ou le conflit intérieur face à une consigne absurde (Clot).",
  },
  {
    axis: "Axe 2",
    title: "La Santé au Travail : Prévention vs Pouvoir d'agir",
    intro:
      "Quelle est la source de la souffrance au travail et comment préserver ou construire la santé des sujets ?",
    authors: [
      {
        name: "Wisner",
        tag: "Prévention physique & cognitive",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'ergonomie des postes</strong>. La souffrance provient d'une inadéquation physique ou d'une surcharge mentale. On prévient la fatigue et les TMS en adaptant ergonomiquement l'environnement technique.",
      },
      {
        name: "Clot",
        tag: "Pouvoir d'agir & Activité empêchée",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>L'amputation subjective</strong>. La souffrance naît de l'activité empêchée (vouloir bien faire son travail sans en avoir les moyens ou le droit). La santé est le développement du pouvoir d'agir sur son milieu.",
      },
      {
        name: "Dejours",
        tag: "Souffrance, Défenses & Reconnaissance",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La dynamique psychique</strong>. La confrontation au réel génère inévitablement de la souffrance. Elle est compensée par des stratégies de défense (idéologies collectives) et sublimée en plaisir par la reconnaissance.",
      },
    ],
    synthesis:
      "Opposez l'approche défensive de Dejours (comment le psychisme tolère la souffrance) à l'approche transformatrice de Clot (comment restaurer l'action sur le milieu de travail). <strong>Exemple :</strong> le port du casque détourné comme idéologie virile (Dejours) contre le débat sur la qualité empêchée du geste de sécurité (Clot).",
  },
  {
    axis: "Axe 3",
    title: "Le Collectif de travail : Coordination vs Règles de métier",
    intro:
      "Quel est le statut et la fonction du collectif de travail dans la situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Coordination opérationnelle",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>Le collectif fonctionnel</strong>. Le collectif est analysé sous l'angle des flux de communication et de la répartition technique des tâches pour assurer la fluidité de la production et pallier les pannes.",
      },
      {
        name: "Clot",
        tag: "Le Genre Professionnel",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>L'instrument psychologique</strong>. Le collectif est dépositaire du genre professionnel (la mémoire impersonnelle du métier). Il sert de bouclier et de ressource au sujet pour inventer son style sans s'épuiser.",
      },
      {
        name: "Dejours",
        tag: "Espace de délibération",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>L'éthique et les pairs</strong>. Le collectif est le garant des règles de l'art. C'est l'instance qui valide le travail de chacun à travers le jugement de beauté, base indispensable de la reconnaissance.",
      },
    ],
    synthesis:
      "Pour Wisner, le collectif est un rouage opérationnel ; pour Clot, un outil de régulation du métier (mémoire vivante) ; pour Dejours, un espace de jugement éthique et esthétique sans lequel la santé mentale s'effondre. <strong>Exemple :</strong> la pause-café comme lieu de reconstruction des règles de métier (Clot) ou d'élaboration des peurs collectives (Dejours).",
  },
  {
    axis: "Axe 4",
    title: "La Reconnaissance : Feedback opératoire vs Jugement d'utilité",
    intro:
      "Comment la reconnaissance au travail intervient-elle dans la construction de l'identité et de l'efficacité ?",
    authors: [
      {
        name: "Wisner",
        tag: "Feedback des résultats",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>La boucle de rétroaction</strong>. L'opérateur a besoin d'informations claires sur les effets de son action pour réguler son activité et adapter sa charge de travail.",
      },
      {
        name: "Clot",
        tag: "Reconnaissance du travail bien fait",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>Le jugement par le travail</strong>. On ne reconnaît pas une personne dans le vide, on reconnaît la qualité de son travail. Quand le débat sur le travail bien fait est étouffé, la reconnaissance individuelle est une imposture.",
      },
      {
        name: "Dejours",
        tag: "Jugements d'utilité et de beauté",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>Les deux piliers</strong>. Le jugement d'utilité (hiérarchie/clients) confère une utilité sociale ; le jugement de beauté (pairs) valide la conformité aux règles de l'art. Tous deux sont indispensables.",
      },
    ],
    synthesis:
      "Dejours théorise le mécanisme psychologique précis de la reconnaissance (utilité + beauté). Clot insiste sur le fait que la reconnaissance doit porter sur l'activité réelle et la qualité disputée, non sur la personne elle-même. <strong>Exemple :</strong> le compliment managérial superficiel qui offense l'opérateur parce qu'il sait que le produit est bâclé (Clot).",
  },
  {
    axis: "Axe 5",
    title: "La Méthode d'Intervention : Observation vs Confrontation",
    intro:
      "Comment le praticien-chercheur intervient-il sur le terrain et quelle est sa posture clinique ?",
    authors: [
      {
        name: "Wisner",
        tag: "Observation systématique",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'analyse ergonomique</strong>. Observations directes, chronométrages, entretiens avec verbalisations simultanées ou consécutives pour identifier les contraintes et réaménager le poste.",
      },
      {
        name: "Clot",
        tag: "Autoconfrontations croisées",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>La clinique de l'activité</strong>. Utilisation de la vidéo : le sujet commente son activité avec le chercheur (simple), puis avec un pair (croisée) pour relancer la controverse professionnelle et régénérer le genre.",
      },
      {
        name: "Dejours",
        tag: "Espace de parole clinique",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La psychodynamique du travail</strong>. Dispositif de parole collective volontaire, sécurisé et confidentiel. Le chercheur aide le groupe à élaborer sa souffrance et à faire émerger ce qui ne se dit pas.",
      },
    ],
    synthesis:
      "Wisner observe pour adapter techniquement ; Clot filme pour faire débattre les travailleurs entre eux sur leur métier ; Dejours écoute en collectif pour faire parler ce qui est refoulé par les défenses. <strong>Exemple :</strong> l'évaluation d'un accident du travail sous l'angle du défaut de conception (Wisner), de la controverse sur le bon geste de sécurité (Clot), ou du déni du danger par une idéologie virile (Dejours).",
  },
];

const GLOSSAIRE = [
  {
    term: "Ergonomie de l'activité (Alain Wisner)",
    def: "Courant né dans les années 1960 au Cnam. Postulat : l'opérateur n'est pas un exécutant passif mais un régulateur actif face aux écarts entre prescription (tâche) et réalité (activité). Vise la transformation technique et organisationnelle des postes pour préserver la santé et l'efficacité.",
  },
  {
    term: "Clinique de l'activité (Yves Clot)",
    def: "Courant fondé au Cnam dans les années 1990 dans la filiation vygotskienne. Postulat : l'activité humaine est habitée par le « réel de l'activité » (ce qu'on ne fait pas, ce qu'on voudrait faire). Vise le développement du pouvoir d'agir par la controverse professionnelle et la revitalisation du genre de métier.",
  },
  {
    term: "Psychodynamique du travail (Christophe Dejours)",
    def: "Courant né à la fin des années 1970 au Cnam. Postulat : le travail confronte le sujet à la résistance du réel, source de souffrance. Pour y faire face, les opérateurs déploient des stratégies de défense individuelles et collectives. La reconnaissance par les pairs et la hiérarchie permet de sublimer la souffrance en plaisir.",
  },
];

interface Debats3WayProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Debats3Way({ store, onStoreChange }: Debats3WayProps) {
  const [glossaireOpen, setGlossaireOpen] = useState(false);
  const state = store.getDebats();
  const total = AXES.length;
  const active = AXES.filter((_, i) => !!state[i]).length;
  const pct = total ? Math.round((100 * active) / total) : 0;

  function toggle(i: number) {
    const nextVal = !state[i];
    store.setDebat(i, nextVal);
    if (nextVal) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playClickSound();
      triggerHaptic("selection");
    }
    onStoreChange();
  }

  return (
    <div className="space-y-5">
      <p className="hint">
        Les 5 grands débats transversaux de la discipline pour prendre de la
        hauteur et structurer tes comparaisons de synthèse à l&apos;examen.
        Chaque axe te donne une grille de lecture prête à l&apos;emploi.
      </p>

      {/* Progress Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Débats de Synthèse Maîtrisés</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {active} / {total} ({pct}%)
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Theoretical Context Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
          <Layers className="size-3 text-amber-600 dark:text-amber-400" />
          <span>Pourquoi articuler ces 3 courants majeurs du Cnam ?</span>
        </span>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium m-0">
          La psychologie du travail et l&apos;ergonomie étudient comment le
          travail réel façonne l&apos;activité humaine et comment préserver la
          santé des travailleurs tout en maintenant l&apos;efficacité :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
            <span className="text-xs font-bold font-mono text-sky-800 dark:text-sky-300 block">
              Wisner (Ergonomie)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Adaptation physique et cognitive des situations (Tâche vs
              Activité).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 block">
              Clot (Clinique)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Développement du pouvoir d&apos;agir et du métier (Genre vs
              Style).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
            <span className="text-xs font-bold font-mono text-purple-800 dark:text-purple-300 block">
              Dejours (Psychodynamique)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Élaboration de la souffrance et reconnaissance (Plaisir vs
              Souffrance).
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <b className="text-slate-900 dark:text-slate-100">
            Ce qu&apos;ils partagent tous les trois :
          </b>{" "}
          ils reconnaissent le primat de l&apos;activité réelle, refusent de
          traiter le travailleur comme une simple machine réflexe, et lient
          indissociablement le travail à la santé.
        </div>
      </div>

      {/* Glossaire Accordion Card */}
      <div className="p-4 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            setGlossaireOpen((o) => !o);
          }}
          className="w-full flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none py-1"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="size-4 text-indigo-500" />
            <span>Glossaire synthétique des 3 grands courants</span>
          </span>
          {glossaireOpen ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>

        {glossaireOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800 animate-fadeIn">
            {GLOSSAIRE.map((g) => (
              <div
                key={g.term}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
              >
                <span className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-400 block">
                  {g.term}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
                  {g.def}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5 Axes Cards */}
      <div className="space-y-4">
        {AXES.map((axe, i) => {
          const isMastered = !!state[i];
          return (
            <div
              key={i}
              className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border shadow-xs space-y-4 transition-all ${
                isMastered
                  ? "border-emerald-500/40 dark:border-emerald-500/30"
                  : "border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                    {axe.axis}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                    {axe.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                    isMastered
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  <Check className="size-3" />
                  <span>{isMastered ? "Maîtrisé" : "Marquer maîtrisé"}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
                {axe.intro}
              </p>

              {/* 3 Authors Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {axe.authors.map((a) => (
                  <div
                    key={a.name}
                    className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 border-l-4 space-y-1"
                    style={{ borderLeftColor: a.color }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: a.color }}
                      >
                        {a.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                        {a.tag}
                      </span>
                    </div>
                    <div
                      className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: a.body }}
                    />
                  </div>
                ))}
              </div>

              {/* Synthesis Key for exam */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="size-3 text-amber-600" />
                  <span>Clé de synthèse dialectique pour la copie Cnam</span>
                </span>
                <div
                  className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: axe.synthesis }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
