"use client";

import React, { useState } from "react";

export function BourdieuHabitusDiagram() {
  const [selectedCapital, setSelectedCapital] = useState<string>("economique");

  const capitals: Record<
    string,
    { label: string; icon: string; detail: string; desc: string }
  > = {
    economique: {
      label: "Capital Économique",
      icon: "💰",
      detail: "Revenus, patrimoine, biens matériels.",
      desc: "Immédiatement convertible en argent et facilement transmissible par héritage juridique.",
    },
    culturel: {
      label: "Capital Culturel",
      icon: "🎓",
      detail: "Titres scolaires, livres, langue légitime.",
      desc: "3 états : incorporé (habitus, aisance verbale), objectivé (œuvres, livres), institutionnalisé (diplômes Cnam/universités).",
    },
    social: {
      label: "Capital Social",
      icon: "🤝",
      detail: "Réseau de relations durables.",
      desc: "Carnet d'adresses, appartenance à des clubs, syndicats, réseau d'anciens élèves procurant appui mutuel.",
    },
    symbolique: {
      label: "Capital Symbolique",
      icon: "🎖️",
      detail: "Prestige, honneurs, autorité perçue.",
      desc: "N'importe quel capital lorsqu'il est perçu et reconnu comme légitime par les agents dominés (effet de consécration).",
    },
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 500"
          className="w-full h-auto max-h-[480px] select-none text-slate-100 font-sans"
        >
          {/* Formula Header Banner */}
          <rect
            x="50"
            y="20"
            width="720"
            height="50"
            rx="14"
            fill="#1e1b4b"
            stroke="#6366f1"
            strokeWidth="2"
          />
          <text
            x="410"
            y="52"
            fill="#a5b4fc"
            fontSize="16"
            fontWeight="black"
            textAnchor="middle"
          >
            [ ( HABITUS ) + ( 4 CAPITAUX ) ] × CHAMP = PRATIQUES SOCIALES &amp;
            ILLUSIO
          </text>

          {/* Box 1: HABITUS */}
          <rect
            x="50"
            y="100"
            width="340"
            height="150"
            rx="16"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text
            x="220"
            y="130"
            fill="#38bdf8"
            fontSize="15"
            fontWeight="black"
            textAnchor="middle"
          >
            L&apos;HABITUS
          </text>
          <text
            x="220"
            y="152"
            fill="#bae6fd"
            fontSize="11"
            fontStyle="italic"
            textAnchor="middle"
          >
            &quot;Structure structurée et structurante&quot;
          </text>
          <text
            x="220"
            y="180"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            • Système de dispositions durables
          </text>
          <text
            x="220"
            y="200"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            • Sens pratique intériorisé (le &quot;flair&quot;)
          </text>
          <text
            x="220"
            y="220"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            • Hexis corporelle (posture, accent, tenue)
          </text>

          {/* Box 2: 4 CAPITAUX */}
          <rect
            x="430"
            y="100"
            width="340"
            height="150"
            rx="16"
            fill="#0f172a"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x="600"
            y="130"
            fill="#fbbf24"
            fontSize="15"
            fontWeight="black"
            textAnchor="middle"
          >
            LES 4 ESPÈCES DE CAPITAUX
          </text>
          <text
            x="600"
            y="158"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            💰 Économique : Biens &amp; Revenus
          </text>
          <text
            x="600"
            y="180"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            🎓 Culturel : Diplômes, Livres &amp; Langage
          </text>
          <text
            x="600"
            y="202"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            🤝 Social : Réseau relationnel durable
          </text>
          <text
            x="600"
            y="224"
            fill="#e2e8f0"
            fontSize="11"
            textAnchor="middle"
          >
            🎖️ Symbolique : Prestige &amp; Légitimité
          </text>

          {/* Downward links to Champ */}
          <line
            x1="220"
            y1="250"
            x2="350"
            y2="300"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="250"
            x2="470"
            y2="300"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Center multiplier : LE CHAMP */}
          <circle
            cx="410"
            cy="300"
            r="45"
            fill="#4338ca"
            stroke="#818cf8"
            strokeWidth="2"
          />
          <text
            x="410"
            y="295"
            fill="#ffffff"
            fontSize="12"
            fontWeight="black"
            textAnchor="middle"
          >
            LE CHAMP
          </text>
          <text
            x="410"
            y="312"
            fill="#c7d2fe"
            fontSize="9.5"
            textAnchor="middle"
          >
            Espace de luttes
          </text>

          {/* Down arrow to Result */}
          <line
            x1="410"
            y1="345"
            x2="410"
            y2="385"
            stroke="#a855f7"
            strokeWidth="3"
          />

          {/* Output: PRATIQUES SOCIALES & ILLUSIO */}
          <rect
            x="120"
            y="390"
            width="580"
            height="90"
            rx="16"
            fill="#1e1b4b"
            stroke="#a855f7"
            strokeWidth="2.5"
          />
          <text
            x="410"
            y="422"
            fill="#d8b4fe"
            fontSize="15"
            fontWeight="black"
            textAnchor="middle"
          >
            PRATIQUES SOCIALES &amp; ILLUSIO
          </text>
          <text
            x="410"
            y="445"
            fill="#f3e8ff"
            fontSize="11.5"
            textAnchor="middle"
          >
            L&apos;Illusio = La croyance absolue que le jeu en vaut la peine
          </text>
          <text
            x="410"
            y="465"
            fill="#cbd5e1"
            fontSize="10.5"
            textAnchor="middle"
          >
            Reproduction des rapports de domination sans conspiration consciente
          </text>
        </svg>
      </div>

      {/* Interactive Capital Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(capitals).map(([k, c]) => (
          <button
            key={k}
            type="button"
            onClick={() => setSelectedCapital(k)}
            className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
              selectedCapital === k
                ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-500"
                : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="font-bold flex items-center gap-1">
              <span>{c.icon}</span>
              <span className="truncate">{c.label}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 truncate">
              {c.detail}
            </div>
          </button>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs">
        <span className="font-bold text-amber-800 dark:text-amber-300">
          Focus {capitals[selectedCapital]?.label} :
        </span>{" "}
        <span className="text-slate-700 dark:text-slate-300">
          {capitals[selectedCapital]?.desc}
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 5. HABERMAS (PST108) : LE TÉTRAÈDRE DE LA VALIDITÉ & AGIR COMMUNICATIONNEL
// =========================================================================
