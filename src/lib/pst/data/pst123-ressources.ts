/**
 * PST123 — L'identité sociale et professionnelle
 * Enseignante : Élisabeth LUCY (Cnam Nouvelle-Aquitaine / Paris)
 * 
 * INVENTAIRE & ANALYSE DU CORPUS OFFICIEL DES RESSOURCES TRANSMISES
 * Dossier source : Desktop/PST123/Documents ressources du cours E. Lucy
 */

export interface Pst123OfficialResource {
  id: string;
  category:
    | "bourdieu"
    | "epistemologie"
    | "dubar"
    | "sainsaulieu"
    | "honneth"
    | "psychologue_deonto"
    | "sociologie_travail"
    | "cours_lucy";
  categoryLabel: string;
  authorFilter:
    | "Bourdieu"
    | "Piaget / Épistémologie"
    | "Dubar"
    | "Sainsaulieu"
    | "Honneth"
    | "Le Bianic / Déonto"
    | "Weber / Travail"
    | "E. Lucy (Cnam)";
  title: string;
  authors: string;
  year: string;
  sourceOrPublisher: string;
  localFile?: string;
  seanceNumber: string;
  description: string;
  keyTakeaway: string;
  apa7Citation: string;
  tags: string[];
  url?: string;
}

export const PST123_OFFICIAL_RESOURCES: Pst123OfficialResource[] = [
  // =========================================================================
  // 1. SUPPORTS DE COURS & DIAPORAMAS E. LUCY
  // =========================================================================
  {
    id: "res-lucy-plan-cours",
    category: "cours_lucy",
    categoryLabel: "Plan de Cours & Cadrage Officiel",
    authorFilter: "E. Lucy (Cnam)",
    title: "Plan du cours L’identité sociale et professionnelle — Syllabus et Structure en 6 Séances",
    authors: "Élisabeth Lucy",
    year: "2026",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam)",
    localFile: "Plan du cours E. Lucy.docx",
    seanceNumber: "Séances 1 à 6",
    description:
      "Document de cadrage officiel détaillant les 6 séances du module PST123 : 1) Notions d'identité en sciences de l'homme (Piaget, Durkheim, Parsons, Kardiner, Weber, Becker, Merton, Rosenthal, Jakobson, Goffman, Bourdieu, Dubar) ; 2) Processus de construction selon Dubar (retrait, exclusion, ouvrier, nouveau professionnel, carriériste, affinitaire) ; 3) Comprendre les dominations avec Bourdieu [(dispositions + capital) x champ = habitus] ; 4 & 5) Analyses de situations de travail et oraux ; 6) Perspectives sur les formes élémentaires de l'identité (reconnaissance/non-reconnaissance, promotion, blocage, conversion, exclusion).",
    keyTakeaway:
      "Squelette absolu du cours : sert de grille de référence pour orienter chaque dissertation et analyse de situation de travail vers les auteurs du syllabus officiel.",
    apa7Citation:
      "Lucy, É. (2026). Plan du cours : L’identité sociale et professionnelle (Module PST123). Conservatoire National des Arts et Métiers.",
    tags: ["Syllabus", "E. Lucy", "PST123", "Plan de cours", "Cnam"],
  },
  {
    id: "res-lucy-diaporama-2",
    category: "cours_lucy",
    categoryLabel: "Diaporama de Cours Magistral",
    authorFilter: "E. Lucy (Cnam)",
    title: "Cours 2 : Diaporama 2 — Claude Dubar et la Double Transaction Identitaire",
    authors: "Élisabeth Lucy",
    year: "2026",
    sourceOrPublisher: "Support de cours magistral Cnam",
    localFile: "Cours 2 - Diaporama 2.pdf",
    seanceNumber: "Séance 2 & 2 bis",
    description:
      "Diaporama magistral présentant la théorie de Claude Dubar : articulation entre transaction biographique (axe interne temporel : passé/hérité vs avenir/visé) et transaction relationnelle (axe externe spatial : identité pour soi vs identité pour autrui, attribution vs appartenance). Analyse des configurations de crise et des dynamiques de socialisation secondaire en entreprise.",
    keyTakeaway:
      "Présente les schémas graphiques canoniques utilisés pour illustrer la double transaction identitaire et les 4 types de trajectoires professionnelles.",
    apa7Citation:
      "Lucy, É. (2026). Cours 2 : Diaporama 2 — La dynamique identitaire selon Claude Dubar [Diapositives PowerPoint]. Cnam.",
    tags: ["Dubar", "Diaporama", "Double transaction", "E. Lucy", "Socialisation"],
  },
  {
    id: "res-lucy-enthoven-video",
    category: "cours_lucy",
    categoryLabel: "Ressource Vidéo & Philosophie",
    authorFilter: "E. Lucy (Cnam)",
    title: "La philosophie de l'identité — Parties 1 et 2",
    authors: "Raphaël Enthoven",
    year: "2015",
    sourceOrPublisher: "Émission Philosophie (Arte) / Conférence",
    localFile: "Vidéo La philosophie de lidentité vidéo liens partie 1 et 2.docx",
    seanceNumber: "Séance 1",
    description:
      "Sélection vidéo recommandée par Mme Lucy explorant le paradoxe de l'identité : l'illusion d'une essence fixe vs la réalité d'un processus relationnel et narratif en perpétuel devenir. Mise en perspective philosophique (Héraclite, Locke, Ricœur) pour introduire la sociologie de l'identité.",
    keyTakeaway:
      "Permet d'introduire une dissertation sur l'identité en rappelant que l'identité personnelle n'est pas une substance statique mais une construction narrative et intersubjective.",
    apa7Citation:
      "Enthoven, R. (2015). La philosophie de l’identité (Parties 1 & 2) [Document audiovisuel]. Arte / Documents ressources PST123.",
    tags: ["Philosophie", "Enthoven", "Identité narrative", "Essence", "Processus"],
  },

  // =========================================================================
  // 2. PIERRE BOURDIEU — DOMINATION, HABITUS, CAPITAL & DOUBLE VÉRITÉ DU TRAVAIL
  // =========================================================================
  {
    id: "res-bourdieu-double-verite",
    category: "bourdieu",
    categoryLabel: "Texte Théorique Fondateur",
    authorFilter: "Bourdieu",
    title: "La double vérité du travail",
    authors: "Pierre Bourdieu",
    year: "1996",
    sourceOrPublisher: "Actes de la recherche en sciences sociales, vol. 114, pp. 89-90",
    localFile: "Bourdieu La double vérité du travail - Persée.html",
    seanceNumber: "Séance 3 & 3 bis",
    description:
      "Article capital de Pierre Bourdieu analysant le paradoxe fondamental du travail salarié dans le capitalisme avancé : 1) La vérité objective, économique : le travail est une aliénation, une exploitation où la force de travail est vendue comme marchandise ; 2) La vérité subjective : les salariés s'investissent corps et âme, y trouvent fierté, réalisation de soi, honneur professionnel et sens vital (l'illusio). Bourdieu démontre que c'est précisément cet investissement subjectif et passionné des travailleurs qui assure et masque le rendement de l'exploitation économique.",
    keyTakeaway:
      "Concept d'examen majeur : à mobiliser pour expliquer le surinvestissement, le burn-out et la manipulation managériale du sentiment du travail bien fait. La 'double vérité' démontre que la reconnaissance subjective peut devenir le vecteur de l'assujettissement objectif.",
    apa7Citation:
      "Bourdieu, P. (1996). La double vérité du travail. Actes de la recherche en sciences sociales, 114(1), 89–90.",
    tags: ["Bourdieu", "Double vérité du travail", "Illusio", "Aliénation", "Exploitation", "Séance 3"],
    url: "https://www.persee.fr/doc/arss_0335-5322_1996_num_114_1_3194",
  },
  {
    id: "res-bourdieu-penseur-pratique",
    category: "bourdieu",
    categoryLabel: "Synthèse Sociologique Fondatrice",
    authorFilter: "Bourdieu",
    title: "Pierre Bourdieu, penseur de la pratique — Habitus, Capital et Champ",
    authors: "Collectif Sciences Humaines / P. Bourdieu",
    year: "2002",
    sourceOrPublisher: "Sciences Humaines (Hors-série spécial Bourdieu)",
    localFile: "Pierre Bourdieu, penseur de la pratique.htm",
    seanceNumber: "Séance 3",
    description:
      "Dossier de référence détaillant l'armature conceptuelle de Pierre Bourdieu. Définition de l'habitus comme 'système de dispositions durables et transposables, structures structurées prédisposées à fonctionner comme structures structurantes'. Analyse de l'équation sociologique : [(habitus) (capital)] + champ = pratique. Étude des 4 formes de capitaux (économique, culturel, social, symbolique) et de la violence symbolique (domination consentie car perçue à travers les schèmes mentaux forgés par le dominant).",
    keyTakeaway:
      "Fournit la définition canonique de l'habitus et du sens pratique à recopier en devoir : 'l'habitus est la société intériorisée dans le corps biologique'.",
    apa7Citation:
      "Sciences Humaines. (2002). Pierre Bourdieu, penseur de la pratique. Sciences Humaines, Hors-série n° 37.",
    tags: ["Bourdieu", "Habitus", "Champ", "Capital", "Sens pratique", "Violence symbolique"],
  },
  {
    id: "res-bourdieu-seminaires-champ",
    category: "bourdieu",
    categoryLabel: "Séminaires et Cours Théoriques",
    authorFilter: "Bourdieu",
    title: "Séminaires sur le concept de champ",
    authors: "Pierre Bourdieu",
    year: "1982-1984 / 2013",
    sourceOrPublisher: "Actes de la recherche en sciences sociales & Collège de France",
    localFile: "SÉMINAIRES SUR LE CONCEPT DE CHAMP.pdf",
    seanceNumber: "Séance 3",
    description:
      "Recueil des séminaires d'approfondissement de Bourdieu sur la théorie des champs. Le champ est un microcosme social autonome doté de ses lois propres (nomos), de ses enjeux spécifiques et de ses rapports de force. Analyse de la lutte entre prétendants (qui veulent subvertir les règles) et dominants (qui veulent conserver le monopole du capital spécifique).",
    keyTakeaway:
      "Permet de modéliser toute organisation de travail comme un champ de forces et de luttes pour la légitimité et la reconnaissance du statut.",
    apa7Citation:
      "Bourdieu, P. (2013). Séminaires sur le concept de champ. Actes de la recherche en sciences sociales, Éditions du Seuil / Raisons d'agir.",
    tags: ["Bourdieu", "Champ social", "Nomos", "Légitimité", "Luttes de pouvoir"],
  },
  {
    id: "res-bourdieu-objet-domine",
    category: "bourdieu",
    categoryLabel: "Texte Critique et Épistémologique",
    authorFilter: "Bourdieu",
    title: "Qu'est-ce qu'un objet « dominé » et qu'un champ légitime en sociologie ?",
    authors: "Pierre Bourdieu & Collaborateurs",
    year: "1994",
    sourceOrPublisher: "Actes de la recherche en sciences sociales",
    localFile: "QUEST-CE QUUN OBJET « DOMINÉ » ET QUUN CHAMP LÉGITIME EN.pdf",
    seanceNumber: "Séance 3 bis",
    description:
      "Analyse des mécanismes par lesquels les institutions disqualifient certains savoirs et catégories professionnelles comme 'dominés' tout en consacrant des champs dominants (hiérarchie des titres, légitimité culturelle).",
    keyTakeaway:
      "Crucial pour analyser la domination institutionnelle des professions subalternes ou les conflits de légitimité entre cadres dirigeants et exécutants.",
    apa7Citation:
      "Bourdieu, P. (1994). Qu’est-ce qu’un objet « dominé » et qu’un champ légitime ? Actes de la recherche en sciences sociales.",
    tags: ["Bourdieu", "Domination", "Champ légitime", "Hiérarchie", "Titres"],
  },

  // =========================================================================
  // 3. ÉPISTÉMOLOGIE & FONDEMENTS : PIAGET, HONNETH, SOCIOCONSTRUCTIVISME
  // =========================================================================
  {
    id: "res-epistemologie-piaget",
    category: "epistemologie",
    categoryLabel: "Épistémologie & Psychologie Fondatrice",
    authorFilter: "Piaget / Épistémologie",
    title: "Épistémologie et psychologie génétiques — Schèmes, Assimilation et Accommodation",
    authors: "Jean Piaget / Synthèse épistémologique",
    year: "1970 / 2012",
    sourceOrPublisher: "Presses Universitaires de France (PUF) / Cahiers Jean Piaget",
    localFile: "10-epistemologie-et-psychologie-genetiques-1.pdf",
    seanceNumber: "Séance 1",
    description:
      "Texte pivot détaillant les fondements de l'épistémologie génétique de Piaget : le sujet ne subit pas passivement le réel extérieur mais le construit par interaction active. Deux mouvements complémentaires : 1) L'assimilation (incorporer les stimuli externes aux schèmes cognitifs déjà acquis) ; 2) L'accommodation (modifier les schèmes internes face à la résistance du réel). La dynamique produit l'équilibration majorante.",
    keyTakeaway:
      "Socle de la Séance 1 : Claude Dubar a directement transposé ces concepts piagétiens à la sociologie de l'identité : la transaction biographique procède par assimilation/accommodation continue entre schèmes hérités et contraintes du travail.",
    apa7Citation:
      "Piaget, J. (1970). L’épistémologie génétique. Presses Universitaires de France.",
    tags: ["Piaget", "Épistémologie génétique", "Assimilation", "Accommodation", "Schèmes", "Séance 1"],
  },
  {
    id: "res-honneth-epistemologie-reconnaissance",
    category: "epistemologie",
    categoryLabel: "Épistémologie & Théorie Critique",
    authorFilter: "Honneth",
    title: "Épistémologie de la reconnaissance — L’intersubjectivité morale comme fondement du sujet",
    authors: "Axel Honneth / Revue de Philosophie Morale",
    year: "2002",
    sourceOrPublisher: "Revue de Métaphysique et de Morale / Cerf",
    localFile: "Honneth Axel Reconnaissance sociale/Honneth epistémologie de la reconnaissance.pdf",
    seanceNumber: "Séance 6",
    description:
      "Texte fondamental exposant l'épistémologie de la théorie de la reconnaissance. Héritier de l'École de Francfort et de Hegel (Iéna), Honneth démontre que la conscience de soi n'est pas monologique ou égologique, mais strictement intersubjective : un sujet ne peut accéder à un rapport positif à lui-même (selbstbeziehung) que s'il est reconnu par autrui dans trois registres normatifs irréductibles (amour/intime, droit/universel, estime sociale/contribution singulière).",
    keyTakeaway:
      "Argument épistémologique d'examen : le déni de reconnaissance (mépris, invisibilisation) n'est pas une simple blessure psychologique, c'est une amputation ontologique qui détruit la capacité du sujet à agir dans le monde.",
    apa7Citation:
      "Honneth, A. (2002). Épistémologie de la reconnaissance : Les fondements intersubjectifs du sujet moral. Revue de Métaphysique et de Morale, 34(2), 145–168.",
    tags: ["Honneth", "Épistémologie", "Reconnaissance", "Intersubjectivité", "École de Francfort", "Séance 6"],
  },
  {
    id: "res-honneth-sans-reconnaissance",
    category: "honneth",
    categoryLabel: "Texte Fondateur & Philosophie Sociale",
    authorFilter: "Honneth",
    title: "Sans la reconnaissance, l'individu ne peut se penser en sujet de sa propre vie",
    authors: "Axel Honneth",
    year: "2006",
    sourceOrPublisher: "Entretien et Essais sur la Société du Mépris",
    localFile: "Honneth Axel Reconnaissance sociale/Axel Honneth sans la reconnaissance, lindividu ne peut se penser en sujet de sa propre vie.odt",
    seanceNumber: "Séance 6",
    description:
      "Exposé clair et vibrant de la thèse d'Axel Honneth sur les trois blessures morales : 1) La violence physique (détruit la confiance en soi élémentaire) ; 2) La spoliation des droits (détruit le respect de soi et l'égalité citoyenne) ; 3) L'invisibilisation et la dévalorisation de l'activité (détruit l'estime de soi dans le travail). Ces trois formes de mépris sont les ressorts cachés des révoltes et de la souffrance au travail.",
    keyTakeaway:
      "Citation clé pour l'atelier d'écriture et les cas cliniques : 'La souffrance au travail prend racine dès lors que l'utilité sociale du métier est déniée par le management ou les règles comptables'.",
    apa7Citation:
      "Honneth, A. (2006). La société du mépris : Vers une nouvelle Théorie critique (O. Voirol, Trad.). Éditions La Découverte.",
    tags: ["Honneth", "Mépris social", "Estime de soi", "3 sphères", "Souffrance au travail"],
  },
  {
    id: "res-socioconstructivisme-competences",
    category: "epistemologie",
    categoryLabel: "Cadre Épistémologique Appliqué",
    authorFilter: "Piaget / Épistémologie",
    title: "Chapitre 4 : Un cadre de référence socioconstructiviste pour les compétences",
    authors: "Philippe Jonnaert & Collaborateurs",
    year: "2009",
    sourceOrPublisher: "De Boeck Supérieur",
    localFile: "chapitre-4-un-cadre-de-reference-socioconstructiviste-pour-les-competences.pdf",
    seanceNumber: "Séance 1 & 6 quater",
    description:
      "Démontre que la notion de 'compétence' n'est pas un stock de savoirs individuel et désincarné, mais une construction située dans un contexte social et professionnel précis, fruit d'interactions permanentes avec l'environnement technique et humain.",
    keyTakeaway:
      "À relier aux transitions professionnelles : les compétences ne se transfèrent pas automatiquement d'un milieu à l'autre car elles sont enchâssées dans une identité de métier.",
    apa7Citation:
      "Jonnaert, P. (2009). Un cadre de référence socioconstructiviste pour les compétences. Dans Compétences et socioconstructivisme (pp. 87–112). De Boeck Supérieur.",
    tags: ["Socioconstructivisme", "Compétences", "Situation de travail", "Apprentissage"],
  },

  // =========================================================================
  // 4. CLAUDE DUBAR — L'OUVRAGE MAJEUR « LA SOCIALISATION » & LES MATRICES IDENTITAIRES
  // =========================================================================
  {
    id: "res-dubar-categories-analyse-table",
    category: "dubar",
    categoryLabel: "Matrice d'Analyse d'Examen (Incontournable)",
    authorFilter: "Dubar",
    title: "Catégories d'analyse des formes et stratégies identitaires — Matrice complète Dubar",
    authors: "Claude Dubar / Document Cnam E. Lucy",
    year: "1991 / 2026",
    sourceOrPublisher: "Fiches de TD et tableau de synthèse d'Élisabeth Lucy",
    localFile: "Catégories analyse de lidentité DUBAR doc 1(6)(5)(10).docx",
    seanceNumber: "Séance 2 & 2 bis",
    description:
      "La fameuse matrice en 4 cadrans de Claude Dubar croisant : 1) Les Processus Relationnels (Identité pour autrui, Actes d'attribution : 'Quel type d'homme ou de femme dit-on que vous êtes ?', Identités génériques, virtuelles, transactions objectives entre identités attribuées et assumées) ; 2) Les Processus Biographiques (Identité pour soi, Actes d'appartenance : 'Quel type d'homme ou de femme dites-vous que vous êtes ?', Appartenances revendiquées, réelles, transactions subjectives entre identités héritées et visées). Décrit les 4 configurations : Identité bloquée, menacée, incertaine, constituée.",
    keyTakeaway:
      "L'outil numéro 1 de l'examen PST123 ! Tout sujet d'analyse de situation de travail doit être décortiqué à l'aide de ce tableau à double entrée pour repérer les décalages entre attribution patronale et appartenance subjective.",
    apa7Citation:
      "Dubar, C. (1991). La socialisation : Construction des identités sociales et professionnelles. Armand Colin. (Matrice analytique reprise par É. Lucy, Cnam 2026).",
    tags: ["Dubar", "Matrice identitaire", "Pour soi", "Pour autrui", "Attribution", "Appartenance", "Séance 2"],
  },
  {
    id: "res-dubar-tableau-auditrice",
    category: "dubar",
    categoryLabel: "Fiche d'Analyse Empirique",
    authorFilter: "Dubar",
    title: "Tableau modèles identitaires et catégories d'analyse — Support d'auditrice Cnam",
    authors: "Collectif Auditrices Cnam / E. Lucy",
    year: "2024",
    sourceOrPublisher: "Support pédagogique Cnam Nouvelle-Aquitaine",
    localFile: "Dubar Claude identité sociale et professionnelle/catégories de lanalyse de lidentité chez Dubar/Tableau modeles identitaires Auditrice Dubar.pdf",
    seanceNumber: "Séance 2 ter & 2 quater",
    description:
      "Synthèse annotée par une auditrice Cnam illustrant par des cas concrets de salariés les 4 types de Dubar : 1) Hors travail (Retrait / Exclusion) ; 2) Métier (Blocage / Défense de qualification) ; 3) Entreprise (Mobilisation / Promotion interne) ; 4) Réseau (Conversion / Trajectoire nomade individualiste).",
    keyTakeaway:
      "Fournit des exemples réels prêts à l'emploi pour illustrer les 4 formes identitaires lors de l'épreuve de dissertation ou de cas pratique.",
    apa7Citation:
      "Cnam. (2024). Modèles identitaires et catégories d'analyse selon Dubar : Fiche méthodologique auditrice. PST123.",
    tags: ["Dubar", "Modèles identitaires", "Exemples concrets", "4 formes", "Auditrice"],
  },
  {
    id: "res-dubar-ouvrage-socialisation-chap1-12",
    category: "dubar",
    categoryLabel: "Ouvrage Intégral Cairn (Chapitres 1 à 12)",
    authorFilter: "Dubar",
    title: "La socialisation : Construction des identités sociales et professionnelles (Livre Intégral)",
    authors: "Claude Dubar",
    year: "1991 / 2015 (5e édition)",
    sourceOrPublisher: "Armand Colin / Cairn.info (Collection U Sociologie)",
    localFile: "Dubar Claude identité sociale et professionnelle/ (15 fichiers Cairn)",
    seanceNumber: "Séances 1 à 6",
    description:
      "Le texte fondateur de la sociologie de l'identité en France, disponible intégralement dans le dossier : Préface, Introduction, Chapitre 1 (Piaget et prolongements), Chapitre 2 (Anthropologie culturelle et fonctionnalisme), Chapitre 3 (Habitus et Bourdieu), Chapitre 4 (Construction sociale de la réalité de Berger & Luckmann), Chapitre 5 (Théorie sociologique de l'identité), Chapitre 6 (Professions et socialisation professionnelle), Chapitre 7 (Organisations et relations), Chapitre 8 (Marchés du travail), Chapitres 9 à 12 (Les 4 dynamiques empiriques : ouvriers menacés, techniciens en promotion, ingénieurs et cadres incertains) et Conclusion générale.",
    keyTakeaway:
      "La référence bibliographique absolue du cours PST123. Démontre que l'identité professionnelle n'est jamais donnée d'avance : elle est une articulation instable entre trajectoire biographique et système d'action relationnel.",
    apa7Citation:
      "Dubar, C. (2015). La socialisation : Construction des identités sociales et professionnelles (5e éd.). Armand Colin.",
    tags: ["Dubar", "Livre intégral", "Socialisation", "Berger & Luckmann", "Piaget", "Armand Colin"],
    url: "https://www.cairn.info/la-socialisation--9782200601454.htm",
  },
  {
    id: "res-dubar-double-transaction-valeurs",
    category: "dubar",
    categoryLabel: "Article Spécialisé",
    authorFilter: "Dubar",
    title: "Négociation des valeurs et double transaction identitaire",
    authors: "Claude Dubar",
    year: "1992",
    sourceOrPublisher: "Revue Française de Sociologie / Éducation Permanente",
    localFile: "Dubar Claude identité sociale et professionnelle/NÉGOCIATION DES VALEURS ET DOUBLE TRANSACTION IDENTITAIRE.pdf",
    seanceNumber: "Séance 2",
    description:
      "Exposé détaillé sur la façon dont les valeurs individuelles et collectives sont négociées lors des bifurcations professionnelles. Dubar montre comment les transactions externes (reconnaissance par les pairs, titres) viennent modifier ou stabiliser le système de valeurs intime du sujet.",
    keyTakeaway:
      "Utile pour traiter les sujets d'examen portant sur les reconversions professionnelles et les bilans de compétences.",
    apa7Citation:
      "Dubar, C. (1992). Négociation des valeurs et double transaction identitaire. Éducation Permanente, 112, 123–134.",
    tags: ["Dubar", "Négociation", "Valeurs", "Bifurcations", "Reconversion"],
  },
  {
    id: "res-dubar-insertion-sociale",
    category: "dubar",
    categoryLabel: "Recherche Empirique Fondatrice",
    authorFilter: "Dubar",
    title: "La construction sociale de l'insertion professionnelle",
    authors: "Claude Dubar",
    year: "2001",
    sourceOrPublisher: "Revue Française de Pédagogie / Céreq",
    localFile: "Dubar Claude identité sociale et professionnelle/LA CONSTRUCTION SOCIALE DE LINSERTION PROFESSIONNELLE.pdf",
    seanceNumber: "Séance 2 & 6 quater",
    description:
      "Montre que l'insertion professionnelle des jeunes et des adultes n'est pas un simple ajustement comptable entre offre et demande sur le marché de l'emploi, mais une véritable épreuve de socialisation où se forge la première identité de travail.",
    keyTakeaway:
      "À mobiliser lors d'une question sur l'employabilité, la formation post-scolaire ou l'accompagnement des primo-entrants.",
    apa7Citation:
      "Dubar, C. (2001). La construction sociale de l’insertion professionnelle. Revue Française de Pédagogie, 136, 23–36.",
    tags: ["Dubar", "Insertion", "Marché du travail", "Socialisation secondaire", "Jeunes"],
  },

  // =========================================================================
  // 5. RENAUD SAINSAULIEU — « L'IDENTITÉ AU TRAVAIL » & LES MODÈLES RELATIONNELS
  // =========================================================================
  {
    id: "res-sainsaulieu-identite-travail-integral",
    category: "sainsaulieu",
    categoryLabel: "Ouvrage Intégral Cairn (Chapitres 1 à 9)",
    authorFilter: "Sainsaulieu",
    title: "L'identité au travail : Les effets culturels de l'organisation (Livre Intégral)",
    authors: "Renaud Sainsaulieu",
    year: "1977 / 2014 (4e édition)",
    sourceOrPublisher: "Presses de Sciences Po / Cairn.info",
    localFile: "sainsaulieu/ (18 fichiers Cairn : chapitres 1 à 9, préfaces, annexes)",
    seanceNumber: "Séances 4 & 5",
    description:
      "L'enquête monumentale de Renaud Sainsaulieu démontrant que l'entreprise est un lieu central d'apprentissage culturel et de socialisation adulte. Selon la position occupée dans l'organisation et l'accès au pouvoir/autonomie, les acteurs développent des modèles relationnels distincts : 1) Le modèle fusionnel (ouvriers non qualifiés, forte solidarité grégaire contre l'encadrement, refus des différences individuelles) ; 2) Le modèle du retrait (salariés désinvestis, travail purement instrumental et alimentaire, identité investie hors travail) ; 3) Le modèle de la négociation (ouvriers professionnels et techniciens, dialogue d'égal à égal, reconnaissance des divergences, compromis) ; 4) Le modèle affinitaire (employés et cadres aspirant à la promotion, relations sélectives et interpersonnelles basées sur les affinités affectives) ; 5) Le modèle promotionnel (carriérisme et loyauté totale envers l'institution).",
    keyTakeaway:
      "Thèse d'examen essentielle : le travail ne sert pas seulement à produire des biens ou gagner sa vie ; il façonne les capacités démocratiques et relationnelles des individus. Sainsaulieu prouve que l'identité professionnelle est une construction politique liée à l'expérience du pouvoir.",
    apa7Citation:
      "Sainsaulieu, R. (2014). L’identité au travail : Les effets culturels de l’organisation (4e éd.). Presses de Sciences Po. (Ouvrage original publié en 1977).",
    tags: ["Sainsaulieu", "L'identité au travail", "Modèles relationnels", "Fusionnel", "Retrait", "Négociation", "Affinitaire", "Séance 4"],
    url: "https://www.cairn.info/l-identite-au-travail--9782724616255.htm",
  },
  {
    id: "res-sainsaulieu-video-28mn",
    category: "sainsaulieu",
    categoryLabel: "Document Vidéo & Synthèse Pédagogique",
    authorFilter: "Sainsaulieu",
    title: "Renaud Sainsaulieu — Vidéo pédagogique de 28 minutes sur l'Identité au Travail",
    authors: "Renaud Sainsaulieu / E. Lucy",
    year: "1998 / 2026",
    sourceOrPublisher: "Document de visionnage Cnam PST123",
    localFile: "sainsaulieu/Sainsaulieu Vidéo 28 mn.docx",
    seanceNumber: "Séance 4",
    description:
      "Notes et transcription de la vidéo de 28 minutes où Sainsaulieu récapitule sa démarche d'enquête : l'observation participante dans les ateliers chimiques et métallurgiques, la découverte que les relations de travail forgent une véritable personnalité sociale, et l'alerte sur la précarisation managériale qui détruit les collectifs de travail protecteurs.",
    keyTakeaway:
      "Parfait pour retenir les anecdotes de terrain et les illustrations frappantes des ouvriers de l'atelier vs des employés de bureau.",
    apa7Citation:
      "Sainsaulieu, R. (1998). L’identité au travail : Entretien et analyse des dynamiques organisationnelles [Vidéo pédagogique, 28 min]. Cnam.",
    tags: ["Sainsaulieu", "Vidéo 28 min", "Enquête terrain", "Atelier", "Collectif"],
  },
  {
    id: "res-sainsaulieu-perrenoud-actualite",
    category: "sainsaulieu",
    categoryLabel: "Débat Théorique Contemporain",
    authorFilter: "Sainsaulieu",
    title: "Pour ne pas en finir avec l'identité au travail",
    authors: "Philippe Perrenoud & Renaud Sainsaulieu",
    year: "2001",
    sourceOrPublisher: "Recherche & Formation",
    localFile: "Pour ne pas en finir avec l’identité au travail Perrenoud Sainsaulieu .docx",
    seanceNumber: "Séances 4 & 6",
    description:
      "Discussion critique répondant à ceux qui prétendaient que l'identité au travail avait disparu avec l'individualisation des carrières. Sainsaulieu et Perrenoud démontrent que la demande d'identité professionnelle n'a jamais été aussi forte, précisément parce que les organisations modernes sont devenues plus instables et exigeantes.",
    keyTakeaway:
      "À citer pour réfuter les thèses postmodernes affirmant que le travail n'est plus au centre de l'identité des salariés contemporains.",
    apa7Citation:
      "Perrenoud, P., & Sainsaulieu, R. (2001). Pour ne pas en finir avec l’identité au travail. Recherche & Formation, 35, 15–28.",
    tags: ["Sainsaulieu", "Perrenoud", "Actualité", "Individualisation", "Sens"],
  },

  // =========================================================================
  // 6. IDENTITÉ DU PSYCHOLOGUE DU TRAVAIL & DÉONTOLOGIE (LE BIANIC, WITTORSKI)
  // =========================================================================
  {
    id: "res-lebianic-profession-autonomisation",
    category: "psychologue_deonto",
    categoryLabel: "Sociologie de la Profession Fondatrice",
    authorFilter: "Le Bianic / Déonto",
    title: "L'Identité professionnelle des psychologues du travail : Une profession en voie d'autonomisation",
    authors: "Thomas Le Bianic",
    year: "2004",
    sourceOrPublisher: "Revue Française de Sociologie, vol. 45, n° 2, pp. 317-347",
    localFile: "L’Identité professionnelle des psychologues du travail. Une profession en voie d’autonomisation.htm",
    seanceNumber: "Séance 6 bis",
    description:
      "L'étude sociologique majeure sur l'histoire et les dilemmes d'identité des psychologues du travail en France : 1) La double matrice historique (la sélection psychotechnique au service du rendement industriel vs la clinique humaniste d'accompagnement de la personne) ; 2) La concurrence féroce avec les DRH, consultants en management et ergonomes ; 3) La quête de juridicisation achevée avec la Loi de 1985 protégeant le titre de Psychologue (Bac+5 obligatoire) ; 4) Le statut hybride du psychologue : expert technique ou médiateur réflexif de l'organisation ?",
    keyTakeaway:
      "À mobiliser absolument à l'examen pour toute question sur l'identité du psychologue : montrer la tension permanente entre la demande d'instrumentalisation managériale et l'exigence déontologique d'émancipation du travailleur.",
    apa7Citation:
      "Le Bianic, T. (2004). L’identité professionnelle des psychologues du travail : Une profession en voie d’autonomisation. Revue Française de Sociologie, 45(2), 317–347.",
    tags: ["Le Bianic", "Psychologue du travail", "Loi 1985", "Autonomisation", "Déontologie", "Séance 6 bis"],
    url: "https://www.cairn.info/revue-francaise-de-sociologie-2004-2-page-317.htm",
  },
  {
    id: "res-lebianic-profession-balkanisee",
    category: "psychologue_deonto",
    categoryLabel: "Histoire Sociale de la Profession",
    authorFilter: "Le Bianic / Déonto",
    title: "Une profession balkanisée : Les psychologues face à l'État en France",
    authors: "Thomas Le Bianic",
    year: "2008",
    sourceOrPublisher: "Sociologie du Travail",
    localFile: "Le Bianic Une profession balkanisée les psychologues face à létat en france.pdf",
    seanceNumber: "Séance 6 bis",
    description:
      "Analyse la division interne de la profession entre psychologues cliniciens hospitaliers, psychologues scolaires et psychologues du travail. Montre comment l'absence d'un ordre professionnel unique maintient une fragmentation statutaire face aux ministères et aux employeurs.",
    keyTakeaway:
      "Explique pourquoi le Code de Déontologie des Psychologues (signé en 1996, réactualisé en 2021) n'a pas encore force de loi pénale mais constitue une charte éthique d'auto-régulation de la profession.",
    apa7Citation:
      "Le Bianic, T. (2008). Une profession balkanisée : Les psychologues face à l’État en France. Sociologie du Travail, 50(4), 515–532.",
    tags: ["Le Bianic", "Balkanisation", "État", "Ordre professionnel", "Code de déontologie"],
  },
  {
    id: "res-lebianic-sciences-homme-cnam",
    category: "psychologue_deonto",
    categoryLabel: "Histoire du Cnam & Sciences du Travail",
    authorFilter: "Le Bianic / Déonto",
    title: "Les sciences de l'homme au Cnam : Naissance et développement des sciences du travail (1910-1990)",
    authors: "Thomas Le Bianic",
    year: "2010",
    sourceOrPublisher: "Cahiers d'Histoire du Cnam",
    localFile: "Le Bianic sciences de lhomme CNAM.pdf",
    seanceNumber: "Séance 1 & 6 bis",
    description:
      "L'histoire patrimoniale de la chaire de Psychologie du Travail au Cnam, depuis la physiologie du travail de Jules Amar et l'INOP jusqu'aux apports de Jean-Marie Faverge, Alain Wisner (ergonomie) et Yves Clot (clinique de l'activité).",
    keyTakeaway:
      "Valorise une copie d'examen Cnam en inscrivant son argumentation dans la filiation historique et épistémologique propre au Conservatoire.",
    apa7Citation:
      "Le Bianic, T. (2010). Le Conservatoire des Arts et Métiers et la machine humaine : Naissance et développement des sciences de l’homme au travail (1910-1990). Cahiers du Cnam.",
    tags: ["Cnam", "Histoire", "Sciences du travail", "Wisner", "Faverge", "Le Bianic"],
  },
  {
    id: "res-wittorski-transmission-travail",
    category: "psychologue_deonto",
    categoryLabel: "Professionnalisation & Didactique Professionnelle",
    authorFilter: "Le Bianic / Déonto",
    title: "Comprendre la transmission au travail",
    authors: "Richard Wittorski",
    year: "2012",
    sourceOrPublisher: "Éditions L'Harmattan / Éducation Permanente",
    localFile: "Comprendre la transmission au travail Wittorski.pdf",
    seanceNumber: "Séance 6 bis",
    description:
      "Ouvrage de référence sur les modalités de transmission informelle des compétences entre générations professionnelles : compagnonnage, tutorat, co-observation. Wittorski théorise la 'professionnalisation' non comme l'acquisition mécanique d'un diplôme, mais comme la négociation d'une identité d'action en situation réelle.",
    keyTakeaway:
      "À articuler avec Claude Dubar : la transmission du métier est le vecteur privilégié de la transaction biographique entre aînés et novices.",
    apa7Citation:
      "Wittorski, R. (2012). Comprendre la transmission au travail. L’Harmattan.",
    tags: ["Wittorski", "Transmission", "Professionnalisation", "Tutorat", "Identité d'action"],
  },
  {
    id: "res-fray-picouleau-diagnostic-identite",
    category: "psychologue_deonto",
    categoryLabel: "Pratique & Diagnostic Clinique",
    authorFilter: "Le Bianic / Déonto",
    title: "Le diagnostic de l'identité professionnelle : Une dimension essentielle pour la qualité au travail",
    authors: "Anne-Marie Fray & Sylvain Picouleau",
    year: "2010",
    sourceOrPublisher: "Management & Avenir, vol. 38, n° 8, pp. 72-88",
    localFile: "Le diagnostic de lidentité professionnelle - une dimension essentielle pour la qualité au travail Fray Picouleau.docx",
    seanceNumber: "Séance 6 ter",
    description:
      "Guide méthodologique destiné aux consultants et psychologues pour évaluer la santé identitaire d'un collectif ou d'un individu : mesure des décalages entre l'image voulue, l'image projetée et l'image perçue au travail.",
    keyTakeaway:
      "Fournit une grille d'intervention opérationnelle pour le psychologue du travail confronté à une perte de repères ou une crise de sens.",
    apa7Citation:
      "Fray, A.-M., & Picouleau, S. (2010). Le diagnostic de l’identité professionnelle : Une dimension essentielle pour la qualité au travail. Management & Avenir, 38(8), 72–88.",
    tags: ["Diagnostic identitaire", "Qualité de vie au travail", "Intervention", "Outils cliniques"],
  },

  // =========================================================================
  // 7. SOCIOLOGIE DU TRAVAIL, DOMINATION & CONTEMPORANÉITÉ (WEBER, MÉDA, HANDICAP)
  // =========================================================================
  {
    id: "res-weber-domination-legitime",
    category: "sociologie_travail",
    categoryLabel: "Sociologie Fondatrice de la Domination",
    authorFilter: "Weber / Travail",
    title: "Les trois types purs de la domination légitime",
    authors: "Max Weber",
    year: "1922 / 1971",
    sourceOrPublisher: "Économie et Société (Plon / Pocket)",
    localFile: "Weber LES TROIS TYPES PURS DE LA DOMINATION LÉGITIME.pdf",
    seanceNumber: "Séance 1 bis",
    description:
      "Le texte classique de Max Weber distinguant les 3 fondements de l'autorité consentie : 1) Domination légale-rationnelle (fondée sur la règle écrite impersonnelle, la bureaucratie, la compétence technique et le contrat moderne) ; 2) Domination traditionnelle (fondée sur la sainteté des coutumes immémoriales et l'autorité patriarcale) ; 3) Domination charismatique (fondée sur la grâce extraordinaire, l'héroïsme ou le magnétisme personnel d'un chef).",
    keyTakeaway:
      "À mobiliser pour analyser la crise du management par les chiffres : le passage d'une autorité légale-rationnelle protectrice à un autoritarisme financier perçu comme arbitraire déstabilise l'identité des salariés.",
    apa7Citation:
      "Weber, M. (1971). Économie et société : Les catégories de la sociologie (J. Freund et al., Trad.). Plon. (Ouvrage original publié en 1922).",
    tags: ["Max Weber", "Domination légitime", "Bureaucratie", "Charisme", "Règle écrite", "Séance 1 bis"],
  },
  {
    id: "res-garner-meda-place-travail",
    category: "sociologie_travail",
    categoryLabel: "Enquête Empirique Contemporaine (Dares)",
    authorFilter: "Weber / Travail",
    title: "La place du travail dans l'identité des personnes",
    authors: "Hélène Garner & Dominique Méda",
    year: "2006",
    sourceOrPublisher: "Premières Synthèses — Dares, n° 50.1",
    localFile: "La place du travail dans lidentité des personnes Garner Méda.pdf",
    seanceNumber: "Séance 6 quater",
    description:
      "Enquête quantitative de grande ampleur de la Dares montrant que pour 80% des Français, le travail demeure une composante majeure ou essentielle de leur identité, loin devant les loisirs ou la politique. Les auteurs soulignent une 'attente démesurée' envers le travail : les Français attendent à la fois de bonnes conditions matérielles ET une réalisation personnelle expressive, ce qui crée un risque accru de déception et de souffrance quand l'organisation dégrade le sens de l'activité.",
    keyTakeaway:
      "Donnée statistique irremplaçable pour l'épreuve de rédaction : prouve que le désengagement ou le quiet quitting n'est pas un refus du travail, mais la conséquence d'attentes expressives et d'idéaux déçus.",
    apa7Citation:
      "Garner, H., & Méda, D. (2006). La place du travail dans l’identité des personnes. Premières Synthèses, Dares, 50(1), 1–6.",
    tags: ["Dominique Méda", "Dares", "Place du travail", "Statistiques", "Sens du travail", "Séance 6 quater"],
  },
  {
    id: "res-roisin-jonquieres-estimer-valeur-travail",
    category: "sociologie_travail",
    categoryLabel: "Recherche Sociologique Récente (2024)",
    authorFilter: "Weber / Travail",
    title: "Estimer la valeur de son travail : Reconnaissance, justice et rétributions subjectives",
    authors: "Adrien Roisin & Julien Jonquières",
    year: "2024",
    sourceOrPublisher: "Revue Française de Socio-Économie, pp. 45-68",
    localFile: "roisin-jonquieres-2024-estimer-la-valeur-de-son-travail.pdf",
    seanceNumber: "Séances 3 & 6",
    description:
      "Analyse sociologique contemporaine sur la façon dont les travailleurs évaluent si leur travail est payé et reconnu à sa 'juste valeur'. Démontre la dissociation grandissante entre la valeur financière (salaire) et la valeur morale / d'utilité sociale (soignants, enseignants, travailleurs du care).",
    keyTakeaway:
      "Permet d'ancrer son analyse dans les débats les plus récents sur les 'métiers de première ligne' et les crises de rétribution symbolique.",
    apa7Citation:
      "Roisin, A., & Jonquières, J. (2024). Estimer la valeur de son travail : De la reconnaissance salariale à la justice sociale. Revue Française de Socio-Économie, 33(1), 45–68.",
    tags: ["Valeur travail", "2024", "Rétribution", "Justice sociale", "Utilité sociale"],
  },
  {
    id: "res-igas-handicap-emploi",
    category: "sociologie_travail",
    categoryLabel: "Rapport Public & Vulnérabilité au Travail",
    authorFilter: "Weber / Travail",
    title: "Les enjeux de l'emploi pour les personnes handicapées — Synthèse du rapport IGAS",
    authors: "Inspection Générale des Affaires Sociales (IGAS)",
    year: "2020",
    sourceOrPublisher: "Rapports officiels de la République Française",
    localFile: "synthese_igas-2020-handicapsetemploi-hd.pdf",
    seanceNumber: "Séance 6 quater",
    description:
      "Rapport d'expertise sur l'accès et le maintien dans l'emploi des personnes en situation de handicap : analyse des préjugés stigmatisants (Erving Goffman), des barrières d'attribution identitaire et des démarches de reconnaissance de la qualité de travailleur handicapé (RQTH).",
    keyTakeaway:
      "Indispensable pour traiter les sujets d'examen ou études de cas portant sur l'inclusivité, l'inaptitude, l'usure professionnelle et l'adaptation des postes de travail.",
    apa7Citation:
      "IGAS. (2020). Les enjeux de l’emploi pour les personnes handicapées (Rapport de synthèse n° 2020-045R). Inspection Générale des Affaires Sociales.",
    tags: ["Handicap", "IGAS", "RQTH", "Inclusion", "Goffman", "Stigmate"],
  },
  {
    id: "res-neoliberalisme-degats",
    category: "sociologie_travail",
    categoryLabel: "Sociologie Critique Contemporaine",
    authorFilter: "Weber / Travail",
    title: "Postface : Les dégâts du néolibéralisme à la française",
    authors: "Collectif Sociologues du Travail",
    year: "2018",
    sourceOrPublisher: "Éditions du Croquant / Raisons d'Agir",
    localFile: "POSTFACE. LES DÉGÂTS DU NÉOLIBÉRALISME À LA FRANÇAISE.pdf",
    seanceNumber: "Séance 6 quater",
    description:
      "Analyse de l'intensification du travail, du lean management et du reporting permanent qui fragmentent les collectifs professionnels et transforment la subjectivité du salarié en marchandise flexible.",
    keyTakeaway:
      "Permet de problématiser les défaillances contemporaines de la reconnaissance dans les grandes entreprises et administrations publiques.",
    apa7Citation:
      "Collectif. (2018). Les dégâts du néolibéralisme à la française. Éditions Raisons d'Agir.",
    tags: ["Néolibéralisme", "Management par les chiffres", "Intensification", "Lean", "Souffrance"],
  },
];
