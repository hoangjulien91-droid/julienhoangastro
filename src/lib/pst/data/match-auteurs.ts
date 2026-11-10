/**
 * Match des Auteurs — Comparateur Dialectique Interactif 1 vs 1
 * Confronter les théories fondamentales sur des situations réelles de travail pour l'examen Cnam.
 */

export interface DuelAuteurs {
  id: string;
  titre: string;
  modules: string[];
  situationTravailReel: string;
  auteurA: {
    nom: string;
    ouvrageConcept: string;
    couleurBadge: string;
    diagnosticSituation: string;
    citationChoc: string;
    preconisationAction: string;
  };
  auteurB: {
    nom: string;
    ouvrageConcept: string;
    couleurBadge: string;
    diagnosticSituation: string;
    citationChoc: string;
    preconisationAction: string;
  };
  critiqueCroisee: string;
  syntheseDialectiqueExamen: string;
  motsClesCopies: string[];
}

export const MATCHS_AUTEURS: DuelAuteurs[] = [
  {
    id: "bourdieu-vs-austin",
    titre:
      "Duel 1 : John Austin vs Pierre Bourdieu — D'où vient la force des mots ?",
    modules: ["pst108", "pst123"],
    situationTravailReel:
      "Lors d'une assemblée générale, le directeur général annonce d'un ton calme : « Conformément aux arbitrages du groupe, 150 postes sont supprimés dès le mois prochain ». Les cadres applaudissent timidement et les syndicats restent sidérés sans répliquer.",
    auteurA: {
      nom: "John Langshaw Austin",
      ouvrageConcept:
        "Quand dire, c'est faire (1962) · Pragmatique linguistique",
      couleurBadge: "#2563eb",
      diagnosticSituation:
        "C'est un acte performatif illocutoire déclaratif. La phrase ne constate pas une réalité antérieure, elle fait advenir un nouvel état du monde par sa force d'énonciation respectant les conditions de félicité conventionnelles de la réunion.",
      citationChoc:
        "« L'acte illocutoire est l'acte que nous accomplissons en disant quelque chose. »",
      preconisationAction:
        "Analyser la structure propositionnelle du discours et les conditions formelles d'énonciation pour restaurer la clarté linguistique.",
    },
    auteurB: {
      nom: "Pierre Bourdieu",
      ouvrageConcept:
        "Ce que parler veut dire (1982) · Sociologie de la domination",
      couleurBadge: "#c25e1a",
      diagnosticSituation:
        "Illusion internaliste ! La phrase n'a aucun pouvoir magique en elle-même. C'est l'autorité statutaire du directeur (Status est magistratus) et le monopole patronal de la violence symbolique qui contraignent l'assemblée à l'obéissance, comme dans le lit de justice monarchique (Sarah Hanley).",
      citationChoc:
        "« Le pouvoir des mots n'est que le pouvoir délégué du porte-parole autorisé. »",
      preconisationAction:
        "Révéler les rapports de forces objectifs du champ économique et désamorcer la violence symbolique intériorisée par les salariés.",
    },
    critiqueCroisee:
      "Bourdieu reproche à Austin d'ignorer les institutions sociales et de croire que le langage agit seul. Austin reprocherait à Bourdieu de dissoudre toute la finesse de l'analyse linguistique dans la seule sociologie du pouvoir.",
    syntheseDialectiqueExamen:
      "En copie de dissertation, la synthèse dialectique pose qu'Austin fournit la boîte à outils descriptive des actes de langage (force illocutoire), tandis que Bourdieu dévoile les conditions sociologiques de félicité qui seules rendent cette parole performative et légitime.",
    motsClesCopies: [
      "Illusion internaliste",
      "Status est magistratus",
      "Acte performatif",
      "Lit de justice (Sarah Hanley)",
      "Marché linguistique",
      "Violence symbolique",
    ],
  },
  {
    id: "habermas-vs-bourdieu",
    titre:
      "Duel 2 : Jürgen Habermas vs Pierre Bourdieu — La communication peut-elle être démocratique ?",
    modules: ["pst108", "pst123"],
    situationTravailReel:
      "La direction générale organise un « séminaire participatif » de deux jours pour moderniser les outils informatiques. Les agents sont invités à s'exprimer sur des post-it, mais les choix logiciels ont déjà été signés avec l'éditeur américain en amont.",
    auteurA: {
      nom: "Jürgen Habermas",
      ouvrageConcept:
        "Théorie de l'agir communicationnel (1981) · Éthique de la discussion",
      couleurBadge: "#2563eb",
      diagnosticSituation:
        "C'est une communication systématiquement déformée et un simulacre d'agir communicationnel. La direction utilise un agir stratégique (orienté vers le succès unilatéral) en mimant l'entente. Les 4 prétentions à la validité (surtout la sincérité et la justesse) sont violées.",
      citationChoc:
        "« Dans la discussion authentique, ne doit régner que la force sans violence du meilleur argument. »",
      preconisationAction:
        "Instaurer de vrais espaces délibératifs régulés par le Principe D, où les salariés peuvent contester les choix techniques et soumettre la décision à l'argumentation rationnelle.",
    },
    auteurB: {
      nom: "Pierre Bourdieu",
      ouvrageConcept:
        "Langage et pouvoir symbolique (2001) · Sociologie critique",
      couleurBadge: "#c25e1a",
      diagnosticSituation:
        "L'éthique de la discussion habermassienne est une fiction idéaliste. Toute interaction sociale est un marché linguistique asymétrique. Les post-it et la fausse bienveillance managériale constituent une stratégie de condescendance symbolique pour extorquer le consentement des dominés.",
      citationChoc:
        "« Tout rapport de communication est, au moins virtuellement, un rapport de force symbolique. »",
      preconisationAction:
        "Cesser de croire à l'illusion d'une parole purement démocratique sans rapports de forces et organiser le contre-pouvoir syndical statutaire.",
    },
    critiqueCroisee:
      "Bourdieu qualifie la situation idéale de parole d'Habermas d'illusion bourgeoise universalisante. Habermas réplique que sans un horizon normatif d'entente, Bourdieu s'enferme dans un scepticisme cynique qui rend toute critique émancipatrice impossible.",
    syntheseDialectiqueExamen:
      "La copie de synthèse démontre que la lucidité bourdieusienne sur les dominations est indispensable pour démasquer les faux dialogues d'entreprise, mais que l'idéal régulateur habermassien reste indispensable comme boussole pour concevoir des institutions démocratiques justes.",
    motsClesCopies: [
      "Agir stratégique vs communicationnel",
      "Verständigung",
      "4 Prétentions à la validité",
      "Stratégie de condescendance",
      "Idéal régulateur",
      "Silence organisationnel",
    ],
  },
  {
    id: "clot-vs-dejours",
    titre:
      "Duel 3 : Yves Clot vs Christophe Dejours — Clinique de l'activité vs Psychodynamique du travail",
    modules: ["pst106", "pst120"],
    situationTravailReel:
      "Dans un centre d'appels téléphoniques, les téléconseillers doivent respecter un script rigide de 120 secondes par client tout en répondant aux réclamations de factures complexes. L'absentéisme et les arrêts maladie pour burn-out explosent.",
    auteurA: {
      nom: "Yves Clot",
      ouvrageConcept: "Le travail à cœur (2010) · Clinique de l'activité",
      couleurBadge: "#3f8159",
      diagnosticSituation:
        "La souffrance naît de l'activité empêchée et du travail nié. Le téléopérateur a le sentiment de faire du « travail bâclé » qui trahit le genre professionnel. Le pouvoir d'agir sur son geste et sur l'organisation est amputé.",
      citationChoc:
        "« Ce qui fait souffrir, ce n'est pas le travail que l'on fait, c'est celui que l'on ne peut pas faire. »",
      preconisationAction:
        "Dispositif d'auto-confrontation croisée : filmer l'activité réelle, faire débattre les téléopérateurs entre eux sur les critères du « travail bien fait » et reconstruire le genre professionnel.",
    },
    auteurB: {
      nom: "Christophe Dejours",
      ouvrageConcept:
        "Souffrance en France (1998) · Psychodynamique du travail",
      couleurBadge: "#7a5aa6",
      diagnosticSituation:
        "C'est une rupture de l'économie pulsionnelle et de la sublimation. Les défenses collectives sont détruites par l'évaluation individualisée. L'absence de jugement de beauté (par les pairs) et d'utilité (par la hiérarchie) prive le salarié de la reconnaissance vitale pour sa santé mentale.",
      citationChoc:
        "« Le travail n'est jamais neutre : il est le médiateur privilégié de la santé mentale ou du désastre psychique. »",
      preconisationAction:
        "Créer des espaces de parole clinique où les salariés peuvent exprimer leur souffrance sans honte et réactiver la coopération et la reconnaissance du travail invisible.",
    },
    critiqueCroisee:
      "Clot reproche à Dejours de se focaliser sur la souffrance et la psyché au détriment de l'objet même du travail (le réel de l'activité). Dejours reproche à Clot de sous-estimer la profondeur des pulsions inconscientes et la dynamique de la sublimation.",
    syntheseDialectiqueExamen:
      "La copie d'examen du Titre RNCP montre que Clot et Dejours sont deux facettes complémentaires de la clinique du travail : Clot soigne l'organisation en redonnant aux salariés le pouvoir d'agir sur le geste bien fait, tandis que Dejours restaure les conditions intersubjectives de la reconnaissance et de la santé mentale.",
    motsClesCopies: [
      "Activité empêchée",
      "Travail bien fait",
      "Genre et style",
      "Sublimation",
      "Jugement d'utilité et de beauté",
      "Défenses collectives",
      "Pouvoir d'agir",
    ],
  },
  {
    id: "dubar-vs-sainsaulieu",
    titre:
      "Duel 4 : Claude Dubar vs Renaud Sainsaulieu — Socialisation identitaire vs Modèles de pouvoir",
    modules: ["pst123"],
    situationTravailReel:
      "Une grande entreprise métallurgique introduit des robots automatisés. Les ouvriers d'atelier chevronnés refusent de collaborer avec les nouveaux jeunes techniciens recrutés et forment un groupe très fermé qui sabote discrètement les cadences.",
    auteurA: {
      nom: "Claude Dubar",
      ouvrageConcept: "La socialisation : construction des identités (1991)",
      couleurBadge: "#0e7c86",
      diagnosticSituation:
        "Crise de la double transaction identitaire. La transaction biographique (identité pour soi héritée d'ouvrier de métier fier) entre en collision avec la transaction relationnelle (identité pour autrui attribuée par la direction : 'inadaptés aux robots'). C'est la forme typique du blocage interne.",
      citationChoc:
        "« L'identité est le résultat de deux transactions : biographique pour soi et relationnelle pour autrui. »",
      preconisationAction:
        "Négocier des passerelles de reconnaissance et de conversion des compétences pour réconcilier l'identité héritée et l'identité visée sans disqualification.",
    },
    auteurB: {
      nom: "Renaud Sainsaulieu",
      ouvrageConcept:
        "L'Identité au travail (1977) · Sociologie des organisations",
      couleurBadge: "#bc8526",
      diagnosticSituation:
        "C'est la dynamique typique du modèle fusionnel ! Privés de pouvoir technique individuel face aux robots, les ouvriers recourent à l'unanimisme de bande contre la hiérarchie et les nouveaux techniciens. Le collectif compense leur impuissance organisationnelle.",
      citationChoc:
        "« L'entreprise est une matrice de socialisation culturelle et d'apprentissage du pouvoir. »",
      preconisationAction:
        "Reconfigurer la marge d'autonomie et le pouvoir de négociation technique des ouvriers sur les machines pour leur permettre d'évoluer vers un modèle négociateur démocratique.",
    },
    critiqueCroisee:
      "Dubar reproche à Sainsaulieu de trop figer les modèles dans la seule structure de l'entreprise en oubliant la trajectoire biographique longue du sujet. Sainsaulieu reproche à Dubar d'évacuer l'apprentissage politique concret du pouvoir au poste de travail.",
    syntheseDialectiqueExamen:
      "La copie articule le temps long de la biographie (Dubar : d'où vient le salarié, quel est son héritage) et le temps court de la situation organisationnelle (Sainsaulieu : quelle marge de pouvoir le poste lui accorde-t-il ici et maintenant).",
    motsClesCopies: [
      "Double transaction",
      "Identité pour soi / pour autrui",
      "Blocage interne",
      "Modèle fusionnel",
      "Modèle négociateur",
      "Apprentissage du pouvoir",
    ],
  },
  {
    id: "honneth-vs-castel",
    titre:
      "Duel 5 : Axel Honneth vs Robert Castel — Reconnaissance morale vs Droit commun salarial",
    modules: ["pst108", "pst123"],
    situationTravailReel:
      "Un jeune sans domicile fixe en grande précarité refuse de signer un contrat d'insertion obligatoire pour continuer à percevoir une allocation de 400 € par mois, jugeant les ateliers de remobilisation 'humiliants et inutiles'.",
    auteurA: {
      nom: "Axel Honneth",
      ouvrageConcept:
        "La société du mépris (2006) · Théorie de la reconnaissance",
      couleurBadge: "#0d9488",
      diagnosticSituation:
        "Ce refus est une réaction de sauvegarde de l'intégrité morale. L'atelier d'insertion est vécu comme une blessure morale de mépris social (sphère 3) : il traite l'individu comme un assisté défaillant plutôt que comme un sujet dont on reconnaît la dignité et l'utilité.",
      citationChoc:
        "« Les luttes sociales sont d'abord motivées par des sentiments moraux d'injustice et d'atteinte à la dignité. »",
      preconisationAction:
        "Bâtir la relation sur une inter-reconnaissance authentique (écouter le désir du sujet, respecter son prénom, valoriser son regard sur le monde).",
    },
    auteurB: {
      nom: "Robert Castel",
      ouvrageConcept:
        "Les métamorphoses de la question sociale (1995) · Désaffiliation",
      couleurBadge: "#7c3aed",
      diagnosticSituation:
        "C'est la conséquence de l'individualisation des droits et de la contractualisation léonine. Le jeune subit la désaffiliation (décrochage conjoint de l'emploi et des réseaux sociaux). Le contraindre à prouver son employabilité en échange de subsides est une forme de charité musclée.",
      citationChoc:
        "« Le contrat individuel impose au plus faible de négocier ce qui devrait être un droit garanti par la société des semblables. »",
      preconisationAction:
        "Garantir l'accès direct et inconditionnel au travail de droit commun et au statut salarial protecteur sans mise à l'épreuve psychologisante préalable (démarche IOD).",
    },
    critiqueCroisee:
      "Castel craint que la reconnaissance honnethienne ne devienne un substitut psychologique doux à la véritable protection sociale juridique. Honneth réplique que le statut salarial sans reconnaissance affective et communautaire produit une existence vide et réifiée.",
    syntheseDialectiqueExamen:
      "La synthèse idéale démontre que l'émancipation des publics précaires exige à la fois la protection du statut salarial de droit commun (Castel) et l'expérience intersubjective vivante de l'estime sociale et de la dignité (Honneth).",
    motsClesCopies: [
      "Désaffiliation",
      "Contrat léonin",
      "Charité musclée",
      "Société des semblables",
      "3 Sphères de reconnaissance",
      "Mépris social",
    ],
  },
  {
    id: "valls-vs-employabilite",
    titre:
      "Duel 6 : Francis Valls (Méthode IOD) vs L'Idéologie de l'Employabilité",
    modules: ["pst108"],
    situationTravailReel:
      "Une agence de travail temporaire propose à un allocataire du RSA de faire un bilan de compétences de 6 semaines, puis un stage de coaching vocal pour apprendre à 'se vendre' face aux recruteurs du secteur tertiaire.",
    auteurA: {
      nom: "L'Approche Classique de l'Employabilité",
      ouvrageConcept:
        "Paradigme dominant de l'insertion par le ciblage déficitaire",
      couleurBadge: "#64748b",
      diagnosticSituation:
        "Le chômage prolongé est le signe d'un manque individuel de compétences, de motivation ou de posture professionnelle. Le rôle de l'insertion est de 'remettre à niveau' le candidat pour l'adapter aux exigences du marché de l'emploi.",
      citationChoc:
        "« Chacun est l'entrepreneur de sa propre employabilité et doit s'adapter en continu. »",
      preconisationAction:
        "Multiplier les bilans, les simulations d'entretiens et les remises à niveau psychologiques avant d'autoriser la rencontre avec un patron.",
    },
    auteurB: {
      nom: "Francis Valls & Denis Castra",
      ouvrageConcept: "L'insertion malgré tout (2007) · Méthode IOD",
      couleurBadge: "#7c3aed",
      diagnosticSituation:
        "C'est une machine à fabriquer de l'exclusion et à détruire l'estime de soi ! La sur-préparation infantilisante enferme l'usager dans un statut de malade social et avertit négativement les patrons. Toute personne est prête à l'emploi ordinaire sans passer par le purgatoire des stages.",
      citationChoc:
        "« L'insertion ne consiste pas à adapter sans fin l'exclu, mais à agir directement sur le milieu de travail. »",
      preconisationAction:
        "Refuser le tri et le coaching déficitaire. Décrocher une offre d'emploi réelle en entreprise, adapter les conditions du poste de travail et y positionner directement la personne sans mise en concurrence.",
    },
    critiqueCroisee:
      "L'approche classique accuse IOD de ne pas former les candidats. IOD réplique que la formation sans poste réel est un leurre qui produit la désespérance, et que c'est le travail réel en situation qui forme véritablement l'adulte.",
    syntheseDialectiqueExamen:
      "Pour l'examen PST108, valoriser le saut épistémologique de Francis Valls : déplacer l'intervention de l'individu déficitaire vers l'entreprise et négocier l'offre d'emploi sans tri préalable.",
    motsClesCopies: [
      "Méthode IOD",
      "Francis Valls",
      "Ciblage déficitaire",
      "Refus du tri préalable",
      "Non-mise en concurrence",
      "Action sur l'offre d'emploi",
      "Robert Castel",
    ],
  },
  {
    id: "dejours-vs-molinier",
    titre:
      "Duel 7 : Christophe Dejours vs Pascale Molinier — Souffrance & Sublimation vs Travail du Care & Idéologie Virile",
    modules: ["pst120"],
    situationTravailReel:
      "Dans un service d'oncologie pédiatrique en sous-effectif, les infirmières enchaînent des gardes de 12 heures. L'équipe médicale masque son angoisse par des blagues cyniques et des conduites de bravade (« nous on tient, on n'est pas des faibles »), tout en refoulant la charge émotionnelle des fins de vie.",
    auteurA: {
      nom: "Christophe Dejours",
      ouvrageConcept:
        "Souffrance en France (1998) & Travail vivant (2009) · Psychodynamique du travail",
      couleurBadge: "#7a5aa6",
      diagnosticSituation:
        "C'est la faillite de la sublimation collective. L'impossibilité d'obtenir une reconnaissance de la souffrance éthique (jugement de beauté des pairs, jugement d'utilité hiérarchique) brise l'économie pulsionnelle et conduit droit à la décompensation somatique et au désespoir professionnel.",
      citationChoc:
        "« Ce qui transforme la souffrance en plaisir et en santé, c'est l'exercice de l'intelligence pratique (la mêtis) validée par la reconnaissance des pairs. »",
      preconisationAction:
        "Ouvrir un espace de délibération clinique sur le travail vivant pour libérer la parole sur l'invisibilité du soin et restaurer des défenses collectives saines.",
    },
    auteurB: {
      nom: "Pascale Molinier",
      ouvrageConcept:
        "Les métamorphoses du travail du care (2006) · Clinique et éthique du care",
      couleurBadge: "#e11d48",
      diagnosticSituation:
        "Diagnostic d'idéologie défensive virile et d'invisibilisation du 'travail du care' ! La bravade et l'anesthésie affective sont des constructions viriles pour dénier la vulnérabilité. Mais elles finissent par maltraiter les soignantes elles-mêmes en étouffant leur sollicitude clinique authentique.",
      citationChoc:
        "« L'idéologie virile protège contre la peur mais mutile la compassion et interdit l'aveu de la souffrance. »",
      preconisationAction:
        "Nommer et légitimer le travail émotionnel du 'care', rompre avec le culte de l'endurance héroïque et réorganiser les plannings pour accorder un temps institutionnel aux relations humaines.",
    },
    critiqueCroisee:
      "Molinier reproche à Dejours une vision initialement trop androcentrée et héroïque de la mêtis masculine. Dejours salue l'apport de Molinier sur la face sombre des défenses collectives (qui peuvent dégénérer en maltraitance collective par conformisme).",
    syntheseDialectiqueExamen:
      "En dissertation de PST120, la copie articulera la dynamique pulsionnelle et sublimatoire de Dejours avec l'éthique féministe et clinique du care de Molinier pour analyser comment les collectifs résistent à la violence gestionnaire.",
    motsClesCopies: [
      "Idéologie défensive virile",
      "Travail du care",
      "Souffrance éthique",
      "Sublimation",
      "Économie pulsionnelle",
      "Maltraitance organisationnelle",
      "Mêtis",
    ],
  },
  {
    id: "rabardel-vs-davis",
    titre:
      "Duel 8 : Pierre Rabardel & Bobillier-Chaumon vs Fred Davis — Genèse Instrumentale & Usages Situés vs Modèle TAM",
    modules: ["pst124"],
    situationTravailReel:
      "La direction déploie une application mobile de compte-rendu d'intervention pour 200 techniciens de maintenance. Six mois plus tard, le taux d'utilisation est inférieur à 30 %, les techniciens continuant d'utiliser leurs vieux carnets papier et des fichiers WhatsApp non sécurisés.",
    auteurA: {
      nom: "Fred Davis",
      ouvrageConcept:
        "Technology Acceptance Model (TAM, 1989) · Psychologie cognitive de l'usager",
      couleurBadge: "#64748b",
      diagnosticSituation:
        "Déficit d'utilité perçue (PU) ou de facilité d'utilisation perçue (PEOU). L'intention d'usage de l'individu isolé n'a pas été suffisamment stimulée. La résistance au changement provient d'un manque de formation technique ou d'un défaut ergonomique de l'interface.",
      citationChoc:
        "« L'acceptation dépend principalement de la croyance en l'utilité du système et de sa facilité perçue d'utilisation. »",
      preconisationAction:
        "Améliorer l'UX design, dispenser des formations obligatoires et conditionner une prime d'objectifs au remplissage de l'application.",
    },
    auteurB: {
      nom: "Pierre Rabardel & M.-É. Bobillier-Chaumon",
      ouvrageConcept:
        "Les Hommes et les Technologies (1995) & Acceptation Située (2016)",
      couleurBadge: "#0891b2",
      diagnosticSituation:
        "Impasse du déterminisme technologique ! L'application n'est qu'un artefact externe imposé. La 'résistance' n'est pas un refus d'apprendre mais une régulation vitale : le carnet papier et WhatsApp sont des catachrèses ingénieuses maintenant la fluidité de l'activité réelle et l'entraide de métier face aux lenteurs du logiciel prescrit.",
      citationChoc:
        "« L'instrument est une construction du sujet qui émerge dans et par l'activité réelle : il ne s'impose jamais par décret. »",
      preconisationAction:
        "Co-concevoir les évolutions de l'outil avec les techniciens, intégrer les 4 dimensions de l'acceptation située (utilité réelle, utilisabilité, intégration collective et sens identitaire) et légitimer les régulations informelles.",
    },
    critiqueCroisee:
      "Rabardel et Bobillier-Chaumon démontrent que le TAM est une vision technocentrée et individualiste qui ignore le travail réel. Davis objecterait que le TAM offre une mesure statistique prédictive rapide pour les décideurs industriels.",
    syntheseDialectiqueExamen:
      "Pour PST124, opposer systématiquement l'acceptabilité a priori (TAM technocentré) à l'acceptation située a posteriori (Rabardel/Bobillier-Chaumon anthropocentré) pour valoriser la genèse instrumentale et le pouvoir d'agir.",
    motsClesCopies: [
      "Artefact vs Instrument",
      "Genèse instrumentale",
      "Catachrèse",
      "Acceptation située vs TAM",
      "Déterminisme technologique",
      "Activité médiatisée",
    ],
  },
  {
    id: "vygotski-vs-piaget",
    titre:
      "Duel 7 : Jean Piaget vs Lev Vygotski — Le langage égocentrique : immaturité asociale ou instrument de la pensée ?",
    modules: ["pst108", "pst106"],
    situationTravailReel:
      "Dans une agence bancaire, un conseiller clientèle débutant fait face à un dossier de prêt complexe bloqué par le logiciel. Isolé devant son écran, il murmure à mi-voix : « Attends, si je bascule sur la caution mutuelle, je contourne le taux d'usure... non, reprends le calcul du reste à vivre d'abord ». Le chef d'agence le surprend et lui reproche un manque de maturité et d'assurance professionnelle.",
    auteurA: {
      nom: "Jean Piaget",
      ouvrageConcept:
        "Le Langage et la pensée chez l'enfant (1923) · Structuralisme génétique",
      couleurBadge: "#2563eb",
      diagnosticSituation:
        "C'est la résurgence d'un langage égocentrique. Chez l'adulte mûr, la pensée formelle est autonome et silencieuse ; ce monologue à voix haute est le reflet d'une difficulté d'équilibration des schèmes logiques où l'opérateur peine à se décentrer face à la contrainte réglementaire.",
      citationChoc:
        "« La pensée précède le langage : le langage égocentrique est le reflet d'une pensée non décentrée, voué à disparaître avec la socialisation. »",
      preconisationAction:
        "Renforcer la formation technique individuelle pour stabiliser l'exercice des schèmes déductifs et éliminer ce comportement verbal compensatoire.",
    },
    auteurB: {
      nom: "Lev Vygotski & Yves Clot",
      ouvrageConcept:
        "Pensée et langage (1934) & Le Travail à cœur (2010)",
      couleurBadge: "#d97706",
      diagnosticSituation:
        "Brillante démonstration de la fonction de régulation cognitive du langage ! Face à l'obstacle (comme dans l'expérience des crayons de couleur), l'opérateur réactive le langage égocentrique pour orienter son raisonnement et planifier son action. Loin d'une immaturité, c'est l'instrument psychologique suprême qui médiatise la résolution du problème réel.",
      citationChoc:
        "« Le langage ne se contente pas d'accompagner l'activité : il est un instrument de raisonnement qui s'intériorise en langage intérieur. »",
      preconisationAction:
        "Mettre en place une autoconfrontation croisée entre pairs : réextérioriser ce dialogue intérieur sous forme de dispute professionnelle et de coopération conflictuelle pour refonder collectivement les critères d'octroi du crédit.",
    },
    critiqueCroisee:
      "Vygotski démontre que Piaget commet l'erreur d'isoler le sujet et de réduire le langage à un reflet passif de la pensée. Piaget objecterait que Vygotski subordonne excessivement le développement cognitif aux médiations socio-historiques au détriment de l'autorégulation endogène du sujet.",
    syntheseDialectiqueExamen:
      "Pour l'examen de PST108 et PST106, mobiliser Vygotski pour fonder la clinique du dialogue : le langage intérieur adulte est le produit de dialogues sociaux intériorisés. L'intervention clinique (Clot) réextériorise ce dialogue en controverse réglée pour régénérer le pouvoir d'agir.",
    motsClesCopies: [
      "Langage égocentrique",
      "Langage intérieur",
      "Loi génétique générale",
      "Interpsychologique vs Intrapsychologique",
      "Expérience des crayons de couleur",
      "Instrument psychologique",
      "« Transformer pour comprendre »",
      "Coopération conflictuelle",
    ],
  },
  {
    id: "lahy-vs-wisner",
    titre:
      "Duel 10 : Jean-Maurice Lahy vs Alain Wisner — Métrologie des aptitudes vs Ergonomie de l'activité réelle",
    modules: ["pst123", "pst106"],
    situationTravailReel:
      "Un réseau de transport urbain constate une recrudescence d'accidents et d'arrêts maladie chez les conducteurs de bus sur les nouvelles lignes à voie dédiée. La direction propose de durcir les tests psychotechniques de sélection à l'embauche pour écarter les profils 'vulnérables ou lents'.",
    auteurA: {
      nom: "Jean-Maurice Lahy",
      ouvrageConcept:
        "La sélection des conducteurs de tramway (1908) · Psychotechnique",
      couleurBadge: "#2563eb",
      diagnosticSituation:
        "La sécurité repose sur la conformité des aptitudes psychophysiologiques au poste : temps de réaction sensorimoteurs, champ visuel, attention sélective et résistance nerveuse. Si les accidents augmentent, c'est que les tests d'embauche ne filtrent pas assez rigoureusement les sujets inaptes.",
      citationChoc:
        "« L'adaptation scientifique du travailleur à sa machine passe par la mesure exacte de ses facultés physiologiques et de ses temps de réaction. »",
      preconisationAction:
        "Étalonner une batterie de tests psychotechniques standardisés (simulateurs, tests psychomoteurs) pour sélectionner strictement 'The right man in the right place'.",
    },
    auteurB: {
      nom: "Alain Wisner",
      ouvrageConcept:
        "Réflexions sur l'ergonomie (1995) · Ergonomie de l'activité (Cnam)",
      couleurBadge: "#d97706",
      diagnosticSituation:
        "Erreur épistémologique fondamentale ! Le problème ne vient pas des faiblesses individuelles des conducteurs mais de l'écart intolérable entre la tâche prescrite (horaires intenables, feux non synchronisés, surpopulation aux arrêts) et l'activité réelle. L'organisation transfère sur le corps et le psychisme des agents le coût d'une conception défaillante.",
      citationChoc:
        "« Ce n'est pas à l'homme de s'adapter au travail par sélection, c'est au travail d'être adapté à l'homme par l'analyse de l'activité réelle. »",
      preconisationAction:
        "Réaliser une analyse ergonomique du travail réel en cabine de conduite, concerter les conducteurs sur les aléas de circulation et transformer la cadence prescrite et la synchronisation des voies dédiées.",
    },
    critiqueCroisee:
      "Wisner reproche à Lahy et aux psychotechniciens de réduire l'opérateur à une machine réactive décontextualisée et de faire de la sélection un instrument de tri patronal ('sélection = élimination'). Lahy objecterait que certaines exigences physiologiques objectives de sécurité publique ne peuvent être ignorées.",
    syntheseDialectiqueExamen:
      "Pour l'examen de PST123 et PST106, ce duel symbolise le grand basculement historique de la chaire du Cnam : le passage du paradigme psychotechnique (adapter l'homme au poste) à l'ergonomie et la clinique de l'activité (transformer le travail réel pour préserver la santé et le pouvoir d'agir).",
    motsClesCopies: [
      "Jean-Maurice Lahy",
      "Alain Wisner",
      "Psychotechnique (1908)",
      "Tâche prescrite vs Activité réelle",
      "The right man in the right place",
      "Sélection vs Transformation du travail",
      "Épreuve du réel",
      "Ergonomie francophone du Cnam",
    ],
  },
  {
    id: "hochschild-vs-dejours",
    titre:
      "Duel 11 : Arlie Russell Hochschild vs Christophe Dejours — Travail Émotionnel & Façade Prescrite vs Psychodynamique & Résonance Symbolique",
    modules: ["pst123", "pst106", "pst120"],
    situationTravailReel:
      "Dans un service d'accueil et de relation client d'une grande caisse de retraite, la direction impose un script minuté avec « sourire obligatoire » et écoute téléphonique enregistrée. Les agents constatent une vague d'arrêts maladie pour burn-out et des crises de larmes répétées dès qu'un usager élève la voix.",
    auteurA: {
      nom: "Arlie Russell Hochschild",
      ouvrageConcept: "The Managed Heart (1983) — Le Travail Émotionnel",
      couleurBadge: "#7c3aed",
      diagnosticSituation:
        "Les salariées subissent une exploitation marchande de leur subjectivité : le 'travail émotionnel' (Emotional Labor) les force à façonner une façade affective factice. La dissonance entre leurs émotions réelles et le sourire prescrit produit un épuisement psychique et une aliénation de soi.",
      citationChoc:
        "« Le travail émotionnel vend l'âme au service du profit en transformant les sentiments privés en marchandise organisationnelle. »",
      preconisationAction:
        "Réduire la prescription des attitudes affectives, autoriser l'expression des difficultés émotionnelles et cesser l'évaluation punitive sur les critères de sourire ou d'enthousiasme forcé.",
    },
    auteurB: {
      nom: "Christophe Dejours",
      ouvrageConcept: "Travail, usure mentale (1993) — Résonance Symbolique & Défenses",
      couleurBadge: "#0284c7",
      diagnosticSituation:
        "L'organisation prive les agents des défenses collectives de métier indispensables pour métaboliser la violence de l'usager. De plus, la situation active une 'résonance symbolique' aiguë : la contrainte managériale réveille des scènes d'impuissance infantile passées non élaborées.",
      citationChoc:
        "« Quand le travail est empêché de faire tiers, la scène professionnelle devient le réceptacle sauvage des blessures narcissiques de la scène personnelle. »",
      preconisationAction:
        "Ouvrir des espaces de délibération collective pour débattre des règles de métier, restaurer le jugement de beauté entre pairs et réintroduire le tiers-travail pour dialectiser les résonances subjectives.",
    },
    critiqueCroisee:
      "Hochschild reproche à Dejours de sous-estimer la dimension genrée et marchande de l'aliénation émotionnelle prescrite. Dejours objecterait à Hochschild que la régulation des affects ne se limite pas à un rôle théâtral aliénant : le travail demeure l'opérateur fondamental de construction de l'identité et de médiation pulsionnelle.",
    syntheseDialectiqueExamen:
      "Pour l'examen de PST123, ce duel permet de croiser sociologie américaine du travail émotionnel (intégrée au rapport Gollac) et psychodynamique française du Cnam : la santé exige à la fois la fin de l'injonction d'un masque émotionnel factice et la reconstruction d'un collectif de métier protecteur.",
    motsClesCopies: [
      "Arlie Russell Hochschild",
      "Christophe Dejours",
      "Travail Émotionnel (Emotional Labor)",
      "Façade émotionnelle prescrite",
      "Résonance symbolique",
      "Tiers-travail",
      "Défenses collectives de métier",
      "Rapport Gollac (2011)",
      "Aliénation subjective",
    ],
  },
  {
    id: "match-12-dejours-vs-clot",
    modules: ["pst123"],
    titre: "Duel 12 : Christophe Dejours vs Yves Clot — Les 'Frères Ennemis' du Cnam",
    situationTravailReel:
      "Dans une entreprise de logistique automatisée, les préparateurs de commandes disposent d'un casque à commande vocale (voice picking) guidant chaque pas à la seconde. Face aux erreurs de lecture du système et aux cadences intenables, plusieurs opérateurs s'effondrent en pleurs ou entrent dans des colères noires contre les chefs, pendant que d'autres s'isolent totalement.",
    auteurA: {
      nom: "Christophe Dejours",
      ouvrageConcept: "Travail, usure mentale (1980 / 1993) — Psychodynamique du Travail",
      couleurBadge: "#0284c7",
      diagnosticSituation:
        "L'organisation managériale détruit les défenses collectives et nie le don de soi des salariés. Le réel se fait connaître par l'échec permanent imposé par la commande vocale. Privés de reconnaissance d'utilité et surtout de beauté par les pairs, les opérateurs ne peuvent plus sublimer leur souffrance et basculent dans la décompensation narcissique.",
      citationChoc:
        "« Travailler, c'est mobiliser son intelligence corporelle et sa subjectivité pour faire face à ce que le prescrit n'a pas prévu. Sans jugement de beauté des pairs, la souffrance devient destructrice. »",
      preconisationAction:
        "Créer des espaces de délibération collective fondés sur la libre association de parole pour restaurer les défenses collectives et faire reconnaître la réalité du travail invisible par la hiérarchie.",
    },
    auteurB: {
      nom: "Yves Clot",
      ouvrageConcept: "Le Travail sans l'homme ? (1995) — Clinique de l'Activité",
      couleurBadge: "#16a34a",
      diagnosticSituation:
        "La souffrance ne provient pas d'une vulnérabilité pulsionnelle mais de la 'qualité empêchée'. Le guidage algorithmique détruit le genre professionnel (les astuces de métier partagées) et interdit le déploiement du style singulier. Les opérateurs sont forcés de bâcler les colis, ce qui confisque leur pouvoir d'agir et détruit le sens du métier.",
      citationChoc:
        "« L'activité est un drame : elle déborde l'action. Ce qui rend malade, ce n'est pas le travail en soi, c'est le travail ni fait ni à faire, l'interdiction de faire du beau travail. »",
      preconisationAction:
        "Organiser des sessions d'autoconfrontations simples et croisées sur support vidéo pour remettre en débat les critères du travail bien fait et relancer la vitalité collective du genre professionnel.",
    },
    critiqueCroisee:
      "Clot reproche à Dejours de rester prisonnier d'une conception défensive et individualisante de l'économie psychique freudienne, réduisant le travail à un lieu de compromis pathologique au lieu de penser le développement du pouvoir d'agir. Dejours rétorque à Clot que son culte de l'activité instrumentée élude la question fondamentale de l'amour propre, de la subjectivité et des jugements de reconnaissance.",
    syntheseDialectiqueExamen:
      "Pour l'examen de PST123 (Dr. Lutumba), ce duel est la pierre d'angle théorique : il est formellement interdit d'amalgamer ces deux géants du Cnam. Le clinicien averti sait articuler la reconnaissance de la subjectivité (Dejours) et la restauration du pouvoir d'agir sur le métier (Clot).",
    motsClesCopies: [
      "Christophe Dejours",
      "Yves Clot",
      "Frères ennemis du Cnam",
      "Épreuve du réel",
      "Qualité empêchée",
      "Genre vs Style professionnels",
      "Sublimation et Jugement de beauté",
      "Pouvoir d'agir",
      "Autoconfrontation simple et croisée",
    ],
  },
];

export const MATCH_AUTEURS = MATCHS_AUTEURS;
