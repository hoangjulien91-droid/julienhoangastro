"use client";

import React, { useState } from "react";
import { Sparkles, Tag } from "lucide-react";

export function DubarFormesIdentitairesDiagram() {
  const [activeForme, setActiveForme] = useState<string>("bloquee");

  const formes: Record<
    string,
    {
      titre: string;
      categorie: string;
      desc: string;
      auteur: string;
      containerClass: string;
      badgeClass: string;
    }
  > = {
    retrait: {
      titre: "1. Identité de Retrait / Processus d'Exclusion",
      categorie: "Continuité subie ✕ Non-reconnaissance managériale",
      auteur: "Exécutant précaire menacé (Chapitre 9 de Dubar)",
      desc: "L'organisation attribue une étiquette dévalorisée ('simple exécutant interchangeable'). Le salarié refuse d'adhérer aux objectifs de l'entreprise et investit sa vie hors-travail (famille, loisirs). Risque majeur de désaffiliation sociale (Robert Castel) et de fatalisme.",
      containerClass:
        "bg-slate-50/90 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700 shadow-xs",
      badgeClass:
        "bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
    },
    bloquee: {
      titre: "2. Identité Bloquée / De l'Ouvrier au Nouveau Professionnel",
      categorie: "Continuité de métier ✕ Non-reconnaissance des compétences",
      auteur: "Ouvrier de métier qualifié (Chapitre 10 de Dubar)",
      desc: "L'artisan ou l'ouvrier revendique une appartenance fière à son métier d'origine et à son collectif. Mais l'institution introduit de nouveaux logiciels ou une rationalisation qui nie son savoir d'expérience. L'identité est en crise car la reconnaissance hiérarchique est refusée.",
      containerClass:
        "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 shadow-xs",
      badgeClass:
        "bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/60",
    },
    mobilisation: {
      titre: "3. Identité d'Entreprise / Processus de Mobilisation",
      categorie: "Rupture biographique ✕ Reconnaissance institutionnelle",
      auteur: "Carriériste en promotion interne (Chapitre 11 de Dubar)",
      desc: "Le professionnel accepte de rompre avec son milieu d'origine pour épouser les valeurs de l'entreprise. En contrepartie, l'organisation lui accorde des promotions et une reconnaissance statutaire. Identité stable tant que l'entreprise garantit la sécurité de carrière.",
      containerClass:
        "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
      badgeClass:
        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
    },
    conversion: {
      titre: "4. Identité de Réseau / Processus de Conversion",
      categorie: "Rupture biographique ✕ Affiliation autonome externe",
      auteur: "Professionnel individualiste & expert nomade (Chapitre 12 de Dubar)",
      desc: "L'acteur ne s'identifie ni à une entreprise particulière, ni à un métier d'origine immuable. Il navigue de réseau en réseau, capitalise sur ses compétences personnelles (employabilité) et négocie son autonomie. C'est l'identité typique du consultant ou de l'ergonome indépendant.",
      containerClass:
        "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs",
      badgeClass:
        "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/60",
    },
  };

  const cur = formes[activeForme] || formes.bloquee;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
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
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2.5 transition-all ${cur.containerClass}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/10 dark:border-white/10">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
              {cur.titre}
            </h4>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shrink-0 ${cur.badgeClass}`}
            >
              <Tag className="size-3.5 shrink-0 opacity-80" />
              <span>{cur.categorie}</span>
            </span>
          </div>
          <div className="text-amber-800 dark:text-amber-300 font-bold text-xs font-mono flex items-center gap-1.5">
            <Sparkles className="size-3.5 shrink-0" />
            <span>{cur.auteur}</span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0">
            {cur.desc}
          </p>
        </div>
      )}
    </div>
  );
}
