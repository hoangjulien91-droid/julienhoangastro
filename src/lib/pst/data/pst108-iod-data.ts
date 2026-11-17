export interface EtapeNegociation {
  id: number;
  drhReplique: string;
  objectionType: string;
  choix: {
    id: "a" | "b" | "c";
    reponseTexte: string;
    points: number;
    verdict: "correct" | "moyen" | "erreur";
    justificationTheorique: string;
    citationValls: string;
  }[];
}

export const ETAPES_NEGOCIATION_IOD: EtapeNegociation[] = [
  {
    id: 1,
    objectionType: "La Demande de Tri Préalable & de CV",
    drhReplique:
      "« Bonjour. Écoutez, je recrute deux techniciens logistiques. Mais je n'ai pas le temps de voir n'importe qui : envoyez-moi vos 5 meilleurs CV déjà triés et testés, et je convoquerai les deux qui ont le profil parfait. »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« D'accord, je vous sélectionne nos candidats les plus motivés et je vous fais passer leurs résultats aux tests de personnalité et de logique. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Erreur fondamentale anti-IOD : accepter de trier les candidats en amont renforce la ségrégation et valide l'arbitraire du CV. L'IOD refuse le tri préalable.",
        citationValls:
          "« Le tri préalable constitue un processus d'éviction prédictif qui renforce l'exclusion des plus vulnérables. » (Castra & Valls)",
      },
      {
        id: "b",
        reponseTexte:
          "« C'est inadmissible ! Vous discriminez les personnes en difficulté, nous ne fonctionnons pas comme ça avec les entreprises capitalistes. »",
        points: 1,
        verdict: "erreur",
        justificationTheorique:
          "Posture militante moralisatrice : elle braque l'employeur et rompt la négociation. L'intervenant IOD doit être un partenaire technique et pragmatique de l'entreprise.",
        citationValls:
          "« L'intervenant IOD ne moralise pas l'entreprise : il lui offre une prestation de sécurisation du recrutement basée sur l'analyse ergonomique du poste. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Je comprends votre impératif de temps et d'efficacité. Justement, notre méthode IOD ne fonctionne pas au CV sur déclaratif, mais sur le travail réel. Je vous propose de visiter votre quai logistique pendant 45 minutes pour analyser les exigences réelles du poste, puis nous vous présenterons directement une personne prête à occuper ces fonctions, sans vous inonder de paperasse. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Posture IOD parfaite : déplacer l'attention du DRH de l'évaluation abstraite sur CV vers la réalité concrète du poste et la sécurisation du geste de recrutement.",
        citationValls:
          "« Agir sur l'offre d'emploi, c'est d'abord analyser le poste réel pour lever les critères d'embauche artificiels ou surdimensionnés. » (Denis Castra)",
      },
    ],
  },
  {
    id: 2,
    objectionType: "La Crainte du « Trou » sur le CV et de l'Âge",
    drhReplique:
      "« Votre candidat a 48 ans et 3 ans d'inactivité. Comment voulez-vous que je prenne le risque de lui confier une ligne de conditionnement sans garantie sur ses capacités actuelles ? »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« Le trou sur le CV reflète une période de rupture biographique, pas une incompétence. Nous avons vérifié avec lui les conditions ergonomiques du poste. De plus, notre service assure un suivi bilatéral hebdomadaire pendant les premiers mois pour désamorcer immédiatement tout problème d'ajustement. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Argumentation IOD majeure : le contrat moral de suivi bilatéral rassure l'employeur tout en dédramatisant l'historique du demandeur d'emploi.",
        citationValls:
          "« La garantie IOD ne repose pas sur une sélection éliminatoire mais sur un accompagnement médiatisé de l'intégration dans la durée. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Nous allons lui faire passer un bilan de santé complet et un test psychométrique de résistance à l'effort pour vous rassurer. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Contresens complet : faire passer des tests psychométriques déplace la responsabilité sur l'individu et médicalise une problématique d'insertion sociale.",
        citationValls:
          "« La psychologisation des difficultés d'accès à l'emploi exonère l'organisation de son devoir d'aménagement des conditions d'accueil. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Si vous refusez, vous risquez une plainte auprès du Défenseur des Droits pour discrimination liée à l'âge. »",
        points: 1,
        verdict: "erreur",
        justificationTheorique:
          "Menace juridique stérile : elle détruit la relation de confiance nécessaire à l'intégration durable du salarié.",
        citationValls:
          "« L'accès à l'emploi durable se négocie dans la coopération avec le management de proximité, jamais dans la contrainte contentieuse. »",
      },
    ],
  },
  {
    id: 3,
    objectionType: "Le Refus de la Visite de Poste Préalable",
    drhReplique:
      "« Une visite de poste avec vous ? Mais monsieur, nous sommes une entreprise avec des secrets de fabrication et des consignes de sécurité drastiques. Le candidat verra bien le premier jour d'embauche ! »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« D'accord, nous ferons sans la visite, je me fierai à la fiche de poste rédigée par vos services RH. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Abandonner la visite de poste, c'est abandonner l'analyse du travail réel au profit de la tâche prescrite. C'est la mort de la méthode IOD.",
        citationValls:
          "« La fiche de poste est une fiction gestionnaire ; seule l'observation directe révèle les contraintes physiques et relationnelles effectives. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Nous sommes tenus par le secret professionnel le plus strict. La visite de poste est la condition sine qua non de notre engagement : elle nous permet d'identifier les variabilités réelles, de vérifier la conformité des gestes et d'éviter un abandon de poste dès la première semaine. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Démonstration de la valeur ajoutée ergonomique : la visite de poste protège l'entreprise contre les coûts cachés d'une intégration ratée.",
        citationValls:
          "« L'intervention IOD déplace l'expertise : le psychologue analyse l'environnement physique et social pour calibrer l'accueil. »",
      },
      {
        id: "c",
        reponseTexte:
          "« Si vous refusez la visite, envoyez-nous simplement une vidéo tournée avec votre smartphone. »",
        points: 1,
        verdict: "moyen",
        justificationTheorique:
          "Palliatif insuffisant : une vidéo ne permet pas d'observer les ambiances physiques (bruit, chaleur) ni d'interroger les opérateurs en poste.",
        citationValls:
          "« L'observation in situ est irremplaçable pour saisir l'ambiance relationnelle et la culture d'équipe. »",
      },
    ],
  },
  {
    id: 4,
    objectionType: "La Période d'Intégration & le Suivi Bilatéral",
    drhReplique:
      "« Entendu pour le candidat. Mais une fois le contrat signé, je gère mon personnel en interne. Pourquoi tenez-vous tant à ce rendez-vous de suivi bilatéral à J+15 ? »",
    choix: [
      {
        id: "a",
        reponseTexte:
          "« Parce que nous devons justifier nos subventions auprès de l'État et de France Travail avec des fiches d'émargement. »",
        points: 0,
        verdict: "erreur",
        justificationTheorique:
          "Réduction administrative disqualifiante : cela fait passer l'intervention pour une contrainte bureaucratique inutile.",
        citationValls:
          "« L'évaluation de l'action IOD est clinique et qualitative, jamais purement comptable. »",
      },
      {
        id: "b",
        reponseTexte:
          "« Le suivi bilatéral à J+15 est un tiers garant : il permet au salarié d'exprimer ses doutes sans peur de sanction, et à votre chef d'équipe de recadrer les incompréhensions opératoires avant qu'elles ne se transforment en conflit de personnes. C'est l'assurance tous risques de votre embauche. »",
        points: 5,
        verdict: "correct",
        justificationTheorique:
          "Définition canonique de la régulation bilatérale : l'intervenant IOD agit comme un médiateur neutre entre la logique productive et la logique subjective d'intégration.",
        citationValls:
          "« Le suivi bilatéral désamorce les stéréotypes naissants et permet d'ajuster en direct la régulation du travail. » (Castra & Valls)",
      },
      {
        id: "c",
        reponseTexte:
          "« Vous avez raison, si le chef d'équipe est bon, nous n'avons pas besoin d'intervenir. Appelez-nous seulement si ça se passe mal. »",
        points: 1,
        verdict: "moyen",
        justificationTheorique:
          "L'intervention 'pompière' en cas de crise arrive toujours trop tard. La méthode IOD impose un calendrier proactif ritualisé.",
        citationValls:
          "« Quand l'entreprise appelle parce que 'ça ne va pas', le rejet identitaire est déjà consommé. Le suivi préventif est capital. »",
      },
    ],
  },
];
