/**
 * 40 Citations d'Or du 1er Semestre (PST106 - PST108 - PST123)
 * Titre RNCP Psychologue du Travail - CNAM
 *
 * Mémorisation active des verbatims académiques indispensables pour valoriser
 * les copies d'examen et les dissertations.
 */

export interface CitationOrS1 {
  id: string;
  auteur: string;
  annee: string;
  source: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  theme: string;
  citation: string;
  motsClesMasques: string[]; // Pour le mode "Texte à trous / Cloze"
  interetExamen: string;
  piegeContresens: string;
  formulationCopie: string;
}

export const CITATIONS_OR_S1: CitationOrS1[] = [
  // ==================== PST106 : CLINIQUE DE L'ACTIVITÉ & ERGONOMIE ====================
  {
    id: "cit-106-clot-reel",
    auteur: "Yves Clot",
    annee: "1999",
    source: "La fonction psychologique du travail, PUF",
    moduleKey: "pst106",
    theme: "Le réel de l'activité",
    citation:
      "Le réel de l'activité, c'est aussi ce qui ne se fait pas, ce qu'on ne peut pas faire, ce qu'on cherche à faire sans y parvenir, ce qu'on aurait voulu ou pu faire, ce qu'on fait pour ne pas faire ce qui est à faire.",
    motsClesMasques: ["ce qui ne se fait pas", "sans y parvenir", "ce qu'on aurait voulu", "pour ne pas faire"],
    interetExamen:
      "Définition incontournable du 'réel'. Elle montre au correcteur que vous ne confondez pas le travail avec la tâche ni avec le geste observable immédiat.",
    piegeContresens:
      "Réduire l'activité à ce que filme la caméra ou ce qui est quantifié par les indicateurs de performance.",
    formulationCopie:
      "Comme le rappelle Yves Clot (1999), le réel de l'activité ne se résume pas à l'activité réalisée : il inclut « ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir », c'est-à-dire l'ensemble des possibles contrariés.",
  },
  {
    id: "cit-106-wisner-tache",
    auteur: "Alain Wisner",
    annee: "1995",
    source: "Réflexions sur l'ergonomie, Octarès",
    moduleKey: "pst106",
    theme: "Tâche vs Activité",
    citation:
      "La tâche est ce qui est à faire, ce qui est prescrit par l'entreprise ; l'activité est ce qui se fait par l'opérateur pour accomplir la tâche avec son corps, son intelligence et ses émotions.",
    motsClesMasques: ["ce qui est prescrit", "l'activité est ce qui se fait", "son corps", "son intelligence"],
    interetExamen:
      "La pierre angulaire de l'analyse ergonomique du travail. À citer impérativement dans toute introduction d'étude de cas ergonomique.",
    piegeContresens:
      "Employer indifféremment 'tâche' et 'activité'. Dans le vocabulaire CNAM, ce sont des contraires méthodologiques.",
    formulationCopie:
      "Selon la distinction inaugurale d'Alain Wisner, il convient de dissocier la tâche prescrite (« ce qui est à faire ») de l'activité réelle (« ce qui se fait »), qui mobilise le corps et l'intelligence de l'opérateur.",
  },
  {
    id: "cit-106-leplat-regulation",
    auteur: "Jacques Leplat & Jean-Marie Hoc",
    annee: "1983",
    source: "Tâche et activité dans l'analyse psychologique des situations",
    moduleKey: "pst106",
    theme: "Régulation ergonomique",
    citation:
      "L'activité n'est pas le décalque passif de la tâche. Elle résulte d'un compromis opératoire permanent entre les exigences externes de la production et l'état interne de l'opérateur.",
    motsClesMasques: ["décalque passif", "compromis opératoire", "exigences externes", "état interne"],
    interetExamen:
      "Permet de justifier pourquoi les salariés s'écartent des consignes : non par indiscipline, mais pour maintenir le système productif en vie.",
    piegeContresens:
      "Considérer le compromis opératoire comme une défaillance ou un manquement aux règles de sécurité.",
    formulationCopie:
      "Dans le modèle de Leplat et Hoc (1983), l'activité constitue un « compromis opératoire permanent » entre conditions externes prescrites et conditions internes du travailleur (fatigue, savoir-faire, âge).",
  },
  {
    id: "cit-106-clot-genre",
    auteur: "Yves Clot",
    annee: "2008",
    source: "Travail et pouvoir d'agir, PUF",
    moduleKey: "pst106",
    theme: "Genre professionnel & Style",
    citation:
      "Le genre professionnel est un corps d'évaluations partagées, un mot d'ordre tacite, une mémoire impersonnelle du métier sans laquelle l'action individuelle se délite.",
    motsClesMasques: ["évaluations partagées", "mot d'ordre tacite", "mémoire impersonnelle", "se délite"],
    interetExamen:
      "Excellente citation pour traiter des questions sur l'usure des collectifs, la perte de repères ou l'individualisation des carrières.",
    piegeContresens:
      "Penser que le 'genre' est figé : le genre vit et se régénère par les styles singuliers apportés par chaque travailleur.",
    formulationCopie:
      "Yves Clot définit le genre professionnel comme une « mémoire impersonnelle du métier », boîte à outils collective indispensable pour que le salarié déploie son style sans réinventer le travail à zéro.",
  },
  {
    id: "cit-106-oddone-sosie",
    auteur: "Ivar Oddone",
    annee: "1981",
    source: "Redécouvrir l'expérience ouvrière, Éditions Sociales",
    moduleKey: "pst106",
    theme: "Instruction au Sosie",
    citation:
      "L'instruction au sosie transforme le travailleur en instructeur de sa propre activité : en cherchant à transmettre l'indicible pour qu'un autre le remplace sans se faire démasquer, il découvre ce qu'il fait sans le savoir.",
    motsClesMasques: ["instructeur de sa propre activité", "transmettre l'indicible", "sans se faire démasquer", "sans le savoir"],
    interetExamen:
      "Explique la valeur heuristique de la méthode du sosie : l'accès aux savoirs tacites et incorporés de l'activité réelle.",
    piegeContresens:
      "Présenter le sosie comme un simple jeu de rôle d'animation de groupe sans rigueur d'enquête.",
    formulationCopie:
      "La méthode de l'instruction au sosie, initiée par Ivar Oddone (1981), invite l'opérateur à « transmettre l'indicible » pour faire advenir à la conscience les tours de main invisibles de son métier.",
  },
  {
    id: "cit-106-canguilhem-normativite",
    auteur: "Georges Canguilhem",
    annee: "1966",
    source: "Le normal et le pathologique, PUF",
    moduleKey: "pst106",
    theme: "Santé et normativité",
    citation:
      "Être en bonne santé, c'est pouvoir tomber malade et s'en relever ; c'est un luxe biologique. La santé, c'est la capacité d'instituer de nouvelles normes dans un milieu mouvant.",
    motsClesMasques: ["pouvoir tomber malade", "luxe biologique", "instituer de nouvelles normes", "milieu mouvant"],
    interetExamen:
      "Formule philosophique majeure mobilisée en clinique de l'activité : la santé n'est pas l'absence de maladie, mais le pouvoir d'agir et de renormaliser son milieu.",
    piegeContresens:
      "Définir la santé comme le strict respect des normes hygiénistes fixées par l'organisation.",
    formulationCopie:
      "Selon Georges Canguilhem, la santé ne se réduit pas à une conformité passive : elle réside dans « la capacité d'instituer de nouvelles normes », ce que Clot traduit par le pouvoir d'agir sur son travail.",
  },

  {
    id: "cit-106-nietzsche-police",
    auteur: "Friedrich Nietzsche",
    annee: "1881",
    source: "Aurore : Pensées sur les préjugés moraux, § 173",
    moduleKey: "pst106",
    theme: "Critique philosophique du labeur moderne",
    citation:
      "Le travail est la meilleure des polices, il tient chacun en bride et entrave puissamment le développement de la raison, des désirs, du goût de l'indépendance. Car il consume une quantité extraordinaire de force nerveuse et la soustrait à la réflexion, à la méditation, aux soucis personnels.",
    motsClesMasques: ["meilleure des polices", "tient chacun en bride", "force nerveuse", "goût de l'indépendance"],
    interetExamen:
      "Citation d'accroche magistrale en dissertation pour déconstruire l'illusion du travail moderne comme libération spontanée et analyser la fonction de domestication sociale de l'effort productif.",
    piegeContresens:
      "Penser que Nietzsche fait l'éloge du travail : il en dénonce au contraire l'abrutissement sécuritaire au détriment de la souveraineté de l'esprit.",
    formulationCopie:
      "Comme l'écrivait Friedrich Nietzsche dès 1881 dans 'Aurore', le travail acharné constitue « la meilleure des polices » en ce qu'il assèche la force nerveuse nécessaire à l'indépendance de pensée.",
  },
  {
    id: "cit-106-clot-subjectivite",
    auteur: "Yves Clot",
    annee: "2009",
    source: "Travail et pouvoir d'agir, PUF / Cours PST106 Cnam",
    moduleKey: "pst106",
    theme: "Prescription de la subjectivité & Néotaylorisme",
    citation:
      "Taylor achetait la force de travail physique brute ; aujourd'hui, le management achète l'engagement, la disponibilité psychologique et la subjectivité de l'homme. La prescription ne porte plus sur les seuls gestes mais sur l'intériorité même du travailleur.",
    motsClesMasques: ["force de travail physique", "engagement", "disponibilité psychologique", "subjectivité de l'homme"],
    interetExamen:
      "Formule canonique citée par Pr. Lagabrielle pour marquer le basculement historique de l'OST industrielle vers le néotaylorisme de service et la crise du sens au travail.",
    piegeContresens:
      "Croire que la fin du travail physique traditionnel équivaut à une humanisation du travail : la contrainte s'est déplacée vers le système psychique et émotionnel.",
    formulationCopie:
      "Yves Clot résume ce déplacement contemporain en soulignant que « Taylor achetait la force de travail, aujourd'hui on achète l'engagement et la disponibilité de l'homme », marquant l'avènement d'une prescription directe de la subjectivité.",
  },
  {
    id: "cit-106-lahy-optimum",
    auteur: "Jean-Marie Lahy",
    annee: "1916",
    source: "Le système Taylor et la physiologie du travail professionnel, Masson",
    moduleKey: "pst106",
    theme: "Optimum psychophysiologique vs Maximum taylorien",
    citation:
      "Taylor recherche le maximum de rendement immédiat, c'est-à-dire une surchauffe destructive pour l'organisme ; la psychophysiologie du travail doit rechercher l'optimum, seul garant de la conciliation entre efficacité productive et longévité vitale de l'homme.",
    motsClesMasques: ["maximum de rendement", "surchauffe destructive", "l'optimum", "longévité vitale"],
    interetExamen:
      "L'acte de naissance de la psychophysiologie et de l'ergonomie francophone face au taylorisme américain. Pilier absolu de l'identité du Cnam (fondateur du Travail Humain avec Laugier).",
    piegeContresens:
      "Considérer que Lahy défend la flânerie ou la paresse : il démontre scientifiquement que l'optimum produit une efficacité économique supérieure sur l'ensemble de la vie active.",
    formulationCopie:
      "Dès 1916, Jean-Marie Lahy oppose au taylorisme la notion d' « optimum psychophysiologique » : contre le « maximum » destructeur de Taylor, il s'agit de préserver la santé et la longévité de l'organisme ouvrier.",
  },
  {
    id: "cit-106-pacaud-terrain",
    auteur: "Suzanne Pacaud",
    annee: "1953",
    source: "Recherches sur le travail des téléphonistes, Éditions du CNRS",
    moduleKey: "pst106",
    theme: "Méthodologie ergonomique de terrain & Activité réelle",
    citation:
      "Pour comprendre le métier, il faut le faire. Ce que la direction qualifie de faute ou de lenteur n'est le plus souvent que la manifestation d'une régulation vitale mise en œuvre par l'opératrice face aux difficultés invisibles de la situation réelle.",
    motsClesMasques: ["il faut le faire", "régulation vitale", "difficultés invisibles", "situation réelle"],
    interetExamen:
      "Rupture épistémologique historique du laboratoire vers le terrain réel. Fonde la tradition d'observation participante au Cnam et préfigure la distinction entre prescrit et réel.",
    piegeContresens:
      "Réduire l'enquête de Pacaud à une simple étude de poste féminin : c'est la matrice conceptuelle de l'analyse ergonomique moderne de la charge mentale.",
    formulationCopie:
      "Comme l'a formulé Suzanne Pacaud (1953) lors de son enquête sur les téléphonistes de la SNCF, « pour comprendre le métier, il faut le faire » : l'erreur n'est pas une faute mais une régulation adaptative.",
  },
  {
    id: "cit-106-freud-sublimation",
    auteur: "Sigmund Freud",
    annee: "1930",
    source: "Malaise dans la civilisation, PUF",
    moduleKey: "pst106",
    theme: "Fonction psychique du travail & Sublimation",
    citation:
      "Aucune autre technique de conduite de la vie n'attache l'individu aussi solidement à la réalité que l'accent mis sur le travail, qui l'insère de manière sûre dans une portion de la réalité, dans la communauté humaine. Le travail offre un exutoire particulièrement favorable aux composantes pulsionnelles par la sublimation.",
    motsClesMasques: ["aussi solidement à la réalité", "communauté humaine", "composantes pulsionnelles", "sublimation"],
    interetExamen:
      "Fondement psychanalytique du travail repris par Christophe Dejours : le travail n'est pas qu'une contrainte économique, il est un étayage narcissique et une médiation vitale avec le réel.",
    piegeContresens:
      "Croire que Freud idéalise le travail en usine : il précise lui-même que cette voie n'est ouverte que si le travail est librement consenti et investi par le sujet.",
    formulationCopie:
      "Sigmund Freud (1930) rappelle dans 'Malaise dans la civilisation' qu'aucun ancrage « n'attache l'individu aussi solidement à la réalité que le travail », offrant une issue constructive aux pulsions par la sublimation.",
  },

  // ==================== PST108 : PSYCHOLOGIE SOCIALE CLINIQUE DU TRAVAIL ====================
  {
    id: "cit-108-honneth-mepris",
    auteur: "Axel Honneth",
    annee: "2000",
    source: "La lutte pour la reconnaissance, Éditions du Cerf",
    moduleKey: "pst108",
    theme: "Mépris social & Reconnaissance",
    citation:
      "Le déni de reconnaissance ou le mépris social ne blesse pas seulement l'amour-propre : il porte atteinte à l'intégrité morale du sujet en lui retirant l'assurance d'avoir une valeur aux yeux d'autrui.",
    motsClesMasques: ["mépris social", "l'amour-propre", "intégrité morale", "valeur aux yeux d'autrui"],
    interetExamen:
      "Permet de lier directement santé mentale, rapport à l'intersubjectivité et psychopathologie du travail.",
    piegeContresens:
      "Réduire la reconnaissance à un feedback positif individuel donné lors de l'entretien annuel d'évaluation.",
    formulationCopie:
      "Comme le théorise Axel Honneth, l'invisibilisation du travail constitue un « mépris social » portant directement atteinte à l'intégrité morale du salarié et à son sentiment de valeur.",
  },
  {
    id: "cit-108-gaulejac-gestion",
    auteur: "Vincent de Gaulejac",
    annee: "2005",
    source: "La société malade de la gestion, Seuil",
    moduleKey: "pst108",
    theme: "Idéologie gestionnaire",
    citation:
      "L'idéologie managériale fonctionne comme une machine à fabriquer de l'illusion : elle exige une adhésion passionnelle des salariés tout en les soumettant à des indicateurs chiffrés déconnectés de la réalité humaine du travail.",
    motsClesMasques: ["machine à fabriquer de l'illusion", "adhésion passionnelle", "indicateurs chiffrés", "déconnectés"],
    interetExamen:
      "Parfait pour critiquer les démarches de 'qualité totale', 'lean management' et le reporting permanent générateur de RPS.",
    piegeContresens:
      "Faire un procès purement idéologique sans montrer les effets cliniques concrets (perte de sens, culpabilité, burn-out).",
    formulationCopie:
      "Dans 'La société malade de la gestion', Vincent de Gaulejac met en évidence le paradoxe d'un management qui exige un « engagement passionnel » tout en instrumentalisant les sujets par des métriques désincarnées.",
  },
  {
    id: "cit-108-enriquez-organisation",
    auteur: "Eugène Enriquez",
    annee: "1992",
    source: "L'organisation en analyse, PUF",
    moduleKey: "pst108",
    theme: "Imaginaire organisationnel",
    citation:
      "L'organisation n'est pas seulement un système technique rationnel : elle est un lieu d'investissement pulsionnel et imaginaire où les individus cherchent à réparer leurs failles narcissiques et à conjurer la mort.",
    motsClesMasques: ["rationnel", "investissement pulsionnel", "failles narcissiques", "conjurer la mort"],
    interetExamen:
      "Apporte la profondeur psychanalytique de la psychosociologie clinique : les institutions canalisent les angoisses existentielles.",
    piegeContresens:
      "Oublier que l'organisation a aussi une finalité économique et productive bien réelle.",
    formulationCopie:
      "Eugène Enriquez rappelle que l'institution n'est jamais purement fonctionnelle : elle constitue un « lieu d'investissement pulsionnel et imaginaire » où s'articulent fantasmes collectifs et idéaux partagés.",
  },
  {
    id: "cit-108-kaes-pacte",
    auteur: "René Kaës",
    annee: "1989",
    source: "Le pacte dénégatif dans les ensembles trans-subjectifs",
    moduleKey: "pst108",
    theme: "Pacte dénégatif & Inconscient groupal",
    citation:
      "Tout lien de groupe repose sur un pacte dénégatif : une alliance inconsciente par laquelle les membres décident ensemble de taire, d'oublier ou de refouler certains pans du réel pour pouvoir continuer à vivre ensemble.",
    motsClesMasques: ["pacte dénégatif", "alliance inconsciente", "décident ensemble de taire", "vivre ensemble"],
    interetExamen:
      "Concept clé pour expliquer la loi du silence, l'omerta sur les dysfonctionnements et la désignation de boucs émissaires.",
    piegeContresens:
      "Voir le pacte dénégatif comme un complot machiavélique conscient ; il s'agit d'une formation défensive inconsciente.",
    formulationCopie:
      "Selon René Kaës, la cohésion d'une équipe s'achète souvent au prix d'un « pacte dénégatif », alliance inconsciente organisant le déni partagé des dysfonctionnements majeurs de l'organisation.",
  },
  {
    id: "cit-108-dejours-souffrance",
    auteur: "Christophe Dejours",
    annee: "1998",
    source: "Souffrance en France, Seuil",
    moduleKey: "pst108",
    theme: "Souffrance éthique & Défenses",
    citation:
      "La souffrance éthique commence au moment où le sujet ne peut plus refuser de prêter son concours à des actes qu'il réprouve moralement, s'installant dans la trahison de ses propres idéaux.",
    motsClesMasques: ["souffrance éthique", "prêter son concours", "réprouve moralement", "trahison de ses propres idéaux"],
    interetExamen:
      "Concept fondamental pour analyser la perte de sens et la complicité forcée dans le travail bâclé imposé.",
    piegeContresens:
      "Confondre souffrance éthique (liée à la trahison de ses valeurs morales) et souffrance physique liée à la pénibilité.",
    formulationCopie:
      "Christophe Dejours nomme « souffrance éthique » cette douleur spécifique ressentie lorsque le travailleur est contraint de « prêter son concours à des actes qu'il réprouve moralement ».",
  },

  {
    id: "cit-108-ghiglione-activite-conjointe",
    auteur: "Rodolphe Ghiglione",
    annee: "1986",
    source: "L'homme communiquant, Armand Colin",
    moduleKey: "pst108",
    theme: "Activité conjointe & Co-construction du sens",
    citation:
      "Communiquer n'est pas simplement transmettre de l'information : c'est une activité conjointe où les interlocuteurs co-construisent des mondes de possibles autour d'un enjeu commun partagé.",
    motsClesMasques: ["activité conjointe", "co-construisent", "mondes de possibles", "enjeu commun"],
    interetExamen:
      "Citation maîtresse de Francis Valls pour réfuter le modèle mécaniste de Shannon & Weaver et penser la communication comme un processus psychosocial circulaire.",
    piegeContresens:
      "Réduire la communication à un face-à-face informatif sans enjeu ni contrat implicite de parole.",
    formulationCopie:
      "Comme le théorise Rodolphe Ghiglione (1986), communiquer ne se réduit pas à une transmission technique : il s'agit d'une « activité conjointe où les interlocuteurs co-construisent des mondes de possibles ».",
  },
  {
    id: "cit-108-wolton-informer",
    auteur: "Dominique Wolton",
    annee: "2009",
    source: "Informer n'est pas communiquer, CNRS Éditions",
    moduleKey: "pst108",
    theme: "Critique de la vitesse & Relation humaine",
    citation:
      "Informer n'est pas communiquer. Plus les outils techniques sont rapides et performants, plus la communication humaine exige du temps, de la relation et des intermédiaires.",
    motsClesMasques: ["Informer n'est pas communiquer", "outils techniques", "exige du temps", "intermédiaires"],
    interetExamen:
      "Formule canonique d'introduction en dissertation pour déconstruire l'illusion managériale du 'tout-numérique' et légitimer le rôle du psychologue du travail.",
    piegeContresens:
      "Confondre l'information (flux technique d'objets) et la communication (relation intersubjective négociée).",
    formulationCopie:
      "Selon la formule décisive de Dominique Wolton (2009), « informer n'est pas communiquer » : la prolifération des flux numériques ne dispense jamais du temps long de la relation humaine.",
  },
  {
    id: "cit-108-valls-enjeu-objectif",
    auteur: "Francis Valls",
    annee: "2026",
    source: "Cours PST108 Cnam — Séance 3",
    moduleKey: "pst108",
    theme: "Objectif vs Enjeu dans la relation de travail",
    citation:
      "L'objectif, c'est le résultat exigé par l'organisation ; l'enjeu, c'est le sens de la vie du sujet. Squeezer l'enjeu au profit du seul résultat, c'est programmer l'échec de la relation.",
    motsClesMasques: ["résultat exigé", "sens de la vie", "Squeezer l'enjeu", "échec de la relation"],
    interetExamen:
      "Distinction clinique fondamentale formulée par Francis Valls à partir de sa propre expérience d'éducateur face à la mère célibataire en détresse.",
    piegeContresens:
      "Opposer stérilement l'objectif et l'enjeu : la clinique consiste à subordonner et intégrer l'objectif dans l'enjeu du sujet.",
    formulationCopie:
      "Francis Valls rappelle la distinction clinique cardinale : alors que l'objectif est le résultat formel imposé par l'institution, « l'enjeu est le sens de la vie du sujet » ; sacrifier l'enjeu à l'indicateur de résultat détruit le travail réel.",
  },
  {
    id: "cit-108-racine-trahison-corps",
    auteur: "Jean Racine / Sigmund Freud",
    annee: "1677 / 1905",
    source: "Phèdre (Racine) & Fragment d'une analyse d'hystérie (Freud)",
    moduleKey: "pst108",
    theme: "Non-verbal, Paraverbal et Signes corporels",
    citation:
      "Tout vous trahit : la voix, le silence, les yeux... Celui dont les lèvres se taisent bavarde avec le bout des doigts ; la trahison suinte par tous ses pores.",
    motsClesMasques: ["Tout vous trahit", "la voix, le silence, les yeux", "lèvres se taisent", "bavarde avec le bout des doigts"],
    interetExamen:
      "Illustre l'ancrage corporel et paraverbal du sens : l'impossibilité de ne pas signifier, reprise par l'École de Palo Alto et Francis Valls.",
    piegeContresens:
      "Croire que le corps fournit une preuve mécanique et infaillible de mensonge sans tenir compte du contexte culturel et relationnel.",
    formulationCopie:
      "Comme le condensent Racine et Freud, « tout vous trahit : la voix, le silence, les yeux » ; le non-verbal et le paraverbal constituent des systèmes de signes indissociables de la parole vive.",
  },

  // ==================== PST123 : IDENTITÉ SOCIALE ET PROFESSIONNELLE ====================
  {
    id: "cit-123-dubar-socialisation",
    auteur: "Claude Dubar",
    annee: "1991",
    source: "La socialisation : construction des identités sociales et professionnelles, Armand Colin",
    moduleKey: "pst123",
    theme: "Double transaction identitaire",
    citation:
      "L'identité n'est jamais donnée d'emblée, elle n'est jamais acquise une fois pour toutes : elle est le produit d'une double transaction, biographique (pour soi) et relationnelle (pour autrui).",
    motsClesMasques: ["jamais donnée d'emblée", "double transaction", "biographique (pour soi)", "relationnelle (pour autrui)"],
    interetExamen:
      "La phrase reine de PST123. Elle résume à elle seule tout le programme de Madame Lucy.",
    piegeContresens:
      "Penser que l'une des deux transactions prime sur l'autre : c'est leur articulation et leur tension réciproque qui créent l'identité.",
    formulationCopie:
      "Fondant la sociologie contemporaine des identités, Claude Dubar (1991) démontre que « l'identité n'est jamais donnée » mais construite au confluent d'une transaction biographique (pour soi) et d'une transaction relationnelle (pour autrui).",
  },
  {
    id: "cit-123-sainsaulieu-culture",
    auteur: "Renaud Sainsaulieu",
    annee: "1977",
    source: "L'identité au travail, Presses de Sciences Po",
    moduleKey: "pst123",
    theme: "L'entreprise comme lieu de socialisation",
    citation:
      "L'entreprise n'est pas seulement un lieu de production de biens matériels : elle est un espace décisif d'apprentissage culturel et de socialisation politique à travers l'exercice quotidien des relations de pouvoir.",
    motsClesMasques: ["production de biens", "apprentissage culturel", "socialisation politique", "relations de pouvoir"],
    interetExamen:
      "Révolution épistémologique : montre que l'adulte continue de se socialiser et d'acquérir ses réflexes démocratiques à l'usine ou au bureau.",
    piegeContresens:
      "Croire que la socialisation se termine à l'adolescence avec la famille et l'école (erreur fonctionnaliste).",
    formulationCopie:
      "Renaud Sainsaulieu (1977) a établi que le lieu de travail est un « espace décisif de socialisation politique » où les identités se modèlent selon les marges réelles de négociation et de pouvoir accordées aux salariés.",
  },
  {
    id: "cit-123-bourdieu-habitus",
    auteur: "Pierre Bourdieu",
    annee: "1980",
    source: "Le sens pratique, Éditions de Minuit",
    moduleKey: "pst123",
    theme: "L'habitus",
    citation:
      "L'habitus est un système de dispositions durables et transposables, structures structurées prédisposées à fonctionner comme structures structurantes, c'est-à-dire en principes générateurs et organisateurs de pratiques.",
    motsClesMasques: ["dispositions durables", "structures structurées", "structures structurantes", "principes générateurs"],
    interetExamen:
      "Formulation canonique bourdieusienne. Sa récitation exacte atteste d'une grande maîtrise sociologique.",
    piegeContresens:
      "Considérer l'habitus comme un déterminisme fataliste absolu : Bourdieu insiste sur sa capacité d'improvisation réglée.",
    formulationCopie:
      "Pierre Bourdieu conçoit l'habitus comme un « système de dispositions durables et transposables », intériorisation de l'arbitraire social régissant inconsciemment nos choix de carrières et d'orientation.",
  },
  {
    id: "cit-123-goffman-role",
    auteur: "Erving Goffman",
    annee: "1961",
    source: "Asiles : études sur la condition sociale des malades mentaux",
    moduleKey: "pst123",
    theme: "Distance au rôle",
    citation:
      "La distance au rôle ne signifie pas le refus du rôle, mais la manifestation subtile par laquelle l'individu prouve à autrui qu'il n'est pas totalement réductible à l'étiquette institutionnelle qui lui est assignée.",
    motsClesMasques: ["refus du rôle", "manifestation subtile", "pas totalement réductible", "étiquette institutionnelle"],
    interetExamen:
      "Très utile pour analyser comment un salarié s'approprie un uniforme, un badge ou un statut sans s'y dissoudre.",
    piegeContresens:
      "Assimiler la distance au rôle à une révolte ou une rébellion ouverte contre l'institution.",
    formulationCopie:
      "Erving Goffman illustre par la « distance au rôle » l'art par lequel l'acteur préserve son autonomie subjective en montrant qu'il « n'est pas réductible à l'étiquette » fixée par l'organisation.",
  },
  {
    id: "cit-123-wittorski-professionnalisation",
    auteur: "Richard Wittorski",
    annee: "2007",
    source: "Professionnalisation et développement professionnel, L'Harmattan",
    moduleKey: "pst123",
    theme: "Professionnalisation",
    citation:
      "La professionnalisation est un processus triadique articulant la fabrication des compétences par la formation, la reconnaissance identitaire par l'organisation et la légitimation d'un groupe professionnel dans l'espace social.",
    motsClesMasques: ["processus triadique", "fabrication des compétences", "reconnaissance identitaire", "légitimation d'un groupe"],
    interetExamen:
      "Indispensable pour traiter de la loi de 1985 protégeant le titre de psychologue, des référentiels RNCP et de l'accès au statut.",
    piegeContresens:
      "Limiter la professionnalisation à l'acquisition individuelle de compétences scolaires ou universitaires.",
    formulationCopie:
      "Comme le montre Richard Wittorski, la professionnalisation ne se résume pas à l'apprentissage de gestes : elle exige une négociation sociale tripartite entre compétences reconnues, identité validée et groupe corporatif légitimé.",
  },
  {
    id: "cit-123-honneth-spheres",
    auteur: "Axel Honneth",
    annee: "1992",
    source: "La lutte pour la reconnaissance (Trad. 2000)",
    moduleKey: "pst123",
    theme: "Les 3 sphères de la reconnaissance",
    citation:
      "La construction de l'identité personnelle exige la traversée de trois sphères de reconnaissance : l'amour (confiance en soi), le droit (respect de soi) et la solidarité sociale (estime de soi par la contribution au travail).",
    motsClesMasques: ["trois sphères", "amour (confiance en soi)", "droit (respect de soi)", "estime de soi"],
    interetExamen:
      "L'articulation clé entre philosophie morale, psychologie et sociologie du travail : la contribution productive fonde l'estime de soi citoyenne.",
    piegeContresens:
      "Oublier la sphère du droit : sans égalité juridique devant la loi et le statut, l'estime de soi au travail est faussée.",
    formulationCopie:
      "Axel Honneth distingue trois sphères indispensables à la constitution du sujet : l'amour affectif (confiance), le droit égalitaire (respect) et l'estime sociale (valeur reconnue des compétences dans la division du travail).",
  },
  {
    id: "cit-123-weber-vocation",
    auteur: "Max Weber",
    annee: "1919",
    source: "Le savant et le politique, Plon",
    moduleKey: "pst123",
    theme: "La vocation (Beruf)",
    citation:
      "Le concept de 'Beruf' contient l'idée fondamentale d'une tâche imposée par Dieu, transformant le travail quotidien en une vocation religieuse puis en un devoir professionnel sécularisé.",
    motsClesMasques: ["Beruf", "tâche imposée", "vocation", "devoir professionnel"],
    interetExamen:
      "Fonde l'histoire de la notion d'identité professionnelle : passage de la vocation spirituelle au statut laïque du travailleur moderne.",
    piegeContresens:
      "Croire que le terme 'Beruf' ne désigne qu'un simple métier technique sans dimension d'appel existentiel.",
    formulationCopie:
      "Max Weber a montré dans son analyse du 'Beruf' comment le travail moderne a hérité de la charge éthique et identitaire de la vocation protestante, érigeant l'activité professionnelle en socle de l'accomplissement personnel.",
  },
];
