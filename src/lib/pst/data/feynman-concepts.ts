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
