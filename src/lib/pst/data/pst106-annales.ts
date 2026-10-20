/**
 * PST106 - Clinique de l'activité et psychologie du travail
 * Pr. Christine LAGABRIELLE (Professeure émérite, Directrice associée de "Le Travail Humain")
 * 
 * ANNALES OFFICIELLES CNAM : 8 Sujets avec texte en support
 * Source : Examens réels CNAM (Session 1 & Session 2)
 */

export interface AnnaleTexteItem {
  id: number;
  slug: string;
  titre: string;
  theme: string;
  citation: {
    texte: string;
    auteur: string;
    source: string;
    annee?: string;
  };
  questions: string[];
  criteres: string[];
  planConseille: string[];
  corrige: string;
  conceptsCles: string[];
  auteursLies: string[];
}

export const ANNALES_TEXTES_106: AnnaleTexteItem[] = [
  {
    id: 1,
    slug: "travail-et-activite-monopole-du-reel",
    titre: "Sujet 1 : Travail et activité — « Le réalisé n'a pas le monopole du réel »",
    theme: "Réel de l'activité vs Activité réalisée & Pouvoir d'agir",
    citation: {
      texte: "« Le réalisé n'a pas le monopole du réel. »",
      auteur: "Yves Clot",
      source: "Travail et pouvoir d'agir (2008) / Le travail sans l'homme ? (1995)",
      annee: "1995 / 2008",
    },
    conceptsCles: [
      "Activité réalisée",
      "Réel de l'activité",
      "Activité empêchée",
      "Activité contrariée / suspendue",
      "Pouvoir d'agir",
      "Santé normative (Canguilhem)",
      "Genre professionnel",
    ],
    auteursLies: ["Yves Clot", "Lev Vygotski", "Georges Canguilhem", "Alexeï Léontiev"],
    questions: [
      "Expliquez pourquoi « le réalisé n'a pas le monopole du réel », selon Yves Clot ?",
      "Quelles distinctions fondamentales établissez-vous entre activité réalisée et réel de l'activité ?",
      "Développez et définissez les différents concepts qui composent le « réel de l'activité » (activité empêchée, contrariée, suspendue, interdite, rêvée).",
      "Comment cette citation remet-elle en question une vision purement techniciste, positiviste ou productiviste du travail ?",
      "Expliquez le lien intrinsèque entre cette affirmation et le concept de « pouvoir d'agir » développé par Yves Clot.",
      "Discutez de la portée critique de cette citation vis-à-vis des indicateurs de performance quantitative et des démarches de reporting du New Public Management.",
      "En quoi la dimension collective du travail est-elle essentielle pour appréhender ce « réel » au-delà du « réalisé » individuel ?",
    ],
    criteres: [
      "Définition rigoureuse de l'activité réalisée : ce qui s'est concrètement fait, observable, mesurable, tracé.",
      "Définition du réel de l'activité selon Clot & Vygotski : l'ensemble des possibles non advenus, des renoncements, des hésitations et des conflits de critères.",
      "Typologie de l'activité non réalisée : empêchée (bloquée par l'organisation), contrariée (en conflit avec le travail bien fait), suspendue (reportée), interdite.",
      "Articulation avec le triptyque développemental : Développement → Pouvoir d'agir → Santé.",
      "Mobilisation de Georges Canguilhem : la santé comme capacité normative et d'infidélité au milieu, opposée à l'adaptation passive.",
      "Critique politique et gestionnaire : l'illusion de l'évaluation chiffrée qui ne mesure que le réalisé visible et ignore le coût subjectif du travail non fait.",
      "Rôle du collectif et du genre : le collectif comme réservoir d'alternatives pour sortir de l'impasse individuelle.",
    ],
    planConseille: [
      "1. Introduction : Situer la clinique de l'activité au CRTD du Cnam (Yves Clot) en rupture avec la psychotechnique originelle et en continuité dialectique avec l'ergonomie francophone (Wisner). Définir l'objet de l'affirmation.",
      "2. Dépasser la surface : Activité réalisée vs Réel de l'activité. Expliciter les composantes du réel invisible (empêché, contrarié, suspendu).",
      "3. L'enjeu de santé et de pouvoir d'agir : Pourquoi l'amputation du possible rend malade (Canguilhem). Le travail bien fait comme moteur de la santé.",
      "4. Portée critique organisationnelle : La cécité des métriques gestionnaires (Lean, NPM) face au travail réel.",
      "5. Conclusion & ouverture : Le collectif et les espaces de controverse (autoconfrontations) comme instruments pour rouvrir les possibles de l'activité.",
    ],
    corrige: `
<h5>Introduction & Ancrage épistémologique</h5>
<p>Formulée par Yves Clot dans <i>Le travail sans l'homme ?</i> (1995) et approfondie dans <i>Travail et pouvoir d'agir</i> (2008), la maxime <b>« le réalisé n'a pas le monopole du réel »</b> constitue l'acte de naissance conceptuel de la clinique de l'activité au CNAM. Elle opère un saut épistémologique majeur par rapport à l'ergonomie classique francophone (Wisner) qui distinguait déjà la tâche prescrite et l'activité réelle : chez Clot, l'activité ne se réduit pas davantage à ce qui s'est effectivement concrétisé sous les yeux de l'observateur.</p>

<h5>1. Activité réalisée vs Réel de l'activité</h5>
<p>Pour la clinique de l'activité, l'<b>activité réalisée</b> désigne la part visible, mesurable et temporelle du travail : les gestes accomplis, les pièces usinées, les dossiers traités ou les paroles prononcées. Or, pour Yves Clot, ce réalisé n'est que la pointe émergée d'un iceberg :</p>
<ul>
  <li><b>Le réel de l'activité</b> englobe tout ce que le sujet fait, mais aussi tout ce qu'il <i>ne fait pas</i>, ce qu'il <i>cherche à faire sans y parvenir</i> (l'activité contrariée), ce qu'il <i>aurait voulu ou pu faire</i>, ce qu'il <i>s'interdit de faire</i> (l'activité interdite), ce qu'il <i>rêve de faire</i>, et même ce qu'il fait <i>pour ne pas faire</i> ce qui est prescrit.</li>
  <li>L'activité est un <b>drame subjectif</b> habité par des conflits d'intentions et d'affects : elle est triplement dirigée vers l'objet, vers le sujet lui-même, et vers autrui (dimension dialogique inspirée de Bakhtine et Vygotski).</li>
</ul>

<h5>2. L'activité empêchée, foyer de la souffrance au travail</h5>
<p>Cette distinction a des répercussions directes sur la santé mentale :</p>
<ul>
  <li>Lorsque l'organisation du travail impose des cadences, des protocoles rigides ou des objectifs contradictoires, elle produit de l'<b>activité empêchée</b>. Le travailleur ne peut plus mettre son âme et ses critères de qualité dans son geste ; il est contraint de « bâcler » pour tenir les chiffres.</li>
  <li>En référence à <b>Georges Canguilhem</b> (<i>Le normal et le pathologique</i>), la santé ne se définit pas par l'absence d'infirmité ou la simple conformité à une norme extérieure, mais par la <i>capacité normative</i> du vivant à créer ses propres normes pour transformer son milieu. Être amputé de son pouvoir d'agir sur le milieu équivaut à un état pathologique.</li>
</ul>

<h5>3. Critique des systèmes gestionnaires et du New Public Management</h5>
<p>Cette affirmation porte une charge critique radicale contre le management par objectifs et les démarches de reporting quantitatif :</p>
<ul>
  <li>Ces démarches ne comptabilisent que le <b>réalisé</b> (taux de rotation, nombre d'actes, délais moyens). Elles sont aveugles au coût psychique dépensé par les professionnels pour compenser les failles du système.</li>
  <li>Pire, elles transforment le travailleur en exécutant passif de procédures dévitalisées, provoquant la « qualité empêchée » et le sentiment d'un travail ni fait ni à faire.</li>
</ul>

<h5>4. La médiation du collectif et de l'histoire du métier</h5>
<p>Pour faire revenir le réel dans le champ de la conscience et de l'action, l'individu seul est démuni. C'est à travers le <b>collectif de travail</b> et la réactivation du <b>genre professionnel</b> (les règles implicites et débattues de l'art du métier) que les arbitrages non résolus peuvent être mis en discussion. Les dispositifs cliniques (autoconfrontation croisée, instruction au sosie) visent précisément à réintroduire le « non-réalisé » dans la controverse professionnelle pour restaurer le pouvoir d'agir.</p>
`,
  },
  {
    id: 2,
    slug: "le-metier-attaquer-pour-defendre",
    titre: "Sujet 2 : Le métier — « Attaquer le métier pour le défendre »",
    theme: "Le Genre professionnel, le Style et la Dispute professionnelle",
    citation: {
      texte: "« Rien n'est plus important que d'attaquer le métier pour le défendre. Il ne peut vivre que si le dernier mot n'est jamais dit et le dernier geste jamais accompli. »",
      auteur: "Yves Clot",
      source: "La fonction psychologique du travail (1999) / Le travail à cœur (2010)",
      annee: "1999",
    },
    conceptsCles: [
      "Métier vivant vs Métier mort",
      "Genre professionnel",
      "Style professionnel",
      "Dispute professionnelle",
      "Transgression créatrice",
      "Mémoire transpersonnelle",
    ],
    auteursLies: ["Yves Clot", "Lev Vygotski", "Mikhaïl Bakhtine", "Ivar Oddone"],
    questions: [
      "Que signifie l'expression « attaquer le métier pour le défendre » selon cette citation ?",
      "Quels sont les enjeux de cette « attaque » pour la vitalité du collectif et la santé des travailleurs ?",
      "Pourquoi affirme-t-on qu'un métier « ne peut vivre que si le dernier mot n'est jamais dit et le dernier geste jamais accompli » ? Développez cette idée.",
      "En quoi cette citation s'oppose-t-elle à une vision statique, figée ou procédurale d'un métier ?",
      "Quels sont les risques d'un métier qui ne se remet jamais en question et où le « dernier mot » et le « dernier geste » seraient considérés comme définitivement acquis ?",
      "Définissez les différents concepts qui sous-tendent cette citation (Genre professionnel, Style professionnel, dispute professionnelle). Expliquez la dynamique de leur rapport.",
      "Qu'est-ce qu'un « métier vivant » du point de vue de la clinique de l'activité ?",
    ],
    criteres: [
      "Définition des 4 instances du métier chez Clot : impersonnelle (tâche/consigne), personnelle (sujet singulier), interpersonnelle (dialogue situé), transpersonnelle (genre professionnel).",
      "Distinction clé Genre / Style : le genre comme mémoire vivante partagée, le style comme affranchissement et appropriation singulière.",
      "Le paradoxe de la conservation : un métier se détruit s'il reste figé dans des traditions immuables ou des fiches de poste procédurales.",
      "Rôle vital de la dispute professionnelle : la controverse réglée entre pairs sur les critères du travail bien fait.",
      "Lien avec la santé : le sentiment de stagnation vs le plaisir de l'artisanat intellectuel et manuel réinventé.",
    ],
    planConseille: [
      "1. Introduction : Définir le concept de métier en clinique de l'activité (qui ne se réduit ni à une qualification contractuelle, ni à une fiche de poste). Poser le paradoxe : attaquer pour défendre.",
      "2. Les 4 instances du métier et la dialectique Genre / Style : Montrer comment le style « attaque » le genre pour l'enrichir.",
      "3. Les pathologies du métier figé : La routine mortifère, le corporatisme défensif, l'amputation de l'initiative face à la prescription.",
      "4. La dispute professionnelle comme garante du métier vivant : Organiser la délibération sur le travail bien fait plutôt que le consensus managérial factice.",
      "5. Conclusion : La posture du psychologue du travail clinicien pour réanimer les métiers en souffrance.",
    ],
    corrige: `
<h5>Introduction & Sens du paradoxe clotien</h5>
<p>L'affirmation d'Yves Clot selon laquelle <b>« rien n'est plus important que d'attaquer le métier pour le défendre »</b> heurte le sens commun qui assimile la défense d'un métier à la préservation jalouse de ses traditions ou de ses prérogatives acquises. En clinique de l'activité, le métier n'est pas un monument historique : c'est un organisme vivant qui ne subsiste que dans son mouvement de transformation continue.</p>

<h5>1. Les quatre instances du métier</h5>
<p>Pour comprendre cette formule, il faut mobiliser l'architecture quadripartite du métier élaborée par Yves Clot :</p>
<ul>
  <li>L'instance <b>impersonnelle</b> : les prescriptions, règlements, outillages et objectifs définis par l'organisation formelle.</li>
  <li>L'instance <b>transpersonnelle (le genre professionnel)</b> : le patrimoine invisible, les manières de faire et de dire partagées par une communauté de pairs, transmises de génération en génération.</li>
  <li>L'instance <b>interpersonnelle</b> : les interactions concrètes et le dialogue situés avec les collègues, la hiérarchie et les usagers.</li>
  <li>L'instance <b>personnelle (le style professionnel)</b> : la signature singulière, l'inflexion unique par laquelle chaque travailleur s'approprie le genre pour résoudre les imprévus du réel.</li>
</ul>

<h5>2. « Le dernier mot n'est jamais dit » : la dialectique Genre / Style</h5>
<p>Le genre professionnel fournit aux professionnels une réserve d'actes disponibles qui leur évite de réinventer l'eau tiède chaque matin. Cependant, si le genre devient intouchable, il se transforme en carcan dogmatique :</p>
<ul>
  <li>Le <b>style</b> vient nécessairement « attaquer » le genre : face aux variations de l'activité réelle, l'opérateur transgresse la règle établie, invente un tour de main inédit, trouve un mot inattendu pour calmer un usager en détresse.</li>
  <li>Si cette trouvaille stylistique est reprise, discutée et adoptée par les pairs, elle entre dans le genre commun : <i>« Le genre reste vivant grâce à ses recréations stylistiques »</i>. À l'inverse, si le genre refuse toute contestation, il meurt d'asphyxie et les opérateurs basculent dans l'usure professionnelle.</li>
</ul>

<h5>3. Les risques du métier ossifié face aux dérives normatives</h5>
<p>Lorsque le management contemporain tente d'enfermer le travail dans des référentiels de compétences exhaustifs et des guides de bonnes pratiques standardisés, il postule que « le dernier mot a été dit » par les ingénieurs méthodes ou les consultants :</p>
<ul>
  <li>Cette tentative d'achever le métier engendre la perte du sens et la déresponsabilisation éthique des salariés.</li>
  <li>À l'inverse, un collectif corporatiste replié sur un « on a toujours fait comme ça » s'avère incapable de négocier avec les mutations technologiques et sociales.</li>
</ul>

<h5>4. La dispute professionnelle sur le travail bien fait</h5>
<p>Un métier vivant est un métier où l'on se dispute sainement sur la manière de bien travailler. La <b>dispute professionnelle</b> n'est pas un conflit de personnes, mais une controverse technique, éthique et sociale sur les critères de la qualité. C'est en offrant des espaces délibératifs (méthode de l'autoconfrontation, espaces de discussion) que le psychologue du travail permet aux travailleurs d'« attaquer » leurs manières habituelles de faire pour redonner au métier sa fonction de protection et de développement.</p>
`,
  },
  {
    id: 3,
    slug: "travail-collectif-vs-collectif-de-travail",
    titre: "Sujet 3 : Travail collectif / Collectif de travail — « Tout travail collectif n'implique pas un collectif de travail »",
    theme: "La genèse du collectif de travail, régulation et santé",
    citation: {
      texte: "« Tout travail collectif n'implique pas un collectif de travail. »",
      auteur: "Nathalie Caroly & Yves Clot (2004) / C. Battini & A. Weill-Fassina (2005)",
      source: "Revue Ergonomie / Clinique de l'activité",
      annee: "2004 / 2005",
    },
    conceptsCles: [
      "Travail collectif vs Collectif de travail",
      "Équipe prescrite",
      "Règles de métier",
      "Confiance et reconnaissance",
      "Genre professionnel",
      "Régulation de l'activité",
    ],
    auteursLies: ["Nathalie Caroly", "Yves Clot", "Annie Weill-Fassina", "Christophe Dejours"],
    questions: [
      "Définissez ce que l'on entend par « collectif de travail » et par « travail collectif » selon la clinique de l'activité et l'ergonomie.",
      "Quelles sont les distinctions fondamentales entre ces deux notions ?",
      "Quelles sont les caractéristiques essentielles d'un véritable collectif de travail ?",
      "Comment cette distinction se manifeste-t-elle concrètement dans les dynamiques quotidiennes de travail ?",
      "Quelles sont les conséquences de l'absence de « collectif de travail » sur la santé des travailleurs et sur l'efficacité de l'activité ?",
      "Comment la clinique de l'activité peut-elle éclairer les conditions nécessaires à la transformation d'un simple travail collectif en un collectif de travail vivant ?",
      "Discutez des rôles du collectif en termes de soutien social, de régulation de l'activité, de transmission des savoirs et de construction de l'identité professionnelle.",
    ],
    criteres: [
      "Distinction nette : travail collectif = coprésence fonctionnelle/organisationnelle (équipe, organigramme, division des tâches) vs collectif de travail = construction psychologique et sociale autonome.",
      "Les 3 conditions du collectif selon Caroly & Clot : des règles de métier partagées (genre), des relations de confiance mutuelle, une reconnaissance croisée des compétences.",
      "Le collectif comme instrument psychologique (Vygotski) : il protège l'individu, permet l'entraide officieuse et absorbe les aléas du réel.",
      "Conséquences de l'absence de collectif : individualisation des échecs, décompensation dépressive, culpabilité et conflits interpersonnels.",
      "Méthodes pour faire émerger le collectif : restaurer les espaces de parole sur le travail réel plutôt que sur le relationnel.",
    ],
    planConseille: [
      "1. Introduction : Clarification sémantique. L'illusion managériale de l'« équipe » décrétée par organigramme face à la réalité clinique.",
      "2. Travail collectif vs Collectif de travail : Définitions croisées (ergonomie de l'activité et clinique de l'activité).",
      "3. Les piliers constitutifs du collectif de travail : Règles de métier, confiance, délibération et soutien mutuel.",
      "4. Les pathologies du travail collectif sans collectif : Isolement, reporting individualisé, intensification et détresse.",
      "5. Conclusion & perspectives : Comment l'intervention clinique permet aux professionnels de re-faire collectif.",
    ],
    corrige: `
<h5>Introduction & Pertinence contemporaine</h5>
<p>Les organisations modernes multiplient les injonctions au « travail d'équipe », au « management transversal » et à l'« agilité collaborative ». Pourtant, la formule issue des travaux de <b>Nathalie Caroly, Yves Clot, Christine Battini et Annie Weill-Fassina</b> rappelle une évidence trop souvent oubliée : <b>rassembler des personnes sur un même lieu avec un objectif commun relève du travail collectif, mais ne produit pas spontanément un collectif de travail</b>.</p>

<h5>1. Travail collectif vs Collectif de travail : deux logiques distinctes</h5>
<p>Il est indispensable de distinguer la modalité organisationnelle de l'instance psychologique :</p>
<ul>
  <li>Le <b>travail collectif</b> est une donnée prescrite par l'organisation : il s'agit d'une répartition fonctionnelle des tâches (co-action, complémentarité technique, division horizontale du travail). L'équipe est décrétée par la note de service ou l'organigramme.</li>
  <li>Le <b>collectif de travail</b> est une <i>conquête vivante et continue</i> des opérateurs. C'est une instance psychologique transpersonnelle dans laquelle les travailleurs partagent une histoire commune, élaborent des règles d'action officieuses et s'accordent sur ce que signifie « bien faire le travail » dans des conditions imparfaites.</li>
</ul>

<h5>2. Les conditions d'existence d'un collectif de travail</h5>
<p>Selon Nathalie Caroly et Yves Clot, un groupe de travail ne devient un collectif de travail que sous trois conditions fondamentales :</p>
<ol>
  <li><b>L'existence d'un genre professionnel partagé</b> : un socle de règles de métier implicites mais vivantes, de repères communs face au danger et aux arbitrages éthiques.</li>
  <li><b>La confiance réciproque et le droit à l'erreur</b> : savoir que l'on peut demander de l'aide à un pair sans risquer le jugement ou la dénonciation hiérarchique.</li>
  <li><b>La reconnaissance mutuelle des compétences</b> : validation par les pairs de la qualité du geste et de l'ingéniosité des compromis trouvés.</li>
</ol>

<h5>3. Les conséquences pathogènes du travail collectif sans collectif</h5>
<p>Lorsque le management individualise les carrières, met en place des primes à la performance individuelle, impose le flex-office ou modifie continuellement la composition des équipes par du turn-over et du recours massif à l'intérim, il détruit le collectif de travail :</p>
<ul>
  <li>Chaque salarié se retrouve <b>seul face au prescrit et aux aléas</b>. Les difficultés techniques sont vécues sur le mode de l'incompétence individuelle.</li>
  <li>Faute d'arbitrage collectif, la charge mentale s'accroît, engendrant épuisement professionnel (burn-out) et somatisations (TMS).</li>
  <li>Le groupe se fissure en rivalités et en règlements de comptes interindividuels : la dispute professionnelle sur le travail cède la place aux conflits de personnalités.</li>
</ul>

<h5>4. Du travail collectif au collectif de travail : le rôle de la clinique</h5>
<p>Pour faire émerger un collectif de travail, les réunions d'information descendantes ou les activités de « team-building » ludiques sont inopérantes. Il s'agit de redonner aux opérateurs la possibilité d'instruire collectivement les dilemmes du métier réel. Par les dispositifs d'autoconfrontation et les espaces de controverse réglée, la clinique de l'activité restaure le collectif comme <i>instrument psychologique de pensée et d'action</i>.</p>
`,
  },
  {
    id: 4,
    slug: "elaboration-experience-vygotski",
    titre: "Sujet 4 : L'élaboration de l'expérience — « Avoir connaissance de ses expériences vécues... »",
    theme: "Médiation sémiotique, dédoublement de l'expérience et méthode clinique",
    citation: {
      texte: "« Avoir connaissance de ses expériences vécues n'est rien d'autre que de les avoir à sa disposition à titre d'objet pour faire d'autres expériences. »",
      auteur: "Lev Vygotski",
      source: "Pensée et Langage (1934)",
      annee: "1934",
    },
    conceptsCles: [
      "Expérience vécue vs Expérience élaborée",
      "Médiation sémiotique",
      "Dédoublement de l'expérience",
      "Zone Proximale de Développement (ZPD)",
      "Instruction au Sosie",
      "Autoconfrontation",
    ],
    auteursLies: ["Lev Vygotski", "Yves Clot", "Ivar Oddone", "Mikhaïl Bakhtine"],
    questions: [
      "L'expérience accumulée au fil des années au travail est-elle toujours formatrice ?",
      "En quoi les interactions sociales et le collectif de travail jouent-ils un rôle déterminant dans l'élaboration de l'expérience professionnelle ?",
      "Discutez de l'importance du partage d'expérience, du tutorat, de la reconnaissance par les pairs et des conflits dans ce processus.",
      "En quoi les méthodes d'analyse du travail issues de la clinique de l'activité (Instruction au Sosie, autoconfrontation) peuvent-elles éclairer le processus d'élaboration de l'expérience professionnelle ?",
      "Comment la compréhension de l'activité réelle peut-elle enrichir la conception de la formation et du développement des compétences au travail ?",
    ],
    criteres: [
      "Thèse centrale : l'expérience brute n'est pas formatrice en soi ; elle peut s'enfermer dans l'ornière de la routine défensive.",
      "Mécanisme vygotskien : l'expérience ne devient ressource que lorsqu'elle est transformée en 'objet de pensée' par la médiation du langage et du dialogue avec autrui.",
      "Passage de l'inter- à l'intra-psychologique : ce qui se débat d'abord entre deux travailleurs est intériorisé par le sujet pour nourrir son propre pouvoir d'agir.",
      "Dédoublement clinique : le principe de l'Instruction au Sosie d'Oddone (se regarder agir de l'extérieur) et de l'autoconfrontation (se voir en vidéo et confronter son point de vue avec un pair).",
      "Critique de la formation traditionnelle : la transmission de compétences ne consiste pas à ingurgiter un prescrit, mais à mettre au travail les controverses du réel.",
    ],
    planConseille: [
      "1. Introduction : Situer Lev Vygotski (père fondateur de la psychologie historique et culturelle soviétique) et son influence cardinale sur Yves Clot et la clinique de l'activité.",
      "2. Dépasser le mythe de l'ancienneté : Pourquoi l'expérience spontanée peut être aliénante (usure, stéréotypie gestuelle).",
      "3. La médiation du langage et d'autrui : Comment le vécu devient objet de réflexion à travers le collectif, le tutorat et la controverse.",
      "4. Les dispositifs cliniques de dédoublement : L'Instruction au Sosie (Oddone) et l'Autoconfrontation simple/croisée (Clot) comme laboratoires d'élaboration de l'expérience.",
      "5. Conclusion : Vers une ingénierie développementale du travail axée sur la controverse professionnelle.",
    ],
    corrige: `
<h5>Introduction & Ancrage historico-culturel</h5>
<p>Tiré du chef-d'œuvre de <b>Lev Vygotski</b>, <i>Pensée et Langage</i> (1934), cet aphorisme résume l'une des découvertes les plus fécondes de la psychologie historico-culturelle : <b>vivre une situation ne suffit pas à en tirer une expérience</b>. Pour qu'un vécu devienne une ressource pour l'action future, il doit faire l'objet d'un dédoublement, être extrait du flux immédiat de la vie et converti en instrument de pensée.</p>

<h5>1. L'illusion de l'expérience brute et spontanée</h5>
<p>L'expérience n'est pas automatiquement formatrice. Sans mise en mots et sans confrontation avec autrui :</p>
<ul>
  <li>L'expérience peut se figer en routine défensive ou en usure précoce. Le travailleur accumule les années d'ancienneté mais répète les mêmes gestes sans plus en comprendre la genèse.</li>
  <li>L'impossibilité de formaliser ses propres savoir-faire tacites produit un sentiment d'incompétence paradoxale : le professionnel « sait faire », mais il est incapable d'expliquer comment il s'y prend ni de transmettre ses tours de main aux novices.</li>
</ul>

<h5>2. La médiation du langage et le rôle moteur d'autrui</h5>
<p>Chez Vygotski, toute fonction psychique supérieure apparaît deux fois dans le développement de l'individu : d'abord au niveau social (<b>inter-psychologique</b>, entre les sujets), puis à l'intérieur du sujet (<b>intra-psychologique</b>) :</p>
<ul>
  <li>C'est dans l'échange avec les collègues, dans le tutorat, et plus encore dans la <i>controverse réglée</i> sur la façon d'aborder un problème de travail, que l'activité réelle est nommée, comparée et évaluée.</li>
  <li>Le langage sert d'<b>artefact médiateur</b> : en parlant de son travail à un pair, le travailleur prend de la distance vis-à-vis de son propre geste. Son action cesse d'être une pure réponse motrice ou émotionnelle pour devenir un <i>objet d'analyse</i>.</li>
</ul>

<h5>3. Les méthodes cliniques comme dispositifs de dédoublement</h5>
<p>La clinique de l'activité a opérationnalisé ce principe vygotskien à travers des méthodologies rigoureuses d'intervention :</p>
<ul>
  <li><b>L'Instruction au Sosie (Ivar Oddone)</b> : En demandant à un opérateur de donner toutes les consignes nécessaires à un sosie pour qu'aucun collègue ne s'aperçoive du remplacement le lendemain, le travailleur est contraint de décomposer l'invisible de son métier, d'extérioriser ses secrets de fabrication et de transformer son expérience en règles partageables.</li>
  <li><b>L'Autoconfrontation simple puis croisée (Yves Clot)</b> : Le travailleur est d'abord filmé dans l'activité réelle, puis commente la vidéo avec le chercheur (autoconfrontation simple). Ensuite, deux collègues visionnent ensemble les mêmes séquences et confrontent leurs manières divergentes d'opérer (autoconfrontation croisée). Le film sert d'objet tiers qui déclenche une <i>activité dialogique</i> déstabilisant les certitudes et rouvrant la Zone Proximale de Développement (ZPD).</li>
</ul>

<h5>4. Conclusion : Repenser la formation professionnelle</h5>
<p>Pour enrichir la formation au travail, il ne s'agit plus de plaquer des savoirs théoriques abstraits depuis l'extérieur, mais d'outiller les professionnels pour qu'ils s'emparent de leur propre expérience vécue, la transforment en matière de débat et développent durablement leur pouvoir d'agir.</p>
`,
  },
  {
    id: 5,
    slug: "pouvoir-d-agir-puissance-sociale",
    titre: "Sujet 5 : Le pouvoir d'agir — « Une puissance qui se construit dans le rapport aux autres et au monde »",
    theme: "Le pouvoir d'agir, santé normative et émancipation",
    citation: {
      texte: "« Le pouvoir d'agir, ce n'est pas une capacité individuelle isolée, mais une puissance qui se construit et se déploie dans le rapport aux autres et au monde. »",
      auteur: "Yves Clot",
      source: "Travail et pouvoir d'agir (2008)",
      annee: "2008",
    },
    conceptsCles: [
      "Pouvoir d'agir",
      "Puissance d'agir (Spinoza)",
      "Santé normative (Canguilhem)",
      "Empowerment vs Clinique",
      "Médiations organisationnelles",
      "Capacité d'agir sur le milieu",
    ],
    auteursLies: ["Yves Clot", "Baruch Spinoza", "Georges Canguilhem", "Lev Vygotski"],
    questions: [
      "Comment cette citation définit-elle le « pouvoir d'agir » selon Yves Clot ?",
      "Expliquez pourquoi il ne s'agit pas d'une simple « capacité individuelle » ou d'une compétence psychologique isolée.",
      "Quels sont les éléments essentiels qui contribuent à la construction et au déploiement de ce pouvoir d'agir ?",
      "Comment les organisations du travail contemporaines peuvent-elles favoriser ou au contraire entraver ce pouvoir d'agir chez leurs salariés ?",
      "Quels bénéfices individuels et collectifs résultent d'un pouvoir d'agir renforcé, notamment au regard de la santé conçue au sens de Georges Canguilhem ?",
    ],
    criteres: [
      "Rupture avec les modèles individualisants (résilience, sentiment d'auto-efficacité de Bandura, soft skills).",
      "Ancrage philosophique chez Spinoza (la conatus / puissance d'agir) et Vygotski (l'action instrumentée).",
      "Le pouvoir d'agir suppose une prise sur le réel, sur l'organisation et sur le collectif.",
      "Obstacles organisationnels : prescriptions descendantes, Lean rigide, reporting infantilisant, injonctions contradictoires.",
      "Lien santé/normativité (Canguilhem) : être en santé, c'est pouvoir transformer son milieu de travail plutôt que de s'y soumettre passivement.",
    ],
    planConseille: [
      "1. Introduction : La place centrale du concept de « pouvoir d'agir » dans l'œuvre d'Yves Clot et dans le programme PST 106. Clarification face aux contresens néolibéraux de l'empowerment.",
      "2. Une puissance relationnelle et médiatisée : Pourquoi le pouvoir d'agir n'est jamais une compétence purement individuelle.",
      "3. Les conditions organisationnelles du pouvoir d'agir : Outils, marges de manœuvre, délibération collective et écoute hiérarchique.",
      "4. Pouvoir d'agir et santé mentale : La santé comme création de normes (Canguilhem) et dépassement de la souffrance.",
      "5. Conclusion : Vers une refondation de l'organisation du travail par l'écoute du travail réel.",
    ],
    corrige: `
<h5>Introduction & Enjeu théorique</h5>
<p>Au cœur de l'ouvrage éponyme d'Yves Clot (<i>Travail et pouvoir d'agir</i>, 2008), ce concept renouvelle en profondeur la psychologie du travail en refusant d'enfermer le travailleur dans le statut de victime passive ou de gestionnaire isolé de son propre stress. Le <b>pouvoir d'agir</b> s'inscrit dans la lignée philosophique de <b>Baruch Spinoza</b> (la <i>potentia agendi</i>) et de l'approche historico-culturelle de Vygotski.</p>

<h5>1. Rupture avec l'individualisation des compétences</h5>
<p>L'idéologie managériale dominante tend à réduire la réussite ou la souffrance à des aptitudes individuelles : résistance au stress, adaptabilité, agilité ou « résilience ». Pour Yves Clot, cette approche est un leurre théorique et une faute clinique :</p>
<ul>
  <li>Un individu seul ne possède pas un « pouvoir d'agir » en réserve qu'il suffirait d'activer par du coaching ou de la pensée positive.</li>
  <li>Le pouvoir d'agir est une <b>puissance relationnelle et médiatisée</b> : il s'élabore dans le rapport aux instruments de travail, dans l'affiliation au genre professionnel (les pairs) et dans la possibilité d'exercer une prise effective sur les règles de l'organisation.</li>
</ul>

<h5>2. Les composantes du pouvoir d'agir</h5>
<p>Le pouvoir d'agir se déploie lorsque le sujet peut mobiliser trois dimensions coordonnées :</p>
<ol>
  <li><b>La dimension objective</b> : disposer des outils, du temps et des moyens matériels nécessaires pour réaliser une tâche sans compromettre la qualité.</li>
  <li><b>La dimension transpersonnelle</b> : s'appuyer sur le collectif de métier pour arbitrer les conflits de critères (sécurité, rapidité, rigueur) et inventer des réponses appropriées.</li>
  <li><b>La dimension organisationnelle</b> : être entendu par la hiérarchie lorsque les prescriptions sont inadaptées au terrain, de sorte que l'action réelle puisse rétroagir sur la tâche prescrite.</li>
</ol>

<h5>3. L'amputation du pouvoir d'agir dans le travail contemporain</h5>
<p>Les organisations du travail tayloriennes, toyotistes ou bureaucratisées amputent méthodiquement le pouvoir d'agir :</p>
<ul>
  <li>En imposant des procédures déconnectées du terrain, des indicateurs de reporting permanent et un contrôle descendant des comportements, elles dépossèdent les professionnels de leur autonomie décisionnelle.</li>
  <li>Le salarié se retrouve contraint de déployer des trésors d'énergie clandestine pour faire fonctionner le système tout en sachant que ses alertes ne seront jamais prises en compte. Cette situation d'impuissance apprise est la première cause de l'usure psychique au travail.</li>
</ul>

<h5>4. Pouvoir d'agir et Santé au sens de Georges Canguilhem</h5>
<p>La clinique de l'activité définit la santé à travers l'apport fondamental de <b>Georges Canguilhem</b> (<i>Le normal et le pathologique</i>, 1966) :</p>
<ul>
  <li>La santé n'est pas l'adaptation muette au milieu imposé. Être bien portant, c'est être capable de <i>« tolérer des infractions à la norme habituelle et d'instituer de nouvelles normes dans des situations nouvelles »</i>.</li>
  <li>Le pouvoir d'agir est l'expression même de cette normativité : pouvoir transformer son environnement professionnel plutôt que de s'y soumettre docilement. Quand le pouvoir d'agir augmente, la santé progresse ; quand il est bloqué, la souffrance s'installe.</li>
</ul>
`,
  },
  {
    id: 6,
    slug: "genre-et-style-reciterations-stylistiques",
    titre: "Sujet 6 : Le Genre et le Style — « Le genre reste vivant grâce à ses recréations stylistiques »",
    theme: "La dynamique transpersonnel / personnel et la plasticité du travail",
    citation: {
      texte: "« Le genre reste vivant grâce à ses recréations stylistiques. »",
      auteur: "Yves Clot",
      source: "La fonction psychologique du travail (1999)",
      annee: "1999",
    },
    conceptsCles: [
      "Genre professionnel",
      "Style professionnel",
      "Recréations stylistiques",
      "Mémoire transpersonnelle",
      "Pluralisme dialogique (Bakhtine)",
      "Injonctions paradoxales",
    ],
    auteursLies: ["Yves Clot", "Mikhaïl Bakhtine", "Lev Vygotski", "Daniel Faïta"],
    questions: [
      "Définissez précisément les concepts de « Genre professionnel » et de « Style professionnel ».",
      "Expliquez la dynamique réciproque de leur rapport : comment le style puise-t-il dans le genre, et comment les recréations stylistiques transforment-elles le genre ?",
      "En clinique de l'activité, comment l'absence ou l'interdiction de recréations stylistiques peut-elle se traduire au niveau de l'expérience des travailleurs et de l'efficacité du travail ?",
      "Peut-on établir un lien direct entre les recréations stylistiques et le développement du pouvoir d'agir des individus et des collectifs au travail ?",
      "Comment le psychologue du travail peut-il accompagner et soutenir les salariés face aux contraintes organisationnelles et aux injonctions paradoxales pour libérer cette dynamique stylistique ?",
    ],
    criteres: [
      "Définition du Genre (emprunté à Bakhtine) : système de règles implicites, manières de s'adresser aux collègues/usagers, corps de métier.",
      "Définition du Style : signature subjective, inflexion singulière de l'opérateur sur le genre disponible.",
      "Le cycle vivant : le genre autorise le style (comme la grammaire autorise la littérature) ; le style alimente et modernise le genre.",
      "Pathologie de la dissociation : le genre fossilisé (stéréotypie, conservatisme stérile) ou le style isolé (individualisme, bricolage solitaire non reconnu).",
      "Posture clinique : organiser la confrontation entre pairs pour que les styles individuels soient discutés et fassent progresser le genre collectif.",
    ],
    planConseille: [
      "1. Introduction : Définir le couple conceptuel Genre/Style emprunté par Yves Clot à la linguistique de Mikhaïl Bakhtine.",
      "2. Le Genre professionnel comme ressource transpersonnelle : Une mémoire collective qui affranchit de l'improvisation.",
      "3. Le Style comme recréation indispensable : L'empreinte de la subjectivité face aux aspérités du réel.",
      "4. Les pathologies du blocage stylistique : Quand la prescription managériale étouffe le style et tue le genre.",
      "5. Conclusion : La dispute stylistique comme méthode de développement en clinique de l'activité.",
    ],
    corrige: `
<h5>Introduction & Emprunt à la linguistique bakhtinienne</h5>
<p>Pour dépasser l'opposition stérile entre l'individu et le collectif, Yves Clot et Daniel Faïta importent en psychologie du travail les concepts forgés par le linguiste <b>Mikhaïl Bakhtine</b> pour analyser les genres de discours. Dans cette perspective, la formule <b>« le genre reste vivant grâce à ses recréations stylistiques »</b> dévoile la dialectique permanente qui unit le patrimoine commun d'un métier et la liberté d'action singulière des professionnels.</p>

<h5>1. Définitions rigoureuses du Genre et du Style</h5>
<p>Les deux concepts ne s'opposent pas : ils s'engendrent mutuellement.</p>
<ul>
  <li><b>Le Genre professionnel</b> est la mémoire collective, transpersonnelle et vivante d'un milieu de travail. C'est l'ensemble des manières de faire, de sentir, de parler et de se taire partagées par les pairs. Le genre agit comme un <i>mot de passe</i> collectif : il dispense le salarié de devoir réinventer la posture adéquate à chaque instant et le protège du vide.</li>
  <li><b>Le Style professionnel</b> est la signature personnelle du travailleur. C'est la manière singulière dont un opérateur s'empare du genre disponible, le module, le nuance et l'adapte aux circonstances imprévues de la situation réelle.</li>
</ul>

<h5>2. La métaphore linguistique : la langue et la parole</h5>
<p>Tout comme la grammaire d'une langue n'existe pas pour empêcher de parler mais pour rendre possible une infinité d'énoncés originaux, le genre professionnel est une <i>matrice de possibles</i> :</p>
<ul>
  <li>Le style s'appuie sur le genre pour exister : sans genre commun, il n'y a pas de style, mais seulement un bricolage désespéré et précaire.</li>
  <li>En retour, le style nourrit le genre : face à une machine capricieuse, à un usager agressif ou à une pénurie matérielle, un travailleur invente un geste stylistique novateur. Si ce geste est remarqué, débattu et adopté par les collègues, il s'intègre au genre et l'actualise. Le genre reste ainsi vivant et branché sur le réel.</li>
</ul>

<h5>3. Les ravages de l'interdiction stylistique</h5>
<p>Lorsque le taylorisme moderne ou les protocoles informatisés du New Public Management prétendent dicter non seulement le résultat attendu, mais le geste exact, le script téléphonique au mot près et le minutage de chaque acte :</p>
<ul>
  <li>Ils suppriment la possibilité même du style. L'activité est réduite à l'exécution mécanique d'une prescription dévitalisée.</li>
  <li>Le travailleur ressent une profonde souffrance éthique et identitaire : il est empêché de mettre son intelligence et sa sensibilité dans son ouvrage.</li>
  <li>Le genre professionnel se désagrège : privé de renouvellement stylistique, il devient une coutume obsolète ou une nostalgie corporatiste impuissante.</li>
</ul>

<h5>4. L'intervention clinique : restaurer la controverse stylistique</h5>
<p>L'autoconfrontation croisée consiste précisément à mettre en dialogue deux professionnels qui ont filmé des séquences identiques de travail réel. En observant les divergences de leurs styles respectifs (<i>« Pourquoi as-tu fait ce geste à ce moment-là ? Moi j'aurais fait autrement »</i>), ils ne s'opposent pas en rivaux : ils explorent ensemble les potentialités inexplorées de leur genre commun et régénèrent le métier.</p>
`,
  },
  {
    id: 7,
    slug: "qualite-du-travail-et-sante-bien-faire",
    titre: "Sujet 7 : La qualité du travail et la santé — « Il n'y a pas de bien-être sans bien faire »",
    theme: "Le travail bien fait, santé mentale et critique de la QVT cosmétique",
    citation: {
      texte: "« Il n'y a pas de bien-être au travail sans bien faire. »",
      auteur: "Yves Clot",
      source: "Le travail à cœur. Pour en finir avec les risques psychosociaux (2010)",
      annee: "2010",
    },
    conceptsCles: [
      "Travail bien fait",
      "Qualité empêchée",
      "Souffrance éthique",
      "Critique de la QVT cosmétique",
      "Dispute sur la qualité",
      "Santé mentale au travail",
    ],
    auteursLies: ["Yves Clot", "Christophe Dejours", "Georges Canguilhem", "Alexis Chambel"],
    questions: [
      "Analysez et discutez cette affirmation d'Yves Clot à la lumière des concepts fondamentaux de la clinique de l'activité.",
      "Explicitez ce que Clot entend par « bien-être au travail » : en quoi diffère-t-il d'une simple absence de mal-être ou d'une approche cosmétique des RPS ?",
      "Qu'est-ce que signifie « bien faire » selon Yves Clot ? Dépasse-t-il la simple conformité aux prescriptions et aux objectifs ?",
      "Analysez le lien de causalité implicite dans la citation : pourquoi le « bien faire » est-il présenté comme une condition nécessaire au « bien-être » ?",
      "En clinique de l'activité, comment cette citation remet-elle en question les démarches de QVT centrées uniquement sur des facteurs périphériques (avantages, conciergerie, sophrologie) ?",
      "Comment peut-on accompagner les individus et les collectifs pour retrouver un sentiment de « bien faire » et ainsi favoriser leur santé au travail ?",
    ],
    criteres: [
      "Thèse centrale : la cause première du mal-être et des RPS contemporains n'est pas le stress individuel, mais l'impossibilité de réaliser un travail de qualité.",
      "Le 'bien faire' ne signifie pas obéir au prescrit : il renvoie aux critères du métier débattus dans le collectif.",
      "Le concept de 'qualité empêchée' : le sentiment destructeur de devoir livrer un travail bâclé, source de honte et d'épuisement.",
      "Critique féroce de la 'QVT cosmétique' : les baby-foots, les ateliers de gestion du stress ou les fruits bio qui esquivent le débat sur l'organisation réelle du travail.",
      "Proposition clinique : instituer des espaces pérennes de dispute professionnelle où la direction et les salariés débattent des arbitrages de production.",
    ],
    planConseille: [
      "1. Introduction : Contexte de publication de <i>Le travail à cœur</i> (2010), en pleine crise des suicides au travail (France Télécom, Renault). Poser la thèse du travail soigné.",
      "2. Déconstruire la QVT périphérique : L'illusion hygiéniste et le déni du travail réel.",
      "3. Qu'est-ce que « bien faire » ? La qualité comme construction conflictuelle et collective.",
      "4. La « qualité empêchée », cœur des risques psychosociaux : Le coût psychique du travail ni fait ni à faire.",
      "5. Conclusion : Faire de la qualité du travail l'objet central du dialogue social et de l'intervention clinique.",
    ],
    corrige: `
<h5>Introduction & Contexte de crise</h5>
<p>Publié au lendemain des vagues dramatiques de suicides industriels de la fin des années 2000, <i>Le travail à cœur</i> (2010) d'Yves Clot dénonce l'imposture du traitement managérial des « risques psychosociaux » (RPS). En affirmant qu'<b>« il n'y a pas de bien-être au travail sans bien faire »</b>, Clot opère une révolution copernicienne : la santé au travail ne dépend pas de dispositifs d'amortissement périphérique, mais de la possibilité quotidienne d'accomplir un travail dont on puisse être fier.</p>

<h5>1. La critique sans concession de la QVT cosmétique</h5>
<p>Depuis quinze ans, les entreprises et les administrations rivalisent d'initiatives pour améliorer la « Qualité de Vie au Travail » (QVT) : salles de sieste, tables de ping-pong, séances de méditation pleine conscience, conciergeries d'entreprise ou cours de yoga :</p>
<ul>
  <li>Pour la clinique de l'activité, ces démarches relèvent d'un <b>hygiénisme périphérique</b> qui détourne l'attention de l'essentiel : elles prétendent soigner le travailleur en dehors de son travail réel.</li>
  <li>Pire, elles culpabilisent les salariés en laissant entendre que le mal-être résulte d'une fragilité émotionnelle ou d'un déficit personnel de gestion du stress, dédouanant ainsi l'organisation de sa responsabilité.</li>
</ul>

<h5>2. Que signifie « bien faire » en clinique de l'activité ?</h5>
<p>Le « bien faire » ne se confond jamais avec la conformité servile aux procédures ou aux normes ISO :</p>
<ul>
  <li>Dans la plupart des situations réelles, le respect scrupuleux et aveugle de la prescription mènerait au blocage complet de la production (la grève du zèle).</li>
  <li>« Bien faire », c'est opérer les compromis opératoires nécessaires pour concilier la sécurité des usagers, la pérennité du matériel, l'esthétique du geste et le temps imparti. Ce « bien faire » n'est pas solitaire : il s'élabore dans la <b>délibération entre pairs</b> au sein du collectif de travail.</li>
</ul>

<h5>3. La « qualité empêchée », poison de la santé mentale</h5>
<p>Lorsque les suppressions de postes, le sous-effectif chronique et les critères purement financiers contraignent les soignants, les cheminots, les enseignants ou les ouvriers à expédier leur tâche :</p>
<ul>
  <li>Ils subissent l'épreuve dévastatrice de la <b>qualité empêchée</b>. Ils doivent rentrer chez eux avec le sentiment d'avoir accompli un travail de sagouin, d'avoir « maltraité » un patient ou expédié un client.</li>
  <li>Cette souffrance éthique détruit l'estime de soi professionnelle et engendre l'épuisement psychique : <i>ce n'est pas le travail qui rend malade, c'est l'impossibilité de bien le faire</i>.</li>
</ul>

<h5>4. L'intervention clinique : mettre le travail au cœur du dialogue</h5>
<p>Pour restaurer le bien-être, il faut restaurer la possibilité du bien faire. Cela exige la création d'<b>espaces de controverse et de délibération pérennes</b> au sein desquels les professionnels, leurs pairs et leur encadrement de proximité peuvent débattre contradictoirement des critères du travail soigné. C'est en faisant de la qualité du travail l'enjeu central de l'organisation que l'on restaure durablement la santé et l'efficience.</p>
`,
  },
  {
    id: 8,
    slug: "epistemologie-et-etude-de-cas-urgences",
    titre: "Sujet 8 : Théorie et Étude de cas — Héritages russes, Ergonomie & Cas des Urgences",
    theme: "Épistémologie comparée et méthodologie d'intervention sur cas hospitalier",
    citation: {
      texte: "« L'activité est une forme de vie historique qui ne cesse de se métamorphoser dans les épreuves du travail. »",
      auteur: "Approche intégrative (Vygotski, Leontiev, Wisner, Clot)",
      source: "Archives des examens PST106 Cnam",
      annee: "2018 / 2022",
    },
    conceptsCles: [
      "Psychologie historico-culturelle",
      "Ergonomie francophone (Wisner)",
      "Métier vs Fiche de poste",
      "Co-analyse de la demande",
      "Autoconfrontations simple et croisée",
      "Restitution organisationnelle",
    ],
    auteursLies: ["Lev Vygotski", "Alain Wisner", "Yves Clot", "Alexeï Léontiev"],
    questions: [
      "Discutez la place et la complémentarité des concepts russes de l'activité (Vygotski, Léontiev, Bakhtine, Rubinstein) et des approches ergonomiques francophones (Wisner, Faverge, Leplat) dans la genèse de la clinique de l'activité. Illustrez par un exemple concret.",
      "Développez la notion de « Métier » en clinique de l'activité : en quoi transcende-t-il la simple fiche de poste ou la qualification contractuelle ? Comment sert-il de levier pour la « dispute professionnelle » ?",
      "Cas pratique : Vous êtes sollicité pour intervenir auprès d'une équipe soignante d'un service d'urgences hospitalières en proie à des réorganisations brutales, un mal-être aigu, une perte de sens et un turnover record. Détaillez rigoureusement votre démarche d'intervention clinique de l'activité (co-analyse de la demande, recueil de traces vidéo, autoconfrontation simple puis croisée, retour au collectif étendu et restitution organisationnelle).",
    ],
    criteres: [
      "Partie théorique : articulation claire entre la distinction tâche/activité de l'ergonomie et la dimension dialogique/développementale de l'école russe.",
      "Définition du métier comme ressource transpersonnelle (genre) et non comme statut juridique statique.",
      "Partie pratique : respecter scrupuleusement les étapes de l'intervention clinique de l'activité sans brûler les étapes.",
      "Le recueil de traces : vidéo choisie avec les professionnels, garantie de confidentialité absolue et non-utilisation à des fins d'évaluation hiérarchique.",
      "Le protocole d'autoconfrontation simple (soignant + chercheur) puis croisée (2 soignants + chercheur) : déclenchement de la dispute sur le travail bien fait.",
      "Le retour vers l'organisation : restitution au collectif large et engagement de la direction hospitalière sur les arbitrages organisationnels.",
    ],
    planConseille: [
      "1. Introduction théorique : Le double héritage de la clinique de l'activité (l'ergonomie de l'activité de Wisner + l'école russe de Vygotski/Léontiev/Bakhtine).",
      "2. Le concept de Métier revisité : La dispute professionnelle sur la qualité soignante.",
      "3. Cas pratique aux urgences — Phase 1 : La co-analyse de la demande et le cadre déontologique (la commande institutionnelle vs la demande réelle des soignants).",
      "4. Cas pratique — Phase 2 : Le protocole vidéo et les autoconfrontations (simple puis croisée).",
      "5. Cas pratique — Phase 3 : Le retour au collectif et la transformation des arbitrages organisationnels.",
      "6. Conclusion : La posture clinique du psychologue (ni expert omniscient, ni médiateur neutre).",
    ],
    corrige: `
<h5>Partie 1 : Fondements épistémologiques et concept de Métier</h5>

<p><b>1. La double filiation de la Clinique de l'Activité :</b></p>
<ul>
  <li>De l'<b>ergonomie francophone</b> (Alain Wisner, Jacques Leplat, Jean-Marie Faverge), la clinique de l'activité hérite du refus de la psychotechnique originelle et de la distinction fondatrice entre la <i>tâche prescrite</i> (ce que l'organisation demande) et l'<i>activité réelle</i> (ce que le corps et l'esprit mobilisent pour faire face aux variabilités du terrain).</li>
  <li>De la <b>théorie historico-culturelle soviétique</b> (Lev Vygotski, Alexeï Léontiev, Mikhaïl Bakhtine), elle reprend la conception d'un sujet social qui se construit par la médiation d'instruments et du langage. L'activité n'est pas seulement une réponse adaptative à une contrainte physique : c'est un processus de transformation mutuelle de l'homme et de son milieu. Léontiev apporte les trois niveaux de l'activité (activité orientée par le motif, actions orientées par des buts conscients, opérations automatisées par les conditions matérielles) ; Bakhtine apporte la dimension dialogique (le dialogue intérieur est le reflet des dialogues sociaux passés et présents).</li>
</ul>

<p><b>2. Le Métier contre la Fiche de poste :</b></p>
<p>Pour la clinique de l'activité, la <b>fiche de poste</b> est un artefact de gestion qui fige des tâches prescrites et des responsabilités individuelles. Le <b>métier</b>, lui, est une instance vivante et transpersonnelle (le <i>genre professionnel</i>). Il est le réservoir de l'histoire collective du travail bien fait. C'est précisément parce que le métier dépasse l'individu qu'il peut devenir l'objet d'une <b>dispute professionnelle</b> : les soignants ne s'affrontent pas sur leurs caractères personnels, mais débattent des critères de la prise en charge d'un patient polytraumatisé face au manque de lits.</p>

<hr style="margin: 16px 0; border: 0; border-top: 1px dashed var(--line);" />

<h5>Partie 2 : Démarche d'intervention clinique aux Urgences hospitalières</h5>

<p>Face à la détresse d'une équipe soignante aux urgences (perte de sens, turn-over, conflit entre infirmiers et aides-soignants), l'intervention ne consiste ni à animer un groupe de parole cathartique, ni à dispenser une formation sur la gestion du stress. Elle suit un protocole méthodique de co-analyse du travail réel :</p>

<h6>Étape 1 : Co-analyse de la demande et négociation du cadre</h6>
<ul>
  <li>L'intervenant ne prend pas la commande de la direction pour argent comptant (<i>« réconcilier les équipes et faire accepter le nouveau logiciel »</i>). Il rencontre l'ensemble des acteurs (direction, encadrement, soignants, représentants syndicaux) pour construire une <b>demande partagée</b>.</li>
  <li>Il pose les conditions déontologiques strictes : <b>volontariat absolu</b> des participants, garantie que les enregistrements vidéo ne seront jamais transmis à la hiérarchie ni utilisés pour de l'évaluation individuelle, et engagement de la direction à étudier les préconisations issues de la démarche.</li>
  <li>Constitution d'un <b>groupe de pairs volontaires</b> (infirmiers et aides-soignants) représentant la diversité des anciennetés et des sensibilités.</li>
</ul>

<h6>Étape 2 : Recueil des traces de l'activité réelle</h6>
<ul>
  <li>Avec les professionnels du groupe, l'intervenant identifie des <i>situations de travail critiques et récurrentes</i> qui font dilemme (ex. le tri des urgences vitales à l'accueil lors d'un pic d'affluence, le relais des transmissions infirmière/aide-soignante, ou la saisie sur écran au détriment du contact patient).</li>
  <li>Des séquences de travail réel de 10 à 20 minutes sont captées en vidéo, toujours avec l'accord explicite des soignants et des patients.</li>
</ul>

<h6>Étape 3 : L'Autoconfrontation simple</h6>
<ul>
  <li>Le soignant filmé visionne la vidéo en tête-à-tête avec le psychologue du travail.</li>
  <li>Le psychologue l'interroge avec bienveillance pour faire émerger l'activité empêchée et les choix implicites : <i>« Que fais-tu à cet instant précis ? À quoi penses-tu ? Qu'aurais-tu voulu faire d'autre ? Pourquoi as-tu hésité ? »</i></li>
  <li>Le professionnel prend conscience de la complexité de son geste et commence à convertir son expérience vécue en objet de pensée.</li>
</ul>

<h6>Étape 4 : L'Autoconfrontation croisée</h6>
<ul>
  <li>Deux collègues (par exemple deux infirmiers aux approches différentes, ou un binôme infirmier/aide-soignant) visionnent ensemble les séquences de l'un et de l'autre en présence du clinicien.</li>
  <li>Le chercheur stimule la controverse : <i>« Toi qui regardes ton collègue faire ce geste, qu'en penses-tu ? Pourquoi aurais-tu procédé différemment ? Quelles sont vos raisons professionnelles respectives ? »</i></li>
  <li>La divergence de styles ne débouche pas sur un jugement de valeur, mais met au jour les conflits de critères insolubles du métier. Le collectif se réapproprie le problème au lieu de le subir solitairement.</li>
</ul>

<h6>Étape 5 : Retour au collectif étendu et restitution organisationnelle</h6>
<ul>
  <li>Les extraits vidéo les plus représentatifs et les conclusions des autoconfrontations sont présentés à l'ensemble du service des urgences lors d'une séance collective. La dispute professionnelle se propage à tout le collectif, revitalisant le genre professionnel.</li>
  <li>Enfin, une <b>restitution conjointe</b> (soignants + clinicien) est organisée devant la direction et l'encadrement supérieur. Il ne s'agit plus de plaintes individuelles, mais d'une démonstration étayée des contradictions organisationnelles (ex. logiciel inadapté au flux d'urgence, articulation bancale des transmissions). La direction est placée devant la réalité de son système et sommée d'engager les arbitrages nécessaires.</li>
</ul>
`,
  },
];

/**
 * Adapter pour compatibilité avec le composant standard RedacItem [sujet, plan, corrige]
 */
export const ANNALES_REDAC_ITEMS: [string, string[], string][] = ANNALES_TEXTES_106.map(
  (a) => [
    `${a.titre}\n\nCitation : ${a.citation.texte} (${a.citation.auteur}, ${a.citation.source})`,
    [
      ...a.questions.map((q, i) => `Q${i + 1} : ${q}`),
      `--- CRITÈRES DE NOTATION EXAMEN ---`,
      ...a.criteres,
    ],
    a.corrige,
  ],
);

/**
 * Méthodologie officielle pour l'Option B : Question avec texte en support
 */
export const METHODE_TEXTE_SUPPORT = [
  {
    etape: "1. Phase de lecture & décryptage du texte (15-20 min)",
    regles: [
      "Identifier l'auteur, l'ouvrage et l'année (ex: Yves Clot, 1999 ou 2010 ; Lev Vygotski, 1934 ; Alain Wisner, 1972).",
      "Repérer les concepts clés au cœur de la citation (ex: réel vs réalisé, genre vs style, travail collectif vs collectif de travail).",
      "Formuler la tension ou le paradoxe central posé par la citation (ce que l'auteur veut bousculer dans le sens commun).",
      "Prendre connaissance de l'ensemble des sous-questions : elles suivent généralement une progression logique (définition → analyse critique → implications organisationnelles/cliniques).",
    ],
  },
  {
    etape: "2. Élaboration de la problématique et du fil conducteur (15 min)",
    regles: [
      "La question avec texte en support n'est PAS une simple succession de réponses déconnectées.",
      "Votre copie doit avoir une colonne vertébrale : montrez comment chaque sous-question contribue à éclairer le triptyque PST106 : Développement → Pouvoir d'agir → Santé.",
      "Posez une problématique transversale liant la citation aux impasses du travail contemporain.",
    ],
  },
  {
    etape: "3. Rédaction structurée des réponses (1h15)",
    regles: [
      "Pour chaque question, commencez par une définition conceptuelle rigoureuse (nommez les pères fondateurs : Clot, Vygotski, Léontiev, Bakhtine, Canguilhem, Wisner).",
      "Évitez la paraphrase à tout prix : ne répétez pas la citation avec d'autres mots, déployez les concepts implicites qui la rendent possible.",
      "Illustrez systématiquement par un exemple concret issu du terrain (milieu hospitalier, usine, transports, centre d'appels).",
      "Mobilisez toujours la dimension clinique : quel est l'effet sur la santé mentale du travailleur et que peut faire le psychologue du travail clinicien ?",
    ],
  },
  {
    etape: "4. Conclusion synthétique & ouverture (10 min)",
    regles: [
      "Résumez en 4-5 lignes la portée critique de la citation face aux dérives gestionnaires modernes (Lean, New Public Management, reporting chiffré).",
      "Ouvrez sur l'intervention clinique : la dispute professionnelle sur le travail bien fait comme levier de transformation démocratique des organisations.",
    ],
  },
];

/**
 * Grille d'auto-évaluation spécifique pour l'épreuve avec texte en support
 */
export const CRITERES_TEXTE_SUPPORT = [
  "J'ai contextualisé l'auteur, l'ouvrage et le courant théorique (Clinique de l'activité, CRTD CNAM).",
  "J'ai explicité le sens profond de la citation sans tomber dans la paraphrase.",
  "J'ai traité rigoureusement TOUTES les sous-questions du sujet en structurant mes réponses.",
  "J'ai défini avec précision les couples conceptuels mobilisés (réalisé/réel, genre/style, prescrit/réel).",
  "J'ai relié la question à la santé au travail au sens de Georges Canguilhem (capacité normative).",
  "J'ai mobilisé un exemple concret de situation de travail réelle pour incarner mon propos.",
  "J'ai explicité une modalité d'action clinique (autoconfrontation, instruction au sosie, espaces de délibération).",
  "J'ai évité le piège des réponses télégraphiques et maintenu une écriture fluide et universitaire.",
];
