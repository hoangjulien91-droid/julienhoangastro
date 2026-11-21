import type { SeanceCoursItem } from "./seances-types";

export const SEANCES_PST108: SeanceCoursItem[] = [
  {
    id: "pst108-s1",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 1,
    titre: "Séance 1 — Cadre Conceptuel : Langage, Communication, Dialogue et Travail",
    sousTitre: "Posture clinique au Cnam, néoconstructivisme (Golse) et confrontation Piaget vs Vygotski",
    enseignant: "Mme Véronique MAROT (Cnam)",
    dateSeance: "22–23 octobre 2026",
    format: "presentiel",
    dureeEnregistrement: "Webconférence 22/10 (1 h 05 min 51 s, 124 séq. SRT) + Présentiel 23/10 (2 enreg.)",
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
    transcriptionIntegraleVerbatim: `[0. Webconférence d'ouverture (22/10) : UE Passerelle, Posture, Lecture en spirale & Examen]
[00:10:22] MME VÉRONIQUE MAROT : « PST108 est une UE passerelle vers le Master : on n'est plus seulement dans du transfert de connaissances, on entre dans une mise au travail autour des textes et des concepts pour bâtir votre posture de psychologue clinicien du CNAM. »
[00:24:10] MME VÉRONIQUE MAROT : « En présentiel, je ne souhaite pas que le cours soit enregistré : il en va de la déontologie, de la confidentialité de mes illustrations cliniques de terrain et de votre propre entraînement à la prise de notes. »
[00:49:05] MME VÉRONIQUE MAROT : « Abordez ces textes comme une spirale : votre première lecture sera aride, mais chaque relecture viendra sédimenter la strate précédente. À l'examen, je n'attends pas du par-cœur à la manière des auteurs : j'attends Compréhension avec vos mots, Illustration et Remobilisation en situation réelle. »

[1. Langage, Langue, Communication & Réseau « Langage et Travail » (23/10)]
[00:08:20] MME VÉRONIQUE MAROT : « Dès les années 1950, la psychologie du travail montre que le travail devient de plus en plus communicationnel. Le réseau Langage et Travail (Josiane Boutet, Béatrice Fraenkel) démontre que parler au travail est une activité multimodale et située : quand la communication est prescrite de façon rigide — comme dans les centres d'appels — ou saturée par les outils numériques, elle devient directement pathogène. »
Distinction fondamentale d'examen : le Langage (faculté universelle humaine de symboliser par signes), la Langue (système conventionnel d'un groupe social analysé en 5 niveaux : phonétique/phonologie, morphologie, syntaxe, sémantique, pragmatique) et le Dialogue (échange intersubjectif dynamique).

[2. La posture clinique au Cnam : « Transformer pour comprendre » & Coopération conflictuelle]
[00:34:15] MME VÉRONIQUE MAROT : « Au Cnam, l'étymologie de "clinique" (klinê, au chevet du malade) fonde notre axiome : "Transformer pour comprendre" (Yves Clot), à rebours du positivisme qui prétend comprendre de l'extérieur avant d'agir. Dans Le travail à cœur (2010), Clot montre que la santé au travail repose sur l'institution d'une "coopération conflictuelle" : la dispute professionnelle réglée sur les critères du travail bien fait. »

[3. Bernard Golse : Néoconstructivisme, pare-excitation & accès à la tiercéité]
[01:02:40] MME VÉRONIQUE MAROT : « Le langage et la pensée précèdent l'enfant : selon Bernard Golse, l'intrapsychique de l'adulte organise l'interpersonnel, qui structure en retour l'intrapsychique du bébé. La pensée remplit 3 fonctions vitales (Freud / Winnicott) : pare-excitation (holding), réparation symbolique de l'absence (jeu de la bobine Fort/Da) et continuité narcissique, ouvrant l'enveloppe dyadique vers la triadique et la tiercéité. »

[4. Jean Piaget vs Lev Vygotski : La controverse majeure sur le langage égocentrique]
[01:35:10] MME VÉRONIQUE MAROT : « Chez Jean Piaget, l'action sensori-motrice précède le langage : l'intelligence se construit par assimilation, accommodation et équilibration majorante, de l'individuel vers le social. Ne vous laissez pas tromper : Piaget aussi est interactionniste (interaction avec le milieu physique), et non innéiste ; pour lui, le langage égocentrique est voué à disparaître. »
[01:58:45] MME VÉRONIQUE MAROT : « Lev Vygotski (Pensée et langage, 1934) inverse la perspective : toute fonction apparaît deux fois, d'abord au plan social (interpsychologique), puis individuel (intrapsychologique — primat du social). Dans l'expérience des crayons de couleur, l'enfant privé du crayon bleu parle à voix haute pour résoudre l'obstacle : le langage égocentrique s'intériorise en langage intérieur et coexiste toute la vie ! »`,
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
      {
        titre: "Synthèse Académique Bento — Cours 1 PST108 (Mme Véronique Marot)",
        auteur: "Mme Véronique Marot (Plateforme PST)",
        annee: "Octobre 2026",
        remarque: "Fiche PDF complète (2 pages) : Langage/Langue/Communication/Dialogue, Golse, matrice Piaget vs Vygotski et méthodologie 1h00.",
        url: "/docs/PST108_Cours_1_Synthese_Marot.pdf",
      },
      {
        titre: "Retranscription Complète Nettoyée — Cours 1 PST108 (Mme Véronique Marot)",
        auteur: "Mme Véronique Marot",
        annee: "Octobre 2026",
        remarque: "Édition intégrale (21 pages PDF) : Webconférence d'ouverture du 22/10 (1h05, 124 séq. SRT) + Présentiel du 23/10 (2 enreg.).",
        url: "/docs/PST108_Cours_1_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Psychologie de la communication — Théories et méthodes (Chapitre clé du 21/11)",
        auteur: "Jean-Claude Abric",
        annee: "1996 / 2019",
        remarque: "Ouvrage de référence indiqué le 22/10 par Mme Marot pour étayer l'approche psychosociologique et les entretiens.",
      },
      {
        titre: "10 études de cas en psychologie du travail et des organisations (Cas n°6 — AD)",
        auteur: "Yvon Miossec & Pascal Simonet",
        annee: "2020",
        remarque: "Support pédagogique indiqué le 22/10 pour les Activités Distantes (4 et 10 nov.) avant l'entrée directe dans Yves Clot.",
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
    "dateSeance": "26 octobre 2026",
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
            "contenu": "La neuropsychologie classique cartographie le langage : Paul Broca (1861, gyrus frontal inférieur gauche, aphasie motrice/expressive : difficulté de production articulatoire) et Carl Wernicke (1874, gyrus temporal supérieur gauche, aphasie sensorielle/réceptive : perte de la compréhension et jargonaphasie). Nuance scientifique rappelée par M. Lucy : ces localisations sont aujourd'hui tempérées par la plasticité cérébrale et le caractère probabiliste de l'imagerie IRMf. Question clinique cruciale : face à un travailleur qui bégaie, hésite, perd le fil ou s'enferme dans le mutisme, s'agit-il d'un trouble neurologique personnel ou de la manifestation clinique d'un travail empêché, d'un épuisement ou d'une dépression réactionnelle à l'organisation ?",
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
[00:55:10] M. ÉRIC LUCY : « Attention au piège diagnostique ! Quand un salarié cherche ses mots, bégaie ou s’enferme dans le mutisme, ne plaquez pas un diagnostic neuropsychologique d’aphasie de Broca ou de Wernicke : demandez-vous d’abord s’il ne s’agit pas d’une sidération psychique liée au travail empêché ! »

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
      },
      {
        "titre": "Synthèse Académique Bento — Cours 2 PST108 (M. Éric Lucy)",
        "auteur": "M. Éric Lucy (Plateforme PST)",
        "annee": "Octobre 2026",
        "remarque": "Fiche PDF complète (2 pages) : Babel/Foucault, Deleuze ritournelle, Stoïciens/Port-Royal, Saussure/Jakobson, Austin & Searle.",
        "url": "/docs/PST108_Cours_2_Synthese_Lucy.pdf"
      },
      {
        "titre": "Retranscription Complète Nettoyée — Cours 2 PST108 (M. Éric Lucy)",
        "auteur": "M. Éric Lucy",
        "annee": "Octobre 2026",
        "remarque": "Intégralité des 2 h 45 min 59 s de webconférence du 26 octobre 2026 nettoyée en 6 chapitres (19 pages PDF).",
        "url": "/docs/PST108_Cours_2_Transcription_Complete_Nettoyee.pdf"
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
    "dateSeance": "29 octobre 2026",
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
      },
      {
        "titre": "Synthèse Académique Bento — Cours 3 PST108 (M. Francis Valls)",
        "auteur": "M. Francis Valls (Plateforme PST)",
        "annee": "Octobre 2026",
        "remarque": "Fiche PDF complète (2 pages) : Ghiglione (contrat/enjeu≠objectif), Wolton, Watzlawick, Molière, Hall & Dubet.",
        "url": "/docs/PST108_Cours_3_Synthese_Valls.pdf"
      },
      {
        "titre": "Retranscription Complète Nettoyée & Horodatée — Cours 3 PST108 (M. Francis Valls)",
        "auteur": "M. Francis Valls",
        "annee": "Octobre 2026",
        "remarque": "Intégralité des 2 h 16 min 07 s de séance présentielle du 29 octobre 2026 nettoyée en 5 chapitres (20 pages PDF).",
        "url": "/docs/PST108_Cours_3_Transcription_Complete_Nettoyee.pdf"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — SÉANCE 4 : ETHNOMÉTHODOLOGIE (GARFINKEL) & INJUSTICES (DUBET)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-s4",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 4,
    titre: "Séance 4 — Ethnométhodologie (Garfinkel), Injustices au Travail (Dubet) & Mépris Incarné",
    sousTitre: "Allants de soi, brèches et asynchronies interlocutoires (Garfinkel) ; la triade Égalité, Mérite, Autonomie et les histoires sans paroles au travail (Dubet)",
    enseignant: "M. Francis VALLS (Psychosociologue, intervenant IFTS, formateur Cnam)",
    dateSeance: "12 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "2 h 28 min 54 s (Classe virtuelle BigBlueButton)",
    resumeExecutif: [
      "Ethnométhodologie et savoirs de sens commun (Harold Garfinkel) : 99 % de nos interactions quotidiennes et professionnelles réussissent parce que les acteurs partagent des 'allants de soi' (taken-for-granted), ensemble de codes implicites, de connaissances tacites et d'incomplétudes langagières permettant l'intercompréhension à demi-mot sans tout expliciter.",
      "Expériences de brèche (Breaching experiments) : Pour faire émerger l'invisible de la normalité sociale, Garfinkel suspend délibérément l'allant de soi (ex. contester un banal 'Tu vas bien ?' lors d'un repas de famille). La rupture déclenche immédiatement le trouble, la stupeur et la colère, prouvant que le consensus social repose sur une confiance ontologique fragile.",
      "L'Asynchronie interlocutoire en situation critique : Démonstration sur le centre d'appel d'urgence (SAMU). Le conflit naît d'un décalage structurel de temporalités : l'appelant angoissé exige un secours instantané (comme un taxi), tandis que l'opératrice a l'obligation professionnelle de qualifier la situation. Le blocage mécanique de la parole ne provient d'aucune méchanceté individuelle.",
      "L'entretien manqué en Maison Départementale de Solidarité (MDS) : Analyse des 4 temps du script social (accueil, recueil, pistes, clôture). L'erreur clinique de l'assistante sociale qui braque l'usagère sur son alcoolisme dès l'accueil détruit le contrat de communication. Méthodologie d'exploitation en situation apprenante pour la stagiaire observatrice.",
      "Sociologie de l'expérience et triade de la justice (François Dubet, 2006) : Tout salarié formule ses jugements à partir de trois principes universels mais contradictoires : l'Égalité (même dignité sans distinction de rang), le Mérite (reconnaissance du travail réel invisible) et l'Autonomie (liberté d'action). Arbitrer entre ces principes crée une tension tragique permanente.",
      "Les histoires sans paroles du mépris au travail : L'injustice s'incarne sans mots dans l'espace et le corps : la cantine ségréguée chez BMW (cadres en porcelaine vs ouvriers au goulasch en barquettes thermoformées), le mégot de cigarette transmis de main en main par le chirurgien hospitalier, et le mépris corporel incarné de Laurent Fabius face à Jacques Chirac.",
      "Dialectique conduites / représentations (Seymour Lieberman & Léon Festinger) : L'expérience de 1956 prouve que les ouvriers promus contremaîtres modifient leurs attitudes pour justifier leur nouveau statut et réduire leur dissonance cognitive, à l'image du renard de La Fontaine face aux raisins inaccessibles.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027",
      session2Date: "Avril 2027",
      duree: "3 heures (3 × 1h00 : M. Lucy, M. Valls, Mme Marot)",
      format:
        "Sous-épreuve de M. Francis Valls (1h00 sur les 3h00 d'examen PST108) — Analyse clinique de dialogue ou dissertation de psychosociologie de la communication",
      optionsAuChoix: [
        "Option 1 : Analyse conversationnelle d'une interaction professionnelle dégradée (repérer les allants de soi rompus, l'asynchronie interlocutoire et les manquements au contrat de communication de Ghiglione).",
        "Option 2 : Dissertation théorique sur les sentiments d'injustice au travail (mobiliser la triade Égalité / Mérite / Autonomie de Dubet et les micro-violences symboliques du mépris).",
      ],
      recommandationsNotation:
        "M. Francis Valls et le jury de PST108 exigent de ne jamais réduire les échecs de communication à des querelles de personnes ou à un manque de vocabulaire : toujours analyser l'incomplétude du langage, les allants de soi de Garfinkel et la tension entre principes de justice chez Dubet.",
    },
    consignesOralesProf: [
      {
        titre: "Exercice d'application : La Matrice des Injustices Vécues au Travail (Dubet)",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Choisir une situation professionnelle réelle vécue ou observée et la classer dans la matrice croisée de François Dubet : identifier le principe blessé (Égalité, Mérite ou Autonomie) et la modalité sensible de manifestation (distance sociale spatiale, logique de rang, regard ou corps sans parole).",
        echeance: "Avant la séance 5",
        modaliteRendu: "Compte rendu synthétique d'une page pour mise en commun collective.",
        recommandationsProf:
          "S'intéresser aux ressentis subjectifs (injustices vécues) et pas seulement au cadre légal formel.",
      },
      {
        titre: "Lectures fondamentales recommandées : Garfinkel & Dubet",
        typeTravail: "lecture",
        consigneExacte:
          "Consulter les extraits de 'Studies in Ethnomethodology' (Garfinkel, 1967) sur les breaching experiments et lire les chapitres 2 et 3 d'Injustices (Dubet, 2006) sur le mérite et la logique de rang.",
        echeance: "En cours de semestre",
        modaliteRendu: "Assimilation personnelle pour étayer les argumentations de copie.",
        recommandationsProf:
          "Repérer comment Bourdieu, bien que critique de Garfinkel, reconnaît la complémentarité de l'analyse micro-sociologique avec l'habitus.",
      },
      {
        titre: "Préparation de la séance suivante : Erving Goffman & la Face",
        typeTravail: "lecture",
        consigneExacte:
          "Réviser les notions de figuration, de préservation de la face et de territoires du moi chez Erving Goffman pour la séance du vendredi 13 novembre.",
        echeance: "Vendredi 13 novembre 2026",
        modaliteRendu: "Participation orale active.",
        recommandationsProf:
          "Faire le lien entre la rupture des allants de soi de Garfinkel et la perte de face chez Goffman.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Harold Garfinkel & l'Ethnométhodologie : Savoirs Pratiques & Allants de Soi",
        points: [
          {
            titre: "L'ethnométhodologie comme sociologie du sens commun",
            contenu:
              "Harold Garfinkel rompt avec la sociologie abstraite pour étudier les 'ethnométhodes' : les savoirs pratiques, raisonnements profanes et procédures concrètes par lesquels les membres ordinaires d'un groupe rendent leur monde intelligible et ordonné (accountable).",
            auteurs: ["Harold Garfinkel (1967)"],
            conceptsCles: ["Ethnométhodologie", "Sens commun", "Accountability"],
          },
          {
            titre: "Les allants de soi (taken-for-granted) et l'incomplétude du langage",
            contenu:
              "La communication quotidienne repose sur une masse considérable de connaissances tacites et d'implicites. Le langage est fondamentalement incomplet : dire 'il pleut' sous-entend 'il pleut dehors'. C'est cette incomplétude assumée qui permet à 99 % des interactions de réussir à demi-mot sans surcharge cognitive.",
            auteurs: ["Harold Garfinkel", "M. Francis Valls"],
            conceptsCles: ["Allants de soi", "Incomplétude du langage", "Économie cognitive"],
          },
          {
            titre: "Les expériences de brèche (breaching experiments)",
            contenu:
              "Pour rendre visible l'invisible de la normalité sociale, Garfinkel suspend délibérément l'allant de soi dans des situations routinières (l'étudiant qui demande à sa grand-mère pourquoi elle lui demande 'tu vas bien ?'). La réaction immédiate d'indignation et de malaise prouve que l'ordre social repose sur une convention de confiance tacite.",
            auteurs: ["Harold Garfinkel"],
            conceptsCles: ["Breaching experiments", "Rupture de routine", "Confiance ontologique"],
          },
        ],
      },
      {
        numero: "2",
        titre: "Analyse Conversationnelle en Situation Critique : SAMU & Entretien Social",
        points: [
          {
            titre: "L'asynchronie interlocutoire au centre d'appel d'urgence (SAMU)",
            contenu:
              "L'analyse séquentielle des appels d'urgence ayant échoué révèle un conflit mécanique de temporalité : l'appelant en panique attend un secours immédiat (comme commander un taxi), tandis que l'opératrice doit respecter le protocole de qualification médicale. Chaque question est vécue comme une insulte, provoquant une escalade agressive sans faute morale individuelle.",
            auteurs: ["Harold Garfinkel", "Analyse conversationnelle"],
            conceptsCles: ["Asynchronie interlocutoire", "Conflit de temporalité", "Escalade symétrique"],
          },
          {
            titre: "L'entretien social en MDS et le piège de l'étiquetage",
            contenu:
              "Dans une Maison Départementale de la Solidarité, une assistante sociale chevronnée reçoit une usagère vulnérable sous le regard d'une stagiaire. Gênée par l'odeur d'alcool, la professionnelle saute le temps d'accueil pour attaquer sur l'addiction. L'usagère se mure dans le silence. Valls montre qu'une personne n'est jamais réductible à son symptôme et transforme cet échec en situation apprenante pour la stagiaire.",
            auteurs: ["M. Francis Valls", "Rodolphe Ghiglione"],
            conceptsCles: ["Script d'entretien en 4 temps", "Piège de l'étiquetage", "Situation apprenante"],
          },
        ],
      },
      {
        numero: "3",
        titre: "François Dubet : Sociologie de l'Expérience & Triade de la Justice au Travail",
        points: [
          {
            titre: "Injustices objectives vs Injustices vécues",
            contenu:
              "Dans 'Injustices : l'expérience des inégalités au travail' (2006), François Dubet montre que la souffrance ne provient pas seulement des inégalités mesurables par le droit ou l'économie, mais du sentiment intime et subjectif d'injustice éprouvé dans l'activité quotidienne.",
            auteurs: ["François Dubet (2006)"],
            conceptsCles: ["Sociologie de l'expérience", "Injustices vécues vs objectives"],
          },
          {
            titre: "La triade conflictuelle : Égalité, Mérite, Autonomie",
            contenu:
              "Le salarié arbitre entre 3 principes tous désirables mais mutuellement contradictoires : 1) L'Égalité (même dignité sans égard au rang) ; 2) Le Mérite (rétribution des efforts et du travail réel invisible) ; 3) L'Autonomie (liberté de méthode face au flicage). Favoriser le mérite heurte l'égalité collective, et la règle égalitaire bride l'autonomie.",
            auteurs: ["François Dubet"],
            conceptsCles: ["Égalité", "Mérite", "Autonomie", "Tension tragique"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Les Histoires sans Paroles du Mépris : Distance Sociale, Corps & Regard",
        points: [
          {
            titre: "La ségrégation spatiale : La cantine BMW en Allemagne",
            contenu:
              "Témoignage de Francis Valls : Dans une usine BMW, les cadres déjeunaient au 1er étage dans de la vaisselle en porcelaine, tandis que les ouvriers mangeaient du goulasch en barquettes au rez-de-chaussée. La violence symbolique s'inscrit directement dans l'architecture et les corps.",
            auteurs: ["M. Francis Valls", "Pierre Bourdieu"],
            conceptsCles: ["Distance sociale spatiale", "Violence symbolique", "Logique de rang"],
          },
          {
            titre: "Le corps et le regard : La cigarette du chirurgien & l'ATSEM qui tricote",
            contenu:
              "Le chirurgien qui tend silencieusement son mégot à l'interne, qui le passe à l'infirmière pour l'écraser, illustre le mépris muet de caste. De même, l'ATSEM qui tricote pour ne pas s'endormir pendant la sieste et se fait réprimander par son directeur (« je ne vous paie pas pour tricoter ») subit la négation de son travail réel par un management aveugle.",
            auteurs: ["M. Francis Valls", "François Dubet"],
            conceptsCles: ["Histoires sans paroles", "Mépris incorporé", "Déni du travail réel"],
          },
          {
            titre: "L'arrogance corporelle : Le débat Fabius vs Chirac (1985)",
            contenu:
              "Le geste hautain de Laurent Fabius pointant le doigt (« Vous parlez au Premier ministre de la France ! ») a provoqué un rejet immédiat dans les sondages. Le corps a trahi le mépris aristocratique, prouvant que le non-verbal détruit le contrat de communication.",
            auteurs: ["M. Francis Valls", "Analyse politique"],
            conceptsCles: ["Mépris incarné", "Pouvoir symbolique", "Sanction de l'opinion"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — La Triade des Principes de Justice selon François Dubet (2006)",
        colonnes: ["Principe de Justice", "Définition Fondamentale", "Forme d'Injustice Ressentie", "Exemple Concret en Milieu de Travail"],
        lignes: [
          {
            axe: "1. Égalité",
            valeurs: [
              "Égale dignité et respect absolu de chaque individu indépendamment de sa position hiérarchique",
              "Mépris social, arrogance de classe, invisibilisation du regard et des corps",
              "Ségrégation spatiale des cantines chez BMW (porcelaine en haut vs barquettes en bas)",
            ],
          },
          {
            axe: "2. Mérite",
            valeurs: [
              "Rétribution équitable proportionnelle aux efforts singuliers, compétences et travail réel invisible",
              "Ingratitude de l'organisation, travail non vu, promotion injustifiée de collègues passifs",
              "L'agente qui tricote pour tenir sa vigilance en sieste et se fait reprocher de ne pas travailler",
            ],
          },
          {
            axe: "3. Autonomie",
            valeurs: [
              "Liberté de méthode, pouvoir d'initiative et maîtrise des modalités de son activité",
              "Micro-management infantilisant, flicage numérique, procédures étouffantes",
              "Obligation d'appliquer des scripts téléphoniques rigides au mot près sous contrôle continu",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — Ethnométhodologie (Garfinkel) vs Sociologie Critique (Bourdieu)",
        colonnes: ["Dimension Comparée", "Harold Garfinkel (Ethnométhodologie)", "Pierre Bourdieu (Sociologie Critique)"],
        lignes: [
          {
            axe: "Niveau d'Analyse",
            valeurs: [
              "Micro-sociologique : séquences de parole, conversations, allants de soi locaux",
              "Macro-sociologique : champs sociaux, habitus de classe, structures objectives",
            ],
          },
          {
            axe: "Conception de l'Acteur",
            valeurs: [
              "Acteur compétent capable de rendre compte de ses actes de façon réflexive",
              "Agent socialisé incorporant des structures de domination qu'il reproduit",
            ],
          },
          {
            axe: "Rôle du Langage",
            valeurs: [
              "Pratique sémiotique indexicale permettant d'accomplir le lien social au jour le jour",
              "Marché linguistique exerçant une violence symbolique au bénéfice des dominants",
            ],
          },
        ],
      },
      {
        titre: "Tableau 3 — Séquence Ordinaire Fluide vs Asynchronie Interlocutoire (Francis Valls)",
        colonnes: ["Composante", "Interaction Ordinaire Fonctionnelle (99 % des cas)", "Asynchronie Interlocutoire (Crise Conversationnelle)"],
        lignes: [
          {
            axe: "Statut des Allants de Soi",
            valeurs: [
              "Partagés et validés tacitement à demi-mot sans besoin d'explicitation",
              "Rompus ou asynchrones : décalage d'attentes et d'incomplétudes langagières",
            ],
          },
          {
            axe: "Temporalité des Acteurs",
            valeurs: [
              "Synchronisée : cadence d'écoute et de parole partagée",
              "Désynchronisée : urgence immédiate (usager) vs protocole différé (professionnel)",
            ],
          },
          {
            axe: "Sort de la Relation",
            valeurs: [
              "Aboutissement de la tâche et renforcement de la confiance mutuelle",
              "Escalade agressive, repli corporatiste procédural et rupture du dialogue",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne pas confondre l'incomplétude du langage avec un manque de rigueur",
        erreurCourante: "Considérer que le fait de se comprendre à demi-mot témoigne d'une communication imprécise ou négligente.",
        rectificationAttendue:
          "Pour Harold Garfinkel, l'incomplétude du langage est une condition vitale de la communication humaine. C'est l'adossement aux allants de soi partagés qui permet d'économiser l'énergie cognitive et d'agir efficacement sans devoir tout redéfinir depuis le début.",
        contexte: "Théorie de l'indexicalité et ethnométhodologie.",
      },
      {
        titre: "Ne pas psychologiser les échecs de communication en urgence",
        erreurCourante: "Attribuer le blocage d'un appel au SAMU à l'agressivité de l'appelant ou à la froideur de l'opératrice.",
        rectificationAttendue:
          "M. Francis Valls rappelle qu'il s'agit d'une asynchronie interlocutoire mécanique : un décalage structurel d'attentes et de temporalités inhérent à la situation institutionnelle, et non d'une faute morale individuelle.",
        contexte: "Analyse conversationnelle et clinique des situations critiques.",
      },
      {
        titre: "Les 3 principes de justice de Dubet sont perpétuellement irréconciliables",
        erreurCourante: "Proposer un modèle managérial idéal qui satisferait à la fois l'Égalité, le Mérite et l'Autonomie.",
        rectificationAttendue:
          "François Dubet prouve que ces trois principes sont en tension tragique irréductible : récompenser le mérite individuel blesse l'égalité collective, et imposer une égalité absolue étouffe l'autonomie et le mérite de ceux qui s'engagent.",
        contexte: "Sociologie de l'expérience et sentiments d'injustice au Cnam.",
      },
      {
        titre: "Le mépris s'exprime avant tout par le corps et l'espace sans paroles",
        erreurCourante: "Limiter l'analyse du mépris au travail à des insultes verbales explicites ou à des manquements déontologiques écrits.",
        rectificationAttendue:
          "Les violences symboliques les plus destructrices sont des 'histoires sans paroles' incorporées dans le regard, la distance spatiale (cantine BMW) ou la gestuelle de caste (le chirurgien qui passe son mégot).",
        contexte: "Pragmatique non-verbale et violence symbolique.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage pédagogique, retours d'exercices & film « Le Goût des autres »]
[00:01:15] M. FRANCIS VALLS : « Sur un effectif de 22 personnes, 14 ont eu la gentillesse de m'envoyer le petit exercice sur les trois registres : le non-verbal, le paraverbal et les marqueurs symboliques du territoire. L'un d'entre vous a rapporté le responsable d'entreprise qui passe dans votre dos et souffle : 'Tu as terminé ?'. Selon l'intonation et la scansion vocale, une phrase banale devient d'une angoisse absolue. »
[00:04:30] M. FRANCIS VALLS : « Sur le film Le Goût des autres de Jaoui et Bacri : dès que deux groupes sont face à face, on a ce phénomène psychosocial d'accentuation des ressemblances intragroupes. Le groupe des comédiens fait bloc face à l'intrus Castella. Mais il y a cette variable incontrôlable de la vie : l'amour. Clara perçoit l'inconfort de Castella et intervient avec délicatesse pour déplacer les lignes. »
[00:12:10] M. FRANCIS VALLS : « Écho direct à Pierre Bourdieu chez Bernard Pivot : 'Le goût, c'est le dégoût du goût des autres'. Le goût est une frontière symbolique de classe où l'on s'affirme en rejetant les goûts populaires ou bourgeois. »

[2. L'Expérience de Lieberman (1956), Festinger et la Fable du Renard]
[00:23:15] M. FRANCIS VALLS : « L'expérience de Seymour Lieberman (1956) dans une grande usine américaine : quand des ouvriers sont promus contremaîtres, leurs attitudes changent pour justifier leur rôle hiérarchique. Rétrogradés plus tard, ils redeviennent critiques envers la direction ! C'est la théorie de la dissonance cognitive de Léon Festinger : nos représentations viennent justifier nos conduites après coup. »
[00:31:05] M. FRANCIS VALLS : « C'est la fable du Renard et les Raisins de La Fontaine : ne pouvant atteindre les raisins, le renard dit 'ils sont trop verts'. Nous rationalisons tous pour maintenir la cohérence de notre moi face aux impasses du réel. »

[3. Harold Garfinkel & l'Ethnométhodologie : Allants de Soi & Brèches]
[00:36:20] M. FRANCIS VALLS : « Harold Garfinkel théorise les allants de soi (taken-for-granted) : l'ensemble des codes tacites incorporés 'par corps'. Si je dis 'il pleut', vous n'avez pas besoin que je dise 'dehors'. Le langage a une incomplétude fondamentale qui permet à 99 % des interactions de réussir à demi-mot. »
[00:44:50] M. FRANCIS VALLS : « Pour rendre visible l'invisible de la normalité sociale, Garfinkel crée les breaching experiments (expériences de brèche). À Harvard, quand la grand-mère demande 'Tu vas bien ?', l'étudiant répond 'Qu'entends-tu par bien ? Tu me trouves malade ?'. La réaction immédiate est le trouble et la colère : casser l'allant de soi détruit la confiance ontologique qui lie les êtres humains. »

[4. Deux Études de Cas Cliniques : Le SAMU & la Maison Départementale de Solidarité]
[01:07:30] M. FRANCIS VALLS : « Dans les appels d'urgence au SAMU, l'asynchronie interlocutoire naît d'un conflit de temporalité : l'appelant veut un secours instantané (comme un taxi), l'opératrice doit respecter le protocole de qualification médicale. Le dialogue dévie mécaniquement vers l'escalade agressive sans faute morale individuelle. »
[01:21:40] M. FRANCIS VALLS : « En Maison Départementale de Solidarité, l'assistante sociale chevronnée sent l'alcool chez une dame en détresse et saute le temps d'accueil pour attaquer sur le symptôme : 'Vous avez encore bu ?'. L'usagère se mure dans le silence. Une personne n'est jamais réductible à son alcoolisme ! Épingler l'usagère par son stigmate détruit le contrat de communication. Cet échec doit devenir une situation apprenante pour la stagiaire. »

[5. François Dubet : Injustices Vécues & la Triade (Égalité, Mérite, Autonomie)]
[01:44:30] M. FRANCIS VALLS : « François Dubet dans Injustices (2006) démontre que tout travailleur arbitre entre trois principes universels : l'Égalité (même dignité sans distinction de rang), le Mérite (reconnaissance des efforts et du travail réel invisible) et l'Autonomie (marge d'initiative). Ces principes sont tragiquement contradictoires : valoriser le mérite brise l'égalité collective, et la règle égalitaire bride l'autonomie. »

[6. Les Manifestations du Mépris (BMW, Chirurgien, Fabius vs Chirac)]
[02:16:30] M. FRANCIS VALLS : « J'ai vécu cela chez BMW en Allemagne il y a 25 ans : les cadres mangeaient au premier étage dans de la vaisselle en porcelaine, les ouvriers au rez-de-chaussée dans des barquettes de goulasch. Une violence symbolique spatiale inouïe. »
[02:19:50] M. FRANCIS VALLS : « Le grand chirurgien qui tend silencieusement son mégot fumant à l'interne, qui le passe à l'infirmière pour l'écraser : quel mépris de caste incorporé sans un mot ! Et l'ATSEM qui tricote pour lutter contre le sommeil pendant la sieste et se fait réprimander par son directeur : c'est la négation du travail réel. »
[02:24:10] M. FRANCIS VALLS : « Lors du débat de 1985, Laurent Fabius pointant le doigt vers Chirac : 'Vous parlez au Premier ministre de la France !'. Le mépris corporel a été immédiatement lu par les Français et a fait chuter les sondages dès le lendemain. Le corps ne ment pas quand il méprise. »`,
    bibliographieCitee: [
      {
        titre: "Studies in Ethnomethodology",
        auteur: "Harold Garfinkel",
        annee: "1967",
        remarque: "Ouvrage fondateur de l'ethnométhodologie : allants de soi, breaching experiments, indexicalité et réflexivité.",
      },
      {
        titre: "Injustices : L'expérience des inégalités au travail",
        auteur: "François Dubet",
        annee: "2006",
        remarque: "Ouvrage princeps sur la sociologie de l'expérience et la triade conflictuelle Égalité / Mérite / Autonomie.",
      },
      {
        titre: "La Distinction : Critique sociale du jugement",
        auteur: "Pierre Bourdieu",
        annee: "1979",
        remarque: "Théorisation du goût comme dégoût du goût des autres, habitus incorporé et violence symbolique.",
      },
      {
        titre: "The Effects of Changes in Roles on the Attitudes of Role Occupants",
        auteur: "Seymour Lieberman",
        annee: "1956",
        remarque: "Étude empirique majeure démontrant l'adaptation des attitudes aux rôles d'ouvrier, contremaître et délégué syndical.",
      },
      {
        titre: "A Theory of Cognitive Dissonance",
        auteur: "Leon Festinger",
        annee: "1957",
        remarque: "Théorie cardinale de la rationalisation a posteriori pour réduire la tension psychologique interne.",
      },
      {
        titre: "De la justification : Les économies de la grandeur",
        auteur: "Luc Boltanski & Laurent Thévenot",
        annee: "1991",
        remarque: "Théorie des cités et analyse des régimes de dispute en situation de travail.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — SÉANCE 5 : ERVING GOFFMAN (DRAMATURGIE, RITES D'INTERACTION & STIGMATE)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-s5",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 5,
    titre: "Séance 5 — Erving Goffman : Dramaturgie Sociale, Rites d'Interaction, Distance au Rôle & Stigmate",
    sousTitre: "La mise en scène de la vie quotidienne (scène, coulisses, public, distance au rôle), la figuration (« sauver sa face tout en préservant celle d'autrui ») et le stigmate comme relation de regard",
    enseignant: "M. Francis VALLS (Psychosociologue, intervenant IFTS, formateur Cnam)",
    dateSeance: "13 novembre 2026",
    format: "presentiel",
    dureeEnregistrement: "2 h 28 min 42 s (Cours magistral & ateliers cliniques en binômes)",
    resumeExecutif: [
      "Avertissement méthodologique d'examen (Interdit du 'chausse-pied' théorique) : Il ne faut jamais forcer une situation réelle à entrer au chausse-pied dans les concepts d'un auteur. Si la grille de Ghiglione ne 'mord' pas sur le cas étudié, le psychologue du travail doit changer de lunettes théoriques (mobiliser Garfinkel, Goffman, Dubet ou Boltanski & Thévenot).",
      "Filiation épistémologique (École de Chicago, Palo Alto, systémique) et opposition Macro / Micro-sociologie : Tandis que Pierre Bourdieu étudie les déterminismes sociaux 'd'en haut' par la statistique (tout en formulant l'idée féconde du 'savoir par corps et pas seulement par cœur'), Erving Goffman et Harold Garfinkel observent 'du dedans, ici et maintenant' l'ordre rituel des interactions situées.",
      "La métaphore théâtrale (La Mise en scène de la vie quotidienne, 1959) : Goffman articule en système la Scène (frontstage / région antérieure), les Coulisses (backstage où l'équipe prépare l'impression et évacue la tension par l'humour, le fou rire ou la moquerie), le Public (et les témoins non ratifiés qui 'jettent un œil sans se cacher'), le Décor/Accessoires, le Rôle et la Distance au rôle.",
      "Du rôle fonctionnaliste figé à la 'Distance au rôle' : Contre la sociologie traditionnelle (rôle = ce que les autres attendent légitimement de moi / statut = ce que j'attends légitimement d'eux), Goffman définit le rôle comme un 'système d'action situé', plastique et mouvant (étymologie de personne = persona, le masque antique chez R. E. Park ; figure du garçon de café de Sartre). La distance au rôle est l'écart ironique ('ni trop, ni trop peu') entre le moi officiel et le moi personnel.",
      "La Face et la Figuration (Les Rites d'interaction, 1967) : En écho à Vladimir Jankélévitch sur la nudité du visage (« Je vois votre visage mais je ne vois pas le mien ; mon visage, je le vois dans votre regard »), l'ordre rituel repose sur un double travail d'équilibriste — la figuration (face-work) : sauver sa propre face tout en préservant la face d'autrui (« les deux ou rien »).",
      "Cinq ateliers cliniques et littéraires d'application : 1) 'Confiné en usine' (mars 2020 : coulisses patronales vs pré-coulisses ouvrières, dissonance du directeur et cercles du public salarié) ; 2) 'Distance au rôle en salle d'opération' (Goffman / Yves Winkin : l'humour du chirurgien lorsque l'assistant lui entaille le doigt au bistouri électrique) ; 3) 'Embarquer pour nulle part' (la sans-abri de l'aéroport de Londres : indifférence civique, toilettes comme coulisses, complicité des agents d'entretien) ; 4) Le visiteur mutique (Nathalie Sarraute) & 'La Montagne de l'âme' (Gao Xingjian) ; 5) 'Le Bal masqué' (perte de la face en réunion d'équipe).",
      "Décentrement radical du handicap (Stigmate, 1963) : Le stigmate n'est pas un attribut individuel mais un rapport social et un jeu de regards lors des 'contacts mixtes'. « Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue. » Cas clinique vécu rue Sainte-Catherine à Bordeaux : le passant détourne son regard de l'amie en fauteuil roulant pour répondre à M. Valls, suscitant la réplique d'humour salvateur : « Tiens alors, je suis la femme invisible ! ».",
    ],
    modalitesExamen: {
      session1Date: "Février 2027",
      session2Date: "Avril 2027",
      duree: "3 heures (3 × 1h00 par enseignant)",
      format:
        "Épreuve écrite de 3h00 divisée en 3 sous-épreuves indépendantes de 1h00 chacune (M. Éric Lucy 1h00 · M. Francis Valls 1h00 · Mme Véronique Marot 1h00)",
      optionsAuChoix: [
        "Sujet de M. Francis Valls : Analyse d'un texte ou d'une situation clinique professionnelle à partir des concepts articulés d'un auteur de référence (ex. Goffman, Garfinkel, Ghiglione, Dubet), suivie d'une prise de recul critique et d'un éclairage complémentaire par un autre modèle.",
      ],
      recommandationsNotation:
        "Méthodologie en 3 temps exigée par M. Valls : 1) Situer l'auteur, son courant (École de Chicago / Palo Alto) et sa problématique ; 2) Articuler ses concepts en système sur la situation sans les plaquer de force ; 3) Ouvrir une discussion critique et mobiliser un second regard théorique pertinent.",
    },
    consignesOralesProf: [
      {
        titre: "Entraînement à l'épreuve de PST108 sur les 5 textes cliniques distribués",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Reprendre les textes travaillés en binômes ('Confiné en usine', 'Distance au rôle en salle d'opération', 'Embarquer pour nulle part', l'extrait de Nathalie Sarraute, 'La Montagne de l'âme' de Gao Xingjian et 'Le Bal masqué') et s'entraîner à rédiger une analyse articulant Scène, Coulisses, Public, Face, Distance au rôle et Indifférence civique.",
        echeance: "Avant la séance 6 (Samedi suivant)",
        modaliteRendu: "Travail personnel d'appropriation méthodologique pour l'examen.",
        recommandationsProf:
          "Constituer une liste personnelle d'exemples cliniques précis et ne jamais plaquer un concept isolé sans montrer comment il s'articule aux autres.",
      },
      {
        titre: "Lecture recommandée : Erving Goffman, « Stigmate : Les usages sociaux des handicaps » (1963)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire en particulier les chapitres consacrés aux 'contacts mixtes', à l'humour des personnes handicapées ('Quand le stigmatisé vient au secours des normaux') et au questionnement éthique ('La tolérance des normaux serait-elle une façade ?').",
        echeance: "En cours de semestre",
        modaliteRendu: "Réinvestissement dans les copies d'examen et dans la posture clinique professionnelle.",
        recommandationsProf:
          "Toujours penser le handicap dans une interaction et un jeu de regards (ni déni du handicap, ni focalisation écrasante).",
      },
      {
        titre: "Préparation de la séance suivante (Samedi) : Luc Boltanski & Laurent Thévenot (Les Économies de la grandeur)",
        typeTravail: "lecture",
        consigneExacte:
          "Prendre connaissance du support distribué sur Luc Boltanski et Laurent Thévenot (De la justification, 1991) en vue de l'étude des régimes de dispute et des cités de justice en entreprise lors du grand cours du samedi.",
        echeance: "Samedi suivant (Séance 6)",
        modaliteRendu: "Participation aux études de cas sur les disputes au travail.",
        recommandationsProf:
          "Observer comment les témoins (le public goffmanien) pèsent sur les disputes sur une chaîne de montage.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Épistémologique : École de Chicago, Palo Alto & Articulation Macro / Micro-sociologie",
        points: [
          {
            titre: "L'interdit méthodologique du « chausse-pied » théorique",
            contenu:
              "En revenant sur les travaux des auditeurs (analyse de situations par les marqueurs symboliques et le contrat de communication de Ghiglione), M. Valls pose une règle cardinale : un modèle théorique n'est pas un dogme mais un trousseau de clés. Si la serrure résiste, il est contre-productif de tordre la réalité clinique pour la faire entrer de force dans le modèle ; il faut changer d'auteur (passer de Ghiglione à Garfinkel, Goffman, Dubet ou Boltanski & Thévenot).",
            auteurs: ["M. Francis Valls", "Rodolphe Ghiglione"],
            conceptsCles: ["Pluralisme théorique", "Pertinence clinique", "Grille de lecture heuristique"],
          },
          {
            titre: "École de Chicago, École de Palo Alto et approche systémique",
            contenu:
              "Erving Goffman s'inscrit dans la filiation de l'École de Chicago (observation ethnographique de terrain), de l'interactionnisme symbolique et de l'École de Palo Alto. L'approche est systémique : 'un groupe n'est pas l'addition des parties, mais l'interdépendance des parties' (à l'image des thérapies familiales systémiques où l'enfant dit 'malade' est le symptôme d'un système familial en souffrance).",
            auteurs: ["Erving Goffman", "École de Chicago", "École de Palo Alto"],
            conceptsCles: ["Systémique", "Interdépendance des parties", "Interactionnisme symbolique"],
          },
          {
            titre: "Macro-sociologie (Pierre Bourdieu) vs Micro-sociologie (Goffman / Garfinkel)",
            contenu:
              "Là où la macro-sociologie de Pierre Bourdieu analyse 'd'en haut' les grands déterminismes sociaux et culturels par des régularités statistiques quantitatives (tout en forgeant la formule précieuse 'je le sais par corps, pas simplement par cœur'), la micro-sociologie d'Erving Goffman et d'Harold Garfinkel observe 'du dedans, ici et maintenant' la fabrique qualitative de l'ordre des interactions en co-présence.",
            auteurs: ["Pierre Bourdieu", "Erving Goffman", "Harold Garfinkel"],
            conceptsCles: ["Macro-sociologie vs Micro-sociologie", "Savoir par corps", "Ordre des interactions"],
          },
        ],
      },
      {
        numero: "2",
        titre: "« La Mise en scène de la vie quotidienne » (1959) : L'Appareil Dramaturgique Goffmanien",
        points: [
          {
            titre: "Du rôle fonctionnaliste figé au rôle plastique et situé (Persona & le garçon de café de Sartre)",
            contenu:
              "La sociologie traditionnelle figeait le rôle ('ce que les autres attendent légitimement de moi') et le statut ('ce que j'attends légitimement des autres'). Pour Goffman, le rôle est un 'système d'action situé', mouvant et plastique : nous passons d'un rôle à l'autre toute la journée sans qu'aucun rôle soit 'plus vrai' qu'un autre. Citant Robert Ezra Park, Goffman rappelle que 'personne' vient du latin persona (le masque de théâtre antique), et rejoint Jean-Paul Sartre (L'Être et le Néant, 1943) décrivant le garçon de café comme un danseur jouant son rôle à la perfection.",
            auteurs: ["Erving Goffman (1959)", "Robert Ezra Park (1950)", "Jean-Paul Sartre (1943)"],
            conceptsCles: ["Persona (Masque)", "Rôle situé", "Statut vs Rôle", "Garçon de café"],
          },
          {
            titre: "Scène (Frontstage), Coulisses (Backstage) et fonction cathartique de l'humour d'équipe",
            contenu:
              "Sur la Scène (région antérieure), les acteurs contrôlent leurs expressions pour produire une impression conforme aux attentes. Dans les Coulisses (région postérieure, soustraite au public), l'équipe agit en stratège : on prépare l'impression, on se distribue les rôles (ex. réunion d'équipe éducative avant de recevoir des parents difficiles) et on évacue la tension par le fou rire, l'humour ou la moquerie envers le public — soupape indispensable pour être irréprochable une fois sur scène.",
            auteurs: ["Erving Goffman", "M. Francis Valls"],
            conceptsCles: ["Scène (Frontstage)", "Coulisses (Backstage)", "Contrôle des impressions", "Humour cathartique"],
          },
          {
            titre: "Le Public (témoins non ratifiés), le Décor et la Distance au rôle (« ni trop, ni trop peu »)",
            contenu:
              "L'interaction ne se réduit jamais au face-à-face dyadique : elle baigne dans un Public de tiers qui 'jettent un œil sans se cacher, sans être des partenaires ratifiés à part entière' (ex. le silence des 200 étudiants de 1re année en amphi paralysés par le regard des pairs). Quant à la Distance au rôle, elle désigne l'écart ironique et la marge de liberté entre le moi officiel et le moi personnel : 'ni trop, ni trop peu' (trop coller au rôle enferme ; sortir du rôle brise le lien). À la dernière page de son livre (p. 240), Goffman rappelle avec autodérision que la métaphore théâtrale n'est qu'un 'échafaudage' destiné à être démonté.",
            auteurs: ["Erving Goffman"],
            conceptsCles: ["Public & Témoins non ratifiés", "Décor et accessoires", "Distance au rôle", "Échafaudage heuristique"],
          },
        ],
      },
      {
        numero: "3",
        titre: "« Les Rites d'interaction » (1967) : Face, Figuration (Face-Work) & Indifférence Civique",
        points: [
          {
            titre: "La nudité du visage (Vladimir Jankélévitch) et la Face",
            contenu:
              "La 'face' est la valeur sociale positive qu'une personne revendique à travers la ligne d'action que les autres supposent qu'elle a adoptée. En écho au philosophe Vladimir Jankélévitch, M. Valls souligne la vulnérabilité radicale du visage nu : 'Je vois votre visage, mais je ne vois pas le mien ; mon visage, je le vois dans votre regard.'",
            auteurs: ["Erving Goffman (1967)", "Vladimir Jankélévitch"],
            conceptsCles: ["Face", "Nudité du visage", "Miroir du regard d'autrui"],
          },
          {
            titre: "La Figuration (Face-Work) : « Sauver sa face tout en préservant celle de l'autre »",
            contenu:
              "Nos interactions ordinaires sont des exercices d'équilibriste ou de funambule régis par une double règle d'or indissociable : sauver sa propre face tout en préservant la face d'autrui ('ce n'est pas l'un ou l'autre, c'est les deux ou rien'). Lorsque l'interlocuteur décroche au milieu d'un récit passionné et voit qu'on l'a vu, un travail immédiat de figuration s'opère pour rattraper l'incongruité sans faire perdre la face à personne.",
            auteurs: ["Erving Goffman"],
            conceptsCles: ["Figuration (Face-work)", "Double mouvement rituel", "Réparation de l'incongruité"],
          },
          {
            titre: "Offense au code rituel, Interactions non focalisées et Indifférence civique",
            contenu:
              "Déroger aux codes incorporés de bienséance (ex. répondre sèchement à sa grand-mère lors d'un repas familial) constitue une 'offense au code' qui alerte toute la tribu. Dans l'espace public (foule, rue Sainte-Catherine, aéroport), Goffman distingue les interactions focalisées (échanges circonscrits) des interactions non focalisées, régies par l'indifférence civique (civil inattention) : on se perçoit juste assez pour s'éviter sans se télescoper, tout en détournant le regard pour respecter l'intimité d'autrui.",
            auteurs: ["Erving Goffman"],
            conceptsCles: ["Offense au code", "Interactions focalisées vs non focalisées", "Indifférence civique"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Les 5 Ateliers Cliniques & Littéraires : Usine, Bloc Opératoire, Aéroport, Hospitalité & Réunion",
        points: [
          {
            titre: "Cas 1 (« Confiné en usine ») & Cas 2 (« Distance au rôle en salle d'opération », prés. Yves Winkin)",
            contenu:
              "1) Dans 'Confiné en usine' (mars 2020, 6h du matin), la direction a préparé sa scène en coulisses tandis que les ouvriers forment des pré-coulisses informelles par classes d'âge autour d'une cigarette. Le directeur surjoue d'abord un rôle brutal (-15 % de salaire), recule face à l'interpellation d'une ouvrière qui refuse la cérémonie, tandis que le public salarié se clive entre 'bons élèves' au 1er rang et rires étouffés au fond. 2) Au bloc opératoire (présenté par Yves Winkin), lorsque l'assistant entaille par erreur le doigt du chirurgien en chef au bistouri électrique, ce dernier ne crie pas (il a besoin de son assistant pour finir l'opération) mais mobilise la distance au rôle par l'humour : « Si j'attrape la syphilis, je saurai d'où ça vient et j'aurai des témoins ! ».",
            auteurs: ["Erving Goffman", "Yves Winkin", "M. Francis Valls"],
            conceptsCles: ["Système d'action situé", "Cérémonial chirurgical", "Distance au rôle par l'humour"],
          },
          {
            titre: "Cas 3 (« Embarquer pour nulle part ») : La passagère sans-abri de l'aéroport de Londres",
            contenu:
              "Une femme sans domicile vit cachée durant des mois dans un aéroport londonien. La scène est l'aérogare ; les coulisses sont les toilettes où elle revêt son costume de passagère ; le public des voyageurs est une menace périphérique neutralisée par l'indifférence civique et l'hyper-conformité (pour être invisible, il faut être exactement pareille aux autres) ; les policiers jouent les seconds rôles et le personnel de nettoyage devient son complice tacite aux heures de repas et de sommeil.",
            auteurs: ["Erving Goffman", "M. Francis Valls"],
            conceptsCles: ["Camouflage dramaturgique", "Invisibilité par conformité", "Complicité d'équipe"],
          },
          {
            titre: "Cas 4 (Nathalie Sarraute & Gao Xingjian, « La Montagne de l'âme ») et Cas 5 (« Le Bal masqué »)",
            contenu:
              "Chez Nathalie Sarraute, un voisin rend visite chaque jour sans prononcer un mot : ligoté par les codes d'hospitalité incorporés, l'accueillant n'ose pas rompre mais voit sa propre identité vaciller. Dans La Montagne de l'âme (Gao Xingjian, Prix Nobel), deux solitaires se croisent hors des cadres urbains : privés de codes rituels, l'autre devient un 'étrange familier' menaçant où chaque objet devient une arme et où allumer une cigarette sert de contenance. Enfin, dans 'Le Bal masqué', une auditrice du Cnam décrit le 'sourire gêné' et la perte de la face en réunion d'équipe, puis la fonction élaborative de l'écriture.",
            auteurs: ["Nathalie Sarraute", "Gao Xingjian (1995)", "M. Francis Valls"],
            conceptsCles: ["Rupture des codes d'hospitalité", "Étrange familier", "Perte de la face", "Écriture clinique"],
          },
        ],
      },
      {
        numero: "5",
        titre: "« Stigmate. Les usages sociaux des handicaps » (1963) : Le Regard, l'Invisibilisation & l'Humour",
        points: [
          {
            titre: "Du handicap-attribut au stigmate-relation : « Des points de vue, non des personnes »",
            contenu:
              "Sans nier la réalité corporelle ou cognitive d'une déficience, Goffman opère un décentrement sociologique radical : le stigmate n'est pas un attribut individuel mais un rapport social qui se joue dans l'ordre rituel des interactions. Formule canonique : « Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue. »",
            auteurs: ["Erving Goffman (1963)"],
            conceptsCles: ["Stigmate", "Contacts mixtes", "Rapport de regard", "Points de vue"],
          },
          {
            titre: "Cas clinique de la rue Sainte-Catherine à Bordeaux : « Tiens alors, je suis la femme invisible ! »",
            contenu:
              "M. Valls relate une scène vécue rue Sainte-Catherine avec une amie en fauteuil roulant ayant subi un AVC (présentant une séquelle faciale mais parlant de manière parfaitement intelligible). Lorsqu'elle demande son chemin à un passant, celui-ci détourne son regard d'elle et répond directement à M. Valls ('le supposé normal'). Blessée par cette perte de la face ('On n'en sortira jamais, c'est moi qui ai posé la question !'), l'amie retourne la situation par un trait d'humour fulgurant : « Tiens alors, je suis invisible ! Je suis la femme invisible ! ».",
            auteurs: ["M. Francis Valls", "Erving Goffman"],
            conceptsCles: ["Invisibilisation interactionnelle", "Détournement du regard", "Humour de dégagement"],
          },
          {
            titre: "« Quand le stigmatisé vient au secours des normaux » et le dilemme éthique des professionnels",
            contenu:
              "Face à une différence physique qui ébranle leurs repères narcissiques, les 'normaux' sont souvent gagnés par la panique ou le blindage défensif : c'est alors la personne handicapée qui, par son humour et sa chaleur, 'vient aider l'aidant' et sauve l'interaction. Pour les professionnels, Goffman pose une question redoutable ('La tolérance des normaux serait-elle une façade ?') : comment ne pas nier le handicap (ce qui est absurde) tout en ne se focalisant pas sur lui (ce qui écrase la personne) ?",
            auteurs: ["Erving Goffman"],
            conceptsCles: ["Secours du stigmatisé aux normaux", "Juste distance clinique", "Ni déni ni focalisation"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Macro-sociologie des Déterminismes (Bourdieu) vs Micro-sociologie des Interactions (Goffman / Garfinkel)",
        description: "Confrontation épistémologique présentée par M. Francis Valls pour situer Erving Goffman en introduction de copie.",
        colonnes: ["Axe d'analyse", "Macro-sociologie (Pierre Bourdieu)", "Micro-sociologie pragmatique (Goffman / Garfinkel)"],
        lignes: [
          {
            axe: "Posture d'observation",
            valeurs: [
              "Observation « d'en haut » : grandes régularités statistiques, structures de classes et reproduction sociale",
              "Observation « du dedans, ici et maintenant » : séquences qualitatives de la vie quotidienne en co-présence",
            ],
          },
          {
            axe: "Conception du Rôle & des Codes",
            valeurs: [
              "Habitus durablement incorporé (« je le sais par corps, pas simplement par cœur ») déterminant les pratiques",
              "Système d'action situé, plastique et mouvant ; codes rituels rejoués et négociés à chaque interaction",
            ],
          },
          {
            axe: "Méthode de révélation",
            valeurs: [
              "Objectivation sociologique des capitaux (économique, culturel, symbolique) et des champs de domination",
              "Analyse par la rupture, l'incongruité ou le grain de sable (breaching, faux pas, perte de la face, contacts mixtes)",
            ],
          },
        ],
      },
      {
        titre: "Synthèse des 5 Études de Cas Cliniques & Littéraires au Prisme de la Dramaturgie Goffmanienne",
        description: "Grille d'application directe pour l'épreuve écrite de PST108 (Sujet de M. Francis Valls).",
        colonnes: ["Étude de cas / Texte", "Scène, Coulisses & Décor", "Rôle, Distance au rôle & Enjeu de Face"],
        lignes: [
          {
            axe: "1. Confiné en usine (Mars 2020)",
            valeurs: [
              "Parvis de l'usine à 6h ; coulisses préparées par la direction vs pré-coulisses informelles des ouvriers (cigarettes, classes d'âge)",
              "Directeur surjouant le rôle frontal (-15% salaire) puis reculant face à une ouvrière ; 1er rang déférent vs rires étouffés au fond",
            ],
          },
          {
            axe: "2. Salle d'opération (Goffman / Winkin)",
            valeurs: [
              "Bloc opératoire cérémoniel autour du corps nu anesthésié ; costume blanc immaculé du chirurgien en chef",
              "Coup de bistouri accidentel de l'assistant : le chirurgien mobilise la distance au rôle par l'humour (« Si j'attrape la syphilis... ») pour sauver la coopération",
            ],
          },
          {
            axe: "3. Embarquer pour nulle part (Aéroport Londres)",
            valeurs: [
              "Terminal d'aéroport (interaction non focalisée) ; les toilettes servent de coulisses pour revêtir le costume de voyageuse",
              "Camouflage par indifférence civique et hyper-conformité ; jeu du chat et de la souris avec la police ; complicité tacite des agents d'entretien",
            ],
          },
          {
            axe: "4. Nathalie Sarraute & Gao Xingjian",
            valeurs: [
              "Salon de l'hôte (Sarraute) vs sentier désert hors des repères urbains (La Montagne de l'âme, Gao Xingjian)",
              "Le silence quotidien du visiteur viole le code d'hospitalité et menace l'identité de l'hôte ; hors des codes urbains, l'autre devient un « étrange familier » menaçant",
            ],
          },
          {
            axe: "5. Le Bal masqué & Stigmate (Rue Ste-Catherine)",
            valeurs: [
              "Réunion d'équipe professionnelle ('Le Bal masqué') et espace public urbain lors d'un contact mixte ('Stigmate')",
              "Sourire gêné et perte de la face en réunion ; détournement du regard du passant vers le 'supposé normal' et réplique d'humour (« Je suis la femme invisible ! »)",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais plaquer les concepts d'un auteur « au chausse-pied » sur une situation",
        erreurCourante: "Vouloir à tout prix appliquer les marqueurs symboliques ou une liste de mots-clés d'un auteur sur un texte qui ne s'y prête pas.",
        rectificationAttendue:
          "Suivre la règle d'or de M. Valls : articuler les concepts en système pour montrer en quoi la métaphore éclaire la scène, et ne pas hésiter à mobiliser un autre auteur (Garfinkel, Ghiglione, Dubet, Boltanski & Thévenot) si la situation appelle un autre angle de regard.",
        contexte: "Méthodologie générale de l'examen PST108.",
      },
      {
        titre: "Ne pas opposer un « faux masque social » hypocrite à un « vrai moi » authentique chez Goffman",
        erreurCourante: "Considérer que jouer un rôle sur scène chez Goffman relève du mensonge ou de l'hypocrisie par opposition aux coulisses où l'on serait 'vrai'.",
        rectificationAttendue:
          "Rappeler avec Goffman (citant R. E. Park sur persona) que nous passons d'un rôle à l'autre toute la journée et qu'il n'y a pas un rôle 'plus vrai' qu'un autre. Les coulisses (y compris l'humour ou la moquerie d'équipe) sont une condition fonctionnelle pour tenir professionnellement la scène.",
        contexte: "La Mise en scène de la vie quotidienne (1959).",
      },
      {
        titre: "Ne jamais réduire « sauver la face » à l'écrasement égoïste de l'interlocuteur",
        erreurCourante: "Croire que la figuration (face-work) consiste uniquement à défendre son orgueil personnel au détriment d'autrui.",
        rectificationAttendue:
          "Exposer le double mouvement indissociable de la figuration selon Goffman : 'sauver sa propre face tout en préservant la face de l'autre' ('ce n'est pas l'un ou l'autre, c'est les deux ou rien').",
        contexte: "Les Rites d'interaction (1967).",
      },
      {
        titre: "Ne pas définir le stigmate comme un attribut médical ou individuel",
        erreurCourante: "Traiter le stigmate chez Goffman comme la déficience physique ou psychique en elle-même.",
        rectificationAttendue:
          "Citer la formule canonique de Stigmate (1963) : 'Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue.' Le stigmate est une relation sociale et un trouble de l'ordre rituel dans le jeu des regards lors des contacts mixtes.",
        contexte: "Approche interactionniste du handicap (Stigmate, 1963).",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Méthodologie d'Examen, Filiation Épistémologique & Macro vs Micro-sociologie]
[00:00:57] M. FRANCIS VALLS : « J'ai commencé à lire ce que vous m'avez envoyé. Si vous sentez que les concepts d'un auteur ne vous ouvrent pas la porte, ne les plaquez pas de force ! Ne faites pas rentrer la situation au chausse-pied. Vous avez d'autres auteurs : Ghiglione, Garfinkel, Goffman, Dubet, Boltanski et Thévenot. »
[00:08:51] M. FRANCIS VALLS : « L'École de Chicago, l'École de Palo Alto, l'interactionnisme symbolique, l'approche systémique : qu'est-ce que c'est qu'un groupe d'un point de vue systémique ? Ce n'est pas l'addition des parties, c'est l'interdépendance des parties. C'est ce qui a donné lieu aux thérapies familiales systémiques : quand un enfant est désigné comme 'le malade', il est en réalité le symptôme d'un système familial dont toutes les parties sont en interdépendance. »
[00:35:52] M. FRANCIS VALLS : « Ce n'est pas une observation d'en haut où le sociologue dit aux acteurs : 'Voilà vos déterminismes, pour moi vous êtes transparents'. Ça, c'est du Bourdieu — même si Bourdieu a cette phrase magnifique : 'Je le sais par corps, pas simplement par cœur'. Chez Bourdieu, c'est la macro-sociologie quantitative qui vient d'en haut. Chez Goffman et Garfinkel, c'est dedans, ici et maintenant, qualitatif : quels sont les codes que nous construisons ensemble au moment même où nous les faisons ? »

[2. La Métaphore Théâtrale : Rôle Situé, Persona, Coulisses & Public]
[00:16:17] M. FRANCIS VALLS : « Dans la sociologie traditionnelle, le rôle, c'est ce que légitimement les autres attendent de moi ; le statut, c'est ce que j'attends légitimement des autres. Chez Goffman, non ! Le rôle est mouvant, plastique, ici et maintenant. Et il cite en ouverture Robert Ezra Park : 'Ce n'est probablement pas un hasard historique que le mot personne, dans son sens premier, signifie masque (persona).' Il n'y a pas un rôle plus vrai que l'autre : ils sont tous vrais. »
[00:20:47] M. FRANCIS VALLS : « Les coulisses, c'est l'espace où les acteurs préparent l'impression collectivement : on est des acteurs stratèges, on se distribue les rôles, on renforce la cohésion, on a des fous rires, on se moque du public. Quand j'ai fait mon premier été d'éducateur, à ma première réunion d'équipe, j'étais choqué : je trouvais que les éducateurs se moquaient du public ! En réalité, c'est une stratégie collective en coulisses pour évacuer la tension et aborder ensuite la personne le plus professionnellement possible sur scène. »
[00:23:28] M. FRANCIS VALLS : « Le public chez Goffman, ce n'est pas seulement celui qui applaudit à la fin : ce sont toutes les personnes autour qui 'jettent un œil' sans se cacher, sans être des partenaires ratifiés à part entière. Ils sont présents-absents, mais ils pèsent énormément sur l'interaction ! Quand j'interviens en amphi devant 200 étudiants de 20 ans et que je pose une question toute simple : silence absolu. La norme, c'est le silence, parce qu'il y a le regard des 200 autres autour. »

[3. La Face (Jankélévitch), la Figuration (« Les deux ou rien ») & la Distance au Rôle]
[00:26:15] M. FRANCIS VALLS : « La face, le visage : comme le dit le philosophe Vladimir Jankélévitch, le visage est nu. Je vois votre visage, mais je ne vois pas le mien. Mon visage, je le vois dans votre regard ! C'est extraordinaire : dans la vie ordinaire, je ne vois jamais mon visage, par contre je suis vu. Et tout l'enjeu de nos interactions, c'est ce double mouvement d'équilibriste, de funambule : sauver sa propre face tout en préservant celle de l'autre. Ce n'est pas l'un ou l'autre, c'est les deux ou rien. »
[00:30:02] M. FRANCIS VALLS : « La distance au rôle : au moment même où je joue ce rôle, je sais que je joue un rôle. Et comme je ne veux pas que la relation se brise, je joue sur le 'ni trop, ni trop peu'. Trop coller au rôle, c'est enfermant ; sortir complètement du rôle, c'est déstabilisant et ça casse le lien. C'est cette forme d'ironie de soi-même, d'humour, qui est l'intelligence de la situation. »
[00:46:35] M. FRANCIS VALLS : « À la dernière page de La Mise en scène de la vie quotidienne, Goffman fait une pirouette : il dit que la scène de théâtre est un lieu commun et que les échafaudages ne servent qu'à être démontés ! Et il cite L'Être et le Néant de Jean-Paul Sartre — qui passait son temps dans les cafés avec sa Simone — observant le garçon de café : un formidable danseur qui joue son rôle à la perfection. »

[4. Ateliers Cliniques : Usine en Confinement, Salle d'Opération & Aéroport de Londres]
[01:26:29] M. FRANCIS VALLS : « Dans 'Distance au rôle en salle d'opération' (présenté par Yves Winkin), le rôle est un système d'action situé. Le chirurgien en chef s'engouffre tout de blanc vêtu, le cercle s'ouvre, il marmonne quelques paroles divines et se met au travail. Et tout d'un coup, son assistant lui coupe le doigt d'un coup de scalpel électrique maladroit ! Le chirurgien ne crie pas, il ne le sanctionne pas — il a absolument besoin de lui pour finir l'opération —, il fait de la distance au rôle par l'humour : 'Si j'attrape la syphilis, je saurai d'où ça vient et j'aurai des témoins !' »
[01:37:26] M. FRANCIS VALLS : « Quand on se croise dans la foule rue Sainte-Catherine ou dans un aéroport comme dans le texte 'Embarquer pour nulle part', on s'esquive instinctivement sans se télescoper mais sans se regarder : c'est ce que Goffman appelle l'indifférence civique, dans une interaction non focalisée. Pour que cette femme sans-abri qui vit dans l'aéroport de Londres reste totalement invisible face aux passagers et à la police, il faut qu'elle utilise les toilettes comme coulisses, qu'elle soit hyper-conforme aux codes et qu'elle ait la complicité tacite du personnel de nettoyage. »

[5. Rupture des Codes (Sarraute, Gao Xingjian) & « Stigmate » (Rue Sainte-Catherine)]
[02:01:47] M. FRANCIS VALLS : « Avec le texte de Nathalie Sarraute sur le voisin silencieux qui vient tous les jours sans dire un mot, ou avec La Montagne de l'âme de Gao Xingjian (Prix Nobel), on voit que les codes rituels d'hospitalité et d'interaction nous tiennent par corps. Lorsque les règles de bienséance explosent ou qu'on sort des repères urbains face à cet 'étrange familier', cela va jusqu'à un risque de perte d'identité, et l'absence de code laisse place à la peur et à la violence potentielle. »
[02:23:15] M. FRANCIS VALLS : « Il faut absolument finir sur Stigmate de Goffman : une merveille d'approche sociale, et non psychologique, du handicap. Pour lui, le handicap n'est pas un attribut : c'est une question de regard et de relation, un problème d'interaction. Il écrit cette phrase décisive : 'Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue.' »
[02:23:45] M. FRANCIS VALLS : « J'étais rue Sainte-Catherine avec une amie en fauteuil roulant qui a eu un AVC : elle a une séquelle faciale et est un peu recroquevillée, mais elle est parfaitement consciente et parle de manière tout à fait intelligible. Elle demande le nom d'une rue à un passant. Et la personne me répond à moi ! Le regard se détourne d'elle vers moi, le supposé normal. Vous perdez la face, vous n'existez plus ! Et mon amie m'a regardé et m'a dit avec cet humour extraordinaire des personnes handicapées qui viennent au secours des normaux : 'Tiens alors, je suis invisible ! Je suis la femme invisible !' »`,
    bibliographieCitee: [
      {
        titre: "Synthèse Académique Exhaustive — PST108 Cours 5 (M. Francis Valls — Goffman : Dramaturgie, Rites d'interaction & Stigmate)",
        auteur: "M. Francis Valls (Synthèse structurée CNAM)",
        annee: "13 novembre 2026",
        remarque: "Document PDF de synthèse académique complète du Cours 5 (7 pages) : concepts articulés, tableaux comparatifs, les 5 études de cas cliniques et verbatims d'examen.",
        url: "/docs/PST108_Cours_5_Synthese_Valls.pdf",
      },
      {
        titre: "Transcription Intégrale Nettoyée & Horodatée — PST108 Cours 5 (M. Francis Valls)",
        auteur: "M. Francis Valls",
        annee: "13 novembre 2026",
        remarque: "Transcription intégrale nettoyée et horodatée des 2h28m42s de cours (31 pages, 252 séquences SRT).",
        url: "/docs/PST108_Cours_5_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "La Mise en scène de la vie quotidienne (Tome 1 : La présentation de soi)",
        auteur: "Erving Goffman",
        annee: "1959 (trad. fr. 1973, Éditions de Minuit)",
        remarque: "Ouvrage fondateur de la dramaturgie sociale : scène, coulisses, public, rôle situé, contrôle des impressions et métaphore de l'échafaudage.",
      },
      {
        titre: "Stigmate : Les usages sociaux des handicaps",
        auteur: "Erving Goffman",
        annee: "1963 (trad. fr. 1975, Éditions de Minuit)",
        remarque: "Décentrement interactionniste majeur : le stigmate comme relation de regard et les contacts mixtes ('Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue').",
      },
      {
        titre: "Les Rites d'interaction",
        auteur: "Erving Goffman",
        annee: "1967 (trad. fr. 1974, Éditions de Minuit)",
        remarque: "Théorisation de la face, de la figuration (face-work : sauver sa face tout en préservant celle d'autrui), de l'offense au code et de la distance au rôle.",
      },
      {
        titre: "Encounters: Two Studies in the Sociology of Interaction (« Distance au rôle en salle d'opération », prés. Yves Winkin)",
        auteur: "Erving Goffman (trad. et prés. Yves Winkin)",
        annee: "1961 / 2002 (Actes de la recherche en sciences sociales)",
        remarque: "Étude ethnographique célèbre du bloc opératoire comme système d'action situé et de l'humour chirurgical comme distance au rôle.",
      },
      {
        titre: "L'Être et le Néant : Essai d'ontologie phénoménologique (Le garçon de café)",
        auteur: "Jean-Paul Sartre",
        annee: "1943 (Gallimard)",
        remarque: "Description phénoménologique célèbre du garçon de café jouant son rôle comme un danseur, citée par Goffman.",
      },
      {
        titre: "La Montagne de l'âme",
        auteur: "Gao Xingjian (Prix Nobel de littérature)",
        annee: "1990 / trad. fr. 1995 (Éditions de l'Aube)",
        remarque: "Extrait littéraire analysé en séance sur la rencontre de deux solitaires hors des cadres urbains et la figure de l'étrange familier.",
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — SÉANCE 6 : PSYCHOSOCIOLOGIE DE LA COMMUNICATION (MME V. MAROT)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-s6",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 6,
    titre: "Séance 6 — Psychosociologie de la communication : variables des acteurs, défenses, représentations sociales & stéréotypes",
    sousTitre: "De Shannon & Weaver à Abric (1999), Anzieu & Martin, Kurt Lewin, Serge Moscovici et Gregory Razran (1950)",
    enseignant: "Mme Véronique MAROT (Psychologue du travail, chargée d'enseignement Cnam)",
    dateSeance: "14 novembre 2026",
    format: "presentiel",
    dureeEnregistrement: "2 h 15 min 00 s (190 séquences)",
    resumeExecutif: [
      "Épistémologie de la communication (Abric, 1999 ; Anzieu & Martin) : dépassement des modèles télégraphiques linéaires (Shannon & Weaver, Wiener, Riley & Riley) et apport de la systémie (« On ne peut pas ne pas communiquer ») pour définir la communication comme un processus social dynamique d'influence réciproque entre deux locuteurs.",
      "Système pluricanal et implicites professionnels : la communication engage codes vestimentaires (tech en baskets vs ministère de l'Intérieur), vocabulaire sectoriel (« envoyer son pricing » tout en gardant son genre et style professionnels), posture/mimiques (Marcel Mauss, Les techniques du corps) et silence.",
      "Méthodologie d'examen et usage critique de l'IA : félicitations sur le niveau des Activités Distantes (AD) et exigence cardinale en copie de « déplier la pensée » (justifier le recours à un auteur et l'illustrer) ; mise en garde contre l'usage aveugle des IA génératives qui inventent citations et numéros de pages en psychologie de l'activité.",
      "Variables psychologiques des acteurs (Grand I / A.1) : champ de forces de Kurt Lewin (forces positives → comportement d'approche ; forces négatives → comportement d'évitement) ; projection (assimilation vs justification agressive) ; 4 mécanismes de défense face à une information menaçante (scotomisation, mémorisation sélective, interprétation défensive, négation de l'autorité de la source).",
      "Variables cognitives et représentations sociales (Grand I / A.2) : mode cognitif socialement situé (relecture du chamallow de Stanford / Walter Mischel) ; calibrage du code et piège du jargon entre psychologues (dialogue de sourds) ; système de représentations sociales de Moscovici (« on ne réagit pas à la réalité, mais à ce qu'elle représente » — ne pas acheter le mot-valise « respect »).",
      "Protocole de Gregory Razran (1950) et représentation de soi : démonstration en 4 temps (T1 soumission scientifique, T2 consistance, T3 persistance à 3 mois hors mémoire immédiate, T4 biais massifs liés aux patronymes Lévy, Bettini, McLane) ; tension énergivore entre Moi intime et Moi public (Goffman ; dirigeante aux « habitudes de pauvre »), ouverture vers l'extimité et cas vécu en EPI sur plancher machine.",
      "Variables sociales (Grand I / A.3) : statut social fixant les attentes réciproques ; perturbations par conflit de rôle ou rigidité de rôle (cas du CEO de 70 ans dans une association bénévole) ; préjugés et stéréotypes comme facilitateurs intra-groupe mais dotés d'une fonction anticipatrice (« la messe est dite d'avance ») résumée dans la conclusion dictée de Razran.",
    ],
    consignesOralesProf: [
      {
        titre: "Maîtriser les 4 documents synthétiques déposés sur Moodle",
        typeTravail: "lecture",
        consigneExacte:
          "Étudier et mémoriser la structure des 4 documents condensés en tableaux déposés sur Moodle : 1) La transmission de l'information dans le modèle psychosociologique (Anzieu & Martin) ; 2) Les facteurs et variables déterminants de la communication (Acteurs / Canal / Environnement-Contexte) ; 3) Les attitudes en entretien d'Elias Porter ; 4) La représentation d'une situation d'entretien (expérience de Razran).",
        echeance: "En continu avant l'examen de PST108",
        modaliteRendu: "Travail individuel + questions via le forum Moodle si incompréhension",
        recommandationsProf:
          "Les tableaux Moodle livrent le condensé exact à retenir ; pour élargir et contextualiser, se reporter aux chapitres correspondants de J.-C. Abric (1999).",
      },
      {
        titre: "Approfondir l'ouvrage pivot de Jean-Claude Abric (1999)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire les chapitres de Psychologie de la communication : théories et méthodes (Abric, 1999) relatifs à l'approche psychosociologique et aux variables des acteurs, avant la reprise ultérieure des colonnes Canal et Environnement/Contexte.",
        echeance: "Avant la prochaine séance de Mme Marot",
        modaliteRendu: "Fiches de lecture personnelles",
        recommandationsProf:
          "Vérifier directement les citations dans l'ouvrage papier : ne jamais recopier sans contrôle des citations ou numéros de page générés par une IA.",
      },
      {
        titre: "Entraînement à la copie : méthode « déplier la pensée » & retour AD",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Dans la continuité des Activités Distantes (AD) saluées collégialement, rédiger au stylo/crayon sans béquille numérique en justifiant systématiquement pourquoi chaque auteur et concept est mobilisé, avec un exemple concret.",
        echeance: "Retour détaillé annoncé en fin de séance",
        modaliteRendu: "Préparation écrite sur table",
        recommandationsProf:
          "À l'examen sur table, il faut repasser au « crayon de papier » : seul un socle théorique stabilisé permet de ne pas se faire piéger par les hallucinations de l'IA en amont.",
      },
    ],
    syntheseSections: [
      {
        numero: "Intro",
        titre: "De Shannon & Weaver à l'approche psychosociologique & systémique (Abric, 1999)",
        points: [
          {
            titre: "Articulation Langage / Communication / Dialogie et dépassement des modèles techniques",
            contenu:
              "Les modèles télégraphiques historiques (Shannon & Weaver : émetteur → codage → canal + « friture sur la ligne » → décodage → récepteur ; complétés par la boucle de feedback de Norbert Wiener et l'ancrage social de Riley & Riley) constituent un point de départ insuffisant. En psychosociologie (Anzieu & Martin ; Abric, 1999), la communication est un ensemble de processus sociaux par lesquels s'échangent des informations dans une situation sociale donnée. On remplace « émetteur / récepteur » par deux locuteurs engagés dans une interaction dynamique produisant une transformation et une influence réciproque.",
            auteurs: ["Shannon & Weaver", "Norbert Wiener", "Riley & Riley", "Anzieu & Martin", "Jean-Claude Abric (1999)"],
            conceptsCles: ["Feedback cybernétique", "Interaction d'influence réciproque", "Deux locuteurs"],
          },
          {
            titre: "Acte social pluricanal, systémie et posture de l'intervenant",
            contenu:
              "La communication est un acte social volontaire ou involontaire, conscient ou non conscient. Conformément au présupposé systémique (« On ne peut pas ne pas communiquer »), tout fait sens dans un milieu : tenue vestimentaire (baskets dans la tech vs codes formels au ministère de l'Intérieur), vocabulaire (« envoyer son pricing » tout en gardant son genre professionnel), gestes, mimiques, posture corporelle (Marcel Mauss, Les techniques du corps — observations des démarches culturellement apprises durant la guerre) et le silence. Capter ces codes permet de lisser l'asymétrie initiale du psychologue qui débarque sur le terrain.",
            auteurs: ["École de Palo Alto", "Marcel Mauss"],
            conceptsCles: ["On ne peut pas ne pas communiquer", "Système pluricanal", "Techniques du corps", "Lissage de l'asymétrie"],
          },
        ],
      },
      {
        numero: "I.A.1",
        titre: "Facteurs déterminants (Rôle des acteurs) — Variables psychologiques & Mécanismes de défense",
        points: [
          {
            titre: "Théorie du champ psychologique de Kurt Lewin (forces, besoins, tensions)",
            contenu:
              "Inspiré de la physique et spécialiste des dynamiques de groupe, Kurt Lewin conçoit l'individu comme un organisme soumis à des forces d'origine externe (environnement) et interne (histoire singulière, implication, motivations explicites, implicites ou non conscientes). Ces forces créent des besoins, qui génèrent des tensions, déclenchant un comportement destiné à réduire la tension. Les forces positives (accomplissement, objectifs) suscitent un comportement d'approche ; les forces négatives (menace à esquiver) suscitent un comportement d'évitement. Cette mécanique rejoint en psychodynamique le jeu des désirs et des défenses.",
            auteurs: ["Kurt Lewin"],
            conceptsCles: ["Champ psychologique", "Forces positives / négatives", "Comportement d'approche", "Comportement d'évitement"],
          },
          {
            titre: "Projection non pathologique et 4 mécanismes de défense face à une information menaçante",
            contenu:
              "Distinguée des stratégies collectives de défense (psychodynamique du travail), la projection psychologique revêt deux formes ordinaires : (a) l'assimilation (prêter ses propres sentiments à autrui, moteur d'idéalisation dans la rencontre amoureuse) et (b) l'attribution d'attitudes à autrui pour justifier ses propres affects/conduites agressives. Lorsqu'une information menace l'équilibre interne, les normes ou la vision du monde d'un sujet, 4 défenses quasi automatiques émergent : 1) Scotomisation (du médical scotome : blackout totalement non conscient sans premier registre, ex. ne pas entendre l'annonce d'un diagnostic) ; 2) Mémorisation sélective (filtre plus conscient d'économie d'énergie lié à la fatigue/affect : « entre par une oreille, sort par l'autre ») ; 3) Interprétation défensive (transformer le sens réel vers ce qu'on souhaite : salarié persuadé d'un simple rappel à l'ordre avant de recevoir sa lettre de mise à pied) ; 4) Négation de l'autorité de la source (disqualifier l'émetteur pour invalider le message).",
            conceptsCles: ["Projection (assimilation / justification)", "Scotomisation", "Mémorisation sélective", "Interprétation défensive", "Négation de l'autorité de la source"],
          },
        ],
      },
      {
        numero: "I.A.2",
        titre: "Variables cognitives : fonctionnement situé, code & représentations sociales (Moscovici, Razran)",
        points: [
          {
            titre: "Système cognitif socialement situé (Chamallow de Stanford) & Calibrage du jargon",
            contenu:
              "Le système cognitif (mode de réflexion, d'organisation et de traitement de l'information) est à la fois individuel et façonné par l'environnement social. La relecture sociologique de l'expérience du chamallow de Stanford (Walter Mischel) montre que différer une gratification n'est pas qu'une ressource interne : en contexte de précarité et de manque (« un tiens vaut mieux que deux tu l'auras »), prendre la récompense immédiate est rationnel. Dans la communication, l'efficacité impose de calibrer le code sur un mode cognitif partagé (comme avec un enfant) et d'éviter le jargon clos, y compris entre psychologues (clinicien de l'activité vs psychanalyste = dialogue de sourds).",
            auteurs: ["Walter Mischel (Stanford)"],
            conceptsCles: ["Fonctionnement cognitif situé", "Calibrage du code", "Dialogue de sourds par jargon"],
          },
          {
            titre: "Représentations sociales (Moscovici) et posture face aux mots-valises (« respect »)",
            contenu:
              "Selon Serge Moscovici (1961), une représentation sociale est un « ensemble organisé d'informations, de croyances, d'attitudes et d'opinions qu'un individu ou un groupe élabore à propos d'un objet donné », produit d'une activité mentale reconstruisant le réel. Dans les activités humaines, aucune réalité n'est purement objective : on réagit toujours à ce qu'elle représente. Conséquence clinique : face à un mot-valise comme le « respect », le psychologue « n'achète pas » le mot — il creuse et ouvre toutes les valises pour repérer d'où parle l'interlocuteur.",
            auteurs: ["Serge Moscovici (1961)"],
            conceptsCles: ["Représentation sociale", "Reconstitution du réel", "Mot-valise « respect »"],
          },
          {
            titre: "L'expérience princeps de Gregory Razran (1950) en 4 temps et représentations de contexte",
            contenu:
              "Sur des photos d'identité ethniquement neutres notées sur 6 traits (sympathie, beauté, intelligence, gaieté, ambition, force de caractère), Razran observe : à T1, une soumission à l'autorité scientifique du labo (personne ne refuse de juger sur photo) ; à T2, une consistance à court terme ; à T3 (+ 3 mois, écartant le rappel en mémoire directe), le maintien de la consistance ; à T4 (+ 2 mois), l'ajout de patronymes modifie brutalement les scores des mêmes visages (le nom américain neutre reste stable, tandis que « Samuel Lévy » gagne en intelligence/ambition et perd en gaieté/sympathie, « Renato Bettini » gagne en beauté/sympathie et perd en intelligence, « Patrick McLane » gagne en ambition/caractère et perd en sympathie). De même, la représentation de la tâche (situation d'examen) et du lieu (petits pupitres d'amphi ou vaste salle vertigineuse, mot « psychologue ») affecte directement la performance cognitive.",
            auteurs: ["Gregory Razran (1950)"],
            conceptsCles: ["Soumission à l'autorité scientifique", "Consistance", "Biais patronymiques T4", "Représentation du contexte"],
          },
          {
            titre: "Représentation de soi (Moi intime vs Moi public, Extimité) & Cas de terrain en usine",
            contenu:
              "Inspirée des deux tomes d'Erving Goffman (La mise en scène de la vie quotidienne), la représentation de soi articule un moi intime (image privée, souvent tue, de ses forces et fragilités) et un moi public (façade déclarée sur la scène sociale). L'écart entre les deux génère une tension très énergivore (cas clinique de la dirigeante 5 étoiles hantée par ses « habitudes de pauvre », emportant les petits pots de confiture par syndrome d'imposture). En marge, la notion d'extime/extimité désigne une part de l'intime délibérément portée sur la scène publique (ex. procès) à fin de réparation tout en protégeant l'intimité. Concernant l'image du partenaire (caractéristiques psychologiques, cognitives et statutaires), Mme Marot rapporte son expérience sur plancher machine en EPI (casque, lunettes, pantalon ignifugé) : tutoyée comme nouvelle ouvrière car « une psy ne descend jamais sur les machines », puis vouvoyée dès qu'elle quitte les EPI en salle de réunion. L'existence de représentations partagées conditionne ainsi la communication.",
            auteurs: ["Erving Goffman"],
            conceptsCles: ["Moi intime vs Moi public", "Extimité", "Image du partenaire & EPI", "Représentations partagées"],
          },
        ],
      },
      {
        numero: "I.A.3",
        titre: "Variables sociales : Statut, Conflit & Rigidité de rôle, Préjugés & Stéréotypes",
        points: [
          {
            titre: "Statut social, attentes réciproques et perturbations (conflit vs rigidité de rôle)",
            contenu:
              "Le statut social est la place repérable d'un individu dans un système social donné à un instant T ; il prédétermine la communication en fixant des attentes réciproques. Deux perturbations surviennent : le conflit de rôle (tensions entre attentes contradictoires) et la rigidité de rôle (maintenir dans un contexte neuf les réflexes d'un statut antérieur : cas vécu de l'ancien CEO américain de 70 ans donnant des ordres à tout le monde dans une association bénévole et assignant la prise de notes aux femmes ; arbitre hors terrain ; retraité au sein du foyer).",
            conceptsCles: ["Statut social", "Attentes réciproques", "Conflit de rôle", "Rigidité de rôle"],
          },
          {
            titre: "Préjugés et stéréotypes : économie intra-groupe, fermeture dialogique et conclusion dictée de Razran",
            contenu:
              "Dans un groupe partageant les mêmes implicites, préjugés et stéréotypes servent de raccourcis facilitateurs de communication (mais pas de pensée : « la posture idéologique étant l'arrêt de la pensée »). Dès que les référentiels divergent, ils perturbent gravement l'interaction par leur fonction anticipatrice (« la messe est dite d'avance », fermeture à l'interlocution). Mme Marot dicte mot pour mot la formule conclusive de Razran (1950) : « Les individus réagissent non pas à l'individu tel qu'il est, mais tel qu'ils se le représentent en fonction des stéréotypes auxquels inconsciemment ils se réfèrent. »",
            auteurs: ["Gregory Razran (1950)"],
            conceptsCles: ["Raccourci communicationnel", "Idéologie vs marge réflexive", "Fonction anticipatrice"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Tableau 1 — Évolution des modèles communicationnels abordés en séance",
        colonnes: ["Approche", "Auteurs clés", "Unité / Schéma", "Apport ou limite clinique"],
        lignes: [
          {
            axe: "Modèles techniques & cybernétique",
            valeurs: [
              "Shannon & Weaver, N. Wiener, Riley & Riley",
              "Émetteur → codage → canal (+ bruit) → décodage → récepteur (+ feedback)",
              "Modèle télégraphique utile historiquement, mais insuffisant : ignore l'histoire, les affects et les représentations sociales.",
            ],
          },
          {
            axe: "Approche systémique",
            valeurs: [
              "École de Palo Alto",
              "Interactions circulaires + influence des tiers dans un service",
              "Postulat clé : « On ne peut pas ne pas communiquer » (tenues, silences, non-verbal).",
            ],
          },
          {
            axe: "Approche psychosociologique",
            valeurs: [
              "Anzieu & Martin, J.-C. Abric (1999)",
              "Deux locuteurs en interaction dynamique d'influence réciproque",
              "Remplace le signal neutre par un acte social pluricanal situé (variables psychologiques, cognitives et sociales).",
            ],
          },
        ],
      },
      {
        titre: "Tableau 2 — Les 4 mécanismes de défense face à une information menaçante",
        colonnes: ["Mécanisme", "Degré de conscience", "Opération psychique", "Illustration / Cas clinique de Mme Marot"],
        lignes: [
          {
            axe: "1. Scotomisation",
            valeurs: [
              "Totalement non conscient",
              "Occultation totale sans premier enregistrement (« blackout », métaphore du scotome oculaire)",
              "Ne pas entendre du tout l'énoncé d'un diagnostic trop traumatique.",
            ],
          },
          {
            axe: "2. Mémorisation sélective",
            valeurs: [
              "Plus consciente",
              "Premier registre puis mise à l'écart liée à la fatigue ou l'affect pour épargner son énergie",
              "« Ça rentre par une oreille, ça sort par l'autre » face à une remarque déjà entendue.",
            ],
          },
          {
            axe: "3. Interprétation défensive",
            valeurs: [
              "Non consciente / biaisée",
              "Modifier le sens réel du message pour le rapprocher de ce que l'on souhaite croire",
              "Salarié persuadé au sortir de son entretien disciplinaire d'un simple rappel à l'ordre avant sa mise à pied.",
            ],
          },
          {
            axe: "4. Négation de l'autorité de la source",
            valeurs: [
              "Défense relationnelle",
              "Disqualifier l'émetteur (« il dit n'importe quoi ») afin d'invalider une information dérangeante",
              "Attaquer la légitimité du médecin, du psychologue ou du manager annonçant une mauvaise nouvelle.",
            ],
          },
        ],
      },
      {
        titre: "Tableau 3 — Protocole expérimental de Gregory Razran (1950) en 4 temps",
        colonnes: ["Temps", "Dispositif expérimental", "Résultat & Interprétation"],
        lignes: [
          {
            axe: "T1 — Passation initiale",
            valeurs: [
              "Photos d'identité ethniquement neutres notées sur 6 traits (sympathie, beauté, intelligence, gaieté, ambition, force de caractère).",
              "Soumission à l'autorité scientifique : aucun sujet ne refuse d'émettre des jugements à partir d'un simple cliché.",
            ],
          },
          {
            axe: "T2 — Répétition court terme",
            valeurs: [
              "Mêmes photos évaluées sur les mêmes critères quelques jours/semaines plus tard.",
              "Consistance intra-individuelle : stabilité marquée des évaluations (critique : souvenir éventuel de T1).",
            ],
          },
          {
            axe: "T3 — Contrôle à + 3 mois",
            valeurs: [
              "Nouvelle passation à 3 mois d'intervalle neutralisant la mémoire immédiate.",
              "Confirmation de la consistance réelle des représentations dans le temps.",
            ],
          },
          {
            axe: "T4 — Ajout de patronymes (+ 2 mois)",
            valeurs: [
              "Patronyme américain neutre vs noms typés sur les mêmes clichés.",
              "Nom neutre stable ; Samuel Lévy (+ intelligence/ambition, − gaieté/sympathie), Renato Bettini (+ beauté/sympathie, − intelligence), Patrick McLane (+ ambition/caractère, − sympathie).",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Vocabulaire du modèle psychosociologique",
        erreurCourante: "Parler d'« émetteur » et de « récepteur » dans une analyse psychosociologique d'Abric.",
        rectificationAttendue:
          "Employer rigoureusement « deux locuteurs » engagés dans une interaction sociale dynamique d'influence réciproque (Abric, 1999 ; Anzieu & Martin).",
        contexte: "Introduction & définition de la communication.",
      },
      {
        titre: "Scotomisation vs Mémorisation sélective",
        erreurCourante: "Confondre les deux mécanismes comme un simple oubli volontaire.",
        rectificationAttendue:
          "La scotomisation est totalement non consciente (absence de premier registre, blackout) ; la mémorisation sélective comporte un premier enregistrement consciemment ou semi-consciemment filtré par fatigue.",
        contexte: "Variables psychologiques des acteurs (Grand I / A.1).",
      },
      {
        titre: "Défenses individuelles vs Stratégies collectives",
        erreurCourante: "Assimiler projection/scotomisation aux stratégies collectives de défense de Christophe Dejours.",
        rectificationAttendue:
          "Distinguer les mécanismes de défense individuels (psychodynamique du sujet face à une information menaçante) des stratégies collectives de défense construites par un collectif de travail face à la peur du métier.",
        contexte: "Question d'auditrice en séance (00:46:20).",
      },
      {
        titre: "Réinterprétation sociale du Chamallow de Stanford",
        erreurCourante: "Interpréter la prise immédiate du chamallow comme un simple déficit d'auto-contrôle cognitif inné.",
        rectificationAttendue:
          "Intégrer l'environnement socio-économique : dans un milieu marqué par la précarité (« un tiens vaut mieux que deux tu l'auras »), saisir immédiatement la ressource disponible constitue une adaptation rationnelle.",
        contexte: "Variables cognitives (Grand I / A.2).",
      },
      {
        titre: "Posture clinique devant les mots-valises (« respect »)",
        erreurCourante: "Valider au premier degré l'expression d'un salarié (« il me manque de respect ») sans l'explorer.",
        rectificationAttendue:
          "Ne jamais « acheter le mot » : ouvrir la valise sémantique pour faire émerger les représentations sociales, attentes statutaires et normes concrètes qui se cachent dessous.",
        contexte: "Représentations sociales selon Moscovici.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Méthodologie d'examen & Usage critique de l'IA]
[00:09:07] MME MAROT : « Comment vous dépliez les idées que vous avez : dans les écrits qu'il va s'agir de produire lors de l'examen, c'est ça que je veux voir. Pas juste poser une connaissance, mais dire pourquoi vous mobilisez telle connaissance avec tel auteur, en mettant une illustration, pour qu'on chemine avec vous. »
[00:13:39] MME MAROT : « Comme tous les outils, l'IA reste un outil hyper puissant, mais ça demande de l'utiliser avec connaissance et éthique — sinon elle invente de fausses citations et de faux numéros de pages en psychologie de l'activité. Parfois, vous êtes obligés de passer par le crayon de papier, parce que c'est ce qui nous attend à l'examen. »

[2. Approche psychosociologique, systémie & pluricanalité]
[00:20:00] MME MAROT : « La communication s'inscrit dans un processus d'influence réciproque entre acteurs sociaux. Dans le vocabulaire d'Abric, il n'y a donc pas un émetteur et un récepteur, mais deux locuteurs en interaction. »
[00:23:45] MME MAROT : « Quand on travaille dans la tech, on est en basket ; si vous allez au ministère de l'Intérieur, vous ne communiquez pas de la même façon. Quand il faut "envoyer son pricing" pour faire un budget, c'est bien de savoir naviguer dans leur vocabulaire tout en gardant son genre et son style professionnels. »

[3. Variables psychologiques : Lewin & 4 mécanismes de défense]
[00:39:02] MME MAROT : « Chez Lewin, les forces positives liées à l'accomplissement déclenchent un comportement d'approche ; les forces négatives, quand on a besoin de se détourner d'un événement menaçant, déclenchent un comportement d'évitement. »
[01:00:18] MME MAROT : « Dernièrement j'avais un salarié convoqué pour faute : c'était tellement impensable qu'il est sorti convaincu de n'avoir eu qu'un rappel à l'ordre, avant de recevoir deux jours plus tard sa notification de mise à pied — c'est l'interprétation défensive. »

[4. Variables cognitives : Chamallow, Moscovici & Razran (1950)]
[01:09:58] MME MAROT : « Les enfants issus de milieux imprégnés par la pauvreté et le manque appliquent rationnellement "un tiens vaut mieux que deux tu l'auras" : maintenant je sais qu'il y a un chamallow, après je ne sais pas. »
[01:16:50] MME MAROT : « Dans les activités humaines, il n'existe pas de réalité objective. Toute réalité est représentée : on ne réagit pas à la réalité, mais à ce qu'elle représente. »
[01:19:16] MME MAROT : « La posture de base, quand on vous dit "respect", on n'achète pas le mot : c'est un mot-valise, c'est une mine d'or — on creuse et on ouvre toutes les valises. »

[5. Représentation de soi, terrain industriel & Variables sociales]
[01:35:52] MME MAROT : « Cette dirigeante qui descendait en cinq étoiles me disait : "J'ai mes habitudes de pauvre, ce n'est pas moi" — et prenait les petits pots de confiture de l'hôtel. Tenir son moi public en tension avec son moi intime est extrêmement énergivore. »
[01:44:20] MME MAROT : « Sur le plancher machine en visite d'usine avec casque, lunettes et tenue ignifugée, personne ne pensait qu'une psy puisse descendre là : les opérateurs me tutoyaient ; sitôt les EPI retirés en salle de réunion, ils me vouvoyaient. »
[02:00:02] MME MAROT : « Dans cette association, un ancien CEO américain de 70 ans donnait des ordres à tout le monde et trouvait normal qu'une femme prenne les notes : c'est la rigidité de rôle. »
[02:11:03] MME MAROT (dictée mot pour mot) : « Les individus réagissent non pas à l'individu tel qu'il est, mais tel qu'ils se le représentent en fonction des stéréotypes auxquels inconsciemment ils se réfèrent. »`,
    bibliographieCitee: [
      {
        titre: "Synthèse académique du Cours 6 PST108 (Mme Véronique Marot) [PDF]",
        auteur: "Mme Véronique Marot · Plateforme PST (éd.)",
        annee: "14 novembre 2026",
        remarque: "Fiche de synthèse complète de la séance (épistémologie, Lewin, 4 défenses, Moscovici, protocole Razran 1950 en 4 temps, cas cliniques et citations dictées).",
        url: "/docs/PST108_Cours_6_Synthese_Marot.pdf",
      },
      {
        titre: "Retranscription complète nettoyée et horodatée du Cours 6 PST108 [PDF]",
        auteur: "Mme Véronique Marot (corpus audio 02h15m00s, 190 séquences)",
        annee: "14 novembre 2026",
        remarque: "Version intégrale nettoyée des scories STT et structurée en 6 chapitres chronologiques avec encarts conceptuels.",
        url: "/docs/PST108_Cours_6_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Psychologie de la communication : théories et méthodes",
        auteur: "Jean-Claude Abric",
        annee: "1999 (Armand Colin)",
        remarque: "Ouvrage pivot du cours fondant le passage des modèles techniques (Shannon & Weaver) à l'approche psychosociologique des locuteurs et des représentations.",
      },
      {
        titre: "La dynamique des groupes restreints / Modèle psychosociologique de transmission de l'information",
        auteur: "Didier Anzieu & Jacques-Yves Martin",
        annee: "1968 / rééd. PUF",
        remarque: "Référence du premier tableau déposé sur Moodle formalisant la communication en situation sociale donnée.",
      },
      {
        titre: "La psychanalyse, son image et son public",
        auteur: "Serge Moscovici",
        annee: "1961 (PUF)",
        remarque: "Conceptualisation fondatrice du système de représentations sociales comme reconstitution active du réel.",
      },
      {
        titre: "Ethnic Dislikes and Stereotypes: A Laboratory Study",
        auteur: "Gregory Razran",
        annee: "1950 (Journal of Abnormal and Social Psychology)",
        remarque: "Étude princeps en 4 temps sur la consistance évaluative et la bascule stéréotypée liée aux patronymes (Lévy, Bettini, McLane).",
      },
      {
        titre: "La mise en scène de la vie quotidienne (t. 1 : La présentation de soi ; t. 2 : Les relations en public)",
        auteur: "Erving Goffman",
        annee: "1959 / trad. fr. Éditions de Minuit",
        remarque: "Mobilisé par Mme Marot pour éclairer l'articulation moi intime / moi public et la scène sociale des rôles.",
      },
      {
        titre: "Les techniques du corps",
        auteur: "Marcel Mauss",
        annee: "1934 (in Sociologie et anthropologie, PUF)",
        remarque: "Référence sur la dimension culturellement apprise des postures et gestes dans la communication pluricanale.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST108 — SÉANCE 7 : ACTES DE LANGAGE, CASSSIN, HABERMAS, HONNETH & BOURDIEU (M. É. LUCY)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst108-s7",
    moduleKey: "pst108",
    moduleLabel: "PST108",
    numeroSeance: 7,
    titre: "Séance 7 — Actes de langage (Searle & Vanderveken), Démise de la vérité (Cassin) & Grilles Habermas / Honneth / Bourdieu",
    sousTitre: "Atelier pragmatique (Durand / Karim / Marc), rhétorique du performatif et boîtes à outils pour la sous-épreuve de M. Éric Lucy",
    enseignant: "M. Éric LUCY (Université Bordeaux 2 / IRTS / Cnam)",
    dateSeance: "17 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "2 h 16 min 41 s (287 séquences)",
    resumeExecutif: [
      "Pragmatique de l'énonciation (Searle, Anscombe & Vanderveken pp. 12, 16, 17) : analyser le langage non d'après le seul sens littéral de la phrase mais selon le contexte d'énonciation, le statut (degré de puissance / imperium), l'intention mentale (L'Intentionnalité), les directions d'ajustement et l'effet perlocutoire chez l'allocutaire.",
      "Langage indirect, ambiguïté & prétérition en clinique du travail : exemple politique (« Je ne dirai pas que l'opposition raconte n'importe quoi »), rôle décisif de la ponctuation (« Damien est un idiot ») et rappel du cas France Télécom (« par la porte ou par la fenêtre ») dans les relations hiérarchiques.",
      "Atelier clinique sur le tableau de Cécile (Mme Durand, Karim, Marc, Julie) : analyse des répliques montrant le passage du déclaratif (ouverture de réunion, obsequium), l'assertif tourné en reproche indirect (+15 % de retards), la bascule statutaire de Karim nommé référent, le faux remerciement et la ruse littérale de Marc sur le chauffage (« Oui, je peux le faire » sans bouger, type « Pouvez-vous me faire passer le sel ? »).",
      "Barbara Cassin (« Quand dire, c'est vraiment faire ») : tripartition dire le réel / raisonnement sophistique appelant la capacité à juger / maïeutique socratique ; généalogie du déclaratif sacramentaire (fiat lux, rituel politique de Mitterrand au 20h vs flop sur les réseaux sociaux).",
      "Démise de la vérité & Fake News : d'après Ernst Kantorowicz (Les Deux Corps du roi), le performatif destitue le vrai/faux binaire au profit de la validité et du perlocutoire (Trump, Cyril Hanouna, fact-checking et spectre gradué).",
      "Prolongements philosophiques — Habermas & Honneth : Jürgen Habermas formalise la rationalité démocratique en 4 actes (stratégique, normatif, dramatique/subjectivité, téléologique) ; Axel Honneth renverse la thèse en montrant que le sujet cherche d'abord la reconnaissance sociale (sociale, juridique, affective) contre « l'invisibilité effective ».",
      "Pierre Bourdieu & Méthode officielle d'examen (1h00 É. Lucy) : marché linguistique, équation (Disposition + Capital) × Champ = Habitus (parler fort béarnais vs jargon sur chantier, ados chez Cassin), illusio, obsequium et délégation institutionnelle ; liberté à l'examen de croiser les différentes grilles pour argumenter.",
    ],
    modalitesExamen: {
      session1Date: "9 février 2027 (18h00–21h00)",
      session2Date: "Avril 2027",
      duree: "1 heure (sous-épreuve M. Éric LUCY sur les 3 heures de PST108)",
      format:
        "Analyse argumentée d'un document professionnel (ex. charte d'entreprise, mail, extrait d'entretien) ou d'une situation langagière au choix multi-grilles",
      optionsAuChoix: [
        "Croiser librement les grilles vues en cours selon la pertinence du corpus : micro-pragmatique (Searle & Vanderveken pp. 12, 16, 17), rhétorique du performatif (Barbara Cassin), agir communicationnel (Habermas), lutte pour la reconnaissance (Honneth) et marché linguistique (Bourdieu).",
      ],
      recommandationsNotation:
        "Réponse directe de M. Lucy (02:12:00) : « Comme vous voulez ! Vous piochez dans différentes grilles de lecture. » L'évaluateur note la capacité à exercer un jugement organisé, situé et scientifiquement argumenté — jamais un remplissage mécanique de cases.",
    },
    consignesOralesProf: [
      {
        titre: "Activité Distante (AD) : Lire Axel Honneth, « L'invisibilité effective »",
        typeTravail: "lecture",
        consigneExacte:
          "Lire le texte consacré aux processus d'invisibilisation sociale et à l'absence de reconnaissance au travail selon Axel Honneth (« L'invisibilité effective ») et répondre aux questions déposées sur Moodle.",
        echeance: "Avant la webconférence du mercredi 9 décembre 2026",
        modaliteRendu: "Dépôt / Forum sur Moodle",
        recommandationsProf:
          "Repérer comment le déni de reconnaissance juridique, sociale et langagière détruit l'existence sociale du travailleur bien au-delà du seul sens des mots.",
      },
      {
        titre: "Ciblage Vanderveken (pp. 12, 16, 17) & Émission Philosophie (R. Enthoven)",
        typeTravail: "lecture",
        consigneExacte:
          "Relire précisément les pages 12 (catégories de Searle), 16 (directions d'ajustement et accomplissement) et 17 (sincérité et degré de puissance) du texte de Daniel Vanderveken, consulter le support enrichi avec Elizabeth Anscombe, et regarder l'épisode de l'émission Philosophie (Arte, Raphaël Enthoven) sur le langage.",
        echeance: "Avant le 9 décembre 2026",
        modaliteRendu: "Appropriation personnelle & fiches d'outils conceptuels",
        recommandationsProf:
          "S'appuyer sur Vanderveken pour ne pas confondre satisfaction pragmatique de l'acte et ressenti émotionnel de l'allocutaire.",
      },
      {
        titre: "Terrain clinique : Apporter une situation ou un document professionnel réel",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Identifier une situation professionnelle vécue ou un document d'organisation (ex. charte de bonne conduite envoyée par un manager, note de service, extrait d'entretien) et en proposer une analyse pragmatique/sociologique pour discussion collégiale.",
        echeance: "Webconférence du mercredi 9 décembre 2026 (puis 2 dernières visios jusqu'au 13 janvier 2027)",
        modaliteRendu: "Proposition écrite sur Moodle et discussion orale en séance",
        recommandationsProf:
          "Ne pas hésiter à croiser Searle/Vanderveken, Cassin, Habermas, Honneth et Bourdieu pour mettre en lumière les rapports de pouvoir et de reconnaissance.",
      },
    ],
    syntheseSections: [
      {
        numero: "Intro",
        titre: "Pragmatique de l'énonciation, bibliographie pivot & actes indirects",
        points: [
          {
            titre: "De la vérité propositionnelle à l'analyse pragmatique située",
            contenu:
              "Revenant sur les propositions d'exercices de Cécile, Jean, Jennifer et Maria, M. Lucy rappelle que la pragmatique consiste à ne jamais juger une phrase de façon abstraite, mais dans son contexte d'énonciation : qui parle, à qui, dans quel rapport de subordination et avec quelle intention mentale (Elizabeth Anscombe). Il distingue nettement l'acte illocutoire (intention et force agissante du locuteur au moment de parler) de l'effet perlocutoire (impact réel produit sur l'allocutaire).",
            auteurs: ["John L. Austin", "John R. Searle", "Elizabeth Anscombe"],
            conceptsCles: ["Énonciation située", "Illocutoire vs Perlocutoire", "Allocutaire"],
          },
          {
            titre: "Bibliothèque de référence et subtilité du langage indirect",
            contenu:
              "Ouvrages présentés à l'écran : Austin (Quand dire, c'est faire), Searle (Les actes de langage ; Sens et expression ; L'Intentionnalité : essai de philosophie des états mentaux), Daniel Vanderveken (Théorie des actes de discours, pp. 12, 16, 17), Barbara Cassin (Quand dire, c'est vraiment faire), Pierre Bourdieu (Ce que parler veut dire), Julia Kristeva (Le langage, cet inconnu) et Ducrot & Todorov (Dictionnaire encyclopédique des sciences du langage). M. Lucy souligne le poids clinique des actes indirects et de la prétérition (ex. « Je ne dirai pas que l'opposition raconte n'importe quoi ») ainsi que de la ponctuation et des métaphores managériales destructrices (France Télécom : « par la porte ou par la fenêtre »).",
            auteurs: ["Daniel Vanderveken (1992)", "Barbara Cassin", "Julia Kristeva", "Oswald Ducrot & Tzvetan Todorov"],
            conceptsCles: ["Prétérition", "Actes de langage indirects", "Intentionnalité & états mentaux"],
          },
        ],
      },
      {
        numero: "Atelier",
        titre: "Atelier clinique sur le tableau de Cécile : Cas Mme Durand / Karim / Marc / Julie",
        points: [
          {
            titre: "Statut, imperium, temporalité et bascule pragmatique de statut",
            contenu:
              "1) Mme Durand (« Je déclare la réunion ouverte… merci d'être venus ») combine un déclaratif instantané (monde → mots) et un rituel d'obsequium/illusio rappelant la distinction grecque entre imperium (statut), droit (loi) et pouvoir/nombre (si l'équipe déserte, le roi est nu). 2) Son constat « +15 % de retards » glisse d'un assertif apparent vers un déclaratif indirect de reproche ou une fake news si le chiffre vise uniquement à culpabiliser. 3) Quand Karim « promet un nouveau planning », s'entrelacent un engageant/promissif à satisfaction différée (+3 semaines) et une obligation statutaire, puis sa nomination comme référent (énoncé 6) modifie irréversiblement ses devoirs de sincérité. 4) Son remerciement « ça me touche beaucoup » se lit soit comme fierté authentique, soit comme faux remerciement face à une surcharge, soit comme calcul anticipant une prime.",
            auteurs: ["John R. Searle", "Daniel Vanderveken (pp. 12, 16, 17)", "Pierre Bourdieu"],
            conceptsCles: ["Degré de puissance / Imperium", "Direction d'ajustement", "Temporalité de satisfaction", "Condition de sincérité"],
          },
          {
            titre: "Neutraliser une injonction indirecte : Marc, le chauffage et le sel",
            contenu:
              "À la réplique 15, prié d'augmenter le chauffage, Marc répond « Oui, oui, je peux le faire » mais reste immobile. Sur le modèle classique de « Pouvez-vous me faire passer le sel ? », le subalterne refuse la lecture directive implicite et se replie sur le sens littéral d'un assertif (« tu m'as demandé si j'en avais la capacité physique, pas de le faire »). Il évite l'acte engageant, annihile l'autorité de la cheffe et rejoue un rapport de pouvoir au cœur du champ professionnel.",
            conceptsCles: ["Neutralisation littérale", "Évitement de l'engageant", "Injonction indirecte"],
          },
        ],
      },
      {
        numero: "Cassin",
        titre: "Barbara Cassin : Rhétorique, Déclaratif sacramentaire & Démise de la vérité",
        points: [
          {
            titre: "Les 3 dimensions du discours et le déclaratif sacramentaire",
            contenu:
              "À partir des réponses de Jean, M. Lucy met en relief les trois dimensions entrelacées chez Barbara Cassin : dire quelque chose de la réalité, construire un raisonnement persuasif (réhabilitation du sophiste contre sa caricature, maïeutique socratique), et faire faire / transformer le monde. Historiquement hérité du sacré (fiat lux), le déclaratif exige un obsequium solennel : faute de mise en scène sacrée, les déclarations de candidature improvisées sur les réseaux sociaux font « flop », à l'inverse de l'annonce théâtralisée de François Mitterrand au journal de 20h.",
            auteurs: ["Barbara Cassin", "Socrate", "John L. Austin"],
            conceptsCles: ["Sophistique & capacité à juger", "Maïeutique socratique", "Déclaratif sacramentaire (Fiat lux)"],
          },
          {
            titre: "Démise de la vérité (Kantorowicz) et mécanique des fake news",
            contenu:
              "Mobilisant Les Deux Corps du roi d'Ernst Kantorowicz (la « démise » comme sortie du corps et du statut royal), Barbara Cassin montre que le performatif démet la question binaire vrai/faux. Peu importe à Donald Trump ou à Cyril Hanouna (« Ce n'est pas un vrai chiffre, mais ça veut dire quelque chose de vrai ») que l'énoncé soit factuellement faux : son but est l'effet perlocutoire de mobilisation ou de provocation — appelant en retour les dispositifs de fact-checking et le spectre de vérité relevé par Jennifer.",
            auteurs: ["Barbara Cassin", "Ernst Kantorowicz"],
            conceptsCles: ["Démise de la vérité", "Validité vs vrai/faux", "Fake news & fact-checking"],
          },
        ],
      },
      {
        numero: "Macro",
        titre: "Les 3 grilles macro-philosophiques : Habermas, Honneth & Bourdieu",
        points: [
          {
            titre: "Jürgen Habermas (Agir communicationnel) : les 4 dimensions d'actes",
            contenu:
              "Penseur de l'École critique de Francfort, Habermas cherche comment nous bâtissons la raison humaine et une démocratie habitable (« le moins pire des régimes » selon Aristote) malgré l'ambiguïté du langage. Par le langage transcendantal et nos mondes vécus, nous nous accordons sur des modalités de jugement en exerçant simultanément 4 actes : (1) Stratégique (déchiffrer attentes et statuts), (2) Normatif (respecter tours de parole, grammaire et règles), (3) Dramatique (exposer sa subjectivité et son histoire identitaire dans le regard prêté à autrui) et (4) Téléologique (inscrire sa parole dans une finitude entre début et fin).",
            auteurs: ["Jürgen Habermas", "Aristote"],
            conceptsCles: ["Acte stratégique", "Acte normatif", "Acte dramatique (subjectivité)", "Acte téléologique"],
          },
          {
            titre: "Axel Honneth (Reconnaissance) & Pierre Bourdieu (Marché linguistique)",
            contenu:
              "1) Axel Honneth objecte à son maître Habermas que dans un monde babélisé (boutade sur les singes qui se taisent face au désordre verbal), l'être humain cherche avant tout la reconnaissance sociale (sociale, juridique, affective — héritage de Kant et Hegel) pour échapper à l'invisibilité effective. 2) Pierre Bourdieu (Ce que parler veut dire) inscrit les échanges sur un marché linguistique régi par l'équation (Disposition + Capital) × Champ = Habitus : le parler fort paysan béarnais vaut capital à la campagne mais non ailleurs, tandis que le jargon savant disqualifie sur un chantier. Comme les adolescents cités par Cassin, on parle pour se distinguer, et assister aux réunions manifeste l'illusio par l'obsequium, toute force illocutoire reposant sur une délégation institutionnelle.",
            auteurs: ["Axel Honneth", "Kant & Hegel", "Pierre Bourdieu"],
            conceptsCles: ["Reconnaissance vs invisibilité effective", "(Disposition + Capital) × Champ = Habitus", "Illusio & Obsequium", "Délégation institutionnelle"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Synthèse des 5 grilles d'analyse disponibles pour la sous-épreuve de M. Éric Lucy (1h00)",
        colonnes: ["Grille / Auteur(s)", "Ce qu'elle éclaire en clinique du travail", "Notions / Repères obligatoires"],
        lignes: [
          {
            axe: "Searle & Vanderveken",
            valeurs: [
              "Mécanique fine de l'intention, du statut et de la validité de chaque réplique.",
              "5 catégories (Assertif, Directif, Promissif/Engageant, Expressif, Déclaratif), ajustement, sincérité, degré de puissance (pp. 12, 16, 17).",
            ],
          },
          {
            axe: "Barbara Cassin & Kantorowicz",
            valeurs: [
              "Effets de réalité du discours managérial ou politique hors du vrai/faux constatif.",
              "Déclaratif sacramentaire (fiat lux), démise de la vérité, maïeutique, capacité à juger, fake news.",
            ],
          },
          {
            axe: "Jürgen Habermas",
            valeurs: [
              "Comment un collectif délibère et construit du commun malgré l'ambiguïté.",
              "Agir communicationnel, monde vécu et 4 actes : stratégique, normatif, dramatique, téléologique.",
            ],
          },
          {
            axe: "Axel Honneth",
            valeurs: [
              "Souffrance éthique, colère et invisibilisation des travailleurs privés de parole.",
              "Reconnaissance affective, juridique et sociale ; lutte contre « l'invisibilité effective ».",
            ],
          },
          {
            axe: "Pierre Bourdieu",
            valeurs: [
              "Asymétrie des places, domination symbolique et légitimité des porte-parole.",
              "Marché linguistique, (Disposition + Capital) × Champ = Habitus, distinction, obsequium, illusio, délégation.",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Grille d'examen : une seule case ou croisement libre ?",
        erreurCourante: "Croire qu'il faut trouver la « case unique » pour chaque phrase ou n'appliquer qu'un auteur.",
        rectificationAttendue:
          "M. Lucy répond explicitement (02:12:00) : « Comme vous voulez ! Vous piochez dans différentes grilles de lecture » pour construire un jugement scientifique argumenté sur la situation.",
        contexte: "Modalités de la sous-épreuve 1h00 M. Éric LUCY.",
      },
      {
        titre: "Satisfaction pragmatique vs Satisfaction affective",
        erreurCourante: "Écrire dans une analyse Searle/Vanderveken que l'acte est « satisfait » parce que Karim est content d'être promu.",
        rectificationAttendue:
          "La condition de satisfaction mesure si l'acte de langage est réussi et rendu valide dans le monde selon sa direction d'ajustement ; la réaction émotionnelle de Karim relève du perlocutoire.",
        contexte: "Atelier tableau de Cécile (réplique 7).",
      },
      {
        titre: "Acte téléologique vs Acte stratégique (Habermas)",
        erreurCourante: "Confondre « téléologique » avec une tactique de calcul à court terme (ou avec le « théologique »).",
        rectificationAttendue:
          "L'acte stratégique évalue attentes et positions de la situation présente ; l'acte téléologique inscrit le dire dans la finitude humaine (un début, une fin, une visée existentielle).",
        contexte: "Typologie des 4 actes d'Habermas (01:51:40).",
      },
      {
        titre: "Sophiste et Démise de la vérité (Barbara Cassin)",
        erreurCourante: "Réduire le sophiste à un pur tricheur ou juger un déclaratif comme vrai ou faux.",
        rectificationAttendue:
          "Le sophiste forge des raisonnements appelant la capacité de juger ; quant au performatif, il opère une « démise de la vérité » (Kantorowicz) qui déplace l'évaluation vers sa validité rituelle et ses effets perlocutoires.",
        contexte: "Commentaire de l'exercice Barbara Cassin (01:33:50–01:45:00).",
      },
      {
        titre: "Dispositions vs Champ (Bourdieu)",
        erreurCourante: "Croire qu'une manière de parler possède une valeur absolue indépendamment du milieu.",
        rectificationAttendue:
          "Appliquer la formule (Disposition + Capital) × Champ = Habitus : le parler fort paysan ou le jargon savant n'ont valeur de capital que dans le champ qui les reconnaît.",
        contexte: "Collège de France & Ce que parler veut dire (02:02:20).",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Pragmatique de l'énonciation, bibliographie pivot & actes indirects]
[00:04:45] M. ÉRIC LUCY : « Analyser le discours en clinique du travail, c'est resituer les éléments dans le contexte de leur énonciation : qui parle, avec qui, dans quel contexte — ne pas penser le langage du point de vue du sens de la phrase, mais de son énonciation. »
[00:08:50] M. ÉRIC LUCY : « Dans la clinique du travail, le management et les relations de subordination, beaucoup de choses se disent directement, et des enjeux de pouvoir se jouent à travers le langage indirect et des intentions plus ou moins hypocrites. »

[2. Atelier clinique sur le tableau de Cécile : statut, sincérité & ruse littérale]
[00:30:27] M. ÉRIC LUCY : « Quand Mme Durand dit "Bonjour à tous, merci d'être venus", c'est l'obsequium, le protocole, et l'illusio : elle installe les règles du jeu. Car si personne ne vient, malgré son imperium et son statut, le roi est nu et la loi tombe. »
[00:43:52] M. ÉRIC LUCY : « Dans les fake news, peu importe à Trump que son chiffre soit vrai ou faux : son enjeu est de produire du performatif et de ramener les gens à sa cause. »
[01:22:30] M. ÉRIC LUCY : « En répondant "oui, je peux augmenter le chauffage" sans bouger — comme à "pouvez-vous me faire passer le sel ?" — Marc reste au pied littéral de l'assertif pour ne pas s'engager et défaire la demande de sa supérieure. »

[3. Barbara Cassin : déclaratif sacramentaire & démise de la vérité]
[01:36:40] M. ÉRIC LUCY : « Le déclaratif naît du sacramentaire, du fiat lux : on ne peut pas faire un déclaratif efficace sans un obsequium et une dimension sacrée, comme Mitterrand au 20 heures par contraste avec les annonces improvisées sur les réseaux sociaux. »
[01:41:05] M. ÉRIC LUCY : « Dans le performatif, il y a toujours une démise de la vérité, au sens des Deux Corps du roi de Kantorowicz : on vient déplacer le vrai et le faux pour provoquer un effet perlocutoire chez l'allocutaire. »

[4. Habermas, Honneth, Bourdieu & Stratégie d'examen]
[01:48:20] M. ÉRIC LUCY : « L'agir communicationnel d'Habermas, c'est comment nous fabriquons du commun avec nos mondes vécus en confrontant nos jugements à travers quatre actes : stratégique, normatif, dramatique et téléologique. »
[01:55:25] M. ÉRIC LUCY : « Axel Honneth objecte à Habermas : dans un monde tellement ambigu, ce que cherche l'humain dans le langage, ce n'est pas d'abord la raison, c'est la reconnaissance sociale — avoir une place juridique, sociale et affective. »
[02:02:29] M. ÉRIC LUCY : « Notez cette opération que Bourdieu écrivait dans un coin du tableau au Collège de France : (Disposition + Capital) × Champ = Habitus. Toute force illocutoire dépend du statut et reste une histoire de délégation institutionnelle. »
[02:12:15] M. ÉRIC LUCY (sur l'examen) : « Vous piochez comme vous voulez dans les différentes grilles de lecture pour remplir votre boîte à outils et produire un jugement organisé, argumenté avec des concepts scientifiques. »`,
    bibliographieCitee: [
      {
        titre: "Synthèse académique du Cours 7 PST108 (M. Éric Lucy) [PDF]",
        auteur: "M. Éric Lucy · Plateforme PST (éd.)",
        annee: "17 novembre 2026",
        remarque: "Synthèse complète de la webconférence (Searle/Vanderveken pp. 12-16-17, atelier Durand/Karim/Marc, Barbara Cassin, Habermas, Honneth, Bourdieu et méthode d'examen).",
        url: "/docs/PST108_Cours_7_Synthese_Lucy.pdf",
      },
      {
        titre: "Retranscription complète nettoyée et horodatée du Cours 7 PST108 [PDF]",
        auteur: "M. Éric Lucy (corpus audio 02h16m41s, 287 séquences)",
        annee: "17 novembre 2026",
        remarque: "Restitution chronologique intégrale nettoyée des scories STT en 6 chapitres avec sommaire détaillé.",
        url: "/docs/PST108_Cours_7_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Théorie des actes de discours et analyse des conversations (pages 12, 16 et 17 ciblées)",
        auteur: "Daniel Vanderveken",
        annee: "1992",
        remarque: "Support clé du cours : taxonomie des 5 catégories (p. 12), directions d'ajustement et accomplissement (p. 16), sincérité et degré de puissance (p. 17).",
        url: "/docs/Vanderveken_1992_Theorie_Actes_Discours_Conversation.pdf",
      },
      {
        titre: "Les actes de langage · Sens et expression · L'Intentionnalité : essai de philosophie des états mentaux",
        auteur: "John R. Searle (avec référence à Elizabeth Anscombe)",
        annee: "1969 / 1979 / 1983",
        remarque: "Trilogie fondatrice présentée à l'écran par M. Lucy sur la force illocutoire et l'intentionnalité mentale.",
      },
      {
        titre: "Quand dire, c'est vraiment faire",
        auteur: "Barbara Cassin",
        annee: "2018 (Fayard)",
        remarque: "Source de l'exercice AD : rhétorique sophistique, déclaratif sacramentaire, capacité à juger et « démise de la vérité ».",
      },
      {
        titre: "Les Deux Corps du roi : essai sur la théologie politique au Moyen Âge",
        auteur: "Ernst Kantorowicz",
        annee: "1957 (Princeton) / trad. fr. 1989 (Gallimard)",
        remarque: "Origine de la notion de « démise » reprise par M. Lucy et Barbara Cassin.",
      },
      {
        titre: "Ce que parler veut dire : l'économie des échanges linguistiques & La Distinction",
        auteur: "Pierre Bourdieu",
        annee: "1982 (Fayard) / 1979 (Minuit)",
        remarque: "Marché linguistique, formule dictée en cours (Disposition + Capital) × Champ = Habitus [cf. La Distinction p. 112 : [(Habitus)(Capital)] + Champ = Pratique], obsequium, illusio et délégation.",
      },
      {
        titre: "Le Langage, cet inconnu & Dictionnaire encyclopédique des sciences du langage",
        auteur: "Julia Kristeva / Oswald Ducrot & Tzvetan Todorov",
        annee: "1969 / 1972 (Seuil)",
        remarque: "Ouvrages complémentaires présentés en webconférence comme repères généraux et outils terminologiques.",
      },
    ],
  },
  {
    id: "pst108-s8",
    moduleKey: "pst108",
    moduleLabel: "PST108 — Psychologie du langage et clinique du dialogue",
    numeroSeance: 8,
    titre: "Approche Systémique (Palo Alto), Conduite de l'Entretien (Abric / Rogers) & Corrigé AD Miossec-Simonet",
    sousTitre:
      "Méthodologie d'examen (12 + 8 pts), cybernétique & 3 principes systémiques (Bateson, Watzlawick), silences, congruence, trame semi-directive de « grand naïf » et travail sur le travail par le dissensus",
    enseignant: "Mme Véronique MAROT (Cnam)",
    dateSeance: "Samedi 21 novembre 2026 (09h00 – 12h00, Salle 5)",
    format: "presentiel",
    dureeEnregistrement: "2 h 31 min 10 s (220 séquences SRT)",
    resumeExecutif: [
      "Cadrage officiel de l'épreuve (30 premières min) : bloc Marot de 1h00 composé de 2 questions (barème classique 12 + 8 pts, question de cours + question analytique), exigeant de lier systématiquement Concept + Auteur + Texte/Recherche source dans un style rédactionnel très synthétique.",
      "Clinique du parcours Cnam : face aux plaintes sur l'intensité et l'administration (UE non à modularité variable, règles identiques pour tous), Mme Marot rappelle que « le premier outil du clinicien, c'est lui-même » : ces résistances réactualisent notre rapport précoce au savoir/à l'école et se travaillent grâce au collectif de pairs.",
      "École de Palo Alto (Gregory Bateson, Paul Watzlawick — Une logique de la communication) : approche cybernétique, pragmatique et interactionnelle privilégiant le lien sur le seul contenu, dans des systèmes ouverts régis par la Totalité (11 meilleurs joueurs ≠ meilleure équipe), la Rétroaction/Circularité (accélérateur positif vs régulateur négatif / homéostasie) et l'Équifinalité (observer ici et maintenant).",
      "Conduite de l'entretien clinique (Jean-Claude Abric & Carl Rogers, distincte des dispositifs dialogiques sosie/autoconfrontation) : typologie des silences (vide vs plein), vigilance sur l'écran PC/prise de notes/refus d'enregistrement en cabinet de souffrance, distinction empathie vs sympathie et congruence rogérienne (cas SOS Amitié, recours au superviseur comme « chambre d'écho extérieure »).",
      "Entretien semi-directif évolutif en « grand naïf » : trame light (4–5 thèmes sur 45–60 min) réalignant la commande sur la demande réelle (opposée à l'audit RPS fermé), priorité aux questions ouvertes (sauf bascule exceptionnelle d'enquête en cas de violences/devoir d'alerte) et usage ponctuel d'échelles d'attitude (0–10).",
      "Corrigé officiel AD1 & AD2 (Miossec & Simonet, 2019) : dépasser la focalisation risques/DUERP et la logique diagnostic-préconisation par « le travail sur le travail » et l'extérocentration, pour restaurer pouvoir d'agir et reconnaissance via le dissensus et la coopération conflictuelle (« thermodynamique : quand ça frotte, il y a de l'énergie »).",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (épreuve globale 3h00 = 3 × 1h00)",
      session2Date: "Session 2 selon calendrier officiel Cnam",
      duree: "1 heure pour le bloc Mme Marot (au sein des 3 heures PST108)",
      format: "2 questions typiques (barème fréquent 12 + 8 points)",
      optionsAuChoix: [
        "Question 1 (cours / points rapides) : restitution précise et synthétique des définitions, principes et modèles théoriques.",
        "Question 2 (analytique) : appropriation conceptuelle d'une situation ou d'un texte en articulant Concept + Auteur + Recherche source.",
      ],
      recommandationsNotation:
        "Aller droit à l'essentiel dans un temps très ramassé ; graduer son investissement temporel entre questions directes et analytiques ; vérifier auprès du secrétariat/Cnam la pondération exacte des 3 sous-épreuves.",
    },
    consignesOralesProf: [
      {
        titre: "Lecture prioritaire pour jeudi 27 novembre : Livia Scheller (2001)",
        typeTravail: "lecture",
        consigneExacte:
          "Au lieu du texte de Daniel Faïta sur Bakhtine (qui reste une lecture bonus utile), lire impérativement l'article de Livia Scheller (2001), « L'expérience du travail dans le cadre dialogique », afin d'alimenter activement les échanges lors de la séance du 27 novembre.",
        echeance: "Jeudi 27 novembre 2026",
        modaliteRendu: "Préparation de lecture interactive en présentiel",
        recommandationsProf:
          "Permettra d'entrer concrètement dans les dispositifs dialogiques du travail sur les 5 heures restantes du semestre.",
        lienAdId: "marot-scheller-dialogique-2001",
      },
      {
        titre: "Lecture pour jeudi 10 décembre : « L'échange avec un sosie »",
        typeTravail: "lecture",
        consigneExacte:
          "Lire le texte court (~6 pages Word) intitulé « L'échange avec un sosie » portant sur le dispositif d'instruction au sosie (malgré quelques coquilles de recopie, contenu clinique majeur).",
        echeance: "Jeudi 10 décembre 2026",
        modaliteRendu: "Préparation de la dernière séance dialogique (10 décembre)",
        recommandationsProf:
          "Bien distinguer ce que l'on fait avec les dispositifs dialogiques de la psychologie du travail (sosie, autoconfrontation) des techniques générales d'entretien présentées d'après Abric.",
      },
      {
        titre: "Pratique réflexive & usage des retours forum AD",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Consulter les commentaires postés par Mme Marot sur le forum des Activités Distantes (parfois regroupés pour 2–3 auditeurs) et intégrer dès l'AD les corrigés fournis en séance sur Miossec & Simonet (2019).",
        echeance: "Continu avant les examens",
        modaliteRendu: "Réinvestissement méthodologique sur Moodle & copie",
        recommandationsProf:
          "Associer systématiquement chaque idée à son concept, son auteur et l'étude/texte de référence ; maintenir l'entraide entre pairs.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Examen, Stratégie Cnam & Clinique de l'Apprentissage (00:00–00:29)",
        points: [
          {
            titre: "Architecture de la copie Marot (12 + 8 pts) et règle d'or de citation",
            contenu:
              "Mme Marot explicite les attendus de son bloc d'épreuve (1h00 sur les 3h00 de PST108) : 2 questions (souvent notées sur 12 et 8 points), une de restitution rapide de cours et une analytique. Toute idée doit obligatoirement articuler un concept, son auteur et la recherche/texte d'où il provient, dans une écriture ramassée propre aux titres professionnels Cnam.",
            auteurs: ["Mme Véronique Marot"],
            conceptsCles: ["Barème 12 + 8 pts", "Concept + Auteur + Recherche source", "Gestion stratégique du temps"],
          },
          {
            titre: "Plaintes administratives, égalité d'évaluation & posture clinique",
            contenu:
              "À la suite d'échanges francs des auditeurs sur la charge des 3 UE simultanées, la durée réelle du titre RNCP (6–10 ans), l'impossibilité de transférer vers Paris et la communication administrative, Mme Marot rappelle que les règles d'évaluation sont strictement uniformes (« les UE ne sont pas à modularité variable »). Elle invite à lire ces résistances cliniquement : ce « travail d'apprentissage » réactive notre socialisation scolaire précoce — le premier outil du clinicien restant lui-même, soutenu par le collectif de pairs.",
            auteurs: ["Mme Véronique Marot"],
            conceptsCles: ["Le premier outil du clinicien = lui-même", "UE non à modularité variable", "Socialisation scolaire précoce"],
          },
        ],
      },
      {
        numero: "2",
        titre: "École de Palo Alto & Approche Systémique de la Communication (00:29–01:08)",
        points: [
          {
            titre: "Origine cybernétique, pragmatique & systèmes ouverts (Bateson, Watzlawick)",
            contenu:
              "Née en Californie dans les années 1950 sous l'impulsion de la cybernétique (par glissement épistémologique comparable à Clot reprenant Bakhtine), l'école de Palo Alto (Gregory Bateson, « Communication et société » ; Paul Watzlawick, « Une logique de la communication ») fonde une approche pragmatique (« la communication affecte le comportement ») et interactionnelle : l'enjeu est dans le lien plutôt que dans le seul contenu (ex. conjoints en conflit). Un système est défini par une limite méthodologique, des éléments en réseau et un objectif (équipe de football dans un stade, service social sous tutelle municipale, marché ; systèmes fermés quasi absents hors expérience sous dôme).",
            auteurs: ["Gregory Bateson", "Paul Watzlawick", "Yves Clot / Mikhaïl Bakhtine"],
            conceptsCles: ["Pragmatique de la communication", "Approche interactionnelle (le lien)", "Système ouvert vs fermé"],
          },
          {
            titre: "Les 3 principes cardinaux : Totalité, Rétroaction (Homéostasie) & Équifinalité",
            contenu:
              "1) Totalité : modifier un élément affecte tout l'ensemble (remplacer un défenseur par un attaquant, ou un directeur issu du terrain par un gestionnaire dans le social ; Bateson : les 11 meilleurs joueurs ≠ la meilleure équipe). 2) Rétroaction & circularité : sortir du « qui a commencé ? » (professeur qui presse / élève qui lutte) en distinguant rétroaction positive (accélérateur / effet boule de neige de Watzlawick « toujours plus de la même chose », illustré par la récidive pénale) et rétroaction négative (pédale de frein régulatrice maintenant l'homéostasie du système ouvert). 3) Équifinalité : le fonctionnement actuel importe plus que l'histoire passée (mêmes origines → effets divers, et réciproquement) → observer ici et maintenant.",
            auteurs: ["Gregory Bateson", "Paul Watzlawick"],
            conceptsCles: ["Principe de totalité", "Rétroaction positive vs négative", "Homéostasie", "Principe d'équifinalité"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Conduite de l'Entretien Clinique : Silences, Écoute & Congruence (01:14–01:40)",
        points: [
          {
            titre: "Techniques d'entretien (Abric), typologie des silences & matérialité",
            contenu:
              "En distinguant techniques générales d'entretien (Jean-Claude Abric, « Psychologie de la communication », nouv. éd. 2026) et dispositifs dialogiques du travail (sosie, autoconfrontation vus au prochain cours), Mme Marot rappelle que l'entretien non directif pur appartient plutôt au soin psychothérapeutique. Abric distingue silence vide (panne supposée → relance) et silence plein (« faux silence » d'élaboration psychique à respecter jusqu'à ~3 min sans parler par angoisse professionnelle), même si distinguer les deux de l'extérieur reste aléatoire. Attention également à la barrière visuelle d'un écran PC massif, à l'inquiétude générée par un excès de prise de notes et à la proscription de l'enregistrement audio en cabinet de souffrance (autorisé uniquement en recherche/intervention cadrée sans climat de défiance).",
            auteurs: ["Jean-Claude Abric", "Yves Clot (« ça dépend »)"],
            conceptsCles: ["Silence vide vs Silence plein", "Effet-barrière de l'écran", "Cadre déontologique de l'enregistrement"],
          },
          {
            titre: "Régulation non-verbale, Empathie vs Sympathie & Congruence (Carl Rogers)",
            contenu:
              "Illustration par un binôme où le haussement de sourcils / mâchoire tombante d'une auditrice a braqué l'interviewé. En écho au témoignage d'un auditeur bénévole à SOS Amitié, distinction capitale entre sympathie (« mon pauvre, c'est dur ») et empathie, puis présentation de la congruence (Carl Rogers) : nommer avec justesse l'impact d'un propos violent (y compris l'irruption de récits extrêmes comme l'inceste en entretien de travail) pour rester authentique sans se laisser submerger. Savoir écouter les indices sonores (respiration) par téléphone, suspendre ou orienter si nécessaire, puis prendre des notes à chaud et appeler son superviseur (« avoir sa chambre d'écho à l'extérieur de soi »).",
            auteurs: ["Carl Rogers", "SOS Amitié (témoignage auditeur)"],
            conceptsCles: ["Empathie vs Sympathie", "Congruence rogérienne", "Supervision (chambre d'écho extérieure)"],
          },
        ],
      },
      {
        numero: "4",
        titre: "L'Entretien Semi-Directif Évolutif & Corrigé AD Miossec-Simonet (01:40–02:31)",
        points: [
          {
            titre: "Trame light du « grand naïf », questions ouvertes vs enquête d'alerte",
            contenu:
              "L'entretien guidé (semi-directif) est l'outil central de l'intervenant : fichier discret de 4–5 grandes thématiques max pour 45–60 min, amorcé par poste/ancienneté/quotidien pour sécuriser avant le vécu. Contrairement à l'audit RPS fermé (où l'on sait d'avance ce que l'on cherche), le clinicien se poste en « grand naïf », laisse le sujet suivre son fil et fait évoluer sa trame (rayer en barré après 5–6 entretiens) pour réaligner la commande à la demande réelle. Privilégier les questions ouvertes (subjectivité, surprise) et échelles d'attitude (0–10), tout en basculant exceptionnellement vers un questionnement d'enquête factuel lorsqu'un devoir d'alerte s'impose (harcèlement, violences verbales répétées). Mention de l'entretien focalisé (Abric, pp. 42–58, non utilisé).",
            auteurs: ["Jean-Claude Abric", "Mme Véronique Marot"],
            conceptsCles: ["Trame light (4–5 thèmes)", "Posture du grand naïf vs Audit RPS", "Réalignement Commande/Demande", "Devoir d'alerte / Enquête"],
          },
          {
            titre: "Correction AD1 & AD2 (Miossec & Simonet, 2019) : Extérocentration & Dissensus",
            contenu:
              "Les 3 limites des démarches RPS classiques (AD1) : 1) focalisation risques (DUERP) au lieu de partir des ressources psychosociales de l'activité qui révèlent les risques cachés ; 2) logique diagnostic → préconisations généraliste remplacée par « l'expérience du travail sur le travail » ; 3) coupure artificielle entre acteurs santé (RH/SST) et travailleurs (expertise interne). Le psychologue organise un dialogue improbable et favorise l'extérocentration (suspendre son point de vue pour observer l'activité de l'extérieur). Sur la santé (AD2) : ressources collectives → fin de l'isolement et des arrangements transgressifs solitaires → pouvoir d'agir → transformation de l'organisation et reconnaissance (effets parfois différés). Clôture majeure : le dialogue n'est ni poli ni consensuel — on institue du dissensus et de la coopération conflictuelle (Clot) dans un cadre outillé (sans Far West / OK Corral) selon la loi de la thermodynamique (« quand ça frotte, il y a de l'énergie »).",
            auteurs: ["Yvon Miossec & Pascal Simonet (2019)", "Yves Clot"],
            conceptsCles: ["Travail sur le travail", "DUERP vs Ressources psychosociales", "Extérocentration", "Dissensus & Coopération conflictuelle"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Palo Alto, Entretien Clinique & Dispositif Dialogique — Tableau Comparatif",
        description: "Distinctions conceptuelles attendues dans la copie 1h00 de Mme Véronique Marot",
        colonnes: ["Concept / Polarité", "Pôle A (Classique / Risque)", "Pôle B (Systémique Palo Alto / Clinique Cnam)"],
        lignes: [
          {
            axe: "Modèle de communication",
            valeurs: [
              "Modèle linéaire (Shannon) : causalité simple et analyse centrée sur le seul contenu émis.",
              "Modèle systémique (Bateson, Watzlawick) : pragmatique, circulaire et centré sur la relation ici et maintenant.",
            ],
          },
          {
            axe: "Rétroaction (Feedback)",
            valeurs: [
              "Positive (≠ bonne) : effet boule de neige aggravant le symptôme (« toujours plus de la même chose »).",
              "Négative (≠ mauvaise) : pédale de frein régulatrice restauratrice d'équilibre (homéostasie).",
            ],
          },
          {
            axe: "Silence en entretien (Abric)",
            valeurs: [
              "Silence vide : arrêt supposé de la pensée appelant relance prudentielle.",
              "Silence plein (« faux silence ») : intense élaboration psychique intérieure à respecter (jusqu'à ~3 min).",
            ],
          },
          {
            axe: "Posture affective (Rogers)",
            valeurs: [
              "Sympathie (« oh mon pauvre ») ou affect débordant visible sur le visage (effet défensif).",
              "Empathie contenue + Congruence + appel à son superviseur (« chambre d'écho extérieure »).",
            ],
          },
          {
            axe: "Investigation & AD Miossec",
            valeurs: [
              "Audit RPS fermé (DUERP) ou catharsis consensuelle stérile (« vider son sac »).",
              "Semi-directif « grand naïf » évolutif + travail sur le travail par extérocentration et dissensus outillé.",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Contresens sur rétroaction « positive » vs « négative »",
        erreurCourante:
          "Interpréter la rétroaction positive comme « bénéfique/constructive » et la rétroaction négative comme « néfaste/conflictuelle ».",
        rectificationAttendue:
          "En systémique (Palo Alto), « positif » signifie accélération / escalade boule de neige d'un phénomène, tandis que « négatif » désigne le mécanisme de freinage et de régulation assurant l'homéostasie du système ouvert.",
        contexte: "PST108 Cours 8 — École de Palo Alto (Bateson & Watzlawick)",
      },
      {
        titre: "Réduire l'intervention dialogique à un moment consensuel de « libération de la parole »",
        erreurCourante:
          "Écrire que le psychologue crée un espace bienveillant pour apaiser tout conflit et obtenir un consensus rapide.",
        rectificationAttendue:
          "D'après Miossec & Simonet (2019) et Clot, le dispositif vise au contraire l'extérocentration et le dissensus (coopération conflictuelle) en confrontant les critères de métier dans un cadre outillé et sécure (« thermodynamique : quand ça frotte, il y a de l'énergie »).",
        contexte: "PST108 Cours 8 — Corrigé AD1 & AD2 (Miossec & Simonet)",
      },
      {
        titre: "Confondre techniques d'entretien et dispositifs dialogiques du travail",
        erreurCourante:
          "Mélanger l'entretien semi-directif d'Abric / Rogers et les dispositifs dialogiques spécifiques comme l'instruction au sosie ou l'autoconfrontation.",
        rectificationAttendue:
          "Abric formalise les techniques transversales d'entretien clinique (silences, non-verbal, trame souple en « grand naïf »), alors que l'instruction au sosie et l'autoconfrontation (Scheller, Clot) sont des dispositifs dialogiques propres à l'analyse du travail.",
        contexte: "PST108 Cours 8 — Articulation méthodologique Marot",
      },
      {
        titre: "Citer des idées sans auteur ni texte en copie (Bloc Marot 12 + 8)",
        erreurCourante:
          "Rédiger des réponses générales sur la communication ou l'écoute sans ancrage bibliographique précis.",
        rectificationAttendue:
          "Respecter impérativement la triade attendue par Mme Marot : relier chaque idée à un Concept précis, à son Auteur et à la Recherche/Texte source (ex. Bateson, Watzlawick, Abric, Rogers, Miossec & Simonet 2019).",
        contexte: "PST108 Cours 8 — Cadrage examen 1h00",
      },
    ],
    transcriptionIntegraleVerbatim: `— TRANSCRIPTION SÉLECTIVE DES VERBATIMS D'OR & REPÈRES HORODATÉS (2h31m10s · 220 séquences SRT) —

[1. Méthode d'Examen & Clinique de l'Apprentissage (30 premières minutes)]
[00:01:40] MME MAROT : « En rebondissant sur la copie d'un auditeur : il y a deux questions, souvent 12 et 8, une plutôt de cours pour gagner des points facilement et une plus analytique. Quand vous posez une idée, on l'associe obligatoirement à un concept, son auteur et le texte ou la recherche d'où il est issu. »
[00:22:30] MME MAROT : « On est des cliniciens, et le premier outil du clinicien, c'est lui-même. Tout ce que vous expérimentez dans vos frustrations ou vos résistances face aux aléas raconte quelque chose de votre rapport au travail d'apprentissage et à l'école : les résistances deviennent de la ressource quand on les saisit. Les UE ne sont pas à modularité variable ; soyez des ressources les uns pour les autres. »

[2. Palo Alto, Bateson, Watzlawick & les 3 Principes Systémiques]
[00:51:07] MME MAROT : « Comme le dit Bateson, si on mettait les 11 meilleurs joueurs de foot du monde ensemble, ça ne ferait pas la meilleure équipe : c'est le principe de totalité — changer un directeur issu du terrain par un profil gestionnaire affecte tout le système. »
[01:02:04] MME MAROT : « Attention, en systémique, rétroaction positive et négative n'ont pas de sens moral ! La positive, c'est l'accélérateur, l'effet boule de neige ("toujours plus de la même chose donne le même résultat", comme la réponse carcérale pure). La rétroaction négative, c'est la pédale de frein, la régulation qui assure l'homéostasie du système ouvert. »
[01:05:42] MME MAROT : « Selon le principe d'équifinalité, l'histoire d'un système compte moins que son fonctionnement actuel : les mêmes causes peuvent produire des effets différents, et des origines différentes peuvent produire les mêmes conséquences. Donc l'observation ici et maintenant reste la meilleure voie. »

[3. Entretien Clinique : Silences, Écran, Congruence & Supervision]
[01:19:26] MME MAROT : « Abric distingue les silences vides (arrêt de réflexion) et les silences pleins (faux silences où l'autre élabore intérieurement). Moi je suis critique : je ne sais pas deviner de l'extérieur si un silence est vide ; donc laissez jusqu'à 2 ou 3 minutes d'espace avant de relancer. Et attention aux écrans d'ordinateur massifs qui font barrière ! En cabinet de souffrance au travail, je n'enregistre jamais ; comme disait Yves Clot, un bon professionnel répond toujours : ça dépend. »
[01:35:05] AUDITEUR (SOS AMITIÉ) & MME MAROT : « Sur la congruence de Carl Rogers, plutôt que la sympathie ("oh mon pauvre"), nommer avec justesse quand un récit extrême nous heurte ("ce que vous me dites est violent") maintient un lien authentique. » — « Et à chaud derrière toute situation difficile, prenez des notes et appelez votre superviseur pour avoir votre chambre d'écho à l'extérieur de vous et pas à l'intérieur de vous. On n'apprend qu'en se plantant. »

[4. Semi-Directif « Grand Naïf » & Corrigé AD Miossec-Simonet]
[01:46:40] MME MAROT : « Dans l'entretien semi-directif, j'ai ma trame light à 4–5 thèmes max sur l'écran, et j'arrive en posture de grand naïf : je raye en barré les questions qui ne sortent jamais et je fais évoluer la trame pour réaligner la commande avec la demande réelle — à l'opposé d'un audit RPS fermé. Mais s'il y a violences verbales répétées ou harcèlement, notre devoir d'alerte nous oblige parfois à basculer temporairement sur un questionnement d'enquête factuel. »
[02:29:40] MME MAROT : « Pour clôturer l'AD de Miossec & Simonet : le dialogue n'est pas un moment poli et consensuel ! On ne cherche pas du consensus mais du dissensus, de la coopération conflictuelle, tout en maintenant un cadre outillé pour que ça ne devienne pas OK Corral. C'est la thermodynamique : quand ça frotte, il y a de l'énergie. Ce n'est pas parce que tout le monde est d'accord qu'on fait du bon travail — au contraire. »`,
    bibliographieCitee: [
      {
        titre: "Synthèse Académique Bento — PST108 Cours 8 (Mme Véronique Marot)",
        auteur: "Mme Véronique Marot",
        annee: "21 novembre 2026",
        remarque:
          "Document PDF Bento complet en 4 pages : cadrage examen (12 + 8 pts), Palo Alto (totalité, rétroaction +/-, homéostasie, équifinalité), entretien (Abric, Rogers, semi-directif) et corrigé AD1/AD2 Miossec & Simonet.",
        url: "/docs/PST108_Cours_8_Synthese_Marot.pdf",
      },
      {
        titre: "Transcription Intégrale Nettoyée & Horodatée — PST108 Cours 8 (Mme Véronique Marot)",
        auteur: "Mme Véronique Marot",
        annee: "21 novembre 2026",
        remarque:
          "Retranscription intégrale épurée des 220 séquences SRT (2h31m10s, 16 pages) structurée en 6 chapitres chronologiques.",
        url: "/docs/PST108_Cours_8_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Une logique de la communication & Communication et société",
        auteur: "Paul Watzlawick / Gregory Bateson",
        annee: "1967 / 1972 (Seuil)",
        remarque:
          "Fondements cybernétiques et pragmatiques de l'école de Palo Alto : « On ne peut pas ne pas communiquer », totalité, rétroaction et équifinalité.",
      },
      {
        titre: "Psychologie de la communication : théories et méthodes",
        auteur: "Jean-Claude Abric",
        annee: "1999 / nouv. éd. 2026 (Armand Colin)",
        remarque:
          "Support de référence pour le cours sur les techniques d'entretien : silences (vide vs plein), posture d'écoute, entretien semi-directif et entretien focalisé (pp. 42–58).",
      },
      {
        titre: "« Le travail sur le travail » pour agir en santé au travail (Corrigé AD1 & AD2)",
        auteur: "Yvon Miossec & Pascal Simonet",
        annee: "2019",
        remarque:
          "Texte support des AD1 et AD2 : 3 limites RPS classiques, extérocentration, effets sur la santé et coopération conflictuelle.",
      },
      {
        titre: "L'expérience du travail dans le cadre dialogique (Lecture prescrite pour le 27/11) & L'échange avec un sosie (10/12)",
        auteur: "Livia Scheller (2001) & Collectif Cnam",
        annee: "2001",
        remarque:
          "Prochaines lectures obligatoires désignées par Mme Marot pour préparer les 5 dernières heures consacrées aux dispositifs dialogiques (remplace prioritairement Faïta/Bakhtine).",
      },
    ],
  },
];
