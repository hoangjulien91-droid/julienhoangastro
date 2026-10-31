import type { PlanningUnitId } from "./planning";

export interface EssentielAuteur {
  nom: string;
  apport: string;
}

export interface EssentielConcept {
  terme: string;
  definitionCourte: string;
}

export interface EssentielCoursCard {
  id: string;
  unitId: PlanningUnitId;
  seanceId?: string;
  coursNum?: number;
  badge: string;
  titre: string;
  filConducteur: string;
  ceQuIlFautSavoir: string[];
  ceQuIlFautRetenir: string[];
  auteursCles: EssentielAuteur[];
  conceptsCles: EssentielConcept[];
  piegeExamen: string;
}

export const ESSENTIEL_COURS_DATA: EssentielCoursCard[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // PST106 — SYNTHÈSE GLOBALE UE & SÉANCES 1, 2, 3
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-global",
    unitId: "pst106",
    badge: "PST106 · L'Essentiel de l'UE",
    titre: "Clinique de l'activité et psychologie du travail",
    filConducteur:
      "Comprendre comment la psychologie du travail francophone s'est émancipée de la sélection psychotechnique et du taylorisme pour analyser le travail réel et développer le pouvoir d'agir des collectifs (Clot).",
    ceQuIlFautSavoir: [
      "Le travail n'est pas une simple exécution de consignes : il existe toujours un écart irréductible entre la tâche prescrite (organisation) et l'activité réelle (opérateur).",
      "L'histoire de la discipline au Cnam traverse 4 grandes époques : l'OST/Psychotechnique (Taylor, Lahy), les Relations Humaines (Mayo, Lewin, Herzberg), l'Ergonomie cognitive francophone (Pacaud, Wisner, Faverge, Leplat) et la Clinique du travail (Le Guillant, Dejours, Clot, Bobillier-Chaumon).",
      "En clinique de l'activité (Yves Clot, héritier de Vygotski), le réel de l'activité comprend aussi ce qu'on ne peut pas faire, ce qu'on voudrait faire et ce qu'on fait pour ne pas faire (l'activité empêchée).",
      "La santé au travail ne réside pas dans l'absence de contraintes, mais dans la capacité à débattre des critères du « travail bien fait » au sein du genre professionnel.",
    ],
    ceQuIlFautRetenir: [
      "Formule de posture (Pr. Lagabrielle) : « Le maçon a sa truelle, nous psychologues, nos outils sont les concepts scientifiques — pas le bon sens ! »",
      "Rupture Taylor vs Lahy : Taylor cherche le maximum productif immédiat (rationalisation externe) ; Lahy cherche l'optimum psychophysiologique (automatisation interne libérant de la disponibilité mentale).",
      "Équation ergonomique : Tâche prescrite ≠ Tâche redéfinie ≠ Activité réelle (modèle de la double régulation des 5 carrés de Leplat).",
      "Différence Dejours vs Clot : Dejours analyse la souffrance, les défenses et la reconnaissance ; Clot analyse le pouvoir d'agir, le genre professionnel, le style et la controverse sur la qualité du travail.",
    ],
    auteursCles: [
      {
        nom: "Yves Clot",
        apport: "Clinique de l'activité, réel de l'activité, genre professionnel, style, pouvoir d'agir.",
      },
      {
        nom: "Christophe Dejours",
        apport: "Psychodynamique du travail, stratégies collectives de défense, jugement d'utilité et de beauté.",
      },
      {
        nom: "Jean-Marie Lahy & Suzanne Pacaud",
        apport: "Pionniers de la psychotechnique critique (optimum vs maximum) et bascule du labo au terrain réel (téléphonistes SNCF).",
      },
      {
        nom: "Jacques Leplat & Alain Wisner",
        apport: "Ergonomie francophone : couple prescrit/réel, modèle des 5 carrés et double régulation.",
      },
      {
        nom: "Louis Le Guillant",
        apport: "Fondateur de la psychopathologie du travail (condition sociale, névrose des téléphonistes, bonnes à tout faire).",
      },
      {
        nom: "Elton Mayo, Kurt Lewin & Frederick Herzberg",
        apport: "Facteur humain (effet Hawthorne), dynamique de groupe (décristallisation) et modèle bi-factoriel (hygiène vs moteurs).",
      },
    ],
    conceptsCles: [
      {
        terme: "Écart Prescrit / Réel",
        definitionCourte: "Distinction fondatrice entre la consigne formelle et l'activité vivante déployée face aux imprévus.",
      },
      {
        terme: "Réel de l'activité",
        definitionCourte: "Chez Clot : ce qui est réalisé + les possibles non réalisés (activité empêchée, contrariée).",
      },
      {
        terme: "Genre professionnel",
        definitionCourte: "Mémoire impersonnelle et collective d'un milieu de métier (règles tacites, gestes partagés).",
      },
      {
        terme: "Modèle des 5 carrés (Leplat)",
        definitionCourte: "Conditions externes + internes → Activité → Effets sur la production + Effets sur l'opérateur (double régulation).",
      },
      {
        terme: "Fonctions latentes (Jahoda)",
        definitionCourte: "Structuration du temps, liens sociaux hors famille, statut/identité, activité régulière et but collectif.",
      },
    ],
    piegeExamen:
      "Ne jamais réduire la motivation à un trait de personnalité ou au salaire (Herzberg : le salaire est un facteur d'hygiène), et ne jamais confondre l'activité réalisée (observable) avec le réel de l'activité (qui inclut l'activité empêchée).",
  },
  {
    id: "pst106-s1",
    unitId: "pst106",
    seanceId: "pst106-s1",
    coursNum: 1,
    badge: "PST106 · Cours 1 (15 oct.)",
    titre: "Cadre de la Discipline, Histoire & Conceptions du Travail",
    filConducteur:
      "Du « tripalium » antique à la clinique de l'activité : pourquoi le travail est passé d'une servitude biologique à un opérateur central de santé mentale et de construction identitaire.",
    ceQuIlFautSavoir: [
      "Le mot travail (du latin tripalium) porte une ambivalence historique : à la fois contrainte douloureuse / activité forcée (Wallon) et lieu d'accomplissement et d'émancipation (Dejours, Clot).",
      "Hannah Arendt (1958) distingue trois registres de la Vita Activa : le Travail (Labor, survie biologique cyclique), l'Œuvre (Work, fabrication d'un monde durable d'objets) et l'Action (Action, parole politique entre pairs).",
      "L'étude des chômeurs de Marienthal (Marie Jahoda, 1937) démontre que le travail remplit 5 fonctions psychologiques latentes indispensables à l'équilibre psychique au-delà du seul salaire.",
      "La psychologie du travail francophone se scinde entre une approche gestionnaire/adaptative (sélection, adéquation homme-poste) et une clinique du travail centrée sur la subjectivité et la transformation des situations.",
    ],
    ceQuIlFautRetenir: [
      "Tripartition d'Arendt : Animal laborans (Travail/survie) ≠ Homo faber (Œuvre/durabilité) ≠ Citoyen (Action/espace public).",
      "Les 5 fonctions latentes de Jahoda (1937) : 1) Structure temporelle, 2) Contacts sociaux élargis, 3) Buts collectifs, 4) Statut et identité, 5) Activité régulière.",
      "Les 4 dimensions culturelles de Hofstede (1980) : Distance hiérarchique, Individualisme/Collectivisme, Contrôle de l'incertitude, Masculinité/Féminité.",
      "Les 3 critères constants du travail selon Lévy-Leboyer : mobilisation d'un effort, orientation vers un but, inscription dans un système de contraintes.",
    ],
    auteursCles: [
      {
        nom: "Hannah Arendt (1958)",
        apport: "Condition de l'homme moderne : distinction Travail (Labor), Œuvre (Work) et Action.",
      },
      {
        nom: "Marie Jahoda (1937)",
        apport: "Enquête de Marienthal : découverte des fonctions manifeste (revenu) et latentes du travail.",
      },
      {
        nom: "Henri Wallon",
        apport: "Le travail comme « activité forcée » étrangère aux besoins immédiats.",
      },
      {
        nom: "Geert Hofstede (1980)",
        apport: "Enquête IBM : les 4 dimensions culturelles nationales du rapport au travail.",
      },
      {
        nom: "Yves Clot & Christophe Dejours",
        apport: "Les deux piliers de la clinique du travail au Cnam (Clinique de l'activité vs Psychodynamique).",
      },
    ],
    conceptsCles: [
      {
        terme: "Tripalium",
        definitionCourte: "Étymologie latine (instrument à trois pieux) illustrant le pôle de souffrance et de contrainte.",
      },
      {
        terme: "Fonctions latentes",
        definitionCourte: "Bénéfices psychosociaux invisibles du travail (temps, lien, statut) révélés par leur perte au chômage.",
      },
      {
        terme: "Contrôle de l'incertitude",
        definitionCourte: "Dimension de Hofstede mesurant le besoin de règles formelles et de sécurité statutaire (élevé en France).",
      },
      {
        terme: "Pouvoir d'agir",
        definitionCourte: "Rayon d'action effectif du sujet et du collectif sur leur milieu professionnel et sur eux-mêmes.",
      },
    ],
    piegeExamen:
      "Ne pas confondre Travail et Œuvre chez Hannah Arendt : le Travail (Labor) est consommé immédiatement pour la survie biologique, tandis que l'Œuvre (Work) produit un monde d'objets durables.",
  },
  {
    id: "pst106-s2",
    unitId: "pst106",
    seanceId: "pst106-s2",
    coursNum: 2,
    badge: "PST106 · Cours 2 (21 oct.)",
    titre: "De la Mécanisation Industrielle à l'Analyse Ergonomique de Terrain",
    filConducteur:
      "Comment la critique scientifique du taylorisme par Jean-Marie Lahy et Suzanne Pacaud a fait passer la psychologie du laboratoire psychotechnique à l'étude clinique du terrain réel.",
    ceQuIlFautSavoir: [
      "L'École Classique (Taylor, Ford, Fayol, Weber) repose sur une rationalisation externe confisquant le savoir ouvrier : double division (verticale et horizontale) chez Taylor, convoyeur mécanique chez Ford, administration POC3 chez Fayol.",
      "Le néotaylorisme contemporain déplace la prescription du corps vers la psyché : scripts langagiers dans les services, injonction paradoxale du « sourire sincère prescrit », flux tendu toyotiste et prescription par le client.",
      "Jean-Marie Lahy (Cnam) réfute Taylor : l'ouvrier n'est pas un bœuf passif ; il cherche à automatiser ses gestes de l'intérieur pour libérer une « disponibilité psychologique » (penser, anticiper, rêver).",
      "Suzanne Pacaud (1953, téléphonistes SNCF) inaugure l'ergonomie de terrain en démontrant que les tests de laboratoire échouent si l'on n'analyse pas la complexité vivante de la situation réelle (14 contraintes invisibles).",
    ],
    ceQuIlFautRetenir: [
      "Citation clé d'Yves Clot : « Taylor achetait la force de travail physique ; aujourd'hui, on achète l'engagement et la subjectivité. »",
      "Opposition doctrinale : Taylor vise le Maximum (épuisement, rationalisation externe) ≠ Lahy vise l'Optimum psychophysiologique (santé, automatisation interne libératrice).",
      "Rupture méthodologique de Pacaud (1953) : « Pour comprendre le métier, il faut l'apprendre et le faire sur le terrain » (passage de la psychotechnique à l'ergonomie).",
      "Philosophie du travail : Rousseau (corruption sociale), Nietzsche (« la meilleure des polices »), Weber (ascétisme protestant), Freud (ancrage dans le principe de réalité et sublimation).",
    ],
    auteursCles: [
      {
        nom: "Frederick W. Taylor & Henry Ford",
        apport: "OST (One Best Way, division verticale/horizontale, chronométrage) et travail à la chaîne convoyée.",
      },
      {
        nom: "Henri Fayol & Max Weber",
        apport: "Administration industrielle (POC3 : Planifier, Organiser, Commander, Coordonner, Contrôler) et bureaucratie rationnelle-légale.",
      },
      {
        nom: "Jean-Marie Lahy (1872-1943)",
        apport: "Critique scientifique du taylorisme, recherche de l'optimum et concept de disponibilité psychologique.",
      },
      {
        nom: "Suzanne Pacaud (1953)",
        apport: "Étude des téléphonistes SNCF : mise au jour des 14 difficultés invisibles et naissance de l'analyse du travail sur le terrain.",
      },
      {
        nom: "Frank & Lillian Gilbreth",
        apport: "Étude des micro-mouvements (therbligs) et aménagement ergonomique du poste des maçons (18 gestes réduits à 4,5).",
      },
    ],
    conceptsCles: [
      {
        terme: "Division verticale / horizontale",
        definitionCourte: "Séparation concepteurs/exécutants (verticale) et parcellisation des tâches en gestes élémentaires (horizontale).",
      },
      {
        terme: "Automatisation interne (Lahy)",
        definitionCourte: "Appropriation rythmique du geste par l'ouvrier qui libère son esprit, opposée à la cadence imposée de l'extérieur.",
      },
      {
        terme: "Sincérité prescrite",
        definitionCourte: "Injonction paradoxale du néotaylorisme des services exigeant de ressentir réellement l'émotion imposée par le script.",
      },
      {
        terme: "Psychotechnique",
        definitionCourte: "Science appliquée (Münsterberg, Piéron, Lahy) utilisant des tests objectifs pour l'orientation et la sélection professionnelles.",
      },
    ],
    piegeExamen:
      "Erreur fréquente aux 25 questions sur Taylor : croire que les patrons ont immédiatement adhéré à l'OST (ils étaient réticents à cause du coût du bureau des méthodes) ou que le chronométrage était la seule technique d'analyse des temps (tables MTM, chronophotographie).",
  },
  {
    id: "pst106-s3",
    unitId: "pst106",
    seanceId: "pst106-s3",
    coursNum: 3,
    badge: "PST106 · Cours 3 (28 oct.)",
    titre: "Du Facteur Humain à l'Analyse de l'Activité et la Psychopathologie",
    filConducteur:
      "De la découverte du groupe informel (Mayo, Lewin) à l'ergonomie francophone du travail réel (Wisner, Leplat) et à la psychopathologie sociale du travail (Le Guillant).",
    ceQuIlFautSavoir: [
      "L'École des Relations Humaines (Elton Mayo à Hawthorne, 1927-1932) découvre que la productivité dépend moins de l'éclairage ou des pauses que de la considération accordée aux salariés et des normes du groupe informel.",
      "La motivation n'est pas un réflexe mécanique : Herzberg distingue les facteurs d'hygiène (extrinsèques : salaire, conditions — qui évitent l'insatisfaction) des facteurs moteurs (intrinsèques : contenu du travail, reconnaissance — seuls sources de motivation durable).",
      "L'ergonomie de langue française (Wisner, Faverge, Leplat) place au centre le paradoxe entre Travail Prescrit et Travail Réel : l'opérateur recompose la tâche (tâche redéfinie) via ses régulations cognitives.",
      "Louis Le Guillant fonde dans les années 1950 la psychopathologie du travail : les troubles psychiques (névrose des téléphonistes, sœurs Papin) ne viennent pas d'une fragilité individuelle mais d'une condition sociale de domination.",
    ],
    ceQuIlFautRetenir: [
      "Avertissement de Mme Lagabrielle : « On ne motive pas les gens ! L'organisation crée des conditions favorables et l'individu se motive. »",
      "Expérience de Kurt Lewin (1943, abats / Harwood) : Le changement imposé par cours magistral donne 3% d'effet contre 30% par discussion et décision collective du groupe (décristallisation → transition → recristallisation).",
      "Schéma des 5 carrés de Jacques Leplat : Conditions externes (tâche) + Conditions internes (sujet) → Activité → Effets sur le système + Effets sur l'opérateur (avec boucle de double régulation).",
      "Filiation Cnam en 1990 : lors de la succession de Wisner/Goguelin, scission entre Psychodynamique du travail (Dejours) et Clinique de l'activité (Clot), puis arrivée de Marc-Éric Bobillier-Chaumon (2018, clinique des usages numériques).",
    ],
    auteursCles: [
      {
        nom: "Elton Mayo (1927-1932)",
        apport: "Enquête Hawthorne (Western Electric) : effet Hawthorne, besoin d'affiliation et poids de l'organisation informelle.",
      },
      {
        nom: "Frederick Herzberg & Douglas McGregor",
        apport: "Théorie bi-factorielle (hygiène vs moteurs) et opposition Théorie X (contrôle/sanction) vs Théorie Y (autonomie).",
      },
      {
        nom: "Kurt Lewin",
        apport: "Dynamique des groupes, champ de forces, leadership démocratique et conduite participative du changement.",
      },
      {
        nom: "Alain Wisner, J.-M. Faverge & Jacques Leplat",
        apport: "Couple prescrit/réel, 4 composantes du travail (Faverge) et modèle cognitif des 5 carrés (Leplat).",
      },
      {
        nom: "Louis Le Guillant",
        apport: "Le drame humain du travail : névrose des téléphonistes, conducteurs de train, condition des bonnes à tout faire.",
      },
    ],
    conceptsCles: [
      {
        terme: "Effet Hawthorne",
        definitionCourte: "Augmentation de l'engagement des sujets liée au sentiment d'être écoutés, considérés et associés à une expérimentation.",
      },
      {
        terme: "Théorie bi-factorielle (Herzberg)",
        definitionCourte: "Satisfaction et insatisfaction ne sont pas sur le même axe : les facteurs d'hygiène calment le mécontentement, seuls les moteurs motivent.",
      },
      {
        terme: "Double régulation (Leplat)",
        definitionCourte: "En cas de dérive ou fatigue, l'opérateur modifie soit son mode opératoire (interne), soit les exigences de la tâche (externe).",
      },
      {
        terme: "Clinique des usages",
        definitionCourte: "Approche de M.-É. Bobillier-Chaumon étudiant comment l'IA et les technologies numériques transforment le pouvoir d'agir.",
      },
    ],
    piegeExamen:
      "Deux erreurs sanctionnées à l'examen : 1) Dessiner ou attribuer une « pyramide » rigide à Maslow (invention de consultants, Maslow parlait de hiérarchie dynamique relative) ; 2) Croire que supprimer les facteurs d'insatisfaction (Herzberg) suffit à créer de la motivation.",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — SYNTHÈSE GLOBALE UE & SÉANCE 1
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-global",
    unitId: "pst108",
    badge: "PST108 · L'Essentiel de l'UE",
    titre: "Langage, communication, argumentation et travail",
    filConducteur:
      "Le langage au travail n'est pas un simple canal d'information : c'est un instrument psychologique de développement de la pensée (Vygotski), de reconnaissance sociale (Honneth, Habermas) et d'intervention sur l'organisation (méthode IOD).",
    ceQuIlFautSavoir: [
      "Depuis le réseau « Langage et Travail » (Boutet, Girin, 1986), la parole est reconnue comme une part constitutive de l'activité productive (part langagière du travail).",
      "La controverse Piaget vs Vygotski structure l'épistémologie du Cnam : pour Vygotski, le développement va du social vers l'individuel (loi de double formation) et le langage égocentrique devient langage intérieur régulateur.",
      "La philosophie sociale (Bourdieu, Habermas, Honneth) éclaire les rapports de pouvoir dans le langage : marché linguistique et violence symbolique (Bourdieu), agir communicationnel (Habermas) et lutte pour la reconnaissance (Honneth).",
      "Sur le terrain de l'insertion, la méthode IOD (Francis Valls & Denis Castra, 1995) renverse le modèle de l'employabilité individuelle pour agir directement sur les procédures de recrutement de l'entreprise.",
    ],
    ceQuIlFautRetenir: [
      "Loi de Vygotski : Toute fonction psychique supérieure apparaît deux fois : d'abord entre les personnes (interpsychologique), puis en soi (intrapsychologique).",
      "Algorithme de Bourdieu : [(Habitus) × (Capital)] + Champ = Pratique sociale (et violence symbolique du langage légitime).",
      "Les 3 sphères de la reconnaissance d'Axel Honneth : 1) Amour/Sollicitude → Confiance en soi ; 2) Droit/Respect → Respect de soi ; 3) Solidarité/Travail → Estime sociale de soi.",
      "Rupture IOD (Valls & Castra) : Supprimer le tri sur CV et la lettre de motivation au profit de la mise en relation directe en situation de travail réel.",
    ],
    auteursCles: [
      {
        nom: "Lev Vygotski vs Jean Piaget",
        apport: "Interactionnisme historico-culturel (ZPD, langage intérieur) vs constructivisme biologique par stades.",
      },
      {
        nom: "Pierre Bourdieu",
        apport: "Ce que parler veut dire : habitus linguistique, capital symbolique, illusio et violence symbolique.",
      },
      {
        nom: "Jürgen Habermas",
        apport: "Agir communicationnel (intercompréhension) vs agir instrumental/stratégique ; colonisation du monde vécu par le système.",
      },
      {
        nom: "Axel Honneth",
        apport: "La lutte pour la reconnaissance : les 3 sphères (Amour, Droit, Solidarité) et leurs formes de mépris.",
      },
      {
        nom: "Francis Valls & Denis Castra",
        apport: "Méthode IOD (Intervention sur l'Offre et la Demande) : médiation active en entreprise sans sélection sur CV.",
      },
    ],
    conceptsCles: [
      {
        terme: "Zone Proximale de Développement (ZPD)",
        definitionCourte: "Écart entre ce que le sujet résout seul (niveau actuel) et ce qu'il réussit avec médiation d'autrui (niveau potentiel).",
      },
      {
        terme: "Agir communicationnel (Habermas)",
        definitionCourte: "Coordination de l'action par le dialogue visant l'entente autour de 3 prétentions à la validité (vérité, justesse, sincérité).",
      },
      {
        terme: "Violence symbolique (Bourdieu)",
        definitionCourte: "Domination douce qui s'exerce avec la complicité intériorisée de ceux qui la subissent (sentiment d'illégitimité langagière).",
      },
      {
        terme: "Méthode IOD",
        definitionCourte: "Ingénierie d'insertion agissant simultanément sur l'offre d'emploi (employeur) et la demande (chercheur d'emploi).",
      },
    ],
    piegeExamen:
      "Chez Piaget vs Vygotski : ne jamais écrire que le langage égocentrique disparaît chez Vygotski (il disparaît chez Piaget, mais s'intériorise en langage intérieur chez Vygotski).",
  },
  {
    id: "pst108-s1",
    unitId: "pst108",
    seanceId: "pst108-s1",
    coursNum: 1,
    badge: "PST108 · Cours 1 (Marot / Valls / Lucy)",
    titre: "Cadre Conceptuel : Langage, Communication, Dialogue et Confrontation Piaget / Vygotski",
    filConducteur:
      "Distinction rigoureuse entre Langage, Langue, Communication et Dialogue, genèse précoce de la pensée (Golse) et opposition canonique entre Piaget et Vygotski.",
    ceQuIlFautSavoir: [
      "Il faut distinguer 4 notions : le Langage (faculté universelle de symbolisation), la Langue (système de signes social codifié à 5 niveaux), la Communication (transmission d'information avec feedback) et le Dialogue (co-construction clinique de sens).",
      "Bernard Golse montre que le bain langagier préexiste au nourrisson et assure 4 fonctions vitales : pare-excitation, réparation symbolique de l'absence (Fort-Da), étayage narcissique et accès à la tiercéité.",
      "Jean Piaget conçoit le développement comme un constructivisme endogène (assimilation, accommodation, équilibration) où la pensée précède le langage.",
      "Lev Vygotski opère une révolution historico-culturelle : le langage est d'abord social, puis devient égocentrique (instrument de planification à voix haute face à l'obstacle) avant de s'intérioriser en pensée verbale.",
    ],
    ceQuIlFautRetenir: [
      "Les 5 niveaux d'analyse de la langue : 1) Phonologie, 2) Morphologie, 3) Syntaxe, 4) Sémantique, 5) Pragmatique (usage en contexte).",
      "Expérience des crayons de couleur de Vygotski : Lorsqu'on retire le crayon bleu à l'enfant (obstacle), son langage égocentrique double de volume car il lui sert à planifier la solution.",
      "Matrice Piaget vs Vygotski : Direction du développement = Individuel → Social (Piaget) vs Social → Individuel (Vygotski) ; Apprentissage = subordonné au développement (Piaget) vs précède et tire le développement dans la ZPD (Vygotski).",
      "Formule Cnam (Yves Clot) : « Transformer pour comprendre » via la coopération conflictuelle dans le dialogue professionnel.",
    ],
    auteursCles: [
      {
        nom: "Lev Vygotski (1896-1934)",
        apport: "Pensée et Langage (1934) : médiation sémiotique, loi de double formation, ZPD et langage intérieur.",
      },
      {
        nom: "Jean Piaget (1896-1980)",
        apport: "Épistémologie génétique : stades de développement, schèmes d'action, assimilation/accommodation.",
      },
      {
        nom: "Bernard Golse",
        apport: "Approche néoconstructiviste et psychanalytique : les 4 fonctions précoces du langage chez l'infans.",
      },
      {
        nom: "Josiane Boutet & Jacques Girin",
        apport: "Réseau Langage et Travail (1986) : caractère situé et multimodal de la part langagière du travail.",
      },
    ],
    conceptsCles: [
      {
        terme: "Langage égocentrique",
        definitionCourte: "Monologue enfantin : simple reliquat d'immaturité pour Piaget, mais pivot vers le langage intérieur pour Vygotski.",
      },
      {
        terme: "Assimilation / Accommodation",
        definitionCourte: "Chez Piaget : intégrer le réel à ses schèmes existants (assimilation) vs modifier ses schèmes face à la résistance du réel (accommodation).",
      },
      {
        terme: "Loi de double formation",
        definitionCourte: "Principe vygotskien : toute fonction psychique supérieure naît dans l'interaction sociale avant d'être intériorisée.",
      },
      {
        terme: "Coopération conflictuelle",
        definitionCourte: "Dialogue clinique où les professionnels confrontent leurs manières de travailler sans attaque personnelle.",
      },
    ],
    piegeExamen:
      "Bannir absolument le mot « inné » pour qualifier Piaget : Piaget n'est ni innéiste ni empiriste, il est constructiviste (les structures de l'intelligence se construisent dans l'action physique sur les objets).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SYNTHÈSE GLOBALE UE & SÉANCE 1
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-global",
    unitId: "pst123",
    badge: "PST123 · L'Essentiel de l'UE",
    titre: "Les notions d'identité en sciences de l'homme",
    filConducteur:
      "L'identité professionnelle n'est jamais une étiquette figée : elle est le produit dynamique d'une double transaction (biographique et relationnelle) au cœur des rapports de socialisation et de reconnaissance.",
    ceQuIlFautSavoir: [
      "Le paradoxe identitaire (Raphaël Enthoven) pose que « l'identité est ce par quoi je suis unique tout en faisant comme tout le monde » : elle articule mêmeté (idem) et ipséité (ipse, Ricœur).",
      "Claude Dubar théorise l'identité comme la résultante à la fois stable et provisoire d'une double transaction : la transaction biographique (identité pour soi, dans le temps) et la transaction relationnelle (identité pour autrui, dans l'espace social).",
      "Renaud Sainsaulieu démontre que l'atelier et l'entreprise sont des lieux de socialisation secondaire produisant 4 logiques identitaires selon l'accès au pouvoir : Fusion, Négociation, Affinités et Retrait.",
      "Pierre Bourdieu, Erving Goffman, Howard Becker et Robert Castel éclairent les mécanismes d'incorporation (habitus), de mise en scène (stigmate, face), d'étiquetage déviant et de désaffiliation sociale.",
    ],
    ceQuIlFautRetenir: [
      "Matrice de Claude Dubar : Axe diachronique/temporel = Transaction biographique (Actes d'appartenance : qui je veux être) × Axe synchronique/relationnel = Transaction relationnelle (Actes d'attribution : qui l'institution dit que je suis).",
      "Les 4 modèles de Sainsaulieu : 1) Fusionnel (solidarité de masse, peu de pouvoir individuel), 2) Négociateur (métier qualifié, débat d'experts), 3) Affinitaire (mobilité/carrière, réseaux sélectifs), 4) Retrait (investissement hors travail, soumission instrumentale).",
      "Double vérité du travail (Bourdieu) : Vérité objective d'exploitation économique + Vérité subjective d'investissement de soi et de profit symbolique.",
      "Les 3 zones de cohésion sociale (Robert Castel) : Zone d'intégration → Zone de vulnérabilité → Zone de désaffiliation (double décrochage travail + réseau relationnel).",
    ],
    auteursCles: [
      {
        nom: "Claude Dubar",
        apport: "La socialisation : double transaction (biographique / relationnelle) et 4 formes identitaires.",
      },
      {
        nom: "Renaud Sainsaulieu",
        apport: "L'identité au travail (1977) : les 4 modèles culturels de relations de pouvoir en organisation.",
      },
      {
        nom: "Pierre Bourdieu",
        apport: "Habitus, champ, capitaux (économique, culturel, social, symbolique) et double vérité du travail.",
      },
      {
        nom: "Erving Goffman & Howard Becker",
        apport: "Interactionnisme symbolique : dramaturgie sociale, stigmate, institution totale (Goffman) et théorie de l'étiquetage / carrière déviante (Becker).",
      },
      {
        nom: "Robert Castel & Serge Paugam",
        apport: "Métamorphoses de la question sociale : effritement de la société salariale, vulnérabilité et désaffiliation.",
      },
    ],
    conceptsCles: [
      {
        terme: "Double transaction (Dubar)",
        definitionCourte: "Articulation entre transaction interne/biographique (pour soi) et transaction externe/relationnelle (pour autrui).",
      },
      {
        terme: "Actes d'attribution vs appartenance",
        definitionCourte: "Catégories imposées par les institutions (attribution) vs revendications identitaires du sujet (appartenance).",
      },
      {
        terme: "Habitus (Bourdieu)",
        definitionCourte: "Système de dispositions durables et transposables (« histoire incorporée ») générant les pratiques.",
      },
      {
        terme: "Stigmate (Goffman)",
        definitionCourte: "Attribut jetant un discrédit profond dans l'interaction entre normaux et stigmatisés (stigmate visible ou discréditable).",
      },
      {
        terme: "Désaffiliation (Castel)",
        definitionCourte: "Processus dynamique de rupture conjointe du lien salarial et des supports relationnels de proximité.",
      },
    ],
    piegeExamen:
      "En PST123 (Mme Lucy), ne jamais confondre l'axe biographique (pour soi / actes d'appartenance / continuité-rupture) avec l'axe relationnel (pour autrui / actes d'attribution / reconnaissance-non-reconnaissance) chez Claude Dubar.",
  },
  {
    id: "pst123-s1",
    unitId: "pst123",
    seanceId: "pst123-s1",
    coursNum: 1,
    badge: "PST123 · Cours 1 (É. Lucy)",
    titre: "Cadrage Pédagogique — Les 12 Auteurs & Matrices de l'Identité",
    filConducteur:
      "Du paradoxe philosophique d'Enthoven aux grilles sociologiques de Dubar, Bourdieu et Sainsaulieu : comment la société s'incorpore dans l'individu et comment l'individu négocie son identité.",
    ceQuIlFautSavoir: [
      "Le programme officiel de Mme Élisabeth Lucy mobilise 12 auteurs fondamentaux : Piaget, Durkheim, Parsons, Kardiner, Weber, Becker, Merton, Rosenthal, Jakobson, Goffman, Bourdieu et Dubar.",
      "La socialisation primaire (enfance, famille — Durkheim, Kardiner) construit la personnalité de base, mais la socialisation secondaire (école, travail — Dubar, Sainsaulieu) permet des remaniements et des conversions identitaires.",
      "Les prophéties autoréalisatrices (Merton) et l'effet Pygmalion (Rosenthal & Jacobson) montrent comment le regard et l'étiquetage d'autrui (Becker) fabriquent concrètement la trajectoire du sujet.",
      "La division Anomie (Durkheim : défaut de règles) vs Anomie (Merton : disjonction entre buts culturels de réussite et moyens légitimes d'y accéder) explique les conduites d'adaptation sociale.",
    ],
    ceQuIlFautRetenir: [
      "Accroche de dissertation (Enthoven) : « C'est moi, mais je fais comme tout le monde » — l'identité est une tension dialectique entre singularité et conformité sociale.",
      "Typologie de Merton (5 modes d'adaptation) : Conformisme, Innovation, Ritualisme, Évasion, Rébellion.",
      "Effet Pygmalion (Rosenthal & Jacobson) : Les attentes positives ou négatives de l'institution transforment les performances réelles des sujets (acte d'attribution puissant).",
      "Grille d'analyse clinique Option B : Face à un cas d'entreprise, identifier systématiquement 1) l'identité héritée/visée (biographique), 2) le jugement de l'organisation (relationnel) et 3) le modèle de Sainsaulieu mobilisé.",
    ],
    auteursCles: [
      {
        nom: "Émile Durkheim & Talcott Parsons",
        apport: "Holisme et fonctionnalisme : fait social, solidarité mécanique/organique et intériorisation des normes/rôles.",
      },
      {
        nom: "Robert K. Merton & Robert Rosenthal",
        apport: "Anomie structurelle, prophétie autoréalisatrice et effet Pygmalion en milieu scolaire et professionnel.",
      },
      {
        nom: "Erving Goffman & Howard Becker",
        apport: "Mise en scène de la vie quotidienne, préservation de la face et carrière déviante par étiquetage.",
      },
      {
        nom: "Claude Dubar & Pierre Bourdieu",
        apport: "Grille de la double transaction identitaire et sociologie de l'habitus et de la violence symbolique.",
      },
    ],
    conceptsCles: [
      {
        terme: "Socialisation primaire / secondaire",
        definitionCourte: "Incorporation initiale des repères dans l'enfance (primaire) vs apprentissage de mondes spécialisés adultes (secondaire).",
      },
      {
        terme: "Prophétie autoréalisatrice",
        definitionCourte: "Définition fausse d'une situation évoquant un comportement nouveau qui rend vraie la conception initialement fausse (Merton).",
      },
      {
        terme: "Personnalité de base (Kardiner)",
        definitionCourte: "Configuration psychologique commune aux membres d'une même culture, forgée par les institutions primaires.",
      },
      {
        terme: "Double vérité du travail",
        definitionCourte: "Coexistence chez Bourdieu de la contrainte d'exploitation objective et de l'investissement subjectif dans le jeu (illusio).",
      },
    ],
    piegeExamen:
      "Pour obtenir 16+/20 avec Mme Lucy, bannir tout vocabulaire psychologique vague (« il se sent mal », « il manque de confiance ») et le traduire en concepts sociologiques stricts (« dissonance entre acte d'attribution et d'appartenance », « modèle du retrait », « violence symbolique »).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST120 — SYNTHÈSE GLOBALE UE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst120-global",
    unitId: "pst120",
    badge: "PST120 · L'Essentiel de l'UE",
    titre: "Statistiques et méthodologie en psychologie du travail",
    filConducteur:
      "Choisir et interpréter avec rigueur le test statistique adapté à la nature des variables (nominales, ordinales, numériques) et à la structure du plan expérimental.",
    ceQuIlFautSavoir: [
      "Toute démarche empirique repose sur l'opérationnalisation d'une hypothèse théorique en hypothèse opérationnelle mettant en relation une Variable Indépendante (VI, manipulée/explicative) et une Variable Dépendante (VD, mesurée).",
      "Le choix d'un test dépend d'un arbre de décision à 3 critères : 1) Échelle de mesure de la VD (qualitative nominale, ordinale ou quantitative d'intervalle/rapport), 2) Nombre de groupes ou conditions (2 vs k), 3) Plan d'observation (groupes indépendants vs mesures répétées/appariées).",
      "La p-valeur (p-value) mesure la probabilité d'observer un résultat aussi extrême sous l'hypothèse nulle H0 : si p < α (seuil de 0,05), on rejette H0 au profit de H1.",
      "Un résultat statistiquement significatif (p < 0,05) ne prouve pas une importance clinique forte : il faut toujours calculer la taille d'effet (d de Cohen, η², V de Cramer) et vérifier la fidélité des échelles (Alpha de Cronbach).",
    ],
    ceQuIlFautRetenir: [
      "Arbre de décision express : 2 variables qualitatives → Khi-deux d'indépendance ($\chi^2$) ; 2 moyennes (groupes indépendants) → t de Student (ou Mann-Whitney si non-paramétrique) ; 3+ moyennes → ANOVA de Fisher ($F$) (ou Kruskal-Wallis).",
      "Règle d'or de décision : Si $p < 0,05$, rejet de $H_0$ (différence ou lien significatif). Attention : ne jamais dire « on accepte $H_0$ », mais « on ne peut pas rejeter $H_0$ ».",
      "Les 2 risques d'erreur : Risque $\alpha$ (1ère espèce : faux positif, rejeter $H_0$ alors qu'elle est vraie) vs Risque $\beta$ (2ème espèce : faux négatif, conserver $H_0$ alors que $H_1$ est vraie). Puissance = $1 - \beta$.",
      "Psychométrie : Validité (le test mesure-t-il bien ce qu'il prétend mesurer ?) ≠ Fidélité / Consistance interne (Alpha de Cronbach $\ge 0,70$).",
    ],
    auteursCles: [
      {
        nom: "Karl Pearson & Charles Spearman",
        apport: "Test du Khi-deux ($\chi^2$), corrélation linéaire paramétrique ($r$ de Bravais-Pearson) et corrélation de rangs ($\rho$ de Spearman).",
      },
      {
        nom: "William Gosset (Student) & Ronald Fisher",
        apport: "Test $t$ de comparaison de 2 moyennes et Analyse de la Variance (ANOVA, test $F$ de Fisher).",
      },
      {
        nom: "Lee Cronbach & Jacob Cohen",
        apport: "Consistance interne des questionnaires ($\alpha$ de Cronbach) et indices de taille d'effet ($d$ de Cohen, puissance statistique).",
      },
      {
        nom: "Stanley Stevens (1946)",
        apport: "Typologie des 4 échelles de mesure : Nominale, Ordinale, d'Intervalle et de Rapport (Ratio).",
      },
    ],
    conceptsCles: [
      {
        terme: "VI vs VD",
        definitionCourte: "Variable Indépendante (facteur explicatif / groupe) vs Variable Dépendante (mesure observée sur les sujets).",
      },
      {
        terme: "Hypothèse nulle (H0)",
        definitionCourte: "Hypothèse postulant l'absence d'effet ou de différence dans la population mère ($\mu_1 = \mu_2$).",
      },
      {
        terme: "Conditions d'application (Paramétrique)",
        definitionCourte: "Normalité de la distribution (Shapiro-Wilk) et homogénéité des variances (test de Levene).",
      },
      {
        terme: "Alpha de Cronbach",
        definitionCourte: "Indice de cohérence interne des items mesurant une même dimension latente (satisfaisant dès 0,70).",
      },
    ],
    piegeExamen:
      "Deux pièges classiques : 1) Confondre corrélation ($r$ significatif) et causalité ; 2) Utiliser un test pour échantillons indépendants alors qu'il s'agit d'un suivi longitudinal avant/après sur les mêmes salariés (échantillons appariés).",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST124 — SYNTHÈSE GLOBALE UE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst124-global",
    unitId: "pst124",
    badge: "PST124 · L'Essentiel de l'UE",
    titre: "Transformations digitales des activités et clinique des usages",
    filConducteur:
      "Analyser comment les technologies numériques, l'algorithmique et l'IA transforment le travail réel : entre risque d'intensification technocentrée et opportunité de développement du pouvoir d'agir (conception anthropocentrée).",
    ceQuIlFautSavoir: [
      "Un outil numérique n'est jamais neutre : selon la théorie de la genèse instrumentale (Pierre Rabardel, 1995), un artefact technique ne devient un « instrument » qu'après un double processus d'appropriation par le sujet.",
      "La clinique des usages (Marc-Éric Bobillier-Chaumon) montre que les technologies contemporaines peuvent soit assister l'activité (capacitantes), soit l'empêcher en rigidifiant les procédures et en invisibilisant le travail réel.",
      "Les exigences d'utilisabilité (Nielsen) et d'ergonomie IHM (8 critères de Bastien & Scapin) doivent être articulées avec l'utilité clinique et le sens du métier.",
      "Le management algorithmique et l'IA générative déplacent les frontières de la prescription cognitive et interrogent l'autonomie décisionnelle et l'identité professionnelle.",
    ],
    ceQuIlFautRetenir: [
      "Équation de Pierre Rabardel (1995) : Instrument = Artefact matériel/logiciel + Schèmes d'utilisation du sujet.",
      "Double processus de la Genèse Instrumentale : 1) Instrumentalisation (orientée vers l'artefact : l'usager détourne/personnalise l'outil, catachrèse) × 2) Instrumentation (orientée vers le sujet : l'outil transforme les schèmes cognitifs de l'opérateur).",
      "Approche Technocentrée vs Anthropocentrée : La conception technocentrée impose à l'humain de s'adapter aux restes du système ; la conception anthropocentrée (capacitante) place l'activité réelle et les marges de manœuvre au cœur du design.",
      "Critères ergonomiques IHM (Bastien & Scapin, 1993) : Guidage, Charge de travail, Contrôle explicite, Adaptabilité, Gestion des erreurs, Homogénéité, Signifiance des codes, Compatibilité.",
    ],
    auteursCles: [
      {
        nom: "Pierre Rabardel (1995)",
        apport: "Les hommes et les technologies : approche instrumentale, artefact vs instrument, genèse instrumentale et catachrèses.",
      },
      {
        nom: "Marc-Éric Bobillier-Chaumon",
        apport: "Titulaire de la chaire du Cnam : clinique des usages, technologies émergentes, IA et environnements capacitants.",
      },
      {
        nom: "J.M.C. Bastien & D.L. Scapin (1993)",
        apport: "Les 8 critères ergonomiques d'évaluation des interfaces homme-machine (IHM).",
      },
      {
        nom: "Fred Davis (TAM) & V. Venkatesh (UTAUT)",
        apport: "Modèles d'acceptation technologique : utilité perçue, facilité d'utilisation perçue et influence sociale.",
      },
    ],
    conceptsCles: [
      {
        terme: "Genèse instrumentale",
        definitionCourte: "Processus par lequel l'opérateur transforme un simple artefact en véritable instrument de son activité (instrumentation + instrumentalisation).",
      },
      {
        terme: "Catachrèse",
        definitionCourte: "Détournement créatif d'un outil par l'opérateur pour l'adapter aux besoins réels de la situation de travail.",
      },
      {
        terme: "Environnement capacitant (Falzon)",
        definitionCourte: "Milieu technico-organisationnel permettant aux opérateurs d'élargir leurs savoir-faire et de préserver leur santé.",
      },
      {
        terme: "Technostress & Surcharge informationnelle",
        definitionCourte: "Fatigue cognitive liée à l'hyper-connectivité, aux interruptions numériques et à l'opacité algorithmique.",
      },
    ],
    piegeExamen:
      "Ne jamais inverser Instrumentation et Instrumentalisation chez Rabardel : l'Instrumentation est dirigée vers le SUJET (qui adapte ses schèmes), tandis que l'Instrumentalisation est dirigée vers l'ARTEFACT (qu'on personnalise ou détourne).",
  },
];

export function getEssentielByUnit(unitId: PlanningUnitId): EssentielCoursCard[] {
  return ESSENTIEL_COURS_DATA.filter((item) => item.unitId === unitId);
}

export function getEssentielBySeanceId(seanceId: string): EssentielCoursCard | undefined {
  return ESSENTIEL_COURS_DATA.find((item) => item.seanceId === seanceId);
}
