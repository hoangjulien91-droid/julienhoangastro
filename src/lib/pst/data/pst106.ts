/**
 * Bases de données pour le module PST106 (Clinique de l'activité et psychologie du travail).
 * Extrait automatiquement de src/pages/pst106.astro.
 */

export const A = {
  histoire: "Histoire",
  wisner: "Ergonomie (Wisner)",
  clot: "Activité (Clot)",
  dejours: "Psychodynamique (Dejours)",
  methode: "Intervention",
  comparer: "Comparateur",
};

export const CARTES = [
  [
    "histoire",
    "Qu'est-ce que la psychotechnique&nbsp;?",
    "Le courant historique (Lahy, Toulouse) appliquant la psychologie expérimentale au travail, centré sur la mesure scientifique des aptitudes pour la sélection professionnelle.",
    "coeur",
    "<b>Mécanisme</b>&nbsp;: Utilisation de tests psychomoteurs pour associer le «&nbsp;bon travailleur au bon poste&nbsp;». Approche positiviste qui cherche à optimiser le rendement. <b>Limites</b>&nbsp;: Ignore la subjectivité, la souffrance et la variabilité de l\'activité réelle.",
  ],
  [
    "histoire",
    "Quelle est la critique du Taylorisme par Wallon et Lahy&nbsp;?",
    "Ils dénoncent l\'usure prématurée de l\'organisme et la mutilation de la subjectivité causées par la parcellisation des tâches.",
    "coeur",
    "Lahy montre que le travail à la chaîne détruit les régulations physiologiques naturelles et empêche le travailleur d\'aménager son geste (perte de contrôle).",
  ],
  [
    "histoire",
    "Qui est Hugo Münsterberg&nbsp;?",
    "Psychologue germano-américain (1863-1916), pionnier de la <b>psychologie industrielle</b> et de la psychotechnique, auteur de «&nbsp;Psychology and Industrial Efficiency&nbsp;» (1913).",
    "bonus",
  ],
  [
    "histoire",
    "Du taylorisme au toyotisme&nbsp;: quelle évolution des modèles productifs&nbsp;?",
    "Le <b>taylorisme</b> (OST&nbsp;: séparer conception et exécution) cède la place au <b>toyotisme</b> (flux tendu, juste-à-temps, polyvalence, qualité totale), puis à la <b>digitalisation</b> du travail.",
    "coeur",
    "<b>Effet paradoxal</b>&nbsp;: le toyotisme et le lean management responsabilisent le salarié tout en intensifiant le travail (autonomie contrôlée), déplaçant la contrainte vers la subjectivité.",
  ],
  [
    "histoire",
    "Qu'est-ce que l'intensification du travail&nbsp;?",
    "La densification du travail (lean, reporting, polyvalence, urgence permanente) qui multiplie les contraintes simultanées et les injonctions contradictoires&nbsp;; elle est au cœur des risques psychosociaux contemporains.",
    "coeur",
    "La <b>digitalisation</b> (plateformes, contrôle algorithmique, télétravail) accentue le mouvement&nbsp;: porosité des temps de vie, traçabilité et reporting permanents.",
  ],
  [
    "wisner",
    "Quelle est la distinction clé de l'Ergonomie de l'activité (Wisner)&nbsp;?",
    "La distinction entre la <b>tâche prescrite</b> (le travail conçu, les consignes et objectifs officiels) et l\'<b>activité réelle</b> (le travail vécu, ce que le travailleur déploie pour atteindre l\'objectif face aux aléas).",
    "coeur",
    "<b>Pourquoi cet écart&nbsp;?</b>&nbsp;: La prescription est toujours insuffisante ou contradictoire&nbsp;; le réel impose des imprévus (pannes, fatigue, météo, collègues) nécessitant des ajustements permanents du travailleur.",
  ],
  [
    "clot",
    "Qu'est-ce que la Clinique de l'activité (Clot)&nbsp;?",
    "Un courant issu de la psychologie du travail qui vise à restaurer le pouvoir d\'agir des travailleurs en relançant le développement de leur métier et du dialogue professionnel.",
    "coeur",
    "Elle s\'oppose à la fois à l\'approche hygiéniste (qui traite le travail comme un risque) et au positivisme en s\'intéressant à la subjectivité créatrice du travailleur.",
  ],
  [
    "clot",
    "Activité réalisée vs Réel de l'activité&nbsp;?",
    "L\'<b>activité réalisée</b> est ce qui est effectivement fait et observable. Le <b>réel de l\'activité</b> englobe tout ce qui ne s\'est pas fait&nbsp;: le possible, l\'empêché, le suspendu, le conflictuel.",
    "coeur",
    "<b>Formule clé</b>&nbsp;: Le réel de l\'activité est infiniment plus vaste que ce qui s\'observe directement. Les désirs contrariés et les gestes suspendus pèsent sur la santé mentale du travailleur.",
  ],
  [
    "clot",
    "Genre professionnel vs Style professionnel&nbsp;?",
    "Le <b>genre</b> est la mémoire collective du métier (les règles officieuses, le «&nbsp;comment on fait ici&nbsp;»). Le <b>style</b> est l\'appropriation singulière et créative de ce genre par le travailleur.",
    "coeur",
    "<b>Dynamique</b>&nbsp;: Le style d\'un travailleur nourrit en retour le genre collectif si la discussion professionnelle est vivante. Si le genre se fige, le métier s\'asphyxie et le style devient impossible.",
  ],
  [
    "dejours",
    "Quel est le concept central de la Psychodynamique du travail (Dejours)&nbsp;?",
    "Le travail comme épreuve du réel et lieu de construction de la santé. Elle analyse comment le sujet négocie la souffrance générée par les contraintes organisationnelles.",
    "coeur",
    "La souffrance est inévitable car le travail résiste à la prescription&nbsp;; elle peut être transformée en plaisir par la reconnaissance ou déboucher sur la maladie si les défenses s\'effondrent.",
  ],
  [
    "dejours",
    "Qu'est-ce qu'une idéologie défensive collective&nbsp;?",
    "Un ensemble de règles et de croyances construites collectivement par les travailleurs pour s\'insensibiliser au danger ou à la souffrance de leur travail.",
    "coeur",
    "<b>Exemple</b>&nbsp;: Le déni du danger chez les ouvriers du bâtiment (bravade, refus des EPI) pour pouvoir continuer à travailler sans angoisse permanente. Ces défenses coupent cependant le travailleur de sa propre perception du risque.",
  ],
  [
    "methode",
    "Qu'est-ce que la méthode d'autoconfrontation simple&nbsp;?",
    "Filmer un professionnel à son poste, puis lui projeter la vidéo en tête-à-tête avec le chercheur pour qu\'il commente et explicite son activité.",
    "coeur",
    "Le chercheur n\'est pas un expert qui juge, mais un médiateur. L\'image sert de support pour que le travailleur découvre des aspects insoupçonnés de son propre geste.",
  ],
  [
    "methode",
    "Qu'est-ce que l'autoconfrontation croisée&nbsp;?",
    "Présenter la vidéo de l\'activité d\'un travailleur à un de ses collègues (pair), en présence de l\'auteur, pour susciter un débat professionnel sur leurs manières de faire.",
    "coeur",
    "Le but est de faire apparaître la diversité des styles professionnels au sein d\'un même genre, relançant ainsi le dialogue et le développement du métier.",
  ],
  [
    "methode",
    "Qu'est-ce que l'instruction au sosie&nbsp;?",
    "Méthode héritée d\'Ivar Oddone&nbsp;: le travailleur instruit un «&nbsp;sosie&nbsp;» (le chercheur) censé le remplacer à l\'identique, en explicitant tout ce qu\'il faut faire et dire pour que la substitution passe inaperçue.",
    "coeur",
    "<b>Consigne type</b>&nbsp;: «&nbsp;Suppose que je sois ton sosie et que je doive te remplacer demain&nbsp;: que dois-je faire pour que personne ne s\'aperçoive de l\'échange&nbsp;?&nbsp;» La méthode oblige à verbaliser l\'implicite du métier (le genre) et relance le pouvoir d\'agir.",
  ],
  [
    "methode",
    "Quelles sont les conditions déontologiques de l'intervention&nbsp;?",
    "<b>Volontariat</b> et consentement des participants, <b>confidentialité</b>, restitution au collectif, et surtout <b>non-utilisation</b> du dispositif à des fins d\'évaluation ou de sanction.",
    "coeur",
    "L\'intervenant n\'est pas un expert qui juge&nbsp;: il garantit un cadre où le travail peut être discuté sans risque pour les personnes. Détourner la vidéo pour «&nbsp;fliquer&nbsp;» trahirait la méthode.",
  ],
  [
    "histoire",
    "Qu'est-ce que le destin de la psychotechnique&nbsp;?",
    "Elle s\'est heurtée à ses propres limites méthodologiques (Taylorisme) et à l\'essor des approches cliniques et ergonomiques privilégiant le sens de l\'activité.",
    "bonus",
  ],
  [
    "wisner",
    "Qu'est-ce que l'analyse ergonomique du travail&nbsp;?",
    "L\'étude systématique de la situation de travail (outils, ambiance physique, cadences, consignes) pour repérer les déterminants de la charge de travail et proposer des transformations.",
    "bonus",
  ],
  [
    "clot",
    "Qu'est-ce que le métier comme instance de développement&nbsp;?",
    "Pour Clot, le métier est une ressource psychologique essentielle qui s\'articule en 4 dimensions&nbsp;: personnelle, interpersonnelle, transpersonnelle (le genre) et impersonnelle (la tâche).",
    "coeur",
  ],
  [
    "dejours",
    "Quel est le rôle du jugement de reconnaissance en psychodynamique&nbsp;?",
    "Il permet de transformer la souffrance en plaisir. Il comprend le <b>jugement d\'utilité</b> (par la hiérarchie/clients) et le <b>jugement de beauté</b> (par les pairs).",
    "coeur",
  ],
  [
    "dejours",
    "Intelligence pratique ou mêtis&nbsp;?",
    "L\'intelligence astucieuse, inventive et rusée déployée par le travailleur pour surmonter les défaillances de l\'organisation prescrite.",
    "coeur",
  ],
  [
    "methode",
    "Quel est le rôle du chercheur-intervenant en Clinique de l'activité&nbsp;?",
    "Il n\'apporte pas de solutions toutes faites&nbsp;; il crée un cadre dialogique permettant aux travailleurs d\'analyser eux-mêmes leur activité pour développer leur pouvoir d\'agir.",
    "coeur",
  ],
  [
    "clot",
    "Qu'est-ce que l'activité empêchée&nbsp;?",
    "Une situation où le travailleur ne peut pas accomplir son travail avec la qualité requise, ce qui ampute son pouvoir d\'agir et génère de la souffrance.",
    "coeur",
  ],
  [
    "histoire",
    "Qui est Jean-Maurice Lahy&nbsp;?",
    "Un pionnier de la psychologie du travail en France, créateur de la psychotechnique appliquée aux conducteurs de tramway (les traminots).",
    "bonus",
  ],
  [
    "wisner",
    "Qui est Alain Wisner&nbsp;?",
    "Le père fondateur de l\'ergonomie de l\'activité en France, professeur au CNAM, qui a promu l\'analyse de terrain contre les approches purement de laboratoire.",
    "bonus",
  ],
  [
    "dejours",
    "Qu'est-ce que la distinction souffrance créatrice vs souffrance pathologique&nbsp;?",
    "La souffrance créatrice permet de développer l\'identité et l\'intelligence&nbsp;; la souffrance pathologique survient lorsque l\'organisation bloque toute possibilité de négociation ou de défense.",
    "coeur",
  ],
  [
    "clot",
    "Quelles sont les 4 instances du métier selon Clot&nbsp;?",
    "Le métier a 4 dimensions&nbsp;: <b>personnelle</b> (le sujet), <b>interpersonnelle</b> (le destinataire, autrui), <b>transpersonnelle</b> (le genre, l'histoire collective) et <b>impersonnelle</b> (la tâche prescrite).",
    "coeur",
    "Le développement du métier suppose la circulation entre ces 4 instances&nbsp;; leur cloisonnement appauvrit le pouvoir d'agir.",
  ],
  [
    "clot",
    "Pourquoi l'activité est-elle « triplement dirigée »&nbsp;?",
    "Toute activité est dirigée à la fois vers l'<b>objet</b> de la tâche, vers les <b>autres</b> (les destinataires) et vers le <b>sujet</b> lui-même&nbsp;: travailler, c'est aussi se transformer.",
    "coeur",
  ],
  [
    "clot",
    "Quelles sont les « destinées » du réel de l'activité&nbsp;?",
    "Au-delà de l'activité <b>réalisée</b>, le réel comprend l'activité <b>contrariée</b>, <b>empêchée</b>, <b>suspendue</b> et la <b>contre-activité</b>&nbsp;: tout ce qui aurait pu se faire mais ne s'est pas fait.",
    "coeur",
  ],
  [
    "clot",
    "Que désignent le « sens » et l'« efficience » de l'activité&nbsp;?",
    "Deux directions&nbsp;: le <b>sens</b> rapporte l'activité aux mobiles du sujet (Léontiev)&nbsp;; l'<b>efficience</b> la rapporte aux moyens et aux opérations. La santé suppose leur articulation.",
    "coeur",
  ],
  [
    "wisner",
    "Qu'est-ce qu'une catachrèse (Pierre Rabardel)&nbsp;?",
    "Le détournement d'un instrument de son usage prescrit (ex. un tournevis comme levier). Ce n'est <b>pas une erreur</b>&nbsp;: c'est la preuve clinique que le travailleur déborde le prescrit pour atteindre son but et développer son activité.",
    "bonus",
  ],
  [
    "clot",
    "Pourquoi Clot affirme-t-il que « le développement, c'est la santé »&nbsp;?",
    "La santé n'est pas un état mais une <b>capacité de développement</b>&nbsp;: pouvoir agir sur son milieu et sur soi. L'activité empêchée, en bloquant ce développement, atteint la santé.",
    "coeur",
  ],
  [
    "clot",
    "Qu'est-ce qu'un « conflit de critères » dans le travail&nbsp;?",
    "Quand le travailleur ne peut satisfaire en même temps des exigences contradictoires (qualité vs délai, sécurité vs rendement). Devoir trancher seul, sans débat collectif, use et empêche le travail bien fait.",
    "coeur",
  ],
  [
    "comparer",
    "Qu'est-ce que la zone proximale de développement (Vygotski)&nbsp;?",
    "L'écart entre ce qu'un sujet peut faire seul et ce qu'il peut faire avec autrui ou des instruments. La clinique de l'activité ouvre cette zone pour développer le pouvoir d'agir.",
    "bonus",
  ],
  [
    "comparer",
    "Comment Léontiev hiérarchise-t-il l'activité&nbsp;?",
    "Trois niveaux emboîtés&nbsp;: l'<b>activité</b> répond à un <b>mobile</b>, l'<b>action</b> à un <b>but</b> conscient, l'<b>opération</b> aux <b>conditions</b> concrètes. Un même geste change de niveau selon le contexte.",
    "coeur",
  ],
  [
    "comparer",
    "Qu'apporte Bakhtine à la clinique de l'activité&nbsp;?",
    "Le <b>dialogisme</b>&nbsp;: tout énoncé — et toute activité — est <b>adressé</b> et répond à d'autres. Le travail est une réponse à autrui, d'où l'usage du dialogue (autoconfrontation) pour le développer.",
    "bonus",
  ],
  [
    "wisner",
    "Distinguez « contrainte » et « astreinte » en ergonomie.",
    "La <b>contrainte</b> est ce que la situation impose (cadence, bruit, posture)&nbsp;; l'<b>astreinte</b> est le coût que cela représente pour l'organisme. À contrainte égale, l'astreinte varie selon les personnes.",
    "coeur",
  ],
  [
    "wisner",
    "Qu'est-ce que la « régulation » de l'activité (ergonomie)&nbsp;?",
    "L'ajustement permanent par lequel l'opérateur arbitre entre les exigences de production et la préservation de sa propre santé, face à la variabilité du réel.",
    "coeur",
  ],
  [
    "wisner",
    "Quelle distinction Leplat ajoute-t-il à la notion de tâche&nbsp;?",
    "Tâche <b>prescrite</b>, tâche <b>redéfinie</b> par l'opérateur (ce qu'il se fixe vraiment) et tâche <b>effective</b> (réalisée). L'écart prescrit/redéfini éclaire l'activité réelle.",
    "bonus",
  ],
  [
    "dejours",
    "Qu'est-ce que le « réel du travail » chez Dejours&nbsp;?",
    "Ce qui se fait connaître au sujet par sa <b>résistance</b> au savoir-faire et à la technique&nbsp;: l'inattendu, l'échec. Le réel se manifeste d'abord <b>affectivement</b>, comme épreuve.",
    "coeur",
  ],
  [
    "dejours",
    "Pourquoi « faire du zèle » est-il nécessaire au travail&nbsp;?",
    "Parce que l'application stricte des consignes (la « grève du zèle ») bloque la production. Travailler exige de combler les failles du prescrit par une <b>mobilisation subjective</b> et de l'intelligence pratique.",
    "coeur",
  ],
  [
    "dejours",
    "Qu'entend Dejours par « centralité du travail »&nbsp;?",
    "Le travail occupe une place centrale dans la construction de la <b>santé mentale</b>, de l'<b>identité</b> et du rapport aux autres&nbsp;: il n'est jamais neutre, il fait ou défait le sujet.",
    "coeur",
  ],
  [
    "dejours",
    "À quoi sert l'« espace de discussion » (délibération)&nbsp;?",
    "Un cadre collectif où se débattent les manières de bien faire et se construisent des règles communes&nbsp;; il fonde la reconnaissance et la coopération. Son absence isole le sujet face au réel.",
    "coeur",
  ],
  [
    "histoire",
    "Quel rôle ont joué Suzanne Pacaud et Jean-Marie Ombredane&nbsp;?",
    "<b>Pacaud</b> prolonge la psychotechnique (sélection, aptitudes)&nbsp;; <b>Ombredane</b> (avec Faverge, 1955) fonde l'<b>analyse du travail</b>, faisant basculer la discipline de la mesure de l'individu à l'étude de l'activité.",
    "bonus",
  ],
  [
    "methode",
    "Qu'est-ce que la « controverse professionnelle »&nbsp;?",
    "Le débat — parfois le désaccord — entre pairs sur les critères du « beau travail ». L'autoconfrontation croisée la ravive&nbsp;: c'est le moteur du développement du genre et du métier.",
    "coeur",
  ],
  [
    "comparer",
    "Qu'apporte Canguilhem à la conception de la santé&nbsp;?",
    "La santé est la <b>normativité</b>&nbsp;: la capacité d'instituer de nouvelles normes face au milieu, et pas seulement de s'y conformer. Être malade, c'est être réduit à une seule norme de vie.",
    "bonus",
  ],
  [
    "clot",
    "Quel est le paradigme central de la clinique de l'activité&nbsp;?",
    "Le triptyque <b>Développement → Pouvoir d'agir → Santé</b>. La santé n'est ni l'absence de maladie ni l'adaptation au stress, mais la capacité à transformer son milieu pour y vivre de nouvelles expériences.",
    "coeur",
    "C'est le fil rouge de toute analyse de cas&nbsp;: quand l'activité ne se développe plus, le pouvoir d'agir s'ampute et la santé se dégrade.",
  ],
  [
    "methode",
    "Quel est le rôle de Daniel Faïta&nbsp;?",
    "Co-théoricien de la clinique de l'activité avec Clot&nbsp;: il a développé la dimension <b>dialogique</b> (héritée de Bakhtine) et la méthodologie de l'<b>autoconfrontation</b> (simple et croisée).",
    "bonus",
  ],
  [
    "clot",
    "Quelle est la distinction entre « équipe » et « collectif » (CRTD)&nbsp;?",
    "L'<b>équipe</b> est une unité administrative (les gens qui travaillent ensemble). Le <b>collectif</b> est un <b>instrument psychologique</b>&nbsp;: l'histoire du métier, ses règles et ses controverses, qui permet de penser et d'agir même seul.",
    "coeur",
    "On peut être en équipe sans collectif&nbsp;; c'est la destruction des collectifs qui laisse l'individu nu face à l'organisation.",
  ],
  [
    "clot",
    "Conflit interpersonnel ou conflit de métier&nbsp;: lequel est une ressource&nbsp;?",
    "Le <b>conflit interpersonnel</b> (ego, relations) est une <b>impasse</b>. Le <b>conflit de métier</b> — la controverse sur ce qu'est le « bon travail » — est au contraire la <b>ressource suprême</b> du développement.",
    "coeur",
  ],
  [
    "clot",
    "Que signifie «&nbsp;le réalisé n'a pas le monopole du réel&nbsp;»&nbsp;?",
    "Le <b>réel de l'activité</b> déborde l'activité réalisée&nbsp;: il inclut ce qui ne se fait pas, ce qu'on aurait voulu faire, ce qu'on fait pour ne pas faire le prescrit, et les activités suspendues, inhibées ou ravalées.",
    "coeur",
    "Conséquence clinique&nbsp;: on n'analyse jamais seulement l'observable. L'autoconfrontation vise précisément à faire surgir cette épaisseur invisible du réel.",
  ],
  [
    "clot",
    "Pourquoi l'activité empêchée est-elle le «&nbsp;berceau de la souffrance&nbsp;»&nbsp;?",
    "Parce que l'activité contrariée par l'organisation est <b>amputée</b>&nbsp;: quand le sujet ne peut plus réaliser un travail qu'il juge de qualité, cette amputation altère sa santé.",
    "coeur",
    "C'est le lien direct activité → santé chez Clot&nbsp;: ce n'est pas la charge en soi, mais l'empêchement de bien faire qui rend malade.",
  ],
  [
    "clot",
    "Qu'est-ce que la Métis dans le rapport genre/style&nbsp;?",
    "L'<b>intelligence rusée, ingénieuse et corporelle</b> mobilisée par le style pour métamorphoser le genre en cours d'action, plutôt que de simplement l'appliquer.",
    "coeur",
    "Le style est une «&nbsp;métamorphose du genre&nbsp;»&nbsp;: il s'affranchit du collectif en le développant, non en le niant.",
  ],
  [
    "clot",
    "Genre professionnel&nbsp;: pourquoi parler de «&nbsp;mémoire pour prédire&nbsp;»&nbsp;?",
    "Le genre est un stock de «&nbsp;mots de passe&nbsp;» et de gestes convenus qui <b>économisent l'action</b> et servent de <b>diapason</b> pour s'accorder avec ses pairs sans tout se dire.",
    "coeur",
    "Sans recréation stylistique, cette mémoire se sclérose en idéologie défensive collective (nécrose du genre).",
  ],
  [
    "clot",
    "Que recouvre l'«&nbsp;activité déontique&nbsp;» d'un collectif&nbsp;?",
    "La <b>capacité d'un collectif à produire ses propres règles d'action</b> sur le «&nbsp;travail bien fait&nbsp;», au-delà des règles prescrites par l'organisation.",
    "bonus",
    "La dispute professionnelle la réactive en organisant un désaccord réglé sur les critères de qualité.",
  ],
  [
    "clot",
    "Qu'est-ce que la «&nbsp;migration fonctionnelle&nbsp;»&nbsp;?",
    "Le processus par lequel une expérience passée <b>change de statut</b> pour devenir un <b>instrument d'action future</b>&nbsp;: l'objet de pensée devient moyen d'agir.",
    "bonus",
    "L'autoconfrontation la provoque&nbsp;: le film de l'activité, d'abord regardé, devient ressource pour agir autrement.",
  ],
  [
    "histoire",
    "Qui inspire la «&nbsp;clinique du sujet debout&nbsp;»&nbsp;?",
    "<b>François Tosquelles</b> (psychothérapie institutionnelle)&nbsp;: même contraint par l'institution, le sujet garde son initiative et sa capacité d'affecter le monde. Il faut soigner le milieu, pas seulement l'individu.",
    "bonus",
    "Filiation importante pour penser le cadre institutionnel de l'intervention clinique en clinique de l'activité.",
  ],
  [
    "methode",
    "Qu'est-ce que la méthode de l'objet technique (MOT)&nbsp;?",
    "Une méthode indirecte où un <b>objet technique</b> du quotidien sert de <b>déclencheur de parole</b>&nbsp;: le collectif explique « comment ça marche » (et comment ça ne marche pas), ce qui rouvre la discussion sur les règles de métier et l'organisation.",
    "coeur",
    "Issue de la pédagogie inductive (Simondon, Marcon) et de Rabardel («&nbsp;je peux&nbsp;» avant «&nbsp;je sais&nbsp;»). On parle de l'objet, le subjectif vient ensuite&nbsp;: «&nbsp;on aime parler de l'objet, c'est plus facile&nbsp;».",
  ],
  [
    "methode",
    "Que signifie le critère FROC pour choisir l'objet technique&nbsp;?",
    "L'objet doit être <b>F</b>amilier (du quotidien des travailleurs), <b>R</b>iche (synergie de fonctions, toutes les dimensions de l'activité), <b>O</b>uvert (démontable physiquement et symboliquement) et <b>C</b>oncret (porteur d'une expérience première, du sens).",
    "bonus",
    "Déroulé type&nbsp;: matin en sous-groupes autonomes («&nbsp;expliquez comment marche cet objet&nbsp;»), après-midi en plénière avec controverse puis synthèse organisationnelle.",
  ],
  [
    "methode",
    "Qu'est-ce que l'entretien d'explicitation (Vermersch)&nbsp;?",
    "Une méthode qualitative <i>a posteriori</i> visant à rendre explicite l'<b>expérience préréflexive</b>&nbsp;: par un «&nbsp;re-vécu guidé&nbsp;» et l'évocation sensorielle, on déplie l'agir tel qu'il a été vécu.",
    "coeur",
    "Elle se focalise sur le <b>«&nbsp;comment&nbsp;»</b> (gestes, perceptions, temporalité fine) et non sur le «&nbsp;pourquoi&nbsp;» (justifications), pour accéder au savoir-faire incorporé et tacite.",
  ],
  [
    "methode",
    "Qu'est-ce qu'un Espace de Discussion sur le Travail (EDT)&nbsp;?",
    "Un espace collectif <b>inscrit dans l'organisation</b>, centré sur l'activité réelle, ses contraintes et son sens, visant des propositions concrètes d'amélioration. Théorisé par <b>Detchessahar</b>, modélisé par l'<b>ANACT</b> (ANI 2013).",
    "coeur",
    "Ce que ce n'est <b>pas</b>&nbsp;: une réunion d'information descendante, un recueil d'opinions, un règlement de comptes, une boîte à revendications ou une instance décisionnaire.",
  ],
  [
    "clot",
    "Travail collectif vs Collectif de travail&nbsp;?",
    "Le <b>travail collectif</b> est le fait d'agir ensemble (répartir, coordonner). Le <b>collectif de travail</b> est une construction psychologique&nbsp;: partage de règles de métier, confiance, reconnaissance. «&nbsp;Tout travail collectif n'implique pas un collectif de travail&nbsp;».",
    "coeur",
    "Pour <b>Caroly</b>, le collectif de travail n'est pas un état mais un <b>processus</b> qui se construit par l'activité commune réflexive&nbsp;; il existe quand il devient une ressource pour la santé de chacun.",
  ],
  [
    "clot",
    "Quelles sont les formes du travail collectif (Caroly)&nbsp;?",
    "<b>Co-action</b> (objets différents, but commun), <b>collaboration</b> (opérations distinctes sur même objet), <b>coopération</b> (même objet, même but proximal) et <b>aide-entraide</b> (aider sans qu'on l'ait demandé).",
    "bonus",
    "Le travail collectif nourrit le collectif de travail et inversement&nbsp;; sans coopération, pas de collectif de travail (Caroly, rejoignant Dejours).",
  ],
  [
    "clot",
    "Qu'est-ce que la « dispute professionnelle » (Clot)&nbsp;?",
    "Une <b>confrontation constructive</b> entre professionnels sur les <b>critères du travail bien fait</b>. Ce n'est ni une querelle ni un consensus&nbsp;: c'est un outil de transformation collective de la qualité du travail.",
    "coeur",
    "Elle porte sur le «&nbsp;comment&nbsp;», le «&nbsp;quoi&nbsp;» et le «&nbsp;pourquoi&nbsp;» du travail. Le risque psychosocial majeur, c'est le <b>déni du conflit de critères</b>&nbsp;: «&nbsp;c'est du destin des conflits que dépend la santé au travail&nbsp;».",
  ],
  [
    "clot",
    "Qu'est-ce que la « qualité empêchée »&nbsp;?",
    "Le conflit de critères sur ce qu'est un «&nbsp;travail bien fait&nbsp;» quand les normes de rentabilité empêchent le travailleur de faire un travail dont il serait fier. «&nbsp;Il n'y a pas de bien-être sans bien faire&nbsp;» (Clot).",
    "coeur",
    "Non débattue, elle génère un conflit intrapsychique coûteux et des conduites différenciées&nbsp;: cynisme, conformisme, solitude, contre-effectuation et <b>hypertravail</b> (cf. le directeur Carglass qui court-circuite sa pensée jusqu'à l'épuisement).",
  ],
  [
    "clot",
    "Qu'est-ce que le conflit socio-cognitif&nbsp;?",
    "Issu de Piaget et Vygotski&nbsp;: la connaissance se construit par la confrontation de points de vue, médiatisée par le langage. La résolution produit une <b>3ᵉ solution supérieure</b> aux deux propositions de départ (1+1=3).",
    "bonus",
    "Ce n'est pas une attaque personnelle mais une <b>décentration cognitive</b>&nbsp;: le désaccord réglé devient un espace d'apprentissage et d'innovation.",
  ],
  [
    "clot",
    "Qu'est-ce que la « subjectivation » du travail&nbsp;?",
    "Le processus par lequel le sujet s'approprie son activité, y met du «&nbsp;soi&nbsp;» (sens, valeurs, émotions) et se construit en travaillant&nbsp;: c'est dans l'écart prescrit/réel qu'il s'invente.",
    "bonus",
    "Formule clé&nbsp;: «&nbsp;plus je mets de moi dans le travail, plus je suis fort <b>et</b> vulnérable&nbsp;». La mobilisation subjective est à la fois ressource et exposition.",
  ],
  [
    "histoire",
    "Qui est Louis Le Guillant&nbsp;?",
    "Psychiatre fondateur de la <b>psychopathologie du travail</b>&nbsp;: il met en évidence les pathologies occasionnées par le travail (la «&nbsp;névrose des téléphonistes&nbsp;») et le rôle de l'activité dans la guérison.",
    "bonus",
    "Chaînon entre la critique du taylorisme et la psychodynamique de Dejours&nbsp;: on pense désormais le lien organisation ↔ souffrance psychique.",
  ],
];

export const QCM = [
  [
    "La psychotechnique, courant historique de la psychologie du travail, se caractérise par :",
    [
      "Une écoute attentive de la souffrance des salariés",
      "L'évaluation positiviste des aptitudes individuelles par des tests",
      "L'analyse des dialogues professionnels en autoconfrontation",
    ],
    1,
    "La psychotechnique (Lahy, Toulouse) reposait sur une démarche positiviste et instrumentale visant à sélectionner les travailleurs par des tests d'aptitude psychomoteurs, sans considération clinique pour leur subjectivité.",
  ],
  [
    "Qui a développé la méthode de l'autoconfrontation croisée ?",
    ["Yves Clot", "Christophe Dejours", "Alain Wisner"],
    0,
    "Yves Clot et l'équipe du CNAM ont théorisé l'autoconfrontation croisée dans le cadre de la Clinique de l'activité pour relancer le dialogue sur le métier.",
  ],
  [
    "En ergonomie de l'activité, l'écart entre le prescrit et le réel s'explique par :",
    [
      "L'indiscipline naturelle des travailleurs sur le terrain",
      "L'insuffisance intrinsèque de la prescription face à la variabilité du réel",
      "Une mauvaise formation professionnelle initiale",
    ],
    1,
    "Le réel est intrinsèquement instable et imprévisible. La prescription (procédure) ne peut jamais tout prévoir, forçant le travailleur à réguler en permanence.",
  ],
  [
    "Pour Christophe Dejours, la souffrance au travail se transforme en plaisir grâce à :",
    [
      "Une augmentation des primes de rendement",
      "Le jugement de reconnaissance par la hiérarchie et les pairs",
      "L'usage individuel d'idéologies défensives",
    ],
    1,
    "La reconnaissance valide l'effort et la contribution du travailleur. Elle passe par le jugement d'utilité (hiérarchie, clients) et le jugement de beauté (pairs), transformant la souffrance en plaisir.",
  ],
  [
    "Qu'est-ce que le 'genre professionnel' chez Yves Clot ?",
    [
      "L'appropriation singulière de l'activité par un travailleur",
      "Le fait de distinguer le travail des hommes et des femmes",
      "La mémoire collective du métier partagée par le collectif de travail",
    ],
    2,
    "Le genre professionnel est le patrimoine historique et social du métier, le 'comment on fait ici', constituant une ressource transpersonnelle pour le sujet.",
  ],
  [
    "Une idéologie défensive collective a pour fonction principale de :",
    [
      "Négocier des hausses de salaires avec la direction",
      "Permettre aux salariés de travailler malgré la souffrance ou le danger en s'y insensibilisant",
      "Améliorer les processus ergonomiques sur le poste de travail",
    ],
    1,
    "L'idéologie défensive collective (Dejours) est une stratégie d'insensibilisation commune (ex. déni du danger dans le bâtiment) pour supporter l'angoisse liée aux contraintes de travail.",
  ],
  [
    "Qu'est-ce que le 'réel de l'activité' ?",
    [
      "Ce qui est écrit sur la fiche de poste officielle",
      "Ce qui n'a pas pu être fait, l'empêché, le suspendu, le conflictuel",
      "La mesure quantitative du temps de travail",
    ],
    1,
    "Pour Clot, le réel de l'activité inclut non seulement ce qui est réalisé, mais aussi toutes les activités suspendues, contrariées ou possibles qui n'ont pas abouti.",
  ],
  [
    "Quelle méthode consiste à filmer une situation de travail puis à la faire commenter par son auteur en tête-à-tête ?",
    [
      "L'autoconfrontation simple",
      "L'autoconfrontation croisée",
      "L'observation participante",
    ],
    0,
    "L'autoconfrontation simple confronte directement le professionnel à son image pour verbaliser et élucider son activité avec l'intervenant.",
  ],
  [
    "En quoi consiste l'instruction au sosie (Oddone) ?",
    [
      "Le travailleur instruit un remplaçant fictif censé prendre sa place à l'identique",
      "Le chercheur imite secrètement le travailleur pour le tester",
      "Deux salariés échangent réellement leurs postes pendant une journée",
    ],
    0,
    "Le travailleur doit expliquer à un « sosie » tout ce qu'il faut faire et dire pour que personne ne remarque la substitution, ce qui l'oblige à mettre en mots l'implicite de son métier.",
  ],
  [
    "Dans la clinique de l'activité, la santé est définie comme :",
    [
      "L'absence de maladies professionnelles déclarées",
      "Le pouvoir de créer du milieu et d'agir sur son environnement de travail",
      "Le respect strict des règles de sécurité prescrites",
    ],
    1,
    "S'inspirant de Canguilhem, la santé est conçue comme la capacité à agir sur son milieu et à le transformer (pouvoir d'agir), plutôt que de le subir passivement.",
  ],
  [
    "Le style professionnel représente :",
    [
      "La marque de prestige associée à certains grands métiers d'élite",
      "La manière standardisée d'exécuter un geste technique",
      "L'appropriation singulière et créative du genre professionnel par le travailleur",
    ],
    2,
    "Le style est l'expression individuelle de l'activité qui permet au sujet d'ajuster le genre professionnel à sa singularité et à la situation.",
  ],
  [
    "Qui a mené des études pionnières sur la psychotechnique appliquée aux conducteurs de tramway ?",
    ["Jean-Maurice Lahy", "Alain Wisner", "Yves Clot"],
    0,
    "Jean-Maurice Lahy a développé la psychotechnique expérimentale au début du XXe siècle pour la sélection des traminots parisiens.",
  ],
  [
    "L'activité empêchée se produit lorsque :",
    [
      "L'accès au lieu de travail est rendu physiquement impossible",
      "Le travailleur est privé de la possibilité de bien faire son travail selon ses normes professionnelles",
      "Le travailleur fait grève",
    ],
    1,
    "L'activité empêchée (Clot) naît quand l'organisation entrave la qualité du travail, ce qui ampute la subjectivité et génère une souffrance liée à un travail 'bâclé'.",
  ],
  [
    "L'ergonomie de l'activité s'intéresse principalement aux :",
    [
      "Processus inconscients du travailleur",
      "Déterminants physiques et organisationnels de la situation de travail",
      "Relations affectives au sein de l'équipe",
    ],
    1,
    "L'ergonomie d'Alain Wisner analyse les contraintes matérielles, cognitives et organisationnelles de l'activité de travail sur le terrain.",
  ],
  [
    "Selon Christophe Dejours, l'intelligence astucieuse face aux contraintes s'appelle :",
    [
      "La mêtis (intelligence pratique)",
      "La rationalité instrumentale",
      "Le style professionnel",
    ],
    0,
    "La 'mêtis' (empruntée aux Grecs) désigne l'intelligence pratique, rusée et ingénieuse déployée par les salariés pour contourner les blocages du réel.",
  ],
  [
    "Laquelle de ces dimensions ne fait PAS partie du métier selon Yves Clot ?",
    [
      "La dimension transpersonnelle (le genre)",
      "La dimension spéculative (le salaire)",
      "La dimension interpersonnelle (les relations)",
    ],
    1,
    "Le métier comprend 4 instances d'après Clot : personnelle (le sujet), interpersonnelle (l'interaction), transpersonnelle (le genre collectif), et impersonnelle (les tâches).",
  ],
  [
    "En ergonomie, l'« astreinte » désigne :",
    [
      "La consigne imposée par l'organisation",
      "Le coût de la contrainte pour l'organisme du travailleur",
      "Le temps de pause réglementaire",
    ],
    1,
    "La contrainte est ce que la situation impose ; l'astreinte est ce qu'elle coûte au sujet. À contrainte égale, l'astreinte varie d'une personne à l'autre.",
  ],
  [
    "Pour Léontiev, ce qui oriente l'activité (par opposition au but de l'action) est :",
    ["Le mobile", "L'opération", "La consigne"],
    0,
    "L'activité répond à un mobile, l'action à un but conscient, l'opération aux conditions concrètes.",
  ],
  [
    "La « catachrèse » désigne :",
    [
      "L'usure normale d'un outil",
      "L'usage d'un instrument pour une fonction non prévue",
      "Une erreur de prescription",
    ],
    1,
    "Pour <b>Rabardel</b>, c'est le détournement d'un instrument (ex. un tournevis utilisé comme levier) : non pas une erreur, mais la preuve que le travailleur déborde le prescrit.",
  ],
  [
    "Selon Dejours, le « réel du travail » se manifeste d'abord :",
    [
      "Par la réussite technique",
      "Affectivement, par sa résistance (l'échec, l'inattendu)",
      "Par la mesure des cadences",
    ],
    1,
    "Le réel est ce qui résiste à la maîtrise et se fait connaître par l'affect : il se découvre dans l'épreuve et l'échec.",
  ],
  [
    "La « grève du zèle » illustre le fait que :",
    [
      "Les consignes suffisent à faire tourner la production",
      "Appliquer strictement le prescrit bloque la production",
      "Le zèle est une faute professionnelle",
    ],
    1,
    "Travailler exige de combler les failles du prescrit : la stricte application des consignes paralyse l'activité.",
  ],
  [
    "La zone proximale de développement (Vygotski) est :",
    [
      "L'écart entre faire seul et faire avec autrui ou des instruments",
      "La zone de confort du travailleur",
      "Le périmètre de sécurité d'une machine",
    ],
    0,
    "La clinique de l'activité ouvre cette zone pour développer le pouvoir d'agir.",
  ],
  [
    "Pour Bakhtine, toute activité (comme tout énoncé) est :",
    [
      "Neutre et objective",
      "Adressée à autrui (dialogique)",
      "Strictement individuelle",
    ],
    1,
    "Le dialogisme : travailler, c'est répondre aux attentes d'autrui ; d'où l'usage du dialogue dans l'intervention.",
  ],
  [
    "La « normativité » selon Canguilhem, c'est :",
    [
      "Respecter les normes de sécurité",
      "La capacité d'instituer de nouvelles normes de vie",
      "La conformité statistique à la moyenne",
    ],
    1,
    "La santé est la capacité de créer des normes face au milieu ; la maladie réduit le vivant à une seule norme.",
  ],
  [
    "Hugo Münsterberg est associé :",
    [
      "À la clinique de l'activité",
      "Aux origines de la psychologie industrielle / psychotechnique",
      "À la psychodynamique du travail",
    ],
    1,
    "Pionnier international de la psychologie industrielle (« Psychology and Industrial Efficiency », 1913), contemporain de la psychotechnique de Lahy.",
  ],
  [
    "Le « genre professionnel » relève de quelle dimension du métier ?",
    ["Personnelle", "Transpersonnelle", "Impersonnelle"],
    1,
    "Le genre est la dimension transpersonnelle : la mémoire collective et officieuse partagée par les pairs.",
  ],
  [
    "L'analyse du travail (Ombredane & Faverge, 1955) marque :",
    [
      "Le triomphe de la psychotechnique",
      "Le passage de la mesure de l'individu à l'étude de l'activité",
      "La fin de l'ergonomie",
    ],
    1,
    "Un tournant : on cesse de mesurer les aptitudes de l'individu pour analyser l'activité réelle de travail.",
  ],
  [
    "Dans le toyotisme (lean), l'autonomie accordée au salarié est souvent :",
    [
      "Une autonomie réelle et protectrice",
      "Une « autonomie contrôlée » qui intensifie le travail",
      "Une absence totale de contraintes",
    ],
    1,
    "Le salarié devient responsable de la cadence, de la qualité et du reporting : la contrainte se déplace vers la subjectivité.",
  ],
  [
    "Le « pouvoir d'agir » chez Clot se définit comme :",
    [
      "Le pouvoir hiérarchique sur autrui",
      "Le rayon d'actions possibles et effectives d'un sujet sur son milieu",
      "Le respect du règlement intérieur",
    ],
    1,
    "C'est l'amplitude des actions qu'un sujet peut effectivement déployer ; l'activité empêchée le rétrécit.",
  ],
  [
    "L'instruction au sosie a été introduite par :",
    ["Ivar Oddone", "Christophe Dejours", "Alain Wisner"],
    0,
    "Oddone a conçu ce dispositif, repris par la clinique de l'activité pour expliciter l'implicite du métier.",
  ],
  [
    "La « centralité du travail » (Dejours) signifie que le travail :",
    [
      "Est secondaire face à la vie privée",
      "Est central dans la construction de la santé et de l'identité",
      "Doit être au centre géographique de l'entreprise",
    ],
    1,
    "Le travail n'est jamais neutre pour la santé mentale : il participe à la construction (ou à la destruction) du sujet.",
  ],
  [
    "Le « collectif de travail » se distingue d'un simple groupe par :",
    [
      "Le nombre de personnes",
      "Des règles de métier partagées et une histoire commune (le genre)",
      "La proximité des bureaux",
    ],
    1,
    "Un collectif de travail suppose un genre professionnel partagé ; sans lui, il n'y a qu'une juxtaposition d'individus.",
  ],
  [
    "Pour Clot, l'activité est « triplement dirigée » vers :",
    [
      "Le passé, le présent et le futur",
      "L'objet, autrui et le sujet lui-même",
      "La hiérarchie, les clients et l'État",
    ],
    1,
    "Travailler agit sur la tâche, s'adresse aux autres et transforme le sujet qui l'accomplit.",
  ],
  [
    "Un « conflit de critères » survient quand :",
    [
      "Deux salariés se disputent",
      "Des exigences contradictoires (qualité / délai) ne peuvent être tenues ensemble",
      "La consigne est trop simple",
    ],
    1,
    "Devoir arbitrer seul entre des critères inconciliables, sans débat collectif, use le sujet et empêche le travail bien fait.",
  ],
  [
    "Le paradigme central de la clinique de l'activité s'énonce :",
    [
      "Stimulus → Réponse → Adaptation",
      "Développement → Pouvoir d'agir → Santé",
      "Souffrance → Défense → Reconnaissance",
    ],
    1,
    "La santé n'est ni l'absence de maladie ni l'adaptation au stress : c'est la capacité à transformer son milieu pour développer son activité.",
  ],
  [
    "La distinction « équipe / collectif » au CRTD signifie que :",
    [
      "Ce sont deux mots pour la même réalité",
      "L'équipe est une unité administrative, le collectif un instrument psychologique",
      "Le collectif est seulement le nombre de salariés",
    ],
    1,
    "Le collectif (histoire et règles du métier) permet de penser et d'agir même seul ; sa destruction laisse l'individu nu face à l'organisation.",
  ],
  [
    "Quel type de conflit est, pour Clot, une ressource pour le développement ?",
    [
      "Le conflit interpersonnel (ego, relations)",
      "Le conflit de métier (controverse sur le « bon travail »)",
      "Tout conflit doit être supprimé",
    ],
    1,
    "Le conflit interpersonnel est une impasse ; le conflit de métier, lui, ravive le genre professionnel et fait progresser.",
  ],
  [
    "Face aux RPS, l'approche clinique (Clot) consiste à :",
    [
      "Apprendre au salarié à gérer son stress (TCC, pleine conscience)",
      "Installer un baby-foot et une conciergerie",
      "Restaurer le pouvoir d'agir du collectif sur son métier",
    ],
    2,
    "Les approches adaptatives ou périphériques laissent intacts les déterminants organisationnels pathogènes ; la clinique transforme le travail lui-même.",
  ],
  [
    "Dans la méthode de l'objet technique, le critère « FROC » impose que l'objet soit :",
    [
      "Fragile, Rare, Officiel et Coûteux",
      "Familier, Riche, Ouvert et Concret",
      "Formel, Réglementaire, Optionnel et Connu",
    ],
    1,
    "L'objet doit être Familier (du quotidien), Riche (multi-fonctions), Ouvert (démontable physiquement et symboliquement) et Concret (porteur de sens), pour servir de déclencheur de parole.",
  ],
  [
    "L'entretien d'explicitation (Vermersch) privilégie :",
    [
      "Le « pourquoi » de l’action (les justifications et intentions)",
      "Le « comment » de l’action (gestes, perceptions, temporalité fine)",
      "Le récit autobiographique spontané et interprété",
    ],
    1,
    "Il vise l'expérience préréflexive par le « re-vécu guidé » et l'évocation sensorielle : on déplie le « comment » de l'agir, pas les justifications.",
  ],
  [
    "La distinction « travail collectif / collectif de travail » signifie que :",
    [
      "Les deux notions sont équivalentes",
      "Agir ensemble (travail collectif) ne suffit pas à constituer un collectif de travail",
      "Le collectif de travail précède toujours toute action commune",
    ],
    1,
    "« Tout travail collectif n'implique pas un collectif de travail » : ce dernier suppose des règles de métier partagées, de la confiance et de la reconnaissance (Caroly).",
  ],
  [
    "Pour Sandrine Caroly, le collectif de travail est avant tout :",
    [
      "Un état stable et administratif",
      "Un processus qui se construit",
      "Un organigramme officiel",
    ],
    1,
    "Le collectif de travail n'est pas un état mais un processus qui se construit par l'activité commune réflexive et la mise en discussion des manières de faire.",
  ],
  [
    "La « dispute professionnelle » (Clot) désigne :",
    [
      "Un conflit interpersonnel à éteindre",
      "Une confrontation constructive sur les critères du travail bien fait",
      "Une procédure disciplinaire interne",
    ],
    1,
    "C'est un désaccord réglé sur la qualité du travail ; le risque psychosocial majeur réside dans le déni du conflit de critères.",
  ],
  [
    "Selon Clot, « il n’y a pas de bien-être au travail sans… » :",
    ["bien gagner sa vie", "bien faire", "bien s’entendre avec sa hiérarchie"],
    1,
    "La santé psychologique dépend de la possibilité d'accomplir un travail jugé de qualité ; la qualité empêchée est une source majeure de souffrance.",
  ],
  [
    "Le conflit socio-cognitif (Piaget, Vygotski) produit, lorsqu’il est résolu :",
    [
      "Le ralliement au point de vue le plus fort",
      "Une troisième solution supérieure aux deux propositions (1+1=3)",
      "Un retour à l’équilibre initial",
    ],
    1,
    "La confrontation décentrée de points de vue débouche sur une innovation créative : un nouvel équilibre, supérieur aux positions de départ.",
  ],
  [
    "L'Espace de Discussion sur le Travail (EDT), modélisé par l'ANACT, n'est PAS :",
    [
      "Un espace centré sur l'activité réelle de travail",
      "Une instance décisionnaire ou une boîte à revendications",
      "Un lieu d'analyse critique produisant des propositions",
    ],
    1,
    "L'EDT (théorisé par Detchessahar) vise des propositions d'amélioration ; ce n'est ni une instance de décision, ni un recueil d'opinions, ni un espace de revendication.",
  ],
];

export const QUI = [
  [
    "«&nbsp;L'écart entre la tâche prescrite et l'activité réelle est la règle : le travailleur doit toujours interpréter et réguler.&nbsp;»",
    "wisner",
    "<b>Wisner.</b> C'est la base de l'ergonomie de l'activité : la prescription est insuffisante et le réel impose des ajustements permanents de l'activité.",
  ],
  [
    "«&nbsp;Le réel de l'activité, c'est aussi ce qui ne se fait pas, ce qu'on aurait voulu faire mais qu'on n'a pas pu faire.&nbsp;»",
    "clot",
    "<b>Clot.</b> Cette vision élargie de l'activité (activité réalisée vs réel de l'activité contenant l'empêché et le suspendu) caractérise la Clinique de l'activité.",
  ],
  [
    "«&nbsp;La souffrance n'est pas une anomalie : elle est l'épreuve incontournable du réel qui résiste à notre action.&nbsp;»",
    "dejours",
    "<b>Dejours.</b> En psychodynamique du travail, le réel est ce qui résiste à la prescription, générant une souffrance inévitable qu'il faut élaborer.",
  ],
  [
    "«&nbsp;L'idéologie défensive collective permet d'anesthésier le rapport au danger pour continuer à travailler.&nbsp;»",
    "dejours",
    "<b>Dejours.</b> C'est sa description classique des stratégies collectives de défense (ex. refus du port du casque dans le bâtiment).",
  ],
  [
    "«&nbsp;La santé, c'est d'avoir du jeu dans l'organisation, d'avoir les moyens de personnaliser son geste par son style.&nbsp;»",
    "clot",
    "<b>Clot.</b> Pour la clinique de l'activité, le style permet de s'approprier le genre professionnel. Sans style possible, le métier est amputé.",
  ],
  [
    "«&nbsp;La sélection des conducteurs par des tests psychomoteurs permet de mesurer scientifiquement l'aptitude.&nbsp;»",
    "histoire",
    "<b>Psychotechnique.</b> Cette perspective positiviste historique (Lahy) cherchait à optimiser scientifiquement le recrutement par la mesure.",
  ],
  [
    "«&nbsp;En autoconfrontation croisée, le conflit dialogique entre pairs relance le développement de l'activité.&nbsp;»",
    "methode",
    "<b>Méthodologie.</b> L'autoconfrontation croisée utilise le désaccord constructif entre deux pairs pour faire évoluer le genre professionnel.",
  ],
  [
    "«&nbsp;Le travail à la chaîne mutile l'organisme car il empêche les régulations motrices naturelles du travailleur.&nbsp;»",
    "histoire",
    "<b>Critique historique.</b> Les premiers psychologues cliniciens du travail (Lahy, Wallon) dénonçaient le Taylorisme comme une usure physiologique injustifiée.",
  ],
  [
    "«&nbsp;Le pouvoir d'agir, c'est le rayon des actions possibles et effectives du sujet sur son milieu et sur lui-même.&nbsp;»",
    "clot",
    "<b>Clot.</b> La santé se mesure à l'amplitude du pouvoir d'agir&nbsp;; l'activité empêchée le rétrécit.",
  ],
  [
    "«&nbsp;Aucune prescription n'épuise le réel&nbsp;: travailler exige de combler l'écart par sa propre intelligence.&nbsp;»",
    "dejours",
    "<b>Dejours.</b> La mobilisation subjective et le « zèle » sont nécessaires&nbsp;; l'application stricte des consignes bloque la production.",
  ],
  [
    "«&nbsp;La santé, c'est pouvoir instituer de nouvelles normes de vie, et pas seulement s'adapter au milieu.&nbsp;»",
    "comparer",
    "<b>Canguilhem.</b> La normativité fonde la conception de la santé reprise par la clinique de l'activité.",
  ],
  [
    "«&nbsp;Toute activité de travail est une réponse adressée à d'autres.&nbsp;»",
    "comparer",
    "<b>Bakhtine.</b> Le dialogisme&nbsp;: c'est ce qui justifie les méthodes dialogiques d'intervention.",
  ],
  [
    "«&nbsp;Le sujet se développe en s'appropriant des instruments, techniques et psychologiques.&nbsp;»",
    "comparer",
    "<b>Vygotski.</b> La médiation instrumentale est le socle historico-culturel de la clinique de l'activité.",
  ],
  [
    "«&nbsp;Le bon travailleur au bon poste&nbsp;: mesurons les aptitudes pour sélectionner.&nbsp;»",
    "histoire",
    "<b>Psychotechnique (Lahy, Münsterberg).</b> Programme positiviste d'adaptation de l'homme au travail.",
  ],
  [
    "«&nbsp;La reconnaissance se joue dans le jugement d'utilité et le jugement de beauté.&nbsp;»",
    "dejours",
    "<b>Dejours.</b> Sans reconnaissance, la souffrance ne se transforme pas en plaisir.",
  ],
  [
    "«&nbsp;Le style est l'appropriation singulière du genre&nbsp;; le genre, la mémoire collective du métier.&nbsp;»",
    "clot",
    "<b>Clot.</b> La dialectique genre/style maintient le métier vivant.",
  ],
  [
    "«&nbsp;Le réel, c'est ce qui résiste&nbsp;: il se fait connaître par l'échec et par l'affect.&nbsp;»",
    "dejours",
    "<b>Dejours.</b> Le réel du travail comme épreuve, distinct de la réalité observable.",
  ],
  [
    "«&nbsp;Il faut analyser le travail là où il se fait, sur le terrain, et non en laboratoire.&nbsp;»",
    "wisner",
    "<b>Wisner.</b> Primat de l'analyse de terrain dans l'ergonomie de langue française.",
  ],
  [
    "«&nbsp;Mettre le travail en discussion entre pairs, c'est relancer le développement du métier.&nbsp;»",
    "methode",
    "<b>Méthodologie clinique.</b> Autoconfrontations et instruction au sosie visent à raviver la controverse professionnelle.",
  ],
  [
    "«&nbsp;L'activité est dirigée vers la tâche, vers les autres et vers soi.&nbsp;»",
    "clot",
    "<b>Clot.</b> L'activité « triplement dirigée »&nbsp;: travailler, c'est aussi se transformer.",
  ],
  [
    "«&nbsp;Tout travail collectif n'implique pas un collectif de travail.&nbsp;»",
    "clot",
    "<b>Caroly (et Weill-Fassina).</b> Agir ensemble ne suffit pas&nbsp;: le collectif de travail suppose des règles de métier partagées, de la confiance et de la reconnaissance.",
  ],
  [
    "«&nbsp;Il n'y a pas de bien-être au travail sans bien faire.&nbsp;»",
    "clot",
    "<b>Clot.</b> La santé psychologique dépend de la possibilité d'accomplir un travail de qualité&nbsp;; la qualité empêchée use le sujet.",
  ],
  [
    "«&nbsp;C'est du destin des conflits que dépend la santé au travail.&nbsp;»",
    "clot",
    "<b>Clot.</b> Le risque psychosocial majeur, c'est le déni du conflit de critères&nbsp;; la dispute professionnelle l'organise au lieu de l'étouffer.",
  ],
  [
    "«&nbsp;On parle de l'objet, c'est plus facile&nbsp;; le subjectif vient ensuite.&nbsp;»",
    "methode",
    "<b>Méthode de l'objet technique.</b> L'objet (critère FROC) sert de déclencheur de parole pour rouvrir la discussion sur les règles de métier.",
  ],
  [
    "«&nbsp;Il faut accéder au « comment » de l'agir, pas au « pourquoi »&nbsp;: déplier l'expérience préréflexive.&nbsp;»",
    "methode",
    "<b>Vermersch.</b> L'entretien d'explicitation conscientise le savoir-faire incorporé par le re-vécu guidé et l'évocation sensorielle.",
  ],
];

export const REDAC = [
  [
    "Distinguez la tâche prescrite et l'activité réelle, puis expliquez pourquoi leur écart est inévitable.",
    [
      "Définir la tâche prescrite (consignes, buts, règles, temps).",
      "Définir l'activité réelle (efforts physiques/mentaux, régulations face au réel).",
      "Expliquer l'origine de l'écart (variabilité de l'opérateur, pannes, collègues, imprévus).",
      "Le rôle des régulations ergonomiques pour combler cet écart.",
      "Conclure sur l'insuffisance structurelle de toute prescription.",
    ],
    "<p>En ergonomie de l'activité, héritée des travaux d'Alain Wisner, la distinction entre la tâche prescrite et l'activité réelle constitue le point de départ de toute analyse du travail.</p><p>La <b>tâche prescrite</b> représente le travail conçu par l'organisation. Elle englobe les consignes de sécurité, les procédures écrites, le temps alloué, les outils fournis et les objectifs quantitatifs à atteindre. C'est le travail attendu théoriquement.</p><p>L'<b>activité réelle</b>, en revanche, désigne ce que le travailleur déploie concrètement pour accomplir la tâche. Elle inclut les ajustements corporels, la charge cognitive, les raccourcis pris, les communications informelles et l'engagement de la subjectivité.</p><p>L'écart entre les deux est structurellement inévitable. Le réel se caractérise par sa variabilité intrinsèque : pannes matérielles, retard des matières premières, fatigue physique de l'opérateur, demandes contradictoires des clients ou imprévus climatiques. La prescription ne pouvant jamais tout modéliser, le travailleur doit constamment interpréter, ajuster et improviser. Cet écart n'est donc pas une désobéissance, mais la condition même pour que le travail se fasse. Concevoir le travail sans cet écart revient à occulter le coût réel de l'activité pour la santé du travailleur.</p>",
  ],
  [
    "Analysez le couple conceptuel Genre et Style en Clinique de l'activité (Yves Clot).",
    [
      "Définir le genre professionnel (mémoire collective, règles de l'art officieuses).",
      "Définir le style professionnel (singularisation, signature de l'individu).",
      "La dynamique dialectique entre genre et style.",
      "Les risques lorsque le genre s'asphyxie (perte de dialogue professionnel).",
      "Conclure sur le développement du pouvoir d'agir.",
    ],
    "<p>Dans le cadre de la Clinique de l'activité théorisée par Yves Clot, les concepts de genre et de style professionnels permettent de comprendre comment le sujet se développe à travers son travail et comment se structure son pouvoir d'agir.</p><p>Le <b>genre professionnel</b> est la dimension transpersonnelle du métier. Il s'agit de la mémoire collective officieuse partagée par un collectif de pairs. Le genre réunit le «&nbsp;comment on fait ici&nbsp;», les règles informelles d'usage, de politesse ou d'entraide que l'on n'apprend pas dans les manuels, mais qui guident l'action au quotidien. C'est le patrimoine social du métier.</p><p>Le <b>style professionnel</b> est la dimension personnelle. Il correspond à l'appropriation singulière, active et créative de ce genre par un travailleur particulier. Le style est la signature individuelle qui permet de faire face à une situation inédite en interprétant le genre sans le trahir.</p><p>Ces deux notions sont dans une relation dialectique permanente : le style s'appuie sur le genre pour exister, et en retour, les innovations stylistiques des individus viennent enrichir et renouveler le genre collectif. Cependant, si l'organisation du travail empêche le dialogue professionnel entre pairs, le genre se fige et s'asphyxie. Le style devient alors impossible, laissant le sujet seul face à la prescription : c'est le début de l'activité empêchée et de l'atteinte à la santé mentale.</p>",
  ],
  [
    "Expliquez comment la Psychodynamique du travail (Dejours) théorise le passage de la souffrance au plaisir.",
    [
      "Le travail comme épreuve du réel qui résiste.",
      "L'origine de la souffrance (contraintes de l'organisation).",
      "Les stratégies de défense individuelles et collectives (idéologies).",
      "Le rôle pivot du jugement de reconnaissance (utilité et beauté).",
      "Conclure sur l'apport de la reconnaissance pour l'identité.",
    ],
    "<p>La psychodynamique du travail, développée par Christophe Dejours, s'intéresse au destin de la subjectivité confrontée à l'organisation du travail. Elle montre que le travail n'est jamais neutre pour la santé mentale : il génère de la souffrance, qui peut être sublimée en plaisir ou décompenser en maladie.</p><p>Le point de départ est que travailler, c'est se confronter au réel, défini comme ce qui résiste à l'organisation prescrite. Cette résistance provoque un échec initial, source de frustration et de <b>souffrance</b>. Face à cette tension, le travailleur déploie son intelligence pratique (la mêtis) et met en œuvre des <b>stratégies de défense</b> (comme les idéologies défensives collectives qui nient le danger) pour supporter l'angoisse.</p><p>Pour que cette souffrance ne devienne pas pathologique, elle doit être convertie en <b>plaisir</b>. Cette transformation dépend entièrement du processus de <b>reconnaissance</b>. La reconnaissance passe par deux types de jugements formulés au sein de l'espace de discussion : le <b>jugement d'utilité</b>, rendu par la hiérarchie ou les usagers sur la pertinence sociale et économique de l'effort, et le <b>jugement de beauté</b> (ou de conformité), rendu par les pairs sur le respect des règles de l'art et l'élégance du geste technique.</p><p>Si ces jugements sont accordés, la souffrance est rachetée : elle donne un sens à l'effort, contribue à la construction de l'identité du sujet et génère du plaisir. Si la reconnaissance fait défaut, les défenses s'épuisent, menant à l'aliénation ou au burn-out.</p>",
  ],
  [
    "Comparez la Clinique de l'activité (Clot) et la Psychodynamique du travail (Dejours) sur leurs buts et méthodes.",
    [
      "But commun : comprendre le travail réel et préserver la santé mentale des salariés.",
      "Clinique de l'activité : focus sur l'action, le pouvoir d'agir et les méthodes dialogiques.",
      "Psychodynamique : focus sur le vécu psychique, le plaisir/souffrance et les enquêtes par la parole.",
      "Comparaison des méthodes : autoconfrontation croisée vs enquête collective.",
      "Conclure sur la complémentarité de l'action clinique et de l'écoute dynamique.",
    ],
    "<p>Bien que la Clinique de l'activité (Yves Clot) et la Psychodynamique du travail (Christophe Dejours) partagent l'objectif commun de contester les approches positivistes pour défendre la santé mentale au travail, elles se distinguent nettement par leurs cadres théoriques et leurs méthodologies d'intervention.</p><p>La <b>Clinique de l'activité</b> est centrée sur le pouvoir d'agir du sujet. Inspirée de Vygotski, elle considère que la santé dépend du développement de l'activité elle-même, en évitant l'activité empêchée. Sa méthode clinique est principalement dialogique : elle s'appuie sur l'<b>autoconfrontation simple et croisée</b>. En se regardant travailler sur vidéo puis en débattant avec un pair, les professionnels réinvestissent les conflits de leur métier et relancent leur dynamique d'action.</p><p>La <b>Psychodynamique du travail</b> privilégie l'écoute du vécu intrapsychique et le destin de la souffrance. Son point de départ est clinique et psychanalytique. Elle s'intéresse à la manière dont le sujet résiste à la souffrance via des stratégies défensives individuelles ou collectives. Sa méthode est celle de l'<b>enquête psychodynamique collective</b>, reposant sur le volontariat et la parole au sein d'un espace de délibération, sans support vidéo direct.</p><p>En résumé, là où Clot cherche à relancer le mouvement de l'activité et le dialogue professionnel sur les gestes techniques, Dejours cherche à élucider les processus inconscients, à déconstruire les idéologies défensives et à restaurer la reconnaissance de la contribution. Ces deux approches dessinent une clinique du travail complémentaire, alliant la relance de l'agir et l'élaboration psychique de la souffrance.</p>",
  ],
  [
    "Montrez en quoi l'activité empêchée constitue une atteinte à la santé, en mobilisant le triptyque développement / pouvoir d'agir / santé.",
    [
      "Définir le réel de l'activité et l'activité empêchée (Clot).",
      "Poser le paradigme : la santé comme capacité à transformer son milieu (Canguilhem).",
      "Le mécanisme : l'empêchement ampute le pouvoir d'agir et bloque le développement.",
      "Le conflit de critères étouffé comme fabrique de l'empêchement.",
      "Conclure : restaurer le pouvoir d'agir du collectif comme voie de santé.",
    ],
    "<p>Dans la clinique de l'activité d'Yves Clot, la santé au travail ne se définit ni comme l'absence de maladie ni comme la simple adaptation au stress. Reprenant Canguilhem, Clot la pense comme une <b>normativité</b> : la capacité d'un sujet à transformer son milieu de travail pour y vivre de nouvelles expériences. C'est ce qui fonde le triptyque central : <b>développement → pouvoir d'agir → santé</b>.</p><p>L'analyse du travail ne peut se limiter à l'activité réalisée, la part visible. Le <b>réel de l'activité</b> englobe aussi ce qui n'a pas pu se faire : le suspendu, le contrarié, l'empêché. L'<b>activité empêchée</b> désigne précisément la situation où le professionnel sait comment bien faire, mais où l'organisation l'en empêche. Ce qui pèse le plus lourd psychiquement, ce n'est pas tant la charge que ce travail « ni fait ni à faire ».</p><p>Le mécanisme pathogène est alors clair : en interdisant de réaliser un travail de qualité selon les règles de l'art, l'organisation <b>ampute le pouvoir d'agir</b> et bloque le <b>développement</b> de l'activité. Or une activité qui ne se développe plus se sclérose. Le <b>conflit de critères</b> — entre les critères gestionnaires (faire vite, au moindre coût) et les critères du métier (faire bien) — lorsqu'il est étouffé et que le sujet doit l'arbitrer seul, devient une source majeure d'usure.</p><p>Il s'ensuit que l'intervention clinique ne vise pas à « réparer » l'individu (lui apprendre à gérer son stress), mais à restaurer les conditions du débat professionnel et le <b>pouvoir d'agir du collectif</b> sur son propre métier. Redonner du jeu à l'activité, c'est lui permettre de se développer à nouveau, et donc préserver la santé.</p>",
  ],
  [
    "Présentez la méthode de l'autoconfrontation (simple et croisée) et montrez en quoi elle vise le développement du métier.",
    [
      "Le cadre : l'intervenant ne donne pas la solution, il restaure le débat (comité paritaire).",
      "L'autoconfrontation simple : le choc avec soi-même (Clot & Faïta).",
      "L'autoconfrontation croisée : la controverse professionnelle entre pairs.",
      "Ce qui se développe : le genre professionnel et le pouvoir d'agir.",
      "La restitution organisationnelle comme débouché.",
    ],
    "<p>L'autoconfrontation, développée par Yves Clot et Daniel Faïta au CRTD, est la méthode reine de la clinique de l'activité. Son principe est dialogique : l'intervenant n'apporte pas de solution toute faite mais <b>restaure les conditions du débat professionnel</b>. Elle suppose en amont un comité de pilotage paritaire (direction, syndicats, professionnels) garantissant que l'analyse aura un réel pouvoir de transformation.</p><p>L'<b>autoconfrontation simple</b> confronte le professionnel à la vidéo de sa propre activité, qu'il commente avec le chercheur. Par l'étonnement de se voir, le travailleur verbalise l'écart entre ce qu'il croyait faire et ce qu'il fait réellement : c'est le « choc avec soi-même » qui rend visible l'invisible du geste.</p><p>L'<b>autoconfrontation croisée</b> est l'étape reine : deux pairs débattent de la vidéo de l'un puis de l'autre. Le conflit sur « la bonne manière de faire » réveille le <b>genre professionnel</b>, la mémoire collective et les règles tacites du métier. Ce conflit de métier n'est pas un problème à éteindre, mais une <b>ressource</b> : c'est le moteur du développement.</p><p>Ce que vise la méthode n'est donc pas l'évaluation des individus, mais le <b>développement du métier et du pouvoir d'agir</b> du collectif. La <b>restitution organisationnelle</b>, où les professionnels portent eux-mêmes l'analyse devant le comité de pilotage, en constitue le débouché : transformer les déterminants organisationnels pour que l'activité redevienne source de développement.</p>",
  ],
  [
    "En quoi la clinique de l'activité critique-t-elle les approches adaptatives et périphériques des risques psychosociaux (RPS) ?",
    [
      "Le constat : explosion des RPS dans les organisations contemporaines (lean, KPI).",
      "Les approches adaptatives (TCC, gestion du stress, pleine conscience) : adapter l'individu.",
      "Les approches périphériques (baby-foot, conciergerie, QVT « gadget »).",
      "La critique clinique : on laisse intacts les déterminants organisationnels pathogènes.",
      "La proposition : restaurer le pouvoir d'agir du collectif sur le travail réel.",
    ],
    "<p>Les organisations contemporaines — lean management, pilotage par les indicateurs, ubérisation — combinent un engagement total exigé du salarié et une réduction de ses marges de manœuvre. Il en résulte une explosion des <b>risques psychosociaux</b> (RPS). Face à eux, la clinique de l'activité formule une critique de fond des réponses dominantes.</p><p>Les <b>approches adaptatives</b> (thérapies cognitivo-comportementales, ateliers de gestion du stress, pleine conscience) cherchent à apprendre au salarié à « mieux supporter ». L'impasse, pour Clot, est de centrer l'intervention sur l'<b>adaptation individuelle</b> alors que les déterminants organisationnels pathogènes demeurent inchangés : on répare l'individu abîmé, pas le travail qui l'abîme.</p><p>Les <b>approches périphériques</b> (baby-foot, conciergerie, « QVT gadget ») compensent la pénibilité par des à-côtés agréables, sans jamais analyser l'<b>activité réelle</b> ni toucher à l'organisation du travail : elles traitent l'environnement du travail, pas le travail lui-même.</p><p>À ces logiques, la clinique de l'activité oppose une tout autre visée : non pas adapter ou compenser, mais <b>transformer le travail</b> en restaurant le débat professionnel et le <b>pouvoir d'agir du collectif</b> sur son métier. Le but n'est pas de rendre le sujet plus résistant à un travail pathogène, mais de faire en sorte que l'activité redevienne une source de développement, et donc de santé.</p>",
  ],
  [
    "Distinguez l'équipe du collectif de travail et montrez pourquoi le collectif est un « instrument psychologique ».",
    [
      "L'équipe : une unité administrative.",
      "Le collectif : l'histoire et les règles du métier (le genre).",
      "Le collectif comme instrument psychologique : penser et agir même seul.",
      "Les 4 dimensions du métier (personnelle, interpersonnelle, impersonnelle, transpersonnelle).",
      "La destruction des collectifs : l'individu nu face à l'organisation.",
    ],
    "<p>La distinction entre équipe et collectif est l'un des apports majeurs du CRTD. L'<b>équipe</b> est une réalité administrative : l'ensemble des personnes qui travaillent ensemble, inscrites sur un même planning ou un même organigramme. Le <b>collectif</b>, lui, est d'une autre nature : il désigne l'histoire du métier, ses règles tacites, les débats des anciens — bref, le <b>genre professionnel</b>.</p><p>C'est pourquoi Clot affirme que le collectif est un <b>instrument psychologique</b>. Comme l'instrument chez Vygotski médiatise le rapport au monde, le genre professionnel médiatise l'action : il permet au travailleur de <b>penser et d'agir même lorsqu'il est seul</b> physiquement, en s'appuyant sur « ce qui se fait et ne se fait pas » dans le métier. Le collectif protège ainsi l'individu en lui évitant d'avoir à tout réinventer seul.</p><p>L'activité s'analyse dès lors selon <b>quatre dimensions</b> : personnelle (le sujet), interpersonnelle (le destinataire), impersonnelle (la tâche prescrite) et transpersonnelle (le genre, qui traverse les générations). Le métier vit de la circulation entre ces dimensions, notamment entre le genre et le <b>style</b>, l'apport singulier par lequel chacun renouvelle les règles communes.</p><p>Dès lors, la destruction des collectifs (réorganisations permanentes, mise en concurrence, individualisation) a un coût clinique majeur : privé de cet instrument, l'individu se retrouve <b>nu face à l'organisation</b>, devant arbitrer seul les conflits de critères. Restaurer les collectifs de métier est donc une condition de la santé.</p>",
  ],
  [
    "« Tout travail collectif n'implique pas un collectif de travail » : distinguez les deux notions et précisez les conditions du passage de l'un à l'autre.",
    [
      "Définir le travail collectif (co-action, collaboration, coopération, aide-entraide).",
      "Définir le collectif de travail (Caroly) : un processus, pas un état.",
      "Les trois conditions : règles de métier partagées, confiance, reconnaissance des compétences.",
      "Le rôle de l'activité déontique et de la dispute professionnelle.",
      "Conclure : le collectif comme opérateur de santé et de pouvoir d’agir.",
    ],
    "<p>La formule de Weill-Fassina et Benchekroun, reprise par Sandrine Caroly, pose une distinction décisive : agir ensemble ne suffit pas à faire collectif. Le <b>travail collectif</b> désigne le fait matériel de travailler à plusieurs. Caroly en distingue plusieurs formes : la <b>co-action</b> (des objets différents mais un but commun), la <b>collaboration</b> (des opérations distinctes sur un même objet), la <b>coopération</b> (un même objet et un même but proximal) et l'<b>aide-entraide</b> (venir aider un collègue sans qu'il l'ait demandé). Il sert à répartir le travail et à réguler la charge.</p><p>Le <b>collectif de travail</b> est d'une autre nature : ce n'est pas un état stable mais un <b>processus</b> qui se construit dans et par l'activité commune réflexive. Pour Caroly, il suppose « un ensemble de personnes qui partagent des règles de métier, respectent les façons de faire de chacun et soutiennent les stratégies de préservation de la santé de chacun ». Il se distingue ainsi du simple groupe.</p><p>Trois conditions permettent le passage du travail collectif au collectif de travail : des <b>règles de métier</b> communes (le genre professionnel), la <b>confiance</b> mutuelle, et la <b>reconnaissance des compétences</b>. Ces conditions s'entretiennent par l'<b>activité déontique</b> — la capacité du collectif à produire et réélaborer ses propres règles — et par la <b>dispute professionnelle</b>, c'est-à-dire la mise en discussion des manières de faire et des critères du « travail bien fait ».</p><p>L'enjeu est clinique : le collectif de travail est un <b>opérateur de santé</b>. Il donne du pouvoir d'agir, crée des marges de manœuvre et protège la santé mentale en légitimant les façons de faire de chacun. À l'inverse, « la santé se dégrade lorsqu'un collectif professionnel devient une collection d'individus exposés isolément » (Caroly &amp; Clot). Restaurer le collectif — et non se contenter d'organiser le travail collectif — est donc une visée centrale de l'intervention.</p>",
  ],
];

export const RECITS = [
  {
    a: "histoire",
    ic: "🔬",
    t: "La psychotechnique et ses limites",
    sub: "Le passage de l'approche expérimentale positiviste aux cliniques du travail",
    parts: [
      {
        beat: "L'essor de la psychotechnique",
        html: "La psychologie du travail s'est d'abord constituée sous une forme positiviste, la <span class='kw'>psychotechnique</span>. Portée par des pionniers comme Jean-Maurice Lahy et Toulouse, elle consistait à appliquer la méthode expérimentale en laboratoire pour mesurer scientifiquement les <span class='kw'>aptitudes</span> physiques et psychomotrices des individus afin de les affecter au poste de travail optimal.",
      },
      {
        beat: "La critique du Taylorisme",
        html: "Cette approche s'inscrivait dans le prolongement de la rationalisation industrielle du Taylorisme. Cependant, des cliniciens comme Henri Wallon et Lahy lui-même ont rapidement dénoncé les limites de cette parcellisation des tâches, montrant qu'elle provoquait une <span class='kw'>usure prématurée</span> de l'organisme et niait la <span class='kw'>subjectivité</span> créatrice du travailleur, le privant de ses régulations physiologiques et psychiques naturelles.",
      },
    ],
  },
  {
    a: "wisner",
    ic: "🔧",
    t: "L'ergonomie de l'activité (Wisner)",
    sub: "La distinction structurante entre Tâche et Activité",
    parts: [
      {
        beat: "Le primat du terrain",
        html: "Fondée par Alain Wisner au CNAM, l'école française d'ergonomie a déplacé l'analyse du travail du laboratoire vers le <span class='kw'>terrain</span>. L'ergonomie de l'activité refuse de traiter le travailleur comme un simple exécutant ou un faisceau d'aptitudes mesurables, préférant étudier la situation concrète dans toute sa complexité physique et cognitive.",
      },
      {
        beat: "Tâche prescrite vs Activité réelle",
        html: "Le pivot de cette approche est l'écart irréductible entre la <span class='kw'>tâche prescrite</span> (ce qui est conçu, ordonné et défini à l'avance par l'organisation) et l'<span class='kw'>activité réelle</span> (ce que le travailleur fait concrètement pour accomplir le travail). Cet écart est nécessaire car la prescription ne peut jamais anticiper la <span class='kw'>variabilité</span> intrinsèque du réel (pannes, imprévus, collègues, fatigue).",
      },
    ],
  },
  {
    a: "clot",
    ic: "🗣️",
    t: "La clinique de l'activité (Clot)",
    sub: "Le développement du pouvoir d'agir et les dynamiques de métier",
    parts: [
      {
        beat: "Les ancrages théoriques (les pères fondateurs)",
        html: "La clinique de l'activité s'enracine dans l'école <span class='kw'>historico-culturelle</span> russe et la philosophie. <b>Vygotski</b> pense le développement du sujet par les instruments (techniques et psychologiques)&nbsp;; <b>Léontiev</b> distingue l'<span class='kw'>activité</span> (orientée par un mobile) de l'<span class='kw'>action</span> (orientée par un but)&nbsp;; <b>Bakhtine</b> montre que toute activité est <span class='kw'>adressée</span> (le dialogisme)&nbsp;; <b>Spinoza</b> définit la santé comme augmentation de la <span class='kw'>puissance d'agir</span>.",
      },
      {
        beat: "Le pouvoir d'agir et le métier",
        html: "Inspirée par Vygotski et dirigée par Yves Clot, la Clinique de l'activité s'intéresse au <span class='kw'>pouvoir d'agir</span> du sujet. Elle définit la santé comme la capacité à être actif et à créer ses propres normes dans son milieu de travail. Le pivot de ce développement est le <span class='kw'>métier</span>, conçu comme une ressource psychologique transpersonnelle essentielle.",
      },
      {
        beat: "Le réel de l'activité et l'activité empêchée",
        html: "Pour Clot, l'analyse du travail doit dépasser ce qui est réalisé. Le <span class='kw'>réel de l'activité</span> comprend aussi ce qui ne s'est pas fait&nbsp;: le possible, le suspendu, le conflictuel ou l'<span class='kw'>activité empêchée</span>. Si l'organisation du travail empêche le salarié de réaliser un travail de qualité, elle ampute son pouvoir d'agir, ce qui altère profondément sa santé.",
      },
      {
        beat: "Genre et Style professionnel",
        html: "Le métier se structure autour du <span class='kw'>genre professionnel</span>, qui est la mémoire collective partagée par le collectif de pairs (le 'comment on fait ici'). Le travailleur s'approprie ce genre pour y injecter son <span class='kw'>style professionnel</span> individuel. La santé dépend de cette liberté stylistique&nbsp;; pour renouveler et métamorphoser le genre en cours d'action, le style mobilise la <b>Métis</b> (intelligence de la ruse, du corps et de l'esprit).",
      },
    ],
  },
  {
    a: "dejours",
    ic: "🧠",
    t: "La psychodynamique du travail (Dejours)",
    sub: "La lutte contre la souffrance, les défenses et la reconnaissance",
    parts: [
      {
        beat: "Le travail comme épreuve du réel",
        html: "Fondée par Christophe Dejours, la Psychodynamique du travail étudie le vécu subjectif face à l'organisation du travail. Elle conçoit le travail comme l'<span class='kw'>épreuve du réel</span>, c'est-à-dire ce qui résiste à l'organisation prescrite. Cette résistance provoque une frustration inévitable, source de <span class='kw'>souffrance</span> psychologique primordiale.",
      },
      {
        beat: "Stratégies de défense et Idéologies collectives",
        html: "Pour ne pas sombrer dans la maladie, les travailleurs déploient leur intelligence pratique (la mêtis) et des <span class='kw'>stratégies de défense</span>. Celles-ci peuvent être individuelles ou prendre la forme d'<span class='kw'>idéologies défensives collectives</span> (ex. la négation du danger par bravade). Ces idéologies permettent de tenir au travail mais coupent le sujet de sa perception réelle du risque.",
      },
      {
        beat: "Le pivot de la Reconnaissance",
        html: "Pour convertir la souffrance en plaisir et en santé, le travailleur a besoin de <span class='kw'>reconnaissance</span>. Elle s'articule autour de deux jugements formulés dans l'espace de discussion&nbsp;: le <span class='kw'>jugement d'utilité</span> (rendu par les clients ou la hiérarchie) et le <span class='kw'>jugement de beauté</span> (rendu par les pairs sur le respect des règles de l'art). C'est ce regard qui permet de construire l'identité à travers le travail.",
      },
    ],
  },
  {
    a: "comparer",
    ic: "⚖️",
    t: "L'intervention et les méthodes cliniques",
    sub: "Sosie & autoconfrontations (Clot) vs Enquête collective (Dejours)",
    parts: [
      {
        beat: "L'instruction au sosie (Oddone)",
        html: "Première grande méthode dialogique, l'<b>instruction au sosie</b> est héritée d'Ivar Oddone. Le travailleur doit instruire un <span class='kw'>sosie</span> censé le remplacer à l'identique&nbsp;: «&nbsp;que dois-tu faire et dire pour que personne ne s'aperçoive de la substitution&nbsp;?&nbsp;» En verbalisant ce qui d'ordinaire reste implicite, le sujet redécouvre les <span class='kw'>règles du métier</span> (le genre) et reprend prise sur son activité.",
      },
      {
        beat: "L'autoconfrontation en clinique de l'activité",
        html: "L'intervention sur le terrain utilise des méthodes spécifiques pour libérer la parole. Yves Clot a développé l'<b>autoconfrontation simple</b>, où le travailleur commente son activité filmée, puis l'<b>autoconfrontation croisée</b>, où deux pairs débattent de leurs gestes professionnels face aux images de l'un d'eux. Le but est de réinjecter de la controverse professionnelle au sein du collectif.",
      },
      {
        beat: "L'enquête collective en psychodynamique",
        html: "À l'inverse, Christophe Dejours préconise l'<b>enquête psychodynamique collective</b>. Elle repose sur le volontariat et la libre parole d'un collectif de travail réuni avec l'intervenant pour analyser le vécu de la souffrance et reconstruire les règles communes, sans recours à la vidéo.",
      },
    ],
  },
  {
    a: "methode",
    ic: "🧰",
    t: "Élaborer l'expérience : méthodes complémentaires",
    sub: "Objet technique, espaces de discussion, explicitation et dispute professionnelle",
    parts: [
      {
        beat: "La méthode de l'objet technique",
        html: "Au-delà du sosie et de l'autoconfrontation, la clinique mobilise un <span class='kw'>objet technique</span> du quotidien comme déclencheur de parole. Choisi selon le critère <b>FROC</b> (Familier, Riche, Ouvert, Concret), il est «&nbsp;démonté&nbsp;» par le collectif qui en explique la loi de fonctionnement&nbsp;: «&nbsp;je peux&nbsp;» avant «&nbsp;je sais&nbsp;» (Rabardel). Parler de l'objet rouvre la discussion sur les règles de métier et révèle parfois des <b>catachrèses</b> (détournements d'usage face au réel).",
      },
      {
        beat: "L'entretien d'explicitation (Vermersch)",
        html: "L'<span class='kw'>entretien d'explicitation</span> vise l'expérience <b>préréflexive</b> du travailleur. Par un «&nbsp;re-vécu guidé&nbsp;» et l'évocation sensorielle, l'intervenant fait décrire le «&nbsp;comment&nbsp;» de l'agir — gestes, perceptions, temporalité fine — plutôt que le «&nbsp;pourquoi&nbsp;», pour rendre visible le savoir-faire incorporé et tacite.",
      },
      {
        beat: "Du travail collectif au collectif de travail",
        html: "Le <span class='kw'>travail collectif</span> (co-action, collaboration, coopération, aide-entraide) ne suffit pas&nbsp;: «&nbsp;tout travail collectif n'implique pas un collectif de travail&nbsp;». Pour <b>Caroly</b>, le <span class='kw'>collectif de travail</span> est un <b>processus</b> qui se construit sur des règles de métier partagées, la confiance et la reconnaissance&nbsp;; il devient alors une ressource pour la santé de chacun.",
      },
      {
        beat: "La dispute professionnelle et les espaces de discussion",
        html: "Pour soigner le métier, Clot préconise la <span class='kw'>dispute professionnelle</span>&nbsp;: une confrontation constructive sur les critères du «&nbsp;travail bien fait&nbsp;». Organisée dans des <span class='kw'>espaces de discussion</span> (Detchessahar, ANACT, ANI 2013), elle traite la <span class='kw'>qualité empêchée</span> au lieu de la nier. «&nbsp;Il n'y a pas de bien-être sans bien faire&nbsp;»&nbsp;: c'est du destin des conflits que dépend la santé au travail.",
      },
    ],
  },
];

export const KW_DEFS = {
  // Histoire
  psychotechnique:
    "Méthode expérimentale appliquant des tests psychomoteurs quantitatifs pour sélectionner les travailleurs.",
  aptitudes:
    "Capacités physiques et psychiques mesurées scientifiquement pour le recrutement.",

  // Ergonomie
  "analyse ergonomique du travail":
    "Étude globale des conditions de travail sur le terrain pour l'adapter à l'homme.",
  "tâche prescrite":
    "Le travail conçu, ordonné et défini à l'avance par l'organisation.",
  "activité réelle":
    "Ce que le travailleur réalise concrètement pour surmonter les aléas du terrain.",

  // Clinique de l'activité
  "clinique de l'activité":
    "Courant de psychologie du travail visant à développer le pouvoir d'agir et le métier.",
  "pouvoir d'agir":
    "Capacité du sujet à agir sur son milieu et à développer ses possibilités d'action.",
  métier:
    "Instance de développement du sujet, structurée en quatre dimensions (personnelle, interpersonnelle, transpersonnelle, impersonnelle).",
  "genre professionnel":
    "Patrimoine historique et social partagé par un collectif de pairs (le comment on fait ici).",
  "style professionnel":
    "Appropriation singulière et créative du genre professionnel par le travailleur.",
  "activité empêchée":
    "Activité contrariée ou suspendue par l'organisation, générant souffrance et baisse du pouvoir d'agir.",

  // Psychodynamique
  "psychodynamique du travail":
    "Étude des processus psychiques mobilisés par la confrontation aux contraintes du travail.",
  souffrance:
    "Résultat affectif de la résistance du réel face à la tâche prescrite.",
  "stratégies de défense":
    "Mécanismes psychiques pour tolérer la souffrance sans décompenser.",
  "idéologies défensives collectives":
    "Stratégies élaborées collectivement pour s'anesthésier au danger ou à la souffrance.",
  reconnaissance:
    "Pivot de la transformation de la souffrance en plaisir, validant la contribution.",
  "jugement d'utilité":
    "Évaluation de la contribution économique ou technique par la hiérarchie ou les clients.",
  "jugement de beauté":
    "Évaluation de la conformité aux règles de l'art par les pairs.",

  // Méthodes
  "instruction au sosie":
    "Le travailleur instruit un sosie censé le remplacer à l'identique, ce qui explicite l'implicite du métier.",
  "autoconfrontation simple":
    "Vidéo d'un professionnel projetée devant lui pour qu'il explicite son geste.",
  "autoconfrontation croisée":
    "Débat professionnel entre deux pairs face à la vidéo de l'activité de l'un d'eux.",
  "enquête psychodynamique collective":
    "Démarche clinique de parole partagée pour élucider la souffrance collective.",
  "objet technique":
    "Objet du quotidien (critère FROC) utilisé comme déclencheur de parole pour analyser le travail.",
  "entretien d'explicitation":
    "Méthode (Vermersch) qui conscientise l'expérience préréflexive en dépliant le « comment » de l'agir.",
  "espaces de discussion":
    "Espaces collectifs inscrits dans l'organisation (Detchessahar, ANACT) pour débattre de l'activité réelle.",
  "dispute professionnelle":
    "Confrontation constructive entre pairs sur les critères du travail bien fait.",
  "collectif de travail":
    "Construction psychologique (règles de métier, confiance, reconnaissance), distincte du simple travail collectif.",
  "travail collectif":
    "Fait d'agir ensemble : co-action, collaboration, coopération, aide-entraide.",
  "qualité empêchée":
    "Impossibilité de faire un travail jugé de qualité, source de conflit de critères et de souffrance.",
  "conflit socio-cognitif":
    "Confrontation décentrée de points de vue qui, résolue, produit une solution supérieure (1+1=3).",
  subjectivation:
    "Processus par lequel le sujet met du « soi » dans son activité et se construit en travaillant.",
};

export const QCM_AUTHORS = [
  "histoire",
  "clot",
  "wisner",
  "dejours",
  "clot",
  "dejours",
  "clot",
  "methode",
  "clot",
  "clot",
  "histoire",
  "clot",
  "wisner",
  "dejours",
  "clot",
];

export const SIM = [
  {
    key: "sosie",
    title: "Instruction au sosie",
    persona: "Marc, agent d'accueil en CAF",
    context:
      "Consigne donnée à Marc&nbsp;: « explique à ton sosie ce qu'il doit faire et dire pour te remplacer demain sans que personne ne s'en aperçoive ». Ton rôle&nbsp;: faire expliciter l'implicite du métier, sans juger ni souffler les réponses.",
    principes: [
      "Faire expliciter l'implicite (le genre)",
      "Ne jamais juger ni évaluer",
      "Explorer l'écart prescrit / réel",
      "Rendre l'analyse au travailleur",
    ],
    steps: [
      {
        worker:
          "Marc&nbsp;: « Ben… tu fais comme d'habitude, tu accueilles les gens. »",
        prompt: "Comment relances-tu&nbsp;?",
        options: [
          {
            label:
              "« Imagine que je te remplace demain : que dois-je faire et dire pour que personne ne voie l'échange ? »",
            score: 2,
            fb: "Idéal : la consigne du sosie force l'explicitation de l'implicite.",
          },
          {
            label: "« D'accord, donne-moi juste les grandes lignes. »",
            score: 1,
            fb: "Trop large : tu risques de rester en surface.",
          },
          {
            label: "« Sois plus précis, là tu accueilles mal. »",
            score: 0,
            fb: "Tu évalues — le clinicien n'est pas un juge.",
          },
        ],
      },
      {
        worker:
          "Marc&nbsp;: « Quand quelqu'un arrive énervé, je le laisse parler avant de répondre. »",
        prompt: "Que fais-tu de cette règle&nbsp;?",
        options: [
          {
            label:
              "« Comment tu sais qu'il est temps de reprendre la parole ? À quoi tu le repères ? »",
            score: 2,
            fb: "Idéal : tu fais expliciter les indices fins, d'ordinaire tacites.",
          },
          {
            label: "« C'est bien, continue. »",
            score: 1,
            fb: "Encourageant, mais tu n'exploites pas la mine d'or qu'il vient d'ouvrir.",
          },
          {
            label: "« Ce n'est pas ce que dit la procédure. »",
            score: 0,
            fb: "Tu ramènes au prescrit au lieu d'explorer le réel.",
          },
        ],
      },
      {
        worker:
          "Marc&nbsp;: « Des fois je m'écarte de la consigne des 5 minutes, mais bon… »",
        prompt: "Réaction&nbsp;?",
        options: [
          {
            label:
              "« Raconte-moi une fois où tu t'es écarté : qu'est-ce qui t'y a obligé ? »",
            score: 2,
            fb: "Idéal : tu explores l'écart prescrit/réel et les régulations.",
          },
          {
            label: "« Tu as raison de gagner du temps. »",
            score: 1,
            fb: "Tu approuves sans faire expliciter le pourquoi — occasion manquée.",
          },
          {
            label: "« Il ne faut pas, c'est la règle. »",
            score: 0,
            fb: "Tu rappelles la prescription, tu fermes l'analyse.",
          },
        ],
      },
      {
        worker: "Marc&nbsp;: « Voilà, c'est à peu près tout. »",
        prompt: "Comment conclus-tu&nbsp;?",
        options: [
          {
            label:
              "« On reprendra ensemble ce que ça t'a fait de te voir décrire ton travail. »",
            score: 2,
            fb: "Idéal : tu rends l'analyse au sujet pour relancer le pouvoir d'agir.",
          },
          {
            label: "« Merci, c'est noté. »",
            score: 1,
            fb: "Correct, mais tu n'ouvres pas sur le retour réflexif.",
          },
          {
            label: "« Parfait, j'ai de quoi t'évaluer. »",
            score: 0,
            fb: "« Évaluer » trahit la déontologie.",
          },
        ],
      },
    ],
  },
  {
    key: "croisee",
    title: "Autoconfrontation croisée",
    persona: "Sonia & Karim, conducteurs de train",
    context:
      "Tu animes une autoconfrontation croisée&nbsp;: Sonia et Karim commentent la vidéo de l'un d'eux abordant une courbe. Ton rôle&nbsp;: faire travailler la controverse professionnelle, pas trancher.",
    principes: [
      "Faire travailler la controverse, ne pas trancher",
      "Faire verbaliser les gestes incorporés (le style)",
      "Le dialogue entre pairs développe le genre",
      "Rendre la main au collectif",
    ],
    steps: [
      {
        worker:
          "Karim&nbsp;: « Moi je freine plus tôt que Sonia, c'est plus sûr. »",
        prompt: "Que fais-tu du désaccord&nbsp;?",
        options: [
          {
            label: "« Sonia, qu'est-ce qui te fait freiner plus tard, toi ? »",
            score: 2,
            fb: "Idéal : tu relances la controverse entre pairs.",
          },
          {
            label: "« Chacun sa méthode, passons. »",
            score: 1,
            fb: "Tu respectes les styles mais tu étouffes un débat fécond.",
          },
          {
            label: "« Karim a raison, c'est la bonne méthode. »",
            score: 0,
            fb: "Tu tranches — l'animateur ne décerne pas le « bon » geste.",
          },
        ],
      },
      {
        worker:
          "Sonia&nbsp;: « Je sens le rail, je n'ai pas besoin de freiner si tôt. »",
        prompt: "Comment exploites-tu ce « je sens »&nbsp;?",
        options: [
          {
            label:
              "« À quoi tu le sens, exactement ? Qu'est-ce que tu regardes ? »",
            score: 2,
            fb: "Idéal : tu fais verbaliser le geste incorporé (le style).",
          },
          {
            label: "« Intéressant. » (et tu passes)",
            score: 1,
            fb: "Tu valides sans creuser — le cœur du métier reste implicite.",
          },
          {
            label: "« C'est trop subjectif pour en parler. »",
            score: 0,
            fb: "Tu disqualifies un savoir incorporé.",
          },
        ],
      },
      {
        worker:
          "Karim&nbsp;: « Ah… je n'avais pas pensé à regarder ce repère. »",
        prompt: "Que se passe-t-il&nbsp;?",
        options: [
          {
            label:
              "« Voilà : en discutant, vous enrichissez tous les deux votre façon de faire. »",
            score: 2,
            fb: "Idéal : le dialogue développe le genre professionnel.",
          },
          {
            label: "« Notez ce repère pour la prochaine fois. »",
            score: 1,
            fb: "Utile, mais tu refermes vite la dynamique collective.",
          },
          {
            label: "« Donc tu faisais mal. »",
            score: 0,
            fb: "Tu juges au lieu de valoriser l'échange.",
          },
        ],
      },
      {
        worker:
          "Sonia&nbsp;: « On devrait en reparler avec les autres conducteurs. »",
        prompt: "Ta réponse&nbsp;?",
        options: [
          {
            label:
              "« Oui : l'enjeu, c'est de redonner au collectif la main sur les règles du métier. »",
            score: 2,
            fb: "Idéal : relancer le pouvoir d'agir collectif.",
          },
          {
            label: "« Si vous voulez, mais ce n'est pas l'objet. »",
            score: 1,
            fb: "Tiède : tu n'empêches pas mais tu n'encourages pas.",
          },
          {
            label: "« Non, ça reste entre nous. »",
            score: 0,
            fb: "Tu coupes la dynamique collective.",
          },
        ],
      },
    ],
  },
  {
    key: "simple",
    title: "Autoconfrontation simple",
    persona: "Inès, cuisinière de collectivité",
    context:
      "Autoconfrontation simple&nbsp;: tu projettes à Inès la vidéo de son service ; elle commente seule avec toi. Ton rôle&nbsp;: qu'elle redécouvre son activité, pas que tu la corriges.",
    principes: [
      "L'image fait redécouvrir l'invisible du geste",
      "Accueillir la surprise, ne pas corriger",
      "Nommer l'activité empêchée sans culpabiliser le sujet",
    ],
    steps: [
      {
        worker:
          "Inès&nbsp;: « Là je ne fais rien de spécial, je dresse les assiettes. »",
        prompt: "Relance&nbsp;?",
        options: [
          {
            label:
              "« Reviens en arrière : qu'est-ce que tu regardes juste avant de dresser ? »",
            score: 2,
            fb: "Idéal : l'image sert à faire émerger l'invisible du geste.",
          },
          {
            label: "« Effectivement, rien de spécial. »",
            score: 0,
            fb: "Tu valides le « rien » au lieu d'ouvrir.",
          },
          {
            label: "« Tu pourrais aller plus vite, non ? »",
            score: 0,
            fb: "Tu corriges et tu évalues — hors-jeu.",
          },
        ],
      },
      {
        worker:
          "Inès&nbsp;: « Tiens, je ne savais pas que je faisais ce geste de la main. »",
        prompt: "Que fais-tu de cette surprise&nbsp;?",
        options: [
          {
            label: "« Qu'est-ce qu'il te permet, ce geste, d'après toi ? »",
            score: 2,
            fb: "Idéal : la surprise de se voir ouvre le travail d'analyse.",
          },
          {
            label: "« Notons-le. » (et tu continues)",
            score: 1,
            fb: "Tu repères mais tu n'exploites pas la prise de conscience.",
          },
          {
            label: "« On a tous des tics. »",
            score: 0,
            fb: "Tu banalises une découverte précieuse.",
          },
        ],
      },
      {
        worker:
          "Inès&nbsp;: « En me voyant, je me rends compte que je bâcle la fin par manque de temps. »",
        prompt: "Comment accueilles-tu ça&nbsp;?",
        options: [
          {
            label:
              "« Qu'est-ce que tu aimerais faire que tu ne peux pas faire là ? »",
            score: 2,
            fb: "Idéal : tu nommes l'activité empêchée, sans culpabiliser.",
          },
          {
            label: "« Ce n'est pas si grave. »",
            score: 1,
            fb: "Tu rassures mais tu escamotes le réel de l'activité.",
          },
          {
            label: "« Il faudra mieux t'organiser. »",
            score: 0,
            fb: "Tu renvoies la faute à l'individu — c'est l'organisation qui est en cause.",
          },
        ],
      },
    ],
  },
  {
    key: "enquete",
    title: "Enquête psychodynamique",
    persona: "Un collectif de maçons (BTP)",
    context:
      "Enquête psychodynamique collective (Dejours)&nbsp;: un collectif de maçons accepte de parler de leur travail. Pas de vidéo&nbsp;: la parole et l'écoute. Ton rôle&nbsp;: faire émerger le rapport souffrance/plaisir et les défenses, dans un cadre protégé.",
    principes: [
      "Lire les défenses comme des protections, ne pas les briser",
      "Ouvrir la question de la reconnaissance",
      "Volontariat et confidentialité : conditions de la parole",
    ],
    steps: [
      {
        worker:
          "Un maçon&nbsp;: « Le casque ? On n'en met pas, c'est pour les trouillards. »",
        prompt: "Comment réagis-tu à cette bravade&nbsp;?",
        options: [
          {
            label:
              "« Qu'est-ce que ça vous permet de tenir, de faire comme ça ? »",
            score: 2,
            fb: "Idéal : tu lis l'idéologie défensive comme une protection, sans la briser.",
          },
          {
            label: "« C'est dangereux et irresponsable. »",
            score: 0,
            fb: "Tu moralises : tu casses la défense et la parole se referme.",
          },
          {
            label: "« Vous avez raison, le casque gêne. »",
            score: 0,
            fb: "Tu te fais complice du déni du danger.",
          },
        ],
      },
      {
        worker:
          "Un autre&nbsp;: « De toute façon, personne ne voit ce qu'on encaisse. »",
        prompt: "Que fais-tu de cette plainte&nbsp;?",
        options: [
          {
            label:
              "« Qu'est-ce qui serait reconnu, justement, si on le voyait ? »",
            score: 2,
            fb: "Idéal : tu ouvres la question de la reconnaissance.",
          },
          {
            label: "« Il faut le signaler à la direction. »",
            score: 1,
            fb: "Bien intentionné mais prématuré : tu court-circuites l'élaboration.",
          },
          {
            label: "« C'est partout pareil. »",
            score: 0,
            fb: "Tu banalises et tu fermes.",
          },
        ],
      },
      {
        worker: "Le collectif hésite à continuer la discussion.",
        prompt: "Comment tiens-tu le cadre&nbsp;?",
        options: [
          {
            label:
              "« Rien ne sortira d'ici sans votre accord ; on décide ensemble. »",
            score: 2,
            fb: "Idéal : volontariat + confidentialité = conditions de la parole.",
          },
          {
            label: "« Continuez, c'est pour votre bien. »",
            score: 1,
            fb: "Tu forces gentiment — la libre parole se mérite, ne s'impose pas.",
          },
          {
            label: "« Si vous ne parlez pas, on arrête tout. »",
            score: 0,
            fb: "Tu mets la pression : contraire à la déontologie.",
          },
        ],
      },
    ],
  },
];

export const CASES = [
  {
    a: "clot",
    vignette:
      "À l'hôpital, faute d'effectifs, une aide-soignante doit expédier la toilette des patients sans pouvoir leur parler&nbsp;; elle rentre chaque soir avec le sentiment d'un travail bâclé.",
    q1: {
      prompt: "Quel concept est central&nbsp;?",
      options: [
        {
          label: "Activité empêchée (Clot)",
          ok: true,
          fb: "Oui : être privé de bien faire selon ses normes ampute le pouvoir d'agir.",
        },
        {
          label: "Idéologie défensive (Dejours)",
          ok: false,
          fb: "Non : il n'y a pas ici de déni collectif du danger.",
        },
        {
          label: "Style professionnel (Clot)",
          ok: false,
          fb: "Non : le problème n'est pas la singularité du geste, mais l'empêchement.",
        },
      ],
    },
    q2: {
      prompt: "Quelle suite d'intervention est la plus cohérente&nbsp;?",
      options: [
        {
          label:
            "Ouvrir un espace pour discuter collectivement de la qualité empêchée",
          ok: true,
          fb: "Oui : remettre le travail réel en débat pour restaurer du pouvoir d'agir.",
        },
        {
          label: "Former l'aide-soignante à mieux gérer son temps",
          ok: false,
          fb: "Non : cela individualise un problème d'organisation.",
        },
        {
          label: "Lui faire passer un questionnaire de stress",
          ok: false,
          fb: "Approche hygiéniste : on traite le symptôme, pas l'organisation.",
        },
      ],
    },
  },
  {
    a: "dejours",
    vignette:
      "Sur un chantier, les ouvriers refusent le casque et se moquent ouvertement de ceux qui le portent.",
    q1: {
      prompt: "De quoi s'agit-il&nbsp;?",
      options: [
        {
          label: "Idéologie défensive collective (Dejours)",
          ok: true,
          fb: "Oui : une défense partagée pour tenir face au danger.",
        },
        {
          label: "Activité empêchée (Clot)",
          ok: false,
          fb: "Non : rien n'empêche ici de bien faire le travail.",
        },
        {
          label: "Catachrèse (Rabardel)",
          ok: false,
          fb: "Non, rien à voir avec l'usage détourné d'un outil.",
        },
      ],
    },
    q2: {
      prompt: "Quelle posture d'intervention adopter&nbsp;?",
      options: [
        {
          label:
            "Comprendre ce que la défense permet de tenir, sans la briser brutalement",
          ok: true,
          fb: "Oui : une défense arrachée laisse le sujet sans protection.",
        },
        {
          label: "Sanctionner immédiatement les contrevenants",
          ok: false,
          fb: "Non : on casse la parole et la défense se renforce.",
        },
        {
          label: "Distribuer une brochure sur les risques",
          ok: false,
          fb: "Insuffisant : l'information ne lève pas une défense collective.",
        },
      ],
    },
  },
  {
    a: "clot",
    vignette:
      "Dans un centre de tri, les facteurs partagent des tours de main non écrits&nbsp;; Paul, lui, a sa façon bien à lui de calmer les usagers difficiles.",
    q1: {
      prompt: "Quels deux concepts s'articulent&nbsp;?",
      options: [
        {
          label: "Genre (règles partagées) et Style (la façon de Paul)",
          ok: true,
          fb: "Oui : le style singularise le genre commun.",
        },
        {
          label: "Tâche prescrite et activité réelle",
          ok: false,
          fb: "Pas le plus précis ici.",
        },
        { label: "Souffrance et reconnaissance", ok: false, fb: "Hors sujet." },
      ],
    },
    q2: {
      prompt: "Qu'est-ce qui menacerait la santé de ce métier&nbsp;?",
      options: [
        {
          label: "Un genre figé qui interdit tout style",
          ok: true,
          fb: "Oui : sans liberté stylistique, le métier s'asphyxie.",
        },
        {
          label: "Trop de styles différents",
          ok: false,
          fb: "Non : la diversité des styles nourrit le genre.",
        },
        {
          label: "Des usagers trop nombreux",
          ok: false,
          fb: "Ce n'est pas le ressort conceptuel.",
        },
      ],
    },
  },
  {
    a: "wisner",
    vignette:
      "Un agent prend 5 minutes pour aider une personne âgée alors que la consigne impose 2 minutes par client. Son chef veut le sanctionner.",
    q1: {
      prompt: "Comment qualifier cet écart&nbsp;?",
      options: [
        {
          label: "Écart structurel prescrit / réel (Wisner)",
          ok: true,
          fb: "Oui : le réel impose des régulations que la prescription n'épuise pas.",
        },
        {
          label: "Une faute professionnelle",
          ok: false,
          fb: "Justement non : l'écart est la condition même du travail.",
        },
        {
          label: "Un simple manque de rigueur",
          ok: false,
          fb: "Non : c'est une régulation, pas une négligence.",
        },
      ],
    },
    q2: {
      prompt: "Que dirais-tu au chef&nbsp;?",
      options: [
        {
          label:
            "Cet écart est nécessaire ; analysons ce que la prescription ne prévoit pas",
          ok: true,
          fb: "Oui : on transforme l'organisation, on ne punit pas la régulation.",
        },
        {
          label: "Vous avez raison, il faut faire respecter la règle",
          ok: false,
          fb: "Non : occulter l'écart aggrave le coût pour la santé.",
        },
        {
          label: "L'agent doit simplement aller plus vite",
          ok: false,
          fb: "Individualise et nie le réel.",
        },
      ],
    },
  },
  {
    a: "dejours",
    vignette:
      "Après une réparation difficile menée dans l'urgence, les collègues d'un technicien saluent l'élégance de sa solution&nbsp;; cette fierté l'aide à supporter la fatigue.",
    q1: {
      prompt: "Quel mécanisme est à l'œuvre&nbsp;?",
      options: [
        {
          label: "Reconnaissance — jugement de beauté (Dejours)",
          ok: true,
          fb: "Oui : le jugement des pairs transforme la peine en plaisir.",
        },
        { label: "Idéologie défensive (Dejours)", ok: false, fb: "Non." },
        {
          label: "Activité empêchée (Clot)",
          ok: false,
          fb: "Non, au contraire.",
        },
      ],
    },
    q2: {
      prompt: "Quel jugement complète celui des pairs&nbsp;?",
      options: [
        {
          label: "Le jugement d'utilité (hiérarchie, clients)",
          ok: true,
          fb: "Oui : utilité + beauté = les deux faces de la reconnaissance.",
        },
        {
          label: "Le jugement de conformité de l'inspection",
          ok: false,
          fb: "Non, ce n'est pas un concept de la psychodynamique.",
        },
        { label: "L'auto-évaluation chiffrée", ok: false, fb: "Non." },
      ],
    },
  },
  {
    a: "clot",
    vignette:
      "Une enseignante doit à la fois finir le programme, différencier pour les élèves en difficulté et préparer aux examens&nbsp;: elle ne peut tout tenir et culpabilise.",
    q1: {
      prompt: "Quel concept décrit sa situation&nbsp;?",
      options: [
        {
          label: "Conflit de critères / qualité empêchée (Clot)",
          ok: true,
          fb: "Oui : des exigences contradictoires impossibles à satisfaire ensemble.",
        },
        {
          label: "Astreinte (Wisner)",
          ok: false,
          fb: "Partiel : l'astreinte est le coût, pas le conflit de critères lui-même.",
        },
        { label: "Catachrèse (Rabardel)", ok: false, fb: "Hors sujet." },
      ],
    },
    q2: {
      prompt: "Quelle issue collective viserait l'intervention&nbsp;?",
      options: [
        {
          label:
            "Un débat sur les critères du « bien faire » pour arbitrer collectivement",
          ok: true,
          fb: "Oui : sortir le sujet de l'arbitrage solitaire.",
        },
        {
          label: "Un coaching individuel de gestion du temps",
          ok: false,
          fb: "Individualise un problème d'organisation.",
        },
        {
          label: "Supprimer la différenciation",
          ok: false,
          fb: "On supprime le sens du travail, pas le conflit.",
        },
      ],
    },
  },
  {
    a: "comparer",
    vignette:
      "Un apprenti réussit une soudure délicate quand un ancien l'épaule, alors qu'il échoue lorsqu'il est seul.",
    q1: {
      prompt: "Quel concept éclaire la situation&nbsp;?",
      options: [
        {
          label: "Zone proximale de développement (Vygotski)",
          ok: true,
          fb: "Oui : l'écart entre faire seul et faire avec autrui ou des instruments.",
        },
        { label: "Jugement de beauté (Dejours)", ok: false, fb: "Non." },
        { label: "Idéologie défensive (Dejours)", ok: false, fb: "Non." },
      ],
    },
    q2: {
      prompt: "Qu'est-ce que cela implique pour l'intervention&nbsp;?",
      options: [
        {
          label:
            "Créer des situations qui ouvrent cette zone pour développer le pouvoir d'agir",
          ok: true,
          fb: "Oui : développer, pas seulement évaluer (héritage vygotskien).",
        },
        {
          label: "Tester l'apprenti seul pour le noter",
          ok: false,
          fb: "Non : on mesure au lieu de développer.",
        },
        {
          label: "Attendre qu'il sache faire seul",
          ok: false,
          fb: "Non : c'est l'étayage qui fait progresser.",
        },
      ],
    },
  },
  {
    a: "histoire",
    vignette:
      "Avec le lean, un opérateur cumule désormais cadence, contrôle qualité, maintenance et reporting&nbsp;; sa direction lui parle d'« autonomie ».",
    q1: {
      prompt: "Comment lire cette « autonomie »&nbsp;?",
      options: [
        {
          label: "Une autonomie contrôlée qui intensifie le travail",
          ok: true,
          fb: "Oui : la contrainte se déplace vers la subjectivité.",
        },
        {
          label: "Une vraie autonomie protectrice",
          ok: false,
          fb: "Non : l'autonomie y est sous contrainte de résultats.",
        },
        { label: "Une absence totale de contraintes", ok: false, fb: "Non." },
      ],
    },
    q2: {
      prompt: "Quel risque principal cela fait-il courir&nbsp;?",
      options: [
        {
          label:
            "Des injonctions contradictoires et des RPS (activité empêchée)",
          ok: true,
          fb: "Oui : densification + conflits de critères = terrain des RPS.",
        },
        { label: "Un excès de temps libre", ok: false, fb: "Évidemment non." },
        {
          label: "Une simple perte de productivité",
          ok: false,
          fb: "Ce n'est pas l'enjeu de santé visé ici.",
        },
      ],
    },
  },
  {
    a: "clot",
    vignette:
      "Aux urgences, après une réorganisation, l'équipe se plaint de tensions, d'une perte de sens et d'un turnover élevé&nbsp;; chacun fait sa part mais plus personne ne discute des manières de faire.",
    q1: {
      prompt: "Que diagnostiquer en premier&nbsp;?",
      options: [
        {
          label: "Un travail collectif sans collectif de travail (Caroly)",
          ok: true,
          fb: "Oui : on agit ensemble, mais les règles de métier ne sont plus partagées ni discutées.",
        },
        {
          label: "Un simple problème de personnalités",
          ok: false,
          fb: "Non : confondre conflit interpersonnel et conflit de métier mène à une impasse.",
        },
        {
          label: "Une idéologie défensive collective (Dejours)",
          ok: false,
          fb: "Non : il n'y a pas ici de déni partagé du danger.",
        },
      ],
    },
    q2: {
      prompt: "Quelle intervention reconstruit le collectif&nbsp;?",
      options: [
        {
          label:
            "Ouvrir une dispute professionnelle sur les critères du « bien soigner »",
          ok: true,
          fb: "Oui : remettre en discussion les manières de faire reconstruit le collectif et le pouvoir d'agir.",
        },
        {
          label: "Un séminaire de cohésion (team building) hors travail",
          ok: false,
          fb: "Périphérique : on ne touche pas à l'activité réelle.",
        },
        {
          label: "Des entretiens individuels de motivation",
          ok: false,
          fb: "Individualise un problème collectif et organisationnel.",
        },
      ],
    },
  },
  {
    a: "methode",
    vignette:
      "Dans un atelier, les conflits portent sur l'usage d'une machine&nbsp;: les anciens et les nouveaux ne la « font pas marcher » pareil et n'arrivent pas à en parler à froid.",
    q1: {
      prompt:
        "Quelle méthode est la plus adaptée pour rouvrir la parole&nbsp;?",
      options: [
        {
          label:
            "La méthode de l'objet technique (la machine comme déclencheur)",
          ok: true,
          fb: "Oui : parler de l’objet (FROC) est plus facile et révèle les règles de métier divergentes.",
        },
        {
          label: "Un questionnaire anonyme de satisfaction",
          ok: false,
          fb: "Hygiéniste : on recueille des opinions, on n'analyse pas l'activité.",
        },
        {
          label: "Un rappel de la procédure officielle par la hiérarchie",
          ok: false,
          fb: "On referme sur le prescrit au lieu de travailler le réel.",
        },
      ],
    },
    q2: {
      prompt: "Qu'est-ce qu'on cherche à faire émerger&nbsp;?",
      options: [
        {
          label:
            "Les règles de métier et les catachrèses, pour réinterroger l’organisation",
          ok: true,
          fb: "Oui : la MOT vise la loi de fonctionnement et les détournements d'usage face au réel.",
        },
        {
          label: "Le classement des opérateurs du plus rapide au plus lent",
          ok: false,
          fb: "Non : la clinique développe, elle ne note pas.",
        },
        {
          label: "La preuve que les anciens ont tort",
          ok: false,
          fb: "Non : l'animateur ne tranche pas la controverse.",
        },
      ],
    },
  },
];

export const ERAS = [
  {
    key: "psy",
    year: "~1900",
    name: "Psychotechnique",
    travail:
      "Première industrialisation, début de l'organisation scientifique du travail&nbsp;; on cherche à placer « le bon ouvrier au bon poste ».",
    discipline:
      "Naissance d'une psychologie <b>positiviste</b> du travail&nbsp;: mesure des aptitudes, tests psychomoteurs, sélection.",
    auteur: "Lahy · Münsterberg · Pacaud",
    sante:
      "La subjectivité est ignorée&nbsp;; l'individu est réduit à un faisceau d'aptitudes mesurables.",
  },
  {
    key: "taylor",
    year: "1911-14",
    name: "Taylorisme / Fordisme",
    travail:
      "OST (séparation conception/exécution), chaîne mobile fordiste, production de masse, parcellisation du geste.",
    discipline:
      "Apogée de la psychotechnique, mais <b>premières critiques</b> de l'usure et de la mutilation du geste.",
    auteur: "Taylor, Ford · critique : Wallon, Lahy",
    sante:
      "Usure physiologique, dépossession du savoir-faire, perte du pouvoir d'organiser son geste.",
  },
  {
    key: "ergo",
    year: "1949",
    name: "Ergonomie de l'activité",
    travail: "Reconstruction, quête de productivité, automatisation naissante.",
    discipline:
      "Naissance de l'<b>ergonomie de langue française</b>&nbsp;; l'analyse du travail (Ombredane &amp; Faverge, 1955) déplace le regard de l'individu vers l'activité.",
    auteur: "Wisner · Ombredane &amp; Faverge · Leplat",
    sante:
      "On vise à adapter le travail à l'homme&nbsp;: charge, astreinte et régulation deviennent centrales.",
  },
  {
    key: "psp",
    year: "1950s",
    name: "Psychopathologie du travail",
    travail:
      "Travail industriel intensif, conditions dures, premiers regards sur la santé mentale au travail.",
    discipline:
      "La <b>psychopathologie du travail</b> étudie les pathologies liées au travail (ex. la « névrose des téléphonistes »).",
    auteur: "Louis Le Guillant",
    sante:
      "Le travail peut rendre malade&nbsp;: on pense le lien organisation ↔ souffrance psychique.",
  },
  {
    key: "pdt",
    year: "1980",
    name: "Psychodynamique du travail",
    travail:
      "Tertiarisation, montée des contraintes mentales, gestion par objectifs.",
    discipline:
      "Dejours refonde le champ&nbsp;: <b>psychodynamique du travail</b> (souffrance, plaisir, défenses, reconnaissance).",
    auteur: "Christophe Dejours",
    sante:
      "La souffrance, inévitable, peut être muée en plaisir par la reconnaissance&nbsp;; sinon, décompensation.",
  },
  {
    key: "cla",
    year: "1990-2000",
    name: "Clinique de l'activité",
    travail:
      "Toyotisme, lean management, « autonomie contrôlée », intensification.",
    discipline:
      "Clot fonde la <b>clinique de l'activité</b> (CRTD), héritière de Vygotski, Bakhtine et Léontiev&nbsp;; méthodes dialogiques.",
    auteur: "Yves Clot · Daniel Faïta · Oddone (sosie)",
    sante:
      "La santé = pouvoir d'agir et développement du métier&nbsp;; l'activité empêchée l'atteint.",
  },
  {
    key: "rps",
    year: "2000+",
    name: "RPS & digitalisation",
    travail:
      "Plateformes, contrôle algorithmique, télétravail, reporting permanent, ubérisation.",
    discipline:
      "Débats sur les <b>risques psychosociaux</b>&nbsp;; tension entre approches hygiénistes et cliniques du travail.",
    auteur: "Cliniques du travail (Clot, Dejours…)",
    sante:
      "Porosité des temps, surveillance, perte de sens&nbsp;: restaurer collectifs et pouvoir d'agir.",
  },
];

export const NODES = {
  prescrit: {
    label: "Tâche prescrite",
    s: "Prescrit",
    a: "wisner",
    x: 110,
    y: 70,
    links: [{ to: "reel", rel: "écart structurel avec" }],
  },
  reel: {
    label: "Activité réelle",
    s: "Réel",
    a: "wisner",
    x: 250,
    y: 55,
    links: [
      { to: "reelact", rel: "se prolonge dans" },
      { to: "prescrit", rel: "comble les failles de" },
    ],
  },
  reelact: {
    label: "Réel de l'activité",
    s: "Réel de l'act.",
    a: "clot",
    x: 250,
    y: 150,
    links: [{ to: "empechee", rel: "contient l'empêché =" }],
  },
  empechee: {
    label: "Activité empêchée",
    s: "Empêchée",
    a: "clot",
    x: 410,
    y: 120,
    links: [
      { to: "pouvoir", rel: "ampute le" },
      { to: "sante", rel: "atteinte à la" },
    ],
  },
  genre: {
    label: "Genre professionnel",
    s: "Genre",
    a: "clot",
    x: 300,
    y: 265,
    links: [
      { to: "style", rel: "en dialectique avec" },
      { to: "autoconf", rel: "redynamisé par" },
    ],
  },
  style: {
    label: "Style professionnel",
    s: "Style",
    a: "clot",
    x: 150,
    y: 300,
    links: [
      { to: "genre", rel: "singularise le" },
      { to: "pouvoir", rel: "exprime le" },
    ],
  },
  developpement: {
    label: "Développement",
    s: "Dévelop.",
    a: "clot",
    x: 545,
    y: 245,
    links: [
      { to: "pouvoir", rel: "élargit le" },
      { to: "sante", rel: "est la condition de la" },
    ],
  },
  pouvoir: {
    label: "Pouvoir d'agir",
    s: "Pouvoir d'agir",
    a: "clot",
    x: 440,
    y: 295,
    links: [
      { to: "sante", rel: "fonde la" },
      { to: "autoconf", rel: "développé par" },
      { to: "sosie", rel: "relancé par" },
    ],
  },
  sante: {
    label: "Santé",
    s: "Santé",
    a: "commun",
    x: 610,
    y: 190,
    links: [{ to: "pouvoir", rel: "= capacité d'agir =" }],
  },
  autoconf: {
    label: "Autoconfrontation croisée",
    s: "Autoconf.",
    a: "methode",
    x: 150,
    y: 430,
    links: [{ to: "genre", rel: "fait travailler le" }],
  },
  sosie: {
    label: "Instruction au sosie",
    s: "Sosie",
    a: "methode",
    x: 320,
    y: 440,
    links: [{ to: "genre", rel: "explicite l'implicite du" }],
  },
  souffrance: {
    label: "Souffrance",
    s: "Souffrance",
    a: "dejours",
    x: 560,
    y: 410,
    links: [
      { to: "reconnaissance", rel: "muée en plaisir par" },
      { to: "ideologie", rel: "tenue à distance par" },
    ],
  },
  reconnaissance: {
    label: "Reconnaissance",
    s: "Reconn.",
    a: "dejours",
    x: 670,
    y: 430,
    links: [{ to: "souffrance", rel: "rachète la" }],
  },
  ideologie: {
    label: "Idéologie défensive",
    s: "Idéologie",
    a: "dejours",
    x: 560,
    y: 500,
    links: [{ to: "souffrance", rel: "protège de la" }],
  },
  intensification: {
    label: "Intensification du travail",
    s: "Intensif.",
    a: "histoire",
    x: 460,
    y: 400,
    links: [
      { to: "empechee", rel: "favorise l'" },
      { to: "pouvoir", rel: "réduit le" },
    ],
  },
  collectif: {
    label: "Collectif de travail",
    s: "Collectif",
    a: "clot",
    x: 665,
    y: 115,
    links: [
      { to: "pouvoir", rel: "donne du" },
      { to: "sante", rel: "nourrit la" },
    ],
  },
  dispute: {
    label: "Dispute professionnelle",
    s: "Dispute",
    a: "clot",
    x: 380,
    y: 345,
    links: [
      { to: "genre", rel: "réélabore le" },
      { to: "pouvoir", rel: "développe le" },
    ],
  },
  mot: {
    label: "Méthode de l'objet technique",
    s: "Objet tech.",
    a: "methode",
    x: 470,
    y: 480,
    links: [{ to: "genre", rel: "rouvre le" }],
  },
  edt: {
    label: "Espaces de discussion",
    s: "EDT",
    a: "methode",
    x: 240,
    y: 510,
    links: [{ to: "dispute", rel: "accueille la" }],
  },
};

export const ATELIER_SQUELETTE = [
  [
    "Accroche",
    "Une phrase qui ancre le sujet : un cas, un chiffre, une tension du travail contemporain.",
  ],
  [
    "Définitions & auteurs",
    "Définis les termes clés et nomme le(s) courant(s) : Ergonomie (Wisner), Clinique de l'activité (Clot &amp; Faïta), Psychodynamique (Dejours).",
  ],
  [
    "Problématique",
    "Transforme le sujet en une tension/question précise à résoudre.",
  ],
  [
    "Plan dialectique",
    "Annonce 2-3 parties qui se répondent (ex. le prescrit → le réel → le développement) et mobilise le triptyque Développement → Pouvoir d'agir → Santé.",
  ],
  [
    "Conclusion & ouverture",
    "Réponds à la problématique, puis ouvre sur le pouvoir d'agir du collectif ou la critique des approches adaptatives (séance 14).",
  ],
];

export const ATELIER_CRITERES = [
  "J'ai situé le(s) courant(s) et nommé l'auteur clé",
  "J'ai défini précisément les concepts mobilisés",
  "J'ai donné un exemple concret / cas de terrain",
  "J'ai contrasté deux approches (ex. Clot vs Dejours)",
  "J'ai mobilisé le triptyque Développement → Pouvoir d'agir → Santé",
  "J'ai proposé une lecture clinique / une piste d'intervention",
  "Ma conclusion ouvre sur le pouvoir d'agir ou critique les approches adaptatives",
];
