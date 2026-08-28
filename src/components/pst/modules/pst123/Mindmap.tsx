"use client";

import { useState } from "react";

const DETAILS: Record<string, [string, string]> = {
  posture: [
    "Indépendance du Psychologue",
    "Le psychologue du travail choisit librement ses théories et méthodologies. Il résiste à l'instrumentalisation gestionnaire et défend le code de déontologie.",
  ],
  demande: [
    "La Demande Institutionnelle",
    "La commande RH exprime souvent une volonté de chiffrer les comportements ou de corriger les faiblesses individuelles pour préserver l'efficacité.",
  ],
  triangulation: [
    "Rapports de force",
    "La triangulation impose de délimiter qui paie (prescripteur), qui est évalué (sujet) et le devoir absolu du secret professionnel partagé.",
  ],
  quantitative: [
    "Limites de la mesure",
    "Les questionnaires RPS standardisés comptent la souffrance mais ne l'expliquent pas. L'enquête doit être complétée par une démarche qualitative clinique.",
  ],
  deontologie: [
    "Cadre de protection",
    "Définit les obligations légales (loi de 1985, titre protégé, répertoire ADELI) et déontologiques (consentement libre et éclairé, but assigné éthique).",
  ],
  mandat: [
    "Reformuler et Contractualiser",
    "Le psychologue ne répond pas à la demande brute, il la déconstruit pour négocier un mandat axé sur l'analyse du travail réel.",
  ],
  consentement: [
    "RGPD & Respect",
    "Obligation stricte de recueillir l'accord écrit du salarié avant toute évaluation et d'anonymiser l'ensemble des données psychométriques.",
  ],
};

const NODES = [
  {
    key: "posture",
    x: 300,
    y: 20,
    w: 200,
    h: 50,
    fill: "var(--ink)",
    tx: 400,
    ty: 50,
    fs: 12,
    label: "POSTURE DU PSYCHOLOGUE",
  },
  {
    key: "demande",
    x: 100,
    y: 125,
    w: 200,
    h: 50,
    fill: "var(--rps)",
    tx: 200,
    ty: 155,
    fs: 12,
    label: "Demande Institutionnelle",
  },
  {
    key: "triangulation",
    x: 20,
    y: 225,
    w: 150,
    h: 40,
    fill: "var(--triangulation)",
    tx: 95,
    ty: 250,
    fs: 11,
    label: "La Triangulation",
  },
  {
    key: "quantitative",
    x: 190,
    y: 225,
    w: 150,
    h: 40,
    fill: "var(--muted)",
    tx: 265,
    ty: 250,
    fs: 11,
    label: "Mesure Quantitative",
  },
  {
    key: "deontologie",
    x: 500,
    y: 125,
    w: 200,
    h: 50,
    fill: "var(--deontologie)",
    tx: 600,
    ty: 155,
    fs: 12,
    label: "Cadre Déontologique",
  },
  {
    key: "mandat",
    x: 420,
    y: 225,
    w: 150,
    h: 40,
    fill: "var(--mandat)",
    tx: 495,
    ty: 250,
    fs: 11,
    label: "Négocier le Mandat",
  },
  {
    key: "consentement",
    x: 590,
    y: 225,
    w: 150,
    h: 40,
    fill: "var(--sante)",
    tx: 665,
    ty: 250,
    fs: 11,
    label: "Consentement RGPD",
  },
];

const LINES = [
  [400, 50, 200, 150],
  [400, 50, 600, 150],
  [200, 150, 100, 250],
  [200, 150, 300, 250],
  [600, 150, 500, 250],
  [600, 150, 700, 250],
];

export function Mindmap() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = selected ? DETAILS[selected] : null;

  return (
    <div>
      <p className="hint">
        La carte mentale de la tension déontologique fondamentale (Demande
        Institutionnelle vs Posture Déontologique). Clic sur un nœud pour
        afficher le détail.
      </p>
      <div
        id="mindmapHost"
        className="qbox"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "center",
        }}
      >
        <svg
          viewBox="0 0 800 350"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            background: "#fff",
            borderRadius: 8,
            border: "1px solid var(--line)",
          }}
        >
          {LINES.map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--line)"
              strokeWidth={2}
            />
          ))}
          {NODES.map((n) => (
            <g
              key={n.key}
              className="mm-node"
              style={{ cursor: "pointer" }}
              onClick={() => setSelected(n.key)}
            >
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={n.w > 180 ? 10 : 8}
                fill={n.fill}
              />
              <text
                x={n.tx}
                y={n.ty}
                fill="#fff"
                textAnchor="middle"
                fontSize={n.fs}
                fontWeight={700}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
        <div
          className="schema"
          style={{ margin: 0, width: "100%", minHeight: 80 }}
        >
          <h4 style={{ margin: "0 0 6px", color: "var(--deontologie)" }}>
            {detail ? detail[0] : "Clique sur un nœud"}
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "var(--muted)",
              lineHeight: 1.5,
            }}
          >
            {detail
              ? detail[1]
              : "Pour découvrir comment ce concept clé s'articule avec la tension déontologique."}
          </p>
        </div>
      </div>
    </div>
  );
}
