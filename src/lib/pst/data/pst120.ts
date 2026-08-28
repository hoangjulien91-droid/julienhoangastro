/**
 * Bases de données pour le module PST120.
 * Extrait automatiquement de src/pages/pst120.astro.
 */

export const A = {
  precurseurs: "Précurseurs (1950s)",
  dejours: "Dejours (Psychodynamique)",
  molinier: "Molinier (Genre & Care)",
  management: "Management & Organisation",
  sante: "Chemin de la Santé",
  pathologie: "Chemin de la Pathologie",
};

export const FICHES = [
  {
    a: "precurseurs",
    t: "Séance 1 : Les précurseurs de la psychopathologie",
    ess: "<h5>Héritage d'après-guerre</h5><p>Travaux fondateurs de <b>Louis Le Guillant</b>, <b>Paul Sivadon</b> et <b>Claude Veil</b>. Ils étudient pour la première fois les atteintes de la santé mentale liées directement à la fatigue et à la contrainte industrielle.</p><h5>L'étude clinique situationnelle : La « bonne à tout faire »</h5><p>Louis Le Guillant étudie la condition des employées de maison (souvent issues de familles nombreuses de Bretagne, isolées, sous-payées, subissant une aliénation relationnelle et temporelle). Suite à l'affaire criminelle des <b>sœurs Papin</b> en 1933, il analyse ce rapport de subordination asymétrique et pathogène (« maître/esclave ») où l'humiliation et la solitude omniprésente brisent le lien social, intériorisant le maître et favorisant le délire à deux.</p>",
    ph: "Louis Le Guillant étudie la névrose des traminots, des dactylographes et la névrose situationnelle de la « bonne à tout faire » (Affaire Papin, 1933).",
    ex: "Analyse de la surcharge psychique et de l'isolement social des employées domestiques face au rapport de domination de leurs maîtres.",
    trap: "Croire que la psychopathologie classique se limite aux usines tayloriennes : Le Guillant a fondé la clinique des situations de travail avec les employées de maison.",
  },
  {
    a: "dejours",
    t: "Séance 2 : Le basculement vers la psychodynamique",
    ess: "<h5>Changement de paradigme</h5><p><b>Christophe Dejours</b> opère un renversement clinique majeur. La question n'est plus d'expliquer la maladie, mais de comprendre : <i>\"Pourquoi la plupart des gens ne tombent-ils pas malades malgré la souffrance ?\"</i>.</p><h5>Normalité souffrante</h5><p>L'équilibre mental au travail n'est pas un état de repos naturel. C'est une <b>lutte défensive active</b> et permanente déployée par le sujet pour ne pas sombrer face aux contraintes.</p>",
    ph: "La santé au travail est une conquête psychique permanente.",
    ex: 'Le salarié qui \"tient le coup\" en développant un cynisme partagé avec son équipe face à un management toxique.',
    trap: "Penser que la normalité souffrante signifie l'absence complète de souffrance : elle est au contraire habitée par la souffrance.",
  },
  {
    a: "dejours",
    t: "Séance 3 : L'énigme du travail réel et la souffrance",
    ess: "<h5>Gestionnaire vs Subjectif</h5><p>Confrontation de la <b>logique prescriptive</b> (gestionnaire, métrique, procédures strictes) face à l'<b>expérience vécue</b> (la subjectivité confrontée à la matière).</p><h5>Destin de la souffrance</h5><p>Le travail est l'épreuve du réel (ce qui résiste à la règle). Cette confrontation produit une souffrance inévitable. Elle devient <b>créatrice</b> si elle est sublimée et reconnue, ou <b>pathogène</b> si elle reste bloquée et sans recours.</p>",
    ph: "Le travail réel commence là où la prescription échoue.",
    ex: "L'infirmière qui doit réconforter un patient en détresse émotionnelle alors que la procédure prescrite ne mesure que l'acte technique.",
    trap: "Confondre le travail réel avec la simple désobéissance aux règles : l'écart est nécessaire pour que la production fonctionne.",
  },
  {
    a: "dejours",
    t: "Séance 4 : L'intelligence en situation de travail (La Métis)",
    ess: "<h5>La Métis</h5><p>Intelligence pratique, rusée et incorporée. C'est l'ingéniosité du corps et de l'esprit déployée pour contourner les règles inadaptées et faire fonctionner le système.</p><h5>Sécurité et Peur</h5><p>La Métis exige un climat de sécurité psychique pour se manifester. La peur de la sanction, les évaluations individuelles et le flicage détruisent cette créativité.</p>",
    ph: "La Métis est l'intelligence de la ruse face au réel qui résiste.",
    ex: "L'ouvrier métallurgiste qui ajuste la pression de la presse à l'oreille en dérogation de l'écran numérique pour éviter la casse.",
    trap: 'Exit le concept de \"style professionnel\" d\'Yves Clot pour parler de la Métis dans ta copie.',
  },
  {
    a: "dejours",
    t: "Séance 5 : De la coordination à la coopération",
    ess: "<h5>Coordination vs Coopération</h5><p>La <b>coordination</b> est prescrite par l'organigramme (qui fait quoi). La <b>coopération</b> est subjective et volontaire : c'est le vouloir travailler ensemble et élaborer des règles communes.</p><h5>Confiance et risques</h5><p>Coopérer exige de faire confiance et de prendre des risques psychiques. Elle est aujourd'hui sabotée par le management par le chiffre et les évaluations individualisées.</p>",
    ph: "La coopération ne s'ordonne pas, elle se construit sur la confiance.",
    ex: "Une équipe de mineurs qui coordonne ses gestes par procédure mais qui coopère pour s'entraider dans les galeries dangereuses.",
    trap: "Ne jamais parler de \"coopération\" comme d'un simple travail d'équipe mécanique ou de coordination.",
  },
  {
    a: "dejours",
    t: "Séance 6 : L'Espace déontique et la délibération",
    ess: "<h5>Espace de délibération</h5><p>Lieu (souvent informel ou conquis) où la parole circule librement sur les difficultés du travail réel. C'est là que le collectif élabore les règles du travail soigné.</p><h5>L'espace déontique</h5><p>La construction commune de l'éthique professionnelle : \"comment fait-on du bon travail ici ?\". Sans cet espace, le collectif se dissout et la violence s'installe.</p>",
    ph: "La parole sur le travail réel est le ciment de la coopération.",
    ex: "Le quart d'heure de discussion informel autour du café où les artisans partagent leurs échecs et s'accordent sur les finitions.",
    trap: 'Exit le terme \"dialogue sur les règles du genre\" d\'Yves Clot. Parle de \"délibération dans l\'espace déontique\".',
  },
  {
    a: "dejours",
    t: "Séance 7 : La dynamique de la reconnaissance et la sublimation",
    ess: "<h5>Le salaire psychique</h5><p>La reconnaissance est le seul processus capable de transformer la souffrance du travail en plaisir et en santé mentale. Elle permet la <b>sublimation</b>.</p><h5>Les deux jugements</h5><p>Elle exige : 1) Le <b>jugement d'utilité</b> (porté par la hiérarchie ou les usagers sur la valeur économique/technique). 2) Le <b>jugement de beauté</b> (porté par les pairs sur le respect des règles de l'art).</p>",
    ph: "La reconnaissance transmute la souffrance en accomplissement de soi.",
    ex: "Un enseignant fatigué dont l'ingéniosité pédagogique est saluée par ses collègues (beauté) et dont l'impact est validé par les parents (utilité).",
    trap: "Ne pas oublier que sans reconnaissance, la sublimation échoue et le sujet glisse vers la décompensation.",
  },
  {
    a: "molinier",
    t: "Séance 8 : Division sexuelle du travail et Care",
    ess: "<h5>Dépasser l'essentialisme</h5><p>Les travaux de <b>Pascale Molinier</b> démontrent que la division du travail (virilité masculine vs sollicitude féminine) n'est pas biologique mais sociale.</p><h5>Invisibilisation du Care</h5><p>Le travail du care (soin, écoute, attention) est structurellement invisibilisé et naturalisé. Les hommes et les femmes construisent des stratégies défensives sexuées pour supporter leur souffrance spécifique.</p>",
    ph: "Le care est un travail réel, exigeant une Métis fine et souvent invisible.",
    ex: "Les aides à domicile dont l'écoute et la patience sont traitées par l'institution comme de \"simples qualités naturelles\" et non comme des compétences de travail.",
    trap: 'Ne pas utiliser les stéréotypes de genre comme des \"natures\" mais comme des constructions sociales défensives.',
  },
  {
    a: "molinier",
    t: "Séance 9 : Articulation Travail et Hors-travail",
    ess: "<h5>La contamination</h5><p>Les stratégies défensives construites pour survivre au travail ne s'arrêtent pas aux portes de l'entreprise. Elles débordent et <b>contaminent</b> l'espace privé.</p><h5>Porosité destructrice</h5><p>L'anesthésie de la souffrance au travail (ex. froideur érigée en système de défense chez les chirurgiens ou militaires) se répercute sur les relations familiales et conjugales.</p>",
    ph: "La rigidité défensive professionnelle s'importe dans la vie affective.",
    ex: "Un cadre supérieur habitué à l'évaluation froide de ses subordonnés qui traite ses enfants avec la même métrique et le même manque d'empathie.",
    trap: "Croire que la sphère familiale est un abri hermétique contre la violence organisationnelle du travail.",
  },
  {
    a: "management",
    t: "Séance 10 : L'échec de la reconnaissance et les défenses",
    ess: "<h5>Destruction de la coopération</h5><p>Lorsque le management moderne impose l'évaluation individuelle, la confiance s'effondre. La reconnaissance devient impossible.</p><h5>Idéologie collective de défense</h5><p>Pour supporter la souffrance, le collectif met en place des stratégies de déni ou de bravade (cynisme, hyper-activisme, idéalisation du risque) afin d'anesthésier la pensée.</p>",
    ph: "L'idéologie défensive collective protège l'esprit au prix d'un aveuglement.",
    ex: "Les traders qui banalisent le risque financier extrême à travers des rituels d'hyper-consommation et de bravade permanente.",
    trap: "Croire que les défenses collectives suppriment la souffrance : elles ne font que la rendre muette et tolérable temporairement.",
  },
  {
    a: "management",
    t: "Séance 11 : Souffrance éthique et banalisation du mal",
    ess: "<h5>Souffrance éthique</h5><p>Souffrance qui survient lorsqu'un sujet est contraint, par son travail, de prêter son concours à des actes qu'il réprouve moralement.</p><h5>Banalisation du mal</h5><p>Le sujet doit désactiver sa sensibilité morale pour conserver son emploi. C'est un vecteur puissant de déstructuration de l'identité et de psychopathologie.</p>",
    ph: "La souffrance éthique naît du compromis moral forcé par l'organisation.",
    ex: "Un conseiller bancaire contraint de vendre des crédits toxiques à des retraités vulnérables pour atteindre ses objectifs de fin de mois.",
    trap: "Ne pas confondre souffrance éthique (liée à la morale) et souffrance physique liée à la pénibilité.",
  },
  {
    a: "management",
    t: "Séance 12 : Le suicide au travail et la décompensation",
    ess: "<h5>La décompensation</h5><p>Le moment de rupture où les défenses individuelles et collectives s'effondrent sous le poids de la solitude. Banalisé par peur ou déni collectif, le suicide au travail reste tabou.</p><h5>L'analyse clinique du suicide (Dejours)</h5><p>Pour Dejours, le suicide n'est pas le fruit direct de l'organisation mais de la <b>déstructuration du vivre-ensemble et des solidarités collectives</b> (délitement du soutien, disparition de l'entraide). Banaliser le suicide ou ne pas réagir accroît le danger pour tout le collectif. Face au drame, Dejours préconise une <b>démarche compréhensive paritaire</b> reposant sur une totale confiance, l'analyse collective, et des délibérations animées par un tiers externe formé.</p>",
    ph: "Le suicide signe le délitement des solidarités collectives et de la reconnaissance (Dejours).",
    ex: "Enquête post-suicide comprenant des entretiens individuels/collectifs pour faire émerger la signification partagée du geste pour le métier.",
    trap: "Ne pas imputer le suicide à une fragilité purement individuelle : c'est le retrait des conditions sociales de préservation de la santé mentale qui tue.",
  },
  {
    a: "management",
    t: "Séance 13 : Pathologies du chômage et de la retraite",
    ess: "<h5>Le chômage</h5><p>Amputation de la socialisation et désubjectivation. Le chômage prive le sujet du terrain indispensable à la sublimation et à l'inscription sociale.</p><h5>La retraite</h5><p>Crise identitaire majeure pour ceux qui avaient investi toute leur dynamique de construction de soi dans la sphère professionnelle, sans transition possible.</p>",
    ph: "La privation de travail désorganise la structure temporelle et psychique du sujet.",
    ex: "Un ouvrier à la retraite qui perd ses repères temporels quotidiens et glisse dans une dépression mélancolique par manque de relais sublimatoire.",
    trap: "Croire que la retraite est toujours vécue comme une libération heureuse.",
  },
  {
    a: "management",
    t: "Séance 14 : La méthodologie d'intervention (L'Enquête)",
    ess: "<h5>La démarche clinique</h5><p>L'enquête en psychodynamique repose uniquement sur le recueil de la parole collective. Pas de vidéo (contrairement à Clot). Elle suit des étapes strictes.</p><h5>Trame de l'intervention</h5><p>Demande paritaire (CHSCT) ➔ Pré-enquête (entretiens exploratoires) ➔ Enquête en groupes homogènes (volontaires de même métier) ➔ Rédaction du rapport ➔ Validation collective (les salariés valident/amendent) ➔ Restitution publique.</p>",
    ph: "L'enquête psychodynamique vise à ré-instituer l'espace de délibération.",
    ex: "Une intervention clinique menée auprès d'éboueurs pour élaborer collectivement leur souffrance face au mépris social et à la pénibilité.",
    trap: "Interdiction de mentionner l'autoconfrontation croisée ou l'usage de la vidéo dans cette méthodologie.",
  },
  {
    a: "management",
    t: "Séance 15 : Ordre singulier, ordre collectif et débat théorique",
    ess: "<h5>La place du travail dans l'articulation singulier / collectif</h5><p>Le travail est le lieu où s'articulent l'<b>ordre singulier</b> (l'histoire intime du sujet, son désir, sa subjectivité) et l'<b>ordre collectif</b> (les règles de métier, l'organisation, le social). La psychodynamique fait du travail le <b>médiateur central</b> entre la construction de soi et l'appartenance au collectif.</p><h5>Théorie du sujet vs théorie de la société</h5><p>Cette articulation soulève un <b>problème théorique</b> majeur&nbsp;: comment tenir ensemble une <b>théorie du sujet</b> (héritée de la psychanalyse, centrée sur le désir et l'inconscient) et une <b>théorie de la société</b> (centrée sur les rapports sociaux, la domination, l'organisation)&nbsp;? La psychodynamique du travail assume cette tension plutôt que de réduire l'un à l'autre&nbsp;: le sujet n'est ni pur produit social, ni monade isolée.</p>",
    ph: "Le travail articule ordre singulier (le sujet) et ordre collectif (la société) sans réduire l'un à l'autre.",
    ex: "Un cadre qui négocie en permanence entre sa conception personnelle du « bon travail » (singulier) et les règles du collectif et de l'organisation (collectif).",
    trap: "Réduire le sujet à un pur effet de la société (sociologisme) ou ignorer le social au profit du seul psychisme (psychologisme).",
  },
  {
    a: "dejours",
    t: "Séance 16 : Les mécanismes de défense du Moi (racines psychanalytiques)",
    ess: "<h5>Anna Freud et la défense</h5><p><b>Anna Freud</b> définit la <b>défense</b> comme une activité du Moi destinée à protéger le sujet contre une trop grande exigence pulsionnelle (et, dans la cure, dans le transfert). Pour <b>Bibring, Lagache et Bergeret</b>, ces mécanismes visent la <b>réduction de la tension pulsionnelle</b> et assurent l'<b>adaptation</b> du sujet à sa réalité ; utilisés de façon banale, ils ne sont pas pathologiques.</p><h5>Le catalogue des défenses</h5><p><b>Refoulement</b> (maintenir hors conscience une représentation inacceptable) ; <b>isolation</b> (séparer la représentation de son affect) ; <b>projection</b> (attribuer à autrui ses propres contenus — elle signe un échec du refoulement) ; <b>déplacement</b> ; <b>retournement contre soi</b> (l'agressivité dirigée vers l'intérieur) ; <b>retour du refoulé</b> (lapsus, actes manqués, symptômes) ; <b>déni / dédoublement du Moi</b> ; <b>sublimation</b> (dérivation vers une activité valorisée).</p><h5>Lien avec Dejours</h5><p>Ces défenses <b>individuelles</b> (psychanalyse) sont la racine des <b>stratégies défensives collectives</b> de la psychodynamique : le collectif construit des défenses partagées (idéologies défensives) pour tenir face à la souffrance.</p>",
    ph: "La défense est une activité du Moi pour réduire la tension pulsionnelle (Anna Freud).",
    ex: "Le déni collectif du danger chez des ouvriers du bâtiment prolonge, au plan du collectif, des défenses individuelles comme le refoulement ou le retournement contre soi.",
    trap: "Confondre les défenses individuelles (Anna Freud, Moi) et les stratégies défensives collectives (Dejours) : les secondes sont sociales et partagées.",
  },
];

export const KW_DEFS = {
  "psychopathologie du travail":
    "Discipline étudiant les rapports entre organisation du travail et troubles mentaux.",
  "le guillant":
    "Louis Le Guillant, psychiatre pionnier de la psychopathologie du travail (névrose des téléphonistes).",
  sivadon:
    "Paul Sivadon, psychiatre promoteur de l'ergothérapie et de la réadaptation par le travail.",
  taylorisé:
    "Travail rationalisé scientifiquement, caractérisé par la division extrême des tâches.",
  parcellaire:
    "Tâche découpée en opérations simples et répétitives sans vision globale du produit.",
  "névrose des téléphonistes":
    "Syndrome d'épuisement mental lié au rythme et à la répétitivité du travail des opératrices.",
  "bonne à tout faire":
    "Étude situationnelle par Le Guillant montrant l'aliénation mentale induite par la subordination domestique absolue.",
  "sœurs Papin":
    "Affaire criminelle de 1933 analysée par Le Guillant comme l'effet extrême d'une pathologie situationnelle d'aliénation domestique.",
  ergonomie:
    "Étude scientifique de la relation entre l'être humain et ses moyens de travail.",
  wisner:
    "Alain Wisner, fondateur de l'ergonomie de l'activité en France (différence tâche/activité).",
  prescrite:
    "La tâche telle qu'elle est définie à l'avance par l'organisation (les consignes).",
  réelle:
    "L'activité telle qu'elle est concrètement réalisée par le travailleur pour faire face au réel.",
  "re-normalisation":
    "Activité créative du travailleur pour réadapter les consignes face aux aléas de la situation.",
  dejours: "Christophe Dejours, fondateur de la psychodynamique du travail.",
  souffrance:
    "Sentiment éprouvé lorsque le sujet se heurte à la résistance du réel du travail.",
  "stratégies défensives":
    "Mécanismes collectifs ou individuels élaborés pour masquer ou endurer la souffrance au travail.",
  déni: "Mécanisme consistant à occulter activement un risque ou une souffrance pour pouvoir continuer.",
  virilité:
    "Stratégie défensive collective masculine valorisant le risque et interdisant la plainte.",
  utilité:
    "Jugement validant la pertinence économique ou technique du travail par l'organisation ou les clients.",
  beauté:
    "Jugement de conformité du travail aux règles de l'art par les pairs du collectif.",
  molinier:
    "Pascale Molinier, chercheuse ayant introduit la perspective féministe et du care en psychodynamique.",
  féminin:
    "Relatif à la place et à l'invisibilisation des travailleuses dans les théories classiques du travail.",
  care: "Travail de souci d'autrui, d'écoute et de soin, indispensable mais souvent invisible.",
  culpabilité:
    "Sentiment de faute fréquent chez les soignants ou professionnels du care face aux manques de moyens.",
  discrétion:
    "Qualité requise dans le care pour préserver la dignité du bénéficiaire, contribuant à son invisibilité.",
  gestionnarisation:
    "Introduction massive d'indicateurs comptables et de critères financiers pour piloter le travail.",
  npm: "New Public Management, transposition des méthodes du privé au secteur public (performances, indicateurs).",
  "évaluation individualisée":
    "Mesure quantitative et individuelle des performances, détruisant la solidarité.",
  collectifs:
    "Groupes de pairs structurés partageant des règles professionnelles communes de métier.",
  injonctifs:
    "Objectifs irréalistes imposés de manière descendante sans débat sur les moyens réels.",
  "souffrance éthique":
    "Douleur ressentie quand un travailleur doit accomplir des actes qu'il réprouve moralement.",
  sublimation:
    "Transformation de la pulsion ou de la souffrance en une réalisation sociale et créative valorisée.",
};

export const PARCOURS = [
  {
    id: "comprendre",
    title: "1. Comprendre",
    fenetre: "J-30 → J-21",
    desc: "Saisir la psychopathologie du travail, le basculement psychodynamique et la clinique du care.",
    onglets: [
      ["fiches", "Fiches"],
      ["recits", "Récits"],
      ["lexique", "Lexique"],
    ],
    items: [
      "Lire les fiches éclair",
      "Parcourir les récits d'auteurs",
      "Découvrir la névrose des téléphonistes",
    ],
  },
  {
    id: "memoriser",
    title: "2. Mémoriser",
    fenetre: "J-20 → J-11",
    desc: "Ancrer les concepts de Dejours et Molinier dans sa mémoire de travail.",
    onglets: [
      ["cartes", "Cartes (Leitner)"],
      ["cloze", "Citations"],
      ["qui", "Qui a dit quoi"],
    ],
    items: [
      "Activer la révision espacée (Leitner)",
      "Faire les citations à trous",
      'Réussir "Qui a dit quoi" > 80%',
    ],
  },
  {
    id: "entrainer",
    title: "3. S'entraîner",
    fenetre: "J-10 → J-4",
    desc: "Déceler les pathologies et tenir la posture d\'intervention clinique.",
    onglets: [
      ["qcm", "QCM"],
      ["cas", "Cas cliniques"],
      ["simulateur", "Simulateur"],
    ],
    items: [
      "Valider le QCM complet > 85%",
      "Résoudre les cas guidés",
      "Terminer le simulateur d'intervention",
    ],
  },
  {
    id: "produire",
    title: "4. Produire",
    fenetre: "J-3 → J-1",
    desc: "Se confronter au format de l\'examen final.",
    onglets: [
      ["atelier", "Atelier d'écriture"],
      ["antiseche", "Antisèche"],
      ["examen", "Examen Blanc"],
    ],
    items: [
      "Faire 2 plans de dissertation",
      "Imprimer / relire l'antisèche",
      "Faire l'examen blanc complet",
    ],
  },
];

export const RECITS = [
  {
    a: "precurseurs",
    ic: "🕰️",
    t: "L'héritage des précurseurs : psychopathologie du travail",
    sub: "Le Guillant, Sivadon et la naissance de la discipline",
    parts: [
      {
        beat: "Origines :",
        html: "La <span class='kw'>psychopathologie du travail</span> naît après la Seconde Guerre mondiale avec les travaux pionniers de <span class='kw'>Le Guillant</span> et <span class='kw'>Sivadon</span>.",
      },
      {
        beat: "Le constat :",
        html: "Ils mettent en évidence le lien direct entre les conditions de travail, notamment le travail <span class='kw'>taylorisé</span> ou <span class='kw'>parcellaire</span>, et l'apparition de troubles psychiques.",
      },
      {
        beat: "Cas cliniques :",
        html: "Si la <span class='kw'>névrose des téléphonistes</span> illustre la fatigue nerveuse industrielle, l'étude sur la <span class='kw'>bonne à tout faire</span> (suite aux crimes des <b>sœurs Papin</b> en 1933) révèle la <b>clinique des situations de travail</b> : solitude subie, aliénation domestique et intériorisation psychique de la subordination au maître.",
      },
      {
        beat: "Évolution :",
        html: "Plus tard, l'<span class='kw'>ergonomie</span> de langue française avec <span class='kw'>Wisner</span> insiste sur la différence fondamentale entre la tâche <span class='kw'>prescrite</span> et l'activité <span class='kw'>réelle</span>. L'activité est toujours une <span class='kw'>re-normalisation</span> face à l'imprévu.",
      },
    ],
  },
  {
    a: "dejours",
    ic: "🛡️",
    t: "La psychodynamique du travail",
    sub: "Christophe Dejours : Souffrance, défense et reconnaissance",
    parts: [
      {
        beat: "Nouveau paradigme :",
        html: "Christophe <span class='kw'>Dejours</span> fonde la psychodynamique du travail en déplaçant la question : 'pourquoi les travailleurs ne deviennent-ils pas tous fous ?'.",
      },
      {
        beat: "Expérience du réel :",
        html: "Il introduit le concept central de <span class='kw'>souffrance</span> comme expérience inévitable de la rencontre avec le réel (ce qui résiste à la maîtrise).",
      },
      {
        beat: "Mécanismes :",
        html: "Face à cette souffrance, les collectifs élaborent des <span class='kw'>stratégies défensives</span> (comme le <span class='kw'>déni</span> du risque ou la <span class='kw'>virilité</span> défensive).",
      },
      {
        beat: "Résolution :",
        html: "Le passage de la souffrance au plaisir nécessite la reconnaissance, qui passe par deux jugements : le jugement d'<span class='kw'>utilité</span> (par la hiérarchie) et le jugement de <span class='kw'>beauté</span> (par les pairs).",
      },
    ],
  },
  {
    a: "molinier",
    ic: "🤝",
    t: "La clinique du travail féminin",
    sub: "Pascale Molinier et le travail de care",
    parts: [
      {
        beat: "Critique :",
        html: "Pascale <span class='kw'>Molinier</span> critique l'androcentrisme de la psychodynamique initiale et met en lumière l'invisibilisation du travail <span class='kw'>féminin</span>.",
      },
      {
        beat: "Objet d'étude :",
        html: "Elle étudie notamment le travail de <span class='kw'>care</span> (prendre soin), qui exige une implication subjective intense souvent naturalisée comme une simple qualité 'féminine'.",
      },
      {
        beat: "Défenses spécifiques :",
        html: "Elle démontre que les stratégies défensives des femmes s'organisent souvent autour de la <span class='kw'>culpabilité</span> ou du surinvestissement affectif.",
      },
      {
        beat: "Paradoxe :",
        html: "Le travail de care implique une <span class='kw'>discrétion</span> nécessaire pour préserver la dignité du bénéficiaire, mais qui conduit paradoxalement à un manque de reconnaissance sociale et salariale.",
      },
    ],
  },
  {
    a: "management",
    ic: "📊",
    t: "Management contemporain et pathologies",
    sub: "NPM, évaluation individualisée et souffrance éthique",
    parts: [
      {
        beat: "Le tournant :",
        html: "Les formes modernes de management, comme la <span class='kw'>gestionnarisation</span> ou le <span class='kw'>NPM</span> (New Public Management), introduisent l'<span class='kw'>évaluation individualisée</span> des performances.",
      },
      {
        beat: "Conséquences :",
        html: "Cela détruit les <span class='kw'>collectifs</span> de métier et la coopération. Les travailleurs sont confrontés à des objectifs <span class='kw'>injonctifs</span> et contradictoires (qualité vs rentabilité).",
      },
      {
        beat: "L'impasse :",
        html: "Ceci génère de la <span class='kw'>souffrance éthique</span>. Lorsque le sujet doit agir à l'encontre de ses propres valeurs professionnelles, le risque pathologique augmente.",
      },
      {
        beat: "Décompensation :",
        html: "L'épuisement, le burn-out ou la dépression marquent l'échec de la <span class='kw'>sublimation</span>. À l'extrême, le suicide sur le lieu de travail n'est pas causé directement par l'organisation, mais par la dissolution du vivre-ensemble et des solidarités collectives.",
      },
    ],
  },
];

export const QCM_DATA = [
  {
    q: "Quelle est la question centrale posée par Christophe Dejours en psychodynamique ?",
    opts: [
      "Pourquoi le travail rend-il malade ?",
      "Pourquoi la plupart des travailleurs ne tombent-ils pas malades malgré la souffrance ?",
      "Comment adapter au mieux le travail à l'homme physique ?",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Dejours renverse le paradigme classique en étudiant comment la santé résiste à la souffrance.",
  },
  {
    q: "Par quoi s'exprime le jugement de beauté dans la dynamique de reconnaissance ?",
    opts: [
      "Par l'évaluation annuelle de la hiérarchie",
      "Par les primes et récompenses financières de l'entreprise",
      "Par le regard des pairs sur le respect des règles de l'art",
    ],
    correct: 2,
    exp: "<b>Bonne réponse.</b> Le jugement de beauté est l'apanage exclusif des pairs sur la conformité aux règles du métier.",
  },
  {
    q: "Qui sont les précurseurs de la psychopathologie du travail (après-guerre) ?",
    opts: [
      "Le Guillant, Sivadon et Veil",
      "Dejours, Molinier et Clot",
      "Taylor, Mayo et Friedmann",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Louis Le Guillant, Paul Sivadon et Claude Veil étudient les atteintes psychiques liées à la contrainte industrielle.",
  },
  {
    q: "Que désigne la « normalité souffrante » chez Dejours ?",
    opts: [
      "Un état de repos et d'absence de souffrance",
      "Un équilibre conquis par une lutte défensive active contre la souffrance",
      "Une pathologie mentale de bas niveau",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La normalité n'est pas l'absence de souffrance mais une conquête psychique permanente.",
  },
  {
    q: "Le travail réel se définit comme :",
    opts: [
      "La tâche prescrite par les procédures",
      "Ce qui résiste à la prescription et oblige à un écart pour produire",
      "La simple désobéissance aux règles",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le réel est l'épreuve de ce qui résiste : l'écart à la prescription est nécessaire pour que ça fonctionne.",
  },
  {
    q: "Qu'est-ce que la Métis ?",
    opts: [
      "Une procédure formelle de sécurité",
      "Une intelligence pratique, rusée et incorporée face au réel",
      "Le style professionnel théorisé par Yves Clot",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La Métis est l'ingéniosité du corps et de l'esprit. Attention au piège : ne pas la confondre avec le « style » de Clot.",
  },
  {
    q: "Quelle distinction est exacte ?",
    opts: [
      "La coordination est subjective, la coopération est prescrite",
      "La coordination est prescrite (organigramme), la coopération est volontaire et se construit sur la confiance",
      "Coordination et coopération sont synonymes",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La coopération ne s'ordonne pas : elle suppose confiance et prise de risque psychique.",
  },
  {
    q: "À quoi sert l'espace de délibération (espace déontique) ?",
    opts: [
      "À fixer les objectifs chiffrés individuels",
      "À élaborer collectivement les règles du travail bien fait",
      "À évaluer la performance de chaque salarié",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> C'est le lieu où le collectif construit l'éthique professionnelle : « comment fait-on du bon travail ici ? ».",
  },
  {
    q: "Les deux jugements de la reconnaissance sont :",
    opts: [
      "Le jugement d'utilité et le jugement de beauté",
      "Le jugement moral et le jugement esthétique",
      "Le jugement de la hiérarchie et celui des clients uniquement",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Utilité (hiérarchie/usagers) et beauté (pairs). Sans eux, la sublimation échoue.",
  },
  {
    q: "La reconnaissance permet de transformer la souffrance en :",
    opts: [
      "Décompensation",
      "Plaisir et accomplissement de soi (sublimation)",
      "Indifférence",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La reconnaissance est le « salaire psychique » qui rend la sublimation possible.",
  },
  {
    q: "Selon Pascale Molinier, la division sexuelle du travail est :",
    opts: [
      "Une donnée biologique naturelle",
      "Une construction sociale qui invisibilise le care",
      "Un simple effet du hasard organisationnel",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Molinier dépasse l'essentialisme : le care est un travail réel, exigeant et socialement invisibilisé.",
  },
  {
    q: "Que désigne la contamination travail / hors-travail (séance 9) ?",
    opts: [
      "Le débordement des stratégies défensives professionnelles dans la vie privée",
      "Une infection au sens médical",
      "Le fait de ramener du travail à la maison le soir",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Les défenses (ex. froideur) construites au travail se répercutent sur les relations familiales.",
  },
  {
    q: "Qu'est-ce qu'une idéologie défensive collective ?",
    opts: [
      "Une stratégie collective (cynisme, déni du risque) pour anesthésier la souffrance",
      "Un syndicat de défense des salariés",
      "Une politique RH de prévention",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Elle protège l'esprit au prix d'un aveuglement : elle ne supprime pas la souffrance, elle la rend muette.",
  },
  {
    q: "La souffrance éthique survient lorsque le sujet :",
    opts: [
      "manque de compétences techniques",
      "est contraint de participer à des actes qu'il réprouve moralement",
      "n'est pas assez payé",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Elle naît du compromis moral forcé par l'organisation, vecteur puissant de décompensation.",
  },
  {
    q: "La « banalisation du mal » au travail suppose :",
    opts: [
      "de désactiver sa sensibilité morale pour conserver son emploi",
      "de dénoncer publiquement les abus",
      "d'augmenter la production",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> La neutralisation de la conscience morale déstructure l'identité.",
  },
  {
    q: "La décompensation psychopathologique correspond à :",
    opts: [
      "Une montée en compétence",
      "L'effondrement des défenses débouchant sur la maladie (dépression, burn-out…)",
      "Un simple coup de fatigue passager",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Quand les stratégies défensives cèdent sous la surcharge ou l'isolement, la rupture survient.",
  },
  {
    q: "Quel vocabulaire faut-il bannir dans une copie PST120 (paradigme Dejours) ?",
    opts: [
      "Réel du travail, Métis, espace déontique",
      "Genre, style, activité empêchée (Yves Clot)",
      "Souffrance, reconnaissance, sublimation",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Piège récurrent : ne pas importer le cadre de Clot dans le paradigme de la psychodynamique de Dejours.",
  },
  {
    q: "L'évaluation individualisée des performances (EIP) produit surtout :",
    opts: [
      "un renforcement de la coopération",
      "une destruction de la confiance et de la coopération",
      "une amélioration de la reconnaissance des pairs",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> En mettant les salariés en concurrence, l'EIP sabote la coopération et la santé mentale.",
  },
  {
    q: "Pour Anna Freud, la « défense » est :",
    opts: [
      "une activité du Moi destinée à réduire la tension pulsionnelle et à protéger le sujet",
      "une maladie mentale caractérisée",
      "une stratégie consciente de manipulation",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Anna Freud (puis Bibring, Lagache, Bergeret) : les mécanismes de défense du Moi visent la réduction de la tension pulsionnelle et l'adaptation du sujet.",
  },
  {
    q: "Quel mécanisme de défense consiste à séparer la représentation gênante de son affect ?",
    opts: ["Le refoulement", "L'isolation", "La projection"],
    correct: 1,
    exp: "<b>Bonne réponse.</b> L'isolation sépare la représentation de sa charge émotionnelle ; le refoulement, lui, maintient la représentation hors de la conscience.",
  },
  {
    q: "Qui introduit le terme « psychopathologie du travail » (1952) ?",
    opts: ["Paul Sivadon", "Christophe Dejours", "François Tosquelles"],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Paul Sivadon (1952) ; Tosquelles porte la psychothérapie institutionnelle ; Dejours fondera plus tard la psychodynamique du travail.",
  },
  {
    q: "La Métis désigne :",
    opts: [
      "Une procédure de sécurité formelle",
      "L’intelligence rusée, pratique et corporelle face au réel",
      "Un indicateur de performance",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> C’est l’ingéniosité mobilisée pour combler l’écart prescrit/réel.",
  },
  {
    q: "L’espace déontique est :",
    opts: [
      "Le bureau du DRH",
      "Le lieu où le collectif élabore les règles du travail bien fait",
      "Un logiciel d’évaluation",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Sans lui, la coopération et la reconnaissance s’effondrent.",
  },
  {
    q: "La souffrance éthique survient lorsque le sujet :",
    opts: [
      "Manque de compétences",
      "Est contraint de participer à des actes qu’il réprouve moralement",
      "N’est pas assez payé",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le compromis moral forcé est un puissant vecteur de décompensation.",
  },
  {
    q: "La banalisation du mal suppose de :",
    opts: [
      "Dénoncer les abus",
      "Désactiver sa sensibilité morale pour conserver son emploi",
      "Augmenter la production",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La neutralisation de la conscience morale déstructure l’identité.",
  },
  {
    q: "Pour Anna Freud, un mécanisme de défense vise à :",
    opts: [
      "Augmenter la tension pulsionnelle",
      "Réduire la tension pulsionnelle et protéger le Moi",
      "Créer un conflit social",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Bibring/Lagache/Bergeret : les défenses assurent l’adaptation du sujet.",
  },
  {
    q: "Le refoulement consiste à :",
    opts: [
      "Séparer la représentation de son affect",
      "Maintenir hors de la conscience une représentation inacceptable",
      "Attribuer à autrui ses contenus",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Séparer représentation et affect = isolation ; attribuer à autrui = projection.",
  },
  {
    q: "Qui introduit le terme « psychopathologie du travail » (1952) ?",
    opts: ["Christophe Dejours", "Paul Sivadon", "François Tosquelles"],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Sivadon (1952) ; Tosquelles porte la psychothérapie institutionnelle.",
  },
  {
    q: "La place du travail entre ordre singulier et ordre collectif pose le problème de :",
    opts: [
      "L’ergonomie du poste",
      "L’articulation théorie du sujet / théorie de la société",
      "La mesure du stress",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La psychodynamique assume cette tension sans réduire l’un à l’autre.",
  },
];

export const QUI = [
  [
    "« Le travail réel est ce qui se fait connaître à celui qui travaille par sa résistance. »",
    "dejours",
    "<b>Christophe Dejours.</b> Définition de l'énigme du travail réel comme épreuve de résistance face à la prescription.",
    "dejours",
  ],
  [
    "« Les rapports sociaux de sexe invisibilisent le travail du soin en le rattachant à une prétendue nature féminine. »",
    "molinier",
    "<b>Pascale Molinier.</b> Critique de l'invisibilisation sociale du care et refus de l'essentialisme biologique.",
    "molinier",
  ],
  [
    "« Pourquoi la plupart des gens ne tombent-ils pas malades malgré la souffrance au travail ? »",
    "dejours",
    "<b>Christophe Dejours.</b> La question fondamentale qui marque le basculement épistémologique vers la psychodynamique.",
    "dejours",
  ],
  [
    "« La névrose des dactylographes montre le lien causal direct entre la contrainte répétitive et l'effondrement psychique. »",
    "precurseurs",
    "<b>Louis Le Guillant.</b> Approche pionnière de la psychopathologie classique cherchant à lier la tâche aux pathologies nerveuses.",
    "precurseurs",
  ],
  [
    "« L'évaluation individualisée des performances détruit la coopération en installant la concurrence entre pairs. »",
    "management",
    "<b>Management moderne.</b> L'analyse critique de l'organisation gestionnaire qui court-circuite l'espace déontique.",
    "management",
  ],
  [
    "« L'idéologie défensive collective est un déni partagé pour travailler malgré la peur, au prix d'un engourdissement de la pensée. »",
    "dejours",
    "<b>Christophe Dejours.</b> Théorie du fonctionnement des défenses collectives (ex. chantiers, usines).",
    "dejours",
  ],
  [
    "« Travailler, c'est combler par l'intelligence l'écart entre le prescrit et le réel. »",
    "dejours",
    "<b>Christophe Dejours.</b> Le travail réel comme épreuve du réel.",
    "dejours",
  ],
  [
    "« Le care est un travail réel, invisibilisé par sa réduction à une prétendue nature féminine. »",
    "molinier",
    "<b>Pascale Molinier.</b> Division sexuelle du travail et invisibilisation du care.",
    "molinier",
  ],
  [
    "« La névrose des téléphonistes illustre la psychopathologie classique du travail. »",
    "precurseurs",
    "<b>Louis Le Guillant.</b> Approche causale pionnière (années 1950).",
    "precurseurs",
  ],
  [
    "« L'évaluation individualisée des performances détruit la coopération en installant la concurrence. »",
    "management",
    "<b>Critique de l'organisation gestionnaire.</b> L'EIP sape l'espace déontique.",
    "management",
  ],
  [
    "« Le jugement de beauté est rendu par les pairs sur le respect des règles de l'art. »",
    "dejours",
    "<b>Christophe Dejours.</b> Dynamique de reconnaissance.",
    "dejours",
  ],
  [
    "« La défense est une activité du Moi destinée à réduire la tension pulsionnelle. »",
    "dejours",
    "<b>Anna Freud (racine psychanalytique).</b> Fondement des stratégies défensives.",
    "dejours",
  ],
];

export const PIEGES = [
  [
    "L'activité empêchée est le concept central utilisé par Christophe Dejours pour expliquer le burn-out.",
    false,
    "<b>Faux !</b> L'activité empêchée est un concept d'Yves Clot (Clinique de l'activité). En PST120, on parle d'échec de la sublimation ou de rupture des défenses cliniques face à la souffrance.",
    "dejours",
  ],
  [
    "Le jugement d'utilité est rendu par les pairs sur la conformité du travail aux règles de l'art.",
    false,
    "<b>Faux !</b> Le jugement d'utilité est rendu par la hiérarchie ou les usagers. C'est le <i>jugement de beauté</i> qui est rendu par les pairs sur le respect des règles de l'art.",
    "dejours",
  ],
  [
    "La Métis est l'intelligence de la ruse qui implique souvent d'enfreindre la prescription pour faire fonctionner la production.",
    true,
    "<b>Vrai !</b> La Métis est l'intelligence pratique. Le travail réel exigeant de s'adapté aux imprévus, elle implique une dimension de ruse et de dérogation par rapport aux règles strictes.",
    "dejours",
  ],
  [
    "L'enquête collective en psychodynamique du travail utilise des caméras vidéo pour analyser les gestes des opérateurs.",
    false,
    "<b>Faux !</b> La psychodynamique de Dejours utilise uniquement la parole et l'écoute collective (groupes homogènes). L'usage de la vidéo (autoconfrontation croisée) est la signature d'Yves Clot.",
    "management",
  ],
  [
    "Pascale Molinier démontre que le travail du care (soin) est naturellement lié à la psychologie féminine.",
    false,
    "<b>Faux !</b> Molinier refuse l'essentialisme. Le care est une construction sociale sexuée et un travail réel nécessitant une Métis invisible, et non une 'nature' féminine.",
    "molinier",
  ],
  [
    "La contamination désigne le transfert des rigidités défensives acquises au travail vers la vie conjugale et familiale.",
    true,
    "<b>Vrai !</b> La contamination illustre la porosité entre le travail et le hors-travail : pour tenir face à la violence du travail, le sujet s'insensibilise, ce qui détruit son empathie en famille.",
    "molinier",
  ],
  [
    "Le pouvoir d'agir est le triptyque de la santé que l'on doit défendre le jour de l'examen de PST120.",
    false,
    "<b>Faux !</b> Le 'pouvoir d'agir' est le terme clé d'Yves Clot. Dans PST120, le fil conducteur de la santé est la <i>sublimation</i> et la <i>reconnaissance</i>.",
    "dejours",
  ],
  [
    "La souffrance éthique survient lorsqu'un travailleur doit participer à des actions qu'il réprouve moralement.",
    true,
    "<b>Vrai !</b> La souffrance éthique est un moteur très puissant de décompensation psychopathologique lorsque l'organisation force le salarié à nier ses propres valeurs morales.",
    "management",
  ],
  [
    "Mesurer le « sens du travail » avec une échelle de psychologie positive (la WAMI de Steger & Dik) suffit, pour Dejours, à analyser le rapport travail/santé.",
    false,
    "<b>Faux !</b> La WAMI <i>mesure</i> un ressenti eudémonique a posteriori ; la psychodynamique <i>analyse cliniquement</i> les conditions réelles (reconnaissance, coopération, qualité empêchée). À mobiliser en contraste critique, jamais comme cadre : « il n'y a pas de bien-être sans bien faire ».",
    "management",
  ],
  [
    "Le jugement d'utilité est rendu par les pairs sur les règles de l'art.",
    false,
    "<b>Faux !</b> Le jugement d'utilité vient de la hiérarchie/des usagers ; ce sont les pairs qui rendent le jugement de beauté.",
    "dejours",
  ],
  [
    "La coopération peut être prescrite par l'organigramme.",
    false,
    "<b>Faux !</b> La coordination est prescrite ; la coopération est volontaire et se construit sur la confiance.",
    "dejours",
  ],
  [
    "Toute souffrance au travail est nécessairement pathogène.",
    false,
    "<b>Faux !</b> La souffrance peut être créatrice : sublimée et reconnue, elle se transforme en plaisir et en santé.",
    "dejours",
  ],
  [
    "Pour Molinier, la division sexuelle du travail est une donnée biologique naturelle.",
    false,
    "<b>Faux !</b> C'est une construction sociale qui invisibilise le care ; Molinier refuse l'essentialisme.",
    "molinier",
  ],
  [
    "Le chômage prive le sujet du support de sublimation et de socialisation.",
    true,
    "<b>Vrai !</b> Il ampute la dynamique de construction de soi et d'inscription sociale (désubjectivation).",
    "management",
  ],
];

export const DISTINGUER = [
  {
    pair: ["Coordination", "Coopération"],
    a: "dejours",
    crit: "La coordination est imposée par l'organigramme (règles formelles, qui fait quoi) ; la coopération est un engagement volontaire et de la subjectivité basé sur la confiance pour surmonter les failles de la prescription.",
    items: [
      [
        "L'attribution automatique des dossiers clients via le logiciel de répartition à 8h.",
        0,
      ],
      [
        "L'entraide spontanée entre collègues pour rattraper le retard d'un dossier sans le dire au chef.",
        1,
      ],
      ["La description des rôles dans la procédure officielle ISO 9001.", 0],
    ],
  },
  {
    pair: ["Jugement d'utilité", "Jugement de beauté"],
    a: "dejours",
    crit: "Le jugement d'utilité porte sur la valeur économique ou sociale et est rendu par la hiérarchie ou les usagers ; le jugement de beauté porte sur le respect des règles de l'art et est rendu par les pairs.",
    items: [
      [
        "Le message de félicitations d'un client saluant la rapidité de la livraison.",
        0,
      ],
      [
        "La remarque d'un collègue admirant la régularité et l'élégance d'une soudure sur acier.",
        1,
      ],
      [
        "L'augmentation individuelle de salaire attribuée à la fin de l'année par le directeur.",
        0,
      ],
    ],
  },
  {
    pair: ["Souffrance créatrice", "Souffrance pathogène"],
    a: "dejours",
    crit: "La souffrance créatrice est mobilisée par la Métis et résolue par la reconnaissance collective ; la souffrance pathogène est bloquée, subie dans l'isolement et sans accès à la sublimation.",
    items: [
      [
        "Le sentiment de fierté après avoir résolu une panne complexe après 3 heures d'essais vains.",
        0,
      ],
      [
        "Le sentiment de honte de devoir bâcler le soin des personnes âgées jour après jour sans pouvoir parler avec elles.",
        1,
      ],
      [
        "La fatigue saine ressentie par l'artisan après une longue journée de création dans son atelier.",
        0,
      ],
    ],
  },
];

export const CLOZE = [
  [
    "dejours",
    [
      "Le travail réel commence là où la ",
      { h: "prescription" },
      " échoue ; c'est ce qui se fait connaître à celui qui travaille par sa ",
      { h: "résistance" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "La reconnaissance est le seul alchimiste capable de transformer la ",
      { h: "souffrance" },
      " en ",
      { h: "plaisir" },
      ".",
    ],
  ],
  [
    "molinier",
    [
      "Le travail du care est structurellement ",
      { h: "invisibilisé" },
      " parce qu'on le ramène aux qualités dites ",
      { h: "naturelles" },
      " des femmes.",
    ],
  ],
  [
    "dejours",
    [
      "L'idéologie défensive collective s'installe au prix d'un ",
      { h: "engourdissement" },
      " de la pensée, nécessaire pour ne pas voir le ",
      { h: "danger" },
      ".",
    ],
  ],
  [
    "management",
    [
      "Le travail articule l'ordre ",
      { h: "singulier" },
      " (le sujet) et l'ordre ",
      { h: "collectif" },
      " (la société), sans réduire la théorie du sujet à la théorie de la société.",
    ],
  ],
  [
    "dejours",
    [
      "La reconnaissance exige le jugement d'",
      { h: "utilité" },
      " (hiérarchie/usagers) et le jugement de ",
      { h: "beauté" },
      " (pairs).",
    ],
  ],
  [
    "dejours",
    ["Le travail réel commence là où la ", { h: "prescription" }, " échoue."],
  ],
  [
    "molinier",
    [
      "Le travail du ",
      { h: "care" },
      " est invisibilisé par sa réduction à une prétendue ",
      { h: "nature" },
      " féminine.",
    ],
  ],
  [
    "management",
    [
      "L'évaluation ",
      { h: "individualisée" },
      " des performances détruit la ",
      { h: "coopération" },
      " entre pairs.",
    ],
  ],
  [
    "precurseurs",
    [
      { h: "Le Guillant" },
      " a étudié la névrose des téléphonistes (psychopathologie classique).",
    ],
  ],
];

export const REDAC = [
  [
    "Pourquoi la plupart des travailleurs ne tombent-ils pas malades malgré la souffrance au travail ? (La Fiche A4 de révision)",
    [
      "Poser la question clinique de Dejours en introduction (basculement épistémologique).",
      "Développer le concept de normalité souffrante comme équilibre actif.",
      "Présenter le Chemin 1 (Santé) : Souffrance normale ➔ Métis ➔ Coopération ➔ Jugements d'utilité et de beauté ➔ Sublimation.",
      "Présenter le Chemin 2 (Pathologie) : Rupture de la coopération ➔ Absence de reconnaissance ➔ Idéologies défensives ➔ Rupture ➔ Décompensation.",
      "Bannir strictement le vocabulaire d'Yves Clot (ne pas citer genre/style/activité empêchée).",
      "Conclure sur le rôle indispensable de la parole collective (espace déontique).",
    ],
    "<p>La question centrale de Christophe Dejours renverse l'approche de la psychopathologie classique : il ne s'agit plus de chercher pourquoi le travail rend malade, mais d'expliquer comment la majorité des salariés parviennent à maintenir leur santé mentale en dépit d'une souffrance inévitable générée par le réel du travail.</p><p>Cette énigme trouve sa réponse dans le concept de <b>normalité souffrante</b>. La normalité au travail n'est pas un état de repos ou d'absence de douleur, mais le résultat d'une lutte psychique active et permanente. Face aux contraintes réelles qui résistent à la prescription (le réel), le travailleur fait l'expérience d'une souffrance normale. À partir de là, deux trajectoires cliniques distinctes se dessinent.</p><p>La première est la <b>trajectoire de la Santé par la Sublimation</b>. Elle s'enclenche lorsque le sujet mobilise son intelligence pratique (la Métis) pour surmonter l'obstacle. Cette ingéniosité se déploie au sein d'une <b>coopération volontaire</b>, c'est-à-dire d'un collectif uni par la confiance et l'élaboration de règles de métier communes (l'espace déontique). Si ce travail est validé par la <b>reconnaissance</b> (jugement d'utilité de la hiérarchie et jugement de beauté des pairs), la souffrance est transmutée en plaisir. L'énergie pulsionnelle est sublimée, permettant l'accomplissement de soi et la construction de l'identité.</p><p>La seconde est la <b>trajectoire de la Pathologie par la Décompensation</b>. Si le management moderne (évaluation individuelle) détruit la coopération, la confiance s'effondre. Le sujet subit un défaut de reconnaissance. Pour supporter l'angoisse et la souffrance devenue pathogène, les travailleurs érigent des <b>stratégies défensives collectives</b> (ex. déni du danger, cynisme). Cependant, ces défenses sont rigides et anesthésient la pensée. Lorsque ces stratégies s'effondrent sous le poids d'une surcharge ou de l'isolement d'un individu, la rupture survient, débouchant sur la décompensation (burn-out, dépression grave, geste suicidaire).</p><p>En conclusion, la santé mentale au travail repose sur la possibilité de délibérer collectivement sur le travail réel afin de préserver la dynamique de coopération et de reconnaissance, conditions indispensables à la sublimation.",
  ],
  [
    "Distinguez la coordination de la coopération en psychodynamique du travail et analysez comment le management gestionnaire peut fragiliser cette dernière.",
    [
      "Définir la coordination (logique prescriptive, organigramme, division technique).",
      "Définir la coopération (subjective, volontaire, élaboration de règles communes).",
      "Montrer les conditions de la coopération : confiance, espace de délibération.",
      "Analyser l'impact des outils de gestion modernes (évaluation individuelle, KPI, flicage numérique).",
      "Conclure sur la souffrance éthique générée par la destruction de la coopération.",
    ],
    "<p>Dans le cadre de l'analyse clinique du travail, Christophe Dejours oppose radicalement la coordination prescrite à la coopération collective.</p><p>La <b>coordination</b> relève de la prescription organisationnelle. Elle correspond à la répartition technique des tâches, définie à l'avance par l'organigramme et les procédures de gestion. Elle est imposée d'en haut pour orchestrer le fonctionnement mécanique de l'entreprise. C'est l'ordre théorique.</p><p>La <b>coopération</b>, quant à elle, ne peut être prescrite. Elle est subjective et volontaire. Elle désigne le 'vouloir travailler ensemble' pour combler les failles inévitables de la coordination prescrite face aux imprévus du réel. La coopération exige que les travailleurs prennent des risques psychiques pour faire confiance à l'autre et s'accordent sur des règles de métier officieuses au sein de l'<b>espace de délibération</b>.</p><p>Or, le management gestionnaire moderne fragilise profondément cette coopération. En imposant des <b>évaluations de performance individuelles</b> et des indicateurs de productivité chiffrés (KPI), il met les salariés en concurrence directe. Cette individualisation détruit la confiance mutuelle essentielle à l'entraide. Le flicage numérique et le reporting permanent empêchent la circulation d'une parole informelle et libre sur les erreurs commises, détruisant ainsi l'espace déontique de discussion. Privés de ce collectif protecteur, les salariés se retrouvent isolés, contraints de subir en silence une souffrance éthique et des injonctions contradictoires, ce qui ouvre la voie à la décompensation.",
  ],
  [
    "La reconnaissance au travail : montrez son rôle dans la transformation de la souffrance.",
    [
      "Poser la souffrance comme inévitable (épreuve du réel).",
      "Définir la dynamique de reconnaissance : jugement d'utilité (hiérarchie/usagers) et de beauté (pairs).",
      "Montrer la transformation souffrance → plaisir par la sublimation.",
      "Analyser l'échec de la reconnaissance (EIP, isolement) → décompensation.",
      "Conclure sur la centralité de la parole collective.",
    ],
    "<p>La souffrance est inhérente à l'épreuve du réel du travail. La <b>reconnaissance</b> est le seul « alchimiste » capable de la transformer en plaisir et en santé. Elle exige deux jugements : le <b>jugement d'utilité</b> (hiérarchie, usagers) et le <b>jugement de beauté</b> (pairs, sur les règles de l'art).</p><p>Reconnue, la souffrance est <b>sublimée</b> : elle nourrit la construction de l'identité. À défaut (évaluation individualisée, isolement), elle devient pathogène et mène à la <b>décompensation</b>.</p><p>On conclut sur la condition de la reconnaissance : des espaces de délibération préservant la coopération et les règles de métier.</p>",
  ],
  [
    "Coopération et règles de métier : analysez les effets de l'évaluation individualisée des performances.",
    [
      "Distinguer coordination (prescrite) et coopération (volontaire, confiance).",
      "Montrer le rôle de l'espace déontique dans l'élaboration des règles de métier.",
      "Analyser l'EIP : concurrence, rétention, destruction de la confiance.",
      "Relier à la souffrance éthique et à la solitude au travail.",
      "Conclure sur la restauration du collectif comme instrument de santé.",
    ],
    "<p>La <b>coordination</b> est l'agencement formel imposé par l'organigramme ; la <b>coopération</b> est volontaire et se construit sur la confiance, dans un <b>espace déontique</b> où s'élaborent les règles de métier.</p><p>L'<b>évaluation individualisée des performances</b> met les salariés en concurrence : elle détruit la confiance, encourage la rétention d'information et isole. Elle génère solitude et <b>souffrance éthique</b>, sapant la coopération.</p><p>L'intervention vise à restaurer des espaces de délibération sur le travail réel, le collectif redevenant un instrument de santé.</p>",
  ],
];

export const SIM = [
  {
    key: "dejours_enquete",
    title: "Initier une enquête en psychodynamique",
    persona: "Collectif d'infirmiers (Épuisement)",
    context:
      "Tu es mandaté par le CSE (ex-CHSCT) à la suite d'un pic d'arrêts de travail chez les infirmiers d'un hôpital. Ton but : initier une enquête collective en psychodynamique du travail sans dévier du cadre méthodologique de Dejours.",
    principes: [
      "Garantir le volontariat et la confidentialité",
      "Se baser uniquement sur la parole (pas de vidéo)",
      "Organiser des groupes homogènes de pairs",
      "Viser la restitution pour relancer la délibération",
    ],
    steps: [
      {
        worker:
          "La direction propose : « Pour gagner du temps, nous allons désigner 5 infirmiers référents pour vos entretiens. »",
        prompt: "Quelle est ta réponse clinique ?",
        options: [
          {
            label:
              "« C'est impossible : l'enquête doit reposer exclusivement sur le volontariat et la parole libre. »",
            score: 2,
            fb: "Idéal : le volontariat et l'indépendance de la demande sont les fondements éthiques de l'enquête.",
          },
          {
            label:
              "« D'accord, mais je veux aussi des entretiens avec les syndicats. »",
            score: 1,
            fb: "Acceptable, mais accepter la désignation par la direction biaise le cadre clinique.",
          },
          {
            label: "« Parfait, cela facilitera la prise de contact. »",
            score: 0,
            fb: "À éviter : tu acceptes une sélection managériale qui détruira la confiance des équipes.",
          },
        ],
      },
      {
        worker:
          "Un infirmier en groupe témoigne : « On court tout le temps. Ceux qui n'y arrivent pas sont juste mal organisés. »",
        prompt:
          "Comment relances-tu pour analyser la souffrance sans briser la défense ?",
        options: [
          {
            label:
              "« Qu'est-ce que cette vitesse vous demande de sacrifier dans la qualité des soins ? »",
            score: 2,
            fb: "Idéal : tu orientes vers le travail réel et le conflit éthique sous-jacent.",
          },
          {
            label: "« C'est faux, le manque d'effectifs est la seule cause. »",
            score: 0,
            fb: "Tu imposes ton opinion et tu fermes l'élaboration collective.",
          },
          {
            label:
              "« Parlons plutôt de vos techniques d'organisation individuelles. »",
            score: 1,
            fb: "Trop gestionnaire : tu individualises le problème au lieu de chercher la règle collective.",
          },
        ],
      },
    ],
  },
];

export const CASES = [
  {
    vignette:
      "Dans un centre d'appels, les téléconseillers doivent appliquer une grille de vente agressive. S'ils sentent que le client est vulnérable, ils doivent insister sous peine de sanctions. Plusieurs conseillers se plaignent d'insomnies et d'un dégoût d'eux-mêmes.",
    q1: {
      prompt:
        "Quel concept de psychodynamique explique ce dégoût de soi-même ?",
      options: [
        {
          label: "La souffrance éthique",
          ok: true,
          fb: "Oui : c'est la souffrance de devoir prêter son concours à des actes moralement réprouvés.",
        },
        {
          label: "L'activité empêchée d'Yves Clot",
          ok: false,
          fb: "Rappel : vocabulaire d'Yves Clot banni de cet examen ! Choisis la souffrance éthique.",
        },
        {
          label: "La décompensation somatique",
          ok: false,
          fb: "Non, le dégoût de soi est un symptôme psychique de conflit moral avant la décompensation physique.",
        },
      ],
    },
    q2: {
      prompt:
        "Quelle action clinique est préconisée par l'enquête en psychodynamique ?",
      options: [
        {
          label:
            "Ouvrir un espace de délibération collective pour débattre du travail réel et restaurer la coopération",
          ok: true,
          fb: "Exact : redonner au collectif la possibilité de forger ses propres règles morales.",
        },
        {
          label:
            "Faire analyser les vidéos d'autoconfrontation croisée par le médecin du travail",
          ok: false,
          fb: "Attention : l'autoconfrontation vidéo est interdite en psychodynamique (vocabulaire Clot).",
        },
      ],
    },
  },
  {
    vignette:
      "Dans une société de conseil, chaque consultant est classé chaque trimestre selon un ranking individuel. L'ambiance se dégrade : rétention d'information, méfiance, et un senior s'effondre en burn-out.",
    q1: {
      prompt: "Quel mécanisme central explique la dégradation ?",
      options: [
        {
          label:
            "L'évaluation individualisée détruit la coopération et la confiance",
          ok: true,
          fb: "Oui : la concurrence interindividuelle sape l'espace déontique et la dynamique de reconnaissance.",
        },
        {
          label: "Un simple manque de cohésion d'équipe à animer",
          ok: false,
          fb: "Non : ce n'est pas un défaut de team-building mais une organisation gestionnaire pathogène.",
        },
        {
          label: "Une fragilité psychologique individuelle du senior",
          ok: false,
          fb: "Non : rabattre la décompensation sur l'individu masque le rôle de l'organisation.",
        },
      ],
    },
    q2: {
      prompt: "Que vise l'intervention en psychodynamique ?",
      options: [
        {
          label:
            "Restaurer des espaces de délibération sur le travail réel pour relancer la coopération",
          ok: true,
          fb: "Exact : réhabiliter la parole collective et les règles de métier.",
        },
        {
          label: "Former les consultants à la gestion individuelle du stress",
          ok: false,
          fb: "Insuffisant : la prévention tertiaire/individuelle laisse intacte la cause organisationnelle.",
        },
      ],
    },
  },
  {
    vignette:
      "Sur un chantier, les ouvriers refusent le port du harnais et multiplient les bravades face au danger. Le nouveau chef de sécurité veut sanctionner « ces comportements irrationnels ».",
    q1: {
      prompt: "Comment lire ce refus collectif ?",
      options: [
        {
          label:
            "Une idéologie défensive collective (déni du danger) pour pouvoir travailler malgré la peur",
          ok: true,
          fb: "Oui : la défense collective anesthésie la peur au prix d'un aveuglement au risque.",
        },
        {
          label: "Une simple imprudence individuelle à punir",
          ok: false,
          fb: "Non : sanctionner sans comprendre la fonction défensive renforce le déni.",
        },
        {
          label: "Un manque d'information sur les règles de sécurité",
          ok: false,
          fb: "Non : ils connaissent le risque ; la défense sert justement à ne pas y penser.",
        },
      ],
    },
    q2: {
      prompt: "Quelle approche est cohérente avec Dejours ?",
      options: [
        {
          label:
            "Travailler collectivement le rapport au risque et reconnaître le réel du métier",
          ok: true,
          fb: "Exact : on ne lève pas une défense par la contrainte mais par l'élaboration collective.",
        },
        {
          label: "Imposer des sanctions individuelles automatiques",
          ok: false,
          fb: "Non : la contrainte frontale durcit l'idéologie défensive.",
        },
      ],
    },
  },
];

export const FRISE_DATA = [
  {
    annee: "1952",
    titre: " Louis Le Guillant et la névrose des traminots",
    desc: "Étude pionnière de la psychopathologie classique cherchant un lien de cause à effet direct entre l'organisation industrielle et la fatigue mentale.",
  },
  {
    annee: "1980",
    titre: " Christophe Dejours - Travail, usure mentale",
    desc: "Publication fondatrice marquant le renversement clinique : on ne cherche plus seulement la maladie mais les mécanismes de la normalité souffrante.",
  },
  {
    annee: "1998",
    titre: " Pascale Molinier et la division sexuelle du travail",
    desc: "Introduction de la perspective de care et refus d'une 'nature' féminine. Les stratégies défensives sont analysées sous l'angle du genre.",
  },
  {
    annee: "2000s",
    titre: " Lean management et pic des suicides au travail",
    desc: "Le management moderne et l'évaluation individualisée détruisent la coopération. Les décompensations (burn-out, suicides) se multiplient.",
  },
];

export const NODES = {
  reel: {
    label: "Le Réel du travail",
    s: "Réel",
    a: "precurseurs",
    x: 380,
    y: 60,
    links: [{ to: "souffrance", rel: "se heurte à la prescription et génère" }],
  },
  souffrance: {
    label: "Souffrance normale",
    s: "Souffrance",
    a: "dejours",
    x: 380,
    y: 150,
    links: [
      { to: "metis", rel: "Chemin 1 : mobilise l'" },
      { to: "echec_coop", rel: "Chemin 2 : conduit à l'" },
    ],
  },
  metis: {
    label: "Intelligence pratique (Métis)",
    s: "Métis",
    a: "dejours",
    x: 220,
    y: 240,
    links: [{ to: "cooperation", rel: "alimente la" }],
  },
  cooperation: {
    label: "Coopération",
    s: "Coopération",
    a: "dejours",
    x: 220,
    y: 330,
    links: [{ to: "reconnaissance", rel: "exige la" }],
  },
  reconnaissance: {
    label: "Dynamique de Reconnaissance",
    s: "Reconnaissance",
    a: "dejours",
    x: 220,
    y: 420,
    links: [{ to: "sublimation", rel: "permet la" }],
  },
  sublimation: {
    label: "Sublimation et Identité",
    s: "Sublimation",
    a: "sante",
    x: 380,
    y: 490,
    links: [{ to: "sante", rel: "aboutit à la" }],
  },
  sante: {
    label: "Santé mentale",
    s: "Santé",
    a: "sante",
    x: 380,
    y: 540,
    links: [],
  },
  echec_coop: {
    label: "Échec de la Coopération",
    s: "Échec Coop",
    a: "management",
    x: 540,
    y: 240,
    links: [{ to: "defaut_rec", rel: "entraîne un" }],
  },
  defaut_rec: {
    label: "Défaut de Reconnaissance",
    s: "Défaut Reconn",
    a: "management",
    x: 540,
    y: 330,
    links: [{ to: "defenses", rel: "active des" }],
  },
  defenses: {
    label: "Stratégies défensives collectives",
    s: "Défenses",
    a: "pathologie",
    x: 540,
    y: 420,
    links: [{ to: "rupture", rel: "risquent la" }],
  },
  rupture: {
    label: "Rupture des défenses",
    s: "Rupture",
    a: "pathologie",
    x: 660,
    y: 330,
    links: [{ to: "decompens", rel: "finit par la" }],
  },
  decompens: {
    label: "Décompensation (Maladie)",
    s: "Décompensation",
    a: "pathologie",
    x: 660,
    y: 450,
    links: [],
  },
};

export const PROTO = [
  {
    n: 1,
    t: "La demande institutionnelle",
    role: "Paritaire",
    d: "Émane du CSE/CHSCT garantissant l'indépendance de l'intervention face aux pressions de la direction.",
  },
  {
    n: 2,
    t: "La pré-enquête",
    role: "Exploration",
    d: "Entretiens individuels exploratoires pour comprendre l'organigramme et repérer les dysfonctionnements.",
  },
  {
    n: 3,
    t: "Groupes homogènes",
    role: "Constitution",
    d: "Réunions formées exclusivement de salariés exerçant le même métier pour libérer la parole.",
  },
  {
    n: 4,
    t: "Auditions cliniques",
    role: "Analyse",
    d: "Séances d'écoute et de dialogue collectif pour expliciter le rapport souffrance-plaisir et les défenses.",
  },
  {
    n: 5,
    t: "Rédaction du rapport",
    role: "Synthèse",
    d: "Le clinicien rédige un rapport reprenant les interprétations cliniques et les souffrances vécues.",
  },
  {
    n: 6,
    t: "Validation collective",
    role: "Garantie",
    d: "Le rapport est lu, amendé et entièrement validé par les salariés participants avant diffusion.",
  },
  {
    n: 7,
    t: "Restitution publique",
    role: "Action",
    d: "Le rapport validé devient la propriété du collectif, servant de levier d'action face à la direction.",
  },
];

export const ATELIER_SUJETS = [
  {
    t: "Sujet 1 : Normalité souffrante et stratégies collectives",
    grid: [
      "Introduction avec accroche historique (Le Guillant / Dejours)",
      "Définition précise de la normalité souffrante (équilibre actif)",
      "Explication des stratégies défensives collectives (déni du danger, rituels de bravade)",
      "Analyse du coût cognitif de la défense (engourdissement de la pensée)",
      "Différenciation avec la décompensation psychopathologique",
      "Exemple concret (BTP, chantiers ou traders)",
      "Conclusion ouvrant sur l'espace de délibération",
    ],
    corrige:
      "<p>Une bonne copie doit s'attacher à décrire que la normalité n'est pas un état stable mais une lutte. Les défenses (idéologies) anesthésient la perception du risque pour permettre au travail de s'accomplir, mais coupent le sujet de sa sensibilité morale. L'évaluation individuelle sabote cette dynamique collective, menant à l'épuisement.",
  },
];

export const LEXIQUE = [
  {
    w: "L'énigme du travail réel",
    a: "dejours",
    def: "Le constat que le travail réel commence là où les prescriptions de l'organisation échouent. C'est l'expérience intime de la résistance de la matière ou du système.",
    precurseurs:
      "Veil pressentait cet écart à travers la surcharge de travail non modélisable par la technique.",
    dejours:
      "Le travail est l'épreuve du réel. Travailler, c'est combler l'écart entre le prescrit et le réel par l'intelligence pratique (Métis).",
    molinier:
      "Le care fait partie intégrante du travail réel, bien qu'il soit ignoré par les grilles d'évaluation de la tâche prescrite.",
    management:
      "Ignore le travail réel et tente de réduire l'activité à des indicateurs quantitatifs (KPI).",
    eg: "Une secrétaire médicale qui réorganise en urgence les rendez-vous pour insérer un patient grave sans perturber le médecin.",
  },
  {
    w: "Souffrance créatrice vs pathogène",
    a: "dejours",
    def: "La souffrance normale naît de la confrontation au réel. Elle est créatrice si le sujet parvient à la transformer en plaisir par l'action et la reconnaissance. Elle devient pathogène si elle est bloquée.",
    dejours:
      "Pivot de la santé mentale : la souffrance créatrice permet la sublimation. La souffrance pathogène résulte de l'échec de la reconnaissance.",
    eg: "Un chercheur frustré par ses échecs répétés (souffrance normale) qui finit par trouver une solution et voit sa découverte saluée par ses pairs (souffrance créatrice).",
  },
  {
    w: "Normalité souffrante",
    a: "dejours",
    def: "État d'équilibre précaire dans lequel les travailleurs souffrent mais ne tombent pas malades grâce au déploiement de stratégies de défense actives.",
    precurseurs:
      "Le Guillant a décrit la 'névrose' comme une forme de normalité mutilée par l'organisation industrielle.",
    dejours:
      "La normalité n'est pas un état de santé passif, c'est une lutte défensive active de tous les instants contre l'aliénation.",
    eg: "Les ouvriers d'une chaîne de montage qui développent des blagues cyniques pour supporter la monotonie sans s'effondrer.",
  },
  {
    w: "La Sublimation",
    a: "dejours",
    def: "Processus psychique par lequel l'énergie pulsionnelle (la souffrance, le désir) est dérivée vers une activité sociale valorisée (le travail), permettant la construction de l'identité.",
    dejours:
      "La clé de voûte de la santé mentale au travail. Sa condition absolue de réussite est la reconnaissance sociale du travail accompli.",
    eg: "Un artisan qui projette sa colère et sa frustration dans le ciselage minutieux d'une pièce de bois unique.",
  },
  {
    w: "Coordination vs Coopération",
    a: "dejours",
    def: "La coordination est l'agencement technique et formel des tâches imposé par l'organigramme. La coopération est l'engagement volontaire et de la subjectivité des travailleurs fondé sur la confiance.",
    dejours:
      "La coopération exige des règles officieuses construites collectivement pour pallier les failles de la coordination formelle.",
    management:
      "Tente de remplacer la coopération par des procédures de contrôle et des indicateurs individuels, détruisant la confiance.",
    eg: "Deux chirurgiens qui s'ajustent silencieusement pendant une hémorragie imprévue en dehors du protocole standard écrit.",
  },
  {
    w: "L'espace de délibération",
    a: "dejours",
    def: "Lieu informel ou formel où la parole circule librement sur les difficultés du travail réel et les échecs, permettant l'élaboration de règles éthiques communes.",
    dejours:
      "Condition sine qua non de la coopération et de l'attribution du jugement de beauté par les pairs.",
    eg: "La réunion informelle hebdomadaire où les développeurs partagent leurs bugs non résolus sans crainte d'être pénalisés.",
  },
  {
    w: "Dynamique de reconnaissance",
    a: "dejours",
    def: "Le processus de validation de la contribution du travailleur. Elle exige deux jugements : le jugement d'utilité (hiérarchie/clients) et le jugement de beauté (pairs).",
    dejours:
      "La reconnaissance est le seul 'salaire psychique' capable de racheter la souffrance et de permettre la sublimation.",
    eg: "Un maçon dont le mur est jugé solide par l'architecte (utilité) et dont l'alignement des briques est admiré par ses collègues (beauté).",
  },
  {
    w: "L'intelligence pratique (Métis)",
    a: "dejours",
    def: "L'intelligence rusée, corporelle et informelle mobilisée par le travailleur pour surmonter la résistance de la matière malgré des consignes inadaptées.",
    dejours:
      "La Métis implique une transgression nécessaire de la règle formelle pour faire réussir la production.",
    eg: "Un boulanger qui ajoute un peu d'eau au toucher de la pâte, en ignorant l'alarme automatique du pétrin.",
  },
  {
    w: "Stratégies défensives collectives",
    a: "dejours",
    def: "Constructions psychiques partagées par un groupe de travailleurs pour s'insensibiliser collectivement à la souffrance ou au danger lié au métier.",
    dejours:
      "Permettent de travailler malgré la peur (ex. refus du casque) mais figent la pensée et conduisent au cynisme ou à la banalisation du mal.",
    eg: "Les ouvriers du BTP qui font des concours de vitesse sur les échafaudages sans harnais de sécurité pour nier le risque de chute.",
  },
  {
    w: "Décompensation psychopathologique",
    a: "dejours",
    def: "Rupture de l'équilibre psychique d'un sujet (burn-out, dépression, suicide) qui survient lorsque les stratégies de défense s'effondrent ou que l'isolement empêche la reconnaissance.",
    precurseurs:
      "Claude Veil a étudié ces états d'effondrement sous le terme d'états d'épuisement.",
    eg: "Un cadre de santé qui s'effondre en larmes dans son bureau et se retrouve incapable de revenir travailler après l'individualisation des plannings.",
  },
  {
    w: "Ordre singulier / ordre collectif",
    a: "management",
    def: "Le travail articule l'ordre singulier (l'histoire intime et le désir du sujet) et l'ordre collectif (les règles de métier, l'organisation, le social). Il est le médiateur central entre la construction de soi et l'appartenance au collectif.",
    dejours:
      "Le sujet n'est ni une monade isolée ni un pur produit social : le travail est le théâtre où se négocient ces deux ordres.",
    eg: "Le compromis permanent entre la conception personnelle du « beau travail » et les règles imposées par le collectif et la hiérarchie.",
  },
  {
    w: "Théorie du sujet vs théorie de la société",
    a: "management",
    def: "Problème théorique majeur de la discipline : tenir ensemble une théorie du sujet (psychanalyse : désir, inconscient) et une théorie de la société (rapports sociaux, domination, organisation), sans réduire l'une à l'autre.",
    dejours:
      "La psychodynamique du travail assume cette tension : éviter le psychologisme (tout est intrapsychique) comme le sociologisme (le sujet n'est qu'un effet social).",
    eg: "Analyser un suicide au travail en articulant la fragilité singulière du sujet ET la dégradation collective de l'organisation, sans choisir un seul registre.",
  },
  {
    w: "Mécanismes de défense du Moi (Anna Freud)",
    a: "dejours",
    def: "Activités du Moi destinées à réduire la tension pulsionnelle et à protéger le sujet (Anna Freud ; Bibring, Lagache, Bergeret). Banals et adaptatifs hors registre pathologique : refoulement, isolation, projection, déplacement, retournement contre soi, retour du refoulé, déni, sublimation.",
    dejours:
      "Racine individuelle des stratégies défensives collectives : le collectif prolonge ces défenses en idéologies défensives partagées face à la souffrance.",
    eg: "Le refoulement (maintenir hors conscience une représentation inacceptable) ; la projection en signe l'échec en attribuant à autrui ses propres contenus.",
  },
  {
    w: "Thérapeutique du travail & psychothérapie institutionnelle",
    a: "precurseurs",
    def: "Courant d'après-guerre où le travail devient un objet thérapeutique (ateliers, ergothérapie) permettant de réinsérer et de « métaboliser la peur ». Paul Sivadon introduit le terme « psychopathologie du travail » (1952).",
    precurseurs:
      "François Tosquelles, chef de file de la psychothérapie institutionnelle, soigne les malades en soignant l'organisation elle-même ; les ateliers articulent pulsions agressives et créatrices.",
    eg: "Des ateliers thérapeutiques où le travail, soigneusement aménagé, redonne aux patients une prise sur le réel et un pouvoir d'agir.",
  },
  {
    w: "Banalisation du mal",
    a: "management",
    def: "Processus par lequel un sujet désactive sa sensibilité morale pour continuer à participer à des actes qu'il réprouve, sous la pression de l'organisation.",
    eg: "Le conseiller qui finit par vendre « normalement » des produits qu'il sait nuisibles aux clients.",
  },
  {
    w: "Plaisir au travail",
    a: "dejours",
    def: "Aboutissement de la souffrance créatrice lorsqu'elle est sublimée et reconnue : il signe la construction de la santé et de l'identité par le travail.",
    eg: "La fierté de l'artisan dont l'ouvrage est salué par ses pairs (jugement de beauté).",
  },
  {
    w: "Coordination (vs coopération)",
    a: "dejours",
    def: "Agencement technique et formel des tâches imposé par l'organigramme. À distinguer de la coopération, volontaire et fondée sur la confiance.",
    eg: "La répartition automatique des dossiers par le logiciel à 8h (coordination), que l'entraide informelle (coopération) vient corriger.",
  },
  {
    w: "Virilité défensive",
    a: "molinier",
    def: "Stratégie collective (souvent masculine) de déni du danger et de glorification de l'effort, analysée par Dejours et discutée par Molinier au prisme du genre.",
    eg: "Les concours de bravade sans harnais sur les chantiers.",
  },
  {
    w: "Évaluation individualisée des performances (EIP)",
    a: "management",
    def: "Dispositif gestionnaire qui met les salariés en concurrence et détruit la confiance, sabotant la coopération et l'espace déontique.",
    eg: "Le ranking trimestriel des consultants qui installe rétention d'information et solitude.",
  },
];
