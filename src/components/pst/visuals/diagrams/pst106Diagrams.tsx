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

