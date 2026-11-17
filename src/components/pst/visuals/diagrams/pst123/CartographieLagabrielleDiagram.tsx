"use client";

import React, { useState } from "react";
import { Compass } from "lucide-react";

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
