"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";

interface Author {
  name: string;
  tag: string;
  color: string;
  body: string;
}
interface DebatAxis {
  axis: string;
  title: string;
  intro: string;
  authors: Author[];
  synthesis: string;
}

const AXES: DebatAxis[] = [
  {
    axis: "Axe 1",
    title: "Le Statut de l'Activité : Tâche vs Activité",
    intro:
      "Comment chaque courant définit-il et étudie-t-il l'activité humaine en situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Tâche vs Activité",
        color: "var(--wisner)",
        body: "<strong>L'écart régulateur</strong>. L'ergonomie distingue la tâche (les consignes organisationnelles) de l'activité réelle (l'adaptation cognitive et corporelle de l'opérateur pour gérer les aléas).",
      },
      {
        name: "Clot",
        tag: "Le Réel de l'Activité",
        color: "var(--clot)",
        body: "<strong>Le possible et l'empêché</strong>. L'activité dépasse ce qui s'observe (l'activité réalisée). Elle inclut le réel de l'activité : ce qui aurait pu être fait, le suspendu, le contrarié, le conflictuel.",
      },
      {
        name: "Dejours",
        tag: "L'Épreuve du Réel",
        color: "var(--dejours)",
        body: "<strong>La résistance de la matière</strong>. Le réel est ce qui résiste à la prescription de l'organisation. Travailler, c'est buter sur cette résistance et faire preuve d'intelligence pratique pour la surmonter.",
      },
    ],
    synthesis:
      "Tous trois s'accordent sur le fait que la prescription organisationnelle est structurellement insuffisante pour accomplir le travail. <strong>Exemple à placer :</strong> les régulations informelles des opérateurs face aux pannes ou aux fluctuations de matières (Wisner), ou le conflit intérieur face à une consigne absurde (Clot).",
  },
  {
    axis: "Axe 2",
    title: "La Santé au Travail : Prévention vs Pouvoir d'agir",
    intro:
      "Quelle est la source de la souffrance au travail et comment préserver ou construire la santé des sujets ?",
    authors: [
      {
        name: "Wisner",
        tag: "Prévention physique & cognitive",
        color: "var(--wisner)",
        body: "<strong>L'ergonomie des postes</strong>. La souffrance provient d'une inadéquation physique ou d'une surcharge mentale. On prévient la fatigue et les TMS en adaptant ergonomiquement l'environnement technique.",
      },
      {
        name: "Clot",
        tag: "Pouvoir d'agir & Activité empêchée",
        color: "var(--clot)",
        body: "<strong>L'amputation subjective</strong>. La souffrance naît de l'activité empêchée (vouloir bien faire son travail sans en avoir les moyens ou le droit). La santé est le développement du pouvoir d'agir sur son milieu.",
      },
      {
        name: "Dejours",
        tag: "Souffrance, Défenses & Reconnaissance",
        color: "var(--dejours)",
        body: "<strong>La dynamique psychique</strong>. La confrontation au réel génère inévitablement de la souffrance. Elle est compensée par des stratégies de défense (idéologies collectives) et sublimée en plaisir par la reconnaissance.",
      },
    ],
    synthesis:
      "Opposez l'approche défensive de Dejours (comment le psychisme tolère la souffrance) à l'approche transformatrice de Clot (comment restaurer l'action sur le milieu de travail). <strong>Exemple :</strong> le port du casque détourné comme idéologie virile (Dejours) contre le débat sur la qualité empêchée du geste de sécurité (Clot).",
  },
  {
    axis: "Axe 3",
    title: "Le Collectif de travail : Coordination vs Règles de métier",
    intro:
      "Quel est le statut et la fonction du collectif de travail dans la situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Coordination opérationnelle",
        color: "var(--wisner)",
        body: "<strong>Le collectif fonctionnel</strong>. Le collectif est analysé sous l'angle des flux de communication et de la répartition technique des tâches pour assurer la fluidité de la production et pallier les pannes.",
      },
      {
        name: "Clot",
        tag: "Le Genre Professionnel",
        color: "var(--clot)",
        body: "<strong>L'instrument psychologique</strong>. Le collectif est dépositaire du genre professionnel (la mémoire impersonnelle du métier). Il sert de bouclier et de ressource au sujet pour inventer son style sans s'épuiser.",
      },
      {
        name: "Dejours",
        tag: "Espace de délibération",
        color: "var(--dejours)",
        body: "<strong>L'éthique et les pairs</strong>. Le collectif est le garant des règles de l'art. C'est l'instance qui valide le travail de chacun à travers le jugement de beauté, base indispensable de la reconnaissance.",
      },
    ],
    synthesis:
      "Montrez comment l'individualisation des évaluations et la prescription excessive détruisent le genre professionnel (Clot) et empêchent la délibération éthique collective sur le travail soigné (Dejours).",
  },
  {
    axis: "Axe 4",
    title: "Méthodes d'intervention : Mesure vs Dialogue",
    intro:
      "Comment le chercheur-intervenant accède-t-il à la réalité du travail et produit-il de la transformation ?",
    authors: [
      {
        name: "Wisner",
        tag: "Observation clinique directe",
        color: "var(--wisner)",
        body: "<strong>Mesures et verbalisations</strong>. L'ergonomie s'appuie sur des observations rigoureuses sur le terrain, l'enregistrement des conduites et des verbalisations consécutives pour identifier les déterminants réels de la tâche.",
      },
      {
        name: "Clot",
        tag: "Autoconfrontation simple/croisée",
        color: "var(--clot)",
        body: "<strong>Le dispositif dialogique</strong>. Utilisation de la vidéo commentée par le travailleur (simple), puis débattue avec un pair (croisée) pour provoquer une controverse professionnelle et développer le pouvoir d'agir.",
      },
      {
        name: "Dejours",
        tag: "Enquête de parole collective",
        color: "var(--dejours)",
        body: "<strong>L'espace de parole libre</strong>. Enquêtes basées sur la parole des salariés volontaires pour analyser collectivement la souffrance face à l'organisation réelle du travail et restaurer la coopération.",
      },
    ],
    synthesis:
      "Distinguez le chercheur-ergonome qui observe de l'extérieur pour transformer la situation technique (Wisner) du clinicien de l'activité qui co-construit un cadre d'auto-analyse pour transformer le métier de l'intérieur (Clot).",
  },
  {
    axis: "Axe 5",
    title: "Philosophie du travail : Aliénation vs Normativité",
    intro:
      "Quelles sont les implications existentielles et sociales de la confrontation humaine au travail ?",
    authors: [
      {
        name: "Lahy & Toulouse",
        tag: "Positivisme & Aptitudes",
        color: "var(--histoire)",
        body: "<strong>La sélection objective</strong>. Cherche à mesurer scientifiquement les aptitudes pour placer les hommes aux postes optimaux. Approche qui risque de réduire le sujet à des réflexes mesurables et de légitimer la division scientifique du travail.",
      },
      {
        name: "Clot & Marx",
        tag: "Activité générique",
        color: "var(--clot)",
        body: "<strong>L'aliénation</strong>. Le travail est le lieu par excellence où l'homme transforme le monde et se transforme lui-même. Quand l'activité est amputée (aliénation), c'est l'essence même du sujet qui est dépossédée de son développement.",
      },
      {
        name: "Canguilhem",
        tag: "Normativité vitale",
        color: "var(--dejours)",
        body: "<strong>La santé comme création</strong>. Être en bonne santé, c'est pouvoir commettre des infractions aux normes de l'environnement et en créer de nouvelles. Le travail est le milieu où s'exerce cette normativité subjective.",
      },
    ],
    synthesis:
      "Utile pour l'ouverture en conclusion : liez les limites de la psychotechnique historique de Lahy à la conception aliénante du Taylorisme (Foucault), pour montrer l'apport salvateur des cliniques contemporaines du travail (Clot, Dejours) qui restaurent le sujet.",
  },
];

const GLOSSAIRE = [
  {
    term: "Psychotechnique",
    def: "Sélection et orientation des travailleurs par la mesure quantitative de leurs aptitudes physiques et réflexes. → Lahy",
  },
  {
    term: "Ergonomie de l'activité",
    def: "Étude de la situation concrète pour adapter le travail à l'homme (physique et mental) face aux exigences de l'organisation. → Wisner",
  },
  {
    term: "Clinique de l'activité",
    def: "Approche psychologique visant à restaurer le pouvoir d'agir en développant le dialogue sur les règles du métier. → Clot",
  },
  {
    term: "Psychodynamique du travail",
    def: "Étude des processus psychiques dans le travail, centrée sur le couple souffrance-plaisir et la reconnaissance. → Dejours",
  },
  {
    term: "Tâche prescrite",
    def: "Le travail tel qu'il est défini et ordonné à l'avance par l'organisation (règles, temps, buts).",
  },
  {
    term: "Activité réelle",
    def: "Ce qui est réellement fait par le travailleur pour réaliser la tâche face aux aléas de la situation.",
  },
  {
    term: "Genre professionnel",
    def: "Le patrimoine social et la mémoire collective du métier partagée par les pairs (le comment on fait ici). → Clot",
  },
  {
    term: "Style professionnel",
    def: "L'appropriation individuelle et créative du genre professionnel commun par le sujet en situation. → Clot",
  },
  {
    term: "Idéologie collective de défense",
    def: "Stratégie élaborée par le collectif pour s'insensibiliser à la souffrance ou au danger (déni). → Dejours",
  },
  {
    term: "Reconnaissance",
    def: "Processus de validation de l'effort par un jugement de beauté (pairs) ou d'utilité (hiérarchie). → Dejours",
  },
];

interface Debats3WayProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Debats3Way({ store, onStoreChange }: Debats3WayProps) {
  const [glossaireOpen, setGlossaireOpen] = useState(false);
  const state = store.getDebats();
  const total = AXES.length;
  const active = AXES.filter((_, i) => !!state[i]).length;
  const pct = total ? Math.round((100 * active) / total) : 0;

  function toggle(i: number) {
    store.setDebat(i, !state[i]);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">
        Les 5 grands débats transversaux de la discipline pour prendre de la
        hauteur et structurer tes comparaisons de synthèse à l&apos;examen.
        Chaque axe te donne une grille de lecture prête à l&apos;emploi.
      </p>

      <div className="debat-progress-card">
        <div className="debat-progress-container">
          <div className="debat-progress-header">
            <span className="debat-progress-title">Débats maîtrisés</span>
            <span className="debat-progress-stats">
              {active} / {total} ({pct}%)
            </span>
          </div>
          <div className="debat-progress-bar">
            <div className="debat-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="debats-container">
        <div className="debat-intro-block">
          <h3>Pourquoi ces 3 courants ensemble ?</h3>
          <p>
            La <strong>psychologie du travail</strong> et l&apos;ergonomie
            étudient comment le travail réel façonne l&apos;activité humaine et
            comment préserver la santé des travailleurs tout en maintenant
            l&apos;efficacité.
          </p>
          <p>
            Le cours se concentre sur l&apos;
            <strong>
              Ergonomie de l&apos;activité, la Clinique de l&apos;activité et la
              Psychodynamique du travail
            </strong>{" "}
            parce qu&apos;ils proposent trois réponses complémentaires au défi
            de l&apos;analyse du travail :
          </p>
          <p>
            •{" "}
            <strong className="cErg" style={{ color: "#2e6e9e" }}>
              Wisner (Ergonomie)
            </strong>{" "}
            : par l&apos;adaptation physique et cognitive des situations (Tâche
            vs Activité). •{" "}
            <strong className="cAct" style={{ color: "#3e8e5e" }}>
              Clot (Clinique)
            </strong>{" "}
            : par le développement du pouvoir d&apos;agir et du métier (Genre vs
            Style). •{" "}
            <strong className="cPsy" style={{ color: "#7e5ebd" }}>
              Dejours (Psychodynamique)
            </strong>{" "}
            : par l&apos;élaboration de la souffrance et la reconnaissance
            (Plaisir vs Souffrance).
          </p>
          <div className="intro-commun">
            <strong>Ce qu&apos;ils partagent tous les trois</strong> (et qui les
            distingue de la psychotechnique positiviste) : ils reconnaissent le
            primat de l&apos;activité réelle, refusent de traiter le travailleur
            comme une simple machine réflexe, et lient le travail à la santé.
          </div>
        </div>

        <div className="glossaire-block">
          <button
            className="glossaire-toggle"
            type="button"
            aria-expanded={glossaireOpen}
            onClick={() => setGlossaireOpen((o) => !o)}
          >
            <span>Glossaire des courants</span>
            <span className="chevron">{glossaireOpen ? "▲" : "▼"}</span>
          </button>
          {glossaireOpen && (
            <div className="glossaire-body">
              <div className="glossaire-grid">
                {GLOSSAIRE.map((g) => (
                  <div className="glossaire-item" key={g.term}>
                    <span className="glossaire-term">{g.term}</span>
                    <span className="glossaire-def">{g.def}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {AXES.map((axe, i) => (
          <div className="debat-card dcard" key={i}>
            <div className="debat-header">
              <span className="debat-badge">{axe.axis}</span>
              <h3>{axe.title}</h3>
              <button
                type="button"
                className={`debat-mastery-btn${state[i] ? " active" : ""}`}
                title="Marquer comme maîtrisé"
                onClick={() => toggle(i)}
              >
                ✓
              </button>
            </div>
            <p className="debat-intro">{axe.intro}</p>
            <div className="debat-grid">
              {axe.authors.map((a) => (
                <div
                  className="debat-author"
                  key={a.name}
                  style={{ borderLeft: `4px solid ${a.color}` }}
                >
                  <h4 style={{ color: a.color }}>
                    {a.name} <span className="author-tag">{a.tag}</span>
                  </h4>
                  <p dangerouslySetInnerHTML={{ __html: a.body }} />
                </div>
              ))}
            </div>
            <div className="debat-synthesis">
              <h5>💡 Clé pour la copie</h5>
              <p dangerouslySetInnerHTML={{ __html: axe.synthesis }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
