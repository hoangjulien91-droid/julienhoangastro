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
} from "lucide-react";

// =========================================================================
// 1. LEPLAT & HOC (PST106) : MODÈLE TÂCHE - ACTIVITÉ & RÉGULATION
// =========================================================================
export function LeplatHocDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>("activite");

  const nodesInfo: Record<
    string,
    { titre: string; detail: string; role: string; couleur: string }
  > = {
    prescrit: {
      titre: "Tâche Prescrite (Organisation)",
      detail:
        "Ce qui est fixé par la direction : consignes, cadences, modes opératoires, machines et normes de sécurité. Buts assignés et contraintes temporelles.",
      role: "Entrée organisationnelle",
      couleur: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    },
    internes: {
      titre: "Conditions Internes de l'Opérateur",
      detail:
        "Ressources propres de l'opérateur : fatigue accumulée, âge, niveau d'expertise, état de santé, motivation et représentations du travail.",
      role: "Facteur humain singulier",
      couleur: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10",
    },
    externes: {
      titre: "Conditions Externes Réelles",
      detail:
        "Ce que le prescrit n'a pas prévu : aléas techniques, pannes de machines, variabilité des matières premières, bruit, urgences clients.",
      role: "Aléas du réel",
      couleur: "text-rose-500 border-rose-500/30 bg-rose-500/10",
    },
    activite: {
      titre: "Activité Réelle (Le Compromis Régulateur)",
      detail:
        "Cœur de l'ergonomie : l'opérateur déploie des stratégies cognitives, des savoir-faire de prudence et des compromis opératoires pour surmonter l'écart.",
      role: "Processus central",
      couleur: "text-indigo-500 border-indigo-500/30 bg-indigo-500/10",
    },
    systeme: {
      titre: "Effets sur le Système (Performance)",
      detail:
        "Résultats productifs : qualité des pièces, productivité mesurée, respect des délais de livraison, rebuts évités et incidents maîtrisés.",
      role: "Sortie productive",
      couleur: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    },
    homme: {
      titre: "Effets sur l'Homme (Santé & Usure)",
      detail:
        "Impacts sur l'opérateur : usure physique, TMS, stress, fatigue OU apprentissages, satisfaction du travail bien fait et développement de compétences.",
      role: "Sortie humaine",
      couleur: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    },
  };

  const currentInfo = activeNode ? nodesInfo[activeNode] : nodesInfo.activite;

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 490"
          className="w-full h-auto max-h-[480px] select-none text-slate-100 font-sans"
        >
          <defs>
            <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id="gradEmerald"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.1" />
            </linearGradient>

            <marker
              id="arrowHead"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 8 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker
              id="arrowHeadActive"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 8 3.5, 0 7" fill="#6366f1" />
            </marker>
          </defs>

          {/* Links / Connectors */}
          {/* Top to Center */}
          <line
            x1="410"
            y1="95"
            x2="410"
            y2="175"
            stroke={
              activeNode === "prescrit" || activeNode === "activite"
                ? "#6366f1"
                : "#475569"
            }
            strokeWidth="2.5"
            markerEnd="url(#arrowHeadActive)"
          />

          {/* Left to Center */}
          <line
            x1="240"
            y1="225"
            x2="295"
            y2="225"
            stroke={
              activeNode === "internes" || activeNode === "activite"
                ? "#06b6d4"
                : "#475569"
            }
            strokeWidth="2.5"
            markerEnd="url(#arrowHead)"
          />

          {/* Right to Center */}
          <line
            x1="580"
            y1="225"
            x2="525"
            y2="225"
            stroke={
              activeNode === "externes" || activeNode === "activite"
                ? "#f43f5e"
                : "#475569"
            }
            strokeWidth="2.5"
            markerEnd="url(#arrowHead)"
          />

          {/* Center to Bottom Left */}
          <path
            d="M 370 285 L 370 325 L 230 325 L 230 355"
            fill="none"
            stroke={
              activeNode === "systeme" || activeNode === "activite"
                ? "#10b981"
                : "#475569"
            }
            strokeWidth="2"
            markerEnd="url(#arrowHead)"
          />

          {/* Center to Bottom Right */}
          <path
            d="M 450 285 L 450 325 L 590 325 L 590 355"
            fill="none"
            stroke={
              activeNode === "homme" || activeNode === "activite"
                ? "#a855f7"
                : "#475569"
            }
            strokeWidth="2"
            markerEnd="url(#arrowHead)"
          />

          {/* Feedback Loop from Effets sur l'Homme to Conditions Internes */}
          <path
            d="M 460 420 C 460 470, 70 470, 70 280"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeDasharray="5,4"
            markerEnd="url(#arrowHead)"
          />
          <text
            x="210"
            y="475"
            fill="#c084fc"
            fontSize="10"
            fontStyle="italic"
            textAnchor="middle"
          >
            Boucle de rétroaction : la fatigue modifie les conditions internes
            futures
          </text>

          {/* 1. TÂCHE PRESCRITE CARD */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("prescrit")}
          >
            <rect
              x="210"
              y="25"
              width="400"
              height="70"
              rx="16"
              fill="url(#gradAmber)"
              stroke={activeNode === "prescrit" ? "#f59e0b" : "#b45309"}
              strokeWidth={activeNode === "prescrit" ? "2.5" : "1.5"}
            />
            <text
              x="410"
              y="52"
              fill="#fbbf24"
              fontSize="15"
              fontWeight="bold"
              textAnchor="middle"
            >
              TÂCHE PRESCRITE (Buts &amp; Consignes)
            </text>
            <text
              x="410"
              y="74"
              fill="#cbd5e1"
              fontSize="11"
              textAnchor="middle"
            >
              Objectifs fixés · Procédures · Cadences · Règles de sécurité
            </text>
          </g>

          {/* 2. CONDITIONS INTERNES CARD */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("internes")}
          >
            <rect
              x="30"
              y="180"
              width="210"
              height="90"
              rx="14"
              fill="url(#gradCyan)"
              stroke={activeNode === "internes" ? "#06b6d4" : "#0e7490"}
              strokeWidth={activeNode === "internes" ? "2.5" : "1.5"}
            />
            <text
              x="135"
              y="210"
              fill="#38bdf8"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              CONDITIONS INTERNES
            </text>
            <text
              x="135"
              y="230"
              fill="#94a3b8"
              fontSize="10.5"
              textAnchor="middle"
            >
              Fatigue · Âge · Compétences
            </text>
            <text
              x="135"
              y="248"
              fill="#94a3b8"
              fontSize="10.5"
              textAnchor="middle"
            >
              Expérience · Représentations
            </text>
          </g>

          {/* 3. ACTIVITÉ RÉELLE CARD (CENTER) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("activite")}
          >
            <rect
              x="305"
              y="175"
              width="210"
              height="105"
              rx="18"
              fill="url(#gradIndigo)"
              stroke={activeNode === "activite" ? "#818cf8" : "#4f46e5"}
              strokeWidth={activeNode === "activite" ? "3" : "2"}
            />
            <circle cx="410" cy="202" r="14" fill="#4f46e5" />
            <text
              x="410"
              y="206"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              ⚡
            </text>
            <text
              x="410"
              y="232"
              fill="#ffffff"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              ACTIVITÉ RÉELLE
            </text>
            <text
              x="410"
              y="250"
              fill="#a5b4fc"
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              Régulation &amp; Compromis
            </text>
            <text
              x="410"
              y="267"
              fill="#cbd5e1"
              fontSize="9.5"
              textAnchor="middle"
            >
              Ajustements face à l&apos;écart
            </text>
          </g>

          {/* 4. CONDITIONS EXTERNES CARD */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("externes")}
          >
            <rect
              x="580"
              y="180"
              width="210"
              height="90"
              rx="14"
              fill="url(#gradRose)"
              stroke={activeNode === "externes" ? "#f43f5e" : "#be123c"}
              strokeWidth={activeNode === "externes" ? "2.5" : "1.5"}
            />
            <text
              x="685"
              y="210"
              fill="#fb7185"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              CONDITIONS EXTERNES
            </text>
            <text
              x="685"
              y="230"
              fill="#94a3b8"
              fontSize="10.5"
              textAnchor="middle"
            >
              Aléas réels · Pannes
            </text>
            <text
              x="685"
              y="248"
              fill="#94a3b8"
              fontSize="10.5"
              textAnchor="middle"
            >
              Matières variables · Bruit
            </text>
          </g>

          {/* 5. EFFETS SYSTÈME CARD */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("systeme")}
          >
            <rect
              x="90"
              y="355"
              width="280"
              height="80"
              rx="14"
              fill="url(#gradEmerald)"
              stroke={activeNode === "systeme" ? "#10b981" : "#047857"}
              strokeWidth={activeNode === "systeme" ? "2.5" : "1.5"}
            />
            <text
              x="230"
              y="385"
              fill="#34d399"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              EFFETS SUR LE SYSTÈME
            </text>
            <text
              x="230"
              y="405"
              fill="#cbd5e1"
              fontSize="10.5"
              textAnchor="middle"
            >
              Qualité · Productivité · Délais
            </text>
            <text
              x="230"
              y="420"
              fill="#94a3b8"
              fontSize="9.5"
              textAnchor="middle"
            >
              Incidents &amp; Pannes évités
            </text>
          </g>

          {/* 6. EFFETS HOMME CARD */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => setActiveNode("homme")}
          >
            <rect
              x="450"
              y="355"
              width="280"
              height="80"
              rx="14"
              fill="url(#gradPurple)"
              stroke={activeNode === "homme" ? "#c084fc" : "#7e22ce"}
              strokeWidth={activeNode === "homme" ? "2.5" : "1.5"}
            />
            <text
              x="590"
              y="385"
              fill="#d8b4fe"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              EFFETS SUR L&apos;HOMME
            </text>
            <text
              x="590"
              y="405"
              fill="#cbd5e1"
              fontSize="10.5"
              textAnchor="middle"
            >
              Santé · Fatigue · TMS · Stress
            </text>
            <text
              x="590"
              y="420"
              fill="#94a3b8"
              fontSize="9.5"
              textAnchor="middle"
            >
              OU Savoir-faire &amp; Compétences
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Explanatory Pill */}
      {currentInfo && (
        <div
          className={`p-4 rounded-2xl border ${currentInfo.couleur} space-y-1 transition-all`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="size-4" />
              {currentInfo.titre}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
              {currentInfo.role}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            {currentInfo.detail}
          </p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 2. CLOT (PST106) : L'ICEBERG DU RÉEL & LE GENRE PROFESSIONNEL
// =========================================================================
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

// =========================================================================
// 4. BOURDIEU (PST108) : L'ALGORITHME DE LA PRATIQUE SOCIALE
// =========================================================================
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
export function HonnethSpheresDiagram() {
  const [activeLevel, setActiveLevel] = useState<number>(3);

  const spheres = [
    {
      num: 1,
      titre: "Sphère de l'Amour & des Affections",
      espace: "Famille, Amitié, Relations intimes",
      rapport: "CONFIANCE EN SOI (Selbstvertrauen)",
      rapportDesc:
        "Sécurité affective, acceptation inconditionnelle du corps et des besoins.",
      mepris: "Violences physiques, abus, humiliation corporelle",
      bg: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-500",
    },
    {
      num: 2,
      titre: "Sphère du Droit & de la Citoyenneté",
      espace: "Communauté juridique, État de droit",
      rapport: "RESPECT DE SOI (Selbstachtung)",
      rapportDesc:
        "Statut de citoyen à part entière, titulaire des mêmes droits que les autres.",
      mepris: "Déni de droits, discrimination, relégation de seconde zone",
      bg: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-500",
    },
    {
      num: 3,
      titre: "Sphère de la Solidarité & du Travail",
      espace: "Monde du travail, Communauté de valeurs",
      rapport: "ESTIME DE SOI (Selbstschätzung)",
      rapportDesc:
        "Reconnaissance de la contribution sociale singulière et des compétences utiles.",
      mepris:
        "Dévalorisation du travail, invisibilisation, déqualification morale",
      bg: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {spheres.map((s) => {
          const isSelected = activeLevel === s.num;
          return (
            <div
              key={s.num}
              onClick={() => setActiveLevel(s.num)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer bg-gradient-to-r ${s.bg} ${
                isSelected
                  ? "ring-2 ring-cyan-500 shadow-lg scale-[1.01]"
                  : "opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-xl bg-black/20 dark:bg-white/10 flex items-center justify-center font-bold font-mono text-xs">
                    {s.num}
                  </span>
                  <h4 className="font-black text-sm text-slate-900 dark:text-slate-100 m-0">
                    {s.titre}
                  </h4>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                  {s.espace}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Rapport positif à soi acquis :
                  </span>
                  <strong className="text-slate-900 dark:text-slate-100 font-extrabold text-sm">
                    {s.rapport}
                  </strong>
                  <p className="m-0 text-slate-700 dark:text-slate-300 text-[11px] mt-0.5 leading-snug">
                    {s.rapportDesc}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-rose-700 dark:text-rose-300">
                    Forme de mépris / lésion :
                  </span>
                  <span className="text-rose-900 dark:text-rose-200 font-medium text-[11px] leading-snug block mt-0.5">
                    ❌ {s.mepris}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-slate-900 text-slate-300 text-xs flex items-center justify-between">
        <span>
          L&apos;estime de soi au travail (3e sphère) repose sur la solidité
          préalable des 2 premières.
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
          Axel Honneth 1992
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 7. VALLS & CASTRA (PST108) : L'ENTONNOIR INVERSÉ IOD
// =========================================================================
export function VallsCastraIodDiagram() {
  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-3 sm:p-5 border border-slate-800 shadow-xl overflow-hidden">
        <svg
          viewBox="0 0 820 500"
          className="w-full h-auto max-h-[480px] select-none text-slate-100 font-sans"
        >
          {/* Dividing Axis */}
          <line
            x1="410"
            y1="20"
            x2="410"
            y2="480"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* LEFT: CLASSIQUE ENTONNOIR */}
          <text
            x="205"
            y="45"
            fill="#f87171"
            fontSize="14"
            fontWeight="black"
            textAnchor="middle"
          >
            MODÈLE CLASSIQUE : ENTONNOIR EXCLUANT
          </text>
          <text
            x="205"
            y="65"
            fill="#94a3b8"
            fontSize="10.5"
            textAnchor="middle"
          >
            Tri par l&apos;employabilité &amp; élimination des plus fragiles
          </text>

          {/* Funnel Shapes Left */}
          <polygon
            points="50,90 360,90 320,170 90,170"
            fill="#7f1d1d"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text
            x="205"
            y="135"
            fill="#fecaca"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            100 Demandeurs au départ (Tous publics)
          </text>

          <polygon
            points="90,175 320,175 275,260 135,260"
            fill="#991b1b"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text
            x="205"
            y="215"
            fill="#fee2e2"
            fontSize="10.5"
            textAnchor="middle"
          >
            Tamis : Bilans, Tests &amp; Stages infinis
          </text>
          <text
            x="205"
            y="235"
            fill="#fca5a5"
            fontSize="10"
            fontStyle="italic"
            textAnchor="middle"
          >
            (Élimination des profils atypiques)
          </text>

          <polygon
            points="135,265 275,265 235,360 175,360"
            fill="#b91c1c"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text
            x="205"
            y="315"
            fill="#ffffff"
            fontSize="11"
            fontWeight="black"
            textAnchor="middle"
          >
            5 à 10 Élus
          </text>
          <text
            x="205"
            y="335"
            fill="#fecaca"
            fontSize="9.5"
            textAnchor="middle"
          >
            Ceux déjà proches de l&apos;emploi
          </text>

          <rect
            x="70"
            y="390"
            width="270"
            height="70"
            rx="12"
            fill="#1e293b"
            stroke="#dc2626"
            strokeWidth="1.5"
          />
          <text
            x="205"
            y="418"
            fill="#f87171"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            BILAN PERVERS DU TRI :
          </text>
          <text
            x="205"
            y="438"
            fill="#cbd5e1"
            fontSize="10"
            textAnchor="middle"
          >
            Renforce l&apos;inemployabilité perçue
          </text>
          <text
            x="205"
            y="452"
            fill="#cbd5e1"
            fontSize="10"
            textAnchor="middle"
          >
            des personnes les plus vulnérables.
          </text>

          {/* RIGHT: IOD ENTONNOIR INVERSÉ */}
          <text
            x="615"
            y="45"
            fill="#34d399"
            fontSize="14"
            fontWeight="black"
            textAnchor="middle"
          >
            MÉTHODE IOD : L&apos;ENTONNOIR INVERSÉ
          </text>
          <text
            x="615"
            y="65"
            fill="#94a3b8"
            fontSize="10.5"
            textAnchor="middle"
          >
            Refus de la sélection + Action directe sur l&apos;Offre
          </text>

          {/* Inverted Funnel Shapes Right */}
          <rect
            x="525"
            y="90"
            width="180"
            height="50"
            rx="12"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text
            x="615"
            y="115"
            fill="#a7f3d0"
            fontSize="11.5"
            fontWeight="black"
            textAnchor="middle"
          >
            1 Candidat Vulnérable
          </text>
          <text
            x="615"
            y="130"
            fill="#ecfdf5"
            fontSize="9.5"
            textAnchor="middle"
          >
            (ZÉRO sélection, ZÉRO test préalable)
          </text>

          <line
            x1="615"
            y1="140"
            x2="615"
            y2="180"
            stroke="#10b981"
            strokeWidth="3"
            markerEnd="url(#arrowHead)"
          />

          <polygon
            points="525,185 705,185 780,310 450,310"
            fill="#047857"
            stroke="#34d399"
            strokeWidth="2"
          />
          <text
            x="615"
            y="225"
            fill="#ffffff"
            fontSize="13"
            fontWeight="black"
            textAnchor="middle"
          >
            NÉGOCIATION SUR L&apos;OFFRE
          </text>
          <text
            x="615"
            y="248"
            fill="#d1fae5"
            fontSize="10.5"
            textAnchor="middle"
          >
            • Dialogue direct avec l&apos;employeur de droit commun
          </text>
          <text
            x="615"
            y="268"
            fill="#d1fae5"
            fontSize="10.5"
            textAnchor="middle"
          >
            • Aménagement des conditions d&apos;accueil &amp; tutorat
          </text>
          <text
            x="615"
            y="288"
            fill="#d1fae5"
            fontSize="10.5"
            textAnchor="middle"
          >
            • Droit à l&apos;erreur initial garanti
          </text>

          <rect
            x="450"
            y="330"
            width="330"
            height="130"
            rx="16"
            fill="#065f46"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text
            x="615"
            y="365"
            fill="#6ee7b7"
            fontSize="13"
            fontWeight="black"
            textAnchor="middle"
          >
            INTÉGRATION EN MILIEU ORDINAIRE
          </text>
          <text
            x="615"
            y="390"
            fill="#ecfdf5"
            fontSize="11"
            textAnchor="middle"
          >
            Médiation active PENDANT l&apos;emploi
          </text>
          <text
            x="615"
            y="410"
            fill="#d1fae5"
            fontSize="10.5"
            textAnchor="middle"
          >
            La compétence s&apos;acquiert sur le poste réel
          </text>
          <text
            x="615"
            y="435"
            fill="#ffffff"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            Taux d&apos;insertion durable &gt; 70%
          </text>
        </svg>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 text-xs">
        <strong className="text-emerald-900 dark:text-emerald-300">
          Règle d&apos;or Cnam IOD :
        </strong>{" "}
        <span className="text-slate-700 dark:text-slate-300">
          On n&apos;adapte pas l&apos;homme au travail par des stages de
          rééducation ; on négocie avec le patron pour adapter
          l&apos;environnement de travail à l&apos;homme.
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 8. DUBAR (PST123) : LA DOUBLE TRANSACTION IDENTITAIRE
// =========================================================================
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
export function CastelDesaffiliationDiagram() {
  const [activeZone, setActiveZone] = useState<number>(2);

  const zones = [
    {
      num: 1,
      titre: "1. ZONE D'INTÉGRATION SOCIALE",
      emploi: "Travail stable garanti (CDI, statut salarial protecteur)",
      liens: "Insertion relationnelle solide (famille, amis, syndicats)",
      etat: "Sécurité ontologique · Pleine citoyenneté",
      bg: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-500",
    },
    {
      num: 2,
      titre: "2. ZONE DE VULNÉRABILITÉ",
      emploi: "Précarité de l'emploi (CDD courts, intérim, ubérisation)",
      liens: "Fragilité relationnelle (divorce, déménagement, isolement)",
      etat: "Antichambre du décrochage · Vivre au jour le jour sous tension",
      bg: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-500",
    },
    {
      num: 3,
      titre: "3. ZONE DE DÉSAFFILIATION",
      emploi: "Non-travail (Chômage de longue durée, inactivité forcée)",
      liens: "Rupture totale des attaches sociales protectrices",
      etat: "Invisibilité sociale · Désaffiliation citoyenne",
      bg: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-500",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {zones.map((z) => {
          const isSelected = activeZone === z.num;
          return (
            <div
              key={z.num}
              onClick={() => setActiveZone(z.num)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer bg-gradient-to-r ${z.bg} ${
                isSelected
                  ? "ring-2 ring-cyan-500 shadow-lg scale-[1.01]"
                  : "opacity-90 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-black text-sm text-slate-900 dark:text-slate-100 m-0">
                  {z.titre}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                  {z.etat}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Axe Économique &amp; Emploi :
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold text-[11px] leading-snug block mt-0.5">
                    💼 {z.emploi}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    Axe Relationnel &amp; Sociabilité :
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold text-[11px] leading-snug block mt-0.5">
                    🤝 {z.liens}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs text-slate-800 dark:text-slate-200">
        <strong className="text-amber-800 dark:text-amber-300">
          Robert Castel (1995) :
        </strong>{" "}
        La désaffiliation n&apos;est pas un état figé (&quot;les exclus&quot;),
        mais une <strong>trajectoire de précarisation continue</strong>{" "}
        articulant la détérioration du rapport à l&apos;emploi et la dégradation
        des protections relationnelles.
      </div>
    </div>
  );
}

// =========================================================================
// 11. BÜHLER (PST108) : LE MODÈLE DE L'ORGANON DU LANGAGE
// =========================================================================
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
// 12. CARTOGRAPHIE LAGABRIELLE (PST106) : LES COURANTS DE LA PSYCHOLOGIE DU TRAVAIL
// =========================================================================
export function CartographieLagabrielleDiagram() {
  const [activeNode, setActiveNode] = useState<string>("activite");

  const nodes: Record<
    string,
    { titre: string; auteur: string; desc: string; role: string; couleur: string }
  > = {
    pto: {
      titre: "Psychologie du Travail & des Organisations (Champ Global)",
      auteur: "Approche générale (USA & Europe)",
      desc: "Champ très vaste englobant la sélection RH, le recrutement, l'évaluation des compétences, la psychologie cognitive, l'orientation professionnelle et l'ergonomie physique. Souvent orientée vers l'adaptation de l'opérateur aux besoins de performance de l'entreprise.",
      role: "Discipline englobante",
      couleur: "text-slate-400 border-slate-700 bg-slate-900/60",
    },
    clinique: {
      titre: "La Clinique du Travail (Spécificité Francophone)",
      auteur: "Tradition Cnam & Université",
      desc: "Née après la Deuxième Guerre mondiale en rupture avec la psychotechnique positiviste. Postulat fondateur : le travail n'est pas un simple domaine d'application périphérique, mais un opérateur central de la santé mentale et du psychisme humain. Primauté accordée à la subjectivité.",
      role: "Sous-discipline clinique",
      couleur: "text-amber-400 border-amber-500/40 bg-amber-950/20",
    },
    dejours: {
      titre: "Psychodynamique du Travail (PST120)",
      auteur: "Christophe Dejours (Chaire Cnam 1990-2009)",
      desc: "Focalisée sur l'analyse de la souffrance, du plaisir et des stratégies de défense (individuelles et collectives). Le travail est une épreuve du réel. La santé repose sur la reconnaissance par autrui via le jugement d'utilité (hiérarchie) et le jugement de beauté (pairs).",
      role: "Branche psychanalytique du travail",
      couleur: "text-rose-400 border-rose-500/40 bg-rose-950/20",
    },
    activite: {
      titre: "Clinique de l'Activité (PST106)",
      auteur: "Yves Clot / CRTD Cnam (Chaire Cnam 2000-2021)",
      desc: "Fondée sur la théorie historico-culturelle de Vygotski. Le travail n'est utile que s'il est un moyen d'agir sur le travail et de le transformer. Analyse du conflit entre l'activité réalisée et le réel de l'activité (le non-réalisé, l'empêché). Régénération du pouvoir d'agir par le genre professionnel et le style.",
      role: "Branche historico-culturelle de l'activité",
      couleur: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20",
    },
  };

  const cur = nodes[activeNode] || nodes.activite;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto">
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
          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1 transition-all ${cur.couleur}`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-white text-sm">{cur.titre}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold opacity-80">
              {cur.role} · {cur.auteur}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{cur.desc}</p>
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
    { titre: string; desc: string; formule: string; couleur: string }
  > = {
    piaget: {
      titre: "Trajectoire selon Jean Piaget (Constructivisme cognitif)",
      desc: "Pour Piaget, la pensée précède et gouverne le langage. L'enfant commence par une pensée autistique/égocentrique (incommunicable). Le langage égocentrique n'est qu'un accompagnement asocial de l'action. Il s'étiole et disparaît progressivement avec la socialisation et la décentration cognitive.",
      formule: "Pensée égocentrique ➔ Langage égocentrique (asocial, voué à disparaître) ➔ Langage socialisé",
      couleur: "text-amber-300 border-amber-500/40 bg-amber-950/20",
    },
    vygotski: {
      titre: "Trajectoire selon Lev Vygotski (Théorie historico-culturelle)",
      desc: "Renversement complet : le langage est originellement social et relationnel. Face à un obstacle (ex. l'expérience des crayons de couleur), l'enfant extériorise sa pensée à voix haute pour résoudre le problème. Ce langage égocentrique ne disparaît JAMAIS : il s'intériorise pour devenir le langage intérieur (la pensée verbale silencieuse).",
      formule: "Langage social (relationnel) ➔ Langage égocentrique (outil de résolution) ➔ Langage intérieur (pensée)",
      couleur: "text-indigo-300 border-indigo-500/40 bg-indigo-950/20",
    },
    zpd: {
      titre: "La Zone Proximale de Développement (ZPD) de Vygotski",
      desc: "Écart fécond entre le niveau de développement actuel (ce que l'individu sait résoudre seul en autonomie) et le niveau de développement potentiel (ce qu'il peut accomplir guidé par un tuteur ou en coopération avec des pairs plus compétents). C'est le lieu même où opèrent les dispositifs cliniques au Cnam !",
      formule: "Développement Actuel ➔ [ Zone Proximale de Développement (Médiation Sociale) ] ➔ Développement Potentiel",
      couleur: "text-emerald-300 border-emerald-500/40 bg-emerald-950/20",
    },
  };

  const cur = stepsInfo[activeStep] || stepsInfo.vygotski;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto">
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
          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-all ${cur.couleur}`}
        >
          <div className="font-bold text-white text-sm">{cur.titre}</div>
          <div className="font-mono text-xs opacity-90">{cur.formule}</div>
          <p className="text-slate-300 leading-relaxed font-sans pt-1">
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
      desc: "Le nouveau-né est submergé par un flux d'excitations pulsionnelles et sensorielles sans frontière entre dedans et dehors. Le parent offre une contenance psychique en lui prêtant un « appareil à penser les pensées » (Bion : métabolisation des éléments bêta bruts en éléments alpha pensables) jusqu'à ce que le bébé intériorise sa propre membrane pare-excitante.",
      couleur: "text-rose-300 border-rose-500/40 bg-rose-950/20",
    },
    {
      num: 2,
      titre: "2. Fonction de Réparation Symbolique",
      auteurs: "S. Freud (1920, Au-delà du principe de plaisir) · Jeu du Fort/Da",
      desc: "La pensée humaine permet de symboliser l'absence et de surmonter la détresse de la perte. Freud l'illustre par le jeu de la bobine chez son petit-fils Ernst (18 mois) : en lançant la bobine ('Fort' = partie) et en la ramenant ('Da' = voilà), l'enfant passe de la passivité d'un abandon subi à la maîtrise active de l'absence maternelle.",
      couleur: "text-amber-300 border-amber-500/40 bg-amber-950/20",
    },
    {
      num: 3,
      titre: "3. Fonction Narcissique & Continuité d'Existence",
      auteurs: "D.W. Winnicott · B. Golse (1999)",
      desc: "La pensée assure au sujet le sentiment rassurant de la continuité d'être (going-on-being). Penser permet de se sentir exister dans le temps, même dans les moments de solitude ou de rupture d'activité.",
      couleur: "text-indigo-300 border-indigo-500/40 bg-indigo-950/20",
    },
    {
      num: 4,
      titre: "4. Accès à la Tiercéité & Intersubjectivité",
      auteurs: "B. Golse · Enveloppe monadique ➔ Enveloppe triadique",
      desc: "Le passage à la communication verbale suppose la reconnaissance de l'autre comme sujet distinct. L'enfant s'arrache à la fusion mère-bébé (enveloppe monadique) grâce à l'introduction d'un tiers séparateur (le père, la parole, la règle), accédant ainsi à l'intersubjectivité et au dialogue.",
      couleur: "text-emerald-300 border-emerald-500/40 bg-emerald-950/20",
    },
  ];

  const cur = fcts.find((f) => f.num === activeFct) || fcts[0];

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 920 380"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {fcts.map((f, idx) => {
            const x = 30 + idx * 220;
            const isSel = f.num === activeFct;
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
                      ? "fill-slate-900 stroke-amber-400 stroke-2 shadow-xl"
                      : "fill-slate-950/80 stroke-slate-800 hover:stroke-slate-700 stroke-1"
                  }`}
                />
                <circle
                  cx={x + 35}
                  cy="75"
                  r="16"
                  className={isSel ? "fill-amber-600" : "fill-slate-800"}
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
                  y="180"
                  className="fill-amber-400 text-[10px] font-mono font-semibold"
                >
                  Auteurs de référence :
                </text>
                <text
                  x={x + 20}
                  y="200"
                  className="fill-slate-300 text-[11px] leading-tight"
                >
                  {f.auteurs.split("·")[0]}
                </text>
                {f.auteurs.split("·")[1] && (
                  <text
                    x={x + 20}
                    y="218"
                    className="fill-slate-400 text-[10px] leading-tight"
                  >
                    · {f.auteurs.split("·")[1]}
                  </text>
                )}

                <rect
                  x={x + 20}
                  y="280"
                  width="165"
                  height="35"
                  rx="8"
                  className={isSel ? "fill-amber-950/60" : "fill-slate-900"}
                />
                <text
                  x={x + 102}
                  y="302"
                  textAnchor="middle"
                  className={`text-[11px] font-bold ${
                    isSel ? "fill-amber-300" : "fill-slate-400"
                  }`}
                >
                  {isSel ? "Actif (cliqué)" : "Cliquer pour détails"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {cur && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-all ${cur.couleur}`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-white text-sm">{cur.titre}</span>
            <span className="font-mono text-xs opacity-90">{cur.auteurs}</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{cur.desc}</p>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 15. DUBAR (PST123) : MATRICE DES 4 FORMES IDENTITAIRES DE SOCIALISATION
// =========================================================================
export function DubarFormesIdentitairesDiagram() {
  const [activeForme, setActiveForme] = useState<string>("bloquee");

  const formes: Record<
    string,
    { titre: string; categorie: string; desc: string; auteur: string; couleur: string }
  > = {
    retrait: {
      titre: "1. Identité de Retrait / Processus d'Exclusion",
      categorie: "Continuité subie ✕ Non-reconnaissance managériale",
      auteur: "Exécutant précaire menacé (Chapitre 9 de Dubar)",
      desc: "L'organisation attribue une étiquette dévalorisée ('simple exécutant interchangeable'). Le salarié refuse d'adhérer aux objectifs de l'entreprise et investit sa vie hors-travail (famille, loisirs). Risque majeur de désaffiliation sociale (Robert Castel) et de fatalisme.",
      couleur: "text-slate-300 border-slate-700 bg-slate-900/60",
    },
    bloquee: {
      titre: "2. Identité Bloquée / De l'Ouvrier au Nouveau Professionnel",
      categorie: "Continuité de métier ✕ Non-reconnaissance des compétences",
      auteur: "Ouvrier de métier qualifié (Chapitre 10 de Dubar)",
      desc: "L'artisan ou l'ouvrier revendique une appartenance fière à son métier d'origine et à son collectif. Mais l'institution introduit de nouveaux logiciels ou une rationalisation qui nie son savoir d'expérience. L'identité est en crise car la reconnaissance hiérarchique est refusée.",
      couleur: "text-rose-300 border-rose-500/40 bg-rose-950/20",
    },
    mobilisation: {
      titre: "3. Identité d'Entreprise / Processus de Mobilisation",
      categorie: "Rupture biographique ✕ Reconnaissance institutionnelle",
      auteur: "Carriériste en promotion interne (Chapitre 11 de Dubar)",
      desc: "Le professionnel accepte de rompre avec son milieu d'origine pour épouser les valeurs de l'entreprise. En contrepartie, l'organisation lui accorde des promotions et une reconnaissance statutaire. Identité stable tant que l'entreprise garantit la sécurité de carrière.",
      couleur: "text-emerald-300 border-emerald-500/40 bg-emerald-950/20",
    },
    conversion: {
      titre: "4. Identité de Réseau / Processus de Conversion",
      categorie: "Rupture biographique ✕ Affiliation autonome externe",
      auteur: "Professionnel individualiste & expert nomade (Chapitre 12 de Dubar)",
      desc: "L'acteur ne s'identifie ni à une entreprise particulière, ni à un métier d'origine immuable. Il navigue de réseau en réseau, capitalise sur ses compétences personnelles (employabilité) et négocie son autonomie. C'est l'identité typique du consultant ou de l'ergonome indépendant.",
      couleur: "text-indigo-300 border-indigo-500/40 bg-indigo-950/20",
    },
  };

  const cur = formes[activeForme] || formes.bloquee;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto">
        <svg
          viewBox="0 0 920 440"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {/* AXE HORIZONTAL (X) : TRANSACTION BIOGRAPHIQUE */}
          <line
            x1="120"
            y1="220"
            x2="840"
            y2="220"
            className="stroke-slate-700 stroke-2"
          />
          <text
            x="845"
            y="225"
            className="fill-slate-400 font-bold text-xs"
          >
            ▶
          </text>
          <text
            x="130"
            y="210"
            className="fill-slate-400 text-xs font-mono font-bold"
          >
            ◀ Continuité avec le passé (Reproduction)
          </text>
          <text
            x="640"
            y="210"
            className="fill-slate-400 text-xs font-mono font-bold"
          >
            Rupture avec le passé (Visée future) ▶
          </text>

          {/* AXE VERTICAL (Y) : TRANSACTION RELATIONNELLE */}
          <line
            x1="480"
            y1="30"
            x2="480"
            y2="410"
            className="stroke-slate-700 stroke-2"
          />
          <text
            x="480"
            y="25"
            textAnchor="middle"
            className="fill-slate-400 font-bold text-xs"
          >
            ▲
          </text>
          <text
            x="490"
            y="50"
            className="fill-emerald-400 text-xs font-mono font-bold"
          >
            ▲ Reconnaissance par autrui (Coopération)
          </text>
          <text
            x="490"
            y="395"
            className="fill-rose-400 text-xs font-mono font-bold"
          >
            ▼ Non-reconnaissance / Rejet (Conflit)
          </text>

          {/* CADRAN 1 (HAUT-DROITE) : MOBILISATION / IDENTITÉ D'ENTREPRISE */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveForme("mobilisation")}
          >
            <rect
              x="510"
              y="60"
              width="360"
              height="140"
              rx="12"
              className={`fill-emerald-950/30 stroke-emerald-500/70 ${
                activeForme === "mobilisation" ? "stroke-[3px] fill-emerald-950/60" : "stroke-1"
              }`}
            />
            <text x="530" y="90" className="fill-emerald-300 font-bold text-xs uppercase">
              3. PROCESSUS DE MOBILISATION
            </text>
            <text x="530" y="115" className="fill-white font-bold text-sm">
              L&apos;Identité d&apos;Entreprise (Promotion interne)
            </text>
            <text x="530" y="140" className="fill-slate-300 text-xs">
              • Rupture biographique acceptée pour l&apos;entreprise
            </text>
            <text x="530" y="160" className="fill-slate-300 text-xs">
              • Reconnaissance institutionnelle pleine et entière
            </text>
          </g>

          {/* CADRAN 2 (BAS-GAUCHE) : IDENTITÉ BLOQUÉE */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveForme("bloquee")}
          >
            <rect
              x="90"
              y="60"
              width="360"
              height="140"
              rx="12"
              className={`fill-rose-950/30 stroke-rose-500/70 ${
                activeForme === "bloquee" ? "stroke-[3px] fill-rose-950/60" : "stroke-1"
              }`}
            />
            <text x="110" y="90" className="fill-rose-300 font-bold text-xs uppercase">
              2. IDENTITÉ BLOQUÉE
            </text>
            <text x="110" y="115" className="fill-white font-bold text-sm">
              L&apos;Ouvrier de métier face au changement
            </text>
            <text x="110" y="140" className="fill-slate-300 text-xs">
              • Continuité et fierté du savoir de métier
            </text>
            <text x="110" y="160" className="fill-slate-300 text-xs">
              • Non-reconnaissance et déqualification par les normes
            </text>
          </g>

          {/* CADRAN 3 (BAS-GAUCHE) : RETRAIT / EXCLUSION */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveForme("retrait")}
          >
            <rect
              x="90"
              y="240"
              width="360"
              height="140"
              rx="12"
              className={`fill-slate-900/60 stroke-slate-600 ${
                activeForme === "retrait" ? "stroke-[3px] fill-slate-900" : "stroke-1"
              }`}
            />
            <text x="110" y="270" className="fill-slate-300 font-bold text-xs uppercase">
              1. MODÈLE DU RETRAIT / EXCLUSION
            </text>
            <text x="110" y="295" className="fill-white font-bold text-sm">
              L&apos;Exécutant précaire menacé
            </text>
            <text x="110" y="320" className="fill-slate-400 text-xs">
              • Continuité subie dans des tâches monotones
            </text>
            <text x="110" y="340" className="fill-slate-400 text-xs">
              • Attribution dévalorisée et désinvestissement
            </text>
          </g>

          {/* CADRAN 4 (BAS-DROITE) : CONVERSION / MODÈLE AFFINITAIRE */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setActiveForme("conversion")}
          >
            <rect
              x="510"
              y="240"
              width="360"
              height="140"
              rx="12"
              className={`fill-indigo-950/30 stroke-indigo-500/70 ${
                activeForme === "conversion" ? "stroke-[3px] fill-indigo-950/60" : "stroke-1"
              }`}
            />
            <text x="530" y="270" className="fill-indigo-300 font-bold text-xs uppercase">
              4. PROCESSUS DE CONVERSION
            </text>
            <text x="530" y="295" className="fill-white font-bold text-sm">
              L&apos;Identité de Réseau (Expertise nomade)
            </text>
            <text x="530" y="320" className="fill-slate-300 text-xs">
              • Rupture biographique volontaire (reconversion)
            </text>
            <text x="530" y="340" className="fill-slate-300 text-xs">
              • Quête d&apos;autonomie et d&apos;alliances externes
            </text>
          </g>
        </svg>
      </div>

      {cur && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-all ${cur.couleur}`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-white text-sm">{cur.titre}</span>
            <span className="font-mono text-xs opacity-90">{cur.categorie}</span>
          </div>
          <div className="text-amber-400 font-medium text-xs">{cur.auteur}</div>
          <p className="text-slate-300 leading-relaxed font-sans">{cur.desc}</p>
        </div>
      )}
    </div>
  );
}
export function PstDiagramRenderer({ schemaId }: { schemaId: string }) {
  switch (schemaId) {
    case "schema-leplat-regulation":
      return <LeplatHocDiagram />;
    case "schema-clot-activite-reelle":
      return <ClotIcebergDiagram />;
    case "schema-dejours-reconnaissance":
      return <DejoursReconnaissanceDiagram />;
    case "schema-bourdieu-algorithme":
      return <BourdieuHabitusDiagram />;
    case "schema-habermas-validite":
      return <HabermasTetraedreDiagram />;
    case "schema-honneth-spheres":
      return <HonnethSpheresDiagram />;
    case "schema-buhler-organon":
      return <BuhlerOrganonDiagram />;
    case "schema-valls-iod":
      return <VallsCastraIodDiagram />;
    case "schema-dubar-double-transaction":
      return <DubarDoubleTransactionDiagram />;
    case "schema-sainsaulieu-matrice":
      return <SainsaulieuMatriceDiagram />;
    case "schema-castel-desaffiliation":
      return <CastelDesaffiliationDiagram />;
    case "schema-cartographie-lagabrielle":
      return <CartographieLagabrielleDiagram />;
    case "schema-vygotski-piaget":
      return <VygotskiPiagetDiagram />;
    case "schema-golse-pensee":
      return <GolseFonctionsPenseeDiagram />;
    case "schema-dubar-formes":
      return <DubarFormesIdentitairesDiagram />;
    default:
      return null;
  }
}
