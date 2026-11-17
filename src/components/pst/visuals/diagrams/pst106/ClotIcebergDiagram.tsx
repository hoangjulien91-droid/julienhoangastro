"use client";

import React, { useState } from "react";
import { Activity } from "lucide-react";

export function ClotIcebergDiagram() {
  const [activeZone, setActiveZone] = useState<string>("immerge");

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950/70 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 500"
          className="w-full h-auto max-h-[480px] select-none text-slate-100 font-sans"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="icebergPeak"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="deepOcean" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="genreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Waterline / Horizon */}
          <line
            x1="30"
            y1="150"
            x2="520"
            y2="150"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
          <text
            x="275"
            y="142"
            fill="#38bdf8"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            LIGNE DE FLOTTAISON (Frontière du mesurable / Indicateurs RH)
          </text>

          {/* Iceberg Polygon */}
          {/* Peak (Émergé) */}
          <polygon
            points="275,30 380,150 170,150"
            fill="url(#icebergPeak)"
            stroke="#38bdf8"
            strokeWidth="2"
            className="cursor-pointer hover:opacity-90 transition-all"
            onClick={() => setActiveZone("emerge")}
          />
          <text
            x="275"
            y="90"
            fill="#ffffff"
            fontSize="13"
            fontWeight="black"
            textAnchor="middle"
          >
            L&apos;ACTIVITÉ
          </text>
          <text
            x="275"
            y="110"
            fill="#bae6fd"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            RÉALISÉE (20%)
          </text>

          {/* Underwater Mass (Immergé) */}
          <polygon
            points="170,150 380,150 460,420 280,470 90,400"
            fill="url(#deepOcean)"
            stroke="#1d4ed8"
            strokeWidth="2"
            className="cursor-pointer hover:opacity-90 transition-all"
            onClick={() => setActiveZone("immerge")}
          />
          <text
            x="275"
            y="200"
            fill="#60a5fa"
            fontSize="15"
            fontWeight="black"
            textAnchor="middle"
          >
            LE RÉEL DE L&apos;ACTIVITÉ (80%)
          </text>
          <text
            x="275"
            y="222"
            fill="#93c5fd"
            fontSize="11"
            fontStyle="italic"
            textAnchor="middle"
          >
            &quot;Ce qui ne se fait pas&quot; (Yves Clot)
          </text>

          {/* Sub-components inside iceberg */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveZone("contrarie")}
          >
            <rect
              x="130"
              y="245"
              width="290"
              height="40"
              rx="8"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="275"
              y="270"
              fill="#e2e8f0"
              fontSize="11.5"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Activités contrariées (Faute de temps / moyens)
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActiveZone("suspendu")}
          >
            <rect
              x="120"
              y="295"
              width="310"
              height="40"
              rx="8"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="275"
              y="320"
              fill="#e2e8f0"
              fontSize="11.5"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Activités suspendues (Urgences &amp; Interruptions)
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActiveZone("interdit")}
          >
            <rect
              x="130"
              y="345"
              width="290"
              height="40"
              rx="8"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="275"
              y="370"
              fill="#e2e8f0"
              fontSize="11.5"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Activités empêchées &amp; interdites (Malfaçon subie)
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActiveZone("renonce")}
          >
            <rect
              x="140"
              y="395"
              width="270"
              height="40"
              rx="8"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="1"
            />
            <text
              x="275"
              y="420"
              fill="#e2e8f0"
              fontSize="11"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Ce qu&apos;on fait sans vouloir le faire
            </text>
          </g>

          {/* RIGHT SIDE: LE MÉTIER VIVANT (GENRE vs STYLE) */}
          <g className="cursor-pointer" onClick={() => setActiveZone("genre")}>
            <rect
              x="550"
              y="40"
              width="240"
              height="150"
              rx="16"
              fill="url(#genreGrad)"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <text
              x="670"
              y="75"
              fill="#c4b5fd"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              LE GENRE
            </text>
            <text
              x="670"
              y="95"
              fill="#a78bfa"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              PROFESSIONNEL
            </text>
            <text
              x="670"
              y="125"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Mémoire collective des pairs
            </text>
            <text
              x="670"
              y="145"
              fill="#cbd5e1"
              fontSize="10.5"
              textAnchor="middle"
            >
              Règles du métier non écrites
            </text>
            <text
              x="670"
              y="165"
              fill="#67e8f9"
              fontSize="10"
              fontStyle="italic"
              textAnchor="middle"
            >
              Garant de la santé psychique
            </text>
          </g>

          {/* Bidirectional Arrow between Genre and Style */}
          <line
            x1="670"
            y1="200"
            x2="670"
            y2="245"
            stroke="#a78bfa"
            strokeWidth="2.5"
          />
          <polygon points="665,200 670,192 675,200" fill="#a78bfa" />
          <polygon points="665,245 670,253 675,245" fill="#a78bfa" />
          <text
            x="670"
            y="228"
            fill="#e9d5ff"
            fontSize="9.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            vitalisation mutuelle
          </text>

          {/* Style Personnel Card */}
          <g className="cursor-pointer" onClick={() => setActiveZone("style")}>
            <rect
              x="550"
              y="255"
              width="240"
              height="130"
              rx="16"
              fill="#1e1b4b"
              stroke="#6366f1"
              strokeWidth="2"
            />
            <text
              x="670"
              y="290"
              fill="#a5b4fc"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              LE STYLE
            </text>
            <text
              x="670"
              y="310"
              fill="#818cf8"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              PERSONNEL
            </text>
            <text
              x="670"
              y="338"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Réappropriation singulière
            </text>
            <text
              x="670"
              y="358"
              fill="#cbd5e1"
              fontSize="10.5"
              textAnchor="middle"
            >
              Créativité &amp; touche propre
            </text>
          </g>

          {/* Bottom Alert Banner */}
          <rect
            x="550"
            y="405"
            width="240"
            height="65"
            rx="12"
            fill="#450a0a"
            stroke="#f43f5e"
            strokeWidth="1.5"
          />
          <text
            x="670"
            y="428"
            fill="#fecdd3"
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            ⚠️ Si le Genre est étouffé :
          </text>
          <text
            x="670"
            y="445"
            fill="#fda4af"
            fontSize="10"
            textAnchor="middle"
          >
            &quot;Travail empêché&quot; &amp; Souffrance
          </text>
          <text
            x="670"
            y="460"
            fill="#fda4af"
            fontSize="10"
            textAnchor="middle"
          >
            éthique de malfaçon
          </text>
        </svg>
      </div>

      {/* Detail Card */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1 text-xs">
        <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
          <Activity className="size-4" />
          Clinique de l&apos;Activité (Yves Clot) :
        </span>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
          Pour Yves Clot, limiter le travail à ce qui est réalisé et mesuré (la
          pointe de l&apos;iceberg) mutile la réalité humaine. L&apos;analyse
          clinique s&apos;intéresse aux <strong>activités empêchées</strong> et
          restaure le <strong>genre professionnel</strong> (débat sur le travail
          bien fait entre pairs) pour soigner les organisations.
        </p>
      </div>
    </div>
  );
}
