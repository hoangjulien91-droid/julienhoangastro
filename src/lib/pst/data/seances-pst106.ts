import type { SeanceCoursItem } from "./seances-types";

export const SEANCES_PST106: SeanceCoursItem[] = [
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
      {
        titre: "Support complet du Cours 1 — Synthèse & Diaporama annoté (PDF)",
        auteur: "Pr. Christine Lagabrielle / Plateforme PST",
        annee: "Octobre 2026",
        remarque: "Dossier complet du Cours 1 (15/10/2026) : repères épistémologiques, Arendt, Jahoda et Clot (8 pages).",
        url: "/docs/PST106_Cours_1_Complet.pdf",
      },
    ],
    tableauxComparatifs: [
      {
        titre: "La Vita Activa selon Hannah Arendt (1958)",
        description: "Tripartition philosophique incontournable pour distinguer les registres de l'agir humain.",
        colonnes: ["Travail (Labor)", "Œuvre (Work)", "Action (Action)"],
        lignes: [
          {
            axe: "Figure anthropologique",
            valeurs: [
              "Animal laborans (survie biologique)",
              "Homo faber (fabrication durable)",
              "Citoyen (parole et espace public)",
            ],
          },
          {
            axe: "Temporalité & produit",
            valeurs: [
              "Cyclique et répétitif ; consommé immédiatement sans laisser de trace durable",
              "Linéaire ; produit un monde d'objets durables (artefacts, outils, art)",
              "Événementielle ; fonde la pluralité politique entre pairs",
            ],
          },
        ],
      },
      {
        titre: "Psychologie gestionnaire vs Clinique du travail (Cnam)",
        description: "Positionnement épistémologique du psychologue du travail face aux commandes d'entreprise.",
        colonnes: ["Approche gestionnaire / adaptative", "Clinique du travail (Clot, Dejours, Cnam)"],
        lignes: [
          {
            axe: "Objet central",
            valeurs: [
              "Adéquation homme-poste, sélection, mesure des traits individuels",
              "Activité réelle, subjectivité, collectifs et empêchements de métier",
            ],
          },
          {
            axe: "Visée d'intervention",
            valeurs: [
              "Adapter l'individu aux contraintes prescrites par l'organisation",
              "Transformer l'organisation du travail pour restaurer le pouvoir d'agir et la santé",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Confondre Travail (Labor) et Œuvre (Work) chez Arendt",
        erreurCourante: "Décrire le travail industriel durable ou artisanal comme du « Labor » et assimiler l'« Œuvre » aux chefs-d'œuvre artistiques uniquement.",
        rectificationAttendue: "Chez Arendt, le Travail (Labor) assure la reproduction biologique immédiate (cycle sans fin), tandis que l'Œuvre (Work) fabrique le monde matériel durable (outils, édifices, institutions).",
        contexte: "Question de cours ou introduction philosophique de dissertation sur le sens du travail.",
      },
      {
        titre: "Réduire le travail à son utilité économique (fonction manifeste)",
        erreurCourante: "Affirmer que les chômeurs souffrent uniquement de la perte de revenu.",
        rectificationAttendue: "Mobiliser l'enquête de Marienthal (Marie Jahoda, 1937) : la souffrance vient de la perte des 5 fonctions latentes (temps structuré, liens sociaux hors famille, buts collectifs, statut/identité, activité régulière).",
        contexte: "Analyse de situations de chômage, de précarité ou de perte d'emploi.",
      },
      {
        titre: "Adopter une posture de « bon sens » ou de coaching RH",
        erreurCourante: "Répondre à une étude de cas par des conseils managériaux généraux (« mieux communiquer », « motiver les équipes »).",
        rectificationAttendue: "Tenir la posture scientifique enseignée par le Pr. Lagabrielle : nos outils sont les concepts (activité prescrite/réelle, fonctions latentes, dimensions culturelles d'Hofstede), jamais le sens commun.",
        contexte: "Méthodologie générale attendue dans toute copie PST106.",
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
    dateSeance: "28 octobre 2026",
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
      {
        titre: "Support complet du Cours 2 — Synthèse & Corrigé AD Taylorisme (PDF)",
        auteur: "Pr. Christine Lagabrielle / Plateforme PST",
        annee: "Octobre 2026",
        remarque: "Dossier complet du Cours 2 (28/10/2026) : Taylor, Ford, scripts, corrigé des 25 questions et Lahy/Pacaud (12 pages).",
        url: "/docs/PST106_Cours_2_Complet.pdf",
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
    dateSeance: "30 octobre 2026",
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
      {
        titre: "Support complet du Cours 3 — Synthèse Ergonomie & Psychopathologie (PDF)",
        auteur: "Pr. Christine Lagabrielle / Plateforme PST",
        annee: "Octobre 2026",
        remarque: "Dossier complet du Cours 3 (30/10/2026) : Mayo, Lewin, Wisner, Leplat (5 carrés), Faverge et Le Guillant (11 pages).",
        url: "/docs/PST106_Cours_3_Complet.pdf",
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
      {
        titre: "Support complet du Cours 4 — Activité, Collectif, Genre & Style (PDF)",
        auteur: "Pr. Christine Lagabrielle / Jessica Roussan / Plateforme PST",
        annee: "Novembre 2026",
        remarque: "Dossier complet du Cours 4 (04/11/2026) : dilemmes, catachrèse, genre/style et élaboration réflexive de l'expérience (8 pages).",
        url: "/docs/PST106_Cours_4_Complet.pdf",
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
  // PST106 — SÉANCE 7 : ARCHITECTURE DU MÉTIER & AUTOCONFRONTATION CROISÉE (M. WUILLEUMIER)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst106-s7",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    numeroSeance: 7,
    titre: "Séance 7 — Architecture du Métier (4 Dimensions), Méthodologie & Autoconfrontation Croisée",
    sousTitre: "Double vie du style (bobineur), méthode historico-développementale, primat du « comment » et cas clinique en EHPAD",
    enseignant: "M. WUILLEUMIER (Psychologue du travail Cnam, intervenant PST001 / PST117 & maison d'arrêt d'Angoulême)",
    dateSeance: "18 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "3 h 04 min 48 s (344 séquences utiles)",
    resumeExecutif: [
      "Introduction & cadrage pédagogique : présentation du parcours de M. Wuilleumier (Mines de Nancy, 20 ans chercheur sur les eaux souterraines, cursus Cnam de psychologue du travail, PST001/PST117 avec Sylvaine Halibert), calendrier des 3 mercredis et 2 Activités Distantes (20 et 27 nov. 2026) autour d'Yves Clot (Travail et pouvoir d'agir, 2008 / 2e éd. 2017 sur Cairn).",
      "Révision critique & Double vie du style : tâche prescrite vs activité réalisée vs réel de l'activité (« le réalisé n'a plus le monopole du réel » ; bonne fatigue vs mauvaise fatigue des activités ravalées), travailler comme arbitrage en dilemmes, catachrèse (témoignage médico-social de Marie-Ève), santé normative chez Canguilhem, polyphonie de Bakhtine (destinataire, subdestinataire, surdestinataire ; vérité dialogique) et cas du bobineur ouvrant la double vie du style (recréer le genre et se recréer soi-même).",
      "Architecture du métier en 4 dimensions (boucle infinie d'après Prisca Lutumba) : Personnelle, Interpersonnelle, Impersonnelle et Transpersonnelle — toujours associées au métier et non à l'entreprise (solution inter-structures pour les PME/postes isolés).",
      "Nécrose du métier vs Direction instituante & Co-développement : l'hypertrophie du prescrit via un imaginaire gestionnaire déconnecté nécrose le métier ; l'objet-lien / furet dialogique soutient la controverse (« l'inflation des querelles de personnes se substitue à la déflation des disputes professionnelles »). Limites du codev (orienté solution rapide, sans temps long ni posture naïve).",
      "Méthode vs Méthodologie historico-développementale (Vygotski, Clot) : l'observation directe rate l'essentiel (« l'homme est plein à chaque minute de possibilités non réalisées »). On provoque une transformation réglée par des méthodes indirectes (« transformer pour comprendre ») en s'appuyant sur le plurilinguisme professionnel et un furet dialogique.",
      "Dispositif de l'Autoconfrontation Croisée en 3 phases & Cas EHPAD : Phase 1 (collectif volontaire, sécurité sans peur, observation en posture naïve dénaturalisant les automatismes) ; Phase 2 (film 3-4 min, autoconfrontation simple, autoconfrontation croisée sur le comment par séquences de ~10 s — cas vécu de l'aide-soignante en EHPAD rasant habilement de la main gauche tout en affirmant être droitière) ; Phase 3 (déplacement vers le collectif de départ et le COPIL).",
      "Consignes Activité Distante (vendredi 20 nov.) : « Un pouvoir d'agir peut en cacher un autre » — 4 textes sur Moodle (priorité à Clot & Simonet 2015 et Pierre Rabardel) autour de la question : « Quand des concepts homonymes se rencontrent dans l'espace social, que deviennent les notions qui en découlent ? ».",
    ],
    modalitesExamen: {
      session1Date: "11 février 2027",
      session2Date: "13 avril 2027",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — 2 questions ou analyse clinique de situation / dissertation sur les méthodes d'intervention",
      optionsAuChoix: [
        "Option A : Dissertation théorique sur l'architecture des 4 dimensions du métier, la controverse professionnelle et le passage des querelles de personnes aux disputes de métier.",
        "Option B : Analyse méthodologique d'un dispositif clinique (justifier pourquoi recourir à l'autoconfrontation croisée en 3 phases, le primat du « comment » sur le « pourquoi » et les conditions de sécurité/volontariat).",
      ],
      recommandationsNotation:
        "Le jury attend une distinction rigoureuse entre méthode et méthodologie, une définition précise des 4 dimensions sans réduire le style à la personnalité, ni la prescription impersonnelle à une pathologie en soi.",
    },
    consignesOralesProf: [
      {
        titre: "Activité Distante n°1 (Vendredi 20 nov. 2026) : Polysémie du « Pouvoir d'agir »",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Lire en priorité les deux textes de Yves Clot & Pascal Simonet (2015, « Pouvoirs d'agir et marges de manœuvre », Le travail humain) et Pierre Rabardel (parmi les 4 textes déposés sur l'ENF Moodle ; travail conseillé en groupes de 4 pour se répartir les lectures) et répondre à la problématique : « Quand des concepts homonymes (pouvoir d'agir) se rencontrent dans l'espace social, que deviennent les notions qui en découlent ? ».",
        echeance: "Vendredi 20 novembre 2026 (préparation avant le mercredi 25 nov.)",
        modaliteRendu: "Travail sur l'ENF / Moodle (individuel ou en sous-groupe de 4)",
        recommandationsProf:
          "Identifier clairement comment chaque auteur ou acteur social définit le « pouvoir d'agir » — « un train peut en cacher un autre » !",
      },
      {
        titre: "Activité Distante n°2 (Vendredi 27 nov. 2026) & Suite du cycle",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Poursuivre les travaux cliniques et méthodologiques avant les deux prochaines webconférences de M. Wuilleumier (mercredis 25 novembre et 2 décembre 2026, 18h00–21h00), qui approfondiront l'exemple de l'EHPAD et présenteront l'instruction au sosie.",
        echeance: "25 novembre et 2 décembre 2026",
        modaliteRendu: "Préparation des échanges interactifs en webconférence",
        recommandationsProf:
          "Garder trace écrite des questions sur l'articulation comment/pourquoi et sur les limites pratiques en PME ou travail sur écran.",
      },
    ],
    syntheseSections: [
      {
        numero: "I",
        titre: "Socle récapitulatif : Réel de l'activité, Bakhtine, Bobineur & Double vie du style",
        points: [
          {
            titre: "Du réalisé au réel de l'activité, fatigue, catachrèse et Canguilhem",
            contenu:
              "Revenant sur les séances de Pr. Lagabrielle et Mme Roussan avec Charlotte, Mansour et Marie-Ève, M. Wuilleumier rappelle que « le réalisé n'a plus le monopole du réel » (Clot, Travail et pouvoir d'agir) : le réel inclut tout le possible, l'impossible et l'activité ravalée qui génère la « mauvaise fatigue » et les ruminations nocturnes (par opposition à la bonne fatigue de l'action accomplie). Travailler consiste à arbitrer en situation dans des dilemmes (prescriptions, ressources, destinataires), notamment via la catachrèse (talon de chaussure pour enfoncer un clou ; témoignage de Marie-Ève sur l'explosion des arrêts maladie quand un management directif interdit toute initiative). Cela rejoint la santé normative de Georges Canguilhem : pouvoir créer entre les choses des rapports qui ne leur viendraient pas sans moi et porter la responsabilité de ses actes.",
            auteurs: ["Yves Clot (2008/2017)", "Georges Canguilhem", "Alain Wisner"],
            conceptsCles: ["Bonne vs mauvaise fatigue", "Travailler = arbitrer en dilemmes", "Catachrèse", "Santé normative"],
          },
          {
            titre: "Bakhtine (instances du dialogue), cas du bobineur & double vie du style",
            contenu:
              "À l'oral de la séance, M. Wuilleumier distingue l'interlocuteur (destinataire), l'adresse à soi développant la pensée selon Vygotski (« subdestinataire » au sens pédagogique de dialogue intérieur / activité intrapersonnelle) et le surdestinataire (tiers idéal et règles du métier chez Bakhtine). La vérité naît collectivement entre personnes (et non dans l'esprit d'un seul individu ou d'un réseau comme Truth Social). Dans le cas du bobineur en autoconfrontation simple, l'opérateur commence par le « on » indéterminé des règles du métier (compter les spires = genre), puis sous la relance de l'intervenant passe au « je » de sa façon propre de former l'isolant (style). Plus large que la seule catachrèse instrumentale, ce style ouvre une double vie : recréer le genre professionnel ET se transformer soi-même comme sujet.",
            auteurs: ["Mikhaïl Bakhtine", "Lev Vygotski", "Yves Clot"],
            conceptsCles: ["Destinataire / Dialogue intérieur / Surdestinataire", "Cas du bobineur", "Double vie du style"],
          },
        ],
      },
      {
        numero: "II",
        titre: "L'Architecture du métier en 4 dimensions, Controverse & Direction instituante",
        points: [
          {
            titre: "La boucle infinie des 4 dimensions & le rattachement au métier",
            contenu:
              "Reprenant la boucle de Prisca Lutumba, M. Wuilleumier détaille les 4 dimensions solidaires du métier vivant : 1) Personnelle (investissement singulier nourrissant le style en situation, à ne pas confondre avec la personnalité ou la tenue) ; 2) Interpersonnelle (échanges quotidiens entre collègues et hiérarchie incluant l'intrapersonnel) ; 3) Impersonnelle (prescriptions, fiches de poste, cahiers des charges) ; 4) Transpersonnelle (mémoire collective impersonnelle pour agir = genre professionnel). Le genre appartient toujours au métier (aides-soignantes, infirmiers), non à l'entreprise seule — d'où la difficulté en PME ou poste isolé qui oblige à des montages inter-structures (ex. directrices d'associations, ANACT sur les routiers).",
            auteurs: ["Yves Clot", "Prisca Lutumba"],
            conceptsCles: ["Personnelle / Interpersonnelle / Impersonnelle / Transpersonnelle", "Mémoire collective du métier", "Inter-structures en PME"],
          },
          {
            titre: "Controverse professionnelle, nécrose gestionnaire & limites du Codev",
            contenu:
              "Structurellement traversé par des conflits de critères sur le travail bien fait, le métier vit de la controverse autour d'un objet-lien (« ce que les professionnels partagent est moins intéressant que ce qu'ils ne partagent pas ») : quand les disputes professionnelles refluent, les querelles de personnes enflent. Loin de rejeter la dimension impersonnelle (vitale), Clot dénonce sa dérive lorsque l'imaginaire gestionnaire (indicateurs macro hors-sol) coupe le dialogue avec les pairs et nécrose le métier — la ligne hiérarchique devant assumer un rôle de direction instituante. À la question sur les ateliers de co-développement (Marie-Ève), M. Wuilleumier souligne que le codev vise une solution rapide collective sans le temps d'élaboration long ni la posture naïve permettant de déconstruire les automatismes incorporés.",
            auteurs: ["Yves Clot"],
            conceptsCles: ["Objet-lien", "Inflation des querelles / Déflation des disputes", "Direction instituante vs imaginaire gestionnaire", "Nécrose du métier"],
          },
        ],
      },
      {
        numero: "III",
        titre: "Méthode vs Méthodologie & L'Autoconfrontation Croisée en 3 phases",
        points: [
          {
            titre: "Méthodologie historico-développementale : « Transformer pour comprendre »",
            contenu:
              "Contre la confusion fréquente (même au CNRTL), la méthodologie est la réflexion globale sur les méthodes, tandis que l'autoconfrontation ou l'instruction au sosie sont des méthodes (outils). Inspirée de Vygotski (« L'homme est plein à chaque minute de possibilités non réalisées »), la méthodologie historico-développementale rejette l'observation directe insuffisante au profit de méthodes indirectes provoquant une transformation réglée de l'action pour en faire l'objet d'une nouvelle expérience. Deux prérequis régissent l'autoconfrontation croisée : le plurilinguisme professionnel et un furet dialogique concret.",
            auteurs: ["Lev Vygotski", "Yves Clot"],
            conceptsCles: ["Méthode vs Méthodologie", "Possibilités non réalisées", "Transformer pour comprendre", "Plurilinguisme & Furet dialogique"],
          },
          {
            titre: "Les 3 phases, le primat du « Comment » & le cas vécu en EHPAD",
            contenu:
              "Phase 1 : analyse de la demande, constitution d'un collectif volontaire sécurisé (impossible s'il règne la peur ou une forte asymétrie statutaire/syndicale), observation située non neutre mais non-participante en posture naïve pour dénaturaliser les automatismes (« Pourquoi tout le monde fait comme ça ? »), choix concerté de la séquence vidéo. Phase 2 : bref film (3–4 min) de chaque pair, autoconfrontation simple (un pro + chercheur), puis autoconfrontation croisée sur les deux vidéos découpées par tranches de ~10 secondes (enregistrement audio). Règle cardinale : proscrire le « pourquoi » (qui produit le discours convenu) et tenir bon sur le « comment ». En EHPAD, l'aide-soignante affirmait avant vidéo « je fais tout de la main droite », alors que l'écran révélait qu'elle rasait habilement de la main gauche — la vérité établie étant prise en défaut par l'authenticité dialogique (ouvrant une ZPD). Phase 3 : déplacement de la controverse vers le collectif de départ (ex. 8–9 AS d'EHPAD) et le COPIL.",
            auteurs: ["Yves Clot", "M. Wuilleumier (terrain EHPAD)"],
            conceptsCles: ["Posture naïve & Dénaturalisation", "Autoconfrontation simple puis croisée", "Primat du Comment sur le Pourquoi", "Déplacement (Phase 3)"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Architecture du métier en 4 dimensions (Yves Clot & Prisca Lutumba)",
        colonnes: ["Dimension", "Fonction vivante dans le métier", "Risque clinique / Rupture"],
        lignes: [
          {
            axe: "Personnelle",
            valeurs: [
              "Style en situation, appropriation corporelle et singulière de la tâche.",
              "Écrasement subjectif si application robotique imposée sans marge d'initiative.",
            ],
          },
          {
            axe: "Interpersonnelle",
            valeurs: [
              "Échanges quotidiens entre pairs et hiérarchie (avec part intrapersonnelle).",
              "Déport des débats de travail en querelles interpersonnelles destructrices.",
            ],
          },
          {
            axe: "Impersonnelle",
            valeurs: [
              "Prescriptions, fiches de poste et cahiers des charges (direction instituante).",
              "Nécrose par hypertrophie bureaucratique et imaginaire gestionnaire hors-sol.",
            ],
          },
          {
            axe: "Transpersonnelle",
            valeurs: [
              "Genre professionnel : mémoire collective et critères implicites du bien-faire.",
              "Costume trop étroit non discuté ou isolement sans collectif en petite structure.",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — L'Autoconfrontation Croisée en 3 Phases",
        colonnes: ["Phase", "Dispositif opérationnel", "Enjeu clinique & Conditions"],
        lignes: [
          {
            axe: "Phase 1 · Cadre & Observation",
            valeurs: [
              "Analyse de demande, collectif volontaire, observation en posture naïve, choix du furet dialogique.",
              "Dénaturaliser les routines incorporées ; vérifier l'absence de peur ou d'asymétrie bloquante.",
            ],
          },
          {
            axe: "Phase 2 · Simple puis Croisée",
            valeurs: [
              "2 vidéos courtes (3–4 min) → simple (1 pro + chercheur) → croisée (2 pairs face aux 2 vidéos).",
              "Tenir sur le « Comment » (pas le « Pourquoi ») sur tranches de 10 s pour ouvrir une ZPD.",
            ],
          },
          {
            axe: "Phase 3 · Déplacement",
            valeurs: [
              "Retour des controverses vers l'équipe entière de métier, le COPIL et les pairs élargis.",
              "Inscrire les trouvailles dans le genre collectif et faire évoluer la prescription.",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Méthode vs Méthodologie",
        erreurCourante: "Employer indifféremment « méthode » et « méthodologie » comme synonymes (usage courant du CNRTL).",
        rectificationAttendue:
          "En clinique de l'activité, la méthodologie désigne le cadre épistémologique historico-développemental (« transformer pour comprendre ») ; l'autoconfrontation croisée et l'instruction au sosie sont des méthodes.",
        contexte: "Cadrage méthodologique (02:04:17).",
      },
      {
        titre: "Style professionnel vs Style personnel",
        erreurCourante: "Définir le style professionnel comme la personnalité, le charisme ou le comportement général de l'individu.",
        rectificationAttendue:
          "Faux ami : le style professionnel s'exerce en situation sur une tâche donnée, en dialogue avec le genre transpersonnel (ex. la forme donnée à l'isolant par le bobineur).",
        contexte: "Question de Cécile sur la dimension personnelle (01:07:50).",
      },
      {
        titre: "Statut de la prescription (Dimension impersonnelle)",
        erreurCourante: "Penser que la clinique de l'activité prône la suppression des prescriptions managériales.",
        rectificationAttendue:
          "La dimension impersonnelle est une composante vitale du métier : seule son hypertrophie gestionnaire coupée du réel (« imaginaire gestionnaire ») provoque la nécrose.",
        contexte: "Rôle de la direction instituante (01:42:50).",
      },
      {
        titre: "Règle d'or de l'autoconfrontation : Comment vs Pourquoi",
        erreurCourante: "Demander aux professionnels « pourquoi vous faites ce geste ? » lors du visionnage.",
        rectificationAttendue:
          "Le « pourquoi » produit le discours convenu et rationnel du « on ». Seule la description minutieuse du « comment » en posture naïve prend la vérité établie en défaut (cas EHPAD de la main gauche).",
        contexte: "Phase 2 de l'autoconfrontation (02:49:00).",
      },
      {
        titre: "Genre de métier vs Organisation",
        erreurCourante: "Chercher le genre professionnel à l'échelle indifférenciée de l'entreprise entière.",
        rectificationAttendue:
          "Le genre et les 4 dimensions sont rattachés au métier (aides-soignantes, éducateurs, directrices), quitte à réunir des pairs issus de plusieurs structures en contexte de PME.",
        contexte: "Questions de Céline et Cécile (01:15:10).",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Réel de l'activité, bonne fatigue, Canguilhem & Cas du bobineur]
[00:23:10] M. WUILLEUMIER : « Le réalisé n'a plus le monopole du réel : la bonne fatigue vous fait dormir la nuit, la mauvaise fatigue c'est ce que vous ruminez, tout ce qu'on aurait voulu faire et qu'on n'a pas pu accomplir. »
[00:59:20] M. WUILLEUMIER : « Dans la double vie du style, il y a à la fois l'opportunité d'une recréation du genre de métier et l'opportunité pour le sujet de se recréer, de se transformer soi-même au travers de l'activité. »

[2. Architecture du métier (4 dimensions), controverse & direction instituante]
[01:15:10] M. WUILLEUMIER : « Le genre professionnel et les quatre dimensions sont associés au métier, pas à une organisation donnée : travaille-t-on avec les aides-soignantes, les ASH ou les infirmières ? »
[01:28:30] M. WUILLEUMIER : « L'inflation des querelles entre personnes se substitue à la déflation des disputes professionnelles : quand on ne peut pas débattre des manières de faire, le conflit se déporte entre les personnes. »
[01:45:56] M. WUILLEUMIER : « La dimension impersonnelle n'est pas vouée à la nécrose : elle nourrit l'activité dès lors que la direction instituante s'appuie sur le réel plutôt que sur un imaginaire gestionnaire hors-sol. »

[3. Méthodologie historico-développementale & Autoconfrontation croisée]
[02:09:40] M. WUILLEUMIER : « Vygotski le dit : "L'homme est plein à chaque minute de possibilités non réalisées." Ce n'est pas comprendre pour transformer, c'est transformer pour comprendre : en mouvement qu'un métier montre ce qu'il est. »
[02:44:48] M. WUILLEUMIER (sur une équipe marquée par la peur) : « Quand vous parlez de peur dans l'équipe, les conditions de sécurité ne sont pas réunies pour lancer une autoconfrontation croisée : la phase 1 demande d'abord de rebâtir la confiance et le volontariat. »
[02:51:40] M. WUILLEUMIER (cas vécu en EHPAD) : « L'aide-soignante me disait au départ : "Je suis droitière, je fais tout de la main droite." Mais à l'écran, en décrivant le comment du rasage, elle rasait très habilement de la main gauche. La vérité établie est prise en défaut par l'authenticité dialogique. »

[4. Activité Distante & Clôture d'Yves Clot]
[03:03:00] M. WUILLEUMIER : « Un train peut en cacher un autre — un pouvoir d'agir peut-il en cacher un autre ? Quand des concepts homonymes se rencontrent dans l'espace social, que deviennent les notions qui en découlent ? »
[03:04:16] M. WUILLEUMIER (citant Yves Clot) : « Dans les dialogues professionnels que nous organisons, le dernier mot n'est jamais dit, le dernier acte n'est jamais accompli. »`,
    bibliographieCitee: [
      {
        titre: "Synthèse académique du Cours 7 PST106 (M. Wuilleumier) [PDF]",
        auteur: "M. Wuilleumier · Plateforme PST (éd.)",
        annee: "18 novembre 2026",
        remarque: "Synthèse structurée en 4 pages : 4 dimensions du métier, double vie du style, méthodologie historico-développementale, autoconfrontation croisée en 3 phases et cas EHPAD.",
        url: "/docs/PST106_Cours_7_Synthese_Wuilleumier.pdf",
      },
      {
        titre: "Retranscription complète nettoyée et horodatée du Cours 7 PST106 [PDF]",
        auteur: "M. Wuilleumier (corpus audio 03h04m48s, 344 séquences utiles)",
        annee: "18 novembre 2026",
        remarque: "Restitution intégrale chronologique nettoyée des scories STT en 7 chapitres avec sommaire complet.",
        url: "/docs/PST106_Cours_7_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Travail et pouvoir d'agir",
        auteur: "Yves Clot",
        annee: "2008 / 2e éd. 2017 (PUF, disponible sur Cairn)",
        remarque: "Ouvrage pivot du cours : réel de l'activité, cas du bobineur, double vie du style, 4 dimensions du métier, objet-lien et autoconfrontation croisée.",
      },
      {
        titre: "Pouvoirs d'agir et marges de manœuvre (Texte prioritaire n°1 AD)",
        auteur: "Yves Clot & Pascal Simonet",
        annee: "2015 (Le travail humain, vol. 78, n° 1, pp. 31–52)",
        remarque: "Premier texte recommandé pour l'Activité Distante du 20 novembre 2026 sur la polysémie du concept de « pouvoir d'agir ».",
      },
      {
        titre: "Le sujet capable / Approche instrumentale et pouvoir d'agir (Texte prioritaire n°2 AD)",
        auteur: "Pierre Rabardel",
        annee: "1995 / 2005",
        remarque: "Deuxième texte prioritaire de l'AD confrontant les conceptions du pouvoir d'agir.",
      },
      {
        titre: "Le Normal et le Pathologique / Définition de la santé normative",
        auteur: "Georges Canguilhem",
        annee: "1966 / PUF",
        remarque: "« Je me porte bien dans la mesure où je me sens capable de porter la responsabilité de mes actes et de créer entre les choses des rapports qui ne leur viendraient pas sans moi. »",
      },
    ],
  },
  {
    id: "pst106-s8",
    moduleKey: "pst106",
    moduleLabel: "PST106 — Clinique de l'activité et psychologie du travail",
    numeroSeance: 8,
    titre: "Polysémie du Pouvoir d'Agir, Nécrose du Genre (La Poste) & Intervention Réelle en EHPAD",
    sousTitre:
      "Compléments (Bonnemain & Clot, style ≠ personnel), corrigé AD des 4 conceptions du pouvoir d'agir (Pastré, Gouédard/Rabardel, Vallerie/Le Bossé, Clot & Simonet), atelier « Ancien facteur & jeune rouleur » et cas EHPAD PST218",
    enseignant: "M. William WUILLEUMIER (Psychologue du travail Cnam)",
    dateSeance: "Mercredi 25 novembre 2026 (18h00 – 21h00)",
    format: "webconference",
    dureeEnregistrement: "3 h 03 min 17 s (322 séquences SRT)",
    resumeExecutif: [
      "Compléments Cours 7 : autoconfrontation en travail de bureau (Bonnemain & Clot, 2017 — planification des tournées d'éboueurs), pourquoi (canons du discours convenu) vs comment (redécouverte et recréation de soi) et distinction fine entre style professionnel (manifestation observable) et dimension personnelle (qui inclut tout le réel non réalisé selon Vygotski).",
      "Corrigé AD « Un concept peut-il en cacher un autre ? » : confrontation rigoureuse de 4 conceptions du pouvoir d'agir — Pastré (L'Établi de Linhart), Gouédard & Rabardel (2012, PISTES / QPA), Vallerie & Le Bossé (DPA Québec) et Clot & Simonet (2015 : développement du rayon d'action de l'ACTIVITÉ au centre du triangle Sujet–Objet–Autrui, en boucle avec les 3 marges de manœuvre OCP).",
      "Distinction Concept vs Notion (CNRTL, Deleuze & Guattari, dessin de Tomy aux 50 ans de la chaire Cnam) : alerte sur le piège volontaire de l'énoncé d'AD (relation bidirectionnelle entre notion intuitive et concept scientifique).",
      "Atelier clinique « Ancien facteur & jeune rouleur » (Clot, 2008, pp. 174–175) : asymétrie productive, posture du chercheur (2 questions + 3e présence silencieuse, ≠ médiateur), 3 temps d'adresse de Mme J. (Bakhtine), invariants « toujours / jamais » issus du cas singulier de « L. » et diagnostic de « nécrose du genre professionnel ».",
      "Intervention réelle en EHPAD (PST218, Bordeaux, 2022, supervisée par S. Ladreyt & J. Pouyaud) : commande isolée de la directrice (CODIR non informé, arrêt maladie) face à 4 demandes (Directrice, AS « pas les faire briller / Qui nous rassure ? », ASH « sale boulot » [Lhuilier] / refus du film, IDE individuelles) → réponse en 3 volets incluant la « fonction soignante en partage » (Cynthia Fleury).",
      "Déontologie des verbatims (pont PST123, question de Charlotte) : indispensables pour l'analyse clinique interne, mais jamais remontés sous forme identifiable dans un compte-rendu direction. Nouvelle AD sur « l'après-intervention » (Sabrina Rouat) + 2 vignettes ENF pour le 2 décembre.",
    ],
    consignesOralesProf: [
      {
        titre: "Nouvelle Activité Distante (vendredi 27 nov.) : « L'Après-Intervention »",
        typeTravail: "lecture",
        consigneExacte:
          "Lire les 3 textes déposés sur la plateforme portant sur ce qui se passe après le départ des psychologues du travail (incluant Sabrina Rouat sur la naissance d'une « clinique de l'intervention »), et préparant l'instruction au sosie ainsi que le concept de référent métier.",
        echeance: "Pour le mercredi 2 décembre 2026",
        modaliteRendu: "Lecture réflexive personnelle (pas de dépôt obligatoire sur le forum)",
        recommandationsProf:
          "S'interroger sur la pérennité des effets de l'intervention et ce qui se joue pour les intervenants au moment de quitter l'organisation.",
      },
      {
        titre: "Lecture préparatoire de 2 vignettes EHPAD sur l'ENF",
        typeTravail: "lecture",
        consigneExacte:
          "Télécharger et lire sur l'ENF les deux vignettes de l'intervention EHPAD déjà mises en ligne à la date du 25 novembre : 1) « Le petit revers de la lèvre » et 2) « Ne me parlez pas de timing ».",
        echeance: "Avant la webconférence du mercredi 2 décembre 2026 (18h00–21h00)",
        modaliteRendu: "Préparation de l'atelier d'analyse collectif en séance 9",
        recommandationsProf:
          "Permettra de gagner du temps pour analyser les verbatims et conclure sur les écarts méthodologiques entre cette intervention EHPAD et le modèle d'Yves Clot.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Compléments Cours 7 : Travail de Bureau, Pourquoi/Comment & Style ≠ Personnel",
        points: [
          {
            titre: "Autoconfrontation en travail de bureau & primat du « comment »",
            contenu:
              "Exemple d'autoconfrontation en travail de bureau chez Antoine Bonnemain & Yves Clot (2017, « Clinique de l'activité : les affects dans l'autoconfrontation ») autour des chefs d'équipe planifiant les tournées d'éboueurs : le tableau de répartition des tâches (remis la veille ou le matin même ?) sert d'objet-lien / furet dialogique. Rappel méthodologique : le « pourquoi » produit justification défensive et canons du discours convenu (l'unité du « on »), tandis que le « comment » soutient une description fine jusqu'à prendre en défaut la vérité établie → le sujet devient observateur de lui-même (redécouverte puis recréation de soi).",
            auteurs: ["Antoine Bonnemain & Yves Clot (2017)", "Yves Clot"],
            conceptsCles: ["Objet-lien / Furet dialogique", "Canons du discours convenu", "Observateur de soi-même"],
          },
          {
            titre: "Distinction rigoureuse : Style professionnel ≠ Dimension personnelle",
            contenu:
              "M. Wuilleumier nuance le raccourci du Dictionnaire des concepts de la professionnalisation assimilant « métier personnel » et « style ». Les 4 instances sont des dimensions en interaction. Le style est la manifestation observable dans l'activité réalisée du remaniement du genre (ex. manière d'attacher les paquets de courriers avec des élastiques), fruit d'un dialogue interne entre les 4 dimensions ; la dimension personnelle déborde le style car elle englobe aussi le réel non réalisé (Vygotski : « l'homme est plein à chaque minute de possibilités non réalisées »).",
            auteurs: ["Yves Clot", "Lev Vygotski"],
            conceptsCles: ["Style professionnel (manifestation observable)", "Dimension personnelle vs Style", "Réel non réalisé"],
          },
        ],
      },
      {
        numero: "2",
        titre: "Corrigé AD : Les 4 Conceptions du « Pouvoir d'Agir » & Concept vs Notion",
        points: [
          {
            titre: "Individu (Pastré, Gouédard/Rabardel, Vallerie/Le Bossé) vs Activité (Clot & Simonet)",
            contenu:
              "Quatre conceptualisations coexistent sous le même mot (appui direct sur les 3 articles de l'AD) : 1) Pierre Pastré (relecture de L'Établi de Robert Linhart, 1978 : l'ouvrier Citroën paralysé par l'établi standardisé garde un pouvoir d'agir intrinsèque intact, seule sa capacité d'agir est empêchée) ; 2) Catherine Gouédard & Pierre Rabardel (2012, PISTES 14-2 : modèle du sujet capable, outil QPA croisant la transposition du questionnaire québécois MIPPA [29 items] et l'entretien qualitatif — 75 % des verbatims relèvent du pouvoir d'agir et 25 % des capacités ; note sur Leplat 2011 : savoir/pouvoir/être disposé ; cadres non superposables) ; 3) Bernard Vallerie & Yann Le Bossé (2006, Les Sciences de l'éducation 39-3 : DPA-PC dépassant « hypothèse des carences » et « grand soir », posture « Ni policier, ni sauveur », distinction personnes « concernées » vs « impliquées », jamais « pouvoir sur autrui », 4 axes sur le terrain de Savoie) ; 4) Yves Clot & Pascal Simonet (2015, Le Travail Humain 78-1, pp. 31–52) : rupture radicale — le pouvoir d'agir n'est pas « une puissance virtuelle du dedans amputée du dehors » (et se distingue d'agency/Butler, capabilité/Sen, environnement capacitant/Falzon), mais le développement du rayon d'action de l'ACTIVITÉ triadique (Sujet–Objet–Autrui), mû par l'alternance fonctionnelle entre Sens (source d'énergie) et Efficience (source d'économie) = efficacité réelle. Ses 3 registres de marges de manœuvre (MMO impersonnelles, MMC collectives, MMP personnelles — Fig. 1) restent des artefacts en jachère tant que le pouvoir d'agir ne les transforme pas en instruments réels.",
            auteurs: ["Yves Clot & Pascal Simonet (2015)", "Pierre Pastré", "Robert Linhart (1978)", "Catherine Gouédard & Pierre Rabardel (2012)", "Bernard Vallerie & Yann Le Bossé (2006)"],
            conceptsCles: ["Rayon d'action de l'activité", "MMO / MMC / MMP (artefacts vs instruments)", "Alternance Sens ↔ Efficience", "QPA / MIPPA (Gouédard/Rabardel)", "DPA-PC : concernées ≠ impliquées (Vallerie/Le Bossé)"],
          },
          {
            titre: "Concept vs Notion & vigilance épistémologique (Deleuze & Guattari)",
            contenu:
              "D'après le CNRTL, le concept est une construction scientifique opératoire testée dans un champ théorique, tandis que la notion relève d'une compréhension intuitive du langage courant aux contours flous (ex. récupération managériale illustrée par les croquis de Tomy aux 50 ans de la chaire Cnam : « Ne touche pas à mon pouvoir d'agir »). Piège volontaire de l'énoncé d'AD : non seulement les concepts se déforment en notions dans l'espace public, mais la notion est aussi le terreau d'où s'élaborent les concepts (Gilles Deleuze & Félix Guattari, 1991).",
            auteurs: ["Gilles Deleuze & Félix Guattari (1991)", "Tomy (50 ans Chaire Cnam)"],
            conceptsCles: ["Concept vs Notion", "Questionner la question", "Appropriation sociale des concepts"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Atelier Clinique : « Ancien Facteur & Jeune Rouleur » (Clot, 2008, pp. 174–175)",
        points: [
          {
            titre: "Posture du chercheur (≠ médiateur) & 3 temps d'adresse de Mme J. (Bakhtine)",
            contenu:
              "Autoconfrontation croisée à La Poste (tri du courrier) marquée par une asymétrie d'expérience productive (Mme J., > 20 ans d'ancienneté vs jeune rouleur). Le chercheur n'est pas un médiateur cherchant un terrain d'entente : il pose 2 brèves questions orientées (« Vous voyez ça comme ça, vous ? ») pour provoquer la dispute professionnelle, s'efface aussitôt mais reste une 3e présence active même silencieuse. L'adresse de Mme J. bascule en 3 temps (Bakhtine) : monologue récitant le « on » du genre (sub/surdestinataire) → dialogue conflictuel avec le jeune → adresse double (jeune + chercheur) questionnant la transformation du collectif (« Avant on aidait, aujourd'hui c'est la compétition »).",
            auteurs: ["Yves Clot (2008)", "Mikhaïl Bakhtine"],
            conceptsCles: ["Asymétrie d'expérience", "3e présence silencieuse", "3 temps d'adresse", "Dispute professionnelle ≠ médiation"],
          },
          {
            titre: "Invariants (« toujours / jamais »), cas « L. » & « Nécrose du genre professionnel »",
            contenu:
              "Le monologue de Mme J. comporte des marqueurs de répétition sans fin (« toujours », « jamais ») et des répétitions littérales (« plus on les aide, moins elles s'en sortent » ×3, « paniquer » ×4), tous généralisés à partir d'une seule expérience singulière (le collègue novice « L. » aidé pendant des mois qui restait perdu). Yves Clot diagnostique une « nécrose du genre professionnel » figé en « équivalent général » : la clinique de l'activité vise à « faire dérailler ce discours » pour refaire expérience de l'expérience vécue (alors qu'en 22 ans les tournées se sont allongées et les secteurs changent tous les 2 jours).",
            auteurs: ["Yves Clot (2008)"],
            conceptsCles: ["Nécrose du genre professionnel", "Équivalent général", "Faire dérailler le discours", "Refaire expérience de l'expérience vécue"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Intervention Réelle en EHPAD (PST218, 2022) : Commande, 4 Demandes & Déontologie",
        points: [
          {
            titre: "Commande isolée vs 4 demandes hétérogènes (Directrice, AS, ASH, IDE)",
            contenu:
              "Intervention de 6 mois (janv.–juil. 2022, EHPAD bordelais ~100 lits, binôme supervisé par Sébastien Ladreyt et Jacques Pouyaud). La directrice commande un travail sur l'absentéisme/turnover AS & ASH sans prévenir le CODIR avant le jour J, disqualifie les intervenants (« ils déambulent dans les couloirs ») et les sollicite pour sa propre détresse jusqu'à son arrêt maladie début mars. Côté terrain : les AS expriment une forte demande collective (3-4 au lieu de 8,5 ETP, verbatim IDEC « je ne vous demande pas de les faire briller » → « pour moi ce n'est pas du travail, on a maltraité nos résidents », « Qui nous rassure ? », féminin générique selon Pascale Molinier) ; les ASH dénoncent leur invisibilisation (« troisième roue du carrosse ») mais refusent catégoriquement d'être filmées (« sale boulot » de Dominique Lhuilier) ; les 7 IDE n'ont que des demandes individuelles.",
            auteurs: ["Sébastien Ladreyt & Jacques Pouyaud", "Pascale Molinier", "Dominique Lhuilier"],
            conceptsCles: ["Déplacement Commande → Demandes", "Sale boulot (Lhuilier)", "Féminin générique (Molinier)", "Travail bien fait vs maltraitance subie"],
          },
          {
            titre: "Réponse clinique en 3 volets (Cynthia Fleury) & déontologie des verbatims",
            contenu:
              "Dispositif déployé en 3 volets : 1) autoconfrontation croisée adaptée avec les AS pour soutenir le métier ; 2) visibilisation des ASH par la « fonction soignante en partage » (Cynthia Fleury, psychothérapie institutionnelle : participation quotidienne au cadre de soin sans accomplir d'actes soignants) ; 3) éclairage direction sur les violences subies par les soignants. Sur la question de Charlotte (pont PST123) : les verbatims (idéalement enregistrés en audio) sont indispensables à l'analyse clinique interne, mais ne doivent jamais être remontés de façon identifiable dans un compte-rendu à la direction.",
            auteurs: ["Cynthia Fleury", "M. William Wuilleumier"],
            conceptsCles: ["Fonction soignante en partage", "Déontologie des verbatims (Analyse vs Compte-rendu)", "Audio vs Vidéo"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Les 4 Conceptions du « Pouvoir d'Agir » (Corrigé AD du 20 nov.)",
        description: "Comparaison canonique pour ne jamais confondre l'ancrage individuel et la clinique de l'activité",
        colonnes: ["Auteurs / Courant", "Ancrage", "Définition centrale", "Repère / Outil clé"],
        lignes: [
          {
            axe: "Pierre Pastré (Didactique prof.)",
            valeurs: ["Sujet (intrinsèque)", "Pouvoir d'agir intact chez le sujet ; capacité d'agir empêchée en situation", "L'Établi de Robert Linhart (1978)"],
          },
          {
            axe: "Gouédard & Rabardel (2012, PISTES)",
            valeurs: ["Individu en situation", "Capacité d'agir (potentiel) vs Pouvoir d'agir (actualisation située)", "Outil QPA (Questionnement du Pouvoir d'Agir)"],
          },
          {
            axe: "Vallerie & Le Bossé (Québec, DPA)",
            valeurs: ["Personne / Collectivité", "Mener à terme un changement souhaité et défini par la personne", "Travail social / empowerment (agent de changement)"],
          },
          {
            axe: "Clot & Simonet (2015, Cnam)",
            valeurs: ["ACTIVITÉ (Sujet–Objet–Autrui)", "Développement du rayon d'action de l'activité dans le milieu", "Boucle réciproque avec 3 marges de manœuvre (OCP)"],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Confondre le pouvoir d'agir de Le Bossé / Rabardel avec celui d'Yves Clot",
        erreurCourante:
          "Définir le pouvoir d'agir en PST106 comme la capacité personnelle d'un salarié à contrôler son environnement ou à s'affirmer face aux contraintes.",
        rectificationAttendue:
          "Rappeler explicitement avec Clot & Simonet (2015) que le pouvoir d'agir n'est pas un attribut individuel (« puissance virtuelle du dedans »), mais le développement du rayon d'action de l'activité partagée, en boucle avec les marges de manœuvre OCP.",
        contexte: "PST106 Cours 8 — Corrigé de l'Activité Distante",
      },
      {
        titre: "Qualifier le chercheur en autoconfrontation de « médiateur »",
        erreurCourante:
          "Écrire que le psychologue du travail joue un rôle de médiateur cherchant à apaiser les désaccords entre ancien facteur et jeune rouleur.",
        rectificationAttendue:
          "Montrer que le clinicien provoque et soutient la dispute professionnelle pour briser la belle unité du « on » et faire dérailler la nécrose du genre, tout en restant une 3e présence active même silencieuse.",
        contexte: "PST106 Cours 8 — Atelier « Ancien facteur & jeune rouleur »",
      },
      {
        titre: "Opposer de façon binaire usage et interdiction des verbatims (PST106 vs PST123)",
        erreurCourante:
          "Croire qu'il est interdit de recueillir des verbatims en clinique du travail sous prétexte de confidentialité.",
        rectificationAttendue:
          "Distinguer les 2 scènes : les verbatims exacts (enregistrés en audio) sont indispensables au travail d'analyse clinique au chevet du métier, mais proscrits sous forme identifiable dans un compte-rendu remis à la direction.",
        contexte: "PST106 Cours 8 — Question déontologique sur l'intervention EHPAD",
      },
    ],
    transcriptionIntegraleVerbatim: `— TRANSCRIPTION SÉLECTIVE DES VERBATIMS D'OR & REPÈRES HORODATÉS (3h03m17s · 322 séquences SRT) —

[1. Pourquoi vs Comment & Style ≠ Dimension Personnelle]
[00:08:15] M. WUILLEUMIER : « Écarter le "pourquoi" évite de déclencher une parole défensive qui réactive les canons du discours convenu — cette belle unité du "on a toujours fait comme ça". Tenir bon sur le "comment" rend le sujet observateur de lui-même dans son activité pour une redécouverte puis une recréation de soi. »
[00:18:10] M. WUILLEUMIER : « Le style professionnel est la manifestation observable dans l'activité réalisée du remaniement du genre (comment j'assemble mon paquet de courriers avec des élastiques). La dimension personnelle est plus vaste : elle inclut tout le réel non réalisé — comme dit Vygotski, l'homme est plein à chaque minute de possibilités non réalisées. »

[2. Polysémie du Pouvoir d'Agir & Concept vs Notion]
[00:40:15] M. WUILLEUMIER : « Contrairement à Pastré (sur L'Établi de Linhart), à Gouédard & Rabardel ou à Vallerie & Le Bossé (DPA), Clot & Simonet (2015) refusent de voir le pouvoir d'agir comme une "puissance virtuelle du dedans que les contraintes du dehors viendraient amputer". C'est le développement du rayon d'action de l'ACTIVITÉ au centre du triangle Sujet–Objet–Autrui, en boucle avec les 3 marges de manœuvre OCP. »
[00:58:20] M. WUILLEUMIER : « Méfiez-vous des questions des intervenants du Cnam : les notions découlent parfois de la vulgarisation des concepts, mais sans notion intuitive au départ, on n'élabore pas non plus de concept (Deleuze & Guattari). »

[3. Ancien Facteur & Jeune Rouleur : Nécrose du Genre]
[01:26:10] M. WUILLEUMIER : « Le chercheur n'est pas un médiateur qui cherche un terrain d'entente : il pose 2 brèves questions pour créer la dispute professionnelle, s'efface, mais reste présent même silencieux. »
[01:54:50] M. WUILLEUMIER : « Yves Clot parle de "nécrose du genre professionnel" : à partir du cas singulier de L., une activité avortée est devenue un équivalent général gelé dans un script insistant ("toujours", "jamais"). Notre rôle est de faire dérailler ce discours pour refaire expérience de l'expérience vécue. »

[4. Intervention EHPAD (PST218) & Déontologie des Verbatims]
[02:39:10] M. WUILLEUMIER (VERBATIM AS EHPAD) : « L'aide-soignante raconte : on est 3 ou 4 au lieu de 8,5 ETP, et l'IDEC me dit "je ne vous demande pas de les faire briller". Elle répond : "Pour moi, ce n'est pas du travail — on a maltraité nos résidents." Et une autre demande : "Qui nous rassure ?" »
[02:41:50] M. WUILLEUMIER : « En clinique de l'activité, on ne fait pas sans verbatims pour l'analyse au chevet de la personne ; mais pour la direction, méfiance absolue : on ne remonte jamais de citations permettant d'identifier qui parle. Et pour les ASH ("sale boulot" de Lhuilier), nous avons mobilisé la "fonction soignante en partage" de Cynthia Fleury. »`,
    bibliographieCitee: [
      {
        titre: "Synthèse Académique Bento — PST106 Cours 8 (M. William Wuilleumier)",
        auteur: "M. William Wuilleumier",
        annee: "25 novembre 2026",
        remarque:
          "Document PDF Bento en 4 pages : compléments (Bonnemain/Clot, style ≠ personnel), tableau comparatif des 4 conceptions du pouvoir d'agir, concept vs notion, atelier La Poste (nécrose du genre), cas EHPAD PST218 et consignes du 2 décembre.",
        url: "/docs/PST106_Cours_8_Synthese_Wuilleumier.pdf",
      },
      {
        titre: "Transcription Intégrale Nettoyée & Horodatée — PST106 Cours 8 (M. William Wuilleumier)",
        auteur: "M. William Wuilleumier & Auditeurs Cnam",
        annee: "25 novembre 2026",
        remarque:
          "Retranscription intégrale épurée des 322 séquences SRT (3h03m17s, 26 pages) structurée en 6 chapitres chronologiques.",
        url: "/docs/PST106_Cours_8_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Clinique de l'activité : les affects dans l'autoconfrontation",
        auteur: "Antoine Bonnemain & Yves Clot",
        annee: "2017 (in M. Santiago-Delefosse & M. Del Rio Carral, Dunod, pp. 131–151)",
        remarque:
          "Illustration d'autoconfrontation sur travail de bureau : planification des tournées d'éboueurs par les chefs d'équipe.",
      },
      {
        titre: "Pouvoirs d'agir et marges de manœuvre",
        auteur: "Yves Clot & Pascal Simonet",
        annee: "2015 (Le travail humain, vol. 78, n° 1, pp. 31–52)",
        remarque:
          "Texte pivot de l'AD : critique de Pastré (sur L'Établi de Linhart), rayon d'action de l'activité et 3 registres de marges de manœuvre (OCP).",
      },
      {
        titre: "Pouvoir d'agir et capacités d'agir : une perspective méthodologique ?",
        auteur: "Catherine Gouédard & Pierre Rabardel",
        annee: "2012 (PISTES)",
        remarque:
          "Distinction capacité d'agir vs pouvoir d'agir centrée sur l'individu en situation et présentation de l'outil QPA.",
      },
      {
        titre: "Le développement du pouvoir d'agir (empowerment) des personnes et des collectivités : de son expérimentation à son enseignement",
        auteur: "Bernard Vallerie & Yann Le Bossé",
        annee: "2006 (Les Sciences de l'éducation - Pour l'Ère nouvelle, vol. 39, n° 3, pp. 87–100)",
        remarque:
          "3e texte de l'AD : transposition francophone de l'empowerment (DPA-PC, 4 axes, « Ni policier, ni sauveur », personnes concernées vs impliquées, terrain protection de l'enfance en Savoie).",
        url: "https://shs.cairn.info/revue-les-sciences-de-l-education-pour-l-ere-nouvelle-2006-3-page-87?lang=fr",
      },
      {
        titre: "Le processus d'intervention en santé au travail : pour une clinique de l'intervention (AD 27 nov.)",
        auteur: "Sabrina Rouat",
        annee: "2021 (HDR Cnam / Univ. Lyon 2)",
        remarque:
          "Texte prescrit pour l'AD sur « l'après-intervention » préparant la webconférence du 2 décembre 2026.",
      },
    ],
  },

// ══════════════════════════════════════════════════════════════════════════
];
