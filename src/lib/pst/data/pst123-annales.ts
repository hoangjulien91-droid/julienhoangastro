/**
 * PST123 - L'Identité sociale et professionnelle & Déontologie
 * Enseignante responsable : Élisabeth LUCY (Cnam)
 * 
 * ANNALES OFFICIELLES & BANQUE DE SUJETS D'EXAMEN
 * Formats : Option A (Dissertation) & Option B (Analyse de situation de travail / Texte en support)
 */

export interface AnnalePst123Item {
  id: string;
  num: number;
  type: "dubar" | "bourdieu" | "sainsaulieu" | "honneth" | "deontologie" | "cas";
  format: "dissertation" | "situation" | "texte";
  titre: string;
  t: string;
  theme: string;
  citation?: {
    texte: string;
    auteur: string;
    source: string;
    annee?: string;
  };
  desc: string;
  questions: string[];
  criteria: string[];
  planConseille: string[];
  corrige: string;
  conceptsCles: string[];
  auteursLies: string[];
}

export const ANNALES_PST123: AnnalePst123Item[] = [
  {
    id: "sujet_1",
    num: 1,
    type: "dubar",
    format: "dissertation",
    titre: "Sujet 1 : La double transaction identitaire chez Claude Dubar",
    t: "Dissertation : « La double transaction identitaire chez Claude Dubar : analyser la construction de l'identité professionnelle entre crise et reconnaissance. »",
    theme: "Processus biographiques vs relationnels, attribution et formes de reconnaissance",
    desc: "Dissertation : « La double transaction identitaire chez Claude Dubar : analyser la construction de l'identité professionnelle entre crise et reconnaissance. »",
    conceptsCles: [
      "Processus biographique (pour soi)",
      "Processus relationnel (pour autrui)",
      "Actes d'attribution vs d'appartenance",
      "Identités virtuelles vs réelles",
      "Transactions objectives & subjectives",
      "4 formes de reconnaissance (promotion, conversion, blocage, exclusion)",
    ],
    auteursLies: ["Claude Dubar", "Erving Goffman", "Renaud Sainsaulieu", "Élisabeth Lucy"],
    questions: [
      "Définissez l'identité professionnelle comme articulation d'un processus biographique et d'un processus relationnel.",
      "Distinguez rigoureusement les actes d'attribution (identité pour autrui) et les actes d'appartenance (identité pour soi).",
      "Explicitez la différence entre les transactions subjectives (héritées vs visées) et les transactions objectives (proposées vs incorporées).",
      "Analysez les 4 destins de la transaction objective : promotion interne, conversion externe, blocage interne, exclusion externe.",
      "Mobilisez les 4 styles identitaires associés (bloquée, menacée, incertaine, constituée) et discutez des crises identitaires contemporaines.",
    ],
    criteria: [
      "Définir l'identité selon Dubar (1991) : un compromis instable et permanent, jamais une essence statique.",
      "Opposer actes d'attribution (institutions, pouvoir, identités virtuelles) et actes d'appartenance (récit de soi, subjectivité, identités réelles).",
      "Détailler les transactions subjectives (continuité vs rupture) et objectives (reconnaissance vs non-reconnaissance).",
      "Matrice des 4 formes : Promotion interne (continuité + reconnaissance), Blocage interne (continuité + non-reconnaissance), Conversion externe (rupture + reconnaissance), Exclusion externe (rupture + non-reconnaissance).",
      "Illustrer par un cas concret de transformation professionnelle ou d'impasse statutaire.",
    ],
    planConseille: [
      "1. Introduction : Situer Claude Dubar (1991) et sa sociologie constructiviste. Poser l'identité comme double transaction permanente entre le regard d'autrui et le récit de soi.",
      "2. I — L'architecture de la double transaction : Le versant relationnel (attribution, institutions, pouvoir) vs le versant biographique (appartenance, temporalité, subjectivité).",
      "3. II — Les 4 formes identitaires et les destins de la reconnaissance : Matrice croisée (continuité/rupture x reconnaissance/non-reconnaissance).",
      "4. III — Les crises identitaires dans le travail contemporain : Déclassement, précarisation et rupture des transactions objectives.",
      "5. Conclusion : Le rôle du psychologue du travail pour rouvrir les espaces de négociation de l'identité.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>Dans <i>La socialisation : construction des identités sociales et professionnelles</i> (1991), <b>Claude Dubar</b> rompt avec les approches essentialistes pour définir l'identité non comme une donnée figée, mais comme le résultat instable et dynamique d'une <b>double transaction</b> permanente entre le sujet et le monde social. L'identité professionnelle est une négociation continue entre le regard que les institutions portent sur l'individu et la manière dont celui-ci se raconte.</p>

<h4>I. Les deux axes de la double transaction identitaire</h4>
<p><b>A. Le processus relationnel (Identité pour autrui) :</b><br/>
Il répond à la question : <i>« Quel type d'homme ou de femme dit-on que vous êtes ? »</i>. Il repose sur des <b>actes d'attribution</b> émis par les institutions légitimes (hiérarchie, diplômes, conventions collectives). Il attribue une identité sociale « virtuelle » et oscille entre <i>reconnaissance</i> et <i>non-reconnaissance</i> dans le système d'action.</p>

<p><b>B. Le processus biographique (Identité pour soi) :</b><br/>
Il répond à la question : <i>« Quel type d'homme ou de femme dites-vous que vous êtes ? »</i>. Il s'incarne dans des <b>actes d'appartenance</b> où le sujet revendique son identité « réelle ». Il arbitre dans le temps entre identités <i>héritées</i> du passé et identités <i>visées</i> dans l'avenir, oscillant entre <i>continuité</i> et <i>rupture</i>.</p>

<h4>II. La matrice des 4 formes identitaires</h4>
<p>Du croisement de la transaction subjective (continuité/rupture) et de la transaction objective (reconnaissance/non-reconnaissance) émergent quatre formes d'identités professionnelles :</p>
<ul>
  <li><b>1. La Promotion interne (Continuité + Reconnaissance) :</b> L'identité d'entreprise ou de cadre. L'opérateur capitalise sur son ancienneté et voit son engagement validé statutairement par l'organisation.</li>
  <li><b>2. Le Blocage interne (Continuité + Non-reconnaissance) :</b> L'identité de métier ou ouvrière bloquée. Le salarié reste fidèle à ses savoir-faire traditionnels, mais l'organisation modernisée ne reconnaît plus sa valeur, provoquant ressentiment et disqualification.</li>
  <li><b>3. La Conversion externe (Rupture + Reconnaissance) :</b> L'identité de réseau ou de reconversion. L'individu rompt avec son milieu d'origine pour acquérir de nouvelles compétences validées par un diplôme ou un nouveau collectif.</li>
  <li><b>4. L'Exclusion externe (Rupture + Non-reconnaissance) :</b> L'identité hors-travail ou menacée. Rupture subie (licenciement, précarité) sans accès à un statut reconnu, menant à l'anomie et au désarroi identitaire.</li>
</ul>

<h4>Conclusion :</h4>
<p>La crise d'identité survient lorsque la double transaction est disjointe : l'identité pour soi ne trouve aucun écho dans l'identité pour autrui. Pour le psychologue du travail, intervenir consiste à diagnostiquer ces blocages transactionnels et à restaurer les conditions de la reconnaissance professionnelle.</p>
`,
  },
  {
    id: "sujet_2",
    num: 2,
    type: "bourdieu",
    format: "dissertation",
    titre: "Sujet 2 : Domination symbolique, habitus et double vérité du travail selon Pierre Bourdieu",
    t: "Dissertation : « Domination symbolique, habitus et double vérité du travail selon Pierre Bourdieu. »",
    theme: "La formule de l'habitus, les 4 capitaux, le champ et l'illusio",
    desc: "Dissertation : « Domination symbolique, habitus et double vérité du travail selon Pierre Bourdieu : analyser les mécanismes de la reproduction et du consentement au travail. »",
    conceptsCles: [
      "Algorithme : [(Dispositions + Capital) x Champ] = Habitus",
      "4 capitaux (économique, culturel, social, symbolique)",
      "Violence symbolique & consentement dominé",
      "Théorie des Champs (nomos, illusio)",
      "La double vérité du travail (1996)",
    ],
    auteursLies: ["Pierre Bourdieu", "Claude Dubar", "Max Weber", "Élisabeth Lucy"],
    questions: [
      "Explicitez l'algorithme sociologique de Pierre Bourdieu : [(Dispositions + Capital) x Champ] = Habitus.",
      "Définissez les 4 espèces de capitaux et précisez les 3 états du capital culturel (incorporé, objectivé, institutionnalisé).",
      "Expliquez le mécanisme de la violence symbolique et montrez comment les dominés participent inconsciemment à leur propre domination.",
      "Analysez la thèse de « La double vérité du travail » (1996) : en quoi oppose-t-elle l'exploitation objective à l'accomplissement subjectif (l'illusio) ?",
      "Quelles sont les conséquences de cette sociologie de la domination pour la posture clinique du psychologue du travail ?",
    ],
    criteria: [
      "Formulation exacte de la formule de Bourdieu et définition de l'habitus comme histoire faite corps.",
      "Distinction des 4 capitaux : économique (revenus), culturel (savoirs, titres), social (réseaux), symbolique (légitimité perçue).",
      "Compréhension de la violence symbolique : une domination qui ne s'exerce pas par la contrainte physique, mais par l'adhésion intériorisée aux classements dominants.",
      "Développement précis de 'La double vérité du travail' : la vérité objective (exploitation, asymétrie) et la vérité subjective (passion, fierté du travail bien fait, illusio).",
      "Rupture avec la psychologisation : situer la souffrance dans les heurts d'habitus et les luttes de légitimité au sein du champ.",
    ],
    planConseille: [
      "1. Introduction : Pierre Bourdieu et la critique de l'illusion contractualiste du travail. Définir le travail comme champ de luttes pour le capital légitime.",
      "2. I — L'incorporation de l'ordre social : L'algorithme Habitus, Capitaux et Champ. La violence symbolique au travail.",
      "3. II — Le paradoxe de « La double vérité du travail » : L'exploitation économique objective vs l'investissement passionné dans le jeu (l'illusio).",
      "4. III — Les heurts d'habitus et la souffrance statutaire : Déclassement, sentiment d'illégitimité et impasses de carrière.",
      "5. Conclusion : Pourquoi le psychologue du travail doit analyser les structures de domination avant de diagnostiquer l'individu.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>Pour <b>Pierre Bourdieu</b>, le monde du travail n'est ni un simple marché économique d'échanges libres, ni un espace neutre de coopération technique : c'est un <b>champ de forces et de luttes pour la légitimité symbolique</b>. À travers son équation synthétique, il modélise comment les structures objectives du monde social s'incorporent dans les corps et les esprits des travailleurs.</p>

<h4>I. L'architecture de la domination : Habitus, Capitaux et Champ</h4>
<p><b>A. L'algorithme sociologique fondamental :</b><br/>
Bourdieu formalise l'action sociale sous la formule : <code>[(Dispositions + Capital) × Champ] = Habitus / Pratique</code>. L'<b>habitus</b> est un système de dispositions durables et transposables, une <i>« nécessité faite vertu »</i> : c'est le passé incorporé qui oriente spontanément les choix, les goûts, la posture corporelle et les ambitions du travailleur.</p>

<p><b>B. Les 4 espèces de capitaux :</b></p>
<ul>
  <li><b>Capital économique</b> : revenus, patrimoine, ressources financières.</li>
  <li><b>Capital culturel</b> : décisif sous ses trois formes — <i>incorporé</i> (aisance linguistique, démarche, hexis corporelle), <i>objectivé</i> (livres, instruments de travail) et <i>institutionnalisé</i> (titres et diplômes d'État).</li>
  <li><b>Capital social</b> : réseau de relations durables et d'interconnaissances mobilisables.</li>
  <li><b>Capital symbolique</b> : forme prise par tout capital lorsqu'il est perçu à travers des catégories de perception qui en reconnaissent la valeur (prestige, autorité légitime).</li>
</ul>

<p><b>C. La violence symbolique :</b><br/>
Elle désigne une forme de pouvoir qui s'exerce sur un agent avec sa complicité inconsciente. Le salarié dominé applique au monde du travail et à sa propre personne les catégories de classement des dominants (ex. : <i>« ce poste de direction n'est pas fait pour quelqu'un comme moi »</i>), transformant l'exclusion sociale en sentiment d'incompétence personnelle.</p>

<h4>II. Le paradoxe de « La double vérité du travail » (1996)</h4>
<p>Dans son texte fondamental de 1996, Bourdieu démontre que le travail repose sur une tension irréductible :</p>
<ul>
  <li><b>La vérité objective</b> : Le salariat est une relation d'exploitation économique, de subordination juridique et d'asymétrie de pouvoir.</li>
  <li><b>La vérité subjective</b> : Le travailleur ne se vit pas comme un simple rouage aliéné. Il s'investit corps et âme dans son métier, y met son honneur, son ingéniosité et son amour-propre. C'est ce que Bourdieu nomme l'<b>illusio</b> : le fait d'être pris au jeu, de croire que le jeu en vaut la chandelle. Sans cette illusio, le travail s'effondrerait. L'organisation tire profit de cet engagement subjectif tout en maintenant l'exploitation objective.</li>
</ul>

<h4>Conclusion :</h4>
<p>La théorie bourdieusienne arme le psychologue du travail contre le piège de la psychologisation naïve : les souffrances professionnelles (sentiment d'illégitimité, burn-out des cadres méritocratiques) ne sont pas des failles individuelles, mais le reflet de conflits d'habitus et de violences symboliques institutionnelles.</p>
`,
  },
  {
    id: "sujet_3",
    num: 3,
    type: "sainsaulieu",
    format: "dissertation",
    titre: "Sujet 3 : L'entreprise comme matrice de socialisation selon Renaud Sainsaulieu",
    t: "Dissertation : « L'entreprise comme matrice de socialisation : comparez les modèles relationnels de Renaud Sainsaulieu. »",
    theme: "Les 4 modèles d'accès au pouvoir et relations entre pairs au travail",
    desc: "Dissertation : « L'entreprise comme matrice de socialisation : comparez les modèles relationnels de Renaud Sainsaulieu et discutez de leurs mutations contemporaines face au lean management et à l'individualisation. »",
    conceptsCles: [
      "L'Identité au travail (1977)",
      "Apprentissage démocratique et politique",
      "Modèle du Retrait",
      "Modèle Fusionnel",
      "Modèle Négociateur",
      "Modèle Affinitaire",
      "4 critères : pouvoir, relations, valeurs, trajectoire",
    ],
    auteursLies: ["Renaud Sainsaulieu", "Claude Dubar", "Robert K. Merton", "Élisabeth Lucy"],
    questions: [
      "Présentez la thèse fondatrice de Renaud Sainsaulieu (1977) : en quoi l'entreprise est-elle une matrice de socialisation politique et culturelle ?",
      "Détaillez et comparez les deux modèles de défense : le modèle du Retrait et le modèle Fusionnel.",
      "Détaillez et comparez les deux modèles de participation : le modèle Négociateur et le modèle Affinitaire.",
      "Analysez les 4 critères d'analyse de Sainsaulieu : investissement d'accès aux fonctions, normes de comportement relationnel, valeurs de référence, trajectoires professionnelles.",
      "Mettez en perspective ces modèles avec les mutations contemporaines du travail (individualisation des carrières, télétravail, lean management).",
    ],
    criteria: [
      "Thèse de Sainsaulieu : l'expérience quotidienne des relations de pouvoir au travail façonne la vision de la société et la citoyenneté adulte.",
      "Modèle Fusionnel : ouvriers d'atelier, absence de pouvoir individuel, camaraderie égalitaire, unanimisme sans faille contre le chef.",
      "Modèle du Retrait : exécutants sans qualification, investissement dans le non-travail (famille, loisirs), individualisme passif.",
      "Modèle Négociateur : cadres, techniciens qualifiés, rivalité pacifiée, recours au débat contradictoire d'experts, compromis démocratique.",
      "Modèle Affinitaire : jeunes employés mobiles, clans de pairs sélectifs, conformisme aux supérieurs, quête de reconnaissance personnalisée.",
      "Diagnostic contemporain : destruction des collectifs fusionnels et recrudescence du retrait ou du carriérisme promotionnel.",
    ],
    planConseille: [
      "1. Introduction : Situer l'ouvrage fondateur de Renaud Sainsaulieu (1977). L'entreprise comme lieu où se façonne l'identité politique de l'adulte.",
      "2. I — Les modèles de défense : Retrait (l'évasion hors-travail) et Fusion (le bloc ouvrier unanime).",
      "3. II — Les modèles d'intégration et de pouvoir : Négociation (l'expertise démocratique) et Affinité (le clan des pairs).",
      "4. III — Les 4 critères comparatifs : Accès aux fonctions, relations, valeurs et trajectoires.",
      "5. IV — Mutations contemporaines : La fragilisation des collectifs face au management individualisant.",
      "6. Conclusion : Apports pour l'analyse des dynamiques d'équipe par le psychologue du travail.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>En publiant <i>L'identité au travail</i> en 1977, <b>Renaud Sainsaulieu</b> bouleverse la sociologie du travail et des organisations : l'atelier et le bureau ne sont pas seulement des lieux de production de biens et de services, mais les <b>matrices fondamentales de la socialisation adulte</b>. C'est dans l'épreuve quotidienne du pouvoir et des relations avec les pairs que les salariés apprennent la démocratie, la solidarité ou la résignation.</p>

<h4>I. Les modèles de défense face à l'impuissance structurelle</h4>
<p><b>1. Le modèle Fusionnel (L'atelier ouvrier) :</b></p>
<ul>
  <li><i>Contexte :</i> Travailleurs manuels ou ouvriers spécialisés soumis à des tâches répétitives sans autonomie technique.</li>
  <li><i>Dynamique relationnelle :</i> Ne disposant d'aucun pouvoir individuel face à la hiérarchie, ils font corps à travers une <b>camaraderie égalitaire et unanime</b>. La divergence interne est proscrite (<i>« on est tous dans la même galère »</i>). Le collectif fait bloc pour protéger le groupe contre les pressions de l'encadrement.</li>
</ul>

<p><b>2. Le modèle du Retrait (L'exécutant isolé) :</b></p>
<ul>
  <li><i>Contexte :</i> Salariés précaires, O.S. isolés, employés sous statut dévalorisé sans perspective de promotion.</li>
  <li><i>Dynamique relationnelle :</i> L'individu renonce à investir le travail comme lieu de réalisation. Le travail est purement instrumental et alimentaire (gagner sa vie). L'investissement identitaire et le pouvoir sont déportés <b>hors-travail</b> : dans la sphère familiale, les passions associatives ou le bricolage. Au travail, l'attitude dominante est l'individualisme passif et l'évitement du conflit.</li>
</ul>

<h4>II. Les modèles de participation et de négociation du pouvoir</h4>
<p><b>3. Le modèle Négociateur (L'expertise démocratique) :</b></p>
<ul>
  <li><i>Contexte :</i> Professionnels hautement qualifiés, techniciens supérieurs, ingénieurs, cadres.</li>
  <li><i>Dynamique relationnelle :</i> S'appuyant sur leur expertise technique et leur maîtrise des zones d'incertitude (Crozier), ils acceptent la <b>rivalité pacifiée</b> entre pairs. Le désaccord n'est pas vécu comme une trahison, mais comme un instrument de progrès : le collectif délibère et négocie des compromis démocratiques avec la direction.</li>
</ul>

<p><b>4. Le modèle Affinitaire (Les clans électifs) :</b></p>
<ul>
  <li><i>Contexte :</i> Jeunes professionnels, employés du tertiaire en ascension sociale ou professions intermédiaires mobiles.</li>
  <li><i>Dynamique relationnelle :</i> Ne croyant ni à la fusion globale ni à la négociation statutaire, ils se regroupent par <b>affinités sélectives</b> (petits clans d'amis choisis). Ils recherchent la proximité avec l'encadrement tout en cultivant des relations interpersonnelles affectives pour humaniser le quotidien professionnel.</li>
</ul>

<h4>III. Pertinence contemporaine et diagnostic clinique</h4>
<p>Le management contemporain (Lean, télétravail, primes au mérite individuel, flex-office) détruit systématiquement les conditions du modèle fusionnel et affaiblit les capacités de négociation collective :</p>
<ul>
  <li>Cette déstructuration pousse un nombre croissant de salariés vers le <b>modèle du retrait défensif</b> ou vers un carriérisme individualiste précaire.</li>
  <li>Pour le psychologue du travail, la typologie de Sainsaulieu fournit une grille de lecture irremplaçable pour analyser les blocages relationnels et aider les collectifs à reconstruire une culture de la délibération.</li>
</ul>
`,
  },
  {
    id: "sujet_4",
    num: 4,
    type: "honneth",
    format: "dissertation",
    titre: "Sujet 4 : La lutte pour la reconnaissance au travail selon Axel Honneth",
    t: "Dissertation : « La lutte pour la reconnaissance au travail : des 3 sphères d'Axel Honneth à la souffrance identitaire contemporaine. »",
    theme: "Les 3 sphères de reconnaissance, les 3 formes de mépris et le travail invisible",
    desc: "Dissertation : « La lutte pour la reconnaissance au travail : des trois sphères d'Axel Honneth à la souffrance identitaire contemporaine et aux métiers invisibles. »",
    conceptsCles: [
      "Paradigme de la reconnaissance (1992)",
      "Sphère intime (Amour / Confiance en soi)",
      "Sphère juridique (Droit / Respect de soi)",
      "Sphère de la solidarité (Estime sociale / Estime de soi)",
      "3 formes de mépris social (violences, privation de droits, dévalorisation)",
      "Travail invisible et métiers du care (Élisabeth Lucy, SAMU Social)",
    ],
    auteursLies: ["Axel Honneth", "Claude Dubar", "Christophe Dejours", "Élisabeth Lucy"],
    questions: [
      "Exposez le paradigme de la reconnaissance chez Axel Honneth (1992) en rupture avec la théorie de la simple redistribution économique.",
      "Détaillez les trois sphères de reconnaissance : intime, juridique et sociale. Quelle relation positive à soi chacune permet-elle de développer ?",
      "Présentez les trois formes de mépris social correspondantes et analysez leurs répercussions sur l'identité.",
      "Appliquez la sphère de l'estime sociale aux crises du travail contemporain (invisibilisation des métiers du care, reporting déshumanisant, déqualification).",
      "Faites le lien entre les travaux d'Axel Honneth et l'analyse d'Élisabeth Lucy sur les professionnels du SAMU Social et les métiers de la précarité.",
    ],
    criteria: [
      "Définition de la reconnaissance comme besoin anthropologique fondamental pour accéder à l'autonomie et au statut de sujet.",
      "Architecture tripartite : 1. Amour/famille -> Confiance en soi ; 2. Droit/citoyenneté -> Respect de soi ; 3. Solidarité/travail -> Estime de soi.",
      "3 formes de mépris : violences physiques (atteinte corporelle), privation de droits (mort civique), dévalorisation de la contribution (déni de valeur au travail).",
      "Analyse de la non-reconnaissance au travail : le déni d'estime sociale pousse les salariés au désengagement, à la honte et à la dépression.",
      "Mobilisation du terrain d'Élisabeth Lucy (SAMU Social) : des soignants et travailleurs sociaux indispensables au lien social mais maintenus dans l'invisibilité et la précarité statutaire.",
    ],
    planConseille: [
      "1. Introduction : Axel Honneth (École de Francfort) et l'ouvrage <i>La lutte pour la reconnaissance</i> (1992). L'injustice comme déni moral d'existence.",
      "2. I — L'architecture tripartite de la reconnaissance : De la confiance en soi (sphère intime) au respect de soi (sphère du droit) et à l'estime de soi (sphère du travail).",
      "3. II — Les formes de mépris et la psychopathologie du travail : Le déni d'estime sociale et la souffrance éthique.",
      "4. III — Le travail invisible et les métiers du care (Élisabeth Lucy) : L'invisibilisation des professionnels de la précarité.",
      "5. Conclusion : La reconnaissance au travail comme condition de la démocratie et de la santé mentale.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>Héritier de la Théorie critique de l'École de Francfort, <b>Axel Honneth</b> propose dans <i>La lutte pour la reconnaissance</i> (1992) un changement fondamental de paradigme : la conflictualité sociale ne se résume pas à la lutte pour le partage des richesses matérielles, elle est animée par une exigence morale universelle de <b>reconnaissance de sa dignité et de sa valeur singulière</b>. Sans reconnaissance, l'individu ne peut pas se penser en sujet autonome de sa propre vie.</p>

<h4>I. L'architecture tripartite de la reconnaissance chez Honneth</h4>
<p>Honneth identifie trois sphères relationnelles indispensables au développement d'une relation positive à soi-même :</p>
<ol>
  <li><b>La sphère intime (L'Amour et l'Amitié) :</b><br/>
  Elle permet l'acquisition de la <b>confiance en soi</b> corporelle et affective. La forme de mépris correspondante est l'<i>atteinte à l'intégrité physique</i> (violences, viols, maltraitances) qui détruit la sécurité fondamentale du sujet.</li>
  <li><b>La sphère juridique (Le Droit et la Citoyenneté) :</b><br/>
  Elle fonde le <b>respect de soi</b> en reconnaissant l'individu comme un pair moral, doté des mêmes droits civiques et statutaires que les autres. Le mépris correspondant est l'<i>exclusion juridique ou la discrimination</i> (privation de droits, citoyen de seconde zone).</li>
  <li><b>La sphère de la solidarité (L'Estime sociale / Le Travail) :</b><br/>
  Elle assure l'<b>estime de soi</b> en valorisant la contribution unique de l'activité du sujet à la réalisation des finalités collectives. Le mépris correspondant est la <i>dévalorisation culturelle et sociale</i> : considérer qu'un métier ou une tâche ne vaut rien aux yeux de la communauté.</li>
</ol>

<h4>II. Le déni d'estime sociale dans le travail contemporain</h4>
<p>C'est au sein de la troisième sphère que se concentrent les pathologies contemporaines du travail :</p>
<ul>
  <li><b>L'invisibilisation du travail réel :</b> L'évaluation quantitative et algorithmique réduit l'activité à des indicateurs chiffrés, ignorant l'investissement humain, la patience et le dévouement déployés au quotidien.</li>
  <li><b>Le travail invisible et les métiers du care :</b> Comme le montre <b>Élisabeth Lucy</b> dans ses recherches sur les intervenants du <b>SAMU Social</b> et du secteur médico-social, les professionnels qui prennent en charge la grande précarité accomplissent une mission vitale pour la société mais subissent une triple non-reconnaissance : salaire modeste, conditions d'exercice dégradées et absence de considération institutionnelle.</li>
</ul>

<h4>Conclusion :</h4>
<p>Pour le psychologue du travail, la grille d'Axel Honneth permet de comprendre que les revendications professionnelles ne portent pas seulement sur le pouvoir d'achat, mais sur le <b>besoin viscéral d'être vu et reconnu</b> dans son utilité sociale. Restaurer la reconnaissance au travail est le premier levier de la santé psychique.</p>
`,
  },
  {
    id: "sujet_5",
    num: 5,
    type: "deontologie",
    format: "dissertation",
    titre: "Sujet 5 : L'identité et la déontologie du Psychologue du Travail",
    t: "Dissertation : « L'identité professionnelle du psychologue du travail : mandat institutionnel, indépendance déontologique (Code 2021) et Loi 1985. »",
    theme: "Histoire de la profession, Loi de 1985, Code de déontologie (2021) et indépendance",
    desc: "Dissertation : « L'identité professionnelle du psychologue du travail : entre mandat institutionnel, indépendance déontologique et histoire de la profession en France. »",
    conceptsCles: [
      "Titre de psychologue (Loi du 25 juillet 1985)",
      "Code de déontologie des psychologues (1996 / révisé 2021)",
      "Thomas Le Bianic (profession 'balkanisée')",
      "Indépendance professionnelle & autonomie technique",
      "Consentement libre et éclairé",
      "Secret professionnel & Triangulation",
    ],
    auteursLies: ["Thomas Le Bianic", "Élisabeth Lucy", "Claude Dubar", "Richard Wittorski"],
    questions: [
      "Retracez les étapes historiques majeures de la professionnalisation des psychologues en France selon Thomas Le Bianic (la profession 'balkanisée' face à la médecine du travail).",
      "Quelle est la portée juridique de la Loi du 25 juillet 1985 protégeant l'usage du titre de psychologue ?",
      "Présentez les principes fondamentaux du Code de déontologie des psychologues (actualisation 2021) : respect des droits, indépendance, secret professionnel.",
      "Analysez le concept de 'triangulation' de l'intervention : comment le psychologue du travail articule-t-il la commande de la direction et la demande réelle des salariés ?",
      "Quelles sont les dérives déontologiques majeures guettant le psychologue du travail en organisation (sélection déguisée, rupture du secret, instrumentalisation) ?",
    ],
    criteria: [
      "Analyse historique : Le Bianic démontre la rivalité historique entre médecins du travail et psychologues, menant à une reconnaissance tardive et éclatée.",
      "Cadre légal : Loi du 25 juillet 1985 (article 44) et décret du 22 mars 1990 réservant le titre aux titulaires du Titre RNCP niveau 7 de psychologue du travail du Cnam ou d'un Master avec stage validé.",
      "Maîtrise du Code de déontologie révisé en 2021 : Principe 1 (droits de la personne et consentement), Principe 2 (compétence), Principe 3 (responsabilité et indépendance), Principe 4 (rigueur et respect du but assigné).",
      "La triangulation : distinguer le commanditaire (qui paie l'intervention), le destinataire (qui bénéficie de l'action) et le cadre d'intervention neutre et confidentiel.",
      "Refus catégorique de l'instrumentalisation des outils d'évaluation psychologique à des fins de tri social ou de licenciement.",
    ],
    planConseille: [
      "1. Introduction : La conquête fragile du statut professionnel de psychologue en France. Définir la déontologie comme garant de l'identité de métier.",
      "2. I — Histoire et statut : De la psychotechnique originelle à la Loi du 25 juillet 1985. La 'balkanisation' selon Le Bianic.",
      "3. II — Les principes cardinaux du Code de déontologie (2021) : Consentement, secret partagé, compétence et rigueur théorique.",
      "4. III — La posture en organisation : La triangulation de l'intervention et la résistance aux pressions managériales.",
      "5. Conclusion : La déontologie comme boussole d'action et protectrice de la santé au travail.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>L'identité du psychologue du travail en France est le fruit d'une longue et complexe conquête socio-historique. Contrairement au médecin dont la légitimité statutaire s'est imposée dès le XIXe siècle, le psychologue a dû conquérir son autonomie face aux sciences biomédicales et à l'emprise des directions des ressources humaines. Son <b>identité professionnelle</b> est indissociable de son <b>cadre déontologique</b>, garant de son indépendance et de la protection des personnes.</p>

<h4>I. La construction historique du titre : de la balkanisation à la loi de 1985</h4>
<p><b>A. Une profession historiquement 'balkanisée' (Thomas Le Bianic) :</b><br/>
Dans ses travaux sociologiques, Thomas Le Bianic montre que la psychologie du travail en France s'est d'abord constituée comme une nébuleuse éclatée d'orientations divergentes : la psychotechnique de laboratoire (Lahy, Piéron au Cnam), l'orientation professionnelle scolaire, l'ergonomie naissante et la sélection industrielle. Divisée en associations rivales, la profession a longtemps souffert de l'hégémonie de la médecine du travail.</p>

<p><b>B. Le tournant de la Loi du 25 juillet 1985 :</b><br/>
L'article 44 de la Loi de 1985 et le décret n° 90-255 marquent une rupture historique : ils protègent <b>l'usage professionnel du titre de psychologue</b>. Seuls les titulaires du Titre RNCP niveau 7 de psychologue du travail délivré par le Cnam ou d'un Master de psychologie, accompagnés d'un stage professionnalisant validé et d'un enregistrement au répertoire ADELI/RPPS, peuvent légalement faire usage du titre. Cette loi fonde l'identité statutaire du praticien.</p>

<h4>II. Les piliers du Code de déontologie des psychologues (1996 / actualisé 2021)</h4>
<p>Le Code de déontologie pose les garde-fous éthiques de la pratique :</p>
<ol>
  <li><b>Respect des droits fondamentaux et de la dignité :</b> Le psychologue recueille le <i>consentement libre et éclairé</i> de toute personne avant de l'évaluer ou de l'accompagner. Il refuse toute manipulation.</li>
  <li><b>Compétence et rigueur théorique :</b> Il fonde ses démarches sur des savoirs scientifiques actualisés et explicite la portée et les limites de ses conclusions.</li>
  <li><b>Responsabilité et indépendance professionnelle :</b> Le psychologue décide en pleine autonomie de ses méthodes et conclusions. Aucun supérieur hiérarchique, DRH ou commanditaire ne peut lui imposer un diagnostic ou modifier ses préconisations.</li>
  <li><b>Rigueur et respect du but assigné :</b> Les outils psychologiques (questionnaires, entretiens) ne doivent jamais être détournés à des fins de surveillance ou d'arbitrage de plans sociaux.</li>
  <li><b>Secret professionnel et confidentialité :</b> Les éléments intimes confiés par un salarié restent strictement confidentiels. La restitution à la direction ne porte que sur les conditions collectives de travail.</li>
</ol>

<h4>III. La posture clinique : la maîtrise de la triangulation</h4>
<p>En organisation, le psychologue du travail opère toujours dans un cadre <b>triangulé</b> :</p>
<ul>
  <li>Il y a le <i>commanditaire</i> (la direction ou le DRH qui finance la mission), les <i>destinataires</i> (les salariés, les équipes) et le <i>clinicien</i>.</li>
  <li>La compétence première du psychologue consiste à transformer la commande institutionnelle unilatérale (<i>« venez réparer le moral des salariés ou repérer les déviants »</i>) en une <b>demande clinique partagée</b>, axée sur l'analyse de l'activité réelle et des structures organisationnelles.</li>
</ul>

<h4>Conclusion :</h4>
<p>La déontologie n'est pas un code juridique pétrifié : c'est l'armature vivante qui permet au psychologue du travail de résister aux pressions d'instrumentalisation et de demeurer un tiers garant de la santé des professionnels et de la justice organisationnelle.</p>
`,
  },
  {
    id: "sujet_6",
    num: 6,
    type: "cas",
    format: "situation",
    titre: "Sujet 6 : Étude de situation de travail — Crise identitaire et Lean management en industrie",
    t: "Étude de situation : « Ouvriers et agents de maîtrise face au Lean management : analyser les blocages identitaires (Dubar, Sainsaulieu). »",
    theme: "Analyse sociologique croisée (Dubar, Sainsaulieu) et préconisations d'intervention",
    desc: "Analyse de situation : « Ouvriers de métier qualifiés et agents de maîtrise face à un plan de modernisation lean management : analysez les blocages identitaires et proposez une démarche clinique. »",
    conceptsCles: [
      "Identité de métier bloquée (Dubar)",
      "Modèle fusionnel déstabilisé (Sainsaulieu)",
      "Nouveaux professionnels (Dubar)",
      "Disqualification statutaire",
      "Intervention clinique & cadre déontologique",
    ],
    auteursLies: ["Claude Dubar", "Renaud Sainsaulieu", "Pierre Bourdieu", "Élisabeth Lucy"],
    questions: [
      "Analysez la situation des ouvriers de métier à l'aide de la grille de la double transaction de Claude Dubar (processus biographique, processus relationnel, forme identitaire résultante).",
      "À l'aide de la typologie de Renaud Sainsaulieu, caractérisez le modèle relationnel antérieur des ouvriers et expliquez pourquoi le nouveau mode de management engendre un repli dans le modèle du retrait.",
      "Analysez les tensions entre les anciens ouvriers et les jeunes techniciens diplômés en mobilisant la théorie des capitaux de Pierre Bourdieu.",
      "En tant que psychologue du travail mandaté pour intervenir, décrivez les étapes méthodologiques de votre intervention en précisant les garanties déontologiques indispensables.",
    ],
    criteria: [
      "Diagnostic Dubar : Les ouvriers vivent une crise de la transaction objective (continuité biographique mais non-reconnaissance par les grilles lean = identité bloquée / blocage interne).",
      "Diagnostic Sainsaulieu : Passage contraint d'un modèle fusionnel (solidarité d'atelier, camaraderie protectrice) à un modèle du retrait (démotivation, absentéisme, repli individuel).",
      "Diagnostic Bourdieu : Conflit de capitaux entre le capital culturel incorporé des ouvriers (expérience, tours de main, ancienneté) dévalué par l'organisation, et le capital culturel institutionnalisé des jeunes techniciens (titres scolaires, compétences numériques).",
      "Démarche d'intervention : Négociation du cadre déontologique (volontariat, confidentialité, indépendance), entretiens d'explicitation du travail réel, espaces de délibération collective entre anciens et jeunes pour réconcilier métier et procédures.",
    ],
    planConseille: [
      "1. Synthèse de la situation clinique : Les symptômes de la crise (démotivation, turnover, arrêts maladie) consécutifs à la mise en place du Lean.",
      "2. I — Diagnostic selon Claude Dubar : La crise de la double transaction et la forme d'identité bloquée.",
      "3. II — Diagnostic relationnel selon Renaud Sainsaulieu : De la fusion d'atelier au retrait défensif.",
      "4. III — Les heurts d'habitus et de capitaux selon Bourdieu : Anciens de terrain vs Jeunes techniciens procéduraux.",
      "5. IV — Projet d'intervention clinique du psychologue du travail : Co-analyse, cadre déontologique et espaces de dialogue intergénérationnel.",
    ],
    corrige: `
<h4>Présentation du Cas Clinique :</h4>
<p>Dans une entreprise de métallurgie de pointe, la direction introduit un plan d'organisation Lean : digitalisation des fiches de suivi, suppression des temps informels de réglage et recrutement de jeunes techniciens Bac+3 pour standardiser les postes. Les ouvriers de métier (20 ans d'ancienneté), autrefois fiers de leur savoir-faire empirique, voient leurs méthodes jugées obsolètes. Le climat se dégrade brutalement : conflits entre générations, absentéisme record et sentiment de déqualification généralisé.</p>

<h4>I. Diagnostic selon Claude Dubar : L'Identité de métier bloquée</h4>
<p>La grille de la double transaction éclaire parfaitement l'impasse vécue par les ouvriers :</p>
<ul>
  <li><b>Processus biographique (Identité pour soi) :</b> Continuité forte. Les ouvriers se vivent toujours comme les dépositaires légitimes de l'art du métier, fiers de leurs compétences manuelles incorporées.</li>
  <li><b>Processus relationnel (Identité pour autrui) :</b> Non-reconnaissance brutale. Les nouveaux critères gestionnaires (actes d'attribution) ne reconnaissent plus que la vitesse de saisie sur tablette et le respect aveugle des protocoles.</li>
  <li><b>Forme identitaire :</b> Cette configuration (continuité biographique + non-reconnaissance objective) correspond exactement à l'<b>identité bloquée (blocage interne)</b> chez Dubar. Le salarié se sent trahi par son entreprise et s'enferme dans le ressentiment.</li>
</ul>

<h4>II. Diagnostic selon Renaud Sainsaulieu : La destruction de la Fusion</h4>
<p>L'atelier fonctionnait traditionnellement selon le <b>modèle Fusionnel</b> de Sainsaulieu :</p>
<ul>
  <li>Les ouvriers puisaient leur sécurité dans une camaraderie unanime, une solidarité protectrice et des rituels collectifs de pause où se transmettaient les astuces de métier.</li>
  <li>Le Lean individualise la performance et chronomètre chaque tâche : il détruit les interstices temporels où vivait le collectif fusionnel. Faute de pouvoir basculer dans la négociation collective, les ouvriers basculent dans le <b>modèle du Retrait</b> : le travail redevient une corvée purement alimentaire, source de somatisation et de désengagement.</li>
</ul>

<h4>III. Conflits d'habitus et luttes de capitaux selon Pierre Bourdieu</h4>
<p>L'opposition entre anciens ouvriers et jeunes techniciens est une lutte au sein du champ professionnel :</p>
<ul>
  <li>Les <i>anciens</i> possèdent un très fort <b>capital culturel incorporé</b> (le coup d'œil, l'oreille attentive au bruit de la machine, l'habitus ouvrier) mais un faible capital institutionnalisé.</li>
  <li>Les <i>jeunes</i> arrivent avec un <b>capital culturel institutionnalisé</b> (diplôme universitaire) et symbolique (soutenus par la direction), mais sans connaissance de l'activité réelle.</li>
  <li>La violence symbolique s'exerce quand l'organisation décrète que seul le savoir formalisé sur écran est légitime, disqualifiant le savoir empirique des anciens.</li>
</ul>

<h4>IV. Démarche d'intervention et posture déontologique du psychologue</h4>
<p>En tant que psychologue du travail, l'intervention respecte des repères stricts :</p>
<ol>
  <li><b>Clarification du mandat et triangulation déontologique :</b> Refuser la demande initiale de la direction qui voudrait un coaching individuel pour <i>« vaincre la résistance au changement »</i> des ouvriers. Reposer le cadre : l'intervention portera sur l'analyse collective de l'activité réelle et de l'organisation. Garantir l'anonymat des échanges et le volontariat des participants.</li>
  <li><b>Mise en place d'espaces de délibération sur le travail réel :</b> Réunir en binômes mixtes anciens ouvriers et jeunes techniciens pour analyser concrètement les écarts entre les procédures numériques et les aléas de la matière.</li>
  <li><b>Restitution collective et arbitrage organisationnel :</b> Montrer à la direction que les savoirs tacites des anciens sont indispensables à la qualité de production. Proposer une co-construction des procédures associant les deux formes de compétences pour restaurer la double transaction identitaire.</li>
</ol>
`,
  },
  {
    id: "sujet_7",
    num: 7,
    type: "texte",
    format: "texte",
    titre: "Sujet 7 : Question avec texte en support — L'attribution de l'identité selon Claude Dubar",
    t: "Question avec texte : « L'attribution de l'identité par les institutions ne peut s'analyser en dehors des systèmes d'action... » (Claude Dubar)",
    theme: "Actes d'attribution, systèmes d'action et négociation des identités virtuelles",
    citation: {
      texte: "« L'attribution de l'identité par les institutions ne peut s'analyser en dehors des systèmes d'action dans lequel l'individu est impliqué et résulte des rapports de force entre les acteurs concernés et de la légitimité des catégories utilisées. »",
      auteur: "Claude Dubar",
      source: "La socialisation : construction des identités sociales et professionnelles (1991)",
      annee: "1991",
    },
    desc: "Analyse critique d'un texte fondamental de Claude Dubar sur les mécanismes institutionnels d'attribution identitaire et les rapports de pouvoir.",
    conceptsCles: [
      "Actes d'attribution",
      "Systèmes d'action (Crozier)",
      "Rapports de force",
      "Légitimité des catégories institutionnelles",
      "Identités virtuelles",
      "Négociation de la reconnaissance",
    ],
    auteursLies: ["Claude Dubar", "Michel Crozier", "Pierre Bourdieu", "Erving Goffman"],
    questions: [
      "Expliquez le sens de cette citation : pourquoi l'attribution d'une identité ne relève-t-elle jamais d'une simple description neutre ou objective ?",
      "En quoi les 'systèmes d'action' et les 'rapports de force' déterminent-ils les identités attribuées aux salariés dans une entreprise ?",
      "Qu'entend Claude Dubar par 'la légitimité des catégories utilisées' ? Donnez un exemple issu de la gestion des compétences contemporaine.",
      "Quelle distinction faites-vous entre l'identité sociale 'virtuelle' attribuée par l'institution et l'identité sociale 'réelle' revendiquée par le salarié (Goffman, Dubar) ?",
      "Comment le salarié peut-il résister ou négocier face à une attribution identitaire dévalorisante ou stigmatisante ?",
    ],
    criteria: [
      "Compréhension de l'acte d'attribution : un acte de pouvoir institutionnel qui catégorise, hiérarchise et impose une identité virtuelle.",
      "Mobilisation de la sociologie des organisations (Crozier) : les systèmes d'action concrets où chaque acteur défend ses marges d'incertitude.",
      "Analyse de la légitimité des catégories : les grilles RH (fiches de poste, référentiels de compétences, cotations d'emplois) comme instruments de pouvoir légitimés par la direction.",
      "Distinction virtuelle/réelle : l'identité virtuelle est la projection administrative sur le sujet ; l'identité réelle est son appropriation intime par les actes d'appartenance.",
      "Pistes de négociation : la mobilisation collective, le recours au diplôme ou la conversion externe pour contester une attribution réductrice.",
    ],
    planConseille: [
      "1. Introduction : Présenter la citation de Claude Dubar et son inscription dans la sociologie critique des institutions. Poser la thèse du caractère politique de l'attribution.",
      "2. Q1 & Q2 — L'attribution comme acte de pouvoir situé : Les systèmes d'action et les rapports de force institutionnels.",
      "3. Q3 — La bataille pour la légitimité des catégories gestionnaires : Référentiels de compétences et conventions collectives.",
      "4. Q4 — Identité virtuelle vs Identité réelle : L'écart entre l'étiquette institutionnelle et le récit de soi.",
      "5. Q5 — Stratégies de résistance et de négociation du sujet : De la résignation à la conversion et à la dispute statutaire.",
    ],
    corrige: `
<h4>Introduction :</h4>
<p>Dans cet extrait fondamental de <i>La socialisation</i> (1991), <b>Claude Dubar</b> déconstruit l'illusion d'une identité professionnelle qui serait attribuée de manière technique, scientifique ou bienveillante par les organisations. L'attribution d'une identité est un <b>acte politique et social situé</b>, indissociable des rapports de domination et des luttes pour la légitimité qui traversent l'entreprise.</p>

<h4>1. L'attribution : un acte de pouvoir institutionnel (Questions 1 & 2)</h4>
<p>Pour Dubar, dire à un individu <i>« voilà qui vous êtes dans cette organisation »</i> (par un intitulé de poste, un statut cadre ou non-cadre, une note d'évaluation) n'est jamais une simple description neutre :</p>
<ul>
  <li>C'est un <b>acte d'attribution</b> émanant d'une autorité institutionnelle dotée du pouvoir de nommer et de classer.</li>
  <li>Cet acte s'inscrit dans ce que Michel Crozier nomme un <b>système d'action concret</b> : l'attribution d'une identité résulte des compromis de pouvoir entre la direction, les organisations syndicales et l'encadrement. Attribuer l'étiquette d'« agent d'exécution » ou de « manager » permet de fixer des prérogatives, de limiter des revendications et de contrôler les zones d'incertitude de la production.</li>
</ul>

<h4>2. La légitimité des catégories utilisées (Question 3)</h4>
<p>L'efficacité de l'attribution dépend de la <b>légitimité symbolique des instruments de gestion</b> :</p>
<ul>
  <li>Dans les années 1960, la légitimité reposait sur les conventions collectives et les grilles Parodi (fondées sur le métier et la qualification du diplôme).</li>
  <li>Dans le management contemporain, les directions imposent la rhétorique des <b>« compétences »</b> et des <b>« soft skills »</b>. Sous couvert de modernité, ces catégories individualisent l'évaluation : elles prétendent mesurer des savoir-être subjectifs (l'agilité, la flexibilité, la résistance au stress), délégitimant les savoirs de métier collectifs et permettant d'imposer des classifications salariales plus restrictives.</li>
</ul>

<h4>3. Identité virtuelle vs Identité réelle (Question 4)</h4>
<p>Dubar emprunte au sociologue <b>Erving Goffman</b> (<i>Stigmate</i>, 1963) la distinction entre identité virtuelle et identité réelle :</p>
<ul>
  <li><b>L'identité sociale virtuelle :</b> C'est l'étiquette construite de l'extérieur par l'institution (le coefficient hiérarchique, le matricule, l'évaluation de performance). Elle réduit le sujet à son utilité productive aux yeux d'autrui.</li>
  <li><b>L'identité sociale réelle :</b> C'est l'identité subjective vécue et revendiquée par le travailleur à travers ses actes d'appartenance (son histoire, ses valeurs, ses réseaux de pairs, son attachement à la belle ouvrage).</li>
  <li>Le drame professionnel surgit lorsque l'écart entre identité virtuelle et réelle devient insultant : le salarié se sent enfermé dans une caricature administrative qui nie son expertise réelle.</li>
</ul>

<h4>4. Résistance et négociation identitaire (Question 5)</h4>
<p>Le salarié n'est pas un récepteur passif des attributions institutionnelles :</p>
<ul>
  <li>Il peut négocier son identité par la <b>reconnaissance syndicale ou collective</b>, en faisant la démonstration que les critères de la direction sont inadaptés à l'activité réelle.</li>
  <li>Il peut opérer une <b>conversion externe</b> (Dubar) : passer une VAE (Validation des Acquis de l'Expérience) ou obtenir un diplôme universitaire pour forcer l'institution à réviser son attribution.</li>
  <li>Si le blocage institutionnel est total, il peut basculer dans le <b>retrait psychologique</b> ou quitter l'organisation pour retrouver une dignité statutaire ailleurs.</li>
</ul>
`,
  },
  {
    id: "sujet_8",
    num: 8,
    type: "deontologie",
    format: "situation",
    titre: "Sujet 8 : Cas clinique et déontologique — Secret professionnel et restructuration en Pôle Médico-Social",
    t: "Cas clinique & Déontologie : « Secret professionnel, indépendance et fusion en Pôle Médico-Social (Code 2021). »",
    theme: "Dilemme éthique, mandat institutionnel vs secret partagé, restitution collective",
    desc: "Cas pratique : « Vous êtes psychologue du travail mandaté lors d'une fusion hospitalière. La direction exige les bilans individuels des soignants pour préparer les mobilités. Analysez les dilemmes et posez votre posture déontologique. »",
    conceptsCles: [
      "Code de déontologie (1996 / 2021)",
      "Secret professionnel et confidentialité",
      "Consentement libre et éclairé",
      "Triangulation du mandat",
      "Restitution collective sur les situations de travail",
      "Refus d'instrumentalisation de l'acte psychologique",
    ],
    auteursLies: ["Code de Déontologie 2021", "Thomas Le Bianic", "Axel Honneth", "Élisabeth Lucy"],
    questions: [
      "Identifiez avec précision les principes du Code de déontologie des psychologues (actualisation 2021) mis en péril par la demande de la direction.",
      "Rédigez la réponse professionnelle et argumentée que vous adressez à la direction pour justifier votre refus de transmettre les dossiers individuels.",
      "Comment transformez-vous cette demande d'évaluation individuelle en un diagnostic déontologique et organisationnel des conditions collectives de travail ?",
      "À la lumière des concepts de Claude Dubar et d'Axel Honneth, analysez la détresse identitaire des soignants confrontés à la menace de mobilité forcée.",
      "Décrivez le protocole de restitution finale de votre intervention : à qui restitue-t-on, sous quelles formes et avec quelles garanties éthiques ?",
    ],
    criteria: [
      "Identification des violations éthiques : Article sur le Secret Professionnel, Article sur l'Indépendance professionnelle, Article sur le Consentement libre et éclairé, Article sur le Respect du but assigné.",
      "Refus net et argumenté : le psychologue n'est pas un agent de sélection ou d'arbitrage de plans sociaux au service de la direction.",
      "Triangulation : rappeler la distinction entre le commanditaire (la direction qui a initié l'audit) et les usagers/bénéficiaires (les soignants qui ont témoigné sous garantie d'anonymat).",
      "Diagnostic Honneth/Dubar : déni de respect juridique (peur de l'arbitraire), mépris de l'estime sociale (soignants traités comme des variables d'ajustement), risque de bascule dans l'exclusion ou le blocage.",
      "Restitution : 1. Restitution d'abord aux salariés pour validation des constats partagés ; 2. Restitution à la direction exclusivement sur les dysfonctionnements organisationnels et les ressources de métier, sans jamais citer de noms ni de cas nominatifs.",
    ],
    planConseille: [
      "1. Analyse de la situation : La crise éthique et le piège de la commande gestionnaire.",
      "2. I — Le cadre déontologique bafoué : Les articles fondamentaux du Code de 2021 violés par la direction.",
      "3. II — La posture du psychologue du travail : Argumentation du refus et protection du secret.",
      "4. III — Analyse sociologique de la détresse des soignants : Dubar (menace sur la transaction objective) et Honneth (déni d'estime).",
      "5. IV — Protocole déontologique de restitution : Triangulation, co-construction et engagement de la direction.",
    ],
    corrige: `
<h4>Présentation de la Situation de Dilemme :</h4>
<p>À la suite du rachat et de la fusion de trois établissements médico-sociaux, la direction générale fait appel à un psychologue du travail pour animer une cellule d'écoute et réaliser un bilan des compétences et du vécu professionnel des équipes soignantes. Lors d'une réunion de cadrage intermédiaire, le DRH demande au psychologue de lui remettre les fiches nominatives et les notes d'entretiens individuels pour <i>« aider le comité de direction à identifier les salariés inaptes ou réfractaires et préparer les mobilités forcées »</i>.</p>

<h4>I. Les violations caractérisées du Code de Déontologie (Actualisation 2021)</h4>
<p>La demande de la direction heurte frontalement plusieurs principes cardinaux du Code de déontologie des psychologues :</p>
<ol>
  <li><b>Principe 1 : Respect des droits de la personne et de sa dignité :</b> Le psychologue ne peut recueillir des informations sous le sceau de l'écoute bienveillante pour les transmettre ensuite à un tiers sans le <i>consentement libre, éclairé et explicite</i> des personnes concernées.</li>
  <li><b>Principe 3 : Responsabilité et Indépendance professionnelle :</b> Le psychologue est seul responsable de ses conclusions. Il refuse toute injonction hiérarchique visant à faire de son intervention un outil de sélection ou d'arbitrage disciplinaire.</li>
  <li><b>Principe 4 : Rigueur et Respect du but assigné :</b> Les entretiens ont été présentés aux salariés comme un espace de parole sur le vécu de la fusion. Les utiliser pour établir une liste de licenciements ou de mutations punitives constitue un <i>détournement éthique frauduleux</i>.</li>
  <li><b>Principe 5 : Confidentialité et Secret professionnel :</b> Le psychologue du travail est tenu au secret professionnel. Les confidences et vécus individuels ne peuvent en aucun cas être divulgués à l'employeur.</li>
</ol>

<h4>II. Argumentaire de refus opposé à la Direction</h4>
<p>Le psychologue adresse un courrier officiel et courtois au DRH :</p>
<blockquote>
  « En application de la Loi du 25 juillet 1985 régissant le titre de psychologue et conformément aux articles cardinaux du Code de déontologie révisé en 2021, je vous informe que les notes et données individuelles recueillies au cours des entretiens sont strictement couvertes par le secret professionnel et mon indépendance technique. Les transmettre constituerait une faute déontologique et légale grave qui frapperait l'ensemble de notre mission de nullité et détruirait toute confiance au sein des équipes. Mon intervention a pour mandat exclusif d'analyser les freins organisationnels et collectifs de la fusion, et non d'établir des évaluations individuelles à visée de gestion du personnel. »
</blockquote>

<h4>III. Analyse sociologique de la détresse soignante (Dubar & Honneth)</h4>
<p>La panique et le ressentiment des soignants s'expliquent par deux mécanismes majeurs :</p>
<ul>
  <li><b>Selon Axel Honneth :</b> La fusion est vécue comme un <b>triple mépris social</b> : mépris juridique (peur de perdre leurs droits acquis et leurs horaires), mépris d'estime sociale (leur investissement auprès des patients est ignoré au profit de ratios comptables), générant angoisse et honte.</li>
  <li><b>Selon Claude Dubar :</b> La menace de mobilité forcée brise la <b>transaction objective</b>. Les soignants étaient dans une identité d'affiliation locale ; l'institution leur impose une identité virtuelle d'« agents interchangeables », les précipitant dans l'<i>identité menacée ou bloquée</i>.</li>
</ul>

<h4>IV. Protocole de restitution déontologique</h4>
<p>Pour mener la mission à son terme sans trahir les soignants ni le commanditaire, le psychologue applique une démarche triangulée :</p>
<ul>
  <li><b>Étape 1 : Restitution préalable aux professionnels :</b> Le psychologue présente d'abord ses constats synthétiques et anonymisés aux soignants lors d'une assemblée générale. Les professionnels valident ou nuancent le diagnostic : ils deviennent co-auteurs de l'analyse de leur propre travail.</li>
  <li><b>Étape 2 : Restitution organisationnelle devant la Direction :</b> Le rapport remis à la direction ne contient <b>aucun nom, aucun cas individuel</b>. Il formule une analyse systémique : charge de travail, manque d'effectifs lors des relais de nuit, logiciels inadaptés, besoin de formations partagées. Il place la direction face à ses responsabilités managériales tout en protégeant intégralement la parole des salariés.</li>
</ul>
`,
  },
];

/**
 * Format standard RedacItem [sujet, plan/criteres, corrige] pour compatibilité
 */
export const ANNALES_PST123_REDAC_ITEMS: [string, string[], string][] = ANNALES_PST123.map(
  (a) => [
    `${a.titre}${a.citation ? `\n\nCitation : ${a.citation.texte} (${a.citation.auteur})` : ""}\n\n${a.desc}`,
    [
      ...a.questions.map((q, i) => `Q${i + 1} : ${q}`),
      `--- CRITÈRES DE NOTATION EXAMEN ---`,
      ...a.criteria,
    ],
    a.corrige,
  ],
);

/**
 * Méthodologie d'examen officielle pour le module PST123
 */
export const METHODE_ANALYSE_PST123 = [
  {
    etape: "1. Analyse du sujet et choix de l'épreuve (15 min)",
    regles: [
      "Lire attentivement les deux options proposées (Option A : Dissertation théorique / Option B : Analyse de situation de travail ou texte).",
      "Identifier immédiatement les auteurs clés du cours de Mme E. Lucy convoqués par le sujet : Dubar, Bourdieu, Sainsaulieu, Honneth, Le Bianic, ou Déontologie.",
      "Repérer les tensions centrales : identité pour soi vs pour autrui, habitus vs champ, travail invisible, secret professionnel vs mandat.",
    ],
  },
  {
    etape: "2. Mobilisation des grilles conceptuelles fondamentales (20 min)",
    regles: [
      "Pour Dubar : poser la matrice biographique / relationnelle et identifier la forme identitaire (promotion, blocage, conversion, exclusion).",
      "Pour Bourdieu : mobiliser la formule [(Dispositions + Capital) x Champ = Habitus], détailler les 4 capitaux et l'illusio.",
      "Pour Sainsaulieu : situer le modèle relationnel (Retrait, Fusion, Négociation, Affinité) et les 4 critères d'accès au pouvoir.",
      "Pour Honneth : structurer autour des 3 sphères (amour, droit, solidarité/estime) et des formes de mépris correspondantes.",
      "Pour la Déontologie : citer la Loi de 1985 et les principes cardinaux du Code de déontologie (actualisé en 2021).",
    ],
  },
  {
    etape: "3. Rédaction équilibrée et académique (1h15)",
    regles: [
      "Introduction complète : accroche d'actualité, définition rigoureuse des termes du sujet, problématique articulée, annonce du plan.",
      "Développement en 2 ou 3 parties avec transitions soignées : confronter systématiquement la théorie sociologique à la réalité du terrain.",
      "Dans l'analyse de situation (cas clinique) : toujours formuler un diagnostic sociologique étayé AVANT de proposer des préconisations d'intervention du psychologue.",
      "Garantir la posture déontologique : ne jamais proposer de solutions magiques managériales ; toujours expliciter le cadre du consentement et de l'indépendance.",
    ],
  },
  {
    etape: "4. Conclusion synthétique & ouverture (10 min)",
    regles: [
      "Répondre clairement à la problématique posée en introduction.",
      "Ouvrir sur les défis contemporains du travail : précarisation, impact de l'intelligence artificielle sur l'identité, ou reconnaissance des métiers du care.",
    ],
  },
];

/**
 * Grille d'auto-évaluation spécifique pour l'examen PST123
 */
export const CRITERES_EVALUATION_PST123 = [
  "J'ai contextualisé l'auteur, l'ouvrage et l'année de référence (Dubar 1991, Bourdieu 1996, Sainsaulieu 1977, Honneth 1992, Loi 1985).",
  "J'ai distingué avec rigueur l'identité pour soi (processus biographique) et l'identité pour autrui (processus relationnel).",
  "J'ai mobilisé l'algorithme de Bourdieu et précisé les 4 formes de capitaux (notamment les 3 états du capital culturel).",
  "J'ai caractérisé les modèles relationnels de Sainsaulieu à l'aide des 4 critères d'accès au pouvoir.",
  "J'ai analysé les 3 sphères d'Axel Honneth et illustré le travail invisible / care (Élisabeth Lucy).",
  "J'ai cité les principes fondamentaux du Code de déontologie des psychologues (Loi de 1985 / actualisation 2021).",
  "J'ai articulé la commande institutionnelle et la demande clinique réelle (triangulation de l'intervention).",
  "Mon écriture est fluide, structurée en parties distinctes et sans jargon non explicité.",
];
