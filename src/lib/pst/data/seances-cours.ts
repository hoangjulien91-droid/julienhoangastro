/**
 * Journal des Séances & Cours Retranscrits (PST106, PST108, PST123)
 * Intégration dans le code des cours réels enregistrés et retranscrits
 * (Webconférences, synthèses de cours, transcriptions intégrales verbatim, consignes orales des professeurs).
 *
 * ⚠️ RÈGLE OBLIGATOIRE DU PROJET (cf. AGENTS.md / GEMINI.md) :
 * Toute nouvelle séance ajoutée à SEANCES_COURS_DATA DOIT IMPÉRATIVEMENT
 * posséder sa "Fiche L'Essentiel du Cours" dans src/lib/pst/data/essentiel-cours.ts (ESSENTIEL_COURS_DATA)
 * avec id: "${moduleKey}-s${numeroSeance}", fil conducteur, ceQuIlFautSavoir, ceQuIlFautRetenir,
 * auteursCles, conceptsCles et piegeExamen.
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
    transcriptionIntegraleVerbatim: `[1. Cadrage épistémologique : Clinique de l'activité, histoire et posture scientifique]
[00:12:40] PR. LAGABRIELLE : « Pour bien comprendre une science, il faut en connaître l'histoire. Yves Clot a toujours eu le souci d'inscrire la clinique de l'activité dans l'histoire de la psychologie du travail et de dialoguer avec elle. »
[00:24:15] PR. LAGABRIELLE : « Non, ce n'est pas ChatGPT qui va devenir psychologue du travail ! Nos outils ne sont pas le sens commun ni les recettes managériales, mais les concepts scientifiques rigoureux issus de la recherche et de l'intervention de terrain. »
Repère méthodologique Cnam : sur les diaporamas de cours, tout élément placé entre crochets [ ] signale une recherche personnelle ou une Activité Distante (AD) obligatoire à préparer.

[2. Qu'est-ce que le travail ? Étymologie, philosophie (Arendt) et psychologie (Wallon, Dejours)]
[00:48:20] PR. LAGABRIELLE : « L'étymologie tripalium rappelle l'instrument de torture à trois pieux et la douleur de l'accouchement, mais réduire le travail à la seule souffrance est un contresens : le Littré recense 24 sens du mot travail. »
[01:02:10] PR. LAGABRIELLE : « Chez Hannah Arendt (Condition de l'homme moderne, 1958), travailler dans l'Antiquité grecque était une occupation servile réservée aux esclaves et aux femmes car travailler, c'était s'asservir à la nécessité biologique (l'Animal laborans). Arendt distingue trois registres : le Travail (survie biologique cyclique), l'Œuvre (création d'un monde d'objets durables par l'Homo faber) et l'Action (débat politique citoyen dans la polis). »
[01:18:35] PR. LAGABRIELLE : « Pour Henri Wallon, le travail est une "activité forcée" étrangère à nos besoins immédiats qui s'oppose au jeu spontané. Pour Christophe Dejours, c'est un espace de signification entre le sujet et le champ social où se conjuguent l'être et le faire. »

[3. Critères constants du travail (Goguelin, Lévy-Leboyer) & Dimensions culturelles (Hofstede)]
[01:36:50] PR. LAGABRIELLE : « Pierre Goguelin oppose deux lectures : réduire le travail au seul comportement observable de l'extérieur, ou comprendre les modalités d'organisation invisibles de l'activité interne. Claude Lévy-Leboyer fixe trois critères invariants : l'effort (mobilisation d'énergie), le but (finalité productive) et les contraintes (sociales, temporelles, éthiques). »
[01:58:15] PR. LAGABRIELLE : « L'enquête internationale de Geert Hofstede sur 40 pays révèle la singularité culturelle française au travail : un fort individualisme combiné à une distance hiérarchique très élevée et un besoin massif de contrôle de l'incertitude par les règles et les statuts. »

[4. Les fonctions latentes du travail (Marie Jahoda, Marienthal, 1937)]
[02:22:40] PR. LAGABRIELLE : « L'enquête historique de Marie Jahoda, Paul Lazarsfeld et Hans Zeisel à Marienthal (1937) démontre que lorsque toute une communauté perd son emploi suite à la fermeture de l'usine textile, elle ne perd pas seulement la fonction manifeste du salaire : elle s'effondre dans l'apathie par perte des 5 fonctions latentes du travail — la structuration du temps quotidien, les interactions sociales hors famille, la participation à des buts collectifs utiles, le statut identitaire et l'activité régulière. »

[5. Clinique de l'activité et pouvoir d'agir (Yves Clot)]
[02:51:10] PR. LAGABRIELLE : « La clinique de l'activité n'est utile que si elle permet d'agir sur le travail et de le transformer. Le travail remplit une double fonction vitale : une fonction psychologique (développement du sujet, style personnel) et une fonction sociale (collectif de travail, histoire sédimentée du métier, genre professionnel). »`,
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
            titre: "Édouard Toulouse, Henri Piéron et l'INOP : Aptitude vs Capacité et Docimologie (1928 / Huteau & Blanchard 2014)",
            contenu:
              "En 1906, le Dr Édouard Toulouse crée le laboratoire de psychologie expérimentale à l'asile de Villejuif et formule le projet d'une science du travail humain. Henri Piéron lui succède et fonde en 1928 l'Institut National d'Orientation Professionnelle (INOP, rattaché au Cnam en 1941). Pour Piéron, la psychotechnique est un projet émancipateur républicain : substituer l'orientation scientifique basée sur les aptitudes réelles à la reproduction sociale bourgeoise. Deux apports théoriques capitaux à maîtriser pour l'examen : 1) La distinction rigoureuse entre 'Aptitude' (substrat congénital physiologique/mental mesuré par tests standardisés) et 'Capacité' (rendement effectif observable acquis par l'apprentissage et l'expérience en milieu réel) ; 2) La création de la Docimologie (science critique de l'évaluation), prouvant scientifiquement la discordance flagrante et l'injustice arbitraire des jurys d'examens traditionnels. Michel Huteau et Serge Blanchard (2014) rappellent toutefois les controverses majeures : les critiques de Pierre Naville (1945) et Antoine Léon (1952) dénonçant le postulat fixiste de l'orientation et défendant une orientation 'éducative et formatrice' plutôt que purement révélatrice, ainsi que les travaux de Maurice Reuchlin (1954) démontrant que l'aptitude est indissociable du milieu socio-économique.",
            auteurs: ["Édouard Toulouse (1906)", "Henri Piéron (1928)", "Michel Huteau & Serge Blanchard (2014)", "Antoine Léon & Maurice Reuchlin"],
            conceptsCles: ["INOP / INETOP Cnam", "Aptitude vs Capacité", "Docimologie", "Orientation formatrice vs révélatrice", "Justice républicaine"],
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
    transcriptionIntegraleVerbatim: `[1. Les philosophes du travail : De la servitude sociale (Rousseau) à « la meilleure des polices » (Nietzsche)]
[00:10:46] PR. LAGABRIELLE : « Dans le Discours sur l'origine de l'inégalité (1755), Jean-Jacques Rousseau montre que dans l'état de nature, l'homme vit dans une oisiveté paisible. Le travail forcé et la division des tâches n'apparaissent qu'avec la propriété privée et la métallurgie : dès lors que l'on a besoin d'un autre pour produire, l'égalité disparaît et la servitude sociale commence. »
[00:21:17] PR. LAGABRIELLE : « Dans Aurore (1881), Friedrich Nietzsche écrit cette formule percutante : "Le travail est la meilleure des polices". Pourquoi une police ? Parce que le labeur acharné du matin au soir consume une énergie nerveuse prodigieuse : il vide l'individu de sa force vitale, l'empêche de réfléchir et bride ses désirs d'indépendance. »
[00:31:10] PR. LAGABRIELLE : « Là où Marcuse (Éros et Civilisation) dénonce la désérotisation du corps au profit de la productivité et où Weber analyse le Beruf calviniste, Sigmund Freud (Malaise dans la civilisation, 1930) résume la santé psychique par la capacité d'"aimer et travailler" : le travail est l'ancrage royal dans le principe de réalité et la voie majeure de sublimation des pulsions. »

[2. L'École classique : Fayol (POC3), Taylor (OST) & Ford (Five Dollars a Day)]
[00:40:08] PR. LAGABRIELLE : « En 1916, Henri Fayol formalise le POC3 : Prévoir, Organiser, Commander, Coordonner, Contrôler. Sa vision est purement administrative et pyramidale : la subjectivité et la santé du travailleur sont totalement scotomisées. »
[00:50:33] PR. LAGABRIELLE : « Obsédé par la "flânerie systématique" des ouvriers, Taylor (1911) impose une double division : verticale (les ingénieurs du bureau des méthodes pensent, les ouvriers exécutent) et horizontale (parcellisation en gestes élémentaires chronométrés selon le One Best Way). Il va jusqu'à comparer son manutentionnaire de fonte Schmidt à un "bœuf" devant obéir sans penser. Dans le taylorisme, l'organisation informelle n'existe pas : tout écart au prescrit est traité comme une anomalie à éradiquer ! »
[01:30:34] PR. LAGABRIELLE : « Avec le convoyeur mécanique, Henry Ford immobilise l'ouvrier devant la chaîne. Chez Renault, la part d'ouvriers non qualifiés bondit de 4 % en 1906 à 74 % en 1924 ! Pour stopper un turnover de 380 % par an, Ford instaure en 1914 le Five Dollars a Day afin de fixer la main-d'œuvre et d'en faire les consommateurs de la Ford T. »

[3. Néotaylorisme des services, Toyotisme & Prescription de la subjectivité (Yves Clot)]
[01:42:29] PR. LAGABRIELLE : « Dans le tertiaire, les centres d'appels et la restauration rapide, le néotaylorisme impose des scripts comportementaux ("BAM : Bonjour, Au revoir, Merci") et l'injonction paradoxale du "sourire sincère". Mais la sincérité ne se décrète pas par procédure ! Cela engendre une dissonance émotionnelle pathogène. »
[02:01:01] PR. LAGABRIELLE : « Retenez cette phrase magistrale d'Yves Clot : "Taylor achetait la force de travail physique brute de l'homme ; aujourd'hui, le management achète l'engagement, la disponibilité psychologique et la subjectivité de l'homme." »

[4. La rupture de Jean-Marie Lahy : Optimum vs Maximum & Automatisation interne]
[02:30:32] PR. LAGABRIELLE : « Aux usines Renault de Boulogne-Billancourt, Jean-Marie Lahy observe que les ouvriers sur presses d'emboutissage calent les pièces avec leur tête comme un "troisième bras" pour compenser l'inadaptation de la machine ! Lahy oppose alors deux logiques : Taylor cherche le MAXIMUM immédiat de rendement qui épuise l'organisme, tandis que la psychophysiologie du travail doit chercher l'OPTIMUM — l'équilibre durable entre efficacité et préservation de la santé. »
[02:40:34] PR. LAGABRIELLE : « Découverte capitale de Lahy : l'être humain cherche spontanément à automatiser ses gestes de l'intérieur. Pourquoi ? Parce qu'une fois le geste incorporé, vous n'avez plus besoin d'y penser : l'automatisation interne libère de la disponibilité psychologique pour penser, rêver et créer ! Ce qui est destructeur chez Taylor, c'est la cadence externe imposée du dehors qui confisque cette liberté intérieure. »

[5. Suzanne Pacaud (1953) : L'étude des téléphonistes SNCF & la naissance de l'ergonomie]
[02:50:10] PR. LAGABRIELLE : « En 1953, Suzanne Pacaud quitte le laboratoire pour partager le quotidien des téléphonistes du Central de la SNCF. Elle pose la maxime fondatrice de l'ergonomie francophone : "Pour comprendre le métier, il faut le faire." »
[03:00:14] PR. LAGABRIELLE : « Pacaud révèle 14 difficultés invisibles (vacarme, appels traités en 15 secondes, mémorisation mentale de tout le réseau sans informatique, agressivité des usagers) et démontre que ce que les inspecteurs sanctionnaient comme des "fautes" ou du "bavardage" était en réalité des régulations cognitives de survie indispensables pour tenir le service ! »`,
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
            titre: "L'Étude de cas Harwood (Coch & French, 1948) : La résistance au changement comme dynamique de groupe",
            contenu: "Étude de cas expérimentale canonique menée à l'usine textile de pyjamas Harwood (Marion, Virginie) sous l'égide de Kurt Lewin. Face à une modification technique d'outils et de modèles, la direction compare 4 groupes d'ouvrières : 1) Groupe 1 (non-participation / contrôle) : décision unilatérale descendante. Résultat : effondrement immédiat de la productivité de 60 à 50 unités, 17% de démissions en 40 jours, absentéisme massif, agressivité ouverte contre la maîtrise et sabotage de la cadence par solidarité de groupe ; 2) Groupe 2 (participation par représentants élus) : 8 ouvrières choisies conçoivent les aménagements avec l'ingénieur. Résultat : retour progressif au standard initial en 14 jours, climat apaisé ; 3) Groupes 3 et 4 (participation totale directe) : toutes les ouvrières participent au dégel, discutent de la nécessité du changement et conçoivent elles-mêmes les simplifications de gestes. Résultat spectaculaire : bond à 70 unités en quelques jours (+14% au-dessus du record historique de l'usine !), 0 démission, 0 conflit et coopération active avec l'encadrement. Deux mois plus tard, le Groupe 1 réuni avec la méthode de participation totale atteint à son tour 70 unités, démontrant que la résistance n'est pas une tare individuelle de l'ouvrier mais une force de défense collective face à l'imposition hiérarchique.",
            auteurs: [
              "Lester Coch & John R. P. French Jr. (1948)",
              "Kurt Lewin",
            ],
            conceptsCles: [
              "Harwood Manufacturing",
              "Participation totale vs Contrôle",
              "Résistance au changement",
              "Norme homéostatique de groupe",
              "Dégel / Mouvement / Regel",
            ],
          },
          {
            titre: "Abraham Maslow et la Théorie des Plaintes : Des besoins de base aux métaplaintes de perfection (1971 / Corinne Prost)",
            contenu: "Dans 'The Farther Reaches of Human Nature' (1971), Maslow approfondit sa théorie des besoins en analysant la nature des plaintes (gripes) au travail. Il réfute le mythe d'une organisation idéale 'sans plaintes' : l'être humain ne cesse jamais de désirer. Il distingue 3 niveaux hiérarchiques de plaintes : 1) Plaintes de bas niveau (low grumbles) : revendications de survie biologique, froid glacial, chaleur étouffante, bruit assourdissant, danger d'accident mortel, salaires de misère ; 2) Plaintes de niveau supérieur (high grumbles) : questions de dignité, sécurité de l'emploi, appartenance au collectif, justice managériale ; 3) Métaplaintes (meta-grumbles) : réclamations émises par des salariés dont les besoins primaires sont comblés, mais qui exigent la beauté du travail, la justice sociale, l'excellence éthique, l'efficience technique et la vérité des communications. Les 4 questions de Corinne Prost soulignent qu'entendre des métaplaintes est le marqueur indiscutable d'une organisation en excellente santé démocratique.",
            auteurs: [
              "Abraham Maslow (1971)",
              "Corinne Prost (2026)",
            ],
            conceptsCles: [
              "Low grumbles (plaintes de bas niveau)",
              "High grumbles (plaintes supérieures)",
              "Meta-grumbles (métaplaintes)",
              "Perfection éthique et esthétique",
              "Santé organisationnelle",
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
            titre: "Alain Wisner : De l'adaptation de la machine à l'homme au concept du « travailler » (Sznelwar & Le Doaré, 2006)",
            contenu: "Médecin et physiologiste au Cnam, Alain Wisner fonde l'ergonomie de langue française. Discipline pluridisciplinaire (physiologie, médecine, psychologie, sociologie) visant la transformation concrète des situations de travail (outils, postes, rythmes). Inversion historique : on passe de l'adaptation de l'homme au travail (sélection taylorienne) à l'adaptation du travail à l'homme. Dans leur étude parue dans 'Travailler' (2006), Sznelwar et Le Doaré soulignent que Wisner a toujours reconnu l'intelligence vivante des travailleurs et récusé les transferts technologiques aveugles (anthropotechnologie). Wisner a introduit le primat du verbe 'travailler' sur le mot 'travail' pour signifier que l'activité réelle est un engagement subjectif indissociable de la santé.",
            auteurs: [
              "Alain Wisner",
              "Laerte Idal Sznelwar & Hélène Le Doaré (2006)",
            ],
            conceptsCles: [
              "Ergonomie francophone",
              "Adapter le travail à l'homme",
              "Le travailler",
              "Intelligence ouvrière",
              "Anthropotechnologie",
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
            titre: "Jean-Marie Faverge : Révolution de l'analyse du travail et les 4 types d'activités (1955 / Ouvrier-Bonnaz 2011)",
            contenu: "Premier titulaire de la chaire de psychologie du travail à l'ULB après le Cnam et le CERP, Jean-Marie Faverge (1912-1988) dénonce l'illusion de la psychométrie élémentaire ('l'homme n'est pas une collection de pièces détachées') et publie en 1955 avec André Ombredane 'L'Analyse du Travail'. Comme le rappelle Régis Ouvrier-Bonnaz (2011), Faverge structure l'analyse autour de 4 dimensions fonctionnelles fondamentales : 1) Motrices et gestuelles (postures, biomécanique) ; 2) Informationnelles (signaux, lecture d'indices, prise d'information) ; 3) Régulatoires (gestion des aléas, contrôle des dérives, compromis opératoires) ; 4) Collectives et communicationnelles (coordination, langage de métier). Ce modèle a directement inspiré le schéma des 5 carrés et la double régulation de Leplat & Cuny (1977).",
            auteurs: [
              "Jean-Marie Faverge & André Ombredane (1955)",
              "Régis Ouvrier-Bonnaz (2011)",
            ],
            conceptsCles: [
              "Composantes motrices",
              "Informationnelles",
              "Régulatoires",
              "Collectives & Communicationnelles",
              "Structure opérative",
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
            titre: "Yves Clot (2004) : « Une intensification du travail peut-elle en cacher une autre ? » et l'activité ravalée",
            contenu: "Dans son article fondateur paru dans 'Travail et Emploi' (DARES, 2004), Yves Clot déconstruit l'intensification contemporaine du travail : l'accélération quantitative des cadences n'est que la surface visible. La véritable toxicité contemporaine réside dans le 'ravalement de l'activité'. Les salariés sont sommés de faire vite ET de faire zéro défaut sous les injonctions contradictoires du lean management, tout en étant privés des marges de manœuvre délibératives pour en débattre avec leurs pairs. L'activité est 'ravalée' (rabaissée au rang de pure conformité formelle et niée dans son intelligence vivante). Clot prouve que ce n'est pas le travail en soi qui épuise, mais le 'travail nié' et la 'qualité empêchée', conduisant au désengagement cynique ou à l'usure mentale.",
            auteurs: [
              "Yves Clot (2004)",
            ],
            conceptsCles: [
              "Une intensification en cache une autre",
              "Activité ravalée",
              "Travail nié",
              "Qualité empêchée",
              "Tyrannies procédurales",
            ],
          },
          {
            titre: "Filiation sociologique et institutionnelle des Chaires au Cnam (1900 - 2026 / Ouvrier-Bonnaz & Le Bianic)",
            contenu: "Régis Ouvrier-Bonnaz (2010) et Thomas Le Bianic (2004) retracent l'histoire séculaire des sciences du travail au Conservatoire : 1) 1900-1914 : impulsée par le ministre Alexandre Millerand, création en 1905 du premier cours d'hygiène industrielle (Heim de Balsac) et en 1913 du laboratoire du travail musculaire de Jules Amar (modèle énergétique de la 'machine humaine') ; 2) 1920-1945 : chaires de Langlois et Pottevin, puis nomination en 1928 d'Henri Laugier ouvrant la voie à la fondation de l'INOP avec Piéron et à la revue 'Le Travail Humain' (1933) avec Lahy ; 3) 1945-1970 : essor de la psychométrie pour la reconstruction (Raymond Bonnardel, Paul-René Bize) ; 4) 1977-1990 : création officielle de la Chaire de Psychologie du Travail par Pierre Goguelin et délivrance du Titre RNCP de Psychologue du Travail ; 5) Scission de 1990 : départ de Goguelin ouvrant la bipolarisation entre Psychodynamique (Dejours) et Clinique de l'activité (Clot), prolongée en 2018 par Marc-Éric Bobillier-Chaumon (clinique des usages et IA).",
            auteurs: [
              "Régis Ouvrier-Bonnaz (2010)",
              "Thomas Le Bianic (2004)",
              "Alexandre Millerand & Jules Amar",
              "Henri Laugier & Pierre Goguelin",
            ],
            conceptsCles: [
              "Chaires Cnam (1900-1990)",
              "Machine humaine",
              "Jules Amar (1913)",
              "Laugier (1928)",
              "Goguelin (1977)",
              "Scission 1990",
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
    transcriptionIntegraleVerbatim: `[1. Ouverture : Deux citations fondatrices contre le réductionnisme machinique]
[00:05:12] PR. LAGABRIELLE : « Avant d'aborder l'École des relations humaines, retenez ces deux phrases capitales : d'abord Yves Clot (citant Jacques d'Avout, 1993) : "Il n'y a de travail qu'humain, la machine est capable d'exécution, seul l'homme travaille et jamais comme une machine." Ensuite Christophe Dejours (1993) : "Travailler implique de tenir compte d'un monde plus complexe que le monde idéal prévu par les consignes." »

[2. Elton Mayo (Hawthorne, 1927-1932) & Règle d'or sur la motivation]
[00:22:40] PR. LAGABRIELLE : « Dans l'atelier du Relay Assembly Test Room à Hawthorne, même lorsqu'on supprime les pauses et les collations pour revenir aux horaires initiaux, la productivité des six ouvrières augmente de 20 % ! Mayo réfute ainsi l'homo economicus taylorien : l'attention bienveillante portée aux salariées (Effet Hawthorne) et la cohésion de l'organisation informelle l'emportent sur le seul intérêt financier. »
[00:38:15] PR. LAGABRIELLE : « Mais attention au piège de vocabulaire sanctionné à l'examen : ON NE MOTIVE PAS LES PERSONNES ! C'est un abus de langage managérial. Une direction ne peut que créer des conditions potentiellement motivantes, et c'est le sujet qui se motive ou non. Et attention aussi à Maslow : Maslow n'a jamais dessiné de pyramide dans ses textes originaux de 1954 ! »

[3. Herzberg (Bi-factorielle), McGregor (X/Y), Lewin (Abats) & Limite majeure des Relations Humaines]
[00:54:30] PR. LAGABRIELLE : « Frederick Herzberg prouve que les facteurs d'hygiène (salaire, bruit, conditions matérielles) et les facteurs moteurs (contenu du travail, accomplissement, responsabilité) ne sont pas sur un même continuum : quand les facteurs d'hygiène sont excellents, ils ne motivent pas, ils produisent seulement un état de "non-insatisfaction" ! Pour créer de la satisfaction durable, il faut agir sur le contenu par l'enrichissement vertical des tâches. »
[01:15:20] PR. LAGABRIELLE : « Dans son expérience des abats en 1943, Kurt Lewin démontre que les conférences magistrales d'experts n'amènent que 3 % des ménagères à cuisiner des abats, contre 30 % lorsque la décision est débattue collectivement entre pairs (Décristallisation → Déplacement → Recristallisation). »
[01:28:45] PR. LAGABRIELLE : « Quelle est la limite aveugle de l'École des relations humaines ? Tout comme le taylorisme, elle occulte les rapports structurels de domination économique ET elle ne prend toujours pas en compte le TRAVAIL RÉEL — c'est-à-dire l'activité concrète, les pannes, les imprévus et les arbitrages de l'opérateur ! »

[4. Histoire de la Chaire du Cnam : De Piéron et Goguelin à Dejours, Clot et Bobillier-Chaumon]
[01:42:10] PR. LAGABRIELLE : « Au Cnam, Pierre Goguelin transforme en 1977 l'enseignement en véritable Chaire de Psychologie du Travail et crée le Diplôme d'État. En 1990, lors de sa succession opposant Michel Huteau à Christophe Dejours, l'arrivée de Dejours ouvre l'ère clinique qui se structure en deux grands courants au sein du CRTD (fondé en 2007 par Yves Clot) : la Psychodynamique du travail et la Clinique de l'activité, prolongées depuis 2018 par la Clinique des usages de Marc-Éric Bobillier-Chaumon. »

[5. Ergonomie francophone (Wisner, Faverge, Leplat) : Prescrit vs Réel & Schéma des 5 Carrés]
[02:04:30] PR. LAGABRIELLE : « Avec Alain Wisner au Cnam, l'ergonomie francophone renverse le taylorisme : on n'adapte plus l'homme à la machine, on adapte le travail à l'homme ! Et on découvre le paradoxe ergonomique : si les opérateurs appliquaient à la lettre le travail prescrit, l'entreprise s'arrêterait immédiatement — c'est la définition même de la grève du zèle ! »
[02:26:15] PR. LAGABRIELLE : « Jean-Marie Faverge démontre que tout travail comporte 4 composantes indissociables : motrice, informationnelle, régulatoire et intellectuelle. Quant à Jacques Leplat, vous devez impérativement maîtriser pour l'examen son Schéma des 5 Carrés (Conditions externes + Conditions internes → Activité réelle → Effets sur le système + Effets sur la personne) et sa double boucle de régulation interne et externe ! »

[6. Louis Le Guillant : La psychopathologie du travail comme « condition sociale »]
[02:48:50] PR. LAGABRIELLE : « Louis Le Guillant opère un déplacement décisif : le travail n'est pas qu'une activité technique, c'est avant tout une CONDITION SOCIALE inscrite dans des rapports de domination et de subordination ! Qu'il s'agisse de la névrose des téléphonistes qui répètent leurs phrases codées jusque dans leur sommeil, de l'asthénie des conducteurs de locomotives soumis à la VACMA, ou du drame des sœurs Papin (1933) analysé contre le seul réductionnisme délirant, Le Guillant prouve que l'intensification et la condition servile pénètrent et altèrent toute la vie psychique du sujet. »`,
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
  // PST106 — COURS 4 : L'ACTIVITÉ, LE COLLECTIF DE TRAVAIL, LES RÈGLES DE MÉTIER, LE GENRE ET LE STYLE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s4",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 4,
    titre: "Séance 4 — L'Activité, le Collectif de Travail, les Règles de Métier, le Genre et le Style",
    sousTitre: "Du réel de l'activité aux dynamiques de subjectivation : pourquoi le collectif est un opérateur de santé",
    enseignant: "Jessica ROUSSAN (Psychologue du travail, clinicienne) & Pr. Christine LAGABRIELLE",
    dateSeance: "4 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "3 h 00 min 46 s (Webconférence en direct)",
    resumeExecutif: [
      "Posture clinique d'intervention : Jessica Roussan partage 20 ans d'exercice (consultante RH, hôpital 2007 et pôles de soins soignants, régulation d'équipes en binôme avec des ergonomes, médecine de prévention et consultations thérapeutiques). Principe fondamental : ne jamais réduire la souffrance au travail à une vulnérabilité individuelle, mais analyser les atteintes au métier et à l'organisation.",
      "L'Activité Réelle vs le Réel de l'Activité (Yves Clot, 1999) : L'activité réelle est ce qui s'observe concrètement ; le réel de l'activité englobe tout ce qui ne se fait pas, ce qu'on ne peut pas faire, ce qu'on cherche à faire sans y parvenir (les drames du bord du travail), l'activité empêchée, contrariée et suspendue, source majeure de souffrance éthique et d'usure. 'L'homme est plein à chaque minute de possibilités non réalisées' (Vygotski).",
      "Définition cardinale du travail (Diaporama Cnam, slide 9) : 'TRAVAILLER = pouvoir arbitrer entre les prescriptions souvent contradictoires de l'activité et les ressources mobilisables pour agir'. Travailler est une épreuve de confrontation à un réel qui résiste, exigeant une mobilisation psychique pour affirmer sa compétence et sa dignité.",
      "La Catachrèse Ergonomique (Pierre Rabardel, 1995 ; Diaporama Cnam, slide 11) : Détournement fonctionnel d'un outil, progiciel ou document par l'opérateur pour rendre le travail possible face aux défaillances du prescrit (re-création de l'outil technique). Illustrée par les conducteurs de train détournant le régulateur automatique de vitesse pour 'fixer l'esprit' et prévenir le vagabondage mental en cabine. Triple fonction : individuelle (pouvoir d'agir), collective (coopération) et organisationnelle (sauver la production).",
      "Rupture conceptuelle : Travail Collectif vs Collectif de Travail : Le travail collectif est l'agencement formel décrété par l'employeur (organigramme, tâches prescrites, règles écrites). Le collectif de travail est une entité psychosociale vivante non décrétable, construite par les pairs à travers le partage de valeurs et de règles de métier.",
      "Les Trois Conditions de Damien Cru : 1) L'existence de règles de métier débattues ; 2) La reconnaissance réciproque des compétences entre pairs ; 3) Une confiance mutuelle éprouvée. Si les 3 conditions sont réunies et le travail collectif bien organisé, l'activité collective devient un opérateur puissant de santé mentale et de développement.",
      "Architecture triadique des ressources (Miossec & Clot, 2015) : L'activité s'étaye sur 3 niveaux : 1) Ressources impersonnelles (prescriptions, organisation officielle), 2) Ressources transpersonnelles ou génériques (genre professionnel, règles vivantes non écrites, 'stock générique' évitant d'« errer seul face à l'étendue des bêtises possibles » — Jean-Pierre Darré), et 3) Ressources personnelles (style singulier). L'individualisation managériale prive le sujet de cet étayage.",
      "La 'Dispute professionnelle' sur le travail bien fait (Clot & Miossec, 2015) : La qualité du travail au contact du réel est par nature 'définitivement discutable'. Le conflit sur la qualité (vs querelles interpersonnelles) crée le 'sentiment de vivre la même histoire'. Le collectif s'intériorise en 'clavier collectif' et 'diapason' (Vygotski : l'individuel comme forme supérieure du social). Face au management, le collectif permet d'instaurer une 'coopération conflictuelle' faisant descendre l'organisation au réel et revitalisant le CHSCT.",
      "Genre Professionnel et Style (Yves Clot) : Le genre est la mémoire collective intériorisée des manières d'agir, de penser et de dire propres à un métier (ressource psychologique qui évite la solitude face à l'imprévu). Le style est la réappropriation singulière et créatrice du genre par le sujet travailleur ('distance qu'un professionnel interpose entre son action et sa propre histoire').",
      "Élaboration réflexive de l'expérience (Vygotski, 2004 ; Clot, 2008 ; Diaporama Cnam, slide 16) : 'Avoir connaissance de ses expériences vécues n'est rien d'autre que de les avoir à sa disposition à titre d'objet pour faire d'autres expériences'. L'expérience constitue le siège des contradictions vitales : la démarche réflexive engage un travail de subjectivisation permettant de se déprendre de l'amputation du pouvoir d'agir.",
      "Études cliniques de terrain : Les transmissions infirmières jour/nuit à l'hôpital (indices invisibles détruits par les suppressions de postes), les enseignants face aux élèves perturbateurs (solidarité en salle des maîtres face à une direction sans autorité hiérarchique), et l'intervention clinique face à un commanditaire agressif.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Option A (Dissertation) ou Option B (Analyse clinique de situation)",
      optionsAuChoix: [
        "Option 1 : Dissertation théorique rédigée (mobiliser les concepts clés : collectif de travail, règles de métier de Cru, genre/style de Clot, catachrèse de Rabardel).",
        "Option 2 : Analyse clinique d'une situation professionnelle sur texte support (décrypter les conflits de règles de métier, l'activité empêchée et les atteintes au collectif).",
      ],
      recommandationsNotation:
        "Jessica Roussan et Christine Lagabrielle rappellent l'exigence absolue : ne jamais confondre travail collectif et collectif de travail, ne jamais traiter la catachrèse comme une faute, et expliciter les 3 conditions cumulatives de Damien Cru.",
    },
    consignesOralesProf: [
      {
        titre: "Préparation de l'Atelier Clinique Interactif en sous-groupes (Jeudi prochain)",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Préparer une situation concrète issue de votre parcours professionnel ou de votre observation de terrain illustrant soit une catachrèse ergonomique (détournement d'outil pour rendre le travail possible), soit un conflit de règles de métier, soit un dysfonctionnement de collectif de travail. La séance durera 2 heures en sous-groupes et ne sera pas enregistrée pour préserver la stricte confidentialité des échanges.",
        echeance: "Jeudi 12 novembre 2026 (Atelier interactif)",
        modaliteRendu: "Participation orale active et analyse collective en sous-groupes virtuels.",
        recommandationsProf:
          "Prendre des notes personnelles écrites avant l'atelier. Veiller à anonymiser rigoureusement les noms d'entreprises, de collègues et d'usagers.",
      },
      {
        titre: "Lecture recommandée de l'article d'Yves Clot : « Le métier comme opérateur de santé »",
        typeTravail: "lecture",
        consigneExacte:
          "Lire l'article de référence d'Yves Clot sur le métier comme opérateur de santé et réviser les chapitres consacrés au genre et au style professionnel dans « Travail et pouvoir d'agir » (2008).",
        echeance: "Avant l'épreuve terminale",
        modaliteRendu: "Lecture autonome pour étayer les dissertations d'examen.",
        recommandationsProf:
          "Repérer la formule clé : 'Le métier est dans le sujet et le collectif est dans l'individu tout autant que l'inverse'.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Posture Clinique d'Intervention : Du Projet « Hôpital 2007 » à la Santé au Travail",
        points: [
          {
            titre: "L'ancrage de terrain de Jessica Roussan",
            contenu:
              "Psychologue du travail praticienne depuis 2005, Jessica Roussan combine consultations cliniques, interventions collectives en entreprise en binôme avec des ergonomes (analyse de pratiques professionnelles, régulation de tensions) et activité en service de santé au travail / médecine de prévention.",
            auteurs: ["Jessica Roussan"],
            conceptsCles: ["Poste d'observation clinique", "Intervention en santé au travail"],
          },
          {
            titre: "Le cas révélateur du plan « Hôpital 2007 » et la souffrance soignante",
            contenu:
              "Le plan Hôpital 2007 et la réorganisation managériale en pôles de soins ont introduit une rationalisation comptable qui a percuté les repères de métier des soignants. Accompagnement clinique sur la violence, l'annonce des mauvaises nouvelles et la relation soignant-soigné, révélant les liens intimes entre choix d'organisation du travail et santé mentale des agents.",
            auteurs: ["Jessica Roussan"],
            conceptsCles: ["Hôpital 2007", "Souffrance soignante", "Organisation managériale"],
          },
        ],
      },
      {
        numero: "2",
        titre: "L'Activité Réelle, le « Réel de l'Activité » et les Dilemmes du Travail",
        points: [
          {
            titre: "Dépasser le clivage ergonomique classique Prescrit / Réel",
            contenu:
              "L'ergonomie distingue la tâche prescrite et l'activité réelle (Jacques Leplat). Yves Clot approfondit cette analyse en forgeant le concept de 'réel de l'activité' : l'activité réelle n'est que la part visible de ce que fait le sujet ; le réel de l'activité est un champ infiniment plus vaste qui englobe tout ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir (les fameux résidus — drame de l'échec), l'activité empêchée, contrariée, suspendue et refoulée.",
            auteurs: ["Yves Clot (1999)", "Jacques Leplat", "Lev Vygotski"],
            conceptsCles: ["Réel de l'activité", "Activité empêchée", "Résidus et drames de l'échec"],
          },
          {
            titre: "L'activité comme épreuve subjective conflictuelle",
            contenu:
              "L'activité humaine place le sujet au cœur de dilemmes permanents (soigner vite vs soigner bien). L'opérateur ne reste jamais passif : il se mobilise psychologiquement et corporellement pour surmonter ces conflits. 'Qui veut comprendre les contraintes de l'activité doit se confronter à ses conflits' (Yves Clot). Vygotski soulignait déjà : 'L'homme est plein à chaque minute de possibilités non réalisées'.",
            auteurs: ["Yves Clot", "Lev Vygotski"],
            conceptsCles: ["Épreuve subjective", "Dilemmes de métier", "Mobilisation psychique"],
          },
          {
            titre: "Définition cardinale : Le travail comme arbitrage de dilemmes",
            contenu:
              "Selon la formule officielle projetée au Cnam (slide 9) : 'TRAVAILLER = pouvoir arbitrer entre les prescriptions souvent contradictoires de l'activité et les ressources mobilisables pour agir'. Travailler implique une mobilisation psychique constante pour affirmer sa compétence et sa dignité face à un réel qui résiste, et éviter de subir passivement les contraintes du milieu.",
            auteurs: ["Pr. Christine Lagabrielle", "Jessica Roussan", "Yves Clot"],
            conceptsCles: ["Arbitrage des prescriptions", "Ressources mobilisables", "Préservation de la dignité"],
          },
        ],
      },
      {
        numero: "3",
        titre: "La Catachrèse Ergonomique (Pierre Rabardel) & les Détournements d'Outils",
        points: [
          {
            titre: "Définition et genèse instrumentale",
            contenu:
              "Théorisée par Pierre Rabardel (1995), la catachrèse ergonomique est le détournement par l'opérateur d'un outil, d'un logiciel ou d'un document existant vers un usage non anticipé par les concepteurs ('usage détourné et inventif d'un outil'), pour faire face à une résistance du réel ou compenser une défaillance du prescrit.",
            auteurs: ["Pierre Rabardel (1995)"],
            conceptsCles: ["Catachrèse ergonomique", "Genèse instrumentale", "Détournement d'outils"],
          },
          {
            titre: "L'illustration canonique ferroviaire : Fixer l'esprit en cabine",
            contenu:
              "Exemple d'école présenté par l'enseignante (slide 11) : chez les conducteurs de train, le régulateur automatique de vitesse ne sert pas uniquement à contrôler mécaniquement la vitesse du convoi. L'opérateur s'en sert pour 'fixer son esprit' en cabine, canaliser son attention et prévenir tout vagabondage mental lors de longs trajets monotones. Il s'agit d'une re-création technique et psychique de l'outil au service de la sécurité et de la concentration.",
            auteurs: ["Jessica Roussan", "Pr. Christine Lagabrielle", "Pierre Rabardel"],
            conceptsCles: ["Cas ferroviaire", "Fixer l'esprit", "Re-création technique"],
          },
          {
            titre: "La triple fonction de la catachrèse",
            contenu:
              "La catachrèse n'est pas une faute mais une régulation salutaire à triple détente : 1) Pour l'individu : préserve le pouvoir d'agir et la santé mentale ; 2) Pour le collectif : facilite la coopération et les transmissions ; 3) Pour l'organisation : permet à la production d'avoir lieu en surmontant les bugs du prescrit.",
            auteurs: ["Pierre Rabardel", "Jessica Roussan"],
            conceptsCles: ["Triple fonction", "Pouvoir d'agir", "Régulation salvatrice"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Travail Collectif vs Collectif de Travail, Ressources Génériques & Dispute Professionnelle",
        points: [
          {
            titre: "La rupture conceptuelle majeure",
            contenu:
              "Le travail collectif relève de l'organisation formelle prescrite par l'employeur (organigramme, tâches attribuées, fiches de poste, règles écrites - décrétable). Le collectif de travail est une construction clinique vivante non décrétable, née du partage de valeurs de métier, d'une histoire commune et de règles tacites.",
            auteurs: ["Damien Cru (1988)", "Yves Clot"],
            conceptsCles: ["Travail collectif", "Collectif de travail", "Non-décrétabilité"],
          },
          {
            titre: "Les trois conditions de Damien Cru",
            contenu:
              "Pour qu'un collectif de travail existe et fonctionne, 3 conditions cumulatives sont requises : 1) L'existence de règles de métier débattues ; 2) La reconnaissance réciproque des compétences entre pairs ; 3) Une confiance éprouvée dans l'autre (garantie de suppléance et de secours face au danger).",
            auteurs: ["Damien Cru (1988 / 2014)"],
            conceptsCles: ["Règles de métier", "Reconnaissance des compétences", "Confiance mutuelle"],
          },
          {
            titre: "L'architecture triadique des ressources de l'activité (Miossec & Clot, 2015)",
            contenu:
              "Yvon Miossec et Yves Clot modélisent 3 niveaux de ressources dans l'activité : 1) Ressources impersonnelles (générales) : prescriptions, moyens matériels et organisation officielle ; 2) Ressources transpersonnelles (génériques) : règles de métier non écrites, patrimoine de gestes efficients ('stock générique') ; 3) Ressources personnelles : style et subjectivité de l'opérateur.",
            auteurs: ["Yvon Miossec & Yves Clot (2015)"],
            conceptsCles: ["Ressources impersonnelles", "Ressources transpersonnelles / génériques", "Ressources personnelles"],
          },
          {
            titre: "Les buts génériques : rempart contre la solitude face au travail (Jean-Pierre Darré, 1994)",
            contenu:
              "Le genre professionnel s'intercale entre l'organisation et l'activité individuelle. Afin que chacun ne se trouve pas à « errer tout seul face à l'étendue des bêtises possibles » (Darré, 1994), des buts génériques guident l'arbitrage des dilemmes concrets. Ce n'est pas à l'opérateur isolé de trancher dans son for intérieur ce qui est juste ou injuste, bon ou mauvais, réalisable ou inacceptable.",
            auteurs: ["Jean-Pierre Darré (1994)", "Yvon Miossec & Yves Clot (2015)"],
            conceptsCles: ["Buts génériques", "Éviter d'errer seul", "Stock générique"],
          },
          {
            titre: "La 'Dispute professionnelle' sur le travail bien fait comme opérateur de santé",
            contenu:
              "La qualité du travail au contact du réel est par nature 'définitivement discutable'. La seule bonne pratique est la dispute professionnelle réglée entre connaisseurs. À l'opposé des querelles interpersonnelles, le conflit sur la qualité du travail (Clot & Gollac, 2014) crée le 'sentiment de vivre la même histoire'. Sans ces ressources génériques, les problèmes sont requalifiés à tort en 'problèmes personnels' ou dégénèrent en défenses collectives d'impuissance, de plainte morbide et de soumission (Pascale Molinier, 2010).",
            auteurs: ["Yves Clot", "Michel Gollac", "Pascale Molinier", "Yvon Miossec"],
            conceptsCles: ["Dispute professionnelle", "Travail bien fait", "Défenses collectives morbides"],
          },
          {
            titre: "Le collectif intériorisé : Diapason et clavier intérieur (Vygotski, 2004)",
            contenu:
              "La dispute professionnelle fait passer le collectif à l'intérieur de chaque travailleur où elle se poursuit sous forme de dialogue intérieur : le collectif devient un 'diapason' et un 'clavier collectif' pour jouer sa musique singulière. Vygotski soulignait : 'L'individuel chez l'homme n'est pas le contraire du social mais sa forme supérieure' (2004). Le collectif est dans l'individu tout autant que l'inverse.",
            auteurs: ["Lev Vygotski", "Yves Clot", "Yvon Miossec"],
            conceptsCles: ["Diapason collectif", "Clavier intérieur", "Social forme supérieure de l'individuel"],
          },
          {
            titre: "Faire descendre la hiérarchie au réel : Coopération conflictuelle & CHSCT",
            contenu:
              "Le travail horizontal entre pairs ne suffit pas : un collectif solide acquiert la capacité d'interpeller la ligne hiérarchique pour instaurer une 'coopération conflictuelle' autour des critères du travail bien fait. Il s'agit de faire 'descendre' le management au réel du travail. Cette dynamique revitalise le CHSCT en dépassant la judiciarisation défensive au profit de l'instruction du travail réel (Detchessahar, 2013 ; Miossec & Clot, 2011).",
            auteurs: ["Yvon Miossec & Yves Clot (2011 / 2015)", "Mathieu Detchessahar (2013)"],
            conceptsCles: ["Coopération conflictuelle", "Faire descendre le management au réel", "Revitalisation du CHSCT"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Le Genre Professionnel et le Style (Yves Clot)",
        points: [
          {
            titre: "Le Genre : mémoire collective intériorisée et instrument d'action",
            contenu:
              "Puisant dans Mikhaïl Bakhtine, Yves Clot définit le genre comme la mémoire collective des manières d'agir, de penser et de dire d'un milieu de métier. C'est une ressource psychologique vitale qui évite au sujet d'être seul face à la situation imprévue. Le genre est un instrument pour l'action qui doit être perpétuellement transformé pour ne pas se fossiliser.",
            auteurs: ["Yves Clot (1999)", "Mikhaïl Bakhtine"],
            conceptsCles: ["Genre professionnel", "Mémoire collective", "Instrument de l'action"],
          },
          {
            titre: "Le Style : appropriation singulière, affranchissement et subjectivité",
            contenu:
              "Le style est la marque singulière par laquelle chaque professionnel s'approprie le genre, le transforme et s'en affranchit. 'Le style c'est aussi la distance qu'un professionnel interpose entre son action et sa propre histoire' (slide 15). Alors que le genre est l'instrument de l'action, le style remplit une fonction sociale et subjective essentielle.",
            auteurs: ["Yves Clot (1999)"],
            conceptsCles: ["Style personnel", "Distance réflexive", "Fonction subjective"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Études Cliniques de Terrain : Hôpital, École & Entreprise",
        points: [
          {
            titre: "Transmissions infirmières à l'hôpital",
            contenu:
              "Le passage de relais entre équipe de jour et équipe de nuit ne consiste pas à lire un dossier médical, mais à échanger des signaux faibles et des impressions cliniques invisibles. Supprimer ce temps de chevauchement détruit le collectif et génère des erreurs médicales.",
            auteurs: ["Jessica Roussan"],
            conceptsCles: ["Transmissions hospitalières", "Signaux faibles", "Temps de chevauchement"],
          },
          {
            titre: "Enseignants et régulation sans hiérarchie directe",
            contenu:
              "Les directeurs d'école n'ayant pas d'autorité hiérarchique sur leurs collègues enseignants, la gestion des incidents scolaires repose entièrement sur le genre professionnel partagé en salle des maîtres. La perte de cet espace collectif isole le professeur.",
            auteurs: ["Jessica Roussan"],
            conceptsCles: ["Milieu scolaire", "Autorité statutaire", "Solitude enseignante"],
          },
          {
            titre: "Posture déontologique face à un commanditaire agressif",
            contenu:
              "Face à un dirigeant menaçant, la clinicienne s'adosse au genre professionnel des psychologues du travail pour tenir sa position sans céder à la peur : le genre collectif sert d'armure protectrice au sujet isolé.",
            auteurs: ["Jessica Roussan"],
            conceptsCles: ["Commanditaire hostile", "Posture clinique", "Armure déontologique"],
          },
        ],
      },
      {
        numero: "7",
        titre: "Le Métier et l'Élaboration Réflexive de l'Expérience (Vygotski & Clot)",
        points: [
          {
            titre: "L'expérience comme objet pour d'autres expériences (Vygotski)",
            contenu:
              "« Avoir connaissance de ses expériences vécues n'est rien d'autre que de les avoir à sa disposition à titre d'objet pour faire d'autres expériences » (Lev Vygotski, 2004 ; slide 16). Cet 'objet expérience' ne se construit pas spontanément : il requiert une démarche réflexive du sujet sur le vécu de ses dilemmes, englobant les activités réalisées mais aussi les activités empêchées, contrariées et mises en souffrance.",
            auteurs: ["Lev Vygotski (2004)", "Yves Clot"],
            conceptsCles: ["Objet expérience", "Démarche réflexive", "Expérience des dilemmes"],
          },
          {
            titre: "Le siège des contradictions vitales et le travail de subjectivisation",
            contenu:
              "« L'expérience constitue ainsi le siège des contradictions vitales auxquelles le sujet cherche à donner une signification » (Yves Clot). L'enjeu de l'élaboration de l'expérience est de s'engager dans un travail de subjectivisation qui permet au travailleur de dénouer certaines contradictions et de se déprendre de ce qui ampute son pouvoir d'agir.",
            auteurs: ["Yves Clot", "Jessica Roussan"],
            conceptsCles: ["Contradictions vitales", "Subjectivisation", "Restauration du pouvoir d'agir"],
          },
          {
            titre: "Développer le pouvoir d'agir sur soi et sur le milieu",
            contenu:
              "Le développement du pouvoir d'agir sur le travail et sur soi s'étaye sur la dynamique articulant ressources individuelles, collectives et organisationnelles. Les méthodologies cliniques d'intervention doivent contribuer au développement du pouvoir d'agir individuel et collectif en soutenant cette démarche réflexive (slide 17).",
            auteurs: ["Pr. Christine Lagabrielle", "Jessica Roussan", "Yves Clot"],
            conceptsCles: ["Pouvoir d'agir sur soi et sur l'action", "Démarche réflexive", "Intervention clinique"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Le Travail Collectif (Prescrit) face au Collectif de Travail (Clinique Réelle)",
        colonnes: ["Axe de comparaison", "Travail Collectif (Prescrit / Formel)", "Collectif de Travail (Clinique Réelle)"],
        lignes: [
          {
            axe: "Origine",
            valeurs: ["Décrétable par l'employeur (note de service, organigramme)", "Non décrétable ; construit par les pairs dans la durée"],
          },
          {
            axe: "Régulation",
            valeurs: ["Procédures écrites, fiches de poste, plannings", "Règles de métier tacites, délibération vivante entre pairs"],
          },
          {
            axe: "Liant social",
            valeurs: ["Lien de subordination juridique contractuel", "Confiance mutuelle, reconnaissance des compétences, solidarité"],
          },
          {
            axe: "Conflits",
            valeurs: ["Considérés comme des dysfonctionnements à réprimer", "Moteur de vitalité ('dispute professionnelle' sur le travail bien fait)"],
          },
          {
            axe: "Impact santé",
            valeurs: ["S'il est rigide, il isole sous la pression du chiffre", "Opérateur central de santé mentale et de pouvoir d'agir"],
          },
        ],
      },
      {
        titre: "Tableau 2 — Le Genre Professionnel vs le Style Personnel (Yves Clot)",
        colonnes: ["Dimension", "Le Genre Professionnel (Collectif)", "Le Style Personnel (Individuel)"],
        lignes: [
          {
            axe: "Échelle",
            valeurs: ["Mémoire collective d'une communauté de métier", "Appropriation singulière par l'opérateur unique"],
          },
          {
            axe: "Rôle psychique",
            valeurs: ["Ressource intériorisée évitant la solitude face à l'imprévu", "Expression de la subjectivité vivante et liberté créatrice"],
          },
          {
            axe: "Dynamique",
            valeurs: ["Transmis aux novices et enrichi par les réussites stylistiques", "S'appuie sur le genre comme tremplin pour faire face au réel"],
          },
        ],
      },
      {
        titre: "Tableau 3 — L'Architecture Triadique des Ressources de l'Activité (Miossec & Clot, 2015)",
        colonnes: ["Niveau de Ressource", "Instance & Statut", "Contenu Concret", "Fonction Psychosociale", "Risque Majeur si Défaillance"],
        lignes: [
          {
            axe: "Ressources Impersonnelles (Générales)",
            valeurs: [
              "Organisationnelle / Formelle",
              "Prescriptions officielles, fiches de poste, progiciels, référentiels écrits, organigrammes",
              "Définit les objectifs de production et alloue les moyens formels de travail",
              "Tyrannie gestionnaire, déconnexion du réel et prescription de 'bonnes pratiques' inopérantes",
            ],
          },
          {
            axe: "Ressources Transpersonnelles (Génériques)",
            valeurs: [
              "Clinique / Métier vivant",
              "Genre professionnel, règles vivantes non écrites, stock générique d'arbitrages de métier",
              "S'interpose en buts génériques pour éviter d'« errer seul face aux bêtises » (Darré 1994) ; opérateur de santé",
              "Face-à-face solitaire individu/organisation, requalification en fautes personnelles et défenses morbides (Molinier)",
            ],
          },
          {
            axe: "Ressources Personnelles (Singulières)",
            valeurs: [
              "Subjective / Intime",
              "Style singulier, histoire propre, métis, intelligence corporelle et réappropriation réflexive",
              "Permet au sujet de s'affranchir du genre et d'exercer sa liberté créatrice face aux aléas inédits",
              "Culpabilité solitaire, impuissance apprise, burn-out et amputation du pouvoir d'agir",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais confondre Travail Collectif et Collectif de Travail",
        erreurCourante: "Affirmer qu'une équipe regroupée par la direction constitue automatiquement un collectif de travail.",
        rectificationAttendue:
          "Le travail collectif est l'organisation formelle prescrite par la direction (décrétable). Le collectif de travail est une entité psychosociale vivante non décrétable, reposant sur les 3 conditions de Damien Cru : 1) Règles de métier débattues ; 2) Reconnaissance des compétences ; 3) Confiance éprouvée.",
        contexte: "Critique des dogmes managériaux de 'team-building' artificiel.",
      },
      {
        titre: "La Catachrèse n'est pas une faute professionnelle",
        erreurCourante: "Qualifier le détournement d'un logiciel ou d'un outil d'indiscipline ou d'erreur de l'opérateur.",
        rectificationAttendue:
          "La catachrèse (Pierre Rabardel) est une genèse instrumentale salvatrice. Elle permet à l'opérateur de rendre le travail possible face à un outil prescrit inadapté, préservant son pouvoir d'agir et assurant la survie productive de l'organisation (ex: le conducteur de train fixant son esprit avec le régulateur de vitesse).",
        contexte: "Analyse des outils informatiques et des progiciels rigides dans les services.",
      },
      {
        titre: "Le Réel de l'Activité dépasse largement ce qui s'observe",
        erreurCourante: "Réduire l'analyse clinique de l'activité à l'observation des gestes réalisés sur le poste.",
        rectificationAttendue:
          "Comme le théorise Yves Clot (1999), le réel de l'activité englobe aussi ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir (les drames du bord du travail, les résidus), l'empêché, le contrarié et le refoulé. Ce non-réalisé pèse lourdement sur la santé psychique.",
        contexte: "Clinique de l'activité vs ergonomie comportementale classique.",
      },
      {
        titre: "Les règles de métier ne sont pas les règles officielles de l'entreprise",
        erreurCourante: "Confondre les règles de métier avec le règlement intérieur ou les procédures de sécurité écrites.",
        rectificationAttendue:
          "Les règles de métier (Damien Cru) sont tacites, informelles mais instituées par la communauté des pairs. Elles définissent les critères du travail bien fait et les arbitrages face au danger, se transmettant par la délibération et la 'dispute professionnelle'.",
        contexte: "Différence fondamentale entre prescription descendante et métier vivant.",
      },
      {
        titre: "Un collectif de travail vivant n'est pas un consensus silencieux sans conflit",
        erreurCourante: "Penser qu'un collectif sain est caractérisé par l'absence totale de désaccord ou une harmonie béate.",
        rectificationAttendue:
          "Au Cnam, la qualité du travail est par nature définitivement discutable (Miossec & Clot, 2015). Le déni du conflit est pathogène : la seule saine pratique est la 'dispute professionnelle' réglée entre pairs sur les critères du travail bien fait. Ce conflit sur l'objet du travail (et non sur les personnes) est le ciment du 'sentiment de vivre la même histoire'.",
        contexte: "Clinique de l'activité et sociologie des relations professionnelles.",
      },
      {
        titre: "L'écoute individuelle et le développement personnel ne résolvent pas la souffrance au travail",
        erreurCourante: "Proposer du coaching individuel ou de la méditation pour traiter l'épuisement des professionnels.",
        rectificationAttendue:
          "Renvoyer le travailleur en détresse à son for intérieur aggrave son isolement face à une organisation anonyme (Stevens, 2011 ; Miossec & Clot, 2015). La souffrance provient de l'activité empêchée et de l'affaiblissement des ressources génériques. L'intervention clinique vise à restaurer le pouvoir d'agir collectif et la controverse réglée avec la hiérarchie.",
        contexte: "Critique de la psychologisation et de l'individualisation des RPS.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage et posture clinique de la praticienne]
[00:01:36] JESSICA ROUSSAN : « Moi je suis Jessica Roussan, je suis psychologue du travail praticienne depuis 2005, donc un peu plus de 20 ans, spécialisée en psychologie du travail et en clinique du travail. Je combine cette activité à des activités d'enseignement. J'ai été une douzaine d'années consultante en cabinet RH sur Bordeaux et Bayonne, où j'ai démarré sur des bilans de compétences et de l'accompagnement collectif, puis très vite auprès d'un public soignant à l'hôpital. »
[00:02:53] JESSICA ROUSSAN : « Dans le contexte de l'hôpital, ça s'appelait le projet Hôpital 2007, la réorganisation en pôle de soins. Ça a très vite aiguisé mon appétence sur les questions de santé au travail, de souffrance au travail et de modèles organisationnels, des liens complexes entre organisation et santé. Depuis plus de huit ans, je suis en activité libérale en consultation thérapeutique et en service de santé au travail en médecine de prévention. »

[2. L'Activité réelle, le réel de l'activité et l'épreuve subjective]
[00:10:50] JESSICA ROUSSAN : « Yves Clot dit : 'Le métier est dans le sujet et le collectif est dans l'individu tout autant que l'inverse.' C'est-à-dire que le collectif vit dans la tête de chaque travailleur, même lorsqu'il est seul dans son bureau ou sur son poste. »
[00:13:30] JESSICA ROUSSAN : « Le réel de l'activité, c'est ce qui se fait, mais c'est aussi ce qui ne se fait pas, ce qui n'a pas pu se faire, ce qu'on a cherché à faire sans y parvenir. Yves Clot appelle cela les drames du bord du travail. L'activité réelle, c'est ce que l'individu fait réellement ; le réel de l'activité, c'est un ensemble beaucoup plus vaste qui comprend l'activité empêchée, l'activité suspendue et les dilemmes du travail. »
[00:15:20] JESSICA ROUSSAN : « Yves Clot nous dit : 'Qui veut comprendre les contraintes de l'activité doit se confronter à ces conflits.' L'activité n'est pas un déroulé passif, c'est une épreuve subjective qui place le sujet en tension permanente pour trouver des compromis opératoires. »

[3. La Catachrèse ergonomique et le détournement d'outils]
[00:33:20] JESSICA ROUSSAN : « La catachrèse, c'est l'utilisation d'un instrument, d'un outil, d'un logiciel ou d'un document qui existe déjà pour un usage différent de celui qui était prévu initialement par ses concepteurs. Ce détournement permet de rendre le travail possible face à des outils inadaptés. »
[00:35:40] JESSICA ROUSSAN : « Dans le travail administratif, combien d'outils numériques sont détournés ? Les logiciels utilisés par les agents d'accueil obligent à créer des post-it, des cahiers parallèles ou des classeurs pour retenir ce que la machine efface. La catachrèse remplit trois fonctions : pour l'individu (garder son pouvoir d'agir), pour le collectif (faciliter l'entraide) et pour l'organisation (sauver la production). Pensez aussi aux conducteurs de train qui utilisent le limiteur de vitesse pour fixer leur esprit et conjurer l'hypovigilance ! »

[4. Travail collectif vs Collectif de travail et les 3 conditions de Damien Cru]
[01:21:00] JESSICA ROUSSAN : « Le travail collectif, c'est l'organisation formelle : une équipe, une distribution de tâches prescrites, des règles écrites, un organigramme. C'est décrétable par la direction. Mais le collectif de travail, lui, ne se décrète jamais ! »
[01:22:15] JESSICA ROUSSAN : « Damien Cru nous rappelle les trois conditions obligatoires pour qu'il y ait un véritable collectif de travail : un, l'existence de règles de métier débattues ; deux, la reconnaissance réciproque des compétences entre pairs ; trois, une confiance éprouvée dans l'autre. »
[01:23:40] JESSICA ROUSSAN : « Damien Cru nous dit : 'Apprendre le métier, ça ne se réduit pas à apprendre les gestes professionnels ; il faut également intérioriser des règles communes de métier.' C'est ce qui permet au travailleur de se sentir légitimé et protégé par ses pairs face au danger et aux exigences de la direction. »

[5. Le Genre professionnel et le Style (Yves Clot)]
[02:40:10] JESSICA ROUSSAN : « Le genre professionnel, c'est cette mémoire collective intériorisée des manières d'agir, de penser et de dire qui conduit les professionnels à se reconnaître comme exerçant le même métier. C'est un répertoire convenu d'actes et d'évaluations partagées. »
[02:42:00] JESSICA ROUSSAN : « Quand je me suis retrouvée face à ce commanditaire d'entreprise agressif et menaçant, je savais ce que mes collègues psychologues auraient fait à ma place. J'avais dans ma tête le stock de façons de faire du genre professionnel. C'est une ressource vitale : on ne se sent plus seule face à l'aléa. »
[02:45:20] JESSICA ROUSSAN : « Et le style professionnel, c'est la façon dont chaque individu s'approprie le genre, le personnalise et le transforme pour faire face à la situation réelle inédite. »

[6. La dispute professionnelle, les ressources génériques et le réel du travail]
[02:48:15] JESSICA ROUSSAN : « Miossec et Clot ont magnifiquement résumé les choses : le collectif n'est pas un îlot d'harmonie douceâtre. Ce qui soude les professionnels, c'est la dispute professionnelle sur les critères du travail bien fait. C'est quand on s'engueule sainement sur la qualité de l'ouvrage que l'on construit le sentiment de vivre la même histoire ! »
[02:51:30] JESSICA ROUSSAN : « Et pour éviter que le salarié n'erre tout seul face à l'étendue des bêtises possibles, comme disait le sociologue Jean-Pierre Darré, le collectif met à sa disposition des buts génériques partagés. Le travail du psychologue et du collectif, c'est aussi de faire descendre le management au niveau du réel du travail, par une coopération conflictuelle constructive au lieu de laisser les collègues isolés craquer en silence. »`,
    bibliographieCitee: [
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999",
        remarque: "Ouvrage fondateur de la clinique de l'activité conceptualisant le réel de l'activité, le genre et le style professionnel.",
      },
      {
        titre: "Travail et pouvoir d'agir",
        auteur: "Yves Clot",
        annee: "2008",
        remarque: "Approfondissement des concepts de catachrèse, d'activité contrariée et de développement du pouvoir d'agir.",
      },
      {
        titre: "Le collectif de travail : entre fragilité et ressource",
        auteur: "Yvon Miossec & Yves Clot",
        annee: "2015",
        remarque: "Chapitre princeps in 'Les risques du travail' (La Découverte) théorisant les ressources impersonnelles, génériques et personnelles, la dispute professionnelle et la coopération conflictuelle avec la hiérarchie.",
      },
      {
        titre: "Clinique de l'activité et psychologie du travail — Les concepts : Activité, sujet et collectif de travail",
        auteur: "Pr. Christine Lagabrielle & Jessica Roussan",
        annee: "2026",
        remarque: "Diaporama officiel de référence au Cnam (17 diapositives) : définition du travail comme arbitrage de prescriptions, cas ferroviaire de la catachrèse et élaboration de l'expérience.",
      },
      {
        titre: "Le travail à cœur : Pour en finir avec les risques psychosociaux",
        auteur: "Yves Clot",
        annee: "2010",
        remarque: "Démonstration du rôle de la qualité empêchée et du travail soigné dans la genèse de la souffrance au travail.",
      },
      {
        titre: "Les règles du métier (Plaisir et souffrance dans le travail)",
        auteur: "Damien Cru",
        annee: "1988",
        remarque: "Texte princeps sur les 3 conditions du collectif de travail, la confiance et les règles de métier informelles.",
      },
      {
        titre: "Collectif et règles de métier",
        auteur: "Damien Cru",
        annee: "2014",
        remarque: "Conférence de référence au Cnam explicitant la transmission et la dispute professionnelle autour des règles de métier.",
      },
      {
        titre: "Les hommes et les technologies : Approche cognitive des instruments contemporains",
        auteur: "Pierre Rabardel",
        annee: "1995",
        remarque: "Théorisation de l'approche instrumentale, de la genèse instrumentale et de la catachrèse ergonomique.",
      },
      {
        titre: "Le mouvement des normes, avec Bakhtine et quelques agriculteurs",
        auteur: "Jean-Pierre Darré",
        annee: "1994",
        remarque: "Formulation canonique sur le rôle protecteur des normes de pairs : éviter d'« errer tout seul face à l'étendue des bêtises possibles ».",
      },
      {
        titre: "Psychologie concrète de l'homme",
        auteur: "Lev Vygotski",
        annee: "2004",
        remarque: "Fondement historico-culturel : 'L'individuel chez l'homme n'est pas le contraire du social mais sa forme supérieure' et l'expérience comme objet pour d'autres expériences.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST106 — COURS 5 : LES FONDEMENTS THÉORIQUES DE LA CLINIQUE DE L'ACTIVITÉ
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s5",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 5,
    titre: "Séance 5 — Les Fondements Théoriques de la Clinique de l'Activité : De l'École Russe à Canguilhem",
    sousTitre: "Théorie historico-culturelle (Vygotski, Léontiev), système d'activité (Engeström), dialogisme (Bakhtine, Boutet), normativité (Canguilhem) et « Du bien-être au bien-faire » (Clot)",
    enseignant: "Pr. Christine LAGABRIELLE (Professeure des universités, Cnam / Bordeaux)",
    dateSeance: "5 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 06 min 14 s (Classe virtuelle BigBlueButton)",
    resumeExecutif: [
      "Contexte d'émergence de la clinique de l'activité (années 1990) : En réponse aux dérives de l'évaluation individualisée, de la flexibilisation managériale, du flux tendu et des restructurations successives. Yves Clot dialogue avec Loïc Lerouge (droit de la santé au travail, CNRS Bordeaux, santé en PME). L'école clinique est collective : Yvon Miossec, Dominique Lhuilier (santé et clinique médicale).",
      "Filiation russe historico-culturelle (Lev Vygotski, Alexeï Léontiev, Alexandre Luria) : Alternative marxiste au béhaviorisme pavlovien. La pensée et le langage se construisent par les interactions sociales et la culture. Transposition de la Zone Proximale de Développement (ZPD) au travail : 'Ce que le sujet fait aujourd'hui en coopérant avec autrui, il le fera seul demain'. Le sujet au travail fait davantage lorsqu'il s'adosse à un collectif.",
      "La Théorie de l'Activité d'Alexeï Léontiev : Toute activité humaine repose sur deux plans (matériel/concret et idéal/psychologique) et s'articule en trois niveaux emboîtés : 1) L'Activité globale orientée par le motif (besoin) ; 2) L'Action orientée par le but conscient (goal) ; 3) Les Opérations subordonnées aux conditions matérielles d'exécution.",
      "L'Approche Systémique d'Yrjö Engeström : Dépassement du triangle vygotskien initial (Sujet-Outil-Objet). Engeström modélise le système d'activité étendu en y intégrant les Règles (protocoles, HAS), la Communauté (pairs, équipe, collectif) et la Division du travail (hiérarchie, rôles). Illustration par l'acte soignant de l'infirmière réalisant un pansement.",
      "L'Apport Linguistique et Littéraire (Mikhaïl Bakhtine & Josiane Boutet) : Bakhtine démontre la polyphonie et le dialogisme : tout énoncé est le maillon d'une chaîne ininterrompue de paroles antérieures, orienté vers un destinataire. 'La vérité ne se trouve pas dans l'esprit d'un individu isolé, elle naît entre ceux qui la recherchent collectivement'. Josiane Boutet souligne que le travail est une 'formation langagière lacunaire' manquant de mots ordinaires de l'intime pour exprimer la souffrance corporelle.",
      "La Définition Normative de la Santé (Georges Canguilhem & François Tosquelles) : Canguilhem (Le normal et le pathologique) réfute la santé comme simple absence de maladie ou norme statistique. La santé est 'normativité' : la capacité du sujet à poser de nouvelles normes de vie face aux épreuves et à agir sur son milieu. Quand ce pouvoir d'agir est durablement confisqué, la maladie naît. Tosquelles (psychothérapie institutionnelle) : centralité du travail pour soigner, 'pour soigner les malades, il faut d'abord soigner l'institution'.",
      "Le Réel de l'Activité selon Yves Clot : 'Le réalisé n'a pas le monopole du réel'. L'action accomplie n'est que l'actualisation d'une action parmi toutes celles qui ont été écartées ou refoulées par conflit de critères. Le réel comprend ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir (le drame des échecs), et ce qu'on fait pour ne pas faire ce qui est à faire.",
      "« Du Bien-Être au Bien-Faire » & la Dispute Professionnelle : La souffrance apparaît lorsque le travailleur ne peut plus réaliser un travail soigné selon les règles de son art : l'activité se retourne alors contre lui. Rôle thérapeutique de la clinique : transformer les conflits étouffés en controverse professionnelle sur le travail bien fait. Formule cardinale de Clot : 'Si les conflits de travail ne sont pas disputés sur le travail bien fait, ils se transforment inévitablement en conflits de personnes'.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Option A (Dissertation) ou Option B (Analyse clinique de situation)",
      optionsAuChoix: [
        "Option 1 : Dissertation théorique rédigée (mobiliser les filiations conceptuelles : Vygotski/Léontiev pour l'activité, Bakhtine pour le dialogisme, Canguilhem pour la normativité, et Clot pour le réel de l'activité et le bien-faire).",
        "Option 2 : Analyse clinique de situation (mobiliser le triangle d'activité étendu d'Engeström pour cartographier les tensions entre règles, communauté, division du travail et outils).",
      ],
      recommandationsNotation:
        "Pr. Christine Lagabrielle exige une rigueur conceptuelle sans faille : ne jamais confondre normalité statistique et normativité canguilhémienne, savoir distinguer les 3 niveaux de Léontiev (activité, action, opération), et mobiliser la formule 'les conflits non disputés sur le travail se muent en conflits de personnes'.",
    },
    consignesOralesProf: [
      {
        titre: "Fin de la partie historique magistrale & Relais des Ateliers Cliniques",
        typeTravail: "exercice_ad",
        consigneExacte:
          "La partie de cours magistral retraçant l'histoire de la psychologie du travail et l'émergence des concepts est officiellement terminée. Jessica Roussan prend le relais sur les séances en sous-groupes (dès demain vendredi 6 novembre en distant) pour travailler sur vos situations cliniques concrètes et anonymisées.",
        echeance: "Vendredi 6 novembre 2026 & Jeudi 12 novembre 2026",
        modaliteRendu: "Participation active aux ateliers interactifs en sous-groupes virtuels (non enregistrés pour confidentialité).",
        recommandationsProf:
          "Relire attentivement les concepts d'activité réelle, de catachrèse et de règles de métier abordés au Cours 4 avant d'entrer en sous-groupe.",
      },
      {
        titre: "Séance Présentielle au Cnam Bordeaux (Samedi 28 novembre 2026 à 14h00)",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Regroupement en présentiel au centre Cnam de Bordeaux (groupe 1 à 14h00 le 28 novembre) consacré à la santé au travail en clinique de l'activité, mis en perspective avec les autres modèles théoriques et l'analyse de cas concrets.",
        echeance: "Samedi 28 novembre 2026 (14h00)",
        modaliteRendu: "Présence obligatoire et étude de dossiers cliniques sur table.",
        recommandationsProf:
          "Préparer vos questions sur les articulations entre ergonomie, psychodynamique de Dejours et clinique de l'activité de Clot.",
      },
      {
        titre: "Lectures et Ressources Recommandées par l'Enseignante",
        typeTravail: "lecture",
        consigneExacte:
          "Visionner la conférence filmée d'Yves Clot interrogé par Loïc Lerouge à la librairie Mollat (Bordeaux) sur la santé au travail et les PME. Se référer aux pages 23 et 26 de l'ouvrage collectif 'Psychologie du travail et des organisations en 40 fiches visuelles' (Dunod).",
        echeance: "Avant les regroupements de décembre",
        modaliteRendu: "Assimilation personnelle pour étayer les dissertations.",
        recommandationsProf:
          "Noter la coquille signalée par un auditeur page 10 du manuel Dunod : Wilhelm Wundt a fondé son laboratoire de psychologie expérimentale à Leipzig en 1879 (et non 1979).",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Contexte d'Émergence & Filiations de la Clinique de l'Activité (Années 1990)",
        points: [
          {
            titre: "Les mutations néomanagériales comme terreau de la clinique",
            contenu:
              "La clinique de l'activité théorisée par Yves Clot émerge dans les années 1990 pour répondre aux transformations brutales du travail : individualisation de l'évaluation, flexibilisation à outrance, gestion en flux tendu, restructurations permanentes et montée d'une insécurité d'emploi objective et subjective, engendrant une explosion de la souffrance psychique.",
            auteurs: ["Yves Clot", "Pr. Christine Lagabrielle"],
            conceptsCles: ["Mutations du travail", "Flux tendu", "Individualisation de l'évaluation"],
          },
          {
            titre: "Une communauté scientifique collective",
            contenu:
              "La clinique de l'activité ne se résume pas à Yves Clot : elle s'est construite avec de nombreux chercheurs et praticiens, dont Yvon Miossec (maître de conférences au Cnam), Dominique Lhuilier (professeure émérite au Cnam, spécialiste de la santé et du travail thérapeutique), et en dialogue interdisciplinaire avec des juristes comme Loïc Lerouge (CNRS Bordeaux, santé au travail dans les PME).",
            auteurs: ["Yves Clot", "Yvon Miossec", "Dominique Lhuilier", "Loïc Lerouge"],
            conceptsCles: ["Collectif de recherche Cnam", "Interdisciplinarité droit/psychologie"],
          },
        ],
      },
      {
        numero: "2",
        titre: "L'École Russe Historico-Culturelle : Vygotski, Léontiev & Luria",
        points: [
          {
            titre: "L'alternative socio-constructiviste au béhaviorisme",
            contenu:
              "Vygotski, Léontiev et Luria ont fondé dans les années 1920 une psychologie historico-culturelle d'inspiration marxiste, en rupture avec le béhaviorisme mécaniste de Pavlov. Pour cette école, le développement humain n'est pas une maturation biologique autonome : il est intrinsèquement social et médiatisé par la culture et le langage.",
            auteurs: ["Lev Vygotski", "Alexeï Léontiev", "Alexandre Luria"],
            conceptsCles: ["Psychologie historico-culturelle", "Médiation sémiotique", "Socio-constructivisme"],
          },
          {
            titre: "La Zone Proximale de Développement (ZPD) transposée au travail",
            contenu:
              "Vygotski formule la ZPD : l'espace entre ce que le sujet sait faire seul et ce qu'il peut accomplir avec l'étayage d'autrui ('Ce que l'enfant fait aujourd'hui en coopération, il le fera seul demain'). Transposé à la clinique du travail par Yves Clot, ce principe fonde la puissance du collectif : le professionnel au travail est capable de surmonter des dilemmes insolubles en solo dès lors qu'il s'adosse à un collectif de métier.",
            auteurs: ["Lev Vygotski", "Yves Clot"],
            conceptsCles: ["Zone Proximale de Développement (ZPD)", "Étayage social", "Collectif émancipateur"],
          },
          {
            titre: "Les 3 niveaux de l'activité selon Alexeï Léontiev",
            contenu:
              "Léontiev pose que l'activité repose sur deux plans (matériel/concret et idéal/psychologique) et structure l'agir humain en 3 niveaux hiérarchiques emboîtés : 1) L'Activité globale orientée par un motif/besoin sociétal ; 2) L'Action orientée par un but conscient (goal) ; 3) Les Opérations automatisées adaptées aux conditions matérielles de la situation (Paul Olry, 2019).",
            auteurs: ["Alexeï Léontiev", "Paul Olry (2019)"],
            conceptsCles: ["Activité / Motif", "Action / But", "Opération / Conditions"],
          },
        ],
      },
      {
        numero: "3",
        titre: "L'Approche Systémique : Le Modèle du Système d'Activité d'Yrjö Engeström",
        points: [
          {
            titre: "Dépassement du triangle vygotskien",
            contenu:
              "Le triangle initial de Vygotski reliait Sujet, Outil et Objet. Le psychologue finlandais Yrjö Engeström (théorie de l'activité de 3e génération) démontre qu'aucune activité n'est purement individuelle. Toute activité est un système social distribué intégrant les Règles, la Communauté et la Division du travail.",
            auteurs: ["Yrjö Engeström"],
            conceptsCles: ["Système d'activité", "Théorie de l'activité étendue", "Dimension communautaire"],
          },
          {
            titre: "L'illustration clinique de l'infirmière hospitalière",
            contenu:
              "Exemple analysé par Pr. Lagabrielle : une infirmière (Sujet) réalise un pansement (Objet/Visée) pour soigner une plaie. Elle mobilise des compresses et antiseptiques (Outils matériels) ainsi qu'un protocole de soins et un dossier patient (Outils symboliques). Son activité est cadrée par les recommandations de la HAS et l'éthique du service (Règles), s'exécute avec l'aide-soignante sous prescription médicale (Division du travail/Hiérarchie), au sein d'une équipe soudée partageant respect du patient et empathie (Communauté).",
            auteurs: ["Pr. Christine Lagabrielle", "Yrjö Engeström"],
            conceptsCles: ["Cas soignant", "Outils matériels vs symboliques", "Division du travail vs Communauté"],
          },
        ],
      },
      {
        numero: "4",
        titre: "L'Apport Linguistique & Littéraire : Mikhaïl Bakhtine & Josiane Boutet",
        points: [
          {
            titre: "Polyphonie et dialogisme chez Mikhaïl Bakhtine",
            contenu:
              "Théoricien de la littérature, Bakhtine démontre que la parole humaine n'est jamais première : tout discours est habité par d'autres voix (polyphonie) et s'inscrit dans un dialogue ininterrompu où chaque énoncé répond à un énoncé antérieur (dialogisme). 'La vérité ne se trouve pas dans l'esprit d'un individu isolé : elle naît entre des personnes qui la recherchent collectivement' (1977). Yves Clot applique cette idée au métier : le geste professionnel est habité par les gestes des prédécesseurs.",
            auteurs: ["Mikhaïl Bakhtine", "Yves Clot"],
            conceptsCles: ["Polyphonie", "Dialogisme", "Chaîne des actes de parole"],
          },
          {
            titre: "Le travail comme 'formation langagière lacunaire' (Josiane Boutet)",
            contenu:
              "La linguiste Josiane Boutet (réseau Langage et Travail) souligne le paradoxe du travail : alors que la sexualité, la famille ou l'école disposent d'un riche lexique ordinaire, le travail ne génère que des discours experts (ergonome, ingénieur, médecin). Le travailleur ordinaire souffre d'un manque de mots pour dire l'intime de son activité, la souffrance corporelle de la chaleur ou la douleur gestuelle, rendant cruciale la création d'espaces cliniques de mise en mots.",
            auteurs: ["Josiane Boutet", "Pr. Christine Lagabrielle"],
            conceptsCles: ["Formation langagière lacunaire", "Difficulté de dire le travail", "Discours de l'intime"],
          },
        ],
      },
      {
        numero: "5",
        titre: "La Définition Clinique de la Santé : Georges Canguilhem & François Tosquelles",
        points: [
          {
            titre: "La santé comme normativité selon Georges Canguilhem",
            contenu:
              "Dans 'Le normal et le pathologique' (1966), Canguilhem révolutionne la médecine : la santé n'est pas l'absence quantitative de symptômes (norme de laboratoire). La santé est 'normativité' : la capacité dynamique du sujet à instituer de nouvelles normes de vie face aux épreuves et à agir sur son milieu pour le transformer. Se sentir en santé, c'est se sentir 'plus que normal'. Quand ce pouvoir d'agir sur le milieu est confisqué, la maladie s'installe.",
            auteurs: ["Georges Canguilhem", "Christophe Dejours"],
            conceptsCles: ["Normativité vs Normalité", "Capacité d'instituer de nouvelles normes", "Pouvoir d'agir confisqué"],
          },
          {
            titre: "La psychothérapie institutionnelle de François Tosquelles",
            contenu:
              "Psychiatre catalan réfugié à Saint-Alban, Tosquelles place l'activité concrète de travail au centre du soin psychique (Le travail thérapeutique en psychiatrie, réédité par Yves Clot). Le travail est un lien vital avec le monde réel luttant contre l'effondrement psychotique. Thèse canonique : 'Pour soigner les malades, il faut d'abord soigner l'institution'.",
            auteurs: ["François Tosquelles", "Yves Clot"],
            conceptsCles: ["Psychothérapie institutionnelle", "Centralité de l'activité", "Soigner l'institution"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Le Réel de l'Activité & le Passage « Du Bien-Être au Bien-Faire »",
        points: [
          {
            titre: "Le réalisé n'a pas le monopole du réel (Yves Clot)",
            contenu:
              "Extrait princeps d'Yves Clot commenté par Pr. Lagabrielle : ce qui s'observe à un poste de travail (l'action vainqueur) n'est que l'actualisation d'une possibilité parmi d'autres qui ont été abandonnées ou refoulées. Le réel de l'activité possède un volume invisible : ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir (les drames de l'échec), ce qu'on aurait voulu faire, et ce qu'on fait pour ne pas faire ce qui est prescrit.",
            auteurs: ["Yves Clot", "Pr. Christine Lagabrielle"],
            conceptsCles: ["Le réalisé n'a pas le monopole du réel", "Drame de l'échec", "Volume de l'activité"],
          },
          {
            titre: "Du bien-être au bien-faire : la souffrance du travail empêché",
            contenu:
              "Pr. Christine Lagabrielle formule le basculement fondamental : la souffrance au travail ne naît pas d'une vulnérabilité individuelle, mais d'une rupture du cycle de l'activité. Le travailleur sait ce qu'est un travail soigné selon les critères de son métier ; quand l'organisation l'empêche de le réaliser dans les règles de l'art, l'activité se retourne contre lui et détruit sa santé mentale.",
            auteurs: ["Pr. Christine Lagabrielle", "Yves Clot"],
            conceptsCles: ["Du bien-être au bien-faire", "Activité retournée contre le sujet", "Qualité empêchée"],
          },
          {
            titre: "La dispute professionnelle comme rempart contre les conflits de personnes",
            contenu:
              "La mission de la clinique de l'activité est de restaurer des espaces délibératifs pour réhabiliter la 'dispute professionnelle' au sens noble. Formule d'or de Clot : 'Si les conflits de travail ne sont pas parlés et disputés sur les critères du travail bien fait, alors ces conflits vont inévitablement se transformer en conflits destructeurs de personnes'. Pas de beau travail sans critères de qualité élaborés collectivement avec les pairs.",
            auteurs: ["Yves Clot", "Pr. Christine Lagabrielle"],
            conceptsCles: ["Dispute professionnelle", "Conflit sur le travail vs conflit de personnes", "Règles de l'art"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Les Trois Niveaux de l'Activité selon Alexeï Léontiev (1975)",
        colonnes: ["Niveau d'Analyse", "Orientation Psychologique", "Contenu / Définition", "Exemple Concret au Travail"],
        lignes: [
          {
            axe: "1. L'Activité (Global)",
            valeurs: [
              "Orientée par le Motif (Besoin / Motive)",
              "Niveau le plus large répondant au besoin fondamental du sujet dans son milieu social",
              "Exercer le métier d'infirmière pour soigner les malades et préserver la vie",
            ],
          },
          {
            axe: "2. L'Action (Intermédiaire)",
            valeurs: [
              "Orientée par le But conscient (Goal)",
              "Processus subordonné à un objectif précis représenté consciemment par le travailleur",
              "Réaliser la réfection du pansement de l'escarre d'un patient donné à 10h",
            ],
          },
          {
            axe: "3. L'Opération (Concret)",
            valeurs: [
              "Orientée par les Conditions matérielles (Means)",
              "Manière concrète et automatisée d'exécuter l'action en fonction des outils et contraintes physiques",
              "Manipuler la pince stérile, ouvrir le flacon d'antiseptique d'un geste précis du poignet",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — Les 6 Pôles du Système d'Activité d'Yrjö Engeström (Cas du Pansement Infirmier)",
        colonnes: ["Composante du Système", "Définition Conceptuelle", "Illustration Clinique (Soignant)", "Tension / Risque Éventuel"],
        lignes: [
          {
            axe: "Sujet",
            valeurs: ["L'individu ou le groupe engagé dans l'action", "L'infirmière diplômée d'État en service de chirurgie", "Fatigue, sous-effectif, charge mentale"],
          },
          {
            axe: "Outils (Artefacts)",
            valeurs: ["Médiateurs matériels et symboliques", "Compresses, sets stériles (matériel) + protocole HAS, dossier informatisé (symbolique)", "Pénurie de matériel stérile ou logiciel de traçabilité buggé"],
          },
          {
            axe: "Objet (Visée)",
            valeurs: ["La matière travaillée et le but visé", "La plaie du patient à nettoyer et désinfecter pour favoriser la cicatrisation", "Plaie complexe non anticipée par la prescription"],
          },
          {
            axe: "Règles",
            valeurs: ["Normes explicites et implicites cadrant l'agir", "Règles d'asepsie, recommandations HAS, charte de bientraitance", "Injonction contradictoire entre temps prescrit (5 min) et protocole d'hygiène (15 min)"],
          },
          {
            axe: "Communauté",
            valeurs: ["Les pairs et acteurs partageant le même objet", "L'équipe soignante du service, le patient et sa famille, collègues de jour/nuit", "Isolement si les temps de transmission et d'échange sont supprimés"],
          },
          {
            axe: "Division du travail",
            valeurs: ["Distribution hiérarchique et horizontale des tâches", "Prescription par le médecin chef, relais avec l'aide-soignante, encadrement cadre de santé", "Conflit de prérogatives ou hiérarchie déconnectée du réel"],
          },
        ],
      },
      {
        titre: "Tableau 3 — Conception Biomédicale (Statistique) vs Conception Normative de la Santé (Georges Canguilhem)",
        colonnes: ["Dimension", "Modèle Biomédical / Gestionnaire Classique", "Modèle Clinique Normatif (Canguilhem & Clot)"],
        lignes: [
          {
            axe: "Définition de la santé",
            valeurs: ["Absence de maladie, conformité à une moyenne statistique quantitative (norme de laboratoire)", "Normativité : pouvoir de tomber malade et d'en guérir, capacité à instituer de nouvelles normes de vie"],
          },
          {
            axe: "Statut de la maladie",
            valeurs: ["Anomalie, défaut individuel, écart par rapport à la moyenne à éradiquer", "Forme de vie réduite, rétrécissement du pouvoir d'instituer de nouvelles normes face aux épreuves"],
          },
          {
            axe: "Rapport au milieu de travail",
            valeurs: ["Adaptation passive de l'organisme aux contraintes prescrites par l'organisation", "Capacité active d'agir sur son milieu et de transformer les conditions du travail"],
          },
          {
            axe: "Réponse à la souffrance",
            valeurs: ["Gestion des RPS par du 'bien-être' individuel (coaching, écoute psychologique, méditation)", "Restauration du 'bien-faire' : redonner au sujet le pouvoir d'agir sur l'objet du travail"],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais réduire l'activité au comportement observable ou à l'activité réalisée",
        erreurCourante: "Considérer que l'analyse du travail se résume à filmer ou chronométrer les gestes concrètement effectués à un poste.",
        rectificationAttendue:
          "Pour Yves Clot, 'le réalisé n'a pas le monopole du réel'. L'activité réelle englobe un vaste volume invisible : l'activité empêchée, contrariée, suspendue, les drames du bord du travail (ce qu'on a voulu faire sans y parvenir) et ce qu'on fait pour ne pas faire ce qui est prescrit. Ce non-réalisé est le siège principal de la souffrance.",
        contexte: "Critique du behaviorisme et de l'ergonomie comportementale pure.",
      },
      {
        titre: "La santé n'est pas l'absence de maladie ou une moyenne quantitative",
        erreurCourante: "Définir la santé au travail comme l'absence de troubles musculosquelettiques ou de burn-out déclaré.",
        rectificationAttendue:
          "Selon Georges Canguilhem (Le normal et le pathologique), la santé est une 'normativité' : la capacité active du travailleur à poser de nouvelles normes face aux résistances du réel et à transformer son milieu. Se sentir en santé, c'est se sentir 'plus que normal' ; la pathologie naît quand ce pouvoir d'agir est durablement confisqué.",
        contexte: "Épistémologie de la santé au travail au Cnam.",
      },
      {
        titre: "La souffrance au travail ne relève pas du 'bien-être' mais du 'bien-faire'",
        erreurCourante: "Proposer des séminaires de gestion du stress ou des psychologues d'écoute pour traiter le mal-être des équipes.",
        rectificationAttendue:
          "Pr. Christine Lagabrielle oppose nettement le 'bien-être' superficiel au 'bien-faire' fondamental. La souffrance provient d'une rupture du cycle de l'activité : quand l'organisation empêche les salariés de réaliser un travail de qualité selon les règles de leur art, l'activité se retourne contre le sujet.",
        contexte: "Critique des approches managériales de la QVT et des RPS individualisés.",
      },
      {
        titre: "Les conflits interpersonnels sont le symptôme de conflits de métier refoulés",
        erreurCourante: "Traiter les disputes en équipe comme des problèmes relationnels ou des querelles d'ego à régler par de la médiation RH.",
        rectificationAttendue:
          "Formule d'or d'Yves Clot : 'Quand les conflits de travail ne sont pas parlés et disputés sur le travail bien fait, ils se transforment inévitablement en conflits de personnes'. L'intervention clinique vise à ramener le débat sur l'objet de l'ouvrage (dispute professionnelle réglée) pour désamorcer les rancœurs personnelles.",
        contexte: "Clinique de l'activité vs gestion des conflits RH.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage épistémologique et communauté de la clinique de l'activité]
[00:01:23] PR. CHRISTINE LAGABRIELLE : « Je vous invite à regarder la conférence filmée chez Mollat à Bordeaux, où Yves Clot est interrogé par Loïc Lerouge, chercheur en droit CNRS qui s'intéresse aux questions de santé au travail, notamment dans les PME. La clinique de l'activité, ce n'est pas seulement Yves Clot : il a formé un grand nombre de professionnels devenus des collègues, comme Yvon Miossec qui intervient régulièrement, ou Dominique Lhuilier au Cnam Paris sur la clinique médicale du travail. »
[00:06:11] PR. CHRISTINE LAGABRIELLE : « La clinique de l'activité s'inscrit dans les modifications brutales du travail contemporain : individualisation de l'évaluation, flexibilisation, gestion en flux tendu, restructurations permanentes depuis les années 80, sentiment d'insécurité croissant et augmentation de la souffrance. Tous ces éléments constituent le terreau de cette nouvelle clinique. »

[2. L'École russe : Vygotski, Léontiev et la médiation sociale de l'activité]
[00:11:52] PR. CHRISTINE LAGABRIELLE : « Lev Vygotski, Luria et Léontiev voulaient élaborer une psychologie historico-culturelle d'inspiration marxiste, alternative au béhaviorisme de Pavlov. Le développement du sujet ne relève pas d'une maturation autonome : il passe obligatoirement par les interactions sociales et la culture, le langage étant un outil de médiation. C'est une approche socio-constructiviste. »
[00:14:45] PR. CHRISTINE LAGABRIELLE : « Yves Clot transpose la Zone Proximale de Développement de Vygotski au monde du travail : ce que le sujet peut faire en coopérant aujourd'hui avec autrui, il pourra le faire seul demain. Le sujet au travail peut faire infiniment plus quand il fait partie d'un collectif : c'est une notion clé. »
[00:20:03] PR. CHRISTINE LAGABRIELLE : « Alexeï Léontiev montre que toute activité repose sur deux plans, matériel/concret et idéal/psychologique, et distingue trois niveaux emboîtés : l'activité orientée par le motif global, l'action orientée par un but conscient, et les opérations subordonnées aux conditions concrètes d'exécution. »

[3. Bakhtine, le dialogisme et la pauvreté des mots du travail]
[00:24:26] PR. CHRISTINE LAGABRIELLE : « Mikhaïl Bakhtine démontre que tout discours s'inscrit dans un chaînage de connaissances et qu'il est habité par d'autres voix : c'est la polyphonie et le dialogisme. La vérité ne se trouve pas dans l'esprit d'un individu isolé ; elle naît entre des personnes qui la recherchent collectivement au cours de leur interaction dialogique. »
[00:30:39] PR. CHRISTINE LAGABRIELLE : « Comme le souligne la linguiste Josiane Boutet, les salariés sont confrontés à une formation langagière lacunaire : le travail génère peu de discours de l'intime par rapport à la famille ou à l'école. Comment dire la souffrance de la chaleur ou la douleur corporelle avec les mots de tout le monde ? D'où l'extrême difficulté à formuler la complexité du travail réel. »

[4. Canguilhem, Tosquelles et la santé comme pouvoir d'agir]
[00:36:30] PR. CHRISTINE LAGABRIELLE : « Georges Canguilhem dans Le normal et le pathologique définit la vie comme une activité normative : la capacité de fabriquer de la normalité et de poser de nouvelles normes face aux épreuves. Se sentir en bonne santé, c'est se sentir plus que normal : c'est pouvoir agir sur son milieu. La maladie commence quand ce pouvoir d'agir est durablement confisqué. »
[00:40:13] PR. CHRISTINE LAGABRIELLE : « Chez le psychiatre catalan François Tosquelles, fondateur de la psychothérapie institutionnelle, comme chez Yves Clot, il y a une centralité absolue de l'activité pour lutter contre l'effondrement et créer du lien avec le réel. Tosquelles rappelait : pour soigner les malades, il faut d'abord soigner l'institution. »

[5. Du bien-être au bien-faire et la dispute professionnelle]
[00:51:26] PR. CHRISTINE LAGABRIELLE : « Extrait majeur d'Yves Clot : 'Le réalisé n'a pas le monopole du réel. Ce qui se fait n'est jamais que l'actualisation d'une des actions réalisables... Dans ce que je fais, il y a aussi ce que je n'ai pas pu faire, ce que j'aurais aimé faire, ce qu'on cherche à faire sans y parvenir (le drame des échecs), et ce qu'on fait pour ne pas faire ce qui est à faire.' »
[00:56:27] PR. CHRISTINE LAGABRIELLE : « J'intitule cela : du bien-être au bien-faire. La souffrance au travail apparaît lorsque le cycle de l'activité est rompu. Le travailleur sait ce qu'est un travail de qualité, mais les conditions empêchent de le réaliser dans les règles de l'art. Dès lors, l'activité se retourne contre le sujet et dégrade sa santé au lieu de la développer. »
[00:58:27] PR. CHRISTINE LAGABRIELLE : « Le rôle de la clinique est de restaurer des espaces pour réhabiliter la dispute professionnelle au sens noble. Formule d'or de Clot : 'Si les conflits de travail ne sont pas parlés, ne sont pas discutés, ne sont pas disputés, alors ces conflits vont inévitablement se transformer en conflits de personnes.' »
[00:59:03] PR. CHRISTINE LAGABRIELLE : « Dans notre travail, hélas, ça ne se passe jamais comme on veut : le bois accroche, la machine grippe, le diaporama est incompréhensible, les étudiants ne sont pas intéressés... Pas d'activité de travail sans apport personnel et singularité ; pas de bon et de beau travail sans se reconnaître dans des règles de métier et sans critères de qualité élaborés collectivement avec d'autres gens de métier. »`,
    bibliographieCitee: [
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999",
        remarque: "Ouvrage fondateur de la clinique de l'activité : réel de l'activité, dialogue intérieur, genre et style.",
      },
      {
        titre: "Travail et pouvoir d'agir",
        auteur: "Yves Clot",
        annee: "2008",
        remarque: "Approfondissement de l'activité contrariée, du pouvoir d'agir et de l'architecture des ressources du métier.",
      },
      {
        titre: "Le normal et le pathologique",
        auteur: "Georges Canguilhem",
        annee: "1966",
        remarque: "Théorisation princeps de la santé comme normativité, capacité d'instituer de nouvelles normes et pouvoir d'agir sur le milieu.",
      },
      {
        titre: "Activité, conscience, personnalité",
        auteur: "Alexeï Léontiev",
        annee: "1975",
        remarque: "Modélisation des deux plans de l'activité (matériel et idéal) et des 3 niveaux emboîtés (Activité-Motif, Action-But, Opération-Conditions).",
      },
      {
        titre: "Pensée et langage",
        auteur: "Lev Vygotski",
        annee: "1934",
        remarque: "Théorie historico-culturelle, socio-constructivisme, Zone Proximale de Développement et médiation sémiotique.",
      },
      {
        titre: "Learning by Expanding: An Activity-Theoretical Approach to Developmental Work Research",
        auteur: "Yrjö Engeström",
        annee: "1987",
        remarque: "Théorie de l'activité de 3e génération modélisant le système d'activité (Sujet, Outil, Objet, Règles, Communauté, Division du travail).",
      },
      {
        titre: "Esthétique et théorie du roman",
        auteur: "Mikhaïl Bakhtine",
        annee: "1978",
        remarque: "Théorisation de la polyphonie et du dialogisme : le discours comme réponse à d'autres voix et chaînage d'actes de parole.",
      },
      {
        titre: "La vie au travail : S'entretenir, parler, écrire",
        auteur: "Josiane Boutet",
        annee: "2008",
        remarque: "Démonstration du manque de mots ordinaires pour dire le travail (formation langagière lacunaire) et analyse des interactions de terrain.",
      },
      {
        titre: "Psychologie du travail et des organisations en 40 fiches visuelles",
        auteur: "Marc-Éric Bobillier-Chaumon, Philippe Sarnin, Christine Lagabrielle et al.",
        annee: "2020",
        remarque: "Manuel de référence Cnam (Dunod) : fiches 23 et 26 sur l'évolution historique de l'activité et l'analyse systémique.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST106 — COURS 6 : CLINIQUE DU COLLECTIF, CATACHRÈSE & DÉRIVES DU COACHING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s6",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 6,
    titre: "Séance 6 — Clinique du Collectif, Catachrèse & Dérives de l'Individualisation",
    sousTitre: "Ateliers cliniques d'analyse de cas réels (assistante maternelle, crèche en sous-effectif, Carrefour) et renouvellement du genre professionnel (Caroly & Clot)",
    enseignant: "Mme Jessica ROUSSAN (Maîtresse de conférences / Psychosociologie & Clinique de l'activité, Cnam)",
    dateSeance: "12 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "2 h 08 min (Atelier clinique interactif BigBlueButton)",
    resumeExecutif: [
      "Atelier clinique interactif en sous-groupes (12 nov. 2026) : Animé par Mme Jessica Roussan, cet atelier prolonge le cours magistral théorique du Pr. Lagabrielle. Les auditeurs analysent trois situations réelles de travail vécues et problématisées à la lumière des concepts cardinaux de la clinique de l'activité et de l'ergonomie francophone.",
      "Cas 1 — Maintien en emploi et catachrèse institutionnelle (Karine & Stéphanie) : Situation d'une assistante maternelle handicapée employée par des particuliers (absence de SPST et de médecin du travail). Pour contourner le blocage du dossier AGEFIPH, la professionnelle détourne une 'aide à la recherche de solutions' pour financer l'aménagement de poste. Démonstration de la catachrèse ergonomique (Rabardel, 1995 ; Clot, 1999) et du rôle de la tolérance managériale bienveillante dans la transmission du genre de métier.",
      "Cas 2 — Crèche municipale en crise : Collectif pompier vs Collectif de travail (Céline & Julie) : Crèche en grave pénurie d'effectif (5 agentes pour 3 sections, directrice absente, pool de remplacement saturé). Les professionnelles régulent 'en marchant' (décalage des repas, annulation de réunions, repli sur la sécurité physique). Jessica Roussan théorise la distinction vitale entre 'collectif de crise éphémère' (héroïsme compassionnel, sacrifice individuel conduisant au burn-out) et 'collectif de travail institué' (espaces d'APP, coopération technique et controverse sur le travail bien fait).",
      "Le long cheminement de l'incorporation du genre professionnel : Analyse de la pression subie par la jeune recrue dans la crèche. Le genre ne s'enseigne pas par des fiches de poste écrites ; il s'incorpore lentement par imprégnation et dialogue avec les pairs. Éviter le piège de la culpabilisation du débutant et comprendre que l'accès au 'côté obscur de l'activité' exige une sécurité psychologique instaurée par le collectif.",
      "Cas 3 — Carrefour Approvisionnement Vins : Concurrence interne et critique du coaching (Cécile & Mora) : Service de 10 approvisionneurs soumis à un taux de service irréaliste de 99 % par jour en flux tendu. Concurrence interne destructrice, insultes, turnover massif (2 à 3 ans) et burn-out manager. Dérive managériale du coaching proposant aux salariés de 'devenir auteurs de leur vie'. Réquisitoire sans appel de Mme Roussan : culpabilisation toxique de l'individu face à une pathologie organisationnelle systémique.",
      "Théorisation du genre professionnel selon Florentina Caroly & Yves Clot (2004) : Étude princeps aux guichets de La Poste. Confrontation entre l'agence de province (tolérance hiérarchique, astuces partagées au grand jour, enrichissement du genre) et l'agence de banlieue (surveillance rigide, rétention des ficelles 'sous le manteau', fermeture du collectif et souffrance des novices).",
      "Méthodologie d'intervention et posture du psychologue du travail : Refus catégorique du simple 'groupe de parole cathartique' qui n'offre qu'un soulagement temporaire sans transformer le réel. Nécessité de dispositifs cliniques structurés (instruction au sosie, autoconfrontation croisée) pour instruire des controverses de métier et mobiliser des indicateurs RH objectifs (turnover, absentéisme, alertes CSE). Prochaine étape : séance présentielle au Cnam Bordeaux le samedi 28 novembre 2026 à 14h00.",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Analyse clinique de situation réelle ou dissertation conceptuelle",
      optionsAuChoix: [
        "Option 1 : Analyse clinique de cas (mobiliser la triade catachrèse / tolérance managériale / genre professionnel sur une situation de travail empêché ou de réorganisation).",
        "Option 2 : Dissertation théorique rédigée (confronter collectif de crise et collectif pérenne, ou discuter la thèse de Caroly & Clot 2004 sur le renouvellement des règles de métier).",
      ],
      recommandationsNotation:
        "Mme Jessica Roussan et le jury Cnam valorisent au plus haut point l'usage rigoureux du vocabulaire clinique : distinguer impérativement solidarité compassionnelle et coopération de métier, ne jamais cautionner le coaching individuel face à une souffrance organisationnelle, et savoir expliciter la catachrèse selon Rabardel et Clot.",
    },
    consignesOralesProf: [
      {
        titre: "Ateliers cliniques d'analyse de cas réels & Posture de restitution",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Pour les ateliers cliniques, ne récitez pas la totalité du cours de manière abstraite. Choisissez une situation concrète issue du terrain, posez la problématique organisationnelle, reliez-la précisément aux concepts (catachrèse, collectif, genre, prescription) et ouvrez sur les questions et dilemmes éthiques que cela pose au groupe.",
        echeance: "Jeudi 12 novembre 2026 (Séance BBB réalisée)",
        modaliteRendu: "Restitution orale chronométrée par sous-groupes (5 min) suivie du débat clinique général.",
        recommandationsProf:
          "Apprendre à exposer de façon synthétique sans s'éparpiller : problématique, ancrage conceptuel, et mise en controverse.",
      },
      {
        titre: "Regroupement Présentiel au Centre Cnam Bordeaux (Samedi 28 novembre 2026)",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Séance obligatoire en présentiel à Bordeaux le samedi 28 novembre 2026 à 14h00 (Groupe 1). Approfondissement de la méthodologie clinique, articulation entre la clinique de l'activité (Clot), la psychodynamique du travail (Dejours) et l'ergonomie d'Alain Wisner, avec études de cas réels sur table.",
        echeance: "Samedi 28 novembre 2026 (14h00 - 17h00)",
        modaliteRendu: "Présence active et travail sur dossiers cliniques d'intervention.",
        recommandationsProf:
          "Réviser les textes fondateurs de Damien Cru (1988) sur les règles de métier et l'article de Caroly & Clot (2004).",
      },
      {
        titre: "Lecture obligatoire : Caroly & Clot (2004) sur le renouvellement du genre",
        typeTravail: "lecture",
        consigneExacte:
          "Lire intégralement l'article de Florentina Caroly et Yves Clot : « Du travail collectif au collectif de travail : le renouvellement du genre de métier dans une agence postale » (Revue Psychologie du Travail et des Organisations, 2004). Analyser la comparaison province/banlieue et le concept de tolérance managériale.",
        echeance: "Avant le regroupement présentiel du 28 novembre",
        modaliteRendu: "Fiche de lecture personnelle intégrable dans les révisions d'examen.",
        recommandationsProf:
          "Porter une attention particulière aux conditions organisationnelles qui permettent aux astuces de métier de sortir de la clandestinité.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cas 1 — Maintien en Emploi, Catachrèse & Tolérance Managériale (Karine & Stéphanie)",
        points: [
          {
            titre: "L'impasse institutionnelle du maintien en emploi",
            contenu:
              "Une professionnelle intervient sur le maintien en emploi d'une assistante maternelle en situation de handicap employée par des particuliers. Les particuliers employeurs ne cotisent pas aux Services de Prévention et de Santé au Travail (SPST), rendant impossible l'intervention d'un médecin du travail. Or, le financement des aménagements par l'AGEFIPH exige réglementairement les préconisations formelles du médecin du travail, bloquant le dossier.",
            auteurs: ["Karine & Stéphanie (Auditeurs)", "Mme Jessica Roussan"],
            conceptsCles: ["Maintien en emploi", "Absence de SPST", "Impasse administrative"],
          },
          {
            titre: "La catachrèse opératoire : détournement créatif d'un dispositif",
            contenu:
              "Face à ce vide juridique, la professionnelle détourne un outil tiers : l'Aide à la Recherche de Solutions (ARS, normalement dédiée au reclassement ou au conseil) pour financer le bilan ergonomique et l'aménagement du poste. Selon Pierre Rabardel (1995) et Yves Clot (1999), cette pratique constitue une catachrèse : l'utilisation d'un instrument hors de ses fonctions canoniques prescrites afin de surmonter la résistance du réel.",
            auteurs: ["Pierre Rabardel (1995)", "Yves Clot (1999)"],
            conceptsCles: ["Catachrèse ergonomique", "Genèse instrumentale", "Travail réel vs prescrit"],
          },
          {
            titre: "Tolérance managériale et transmission du genre (Caroly & Clot, 2004)",
            contenu:
              "Cette catachrèse n'est pas une fraude clandestine : elle est connue et tolérée par le management qui 'ferme les yeux avec bienveillance'. Comme le démontrent Caroly et Clot (2004) à La Poste, la tolérance managériale permet aux ficelles de métier de se diffuser ouvertement entre collègues et d'enrichir le genre professionnel, sans figer l'activité dans des procédures rigides.",
            auteurs: ["Florentina Caroly", "Yves Clot (2004)"],
            conceptsCles: ["Tolérance managériale", "Transmission du genre", "Enrichissement des règles de métier"],
          },
        ],
      },
      {
        numero: "2",
        titre: "Cas 2 — Crèche Municipale : Collectif de Crise vs Pérenne & Cheminement du Genre (Céline & Julie)",
        points: [
          {
            titre: "Le travail en sous-effectif critique : régulation 'en marchant'",
            contenu:
              "Au sein d'une crèche municipale, 5 agentes se retrouvent seules pour encadrer 3 sections d'enfants (section bébés fermée et répartie, directrice absente, pool de remplacement saturé). L'équipe régule 'en marchant' : décalage de l'heure des repas, annulation de la réunion de transmission, repli strict sur la sécurité physique immédiate au détriment de l'éveil pédagogique.",
            auteurs: ["Céline & Julie (Auditeurs)", "Mme Jessica Roussan"],
            conceptsCles: ["Sous-effectif aigu", "Régulation en marchant", "Sécurité vs Pédagogie"],
          },
          {
            titre: "Collectif de crise éphémère vs Collectif de travail pérenne",
            contenu:
              "Jessica Roussan alerte contre une illusion fréquente : la solidarité et la réussite face à une journée de crise ne prouvent pas l'existence d'un collectif de travail pérenne. Il s'agit d'un 'collectif pompier' fondé sur l'héroïsme compassionnel. Sans cadre institué et sans effectifs suffisants, cette régulation d'urgence épuise les organismes et masque les défaillances de l'organisation.",
            auteurs: ["Mme Jessica Roussan", "Damien Cru (1988)"],
            conceptsCles: ["Collectif de crise", "Collectif pompier", "Héroïsme individuel vs Organisation"],
          },
          {
            titre: "L'incorporation du genre professionnel : un long cheminement",
            contenu:
              "L'analyse du cas met en lumière la souffrance de la jeune recrue face à la pression du groupe : l'appropriation du genre professionnel est un long processus développemental qui ne s'ordonne pas. Pour accéder au 'côté obscur de l'activité' (les peurs, les maladresses, les doutes), la débutante a besoin d'un collectif sécurisant et d'espaces d'Analyse des Pratiques Professionnelles (APP) animés par un tiers garant.",
            auteurs: ["Mme Jessica Roussan", "Yves Clot"],
            conceptsCles: ["Incorporation du genre", "Débutant vs Ancien", "Côté obscur de l'activité", "Espaces d'APP"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Cas 3 — Carrefour Approvisionnement Vins : Concurrence Interne & Dérives du Coaching (Cécile & Mora)",
        points: [
          {
            titre: "L'organisation par la mise en concurrence et le flux tendu",
            contenu:
              "Au sein de la centrale d'approvisionnement vin de Carrefour, 10 salariés gèrent les flux vers les hypermarchés avec un taux de service imposé de 99 % par jour. L'organisation managériale repose sur l'affichage quotidien des scores individuels et la mise en concurrence sauvage. Conséquences cliniques : insultes, rétention d'informations critiques, démission du manager pour burn-out et turnover systématique au bout de 2 à 3 ans.",
            auteurs: ["Cécile & Mora (Auditeurs)", "Mme Jessica Roussan"],
            conceptsCles: ["Flux tendu 99 %", "Mise en concurrence interne", "Pathologie organisationnelle"],
          },
          {
            titre: "La dérive du coaching individuel : psychologisation de la violence managériale",
            contenu:
              "Face à cette hécatombe, la direction fait intervenir un coach en entreprise qui dispense des leçons de développement personnel : 'Soyez auteurs de votre vie et pas seulement acteurs', renvoyant la charge de la survie à la résilience individuelle. Réquisitoire sans appel de Jessica Roussan : le coaching opère ici une culpabilisation toxique du salarié en le rendant responsable de son stress face à une organisation structurellement pathologique.",
            auteurs: ["Mme Jessica Roussan", "Vincent de Gaulejac"],
            conceptsCles: ["Dérive du coaching", "Psychologisation des RPS", "Culpabilisation du travailleur"],
          },
          {
            titre: "Remplacer le coaching par la controverse sur le travail réel",
            contenu:
              "Le psychologue du travail ne doit pas proposer de simples groupes de parole cathartiques (qui font déborder le vase sans rien changer). L'intervention clinique exige d'instruire des controverses techniques sur les critères du travail bien fait (conflits de priorités, charge réelle), d'objectiver la pathologie par les données RH (taux de rotation, arrêts maladie) et d'alerter les instances représentatives (CSE, médecin du travail).",
            auteurs: ["Mme Jessica Roussan", "Yves Clot"],
            conceptsCles: ["Controverse de métier", "Données RH objectives", "Alerte CSE / Médecin du travail"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Théorie Clinique du Collectif & Méthodologie d'Intervention (Roussan, Caroly, Clot)",
        points: [
          {
            titre: "Solidarité compassionnelle vs Coopération de métier",
            contenu:
              "La compassion ('je compatis à ta souffrance') ne protège pas la santé mentale. Un véritable collectif de travail exige une coopération technique fondée sur la dispute de métier : délibérer ensemble sur les manières de bien faire le travail, s'accorder sur des règles communes et construire une confiance mutuelle (Damien Cru, 1988).",
            auteurs: ["Mme Jessica Roussan", "Damien Cru (1988)"],
            conceptsCles: ["Solidarité compassionnelle", "Coopération technique", "Confiance mutuelle"],
          },
          {
            titre: "Les deux configurations postales de Caroly & Clot (2004)",
            contenu:
              "En agence postale de province, la hiérarchie accorde de la latitude : les guichetiers débattent de leurs manières d'accueillir les usagers difficiles et les novices sont formés par imprégnation (genre vivant). En agence de banlieue sous tension sécuritaire et gestionnaire, les opérateurs gardent leurs astuces pour eux 'sous le manteau' : le collectif se disloque, le genre s'appauvrit et les nouveaux arrivants sont laissés à leur détresse.",
            auteurs: ["Florentina Caroly", "Yves Clot (2004)"],
            conceptsCles: ["Agence de province vs banlieue", "Astuces sous le manteau", "Appauvrissement du genre"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Collectif de Crise Éphémère vs Collectif de Travail Pérenne (Jessica Roussan)",
        colonnes: ["Critère d'Analyse", "Collectif de Crise Éphémère (Pompier)", "Collectif de Travail Pérenne (Clinique)"],
        lignes: [
          {
            axe: "Déclencheur & Temporalité",
            valeurs: [
              "Urgence ponctuelle, pénurie d'effectif imprévue, régulation 'au coup par coup'",
              "Inscription durable dans l'histoire de l'organisation et du métier",
            ],
          },
          {
            axe: "Régulation & Moyens",
            valeurs: [
              "Héroïsme individuel, dégradation tacite des normes, sacrifice de soi",
              "Coopération instituée, espaces d'APP, délibération sur les critères de qualité",
            ],
          },
          {
            axe: "Type de Liens",
            valeurs: [
              "Solidarité affective, compassion, soulagement émotionnel immédiat",
              "Dispute professionnelle réglée, confrontation sur le travail bien fait, confiance",
            ],
          },
          {
            axe: "Conséquence à Long Terme",
            valeurs: [
              "Épuisement, burn-out, démission des plus engagés, invisibilisation de la crise",
              "Préservation de la santé psychique, transmission du genre, développement du pouvoir d'agir",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — Approche Clinique de l'Activité vs Coaching Managérial Individualisant",
        colonnes: ["Dimension", "Clinique de l'Activité (Clot, Cnam)", "Coaching Managérial d'Entreprise"],
        lignes: [
          {
            axe: "Cible de l'Intervention",
            valeurs: [
              "L'organisation du travail, les prescriptions contradictoires et le travail réel",
              "L'individu isolé, sa posture psychologique et sa 'résilience' personnelle",
            ],
          },
          {
            axe: "Origine du Problème",
            valeurs: [
              "Pathologie des systèmes de gestion (flux tendu irréaliste, mise en concurrence)",
              "Défaut d'adaptabilité, mauvaise gestion du stress ou manque d'agilité du salarié",
            ],
          },
          {
            axe: "Dispositif Déployé",
            valeurs: [
              "Espaces de controverse de métier, autoconfrontation croisée, sosie",
              "Séminaires de développement personnel, affirmation de soi ('soyez auteurs de votre vie')",
            ],
          },
          {
            axe: "Impact Psychosocial",
            valeurs: [
              "Restauration du pouvoir d'agir collectif et transformation des conditions concrètes",
              "Culpabilisation toxique du travailleur sommé de compenser les failles de l'entreprise",
            ],
          },
        ],
      },
      {
        titre: "Tableau 3 — Renouvellement du Genre Professionnel à La Poste (Caroly & Clot, 2004)",
        colonnes: ["Dimension Comparée", "Agence Postale de Province (Ouverte)", "Agence Postale de Banlieue (Fermée)"],
        lignes: [
          {
            axe: "Posture Hiérarchique",
            valeurs: [
              "Tolérance managériale bienveillante : la direction laisse vivre les régulations informelles",
              "Contrôle strict, méfiance et focalisation sur les procédures formelles écrites",
            ],
          },
          {
            axe: "Statut des Astuces de Métier",
            valeurs: [
              "Partagées ouvertement lors des pauses et transmissions : enrichissement du genre",
              "Gardées jalousement 'sous le manteau' pour se protéger individuellement",
            ],
          },
          {
            axe: "Intégration des Novices",
            valeurs: [
              "Étayage par les pairs, tutorat informel, transmission progressive du genre",
              "Abandon des débutants, reproches, détresse et turnover rapide",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne pas confondre gestion de l'urgence et existence d'un collectif de travail",
        erreurCourante: "Affirmer qu'une équipe qui réussit à tenir une journée de crèche en sous-effectif prouve la solidité de son collectif de travail.",
        rectificationAttendue:
          "Mme Jessica Roussan rappelle qu'il s'agit d'un 'collectif de crise éphémère' ou 'collectif pompier'. Sans espaces formels d'élaboration (APP) et sans organisation protectrice, ce mode opératoire repose sur le sacrifice individuel et conduit inéluctablement au burn-out et à la démission.",
        contexte: "Critique de la résilience héroïque en milieu hospitalier et petite enfance.",
      },
      {
        titre: "La catachrèse n'est pas une faute professionnelle ou une malfaçon",
        erreurCourante: "Considérer le détournement d'une aide financière (ARS) comme une fraude ou un manquement déontologique de la conseillère.",
        rectificationAttendue:
          "En ergonomie (Rabardel, 1995) et clinique de l'activité (Clot), la catachrèse est un acte d'intelligence opératoire vital : le détournement inventif d'un artefact face aux impasses du prescrit afin de permettre la réalisation du travail réel et le maintien en emploi.",
        contexte: "Théorie de l'instrumentation et travail réel vs prescrit.",
      },
      {
        titre: "La solidarité compassionnelle ne constitue pas un collectif de travail clinique",
        erreurCourante: "Penser qu'une bonne ambiance ou des paroles de soutien mutuel ('je compatis') suffisent à garantir la santé au travail.",
        rectificationAttendue:
          "Selon Damien Cru et Jessica Roussan, la solidarité compassionnelle est impuissante à traiter la souffrance. Le collectif de travail clinique repose sur la coopération technique et la dispute professionnelle : la confrontation réglée sur les manières de bien faire le travail.",
        contexte: "Différenciation psychosociale entre groupe affectif et collectif de travail.",
      },
      {
        titre: "Refuser l'injonction du coaching individuel face aux pathologies organisationnelles",
        erreurCourante: "Préconiser du coaching, des stages de gestion du stress ou des groupes de parole libres pour résoudre la crise chez Carrefour.",
        rectificationAttendue:
          "Le coaching ('soyez auteur de votre vie') opère un déplacement coupable en faisant porter à l'individu la responsabilité d'un flux tendu irréaliste (99 %) et d'une concurrence destructrice. Le psychologue doit mobiliser des données objectives (turnover, absentéisme), instruire des controverses de métier et interpeller le management et les IRP.",
        contexte: "Déontologie du psychologue du travail et critique du néomanagement.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage méthodologique de l'atelier clinique et posture de restitution]
[00:03:15] MME JESSICA ROUSSAN : « Bonjour à toutes et à tous. Pour ces ateliers en sous-groupes, l'objectif n'est surtout pas de réciter la totalité des concepts de manière abstraite. L'enjeu est d'apprendre à exposer une situation réelle : poser la problématique organisationnelle, le lien précis avec les concepts cliniques, et formuler la question de fond que vous voulez soumettre à l'échange avec l'ensemble du groupe. »

[2. Cas 1 — Assistante maternelle, catachrèse institutionnelle et transmission du genre]
[00:06:40] KARINE (AUDITRICE) : « Nous avons étudié la situation d'une professionnelle du maintien en emploi qui accompagne une assistante maternelle en situation de handicap. Les particuliers employeurs ne cotisent pas aux services de prévention et de santé au travail, donc pas de médecin du travail. Face au blocage du dossier AGEFIPH, elle a détourné une aide à la recherche de solutions pour financer l'aménagement du poste. C'est une catachrèse, un détournement d'instrument pour répondre au réel. »
[00:15:22] MME JESSICA ROUSSAN : « Absolument. C'est une magnifique illustration de ce que Rabardel et Clot appellent la catachrèse opératoire : quand le prescrit est bloqué, le professionnel invente un usage inédit pour permettre au travail d'aboutir. Et notez bien ce point essentiel : la hiérarchie tolère cette pratique avec bienveillance. C'est ce que Caroly et Clot (2004) appellent la tolérance managériale à La Poste, qui permet aux astuces de circuler et d'enrichir le genre de métier au lieu de rester clandestines. »

[3. Cas 2 — Crèche municipale en sous-effectif, régulation de crise et cheminement du genre]
[00:28:10] CÉLINE (AUDITRICE) : « Dans notre crèche, 5 agentes se sont retrouvées seules pour 3 sections d'enfants avec fermeture de section et directrice absente. Elles ont géré 'en marchant' : décalage des repas, annulation de la réunion, priorité stricte à la sécurité physique immédiate. Mais la jeune nouvelle a ressenti une immense détresse face à la pression du groupe. »
[00:36:45] MME JESSICA ROUSSAN : « Attention à l'illusion du collectif ! Gérer l'urgence en 'one-shot' ne prouve absolument pas qu'il existe un collectif de travail solide. C'est ce qu'on appelle un collectif de crise éphémère ou un collectif pompier. Il repose sur l'héroïsme compassionnel des professionnelles qui s'épuisent. Sans organisation protectrice et sans espaces d'APP pour délibérer sur le travail bien fait, ce mode de fonctionnement détruit la santé. »
[00:41:20] MME JESSICA ROUSSAN : « Et pour la jeune recrue, comprenez bien que l'incorporation du genre professionnel est un long cheminement qui ne se décrète pas par protocole écrit. Pour oser parler de ses doutes et de ce que Clot appelle le 'côté obscur de l'activité', il faut que le collectif offre un climat de sécurité psychologique absolu. »

[4. Cas 3 — Carrefour Approvisionnement Vins : concurrence interne et critique sans appel du coaching]
[01:02:15] CÉCILE (AUDITRICE) : « Chez Carrefour, 10 approvisionneurs gèrent le vin en flux tendu avec un taux de service imposé de 99 % par jour. Le management affiche les scores individuels tous les matins. Résultat : insultes, rivalité, burn-out du chef de service et turnover tous les deux ans. Et la direction leur a envoyé un coach qui leur dit : 'Soyez auteurs de votre vie et pas seulement acteurs' ! »
[01:14:50] MME JESSICA ROUSSAN : « Cette injonction du coaching est insupportable et toxique ! C'est le paroxysme de l'individualisation néomanagériale : on fait porter au salarié la culpabilité de son épuisement face à une organisation structurellement maltraitante. On lui dit 'adaptez votre posture' au lieu de regarder l'aberration du flux tendu à 99 % ! »
[01:19:30] MME JESSICA ROUSSAN : « En tant que psychologue du travail, on ne propose pas un simple groupe de parole pour que les gens pleurent ensemble et retournent au massacre. On objective la souffrance par des indicateurs RH (taux de rotation, arrêts), on saisit le médecin du travail et le CSE, et on crée des espaces cliniques d'instruction au sosie pour instruire une véritable controverse sur les critères du travail bien fait. »

[5. Clôture méthodologique : posture clinique, indicateurs RH et rendez-vous du 28 novembre]
[01:58:10] MME JESSICA ROUSSAN : « N'oubliez jamais : la solidarité compassionnelle n'est pas la coopération technique de métier. La compassion dit 'je souffre avec toi', mais la coopération clinique produit des règles communes pour transformer le travail. Je vous donne rendez-vous en présentiel à Bordeaux le samedi 28 novembre à 14h00 pour poursuivre cette analyse sur dossiers cliniques. D'ici là, lisez l'article de Caroly et Clot (2004) ! »`,
    bibliographieCitee: [
      {
        titre: "Du travail collectif au collectif de travail : le renouvellement du genre de métier dans une agence postale",
        auteur: "Florentina Caroly & Yves Clot",
        annee: "2004",
        remarque: "Article de référence Cnam (Psychologie du Travail et des Organisations) : comparaison des guichets de province (tolérance managériale) et de banlieue (astuces sous le manteau).",
      },
      {
        titre: "Les hommes et les technologies : Approche cognitive des instruments contemporains",
        auteur: "Pierre Rabardel",
        annee: "1995",
        remarque: "Théorie de l'instrumentation : concept fondateur de catachrèse comme utilisation créative d'un artefact hors des prescriptions.",
      },
      {
        titre: "Les règles du métier (in Plaisir et souffrance dans le travail)",
        auteur: "Damien Cru",
        annee: "1988",
        remarque: "Théorisation du collectif de travail : règles de métier délibérées, reconnaissance mutuelle et construction de la confiance.",
      },
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999",
        remarque: "Concepts de réel de l'activité, dialogue intérieur, genre et style professionnels, et analyse du côté obscur de l'activité.",
      },
      {
        titre: "Travail, usure mentale : De la psychopathologie à la psychodynamique du travail",
        auteur: "Christophe Dejours",
        annee: "1993",
        remarque: "Distinction fondamentale entre stratégies collectives de défense et coopération de métier.",
      },
    ],
  },

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
    transcriptionIntegraleVerbatim: `[1. Langage, Langue, Communication & Réseau « Langage et Travail »]
[00:08:20] M. VALLS : « Dès les années 1950, la psychologie du travail montre que le travail devient de plus en plus communicationnel. Le réseau Langage et Travail (Josiane Boutet, Béatrice Fraenkel, 1997) démontre que parler au travail est une activité multimodale et située : quand la communication est prescrite de façon rigide — comme dans les centres d'appels — ou saturée par les outils numériques, elle devient directement pathogène. »
Distinction fondamentale d'examen : le Langage (faculté universelle humaine de symboliser par signes), la Langue (système conventionnel d'un groupe social analysé en 5 niveaux : phonologie, morphologie, syntaxe, sémantique, pragmatique) et le Dialogue (échange intersubjectif dynamique).

[2. La posture clinique au Cnam : « Transformer pour comprendre » & Coopération conflictuelle]
[00:34:15] M. VALLS : « Au Cnam, l'étymologie de "clinique" (klinê, au chevet du sujet) fonde notre axiome : "Transformer pour comprendre" (Yves Clot), à rebours du positivisme qui prétend comprendre de l'extérieur avant d'agir. Dans Le travail à cœur (2010), Clot montre que la santé au travail repose sur l'institution d'une "coopération conflictuelle" : la dispute professionnelle réglée sur les critères du travail bien fait. »

[3. Bernard Golse : Néoconstructivisme, pare-excitation & accès à la tiercéité]
[01:02:40] M. VALLS : « Le langage et la pensée précèdent l'enfant : selon le néoconstructivisme de Bernard Golse, l'intrapsychique de l'adulte organise l'interpersonnel, qui structure en retour l'intrapsychique du bébé. La pensée remplit 4 fonctions vitales : pare-excitation (holding de Winnicott), réparation symbolique de l'absence (jeu de la bobine Fort/Da chez Freud), continuité narcissique et accès à la tiercéité (passage de la monade fusionnelle à la triade intersubjective). »

[4. Jean Piaget vs Lev Vygotski : La controverse majeure sur le langage égocentrique]
[01:35:10] M. VALLS : « Chez Jean Piaget, l'action sensori-motrice précède le langage : l'intelligence se construit par assimilation, accommodation et équilibration majorante, de l'individuel vers le social. Pour Piaget, le langage égocentrique de l'enfant n'est qu'un reflet d'immaturité asociale voué à s'éteindre. »
[01:58:45] M. VALLS : « Lev Vygotski (Pensée et langage, 1934) inverse radicalement la perspective avec sa loi génétique générale du développement culturel : toute fonction psychique supérieure apparaît deux fois, d'abord au plan social (interpsychologique), puis au plan individuel (intrapsychologique). Dans l'expérience du crayon bleu manquant, Vygotski prouve que le langage égocentrique ne meurt pas : c'est un instrument psychologique de planification face à l'obstacle qui s'intériorise pour devenir le langage intérieur de l'adulte ! »`,
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
    transcriptionIntegraleVerbatim: `[1. Le paradoxe de la Tour de Babel (Bruegel, 1563) & Le risque de la parole]
[00:04:12] M. ÉRIC LUCY : « Regardez ce tableau de Pieter Bruegel l’Ancien, La Tour de Babel (1563). C’est le paradoxe originaire du langage : ce qui rassemble les êtres humains pour bâtir une œuvre commune est très exactement ce qui les divise dans la mésentente. Parler au travail n’est jamais un échange neutre d’informations : c’est prendre le risque permanent d’être incompris. »
Le psychologue du travail doit renoncer au mythe managérial d’une communication transparente et sans heurts pour penser la clinique du malentendu et la négociation dialogique du sens.

[2. La ritournelle (Deleuze), la régression opératoire (Piaget) & le discernement clinique]
[00:28:40] M. ÉRIC LUCY : « Gilles Deleuze parle de la ritournelle : l’enfant qui a peur dans le noir se met à fredonner une petite chanson pour se fabriquer un territoire et conjurer l’angoisse. Au travail, la parole est d’abord ce rempart psychique qui permet de tenir debout face au chaos. »
[00:42:15] M. ÉRIC LUCY : « Face aux progiciels opaques et à l’intensification, des adultes pourtant au stade opératoire formel de Piaget régressent vers le stade sensori-moteur : ils cliquent à l’aveugle par essais-erreurs, privés de fonction symbolique. »
[00:55:10] M. ÉRIC LUCY : « Attention au piège diagnostique ! Quand un salarié cherche ses mots, bégaie ou s’enferme dans le mutisme, ne plaistrez pas un diagnostic neuropsychologique d’aphasie de Broca ou de Wernicke : demandez-vous d’abord s’il ne s’agit pas d’une sidération psychique liée au travail empêché ! »

[3. Sémiotique : Des Stoïciens et Port-Royal à Ferdinand de Saussure (1916)]
[01:12:30] M. ÉRIC LUCY : « Dès l’Antiquité, les Stoïciens séparent le son matériel, le dicible incorporel (lekton) et la chose réelle (tugchanon) : le monde du discours n’est pas le monde physique. Avec Port-Royal (Sujet + Prédicat), regardez le pouvoir d’une simple virgule : "Igor, le roi de Pologne" n’a pas du tout le même sens qu’"Igor le roi, de Pologne" ! »
[01:26:45] M. ÉRIC LUCY : « Chez Ferdinand de Saussure, ne confondez jamais l’axe syntagmatique horizontal — l’enchaînement grammatical des mots dans la phrase (in praesentia) — et l’axe paradigmatique vertical — le choix dans le réservoir de la langue (in absentia). Choisir de dire "collaborateur", "ressource humaine", "opérateur" ou "travailleur", c’est un choix paradigmatique hautement politique ! »

[4. John L. Austin (1962) : La rupture performative — « Quand dire, c’est faire »]
[01:44:20] M. ÉRIC LUCY : « Austin dynamise toute la philosophie du langage en réfutant l’illusion descriptive : parler ne sert pas seulement à décrire le monde en vrai ou faux (constatif), parler c’est agir (performatif). Mais pour que la parole agisse, il faut les conditions de félicité et le statut : Status est magistratus ! Si je vous dis dans la rue "Je vous condamne à trois ans de prison", cela n’a aucun effet car je n’ai ni la robe ni le mandat. »
Distinction cardinale d’examen : Acte locutoire (le fait matériel et syntaxique de dire), Acte illocutoire (ce que l’on fait EN disant : promettre, ordonner, déclarer) et Acte perlocutoire (l’effet produit SUR l’interlocuteur PAR le fait de dire : intimider, rassurer, convaincre).

[5. John R. Searle (1969/1979) : Les 5 actes de langage & la violence des actes indirects]
[02:05:10] M. ÉRIC LUCY : « Searle classe tous nos énoncés selon la direction d’ajustement entre les mots et le monde : Assertifs (les mots s’ajustent au monde), Directifs et Promissifs (le monde doit s’ajuster aux mots), Expressifs (état psychologique), et Déclaratifs (double ajustement instantané qui crée la réalité institutionnelle). »
[02:18:50] M. ÉRIC LUCY : « En clinique du travail, traquez les actes de langage indirects ! Quand un manager écrit "Merci de bien vouloir me remettre ce dossier avant ce soir", sous l’apparence polie d’un acte expressif ("Merci"), c’est un acte directif impératif. Vous ne pouvez pas lui répondre "De rien" sans faire le dossier ! Ce masquage permanent engendre des doubles contraintes toxiques. »

[6. Critiques sociologiques : Bourdieu (Marché linguistique), Habermas & Honneth]
[02:32:15] M. ÉRIC LUCY : « Pierre Bourdieu (Ce que parler veut dire, 1982) corrige Austin : la force illocutoire ne vient jamais des mots eux-mêmes (illusion internaliste), elle vient du capital symbolique et de l’institution qui délègue son autorité au porte-parole sur un marché linguistique hiérarchisé. »
[02:41:00] M. ÉRIC LUCY : « Là où Habermas oppose l’agir communicationnel (visée d’entente sincère) à l’agir stratégique managérial, Axel Honneth montre que priver un travailleur d’actes expressifs de gratitude et d’actes déclaratifs de reconnaissance produit le mépris social et l’invisibilisation. »`,
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
    "transcriptionIntegraleVerbatim": `[1. Psychosociologie de l'interaction : Verbal, Non-Verbal, Paraverbal & Contrat de Ghiglione]
[00:10:41] M. VALLS : « En psychosociologie, le maître-mot est l'interaction : les registres verbal (mots), non-verbal (corps, posture, espace) et paraverbal (voix, intonation, débit, silence) sont totalement indissociables. »
[00:20:43] M. VALLS : « Dans L'homme communiquant (1986), Rodolphe Ghiglione dépasse le modèle télégraphique linéaire : avant la rencontre, nous sommes des "intralocuteurs" isolés. Pour devenir "interlocuteurs" dans une Situation Potentiellement Communicative (SPC), il faut négocier un contrat de communication fondé sur 4 règles sues par corps : Pertinence, Réciprocité, Contractualisation et Influence. »

[2. La distinction clinique vitale : Objectif prescrit vs Enjeu subjectif]
[00:30:52] M. VALLS : « Ne confondez jamais l'OBJECTIF (la tâche prescrite, l'indicateur chiffré) et l'ENJEU (ce qui a une valeur vitale pour le sujet). Quand j'étais jeune éducateur, j'ai trouvé en 24 heures un CDI à temps plein à une jeune mère isolée : trois jours plus tard, elle est revenue en larmes car elle n'avait aucun mode de garde le mercredi pour sa fille. J'avais rempli l'objectif administratif en écrasant l'enjeu réel de sa vie ! »
[00:40:46] M. VALLS : « Même décalage d'enjeux chez l'institutrice de CE1 avec son problème de poneys : son enjeu est l'abstraction mathématique, alors que l'enjeu des enfants est affectif ("faire plaisir à la maîtresse"). Tant que le contrat n'est pas réexplicité, l'échange tourne à vide. »

[3. Dominique Wolton (« Informer n'est pas communiquer ») & Le langage comme masquage]
[00:50:40] M. VALLS : « Dominique Wolton le rappelle avec force : "Informer n'est pas communiquer !" Entendre au travail "Je lui ai pourtant envoyé un mail !" est l'illusion techniciste par excellence : transmettre un paquet d'octets n'est pas construire une relation d'intercompréhension. »
[01:00:02] M. VALLS : « Le langage peut aussi servir d'écran de fumée ("le masquage") : deux universitaires en conflit théorique utilisent un jargon abscons pour neutraliser leur dispute et préserver leur enjeu institutionnel commun (continuer à publier ensemble). À l'inverse, face au patient schizophrène qui répète "Je suis mort", le psychiatre qui répond "Et maintenant que je sais que vous êtes mort, qu'est-ce qu'on fait ?" restaure la réciprocité et reconnaît la parole comme acte de résistance à l'enfermement. »

[4. Injonction paradoxale (Palo Alto), Voix (Paraverbal) & Proxémie (Edward T. Hall)]
[01:22:36] M. VALLS : « L'injonction paradoxale (Watzlawick, Palo Alto), illustrée par la mère offrant deux cravates chez Bretécher ("Tu n'aimes pas la rouge ?") ou l'ordre "Sois spontané !", se retrouve partout au travail : exiger d'un salarié une prise d'initiative autonome tout en lui imposant un reporting tatillon minuté est un piège logique générateur d'angoisse. »
[01:33:22] M. VALLS : « Regardez la puissance du paraverbal dans le Dom Juan de Molière : selon que l'acteur dit à Sganarelle "Tu doutes... je pense" (hésitation) ou "Tu doutes ? Je pense !" (affirmation altière de caste), les mêmes mots changent radicalement d'acte de langage ! »
[01:42:53] M. VALLS : « Enfin, l'éthologie et la proxémie d'Edward T. Hall montrent que l'homme est un animal territorial où les "histoires sans paroles" disent tout des rapports de place : les fleurs posées sur le bureau du secrétaire PJJ pour résister à la dépersonnalisation managériale, ou le parking de la clinique où l'ASH venue en bus à l'aube voit l'interne débutant disposer d'une place attitrée et toiser sa blouse pour vérifier son grade (le sentiment d'injustice au travail analysé par François Dubet). »`,
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
    transcriptionIntegraleVerbatim: `[1. Le paradoxe de l'identité personnelle (Raphaël Enthoven) : Singularité vs Appartenance]
[00:06:30] MME ÉLISABETH LUCY : « Toute la psychosociologie de l'identité repose sur une tension fondatrice : comment concilier le désir d'être unique (singularité, authenticité du sujet) et le besoin vital d'être reconnu par un collectif (appartenance, conformité sociale) ? Comme le souligne Raphaël Enthoven, dès que je réponds à la question "Qui suis-je ?", je mobilise des catégories forgées par autrui : mon prénom, ma nationalité, mon métier. »

[2. Les fondements sociologiques : Durkheim, Goffman, Becker, Weber & Bourdieu]
[00:35:15] MME ÉLISABETH LUCY : « Chez Émile Durkheim, l'intégration par la solidarité organique et la socialisation méthodique protègent l'individu contre l'anomie (l'effondrement des repères normatifs). Avec Erving Goffman et Howard Becker, l'identité devient une dramaturgie interactionnelle : le sujet gère sa "façade personnelle" sur la scène sociale et tente de négocier l'écart entre l'identité sociale virtuelle (le stigmate ou l'étiquette collée par autrui) et son identité réelle. »
[01:08:40] MME ÉLISABETH LUCY : « Là où Max Weber distingue les 3 formes de domination légitime (traditionnelle, charismatique et rationnelle-légale bureaucratique), Pierre Bourdieu démontre que la socialisation opère par incorporation silencieuse d'un Habitus — un système de dispositions durables qui fonctionne comme une boussole sociale dans un champ structuré par la distribution inégale des capitaux (économique, culturel, social et symbolique). »

[3. Le modèle canonique de Claude Dubar (1991) : La Double Transaction Identitaire]
[01:42:20] MME ÉLISABETH LUCY : « Pour votre examen de PST123, le cœur théorique absolu est le modèle de Claude Dubar (La socialisation, 1991). L'identité professionnelle n'est jamais donnée une fois pour toutes à la sortie de l'école : elle est le produit instable d'une DOUBLE TRANSACTION permanente ! »
[01:56:10] MME ÉLISABETH LUCY : « Premièrement, la TRANSACTION BIOGRAPHIQUE (identité pour soi, axe temporel interne) : le sujet négocie avec lui-même entre ses identités héritées du passé et ses identités visées vers l'avenir, entre continuité et rupture biographique (comme votre propre reconversion vers le titre de psychologue du travail au Cnam !). »
[02:12:45] MME ÉLISABETH LUCY : « Deuxièmement, la TRANSACTION RELATIONNELLE (identité pour autrui, axe social externe) : confrontation entre les actes d'attribution émis par l'institution ("vous n'êtes qu'un exécutant") et les actes d'appartenance revendiqués par le sujet ("je suis un professionnel qualifié"). Lorsque l'institution refuse de reconnaître l'identité visée, la transaction se bloque et déclenche une crise identitaire majeure. »

[4. Les 4 identités au travail de Renaud Sainsaulieu & Méthodologie d'examen (Options A et B)]
[02:34:00] MME ÉLISABETH LUCY : « Renaud Sainsaulieu (L'identité au travail, 1977) montre que l'entreprise est un lieu d'apprentissage culturel du pouvoir et dégage 4 modèles identitaires : Fusionnel (solidarité défensive de masse), Négociateur (élite ouvrière de métier et encadrement qui débat des règles), Affinitaire (réseaux sélectifs de mobilité individuelle) et Retrait (investissement minimaliste hors-travail). À l'examen final, que vous choisissiez l'Option A (dissertation théorique) ou l'Option B (étude de cas clinique), croisez systématiquement la double transaction de Dubar avec la grille de pouvoir de Sainsaulieu ! »`,
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

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 2 : CADRAGE INITIAL, PRÉSENTATIONS & POSITIONNEMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s2",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 2,
    titre: "Séance 2 — Tour de Table, Présentation de l'UE & Posture (« D'où l'on parle »)",
    sousTitre: "Séance de rentrée et de prise de contact : représentations des auditeurs et émergence de la posture — Aucun contenu théorique nouveau d'examen",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "27 octobre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 30 min (Webconférence BigBlueButton)",
    resumeExecutif: [
      "Prise de contact et tour de table : Présentation réciproque de l'enseignante et des auditeurs du centre de formation. Recueil des parcours professionnels antérieurs et des motivations pour le Titre de Psychologue du Travail.",
      "Le principe d'énonciation située : Dr. Lutumba insiste sur l'importance de clarifier 'd'où l'on parle' pour identifier ses préjugés, ses attentes et son cadre de référence avant d'aborder les situations réelles de travail.",
      "Cadrage organisationnel : Présentation générale des objectifs de l'UE PST123 et articulation avec les regroupements en présentiel de Dax et Bordeaux.",
      "Note pédagogique officielle : Cette séance informelle ne comporte pas de nouveau modèle conceptuel à mémoriser pour l'épreuve écrite. La matière théorique fondamentale débute à la Séance 3 (cours du 3 novembre 2026).",
    ],
    consignesOralesProf: [
      {
        titre: "Prise en main de l'espace Moodle et lectures introductives",
        typeTravail: "lecture",
        consigneExacte:
          "Prendre connaissance des documents de cadrage déposés sur l'espace Moodle de l'UE et préparer vos questionnements en vue de la séance d'histoire et d'épistémologie.",
        echeance: "Avant la séance 3",
        modaliteRendu: "Consultation personnelle.",
        recommandationsProf: "Se familiariser avec l'environnement numérique de travail du Cnam.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Prise de Contact & Tour de Table Pédagogique",
        points: [
          {
            titre: "Présentation des auditeurs et posture d'écoute",
            contenu:
              "Séance relationnelle consacrée à la découverte de la promotion, à la diversité des trajectoires de reconversion et à la formulation des attentes vis-à-vis du titre RNCP.",
          },
          {
            titre: "Clarifier « d'où l'on parle »",
            contenu:
              "Sensibilisation à l'implication subjective du praticien : savoir expliciter son propre cadre pour ne pas plaquer de jugements hâtifs sur les futurs salariés accompagnés.",
          },
        ],
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Présentation de l'UE et Tour de Table]
[00:05:00] DR. PRISCA LUTUMBA : « Bienvenue à tous dans cette UE PST123. Cette première rencontre ensemble est dédiée à faire connaissance, à écouter vos parcours et à voir d'où chacun parle avant de plonger dans la matière théorique. »`,
    bibliographieCitee: [
      {
        titre: "Guide pédagogique national de l'UE PST123",
        auteur: "Équipe pédagogique Cnam",
        annee: "2026",
        remarque: "Document cadre d'organisation du cursus.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 3 : GENÈSE HISTORIQUE, ÉPISTÉMOLOGIE & PROFESSIONNALISATION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s3",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 3,
    titre: "Séance 3 — Genèse Historique, Épistémologie & Professionnalisation du Psychologue",
    sousTitre: "Des origines psychotechniques et de la mesure (1879-1939) aux cliniques du travail, à la santé psychique et au statut légal au Cnam",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "3 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 31 min (Webconférence BigBlueButton)",
    resumeExecutif: [
      "Généalogie épistémologique et identité professionnelle : Se référant à Auguste Comte (« on connaît bien une science quand on connaît son histoire ») et aux travaux de Thomas Le Bianic (2004), Dr. Lutumba rappelle qu'être psychologue du travail clinicien au Cnam impose de savoir d'où l'on vient pour comprendre d'où l'on parle face aux institutions.",
      "Origines (1879-1914) : La psychologie du travail naît au croisement d'une psychologie qui cherche sa légitimité académique par la méthode expérimentale et la métrologie (Wundt 1879 à Leipzig, Binet 1889 à la Sorbonne, psychologie différentielle de Galton et Cattell) et d'une industrie en pleine seconde révolution qui rationalise ses cadences (Taylor, OST, « The right man in the right place », Münsterberg 1913, sélection des traminots par Lahy en 1908).",
      "L'Âge d'or de la psychotechnique (1914-1939) : Accéléré par la Première Guerre mondiale (tests Yerkes Army Alpha/Beta en 1917 aux USA), la discipline se focalise sur les aptitudes stables et prédictives. En France, l'INOP est fondé en 1928 par Henri Piéron au 41 rue Gay-Lussac (futur INETOP / Cnam). Cette période suscite une triple critique : scientifique (validité écologique faible), syndicale (sélection = élimination) et humaine (homme-machine décontextualisé).",
      "Les Trente Glorieuses (1945-1970) : Déplacement du focus vers les collectifs et l'organisation du travail comme variable à transformer (École des Relations Humaines de Mayo à Hawthorne, sociotechnique du Tavistock Institute). Émancipation universitaire avec la création de la Licence de psychologie par Lagache en 1947, essor de l'orientation (modèle RIASEC de Holland, Huteau et Guichard au Cnam, création de l'ANPE en 1967) et naissance de l'Ergonomie de l'activité (Wisner au Cnam, Faverge et Ombredane, couple prescrit/réel).",
      "De 1970 à nos jours : Chômage de masse, santé au travail et cliniques du Cnam. L'étude de Marienthal (1933) et Marie Jahoda mettent en lumière les 5 fonctions latentes de l'emploi (temps, lien social, but collectif, statut, régularité). Modélisation des RPS avec Karasek (Demande-Contrôle-Support) et Siegrist (Déséquilibre Effort-Récompense). Émergence des Cliniques du travail au Cnam : Psychodynamique du travail (Dejours), Clinique de l'activité (Clot) et Clinique des usages (Bobillier-Chaumon).",
      "Professionnalisation et Déontologie : Titre unique de psychologue protégé par la Loi du 25 juillet 1985 (art. 44). Inscription obligatoire au RPPS en tant que professionnels de santé mentale autonomes et indépendants (exercice non soumis à prescription médicale). Code de déontologie (6 principes, 32 articles) et distinction absolue entre 4 démarches d'étayage : Supervision, Analyse des Pratiques (APP), Intervision et Régulation.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez l'évolution historique de la psychologie du travail, du dogme de l'adaptation de l'homme au poste à l'impératif de transformation du travail réel » ou « En quoi les fonctions latentes de l'emploi selon Marie Jahoda éclairent-elles les souffrances liées au chômage et à la précarité ? »).",
        "Option B : Étude de cas clinique d'entreprise (décortiquer une situation de RPS, burn-out ou restructuration en mobilisant Karasek, Siegrist ou Dejours, tout en posant le cadre déontologique strict du mandat du psychologue).",
      ],
      recommandationsNotation:
        "L'équipe pédagogique (Dr. Lutumba, M. Lucy, Pr. Lagabrielle) sanctionne sévèrement la confusion entre les dispositifs cliniques (confondre supervision personnelle et APP collective) ainsi que l'illusion d'une subordination médicale (prétendre que le psychologue travaille sous prescription). Utiliser les concepts exacts : 'fonctions latentes de l'emploi', 'latitude décisionnelle', 'déséquilibre effort-récompense', 'activité empêchée', 'indépendance déontologique'.",
    },
    consignesOralesProf: [
      {
        titre: "Écrit personnel de projection professionnelle (Agrément)",
        typeTravail: "recherche",
        consigneExacte:
          "Rédiger une courte note explicitant votre projection en tant que futur psychologue du travail : clarifier votre conception du travail, votre posture et la manière dont vous envisagez votre mandat. Cet exercice personnel constitue un premier socle pour la préparation de l'agrément professionnel.",
        echeance: "Pour le 6 novembre 2026",
        modaliteRendu: "Exercice réflexif personnel déposé sur Moodle / conservé pour le dossier d'agrément.",
        recommandationsProf: "Prenez ce moment pour vous : clarifier ses motifs profonds permet de construire sa solidité clinique face aux situations de souffrance.",
      },
      {
        titre: "Lecture obligatoire : Thomas Le Bianic (Histoire de la psychologie du travail au Cnam)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire le texte de Thomas Le Bianic mis à disposition sur l'espace documentaire Moodle, retraçant la trajectoire socio-historique des sciences du travail et de la profession de psychologue au Cnam.",
        echeance: "Avant la prochaine séance en présentiel",
        modaliteRendu: "Fiche de repères généalogiques personnels.",
        recommandationsProf: "Texte fondamental partagé également en PST106 et PST124 pour comprendre la spécificité clinique du Cnam.",
      },
      {
        titre: "Lecture recommandée : Christophe Dejours — 'Travail, usure mentale'",
        typeTravail: "lecture",
        consigneExacte:
          "Lire ou feuilleter l'ouvrage fondateur de Christophe Dejours ('Travail, usure mentale', 1980) pour approfondir la dialectique souffrance/plaisir, les idéologies défensives de métier et le principe de reconnaissance.",
        echeance: "Semestre 1",
        modaliteRendu: "Notes de révision pour l'examen final et l'UE PST120.",
        recommandationsProf: "L'ouvrage de référence absolue pour toute copie d'examen traitant de la santé mentale au travail.",
      },
      {
        titre: "Recommandation déontologique forte : Engagement dans une supervision clinique",
        typeTravail: "recherche",
        consigneExacte:
          "Prendre connaissance des exigences déontologiques de supervision. Bien que le code ne l'impose pas sous forme d'obligation pénale, la supervision personnelle avec un tiers expérimenté est le garant incontournable de la qualité d'exercice et de l'élaboration psychique du psychologue.",
        echeance: "Dès l'entrée en pratique professionnelle / stage",
        modaliteRendu: "Démarche déontologique continue.",
        recommandationsProf: "Ne confondez jamais votre travail personnel / supervision avec l'analyse des pratiques en équipe.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Épistémologique & Expériences de Pensée (1908 vs 2025)",
        points: [
          {
            titre: "Auguste Comte et la filiation Cnam : Savoir d'où l'on vient pour savoir d'où l'on parle",
            contenu:
              "Comme le formule Auguste Comte, on ne comprend pleinement une science que si l'on maîtrise son histoire. Au Cnam, la psychologie du travail s'inscrit dans une tradition clinique spécifique qui refuse l'assimilation à une pure technologie de gestion ou à une 'science molle'. Face aux sciences dures, la complexité du psychisme et de l'activité humaine en situation de travail constitue une science rigoureuse, ancrée dans le réel.",
            auteurs: ["Auguste Comte", "Thomas Le Bianic", "Dr. Prisca Lutumba"],
          },
          {
            titre: "Deux époques, deux postures : Le traminot de 1908 vs Le burn-out de 2025",
            contenu:
              "En 1908, face au conducteur de tramway (technologie émergente), le psychologue se focalisait sur l'observation des gestes, la sélection sensorimotrice et le découpage de la tâche (psychotechnique de Lahy). En 2025, face à un salarié en burn-out, la clinique impose une posture radicalement différente : accueil bienveillant de la souffrance, écoute de la vérité du sujet, refus de poser un diagnostic médical hâtif, investigation du *comment* l'organisation du travail a produit cet effondrement, et vigilance sur le risque suicidaire (formation sentinelle ARS).",
          },
          {
            titre: "Les 4 branches complémentaires de la discipline",
            contenu:
              "1) Psychologie du travail : analyse des activités, charge mentale, collectifs et santé ; 2) Psychologie de l'emploi (orientation/insertion) : rapport à l'emploi, mobilités, chômage (qui est une activité à part entière de recherche) et reconversion ; 3) Psychologie des organisations (PTO) : dynamique des groupes, management, communication et accompagnement du changement ; 4) Clinique du travail : au chevet de l'activité réelle, régulations subjectives et défenses.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Période 1 (1879–1914) : Naissance de la Psychologie Scientifique & Rencontre Industrielle",
        points: [
          {
            titre: "La quête de légitimité scientifique par la méthode expérimentale et la mesure",
            contenu:
              "En 1879, Wilhelm Wundt fonde à Leipzig le premier laboratoire de psychologie expérimentale, dotant la discipline d'un trépied : un objet (les processus psychiques), une méthode (expérimentation et mesure) et un lieu (le laboratoire). En 1889, Alfred Binet crée le laboratoire de psychologie physiologique à la Sorbonne (dirigé par Henri Piéron dès 1912). Parallèlement, la psychologie différentielle (Galton, Cattell, Binet & Simon) rend l'individu mesurable dans ses facultés physiques et intellectuelles.",
            auteurs: ["Wilhelm Wundt", "Alfred Binet", "Henri Piéron", "Francis Galton", "James McKeen Cattell"],
          },
          {
            titre: "La seconde révolution industrielle et l'impératif de rendement",
            contenu:
              "La mécanisation, la concentration des usines et la cadence entraînent fatigue et accidents ouvriers (univers dépeint dans Les Temps modernes de Chaplin). Frederick Winslow Taylor formalise l'OST par le chronométrage et la parcellisation des tâches, dictant l'adage 'The right man in the right place'. Hugo Münsterberg publie en 1913 'Psychology and Industrial Efficiency', acte de naissance de la psychologie industrielle. En France, Jean-Maurice Lahy applique dès 1908 la sélection psychotechnique aux conducteurs de tramway.",
            auteurs: ["Frederick Winslow Taylor", "Hugo Münsterberg", "Jean-Maurice Lahy", "Walter Dill Scott"],
          },
          {
            titre: "Clivage méthodologique : Qualitatif Cnam vs Quantitatif du Nord / PTO",
            contenu:
              "Tandis que la psychologie des organisations d'inspiration anglo-saxonne ou scandinave privilégie les enquêtes quantitatives par questionnaires statistiques, la clinique du travail francophone du Cnam valorise les démarches qualitatives de terrain : ce que la métrologie ne peut quantifier, ce sont le rapport singulier au travail, les arbitrages de métier et la créativité du sujet face au réel.",
          },
        ],
      },
      {
        numero: "3",
        titre: "Période 2 (1914–1939) : L'Âge de la Psychotechnique et Débats Critiques",
        points: [
          {
            titre: "La Première Guerre mondiale : Accélérateur de la sélection de masse",
            contenu:
              "En 1917 aux États-Unis, Robert Yerkes supervise la passation des tests Army Alpha (lettrés) et Army Beta (illettrés) sur plus de 1,7 million de conscrits, démontrant l'utilité des tests d'aptitude pour affecter les hommes aux postes. En Europe, la psychométrie s'étend à la sélection des pilotes d'aviation, chauffeurs et téléphonistes.",
            auteurs: ["Robert Yerkes"],
          },
          {
            titre: "Définition, postulats et outillage de la Psychotechnique",
            contenu:
              "La psychotechnique applique les méthodes différentielles et expérimentales à la sélection et à l'orientation professionnelle. Elle repose sur le postulat que les aptitudes individuelles sont mesurables, stables dans le temps et prédictives de la performance future. Outils : tests sensorimoteurs, tests d'attention, chronométrages et profils de postes.",
          },
          {
            titre: "L'institutionnalisation en France : L'INOP au 41 rue Gay-Lussac et le rôle phare du Cnam",
            contenu:
              "Création en 1928 de l'Institut National d'Orientation Professionnelle (INOP) par Henri Piéron, qui deviendra l'INETOP rattaché au Cnam au 41 rue Gay-Lussac à Paris (siège actuel du laboratoire CRTD et de la chaire de psychologie du travail). Le Cnam s'affirme comme le haut-lieu national de formation des psychotechniciens et de recherche en physiologie du travail. Fondation de l'AIPTLF au Cnam par Pierre Goguelin.",
            auteurs: ["Henri Piéron", "Pierre Goguelin"],
          },
          {
            titre: "Les trois niveaux de critiques et de contestation de la psychotechnique",
            contenu:
              "1) Critique scientifique : validité prédictive fragile hors du laboratoire, incapacité à saisir l'intelligence rusée en situation ; 2) Critique syndicale : dénonciation d'un instrument de flicage patronal et de tri des ouvriers ('sélection = élimination') ; 3) Critique épistémologique : réductionnisme d'un individu isolé et passif, ignorance des dynamiques collectives et de l'organisation concrète.",
          },
        ],
      },
      {
        numero: "4",
        titre: "Période 3 (1945–1970) : Relations Humaines, Tavistock, Ergonomie & Institutionnalisation",
        points: [
          {
            titre: "L'École des Relations Humaines et l'approche socio-technique",
            contenu:
              "Elton Mayo (usines Western Electric de Hawthorne, 1927-1932) met au jour l'effet Hawthorne : la reconnaissance, l'attention managériale et le climat de groupe stimulent la productivité plus que l'éclairage physique. Kurt Lewin théorise la dynamique de groupe, les styles de leadership et la recherche-action. Au Royaume-Uni, l'Institut Tavistock (1950, Trist & Bamforth) forge le concept socio-technique : l'organisation du travail est l'articulation indissociable d'un système technique et d'un système social, devenant une variable à transformer.",
            auteurs: ["Elton Mayo", "Kurt Lewin", "Eric Trist", "Ken Bamforth"],
          },
          {
            titre: "Naissance de l'Ergonomie de l'activité au Cnam : Alain Wisner, Ombredane et Faverge",
            contenu:
              "Alain Wisner (chaire d'ergonomie du Cnam) opère une révolution copernicienne : l'analyse ergonomique met en évidence l'écart irréductible entre la tâche prescrite et l'activité réelle. André Ombredane et Jean-Marie Faverge publient en 1955 'L'analyse du travail', fondant la méthodologie d'observation clinique de terrain.",
            auteurs: ["Alain Wisner", "André Ombredane", "Jean-Marie Faverge"],
          },
          {
            titre: "Autonomie universitaire et essor de l'orientation",
            contenu:
              "1947 marque la création de la Licence de psychologie à l'université par Daniel Lagache, émancipant la psychologie de la tutelle de la philosophie et de la médecine. Dans l'orientation, John Holland développe le modèle RIASEC, tandis qu'au Cnam, Michel Huteau et Jean Guichard fondent l'accompagnement tout au long de la vie. En 1967, l'État crée l'ANPE.",
            auteurs: ["Daniel Lagache", "John Holland", "Michel Huteau", "Jean Guichard"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Période 4 (1970–Aujourd'hui) : Chômage, RPS, Modèles du Stress & Cliniques du Cnam",
        points: [
          {
            titre: "Chômage de masse, identité et les 5 fonctions latentes de l'emploi (Jahoda, Marienthal 1933)",
            contenu:
              "Dès 1933, l'étude de Marienthal (Marie Jahoda, Paul Lazarsfeld, Hans Zeisel) démontre que la privation d'emploi entraîne apathie, déstructuration temporelle et déchéance identitaire. Jahoda théorise les 5 fonctions latentes structurantes du travail : cadre temporel, contacts sociaux élargis, buts collectifs, statut social et activité régulière. Éric Hamraoui rappelle que l'adulte continue de se forger par le travail (allégorie des 3 tailleurs de pierre : tailler un caillou, faire un porche, bâtir une cathédrale). En 1991, la loi consacre le Bilan de compétences.",
            auteurs: ["Marie Jahoda", "Paul Lazarsfeld", "Éric Hamraoui"],
          },
          {
            titre: "Modélisation du stress et des RPS : Karasek, Siegrist, Maslach et Hirigoyen",
            contenu:
              "Robert Karasek (1979) modélise le Job Strain par la tension entre demande psychologique et latitude décisionnelle (marge de manœuvre), complété par le soutien social (Isostrain). Johannes Siegrist (1996) développe le modèle DER (Déséquilibre Effort-Récompense) centré sur la reconnaissance, l'estime et les perspectives. Herbert Freudenberger (1974) et Christina Maslach (1981, test MBI) décrivent le burn-out en 3 dimensions (épuisement, cynisme, perte d'accomplissement). Marie-France Hirigoyen (1998) théorise le harcèlement moral, inscrit dans la loi de 2002. En 2011, le rapport Gollac cartographie 6 axes de RPS.",
            auteurs: ["Robert Karasek", "Johannes Siegrist", "Christina Maslach", "Marie-France Hirigoyen", "Michel Gollac"],
          },
          {
            titre: "Les Cliniques du travail au Cnam : Dejours, Clot et Bobillier-Chaumon",
            contenu:
              "Christophe Dejours fonde la Psychodynamique du travail (Travail, usure mentale 1980, Souffrance en France 1998) : dialectique souffrance/plaisir, défenses collectives de métier, résonance symbolique et jugements de reconnaissance (utilité par la hiérarchie, beauté par les pairs). Yves Clot développe la Clinique de l'activité (La fonction psychologique du travail 1999) : activité empêchée, travail bien fait, genre professionnel et style, développement du pouvoir d'agir par autoconfrontation. Marc-Éric Bobillier-Chaumon anime la Clinique des usages : acceptation située des technologies numériques contre le déterminisme technique.",
            auteurs: ["Christophe Dejours", "Yves Clot", "Marc-Éric Bobillier-Chaumon"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Professionnalisation, Statut Légal (Loi 1985, RPPS), Déontologie & Étayage Clinique",
        points: [
          {
            titre: "Protection du titre (Loi du 25 juillet 1985) et inscription RPPS",
            contenu:
              "L'article 44 de la Loi du 25 juillet 1985 protège pénalement le titre de psychologue (Master 2 universitaire ou Titre RNCP niveau 7 du Cnam). Les psychologues disposent d'un numéro RPPS (Répertoire Partagé des Professionnels de Santé) : ils sont reconnus comme professionnels de santé mentale autonomes et indépendants issus des SHS, non assujettis à la prescription médicale d'intervention.",
          },
          {
            titre: "Code de déontologie des psychologues (1996, réactualisé 2012 / 2021)",
            contenu:
              "Articulé autour de 6 principes fondamentaux (Respect des droits de la personne et dignité, Compétence, Responsabilité et autonomie, Rigueur méthodologique, Intégrité et probité, Respect du but assigné) et 32 articles. Le respect de la dignité et le consentement éclairé constituent la boussole inaliénable du psychologue.",
          },
          {
            titre: "Les 4 démarches d'étayage clinique : Supervision vs APP vs Intervision vs Régulation",
            contenu:
              "1) Supervision : espace clinique personnel et régulier avec un tiers superviseur externe pour élaborer sur son rapport intime aux situations cliniques, ses doutes et ses résonances affectives (outil de travail fondamental) ; 2) Analyse des Pratiques Professionnelles (APP) : dispositif d'animation collective pour une équipe de praticiens de terrain ; 3) Intervision : partage collégial horizontal et autogéré entre pairs sans tiers ; 4) Régulation : traitement d'urgence des conflits interpersonnels et des blocages de coopération au sein d'une équipe.",
            auteurs: ["Dr. Prisca Lutumba"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Évolution Historique de la Psychologie du Travail en 4 Grandes Périodes",
        colonnes: ["Période", "Auteurs Phares", "Paradigme Dominant", "Finalité de l'Intervention"],
        lignes: [
          {
            axe: "1879–1914 : Origines",
            valeurs: [
              "Wundt, Binet, Piéron, Taylor, Münsterberg, Lahy",
              "Psychologie métrique, laboratoire expérimental & rationalisation industrielle",
              "Mesurer les aptitudes pour adapter l'homme au poste ('The right man in the right place')",
            ],
          },
          {
            axe: "1914–1939 : Psychotechnique",
            valeurs: [
              "Yerkes (Army Alpha/Beta), Piéron (INOP 1928), Lahy",
              "Psychotechnique des aptitudes stables et prédictives ; sélection militaire et civile",
              "Trier, orienter et affecter les travailleurs ; fortes critiques syndicales ('sélection = élimination')",
            ],
          },
          {
            axe: "1945–1970 : Trente Glorieuses",
            valeurs: [
              "Mayo (Hawthorne), Lewin, Tavistock, Wisner (Cnam), Lagache (Licence 1947)",
              "Relations humaines, dynamique de groupe, sociotechnique & Ergonomie de l'activité",
              "Interroger l'organisation comme variable à transformer ; distinguer tâche prescrite et activité réelle",
            ],
          },
          {
            axe: "1970–Aujourd'hui : Cliniques & Droit",
            valeurs: [
              "Jahoda, Karasek, Siegrist, Dejours, Clot, Bobillier-Chaumon, Loi 1985",
              "Cliniques du travail (Psychodynamique, Activité, Usages), santé psychique et déontologie",
              "Transformer le travail réel, soigner la souffrance, développer le pouvoir d'agir et protéger la personne",
            ],
          },
        ],
      },
      {
        titre: "Les 4 Dispositifs d'Étayage Clinique de la Pratique Professionnelle",
        colonnes: ["Dispositif", "Public & Cadre", "Finalité Clinique", "Rôle du Tiers / Animateur"],
        lignes: [
          {
            axe: "Supervision",
            valeurs: [
              "Individuel ou très petit groupe de psychologues",
              "Élaborer sur son rapport personnel au travail, analyser ses résonances affectives et transferts",
              "Superviseur expérimenté, extérieur et garant de l'élaboration psychique (outil de travail vital)",
            ],
          },
          {
            axe: "Analyse des Pratiques (APP)",
            valeurs: [
              "Équipe pluridisciplinaire (soignants, éducateurs, travailleurs sociaux, encadrement)",
              "Analyser collectivement des situations de terrain pour enrichir les compétences professionnelles",
              "Psychologue ou intervenant tiers, animateur méthodologique garant du cadre de bienveillance",
            ],
          },
          {
            axe: "Intervision",
            valeurs: [
              "Groupe de pairs praticiens de même niveau hiérarchique et statutaire",
              "Échanges d'expériences, soutien confraternel et mutualisation d'outils",
              "Aucun tiers : fonctionnement horizontal, collégial, paritaire et symétrique",
            ],
          },
          {
            axe: "Régulation",
            valeurs: [
              "Collectif de travail ou service en situation de crise organisationnelle",
              "Dénouer les conflits relationnels, clarifier les rôles et rétablir la coopération",
              "Régulateur / Médiateur externe intervenant ponctuellement sur la dynamique du groupe",
            ],
          },
        ],
      },
      {
        titre: "Confrontation Épistémologique : Clinique Cnam vs Approche Métrique PTO",
        colonnes: ["Dimension", "Clinique du Travail (Cnam)", "Psychologie des Organisations (Nord / PTO)"],
        lignes: [
          {
            axe: "Méthodologie privilégiée",
            valeurs: [
              "Méthodes qualitatives de terrain : entretiens cliniques, observations fines, autoconfrontations",
              "Méthodes quantitatives : questionnaires standardisés, modélisations statistiques, enquêtes de climat",
            ],
          },
          {
            axe: "Statut du sujet",
            valeurs: [
              "Sujet singulier, auteur de son activité, doté d'une parole propre et d'une histoire vécue",
              "Échantillon d'opérateurs regroupés par variables d'attitudes, scores psychométriques et traits",
            ],
          },
          {
            axe: "Conception du travail",
            valeurs: [
              "Épreuve du réel, espace de subjectivation, lieu de souffrance et de plaisir, opératrice de santé",
              "Ensemble de tâches définies, environnement d'objectifs, leviers de performance et d'engagement",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais confondre 'Supervision' et 'Analyse des Pratiques Professionnelles (APP)'",
        erreurCourante: "Utiliser indifféremment les deux termes ou croire que l'APP remplace la supervision du psychologue.",
        rectificationAttendue:
          "La supervision est un espace d'élaboration intime sur son propre réel de praticien face à un superviseur expérimenté (outil individuel de santé et de déontologie). L'APP est un dispositif d'équipe pluridisciplinaire animé par le psychologue au bénéfice des professionnels d'une structure.",
        contexte: "Section 6 & Pratique déontologique",
      },
      {
        titre: "Le psychologue n'est pas un paramédical sous prescription médicale",
        erreurCourante: "Écrire qu'un médecin prescrit des séances de psychologie ou un protocole d'intervention en entreprise.",
        rectificationAttendue:
          "En vertu de la Loi du 25 juillet 1985 et de son enregistrement RPPS, le psychologue est un professionnel de santé mentale indépendant issu des sciences humaines et sociales. Il conserve la totale maîtrise de ses outils, du nombre de séances et de sa démarche diagnostique.",
        contexte: "Section 6 — Cadre légal et RPPS",
      },
      {
        titre: "Distinguer le modèle de Karasek (Job Strain) du modèle de Siegrist (DER / ERI)",
        erreurCourante: "Attribuer la notion de reconnaissance à Karasek ou réduire Siegrist à la charge de travail.",
        rectificationAttendue:
          "Karasek évalue la tension au travail par le croisement Demande psychologique / Latitude décisionnelle (contrôle) + Soutien social. Siegrist se focalise sur le déséquilibre entre l'Effort consenti (surinvestissement) et la Récompense symbolique/matérielle obtenue (estime, salaire, perspectives de carrière).",
        contexte: "Section 5 — Modèles du stress",
      },
      {
        titre: "Accueil clinique du burn-out : investigation de l'organisation vs diagnostic psychiatrique",
        erreurCourante: "Poser un diagnostic médical précipité ou réduire le burn-out à une fragilité individuelle du salarié.",
        rectificationAttendue:
          "Le psychologue clinicien du travail accueille la vérité de la souffrance sans jugement, explore le 'comment' l'organisation du travail et l'activité empêchée ont épuisé le sujet, et évalue méthodiquement le risque suicidaire (formation sentinelle ARS) sans psychologiser les dysfonctionnements managériaux.",
        contexte: "Section 1 — Expérience de pensée 2025",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage Épistémologique & Expériences de Pensée (1908 vs 2025)]
[00:01:05] DR. PRISCA LUTUMBA : « C'est Auguste Comte qui disait qu'on connaît bien une science quand on connaît son histoire. C'est important de savoir, quand vous allez mettre les deux pieds dans la psychologie du travail, d'où vous venez. En étant psychologue du travail issu du Cnam, donc psychologue clinicien du travail, connaître votre histoire généalogique permet de voir d'où l'on parle quand on prend la parole. »
[00:21:40] DR. PRISCA LUTUMBA : « La psychologie du travail est une science humaine et sociale. Comparativement à des physiciens, ils vont dire que nous avons une 'science molle'. Il faut m'expliquer en quoi la complexité de l'humain est une science molle ! Nous sommes dans le dur. Ne nous laissons pas minimiser, c'est une science rigoureuse. »
[00:19:15] DR. PRISCA LUTUMBA : « En 2025, quand vous recevez quelqu'un en burn-out, on ne pose pas de diagnostic hâtif. On accueille la souffrance, on écoute la vérité du sujet, et on cherche à comprendre le 'comment' on a pu en arriver là en interrogeant la manière dont le travail est organisé. Et on évalue le risque vital et suicidaire — je vous encourage d'ailleurs à suivre la formation sentinelle de l'ARS. »

[2. Origines (1879-1914) : Naissance de la Psychologie Industrielle & Méthodes Cnam]
[00:36:20] DR. PRISCA LUTUMBA : « S'il y a une phrase de conclusion à retenir sur les origines, c'est que la psychologie du travail naît d'une rencontre entre une psychologie qui cherche sa légitimité scientifique par la mesure et l'expérimentation, et une industrie qui cherche à augmenter son rendement. »
[00:40:15] DR. PRISCA LUTUMBA : « Dans la vision taylorienne, l'adage fondamental que vous allez souvent entendre est : 'The right man in the right place' — l'homme qu'il faut à la place qu'il faut, dans une logique d'ajustement mécanique au poste. »
[00:43:50] DR. PRISCA LUTUMBA : « Au Cnam, en psychologie clinique du travail en tout cas, nous sommes presque exclusivement sur des méthodes qualitatives. Certains de nos collègues en psychologie des organisations (PTO) ou nos confrères nordiques font beaucoup de quantitatif avec des stats et des questionnaires. Mais ce que la mesure quantitative ne mesure pas, ce sont les capacités d'adaptation et le rapport intime au travail de l'humain. »

[3. L'Âge Psychotechnique (1914-1939) & Débats Critiques au 41 rue Gay-Lussac]
[00:37:45] DR. PRISCA LUTUMBA : « En 1917, Robert Yerkes dirige la passation de tests collectifs pour l'armée américaine : c'est la première démonstration de masse de l'utilité des tests pour affecter des hommes aux postes selon leurs aptitudes. »
[00:41:20] DR. PRISCA LUTUMBA : « En 1928, c'est la création de l'INOP sous l'impulsion d'Henri Piéron. Cet institut va donner naissance à l'INETOP au 41 rue Gay-Lussac, là où se trouve le laboratoire CRTD et où siège notre titulaire de chaire de psychologie du travail au Cnam, Marc-Éric Bobillier-Chaumon. C'est une adresse à retenir comme un pèlerinage : 41 rue Gay-Lussac, 3e étage ! »
[00:46:10] DR. PRISCA LUTUMBA : « L'entre-deux-guerres est l'âge de la psychotechnique, mais cela déclenche trois niveaux de débats : scientifique sur la validité prédictive, syndical contre le tri patronal ('sélection = élimination'), et épistémologique car une psychologie centrée sur l'individu isolé peine à rendre compte de l'activité réelle et des collectifs. »

[4. Chômage, Fonctions Latentes de l'Emploi & Modèles du Stress (1970 à nos jours)]
[01:04:10] DR. PRISCA LUTUMBA : « Les antécédents fondateurs sur le chômage, c'est l'étude de Marienthal en 1933 dans un village autrichien par Marie Jahoda. Elle théorise sur les 5 fonctions latentes de l'emploi : structuration du temps, contacts sociaux hors famille, but collectif, statut social et activité régulière. Quand on perd son travail, on perd cette structure identitaire. »
[01:08:30] DR. PRISCA LUTUMBA : « Karasek évalue le stress par l'écart entre la demande psychologique et la latitude décisionnelle (marge de manœuvre). Johannes Siegrist le complète avec son modèle du déséquilibre entre effort consenti et récompense obtenue, car dans Karasek on ne voyait pas le levier de reconnaissance de l'individu. »
[01:11:50] DR. PRISCA LUTUMBA : « Pour la psychodynamique du travail, c'est Christophe Dejours avec son ouvrage principal : 'Travail, usure mentale' — c'est la référence du cours pour comprendre la souffrance, le plaisir au travail, les défenses collectives et la reconnaissance. Et pour la clinique de l'activité, c'est Yves Clot avec 'La fonction psychologique du travail' et le développement du pouvoir d'agir. »

[5. Professionnalisation, Statut Légal RPPS & Impératif Déontologique de Supervision]
[01:15:25] DR. PRISCA LUTUMBA : « En juillet 1985 est votée la loi de protection du titre de psychologue. Nous avons un numéro RPPS au répertoire partagé des professionnels de santé : nous sommes professionnels de santé mentale autonomes et indépendants ! Un médecin ne nous prescrit pas un protocole ni un nombre de séances en entreprise, car nous sommes issus des sciences humaines et sociales et autonomes dans notre pratique. »
[01:20:40] DR. PRISCA LUTUMBA : « Quand vous vous installerez à votre compte, sachez que nous avons le même code APE que les sophrologues, mais aussi textuellement que les voyantes et les marabouts : 'sciences humaines non classées ailleurs' ! Ne tombons pas dans le piège de la concurrence avec les coachs ou les infirmiers de pratique avancée : valorisons notre rigueur universitaire bac+5 et soyons ambassadeurs de notre discipline. »
[01:23:15] DR. PRISCA LUTUMBA : « Est-ce qu'il faut adapter l'homme au travail ou transformer le travail ? La réponse Cnam est sans équivoque : on ne va pas demander à l'homme d'être plus fort pour encaisser le travail de trois personnes ! Quand on intervient, oui on répond à une commande d'employeur commanditaire, mais notre fondement numéro un est la protection de la personne et de sa dignité. »
[01:29:10] DR. PRISCA LUTUMBA : « Je vous encourage vivement à vous faire superviser. C'est un outil de travail fondamental du psychologue ! La supervision permet, face à la matière humaine et au réel du travail que vous détricotez en entretien, d'élaborer sur votre propre rapport aux situations. Ne confondez pas cela avec l'analyse des pratiques (APP), qui est un travail d'équipe, ni avec la régulation ou l'intervision. »`,
    bibliographieCitee: [
      {
        titre: "Une profession balkanisée : les psychologues du travail en France (1910-1990)",
        auteur: "Thomas Le Bianic",
        annee: "2004",
        remarque: "Étude socio-historique fondamentale sur l'INOP, la conquête du titre de 1985 et l'histoire de la chaire du Cnam.",
      },
      {
        titre: "Les Chômeurs de Marienthal",
        auteur: "Marie Jahoda, Paul Lazarsfeld, Hans Zeisel",
        annee: "1933 (Trad. Minuit 1981)",
        remarque: "L'enquête sociologique fondatrice sur les dégâts psychiques du chômage et les fonctions latentes de l'emploi.",
      },
      {
        titre: "Travail, usure mentale : de la psychopathologie à la psychodynamique du travail",
        auteur: "Christophe Dejours",
        annee: "1980 (Nouvelle éd. Bayard 2000)",
        remarque: "L'ouvrage de référence cité par Dr. Lutumba sur les défenses collectives et la souffrance au travail.",
      },
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999 (PUF)",
        remarque: "Texte socle de la Clinique de l'activité sur le travail bien fait, le genre professionnel et le pouvoir d'agir.",
      },
      {
        titre: "Psychology and Industrial Efficiency",
        auteur: "Hugo Münsterberg",
        annee: "1913 (Houghton Mifflin)",
        remarque: "Acte de naissance de la psychologie industrielle moderne appliquant la psychométrie au travail.",
      },
      {
        titre: "Le Harcèlement moral : la violence perverse au quotidien",
        auteur: "Marie-France Hirigoyen",
        annee: "1998 (Syros)",
        remarque: "L'ouvrage clinique ayant conduit à la reconnaissance législative du harcèlement en 2002.",
      },
      {
        titre: "Code de déontologie des psychologues",
        auteur: "Commission Nationale Consultative de Déontologie des Psychologues (CNCDP)",
        annee: "1996 (Réactualisé 2012 / 2021)",
        remarque: "Cadre éthique et juridique régissant l'indépendance, la supervision et la dignité de la personne.",
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 4 : SPÉCIFICITÉS DE L'ACCOMPAGNEMENT EN MILIEU DE TRAVAIL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s4",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 4,
    titre: "Séance 4 — Spécificités de l'Accompagnement en Milieu de Travail & Posture Clinique du Psychologue",
    sousTitre: "De la cellule d'écoute à l'analyse du travail réel : niveaux de prévention, dispositifs d'étayage et déontologie de l'intervention",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "7 novembre 2026",
    format: "presentiel",
    dureeEnregistrement: "2 h 01 min (Regroupement présentiel, Salle 2 - Sadi Carnot)",
    resumeExecutif: [
      "Déplacement clinique de la commande : Face à une direction demandant une « cellule d'écoute » suite à des arrêts maladie répétés, le clinicien refuse de cibler l'individu et de violer le secret médical (l'employeur n'a pas accès aux motifs médicaux). Il déplace l'analyse vers l'organisation, les arbitrages de métier et l'écart entre travail prescrit et travail réel.",
      "L'analyse de la demande comme premier acte de transformation : Contrairement à un audit technique qui valide passivement un cahier des charges, l'analyse clinique de la demande questionne le commanditaire, fait émerger les enjeux non-dits et commence déjà à transformer les représentations de la gouvernance (« poser le problème, c'est déjà commencer à le résoudre »).",
      "PTO vs Cliniques du travail au Cnam : La PTO anglo-saxonne use d'une approche hypothético-déductive et quantitative par questionnaires posés a priori ; le Cnam revendique une démarche inductive et qualitative fondée sur l'observation de l'activité réelle et l'écoute du vécu des salariés (« le réel de l'activité englobe ce qu'on fait, ce qu'on ne peut pas faire, ce qu'on voudrait faire et ce qu'on fait pour ne pas faire », selon Yves Clot).",
      "La santé comme pouvoir d'agir et créativité : La santé n'est pas l'absence de symptômes mais la préservation d'une marge de manœuvre, du pouvoir d'agir et de la capacité à imprimer son style professionnel (héritage de Saint-Alban, Le Guillant, Sivadon, Veil, Clot et Dejours).",
      "Modélisation des 3 niveaux de prévention (le cas princeps de l'EHPAD 2020-2024) : Prévention primaire (agir à la conception sur les causes organisationnelles, ex: poser des rails lève-malade au plafond et budgéter des postes d'aides-soignants dès l'ouverture), prévention secondaire (former et équiper face aux signaux de fatigue), prévention tertiaire (réparer dans l'urgence après l'explosion des arrêts ou des violences).",
      "Cartographie des 4 dispositifs collectifs d'étayage : Régulation d'équipe (traitement des tensions, ligne hiérarchique présente admise sous réserve de focalisation sur le tiers-travail), APP (pairs stricts sans hiérarchie), Intervision (pairs sans superviseur) et Supervision (analyse de la posture clinique avec un superviseur senior extérieur).",
      "Déontologie et règles d'or de restitution en entreprise : Respect inaliénable de la personne (art. 1er du Code CNCDP, refontes 2012/2021). Bannir formellement tout verbatim individuel dans les rapports institutionnels (pour protéger les salariés contre les représailles de pairs ou du management). Pratique impérative de l'intervention en binôme.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez la formule : 'analyser la demande en milieu professionnel, c'est déjà une action de transformation' » ou « En quoi le travail fait-il tiers dans la régulation des relations professionnelles selon les cliniques du travail ? »).",
        "Option B : Étude de cas clinique (ex: Face à une direction générale sollicitant l'installation d'une cellule d'écoute suite à une épidémie d'arrêts maladie, élaborez la méthodologie d'intervention du psychologue du travail, de l'analyse de la demande à la restitution sans verbatims).",
      ],
      recommandationsNotation:
        "Dr. Lutumba sanctionne impitoyablement trois erreurs en copie : 1) Confondre le rôle de psychologue du travail avec un psychothérapeute de cabinet individuel qui ferait de l'écoute compassionnelle hors-travail, 2) Confondre un groupe d'APP (pairs stricts sans hiérarchie) avec une régulation d'équipe, 3) Insérer des verbatims de salariés dans un rapport de restitution en entreprise. Valoriser les concepts précis : 'tiers-travail', 'résonance symbolique', 'travail émotionnel (Hochschild / Gollac)', 'pouvoir d'agir', 'prévention primaire à la conception'.",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire : Code de déontologie des psychologues (CNCDP)",
        typeTravail: "lecture",
        consigneExacte:
          "Prendre connaissance du Code de déontologie réactualisé (notamment son principe premier sur le respect de la personne dans sa dimension psychique et physique). Se référer aux livrets thématiques de la CNCDP (les écrits du psychologue, le secret professionnel et le consentement éclairé).",
        echeance: "Avant la prochaine séance",
        modaliteRendu: "Appropriation personnelle en vue du dossier de fin d'études et de l'agrément.",
        recommandationsProf: "Annexer systématiquement le Code de déontologie à vos propositions d'intervention en entreprise.",
      },
      {
        titre: "Approfondissement : Le Travail Émotionnel (Arlie Russell Hochschild) & Rapport Gollac",
        typeTravail: "recherche",
        consigneExacte:
          "Consulter les travaux d'Arlie Hochschild sur le 'travail émotionnel' (Emotional Labor) et repérer comment le rapport du collège d'expertise présidé par Michel Gollac (2011) l'intègre comme l'un des 6 grands facteurs de risques psychosociaux (RPS).",
        echeance: "Séance 5",
        modaliteRendu: "Notes de synthèse pour enrichir l'analyse des métiers de service et d'accueil.",
        recommandationsProf: "Excellent concept discriminant pour l'Option B d'examen.",
      },
      {
        titre: "Préparation de la posture pour l'Agrément professionnel du Titre RNCP",
        typeTravail: "exercice_ad",
        consigneExacte:
          "S'entraîner à expliciter sa posture d'intervention : pourquoi refuser d'intervenir comme psychologue dans son propre service ? Pourquoi privilégier le travail en binôme ? Comment borner son mandat face à la commande managériale ?",
        echeance: "Tout au long du semestre",
        modaliteRendu: "Réflexivité continue sur son carnet de bord clinique.",
        recommandationsProf: "Le jury d'agrément évalue avant tout votre solidité éthique face aux pressions de l'institution.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Clinique & Déplacement de la Demande : Le Travail comme Tiers Médiateur",
        points: [
            {
              titre: "L'étude de cas introductive : le piège de la « cellule d'écoute »",
              contenu:
                "Lorsqu'une direction fait appel à un psychologue du travail pour installer une cellule d'écoute suite à des arrêts maladie en cascade, elle pose un acte mais cible d'emblée l'individu. Qu'elle agisse par désarroi sincère ou pour 'ouvrir le parapluie' (se couvrir juridiquement face à l'obligation de sécurité de l'article L. 4121-1), le psychologue refuse de réduire la souffrance à une défaillance personnelle ou à de la victimisation. Il déplace le curseur vers l'organisation, les arbitrages de métier et l'analyse de l'activité réelle.",
            },
            {
              titre: "Cadre légal et secret médical absolu des arrêts de travail",
              contenu:
                "Dr. Lutumba rappelle un point de droit méconnu : l'employeur n'a JAMAIS accès au motif médical d'un arrêt de travail (volet médical réservé exclusivement au médecin-conseil de la CPAM). Même lors d'un contrôle patronal à domicile, le médecin contrôleur mandaté confirme uniquement la justification administrative sans divulguer la moindre pathologie. Lors des entretiens cliniques, le psychologue accueille la parole libre sans jamais se faire l'auxiliaire de contrôle de la direction.",
            },
            {
              titre: "La Résonance Symbolique : scènes personnelle et professionnelle",
              contenu:
                "Théorisée par Christophe Dejours, la résonance symbolique désigne le phénomène par lequel la scène professionnelle actuelle réactive des traumatismes, des rivalités ou des blessures narcissiques non résolues sur la scène personnelle et familiale antérieure (ex: une salariée revivant face à sa cheffe de service le rejet de sa mère ou de sa sœur). Le psychologue accueille ce vécu mais réétablit immédiatement l'altérité et le tiers-travail ('votre manageuse n'est ni votre mère ni votre sœur ; quel est son rôle d'organisation ?'). Si le besoin d'élaborer sur l'histoire intime persiste, il réoriente vers un psychologue clinicien extérieur.",
              auteurs: ["Christophe Dejours"],
            },
        ],
      },
      {
        numero: "2",
        titre: "Cartographie Épistémologique : PTO vs Cliniques du Travail du Cnam",
        points: [
          {
            titre: "Psychologie du Travail et des Organisations (PTO) : la tradition hypothético-déductive",
            contenu:
              "Issue de la psychotechnique d'après-guerre (sélection, orientation, adéquation homme-poste de Taylor et Münsterberg), de la psychologie sociale (dynamique de groupe de Lewin, leadership) et de la psychologie de la santé, la PTO use d'une méthodologie anglo-saxonne quantitative : questionnaires standardisés, modèles prédictifs a priori et analyses corrélationnelles.",
            auteurs: ["Kurt Lewin", "Hugo Münsterberg"],
          },
          {
            titre: "Les Cliniques du travail au Cnam : la démarche inductive qualitative",
            contenu:
              "Fondée sur l'observation minutieuse de l'activité réelle et l'écoute de la parole vivante des salariés, la clinique du travail part du terrain pour conceptualiser. La santé y est définie non comme l'absence de symptômes, mais comme le pouvoir d'agir, la marge de manœuvre et la capacité à exprimer sa créativité (héritage de Saint-Alban, Le Guillant, Sivadon, Veil, Clot et Dejours).",
            auteurs: ["Louis Le Guillant", "Paul Sivadon", "Claude Veil"],
          },
          {
            titre: "Modélisation de l'activité selon Yves Clot : Tâche, Activité et Réel de l'Activité",
            contenu:
              "Enseignée au Cnam en PST106, la clinique de l'activité décompose l'action : 1) La Tâche (le travail prescrit par l'organisation) ; 2) L'Activité réalisée (ce qui est mis en œuvre par le sujet face aux contraintes) ; 3) Le Réel de l'Activité (ce qui ne se fait pas, ce qu'on voudrait faire mais qu'on ne peut pas, ce qu'on est empêché de faire, et ce qu'on fait pour ne pas faire). La souffrance naît de l'empêchement du beau travail.",
            auteurs: ["Yves Clot"],
          },
          {
            titre: "Clinique des Usages et technologies émergentes (IA agentique & technostress)",
            contenu:
              "Portée par Marc-Éric Bobillier-Chaumon (PST124), la clinique des usages analyse les transformations introduites par les technologies (IA agentique, scraping automatisé, reporting continu). L'enjeu anthropocentré est de maintenir l'outil au service de l'activité humaine et d'éviter que le salarié ne devienne l'exécutant asservi d'un algorithme opaque.",
            auteurs: ["Marc-Éric Bobillier-Chaumon"],
          },
        ],
      },
      {
        numero: "3",
        titre: "De la Commande à la Demande & Typologie des Niveaux de Prévention",
        points: [
          {
            titre: "« Analyser la demande, c'est déjà une action de transformation »",
            contenu:
              "La commande est le contrat formel (devis, mandat d'intervention signé). La demande est l'expression latente d'un dysfonctionnement organisationnel. En questionnant le commanditaire pour l'amener à reformuler son besoin, le psychologue amorce immédiatement une décentration des acteurs : 'poser le problème de façon clinique, c'est déjà contribuer à le résoudre'.",
          },
          {
            titre: "Illustration des 3 niveaux de prévention à travers le cas de l'EHPAD (Dr. Lutumba)",
            contenu:
              "1) Prévention primaire (agir à la conception en 2020) : installer des rails lève-malade au plafond dans toutes les chambres dès l'ouverture et budgéter des postes d'aides-soignants pour anticiper la dépendance à 4 ans ; 2) Prévention secondaire (former en 2022) : mettre en place des groupes d'analyse des pratiques et des fiches d'alerte RH face aux premières tensions ; 3) Prévention tertiaire (réparer la crise en 2024) : intervenir en urgence après l'explosion des arrêts maladie et des violences entre soignants épuisés.",
          },
          {
            titre: "Dispositifs individuels d'accompagnement : maintien dans l'emploi & souffrance",
            contenu:
              "Appuyé sur les travaux de Dominique Lhuilier, le maintien dans l'emploi s'entend au sens large (repositionnement, reconversion, accompagnement des transitions). Les consultations souffrance au travail (Marie Pezé, Frédérique Debout) recentrent l'élaboration sur le travail sans dériver vers une psychothérapie privée décontextualisée.",
            auteurs: ["Dominique Lhuilier", "Marie Pezé", "Frédérique Debout"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Déontologie, Posture d'Intervention & Règles d'Or des Restitutions",
        points: [
          {
            titre: "Statut légal RPPS et indépendance professionnelle",
            contenu:
              "Le psychologue est un professionnel de la santé mentale et des sciences humaines (Loi du 25 juillet 1985, art. 44). Il est autonome et n'exerce sous aucune subordination médicale (le médecin ne lui prescrit ni son protocole ni le nombre de ses séances). Respect inaliénable de la personne (art. 1er du Code CNCDP réactualisé en 2012 et 2021-2022).",
          },
          {
            titre: "Règle d'or absolue : proscription des verbatims dans les rapports en entreprise",
            contenu:
              "Ne JAMAIS insérer de citations directes ou de verbatims individuels dans un rapport institutionnel d'entreprise. Même prétendument anonymisés, les tics de langage, les formulations ou les revendications permettent aux collègues et managers d'identifier immédiatement le salarié, l'exposant à des représailles patronales directes ou diffuses. La restitution doit formuler des constats collectifs et objectivés.",
          },
          {
            titre: "Le piège juridique de la qualification de « harcèlement moral »",
            contenu:
              "Le psychologue accueille la plainte subjective mais rappelle que 'harcèlement' est une qualification juridique pénale et prud'homale réservée souverainement au juge. Les médecins qui délivrent des arrêts libellés 'pour harcèlement au travail' sont régulièrement condamnés par l'Ordre des Médecins pour immixtion et attestation de faits non constatés directement en entreprise. Le psychologue requalifie la situation en termes de dégradation des conditions de travail et de qualité empêchée.",
          },
          {
            titre: "L'impératif du travail en binôme & éthique du Care",
            contenu:
              "Intervenir systématiquement à deux (deux psychologues ou un binôme psychologue/ergonome) constitue la garantie majeure contre l'isolement, les pressions de la direction et la perte de neutralité. Intégrer également le concept de Travail Émotionnel (Arlie Hochschild, indicateurs Gollac) et de Care (Pascale Molinier) dans l'analyse des métiers du soin et de la relation client.",
            auteurs: ["Arlie Russell Hochschild", "Michel Gollac", "Pascale Molinier"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Matrice Comparative des 4 Dispositifs Collectifs d'Étayage Clinique",
        description: "Tableau de référence de Dr. Lutumba distinguant la régulation d'équipe, l'APP, l'intervision et la supervision",
        colonnes: ["Dispositif Collectif", "Composition & Participants", "Présence Hiérarchique ?", "Finalité Clinique & Cadre de Travail"],
        lignes: [
          {
            axe: "Régulation d'Équipe",
            valeurs: [
              "Équipe opérationnelle confrontée à un blocage ou un conflit relationnel",
              "Oui, possible et souvent nécessaire (détient les leviers organisationnels)",
              "Dénouer les tensions en les ramenant impérativement sur le tiers-travail (procédures, flux, arbitrages)",
            ],
          },
          {
            axe: "Analyse des Pratiques (APP)",
            valeurs: [
              "Groupe homogène de pairs de même métier (ex: éducateurs, soignants)",
              "NON, FORMELLEMENT EXCLUE (aucun supérieur ni subordonné)",
              "Élaboration sur le geste professionnel et l'éthique de métier avec un tiers animateur garant",
            ],
          },
          {
            axe: "Intervision",
            valeurs: [
              "Collectif restreint de pairs praticiens (ex: 6 à 8 psychologues du travail)",
              "Non (espace autogéré de collègues de même niveau)",
              "Partage horizontal d'expériences et de cas complexes sans superviseur attitré",
            ],
          },
          {
            axe: "Supervision",
            valeurs: [
              "Praticien individuel ou équipe accompagnée par un superviseur senior extérieur",
              "Non (cadre déontologique confidentiel externe)",
              "Analyse approfondie de la posture clinique, du contre-transfert et des blocages méthodologiques",
            ],
          },
        ],
      },
      {
        titre: "Modélisation des 3 Niveaux de Prévention dans les Organisations (Cas de l'EHPAD)",
        description: "Application concrète des niveaux de prévention de santé publique à la clinique du travail",
        colonnes: ["Niveau de Prévention", "Temporalité & Logique", "Illustration Clinique : Cas de l'EHPAD (Dr. Lutumba)"],
        lignes: [
          {
            axe: "Prévention Primaire",
            valeurs: [
              "Agir en amont absolu dès la conception sur les causes organisationnelles",
              "Installation de rails lève-malade au plafond dès l'ouverture en 2020 et budgétisation de postes soignants supplémentaires pour 2024",
            ],
          },
          {
            axe: "Prévention Secondaire",
            valeurs: [
              "Accompagner, former et équiper face aux signaux précoces de fatigue",
              "Formations à la manutention douce, groupes de parole et création de fiches d'alerte RH en 2022",
            ],
          },
          {
            axe: "Prévention Tertiaire",
            valeurs: [
              "Réparer dans l'urgence la crise aiguë, les violences ou l'explosion des arrêts",
              "Gestion de crise en 2024 suite au burn-out généralisé et à la séquestration d'un soignant par un collègue excédé",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais insérer de verbatims individuels dans un rapport institutionnel d'entreprise",
        erreurCourante: "Citer des phrases exactes d'opérateurs dans la restitution sous prétexte qu'elles sont anonymisées.",
        rectificationAttendue:
          "Les collègues et le management reconnaissent immédiatement le style et les revendications de l'auteur. Le psychologue restitue des processus collectifs, des défaillances de métier et des faits objectivés, jamais des verbatims individualisés qui exposent les salariés à des sanctions.",
        contexte: "Section 4 — Déontologie & Restitution",
      },
      {
        titre: "Ne pas qualifier juridiquement un comportement de « harcèlement moral »",
        erreurCourante: "Valider en tant que psychologue ou appuyer un certificat médical libellé 'harcèlement moral'.",
        rectificationAttendue:
          "Le harcèlement moral est une qualification juridique relevant de la compétence exclusive du juge. Le psychologue analyse la souffrance éthique, la dégradation objective des conditions de travail et la qualité empêchée, sans usurper le mandat judiciaire.",
        contexte: "Section 4 — Cadre juridique et déontologie",
      },
      {
        titre: "Ne jamais confondre l'Analyse des Pratiques (APP) avec la Régulation d'Équipe",
        erreurCourante: "Convoquer un manager hiérarchique dans une séance d'APP ou prétendre que l'APP sert à régler un conflit d'équipe.",
        rectificationAttendue:
          "L'APP est réservée exclusivement aux pairs de même métier sans aucun lien hiérarchique pour permettre l'exposition de la vulnérabilité professionnelle. Le traitement des conflits avec la direction relève de la Régulation d'équipe.",
        contexte: "Section 3 & Tableau des dispositifs",
      },
      {
        titre: "Proscrire l'expression « suicide réussi » et refuser la déflexion externe",
        erreurCourante: "Parler de 'suicide réussi' ou attribuer le suicide sur le lieu de travail à des causes purement conjugales ou privées.",
        rectificationAttendue:
          "Employer uniquement les termes 'suicide' ou 'tentative de suicide' (ou 'suicide blanc' selon Marie Pezé). Réinternaliser systématiquement l'analyse du travail : pourquoi l'organisation a-t-elle laissé le salarié isolé et sans ressource face à l'épreuve ?",
        contexte: "Section 4 — Clinique et vocabulaire",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. L'illusion de la « cellule d'écoute » et le secret médical des arrêts de travail]
[00:01:32] DR. PRISCA LUTUMBA : « Dans la vraie vie professionnelle, les demandes vous parviennent très souvent sous cette forme : "J'ai plusieurs arrêts maladie dans le service, mettez-moi une cellule d'écoute". En formulant cela, l'employeur cible immédiatement l'individu. Notre premier rôle de psychologue du travail est de déplacer le curseur : interroger l'organisation, les conditions réelles de l'activité, et l'écart entre le travail prescrit et le travail réel. »
[00:09:42] DR. PRISCA LUTUMBA : « Rappelez-vous que l'employeur n'a JAMAIS accès au motif médical de l'arrêt de travail : le secret médical est absolu ! Même en cas de contrôle médical patronal à domicile, le médecin contrôleur vérifie uniquement la présence du salarié et la régularité administrative, sans jamais transmettre le moindre diagnostic à l'employeur. Quand une direction vous affirme "ils sont tous en arrêt pour dépression", ce sont des suppositions managériales, pas des faits médicaux avérés. »

[2. PTO vs Cliniques du Travail du Cnam & le Réel de l'Activité selon Yves Clot]
[00:22:13] DR. PRISCA LUTUMBA : « La grande différence entre la PTO traditionnelle et les Cliniques du travail du Cnam réside dans la démarche : la PTO est hypothético-déductive et quantitative par questionnaires posés a priori ; notre approche est inductive et qualitative. Nous partons du terrain et de l'écoute du vécu des salariés pour remonter vers la conceptualisation du travail réel. »
[00:24:05] DR. PRISCA LUTUMBA : « Avec Yves Clot en PST106, nous apprenons que le réel de l'activité ne se résume pas à ce qui est réalisé sous nos yeux : il comprend aussi ce que le travailleur n'a pas pu faire, ce qu'il a été empêché de faire, ce qu'il aurait voulu faire, et ce qu'il fait pour ne pas faire ! La santé n'est pas l'absence de symptômes : elle réside dans la préservation du pouvoir d'agir et de la marge de manœuvre. »

[3. La Résonance Symbolique (Dejours) et le Tiers-Travail]
[00:39:18] DR. PRISCA LUTUMBA : « La résonance symbolique théorisée par Christophe Dejours est un point fondamental : c'est le phénomène par lequel la scène professionnelle actuelle réactive des blessures ou relations d'objet issues de la scène personnelle et familiale antérieure. Face à une salariée qui s'effondre en voyant dans sa manageuse l'incarnation de sa mère tyrannique, notre posture est de réintroduire l'altérité et le tiers-travail : "votre manageuse n'est ni votre mère ni votre sœur ; de quoi avez-vous besoin pour réaliser votre travail avec elle ?". Si elle souhaite élaborer sur son passé, nous l'orientons vers un psychologue clinicien extérieur. »

[4. Commande vs Demande & les 3 Niveaux de Prévention à l'EHPAD]
[01:00:19] DR. PRISCA LUTUMBA : « Retenez cette formule pour votre examen et votre pratique : "Analyser la demande, c'est déjà une action de transformation !". En amenant le commanditaire à expliciter et reformuler son problème, vous commencez déjà à décentrer les acteurs et à modifier les représentations de la direction. »
[01:05:17] DR. PRISCA LUTUMBA : « Pour comprendre les 3 niveaux de prévention, prenez l'exemple de l'EHPAD : 1) Prévention primaire (agir à la conception en 2020) : installer des rails lève-malade au plafond dès l'ouverture et budgéter des postes de soignants supplémentaires pour anticiper la dépendance à 4 ans ; 2) Prévention secondaire (2022) : former à la manutention douce et créer des fiches d'alerte RH face aux premières fatigues ; 3) Prévention tertiaire (2024) : intervenir en urgence après la rupture, quand un soignant à bout de nerfs en vient à séquestrer un collègue dans un cagibi ! Notre boussole est de toujours ramener l'entreprise vers la prévention primaire. »

[5. Dispositifs Collectifs d'Étayage & Pratique en Binôme]
[01:27:47] DR. PRISCA LUTUMBA : « Distinguez rigoureusement la Régulation d'équipe (où la hiérarchie peut être présente pour ajuster les règles de travail) de l'Analyse des Pratiques Professionnelles (APP), qui est un espace sacré réservé EXCLUSIVEMENT aux pairs de même métier sans aucune hiérarchie, pour y exposer leurs doutes et leur vulnérabilité professionnelle face à un tiers garant. »
[01:47:20] DR. PRISCA LUTUMBA : « En entreprise, travaillez systématiquement EN BINÔME ! Dans mon activité, y compris en libéral, je n'interviens quasiment jamais seule. Intervenir à deux (avec un autre psychologue ou un ergonome) est votre meilleure protection contre les pressions institutionnelles, la séduction managériale et le risque d'isolement. »

[6. Règles d'Or de Restitution : Bannir les Verbatims & Prudence sur le Harcèlement]
[01:51:07] DR. PRISCA LUTUMBA : « Règle d'or absolue pour vos rapports : BANISSEZ LES VERBATIMS INDIVIDUELS ! Même si vous croyez anonymiser, les tournures de phrases, les tics de langage et les revendications font immédiatement reconnaître le salarié par ses collègues ou son chef, l'exposant à des représailles directes. Un rapport de psychologue du travail doit restituer des constats collectifs objectivés et des problématiques de métier, jamais des citations identifiables. »
[01:52:40] DR. PRISCA LUTUMBA : « Prudence extrême également sur le terme "harcèlement moral" : c'est une qualification juridique qui relève de la compétence exclusive du juge ! Le médecin traitant qui délivre un arrêt libellé "harcèlement" s'expose à des poursuites disciplinaires devant l'Ordre des Médecins. Le psychologue du travail, lui, accueille la souffrance vécue et requalifie la situation en analysant la dégradation objective des conditions de travail et la qualité empêchée. »`,
    bibliographieCitee: [
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999 (PUF)",
        remarque: "Concept princeps de Réel de l'Activité (ce qui ne se fait pas, ce qui est empêché) et clinique du pouvoir d'agir.",
      },
      {
        titre: "Travail, usure mentale : essai de psychopathologie du travail",
        auteur: "Christophe Dejours",
        annee: "1993 / 2000 (Bayard)",
        remarque: "Théorisation de la résonance symbolique, de la centralité du travail dans l'identité adulte et des défenses collectives.",
      },
      {
        titre: "The Managed Heart: Commercialization of Human Feeling",
        auteur: "Arlie Russell Hochschild",
        annee: "1983 (University of California Press)",
        remarque: "L'ouvrage fondateur théorisant le Travail Émotionnel (Emotional Labor) et la façade émotionnelle contrainte.",
      },
      {
        titre: "Mesure des facteurs psychosociaux de risque au travail pour la maîtrise de leurs usages (Rapport Gollac)",
        auteur: "Michel Gollac & Marceline Bodier",
        annee: "2011 (Ministère du Travail)",
        remarque: "Rapport national intégrant les exigences émotionnelles et la souffrance éthique parmi les 6 familles de RPS.",
      },
      {
        titre: "Ils ne mouraient pas tous mais tous étaient frappés : journal d'une consultation souffrance et travail",
        auteur: "Marie Pezé",
        annee: "2008 (Pearson)",
        remarque: "Ouvrage de référence sur les consultations spécialisées, le refus de la déflexion externe et le concept de suicide blanc.",
      },
      {
        titre: "Vulnérabilités au travail : de la souffrance à la santé",
        auteur: "Dominique Lhuilier",
        annee: "2010 (Érès)",
        remarque: "Théorisation clinique du maintien dans l'emploi, du rapport à l'emploi et de l'accompagnement des transitions.",
      },
      {
        titre: "Le Travail du care",
        auteur: "Pascale Molinier",
        annee: "2013 (La Dispute)",
        remarque: "Approche clinique et féministe de l'invisibilisation des métiers du soin, de la sollicitude et du lien social.",
      },
      {
        titre: "Les mutations du travail et des organisations : impacts sur les activités et les acteurs",
        auteur: "Marc-Éric Bobillier-Chaumon",
        annee: "2021 (Dunod)",
        remarque: "Clinique des usages appliquée aux technologies numériques, à l'IA et aux environnements de travail hybrides.",
      },
      {
        titre: "Code de déontologie des psychologues",
        auteur: "Commission Nationale Consultative de Déontologie des Psychologues (CNCDP)",
        annee: "1996 (Réactualisé 2012 / 2021)",
        remarque: "Principe premier du respect inaliénable de la personne, indépendance déontologique et secret professionnel.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 5 : POLYSÉMIE DU CONCEPT DE TRAVAIL & REGARDS CROISÉS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s5",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 5,
    titre: "Séance 5 — Polysémie du Concept de Travail & Regards Croisés : Économie, Sociologie et Cliniques du Travail",
    sousTitre: "De la malédiction antique à l'activité réelle : confrontation des modèles PTO/RPS, dualité Dejours vs Clot, clinique des usages et soutenabilité",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "10 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 32 min (Webconférence interactive BigBlueButton)",
    resumeExecutif: [
      "Polysémie et historicité du concept de travail : Le travail est une construction historique et sociale non réductible à l'emploi. D'abord perçu comme châtiment servile (tripalium/ponos), il devient sous l'ère industrielle le vecteur central d'intégration (Durkheim), de salut éthique (Weber) et de réalisation humaine, tout en étant le lieu de l'extraction de la plus-value (Marx).",
      "L'invisibilisation du réel par l'économie quantitative : L'approche économique classique et contemporaine réduit le travail à un facteur marchand de production, un volume d'heures ou un capital humain individuel. Le clinicien rappelle le principe déontologique fondamental : « on ne vend pas sa personne, on monnaie sa force de travail et ses compétences ».",
      "La rupture fondatrice de l'ergonomie francophone (Ombredane & Faverge 1955) : Sortie du laboratoire pour observer le travail réel sur le terrain. L'activité réelle déborde irréductiblement la tâche prescrite pour compenser les aléas, la variabilité et les imprévus.",
      "Modèles PTO et grille RPS du Collège Gollac (2011) : Si Karasek (demande/latitude) et Siegrist (effort/récompense) mesurent les tensions, le rapport Gollac fixe les 6 facteurs cardinaux de RPS (intensité/temps, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs, insécurité de l'emploi).",
      "La dualité fondatrice des Cliniques du Travail au Cnam : Christophe Dejours (Psychodynamique) place la focale sur le sujet, la souffrance face à la résistance du réel, l'intelligence rusée (métis/phronésis), la sublimation et la reconnaissance (jugement d'utilité et de beauté) ; tandis qu'Yves Clot (Clinique de l'activité) explore le réel de l'activité (ce qui est empêché ou contrarié), la tension Genre/Style, le développement du pouvoir d'agir et la souffrance par la qualité empêchée.",
      "Transformations digitales & Clinique des Usages (Marc-Éric Bobillier-Chaumon) : L'outil numérique ne se contente pas d'automatiser, il reconfigure les métiers, les compétences et les collectifs. « Former ne suffit pas, on n'évangélise pas une technologie » : nécessité d'analyser l'acceptation située en contexte réel face aux paradoxes technologiques.",
      "Critique de la valeur-travail et soutenabilité (Dominique Méda & André Gorz) : Remise en cause de la centralité hégémonique du travail marchand au détriment des activités de care (soin des proches, parentalité, citoyenneté). Plaidoyer pour des indicateurs de richesse humaine au-delà du PIB et pour la reconquête du temps libéré.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez cette affirmation de Dr. Lutumba : 'en psychologie du travail, l'activité réelle déborde toujours la tâche prescrite' » ou « En quoi les approches de Christophe Dejours et d'Yves Clot constituent-elles deux paradigmes complémentaires mais épistémologiquement irréductibles de la souffrance au travail ? »).",
        "Option B : Étude de cas / Intervention clinique (ex: Face au déploiement d'une nouvelle technologie logicielle ou d'IA générative contestée par les salariés dans une grande organisation, élaborez la démarche du psychologue du travail en mobilisant le modèle de l'acceptation située de Marc-Éric Bobillier-Chaumon).",
      ],
      recommandationsNotation:
        "Sanction immédiate si le candidat confond Christophe Dejours et Yves Clot : ce sont des frères ennemis théoriques (l'un centré sur l'économie pulsionnelle du sujet et la reconnaissance, l'autre sur l'activité historico-culturelle et le genre de métier). Valoriser impérativement la distinction Genre vs Style (Clot), Débat de normes vs Usage de soi (Schwartz), Acceptabilité vs Acceptation située (Bobillier-Chaumon) et la critique du PIB (Dominique Méda).",
    },
    consignesOralesProf: [
      {
        titre: "Accès aux cours et textes fondamentaux sur Moodle",
        typeTravail: "lecture",
        consigneExacte:
          "Se connecter dès le mercredi midi sur l'espace Moodle PST123 pour récupérer la liste complète des textes de référence et les articles fondamentaux mis à disposition par Dr. Lutumba (textes d'Éric Hamraoui sur la philosophie du travail, Yves Schwartz sur l'Usage de soi, et extraits de Marc-Éric Bobillier-Chaumon).",
        echeance: "Avant la prochaine séance",
        modaliteRendu: "Lecture autonome sélective pour ne pas être submergé.",
        recommandationsProf: "Lire prioritairement l'article sur l'Usage de soi d'Yves Schwartz et les chapitres introductifs de Dominique Méda.",
      },
      {
        titre: "Travail Dirigé (TD) à venir sur la Conception du Travail",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Préparer les études de situations de travail qui seront déposées sur Moodle : confronter une activité réelle observée à sa description de poste formelle et repérer les compromis opératoires développés par les opérateurs.",
        echeance: "Séance 6",
        modaliteRendu: "Activité pédagogique en ligne / forum d'échange.",
        recommandationsProf: "Mobiliser la grille des 6 facteurs de RPS du rapport Gollac (2011) pour structurer l'analyse.",
      },
      {
        titre: "Veille et curiosité : Figures contemporaines du travail sur les médias scientifiques",
        typeTravail: "recherche",
        consigneExacte:
          "Écouter les conférences en ligne et interventions de Dominique Lhuilier (sur la clinique psychosociale), Éric Hamraoui (sur la résistance du corps) et Marc-Éric Bobillier-Chaumon (sur la transformation digitale).",
        echeance: "Tout au long du semestre",
        modaliteRendu: "Enrichissement personnel de la culture de métier.",
        recommandationsProf: "Retenir que les cliniciens du Cnam sont des « PTT » (psychologues tout-terrain) qui ancrent toujours leurs concepts dans l'observation de terrain.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Problématisation & Débat d'Introduction : Qu'est-ce que le Travail ?",
        points: [
          {
            titre: "Débat maïeutique sur les frontières de l'emploi",
            contenu:
              "Dr. Lutumba interroge les représentations des auditeurs : le bénévolat associatif, le soin d'un proche dépendant (care/aidant familial), l'e-sport professionnel ou l'entraînement d'un athlète sont-ils du travail ? L'analyse clinique montre que toute activité productive engage une contrainte sur le temps libre et mobilise le corps vivant, la cognition et la subjectivité, qu'elle soit monétarisée ou non.",
          },
          {
            titre: "Utilité sociale et place statutaire",
            contenu:
              "Le travail est ce qui confère une place et une visibilité dans la société. Il engage la reconnaissance d'une contribution à l'œuvre collective et structure la temporalité quotidienne du sujet.",
          },
          {
            titre: "La promesse psychosociale du travail en crise",
            contenu:
              "Concept central défendu par Dr. Lutumba : le travail est porteur d'une promesse psychosociale où le sujet vient nourrir son essence humaine, éprouver son pouvoir d'agir et créer du beau. Or, les organisations contemporaines peinent de plus en plus à honorer cette promesse, engendrant une désillusion massive.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Histoire & Polysémie du Concept : Du Châtiment Antique à l'OST",
        points: [
          {
            titre: "Racines étymologiques : Tripalium, Ponos et Ergon",
            contenu:
              "Le terme 'travail' dérive du latin tripalium (instrument de torture à trois pieux). Les Grecs distinguaient ponos (la peine pénible et servile) et ergon (l'œuvre d'art et de création). De la malédiction biblique ('tu mangeras ton pain à la sueur de ton front') à la Révolution industrielle, le travail subit un basculement historique pour devenir le vecteur de la dignité et de l'émancipation citoyenne.",
          },
          {
            titre: "L'OST de Taylor (1911) et l'école des relations humaines de Mayo (1933)",
            contenu:
              "Taylor sépare radicalement la conception de l'exécution en parcellisant les tâches. L'ouvrier devient l'exécutant d'un geste chronométré. Mayo démontre ensuite que la productivité dépend au premier chef des facteurs affectifs, du sentiment d'appartenance et de l'ambiance relationnelle de groupe.",
            auteurs: ["Frederick W. Taylor", "Elton Mayo"],
          },
          {
            titre: "Georges Friedmann (1956) et Ombredane & Faverge (1955)",
            contenu:
              "Friedmann publie 'Le Travail en miettes' et fonde la sociologie du travail française en analysant la dépossession ouvrière. En 1955, Ombredane et Faverge publient 'L'Analyse du travail' : ils sortent le psychologue du laboratoire expérimental pour observer l'opérateur sur le terrain, créant l'ergonomie francophone fondée sur la dialectique prescrit/réel.",
            auteurs: ["Georges Friedmann", "André Ombredane", "Jean-Marie Faverge"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Regards Croisés : Le Travail en Économie et en Sociologie",
        points: [
          {
            titre: "L'acception économique : valeur-travail, force de travail et capital humain",
            contenu:
              "Smith fonde la valeur marchande sur le travail. Marx démontre que le salarié vend sa force de travail contre un salaire, générant une plus-value confisquée par le capital. Becker théorise le capital humain comme portefeuille individuel de compétences à valoriser.",
            auteurs: ["Adam Smith", "Karl Marx", "Gary Becker"],
          },
          {
            titre: "Règle déontologique du clinicien : 'On ne vend pas sa personne'",
            contenu:
              "Dr. Lutumba formule un principe fondamental pour la pratique du bilan et de l'accompagnement : face à un salarié qui dit 'je ne sais pas me vendre', le psychologue rectifie fermement : la personne est inestimable ; ce qu'on monnaie sur le marché, c'est sa force de travail, ses compétences et ses services.",
          },
          {
            titre: "L'acception sociologique : Durkheim, Weber et Sainsaulieu",
            contenu:
              "Durkheim montre que la division du travail produit de la solidarité organique, mais bascule dans l'anomie destructrice par défaut de régulation (ex: l'EHPAD débordé par la dépendance des résidents). Weber conçoit le travail comme vocation (Beruf) et ascétisme rationnel. Sainsaulieu explore la fabrique des identités et des contre-pouvoirs dans l'entreprise.",
            auteurs: ["Émile Durkheim", "Max Weber", "Renaud Sainsaulieu"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Où se situe la Psychologie du Travail ? L'Activité & les Modèles de RPS",
        points: [
          {
            titre: "Le cœur épistémologique : Comprendre le travail pour le transformer",
            contenu:
              "L'ergonomie et la psychologie du travail refusent de réduire le travail à des métriques quantitatives abstraites. L'activité réelle déborde toujours la tâche prescrite pour compenser l'incomplétude des procédures et la variabilité du vivant.",
          },
          {
            titre: "Modèles de stress : Hackman & Oldham, Karasek et Siegrist",
            contenu:
              "Hackman & Oldham (1976) modélisent la motivation intrinsèque (variété, identité, sens, autonomie, feedback). Karasek (1979) théorise la tension entre forte demande psychologique et faible latitude décisionnelle. Siegrist (1996) met en évidence le déséquilibre pathogène entre efforts élevés et faibles récompenses.",
            auteurs: ["J. Richard Hackman", "Robert Karasek", "Johannes Siegrist"],
          },
          {
            titre: "Les 6 facteurs de Risques Psychosociaux du Rapport Gollac (2011)",
            contenu:
              "Le rapport officiel du collège d'expertise présidé par Michel Gollac fixe la nomenclature de référence des 6 facteurs d'exposition : 1) Intensité et temps de travail, 2) Exigences émotionnelles (travail émotionnel), 3) Manque d'autonomie, 4) Mauvaise qualité des rapports sociaux, 5) Conflits de valeurs (qualité empêchée), 6) Insécurité de la situation de travail.",
            auteurs: ["Michel Gollac", "Pascale Molinier"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Les Cliniques du Travail au Cnam : Dejours, Clot, Hamraoui, Schwartz & Lhuilier",
        points: [
          {
            titre: "Psychodynamique du Travail (Christophe Dejours) : Sujet, Réel et Reconnaissance",
            contenu:
              "Le travail est ce que le sujet doit mobiliser pour faire face à ce que le prescrit n'a pas prévu. Le réel se fait connaître par l'échec et la résistance du monde. Le sujet mobilise une intelligence pratique rusée (métis) et un savoir incorporé dans les sens du corps. La souffrance inévitable est sublimée par la reconnaissance : jugement d'utilité (hiérarchie/usagers) et jugement de beauté (pairs).",
            auteurs: ["Christophe Dejours"],
          },
          {
            titre: "Clinique de l'Activité (Yves Clot) : Réel de l'Activité, Genre et Style",
            contenu:
              "L'activité déborde l'action réalisée : le réel de l'activité englobe les activités empêchées, suspendues ou contrariées. Distinction fondamentale : le Genre est la mémoire impersonnelle et collective du métier ; le Style est la signature singulière par laquelle l'opérateur s'approprie ce genre. La souffrance naît de la qualité empêchée (travail ni fait ni à faire).",
            auteurs: ["Yves Clot"],
          },
          {
            titre: "Avertissement théorique formel : Dejours et Clot sont des 'frères ennemis'",
            contenu:
              "Dr. Lutumba met en garde contre tout amalgame à l'examen : Dejours est centré sur le sujet, la pulsion et l'économie psychique individuelle face aux défenses ; Clot est centré sur l'activité, le geste de métier et la dynamique collective historico-culturelle.",
          },
          {
            titre: "Philosophie Sociale (Hamraoui), Ergologie (Schwartz) et Clinique Psychosociale (Lhuilier)",
            contenu:
              "Éric Hamraoui ancre la philosophie sociale dans le corps vécu et les figures de la résistance au travail. Yves Schwartz théorise l'ergologie comme débat de normes permanent et usage de soi face aux normes antécédentes. Dominique Lhuilier pense l'unité et la diversité des cliniques et le maintien dans l'emploi.",
            auteurs: ["Éric Hamraoui", "Yves Schwartz", "Dominique Lhuilier"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Le Travail Aujourd'hui : Numérique, Sens, Valeur & Soutenabilité",
        points: [
          {
            titre: "Clinique des Usages et Technologies Émergentes (Marc-Éric Bobillier-Chaumon)",
            contenu:
              "Prof. Bobillier-Chaumon (deux L à Bobillier !) démontre que la technologie ne fait pas qu'automatiser, elle reconfigure l'activité, les compétences et les collectifs. Règle d'or de Dr. Lutumba : 'former ne suffit pas, on n'évangélise pas une technologie'. Il faut dépasser l'acceptabilité a priori (modèle TAM) pour analyser l'acceptation située en situation réelle face aux paradoxes technologiques.",
            auteurs: ["Marc-Éric Bobillier-Chaumon"],
          },
          {
            titre: "Critique de la Valeur Travail et Activités de Care (Dominique Méda)",
            contenu:
              "Méda critique l'hégémonie du travail marchand comme seul vecteur de statut et de dignité sociale. Elle plaide pour la reconnaissance des activités non marchandes de care (soin des proches, bénévolat, citoyenneté), critique la métrique aveugle du PIB et montre l'aspiration massive des salariés européens à un travail utile, autonome et reconnu.",
            auteurs: ["Dominique Méda"],
          },
          {
            titre: "Métamorphoses du Travail et Reconquête du Temps (André Gorz)",
            contenu:
              "Gorz dénonce la colonisation de l'existence par la rationalité productiviste. Il appelle à repenser l'articulation travail/temps libre/autonomie et à affranchir l'homme du stakhanovisme contemporain par la réduction du temps de travail et le revenu garanti.",
            auteurs: ["André Gorz"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Confrontation des Approches Disciplinaires du Travail",
        description: "Panorama synthétique des conceptions du travail à travers les disciplines des sciences de l'homme et de la gestion",
        colonnes: ["Courant Disciplinaire", "Auteurs Majeurs", "Statut Accordé au Travail", "Angle Mort selon le Cnam"],
        lignes: [
          {
            axe: "Économie Classique & Néolibérale",
            valeurs: [
              "Smith, Ricardo, Becker",
              "Facteur de production marchand, source de valeur marchande, capital humain individuel.",
              "Invisibilisation totale du travail réel, du corps vécu et des régulations subjectives.",
            ],
          },
          {
            axe: "Critique Marxiste",
            valeurs: [
              "Karl Marx",
              "Marchandise aliénée (force de travail), extraction de la plus-value dans les rapports de production.",
              "Centré sur l'aliénation macro-structurelle sans explorer l'ingéniosité concrète de l'opérateur.",
            ],
          },
          {
            axe: "Sociologie du Travail",
            valeurs: [
              "Durkheim, Weber, Sainsaulieu",
              "Vecteur de solidarité organique, vocation éthique (Beruf), creuset des identités et du pouvoir.",
              "N'analyse pas la micro-régulation ergonomique du geste ni les conflits de l'économie pulsionnelle.",
            ],
          },
          {
            axe: "Ergonomie de l'Activité",
            valeurs: [
              "Ombredane, Faverge, Wisner",
              "Activité réelle régulatrice comblant en situation l'incomplétude constitutive du prescrit.",
              "Historiquement centrée sur l'efficacité de la tâche sans intégrer l'économie défensive du sujet.",
            ],
          },
          {
            axe: "Cliniques du Travail Cnam",
            valeurs: [
              "Dejours, Clot, Bobillier-Chaumon",
              "Épreuve du réel, santé mentale, développement du pouvoir d'agir, usage de soi face aux technologies.",
              "Démarche inductive qualitative exigeant une immersion longue sur le terrain réel ('psychologues tout-terrain').",
            ],
          },
        ],
      },
      {
        titre: "Duel Théorique au Sommet du Cnam : Dejours vs Clot (Les Frères Ennemis)",
        description: "Tableau comparatif fondamental pour l'examen distinguant la psychodynamique et la clinique de l'activité",
        colonnes: ["Critère Théorique", "Psychodynamique du Travail (Christophe Dejours)", "Clinique de l'Activité (Yves Clot)"],
        lignes: [
          {
            axe: "Filiation Épistémologique",
            valeurs: [
              "Psychanalyse freudienne, psychopathologie du travail, théorie pulsionnelle et sublimation.",
              "Psychologie historico-culturelle soviétique (Lev Vygotski, Mikhaïl Bakhtine, Alexis Leontiev).",
            ],
          },
          {
            axe: "Focale Première",
            valeurs: [
              "Le Sujet individuel : comment l'individu maintient son équilibre face à une organisation pathogène.",
              "L'Activité et le Métier : comment l'activité se développe ou se trouve contrariée par le milieu.",
            ],
          },
          {
            axe: "Conception du Réel",
            valeurs: [
              "Ce qui résiste aux savoirs et au prescrit, éprouvé intimement par l'échec et la résistance du monde.",
              "Le Réel de l'Activité : ce qui est empêché, contrarié, suspendu, ce qu'on fait pour ne pas faire.",
            ],
          },
          {
            axe: "Racine de la Souffrance",
            valeurs: [
              "Frottement inévitable avec le réel et défaut de reconnaissance sociale du don de soi.",
              "Qualité empêchée : interdiction managériale de réaliser un travail soigné selon les règles de l'art.",
            ],
          },
          {
            axe: "Ressource de Santé",
            valeurs: [
              "Sublimation de la pulsion et validation par les deux jugements de reconnaissance (utilité et beauté).",
              "Élargissement du pouvoir d'agir sur soi, sur autrui et sur le milieu ; vitalité du genre de métier.",
            ],
          },
          {
            axe: "Fonction du Collectif",
            valeurs: [
              "Rempart défensif contre la peur (stratégies collectives) et garant du jugement de beauté entre pairs.",
              "Patrimoine vivant du genre professionnel garantissant les critères partagés du travail bien fait.",
            ],
          },
          {
            axe: "Dispositif Méthodologique",
            valeurs: [
              "Espace de parole clinique fondé sur la délibération et la libre association collective.",
              "Autoconfrontations simples (face à sa propre vidéo) et croisées (confrontation de deux pairs).",
            ],
          },
        ],
      },
      {
        titre: "L'Artefact Technique au Travail : Ingénierie TAM vs Clinique des Usages",
        description: "Confrontation du modèle d'adoption technologique classique et de la clinique des usages",
        colonnes: ["Axe d'Analyse", "Modèle Ergonomique TAM (Technology Acceptance Model)", "Clinique des Usages (M.-É. Bobillier-Chaumon)"],
        lignes: [
          {
            axe: "Statut de la Technologie",
            valeurs: [
              "Outil neutre venant automatiser une suite logique de tâches prescrites préexistantes.",
              "Artefact sociotechnique puissant qui reconfigure l'activité, les compétences et les collectifs.",
            ],
          },
          {
            axe: "Concept Clé d'Adoption",
            valeurs: [
              "Acceptabilité a priori : utilité perçue et facilité d'utilisation mesurées avant déploiement.",
              "Acceptation située : processus continu et dynamique d'appropriation en contexte de travail réel.",
            ],
          },
          {
            axe: "Postulat sur l'Opérateur",
            valeurs: [
              "Utilisateur passif : il suffit de former techniquement ('évangéliser l'outil') pour qu'il adhère.",
              "Sujet situé et critique : développe des compromis opératoires, des détours d'usage ou des résistances.",
            ],
          },
          {
            axe: "Prise en Compte des Paradoxes",
            valeurs: [
              "Ignorés : les réticences sont disqualifiées en simple 'résistance au changement' individuelle.",
              "Centrale : analyse les paradoxes (gain formel de temps vs dépossession du métier et technostress).",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais amalgamer la clinique de l'activité (Clot) et la psychodynamique du travail (Dejours)",
        erreurCourante: "Traiter Dejours et Clot comme des auteurs interchangeables partageant la même théorie de la souffrance.",
        rectificationAttendue:
          "Exposer rigoureusement l'irréductibilité de leurs paradigmes : Dejours s'ancre dans la psychanalyse et la théorie pulsionnelle du sujet individuel (réel, défenses, sublimation, reconnaissance), tandis que Clot s'ancre dans la psychologie historico-culturelle vygotskienne centrée sur l'activité de métier instrumentée, le genre professionnel et le pouvoir d'agir.",
        contexte: "Section 5 — Les Cliniques du travail au Cnam",
      },
      {
        titre: "Bannir l'illusion gestionnaire selon laquelle 'former suffit' pour faire adopter un outil digital ou une IA",
        erreurCourante: "Affirmer qu'un plan de formation logicielle et de conduite du changement garantit l'acceptation d'un outil.",
        rectificationAttendue:
          "Mobiliser la formule de Dr. Lutumba (« former ne suffit pas, on n'évangélise pas une technologie ») et démontrer avec Bobillier-Chaumon que l'outil doit être évalué selon son 'acceptation située' dans l'activité réelle, en mesurant ses effets sur les compétences, les collectifs et les paradoxes de dépossession du métier.",
        contexte: "Section 6 — Transformations digitales",
      },
      {
        titre: "Distinguer rigoureusement Genre professionnel et Style professionnel chez Yves Clot",
        erreurCourante: "Employer indifféremment genre et style pour désigner la manière dont une personne travaille.",
        rectificationAttendue:
          "Le Genre est le patrimoine collectif, impersonnel et transpersonnel du métier (les règles tacites partagées par les pairs qui garantissent le travail bien fait). Le Style est la réappropriation singulière, créative et subjective par laquelle chaque travailleur investit ce genre.",
        contexte: "Section 5 — Clinique de l'activité",
      },
      {
        titre: "Ne pas réduire la reconnaissance au travail chez Christophe Dejours à une gratification managériale",
        erreurCourante: "Assimiler la reconnaissance en psychodynamique aux compliments de la direction ou à une prime au mérite.",
        rectificationAttendue:
          "Démontrer la structure bipartite indispensable de la reconnaissance : 1) Le jugement d'utilité (économique, technique, managérial) porté par la hiérarchie et les usagers, et 2) Le jugement de beauté (conformité aux règles de l'art et élégance de l'œuvre) porté exclusivement par la communauté des pairs de métier.",
        contexte: "Section 5 — Psychodynamique du travail",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage Pédagogique, Ressources Moodle & Débat Introductif sur le Travail]
[00:03:07] DR. PRISCA LUTUMBA : « Vous aurez tout de disponible demain midi sur Moodle, y compris le cours de ce soir. Je vous mettrai comme promis la liste des textes de référence et quelques textes fondamentaux en ressource. Parce que je me suis rendu compte que quand je mettais tous les textes, certains étaient tentés de tout lire et se retrouvaient submergés. Donc je préfère donner la liste sélective. »
[00:05:09] DR. PRISCA LUTUMBA : « Pourquoi est-ce important de définir la question du travail ? Si je vous pose la question suivante : le bénévolat, le soin d'un proche dépendant, un jeu vidéo professionnel ou l'entraînement d'un sportif de haut niveau : est-ce que c'est du travail d'après vous ? »
[00:06:45] AUDITEUR (OLIVIER) : « J'ai envie de dire que c'est à la fois quelque chose qui est lié à une notion de contrainte sur son temps libre, et une question de place que ça nous donne dans la société, un rapport entre l'utilité et la contrainte. »
[00:07:09] DR. PRISCA LUTUMBA : « Charlotte nous dit que ça engage physiquement et psychiquement la personne et que ça participe à créer l'identité du travailleur. On voit bien que toute activité qui produit quelque chose engage le corps et la psyché. C'est ce que j'appelle la promesse psychosociale du travail : à quel moment le travail vient nourrir l'essence de l'homme, par son pouvoir d'agir et par la beauté de ce qu'il peut créer de manière individuelle et collective. »

[2. Histoire & Polysémie : Du Tripalium aux Sciences du Travail]
[00:16:25] DR. PRISCA LUTUMBA : « Par rapport à l'OST et à la naissance des sciences du travail, on a Taylor en 1911 qui sépare radicalement la conception de l'exécution. Il découpe la tâche, chacun fait un petit bout sans voir la finalité globale, et on devient exécutant d'une tâche prescrite. Puis Mayo en 1933 introduit la dimension affective et sociale du groupe, prémices des collectifs de travail. »
[00:17:51] DR. PRISCA LUTUMBA : « Georges Friedmann en 1956 va analyser le travail en miettes et fonder la sociologie du travail française en montrant l'effet délétère de cet émiettement sur les ouvriers. Enfin en 1955, Ombredane et Faverge publient 'L'analyse du travail' : ils sortent du laboratoire pour aller analyser l'opérateur en situation réelle, posant l'acte de naissance de notre cousine, l'ergonomie de l'activité. »

[3. Le Travail en Économie et en Sociologie : Force de Travail & Dignité]
[00:22:20] DR. PRISCA LUTUMBA : « Quand quelqu'un me dit en bilan de compétences ou en reconversion 'je ne sais pas me vendre', je réponds : non, heureusement ! Chacun est inestimable. Ce qu'on monnaie sur le marché, c'est sa force de travail, sa plus-value en compétences, son savoir-faire et ses services. Ce n'est jamais sa propre personne que l'on vend. »
[00:25:32] DR. PRISCA LUTUMBA : « Pour Durkheim, la division du travail social produit de la solidarité organique, mais elle peut aussi engendrer de l'anomie si elle n'est pas régulée. C'est l'exemple typique de l'EHPAD que je vous donnais samedi : au fil des ans, le GIR des résidents s'alourdit, la charge augmente sans ajustement des effectifs, l'entraide disparaît et le collectif se dégrade faute de régulation. »
[00:27:08] DR. PRISCA LUTUMBA : « Pour Max Weber, le travail est considéré comme une vocation (Beruf), source de rationalisation de toute la conduite de vie. Et avec Renaud Sainsaulieu, le travail devient le creuset de la construction des identités culturelles et des rapports de pouvoir. »

[4. L'Analyse de l'Activité & les Modèles de Risques Psychosociaux (RPS)]
[00:38:42] DR. PRISCA LUTUMBA : « L'objectif que nous partageons en ergonomie et en psychologie du travail, c'est comprendre le travail pour le transformer, c'est-à-dire comprendre l'activité réelle face à un prescrit qui comporte toujours de l'imprévu et des aléas. »
[00:40:34] DR. PRISCA LUTUMBA : « En PTO, Karasek en 1979 regarde la tension entre forte demande psychologique et faible latitude décisionnelle. Siegrist en 1996 y adjoint le déséquilibre entre l'effort consenti et la récompense obtenue. Et en 2011, le collège d'expertise présidé par Michel Gollac fixe les 6 grands facteurs de risques psychosociaux : intensité du travail, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs et insécurité de la situation. »

[5. Psychodynamique de Dejours vs Clinique de l'Activité de Clot : Les Frères Ennemis]
[00:47:00] DR. PRISCA LUTUMBA : « Pour Christophe Dejours, le travail est ce que le sujet doit mobiliser de sa propre personne pour combler l'écart laissé par ce que l'organisation prescrite ne prévoit pas. Le réel du travail se fait connaître au sujet par les échecs et la résistance du monde. C'est là que le sujet mobilise son intelligence pratique (métis), son savoir incorporé dans la chair et ses sens, pour sublimer la souffrance par la reconnaissance d'utilité et de beauté. »
[00:59:45] DR. PRISCA LUTUMBA : « Chez Yves Clot, l'activité est un drame : elle déborde l'action réalisée car le réel de l'activité englobe aussi ce qu'on ne fait pas, ce qu'on a voulu faire sans y parvenir ou ce qu'on fait pour ne pas faire. Clot distingue le Genre (la mémoire impersonnelle du métier partagée par les pairs) et le Style (la manière singulière et créative dont chacun retravaille ce genre). La souffrance naît de la qualité empêchée, quand on ne peut plus faire un travail de qualité. »
[01:04:28] DR. PRISCA LUTUMBA : « Lydia demande dans le chat : y a-t-il un lien entre les défenses de Dejours et le travail empêché de Clot ? Surtout pas de lien, Lydia ! Ce sont des frères ennemis théoriques ! Dejours est centré sur le sujet, la pulsion et l'équilibre individuel face aux défenses ; Clot est centré sur l'activité, le geste de métier et le collectif. »
[01:13:26] DR. PRISCA LUTUMBA : « N'oublions pas l'ergologie d'Yves Schwartz à Aix : pour lui, toute activité humaine est un débat de normes et un usage de soi, une rencontre permanente entre des normes antécédentes et des renormalisations singulières en situation. »

[6. Les Transformations Digitales & la Critique Sociétale du Travail]
[01:15:50] DR. PRISCA LUTUMBA : « Marc-Éric Bobillier-Chaumon : deux L à Bobillier ! C'est un ange, laissez-le s'envoler ! Lui analyse l'activité située face aux technologies. Les technologies ne se contentent pas d'automatiser : elles reconfigurent l'activité, les compétences et les collectifs. Former ne suffit pas, on n'évangélise pas une technologie ! Il faut dépasser l'acceptabilité technique a priori pour analyser l'acceptation située en situation réelle. »
[01:23:08] DR. PRISCA LUTUMBA : « Dominique Méda interroge la place démesurée de la valeur travail comme seul vecteur d'identité et de dignité dans les sociétés modernes. Elle plaide pour la valorisation des activités de care (soin des proches, citoyenneté), critique la métrique aveugle du PIB et montre, à partir des enquêtes européennes, que les salariés attendent de l'autonomie, de la reconnaissance et un travail utile qu'on leur refuse trop souvent. »`,
    bibliographieCitee: [
      {
        titre: "L'Analyse du travail : facteur d'économie humaine et de productivité",
        auteur: "André Ombredane & Jean-Marie Faverge",
        annee: "1955 (PUF)",
        remarque: "Texte fondateur de l'ergonomie francophone : passage de l'analyse en laboratoire à l'étude de l'opérateur en situation réelle.",
      },
      {
        titre: "Le Travail en miettes : travail et spécialisation ouvrière",
        auteur: "Georges Friedmann",
        annee: "1956 (Gallimard)",
        remarque: "Acte de fondation de la sociologie du travail française : critique des effets de l'OST et du travail parcellisé.",
      },
      {
        titre: "Travail, usure mentale : essai de psychopathologie du travail",
        auteur: "Christophe Dejours",
        annee: "1980 / 1993 (Bayard)",
        remarque: "Ouvrage princeps de la psychodynamique du travail : souffrance, défenses collectives, épreuve du réel et reconnaissance.",
      },
      {
        titre: "Le Travail sans l'homme ? Pour une psychologie des milieux de travail et de vie",
        auteur: "Yves Clot",
        annee: "1995 / 2008 (La Découverte)",
        remarque: "Clinique de l'activité, distinction tâche/activité, genre et style professionnels, réel de l'activité et pouvoir d'agir.",
      },
      {
        titre: "Le Travail, une valeur en voie de disparition ?",
        auteur: "Dominique Méda",
        annee: "1995 / 2010 (Aubier / Flammarion)",
        remarque: "Déconstruction sociologique de l'hégémonie de la valeur travail, valorisation du care et critique des indicateurs de richesse (PIB).",
      },
      {
        titre: "Le concept d'usage de soi et le débat de normes en ergologie",
        auteur: "Yves Schwartz",
        annee: "2000 (Octarès)",
        remarque: "Théorisation de l'activité productive comme négociation vitale entre normes antécédentes et renormalisations singulières.",
      },
      {
        titre: "Mesurer les facteurs psychosociaux de risque au travail pour les maîtriser (Rapport officiel)",
        auteur: "Michel Gollac & Collège d'expertise",
        annee: "2011 (Ministère du Travail)",
        remarque: "Rapport national de référence définissant les 6 grands facteurs de risques psychosociaux (RPS).",
      },
      {
        titre: "Les mutations du travail et des organisations : impacts sur les activités et les acteurs",
        auteur: "Marc-Éric Bobillier-Chaumon",
        annee: "2021 (Dunod)",
        remarque: "Clinique des usages appliquée aux technologies numériques, à l'acceptation située et aux transformations contemporaines de l'activité.",
      },
    ],
  },

];
