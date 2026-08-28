"use client";

import type { PstStore } from "@/lib/pst/store";
import {
  Outils as SharedOutils,
  type ArmeUltime,
  type IntroData,
  type SynthAxisData,
} from "@/components/pst/modules/shared/panels/Outils";
import { ThermoSubli } from "./ThermoSubli";

const COMPARATEUR_DATA: SynthAxisData = {
  objectif: {
    precurseurs:
      "Mettre en évidence la surcharge nerveuse objective et l'aliénation temporelle imposée par l'organisation industrielle du travail (le taylorisme).",
    dejours:
      "Analyser comment le sujet négocie la souffrance inhérente à l'épreuve du réel, et comment cette souffrance se transforme en plaisir et en santé.",
    molinier:
      "Rendre visibles les habiletés de souci de l'autre et les souffrances invisibilisées par la division sexuelle du travail et l'idéologie virile.",
  },
  terrain: {
    precurseurs:
      "Enquêtes cliniques monographiques sur des professions ciblées (téléphonistes, dactylographes) combinant observations et données médicales.",
    dejours:
      "Enquêtes cliniques collectives basées sur des groupes de volontaires homogènes, reposant exclusivement sur la parole libre et la délibération.",
    molinier:
      "Clinique de terrain participante au plus près du travail de soin (care), dans des établissements de santé ou auprès de travailleuses invisibles.",
  },
  sante: {
    precurseurs:
      "Absence de surcharge nerveuse et de pathologie d'usure physique (TMS, fatigue cumulative). Approche hygiéniste.",
    dejours:
      "Équilibre psychique dynamique résultant d'une négociation active face au réel du travail et validé par la reconnaissance sociale.",
    molinier:
      "Capacité d'agir et de se soucier d'autrui sans y perdre sa propre identité ou être nié par l'organisation virile dominante.",
  },
  methode: {
    precurseurs:
      "Interviews cliniques individuelles, analyses statistiques de l'absentéisme et rapports de médecine du travail.",
    dejours:
      "Protocole d'enquête collective en 7 étapes (Demande, Pré-enquête, Groupes homogènes, Auditions cliniques, Rapport, Validation, Restitution).",
    molinier:
      "Observation qualitative prolongée, récits de vie et décodage de la charge psychique liée aux exigences relationnelles.",
  },
  mots: {
    precurseurs:
      '"Névrose des téléphonistes", "fatigue nerveuse", "Claude Veil (fatigue/souffrance)", "Le Guillant".',
    dejours:
      '"Réel du travail", "intelligence pratique (Métis)", "souffrance éthique", "sublimation", "jugement de beauté/utilité".',
    molinier:
      '"Genre & Care", "invisibilité sociale", "habiletés discrètes", "division sexuelle du travail".',
  },
};

const INTRO_DATA: IntroData = {
  ethique: {
    step1:
      "La question de la souffrance éthique constitue un tournant clinique majeur en psychodynamique du travail : comment un individu peut-il être amené à accomplir des actes que sa conscience morale réprouve ?",
    step2:
      "Christophe Dejours a mis en évidence le fait que la souffrance éthique n'est pas une simple défaillance morale individuelle, mais le résultat de contraintes organisationnelles qui exigent la complicité active des travailleurs.",
    step3:
      "Par quels mécanismes l'organisation moderne du travail parvient-elle à neutraliser la sensibilité éthique des sujets, et comment cette compromission affecte-t-elle leur santé mentale ?",
    step4:
      "Nous analyserons d'une part les ressorts organisationnels de la servitude volontaire et de la souffrance éthique, puis nous étudierons le rôle des idéologies défensives dans la rationalisation de cette souffrance.",
  },
  evaluation: {
    step1:
      "L'introduction de l'évaluation individuelle des performances (EIP) a profondément transformé le paysage relationnel des organisations contemporaines, remplaçant la coopération par la concurrence.",
    step2:
      "Les travaux de Christophe Dejours démontrent que l'EIP détruit la confiance horizontale et sabote la construction collective des règles du métier, qui sont les piliers de la santé mentale au travail.",
    step3:
      "Dans quelle mesure l'individualisation des critères d'évaluation déstructure-t-elle les espaces de délibération collective et favorise-t-elle l'émergence de décompensations psychopathologiques ?",
    step4:
      "Nous examinerons d'abord le lien entre évaluation quantitative et destruction du vivre-ensemble au travail, avant d'aborder les répercussions psychopathologiques de la solitude au travail.",
  },
  care: {
    step1:
      "Le travail de soin, ou care, a longtemps été considéré comme naturel et instinctif, échappant ainsi à toute forme de reconnaissance professionnelle et de mesure objective.",
    step2:
      "La sociologue Pascale Molinier a théorisé l'invisibilité sociale du care et souligné comment la division sexuelle du travail attribue de manière stéréotypée les rôles de soutien aux femmes.",
    step3:
      "En quoi l'invisibilisation des habiletés discrètes du care participe-t-elle à la souffrance psychique des travailleuses, et comment l'idéologie de la virilité fait-elle obstacle à cette reconnaissance ?",
    step4:
      "Nous mettrons en lumière la spécificité des compétences relationnelles du care, puis nous analyserons les barrières de genre et de virilité qui en empêchent la valorisation.",
  },
  enquete: {
    step1:
      "Mener une recherche sur le lien entre santé mentale et travail requiert un dispositif méthodologique rigoureux qui rompt avec la neutralité distanciée du positivisme classique.",
    step2:
      "L'enquête clinique collective théorisée par Christophe Dejours repose sur la rencontre entre une demande de travailleurs en souffrance et une posture clinique d'écoute et de co-construction.",
    step3:
      "Comment la méthodologie de l'enquête collective permet-elle d'accéder au réel de l'activité tout en amorçant une dynamique de transformation de la souffrance en santé ?",
    step4:
      "Nous détaillerons les étapes fondatrices du protocole de recherche-action en psychodynamique, puis nous analyserons les conditions éthiques et cliniques de sa validation par le collectif.",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  ethique: [
    "Parole morale de complicité",
    "Dejours & servitude éthique",
    "Neutralisation de la sensibilité",
    "Servitude volontaire vs Idéologie de métier",
  ],
  evaluation: [
    "EIP & concurrence généralisée",
    "Dejours & destruction des liens",
    "Décompensation & désert relationnel",
    "Sape du collectif & impacts somatiques/psychiques",
  ],
  care: [
    "Souci d'autrui non chiffrable",
    "Molinier & rapports de sexe",
    "Souffrance invisible & virilité de dénégation",
    "Spécificité du care & idéologie de métier",
  ],
  enquete: [
    "Recherche-action engagée",
    "Rencontre de la souffrance & écoute clinique",
    "Accès au réel & levier politique",
    "Protocole en 7 étapes & validation collective",
  ],
};

const ARME: ArmeUltime = {
  title:
    "💡 L'Arme Ultime de Conclusion : Axel Honneth et la Théorie de la Reconnaissance",
  intro: (
    <>
      Pour une conclusion d&apos;excellence, reliez l&apos;approche clinique de
      Christophe Dejours à la philosophie sociale d&apos;<b>Axel Honneth</b>. Il
      montre que la reconnaissance est le ciment de l&apos;identité humaine à
      trois niveaux :
    </>
  ),
  items: [
    <>
      <b>Les Trois Sphères de Reconnaissance</b> : L&apos;amour (confiance en
      soi dans l&apos;intimité), le droit (respect de soi en tant que citoyen
      égal), et la solidarité (estime de soi par la contribution au collectif,
      notamment par le travail).
    </>,
    <>
      <b>Le Déni comme Mutilation Subjective</b> : Ne pas être reconnu dans son
      travail n&apos;est pas seulement désagréable ; c&apos;est une blessure
      morale profonde qui détruit l&apos;estime de soi pratique et empêche la
      subjectivation du travailleur.
    </>,
    <>
      <b>Lien avec la santé au travail</b> : La lutte pour la reconnaissance (à
      travers les jugements de beauté des pairs et d&apos;utilité de la
      hiérarchie) est le moteur de la sublimation de la souffrance. Le déni de
      reconnaissance détruit ce levier et mène à la décompensation somatique ou
      psychique.
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
      comparateurHint="Le correcteur attend une comparaison structurée des courants sur les notions clés. Sélectionne une thématique ci-dessous pour charger les positions théoriques."
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
          label: "Précurseurs (Le Guillant)",
          color: "var(--precurseurs)",
        },
        {
          key: "dejours",
          label: "Psychodynamique (Dejours)",
          color: "var(--dejours)",
        },
        {
          key: "molinier",
          label: "Care & Genre (Molinier)",
          color: "var(--molinier)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        { key: "ethique", label: "Souffrance éthique" },
        { key: "evaluation", label: "Évaluation & Performance" },
        { key: "care", label: "Division sexuelle & Care" },
        { key: "enquete", label: "Enquête collective" },
      ]}
      introData={INTRO_DATA}
      introCues={INTRO_CUES}
      defaultIntroTheme="ethique"
      specialWidget={
        <ThermoSubli store={store} onStoreChange={onStoreChange} />
      }
      arme={ARME}
    />
  );
}
