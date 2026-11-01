/**
 * PST120 — Psychodynamique et psychopathologie du travail (Semestre 2)
 * Annales officielles, sujets types d'examen & corrigés d'excellence (18+/20)
 *
 * Chaire de Psychodynamique du Travail du Cnam
 * Références majeures :
 * - Christophe DEJOURS (Clinique du travail, souffrance et plaisir, Mètis, dynamique de reconnaissance)
 * - Pascale MOLINIER (Éthique du care, travail invisible, critique de la virilité défensive)
 * - Louis LE GUILLANT (Névrose des téléphonistes, psychopathologie des conditions de travail)
 * - Claude VEIL (États d'épuisement, fatigue industrielle, adaptation)
 * - Georges CANGUILHEM (Normativité vitale, santé comme capacité d'instituer des normes)
 */

export interface AnnalePst120Item {
  id: string;
  session: string;
  type: "dissertation" | "cas" | "dejours" | "molinier" | "leguillant" | "epistemologie";
  titre: string;
  contexteCitation?: string;
  questions: string[];
  criteres: string[];
  planConseille: {
    partie: string;
    sousParties: string[];
  }[];
  corrigeExcellence: string;
  piegesAEviter: string[];
  conceptsCles: string[];
}

export const ANNALES_PST120: AnnalePst120Item[] = [
  {
    id: "pst120-annale-01",
    session: "Option A — Dissertation théorique",
    type: "dejours",
    titre: "Sujet 1 : Normalité souffrante et défenses collectives — De la résistance à la pathologie",
    contexteCitation:
      "« Travailler, c'est toujours faire l'expérience d'une souffrance qui résulte de la confrontation à la résistance du réel. La normalité n'est pas l'absence de souffrance, elle est une victoire fragile conquise par le travail psychique et les stratégies collectives de défense. » (Christophe Dejours, Travail, usure mentale, 1980/2000).",
    questions: [
      "En quoi la normalité au travail constitue-t-elle, selon la psychodynamique du travail, un état d'équilibre conquis et précaire plutôt qu'un état de santé passif ?",
      "Analysez les fonctions individuelles et collectives des stratégies de défense, et montrez à quelles conditions cette souffrance normale se transforme en plaisir (sublimation) ou bascule dans la pathologie d'usure.",
    ],
    criteres: [
      "Définir le travail comme épreuve du réel : le réel est ce qui résiste à la technique et au savoir-faire établi.",
      "Distinguer la souffrance normale (inévitable, motrice) de la souffrance pathogène (bloquée, sans issue de sublimation).",
      "Analyser les stratégies défensives collectives (déni viril du danger, cynisme partagé, rigolade d'atelier) comme anesthésiques psychiques indispensables mais aliénants si le déni fige la pensée.",
      "Détailler le pivot de la sublimation : mobilisation de l'intelligence pratique (Mètis) et validation par la dynamique de reconnaissance (jugement d'utilité et de beauté).",
      "Conclure sur le rôle pathogène des organisations gestionnaires actuelles qui détruisent les collectifs et précipitent les décompensations somatiques ou dépressives.",
    ],
    planConseille: [
      {
        partie: "I. L'ÉPREUVE DU RÉEL ET LA FABRIQUE DE LA NORMALITÉ SOUFFRANTE",
        sousParties: [
          "A. Le travail comme confrontation à la résistance de la matière : la souffrance normale comme source d'intelligence pratique (Mètis).",
          "B. Les stratégies défensives collectives : anesthésie collective de la peur et construction d'une normalité sous tension.",
        ],
      },
      {
        partie: "II. LES DEUX DESTINS DE LA SOUFFRANCE : SUBLIMATION RECONNUE OU DÉCOMPENSATION ISOLÉE",
        sousParties: [
          "A. La voie de la santé par la sublimation : espace de délibération, règles de métier et double jugement de reconnaissance.",
          "B. Le basculement psychopathologique : l'évaluation individualisée, l'effondrement des défenses et l'usure mentale.",
        ],
      },
    ],
    corrigeExcellence:
      "La psychodynamique du travail fondée par Christophe Dejours opère une rupture épistémologique majeure avec la psychiatrie classique et le taylorisme. Alors que le management positiviste conçoit le travail comme une simple exécution procédurale et la santé comme l'absence de symptômes, Dejours place au cœur de l'analyse l'énigme de la normalité : comment des millions de travailleurs confrontés quotidiennement à la pénibilité, à la peur et à l'absurdité des cadences parviennent-ils à ne pas tomber fous ?\n\n" +
      "1. Le travail comme épreuve du réel et les défenses collectives :\n" +
      "Travailler commence là où les prescriptions échouent. Le réel se manifeste par l'échec initial, la panne, l'imprévu qui fait souffrir. Cette souffrance est normale, vitale : elle pousse le sujet à mobiliser son corps et sa Mètis (intelligence rusée) pour inventer des solutions ingénieuses. Cependant, face à la dangerosité objective (ex. chantiers du BTP, industrie nucléaire), l'angoisse paralyserait l'action. Les travailleurs forgent donc des stratégies collectives de défense (glorification virile de la force, bravade, refus des protections). Ces défenses anesthésient la peur et soudent le collectif, mais elles ont un coût : l'aveuglement au risque et le refoulement des affects.\n\n" +
      "2. La bifurcation : Sublimation ou Décompensation :\n" +
      "Le destin de cette souffrance dépend entièrement de l'organisation du travail. Si un espace de délibération existe où la parole peut circuler librement sur les échecs et les tricheries nécessaires, le travailleur peut faire valider son ingéniosité par ses pairs (jugement de beauté) et par sa hiérarchie (jugement d'utilité). Cette dynamique de reconnaissance permet la sublimation : la souffrance se transmute en plaisir, en santé et en identité. En revanche, lorsque les dispositifs gestionnaires (reporting continu, ranking individuel, concurrence interindividuelle) détruisent la confiance et la coopération, la souffrance devient pathogène. Privé de reconnaissance et isolé dans ses défenses brisées, le sujet s'effondre dans le burn-out, la décompensation somatique ou le passage à l'acte suicidaire.",
    piegesAEviter: [
      "Confondre la souffrance normale (liée au réel du travail) avec une dépression constitutionnelle ou un manque de résilience individuelle.",
      "Présenter les stratégies défensives comme des fautes professionnelles à réprimer par la discipline managériale.",
      "Oublier le rôle cardinal du jugement de beauté des pairs, sans lequel aucune sublimation durable n'est possible.",
    ],
    conceptsCles: [
      "Normalité souffrante",
      "Épreuve du réel",
      "Mètis (intelligence pratique)",
      "Stratégies collectives de défense",
      "Sublimation",
      "Jugement de beauté vs jugement d'utilité",
      "Espace de délibération déontique",
    ],
  },
  {
    id: "pst120-annale-02",
    session: "Option A — Dissertation théorique",
    type: "molinier",
    titre: "Sujet 2 : L'invisibilité du care et la critique de la virilité défensive",
    contexteCitation:
      "« Le modèle viril de la psychodynamique dejourienne a longtemps occulté le travail des femmes. Dans le soin et la relation d'aide, la défense ne passe pas par l'héroïsme viril et le déni du risque, mais par des habiletés discrètes, l'autodérision et la sollicitude qui restent socialement invisibles. » (Pascale Molinier, Le Travail du care, 2013).",
    questions: [
      "En quoi la théorisation du 'care' par Pascale Molinier permet-elle de dépasser les angles morts de la psychopathologie classique du travail ?",
      "Analysez comment la division sexuelle du travail assigne le souci d'autrui à la sphère domestique et naturalise les compétences professionnelles relationnelles.",
    ],
    criteres: [
      "Définir le care comme activité concrète de préservation du monde et des personnes vulnérables, nécessitant une charge psychique intense.",
      "Opposer le modèle viril de défense (fondé sur l'honneur, le défi au danger, la dureté) et les défenses du care (dérision en coulisses, verbalisation partagée de la détresse, douceur active).",
      "Expliciter le concept d'« habiletés discrètes » : savoirs non codifiables (apaiser l'angoisse d'un patient sans faire d'esclandre, anticiper la douleur) qui n'apparaissent dans aucun reporting.",
      "Montrer comment le management gestionnaire par les protocoles minutés (ex. 12 minutes pour une toilette en EHPAD) mutile le care et produit une souffrance éthique chez les professionnelles.",
      "Conclure sur la nécessité d'une reconnaissance politique et salariale du care comme pilier de la démocratie et de la santé.",
    ],
    planConseille: [
      {
        partie: "I. DU MODÈLE VIRIL AU TRAVAIL DE CARE : DÉCONSTRUCTION D'UN ANGLE MORT CLINIQUEMENT CONSTRUIT",
        sousParties: [
          "A. La genèse ouvrière et masculine de la psychodynamique : l'idéologie virile comme paradigme dominant de la défense.",
          "B. La spécificité clinique du care : prendre soin de la vulnérabilité sans recourir à la dénégation agressive du réel.",
        ],
      },
      {
        partie: "II. L'ÉPREUVE DE L'INVISIBILITÉ : NATURALISATION DES COMPÉTENCES ET SOUFFRANCE ÉTHIQUE DU SOIN",
        sousParties: [
          "A. Les habiletés discrètes face à la prescription minutée : quand faire du bon travail relève de la clandestinité.",
          "B. La souffrance éthique de la maltraitance institutionnelle imposée : l'urgence d'une requalification politique du travail du care.",
        ],
      },
    ],
    corrigeExcellence:
      "Pascale Molinier a introduit dans la psychodynamique du travail un déplacement conceptuel fondamental en confrontant la théorie dejourienne aux études de genre et à l'éthique du care (inaugurée par Carol Gilligan et Joan Tronto). Pendant des décennies, la psychopathologie du travail s'est focalisée sur des bastions masculins (bâtiment, usines métallurgiques, mines) où la défense prenait la forme spectaculaire du déni viril du danger et de la force physique.\n\n" +
      "1. La critique du modèle viril et la clinique du care :\n" +
      "Dans les métiers à forte dominante féminine (soignantes, aides à domicile, éducatrices, assistantes maternelles), la relation avec la personne vulnérable, souffrante ou mourante ne peut pas être traitée par le défi bravache ou le rejet du sentiment. Le travail de care exige une disponibilité affective et corporelle, un ajustement constant aux signaux infimes de l'autre. Pour tenir psychiquement sans s'effondrer ni basculer dans la froideur sadique, les soignantes inventent des défenses spécifiques : l'autodérision en salle de pause, la confidence complice entre paires, la symbolisation collective des peurs. Le care n'est donc pas une prédisposition maternelle instinctive, mais un travail réel d'une extrême technicité psychique.\n\n" +
      "2. Les pathologies de l'invisibilisation gestionnaire :\n" +
      "Le drame contemporain du care réside dans son invisibilité structurelle. Le management néolibéral (tarification à l'activité, lean health) ne valorise que ce qui se quantifie en gestes isolés (une piqûre, une distribution de pilules, une durée de toilette). Or, les habiletés discrètes du care — tenir la main d'un mourant, écouter le silence d'une personne âgée angoissée — n'entrent dans aucune case de reporting. Dès lors, les professionnelles sont sommées d'accélérer, sacrifiant l'essence de leur métier. Cette contradiction produit une souffrance éthique aiguë : la soignante est contrainte de participer à une maltraitance institutionnelle qu'elle abhorre, conduisant à des démissions massives et à des états d'épuisement profond.",
    piegesAEviter: [
      "Naturaliser le care comme une qualité féminine innée au lieu de le définir comme un travail professionnel qualifié.",
      "Opposer stérilement Dejours et Molinier alors que Molinier enrichit et prolonge la psychodynamique dejourienne au prisme du genre.",
      "Omettre la souffrance éthique issue de la gestion industrielle appliquée aux services de soins.",
    ],
    conceptsCles: [
      "Care",
      "Habiletés discrètes",
      "Idéologie virile défensive",
      "Division sexuelle du travail",
      "Invisibilité sociale",
      "Souffrance éthique institutionnelle",
    ],
  },
  {
    id: "pst120-annale-03",
    session: "Option B — Étude de situation de travail / Cas clinique",
    type: "cas",
    titre: "Sujet 3 : Restructuration, évaluation individualisée et décompensation somatique",
    contexteCitation:
      "Étude de cas : Au sein d'une banque mutualiste récemment rachetée par un groupe d'assurance international, un plan de modernisation est mis en place. Les conseillers de clientèle, historiquement fiers de leur rôle d'accompagnement patrimonial et social auprès des familles locales, voient leurs objectifs redéfinis par des logiciels de scoring qui leur dictent les produits financiers à placer prioritairement à chaque appel. Un tableau d'affichage numérique dans le couloir classe chaque vendredi les conseillers du plus rentable au moins performant. Trois arrêts de travail de longue durée pour burn-out surviennent en un mois, et un conseiller senior est hospitalisé d'urgence pour un infarctus du myocarde sur son lieu de travail.",
    questions: [
      "Analysez les mécanismes organisationnels et psychopathologiques qui conduisent de l'évaluation individualisée des performances à la décompensation somatique du conseiller.",
      "Identifiez les formes de souffrance (souffrance normale, souffrance éthique, solitude) et les mutations des défenses au sein de cette agence.",
      "Formulez les préconisations méthodologiques du psychologue du travail selon le protocole de l'enquête clinique collective dejourienne.",
    ],
    criteres: [
      "Diagnostiquer la rupture du pacte de métier : l'évaluation individualisée détruit la solidarité horizontale et instaure la déloyauté envers le client.",
      "Expliquer la souffrance éthique : le conseiller est forcé de vendre des crédits revolving à des ménages surendettés, heurtant sa morale personnelle.",
      "Mobiliser le concept de somatisation : lorsque la voie de la sublimation est barrée et que le collectif de défense disparaît, le corps devient le réceptacle de la tension pulsionnelle non métabolisée (infarctus, ulcère, insomnies).",
      "Refuser fermement les solutions cosmétiques de gestion du stress (ateliers de sophrologie, numéros verts d'écoute) qui psychologisent le problème.",
      "Proposer le protocole de l'enquête collective en 7 étapes : instruction de la demande, constitution du groupe de volontaires homogène, auditions cliniques, rapport de restitution et réouverture de la controverse sur le beau travail.",
    ],
    planConseille: [
      {
        partie: "I. DIAGNOSTIC CLINIQUE : DU DÉNI DU TRAVAIL RÉEL À LA PATHOLOGIE SOMATIQUE",
        sousParties: [
          "A. L'introduction du reporting quantophrénique et la destruction de la Mètis commerciale des conseillers.",
          "B. De la concurrence interindividuelle à la souffrance éthique : l'effondrement des défenses collectives.",
          "C. Le corps comme dernier exutoire de la pulsion étouffée : mécanismes de la décompensation somatique.",
        ],
      },
      {
        partie: "II. DÉMARCHE D'INTERVENTION CLINIQUE DU PSYCHOLOGUE DU TRAVAIL",
        sousParties: [
          "A. La rupture avec l'approche hygiéniste managériale : pourquoi refuser la gestion individuelle du stress.",
          "B. Déploiement de l'enquête clinique collective en 7 étapes : restaurer la parole et refonder les règles du métier.",
        ],
      },
    ],
    corrigeExcellence:
      "Ce cas clinique illustre avec une précision tragique l'enchaînement pathogène décrit par Christophe Dejours face à la pénétration de l'idéologie gestionnaire dans des secteurs historiquement porteurs de valeurs de service public ou mutualiste.\n\n" +
      "1. Diagnostic psychopathologique :\n" +
      "L'introduction des tableaux de bord comparatifs et du ranking hebdomadaire produit une triple rupture :\n" +
      "- Rupture cognitive : La prescription automatisée supprime l'intelligence pratique (Mètis) du conseiller, qui connaissait les situations réelles des clients.\n" +
      "- Rupture éthique : Pour tenir ses objectifs et échapper à la relégation en bas de tableau, le conseiller doit forcer la souscription de contrats inadaptés. Cette complicité active engendre une souffrance éthique insupportable (honte de soi, sentiment d'imposture).\n" +
      "- Rupture collective : Le ranking détruit la confiance horizontale. On ne se transmet plus d'astuces entre collègues, on retient les dossiers rentables pour soi. Le collectif protecteur s'évapore, laissant chaque individu face à sa solitude.\n" +
      "Lorsque le sujet ne peut ni sublimer sa souffrance (puisque la hiérarchie ne valorise que le chiffre et nie le beau travail), ni la partager dans un collectif de défense, la charge psychique reste captive du soma. La somatisation (infarctus) signe le court-circuit du travail psychique par l'organisation aliénante.\n\n" +
      "2. Préconisations d'intervention du psychologue du travail :\n" +
      "Le psychologue doit formellement récuser le piège managérial qui consisterait à animer des 'ateliers de gestion du stress' ou à prescrire du coaching individuel, qui renverraient la responsabilité du désordre sur la 'fragilité' des salariés. L'intervention doit reposer sur l'enquête clinique collective en 7 étapes :\n" +
      "1. Négocier une demande formelle engageant la direction et les représentants du personnel.\n" +
      "2. Constituer un groupe de volontaires homogène (les conseillers de clientèle seuls, sans hiérarchie).\n" +
      "3. Mener des auditions cliniques sur le temps de travail pour analyser le travail réel et les dilemmes du métier.\n" +
      "4. Élaborer un rapport de diagnostic contradictoire restitué et validé par le groupe avant diffusion.\n" +
      "5. Réinstituer des espaces de délibération permanents où le jugement de beauté des pairs rééquilibre le jugement d'utilité chiffré.",
    piegesAEviter: [
      "Qualifier l'infarctus de 'fatalité médicale' sans le relier à la surtension psychique et à l'isolement provoqué par le ranking.",
      "Proposer une solution managériale (changer les KPI ou faire du team building) au lieu d'une démarche clinique d'élaboration de la parole.",
    ],
    conceptsCles: [
      "Évaluation individualisée des performances",
      "Souffrance éthique",
      "Décompensation somatique",
      "Solitude au travail",
      "Enquête clinique collective (7 étapes)",
      "Espace de délibération",
    ],
  },
];
