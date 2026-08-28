"use client";

import type { PstStore } from "@/lib/pst/store";
import {
  Outils as SharedOutils,
  type ArmeUltime,
  type IntroData,
  type SynthAxisData,
} from "@/components/pst/modules/shared/panels/Outils";
import { DeontoExplorer } from "./DeontoExplorer";
import { Tribunal } from "./Tribunal";

const COMPARATEUR_DATA: SynthAxisData = {
  objectif: {
    precurseurs:
      "Sélectionner objectivement les aptitudes physiologiques des travailleurs pour les adapter aux machines.",
    dejours:
      "Garantir une lecture scientifique des déterminants subjectifs et organisationnels en contractualisant un mandat clinique indépendant.",
    molinier:
      "Accompagner individuellement les salariés pour forcer l'acceptation des restructurations de l'entreprise.",
  },
  terrain: {
    precurseurs:
      "Mesures objectives des aptitudes en laboratoire de psychotechnique (Lahy, Toulouse).",
    dejours:
      "Interventions cliniques de terrain axées sur le travail réel, combinant entretiens, observations et recueil du consentement.",
    molinier:
      "Audits de climat social standardisés commandés par la DRH sans confrontation directe du terrain.",
  },
  sante: {
    precurseurs:
      "Absence d'usure physique (TMS) et respect des cadences mécaniques.",
    dejours:
      "Équilibre subjectif et préservation de la santé mentale grâce au secret et à la délibération collective.",
    molinier:
      "Résilience individuelle et adaptabilité face au changement imposé.",
  },
  methode: {
    precurseurs: "Mesures psychométriques de laboratoire et chronométrage.",
    dejours:
      "Entretiens cliniques du travail, observations ergonomiques et co-construction du mandat clinique.",
    molinier:
      "Change Management, guides d'entretien standardisés RH et communication interne.",
  },
  mots: {
    precurseurs: "« Mesure d'aptitude », « Fatigue objective », « Lahy ».",
    dejours:
      "« Triangulation », « Mandat clinique », « Déontologie », « Consentement libre », « Restitution ».",
    molinier:
      "« Coaching de résilience », « Change management », « Matching de CV ».",
  },
};

const INTRO_DATA: IntroData = {
  demande: {
    step1:
      "La demande d'intervention d'un psychologue du travail est souvent formulée en urgence par les directions pour résoudre des dysfonctionnements humains.",
    step2:
      "PST123 enseigne que le psychologue ne doit pas appliquer aveuglément cette commande brute, mais analyser la triangulation et formuler un mandat d'intervention clinique.",
    step3:
      "Comment le psychologue parvient-il à déconstruire une demande institutionnelle pour préserver son indépendance professionnelle ?",
    step4:
      "Nous analyserons d'une part le processus de déconstruction de la demande, puis nous étudierons les modalités de contractualisation du mandat clinique.",
  },
  secret: {
    step1:
      "L'intervention psychologique en entreprise confronte le praticien à des exigences contradictoires entre le secret et la transparence managériale.",
    step2:
      "Le Code de déontologie des psychologues fixe une obligation absolue de secret professionnel partagé et le droit strict des salariés à la restitution compréhensible.",
    step3:
      "Comment concilier le besoin légitime d'information de l'employeur prescripteur avec la protection absolue du secret des salariés ?",
    step4:
      "Nous aborderons d'abord les fondements déontologiques du secret partagé, avant de détailler la règle d'or de la restitution compréhensible.",
  },
  bilan: {
    step1:
      "Le bilan de compétences est souvent réduit par les logiques managériales à une pure évaluation de compétences techniques pour le marché.",
    step2:
      "La loi de 1991 et l'approche clinique de l'orientation le conçoivent au contraire comme un espace clinique de transition visant l'émancipation.",
    step3:
      "En quoi le bilan de compétences se distingue-t-il d'un simple matching de CV et comment redonne-t-il du sens au sujet ?",
    step4:
      "Nous analyserons le bilan comme espace clinique d'élaboration de l'histoire du sujet, puis nous étudierons le pouvoir d'agir sur son projet professionnel.",
  },
  expertise: {
    step1:
      "L'expertise CSE habilitée en cas de projet important de réorganisation place le psychologue expert sous une forte tension d'intérêts.",
    step2:
      "Le psychologue expert doit formuler un avis scientifique indépendant face aux agendas politiques antagonistes de la direction et des syndicats.",
    step3:
      "Comment l'expert CSE peut-il garantir sa neutralité scientifique tout en objectivant les risques psychosociaux ?",
    step4:
      "Nous exposerons d'abord les étapes méthodologiques de l'expertise technique, puis nous analyserons les conditions déontologiques de sa neutralité.",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  demande: [
    "Demande institutionnelle",
    "Reformulation en mandat contractuel",
    "Indépendance méthodologique",
    "Processus de déconstruction de la commande",
  ],
  secret: [
    "Secret vs exigences hiérarchiques",
    "Règle de restitution compréhensible",
    "But assigné éthique",
    "Secret partagé sous contrôle",
  ],
  bilan: [
    "Émancipation vs employabilité",
    "Loi 1991 sur le BC",
    "Ruptures et deuil professionnel",
    "Transition professionnelle clinique",
  ],
  expertise: [
    "Projets de restructuration du CSE",
    "Avis d'expert objectivé",
    "Neutralité scientifique face aux enjeux politiques",
    "Méthodologie & conditions déontologiques",
  ],
};

const ARME: ArmeUltime = {
  title:
    "💡 L'Arme Ultime de Conclusion : Paul Ricœur — L'Éthique Clinique vs la Morale Déontologique",
  intro: (
    <>
      Pour une conclusion brillante de votre copie, distinguez l&apos;approche
      déontologique de la visée éthique avec le philosophe <b>Paul Ricœur</b> :
    </>
  ),
  items: [
    <>
      <b>Éthique vs Morale</b> : Ricœur définit la visée éthique comme « le
      souhait d&apos;une vie accomplie, avec et pour les autres, dans des
      institutions justes » (téléologique). La morale représente le système de
      normes, d&apos;obligations et d&apos;interdits (déontologique).
    </>,
    <>
      <b>Le Code comme ressource, non comme dogme</b> : Le Code de déontologie
      des psychologues appartient à la morale. Pour Ricœur, la déontologie doit
      toujours être subordonnée à l&apos;éthique. Appliquer la déontologie
      aveuglément sans visée d&apos;aide ou de soin détruit la posture clinique.
    </>,
    <>
      <b>Lien avec la pratique clinique</b> : Face à un dilemme (ex: secret
      professionnel vs signalement d&apos;un harcèlement), la règle formelle ne
      suffit pas. Le clinicien doit faire preuve de sagesse pratique (phronesis)
      pour orienter sa décision vers la vie bonne et la protection d&apos;autrui
      dans l&apos;entreprise.
    </>,
  ],
};

interface OutilsProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Outils({ store, onStoreChange }: OutilsProps) {
  return (
    <SharedOutils
      hint="Des outils interactifs conçus pour structurer tes écrits et maîtriser les contrastes méthodologiques."
      comparateurTitle="⏰ Comparateur Clinique de l'Examen"
      comparateurHint="Le correcteur attend une comparaison structurée des approches. Sélectionne une thématique ci-dessous pour charger les positions théoriques."
      synthAxes={[
        { key: "objectif", label: "Objectif" },
        { key: "terrain", label: "Rapport au Terrain" },
        { key: "sante", label: "Conception Santé" },
        { key: "methode", label: "Méthodes" },
        { key: "mots", label: "Mots-clés" },
      ]}
      comparateurColumns={[
        {
          key: "precurseurs",
          label: "Précurseurs (Lahy / Psychotechnique)",
          color: "var(--triangulation)",
        },
        {
          key: "dejours",
          label: "Psychologue du travail (Déontologique)",
          color: "var(--deontologie)",
        },
        {
          key: "molinier",
          label: "Conseil RH (Management du changement)",
          color: "var(--transitions)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        { key: "demande", label: "Demande & Mandat" },
        { key: "secret", label: "Secret & Restitution" },
        { key: "bilan", label: "Bilan & Transitions" },
        { key: "expertise", label: "Expertise CSE & RPS" },
      ]}
      introData={INTRO_DATA}
      introCues={INTRO_CUES}
      defaultIntroTheme="demande"
      specialWidget={
        <>
          <DeontoExplorer />
          <Tribunal store={store} onStoreChange={onStoreChange} />
        </>
      }
      arme={ARME}
    />
  );
}
