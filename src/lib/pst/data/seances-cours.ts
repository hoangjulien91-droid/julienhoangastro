/**
 * Journal des Séances & Cours Retranscrits (PST106, PST108, PST123)
 * Intégration dans le code des cours réels enregistrés et retranscrits
 * (Webconférences, synthèses de cours, transcriptions intégrales verbatim, consignes orales des professeurs).
 */

export interface SeancePointCle {
  titre: string;
  contenu: string;
  auteurs?: string[];
  conceptsCles?: string[];
}

export interface SeanceSectionSynthese {
  numero: string;
  titre: string;
  points: SeancePointCle[];
}

export interface SeanceTableauComparatif {
  titre: string;
  description?: string;
  colonnes: string[];
  lignes: {
    axe: string;
    valeurs: string[];
  }[];
}

export interface SeanceRectificationExamen {
  titre: string;
  erreurCourante: string;
  rectificationAttendue: string;
  contexte: string;
}

export interface SeanceConsigneProf {
  titre: string;
  typeTravail: "recherche" | "lecture" | "exercice_ad" | "memoire";
  consigneExacte: string;
  echeance: string;
  modaliteRendu: string;
  recommandationsProf: string;
  lienAdId?: string;
}

export interface SeanceModalitesExamen {
  session1Date: string;
  session2Date: string;
  duree: string;
  format: string;
  optionsAuChoix: string[];
  recommandationsNotation: string;
}

export interface SeanceCoursItem {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  moduleLabel: string;
  numeroSeance: number;
  titre: string;
  sousTitre: string;
  enseignant: string;
  dateSeance: string;
  format: "webconference" | "presentiel";
  dureeEnregistrement?: string;
  resumeExecutif: string[];
  modalitesExamen?: SeanceModalitesExamen;
  consignesOralesProf: SeanceConsigneProf[];
  syntheseSections: SeanceSectionSynthese[];
  tableauxComparatifs?: SeanceTableauComparatif[];
  rectificationsExamen?: SeanceRectificationExamen[];
  transcriptionIntegraleVerbatim: string;
  bibliographieCitee: {
    titre: string;
    auteur: string;
    annee?: string;
    remarque: string;
  }[];
}

export const SEANCES_COURS_DATA: SeanceCoursItem[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // PST106 — COURS 1 : CLINIQUE DE L'ACTIVITÉ ET PSYCHOLOGIE DU TRAVAIL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s1",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 1,
    titre: "Séance 1 — Cadre de la Discipline, Histoire & Conceptions du Travail",
    sousTitre: "De la psychologie du travail traditionnelle à la clinique de l'activité (Yves Clot)",
    enseignant: "Pr. Christine LAGABRIELLE (Professeure émérite UT2J, Le Travail Humain, AIPTLF)",
    dateSeance: "15 octobre 2026",
    format: "webconference",
    dureeEnregistrement: "3 h 12 min 55 s",
    resumeExecutif: [
      "Positionnement épistémologique : La psychologie du travail est un ensemble vaste (ergonomie, sélection RH, orientation, cognition). La clinique du travail est une sous-discipline francophone spécifique axée sur la santé et la subjectivité au travail.",
      "Deux branches de la clinique du travail : La Psychodynamique du travail (Christophe Dejours - souffrance, plaisir, défenses) vs La Clinique de l'activité (Yves Clot - pouvoir d'agir, genre professionnel, style personnel, transformation de l'activité).",
      "Évolution historique du concept de travail : Du 'tripalium' latin (instrument de torture) et de la servitude antique (Hannah Arendt) à l'activité humaine forcée (Henri Wallon) et au lieu central de construction identitaire (Dejours).",
      "Fonctions latentes du travail (Marie Jahoda, Marienthal 1937) : Le travail ne procure pas qu'un revenu ; il structure le temps, organise la pensée, procure des interactions sociales et nourrit l'estime de soi.",
      "Dimensions culturelles du travail (Geert Hofstede) : Individualisme vs Collectivisme, Distance hiérarchique, Contrôle de l'incertitude, Masculinité vs Féminité.",
      "Consigne orale officielle de Mme Lagabrielle : Effectuer une recherche personnelle active sur la conception du travail chez Jean-Jacques Rousseau, Sigmund Freud, Friedrich Nietzsche, Max Weber et Emmanuel Kant pour préparer la séance suivante.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — 2 questions au choix",
      optionsAuChoix: [
        "Option 1 : Dissertation théorique rédigée (répondre à une problématique centrale en argumentant et en mobilisant concepts scientifiques et auteurs de référence).",
        "Option 2 : Analyse de situation de travail avec un texte support (recontextualiser et analyser cliniquement la situation décrite).",
      ],
      recommandationsNotation:
        "Mme Lagabrielle insiste : 'Nos outils de psychologue sont les concepts, pas des opinions ni du bon sens !' Elle sanctionne le verbiage non scientifique et valorise la rigueur des citations d'auteurs et la maîtrise de l'histoire du Cnam.",
    },
    consignesOralesProf: [
      {
        titre: "Recherche sur la signification philosophique du travail (Rousseau, Nietzsche, Freud, Kant, Weber)",
        typeTravail: "recherche",
        consigneExacte:
          "Prendre des notes personnelles synthétiques sur la façon dont les philosophes et théoriciens définissent le travail : que dit Rousseau ? Que dit Nietzsche ? Que dit Freud ? Que dit Weber ? Que dit Kant ? (Travail marqué entre crochets dans le diaporama officiel).",
        echeance: "Avant la séance 2 (21 octobre)",
        modaliteRendu: "Travail personnel préparatoire indispensable pour le cours et l'AD 1.",
        recommandationsProf:
          "Ne faites pas faire le travail par ChatGPT ! Citez précisément les œuvres d'origine (ex: Freud 'Malaise dans la civilisation', Weber 'L'Éthique protestante').",
        lienAdId: "pst106-ad1-taylorisme",
      },
      {
        titre: "Préparation de l'Exercice des Maçons (Frank Gilbreth & Taylor) pour le corrigé du 28 octobre",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Analyser l'aménagement rationnel du poste de travail des maçons (élimination des 18 gestes, échafaudage mobile, packet system). Première heure du 28 octobre dédiée au corrigé collectif.",
        echeance: "28 octobre (webconférence de régulation)",
        modaliteRendu: "Dépôt facultatif sur le forum Moodle + participation active au débriefing.",
        recommandationsProf: "Maîtriser la distinction entre division horizontale et division verticale.",
        lienAdId: "pst106-ad1-taylorisme",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadre d'Apprentissage, Modalités Pédagogiques & Calendrier des Examens",
        points: [
          {
            titre: "Alliance de travail et exigences universitaires",
            contenu:
              "Pr. Lagabrielle rappelle son parcours (ancienne présidente de commission ministérielle VAE, directrice de la revue Le Travail Humain, professeure émérite UT2J). Elle souligne que la formation au Titre RNCP 7 exige une posture scientifique rigoureuse : 'Le maçon a sa truelle, l'informaticien son ordinateur ; nous, psychologues, nos outils sont les concepts scientifiques issus de la recherche'.",
          },
          {
            titre: "Structure du semestre (10 webconférences, 6 AD, 3 samedis en présentiel)",
            contenu:
              "Cours le mercredi soir (18h) pour éviter le chevauchement avec PST123 (mardi). Les samedis en présentiel se font l'après-midi à Bordeaux car Francis Valls (PST108) occupe la matinée. Deux groupes sont constitués (groupe Bordeaux avec Pr. Lagabrielle et groupe Sud/Dax avec Dr. Prisca Lutumba).",
          },
          {
            titre: "Modalités d'évaluation (11 février 2027 & 13 avril 2027)",
            contenu:
              "Épreuve sur table de 2h00 sans documents. Choix entre une dissertation théorique pure et une étude de cas avec texte support. L'argumentation doit impérativement s'appuyer sur les concepts de la clinique du travail et la littérature académique.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Définitions, Complexité et Racines Étymologiques du Travail",
        points: [
          {
            titre: "Le travail : entre torture et accomplissement de soi",
            contenu:
              "Étymologiquement, 'travail' dérive du latin populaire tripalium, un instrument d'immobilisation et de torture à trois pieux. Le terme conserve une connotation de souffrance (la femme 'en travail' qui accouche dans la douleur, un mur qui 'travaille' et se fissure). Le dictionnaire Littré recense 24 acceptions distinctes du mot travail.",
          },
          {
            titre: "La tripartition d'Hannah Arendt (Condition de l'homme moderne, 1958)",
            contenu:
              "Arendt distingue trois dimensions de la vie active : 1. Le Travail (Labor) : activité servile asservie à la survie biologique de l'animal humain ; 2. L'Œuvre (Work) : création d'un monde d'objets artificiels durables qui transcendent la nature (l'artisan, les cathédrales) ; 3. L'Action (Action) : engagement politique, parole et débat dans l'espace public entre citoyens égaux.",
            auteurs: ["Hannah Arendt (1958)"],
          },
          {
            titre: "Henri Wallon et l'activité forcée",
            contenu:
              "Pour Henri Wallon, le travail est une activité forcée dont l'objet reste étranger aux besoins immédiats et qui ne s'accorde pas spontanément avec le jeu libre des fonctions physiques et mentales.",
            auteurs: ["Henri Wallon"],
          },
          {
            titre: "Christophe Dejours et l'espace de signification",
            contenu:
              "Le travail est un opérateur central de santé mentale : c'est un espace de signification entre le sujet et le champ social où se conjuguent l'être et le faire, permettant la reconnaissance par autrui.",
            auteurs: ["Christophe Dejours"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Les Fonctions Psychosociales du Travail (Jahoda, Fox, Hofstede)",
        points: [
          {
            titre: "L'enquête princeps de Marienthal (Marie Jahoda, Paul Lazarsfeld, 1937)",
            contenu:
              "L'étude clinique des chômeurs autrichiens de Marienthal révèle les fonctions latentes du travail : outre la perte de revenus, le chômage entraîne une désagrégation de la structuration temporelle, un effondrement de l'organisation de la pensée, un isolement relationnel et une perte dramatique d'estime de soi.",
            auteurs: ["Marie Jahoda (1937)"],
          },
          {
            titre: "Les 4 dimensions culturelles de Geert Hofstede",
            contenu:
              "Enquête mondiale chez IBM (1980) : 1. Individualisme vs Collectivisme (la France est très individualiste) ; 2. Distance hiérarchique (forte en France) ; 3. Contrôle de l'incertitude (besoin de règles et de sécurité statutaire fort en France) ; 4. Masculinité vs Féminité (la France se situe vers une séparation plus souple des rôles de genre).",
            auteurs: ["Geert Hofstede (1980)"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Cartographie Disciplinaire : Psychologie du Travail vs Clinique de l'Activité",
        points: [
          {
            titre: "La Psychologie du travail traditionnelle (gestionnaire / industrielle)",
            contenu:
              "Centrée sur les instruments de sélection, le recrutement, l'évaluation des compétences, l'adéquation homme-poste et l'adaptation à la demande managériale.",
          },
          {
            titre: "La Clinique du travail : émergence francophone centrée sur la subjectivité",
            contenu:
              "La clinique du travail pose que le travail n'est pas un domaine périphérique d'application de la psychologie, mais un opérateur fondamental du psychisme humain. Elle étudie la tension conflictuelle entre prescription managériale et subjectivité ouvrière.",
          },
          {
            titre: "Clinique de l'activité (Clot) vs Psychodynamique du travail (Dejours)",
            contenu:
              "Tandis que Dejours explore la souffrance, les idéologies défensives et le jugement de beauté/utilité, Yves Clot et le CRTD s'ancrent dans la psychologie historico-culturelle de Vygotski pour analyser le réel de l'activité, les controverses de métier et la reconquête du pouvoir d'agir.",
            auteurs: ["Yves Clot", "Lev Vygotski", "Christophe Dejours"],
          },
        ],
      },
    ],
    bibliographieCitee: [
      {
        titre: "Psychologie du travail et des organisations (Manuel visuel)",
        auteur: "Émilie Veil & Valentina Dolce",
        annee: "2024",
        remarque: "Recommandé par Mme Lagabrielle chez De Boeck pour ses tableaux synthétiques de niveau Licence/Master.",
      },
      {
        titre: "Le travail à cœur. Pour en finir avec les risques psychosociaux",
        auteur: "Yves Clot",
        annee: "2010",
        remarque: "Livre d'accès prioritaire conseillé par Mme Lagabrielle pour aborder la clinique de l'activité avant La fonction psychologique du travail.",
      },
      {
        titre: "Travail et pouvoir d'agir",
        auteur: "Yves Clot",
        annee: "2008",
        remarque: "Exposé complet des concepts de genre, style, activité empêchée et développement.",
      },
      {
        titre: "Les chômeurs de Marienthal",
        auteur: "Marie Jahoda, Paul Lazarsfeld & Hans Zeisel",
        annee: "1937",
        remarque: "Monographie sociologique de référence sur les fonctions latentes du travail.",
      },
    ],
    transcriptionIntegraleVerbatim: `Transcription intégrale du cours 1 — PST106 (Pr. Christine Lagabrielle)
Durée : 3 h 12 min 55 s · Enregistrement officiel Cnam Aquitaine

[00:00:00] PR. LAGABRIELLE : Voilà, la réunion est maintenant enregistrée. Alors, j'ai plusieurs heures devant moi. Moi, sur mon ordinateur, j'ai 17h54, donc je ne sais pas trop quelle heure il est finalement. Vous êtes maintenant 21. Alors, j'ai découvert que quand je voulais que vous ayez quand même une image d'un interlocuteur, en l'occurrence une interlocutrice, le diaporama devenait un peu petit. Est-ce que malgré ça, vous voyez correctement et est-ce que vous avez la possibilité de l'agrandir ? Oui, ça va ? Très bien. De toute façon, je vais relire un certain nombre de choses qui sont écrites.

Est-ce qu'il y a des noms que je reconnais ? Est-ce qu'on a déjà eu le plaisir et la nécessité de travailler ensemble l'année dernière, notamment en PST002 ? Oui, voilà. C'est en voyant votre nom, Olivier, que j'ai posé cette question. Mounia aussi, il me semble. Marie-Céline, bien sûr, je me souviens, Aurore, également, Cécile, non, je n'ai pas l'impression, Karine, Léa, Jennifer, Charles, Maton, bien sûr, etc.

On se retrouve pour cette unité PST106, Clinique de l'activité et psychologie du travail, en sachant que d'habitude c'était Prisca Lutumba qui s'en occupait. Ça faisait plusieurs années qu'elle le faisait, donc elle avait envie aussi de changer. C'est toujours stimulant de prendre des cours nouveaux. Donc on a switché : vous la retrouverez beaucoup plus en PST123.

Ce que je vous propose, c'est de me présenter succinctement. Je m'appelle Christine Lagabrielle. J'ai commencé par un DESS de psychologie clinique et pathologique, puis un troisième cycle en psychologie du travail, terminé par un doctorat et une HDR. J'ai travaillé comme psychologue du travail au Greta de Bordeaux, en libéral, en prison à l'orientation et à la réinsertion de détenus, et j'ai fait du recrutement. J'ai terminé ma carrière comme professeur à l'Université Toulouse-Jean Jaurès (UT2J). Je suis professeure émérite depuis deux ans.

Pendant des années à l'Université de Bordeaux, j'étais présidente de jury de validation des acquis professionnels (VAE/VAP). J'ai été directrice de l'UFR de psychologie à Bordeaux et administratrice du CIBC 33. Le CNAM, c'est une vieille histoire d'amour : engagement pour la promotion sociale depuis plus de 20 ans.

Dans les associations : j'ai été secrétaire générale de l'AIPTLF (Association Internationale de Psychologie du Travail de Langue Française), dont je suis trésorière aujourd'hui. Depuis 2020, je suis directrice associée de la revue Le Travail Humain pour la partie psychologie du travail. J'ai participé à la création de l'AFPTO dans les années 2000. J'ai été membre de la commission ministérielle chargée de vérifier l'équivalence des diplômes étrangers pour l'attribution du titre de psychologue (stage de 500 heures et mémoire professionnel obligatoires en France).

[Objectifs de PST106]
Revenons sur l'histoire de la psychologie du travail et analysons les rapports qu'il y a entre la psychologie du travail générale et la fameuse clinique de l'activité portée par Yves Clot. Yves Clot a toujours eu le souci de se situer dans la psychologie du travail et de dialoguer avec une psychologie du travail plus traditionnelle. Pour bien comprendre une science, il faut en connaître son histoire.

[Cadre d'apprentissage & Planning]
Vous avez 10 séances en webconférence, 6 séances d'activités distantes (AD), et 3 séances en présentiel en demi-groupe au CNAM Bordeaux.
Quand sur le diaporama, vous voyez des choses entre crochets [ ], cela veut dire quoi ? Cela veut dire : travail à faire !
Attention au planning : le 28 octobre, webconférence d'une heure pour corriger les exercices. Le 30 octobre, activité distante.
Deux sessions d'examen : première session le 11 février 2027, deuxième session le 13 avril 2027. Examen de deux heures, sans documents, avec deux questions au choix : soit une dissertation théorique argumentée, soit une question avec texte en support.
Mme Lagabrielle insiste : 'Non, ce n'est pas ChatGPT qui va devenir psychologue ! Nos outils sont les concepts scientifiques issus de la recherche'.

[Partie 1 : Qu'est-ce que le travail ?]
Hannah Arendt (Condition de l'homme moderne) : Dans l'Antiquité, le travail était une occupation servile réservée aux femmes et aux esclaves car travailler c'était s'asservir à la nécessité biologique. Travailler, c'était faire la preuve de son esprit servile. Arendt distingue le Travail (condition animale de survie), l'Œuvre (création d'un monde d'objets durables, les bâtisseurs de cathédrales) et l'Action (débat citoyen et politique dans la cité).
Henri Wallon : Le travail est une activité forcée, dont l'objet est étranger à nos besoins immédiats et qui s'oppose au jeu spontané de nos fonctions physiques et mentales.
Christophe Dejours : Le travail est un espace de signification entre le sujet et le champ social où se conjuguent l'être et le faire.

[Définition du travail]
Étymologie : tripalium (instrument de torture à trois pieux).
Le Littré recense 24 sens possibles au mot travail.
Pierre Gogelin distingue deux définitions : le travail réduit au comportement observable vs le travail comme modalités d'organisation invisibles de l'activité.
Lévy-Leboyer identifie trois critères constants : l'effort et la mobilisation d'énergie, l'orientation vers un but/objectif, et les contraintes (sociales, affectives, éthiques/morales).

[Les étapes de vie au travail & Carrières]
Super : 4 grands stades (exploration 15-24 ans, établissement 25-44 ans, maintien 45-64 ans, désengagement 65+). Aujourd'hui, les parcours sont marqués par des transitions, des crises et des carrières éclatées.

[Les dimensions culturelles de Geert Hofstede]
Enquête sur 40 pays :
1. Individualisme vs Collectivisme (la France est individualiste).
2. Distance hiérarchique (forte en France).
3. Contrôle de l'incertitude (fort en France : besoin de sécurité et de garanties).
4. Masculinité vs Féminité (la France penche vers une plus faible séparation des rôles sexués).

[Les fonctions du travail selon Marie Jahoda (Marienthal, 1937)]
Revenu, structuration du temps quotidien, organisation de la pensée, interactions sociales régulières, sentiment de contribution utile à la société, développement des habiletés, identité et estime de soi.

[Clinique de l'activité et pouvoir d'agir]
La clinique de l'activité n'est utile que si elle permet d'agir sur le travail et de le transformer. Le travail a une double fonction : une fonction psychologique (développement du sujet, réalisation de soi, style personnel) et une fonction sociale (collectif de travail, histoire sédimentée du métier, genre professionnel).

[Consigne donnée pour la prochaine fois]
Recherche personnelle à mener impérativement sur la notion de travail chez Rousseau, Nietzsche, Freud, Kant et Weber. Préparer l'exercice des maçons de Gilbreth pour le corrigé du 28 octobre.`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — COURS 1 : LANGAGE, COMMUNICATION, DIALOGUE ET CLINIQUE DU TRAVAIL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-s1",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 1,
    titre: "Séance 1 — Cadre Conceptuel : Langage, Communication, Dialogue et Travail",
    sousTitre: "Posture clinique au Cnam, néoconstructivisme (Golse) et confrontation Piaget vs Vygotski",
    enseignant: "Mme Véronique MAROT, M. Francis VALLS, M. Éric LUCY",
    dateSeance: "Semestre 1 (Cours inaugural)",
    format: "webconference",
    dureeEnregistrement: "Document d'étude et de révision exhaustif (Support complet)",
    resumeExecutif: [
      "Intrication langage et travail : Dès 1950, la psychologie démontre le caractère communicationnel croissant du travail. Formalisé en France en 1986 par le réseau Langage et Travail (Boutet, Fraenkel, Girin, Gardin).",
      "Définition des concepts fondamentaux : Langage (faculté humaine sémiotique), Langue (système conventionnel analysable à 5 niveaux), Communication (processus dynamique avec feedback), Dialogue (interaction clinique centrée sur la singularité).",
      "Posture clinique au Cnam : Principe 'Transformer pour comprendre' ; le dialogue comme opérateur de 'coopération conflictuelle' (Yves Clot, Le travail à cœur) pour dépasser les dilemmes du métier.",
      "Éclairage psychanalytique précoce (Bernard Golse) : Le langage préexiste à l'infans. 4 fonctions de la pensée : pare-excitation (Freud/Winnicott/Bion), réparation symbolique (Fort/Da d'Ernst), fonction narcissique, accès à la tiercéité.",
      "Le développement cognitif selon Jean Piaget : Structuralisme, assimilation, accommodation, équilibration. Le langage égocentrique est pour Piaget un reliquat d'asocialité voué à disparaître.",
      "La théorie historico-culturelle de Lev Vygotski (1896-1934) : Les fonctions psychiques supérieures sont médiatisées par la culture. Loi de double formation (interpsychologique -> intrapsychologique). Le langage égocentrique s'intériorise pour devenir langage intérieur.",
      "Matrice comparative majeure d'examen : Confrontation systématique Piaget vs Vygotski sur 5 axes conceptuels fondamentaux.",
    ],
    consignesOralesProf: [
      {
        titre: "Étude comparative approfondie : Jean Piaget vs Lev Vygotski",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Maîtriser la matrice comparative en 5 points entre l'interactionnisme physique piagétien et l'interactionnisme historico-culturel vygotskien. Être capable de restituer à l'écrit l'expérience des crayons de couleur et le devenir du langage égocentrique.",
        echeance: "Avant la séance 2",
        modaliteRendu: "Exercice d'ancrage fondamental pour l'évaluation écrite du Titre.",
        recommandationsProf:
          "Bannir l'expression 'capacité innée' pour Piaget (constructiviste strict) et ne pas assimiler l'inconscient en clinique de l'activité à une 'boîte noire' béhavioriste.",
        lienAdId: "pst108-ad2-marot-langage",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Introduction et Cadre Conceptuel : Langage, Langue, Communication, Dialogue et Travail",
        points: [
          {
            titre: "Évolution historique et dimension située",
            contenu:
              "Dès les années 1950, la psychologie du travail a mis en évidence le fait que le travail devenait de plus en plus communicationnel, en lien direct avec l'évolution des techniques et de l'organisation. Lorsqu'elles dysfonctionnent, les activités communicationnelles engendrent des pathologies : surcharge, perméabilité vie pro/perso, prescriptions rigides (centres d'appels). Le langage est multimodal (oral, écrit, gestuel, proxémique) et situé.",
          },
          {
            titre: "Les 5 niveaux d'analyse de la langue",
            contenu:
              "1. Phonétique / Phonologie (organisation des sons) ; 2. Morphologie (unités de sens ou morphèmes) ; 3. Syntaxe (règles d'assemblage en phrases) ; 4. Sémantique (sens des mots et textes) ; 5. Pragmatique (usage de la langue en contexte socio-spécifique).",
          },
          {
            titre: "Dialogue et Clinique du travail",
            contenu:
              "Le dialogue est une interaction dynamique visant l'échange d'idées et d'expériences. En clinique du travail, l'approche se distingue des méthodes théoriques ou expérimentales positivistes en mettant l'accent sur la singularité du sujet et la relation interpersonnelle.",
          },
        ],
      },
      {
        numero: "2",
        titre: "La Posture Clinique et les 3 Courants de la Psychologie du Travail au Cnam",
        points: [
          {
            titre: "Principe fondateur : « Transformer pour comprendre »",
            contenu:
              "Le psychologue du travail au Cnam n'intervient pas avec des grilles de diagnostic positivistes préétablies. Il déploie un dispositif qui transforme la situation de travail, et c'est à travers cette transformation dialogique que survient la compréhension de l'activité réelle.",
          },
          {
            titre: "Dispositifs dialogiques et « coopération conflictuelle »",
            contenu:
              "Dans Le travail à cœur, Yves Clot montre que le dialogue (avec soi-même, avec les pairs et avec le métier) permet d'instituer une coopération conflictuelle indispensable pour dépasser les conflits du travail et régénérer le genre professionnel.",
            auteurs: ["Yves Clot"],
          },
          {
            titre: "Les 3 courants majeurs au Cnam",
            contenu:
              "1. La Clinique de l'activité (Yves Clot) : centrée sur l'analyse de l'activité, l'opérateur et le milieu ; 2. La Psychodynamique du travail (Christophe Dejours) : axée sur l'analyse de la souffrance, du plaisir et des stratégies défensives ; 3. La Psychosociologie clinique du travail : articulant l'analyse de l'activité et le sujet sensible au sens psychanalytique.",
            auteurs: ["Yves Clot", "Christophe Dejours"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Éclairage Psychanalytique et Développement Précoce (Bernard Golse)",
        points: [
          {
            titre: "Préexistence du symbolique et néoconstructivisme",
            contenu:
              "Le langage et la pensée précèdent l'enfant : le nouveau-né naît dans un bain de langage et de significations déjà institué par les adultes. Selon le modèle néoconstructiviste, l'enfant co-construit ses structures psychiques dans l'interaction : l'intrapsychique de l'adulte organise l'interpersonnel, qui structure l'intrapsychique du bébé.",
            auteurs: ["Bernard Golse"],
          },
          {
            titre: "Les 4 fonctions de la pensée selon Bernard Golse",
            contenu:
              "1. Fonction de pare-excitation : contenance psychique (holding de Winnicott, prêt d'un 'appareil à penser' de Bion) face au débordement pulsionnel ; 2. Fonction de réparation symbolique : symbolisation de l'absence (jeu de la bobine Fort/Da de Freud) ; 3. Fonction narcissique : sentiment de continuité d'existence ; 4. Accès à la tiercéité : passage de l'enveloppe monadique (mère-bébé) à l'enveloppe triadique (père tiers séparateur).",
            auteurs: ["Sigmund Freud", "Donald W. Winnicott", "Wilfred R. Bion", "Bernard Golse"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Le Développement Cognitif selon Jean Piaget",
        points: [
          {
            titre: "Structuralisme et pensée scientifique",
            contenu:
              "Pour Piaget, l'intelligence se développe par stades successifs passant des coordinations sensori-motrices à la pensée formelle hypothético-déductive. La pensée gouverne le langage : le langage n'est que le reflet de la pensée.",
            auteurs: ["Jean Piaget"],
          },
          {
            titre: "Assimilation, accommodation, équilibration",
            contenu:
              "L'assimilation intègre les données extérieures aux schèmes existants ; l'accommodation modifie les schèmes internes sous la contrainte du milieu ; l'équilibration autorégulatrice coordonne ces deux mouvements adaptatifs.",
          },
          {
            titre: "Le statut du langage égocentrique chez Piaget",
            contenu:
              "Pour Piaget, le langage égocentrique de l'enfant (parler pour soi sans se soucier d'être écouté) témoigne de son asocialité initiale et de son égocentrisme cognitif. Il est voué à s'étioler et à disparaître lors de la socialisation.",
          },
        ],
      },
      {
        numero: "5",
        titre: "La Théorie Historico-Culturelle de Lev Vygotski (1896-1934)",
        points: [
          {
            titre: "Médiation sociale et fonctions psychiques supérieures",
            contenu:
              "Vygotski étudie l'attention volontaire, la mémoire logique et la pensée verbale. Rejetant le béhaviorisme binaire stimulus-réponse, il montre que toute conduite humaine est médiatisée par des instruments psychologiques créés par la culture (langage, écriture, chiffres).",
            auteurs: ["Lev Vygotski"],
          },
          {
            titre: "Loi générale du développement culturel",
            contenu:
              "Toute fonction psychique apparaît deux fois dans le développement de l'enfant : d'abord au niveau social entre personnes (interpsychologique), puis au niveau individuel intériorisé (intrapsychologique). Le mouvement va toujours du dehors vers le dedans.",
          },
          {
            titre: "Le destin du langage égocentrique : l'expérience des crayons",
            contenu:
              "Placé devant une difficulté (ex. un crayon bleu manquant), l'enfant extériorise sa pensée à voix haute pour planifier son action ('Je vais prendre le rouge et mettre de l'eau'). Chez Vygotski, le langage égocentrique ne disparaît pas : il s'intériorise pour devenir le langage intérieur (la pensée silencieuse réflexive).",
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Synthèse Comparative Fondamentale : Jean Piaget vs Lev Vygotski",
        description: "Matrice d'or d'examen pour comparer l'approche constructiviste et l'approche historico-culturelle",
        colonnes: ["Axe d'analyse", "Jean Piaget", "Lev Vygotski"],
        lignes: [
          {
            axe: "Type d'interactionnisme",
            valeurs: [
              "Interaction sujet ↔ environnement physique matériel",
              "Interactionnisme social : sujet ↔ environnement humain et culturel médiatisé",
            ],
          },
          {
            axe: "Moteur du développement",
            valeurs: [
              "Processus endogène d'équilibration biologique (assimilation / accommodation)",
              "Appropriation des instruments psychologiques via la médiation sociale et le tuteur",
            ],
          },
          {
            axe: "Rapport Pensée / Langage",
            valeurs: [
              "La pensée précède et gouverne le langage. Le langage n'est que le reflet de la structure cognitive.",
              "Le langage est un instrument psychologique médiateur et l'opérateur de réalisation de la pensée.",
            ],
          },
          {
            axe: "Trajectoire du langage",
            valeurs: [
              "Langage égocentrique (asocial) → Langage socialisé",
              "Langage social (d'emblée relationnel) → Langage égocentrique → Langage intérieur",
            ],
          },
          {
            axe: "Statut du langage égocentrique",
            valeurs: [
              "Marque d'asocialité et d'immaturité cognitive, voué à disparaître avec la décentration.",
              "Outil cognitif actif de résolution de problème et de planification, qui s'intériorise en pensée silencieuse.",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Date de fondation du Réseau Langage et Travail",
        erreurCourante: "Dater la fondation de Langage et Travail en 1997.",
        rectificationAttendue:
          "Le réseau pluridisciplinaire Langage et Travail a été fondé en 1986 sous l'impulsion de Josiane Boutet, Béatrice Fraenkel, Jacques Girin et Bernard Gardin avec le soutien du CNRS (1997 correspond à une période éditoriale majeure).",
        contexte: "Section 1 — Histoire de l'analyse du langage au travail",
      },
      {
        titre: "Édition française de Pensée et Langage de Vygotski",
        erreurCourante: "Attribuer la première traduction de Vygotski à Yves Clot.",
        rectificationAttendue:
          "La première traduction intégrale est parue en 1985 aux Éditions Sociales, traduite par Françoise Sève avec présentation de Lucien Sève. Yves Clot a rédigé l'avant-propos majeur de la réédition de 1997 (La Dispute) et dirigé 'Avec Vygotski' en 1999.",
        contexte: "Section 5 — Bibliographie Vygotski",
      },
      {
        titre: "Attribution du concept d'appareil à penser",
        erreurCourante: "Attribuer l'appareil à penser indifféremment à Freud ou Winnicott.",
        rectificationAttendue:
          "Distinguer rigoureusement : le pare-excitation provient de Sigmund Freud (1920) ; le holding de Donald W. Winnicott ; le prêt d'un 'appareil à penser les pensées' (fonction alpha métabolisant les éléments bêta) est le concept princeps de Wilfred R. Bion (1962).",
        contexte: "Section 3 — Psychanalyse et Bernard Golse",
      },
      {
        titre: "Rejet de l'innéisme chez Jean Piaget",
        erreurCourante: "Écrire que Piaget postule une 'capacité innée' du langage.",
        rectificationAttendue:
          "Piaget s'oppose formellement à l'innéisme (débat historique Piaget-Chomsky à Royaumont en 1975). Citer les 4 facteurs : maturation nerveuse, exercice sur les objets, interactions sociales, équilibration autorégulatrice.",
        contexte: "Section 4 — Développement piagétien",
      },
      {
        titre: "Statut de l'inconscient en Clinique de l'activité",
        erreurCourante: "Dire que la clinique de l'activité traite l'inconscient comme une 'boîte noire'.",
        rectificationAttendue:
          "Le terme de 'boîte noire' appartient au béhaviorisme réducteur. Préciser plutôt que la clinique de l'activité ne prend pas l'inconscient psychanalytique pour objet direct, lui préférant l'analyse du conflit entre activité réalisée et réel de l'activité (le non-réalisé, l'empêché).",
        contexte: "Section 2 — Comparaison Clot vs Dejours",
      },
      {
        titre: "Étymologie exacte de 'Clinique'",
        erreurCourante: "Réduire la clinique à un entretien en face-à-face.",
        rectificationAttendue:
          "Du grec ancien klinikê (dérivé de klinê, le lit), puis latin clinicus (exercer la médecine au chevet du malade couché). En clinique du travail : approche au plus près de la singularité du sujet en situation réelle de travail.",
        contexte: "Section 2 — Posture clinique",
      },
    ],
    transcriptionIntegraleVerbatim: `PST 108 — RETRANSCRIPTION INTÉGRALE DU COURS 1
Langage, Communication, Dialogue, Développement Cognitif et Clinique du travail | Support complet de cours et compléments d'examen

1. Introduction et Cadre Conceptuel : Langage, Langue, Communication, Dialogue et Travail

A. Le contexte du travail et la dimension communicationnelle
• Évolution historique : C'est dès les années 1950 que la psychologie du travail a mis en évidence le fait que le travail devenait de plus en plus communicationnel, en lien direct avec l'évolution des techniques et des formes d'organisation de la production.
• Enjeux organisationnels et pathologies : Les activités communicationnelles conditionnent l'efficacité et le bon fonctionnement des organisations. Lorsqu'elles fonctionnent mal, elles engendrent des pathologies du travail : la surcharge communicationnelle, le déséquilibre entre vie privée et vie professionnelle lié aux technologies, ou encore les troubles induits par la prescription rigide de comportements communicationnels (comme dans les centres d'appels).
• Dimension multimodale et située : Le langage et la communication possèdent une dimension multimodale (oral, écrit, gestuel, utilisation de l'espace et des objets) et s'inscrivent dans une conception située (on ne communique pas de la même manière dans une start-up que dans une préfecture ou une administration centrale).
• Réseau Langage et Travail : L'intrication étroite entre langage et travail a été formalisée à partir de 1997 par le réseau français Langage et Travail, animé notamment par Josiane Boutet et Béatrice Fraenkel.

B. Définitions fondamentales
• Le Langage : Selon le dictionnaire CNRTL, le langage est une faculté propre à l'espèce humaine d'exprimer et de communiquer sa pensée par un système de signes. On distingue le langage articulé (vocalisations et sons articulés), le langage intérieur (formulation mentale silencieuse de la pensée) et le langage figuré ou codé (langages poétique, allégorique, langages de programmation, langages mathématiques). Au Cnam, l'adoption progressive d'un vocabulaire spécifique et d'un registre de langage adapté participe pleinement à la construction de la posture professionnelle du psychologue du travail.
• La Langue : Système d'expression verbale d'emploi conventionnel dans un groupe humain permettant la communication. Elle s'analyse selon 5 niveaux d'analyse :
  – Phonétique / Phonologie : étude des sons et des règles qui régissent leur organisation.
  – Morphologie : analyse des unités de sens (morphèmes) et de leur combinaison.
  – Syntaxe : étude des règles d'assemblage des mots en phrases grammaticalement correctes.
  – Sémantique : exploration du sens des mots, des phrases et des textes.
  – Pragmatique : analyse de l'usage de la langue dans des contextes socio-spécifiques.
• La Communication : Du latin communicatio (mise en commun), la communication est un processus d'échange d'informations, d'idées, d'émotions ou de messages entre individus via un canal. Le modèle de base (émetteur, message, canal, récepteur) s'enrichit de la rétroaction (feedback), qui transforme la relation linéaire en une interaction dynamique auto-nourrie.
• Le Dialogue et la Clinique du travail : Le dialogue est une interaction dynamique entre deux ou plusieurs personnes visant l'échange d'idées et d'expériences. En clinique du travail, l'approche se distingue des méthodes théoriques ou expérimentales positivistes en mettant l'accent sur la singularité du sujet et la relation interpersonnelle.

2. La Posture Clinique et les Courants en Psychologie du Travail au Cnam
• Principe fondateur « Transformer pour comprendre » : Le psychologue du travail au Cnam n'intervient pas avec des grilles de diagnostic positivistes préétablies. Il déploie un dispositif d'intervention qui transforme la situation de travail, et c'est à travers cette transformation dialogique que survient la compréhension de l'activité.
• Dispositifs dialogiques et coopération conflictuelle : Le travail s'analyse et se transforme par la mise en débat, la dispute professionnelle et le conflit de critères. Dans Le travail à cœur, Yves Clot montre que le dialogue (avec soi-même, avec les autres et avec le métier) permet d'instituer une « coopération conflictuelle » pour dépasser les conflits du travail.
• Les 3 courants de la psychologie du travail au Cnam :
  – La Clinique de l'activité (Yves Clot) : centrée sur l'analyse de l'activité, le rôle du professionnel/opérateur et le milieu de travail.
  – La Psychodynamique du travail (Christophe Dejours) : axée sur l'analyse de la souffrance, du plaisir et des stratégies de défense en santé mentale au travail.
  – La Psychosociologie clinique du travail : articulant l'analyse de l'activité avec la prise en compte du sujet sensible au sens psychanalytique.

3. Éclairage Psychanalytique et Développement Précoce (Bernard Golse)
• Préexistence du langage et néoconstructivisme : Le langage et la pensée précèdent l'enfant. Le nouveau-né arrive dans un univers symbolique (langue, structures de pensée) déjà structuré par les adultes. Selon le modèle néoconstructiviste, l'enfant ne se contente pas d'absorber passivement ces structures : il les co-construit dans l'interaction avec le psychisme parental. L'intrapsychique de l'adulte organise l'interpersonnel, qui structure à son tour l'intrapsychique du bébé.
• Les 4 fonctions de la pensée selon Bernard Golse :
  – Fonction de pare-excitation : Le bébé est submergé par des excitations internes/externes sans frontière entre le dedans et le dehors. Le parent offre une contenance psychique (holding chez Winnicott), prêtant un « appareil à penser » au bébé jusqu'à ce qu'il construise sa propre frontière psychique.
  – Fonction de réparation symbolique : La pensée permet de symboliser l'absence et de supporter la perte. Freud l'illustre par le jeu de la bobine (Fort / Da), où l'enfant simule la disparition et le retour d'un objet pour maîtriser l'absence maternelle.
  – Fonction narcissique : La pensée assure au sujet le sentiment de la continuité de son propre fonctionnement et de son existence.
  – Accès à la tiercéité : L'émergence du langage suppose la reconnaissance de l'autre comme autre. Le bébé passe de l'enveloppe monadique (fusion mère-enfant) à l'enveloppe triadique (introduction du père), permettant d'accéder à la tiercéité et à l'intersubjectivité.

4. Le Développement Cognitif selon Jean Piaget
• Structuralisme et intelligence scientifique : Pour Piaget, la pensée repose sur le structuralisme (inférence de structures sous-jacentes évolutives). L'intelligence se développe par stades, passant des coordinations sensori-motrices à une pensée logique, abstraite et déductive (la « pensée scientifique »).
• Assimilation, Accommodation et Équilibration :
  – Assimilation : action du sujet sur les objets et l'environnement.
  – Accommodation : modifications imposées en retour au sujet par les contraintes du milieu.
  – Équilibration : processus d'ajustement progressif des conduites entraînant la régulation continue de l'action et de la pensée.
• Les 4 critères du développement chez Piaget : La maturation biologique et neuropsychologique, l'expérience acquise par l'action sur les objets, les interactions sociales, et le processus d'équilibration autorégulatrice.
• Conception du langage chez Piaget : Chez Piaget, la pensée précède et gouverne le langage : le langage n'est que le reflet de la pensée. Le langage évolue du langage égocentrique (marque de l'asocialité initiale de l'enfant) vers le langage socialisé. Le langage égocentrique est voué à disparaître progressivement avec la décentration cognitive de l'enfant.

5. La Théorie Historico-Culturelle de Lev Vygotski
• Contexte biographique et fonctions psychiques supérieures : Lev Vygotski (1896-1934) cherche à refonder la psychologie à la lumière du marxisme. Son ouvrage majeur, Pensée et langage, étudie le développement des fonctions psychiques supérieures (attention volontaire, mémoire logique, pensée verbale).
• Ancrage historico-culturel et médiation sociale : Les fonctions psychiques supérieures sont le produit de l'histoire et de la culture de la société. Vygotski rejette la relation binaire directe sujet-environnement : la relation est médiatisée par le groupe social lors d'interactions asymétriques avec un adulte ou un pair plus compétent.
• Loi générale du développement culturel : Toute fonction apparaît deux fois dans le développement de l'enfant : d'abord au niveau social (interpsychologique), puis au niveau individuel (intrapsychologique). Le développement s'effectue systématiquement de l'extérieur vers l'intérieur.
• Les instruments psychologiques et le langage : Le langage, le calcul, l'écriture et les schémas sont des instruments psychologiques créés par la culture. Le langage est l'instrument privilégié car il sert de régulateur central de l'activité humaine.
• Développement du langage et langage égocentrique : Chez Vygotski, la trajectoire est : Langage social (d'emblée relationnel) → Langage égocentrique → Langage intérieur.
  – Expérience des crayons de couleur : Face à une difficulté (ex. un crayon manquant), l'enfant parle à haute voix pour orienter sa pensée et résoudre le problème (« Il me faut un crayon bleu... ça ne fait rien, je vais dessiner avec un rouge et mouiller avec de l'eau »).
  – Devenir : Le langage égocentrique n'est pas un commentaire asocial ni une étape vouée à disparaître : il s'intériorise pour devenir le langage intérieur (pensée silencieuse).

6. Synthèse Comparative : Jean Piaget vs Lev Vygotski
[Voir tableau comparatif ci-dessus]

7. Notes Critiques, Rectifications Factuelles et Précisions pour l'Examen
[Voir section rectifications factuelles ci-dessus]`,
    bibliographieCitee: [
      {
        titre: "Pensée et langage",
        auteur: "Lev Vygotski",
        annee: "1934 (tr. fr. 1985 / 1997)",
        remarque: "Ouvrage princeps de la psychologie historico-culturelle. Avant-propos d'Yves Clot.",
      },
      {
        titre: "Le travail à cœur",
        auteur: "Yves Clot",
        annee: "2010",
        remarque: "Théorie de la coopération conflictuelle et de la dispute professionnelle.",
      },
      {
        titre: "La naissance de la pensée chez l'enfant",
        auteur: "Bernard Golse",
        annee: "1999",
        remarque: "Développement précoce, néoconstructivisme et accès à la tiercéité.",
      },
      {
        titre: "La psychologie de l'intelligence",
        auteur: "Jean Piaget",
        annee: "1947",
        remarque: "Exposé des stades et des mécanismes d'assimilation / accommodation.",
      },
    ],
  },
];
