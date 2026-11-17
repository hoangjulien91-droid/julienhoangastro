"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export function BuhlerOrganonDiagram({
  repVal,
  expVal,
  appVal,
}: {
  repVal?: number;
  expVal?: number;
  appVal?: number;
}) {
  const [activePole, setActivePole] = useState<string>("signe");

  const poles: Record<
    string,
    {
      titre: string;
      allemand: string;
      role: string;
      desc: string;
      couleur: string;
    }
  > = {
    signe: {
      titre: "Le Signe Linguistique (Das Zeichen)",
      allemand: "Das Zeichen im Zentrum",
      role: "Occurrence acoustique ou textuelle concrète",
      desc: "L'énoncé physique concret (la parole prononcée ou écrite). Il n'a de sens que par sa triple orientation vers le monde, vers le sujet parlant et vers l'interlocuteur.",
      couleur: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    },
    representation: {
      titre: "Fonction de Représentation (Darstellung) ➔ SYMBOLE",
      allemand: "Gegenstände und Sachverhalte",
      role: "Orientation vers les Faits du Monde",
      desc: "Le signe est un SYMBOLE en vertu de son adéquation aux objets et états de choses réels. Il transmet le contenu informatif objectif (« ce dont on parle »).",
      couleur: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    },
    expression: {
      titre: "Fonction d'Expression (Ausdruck) ➔ SYMPTÔME",
      allemand: "Sender (L'Émetteur)",
      role: "Orientation vers le Locuteur",
      desc: "Le signe est un SYMPTÔME de l'intériorité du locuteur : ses émotions, sa souffrance, sa posture ou son intention cachée (« qui parle et que ressent-il »).",
      couleur: "text-rose-500 border-rose-500/30 bg-rose-500/10",
    },
    appel: {
      titre: "Fonction d'Appel (Appell) ➔ SIGNAL",
      allemand: "Empfänger (Le Destinataire)",
      role: "Orientation vers le Récepteur",
      desc: "Le signe est un SIGNAL pour le récepteur, qu'il cherche à guider, avertir, émouvoir ou pousser à l'action (« ce qu'on attend de l'autre »).",
      couleur: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    },
  };

  const cur = poles[activePole] || poles.signe;

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 520"
          className="w-full h-auto max-h-[490px] select-none text-slate-100 font-sans"
        >
          {/* Main Triangle Structure */}
          <polygon
            points="410,75 140,410 680,410"
            fill="none"
            stroke="#334155"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />

          {/* Radiating lines from Center Sign to Vertices */}
          <line
            x1="410"
            y1="240"
            x2="410"
            y2="115"
            stroke="#38bdf8"
            strokeWidth="2.5"
            markerEnd="url(#arrowHeadActive)"
          />
          <line
            x1="365"
            y1="270"
            x2="200"
            y2="390"
            stroke="#f43f5e"
            strokeWidth="2.5"
            markerEnd="url(#arrowHeadActive)"
          />
          <line
            x1="455"
            y1="270"
            x2="620"
            y2="390"
            stroke="#10b981"
            strokeWidth="2.5"
            markerEnd="url(#arrowHeadActive)"
          />

          {/* Top Pole: OBJETS & FAITS DU MONDE (Représentation) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePole("representation")}
          >
            <rect
              x="230"
              y="20"
              width="360"
              height="80"
              rx="16"
              fill="#0c4a6e"
              stroke={activePole === "representation" ? "#38bdf8" : "#0284c7"}
              strokeWidth={activePole === "representation" ? "3" : "1.5"}
            />
            <text
              x="410"
              y="48"
              fill="#7dd3fc"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              OBJETS &amp; ÉTATS DE CHOSES (Gegenstände)
            </text>
            <text
              x="410"
              y="68"
              fill="#e0f2fe"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              Fonction de Représentation (Darstellung) ➔ SYMBOLE
            </text>
            {repVal !== undefined && (
              <text
                x="410"
                y="86"
                fill="#38bdf8"
                fontSize="11"
                fontWeight="extrabold"
                textAnchor="middle"
              >
                Force factuelle : {repVal}%
              </text>
            )}
          </g>

          {/* Bottom Left Pole: ÉMETTEUR (Expression) */}
          <g
            className="cursor-pointer"
            onClick={() => setActivePole("expression")}
          >
            <rect
              x="20"
              y="370"
              width="300"
              height="95"
              rx="16"
              fill="#7f1d1d"
              stroke={activePole === "expression" ? "#fb7185" : "#be123c"}
              strokeWidth={activePole === "expression" ? "3" : "1.5"}
            />
            <text
              x="170"
              y="400"
              fill="#fecaca"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              ÉMETTEUR / LOCUTEUR (Sender)
            </text>
            <text
              x="170"
              y="420"
              fill="#fee2e2"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              Fonction d&apos;Expression (Ausdruck)
            </text>
            <text
              x="170"
              y="438"
              fill="#fda4af"
              fontSize="10.5"
              textAnchor="middle"
            >
              Le signe est un SYMPTÔME
            </text>
            {expVal !== undefined && (
              <text
                x="170"
                y="454"
                fill="#fb7185"
                fontSize="11"
                fontWeight="extrabold"
                textAnchor="middle"
              >
                Charge émotionnelle : {expVal}%
              </text>
            )}
          </g>

          {/* Bottom Right Pole: RÉCEPTEUR (Appel) */}
          <g className="cursor-pointer" onClick={() => setActivePole("appel")}>
            <rect
              x="500"
              y="370"
              width="300"
              height="95"
              rx="16"
              fill="#064e3b"
              stroke={activePole === "appel" ? "#34d399" : "#059669"}
              strokeWidth={activePole === "appel" ? "3" : "1.5"}
            />
            <text
              x="650"
              y="400"
              fill="#a7f3d0"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              RÉCEPTEUR / DESTINATAIRE (Empfänger)
            </text>
            <text
              x="650"
              y="420"
              fill="#d1fae5"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              Fonction d&apos;Appel (Appell)
            </text>
            <text
              x="650"
              y="438"
              fill="#6ee7b7"
              fontSize="10.5"
              textAnchor="middle"
            >
              Le signe est un SIGNAL
            </text>
            {appVal !== undefined && (
              <text
                x="650"
                y="454"
                fill="#34d399"
                fontSize="11"
                fontWeight="extrabold"
                textAnchor="middle"
              >
                Pression d&apos;action : {appVal}%
              </text>
            )}
          </g>

          {/* Central Hub: DAS ZEICHEN (Le Signe) */}
          <g className="cursor-pointer" onClick={() => setActivePole("signe")}>
            <circle
              cx="410"
              cy="255"
              r="60"
              fill="#1e1b4b"
              stroke={activePole === "signe" ? "#fbbf24" : "#818cf8"}
              strokeWidth={activePole === "signe" ? "3.5" : "2"}
            />
            <text
              x="410"
              y="246"
              fill="#fbbf24"
              fontSize="12"
              fontWeight="black"
              textAnchor="middle"
            >
              DAS ZEICHEN
            </text>
            <text
              x="410"
              y="264"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              LE SIGNE
            </text>
            <text
              x="410"
              y="280"
              fill="#cbd5e1"
              fontSize="9.5"
              textAnchor="middle"
            >
              (L&apos;Énoncé concret)
            </text>
          </g>
        </svg>
      </div>

      {cur && (
        <div className={`p-4 rounded-2xl border ${cur.couleur} space-y-1`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="size-4" />
              {cur.titre}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold">
              {cur.allemand}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            {cur.desc}
          </p>
        </div>
      )}
    </div>
  );
}


// =========================================================================
// 15. DUBAR (PST123) : MATRICE DES 4 FORMES IDENTITAIRES DE SOCIALISATION
// =========================================================================
