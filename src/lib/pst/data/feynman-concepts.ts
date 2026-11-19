export interface FeynmanConcept {
  id: string;
  title: string;
  desc: string;
  keywords: string[];
  sampleAnswer?: string;
}

export const CONCEPTS_BY_MODULE: Record<string, FeynmanConcept[]> = {
  pst106: [
    {
      id: "genre_style",
      title: "Genre et Style",
      desc: 'Expliquez la différence fondamentale entre le "genre professionnel" (collectif) et le "style" (individuel) d\'après Yves Clot.',
      keywords: [
        "genre",
        "style",
        "collectif",
        "individuel",
        "regles",
        "metamorphoser",
      ],
      sampleAnswer:
        "Le genre professionnel correspond aux règles de métier partagées et héritées par le collectif, régissant ce qui se fait et ne se fait pas. Le style est la métamorphose individuelle de ce genre par le travailleur pour y introduire sa propre créativité et répondre à une situation singulière.",
    },
    {
      id: "reel_activite",
      title: "Le Réel de l'Activité",
      desc: "Qu'est-ce que le \"réel de l'activité\" par rapport à l'activité simplement réalisée ?",
      keywords: [
        "reel",
        "realise",
        "empeche",
        "refoule",
        "possible",
        "activite",
      ],
      sampleAnswer:
        "Le réel de l'activité englobe non seulement ce qui est effectivement réalisé, mais aussi tout ce qui ne s'est pas fait : les activités empêchées, le possible refoulé, ce que l'on aurait voulu faire ou ce que l'on a dû s'interdire de faire.",
    },
    {
      id: "autoconfrontation",
      title: "L'Autoconfrontation Croisée",
      desc: "Décrivez le protocole et les objectifs de la méthode d'autoconfrontation croisée.",
      keywords: [
        "video",
        "confrontation",
        "pairs",
        "dialogue",
        "activite",
        "controverse",
      ],
      sampleAnswer:
        "L'autoconfrontation croisée consiste à filmer un travailleur dans son activité réelle. La vidéo est d'abord visionnée par le travailleur avec le chercheur (autoconfrontation simple), puis confrontée aux commentaires et dialogues d'un pair sur la même activité, afin de provoquer une controverse professionnelle et de développer le pouvoir d'agir.",
    },
    {
      id: "tache_activite_wisner",
      title: "Tâche prescrite vs Activité réelle (Alain Wisner)",
      desc: "Pourquoi l'activité réelle déborde-t-elle toujours la tâche prescrite en ergonomie ?",
      keywords: [
        "tache",
        "activite",
        "prescrit",
        "reel",
        "variabilite",
        "regulation",
      ],
      sampleAnswer:
        "La tâche prescrite définit ce qui doit être fait selon les objectifs et procédures formelles. L'activité réelle est ce que déploie concrètement le travailleur face aux aléas imprévus du milieu (pannes, variabilité biologique, contraintes temporelles) en procédant à des régulations constantes pour que le travail fonctionne.",
    },
    {
      id: "leplat_5_carres",
      title: "Le Modèle des 5 Carrés & Double Régulation (Leplat)",
      desc: "Expliquez le schéma des 5 carrés de Jacques Leplat et le mécanisme de la double régulation.",
      keywords: [
        "leplat",
        "conditions",
        "activite",
        "effets",
        "regulation",
        "operateur",
      ],
      sampleAnswer:
        "Le modèle de Leplat relie les conditions externes (tâche) et internes (état de l'opérateur) à l'activité réelle, laquelle produit deux types d'effets : sur la production et sur l'opérateur (fatigue, santé). Une double régulation rétroagit en permanence sur la tâche (ajustement des modes opératoires) et sur l'opérateur.",
    },
    {
      id: "normativite_canguilhem",
      title: "Santé & Normativité (Georges Canguilhem)",
      desc: "Pourquoi la santé au travail n'est-elle pas le silence des organes ni l'adaptation passive aux normes prescrites ?",
      keywords: [
        "canguilhem",
        "normativite",
        "normes",
        "milieu",
        "sante",
        "infidelite",
      ],
      sampleAnswer:
        "Pour Canguilhem, la santé est la normativité : la capacité à tolérer les infidélités du milieu et à instituer de nouvelles normes de vie et de travail. La pathologie survient quand le travailleur est réduit à subir une norme rigide unique sans marge de manœuvre.",
    },
    {
      id: "catachrese_individualisation",
      title: "Catachrèse & Critique de l'Individualisation (Roussan)",
      desc: "En quoi la catachrèse révèle-t-elle l'ingéniosité ordinaire, et pourquoi l'individualisation des RPS est-elle un piège clinique ?",
      keywords: [
        "catachrese",
        "outil",
        "individualisation",
        "organisation",
        "collectif",
        "rps",
      ],
      sampleAnswer:
        "La catachrèse est le détournement créatif d'un outil hors de sa fonction prescrite pour faire tenir le travail réel. À l'inverse, l'individualisation (coaching, gestion du stress) psychologise des souffrances d'origine organisationnelle et détruit les collectifs de métier.",
    },
    {
      id: "architecture_4_dimensions",
      title: "Architecture du Métier en 4 Dimensions (Clot / Wuilleumier)",
      desc: "Décrivez les 4 dimensions du métier (impersonnelle, personnelle, interpersonnelle, transpersonnelle) et ce qui arrive quand le transpersonnel cède.",
      keywords: [
        "impersonnelle",
        "personnelle",
        "interpersonnelle",
        "transpersonnelle",
        "genre",
        "metier",
      ],
      sampleAnswer:
        "Le métier tient sur quatre instances : impersonnelle (la prescription), personnelle (le style et l'histoire du sujet), interpersonnelle (l'échange avec autrui) et transpersonnelle (le genre professionnel hérité). Quand la dimension transpersonnelle s'effondre, le sujet se retrouve seul face à la prescription rigide.",
    },
  ],
  pst108: [
    {
      id: "pouvoir_symbolique_bourdieu",
      title: "Pouvoir Symbolique & 'Status est magistratus'",
      desc: "Pourquoi Pierre Bourdieu affirme-t-il que le pouvoir des mots ne réside pas dans la langue mais dans l'institution déléguée ?",
      keywords: [
        "bourdieu",
        "status",
        "institution",
        "pouvoir",
        "symbolique",
        "marche",
      ],
      sampleAnswer:
        "Contre l'illusion internaliste d'Austin, Bourdieu démontre que les mots ne tirent pas leur efficacité de propriétés linguistiques ou poétiques intrinsèques, mais du mandat institutionnel et de l'autorité statutaire reconnue au locuteur ('Status est magistratus'). L'efficacité performative reflète les rapports sociaux de force incorporés.",
    },
    {
      id: "agir_communicationnel_habermas",
      title: "Agir Communicationnel vs Agir Stratégique",
      desc: "Distinguez l'agir stratégique de l'agir communicationnel selon Jürgen Habermas.",
      keywords: [
        "habermas",
        "strategique",
        "communicationnel",
        "entente",
        "validite",
        "succes",
      ],
      sampleAnswer:
        "L'agir stratégique est orienté vers le succès personnel, l'efficacité ou la manipulation d'autrui comme moyen. L'agir communicationnel vise l'intercompréhension libre (Verständigung) et la coordination de l'action par l'accord mutuel, en soumettant les prétentions à l'intelligibilité, la vérité, la justesse et la sincérité.",
    },
    {
      id: "reconnaissance_honneth",
      title: "Les 3 Sphères de Reconnaissance & Réification",
      desc: "Expliquez les trois sphères de reconnaissance morale d'Axel Honneth et la définition de la réification.",
      keywords: [
        "honneth",
        "amour",
        "droit",
        "estime",
        "reification",
        "mepris",
      ],
      sampleAnswer:
        "Honneth distingue l'amour (confiance en soi), le droit (respect de soi) et la solidarité sociale (estime de soi par la valeur du travail). La réification est un 'oubli de la reconnaissance' originaire d'autrui comme sujet, réduisant l'individu à un simple instrument chiffré.",
    },
    {
      id: "methode_iod_valls",
      title: "La Méthode IOD & le Refus du Tri Préalable",
      desc: "En quoi la méthode IOD de Francis Valls et Denis Castra rompt-elle avec l'idéologie de l'employabilité ?",
      keywords: [
        "valls",
        "castra",
        "iod",
        "employabilite",
        "tri",
        "negociation",
      ],
      sampleAnswer:
        "L'idéologie de l'employabilité fait porter la responsabilité du chômage sur un déficit individuel à combler par des stages. La Méthode IOD (Castra & Valls) refuse déontologiquement le tri et la sélection des candidats, et négocie directement avec l'entreprise sur les conditions réelles d'accueil du poste pour sécuriser l'intégration durable.",
    },
    {
      id: "goffman_dramaturgie_stigmate",
      title: "Dramaturgie, Coulisses & Stigmate (Erving Goffman)",
      desc: "Articulez les notions de façade, coulisses, distance au rôle et stigmate (discrédité vs discréditable) dans les interactions de travail.",
      keywords: [
        "goffman",
        "facade",
        "coulisses",
        "distance",
        "stigmate",
        "discreditable",
      ],
      sampleAnswer:
        "Pour Goffman, les acteurs préservent la face sur scène grâce à la façade, mais ont besoin de coulisses (salles de pause) pour relâcher la tension normative. La distance au rôle protège le sujet, tandis que le stigmate oppose le discrédité (visible) au discréditable (invisible devant gérer le secret).",
    },
    {
      id: "garfinkel_dubet_injustices",
      title: "Ethnométhodologie (Garfinkel) & 3 Injustices (Dubet)",
      desc: "Qu'est-ce qu'une expérience de brèche chez Garfinkel et comment s'articulent les 3 principes de justice au travail selon François Dubet ?",
      keywords: [
        "garfinkel",
        "breche",
        "dubet",
        "egalite",
        "merite",
        "autonomie",
      ],
      sampleAnswer:
        "Garfinkel révèle les allants de soi tacites qui fondent l'ordre social via des expériences de brèche. François Dubet montre que le sentiment d'injustice au travail naît de la contradiction insoluble entre trois principes légitimes : l'égalité des statuts, le mérite individuel et l'autonomie créatrice.",
    },
    {
      id: "searle_vanderveken_cassin",
      title: "Actes Illocutoires F(P) & Démise de la Vérité (Cassin)",
      desc: "Distinguez force illocutoire F(P), succès vs satisfaction (Vanderveken) et le performatif politique selon Barbara Cassin.",
      keywords: [
        "vanderveken",
        "force",
        "succes",
        "satisfaction",
        "cassin",
        "performatif",
      ],
      sampleAnswer:
        "Chez Searle et Vanderveken, un acte illocutoire associe une force F et un contenu propositionnel P ; il peut être réussi selon les règles sans être satisfait (ex. promesse non tenue). Barbara Cassin montre comment le performatif institue un monde commun mais risque la démise de la vérité sophistique.",
    },
  ],
  pst120: [
    {
      id: "souffrance_defense_dejours",
      title: "Normalité Souffrante & Défenses Collectives",
      desc: "Pourquoi Christophe Dejours définit-il la santé au travail comme une lutte et non comme un état de repos ?",
      keywords: [
        "dejours",
        "souffrance",
        "defense",
        "virilisme",
        "cynisme",
        "normalite",
      ],
      sampleAnswer:
        "La normalité au travail n'est pas l'absence de souffrance, mais une 'normalité souffrante' stabilisée par des stratégies de défense collectives (virilisme sur les chantiers, cynisme partagé). Ces défenses permettent aux travailleurs de conjurer la peur et de résister psychiquement aux contraintes de l'organisation.",
    },
    {
      id: "souffrance_ethique",
      title: "La Souffrance Éthique",
      desc: "Définissez la souffrance éthique selon la psychodynamique du travail.",
      keywords: [
        "ethique",
        "trahison",
        "valeurs",
        "mal-travail",
        "culpabilite",
        "dejours",
      ],
      sampleAnswer:
        "La souffrance éthique émerge lorsqu'un travailleur est contraint par les prescriptions gestionnaires ou le management par le chiffre d'accomplir des actes qu'il réprouve moralement (tromper un client, bâcler un soin), provoquant un sentiment aigu de trahison de soi et de honte.",
    },
    {
      id: "care_molinier",
      title: "Travail de Care & Dynamique de Genre",
      desc: "Comment Pascale Molinier articule-t-elle le care, la vulnérabilité et l'invisibilité du travail soigné ?",
      keywords: [
        "molinier",
        "care",
        "genre",
        "vulnerabilite",
        "invisibilite",
        "discretion",
      ],
      sampleAnswer:
        "Pascale Molinier montre que le travail de care (soin, sollicitude, attention aux détails) exige un engagement subjectif intense auprès de la vulnérabilité d'autrui. Parce qu'il est historiquement assigné aux femmes et fondé sur la discrétion, il souffre d'une invisibilisation économique et sociale majeure.",
    },
  ],
  pst123: [
    {
      id: "double_transaction_dubar",
      title: "La Double Transaction Identitaire (Claude Dubar)",
      desc: "Distinguez la transaction biographique (pour soi) et la transaction relationnelle (pour autrui) chez Dubar.",
      keywords: [
        "dubar",
        "transaction",
        "biographique",
        "relationnelle",
        "pour soi",
        "pour autrui",
      ],
      sampleAnswer:
        "L'identité est le produit de deux transactions complémentaires : la transaction biographique (axe diachronique pour soi, négociant entre identités héritées et visées) et la transaction relationnelle (axe synchronique pour autrui, négociant entre identités attribuées par l'institution et identités assumées par le sujet).",
    },
    {
      id: "modeles_sainsaulieu",
      title: "Les 4 Modèles d'Identité au Travail (Sainsaulieu)",
      desc: "Présentez les quatre modèles relationnels d'identité au travail théorisés par Renaud Sainsaulieu.",
      keywords: [
        "sainsaulieu",
        "fusionnel",
        "negociation",
        "affinitaire",
        "retrait",
      ],
      sampleAnswer:
        "Sainsaulieu dégage quatre cultures d'atelier : le modèle fusionnel (ouvriers non qualifiés, camaraderie unie contre le chef), le modèle de la négociation (ouvriers qualifiés et cadres, débat démocratique), le modèle affinitaire (mobilité promotionnelle, réseaux choisis), et le modèle du retrait (désengagement du travail au profit de la sphère privée).",
    },
    {
      id: "deontologie_psychologue",
      title: "Indépendance Professionnelle & Secret Déontologique",
      desc: "Quels sont les principes déontologiques fondamentaux qui protègent l'exercice du psychologue du travail ?",
      keywords: [
        "deontologie",
        "secret",
        "independance",
        "consentement",
        "subordination",
        "code",
      ],
      sampleAnswer:
        "Le Code de déontologie (2021) garantit le respect des droits fondamentaux de la personne, le secret professionnel et le consentement éclairé. Bien que lié par un lien de subordination juridique à l'employeur, le psychologue préserve une indépendance technique et déontologique absolue dans le choix de ses méthodes et conclusions.",
    },
    {
      id: "bourdieu_double_verite",
      title: "Habitus & Double Vérité du Travail (Pierre Bourdieu)",
      desc: "Expliquez l'équation de l'habitus et pourquoi l'illusio masque l'exploitation objective au travail.",
      keywords: [
        "bourdieu",
        "habitus",
        "champ",
        "capital",
        "illusio",
        "exploitation",
      ],
      sampleAnswer:
        "Selon la formule (Dispositions + Capital) × Champ = Habitus, les travailleurs incorporent les structures sociales. L'illusio (investissement passionné et honneur du métier) constitue la vérité subjective qui donne sens à l'activité tout en occultant la vérité objective de l'exploitation économique.",
    },
    {
      id: "balkanisation_le_bianic",
      title: "Histoire & Balkanisation du Métier (Thomas Le Bianic)",
      desc: "Pourquoi Thomas Le Bianic qualifie-t-il la psychologie du travail de profession balkanisée et quel rôle joue la Loi de 1985 ?",
      keywords: [
        "le bianic",
        "balkanisee",
        "cnam",
        "loi 1985",
        "juridiction",
        "titre",
      ],
      sampleAnswer:
        "Le Bianic montre que les psychologues du travail ont souffert de clivages internes (psychotechniciens, cliniciens, ergonomes) et de luttes de juridiction face aux médecins du travail et aux DRH. La Loi du 25 juillet 1985 protège enfin le titre unique de psychologue.",
    },
    {
      id: "demande_verbatims_lutumba",
      title: "Analyse de la Demande & Proscription des Verbatims (Lutumba)",
      desc: "Comment passer de la commande patronale à la demande clinique, et pourquoi proscrire les verbatims individuels en restitution ?",
      keywords: [
        "commande",
        "demande",
        "verbatims",
        "anonymat",
        "represailles",
        "restitution",
      ],
      sampleAnswer:
        "Analyser la demande transforme déjà une commande managériale figée en action clinique. En restitution écrite, le Dr. Prisca Lutumba proscrit absolument les verbatims individuels : même anonymisés, les collègues et la direction reconnaissent le style du salarié, l'exposant à des représailles.",
    },
  ],
  pst124: [
    {
      id: "acceptabilite_acceptation",
      title: "Acceptabilité a priori vs Acceptation située",
      desc: "Pourquoi Marc-Éric Bobillier-Chaumon oppose-t-il l'acceptabilité a priori à l'acceptation située ?",
      keywords: [
        "bobillier-chaumon",
        "acceptabilite",
        "acceptation",
        "situee",
        "activite",
        "usage",
      ],
      sampleAnswer:
        "L'acceptabilité a priori évalue sur maquette l'intention théorique d'un individu isolé (modèles TAM). L'acceptation située analyse l'appropriation réelle et collective de la technologie dans l'activité concrète de travail, confrontée aux aléas, à la charge cognitive et aux dynamiques d'équipe.",
    },
    {
      id: "genese_instrumentale",
      title: "La Genèse Instrumentale (Pierre Rabardel)",
      desc: "Expliquez comment un artefact technique se transforme en instrument pour le travailleur.",
      keywords: [
        "rabardel",
        "artefact",
        "instrument",
        "instrumentation",
        "instrumentalisation",
        "scheme",
      ],
      sampleAnswer:
        "Un artefact technique brut ne devient un instrument que par la genèse instrumentale. Elle associe l'instrumentation (le travailleur s'adapte à l'outil et développe de nouveaux schèmes d'action) et l'instrumentalisation (le travailleur transforme, personnalise ou détourne l'artefact pour répondre aux nécessités de son activité réelle).",
    },
    {
      id: "porosite_temps",
      title: "Porosité des Temps & Droit à la Déconnexion",
      desc: "Quels sont les risques psychosociaux liés à l'effacement des frontières spatiotemporelles par les outils numériques ?",
      keywords: [
        "porosite",
        "deconnexion",
        "teletravail",
        "charge mentale",
        "frontiere",
        "surconnexion",
      ],
      sampleAnswer:
        "Les technologies mobiles et le télétravail génèrent une porosité entre vie professionnelle et personnelle. L'injonction d'immédiateté et l'hyper-connexion empêchent la récupération psychique, alimentent la charge mentale et peuvent mener au burn-out, d'où la nécessité clinique d'un droit effectif à la déconnexion.",
    },
  ],
};
