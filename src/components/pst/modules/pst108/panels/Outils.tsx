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
    precurseurs:
      "Comprendre comment le langage social s'intériorise en instrument psychologique qui réalise la pensée et structure la conscience.",
    dejours:
      "Faire du langage un instrument de développement de l'activité : rendre le réel dicible et discutable pour relancer le pouvoir d'agir.",
    molinier:
      "Analyser ce que le langage fait : ses fonctions (Bühler) et sa force d'action (actes de langage d'Austin et Searle).",
  },
  terrain: {
    precurseurs:
      "Le langage est un milieu né de l'intersubjectivité ; il médiatise le développement, du social vers l'intime.",
    dejours:
      "Le langage est le médiateur de l'activité : verbaliser transforme l'expérience en savoir et le métier en objet de débat.",
    molinier:
      "Le langage est un organon et une action située : tout énoncé représente, exprime, appelle et accomplit un acte.",
  },
  sante: {
    precurseurs:
      "Santé = développement des fonctions psychiques par l'appropriation d'instruments sémiotiques.",
    dejours:
      "Santé = pouvoir d'agir restauré par la controverse sur le travail bien fait ; le collectif comme instrument de santé.",
    molinier:
      "Santé = des actes de langage non paradoxaux ; l'énoncé qui empêche (injonction contradictoire) est pathogène.",
  },
  methode: {
    precurseurs:
      "Analyse génétique du développement, observation du passage langage social → langage intérieur.",
    dejours:
      "Auto-confrontation simple puis croisée, retour au collectif, restauration de la dispute professionnelle.",
    molinier:
      "Analyse pragmatique des énoncés : repérage des fonctions, des performatifs et de la force illocutoire.",
  },
  mots: {
    precurseurs:
      "« instrument psychologique », « intériorisation », « interpsychique / intrapsychique », « pensée dialogique ».",
    dejours:
      "« drame du travail », « dicible et discutable », « genre & style », « dispute professionnelle », « pouvoir d'agir ».",
    molinier:
      "« Sprachtheorie », « représentation / expression / appel », « quand dire, c'est faire », « force illocutoire ».",
  },
};

const INTRO_DATA: IntroData = {
  instrument: {
    step1:
      "Le langage est trop souvent réduit à un code servant à transmettre des informations, comme si la pensée préexistait toute faite aux mots qui l'expriment.",
    step2:
      "Vygotski opère un renversement : le langage, d'abord social, s'intériorise pour devenir l'instrument psychologique qui réalise la pensée — « la pensée ne s'exprime pas dans le mot, elle se réalise dans le mot ».",
    step3:
      "En quoi concevoir le langage comme instrument psychologique, et non comme simple code, transforme-t-il la manière dont le psychologue accède à l'activité et la fait évoluer ?",
    step4:
      "Nous montrerons d'abord comment le langage social s'intériorise en outil de la pensée, puis comment sa verbalisation transforme l'expérience du travail en savoir partagé.",
  },
  action: {
    step1:
      "On oppose volontiers les mots et les actes, comme si parler restait sans effet sur le réel et sur autrui.",
    step2:
      "La théorie des actes de langage (Austin, Searle) renverse cette opposition : certains énoncés ne décrivent rien, ils accomplissent un acte — « quand dire, c'est faire ».",
    step3:
      "Dans quelle mesure reconnaître la force d'action du langage permet-il d'analyser les prescriptions paradoxales qui empêchent l'activité au travail ?",
    step4:
      "Nous analyserons d'abord le langage comme action (performatif, force illocutoire), puis ses effets ambivalents : agir, révéler, mais aussi empêcher.",
  },
  controverse: {
    step1:
      "Le travail est spontanément vu comme un espace qu'il faudrait pacifier, où le conflit serait un dysfonctionnement à éliminer.",
    step2:
      "Clot montre au contraire que le travail est un « drame » traversé de conflits de critères, et que le dialogue clinique doit rendre ce réel « dicible et discutable ».",
    step3:
      "Comment la restauration de la dispute professionnelle, plutôt que la recherche d'un consensus mou, relance-t-elle le développement du métier et le pouvoir d'agir ?",
    step4:
      "Nous établirons d'abord la nature conflictuelle du travail, puis le rôle de la controverse saine dans la régénération du genre professionnel.",
  },
  posture: {
    step1:
      "Face à des tensions au travail, on attend souvent du psychologue qu'il apaise les relations ou qu'il prescrive de « bonnes pratiques » de communication.",
    step2:
      "La clinique du dialogue refuse ces deux postures : ni expert surplombant, ni facilitateur neutre, le psychologue prend parti pour l'activité et organise l'affrontement des points de vue.",
    step3:
      "À quelles conditions, et dans quel cadre déontologique, le psychologue peut-il manier la parole comme matière première sans la trahir ni la pacifier ?",
    step4:
      "Nous préciserons d'abord la posture engagée du clinicien (auto-confrontations), puis le cadre déontologique strict qu'exige le maniement de la parole (lien PST123).",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  instrument: [
    "Langage-code → pensée préexistante ?",
    "Vygotski & renversement (réaliser, non traduire)",
    "Instrument psychologique vs simple code",
    "Intériorisation & verbalisation de l'activité",
  ],
  action: [
    "Mots vs actes (fausse opposition)",
    "Austin/Searle & performatif",
    "Force d'action & prescription paradoxale",
    "Langage-action & effets : agir/révéler/empêcher",
  ],
  controverse: [
    "Travail à « pacifier » ?",
    "Clot & drame du travail (dicible/discutable)",
    "Dispute professionnelle vs consensus mou",
    "Nature conflictuelle & controverse saine",
  ],
  posture: [
    "Apaiser ou prescrire ?",
    "Ni expert, ni facilitateur neutre",
    "Manier la parole sans la trahir (cadre)",
    "Posture engagée & cadre déontologique (PST123)",
  ],
};

const ARME: ArmeUltime = {
  title:
    "💡 L'Arme Ultime de Conclusion : Mikhaïl Bakhtine et la Responsabilité Dialogique",
  intro: (
    <>
      Pour conclure brillamment votre copie, ouvrez sur le théoricien de la
      littérature et philosophe du langage <b>Mikhaïl Bakhtine</b>. Son approche
      éclaire la dimension profondément sociale et émancipatrice du langage au
      travail :
    </>
  ),
  items: [
    <>
      <b>L&apos;Hétéroglossie et la Plurivocality</b> : Le langage n&apos;est
      pas un système de signes neutres, mais un champ de bataille traversé par
      les voix d&apos;autrui. Chaque énoncé au travail (une consigne, une
      plainte) est habité par d&apos;autres discours et y répond.
    </>,
    <>
      <b>La Responsabilité du Locuteur</b> : Le sujet n&apos;existe que dans le
      dialogue. Parler, c&apos;est s&apos;engager, prendre position et répondre
      de son acte devant autrui. L&apos;organisation du travail taylorienne
      tente d&apos;imposer un monologue sourd qui mutile ce pouvoir de réponse.
    </>,
    <>
      <b>Lien avec le dialogue professionnel</b> : Pour restaurer la santé, il
      faut rouvrir la controverse professionnelle (Yves Clot), c&apos;est-à-dire
      redonner aux salariés les moyens dialogiques d&apos;être à nouveau les
      auteurs responsables de leurs propres énoncés de métier.
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
      comparateurTitle="Comparateur des cadres théoriques"
      comparateurHint="Le correcteur attend une comparaison structurée des cadres sur les notions clés. Sélectionne une thématique ci-dessous pour charger les positions théoriques."
      synthAxes={[
        { key: "objectif", label: "Objet d'analyse" },
        { key: "terrain", label: "Fonction du langage" },
        { key: "sante", label: "Conception de la santé" },
        { key: "methode", label: "Méthode" },
        { key: "mots", label: "Mots-clés" },
      ]}
      comparateurColumns={[
        {
          key: "precurseurs",
          label: "Vygotski (Instrument psychologique)",
          color: "var(--precurseurs)",
        },
        {
          key: "dejours",
          label: "Clot (Clinique du dialogue)",
          color: "var(--dejours)",
        },
        {
          key: "molinier",
          label: "Pragmatique (Bühler, Austin/Searle)",
          color: "var(--molinier)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        { key: "instrument", label: "Langage, instrument psychologique" },
        { key: "action", label: "Quand dire, c'est faire" },
        { key: "controverse", label: "Controverse & dispute" },
        { key: "posture", label: "Posture du clinicien" },
      ]}
      introData={INTRO_DATA}
      introCues={INTRO_CUES}
      defaultIntroTheme="instrument"
      specialWidget={<BuhlerOrganon store={store} />}
      arme={ARME}
    />
  );
}
