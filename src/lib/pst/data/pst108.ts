/**
 * Bases de données pour le module PST108 — Psychologie du langage et clinique du dialogue.
 * Alignement 100% sur le programme et les documents de cours de M. Éric LUCY et M. Francis VALLS.
 * Cnam Nouvelle-Aquitaine.
 */

export const A = {
  vygotski_piaget: "Lev Vygotski & Jean Piaget · Psychologie du langage & Développement",
  bourdieu: "Pierre Bourdieu · Pouvoir & Marché linguistique",
  habermas: "Jürgen Habermas · Agir communicationnel",
  honneth: "Axel Honneth · Reconnaissance & Mépris",
  valls_iod: "Francis Valls & Denis Castra · Méthode IOD",
  linguistique: "Pragmatique, Langage & Travail (Boutet & Fraenkel)",
};

export const FICHES = [
  {
    a: "linguistique",
    q: "Quels sont les 5 niveaux d'analyse de la langue et comment le Réseau Langage et Travail (Boutet & Fraenkel, 1986) démontre-t-il la dimension multimodale et située du travail ?",
    t: "Séance 1A : Épistémologie du Cnam & Réseau Langage et Travail (Boutet & Fraenkel)",
    ess: "<h5>Le travail devenu communicationnel</h5><p>Dès les années 1950, la psychologie du travail met en évidence que le travail devient intrinsèquement <b>communicationnel</b> sous l'effet de l'évolution des techniques et de l'organisation. Loin d'être un simple outil d'exécution, les activités communicationnelles conditionnent l'efficacité et peuvent engendrer des pathologies : <b>surcharge informationnelle</b>, brouillage vie pro/privée, ou troubles induits par la <b>prescription rigide de comportements communicationnels</b> (ex. centres d'appels).</p><h5>Dimension multimodale et située</h5><p>Le langage ne se réduit pas à l'oralité : il est <b>multimodal</b> (oral, écrit, gestuel, usage de l'espace et des objets) et fondamentalement <b>situé</b> (on ne communique pas de la même manière dans une start-up que dans une préfecture). Fondé en 1986 (avec le CNRS) sous l'impulsion de <b>Josiane Boutet, Béatrice Fraenkel, Jacques Girin et Bernard Gardin</b>, le réseau <i>Langage et Travail</i> formalise cette intrication indissociable entre pratiques langagières et activité réelle.</p><h5>Les 5 niveaux d'analyse de la langue (CNRTL)</h5><p>Alors que le <i>langage</i> est une faculté humaine universelle, la <i>langue</i> est un système d'expression conventionnel analysé selon 5 niveaux : <b>phonétique/phonologie</b> (sons), <b>morphologie</b> (morphèmes/unités de sens), <b>syntaxe</b> (combinaison en phrases), <b>sémantique</b> (sens des énoncés) et <b>pragmatique</b> (usage social en contexte).</p>",
    ph: "Le langage au travail est toujours multimodal et situé : le travail moderne est devenu intrinsèquement communicationnel (Réseau Langage et Travail, 1986).",
    ex: "Dans un centre d'appels, imposer un script rigide de phrases minutées nie la dimension située du langage et produit une souffrance éthique chez les téléopérateurs.",
    trap: "Croire que le langage au travail est un simple transfert d'informations neutre, ou confondre le langage (faculté humaine) et la langue (système conventionnel structuré).",
  },
  {
    a: "vygotski_piaget",
    q: "En quoi consiste le principe d'intervention « transformer pour comprendre » au Cnam et comment la coopération conflictuelle (Yves Clot) régule-t-elle le métier ?",
    t: "Séance 1B : La Posture Clinique au Cnam — « Transformer pour comprendre » & Coopération conflictuelle (Clot)",
    ess: "<h5>Principe fondateur : « Transformer pour comprendre »</h5><p>Au Cnam, le psychologue du travail n'intervient pas avec une posture positiviste armée de grilles de diagnostic préétablies prétendant tout savoir à l'avance. Il déploie un <b>dispositif d'intervention clinique</b> qui transforme la situation de travail. C'est <i>dans et par</i> cette transformation dialogique que se co-construit la compréhension de l'activité avec les opérateurs.</p><h5>Coopération conflictuelle et dispute professionnelle</h5><p>Dans <i>Le travail à cœur</i>, Yves Clot montre que le dialogue — avec soi-même, avec les pairs et avec le métier — permet d'instituer une <b>coopération conflictuelle</b>. Loin de fuir le désaccord, le dispositif clinique organise la <b>dispute professionnelle</b> et la controverse sur les critères de la qualité du travail, transformant les contradictions vécues en leviers d'action et de développement.</p><h5>Les 3 courants en psychologie du travail au Cnam</h5><p>1. <b>Clinique de l'activité (Yves Clot)</b> : centrée sur l'analyse de l'activité réelle de l'opérateur et le développement du pouvoir d'agir (ne prend pas l'inconscient freudien comme objet direct, rejet de l'image de la « boîte noire »).<br/>2. <b>Psychodynamique du travail (Christophe Dejours)</b> : analyse du plaisir, de la souffrance et des stratégies défensives en santé mentale.<br/>3. <b>Psychosociologie clinique du travail</b> : articulation de l'activité et du sujet sensible au sens psychanalytique.</p>",
    ph: "Au Cnam, on ne transforme pas après avoir compris : on transforme pour comprendre grâce à la dispute professionnelle et la coopération conflictuelle (Yves Clot).",
    ex: "Mettre en place une autoconfrontation croisée : le dispositif transforme le regard des pairs sur leurs gestes et libère la dispute professionnelle sur les critères de qualité du métier.",
    trap: "Utiliser l'expression béhavioriste de 'boîte noire' pour qualifier la Clinique de l'activité : Clot explore le réel de l'activité et l'activité contrariée, non un schéma stimulus-réponse.",
  },
  {
    a: "vygotski_piaget",
    q: "Selon Bernard Golse, comment le langage précède-t-il le bébé et quelles sont les 4 fonctions fondamentales de la pensée dans le développement précoce ?",
    t: "Séance 1C : Éclairage Psychanalytique & Développement Précoce (Bernard Golse)",
    ess: "<h5>Néoconstructivisme : le langage précède le sujet</h5><p>S'appuyant sur les travaux du pédopsychiatre <b>Bernard Golse</b>, l'approche clinique montre que le langage et la pensée <b>précèdent le bébé</b>. Le nouveau-né arrive dans un univers symbolique et discursif déjà structuré par les adultes. L'enfant ne l'absorbe pas passivement : il le co-reconstruit à l'intersection de l'endogène (biologique) et de l'exogène (interpersonnel). L'intrapsychique de l'adulte organise l'interpersonnel qui structure l'intrapsychique de l'enfant.</p><h5>Les 4 fonctions de la pensée selon Golse</h5><p>1. <b>Pare-excitation</b> : face au flux d'excitations internes/externes, le parent offre une contenance (<i>holding</i> de Winnicott) et prête un <i>appareil à penser les pensées</i> (concept clé de Wilfred R. Bion).<br/>2. <b>Réparation symbolique</b> : symboliser l'absence pour surmonter la perte. Illustré par Sigmund Freud (1920) observant son petit-fils Ernst (18 mois) au <b>jeu de la bobine (Fort / Da)</b> pour maîtriser l'absence maternelle.<br/>3. <b>Fonction narcissique</b> : assurer le sentiment de continuité d'exister.<br/>4. <b>Accès à la tiercéité</b> : passage de l'enveloppe monadique (fusion mère-enfant) à l'enveloppe triadique (tiers paternel), ouvrant à l'intersubjectivité et la reconnaissance d'autrui comme alter ego distinct.</p>",
    ph: "Le langage et la pensée précèdent le sujet : l'adulte prête son appareil psychique au bébé pour lui permettre d'accéder à la symbolisation et à la tiercéité (Golse, Freud, Bion).",
    ex: "Le jeu du Fort/Da : en jetant et ramenant sa bobine au cri de 'o-o-o' (fort) et 'da', l'enfant transforme la disparition subie de la mère en jeu actif maîtrisé par le langage.",
    trap: "Attribuer le concept d'« appareil à penser » à Freud ou Golse : il a été forgé par Wilfred R. Bion (1962).",
  },
  {
    a: "vygotski_piaget",
    q: "Quelle est la conception de Jean Piaget sur le rapport entre pensée et langage, l'équilibration, et le statut du langage égocentrique ?",
    t: "Séance 1D : Le Développement Cognitif selon Jean Piaget — Structuralisme & Langage Reflet",
    ess: "<h5>Le structuralisme génétique piagétien</h5><p>Pour Jean Piaget, biologiste de formation, le développement de l'intelligence est un processus évolutif d'accroissement des connaissances qui procède par <b>stades successifs</b> : des coordinations sensori-motrices de la petite enfance jusqu'à la pensée logique formelle et déductive (« pensée scientifique »).</p><h5>Dynamique fonctionnelle : Assimilation, Accommodation & Équilibration</h5><p>L'adaptation cognitive repose sur deux mécanismes complémentaires :<br/>• <b>Assimilation</b> : action du sujet sur les objets et intégration des données du milieu aux schèmes existants.<br/>• <b>Accommodation</b> : modification des schèmes du sujet sous la contrainte des résistances du milieu.<br/>• <b>Équilibration</b> : autorégulation continue ajustant assimilation et accommodation.</p><h5>Les 4 facteurs de développement & Rejet de l'innéisme</h5><p>Chez Piaget, le développement nécessite : 1. Maturation organique et nerveuse ; 2. Expérience physique sur les objets ; 3. Transmissions et interactions sociales ; 4. Équilibration. Piaget rejette fermement l'innéisme (débat historique avec Chomsky à Royaumont en 1975).</p><h5>Conception du langage : reflet subordonné de la pensée</h5><p>Pour Piaget, <b>la pensée précède le langage</b>. Le langage n'est que le reflet symbolique de la pensée. Initialement égocentrique (témoin de l'asocialité et du centrage cognitif du jeune enfant), ce langage égocentrique est voué à <b>disparaître</b> avec la décentration cognitive au profit du langage socialisé.</p>",
    ph: "Pour Piaget, la pensée précède le langage : le langage égocentrique est le reflet d'une pensée non décentrée, voué à disparaître avec la socialisation.",
    ex: "L'enfant de 4 ans qui joue seul dans sa chambre en monologuant : pour Piaget, il s'agit d'un langage égocentrique asocial sans fonction communicative, appelé à s'éteindre.",
    trap: "Croire que Piaget est innéiste : il défend un constructivisme interactionniste où l'enfant agit d'abord sur l'environnement physique.",
  },
  {
    a: "vygotski_piaget",
    q: "Quelle est la loi générale du développement culturel selon Vygotski et comment le langage égocentrique s'intériorise-t-il en pensée verbale silencieuse ?",
    t: "Séance 1E : La Théorie Historico-Culturelle de Lev Vygotski — Primat du Social & Langage Intérieur",
    ess: "<h5>Lev Vygotski (1896-1934) et Pensée et Langage</h5><p>Penseur marxiste soviétique prolifique mort prématurément de la tuberculose à 37 ans, Vygotski dicte le dernier chapitre de son chef-d'œuvre <i>Pensée et langage</i> sur son lit de mort (traduit en français en 1985 par Françoise Sève, préfacé par Yves Clot en 1997). Il fonde l'étude des <b>fonctions psychiques supérieures</b> (attention volontaire, mémoire logique, pensée verbale).</p><h5>Loi générale du développement culturel (Primat du social)</h5><p><i>« Toute fonction dans le développement culturel de l'enfant apparaît deux fois, sur deux plans : d'abord au niveau social (interpsychologique), puis au niveau individuel (intrapsychologique). »</i> Le développement ne part pas de l'individu isolé vers la société, mais va <b>systématiquement de l'extérieur vers l'intérieur</b>.</p><h5>L'instrument psychologique et l'expérience des crayons</h5><p>Le langage est l'<b>instrument psychologique privilégié</b> car il régule l'action. Dans l'expérience princeps de Vygotski, face à une difficulté (crayon bleu manquant pour dessiner), l'enfant verbalise à haute voix : <i>« Il me faut un bleu... pas grave, je prends du rouge et je mouille avec de l'eau »</i>. Ce langage égocentrique n'est pas un commentaire asocial : c'est un véritable <b>outil de raisonnement et de planification</b>.</p><h5>La trajectoire vygotskienne : vers le langage intérieur</h5><p>Contrairement à Piaget, la trajectoire chez Vygotski est :<br/><b>Langage social (d'emblée communicationnel) ➔ Langage égocentrique (outil de pensée pour soi) ➔ Langage intérieur (pensée verbale silencieuse intériorisée)</b>.<br/>Le langage égocentrique ne disparaît jamais : il s'intériorise pour former notre pensée adulte !</p>",
    ph: "Chez Vygotski, toute fonction apparaît deux fois : d'abord sociale (interpsychologique) puis intériorisée (intrapsychologique). Le langage égocentrique devient le langage intérieur.",
    ex: "L'adulte au travail qui se parle à lui-même à voix basse face à un problème informatique complexe réactive la fonction régulatrice du langage égocentrique démontrée par Vygotski.",
    trap: "Affirmer que le langage égocentrique disparaît chez Vygotski : il ne s'éteint pas, il perd son enveloppe sonore pour devenir le langage intérieur silencieux.",
  },
  {
    a: "vygotski_piaget",
    q: "Quelles sont les 5 divergences doctrinales majeures entre Jean Piaget et Lev Vygotski (interaction, moteur, pensée/langage, trajectoire, statut de l'égocentrique) ?",
    t: "Séance 1F : Synthèse Comparative : Jean Piaget vs Lev Vygotski & Pièges d'Examen",
    ess: "<h5>Tableau d'analyse comparative en 5 axes fondamentaux</h5><table class='w-full text-xs border-collapse my-2'><thead><tr class='border-b border-slate-300 dark:border-slate-700 font-bold text-left'><th class='p-1'>Axe d'analyse</th><th class='p-1'>Jean Piaget (Constructivisme)</th><th class='p-1'>Lev Vygotski (Historico-culturel)</th></tr></thead><tbody><tr class='border-b border-slate-200 dark:border-slate-800'><td class='p-1 font-semibold'>1. Type d'interaction</td><td class='p-1'>Sujet ↔ Environnement physique</td><td class='p-1'>Sujet ↔ Environnement social/culturel</td></tr><tr class='border-b border-slate-200 dark:border-slate-800'><td class='p-1 font-semibold'>2. Moteur du dev.</td><td class='p-1'>Équilibration endogène (action du sujet)</td><td class='p-1'>Médiation sociale asymétrique (adulte/pair)</td></tr><tr class='border-b border-slate-200 dark:border-slate-800'><td class='p-1 font-semibold'>3. Rapport Pensée/Langage</td><td class='p-1'>La pensée précède le langage (reflet)</td><td class='p-1'>Le langage est l'instrument de la pensée</td></tr><tr class='border-b border-slate-200 dark:border-slate-800'><td class='p-1 font-semibold'>4. Trajectoire du langage</td><td class='p-1'>Égocentrique ➔ Socialisé</td><td class='p-1'>Social ➔ Égocentrique ➔ Intérieur</td></tr><tr><td class='p-1 font-semibold'>5. Statut égocentrique</td><td class='p-1'>Marque d'asocialité, voué à disparaître</td><td class='p-1'>Instrument de raisonnement qui s'intériorise</td></tr></tbody></table><h5>Points de vigilance et rectifications pour l'écrit (Mme Marot)</h5><p>• <b>Wilfred Bion (1962)</b> a forgé la notion de « prêt d'un appareil à penser les pensées » (et non Freud ou Golse).<br/>• <b>Réseau Langage et Travail</b> fondé en 1986 (non 1997) par Boutet, Fraenkel, Girin et Gardin.<br/>• <b>Rejet de l'innéisme</b> chez Piaget (débat de Royaumont 1975 avec Chomsky) : parler des 4 facteurs du constructivisme.<br/>• <b>Clinique de l'activité</b> : ne pas employer « boîte noire » pour l'inconscient, mais analyser le conflit entre activité réalisée et réel de l'activité.</p>",
    ph: "Piaget : pensée ➔ langage (reflet, disparition de l'égocentrique). Vygotski : social ➔ égocentrique ➔ langage intérieur (instrument de la pensée). Question d'examen classique !",
    ex: "Question d'examen Cnam : 'Comparez le statut du langage égocentrique chez Piaget et Vygotski'. Il faut restituer l'expérience des crayons et le passage de l'inter vers l'intrapsychologique.",
    trap: "Opposer Piaget et Vygotski comme 'structuraliste' vs 'interactionniste' : les deux sont interactionnistes, mais Piaget privilégie l'objet physique et Vygotski la médiation sociale humaine.",
  },
  {
    a: "linguistique",
    q: "Pourquoi le modèle télégraphique de la communication (Shannon & Weaver) est-il insuffisant pour penser le langage au travail comme fait social total ?",
    t: "Séance 1 : Au-delà du modèle télégraphique — Le langage comme fait social total",
    ess: "<h5>La rupture avec Shannon & Weaver</h5><p>Le modèle télégraphique (émetteur ➔ canal ➔ récepteur) réduit la communication à un transport mécanique d'informations. Cette vision cybernétique masque la nature profondément <b>sociale, politique et asymétrique</b> des échanges humains.</p><h5>La parole comme rapport social</h5><p>Dans les organisations, parler n'est jamais un acte neutre. Le langage est le lieu où se nouent la <b>reconnaissance mutuelle</b>, les <b>rapports de force</b>, l'exercice de l'autorité et la construction des identités professionnelles.</p>",
    ph: "La communication n'est pas un transport neutre d'informations : c'est un rapport social asymétrique et un enjeu de reconnaissance.",
    ex: "Dans une réunion d'équipe, le silence d'un agent n'est pas un 'défaut de bande passante', mais le symptôme d'un rapport de domination qui censure sa parole.",
    trap: "Réduire les dysfonctionnements d'une équipe à 'des problèmes de communication' techniques au lieu d'analyser les rapports de pouvoir et le déni de reconnaissance.",
  },
  {
    a: "bourdieu",
    q: "Comment Pierre Bourdieu conceptualise-t-il le marché linguistique, l'habitus linguistique et le capital symbolique dans Ce que parler veut dire ?",
    t: "Séance 2 : Pierre Bourdieu — L'économie des échanges linguistiques & le marché linguistique",
    ess: "<h5>Le marché linguistique</h5><p>Dans <i>Ce que parler veut dire</i> (1982), Pierre Bourdieu rompt avec l'illusion saussurienne d'une langue trésor commun neutre. Les situations de communication fonctionnent comme des <b>marchés linguistiques</b> où les locuteurs engagent leur <b>capital linguistique</b>.</p><h5>Profit de distinction & censure préalable</h5><p>Les manières de parler (accent, syntaxe, lexique) sont hiérarchisées. La langue dominante et formelle tire un <b>profit de distinction</b> symbolique, contraignant les dominés à l'autocensure ou à l'hypercorrection anxieuse.</p>",
    ph: "La compétence linguistique n'est pas seulement le pouvoir de parler, mais le pouvoir socialement reconnu de parler avec autorité (Bourdieu).",
    ex: "Un ouvrier ou un jeune en insertion qui perd tous ses moyens face au langage administratif sophistiqué d'un recruteur, intériorisant son illégitimité sociale.",
    trap: "Croire que la maîtrise du vocabulaire est une compétence individuelle universelle indépendante du capital culturel familial.",
  },
  {
    a: "bourdieu",
    q: "Quelle est la critique centrale adressée par Bourdieu à Austin quant aux conditions sociales de l'efficacité performative (« quand dire, c'est faire ») ?",
    t: "Séance 3 : Pierre Bourdieu — La critique d'Austin : les conditions sociales de la performativité",
    ess: "<h5>L'illusion internaliste d'Austin</h5><p>John Austin a révélé que « dire, c'est faire » (énoncés performatifs). Mais Bourdieu critique l'illusion internaliste des linguistes qui croient que le pouvoir magique de transformer le réel réside <b>dans les mots eux-mêmes</b>.</p><h5>« Status est magistratus »</h5><p>Une parole n'a d'efficacité performative que si celui qui la prononce possède l'<b>autorité statutaire et institutionnelle</b> requise. Ce n'est pas l'acte de langage qui fait l'autorité, c'est l'institution incarnée dans le locuteur (*Status est magistratus*).</p>",
    ph: "Le pouvoir des mots ne vient pas des mots mais des institutions qui autorisent le locuteur à les prononcer.",
    ex: "Le médecin qui dit « je vous déclare apte » transforme légalement la vie du salarié, non par la magie de sa phrase, mais par la délégation de l'Ordre des médecins et du Code du travail.",
    trap: "Expliquer l'autorité d'un discours par son style ou son charisme rhétorique, en oubliant l'autorité déléguée par l'institution.",
  },
  {
    a: "bourdieu",
    q: "Qu'est-ce que l'acte d'institution, la délégation du porte-parole et le rituel monarchique du « lit de justice » analysé par Bourdieu et Sarah Hanley ?",
    t: "Séance 4 : Pierre Bourdieu — L'acte d'institution, la délégation et le rituel du « lit de justice » (Sarah Hanley)",
    ess: "<h5>Le porte-parole autorisé & l'acte d'institution</h5><p>L'acte d'institution sépare, nomme et consacre. Le porte-parole officiel parle « au nom de » la collectivité : il bénéficie d'une <b>délégation de pouvoir</b> qui lui permet d'imposer un ordre symbolique incontestable.</p><h5>Le rituel du « Lit de justice » (Sarah Hanley)</h5><p>Mobilisé par Bourdieu à partir des travaux de l'historienne Sarah Hanley, le <i>lit de justice</i> des rois de France représente le paroxysme de la parole royale : en sa présence physique et statutaire, la délibération du Parlement s'éteint et la volonté du souverain s'impose sans réplique.</p>",
    ph: "Le lit de justice incarne le pouvoir royal absolu : la parole instituée suspend instantanément toute délibération démocratique.",
    ex: "Lors d'une assemblée générale, l'arrivée inopinée du PDG qui coupe court aux débats en annonçant la décision finale du Conseil d'administration réactive la logique du lit de justice.",
    trap: "Considérer le rituel comme un simple folklore décoratif : c'est l'armature même de l'efficacité symbolique et de l'obéissance.",
  },
  {
    a: "bourdieu",
    q: "Selon les travaux d'Éric Lucy (Empan, 2021), quelles sont les conditions sociales et institutionnelles qui confèrent à l'insulte son efficacité performative blessante au travail ?",
    t: "Séance 5 : Éric Lucy — Les conditions sociales de l'efficacité performative de l'insulte (Empan, 2021)",
    ess: "<h5>L'insulte comme acte de langage et violence symbolique</h5><p>Dans son article de recherche (revue <i>Empan</i>, 2021), Éric Lucy étudie les conditions d'efficacité performative de l'insulte en travail social et dans les interactions professionnelles.</p><h5>L'ancrage dans les rapports de domination</h5><p>L'insulte ne blesse pas par son intensité acoustique mais parce qu'elle mobilise, condense et réactive des <b>catégorisations sociales dévalorisantes et des stigmates</b> déjà constitués dans le champ social (classe, genre, statut d'assisté). Elle nie le statut d'interlocuteur légitime.</p>",
    ph: "L'insulte tire son venin des rapports de domination préexistants : elle assigne le sujet à une place disqualifiée (Éric Lucy).",
    ex: "Traiter un usager d'« assisté » ou un travailleur précaire de « bon à rien » : l'insulte fonctionne parce que le stigmate est déjà institué dans les représentations collectives.",
    trap: "Psychologiser l'insulte comme un simple 'dérapage émotionnel' au lieu d'y voir l'actualisation d'une domination symbolique.",
  },
  {
    a: "habermas",
    q: "Quelle est la distinction fondamentale établie par Jürgen Habermas entre l'Agir stratégique et l'Agir communicationnel ?",
    t: "Séance 6 : Jürgen Habermas — L'Agir stratégique vs L'Agir communicationnel",
    ess: "<h5>La grande distinction de la Théorie de l'agir communicationnel (1981)</h5><p>Jürgen Habermas (École de Francfort, 2e génération) oppose deux modes fondamentaux de coordination de l'action sociale :</p><h5>1. L'Agir stratégique / instrumental</h5><p>Orienté vers le <b>succès</b> (*Erfolg*), l'efficacité technique, la manipulation ou le calcul des conséquences. Autrui y est traité comme un moyen, un obstacle ou un levier d'action.</p><h5>2. L'Agir communicationnel</h5><p>Orienté vers <b>l'entente et l'intercompréhension</b> (*Verständigung*). Les sujets coordonnent leurs actions par un accord rationnellement motivé, en cherchant à s'accorder sur des raisons valides.</p>",
    ph: "L'agir stratégique instrumentalise autrui vers le succès ; l'agir communicationnel vise l'entente libre et partagée (Habermas).",
    ex: "Agir stratégique : un DRH manipule l'ordre du jour pour diviser les syndicats. Agir communicationnel : les équipes débattent pour convenir d'une règle équitable d'organisation du service.",
    trap: "Confondre discussion de façade (stratégique) et discussion orientée vers une véritable entente collective (communicationnelle).",
  },
  {
    a: "habermas",
    q: "Quelles sont les 4 prétentions universelles à la validité (Geltungsansprüche) selon Habermas et comment sont-elles mises en débat ?",
    t: "Séance 7 : Jürgen Habermas — Les 4 prétentions universelles à la validité (Geltungsansprüche)",
    ess: "<h5>La grammaire universelle de l'entente</h5><p>Pour qu'un acte de communication vise l'entente, le locuteur émet simultanément <b>4 prétentions à la validité</b> que l'interlocuteur peut accepter ou contester rationnellement :</p><h5>Les 4 prétentions fondamentales :</h5><p>1. <b>L'intelligibilité</b> : l'énoncé respecte les règles linguistiques et a un sens compréhensible.<br/>2. <b>La vérité propositionnelle</b> : ce qui est affirmé correspond aux faits dans le monde objectif.<br/>3. <b>La justesse normative</b> : l'action est légitime et conforme aux valeurs du monde social.<br/>4. <b>La sincérité / véracité</b> : le locuteur exprime authentiquement son vécu du monde subjectif sans duplicité.</p>",
    ph: "Tout dialogue orienté vers l'entente engage 4 prétentions : intelligibilité, vérité, justesse et sincérité.",
    ex: "« Vous devez travailler ce samedi pour sauver l'usine » : on peut contester la vérité (le carnet de commandes est-il vraiment plein ?), la justesse (est-ce légal ?) ou la sincérité (n'est-ce pas pour verser des dividendes ?).",
    trap: "Réduire la validité d'une parole à sa seule exactitude factuelle en ignorant la justesse normative et la sincérité.",
  },
  {
    a: "habermas",
    q: "Quels sont les principes constitutifs de l'Éthique de la discussion (Diskursethik) et de la situation idéale de parole selon Jürgen Habermas ?",
    t: "Séance 8 : Jürgen Habermas — L'Éthique de la discussion (Diskursethik) & la situation idéale de parole",
    ess: "<h5>Le Principe D & le Principe U</h5><p>Pour fonder la légitimité des normes morales et professionnelles, Habermas pose le <b>Principe D</b> : seules sont valides les normes susceptibles de recevoir l'assentiment de tous les concernés en tant que participants à une discussion pratique rationnelle.</p><h5>La Situation Idéale de Parole (*ideale Sprechsituation*)</h5><p>Idéal régulateur indispensable : un espace où la communication est affranchie des pressions hiérarchiques et des ruses stratégiques. Seule doit s'exercer la <b>« force sans violence du meilleur argument »</b>.</p>",
    ph: "Dans la situation idéale de parole, aucune autorité ne prévaut hormis la force sans contrainte du meilleur argument.",
    ex: "Un groupe de travail soignants-médecins où l'argument d'une aide-soignante est retenu contre celui du chef de service car il s'avère le plus pertinent pour la dignité des patients.",
    trap: "Croire que la situation idéale de parole existe déjà partout : c'est un idéal régulateur vers lequel il faut tendre pour évaluer les biais de pouvoir.",
  },
  {
    a: "habermas",
    q: "Comment la compétence délibérative et les espaces de discussion régulés permettent-ils de transformer le travail et de contrer le mépris managérial ?",
    t: "Séance 9 : Habermas en organisation — Compétence délibérative et dialogue (Duchamp & Koëhl, Calori)",
    ess: "<h5>La compétence délibérative managériale</h5><p>Dans l'article ressource de Duchamp & Koëhl (<i>Revue internationale de psychosociologie</i>, 2008) et les travaux de Roland Calori, l'éthique de la discussion est mobilisée au service de la performance organisationnelle durable.</p><h5>Sortir du silence et du cynisme</h5><p>Le management autoritaire instrumentalise la parole et produit du cynisme ou du retrait. L'intégration de la <b>compétence délibérative</b> restaure les espaces où les salariés peuvent soumettre la prescription au crible de la discussion démocratique et de la rationalité communicationnelle.</p>",
    ph: "La délibération habermassienne transforme l'injonction descendante en régulation légitime et concertée du travail.",
    ex: "Remplacer les réunions d'injonctions descendantes par des cercles de délibération où les agents peuvent questionner la faisabilité et la légitimité des objectifs.",
    trap: "Considérer la délibération comme une 'perte de temps' : c'est la seule garantie d'une adhésion solide et d'une santé mentale préservée.",
  },
  {
    a: "honneth",
    q: "Quelles sont les 3 sphères morales de la reconnaissance selon Axel Honneth (amour, droit, estime sociale) et les formes de mépris correspondantes ?",
    t: "Séance 10 : Axel Honneth — La lutte pour la reconnaissance : les 3 sphères morales (1992)",
    ess: "<h5>L'École de Francfort réinvestie</h5><p>Axel Honneth (3e génération) prolonge Habermas mais montre que le moteur du lien social et des conflits n'est pas seulement l'entente rationnelle, mais la <b>lutte pour la reconnaissance morale</b>.</p><h5>Les 3 sphères d'inter-reconnaissance :</h5><p>1. <b>Sphère intime (Amour/amitié)</b> ➔ Fonde la <b>confiance en soi</b> (*Selbstvertrauen*). Mépris : violence physique, maltraitance.<br/>2. <b>Sphère juridique (Droit/citoyenneté)</b> ➔ Fonde le <b>respect de soi</b> (*Selbstachtung*). Mépris : déni de droits, précarité statutaire, discrimination.<br/>3. <b>Sphère sociale (Solidarité/travail)</b> ➔ Fonde l'<b>estime de soi</b> (*Selbstschätzung*). Mépris : dévalorisation culturelle, invisibilité du métier, humiliation professionnelle.</p>",
    ph: "Sans reconnaissance intersubjective dans l'amour, le droit et le travail, le sujet ne peut développer un rapport positif à soi-même.",
    ex: "Un salarié dont le contrat est précaire (atteinte au droit) et dont les compétences ne sont jamais valorisées (atteinte à l'estime) voit son équilibre identitaire vaciller.",
    trap: "Confondre l'amour (sphère 1), le droit (sphère 2) et l'estime sociale au travail (sphère 3).",
  },
  {
    a: "honneth",
    q: "Comment Axel Honneth redéfinit-il la réification comme un « oubli de la reconnaissance » préalable dans les rapports sociaux de travail ?",
    t: "Séance 11 : Axel Honneth — La réification comme oubli de la reconnaissance (2007)",
    ess: "<h5>La réification redéfinie</h5><p>Dans <i>La Réification</i> (2007), Honneth reprend le concept de Georg Lukács mais lui donne un sens moral et communicatif inédit. La réification n'est pas une simple réification marchande des objets, c'est un <b>« oubli de la reconnaissance »</b>.</p><h5>L'antériorité de la reconnaissance sur la cognition</h5><p>Avant même de connaître, d'évaluer ou d'utiliser autrui (dimension cognitive et instrumentale), nous devons l'avoir reconnu comme un alter ego digne de considération. L'organisation qui traite le salarié comme une pure ressource chiffrée commet une faute morale de réification.</p>",
    ph: "La réification organisationnelle est un oubli de la reconnaissance originaire d'autrui comme sujet (Honneth).",
    ex: "Parler des travailleurs en termes d'« ETP » (Équivalents Temps Plein) ou de « variables d'ajustement » financières : la personne est occultée derrière la métrique comptable.",
    trap: "Croire que la réification est inévitable dans toute gestion technique : elle survient dès que la reconnaissance humaine est suspendue.",
  },
  {
    a: "honneth",
    q: "Comment Éric Lucy (Le Sociographe, 2020) analyse-t-il la quête de reconnaissance et la régulation par la délibération au SAMU Social ?",
    t: "Séance 12 : Éric Lucy — Discussion et reconnaissance en SAMU Social (Le Sociographe, 2020)",
    ess: "<h5>L'intervention auprès des personnes en grande désaffiliation</h5><p>Dans son article de terrain (<i>Le Sociographe</i>, 2020), Éric Lucy analyse la pratique langagière des professionnels du SAMU social auprès de personnes sans domicile en rupture totale de liens.</p><h5>La parole comme réinstitution morale</h5><p>La discussion en maraude n'a pas pour but premier de collecter des informations administratives. C'est une interaction où la parole partagée réinstitue le sujet dans la <b>sphère de la reconnaissance</b>, lui restituant la dignité d'exister face à l'invisibilité urbaine et au mépris social.</p>",
    ph: "Dans la grande précarité, la parole partagée en maraude réinstitue le sujet dans l'espace de la reconnaissance morale (Éric Lucy).",
    ex: "S'asseoir au niveau d'une personne à la rue et lui parler de son prénom et de sa journée avant toute démarche administrative : la parole répare l'estime de soi.",
    trap: "Réduire le travail social en SAMU social à un simple dispatching d'hébergement d'urgence sans valeur communicationnelle.",
  },
  {
    a: "valls_iod",
    q: "En quoi la Méthode IOD (Francis Valls & Denis Castra) rompt-elle avec l'idéologie normative de l'employabilité et le tri sélectif des candidats ?",
    t: "Séance 13 : Francis Valls & Denis Castra — La Méthode IOD : rupture avec l'employabilité normative",
    ess: "<h5>La critique du ciblage déficitaire</h5><p>Créée par Francis Valls et Denis Castra (associations ACRIP et TRANSFER à Bordeaux), la méthode <b>IOD (*Intervention sur les Offres et les Demandes*)</b>, préfacée par Robert Castel (*L'insertion malgré tout*, 2007), prend le contre-pied radical des politiques d'insertion classiques.</p><h5>Refuser l'adaptation infinie des exclus</h5><p>L'insertion classique enferme les demandeurs d'emploi dans des bilans, des stages et des remises à niveau permanents, présupposant qu'ils sont « déficitaires ». Cette sur-préparation stigmatise les publics précaires et détruit leur estime de soi. IOD affirme au contraire que <b>toute personne est prête à l'emploi</b>.</p>",
    ph: "L'insertion ne consiste pas à adapter sans fin l'exclu, mais à agir directement sur l'environnement de l'entreprise (Valls & Castra).",
    ex: "Plutôt que d'obliger un chômeur de longue durée à refaire un atelier CV pour la 5e fois, le conseiller IOD démarche une entreprise locale et négocie un poste adapté.",
    trap: "Penser qu'il faut 'réparer' les compétences psychologiques ou techniques d'un candidat avant de lui permettre de rencontrer un employeur.",
  },
  {
    a: "valls_iod",
    q: "Comment se déroule concrètement la négociation sur l'offre d'emploi et la médiation auprès de l'entreprise dans la posture d'intervention IOD (Francis Valls) ?",
    t: "Séance 14 : Francis Valls — Négociation sur l'offre d'emploi et médiation en entreprise",
    ess: "<h5>L'intervention sur l'offre et l'entreprise</h5><p>Au lieu de travailler sur la demande (le chômeur), le psychosociologue IOD intervient sur les <b>offres d'emploi et les représentations des recruteurs</b>. Il négocie les conditions réelles d'exercice du travail (horaires, tutorat, tolérance aux maladresses initiales).</p><h5>Les 4 règles déontologiques IOD :</h5><p>1. <b>Aucun tri préalable</b> : pas de sélection ou de ranking des candidats.<br/>2. <b>Présentation directe en entreprise</b> sans mise en concurrence artificielle.<br/>3. <b>Médiation active</b> pendant l'intégration pour désamorcer les heurts d'habitus.<br/>4. <b>Restauration de l'estime de soi</b> par l'accès rapide au statut de travailleur de droit commun.</p>",
    ph: "Le refus déontologique du tri préalable et la négociation directe sur l'offre fondent la pratique IOD de Francis Valls.",
    ex: "Face à une offre exigeant '3 ans d'expérience', le médiateur IOD rencontre le patron, redéfinit le besoin réel du poste et fait embaucher un jeune sans diplôme avec un accompagnement sur mesure.",
    trap: "Présenter 3 candidats en concurrence à un patron en espérant qu'il choisisse le 'meilleur' : c'est l'antithèse de la déontologie IOD.",
  },
  {
    a: "linguistique",
    q: "Quels sont les apports fondamentaux de la pragmatique linguistique : Austin (actes de langage), Sapir-Whorf (relativisme), Chomsky et Karl Bühler ?",
    t: "Séance 15 : Socle linguistique & pragmatique — Austin, Sapir-Whorf, Chomsky & Bühler",
    ess: "<h5>Les grands repères du langage</h5><p>Le cours d'Éric Lucy mobilise les fondements de la linguistique générale :</p><h5>1. John Austin & John Searle (Pragmatique)</h5><p>Actes locutoires (le dire), illocutoires (l'acte accompli en disant : ordre, promesse) et perlocutoires (les effets psychologiques produits sur l'auditeur).</p><h5>2. L'hypothèse Sapir-Whorf (Ethnolinguistique)</h5><p>La structure d'une langue influence profondément la façon dont ses locuteurs perçoivent et catégorisent le monde réel.</p><h5>3. Noam Chomsky & Claude Lévi-Strauss</h5><p>Chomsky : la compétence linguistique innée face à la performance. Lévi-Strauss : le langage comme structure symbolique organisatrice de la société.</p><h5>4. Karl Bühler (L'Organon)</h5><p>Les 3 fonctions simultanées du signe : <b>Représentation</b> (monde), <b>Expression</b> (sujet), <b>Appel</b> (autrui).</p>",
    ph: "De Bühler à Austin et Sapir, le langage est à la fois un instrument symbolique, une force d'action et une matrice culturelle.",
    ex: "Analyser un discours managérial à la fois sous l'angle de sa force illocutoire (injonction déguisée en conseil), de ses fonctions d'organon et de ses présupposés ethnolinguistiques.",
    trap: "Confondre la force illocutoire (l'acte accompli dans l'énoncé) et l'effet perlocutoire (la réaction effective de l'interlocuteur).",
  },
  {
    a: "linguistique",
    q: "Comment la novlangue managériale et l'imposition d'un lexique aseptisé participent-elles au harcèlement institutionnel (procès France Télécom 2022) ?",
    t: "Séance 16 : La novlangue managériale & le harcèlement institutionnel (France Télécom, 2022)",
    ess: "<h5>La valeur performative des discours managériaux</h5><p>Dans l'arrêt historique de septembre 2022 confirmant la condamnation pour « harcèlement moral institutionnel » des dirigeants de France Télécom, la justice s'est fondée sur les travaux des linguistes : les métaphores managériales (« par la fenêtre ou par la porte », « dégraissage ») ont une <b>valeur performative directe</b> (Austin) créant la détresse réelle.</p><h5>L'usage orwellien de la novlangue corporate</h5><p>L'utilisation de termes euphémisés (<i>Time to Move</i>, <i>projet personnel accompagné</i>) constitue une manipulation orwellienne : habiller des pratiques violentes d'un vernis bienveillant pour neutraliser la critique et briser les collectifs.</p>",
    ph: "Les discours managériaux ne sont pas neutres : ils revêtent une valeur performative capable d'élever comme de détruire (Cour d'appel, 2022).",
    ex: "Déguiser des départs forcés sous le vocable de 'projet personnel accompagné' : la novlangue subvertit la vérité et impose la violence symbolique.",
    trap: "Réduire le harcèlement à un simple conflit individuel au lieu d'y voir une politique industrielle discursivement organisée.",
  },
  {
    a: "vygotski_piaget",
    q: "Comment fonctionnent concrètement les dispositifs cliniques d'entretien : instruction au sosie, autoconfrontation simple et autoconfrontation croisée (Marot & Clot) ?",
    t: "Séance M1 : Les Dispositifs Cliniques d'Entretien — Instruction au sosie, Autoconfrontation simple & croisée (Marot & Clot)",
    ess: "<h5>L'instruction au sosie (Oddone & Clot)</h5><p>Méthode inventée à la Fiat de Turin par Ivar Oddone : <i>« Suppose que je sois ton sosie et que demain je doive te remplacer... »</i>. L'interlocuteur est contraint d'expliciter le <b>comment de l'action</b> (respiration, sensations, micro-décisions). Cas du trompettiste d'orchestre (Clot 1995) : la verbalisation dénoue l'inhibition et ouvre une zone de développement potentiel.</p><h5>L'autoconfrontation simple (Cahour & Licoppe 2010)</h5><p>Le sujet est confronté à la trace filmée de sa propre activité. Il dispose d'une <b>autorité épistémique</b> (Goffman) sur son vécu, permettant de documenter le réel pré-réfléchi et de susciter une réflexivité critique sur ses propres gestes.</p><h5>L'autoconfrontation croisée (Duboscq & Clot 2010)</h5><p>Deux pairs visionnent et commentent l'activité de l'un puis de l'autre. Le dialogue mobilise les <b>trois instances d'adresse de Bakhtine</b> : le destinataire (le collègue), le sub-destinataire (le dialogue intérieur) et le sur-destinataire (le métier, la Sécurité). Les controverses provoquent la <b>migration des gestes simulés</b> vers la pratique réelle (cas du gros-œuvre BTP sur l'élingage 10t).</p>",
    ph: "Le dialogue en autoconfrontation croisée réveille l'activité contrariée et transforme les dilemmes du métier en nouveaux instruments d'action (Yves Clot).",
    ex: "Sur un chantier BTP, deux ouvriers débattent devant la vidéo de la pose d'élingues : la controverse fait évoluer la règle collective et sécurise la manœuvre.",
    trap: "Confondre l'autoconfrontation simple (visée descriptive du vécu du sujet seul) et l'autoconfrontation croisée (visée développementale par la controverse entre pairs).",
  },
  {
    a: "vygotski_piaget",
    q: "Quels sont les mécanismes psychosociaux de la communication présentés par Mme Marot : dynamique de groupe (Lewin), défenses mnésiques, expérience de Razran (1950) et attitudes de Porter ?",
    t: "Séance M2 : Psychosociologie de la Communication — Lewin, Défenses mnésiques, Razran (1950) & Attitudes de Porter (Marot)",
    ess: "<h5>La théorie du champ et les tensions (Kurt Lewin)</h5><p>Toute situation de communication engage les forces positives/négatives du champ psychologique : désirs, motifs d'action, et dynamiques d'approche versus évitement. L'individu met en place des filtres projectifs.</p><h5>Les 4 mécanismes de défense de la mémoire</h5><p>Lorsque l'information menace le système de valeurs : 1. <b>Scotomisation</b> (élimination totale de l'information gênante que l'on n'entend pas) ; 2. <b>Mémorisation sélective</b> ; 3. <b>Interprétation défensive</b> (déformation conforme aux attentes) ; 4. <b>Négation de l'autorité de la source</b>.</p><h5>L'expérience princeps de Gregory Razran (1950)</h5><p>Protocole en 4 temps : T1 premières impressions sur photos neutres, T2 confirmation, T3 consistance absolue de la mémoire à 3 mois, T4 distorsion massive dès qu'un patronyme stéréotypé (juif, irlandais, italien, américain) est apposé. Démontre la force d'assignation inconsciente des stéréotypes sociaux dans le jugement.</p><h5>Les 6 attitudes de Porter & la proxémique</h5><p>Décision, Jugement, Interprétation, Soutien, Enquête vs <b>Compréhension empathique</b> rogérienne. En entretien, l'aménagement spatial en <b>angle</b> favorise la coopération et la liberté du regard, évitant l'affrontement frontal du vis-à-vis.</p>",
    ph: "Dans l'entretien, le psychologue doit neutraliser ses propres filtres projectifs (Porter) et déjouer l'assignation des stéréotypes sociaux révélée par Razran (1950).",
    ex: "Un salarié scotomise une consigne de sécurité perçue comme culpabilisante : le psychologue identifie l'interprétation défensive plutôt que d'accuser la mauvaise volonté.",
    trap: "Confondre la scotomisation (ne pas entendre l'information gênante) avec la mémorisation sélective (l'information est reçue mais oubliée).",
  },
  {
    a: "vygotski_piaget",
    q: "En quoi consiste « le travail sur le travail » et comment instituer une controverse professionnelle réglée selon Yvon Miossec et Pascal Simonet (2019) ?",
    t: "Séance M3 : Le Travail sur le Travail & la Controverse Réglée — Miossec & Simonet (2019)",
    ess: "<h5>Les limites des approches RPS traditionnelles</h5><p>Les démarches classiques de gestion des Risques Psychosociaux (RPS) se cantonnent à des questionnaires quantitatifs après coup. Elles individualisent la souffrance, psychologisent le malaise et n'aboutissent à aucune transformation pérenne de l'organisation réelle du travail.</p><h5>L'alternative développementale : Le travail sur le travail</h5><p>Yvon Miossec et Pascal Simonet (2019) proposent de restaurer la santé en instituant des <b>espaces de dialogue réglés</b> au sein d'une communauté scientifique élargie. Les opérateurs deviennent co-analystes de leur activité.</p><h5>Réfutation de la simple « libération de la parole »</h5><p>Offrir un simple lieu pour « vider son sac » sans pouvoir d'action est nocif : cela enferme les salariés dans la victimisation et la plainte stérile. Le psychologue doit orienter le dialogue vers la <b>controverse professionnelle sur les critères du travail bien fait</b>, puis négocier avec la ligne managériale pour modifier les prescriptions réelles.</p>",
    ph: "Libérer la parole ne suffit pas pour préserver la santé : il faut instituer la controverse professionnelle sur le travail bien fait et transformer les prescriptions (Miossec & Simonet).",
    ex: "Dans un hôpital, plutôt que de recueillir la plainte sur le manque de temps, le psychologue réunit les soignants pour débattre des priorités de soins et renégocier les plannings avec la direction.",
    trap: "Penser que la plainte sur la souffrance est la finalité de l'intervention : elle n'est que le symptôme d'une activité empêchée qu'il faut transformer en débat de métier.",
  },
  {
    a: "valls_iod",
    q: "Qu'est-ce que le « contrat de communication » selon Rodolphe Ghiglione (1986) et comment opère-t-il dans les enjeux d'évaluation (SAVPJJ) ?",
    t: "Séance V1 : Approche Psychosociale — Le Contrat de Communication & les Enjeux d'Évaluation (Rodolphe Ghiglione 1986, SAVPJJ)",
    ess: "<h5>Le contrat de communication de Rodolphe Ghiglione (1986)</h5><p>Communiquer n'est pas transmettre un signal physique : c'est <b>co-construire du sens</b> sous l'égide d'un contrat implicite de reconnaissance mutuelle. Les interlocuteurs négocient leurs places, leurs enjeux et la légitimité de leur prise de parole.</p><h5>Statuts, rôles et asymétries</h5><p>La communication au travail est déterminée par le statut formel et le rôle prescrit. Lorsque le contrat de communication est rompu ou unilatéral, l'interaction se dégrade en affrontement défensif ou en soumission feinte.</p><h5>L'évaluation clinique des pratiques de relation d'aide (SAVPJJ)</h5><p>Francis Valls analyse l'évaluation des effets de leur travail par les professionnels de la protection judiciaire de la jeunesse (SAVPJJ). L'évaluation ne peut être un audit quantitatif aveugle : elle exige de prendre en compte l'immatériel, la relation d'aide et les compromis opératoires des travailleurs sociaux.</p>",
    ph: "La communication est un contrat psychosocial de co-construction de la réalité : rompre le contrat, c'est détruire la possibilité d'une entente (Ghiglione).",
    ex: "Dans un entretien d'évaluation, si le manager impose ses critères sans valider le contrat de parole du salarié, ce dernier adopte un discours de façade conforme sans engagement réel.",
    trap: "Réduire la communication de Ghiglione au schéma de Shannon : pour Ghiglione, l'enjeu central est le système de règles partagées et le principe de pertinence.",
  },
  {
    a: "valls_iod",
    q: "Quelle distinction essentielle Dominique Wolton opère-t-il entre information, communication et incommunication par opposition à Shannon & Weaver ?",
    t: "Séance V2 : Négociation & Incommunication — Dominique Wolton vs Shannon & Weaver (Valls)",
    ess: "<h5>Le modèle de transmission de Shannon & Weaver (1949)</h5><p>Modèle technique linéaire : Émetteur → Encodage → Canal (bruit) → Décodage → Récepteur. Efficace pour les télécommunications, il est <b>inopérant</b> pour les sciences humaines car il ignore le sens, l'histoire des sujets, le contexte social et les rapports de pouvoir.</p><h5>L'apport de la cybernétique (Norbert Wiener)</h5><p>Wiener introduit le concept crucial de <b>feedback</b> (rétroaction) : le message en retour régule l'émission et circularise l'interaction.</p><h5>Dominique Wolton : De la communication à l'incommunication</h5><p>Pour Dominique Wolton, la communication humaine contemporaine n'est pas facilitée par l'abondance technique : le récepteur n'est jamais passif, il résiste, réinterprète et négocie. La règle n'est pas l'harmonie mais <b>l'incommunication</b> : communiquer exige un travail permanent de négociation démocratique de l'altérité.</p>",
    ph: "Le récepteur n'est pas une cible passive : il négocie, refuse ou réinterprète le message. L'incommunication est la condition première de la liberté humaine (Dominique Wolton).",
    ex: "Déployer un intranet d'entreprise sophistiqué ne garantit aucune adhésion : sans négociation du sens avec les équipes réceptrices, la technique produit du rejet et de l'incommunication.",
    trap: "Croire que l'incommunication selon Wolton est un échec technique : elle est la manifestation normale de la différence entre des sujets autonomes.",
  },
  {
    a: "valls_iod",
    q: "Comment Robert L. Kahn (1958) théorise-t-il les tensions de rôles et comment les 4 cas cliniques de Francis Valls éclairent-ils l'intervention ?",
    t: "Séance V3 : Tensions de Rôles & Clinique des Situations de Travail — Kahn (1958) & les 4 Cas Cliniques (Valls)",
    ess: "<h5>Le modèle des rôles de Robert L. Kahn (1958)</h5><p>Kahn théorise les tensions organisationnelles à travers 4 concepts : 1. <b>Rôle prescrit</b> (attentes de l'organisation) ; 2. <b>Rôle transmis</b> (consignes émises) ; 3. <b>Rôle perçu</b> (interprétation par le sujet) ; 4. <b>Comportement de rôle</b> (action réelle). Les écarts génèrent <b>conflits de rôles</b> et <b>ambiguïté de rôle</b>, sources majeures de détresse au travail.</p><h5>Les 4 études de cas cliniques de M. Valls</h5><p>1. <b>Cas Berlinguer</b> : affrontement des légitimités politiques et syndicales dans un tour de parole public.<br/>2. <b>Cas de l'appel d'urgence Dallas 1984 (Garfinkel)</b> : l'opérateur du 911 s'enferme dans la rigidité procédurale face à une mère en panique, provoquant la mort de la patiente. Rupture tragique de l'interlocution et de l'ethnométhodologie.<br/>3. <b>Cas Accueil CMS Mme U</b> : l'agente d'accueil utilise des phrases de décharge pour se protéger du flux des usagers en situation précaire.<br/>4. <b>Cas des Fûts bosselés (Boltanski & Thévenot)</b> : conflit d'autorité entre le chef d'atelier (grandeur industrielle : sécurité et conformité) et le cariste (grandeur marchande : cadences de livraison).</p>",
    ph: "Dans l'appel 911 de Dallas, le respect aveugle du protocole technique a détruit l'interlocution humaine et produit la catastrophe clinique (Francis Valls & Harold Garfinkel).",
    ex: "Dans le litige des fûts bosselés, le compromis ne peut naître que si les acteurs reconnaissent qu'ils confrontent deux régimes de justification distincts (sécurité industrielle vs flux marchand).",
    trap: "Considérer les comportements de défense des agents d'accueil (CMS) comme de l'incompétence : ils sont des stratégies de régulation face à la violence institutionnelle.",
  },
];

export const KW_DEFS: Record<string, string> = {
  "fonctions psychiques supérieures":
    "Chez Vygotski, processus mentaux complexes (attention volontaire, mémoire logique, pensée verbale) développés par l'histoire et la culture grâce à des instruments psychologiques.",
  "primat du social (loi génétique générale)":
    "Loi fondamentale de Vygotski posant que toute fonction psychique apparaît d'abord au niveau social et interpersonnel (interpsychologique) avant de devenir individuelle (intrapsychologique).",
  "langage égocentrique (vygotski vs piaget)":
    "Pour Piaget, monologue asocial voué à disparaître avec la décentration ; pour Vygotski, instrument actif de réflexion face à l'obstacle qui s'intériorise en langage intérieur.",
  "langage intérieur":
    "Forme terminale intériorisée du langage égocentrique chez Vygotski : pensée verbale silencieuse, abrégée, prédicative, servant de guide réflexif permanent de l'action.",
  "instrument psychologique":
    "Outil symbolique artificiel créé par la culture (langage, écriture, calcul, schémas) permettant au sujet d'agir sur son propre psychisme et sur celui d'autrui (Vygotski).",
  "expérience des crayons de couleur":
    "Expérience princeps de Vygotski montrant que l'enfant privé d'un crayon verbalise à haute voix pour surmonter l'obstacle, prouvant la fonction de raisonnement du langage égocentrique.",
  "transformer pour comprendre":
    "Principe épistémologique fondateur de l'intervention clinique au Cnam : le dispositif transforme la situation de travail, et c'est par cette transformation dialogique que survient la compréhension.",
  "coopération conflictuelle":
    "Concept d'Yves Clot (Le travail à cœur) désignant l'organisation délibérée de la dispute professionnelle et du conflit de critères entre pairs pour dépasser les blocages du métier.",
  "dimension située du langage":
    "Principe posant que les pratiques langagières ne sont jamais désincarnées mais ancrées dans un environnement social, organisationnel et matériel singulier (Réseau Langage et Travail).",
  "réseau langage et travail":
    "Collectif de recherche pluridisciplinaire fondé en 1986 par Josiane Boutet, Béatrice Fraenkel, Jacques Girin et Bernard Gardin avec le CNRS, formalisant l'intrication travail-langage.",
  "pare-excitation (freud / golse)":
    "Fonction maternelle et psychique protégeant l'enfant contre l'intrusion d'excitations pulsionnelles internes et externes ingérables, prélude à la pensée.",
  "appareil à penser les pensées":
    "Concept forgé par Wilfred R. Bion (1962) : capacité psychique prêtée par la mère au nourrisson via la rêverie maternelle pour transformer les éléments bruts (bêta) en éléments assimilables (alpha).",
  "jeu de la bobine (fort / da)":
    "Observation princeps de Sigmund Freud (1920) sur son petit-fils Ernst (18 mois) jetant et ramenant une bobine pour symboliser par le langage l'absence et la maîtrise de la perte maternelle.",
  "tiercéité (golse / green)":
    "Reconnaissance de l'autre comme alter ego distinct permise par l'introduction d'un tiers (enveloppe triadique), condition sine qua non de l'intersubjectivité et du dialogue authentique.",
  "assimilation et accommodation (piaget)":
    "Les deux pôles de l'adaptation piagétienne : l'assimilation applique les schèmes du sujet sur l'objet ; l'accommodation modifie les schèmes sous la contrainte du milieu.",
  "équilibration cognitive":
    "Processus autorégulateur central chez Piaget assurant la compensation continue des déséquilibres entre assimilation et accommodation, moteur du passage d'un stade à l'autre.",
  "marché linguistique":
    "Concept de Pierre Bourdieu désignant le système de rapports de forces symboliques où les compétences linguistiques s'échangent à des prix inégaux selon la légitimité reconnue des locuteurs.",
  "capital linguistique":
    "Ensemble des ressources verbales et stylistiques incorporées procurant un profit de distinction symbolique au locuteur sur le marché linguistique.",
  "status est magistratus":
    "Maxime juridique reprise par Bourdieu signifiant que l'efficacité d'un acte de parole dérive du statut institutionnel de celui qui parle et non des mots eux-mêmes.",
  "lit de justice":
    "Rituel de la monarchie d'Ancien Régime (étudié par Sarah Hanley et repris par Bourdieu) où la présence physique du roi interrompt toute délibération et fait force de loi.",
  "violence symbolique":
    "Imposition d'un ordre social ou d'un classement légitime à des dominés qui en intériorisent les catégories et y consentent inconsciemment.",
  "efficacité performative de l'insulte":
    "Thèse d'Éric Lucy (2021) montrant que l'insulte ne blesse pas par sa sonorité mais parce qu'elle réactive des rapports de domination et des stigmates déjà constitués socialement.",
  "agir stratégique":
    "Selon Jürgen Habermas, mode d'action orienté vers le succès (Erfolg) où autrui est traité comme un moyen, un obstacle ou un instrument d'influence.",
  "agir communicationnel":
    "Selon Habermas, coordination de l'action orientée vers l'entente et l'intercompréhension mutuelle (Verständigung) par le biais de raisons argumentées.",
  "entente (verständigung)":
    "Objectif premier de l'agir communicationnel chez Habermas, désignant un accord rationnellement motivé et exempt de contrainte entre partenaires d'interaction.",
  "prétentions à la validité":
    "Les 4 exigences universelles de tout énoncé visant l'entente chez Habermas : intelligibilité, vérité propositionnelle, justesse normative, sincérité subjective.",
  "éthique de la discussion":
    "Diskursethik d'Habermas posant que seules sont valides les normes morales acceptées par l'ensemble des personnes concernées au terme d'une délibération rationnelle.",
  "situation idéale de parole":
    "Idéal régulateur habermassien d'un espace de discussion transparent où seule prévaut la force sans violence du meilleur argument sans pression hiérarchique.",
  "compétence délibérative":
    "Capacité managériale et collective à soumettre les décisions organisationnelles à la controverse rationnelle et à l'examen démocratique d'arguments (Duchamp & Koëhl).",
  "sphère intime (amour)":
    "Première sphère de reconnaissance morale chez Axel Honneth, forgeant la confiance en soi (Selbstvertrauen) par l'attachement affectif primaire.",
  "sphère juridique (droit)":
    "Deuxième sphère chez Honneth garantissant les droits civiques et le statut de citoyen universel, fondant le respect de soi (Selbstachtung).",
  "sphère sociale (solidarité/travail)":
    "Troisième sphère morale chez Honneth reconnaissant l'utilité et la valeur singulière de l'activité au sein de la communauté, fondant l'estime de soi (Selbstschätzung).",
  "estime de soi":
    "Rapport positif à soi acquis dans la troisième sphère de Honneth grâce à la valorisation sociale de ses compétences et de son métier.",
  réification:
    "Pour Honneth, 'oubli de la reconnaissance' : attitude pathologique consistant à percevoir autrui comme un pur objet ou une donnée chiffrée.",
  "mépris social":
    "Blessure morale résultant de l'invisibilité, du déni de droits ou de la disqualification sociale au travail, moteur des luttes collectives selon Honneth.",
  "discussion en samu social":
    "Recherche de terrain d'Éric Lucy (2020) montrant que l'échange verbal en maraude réinstitue le sujet désaffilié dans la sphère de la reconnaissance morale.",
  "méthode iod":
    "Intervention sur les Offres et les Demandes (Francis Valls & Denis Castra) : méthodologie d'insertion professionnelle intervenant directement auprès des entreprises.",
  "refus du tri préalable":
    "Principe déontologique fondamental de la méthode IOD refusant toute sélection des demandeurs d'emploi et affirmant que toute personne est immédiatement employable.",
  "intervention sur l'offre":
    "Stratégie IOD consistant à négocier l'adaptation du poste et les conditions de travail en entreprise plutôt que d'exiger une adaptation perpétuelle du précaire.",
  désaffiliation:
    "Concept de Robert Castel (préfacier de Valls & Castra) décrivant le décrochage conjoint du travail stable et des réseaux de sociabilité protecteurs.",
  "hypothèse sapir-whorf":
    "Théorie ethnolinguistique selon laquelle les structures d'une langue façonnent la vision du monde et les modes de pensée de sa communauté.",
};

export const LEXIQUE = Object.entries(KW_DEFS).map(([w, def]) => {
  let a = "linguistique";
  if (
    w.includes("bourdieu") ||
    w.includes("linguistique") ||
    w.includes("insulte") ||
    w.includes("magistratus") ||
    w.includes("lit de justice") ||
    w.includes("violence")
  )
    a = "bourdieu";
  else if (
    w.includes("habermas") ||
    w.includes("stratégique") ||
    w.includes("communicationnel") ||
    w.includes("validité") ||
    w.includes("discussion") ||
    w.includes("délibérative") ||
    w.includes("entente")
  )
    a = "habermas";
  else if (
    w.includes("honneth") ||
    w.includes("sphère") ||
    w.includes("estime") ||
    w.includes("mépris") ||
    w.includes("réification") ||
    w.includes("samu")
  )
    a = "honneth";
  else if (
    w.includes("iod") ||
    w.includes("tri") ||
    w.includes("offre") ||
    w.includes("désaffiliation")
  )
    a = "valls_iod";
  return {
    w,
    a,
    def,
    eg: `Application clinique et communicationnelle du concept de ${w} dans les pratiques professionnelles.`,
  };
});

export const QCM_DATA = [
  {
    q: "Quelle est la divergence fondamentale entre Jean Piaget et Lev Vygotski quant au devenir du langage égocentrique ?",
    opts: [
      "Pour Piaget, il s'intériorise en langage intérieur ; pour Vygotski, il disparaît avec la maturité cérébrale.",
      "Pour Piaget, il est une marque d'asocialité vouée à disparaître ; pour Vygotski, il est un instrument de raisonnement qui s'intériorise en pensée silencieuse.",
      "Piaget et Vygotski considèrent tous deux que le langage égocentrique est une anomalie pathologique du jeune enfant.",
      "Vygotski affirme que le langage intérieur précède le langage socialisé, inversant la thèse piagétienne.",
    ],
    correct: 1,
    exp: "Dans Pensée et langage, Vygotski démontre que le langage égocentrique ne disparaît pas avec la décentration (contrairement à Piaget) : il s'intériorise pour devenir le langage intérieur (pensée verbale silencieuse).",
  },
  {
    q: "Dans l'épistémologie de l'intervention clinique en psychologie du travail au Cnam, quelle formule résume la posture d'intervention ?",
    opts: [
      "Comprendre d'abord par des questionnaires standardisés, puis prescrire une réorganisation.",
      "« Transformer pour comprendre » : c'est à travers la transformation dialogique de la situation que se co-construit la compréhension.",
      "Adopter une neutralité bienveillante positiviste sans modifier les dispositifs en place.",
      "Appliquer les grilles de diagnostic DSM-5 pour catégoriser les souffrances psychiques des opérateurs.",
    ],
    correct: 1,
    exp: "Au Cnam (Yves Clot), le psychologue intervient en mettant en place un dispositif d'action qui transforme la situation ; c'est dans et par cette transformation que survient la compréhension de l'activité réelle.",
  },
  {
    q: "Selon la loi génétique générale du développement culturel formulée par Lev Vygotski :",
    opts: [
      "Les fonctions psychiques émergent d'abord au niveau neurobiologique avant de s'exprimer dans les interactions sociales.",
      "Toute fonction apparaît deux fois : d'abord au niveau social (interpsychologique), puis au niveau individuel (intrapsychologique).",
      "Le développement cognitif procède exclusivement par équilibration endogène autonome face aux objets physiques.",
      "Le langage égocentrique est un pur reflet symbolique de la pensée sensori-motrice préexistante.",
    ],
    correct: 1,
    exp: "« Toute fonction dans le développement culturel de l'enfant apparaît deux fois : d'abord au niveau social (interpsychologique), et dans un second temps au niveau individuel (intrapsychologique). » (Vygotski).",
  },
  {
    q: "Dans l'expérience princeps de Vygotski où l'enfant est privé de crayon de couleur pour dessiner, que prouve sa verbalisation à voix haute ?",
    opts: [
      "Qu'il fait un caprice asocial sans rapport avec son activité cognitive.",
      "Que le langage égocentrique sert de véritable instrument de raisonnement et de planification de l'action face à l'obstacle.",
      "Qu'il tente de manipuler l'adulte pour obtenir le matériel manquant.",
      "Que l'absence de crayon bloque irrémédiablement le processus d'accommodation piagétienne.",
    ],
    correct: 1,
    exp: "L'enfant privé de crayon élabore (« Je vais prendre du rouge et mouiller avec de l'eau ») : le langage égocentrique permet à l'enfant de prendre conscience de la difficulté et d'orienter sa recherche de solution.",
  },
  {
    q: "Qui a forgé le concept de « prêt d'un appareil à penser les pensées » au nourrisson par la figure maternelle ?",
    opts: [
      "Sigmund Freud dans 'Au-delà du principe de plaisir' (1920)",
      "Wilfred R. Bion dans 'Aux sources de l'expérience' (1962)",
      "Bernard Golse dans ses séminaires de pédopsychiatrie",
      "Donald W. Winnicott dans sa théorie de l'objet transitionnel",
    ],
    correct: 1,
    exp: "Rectification clé d'examen : si Golse évoque ce prêt psychique, le concept rigoureux d'« appareil à penser les pensées » métabolisant les éléments bêta en éléments alpha appartient au psychanalyste Wilfred R. Bion (1962).",
  },
  {
    q: "Quelle observation célèbre de Sigmund Freud (1920) illustre la fonction de réparation symbolique et la maîtrise de la perte par le langage ?",
    opts: [
      "Le cas du Petit Hans et la phobie du cheval de trait",
      "Le jeu de la bobine (Fort / Da) avec son petit-fils Ernst âgé de 18 mois",
      "L'analyse de l'homme aux loups et la scène primitive",
      "La cure de parole d'Anna O. (Bertha Pappenheim)",
    ],
    correct: 1,
    exp: "Dans 'Au-delà du principe de plaisir' (1920), Freud observe son petit-fils Ernst (18 mois) jetant une bobine hors de son lit ('o-o-o' / Fort) et la ramenant ('Da'), symbolisant l'absence et le retour de sa mère.",
  },
  {
    q: "Quelle distinction épistémologique fondamentale sépare la Clinique de l'activité de la Psychodynamique du travail ?",
    opts: [
      "La Clinique de l'activité utilise l'hypnose, tandis que la Psychodynamique utilise des entretiens de groupe.",
      "La Clinique de l'activité est centrée sur le réel de l'activité et l'opérateur (sans prendre l'inconscient freudien comme objet direct), alors que la Psychodynamique se focalise sur la souffrance, le plaisir et les défenses psychiques.",
      "La Clinique de l'activité rejette le dialogue, alors que la Psychodynamique du travail l'encourage.",
      "La Clinique de l'activité est réservée aux psychologues cliniciens hors Cnam.",
    ],
    correct: 1,
    exp: "Yves Clot distingue nettement la clinique de l'activité (activité réelle, développement du métier, pas d'objet inconscient direct) de la psychodynamique de Dejours (souffrance, étiologie des défenses).",
  },
  {
    q: "En quelle année le réseau pluridisciplinaire français 'Langage et Travail' a-t-il été historiquement fondé ?",
    opts: [
      "En 1950 lors de l'apparition des premiers ordinateurs industriels",
      "En 1986 sous l'impulsion de Josiane Boutet, Béatrice Fraenkel, Jacques Girin et Bernard Gardin avec le CNRS",
      "En 1997 lors de la parution de la réédition de 'Pensée et langage'",
      "En 2022 suite au procès de France Télécom",
    ],
    correct: 1,
    exp: "Précision historique d'examen : si 1997 correspond à une vague majeure de publications, le réseau 'Langage et Travail' a été fondé en 1986 pour analyser l'intrication étroite entre langage et activité.",
  },
  {
    q: "Selon Yves Clot dans 'Le travail à cœur', que désigne la notion de « coopération conflictuelle » ?",
    opts: [
      "Le sabotage délibéré de la production par les salariés en grève perlée.",
      "L'instauration d'un dialogue réglé entre pairs (dispute professionnelle) autour des conflits de critères sur la qualité du travail.",
      "La rivalité marchande entre syndicats au sein du comité social et économique (CSE).",
      "L'obligation légale de signer un accord de médiation en cas de harcèlement moral.",
    ],
    correct: 1,
    exp: "La coopération conflictuelle institue la dispute professionnelle : loin du consensus mou, elle met en débat contradictoire les critères du travail bien fait pour régénérer le pouvoir d'agir.",
  },
  {
    q: "Quels sont les 4 facteurs du développement cognitif identifiés par Jean Piaget (rejetant l'innéisme strict) ?",
    opts: [
      "Le refoulement, l'isolation, la projection et la sublimation",
      "La maturation organique/nerveuse, l'expérience sur les objets, les interactions sociales et l'équilibration autorégulatrice",
      "Le capital économique, le capital culturel, le capital social et le capital symbolique",
      "L'intentionnalité, la locution, l'illocution et la perlocution",
    ],
    correct: 1,
    exp: "Piaget identifie 4 facteurs interactifs : maturation du système nerveux, action physique sur les objets, transmissions sociales et le processus central d'équilibration autorégulatrice.",
  },
  {
    q: "Selon Pierre Bourdieu dans 'Ce que parler veut dire', d'où provient l'efficacité performative d'une parole ?",
    opts: [
      "De la beauté poétique et de la perfection grammaticale des phrases",
      "De l'autorité statutaire et institutionnelle déléguée au locuteur ('Status est magistratus')",
      "De la sincérité intime et de la bienveillance psychologique du locuteur",
    ],
    correct: 1,
    exp: "Bourdieu critique l'illusion internaliste d'Austin : le pouvoir des mots ne réside pas dans les mots mais dans l'institution qui autorise et délègue la parole.",
  },
  {
    q: "Que représente le rituel du « Lit de justice » étudié par Sarah Hanley et repris par Pierre Bourdieu ?",
    opts: [
      "Un tribunal médical évaluant l'aptitude physique des ouvriers",
      "Le rituel monarchique où la seule présence du roi suspend toute délibération parlementaire par son autorité absolue",
      "Une séance de conciliation amicale entre patrons et syndicats",
    ],
    correct: 1,
    exp: "Le lit de justice symbolise l'imposition unilatérale du pouvoir institué qui rend tout débat démocratique immédiatement caduc.",
  },
  {
    q: "Dans ses travaux sur l'efficacité performative de l'insulte (2021), que démontre Éric Lucy ?",
    opts: [
      "Que l'insulte est un acte individuel résultant d'un dysfonctionnement neurologique",
      "Que l'insulte tire sa force destructrice des rapports sociaux de domination et des stigmates déjà institués",
      "Que l'insulte n'a aucun effet psychologique si la personne insultée ne l'écoute pas",
    ],
    correct: 1,
    exp: "Éric Lucy prouve que l'insulte n'est pas un simple mot violent, mais l'actualisation violente d'une hiérarchie et d'un stigmate social préalable.",
  },
  {
    q: "Chez Jürgen Habermas, par quoi se caractérise l'Agir communicationnel ?",
    opts: [
      "Par la volonté d'imposer son point de vue à l'autre par des ruses rhétoriques",
      "Par la recherche coopérative d'une entente rationnellement motivée (Verständigung) exempte de contrainte",
      "Par l'exécution mécanique d'un protocole managérial prescrit",
    ],
    correct: 1,
    exp: "L'agir communicationnel coordonne l'action par la recherche d'une entente libre sur des raisons partagées, à l'opposé de l'agir stratégique.",
  },
  {
    q: "Combien de prétentions universelles à la validité sont émises dans l'agir communicationnel selon Habermas ?",
    opts: [
      "Deux : le volume sonore et la clarté lexicale",
      "Trois : le passé, le présent et le futur",
      "Quatre : l'intelligibilité, la vérité des faits, la justesse normative et la sincérité du locuteur",
    ],
    correct: 2,
    exp: "Habermas pose les 4 prétentions à la validité : intelligibilité du langage, vérité (monde objectif), justesse (monde social) et sincérité (monde subjectif).",
  },
  {
    q: "Que stipule le « Principe D » de l'éthique de la discussion habermassienne ?",
    opts: [
      "Seul le directeur général a le droit de décider des normes de travail",
      "Seules sont valides les normes susceptibles d'être acceptées par tous les concernés dans une discussion rationnelle",
      "Toute discussion doit durer moins de 15 minutes pour préserver la rentabilité",
    ],
    correct: 1,
    exp: "Le principe D fonde la validité morale sur l'accord argumenté de tous les participants potentiellement affectés par la règle.",
  },
  {
    q: "Dans la théorie de la reconnaissance d'Axel Honneth, dans quelle sphère se forge l'Estime de soi (Selbstschätzung) ?",
    opts: [
      "Dans la sphère affective intime de la famille",
      "Dans la sphère juridique des droits civiques fondamentaux",
      "Dans la sphère sociale de la solidarité et de l'utilité du travail",
    ],
    correct: 2,
    exp: "L'estime de soi dépend de la reconnaissance par les pairs et la communauté de la valeur sociale de son métier et de ses compétences.",
  },
  {
    q: "Comment Axel Honneth définit-il la « Réification » dans son ouvrage de 2007 ?",
    opts: [
      "Comme la transformation mathématique d'une équation comptable",
      "Comme un 'oubli de la reconnaissance' originaire d'autrui comme sujet",
      "Comme l'achat d'un nouveau parc de machines industrielles",
    ],
    correct: 1,
    exp: "Pour Honneth, réifier consiste à perdre de vue la qualité de sujet d'autrui pour le réduire à une ressource marchande ou instrumentale.",
  },
  {
    q: "Dans son article sur la discussion en SAMU social (2020), quelle fonction Éric Lucy attribue-t-il à la parole ?",
    opts: [
      "Une simple collecte policière de données biométriques",
      "Un acte de réinstitution du sujet désaffilié dans la sphère de la reconnaissance morale et de la dignité",
      "Un monologue éducatif moralisateur",
    ],
    correct: 1,
    exp: "Éric Lucy montre que la discussion en maraude brise le mépris social et redonne au grand exclu un statut de sujet d'interlocution.",
  },
  {
    q: "Quel est le principe de rupture fondamental de la Méthode IOD créée par Francis Valls et Denis Castra ?",
    opts: [
      "Multiplier les tests psychologiques préalables pour éliminer les profils fragiles",
      "Refuser l'idéologie de l'employabilité et le tri des exclus, en intervenant directement sur les offres et les entreprises",
      "Obliger chaque chômeur à créer sa micro-entreprise individuelle",
    ],
    correct: 1,
    exp: "La méthode IOD refuse la mise en concurrence et la sur-préparation infantilisante : elle agit sur l'environnement de l'entreprise pour négocier le poste réel.",
  },
  {
    q: "Quel grand sociologue français a préfacé l'ouvrage 'L'insertion malgré tout' de Denis Castra et Francis Valls (2007) ?",
    opts: [
      "Émile Durkheim",
      "Robert Castel (théoricien de la désaffiliation et du salariat)",
      "Michel Foucault",
    ],
    correct: 1,
    exp: "Robert Castel soutient l'approche IOD car elle réinsère concrètement les désaffiliés dans le droit commun du travail.",
  },
  {
    q: "Selon l'hypothèse Sapir-Whorf en ethnolinguistique :",
    opts: [
      "Toutes les langues sont calquées sur l'anglais des affaires",
      "La structure grammaticale et le lexique d'une langue façonnent la façon dont les locuteurs perçoivent et catégorisent le réel",
      "Le langage n'a aucune influence sur la pensée humaine",
    ],
    correct: 1,
    exp: "L'hypothèse Sapir-Whorf affirme le relativisme linguistique : la langue maternelle est un prisme culturel qui organise l'expérience du monde.",
  },
];

export const PIEGES: [string, boolean, string, string][] = [
  [
    "Le pouvoir des mots découle principalement de la logique sémantique et de la beauté rhétorique des phrases prononcées.",
    false,
    "Faux ! C'est l'illusion internaliste dénoncée par Bourdieu. Le pouvoir des mots dépend de l'autorité institutionnelle et statutaire du locuteur ('Status est magistratus').",
    "bourdieu",
  ],
  [
    "Dans l'agir stratégique d'Habermas, les interlocuteurs cherchent une entente coopérative sans contrainte.",
    false,
    "Faux ! L'agir stratégique est orienté vers le succès personnel, l'efficacité ou la manipulation d'autrui. C'est l'agir communicationnel qui cherche l'entente (Verständigung).",
    "habermas",
  ],
  [
    "La méthode IOD de Francis Valls préconise de faire passer de longs stages de remise à niveau aux exclus avant de les présenter à un patron.",
    false,
    "Faux ! IOD rompt radicalement avec le ciblage déficitaire : elle refuse la sur-préparation qui stigmatise et négocie directement l'embauche sur l'offre d'emploi.",
    "valls_iod",
  ],
  [
    "Selon Axel Honneth, l'estime de soi professionnelle s'acquiert dans la première sphère intime de l'amour.",
    false,
    "Faux ! Dans la sphère intime (amour), on acquiert la confiance en soi. L'estime de soi s'acquiert dans la troisième sphère (la solidarité sociale et la valeur du métier).",
    "honneth",
  ],
  [
    "Sarah Hanley montre que le lit de justice était un espace de débat démocratique et contradictoire sous la royauté.",
    false,
    "Faux ! Le lit de justice était le rituel d'État suprême où la présence royale suspendait immédiatement tout droit de remontrance des parlements.",
    "bourdieu",
  ],
  [
    "L'article d'Éric Lucy sur l'insulte (2021) montre que l'insulte est un acte individuel coupé de l'histoire sociale.",
    false,
    "Faux ! L'insulte tire sa force performative des rapports de domination préexistants et des stigmates déjà institutionnalisés dans le champ social.",
    "bourdieu",
  ],
  [
    "La réification chez Axel Honneth désigne uniquement la vente de marchandises au supermarché.",
    false,
    "Faux ! C'est une pathologie morale consistant en l'oubli de la reconnaissance préalable d'autrui comme sujet humain doué de dignité.",
    "honneth",
  ],
  [
    "La méthode IOD applique le principe déontologique du tri préalable pour ne proposer aux entreprises que les candidats les plus dociles.",
    false,
    "Faux ! Le refus du tri et de la sélection est la règle déontologique d'or de Francis Valls : tout individu est présentable et digne d'accéder à l'emploi.",
    "valls_iod",
  ],
  [
    "L'hypothèse Sapir-Whorf soutient que le vocabulaire n'a aucun impact sur la pensée humaine.",
    false,
    "Faux ! Elle affirme au contraire que la langue détermine ou oriente la structure cognitive et la vision du monde d'une communauté.",
    "linguistique",
  ],
  [
    "Les 4 prétentions à la validité d'Habermas peuvent être rejetées rationnellement par l'interlocuteur lors d'une discussion.",
    true,
    "Vrai ! L'interlocuteur peut contester la vérité du fait, la justesse de la norme, la sincérité du locuteur ou l'intelligibilité du propos.",
    "habermas",
  ],
];

export const QUI: [string, string, string][] = [
  [
    "« Le pouvoir des mots ne réside pas dans les mots eux-mêmes mais dans les conditions institutionnelles de leur émission. »",
    "bourdieu",
    "<b>Pierre Bourdieu.</b> Dans <i>Ce que parler veut dire</i> (1982), il réfute l'illusion internaliste d'Austin.",
  ],
  [
    "« L'agir communicationnel repose sur la recherche coopérative d'une entente rationnellement motivée exempte de toute contrainte. »",
    "habermas",
    "<b>Jürgen Habermas.</b> Dans la <i>Théorie de l'agir communicationnel</i> (1981), il formalise l'orientation vers la Verständigung.",
  ],
  [
    "« La réification est un oubli de la reconnaissance : nous traitons autrui comme une chose après avoir perdu de vue sa qualité de sujet. »",
    "honneth",
    "<b>Axel Honneth.</b> Dans <i>La Réification</i> (2007), il place la reconnaissance comme préalable à toute cognition.",
  ],
  [
    "« L'insertion ne consiste pas à adapter sans fin l'exclu à un marché hostile, mais à intervenir directement sur l'offre pour négocier le travail réel. »",
    "valls_iod",
    "<b>Francis Valls & Denis Castra.</b> Dans <i>L'insertion malgré tout</i> (2007), ils posent les fondements de la méthode IOD.",
  ],
  [
    "« Quand dire, c'est faire : énoncer une parole, c'est accomplir un acte qui modifie les rapports sociaux. »",
    "linguistique",
    "<b>John L. Austin.</b> Dans <i>Quand dire, c'est faire</i> (1962), il fonde la théorie des actes de langage et le performatif.",
  ],
  [
    "« Le lit de justice était le rituel d'État suprême où la parole du roi incarnait la loi vivante et réduisait au silence les parlements. »",
    "bourdieu",
    "<b>Sarah Hanley.</b> Dans <i>Le lit de justice des rois de France</i>, analysé par Bourdieu pour théoriser l'acte d'institution.",
  ],
  [
    "« L'efficacité performative de l'insulte ne s'explique pas par la linguistique, mais par les conditions sociales de domination dans lesquelles elle s'inscrit. »",
    "bourdieu",
    "<b>Éric Lucy.</b> Dans la revue <i>Empan</i> (2021), il analyse les mécanismes symboliques de l'insulte en travail social.",
  ],
  [
    "« L'insertion par l'intervention sur les offres et les demandes montre que le travail reste le grand intégrateur social. »",
    "valls_iod",
    "<b>Robert Castel.</b> Préfacier de Francis Valls & Denis Castra (2007) et théoricien de la désaffiliation.",
  ],
  [
    "« Les êtres humains ne vivent pas dans le seul monde objectif : ils sont à la merci de la langue particulière qui organise leur expérience. »",
    "linguistique",
    "<b>Edward Sapir & Benjamin Lee Whorf.</b> Fondateurs de l'hypothèse ethnolinguistique du relativisme de la pensée.",
  ],
  [
    "« La compétence linguistique est une faculté innée universelle de l'esprit humain, distincte des performances particulières en situation. »",
    "linguistique",
    "<b>Noam Chomsky.</b> Fondateur de la linguistique générative et de la grammaire universelle.",
  ],
];

export const DISTINGUER = [
  {
    pair: [
      "Langage égocentrique selon Jean Piaget (Reflet asocial voué à l'extinction)",
      "Langage égocentrique selon Lev Vygotski (Instrument actif s'intériorisant)",
    ],
    a: "vygotski_piaget",
    crit: "Pour Piaget, le langage égocentrique est le reflet subordonné d'une pensée non décentrée qui disparaît avec la socialisation ; pour Vygotski, c'est un instrument de raisonnement issu de l'interaction sociale qui s'intériorise en langage intérieur.",
    items: [
      [
        "Considérer que l'enfant qui parle seul en jouant témoigne d'une pensée asociale incapable de communiquer.",
        0,
      ],
      [
        "Montrer que l'enfant privé d'un crayon bleu formule à voix haute une stratégie cognitive pour surmonter l'obstacle.",
        1,
      ],
      [
        "Affirmer que le langage intérieur adulte est le produit de l'intériorisation progressive du monologue de l'enfant.",
        1,
      ],
      [
        "Postuler que le développement va de l'individuel égocentrique vers le socialisé.",
        0,
      ],
    ],
  },
  {
    pair: [
      "Interactionnisme physique (Jean Piaget)",
      "Interactionnisme social & historico-culturel (Lev Vygotski)",
    ],
    a: "vygotski_piaget",
    crit: "Piaget étudie l'adaptation endogène du sujet agissant sur les objets du monde physique ; Vygotski démontre que toute activité est médiatisée par les interactions humaines asymétriques et les instruments culturels.",
    items: [
      [
        "Analyser comment l'enfant coordonne ses schèmes moteurs en manipulant des objets matériels pour construire la logique formelle.",
        0,
      ],
      [
        "Démontrer que le développement s'effectue par la médiation d'un adulte plus compétent véhiculant les instruments symboliques de la société.",
        1,
      ],
      [
        "Accorder le primat absolu au processus d'équilibration entre assimilation et accommodation de l'objet.",
        0,
      ],
      [
        "Formuler la loi selon laquelle toute fonction psychique supérieure apparaît d'abord sur le plan interpsychologique.",
        1,
      ],
    ],
  },
  {
    pair: [
      "Contenance & Pare-excitation (Sigmund Freud / Donald Winnicott)",
      "Appareil à penser les pensées (Wilfred R. Bion)",
    ],
    a: "vygotski_piaget",
    crit: "Freud et Winnicott théorident le filtre protecteur externe et le maintien affectif face aux excitations brutes ; Bion théorise l'instrument mental maternel qui métabolise activement les éléments bêta impensables en éléments alpha symbolisables.",
    items: [
      [
        "Créer une barrière protectrice pour amortir l'intrusion des pulsions et stimuli chaotiques externes chez le nourrisson.",
        0,
      ],
      [
        "Transformer par la rêverie maternelle les sensations brutes en représentations utilisables pour la pensée et les rêves.",
        1,
      ],
      [
        "Observer le jeu de la bobine (Fort/Da) pour surmonter l'angoisse de séparation maternelle.",
        0,
      ],
      [
        "Prêter au bébé un appareil de transformation psychique pour qu'il acquière sa propre capacité d'élaboration.",
        1,
      ],
    ],
  },
  {
    pair: [
      "Agir stratégique (Succès & Instrumentalisation)",
      "Agir communicationnel (Entente & Verständigung)",
    ],
    a: "habermas",
    crit: "L'agir stratégique est orienté vers l'efficacité et l'influence unilatérale sur autrui considéré comme un moyen ; l'agir communicationnel vise un accord rationnellement motivé entre sujets égaux (Habermas).",
    items: [
      [
        "Un directeur qui formule un discours trompeur pour imposer un plan social déjà acté.",
        0,
      ],
      [
        "Une équipe pluridisciplinaire qui débat des critères de qualité du service pour convenir d'une règle commune.",
        1,
      ],
      [
        "Utiliser la communication interne comme un outil de manipulation du moral des salariés.",
        0,
      ],
      [
        "Soumettre une consigne organisationnelle à l'examen critique des 4 prétentions à la validité.",
        1,
      ],
    ],
  },
  {
    pair: [
      "Pouvoir interne des mots (Austin / Linguistes)",
      "Conditions sociales de l'institution (Pierre Bourdieu)",
    ],
    a: "bourdieu",
    crit: "Austin croit que le pouvoir d'agir réside dans la forme magique de l'énoncé ; Bourdieu démontre que l'efficacité performative provient exclusivement du mandat délégué par l'institution au locuteur autorisé.",
    items: [
      [
        "Penser qu'une formule magique ou un slogan publicitaire possède en lui-même le pouvoir de convaincre.",
        0,
      ],
      [
        "Montrer que le verdict du juge tire sa force de la délégation du Code pénal et de l'appareil judiciaire ('Status est magistratus').",
        1,
      ],
      [
        "Analyser la force d'une déclaration royale à travers le rituel politique du lit de justice.",
        1,
      ],
      [
        "Affirmer que l'insulte blesse uniquement à cause de la violence phonétique des syllabes prononcées.",
        0,
      ],
    ],
  },
  {
    pair: [
      "Idéologie de l'Employabilité (Ciblage déficitaire)",
      "Méthode IOD de Francis Valls (Intervention sur l'offre)",
    ],
    a: "valls_iod",
    crit: "L'approche par l'employabilité oblige les exclus à se former et s'adapter sans fin en les culpabilisant ; la méthode IOD refuse le tri, considère la personne immédiatement employable et négocie le poste avec l'entreprise.",
    items: [
      [
        "Multiplier les bilans de compétences et ateliers CV pour 'réparer' les demandeurs d'emploi avant toute embauche.",
        0,
      ],
      [
        "Rencontrer les dirigeants d'entreprises locales pour adapter les conditions réelles de l'offre d'emploi à un public précaire.",
        1,
      ],
      [
        "Pratiquer le refus déontologique absolu du tri et de la sélection préalable des candidats.",
        1,
      ],
      [
        "Considérer le chômeur comme responsable individuel de son inemployabilité sur le marché.",
        0,
      ],
    ],
  },
  {
    pair: [
      "Sphère Juridique du Droit (Respect de soi)",
      "Sphère Sociale de la Solidarité (Estime de soi)",
    ],
    a: "honneth",
    crit: "La sphère juridique confère l'égalité statutaire universelle (citoyenneté, CDI) ; la sphère sociale reconnaît la valeur singulière et la contribution concrète du métier au sein de la communauté (Honneth).",
    items: [
      [
        "L'attribution d'un contrat de travail légal conforme au Code du travail et l'accès aux droits sociaux.",
        0,
      ],
      [
        "La reconnaissance par les pairs et le management de l'utilité irremplaçable du savoir-faire d'un artisan ou soignant.",
        1,
      ],
      [
        "Le mépris vécu sous la forme d'une discrimination à l'embauche ou d'une privation de droits civiques.",
        0,
      ],
      [
        "Le mépris vécu comme invisibilité de son travail et dévalorisation publique de sa profession.",
        1,
      ],
    ],
  },
];

export const CLOZE: [string, (string | { h: string })[]][] = [
  [
    "bourdieu",
    [
      "Selon Pierre Bourdieu, le pouvoir des mots ne réside pas dans le langage, mais dans l'autorité déléguée par l'",
      { h: "institution" },
      " : status est ",
      { h: "magistratus" },
      ".",
    ],
  ],
  [
    "bourdieu",
    [
      "Dans 'Ce que parler veut dire', les échanges verbaux s'organisent comme un véritable ",
      { h: "marché" },
      " linguistique procurant un profit de ",
      { h: "distinction" },
      ".",
    ],
  ],
  [
    "bourdieu",
    [
      "Le rituel du lit de ",
      { h: "justice" },
      " analysé par Sarah Hanley symbolise la parole souveraine qui annule toute contestation.",
    ],
  ],
  [
    "habermas",
    [
      "L'agir communicationnel de Jürgen Habermas est orienté vers l'",
      { h: "entente" },
      " rationnelle, appelée ",
      { h: "verständigung" },
      " en allemand.",
    ],
  ],
  [
    "habermas",
    [
      "Tout acte de parole visant l'entente engage 4 prétentions à la ",
      { h: "validité" },
      " : intelligibilité, vérité, justesse et ",
      { h: "sincérité" },
      ".",
    ],
  ],
  [
    "habermas",
    [
      "La situation ",
      { h: "idéale" },
      " de parole repose sur la force sans contrainte du ",
      { h: "meilleur" },
      " argument.",
    ],
  ],
  [
    "honneth",
    [
      "Pour Axel Honneth, l'identité repose sur trois sphères de reconnaissance : l'amour, le ",
      { h: "droit" },
      " et l'estime ",
      { h: "sociale" },
      ".",
    ],
  ],
  [
    "honneth",
    [
      "Dans son essai de 2007, Honneth définit la réification comme un ",
      { h: "oubli" },
      " de la reconnaissance originelle d'autrui.",
    ],
  ],
  [
    "valls_iod",
    [
      "La méthode IOD de Francis Valls et Denis Castra refuse l'idéologie de l'",
      { h: "employabilité" },
      " et applique la règle d'or du non-",
      { h: "tri" },
      " des candidats.",
    ],
  ],
  [
    "valls_iod",
    [
      "Dans la méthode IOD, le conseiller intervient en priorité sur l'",
      { h: "offre" },
      " d'emploi et auprès de l'",
      { h: "entreprise" },
      " pour négocier le poste.",
    ],
  ],
  [
    "bourdieu",
    [
      "Selon Éric Lucy (2021), l'efficacité performative de l'",
      { h: "insulte" },
      " s'ancre dans les rapports sociaux de ",
      { h: "domination" },
      ".",
    ],
  ],
  [
    "linguistique",
    [
      "L'hypothèse ethnolinguistique de ",
      { h: "sapir" },
      "-Whorf affirme que la langue structure notre vision du monde.",
    ],
  ],
];

export const REDAC: [string, string[], string][] = [
  [
    "Dissertation 1 : « Le pouvoir des mots réside-t-il dans les mots eux-mêmes ou dans les conditions sociales de leur énonciation ? Discutez en confrontant John Austin et Pierre Bourdieu. »",
    [
      "Introduction : poser la rupture entre la philosophie pragmatique du langage (Austin) et la sociologie critique de la domination symbolique (Bourdieu).",
      "I — La découverte des actes de langage : John Austin et la puissance performative intrinsèque (« quand dire, c'est faire », locutoire, force illocutoire).",
      "II — La critique sociologique de Bourdieu : l'illusion internaliste et le marché linguistique (« Status est magistratus », le capital linguistique, l'acte d'institution et la délégation).",
      "III — Les rituels d'autorité et la violence symbolique : du « lit de justice » (Sarah Hanley) à l'efficacité performative de l'insulte (Éric Lucy).",
      "Conclusion : le pouvoir des mots est une imposture légitime sans l'institution qui délègue l'autorité ; portée pour le psychologue du travail et l'analyse des discours d'entreprise.",
    ],
    "<p>Dans <i>Quand dire, c'est faire</i> (1962), John Austin bousculait la tradition philosophique en démontrant que parler ne consiste pas seulement à décrire le monde, mais à accomplir un acte modifiant la réalité. Pourtant, vingt ans plus tard, Pierre Bourdieu répliquait avec force dans <i>Ce que parler veut dire</i> (1982) que chercher le pouvoir des mots dans la linguistique relève d'une <b>illusion internaliste</b>. Dès lors, le pouvoir des mots réside-t-il dans leurs propriétés pragmatiques intrinsèques ou dans les conditions sociales et institutionnelles de leur énonciation ?</p><p><b>I. La pragmatique d'Austin : l'énoncé comme acte</b><br/>Austin déconstruit l'illusion purement descriptive du langage en découvrant les <b>énoncés performatifs</b> (« je promets », « je baptise »). Il distingue l'acte locutoire (le contenu sémantique), l'acte <b>illocutoire</b> (l'acte accompli dans la parole même : ordonner, prescrire) et l'effet perlocutoire (les réactions psychologiques sur l'interlocuteur). Pour Austin, la réussite de l'acte dépend de « conditions de félicité » conventionnelles, mais la force agissante reste logée au cœur de la formule énoncée.</p><p><b>II. La critique sociologique de Bourdieu : « Status est magistratus »</b><br/>Bourdieu opère un renversement décisif : le pouvoir n'appartient jamais aux mots, il appartient aux <b>institutions sociales</b>. Sur le <b>marché linguistique</b>, la compétence n'est pas une aptitude neutre, mais un capital linguistique conférant un profit de distinction. L'efficacité performative ne découle pas de la grammaire, mais de l'autorité statutaire du locuteur (*Status est magistratus*). C'est parce que le prêtre, le juge ou le directeur est mandaté par un corps institué qu'il peut transformer le réel par sa parole. La langue dominante tire sa force du monopole de la violence symbolique légitime.</p><p><b>III. Les rituels d'État et la violence symbolique contemporaine</b><br/>Cette institutionnalisation de la parole culmine dans le rituel du <b>« lit de justice »</b> (Sarah Hanley) où la présence physique du monarque impose sa loi et éteint toute délibération parlementaire. Dans le monde contemporain, Éric Lucy (2021) prolonge Bourdieu en analysant <b>l'efficacité performative de l'insulte</b> : l'injure ne blesse que parce qu'elle réactive des hiérarchies objectives et des stigmates déjà institués dans le champ social.</p><p><b>Conclusion :</b> Le psychologue du travail doit résister à l'illusion techniciste qui voudrait résoudre les conflits par de simples « ateliers de communication bienveillante ». Le pouvoir des mots étant indissociable des rapports de pouvoir institutionnels, transformer la parole au travail exige d'intervenir sur l'organisation réelle du travail et la démocratisation des espaces de délibération.</p>",
  ],
  [
    "Dissertation 2 : « L'agir communicationnel et l'éthique de la discussion de Jürgen Habermas peuvent-ils refonder le management et démocratiser l'organisation du travail ? »",
    [
      "Introduction : la crise du management par les chiffres, la perte de sens et l'intérêt de la Théorie de l'agir communicationnel (1981) d'Habermas.",
      "I — De l'agir stratégique à l'agir communicationnel : opposer le management par l'injonction instrumentale (succès, manipulation) à la coordination par l'entente (Verständigung).",
      "II — La grammaire de la délibération : les 4 prétentions universelles à la validité (intelligibilité, vérité, justesse, sincérité) et la situation idéale de parole sans contrainte.",
      "III — Applications et limites organisationnelles : la compétence délibérative (Duchamp & Koëhl, Calori) face aux contraintes du marché et à la tentation du cynisme managérial.",
      "Conclusion : l'éthique de la discussion comme horizon démocratique et levier clinique de santé mentale au travail.",
    ],
    "<p>Face à la bureaucratisation néolibérale et au management par le reporting chiffré, le monde du travail traverse une crise profonde de légitimité. Dans ce contexte, la <i>Théorie de l'agir communicationnel</i> (1981) de Jürgen Habermas offre un cadre conceptuel puissant pour repenser les pratiques de communication professionnelle. L'agir communicationnel et l'éthique de la discussion peuvent-ils refonder le management contemporain et réhabiliter la démocratie au travail ?</p><p><b>I. La critique de la rationalité instrumentale et l'émergence de l'agir communicationnel</b><br/>Habermas distingue radicalement deux rationalités. D'une part, l'<b>agir stratégique</b> est orienté vers le succès (*Erfolg*) : le manager y traite les salariés comme des variables d'ajustement ou des instruments d'influence. D'autre part, l'<b>agir communicationnel</b> est orienté vers l'<b>entente mutuelle</b> (*Verständigung*) : les acteurs y coordonnent leurs actions par un accord rationnellement motivé, où chacun accepte de soumettre ses propositions à la critique collective.</p><p><b>II. Les 4 prétentions à la validité et la situation idéale de parole</b><br/>L'agir communicationnel repose sur une éthique rigoureuse : tout locuteur prétendant à l'entente engage la compréhensibilité de ses propos, la vérité des faits objectifs, la justesse normative des règles et la sincérité de son engagement. Dans la <b>situation idéale de parole</b> (*ideale Sprechsituation*), aucun rapport hiérarchique ne doit faire taire autrui : seule s'exerce la « force sans contrainte du meilleur argument ». Selon le <b>Principe D</b> de l'éthique de la discussion, une décision organisationnelle n'est légitime que si elle peut être validée par l'ensemble des salariés concernés au terme d'un débat argumenté.</p><p><b>III. Épreuves concrètes et compétence délibérative</b><br/>Comme le démontrent Duchamp & Koëhl (2008) et Roland Calori, intégrer l'éthique habermassienne permet de développer la <b>compétence délibérative</b> dans le profil managérial. Loin d'être un frein utopique, l'instauration d'espaces de délibération réglée évite le silence organisationnel pathogène et restaure l'engagement des équipes face au travail réel.</p><p><b>Conclusion :</b> Si le marché économique impose des impératifs systémiques, l'éthique de la discussion prouve que la performance durable ne s'obtient pas par la coercition stratégique, mais par la reconnaissance de la rationalité communicationnelle des travailleurs.</p>",
  ],
  [
    "Dissertation 3 : « La lutte pour la reconnaissance selon Axel Honneth : de la souffrance morale à l'émancipation par le travail. »",
    [
      "Introduction : le paradigme de la reconnaissance chez Axel Honneth en rupture avec les théories purement distributives de la justice sociale.",
      "I — Les 3 sphères d'inter-reconnaissance morale : l'amour (confiance en soi), le droit (respect de soi) et la solidarité sociale / travail (estime de soi).",
      "II — Les formes du mépris social et de la réification : atteinte corporelle, déni de droits, invisibilité du travail et « oubli de la reconnaissance ».",
      "III — La portée en travail social et psychologie du travail : analyse des terrains de grande précarité (Éric Lucy, SAMU social, 2020) et restauration du pouvoir d'agir.",
      "Conclusion : faire de la reconnaissance morale non une gratification managériale superficielle, mais la condition constitutive de l'intégrité humaine.",
    ],
    "<p>Dans <i>La lutte pour la reconnaissance</i> (1992), Axel Honneth révolutionne la théorie critique en affirmant que le ressort fondamental des luttes sociales et de l'équilibre psychique n'est pas seulement la redistribution économique des richesses, mais l'exigence morale de <b>reconnaissance intersubjective</b>. En quoi cette théorie permet-elle de comprendre la souffrance contemporaine au travail et d'ouvrir des voies d'émancipation ?</p><p><b>I. La grammaire des trois sphères de la reconnaissance</b><br/>Pour Honneth, l'identité d'un être humain ne préexiste pas aux relations sociales : elle s'élabore dans trois sphères interconnectées. Dans la <i>sphère intime</i> des liens primaires (amour, amitié), le sujet acquiert la <b>confiance en soi</b>. Dans la <i>sphère juridique</i> de l'État de droit, l'égalité citoyenne et contractuelle fonde le <b>respect de soi</b>. Enfin, dans la <i>sphère sociale</i> de la solidarité et du travail, la valorisation de la contribution productive fonde l'<b>estime de soi</b> (*Selbstschätzung*).</p><p><b>II. La société du mépris et la réification</b><br/>À chaque sphère correspond une blessure morale dévastatrice : l'atteinte corporelle pour la première, le déni de droits pour la seconde, et la disqualification du métier pour la troisième. Lorsque le travail réel est rendu invisible ou méprisé, le sujet éprouve une humiliation intolérable. Dans <i>La Réification</i> (2007), Honneth précise que traiter les travailleurs comme de simples 'coûts' relève d'un <b>« oubli de la reconnaissance »</b> préalable d'autrui comme sujet digne de respect.</p><p><b>III. Pratiques de terrain et réinstitution du sujet</b><br/>Cette clinique de la reconnaissance s'illustre avec force dans les recherches d'Éric Lucy (2020) sur le <b>SAMU social</b> : auprès des personnes sans-abri en état de désaffiliation absolue, la parole partagée en maraude n'est pas un formulaire gestionnaire, c'est un acte de réinstitution du sujet dans la sphère de la dignité humaine.</p><p><b>Conclusion :</b> La reconnaissance au travail ne saurait se réduire aux médailles ou aux compliments superficiels de la communication d'entreprise. Elle exige des garanties de statut (droit) et une considération réelle de l'utilité sociale du métier (solidarité).</p>",
  ],
  [
    "Dissertation 4 : « Dépasser l'idéologie de l'employabilité : en quoi la Méthode IOD (Francis Valls & Denis Castra) refonde-t-elle la psychosociologie de l'insertion ? »",
    [
      "Introduction : la montée des précarités, l'idéologie managériale de l'« employabilité » et la genèse de la méthode IOD (associations ACRIP et TRANSFER à Bordeaux).",
      "I — La critique radicale du ciblage déficitaire : comment la sur-préparation, les bilans infinis et l'individualisation stigmatisent les exclus et renforcent le non-emploi.",
      "II — L'innovation méthodologique IOD : intervenir sur les offres d'emploi et les entreprises (adapter le poste à la personne plutôt que l'inverse).",
      "III — La déontologie de l'intervention : le refus absolu du tri préalable, la médiation directe et la restauration de l'estime de soi sous l'éclairage de Robert Castel (*L'insertion malgré tout*).",
      "Conclusion : l'accès direct au travail de droit commun comme seule issue efficace contre la disqualification sociale.",
    ],
    "<p>Depuis les années 1980, les politiques de lutte contre le chômage ont massivement promu le concept d'<b>« employabilité »</b>, invitant les demandeurs d'emploi à se former, se coacher et s'adapter continuellement pour plaire aux recruteurs. C'est contre cette idéologie individualisante et culpabilisante que Francis Valls et Denis Castra ont élaboré la méthode <b>IOD (*Intervention sur les Offres et les Demandes*)</b>, saluée et préfacée par le sociologue Robert Castel dans <i>L'insertion malgré tout</i> (2007). En quoi l'approche IOD constitue-t-elle une rupture épistémologique et déontologique majeure en psychosociologie de l'insertion ?</p><p><b>I. La déconstruction du ciblage déficitaire</b><br/>L'insertion traditionnelle repose sur un postulat implicite : si une personne est au chômage de longue durée, c'est qu'elle présente un « déficit » (de qualification, de motivation, de savoir-être). Les dispositifs classiques la soumettent à des bilans psychologiques et des stages de préparation successifs. Castra et Valls démontrent que cette sur-préparation infantilisante produit l'effet inverse de celui recherché : elle enferme l'usager dans un statut d'assisté, détruit son estime de soi et renforce la méfiance des employeurs face à des profils étiquetés « fragiles ».</p><p><b>II. Le retournement méthodologique : intervenir sur l'offre d'emploi</b><br/>La rupture IOD consiste à <b>déplacer l'intervention vers l'entreprise et les offres d'emploi</b>. Les conseillers IOD ne reçoivent pas les usagers pour les tester ; ils prospectent les entreprises locales, négocient les profils de poste et convainquent les employeurs d'adapter l'environnement de travail à la personne. Au lieu d'exiger une adaptation unilatérale de l'exclu, IOD négocie avec l'employeur des conditions concrètes d'accueil (tutorat, aménagement d'horaires, tolérance aux maladresses de début).</p><p><b>III. Les règles déontologiques d'une clinique de l'accès direct</b><br/>La méthode IOD repose sur un impératif déontologique non négociable : le <b>refus absolu du tri et de la sélection des candidats</b>. Aucun classement au mérite n'est pratiqué : tout être humain est considéré comme immédiatement prêt à l'emploi. Le médiateur IOD accompagne le salarié directement en poste et sécurise la relation de travail. Comme le souligne Robert Castel, cette démarche court-circuite la désaffiliation sociale en reconnectant directement la personne au statut de travailleur de droit commun.</p><p><b>Conclusion :</b> La méthode IOD de Francis Valls prouve que l'insertion n'est pas une rééducation psychologique des exclus, mais une psychosociologie de la médiation et de la négociation directe sur les conditions réelles du travail.</p>",
  ],
];

export const SIM = [
  {
    key: "mediation_iod",
    title: "Conduire une négociation d'offre d'emploi (Méthode IOD)",
    persona: "Patron de PME locale face à un médiateur IOD (Francis Valls)",
    context:
      "Tu incarnes un psychosociologue intervenant selon la méthode IOD de Francis Valls. Un chef d'entreprise a déposé une offre d'emploi très exigeante (3 ans d'expérience exigés, Bac+2) pour un poste en atelier de logistique. Un jeune sans qualification ni réseau t'est adressé.",
    principes: [
      "Refuser le tri préalable et la sélection des candidats",
      "Intervenir sur l'offre et adapter le poste de travail réel",
      "Refuser la sur-préparation infantilisante (ateliers CV infinis)",
      "Protéger la dignité et restaurer l'estime de soi dans l'emploi direct",
    ],
    steps: [
      {
        worker:
          "Le patron vous accueille d'un ton sec : « Je n'ai pas de temps à perdre avec des cas sociaux. Envoyez-moi vos trois meilleurs CV présélectionnés et je ferai passer des entretiens pour éliminer les fainéants. »",
        prompt:
          "Quelle est votre réponse professionnelle déontologique selon la méthode IOD ?",
        options: [
          {
            label:
              "« Monsieur, notre méthodologie refuse le tri et la mise en concurrence des personnes. Je vous propose de regarder ensemble les gestes réels requis par votre poste, et de vous présenter directement un candidat motivé que nous accompagnerons ensemble durant son intégration. »",
            score: 2,
            fb: "Excellente posture IOD : refus du tri, déconstruction des stéréotypes patronaux et négociation directe sur le travail réel.",
          },
          {
            label:
              "« Très bien, je vais lui faire passer des tests psychométriques et s'il a de bonnes notes, je vous le sélectionnerai. »",
            score: 0,
            fb: "Erreur totale : vous retombez dans l'idéologie déficitaire de l'employabilité et le tri social.",
          },
          {
            label:
              "« D'accord pour les trois CV, mais soyez gentil avec eux car ils ont des traumatismes d'enfance. »",
            score: 0,
            fb: "Posteur doloriste et stigmatisante : vous disqualifiez vos candidats au lieu de les instituer comme professionnels.",
          },
        ],
      },
      {
        worker:
          "Le jeune candidat vous confie avec angoisse avant l'embauche : « J'ai peur, je n'ai aucun diplôme, ils vont voir tout de suite que je ne vaux rien sur leur marché. »",
        prompt:
          "Comment l'accompagnez-vous selon la psychosociologie de la reconnaissance ?",
        options: [
          {
            label:
              "« Ton sentiment d'illégitimité est le produit d'une violence symbolique (Bourdieu) et du mépris social (Honneth). Tu n'as pas de diplôme, mais tu as une pleine capacité d'apprentissage. Le poste a été négocié pour toi : tu y vas en tant que salarié à part entière. »",
            score: 2,
            fb: "Parfait : déconstruction sociologique du syndrome d'illégitimité et restauration de l'estime de soi par le statut de droit commun.",
          },
          {
            label:
              "« C'est vrai que ton niveau est très faible, on va te remettre en stage d'alphabétisation pendant 6 mois pour compenser tes manques. »",
            score: 0,
            fb: "Piège du ciblage déficitaire : vous validez sa stigmatisation et reculez son accès à l'emploi.",
          },
        ],
      },
    ],
  },
];

export const CASES = [
  {
    vignette:
      "Dans une entreprise de services, la direction décide d'imposer un nouveau système de surveillance des communications numériques. Lors d'une réunion de présentation, le DRH déclare : « Cette mesure a été validée par la direction générale pour la performance, il n'y a pas lieu d'en débattre. Vous devez signer l'avenant aujourd'hui. » Un malaise intense et un silence pesant s'installent dans l'auditoire.",
    q1: {
      prompt:
        "Comment qualifier cette situation sous l'angle théorique de Jürgen Habermas et Pierre Bourdieu ?",
      options: [
        {
          label:
            "Un agir stratégique autoritaire s'appuyant sur un rituel de 'lit de justice' (Bourdieu) qui bafoue les prétentions à la validité et nie l'agir communicationnel (Habermas)",
          ok: true,
          fb: "Exactement : la parole hiérarchique impose son décret sans délibération (lit de justice) et détruit les conditions de l'entente rationnelle.",
        },
        {
          label:
            "Une communication bienveillante et transparente qui informe les salariés avec efficacité",
          ok: false,
          fb: "Non : il n'y a aucune bienveillance ni entente, c'est une imposition unilatérale coercitive.",
        },
        {
          label: "Un simple quiproquo sémantique lié au choix des mots du DRH",
          ok: false,
          fb: "Piège : on réduit un rapport de domination institutionnelle à une question de vocabulaire.",
        },
      ],
    },
    q2: {
      prompt:
        "Quelle intervention le psychologue du travail doit-il promouvoir ?",
      options: [
        {
          label:
            "Rétablir un cadre de délibération conforme à l'éthique de la discussion (Habermas), permettant de soumettre la prescription au débat sur sa justesse normative et ses effets réels",
          ok: true,
          fb: "Parfait : restaurer la compétence délibérative et la démocratie participative au travail.",
        },
        {
          label:
            "Donner des cours de gestion du stress pour que les salariés signent sans angoisse",
          ok: false,
          fb: "Non : c'est une dérive d'adaptation complice de la domination managériale.",
        },
      ],
    },
  },
  {
    vignette:
      "Une structure d'insertion sociale accueille des personnes sans-abri orientées par le 115. Le financeur public demande aux travailleurs sociaux de faire passer un 'test de rentabilité professionnelle' aux usagers et d'exclure les 30 % les moins performants pour préserver les subventions.",
    q1: {
      prompt:
        "À quelle pathologie morale et institutionnelle selon Axel Honneth ce projet correspond-il ?",
      options: [
        {
          label:
            "À une 'réification' (oubli de la reconnaissance préalable) et à un mépris social institutionnel qui nie la dignité des personnes",
          ok: true,
          fb: "Oui : traiter des personnes désaffiliées comme des variables d'ajustement comptable est la définition même de la réification morale chez Honneth.",
        },
        {
          label:
            "À une démarche normale de bonne gestion des deniers publics sans impact humain",
          ok: false,
          fb: "Non : cela détruit le mandat social et la relation d'aide.",
        },
      ],
    },
    q2: {
      prompt:
        "Quelle posture inspirée de la Méthode IOD (Francis Valls) et des recherches d'Éric Lucy doit être adoptée ?",
      options: [
        {
          label:
            "Opposer le refus déontologique absolu du tri préalable, défendre la valeur inconditionnelle de la parole en travail social (Lucy) et négocier directement des accès à l'emploi de droit commun (Valls & Castra)",
          ok: true,
          fb: "Excellente réponse : défense de la déontologie IOD et de la reconnaissance humaine.",
        },
        {
          label:
            "Accepter le tri en secret pour toucher les subventions de l'État",
          ok: false,
          fb: "Faute déontologique grave et négation de la mission du travail social.",
        },
      ],
    },
  },
];

export const FRISE_DATA = [
  {
    annee: "1934",
    titre: "Karl Bühler — Sprachtheorie",
    desc: "Théorie de l'organon : tout signe linguistique remplit simultanément les trois fonctions de représentation (monde), expression (sujet) et appel (autrui).",
  },
  {
    annee: "1958",
    titre: "Edward Sapir & Benjamin Lee Whorf — Ethnolinguistique",
    desc: "Formulation de l'hypothèse Sapir-Whorf : le système linguistique d'une communauté façonne sa vision culturelle du monde et ses catégories de pensée.",
  },
  {
    annee: "1962",
    titre:
      "John L. Austin — Quand dire, c'est faire (How to do things with words)",
    desc: "Découverte des énoncés performatifs et distinction des actes locutoires, illocutoires et perlocutoires en pragmatique.",
  },
  {
    annee: "1981",
    titre: "Jürgen Habermas — Théorie de l'agir communicationnel",
    desc: "Opposition entre agir stratégique (succès) et agir communicationnel (entente rationnelle). Formalisation des 4 prétentions à la validité.",
  },
  {
    annee: "1982",
    titre: "Pierre Bourdieu — Ce que parler veut dire",
    desc: "L'économie des échanges linguistiques : critique d'Austin, le marché linguistique, l'autorité statutaire ('Status est magistratus') et le lit de justice (Sarah Hanley).",
  },
  {
    annee: "1992",
    titre: "Axel Honneth — La lutte pour la reconnaissance",
    desc: "Théorisation des trois sphères d'inter-reconnaissance morale : l'amour (confiance en soi), le droit (respect de soi) et la solidarité sociale (estime de soi).",
  },
  {
    annee: "2007",
    titre:
      "Denis Castra & Francis Valls — L'insertion malgré tout (Méthode IOD)",
    desc: "Préface de Robert Castel. Rupture avec l'idéologie de l'employabilité, refus du tri préalable et négociation directe sur les offres d'emploi en entreprise.",
  },
  {
    annee: "2020-2021",
    titre: "Éric Lucy — Recherches sur la reconnaissance et l'insulte",
    desc: "Articles fondateurs : 'Discussion et reconnaissance en SAMU Social' (2020) et 'Les conditions sociales de l'efficacité performative de l'insulte' (2021).",
  },
];

export const NODES = {
  matiere: {
    label: "Le Langage comme Fait Social (PST108)",
    s: "Langage social",
    a: "bourdieu",
    x: 380,
    y: 35,
    links: [
      { to: "bourdieu_node", rel: "Branche 1 : Pouvoir & Domination" },
      { to: "habermas_node", rel: "Branche 2 : Agir & Délibération" },
      { to: "valls_node", rel: "Branche 3 : Insertion & Médiation" },
    ],
  },
  bourdieu_node: {
    label: "Pierre Bourdieu (Marché & Lit de justice)",
    s: "Bourdieu",
    a: "bourdieu",
    x: 180,
    y: 130,
    links: [
      { to: "insulte_node", rel: "actualisé par É. Lucy dans" },
      { to: "institution_node", rel: "fonde l'autorité dans" },
    ],
  },
  institution_node: {
    label: "« Status est magistratus » & Acte d'institution",
    s: "Institution",
    a: "bourdieu",
    x: 80,
    y: 230,
    links: [],
  },
  insulte_node: {
    label: "Performativité de l'insulte (Éric Lucy, 2021)",
    s: "Insulte Lucy",
    a: "bourdieu",
    x: 230,
    y: 230,
    links: [],
  },
  habermas_node: {
    label: "Jürgen Habermas (Agir communicationnel)",
    s: "Habermas",
    a: "habermas",
    x: 480,
    y: 130,
    links: [
      { to: "validite_node", rel: "s'articule autour des" },
      { to: "honneth_node", rel: "prolongé moralement par" },
    ],
  },
  validite_node: {
    label: "4 Prétentions à la Validité & Éthique D",
    s: "Validité",
    a: "habermas",
    x: 400,
    y: 230,
    links: [],
  },
  honneth_node: {
    label: "Axel Honneth (3 Sphères de Reconnaissance)",
    s: "Honneth",
    a: "honneth",
    x: 580,
    y: 230,
    links: [{ to: "samu_node", rel: "appliqué sur le terrain par" }],
  },
  samu_node: {
    label: "Discussion en SAMU Social (Éric Lucy, 2020)",
    s: "SAMU Lucy",
    a: "honneth",
    x: 580,
    y: 330,
    links: [],
  },
  valls_node: {
    label: "Francis Valls & D. Castra (Méthode IOD)",
    s: "Méthode IOD",
    a: "valls_iod",
    x: 750,
    y: 130,
    links: [
      { to: "refus_tri", rel: "règle d'or :" },
      { to: "offre_node", rel: "action prioritaire :" },
    ],
  },
  refus_tri: {
    label: "Refus du tri préalable & Non-sélection",
    s: "Non-tri",
    a: "valls_iod",
    x: 720,
    y: 230,
    links: [],
  },
  offre_node: {
    label: "Intervention sur l'offre d'emploi (Robert Castel)",
    s: "Offre & Castel",
    a: "valls_iod",
    x: 820,
    y: 330,
    links: [],
  },
};

export const PROTO = [
  {
    n: 1,
    t: "Cadrage déontologique et refus du tri",
    role: "Posture éthique",
    d: "Poser le cadre non discriminatoire : refuser le tri managérial ou le ciblage déficitaire des exclus (principes Valls & Lucy).",
  },
  {
    n: 2,
    t: "Analyse du marché linguistique et des asymétries",
    role: "Diagnostic sociologique",
    d: "Repérer les rapports de domination symbolique, les censures et les inégalités de capital linguistique au sein de l'organisation (Bourdieu).",
  },
  {
    n: 3,
    t: "Identification des agirs stratégiques et des blocages",
    role: "Analyse communicationnelle",
    d: "Mettre au jour les manipulations instrumentales descendantes (injonctions, fausses concertations de type 'lit de justice').",
  },
  {
    n: 4,
    t: "Instauration de la situation de parole délibérative",
    role: "Dispositif habermassien",
    d: "Créer un espace protégé où prévaut la force sans violence du meilleur argument, sans censure hiérarchique.",
  },
  {
    n: 5,
    t: "Examen des 4 prétentions à la validité",
    role: "Confrontation rationnelle",
    d: "Soumettre les prescriptions au crible de l'intelligibilité, de la vérité factuelle, de la justesse normative et de la sincérité des acteurs.",
  },
  {
    n: 6,
    t: "Négociation concrète sur le travail réel (Méthode IOD)",
    role: "Intervention sur l'offre",
    d: "Négocier directement avec les employeurs l'aménagement des postes et les conditions réelles d'exercice pour les publics fragilisés (Francis Valls).",
  },
  {
    n: 7,
    t: "Capitalisation de la reconnaissance mutuelle et pérennisation",
    role: "Restauration morale",
    d: "Valider la restauration de l'estime de soi des travailleurs dans le collectif et formaliser des accords légitimes durables.",
  },
];

export const PARCOURS = [
  {
    key: "phase1",
    titre: "1. Pouvoir symbolique & Marché linguistique (Bourdieu)",
    fenetre: "J-30 → J-21",
    but: "Maîtriser Pierre Bourdieu (Ce que parler veut dire), le lit de justice et l'article d'Éric Lucy sur l'insulte.",
    onglets: [
      ["fiches", "Fiches 1 à 5"],
      ["cartes", "Cartes Bourdieu & Pouvoir"],
      ["qui", "Qui a dit quoi ?"],
    ],
    taches: [
      "Assimiler la critique d'Austin : les conditions sociales de l'efficacité performative (Status est magistratus)",
      "Retenir le rituel du lit de justice de Sarah Hanley et sa portée symbolique",
      "Étudier l'article d'Éric Lucy (2021) sur l'efficacité performative de l'insulte",
    ],
  },
  {
    key: "phase2",
    titre: "2. L'Agir communicationnel & la Délibération (Habermas)",
    fenetre: "J-20 → J-12",
    but: "Dominer la Théorie de l'agir communicationnel et l'éthique de la discussion en organisation.",
    onglets: [
      ["fiches", "Fiches 6 à 9"],
      ["distinguer", "Agir stratégique vs Agir communicationnel"],
      ["antiseche", "Tableau Habermas"],
    ],
    taches: [
      "Apprendre par cœur les 4 prétentions à la validité (intelligibilité, vérité, justesse, sincérité)",
      "Comprendre la situation idéale de parole et le principe D",
      "Mobiliser la compétence délibérative managériale (Duchamp & Koëhl)",
    ],
  },
  {
    key: "phase3",
    titre: "3. Reconnaissance (Honneth) & Méthode IOD (Francis Valls)",
    fenetre: "J-11 → J-5",
    but: "Intégrer les 3 sphères d'Axel Honneth et l'approche IOD de Francis Valls & Denis Castra.",
    onglets: [
      ["fiches", "Fiches 10 à 15"],
      ["qcm", "QCM Honneth & IOD"],
      ["cas", "Études de cas SAMU social & insertion"],
    ],
    taches: [
      "Distinguer confiance en soi (amour), respect de soi (droit) et estime de soi (solidarité/travail)",
      "Maîtriser l'article d'Éric Lucy (2020) sur la discussion en SAMU social",
      "Apprendre les règles d'or de la méthode IOD de Francis Valls (refus du tri, négociation de l'offre, Robert Castel)",
    ],
  },
  {
    key: "phase4",
    titre: "4. Entraînement Rédactionnel & Examen Blanc",
    fenetre: "J-4 → Jour J",
    but: "Rédiger des dissertations parfaites selon les critères de M. Lucy et M. Valls.",
    onglets: [
      ["redac", "Sujets de dissertation rédigés"],
      ["examen", "Simulateur d'examen blanc"],
      ["antiseche", "Matrices de synthèse"],
    ],
    taches: [
      "S'entraîner à reproduire de mémoire les tableaux de Bourdieu, Habermas, Honneth et Valls",
      "Rédiger un plan détaillé opposant Austin et Bourdieu ou Habermas et le management par le chiffre",
      "Valider la posture éthique et la déontologie du psychosociologue",
    ],
  },
];

export const ATELIER_SUJETS = [
  {
    t: "Sujet 1 : « Le pouvoir des mots vient-il des mots ou des institutions qui les autorisent ? » (Austin vs Bourdieu)",
    grid: [
      "Poser la rupture entre la philosophie analytique du langage (Austin) et la sociologie de la domination symbolique (Bourdieu)",
      "Développer les actes de langage d'Austin : performatif, force illocutoire et conditions conventionnelles de félicité",
      "Déployer la critique sociologique de Bourdieu : le marché linguistique et 'Status est magistratus'",
      "Mobiliser le rituel politique du 'lit de justice' (Sarah Hanley) comme paroxysme de la parole royale instituée",
      "Illustrer avec l'analyse de l'insulte par Éric Lucy (Empan, 2021) comme violence symbolique ancrée dans des rapports de domination",
      "Conclure sur la posture du psychologue du travail : agir sur l'organisation et non par de simples incantations discursives",
    ],
    corrige:
      "<p>Une copie d'excellence articule la découverte linguistique du performatif chez Austin avec la critique sociologique radicale de Bourdieu. Elle mobilise les concepts de marché linguistique, de capital linguistique et de lit de justice (Sarah Hanley), et convoque les travaux d'Éric Lucy sur l'insulte pour prouver que l'efficacité d'un énoncé est indissociable des rapports sociaux dans lesquels il prend racine.</p>",
  },
  {
    t: "Sujet 2 : « L'agir communicationnel et l'éthique de la discussion peuvent-ils transformer le travail ? » (Habermas)",
    grid: [
      "Définir l'agir stratégique/instrumental orienté vers le succès (Erfolg) face à l'agir communicationnel orienté vers l'entente (Verständigung)",
      "Détailler les 4 prétentions universelles à la validité : intelligibilité, vérité, justesse normative et sincérité",
      "Expliciter l'éthique de la discussion (Principe D et Principe U) et la situation idéale de parole sans contrainte",
      "Mobiliser les travaux sur la compétence délibérative en management (Duchamp & Koëhl, Roland Calori)",
      "Discuter les obstacles concrets : le silence organisationnel et le cynisme managérial",
      "Conclure sur le rôle du psychologue comme garant d'un espace de controverse démocratique légitime",
    ],
    corrige:
      "<p>Ce sujet demande de confronter la rationalité instrumentale du management néolibéral à la rationalité communicationnelle d'Habermas. La copie doit présenter avec rigueur les 4 prétentions à la validité et démontrer que la délibération collective n'est pas une utopie mais la condition même de la santé mentale et de la performance durable.</p>",
  },
  {
    t: "Sujet 3 : « La Méthode IOD : rupture avec l'employabilité et psychosociologie de l'insertion » (Francis Valls & Denis Castra)",
    grid: [
      "Présenter la méthode IOD créée par Francis Valls et Denis Castra, préfacée par Robert Castel (L'insertion malgré tout, 2007)",
      "Déconstruire l'idéologie classique de l'employabilité et le piège du ciblage déficitaire des exclus",
      "Expliquer le retournement méthodologique : intervenir sur les offres d'emploi et auprès des entreprises plutôt que de sur-préparer le candidat",
      "Exposer les 4 règles déontologiques IOD : refus du tri, non-sélection, accès direct à l'emploi et médiation en entreprise",
      "Lier avec les concepts de désaffiliation (Castel) et de disqualification sociale (Paugam)",
      "Conclure sur la restauration de l'estime de soi par le statut de droit commun de travailleur",
    ],
    corrige:
      "<p>La copie doit valoriser la spécificité bordelaise de l'approche de Francis Valls : la rupture avec l'insertion punitive ou infantilisante. Elle montre comment l'action sur le travail réel et le refus du tri réhabilitent la citoyenneté des exclus sans passer par des bilans de compétences culpabilisants.</p>",
  },
];

export const RECITS = [
  {
    a: "bourdieu",
    ic: "[BOURDIEU]",
    t: "Le lit de justice managérial et l'imposition du reporting",
    sub: "Quand la parole du chef suspend la délibération du collectif",
    parts: [
      {
        beat: "L'irruption de l'autorité instituée",
        html: "Dans une grande administration, les chefs de bureau débattent depuis deux mois de la réorganisation du service. Le Directeur Général entre à l'improviste, s'assoit au centre de la table et déclare : « La réforme est arrêtée par le ministère, les arbitrages sont clos, vous devez appliquer la grille dès lundi ». En quelques secondes, le débat s'éteint.",
      },
      {
        beat: "L'analyse sociologique du lit de justice",
        html: "Cette scène reproduit le <b>lit de justice</b> monarchique décrit par Sarah Hanley et théorisé par Pierre Bourdieu. Le Directeur Général n'a pas convaincu par des arguments rationnels : il a imposé la volonté de l'institution. C'est l'incarnation pure de la maxime <i>Status est magistratus</i>.",
      },
      {
        beat: "Les effets de censure et de violence symbolique",
        html: "Les agents s'autocensurent et intériorisent leur impuissance. Le pouvoir des mots n'a pas résidé dans la vérité de la réforme, mais dans la délégation de pouvoir régalienne qui réduit le collectif au silence.",
      },
    ],
  },
  {
    a: "habermas",
    ic: "[HABERMAS]",
    t: "De l'injonction stratégique à l'entente communicationnelle",
    sub: "Restaurer les 4 prétentions à la validité dans une équipe soignante",
    parts: [
      {
        beat: "L'injonction instrumentale destructrice",
        html: "Dans un hôpital gériatrique, la direction envoie une note de service : « Pour des raisons de rentabilité, chaque toilette doit durer au maximum 12 minutes ». Les soignantes sont révoltées par cette injonction stratégique qui traite le soin comme un produit industriel.",
      },
      {
        beat: "L'ouverture de l'espace délibératif",
        html: "Le psychologue ouvre un cercle de parole fondé sur l'<b>éthique de la discussion</b> d'Habermas. Les soignantes contestent la <i>justesse normative</i> (ce n'est pas digne d'un hôpital humain) et la <i>vérité</i> (un patient âgé ne peut accélérer ses mouvements sans risque de chute).",
      },
      {
        beat: "L'avènement de l'agir communicationnel",
        html: "Face aux arguments étayés des équipes, la cadre de santé reconnaît la sincérité du constat. Ensemble, elles élaborent une nouvelle grille modulable basée sur l'état de dépendance réel des résidents : l'entente (*Verständigung*) l'a emporté sur la contrainte.",
      },
    ],
  },
  {
    a: "valls_iod",
    ic: "[VALLS-IOD]",
    t: "L'insertion sans tri : la négociation de l'offre d'emploi",
    sub: "La méthode IOD appliquée face au scepticisme d'un patron",
    parts: [
      {
        beat: "Le refus de la sur-préparation infantilisante",
        html: "Karim, 24 ans, sans diplôme et sans expérience, est au chômage depuis 2 ans. Les dispositifs classiques voulaient lui faire refaire un bilan d'orientation. Le conseiller IOD refuse : « Karim est prêt au travail, c'est l'entreprise qu'il faut mobiliser ».",
      },
      {
        beat: "La négociation directe sur l'offre d'emploi",
        html: "Le conseiller IOD rencontre un garagiste local qui cherche un magasinier mais exige 3 ans d'expérience. Le conseiller négocie les conditions d'accueil : tutorat du chef d'atelier pendant 1 mois et immersion directe de Karim, sans mise en concurrence avec d'autres candidats.",
      },
      {
        beat: "La réhabilitation de l'estime de soi",
        html: "Embauché dès la première semaine, Karim découvre ses compétences dans le travail réel. Comme l'écrit Robert Castel dans sa préface de l'ouvrage de Francis Valls, l'accès au travail de droit commun a instantanément stoppé la spirale de la désaffiliation.",
      },
    ],
  },
];

export const ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "⓪ Fondements du Langage, Clinique du Dialogue & Développement (Marot / Vygotski / Piaget)",
    headers: [
      "Axe théorique & Auteurs",
      "Thèse centrale & Concepts clés",
      "Implications cliniques au Cnam & Examen",
    ],
    rows: [
      [
        "Lev VYGOTSKI (1896-1934)<br/><i>Pensée et langage</i> (1934/1985)<br/>Préfaces Lucien Sève & Yves Clot",
        "<b>Théorie historico-culturelle :</b> Les fonctions psychiques supérieures sont façonnées par la culture. <b>Loi génétique générale :</b> passage de l'interpsychologique (social) à l'intrapsychologique (individuel). Le langage est l'instrument psychologique régulateur suprême. Trajectoire : <i>Langage social ➔ Égocentrique ➔ Intérieur</i>.",
        "<b>Question d'examen majeure :</b> Le langage égocentrique (exp. des crayons) n'est pas asocial : c'est un outil de raisonnement qui s'intériorise en pensée silencieuse. Rejeter toute disparition du langage égocentrique.",
      ],
      [
        "Jean PIAGET (1896-1980)<br/><i>Structuralisme génétique</i><br/>Débat Royaumont (1975)",
        "<b>La pensée précède le langage :</b> Le langage est le reflet subordonné de la pensée logique. Développement par équilibration continue entre <i>assimilation</i> (action sur l'objet) et <i>accommodation</i> (contrainte du milieu). 4 facteurs (maturation, expérience, social, équilibration). Rejet de l'innéisme.",
        "Pour Piaget, le langage égocentrique est le reflet d'une pensée non décentrée, voué à <b>disparaître</b> avec la socialisation cognitive. Opposition radicale avec Vygotski sur ce devenir.",
      ],
      [
        "Bernard GOLSE & Psychanalyse<br/>Freud (1920), Bion (1962),<br/>Winnicott (1960)",
        "<b>Le langage précède le bébé :</b> L'enfant naît dans un univers symbolique préorganisé qu'il co-construit. 4 fonctions de la pensée : 1. <i>Pare-excitation</i> (Freud/Winnicott) ; 2. <i>Réparation symbolique</i> (Jeu de la bobine Fort/Da, Freud 1920) ; 3. <i>Fonction narcissique</i> ; 4. <i>Tiercéité</i> (passage au tiers paternel).",
        "<b>Attribution rigoureuse :</b> Le prêt d'un « appareil à penser les pensées » provient de Wilfred R. Bion (1962). L'observation du Fort/Da porte sur Ernst (18 mois). Étymologie clinique : <i>klinikê</i> (lit).",
      ],
      [
        "Posture Clinique au Cnam<br/>Yves CLOT (2010)<br/><i>Le travail à cœur</i>",
        "<b>« Transformer pour comprendre » :</b> Refus du diagnostic positiviste préétabli. Le psychologue déploie un dispositif qui transforme la situation dialogique. Instauration de la <b>coopération conflictuelle</b> et de la <b>dispute professionnelle</b> sur les critères du travail bien fait.",
        "Distinction des 3 courants Cnam : Clinique de l'activité (Clot - réel de l'activité, pas de 'boîte noire' ni d'inconscient direct) vs Psychodynamique (Dejours - souffrance/plaisir) vs Psychosociologie.",
      ],
      [
        "Réseau LANGAGE ET TRAVAIL<br/>Boutet, Fraenkel, Girin, Gardin<br/>Fondation 1986 (CNRS)",
        "<b>Le travail devenu communicationnel :</b> Dès 1950, l'évolution technique impose des activités communicationnelles intenses. Dimension <b>multimodale</b> (voix, écrit, geste, espace) et <b>située</b>. Pathologies : surcharge communicationnelle, prescription rigide (centres d'appels).",
        "Distinction 5 niveaux de la langue : Phonétique/Phonologie (sons), Morphologie (morphèmes), Syntaxe (phrases), Sémantique (sens), Pragmatique (contexte d'usage social).",
      ],
    ],
  },
  {
    sectionTitle:
      "① Pierre Bourdieu — Le Marché Linguistique et le Pouvoir Symbolique",
    headers: [
      "Concept théorique",
      "Définition sociologique rigoureuse",
      "Manifestation concrète au travail",
    ],
    rows: [
      [
        "Le Marché Linguistique",
        "Espace structuré d'échanges où les énoncés reçoivent une valeur inégale selon le capital linguistique des locuteurs.",
        "La langue managériale formelle domine et délégitime les expressions populaires ou ouvrières.",
      ],
      [
        "« Status est magistratus »",
        "Le pouvoir d'un énoncé performatif provient du statut institutionnel délégué au locuteur et non des mots eux-mêmes.",
        "Le supérieur qui déclare un travail 'non conforme' tire sa force de son titre hiérarchique, non de sa logique.",
      ],
      [
        "Le « Lit de justice » (Hanley)",
        "Rituel monarchique où la présence physique du souverain éteint immédiatement toute contestation parlementaire.",
        "Le directeur qui coupe court au débat des équipes en annonçant que la décision est irrévocable.",
      ],
      [
        "Performativité de l'insulte (É. Lucy)",
        "L'insulte est une violence symbolique efficace parce qu'elle réactive des hiérarchies et stigmates sociaux déjà constitués.",
        "L'injure verbale visant un précaire réactualise son sentiment d'illégitimité et de disqualification sociale.",
      ],
    ],
  },
  {
    sectionTitle:
      "② Jürgen Habermas — L'Agir Communicationnel et les 4 Prétentions à la Validité",
    headers: [
      "Dimension",
      "Agir Stratégique / Instrumental",
      "Agir Communicationnel (Verständigung)",
    ],
    rows: [
      [
        "Visée fondamentale",
        "Le succès unilatéral (Erfolg), l'efficacité, l'influence ou la manipulation d'autrui.",
        "L'entente mutuelle (Verständigung) et la coordination coopérative de l'action.",
      ],
      [
        "Statut de l'interlocuteur",
        "Autrui est traité comme un moyen, une ressource ou un obstacle à contourner.",
        "Autrui est reconnu comme un partenaire égal doté de la même rationalité communicative.",
      ],
      [
        "Prétentions à la validité",
        "Dissimulées, manipulées ou imposées par la force du pouvoir hiérarchique.",
        "Explicites et discutables : Intelligibilité, Vérité factuelle, Justesse normative, Sincérité.",
      ],
      [
        "Situation de parole",
        "Asymétrique, dominée par les rapports de force et la censure institutionnelle.",
        "Situation idéale de parole : affranchie de la contrainte, primauté du meilleur argument.",
      ],
    ],
  },
  {
    sectionTitle:
      "③ Axel Honneth — Les 3 Sphères de Reconnaissance et la Société du Mépris",
    headers: [
      "Sphère de reconnaissance",
      "Rapport pratique à soi",
      "Forme d'inter-reconnaissance",
      "Forme de mépris social subie",
    ],
    rows: [
      [
        "1. Sphère Intime (Affective)",
        "Confiance en soi (Selbstvertrauen)",
        "Amour, amitié, sollicitude relationnelle première",
        "Atteinte à l'intégrité physique et psychique (violences, maltraitance)",
      ],
      [
        "2. Sphère Juridique (Légale)",
        "Respect de soi (Selbstachtung)",
        "Égalité des droits civiques universels et statut légal",
        "Déni de droits, précarité statutaire, exclusion contractuelle",
      ],
      [
        "3. Sphère Sociale (Solidarité)",
        "Estime de soi (Selbstschätzung)",
        "Reconnaissance de l'utilité sociale du travail et du métier",
        "Invisibilité, disqualification professionnelle, travail méprisé",
      ],
      [
        "La Réification (2007)",
        "Oubli de la reconnaissance",
        "Perception pathologique réduisant autrui à une chose marchande",
        "Management chiffré réduisant les humains à de simples 'variables de coût'",
      ],
    ],
  },
  {
    sectionTitle:
      "④ Francis Valls & Denis Castra — La Méthode IOD face à l'Employabilité",
    headers: [
      "Axe de comparaison",
      "Idéologie de l'Employabilité classique",
      "Méthode IOD (Francis Valls & Denis Castra)",
    ],
    rows: [
      [
        "Diagnostic sur l'exclu",
        "Ciblage déficitaire : la personne 'manque' de compétences et doit être 'réparée'.",
        "Refus du déficit : toute personne est immédiatement employable dans un cadre adapté.",
      ],
      [
        "Cible de l'intervention",
        "Sur l'individu seul : bilans répétés, ateliers CV et stages de remobilisation.",
        "Sur les entreprises et les offres : prospection, négociation du poste et aménagement réel.",
      ],
      [
        "Règle de sélection",
        "Mise en concurrence des candidats et sélection des profils les plus dociles.",
        "Refus déontologique absolu du tri : présentation directe sans compétition artificielle.",
      ],
      [
        "Effet psychosocial",
        "Renforce la stigmatisation, la lassitude et le sentiment d'incompétence (Paugam).",
        "Restaure l'estime de soi par l'intégration rapide dans le salariat de droit commun (Castel).",
      ],
    ],
  },
  {
    sectionTitle:
      "⑤ Boîte à Outils Pragmatique, Ethnolinguistique & Structuralisme",
    headers: [
      "Auteur / Théorie",
      "Concept fondamental",
      "Application concrète à la communication au travail",
    ],
    rows: [
      [
        "John Austin & John Searle",
        "Actes locutoires, illocutoires (force) et perlocutoires (effets) ; énoncés performatifs.",
        "Repérer les injonctions managériales paradoxales qui agissent comme des actes empêchant l'activité.",
      ],
      [
        "Edward Sapir & B.L. Whorf",
        "L'hypothèse ethnolinguistique du relativisme linguistique.",
        "Le vocabulaire managérial (lean, agilité, flexibilité) formate et restreint la perception du travail réel.",
      ],
      [
        "Karl Bühler (Sprachtheorie)",
        "Modèle de l'Organon : Représentation (faits), Expression (émotion), Appel (action).",
        "Analyser un verbatim de salarié pour distinguer l'information transmise de l'appel au secours masqué.",
      ],
      [
        "Noam Chomsky",
        "Compétence linguistique innée universelle vs performance située.",
        "Comprendre que tout travailleur possède la faculté de langage, même si la situation censure sa performance.",
      ],
    ],
  },
  {
    sectionTitle:
      "⑥ Les Travaux d'Éric Lucy — De l'Insulte à la Reconnaissance en SAMU Social",
    headers: [
      "Recherche d'Éric Lucy",
      "Terrain / Publication",
      "Enseignement théorique et clinique pour l'examen",
    ],
    rows: [
      [
        "L'Efficacité performative de l'insulte",
        "Revue Empan (2021) : 'Les conditions sociales de l'efficacité performative de l'insulte'",
        "L'insulte n'est pas un simple écart de langage : c'est un acte de violence symbolique qui mobilise des stigmates sociaux préconstruits pour disqualifier le sujet.",
      ],
      [
        "Discussion et reconnaissance en SAMU Social",
        "Le Sociographe (2020) : 'Discussion et reconnaissance sociale en SAMU social'",
        "L'interaction verbale auprès des sans-abri ne vise pas un fichage administratif, mais la réinstitution du sujet dans l'espace de la reconnaissance morale et de la dignité humaine.",
      ],
      [
        "Processus d'État et panique sanitaire",
        "Revue Rusca (2021) : 'Processus d'État, panique sanitaire et inégalités'",
        "Analyse de la façon dont le discours institutionnel de crise impose des normes descendantes et accentue la précarité des plus vulnérables.",
      ],
      [
        "Médiation comme agir communicationnel",
        "Colloque international de Padoue (2018)",
        "La médiation en travail social n'est pas un compromis gestionnaire, c'est un processus d'inter-reconnaissance et d'agir communicationnel habermassien.",
      ],
    ],
  },
];

export {
  ANNALES_PST108,
  ANNALES_PST108_REDAC_ITEMS,
  METHODE_ANALYSE_PST108,
  CRITERES_EVALUATION_PST108,
  type AnnalePst108Item,
} from "./pst108-annales";

import { ANNALES_PST108, ANNALES_PST108_REDAC_ITEMS } from "./pst108-annales";

export const REDAC_ITEMS: [string, string[], string][] = [
  ...REDAC,
  ...ANNALES_PST108_REDAC_ITEMS,
];

export const EXAM_SUBJECTS = ANNALES_PST108;

export interface Pst108OfficialResource {
  id: string;
  category:
    | "article_prof"
    | "texte_fondateur"
    | "ouvrage_socle"
    | "media_audio_video"
    | "etude_cas";
  categoryLabel: string;
  prof: "M. Éric LUCY" | "M. Francis VALLS" | "Mme Véronique MAROT" | "Collectif Cnam";
  title: string;
  authors: string;
  year: string;
  sourceOrPublisher: string;
  localFile?: string;
  url?: string;
  platformNotice?: string;
  description: string;
  keyTakeaway: string;
  apa7Citation: string;
  tags: string[];
}

export const PST108_OFFICIAL_RESOURCES: Pst108OfficialResource[] = [
  // --- 1. LES ARTICLES & DOSSIERS THÉORIQUES MAJEURS REÇUS DES PROFESSEURS ---
  {
    id: "res-habermas-factualite-validite",
    category: "article_prof",
    categoryLabel: "Texte théorique clé (Envoyé par les profs)",
    prof: "M. Éric LUCY",
    title: "Entre factualité et validité : L'entente comme médium de l'intégration sociale. Caractéristiques du droit moderne",
    authors: "Jürgen Habermas",
    year: "1992 / 1997",
    sourceOrPublisher: "Extrait de Droit et démocratie : Entre faits et normes (Gallimard, trad. R. Rochlitz & C. Bouchindhomme)",
    localFile: "Habermas Entre factualité et validité l’entente comme médium de l’intégration sociale. Caractéristiques du droit.htm",
    platformNotice: "Document officiel transmis par M. Éric Lucy pour approfondir la théorie critique",
    description:
      "Habermas analyse la tension 'explosive' entre la facticité contingente de la réalité sociale (rapports de force, asymétries, contraintes matérielles) et les prétentions idéales à la validité inhérentes au langage. Pour éviter la rupture de l'entente et le repli sur l'agir stratégique, les sociétés modernes s'appuient sur le consensus d'arrière-plan du monde vécu (Lebenswelt) et sur le droit positif moderne, garant institutionnel de l'intégration sociale.",
    keyTakeaway:
      "Thèse d'examen capitale : le dialogue en organisation ne peut reposer uniquement sur la spontanéité morale ; il requiert des garanties institutionnelles et juridiques pour réguler la tension entre impératifs systémiques et prétentions à la validité.",
    apa7Citation:
      "Habermas, J. (1997). Droit et démocratie : Entre faits et normes (R. Rochlitz & C. Bouchindhomme, Trad.). Gallimard. (Ouvrage original publié en 1992).",
    tags: ["Habermas", "Factualité", "Validité", "Droit moderne", "Monde vécu", "Intégration sociale"],
  },
  {
    id: "res-honneth-esquisse-reconnaissance",
    category: "texte_fondateur",
    categoryLabel: "Texte fondateur (Dossier .msg des profs)",
    prof: "M. Éric LUCY",
    title: "La théorie de la reconnaissance : une esquisse",
    authors: "Axel Honneth",
    year: "2004",
    sourceOrPublisher: "Revue du MAUSS, 23(1), 133–136 (traduction française)",
    localFile: "LA THÉORIE DE LA RECONNAISSANCE UNE ESQUISSE par Axel Honneth.msg",
    platformNotice: "Article fondateur d'Axel Honneth envoyé en fichier .msg par M. Lucy",
    description:
      "Texte synthétique où Honneth formalise les piliers de sa sociologie morale. S'appuyant sur l'« autrui généralisé » de George Herbert Mead, il démontre que la formation de l'identité individuelle dépend de l'intériorisation des réponses sociales à l'attente de reconnaissance. Il détaille la tripartition des principes institutionnalisés : l'amour (relations affectives intimes), l'égalité (droits juridiques universels) et le mérite/estime sociale (contribution singulière au travail). La privation de ces relations engendre mépris et humiliation, moteurs des luttes sociales.",
    keyTakeaway:
      "À citer mot à mot à l'examen : l'intégration sociale n'est légitime que si elle garantit des rapports de reconnaissance réciproque authentiques selon les 3 sphères (amour, droit, estime du travail).",
    apa7Citation:
      "Honneth, A. (2004). La théorie de la reconnaissance : une esquisse. Revue du MAUSS, 23(1), 133–136.",
    tags: ["Axel Honneth", "Reconnaissance", "3 sphères", "Amour / Droit / Mérite", "Mead", "Mépris"],
  },
  {
    id: "res-cairn-philosophie-organisation",
    category: "article_prof",
    categoryLabel: "Article Cairn.info (Envoyé par les profs)",
    prof: "M. Éric LUCY",
    title: "Philosophie et développement organisationnel : Dialectique, agir communicationnel, délibération et dialogue",
    authors: "Roland Calori, Véronique Duchamp & Philippe Koëhl",
    year: "2008",
    sourceOrPublisher: "Cairn.info / Recherches en Sciences de Gestion, Économies et Sociétés",
    localFile: "Philosophie et développement organisationnel Dialectique, agir communicationnel, délibération et dialogue Cairn.info.htm",
    url: "https://www.cairn.info",
    platformNotice: "Article de recherche appliqué aux organisations envoyé par les enseignants",
    description:
      "Les auteurs démontrent que le management traditionnel est biaisé par une logique binaire d'identité et un agir stratégique focalisé sur l'exploitation immédiate des ressources. En revanche, l'exploration, l'apprentissage organisationnel, la création de savoirs et la santé des collectifs exigent une logique dialectique (Hegel, Merleau-Ponty) et un agir communicationnel (Habermas) fondé sur la délibération et le dialogue non faussé.",
    keyTakeaway:
      "Argument massue de dissertation : prouver que le dialogue et la délibération habermassienne ne sont pas une 'utopie', mais le moteur le plus performant et le plus innovant du développement organisationnel durable.",
    apa7Citation:
      "Calori, R., Duchamp, V., & Koëhl, P. (2008). Philosophie et développement organisationnel : Dialectique, agir communicationnel, délibération et dialogue. Recherches en Sciences de Gestion, 64, 45–78.",
    tags: ["Cairn.info", "Calori", "Duchamp & Koëhl", "Délibération", "Développement organisationnel", "Dialectique"],
  },
  {
    id: "res-fonteneau-societe-mepris",
    category: "article_prof",
    categoryLabel: "Étude critique & Psychanalyse (Dossier profs)",
    prof: "M. Éric LUCY",
    title: "Axel Honneth : La société du mépris — Critique du néolibéralisme et apport psychanalytique",
    authors: "Françoise Fonteneau",
    year: "2007",
    sourceOrPublisher: "La Cause freudienne, n° 67, 204–209",
    localFile: "axel-honneth-la-societe-du-mepris par F Fonteneau.pdf",
    platformNotice: "Revue psychanalytique transmise dans le pack de ressources d'Éric Lucy",
    description:
      "Françoise Fonteneau met en lumière la singularité d'Axel Honneth face à Habermas : Honneth dépasse le formalisme habermassien aveugle aux souffrances vécues du mépris social. L'article détaille la critique de l'hypocrisie managériale néolibérale où l'injonction à la 'réalisation de soi' et à la 'vocation' produit une autoréification (Selbstverdinglichung) aliénante. Honneth réhabilite la psychanalyse (Freud sur le narcissisme et l'auto-observation, Winnicott sur le holding) pour soigner les pathologies sociales contemporaines.",
    keyTakeaway:
      "Idéal pour lier sociologie critique, management et psychanalyse : l'injonction managériale à être 'entrepreneur de soi-même' constitue un piège d'autoréification et un oubli de la reconnaissance authentique.",
    apa7Citation:
      "Fonteneau, F. (2007). Axel Honneth : La société du mépris. La Cause freudienne, 67(3), 204–209.",
    tags: ["Fonteneau", "Cause freudienne", "Autoréification", "Mépris social", "Psychanalyse", "Winnicott"],
  },
  {
    id: "res-hanley-lit-justice",
    category: "texte_fondateur",
    categoryLabel: "Recherche historique socle (Dossier profs)",
    prof: "M. Éric LUCY",
    title: "Le Lit de justice des rois de France : L'idéologie constitutionnelle dans la légende, le rituel et le discours",
    authors: "Sarah Hanley",
    year: "1991",
    sourceOrPublisher: "Éditions Aubier (trad. A. Charpentier)",
    localFile: "lit de justice Hanley.pdf",
    platformNotice: "Source historiographique directe mobilisée par Pierre Bourdieu",
    description:
      "Étude magistrale du cérémonial monarchique du 'Lit de justice' au Parlement de Paris sous l'Ancien Régime. Lorsque le roi entre en majesté dans l'enceinte parlementaire, sa présence physique fait cesser ipso facto le droit de délibérer des magistrats ('Adveniente principe, cessat magistratus'). Pierre Bourdieu s'appuie directement sur cet ouvrage pour forger son concept d'acte d'institution et la formule 'Status est magistratus' : l'efficacité d'un acte de langage provient du statut de l'orateur conféré par l'institution.",
    keyTakeaway:
      "Exemple canonique pour toute dissertation sur Bourdieu et les actes de parole au travail : le rituel du lit de justice incarne le pouvoir symbolique imposant le silence par l'autorité statutaire.",
    apa7Citation:
      "Hanley, S. (1991). Le Lit de justice des rois de France : L'idéologie constitutionnelle dans la légende, le rituel et le discours. Aubier.",
    tags: ["Sarah Hanley", "Lit de justice", "Bourdieu", "Status est magistratus", "Acte d'institution"],
  },
  {
    id: "res-lucy-insulte-empan",
    category: "article_prof",
    categoryLabel: "Publication de l'enseignant CNAM",
    prof: "M. Éric LUCY",
    title: "Les conditions sociales de l'efficacité performative de l'insulte",
    authors: "Éric Lucy",
    year: "2021",
    sourceOrPublisher: "Revue Empan, 123(3), 48–56 (Érès)",
    localFile: "Les conditions sociales de l’efficacité performative de l’insulte Eric Lucy revue Empan.pdf",
    platformNotice: "Article de recherche publié par votre enseignant de PST108",
    description:
      "Éric Lucy démontre que l'insulte en milieu professionnel ou social n'est pas réductible à un mot violent fortuit ou à une pulsion individuelle : elle tire toute son efficacité blessante des hiérarchies sociales instituées et des stigmates incorporés préexistants. L'injure réactualise violemment un rapport de domination antérieur.",
    keyTakeaway:
      "Référence obligatoire du titulaire de cours : permet d'illustrer la violence symbolique de Bourdieu et la vulnérabilité morale de Honneth dans une situation clinique de harcèlement ou de conflit.",
    apa7Citation:
      "Lucy, É. (2021). Les conditions sociales de l'efficacité performative de l'insulte. Empan, 123(3), 48–56.",
    tags: ["Éric Lucy", "Cnam", "Insulte", "Efficacité performative", "Stigmate social", "Empan"],
  },
  {
    id: "res-lucy-samu-social",
    category: "article_prof",
    categoryLabel: "Publication de l'enseignant CNAM",
    prof: "M. Éric LUCY",
    title: "Discussion et reconnaissance sociale en SAMU social",
    authors: "Éric Lucy",
    year: "2020",
    sourceOrPublisher: "Le Sociographe, 71(3), 67–78 (Champ social)",
    localFile: "Discussion et reconnaissance en SAMU Social E Lucy.pdf",
    platformNotice: "Enquête de terrain clinique menée par votre enseignant de PST108",
    description:
      "À travers une étude de terrain rigoureuse des maraudes auprès des sans-abri, Éric Lucy montre que la discussion entre intervenants sociaux et personnes vulnérables échappe au simple recueil d'informations administratives. Elle constitue un acte clinique de réinstitution du sujet dans l'espace de la reconnaissance morale et de la dignité humaine.",
    keyTakeaway:
      "Démontre que la parole professionnelle de relation d'aide restaure la citoyenneté et la dignité des personnes marginalisées (articulation Habermas / Honneth).",
    apa7Citation:
      "Lucy, É. (2020). Discussion et reconnaissance sociale en SAMU social. Le Sociographe, 71(3), 67–78.",
    tags: ["Éric Lucy", "SAMU social", "Reconnaissance", "Discussion", "Clinique sociale", "Le Sociographe"],
  },
  {
    id: "res-lucy-pratiques-langagieres-mineurs",
    category: "article_prof",
    categoryLabel: "Publication de l'enseignant CNAM",
    prof: "M. Éric LUCY",
    title: "Relations éducatives et pratiques langagières des mineurs dans les réseaux sociaux",
    authors: "Éric Lucy",
    year: "2022",
    sourceOrPublisher: "Le Sociographe, 78(2), 85–96",
    localFile: "Relations éducatives et pratiques langagières des mineurs dans les réseaux sociaux Éric Lucy Sociographe 2022 (N° 78).pdf",
    platformNotice: "Recherche contemporaine de M. Lucy sur les nouveaux espaces de parole",
    description:
      "Analyse des codes langagiers des adolescents sur les plateformes numériques et réseaux sociaux. Examine comment l'écrit numérique reconfigure les rapports de pouvoir, la construction identitaire entre pairs et la posture des professionnels de l'éducation et de la médiation.",
    keyTakeaway:
      "Utile pour aborder la communication numérique, les registres de langage situés et la multimodalité du lien social contemporain.",
    apa7Citation:
      "Lucy, É. (2022). Relations éducatives et pratiques langagières des mineurs dans les réseaux sociaux. Le Sociographe, 78(2), 85–96.",
    tags: ["Éric Lucy", "Sociolinguistique", "Réseaux sociaux", "Adolescence", "Médiation éducative"],
  },
  {
    id: "res-duchamp-koehl-ethique-discussion",
    category: "article_prof",
    categoryLabel: "Article de recherche en management",
    prof: "M. Éric LUCY",
    title: "L'éthique de la discussion au service de la performance organisationnelle",
    authors: "Véronique Duchamp & Philippe Koëhl",
    year: "2008",
    sourceOrPublisher: "Revue internationale de psychosociologie, 14(33), 115–136",
    localFile: "Léthique de la discussion au service de la performance organisationnelle.pdf",
    platformNotice: "Texte managérial distribué pour l'application d'Habermas en entreprise",
    description:
      "Démontre empiriquement comment la mise en place d'arènes délibératives conformes aux critères habermassiens (respect des prétentions de validité, absence de censure) améliore la performance organisationnelle globale en restaurant la confiance et la santé mentale des salariés.",
    keyTakeaway:
      "Permet de récuser l'opposition stérile entre bien-être au travail et rentabilité économique : la délibération collective rationnelle fonde la performance durable.",
    apa7Citation:
      "Duchamp, V., & Koëhl, P. (2008). L'éthique de la discussion au service de la performance organisationnelle. Revue internationale de psychosociologie, 14(33), 115–136.",
    tags: ["Duchamp & Koëhl", "Performance organisationnelle", "Éthique de la discussion", "Habermas"],
  },
  {
    id: "res-france-telecom-lemonde",
    category: "etude_cas",
    categoryLabel: "Étude de cas clinique & managériale",
    prof: "M. Éric LUCY",
    title: "« Les dirigeants de France Télécom se sont mépris sur ce que changer une organisation veut dire »",
    authors: "Le Monde (Rubrique Économie & Emploi)",
    year: "04 octobre 2022",
    sourceOrPublisher: "Journal Le Monde",
    localFile: "Ce que le changement veut dire Le Monde du Le 04 octobre 2022.docx",
    url: "https://www.lemonde.fr/emploi/article/2022/10/04/les-dirigeants-de-france-telecom-se-sont-mepris-sur-ce-que-changer-une-organisation-veut-dire_6144262_1698637.html",
    platformNotice: "Article de presse analytique fourni dans le pack ressources sur le harcèlement institutionnel",
    description:
      "Analyse du procès pénal des dirigeants de France Télécom. Décrypte comment la négation du dialogue professionnel, l'imposition brutale de mobilités forcées et le mépris systématique des compétences ont provoqué une crise de santé publique majeure. L'article prouve les ravages de la réification (considérer les agents comme des 'départs à produire').",
    keyTakeaway:
      "Cas concret d'examen parfait pour illustrer le coût humain et juridique destructeur de la négation de l'agir communicationnel et du déni de reconnaissance.",
    apa7Citation:
      "Le Monde. (2022, 4 octobre). Les dirigeants de France Télécom se sont mépris sur ce que changer une organisation veut dire. Le Monde.",
    tags: ["France Télécom", "Harcèlement institutionnel", "Réification", "Mépris managérial", "Cas clinique"],
  },

  // --- 2. OUVRAGES SOCLES & MONOGRAPHIES TRANSMISES ---
  {
    id: "res-bourdieu-economie-echanges",
    category: "ouvrage_socle",
    categoryLabel: "Ouvrage socle en sociolinguistique",
    prof: "M. Éric LUCY",
    title: "Ce que parler veut dire : L'économie des échanges linguistiques",
    authors: "Pierre Bourdieu",
    year: "1982",
    sourceOrPublisher: "Fayard",
    localFile: "Bourdieu Léconomie des échanges linguistiques.pdf",
    platformNotice: "Livre complet / extrait majeur fourni dans le pack de ressources",
    description:
      "Ouvrage magistral déconstruisant la linguistique internaliste de Saussure et Chomsky. La compétence linguistique n'est pas universellement neutre : elle fonctionne comme un capital linguistique s'échangeant sur un marché linguistique hiérarchisé. La parole légitime tire son autorité de l'institution qui délègue le pouvoir au locuteur.",
    keyTakeaway:
      "Retenir : capital symbolique, violence symbolique, marché linguistique, 'Status est magistratus' et censure structurale.",
    apa7Citation:
      "Bourdieu, P. (1982). Ce que parler veut dire : L'économie des échanges linguistiques. Fayard.",
    tags: ["Bourdieu", "Pouvoir symbolique", "Marché linguistique", "Capital symbolique", "Violence symbolique"],
  },
  {
    id: "res-habermas-verite-justification",
    category: "texte_fondateur",
    categoryLabel: "Texte fondamental en théorie de la connaissance",
    prof: "M. Éric LUCY",
    title: "Vérité et justification : Perspectives pragmatiques",
    authors: "Jürgen Habermas",
    year: "1999 / 2001",
    sourceOrPublisher: "Gallimard (trad. R. Rochlitz)",
    localFile: "Habermas vérité et justification.pdf",
    platformNotice: "Texte théorique approfondi fourni pour la compréhension des prétentions de validité",
    description:
      "Habermas y affine son réalisme pragmatique : si la vérité relève d'une prétention inconditionnelle qui dépasse tout accord provisoire, sa justification demeure une pratique dialogique située et faillible au sein d'une communauté de communication.",
    keyTakeaway:
      "Articule la recherche de vérité scientifique avec l'exigence morale d'intercompréhension démocratique.",
    apa7Citation:
      "Habermas, J. (2001). Vérité et justification (R. Rochlitz, Trad.). Gallimard. (Ouvrage original publié en 1999).",
    tags: ["Habermas", "Vérité", "Justification", "Pragmatisme", "Épistémologie"],
  },
  {
    id: "res-honneth-epistemologie",
    category: "texte_fondateur",
    categoryLabel: "Étude épistémologique",
    prof: "M. Éric LUCY",
    title: "Épistémologie de la reconnaissance : L'antériorité de la reconnaissance sur la cognition",
    authors: "Axel Honneth",
    year: "2006",
    sourceOrPublisher: "Éditions du Cerf / PUF",
    localFile: "Honneth epistémologie de la reconnaissance.pdf",
    platformNotice: "Texte de référence sur le statut de sujet dans l'interaction",
    description:
      "Démontre la thèse révolutionnaire d'Honneth : avant même de connaître, analyser ou catégoriser autrui (faculté cognitive), nous devons préalablement l'avoir reconnu comme un égal digne d'existence. La réification managériale survient dès que cette reconnaissance originaire est oubliée au profit de la seule métrique comptable.",
    keyTakeaway:
      "La reconnaissance n'est pas un 'bonus' relationnel ou de la politesse : elle est le socle transcendantal de toute connaissance humaine.",
    apa7Citation:
      "Honneth, A. (2006). La société du mépris : Vers une nouvelle théorie critique. La Découverte.",
    tags: ["Honneth", "Épistémologie", "Antériorité de la reconnaissance", "Cognition vs Reconnaissance"],
  },
  {
    id: "res-valls-methode-iod",
    category: "ouvrage_socle",
    categoryLabel: "Manuel de référence Méthode IOD",
    prof: "M. Francis VALLS",
    title: "L'insertion professionnelle par la méthode IOD : Refuser le tri, négocier le milieu",
    authors: "Francis Valls & Denis Castra",
    year: "2015 / 2021",
    sourceOrPublisher: "Éditions Liaisons / Wolters Kluwer",
    localFile: "Francis Valls.docx",
    platformNotice: "Manuel et parcours professionnel remis par votre enseignant Francis Valls",
    description:
      "Présentation exhaustive de la démarche méthodologique IOD créée par Denis Castra et Francis Valls (associations TRANSFER et ACRIP). Rompt avec l'idéologie individualisante de l'employabilité en déplaçant l'intervention sur l'entreprise et l'offre d'emploi réelle sans sélection préalable des candidats.",
    keyTakeaway:
      "Maîtriser les 7 étapes méthodologiques et l'éthique du refus du tri pour la réinsertion durable dans le droit commun salarial (en lien avec Robert Castel).",
    apa7Citation:
      "Valls, F., & Castra, D. (2015). L'insertion professionnelle par la méthode IOD : Refuser le tri, négocier le milieu. Éditions Liaisons.",
    tags: ["Francis Valls", "Méthode IOD", "Sans tri préalable", "Offre d'emploi", "Robert Castel"],
  },
  {
    id: "res-cnam-diaporama-langage",
    category: "texte_fondateur",
    categoryLabel: "Diaporama Magistral Officiel du CNAM",
    prof: "Collectif Cnam",
    title: "Le Langage au travail : Construction du sujet, histoire de la linguistique, théories critiques et psychanalyse",
    authors: "Équipe pédagogique PST108 (Cnam)",
    year: "Support de cours officiel",
    sourceOrPublisher: "Chaire de Psychologie du Travail Cnam",
    localFile: "Le_langage CNAM (6).pptx",
    platformNotice: "Diaporama officiel de 18 slides remis aux auditeurs du Cnam",
    description:
      "Synthèse magistrale couvrant : 1) La genèse du langage chez le fœtus et le nourrisson, les aphasies, langage et pensée ; 2) L'histoire linguistique (Stoïciens, Port-Royal 1660, Saussure 1916 : syntagmatique et paradigmatique) ; 3) Les actes de parole d'Austin (1962) ; 4) Les théories critiques (Habermas, Honneth, Bourdieu) ; 5) La psychanalyse (Freud : condensation et déplacement du rêve) et le structuralisme (Lévi-Strauss 1948).",
    keyTakeaway:
      "Fournit le panorama unifié reliant les sciences du langage, la clinique du développement et la sociologie critique de l'UE PST108.",
    apa7Citation:
      "Cnam. (2026). Le langage : Support pédagogique de cours magistral (PST108). Conservatoire National des Arts et Métiers.",
    tags: ["Diaporama CNAM", "Saussure", "Austin", "Freud", "Lévi-Strauss", "Stoïciens"],
  },

  // --- 3. LES ÉMISSIONS AUDIO, VIDÉOS D'ARCHIVES & CONFÉRENCES REÇUES ---
  {
    id: "res-persee-sapir",
    category: "article_prof",
    categoryLabel: "Revue scientifique (Lien profs)",
    prof: "Collectif Cnam",
    title: "Sapir et l'ethnolinguistique : La structure de la langue comme grille de perception du monde",
    authors: "Revue Langages / Persée",
    year: "1970",
    sourceOrPublisher: "Persée, 5(18), 24–42",
    localFile: "Article Revue PerséeSapir et lethnolinguistique (2).docx",
    url: "https://www.persee.fr/doc/lgge_0458-726x_1970_num_5_18_2025?q=ethnolin",
    platformNotice: "Lien Persée transmis dans les ressources complémentaires",
    description:
      "Étude de référence sur l'hypothèse Sapir-Whorf en ethnolinguistique : les catégories grammaticales et lexicales d'une langue structurent la perception et le raisonnement cognitif des locuteurs au sein d'une communauté culturelle.",
    keyTakeaway:
      "À mobiliser pour illustrer que les langages de métier et jargons professionnels façonnent la façon dont les travailleurs perçoivent leur activité.",
    apa7Citation:
      "Perrot, J. (1970). Sapir et l'ethnolinguistique. Langages, 5(18), 24–42. https://doi.org/10.3406/lgge.1970.2025",
    tags: ["Persée", "Sapir-Whorf", "Ethnolinguistique", "Culture", "Représentations"],
  },
  {
    id: "res-langage-societe-traduire",
    category: "article_prof",
    categoryLabel: "Revue scientifique (Lien profs)",
    prof: "Collectif Cnam",
    title: "Traduire et interpréter en situations sociales : Santé, éducation, justice",
    authors: "Revue Langage et Société (Cairn.info)",
    year: "2015",
    sourceOrPublisher: "Langage et Société, n° 153",
    localFile: "Article Traduire et interpréter en situations sociales  santé, éd.docx",
    url: "https://www.cairn.info/revue-langage-et-societe-2015-3.htm#",
    platformNotice: "Lien Cairn vers le numéro spécial de la revue Langage et Société",
    description:
      "Analyse des défis de la traduction et de l'interprétariat en milieu clinique, hospitalier et judiciaire. Montre comment l'asymétrie linguistique fragilise le sujet vulnérable et nécessite des médiateurs interculturels qualifiés.",
    keyTakeaway:
      "Démontre que le langage en institution publique est un lieu d'accès ou d'exclusion aux droits fondamentaux.",
    apa7Citation:
      "Langage et Société. (2015). Traduire et interpréter en situations sociales : Santé, éducation, justice. Langage et Société, 153(3), 7–24.",
    tags: ["Langage & Société", "Cairn", "Interprétariat", "Santé", "Justice", "Médiation"],
  },
  {
    id: "res-philorama-enjeux-sociaux",
    category: "media_audio_video",
    categoryLabel: "Podcast Audio Philosophique (44 min)",
    prof: "Collectif Cnam",
    title: "Les enjeux sociaux du langage : Pouvoir des mots, violence verbale et distinction",
    authors: "Émission Philorama (Radio RAM)",
    year: "2011",
    sourceOrPublisher: "Philorama / RAM05",
    localFile: "Audio Philorama 44mn Les enjeux sociaux du langage(2).docx",
    url: "https://ram05.fr/podcasts/philorama/le-langage-2011",
    platformNotice: "Enregistrement audio de 44 minutes sélectionné par l'équipe enseignante",
    description:
      "Débat radiophonique stimulant de 44 minutes analysant comment le langage n'est jamais neutre : il institue des frontières sociales, discrimine ou libère, et opère comme un vecteur majeur de pouvoir politique et symbolique.",
    keyTakeaway:
      "Excellente ressource d'écoute pour consolider les liens entre philosophie du langage, sociolinguistique et vie quotidienne au travail.",
    apa7Citation:
      "Philorama. (2011). Les enjeux sociaux du langage [Podcast audio]. RAM05. https://ram05.fr/podcasts/philorama/le-langage-2011",
    tags: ["Podcast audio", "Philorama", "Enjeux sociaux", "Pouvoir des mots", "44 min"],
  },
  {
    id: "res-france-culture-honneth",
    category: "media_audio_video",
    categoryLabel: "Émission France Culture / YouTube",
    prof: "M. Éric LUCY",
    title: "Axel Honneth : La lutte pour la reconnaissance et la société du mépris",
    authors: "France Culture (Émission Les Chemins de la Philosophie)",
    year: "Archive radiophonique",
    sourceOrPublisher: "France Culture / YouTube",
    localFile: "Axel Honneth - La lutte pour la reconnaissance France culture.docx",
    url: "https://www.youtube.com/watch?v=8GZyK8Oy58k",
    platformNotice: "Enregistrement de référence transmis par M. Éric Lucy",
    description:
      "Présentation claire et vivante de la philosophie d'Axel Honneth : pourquoi le conflit social n'est pas d'abord matériel mais moral, comment le déni de reconnaissance détruit l'estime de soi, et en quoi l'entreprise contemporaine engendre de nouvelles pathologies du mépris.",
    keyTakeaway:
      "À réécouter pour s'imprégner de la grammaire morale des conflits sociaux et illustrer des cas concrets de mépris managérial.",
    apa7Citation:
      "France Culture. (s. d.). Axel Honneth : La lutte pour la reconnaissance [Vidéo]. YouTube. https://www.youtube.com/watch?v=8GZyK8Oy58k",
    tags: ["France Culture", "YouTube", "Axel Honneth", "Lutte pour la reconnaissance", "Audio"],
  },
  {
    id: "res-france-culture-habermas",
    category: "media_audio_video",
    categoryLabel: "Série France Culture",
    prof: "M. Éric LUCY",
    title: "Jürgen Habermas : Philosophe et théoricien des sciences sociales",
    authors: "France Culture",
    year: "Archive radiophonique",
    sourceOrPublisher: "Radio France / France Culture",
    localFile: "France culture  Jürgen Habermas  Philosophe et théoricien des sciences sociales France culture.docx",
    url: "https://www.franceculture.fr/personne/jurgen-habermas",
    platformNotice: "Dossier biographique et intellectuel France Culture fourni par l'enseignant",
    description:
      "Parcours intellectuel du géant de l'École de Francfort : de la critique de l'espace public bourgeois (1962) à l'agir communicationnel (1981) et au patriotisme constitutionnel démocratique.",
    keyTakeaway:
      "Permet de situer la démarche habermassienne dans l'histoire de la pensée européenne contre le totalitarisme et la technocratie.",
    apa7Citation:
      "France Culture. (s. d.). Jürgen Habermas : Philosophe et théoricien des sciences sociales. Radio France. https://www.franceculture.fr/personne/jurgen-habermas",
    tags: ["France Culture", "Habermas", "Espace public", "École de Francfort", "Démocratie"],
  },
  {
    id: "res-bourdieu-videos-tv",
    category: "media_audio_video",
    categoryLabel: "Archives Vidéos TV / INA",
    prof: "M. Éric LUCY",
    title: "Pierre Bourdieu présente « Ce que parler veut dire » (Journal TV & Apostrophes)",
    authors: "Pierre Bourdieu (Journal Télévisé & Apostrophes de Bernard Pivot)",
    year: "1982",
    sourceOrPublisher: "Archives Télévisées / YouTube & Orange Vidéo",
    localFile: "Bourdieu  Ce que parler veut dire vidéo Journal TV.docx",
    url: "https://www.youtube.com/watch?v=kxGZHT0f9UY",
    platformNotice: "Deux vidéos d'archives télévisées fournies dans le pack de M. Lucy",
    description:
      "Pierre Bourdieu explicite lui-même avec limpidité en plateau télévisé pourquoi le langage n'est jamais une pure communication transparente : la prononciation, le ton et le vocabulaire trahissent immédiatement l'origine sociale et exercent une domination symbolique sur ceux qui ne maîtrisent pas la norme légitime.",
    keyTakeaway:
      "Idéal pour visualiser la posture critique de Bourdieu face aux discours d'autorité et comprendre la violence symbolique ordinaire.",
    apa7Citation:
      "Bourdieu, P. (1982). Pierre Bourdieu présente « Ce que parler veut dire » [Vidéo d'archive]. Antenne 2 / INA.",
    tags: ["Bourdieu", "Archives TV", "Apostrophes", "Vidéo", "Domination symbolique"],
  },
  {
    id: "res-ina-levi-strauss",
    category: "media_audio_video",
    categoryLabel: "Archive Vidéo INA (2 min 47)",
    prof: "Collectif Cnam",
    title: "Claude Lévi-Strauss et la méthode structuraliste en sciences humaines",
    authors: "Claude Lévi-Strauss / INA",
    year: "Archive INA",
    sourceOrPublisher: "Institut National de l'Audiovisuel (INA)",
    localFile: "Vidéo INA 2mn47 Claude Levi Strauss et le structuralisme.docx",
    url: "http://www.ina.fr/video/I06292956",
    platformNotice: "Vidéo pédagogique courte de 2 min 47 sur les bases du structuralisme",
    description:
      "L'anthropologue fondateur du structuralisme explique en 2 minutes et 47 secondes comment les systèmes de parenté et les mythes s'analysent comme des systèmes de signes régis par des règles formelles inconscientes, à l'image des phonèmes de Saussure.",
    keyTakeaway:
      "Permet de comprendre la révolution structuraliste qui a nourri à la fois Jean Piaget, Jacques Lacan et les sciences sociales du XXe siècle.",
    apa7Citation:
      "Lévi-Strauss, C. (s. d.). Claude Lévi-Strauss et le structuralisme [Vidéo d'archive]. INA. http://www.ina.fr/video/I06292956",
    tags: ["INA", "Lévi-Strauss", "Structuralisme", "Saussure", "Anthropologie"],
  },
  {
    id: "res-chomsky-college-de-france",
    category: "media_audio_video",
    categoryLabel: "Conférence Magistrale Collège de France",
    prof: "Collectif Cnam",
    title: "Interpretation and Understanding: Language and Beyond",
    authors: "Noam Chomsky",
    year: "Conférence d'invité",
    sourceOrPublisher: "Collège de France",
    localFile: "Vidéo Noam Chomsky Collège de France .docx",
    url: "https://www.college-de-france.fr/fr/agenda/guest-lecturer/interpretation-and-understanding-language-and-beyond",
    platformNotice: "Conférence prestigieuse de Noam Chomsky au Collège de France",
    description:
      "Noam Chomsky expose les fondements de sa grammaire générative et de sa théorie innéiste du langage : la faculté humaine de langage repose sur un organe mental universel doté d'une syntaxe récursive innée, distincte de la simple communication animale.",
    keyTakeaway:
      "Point d'opposition théorique majeur : permet de contraster l'innéisme chomskien avec le constructivisme de Piaget et l'interactionnisme historico-culturel de Vygotski.",
    apa7Citation:
      "Chomsky, N. (s. d.). Interpretation and Understanding: Language and Beyond [Conférence]. Collège de France. https://www.college-de-france.fr",
    tags: ["Chomsky", "Collège de France", "Grammaire générative", "Innéisme", "Syntaxe"],
  },
  {
    id: "res-enthoven-langage",
    category: "media_audio_video",
    categoryLabel: "Capsule Vidéo Philosophique",
    prof: "Collectif Cnam",
    title: "Le Langage : Entre outil de communication et condition de la pensée",
    authors: "Raphaël Enthoven",
    year: "Émission télévisée / Dailymotion",
    sourceOrPublisher: "Philosophie (Arte) / Dailymotion",
    localFile: "Vidéo Philosophie Enthoven Raphaël  Le langage.docx",
    url: "http://www.dailymotion.com/video/xau63j_langage-1-2_webcam",
    platformNotice: "Capsule vidéo de vulgarisation philosophique fournie par les enseignants",
    description:
      "Parcours philosophique didactique explorant le statut du langage : parlons-nous le langage ou le langage nous parle-t-il ? Dialogue entre Platon, Wittgenstein et la philosophie du langage ordinaire.",
    keyTakeaway:
      "Clé d'ouverture pour introduire ou conclure une copie sur l'ambivalence du langage au travail.",
    apa7Citation:
      "Enthoven, R. (s. d.). Le langage (Parties 1 & 2) [Vidéo]. Dailymotion.",
    tags: ["Enthoven", "Philosophie", "Dailymotion", "Art de la parole"],
  },

  // --- 4. LES RESSOURCES DU COURS 1 (MME MAROT) ---
  {
    id: "res-freud-bobine",
    category: "texte_fondateur",
    categoryLabel: "Article sur Plateforme Moodle (Cours 1)",
    prof: "Mme Véronique MAROT",
    title: "Au-delà du principe de plaisir : L'observation du jeu de la bobine (Fort / Da)",
    authors: "Sigmund Freud",
    year: "1920 / 2010",
    sourceOrPublisher: "Payot (trad. J. Laplanche & J.-B. Pontalis)",
    platformNotice: "Article déposé sur Moodle/ENF par Mme Marot lors de la Séance 1",
    description:
      "Observation clinique de son petit-fils Ernst (18 mois) inventant le jeu de la bobine jetée ('o-o-o' / Fort) et ramenée ('Da'). Ce texte fondamental illustre l'émergence du langage comme fonction de réparation symbolique et de maîtrise active de l'absence maternelle.",
    keyTakeaway:
      "À mobiliser pour démontrer que le langage primitif ne sert pas d'abord à décrire le monde objectif, mais à supporter la perte, canaliser les pulsions (pare-excitation) et instituer le sujet.",
    apa7Citation:
      "Freud, S. (2010). Au-delà du principe de plaisir (J. Laplanche & J.-B. Pontalis, Trad.). Payot. (Ouvrage original publié en 1920).",
    tags: ["Plateforme ENF", "Freud", "Fort/Da", "Réparation symbolique", "Pare-excitation"],
  },
  {
    id: "res-vygotski-pensee-langage",
    category: "ouvrage_socle",
    categoryLabel: "Ouvrage socle prescrit (Cours 1)",
    prof: "Mme Véronique MAROT",
    title: "Pensée et langage",
    authors: "Lev S. Vygotski",
    year: "1934 / 1997",
    sourceOrPublisher: "Éditions La Dispute (trad. Françoise Sève, avant-propos d'Yves Clot)",
    platformNotice: "Livre majeur recommandé à acquérir et à lire tout au long de l'UE",
    description:
      "Le chef-d'œuvre de Vygotski dicté sur son lit de mort en 1934. Réfute l'asocialité piagétienne et fonde la psychologie historico-culturelle. Démontre que le langage égocentrique est un instrument de raisonnement qui s'intériorise pour devenir le langage intérieur (pensée verbale silencieuse).",
    keyTakeaway:
      "Citer la Loi générale du développement culturel : toute fonction apparaît d'abord au niveau social (interpsychologique), puis au niveau individuel (intrapsychologique). Le langage régule l'activité.",
    apa7Citation:
      "Vygotski, L. S. (1997). Pensée et langage (F. Sève, Trad.). La Dispute. (Ouvrage original publié en 1934).",
    tags: ["Ouvrage socle", "Vygotski", "Langage intérieur", "ZPD", "Marot"],
  },
  {
    id: "res-clot-travail-coeur",
    category: "ouvrage_socle",
    categoryLabel: "Ouvrage de Clinique du travail (Cours 1)",
    prof: "Mme Véronique MAROT",
    title: "Le travail à cœur. Pour en finir avec les risques psychosociaux",
    authors: "Yves Clot",
    year: "2010",
    sourceOrPublisher: "La Découverte",
    platformNotice: "Cité expressément en séance 1 pour définir la posture du psychologue au Cnam",
    description:
      "Ouvrage de référence sur la 'coopération conflictuelle' et la 'dispute professionnelle'. Clot y démontre que la santé au travail ne provient pas d'un consensus managérial artificiel mais de la controverse réglée entre pairs sur la qualité du travail bien fait.",
    keyTakeaway:
      "Formule d'examen clé : la 'coopération conflictuelle' institue le conflit de critères au cœur du dialogue professionnel pour régénérer le pouvoir d'agir et prévenir le travail empêché.",
    apa7Citation:
      "Clot, Y. (2010). Le travail à cœur. Pour en finir avec les risques psychosociaux. La Découverte.",
    tags: ["Coopération conflictuelle", "Dispute professionnelle", "Clot", "Santé au travail"],
  },
];
