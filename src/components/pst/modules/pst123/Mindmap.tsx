"use client";

import { useState } from "react";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";

const DETAILS: Record<string, [string, string]> = {
  identite: [
    "L'Identité Sociale et Professionnelle",
    "Syllabus E. Lucy (PST123). L'identité n'est pas une substance innée, mais une construction sociale et psychologique continue, articulant la trajectoire biographique du sujet, les rapports de pouvoir organisationnels et la quête de reconnaissance.",
  ],
  dubar: [
    "Claude Dubar : La Double Transaction (1991)",
    "Théorie centrale du cours : l'identité résulte du croisement indissociable entre la transaction biographique (pour soi, temporelle) et la transaction relationnelle (pour autrui, spatiale et institutionnelle).",
  ],
  soi: [
    "Identité pour Soi / Processus Biographique",
    "Fondée sur les actes d'appartenance (« qui dites-vous que vous êtes ? »). Négociation intime entre identités héritées du passé et identités visées d'avenir, oscillant entre continuité et rupture biographique.",
  ],
  autrui: [
    "Identité pour Autrui / Processus Relationnel",
    "Fondée sur les actes d'attribution (« qui dit-on que vous êtes ? »). Reconnaissance ou non-reconnaissance par les grilles institutionnelles. 4 destins : promotion interne, conversion externe, blocage ou exclusion.",
  ],
  pouvoir: [
    "Champs de Pouvoir & Reconnaissance Sociale",
    "L'entreprise n'est pas un lieu neutre : elle est un champ de forces (Bourdieu), une matrice de socialisation démocratique (Sainsaulieu) et un espace de lutte pour la reconnaissance (Honneth).",
  ],
  bourdieu: [
    "Pierre Bourdieu : Habitus, Capitaux & Double Vérité",
    "Formule : (Dispositions + Capital) × Champ = Habitus. Les 4 capitaux (économique, culturel, social, symbolique). La double vérité du travail (1996) : exploitation objective masquée par l'investissement passionné (illusio).",
  ],
  sainsaulieu: [
    "Renaud Sainsaulieu : Les 4 Modèles Culturels (1977)",
    "L'accès au pouvoir façonne la personnalité politique de l'adulte. 4 modèles : Fusionnel (camaraderie ouvrière unanime), Retrait (pouvoir hors-travail), Négociateur (débat démocratique et expertise), Affinitaire (clans de pairs).",
  ],
  honneth: [
    "Axel Honneth : Les 3 Sphères de la Reconnaissance (1992)",
    "1. Amour/amitié (confiance en soi) ; 2. Droits universels (respect de soi) ; 3. Solidarité sociale / utilité du métier (estime de soi). Le mépris moral et le travail invisible blessent l'identité.",
  ],
  posture: [
    "Posture du Psychologue & Déontologie (Le Bianic & Loi 1985)",
    "Histoire au CNAM d'une profession 'balkanisée' en quête de légitimité. Protection du titre (Loi 25 juillet 1985), triangulation clinique face au prescripteur, secret professionnel et négociation du mandat.",
  ],
};

const NODES = [
  {
    key: "identite",
    x: 275,
    y: 15,
    w: 250,
    h: 46,
    fill: "var(--ink)",
    tx: 400,
    ty: 43,
    fs: 12,
    label: "L'IDENTITÉ SOCIALE & PROFESSIONNELLE",
  },
  {
    key: "dubar",
    x: 40,
    y: 95,
    w: 260,
    h: 44,
    fill: "var(--deontologie)",
    tx: 170,
    ty: 122,
    fs: 11.5,
    label: "CLAUDE DUBAR (DOUBLE TRANSACTION)",
  },
  {
    key: "pouvoir",
    x: 480,
    y: 95,
    w: 280,
    h: 44,
    fill: "var(--mandat)",
    tx: 620,
    ty: 122,
    fs: 11.5,
    label: "POUVOIR, HABITUS & RECONNAISSANCE",
  },
  {
    key: "soi",
    x: 15,
    y: 180,
    w: 180,
    h: 42,
    fill: "var(--transitions)",
    tx: 105,
    ty: 206,
    fs: 10.5,
    label: "Pour Soi (Appartenance)",
  },
  {
    key: "autrui",
    x: 205,
    y: 180,
    w: 180,
    h: 42,
    fill: "var(--rps)",
    tx: 295,
    ty: 206,
    fs: 10.5,
    label: "Pour Autrui (Attribution)",
  },
  {
    key: "bourdieu",
    x: 420,
    y: 180,
    w: 170,
    h: 42,
    fill: "var(--sante)",
    tx: 505,
    ty: 206,
    fs: 10.5,
    label: "Bourdieu (Habitus/Illusio)",
  },
  {
    key: "sainsaulieu",
    x: 605,
    y: 180,
    w: 180,
    h: 42,
    fill: "var(--triangulation)",
    tx: 695,
    ty: 206,
    fs: 10.5,
    label: "Sainsaulieu (4 Modèles)",
  },
  {
    key: "honneth",
    x: 515,
    y: 250,
    w: 210,
    h: 42,
    fill: "var(--ink)",
    tx: 620,
    ty: 276,
    fs: 10.5,
    label: "Honneth (3 Sphères Reconnaissance)",
  },
  {
    key: "posture",
    x: 105,
    y: 250,
    w: 240,
    h: 42,
    fill: "var(--deontologie)",
    tx: 225,
    ty: 276,
    fs: 10.5,
    label: "Posture Psy & Loi 1985 (Le Bianic)",
  },
];

const LINES = [
  [400, 45, 170, 95],
  [400, 45, 620, 95],
  [170, 139, 105, 180],
  [170, 139, 295, 180],
  [620, 139, 505, 180],
  [620, 139, 695, 180],
  [620, 139, 620, 250],
  [170, 139, 225, 250],
];

export function Mindmap() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = selected ? DETAILS[selected] : null;

  return (
    <div>
      <p className="hint">
        Carte conceptuelle intégrale du cours PST123 de Mme Lucy. Clique sur un nœud pour révéler l&apos;articulation théorique.
      </p>
      <div
        id="mindmapHost"
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-4 items-center"
      >
        <SvgFullScreenViewer
          title="Carte Mentale des Concepts · PST123"
          subtitle={detail ? detail[0] : "L'Identité Sociale et Professionnelle"}
          buttonLabel="Plein écran (Carte)"
          activeInfo={
            detail ? (
              <div className="space-y-1">
                <div className="font-bold text-sm text-cyan-300">{detail[0]}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{detail[1]}</div>
              </div>
            ) : undefined
          }
        >
          <svg
            viewBox="0 0 800 350"
            className="block w-full h-auto bg-slate-950 rounded-2xl border border-slate-800"
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
                className="mm-node cursor-pointer transition-opacity hover:opacity-90"
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
        </SvgFullScreenViewer>
        <div
          className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 w-full min-h-[80px] space-y-1"
        >
          <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 m-0">
            {detail ? detail[0] : "Clique sur un nœud"}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0 font-medium">
            {detail
              ? detail[1]
              : "Pour découvrir comment ce concept clé s'articule avec la tension déontologique."}
          </p>
        </div>
      </div>
    </div>
  );
}
