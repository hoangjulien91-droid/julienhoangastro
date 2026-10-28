import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  BookMarked,
  Search,
  Copy,
  Check,
  Plus,
  Trash2,
  Download,
  Tag,
  Quote,
  Sparkles,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PstBibliographyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BiblioReference {
  id: string;
  authors: string;
  year: string;
  title: string;
  publisherOrJournal: string;
  apa7Full: string;
  inTextCitation: string;
  stream: string;
  ues: string[];
  keyConcept: string;
  examUsageTip: string;
  isCustom?: boolean;
}

import { PST106_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst106";
import { PST108_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst108";
import { PST123_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst123";

const MAPPED_106_REFS: BiblioReference[] = PST106_OFFICIAL_RESOURCES.map((r) => ({
  id: r.id,
  authors: r.authors,
  year: r.year,
  title: r.title,
  publisherOrJournal: r.sourceOrPublisher,
  apa7Full: r.apa7Citation,
  inTextCitation: `(${r.authors.split(",")[0] || r.authors}, ${r.year})`,
  stream: `PST106 · ${r.categoryLabel}`,
  ues: ["106"],
  keyConcept: r.tags.join(", "),
  examUsageTip: r.keyTakeaway,
}));

const MAPPED_108_REFS: BiblioReference[] = PST108_OFFICIAL_RESOURCES.map((r) => ({
  id: r.id,
  authors: r.authors,
  year: r.year,
  title: r.title,
  publisherOrJournal: r.sourceOrPublisher,
  apa7Full: r.apa7Citation,
  inTextCitation: `(${r.authors.split(",")[0] || r.authors}, ${r.year})`,
  stream: `PST108 · ${r.categoryLabel}`,
  ues: ["108"],
  keyConcept: r.tags.join(", "),
  examUsageTip: r.keyTakeaway,
}));

const MAPPED_123_REFS: BiblioReference[] = PST123_OFFICIAL_RESOURCES.map((r) => ({
  id: r.id,
  authors: r.authors,
  year: r.year,
  title: r.title,
  publisherOrJournal: r.sourceOrPublisher,
  apa7Full: r.apa7Citation,
  inTextCitation: `(${r.authors.split(",")[0] || r.authors}, ${r.year})`,
  stream: `PST123 · ${r.categoryLabel}`,
  ues: ["123"],
  keyConcept: r.tags.join(", "),
  examUsageTip: r.keyTakeaway,
}));

const BASE_CNAM_REFERENCES: BiblioReference[] = [
  {
    id: "clot-1999",
    authors: "Clot, Y.",
    year: "1999",
    title: "La fonction psychologique du travail",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Clot, Y. (1999). *La fonction psychologique du travail*. Presses Universitaires de France.",
    inTextCitation: "(Clot, 1999)",
    stream: "Clinique de l'activité",
    ues: ["106", "123", "124"],
    keyConcept:
      "Genre professionnel, style, activité réalisée vs réel de l'activité",
    examUsageTip:
      "Indispensable pour démontrer que la souffrance au travail provient de l'activité empêchée et de la nécrose du genre professionnel.",
  },
  {
    id: "clot-2008",
    authors: "Clot, Y.",
    year: "2008",
    title: "Travail et pouvoir d'agir",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Clot, Y. (2008). *Travail et pouvoir d'agir*. Presses Universitaires de France.",
    inTextCitation: "(Clot, 2008)",
    stream: "Clinique de l'activité",
    ues: ["106", "108", "123"],
    keyConcept:
      "Pouvoir d'agir, architecture des 4 dimensions du métier (P-I-T-I), controverse sur le travail bien fait",
    examUsageTip:
      "À mobiliser dès qu'un sujet porte sur la santé au travail comme pouvoir d'agir et sur l'autoconfrontation croisée.",
  },
  {
    id: "dejours-1993",
    authors: "Dejours, C.",
    year: "1993",
    title:
      "Travail : usure mentale. De la psychopathologie à la psychodynamique du travail",
    publisherOrJournal: "Bayard",
    apa7Full:
      "Dejours, C. (1993). *Travail : usure mentale. De la psychopathologie à la psychodynamique du travail* (Nouv. éd. augm.). Bayard.",
    inTextCitation: "(Dejours, 1993)",
    stream: "Psychodynamique du travail",
    ues: ["106", "123"],
    keyConcept:
      "Stratégies collectives de défense, dynamique de la reconnaissance (jugement d'utilité et de beauté), sublimation",
    examUsageTip:
      "Essentiel pour analyser le déni du risque, la souffrance éthique et le rôle protecteur ou aliénant des défenses collectives.",
  },
  {
    id: "leplat-hoc-1983",
    authors: "Leplat, J., & Hoc, J.-M.",
    year: "1983",
    title: "Tâche et activité dans l'analyse psychologique des situations",
    publisherOrJournal: "Cahiers de Psychologie Cognitive, 3(1), 49–63",
    apa7Full:
      "Leplat, J., & Hoc, J.-M. (1983). Tâche et activité dans l'analyse psychologique des situations. *Cahiers de Psychologie Cognitive*, 3(1), 49–63.",
    inTextCitation: "(Leplat & Hoc, 1983)",
    stream: "Ergonomie de l'activité",
    ues: ["106", "108", "124"],
    keyConcept:
      "Distinction fondatrice entre Tâche prescrite (ce qui est à faire) et Activité réelle (ce qui se fait et coûte au sujet)",
    examUsageTip:
      "La référence socle absolue à placer en introduction de toute étude de cas ergonomique ou clinique au CNAM.",
  },
  {
    id: "wisner-1995",
    authors: "Wisner, A.",
    year: "1995",
    title: "Réflexions sur l'ergonomie (1962–1995)",
    publisherOrJournal: "Octarès",
    apa7Full:
      "Wisner, A. (1995). *Réflexions sur l'ergonomie (1962–1995)*. Octarès.",
    inTextCitation: "(Wisner, 1995)",
    stream: "Ergonomie de l'activité",
    ues: ["106", "124"],
    keyConcept:
      "Ergonomie située, intelligence de la pratique, anthropotechnologie, analyse de la demande",
    examUsageTip:
      "Idéal pour justifier la nécessité de l'observation située du travail réel contre les modèles tayloriens désincarnés.",
  },
  {
    id: "rabardel-1995",
    authors: "Rabardel, P.",
    year: "1995",
    title:
      "Les hommes et les technologies : approche cognitive des instruments contemporains",
    publisherOrJournal: "Armand Colin",
    apa7Full:
      "Rabardel, P. (1995). *Les hommes et les technologies : approche cognitive des instruments contemporains*. Armand Colin.",
    inTextCitation: "(Rabardel, 1995)",
    stream: "Approche instrumentale",
    ues: ["106", "124"],
    keyConcept:
      "Artefact vs Instrument, genèse instrumentale (instrumentation / instrumentalisation), catachrèse",
    examUsageTip:
      "Référence clé pour PST124 (Transformations digitales, IA, cobotique) afin de distinguer l'outil prescrit de l'instrument approprié.",
  },
  {
    id: "vygotski-1934",
    authors: "Vygotski, L. S.",
    year: "1934/1997",
    title: "Pensée et langage (F. Sève, Trad.)",
    publisherOrJournal: "La Dispute",
    apa7Full:
      "Vygotski, L. S. (1997). *Pensée et langage* (F. Sève, Trad.). La Dispute. (Ouvrage original publié en 1934).",
    inTextCitation: "(Vygotski, 1934/1997)",
    stream: "Psychologie historico-culturelle",
    ues: ["106", "108", "120", "123"],
    keyConcept:
      "Langage intérieur vs langage extérieur, zone proximale de développement (ZPD), méthode indirecte, intériorisation du langage égocentrique",
    examUsageTip:
      "Référence majeure prescrite par Mme Véronique Marot en PST108 pour réfuter la thèse piagétienne et démontrer que le langage est l'instrument régulateur suprême de la pensée.",
  },
  {
    id: "bakhtine-1984",
    authors: "Bakhtine, M.",
    year: "1984",
    title: "Esthétique de la création verbale",
    publisherOrJournal: "Gallimard",
    apa7Full:
      "Bakhtine, M. (1984). *Esthétique de la création verbale*. Gallimard.",
    inTextCitation: "(Bakhtine, 1984)",
    stream: "Dialogisme",
    ues: ["120", "123"],
    keyConcept:
      "Dialogisme, genres de discours, polyphonie énonciative, destinataire et surdestinataire",
    examUsageTip:
      "Incontournable en PST120 et PST123 pour analyser comment chaque énoncé d'autoconfrontation est adressé au pair, au chercheur et au métier.",
  },
  {
    id: "canguilhem-1966",
    authors: "Canguilhem, G.",
    year: "1966",
    title: "Le normal et le pathologique",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Canguilhem, G. (1966). *Le normal et le pathologique*. Presses Universitaires de France.",
    inTextCitation: "(Canguilhem, 1966)",
    stream: "Philosophie de la vie & Santé",
    ues: ["106", "123"],
    keyConcept:
      "Normativité vitale, santé comme capacité à instituer de nouvelles normes dans l'épreuve du milieu",
    examUsageTip:
      "Donne une profondeur épistémologique décisive pour définir la santé au travail autrement que par l'absence de maladie.",
  },
  {
    id: "oddone-1981",
    authors: "Oddone, I., Re, A., & Briante, G.",
    year: "1981",
    title:
      "Redécouvrir l'expérience ouvrière : vers une autre psychologie du travail ?",
    publisherOrJournal: "Éditions Sociales",
    apa7Full:
      "Oddone, I., Re, A., & Briante, G. (1981). *Redécouvrir l'expérience ouvrière : vers une autre psychologie du travail ?* Éditions Sociales.",
    inTextCitation: "(Oddone et al., 1981)",
    stream: "Clinique de l'activité / Communauté scientifique élargie",
    ues: ["106", "108", "123"],
    keyConcept:
      "Instruction au sosie, communauté scientifique élargie, co-analyse de l'expérience",
    examUsageTip:
      "À citer dès que vous mobilisez l'Instruction au sosie (« Si quelqu'un devait me remplacer demain sans qu'on s'en aperçoive... »).",
  },
  {
    id: "molinier-2013",
    authors: "Molinier, P.",
    year: "2013",
    title: "Le travail du care",
    publisherOrJournal: "La Dispute",
    apa7Full: "Molinier, P. (2013). *Le travail du care*. La Dispute.",
    inTextCitation: "(Molinier, 2013)",
    stream: "Psychodynamique & Éthique du Care",
    ues: ["106", "123"],
    keyConcept:
      "Savoir-faire discrets, travail inestimable, vulnérabilité partagée, division sexuelle et morale du travail",
    examUsageTip:
      "Très apprécié par le jury sur les terrains médico-sociaux, hospitaliers ou de services pour visibiliser le travail invisible.",
  },
  {
    id: "bobillier-2021",
    authors: "Bobillier Chaumon, M.-É.",
    year: "2021",
    title:
      "Les transformations digitales à l'épreuve de l'activité et des salariés",
    publisherOrJournal: "ISTE Éditions",
    apa7Full:
      "Bobillier Chaumon, M.-É. (2021). *Les transformations digitales à l'épreuve de l'activité et des salariés : comprendre et accompagner les mutations technologiques émergentes*. ISTE Éditions.",
    inTextCitation: "(Bobillier Chaumon, 2021)",
    stream: "Psychologie ergonomique & Technologies émergentes",
    ues: ["124"],
    keyConcept:
      "Clinique de l'usage, acceptabilité située vs acceptation pratique, intensification et porosité techno-induite",
    examUsageTip:
      "Référence directe du titulaire de la chaire CNAM pour PST124 : indispensable pour tout sujet sur la digitalisation, l'IA ou le télétravail.",
  },
  {
    id: "austin-1970",
    authors: "Austin, J. L.",
    year: "1970",
    title: "Quand dire, c'est faire",
    publisherOrJournal: "Éditions du Seuil",
    apa7Full:
      "Austin, J. L. (1970). *Quand dire, c'est faire* (G. Lane, Trad.). Éditions du Seuil.",
    inTextCitation: "(Austin, 1970)",
    stream: "Pragmatique du langage",
    ues: ["120"],
    keyConcept:
      "Actes de langage (locutoire, illocutoire, perlocutoire), performativité de la parole en situation",
    examUsageTip:
      "Ancrage linguistique clé en PST120 pour démontrer que le langage au travail est une action qui modifie les rapports sociaux.",
  },
  {
    id: "pastre-2011",
    authors: "Pastré, P.",
    year: "2011",
    title:
      "La didactique professionnelle : approche anthropologique du développement chez les adultes",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Pastré, P. (2011). *La didactique professionnelle : approche anthropologique du développement chez les adultes*. Presses Universitaires de France.",
    inTextCitation: "(Pastré, 2011)",
    stream: "Didactique professionnelle",
    ues: ["108", "124"],
    keyConcept:
      "Structure conceptuelle de la situation, concepts pragmatiques, modèle opératif vs modèle cognitif",
    examUsageTip:
      "Crucial en PST108 (Parcours, compétences, VAE, bilan) pour analyser la conceptualisation dans l'action et la transmission de l'expérience.",
  },
  {
    id: "clot-2010-travail-coeur",
    authors: "Clot, Y.",
    year: "2010",
    title: "Le travail à cœur. Pour en finir avec les risques psychosociaux",
    publisherOrJournal: "La Découverte",
    apa7Full:
      "Clot, Y. (2010). *Le travail à cœur. Pour en finir avec les risques psychosociaux*. La Découverte.",
    inTextCitation: "(Clot, 2010)",
    stream: "Clinique de l'activité",
    ues: ["106", "108", "123"],
    keyConcept:
      "Coopération conflictuelle, dispute professionnelle réglée, critères du travail bien fait, pouvoir d'agir",
    examUsageTip:
      "Présenté par Mme Marot en Cours 1 de PST108 : mobiliser la 'coopération conflictuelle' comme alternative au consensus managérial artificiel.",
  },
  {
    id: "clot-1999-vygotski",
    authors: "Clot, Y. (Dir.)",
    year: "1999",
    title: "Avec Vygotski",
    publisherOrJournal: "La Dispute",
    apa7Full:
      "Clot, Y. (Dir.). (1999). *Avec Vygotski*. La Dispute.",
    inTextCitation: "(Clot, 1999)",
    stream: "Psychologie historico-culturelle",
    ues: ["106", "108"],
    keyConcept:
      "Actualité de Vygotski pour penser le travail contemporain, développement indirect, médiation instrumentale",
    examUsageTip:
      "Ouvrage collectif prescrit dans la bibliographie du Cours 1 de PST108 pour analyser comment Vygotski irrigue la Clinique de l'activité.",
  },
  {
    id: "freud-1920-bobine",
    authors: "Freud, S.",
    year: "1920/2010",
    title: "Au-delà du principe de plaisir (J. Laplanche & J.-B. Pontalis, Trad.)",
    publisherOrJournal: "Payot",
    apa7Full:
      "Freud, S. (2010). *Au-delà du principe de plaisir* (J. Laplanche & J.-B. Pontalis, Trad.). Payot. (Ouvrage original publié en 1920).",
    inTextCitation: "(Freud, 1920/2010)",
    stream: "Psychanalyse & Genèse du langage",
    ues: ["108"],
    keyConcept:
      "Jeu de la bobine (Fort/Da), fonction de réparation symbolique, pare-excitation, maîtrise de l'absence",
    examUsageTip:
      "Article déposé sur la plateforme Moodle/ENF par Mme Marot pour le Cours 1 de PST108 : observation du petit-fils Ernst (18 mois) et naissance du symbole.",
  },
  {
    id: "bion-1962",
    authors: "Bion, W. R.",
    year: "1962/1979",
    title: "Aux sources de l'expérience (F. Robert, Trad.)",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Bion, W. R. (1979). *Aux sources de l'expérience* (F. Robert, Trad.). Presses Universitaires de France. (Ouvrage original publié en 1962).",
    inTextCitation: "(Bion, 1962/1979)",
    stream: "Psychanalyse & Pensée",
    ues: ["108"],
    keyConcept:
      "Prêt d'un appareil à penser les pensées, fonction alpha maternelle métabolisant les éléments bêta bruts",
    examUsageTip:
      "Point d'exactitude terminologique du Cours 1 de PST108 : attribuer rigoureusement le concept d'appareil à penser à Bion (1962) et non à Freud ou Golse.",
  },
  {
    id: "boutet-fraenkel-1995",
    authors: "Boutet, J., & Fraenkel, B.",
    year: "1995",
    title: "Langage et travail : communication, cognition, action",
    publisherOrJournal: "Langage et Société, 72, 5–18",
    apa7Full:
      "Boutet, J., & Fraenkel, B. (1995). Langage et travail : communication, cognition, action. *Langage et Société*, 72, 5–18.",
    inTextCitation: "(Boutet & Fraenkel, 1995)",
    stream: "Sociolinguistique du travail",
    ues: ["108", "120"],
    keyConcept:
      "Réseau Langage et Travail (fondé en 1986), conception située et multimodale du langage dans l'activité réelle",
    examUsageTip:
      "Recommandé en Cours 1 de PST108 pour prouver que le langage n'est pas un simple canal d'information mais une part constitutive de l'activité ouvrière et tertiaire.",
  },
  {
    id: "bourdieu-1982-langage",
    authors: "Bourdieu, P.",
    year: "1982",
    title: "Ce que parler veut dire : l'économie des échanges linguistiques",
    publisherOrJournal: "Fayard",
    apa7Full:
      "Bourdieu, P. (1982). *Ce que parler veut dire : l'économie des échanges linguistiques*. Fayard.",
    inTextCitation: "(Bourdieu, 1982)",
    stream: "Sociologie du langage & Pouvoir symbolique",
    ues: ["108", "123"],
    keyConcept:
      "Marché linguistique, violence symbolique, autorité statutaire ('Status est magistratus'), rituel du lit de justice (Sarah Hanley)",
    examUsageTip:
      "Pilier de la deuxième partie de PST108 : déconstruire l'illusion internaliste d'Austin pour montrer que l'efficacité de la parole dépend de l'institution déléguée.",
  },
  {
    id: "habermas-1987-agir",
    authors: "Habermas, J.",
    year: "1987",
    title: "Théorie de l'agir communicationnel (2 vol., J.-M. Ferry & J.-L. Schlegel, Trad.)",
    publisherOrJournal: "Fayard",
    apa7Full:
      "Habermas, J. (1987). *Théorie de l'agir communicationnel* (2 vol., J.-M. Ferry & J.-L. Schlegel, Trad.). Fayard. (Ouvrage original publié en 1981).",
    inTextCitation: "(Habermas, 1981/1987)",
    stream: "Théorie critique & Éthique de la discussion",
    ues: ["108"],
    keyConcept:
      "Agir communicationnel vs agir stratégique, entente rationnelle (Verständigung), 4 prétentions universelles à la validité, principe D",
    examUsageTip:
      "Pilier de PST108 enseigné par Éric Lucy : analyser comment la concertation managériale glisse souvent de la recherche d'entente à la manipulation stratégique.",
  },
  {
    id: "honneth-2007-reification",
    authors: "Honneth, A.",
    year: "2007",
    title: "La réification : petit traité de théorie critique (S. Haber, Trad.)",
    publisherOrJournal: "Gallimard",
    apa7Full:
      "Honneth, A. (2007). *La réification : petit traité de théorie critique* (S. Haber, Trad.). Gallimard.",
    inTextCitation: "(Honneth, 2007)",
    stream: "Théorie critique de la reconnaissance",
    ues: ["108", "123"],
    keyConcept:
      "Réification comme 'oubli de la reconnaissance' originaire, antériorité de la reconnaissance sur la cognition",
    examUsageTip:
      "Essentiel en PST108 : démontrer que traiter les salariés comme de pures ressources chiffrées constitue un oubli moral de leur statut de personne.",
  },
  {
    id: "lucy-2021-insulte",
    authors: "Lucy, É.",
    year: "2021",
    title: "Les conditions sociales de l'efficacité performative de l'insulte",
    publisherOrJournal: "Empan, 123(3), 48–56",
    apa7Full:
      "Lucy, É. (2021). Les conditions sociales de l'efficacité performative de l'insulte. *Empan*, 123(3), 48–56.",
    inTextCitation: "(Lucy, 2021)",
    stream: "Psychologie sociale clinique du travail",
    ues: ["108"],
    keyConcept:
      "Efficacité performative destructrice de l'insulte, actualisation de stigmates sociaux et de rapports de domination institués",
    examUsageTip:
      "Référence directe de l'enseignant du CNAM en PST108 : à citer impérativement sur tout sujet traitant des violences verbales ou de la pragmatique.",
  },
  {
    id: "valls-castra-2015-iod",
    authors: "Valls, F., & Castra, D.",
    year: "2015",
    title: "L'insertion professionnelle par la méthode IOD : refuser le tri, négocier le milieu",
    publisherOrJournal: "Éditions Liaisons",
    apa7Full:
      "Valls, F., & Castra, D. (2015). *L'insertion professionnelle par la méthode IOD : refuser le tri, négocier le milieu*. Éditions Liaisons.",
    inTextCitation: "(Valls & Castra, 2015)",
    stream: "Psychologie de l'insertion & Méthode IOD",
    ues: ["108"],
    keyConcept:
      "Méthode IOD en 7 étapes, refus de l'idéologie de l'employabilité, négociation bilatérale sur l'offre d'emploi, articulation avec Robert Castel",
    examUsageTip:
      "Référence incontournable de la troisième partie de PST108 enseignée par Francis Valls : fonde l'intervention sur le poste de travail et non sur la rééducation de la personne.",
  },
  {
    id: "piaget-1923-langage",
    authors: "Piaget, J.",
    year: "1923",
    title: "Le langage et la pensée chez l'enfant",
    publisherOrJournal: "Delachaux et Niestlé",
    apa7Full:
      "Piaget, J. (1923). *Le langage et la pensée chez l'enfant*. Delachaux et Niestlé.",
    inTextCitation: "(Piaget, 1923)",
    stream: "Psychologie du développement & Structuralisme génétique",
    ues: ["108"],
    keyConcept:
      "Langage égocentrique comme reflet de la pensée égocentrique, équilibration, assimilation/accommodation, devenir : disparition au profit du langage socialisé",
    examUsageTip:
      "À mobiliser dans toute dissertation de PST108 pour contraster la position structuraliste de Piaget avec l'approche historico-culturelle de Vygotski.",
  },
  {
    id: "habermas-1997-factualite",
    authors: "Habermas, J.",
    year: "1992/1997",
    title: "Droit et démocratie : Entre faits et normes",
    publisherOrJournal: "Gallimard",
    apa7Full:
      "Habermas, J. (1997). *Droit et démocratie : Entre faits et normes* (R. Rochlitz & C. Bouchindhomme, Trad.). Gallimard. (Ouvrage original publié en 1992).",
    inTextCitation: "(Habermas, 1992/1997)",
    stream: "Théorie critique & Philosophie du droit",
    ues: ["108"],
    keyConcept:
      "Tension explosive entre factualité sociale contingente et validité idéale, intégration par le droit moderne et le monde vécu (Lebenswelt)",
    examUsageTip:
      "Texte transmis par M. Lucy en PST108 : démontre que la délibération en organisation a besoin du droit moderne pour stabiliser les règles d'entente face aux impératifs économiques.",
  },
  {
    id: "honneth-2004-esquisse",
    authors: "Honneth, A.",
    year: "2004",
    title: "La théorie de la reconnaissance : une esquisse",
    publisherOrJournal: "Revue du MAUSS, 23(1), 133–136",
    apa7Full:
      "Honneth, A. (2004). La théorie de la reconnaissance : une esquisse. *Revue du MAUSS*, 23(1), 133–136.",
    inTextCitation: "(Honneth, 2004)",
    stream: "Théorie critique de la reconnaissance",
    ues: ["108", "123"],
    keyConcept:
      "Grammaire morale des conflits, attente de reconnaissance par l'autrui généralisé (Mead), 3 principes institutionnalisés (amour, droit, mérite au travail)",
    examUsageTip:
      "Article remis en fichier .msg par M. Lucy : fonde la critique de l'injustice au travail sur la blessure morale du mépris.",
  },
  {
    id: "calori-duchamp-koehl-2008",
    authors: "Calori, R., Duchamp, V., & Koëhl, P.",
    year: "2008",
    title: "Philosophie et développement organisationnel : Dialectique, agir communicationnel, délibération et dialogue",
    publisherOrJournal: "Recherches en Sciences de Gestion, 64, 45–78",
    apa7Full:
      "Calori, R., Duchamp, V., & Koëhl, P. (2008). Philosophie et développement organisationnel : Dialectique, agir communicationnel, délibération et dialogue. *Recherches en Sciences de Gestion*, 64, 45–78.",
    inTextCitation: "(Calori et al., 2008)",
    stream: "Management critique & Théorie de la communication",
    ues: ["108"],
    keyConcept:
      "Logique dialectique (Hegel, Merleau-Ponty) contre logique binaire d'exploitation, agir communicationnel habermassien pour l'exploration et l'apprentissage",
    examUsageTip:
      "Article Cairn.info transmis par vos enseignants : argument massue pour prouver que la délibération et le dialogue réel sont indispensables à la créativité et à la survie de l'organisation.",
  },
  {
    id: "fonteneau-2007-mepris",
    authors: "Fonteneau, F.",
    year: "2007",
    title: "Axel Honneth : La société du mépris",
    publisherOrJournal: "La Cause freudienne, 67(3), 204–209",
    apa7Full:
      "Fonteneau, F. (2007). Axel Honneth : La société du mépris. *La Cause freudienne*, 67(3), 204–209.",
    inTextCitation: "(Fonteneau, 2007)",
    stream: "Psychanalyse & Philosophie sociale",
    ues: ["108"],
    keyConcept:
      "Dépassement du formalisme habermassien, autoréification managériale (Selbstverdinglichung), réhabilitation de Freud (narcissisme) et Winnicott",
    examUsageTip:
      "Article du dossier ressources profs : analyse l'injonction perverse à la 'réalisation de soi' dans le néolibéralisme comme un piège d'autoréification aliénant.",
  },
  {
    id: "hanley-1991-lit-justice",
    authors: "Hanley, S.",
    year: "1991",
    title: "Le Lit de justice des rois de France : L'idéologie constitutionnelle dans la légende, le rituel et le discours",
    publisherOrJournal: "Aubier",
    apa7Full:
      "Hanley, S. (1991). *Le Lit de justice des rois de France : L'idéologie constitutionnelle dans la légende, le rituel et le discours*. Aubier.",
    inTextCitation: "(Hanley, 1991)",
    stream: "Histoire des institutions & Sociologie du pouvoir",
    ues: ["108"],
    keyConcept:
      "Rituel du lit de justice, suspension de la délibération parlementaire par la présence physique du roi ('Adveniente principe, cessat magistratus')",
    examUsageTip:
      "Source historiographique directe de Pierre Bourdieu : à mobiliser pour illustrer l'acte d'institution et l'autorité statutaire ('Status est magistratus').",
  },
];

const CORE_CNAM_REFERENCES: BiblioReference[] = [
  ...BASE_CNAM_REFERENCES,
  ...MAPPED_106_REFS.filter(
    (r) => !BASE_CNAM_REFERENCES.some((b) => b.id === r.id || b.title === r.title)
  ),
  ...MAPPED_108_REFS.filter(
    (r) => !BASE_CNAM_REFERENCES.some((b) => b.id === r.id || b.title === r.title)
  ),
  ...MAPPED_123_REFS.filter(
    (r) => !BASE_CNAM_REFERENCES.some((b) => b.id === r.id || b.title === r.title)
  ),
];

const STORAGE_KEY = "pst_bibliography_vault_v1";

export const PstBibliographyVaultModal: React.FC<
  PstBibliographyVaultModalProps
> = ({ isOpen, onClose }) => {
  const [customRefs, setCustomRefs] = useState<BiblioReference[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUe, setSelectedUe] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New custom reference fields
  const [newAuthors, setNewAuthors] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newStream, setNewStream] = useState("Clinique de l'activité");
  const [newUe, setNewUe] = useState("106");
  const [newConcept, setNewConcept] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCustomRefs(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveCustomRefs = (next: BiblioReference[]) => {
    setCustomRefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allReferences = useMemo(() => {
    return [...customRefs, ...CORE_CNAM_REFERENCES];
  }, [customRefs]);

  const filteredReferences = useMemo(() => {
    return allReferences.filter((ref) => {
      const matchesUe = selectedUe === "ALL" || ref.ues.includes(selectedUe);
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesUe;
      const hay =
        `${ref.authors} ${ref.year} ${ref.title} ${ref.stream} ${ref.keyConcept} ${ref.examUsageTip}`.toLowerCase();
      return matchesUe && hay.includes(q);
    });
  }, [allReferences, selectedUe, searchQuery]);

  if (!isOpen) return null;

  const handleCopy = async (text: string, badgeId: string) => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(text.replace(/\*/g, ""));
      setCopiedId(badgeId);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback
    }
  };

  const handleAddCustomRef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthors.trim() || !newYear.trim() || !newTitle.trim()) return;
    playClickSound();
    const cleanAuthors = newAuthors.trim();
    const cleanYear = newYear.trim();
    const cleanTitle = newTitle.trim();
    const cleanPub = newPublisher.trim() || "Éditeur académique";
    const firstSurname = cleanAuthors.split(",")[0].trim();

    const customEntry: BiblioReference = {
      id: `custom-${Date.now()}`,
      authors: cleanAuthors,
      year: cleanYear,
      title: cleanTitle,
      publisherOrJournal: cleanPub,
      apa7Full: `${cleanAuthors} (${cleanYear}). *${cleanTitle}*. ${cleanPub}.`,
      inTextCitation: `(${firstSurname}, ${cleanYear})`,
      stream: newStream,
      ues: [newUe],
      keyConcept: newConcept.trim() || "Concept personnel ajouté au corpus",
      examUsageTip:
        "Référence personnelle intégrée au coffre bibliographique local.",
      isCustom: true,
    };

    saveCustomRefs([customEntry, ...customRefs]);
    setNewAuthors("");
    setNewYear("");
    setNewTitle("");
    setNewPublisher("");
    setNewConcept("");
    setShowAddForm(false);
    triggerHaptic("success");
    playSuccessSound();
  };

  const handleDeleteCustom = (id: string) => {
    triggerHaptic("error");
    playClickSound();
    saveCustomRefs(customRefs.filter((r) => r.id !== id));
  };

  const handleExportAllApa7 = () => {
    playClickSound();
    const sorted = [...filteredReferences].sort((a, b) =>
      a.apa7Full.localeCompare(b.apa7Full, "fr"),
    );
    const lines = [
      "# Bibliographie Académique Norme APA 7e Édition — CNAM Psychologie du Travail",
      "",
      ...sorted.map((r) => `- ${r.apa7Full}`),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bibliographie_APA7_CNAM_${selectedUe}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  const handleExportBibtex = () => {
    playClickSound();
    const sorted = [...filteredReferences].sort((a, b) =>
      a.apa7Full.localeCompare(b.apa7Full, "fr"),
    );
    const entries = sorted.map((r) => {
      const citeKey = (r.authors.split(",")[0] || "cnam")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") + (r.year || "2026");
      return `@article{${citeKey},\n  author = {${r.authors}},\n  title = {${r.title}},\n  year = {${r.year}},\n  journal = {${r.publisherOrJournal}}\n}`;
    });
    const content = [
      "% Bibliographie BibTeX — CNAM Psychologie du Travail",
      "",
      ...entries,
    ].join("\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bibliographie-cnam-bibtex-${selectedUe}.bib`;
    a.click();
    URL.revokeObjectURL(url);
    triggerHaptic("success");
    playSuccessSound();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-biblio-vault-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <BookMarked className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold truncate">
                  COFFRE BIBLIOGRAPHIQUE · APA 7
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden xs:inline truncate">
                  {allReferences.length} canoniques
                </span>
              </div>
              <h2
                id="pst-biblio-vault-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                Auteurs Fondamentaux &amp; Citations APA 7
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowAddForm((v) => !v);
              }}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Ajouter référence</span>
              <span className="sm:hidden">+ Réf</span>
            </button>

            <button
              type="button"
              onClick={handleExportAllApa7}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Exporter APA 7 (.MD)</span>
              <span className="sm:hidden">APA 7</span>
            </button>

            <button
              type="button"
              onClick={handleExportBibtex}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors cursor-pointer"
              title="Exporter au format BibTeX pour LaTeX, Zotero ou Overleaf"
            >
              <Download className="size-3.5" />
              <span>BibTeX</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Fermer le coffre bibliographique"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Rechercher un auteur, concept ou référence"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher auteur, concept..."
              className="w-full pl-8 sm:pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {["ALL", "106", "108", "120", "123", "124"].map((ue) => (
              <button
                key={ue}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedUe(ue);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedUe === ue
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {ue === "ALL" ? "Toutes" : `PST${ue}`}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Reference Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddCustomRef}
            className="px-5 py-4 border-b border-indigo-500/20 bg-indigo-500/5 grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-end"
          >
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Auteur(s) (ex: Schwartz, Y.)
              </label>
              <input
                type="text"
                aria-label="Auteur(s)"
                required
                value={newAuthors}
                onChange={(e) => setNewAuthors(e.target.value)}
                placeholder="Schwartz, Y."
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Année
              </label>
              <input
                type="text"
                aria-label="Année de publication"
                required
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="2000"
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Titre de l'ouvrage / article
              </label>
              <input
                type="text"
                aria-label="Titre de l'ouvrage ou article"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Le paradigme ergologique..."
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                UE Cible
              </label>
              <select
                aria-label="UE Cible"
                value={newUe}
                onChange={(e) => setNewUe(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value="106">PST106</option>
                <option value="108">PST108</option>
                <option value="120">PST120</option>
                <option value="123">PST123</option>
                <option value="124">PST124</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Éditeur / Revue
              </label>
              <input
                type="text"
                aria-label="Éditeur ou Revue"
                value={newPublisher}
                onChange={(e) => setNewPublisher(e.target.value)}
                placeholder="Octarès"
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Concept clé associé
              </label>
              <input
                type="text"
                aria-label="Concept clé associé"
                value={newConcept}
                onChange={(e) => setNewConcept(e.target.value)}
                placeholder="Corps-soi, dramatique d'usage de soi, renormalisation..."
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}

        {/* References Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 dark:bg-[#070A10]">
          {filteredReferences.map((ref) => {
            const isFullCopied = copiedId === `${ref.id}-full`;
            const isShortCopied = copiedId === `${ref.id}-short`;

            return (
              <div
                key={ref.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {ref.stream}
                      </span>
                      {ref.ues.map((u) => (
                        <span
                          key={u}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          PST{u}
                        </span>
                      ))}
                    </div>

                    {ref.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustom(ref.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Supprimer cette référence personnalisée"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* APA 7 Formatted Box */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/90 font-serif text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed mb-2.5">
                    {ref.apa7Full.split("*").map((chunk, idx) =>
                      idx % 2 === 1 ? (
                        <em key={idx} className="italic font-semibold">
                          {chunk}
                        </em>
                      ) : (
                        <span key={idx}>{chunk}</span>
                      ),
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-900 dark:text-white">
                          Concepts clés :
                        </strong>{" "}
                        {ref.keyConcept}
                      </span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-800 dark:text-slate-200">
                          Usage examen :
                        </strong>{" "}
                        {ref.examUsageTip}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Copy Actions */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(ref.inTextCitation, `${ref.id}-short`)
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {isShortCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Quote className="w-3 h-3 text-slate-400" />
                        {ref.inTextCitation}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(ref.apa7Full, `${ref.id}-full`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
                  >
                    {isFullCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Référence APA 7 copiée
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copier Bibliographie APA 7
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PstBibliographyVaultModal;
