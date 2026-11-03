/**
 * Bases de données pour le module PST123 : Le psychologue, le travail et l'emploi (2026 - 2027 Semestre 1).
 * Cours magistral et séminaires de E. LUCY (Cnam Nouvelle-Aquitaine / Paris).
 */

import type { CaseItem, ProtoStep, RedacItem } from "@/lib/pst/types";

export const A = {
  dubar: "Claude Dubar (Transactions & Formes)",
  bourdieu: "Pierre Bourdieu (Habitus & Dominations)",
  sainsaulieu: "Renaud Sainsaulieu (Modèles relationnels)",
  auteurs: "Théories de l'Identité (Honneth, Weber, Goffman)",
  psychologue: "Identité du Psychologue & Déontologie",
};

export const FICHES = [
  {
    a: "auteurs",
    t: "Séance 1 : Notions d'identité en sciences humaines (Piaget, Durkheim, Parsons, Kardiner)",
    ess: "<h5>Genèse conceptuelle de l'identité</h5><p>En sciences humaines, l'identité n'est pas une substance biologique innée, mais une construction socio-cognitive et culturelle continue.</p><h5>Piaget — L'assimilation et l'accommodation</h5><p>Le sujet construit son identité par deux mouvements complémentaires : l'<b>assimilation</b> (incorporer les objets et expériences du milieu dans ses schèmes d'action existants) et l'<b>accommodation</b> (modifier ses schèmes internes pour s'ajuster aux contraintes du réel extérieur). Ce jeu produit l'équilibration cognitive.</p><h5>Émile Durkheim — De la solidarité mécanique à la solidarité organique</h5><p>Dans <i>De la division du travail social</i> (1893), Durkheim montre l'évolution historique de l'intégration : la <b>solidarité mécanique</b> (sociétés traditionnelles, forte conscience collective, ressemblance des individus) cède la place à la <b>solidarité organique</b> (sociétés industrielles modernes fondées sur la différenciation, la complémentarité des fonctions professionnelles et l'interdépendance mutuelle).</p><h5>Parsons & Kardiner — La personnalité de base</h5><p>Le fonctionnalisme américain montre comment les institutions primaires (famille, école, éducation) façonnent une <b>« personnalité de base »</b> incorporant les normes et rôles sociaux légitimes, garantissant la stabilité du système social.</p>",
    ph: "L'identité n'est pas une essence innée mais une construction socio-cognitive (Piaget) et culturelle (Durkheim).",
    ex: "L'apprentissage précoce des rôles de genre à l'école comme socle de la socialisation primaire selon Parsons.",
    trap: "Croire que l'identité professionnelle s'élabore à partir de rien à l'âge adulte : elle repose sur les schèmes de la socialisation primaire.",
  },
  {
    a: "auteurs",
    t: "Séance 1 bis : Sociologie interactionniste & Domination (Weber, Becker, Merton, Rosenthal, Goffman, Jakobson)",
    ess: "<h5>Max Weber — Les trois types de domination légitime</h5><p>Toute organisation du travail repose sur une forme d'autorité consentie : 1) <b>Légale-rationnelle</b> (fondée sur la règle écrite impersonnelle, la compétence et la bureaucratie moderne) ; 2) <b>Traditionnelle</b> (fondée sur la croyance en la sainteté des coutumes et l'autorité patriarcale) ; 3) <b>Charismatique</b> (fondée sur la grâce extraordinaire et le magnétisme personnel d'un chef).</p><h5>Howard Becker — La théorie de l'étiquetage (Outsiders)</h5><p>La déviance ou l'incompétence n'est pas une qualité intrinsèque de l'acte, mais une conséquence de l'application de normes et de sanctions par les autres. L'<b>étiquetage</b> managérial enferme le salarié dans une « carrière déviante » et lui assigne un statut principal (<i>master status</i>).</p><h5>Robert K. Merton — Groupes de référence et prophétie autoréalisatrice</h5><p>Le <b>groupe d'appartenance</b> (celui auquel le sujet appartient objectivement) se distingue du <b>groupe de référence</b> (celui auquel il aspire et dont il adopte les valeurs). L'écart engendre la <i>frustration relative</i>. Merton théorise aussi la <b>prophétie autoréalisatrice</b> (une définition fausse d'une situation qui suscite un comportement qui la rend vraie).</p><h5>Rosenthal & Jacobson — L'Effet Pygmalion</h5><p>Prouve expérimentalement que les attentes et préjugés d'un évaluateur (enseignant ou manager) conditionnent et modifient les performances réelles du sujet évalué.</p><h5>Erving Goffman — L'identité sociale virtuelle vs réelle & le Stigmate</h5><p>Distingue l'<b>identité sociale virtuelle</b> (les attributs que la société lui prête a priori selon les stéréotypes) de l'<b>identité sociale réelle</b> (les attributs qu'il possède véritablement). Analyse la mise en scène de soi : <i>façade</i> (ce qui est montré) vs <i>coulisses</i> (ce qui est caché).</p><h5>Roman Jakobson — Les actes de langage</h5><p>Les interactions de travail mobilisent 6 fonctions linguistiques (référentielle, expressive, conative, phatique, métalinguistique, poétique), qui sont autant d'actes de reconnaissance ou de disqualification sociale.</p>",
    ph: "La déviance et l'incompétence ne sont pas des essences, mais des étiquettes attribuées par les institutions dominantes.",
    ex: "L'effet Pygmalion : un tuteur persuadé qu'un apprenti est peu doué lui confie des tâches répétitives, provoquant son désengagement.",
    trap: "Confondre le groupe d'appartenance objectif avec le groupe de référence subjectif chez Merton.",
  },
  {
    a: "dubar",
    t: "Séance 2 : Claude Dubar — La Double Transaction Identitaire",
    ess: "<h5>Le pivot théorique de Claude Dubar (1991)</h5><p>Dans <i>La socialisation : construction des identités sociales et professionnelles</i>, Claude Dubar définit l'identité comme le résultat dynamique et jamais achevé d'une <b>double transaction</b> articulant l'individu et la société :</p><h5>1. La transaction biographique (Axe interne, diachronique)</h5><p>C'est l'<b>identité pour soi</b>, le processus subjectif par lequel l'individu construit la continuité de son histoire personnelle à travers le temps. Elle négocie entre les <b>identités héritées</b> du passé (socialisation primaire, famille, origines) et les <b>identités visées</b> dans l'avenir (projets, ambitions professionnelles). Elle oscille entre <b>continuités / reproductions</b> et <b>ruptures / productions</b> de soi.</p><h5>2. La transaction relationnelle (Axe externe, synchronique)</h5><p>C'est l'<b>identité pour autrui</b>, le processus objectif de reconnaissance par les institutions, les supérieurs hiérarchiques et les collègues dans une situation donnée. Elle négocie entre les <b>identités attribuées / proposées</b> par autrui et les <b>identités assumées / incorporées</b> par le sujet. Elle oscille entre <b>coopérations / reconnaissances</b> et <b>conflits / non-reconnaissances</b>.</p><h5>La crise identitaire</h5><p>La crise survient lors d'une discordance aiguë : quand l'identité pour autrui attribuée par l'entreprise (ex. « simple exécutant interchangeable ») entre en collision violente avec l'identité pour soi revendiquée (ex. « expert autonome »).</p>",
    ph: "« L'identité est le résultat de deux transactions : biographique (pour soi) et relationnelle (pour autrui). » (Dubar)",
    ex: "Un ouvrier qualifié promu agent de maîtrise qui vit un déchirement entre son identité ouvrière héritée et son identité d'encadrant visée.",
    trap: "Croire que l'identité pour soi est indépendante d'autrui : elle est toujours façonnée en écho ou en résistance aux attributions sociales.",
  },
  {
    a: "dubar",
    t: "Séance 2 bis : Actes d'Attribution vs Actes d'Appartenance (Pour autrui vs Pour soi)",
    ess: "<h5>La question fondatrice posée par Claude Dubar</h5><p>Dubar résume les deux faces de l'identité par deux questions complémentaires :</p><ul><li><b>Actes d'attribution (Pour autrui)</b> : <i>« Quel type d'homme ou de femme dit-on que vous êtes ? »</i></li><li><b>Actes d'appartenance (Pour soi)</b> : <i>« Quel type d'homme ou de femme dites-vous que vous êtes ? »</i></li></ul><h5>L'acte d'attribution institutionnelle</h5><p>« L'attribution de l'identité par les institutions ne peut s'analyser en dehors des systèmes d'action dans lequel l'individu est impliqué et résulte des rapports de force entre les acteurs concernés et la légitimité des catégories utilisées. » L'institution catégorise, labellise, classe (diplômes, coefficients, fiches de poste, grilles d'évaluation).</p><h5>L'acte d'appartenance subjective</h5><p>« L'acte d'appartenance ou d'incorporation est le second processus majeur qui peut se constituer en dehors de la trajectoire sociale du sujet comme une identité pour soi, c'est-à-dire la manière dont l'individu se raconte. Il est ce qui convient à l'individu, c'est son identité subjective. » L'individu revendique son affiliation à des collectifs de pairs, à des métiers ou à des valeurs protectrices.</p>",
    ph: "L'acte d'attribution dit ce que l'institution fait de vous ; l'acte d'appartenance dit comment vous vous racontez.",
    ex: "Un salarié étiqueté 'technicien administratif' (attribution institutionnelle) qui se revendique 'militant de l'accès aux droits' (appartenance subjective).",
    trap: "Penser que l'acte d'attribution est toujours accepté passivement : il fait l'objet de transactions, de négociations ou de résistances.",
  },
  {
    a: "dubar",
    t: "Séance 2 ter : Identités Sociales Virtuelles vs Réelles & Formes de Reconnaissance",
    ess: "<h5>Identité virtuelle vs Identité réelle (Héritage Goffman / Dubar)</h5><p>Dubar intègre la distinction goffmanienne :</p><ul><li><b>Identité sociale « virtuelle »</b> : L'identité générique attribuée par l'organisation, le profil attendu selon les normes formelles et les stéréotypes hiérarchiques.</li><li><b>Identité sociale « réelle »</b> : L'identité prédicative de soi, assumée et revendiquée par le sujet à partir de ses compétences vécues et de ses appartenances de cœur.</li></ul><h5>Les 4 issues des transactions objectives selon Dubar</h5><p>La transaction objective avec le marché du travail et l'entreprise se solde par une alternative entre reconnaissance et non-reconnaissance :</p><ol><li><b>Promotion interne</b> (Reconnaissance dans l'entreprise) : Légitimation ascendante de l'identité par le management ; intégration à la hiérarchie.</li><li><b>Conversion externe</b> (Reconnaissance hors de l'entreprise) : Reconnaissance par des pairs, une autre entreprise ou un diplôme universitaire facilitant une reconversion choisie.</li><li><b>Blocage interne</b> (Non-reconnaissance dans l'entreprise) : Refus de promotion, déclassement, sentiment de stagnation et de non-valorisation des compétences.</li><li><b>Exclusion externe</b> (Non-reconnaissance globale) : Licenciement, chômage de longue durée, mise au ban du marché de l'emploi et fragilisation identitaire.</li></ol>",
    ph: "Les transactions objectives débouchent sur 4 destins : promotion interne, conversion externe, blocage interne ou exclusion externe.",
    ex: "Un ingénieur autodidacte bloqué au statut technicien en interne qui quitte l'entreprise pour faire valider ses acquis et réussir une conversion externe.",
    trap: "Croire que la non-reconnaissance ne conduit qu'à la démission : elle produit très souvent un blocage interne avec désengagement silencieux.",
  },
  {
    a: "dubar",
    t: "Séance 2 quater : Les 4 Styles Identitaires (Bloquée, Menacée, Incertaine, Constituée)",
    ess: "<h5>Les styles identitaires chez Claude Dubar</h5><p>En croisant la transaction biographique et la transaction relationnelle, Dubar dégage 4 styles ou états identitaires majeurs qui caractérisent la viabilité psychique et sociale du sujet au travail :</p><h5>1. L'identité bloquée</h5><p>Typique de l'ouvrier de métier traditionnel ou de l'employé expérimenté. Le sujet a une identité pour soi très forte et fière, mais l'organisation refuse de la reconnaître dans ses grilles modernes de polyvalence. Le dialogue est rompu, la trajectoire est gelée.</p><h5>2. L'identité menacée</h5><p>Typique de l'exécutant peu qualifié (modèle du retrait). Le sujet subit la flexibilité, la précarité ou l'obsolescence de son poste. L'identité pour autrui est dégradée (« bras interchangeable ») et l'identité pour soi est vulnérable au spectre de l'exclusion.</p><h5>3. L'identité incertaine</h5><p>Typique du salarié en reconversion, du jeune diplômé ou du travailleur en modèle affinitaire. Il ne parvient pas à stabiliser une appartenance légitime reconnue : identité floue, oscillant entre ce qu'il était et ce qu'il peine à devenir.</p><h5>4. L'identité constituée</h5><p>Typique du cadre, de l'expert ou du nouveau professionnel (modèle négociateur). Harmonisation réussie entre la trajectoire biographique revendiquée et la reconnaissance institutionnelle du métier. Le sujet dispose d'un pouvoir d'agir et d'une légitimité assise.</p>",
    ph: "L'identité oscille entre 4 styles : bloquée (refus institutionnel), menacée (peur d'exclusion), incertaine (flou de transition) et constituée (harmonie reconnue).",
    ex: "L'imprimeur rotativiste dont le savoir-faire manuel est rendu obsolète par le numérique développe une identité bloquée.",
    trap: "Penser qu'une identité constituée est acquise pour toujours : une réorganisation brutale peut la faire basculer dans l'incertain ou le menacé.",
  },
  {
    a: "bourdieu",
    t: "Séance 3 : Pierre Bourdieu — Théorie des Champs et l'Habitus",
    ess: "<h5>L'algorithme de Pierre Bourdieu (2013)</h5><p>Dans <i>Manet, Une révolution symbolique</i> (p. 451), Bourdieu synthétise sa théorie sociologique sous une formule mathématique rigoureuse :</p><div style='text-align:center;font-weight:bold;font-size:16px;margin:10px 0;'>(Dispositions + Capital) × Champ = Habitus</div><h5>Les concepts fondamentaux</h5><ul><li><b>L'habitus</b> : Système de dispositions durables et transposables, structures structurées prédisposées à fonctionner comme structures structurantes. C'est le « social incorporé », l'histoire faite corps qui oriente l'action sans calcul conscient délibéré.</li><li><b>Le champ</b> : Un microcosme social autonome (le champ économique, le champ scientifique, le champ médical) régi par des règles spécifiques et doté d'enjeux propres. C'est à la fois un <b>champ de forces</b> (distribution inégale du capital spécifique) et un <b>champ de luttes</b> où les agents s'affrontent pour conserver ou subvertir la hiérarchie établie.</li><li><b>Les dispositions</b> : Les manières de sentir, penser et agir intériorisées par l'agent au cours de sa socialisation primaire et secondaire.</li></ul><h5>La violence symbolique</h5><p>Forme de domination douce, insensible et invisible aux yeux de ses victimes mêmes, qui s'exerce par les voies de la communication et de la connaissance : le dominé adhère aux critères de jugement qui le disqualifient (ex. l'acceptation de son infériorité culturelle).</p>",
    ph: "« (Dispositions + Capital) × Champ = Habitus » : le travailleur agit selon son habitus incorporé dans un champ de luttes.",
    ex: "Le sentiment d'illégitimité sociale d'un technicien promu cadre qui n'ose pas prendre la parole en comité de direction en raison de son habitus ouvrier.",
    trap: "Croire que l'habitus est un destin fataliste : l'habitus est durable mais peut se transformer par des expériences de rupture réflexive.",
  },
  {
    a: "bourdieu",
    t: "Séance 3 bis : Pierre Bourdieu — Les 4 Capitaux & « La double vérité du travail »",
    ess: "<h5>Les 4 espèces de capital selon Bourdieu</h5><ol><li><b>Capital économique</b> : Ensemble des ressources financières, revenus, patrimoine et biens matériels directement convertibles en argent.</li><li><b>Capital culturel</b> : Existe sous trois formes :<br/>- <i>Incorporé</i> : aisance linguistique, manières d'être, schèmes intellectuels acquis dans la famille.<br/>- <i>Objectivé</i> : possession de biens culturels (livres, tableaux, instruments techniques).<br/>- <i>Institutionnalisé</i> : titres scolaires et diplômes d'État reconnus sur le marché du travail.</li><li><b>Capital social</b> : Réseau durable de relations d'interconnaissance et d'inter-reconnaissance (carnet d'adresses, appartenance à des clubs ou associations d'anciens élèves).</li><li><b>Capital symbolique</b> : Forme que prend toute espèce de capital dès lors qu'elle est perçue et reconnue comme légitime (prestige, honneur, autorité statutaire, réputation).</li></ol><h5>« La double vérité du travail » (Bourdieu, 1996)</h5><p>Dans son texte fondamental (Actes de la recherche en sciences sociales), Bourdieu formule le grand paradoxe du travail moderne :</p><ul><li><b>La vérité objective</b> : Le travail salarié est une relation d'exploitation économique, de dépendance matérielle et de soumission à la domination du capital.</li><li><b>La vérité subjective</b> : Le travail est aussi l'espace où le travailleur investit son désir, son intelligence, sa créativité et y trouve une source d'accomplissement personnel et d'estime de soi.</li></ul><h5>L'Illusio</h5><p>L'<i>illusio</i> est le fait d'être « pris au jeu », de croire que le jeu en vaut la chandelle. C'est l'investissement passionné du travailleur dans son activité qui permet à l'entreprise d'obtenir son dévouement au-delà du strict salaire prescrit.</p>",
    ph: "La double vérité du travail : une aliénation objective dissimulée par un investissement subjectif passionné (l'illusio).",
    ex: "L'enseignant ou l'infirmière qui consacre des heures bénévoles à ses élèves ou patients : son illusio masque l'exploitation objective de son temps.",
    trap: "Oublier l'une des deux vérités : réduire le travail à la seule exploitation économique (économisme) ou à la seule vocation bienheureuse (angélisme).",
  },
  {
    a: "sainsaulieu",
    t: "Séance 4 : Renaud Sainsaulieu — L'Identité au Travail (1977)",
    ess: "<h5>La découverte sociologique de Renaud Sainsaulieu</h5><p>Dans son enquête séminale <i>L'identité au travail</i> (1977), Renaud Sainsaulieu démontre que l'entreprise n'est pas seulement un lieu de production économique ou de contrainte taylorienne : c'est un <b>lieu de socialisation politique et culturelle</b> à part entière.</p><h5>L'apprentissage des normes de relation</h5><p>En travaillant, les individus ne fabriquent pas seulement des objets ou des services : ils font l'<b>apprentissage des normes de relation</b>, des rapports de pouvoir et de la démocratie. La position occupée dans la division du travail et l'accès au pouvoir d'agir forgent l'identité sociale de l'adulte tout autant que l'école ou la famille.</p><h5>Les 4 dimensions constitutives des modèles</h5><p>Pour chaque catégorie professionnelle, Sainsaulieu analyse 4 critères :</p><ol><li><b>Les investissements d'accès aux fonctions du travail</b> (dans le travail, hors-travail ou nulle part).</li><li><b>Les normes de comportements relationnels</b> (individualisme, unanimisme, solidarité démocratique, séparatisme).</li><li><b>Les valeurs issues du travail</b> (économiques, statutaires/règle, créativité/expertise, personnes/pairs).</li><li><b>Les trajectoires subjectives</b> (reproduction, promotion, conversion, repli).</li></ol>",
    ph: "« L'entreprise est un lieu d'apprentissage des normes relationnelles et de la démocratie. » (Sainsaulieu)",
    ex: "L'atelier d'usine comme école de la solidarité collective et de l'action syndicale pour de jeunes ouvriers.",
    trap: "Croire que les relations entre collègues ne sont que des affinités psychologiques individuelles : elles sont dictées par l'organisation du pouvoir.",
  },
  {
    a: "sainsaulieu",
    t: "Séance 4 bis : Sainsaulieu & Dubar — Modèle du Retrait vs Modèle Fusionnel",
    ess: "<h5>1. Le modèle du Retrait (Dubar : Identité menacée & Exclusion)</h5><ul><li><b>Public type</b> : Ouvriers non qualifiés, intérimaires, opérateurs de saisie, personnel précarisé.</li><li><b>Accès au pouvoir</b> : Accès au pouvoir situé <i>dans le non-travail</i> (famille, jardinage, bricolage, vie associative). Non-accès au pouvoir dans l'entreprise.</li><li><b>Norme relationnelle</b> : Individualisme strict, indifférence envers les collègues, rejet du militantisme syndical.</li><li><b>Valeurs</b> : Purement économiques (le salaire à la fin du mois, les primes).</li><li><b>Dubar</b> : L'identité d'exécutant menacée ; risque d'exclusion externe en cas de restructuration.</li></ul><h5>2. Le modèle Fusionnel (Dubar : Identité bloquée & Unanimisme)</h5><ul><li><b>Public type</b> : Ouvriers de fabrication en chaîne traditionnelle, dockers, mineurs, équipes manuelles d'atelier.</li><li><b>Accès au pouvoir</b> : Non-accès au pouvoir dans aucun des champs (ni formel ni informel).</li><li><b>Norme relationnelle</b> : Unanimisme, camaraderie de corps fusionnelle, égalitarisme absolu (« un pour tous, tous pour un »). Les conflits internes sont bannis ; le front uni contre le chef est la règle.</li><li><b>Valeurs</b> : Statutaires et corporatives (défense de la règle, de la corporation et de la tradition ouvrière).</li><li><b>Dubar</b> : De l'ouvrier de métier au nouveau professionnel : l'identité bloquée face aux nouvelles exigences de polyvalence managériale.</li></ul>",
    ph: "Retrait (l'individualisme du travail alimentaire) vs Fusionnel (la camaraderie unanime et égalitaire contre le chef).",
    ex: "L'employé de centre d'appels qui refuse tout lien d'équipe (retrait) vs l'équipe de fonderie solidaire qui fait bloc contre toute modification de cadences (fusion).",
    trap: "Confondre le modèle fusionnel avec la solidarité démocratique : le fusionnel étouffe les désaccords internes par la pression collective.",
  },
  {
    a: "sainsaulieu",
    t: "Séance 5 : Sainsaulieu & Dubar — Modèle Négociateur vs Affinitaire et Promotionnel",
    ess: "<h5>3. Le modèle Négociateur (Dubar : Nouveau professionnel & Identité constituée)</h5><ul><li><b>Public type</b> : Cadres, techniciens supérieurs, ingénieurs, professionnels de santé.</li><li><b>Accès au pouvoir</b> : Investissement fort et légitimé dans le travail.</li><li><b>Norme relationnelle</b> : Solidarité et <b>rivalité démocratique</b>. Le conflit n'est pas craint : il est considéré comme une ressource d'innovation et de controverse technique constructive.</li><li><b>Valeurs</b> : Créativité, expertise technique, autonomie dans l'activité, accomplissement de soi.</li><li><b>Dubar</b> : L'identité constituée ; le professionnel reconnu capable d'arbitrer entre règles formelles et réel du terrain.</li></ul><h5>4. Le modèle Affinitaire (Dubar : Identité incertaine & Conversion)</h5><ul><li><b>Public type</b> : Employés du tertiaire, jeunes diplômés en open-space, techniciens mobiles.</li><li><b>Accès au pouvoir</b> : Investissement sélectif dans des réseaux d'égaux.</li><li><b>Norme relationnelle</b> : Séparatisme, relations électives par petits clans d'affinité (« on s'entend bien entre nous »).</li><li><b>Valeurs</b> : Les personnes, les collègues choisis, le climat amical relationnel.</li><li><b>Dubar</b> : Processus de conversion externe ; identité incertaine en quête de nouveaux repères professionnels.</li></ul><h5>5. Le modèle Promotionnel / Carriériste (Dubar : Mobilisation & Promotion interne)</h5><ul><li><b>Accès au pouvoir</b> : Intégration totale et soumission acceptée à la ligne managériale. Adhésion sans réserve aux valeurs de l'entreprise.</li><li><b>Valeurs</b> : La règle de l'organisation et la figure du manager bienfaiteur.</li></ul>",
    ph: "Le négociateur débat démocratiquement par son expertise ; l'affinitaire choisit son clan ; le promotionnel s'aligne sur le chef.",
    ex: "L'architecte qui confronte ses calculs avec ses collègues pour améliorer le projet (négociateur) vs le clan de collègues déjeunant toujours ensemble (affinitaire).",
    trap: "Croire que le modèle négociateur est exempt de conflits : il intègre au contraire le conflit régulé comme moteur de travail.",
  },
  {
    a: "auteurs",
    t: "Séance 6 : Axel Honneth — La Lutte pour la Reconnaissance (1992)",
    ess: "<h5>L'ancrage philosophique d'Axel Honneth</h5><p>Directeur de l'Institut de recherche sociale de Francfort, Axel Honneth refonde la théorie critique en plaçant la <b>demande de reconnaissance intersubjective</b> au cœur de la condition humaine. L'homme ne peut se penser en sujet autonome de sa propre vie sans l'expérience préalable de la reconnaissance d'autrui.</p><h5>Les trois sphères de la reconnaissance et les formes de mépris</h5><ol><li><b>La sphère affective (Amour et Amitié)</b> :<br/>- <i>Relation</i> : Liens primaires, relations intimes et familiales.<br/>- <i>Gain psychique</i> : La <b>confiance en soi</b> fondamentale (sécurité ontologique corporelle).<br/>- <i>Forme de mépris</i> : Atteinte à l'intégrité physique, violences, humiliation corporelle.</li><li><b>La sphère juridique (Le Droit)</b> :<br/>- <i>Relation</i> : Statut de citoyen, universalité des règles et des droits civiques et sociaux.<br/>- <i>Gain psychique</i> : Le <b>respect de soi</b> (conscience d'être un sujet de droit égal aux autres).<br/>- <i>Forme de mépris</i> : Privation de droits, discrimination juridique, statut de sous-citoyen.</li><li><b>La sphère sociale (La Solidarité et le Travail)</b> :<br/>- <i>Relation</i> : Communauté de travail, utilité sociale des compétences, division du travail.<br/>- <i>Gain psychique</i> : L'<b>estime de soi</b> (sentiment d'apporter une contribution unique et valorisée au bien commun).<br/>- <i>Forme de mépris</i> : Dévalorisation culturelle d'un métier, invisibilisation de l'utilité réelle de la tâche, précarité statutaire (« travail invisible »).</li></ol>",
    ph: "« Sans reconnaissance, l'individu ne peut se penser en sujet de sa propre vie. » (Axel Honneth)",
    ex: "Les agents d'entretien ou aides-soignantes dont le travail vital n'est ni vu ni valorisé financièrement souffrent d'un mépris dans la sphère de l'estime sociale.",
    trap: "Confondre l'estime de soi (sphère du travail et de la solidarité) avec la confiance en soi (sphère affective intime).",
  },
  {
    a: "psychologue",
    t: "Séance 6 bis : L'Identité du Psychologue du Travail (Thomas Le Bianic & Wittorski)",
    ess: "<h5>Thomas Le Bianic — Une profession balkanisée</h5><p>Dans ses travaux historiques sur les sciences du travail et le CNAM (1910-1990), le sociologue Thomas Le Bianic analyse la trajectoire contrariée de la profession de psychologue en France :</p><ul><li><b>La « balkanisation » professionnelle</b> : Dispersion entre psychologues cliniciens, scolaires, hospitaliers et du travail, aux cultures syndicales et épistémologiques divergentes, retardant l'unification corporative.</li><li><b>Luttes de juridiction (Abbott)</b> : Concurrence historique face aux médecins du travail et psychiatres (qui voulaient conserver le monopole de la santé mentale) et face aux gestionnaires RH (qui privilégient le rendement financier).</li><li><b>Le rôle charnière du CNAM</b> : De l'INOP positiviste de Lahy et Piéron à la Chaire de Psychologie du travail, le CNAM a été le laboratoire d'émancipation de la discipline vers la clinique de terrain.</li></ul><h5>Wittorski — Professionnalisation et déprofessionnalisation</h5><p>L'identité du psychologue est un processus dynamique : il oscille entre <b>professionnalisation</b> (élaboration de savoirs scientifiques propres, autonomie déontologique) et <b>déprofessionnalisation</b> (pressions managériales pour réduire son rôle à du recrutement algorithmique ou du coaching de résilience individuelle).</p>",
    ph: "Le psychologue du travail se construit dans une lutte de territoires entre médecine, gestion et clinique.",
    ex: "Un psychologue du travail en entreprise qui doit défendre sa légitimité à analyser l'organisation face à un DRH qui exige du 'coaching individuel'.",
    trap: "Croire que le statut du psychologue a toujours été stabilisé : il résulte d'un siècle de luttes de juridiction face à la médecine et aux RH.",
  },
  {
    a: "psychologue",
    t: "Séance 6 ter : Posture, Mandat et Cadre Déontologique du Psychologue (Loi 1985)",
    ess: "<h5>Protection du titre et cadre légal</h5><p>L'usage du titre de psychologue est protégé par la <b>loi du 25 juillet 1985</b>. L'inscription au répertoire <b>ADELI / RPPS</b> est obligatoire pour exercer légalement en France (détention du Titre RNCP niveau 7 de Psychologue du travail du Cnam ou d'un Master en psychologie avec stage validé).</p><h5>La Triangulation déontologique</h5><p>En entreprise, l'intervention implique obligatoirement 3 pôles aux intérêts divergents :</p><ol><li><b>Le Prescripteur / Commanditaire</b> (DRH, Direction, CSE) : qui commande et finance l'action.</li><li><b>Le Sujet / Salarié</b> (usager, travailleur évalué) : au bénéfice de qui s'exerce l'éthique de protection.</li><li><b>Le Psychologue</b> : garant de l'indépendance de ses méthodes et du secret professionnel.</li></ol><h5>De la Demande brute au Mandat co-construit</h5><p>Le psychologue ne répond jamais directement à la <b>demande brute</b> (plainte managériale visant souvent à individualiser un problème d'organisation). Il analyse la commande, pose le cadre déontologique (consentement libre et éclairé, but assigné éthique, restitution compréhensible) et contractualise un <b>mandat écrit</b> d'analyse du travail réel.</p>",
    ph: "Le mandat contractualise l'indépendance du psychologue face à la commande patronale (Loi 1985 & Code de déontologie).",
    ex: "Refuser la demande d'un DRH d'évaluer la 'personnalité' de grévistes pour négocier un mandat d'enquête sur les conditions réelles de travail.",
    trap: "Croire que le secret professionnel peut être levé sous prétexte que le DRH est l'employeur qui paie l'intervention.",
  },
  {
    a: "psychologue",
    t: "Séance 6 quater : Transitions Professionnelles, Bilan de Compétences et Dominations (Garner & Méda)",
    ess: "<h5>La place du travail dans l'identité (Garner & Méda)</h5><p>Contrairement aux thèses hâtives sur la « fin du travail », Hélène Garner et Dominique Méda prouvent statistiquement que le travail demeure une <b>valeur centrale et structurante</b> de l'identité des Français. L'attente d'épanouissement, d'autonomie et de sens y est même plus forte qu'ailleurs en Europe.</p><h5>Le Bilan de Compétences : Instrument d'émancipation ou de tri ?</h5><p>Encadré par la loi de 1991, le Bilan de Compétences est un champ de tension identitaire :</p><ul><li><b>L'approche marchande gestionnaire (« Matching »)</b> : Réduire le sujet à une somme de compétences techniques découpées pour l'adapter docilement aux besoins du marché du travail.</li><li><b>L'approche clinique et émancipatrice</b> : Traiter le bilan comme un espace de reconstruction de la <b>double transaction biographique et relationnelle</b>. Permettre au salarié de faire le deuil d'identités brisées (licenciement, burn-out) et de redevenir auteur de sa trajectoire.</li></ul><h5>Chômage et perte d'identité</h5><p>Le chômage prolongé détruit l'estime sociale et fracture l'identité pour soi. L'accompagnement psychologique consiste à réhabiliter la dignité du sujet en lui redonnant du pouvoir d'agir sur son histoire.</p>",
    ph: "Le bilan de compétences est un espace clinique d'élaboration de la double transaction biographique et relationnelle.",
    ex: "Accompagner un cadre licencié à 50 ans pour l'aider à dépasser son identité menacée et reconstruire un projet en modèle négociateur.",
    trap: "Réduire le Bilan de Compétences à un simple test d'inventaire de compétences sans travail sur l'histoire de vie du sujet.",
  },
  {
    a: "psychologue",
    t: "Séance 3 (Webconférence 03/11/2026) : Genèse Historique (1879-1939) : Métrologie, Taylorisme et Psychotechnique",
    ess: "<h5>Deux conditions de possibilité à l'émergence de la science</h5><p>Comme le souligne Dr. Prisca Lutumba en citant Auguste Comte, <i>« on connaît bien une science quand on connaît son histoire »</i>. La psychologie du travail naît au croisement de deux dynamiques :</p><ol><li><b>Une psychologie qui se veut science expérimentale</b> : Wilhelm Wundt fonde en 1879 à Leipzig le premier laboratoire de psychologie expérimentale (trépied : objet = processus psychiques, méthode = mesure/expérimentation, lieu = laboratoire). Alfred Binet crée en 1889 le laboratoire de psychologie physiologique à la Sorbonne (repris par Henri Piéron en 1912). La psychologie différentielle (Galton, Cattell, Binet & Simon) rend l'individu mesurable dans ses facultés physiques et intellectuelles.</li><li><b>Un monde ouvrier transformé par la 2e révolution industrielle</b> : mécanisation, cadences d'usine, accidents et fatigue (*Les Temps modernes* de Chaplin). Frederick W. Taylor formalise l'OST par le chronométrage et la parcellisation des tâches (<i>« The right man in the right place »</i>). Hugo Münsterberg publie en 1913 <i>Psychology and Industrial Efficiency</i>, fondant la psychologie industrielle.</li></ol><h5>Jean-Maurice Lahy et la sélection des traminots (1908)</h5><p>En France, Jean-Maurice Lahy est la figure pionnière de la psychotechnique : dès 1908, il étudie sur le terrain les conducteurs de tramway de l'Est parisien pour mesurer leurs réflexes sensorimoteurs et leur attention.</p><h5>L'Âge de la psychotechnique (1914-1939) & L'INOP au Cnam</h5><p>La Première Guerre mondiale accélère la métrologie de masse : en 1917, Robert Yerkes teste 1,7 million de conscrits américains (Army Alpha & Beta). En 1928, Henri Piéron crée l'<b>INOP</b> (futur INETOP rattaché au Cnam au 41 rue Gay-Lussac, siège du laboratoire CRTD). Le Cnam devient le bastion national de la formation des psychotechniciens. Fondation de l'AIPTLF au Cnam par Pierre Goguelin.</p><h5>La triple critique de la psychotechnique</h5><p>1) <b>Critique scientifique</b> : validité prédictive fragile hors laboratoire ; 2) <b>Critique syndicale</b> : instrument de tri et d'élimination patronale (<i>« sélection = élimination »</i>) ; 3) <b>Critique épistémologique</b> : réductionnisme d'un individu isolé sans prise en compte de l'activité réelle ni des collectifs.</p>",
    ph: "La psychologie du travail naît de la rencontre entre une psychologie en quête de mesure et une industrie en quête de rendement.",
    ex: "Les tests sensorimoteurs de Lahy sur les conducteurs de tramway de 1908 pour prédire les réflexes de freinage d'urgence.",
    trap: "Croire que le taylorisme prenait en compte la subjectivité : l'adage 'The right man in the right place' réduisait l'homme à un rouage docile.",
  },
  {
    a: "auteurs",
    t: "Séance 3 bis (Webconférence 03/11/2026) : Chômage de masse, Fonctions latentes de l'emploi & Modèles du stress",
    ess: "<h5>L'étude des Chômeurs de Marienthal (1933) & Marie Jahoda</h5><p>Dans un village textile autrichien frappé par la fermeture de son usine, Marie Jahoda, Paul Lazarsfeld et Hans Zeisel démontrent les effets destructeurs du chômage : apathie sociale, effondrement des repères temporels et perte de dignité. Jahoda théorise les <b>5 fonctions latentes de l'emploi</b> qui structurent l'équilibre psychologique au-delà du simple salaire :</p><ol><li><b>Structuration du temps</b> : imposition d'un rythme quotidien ;</li><li><b>Contacts sociaux élargis</b> : relations régulières hors du cercle familial intime ;</li><li><b>Buts collectifs transcendants</b> : participation à une œuvre commune dépassant l'individu ;</li><li><b>Statut social et identité</b> : reconnaissance d'une utilité collective dans la division du travail ;</li><li><b>Activité régulière</b> : prescription d'efforts obligatoires mobilisant l'énergie vitale.</li></ol><h5>Le modèle Job Strain de Robert Karasek (1979)</h5><p>Le stress pathogène résulte du croisement entre :</p><ul><li><b>Demande psychologique</b> (charge cognitive, cadences, contraintes temporelles) ;</li><li><b>Latitude décisionnelle</b> (marge de manœuvre, autonomie et utilisation des compétences) ;</li><li><b>Soutien social</b> (aide technique et affective des pairs et de la hiérarchie). La situation d'<i>Isostrain</i> (forte demande, faible latitude, faible soutien) est le prédicteur majeur de maladies cardiovasculaires et de détresse psychique.</li></ul><h5>Le Déséquilibre Effort-Récompense (DER / ERI) de Johannes Siegrist (1996)</h5><p>Siegrist dépasse le modèle de Karasek en intégrant le levier de la <b>reconnaissance</b> : la pathologie survient lorsque l'effort consenti (intrinsèque par surinvestissement, extrinsèque par contraintes) n'est pas compensé par une récompense proportionnée (estime, salaire, sécurité d'emploi et perspectives de carrière).</p><h5>Le burn-out & le harcèlement moral</h5><p>Décrit par Herbert Freudenberger (1974) et instrumenté par Christina Maslach (1981, MBI en 3 dimensions : épuisement, dépersonnalisation/cynisme, perte d'accomplissement). Théorisation du harcèlement moral par Marie-France Hirigoyen (1998), inscrit dans le Code du travail en 2002.</p>",
    ph: "Marie Jahoda : le chômage détruit les 5 fonctions latentes structurantes du travail (temps, liens, buts, statut, activité).",
    ex: "Un salarié en situation de Job Strain (forte charge sans aucune autonomie de planning) complétée par un déséquilibre de Siegrist (aucun merci de la hiérarchie).",
    trap: "Attribuer la notion de reconnaissance à Karasek : c'est Johannes Siegrist qui théorise le déséquilibre Effort-Récompense.",
  },
  {
    a: "psychologue",
    t: "Séance 3 ter (Webconférence 03/11/2026) : Cadre Légal (Loi 1985, RPPS), Déontologie & les 4 Démarches d'étayage",
    ess: "<h5>Protection du titre et statut légal : Loi du 25 juillet 1985 & Inscription RPPS</h5><p>L'article 44 de la loi n° 85-772 protège le titre de psychologue (Master 2 ou Titre RNCP niveau 7 du Cnam). Les psychologues disposent d'un numéro RPPS (Répertoire Partagé des Professionnels de Santé). Dr. Prisca Lutumba rappelle fermement :</p><ul><li>Les psychologues sont des <b>professionnels de santé mentale autonomes et indépendants</b> issus des sciences humaines et sociales ;</li><li>Ils <b>ne sont pas des auxiliaires médicaux sous prescription</b> : un médecin ne prescrit ni le nombre de séances, ni le protocole d'intervention en entreprise.</li></ul><h5>Code de Déontologie des Psychologues (1996, actualisé 2012 / 2021)</h5><p>Articulé en <b>6 principes fondamentaux</b> et 32 articles. Le Principe 1 érige le <b>respect des droits fondamentaux et de la dignité de la personne</b> comme règle suprême (secret professionnel inaliénable, consentement libre et éclairé, refus de tout étiquetage managérial réducteur).</p><h5>Tableau fondamental des 4 démarches d'étayage clinique</h5><p>Dr. Lutumba met en garde contre la confusion fréquente entre ces 4 dispositifs :</p><ol><li><b>Supervision clinique</b> : Espace d'élaboration intime et régulier du psychologue avec un tiers superviseur expérimenté extérieur. Outil de travail fondamental pour analyser son rapport aux situations de souffrance, ses transferts et ses doutes déontologiques.</li><li><b>Analyse des Pratiques Professionnelles (APP)</b> : Dispositif d'animation collective destiné à une équipe de terrain (soignants, éducateurs, travailleurs sociaux) pour décortiquer des situations professionnelles vécues.</li><li><b>Intervision</b> : Échange horizontal et collégial entre pairs de même statut sans animateur ni tiers superviseur.</li><li><b>Régulation</b> : Intervention ponctuelle ou de crise pour traiter les conflits relationnels et les blocages organisationnels d'une équipe.</li></ol>",
    ph: "La supervision est l'outil de travail intime du psychologue avec un tiers ; l'APP est une démarche collective d'équipe.",
    ex: "Participer à une supervision mensuelle pour détricoter le contre-transfert ressenti face à un salarié menaçant de se suicider.",
    trap: "Prétendre à l'examen Cnam que le psychologue travaille sous prescription médicale ou que l'APP remplace la supervision personnelle.",
  },
];

export const KW_DEFS = {
  "acte d'attribution":
    "Attribution de l'identité pour autrui par les institutions, résultant des rapports de force et de la légitimité des catégories sociales utilisées (Dubar).",
  "acte d'appartenance":
    "Incorporation subjective de l'identité pour soi par le sujet, correspondant à la manière dont l'individu se raconte et revendique sa place (Dubar).",
  "transaction biographique":
    "Négociation interne entre identités héritées du passé et identités visées dans l'avenir ; oscille entre continuité et rupture de soi (Dubar).",
  "transaction relationnelle":
    "Négociation externe avec les institutions entre identités attribuées par autrui et identités assumées par le sujet (Dubar).",
  "identite virtuelle":
    "Identité sociale générique prêtée par l'institution ou les stéréotypes hiérarchiques (Goffman / Dubar).",
  "identite reelle":
    "Identité sociale prédicative de soi, vécue et revendiquée par le sujet dans sa pratique concrète (Goffman / Dubar).",
  habitus:
    "Système de dispositions durables et transposables issu de la formule (Dispositions + Capital) × Champ = Habitus (Bourdieu).",
  champ:
    "Microcosme social autonome structuré par des rapports de force et une distribution inégale de capitaux spécifiques (Bourdieu).",
  "capital culturel":
    "Existe sous trois formes : incorporé (habitus, langage), objectivé (œuvres, outils) et institutionnalisé (diplômes scolaires) (Bourdieu).",
  "violence symbolique":
    "Domination intériorisée où le dominé adhère inconsciemment aux critères d'évaluation qui le disqualifient (Bourdieu).",
  "double verite du travail":
    "Le travail est à la fois une exploitation/dépendance objective et un espace subjectif d'accomplissement et de passion (l'illusio) (Bourdieu).",
  "modele du retrait":
    "Accès au pouvoir hors-travail, individualisme, travail alimentaire, identité d'exécutant menacée d'exclusion (Sainsaulieu / Dubar).",
  "modele fusionnel":
    "Camaraderie ouvrière de corps, égalitarisme absolu, unanimisme contre le chef, identité de métier bloquée (Sainsaulieu / Dubar).",
  "modele negociateur":
    "Solidarité et rivalité démocratique, créativité, autonomie et expertise technique, nouveau professionnel à l'identité constituée (Sainsaulieu / Dubar).",
  "modele affinitaire":
    "Relations électives par petits clans choisis, séparatisme relationnel, identité incertaine en quête de conversion (Sainsaulieu / Dubar).",
  "modele promotionnel":
    "Intégration totale et soumission acceptée à la ligne managériale, quête d'ascension interne et conformisme (Sainsaulieu).",
  "style identitaire":
    "Les 4 états identitaires chez Dubar : bloquée (refus institutionnel), menacée (peur d'exclusion), incertaine (flou), constituée (harmonie reconnue).",
  "reconnaissance sociale":
    "Les 3 sphères d'Axel Honneth : l'amour (confiance en soi), le droit (respect de soi), la solidarité/travail (estime de soi).",
  "domination legitime":
    "Les 3 types purs de Max Weber : rationnelle-légale (règle écrite), traditionnelle (coutume), charismatique (grâce personnelle).",
  etiquetage:
    "Théorie de Howard Becker (Outsiders) : la déviance comme étiquette sociale imposée par les institutions dominantes.",
  stigmate:
    "Attribut dévalorisant réduisant l'individu à une identité sociale virtuelle discréditée (Goffman).",
  "effet pygmalion":
    "Prophétie autoréalisatrice démontrée par Rosenthal & Jacobson : l'attente du manager/évaluateur modifie la performance du sujet.",
  "balkanisation professionnelle":
    "Concept de Thomas Le Bianic décrivant la division et les luttes de juridiction historiques de la psychologie face à la médecine et aux RH.",
  triangulation:
    "Cadre d'intervention liant le psychologue, le prescripteur et le sujet évalué sous secret professionnel (Code de déontologie).",
  "loi de 1985":
    "Loi du 25 juillet 1985 protégeant l'usage du titre professionnel de psychologue en France.",
  psychotechnique:
    "Application des méthodes différentielles et métriques pour la sélection et l'orientation des travailleurs selon le postulat des aptitudes stables (Lahy, Piéron, Yerkes).",
  "fonctions latentes de l'emploi":
    "Théorie de Marie Jahoda (Marienthal, 1933) : structuration du temps, liens sociaux, but collectif transcendant, statut social et activité régulière.",
  "supervision clinique":
    "Dispositif d'élaboration intime régulier du psychologue avec un tiers extérieur pour analyser son rapport au travail, ses résonances affectives et sa déontologie (Dr. Lutumba).",
  "analyse des pratiques":
    "Dispositif collectif d'équipe (APP) animé par un intervenant pour décortiquer des situations professionnelles de terrain.",
  "job strain":
    "Modèle de tension au travail de Robert Karasek (1979) croisant forte demande psychologique et faible latitude décisionnelle (marge de manœuvre).",
  "desequilibre effort-recompense":
    "Modèle de Johannes Siegrist (1996, DER / ERI) liant la souffrance au déséquilibre entre l'effort consenti (surinvestissement) et la récompense perçue (estime, salaire, carrière).",
  rpps:
    "Répertoire Partagé des Professionnels de Santé : enregistrement officiel consacrant le psychologue comme professionnel de santé mentale indépendant.",
  "effet hawthorne":
    "Mise en évidence par Elton Mayo (1927-1932) de l'impact déterminant de l'attention portée aux salariés et du climat de groupe sur la productivité.",
};

export const QCM_BANK = [
  {
    q: "Selon Claude Dubar, quel type d'acte répond à la question : « Quel type d'homme ou de femme dit-on que vous êtes ? »",
    opts: [
      "Les actes d'appartenance (processus biographique)",
      "Les actes d'attribution (processus relationnel)",
      "Les actes de revendication statutaire",
    ],
    ok: 1,
    expl: "L'acte d'attribution émane d'autrui et des institutions : c'est le regard et l'étiquetage extérieur (identité pour autrui).",
  },
  {
    q: "Dans la théorie de Claude Dubar, la transaction subjective s'effectue entre :",
    opts: [
      "Les identités attribuées et les identités proposées par le DRH",
      "Les identités héritées du passé et les identités visées dans l'avenir",
      "Le salaire perçu et les efforts physiques fournis",
    ],
    ok: 1,
    expl: "La transaction subjective (processus biographique / pour soi) négocie la continuité de soi entre ce que l'on hérite et ce que l'on vise.",
  },
  {
    q: "Quel est l'algorithme synthétisant la théorie des champs et de l'habitus chez Pierre Bourdieu (2013) ?",
    opts: [
      "Capital Économique + Capital Culturel = Pouvoir Symbolique",
      "(Dispositions + Capital) × Champ = Habitus",
      "(Tâche Prescrite + Activité Réelle) × Sujet = Habitus",
    ],
    ok: 1,
    expl: "Dans 'Manet, Une révolution symbolique' (p. 451), Bourdieu formalise : (Dispositions + Capital) × Champ = Habitus.",
  },
  {
    q: "Dans le modèle de Renaud Sainsaulieu, quel groupe se caractérise par l'individualisme et un accès au pouvoir situé hors-travail ?",
    opts: [
      "Le modèle fusionnel",
      "Le modèle du retrait",
      "Le modèle négociateur",
      "Le modèle affinitaire",
    ],
    ok: 1,
    expl: "Le modèle du retrait considère le travail comme purement alimentaire et investit le pouvoir et le sens dans le non-travail (famille, loisirs).",
  },
  {
    q: "Pour Axel Honneth, dans quelle sphère se forge l'Estime de soi ?",
    opts: [
      "La sphère intime de l'amour et de l'amitié",
      "La sphère juridique des droits civiques universels",
      "La sphère sociale de la solidarité et de l'utilité du travail",
    ],
    ok: 2,
    expl: "L'estime de soi dépend de la reconnaissance de la valeur sociale de son activité au sein de la communauté de travail.",
  },
  {
    q: "Que désigne la « double vérité du travail » selon Pierre Bourdieu (1996) ?",
    opts: [
      "L'écart obligatoire entre la tâche prescrite et l'activité réelle",
      "Le fait que le travail est à la fois une exploitation objective et un lieu d'accomplissement subjectif passionné (l'illusio)",
      "La coexistence du travail au noir et du travail déclaré",
    ],
    ok: 1,
    expl: "Bourdieu montre que l'adhésion subjective du travailleur (l'illusio) coexiste avec la réalité objective de son exploitation économique.",
  },
  {
    q: "Quelle est l'issue d'une transaction objective caractérisée par la non-reconnaissance dans l'entreprise selon Dubar ?",
    opts: [
      "La promotion interne",
      "Le blocage interne",
      "La conversion externe",
    ],
    ok: 1,
    expl: "La non-reconnaissance interne produit le blocage interne (sentiment d'injustice, stagnation), tandis que l'exclusion externe correspond au licenciement/chômage.",
  },
  {
    q: "Dans l'enquête de Renaud Sainsaulieu, la « rivalité démocratique » et l'expertise sont la marque de :",
    opts: [
      "L'ouvrier fusionnel",
      "L'exécutant en retrait",
      "Le professionnel du modèle négociateur",
    ],
    ok: 2,
    expl: "Les cadres et professionnels négociateurs utilisent le conflit régulé et le débat d'expertise pour co-construire les règles du travail.",
  },
  {
    q: "Selon Erving Goffman, l'identité sociale virtuelle correspond à :",
    opts: [
      "L'identité numérique d'une personne sur les réseaux sociaux",
      "L'ensemble des attributs que la société prête a priori à un individu selon les catégories et stéréotypes",
      "L'évaluation objective des compétences réelles d'un salarié",
    ],
    ok: 1,
    expl: "L'identité virtuelle est l'attribution stéréotypée préalable d'autrui, par opposition à l'identité réelle prouvée par la pratique.",
  },
  {
    q: "Quelle forme prend le capital culturel lorsqu'il est certifié par des diplômes scolaires d'État selon Bourdieu ?",
    opts: [
      "Capital culturel incorporé",
      "Capital culturel objectivé",
      "Capital culturel institutionnalisé",
    ],
    ok: 2,
    expl: "Le capital culturel est incorporé (habitus, langage), objectivé (livres, tableaux) ou institutionnalisé (titres scolaires légitimes).",
  },
  {
    q: "La théorie de l'étiquetage (labeling theory) développée par Howard Becker dans 'Outsiders' affirme que :",
    opts: [
      "La déviance est une maladie mentale génétique",
      "La déviance est une étiquette collée par les groupes dominants qui façonne une carrière déviante",
      "L'étiquetage permet une meilleure productivité industrielle",
    ],
    ok: 1,
    expl: "Pour Becker, la déviance n'est pas une qualité de l'acte commis, mais une conséquence de l'application de normes et sanctions par autrui.",
  },
  {
    q: "Dans l'histoire du CNAM analysée par Thomas Le Bianic, pourquoi la profession de psychologue est-elle qualifiée de « balkanisée » ?",
    opts: [
      "Parce que la discipline est née dans les pays de l'Est",
      "En raison de divisions et concurrences historiques internes (cliniciens, travail, scolaires) et face à la médecine et aux RH",
      "Parce qu'elle n'a aucun cadre légal",
    ],
    ok: 1,
    expl: "Le Bianic montre que la profession a souffert de sa dispersion corporative et de luttes de juridiction face aux psychiatres et directeurs du personnel.",
  },
  {
    q: "Comment Claude Dubar (à la suite de Berger et Luckmann) articule-t-il socialisation primaire et socialisation secondaire ?",
    opts: [
      "La socialisation primaire à l'enfance fixe définitivement l'identité sans modification possible à l'âge adulte",
      "La socialisation secondaire professionnelle recompose ou transforme les savoirs de base incorporés lors de la socialisation primaire",
      "La socialisation secondaire efface intégralement l'habitus familial antérieur dès le premier emploi",
    ],
    ok: 1,
    expl: "Pour Dubar, la socialisation secondaire (apprentissage d'un métier, intégration en entreprise) s'articule aux schèmes de la socialisation primaire, tantôt en continuité (reproduction), tantôt en rupture (conversion).",
  },
  {
    q: "Dans la typologie de Claude Dubar, quelle forme identitaire combine une transaction objective de « conversion externe » et un modèle relationnel d'affinités ?",
    opts: [
      "L'identité d'entreprise (promotion interne)",
      "L'identité de réseau (incertaine / individualisme de projet)",
      "L'identité catégorielle (blocage interne)",
      "L'identité hors-travail (exclusion)",
    ],
    ok: 1,
    expl: "L'identité de réseau valorise la mobilité externe, les diplômes et les réseaux de pairs par affinité sélective plutôt que la fidélité à une seule organisation.",
  },
  {
    q: "Selon Renaud Sainsaulieu, qu'est-ce qui oppose fondamentalement le modèle fusionnel et le modèle de la négociation face au conflit ?",
    opts: [
      "Le modèle fusionnel bannit le désaccord interne au nom de l'unanimisme du groupe, tandis que le modèle négociateur accepte le débat contradictoire comme ressource d'expertise",
      "Le modèle fusionnel encourage la compétition individuelle, alors que le modèle négociateur impose la soumission passive au chef",
      "Aucun des deux modèles ne s'intéresse aux relations de pouvoir dans l'atelier ou le bureau",
    ],
    ok: 0,
    expl: "Dans le modèle fusionnel, la cohésion défensive exige l'unanimisme (« un pour tous ») ; dans le modèle négociateur, la rivalité démocratique permet de débattre des règles du travail.",
  },
  {
    q: "Dans les travaux de Renaud Sainsaulieu, comment se caractérise le « modèle des affinités » ?",
    opts: [
      "Par une solidarité syndicale de masse englobant tout l'atelier",
      "Par un séparatisme relationnel reposant sur de petits réseaux électifs et amicaux accompagnant une trajectoire de mobilité",
      "Par un refus total de parler à quiconque dans l'entreprise",
    ],
    ok: 1,
    expl: "Typique des salariés en mobilité sociale ou géographique, le modèle des affinités privilégie quelques relations interpersonnelles choisies (clans affinitaires) au détriment du collectif global.",
  },
  {
    q: "Dans 'Asiles' (1961), qu'appelle Erving Goffman les « adaptations secondaires » au sein d'une institution totale ?",
    opts: [
      "Les sanctions disciplinaires infligées aux nouveaux arrivants lors de la cérémonie de dégradation",
      "Les pratiques détournées et marges de manœuvre informelles par lesquelles l'individu préserve son identité propre face à l'emprise de l'institution",
      "Les formations professionnelles suivies en fin de carrière",
    ],
    ok: 1,
    expl: "Face à la mortification du moi imposée par l'institution totale, les adaptations secondaires (combines, réappropriations d'espaces) permettent au sujet de prouver qu'il reste maître de lui-même.",
  },
  {
    q: "Selon Erving Goffman ('Les rites d'interaction'), en quoi consiste le « travail de figuration » (face-work) ?",
    opts: [
      "À rédiger des organigrammes hiérarchiques pour la direction",
      "À l'ensemble des actions entreprises par une personne pour que sa conduite reste cohérente avec la 'face' (valeur sociale positive) qu'elle revendique et pour préserver celle d'autrui",
      "À masquer ses émotions par le silence absolu lors d'un licenciement",
    ],
    ok: 1,
    expl: "Garder la face et sauver la face d'autrui constituent la condition rituelle de survie de toute interaction sociale et professionnelle.",
  },
  {
    q: "Dans la sociologie interactionniste d'Everett C. Hughes, quelle est la dynamique centrale du « sale boulot » (dirty work) ?",
    opts: [
      "Il concerne uniquement les métiers du nettoyage urbain et de la voirie",
      "Toute profession comporte des tâches physiquement, socialement ou moralement dégradantes qu'elle cherche à déléguer vers les groupes statutaires inférieurs dans la division morale du travail",
      "Le sale boulot est toujours rémunéré au tarif le plus élevé dans l'organisation",
    ],
    ok: 1,
    expl: "Hughes montre que la dignité d'un groupe professionnel (ex. médecins, cadres) se construit souvent en reportant le 'sale boulot' sur des subalternes (infirmières, aides-soignantes, sous-traitants).",
  },
  {
    q: "Que désigne Everett C. Hughes par le concept de « drame social du travail » ?",
    opts: [
      "La survenue d'un accident mortel sur un chantier industriel",
      "La tension permanente entre le professionnel (qui défend son mandat, son autonomie et ses critères de qualité) et les profanes ou clients (qui veulent contrôler ou juger son service)",
      "Une pièce de théâtre jouée par le comité d'entreprise",
    ],
    ok: 1,
    expl: "Le drame social du travail se noue dans l'interaction conflictuelle autour de la définition du service, de l'urgence (routine du professionnel vs crise du client) et de la légitimité du mandat.",
  },
  {
    q: "Selon Pierre Bourdieu, que représente le « capital symbolique » dans le champ du travail ?",
    opts: [
      "Le montant des primes financières versées en fin d'année",
      "Toute espèce de capital (économique, culturel, social) lorsqu'elle est perçue et reconnue comme légitime, conférant prestige, honneur et autorité charismatique",
      "Le stock de machines et d'outils informatiques d'une usine",
    ],
    ok: 1,
    expl: "Le capital symbolique n'est pas une 5e espèce autonome de capital matériel, mais la transfiguration de n'importe quel capital en prestige et reconnaissance légitime.",
  },
  {
    q: "Selon le Code de déontologie des psychologues (Titre I, Principe 3), que garantit le principe de « Responsabilité et autonomie professionnelle » ?",
    opts: [
      "Que le psychologue obéit strictement aux instructions méthodologiques du DRH qui finance son contrat",
      "Que le psychologue choisit en toute indépendance ses modes d'intervention et ses outils, et refuse toute commande qui contreviendrait à l'éthique ou instrumentaliserait les personnes",
      "Que le psychologue peut divulguer les dossiers cliniques au médecin du travail sans l'accord du salarié",
    ],
    ok: 1,
    expl: "L'indépendance technique et morale du psychologue est inaliénable : le lien de subordination salariale ou commerciale ne peut jamais dicter le contenu de ses conclusions.",
  },
  {
    q: "En matière de « consentement libre et éclairé » (Code de déontologie / CNCDP), quelle règle s'impose au psychologue intervenant en entreprise ?",
    opts: [
      "La signature du contrat de travail par le salarié vaut consentement automatique à toutes les évaluations psychologiques demandées par l'employeur",
      "Chaque salarié doit être informé du cadre, des objectifs et des destinataires de l'intervention, et conserve le droit de refuser ou d'interrompre sa participation à tout moment sans sanction",
      "Le consentement n'est requis que pour les mineurs et les personnes sous tutelle",
    ],
    ok: 1,
    expl: "Même lorsque l'intervention est prescrite et payée par l'entreprise, nul n'est tenu de se soumettre contre son gré à un entretien ou un test psychologique.",
  },
  {
    q: "Quelle est la rupture fondatrice opérée par Wilhelm Wundt en 1879 à Leipzig ?",
    opts: [
      "La création du premier syndicat ouvrier d'Allemagne",
      "La fondation du premier laboratoire de psychologie expérimentale, dotant la discipline d'un objet (processus psychiques), d'une méthode (mesure/expérimentation) et d'un lieu",
      "L'invention de l'ergonomie de l'activité au travail",
    ],
    ok: 1,
    expl: "Wundt fonde à Leipzig en 1879 le premier laboratoire de psychologie expérimentale au monde, instaurant le paradigme scientifique de la mesure.",
  },
  {
    q: "Sur quel terrain empirique Jean-Maurice Lahy a-t-il fondé la psychotechnique française en 1908 ?",
    opts: [
      "Les pilotes de chasse de la Première Guerre mondiale",
      "Les conducteurs de tramway de la Compagnie de l'Est parisien (évaluation des temps de réaction sensorimoteurs et de l'attention)",
      "Les mineurs de fond du bassin houiller du Nord",
    ],
    ok: 1,
    expl: "Lahy est le pionnier de la psychotechnique française grâce à ses études de terrain de 1908 sur les conducteurs de tramway face à l'émergence technologique.",
  },
  {
    q: "Dans l'étude sociologique des « Chômeurs de Marienthal » (1933), quelles sont selon Marie Jahoda les « fonctions latentes » de l'emploi ?",
    opts: [
      "Le montant du salaire net et les primes d'intéressement",
      "La structuration du temps, les contacts sociaux élargis, les buts collectifs, le statut/identité sociale et l'activité régulière imposée",
      "La possibilité de faire grève et de négocier les congés payés",
    ],
    ok: 1,
    expl: "Jahoda montre que le chômage détruit bien plus qu'un revenu : il détruit les 5 fonctions latentes structurantes du temps, du lien social, du statut et du but partagé.",
  },
  {
    q: "Quelle différence théorique fondamentale sépare le modèle de Karasek (1979) et le modèle de Siegrist (1996) ?",
    opts: [
      "Karasek s'intéresse uniquement aux ouvriers alors que Siegrist n'étudie que les cadres",
      "Karasek évalue la tension par le croisement Demande/Contrôle (marge de manœuvre), tandis que Siegrist introduit le rôle clé de la Reconnaissance (Déséquilibre Effort-Récompense)",
      "Siegrist rejette totalement la notion de stress au travail",
    ],
    ok: 1,
    expl: "Le modèle ERI de Siegrist apporte la dimension cruciale de la reconnaissance symbolique et matérielle (estime, salaire, carrière) absente du modèle Job Strain de Karasek.",
  },
  {
    q: "Concernant le statut légal du psychologue en France (Loi du 25 juillet 1985 & RPPS), quelle affirmation est rigoureusement exacte ?",
    opts: [
      "Le psychologue est un auxiliaire médical travaillant sous la prescription stricte du médecin du travail",
      "Le psychologue est un professionnel de santé mentale autonome et indépendant issu des sciences humaines et sociales, dont les interventions ne sont soumises à aucune prescription médicale",
      "Le titre de psychologue peut être utilisé librement par tout coach en entreprise sans diplôme d'État",
    ],
    ok: 1,
    expl: "Le psychologue dispose d'un titre protégé (Loi de 1985, art. 44) et d'un numéro RPPS : son exercice est autonome et libre de toute prescription médicale.",
  },
  {
    q: "Pourquoi la « Supervision » est-elle un outil de travail fondamental distinct de l'« Analyse des Pratiques (APP) » selon Dr. Prisca Lutumba ?",
    opts: [
      "Parce que la supervision est payée par l'employeur tandis que l'APP est bénévole",
      "Parce que la supervision est un espace individuel d'élaboration intime du psychologue sur son propre rapport aux situations cliniques avec un tiers superviseur, tandis que l'APP est un travail collectif d'équipe",
      "Parce que l'APP ne concerne que les médecins psychiatres",
    ],
    ok: 1,
    expl: "La supervision est l'espace clinique personnel où le psychologue travaille son contre-transfert et son éthique, alors que l'APP anime la réflexion collective d'une équipe de professionnels.",
  },
];

export const QUI = [
  [
    "« L'identité est le résultat à la fois stable et provisoire, individuel et collectif, d'une double transaction biographique et relationnelle. »",
    "dubar",
    "<b>Claude Dubar.</b> Dans <i>La socialisation</i> (1991), il formalise le croisement indissociable entre l'identité pour soi et l'identité pour autrui.",
  ],
  [
    "« L'entreprise est un lieu d'apprentissage culturel des normes de relation et de la démocratie. »",
    "sainsaulieu",
    "<b>Renaud Sainsaulieu.</b> Dans <i>L'identité au travail</i> (1977), il prouve que l'accès au pouvoir au travail façonne la personnalité politique de l'adulte.",
  ],
  [
    "« (Dispositions + Capital) × Champ = Habitus. »",
    "bourdieu",
    "<b>Pierre Bourdieu.</b> Dans <i>Manet, Une révolution symbolique</i> (2013), il résume sa théorie de l'incorporation des structures sociales.",
  ],
  [
    "« Sans reconnaissance, l'individu ne peut se penser en sujet de sa propre vie. »",
    "honneth",
    "<b>Axel Honneth.</b> Dans <i>La lutte pour la reconnaissance</i> (1992), il fonde l'identité sur les 3 sphères : amour, droit et estime sociale.",
  ],
  [
    "« La déviance n'est pas une qualité de l'acte commis, mais une conséquence de l'application par les autres de normes et de sanctions. »",
    "becker",
    "<b>Howard Becker.</b> Dans <i>Outsiders</i> (1963), il pose les fondations de la théorie de l'étiquetage (<i>labeling theory</i>).",
  ],
  [
    "« La société établit des moyens de classer les personnes : l'identité sociale virtuelle s'oppose à l'identité sociale réelle. »",
    "goffman",
    "<b>Erving Goffman.</b> Dans <i>Stigmate</i> (1963), il analyse le décalage entre les attributs prêtés par autrui et la réalité du sujet.",
  ],
  [
    "« Il y a trois types purs de domination légitime : légale-rationnelle, traditionnelle et charismatique. »",
    "weber",
    "<b>Max Weber.</b> Dans <i>Économie et société</i>, il définit les fondements de l'autorité obéie au sein des bureaucraties.",
  ],
  [
    "« Le travailleur investit son désir et son intelligence dans le travail : cette vérité subjective de l'illusio masque la vérité objective de l'exploitation. »",
    "bourdieu",
    "<b>Pierre Bourdieu.</b> Dans <i>La double vérité du travail</i> (1996), il déconstruit l'engagement passionné des salariés.",
  ],
  [
    "« La psychologie du travail en France est une profession balkanisée, prise dans des luttes de juridiction face à la médecine et à la gestion. »",
    "lebianic",
    "<b>Thomas Le Bianic.</b> Dans ses travaux sur les sciences du travail au CNAM, il retrace l'émergence contrariée du métier de psychologue.",
  ],
  [
    "« Le groupe de référence d'un individu peut ne pas être son groupe d'appartenance, ce qui engendre une frustration relative. »",
    "merton",
    "<b>Robert K. Merton.</b> Dans ses <i>Éléments de théorie et de méthode sociologique</i>, il modélise la mobilité sociale anticipatrice.",
  ],
  [
    "« La supervision est un outil de travail fondamental du psychologue pour détricoter le réel du travail et élaborer sur son rapport intime aux situations. »",
    "lutumba",
    "<b>Dr. Prisca Lutumba.</b> Lors de la séance 2 de PST123 (03/11/2026), elle insiste sur l'obligation clinique de supervision individuelle pour tout psychologue.",
  ],
  [
    "« L'emploi exerce 5 fonctions latentes indispensables : structuration du temps, liens sociaux, but collectif, statut social et activité régulière. »",
    "jahoda",
    "<b>Marie Jahoda.</b> Dans <i>Les Chômeurs de Marienthal</i> (1933), elle formalise l'impact destructeur de la perte d'emploi sur la structure psychique.",
  ],
  [
    "« La psychologie du travail naît d'une rencontre entre une psychologie cherchant sa légitimité par la mesure et une industrie cherchant à augmenter son rendement. »",
    "lutumba",
    "<b>Dr. Prisca Lutumba.</b> Formule de synthèse sur la rencontre historique entre métrologie expérimentale et taylorisme industriel.",
  ],
  [
    "« La souffrance au travail s'enracine dans le déséquilibre durable entre un effort élevé consenti et une faible récompense obtenue. »",
    "siegrist",
    "<b>Johannes Siegrist.</b> Créateur en 1996 du modèle ERI (Effort-Reward Imbalance / DER) centré sur la reconnaissance au travail.",
  ],
];

export const PIEGES = [
  [
    "L'acte d'attribution concerne la manière dont l'individu se raconte et définit sa propre identité pour lui-même.",
    false,
    "Faux. C'est l'acte d'appartenance qui définit l'identité pour soi. L'acte d'attribution émane des institutions et d'autrui (identité pour autrui).",
    "dubar",
  ],
  [
    "Dans la théorie de Pierre Bourdieu, l'habitus est totalement figé dès l'enfance et ne peut jamais être modifié par le champ professionnel.",
    false,
    "Faux. L'habitus est un système de dispositions durables et transposables, mais non immuables : il s'ajuste et peut vivre des tensions dans de nouveaux champs.",
    "bourdieu",
  ],
  [
    "Le modèle fusionnel de Renaud Sainsaulieu se caractérise par des débats démocratiques contradictoires et une négociation d'expertise.",
    false,
    "Faux. C'est le modèle négociateur qui utilise le débat démocratique. Le modèle fusionnel repose sur l'unanimisme strict et bannit le désaccord interne.",
    "sainsaulieu",
  ],
  [
    "Pour Axel Honneth, l'estime de soi s'acquiert dans la sphère intime de l'amour et des liens affectifs primaires.",
    false,
    "Faux. Dans la sphère intime de l'amour, le sujet acquiert la confiance en soi. L'estime de soi s'acquiert dans la sphère sociale de la solidarité et du travail.",
    "auteurs",
  ],
  [
    "Dans la matrice de Claude Dubar, la promotion interne et la conversion externe sont deux formes de reconnaissance des transactions objectives.",
    true,
    "Vrai ! La promotion interne est la reconnaissance dans l'organisation, tandis que la conversion externe est la reconnaissance sur le marché ou par les pairs.",
    "dubar",
  ],
  [
    "La violence symbolique chez Bourdieu implique nécessairement l'usage de la force physique ou de sanctions disciplinaires explicites.",
    false,
    "Faux. La violence symbolique est douce, invisible et consentie : le dominé adhère aux catégories du dominant (ex. le culte du diplôme).",
    "bourdieu",
  ],
  [
    "Le modèle du retrait chez Sainsaulieu signifie que le salarié ne cherche aucun pouvoir dans aucun domaine de sa vie.",
    false,
    "Faux. Le salarié en retrait investit pleinement son pouvoir et ses passions dans le non-travail (famille, bricolage, vie locale).",
    "sainsaulieu",
  ],
  [
    "Selon Howard Becker, une personne devient déviante uniquement en raison de sa personnalité antisociale intrinsèque.",
    false,
    "Faux. Pour Becker (Outsiders), la déviance est le produit d'un étiquetage social appliqué par des 'entrepreneurs de morale'.",
    "auteurs",
  ],
  [
    "La loi du 25 juillet 1985 et le décret de 1990 réservent le titre de psychologue aux titulaires du Titre RNCP niveau 7 du Cnam ou d'un Master avec stage agréé.",
    true,
    "Vrai. C'est le socle légal absolu de protection du titre et d'inscription obligatoire au répertoire ADELI/RPPS.",
    "psychologue",
  ],
  [
    "Le psychologue du travail en entreprise est tenu de transmettre au DRH qui finance l'intervention les réponses individuelles des salariés.",
    false,
    "Faux. Le secret professionnel et le consentement éclairé s'opposent rigoureusement à la transmission de données nominatives au prescripteur.",
    "psychologue",
  ],
  [
    "La supervision individuelle du psychologue peut être valablement remplacée par une séance d'Analyse des Pratiques Professionnelles (APP) en équipe.",
    false,
    "Faux. L'APP est une démarche d'équipe pluridisciplinaire animée au bénéfice d'autres professionnels. La supervision est l'espace intime où le psychologue travaille son propre rapport au travail avec un tiers extérieur.",
    "psychologue",
  ],
  [
    "En France, l'intervention d'un psychologue du travail auprès d'un salarié ou en entreprise est conditionnée par une prescription médicale préalable.",
    false,
    "Faux. Les psychologues sont des professionnels de santé mentale autonomes et indépendants (RPPS) issus des SHS : leur pratique n'est soumise à aucune prescription médicale.",
    "psychologue",
  ],
  [
    "Dans le modèle de Robert Karasek (Job Strain), la reconnaissance et les perspectives de promotion salariale constituent l'axe central.",
    false,
    "Faux. C'est le modèle de Johannes Siegrist (DER / ERI) qui place la reconnaissance et les perspectives au cœur du déséquilibre. Karasek croise Demande psychologique et Latitude décisionnelle.",
    "auteurs",
  ],
  [
    "Face à un salarié en burn-out, la posture clinique du psychologue consiste en premier lieu à poser un diagnostic médical psychiatrique d'inaptitude.",
    false,
    "Faux. Le psychologue clinicien accueille la souffrance sans diagnostic hâtif, analyse le 'comment' l'organisation a conduit à l'usure et évalue la sécurité vitale/suicidaire.",
    "psychologue",
  ],
];

export const DISTINCTION = [
  {
    item: "« Quel type d'homme ou de femme dit-on que vous êtes ? »",
    cat: "autrui",
    label: "Acte d'Attribution (Dubar)",
    expl: "Émane des institutions, des classements et du regard extérieur (identité pour autrui).",
  },
  {
    item: "« Quel type d'homme ou de femme dites-vous que vous êtes ? »",
    cat: "soi",
    label: "Acte d'Appartenance (Dubar)",
    expl: "Émane de la subjectivité, de l'incorporation et de la revendication de soi (identité pour soi).",
  },
  {
    item: "Négociation entre identités héritées du passé et identités visées d'avenir",
    cat: "soi",
    label: "Transaction subjective / biographique (Dubar)",
    expl: "Construction continue de son histoire personnelle dans la durée temporelle.",
  },
  {
    item: "Négociation entre identités proposées par l'entreprise et assumées par l'agent",
    cat: "autrui",
    label: "Transaction objective / relationnelle (Dubar)",
    expl: "Rapports de force et reconnaissance dans le système d'action et les grilles statutaires.",
  },
  {
    item: "Attributs et stéréotypes prêtés d'office par la société avant toute interaction",
    cat: "autrui",
    label: "Identité sociale virtuelle (Goffman)",
    expl: "Catégorisation normative extérieure s'imposant au sujet (Stigmate, 1963).",
  },
  {
    item: "Attributs effectifs, expérience vécue et ressenti intime du sujet",
    cat: "soi",
    label: "Identité sociale réelle (Goffman)",
    expl: "Réalité concrète de l'individu au-delà de l'assignation extérieure.",
  },
  {
    item: "Rapport économique objectif d'exploitation et subordination contractuelle",
    cat: "autrui",
    label: "Vérité objective du travail (Bourdieu)",
    expl: "Contrainte salariale et appropriation de la force de travail par l'organisation.",
  },
  {
    item: "Investissement passionné, sens de l'honneur et fierté du geste (l'illusio)",
    cat: "soi",
    label: "Vérité subjective / Illusio (Bourdieu)",
    expl: "Engagement intime indispensable à la santé et au sens accordé à l'activité.",
  },
  {
    item: "Étiquette normative collée par les dominants ou 'entrepreneurs de morale'",
    cat: "autrui",
    label: "Étiquetage social de déviance (Becker)",
    expl: "La déviance est une sanction extérieure et non une essence de l'acte (Outsiders).",
  },
  {
    item: "Groupe dont l'individu adopte les valeurs pour guider ses choix d'avenir",
    cat: "soi",
    label: "Groupe de référence (Merton)",
    expl: "Socialisation anticipatrice orientée vers un groupe choisi, distinct du groupe d'origine.",
  },
  {
    item: "Injonctions managériales intériorisées comme évidentes par le travailleur",
    cat: "autrui",
    label: "Violence symbolique consentie (Bourdieu)",
    expl: "Adhésion non consciente des dominés aux classements établis par les dominants.",
  },
  {
    item: "Sentiment de dignité forgé par l'utilité sociale reconnue de son travail",
    cat: "soi",
    label: "Estime de soi et Solidarité (Honneth)",
    expl: "Troisième sphère morale où le travailleur éprouve la valeur sociale de son métier.",
  },
  {
    item: "Évaluation métrique standardisée des aptitudes pour sélectionner et affecter à un poste",
    cat: "autrui",
    label: "Psychotechnique métrique (Lahy, Yerkes)",
    expl: "Démarche quantitative d'adaptation de l'homme au poste selon des critères normatifs extérieurs.",
  },
  {
    item: "Élaboration clinique intime du psychologue sur son propre rapport aux situations de souffrance",
    cat: "soi",
    label: "Supervision clinique (Dr. Lutumba)",
    expl: "Outil personnel réflexif indispensable pour travailler son contre-transfert et son éthique face au réel.",
  },
  {
    item: "Chronométrage des gestes et découpage parcellaire des tâches imposé par la direction",
    cat: "autrui",
    label: "Organisation Scientifique du Travail (Taylor)",
    expl: "Définition prescriptive descendante visant à maximiser le rendement sans consultation de l'opérateur.",
  },
  {
    item: "Recherche du travail bien fait et développement de son pouvoir d'agir dans l'activité réelle",
    cat: "soi",
    label: "Clinique de l'activité (Yves Clot)",
    expl: "Appropriation subjective du métier et dépassement de l'activité empêchée au sein du collectif.",
  },
];

export const CLOZE = [
  {
    text: "L'identité est le résultat d'une double transaction : [biographique] pour soi et relationnelle pour autrui.",
    ans: "biographique",
    expl: "Claude Dubar montre que l'identité articule le temps du sujet (biographique) et l'espace social (relationnel).",
  },
  {
    text: "Chez Pierre Bourdieu, la formule fondamentale est : (Dispositions + Capital) × Champ = [Habitus].",
    ans: "Habitus",
    expl: "L'habitus est le système de dispositions intériorisées par l'agent au sein d'un champ social.",
  },
  {
    text: "L'acte d'[attribution] répond à la question : quel type d'homme ou de femme dit-on que vous êtes ?",
    ans: "attribution",
    expl: "L'attribution institutionnelle de l'identité émane des classements et du regard d'autrui.",
  },
  {
    text: "L'acte d'[appartenance] répond à la question : quel type d'homme ou de femme dites-vous que vous êtes ?",
    ans: "appartenance",
    expl: "L'appartenance subjective est le récit de soi que l'individu incorpore et revendique.",
  },
  {
    text: "Pour Axel Honneth, la sphère du travail et de la solidarité produit l'[estime] de soi.",
    ans: "estime",
    expl: "L'estime de soi naît de la reconnaissance de l'utilité sociale de son travail.",
  },
  {
    text: "Dans le modèle de Renaud Sainsaulieu, le modèle [fusionnel] repose sur l'unanimisme ouvrier et le refus du conflit interne.",
    ans: "fusionnel",
    expl: "Le modèle fusionnel soude le collectif dans une camaraderie sans faille contre le chef.",
  },
  {
    text: "Dans le modèle [négociateur], les salariés utilisent la rivalité démocratique et l'expertise technique.",
    ans: "négociateur",
    expl: "Les professionnels qualifiés négocient les compromis par le débat d'experts.",
  },
  {
    text: "La « double vérité du travail » selon Bourdieu oppose l'exploitation objective à l'[illusio] subjective.",
    ans: "illusio",
    expl: "L'illusio est l'adhésion passionnée au jeu social qui fait croire que le travail en vaut la chandelle.",
  },
  {
    text: "Selon Howard Becker, la déviance au travail est le produit d'un [étiquetage] par les groupes dominants.",
    ans: "étiquetage",
    expl: "La théorie de l'étiquetage (labeling theory) explique la trajectoire des salariés marginalisés.",
  },
  {
    text: "Erving Goffman oppose l'identité sociale [virtuelle] attribuée a priori à l'identité sociale réelle.",
    ans: "virtuelle",
    expl: "L'identité virtuelle est la projection stéréotypée de l'institution sur l'individu.",
  },
  {
    text: "La loi du 25 juillet [1985] protège l'usage professionnel du titre de psychologue en France.",
    ans: "1985",
    expl: "Cette loi et le décret de 1990 encadrent la délivrance du titre professionnel (Titre RNCP niveau 7 du Cnam ou Master + stage).",
  },
  {
    text: "Thomas Le Bianic qualifie la psychologie du travail en France de profession [balkanisée].",
    ans: "balkanisée",
    expl: "La balkanisation renvoie aux divisions internes historiques de la profession face à la médecine.",
  },
  {
    text: "Dans l'étude de Marienthal (1933), Marie [Jahoda] met en évidence les 5 fonctions latentes de l'emploi.",
    ans: "Jahoda",
    expl: "Marie Jahoda montre que l'emploi structure le temps, crée des liens sociaux et donne un but collectif.",
  },
  {
    text: "La [supervision] est un outil de travail personnel régulier du psychologue avec un tiers expérimenté.",
    ans: "supervision",
    expl: "Dr. Prisca Lutumba rappelle que la supervision individuelle est indispensable pour analyser son rapport aux situations de travail.",
  },
  {
    text: "Le modèle de Johannes [Siegrist] explique le stress par le déséquilibre entre effort consenti et récompense obtenue.",
    ans: "Siegrist",
    expl: "Le modèle DER / ERI met en évidence l'impact pathogène du manque d'estime et de reconnaissance au travail.",
  },
];

export const REDAC = [
  {
    id: "sujet_1",
    type: "dubar",
    t: "Dissertation : « La double transaction identitaire chez Claude Dubar : analyser la construction de l'identité professionnelle entre crise et reconnaissance. »",
    desc: "Sujet central de l'examen de E. Lucy. Mobiliser la matrice de Dubar, les actes d'attribution/appartenance et les 4 formes de reconnaissance.",
    criteria: [
      "Définir l'identité comme articulation d'un processus biographique et d'un processus relationnel",
      "Opposer actes d'attribution (identité pour autrui) et actes d'appartenance (identité pour soi)",
      "Détailler les transactions subjectives (héritées vs visées) et objectives (proposées vs incorporées)",
      "Analyser les 4 issues objectives : promotion interne, conversion externe, blocage interne, exclusion",
      "Mobiliser les styles identitaires (bloquée, menacée, incertaine, constituée)",
      "Illustrer par un cas clinique ou sociologique de rupture professionnelle",
    ],
    corrige:
      "<h4>Introduction :</h4><p>Dans <i>La socialisation : construction des identités sociales et professionnelles</i> (1991), Claude Dubar rompt avec les approches substantialistes pour définir l'identité comme le produit instable d'une <b>double transaction</b> permanente entre le sujet et le monde social. Loin d'être un état figé, l'identité professionnelle est une négociation continue entre le regard des institutions et le récit de soi.</p><h4>I. Les deux axes de la double transaction</h4><p><b>A. Le processus relationnel (Identité pour autrui) :</b><br/>Il répond à la question : <i>« Quel type d'homme ou de femme dit-on que vous êtes ? »</i>. Il s'appuie sur des <b>actes d'attribution</b> émanant des institutions légitimes (management, grilles salariales, diplômes). Il négocie les identités sociales « virtuelles » attribuées par l'organisation et oscille entre coopération/reconnaissance et conflit/non-reconnaissance.<br/><b>B. Le processus biographique (Identité pour soi) :</b><br/>Il répond à la question : <i>« Quel type d'homme ou de femme dites-vous que vous êtes ? »</i>. Il s'incarne dans des <b>actes d'appartenance</b> où l'individu revendique son identité « réelle ». Il négocie dans le temps entre identités héritées du passé et identités visées dans le futur, oscillant entre continuité et rupture.</p><h4>II. Les dynamiques de reconnaissance et les formes identitaires</h4><p><b>A. Les 4 destins de la transaction objective :</b><br/>- <i>Promotion interne</i> : reconnaissance statutaire par l'entreprise.<br/>- <i>Conversion externe</i> : reconnaissance par de nouveaux pairs ou un diplôme hors de l'entreprise.<br/>- <i>Blocage interne</i> : non-reconnaissance, sentiment de déclassement et d'amputation.<br/>- <i>Exclusion externe</i> : licenciement, chômage, rupture des attaches sociales.<br/><b>B. Les 4 styles identitaires :</b><br/>Bloquée (l'ouvrier de métier face aux réorganisations), menacée (l'exécutant du retrait), incertaine (le travailleur en conversion) et constituée (le nouveau professionnel négociateur).</p><h4>Conclusion :</h4><p>La crise d'identité survient lorsque le canal de la reconnaissance est obturé : l'identité pour soi ne trouve plus d'écho dans l'identité pour autrui. Pour le psychologue du travail, intervenir consiste à rouvrir des espaces de délibération permettant de restaurer la viabilité de cette double transaction.</p>",
  },
  {
    id: "sujet_2",
    type: "bourdieu",
    t: 'Dissertation : « Domination symbolique, habitus et \\"double vérité du travail\\" selon Pierre Bourdieu. »',
    desc: "Mobiliser la formule (Dispositions + Capital) x Champ = Habitus, les 4 capitaux et le paradoxe de l'illusio.",
    criteria: [
      "Poser l'algorithme (Dispositions + Capital) x Champ = Habitus (Bourdieu, 2013)",
      "Définir les 4 espèces de capitaux (économique, culturel incorporé/objectivé/institutionnalisé, social, symbolique)",
      "Expliquer le mécanisme de la violence symbolique et du consentement dominé",
      "Développer 'La double vérité du travail' (1996) : exploitation objective vs accomplissement subjectif (l'illusio)",
      "Conclure sur les implications pour l'intervention du psychologue du travail",
    ],
    corrige:
      "<h4>Introduction :</h4><p>Pour Pierre Bourdieu, le monde du travail n'est pas un marché neutre de libres contrats, mais un <b>champ de forces et de luttes symboliques</b>. À travers son algorithme <i>(Dispositions + Capital) × Champ = Habitus</i>, il modélise comment les inégalités sociales s'incorporent dans les corps et les esprits des travailleurs.</p><h4>I. L'incorporation de l'ordre social : Habitus et Capitaux</h4><p><b>A. La distribution inégale des 4 capitaux :</b><br/>Le capital économique (salaire) s'articule au capital culturel — décisif sous sa forme institutionnalisée (diplômes d'État) et incorporée (aisance verbale) —, au capital social (réseaux d'influence) et au capital symbolique (prestige légitime).<br/><b>B. La violence symbolique au travail :</b><br/>La domination s'exerce avec le consentement inconscient du dominé, qui intériorise les classements managériaux et s'auto-exclut des postes de pouvoir par sentiment d'illégitimité ('ce n'est pas pour moi').</p><h4>II. Le paradoxe de « La double vérité du travail » (1996)</h4><p><b>A. La vérité objective de l'exploitation :</b><br/>Le travailleur salarié est soumis à des contraintes économiques, des cadences et une dépossession de la valeur produite.<br/><b>B. La vérité subjective de l'illusio :</b><br/>Pourtant, le travailleur ne se vit pas seulement comme exploité : il investit son intelligence, son honneur et sa fierté dans l'activité bien faite. Cette passion pour le jeu (<i>l'illusio</i>) est indispensable à sa santé mentale mais sert en retour les intérêts de l'organisation.</p><h4>Conclusion :</h4><p>Comprendre la domination selon Bourdieu permet au psychologue du travail d'éviter la psychologisation naïve de la souffrance : le mal-être au travail s'enracine dans des heurts d'habitus et des violences symboliques organisationnelles.</p>",
  },
  {
    id: "sujet_3",
    type: "sainsaulieu",
    t: "Dissertation : « L'entreprise comme matrice de socialisation : comparez les modèles relationnels de Renaud Sainsaulieu et leurs prolongements contemporains. »",
    desc: "Comparer les modèles du Retrait, Fusionnel, Négociateur, Affinitaire et Promotionnel, et discuter de leur pertinence actuelle.",
    criteria: [
      "Présenter la thèse de Sainsaulieu (L'identité au travail, 1977) : l'entreprise comme lieu de socialisation politique",
      "Détailler le modèle fusionnel (camaraderie, unanimisme) et le modèle du retrait (individualisme, hors-travail)",
      "Détailler le modèle négociateur (rivalité démocratique, expertise) et le modèle affinitaire (clans de pairs)",
      "Analyser les 4 critères : accès au pouvoir, comportements relationnels, valeurs, trajectoires",
      "Mettre en perspective avec le lean management et l'individualisation actuelle du travail",
    ],
    corrige:
      "<h4>Introduction :</h4><p>En 1977, Renaud Sainsaulieu publie <i>L'identité au travail</i> et révolutionne la sociologie : l'usine et le bureau ne sont pas de simples lieux d'exécution technique, mais les matrices où se forgent la culture démocratique et l'apprentissage du pouvoir chez l'adulte.</p><h4>I. Typologie des 4 modèles relationnels d'accès au pouvoir</h4><p><b>A. Les modèles de défense : Retrait et Fusion</b><br/>- <i>Le modèle du Retrait</i> : L'exécutant privé de pouvoir dans le travail s'en retire psychologiquement ; le travail est purement alimentaire et le pouvoir est investi hors-travail (famille).<br/>- <i>Le modèle Fusionnel</i> : L'atelier ouvrier compense son absence de pouvoir formel par une camaraderie unanime et égalitaire, faisant bloc sans nuance face à la hiérarchie.<br/><b>B. Les modèles de participation : Négociation et Affinité</b><br/>- <i>Le modèle Négociateur</i> : Les professionnels qualifiés utilisent leur expertise pour débattre démocratiquement ; le conflit régulé est accepté comme instrument de progrès.<br/>- <i>Le modèle Affinitaire</i> : Les jeunes employés privilégient les relations électives par clans amicaux pour humaniser l'organisation sans s'engager dans l'institution.</p><h4>II. Pertinence et mutations contemporaines</h4><p>L'individualisation managériale (objectifs individuels, télétravail) détruit les collectifs fusionnels et affaiblit les négociateurs, favorisant un retour massif du modèle du retrait ou la prolifération de modèles carriéristes-promotionnels soumis à l'évaluation permanente.</p>",
  },
  {
    id: "sujet_4",
    type: "honneth",
    t: "Dissertation : « La lutte pour la reconnaissance au travail : d'Axel Honneth à la souffrance identitaire contemporaine. »",
    desc: "Développer les 3 sphères d'Axel Honneth (amour, droit, estime sociale), les formes de mépris et le lien avec le travail invisible.",
    criteria: [
      "Définir le paradigme de la reconnaissance chez Axel Honneth (1992)",
      "Expliciter les 3 sphères : intime (confiance), juridique (respect), sociale (estime de soi)",
      "Détailler les 3 formes de mépris social associées",
      "Appliquer la sphère de l'estime sociale au travail contemporain (travail invisible, métiers dévalorisés)",
      "Faire le lien avec les concepts de Claude Dubar (non-reconnaissance / blocage) et Christophe Dejours",
    ],
    corrige:
      "<h4>Introduction :</h4><p>Héritier de l'École de Francfort, Axel Honneth soutient dans <i>La lutte pour la reconnaissance</i> (1992) que l'injustice sociale contemporaine ne se résume pas à l'inégalité de distribution des richesses : elle réside avant tout dans le <b>déni de reconnaissance morale</b> infligé aux individus.</p><h4>I. L'architecture tripartite de la reconnaissance</h4><p><b>1. La sphère de l'amour (intime)</b> : Assure la <i>confiance en soi</i> corporelle ; le mépris y prend la forme de violences physiques ou d'atteinte à l'intégrité.<br/><b>2. La sphère du droit (juridique)</b> : Fonde le <i>respect de soi</i> comme sujet de droit égal ; le mépris y prend la forme de l'exclusion civique ou de la discrimination statutaire.<br/><b>3. La sphère de la solidarité (sociale / travail)</b> : Construit l'<i>estime de soi</i> par la valorisation de la contribution singulière du travailleur au bien commun ; le mépris y prend la forme de la dévalorisation culturelle de son utilité.</p><h4>II. La crise de l'estime sociale dans le travail moderne</h4><p>Les crises contemporaines du travail (invisibilisation des métiers du 'care', reporting chronométré, perte de sens) sont des pathologies de la non-reconnaissance. Comme le théorise Claude Dubar, la non-reconnaissance des transactions objectives condamne le travailleur au blocage interne ou à l'exclusion, sapant les fondements de son estime de soi.</p>",
  },
];

export const DEONTOLOGIE_PRINCIPLES = [
  {
    n: "Respect des droits de la personne et du consentement",
    desc: "Le psychologue réfère son action aux principes fondamentaux de dignité et de liberté. Il recueille le consentement libre et éclairé du sujet avant toute évaluation ou accompagnement.",
    eg: "Informer clairement un salarié des objectifs et destinataires d'un entretien avant de commencer.",
    trap: "Accepter d'administrer des tests psychométriques à des salariés sans leur accord explicite à la demande du DRH.",
  },
  {
    n: "Compétence et rigueur théorique",
    desc: "Le psychologue tient sa compétence d'une formation universitaire de haut niveau (Loi de 1985). Il explicite les fondements théoriques et méthodologiques de ses choix d'intervention.",
    eg: "Mobiliser les grilles de Dubar et de Sainsaulieu pour éclairer une crise d'équipe lors d'un audit.",
    trap: "Utiliser des outils non validés scientifiquement (morphopsychologie, MBTI dévoyé) pour évaluer des aptitudes.",
  },
  {
    n: "Responsabilité et Indépendance professionnelle",
    desc: "Le psychologue décide en toute autonomie du choix de ses méthodes et conclusions. Il refuse toute consigne hiérarchique qui violerait son éthique ou biaiserait son diagnostic.",
    eg: "Refuser de modifier les conclusions d'un rapport d'intervention pour complaire à la direction.",
    trap: "Laisser le commanditaire imposer la liste des questions ou rédiger les préconisations du rapport.",
  },
  {
    n: "Respect du but assigné et non-instrumentalisation",
    desc: "Les dispositifs établis répondent exclusivement aux motifs négociés de l'intervention. Le psychologue refuse que ses outils servent au tri social ou à justifier des licenciements.",
    eg: "Limiter l'usage d'un diagnostic d'équipe à l'amélioration des conditions de travail réelles.",
    trap: "Détourner une cellule d'écoute psychologique pour identifier les salariés 'fragiles' en vue d'un PSE.",
  },
  {
    n: "Confidentialité et Secret professionnel partagé",
    desc: "Le psychologue préserve rigoureusement la vie privée des personnes. Il ne restitue au commanditaire que des conclusions collectives argumentées et rigoureusement anonymisées.",
    eg: "Restituer une synthèse des dysfonctionnements organisationnels sans jamais citer de noms ni de propos individuels identifiables.",
    trap: "Transmettre les comptes-rendus d'entretiens individuels ou les profils psychologiques à la direction des ressources humaines.",
  },
];

export const CAS = [
  {
    desc: "Dans un atelier de plasturgie réorganisé en îlots autonomes 'lean', les anciens ouvriers de métier refusent de renseigner les tablettes numériques et s'opposent aux jeunes recrues polyvalentes. La direction dénonce un 'conservatisme archaïque'.",
    q: [
      {
        q: "Comment analyser sociologiquement la posture des anciens ouvriers selon Dubar et Sainsaulieu ?",
        opts: [
          "C'est un modèle du retrait caractérisé par un individualisme alimentaire",
          "C'est une identité bloquée issue d'un modèle fusionnel : défense du métier et de la règle ouvrière face à la déqualification managériale",
          "C'est un modèle promotionnel d'adhésion totale à la direction",
        ],
        ok: 1,
        expl: "Les ouvriers de métier vivent une identité bloquée (Dubar) ancrée dans un collectif fusionnel (Sainsaulieu) qui voit son savoir-faire incorporé disqualifié par les outils numériques.",
      },
      {
        q: "Quelle posture clinique et déontologique le psychologue du travail doit-il adopter ?",
        opts: [
          "Mettre en place des formations de remise à niveau obligatoire pour forcer l'acceptation de la tablette",
          "Négocier un mandat pour ouvrir un espace de controverse de métier entre anciens et jeunes sur la qualité du travail réel",
          "Conseiller au DRH de licencier les meneurs de la contestation",
        ],
        ok: 1,
        expl: "Le psychologue transforme la demande brute d'adaptation en mandat de débat professionnel, permettant aux anciens de transmettre leurs savoirs incorporés.",
      },
    ],
  },
  {
    desc: "Une cadre supérieure autodidacte de 45 ans, promue directrice de division, souffre d'un syndrome de l'imposteur aigu et n'ose pas s'imposer face aux jeunes ingénieurs issus de grandes écoles. Elle consulte pour 'manque de confiance en soi'.",
    q: [
      {
        q: "Quelle lecture théorique bourdieusienne éclaire la souffrance de cette cadre ?",
        opts: [
          "Elle souffre d'une pathologie psychiatrique génétique individuelle",
          "Un heurt d'habitus et une violence symbolique : son capital culturel non institutionnalisé par un grand diplôme la fait se sentir illégitime dans ce champ",
          "Elle a un modèle du retrait et cherche à quitter l'entreprise",
        ],
        ok: 1,
        expl: "Bourdieu montre que l'habitus autodidacte subit la violence symbolique des titres scolaires institutionnalisés au sein du champ managérial.",
      },
      {
        q: "Dans quelle sphère de la reconnaissance selon Axel Honneth se situe le levier d'action ?",
        opts: [
          "La sphère juridique des droits universels",
          "La sphère sociale de l'estime de soi : faire reconnaître la valeur singulière de son capital d'expérience et de ses réussites concrètes",
          "La sphère affective intime uniquement",
        ],
        ok: 1,
        expl: "L'estime de soi (Honneth) se reconstruit en faisant reconnaître par les pairs et l'organisation la valeur de sa contribution pratique.",
      },
    ],
  },
  {
    desc: "Un DRH commande un diagnostic 'RPS et Climat social' suite à 3 démissions surprises d'experts techniques. Il demande au psychologue de lui remettre la liste nominative des salariés 'à risque de départ'.",
    q: [
      {
        q: "Quelle règle déontologique absolue le psychologue doit-il opposer au DRH ?",
        opts: [
          "La loi de 1985 lui interdit de parler aux salariés",
          "Le secret professionnel et le respect du but assigné : refus absolu de transmettre des listes nominatives ou de servir d'outil de tri RH",
          "Accepter si le DRH promet de doubler ses honoraires",
        ],
        ok: 1,
        expl: "Le psychologue défend son indépendance et protège les personnes : les conclusions doivent être strictement collectives et anonymisées.",
      },
      {
        q: "Comment reformuler la demande brute selon Claude Dubar ?",
        opts: [
          "Faire passer des tests de personnalité pour dépister la fragilité des experts",
          "Analyser la crise de la transaction objective (blocage interne de carrière, déficit de reconnaissance de l'expertise) poussant les négociateurs à la conversion externe",
          "Organiser une soirée festive pour recréer du lien affinitaire",
        ],
        ok: 1,
        expl: "Les démissions d'experts sont souvent le résultat d'un blocage interne dans la transaction relationnelle, amenant ces professionnels à réussir une conversion externe.",
      },
    ],
  },
  {
    desc: "Un technicien de maintenance aéronautique senior (54 ans, 28 ans d'ancienneté), reconnu par ses pairs pour son diagnostic empirique des pannes complexes, voit son service restructuré autour d'un logiciel prédictif standardisé piloté par de jeunes ingénieurs. Son poste est reclassé en « opérateur de contrôle N1 » sans perspective d'évolution. Il s'isole, refuse de participer aux réunions d'équipe et exprime un profond sentiment d'amputation professionnelle.",
    q: [
      {
        q: "Comment qualifier la crise traversée par ce technicien selon les grilles de Claude Dubar et Renaud Sainsaulieu ?",
        opts: [
          "Une identité catégorielle en situation de blocage interne (rupture de la transaction relationnelle qui disqualifie son identité de métier et le prive de son modèle négociateur)",
          "Une identité d'entreprise en pleine promotion interne soutenue par la direction",
          "Une identité hors-travail choisie dès l'embauche par manque d'intérêt pour la technique",
        ],
        ok: 0,
        expl: "Ce professionnel subit une discordance aiguë entre son identité pour soi (expert de métier autonome) et l'acte d'attribution déqualifiant de l'organisation ('opérateur N1'), provoquant un blocage interne (Dubar) et la perte de son pouvoir de négociation (Sainsaulieu).",
      },
      {
        q: "Quel dispositif clinique le psychologue du travail doit-il proposer pour dénouer cette crise identitaire ?",
        opts: [
          "Orienter immédiatement le salarié vers une rupture conventionnelle pour rajeunir les effectifs",
          "Ouvrir un espace de reconnaissance et d'articulation des savoirs (anciens/jeunes ingénieurs) pour restaurer la transaction relationnelle et convertir son expertise empirique en rôle de référent-formateur",
          "Lui prescrire une formation obligatoire à la gestion des émotions pour accepter son déclassement",
        ],
        ok: 1,
        expl: "Le psychologue agit sur la transaction relationnelle (reconnaissance institutionnelle des savoirs d'expérience) et la transaction biographique (continuité du sens du métier par la transmission).",
      },
    ],
  },
  {
    desc: "Dans un EHPAD en sous-effectif chronique, les infirmières et l'encadrement délèguent systématiquement aux aides-soignantes et aux ASH les toilettes les plus lourdes, la gestion des souillures et l'accueil des familles mécontentes. Lors des transmissions médicales, la parole des aides-soignantes sur l'état clinique et psychologique des résidents est coupée (« contentez-vous du ménage et du nursing »). Elles expriment un sentiment de honte et d'indignité.",
    q: [
      {
        q: "Quels concepts d'Everett Hughes et d'Erving Goffman permettent d'éclairer cette souffrance professionnelle ?",
        opts: [
          "La délégation du « sale boulot » (dirty work) au bas de la division morale du travail (Hughes) doublée d'une assignation stigmatisante qui menace la face des agentes (Goffman)",
          "Un excès de capital symbolique et culturel institutionnalisé chez les aides-soignantes",
          "Une application idéale de la solidarité démocratique du modèle négociateur",
        ],
        ok: 0,
        expl: "Hughes montre comment les groupes supérieurs préservent leur prestige en déléguant le 'sale boulot' physique et moral aux subalternes ; Goffman éclaire l'atteinte à la face et le stigmate d'incompétence clinique imposé lors des transmissions.",
      },
      {
        q: "Quelle intervention le psychologue du travail doit-il mener dans ce service ?",
        opts: [
          "Supprimer les réunions de transmission pour éviter les tensions entre infirmières et aides-soignantes",
          "Réinstituer les aides-soignantes comme interlocutrices légitimes dans les transmissions cliniques et faire reconnaître la haute valeur d'expertise relationnelle du care (estime sociale d'Honneth)",
          "Externaliser l'ensemble des aides-soignantes vers une société de nettoyage sous-traitante",
        ],
        ok: 1,
        expl: "L'intervention vise à transformer le 'drame social du travail' (Hughes) en espace de coopération où l'observation clinique fine des aides-soignantes est reconnue et valorisée.",
      },
    ],
  },
  {
    desc: "Un DRH convoque le psychologue du travail interne et lui demande de recevoir d'urgence un représentant syndical (salarié protégé) qui conteste publiquement la réorganisation d'un service. Le DRH glisse au psychologue : « Faites-lui passer des tests de personnalité pour démontrer sa rigidité paranoïaque et son inaptitude relationnelle, cela nous servira de pièce médicale pour demander son autorisation de licenciement à l'Inspection du travail ».",
    q: [
      {
        q: "Quels principes fondamentaux du Code de déontologie des psychologues (et de la CNCDP) sont directement violés par cette commande ?",
        opts: [
          "Aucun principe, car le psychologue salarié est soumis au lien de subordination juridique envers son employeur",
          "L'indépendance professionnelle, le respect du but assigné, le consentement libre et éclairé et l'interdiction absolue d'instrumentaliser la psychologie à des fins d'éviction disciplinaire",
          "Uniquement le principe de facturation des honoraires d'expertise",
        ],
        ok: 1,
        expl: "Le Code de déontologie (Principes 1, 3 et 6) garantit l'indépendance technique et éthique du psychologue : il ne peut jamais prêter son concours à une opération de tri, de sanction ou de pathologisation d'un conflit social.",
      },
      {
        q: "Quelle réponse opérationnelle le psychologue du travail doit-il opposer au DRH ?",
        opts: [
          "Opposer un refus déontologique formel à cette évaluation individuelle, rappeler l'intangibilité du secret professionnel et proposer un mandat d'analyse collective des tensions organisationnelles du service",
          "Faire passer les tests mais ne transmettre les résultats qu'oralement au DRH sans laisser de trace écrite",
          "Demander au médecin du travail de déclarer le salarié inapte sans l'examiner",
        ],
        ok: 0,
        expl: "Le psychologue protège le sujet contre l'instrumentalisation, maintient la triangulation déontologique et déplace la demande brute pathologisante vers l'analyse du travail réel.",
      },
    ],
  },
];

export const CASES: CaseItem[] = CAS.map((c) => ({
  vignette: c.desc,
  q1: {
    prompt: c.q[0]!.q,
    options: c.q[0]!.opts.map((label, i) => ({
      label,
      ok: i === c.q[0]!.ok,
      fb: c.q[0]!.expl,
    })),
  },
  q2: {
    prompt: c.q[1]!.q,
    options: c.q[1]!.opts.map((label, i) => ({
      label,
      ok: i === c.q[1]!.ok,
      fb: c.q[1]!.expl,
    })),
  },
}));

export const PROTO: ProtoStep[] = [
  {
    n: 1,
    t: "Réception de la demande brute institutionnelle",
    role: "Cadrage initial",
    d: "Accueillir la plainte du commanditaire sans valider son cadrage individualisant ou managérial.",
  },
  {
    n: 2,
    t: "Analyse des rapports de force et de la triangulation",
    role: "Analyse sociologique",
    d: "Identifier les intérêts divergents du prescripteur, des collectifs de travail et du psychologue au sein du champ (Bourdieu).",
  },
  {
    n: 3,
    t: "Négociation déontologique et reformulation du mandat",
    role: "Contractualisation",
    d: "Transformer la demande en mandat écrit d'analyse du travail réel, garantissant indépendance et secret professionnel.",
  },
  {
    n: 4,
    t: "Recueil sous consentement libre et éclairé",
    role: "Enquête clinique",
    d: "Mener entretiens et observations sur la double transaction identitaire et les conditions réelles de travail.",
  },
  {
    n: 5,
    t: "Analyse des formes et dynamiques identitaires",
    role: "Diagnostic théorique",
    d: "Mobiliser les matrices de Dubar (biographique/relationnelle) et Sainsaulieu (modèles de pouvoir) pour expliquer la crise.",
  },
  {
    n: 6,
    t: "Restitution préalable compréhensible aux professionnels",
    role: "Règle déontologique",
    d: "Partager l'analyse avec les salariés concernés avant toute transmission pour valider le sens de l'expérience vécue.",
  },
  {
    n: 7,
    t: "Rapport anonymisé et co-construction de perspectives",
    role: "Transformation",
    d: "Présenter au comité paritaire des préconisations organisationnelles restaurant la reconnaissance et le pouvoir d'agir.",
  },
];

export const PROTO_REFERENCE_EXPLANATION =
  "La démarche rigoureuse d'intervention en PST123 articulée aux cours de E. Lucy : 1) Réception de la demande brute, 2) Analyse de la triangulation et des champs, 3) Négociation du mandat déontologique, 4) Recueil sous consentement libre et éclairé, 5) Diagnostic par les grilles de Dubar et Bourdieu, 6) Restitution compréhensible aux salariés, 7) Rapport anonymisé restaurant la reconnaissance.";

export const FRISE = [
  {
    y: "1893",
    t: "Durkheim : De la division du travail social",
    d: "Théorisation de la solidarité mécanique (ressemblance) et organique (différenciation et complémentarité des métiers).",
  },
  {
    y: "1910-25",
    t: "Lahy & Piéron au CNAM : Naissance des sciences du travail",
    d: "Fondation de l'INOP et de la psychotechnique expérimentale (Thomas Le Bianic).",
  },
  {
    y: "1963",
    t: "Becker (Outsiders) & Goffman (Stigmate)",
    d: "L'interactionnisme symbolique : théories de l'étiquetage, de la déviance et de l'identité virtuelle vs réelle.",
  },
  {
    y: "1977",
    t: "Renaud Sainsaulieu : L'identité au travail",
    d: "L'entreprise comme matrice d'apprentissage des normes relationnelles et du pouvoir (Fusion, Retrait, Négociation, Affinité).",
  },
  {
    y: "1985",
    t: "Loi du 25 juillet 1985 : Protection du titre de Psychologue",
    d: "Consécration juridique de la profession en France ; inscription ADELI/RPPS obligatoire.",
  },
  {
    y: "1991",
    t: "Claude Dubar : La socialisation",
    d: "Modélisation de la double transaction identitaire (biographique et relationnelle) et des 4 formes d'identités sociales.",
  },
  {
    y: "1992",
    t: "Axel Honneth : La lutte pour la reconnaissance",
    d: "Théorisation des 3 sphères de la reconnaissance morale (amour, droit, estime sociale du travail).",
  },
  {
    y: "1996",
    t: "Pierre Bourdieu : La double vérité du travail",
    d: "Démonstration du paradoxe entre exploitation objective et investissement passionné (l'illusio).",
  },
];

export const PARCOURS = [
  {
    key: "phase1",
    titre: "1. Notions Fondatrices de l'Identité",
    fenetre: "J-30 → J-21",
    but: "Maîtriser les auteurs socles de la Séance 1 : Piaget, Durkheim, Weber, Becker, Goffman, Merton, Rosenthal.",
    onglets: [
      ["fiches", "Fiches 1 & 2"],
      ["cartes", "Cartes Auteurs Socles"],
      ["qui", "Qui a dit quoi ?"],
    ],
    taches: [
      "Assimiler l'assimilation/accommodation de Piaget et la solidarité organique de Durkheim",
      "Distinguer les 3 types de domination wébérienne (rationnelle-légale, traditionnelle, charismatique)",
      "Retenir la théorie de l'étiquetage de Becker et l'identité virtuelle de Goffman",
    ],
  },
  {
    key: "phase2",
    titre: "2. La Double Transaction de Claude Dubar",
    fenetre: "J-20 → J-12",
    but: "Dominer le cœur battant du cours de E. Lucy : transactions biographiques et relationnelles.",
    onglets: [
      ["fiches", "Fiches 3, 4, 5 & 6"],
      ["distinguer", "Attribution vs Appartenance"],
      ["antiseche", "Matrice de Dubar"],
    ],
    taches: [
      "Apprendre par cœur la distinction : Actes d'attribution (autrui) vs Actes d'appartenance (pour soi)",
      "Maîtriser les 4 destins : promotion interne, conversion externe, blocage interne, exclusion",
      "Associer les 4 styles identitaires : bloquée, menacée, incertaine, constituée",
    ],
  },
  {
    key: "phase3",
    titre: "3. Dominations & Modèles Relationnels (Bourdieu & Sainsaulieu)",
    fenetre: "J-11 → J-5",
    but: "Intégrer l'habitus de Bourdieu et les 4 modèles relationnels de Sainsaulieu.",
    onglets: [
      ["fiches", "Fiches 7 à 12"],
      ["qcm", "Banque QCM Bourdieu/Sainsaulieu"],
      ["pieges", "Pièges V/F"],
    ],
    taches: [
      "Mémoriser l'algorithme : (Dispositions + Capital) × Champ = Habitus",
      "Distinguer les 4 capitaux et la double vérité du travail (exploitation vs illusio)",
      "Maîtriser les 4 modèles de Sainsaulieu : Fusion, Retrait, Négociation, Affinité",
      "Intégrer les 3 sphères d'Axel Honneth : amour, droit, estime sociale",
    ],
  },
  {
    key: "phase4",
    titre: "4. Entraînement Rédactionnel & Examen Blanc",
    fenetre: "J-4 → Jour J",
    but: "Rédiger des dissertations sociologiques parfaites selon les critères de E. Lucy.",
    onglets: [
      ["redac", "Sujets de dissertation"],
      ["cas", "Études de cas Moodle"],
      ["exam", "Examen blanc"],
    ],
    taches: [
      "S'entraîner à reproduire de mémoire le tableau d'antisèche de Claude Dubar",
      "Rédiger un plan dialectique sur la double transaction ou la domination au travail",
      "Valider la posture déontologique du psychologue (Loi 1985, triangulation, mandat)",
    ],
  },
];

export const RECITS = [
  {
    a: "dubar",
    ic: "[DUBAR]",
    t: "La crise d'identité de l'ouvrier de métier face au lean management",
    sub: "De l'identité bloquée à la quête d'un modèle négociateur",
    parts: [
      {
        beat: "L'attribution institutionnelle de l'incompétence",
        html: "Dans une usine métallurgique, l'installation de robots programmés relègue Marcel, ouvrier tourneur depuis 25 ans, au rôle de simple surveillant de machine. L'institution lui attribue une <span class='kw'>identité virtuelle</span> d'exécutant obsolète. C'est l'<b>acte d'attribution</b> négatif.",
      },
      {
        beat: "La résistance de l'identité pour soi",
        html: "Marcel se revendique toujours comme l'artisan du métal qui 'écoute le bruit de la matière'. Son <b>acte d'appartenance</b> s'ancre dans une culture ouvrière fusionnelle (Sainsaulieu). Il refuse de renseigner les indicateurs de cadence, provoquant un <b>blocage interne</b>.",
      },
      {
        beat: "L'intervention clinique du psychologue",
        html: "Le psychologue négocie un mandat pour ouvrir un espace de controverse sur les règles de l'art. Marcel y explicite ses tours de main aux jeunes ingénieurs, transformant son identité bloquée en une <span class='kw'>identité constituée</span> d'expert formateur reconnue par le collectif.",
      },
    ],
  },
  {
    a: "bourdieu",
    ic: "[BOURDIEU]",
    t: "Le syndrome d'illégitimité de la cadre autodidacte",
    sub: "Violence symbolique, heurt d'habitus et quête d'estime sociale",
    parts: [
      {
        beat: "Le choc des capitaux dans le champ managérial",
        html: "Promue directrice commerciale grâce à ses résultats hors pair, Sarah est issue d'un milieu populaire sans diplôme universitaire. Face aux cadres supérieurs dotés d'un fort <span class='kw'>capital culturel institutionnalisé</span>, elle est saisie par un profond sentiment d'indignité : la <b>violence symbolique</b> opère à son insu.",
      },
      {
        beat: "L'illusion du surmenage compensatoire",
        html: "Pour compenser son habitus populaire, elle s'enferme dans une hyperactivité épuisante : son <b>illusio</b> (Bourdieu) la pousse à travailler 70h par semaine pour prouver sa légitimité, frôlant le burn-out.",
      },
      {
        beat: "La restauration de l'estime de soi",
        html: "L'accompagnement clinique lui permet de conscientiser le champ social et d'activer la sphère de l'<b>estime sociale</b> (Honneth) en valorisant son capital d'expérience pratique et relationnel unique.",
      },
    ],
  },
];

export {
  ANNALES_PST123,
  ANNALES_PST123_REDAC_ITEMS,
  METHODE_ANALYSE_PST123,
  CRITERES_EVALUATION_PST123,
  type AnnalePst123Item,
} from "./pst123-annales";

import { ANNALES_PST123, ANNALES_PST123_REDAC_ITEMS } from "./pst123-annales";

export const REDAC_ITEMS: RedacItem[] = [
  ...REDAC.map((r) => [r.t, [r.desc, ...r.criteria], r.corrige] as RedacItem),
  ...ANNALES_PST123_REDAC_ITEMS,
];

export const EXAM_SUBJECTS = ANNALES_PST123;

export const LEXIQUE = [
  {
    w: "La Double Transaction Identitaire",
    a: "dubar",
    def: "Concept central de Claude Dubar (1991) : l'identité se construit à l'intersection d'un processus biographique (pour soi, dans le temps) et d'un processus relationnel (pour autrui, dans l'espace social).",
    dubar:
      "La santé identitaire dépend de l'ajustement entre identités héritées/visées et identités attribuées/assumées.",
    eg: "Le jeune médecin qui concilie son héritage familial d'ouvrier (biographique) et son nouveau statut de praticien hospitalier (relationnel).",
  },
  {
    w: "Actes d'Attribution vs d'Appartenance",
    a: "dubar",
    def: "Attribution = ce qu'autrui et les institutions disent de vous (identité pour autrui). Appartenance = ce que vous dites et revendiquez de vous-même (identité pour soi).",
    dubar:
      "L'attribution relève du pouvoir institutionnel ; l'appartenance relève de la subjectivité et du récit de vie.",
    eg: "Être étiqueté 'agent administratif C' par les RH (attribution) mais se vivre comme 'pilote de projet associatif' (appartenance).",
  },
  {
    w: "L'Habitus et la théorie des Champs",
    a: "bourdieu",
    def: "Formule de Pierre Bourdieu : (Dispositions + Capital) × Champ = Habitus. L'habitus est l'histoire incorporée qui oriente nos conduites dans un champ social de luttes.",
    bourdieu:
      "Chaque champ professionnel distribue inégalement des capitaux (économique, culturel, social, symbolique).",
    eg: "L'aisance naturelle d'un diplômé de grande école lors d'un entretien d'embauche reflétant son habitus bourgeois incorporé.",
  },
  {
    w: "La Double Vérité du Travail",
    a: "bourdieu",
    def: "Texte de Bourdieu (1996) démontrant que le travail est indissociablement une exploitation objective (rapport de force) et un accomplissement subjectif passionné (l'illusio).",
    bourdieu:
      "L'illusio est l'intérêt désintéressé pour le jeu professionnel qui fait tenir le salarié malgré la pénibilité.",
    eg: "Le chercheur ou l'infirmière qui ne comptent pas leurs heures par passion tout en étant sous-payés par l'institution.",
  },
  {
    w: "Les 4 Modèles Relationnels de Sainsaulieu",
    a: "sainsaulieu",
    def: "Modèles d'accès au pouvoir et d'apprentissage des normes en entreprise : Retrait (individualiste), Fusionnel (unanimiste), Négociateur (démocratique), Affinitaire (clans).",
    sainsaulieu:
      "L'entreprise est une matrice politique où s'apprennent le pouvoir et la citoyenneté.",
    eg: "Le collectif d'atelier qui fait bloc sans faille contre le chef de production (modèle fusionnel).",
  },
  {
    w: "Les 3 Sphères de la Reconnaissance (Honneth)",
    a: "auteurs",
    def: "Théorie critique d'Axel Honneth : l'Amour (confiance en soi), le Droit (respect de soi), et la Solidarité/Travail (estime de soi).",
    auteurs:
      "Le déni de reconnaissance au travail inflige un mépris social qui détruit l'estime de soi.",
    eg: "Le sentiment d'invisibilité des éboueurs dont l'utilité vitale n'est pas reconnue socialement.",
  },
  {
    w: "Les Styles Identitaires de Dubar",
    a: "dubar",
    def: "Les 4 configurations issues de la double transaction : Bloquée (métier refusé), Menacée (exécutant précaire), Incertaine (transition floue), Constituée (expert légitimé).",
    dubar:
      "Permet de diagnostiquer la vulnérabilité d'un salarié face aux restructurations.",
    eg: "Le technicien autodidacte bloqué au même coefficient depuis 15 ans développant une identité bloquée.",
  },
  {
    w: "La Balkanisation de la Psychologie (Le Bianic)",
    a: "psychologue",
    def: "Concept historique décrivant la division interne et les luttes de territoire des psychologues face aux psychiatres et directeurs RH en France.",
    psychologue:
      "Explique la nécessité d'un cadre déontologique fort pour défendre l'indépendance de la profession.",
    eg: "Le combat historique pour la loi de 1985 protégeant le titre universitaire de psychologue.",
  },
  {
    w: "Acte d'Attribution (Identité pour autrui)",
    a: "dubar",
    def: "Processus relationnel et institutionnel répondant à la question « Quel type d'homme ou de femme dit-on que vous êtes ? ». Il désigne les catégories et étiquettes imposées par autrui et l'organisation (Dubar, 1991).",
    dubar:
      "Résulte des rapports de force dans le système d'action et de la légitimité des grilles de classement managériales.",
    eg: "Être classé comme « opérateur polyvalent non qualifié » dans une nouvelle grille de compétences d'usine.",
  },
  {
    w: "Acte d'Appartenance (Identité pour soi)",
    a: "dubar",
    def: "Processus biographique et subjectif répondant à la question « Quel type d'homme ou de femme dites-vous que vous êtes ? ». Il exprime l'incorporation et la revendication active de soi par le sujet (Dubar, 1991).",
    dubar:
      "Constitue l'identité sociale « réelle » que l'individu se forge en référence à ses groupes d'appartenance ou de référence.",
    eg: "Un agent hospitalier qui se revendique « soignant de première ligne » au-delà de sa fiche de poste administrative.",
  },
  {
    w: "Identité de Réseau / Conversion Externe (Dubar)",
    a: "dubar",
    def: "Forme identitaire caractérisée par une transaction biographique de rupture/projet et une transaction relationnelle orientée vers la reconnaissance externe (pairs, diplômes, marché) via des réseaux affinitaires.",
    dubar:
      "Correspond au style d'identité incertaine ou d'individualisme de projet cherchant une conversion hors de l'entreprise.",
    eg: "Le jeune cadre ou consultant qui suit une formation diplômante du soir au Cnam pour bifurquer vers un nouveau métier.",
  },
  {
    w: "Identité d'Entreprise / Promotion Interne (Dubar)",
    a: "dubar",
    def: "Forme identitaire articulant une forte mobilisation subjective dans l'organisation et une reconnaissance institutionnelle ascendante par la hiérarchie interne.",
    dubar:
      "Issue favorable de la transaction objective dans l'entreprise, associée à une loyauté forte envers l'institution.",
    eg: "Le technicien engagé dans les projets internes qui gravit successivement les échelons d'agent de maîtrise puis de chef de service.",
  },
  {
    w: "Identité Catégorielle / Blocage Interne (Dubar)",
    a: "dubar",
    def: "Forme identitaire marquée par un fort attachement à un métier spécialisé (continuité biographique) mais heurtée par un refus de reconnaissance de l'organisation (non-reconnaissance interne).",
    dubar:
      "Génère une « identité bloquée » conflictuelle où le professionnel défend ses règles de l'art contre la polyvalence imposée.",
    eg: "L'ouvrier imprimeur de métier dont l'expertise manuelle est ignorée lors du passage au pilotage informatisé.",
  },
  {
    w: "Identité Hors-Travail / Exclusion (Dubar)",
    a: "dubar",
    def: "Forme identitaire où le travail est vécu sur un mode purement instrumental et alimentaire, tandis que la transaction objective menace le sujet de précarisation ou d'exclusion du marché de l'emploi.",
    dubar:
      "Correspond au style d'« identité menacée » couplé au modèle du retrait, sous la menace de non-reconnaissance globale.",
    eg: "L'opérateur intérimaire sur ligne d'emballage qui n'attend aucune reconnaissance de l'usine et investit sa vie familiale ou associative.",
  },
  {
    w: "Socialisation Primaire vs Secondaire",
    a: "dubar",
    def: "Distinction de Berger & Luckmann (1966) reprise par Dubar : la socialisation primaire (enfance, famille) incorpore les savoirs de base et le monde vécu originel ; la socialisation secondaire (école pro, travail) intériorise des « sous-mondes » spécialisés.",
    dubar:
      "La socialisation professionnelle secondaire ne part jamais d'une page blanche : elle s'appuie sur ou transforme l'habitus primaire.",
    eg: "L'apprentissage du secret médical et du langage clinique par l'élève infirmier lors de ses stages hospitaliers (socialisation secondaire).",
  },
  {
    w: "Modèle Fusionnel (Sainsaulieu)",
    a: "sainsaulieu",
    def: "Modèle culturel et relationnel caractérisé par l'absence de pouvoir individuel compensée par une solidarité collective unanime, égalitaire et défensive derrière un leader ou le groupe.",
    sainsaulieu:
      "Le collectif fait bloc (« un pour tous, tous pour un ») et bannit toute divergence interne pour résister à l'autorité hiérarchique.",
    eg: "Une équipe d'ouvriers métallurgistes ou de dockers opposant un front unanime à une modification unilatérale des cadences.",
  },
  {
    w: "Modèle de la Négociation (Sainsaulieu)",
    a: "sainsaulieu",
    def: "Modèle relationnel propre aux professionnels qualifiés, techniciens et cadres disposant d'un fort pouvoir d'expertise et acceptant la « rivalité démocratique » et le débat contradictoire.",
    sainsaulieu:
      "Le conflit d'idées n'est pas vécu comme une trahison mais comme l'instrument normal d'ajustement et d'innovation au travail.",
    eg: "Des ingénieurs et soignants confrontant leurs arguments techniques en réunion pluridisciplinaire pour définir le meilleur protocole.",
  },
  {
    w: "Modèle des Affinités (Sainsaulieu)",
    a: "sainsaulieu",
    def: "Modèle relationnel fondé sur le séparatisme vis-à-vis du collectif global et la création de petits réseaux électifs et amicaux (« clans affinitaires ») soutenant une mobilité individuelle.",
    sainsaulieu:
      "Les relations affectives choisies servent de soutien psychologique dans les trajectoires d'ascension ou de reconversion.",
    eg: "Un petit groupe de jeunes techniciens diplômés qui déjeunent entre eux et s'échangent des opportunités de carrière sans se mêler à l'atelier.",
  },
  {
    w: "Modèle du Retrait (Sainsaulieu)",
    a: "sainsaulieu",
    def: "Modèle relationnel caractérisé par un désinvestissement psychologique de l'entreprise, un individualisme marqué au poste et un investissement du pouvoir et du sens dans la sphère hors-travail.",
    sainsaulieu:
      "Résulte d'une organisation taylorienne ou précaire qui prive l'exécutant de toute prise sur son activité.",
    eg: "L'employé de saisie qui exécute strictement ses heures pour son salaire, évite les réunions et s'accomplit comme président d'un club sportif local.",
  },
  {
    w: "Stigmate (Erving Goffman)",
    a: "auteurs",
    def: "Dans 'Stigmate' (1963), attribut (corporel, moral ou social) qui jette un discrédit profond sur la personne en créant un écart dévalorisant entre son identité sociale virtuelle et son identité sociale réelle.",
    auteurs:
      "Le sujet stigmatisé oscille entre le 'discrédité' (stigmate visible d'emblée) et le 'discréditable' (stigmate caché qu'il tente de dissimuler).",
    eg: "Le travailleur porteur d'une reconnaissance RQTH ou d'un trou de chômage sur son CV qui craint d'être réduit à une étiquette d'inaptitude.",
  },
  {
    w: "Institution Totale (Erving Goffman)",
    a: "auteurs",
    def: "Dans 'Asiles' (1961), lieu de résidence et de travail où un grand nombre d'individus placés dans la même situation, coupés du monde extérieur, mènent ensemble une vie recluse intégralement administrée.",
    auteurs:
      "L'institution totale opère une 'mortification du moi' à laquelle les sujets résistent par des 'adaptations secondaires' et la distance au rôle.",
    eg: "L'hôpital psychiatrique fermé, la prison, le navire au long cours ou, par extension critique, certaines organisations hyper-contrôlantes.",
  },
  {
    w: "La Face et la Figuration (Erving Goffman)",
    a: "auteurs",
    def: "La 'face' est la valeur sociale positive qu'une personne revendique à travers la ligne d'action que les autres supposent qu'elle a adoptée. La 'figuration' (face-work) désigne les rituels visant à ne faire perdre la face à personne.",
    auteurs:
      "Toute interaction de travail repose sur un pacte implicite de préservation mutuelle de la face entre interlocuteurs.",
    eg: "Un manager qui reformule diplomatiquement une erreur technique en réunion pour éviter d'humilier publiquement son collaborateur.",
  },
  {
    w: "Drame Social du Travail (Everett Hughes)",
    a: "auteurs",
    def: "Concept de l'École de Chicago désignant la tension structurelle de l'interaction entre le professionnel (pour qui l'acte relève de la routine experte et du mandat) et le client ou profane (pour qui la situation est une urgence vitale).",
    auteurs:
      "Au cœur du drame social du travail se joue la lutte pour maintenir l'autonomie du jugement professionnel face aux pressions externes.",
    eg: "L'urgentiste hospitalier qui doit gérer simultanément la détresse émotionnelle d'une famille et le tri froid des priorités médicales.",
  },
  {
    w: "Sale Boulot / Dirty Work (Everett Hughes)",
    a: "auteurs",
    def: "Concept d'Everett Hughes (1951) montrant que tout métier comporte des tâches physiquement répugnantes, socialement dégradantes ou moralement douteuses que les groupes dominants cherchent à déléguer vers les échelons inférieurs.",
    auteurs:
      "La division technique du travail est indissociablement une division morale du travail qui hiérarchise la dignité des métiers.",
    eg: "La délégation des tâches d'annonce de licenciement, de nettoyage des souillures ou de sous-traitance des risques industriels.",
  },
  {
    w: "Indépendance Professionnelle (CNCDP / Déontologie)",
    a: "psychologue",
    def: "Principe cardinal du Code de déontologie des psychologues (Titre I, Principe 3) : le psychologue maîtrise en toute autonomie ses méthodes, ses outils et ses conclusions, sans jamais se soumettre aux pressions du commanditaire.",
    psychologue:
      "La Commission Nationale Consultative de Déontologie des Psychologues (CNCDP) rappelle que le lien salarial n'abolit jamais l'indépendance technique et éthique.",
    eg: "Refuser d'utiliser un test non scientifiquement validé ou de modifier un diagnostic RPS à la demande d'un directeur d'établissement.",
  },
  {
    w: "Consentement Libre et Éclairé (Code de Déontologie)",
    a: "psychologue",
    def: "Obligation déontologique (Principe 1 et Art. 9-12) d'informer préalablement toute personne des objectifs, méthodes et destinataires de l'intervention, et de recueillir son accord explicite sans contrainte.",
    psychologue:
      "En entreprise, le contrat de travail ne vaut pas consentement automatique à l'investigation psychologique : le droit de retrait ou de refus du salarié est absolu.",
    eg: "Expliciter à chaque salarié en début d'entretien d'audit que sa participation est volontaire et que ses propos resteront strictement anonymes.",
  },
  {
    w: "La Psychotechnique (Lahy, Piéron, Yerkes)",
    a: "psychologue",
    def: "Application des méthodes différentielles et expérimentales pour la sélection et l'orientation des travailleurs selon le postulat des aptitudes stables et prédictives (1908-1939).",
    psychologue:
      "Née de la rencontre entre psychologie métrique et taylorisme, elle s'implante au Cnam dès 1928 avec l'INOP au 41 rue Gay-Lussac.",
    eg: "Les épreuves psychomotrices de Jean-Maurice Lahy en 1908 sur les conducteurs de tramway de l'Est parisien.",
  },
  {
    w: "Les 5 Fonctions Latentes de l'Emploi (Marie Jahoda)",
    a: "auteurs",
    def: "Théorie issue de l'étude des Chômeurs de Marienthal (1933) : l'emploi structure le temps, crée des liens hors-famille, procure un but collectif, assigne un statut et impose une activité régulière.",
    auteurs:
      "La privation d'emploi détruit ces fonctions protectrices, entraînant anomie, apathie et effondrement identitaire.",
    eg: "Le désœuvrement et la perte des repères temporels vécus par les ouvriers après la fermeture brutale de leur usine.",
  },
  {
    w: "La Supervision Clinique du Psychologue (Dr. Prisca Lutumba)",
    a: "psychologue",
    def: "Outil de travail individuel obligatoire dans l'éthique de la pratique : espace régulier avec un tiers extérieur pour analyser son rapport intime aux situations cliniques et son contre-transfert.",
    psychologue:
      "À distinguer rigoureusement de l'Analyse des Pratiques (APP, qui est collective pour une équipe) et de la régulation de crise.",
    eg: "Un psychologue du travail qui élabore en supervision sur l'angoisse éprouvée face à un salarié verbalisant des idées suicidaires.",
  },
  {
    w: "Le Modèle Job Strain (Robert Karasek)",
    a: "auteurs",
    def: "Modèle de tension au travail (1979) croisant la demande psychologique (charge, cadences) et la latitude décisionnelle (marge de manœuvre), complété par le soutien social (Isostrain).",
    auteurs:
      "Une forte demande conjuguée à une faible latitude décisionnelle constitue le facteur prédictif majeur de stress pathologique.",
    eg: "L'opérateur de centre d'appels soumis à un temps d'appel minuté strict sans pouvoir dévier des scripts prescrits.",
  },
  {
    w: "Le Déséquilibre Effort-Récompense (Johannes Siegrist)",
    a: "auteurs",
    def: "Modèle ERI (1996) liant la détresse psychique à la disproportion entre les efforts fournis (surinvestissement, contraintes) et les récompenses obtenues (estime, salaire, perspectives).",
    auteurs:
      "Dépasse le modèle de Karasek en introduisant la question fondamentale de la reconnaissance au travail.",
    eg: "Le cadre hospitalier dévoué corps et âme dont le dévouement n'obtient aucune reconnaissance matérielle ni symbolique de la direction.",
  },
  {
    w: "Le Statut RPPS et l'Indépendance Déontologique (Loi 1985)",
    a: "psychologue",
    def: "Protection pénale du titre (Loi du 25 juillet 1985) et inscription au Répertoire Partagé des Professionnels de Santé en tant que professionnel de santé mentale indépendant.",
    psychologue:
      "Le psychologue n'est pas un paramédical sous prescription médicale : il est souverain dans le choix de ses méthodes et de son cadre.",
    eg: "Refuser la tentative d'un médecin du travail de dicter le nombre d'entretiens psychologiques accordés à un agent.",
  },
];

export {
  PST123_OFFICIAL_RESOURCES,
  type Pst123OfficialResource,
} from "./pst123-ressources";

