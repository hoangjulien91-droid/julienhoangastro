/**
 * Activités Distantes (AD) officielles et exercices d'application pour PST123
 * Enseignante responsable : Mme Élisabeth LUCY (Cnam)
 * PST123 : Le psychologue, le travail et l'emploi (2026 - 2027 Semestre 1)
 * Thème : L'Identité sociale et professionnelle au travail
 */

import type { UnifiedAdItem } from "./ad-common";

export const PST123_AD_DATA: UnifiedAdItem[] = [
  {
    id: "pst123-ad1-dubar",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    moduleColor: "indigo",
    enseignant: "Mme Élisabeth LUCY",
    titre: "AD 1 — Décomposition de la Double Transaction Identitaire (Claude Dubar)",
    dateSeance: "Séance 2 (Socialisation & Claude Dubar)",
    dateLimite: "Avant la séance 3",
    dateCorrige: "Séance 3 (Débriefing collectif)",
    typeTravail: "individuel",
    consigne:
      "À partir du récit de situation professionnelle fourni (ou d'une situation vécue de reconversion / mutation vers les métiers des RH ou de la psychologie du travail), décomposez minutieusement le processus identitaire en articulant les deux transactions fondamentales théorisées par Claude Dubar :\n" +
      "1. La transaction biographique (axe temporel / identité pour soi) : continuité vs rupture entre passé et futur projeté.\n" +
      "2. La transaction relationnelle (axe spatial & social / identité pour autrui) : conformité vs rejet entre actes d'attribution par l'organisation/les pairs et actes d'appartenance revendiqués par le sujet.\n" +
      "3. Conclusion diagnostique : caractérisez la forme identitaire résultante (stabilisée, bloquée, de crise, ou en négociation) et les risques psychiques encourus.",
    contextePedagogique:
      "Pour Claude Dubar (1991, 2000), l'identité n'est jamais une essence psychologique figée ni un simple rôle social intériorisé passivement. Elle est le résultat sans cesse renégocié d'une double transaction : entre ce que le sujet veut être dans le temps (pour soi) et ce que les institutions lui accordent ou lui refusent dans l'espace social (pour autrui).",
    conceptsCles: [
      "Double transaction identitaire",
      "Transaction biographique (axe temporel, pour soi)",
      "Transaction relationnelle (axe social, pour autrui)",
      "Actes d'attribution (étiquetage extérieur)",
      "Actes d'appartenance (revendication subjective)",
      "Formes identitaires (exclusion, blocage, fusion, négociation)",
      "Identité de métier vs identité d'entreprise",
    ],
    auteursAttendus: [
      "Claude Dubar (1991, 'La socialisation : construction des identités sociales et professionnelles')",
      "Erving Goffman (1963, 'Stigmate' et identité sociale virtuelle vs réelle)",
      "Pierre Bourdieu (1982, 'Ce que parler veut dire' & actes d'institution)",
    ],
    pointsVigilance: [
      "Ne pas confondre 'transaction relationnelle' et simple 'bonne entente' : il s'agit d'une reconnaissance de statut et de compétence par autrui.",
      "Ne pas confondre 'transaction biographique' avec un simple CV chronologique : analyser la tension interne entre ce que la personne a été et ce qu'elle aspire à devenir.",
      "Citer expressément les notions d'actes d'attribution et d'actes d'appartenance : ce sont les marqueurs de la copie notée au-dessus de 16/20.",
    ],
    gabaritReponse: `I. CONTEXTE ET ENJEU DU PARCOURS ANALYSÉ
- Présentation synthétique du professionnel et de la transition observée.
- Problématique identitaire : rupture de parcours et épreuve de légitimité.

II. DÉCOMPOSITION DE LA TRANSACTION BIOGRAPHIQUE (AXE DU « POUR SOI »)
- Continuité historique : quelles compétences et valeurs du passé sont conservées ?
- Rupture biographique : quel deuil identitaire l'acteur doit-il accomplir ?
- Projection vers l'avenir : l'identité visée et le projet de soi.

III. DÉCOMPOSITION DE LA TRANSACTION RELATIONNELLE (AXE DU « POUR AUTRUI »)
- Actes d'attribution : comment l'institution, la hiérarchie et les pairs définissent-ils le sujet ?
- Actes d'appartenance : à quel groupe de référence le sujet clame-t-il son appartenance ?
- Tensions et décalages : entre reconnaissance octroyée et étiquetage réducteur.

IV. SYNTHÈSE ET FORME IDENTITAIRE RÉSULTANTE
- Identification de la forme selon la matrice de Dubar (ex: identité d'entreprise bloquée, identité de réseau en négociation...).
- Préconisations ergonomiques et managériales pour accompagner la reconnaissance.`,
    corrigeModel:
      "EXEMPLE DE TRAITEMENT D'EXCELLENCE :\n\n" +
      "1. Transaction Biographique (Axe temporel) :\n" +
      "Le sujet (ex. technicien devenu ergonome) vit une tension aiguë entre sa fidélité à son milieu d'origine d'exécution technique et sa nouvelle posture d'analyste conseil. La transaction biographique réussie suppose qu'il n'efface pas son passé d'opérateur, mais qu'il le requalifie comme une ressource épistémologique (« je connais la réalité physique du travail de terrain »), tout en acceptant la rupture symbolique avec la culture de l'atelier.\n\n" +
      "2. Transaction Relationnelle (Axe social) :\n" +
      "- Actes d'attribution : la direction continue de le solliciter comme un « super-technicien de dépannage » (assignation identitaire subie) et refuse de lui accorder le statut cadre plein.\n" +
      "- Actes d'appartenance : le sujet revendique haut et fort son affiliation au corps des ergonomes / psychologues du travail et s'appuie sur la Société d'Ergonomie de Langue Française (SELF) ou le Code de déontologie.\n" +
      "Le blocage vient du différentiel entre l'attribution descendante et l'appartenance ascendante.\n\n" +
      "3. Conclusion : Forme identitaire de crise avec risque de surmenage et d'isolement par absence de collectif d'accueil.",
    recommandationExamen:
      "À l'examen de PST123, toute question sur l'évolution professionnelle, la reconversion ou le changement technologique doit obligatoirement mobiliser la grille biographique / relationnelle de Dubar avec le schéma croisé.",
    forumMoodleHint: "Déposez votre analyse (environ 400 à 600 mots) dans le fil 'AD2 - Étude de cas Dubar'.",
  },
  {
    id: "pst123-ad2-sainsaulieu",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    moduleColor: "indigo",
    enseignant: "Mme Élisabeth LUCY",
    titre: "AD 2 — Typologie des Relations de Pouvoir et Cultures d'Atelier (Renaud Sainsaulieu)",
    dateSeance: "Séance 3 (L'Identité au travail & Sainsaulieu)",
    dateLimite: "Avant la séance 4",
    dateCorrige: "Séance 4 (Mise en commun)",
    typeTravail: "individuel",
    consigne:
      "À partir d'une situation collective de travail (atelier de production, centre d'appels, service hospitalier, ou cabinet de conseil) :\n" +
      "1. Analysez la structure du pouvoir et les opportunités d'accès au pouvoir offertes par l'organisation du travail.\n" +
      "2. Identifiez le modèle relationnel dominant au sein du collectif selon la typologie de Renaud Sainsaulieu (Fusionnel, Négociateur, Affinitaire, Retrait).\n" +
      "3. Discutez les effets de ce modèle sur la cohésion du groupe, la régulation des conflits et la santé mentale des opérateurs.",
    contextePedagogique:
      "Dans 'L'Identité au travail' (1977), Renaud Sainsaulieu démontre que l'entreprise n'est pas seulement un lieu de production économique, mais une véritable institution de socialisation où les individus font l'apprentissage du pouvoir et de la démocratie. Le modèle relationnel intériorisé par les salariés dépend directement de la marge de négociation que leur laisse le poste de travail.",
    conceptsCles: [
      "Modèle fusionnel (camaraderie protectrice face au chef, absence de différenciation)",
      "Modèle négociateur (solidarité stratégique, débat régulé, forte autonomie)",
      "Modèle affinitaire (cooptation sélective, compétition individualisée, projection de carrière)",
      "Modèle de retrait (désinvestissement affectif, instrumentalisation du salaire, fatalisme)",
      "Apprentissage relationnel du pouvoir",
      "Régulation autonome vs régulation de contrôle (Reynaud)",
    ],
    auteursAttendus: [
      "Renaud Sainsaulieu (1977, 'L'Identité au travail')",
      "Jean-Daniel Reynaud (1989, 'Les Règles du jeu : l'action collective et la régulation sociale')",
      "Michel Crozier et Erhard Friedberg (1977, 'L'Acteur et le Système')",
    ],
    pointsVigilance: [
      "Ne pas réduire les 4 modèles à de simples 'traits de caractère' ou personnalités : ils sont le produit des conditions objectives d'organisation du travail.",
      "Bien montrer que le modèle de retrait n'est pas de la fainéantise, mais une défense psychique face à un travail répétitif et dépourvu de perspectives de carrière.",
    ],
    gabaritReponse: `I. DESCRIPTION DU COLLECTIF ET ORGANISATION DU TRAVAIL
- Nature de l'activité, degré de parcellisation et marges de manœuvre réelles.
- Analyse des lignes hiérarchiques et des zones d'incertitude (Crozier).

II. ANALYSE DES RELATIONS INTERINDIVIDUELLES ET DU RAPPORT AU POUVOIR
- Le rapport au supérieur : allégeance, contestation unie, négociation contractuelle ou fuite ?
- Les relations entre pairs : égalitarisme forcé, rivalité de cooptation, ou isolement ?

III. IDENTIFICATION DU MODÈLE RELATIONNEL DOMINANT DE SAINSAULIEU
- Justification par les critères précis (Fusionnel / Négociateur / Affinitaire / Retrait).
- Éventuelle coexistence de modèles sous-jacents (ex: retrait des précaires vs fusionnel des anciens).

IV. CONSÉQUENCES PRATIQUES ET LEVIERS ERGONOMIQUES
- Risques de conflits ou de décompensation.
- Recommandations pour instituer de véritables espaces de négociation collective.`,
    corrigeModel:
      "REPÈRES POUR LA CORRECTION :\n" +
      "Dans un centre d'appels ultra-prescrit (scripts rigides, écoutes discrètes, minutage des pauses) :\n" +
      "- Modèle dominant : Le Retrait. Les téléconseillers investissent leur vie hors travail (famille, loisirs) et considèrent le travail comme un gagne-pain strictement alimentaire. Les solidarités sont faibles car la machine individualise les flux d'appels.\n" +
      "- Émergence ponctuelle d'un modèle Fusionnel clandestin : pauses clopes complices, partage de ruses contre les algorithmes de surveillance, rejet viscéral des managers.\n" +
      "- Absence totale de modèle Négociateur : aucun lieu légitime pour débattre des règles du métier.",
    recommandationExamen:
      "Classique absolu de l'option B (Étude de situation) : toujours lier Sainsaulieu à la notion d'apprentissage organisationnel et de démocratie d'atelier.",
    forumMoodleHint: "Postez votre synthèse dans l'espace 'AD3 - Les 4 modèles de Sainsaulieu'.",
  },
  {
    id: "pst123-ad3-deonto",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    moduleColor: "indigo",
    enseignant: "Mme Élisabeth LUCY",
    titre: "AD 3 — Dilemme Déontologique : Secret Professionnel et Indépendance Technique",
    dateSeance: "Séance 6 (Histoire, Statut et Déontologie du Psychologue)",
    dateLimite: "Avant la séance de révision",
    dateCorrige: "Séance de révision finale",
    typeTravail: "individuel",
    consigne:
      "Cas pratique : Vous êtes psychologue du travail recruté(e) au sein d'une grande entreprise industrielle en restructuration. La Directrice des Ressources Humaines vous convoque et exige que vous lui transmettiez l'intégralité des comptes-rendus d'entretiens individuels que vous avez menés auprès des salariés en souffrance, ainsi que les scores bruts des questionnaires de stress, afin 'd'aider la direction à cibler les salariés fragiles à reclasser en priorité'.\n\n" +
      "Rédigez la réponse argumentée du psychologue en vous appuyant rigoureusement sur :\n" +
      "1. La Loi n° 85-772 du 25 juillet 1985 (protection du titre et conditions d'exercice).\n" +
      "2. Le Code de Déontologie des Psychologues révisé en 2021 (Articles 1, 5, 7, 9, 11).\n" +
      "3. La distinction juridique entre secret professionnel partagé et secret d'exercice.\n" +
      "4. La formulation d'une proposition alternative respectueuse de l'éthique (restitution globale, anonymisée et collective des conditions de travail).",
    contextePedagogique:
      "Le psychologue du travail se trouve en tension structurelle entre sa subordination contractuelle (salarié de l'entreprise) et son indépendance professionnelle réglementée par la loi et le code. Cette AD prépare directement aux questions juridico-déontologiques incontournables des épreuves du Titre RNCP 7.",
    conceptsCles: [
      "Loi du 25 juillet 1985 (protection du titre de psychologue, détention de la licence et master)",
      "Code de Déontologie 2021 (non opposable pénalement mais référence ordinal/civile)",
      "Article 1 : Respect des droits de la personne et de sa dignité",
      "Article 5 : Autonomie technique et choix des méthodes",
      "Article 7 : Secret professionnel et confidentialité des données",
      "Article 9 : Consentement libre et éclairé du salarié",
      "Secret d'exercice vs secret médical (Article 226-13 du Code Pénal)",
      "Restitution anonymisée des déterminants du travail",
    ],
    auteursAttendus: [
      "Thomas Le Bianic (Sociologie du titre et de la profession de psychologue du travail)",
      "Code de Déontologie des Psychologues de France (version actualisée du 9 septembre 2021)",
      "Loi n° 85-772 du 25 juillet 1985 (Article 44)",
    ],
    pointsVigilance: [
      "Ne pas céder à la menace de faute professionnelle ou d'insubordination : l'autonomie technique du psychologue est sanctuarisée par le code.",
      "Ne jamais transmettre des données individuelles nominatives sous quelque prétexte que ce soit.",
      "Ne pas se contenter d'un refus sec : le psychologue doit être constructif en proposant une restitution sociotechnique collective.",
    ],
    gabaritReponse: `I. RAPPEL DU CADRE LÉGAL ET RÉGLEMENTAIRE
- La Loi du 25 juillet 1985 et l'enregistrement ADELI/RPPS.
- L'Article 226-13 du Code Pénal et le principe absolu du secret professionnel.

II. REFUS MOTIVÉ DES EXIGENCES DE LA DRH AU NOM DU CODE 2021
- Article 7 : Incessibilité et confidentialité des notes personnelles et données brutes.
- Article 5 : Indépendance et autonomie dans le choix et la gestion des outils d'investigation.
- Article 1 & 9 : Préservation de l'alliance thérapeutique et confiance des salariés.

III. PROPOSITION ALTERNATIVE D'ACTION DÉONTOLOGIQUE
- Transformation de la commande : passer de la sélection individuelle à l'analyse ergonomique du travail.
- Restitution d'un rapport collectif anonymisé sur les facteurs de pénibilité et de charge mentale.
- Recommandations organisationnelles pour prévenir les risques psychosociaux.`,
    corrigeModel:
      "ÉLÉMENTS CLÉS DE RÉPONSE D'EXCELLENCE :\n\n" +
      "« Madame la Directrice,\n" +
      "En application de l'Article 44 de la Loi n° 85-772 du 25 juillet 1985 et des Articles 1, 5 et 7 du Code de Déontologie des Psychologues révisé le 9 septembre 2021, je ne puis donner une suite favorable à votre demande de transmission des comptes-rendus individuels d'entretiens et des scores bruts nominatifs.\n" +
      "En effet, le secret professionnel auquel est soumis le psychologue du travail protège avant tout l'intimité et la liberté des salariés rencontrés. Divulguer des données confidentielles constituerait une infraction pénale (Art. 226-13) et détruirait irréversiblement la confiance indispensable à l'exercice de mes missions.\n" +
      "En revanche, conformément à l'Article 5 qui me confère l'autonomie technique de mes conclusions, je vous propose de vous restituer sous quinzaine un rapport de synthèse collectif et anonymisé cartographiant les déterminants organisationnels de la surcharge de travail et formulant des préconisations concrètes d'aménagement ergonomique pour la restructuration. »",
    recommandationExamen:
      "À maîtriser sur le bout des doigts pour l'épreuve de déontologie. Mentionner les numéros d'articles précis (Art. 1, 5, 7, 9) rapporte des points décisifs.",
    forumMoodleHint: "Partagez votre rédaction argumentée dans le forum 'AD5 - Déontologie & Refus motivé'.",
  },
  {
    id: "pst123-ad4-synthese",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    moduleColor: "indigo",
    enseignant: "Mme Élisabeth LUCY",
    titre: "AD 4 — Note de Synthèse : Professionnalisation et Légitimité du Psychologue du Travail",
    dateSeance: "Séance 6 (Professionnalisation & Wittorski)",
    dateLimite: "Avant la clôture du semestre",
    dateCorrige: "Clôture du cours",
    typeTravail: "individuel",
    consigne:
      "Rédigez une note de synthèse universitaire (environ 600 à 800 mots) répondant à la question suivante :\n" +
      "« En quoi le processus de professionnalisation du psychologue du travail se trouve-t-il pris en tension entre l'exigence gestionnaire de compétences (Wittorski) et la conquête d'une légitimité d'expertise autonome (Bourdoncle, Abbott, Le Bianic) ? »\n\n" +
      "Votre note devra impérativement confronter les modèles de la sociologie des professions anglo-saxonne (traits, fonctionnalisme, juridiction) et l'approche française par la formation et l'activité.",
    contextePedagogique:
      "La professionnalisation est un concept polysémique à trois dimensions (professionnalisation des savoirs, de l'organisation, et des individus). Les étudiants au Titre de psychologue du travail doivent comprendre leur propre trajectoire d'institutionnalisation.",
    conceptsCles: [
      "Les 3 sens de la professionnalisation (Wittorski : de l'activité, des acteurs, de l'organisation)",
      "Modèle fonctionnaliste des professions (Parsons)",
      "Modèle interactionniste et de juridiction professionnelle (Andrew Abbott, Hughes)",
      "Savoir d'action vs savoir académique",
      "Tension entre logique de métier (autonomie) et logique d'entreprise (gestion de compétences)",
    ],
    auteursAttendus: [
      "Richard Wittorski (1998, 2007, 'La professionnalisation')",
      "Raymond Bourdoncle (1991, 'La professionnalisation des enseignants')",
      "Thomas Le Bianic (2004, 'La sociologie des psychologues du travail en France')",
      "Andrew Abbott (1988, 'The System of Professions')",
    ],
    pointsVigilance: [
      "Ne pas confondre 'professionnalisation' et simple 'apprentissage sur le tas'.",
      "Bien distinguer la profession comme statut sociologique fermé (Abbott) et le processus continu de professionnalisation (Wittorski).",
    ],
    gabaritReponse: `I. INTRODUCTION ÉPISTÉMOLOGIQUE
- Définition de la professionnalisation : passage du métier à la profession établie.
- Problématique : le psychologue du travail, entre prestataire d'outils RH et tiers de confiance indépendant.

II. LA LOGIQUE GESTIONNAIRE : LA PROFESSIONNALISATION PAR LES COMPÉTENCES (WITTORSKI)
- L'émergence du paradigme de la compétence au détriment de la qualification reconnue.
- La professionnalisation comme outil de flexibilité organisationnelle.

III. LA QUÊTE DE FERMETURE ET DE JURIDICTION PROFESSIONNELLE (ABBOTT, LE BIANIC)
- La bataille pour la réserve de pratique (monopole des bilans, tests et interventions cliniques).
- Le rôle de la formation universitaire et du titre légal (1985) comme rempart contre l'usurpation.

IV. CONCLUSION ET PERSPECTIVES D'EXERCICE
- La posture clinique du psychologue du travail comme garant du sens du travail et de la santé.`,
    corrigeModel:
      "SYNTHÈSE CONCEPTUELLE :\n" +
      "Wittorski distingue la professionnalisation voulue par l'organisation (instrumentalisation des salariés pour répondre à des impératifs de rentabilité) de celle vécue par le sujet (construction de compétences et réflexivité sur l'action).\n" +
      "Dans le cas du psychologue du travail, Thomas Le Bianic montre que la profession s'est construite historiquement par une négociation perpétuelle avec les médecins du travail, les ingénieurs des méthodes et les gestionnaires du personnel. La détention d'une juridiction (Abbott) repose sur sa capacité unique à traduire la souffrance et l'activité réelle en leviers de santé et de performance collective.",
    recommandationExamen:
      "Idéal pour enrichir une introduction ou conclusion de dissertation à l'option A d'examen.",
    forumMoodleHint: "Déposez votre note de synthèse sur le forum final de PST123.",
  },
];
