"use client";

import React, { useState } from "react";

export function SainsaulieuMatriceDiagram() {
  const [selectedCulture, setSelectedCulture] = useState<string>("fusionnel");

  const cultures: Record<
    string,
    {
      titre: string;
      public: string;
      relation: string;
      pouvoir: string;
      desc: string;
    }
  > = {
    fusionnel: {
      titre: "Modèle Fusionnel (Solidarité de masse)",
      public: "Ouvriers non qualifiés (OS), travail à la chaîne",
      relation: "Forte dépendance affective aux pairs",
      pouvoir: "Faible pouvoir individuel sur le poste",
      desc: "La solidarité est inconditionnelle : 'Tous ensemble face au chef'. Rejet de l'ascension individuelle perçue comme une trahison de classe.",
    },
    negociateur: {
      titre: "Modèle Négociateur (Débat démocratique)",
      public: "Cadres, techniciens, experts, professionnels qualifiés",
      relation: "Dépendance régulée par le contrat",
      pouvoir: "Fort pouvoir d'expertise et autonomie",
      desc: "Le conflit est institutionnalisé : on débat des normes, on négocie des compromis rationnels sans violence affective.",
    },
    retrait: {
      titre: "Modèle du Retrait (Travail purement alimentaire)",
      public: "Intérimaires, précaires, salariés marginalisés",
      relation: "Faible intégration au groupe",
      pouvoir: "Faible autonomie dans la structure",
      desc: "Le travail n'est qu'un moyen de subsistance financière. L'identité réelle et la fierté sont investies totalement hors de l'entreprise (famille, loisirs).",
    },
    affinitaire: {
      titre: "Modèle Affinitaire (Réseaux électifs)",
      public: "Jeunes diplômés, managers de projet, consultants",
      relation: "Affinités choisies entre semblables",
      pouvoir: "Mobilité professionnelle élevée",
      desc: "L'attachement ne va ni à l'entreprise ni à la classe, mais à un réseau choisi de pairs complices pour progresser dans la carrière.",
    },
  };

  const curC = cultures[selectedCulture] || cultures.fusionnel;

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 520"
          className="w-full h-auto max-h-[490px] select-none text-slate-100 font-sans"
        >
          {/* Axes */}
          <line
            x1="80"
            y1="260"
            x2="740"
            y2="260"
            stroke="#64748b"
            strokeWidth="2.5"
          />
          <polygon points="740,255 750,260 740,265" fill="#64748b" />
          <text
            x="410"
            y="280"
            fill="#94a3b8"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            CAPACITÉ DE POUVOIR &amp; AUTONOMIE SUR LE TRAVAIL
          </text>
          <text x="130" y="245" fill="#cbd5e1" fontSize="10" textAnchor="start">
            ← Faible pouvoir
          </text>
          <text x="730" y="245" fill="#cbd5e1" fontSize="10" textAnchor="end">
            Fort pouvoir →
          </text>

          <line
            x1="410"
            y1="40"
            x2="410"
            y2="480"
            stroke="#64748b"
            strokeWidth="2.5"
          />
          <polygon points="405,40 410,30 415,40" fill="#64748b" />
          <text x="420" y="50" fill="#cbd5e1" fontSize="10">
            ↑ Forte dépendance aux pairs
          </text>
          <text x="420" y="475" fill="#cbd5e1" fontSize="10">
            ↓ Faible dépendance aux pairs
          </text>

          {/* Fusionnel: Faible Pouvoir, Forte Dépendance (Haut-Gauche) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedCulture("fusionnel")}
          >
            <rect
              x="80"
              y="60"
              width="310"
              height="180"
              rx="16"
              fill="#064e3b"
              stroke={selectedCulture === "fusionnel" ? "#34d399" : "#059669"}
              strokeWidth={selectedCulture === "fusionnel" ? "3" : "1.5"}
            />
            <text
              x="235"
              y="100"
              fill="#a7f3d0"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              MODÈLE FUSIONNEL
            </text>
            <text
              x="235"
              y="122"
              fill="#d1fae5"
              fontSize="11"
              textAnchor="middle"
            >
              OS · Chaînes industrielles
            </text>
            <text
              x="235"
              y="155"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Solidarité de clan face au chef
            </text>
            <text
              x="235"
              y="175"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Égalitarisme strict &amp; Chaleur humaine
            </text>
          </g>

          {/* Négociateur: Fort Pouvoir, Forte Dépendance (Haut-Droit) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedCulture("negociateur")}
          >
            <rect
              x="430"
              y="60"
              width="310"
              height="180"
              rx="16"
              fill="#1e1b4b"
              stroke={selectedCulture === "negociateur" ? "#818cf8" : "#4f46e5"}
              strokeWidth={selectedCulture === "negociateur" ? "3" : "1.5"}
            />
            <text
              x="585"
              y="100"
              fill="#c7d2fe"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              MODÈLE NÉGOCIATEUR
            </text>
            <text
              x="585"
              y="122"
              fill="#e0e7ff"
              fontSize="11"
              textAnchor="middle"
            >
              Cadres · Experts · Ingénieurs
            </text>
            <text
              x="585"
              y="155"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Culture du débat &amp; Délibération
            </text>
            <text
              x="585"
              y="175"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Compromis contractuel régulé
            </text>
          </g>

          {/* Retrait: Faible Pouvoir, Faible Dépendance (Bas-Gauche) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedCulture("retrait")}
          >
            <rect
              x="80"
              y="280"
              width="310"
              height="180"
              rx="16"
              fill="#78350f"
              stroke={selectedCulture === "retrait" ? "#fbbf24" : "#d97706"}
              strokeWidth={selectedCulture === "retrait" ? "3" : "1.5"}
            />
            <text
              x="235"
              y="320"
              fill="#fde68a"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              MODÈLE DU RETRAIT
            </text>
            <text
              x="235"
              y="342"
              fill="#fef3c7"
              fontSize="11"
              textAnchor="middle"
            >
              Précaires · Intérimaires isolés
            </text>
            <text
              x="235"
              y="375"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Travail purement alimentaire
            </text>
            <text
              x="235"
              y="395"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Désinvestissement psychologique
            </text>
          </g>

          {/* Affinitaire: Fort Pouvoir, Dépendance Sélective (Bas-Droit) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedCulture("affinitaire")}
          >
            <rect
              x="430"
              y="280"
              width="310"
              height="180"
              rx="16"
              fill="#0c4a6e"
              stroke={selectedCulture === "affinitaire" ? "#38bdf8" : "#0284c7"}
              strokeWidth={selectedCulture === "affinitaire" ? "3" : "1.5"}
            />
            <text
              x="585"
              y="320"
              fill="#7dd3fc"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              MODÈLE AFFINITAIRE
            </text>
            <text
              x="585"
              y="342"
              fill="#e0f2fe"
              fontSize="11"
              textAnchor="middle"
            >
              Jeunes diplômés · Consultants nomades
            </text>
            <text
              x="585"
              y="375"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Réseaux de pairs choisis
            </text>
            <text
              x="585"
              y="395"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Mobilité &amp; Ambition individuelle
            </text>
          </g>
        </svg>
      </div>

      {curC && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
              {curC.titre}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 font-bold">
              {curC.public}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            {curC.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 10. CASTEL (PST123) : L'ESCALIER DU DÉCROCHAGE DE LA DÉSAFFILIATION
// =========================================================================
