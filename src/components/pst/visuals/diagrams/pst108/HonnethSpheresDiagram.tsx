"use client";

import React, { useState } from "react";

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
