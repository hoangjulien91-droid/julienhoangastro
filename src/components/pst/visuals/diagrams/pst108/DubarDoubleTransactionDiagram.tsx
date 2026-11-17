"use client";

import React, { useState } from "react";

export function DubarDoubleTransactionDiagram() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>("q1");

  const quadrants: Record<
    string,
    {
      titre: string;
      temps: string;
      espace: string;
      desc: string;
      statut: string;
    }
  > = {
    q1: {
      titre: "Identité d'Entreprise / Statutaire",
      temps: "Continuité temporelle",
      espace: "Accord soi / autrui",
      desc: "Promotion interne, fidélité à l'organisation, carrière prévisible. L'identité pour soi coïncide avec l'attribution managériale.",
      statut: "Cadres de maison, fonctionnaires statutaires.",
    },
    q2: {
      titre: "Identité de Blocage / Assignation",
      temps: "Continuité temporelle",
      espace: "Désaccord soi / autrui",
      desc: "Plafond de verre. L'opérateur s'estime compétent pour progresser mais l'institution le maintient à un poste subalterne.",
      statut: "Salariés bloqués, ouvriers qualifiés non reconnus.",
    },
    q3: {
      titre: "Identité de Conversion / Mobilité",
      temps: "Rupture temporelle",
      espace: "Accord soi / autrui",
      desc: "Reconversion réussie. L'individu opère une rupture choisie que l'environnement valide par un nouveau diplôme ou statut.",
      statut: "Reprise d'études Cnam, reconversion ingénieur.",
    },
    q4: {
      titre: "Identité de Crise / Déclassement",
      temps: "Rupture temporelle",
      espace: "Désaccord soi / autrui",
      desc: "Rupture subie. Perte de statut, licenciement économique, sentiment de trahison et perte des repères professionnels.",
      statut: "Seniors licenciés, chômage involontaire.",
    },
  };

  const curQ = quadrants[selectedQuadrant] || quadrants.q1;

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
            TRANSACTION BIOGRAPHIQUE ⟷ TRANSACTION RELATIONNELLE
          </text>
          <text x="130" y="245" fill="#cbd5e1" fontSize="10" textAnchor="start">
            ← Identité pour soi
          </text>
          <text x="730" y="245" fill="#cbd5e1" fontSize="10" textAnchor="end">
            Identité pour autrui →
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
            ↑ Continuité (Stabilité)
          </text>
          <text x="420" y="475" fill="#cbd5e1" fontSize="10">
            ↓ Rupture (Changement)
          </text>

          {/* Q1: Continuité + Accord (Haut-Droit) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedQuadrant("q1")}
          >
            <rect
              x="430"
              y="60"
              width="310"
              height="180"
              rx="16"
              fill="#064e3b"
              stroke={selectedQuadrant === "q1" ? "#34d399" : "#059669"}
              strokeWidth={selectedQuadrant === "q1" ? "3" : "1.5"}
            />
            <text
              x="585"
              y="100"
              fill="#a7f3d0"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              1. IDENTITÉ D&apos;ENTREPRISE
            </text>
            <text
              x="585"
              y="122"
              fill="#d1fae5"
              fontSize="11"
              textAnchor="middle"
            >
              Continuité + Accord
            </text>
            <text
              x="585"
              y="155"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Promotion interne · Carrière fidèle
            </text>
            <text
              x="585"
              y="175"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Reconnaissance managériale acquise
            </text>
          </g>

          {/* Q2: Continuité + Désaccord (Haut-Gauche) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedQuadrant("q2")}
          >
            <rect
              x="80"
              y="60"
              width="310"
              height="180"
              rx="16"
              fill="#78350f"
              stroke={selectedQuadrant === "q2" ? "#fbbf24" : "#d97706"}
              strokeWidth={selectedQuadrant === "q2" ? "3" : "1.5"}
            />
            <text
              x="235"
              y="100"
              fill="#fde68a"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              2. IDENTITÉ DE BLOCAGE
            </text>
            <text
              x="235"
              y="122"
              fill="#fef3c7"
              fontSize="11"
              textAnchor="middle"
            >
              Continuité + Désaccord
            </text>
            <text
              x="235"
              y="155"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Plafond de verre · Assignation subie
            </text>
            <text
              x="235"
              y="175"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Compétences non reconnues par les chefs
            </text>
          </g>

          {/* Q3: Rupture + Accord (Bas-Droit) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedQuadrant("q3")}
          >
            <rect
              x="430"
              y="280"
              width="310"
              height="180"
              rx="16"
              fill="#1e1b4b"
              stroke={selectedQuadrant === "q3" ? "#a855f7" : "#6366f1"}
              strokeWidth={selectedQuadrant === "q3" ? "3" : "1.5"}
            />
            <text
              x="585"
              y="320"
              fill="#d8b4fe"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              3. IDENTITÉ DE CONVERSION
            </text>
            <text
              x="585"
              y="342"
              fill="#e9d5ff"
              fontSize="11"
              textAnchor="middle"
            >
              Rupture temporelle + Accord social
            </text>
            <text
              x="585"
              y="375"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Reconversion choisie · Mobilité valorisée
            </text>
            <text
              x="585"
              y="395"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Nouvelle vocation validée par diplôme
            </text>
          </g>

          {/* Q4: Rupture + Désaccord (Bas-Gauche) */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedQuadrant("q4")}
          >
            <rect
              x="80"
              y="280"
              width="310"
              height="180"
              rx="16"
              fill="#7f1d1d"
              stroke={selectedQuadrant === "q4" ? "#f87171" : "#dc2626"}
              strokeWidth={selectedQuadrant === "q4" ? "3" : "1.5"}
            />
            <text
              x="235"
              y="320"
              fill="#fecaca"
              fontSize="13.5"
              fontWeight="black"
              textAnchor="middle"
            >
              4. IDENTITÉ DE CRISE
            </text>
            <text
              x="235"
              y="342"
              fill="#fee2e2"
              fontSize="11"
              textAnchor="middle"
            >
              Rupture + Désaccord
            </text>
            <text
              x="235"
              y="375"
              fill="#e2e8f0"
              fontSize="10.5"
              textAnchor="middle"
            >
              Licenciement · Rupture de trajectoire
            </text>
            <text
              x="235"
              y="395"
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
            >
              Disqualification sociale &amp; Déclassement
            </text>
          </g>
        </svg>
      </div>

      {curQ && (
        <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-900/50 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-900 dark:text-cyan-300 text-sm">
              Quadrant : {curQ.titre}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-bold">
              {curQ.temps} · {curQ.espace}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            {curQ.desc} <em>(Exemples : {curQ.statut})</em>
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 9. SAINSAULIEU (PST123) : LA TYPOLOGIE DES CULTURES D'ENTREPRISE
// =========================================================================
