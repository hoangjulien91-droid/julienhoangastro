"use client";

import type { PstStore } from "@/lib/pst/store";
import {
  Outils as SharedOutils,
  type ArmeUltime,
  type IntroData,
  type SynthAxisData,
} from "@/components/pst/modules/shared/panels/Outils";
import { BuhlerOrganon } from "./BuhlerOrganon";

const COMPARATEUR_DATA: SynthAxisData = {
  objectif: {
    bourdieu:
      "Démystifier l'illusion internaliste du langage : analyser le marché linguistique et révéler comment le pouvoir symbolique et l'autorité statutaire ('Status est magistratus') s'imposent par la violence symbolique.",
    habermas:
      "Fonder une théorie critique de la société sur l'intercompréhension : distinguer l'agir stratégique (succès/manipulation) de l'agir communicationnel orienté vers l'entente libre (Verständigung) et la validité.",
    honneth:
      "Refonder la théorie critique sur les luttes morales pour la reconnaissance (amour, droit, estime sociale). Analyser la souffrance au travail comme déni de reconnaissance et réification.",
    valls_iod:
      "Rompre avec l'idéologie normative de l'employabilité : refuser le tri préalable des personnes et agir directement sur le milieu de travail et les offres d'emploi pour négocier l'accueil réel.",
  },
  terrain: {
    bourdieu:
      "Le langage au travail est un capital symbolique situé dans un rapport de forces. L'insulte ou la parole managériale tirent leur force de l'institution et des stigmates sociaux incorporés (habitus).",
    habermas:
      "Le travail et l'organisation sont le lieu de tension permanent entre la rationalité instrumentale (système économique/bureaucratique) et le monde vécu (espaces de délibération collective).",
    honneth:
      "Le milieu professionnel est le creuset de l'estime sociale et de la reconnaissance de l'utilité des compétences. La réification managériale oublie le sujet pour ne voir qu'une ressource.",
    valls_iod:
      "L'entreprise ordinaire et le marché du travail masqué. L'intervention s'effectue sur le poste réel, en levant les critères discriminants et en accompagnant employeur et salarié.",
  },
  sante: {
    bourdieu:
      "Émancipation = lucidité sociologique sur les mécanismes d'imposition symbolique et désamorçage de la violence symbolique intériorisée.",
    habermas:
      "Santé & démocratie = déploiement d'espaces publics internes non distordus où les salariés peuvent débattre démocratiquement des règles et de la justesse du travail.",
    honneth:
      "Santé psychique = intégrité morale garantie par les 3 sphères de reconnaissance ; lutte contre l'invisibilisation et le mépris social (ex. maraudes SAMU social).",
    valls_iod:
      "Inclusion durable = accès effectif au droit commun du salariat, protection contre la désaffiliation (Robert Castel) et restauration du statut social sans stigmatisation.",
  },
  methode: {
    bourdieu:
      "Sociologie réflexive des institutions, analyse des actes d'institution (rituel du lit de justice), sociolinguistique de l'efficacité performative (Éric Lucy).",
    habermas:
      "Éthique de la discussion (Principe D), argumentation rationnelle soumise aux 4 prétentions à la validité (intelligibilité, vérité, justesse, sincérité).",
    honneth:
      "Phénoménologie morale de la reconnaissance, clinique de la relation d'aide et de la discussion intersubjective (réinstitution du sujet exclu).",
    valls_iod:
      "Protocole en 7 étapes : prospection d'entreprises, analyse du travail réel sur le poste, négociation des conditions, mise en relation directe sans tri, suivi bilatéral durable.",
  },
  mots: {
    bourdieu:
      "« pouvoir symbolique », « Status est magistratus », « marché linguistique », « acte d'institution », « lit de justice », « efficacité performative », « violence symbolique ».",
    habermas:
      "« agir communicationnel », « agir stratégique », « Verständigung », « 4 prétentions à la validité », « éthique de la discussion », « monde vécu vs système ».",
    honneth:
      "« reconnaissance morale », « amour / droit / estime », « réification », « oubli de la reconnaissance », « mépris social », « intersubjectivité ».",
    valls_iod:
      "« Méthode IOD », « refus du tri préalable », « idéologie de l'employabilité », « négociation sur l'offre », « désaffiliation (Castel) », « travail réel ».",
  },
};

const INTRO_DATA: IntroData = {
  bourdieu_austin: {
    step1:
      "Le sens commun et la pragmatique linguistique d'Austin attribuent spontanément le pouvoir des mots à leur force illocutoire propre, comme si la parole portait en elle-même sa propre efficacité.",
    step2:
      "Pierre Bourdieu opère une rupture sociologique décisive dans 'Ce que parler veut dire' : le pouvoir des mots ne réside pas dans la langue, mais dans l'institution sociale et l'autorité statutaire déléguée au locuteur — 'Status est magistratus'.",
    step3:
      "En quoi le déplacement de l'analyse linguistique vers les rapports sociaux de pouvoir permet-il de comprendre l'efficacité performative et la violence symbolique des paroles au travail ?",
    step4:
      "Nous analyserons d'abord les limites de l'illusion internaliste d'Austin, puis nous démontrerons avec Bourdieu et Éric Lucy comment l'acte d'institution et l'insulte tirent leur force des hiérarchies sociales instituées.",
  },
  habermas_deliberation: {
    step1:
      "Dans les organisations contemporaines, la communication managériale est couramment présentée comme un outil de cohésion et d'adhésion bienveillante des salariés.",
    step2:
      "Jürgen Habermas dévoile l'ambiguïté fondamentale de la parole en opposant l'agir stratégique, orienté vers l'efficacité et l'influence d'autrui, à l'agir communicationnel, visant l'intercompréhension libre (Verständigung) par la délibération rationnelle.",
    step3:
      "Dans quelle mesure la restauration d'une éthique de la discussion et la soumission des décisions aux quatre prétentions universelles à la validité peuvent-elles démocratiser le travail ?",
    step4:
      "Nous distinguerons d'abord l'agir stratégique instrumental de l'agir communicationnel, puis nous explorerons les conditions d'un espace public interne garantissant la délibération sur le travail réel.",
  },
  honneth_reconnaissance: {
    step1:
      "La souffrance et les conflits au travail sont encore trop souvent réduits à des revendications salariales matérielles ou à des fragilités psychologiques individuelles.",
    step2:
      "Axel Honneth montre que les luttes sociales sont avant tout des luttes morales pour la reconnaissance, dont l'estime sociale au travail constitue le pilier central face aux ravages de la réification.",
    step3:
      "Comment la reconnaissance intersubjective et le refus de la réification permettent-ils de refonder la dignité des professionnels et l'accompagnement des personnes vulnérables ?",
    step4:
      "Nous examinerons d'abord les trois sphères de la reconnaissance morale d'Honneth, puis nous analyserons avec Éric Lucy comment la parole partagée en maraude ou en équipe réinstitue le sujet dans sa dignité.",
  },
  valls_iod_insertion: {
    step1:
      "Les politiques traditionnelles d'insertion et de recrutement reposent sur l'injonction d'employabilité, exigeant des exclus qu'ils s'adaptent et subissent des tris préalables successifs.",
    step2:
      "Francis Valls et Denis Castra, dans la lignée des travaux de Robert Castel, rompent avec ce paradigme en concevant la méthode IOD : refuser le tri déontologique et négocier directement sur les situations et offres d'emploi réelles.",
    step3:
      "En quoi le basculement d'une logique de sélection normative à une démarche de négociation avec l'entreprise transforme-t-il l'accès durable à l'emploi des personnes les plus éloignées du marché ?",
    step4:
      "Nous déconstruirons d'abord l'idéologie individualisante de l'employabilité, puis nous exposerons la démarche méthodologique IOD fondée sur la médiation bilatérale et l'adaptation du milieu de travail.",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  bourdieu_austin: [
    "Illusion internaliste d'Austin (pouvoir dans les mots)",
    "Bourdieu & 'Status est magistratus' (pouvoir délégué)",
    "Rupture sociologique & violence symbolique",
    "Annonce : limites Austin → institution & insulte (Lucy)",
  ],
  habermas_deliberation: [
    "Communication managériale & fausse transparence",
    "Agir stratégique (succès) vs communicationnel (entente)",
    "4 prétentions à la validité & éthique de la discussion",
    "Annonce : distinction des agirs → conditions délibération",
  ],
  honneth_reconnaissance: [
    "Souffrance réduite à l'individuel ou au matériel",
    "Luttes morales pour la reconnaissance & 3 sphères",
    "Réification comme oubli d'autrui & dignité",
    "Annonce : sphères de reconnaissance → clinique (Lucy SAMU)",
  ],
  valls_iod_insertion: [
    "Idéologie de l'employabilité & sélection normative",
    "Castra & Valls (IOD) : refus du tri & Robert Castel",
    "Médiation sur l'offre d'emploi & travail réel",
    "Annonce : critique employabilité → démarche IOD en 7 étapes",
  ],
};

const ARME: ArmeUltime = {
  title:
    "L'Arme Ultime de Conclusion : Robert Castel & Jürgen Habermas — L'Émancipation par le Droit et la Parole",
  intro: (
    <>
      Pour conclure avec panache une dissertation de PST108, opérez une synthèse
      sociologique et philosophique de haut vol articulant <b>Robert Castel</b>{" "}
      (sociologie de la citoyenneté salariale) et <b>Jürgen Habermas</b>{" "}
      (théorie de la démocratie délibérative) :
    </>
  ),
  items: [
    <>
      <b>Contre la désaffiliation sociale (Robert Castel)</b> : Le travail
      n&apos;est pas seulement une fonction économique, il est le support
      central de la citoyenneté, de la reconnaissance juridique et de la
      protection sociale. Exclure un individu du travail ou le reléguer dans des
      sous-statuts, c&apos;est menacer sa dignité fondamentale de citoyen.
    </>,
    <>
      <b>L&apos;intégration directe sans tri (Méthode IOD &amp; Éric Lucy)</b> :
      L&apos;action du praticien ne consiste pas à « normaliser »
      psychologiquement l&apos;individu pour le rendre conforme aux exigences
      managériales, mais à intervenir sur les milieux de travail concrets pour
      lever les barrières arbitraires et lui rouvrir l&apos;accès au droit
      commun du travail ordinaire.
    </>,
    <>
      <b>L&apos;éthique de la discussion au travail</b> : Une organisation
      démocratique et saine remplace la violence symbolique des mots
      d&apos;ordre unilatéraux par l&apos;agir communicationnel (Habermas). La
      santé au travail s&apos;enracine dans la capacité des collectifs à
      débattre rationnellement de la justesse de leurs règles et à faire
      entendre leur voix sans crainte de représailles.
    </>,
  ],
};

interface OutilsProps {
  store: PstStore;
}

export function Outils({ store }: OutilsProps) {
  return (
    <SharedOutils
      hint="Des outils interactifs conçus pour structurer tes écrits et maîtriser les contrastes théoriques."
      comparateurTitle="Comparateur des cadres théoriques PST108"
      comparateurHint="Le correcteur attend une comparaison rigoureuse des cadres sur les notions clés. Sélectionne une thématique ci-dessous pour charger les positions théoriques de Bourdieu, Habermas, Honneth et Valls."
      synthAxes={[
        { key: "objectif", label: "Objet d'analyse & Finalité" },
        { key: "terrain", label: "Rapport au travail & à la parole" },
        { key: "sante", label: "Conception de la santé / Émancipation" },
        { key: "methode", label: "Méthode d'intervention" },
        { key: "mots", label: "Mots-clés & Formules décisives" },
      ]}
      comparateurColumns={[
        {
          key: "bourdieu",
          label: "Pierre Bourdieu (Pouvoir symbolique)",
          color: "var(--bourdieu)",
        },
        {
          key: "habermas",
          label: "Jürgen Habermas (Agir communicationnel)",
          color: "var(--habermas)",
        },
        {
          key: "honneth",
          label: "Axel Honneth (Reconnaissance morale)",
          color: "var(--honneth)",
        },
        {
          key: "valls_iod",
          label: "Francis Valls (Méthode IOD)",
          color: "var(--valls_iod)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        {
          key: "bourdieu_austin",
          label: "Bourdieu vs Austin (Pouvoir symbolique)",
        },
        {
          key: "habermas_deliberation",
          label: "Habermas (Agir communicationnel)",
        },
        {
          key: "honneth_reconnaissance",
          label: "Axel Honneth (Reconnaissance)",
        },
        { key: "valls_iod_insertion", label: "Francis Valls (Méthode IOD)" },
      ]}
      introData={INTRO_DATA}
      introCues={INTRO_CUES}
      defaultIntroTheme="bourdieu_austin"
      specialWidget={<BuhlerOrganon store={store} />}
      arme={ARME}
    />
  );
}
