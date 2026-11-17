"use client";

import React from "react";

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
