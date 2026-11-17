"use client";

import React, { useState } from "react";
import { Compass } from "lucide-react";

export function HabermasTetraedreDiagram() {
  const [activePole, setActivePole] = useState<string>("verite");

  const poles: Record<
    string,
    {
      titre: string;
      monde: string;
      critere: string;
      question: string;
      couleur: string;
    }
  > = {
    verite: {
      titre: "Vérité (Wahrheit)",
      monde: "Monde Objectif (Faits matériels)",
      critere: "Conformité aux faits observables",
      question: "L'état de fait énoncé existe-t-il vraiment dans la réalité ?",
      couleur: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    },
    justesse: {
      titre: "Justesse Normative (Richtigkeit)",
      monde: "Monde Social (Normes & Valeurs)",
      critere: "Légitimité morale et déontologique",
      question:
        "L'acte de parole est-il légitime dans le contexte institutionnel partagé ?",
      couleur: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    },
    sincerite: {
      titre: "Sincérité / Authenticité (Wahrhaftigkeit)",
      monde: "Monde Subjectif (Vécu intérieur)",
      critere: "Transparence & Absence de manipulation",
      question:
        "Le locuteur pense-t-il sincèrement ce qu'il dit sans dissimulation ?",
      couleur: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    },
    intelligibilite: {
      titre: "Intelligibilité (Verständlichkeit)",
      monde: "Monde Linguistique (Code sémantique)",
      critere: "Clarté grammaticale et sémantique",
      question: "Le message utilise-t-il un langage compréhensible par tous ?",
      couleur: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    },
  };

  const cur = poles[activePole] || poles.verite;

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 500"
          className="w-full h-auto max-h-[480px] select-none text-slate-100 font-sans"
        >
          {/* Connector lines forming tetrahedral constellation */}
          <line
            x1="410"
            y1="90"
            x2="650"
            y2="250"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="650"
            y1="250"
            x2="410"
            y2="410"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="410"
            y1="410"
            x2="170"
            y2="250"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="170"
            y1="250"
            x2="410"
            y2="90"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Cross lines to center */}
          <line
            x1="410"
            y1="90"
            x2="410"
            y2="410"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <line
            x1="170"
            y1="250"
            x2="650"
            y2="250"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Center Hub: Énoncé */}
          <circle
            cx="410"
            cy="250"
            r="55"
            fill="#1e1b4b"
            stroke="#818cf8"
            strokeWidth="3"
          />
          <text
            x="410"
            y="244"
            fill="#ffffff"
            fontSize="12"
            fontWeight="black"
            textAnchor="middle"
          >
            PRÉTENTION
          </text>
          <text
            x="410"
            y="260"
            fill="#a5b4fc"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            À LA VALIDITÉ
          </text>

          {/* North Node: Vérité */}
          <g className="cursor-pointer" onClick={() => setActivePole("verite")}>
            <circle
              cx="410"
              cy="80"
              r="45"
              fill="#0c4a6e"
              stroke={activePole === "verite" ? "#38bdf8" : "#0284c7"}
              strokeWidth={activePole === "verite" ? "3" : "1.5"}
            />
            <text
              x="410"
              y="76"
              fill="#7dd3fc"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              VÉRITÉ
            </text>
            <text
              x="410"
              y="94"
              fill="#e0f2fe"
              fontSize="9.5"
              textAnchor="middle"
            >
              Monde Objectif
            </text>
          </g>

          {/* East Node: Justesse */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePole("justesse")}
          >
            <circle
              cx="660"
              cy="250"
              r="45"
              fill="#064e3b"
              stroke={activePole === "justesse" ? "#34d399" : "#059669"}
              strokeWidth={activePole === "justesse" ? "3" : "1.5"}
            />
            <text
              x="660"
              y="246"
              fill="#6ee7b7"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              JUSTESSE
            </text>
            <text
              x="660"
              y="264"
              fill="#ecfdf5"
              fontSize="9.5"
              textAnchor="middle"
            >
              Monde Social
            </text>
          </g>

          {/* South Node: Sincérité */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePole("sincerite")}
          >
            <circle
              cx="410"
              cy="420"
              r="45"
              fill="#4c1d95"
              stroke={activePole === "sincerite" ? "#c084fc" : "#7c3aed"}
              strokeWidth={activePole === "sincerite" ? "3" : "1.5"}
            />
            <text
              x="410"
              y="416"
              fill="#d8b4fe"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              SINCÉRITÉ
            </text>
            <text
              x="410"
              y="434"
              fill="#f3e8ff"
              fontSize="9.5"
              textAnchor="middle"
            >
              Monde Subjectif
            </text>
          </g>

          {/* West Node: Intelligibilité */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePole("intelligibilite")}
          >
            <circle
              cx="160"
              cy="250"
              r="45"
              fill="#78350f"
              stroke={activePole === "intelligibilite" ? "#fbbf24" : "#d97706"}
              strokeWidth={activePole === "intelligibilite" ? "3" : "1.5"}
            />
            <text
              x="160"
              y="246"
              fill="#fde68a"
              fontSize="11.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              INTELLIGIBILITÉ
            </text>
            <text
              x="160"
              y="264"
              fill="#fef3c7"
              fontSize="9"
              textAnchor="middle"
            >
              Code Linguistique
            </text>
          </g>
        </svg>
      </div>

      {cur && (
        <div className={`p-4 rounded-2xl border ${cur.couleur} space-y-1`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Compass className="size-4" />
              Pôle : {cur.titre}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold">
              {cur.monde}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            <strong>Question clé d&apos;Habermas :</strong> &quot;{cur.question}
            &quot;
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 6. HONNETH (PST108) : LES 3 SPHÈRES DE LA RECONNAISSANCE
// =========================================================================
