/**
 * PST108 — Pratiques de la communication professionnelle
 * Annales officielles, sujets types d'examen & corrigés d'excellence (18+/20)
 *
 * Alignement strict sur le cours magistral, les publications et les documents ressources :
 * - M. Éric LUCY (Université Bordeaux 2 / IRTS Nouvelle-Aquitaine / Cnam)
 * - M. Francis VALLS (IRTS / Cnam / Méthode IOD)
 *
 * Modalités d'examen officiel CNAM (2h00) :
 * - Option A : Dissertation théorique (analyse dialectique, confrontation d'auteurs)
 * - Option B : Étude de situation de travail / Cas clinique (travail social, management, insertion)
 */

export interface AnnalePst108Item {
  id: string;
  session: string;
  type:
    | "dissertation"
    | "cas"
    | "bourdieu"
    | "habermas"
    | "honneth"
    | "valls"
    | "lucy";
  titre: string;
  contexteCitation?: string;
  questions: string[];
  criteres: string[];
  planConseille: {
    partie: string;
    sousParties: string[];
  }[];
  corrigeExcellence: string;
  piegesAEviter: string[];
  conceptsCles: string[];
}

export const ANNALES_PST108: AnnalePst108Item[] = [
  {
    id: "pst108-annale-01",
    session: "Option A — Dissertation théorique",
    type: "bourdieu",
    titre:
      "Sujet 1 : Le pouvoir des mots — Pragmatique linguistique (Austin) vs Sociologie de la domination symbolique (Bourdieu)",
    contexteCitation:
      "« Chercher le pouvoir des mots dans les mots eux-mêmes, c'est tomber dans l'illusion internaliste. L'efficacité symbolique des paroles ne dépend pas de la langue, mais de l'institution qui délègue l'autorité au locuteur : Status est magistratus. » (Pierre Bourdieu, Ce que parler veut dire, 1982).",
    questions: [
      "Dans quelle mesure l'efficacité d'un acte de langage au travail dérive-t-elle de ses propriétés pragmatiques intrinsèques ou de l'autorité institutionnelle de celui qui l'énonce ?",
      "Confrontez la théorie des actes de langage de John Austin et la critique sociologique du marché linguistique développée par Pierre Bourdieu. Quelles en sont les conséquences pour l'analyse des relations hiérarchiques en organisation ?",
    ],
    criteres: [
      "Définir avec rigueur les concepts d'Austin : énoncé performatif vs constatif, actes locutoire, illocutoire et perlocutoire, conditions conventionnelles de félicité.",
      "Développer la critique bourdieusienne de l'illusion internaliste : le marché linguistique, le capital linguistique, l'habitus linguistique et la formule « Status est magistratus ».",
      "Mobiliser le rituel du « lit de justice » (Sarah Hanley) comme mise en scène du pouvoir royal et de l'acte d'institution.",
      "Illustrer par les travaux d'Éric Lucy (2021) sur l'efficacité performative et la violence symbolique.",
      "Conclure sur la posture du psychologue du travail : refuser les illusions des « ateliers de communication magique » et analyser le mandat institutionnel.",
    ],
    planConseille: [
      {
        partie:
          "I. La pragmatique d'Austin : le langage comme acte et la force illocutoire",
        sousParties: [
          "A. La rupture avec l'illusion descriptive : énoncés constatifs (vrai/faux) vs énoncés performatifs (« dire, c'est faire »).",
          "B. La décomposition tripartite de l'énonciation : acte locutoire, force illocutoire (valeur d'action) et effets perlocutoires.",
        ],
      },
      {
        partie:
          "II. La critique sociologique de Bourdieu : « Status est magistratus » et le marché linguistique",
        sousParties: [
          "A. L'illusion internaliste : le pouvoir n'est pas dans la syntaxe mais dans la délégation institutionnelle et le porte-parole autorisé.",
          "B. Le marché linguistique et les rituels d'autorité : du « lit de justice » (Sarah Hanley) à la violence symbolique du management contemporain.",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Introduction</h5>
<p>Dans <i>Quand dire, c'est faire</i> (1962), John Langshaw Austin réalisait une révolution copernicienne dans les sciences du langage en détrônant l'illusion descriptive traditionnelle : parler ne consiste pas seulement à représenter ou décrire le monde, mais à accomplir un acte qui modifie l'état de la réalité. Vingt ans plus tard, dans <i>Ce que parler veut dire</i> (1982), Pierre Bourdieu portait une estocade vigoureuse à cette approche en dénonçant l'« illusion internaliste » des linguistes qui croient que le pouvoir réside dans les propriétés structurales des mots. Dès lors, le pouvoir des mots dérive-t-il de leur dynamique pragmatique intrinsèque ou de l'armature institutionnelle qui mandate le locuteur ? Nous examinerons d'abord la découverte des actes de langage par Austin, avant de déployer la critique sociologique de Bourdieu articulée à la formule <i>Status est magistratus</i> et à l'actualité des rapports de domination en milieu professionnel.</p>

<h5>I. La pragmatique d'Austin : le langage comme acte et la force illocutoire</h5>
<p>Austin commence par congédier le « préjugé descriptif » qui réduisait la langue à des propositions vraies ou fausses. Il isole les <b>énoncés performatifs</b> (« je déclare la séance ouverte », « je vous baptise », « je promets ») qui ne constatent rien mais exécutent l'action même qu'ils énoncent. Pour affiner son modèle, il décompose tout acte de parole en trois strates simultanées :</p>
<ul>
  <li><b>L'acte locutoire</b> : la production matérielle de sons articulés et dotés d'un sens lexical précis (la phonétique et la sémantique) ;</li>
  <li><b>L'acte illocutoire</b> : l'acte accompli <i>en disant</i> (ordonner, promettre, légiférer, interdire). C'est la force illocutoire qui oriente la direction d'ajustement entre les mots et le monde (John Searle) ;</li>
  <li><b>L'acte perlocutoire</b> : l'effet psychologique ou comportemental produit <i>par le dire</i> sur le destinataire (effrayer, convaincre, tromper, humilier).</li>
</ul>
<p>Pour Austin, la réussite du performatif exige des « conditions de félicité » conventionnelles (un cadre reconnu, des personnes appropriées). Cependant, dans la tradition d'Oxford, la force opératoire demeure comprise comme une propriété immanente au dispositif énonciatif lui-même.</p>

<h5>II. La critique sociologique de Bourdieu : « Status est magistratus » et la violence symbolique</h5>
<p>Bourdieu refuse cette autonomisation de la linguistique. Pour le sociologue de la théorie des champs, le pouvoir n'est jamais dans les mots : <b>« le pouvoir des mots n'est que le pouvoir délégué du porte-parole »</b>. Le langage est un <i>marché linguistique</i> régi par des rapports de force où s'affrontent des capitaux linguistiques inégaux. L'efficacité performative obéit à la maxime juridique <i>Status est magistratus</i> : c'est le statut institutionnel de celui qui parle qui confère à sa parole son autorité performative.</p>
<p>Bourdieu illustre ce mécanisme par l'analyse historique du <b>« lit de justice »</b> développée par Sarah Hanley : lorsque le roi de France se présente en personne devant le Parlement réuni en lit de justice, la délibération des magistrats s'éteint instantanément ; la seule présence physique du monarque réactive l'institution absolue et promulgue la loi sans discussion. Transposé dans les organisations contemporaines, le discours managérial agit selon la même logique : le chef ne convainc pas par la pure rationalité de ses arguments, mais par le capital symbolique que l'organisation lui délègue. Comme l'a montré Éric Lucy (2021), l'efficacité performative — y compris dans le cas extrême de l'insulte — s'enracine dans des stigmates et des classements sociaux déjà constitués dans le champ social.</p>

<h5>Conclusion</h5>
<p>La confrontation entre Austin et Bourdieu montre que si la pragmatique linguistique fournit les outils descriptifs de la force illocutoire, la sociologie critique en révèle les conditions institutionnelles de possibilité. Pour le psychologue du travail, cette clarification est fondamentale : elle permet de dépasser l'illusion naïve des formations managériales à la « communication bienveillante », qui prétendent résoudre les souffrances par de simples artifices verbaux sans jamais toucher aux rapports de domination, aux statuts et à la justice de l'organisation réelle du travail.</p>
`,
    piegesAEviter: [
      "Réduire Austin à une opposition binaire performatif/constatif sans mentionner la triade locutoire/illocutoire/perlocutoire.",
      "Présenter Bourdieu comme un anti-linguiste : il ne nie pas la pragmatique, il refuse l'illusion internaliste d'un pouvoir autonome de la langue hors du champ social.",
      "Oublier de citer la formule « Status est magistratus » et le rituel du « lit de justice » de Sarah Hanley.",
    ],
    conceptsCles: [
      "Performatif vs Constatif (Austin)",
      "Force illocutoire & Acte perlocutoire",
      "Illusion internaliste (Bourdieu)",
      "Status est magistratus",
      "Marché linguistique & Capital linguistique",
      "Lit de justice (Sarah Hanley)",
      "Violence symbolique",
    ],
  },
  {
    id: "pst108-annale-02",
    session: "Option A — Dissertation théorique",
    type: "habermas",
    titre:
      "Sujet 2 : Jürgen Habermas — Agir communicationnel, prétentions à la validité et démocratie au travail",
    contexteCitation:
      "« Ce n'est pas la contrainte physique ou hiérarchique qui coordonne rationnellement l'action sociale, mais l'entente intersubjective obtenue dans une discussion exempte de distorsions, où ne prévaut que la force sans violence du meilleur argument. » (Jürgen Habermas, Théorie de l'agir communicationnel, 1981).",
    questions: [
      "L'éthique de la discussion et les quatre prétentions universelles à la validité peuvent-elles refonder les pratiques de management et surmonter le silence organisationnel ?",
      "Analysez la tension fondamentale entre rationalité stratégique (orientée vers le succès) et rationalité communicationnelle (orientée vers l'entente). En quoi la compétence délibérative constitue-t-elle un levier de santé mentale et d'efficacité au travail ?",
    ],
    criteres: [
      "Distinguer clairement agir stratégique (succès, instrumentalité, manipulation) et agir communicationnel (entente mutuelle / Verständigung).",
      "Exposer de mémoire les 4 prétentions universelles à la validité : intelligibilité, vérité propositionnelle, justesse normative, sincérité subjective.",
      "Définir l'éthique de la discussion (Diskursethik), le Principe D, le Principe U et la situation idéale de parole (ideale Sprechsituation).",
      "Mobiliser les travaux sur la compétence délibérative en entreprise (Duchamp & Koëhl, Roland Calori).",
      "Articuler avec la critique du silence organisationnel et du cynisme néolibéral.",
    ],
    planConseille: [
      {
        partie:
          "I. La grammaire universelle de l'entente : agir stratégique vs agir communicationnel",
        sousParties: [
          "A. La dualité des rationalités : l'agir instrumental/stratégique (orienté vers le succès) face à l'agir communicationnel (orienté vers l'entente libre).",
          "B. Les 4 prétentions à la validité (Geltungsansprüche) comme socle de toute interaction rationnelle non biaisée.",
        ],
      },
      {
        partie:
          "II. L'éthique de la discussion en organisation : la compétence délibérative face au cynisme",
        sousParties: [
          "A. La situation idéale de parole et le principe de délibération démocratique (Principe D).",
          "B. Applications managériales et cliniques : la compétence délibérative (Duchamp & Koëhl) contre le silence pathogène.",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Introduction</h5>
<p>Dans un paysage managérial saturé d'injonctions contradictoires et de reporting comptable unilatéral, les salariés expriment un désenchantement croissant caractérisé par le « silence organisationnel » et le cynisme défensif. Héritier de l'École de Francfort, Jürgen Habermas propose dans sa monumentale <i>Théorie de l'agir communicationnel</i> (1981) un paradigme alternatif fondé sur la rationalité communicationnelle et l'éthique de la discussion. L'agir communicationnel peut-il réellement transformer le travail, ou n'est-il qu'un idéal régulateur impuissant face aux contraintes du marché ? Nous examinerons d'abord les fondements conceptuels de l'entente intersubjective, avant d'analyser l'application de la compétence délibérative dans les dynamiques organisationnelles contemporaines.</p>

<h5>I. La grammaire de l'entente : rationalité stratégique vs rationalité communicationnelle</h5>
<p>Habermas opère une distinction majeure entre deux modes de coordination de l'agir social :</p>
<ul>
  <li><b>L'agir stratégique (ou instrumental)</b> : orienté vers le <i>succès</i> (<i>Erfolg</i>). Le sujet y calcule les moyens d'atteindre ses fins personnelles ou économiques en traitant autrui comme un instrument, un levier d'action ou un obstacle à contourner. Dans le management par objectifs chiffrés, l'injonction descendante relève typiquement de cette rationalité instrumentale ;</li>
  <li><b>L'agir communicationnel</b> : orienté vers <b>l'entente et l'intercompréhension</b> (<i>Verständigung</i>). Les acteurs coordonnent leurs projets d'action par un accord rationnellement motivé, en cherchant à s'entendre sur la validité de leurs propos.</li>
</ul>
<p>Pour qu'un échange soit orienté vers l'entente, Habermas démontre que tout locuteur engage simultanément <b>quatre prétentions universelles à la validité</b> (<i>Geltungsansprüche</i>) :</p>
<ol>
  <li><b>L'intelligibilité</b> : l'énoncé est conforme aux règles de la langue et compréhensible ;</li>
  <li><b>La vérité propositionnelle</b> : ce qui est affirmé correspond aux faits du monde objectif ;</li>
  <li><b>La justesse normative</b> : l'acte s'inscrit légitimement dans le système de normes du monde social partagé ;</li>
  <li><b>La sincérité (ou véracité)</b> : le locuteur exprime authentiquement son vécu intérieur sans duplicité stratégique.</li>
</ol>
<p>Dès lors qu'une de ces prétentions est contestée (« Est-ce vrai ? », « Est-ce légitime ? », « Es-tu sincère ? »), l'interaction bascule dans la <b>discussion argumentative</b> (<i>Diskurs</i>) pour rétablir l'entente brisée.</p>

<h5>II. L'éthique de la discussion en entreprise : la compétence délibérative</h5>
<p>Dans son <i>Éthique de la discussion</i> (1983), Habermas pose le <b>Principe D</b> : seules sont valides les normes morales ou organisationnelles qui peuvent recueillir l'assentiment de tous les participants concernés, au terme d'une discussion rationnelle. Cela suppose l'horizon d'une <b>situation idéale de parole</b> (<i>ideale Sprechsituation</i>), où toute contrainte extérieure, hiérarchique ou économique est mise entre parenthèses pour ne laisser agir que la « force sans violence du meilleur argument ».</p>
<p>Loin d'être une pure utopie intellectuelle, cette approche a été féconde pour penser la gestion contemporaine. Comme le montrent Duchamp & Koëhl (2008) et Roland Calori, l'intégration de la <b>compétence délibérative</b> au sein des comités de direction et des équipes de travail transforme radicalement le management. Lorsque les cadres cessent de manier la parole comme un outil de manipulation stratégique pour ouvrir de véritables espaces délibératifs, ils réhabilitent le sens du travail, restaurent la santé mentale et désamorcent le cynisme. Les décisions concertées bénéficient d'une légitimité inébranlable parce qu'elles ont été éprouvées par la controverse démocratique.</p>

<h5>Conclusion</h5>
<p>L'agir communicationnel d'Habermas fournit au psychologue du travail une boussole éthique irremplaçable. Sans nier la réalité des contraintes économiques systémiques, il démontre que l'efficacité durable d'une collectivité humaine repose sur la qualité démocratique de ses espaces de parole. La souffrance au travail naît souvent du mépris des prétentions à la validité des salariés ; sa résorption passe par la réinstitution de la délibération collective sur le travail réel.</p>
`,
    piegesAEviter: [
      "Confondre l'agir stratégique avec l'agir communicationnel (l'agir stratégique peut utiliser la parole, mais de façon manipulatoire pour atteindre un succès unilatéral).",
      "Oublier une des 4 prétentions à la validité (intelligibilité, vérité, justesse, sincérité).",
      "Présenter la situation idéale de parole comme un fait empirique existant au lieu d'un « idéal régulateur » nécessaire pour évaluer les biais réels.",
    ],
    conceptsCles: [
      "Agir stratégique vs Agir communicationnel",
      "Entente (Verständigung)",
      "4 Prétentions universelles à la validité",
      "Éthique de la discussion (Diskursethik & Principe D)",
      "Situation idéale de parole",
      "Compétence délibérative (Duchamp & Koëhl)",
      "Monde vécu vs Système",
    ],
  },
  {
    id: "pst108-annale-03",
    session: "Option A — Dissertation théorique",
    type: "honneth",
    titre:
      "Sujet 3 : Axel Honneth — Les trois sphères de la reconnaissance morale et la souffrance éthique au travail",
    contexteCitation:
      "« Les expériences de mépris social ne sont pas des blessures secondaires : le déni de reconnaissance détruit le rapport positif à soi que le sujet ne peut conquérir que par l'intersubjectivité dans l'amour, le droit et la solidarité sociale. » (Axel Honneth, La lutte pour la reconnaissance, 1992).",
    questions: [
      "En quoi la théorie de la reconnaissance d'Axel Honneth permet-elle d'analyser les souffrances éthiques contemporaines au travail (invisibilité, réification, déqualification) et de penser l'émancipation des salariés ?",
      "Détaillez les trois sphères d'inter-reconnaissance morale et les formes de mépris social associées. Confrontez cette approche phénoménologique aux impératifs d'évaluation gestionnaire en entreprise.",
    ],
    criteres: [
      "Situer Axel Honneth au sein de l'École de Francfort (3e génération, prolongeant et révisant Habermas par un ancrage dans l'intersubjectivité hégélienne).",
      "Exposer précisément les 3 sphères : intime/amour (confiance en soi), juridique/droit (respect de soi), sociale/solidarité/travail (estime de soi).",
      "Détailler les 3 formes de mépris social : atteinte corporelle, déni de droits/discrimination, dévalorisation sociale/invisibilité.",
      "Développer le concept de réification (2007) comme « oubli de la reconnaissance » originaire.",
      "Mobiliser le concept d'invisibilité (2005) et les terrains d'Éric Lucy (SAMU social, 2020).",
    ],
    planConseille: [
      {
        partie:
          "I. L'architecture tripartite de la reconnaissance et les formes du mépris",
        sousParties: [
          "A. L'enracinement intersubjectif de l'identité : amour (confiance), droit (respect) et solidarité (estime de soi).",
          "B. La société du mépris : violences physiques, privations de droits et dévalorisation du travail réel.",
        ],
      },
      {
        partie:
          "II. Réification, invisibilité et clinique contemporaine du travail",
        sousParties: [
          "A. La réification organisationnelle comme « oubli de la reconnaissance » (Honneth, 2007).",
          "B. Sortir de l'invisibilité : la parole partagée en travail social et en milieu soignant comme réinstitution du sujet (Éric Lucy, 2020).",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Introduction</h5>
<p>Alors que la théorie critique traditionnelle et les théories libérales de la justice (comme celle de John Rawls) concentraient l'analyse sur la redistribution matérielle des richesses économiques, Axel Honneth, figure de proue de la troisième génération de l'École de Francfort, opère dans <i>La lutte pour la reconnaissance</i> (1992) un déplacement décisif : le véritable moteur des conflits sociaux et de la souffrance psychique est d'ordre moral et intersubjectif. L'être humain ne peut accéder à une identité stable et épanouie que s'il est reconnu par autrui. Dès lors, comment la grille des trois sphères de la reconnaissance permet-elle d'éclairer la souffrance au travail et d'ouvrir des voies d'émancipation ?</p>

<h5>I. L'architecture des trois sphères morales et les blessures du mépris</h5>
<p>S'inspirant des écrits de jeunesse de Hegel et de la psychologie sociale de George Herbert Mead, Honneth montre que le rapport positif à soi ne résulte pas d'une introspection solitaire, mais d'une inter-reconnaissance structurée en trois sphères d'intégration :</p>
<ul>
  <li><b>1. La sphère intime (Amour et amitié)</b> : bâtie dans les liens affectifs primaires et la sollicitude mutuelle. Elle confère au sujet la <b>confiance en soi</b> (<i>Selbstvertrauen</i>), c'est-à-dire l'assurance intime de ses besoins physiques et affectifs. La forme de mépris correspondante est l'atteinte à l'intégrité corporelle (violence, maltraitance, viol) ;</li>
  <li><b>2. La sphère juridique (Le Droit)</b> : instituée par l'égalité citoyenne et le statut de sujet de droit universel. Elle permet d'acquérir le <b>respect de soi</b> (<i>Selbstachtung</i>), la certitude d'avoir les mêmes prérogatives et la même dignité morale que tout autre citoyen. Le mépris associé est le <i>déni de droits</i>, l'exclusion statutaire, la précarité discriminatoire ou la privation de citoyenneté ;</li>
  <li><b>3. La sphère sociale (La Solidarité et le Travail)</b> : fondée sur la valorisation communautaire des capacités et des réalisations singulières du sujet au service de la société. Elle est le creuset de l'<b>estime de soi</b> (<i>Selbstschätzung</i>). Le mépris qui la menace est la dévalorisation culturelle, la disqualification du métier, l'humiliation et l'invisibilisation sociale.</li>
</ul>

<h5>II. Réification et invisibilité : de la pathologie managériale à la réinstitution clinique</h5>
<p>Dans <i>La Réification</i> (2007), Honneth reformule le concept classique de Georg Lukács : la réification n'est pas un simple phénomène économique marchand, elle est un <b>« oubli de la reconnaissance »</b>. Avant même de connaître, d'évaluer ou d'utiliser autrui pour une fin productive (attitude cognitive), nous devons l'avoir préalablement reconnu comme un alter ego doué de sensibilité et de valeur (attitude existentielle d'engagement). Lorsque le management moderne traite les soignants, les ouvriers ou les techniciens comme de purs flux financiers ou des « équivalents temps plein » interchangeables, il se rend coupable d'une amnésie morale dévastatrice.</p>
<p>Cette cécité morale culmine dans l'<b>invisibilité sociale</b> (Honneth, 2005) : le travailleur n'est pas simplement sous-payé, il est « regardé au travers », rendu transparent comme le valet devant son maître. C'est précisément ce piège que documente Éric Lucy (2020) dans ses recherches sur le SAMU social : auprès des exclus de la rue en rupture totale de liens, la médiation langagière et la parole échangée lors des maraudes n'ont pas pour seule vocation d'administrer une aide matérielle. Elles opèrent comme une véritable <i>réinstitution morale</i> : redonner un prénom, écouter une histoire, c'est restaurer le sujet dans la sphère du respect et de l'estime de soi.</p>

<h5>Conclusion</h5>
<p>La théorie d'Axel Honneth rappelle au psychologue du travail que la reconnaissance professionnelle ne saurait être confisquée par les gadgets managériaux (primes au mérite, félicitations formelles). La santé psychique des travailleurs exige une reconnaissance authentique articulant les droits statutaires (sphère juridique) et la valorisation réelle de l'utilité sociale du travail accompli (sphère de solidarité). Lutter contre le mépris social est la condition première d'un travail vivable et émancipateur.</p>
`,
    piegesAEviter: [
      "Confondre les trois sphères et les formes de rapport à soi correspondantes : confiance (amour), respect (droit), estime (solidarité/travail).",
      "Réduire la reconnaissance honnethienne à de simples 'compliments' ou à de la reconnaissance gestionnaire superficielle.",
      "Omettre la contribution majeure de 2007 sur la réification comme « oubli de la reconnaissance ».",
    ],
    conceptsCles: [
      "3 Sphères morales d'inter-reconnaissance (Honneth)",
      "Confiance en soi / Respect de soi / Estime de soi",
      "3 Formes de mépris social (atteinte, déni de droits, dévalorisation)",
      "La Réification comme « oubli de la reconnaissance » (2007)",
      "Invisibilité sociale (2005)",
      "Éric Lucy & SAMU Social (2020)",
    ],
  },
  {
    id: "pst108-annale-04",
    session: "Option A — Dissertation théorique",
    type: "valls",
    titre:
      "Sujet 4 : Francis Valls & Denis Castra — La Méthode IOD : rupture avec l'employabilité et psychosociologie de l'insertion",
    contexteCitation:
      "« La logique de l'employabilité déplace la responsabilité du chômage sur les exclus, sommés de se transformer en continu. À l'inverse, l'Intervention sur les Offres et les Demandes (IOD) refuse le tri préalable et agit directement sur les milieux professionnels pour adapter le travail à la personne. » (Francis Valls & Denis Castra, préface de Robert Castel, L'insertion malgré tout, 2007).",
    questions: [
      "En quoi la Méthode IOD constitue-t-elle une rupture épistémologique, méthodologique et déontologique majeure avec les approches traditionnelles de l'insertion par l'employabilité ?",
      "Analysez les 4 règles déontologiques de la méthode IOD (refus du tri, non-sélection, accès direct à l'emploi ordinaire, médiation en entreprise). En quoi cette démarche permet-elle de contrer la désaffiliation (Robert Castel) et la disqualification sociale (Serge Paugam) ?",
    ],
    criteres: [
      "Présenter la méthode IOD créée par Francis Valls et Denis Castra (ACRIP / TRANSFER à Bordeaux, Cnam Nouvelle-Aquitaine).",
      "Déconstruire l'idéologie de l'« employabilité normative » et le piège du « ciblage déficitaire » des exclus.",
      "Exposer le retournement d'intervention : agir sur les offres d'emploi et l'environnement des entreprises plutôt que de sur-préparer sans fin les candidats.",
      "Énoncer rigoureusement les 4 règles déontologiques d'IOD.",
      "Mobiliser la préface de Robert Castel (2007) et les concepts de désaffiliation et de droit commun salarial.",
    ],
    planConseille: [
      {
        partie:
          "I. La déconstruction du modèle dominant : critique du ciblage déficitaire et de l'employabilité",
        sousParties: [
          "A. L'impasse des dispositifs traditionnels : stages infinis, infantilisation et fabrication de la disqualification sociale (Serge Paugam).",
          "B. Le postulat IOD émancipateur : toute personne est immédiatement employable sans remise à niveau psychologisante préalable.",
        ],
      },
      {
        partie:
          "II. L'intervention sur l'offre d'emploi et la déontologie du non-tri",
        sousParties: [
          "A. Le retournement méthodologique : prospecter les entreprises, adapter le poste de travail et lever les filtres discriminants.",
          "B. Les 4 piliers déontologiques et la réaffiliation par le droit commun (Robert Castel).",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Introduction</h5>
<p>Depuis les années 1980, les politiques de l'emploi en Europe ont été colonisées par le paradigme de l'<b>« employabilité »</b> : confronté au chômage de masse, le système institutionnel somme les demandeurs d'emploi d'améliorer continuellement leurs « compétences », leur « savoir-être » et leur motivation. C'est contre cette dérive psychologisante et culpabilisante que les psychosociologues bordelais Francis Valls et Denis Castra (associations ACRIP et TRANSFER) ont forgé la méthode <b>IOD (*Intervention sur les Offres et les Demandes*)</b>, magistralement préfacée par Robert Castel dans <i>L'insertion malgré tout</i> (2007). En quoi l'approche IOD bouleverse-t-elle les fondements de la psychosociologie du travail et de l'insertion ?</p>

<h5>I. La rupture avec le ciblage déficitaire et l'idéologie de l'employabilité</h5>
<p>L'insertion classique repose sur un postulat disqualifiant : si une personne est au chômage de longue durée, c'est qu'elle souffre d'un <i>déficit</i> (manque de qualification, carence relationnelle, faible adaptabilité). Les dispositifs traditionnels soumettent alors l'usager à des batteries d'évaluations, des ateliers CV à répétition et des stages préparatoires non rémunérés. Castra et Valls démontrent que cette <b>sur-préparation infantilisante</b> produit un effet pervers redoutable : elle stigmatise les publics précaires, détruit leur estime de soi et alerte négativement les employeurs qui associent le passage prolongé par ces sas à un signe d'incompétence.</p>
<p>À rebours de cette logique, la méthode IOD pose un principe anthropologique et politique fort : <b>tout être humain est immédiatement prêt à l'emploi ordinaire</b>. L'exclusion n'est pas une tare psychologique individuelle, mais le résultat d'un marché du travail saturé de filtres de sélection formels, abstraits et discriminants (exigences disproportionnées de diplômes ou d'expérience pour des tâches élémentaires).</p>

<h5>II. Le retournement méthodologique et les quatre règles déontologiques IOD</h5>
<p>La rupture méthodologique IOD consiste à <b>déplacer l'action vers les entreprises et les offres d'emploi</b>. Au lieu d'attendre passivement les annonces des employeurs, les conseillers IOD démarchent directement les dirigeants de TPE et PME locales. Ils pénètrent dans les ateliers, observent le travail réel et négocient les conditions d'accueil (aménagement d'horaires, tutorat de proximité, tolérance aux maladresses des premières semaines).</p>
<p>Cette pratique repose sur <b>quatre règles déontologiques impératives</b> :</p>
<ol>
  <li><b>Le refus absolu du tri préalable</b> : le conseiller refuse de classer les usagers ou d'établir des listes d'aptitude méritocratiques ;</li>
  <li><b>L'absence de mise en concurrence</b> : on ne présente pas trois candidats à un employeur pour qu'il « choisisse le meilleur » ; un seul candidat est présenté pour un poste négocié ;</li>
  <li><b>L'accès direct à l'emploi de droit commun</b> : priorité absolue au contrat de travail ordinaire (CDD ou CDI) en entreprise standard, en évitant les contrats aidés précaires ;</li>
  <li><b>La médiation bilatérale continue</b> : le conseiller intervient pendant l'intégration pour désamorcer les malentendus d'habitus entre l'ouvrier et la hiérarchie.</li>
</ol>
<p>Comme le souligne Robert Castel dans sa préface, la méthode IOD court-circuite la dynamique de <b>désaffiliation</b> en ancrant d'emblée l'individu dans le statut protecteur de travailleur de droit commun. Elle restaure la troisième sphère de Honneth (l'estime de soi) non par des discours de coaching, mais par l'épreuve valorisante du salaire et de l'utilité sociale réelle.</p>

<h5>Conclusion</h5>
<p>La démarche IOD de Francis Valls constitue une contribution théorique et pratique de premier ordre à la psychologie sociale du travail. Elle enseigne que l'insertion professionnelle ne relève pas de la rééducation comportementale des personnes exclues, mais d'une transformation courageuse des pratiques d'embauche et de la négociation des conditions réelles de l'activité en entreprise.</p>
`,
    piegesAEviter: [
      "Croire que la méthode IOD consiste à 'mieux préparer' le candidat à passer un entretien : IOD refuse la préparation intensive et intervient sur l'entreprise !",
      "Oublier de citer Denis Castra et la préface fondamentale de Robert Castel (*L'insertion malgré tout*, 2007).",
      "Négliger le rôle de la médiation pendant l'intégration en poste.",
    ],
    conceptsCles: [
      "Méthode IOD (Francis Valls & Denis Castra)",
      "Critique de l'employabilité normative",
      "Refus du ciblage déficitaire",
      "Refus du tri préalable et de la mise en concurrence",
      "Intervention sur l'offre d'emploi et le travail réel",
      "Désaffiliation (Robert Castel)",
      "Accès direct au droit commun salarial",
    ],
  },
  {
    id: "pst108-annale-05",
    session: "Option A / Option B — Analyse théorique & Pragmatique",
    type: "lucy",
    titre:
      "Sujet 5 : Éric Lucy — Les conditions sociales de l'efficacité performative de l'insulte au travail",
    contexteCitation:
      "« L'insulte ne tire pas son pouvoir blessant de sa seule intensité phonologique, mais de sa capacité à réactiver des rapports de domination et des stigmates déjà institués dans le champ social. Elle est un acte d'institution et de destitution qui met en jeu l'hexis corporelle et la prétention à la reconnaissance. » (Éric Lucy, Empan, n°124, 2021).",
    questions: [
      "En mobilisant les travaux d'Éric Lucy (2021) et de Pierre Bourdieu (1982), analysez pourquoi l'insulte en milieu professionnel ne saurait être réduite à un simple dérapage émotionnel ou psychologique individuel.",
      "Quels sont les ressorts pragmatiques (actes de langage), corporels (hexis) et institutionnels de l'insulte ? Comment l'invective peut-elle fonctionner à la fois comme violence symbolique et comme acte de résistance ou de quête de reconnaissance ?",
    ],
    criteres: [
      "Définir l'insulte comme acte de langage performatif et acte d'institution/destitution.",
      "Mobiliser la sociologie de Bourdieu : le monopole d'État de la violence symbolique, le mandat institutionnel et la délégation (Status est magistratus).",
      "Développer l'analyse de l'hexis corporelle selon Éric Lucy : l'opposition entre la « fine bouche » bourgeoise/éducative et la « grande gueule » populaire.",
      "Expliquer le fonctionnement de l'insulte prophétique et déclarative : ajustement du monde aux mots, nomination du trivial et parodie de l'égalité.",
      "Relier à la théorie de la reconnaissance d'Axel Honneth : l'insulte comme cri contre le mépris social.",
    ],
    planConseille: [
      {
        partie:
          "I. L'insulte comme acte d'institution et réactualisation des dominations",
        sousParties: [
          "A. Dépasser la psychologisation : l'insulte tire sa force performative des stigmates et classements préexistants dans le champ social.",
          "B. Le travailleur social et l'autorité déléguée : quand la parole instituée produit de la violence symbolique.",
        ],
      },
      {
        partie:
          "II. Hexis corporelle, trivialité parodique et quête véhémente de reconnaissance",
        sousParties: [
          "A. La théâtralité corporelle : la confrontation entre la « grande gueule » populaire et la « fine bouche » de l'institution.",
          "B. L'insulte prophétique comme acte de résistance : le sceptre homérique et le refus du mépris social (Honneth).",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Introduction</h5>
<p>Face à une agression verbale dans un service ou une équipe, le réflexe immédiat des directions consiste souvent à psychologiser l'événement : l'insulte est classée comme un « manque de maîtrise de soi », un « trouble du comportement » ou un dérapage émotionnel individuel. Dans son article de recherche pionnier <i>« Les conditions sociales de l'efficacité performative de l'insulte »</i> (revue <i>Empan</i>, 2021), Éric Lucy rompt avec ce réductionnisme naïf. S'appuyant sur la sociolinguistique critique de Pierre Bourdieu et la théorie des actes de langage d'Austin et Searle, il démontre que l'insulte est un acte social complexe d'institution et de destitution. Pourquoi l'insulte ne tire-t-elle pas sa violence de ses seuls décibels, et comment s'articule-t-elle entre domination et résistance ?</p>

<h5>I. L'insulte comme violence symbolique et actualisation des rapports de force</h5>
<p>Pour comprendre l'impact d'une insulte, il faut d'abord reconnaître que l'efficacité du discours réside dans ses conditions sociales d'énonciation. Traiter un collègue d'« incapable » ou un usager d'« assisté » n'a d'effet blessant que parce que ces termes convoquent des <b>catégorisations sociales dévalorisantes et des stigmates déjà historiquement constitués</b> dans la société. L'insulte est un <i>acte d'institution inversé</i> : elle vise à destituer l'autre de son statut de partenaire légitime de parole pour l'assigner à une place subordonnée.</p>
<p>Éric Lucy met en garde contre l'aveuglement institutionnel : pour le travailleur social ou le cadre, <i>Status est magistratus</i>. Parler au nom de l'État ou de la direction, c'est exercer une violence symbolique feutrée garantie par le monopole institutionnel. Lorsque les représentants de l'institution imposent des décisions unilatérales sous couvert de neutralité technique, ils doivent comprendre que l'irruption de l'insulte en retour vient briser l'illusion (<i>l'illusio</i>) et l'obéissance rituelle (<i>l'obséquium</i>).</p>

<h5>II. Hexis corporelle, fonction du trivial et quête de reconnaissance</h5>
<p>L'analyse d'Éric Lucy pénètre au cœur de la matérialité corporelle de l'énonciation. L'insulte engage l'<b>hexis corporelle</b> du locuteur. Il oppose la « fine bouche » de l'éducation bourgeoise — marquée par la retenue, l'euphémisme policé et la condescendance symbolique — à la « grande gueule » du milieu populaire, qui privilégie la bouche grande ouverte, le rythme scandé et le refus des censures duplicites. L'injure use délibérément du trivial et de l'organique pour ramener brutalement le dominant aux contingences matérielles de son corps : « Quelle que soit ta prétention statutaire, tu es comme nous dans le trivial ».</p>
<p>Dès lors, l'insulte peut revêtir la force d'un <b>acte déclaratif ou prophétique</b> (Searle, 1969) visant à renverser l'ordre du monde. Comme le bâton de parole (le <i>skeptron</i> homérique), l'invective permet au dominé de parler « au nom de tous ses pairs » et d'arracher violemment un espace d'existence. Loin d'être une pure pulsion destructrice, l'insulte est souvent le dernier cri d'un sujet qui subit un mépris social insupportable (Axel Honneth) et qui utilise la transgression langagière pour contraindre l'institution à le regarder en face.</p>

<h5>Conclusion</h5>
<p>Pour le psychologue du travail et l'intervenant en organisation, les travaux d'Éric Lucy imposent une éthique de la lucidité : sanctionner l'insulte sur le plan disciplinaire sans analyser les rapports de pouvoir qui l'ont rendue performative ne fait qu'alimenter le cycle de la violence symbolique. Désamorcer la violence verbale exige d'ouvrir des espaces où la parole critique des salariés peut s'exprimer légitimement sans avoir à recourir à l'invective pour être entendue.</p>
`,
    piegesAEviter: [
      "Psychologiser l'insulte comme une simple perte de sang-froid.",
      "Ignorer l'opposition majeure théorisée par Lucy entre la « fine bouche » et la « grande gueule ».",
      "Ne pas voir la double facette de l'insulte : instrument de domination d'un côté, acte désespéré de résistance et quête de reconnaissance de l'autre.",
    ],
    conceptsCles: [
      "Efficacité performative de l'insulte (Éric Lucy, 2021)",
      "Acte d'institution et de destitution",
      "Hexis corporelle (« fine bouche » vs « grande gueule »)",
      "Status est magistratus & délégation institutionnelle",
      "Le skeptron homérique et la parole collective",
      "Fonction du trivial et parodie de l'égalité",
      "Mépris social et quête de reconnaissance (Honneth)",
    ],
  },
  {
    id: "pst108-annale-06",
    session: "Option B — Étude de situation de travail / Cas clinique",
    type: "cas",
    titre:
      "Sujet 6 : Cas clinique — Maraude & SAMU Social : Négociation du contrat et réinstitution du sujet désaffilié (Éric Lucy, 2020)",
    contexteCitation:
      "« Gérard, connu du SAMU social depuis 5 ans, cumule 245 transmissions pour alcoolisation et refus de soins. L'éducatrice fait face à ses comportements agressifs et ses crises d'angoisse en proposant une négociation contractuelle au seuil du local d'accueil. » (Éric Lucy, Le sociographe, 2020).",
    questions: [
      "1. En mobilisant la Théorie de l'agir communicationnel d'Habermas (1981), identifiez les 4 types d'actions (téléologique, stratégique, normative, dramatique) à l'œuvre dans la séquence de l'accueil de Gérard au SAMU social.",
      "2. Analysez comment la médiation langagière permet de dépasser l'invisibilité figurative et effective (Axel Honneth) pour réinstituer Gérard dans l'estime de soi.",
      "3. Discutez les dilemmes éthiques et déontologiques soulevés par la contractualisation avec un public très vulnérable : pourquoi Robert Castel met-il en garde contre le risque d'un « contrat léonin » et d'une « charité musclée » ?",
    ],
    criteres: [
      "Identifier avec précision les 4 types d'actions d'Habermas : téléologique (ne plus avoir froid), stratégique (attentes de la situation), normative (respect des règles de vie) et dramatique (théâtralisation de la détresse et blessures).",
      "Mobiliser Honneth (1992, 2005) : l'invisibilité (« le noble nu devant ses domestiques ») et la parole comme méta-action éthique.",
      "Développer l'analyse critique de Robert Castel sur l'injonction au contrat et le déséquilibre de pouvoir (contrat léonin).",
      "Mettre en évidence la posture clinique de l'éducatrice : tenir le cadre sans rompre le lien de reconnaissance.",
    ],
    planConseille: [
      {
        partie:
          "I. Analyse habermassienne de la scène d'accueil : les 4 dimensions de l'action",
        sousParties: [
          "A. L'action téléologique (le besoin vital de mise à l'abri) et stratégique (la négociation des contraintes immédiates).",
          "B. L'action normative (les règles de la structure) et l'action dramatique (la mise en scène de la souffrance psychique).",
        ],
      },
      {
        partie:
          "II. Clinique de la reconnaissance et dialectique du contrat en travail social",
        sousParties: [
          "A. Dépasser l'invisibilité sociale : faire exister le sujet par la médiation langagière quotidienne.",
          "B. Le dilemme déontologique du contrat : entre réhabilitation du pouvoir d'agir et risque de « charité musclée » (Castel).",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Question 1 : Les 4 types d'actions d'Habermas dans la scène d'accueil</h5>
<p>Dans son analyse de la situation clinique de Gérard au SAMU Social, Éric Lucy montre avec brio que l'interaction au seuil de la porte en métal déploie l'ensemble du spectre de l'agir théorisé par Jürgen Habermas (1981) :</p>
<ul>
  <li><b>L'action téléologique</b> : Gérard réalise un but pratique immédiat guidé par le principe de survie : échapper au froid de la rue et obtenir un abri chauffé pour la soirée ;</li>
  <li><b>L'action stratégique</b> : l'éducatrice et l'usager composent avec les attentes et les contraintes objectives de la situation (horaires stricts, cadre de service, attente de l'infirmière, présence des collègues) ;</li>
  <li><b>L'action normative</b> : le franchissement de la porte impose la conformité à des normes partagées (saluer, respecter le personnel, déposer les bouteilles, respecter les lieux) qui conditionnent l'accueil ;</li>
  <li><b>L'action dramatique</b> : Gérard exprime sa subjectivité souffrante à travers une théâtralisation corporelle violente (se cogner la tête contre la vitre, menacer de se jeter sous un bus, démarche tête basse, posture prostrée sur les talons dos au mur). Ce n'est pas un caprice, c'est l'expression agonistique d'une angoisse d'abandon.</li>
</ul>

<h5>Question 2 : Dépassement de l'invisibilité et réinstitution du sujet (Honneth)</h5>
<p>Dans <i>Invisibilité : sur l'épistémologie de la reconnaissance</i> (2005), Axel Honneth forge la métaphore du « noble nu devant ses domestiques » : les serviteurs voient physiquement le maître, mais le maître regarde au travers d'eux, les réduisant à une transparence effective et figurative. Dans la ville contemporaine, le sans-abri subit cette même violence : les passants le contournent sans le regarder.</p>
<p>Dans la pratique rapportée par Éric Lucy, l'éducatrice brise ce déni moral. Ouvrir la porte, l'appeler par son prénom (« Bonjour Gérard »), exiger qu'il réponde au salut et lui réserver sa place au mur, constitue une <b>méta-action expressive</b>. En acceptant de parler avec Gérard, les professionnels le posent statutairement comme un interlocuteur valable. La parole partagée répare la première sphère (la confiance par la sollicitude) et amorce la restauration de la troisième sphère (l'estime de soi) : Gérard en vient à être fier de dire « je n'ai presque rien bu ce soir », validant ainsi sa propre capacité d'engagement.</p>

<h5>Question 3 : Dilemmes déontologiques du contrat et « charité musclée » (Robert Castel)</h5>
<p>L'obligation faite à Gérard de signer un « contrat » d'engagement réciproque (réduire l'alcool pour avoir une place au CAU) soulève une aporie éthique majeure :</p>
<ul>
  <li>D'un côté, le contrat redonne à l'usager un rôle actif : il n'est plus un objet d'assistance passive, mais un contractant doté de volonté ;</li>
  <li>De l'autre côté, comme le dénonce Robert Castel (1978, 2008), contractualiser avec une personne à la rue et en détresse vitale relève du <b>contrat léonin</b> : Gérard n'a pas le choix réel de refuser s'il ne veut pas mourir de froid. Exiger une contrepartie comportementale au droit fondamental à la protection fait courir le risque d'une « charité musclée », où l'aide devient une injonction d'obéissance morale.</li>
</ul>
<p><b>Conclusion :</b> La grandeur clinique de l'équipe du SAMU social réside dans sa lucidité déontologique : le contrat n'est pas utilisé comme un couperet punitif pour exclure Gérard, mais comme un tuteur langagier provisoire pour étayer son discernement et l'orienter vers le soin médical de droit commun.</p>
`,
    piegesAEviter: [
      "Confondre l'action téléologique (but d'un acteur sur le monde objectif) et l'action normative (conformité aux règles sociales).",
      "Oublier la métaphore fondamentale de Honneth sur le « noble nu devant ses domestiques ».",
      "Porter un jugement moral naïf sur la contrainte sans analyser la contradiction du 'contrat léonin' éclairée par Robert Castel.",
    ],
    conceptsCles: [
      "Agir téléologique, stratégique, normatif, dramatique (Habermas)",
      "Invisibilité figurative et effective (Honneth)",
      "Méta-action expressive et réinstitution du sujet",
      "Contrat léonin et « charité musclée » (Robert Castel)",
      "Désaffiliation & vulnérabilité sociale",
      "Éric Lucy & SAMU social (2020)",
    ],
  },
  {
    id: "pst108-annale-07",
    session: "Option B — Étude de situation de travail / Cas clinique",
    type: "cas",
    titre:
      "Sujet 7 : Cas clinique — La novlangue managériale et la condamnation historique de France Télécom (2022)",
    contexteCitation:
      "« Les dirigeants de France Télécom se sont mépris sur ce que changer une organisation veut dire. En confirmant la condamnation pour harcèlement moral institutionnel, la Cour d'appel a consacré la valeur performative des discours managériaux : des mots comme 'faire les départs par la fenêtre ou par la porte' ou 'dégraissage' ne décrivent pas, ils tuent. » (Le Monde, 4 octobre 2022).",
    questions: [
      "1. À la lumière de la théorie d'Austin (1962) et de la critique de Bourdieu (1982), démontrez pourquoi les métaphores employées par les dirigeants de France Télécom (« par la fenêtre ou par la porte ») constituaient de véritables actes performatifs violents et non de simples figures de style.",
      "2. Analysez comment l'usage orwellien d'une « novlangue corporate » (Time to Move, projet personnel accompagné) produit de la violence symbolique et subvertit les quatre prétentions universelles à la validité d'Habermas.",
      "3. En tant que psychologue du travail et intervenant en organisation, quelles préconisations déontologiques et méthodologiques formulez-vous pour contrer le harcèlement moral institutionnel et réhabiliter la vérité du travail réel ?",
    ],
    criteres: [
      "Démontrer la valeur performative des mots managériaux : l'acte illocutoire d'intimidation et les effets perlocutoires dévastateurs (souffrance, suicides).",
      "Mobiliser Bourdieu : l'autorité statutaire du PDG et du comité de direction confère une valeur fiduciaire et exécutoire à la violence verbale.",
      "Déconstruire la novlangue managériale à travers les 4 prétentions d'Habermas (rupture d'intelligibilité, mensonge propositionnel, injustice normative, duplicité subjective).",
      "Proposer une démarche d'intervention clinique : cercles de délibération sur le travail réel, protection des collectifs, indépendance déontologique.",
    ],
    planConseille: [
      {
        partie:
          "I. La force performative du verbe managérial : de la métaphore à l'injonction destructrice",
        sousParties: [
          "A. La violence illocutoire et perlocutoire des mots de commandement (Austin).",
          "B. Le sceau institutionnel de la direction : Status est magistratus et diffusion systémique de la terreur (Bourdieu).",
        ],
      },
      {
        partie:
          "II. Novlangue orwellienne et déconstruction habermassienne : vers une clinique du travail réel",
        sousParties: [
          "A. La perversion de la novlangue (« Time to Move ») : subversion radicale des 4 prétentions à la validité (Habermas).",
          "B. Préconisations déontologiques du psychologue : restaurer la compétence délibérative et l'éthique de la discussion.",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Question 1 : La performativité des discours managériaux (Austin & Bourdieu)</h5>
<p>L'arrêt historique de la Cour d'appel de Paris (septembre 2022) confirmant la culpabilité des ex-dirigeants de France Télécom pour « harcèlement moral institutionnel » s'appuie explicitement sur la linguistique : les mots créent la réalité. L'affirmation du PDG Didier Lombard promettant de réaliser les 22 000 suppressions de postes <i>« par la fenêtre ou par la porte »</i> ne relève pas d'une métaphore anodine :</p>
<ul>
  <li><b>Au sens d'Austin (1962)</b>, c'est un <b>acte illocutoire de commandement et de menace</b>. L'effet perlocutoire sur les salariés et les cadres de proximité a été massif : sidération, anxiété aiguë, détresse existentielle et passage à l'acte suicidaire ;</li>
  <li><b>Au sens de Bourdieu (1982)</b>, ces paroles n'ont eu une telle efficacité que parce que leur auteur incarnait le sommet de l'institution (*Status est magistratus*). Portée par toute la ligne hiérarchique dotée de primes sur objectifs d'éviction, la parole patronale est devenue une <i>injonction performative d'État</i>, mobilisant la violence symbolique pour contraindre les fonctionnaires au départ forcé.</li>
</ul>

<h5>Question 2 : La novlangue managériale face aux prétentions à la validité d'Habermas</h5>
<p>Le procès a dévoilé un second levier insidieux : l'utilisation d'un lexique euphémisé et orwellien. Qualifier une mobilité forcée de <i>« Time to Move »</i> ou un licenciement déguisé de <i>« projet personnel accompagné »</i> constitue une agression symbolique majeure analysable par la grille d'Habermas (1981) :</p>
<ol>
  <li><b>Rupture d'intelligibilité</b> : le jargon anglo-managérial masque le sens commun des mots et déréalise le vécu ;</li>
  <li><b>Violation de la vérité propositionnelle</b> : le discours prétend qu'il s'agit d'un « accompagnement bienveillant », alors que les faits matériels prouvent l'isolement délibéré des agents (mise au placard, bureaux vides) ;</li>
  <li><b>Violation de la justesse normative</b> : cette politique bafoue ouvertement le statut de la fonction publique et le Code du travail régissant la protection de la santé mentale ;</li>
  <li><b>Violation absolue de la sincérité (véracité)</b> : le discours officiel affiche la sollicitude tout en poursuivant cyniquement un objectif caché de réduction d'effectifs sans plan social officiel.</li>
</ol>
<p>Cette distorsion systématique de la communication plonge les salariés dans une <i>double contrainte</i> (Bateson) pathogène, interdisant toute réplique rationnelle.</p>

<h5>Question 3 : Préconisations déontologiques et cliniques du psychologue du travail</h5>
<p>Face à une politique industrielle de harcèlement moral institutionnel, le psychologue du travail doit agir à plusieurs niveaux :</p>
<ul>
  <li><b>1. Refus de la complicité déontologique</b> : opposer l'indépendance de son titre protégé (Loi du 25 juillet 1985) et le Code de déontologie (Art. 2 & 5 : respect de la personne et autonomie de jugement). Refuser de cautionner des dispositifs d'« écoute » qui ne serviraient qu'à individualiser la souffrance sans modifier l'organisation ;</li>
  <li><b>2. Dévoilement des mécanismes de violence symbolique</b> : nommer le travail réel, traduire la novlangue en actes concrets et documenter scientifiquement l'impact pathogène de l'injonction paradoxale auprès du CSE et de la médecine du travail ;</li>
  <li><b>3. Restauration d'espaces de controverse délibérative</b> : mettre en place des cercles de délibération régulés (éthique de la discussion d'Habermas) où les salariés peuvent débattre publiquement de la faisabilité des objectifs et opposer la rationalité du métier aux abstractions de la rentabilité financière.</li>
</ul>
`,
    piegesAEviter: [
      "Traiter le harcèlement moral institutionnel comme une somme de conflits interpersonnels : c'est une stratégie organisée au niveau de la gouvernance !",
      "Oublier de relier la novlangue aux 4 prétentions à la validité d'Habermas.",
      "Omettre les devoirs déontologiques du psychologue du travail face à une organisation toxique.",
    ],
    conceptsCles: [
      "Harcèlement moral institutionnel (Procès France Télécom 2022)",
      "Valeur performative des métaphores managériales (Austin / Bourdieu)",
      "Novlangue corporate & violence symbolique",
      "Subversion des 4 prétentions à la validité (Habermas)",
      "Double contrainte (Bateson)",
      "Déontologie & Indépendance du psychologue",
    ],
  },
  {
    id: "pst108-annale-08",
    session: "Option B — Étude de situation de travail / Cas clinique",
    type: "valls",
    titre:
      "Sujet 8 : Cas clinique — Négocier une offre d'emploi sans tri préalable face à un recruteur exigeant (Méthode IOD)",
    contexteCitation:
      "« Un conseiller en insertion IOD intervient auprès d'une PME de logistique. L'employeur exige un candidat avec Bac+2 et 3 ans d'expérience pour un poste de préparateur de commandes. Le conseiller propose Youssef, 22 ans, non diplômé et sans réseau. Le patron rétorque : 'Je ne suis pas une œuvre de charité. Envoyez-moi 3 CV présélectionnés et je prendrai le meilleur.' »",
    questions: [
      "1. Quels principes déontologiques fondamentaux de la méthode IOD (Francis Valls & Denis Castra) la demande du chef d'entreprise transgresse-t-elle explicitement ?",
      "2. Comment le conseiller doit-il structurer sa négociation pour déplacer l'exigence patronale des diplômes théoriques vers les gestes professionnels réels du poste de travail ?",
      "3. Détaillez le protocole d'accompagnement bilatéral et d'intégration à mettre en place pour sécuriser l'embauche et restaurer l'estime de soi de Youssef sans le stigmatiser.",
    ],
    criteres: [
      "Identifier la double transgression patronale : exigence de tri préalable et mise en concurrence artificielle de candidats.",
      "Expliquer l'analyse du poste de travail réel : observation in situ, identification des compétences d'usage, négociation sur l'offre d'emploi.",
      "Exposer le rôle de la médiation bilatérale continue (sécurisation du patron et du jeune salarié).",
      "Mobiliser la troisième sphère de reconnaissance d'Axel Honneth (l'estime de soi acquise par le statut de droit commun).",
    ],
    planConseille: [
      {
        partie:
          "I. Analyse déontologique de la commande patronale et posture du conseiller IOD",
        sousParties: [
          "A. La déconstruction du réflexe de tri : pourquoi IOD refuse d'être une agence d'intérim ou un service de sélection.",
          "B. Le refus de la concurrence entre précaires : poser le principe éthique de la présentation unique.",
        ],
      },
      {
        partie:
          "II. L'intervention sur le poste réel et le protocole d'intégration bilatérale",
        sousParties: [
          "A. De l'offre formelle au travail réel : visiter le quai de chargement et redéfinir les critères effectifs d'embauche.",
          "B. La médiation bilatérale durable : accompagner le patron et le salarié pour restaurer l'estime de soi dans le droit commun.",
        ],
      },
    ],
    corrigeExcellence: `
<h5>Question 1 : Principes déontologiques IOD transgressés par la demande patronale</h5>
<p>La réaction du chef d'entreprise (« Envoyez-moi 3 CV présélectionnés et je choisirai le meilleur ») heurte de plein fouet les principes fondateurs de l'approche IOD de Francis Valls et Denis Castra :</p>
<ul>
  <li><b>La transgression du refus du tri préalable</b> : l'employeur exige que le conseiller opère un classement méritocratique éliminatoire. Or, pour IOD, le tri préalable est une faute déontologique qui reproduit la logique d'exclusion du marché ;</li>
  <li><b>La transgression de la non-mise en concurrence</b> : IOD proscrit formellement de mettre en compétition plusieurs demandeurs d'emploi pour une même offre. Chaque offre négociée est dédiée à une personne unique ;</li>
  <li><b>Le piège du ciblage déficitaire inversé</b> : en exigeant un Bac+2 pour un poste de préparateur de commandes, l'employeur compense sa propre anxiété par une sur-qualification abstraite qui exclut d'office les personnes non diplômées.</li>
</ul>

<h5>Question 2 : Stratégie de négociation : déplacer le regard vers le travail réel</h5>
<p>Le conseiller IOD ne doit pas entrer dans un bras de fer moralisateur, mais faire valoir une <b>expertise psychosociologique de médiation</b> :</p>
<ol>
  <li><b>Entendre l'anxiété du patron</b> : reconnaître sa peur légitime de désorganiser son atelier ou de perdre du temps en formant une personne instable ;</li>
  <li><b>Proposer une visite de poste in situ</b> : le conseiller demande à se rendre 30 minutes sur le quai de logistique pour observer les gestes professionnels réels, les cadences, les logiciels de flashage et l'ambiance d'équipe. Il démontre que le poste ne requiert aucune compétence mathématique ou théorique de niveau Bac+2, mais de la ponctualité, de la rigueur physique et un repérage spatial élémentaire ;</li>
  <li><b>Négocier l'adaptation de l'offre</b> : convaincre le patron de lever l'exigence de diplôme en échange d'un engagement du service IOD à accompagner l'intégration ;</li>
  <li><b>Proposer la candidature unique de Youssef</b> : présenter Youssef non comme un « cas social à aider », mais comme un jeune candidat fiable dont les qualités correspondent exactement aux contraintes observées sur le quai.</li>
</ol>

<h5>Question 3 : Protocole d'accompagnement bilatéral et restauration de l'estime de soi</h5>
<p>Pour sécuriser cette intégration, le conseiller déploie la méthodologie IOD en 4 étapes clés :</p>
<ul>
  <li><b>1. Préparation de la rencontre (sans infantilisation)</b> : le conseiller présente honnêtement le poste à Youssef. Pas de simulation d'entretien anxiogène : le jeune sait que l'offre lui est réservée et qu'il n'a pas à jouer un rôle factice ;</li>
  <li><b>2. Entretien d'embauche médiatisé</b> : le conseiller est présent lors de l'entretien avec le chef d'entreprise pour faciliter le dialogue et prévenir les heurts d'habitus socioculturels (Bourdieu) ;</li>
  <li><b>3. Accompagnement bilatéral en poste</b> : le conseiller intervient régulièrement auprès du chef d'équipe (tutorat, pédagogie des consignes) et auprès de Youssef (écoute des doutes, gestion des transports) durant les trois premiers mois ;</li>
  <li><b>4. Restauration de l'estime de soi par le droit commun</b> : Youssef signe un contrat de travail ordinaire et touche son premier salaire. Comme le démontre Axel Honneth, l'accès à l'utilité sociale reconnue et au statut juridique de salarié rétablit la dignité humaine bien plus sûrement que n'importe quelle thérapie verbale.</li>
</ul>
`,
    piegesAEviter: [
      "Accepter la demande du patron sous prétexte de 'faire plaisir à l'entreprise' : céder sur le tri détruit l'identité même de la démarche IOD.",
      "Présenter le candidat comme un 'pauvre jeune qui a besoin d'aide' : IOD défend une posture professionnelle de négociation économique et non de bienfaisance compassionnelle.",
      "Oublier que la médiation IOD s'adresse aux DEUX parties : l'employeur ET le salarié.",
    ],
    conceptsCles: [
      "Méthode IOD (Francis Valls & Denis Castra)",
      "Refus absolu du tri et de la mise en concurrence",
      "Visite de poste & analyse du travail réel",
      "Négociation sur l'offre d'emploi",
      "Médiation bilatérale continue",
      "Reconnaissance et estime de soi (Axel Honneth)",
      "Accès direct au salariat de droit commun",
    ],
  },
];

/**
 * Grille d'évaluation officielle CNAM pour l'épreuve PST108
 */
export const CRITERES_EVALUATION_PST108 = [
  {
    id: "crit-1",
    label:
      "Définition rigoureuse et contextualisée des concepts clés (Bourdieu, Habermas, Honneth, Valls)",
    points: "4 pts",
    description:
      "Chaque notion (marché linguistique, Status est magistratus, prétentions à la validité, 3 sphères, refus du tri) est définie avec ses termes techniques précis dès son introduction.",
  },
  {
    id: "crit-2",
    label:
      "Maîtrise de la confrontation d'auteurs et de la dialectique interne",
    points: "4 pts",
    description:
      "La copie ne juxtapose pas les théories : elle les confronte (Austin vs Bourdieu, rationalité instrumentale vs communicationnelle, employabilité vs IOD).",
  },
  {
    id: "crit-3",
    label:
      "Mobilisation des publications d'Éric Lucy et de Francis Valls (Cnam)",
    points: "4 pts",
    description:
      "Intégration précise des apports de recherche : article d'Éric Lucy sur l'insulte (Empan 2021) et le SAMU social (2020), méthode IOD de Francis Valls & Denis Castra.",
  },
  {
    id: "crit-4",
    label:
      "Ancrage dans les situations concrètes du travail réel et des organisations",
    points: "4 pts",
    description:
      "Capacité à illustrer par des cas vécus (management hospitalier, France Télécom, logistique, travail social) en dépassant les généralités abstraites.",
  },
  {
    id: "crit-5",
    label: "Posture professionnelle et déontologique du psychologue du travail",
    points: "4 pts",
    description:
      "Clarté de la conclusion : refus des gadgets managériaux, défense de l'indépendance clinique (Loi 1985) et démocratisation délibérative du travail.",
  },
];

/**
 * Méthode officielle en 4 temps pour réussir l'épreuve PST108
 */
export const METHODE_ANALYSE_PST108 = [
  {
    num: "1",
    titre:
      "Analyser les termes du sujet & délimiter le champ théorique (20 min)",
    desc: "Repérer les oppositions structurantes (mots vs institution, stratégie vs entente, employabilité vs offre). Identifier immédiatement les auteurs de référence et le corpus mobilisable.",
  },
  {
    num: "2",
    titre: "Construire une problématique dialectique solide (25 min)",
    desc: "Formuler la tension centrale sous forme d'une question à double détente : comment concilier les exigences objectives de l'organisation et la subjectivité des acteurs ?",
  },
  {
    num: "3",
    titre: "Bâtir un plan détaillé en 2 parties et 4 sous-parties (25 min)",
    desc: "Équilibrer rigoureusement I.A, I.B, II.A, II.B. Chaque sous-partie doit contenir : un concept clé défini, un argument théorique étayé, et un exemple précis tiré du travail réel.",
  },
  {
    num: "4",
    titre: "Rédiger avec précision académique & posture clinique (50 min)",
    desc: "Soigner l'introduction (accroche, définitions, problématique, annonce de plan) et la conclusion (bilan dialectique, ouverture sur la déontologie du psychologue du travail).",
  },
];

/**
 * Formatage adapté pour les panels d'entraînement existants (SharedExamen & Redac)
 */
export const ANNALES_PST108_REDAC_ITEMS: [string, string[], string][] =
  ANNALES_PST108.map((a) => [
    a.titre,
    [
      ...(a.contexteCitation
        ? [`Citation d'appui : ${a.contexteCitation}`]
        : []),
      ...a.questions,
      "Plan conseillé :",
      ...a.planConseille.map(
        (p) => `${p.partie} : ${p.sousParties.join(" / ")}`,
      ),
      "Critères clés :",
      ...a.criteres,
    ],
    a.corrigeExcellence,
  ]);
