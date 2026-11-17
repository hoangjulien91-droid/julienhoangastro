"use client";

import React, { useState } from "react";

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
