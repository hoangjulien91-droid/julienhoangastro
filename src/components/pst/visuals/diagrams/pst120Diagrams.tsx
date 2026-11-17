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
// 3. DEJOURS (PST106) : LE DOUBLE JUGEMENT DE LA RECONNAISSANCE
// =========================================================================
export function DejoursReconnaissanceDiagram() {
  const [activeBranch, setActiveBranch] = useState<"reconnaissance" | "deni">(
    "reconnaissance",
  );

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 520"
          className="w-full h-auto max-h-[490px] select-none text-slate-100 font-sans"
        >
          <defs>
            <linearGradient id="djGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="djRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.1" />
            </linearGradient>
            <marker
              id="djArrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 7 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Step 1: Organisation & Épreuve du Réel */}
          <rect
            x="230"
            y="20"
            width="360"
            height="50"
            rx="12"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <text
            x="410"
            y="42"
            fill="#e2e8f0"
            fontSize="13"
            fontWeight="bold"
            textAnchor="middle"
          >
            1. ÉPREUVE DU RÉEL &amp; SOUFFRANCE
          </text>
          <text x="410" y="58" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Le réel résiste à la technique ➔ Échec initial &amp; Souffrance
            créatrice
          </text>

          {/* Arrow down */}
          <line
            x1="410"
            y1="70"
            x2="410"
            y2="100"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#djArrow)"
          />

          {/* Step 2: Mobilisation subjective & Intelligence Métis */}
          <rect
            x="200"
            y="105"
            width="420"
            height="55"
            rx="14"
            fill="#312e81"
            stroke="#6366f1"
            strokeWidth="2"
          />
          <text
            x="410"
            y="128"
            fill="#c7d2fe"
            fontSize="13"
            fontWeight="black"
            textAnchor="middle"
          >
            2. MOBILISATION SUBJECTIVE &amp; TRICHE LÉGITIME
          </text>
          <text
            x="410"
            y="146"
            fill="#e0e7ff"
            fontSize="10.5"
            textAnchor="middle"
          >
            Intelligence pratique (Métis) · Ruse · Zèle nécessaire · Production
            de l&apos;Écart
          </text>

          {/* Arrow down */}
          <line
            x1="410"
            y1="160"
            x2="410"
            y2="195"
            stroke="#94a3b8"
            strokeWidth="2"
            markerEnd="url(#djArrow)"
          />

          {/* Step 3: PIVOT - LE DOUBLE JUGEMENT */}
          <rect
            x="130"
            y="200"
            width="560"
            height="40"
            rx="10"
            fill="#0f172a"
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          <text
            x="410"
            y="225"
            fill="#f8fafc"
            fontSize="14"
            fontWeight="black"
            textAnchor="middle"
          >
            ⚖️ LE DOUBLE JUGEMENT DE LA RECONNAISSANCE
          </text>

          {/* Left Wing: Jugement d'Utilité */}
          <rect
            x="60"
            y="260"
            width="320"
            height="75"
            rx="14"
            fill="#0c4a6e"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
          <text
            x="220"
            y="285"
            fill="#7dd3fc"
            fontSize="12.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            A. JUGEMENT D&apos;UTILITÉ
          </text>
          <text
            x="220"
            y="304"
            fill="#e0f2fe"
            fontSize="10.5"
            textAnchor="middle"
          >
            Rendu par : Hiérarchie &amp; Clients
          </text>
          <text
            x="220"
            y="322"
            fill="#bae6fd"
            fontSize="9.5"
            textAnchor="middle"
          >
            Critères : Efficacité, rentabilité, utilité économique
          </text>

          {/* Right Wing: Jugement de Beauté */}
          <rect
            x="440"
            y="260"
            width="320"
            height="75"
            rx="14"
            fill="#4c1d95"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />
          <text
            x="600"
            y="285"
            fill="#d8b4fe"
            fontSize="12.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            B. JUGEMENT DE BEAUTÉ / QUALITÉ
          </text>
          <text
            x="600"
            y="304"
            fill="#f3e8ff"
            fontSize="10.5"
            textAnchor="middle"
          >
            Rendu par : Les Pairs &amp; Le Collectif
          </text>
          <text
            x="600"
            y="322"
            fill="#e9d5ff"
            fontSize="9.5"
            textAnchor="middle"
          >
            Critères : Règles de l&apos;art, élégance du geste, conformité
            métier
          </text>

          {/* Bifurcation down */}
          <line
            x1="220"
            y1="335"
            x2="220"
            y2="375"
            stroke="#10b981"
            strokeWidth="2.5"
            markerEnd="url(#djArrow)"
          />
          <line
            x1="600"
            y1="335"
            x2="600"
            y2="375"
            stroke="#ef4444"
            strokeWidth="2.5"
            markerEnd="url(#djArrow)"
          />

          {/* Success Outcome: Sublimation */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveBranch("reconnaissance")}
          >
            <rect
              x="60"
              y="380"
              width="320"
              height="115"
              rx="16"
              fill="url(#djGreen)"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            <text
              x="220"
              y="410"
              fill="#34d399"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              ✅ SUBLIMATION &amp; SANTÉ
            </text>
            <text
              x="220"
              y="432"
              fill="#ecfdf5"
              fontSize="11"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Rapatriement de la souffrance
            </text>
            <text
              x="220"
              y="452"
              fill="#d1fae5"
              fontSize="10"
              textAnchor="middle"
            >
              Construction de l&apos;identité
            </text>
            <text
              x="220"
              y="470"
              fill="#a7f3d0"
              fontSize="10"
              textAnchor="middle"
            >
              Appartenance au collectif &amp; Santé psychique
            </text>
          </g>

          {/* Failure Outcome: Souffrance Pathogène */}
          <g className="cursor-pointer" onClick={() => setActiveBranch("deni")}>
            <rect
              x="440"
              y="380"
              width="320"
              height="115"
              rx="16"
              fill="url(#djRed)"
              stroke="#ef4444"
              strokeWidth="2.5"
            />
            <text
              x="600"
              y="410"
              fill="#f87171"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              ❌ DÉNI &amp; SOUFFRANCE PATHOGÈNE
            </text>
            <text
              x="600"
              y="432"
              fill="#fff1f2"
              fontSize="11"
              fontWeight="semibold"
              textAnchor="middle"
            >
              Invisibilisation de l&apos;effort
            </text>
            <text
              x="600"
              y="452"
              fill="#fecdd3"
              fontSize="10"
              textAnchor="middle"
            >
              Stratégies défensives : déni du risque, cynisme
            </text>
            <text
              x="600"
              y="470"
              fill="#fda4af"
              fontSize="10"
              textAnchor="middle"
            >
              Somatisations, burn-out et décompensation
            </text>
          </g>
        </svg>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          Formule clé Dejours :{" "}
          <span className="font-mono text-cyan-600 dark:text-cyan-400">
            Reconnaissance = Gratitude de l&apos;effort ➔ Sublimation
          </span>
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
          Canon Examen
        </span>
      </div>
    </div>
  );
}

