export interface SujetIntroPrecharge {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "pst120" | "pst124" | "transversal";
  titre: string;
  enonce: string;
  accrocheExemple: string;
  definitionsExemple: string;
  paradoxeExemple: string;
  problematiqueExemple: string;
  annoncePlanExemple: string;
}

export const SUJETS_INTRO_BANQUE: SujetIntroPrecharge[] = [
  {
    id: "s1",
    moduleKey: "pst106",
    titre: "Écart Tâche / Activité & Qualité du Travail",
    enonce:
      "« Si le travailleur se contentait d'appliquer les consignes prescrites, l'organisation s'effondrerait. » Analysez les fonctions psychologiques et productives de l'écart entre le travail prescrit et le travail réel.",
    accrocheExemple:
      "À l'heure où les démarches qualité et la traçabilité algorithmique prétendent normer le moindre geste productif, les dysfonctionnements quotidiens rappellent l'illusion d'une maîtrise absolue de l'organisation sur le vivant du travail.",
    definitionsExemple:
      "Alain Wisner a fondé l'analyse ergonomique sur la distinction cardinale entre la 'tâche prescrite' (l'ensemble des buts, cadences et procédures fixés par l'entreprise) et l'activité réelle' (l'engagement cognitif, corporel et subjectif de l'opérateur pour accomplir cette tâche face aux aléas).",
    paradoxeExemple:
      "Dès lors surgit un paradoxe fécond : alors que le management perçoit souvent l'écart à la consigne comme une anomalie ou une faute à corriger, l'observation montre que cet écart est la condition sine qua non de la réussite productive et de la préservation de la santé mentale de l'opérateur.",
    problematiqueExemple:
      "Dans quelle mesure l'écart irréductible entre prescrit et réel constitue-t-il non un défaut de conformité, mais le lieu même où se fabriquent simultanément l'ingéniosité productive et le pouvoir d'agir des travailleurs ?",
    annoncePlanExemple:
      "Nous analyserons dans un premier temps l'écart prescrit/réel comme un compromis opératoire indispensable à la régulation productive (Leplat & Hoc, Wisner). Puis, nous démontrerons dans un second temps que le déni gestionnaire de cet écart contrarie l'activité et détruit la ressource vitale du genre professionnel (Clot).",
  },
  {
    id: "s2",
    moduleKey: "pst108",
    titre: "Reconnaissance et Mépris Social au Travail",
    enonce:
      "En quoi le déni de reconnaissance dans les organisations modernes constitue-t-il une atteinte à l'intégrité psychique des salariés ?",
    accrocheExemple:
      "L'intensification du travail contemporain et la démultiplication des métriques de performance s'accompagnent paradoxalement d'un sentiment diffus mais grandissant d'invisibilisation chez les professionnels de tous secteurs.",
    definitionsExemple:
      "Pour Axel Honneth, la reconnaissance n'est pas une simple flatterie individuelle, mais une exigence morale et intersubjective conditionnant la dignité du sujet à travers les sphères de l'amour, du droit et de l'estime sociale. Christophe Dejours en précise la double valence opératoire : le jugement d'utilité (hiérarchique) et le jugement de beauté (pairs).",
    paradoxeExemple:
      "Le paradoxe des organisations gestionnaires actuelles réside dans leur injonction permanente à 'l'implication totale' des salariés, alors même que les mécanismes de reporting chiffré dénient la réalité humaine des arbitrages consentis.",
    problematiqueExemple:
      "Comment le déni de reconnaissance de l'apport subjectif bascule-t-il en mépris social destructeur de l'estime de soi, contraignant les collectifs à forger des défenses psychiques au prix de leur propre santé ?",
    annoncePlanExemple:
      "Nous étudierons d'abord la dynamique intersubjective de la reconnaissance comme socle de l'identité et de la sublimation (Honneth, Dejours). Nous mettrons ensuite en évidence comment l'idéologie gestionnaire fabrique une souffrance éthique que les collectifs tentent d'endiguer par des pactes dénégatifs (Gaulejac, Kaës).",
  },
  {
    id: "s3",
    moduleKey: "pst123",
    titre: "Double Transaction Identitaire & Modèles de Pouvoir",
    enonce:
      "« L'identité au travail n'est jamais donnée d'emblée, elle se négocie dans l'épreuve des relations de pouvoir. » Discutez cette affirmation à partir des apports de Dubar et de Sainsaulieu.",
    accrocheExemple:
      "La précarisation des statuts, les restructurations à répétition et l'automatisation des métiers bousculent en profondeur les repères séculaires qui permettaient aux individus de répondre avec certitude à la question 'qui suis-je professionnellement ?'.",
    definitionsExemple:
      "Claude Dubar conçoit l'identité comme le produit d'une double transaction : biographique (pour soi dans le temps) et relationnelle (pour autrui dans l'espace des institutions). Renaud Sainsaulieu démontre pour sa part que l'entreprise est un lieu d'apprentissage culturel où l'identité se forge selon l'accès réel au pouvoir sur le poste.",
    paradoxeExemple:
      "La tension centrale tient à ce que l'institution prétend assigner des identités statutaires unilatérales, alors que les acteurs sociaux ne cessent de subvertir ou de négocier ces étiquettes à travers leurs actes d'appartenance et leurs solidarités d'atelier.",
    problematiqueExemple:
      "En quoi la construction de l'identité professionnelle résulte-t-elle d'un arbitrage permanent entre la fidélité à son histoire personnelle et l'épreuve des rapports de force organisationnels ?",
    annoncePlanExemple:
      "Nous analyserons en premier lieu la matrice de la double transaction de Dubar articulant revendications pour soi et attributions institutionnelles. Nous verrons en second lieu comment Sainsaulieu décline cette dialectique en 4 modèles culturels de pouvoir au travail.",
  },
  {
    id: "s4-120",
    moduleKey: "pst120",
    titre: "Normalité Souffrante, Souffrance Éthique & Care",
    enonce:
      "Comment l'organisation gestionnaire transforme-t-elle la souffrance normale au travail en souffrance éthique pathogène, et pourquoi le travail de care demeure-t-il socialement invisibilisé ?",
    accrocheExemple:
      "Derrière la vitrine lisse des indicateurs de performance et des certifications qualité, la multiplication des effondrements psychiques chez des salariés pourtant réputés « performants » interroge le coût humain du maintien de la normalité au travail.",
    definitionsExemple:
      "Christophe Dejours définit la 'normalité souffrante' comme un équilibre précaire conquis par la mobilisation de stratégies collectives de défense et par la dynamique de reconnaissance (jugements d'utilité et de beauté). Pascale Molinier élargit cette clinique en théorisant le 'care' comme un travail d'attention aux vulnérabilités reposant sur des habiletés discrètes.",
    paradoxeExemple:
      "Le paradoxe tient à ce que l'évaluation individualisée des performances prétend stimuler l'excellence individuelle, alors qu'elle détruit en réalité la coopération horizontale et pousse les sujets à trahir les règles de leur métier (souffrance éthique), tout en niant les savoir-faire relationnels du care assimilés à une qualité féminine naturelle.",
    problematiqueExemple:
      "Dans quelle mesure la destruction gestionnaire des espaces de délibération et l'aveuglement viril face au care bloquent-ils le processus de sublimation, transformant une souffrance potentiellement créatrice en impasse psychopathologique ?",
    annoncePlanExemple:
      "Nous montrerons d'abord que la transformation de la souffrance en santé exige la reconnaissance de l'intelligence pratique (Mètis) au sein d'un collectif délibérant (Dejours). Nous analyserons ensuite les impasses de la souffrance éthique et de l'invisibilisation genrée des habiletés du care (Molinier).",
  },
  {
    id: "s5-124",
    moduleKey: "pst124",
    titre: "Genèse Instrumentale & Acceptation Située des Technologies",
    enonce:
      "Pourquoi le déploiement d'un outil numérique ou d'une IA ne se réduit-il jamais à son acceptabilité a priori, mais engage-t-il une genèse instrumentale et une clinique de l'usage ?",
    accrocheExemple:
      "Chaque année, de nombreux projets d'ERP ou d'intelligence artificielle pourtant validés par des tests d'ergonomie en laboratoire se heurtent sur le terrain à des contournements massifs que les directions qualifient hâtivement de « résistance au changement ».",
    definitionsExemple:
      "Pierre Rabardel distingue radicalement l'artefact (l'objet technique prescrit) de l'instrument, qui n'advient qu'au terme d'une genèse instrumentale couplant instrumentation (adaptation des schèmes du sujet) et instrumentalisation (adaptation de l'artefact). Marc-Éric Bobillier-Chaumon conceptualise quant à lui l'acceptation située à l'épreuve du réel du travail.",
    paradoxeExemple:
      "Or, un paradoxe majeur oppose les modèles prédictifs nord-américains (TAM/UTAUT), centrés sur un utilisateur isolé évaluant l'outil a priori, et la réalité clinique où un outil techniquement fluide peut s'avérer profondément incapacitant s'il ampute le pouvoir d'agir et disloque le collectif de métier (Engeström).",
    problematiqueExemple:
      "À quelles conditions méthodologiques et organisationnelles un artefact numérique imposé peut-il être approprié comme un instrument capacitant au service du développement de l'activité et du métier ?",
    annoncePlanExemple:
      "Nous dépasserons dans une première partie l'illusion de l'acceptabilité a priori en analysant la genèse instrumentale et les contradictions du système d'activité (Rabardel, Engeström). Nous déploierons dans une seconde partie les quatre dimensions de l'acceptation située et le dispositif de conception continuée dans l'usage (Bobillier-Chaumon).",
  },
];
