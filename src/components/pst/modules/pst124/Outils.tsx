"use client";

import type { PstStore } from "@/lib/pst/store";
import {
  Outils as SharedOutils,
  type ArmeUltime,
  type IntroData,
  type SynthAxisData,
} from "@/components/pst/modules/shared/panels/Outils";
import { AuditDigital } from "./AuditDigital";

const COMPARATEUR_DATA: SynthAxisData = {
  objectif: {
    precurseurs:
      "Analyser le couple sujet-instrument : comment l'artefact devient instrument par la genèse instrumentale (instrumentation / instrumentalisation).",
    dejours:
      "Évaluer l'acceptation située d'une technologie par ses effets réels sur l'activité, le collectif, l'identité et le pouvoir d'agir.",
    molinier:
      "Analyser la technologie comme perturbation du système d'activité global (sujet, objet, outil, règles, communauté, division du travail).",
  },
  terrain: {
    precurseurs:
      "Au plus près des schèmes d'usage : observer comment le sujet s'approprie, adapte et détourne concrètement l'artefact.",
    dejours:
      "Posture clinique et transformatrice : partir de l'usage réel et des difficultés rencontrées pour restaurer le pouvoir d'agir.",
    molinier:
      "Posture systémique : repérer les contradictions que l'outil introduit dans l'organisation et la division du travail.",
  },
  sante: {
    precurseurs:
      "Réussite = l'artefact est devenu un véritable instrument, intégré aux schèmes d'action du sujet.",
    dejours:
      "Réussite = un instrument capacitant qui développe le pouvoir d'agir et permet de faire un beau travail.",
    molinier:
      "Réussite = les contradictions systémiques sont surmontées et le système d'activité se ré-équilibre.",
  },
  methode: {
    precurseurs:
      "Analyse des genèses instrumentales, des schèmes d'utilisation et des détournements observés en situation.",
    dejours:
      "Clinique de l'usage : grille des 4 dimensions, analyse de l'activité, espaces de délibération et conception continuée.",
    molinier:
      "Analyse du système d'activité, repérage des contradictions et laboratoire du changement (Change Laboratory).",
  },
  mots: {
    precurseurs:
      "« artefact / instrument », « instrumentation », « instrumentalisation », « braconnage », « schèmes d'usage ».",
    dejours:
      "« acceptation située », « clinique de l'usage », « pouvoir d'agir », « 4 dimensions », « conception continuée ».",
    molinier:
      "« système d'activité », « contradictions systémiques », « règles / communauté / division du travail ».",
  },
};

const INTRO_DATA: IntroData = {
  acceptation: {
    step1:
      "L'évaluation des technologies au travail a longtemps reposé sur l'idée qu'un outil utile et facile à utiliser serait spontanément adopté par un utilisateur rationnel.",
    step2:
      "Marc-Éric Bobillier Chaumon opère un renversement : l'acceptation ne se décrète pas a priori (acceptabilité), elle se construit a posteriori, dans et par l'activité réelle, face aux contradictions du travail.",
    step3:
      "Dans quelle mesure le passage de l'acceptabilité à l'acceptation située transforme-t-il la manière d'évaluer une technologie et de diagnostiquer ses effets sur l'activité ?",
    step4:
      "Nous critiquerons d'abord les modèles d'acceptabilité a priori (TAM/UTAUT), puis nous déploierons la grille des quatre dimensions de l'acceptation située comme outil de diagnostic.",
  },
  algorithme: {
    step1:
      "L'essor de l'IA et des algorithmes de pilotage a profondément reconfiguré les formes de contrôle dans les organisations contemporaines.",
    step2:
      "Le management algorithmique déplace la prescription du manager humain vers le code informatique : le rythme et l'organisation ne sont plus négociés, mais calculés et surveillés en continu.",
    step3:
      "Comment le pilotage algorithmique invisibilise-t-il le travail réel et empêche-t-il l'activité, et à quelles conditions une technologie peut-elle redevenir capacitante ?",
    step4:
      "Nous analyserons d'abord les ressorts de la prescription algorithmique et de l'invisibilisation du travail, avant d'étudier les leviers permettant de restaurer le pouvoir d'agir.",
  },
  capacitant: {
    step1:
      "Une même technologie peut tour à tour développer ou réduire les compétences de ceux qui l'utilisent : tout dépend de la place laissée à leur activité.",
    step2:
      "La distinction entre technologies capacitantes et incapacitantes (taylorisme numérique) porte sur le pouvoir de développement de l'outil : autonomie et collectif d'un côté, contrôle et isolement de l'autre.",
    step3:
      "À quelles conditions de conception une technologie soutient-elle le développement des compétences et du pouvoir d'agir plutôt que la déqualification et la surveillance ?",
    step4:
      "Nous caractériserons d'abord la boussole capacitant / incapacitant, puis nous montrerons en quoi la conception participative rend l'outil capacitant.",
  },
  intervention: {
    step1:
      "Face à un déploiement technologique qui « échoue », le réflexe est souvent de former davantage les utilisateurs ou de dénoncer leur résistance.",
    step2:
      "La clinique de l'usage (Bobillier Chaumon & Clot) propose une autre voie : analyser les situations médiatisées pour comprendre les effets de l'outil sur l'activité et restaurer le pouvoir d'agir.",
    step3:
      "Comment l'intervention en clinique de l'usage permet-elle de transformer un artefact imposé en instrument au service du développement de l'activité ?",
    step4:
      "Nous présenterons d'abord la posture et la grille de diagnostic de la clinique de l'usage, puis le principe de la conception continuée dans l'usage et de la délibération collective.",
  },
};

const INTRO_CUES: Record<string, string[]> = {
  acceptation: [
    "Outil utile & facile → adoption ?",
    "Bobillier Chaumon & renversement a posteriori",
    "Acceptabilité → acceptation située",
    "Critique TAM/UTAUT & grille des 4 dimensions",
  ],
  algorithme: [
    "Nouvelles formes de contrôle algorithmique",
    "Prescription déplacée vers le code",
    "Invisibilisation & activité empêchée",
    "Ressorts de l'algorithme & restauration du pouvoir d'agir",
  ],
  capacitant: [
    "Même outil, effets opposés",
    "Boussole capacitant / incapacitant",
    "Conditions de conception & pouvoir d'agir",
    "Boussole de l'outil & conception participative",
  ],
  intervention: [
    "Faux diagnostic : « former / résistance »",
    "Clinique de l'usage & pouvoir d'agir",
    "Artefact → instrument au service du développement",
    "Posture & grille / conception continuée",
  ],
};

const ARME: ArmeUltime = {
  title:
    "💡 L'Arme Ultime de Conclusion : Bernard Stiegler et le Pharmakon Technologique",
  intro: (
    <>
      Pour une conclusion brillante sur la clinique des usages numériques,
      ouvrez sur le philosophe de la technique <b>Bernard Stiegler</b> et son
      concept clé de <i>Pharmakon</i> :
    </>
  ),
  items: [
    <>
      <b>La Technique comme Pharmakon</b> : Un objet technique (comme Teams,
      Slack ou l&apos;IA) est un <i>Pharmakon</i>, c&apos;est-à-dire à la fois
      un remède et un poison. Il apporte des gains d&apos;organisation mais peut
      détruire l&apos;attention, délier le collectif et déposséder les sujets de
      leurs savoir-faire (prolétarisation).
    </>,
    <>
      <b>La Genèse Instrumentale (Rabardel) &amp; Thérapeutique</b> :
      L&apos;utilisateur n&apos;est pas passif. L&apos;acte de s&apos;approprier
      l&apos;outil (la genèse instrumentale) est une lutte pour transformer le
      poison en remède. Si l&apos;organisation interdit cette réappropriation
      (Taylorisme algorithmique), le poison l&apos;emporte.
    </>,
    <>
      <b>Le rôle de l&apos;intervenant clinicien</b> : L&apos;ergonome n&apos;a
      pas à rejeter la technologie numérique ni à l&apos;imposer béatement. Son
      rôle est d&apos;agir sur l&apos;organisation pour créer des milieux
      techniques capacitants qui soignent (thérapeutique de l&apos;attention et
      de la coopération) plutôt que de détruire les collectifs de métier.
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
      hint="Des outils interactifs conçus pour structurer tes écrits et maîtriser les contrastes théoriques."
      comparateurTitle="Comparateur des cadres théoriques"
      comparateurHint="Le correcteur attend une comparaison structurée des cadres sur les notions clés. Sélectionne une thématique ci-dessous pour charger les positions théoriques."
      synthAxes={[
        { key: "objectif", label: "Objet d'analyse" },
        { key: "terrain", label: "Posture" },
        { key: "sante", label: "Critère de réussite" },
        { key: "methode", label: "Méthode" },
        { key: "mots", label: "Mots-clés" },
      ]}
      comparateurColumns={[
        {
          key: "precurseurs",
          label: "Rabardel (Genèse instrumentale)",
          color: "var(--precurseurs)",
        },
        {
          key: "dejours",
          label: "Bobillier Chaumon (Clinique de l'usage)",
          color: "var(--dejours)",
        },
        {
          key: "molinier",
          label: "Engeström (Théorie de l'activité)",
          color: "var(--molinier)",
        },
      ]}
      comparateurData={COMPARATEUR_DATA}
      defaultSynthAxis="objectif"
      introThemes={[
        { key: "acceptation", label: "Acceptation située" },
        { key: "algorithme", label: "IA & management algorithmique" },
        { key: "capacitant", label: "Technologies capacitantes" },
        { key: "intervention", label: "Clinique de l'usage" },
      ]}
      introData={INTRO_DATA}
      introCues={INTRO_CUES}
      defaultIntroTheme="acceptation"
      specialWidget={
        <div className="qbox" style={{ marginTop: 25, marginBottom: 25 }}>
          <div
            className="vh"
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              fontSize: 14,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            🤖 Simulateur d&apos;Usages Numériques &amp; Audit Digital
          </div>
          <p
            style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}
          >
            Prends les décisions ergonomiques clés pour introduire des
            technologies collaboratives sans détruire la santé et le pouvoir
            d&apos;agir des salariés.
          </p>
          <AuditDigital store={store} onStoreChange={onStoreChange} />
        </div>
      }
      arme={ARME}
    />
  );
}
