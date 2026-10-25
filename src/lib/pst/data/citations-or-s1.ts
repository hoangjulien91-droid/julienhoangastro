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
