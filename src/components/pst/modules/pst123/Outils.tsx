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
      "Comprendre la dynamique de socialisation et la construction continue de l'identité entre le sujet (biographique) et l'institution (relationnelle).",
    dejours:
      "Dévoiler les mécanismes invisibles de reproduction sociale, de domination symbolique et l'incorporation de l'ordre établi dans les corps et les esprits.",
    molinier:
      "Analyser comment l'organisation du travail et l'accès au pouvoir façonnent la culture politique et les attitudes démocratiques de l'adulte.",
  },
  terrain: {
    precurseurs:
      "Résultat instable d'une double transaction : biographique (pour soi, actes d'appartenance) et relationnelle (pour autrui, actes d'attribution).",
    dejours:
      "Habitus incorporé : système de dispositions durables et transposables résultant de l'équation (Dispositions + Capital) × Champ.",
    molinier:
      "Culture relationnelle intériorisée selon 4 modèles d'accès au pouvoir : fusionnel, retrait, négociateur, affinitaire.",
  },
  sante: {
    precurseurs:
      "Rapports de force autour de la reconnaissance des titres et des compétences (promotion, conversion, blocage, exclusion).",
    dejours:
      "Violence symbolique douce et consentie : le dominé adhère inconsciemment aux catégories d'évaluation des dominants.",
    molinier:
      "L'accès au pouvoir (ou son absence) structure l'action : bloc unanime contre le chef (fusion), repli hors-travail (retrait), ou débat démocratique (négociation).",
  },
  methode: {
    precurseurs:
      "Reconnaissance institutionnelle interne (promotion) ou externe (diplômes, pairs) vs sentiment d'amputation et blocage statutaire.",
    dejours:
      "L'illusio : investissement passionné dans le jeu du travail, qui procure du sens mais masque la vérité objective de l'exploitation.",
    molinier:
      "Reconnaissance par les pairs (camaraderie d'atelier ou clans affinitaires) ou reconnaissance d'expertise par le management.",
  },
  mots: {
    precurseurs:
      "« Transaction biographique / relationnelle », « Actes d'attribution / appartenance », « Promotion, conversion, blocage, exclusion ».",
    dejours:
      "« Algorithme de l'habitus », « 4 capitaux », « Violence symbolique », « Double vérité du travail », « Illusio ».",
    molinier:
      "« Modèle fusionnel », « Modèle du retrait », « Modèle négociateur », « Modèle affinitaire », « Socialisation politique ».",
  },
};

const INTRO_DATA: IntroData = {
  demande: {
    step1:
      "L'identité au travail a longtemps été appréhendée par les organisations comme une simple étiquette statique ou un rôle professionnel prédéfini.",
    step2:
      "Claude Dubar (1991) démontre au contraire qu'elle résulte d'une double transaction permanente : biographique (pour soi, temporelle) et relationnelle (pour autrui, institutionnelle).",
    step3:
      "Dans quelle mesure la crise de l'identité professionnelle naît-elle de la rupture et du désaccord entre ces deux transactions ?",
    step4:
      "Nous analyserons d'abord l'articulation entre actes d'attribution et actes d'appartenance, avant d'étudier les quatre dynamiques de reconnaissance institutionnelle.",
  },
  secret: {
    step1:
      "Le discours managérial contemporain glorifie l'autonomie, l'engagement et l'épanouissement personnel des salariés dans l'activité.",
    step2:
      "Pierre Bourdieu (1996) dévoile la 'double vérité du travail' : un accomplissement subjectif passionné (l'illusio) masquant une vérité objective d'exploitation économique.",
    step3:
      "Comment la théorie de l'habitus et de la domination symbolique permet-elle de déconstruire le consentement des travailleurs à l'ordre établi ?",
    step4:
      "Nous étudierons dans un premier temps l'algorithme de l'habitus et la répartition des capitaux, avant d'examiner le paradoxe de l'illusio au travail.",
  },
  bilan: {
    step1:
      "La sociologie classique des organisations a souvent réduit l'entreprise à un système technique et hiérarchique d'exécution.",
    step2:
      "Renaud Sainsaulieu (1977) révolutionne cette approche en démontrant que le travail est la matrice centrale d'apprentissage culturel des normes démocratiques chez l'adulte.",
    step3:
      "En quoi les différents modes d'accès au pouvoir au sein de l'organisation façonnent-ils des cultures et des identités relationnelles distinctes ?",
    step4:
      "Nous présenterons la typologie des quatre modèles relationnels (fusionnel, retrait, négociateur, affinitaire), puis nous discuterons de leurs mutations sous le management moderne.",
  },
  expertise: {
    step1:
      "Les souffrances éthiques et la perte de sens au travail sont trop souvent réduites par la gestion à du stress individuel mesurable.",
    step2:
      "Axel Honneth (1992) montre que l'identité exige une confirmation intersubjective à travers trois sphères de reconnaissance morale (amour, droit, estime sociale).",
    step3:
      "En quoi le déni de reconnaissance et le travail invisible constituent-ils une blessure morale majeure conduisant à la désaffiliation ?",
    step4:
      "Nous examinerons d'une part la dynamique des trois sphères de reconnaissance, puis nous analyserons les formes de mépris social et leurs effets psychiques.",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  demande: [
    "Double transaction de Dubar",
    "Actes d'attribution vs appartenance",
    "Promotion, conversion, blocage, exclusion",
    "Crise identitaire & reconnaissance",
  ],
  secret: [
    "Bourdieu & violence symbolique",
    "Formule de l'habitus & 4 capitaux",
    "Double vérité du travail (1996)",
    "Illusio & investissement passionné",
  ],
  bilan: [
    "Sainsaulieu & culture d'entreprise",
    "4 modèles d'accès au pouvoir",
    "Socialisation politique de l'adulte",
    "Impact du lean & individualisation",
  ],
  expertise: [
    "Honneth & lutte pour la reconnaissance",
    "3 sphères : amour, droit, estime sociale",
    "Mépris social & travail invisible",
    "Santé mentale & dignité morale",
  ],
};

const ARME: ArmeUltime = {
  title:
    "L'Arme Ultime de Conclusion : Axel Honneth & Paul Ricœur — La Reconnaissance Mutuelle comme Condition de Santé",
  intro: (
    <>
      Pour une conclusion majeure distinguant votre copie, liez la théorie de la
      reconnaissance d&apos;<b>Axel Honneth</b> à la visée éthique de{" "}
      <b>Paul Ricœur</b> :
    </>
  ),
  items: [
    <>
      <b>Reconnaissance mutuelle vs adaptation marchande</b> : Honneth rappelle
      que l&apos;identité ne préexiste pas aux relations sociales : elle
      s&apos;acquiert dans l&apos;inter-reconnaissance. Le travail n&apos;est
      pas seulement économique, il est moral (sphère de la solidarité et estime
      de soi).
    </>,
    <>
      <b>La visée éthique selon Paul Ricœur</b> : Ricœur définit la visée
      éthique comme « le souhait d&apos;une vie accomplie, avec et pour les
      autres, dans des institutions justes ». Une organisation qui refuse la
      reconnaissance institutionnelle détruit la justice de l&apos;institution.
    </>,
    <>
      <b>Portée pour le psychologue du travail</b> : Face aux souffrances
      identitaires, la mission du psychologue n&apos;est pas d&apos;adapter le
      salarié à la domination par des techniques de résilience, mais de rouvrir
      des espaces délibératifs où la double transaction (Dubar) et la
      reconnaissance mutuelle (Honneth) redeviennent viables.
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
      hint="Des outils interactifs conçus pour structurer tes écrits et maîtriser les contrastes méthodologiques du cours de Mme Lucy."
      comparateurTitle="⏰ Comparateur Théorique de l'Examen (Lucy · PST123)"
      comparateurHint="Le correcteur attend une comparaison rigoureuse des paradigmes sociologiques. Sélectionne un axe ci-dessous pour charger les positions d'auteurs."
      synthAxes={[
        { key: "objectif", label: "Visée & Objet" },
        { key: "terrain", label: "Conception de l'Identité" },
        { key: "sante", label: "Rapport au Pouvoir" },
        { key: "methode", label: "Ressort de Reconnaissance" },
        { key: "mots", label: "Mots-clés Clés" },
      ]}
      comparateurColumns={[
        {
          key: "precurseurs",
          label: "Claude Dubar (Double Transaction)",
          color: "var(--deontologie)",
        },
        {
          key: "dejours",
          label: "Pierre Bourdieu (Habitus & Illusio)",
          color: "var(--rps)",
        },
        {
          key: "molinier",
          label: "Renaud Sainsaulieu (4 Modèles Culturels)",
          color: "var(--transitions)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        { key: "demande", label: "Claude Dubar (Double transaction)" },
        { key: "secret", label: "Pierre Bourdieu (Habitus & Illusio)" },
        { key: "bilan", label: "Renaud Sainsaulieu (4 Modèles)" },
        { key: "expertise", label: "Axel Honneth (Reconnaissance)" },
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
