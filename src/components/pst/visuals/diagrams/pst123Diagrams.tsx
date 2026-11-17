"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Heart,
  Scale,
  Users,
  Compass,
  AlertOctagon,
  ChevronRight,
  BookOpen,
  Tag,
  ShieldCheck,
} from "lucide-react";

// =========================================================================
// 12. CARTOGRAPHIE LAGABRIELLE (PST106) : LES COURANTS DE LA PSYCHOLOGIE DU TRAVAIL
// =========================================================================
export function CartographieLagabrielleDiagram() {
  const [activeNode, setActiveNode] = useState<string>("activite");

  const nodes: Record<
    string,
    {
      titre: string;
      auteur: string;
      desc: string;
      role: string;
      containerClass: string;
      badgeClass: string;
    }
  > = {
    pto: {
      titre: "Psychologie du Travail & des Organisations (Champ Global)",
      auteur: "Approche générale (USA & Europe)",
      desc: "Champ très vaste englobant la sélection RH, le recrutement, l'évaluation des compétences, la psychologie cognitive, l'orientation professionnelle et l'ergonomie physique. Souvent orientée vers l'adaptation de l'opérateur aux besoins de performance de l'entreprise.",
      role: "Discipline englobante",
      containerClass:
        "bg-slate-50/90 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 shadow-xs",
      badgeClass:
        "bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
    },
    clinique: {
      titre: "La Clinique du Travail (Spécificité Francophone)",
      auteur: "Tradition Cnam & Université",
      desc: "Née après la Deuxième Guerre mondiale en rupture avec la psychotechnique positiviste. Postulat fondateur : le travail n'est pas un simple domaine d'application périphérique, mais un opérateur central de la santé mentale et du psychisme humain. Primauté accordée à la subjectivité.",
      role: "Sous-discipline clinique",
      containerClass:
        "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/60 shadow-xs",
      badgeClass:
        "bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60",
    },
    dejours: {
      titre: "Psychodynamique du Travail (PST120)",
      auteur: "Christophe Dejours (Chaire Cnam 1990-2009)",
      desc: "Focalisée sur l'analyse de la souffrance, du plaisir et des stratégies de défense (individuelles et collectives). Le travail est une épreuve du réel. La santé repose sur la reconnaissance par autrui via le jugement d'utilité (hiérarchie) et le jugement de beauté (pairs).",
      role: "Branche psychanalytique du travail",
      containerClass:
        "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 shadow-xs",
      badgeClass:
        "bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/60",
    },
    activite: {
      titre: "Clinique de l'Activité (PST106)",
      auteur: "Yves Clot / CRTD Cnam (Chaire Cnam 2000-2021)",
      desc: "Fondée sur la théorie historico-culturelle de Vygotski. Le travail n'est utile que s'il est un moyen d'agir sur le travail et de le transformer. Analyse du conflit entre l'activité réalisée et le réel de l'activité (le non-réalisé, l'empêché). Régénération du pouvoir d'agir par le genre professionnel et le style.",
      role: "Branche historico-culturelle de l'activité",
      containerClass:
        "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
      badgeClass:
        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
    },
  };

  const cur = nodes[activeNode] || nodes.activite;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 920 440"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {/* FOND GLOBAL : PSYCHOLOGIE DU TRAVAIL ET DES ORGANISATIONS */}
          <rect
            x="20"
            y="20"
            width="880"
            height="400"
            rx="20"
            className="fill-slate-900/60 stroke-slate-700/80 cursor-pointer transition-all hover:stroke-slate-500"
            strokeWidth={activeNode === "pto" ? "3" : "1.5"}
            strokeDasharray="6 4"
            onClick={() => setActiveNode("pto")}
          />
          <text
            x="50"
            y="55"
            className="fill-slate-300 font-bold text-sm tracking-wide"
          >
            1. PSYCHOLOGIE DU TRAVAIL ET DES ORGANISATIONS (CHAMP GLOBAL &amp; RH)
          </text>
          <text x="50" y="75" className="fill-slate-500 text-xs font-mono">
            Sélection · Ergonomie · Orientation · Compétences · Adaptation
          </text>

          {/* SOUS-ENSEMBLE : CLINIQUE DU TRAVAIL FRANCOPHONE */}
          <rect
            x="50"
            y="100"
            width="820"
            height="300"
            rx="16"
            className="fill-amber-950/20 stroke-amber-500/40 cursor-pointer transition-all hover:stroke-amber-400"
            strokeWidth={activeNode === "clinique" ? "3" : "2"}
            onClick={() => setActiveNode("clinique")}
          />
          <text
            x="80"
            y="135"
            className="fill-amber-300 font-bold text-sm tracking-wide"
          >
            2. LA CLINIQUE DU TRAVAIL (TRADITION CNAM &amp; UNIVERSITÉ)
          </text>
          <text x="80" y="155" className="fill-amber-200/70 text-xs">
            Le travail comme opérateur central du psychisme · Primauté de la subjectivité
          </text>

          {/* BLOC GAUCHE : PSYCHODYNAMIQUE DU TRAVAIL */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveNode("dejours")}
          >
            <rect
              x="80"
              y="180"
              width="360"
              height="200"
              rx="12"
              className={`fill-rose-950/40 stroke-rose-500 transition-all ${
                activeNode === "dejours" ? "stroke-[3px] shadow-lg" : "stroke-[1.5px]"
              }`}
            />
            <rect
              x="80"
              y="180"
              width="360"
              height="35"
              rx="12"
              className="fill-rose-900/60"
            />
            <text
              x="100"
              y="203"
              className="fill-rose-200 font-bold text-xs uppercase tracking-wider"
            >
              PSYCHODYNAMIQUE DU TRAVAIL
            </text>
            <text x="100" y="235" className="fill-white font-bold text-sm">
              Christophe DEJOURS
            </text>
            <text x="100" y="258" className="fill-rose-300 text-xs">
              • Épreuve du réel (souffrance ↔ plaisir)
            </text>
            <text x="100" y="280" className="fill-rose-300 text-xs">
              • Stratégies individuelles/collectives de défense
            </text>
            <text x="100" y="302" className="fill-rose-300 text-xs">
              • Jugement de beauté (pairs) &amp; d&apos;utilité (chef)
            </text>
            <text x="100" y="324" className="fill-rose-300 text-xs">
              • Référence à la psychanalyse et pulsion
            </text>
            <text
              x="100"
              y="355"
              className="fill-rose-400 font-mono text-[11px] font-bold"
            >
              Enseignement : PST120
            </text>
          </g>

          {/* FLÈCHE DIVERGENCE / DÉBAT ENTRE LES DEUX CLINIQUES */}
          <path
            d="M 450 280 L 470 280"
            className="stroke-amber-400 stroke-2"
            strokeDasharray="4 2"
          />
          <text
            x="460"
            y="270"
            textAnchor="middle"
            className="fill-amber-400 text-[10px] font-bold uppercase tracking-widest font-mono"
          >
            Débat
          </text>

          {/* BLOC DROIT : CLINIQUE DE L'ACTIVITÉ */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveNode("activite")}
          >
            <rect
              x="480"
              y="180"
              width="360"
              height="200"
              rx="12"
              className={`fill-emerald-950/40 stroke-emerald-500 transition-all ${
                activeNode === "activite" ? "stroke-[3px] shadow-lg" : "stroke-[1.5px]"
              }`}
            />
            <rect
              x="480"
              y="180"
              width="360"
              height="35"
              rx="12"
              className="fill-emerald-900/60"
            />
            <text
              x="500"
              y="203"
              className="fill-emerald-200 font-bold text-xs uppercase tracking-wider"
            >
              CLINIQUE DE L&apos;ACTIVITÉ
            </text>
            <text x="500" y="235" className="fill-white font-bold text-sm">
              Yves CLOT (CRTD Cnam)
            </text>
            <text x="500" y="258" className="fill-emerald-300 text-xs">
              • « Transformer pour comprendre »
            </text>
            <text x="500" y="280" className="fill-emerald-300 text-xs">
              • Le réel de l&apos;activité (activités empêchées)
            </text>
            <text x="500" y="302" className="fill-emerald-300 text-xs">
              • Genre professionnel &amp; Style personnel
            </text>
            <text x="500" y="324" className="fill-emerald-300 text-xs">
              • Traces vidéo, Autoconfrontation &amp; Pouvoir d&apos;agir
            </text>
            <text
              x="500"
              y="355"
              className="fill-emerald-400 font-mono text-[11px] font-bold"
            >
              Enseignement : PST106 (Pr. Lagabrielle)
            </text>
          </g>
        </svg>
      </div>

      {/* BANDEAU DÉTAIL DYNAMIQUE */}
      {cur && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2 transition-all ${cur.containerClass}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/5 dark:border-white/10">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
              {cur.titre}
            </h4>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shrink-0 ${cur.badgeClass}`}
            >
              <Compass className="size-3.5 shrink-0 opacity-80" />
              <span>
                {cur.role} · {cur.auteur}
              </span>
            </span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0">
            {cur.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 13. VYGOTSKI VS PIAGET (PST108) : TRAJECTOIRES DIVERGENTES DU LANGAGE & ZPD
// =========================================================================
export function VygotskiPiagetDiagram() {
  const [activeStep, setActiveStep] = useState<string>("zpd");

  const stepsInfo: Record<
    string,
    {
      titre: string;
      desc: string;
      formule: string;
      containerClass: string;
      badgeClass: string;
    }
  > = {
    piaget: {
      titre: "Trajectoire selon Jean Piaget (Constructivisme cognitif)",
      desc: "Pour Piaget, la pensée précède et gouverne le langage. L'enfant commence par une pensée autistique/égocentrique (incommunicable). Le langage égocentrique n'est qu'un accompagnement asocial de l'action. Il s'étiole et disparaît progressivement avec la socialisation et la décentration cognitive.",
      formule:
        "Pensée égocentrique ➔ Langage égocentrique (asocial, voué à disparaître) ➔ Langage socialisé",
      containerClass:
        "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/60 shadow-xs",
      badgeClass:
        "bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60",
    },
    vygotski: {
      titre: "Trajectoire selon Lev Vygotski (Théorie historico-culturelle)",
      desc: "Renversement complet : le langage est originellement social et relationnel. Face à un obstacle (ex. l'expérience des crayons de couleur), l'enfant extériorise sa pensée à voix haute pour résoudre le problème. Ce langage égocentrique ne disparaît JAMAIS : il s'intériorise pour devenir le langage intérieur (la pensée verbale silencieuse).",
      formule:
        "Langage social (relationnel) ➔ Langage égocentrique (outil de résolution) ➔ Langage intérieur (pensée)",
      containerClass:
        "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs",
      badgeClass:
        "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/60",
    },
    zpd: {
      titre: "La Zone Proximale de Développement (ZPD) de Vygotski",
      desc: "Écart fécond entre le niveau de développement actuel (ce que l'individu sait résoudre seul en autonomie) et le niveau de développement potentiel (ce qu'il peut accomplir guidé par un tuteur ou en coopération avec des pairs plus compétents). C'est le lieu même où opèrent les dispositifs cliniques au Cnam !",
      formule:
        "Développement Actuel ➔ [ Zone Proximale de Développement (Médiation Sociale) ] ➔ Développement Potentiel",
      containerClass:
        "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
      badgeClass:
        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
    },
  };

  const cur = stepsInfo[activeStep] || stepsInfo.vygotski;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 920 460"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {/* PANNEAU HAUT : PIAGET VS VYGOTSKI */}
          <rect
            x="20"
            y="20"
            width="880"
            height="230"
            rx="16"
            className="fill-slate-900/50 stroke-slate-800"
          />
          <text
            x="40"
            y="50"
            className="fill-white font-bold text-sm uppercase tracking-wider"
          >
            I. TRAJECTOIRES DU LANGAGE ÉGOCENTRIQUE : PIAGET VS VYGOTSKI
          </text>

          {/* LIGNE PIAGET */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("piaget")}
          >
            <rect
              x="40"
              y="70"
              width="840"
              height="75"
              rx="12"
              className={`fill-amber-950/30 stroke-amber-500/60 ${
                activeStep === "piaget" ? "stroke-[2.5px] fill-amber-950/50" : "stroke-1"
              }`}
            />
            <text x="60" y="100" className="fill-amber-300 font-bold text-xs">
              JEAN PIAGET (1923)
            </text>
            <text x="60" y="125" className="fill-slate-300 text-xs font-mono">
              Pensée égocentrique ➔ [ Langage égocentrique asocial ] ➔ Élimination ➔ Langage socialisé
            </text>
            <circle cx="840" cy="107" r="12" className="fill-amber-600/40" />
            <text
              x="840"
              y="112"
              textAnchor="middle"
              className="fill-amber-200 text-xs font-bold"
            >
              ✕
            </text>
          </g>

          {/* LIGNE VYGOTSKI */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("vygotski")}
          >
            <rect
              x="40"
              y="160"
              width="840"
              height="75"
              rx="12"
              className={`fill-indigo-950/30 stroke-indigo-500/60 ${
                activeStep === "vygotski" ? "stroke-[2.5px] fill-indigo-950/50" : "stroke-1"
              }`}
            />
            <text x="60" y="190" className="fill-indigo-300 font-bold text-xs">
              LEV VYGOTSKI (1934)
            </text>
            <text x="60" y="215" className="fill-slate-300 text-xs font-mono">
              Langage social (relationnel) ➔ [ Langage égocentrique (résolution) ] ➔ Intériorisation ➔ Langage intérieur (pensée)
            </text>
            <circle cx="840" cy="197" r="12" className="fill-indigo-600/40" />
            <text
              x="840"
              y="201"
              textAnchor="middle"
              className="fill-indigo-200 text-xs font-bold"
            >
              ✓
            </text>
          </g>

          {/* PANNEAU BAS : ZONE PROXIMALE DE DÉVELOPPEMENT (ZPD) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("zpd")}
          >
            <rect
              x="20"
              y="270"
              width="880"
              height="170"
              rx="16"
              className={`fill-emerald-950/20 stroke-emerald-500/50 ${
                activeStep === "zpd" ? "stroke-[2.5px] fill-emerald-950/40" : "stroke-1"
              }`}
            />
            <text
              x="40"
              y="300"
              className="fill-emerald-300 font-bold text-sm uppercase tracking-wider"
            >
              II. LA ZONE PROXIMALE DE DÉVELOPPEMENT (ZPD) &amp; MÉDIATION SÉMIOTIQUE
            </text>

            {/* TROIS CERCLES / BOITES EMBÔITÉES */}
            {/* Zone actuelle */}
            <rect
              x="50"
              y="325"
              width="230"
              height="85"
              rx="10"
              className="fill-slate-900 stroke-slate-700"
            />
            <text x="70" y="355" className="fill-slate-200 font-bold text-xs">
              1. Développement Actuel
            </text>
            <text x="70" y="375" className="fill-slate-400 text-[11px]">
              Ce que le sujet sait
            </text>
            <text x="70" y="392" className="fill-slate-400 text-[11px]">
              accomplir SEUL en autonomie
            </text>

            {/* Flèche vers ZPD */}
            <path
              d="M 290 367 L 325 367"
              className="stroke-emerald-400 stroke-2"
              markerEnd="url(#arrow)"
            />

            {/* ZPD au centre */}
            <rect
              x="335"
              y="325"
              width="310"
              height="85"
              rx="10"
              className="fill-emerald-950/80 stroke-emerald-400 stroke-2"
            />
            <text x="355" y="355" className="fill-emerald-300 font-bold text-xs">
              2. Zone Proximale (ZPD)
            </text>
            <text x="355" y="375" className="fill-emerald-100 text-[11px] font-semibold">
              Médiation par autrui (tuteur, pair, instrument)
            </text>
            <text x="355" y="392" className="fill-emerald-200/80 text-[11px]">
              Dialogue clinique · Conflit de critères · Élingage
            </text>

            {/* Flèche vers Potentiel */}
            <path
              d="M 655 367 L 690 367"
              className="stroke-emerald-400 stroke-2"
            />

            {/* Zone potentielle */}
            <rect
              x="700"
              y="325"
              width="180"
              height="85"
              rx="10"
              className="fill-slate-900 stroke-slate-700"
            />
            <text x="720" y="355" className="fill-slate-200 font-bold text-xs">
              3. Potentiel Futur
            </text>
            <text x="720" y="375" className="fill-slate-400 text-[11px]">
              Nouvelles fonctions
            </text>
            <text x="720" y="392" className="fill-slate-400 text-[11px]">
              psychiques stabilisées
            </text>
          </g>
        </svg>
      </div>

      {/* DÉTAIL DYNAMIQUE */}
      {cur && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2.5 transition-all ${cur.containerClass}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/5 dark:border-white/10">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
              {cur.titre}
            </h4>
          </div>
          <div
            className={`inline-block px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${cur.badgeClass}`}
          >
            {cur.formule}
          </div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0">
            {cur.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 14. LES 4 FONCTIONS DE LA PENSÉE SELON BERNARD GOLSE (PST108)
// =========================================================================
export function GolseFonctionsPenseeDiagram() {
  const [activeFct, setActiveFct] = useState<number>(1);

  const fcts = [
    {
      num: 1,
      titre: "1. Fonction de Pare-excitation & Contenance",
      auteurs: "S. Freud (1920) · D.W. Winnicott (holding) · W.R. Bion (1962)",
      concepts: [
        "Appareil à penser les pensées (Bion)",
        "Éléments bêta ➔ alpha",
        "Holding maternel",
        "Membrane pare-excitante (Freud)",
      ],
      desc: "Le nouveau-né est submergé par un flux d'excitations pulsionnelles et sensorielles sans frontière entre dedans et dehors. Le parent offre une contenance psychique en lui prêtant un « appareil à penser les pensées » (Bion : métabolisation des éléments bêta bruts en éléments alpha pensables) jusqu'à ce que le bébé intériorise sa propre membrane pare-excitante.",
      cardStyle: {
        container:
          "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 shadow-xs",
        badge:
          "bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/60",
        numBadge: "bg-rose-600 text-white",
        tag: "bg-rose-100/70 dark:bg-rose-900/30 text-rose-900 dark:text-rose-300 border-rose-200 dark:border-rose-800/40",
        strokeSel: "stroke-rose-400",
        fillBadge: "#e11d48",
      },
    },
    {
      num: 2,
      titre: "2. Fonction de Réparation Symbolique",
      auteurs: "S. Freud (1920, Au-delà du principe de plaisir) · Jeu du Fort/Da",
      concepts: [
        "Jeu de la bobine (Fort/Da)",
        "Symbolisation de l'absence",
        "Passivité subie ➔ Maîtrise active",
        "Pulsion de mort & répétition",
      ],
      desc: "La pensée humaine permet de symboliser l'absence et de surmonter la détresse de la perte. Freud l'illustre par le jeu de la bobine chez son petit-fils Ernst (18 mois) : en lançant la bobine ('Fort' = partie) et en la ramenant ('Da' = voilà), l'enfant passe de la passivité d'un abandon subi à la maîtrise active de l'absence maternelle.",
      cardStyle: {
        container:
          "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/60 shadow-xs",
        badge:
          "bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60",
        numBadge: "bg-amber-600 text-white",
        tag: "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",
        strokeSel: "stroke-amber-400",
        fillBadge: "#d97706",
      },
    },
    {
      num: 3,
      titre: "3. Fonction Narcissique & Continuité d'Existence",
      auteurs: "D.W. Winnicott · B. Golse (1999)",
      concepts: [
        "Going-on-being (continuité d'être)",
        "Permanence du Soi",
        "Sécurité ontologique",
        "Capacité d'être seul (solitude habitée)",
      ],
      desc: "La pensée assure au sujet le sentiment rassurant de la continuité d'être (going-on-being). Penser permet de se sentir exister dans le temps, même dans les moments de solitude ou de rupture d'activité.",
      cardStyle: {
        container:
          "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs",
        badge:
          "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/60",
        numBadge: "bg-indigo-600 text-white",
        tag: "bg-indigo-100/70 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40",
        strokeSel: "stroke-indigo-400",
        fillBadge: "#4f46e5",
      },
    },
    {
      num: 4,
      titre: "4. Accès à la Tiercéité & Intersubjectivité",
      auteurs: "B. Golse · Enveloppe monadique ➔ Enveloppe triadique",
      concepts: [
        "Enveloppe triadique",
        "Tiers séparateur (père / loi / parole)",
        "Intersubjectivité & altérité",
        "Reconnaissance d'autrui comme sujet",
      ],
      desc: "Le passage à la communication verbale suppose la reconnaissance de l'autre comme sujet distinct. L'enfant s'arrache à la fusion mère-bébé (enveloppe monadique) grâce à l'introduction d'un tiers séparateur (le père, la parole, la règle), accédant ainsi à l'intersubjectivité et au dialogue.",
      cardStyle: {
        container:
          "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
        badge:
          "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
        numBadge: "bg-emerald-600 text-white",
        tag: "bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40",
        strokeSel: "stroke-emerald-400",
        fillBadge: "#059669",
      },
    },
  ];

  const cur = fcts.find((f) => f.num === activeFct) || fcts[0];

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 920 380"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {fcts.map((f, idx) => {
            const x = 30 + idx * 220;
            const isSel = f.num === activeFct;
            const auts = f.auteurs.split("·");
            return (
              <g
                key={f.num}
                className="cursor-pointer transition-transform hover:scale-[1.01]"
                onClick={() => setActiveFct(f.num)}
              >
                <rect
                  x={x}
                  y={40}
                  width="205"
                  height="300"
                  rx="14"
                  className={`transition-all ${
                    isSel
                      ? `fill-slate-900 ${f.cardStyle.strokeSel} stroke-2 shadow-xl`
                      : "fill-slate-950/80 stroke-slate-800 hover:stroke-slate-700 stroke-1"
                  }`}
                />
                <circle
                  cx={x + 35}
                  cy="75"
                  r="16"
                  fill={isSel ? f.cardStyle.fillBadge : "#334155"}
                />
                <text
                  x={x + 35}
                  y="81"
                  textAnchor="middle"
                  className="fill-white font-bold text-xs font-mono"
                >
                  {f.num}
                </text>
                <text
                  x={x + 20}
                  y="120"
                  className="fill-white font-bold text-xs max-w-[170px]"
                >
                  {f.titre.replace(/^\d+\.\s*/, "").split("&")[0]}
                </text>
                {f.titre.includes("&") && (
                  <text
                    x={x + 20}
                    y="138"
                    className="fill-white font-bold text-xs"
                  >
                    &amp; {f.titre.split("&")[1]}
                  </text>
                )}

                <line
                  x1={x + 20}
                  y1="155"
                  x2={x + 185}
                  y2="155"
                  className="stroke-slate-800"
                />

                <text
                  x={x + 20}
                  y="178"
                  className="fill-amber-400 text-[10px] font-mono font-semibold"
                >
                  Auteurs de référence :
                </text>
                <text
                  x={x + 20}
                  y="198"
                  className="fill-slate-200 text-[11px] leading-tight font-medium"
                >
                  {auts[0]?.trim()}
                </text>
                {auts[1] && (
                  <text
                    x={x + 20}
                    y="216"
                    className="fill-slate-300 text-[10px] leading-tight"
                  >
                    · {auts[1].trim()}
                  </text>
                )}
                {auts[2] && (
                  <text
                    x={x + 20}
                    y="234"
                    className="fill-slate-400 text-[10px] leading-tight"
                  >
                    · {auts[2].trim()}
                  </text>
                )}

                <rect
                  x={x + 20}
                  y="280"
                  width="165"
                  height="35"
                  rx="8"
                  className={isSel ? "fill-slate-800" : "fill-slate-900"}
                  stroke={isSel ? f.cardStyle.fillBadge : "#334155"}
                  strokeWidth="1"
                />
                <text
                  x={x + 102}
                  y="302"
                  textAnchor="middle"
                  className={`text-[11px] font-bold ${
                    isSel ? "fill-white" : "fill-slate-400"
                  }`}
                >
                  {isSel ? "✓ Actif (affiché)" : "Cliquer pour détails"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {cur && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-3 transition-all ${cur.cardStyle.container}`}
        >
          {/* Header row: Number badge + Title + Authors Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`size-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs ${cur.cardStyle.numBadge}`}
              >
                {cur.num}
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
                {cur.titre}
              </h4>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shrink-0 ${cur.cardStyle.badge}`}
            >
              <BookOpen className="size-3.5 shrink-0 opacity-80" />
              <span>{cur.auteurs}</span>
            </span>
          </div>

          {/* Core Description - High Contrast Accessible typography */}
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0 font-normal">
            {cur.desc}
          </p>

          {/* Concepts repères pour copie d'examen Cnam */}
          {cur.concepts && cur.concepts.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
                <span>Repères Cnam :</span>
              </span>
              {cur.concepts.map((c) => (
                <span
                  key={c}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${cur.cardStyle.tag}`}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

