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
    url?: string;
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
  // PST106 — COURS 2 : DE LA MÉCANISATION INDUSTRIELLE À L'ANALYSE ERGONOMIQUE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s2",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 2,
    titre: "Séance 2 — De la Mécanisation Industrielle à l'Analyse Ergonomique de Terrain",
    sousTitre: "L'École classique (Taylor, Fayol, Ford, Weber), corrigé des 25 questions de l'AD Taylorisme, scripts contemporains, toyotisme, et la rupture épistémologique Lahy / Pacaud",
    enseignant: "Pr. Christine LAGABRIELLE (Professeure émérite UT2J, Le Travail Humain, AIPTLF)",
    dateSeance: "21 octobre 2026",
    format: "webconference",
    dureeEnregistrement: "3 h 31 min 36 s (parole effective : 3 h 11 min 35 s)",
    resumeExecutif: [
      "Conceptions philosophiques et sociologiques du travail : Restitution et analyse du tour de table sur Rousseau (arrachement à l'état de nature et corruption par la division des tâches), Nietzsche (le travail abrutissant érigé en 'meilleure des polices' sociétale), Marcuse (répression des pulsions et désérotisation du corps au service de l'appareil productif), Weber (l'ascétisme calviniste comme vocation et devoir divin séculier), Kant (contrainte civilisatrice disciplinant l'animalité et déployant les facultés de la raison), Marx (activité humaine consciente mutilée par l'aliénation capitaliste), Hegel (dialectique du maître et de l'esclave) et Freud (le travail comme ancrage indispensable dans le principe de réalité et sublimation des pulsions).",
      "L'École Classique et la parcellisation industrielle : Fayol et l'administration industrielle POC3 (Planifier, Organiser, Commander, Coordonner, Contrôler) scotomisant l'humain au profit de l'organigramme formel ; Taylor et l'OST (1911) à la Bethlehem Steel Company (division verticale concepteurs/exécutants, division horizontale parcellisée, 'The One Best Way', 'The Right Man at the Right Place', élimination de la 'flânerie systématique' ouvrière par le chronométrage, mépris du manutentionnaire Schmidt comparé à un bœuf) ; Ford et le travail à la chaîne (le convoyeur mécanique impose le rythme à l'ouvrier, production de masse de la Ford T à 15 millions d'exemplaires avec prix divisé par 3, compromis fordiste du 'Five Dollars a Day') ; et Weber (la bureaucratie rationnelle-légale comme machinerie administrative réglée détruisant les règles de l'art du 'travail bien fait').",
      "Corrigé officiel des 25 questions de l'exercice Taylorisme (AD2) : Analyse pas à pas avec le groupe. Faits historiques décryptés : Renault voit son taux d'ouvriers non qualifiés bondir de 4% en 1906 à 74% en 1924 ; le manutentionnaire Schmidt déplace 27 tonnes (voire 47 tonnes) de fonte/jour au lieu de 12,5 tonnes ; l'informel est strictement inexistant ou considéré comme une anomalie à éliminer dans l'OST ; les patrons étaient au début réticents et très défavorables en raison des coûts préalables des bureaux des méthodes ; le chronométrage direct n'était pas la seule méthode (tables MTM, chronophotographie) ; et le chronomètre masque un rapport de force hiérarchique de domination.",
      "Du Néotaylorisme à la Prescription de la Subjectivité : Déploiement des méthodes tayloriennes dans les services (restauration rapide, centres d'appels, caisses, logistique) par le biais de scripts comportementaux (postures, phrases imposées, 'BAM' : Bonjour, Au revoir, Merci). Injonction paradoxale de la 'sincérité prescrite' ('un sourire sincère ne se commande pas'). Toyotisme de Taïchi Ohno (flux tendu, zéro stock, juste-à-temps, dissociation cœur de métier vs périphérie précarisée). Le client devenu prescripteur direct du rythme de travail ('livré en 2 jours', 'pare-brise réparé en 1 heure'). Yves Clot théorise ce basculement : 'Taylor achetait la force de travail physique brute ; aujourd'hui, on achète l'engagement, la disponibilité psychique et la subjectivité de l'homme'.",
      "Genèse de la Psychotechnique et Pionniers du Cnam : De la bioénergétique de Lavoisier aux micro-mouvements de Frank et Lillian Gilbreth (therbligs, 18 mouvements du maçon réduits à 4,5, échafaudage à crémaillère) et Ralph M. Barnes. Émergence de la psychologie scientifique (Wundt 1879 à Leipzig, Münsterberg 1913, Cattell, Galton, Binet 1905). Édouard Toulouse à Villejuif (1906) et Henri Piéron fondant l'INOP en 1928 (devenu INETOP au Cnam) dans un idéal républicain de justice sociale et de méritocratie par l'orientation rationnelle. Création en 1929 de la première chaire de physiologie du travail au Cnam confiée à Henri Laugier, cofondateur avec Lahy de la revue 'Le Travail Humain' en 1933.",
      "La Rupture Épistémologique de Jean-Marie Lahy & Suzanne Pacaud : Lahy (1872-1943) chez Renault Boulogne-Billancourt découvre l'ouvrier utilisant sa tête comme un 'troisième bras'. Thèse centrale : Taylor cherche le 'maximum' immédiat menant à l'épuisement, Lahy cherche l' 'optimum' psychophysiologique préservant la santé et la longévité. Découverte de l'automatisation interne libératrice : l'homme cherche spontanément à incorporer ses gestes pour dégager de la 'disponibilité psychologique' (rêver, penser, anticiper - condition de liberté humaine), là où l'OST impose une rationalisation externe aliénante (cf. Robert Linhart dans 'L\'Établi'). Le conflit : Taylor veut supprimer le conflit ; la clinique du travail veut l'élaborer et le débattre (dispute professionnelle). Suzanne Pacaud (Présidente SFP, VP SELF) étudie les téléphonistes de la SNCF, révèle 14 difficultés réelles invisibles (bruit, cadence de 15-20 s, mémorisation sans informatique, agressivité) et opère la bascule décisive du laboratoire vers le terrain réel ('pour comprendre le métier, il faut le faire'), fondant l'analyse ergonomique francophone avec Ombredane, Faverge et Leplat.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — 2 questions au choix",
      optionsAuChoix: [
        "Option 1 : Dissertation théorique rédigée (mobiliser les auteurs de référence, les filiations historiques du Cnam et les concepts clés).",
        "Option 2 : Analyse clinique d'une situation de travail réelle avec texte support (analyser l'écart prescrit/réel, la charge mentale et les régulations).",
      ],
      recommandationsNotation:
        "Mme Lagabrielle rappelle l'exigence méthodologique : ne jamais formuler d'opinions vagues ou de 'bon sens'. Mobiliser la conceptualisation scientifique rigoureuse, citer les auteurs fondateurs (Taylor, Lahy, Pacaud, Clot, Dejours) et restituer fidèlement l'histoire des institutions du travail au Cnam.",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire de l'article de Suzanne Pacaud (1953) sur les téléphonistes SNCF",
        typeTravail: "lecture",
        consigneExacte:
          "Lire attentivement la monographie de Suzanne Pacaud distribuée sur Moodle. Repérer comment elle a procédé méthodologiquement sur le terrain, identifier les 14 difficultés invisibles du métier et comprendre en quoi cette étude marque l'acte de naissance de l'ergonomie francophone face à la psychotechnique de laboratoire.",
        echeance: "Avant la séance 3 (28 octobre)",
        modaliteRendu: "Notes de lecture personnelles indispensables pour la séance collective d'analyse.",
        recommandationsProf:
          "Soyez attentifs à la démarche : Pacaud ne s'est pas contentée d'observer de loin ou de tester en laboratoire, elle s'est assise à côté des opératrices et a appris à faire le travail pour comprendre ce qui s'y jouait réellement.",
        lienAdId: "pst106-ad3-pacaud",
      },
      {
        titre: "Préparation de la Séance 3 : L'École des Relations Humaines et le Facteur Humain",
        typeTravail: "recherche",
        consigneExacte:
          "Se documenter sur les expériences de la Western Electric à Hawthorne menées par Elton Mayo (1927-1932), l'effet Hawthorne, et la façon dont la prise en compte des besoins psychologiques et des relations affectives entre salariés a constitué la première brèche dans le modèle taylorien.",
        echeance: "Séance 3 (28 octobre)",
        modaliteRendu: "Préparation orale pour le tour de table d'introduction.",
        recommandationsProf:
          "Observez comment l'on passe de l'homme-machine (Taylor) à l'homme social et affectif (Mayo), tout en interrogeant si les relations humaines ne constituent pas une nouvelle forme plus insidieuse de manipulation managériale.",
      },
      {
        titre: "Consolidation du corrigé de l'exercice Taylorisme (AD2 - 25 questions)",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Consigner dans vos fiches de révision les réponses exactes et les analyses critiques des 25 questions du QCM Taylorisme validées en séance avec Pr. Lagabrielle.",
        echeance: "Immédiate",
        modaliteRendu: "Auto-évaluation sur l'espace d'entraînement et carnet d'erreurs.",
        recommandationsProf:
          "Mémorisez bien les chiffres historiques clés (Renault : 4% à 74% d'ouvriers non qualifiés ; Ford T : 15 millions d'exemplaires et prix divisé par 3 ; Schmidt : 12,5 à 27 tonnes de fonte). Ce sont des éléments très valorisés en dissertation.",
        lienAdId: "pst106-ad1-taylorisme",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Ce que signifie le travail pour les philosophes et sociologues",
        points: [
          {
            titre: "Jean-Jacques Rousseau : L'arrachement à l'état de nature et l'aliénation",
            contenu:
              "Dans le 'Discours sur l'origine et les fondements de l'inégalité parmi les hommes' (1755), Rousseau décrit l'homme à l'état de nature comme autonome, vivant dans l'oisiveté paisible et l'autosuffisance. Le travail n'apparaît qu'avec la métallurgie, l'agriculture et la propriété privée ('le premier qui ayant enclos un terrain...'). La division du travail crée une interdépendance forcée entre les hommes, détruit la liberté originelle et engendre la rivalité, les inégalités sociales et la servitude.",
            auteurs: ["Jean-Jacques Rousseau (1755)"],
            conceptsCles: ["État de nature", "Oisiveté naturelle", "Division du travail", "Propriété privée", "Servitude sociale"],
          },
          {
            titre: "Friedrich Nietzsche : Le travail moderne comme 'la meilleure des polices'",
            contenu:
              "Dans 'Aurore' (1881, aphorisme 173), Nietzsche livre une critique féroce de l'éloge moderne du travail acharné ('du matin au soir'). Il affirme que le travail est 'la meilleure des polices' car il consume une force nerveuse extraordinaire, empêche le recul critique, entrave puissamment le développement de la raison, étouffe les désirs individuels et le goût d'indépendance, maintenant la masse dans une docilité rassurante pour l'ordre social établi.",
            auteurs: ["Friedrich Nietzsche (1881)"],
            conceptsCles: ["Travail comme police", "Entrave à la raison", "Domestication sociale", "Usure nerveuse"],
          },
          {
            titre: "Herbert Marcuse : La répression des pulsions et la désérotisation du corps",
            contenu:
              "Dans 'Éros et Civilisation' (1955), Marcuse articule marxisme et psychanalyse. Il démontre que la société industrielle avancée exige une 'sur-répression' des instincts. Le principe de rendement capitaliste opère une désérotisation intégrale du corps humain : l'énergie libidinale et le plaisir sont confisqués et convertis de force en énergie productive docile au service de l'appareil économique et de la marchandisation.",
            auteurs: ["Herbert Marcuse (1955)"],
            conceptsCles: ["Principe de rendement", "Désérotisation du corps", "Sur-répression pulsionnelle", "Aliénation libidinale"],
          },
          {
            titre: "Max Weber : L'ascétisme calviniste et le travail comme vocation (Beruf)",
            contenu:
              "Dans 'L'Éthique protestante et l'esprit du capitalisme' (1905), Weber montre comment la Réforme, et particulièrement la doctrine calviniste de la prédestination, a transformé le statut du travail. L'angoisse du salut pousse le croyant à chercher sur terre des signes de son élection divine. Le travail acharné, méthodique et frugal devient une vocation sacrée ('Beruf'), fournissant le socle moral et spirituel indispensable à l'essor du capitalisme rationnel moderne.",
            auteurs: ["Max Weber (1905)"],
            conceptsCles: ["Beruf (vocation)", "Ascétisme intra-mondain", "Prédestination calviniste", "Esprit du capitalisme"],
          },
          {
            titre: "Emmanuel Kant : La contrainte civilisatrice disciplinant l'animalité",
            contenu:
              "Dans son 'Traité de pédagogie' (1803), Kant soutient que l'homme est le seul être qui ait besoin d'être éduqué et contraint à travailler. Sans le travail, l'homme retombe dans l'animalité, la paresse et l'ennui destructeur. Le travail est une contrainte saine qui discipline les instincts bruts, développe les facultés supérieures de la raison et permet à l'humanité d'accomplir sa destination morale et rationnelle.",
            auteurs: ["Emmanuel Kant (1803)"],
            conceptsCles: ["Discipline de l'animalité", "Contrainte civilisatrice", "Développement des facultés", "Destination morale"],
          },
          {
            titre: "Karl Marx : Essence générique humaine vs aliénation capitaliste",
            contenu:
              "Dans les 'Manuscrits de 1844' et 'Le Capital', Marx définit le travail comme l'acte par lequel l'homme s'extériorise dans la nature et s'auto-crée (différence fondamentale avec l'animal). Cependant, dans le mode de production capitaliste, le travail est inversé en aliénation quadruple : dépossession du produit (qui appartient au capitaliste), dépossession de l'acte de travail (transformé en souffrance et contrainte), dépossession de l'essence humaine générique, et rivalité aliénante entre les travailleurs.",
            auteurs: ["Karl Marx (1844, 1867)"],
            conceptsCles: ["Gattungswesen (essence générique)", "Aliénation quadruple", "Dépossession du produit", "Fétichisme de la marchandise"],
          },
          {
            titre: "G.W.F. Hegel : La dialectique du maître et de l'esclave",
            contenu:
              "Dans la 'Phénoménologie de l'Esprit' (1807), Hegel montre le rôle émancipateur du travail par la dialectique. Le maître qui a risqué sa vie domine l'esclave, mais devient oisif et totalement dépendant des services de l'esclave. L'esclave, en travaillant et en transformant la matière extérieure, acquiert une maîtrise technique, prend conscience de son pouvoir créateur et finit par conquérir une liberté spirituelle supérieure à celle du maître.",
            auteurs: ["G.W.F. Hegel (1807)"],
            conceptsCles: ["Dialectique maître/esclave", "Transformation de la matière", "Prise de conscience de soi", "Émancipation par l'œuvre"],
          },
          {
            titre: "Sigmund Freud : Principe de réalité et sublimation des pulsions",
            contenu:
              "Dans 'Malaise dans la civilisation' (1930), Freud souligne que le travail est le lien le plus solide qui rattache l'individu à la communauté humaine et à la réalité extérieure. Il permet le passage indispensable du principe de plaisir au principe de réalité. Par le mécanisme de sublimation, l'énergie pulsionnelle (sexuelle et agressive) est détournée vers des buts socialement valorisés et constructifs, constituant l'un des piliers majeurs de la santé psychique ('Lieben und Arbeiten' : aimer et travailler).",
            auteurs: ["Sigmund Freud (1930)"],
            conceptsCles: ["Principe de réalité", "Sublimation pulsionnelle", "Ancrage social", "Lieben und Arbeiten"],
          },
        ],
      },
      {
        numero: "2",
        titre: "L'École Classique et la Mécanisation Industrielle (Fayol, Taylor, Ford, Weber)",
        points: [
          {
            titre: "Henri Fayol et l'Administration Industrielle (POC3)",
            contenu:
              "Ingénieur français et directeur des mines de Decazeville, Fayol publie 'Administration industrielle et générale' (1916). Il formule les 5 fonctions administratives universelles (POC3) : Prévoir/Planifier, Organiser, Commander, Coordonner, Contrôler. Sa vision est descendante, centrée sur la direction de l'entreprise et la structure hiérarchique pyramidale (autorité, unité de commandement, chaîne scalaire). Limite majeure : une scotomisation complète de la psychologie humaine, l'homme étant réduit à une case sur l'organigramme formel.",
            auteurs: ["Henri Fayol (1916)"],
            conceptsCles: ["POC3", "Unité de commandement", "Chaîne scalaire", "Administration formelle", "Scotomisation de l'humain"],
          },
          {
            titre: "Frederick Winslow Taylor et l'Organisation Scientifique du Travail (OST, 1911)",
            contenu:
              "Issu d'une famille quaker et devenu ingénieur en chef à la Bethlehem Steel Company, Taylor publie 'The Principles of Scientific Management' (1911). Obsédé par la lutte contre la 'flânerie systématique' des ouvriers (soldiering), il fonde l'OST sur 4 piliers rigides : 1) Division verticale absolue (séparation stricte entre les bureaux des méthodes qui conçoivent et calculent, et les ateliers qui exécutent servilement) ; 2) Division horizontale parcellisée (morcellement des gestes au chronomètre, 'The One Best Way') ; 3) Sélection pseudo-scientifique ('The Right Man at the Right Place', Taylor allant jusqu'à qualifier avec mépris le manutentionnaire de fonte Schmidt de 'bœuf' devant obéir sans réfléchir) ; 4) Système de rémunération différentiel au rendement (Differential Piece-Rate System à deux paliers pour contraindre à dépasser la norme, réduisant l'ouvrier à un pur Homo economicus).",
            auteurs: ["Frederick Winslow Taylor (1911)"],
            conceptsCles: ["OST", "Division verticale", "Division horizontale", "The One Best Way", "The Right Man at the Right Place", "Differential Piece-Rate System", "Flânerie systématique"],
          },
          {
            titre: "Henry Ford, le Travail à la Chaîne et le Compromis Fordiste",
            contenu:
              "Ford applique les principes tayloriens en y ajoutant le convoyeur mécanique (la chaîne de montage continue, 1913) : le rythme ne dépend plus de l'ouvrier, c'est la pièce qui défile devant lui à cadence imposée. Standardisation totale des composants et du produit unique (la célèbre Ford T noire produite à plus de 15 millions d'exemplaires entre 1908 et 1927, dont le temps d'assemblage du châssis passe de 11h à 1h30, et le prix chute de 850 $ à 290 $). Face à un turnover annuel de 380% et un absentéisme massif provoqué par l'abrutissement de la chaîne, Ford institue en 1914 le 'Five Dollars a Day' (doublement du salaire ouvrier). Ce compromis fordiste transforme l'ouvrier en consommateur de masse de sa propre production.",
            auteurs: ["Henry Ford (1913, 1914)"],
            conceptsCles: ["Convoyeur mécanique", "Travail à la chaîne", "Standardisation de masse", "Ford T", "Five Dollars a Day", "Compromis fordiste"],
          },
          {
            titre: "Max Weber et la Bureaucratie Rationnelle-Légale",
            contenu:
              "Dans 'Économie et Société' (1921), le sociologue Max Weber identifie la bureaucratie comme le modèle d'organisation rationnelle-légale par excellence, équivalent administratif de la machine industrielle. Elle repose sur la compétence formelle, la hiérarchie stricte des fonctions, des règles écrites impersonnelles et la séparation entre la fonction et la personne. Si la bureaucratie garantit précision, vitesse, stabilité et calculabilité, Weber alerte sur ses effets déshumanisants : elle emprisonne l'individu dans une 'cage d'acier' et érode la spontanéité, l'imagination et les règles de l'art du 'travail bien fait'.",
            auteurs: ["Max Weber (1921)"],
            conceptsCles: ["Bureaucratie rationnelle-légale", "Règles impersonnelles", "Cage d'acier", "Érosion du travail bien fait"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Décryptage Officiel du QCM Taylorisme (AD2 - Les 25 Questions Analysées)",
        points: [
          {
            titre: "Bloc 1 (Q1 à Q5) : Spécialisation, prescription et organigramme",
            contenu:
              "• Q1 : La spécialisation des tâches correspond à une déqualification du poste de travail (A), car elle retire l'autonomie et le savoir artisanal global de l'ouvrier.\n• Q2 : Le taylorisme explique les comportements organisationnels par des règles prescriptives et contraignantes imposées aux individus (B).\n• Q3 : Dans une organisation formelle, une règle prescriptive définit impérativement les comportements à adopter (C).\n• Q4 : Les comportements selon l'OST sont dictés par des règles formelles (A) et des normes temporelles chronométrées (pas d'habitudes tolérées).\n• Q5 : L'organigramme est une représentation schématique et visuelle de la structure et des règles de l'organisation (A).",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Déqualification", "Prescription", "Organigramme", "Normes temporelles"],
          },
          {
            titre: "Bloc 2 (Q6 à Q10) : L'éradication de l'informel et le mythe du 'One Best Way'",
            contenu:
              "• Q6 : Question piège sur l'organisation informelle : dans le taylorisme strict, l'informel n'a AUCUNE existence légitime (il ne sera théorisé que par l'école des relations humaines). Pour Taylor, toute relation non prescrite est une anomalie.\n• Q7 : Dans la perspective taylorienne, l'informel peut et doit être totalement réduit et éliminé par la science (C).\n• Q8 : L'organisation formelle taylorienne est une construction théorique (B) issue des bureaux des méthodes.\n• Q9 : Selon Taylor, il est scientifiquement possible d'aboutir à la meilleure organisation unique (Vrai / The One Best Way).\n• Q10 : La hiérarchie intermédiaire (maîtrise/contre-maîtres) ne conçoit rien : elle applique strictement les consignes et contrôle les cadences (Faux).",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Inexistence de l'informel", "One Best Way", "Contrôle hiérarchique"],
          },
          {
            titre: "Bloc 3 (Q11 à Q15) : Rémunération différentielle, hiérarchie et économie des gestes",
            contenu:
              "• Q11 : Le système de salaire taylorien officiel est le 'Differential Piece-Rate System' (salaire aux pièces différentiel à deux paliers punitifs/incitatifs - C).\n• Q12 : Le nombre d'échelons hiérarchiques renvoie à la division verticale du travail (A).\n• Q13 : Le chronométrage direct sur poste n'était pas la seule méthode de mesure (Faux / B : existence de tables de temps préétablies, chronophotographie).\n• Q14 : Les principes d'économie des mouvements (Gilbreth/Barnes) ont pour objectif d'identifier et éliminer les gestes inutiles et parasites (B).\n• Q15 : La spécialisation et la parcellisation des tâches ont permis à l'entreprise de réduire drastiquement sa dépendance envers les ouvriers de métier qualifiés (Vrai).",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Differential Piece-Rate System", "Division verticale", "Élimination des gestes parasites"],
          },
          {
            titre: "Bloc 4 (Q16 à Q20) : Réticence patronale, savoir ouvrier et pouvoir du chronomètre",
            contenu:
              "• Q16 : Au démarrage, les dirigeants d'entreprise étaient très défavorables et sceptiques (B) face au taylorisme en raison des coûts considérables exigés par les études préalables de chronométrage.\n• Q17 : Dans la période pré-taylorienne, les ouvriers de métier qualifiés 'brouillaient' le calcul des temps productifs (C/A) pour préserver leurs tarifs et leur autonomie face au patronat.\n• Q18 : Le chronométrage prétendait rendre les mesures objectives et indiscutables (A), mais masquait en réalité un instrument politique de contrôle et de domination hiérarchique.\n• Q19 : La spécialisation des tâches correspond à la parcellisation extrême ('travail en miettes' selon Georges Friedmann - B).\n• Q20 : L'OST a eu pour finalité explicite de réduire l'influence et le pouvoir de négociation des ouvriers qualifiés (B).",
            auteurs: ["Pr. Christine Lagabrielle", "Georges Friedmann (1956)"],
            conceptsCles: ["Réticence patronale initiale", "Brouillage des temps", "Chronomètre comme rapport de pouvoir", "Travail en miettes"],
          },
          {
            titre: "Bloc 5 (Q21 à Q25) : Chiffres historiques de la bascule industrielle",
            contenu:
              "• Q21 : Le manutentionnaire Schmidt déplaçait 12,5 tonnes de gueuses de fonte/jour avant l'OST ; sous le protocole taylorien, son rendement a bondi à 27 tonnes (voire 47 tonnes selon les textes de Taylor).\n• Q22 : La Ford T a été produite à 15 millions d'exemplaires entre 1908 et 1927.\n• Q23 : Chez Renault (Boulogne-Billancourt), la proportion d'ouvriers non qualifiés (OS) est passée de 4% en 1906 à 74% en 1924, marquant la déqualification massive du travail.\n• Q24 : Entre 1909 et 1926, le prix de vente de la Ford T a été divisé par près de 3 (chute de 850 $ à 290 $).\n• Q25 : Dans les ateliers français des années 1970, le temps de cycle chronométré pour la confection d'une paire de bottes était de 1 à 2 minutes (A).",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Schmidt (fonte)", "Ford T (15 millions)", "Renault (4% à 74% OS)", "Temps de cycle"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Néotaylorisme, Toyotisme et Prescription de la Subjectivité",
        points: [
          {
            titre: "Le Néotaylorisme de Service et les Scripts Comportementaux",
            contenu:
              "Le taylorisme n'a pas disparu : il a muté vers les services marchands (restauration rapide, centres d'appels, plateformes logistiques, grande distribution). Le travail n'est plus sur de la matière inerte mais sur autrui ('travailler sur/avec des personnes'). Les organisations imposent des 'scripts comportementaux' ultra-précis régulant les postures, les sourires et les formulations verbales (ex : le protocole 'BAM' : Bonjour, Au revoir, Merci).",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Néotaylorisme de service", "Scripts comportementaux", "BAM", "Travail sur autrui"],
          },
          {
            titre: "L'Injonction Paradoxale de la Sincérité Prescrite",
            contenu:
              "Mme Lagabrielle met en lumière l'impasse psychologique du management de service contemporain : l'organisation exige que le sourire soit 'sincère' et que l'opérateur 'regarde le client dans les yeux avec bienveillance'. Or, la sincérité ne se décrète pas ni ne se commande par prescription. Cette contradiction crée une dissonance émotionnelle aiguë et un épuisement psychique chez les salariés.",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Injonction paradoxale", "Sincérité prescrite", "Dissonance émotionnelle", "Façade relationnelle"],
          },
          {
            titre: "Le Toyotisme de Taïchi Ohno : Flux Tendu et Précarisation Périphérique",
            contenu:
              "Conçu chez Toyota par Taïchi Ohno, le toyotisme repose sur le 'juste-à-temps' et les 'cinq zéros' (zéro stock, zéro panne, zéro défaut, zéro délai, zéro papier). En supprimant les stocks tampons qui permettaient aux ouvriers de réguler les incidents, le toyotisme reporte l'intégralité de la tension sur le système nerveux du travailleur (autonomie sous contrainte). Il fracture l'organisation entre un cœur de métier hautement qualifié et une périphérie précarisée sous-traitée (CDD, intérim, nettoyage, logistique, restauration).",
            auteurs: ["Taïchi Ohno (1978)"],
            conceptsCles: ["Toyotisme", "Juste-à-temps", "Zéro stock", "Autonomie contrôlée", "Précarisation périphérique"],
          },
          {
            titre: "Le Client comme Nouveau Prescripteur de Cadence",
            contenu:
              "Depuis les années 1980, les directions ont externalisé la prescription du rythme vers le client ('livré en 2 jours', 'pare-brise réparé en 1 heure', 'attente au guichet inférieure à 3 minutes'). Le client devient le chronomètre vivant de l'opérateur. La contestation devient impossible pour le travailleur, car le conflit n'est plus perçu comme une pression patronale mais comme une exigence d'usager.",
            auteurs: ["Pr. Christine Lagabrielle"],
            conceptsCles: ["Client prescripteur", "Rythme externalisé", "Chronomètre invisible", "Contrainte triangulaire"],
          },
          {
            titre: "La Prescription de la Subjectivité (Yves Clot, 2009)",
            contenu:
              "Mme Lagabrielle cite la célèbre formule d'Yves Clot : 'Taylor achetait la force de travail physique ; aujourd'hui, le néomanagement achète l'engagement, la disponibilité psychologique et la subjectivité de l'homme'. On exige du salarié qu'il s'investisse corps et âme, qu'il fasse preuve d'initiative face aux dysfonctionnements techniques, tout en lui refusant le cadre délibératif et les moyens réels d'agir sur son travail.",
            auteurs: ["Yves Clot (2009)"],
            conceptsCles: ["Prescription de la subjectivité", "Achat de l'engagement", "Disponibilité psychique", "Perte de pouvoir d'agir"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Genèse de la Psychotechnique et Pionniers du Cnam (Piéron, Laugier)",
        points: [
          {
            titre: "Des Fondements Bioénergétiques aux Therbligs des Époux Gilbreth",
            contenu:
              "Au XVIIIe siècle, Lavoisier étudie les échanges gazeux et la dépense calorique de l'homme au travail. Frank et Lillian Gilbreth (1911, 1923) décomposent le geste ouvrier en 17 micro-mouvements fondamentaux appelés 'therbligs' (anagramme de Gilbreth). Dans l'analyse des maçons, ils inventent l'échafaudage réglable et la disposition standardisée des briques, réduisant les 18 gestes ancestraux à 4,5, supprimant la fatigue de flexion mais privant le travailleur de son savoir-faire d'artisan. Ralph M. Barnes systématise ces principes d'économie des mouvements (symétrie et simultanéité des membres supérieurs).",
            auteurs: ["Frank & Lillian Gilbreth (1923)", "Ralph M. Barnes"],
            conceptsCles: ["Therbligs", "Économie des mouvements", "Micro-gestes", "Bioénergétique"],
          },
          {
            titre: "Naissance de la Psychologie Expérimentale et Psychologie Industrielle",
            contenu:
              "Wilhelm Wundt fonde le premier laboratoire de psychologie expérimentale à Leipzig en 1879. Hugo Münsterberg (élève de Wundt) publie aux États-Unis 'Psychology and Industrial Efficiency' (1913), créant la psychologie industrielle appliquée à la sélection des conducteurs de tramway. Francis Galton et James McKean Cattell fondent la psychologie différentielle et créent les 'mental tests' pour mesurer les réflexes, tandis qu'Alfred Binet développe en 1905 la première échelle métrique de l'intelligence.",
            auteurs: ["Wilhelm Wundt (1879)", "Hugo Münsterberg (1913)", "Alfred Binet (1905)"],
            conceptsCles: ["Psychologie expérimentale", "Psychologie industrielle", "Tests mentaux", "Psychologie différentielle"],
          },
          {
            titre: "Édouard Toulouse et Henri Piéron : L'Idéal Républicain de l'INOP (1928)",
            contenu:
              "En 1906, le Dr Édouard Toulouse crée le laboratoire de psychologie expérimentale à l'asile de Villejuif et formule le projet d'une science du travail humain. Henri Piéron lui succède et fonde en 1928 l'Institut National d'Orientation Professionnelle (INOP, aujourd'hui INETOP rattaché au Cnam). Pour Piéron, la psychotechnique est un projet émancipateur et républicain : substituer l'orientation scientifique basée sur les aptitudes réelles à la reproduction sociale et à la fatalité de naissance ('le bon travailleur au bon poste' dans une visée de justice sociale).",
            auteurs: ["Édouard Toulouse (1906)", "Henri Piéron (1928)"],
            conceptsCles: ["INOP / INETOP Cnam", "Orientation scientifique", "Justice républicaine", "Mesure des aptitudes"],
          },
          {
            titre: "Henri Laugier et la Première Chaire de Physiologie du Travail au Cnam (1929)",
            contenu:
              "En 1929 est créée au Cnam la première chaire universitaire de Physiologie du travail et hygiène industrielle, confiée à Henri Laugier. Laugier dénonce l'usure prématurée causée par l'OST et la surchauffe physiologique des ateliers. En 1933, il fonde avec Jean-Marie Lahy la prestigieuse revue scientifique 'Le Travail Humain', qui devient le laboratoire intellectuel de l'ergonomie et de la psychologie du travail francophone.",
            auteurs: ["Henri Laugier (1929)", "Jean-Marie Lahy (1933)"],
            conceptsCles: ["Chaire Cnam 1929", "Le Travail Humain", "Physiologie du travail", "Lutte contre l'usure"],
          },
        ],
      },
      {
        numero: "6",
        titre: "La Rupture Épistémologique : Jean-Marie Lahy et Suzanne Pacaud",
        points: [
          {
            titre: "Jean-Marie Lahy chez Renault : L'Ouvrier et son 'Troisième Bras'",
            contenu:
              "Jean-Marie Lahy (1872-1943), figure de proue de la psychophysiologie du travail, mène des enquêtes de terrain aux usines Renault de Boulogne-Billancourt. Observant les ouvriers travaillant sur des presses d'emboutissage, il constate qu'ils calent les pièces avec leur front ou leur tête, transformant leur tête en 'troisième bras' pour compenser l'inadéquation de la machine. Cette observation magistrale démontre l'inventivité corporelle de l'opérateur face aux failles de la technique.",
            auteurs: ["Jean-Marie Lahy (1916, 1921)"],
            conceptsCles: ["Renault Boulogne-Billancourt", "Troisième bras", "Compensation corporelle", "Inventivité ouvrière"],
          },
          {
            titre: "La Thèse Majeure de Lahy : L'Optimum vs le Maximum",
            contenu:
              "Lahy porte le coup décisif contre Taylor : Taylor recherche le 'maximum' de rendement immédiat à court terme, ce qui conduit à l'épuisement nerveux, aux accidents et à la destruction précoce de la force de travail (processus qualifié de 'vampirisation' par Christophe Dejours). À l'opposé, la science du travail doit rechercher l' 'optimum' psychophysiologique, c'est-à-dire le point d'équilibre pérenne qui concilie efficacité productive et préservation durable de la santé et de la longévité de l'être humain.",
            auteurs: ["Jean-Marie Lahy (1916)", "Christophe Dejours (1998)"],
            conceptsCles: ["Optimum psychophysiologique", "Maximum taylorien", "Vampirisation de la main-d'œuvre", "Longévité humaine"],
          },
          {
            titre: "L'Automatisation Interne Libératrice vs la Rationalisation Externe Aliénante",
            contenu:
              "Apport philosophique et clinique fondamental discuté par Mme Lagabrielle : l'être humain a une tendance naturelle et saine à rationaliser et automatiser ses gestes de l'intérieur (dans la conduite automobile, l'artisanat ou la cuisine). Cette 'automatisation interne' permet d'économiser l'énergie psychique et d'ouvrir de la 'disponibilité psychologique' (dégager de l'espace mental pour penser, rêver, anticiper, être créatif). C'est une condition de la liberté humaine. À l'inverse, le taylorisme impose une 'rationalisation externe' mécanique et figée, dictée par la direction, qui confisque cette plasticité et mutile l'esprit (comme le décrit Robert Linhart dans 'L'Établi').",
            auteurs: ["Jean-Marie Lahy (1921)", "Robert Linhart (1978)"],
            conceptsCles: ["Automatisation interne", "Disponibilité psychologique", "Rationalisation externe", "Liberté vs aliénation", "L'Établi"],
          },
          {
            titre: "La Démystification du Chronomètre et le Statut du Conflit",
            contenu:
              "Lahy démontre que le chronomètre n'a rien d'un instrument scientifique neutre : il sert à masquer et légitimer un rapport de domination hiérarchique ('il y a ceux qui chronomètrent et ceux qui sont chronométrés'). De plus, pour Taylor, une organisation scientifique idéale supprime les conflits en éliminant la subjectivité. Pour Lahy et la clinique du travail, le conflit est inhérent à l'activité et ne doit pas être évité : il doit être élaboré, instruit et débattu (la 'dispute professionnelle' chère à Yves Clot) pour développer les règles du métier.",
            auteurs: ["Jean-Marie Lahy (1922)", "Yves Clot (1999)"],
            conceptsCles: ["Démystification du chronométrage", "Rapport de domination", "Élaboration du conflit", "Dispute professionnelle"],
          },
          {
            titre: "Suzanne Pacaud et l'Enquête Pionnière des Téléphonistes SNCF",
            contenu:
              "Collaboratrice de Lahy, Présidente de la Société Française de Psychologie (SFP) et Vice-Présidente de la Société d'Ergonomie de Langue Française (SELF), Suzanne Pacaud publie en 1953 ses 'Recherches sur le travail des téléphonistes' au Poste Téléphonique Central Manuel de la SNCF. Elle met en évidence 14 difficultés réelles invisibles : bruit assourdissant des salles, débit vocal continu provoquant l'enrouement, mauvaise prononciation des correspondants, délai draconien de 15 à 20 secondes par communication, mémorisation mentale sans outil informatique de la grille des postes et organigrammes, et absorption constante de l'agressivité des usagers.",
            auteurs: ["Suzanne Pacaud (1949, 1953)"],
            conceptsCles: ["Suzanne Pacaud", "Téléphonistes SNCF", "14 difficultés invisibles", "Charge mentale", "SFP", "SELF"],
          },
          {
            titre: "La Rupture Épistémologique : Du Laboratoire au Terrain Réel",
            contenu:
              "Pacaud opère le basculement fondamental de la discipline : elle quitte le laboratoire artificiel pour observer le travail réel in situ. Son principe méthodologique : 'Pour comprendre le métier, il faut le faire' (observation participante directe). Elle démontre que ce que la direction qualifiait de 'fautes' ou d' 'erreurs d'inattention' relevait en réalité de régulations cognitives de survie et d'ingéniosité adaptative des opératrices pour maintenir le système ferroviaire en fonctionnement. Pacaud fonde ainsi avec André Ombredane, Jean-Marie Faverge et Jacques Leplat l'école francophone d'analyse ergonomique de l'activité.",
            auteurs: ["Suzanne Pacaud (1953)", "Ombredane & Faverge (1955)", "Jacques Leplat"],
            conceptsCles: ["Rupture laboratoire vers terrain", "Pour comprendre il faut le faire", "Régulation vs faute", "Activité réelle", "Ergonomie francophone"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Les Conceptions Philosophiques et Sociologiques du Travail",
        description: "Synthèse comparative des penseurs majeurs abordés lors du tour de table de la Séance 2 (Lagabrielle)",
        colonnes: ["Penseur & Œuvre", "Statut du Travail", "Mécanisme Psychologique", "Conséquence pour le Sujet", "Concept Clé Examen"],
        lignes: [
          {
            axe: "Jean-Jacques Rousseau (1755)",
            valeurs: [
              "Arrachement à l'état de nature",
              "Naissance avec la propriété et la division des tâches",
              "Perte d'autonomie, rivalités sociales, servitude",
              "Oisiveté naturelle corrompue par la dépendance mutuelle",
            ],
          },
          {
            axe: "Friedrich Nietzsche (1881)",
            valeurs: [
              "Instrument d'asservissement collectif",
              "Usure forcenée de l'énergie nerveuse",
              "Étouffe la raison, les désirs propres et l'esprit critique",
              "« Le travail est la meilleure des polices » (Aurore)",
            ],
          },
          {
            axe: "Herbert Marcuse (1955)",
            valeurs: [
              "Principe de rendement capitaliste",
              "Désérotisation du corps et répression pulsionnelle",
              "Confiscation de l'Éros au profit de la machine économique",
              "Sur-répression et conversion de la libido en productivité",
            ],
          },
          {
            axe: "Max Weber (1905)",
            valeurs: [
              "Vocation ascétique séculière (Beruf)",
              "Recherche de signes terrestres d'élection divine",
              "Discipline méthodique et rationalisation de la vie",
              "Éthique protestante / Esprit du capitalisme",
            ],
          },
          {
            axe: "Emmanuel Kant (1803)",
            valeurs: [
              "Contrainte civilisatrice émancipatrice",
              "Discipline de l'animalité et lutte contre l'ennui",
              "Déploiement des facultés supérieures de la raison",
              "Destination morale de l'humanité par l'effort",
            ],
          },
          {
            axe: "Karl Marx (1844, 1867)",
            valeurs: [
              "Essence générique humaine (Gattungswesen)",
              "Activité consciente d'auto-création dans la nature",
              "Inversé en aliénation quadruple sous le capitalisme",
              "Dépossession du produit, de l'acte et de l'humanité",
            ],
          },
          {
            axe: "G.W.F. Hegel (1807)",
            valeurs: [
              "Médiation dialectique de l'émancipation",
              "Transformation de la matière par l'esclave",
              "Acquisition de la maîtrise technique et conscience de soi",
              "Dialectique du maître oisif et de l'esclave libéré par l'œuvre",
            ],
          },
          {
            axe: "Sigmund Freud (1930)",
            valeurs: [
              "Ancrage indispensable dans la communauté",
              "Passage du principe de plaisir au principe de réalité",
              "Canalisation saine des pulsions sexuelles et agressives",
              "Sublimation pulsionnelle / « Lieben und Arbeiten »",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — Confrontation des Paradigmes Productifs : Taylorisme vs Toyotisme vs Néotaylorisme de Service",
        colonnes: ["Caractéristique", "Taylorisme Industriel (1911)", "Toyotisme Industriel (1970)", "Néotaylorisme de Service (Aujourd'hui)"],
        lignes: [
          {
            axe: "Objet du travail",
            valeurs: [
              "Matière inerte physique (acier, bois, mécanique)",
              "Composants assemblés en flux tiré (automobiles)",
              "Êtres humains / Usagers (travailler sur/avec autrui)",
            ],
          },
          {
            axe: "Mode de régulation",
            valeurs: [
              "Parcellisation des gestes et chronomètre direct",
              "Kanban, juste-à-temps, zéro stock, flux tendu",
              "Scripts comportementaux, phrases imposées (BAM), traçabilité",
            ],
          },
          {
            axe: "Source de la prescription",
            valeurs: [
              "Bureau des méthodes et ingénieurs scientifiques",
              "Objectifs de qualité totale et cadences de la ligne",
              "Le client / usager ('livré en 2 jours', 'réparé en 1h')",
            ],
          },
          {
            axe: "Attente managériale",
            valeurs: [
              "Force musculaire brute et obéissance servile ('Schmidt')",
              "Polyvalence, flexibilité, traque des micro-déchets",
              "Engagement, disponibilité psychique et subjectivité (Clot)",
            ],
          },
          {
            axe: "Impasse psychologique",
            valeurs: [
              "Abrutissement nerveux et flânerie systématique",
              "Autonomie sous contrainte extrême, usure sans temps mort",
              "Injonction paradoxale de la sincérité prescrite et dissonance",
            ],
          },
        ],
      },
      {
        titre: "Tableau 3 — Jean-Marie Lahy vs Frederick Taylor : L'Affrontement Épistémologique Fondateur",
        colonnes: ["Dimension d'Analyse", "Modèle Taylorien (OST, 1911)", "Modèle Psychophysiologique de Lahy (1916-1933)"],
        lignes: [
          {
            axe: "Finalité du rendement",
            valeurs: [
              "Le Maximum : extraire la plus grande quantité immédiate",
              "L'Optimum : préserver l'équilibre physiologique et la longévité",
            ],
          },
          {
            axe: "Nature de la rationalisation",
            valeurs: [
              "Rationalisation externe : imposée du dehors par les ingénieurs",
              "Automatisation interne : incorporée spontanément pour libérer l'esprit",
            ],
          },
          {
            axe: "Statut du chronométrage",
            valeurs: [
              "Mesure scientifique neutre, objective et indiscutable",
              "Instrument de pouvoir masquant un rapport de domination hiérarchique",
            ],
          },
          {
            axe: "Gestion du conflit",
            valeurs: [
              "Suppression du conflit par l'organisation scientifique parfaite",
              "Élaboration du conflit par la confrontation collective et l'expertise",
            ],
          },
          {
            axe: "Vision de l'opérateur",
            valeurs: [
              "Exécutant mécanique 'assimilé à un bœuf' (Taylor)",
              "Sujet pensant utilisant sa tête comme '3e bras' (Lahy chez Renault)",
            ],
          },
        ],
      },
      {
        titre: "Tableau 4 — La Rupture de Suzanne Pacaud (1953) : De la Psychotechnique de Laboratoire à l'Analyse Ergonomique de Terrain",
        colonnes: ["Axe Épistémologique", "Psychotechnique Classique (1920-1940)", "Analyse Ergonomique de Suzanne Pacaud (1953)"],
        lignes: [
          {
            axe: "Lieu de l'investigation",
            valeurs: [
              "Laboratoire expérimental aseptisé (tests isolés, temps de réaction)",
              "Poste de travail réel in situ (salle bruyante du central SNCF)",
            ],
          },
          {
            axe: "Postulat méthodologique",
            valeurs: [
              "Mesurer des aptitudes universelles préexistantes au poste",
              "« Pour comprendre le métier, il faut le faire » (immersion vécue)",
            ],
          },
          {
            axe: "Statut de l'erreur / écart",
            valeurs: [
              "Faute professionnelle, inaptitude individuelle ou manque d'attention",
              "Régulation cognitive indispensable face aux 14 difficultés invisibles",
            ],
          },
          {
            axe: "Conception du travail",
            valeurs: [
              "Tâche prescrite figée (enfoncer des fiches dans des jacks)",
              "Activité réelle complexe saturée de charge mentale et de ruses",
            ],
          },
          {
            axe: "Postérité scientifique",
            valeurs: [
              "Sélection et orientation de la main-d'œuvre (INOP / Binet / Piéron)",
              "Fondation de l'analyse ergonomique francophone (Ombredane, Faverge, Leplat)",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne pas confondre 'Optimum' (Lahy) et 'Maximum' (Taylor)",
        erreurCourante:
          "Écrire que Lahy et Taylor partageaient le même but de maximisation de la productivité ouvrière par la science.",
        rectificationAttendue:
          "Lahy s'oppose radicalement au taylorisme : Taylor cherche le 'maximum' de rendement quantitatif à court terme, au détriment de l'organisme ouvrier qu'il épuise. Lahy recherche l' 'optimum' psychophysiologique, c'est-à-dire un équilibre durable entre efficacité productive et préservation de la santé physique et psychique.",
        contexte:
          "Question classique d'histoire de la psychologie du travail au Cnam. Mobiliser les recherches de Lahy aux usines Renault de Boulogne-Billancourt.",
      },
      {
        titre: "L'incorporation des automatismes : Liberté interne vs Aliénation externe",
        erreurCourante:
          "Considérer que toute forme d'automatisation des gestes au travail est aliénante et pathogène.",
        rectificationAttendue:
          "Comme le souligne Pr. Lagabrielle d'après Lahy, l'automatisation interne (incorporer des schèmes d'action, comme dans la cuisine ou la conduite) est une condition de la liberté : elle réduit la charge cognitive et libère de la 'disponibilité psychologique' pour penser et rêver. Ce qui est pathogène dans l'OST, c'est la rationalisation externe imposée mécaniquement du dehors par le bureau des méthodes.",
        contexte:
          "Point théorique distinguant l'ergonomie francophone (plasticité du sujet) de la critique sociologique superficielle. Citer Robert Linhart ('L'Établi').",
      },
      {
        titre: "Le chronométrage taylorien n'est pas une mesure scientifique neutre",
        erreurCourante:
          "Présenter le chronomètre taylorien comme un simple outil de mesure objectif et impartial du temps physique.",
        rectificationAttendue:
          "Le chronométrage est une technologie de pouvoir politique et hiérarchique. Il sert à confisquer le savoir-faire des ouvriers qualifiés (qui 'brouillaient' les temps pour protéger leurs cadences) et à légitimer par l'apparence scientifique un rapport de domination entre ceux qui chronomètrent et ceux qui sont chronométrés.",
        contexte:
          "Question 18 du corrigé de l'AD Taylorisme et analyse de la division verticale.",
      },
      {
        titre: "Le statut du conflit : Élimination taylorienne vs Élaboration clinique",
        erreurCourante:
          "Penser que le but de la psychologie du travail et de la clinique de l'activité est de pacifier l'entreprise en supprimant les conflits.",
        rectificationAttendue:
          "C'est Taylor qui croyait que l'organisation scientifique éliminerait définitivement les conflits d'intérêts. Pour la clinique de l'activité (Yves Clot), le conflit sur les critères du travail bien fait est au contraire le moteur indispensable de la vitalité psychique et du métier. Le rôle du psychologue est de permettre l'élaboration du conflit en 'dispute professionnelle réglée', et non d'étouffer le désaccord.",
        contexte:
          "Distinction majeure entre le taylorisme positiviste et la clinique contemporaine du travail.",
      },
      {
        titre: "Suzanne Pacaud : L'erreur des téléphonistes est une régulation et non une faute",
        erreurCourante:
          "Considérer les incidents de liaison des opératrices SNCF comme des défaillances de compétences ou un manque de rigueur.",
        rectificationAttendue:
          "Suzanne Pacaud démontre que les prétendues 'fautes' des opératrices sont la conséquence inévitable de 14 difficultés réelles cumulées (bruit, cadence de 15 à 20 secondes par appel, surcharge mémorielle, agressivité des usagers). Ces erreurs révèlent des compromis opératoires indispensables mis en œuvre par les travailleuses pour empêcher l'effondrement global du central téléphonique.",
        contexte:
          "Monographie historique de Suzanne Pacaud (1953) et fondation du concept d'activité réelle face à la tâche prescrite.",
      },
    ],
    transcriptionIntegraleVerbatim: `Transcription intégrale du cours 2 — PST106 (Pr. Christine Lagabrielle)
Durée : 3 h 31 min 36 s (parole effective : 3 h 11 min 35 s) · Enregistrement officiel Cnam Aquitaine

[00:00:00] PR. LAGABRIELLE : Voilà, j'espère que ceux qui n'ont pas pu être là la dernière fois ont pu justement écouter l'enregistrement qui était disponible. Je rappelle simplement : n'oubliez pas de mettre les sources de vos réponses et de ce que vous trouvez, et de bien marquer votre nom dans le nom de votre fichier. J'ai plusieurs travaux très intéressants déposés sur Moodle. Nous allons commencer par restituer le travail préparatoire que je vous avais demandé sur les conceptions du travail chez les philosophes et théoriciens majeurs : Rousseau, Nietzsche, Marcuse, Weber, Kant, Marx, Hegel et Freud.

[00:10:46] PR. LAGABRIELLE : Alors, que dit Jean-Jacques Rousseau ? Dans le 'Discours sur l'origine et les fondements de l'inégalité parmi les hommes' (1755), Rousseau nous montre que dans l'état de nature, l'homme ne travaille pas : il vit dans une autosuffisance paisible, cueille ce dont il a besoin et jouit d'une oisiveté naturelle. Le travail forcé et la division des tâches n'apparaissent qu'avec la propriété privée ('le premier qui ayant enclos un terrain s'avisa de dire : Ceci est à moi'). Dès lors que l'on a besoin d'un autre pour produire du blé ou du fer, l'égalité disparaît, la liberté naturelle s'éteint et la servitude sociale commence.

[00:21:17] PR. LAGABRIELLE : Et Friedrich Nietzsche ? C'est l'un des textes les plus percutants. Dans 'Aurore' (1881), Nietzsche écrit : « Le travail est la meilleure des polices ». Pourquoi une police ? Parce que le labeur acharné du matin au soir consume une énergie nerveuse prodigieuse. Il vide l'individu de sa force vitale, l'empêche de réfléchir, entrave puissamment le développement de sa raison, de ses désirs propres et de son goût de l'indépendance. La société valorise le travailleur acharné non pas pour son bien, mais parce qu'il ne constitue aucun danger pour la sécurité publique.

[00:31:10] PR. LAGABRIELLE : Herbert Marcuse, dans 'Éros et Civilisation' (1955), va prolonger cette analyse en montrant que l'appareil de production capitaliste impose une désérotisation du corps humain : l'énergie libidinale et le plaisir corporel sont réprimés et réorientés de force vers la productivité marchande. Max Weber, lui, dans 'L'Éthique protestante' (1905), analyse comment l'ascétisme calviniste et l'angoisse de la prédestination transforment le travail en 'Beruf' — une vocation sacrée où la réussite professionnelle devient le signe de l'élection divine. Emmanuel Kant ('Traité de pédagogie', 1803) insiste quant à lui sur la contrainte civilisatrice : l'homme doit être contraint au travail pour discipliner son animalité et développer ses facultés morales. Enfin, Freud ('Malaise dans la civilisation', 1930) résume la santé psychique par la capacité d'« aimer et travailler » : le travail est l'ancrage le plus puissant dans le principe de réalité et le mécanisme royal de sublimation des pulsions.

[00:40:08] PR. LAGABRIELLE : Nous entrons maintenant dans le vif de l'histoire industrielle avec l'École classique. Fayol publie 'Administration industrielle et générale' en 1916. Il formalise le POC3 : Prévoir, Organiser, Commander, Coordonner, Contrôler. Sa perspective est descendante, administrative, formaliste. Pour Fayol, une bonne organisation est une hiérarchie pyramidale rigide sans faille. Mais l'humain est totalement scotomisé : les sentiments, la subjectivité et la santé n'ont aucune place dans son schéma.

[00:50:33] PR. LAGABRIELLE : Frederick Winslow Taylor et l'OST (1911) à la Bethlehem Steel Company. Taylor part d'une obsession : éradiquer ce qu'il appelle la 'flânerie systématique' (soldiering) des ouvriers. Pour y parvenir, il applique deux ruptures fondamentales : 1) La division verticale, qui sépare radicalement ceux qui conçoivent dans les bureaux des méthodes et ceux qui exécutent dans les ateliers ; 2) La division horizontale, qui parcellise le travail en gestes élémentaires mesurés au chronomètre pour déterminer le 'One Best Way'. Taylor ne s'arrête pas là : avec 'The Right Man at the Right Place', il sélectionne les individus selon des critères physiologiques réducteurs. Il va jusqu'à comparer avec mépris Schmidt, son manutentionnaire de gueuses de fonte, à un 'bœuf' incapable de comprendre la science de son travail et devant obéir aveuglément pour maximiser le tonnage quotidien.

[01:00:06] PR. LAGABRIELLE : Nous arrivons à la correction de l'exercice sur le taylorisme (AD2). Analysons les 25 questions pas à pas.
Q1 : La spécialisation des tâches correspond bien sûr à une déqualification du poste de travail (A).
Q2 : Comment le taylorisme explique-t-il les comportements ? Par des règles de division du travail prescriptives qui contraignent les individus (B).
Q3 : Une règle prescriptive définit obligatoirement les comportements à avoir (C).
Q4 : Les comportements selon l'OST sont déterminés par des règles écrites et des normes temporelles chronométrées (A/B).
Q5 : Un organigramme est une représentation schématique de l'organisation (A).
Q6 & Q7 : Question piège sur l'organisation informelle : dans le taylorisme, l'informel n'existe pas ! Tout ce qui n'est pas prescrit est considéré comme un dysfonctionnement à éradiquer. Donc pour Taylor, l'informel peut et doit être totalement réduit (C). L'informel ne sera reconnu que plus tard par l'école des relations humaines.
Q8 : L'organisation formelle est une construction théorique (B).
Q9 : Selon Taylor, il est possible d'aboutir à la meilleure organisation possible (Vrai / One Best Way).
Q10 : Les contre-maîtres ne conçoivent rien, ils surveillent et appliquent (Faux).

[01:10:10] PR. LAGABRIELLE : Poursuivons les questions suivantes.
Q11 : Quel est le système de rémunération taylorien ? C'est le 'Differential Piece-Rate System' (C) : un salaire différentiel aux pièces avec deux tarifs (un tarif très bas et punitif pour ceux qui n'atteignent pas la norme, et un tarif majoré pour ceux qui la dépassent).
Q12 : Le nombre d'échelons hiérarchiques renvoie à la division verticale du travail (A).
Q13 : Le chronométrage direct sur poste était-il la seule méthode ? Faux (B) : il existait aussi les tables de temps préétablies (MTM) et la chronophotographie.
Q14 : Les principes d'économie des mouvements de Gilbreth visent à déterminer et éliminer les gestes inutiles (B).
Q15 : Par la spécialisation, la dépendance de l'entreprise envers les ouvriers qualifiés s'est trouvée réduite (Vrai).
Q16 : Au début, quelle fut la réaction des patrons ? Défavorable et sceptique (B) à cause du coût exorbitant des études préalables de chronométrage !
Q17 : Avant le taylorisme, les ouvriers qualifiés brouillaient le calcul des temps productifs (C) pour conserver la maîtrise de leur métier.
Q18 : Avec le chronométrage, les mesures deviennent apparemment objectives et indiscutables (A), mais cela masque un instrument politique de pouvoir hiérarchique.
Q19 : La spécialisation correspond à la parcellisation extrême (le travail en miettes de Friedmann - B).
Q20 : L'émergence du taylorisme a permis de réduire l'influence des ouvriers qualifiés (B).

[01:20:33] PR. LAGABRIELLE : Et les questions chiffrées :
Q21 : Le manutentionnaire de fonte Schmidt passe de 12,5 tonnes à 27 tonnes par jour (voire 47 tonnes selon les versions officielles de Taylor).
Q22 : La Ford T a été produite à 15 millions d'exemplaires entre 1908 et 1927.
Q23 : Chez Renault en 1906, les ouvriers non qualifiés représentaient 4% des effectifs. En 1924, après rationalisation, ils représentent 74% ! La prolétarisation est massive.
Q24 : Le prix de vente de la Ford T est passé de 850 $ à 290 $, divisé par près de 3.
Q25 : Dans les années 70 en France, les temps de cycle pour la confection de bottes étaient de 1 à 2 minutes (A).

[01:30:34] PR. LAGABRIELLE : Henry Ford apporte le convoyeur mécanique : le travail à la chaîne. La pièce défile devant l'ouvrier, ce n'est plus l'ouvrier qui marche. La Ford T devient l'emblème de la standardisation de masse. Pour pallier le turnover monstrueux (380% par an !), Ford introduit en 1914 le 'Five Dollars a Day' : payer deux fois plus pour fidéliser les ouvriers et en faire les consommateurs des voitures qu'ils fabriquent. Max Weber théorise au même moment la bureaucratie rationnelle-légale comme la machinerie administrative réglée, mais alerte sur la 'cage d'acier' qui détruit l'artisanat et les règles du 'travail bien fait'.

[01:42:29] PR. LAGABRIELLE : Observons ce qui se passe aujourd'hui : le néotaylorisme a envahi le secteur tertiaire et les services. Mais attention, travailler sur des pièces métalliques n'a rien à voir avec travailler sur des êtres humains ! Dans la restauration rapide ou les centres d'appels, on impose des 'scripts comportementaux' : des postures, des phrases types, la règle du 'BAM' (Bonjour, Au revoir, Merci). Et pire encore : l'injonction paradoxale du 'sourire sincère' ! On vous dit : 'Vous devez sourire, et votre sourire doit être sincère'. Mais la sincérité ne se commande pas par prescription ! Cela crée une dissonance émotionnelle destructrice.

[01:50:09] PR. LAGABRIELLE : Taïchi Ohno développe chez Toyota le toyotisme : flux tendu, zéro stock, juste-à-temps. En supprimant les stocks qui permettaient aux ouvriers de souffler ou d'absorber un pépin technique, le toyotisme reporte toute la tension sur le système nerveux du travailleur. L'autonomie devient une autonomie sous contrainte maximale. Et à partir des années 1980, le client devient le nouveau prescripteur direct : 'livré en 2 jours', 'pare-brise changé en 1 heure'. La direction se défausse : c'est le client qui vous presse.

[02:01:01] PR. LAGABRIELLE : Yves Clot a résumé ce basculement historique contemporain d'une phrase magistrale : « Taylor achetait la force de travail physique brute de l'homme ; aujourd'hui, le management achète l'engagement, la disponibilité psychologique et la subjectivité de l'homme ». C'est la prescription de la subjectivité. On vous demande d'être investi, souriant, proactif, créatif, tout en vous retirant le temps et les collectifs pour débattre du travail bien fait.

[02:10:09] PR. LAGABRIELLE : Regardons la genèse de la psychotechnique. Lavoisier mesurait la consommation d'oxygène au travail. Frank et Lillian Gilbreth ont créé les 'therbligs', décomposant le geste en micro-mouvements. Dans l'exercice des maçons, Gilbreth conçoit un échafaudage à crémaillère réglable à hauteur de taille et fait préparer les briques sur claie : il réduit les 18 gestes ancestraux du maçon à 4,5 gestes. Il triple le rendement, mais détruit le métier d'artisan maçon. Ralph M. Barnes systématise l'économie des mouvements.

[02:20:36] PR. LAGABRIELLE : La psychologie scientifique naît avec Wilhelm Wundt à Leipzig en 1879, puis Münsterberg aux États-Unis (1913, psychologie industrielle), Cattell et Galton pour les tests mentaux, et Alfred Binet (1905) pour l'échelle métrique de l'intelligence. En France, Édouard Toulouse crée en 1906 le laboratoire de Villejuif. Henri Piéron fonde en 1928 l'INOP (aujourd'hui INETOP au Cnam) : pour Piéron, la psychotechnique est un idéal républicain progressiste. Il veut remplacer l'arbitraire de la naissance par l'orientation rationnelle basée sur les aptitudes réelles. En 1929, la première chaire de physiologie du travail au Cnam est confiée à Henri Laugier, qui fondera en 1933 avec Jean-Marie Lahy la revue 'Le Travail Humain'.

[02:30:32] PR. LAGABRIELLE : Arrive alors la rupture épistémologique décisive avec Jean-Marie Lahy (1872-1943). Lahy mène des études aux usines Renault de Boulogne-Billancourt. Il observe les ouvriers sur les presses d'emboutissage et découvre qu'ils calent les pièces avec leur tête : ils utilisent leur tête comme un 'troisième bras' pour compenser l'inadaptation de la machine ! Lahy formule sa thèse centrale : Taylor cherche le 'maximum' immédiat de production, ce qui use prématurément l'organisme ouvrier et provoque des accidents. La psychophysiologie doit au contraire chercher l' 'optimum' : le compromis entre efficacité et préservation pérenne de la santé.

[02:40:34] PR. LAGABRIELLE : Et Lahy découvre une notion théorique géniale : l'être humain cherche spontanément à automatiser ses gestes de l'intérieur. Pourquoi ? Regardez quand vous faites la cuisine ou quand vous conduisez : quand vous avez incorporé les gestes, vous n'avez plus besoin d'y penser. Cette automatisation interne libère de la 'disponibilité psychologique' ! Elle dégage de l'espace mental pour rêver, penser à sa journée, discuter, créer. L'automatisation interne est une condition de la liberté humaine. Ce qui est pathogène dans le taylorisme, ce n'est pas le geste en soi, c'est la rationalisation externe imposée du dehors qui confisque cette liberté (lisez 'L'Établi' de Robert Linhart !). De plus, Lahy montre que le chronométrage masque un rapport de domination hiérarchique. Et face au conflit, Taylor veut le supprimer par la science, alors que nous, cliniciens, voulons l'élaborer et le débattre !

[02:50:10] PR. LAGABRIELLE : Suzanne Pacaud, assistante et collaboratrice de Lahy, deviendra Présidente de la Société Française de Psychologie et Vice-Présidente de la Société d'Ergonomie de Langue Française. Dans son étude magistrale de 1953 sur les téléphonistes du Central de la SNCF, elle opère une révolution : elle quitte le laboratoire pour s'asseoir à côté des opératrices sur le terrain. Elle pose le principe d'or de l'ergonomie : « Pour comprendre le métier, il faut le faire ».

[03:00:14] PR. LAGABRIELLE : Suzanne Pacaud met au jour 14 difficultés réelles invisibles : le vacarme permanent des salles d'appel, l'élocution continue sans interruption provoquant l'aphonie, la mauvaise articulation des usagers qui crient, l'obligation de traiter un appel en 15 à 20 secondes, l'absence de tout outil informatique obligeant l'opératrice à mémoriser mentalement l'organigramme ferroviaire complexe, et l'absorption de l'agressivité des voyageurs. Ce que les inspecteurs appelaient des 'fautes' ou du 'bavardage' était en réalité des régulations cognitives de survie indispensables pour éviter l'effondrement du service ! Pacaud fonde ainsi, avec Ombredane, Faverge et Leplat, l'analyse ergonomique francophone de l'activité.

[03:10:16] PR. LAGABRIELLE : Voilà le chemin parcouru ce soir : nous sommes partis des philosophes du travail, nous avons traversé l'illusion machinique de Taylor, Ford et Fayol, pour aboutir à la découverte du travail réel avec Lahy et Pacaud. La prochaine fois, nous aborderons l'école des relations humaines avec Elton Mayo et l'expérience de Hawthorne : l'irruption du facteur humain et des sentiments dans l'entreprise. Merci à tous pour votre participation active et bonne fin de soirée !`,
    bibliographieCitee: [
      {
        titre: "The Principles of Scientific Management",
        auteur: "Frederick Winslow Taylor",
        annee: "1911",
        remarque: "L'ouvrage fondateur de l'Organisation Scientifique du Travail (OST), instaurant la division verticale et horizontale et le differential piece-rate system.",
      },
      {
        titre: "Administration industrielle et générale",
        auteur: "Henri Fayol",
        annee: "1916",
        remarque: "Formalisation des 5 fonctions administratives (POC3 : Prévoir, Organiser, Commander, Coordonner, Contrôler) et de la structure pyramidale hiérarchique.",
      },
      {
        titre: "Économie et Société",
        auteur: "Max Weber",
        annee: "1921",
        remarque: "Théorisation sociologique de l'autorité rationnelle-légale et de la bureaucratie comme équivalent administratif de la machine industrielle.",
      },
      {
        titre: "Le système Taylor et la physiologie du travail professionnel",
        auteur: "Jean-Marie Lahy",
        annee: "1916",
        remarque: "Critique scientifique pionnière démontrant que Taylor cherche le maximum destructeur d'organisme au lieu de l'optimum psychophysiologique.",
      },
      {
        titre: "L'organisation rationnelle du travail à la place de l'empirisme",
        auteur: "Jean-Marie Lahy",
        annee: "1922",
        remarque: "Démystification du chronométrage comme outil de domination et analyse du statut des conflits industriels.",
      },
      {
        titre: "Recherches sur le travail des téléphonistes : Étude psychologique d'un métier",
        auteur: "Suzanne Pacaud",
        annee: "1953",
        remarque: "Monographie fondatrice de l'analyse du travail de terrain à la SNCF, révélant les 14 difficultés invisibles et les régulations cognitives opératoires.",
      },
      {
        titre: "L'Établi",
        auteur: "Robert Linhart",
        annee: "1978",
        remarque: "Témoignage sociologique et clinique immersif sur le travail à la chaîne aux usines Citroën, illustrant l'amputation de la pensée par le cadençage externe.",
      },
      {
        titre: "Travail et pouvoir d'agir",
        auteur: "Yves Clot",
        annee: "2008",
        remarque: "Théorisation de la clinique de l'activité, de la dispute professionnelle et de la prescription de la subjectivité dans le néomanagement.",
      },
      {
        titre: "Souffrance en France : La banalisation de l'injustice sociale",
        auteur: "Christophe Dejours",
        annee: "1998",
        remarque: "Analyse psychodynamique de la démolition des collectifs de défense et de la vampirisation de la santé des travailleurs.",
      },
      {
        titre: "Malaise dans la civilisation",
        auteur: "Sigmund Freud",
        annee: "1930",
        remarque: "Le travail comme ancrage fondamental dans le principe de réalité et sublimation saine des pulsions libidinales et agressives.",
      },
      {
        titre: "Aurore : Pensées sur les préjugés moraux",
        auteur: "Friedrich Nietzsche",
        annee: "1881",
        remarque: "Aphorisme 173 : dénonciation du travail moderne comme 'la meilleure des polices' anesthésiant la liberté d'esprit.",
      },
      {
        titre: "Discours sur l'origine et les fondements de l'inégalité parmi les hommes",
        auteur: "Jean-Jacques Rousseau",
        annee: "1755",
        remarque: "L'arrachement à l'oisiveté de l'état de nature par l'avènement de la propriété privée et de la division sociale du travail.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST106 — COURS 3 : DU FACTEUR HUMAIN À L'ANALYSE DE L'ACTIVITÉ DE TRAVAIL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s3",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 3,
    titre: "Séance 3 — Du Facteur Humain à l'Analyse de l'Activité de Travail",
    sousTitre: "Relations humaines (Mayo, Maslow, Herzberg, McGregor, Lewin), Analyse ergonomique du travail (Wisner, couple prescrit/réel, Faverge, Leplat) & Psychopathologie du travail (Le Guillant, scission Cnam Dejours/Clot, Bobillier-Chaumon)",
    enseignant: "Pr. Christine LAGABRIELLE (Professeure émérite UT2J, Le Travail Humain, AIPTLF)",
    dateSeance: "28 octobre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 52 min (Webconférence en direct)",
    resumeExecutif: [
      "Déplacement épistémologique majeur : La séance retrace l'évolution de la psychologie du travail en 3 grands mouvements : 1) Passage du modèle taylorien (l'ouvrier adapté à la machine) à l'École des Relations Humaines (prise en compte du facteur humain et des besoins psychosociaux) ; 2) Essor de l'Ergonomie francophone et de la Psychologie cognitive du travail (analyse du travail réel, écart prescrit/réel, modèle des 5 carrés de Leplat) ; 3) Naissance de la Psychopathologie du travail (Louis Le Guillant) et de la Clinique de l'activité (Yves Clot), concevant le travail comme condition sociale et opérateur de santé.",
      "L'École des Relations Humaines et l'Effet Hawthorne : Elton Mayo (1927-1932 à la Western Electric) démontre dans le Test Room que la productivité augmente de 20% indépendamment des variations matérielles (pauses, salaires, éclairage). Découverte capitale de l'Organisation Informelle et des normes de groupe tacites. L'effet Hawthorne prouve que l'attention portée aux salariés et la reconnaissance de leur existence transforment leur engagement. Citation de Mayo (1945) : l'instinct humain d'association l'emporte sur le simple intérêt financier individuel.",
      "Théories de la motivation et critique des dogmes managériaux : Pr. Lagabrielle martèle : 'On ne motive pas les personnes ! L'organisation crée des conditions, et c'est l'individu qui se motive'. Réfutation de la causalité béhavioriste linéaire au profit d'un processus dynamique et de la théorie de l'équité (Adams). Abraham Maslow : hiérarchie relative des besoins (organiques, sécurité, appartenance, estime, réalisation de soi) ; mise au point : Maslow n'a jamais dessiné de pyramide (vulgarisation commerciale), et la hiérarchie est réfutée dans le travail contemporain (ubérisation, artistes). Frederick Herzberg : théorie bi-factorielle des incidents critiques réfutant l'axe continu unique ; les facteurs d'hygiène/extrinsèques (salaire, ambiance, sécurité) ne font que réduire l'insatisfaction (effet de courte durée), tandis que seuls les facteurs moteurs/intrinsèques (responsabilité, contenu du travail, reconnaissance, accomplissement) créent une satisfaction durable. Douglas McGregor : dénonciation de l'idéologie managériale implicite opposant la Théorie X (homme paresseux à surveiller et contraindre) à la Théorie Y (l'effort est naturel, responsabilité par adhésion aux objectifs et autocontrôle). Kurt Lewin : dynamique des groupes, champ de forces (forces motrices vs restrictives), changement en 3 étapes (décristallisation, transition, recristallisation), expérience des abats de 1943 (3% par cours magistral vs 30% par décision de groupe) et 3 styles de leadership (autocratique, démocratique, laissez-faire).",
      "L'Ergonomie Francophone et le Paradoxe Prescrit / Réel : Alain Wisner (Cnam) inverse la perspective : 'adapter le travail à l'homme et non l'homme au travail'. Démarche d'intervention in situ par l'observation et la verbalisation des opérateurs. Le couple central : Travail Prescrit (ce qui est exigé par l'organisation) vs Travail Réel (ce qui est effectivement déployé pour faire face à la résistance du monde). Le paradoxe ergonomique : l'écart n'est pas une faute mais une condition de santé et d'efficacité révélant l'ingéniosité de l'opérateur ; pourtant, dans la pratique, l'opérateur s'épuise à combler le fossé entre prescrit et réel, parfois par des transgressions dangereuses.",
      "Composantes du travail et Modèle des 5 Carrés de Leplat : Jean-Marie Faverge (1955) dégage 4 composantes universelles de tout travail : motrices, informationnelles, régulatoires et intellectuelles. Jacques Leplat fonde la psychologie ergonomique cognitive : l'opérateur n'exécute pas la tâche prescrite, il élabore une 'tâche redéfinie/remodelée' guidée par ses représentations mentales et sa cognition. Le schéma des 5 carrés (Conditions externes + Conditions internes -> Activité -> Effets sur le système + Effets sur l'opérateur) et le mécanisme de la double régulation (régulation interne vers le sujet vs régulation externe vers la tâche).",
      "Louis Le Guillant, Psychopathologie du travail et Histoire du Cnam : Psychiatre pionnier des années 1950, Louis Le Guillant pose que le travail est avant tout une 'condition sociale' inscrite dans des rapports de pouvoir et de domination. Études cliniques majeures : névrose des téléphonistes (les chaînes opératoires envahissent la vie hors travail), asthénie des conducteurs de train (solitude, vigilance extrême, vacma), et condition des bonnes à tout faire (le crime des sœurs Papin). Ouvrage 'Le drame humain du travail' préfacé par Yves Clot. Histoire de la chaire au Cnam : de Jules Amar, Piéron, Bonnardel, Bize, à Pierre Goguelin (création de la chaire en 1977 et du titre RNCP), la crise d'identité de la profession, la succession de 1990 (scission Dejours / Clot), et l'arrivée en 2018 de Marc-Éric Bobillier-Chaumon (clinique des usages, technologies numériques et IA).",
      "Consignes officielles & Déontologie : Pr. Lagabrielle invite à participer au webinaire national du CNCDP (déontologie des psychologues) début novembre, à lire la leçon inaugurale de Marc-Éric Bobillier-Chaumon (dès la minute 33), et à traiter en option l'étude de cas sur la fabrication de pyjamas (Harwood / Coch & French 1948) pour préparer le présentiel.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — 2 questions au choix",
      optionsAuChoix: [
        "Option 1 : Dissertation théorique rédigée (mobiliser concepts clés, filiations du Cnam, et confronter les paradigmes : ergonomie francophone, psychopathologie et clinique de l'activité).",
        "Option 2 : Analyse clinique d'une situation de travail avec texte support (analyser les écarts prescrit/réel, la double régulation de Leplat, les régulations de l'opérateur et les impacts sur la santé).",
      ],
      recommandationsNotation: "Pr. Lagabrielle insiste à nouveau : bannir les opinions vagues et le 'bon sens'. 'Nos outils de psychologue sont les concepts scientifiques !' Elle valorise la précision des citations (Mayo 1945, Leplat, Wisner, Le Guillant), la maîtrise du schéma des 5 carrés et la lucidité sur les rapports de domination organisationnels.",
    },
    consignesOralesProf: [
      {
        titre: "Étude de cas d'application : Résistance au changement dans la confection textile (Harwood / Coch & French 1948)",
        typeTravail: "exercice_ad",
        consigneExacte: "Analyser l'étude de cas proposée à la fin du support officiel (expérience menée auprès d'ouvrières dans une usine de pyjamas à Harwood). Répondre aux questions d'analyse : comment expliquer la chute brutale puis le rétablissement de la productivité selon les modalités de participation ? Mobiliser les concepts de Kurt Lewin (champ de forces, participation vs autorité) et d'Elton Mayo (normes de groupe informelles).",
        echeance: "Avant la séance présentielle de régulation",
        modaliteRendu: "Travail individuel préparatoire facultatif mais recommandé pour le débriefing en atelier.",
        recommandationsProf: "Bien observer le contraste : l'imposition descendante d'une nouvelle méthode suscite agressivité, démissions et baisse de cadence ; la participation active des ouvrières à la conception des nouveaux postes rétablit la norme de groupe et élève la productivité.",
        lienAdId: "pst106-ad4-harwood",
      },
      {
        titre: "Écoute de la Leçon Inaugurale du Pr. Marc-Éric Bobillier-Chaumon au Cnam",
        typeTravail: "lecture",
        consigneExacte: "Écouter la conférence inaugurale prononcée par Marc-Éric Bobillier-Chaumon lors de son installation à la Chaire de Psychologie du Travail du Cnam (succédant à Yves Clot). Aller directement à la minute 33 pour écouter son analyse de la 'clinique des usages' et des impacts des nouvelles technologies (logiciels, robots, IA) sur l'activité réelle des salariés.",
        echeance: "Au cours du semestre",
        modaliteRendu: "Prise de notes personnelles pour enrichir les conclusions de dissertation d'examen.",
        recommandationsProf: "Repérer comment les nouveaux outils informatiques redéfinissent le travail et comment la clinique de l'activité s'empare des mutations numériques contemporaines.",
      },
      {
        titre: "Participation au Webinaire du CNCDP sur les dilemmes déontologiques des psychologues",
        typeTravail: "recherche",
        consigneExacte: "Assister au webinaire organisé par le Comité National Consultatif de Déontologie des Psychologues (CNCDP) le 5 ou 6 novembre de 19h30 à 21h00. Thème : les dilemmes déontologiques rencontrés dans l'exercice professionnel des psychologues du travail et enseignants-chercheurs.",
        echeance: "5-6 novembre (inscription obligatoire avant le 2 novembre)",
        modaliteRendu: "Participation libre en ligne (webinaire gratuit).",
        recommandationsProf: "Ressource capitale pour votre future posture de clinicien : savoir repérer les conflits entre respect de la personne, secret professionnel et commandes institutionnelles d'entreprises.",
      },
      {
        titre: "Maîtrise par cœur du Schéma des 5 Carrés de Jacques Leplat & de la Double Régulation",
        typeTravail: "recherche",
        consigneExacte: "Apprendre par cœur la structure intégrale du modèle de Leplat : Conditions externes de la tâche + Conditions internes de l'opérateur -> Activité -> Effets sur le système + Effets sur l'opérateur. Maîtriser les deux boucles de régulation (interne vers le sujet, externe vers la tâche). Ce schéma sera retravaillé en séance présentielle à Bordeaux.",
        echeance: "Séance présentielle d'Analyse du Travail",
        modaliteRendu: "Restitution graphique sans faute lors des exercices de cas cliniques.",
        recommandationsProf: "Ne confondez pas conditions externes (contraintes de départ de la tâche) et conséquences sur le système (résultats de l'activité). L'activité est le nœud central où s'opèrent les compromis de santé.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "L'École des Relations Humaines, Dynamique de Groupe et Théories de la Motivation",
        points: [
          {
            titre: "Elton Mayo et les expériences de Hawthorne (1927-1932)",
            contenu: "Menées dans l'usine Western Electric de Chicago, ces recherches débutent sur les effets de l'éclairage et des conditions matérielles. Dans l'atelier de montage de relais (Relay Assembly Test Room), six ouvrières volontaires sont isolées. Les chercheurs font varier les pauses, collations, salaires et horaires, puis suppriment tous les avantages pour revenir à la situation initiale. Résultat spectaculaire : la productivité augmente de 20% sur un an, quel que soit le sens des variations.",
            auteurs: [
              "Elton Mayo (1927-1932)",
            ],
            conceptsCles: [
              "Test Room",
              "Hawthorne",
              "Conditions de travail",
              "Facteurs psychosociaux",
            ],
          },
          {
            titre: "L'Effet Hawthorne et la découverte de l'organisation informelle",
            contenu: "L'effet Hawthorne désigne l'amélioration des attitudes et de la productivité résultant de l'attention bienveillante portée aux travailleurs par les observateurs et la hiérarchie. L'expérience révèle l'existence d'une organisation sociale informelle en parallèle de l'organigramme officiel : les ouvrières construisent des normes de groupe tacites (régulation collective de la production pour maintenir un volume égal sans que la hiérarchie ne s'en aperçoive).",
            auteurs: [
              "Elton Mayo (1945)",
            ],
            conceptsCles: [
              "Effet Hawthorne",
              "Organisation informelle",
              "Normes de groupe tacites",
              "Instinct d'association",
            ],
          },
          {
            titre: "Mise au point épistémologique : 'On ne motive pas les personnes !'",
            contenu: "Pr. Lagabrielle réfute vigoureusement le dogme managérial du conditionnement linéaire : on ne motive pas autrui. L'organisation peut seulement créer des conditions potentiellement stimulantes, et c'est l'individu qui se motive ou non. La motivation est un processus complexe, dépendant du sens et de l'équité perçue (Théorie de l'équité d'Adams : si un salarié s'estime sous-rétribué par rapport à ses pairs, il réduit son investissement).",
            auteurs: [
              "John Stacey Adams (1963)",
              "Christine Lagabrielle (2026)",
            ],
            conceptsCles: [
              "Conditions motivantes",
              "Processus complexe",
              "Théorie de l'équité",
            ],
          },
          {
            titre: "Abraham Maslow : hiérarchie des besoins et déconstruction de la pyramide",
            contenu: "Maslow (1954) modélise l'être humain comme un organisme luttant pour actualiser son potentiel à travers 5 niveaux de besoins : physiologiques, sécurité, appartenance, estime, et réalisation de soi (self-actualisation). Mise au point d'examen : Maslow n'a jamais dessiné de pyramide (vulgarisation commerciale). De plus, la hiérarchie rigide est démentie : des artistes sacrifient leur sécurité pour créer, tandis que des salariés choisissent la fonction publique pour la sécurité au détriment de l'estime.",
            auteurs: [
              "Abraham Maslow (1954)",
            ],
            conceptsCles: [
              "Hiérarchisation des besoins",
              "Actualisation de soi",
              "Démystification de la pyramide",
            ],
          },
          {
            titre: "Frederick Herzberg : la théorie bi-factorielle et la méthode des incidents critiques",
            contenu: "Par l'étude des incidents critiques, Herzberg démontre que satisfaction et insatisfaction ne sont pas les pôles d'un axe unique continu. 1) Facteurs d'hygiène / extrinsèques (salaire, bruit, conditions matérielles, relations hiérarchiques) : leur dégradation suscite une vive insatisfaction, mais leur optimisation ne produit qu'une 'non-insatisfaction' sans motivation durable ; 2) Facteurs moteurs / intrinsèques (responsabilité, contenu du travail, reconnaissance, accomplissement, progression) : seuls capables d'engendrer un engagement durable. D'où l'enrichissement vertical des tâches.",
            auteurs: [
              "Frederick Herzberg (1968)",
            ],
            conceptsCles: [
              "Théorie bi-factorielle",
              "Facteurs d'hygiène",
              "Facteurs moteurs",
              "Enrichissement vertical",
            ],
          },
          {
            titre: "Douglas McGregor : Théorie X versus Théorie Y",
            contenu: "McGregor (1960) révèle les postulats implicites gouvernant la formation des dirigeants. Théorie X (vision taylorienne négative) : l'homme est paresseux, évite l'effort, fuit les responsabilités et doit être surveillé, contraint et sanctionné. Théorie Y (vision humaniste) : l'effort est aussi naturel que le jeu, l'homme recherche les responsabilités s'il adhère aux buts de son organisation, et l'autocontrôle remplace la menace.",
            auteurs: [
              "Douglas McGregor (1960)",
            ],
            conceptsCles: [
              "Théorie X",
              "Théorie Y",
              "Idéologies de direction",
              "Autocontrôle",
            ],
          },
          {
            titre: "Kurt Lewin : dynamique de groupe, champ de forces et styles de leadership",
            contenu: "Lewin analyse l'organisation comme un champ dynamique de forces (forces motrices vs forces restrictives). Pour changer, il est plus efficace de réduire les freins que d'augmenter la contrainte. Le changement se fait en 3 étapes : Décristallisation (unfreezing), Transition (moving), Recristallisation (refreezing). L'expérience des abats de 1943 prouve la supériorité de la décision de groupe (30% d'adoption) sur le cours magistral (3%). 3 styles de leadership : autocratique, démocratique, laissez-faire.",
            auteurs: [
              "Kurt Lewin (1943, 1948)",
            ],
            conceptsCles: [
              "Champ de forces",
              "3 étapes du changement",
              "Expérience des abats",
              "Styles de leadership",
            ],
          },
          {
            titre: "Bilan critique de l'École des Relations Humaines",
            contenu: "Bien qu'ayant réhabilité le facteur humain, ce courant pèche par une vision angélique et unifiante de l'entreprise : il occulte que l'organisation est un lieu de domination, de rapports de pouvoir et de conflits d'intérêts irréductibles entre capital et travail. Enfin, tout comme le taylorisme, il ignore le TRAVAIL RÉEL et la résistance des situations concrètes.",
            conceptsCles: [
              "Consensus mou",
              "Rapports de domination",
              "Occultation du travail réel",
            ],
          },
        ],
      },
      {
        numero: "2",
        titre: "L'Ergonomie Francophone, l'Analyse du Travail & la Psychologie Cognitive",
        points: [
          {
            titre: "Alain Wisner et l'acte de naissance de l'ergonomie francophone",
            contenu: "Médecin et physiologiste au Cnam, Alain Wisner fonde l'ergonomie de langue française. Discipline pluridisciplinaire (physiologie, médecine, psychologie, sociologie) visant la transformation concrète des situations de travail (outils, postes, rythmes). Inversion historique : on passe de l'adaptation de l'homme au travail (sélection taylorienne) à l'adaptation du travail à l'homme.",
            auteurs: [
              "Alain Wisner",
            ],
            conceptsCles: [
              "Ergonomie francophone",
              "Pluridisciplinarité",
              "Adapter le travail à l'homme",
              "Transformation",
            ],
          },
          {
            titre: "Le couple Travail Prescrit / Travail Réel et le Paradoxe Ergonomique",
            contenu: "Le travail prescrit définit ce qui doit être fait (procédures, temps, règles). Le travail réel est ce qui est effectivement déployé face aux aléas imprévus du milieu. Le Paradoxe Ergonomique : en théorie, les ergonomes font l'éloge de l'écart car il atteste de la créativité et préserve la santé de l'opérateur ; mais en pratique, l'opérateur s'épuise à combler le fossé entre prescrit et réel, parfois par des clandestinités et transgressions dangereuses.",
            conceptsCles: [
              "Travail prescrit",
              "Travail réel",
              "Écart structurel",
              "Paradoxe ergonomique",
              "Transgression",
            ],
          },
          {
            titre: "Jean-Marie Faverge : les 4 composantes universelles de tout travail",
            contenu: "Ombredane et Faverge publient en 1955 'L'Analyse du Travail'. Démarche rigoureuse : analyse de la demande, de la situation, de la tâche, puis de l'activité. Faverge identifie 4 composantes universelles à toute activité humaine : 1) Motrices (postures, gestes) ; 2) Informationnelles (signaux, lecture d'indices) ; 3) Régulatoires (gestion des compromis, contrôle des aléas) ; 4) Intellectuelles (raisonnement, mémoire, anticipation).",
            auteurs: [
              "Jean-Marie Faverge & André Ombredane (1955)",
            ],
            conceptsCles: [
              "Composantes motrices",
              "Informationnelles",
              "Régulatoires",
              "Intellectuelles",
            ],
          },
          {
            titre: "Jacques Leplat et la Psychologie Ergonomique Cognitive",
            contenu: "Jacques Leplat (1921-2023) développe l'approche cognitive du travail : l'opérateur est un sujet cognitif actif qui traite des informations et élabore des représentations mentales. Face à la tâche prescrite, il construit une 'tâche redéfinie' (ou remodelée) en fonction de son expérience, de sa fatigue et de ses critères propres avant de déployer son activité réelle.",
            auteurs: [
              "Jacques Leplat",
            ],
            conceptsCles: [
              "Sujet cognitif",
              "Tâche prescrite",
              "Tâche redéfinie",
              "Activité réelle",
            ],
          },
          {
            titre: "Le Schéma des 5 Carrés de Jacques Leplat",
            contenu: "Modèle incontournable d'analyse ergonomique : 1) Conditions externes de la tâche (consignes, environnement, cadences, statut) + 2) Conditions internes de l'opérateur (âge, santé, compétences, représentations) couplées ensemble déterminent 3) L'Activité Réelle. Cette activité engendre 4) Des Effets sur le système (performance, qualité, rebuts, pannes évitées) et 5) Des Effets sur l'opérateur (fatigue, satisfaction, usure, apprentissage).",
            auteurs: [
              "Jacques Leplat & Jean-Marie Hoc (1983)",
            ],
            conceptsCles: [
              "Schéma des 5 carrés",
              "Conditions externes",
              "Conditions internes",
              "Effets système / opérateur",
            ],
          },
          {
            titre: "Le mécanisme de la Double Régulation de Leplat",
            contenu: "L'activité s'ajuste par deux boucles rétroactives interactives : 1) La régulation interne (orientée vers le sujet) : ajuste les modes opératoires et l'effort pour préserver l'intégrité physique et psychique face aux exigences ; 2) La régulation externe (orientée vers la tâche) : rétroaction des résultats obtenus sur les conditions organisationnelles et matérielles de départ.",
            auteurs: [
              "Jacques Leplat",
            ],
            conceptsCles: [
              "Double régulation",
              "Régulation interne",
              "Régulation externe",
              "Boucle de rétroaction",
            ],
          },
        ],
      },
      {
        numero: "3",
        titre: "Psychopathologie du Travail, Santé & Histoire de la Chaire au Cnam",
        points: [
          {
            titre: "Louis Le Guillant et le travail comme 'Condition Sociale'",
            contenu: "Psychiatre pionnier, Louis Le Guillant (1900-1968) démontre que le travail n'est pas qu'une suite de gestes ou une tâche technique : c'est avant tout une CONDITION SOCIALE inscrite dans des rapports d'autorité, de domination et de subordination. Cette structuration sociale pénètre profondément l'appareil psychique et conditionne la santé mentale.",
            auteurs: [
              "Louis Le Guillant",
            ],
            conceptsCles: [
              "Condition sociale",
              "Rapports de domination",
              "Subordination",
              "Santé mentale",
            ],
          },
          {
            titre: "Les grandes études cliniques de Le Guillant (Téléphonistes, Cheminots, Sœurs Papin)",
            contenu: "1) 'La névrose des téléphonistes' : les cadences et automatismes envahissent la vie familiale hors travail (décrocher machinalement au foyer, automatismes nocturnes). Distinction travail intense vs travail intensifié ; 2) 'L'asthénie des conducteurs de train' : solitude en cabine, hypervigilance et aliénation du dispositif VACMA ; 3) 'Le crime des sœurs Papin' : massacre de leurs patronnes au Mans en 1933. Confrontation de l'analyse psychopathologique de Le Guillant (servitude absolue de la condition de bonne à tout faire) avec l'analyse lacanienne (délire paranoïaque à deux). Ouvrage 'Le drame humain du travail' (préfacé par Yves Clot).",
            auteurs: [
              "Louis Le Guillant",
              "Yves Clot",
            ],
            conceptsCles: [
              "Névrose des téléphonistes",
              "Asthénie des cheminots",
              "VACMA",
              "Sœurs Papin",
              "Drame humain du travail",
            ],
          },
          {
            titre: "Tension dialectique : le travail entre opérateur de santé et source de souffrance",
            contenu: "Le travail est habité par une contradiction réelle : il est à la fois opérateur de santé (ingéniosité, sociabilité, réalisation de soi) et destructeur de santé (aliénation, souffrance, psychopathologie). La Clinique de l'activité (Yves Clot) affronte ces contradictions sans les éluder, pour restaurer le pouvoir d'agir des collectifs et soigner le travail plutôt que de culpabiliser l'individu.",
            auteurs: [
              "Yves Clot",
              "Christophe Dejours",
            ],
            conceptsCles: [
              "Opérateur de santé",
              "Destructeur de santé",
              "Pouvoir d'agir",
              "Contradictions réelles",
            ],
          },
          {
            titre: "Filiation institutionnelle des Chaires au Cnam (1914 - 2026)",
            contenu: "Du laboratoire de physiologie de Jules Amar (1914), à Henri Laugier et Lahy (fondateurs du Travail Humain en 1933), puis Henri Piéron, Raymond Bonnardel et Paul-René Bize. En 1977, Pierre Goguelin crée officiellement la Chaire de Psychologie du Travail et le Diplôme d'État de Psychologue du Travail. Crise identitaire : tension entre psychotechniciens, psychosociologues et cliniciens.",
            auteurs: [
              "Pierre Goguelin",
              "Jean-Marie Lahy",
              "Henri Piéron",
            ],
            conceptsCles: [
              "Chaire du Cnam (1977)",
              "Titre de Psychologue du Travail",
              "Crise d'identité",
            ],
          },
          {
            titre: "La scission de 1990 au Cnam : Dejours vs Huteau et naissance du CRTD",
            contenu: "En 1990, pour succéder à Goguelin, deux courants s'affrontent : Michel Huteau (psychologie différentielle) vs Christophe Dejours (psychopathologie). Dejours l'emporte, provoquant la scission : Psychodynamique du travail (Dejours) d'un côté, et Clinique de l'activité (Yves Clot) de l'autre. En 2007, Yves Clot fonde le CRTD (Centre de Recherche sur le Travail et le Développement).",
            auteurs: [
              "Christophe Dejours",
              "Yves Clot",
              "Michel Huteau",
            ],
            conceptsCles: [
              "Scission de 1990",
              "Psychodynamique vs Clinique de l'activité",
              "CRTD (2007)",
            ],
          },
          {
            titre: "La Chaire contemporaine : Marc-Éric Bobillier-Chaumon et la Clinique des Usages",
            contenu: "En 2018, Marc-Éric Bobillier-Chaumon succède à Yves Clot à la Chaire de Psychologie du Travail du Cnam. Il développe la 'clinique des usages' appliquée aux technologies numériques, à la robotisation, à l'informatique et à l'IA. Il explore comment les nouveaux artefacts redéfinissent l'activité réelle, les collectifs de métier et la charge mentale des salariés.",
            auteurs: [
              "Marc-Éric Bobillier-Chaumon (2018)",
            ],
            conceptsCles: [
              "Clinique des usages",
              "Technologies numériques",
              "Robotisation",
              "Intelligence artificielle",
              "Santé",
            ],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau Comparatif des Grandes Théories de la Motivation au Travail",
        description: "Synthèse des modèles abordés en Séance 3 par Pr. Christine Lagabrielle",
        colonnes: [
          "Auteur & Courant",
          "Postulat Fondamental",
          "Mécanisme Moteur",
          "Facteurs Déterminants",
          "Limite Principale selon la Clinique",
        ],
        lignes: [
          {
            axe: "Elton Mayo (Relations Humaines)",
            valeurs: [
              "L'homme est un être social mû par des besoins affectifs d'association et d'intégration.",
              "Effet Hawthorne : l'attention bienveillante et l'écoute de l'encadrement augmentent la performance.",
              "Normes informelles du groupe, cohésion des pairs, reconnaissance affective.",
              "Vision harmonieuse idéalisée ; occulte les conflits d'intérêts et le travail réel.",
            ],
          },
          {
            axe: "Abraham Maslow (Psychologie Humaniste)",
            valeurs: [
              "L'organisme lutte pour actualiser son plein potentiel à travers une hiérarchie de besoins.",
              "Un besoin supérieur ne se manifeste que lorsque les besoins inférieurs sont assouvis.",
              "5 niveaux : physiologiques, sécurité, appartenance, estime, actualisation de soi.",
              "Hiérarchisation rigide démentie par la réalité (ex: artistes, précarité contemporaine, ubérisation).",
            ],
          },
          {
            axe: "Frederick Herzberg (Théorie Bi-factorielle)",
            valeurs: [
              "La satisfaction et l'insatisfaction sont deux dynamiques indépendantes et dissociées.",
              "Les facteurs d'hygiène réduisent l'insatisfaction ; seuls les facteurs moteurs motivent durablement.",
              "Hygiène : salaire, conditions, encadrement. Moteurs : responsabilité, contenu, autonomie, reconnaissance.",
              "Méthodologie critiquée (biais d'auto-attribution des succès et rejet des échecs sur le contexte).",
            ],
          },
          {
            axe: "Douglas McGregor (Théorie X / Théorie Y)",
            valeurs: [
              "Le style managérial découle des croyances implicites du dirigeant sur la nature humaine.",
              "Théorie X : l'homme paresseux doit être contraint. Théorie Y : l'homme recherche la responsabilité par adhésion.",
              "Autocontrôle, intégration des objectifs personnels et organisationnels, confiance.",
              "Risque d'injonction paradoxale à l'autonomie sans accorder les moyens réels du travail.",
            ],
          },
          {
            axe: "Kurt Lewin (Dynamique de Groupe)",
            valeurs: [
              "L'organisation est un champ dynamique de forces (forces motrices vs forces restrictives).",
              "Lever les résistances par la discussion de groupe est 10 fois plus efficace que l'injonction d'un expert.",
              "Participation démocratique, décision collective, étapes unfreezing -> moving -> refreezing.",
              "Ne prend pas en compte les contraintes physiologiques et cognitives des postes de travail.",
            ],
          },
        ],
      },
      {
        titre: "Tableau Comparatif des Paradigmes d'Analyse du Travail",
        description: "De la sélection des aptitudes à la clinique de l'activité",
        colonnes: [
          "Paradigme",
          "Pionniers au Cnam",
          "Conception de l'Homme",
          "Objet d'Étude Privilégié",
          "Finalité de l'Intervention",
        ],
        lignes: [
          {
            axe: "Psychotechnique classique (1910-1940)",
            valeurs: [
              "Jules Amar, Henri Laugier, Jean-Marie Lahy, Henri Piéron",
              "Homme-machine physiologique doté d'aptitudes mesurables à sélectionner.",
              "Aptitudes physiques, réflexes, temps de réaction, fatigue musculaire.",
              "Sélection et orientation professionnelle : 'the right man at the right place'.",
            ],
          },
          {
            axe: "Ergonomie francophone (1950-1970)",
            valeurs: [
              "Alain Wisner, André Ombredane, Jean-Marie Faverge",
              "Opérateur psychophysiologique devant faire face à la variabilité du réel.",
              "L'activité réelle in situ et l'écart irréductible avec la tâche prescrite.",
              "Transformation des postes et des outils : adapter le travail à l'homme.",
            ],
          },
          {
            axe: "Psychologie cognitive du travail (1970-1990)",
            valeurs: [
              "Jacques Leplat, Jean-Marie Hoc, Xavier Cuny",
              "Sujet cognitif traitant l'information, planifiant et construisant des représentations.",
              "La tâche redéfinie, les mécanismes mentaux, la double régulation interne/externe.",
              "Modélisation des processus mentaux et prévention systémique des accidents (Arbre des causes).",
            ],
          },
          {
            axe: "Psychopathologie du travail (1950-1980)",
            valeurs: [
              "Louis Le Guillant, Claude Veil",
              "Sujet social aliéné pris dans des rapports de pouvoir et de domination.",
              "La condition sociale, l'intensification du travail, la névrose professionnelle.",
              "Comprendre le drame humain du travail et dénoncer la subordination nocive.",
            ],
          },
          {
            axe: "Clinique de l'activité (1990-2026)",
            valeurs: [
              "Yves Clot, CRTD Cnam, Marc-Éric Bobillier-Chaumon",
              "Sujet historique, dialogique et désirant, luttant pour son pouvoir d'agir.",
              "Le réel de l'activité (l'empêché, le suspendu), le genre professionnel, le style.",
              "Relancer le pouvoir d'agir collectif et la controverse de métier par l'autoconfrontation.",
            ],
          },
        ],
      },
      {
        titre: "Filiation Historique des Directeurs et Titulaires de la Chaire au Cnam (1914 - 2026)",
        description: "Chronologie des successions et des évolutions de la chaire de psychologie du travail du Cnam",
        colonnes: [
          "Période",
          "Titulaire / Directeur",
          "Discipline & Titre",
          "Apport Fondateur au Cnam",
        ],
        lignes: [
          {
            axe: "1914 - 1928",
            valeurs: [
              "Jules Amar",
              "Laboratoire de physiologie du travail",
              "Ouvrage 'Le Moteur Humain' (1914), biomécanique, prothèses pour les mutilés de guerre.",
            ],
          },
          {
            axe: "1928 - 1938",
            valeurs: [
              "Henri Piéron & Jean-Marie Lahy",
              "INOP (INETOP) & Physiologie du travail",
              "Fondation de la revue 'Le Travail Humain' (1933), études sur les traminots, critique de l'OST.",
            ],
          },
          {
            axe: "1938 - 1957",
            valeurs: [
              "Raymond Bonnardel & Dr Paul-René Bize",
              "Psychotechnique & Médecine du travail",
              "Développement des tests psychométriques standardisés et de la sélection industrielle.",
            ],
          },
          {
            axe: "1957 - 1990",
            valeurs: [
              "Pierre Goguelin",
              "Chaire de Psychologie du Travail (1977)",
              "Création officielle de la Chaire en 1977 et du Diplôme d'État de Psychologue du Travail. Dynamique des groupes et formation des adultes.",
            ],
          },
          {
            axe: "1990 - 2007",
            valeurs: [
              "Christophe Dejours & Yves Clot",
              "Psychopathologie / Clinique du travail",
              "Scission historique de 1990 : Dejours (Psychodynamique) vs Clot (Clinique de l'activité). Création du CRTD en 2007 par Yves Clot.",
            ],
          },
          {
            axe: "2018 - Aujourd'hui",
            valeurs: [
              "Marc-Éric Bobillier-Chaumon",
              "Chaire de Psychologie du Travail du Cnam",
              "Clinique des usages, impact de la robotisation, des technologies numériques et de l'IA sur l'activité réelle et la santé.",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Piège 1 : 'Motiver les personnes' (Abus de langage managérial)",
        erreurCourante: "Écrire dans une copie que l'employeur ou le psychologue du travail a pour mission de 'motiver' les salariés par des primes ou des techniques de communication.",
        rectificationAttendue: "Rappeler la formule de Pr. Lagabrielle : 'On ne motive pas les personnes ! L'organisation crée des conditions, et c'est l'individu qui se motive ou non.' La motivation n'est pas un conditionnement réflexe béhavioriste mais un processus dynamique dépendant du sens de la tâche et de la justice organisationnelle (Adams).",
        contexte: "Sujets de dissertation sur le management, la reconnaissance ou les politiques de rémunération.",
      },
      {
        titre: "Piège 2 : La pyramide des besoins de Maslow",
        erreurCourante: "Affirmer que Maslow a dessiné la célèbre pyramide des besoins et que l'ordre des besoins est immuable.",
        rectificationAttendue: "Maslow n'a jamais dessiné de pyramide dans ses ouvrages de 1954 ! Il a théorisé une hiérarchisation relative des besoins. De plus, la psychologie du travail contemporaine prouve que cette hiérarchie est démentie au quotidien (artistes, précarité, fonction publique).",
        contexte: "Questions d'épistémologie et théories des besoins.",
      },
      {
        titre: "Piège 3 : La théorie bi-factorielle d'Herzberg (Hygiène vs Motivation)",
        erreurCourante: "Penser que la satisfaction et l'insatisfaction sont les deux extrémités opposées d'un même axe continu.",
        rectificationAttendue: "Satisfaction et insatisfaction sont deux dimensions indépendantes. Les facteurs d'hygiène (salaire, ambiance, sécurité) ne font que réduire l'insatisfaction (non-insatisfaction). Seuls les facteurs moteurs (responsabilité, autonomie, reconnaissance, intérêt du travail) génèrent de la satisfaction durable. L'inverse de l'insatisfaction n'est pas la satisfaction, mais l'absence d'insatisfaction !",
        contexte: "Questions sur la Qualité de Vie au Travail (QVT) et l'enrichissement des tâches.",
      },
      {
        titre: "Piège 4 : Le paradoxe ergonomique (Travail prescrit vs Travail réel)",
        erreurCourante: "Considérer l'écart entre le travail prescrit et le travail réel comme une erreur de l'opérateur ou un défaut d'organisation à éradiquer.",
        rectificationAttendue: "L'écart est structurel, indispensable et garant de la santé et de l'efficacité ! Le travail est un paradoxe : l'imprévu résiste à la règle. En théorie, l'ergonome salue cet écart révélateur de l'intelligence pratique ; en pratique, l'opérateur s'épuise à combler le fossé, parfois en transgressant les règles à ses risques et périls.",
        contexte: "Toute copie de PST106 abordant l'ergonomie francophone et l'analyse de poste.",
      },
      {
        titre: "Piège 5 : Travail prescrit vs Tâche redéfinie (Jacques Leplat)",
        erreurCourante: "Confondre la tâche prescrite par la direction avec ce que l'opérateur se représente dans sa tête avant d'agir.",
        rectificationAttendue: "Pour la psychologie ergonomique cognitive (Leplat), entre la tâche prescrite et l'activité réelle s'intercale la 'tâche redéfinie/remodelée' : le sujet cognitif réinterprète la consigne en fonction de son expérience, de ses buts propres et de ses contraintes internes.",
        contexte: "Analyse cognitive de la tâche et modèle des 5 carrés.",
      },
      {
        titre: "Piège 6 : Le Schéma des 5 Carrés et la Double Régulation (Leplat)",
        erreurCourante: "Dessiner le schéma des 5 carrés de mémoire en omettant les deux boucles de rétroaction.",
        rectificationAttendue: "Le jury Cnam pénalise l'absence des flèches de rétroaction. Il faut impérativement tracer : 1) La régulation interne (orientée vers l'opérateur pour préserver son état psychophysiologique) ; 2) La régulation externe (orientée vers la tâche pour adapter les exigences de production).",
        contexte: "Épreuve sur table : schémas et diagnostics de terrain.",
      },
      {
        titre: "Piège 7 : Louis Le Guillant et le travail comme 'Condition Sociale'",
        erreurCourante: "Réduire la psychopathologie du travail à des troubles psychologiques individuels préexistants ou à des dysfonctionnements relationnels de groupe.",
        rectificationAttendue: "Pour Le Guillant, le travail est une 'condition sociale' marquée par des rapports de pouvoir, d'autorité et de domination. L'intensification du travail pénètre la vie psychique hors du lieu de travail (névrose des téléphonistes, drame des sœurs Papin). La pathologie est dans le rapport social, pas dans le cerveau du travailleur !",
        contexte: "Questions sur la santé mentale, la souffrance au travail et l'histoire de la psychopathologie.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage et rappel : de la rationalisation du travail au facteur humain]
Voilà. Présents ? Est-ce que ça va depuis mercredi ? Très bien.
Alors, donc mercredi dernier, nous avons surtout parlé de rationalisation du travail. Nous avons parlé de standardisation. Nous avons parlé de mécanisation. Nous avons parlé d'émiettement du travail, de simplification des tâches. Et puis nous nous sommes arrêtés sur l'idée de l'appauvrissement de l'ouvrier au travail.
Et de la prise en compte progressive, ça commence un peu dans les années 20, puis dans les années 30 à 50. Donc 20, 30, 50, 60. J'ai tiré un peu vers les années 60 parce que ce que vous voulez peut-être avec Kurt Lewin, dans la mesure où on va aussi durant cette période voir un essor de la psychologie sociale.
Alors, avec la deuxième grande période, comme vous l'avez indiqué, on va prendre en compte le facteur humain, les mécanismes de fonctionnement du groupe et la satisfaction des besoins psychologiques. Et on va parler — ce ne sont pas les seuls, mais des plus célèbres que vous connaissez peut-être : Elton Mayo, Abraham Maslow, Frederick Herzberg et Douglas McGregor. Et un tout petit peu de Kurt Lewin.

[2. Citations introductives : Yves Clot et Christophe Dejours contre le réductionnisme taylorien]
Alors avant de commencer par Elton Mayo, peut-être ce qu'on peut rappeler : deux phrases très fortes.
D'abord, une phrase d'Yves Clot (citant Jacques d'Avout, 1993) : « Il n'y a de travail qu'humain, la machine est capable d'exécution, seul l'homme travaille et jamais comme une machine. »
Et puis Christophe Dejours, même si vous en parlerez plus dans l'UE qui est consacrée à la psychodynamique et la psychopathologie du travail, une citation de 1993 : « Travailler implique de tenir compte d'un monde plus complexe que le monde idéal prévu par les consignes. »
Ces deux citations résument la critique du réductionnisme porté sur le travail et l'aveuglement qu'il a pu y avoir sur les conditions réelles de travail à la fin du 19e siècle et au début du 20e siècle.

[3. L'organisation conçue comme un système vivant]
Dans cette histoire, on observe progressivement la naissance de l'intérêt pour une organisation qui est conçue comme un système vivant, intégré dans un environnement plus large, dont les parties constituantes — c'est-à-dire les employés — ont des besoins autres qu'exclusivement économiques.
Autrement dit, il y a d'autres modes de fonctionnement qui doivent se développer dans un environnement qui devient plus instable et compétitif, dans l'industrie, mais aussi l'aérospatiale, les techniques de pointe, etc.
La première idée, c'est que tout employé est un être humain qui a des besoins complexes qui doivent être satisfaits, pour qu'il puisse mener une vie saine d'abord, mais également agir de façon efficace au travail. Aujourd'hui, cette idée nous paraît évidente, elle va de soi. Nous savons que les personnes s'investissent quand les tâches qu'elles accomplissent les motivent, les intéressent, et que le processus même de la motivation repose sur la possibilité de réaliser des choses, ou d'obtenir des récompenses qui ne sont pas forcément pécuniaires, mais qui satisfont leurs besoins personnels.
C'était pourtant une idée très peu développée et peu commune au début du XXe siècle.
Les années 1950 vont ouvrir des thèmes de recherche centrés sur la communication non verbale, les effets du groupe sur l'individu, les phénomènes d'influence, les normes sur les groupes formels et informels, la vie affective des groupes, les styles d'autorité les plus efficaces et les mécanismes de prise de décision.
À partir des années 1930, la vision de l'homme au travail et de la structure dans laquelle il s'insère change de perspective.

[4. Elton Mayo et les expériences de Hawthorne à la Western Electric (1927-1932)]
Le courant dit des relations humaines, notamment avec les travaux d'Elton Mayo — qui est le père fondateur du courant des relations humaines —, se préoccupe des aspects individuels et relationnels au sein de l'organisation.
Ce courant prend naissance avec Elton Mayo, qui conduit de 1927 à 1932 dans un atelier de la Western Electric, dans la banlieue de Chicago (l'usine de Hawthorne), une série d'expériences destinées à étudier les conditions matérielles de travail et leurs incidences sur la fatigue et l'ennui chez les travailleurs.
Au départ, il s'agissait d'une commande industrielle classique pour étudier les liens entre éclairage, fatigue et productivité. Mais progressivement, les chercheurs vont étudier les rapports entre les travailleurs eux-mêmes et chercher à identifier leurs motivations réelles. Les chercheurs se sont penchés sur d'autres aspects qui relevaient davantage des préoccupations des employés.
L'expérience célèbre est restée sous le nom de Relay Assembly Test Room (atelier de montage de relais téléphoniques), lancée en 1927.
Un groupe de six ouvrières volontaires accepte d'être isolé dans une pièce à part de l'atelier pour poursuivre leur travail d'assemblage. On va modifier successivement un certain nombre de facteurs :
- Le système de salaire individuel et par équipe au rendement lié à la production du groupe,
- Les pauses durant le travail : une ou plusieurs pauses de durées différentes, avec ou sans collation offerte,
- L'aménagement des horaires de travail : réduction de la journée, suppression du travail le samedi matin,
- Et puis finalement, on supprime tous ces avantages et on retourne à la situation initiale stricte de départ.

[5. Réfutation de l'idéologie tayloriste et découverte de l'organisation informelle]
Or, que constatent les chercheurs ? À chaque changement, dans quelque sens que ce soit — y compris lors de la suppression des pauses et du retour aux horaires longs initiaux —, la productivité augmente ou plus rarement stagne !
Au total, à la fin de l'expérience qui a duré plus d'un an, on constate une augmentation globale de la productivité de 20 %.
Ce premier résultat fondamental réfute selon Mayo la philosophie tayloriste de l'intérêt strictement personnel et financier (l'homo economicus).
Et Mayo va rappeler en 1945 : « Le désir d'être bien avec ses collègues de travail, ce qu'on appelle l'instinct humain d'association, l'emporte facilement sur le simple intérêt individuel et la logique des raisonnements sur lesquels reposent de faux principes de direction. »
Les chercheurs mettent en évidence une corrélation directe de l'augmentation du rendement avec ce qui va être décrit comme le développement d'un groupe social organisé et une relation spéciale, bienveillante et efficace avec les superviseurs.
Dans les groupes s'est développée progressivement une organisation sociale informelle.
Ces travaux reconnaissent l'importance capitale des besoins d'ordre social sur les lieux de travail et l'existence d'une organisation informelle en parallèle de l'organisation formelle prescrite.
C'est avec le courant des relations humaines que l'informel prend vie scientifiquement : on se met à s'intéresser aux interactions affectives dans les petits groupes, aux relations qui ne sont pas prévues par l'organigramme.
Les facteurs sociaux — l'attention portée aux salariés, l'écoute de l'encadrement, la cohésion de l'équipe — influencent la performance bien plus que les seuls facteurs matériels ou économiques.

[6. L'effet Hawthorne et les normes de groupe informelles]
Grâce à cette expérience, on a montré que sur le lieu de travail existent des normes de groupe : c'est la fameuse organisation informelle qui structure les relations individuelles dans l'atelier en parallèle de l'organisation formelle.
Voilà le fameux « Effet Hawthorne » : l'idée que les salariés réagissent positivement au fait de faire l'objet d'observation et d'attention bienveillante de la part des chercheurs et de la direction, surtout lorsqu'ils occupent une position subalterne dans l'entreprise.
On retiendra deux éléments cruciaux de l'expérience du Test Room :
1. L'uniformité du niveau de production : bien qu'isolées et rémunérées au rendement, les ouvrières régulaient tacitement leur production pour produire un volume identique à celui des autres. Une norme informelle de groupe s'était construite, contraignant chacune à ne pas dépasser un plafond pour protéger les collègues les plus lentes et éviter un relèvement des quotas par la direction.
2. Chaque incident ou tension relationnelle provoquait un malaise immédiat qui se répercutait sur le niveau de production.
La vie de groupe a donc une influence déterminante sur la productivité de chacun.
Dans la lignée de ces travaux fondateurs, la psychosociologie a prouvé qu'on ne travaille pas uniquement pour l'argent : la reconnaissance, l'identification à l'entreprise, le sentiment d'appartenance, l'identification au produit fini (« être fier de produire un bel objet »), le contenu des tâches et le climat de travail sont des composantes essentielles de la motivation.
Ces conclusions ont inspiré le management participatif et de nouveaux systèmes de rétribution.

[7. Bilan critique de l'École des Relations Humaines : « On ne motive pas les personnes ! »]
Que retenir de l'École des relations humaines ? Chaque organisation doit avoir des objectifs, créer un produit et distribuer des satisfactions aux salariés, en donnant du sens à leur travail et en améliorant la cohésion de groupe, avec un management compréhensif et encourageant plutôt qu'autoritaire.
L'organisation doit tenir compte de l'aspect social et humain, et plus seulement mécanique et physique.
Mais attention : quelque chose me fait réagir quand je lis sur certains sites qu'on aurait les moyens « de motiver » les personnes.
Je le répète toujours : ON NE MOTIVE PAS LES PERSONNES ! C'est un abus de langage managérial. L'organisation peut seulement créer des conditions potentiellement motivantes, et c'est l'individu qui se motive ou non au sein de ces conditions.
La motivation n'est pas un schéma linéaire stimulus-réponse comme le postulait le béhaviorisme. C'est un processus complexe, inscrit dans des chaînes de comportement. Une prime salariale peut stimuler un travailleur si elle est perçue comme valorisante, ou le démotiver totalement s'il la perçoit comme inéquitable par rapport à ses pairs (Théorie de l'équité de John Stacey Adams : on se compare à ceux qui ont la même situation, et si on s'estime sous-payé pour le même travail, on réduit son investissement).

[8. Abraham Maslow : la hiérarchisation des besoins et la déconstruction de la pyramide]
Deuxième grande contribution : Abraham Maslow, psychologue humaniste qui a écrit ce livre célèbre sur la motivation et la personnalité (1954).
Attention, un piège classique : tout le monde parle de la « pyramide de Maslow ». Mais Maslow n'a jamais dessiné de pyramide dans ses écrits originaux ! Il a formalisé une hiérarchisation relative des besoins. La pyramide graphique est une récupération managériale et commerciale ultérieure.
Selon Maslow, l'être humain est un organisme psychique qui lutte pour satisfaire ses besoins dans le but d'atteindre son développement le plus complet possible (actualisation de soi).
Maslow postule que les besoins sont ordonnés de façon hiérarchique : un besoin supérieur ne se manifesterait pleinement que dans la mesure où les besoins inférieurs sont déjà satisfaits.

[9. Les 5 niveaux de besoins de Maslow et leurs limites dans le monde contemporain]
La hiérarchie comprend 5 catégories :
1. Les besoins physiologiques ou organiques (manger, boire, dormir, se loger, survivre).
2. Les besoins de sécurité (protection contre les dangers, sécurité de l'emploi, stabilité financière, santé).
3. Les besoins d'appartenance et d'affection (s'intégrer dans un groupe, être accepté par ses pairs, avoir des collègues solidaires).
4. Les besoins d'estime (estime de soi, confiance en ses compétences, et estime sociale : reconnaissance, prestige, respect d'autrui).
5. Les besoins de réalisation de soi (self-actualisation, accomplissement de son plein potentiel créatif et personnel, vocation).
Cette théorie a été sévèrement critiquée, notamment en psychologie du travail :
- La hiérarchisation stricte est démentie par les faits : un artiste peut délibérément sacrifier ses besoins de sécurité matérielle et de confort pour se consacrer à la réalisation de son œuvre. À l'inverse, des salariés choisissent la fonction publique pour garantir leur sécurité d'emploi même si le poste ne satisfait pas leur besoin d'estime ou leurs compétences.
- Dans le travail contemporain, avec l'ubérisation de l'économie et la précarité croissante, de nombreux travailleurs pauvres n'arrivent même plus à couvrir leurs besoins physiologiques de base malgré un travail acharné, et la promesse d'une carrière ascendante a volé en éclats.

[10. Frederick Herzberg : la théorie bi-factorielle des deux facteurs]
Troisième contribution majeure : les travaux de Frederick Herzberg et sa théorie bi-factorielle (théorie des deux facteurs).
Herzberg s'interroge sur la nature réelle de la satisfaction et de la motivation au travail.
Il utilise la méthodologie de l'enquête par incidents critiques : il demande à des centaines de salariés de décrire des situations professionnelles précises où ils se sont sentis exceptionnellement bien (sources de satisfaction), et des situations où ils se sont sentis exceptionnellement mal (sources d'insatisfaction).
Si la satisfaction était un continuum linéaire unique, on devrait retrouver les mêmes éléments sur cette ligne, oscillant entre très insatisfait et très satisfait.
Or, ce qu'Herzberg découvre est beaucoup plus tranché : les facteurs de satisfaction et les facteurs d'insatisfaction sont totalement polarisés et indépendants !
Il existe deux catégories distinctes de facteurs, qui ne jouent pas sur le même registre.

[11. Facteurs d'hygiène extrinsèques versus Facteurs de motivation intrinsèques]
D'un côté, il y a les Facteurs d'Hygiène (ou d'ambiance, de contexte, extrinsèques au travail) :
- Ce sont les conditions matérielles de travail, le bruit, la propreté, la température,
- Les relations avec l'encadrement et la politique générale de l'entreprise,
- Le salaire et les avantages sociaux,
- Les relations avec les pairs et collègues, la sécurité de l'emploi.
Ces facteurs sont massivement cités lors des situations d'insatisfaction.
Point fondamental : quand ces facteurs d'hygiène sont optimaux, ils ne rendent PAS les salariés satisfaits ni motivés ! Ils éliminent simplement l'insatisfaction. C'est un état de « non-insatisfaction ».
Exemple : vous supprimez le bruit gênant dans un open space, les gens ne vont pas sauter de joie, ils trouvent cela normal. Vous augmentez le salaire d'un employé, il sera moins insatisfait pendant quelques semaines, mais cela ne créera pas un engagement durable. Les facteurs d'hygiène n'ont qu'un effet homéostatique de courte durée.
De l'autre côté, il y a les Facteurs Moteurs (ou de contenu, intrinsèques au travail) :
- L'accomplissement personnel (achievement) et la réalisation de soi,
- La reconnaissance du travail bien fait et des compétences,
- L'intérêt propre du contenu du travail (la beauté et le sens de la tâche),
- Les responsabilités confiées et l'autonomie d'action,
- Les possibilités d'avancement professionnel et de développement personnel.
Ces facteurs décrivent la relation de l'homme avec CE QU'IL FAIT.
Ce sont les seuls facteurs capables d'engendrer une réelle satisfaction et des changements durables d'attitude et d'engagement !

[12. L'enrichissement des tâches et la réhabilitation de la subjectivité]
Concrètement, quand les salariés manifestent dans la rue ou se mettent en grève, c'est presque toujours sur des facteurs d'hygiène : le niveau de salaire, les effectifs, l'âge de départ en retraite, la sécurité de l'emploi.
Si une direction souhaite réduire l'insatisfaction, elle doit agir sur les facteurs d'hygiène (conditions, rémunération, climat).
Mais si elle souhaite développer la satisfaction et la motivation profonde, elle doit obligatoirement agir sur les facteurs moteurs : enrichir le contenu du travail, valoriser l'autonomie et reconnaître l'intelligence de métier.
D'où la proposition d'Herzberg : mettre en place l'Enrichissement Vertical des tâches (redonner aux exécutants des responsabilités de contrôle, de décision et de planification), à ne pas confondre avec l'élargissement horizontal taylorien (qui consiste à ajouter plusieurs tâches parcellisées et dénuées de sens).
Bien qu'Herzberg ait été critiqué (notamment sur le fait que certains facteurs de contexte peuvent aussi être gratifiants), son apport historique capital est d'avoir réhabilité la motivation intrinsèque et le contenu du travail, exclus à la fois par Taylor et par la première école des relations humaines.

[13. Douglas McGregor : la Théorie X versus la Théorie Y et les idéologies de direction]
Autre grand représentant : Douglas McGregor (The Human Side of Enterprise, 1960).
McGregor s'intéresse à la formation des dirigeants et des managers. Il constate que les comportements des managers ne dépendent pas des techniques apprises, mais des croyances implicites fondamentales qu'ils nourrissent sur la nature humaine au travail.
Il identifie deux visions opposées et dénonce les postulats sous-jacents :
1. La Théorie X (l'idéologie managériale traditionnelle tayloriste) :
- L'être humain moyen a une aversion innée pour le travail et l'effort, et fait tout pour les éviter.
- En conséquence, il faut le contraindre, le surveiller étroitement, le diriger avec autorité et le menacer de sanctions pour qu'il produise.
- L'individu moyen préfère être dirigé, fuit les responsabilités, a peu d'ambition et recherche avant tout la sécurité.
C'est une prophétie autoréalisatrice : en traitant les ouvriers comme des êtres irresponsables, on suscite des comportements passifs et contestataires.
2. La Théorie Y (l'approche humaniste et intégrative) :
- La dépense d'effort physique et mental au travail est aussi naturelle que le repos ou le jeu.
- Le contrôle externe et la menace de punition ne sont pas les seuls moyens de faire travailler les hommes : l'individu s'auto-dirige et s'auto-contrôle s'il est associé aux objectifs de son entreprise.
- L'engagement envers les objectifs dépend des récompenses associées à leur atteinte, en particulier la satisfaction de l'ego et des besoins de réalisation.
- Placé dans des conditions adéquates, l'individu moyen apprend non seulement à accepter mais à rechercher des responsabilités.
L'intérêt majeur de McGregor est d'avoir révélé que les styles de management sont fondés sur des idéologies philosophiques sur la nature humaine, et non sur une quelconque rationalité technique objective.

[14. Kurt Lewin : dynamique de groupe, champ de forces et résistance au changement]
J'ajoute les travaux de Kurt Lewin, père de la psychologie sociale moderne.
Pour Lewin, l'individu et son environnement constituent un champ dynamique de forces interdépendantes :
- Des forces propulsives (qui poussent au changement et à l'innovation),
- Des forces restrictives (qui freinent le processus de changement et maintiennent le statu quo).
Pour faire évoluer une organisation, il est beaucoup plus efficace de réduire les forces restrictives (lever les peurs, écouter les résistances) plutôt que d'augmenter brutalement la pression des forces propulsives (ce qui engendre des tensions explosives).
Lewin modélise le processus du changement en trois étapes canoniques :
1. La Décristallisation (unfreezing) : remise en question des habitudes, des normes et des certitudes acquises, prise de conscience de la nécessité de changer.
2. La Transition ou Déplacement (moving) : apprentissage de nouveaux modes de fonctionnement, expérimentation de nouveaux comportements et valeurs.
3. La Recristallisation (refreezing) : stabilisation et institutionnalisation des nouvelles pratiques, qui deviennent les nouvelles normes partagées du groupe.

[15. L'expérience des abats (1943) et les 3 styles de leadership de Lewin]
La célèbre expérience de Lewin en 1943 aux États-Unis l'illustre parfaitement.
L'objectif gouvernemental en temps de guerre était d'amener les ménagères américaines à cuisiner et consommer des abats (cœur, rognons) pour pallier la pénurie de viande noble.
Lewin compare deux méthodes auprès de groupes de femmes :
- Méthode 1 : Des conférences magistrales dispensées par des nutritionnistes réputés expliquant rationnellement les bienfaits diététiques des abats et distribuant des recettes. Résultat : seulement 3 % des ménagères ont ensuite cuisiné des abats chez elles !
- Méthode 2 : Des groupes de discussion animés où les ménagères débattent entre elles de leurs dégoûts, des réticences de leurs maris, échangent des astuces et prennent collectivement la décision de lever la main pour essayer. Résultat : 30 % des ménagères passent à l'acte et modifient durablement leur comportement culinaire !
Démonstration éclatante : on ne change pas les comportements par l'injonction descendante d'un expert, mais par la dynamique interactive et la prise de décision au sein du groupe de pairs.
En 1939-1948, Lewin, Lippitt et White mettent également en évidence trois styles de leadership :
- Le style autocratique (décisions imposées sans concertation, ordres stricts : crée tension, agressivité ou apathie),
- Le style laissez-faire (liberté totale sans cadre ni orientation : engendre anarchie, insatisfaction et inefficacité),
- Le style démocratique (décisions discutées en groupe, l'animateur encourage, facilite et explicite les critères : favorise la cohésion, l'autonomie et une performance durable).

[16. Bilan critique de l'École des Relations Humaines : l'occultation des rapports de pouvoir et du réel]
Bref, pour terminer sur ce courant des relations humaines, quelles sont ses avancées et ses limites ?
Certes, il a humanisé l'organisation et attiré l'attention sur les besoins sociaux et affectifs.
Mais il véhicule une vision profondément simplifiée et idéalisée de l'entreprise :
- Il présente l'organisation comme un ensemble harmonieux où les conflits ne seraient que des malentendus psychologiques réparables par une bonne communication.
- Il occulte que l'entreprise est un lieu structurel de domination, de rapports de pouvoir et de conflits d'intérêts économiques entre patrons et salariés.
- Et surtout, tout comme le taylorisme, l'école des relations humaines NE PREND TOUJOURS PAS EN COMPTE LE TRAVAIL RÉEL ! Elle ignore les imprévus, les arbitrages quotidiens, les ruses, les difficultés concrètes de l'activité opératoire, ce que le salarié doit inventer pour faire le travail prescrit.

[17. Histoire institutionnelle de la psychologie du travail au Cnam : des origines à Pierre Goguelin]
Voyons maintenant l'histoire de la discipline au Conservatoire National des Arts et Métiers (Cnam).
On passe progressivement de la physiologie du travail et de l'orientation professionnelle (avec Jules Amar et son laboratoire sur le travail professionnel en 1914, puis Henri Laugier et Jean-Marie Lahy créant Le Travail Humain en 1933) à la psychotechnique et la psychologie appliquée avec Henri Piéron (fondateur de l'INOP en 1928, devenu INETOP au Cnam).
Puis on évolue vers la psychologie différentielle et appliquée avec Raymond Bonnardel (orienté sélection industrielle), puis le Dr Paul-René Bize (médecin et psychologue du travail).
Arrive ensuite Pierre Goguelin, ingénieur et docteur en psychologie, figure majeure du Cnam. Tout en maintenant les missions traditionnelles d'adaptation et de sélection, Goguelin introduit des thèmes novateurs : la formation des adultes, la dynamique des groupes, les rapports entre l'homme et l'organisation, et l'implication au travail.
En 1977, Goguelin transforme ce qui n'était qu'un enseignement complémentaire en une véritable Chaire de Psychologie du Travail au Cnam, et obtient la même année la création officielle du Diplôme d'État de Psychologue du Travail reconnu par l'Éducation Nationale. Les effectifs explosent : 600 inscrits au départ, plus de 3 200 en 1977.

[18. La scission de 1990 au Cnam : Dejours vs Huteau et la création du CRTD par Yves Clot]
Une crise d'identité disciplinaire traverse alors la profession : opposition vive entre les psychotechniciens attachés aux tests quantitatifs, les psychosociologues centrés sur les groupes et le climat, et les cliniciens du travail.
Au départ de Pierre Goguelin en 1990, deux visions s'affrontent pour sa succession à la Chaire :
- Michel Huteau, tenant de la tradition française de psychologie différentielle et d'orientation,
- Christophe Dejours, médecin psychiatre et psychanalyste, venu de la médecine du travail, qui propose de renouveler la discipline par la psychopathologie du travail et la souffrance psychique (la future Psychodynamique du travail).
Christophe Dejours est nommé. Au sein du laboratoire du Cnam, l'équipe se scinde alors en deux sensibilités :
- Le courant de la Psychodynamique du travail (Christophe Dejours : souffrance, défenses, reconnaissance),
- Le courant de la Clinique de l'activité, animé par Yves Clot.
En 2007, Yves Clot fonde le CRTD (Centre de Recherche sur le Travail et le Développement) au Cnam, laboratoire de pointe dédié à l'activité humaine, au pouvoir d'agir et aux méthodes d'autoconfrontation.

[19. L'arrivée de Marc-Éric Bobillier-Chaumon au Cnam : la clinique des usages et les technologies]
Puis, plus récemment, en 2018, Marc-Éric Bobillier-Chaumon reprend la Chaire de Psychologie du Travail du Cnam (succédant à Yves Clot).
Professeur issu de l'Université de Lyon, spécialiste de la clinique de l'activité, Bobillier-Chaumon développe une nouvelle branche : la Clinique des Usages.
Il travaille sur l'impact de l'introduction massive des technologies numériques, de la robotisation, de l'intelligence artificielle et des logiciels de gestion sur le travail réel.
Il analyse comment ces nouveaux outils redéfinissent les gestes de métier, reconfigurent les collectifs et peuvent soit soutenir le pouvoir d'agir, soit intensifier la charge cognitive et isoler l'opérateur.
Je vous invite d'ailleurs vivement à écouter sa leçon inaugurale à la Chaire du Cnam (allez directement à la minute 33 pour son allocution).

[20. L'Ergonomie francophone (Alain Wisner) : adapter le travail à l'homme]
Nous arrivons maintenant à la troisième grande période historique, qui s'épanouit des années 1950 aux années 1970-1980 : le recentrage sur l'ACTIVITÉ RÉELLE DE TRAVAIL avec l'Ergonomie francophone et la Psychologie ergonomique.
Auteurs majeurs : Alain Wisner, Jean-Marie Faverge, Jacques Leplat, et Louis Le Guillant.
Commençons par Alain Wisner, médecin et physiologiste, figure tutélaire de l'ergonomie au Cnam (chaire d'ergonomie et neurophysiologie du travail).
L'ergonomie mobilise plusieurs disciplines (physiologie, médecine, psychologie, sociologie, ingénierie) avec un objectif central : la transformation concrète des situations de travail (outils, postes, rythmes, environnement).
C'est un art de l'intervention et de l'action de terrain, fondé sur l'observation in situ et la verbalisation simultanée ou consécutive des travailleurs.
Rupture paradigmatique totale : avec Taylor, l'homme devait s'adapter à la machine et à la tâche (« the right man at the right place »). Avec Wisner et l'ergonomie francophone, on inverse la logique : c'est le travail qui doit être adapté à la morphologie, à la physiologie et au fonctionnement psychologique de l'homme !

[21. Le couple Travail Prescrit / Travail Réel et le paradoxe ergonomique]
L'apport conceptuel le plus fondamental de l'ergonomie francophone est la distinction entre Travail Prescrit et Travail Réel :
- Le Travail Prescrit : c'est ce que l'organisation demande de faire (consignes formelles, modes opératoires, temps impartis, procédures qualité, règles de sécurité).
- Le Travail Réel : c'est ce que l'opérateur fait effectivement sur le terrain pour faire face à la réalité concrète et accomplir sa mission.
Le travail est un paradoxe ! L'organisation a beau tout prévoir et tout planifier avec soin, le travail réel résiste irréductiblement : les pièces ne sont pas exactement aux cotes, les logiciels beuguent, les matières premières varient, les clients ont des demandes imprévues, les collègues sont absents. Travailler consiste précisément à gérer ces imprévus.
D'où le Paradoxe Ergonomique :
Dans la théorie, les ergonomes valorisent cet écart : l'écart entre prescrit et réel est la preuve vivante de l'intelligence pratique, de la créativité et de la santé de l'opérateur. Si l'opérateur appliquait strictement le prescrit, l'usine s'arrêterait immédiatement (c'est la définition de la « grève du zèle » !).
Mais dans la pratique quotidienne, cet écart est une source permanente de tension et d'usure : les opérateurs fournissent des efforts considérables pour combler le fossé entre la prescription irréaliste et les contraintes du terrain. Parfois, pour réussir à faire le travail malgré tout, ils sont contraints d'employer des modes opératoires non autorisés, clandestins ou dangereux pour leur sécurité et leur santé !
Ce paradoxe est au cœur des préoccupations de la clinique de l'activité.

[22. Jean-Marie Faverge : démarche d'analyse et les 4 composantes de tout travail]
Deuxième grande figure : Jean-Marie Faverge, qui publie avec André Ombredane en 1955 l'ouvrage séminal L'Analyse du Travail, acte de naissance théorique de la discipline.
Faverge structure la démarche ergonomique de terrain :
1. Analyse de la demande,
2. Analyse de la situation globale,
3. Analyse de la tâche prescrite,
4. Analyse de l'activité réelle,
5. Diagnostic et recommandations de transformation.
Faverge démontre que tout travail humain — y compris le travail manuel le plus humble, comme celui du maçon — comporte 4 composantes universelles indissociables :
1. Des composantes motrices (postures corporelles, gestes, manipulation d'outils, déplacements),
2. Des composantes informationnelles (prise d'indices sensoriels, recueil et tri d'informations, lecture de signaux, dialogue machine),
3. Des composantes régulatoires (gestion des compromis temporels, régulation des incidents, contrôle des processus sous aléas),
4. Des composantes intellectuelles (raisonnement, anticipation, mémoire de travail, résolution de problèmes).
Même donner un cours magistral mobilise des composantes motrices (parler debout, gestuelle, maniement de l'ordinateur) autant qu'intellectuelles !

[23. Jacques Leplat : psychologie cognitive, tâche redéfinie et le schéma des 5 carrés]
Avec Jacques Leplat (1921-2023, qui nous a quittés récemment à 102 ans, ancien directeur de laboratoire au Cnam et de la revue Le Travail Humain), s'épanouit la Psychologie Ergonomique Cognitive.
Tandis que l'ergonomie vise la transformation directe des situations, la psychologie cognitive s'intéresse au fonctionnement mental de l'opérateur : comment il perçoit, mémorise, raisonne et traite l'information.
Face à la Tâche Prescrite (les objectifs officiels), Leplat met en évidence l'existence de la Tâche Redéfinie (ou tâche remodelée) : devant le réel, chaque opérateur reconstruit mentalement sa propre tâche en fonction de ses compétences, de son niveau de fatigue, de ses valeurs professionnelles et de son expérience.
Jacques Leplat formalise alors un modèle canonique, fondamental pour vos examens au Cnam : le Schéma des 5 Carrés.
Ce schéma articule cinq blocs interactifs :
1. Les Conditions Externes de la tâche (environnement physique, bruit, outils, procédures, cadences, statut, collectif),
2. Les Conditions Internes de l'opérateur (âge, morphologie, état de santé, compétences, représentations, fatigue),
3. L'Activité Réelle (le comportement opératoire effectif résultant du couplage permanent entre conditions internes et externes),
4. Les Effets sur le Système (résultats productifs, qualité des produits, quantité, incidents évités),
5. Les Effets sur la Personne (fatigue, satisfaction, santé, acquisition de compétences, ou usure et TMS).

[24. Le mécanisme de la double régulation selon Jacques Leplat]
Ce modèle des 5 carrés fonctionne grâce à un mécanisme de Double Régulation :
- La Régulation Interne (orientée vers le sujet) : boucle de rétroaction entre la représentation/planification mentale de la tâche et la réalisation de l'activité. L'opérateur adapte ses modes opératoires pour préserver son intégrité physique et psychique.
- La Régulation Externe (orientée vers la tâche) : boucle de rétroaction entre l'évaluation des résultats de l'activité et les conditions externes de départ. Les résultats obtenus amènent à réinterroger et modifier les consignes, les outils ou l'organisation du travail.
Dans les situations de travail complexes contemporaines saturées d'informations, les capacités des travailleurs peuvent être débordées, conduisant à des phénomènes de découplage ou de désajustement pathogènes.

[25. Louis Le Guillant et la psychopathologie du travail : le travail comme condition sociale]
Troisième contribution décisive de cette période : Louis Le Guillant (1900-1968), psychiatre pionnier et cofondateur de la psychopathologie du travail avec Claude Veil.
Tandis que l'ergonomie s'attachait surtout aux postes et à la fatigue physique, Le Guillant s'intéresse à la santé mentale et aux névroses déclenchées par l'organisation du travail.
Thèse cardinale de Le Guillant : Le travail humain n'est pas simplement une tâche technique ou une activité motrice. C'est avant tout une CONDITION SOCIALE !
L'activité ne se déroule jamais dans un vide social neutre : elle s'inscrit dans des rapports de pouvoir, d'autorité, de domination et de subordination.
Cette structuration sociale du travail pénètre en profondeur et contraint durablement la vie psychique du travailleur.

[26. Études cliniques de Le Guillant : téléphonistes, cheminots et le crime des sœurs Papin]
Louis Le Guillant mène des études cliniques célèbres :
1. « La névrose des téléphonistes » : il montre comment l'intensification du travail et le cadençage aux écouteurs pénètrent la vie intime des standardistes (« les demoiselles du téléphone »). Les opératrices emportent leurs chaînes opératoires chez elles : dès que leur téléphone sonne à la maison, elles décrochent machinalement avec les phrases codées du service ; certaines répètent des gestes de travail automatiques jusque dans leurs rêves ou en tirant une chasse d'eau !
Le Guillant distingue rigoureusement le travail intense (mobilisation ponctuelle stimulante et gratifiante) de l'intensification du travail (flux tendu imposé permanent qui détruit la santé psychique).
2. « L'asthénie des conducteurs de locomotives » : sollicité par un collectif de cheminots de la SNCF, il étudie l'épuisement mental des conducteurs de train sous l'effet de l'isolement en cabine, de la vigilance continue et de l'introduction de dispositifs techniques coercitifs comme la VACMA (Veille Automatique à Contrôle de Maintien d'Appui, le dispositif de vigilance où le conducteur doit appuyer régulièrement sur un bouton pour prouver qu'il n'est pas mort ou endormi).
3. La condition d'employée de maison et le crime des sœurs Papin (1933) : ces deux bonnes à tout faire au Mans qui ont massacré sauvagement leur patronne et la fille de celle-ci. Le Guillant confronte son analyse psychopathologique à celle de Jacques Lacan : là où Lacan analyse une bouffée délirante dans un délire à deux paranoïaque, Le Guillant démontre que le crime est l'explosion tragique de la condition sociale servile de « bonne à tout faire » — solitude totale, mépris de classe, subordination absolue sans statut ni reconnaissance.
Ces textes sont réunis dans l'ouvrage Le drame humain du travail, réédité avec une préface remarquable d'Yves Clot.

[27. Synthèse clinique : le travail comme opérateur de santé et source de souffrance]
En conclusion de cette séance historique :
Le travail présente une contradiction vivante :
- D'un côté, il est un puissant OPÉRATEUR DE SANTÉ : lieu d'ingéniosité, de créativité, de sociabilité, de fierté professionnelle et de construction identitaire (comme le montre l'ergonomie).
- De l'autre côté, il peut être un puissant DESTRUCTEUR DE SANTÉ : lieu de domination, de subordination, d'aliénation et de souffrance psychique (comme le montre la psychopathologie du travail).
La Clinique de l'activité (Yves Clot) ne choisit pas entre ces deux vérités : elle consiste précisément à affronter ces contradictions dans la réalité du travail pour développer le pouvoir d'agir des professionnels et soigner l'organisation plutôt que de médicaliser l'individu.

[28. Déontologie, webinaire de la CNCDP et perspectives pour le présentiel]
Quelques informations pratiques avant de nous quitter :
Le CNCDP (Comité National Consultatif de Déontologie des Psychologues) organise un webinaire en ligne le 5 ou 6 novembre de 19h30 à 21h00, gratuit, sur les dilemmes déontologiques dans l'exercice professionnel des psychologues du travail. Je vous invite vivement à vous y inscrire (avant le 2 novembre).
Pour la prochaine séance, nous approfondirons l'activité au sens de la clinique de l'activité (Yves Clot).
Révisez bien le schéma des 5 carrés de Leplat et les 4 composantes de Faverge : nous les reprendrons en présentiel à Bordeaux lors des exercices d'analyse de poste de travail.
Bonne soirée à tous et à mercredi prochain !`,
    bibliographieCitee: [
      {
        titre: "The Social Problems of an Industrial Civilization",
        auteur: "Elton Mayo",
        annee: "1945",
        remarque: "Ouvrage princeps théorisant l'importance de l'organisation informelle et de l'instinct humain d'association à Hawthorne.",
      },
      {
        titre: "Motivation and Personality",
        auteur: "Abraham Maslow",
        annee: "1954",
        remarque: "Formalisation de la hiérarchisation des besoins et de la tendance fondamentale à l'actualisation de soi.",
      },
      {
        titre: "One More Time : How Do You Motivate Employees ?",
        auteur: "Frederick Herzberg",
        annee: "1968",
        remarque: "Article séminal de la Harvard Business Review présentant la théorie bi-factorielle (hygiène vs motivation).",
      },
      {
        titre: "The Human Side of Enterprise",
        auteur: "Douglas McGregor",
        annee: "1960",
        remarque: "Ouvrage fondateur dévoilant les idéologies de direction implicites : Théorie X versus Théorie Y.",
      },
      {
        titre: "Forces behind Food Habits and Methods of Change",
        auteur: "Kurt Lewin",
        annee: "1943",
        remarque: "L'expérience historique des abats démontrant la supériorité de la décision collective sur le cours magistral descendant.",
      },
      {
        titre: "L'Analyse du Travail : Facteur d'Économie Humaine et de Productivité",
        auteur: "André Ombredane & Jean-Marie Faverge",
        annee: "1955",
        remarque: "Acte de naissance de l'ergonomie francophone et modélisation des 4 composantes de tout travail.",
      },
      {
        titre: "Le Développement de l'Ergonomie et la Pensée sur le Travail",
        auteur: "Alain Wisner",
        annee: "1972 / 1995",
        remarque: "Texte fondamental d'Alain Wisner sur l'inversion du paradigme : adapter le travail à l'homme.",
      },
      {
        titre: "Introduction à la Psychologie Ergonomique",
        auteur: "Jacques Leplat",
        annee: "1980 / 1990",
        remarque: "Théorisation du modèle des 5 carrés, de la tâche redéfinie et de la double régulation interne/externe.",
      },
      {
        titre: "Le Drame Humain du Travail : Essais de Psychopathologie du Travail",
        auteur: "Louis Le Guillant (Préface d'Yves Clot)",
        annee: "1984 / 2006",
        remarque: "Recueil des études cliniques majeures de Le Guillant (téléphonistes, cheminots, sœurs Papin) réédité aux éditions érès.",
      },
      {
        titre: "La Formation des Adultes et la Dynamique de Groupe",
        auteur: "Pierre Goguelin",
        annee: "1970 / 1977",
        remarque: "Travaux du fondateur de la Chaire de Psychologie du Travail du Cnam sur l'implication des hommes dans l'organisation.",
      },
      {
        titre: "Travail : Usure Mentale (De la psychopathologie à la psychodynamique du travail)",
        auteur: "Christophe Dejours",
        annee: "1980 / 1993",
        remarque: "Ouvrage pivot introduisant la psychodynamique du travail au Cnam lors de la succession de 1990.",
      },
      {
        titre: "Leçon Inaugurale à la Chaire de Psychologie du Travail du Cnam (Clinique des Usages)",
        auteur: "Marc-Éric Bobillier-Chaumon",
        annee: "2018",
        remarque: "Discours d'installation au Cnam analysant les mutations de l'activité réelle sous l'empire des technologies numériques, robots et IA.",
      },
    ],
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
      {
        titre: "Une autre approche du bien-être au travail : Coopération conflictuelle",
        auteur: "Yves Clot & Jean-Yves Bonnefond (MSF CRASH)",
        annee: "2021",
        remarque: "Conférence-débat vidéo : réfutation des démarches RPS gestionnaires et axiome « Pas de bien-être sans bien faire ».",
        url: "https://msf-crash.org/fr/rencontres-debats/une-autre-approche-du-bien-etre-au-travail",
      },
      {
        titre: "Le travail à cœur : Pouvoir d'agir et controverse professionnelle",
        auteur: "Yves Clot (UPtv / Filmer le travail)",
        annee: "2015",
        remarque: "Conférence vidéo : analyse du travail empêché et institution de la dispute professionnelle réglée.",
        url: "https://uptv.univ-poitiers.fr/program/rencontres-professionnelles-dans-le-cadre-de-filmer-le-travail-edition-2015/video/4684/le-travail-a-coeur/index.html",
      },
      {
        titre: "Jean Piaget et les stades de développement",
        auteur: "Jean Piaget (Archives CEEG Genève / YouTube)",
        annee: "Archive",
        remarque: "Vidéo d'expériences princeps : épreuves de conservation de la matière et du volume, égocentrisme préopératoire.",
        url: "https://www.youtube.com/watch?v=UEoqByYS9XY",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — COURS 2 : LES ACTES DE LANGAGE & CLINIQUE DU DIALOGUE (E. LUCY)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "id": "pst108-s2",
    "moduleKey": "pst108",
    "moduleLabel": "PST108",
    "numeroSeance": 2,
    "titre": "Séance 2 — Les Actes de Langage : Du Performatif à la Clinique du Travail",
    "sousTitre": "Philosophie du langage ordinaire (Austin, Searle), matrice des 5 actes, sémiotique (Stoïciens, Saussure) et critiques (Bourdieu, Habermas, Honneth)",
    "enseignant": "M. Éric LUCY (Cnam)",
    "dateSeance": "Semestre 1 — Webconférence enregistrée (Buzz Audio)",
    "format": "webconference",
    "dureeEnregistrement": "2 h 45 min 59 s",
    "resumeExecutif": [
      "Le paradoxe de Babel et le risque permanent de la parole : En s'appuyant sur le chef-d'œuvre de Pieter Bruegel l'Ancien (1563), M. Lucy pose le paradoxe fondateur du langage : ce qui rassemble les êtres humains est précisément ce qui les divise dans la mésentente. Parler du travail n'est jamais un simple échange d'informations neutres ; c'est prendre le risque d'être incompris et de transformer la situation vécue.",
      "Ancrage corporel, ritournelle et cognition : Le langage ne flotte pas dans l'éther : il s'ancre dans le corps et le cerveau (fonctions instrumentales et exécutives). À travers le concept de ritournelle de Gilles Deleuze (l'enfant chantonnant dans le noir pour se fabriquer un territoire et conjurer l'angoisse), M. Lucy montre que la parole est d'abord un rempart psychique. Les stades de Piaget (sensori-moteur, préopératoire, concret, formel) ne sont pas figés : confrontés à des progiciels opaques et à la fatigue au travail, les adultes régressent vers des manipulations sensori-motrices réflexes sans accès à la fonction symbolique.",
      "Discernement clinique : Lésion neuropsychologique ou travail empêché ? : Face aux blocages langagiers (perte des mots, hésitations, mutisme), le psychologue du travail doit impérativement distinguer une atteinte neuropsychologique organique (aphasie de Broca motrice ou aphasie de Wernicke sensorielle) d'une détresse organisationnelle. L'usure au travail, la dépression et les conflits de critères non réglés saturent les capacités cognitives et inhibent la parole.",
      "Histoire du signe : Des Stoïciens à Port-Royal et Ferdinand de Saussure : Les Stoïciens isolent dès l'Antiquité le signifiant sonore, le concept incorporel (lekton) et la chose réelle matérielle (tugchanon), coupant le monde du discours du monde physique. Au XVIIe siècle, la Grammaire de Port-Royal structure la proposition en Sujet + Prédicat. En 1916, Saussure formalise l'arbitraire social du signe (signifiant / signifié) et sépare l'axe syntagmatique (organisation horizontale in praesentia) de l'axe paradigmatique (sélection verticale in absentia).",
      "La rupture performative de John L. Austin (1962) : Réfutation de l'illusion descriptive des positivistes logiques. Parler, ce n'est pas seulement constater le monde (vrai/faux), c'est agir (Quand dire, c'est faire). Un performatif réussit s'il respecte les conditions de félicité : procédure conventionnelle, personnes habilitées et statut social (Status est magistratus : « Je vous arrête » n'a aucune efficacité sans insigne). Tripartition princeps : acte locutoire (dire), acte illocutoire (l'action accomplie en disant) et acte perlocutoire (les effets produits sur l'auditeur).",
      "La taxonomie des 5 actes de langage de John R. Searle (1969/1979) : Détermination de la direction d'ajustement (direction of fit) : Assertifs (mots → monde), Directifs (monde → mots, faire agir autrui), Promissifs (monde → mots, engagement futur du locuteur), Expressifs (sans direction, expression d'un état psychologique/moral), Déclaratifs (mots ↔ monde simultanément, création institutionnelle de la réalité). Dans les organisations, les actes indirects (ordres camouflés en formules de politesse) créent des doubles contraintes toxiques.",
      "Théories critiques du travail et perspectives contemporaines : Pierre Bourdieu (1982) dénonce l'illusion internaliste d'Austin : la force de la parole vient du capital symbolique et de l'institution, le langage fonctionnant comme un « marché linguistique » hiérarchisé. Jürgen Habermas oppose l'agir communicationnel (visée d'entente rationnelle) à l'agir stratégique managérial. Axel Honneth démontre que la privation d'actes expressifs et déclaratifs produit le mépris et l'invisibilité sociale. Enfin, les agents d'intelligence artificielle introduisent des actes de langage algorithmiques prescriptifs qui transforment le travail."
    ],
    "consignesOralesProf": [
      {
        "titre": "Activité Distante (AD) sur le Forum Moodle PST108",
        "typeTravail": "exercice_ad",
        "consigneExacte": "Consultez les exercices déposés sur l'espace Moodle PST108. Vous devez analyser des interactions de travail réelles et identifier : 1) La nature des actes de langage mobilisés selon la typologie de Searle ; 2) Les glissements entre actes directs et actes indirects ; 3) Les conditions de félicité ou d'infélicité institutionnelles (statut, mandat, légitimité) ; 4) Les zones de blocage clinique du dialogue.",
        "echeance": "Avant la prochaine séance synchrone (travail asynchrone sur forum)",
        "modaliteRendu": "Publication d'une analyse argumentée dans le fil de discussion Moodle du module",
        "recommandationsProf": "Ne vous contentez pas de coller une étiquette théorique. Démontrez en quoi l'usage de certains actes de langage (notamment des directifs masqués en expressifs) produit de la souffrance, du travail empêché ou au contraire ouvre la possibilité d'une dispute professionnelle régulée."
      },
      {
        "titre": "Lectures Obligatoires de Cadrage Théorique",
        "typeTravail": "lecture",
        "consigneExacte": "Lire impérativement les textes de référence déposés sur Moodle : John L. Austin (Quand dire, c'est faire, Conférences I, II et VIII), John Searle (Les actes de langage, chapitres 1 et 3), et l'ouvrage de Barbara Cassin (Quand dire, c'est vraiment faire, 2018).",
        "echeance": "Lecture continue tout au long du semestre",
        "modaliteRendu": "Mobilisation attendue des concepts dans les fiches de synthèse et l'épreuve terminale",
        "recommandationsProf": "Soyez particulièrement attentifs à la réfutation de l'illusion descriptive et à la critique sociologique de Bourdieu sur le marché linguistique."
      }
    ],
    "syntheseSections": [
      {
        "numero": "Section 1",
        "titre": "Introduction & Mythe de la Tour de Babel : Le paradoxe originaire du langage",
        "points": [
          {
            "titre": "Le tableau de Pieter Bruegel l'Ancien (1563) et le mythe biblique",
            "contenu": "M. Lucy commence son cours par la projection de La Tour de Babel de Pieter Bruegel l'Ancien (1563). Le mythe raconte l'orgueil humain voulant édifier une tour rejoignant les cieux, puni par la dispersion des langues. Ce mythe cristallise le paradoxe constitutif du langage : ce qui est conçu pour unir et permettre aux hommes d'agir de concert est simultanément ce qui engendre l'incompréhension, la discorde et l'éparpillement.",
            "auteurs": [
              "Pieter Bruegel l'Ancien (1563)",
              "Éric Lucy (2024)"
            ],
            "conceptsCles": [
              "Mythe de Babel",
              "Paradoxe constitutif",
              "Mésentente originelle",
              "Risque du dire"
            ]
          },
          {
            "titre": "Parler, c'est prendre le risque d'être incompris",
            "contenu": "Dans la clinique du travail, ce constat est primordial : il n'existe pas de communication fluide et transparente sans heurts. Dès que l'on parle du travail, on s'expose au risque du malentendu. Le psychologue du travail doit renoncer à l'utopie d'une communication parfaite sans conflit, pour penser au contraire les conditions d'une négociation dialogique du sens.",
            "auteurs": [
              "Éric Lucy (Cnam)"
            ],
            "conceptsCles": [
              "Risque communicationnel",
              "Clinique du dialogue",
              "Écueil de la transparence"
            ]
          }
        ]
      },
      {
        "numero": "Section 2",
        "titre": "Neuropsychologie, Développement Cognitif et Clinique de la Souffrance",
        "points": [
          {
            "titre": "La ritournelle de Deleuze et la parole comme rempart psychique",
            "contenu": "M. Lucy convoque le concept de 'ritournelle' forgé par Gilles Deleuze et Félix Guattari (Mille Plateaux, 1980) : un enfant effrayé dans l'obscurité se met à fredonner une petite ritournelle pour marquer son territoire, ordonner le chaos environnant et conjurer la terreur. Le langage n'a pas pour fonction première de communiquer une information factuelle : c'est un acte sensoriel et psychique vital pour constituer son propre espace d'existence et tenir debout.",
            "auteurs": [
              "Gilles Deleuze & Félix Guattari (1980)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Ritournelle",
              "Territorialisation",
              "Rempart contre l'angoisse",
              "Fonction vitale"
            ]
          },
          {
            "titre": "Stades de Piaget et régression opératoire face aux outils techniques",
            "contenu": "Le développement du langage suit les stades d'intelligence décrits par Jean Piaget (sensori-moteur, préopératoire, opératoire concret, opératoire formel). M. Lucy souligne qu'il ne s'agit pas d'une trajectoire linéaire définitivement acquise : chez l'adulte en situation de travail, face à des logiciels d'entreprise illisibles ou des contraintes temporelles extrêmes, l'opérateur régresse fréquemment du stade formel vers le stade sensori-moteur (manipulation mécanique à l'aveugle par essais-erreurs, perte de la capacité de conceptualisation).",
            "auteurs": [
              "Jean Piaget (1936)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Assimilation / Accommodation",
              "Stades de développement",
              "Régression opératoire",
              "Artefacts logiciels"
            ]
          },
          {
            "titre": "Aphasies de Broca et Wernicke vs Souffrance au travail",
            "contenu": "La neuropsychologie classique cartographie le langage : Paul Broca (1861, gyrus frontal inférieur gauche, aphasie motrice/expressive : difficulté de production articulatoire) et Carl Wernicke (1874, gyrus temporal supérieur gauche, aphasie sensorielle/réceptive : perte de la compréhension et jargonaphasie). Question clinique cruciale soulevée par M. Lucy : face à un travailleur qui bégaie, hésite, perd le fil ou s'enferme dans le mutisme, s'agit-il d'un trouble neurologique personnel ou de la manifestation clinique d'un travail empêché, d'un épuisement ou d'une dépression réactionnelle à l'organisation ?",
            "auteurs": [
              "Paul Broca (1861)",
              "Carl Wernicke (1874)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Aphasie motrice (Broca)",
              "Aphasie sensorielle (Wernicke)",
              "Diagnostic différentiel",
              "Sidération psychique au travail"
            ]
          }
        ]
      },
      {
        "numero": "Section 3",
        "titre": "Histoire et Théories du Signe : Des Stoïciens à Port-Royal et Ferdinand de Saussure",
        "points": [
          {
            "titre": "La première sémiotique stoïcienne : Discours vs Réalité physique",
            "contenu": "Dès le IIIe siècle avant notre ère, l'école stoïcienne isole les trois dimensions constitutives de la sémiotique : le signifiant matériel (le son articulé émis dans l'air), le concept incorporel ou dicible (lekton, l'état de chose signifié dans l'esprit) et la chose réelle corporelle (tugchanon). Cette distinction est capitale : elle établit que le monde du discours n'est pas le monde réel ; le langage institue un univers symbolique propre qui possède sa propre cohérence et ses propres règles.",
            "auteurs": [
              "Philosophie Stoïcienne (Chrysippe, Zénon)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Sémiotique stoïcienne",
              "Lekton (incorporel)",
              "Tugchanon (chose réelle)",
              "Autonomie du monde du texte"
            ]
          },
          {
            "titre": "La Grammaire générale de Port-Royal (1660) : Sujet et Prédicat",
            "contenu": "Antoine Arnauld et Claude Lancelot publient en 1660 la Grammaire générale et raisonnée de Port-Royal. Héritiers des catégories d'Aristote, ils découpent la proposition humaine fondamentale en deux composantes : le Sujet (l'être ou l'objet dont on parle) et le Prédicat (ce que l'on affirme ou nie à propos du sujet). M. Lucy illustre également l'importance capitale de la ponctuation dans le langage écrit et parlé avec l'exemple historique : « Igor, le roi de Pologne » (apostrophe directe) vs « Igor le roi, de Pologne » (prédication d'origine).",
            "auteurs": [
              "Antoine Arnauld & Claude Lancelot (1660)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Grammaire de Port-Royal",
              "Sujet / Prédicat",
              "Prédicables d'Aristote",
              "Rôle de la ponctuation"
            ]
          },
          {
            "titre": "Ferdinand de Saussure (1916) : Arbitraire, Syntagmatique et Paradigmatique",
            "contenu": "Dans son Cours de linguistique générale (1916), Ferdinand de Saussure fonde la linguistique moderne. Le signe linguistique unit non pas une chose et un nom, mais un signifiant (image acoustique, matérielle ou mentale) et un signifié (concept abstrait). Ce lien est strictement arbitraire et institué par le groupe social. Saussure cartographie deux axes structuraux orthonormés : 1) L'axe Syntagmatique (horizontal, in praesentia) : les mots s'enchaînent de manière linéaire selon les règles strictes de la syntaxe ; 2) L'axe Paradigmatique (vertical, in absentia) : réservoir de choix et d'associations d'idées où le locuteur sélectionne un terme parmi d'autres équivalents possibles.",
            "auteurs": [
              "Ferdinand de Saussure (1916)",
              "Roman Jakobson"
            ],
            "conceptsCles": [
              "Signifiant / Signifié",
              "Arbitraire du signe",
              "Axe syntagmatique (horizontal)",
              "Axe paradigmatique (vertical)"
            ]
          }
        ]
      },
      {
        "numero": "Section 4",
        "titre": "John L. Austin et la Rupture Performative : « Quand dire, c'est faire »",
        "points": [
          {
            "titre": "La réfutation de l'illusion descriptive des positivistes",
            "contenu": "À Oxford en 1955 (publié en 1962 dans How to do things with words / Quand dire, c'est faire), John L. Austin rompt avec des siècles de tradition philosophique occidentale. Jusqu'alors, la philosophie du langage considérait que les énoncés n'avaient qu'une fonction descriptive (ou 'constative') devant être évaluée à l'aune du Vrai ou du Faux. Austin démontre qu'une grande part de nos énoncés ne décrit rien mais accomplit un acte : 'Je te baptise', 'Je te promets', 'La séance est ouverte'.",
            "auteurs": [
              "John L. Austin (1962)",
              "Barbara Cassin (2018)"
            ],
            "conceptsCles": [
              "Énoncé constatif vs performatif",
              "Illusion descriptive",
              "Philosophie du langage ordinaire",
              "Dire, c'est faire"
            ]
          },
          {
            "titre": "Les conditions de félicité et le statut d'autorité (Status est magistratus)",
            "contenu": "Un énoncé performatif ne peut pas être 'faux' : il est 'heureux' (félicité, réussite de l'acte) ou 'malheureux' (infélicité, échec ou nullité de l'acte). Pour être félicite, l'acte exige : 1) Une convention sociale acceptée ; 2) Les circonstances et personnes appropriées (Status est magistratus : si un passant ordinaire dans la rue vous crie 'Je vous arrête !' ou si un magistrat vous dit un samedi soir entre amis 'Je vous condamne à trois ans de prison', l'acte est nul car dénué de mandat officiel) ; 3) L'exécution scrupuleuse de la procédure ; 4) La sincérité des participants.",
            "auteurs": [
              "John L. Austin (1962)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Conditions de félicité",
              "Infélicités / Échecs",
              "Status est magistratus",
              "Mandat institutionnel"
            ]
          },
          {
            "titre": "La tripartition des actes de parole (Locutoire, Illocutoire, Perlocutoire)",
            "contenu": "Austin affine sa thèse en démontrant que tout acte de langage comporte simultanément trois dimensions indissociables : 1) L'acte Locutoire : l'acte phonétique et syntaxique de dire des mots possédant une signification ; 2) L'acte Illocutoire : ce que l'on fait EN disant (promettre, ordonner, déclarer, féliciter, avertir) — c'est le cœur de la force performative ; 3) L'acte Perlocutoire : les effets psychologiques ou comportementaux réels produits SUR l'interlocuteur PAR le fait de dire (effrayer, convaincre, blesser, rassurer).",
            "auteurs": [
              "John L. Austin (1962)"
            ],
            "conceptsCles": [
              "Acte locutoire",
              "Acte illocutoire (force illocutoire)",
              "Acte perlocutoire (effets)"
            ]
          }
        ]
      },
      {
        "numero": "Section 5",
        "titre": "John R. Searle et la Taxonomie des 5 Actes de Langage au Travail",
        "points": [
          {
            "titre": "Intentionnalité et direction d'ajustement (Direction of Fit)",
            "contenu": "Disciple d'Austin, John R. Searle (1969, 1979) systématise la théorie en introduisant le concept fondamental de 'direction d'ajustement' entre les mots et le monde : soit ce sont les mots qui doivent s'ajuster à l'état du monde existant, soit c'est le monde qui est appelé à changer pour correspondre aux mots prononcés.",
            "auteurs": [
              "John R. Searle (1969, 1979)"
            ],
            "conceptsCles": [
              "Direction d'ajustement",
              "Intentionnalité",
              "Taxonomie des actes illocutoires"
            ]
          },
          {
            "titre": "La taxonomie exhaustive des 5 actes de langage de Searle",
            "contenu": "Searle classe tous les actes possibles en 5 catégories rigoureuses : 1) Assertifs (mots → monde : le locuteur s'engage sur la vérité d'une proposition, ex. 'Le serveur est tombé en panne à 14h') ; 2) Directifs (monde → mots : tentative d'amener l'auditeur à accomplir une action, ex. 'Envoyez le compte-rendu') ; 3) Promissifs (monde → mots : engagement du locuteur lui-même dans une action future, ex. 'Je vous garantis que ce sera réglé demain') ; 4) Expressifs (pas de direction d'ajustement : expression d'un état psychologique ou moral, ex. 'Merci pour votre soutien', 'Je suis désolé') ; 5) Déclaratifs (double direction mots ↔ monde : l'énoncé modifie instantanément la réalité par la simple parole en vertu d'un pouvoir conféré, ex. 'Vous êtes nommé chef de projet', 'La séance est levée').",
            "auteurs": [
              "John R. Searle (1979)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Assertifs",
              "Directifs",
              "Promissifs",
              "Expressifs",
              "Déclaratifs"
            ]
          },
          {
            "titre": "Actes de langage indirects et violences symboliques managériales",
            "contenu": "Searle identifie les 'actes de langage indirects' : l'acte illocutoire réel diffère de la forme propositionnelle apparente. L'exemple princeps : « Pouvez-vous me passer le sel ? » n'est pas une question sur les capacités physiques du convive (assertif), mais un ordre poli (directif). Dans l'entreprise, le management use massivement d'actes indirects sous couvert de bienveillance : « Merci de veiller à respecter les délais » (expressif apparent mais directif impératif) ou « Il commence à faire chaud ici » (assertif pour commander d'ouvrir la fenêtre). Cette ambiguïté crée un flou clinique propice aux injonctions paradoxales.",
            "auteurs": [
              "John R. Searle (1975)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Actes indirects",
              "Directifs masqués",
              "Politesse managériale",
              "Injonctions paradoxales"
            ]
          }
        ]
      },
      {
        "numero": "Section 6",
        "titre": "Éclairages Critiques au Travail : Bourdieu, Habermas, Honneth et l'IA",
        "points": [
          {
            "titre": "Pierre Bourdieu contre l'illusion internaliste d'Austin",
            "contenu": "Dans Ce que parler veut dire (1982), Pierre Bourdieu porte un coup critique fatal à l'analyse purement linguistique d'Austin et Searle. Pour Bourdieu, la force magique des mots ne provient jamais du langage lui-même ni de la compétence linguistique du locuteur, mais des conditions sociales d'institution, du capital symbolique et des rapports de force objectifs. Le langage est un 'marché linguistique' où les dominants imposent leur lexique et exercent une violence symbolique invisible sur les dominés.",
            "auteurs": [
              "Pierre Bourdieu (1982)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Marché linguistique",
              "Capital symbolique",
              "Violence symbolique",
              "Mandat institutionnel",
              "Réfutation de l'internalisme"
            ]
          },
          {
            "titre": "Jürgen Habermas : Agir communicationnel vs Agir stratégique",
            "contenu": "Jürgen Habermas (Théorie de l'agir communicationnel, 1981) sépare radicalement deux usages du langage au travail : 1) L'agir communicationnel : orienté vers l'intercompréhension sincère et l'entente partagée, où chaque interlocuteur soumet ses énoncés aux 4 prétentions à la validité (vérité, justesse normative, sincérité, intelligibilité) ; 2) L'agir stratégique : instrumentalisation calculée du langage pour amener autrui à faire ce qu'on désire par la contrainte ou la manipulation. Dans les entreprises modernes, l'agir stratégique masque fréquemment sa violence sous les oripeaux de la communication participative.",
            "auteurs": [
              "Jürgen Habermas (1981)"
            ],
            "conceptsCles": [
              "Agir communicationnel",
              "Agir stratégique",
              "4 Prétentions à la validité",
              "Éthique de la discussion"
            ]
          },
          {
            "titre": "Axel Honneth : Le déni d'actes de langage comme source de mépris",
            "contenu": "Héritier de l'École de Francfort, Axel Honneth (La lutte pour la reconnaissance, 1992) analyse la clinique du mépris au travail. Lorsqu'un salarié est privé d'actes de langage expressifs (reconnaissance, gratitude) ou déclaratifs (reconnaissance de son statut et de sa contribution), il subit une invisibilisation destructrice. Le mépris linguistique (ne pas écouter, interrompre, utiliser des assertifs méprisants) attaque directement l'estime de soi et détruit la santé mentale.",
            "auteurs": [
              "Axel Honneth (1992)",
              "Éric Lucy"
            ],
            "conceptsCles": [
              "Reconnaissance / Mépris",
              "Invisibilisation",
              "Déni d'expressifs",
              "Estime de soi"
            ]
          },
          {
            "titre": "L'Intelligence Artificielle et les actes de langage machiniques",
            "contenu": "M. Lucy conclut son analyse en interrogeant l'impact de l'intelligence artificielle générative et des chatbots dans le monde du travail. L'IA produit des énoncés standardisés d'apparence assertive qui agissent comme des directives invisibles guidant l'activité des travailleurs. Cette automatisation du langage dépossède les collectifs de travail de leur pouvoir de controverse et d'élaboration dialogique du sens.",
            "auteurs": [
              "Éric Lucy (Cnam)",
              "Barbara Cassin (2018)"
            ],
            "conceptsCles": [
              "IA générative",
              "Actes machiniques",
              "Normalisation du discours",
              "Dépossession dialogique"
            ]
          }
        ]
      }
    ],
    "tableauxComparatifs": [
      {
        "titre": "Comparaison des 4 Modèles Sémiotiques du Signe Linguistique",
        "description": "Évolution historique de la conception du signe, de l'Antiquité à la philosophie de l'action ordinaire.",
        "colonnes": [
          "Courant / Auteur",
          "Composantes du Signe",
          "Rapport au Monde Réel",
          "Critère d'Évaluation",
          "Application au Travail"
        ],
        "lignes": [
          {
            "axe": "Stoïciens (IIIe s. av. J.-C.)",
            "valeurs": [
              "1. Signifiant sonore matériel\n2. Lekton (concept incorporel)\n3. Tugchanon (chose réelle corporelle)",
              "Coupure nette : le monde du texte est distinct et autonome du monde physique.",
              "Adéquation de la représentation mentale à la réalité objective de la nature.",
              "Repérer que le discours managérial construit une réalité symbolique propre qui ne recoupe pas le travail concret."
            ]
          },
          {
            "axe": "Grammaire de Port-Royal (1660)",
            "valeurs": [
              "Proposition binaire :\nSujet (l'objet pensé) + Prédicat (l'affirmation portée)",
              "Le langage est le miroir transparent des opérations de la pensée et de la logique.",
              "Conformité aux règles logiques universelles et rôle de la ponctuation.",
              "Analyser la formulation des consignes et des fiches de poste (qui fait quoi selon quel prédicat)."
            ]
          },
          {
            "axe": "Ferdinand de Saussure (1916)",
            "valeurs": [
              "Signe = Signifiant (image acoustique) + Signifié (concept abstrait)",
              "Arbitraire social : aucune relation naturelle entre le mot et la chose désignée.",
              "Structure différentielle sur deux axes (Syntagmatique horizontal vs Paradigmatique vertical).",
              "Comprendre le jargon de métier comme convention sociale arbitraire soudant le collectif de pairs."
            ]
          },
          {
            "axe": "Austin (1962) & Searle (1969)",
            "valeurs": [
              "Acte tripartite :\nLocutoire (dire) + Illocutoire (force d'action) + Perlocutoire (effets)",
              "Action performative : dire, c'est modifier le monde social et instituer de nouveaux états.",
              "Conditions de félicité (statut, convention, procédure) et direction d'ajustement.",
              "Traquer les ordres managériaux masqués (actes indirects) et rétablir le pouvoir d'agir dans le dialogue."
            ]
          }
        ]
      },
      {
        "titre": "La Taxonomie des 5 Actes de Langage de John Searle (1969) appliquée au Travail",
        "description": "Grille opérationnelle d'analyse des énoncés professionnels selon leur direction d'ajustement et leurs risques cliniques.",
        "colonnes": [
          "Type d'Acte (Searle)",
          "Direction d'Ajustement",
          "État Psychologique Exprimé",
          "Exemple Ordinaire & Exemple au Travail",
          "Risque Clinique / Pathologie Organisationnelle"
        ],
        "lignes": [
          {
            "axe": "1. Assertifs",
            "valeurs": [
              "Mots → Monde\n(les mots doivent concorder avec la réalité existante)",
              "Croyance / Conviction quant à la vérité de la proposition",
              "Ordinaire : « Il fait nuit dehors »\nTravail : « Le projet accuse deux semaines de retard suite au bug serveur »",
              "Déni de la réalité du travail réel : falsification des indicateurs et reporting mensonger sous pression managériale."
            ]
          },
          {
            "axe": "2. Directifs",
            "valeurs": [
              "Monde → Mots\n(le monde doit changer par l'action de l'interlocuteur)",
              "Désir / Volonté que l'auditeur accomplisse l'acte prescrit",
              "Ordinaire : « Fermez la fenêtre, s'il vous plaît »\nTravail : « Finalisez l'audit de sécurité avant vendredi 17h »",
              "Surcharge prescriptive et injonctions paradoxales : ordres contradictoires impossibles à exécuter sans transgresser."
            ]
          },
          {
            "axe": "3. Promissifs",
            "valeurs": [
              "Monde → Mots\n(le locuteur s'oblige lui-même à modifier le monde futur)",
              "Intention ferme d'accomplir l'acte dans le temps futur",
              "Ordinaire : « Je te promets de venir demain »\nTravail : « La direction s'engage formellement à renforcer les effectifs au prochain trimestre »",
              "Rupture de confiance et trahison du contrat psychologique lorsque les engagements managériaux ne sont jamais tenus."
            ]
          },
          {
            "axe": "4. Expressifs",
            "valeurs": [
              "Ø Aucune\n(l'état de fait est présupposé vrai, on exprime un affect)",
              "Sentiment, émotion, gratitude ou regret sincère",
              "Ordinaire : « Je te remercie chaleureusement »\nTravail : « Bravo à toute l'équipe pour l'engagement exceptionnel sur ce dossier »",
              "Hypocrisie managériale et « gratitude de façade » non assortie de moyens concrets ; ou au contraire, absence totale d'expressifs (mépris)."
            ]
          },
          {
            "axe": "5. Déclaratifs",
            "valeurs": [
              "Double direction :\nMots ↔ Monde\n(institue le fait par le simple énoncé en vertu d'un pouvoir)",
              "Volonté institutionnelle mandatée (Status est magistratus)",
              "Ordinaire : « Je vous déclare mari et femme »\nTravail : « La séance de négociation est ouverte » / « Votre période d'essai est validée »",
              "Abus de pouvoir ou illégitimité : déclaratifs prononcés sans mandat régulier créant un sentiment d'arbitraire et de violence symbolique."
            ]
          }
        ]
      },
      {
        "titre": "Confrontation Austin & Searle vs Pierre Bourdieu : L'Origine du Pouvoir Performatif",
        "description": "Controverse épistémologique centrale au Cnam entre philosophie analytique du langage et sociologie critique des champs.",
        "colonnes": [
          "Axe de Confrontation",
          "Thèse d'Austin & Searle (Pragmatique Analytique)",
          "Thèse de Pierre Bourdieu (Sociologie Critique)",
          "Synthèse Clinique pour le Psychologue du Travail"
        ],
        "lignes": [
          {
            "axe": "Source du pouvoir performateur",
            "valeurs": [
              "Intrinsèque aux règles linguistiques conventionnelles et à l'intention sincère des locuteurs.",
              "Extrinsèque : provient uniquement du pouvoir social délégué par l'institution au locuteur.",
              "La parole ne suffit pas : le psychologue doit analyser l'appareil institutionnel qui confère ou refuse le pouvoir d'agir."
            ]
          },
          {
            "axe": "Condition d'efficacité de l'énoncé",
            "valeurs": [
              "Respect des conditions de félicité (circonstances, procédure rituelle, sincérité).",
              "Détention de capital symbolique et légitimité accordée par le champ social.",
              "Un salarié peut respecter toutes les formes de politesse, sa parole sera ignorée s'il est dépourvu de statut reconnu."
            ]
          },
          {
            "axe": "Nature des échanges langagiers",
            "valeurs": [
              "Coordination rationnelle de l'action humaine entre partenaires autonomes.",
              "Marché linguistique régi par des rapports de force et de la violence symbolique.",
              "Le dialogue professionnel est toujours traversé par des asymétries de pouvoir qu'il faut réguler par des règles de controverse."
            ]
          }
        ]
      }
    ],
    "rectificationsExamen": [
      {
        "titre": "Confondre Acte Assertif et Acte Déclaratif chez Searle",
        "erreurCourante": "Considérer que l'énoncé « Vous êtes licencié » est un assertif sous prétexte qu'il décrit la situation du salarié.",
        "rectificationAttendue": "C'est une faute théorique grave. « Vous êtes licencié » est un acte DÉCLARATIF par excellence : il ne décrit pas un état préexistant, il transforme la réalité juridique et sociale par le seul fait de son énonciation en vertu du mandat patronal (direction d'ajustement simultanée Mots ↔ Monde). Un assertif se contenterait de décrire (« Le taux de chômage a augmenté »).",
        "contexte": "Questions de cours et étude de cas d'examen"
      },
      {
        "titre": "Croire que les mots possèdent un pouvoir magique sans conditions de félicité",
        "erreurCourante": "Affirmer qu'il suffit de prononcer la formule performative appropriée pour que l'action s'accomplisse magiquement.",
        "rectificationAttendue": "Rappel de la formule clinique de M. Lucy : « Si un passant dans la rue vous crie \\\"Je vous arrête\\\" sans képi ni matricule, c'est un canular ». Selon Austin, le performatif n'agit qu'au sein d'une procédure conventionnelle acceptée et avec des personnes habilitées (Status est magistratus). Sans mandat institutionnel (Bourdieu), l'acte est nul (malheureux / infélicite).",
        "contexte": "Analyse des conditions de félicité (Austin 1962)"
      },
      {
        "titre": "Méconnaître la fonction d'ordre des actes de langage indirects",
        "erreurCourante": "Qualifier l'énoncé managérial « Merci de bien vouloir me transmettre le rapport ce soir » d'acte purement expressif ou de politesse.",
        "rectificationAttendue": "Sur le plan formel propositionnel, l'énoncé ressemble à un expressif (« Merci »). Mais sur le plan illocutoire pragmatique, il s'agit d'un DIRECTIF IMPÉRATIF INDIRECT. L'auditeur ne peut pas se contenter de répondre « De rien » : il doit impérativement exécuter l'ordre en remettant le dossier.",
        "contexte": "Clinique de la communication managériale"
      },
      {
        "titre": "Intervertir l'axe Syntagmatique et l'axe Paradigmatique chez Saussure",
        "erreurCourante": "Définir l'axe paradigmatique comme l'enchaînement grammatical des mots dans la phrase.",
        "rectificationAttendue": "L'axe SYNTAGMATIQUE (horizontal) est celui de la concaténation linéaire des mots selon la syntaxe (in praesentia). L'axe PARADIGMATIQUE (vertical) est celui du choix dans le réservoir de la langue par association d'idées (in absentia : choisir 'collaborateur', 'salarié', 'opérateur' ou 'ressource humaine' relève du choix paradigmatique).",
        "contexte": "Théorie du signe de Ferdinand de Saussure (1916)"
      },
      {
        "titre": "Poser un diagnostic aphasique en ignorant la clinique de l'organisation",
        "erreurCourante": "Interpréter les difficultés d'élocution et les silences répétés d'un travailleur uniquement comme un trouble neurologique cérébral.",
        "rectificationAttendue": "Si le repérage des aphasies de Broca et Wernicke est un repère neuropsychologique utile, le psychologue du travail doit d'abord explorer la situation clinique : le mutisme ou la perte de fluidité verbale résultent fréquemment de la sidération psychique face au travail empêché, du harcèlement ou de l'épuisement professionnel.",
        "contexte": "Diagnostic clinique et posture du psychologue au Cnam"
      }
    ],
    "transcriptionIntegraleVerbatim": "[1. Cadrage de la séance, modalités Moodle et boîte à outils du psychologue]\n\nPST108 Cours 2 Les actes de langage\n\nPsychologie du langage et clinique du dialogue\n\nDurée de l’enregistrement : 2 h 45 min 59 s · Transcription française générée avec Buzz\n\nLa formulation automatique est conservée. Les noms propres et les termes spécialisés peuvent nécessiter une vérification à l’écoute.\n\nTranscription intégrale\n\nEt maintenant enregistré, peut-être que ça ouvrira ma caméra. Non, c'est jamais. Non, non plus. Donc, il faut que vous regardiez les dates, si les dates correspondent bien à votre emploi du temps. Il y a toujours... Je n'arrive pas à la faire fonctionner.\n\nDonc là, si vous pouvez vous ouvrir, si vous avez l'emploi du temps, si vous pouvez regarder, on se voit aujourd'hui. Ensuite, il y a une activité distante. Et puis alors l'activité distance, je vous rappelle, vous savez, c'est asynchronique. Donc en règle générale, il y a la visio, je présente et puis j'envoie sur le forum. Les exercices à faire, je fais des retours dans le forum et on en reparle ensuite à la prochaine web conférence. Donc il y a une alternance web conférence, activité distante, le 17-11 une web conférence, après activité distante et puis le 9-12 web conférence et puis ensuite le 11 et le 13 janvier deux web conférences.\n\nJe vais ce soir présenter la question des actes de langage puisque le cours est consacré à la notion d'actes de langage comme un élément essentiel de l'activité de psychologue du travail puisque le langage est à une place cardinale. Et pourquoi les actes de langage ? Parce qu'il s'agit là de se focaliser sur la question du langage au sens où parler c'est agir sur le monde, où parler c'est transformer le monde, c'est vouloir faire faire des choses à quelqu'un, parler c'est se mettre en correspondance, s'inscrire dans le monde. Parler c'est essentiellement un acte. Cette abord-là est entièrement consacrée à la notion d'acte de langage.\n\nLa clinique du travail, elle se construit en parlant et le travail se transforme en parlant du travail puisque quand on parle, on transforme le monde, on transforme les gens. Donc globalement, c'est cette perspective-là de construire la clinique du travail à partir de la notion d'acte de langage, de cette vieille caractéristique que l'on a isolée par rapport au langage. Qui est le performatif. Le langage c'est une action, ça permet d'agir, de faire faire des choses aux autres et d'agir sur le monde.\n\nDonc l'idée c'est de s'accaparer cette dimension-là du langage, de construire sa boîte à outils conceptuels pour penser le langage de ce point de vue et directement, rapidement pouvoir l'appliquer à la clinique du travail. A travers des exercices et des études de cas que je proposerai et que vous proposerez. Il y a 17h, ça va très vite, c'est de rentrer dans une application rapide sur comment utiliser le langage du point de vue du performatif des actes de langage.\n\nVous avez vu sur le Moodle, je suis désolé, je suis un peu décontenancé par le fait de ne pas avoir la caméra, mais vous avez vu dans le Moodle il y a un diaporama, donc l'idée c'est de partir de ce diaporama pour contextualiser cette notion d'acte de langage au regard du fait que le langage c'est un objet immense.\n\nQui nous constituent en tant qu'êtres humains, qui en fait vraiment notre caractéristique première. Les animaux communiquent, si on regarde ça d'un point de vue anthropologique, l'oreille animale et nous, ce qui est de l'humain et ce qui n'est pas de l'humain, les animaux communiquent, ils ont des moyens, des langages, mais on est quand même l'animal avec le langage le plus... Qui nous est le plus nécessaire. Je ne sais pas si c'est le plus évolué, mais en tout cas qui nous est pour nous le plus nécessaire à notre survie. Je vais partager le diaporama. Je vais voir ça si vous allez me dire si... Est-ce que vous le voyez sur l'écran ? Oui. Si quelqu'un peut me répondre. Oui, oui, on le voit. D'accord.\n\n[2. Le mythe de la Tour de Babel (Bruegel) et le paradoxe constitutif du langage]\n\nBon, super. On va essayer. Je le mets en mode diaporama. Est-ce que vous le voyez toujours en mode diaporama ? Si j'ai mis la tour de Babel, c'est pour rapidement contourner, en tout cas passer par cette... Cet enjeu du langage qui veut que c'est l'instrument qui nous permet de communiquer, qui permet de nous entendre, qui permet de nous repérer par rapport au monde et par rapport aux autres. Mais en même temps, c'est quelque chose qui nous perd. Et le mythe de la babélisation du monde, cette tour de Babel, c'est ce magnifique tableau de Bruegel. Je rappelle le mythe de la babélisation du monde. Les hommes ont voulu, avec la science, avec le langage, se prendre pour des dieux.\n\nLe mythe nous a punis et a mis une multitude de langues dans le monde et depuis nous ne comprenons plus. Nous sommes dans une forme de babélisation, d'incompréhension constante. Ce mythe permet de situer l'enjeu du langage dans ce qu'il a de plus paradoxal. Transcription française. C'est à la fois parler, c'est à la fois prendre le risque d'être incompris. Donc ça situe le langage autrement que d'un point de vue de la psychologie sociale qui va étudier ça, enfin qu'une part de la psychologie sociale qui va étudier ça du point de vue d'un outil de communication. Mais c'est quelque chose qui nous constitue à la fois dans notre manière de nous construire et aussi de nous perdre et de nous déconstruire constamment.\n\nC'est ça le mythe de la tour de Babel. Mais on n'a pas d'autre possibilité que d'utiliser le langage, de prendre le risque de se perdre. En tant qu'objet qui nous constitue, qui est le propre de notre culture, le langage c'est la culture, c'est ce qu'on est arrivé à produire, c'est cet immense savoir que nous produisons depuis que les humains sont sur la Terre. Vous comprenez bien que c'est un objet immense, difficile à penser.\n\nL'idée dans cette introduction, cette contextualisation, c'est de voir comment on peut penser le langage, de revenir un peu sur quelques abords essentiels qui vont permettre de nous repérer pour ensuite aller vers cette dimension spécifique du performatif, du langage, comme manière d'agir sur le monde. Première idée, première voie, première possibilité et premier axe qui permet de penser le langage qui occupe les sciences humaines, c'est le langage comme construction du sujet. Le langage est l'expression et l'évolution d'une personne, mais aussi la manifestation de sa personnalité. Il est propre à la construction du sujet.\n\nIl participe à notre évolution et il se transforme en chacun de nous de manière personnelle au fur et à mesure de notre évolution et il évolue au regard de l'évolution de notre civilisation. Alors du point de vue personnel, les sciences humaines étudient le langage, il y a à étudier le langage, on va le voir du côté des fonctions cognitives et des stades du développement. Et si on pense que le langage est un outil qui permet d'agir sur le monde, on comprend bien que cette manière d'agir sur le monde va être largement liée à l'évolution et à la construction de nos fonctions cognitives.\n\nIl va y avoir un lien indéfective entre nos stades de développement et notre possibilité d'utiliser le langage du point de vue d'un outil d'action sur le monde. Ensuite, le langage, je rappelle que le langage, c'est logos, ça désigne chez les Grecs à la fois la pensée et le langage. C'est intimement lié, ça désigne les mêmes choses. Ça évolue au regard de notre pensée, de la construction de notre pensée et notre pensée permet... Ça permet de produire du discours. Du point de vue de l'évolution, on étudie le langage. Je passe rapidement, mais ça permet de contextualiser ce qui nous occupe, comment situer le langage et le discours.\n\nÇa va nous occuper aussi puisque si on regarde comment les sciences humaines s'intéressent au langage, si on regarde du point de vue des pathologies, de ce qu'on appelle les aphasies et les troubles des apprentissages du langage, on comprend bien que quand quelqu'un a des difficultés de parole, quand quelqu'un la voit, je suis mal à l'aise parce que je n'ai pas l'outil. Vous voyez bien que j'hésite, je bégais. Et quelqu'un qui est en difficulté, quelqu'un qui est d'évolution, ça se manifeste dans le langage, dans le discours. C'est important de regarder ça par rapport pour vous, pour des psychologues du travail, puisque quand on vous appelle, c'est souvent quand ça ne va pas.\n\nQuelqu'un qui n'arrive pas à parler du travail ou quelqu'un qui ne fait que parler du travail, bien que ça dénote des manifestations de là où il a né par rapport à sa personnalité, par rapport à sa souffrance, par rapport à des possibles pathologies. Le langage est un outil majeur qui permet de comprendre si l'humain va bien ou ne va pas bien. C'est pourquoi il est important de s'intéresser au langage du point de vue de ce qu'on appelle en médecine les aphasies. Alors le langage et le cerveau, depuis très longtemps, on va le voir, dès le 19ème, on a repéré que le muscle du langage c'est le cerveau.\n\nSi les grecs avaient repéré logos à la fois langage et pensée, langage, pensée, cerveau, il est important de refaire... De restituer brièvement les recherches entre le fonctionnement cérébral et le langage. L'autre axe important qui occupe les sciences sur la manière de penser le langage, c'est de la philosophie à la linguistique, c'est-à-dire qu'on a fait du langage un objet à part entière. C'est un projet d'étude qui a toujours été un objet important de la philosophie et qui a donné une discipline qu'on appelle la linguistique qui étudie le langage dans son évolution, son fonctionnement, ses lois, qui en fait un objet spécifique des sciences, d'une science qu'on appelle la linguistique.\n\nA partir de la philosophie, on a produit une science qui étudie spécifiquement le langage qui s'appelle la linguistique. Dès qu'on s'intéresse au langage, aux manifestations langagières, on est pris par cette nécessité de devoir faire un peu de linguistique. L'idée sera de présenter trois grands temps, trois grandes définitions du signe. Celle des stoïciens, ses premières conceptions du signe. Qu'est-ce qu'un signe ? Comment l'humain a pensé un signe ? Ensuite, il y a un avant et un après, bien sûr, Ferdinand de Saussure, qui a montré ce grand linguiste qui a inventé le structuralisme, mais c'est lui qui a permis, ouvert...\n\nSur ce qu'on appelait le structuralisme, et les sciences structurales ont utilisé les lois du langage pour penser l'humain, c'est-à-dire de faire des comportements humains à un discours, et les sciences humaines se sont appuyées sur Ferdinand Saussure, sur sa conception qu'il a isolée du cygne, donc on en dira quelque chose ce soir. Et puis, Austin, c'est celui qui a non pas inventé le performatif, puisque les Grecs avaient déjà repéré cette caractéristique du discours, mais qui a développé ce qu'on appellera maintenant les actes de langage, que son héritier Searle isolera du point de vue de l'acte illocutoire.\n\nMais il y a un avant aussi en 1959-1962, un avant et un après Austin puisque c'est lui qui a vraiment étudié de manière assez fine les caractéristiques des actes de langage. Donc la proposition c'est de s'attarder, de revenir sur trois grandes conceptions du signe, celle des stoïciens. Des anciens, on va dire, de Saussure et d'Austin. Ensuite, la linguistique, elle étudie toujours, ça on ne le fera pas, mais on y reviendra un peu quand même. Existe-t-il des lois universelles dans le langage ? Il y a aussi un avant et un après, Noam Chomsky, avec des questions fondamentales. Est-ce qu'il y a des lois universelles au langage ? Est-ce que des lois sont identiques dans l'ensemble des langues ?\n\nToujours dans cette histoire, ce mythe, une langue universelle, une seule langue, et puis après une multiplicité de langues, y aurait-il les mêmes règles pour toutes les langues ? Le débat n'est pas tanché, oui et non, suivant les linguistes. Pourquoi la diversité des langues ? Y a-t-il des usages infinis de la langue et des moyens finis ? Ce sont des moyens finis. Ceci dit, chez les Japonais, il y a un alphabet infini. En tout cas, on a un certain nombre d'outils finis qui nous permettent des usages infinis. Voilà certaines préoccupations de la linguistique. Ce qui nous occupe, nous aussi, du point de vue des actes de langage. Y a-t-il des lois universelles des actes de langage ?\n\nComment développer un acte de langage est identique, quelles que soient les langues ? Oui et non, on le verra. L'acte de langage a une valeur, quelles que soient les langues, suivant le statut de la personne. Peu importe quelle langue on parle, on a bien repéré que suivant le statut que l'on occupe, notre parole, quelle que soit la langue, va avoir un impact performatif ou pas. Et puis cette question qui occupe la linguistique depuis la philosophie, le lien entre le langage et la pensée. Est-ce que la pensée produit le langage ? Est-ce que le langage produit la pensée ? On va répondre les deux. Ça fonctionne. Donc ça, c'est aussi une question récurrente de la linguistique dès qu'on s'occupe du langage.\n\n[3. Construction du sujet, fatigue au travail et sollicitation des fonctions cognitives]\n\nC'est une question qui revient sécemment. Et une autre question essentielle, depuis qu'on manipule le langage, on se pose la question du rapport du langage à la vérité, des conditions de vérité du discours. Est-ce que je dis est vrai ou faux ? Est-ce que je mens ou je ne mens pas ? Quelle est la valeur ? Est-ce que ma proposition... Ma caméra fonctionne ? Est-ce que c'est vrai ou faux ? Là, c'est faux. Et ensuite, du point de vue, on s'intéressera à ce rapport à la vérité. C'est une question importante en philosophie et par rapport à... C'est une question humaine anthropologique importante. Je rappelle toujours Foucault disait, il y a trois questions, aléthéia, polythéia, éthique.\n\nAléthéia, la vérité, c'est-à-dire le rapport à comment on cherche... Défaits et reconstruit des vérités. C'est comme ça qu'on construit les vérités. Le savoir scientifique, des vérités toutes partielles et qui sont constamment déconstruites et reconstruites. Politeia a la question de comment on se gouverne entre nous, comment on s'organise entre nous. Et éthique, c'est ce qui est correct ou pas. Vous voyez, ces questions de vérité sont essentielles dès qu'on s'intéresse au langage. Il y a un changement important dès qu'on s'intéresse à la notion d'acte de langage. Ainsi, dans le discours, dans la validité d'une proposition, on va essayer de savoir si la proposition est vraie ou juste.\n\nPour un acte de langage, on s'aperçoit que c'est différent. Il faut essayer de voir si l'acte de langage est validé. Si je vous promets de vous ramener l'argent, l'acte de langage est valide si je ramène l'argent. On voit que ça se mesure de manière différente avec la notion d'acte de langage.\n\nEt puis, une dernière question tout à fait actuelle, que l'on traitera quand même, qui reviendra de manière récurrente, c'est la question de la relation du langage des hommes et du langage artificiel, des codes, des règles, de cette dimension, alors non plus uniquement du cerveau, mais aussi de la machine, puisque ça fait partie, c'est l'outil, Qui est un prolongement de l'humain, qui est une manière qui nous oblige à nous constituer de manière différente dans le monde. Dès qu'il y a un outil nouveau, ça remet en jeu notre manière d'exister au monde. Mais par rapport au langage, on est obligé de penser à cette question de l'IA, de l'intelligence artificielle générative, des chatbots.\n\nPuisque c'est une partie importante du travail, ça transforme le travail, ça fait disparaître certains métiers, ça en transforme de nombreux, ça va en créer. Donc cette dimension du langage artificiel sera... Et tu as questionné aussi du point de vue des actes de langage puisque le langage artificiel va aussi produire des actes de langage, des transformations du monde. Ça nous guide aussi quand on est en discussion avec un chatbot. Faites le 1, faites le 2, appuyez sur étoile. C'est un acte de langage qui amène à produire des comportements.\n\nEnsuite, l'autre grand axe, un autre élément important pour penser le langage, c'est son intégration dans les sciences humaines comme un paradigme des disciplines des sciences humaines. C'est comment on a, et notamment après Ferdinand Saussure, ce que j'évoquais dans cette question du structuralisme, Comment on a utilisé ce qu'on a pu élaborer à propos du fonctionnement du langage, les différentes conceptions du signe, les différentes lois de fonctionnement du langage ? Comment ça n'est servi en sciences pour penser les comportements humains ? Je l'ai dit, en sciences humaines avec le structuralisme, c'est-à-dire de faire des comportements humains un discours.\n\nCe qui est le propre d'ailleurs de la clinique, on observe des gens qui ont des comportements et on essaie de comprendre ce que ça raconte. En anthropologie, par exemple, Lévi-Strauss a fait l'hypothèse que les mythes, les rituels et les mythes, ça racontait quelque chose et c'est ce qui permet de... De comprendre comment une société s'organise. On s'attardera, nous, surtout du côté de la sociologie, de la sociologie bourdieusaine, puisque le discours, comment je parle, comment je parle dans le monde, comment je parle aux autres, comment je parle dans les différentes situations de mon existence, ça permet de me distinguer, disait Bourdieu, ça permet de constituer mon statut, ça permet de dire qui je suis.\n\nEt ça permet de me situer dans ce qu'il appelle un marché linguistique. Donc réinjecter les lois du langage et du discours dans le champ des sciences humaines, c'est du point de vue de la sociologie. C'est essayer de comprendre comment la valeur d'un langage, la valeur d'un discours, la valeur d'un acte de langage. Ça permet de nous construire dans une situation sociale et il sera important de regarder comment ça nous construit dans la situation de travail. Donc ça ce sont les trois principes que j'adopte et que nous pouvons adopter pour penser le langage du point de vue des actes de langage et pour se repérer Dans son utilisation pour penser à la clinique du travail.\n\nIl y a un certain nombre de grandes questions qui sont récurrentes. Vous avez ça dans des sciences humaines, des questions récurrentes par rapport au langage, la question de la pensée, quand est-ce que le langage est apparu. Donc vous avez, j'ai isolé des questions récurrentes qui occupent l'ensemble des sciences qui font du langage un objet de recherche. Alors la construction rapidement, mais c'est important, la construction du sujet, le langage comme construction du sujet, c'est important d'y revenir. On va revenir sur des choses que vous savez déjà, que vous connaissez déjà.\n\nMais ça permet de comprendre que les actes de langage, cette question de la dimension performative du langage arrive très tôt et est largement liée à notre construction, à notre évolution de la petite enfance à l'âge adulte. Donc il est important que le langage fonctionne grâce à nos fonctions cognitives majeures. Alors on peut, de manière la plus épurée, les trois grandes fonctions cognitives majeures. Il y a des abords psychologiques où on en isole un peu plus, mais en tout cas la mémoire, les fonctions instrumentales et les fonctions exécutives. Et si la psychologie met le langage dans les fonctions instrumentales, si on s'intéresse à la mémoire...\n\nLa mémoire de travail, la mémoire sémantique, c'est qu'on mémorise parce qu'on construit un discours, parce qu'on construit un scénario, parce qu'on mémorise grâce au fait qu'on arrive à retenir les informations par un discours. Il y a un certain nombre de moyens mnémotechniques qui nous permettent de retenir parce qu'on fait un discours. Donc le langage c'est la fonction instrumentale première de nos différentes activités et elle est tout à fait partie prenante du côté des fonctions exécutives et de l'attention. Alors c'est important de rappeler ça, toujours avec cette idée que le travail vient nous...\n\nVient solliciter nos fonctions cognitives majeures, mais aussi vient les entamer, vient aussi les attaquer, vient aussi les démobiliser. La souffrance au travail, c'est devenir aussi incapable d'utiliser ces fonctions cognitives. Et donc, à partir de ce moment-là, on voit bien toute la difficulté pour parler le travail, pour se repérer. Puis pour pouvoir raconter ce qu'on est en train de faire, raconter ce qu'on est en train de vivre. Plus on est en souffrance, plus on est en difficulté, plus nous sommes entravés du point de vue des fonctions cognitives majeures. Si on ne dort pas, il y a des expériences classiques. Si on arrête de faire dormir des gens très...\n\n[4. Stades de Piaget, ritournelle de Deleuze et émergence de la fonction symbolique]\n\nIl y a eu des expériences classiques avec les étudiants en médecine. Au bout d'un certain nombre de journées sans dormir... Leur fonction cognitive est sacrément entamée. C'est lié à notre utilisation de cet outil, de ce qui nous constitue. C'est largement lié à nos stades de développement. On le voit très bien, le sensorimoteur, de 0 à 2 ans, ça ne parle pas à l'infance. Étymologiquement, l'infance, ce qui ne parle pas.\n\nÇa précède le langage, mais ce stade sensorimoteur, cette intelligence, et on le verra avec Piaget, avec assimilation et accommodation, comment on prend l'objet, comment on prend les caractéristiques de l'objet, comment on prend ses qualités et qu'on en fait quelque chose pour après le transformer. Comment c'est un élément majeur, cette intelligence sensorimotrice qui est essentielle à l'arrivée ensuite du langage avec ce stade préopératoire, opératoire et le stade formel, cette pensée hypothétique ou déductive où là on entre dans l'usage plein du langage où on est capable de faire raisonnement, de faire fonctionner les causes et les effets.\n\nIl est important de revenir sur ces différents stades du développement. Quand on a affaire à des gens qui souffrent, il y a des moments où La souffrance, la maladie peut nous empêcher d'avoir accès au stade formel. Et puis aussi parce que la pensée est organisée de telle manière qu'on peut vraiment être dans l'hypothético-déductif, être capable de faire des opérations très complexes, de faire des hypothèses et puis dans certaines activités. Revenir à un niveau sensorimoteur, quand il suffit de nous donner un nouveau logiciel sur un ordinateur, on ne sait pas comment ça marche, on tape dans tous les sens et on est finalement dans ce stade sensorimoteur.\n\nEt si on revient à ce que j'ai dit sur l'usage des outils, Transformation permanente de nos existences dans le monde et dans l'activité travail. On voit bien que l'usage du langage est comme outil qui va permettre d'agir sur le monde, d'agir sur les autres et de transformer le monde et les objets. Comment on passe son temps, finalement, un va-et-vient permanent entre ces différents stades, ces différents niveaux. Alors, certes, c'est cumulatif. D'abord, le stade sans cérémonie-auteur, préopérateur, opératoire, et puis ensuite formel. Mais il y a un certain nombre d'activités dans notre vie sociale où on fait des allers-retours à ces différents niveaux.\n\nLe langage est toujours à penser du point de vue de ses niveaux de compétences. Vous le voyez bien, cette confusion, cette dimension consubstantielle du langage et de la pensée s'inscrit dans le fait qu'il y a Une consubstantialité permanente entre notre capacité à penser et l'usage des signes, l'usage de nos compétences langagières, de nos compétences sémantiques qui permet l'usage de la pensée. Alors, il est important aussi de revenir sur les deux grandes périodes d'acquisition du langage. Tout le monde le sait, mais c'est important pour faire le lien avec les actes de langage.\n\nUne première période qui ouvre sur les dix premiers mois, puis une seconde période vers la fin de la première année, notamment à partir de la deuxième année, qui ouvre sur une autre dimension de l'apprentissage. Le langage comme constitution du sujet pose la question de la fonction symbolique, du développement de la pensée, du lien entre langage et pensée. Le langage produit la pensée et la pensée produit le langage. Et qu'est-ce que la fonction symbolique ? Ce n'est pas parce que quelqu'un est muet, qu'il n'a pas accès à la fonction symbolique.\n\nMais en tout cas, il y a un lien permanent et ça suppose de discuter constamment ce qu'on entend par fonction symbolique, en partant du B à B, c'est-à-dire que le langage, le signe permet de penser l'objet en son absence. C'est ça la valeur première du langage, du signe, du signifiant, c'est qu'il permet de désigner le monde en son absence.\n\nPour autant, cette fonction symbolique, si on y a accès, elle n'a pas une permanence absolue. On voit qu'il y a des limites. On ne peut pas désigner l'ensemble du monde en son absence. On ne peut pas penser la totalité du monde en son absence. Les scientifiques disent qu'il faut partager, faire des choix, dire qu'on va d'abord s'intéresser à une part du monde et puis après à une autre. Donc, le langage comme constitution de l'être humain, c'est deux problématiques fondamentales. Il y a un pensée et un langage. Et qu'est-ce que le symbolique ? Qu'est-ce que cette dimension qu'on appelle la fonction symbolique ? Alors, pour l'évolution, comment on apprend les périodes d'apprentissage du langage ?\n\nAlors, je vais en refaire un petit commentaire. On regarde ce qui nous intéresse, les actes de langage. Alors si on pense les actes de langage comme ce qui permet de nous guider dans le monde, de nous guider par rapport aux autres, c'est à partir du langage, des actes de langage que... Les autres nous font faire quelque chose quand on est tout petit, tout enfant. On voit bien que le langage nous inscrit du point de vue de notre position et de notre action dans le monde. C'est essentiel. Et c'est essentiel très tôt. C'est essentiel très tôt puisqu'on entend la voix de la mère, et pas que de la mère, mais déjà dans la vie intra-utérile.\n\nCe son nous oblige déjà, nous permet de nous construire une pensée, de nous construire en tant que sujet qui va être en relation interpersonnelle. Si on en a une très peu conscience quand on est un fœtus, mais on se construit constamment dans un enjeu interpersonnel. Et c'est dans ce sens-là que les actes de langage s'inscrivent dès la vie foetale, très tôt avant la naissance, où on se constitue avec ce paradigme qui veut que le langage, c'est ce qui nous inscrit, qui va inscrire dans le monde une distance, une profondeur. Un dedans et un dehors et des enjeux interpersonnels. C'est la ritournelle chez Deleuze.\n\nIl y a un petit texte de Deleuze, son concept de ritournelle, où l'enfant est dans le noir et il est dans le chaos, et pour construire une distance, pour se repérer, il chante, le son se répercute. Ça construit un univers et il se situe dans un monde qui n'est plus un chaos et il se stabilise et il commence à se repérer. C'est la fonction même de la ritournelle qui est un acte de langage. Dès la naissance, on s'inscrit dans l'interpersonnalité. Les enfants fixent le visage de la personne qui parle, imitent les mouvements de la bouche et on a bien vu que quand quelqu'un parle, les doigts bougent au rythme de la parole de la personne qui parle.\n\nOn voit bien que le langage du point de vue de l'action se développe dès notre naissance. L'enfant vocalise, crie en présence de l'adulte. C'est déjà un acte de langage. C'est déjà un performatif. Il se manifeste. Je suis là. Il reconnaît son prénom. Il fait cette expérience du performatif. Quand l'adulte appelle l'enfant, il lui indique « c'est à toi que je pars ». Il permet à l'enfant d'exister à partir d'un acte de langage, d'un performatif. L'enfant commence à imiter de manière vicariante, par reproduction. Les psychologues ont repéré que le tour de parole est repéré très vite. Quand quelqu'un parle, on se tait, puis après, quand il a fini, c'est le moment de parler.\n\nCette règle-là se construit très tôt, pour certaines personnes, jamais, qui passent leur temps à couper la parole. Mais c'est très tôt que l'acte de langage nous inscrit en tant que sujet de manière interpersonnelle et qu'on apprend les lois du performatif, du fonctionnement À partir de 5-6 mois, on apprend le langage, le discours, la manipulation du point de vue des actes de langage de manière statistique. Notre cerveau retient qu'après telle phrase, il y a tel sens. On le verra avec l'agir communicationnel d'Abermas. Il y a quelque chose de ce monde vécu qui s'inscrit dans le monde commun, parce qu'on repère que le monde commun, c'est statistiquement repéré.\n\nEt c'est notre cerveau qui automatiquement fait des mathématiques. Alors là, six mois, ça commence vraiment à se techniciser. Des compétences propositionnelles du point de vue de la linguistique. On commence à pouvoir entrer dans l'univers du signe. On ne maîtrise pas le langage, on entre dans l'univers du signe et il nous construit. On se construit, le tour de parole se renforce et on comprend qu'il faut articuler. Et on commence à manipuler des monèmes à partir de phonèmes. C'est encore très archaïque, mais c'est une intention qui se construit à partir des enjeux interpersonnels. C'est la dynamique interpersonnelle, cette dimension du performatif qui nous amène à apprendre le langage.\n\nEt 7 à 8 mois, les règles du fonctionnement syntaxique, les règles de la langue, des langues s'installent. Et la dernière période, c'est cette période où ça va très vite. On sort de cette tour de Babel phonologique. Les choses commencent à s'organiser du point de vue de nos capacités. C'est lié au développement du cerveau, psychomoteur, neuronal qui crée des schèmes et qui permet d'isoler, de ne pas partir dans tous les sens, comme le geste par rapport à la marche se créent des schèmes qui nous permettent d'articuler. Et par l'expérience et par répétition et par copiage de ce qu'on repère chez les adultes, d'entrer dans l'usage des règles du langage.\n\nEt d'être 10 à 12 mois, le sujet humain est pleinement dans... déjà pleinement arrive dans L'usage des actes de langage est du performatif. Ça fait, je ne sais pas, 6 mois, 7 mois, 8 mois, mais à 10-12 mois, ça fait un moment que l'enfant est capable de dire non, oui, que se construit l'opposition. Là, il a expérimenté auparavant et il y est pleinement dans cette dimension de l'usage des actes du langage. C'est un outil d'action sur le monde et sur les autres. Là, ça va très vite. On comprend énormément de MOF. 24, 36 mois, 10 000 MOF. Et là, on entre dans l'apprentissage non seulement des règles, mais aussi des jeux de langage.\n\nOn commence à être capable de jouer avec les autres sur les ambiguïtés du langage, sur les équivoques du langage, sur cette possible babélisation du monde, de cette incompréhension possible qui permet de construire finalement une forme de poésie et on comprend qu'il y a des sens, les propositions. Les langages prennent un sens différent suivant le contexte. Et là, on est vraiment dans une dimension très pragmatique du langage qui amènera Austin et les chercheurs sur les actes de langage à bien comprendre que le sens d'un acte de langage est largement lié au contexte dans lequel on énonce une proposition. Pourquoi ? Parce que le langage...\n\nLa même proposition peut avoir différents sens suivant la situation dans laquelle on est. Et l'enfant commence déjà à faire avec ça. En psychiatrie, c'est un témoin essentiel de l'entrée dans ce qu'on a évoqué, la fonction symbolique. Utiliser des signifiants, des mots, du langage pour penser le monde en son absence. Mais c'est être capable aussi de jouer avec les signifiants, avec les mots, pour les détacher du monde et leur faire produire un autre sens. Marcher sur les œufs, on peut dire ne marche pas sur les œufs si l'enfant est là à côté d'œufs. On peut jouer avec cette expression par la suite pour l'amener à être prudent.\n\nDonc ça c'est cette dimension de la fonction symbolique qui se développe avec cette possibilité de transformer le sens de la proposition. La fonction symbolique du point de vue des actes de langage, on voit bien qu'elle se construit, elle s'investit. Dans un rapport différent entre le langage et le monde, avec la vérité, c'est-à-dire avec la manière dont le langage désigne le monde. Ça désigne autre chose. Donc, revenir sur cette construction de l'apprentissage que tout le monde connaît, ces temps-là, majeurs, ça permet de se rendre compte que... Cette dimension du performatif, des actes de langage, on y est de plein pied dès le début de notre vie.\n\nC'est ce qui nous constitue dans ce qui fait que nous sommes des êtres Grégaire, c'est-à-dire des êtres qui se construisent de manière interpersonnelle parmi les autres. On en a dit deux mots, mais il est important de revenir rapidement au langage du point de vue des pathologies. C'est ce qu'on désigne par les aphasies. Les pathologies du langage, c'est dans le grand ensemble des aphasies. Qu'est-ce qu'une aphasie ? Il y a des discussions sur les spécialistes, ce que l'on met ou pas dans les aphasies, de manière un peu grossière. Toutes les pathologies du langage peuvent être mises dans cet ensemble. Il y a le grand ensemble des dyslexies, les troubles de la lecture, du développement moteur et de l'écriture.\n\nEt le langage, on le voit bien, c'est aussi tracer un signe. Donc il y a les troubles de l'écriture, la dyspraxie, c'est un trouble du langage, de la manipulation des signes, parce que ce n'est pas simplement phonologique. De l'activité numérique, de la dyscalculie, le nombre. Comptez, c'est un langage, c'est un discours. Les dysphasies orales et les troubles dans les dys, on met l'ensemble des troubles de l'attention qui se traduisent par des difficultés pour lire des textes longs ou pour rester attentif quand on lit. Pour revenir à ce lien entre langage et pensée, ce lien consubstantiel, Logos, Le logos, c'est à la fois le langage et la pensée.\n\n[5. Neuropsychologie clinique : Aphasies de Broca et Wernicke vs souffrance au travail]\n\nCe qui est important de repérer dans les recherches sur les aphasies, c'est qu'il y a toujours une prévalence importante entre ces différents types de troubles. Il y a des corrélations toujours très importantes. Quand il y a un trouble, il est souvent associé à d'autres. Pourquoi ? Parce que tout ce qui a à voir avec l'expressif... Avoir aval à penser, ça se traduit dans les différents registres de l'expression et les différents registres de l'expression produisent des dysfonctionnements du point de vue de la pensée. C'est ça qui est important de repérer. Les aphasies, les TIA des aphasies, les déficits mentaux, les désorganisations de la personnalité.\n\nEt du fonctionnement cérébral, la confusion mentale, les lésions, qu'elles soient fondatoires ou les lésions du système nerveux, les troubles psychotiques ou les troubles envahissants de la personnalité ou les troubles du spectre autistique. Mais on peut rajouter aussi la dépression, le sujet qui ne parle plus. Le sujet qui passe son temps à parler, c'est la traduction d'un trouble du langage qui traduit un problème de personnalité ou un trouble de la personnalité qui se traduit dans le langage. A voir à chaque fois, c'est à essayer de comprendre chez un sujet comment est le lien.\n\nEst-ce que c'est le trouble de la personnalité qui produit les troubles du langage ou les troubles du langage qui produit les troubles de la personnalité ? C'est à chaque fois spécifique et c'est à étudier. Vous avez dans un vieux... Alors ça date un peu les 10 sur les 10 et puis vous avez dans la fin du diaporama un petit film sur les linguistes. Il y a des neurophysiciens et des linguistes qui s'intéressent aux troubles du langage. Il démarre avec un exemple où il y a le même trouble, mais pas le même problème neuronal.\n\nIl peut y avoir deux personnes qui confondent, on leur montre deux personnes un stylo, ils vont dire c'est un stylo, puis on leur montre des lunettes, ils vont dire c'est un stylo, et ça va renvoyer à différents types, différents problèmes, pour certains des lésions neuronales, pour d'autres non. C'est comme dit ce neurologue dans ce petit film, et il faut essayer de comprendre la relation entre ce qui est le trouble de la personnalité et ce qui est la manifestation au niveau du langage. Pour les psychologues du travail, c'est aussi la même question, c'est-à-dire quand le sujet a des difficultés ou quand se traduit une manifestation pathologique dans sa manière de parler le travail.\n\nLa question qui se pose, c'est est-ce que c'est sa difficulté à parler du travail qui va traduire du malaise ou est-ce que c'est son malaise, sa souffrance au travail, sa dépression au travail qui va produire des troubles du langage ? Il faut se poser la question dans les mêmes termes que les neurologues de cette relation qui est la cause et qui est de l'effet. Alors le cerveau rapidement, parce qu'on y reviendra du point de vue de l'outil, mais le cerveau pour un peu rafraîchir la mémoire à tout le monde, rafraîchir un peu, alors on sait tous que dès le 19ème siècle on a isolé des parties du...\n\nOn a topologisé le langage, le discours, avec ces célèbres, au XIXe siècle, la phase de Broca et la phase de Wernicke, où on a repéré qu'il y a des personnes, pour l'ère de Broca, dans la partie postérieure du lobe frontal gauche, qui avaient eu un trauma, un accident, et la personne... Vous comprenez très bien, la compréhension des phrases et du discours était tout à fait correcte, mais le sujet était dans l'impossibilité de pouvoir faire correctement des phrases. Ce n'était pas un problème de compréhension. Et du côté de l'aphasie de Wernicke, c'est plutôt une lésion dans une partie du cerveau.\n\nQui empêchait le sujet, alors on voit les traumas crâniens, les atteintes, les cancers, les addictions à l'alcool, viennent attaquer, viennent créer des lésions et amène le sujet à avoir des troubles de la compréhension des phrases, des mots et du langage. Comme on dit là, j'ai mis un exemple de 2007, mais j'ai arrêté en 2007 et 2010 de rajouter des éléments, puisque c'est tous les six mois, avec l'évolution de la technique. Ce qu'on peut dire, c'est que depuis le 19e siècle, on a repéré bien sûr qu'il y avait des... le langage était spatialisé dans le cerveau, mais ce qui était important ensuite, c'est les relations entre différents espaces, le langage.\n\nS'organise au regard des enjeux entre les différentes parties du cerveau. Et ce que l'on repère maintenant, c'est que le cerveau peut reconstituer différents parcours, différents espaces de fonctionnement de la langue. Il y a une atteinte dans une partie, il va reconstruire les fonctions langagières dans une autre partie du cerveau. On repère aussi que suivant les langues, ce ne sont pas les mêmes hémisphères, ce ne sont pas les mêmes parties du cerveau qui sont sollicitées quand on parle ou quand on fait des raisonnements. Vous avez une émission récente dans France Culture sur les fantasmes neuro-cérébraux dans les rendez-vous de la science.\n\nC'était dernièrement, c'est assez intéressant, où des neurologues disent finalement quand on mesure des activations du cerveau, quand on fait décrire par exemple à quelqu'un un objet et on regarde, bien servait à l'activité telle partie du cerveau. On refait cette expérience de manière importante et c'est toujours cette partie du cerveau. Ceci dit, le neurologue dit qu'on ne sait pas si, pendant qu'il décrit cet objet, il ne pense pas à autre chose. Finalement, ce qu'on vient repérer, c'est des régimes de probabilité. C'est-à-dire que quand il vient faire cette activité de description, cette partie du cerveau est probablement active. Il faut l'entendre de la sorte.\n\nEt ça varie, ça varie pour la même description, ça varie suivant les gens et suivant les langues que l'on utilise. Donc le cerveau est tellement plastique que cette question, il y a des zones du cerveau qui permettent de faire fonctionner le langage, mais on ne peut pas établir des lois universelles. Quelles que soient les langues, ce n'est pas toujours la même partie du cerveau qui fonctionne. Si vous avez des questions, vous pouvez prendre la parole. Je ne vous vois pas, vous ne me voyez pas, mais on peut essayer de se parler. Je déroule le diaporama. N'hésitez pas, si vous avez des questions, ne levez pas la main, prenez la parole et posez la question. Je vais demander une précision.\n\nEst-ce que vous êtes toujours là ? Oui, nous sommes toujours là. C'est super intéressant. Nous sommes dans des positions complètement psychotiques. Vous ne me voyez pas ? Je ne me vois pas. Dans le plan que j'ai annoncé, on y va au galop. Le langage, le lien consubstantiel entre langage et pensée, c'est quelque chose qui finalement est impartageable. Cette question que les actes de langage, le langage nous permet de nous construire en tant que sujet Transcription française. Transcription française. Transcription française. Arrive très tôt, cette incidence-là interpersonnelle, ces enjeux d'action pragmatique, pragmatique au sens de l'action.\n\nRegarder le langage du point de vue des pathologies, ça permet de comprendre les difficultés de construction d'un sujet, d'évolution, ça indique des choses, ça donne des indicateurs. Et c'est donc aussi à partir de là qu'il est important quand on est psychologue du travail d'écouter, de faire parler les gens pour voir ce que ça va faire produire, comment la personne va parler du travail, de l'activité pour en même temps la transformer et pour en même temps se transformer et pour en même temps dire ce qu'elle voudrait même si elle ne sait pas ce qu'elle veut et d'être déjà dans l'action.\n\n[6. Sémiotique stoïcienne : Séparation du monde réel et du monde du texte]\n\nL'autre nécessité pour arriver à mettre dans sa boîte conceptuelle, sa boîte à outils du psychologue du travail, cette notion de performatif et d'acte de langage, c'est de revenir rapidement sur comment on a pensé le signe et comment on a pensé la langue. Et comment cette manière de définir le langage, de définir la langue, de définir le signe. On a parlé d'abord de signe. Comment s'est venu poser un certain nombre de questions fondamentales, de questions essentielles, fondamentales et récurrentes, et dans ce sens-là, à laquelle on échoue à y répondre, on passe son temps à essayer, on avance parce qu'on passe son temps à vouloir essayer d'y répondre, on y répond un peu, mais elles se renouvellent.\n\nAlors là, on peut dire rapidement, c'est vraiment à grands traits, la première grande conception du signe, c'est celle des stoïciens, cinquième. Quatrième et troisième siècles avant Jésus-Christ. Pour les stoïciens, le langage, c'est d'abord un signe qui va produire une image acoustique. Et en lien avec le monde, la chose désignée. On commence à repérer qu'il y a quelque chose d'une trace, quelque chose qui fait signe, qui produit une image psychique. Le terme est vague, mais parce qu'on ne sait pas trop ce que ça produit, et d'autant plus que cette image psychique, si je dis voiture, ça ne va pas être la même voiture pour chacun d'entre nous. Donc la chose désignée.\n\nPourtant, on se met d'accord sur la chose désignée qui va être voiture. On voit tous à peu près un truc avec des roues et qui sert à se mouvoir. Dans cette organisation, cette définition de ce qu'est le langage, de ce qu'est le signe, qu'est-ce qu'on repère ? On repère qu'il y a un sujet, la voiture. Qui indique l'objet dont on parle, la chose désignée. Il y a un prédicat, la voiture roule, c'est-à-dire quelque chose, affirmer quelque chose sur le sujet. Ça c'est la première définition, le sujet et le prédicat. Première grande définition du signe. Le langage, le signe, c'est égal à une image psychique, donc quelque chose d'immatériel et la chose désignée. Alors, ça produit quoi comme postulat ?\n\nAlors, la linguistique s'intéresse, la philosophie et la linguistique posent des définitions, des théorèmes et des postulats et après, regardent les problèmes que ça pose. De ce postulat, il apparaît clairement deux choses. Premièrement, qu'il faut distinguer entre l'univers du signe et le monde, et la réalité désignée. Ça c'est important parce qu'on oublie un peu, on pense que c'est la même chose. Mais il faut toujours avoir ça en tête, qu'il y a le monde du texte et le monde. Quand on parle du monde, on construit un monde qui est le texte. Mais qui n'est pas le monde. Ça c'est important, c'est majeur.\n\nOn le voit bien dans la clinique, on va demander est-ce que vous avez eu, est-ce que vos parents étaient, est-ce que votre père était sévère ? Alors c'est le psychologue qui parle, on dit ah oui mon père était sévère, puis après on regarde le dossier, je fais de la protection de l'enfance et on regarde le dossier, mais non le père n'était pas sévère du tout. Ou est-ce que vous avez Est-ce que cette expérience a été difficile, dure, de l'horreur ? Ou est-ce que vous avez eu du plaisir dans cette expérience ou vous n'avez pas souffert de cette expérience ? Pour la même expérience, pour le même monde, on va produire deux mondes différents.\n\nDonc ça c'est important, c'est que le signe, le langage produit un monde distinct du monde. Il produit une relation, cette relation, est-ce que c'est vrai ou pas, c'est la question que ça pose, mais il ne faut toujours pas confondre ce que disent les gens et ce qu'ils ont vécu, le monde. Un bon sociologue, c'est quelqu'un qui va croiser ses questions, qui ne va pas se contenter avec un questionnaire en disant « est-ce que vous avez été heureux ? » Dans l'enfance, oui, ou d'accord, il a été heureux. Le bon sociologue va dire oui, il dit qu'il a été heureux et puis va poser d'autres questions croisées pour vérifier si ce que le sujet dit, ça peut se recouper, ça peut s'objectiver avec d'autres réponses.\n\nDonc ça, c'est un élément essentiel par rapport à la question. Du point de vue des actes de langage, cet enjeu est aussi important. Je vous promets que je vais ramener l'argent, je construis un monde où je vais promettre, mais ce n'est peut-être pas ça le monde, je ne suis pas obligé de ramener l'argent, de répondre à ma promesse. On voit bien que dès qu'on s'intéresse au langage, on s'intéresse à demain. L'autre point important, c'est le caractère matériel et immatériel du langage. Ce qui est le caractère matériel, c'est le signe, c'est le son, mais ce n'est pas l'image psychique. Et quand le monde n'est pas là, in absentia, ce n'est pas du tout le monde où la chose désignait.\n\nLe monde que ça désigne, c'est à la fois matériel et immatériel. On ne sait pas si ça existe. Et si c'est là, oui, il y a une dimension matérielle de ce monde désigné puisqu'on le voit ou la chose, on peut la manipuler. Mais ça aussi ne peut pas exister. Donc ça, c'est toujours aussi important de repérer cet enjeu matériel et immatériel, ce caractère matériel et immatériel du discours. Les problèmes que ça pose pour les philosophes et les linguistes, c'est pourquoi appellent-on un chien un chien ? Pourquoi appellent-on un ordinateur un ordinateur ? Pourquoi appellent-on un arbre un arbre ? Comment ça s'est construit ?\n\nComment cette relation entre le signe et la chose désignée et le monde, comment elle se construit ? On repère deux écoles, deux enjeux, celle de la motivation, qu'on appelle le lien naturel, c'est-à-dire que les mots se sont construits de telle manière qu'ils puissent désigner au mieux la chose dont on parle ou le monde que l'on décrit. Et là, on est plutôt du côté de l'étymologie, le sens des mots se sont transformés, le langage s'est transformé pour désigner de manière de plus en plus précise. La chose ou le monde dont on parle. Et il y a l'autre école qui est celle de l'arbitraire, qui veut que l'homme ait mesure de toute chose, qui met en avant le fait que c'est un choix arbitraire.\n\nEt on le verra avec la question du signifiant et du signifié. Et si on regarde les différences des langues, cet enjeu arbitraire est tout à fait important, c'est un choix culturel qui se construit en même temps que se construit le monde commun. De manière commune, je rappelle, à l'étéia, à la politéia éthique, la vérité, la politique et puis ce qui est correct et pas correct, mais le commun, le politique c'est le commun, on se met d'accord en commun. Donc, il y a ces deux tendances qui amènent Platon à dire qu'il y a les deux. Il y a d'une part l'intuition des essences et en même temps il y a aussi cet arbitraire.\n\nOn crée des analogies puisqu'on veut désigner au mieux comment est le monde et on met de l'arbitraire puisque l'homme, par sa pensée, inscrit sa présence dans l'usage du langage, dans sa manière d'utiliser le langage pour désigner le monde. Les premières conceptions du signe repèrent qu'il y a des lois de construction du discours, la base, un sujet et un prédicat. Le sujet, l'objet dont on parle et le prédicat, on en affirme quelque chose. Deux réalités distinctes, celle du signe, tout un monde, et puis celle de la chose ou du monde dont on parle sont deux choses différentes. Et il y a un enjeu, un questionnement, il y a une dimension matérielle et immatérielle.\n\nLe signe, c'est ce qu'il y a de plus matériel, cette trace, c'est la trace de ce qui a été dit, qu'elle soit le signe, que ce soit une trace, un son ou un trait. Et il y a une dimension immatérielle, c'est ce qu'on a voulu construire, désigner cette image psychique, cette dimension immatérielle qu'on a voulu construire grâce aux signes. Et tout l'enjeu, c'est du rapport de vérité, de relation entre ces deux univers. Et ça se construit avec l'organisation même du signe, des mots, des lettres, des phonèmes, des monèmes, des alphabets pour désigner au mieux le monde et comment à l'intérieur de cet outillage-là, finalement, l'homme y est son âme, il met son intention et il construit sa propre mesure.\n\nVous voyez qu'il y a là déjà inscrit, repéré chez les stoïciens, le fait qu'il va falloir discuter sur l'objectivation du monde ou de la chose par le langage, sachant que c'est aussi quelque chose qui est investi par ce que l'on a voulu mettre comme intention, comme intentionnalité, comme acte de langage. On le sait très bien, on peut dire la même chose de manière différente, ça va désigner la même chose, la même action, le même monde, mais ça va la faire apparaître différemment parce qu'on va y mettre sa propre mesure. Donc ça c'est la première grande définition du signe et pour aller vite. Alors, on a commencé à repérer, à s'intéresser à comment le langage fonctionne.\n\nAlors, il faut avoir en tête que le langage est très peu écrit, très peu de gens lisaient, très peu de gens écrivaient, même si les Égyptiens déjà le manipulaient, mais ce n'était quand même pas le commun des hommes. Donc, à ce titre-là, la question de l'écriture est venue transformer la langue et la transformation de la langue a produit aussi une manière de la parler autrement et on a commencé à s'intéresser à comment finalement ça se construisait et comment on pouvait y distinguer un certain nombre de lois.\n\n[7. La Grammaire de Port-Royal : Sujet, prédicat et ponctuation du discours]\n\nIl y a ce qu'on appelle l'école de Port-Royal, après Paris du XVIIe siècle, qui a étudié dès le début du XVIe, comment fonctionnait la langue, et on a essayé de voir un peu comment la langue se construisait, en se posant cette question classique, ce n'est pas un simple miroir de la réalité, comment elle se construit aussi en y mettant les mouvements de l'âme. Et donc, comment finalement se construit un certain nombre de lois, cette grammaire qui permet d'isoler un sujet, un prédicat, c'est-à-dire de dire quelque chose sur le sujet, avec un certain nombre de techniques, de moyens et de moyens de plus en plus sophistiqués. Et qui évolue avec la question de l'écriture.\n\nBien sûr, on peut citer 1440 Gutenberg, mais il n'y a pas que lui qui a inventé l'imprimerie. Mais le rapport au texte sacré, à la Bible, on sait très bien que les moines copiaient la Bible. Ils comprenaient pas trop ce qu'ils copiaient. Ils copiaient plutôt des figures que finalement un discours. Au fur et à mesure, on a élaboré des règles qui ont évolué. Et ça, c'était l'objet de la grammaire générale de Port-Royal qui donnera à les premiers linguistes. Les premiers linguistes sont les stoïciens. Qui sera le début de cette science qu'on appelle la linguistique.\n\nOn s'est appuyé sur comment on allait organiser les prédicats et on est parti des prédicables d'Aristote à partir des cas d'Aristote, ce logicien qui pensait le monde. L'éthique chez Aristote, la vertu c'est construire une pensée logique, ces quatre catégories où il faisait entrer le monde. Quatre causes, les causes formelles, les causes matérielles, les causes efficientes et les causes finales et matérielles. Formelle, je crois que j'ai oublié une, efficiente et finale. Donc Aristote faisait rentrer le monde dans ces différentes catégories et il a fait rentrer la manière de dire quelque chose du sujet, les prédicats dans ces catégories.\n\nDonc la grammaire de Port-Royal a isolé un certain nombre d'éléments dans le fonctionnement de la langue, le genre, l'espèce, ce qui est de l'humain, pas de l'humain, de l'objet, la différence. L'accident, c'est comme le contraire de la nécessité, c'est-à-dire l'usage des règles et de l'exception à la règle. C'est ce premier travail sur les universaux. Il y a un fonctionnement universel, mais dans le fonctionnement du langage, il y a des exceptions. Donc on a repéré que le verbe avait à voir avec l'attribution, on attribue quelque chose au sujet, ces premières règles de grammaire, que la manière de désigner les choses, c'était lié à...\n\nLa grammaire de Port-Royal a isolé un certain nombre de règles qui permettent d'étudier, de regarder comment fonctionne le langage. Et du point de vue des actes de langage, on a continué à regarder comment ces règles fonctionnent. Dans l'étude du langage du point de vue de la proposition. Comment la proposition, la voiture roule, comment cette proposition est construite. Et jusqu'à la question de la ponctuation. Cette nécessité est apparue, cette nécessité de ponctuer. Avec laquelle on a joué. Certains auteurs ont écrit des textes en ponctuation qui viennent transformer le monde. Et la ponctuation, c'est aussi lié à cette capacité, à cette dimension phonologique, au langage parlé.\n\nDans le langage écrit, on ne ponctue pas comme dans le langage parlé. On va s'arrêter. Dans la phrase « Igor, dit Adrien est un imbécile » et « Igor dit Adrien est un imbécile », on voit que l'imbécile c'est soit Igor, soit Adrien. Et on voit comment la ponctuation en lien avec le langage parlé donne un sens. Et là on est vraiment dans cette dimension très pragmatique. De la proposition, on voit comment ça va produire un autre sens. On aurait pu mettre aussi la phrase « messieurs les anglais tirez les premiers », on ne sait pas où est la virgule. On ne sait pas « messieurs les anglais tirez les premiers », on ne sait pas si c'est lui qui a dit d'ailleurs cette phrase.\n\nDonc on voit bien qu'il y a un certain nombre d'organisations de la phrase, de la proposition qui fait apparaître des lois de fonctionnement sémantique. Et ce fonctionnement sémantique est aussi lié à une organisation phonologique, à la manière de dire la phrase, de la ponctuer et de dire la phrase. Et donne un sens différent suivant la manière de la dire, c'est-à-dire suivant le contexte de son énonciation. Puisque entre la phrase écrite et la phrase énoncée, il y a un contexte qui est largement différent. Et le sens peut être largement différent. Donc là, la grammaire, on tombe sur cette question classique des universaux du langage, tout le travail de Chomsky, est-ce qu'il y a des règles universelles ou pas ?\n\nOui ou non, évidemment on ne va pas développer.\n\nLa conférence de Noam Chomsky, si vous avez du courage, ce n'est pas très glamour, mais qui revient sur pourquoi il s'est intéressé à savoir s'il y avait des universaux dans le langage et comment on ne peut pas répondre, comment il est difficile de répondre à ces questions. Il y en a et il n'y en a pas. Ensuite, il y a deux mots rapides sur la linguistique du 19ème, fin 18ème, début du 19ème. L'intérêt de s'intéresser à la linguistique historique, c'est parce que la linguistique historique a regardé son objet, ça a été comment les langues se transforment.\n\nEt ça c'est important aussi pour nous, c'est comment les actes de langage se transforment, comment la manière de parler le travail se transforme, comment le discours du management, comment le discours sur le travail, comment le vocabulaire, comment les situations où on parle le travail se transforment, On avait travaillé les années précédentes sur un avant, un après Covid, avec cette idée de le Covid amener les gens à construire un autre rapport au travail et donc parler autrement le travail. Donc ça c'est intéressant de voir comment le langage se transforme, comment les actes de langage se transforment.\n\nAlors ce que repère la linguistique, c'est que le langage, Transformer de manière pas uniquement consciente, culturelle, dans cette organisation de l'arbitraire, mais aussi dans ce rapport entre le phonologique et l'écriture. C'est intéressant qu'il y ait un lien entre la phonologie et la sémantique. Ce qui fait qu'il y a un ajustement permanent qui amène une transformation permanente de la langue. Dans l'évolution, il y a une question qui revient assez souvent, c'est est-ce que les langues s'enrichissent ? Est-ce que le langage courant... Est-ce qu'il s'appauvrit ou s'enrichit ?\n\nS'intéresser à la transformation du langage, c'est aussi voir qu'il y a des espaces qui s'appauvrissent, il y a des dimensions qui s'appauvrissent et en même temps il y a d'autres dimensions qui s'enrichissent. Les émojis, les SMS, ça s'appauvrit du point de vue de la compétence langagière, du vocabulaire, des capacités poétiques et de la richesse du vocabulaire, mais en même temps ça s'enrichit du point de vue du commun, c'est-à-dire de la rapidité, de la compréhension rapide. C'est intéressant de voir comment la linguistique historique qui étudie les transformations pose les bases de quelque chose de tout à fait intéressant.\n\nRepérer les différences et les évolutions ça permet donc de repérer nos évolutions du rapport au monde et aux autres et de notre manière d'utiliser différemment le performatif pour pouvoir l'utiliser mieux ou plus rapidement ou pour pouvoir éviter les pièges voilà donc ça c'est quand même quelque chose qui est important. Alors la linguistique historique, c'est bien sûr, a toujours posé la question de est-ce qu'il y a une langue originelle, cette mythe de la bébélisation. Pendant longtemps, on a cherché si c'était le sanscrit, puis non, et puis oui, puis non. Je crois que c'est un mythe, la langue originelle. C'est intéressant aussi du point de vue de la place de l'anglais dans le travail.\n\nEst-ce qu'il y a une langue non pas originelle mais universelle qui fonctionnerait de manière universelle pour tout le monde ? Est-ce qu'il y aurait quelque chose qui permettrait de construire notre rapport au travail, à l'activité et aux autres dans l'activité de manière universelle ? On le voit bien depuis très longtemps. Est-ce que vous voulez prendre des cours d'anglais ? L'anglais pour travailler, ça va être différent de l'anglais pour faire du tourisme ou de l'anglais pour étudier les œuvres littéraires anglaises. Donc ça, c'est toutes ces questions-là de la linguistique historique. On les retrouve aussi dans notre manière de penser le performatif dans la clinique du travail.\n\nAlors, il y a un avant et un après, il me reste 34. J'ai jusqu'à 20 heures, c'est ça ? Allô ? Tout le monde est mort ? Oui, tout à fait. Non, non, c'est juste à 20h. Oui, tout à fait, nous sommes tous morts. J'ai tué tout le monde. Bon, très bien, il y a des vivants. On est tous, on est encore vivants. Oui, alors il y a, ça c'est aussi la conception du signe chez les stoïciens, un sujet, un prédical. Les enjeux d'étymologie, les enjeux de l'arbitraire, l'arrivée des questions de construction de la proposition, la grammaire, la question de l'évolution de la langue avec la linguistique historique et la construction et de repérer que c'est constamment en train de bouger.\n\n[8. Ferdinand de Saussure : Signifiant, signifié, arbitraire et axes syntagmatique/paradigmatique]\n\nC'est ça qui est important, ça bouge tout le temps. Il ne peut pas y avoir de langage sans que ça... Il n'y aura pas un langage stade. Une langue sera toujours... La langue sera toujours en train de bouger. On se pose la même question. Les langues mortes, on les traduit différemment. Le latin, il y a des gens qui parlent latin. Le latin n'est pas mort. Il y a des messes en latin. Donc la langue est toujours vivante. C'est toujours du vivant. Il y a un avant et un après aussi Ferdinand de Saussure. Ferdinand de Saussure, philosophe. La fin du 19e et début du 20e. C'est comme Einstein. Il a posé des choses qui ont été discutées, critiquées et qui ont permis d'ouvrir sur d'autres avancées.\n\nFerdinand Saussure, philosophe, linguiste. Il n'a pas écrit le cours de linguistique générale. Il donnait des cours. Ses étudiants, ses collègues profs, suivaient ses cours. On remis ça dans des cahiers, ça donnait le cours de linguistique générale. Et ce qui est important, c'est que tout le monde se met d'accord sur une conception du signe qui amènera le structuralisme, qui veut que le signe est une réalité à deux faces, un assemblage.\n\nArbitrairement construit par la culture, il faudrait dire entre un signifiant et un signifié. Ce cheval, c'est tiré du cours de linguistique générale. Le signifié, c'est le cheval, c'est cette image acoustique et le signifiant, c'est le mot cheval. Et donc, pour Ferdinand Saussure, finalement, la langue, le langage... Alors là, il essaie d'étudier, non pas le signe, mais il essaie d'étudier comment les phrases se construisent, comment les langues se construisent. Et il repère, dans cette idée qu'il poursuit, comme les linguistes, cette hypothèse qu'il voudrait, qu'il veut et qu'il voudrait qu'il y ait des universaux, quelles que soient les langues, il y a un assemblage.\n\nArbitraire du point de vue de la culture, parce qu'on dit souvent arbitraire, mais c'est arbitraire du point de vue de la culture, c'est-à-dire on se met d'accord dans du commun pour dire que c'est ça. Et il y a à la fois un choix arbitraire, mais qui est un peu aussi du hasard, du fonctionnement, d'étymologique, des mots, de comment ils s'organisent, d'enjeux culturels. Donc c'est très difficile de trouver des lois universelles pour vous. Pour indiquer comment on assemble le signifiant et le signifié.\n\nMais il part de cette hypothèse-là, de ce qu'on nommera la linguistique structuraliste, qui considère que le signe est arbitaire, il n'y a pas une relation nécessaire entre le signifiant et le signifié, et c'est largement fixé par la culture, et moins que c'est le choix que par l'étymologie. Puisqu'on le voit dans le même mot, va désigner deux choses différentes, va avoir deux signifiés différents, si en anglais ou en français. Et ça dépend aussi de la question du contexte culturel. Le terme de « perdre la tête », ça veut bien dire quelque chose en français.\n\nSi on demande à Google Trad de traduire « perdre la tête », il ne va pas… Alors maintenant, avec l'IA, oui, mais s'il le traduit de manière mot à mot, ça va dire autre chose que ce que ça veut dire dans la culture française. Alors, comment… Comment se construit cet arbitré et comment on l'apprend ? C'est de manière, comme je vous l'ai dit, par rapport à l'apprentissage du langage. Ce qui est repéré, c'est de manière très statistique. On repère que très tôt, notre cerveau a tel signifiant, on comprend que ça correspond arbitrairement, de manière commune, à un signifié.\n\nCertains vont voir un cheval noir, d'autres un cheval blanc, peut-être un zèbre, un petit cheval, un grand cheval, un aleuzan, un pur sang, un cheval de trait, suivant notre histoire et notre culture. Alors ce qui permet cette hypothèse-là,\n\nCette hypothèse-là de l'assemblage du signifiant et du signifié permet à Ferdinand Saussure et à Jacobson aussi, son collègue, de repérer deux grandes lois de fonctionnement du langage. Ça permet de voir comment le langage fonctionne du point de vue de l'organisation de la proposition et aussi du point de vue de... L'énonciation de la proposition, c'est-à-dire de l'usage du langage. Ferdinand Saussure distingue dans le langage l'écrit et l'oral. Il y a deux choses différentes, mais ça fonctionne en même temps. Il y a des lois différentes, mais il y a des lois d'ensemble universel à ces deux manières, le langage écrit et le langage parlé.\n\nAlors, il y a deux relations fondamentales qui le représentent de manière orthonormée. Les relations syntagmatiques qui sont liées aux lois, à cette grammaire que l'école de Port-Royal avait isolée, c'est-à-dire un sujet, un verbe, à des enjeux ensuite que la linguistique générale avait repérés, phonologiques, c'est-à-dire Des voyelles ouvertes et des voyelles fermées. On ne peut pas toujours avoir des hauts. Il y a du plus et du moins dans l'organisation phonologique. Il y a un certain nombre de règles qui fixent un certain nombre de relations syntagmatiques. Le sujet, le verbe, le complément, un certain nombre de lois qui organisent le langage.\n\nEt des relations paradigmatiques qui ont à voir avec l'association des idées, c'est-à-dire comment on vient associer, combien on vient construire une histoire, combien on vient organiser un texte, comment on va organiser une phrase. Une action, une description du monde où nous sommes obligés de faire une mise en scène des idées pour que ça soit compréhensible et pour que ça ait du sens. Donc il y a un croisement entre des relations sacramatiques et des relations paradigmatiques. L'acte de langage obéit à ses lois, c'est-à-dire que l'acte de langage suppose de faire une proposition. Je promets de ramener l'argent demain.\n\nJe suis obligé de faire une proposition selon les lois de fonctionnement d'une phrase, d'un sujet, d'un verbe, d'un complément. Je mets en scène aussi une idée qui est organisée de manière paradigmatique, même si je pouvais faire comme Maître Yoda. Demain, je parie ramener l'argent, ou je promets ramener l'argent, mais au-delà de cet effet poétique de Maître Yoda du meilleur des mondes, la guerre des étoiles. Je suis bien obligé d'organiser mes idées dans des relations logiques pour me faire comprendre. Autrement, vous allez dire que si je ne le fais pas, que je délire ou je raconte n'importe quoi, ça va être incompréhensible.\n\nCe qui est très important, c'est cette hypothèse de l'assemblage du signifiant et du signifié, de voir comment ça fonctionne. Cela fait apparaître pour Saussure et Jacobson deux niveaux logiques, syntagmatiques et paradigmatiques, et on retrouve ça dans la manière de construire les actes de langage.\n\nLe débat, les problèmes que ça pose, c'est le lien entre ce qui est du purement syntagmatique, ce qui est du purement paradigmatique. Il y a de nombreux linguistes qui discutent de cette dimension des règles du langage sémantique. C'est quelque chose qui a aussi à voir avec le paradigmatique. On peut discuter de ça, mais ce n'est pas notre intérêt par rapport à ce que l'on veut faire, c'est-à-dire de l'usage de la notion et du concept d'acte de langage dans la clinique du travail. Avant de conclure sur la question et d'introduire la question des actes de langage et résumer, on a la première conception du signe qui est repéré, c'est l'image acoustique plus la chose désignée avec un sujet et un prédicat.\n\nLe sujet indique que l'objet dont on parle et le prédicat en affirme quelque chose. Une question fondamentale qui est la relation entre ce signe et le monde dont on parle. Est-ce que c'est motivé par le lien naturel ou est-ce que c'est de l'arbitraire et est-ce que c'est vrai ou c'est faux ? Cette question est attachée de manière structurelle. La question de l'organisation de la proposition. L'apport de Saussure avec l'image acoustique et le mot et cette question de l'arbitraire permet de comprendre que dans les enjeux syntagmatiques, dans les compétences langagières, on a un réservoir de compétences syntagmatiques, d'organisation et l'apprentissage. C'est construire cet usage de compétences syntagmatiques.\n\nOn apprend à faire des phrases. Et puis, on apprend aussi à les utiliser, à associer les idées à l'école. Maintenant, on va décrire ce que vous avez vu cet après-midi pendant votre sortie. On commence à faire des rédactions, des dissertations. On est dans la possibilité d'utiliser le langage, une compétence du langage tant au niveau de la proposition, de l'usage propositionnel, que de l'organisation des idées et donc que d'une compétence pragmatique, c'est-à-dire...\n\n[9. John L. Austin : La rupture performative et les conditions de félicité]\n\nDe faire du langage, du discours, un acte de langage, une dimension performative, c'est-à-dire quelque chose qui va pouvoir nous permettre de construire un monde, transformer le monde, avoir une action sur le monde, répondre à des actions qu'on nous demande, donc utiliser le langage d'un point de vue performatif, c'est-à-dire dans l'idée de commettre des actions. L'acte de langage, c'est finalement l'aboutissement, c'est le but même du langage, du discours, c'est le fait que ça nous sert à... Agir sur le monde, ça nous sert à faire des actions et ça nous sert à être dans le monde. Donc ça, c'était isolé, c'est ce qu'on appelle, ce qu'on repère très tôt.\n\nAlors là, je n'ai pas de caméra, je voulais vous montrer la prochaine fois. C'est cette histoire, donc dans les éléments bibliographiques et dans les ressources documentaires, vous avez un texte de Barbara Cassin, qui est linguiste, qui a écrit « Quand dire, c'est vraiment faire ? » Et qui fait cette histoire du performatif des Grecs à nos jours. C'est comment on a pensé le performatif, le perlocutoire. Alors on distingue le performatif et le perlocutoire. C'est des distinctions un peu oiseuses. Le perlocutoire insiste plus sur la notion d'action, le performatif plus sur en quoi le propositionnel produit de l'action, peu importe. Mais des Grecs...\n\nA Austin, on a bien compris que le langage c'est proprement un outil de l'action. Et donc il y a un philosophe, John Lanzo Austin, qui était philosophe qui s'intéressait au langage courant. Alors pourquoi il s'intéressait au langage courant ? Alors un bon philosophe, il voulait avancer du côté de la raison humaine. Qu'est-ce que la raison humaine ? C'est le truc des philosophes. Pourquoi l'humain est un sujet raisonnable ? Pourquoi il n'est pas raisonnable ? Qu'est-ce qui fait finalement que c'est un être de raison ? Et Austin se méfiait des grandes théories philosophiques. Il dit que tout le monde, même si on n'a pas fait d'études, on peut être un être de raison.\n\nOn peut penser de manière correcte sans avoir lu un seul ouvrage, sans savoir écrire. Il part du principe qu'on va trouver comment le langage construit notre raison en s'intéressant au langage courant. Il s'intéressait au langage courant à partir de choses de la vie quotidienne. Et il démarre ses conférences, son texte. Alors, je ne peux pas vous le montrer, mais c'est quand dire, c'est faire, ou ce que l'on peut faire avec les mots en anglais. C'est une série de conférences, 12 conférences. Et à partir de là, il en a tiré une théorie. Comment ça marche quand on dit, pouvez-vous me faire passer le sel ? Pourquoi on me fait passer le sel ?\n\nComment d'ailleurs on peut rigoler avec en disant « oui, je peux te le faire passer », on ne le fait pas passer. Mais finalement, il vaut mieux s'intéresser au langage courant pour penser le langage comme quelque chose qui nous constitue en tant que sujet de la raison, c'est-à-dire des sujets qui sont capables de se repérer dans le monde et de vivre parmi les autres et de construire des actions. Et à force de s'intéresser à la vie quotidienne, à la vie courante, finalement, il a isolé… Ce qu'on appelle les actes de langage. Il aura consacré son œuvre, parce qu'il est mort assez jeune, finalement à la dimension performative des actes de langage de la vie quotidienne.\n\nMais il démarre avec ça, il démarre avec cette dimension-là. Universo, en tout cas, il regarde une dimension, une efficacité du performatif. Le performatif fonctionne, l'acte de langage fonctionne, suivant le contexte de l'énonciation. C'est-à-dire que le sens de la phrase, si on regarde la phrase du point de vue des actes de langage, on n'a pas d'autre possibilité que de la regarder. Dans une situation d'énonciation, on ne peut pas regarder la notion « pouvez-vous me faire passer le sel », faire l'analyse juste propositionnelle. Il faut regarder comment ça fonctionne dans la situation.\n\nEt en regardant la vie quotidienne, ce qui est notre vie, il montre, il démontre que finalement ce qui fait de la force du performatif, la force de l'acte de langage, c'est la situation et notamment… Le statut du locuteur, de celui qui parle, dans quelle situation. Et il met en avant cet enjeu majeur qui veut qu'un performatif peut fonctionner uniquement s'il est en lien, en adéquation, en lien de manière rationnelle avec le statut du locuteur. Si je dis, par exemple, je vous déclare marié femme, si je ne suis pas mère, ça ne fonctionnera pas. Je ne peux vous marier que si je suis mère. Et ça suppose tout un rituel, ça suppose toute une organisation de la construction de mon statut.\n\nSi je vous dis je vous arrête, si quelqu'un dans la rue vous dit je vous arrête et qu'il n'a pas de képi ou qu'il n'a pas d'uniforme, vous n'allez pas forcément vous arrêter. Par contre, s'il en a un et puis uniforme... Il y en a qui ne s'arrêtent pas. Mais là, vous allez commencer la plupart du temps, de manière commune, on commence à s'inquiéter et on s'arrête. Parce que la personne qui prononce cette phrase a un statut et donc a une force performative. Il repère que le performatif fonctionne essentiellement par le fait que le sens de la proposition Du point de vue de la dimension performative, s'ajustent au regard du contexte et du statut.\n\nDe même, la question si un juge vous dit un samedi soir parce que vous connaissez un juge, je vous condamne, ça peut peut-être vous inquiéter du point de vue de sa personnalité, mais ça vous inquiètera plus si c'est le même que vous connaissez, mais que vous êtes dans un prétoire. Donc, ce qu'il met en avant, ce qui fonctionne, ce qu'il repère, c'est cet enjeu primordial dans l'acte de langage, du statut et du contexte de l'énonciation de la proposition. C'est l'essentiel de... Alors, il n'invente rien, les Grecs avaient repéré que... C'est important de voir qu'il part de là, qu'il repère que le sens... Des actes de langage dans la vie quotidienne se construit à partir du contexte et du statut de la personne.\n\nÇa, c'est un élément important dans la clinique du travail. La clinique du travail du point de vue performatif, c'est dans quel contexte et qui a prononcé cette phrase. Tout votre travail, ça va être de repérer dans quel contexte, de construire ces contextes, de distinguer les statuts des personnes. Ça va être différent si c'est le manager, si c'est le subalterne, ça va être différent si c'est une personne qui n'est pas de statut, qui a un statut de vacataire et qui n'est pas un statut permanent dans une entreprise, qui a un statut d'associé. Donc, premier élément de la clinique du travail, de la clinique des actes de langage dans la clinique du travail, c'est statut et contexte de situation de l'énonciation.\n\n[10. John Searle : La taxonomie des 5 actes de langage appliquée au travail]\n\nAlors, un héritier direct d'Austin, c'est John Searle. Alors là on a les traductions, 62 c'est la traduction française, c'est 59 et 63 c'est la traduction française. John Searle, dans la lignée d'Austin, parle d'actylocutoire et il Il passe du performatif à l'acte de langage et de l'acte de langage alliocutoire pour faire valoir la notion d'intention. C'est-à-dire que l'homme est présent sans toute chose. Ce qui est important dans l'acte de langage, c'est l'intention que le sujet humain met dans cet acte de langage. L'acte de langage, on ne peut pas le penser comme vrai ou faux, mais on peut le penser comme il sera valide ou pas valide. Suivant le statut de la personne, le contexte et l'intention.\n\nIl faut donc étudier l'intention de celui qui parle. Il y ajoute une autre dimension. Il s'intéresse comme Austin à la vie quotidienne. Et ça lui permet de repérer avec ce concept cette notion d'actylocutoire. On travaillera sur la notion d'actylocutoire. Le fait que quand on parle, un acte de langage, c'est à la fois un acte d'énonciation, il s'agit d'articuler des sons, une proposition qui organise les prédicats, il faut faire une phrase, c'est cette dimension c'est tagmatique du langage et paradigmatique avec des idées, et on y met une intention suivant le statut que l'on occupe et le contexte de cette énonciation de proposition. Donc l'acte de langage, le performatif fonctionne à trois niveaux.\n\nCelui de l'énonciation, le niveau propositionnel et le niveau illocutoire. Ce qui lui permettra de dégager, et on travaillera ça, une dimension indirecte des actes de langage. Une première chose, c'est que l'acte de langage, c'est toujours un ajustement entre les mots et le monde. Il y a deux actes de langage standards. Il en isole cinq. Ce qui est étonnant, il crée une taxonomie ou cinq catégories. Et vous pouvez vous amuser à faire entrer l'ensemble des actes de langage dans ces différentes catégories. Cela fonctionne assez bien. Le problème, des fois, on a du mal à décider parce qu'il y a des actes de langage indirects. On va le voir.\n\nAlors, ces deux grandes catégories, l'assertif et les déclaratifs, permettent de repérer que, finalement, l'acte de langage, c'est une manière d'ajuster les mots et le monde. Voilà, ça c'est aussi un critère de mesure des actes de langage. Donc trois actes de langage, une énonciation, une proposition, un acte illocatoire, c'est-à-dire avec une intention, un ajustement des mots et du monde et qui permet de saisir la validité de l'intention de l'acte de langage. Avec d'un côté les assertifs, on ajuste les mots au monde. Maintenant, il fait nuit. Je ne sais pas, vous sûrement, oui, mais moi, là, devant ma fenêtre, il fait nuit. Ou il est 20h02. J'ajuste les mots au monde.\n\nEt le déclaratif, on ajuste le monde au mot. Je vous marie, je vous arrête ou je déclare parce que j'ai la capacité de mon statut de dire on va continuer deux ou trois minutes de plus. Je déclare que je vais continuer le cours de deux ou trois minutes de plus. Je peux le faire parce que j'occupe en statut. Et à l'intérieur de ça, on y reviendra, mais à l'intérieur de ça, il y a des directives, des promissifs et des expressifs. Donc, l'avantage de CERN, c'est de simplifier et de repérer des lois fondamentales pour essayer de comprendre comment fonctionne un acte de langage et on essaiera de donner des exemples et de discuter.\n\nEst-ce que cet acte de langage est valide ou est-ce que c'est un déclaratif, un directif, un promissif ? Et avec cette difficulté, des actes de langage indirects, c'est l'ironie. Je vais dire que je vous condamne pour dire autre chose, parce que c'est un acte de langage. Monsieur, vous me marchez sur les pieds. Alors, on n'est pas qu'un simple assertif. Je veux dire par là, indirectement, que je vous demande de ne pas... C'est indirectif. Je vous demande de ne pas me marcher sur les pieds. Donc on discute, on verra ça, comment on peut faire usage de ces dimensions surliennes des actes de langage pour essayer de comprendre quelques exemples de la vie au travail.\n\nLa vie au travail, ça va être un certain nombre d'assertifs, de directives, de promissives, d'expressifs et de déclaratifs. Un règlement, c'est du déclaratif. Il serait important de remplir ce questionnaire. Je vous remercie. Je vous remercie, c'est plutôt un directif si c'est votre manager qui vous envoie ce mail. Donc on discutera de ça et pour terminer l'autre partie qu'on évoquera au prochain cours en vidéo, j'espère qu'il y aura la caméra, je vous prie bien vouloir m'en excuser, sur la notion d'agir communicationnel.\n\n[11. Perspectives critiques : Habermas, Honneth, Bourdieu et le marché linguistique]\n\nDans le sens où l'acte de langage, alors toujours pareil, Jürgen Habermas, philosophe allemand, j'y reviendrai, mais qui s'intéresse à la raison et qui nous dit que nous sommes des sujets raisonnables parce que nous sommes dans des situations langagières et ce qui nous permet de développer ce concept d'agir communicationnel. Et on essaiera de voir comment Habermas, vous savez, c'est lui qui a beaucoup travaillé sur la notion de démocratie, sur ses enjeux de communication et ses enjeux de discussion. Et cette nécessité fait que la discussion nous engage de manière transcendantale dans une entente, cette dimension. On évoquera les actes de langage du point de vue de l'agir communicationnel d'Abermas.\n\nEt bien sûr, dans la lignée d'Abermas, le principe plus grand critique d'Abermas, c'est son héritier, Axel Honnête, qui nous dit qu'avant... De vouloir être des sujets raisonnables, ce que cherche l'humain c'est d'être reconnu, c'est pour ça qu'il a envie de parler, qu'il se met dans des situations langagières, qu'il devient raisonnable pour pouvoir produire du langage, pour être reconnu et se construire en tant que sujet. Donc les enjeux de reconnaissance et de non reconnaissance au travail, il y en a un paquet.\n\nLes actes de langage, l'analyse des actes de langage permettent de voir que se manifestent des enjeux d'invisibilité sociale, d'invisibilité au travail, de non reconnaissance, des besoins de reconnaissance. Donc les actes de langage permettent de regarder et d'évaluer. Dans la clinique du travail, ce qui se joue du côté de la non reconnaissance et de la reconnaissance de la personne dans la situation du travail. Et on terminera, je termine par ça, par ce que j'ai évoqué, c'est à dire le langage comme un marché, comme quelque chose qui va produire de la valeur et qui permet de nous distinguer. J'ai plus de valeur que toi, j'ai plus de discours.\n\nDu scientifique va utiliser un certain nombre de vocabulaire, va parler d'une certaine manière, va produire des actes de langage d'une certaine manière pour dire qu'il est scientifique ou pour dire qu'il est manager, pour asseoir son pouvoir. Tout ça parce que l'acte de langage, c'est ce qui permet de s'inscrire dans le marché linguistique. Mais à travers un champ, c'est la théorie des champs de Bourdieu, qui fait qu'on se construit, on se socialise à travers notre capacité à nous situer dans le champ, au regard du fait que le champ nous permet par délégation et nous autorise à penser qu'on a une certaine valeur dans le champ, donc un certain capital.\n\nDonc il sera important aussi de regarder à travers Bourdieu comment l'acte de langage c'est quelque chose qui nous permet de nous inscrire dans un marché linguistique et de construire sa place au travail et de construire sa valeur dans une situation de travail ou de défendre son capital de compétences dans la situation de travail et ça passera par des actes de langage. 20h08, je vous prie de bien vouloir m'excuser encore une fois d'avoir raté l'usage de ma caméra, d'avoir dépassé de 8 minutes. Est-ce qu'il y a une question pour conclure ? Question dans le forum, j'essaierai d'y répondre. Là, la suite, c'est que je vous propose des exercices dans l'activité à distance.\n\n[12. Consignes pour l'activité distante sur le forum, visagéité et conclusion]\n\nDonc, dans le cours, avec moi, il y a 17 heures. Il y a le cours, les visios, les activités distantes. Et puis après, il y a tout votre travail personnel. Ce n'est pas que 17 heures. Et donc, là, il y a beaucoup de choses à lire. Vous pouvez y rester 302 heures si vous voulez, mais vous pouvez aussi... Chacun fait comme il peut avec le temps dont il dispose. N'hésitez pas, vous pouvez poser des questions dans le forum. Un petit commentaire, une conclusion à vous. Est-ce que vous avez quelque chose à dire ? Non, c'est ok pour ce soir. C'est bon ? Oui, Jean ?\n\nVous avancez, alors du point de vue des actes de langage, on parlera de la visagéité, c'est-à-dire le fait d'avancer, c'est-à-dire c'est toute la dimension fatigue du discours. Quand je vous regarde, là je ne peux pas voir, vous regardez, vous avancez, il a envie de dire quelque chose. L'acte de langage c'est aussi cette dimension fatigue. Non, mais non, c'était un pur hasard ou presque un acte de langage manqué.\n\nBon allez, je vous remercie d'avoir été attentif, je vous dis à bientôt dans le forum, regardez les exercices, si vous ne comprenez pas, posez moi la question et je vous promets, je ne comprends pas pourquoi il n'y a pas la caméra, c'est la première fois où je n'ai pas la caméra, des fois c'est la technique. Merci monsieur Lucie, bonne soirée. L'usage des objets techniques. A bientôt. Au revoir. Bonne soirée. Au revoir.",
    "bibliographieCitee": [
      {
        "titre": "Quand dire, c'est faire (How to do things with words)",
        "auteur": "John L. Austin",
        "annee": "1962 / 1970",
        "remarque": "Ouvrage fondateur de la théorie des actes de parole et de la rupture performative.",
        "url": "https://fr.wikipedia.org/wiki/Quand_dire,_c%27est_faire"
      },
      {
        "titre": "Les actes de langage : Essai de philosophie du langage (Speech Acts)",
        "auteur": "John R. Searle",
        "annee": "1969 / 1972",
        "remarque": "Formalisation de la théorie des actes de langage et des règles constitutives."
      },
      {
        "titre": "Sens et expression : Études de théorie des actes de langage",
        "auteur": "John R. Searle",
        "annee": "1979 / 1982",
        "remarque": "Définition de la taxonomie des 5 actes de parole et des actes indirects."
      },
      {
        "titre": "Quand dire, c'est vraiment faire",
        "auteur": "Barbara Cassin",
        "annee": "2018",
        "remarque": "Généalogie de la force performative, des sophistes grecs à Austin et la politique."
      },
      {
        "titre": "Ce que parler veut dire : L'économie des échanges linguistiques",
        "auteur": "Pierre Bourdieu",
        "annee": "1982",
        "remarque": "Critique de l'illusion internaliste d'Austin : marché linguistique et capital symbolique."
      },
      {
        "titre": "Théorie de l'agir communicationnel (Tomes 1 et 2)",
        "auteur": "Jürgen Habermas",
        "annee": "1981 / 1987",
        "remarque": "Agir communicationnel vs agir stratégique et éthique de la discussion."
      },
      {
        "titre": "La lutte pour la reconnaissance",
        "auteur": "Axel Honneth",
        "annee": "1992 / 2000",
        "remarque": "Théorie des trois sphères de la reconnaissance et clinique du mépris social."
      },
      {
        "titre": "Mille Plateaux (Capitalisme et schizophrénie 2)",
        "auteur": "Gilles Deleuze & Félix Guattari",
        "annee": "1980",
        "remarque": "Le concept de ritournelle et la territorialisation psychique par le son."
      },
      {
        "titre": "Cours de linguistique générale",
        "auteur": "Ferdinand de Saussure",
        "annee": "1916 / 1972",
        "remarque": "Signifiant/signifié, arbitraire du signe et axes syntagmatique/paradigmatique."
      },
      {
        "titre": "Grammaire générale et raisonnée de Port-Royal",
        "auteur": "Antoine Arnauld & Claude Lancelot",
        "annee": "1660",
        "remarque": "Structure rationnelle de la proposition en Sujet + Prédicat."
      }
    ]
  },


// ══════════════════════════════════════════════════════════════════════════
  // PST108 — COURS 3 : LA COMMUNICATION COMME ACTIVITÉ CONJOINTE (F. VALLS)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "id": "pst108-s3",
    "moduleKey": "pst108",
    "moduleLabel": "PST108",
    "numeroSeance": 3,
    "titre": "Séance 3 — La Communication comme Activité Conjointe, Enjeux et Écologie de l'Interaction",
    "sousTitre": "Dépassement du modèle de Shannon, Rodolphe Ghiglione (contrat de communication, objectif vs enjeu), Dominique Wolton, injonctions paradoxales et marqueurs symboliques de l'espace",
    "enseignant": "M. Francis VALLS (Psychosociologue, ancien éducateur de rue, intervenant IFTS, formateur Cnam)",
    "dateSeance": "Novembre 2026 (Séance présentielle)",
    "format": "presentiel",
    "dureeEnregistrement": "2 h 16 min 07 s",
    "resumeExecutif": [
      "La communication comme activité conjointe et écosystème : La psychosociologie aborde la communication comme une interaction circulaire, systémique et fragile, et non comme un simple transfert linéaire d'informations. Trois registres constamment imbriqués sont mobilisés : le verbal (les mots), le non-verbal (regards, postures, gestes, orientation corporelle, occupation spatiale) et le paraverbal (voix, intonation, débit, volume, pauses, silences). Réfutation du préjugé 'le corps ne ment pas et la parole est trompeuse' : le sens d'un geste ou d'un ton dépend toujours du contexte, de la culture et de la relation.",
      "Dépassement du modèle mécaniste de Shannon & Weaver : Si le schéma émetteur-message-récepteur-feedback conserve une valeur heuristique initiale pour repérer les décalages de cadres de référence et les asymétries de statut (ex: formateur de 80 ans vs étudiants de 20 ans), il est insuffisant. Dans une interaction réelle, l'émetteur est simultanément récepteur. La communication est circulaire, rétroactive et co-construite.",
      "L'apport de Rodolphe Ghiglione ('L'homme communiquant', 'Je vous ai compris') : De l'intralocuteur (sujet porteur d'une histoire et de savoirs isolés) à l'interlocuteur (partage effectif d'un sens commun dans une situation potentiellement communicative, SPC). La formule politique du général de Gaulle en 1958 ('Je vous ai compris') illustre le piège d'un accord illusoire où chacun projette ce qu'il a envie d'entendre, provoquant un feedback d'autant plus violent.",
      "Distinction princeps d'examen : Objectif vs Enjeu : L'objectif désigne la tâche explicite, le livrable ou le résultat quantifiable requis par l'organisation. L'enjeu désigne le sens, ce qui compte pour la personne, ses priorités existentielles et ce qu'elle cherche à préserver. Exemple clinique marquant de Valls : fournir un CDI temps plein (objectif atteint) à une mère célibataire qui démissionne en larmes trois jours plus tard car elle n'a personne pour garder sa fille le mercredi (enjeu ignoré). L'erreur professionnelle fatale consiste à 'squeezer' l'enjeu sous la pression des indicateurs de résultat.",
      "Le Contrat de Communication de Ghiglione (4 règles implicites 'par corps') : Pour qu'un échange opère, les acteurs négocient tacitement un contrat de communication reposant sur : 1) La règle de pertinence (reconnaître à l'autre une égale compétence à communiquer) ; 2) La règle de réciprocité (symétrie et écoute mutuelle) ; 3) La règle de contractualisation (rôles et règles du jeu rendus lisibles) ; 4) La règle d'influence (toute communication cherche à imposer ou co-construire un 'monde de possibles'). Ce contrat est structurellement instable et doit être renégocié en permanence.",
      "Dominique Wolton : 'Informer n'est pas communiquer' : La prolifération des outils numériques (mails, smartphones) permet la transmission instantanée de flux d'informations, mais n'assure aucune communication. L'information est un objet rapide ; la communication est une relation humaine lente nécessitant négociation du sens et vérification de la réception. D'où la nécessité de métiers d'intermédiaires (psychologues du travail) pour retisser le lien relationnel.",
      "Études de cas cliniques & situations réelles décryptées par Ghiglione et Valls : L'institutrice de CE1 confrontée au décalage d'enjeux des enfants (faire plaisir à la maîtresse vs accéder à l'abstraction arithmétique des poneys) ; Les deux universitaires de gauche neutralisant leur désaccord politique par un écran de fumée verbal ('masquage') pour préserver leur recherche commune indispensable à leur carrière ; Le schizophrène en hôpital psychiatrique affirmant 'Je suis mort' et le psychiatre acceptant ce cadre ('Et maintenant qu'on sait que vous êtes mort, qu'est-ce qu'on fait ?') pour transformer le délire en résistance institutionnelle ; La discussion sur la dot en lingala où resurgit spontanément la dissymétrie culturelle de genre chez deux intellectuels parisiens.",
      "Injonctions paradoxales, mise en voix et approche éthologique : Analyse du double bind (Paul Watzlawick, les deux cravates de Bretécher : obéir revient à désobéir). La voix comme instrument théâtral (la réplique de Don Juan chez Molière : 'Tu doutes, je pense' dont l'intonation fait basculer le sens vers l'arrogance de caste). L'approche éthologique de l'espace (Edward T. Hall, proxémie) : les marqueurs symboliques sans parole ('histoires sans parole' : chaise intouchable en EHPAD, fleurs sur le bureau en open space, parking réservé et sentiment d'injustice de l'ASH selon François Dubet, voiture rouge rassurante du chef de service, contact corporel du pied dans l'autisme)."
    ],
    "consignesOralesProf": [
      {
        "titre": "Activité à distance (AD) sur le Forum Moodle : Observation des Marqueurs Symboliques",
        "typeTravail": "exercice_ad",
        "consigneExacte": "Dans le cadre des 3-4 heures de travail distanciel officiel comptabilisées pour le secrétariat, poster sur le forum Moodle une observation personnelle de 10 à 15 lignes relatant une situation professionnelle vécue ou observée où l'espace, un objet, un rituel ou un comportement non-dialogique marque la place, le statut, l'appartenance ou la résistance des acteurs.",
        "echeance": "Avant la prochaine séance présentielle de novembre",
        "modaliteRendu": "Publication argumentée sur le forum Moodle PST108",
        "recommandationsProf": "Ne vous limitez pas à décrire le mobilier : montrez comment ce marqueur territorial ('histoire sans parole') produit de l'apaisement, de la cohésion ou au contraire un vif sentiment d'injustice (cf. l'ASH et le parking chez Dubet).",
        "lienAdId": "pst108-ad3-valls-ex1"
      },
      {
        "titre": "Préparation théorique des séances suivantes : Goffman, Garfinkel, Boltanski & Thévenot",
        "typeTravail": "lecture",
        "consigneExacte": "Lire les documents distribués sur la fragilité structurelle de la communication, la mise en scène de la vie quotidienne d'Erving Goffman (garder la face, éviter l'impair), l'ethnométhodologie d'Harold Garfinkel (ruptures d'allant-de-soi) et la sociologie de la justification de Luc Boltanski et Laurent Thévenot (les Cités et la dispute en contexte de travail).",
        "echeance": "Pour les séances de fin novembre",
        "modaliteRendu": "Lectures préparatoires indispensables pour les exercices d'analyse de litiges",
        "recommandationsProf": "Soyez attentifs à la façon dont on sort d'une dispute 'par le haut' en milieu de travail pour préserver l'activité collective."
      }
    ],
    "syntheseSections": [
      {
        "numero": "Section 1",
        "titre": "Introduction & Posture Psychosociologique : Le Triple Registre de l'Interaction",
        "points": [
          {
            "titre": "L'interaction comme objet central de la psychosociologie",
            "contenu": "Francis Valls ouvre le cours en définissant l'angle spécifique de la psychosociologie : le primat de l'interaction. Communiquer n'est pas un fait acquis ou une simple transmission technique ; c'est un moment rare, précieux et fondamentalement instable qui engage l'ensemble de la situation sociale.",
            "auteurs": ["Francis Valls (Cnam)"],
            "conceptsCles": ["Interaction", "Psychosociologie", "Situation sociale", "Fragilité communicationnelle"]
          },
          {
            "titre": "Les trois registres imbriqués : Verbal, Non-Verbal, Paraverbal",
            "contenu": "L'analyse d'une interaction nécessite de distinguer méthodologiquement trois registres qui, dans la réalité vécue, agissent de manière indissociable : 1) Le verbal : les mots choisis, la syntaxe, les énoncés explicites et les sous-entendus ; 2) Le non-verbal : le regard, la mimique, l'orientation du buste, les gestes, la distance physique (proxémie) et l'occupation spatiale ; 3) Le paraverbal : la voix, le timbre, le volume, le rythme, l'intonation, les silences et les pauses signifiantes.",
            "auteurs": ["Francis Valls"],
            "conceptsCles": ["Verbal", "Non-verbal", "Paraverbal", "Multimodalité", "Signes corporels"]
          },
          {
            "titre": "Démystification du cliché : 'Le corps ne ment pas et la parole est trompeuse'",
            "contenu": "Valls met en garde contre l'illusion courante qui opposerait une parole suspecte de manipulation à un corps qui révèlerait mécaniquement la vérité authentique. Tout signe corporel ou vocal est situé et dépend des codes culturels, de l'histoire du sujet et de la relation. Un regard fuyant ou un croisement de bras ne sont jamais des preuves automatiques de culpabilité ou de fermeture.",
            "auteurs": ["Francis Valls", "Sigmund Freud"],
            "conceptsCles": ["Critique du préjugé", "Signes situés", "Prudence interprétative", "Authenticité corporelle relative"]
          }
        ]
      },
      {
        "numero": "Section 2",
        "titre": "Du Modèle Télégraphique de Shannon & Weaver à la Circularité Systémique",
        "points": [
          {
            "titre": "La théorie de l'information (Shannon & Weaver) et ses limites",
            "contenu": "Le modèle classique Émetteur → Message / Canal → Récepteur (+ Feedback), issu des télécommunications des années 1940, conserve une utilité heuristique pour repérer les bruits physiques et les décalages de codes. Cependant, il véhicule une vision linéaire et mécaniste inadéquate pour les sciences humaines : il postule des acteurs passifs recevant un message unilatéral.",
            "auteurs": ["Claude Shannon & Warren Weaver (1949)"],
            "conceptsCles": ["Modèle télégraphique", "Linéarité mécaniste", "Bruit", "Feedback"]
          },
          {
            "titre": "L'asymétrie des cadres de référence et des statuts",
            "contenu": "Toute communication humaine met en présence des cadres de référence hétérogènes (différences d'âge, de culture, de rôle hiérarchique). Valls illustre ce décalage : lorsqu'un intervenant de 80 ans forme des éducateurs de 20 ans, ou lorsqu'un cadre supérieur s'adresse à un ouvrier, le message est inévitablement réfracté par la distance statutaire. Le feedback peut alors n'être qu'une soumission de façade ('je suis d'accord avec vous') masquant une totale incompréhension.",
            "auteurs": ["Francis Valls"],
            "conceptsCles": ["Cadre de référence", "Asymétrie de statut", "Distorsion du feedback", "Accord de façade"]
          },
          {
            "titre": "La circularité systémique : L'émetteur est simultanément récepteur",
            "contenu": "S'appuyant sur Jean-Claude Abric et l'approche systémique, Valls souligne que la communication est un processus circulaire continu. L'émetteur ne parle pas dans le vide : ses paroles sont en permanence influencées et réajustées en fonction des micro-réactions non verbales qu'il perçoit en temps réel chez son interlocuteur.",
            "auteurs": ["Jean-Claude Abric", "École de Palo Alto"],
            "conceptsCles": ["Circularité systémique", "Rétroaction continue", "Ajustement mutuel"]
          }
        ]
      },
      {
        "numero": "Section 3",
        "titre": "Rodolphe Ghiglione : De l'Intralocuteur à l'Interlocuteur dans une Activité Conjointe",
        "points": [
          {
            "titre": "Les thèses majeures de Rodolphe Ghiglione",
            "contenu": "Dans 'L'homme communiquant' et 'Je vous ai compris', le psychosociologue Rodolphe Ghiglione révolutionne l'analyse de la communication. Communiquer n'est pas transmettre une information : c'est mener une 'activité conjointe' ('Je ne mène pas une communication, j'y participe'). C'est co-construire avec l'autre un 'monde de possibles'.",
            "auteurs": ["Rodolphe Ghiglione (1986)"],
            "conceptsCles": ["Activité conjointe", "Co-construction", "Monde de possibles", "L'homme communiquant"]
          },
          {
            "titre": "Intralocuteurs vs Interlocuteurs & la Situation Potentiellement Communicative (SPC)",
            "contenu": "Avant la rencontre, chaque être humain est un 'intralocuteur' : il possède son univers mental, ses croyances, ses savoirs et ses blessures, isolé dans sa bulle cognitive. Pour devenir 'interlocuteurs', il faut qu'une 'situation potentiellement communicative' (SPC) permette la rencontre et que les protagonistes acceptent de négocier un sens partagé.",
            "auteurs": ["Rodolphe Ghiglione"],
            "conceptsCles": ["Intralocuteur", "Interlocuteur", "SPC (Situation Potentiellement Communicative)", "Rencontre"]
          },
          {
            "titre": "Le leurre historique du 'Je vous ai compris' (De Gaulle, 1958)",
            "contenu": "Valls relate l'épisode du discours du général de Gaulle à Alger en 1958. En lançant 'Je vous ai compris', de Gaulle crée un accord illusoire : partisans et adversaires de l'Algérie française ont chacun projeté leurs propres désirs dans cette formule vague. Dès lors que l'on court-circuite l'élucidation de l'enjeu réel, le retour de bâton est violent et engendre la fureur des acteurs trompés.",
            "auteurs": ["Général de Gaulle (1958)", "Rodolphe Ghiglione"],
            "conceptsCles": ["Je vous ai compris", "Accord trompeur", "Projection subjective", "Retour de bâton"]
          }
        ]
      },
      {
        "numero": "Section 4",
        "titre": "La Distinction Cardinal d'Examen : Objectif vs Enjeu",
        "points": [
          {
            "titre": "Définition contrastée : La tâche vs Le sens",
            "contenu": "La distinction entre Objectif et Enjeu est au cœur de l'enseignement de M. Valls : 1) L'Objectif : correspond au 'quoi' — la tâche concrète, le travail prescrit, le livrable ou le résultat quantifiable requis par l'institution ; 2) L'Enjeu : correspond au 'pourquoi' et au 'sens' — ce qui compte vitalement pour la personne, ses priorités existentielles, son identité, ce qu'elle cherche à préserver ou à rendre possible.",
            "auteurs": ["Rodolphe Ghiglione", "Francis Valls"],
            "conceptsCles": ["Objectif (résultat)", "Enjeu (sens partagé)", "Priorités existentielles", "Dimension plurielle du sujet"]
          },
          {
            "titre": "L'exemple clinique du CDI et de la mère célibataire",
            "contenu": "Valls relate une erreur formatrice vécue lors de ses débuts d'éducateur en association d'insertion : une jeune femme demande avec insistance un 'CDI à temps plein'. L'éducateur trouve immédiatement ce poste rare (objectif atteint à 100%, valorisé par les financeurs départementaux). Trois jours après son embauche, la salariée revient en larmes, démissionnaire et accablée de culpabilité : elle élève seule sa fille et ne peut travailler le mercredi faute de mode de garde. L'objectif avait été rempli, mais l'enjeu réel (concilier survie matérielle et responsabilité maternelle) avait été squeezé par précipitation et obsession du chiffre.",
            "auteurs": ["Francis Valls"],
            "conceptsCles": ["Cas clinique CDI", "Squeezer l'enjeu", "Pression du résultat", "Échec relationnel"]
          },
          {
            "titre": "Intégrer l'enjeu dans l'objectif pour réussir l'action",
            "contenu": "La leçon clinique n'est pas qu'il fallait deviner par magie la situation de la dame, mais qu'il fallait prendre le temps d'explorer la complexité plurielle de son existence avant d'agir. L'objectif n'est pas supprimé : il doit être subordonné et ajusté à l'enjeu.",
            "auteurs": ["Francis Valls"],
            "conceptsCles": ["Temps de la relation", "Écoute clinique", "Subordination de l'objectif à l'enjeu"]
          }
        ]
      },
      {
        "numero": "Section 5",
        "titre": "Le Contrat de Communication de Ghiglione : Les 4 Règles Implicites",
        "points": [
          {
            "titre": "Nature du contrat : Un accord incorporé 'par corps' (Bourdieu)",
            "contenu": "Le contrat de communication n'est ni un document administratif ni une charte affichée. C'est un ensemble de règles normatives tacites que les locuteurs connaissent 'par corps' (selon la formule de Pierre Bourdieu), acquises par la socialisation et réactivées dans chaque interaction.",
            "auteurs": ["Rodolphe Ghiglione", "Pierre Bourdieu"],
            "conceptsCles": ["Contrat implicite", "Savoir par corps", "Normes conversationnelles"]
          },
          {
            "titre": "Les 4 règles constitutives du contrat de communication",
            "contenu": "1. Règle de pertinence : reconnaître à l'autre une égale compétence et légitimité à participer à l'échange, excluant tout mépris de statut ; 2. Règle de réciprocité : symétrie des tours de parole, refus du monologue unilatéral et écoute effective ; 3. Règle de contractualisation : clarification et lisibilité des rôles, des attentes et des règles du jeu ; 4. Règle d'influence : reconnaissance que toute communication comporte un rapport de force et cherche à modifier l'univers cognitif de l'autre pour co-construire un monde partagé.",
            "auteurs": ["Rodolphe Ghiglione (1986)"],
            "conceptsCles": ["Pertinence", "Réciprocité", "Contractualisation", "Influence", "4 règles du contrat"]
          },
          {
            "titre": "La fragilité structurelle de la communication (Erving Goffman)",
            "contenu": "La communication humaine n'est jamais un état stable : elle est structurellement précaire ('funambules sur un fil'). Le moindre impair, maladresse ou malentendu peut faire vaciller l'échange. Les travaux d'Erving Goffman ('La mise en scène de la vie quotidienne') démontrent que chacun passe son temps à 'garder la face' et à ménager la face d'autrui pour éviter l'effondrement du contrat de communication.",
            "auteurs": ["Erving Goffman (1959, 1974)", "Rodolphe Ghiglione"],
            "conceptsCles": ["Fragilité structurelle", "Garder la face", "Perdre la face", "Préservation rituelle"]
          }
        ]
      },
      {
        "numero": "Section 6",
        "titre": "Dominique Wolton : « Informer n'est pas communiquer »",
        "points": [
          {
            "titre": "L'illusion de la vitesse et de la technologie performative",
            "contenu": "Dans 'Informer n'est pas communiquer' (2009), Dominique Wolton dénonce la confusion contemporaine entre diffusion d'informations et communication. Plus les outils numériques se perfectionnent (smartphones, e-mails, messageries instantanées, ERP), plus le fossé de l'incommunication se creuse : la vitesse de transmission n'est jamais synonyme de partage de sens.",
            "auteurs": ["Dominique Wolton (2009)"],
            "conceptsCles": ["Informer n'est pas communiquer", "Illusion technologique", "Flux d'information vs relation"]
          },
          {
            "titre": "Le piège institutionnel du 'Je lui ai pourtant envoyé un mail'",
            "contenu": "Valls dénonce ce réflexe managérial et professionnel déresponsabilisant : 'Je l'ai pourtant communiqué par mail !'. Non : on a expédié une information technique, sans vérifier si le destinataire l'a reçue, lue, décodée, comprise, et s'il a les moyens d'y répondre. La communication exige la vérification du retour et la confrontation des compréhensions.",
            "auteurs": ["Francis Valls", "Dominique Wolton"],
            "conceptsCles": ["Déréliction du mail", "Absence de vérification", "Vérification du feedback"]
          },
          {
            "titre": "Le rôle indispensable des métiers d'intermédiaires (Psychologues du travail)",
            "contenu": "Parce que l'information brute ne produit pas de relation, les organisations ont un besoin vital de professionnels de l'intermédiation — psychologues du travail, éducateurs, ergonomes — capables d'habiter l'écart entre le prescrit technique et le sens vécu, et de restaurer le dialogue là où les machines ne produisent que du bruit.",
            "auteurs": ["Dominique Wolton", "Francis Valls"],
            "conceptsCles": ["Métiers d'intermédiaires", "Restauration du lien", "Tiers relationnel"]
          }
        ]
      },
      {
        "numero": "Section 7",
        "titre": "Analyses Cliniques de Dialogues Réels Décortiqués en Séance",
        "points": [
          {
            "titre": "L'institutrice de CE1 : Le conflit d'enjeux face à l'abstraction arithmétique",
            "contenu": "Situation : Une institutrice excellente pédagogue tente de faire basculer ses élèves du récit concret vers le problème arithmétique abstrait (enfants et poneys). Échec apparent : les réponses fusent de manière fantaisiste. Analyse de Ghiglione/Valls : Il y a collision d'enjeux. L'enjeu de l'enseignante est l'accès à l'abstraction mathématique ; l'enjeu des élèves est affectif ('faire plaisir à la maîtresse', transfert positif décrit par Platon). Tant que le contrat de travail n'est pas réexplicité, les enfants répondent pour séduire et non pour calculer.",
            "auteurs": ["Rodolphe Ghiglione", "Francis Valls", "Platon"],
            "conceptsCles": ["Institutrice CE1", "Conflit d'enjeux", "Faire plaisir", "Transfert affectif"]
          },
          {
            "titre": "Les deux universitaires de gauche : L'art du masquage pour sauver la recherche",
            "contenu": "Situation : Deux professeurs d'université engagés politiquent ont un vif désaccord idéologique. Pourtant, leur échange tourne court et s'enlise dans un jargon technique vide de sens ('le masquage'). Analyse : Leur enjeu institutionnel supérieur est de mener à bien une recherche commune nécessaire à la publication et à l'avancement de leur carrière académique. Le langage devient un écran de fumée ('masquage') permettant d'éviter la rupture et de préserver la face.",
            "auteurs": ["Rodolphe Ghiglione", "Francis Valls"],
            "conceptsCles": ["Universitaires de gauche", "Masquage verbal", "Écran de fumée", "Préservation de la face"]
          },
          {
            "titre": "L'hôpital psychiatrique et l'homme qui se disait 'mort' : Résistance vs Folie",
            "contenu": "Situation : Un patient schizophrène interné de longue date répond invariablement 'Je suis mort' à tous les soignants. Un psychiatre s'assoit et répond : 'Et maintenant que je sais que vous êtes mort, qu'est-ce qu'on fait ?'. Analyse : Au lieu de disqualifier la parole comme un pur délire pathologique, le praticien valide le cadre proposé par le patient. Cette formulation paradoxale révèle une stratégie de résistance psychique du sujet face au double enfermement chimique et asilaire de l'institution.",
            "auteurs": ["Francis Valls"],
            "conceptsCles": ["Je suis mort", "Résistance institutionnelle", "Validation du cadre", "Schizophrénie"]
          },
          {
            "titre": "La controverse sur la dot en lingala : La réémergence des codes culturels de genre",
            "contenu": "Situation : Une expérimentation réunit un homme et une femme universitaires parisiens très intégrés issus de la culture angolaise, invités à débattre de la dot dans leur langue maternelle. Analyse : Immédiatement, la dissymétrie culturelle de genre se réinstalle. L'homme confisque la parole et impose sa vision traditionnelle ; la femme, qui tente d'introduire une nuance critique ('oui, mais comme symbole'), est ramenée au rang de simple écho-validant. Le retour à la langue et au thème d'origine réactive les habitus culturels incorporés.",
            "auteurs": ["Rodolphe Ghiglione", "Francis Valls"],
            "conceptsCles": ["Débat sur la dot", "Dissymétrie de genre", "Écho-validant", "Réactivation de l'habitus"]
          }
        ]
      },
      {
        "numero": "Section 8",
        "titre": "Injonctions Paradoxales, Écologie Vocale et Marqueurs Symboliques de l'Espace",
        "points": [
          {
            "titre": "L'injonction paradoxale (Paul Watzlawick & Claire Bretécher)",
            "contenu": "Valls réactive le concept de double contrainte / injonction paradoxale de l'École de Palo Alto (Paul Watzlawick). Illustré par l'humoriste Claire Bretécher : une mère offre deux cravates (une bleue, une rouge) à son fils Tanguy ; lorsqu'il met la bleue, elle s'écrie : 'Tu n'aimes pas la rouge ?'. Obéir à l'une des demandes rend impossible la satisfaction de l'autre. Dans les organisations, sommer un salarié d' 'être autonome' dans un cadre strictement procéduré constitue une injonction paradoxale génératrice de souffrance.",
            "auteurs": ["Paul Watzlawick (1967)", "Claire Bretécher", "Gregory Bateson"],
            "conceptsCles": ["Injonction paradoxale", "Double bind", "Les deux cravates", "Autonomie sous contrainte"]
          },
          {
            "titre": "La voix comme instrument théâtral de sens : L'exemple de Don Juan chez Molière",
            "contenu": "Valls cite l'expérience d'un jeune metteur en scène revisitant Don Juan de Molière. Face à un pauvre qui prie sur la route, Don Juan déclare à Sganarelle vouloir lui faire renier sa foi. Sganarelle s'indigne. Don Juan répond : 'Tu doutes, je pense'. Selon la scansion et l'intonation (pause avant ou après 'je pense'), la phrase bascule d'une hésitation méditative à une provocation altière et cruelle de caste nobiliaire. La voix n'est pas un véhicule neutre : c'est un instrument musical producteur direct de sens et de violence symbolique.",
            "auteurs": ["Molière", "Francis Valls"],
            "conceptsCles": ["Don Juan", "Tu doutes je pense", "Intonation paraverbale", "Violence symbolique de caste"]
          },
          {
            "titre": "L'approche éthologique : Proxémie (Hall) et Marqueurs Symboliques ('Histoires sans parole')",
            "contenu": "L'être humain est un animal territorial (Edward T. Hall, La dimension cachée). L'occupation de l'espace au travail est saturée de marqueurs symboliques signifiants : 1) La chaise réservée d'un résident en EHPAD que personne ne doit occuper ; 2) La contestation de l'open space par des fleurs posées sur le bureau par un secrétaire PJJ ; 3) Le sentiment d'injustice de l'ASH analysé par François Dubet : l'agente sans place de parking contrainte au bus de 5h observant le jeune interne garé sur sa place réservée qui toise sa blouse ; 4) La voiture rouge du chef de service garée au même endroit rassurant l'équipe que le café est prêt ; 5) Le contact corporel du pied sous la table comme ancrage relationnel dans l'autisme ; 6) Le chef de service refusant le bout de table pour feindre l'égalitarisme mais semant le trouble.",
            "auteurs": ["Edward T. Hall (1966)", "François Dubet", "Francis Valls"],
            "conceptsCles": ["Territorialité", "Proxémie", "Marqueurs symboliques", "Sentiment d'injustice (Dubet)", "Histoires sans parole"]
          }
        ]
      }
    ],
    "tableauxComparatifs": [
      {
        "titre": "Tableau 1 — Objectif vs Enjeu dans la Communication Professionnelle (Francis Valls)",
        "description": "Distinction princeps d'examen pour décrypter les entretiens cliniques et les situations de travail",
        "colonnes": ["Dimension d'Analyse", "L'Objectif Organisationnel", "L'Enjeu Psychosocial"],
        "lignes": [
          {
            "axe": "Définition conceptuelle",
            "valeurs": [
              "La tâche explicite, le résultat quantifiable et mesurable prescrit par l'institution.",
              "Le sens que la situation revêt pour le sujet, ses priorités existentielles et valeurs."
            ]
          },
          {
            "axe": "Temporalité",
            "valeurs": [
              "Court terme, immédiat, centré sur le livrable et la clôture du dossier.",
              "Temps long de l'existence, conciliation des sphères de vie et identité."
            ]
          },
          {
            "axe": "Exemple clinique (Valls)",
            "valeurs": [
              "Obtenir un CDI à temps plein pour une usagère en insertion (chiffre coché).",
              "Pourvoir aux besoins de sa fille tout en restant libre le mercredi pour la garder."
            ]
          },
          {
            "axe": "Conséquence si dissocié",
            "valeurs": [
              "Satisfaction superficielle immédiate de l'intervenant sous pression des résultats.",
              "Échec cuisant, démission en larmes de la salariée et rupture de la relation de confiance."
            ]
          },
          {
            "axe": "Recommandation d'examen",
            "valeurs": [
              "Ne jamais se contenter de valider l'objectif affiché.",
              "Toujours explorer la complexité plurielle du sujet pour intégrer l'enjeu dans l'objectif."
            ]
          }
        ]
      },
      {
        "titre": "Tableau 2 — Les 4 Règles Constitutives du Contrat de Communication (Rodolphe Ghiglione)",
        "description": "Les principes implicites régissant l'activité conjointe de communication dans une SPC",
        "colonnes": ["Règle du Contrat", "Exigence Psychosociale", "Comportement Observé", "Conséquence de la Transgression"],
        "lignes": [
          {
            "axe": "1. Règle de Pertinence",
            "valeurs": [
              "Reconnaître à l'autre une égale compétence et légitimité à communiquer.",
              "Prendre au sérieux ce que l'autre apporte, quel que soit son statut ou son âge.",
              "Mépris de classe, disqualification de la parole de l'autre, asymétrie hautaine."
            ]
          },
          {
            "axe": "2. Règle de Réciprocité",
            "valeurs": [
              "Symétrie des échanges et possibilité réelle pour chacun de contribuer.",
              "Écouter, marquer des pauses, regarder la personne et laisser un temps de parole équitable.",
              "Monologue unilatéral, monopolisation de la parole, écoute feinte (nez sur le questionnaire)."
            ]
          },
          {
            "axe": "3. Règle de Contractualisation",
            "valeurs": [
              "Clarifier les rôles, les attentes mutuelles et les règles du jeu de l'échange.",
              "Expliciter ce qui est attendu, vérifier l'accord sur les modalités de la rencontre.",
              "Malentendu sur le cadre, quiproquos, sentiment de trahison ou d'incompréhension."
            ]
          },
          {
            "axe": "4. Règle d'Influence",
            "valeurs": [
              "Reconnaître que communiquer vise à modifier l'univers cognitif d'autrui.",
              "Accepter la négociation des points de vue pour co-construire un monde de possibles.",
              "Imposition autoritaire sans délibération, manipulation perverse ou soumission passive."
            ]
          }
        ]
      },
      {
        "titre": "Tableau 3 — Modèle Télégraphique (Shannon) vs Modèle Écosystémique Conjoint (Ghiglione / Valls)",
        "colonnes": ["Axe de Comparaison", "Modèle de Shannon & Weaver (1949)", "Modèle Écosystémique de Ghiglione (1986)"],
        "lignes": [
          {
            "axe": "Conception de l'échange",
            "valeurs": [
              "Transmission unilatérale d'un paquet de données d'un point A vers un point B.",
              "Activité conjointe où les deux acteurs co-construisent le sens en continu."
            ]
          },
          {
            "axe": "Statut des acteurs",
            "valeurs": [
              "Émetteur actif puis Récepteur passif séquentiel (machines / télécoms).",
              "Chacun est simultanément émetteur et récepteur en miroir (circularité systémique)."
            ]
          },
          {
            "axe": "Rôle du contexte",
            "valeurs": [
              "Réduit à un 'canal' pouvant contenir des 'bruits' techniques physiques.",
              "Situation sociale complexe : cadres de référence, statuts, histoires incorporées."
            ]
          },
          {
            "axe": "Statut du feedback",
            "valeurs": [
              "Simple signal de retour confirmant la bonne réception matérielle du message.",
              "Ajustement interactif permanent renégociant le contrat de communication."
            ]
          },
          {
            "axe": "Écueil majeur",
            "valeurs": [
              "Croire qu'un mail envoyé équivaut à un problème résolu (illusion de Wolton).",
              "Exige du temps, de l'écoute et l'acceptation de la fragilité de l'accord."
            ]
          }
        ]
      },
      {
        "titre": "Tableau 4 — Typologie des Marqueurs Symboliques et Usages Territoriaux de l'Espace de Travail",
        "colonnes": ["Marqueur / Conduite Spatiale", "Origine Éthologique", "Signification Psychosociale", "Impact sur le Climat de Travail"],
        "lignes": [
          {
            "axe": "La chaise intouchable en réfectoire",
            "valeurs": [
              "Niche territoriale inviolable en milieu fermé (EHPAD / prison).",
              "Ultime rempart d'identité et de dignité pour un sujet dépossédé de son statut.",
              "Respecté par tous, crée de la stabilité et préserve la paix du groupe."
            ]
          },
          {
            "axe": "Les fleurs sur le bureau en open space",
            "valeurs": [
              "Marquage végétal contre l'interdit de personnalisation des bureaux.",
              "Résistance subjective et besoin d'accueillir chaleureusement des usagers (PJJ).",
              "Défiance pacifique envers la standardisation managériale interchangeable."
            ]
          },
          {
            "axe": "La place de parking réservée (Dubet)",
            "valeurs": [
              "Privilège d'accès spatial institutionnel matérialisé au sol.",
              "Hiérarchie visible heurtant l'ASH en bus au profit du jeune interne qui toise sa blouse.",
              "Alimente un sourd sentiment d'injustice et de mépris social (Axel Honneth)."
            ]
          },
          {
            "axe": "La voiture rouge visible le matin",
            "valeurs": [
              "Repère visuel et temporel constant dans l'espace partagé.",
              "Signal rassurant que le chef est là, que le cadre tient et que le café est prêt.",
              "Facteur de cohésion collective, d'apaisement et d'ancrage relationnel."
            ]
          },
          {
            "axe": "Le chef évitant le bout de table",
            "valeurs": [
              "Refus tactique de la place géométrique d'autorité.",
              "Velléité d'égalitarisme feint déstabilisant l'équipe qui cherche la contenance du cadre.",
              "Génère ambiguïté sur les rôles et suspicion sur la réalité du pouvoir."
            ]
          }
        ]
      }
    ],
    "rectificationsExamen": [
      {
        "titre": "Ne jamais confondre 'Objectif' et 'Enjeu' dans une étude de cas d'entretien",
        "erreurCourante": "Qualifier d'enjeu ce qui n'est qu'un objectif formel opérationnel (ex: 'l'enjeu est de signer le contrat de travail').",
        "rectificationAttendue": "L'objectif est la tâche matérielle ou le chiffre à atteindre ; l'enjeu renvoie au sens pour le sujet, à ce qu'il cherche à préserver (sa dignité, sa vie familiale, son métier). Citer l'exemple clinique de Valls : le CDI plein temps était l'objectif, la garde de la fille le mercredi était l'enjeu vital.",
        "contexte": "Distinction princeps enseignée par Francis Valls à maîtriser absolument pour les épreuves de PST108 et PST123."
      },
      {
        "titre": "Réfuter la thèse simpliste selon laquelle 'le corps ne ment jamais'",
        "erreurCourante": "Affirmer que la parole est toujours manipulatrice alors que les gestes et la posture révèlent infailliblement la vérité du sujet.",
        "rectificationAttendue": "Les trois registres (verbal, non-verbal, paraverbal) sont intrinsèquement imbriqués et dépendent des conventions culturelles (proxémie d'Edward T. Hall) et du contexte relationnel. Un geste n'est jamais une preuve mécanique hors de la relation.",
        "contexte": "Question de méthodologie de l'observation en psychologie du travail."
      },
      {
        "titre": "Ne pas assimiler l'information à la communication (Thèse de Dominique Wolton)",
        "erreurCourante": "Écrire qu'une entreprise qui déploie un système d'information performant (mails, messageries, intranet) améliore mécaniquement sa communication interne.",
        "rectificationAttendue": "Informer n'est pas communiquer. L'information est un flux technique instantané ; la communication est une relation humaine lente qui exige de vérifier la réception, le sens partagé et la gestion des désaccords.",
        "contexte": "Ouvrage de Dominique Wolton (2009) 'Informer n'est pas communiquer'."
      },
      {
        "titre": "Ne pas réduire le discours psychotique à un pur non-sens médicalisé",
        "erreurCourante": "Interpréter la réponse 'Je suis mort' d'un patient comme un simple symptôme de démence sans portée communicationnelle.",
        "rectificationAttendue": "Comme le démontre Valls, ce discours peut constituer l'ultime stratégie de résistance d'un intralocuteur face à l'écrasement chimique et institutionnel. En acceptant ce cadre ('Et maintenant qu'on sait que vous êtes mort, qu'est-ce qu'on fait ?'), le clinicien recrée du dialogue.",
        "contexte": "Exemple clinique de l'hôpital psychiatrique discuté en Séance 3."
      },
      {
        "titre": "Le contrat de communication n'est pas un contrat de travail juridique",
        "erreurCourante": "Confondre le contrat de communication avec le contrat de travail signé aux ressources humaines.",
        "rectificationAttendue": "Le contrat de communication (Ghiglione) est un ensemble de règles psychosociales implicites connues 'par corps' (pertinence, réciprocité, contractualisation, influence) qui rendent l'activité conjointe possible.",
        "contexte": "Modèle de Rodolphe Ghiglione (1986) dans 'L'homme communiquant'."
      }
    ],
    "transcriptionIntegraleVerbatim": `Transcription intégrale du cours 3 — PST108 (M. Francis Valls)
Durée : 2 h 16 min 07 s · Enregistrement officiel de la séance présentielle au Cnam

[00:00:00] M. VALLS : Bonjour à tous. Donc il y a pas mal de visages familiers, probablement croisés en 123 l'an dernier. Et puis il y a de nouvelles têtes. Le cours de ce soir tourne autour de la communication, un thème très flou, très vague, puisqu'on a l'habitude de dire qu'on ne peut pas ne pas communiquer. Mais la vraie question pour moi, d'un point de vue méthodologique, c'est : quand est-ce qu'on communique vraiment ? Quand dans une relation, au travail ou dans la vie amicale, on a avec quelqu'un un vrai moment de communication, c'est un moment rare et précieux. Peut-on modéliser cette notion ? Nous avons quatre cours en présentiel groupés sur ce mois d'octobre et novembre, et 3-4 heures de distanciel officiel sur le forum où je vous proposerai d'intervenir.

[00:10:41] M. VALLS : Je suis de formation psychosociologue. Et en psychosociologie, il y a un mot-clé : l'interaction. Nous allons aborder la communication à travers trois registres indissociables : le verbal (les mots), le non-verbal (le corps, la posture, l'espace) et le paraverbal (la voix, l'intonation, le débit, le silence). Les trois sont complètement imbriqués. Nous regarderons aussi des auteurs qui insistent sur la fragilité structurelle de la communication : Erving Goffman, Harold Garfinkel, Boltanski et Thévenot sur la dispute en contexte de travail. Le schéma classique émetteur-récepteur-feedback est un peu mécanique, un peu télégraphique, mais il a une vertu heuristique : il permet de repérer les distorsions liées aux décalages de cadres de référence et de statut. J'ai 80 ans, j'interviens à l'IFTS devant des jeunes de 20 ans : la différence de statut et de génération pèse lourdement sur l'échange.

[00:20:43] M. VALLS : Ce schéma linéaire a été dépassé par Rodolphe Ghiglione dans deux ouvrages majeurs : 'L'homme communiquant' et 'Je vous ai compris'. Rappelez-vous le général de Gaulle en 1958 au balcon d'Alger disant 'Je vous ai compris'. Tout le monde a cru être compris, chacun a entendu ce qu'il voulait entendre, et le retour de bâton a été terrible. Ghiglione nous dit : la communication est circulaire et systémique. Il ne peut y avoir de communication véritable sans accord sur un enjeu commun. L'enjeu n'est pas l'objectif ! L'objectif, c'est la tâche, le livrable, le résultat exigé par l'organisation. L'enjeu, c'est le sens partagé, ce qui compte pour la personne. Avant la rencontre, nous sommes des 'intralocuteurs' isolés avec notre histoire. Pour devenir 'interlocuteurs', il faut une Situation Potentiellement Communicative (SPC) et négocier un 'contrat de communication' implicite.

[00:30:52] M. VALLS : Je vous donne un exemple vécu de mes débuts d'éducateur. Une jeune femme vient me voir : 'Monsieur, il me faut absolument un CDI à temps plein'. Coup de chance, nous avions un CDI temps plein disponible dans notre réseau. Je le lui propose, elle est embauchée, elle me regarde comme un dieu. Trois jours plus tard, elle revient en larmes, effondrée de culpabilité : 'J'ai honte, je ne peux pas garder ce travail. J'élève seule ma fille et je n'ai aucun mode de garde le mercredi'. J'étais resté sur l'objectif (décrocher un CDI, faire du chiffre pour les financeurs) et j'avais squeezé l'enjeu réel de sa vie : concilier son travail avec sa responsabilité maternelle. C'était une erreur professionnelle majeure : j'étais allé trop vite. L'objectif doit être intégré dans l'enjeu du sujet.

[00:40:46] M. VALLS : Analysons l'exemple de l'institutrice de CE1. Elle veut faire passer ses élèves du récit vers l'abstraction d'un problème arithmétique avec des poneys et des enfants. L'exercice est bien conçu, contextualisé. Pourtant, les réponses des enfants partent dans tous les sens de manière touchante. Pourquoi ? Parce qu'il y a un décalage d'enjeux ! L'enjeu de l'institutrice est l'accès au raisonnement mathématique abstrait. L'enjeu des bambins est affectif : ils veulent 'faire plaisir à la maîtresse' (le transfert d'amour décrit par Platon). Tant que le contrat de travail n'est pas réexplicité, l'échange tourne à vide. Communiquer est une activité conjointe.

[00:50:40] M. VALLS : Cela renvoie à Dominique Wolton et son ouvrage 'Informer n'est pas communiquer'. On entend souvent au travail : 'Mais je lui ai pourtant envoyé un mail !'. Envoyer un courriel, ce n'est pas communiquer : c'est transmettre un paquet d'informations techniques. L'a-t-il lu ? L'a-t-il compris ? Plus les outils numériques sont rapides et performants, plus la communication humaine exige du temps, de la relation et des intermédiaires. C'est pour cela que les psychologues du travail sont indispensables. Le contrat de communication de Ghiglione repose sur 4 règles implicites que l'on sait 'par corps' (Bourdieu) : la pertinence (reconnaître à l'autre une égale compétence), la réciprocité (écoute mutuelle symétrique), la contractualisation (rôles et règles clairs) et l'influence (vouloir co-construire un monde de possibles).

[01:00:02] M. VALLS : Regardez l'exemple des deux universitaires de gauche engagés politiquement. Ils ont un désaccord théorique violent. Mais qu'ont-ils en commun ? Une recherche universitaire conjointe capitale pour leurs carrières. Dès que le ton monte, ils utilisent le langage comme un écran de fumée ('le masquage') : un jargon technique abscons qui neutralise le conflit. Leur enjeu institutionnel commun est de ne pas se fâcher pour pouvoir continuer à publier ensemble. Le langage sert ici d'armure défensive pour sauver la face.

[01:10:43] M. VALLS : Observez ensuite l'expérimentation avec ces deux universitaires parisiens d'origine angolaise discutant de la dot en lingala. Dès qu'ils s'expriment dans leur langue maternelle sur ce thème culturel ancestral, l'homme prend toute la place de parole. La femme glisse une remarque très fine : 'Oui, mais à condition que ce soit un symbole'. Mais sa parole est ignorée, passée à la trappe, et elle est réduite au rôle d'écho-validant de l'autorité masculine. L'habitus culturel traditionnel se réinstalle instantanément malgré leur statut intellectuel moderne.

[01:20:06] M. VALLS : En milieu psychiatrique, un patient schizophrène répond invariablement 'Je suis mort' à tous les soignants. Un psychiatre s'approche et lui dit : 'Bonjour. Et maintenant que je sais que vous êtes mort, qu'est-ce qu'on fait ?'. C'est brillant : au lieu de rejeter la phrase comme une absurdité médicale, il valide le cadre du patient. Cela montre que ce discours étrange n'est pas que de la folie : c'est une forme de résistance du sujet face au double enfermement chimique et asilaire de l'institution.

[01:22:36] M. VALLS : Parlons de l'injonction paradoxale (Paul Watzlawick, École de Palo Alto). Illustré par l'humoriste Claire Bretécher : une mère offre deux cravates à son fils Tanguy, une bleue et une rouge. Le fils descend avec la cravate bleue. La mère le regarde : 'Tu n'aimes pas la rouge ?'. C'est le piège absolu : obéir à l'un revient à désobéir à l'autre. 'Sois spontané !' est une impossibilité logique. Dans le travail, exiger d'un opérateur qu'il fasse preuve d'autonomie tout en lui imposant un reporting minuté est une injonction paradoxale génératrice d'angoisse.

[01:33:22] M. VALLS : Regardons la voix et le paraverbal. Un jeune metteur en scène monte le Don Juan de Molière. Don Juan veut faire renier sa foi à un pauvre qui prie. Sganarelle est horrifié. Don Juan lui dit : 'Tu doutes, je pense'. Dans la mise en scène classique, il dit 'Tu doutes... je pense' (hésitation). Dans sa mise en scène, il scande : 'Tu doutes ? Je pense !'. Pas un mot n'a changé, mais l'intonation transforme la phrase en une affirmation altière et brutale de domination de caste nobiliaire. La voix est un instrument producteur de sens. Tout vous trahit : 'La voix, le silence, les yeux' disait Racine.

[01:42:53] M. VALLS : Enfin, l'approche éthologique et la proxémie d'Edward T. Hall. L'homme est un animal territorial. La question de la place est majeure tout au long de la vie : ma place dans la fratrie, au travail, en réunion. Les marqueurs symboliques sans parole ('histoires sans parole') ont une puissance signifiante colossale : la chaise d'un monsieur en EHPAD que personne n'a le droit de toucher ; les fleurs posées sur son bureau par un secrétaire PJJ pour résister à l'interdit managérial de personnalisation des bureaux ; le parking de la clinique où l'ASH qui prend le bus à l'aube voit l'interne débutant bénéficier d'une place réservée et toiser sa blouse pour vérifier son grade (le sentiment d'injustice décrit par François Dubet) ; ou encore la voiture rouge garée à la même place rassurant l'équipe que le chef est là et que le café est fait.

[02:02:47] M. VALLS : Dans l'autisme en hôpital de jour, un soignant raconte qu'il devait laisser le pied du résident effleurer le sien sous la table pour que le contact s'établisse et que l'activité devienne possible. C'est une communication corporelle silencieuse d'une grande intensité.

[02:13:07] M. VALLS : Pour notre travail à distance, je vous déposerai ces documents et verbatims sur Moodle. Je vous invite à rédiger une dizaine de lignes décrivant une situation professionnelle où vous avez observé ces marqueurs territoriaux ou ces décalages d'enjeux. La prochaine fois, nous aborderons Erving Goffman, Harold Garfinkel et la dispute chez Boltanski et Thévenot. Merci à tous et bonne soirée !`,
    "bibliographieCitee": [
      {
        "titre": "L'homme communiquant",
        "auteur": "Rodolphe Ghiglione",
        "annee": "1986",
        "remarque": "Théorisation du contrat de communication, de l'activité conjointe et des 4 règles psychosociales (pertinence, réciprocité, contractualisation, influence)."
      },
      {
        "titre": "Je vous ai compris : Pour une sémiologie de la parole politique",
        "auteur": "Rodolphe Ghiglione",
        "annee": "1989",
        "remarque": "Analyse de la parole politique manipulatrice et du leurre du consensus illusoire masquant les désaccords d'enjeux."
      },
      {
        "titre": "Informer n'est pas communiquer",
        "auteur": "Dominique Wolton",
        "annee": "2009",
        "remarque": "Démonstration que la rapidité technique de transmission d'information ne produit pas de relation communicationnelle sans intermédiaires humains."
      },
      {
        "titre": "Une logique de la communication",
        "auteur": "Paul Watzlawick, Janet H. Beavin & Don D. Jackson",
        "annee": "1967",
        "remarque": "Axiomes de la communication de l'École de Palo Alto, théorie du double bind et des injonctions paradoxales."
      },
      {
        "titre": "La mise en scène de la vie quotidienne",
        "auteur": "Erving Goffman",
        "annee": "1959/1973",
        "remarque": "L'interaction comme théâtre social, rituels de préservation de la face et fragilité structurelle des échanges."
      },
      {
        "titre": "La dimension cachée",
        "auteur": "Edward T. Hall",
        "annee": "1966",
        "remarque": "Fondation de la proxémie : l'usage de l'espace physique comme langage culturel et territorial."
      },
      {
        "titre": "Injustices : L'expérience des inégalités au travail",
        "auteur": "François Dubet",
        "annee": "2006",
        "remarque": "Sociologie du sentiment d'injustice subjectif à travers l'exemple des hiérarchies invisibles de parking et de blouses."
      },
      {
        "titre": "De la justification : Les économies de la grandeur",
        "auteur": "Luc Boltanski & Laurent Thévenot",
        "annee": "1991",
        "remarque": "Théorie des Cités et analyse de la dispute en contexte de travail pour sortir du litige par le haut."
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 1 : CADRAGE PÉDAGOGIQUE & NOTIONS D'IDENTITÉ (E. LUCY)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s1",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 1,
    titre: "Séance 1 (Cadrage Pédagogique) — Les Notions d'Identité en Sciences de l'Homme",
    sousTitre: "Du paradoxe d'Enthoven aux matrices de Dubar, Bourdieu et Sainsaulieu",
    enseignant: "Mme Élisabeth LUCY (Cnam)",
    dateSeance: "Semestre 1 (Cadrage & Préparation)",
    format: "webconference",
    dureeEnregistrement: "Dossier pédagogique complet & Support officiel E. Lucy",
    resumeExecutif: [
      "Le paradoxe de l'identité personnelle (Raphaël Enthoven) : 'C'est moi, mais je fais comme tout le monde'. L'identité n'est ni une essence biologique préexistante, ni une pure illusion imposée par la société : elle est une dialectique continue.",
      "Le plan officiel de Mme Lucy s'articule autour de 12 auteurs majeurs : Piaget, Durkheim, Parsons, Kardiner, Weber, Becker, Merton, Rosenthal, Jakobson, Goffman, Bourdieu, Dubar.",
      "Trois grandes problématiques transversales : incorporation des normes, négociation du pouvoir/domination, et tension permanente entre identité pour soi et identité pour autrui.",
      "La grille d'analyse officielle de Claude Dubar : décomposition stricte entre Processus Relationnels (Axe social / Pour autrui / Actes d'attribution / 'Quel type d'homme dit-on que vous êtes ?') et Processus Biographiques (Axe temporel / Pour soi / Actes d'appartenance / 'Quel type d'homme dites-vous que vous êtes ?').",
      "La sociologie critique de Pierre Bourdieu : la formule canonique (dispositions + capital) × champ = habitus. La double vérité du travail (le travail comme exploitation objective et réalisation subjective enchantée).",
      "Modalités d'évaluation de PST123 : Épreuve finale de 2h sur table sans documents, choix entre Option A : Dissertation théorique ou Option B : Analyse de situation de travail.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre 2 options",
      optionsAuChoix: [
        "Option A : Dissertation théorique académique (ex: « En quoi l'identité professionnelle est-elle le résultat d'une double transaction selon Claude Dubar ? » ou « Discutez la double vérité du travail selon Pierre Bourdieu »).",
        "Option B : Analyse clinique d'une situation professionnelle (décortiquer un cas réel à partir des 4 modèles relationnels de Renaud Sainsaulieu ou de la grille des transactions de Dubar).",
      ],
      recommandationsNotation:
        "Mme Lucy pénalise lourdement le bavardage psychologique ou journalistique. Pour avoir plus de 16/20, il faut impérativement utiliser le vocabulaire sociologique exact : « transaction biographique », « actes d'attribution », « violence symbolique », « habitus », « modèle affinitaire ».",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire : Claude Dubar — La Socialisation (Chapitres 1 à 5)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire attentivement les chapitres introductifs de l'ouvrage de Claude Dubar ('La socialisation : construction des identités sociales et professionnelles') mis à disposition sur l'espace Moodle. Repérer comment Dubar dépasse l'opposition entre sociologie fonctionnaliste et psychologie individuelle.",
        echeance: "Avant la séance 2",
        modaliteRendu: "Fiche de lecture personnelle en vue de l'AD 1.",
        recommandationsProf: "Être capable de schématiser les deux axes (temporel et relationnel).",
        lienAdId: "pst123-ad1-dubar",
      },
      {
        titre: "Visionnage vidéo : Raphaël Enthoven ('La philosophie de l'identité')",
        typeTravail: "recherche",
        consigneExacte:
          "Visionner les deux capsules vidéo de Raphaël Enthoven sur le paradoxe identitaire. Noter comment la quête de singularité personnelle s'appuie paradoxalement sur des codes culturels universels.",
        echeance: "Séance 1",
        modaliteRendu: "Notes de réflexion pour l'introduction de vos dissertations.",
        recommandationsProf: "Excellent levier d'accroche pour l'Option A d'examen.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Introduction Épistémologique : Qu'est-ce que l'Identité au Travail ?",
        points: [
          {
            titre: "Le paradoxe d'Enthoven : Singularité subjective vs Conformisme social",
            contenu:
              "Dans sa leçon sur la philosophie de l'identité, Raphaël Enthoven résume le paradoxe constitutif du sujet moderne : « L'identité personnelle est ce sentiment intime que 'c'est moi', tout en faisant exactement comme tout le monde ». Pour affirmer qui je suis, je suis obligé d'emprunter le vocabulaire, les vêtements, les titres et les rôles préexistants de ma société. En psychologie du travail, ce paradoxe s'exprime dans le choix du métier : nous cherchons à nous accomplir individuellement à travers des statuts sociaux préétablis.",
            auteurs: ["Raphaël Enthoven"],
          },
          {
            titre: "Dépasser la vision essentialiste de l'identité",
            contenu:
              "Pour Mme Lucy et les sociologues du travail, l'identité n'est pas une 'substance psychologique' figée à la naissance ni un ADN moral. C'est un processus dynamique d'identification et de différenciation qui se construit et se déconstruit tout au long de la vie professionnelle lors des épreuves de travail.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Les 4 Grands Paradigmes Sociologiques de l'Identité",
        points: [
          {
            titre: "1. Le paradigme fonctionnaliste et culturaliste (Durkheim, Parsons, Kardiner)",
            contenu:
              "L'identité est conçue comme l'intériorisation réussie des valeurs, des normes et des rôles prescrits par la société. L'institution façonne une 'personnalité de base'. Le travail assure l'intégration sociale et conjure l'anomie.",
            auteurs: ["Émile Durkheim", "Talcott Parsons", "Abram Kardiner"],
          },
          {
            titre: "2. Le paradigme de l'interactionnisme symbolique (Goffman, Becker)",
            contenu:
              "Erving Goffman (1963, Stigmate) distingue l'identité sociale réelle (les attributs effectifs que l'on possède) et l'identité sociale virtuelle (ce que le public projette sur nous lors de la mise en scène). Howard Becker (1963, Outsiders) démontre la puissance de l'étiquetage (labeling theory) : la déviance ou l'incompétence n'est pas une propriété intrinsèque de l'individu, mais un jugement d'attribution posé par ceux qui ont le pouvoir d'imposer leurs normes.",
            auteurs: ["Erving Goffman (1963)", "Howard S. Becker (1963)"],
          },
          {
            titre: "3. Le paradigme critique de la reproduction (Pierre Bourdieu)",
            contenu:
              "Pour Bourdieu, l'identité s'articule autour de la formule canonique : (Habitus + Capital) × Champ = Pratique. L'habitus est un système de dispositions durables et transposables, incorporé dès l'enfance. Le travail repose sur la 'double vérité' : c'est objectivement un lieu d'exploitation et d'asymétrie de capital, mais subjectivement vécu comme un engagement passionné et gratifiant.",
            auteurs: ["Pierre Bourdieu (1980, 1996)"],
          },
          {
            titre: "4. Le paradigme socioconstructiviste de la socialisation (Claude Dubar)",
            contenu:
              "Dubar réconcilie psychologie et sociologie en démontrant que l'identité est le produit indissociable d'une double transaction : entre l'axe temporel biographique (pour soi) et l'axe spatial relationnel (pour autrui).",
            auteurs: ["Claude Dubar (1991, 2000)"],
          },
        ],
      },
      {
        numero: "3",
        titre: "La Grille d'Analyse Officielle de Claude Dubar (Document E. Lucy)",
        points: [
          {
            titre: "Axe des Processus Relationnels (Identité pour autrui)",
            contenu:
              "Question centrale : « Quel type d'homme ou de femme dit-on que vous êtes ? ». Repose sur les actes d'attribution émis par les managers, les pairs et les institutions. C'est l'identité sociale virtuelle attribuée de l'extérieur. L'alternative vécue oscille entre coopération-reconnaissance (quand l'attribution valorise le sujet) et conflit-non reconnaissance (quand l'institution enferme le sujet dans un étiquetage réducteur ou déqualifié).",
          },
          {
            titre: "Axe des Processus Biographiques (Identité pour soi)",
            contenu:
              "Question centrale : « Quel type d'homme ou de femme dites-vous que vous êtes ? ». Repose sur les actes d'appartenance revendiqués subjectivement par le professionnel. C'est l'identité réflexive et intime. L'alternative vécue oscille entre continuité-reproduction (je poursuis l'héritage de mon métier d'origine) et rupture-production (je me convertis, je crée une nouvelle identité visée en faisant le deuil de mon statut antérieur).",
          },
          {
            titre: "Les 4 Formes Identitaires fondamentales de Dubar",
            contenu:
              "1. Identité de retrait / exclusion : attribution dévalorisée + refus d'adhérer à l'entreprise (exécutant précaire menacé) ; 2. Identité bloquée : ouvrier qualifié de métier dont le savoir est exproprié par les nouvelles technologies ; 3. Identité carriériste / mobilisation : promotion interne, conformité totale aux exigences managériales ; 4. Identité de réseau / affinitaire : mobilité externe, quête d'autonomie et individualisme stratégique.",
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Matrice Officielle d'Analyse des Stratégies Identitaires (Document E. Lucy / Cnam)",
        description: "Tableau de référence issu du document de cadrage de Mme Lucy sur la double transaction de Claude Dubar",
        colonnes: ["Critères d'analyse", "Processus Relationnels (Pour autrui)", "Processus Biographiques (Pour soi)"],
        lignes: [
          {
            axe: "Question fondamentale posée",
            valeurs: [
              "« Quel type d'homme ou de femme dit-on que vous êtes ? »",
              "« Quel type d'homme ou de femme dites-vous que vous êtes ? »",
            ],
          },
          {
            axe: "Nature des actes",
            valeurs: [
              "Actes d'attribution (catégorisation externe, étiquetage managérial)",
              "Actes d'appartenance (affiliations revendiquées, récits de soi)",
            ],
          },
          {
            axe: "Identité selon Goffman",
            valeurs: [
              "Identité sociale 'virtuelle' (assignée par le public / l'organisation)",
              "Identité sociale 'réelle' (éprouvée intimement par l'acteur)",
            ],
          },
          {
            axe: "Tension transactionnelle",
            valeurs: [
              "Entre identités attribuées/proposées et identités assumées/incorporées",
              "Entre identités héritées du passé et identités visées vers l'avenir",
            ],
          },
          {
            axe: "Alternative de régulation",
            valeurs: [
              "Coopération & Reconnaissance ↔ Conflits & Non-reconnaissance",
              "Continuité & Reproduction ↔ Rupture & Nouvelle production de soi",
            ],
          },
          {
            axe: "Expérience vécue",
            valeurs: [
              "Expériences relationnelles du pouvoir, de l'autorité et des hiérarchies",
              "Expériences des stratifications, des inégalités et des bifurcations de carrière",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne pas confondre 'Acte d'attribution' et 'Acte d'appartenance'",
        erreurCourante: "Intervertir l'attribution (externe) et l'appartenance (interne).",
        rectificationAttendue:
          "L'attribution vient toujours d'autrui (l'institution, le chef, le regard des pairs). L'appartenance est toujours une proclamation du sujet ('je suis psychologue', 'je fais partie des soignants'). L'identité réussie est l'ajustement harmonieux entre les deux.",
        contexte: "Section 3 — Claude Dubar",
      },
      {
        titre: "Formule de Bourdieu et habitus",
        erreurCourante: "Présenter l'habitus comme un destin figé ou purement déterministe.",
        rectificationAttendue:
          "L'habitus est un système de dispositions durables mais génératrices. Il s'actualise dans la relation avec un 'champ' spécifique. Si le champ change, l'habitus peut entrer en crise (l'effet Don Quichotte ou l'hystérésis de l'habitus).",
        contexte: "Section 2 — Pierre Bourdieu",
      },
      {
        titre: "Sainsaulieu : les 4 modèles ne sont pas des personnalités psychologiques",
        erreurCourante: "Dire qu'un salarié est 'de nature fusionnelle' ou 'a un caractère de retrait'.",
        rectificationAttendue:
          "Pour Renaud Sainsaulieu (1977, L'Identité au travail), les 4 modèles (Fusionnel, Négociateur, Affinitaire, Retrait) sont le résultat objectif de l'organisation du travail et de la marge de pouvoir accordée à l'opérateur.",
        contexte: "Séance 3 & Option B d'examen",
      },
    ],
    transcriptionIntegraleVerbatim: `PST123 — L'IDENTITÉ SOCIALE ET PROFESSIONNELLE AU TRAVAIL
Enseignante responsable : Mme Élisabeth LUCY (Cnam)
Dossier Pédagogique Inaugural de Cadrage Théorique & Synthèse des Ressources Officielles

I. LES NOTIONS D'IDENTITÉ EN SCIENCES DE L'HOMME (SÉANCE 1)
L'enseignement de Mme Lucy débute par un retour indispensable sur l'histoire des théories de l'identité en sociologie et en psychologie sociale. L'identité humaine se situe au carrefour de deux impératifs contradictoires : le désir d'être unique (singularité, authenticité) et le besoin vital d'être reconnu et accepté par un groupe (appartenance, conformité).

1. Le paradoxe de l'identité personnelle (Raphaël Enthoven)
Dans sa conférence de référence, Raphaël Enthoven pose la question fondamentale : 'Qui suis-je ?'. Répondre à cette question oblige à mobiliser des critères extérieurs : notre prénom (choisi par d'autres), notre nationalité (définie par la loi), notre profession (normée par le marché). L'identité personnelle est donc une tension permanente entre le 'pour soi' intérieur et le 'pour autrui' social.

2. Les courants majeurs mobilisés dans le cours de Mme Lucy :
- Jean Piaget : L'identité cognitive se structure par assimilation du réel et accommodation des schèmes.
- Émile Durkheim & Talcott Parsons : L'intégration sociale comme protection contre l'anomie ; le rôle des institutions dans la socialisation méthodique.
- Erving Goffman : La métaphore théâtrale de la vie quotidienne. Façade personnelle, coulisses, identité sociale virtuelle vs réelle, et gestion du stigmate.
- Howard Becker : La théorie de l'étiquetage et les carrières de déviance.
- Max Weber : Les 3 formes de domination légitime (traditionnelle, charismatique, rationnelle-légale).
- Pierre Bourdieu : L'incorporation de l'arbitraire culturel, l'habitus et les luttes pour les capitaux symboliques.

II. LE MODÈLE DE CLAUDE DUBAR : LA DOUBLE TRANSACTION IDENTITAIRE
Dans 'La socialisation' (1991), Claude Dubar formule le modèle le plus abouti pour comprendre les mutations professionnelles actuelles.
Pour Dubar, l'identité n'est ni un état, ni un simple rôle : c'est le résultat d'une DOUBLE TRANSACTION simultanée :

1. La Transaction Biographique (Axe temporel - Identité pour soi) :
Le sujet négocie avec lui-même la continuité de son histoire. Il cherche à faire le pont entre ses identités héritées du passé (famille, formation initiale, ancien métier) et ses identités visées vers l'avenir (projet de promotion, reconversion vers la psychologie du travail). L'alternative est entre la continuité (reproduction) et la rupture biographique créatrice.

2. La Transaction Relationnelle (Axe social - Identité pour autrui) :
Le sujet négocie avec les autres (l'institution, les collègues, les supérieurs, les usagers) la reconnaissance de sa compétence et de sa place. Les autres émettent des actes d'attribution (ils nous étiquettent comme 'débutant', 'expert', 'technicien', 'cadre'). Le sujet répond par des actes d'appartenance (il revendique son statut, montre ses diplômes, adopte les codes). L'alternative oscille entre coopération/reconnaissance et conflit/rejet.

Quand les deux transactions convergent, l'identité professionnelle est stabilisée et épanouie. Quand un décalage majeur persiste (par exemple : le sujet se vit comme psychologue du travail, mais la direction continue de le traiter comme un simple opérateur de saisie RH), il y a crise identitaire aiguë et souffrance au travail.

III. LES PERSPECTIVES POUR L'EXAMEN FINAL (OPTION A & OPTION B)
Mme Lucy propose à l'examen final deux choix méthodologiques :
- Soit l'Option A (Dissertation théorique) : exige une introduction soignée en 5 étapes, une problématique conceptuelle solide, et une confrontation rigoureuse des auteurs (Dubar confronté à Bourdieu ou Sainsaulieu).
- Soit l'Option B (Analyse de cas clinique) : décortiquer une situation professionnelle concrète en identifiant précisément les actes d'attribution, les actes d'appartenance, et le modèle de pouvoir dominant selon Renaud Sainsaulieu (Fusionnel, Négociateur, Affinitaire ou Retrait).`,
    bibliographieCitee: [
      {
        titre: "La socialisation : construction des identités sociales et professionnelles",
        auteur: "Claude Dubar",
        annee: "1991 (5e éd. 2015)",
        remarque: "L'ouvrage socle incontournable de tout le cours de PST123 chez Armand Colin.",
      },
      {
        titre: "L'identité au travail : les effets culturels de l'organisation",
        auteur: "Renaud Sainsaulieu",
        annee: "1977 (Presses de Sciences Po)",
        remarque: "Étude empirique magistrale fondant les 4 modèles d'accès au pouvoir d'atelier.",
      },
      {
        titre: "La double vérité du travail",
        auteur: "Pierre Bourdieu",
        annee: "1996 (Actes de la recherche en sciences sociales)",
        remarque: "Article clé sur l'illusion biographique et l'enchantement du travail exploité.",
      },
      {
        titre: "La lutte pour la reconnaissance",
        auteur: "Axel Honneth",
        annee: "1992 (Éditions du Cerf)",
        remarque: "Les 3 sphères de reconnaissance et la sociologie du mépris social.",
      },
      {
        titre: "Une profession balkanisée : les psychologues du travail en France",
        auteur: "Thomas Le Bianic",
        annee: "2004",
        remarque: "Histoire sociologique de la conquête du titre de 1985 et de la chaire du Cnam.",
      },
    ],
  },
];

