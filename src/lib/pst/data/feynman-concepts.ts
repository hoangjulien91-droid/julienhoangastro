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
        "chercheur",
      ],
      sampleAnswer:
        "L'autoconfrontation croisée consiste à filmer un travailleur dans son activité réelle. La vidéo est d'abord visionnée par le travailleur avec le chercheur (autoconfrontation simple), puis confrontée aux commentaires et dialogues d'un pair sur la même activité, afin de provoquer une controverse professionnelle et de développer le pouvoir d'agir.",
    },
  ],
  pst108: [
    {
      id: "matrice_dialogique",
      title: "La Matrice Dialogique",
      desc: "En quoi consiste la matrice dialogique et la relation entre langage, pensée et activité ?",
      keywords: [
        "dialogue",
        "langage",
        "pensee",
        "activite",
        "interlocuteur",
        "signification",
      ],
      sampleAnswer:
        "La matrice dialogique montre que le langage n'est pas un simple code, mais un outil d'interlocution. Il sert de médiateur entre la pensée et l'activité réelle, transformant les énoncés en instruments de travail en interaction constante avec un interlocuteur.",
    },
    {
      id: "instrument",
      title: "L'Instrument (Vygotski / Rabardel)",
      desc: "Expliquez la genèse instrumentale (l'artefact devenant un instrument par l'usage).",
      keywords: [
        "artefact",
        "instrument",
        "instrumentalisation",
        "instrumentation",
        "vygotski",
        "rabardel",
      ],
      sampleAnswer:
        "D'après Vygotski et Rabardel, un outil physique ou logiciel brut est un artefact. Il ne devient un instrument pour le sujet que lorsqu'il est approprié par l'usage, à travers deux processus : l'instrumentation (le sujet s'adapte à l'artefact) et l'instrumentalisation (l'artefact est détourné/adapté par le sujet pour son activité).",
    },
  ],
  pst120: [
    {
      id: "ergonomie_cognitive",
      title: "Ergonomie Cognitive",
      desc: "Quelles sont les spécificités de l'ergonomie cognitive par rapport à l'ergonomie physique ?",
      keywords: [
        "charge mentale",
        "cognition",
        "interface",
        "utilisateur",
        "erreur",
        "conception",
      ],
      sampleAnswer:
        "L'ergonomie cognitive s'intéresse aux processus mentaux (perception, mémoire, raisonnement) dans l'activité. Contrairement à l'ergonomie physique centrée sur les postures, elle vise à concevoir des interfaces intuitives adaptées aux capacités de l'utilisateur pour réduire la charge mentale et prévenir l'erreur humaine.",
    },
  ],
  pst123: [
    {
      id: "souffrance_defense",
      title: "Souffrance et Stratégies de Défense",
      desc: "Expliquez comment les travailleurs luttent contre la souffrance au travail via des stratégies collectives.",
      keywords: [
        "dejours",
        "souffrance",
        "defense",
        "reconnaissance",
        "defense collective",
        "normalite",
      ],
      sampleAnswer:
        "Selon Christophe Dejours, lorsque la reconnaissance du travail fait défaut, la souffrance émerge. Pour maintenir la normalité psychique et continuer à travailler, les salariés déploient des stratégies de défense collectives (déni du danger, virilisme, etc.) pour masquer la souffrance et conjurer la peur.",
    },
  ],
  pst124: [
    {
      id: "analyse_ergonomique",
      title: "L'Analyse Ergonomique du Travail",
      desc: "Quels sont les objectifs clés de l'analyse ergonomique du travail en entreprise ?",
      keywords: [
        "observation",
        "verbalisation",
        "tache",
        "activite",
        "demande",
        "diagnostic",
      ],
      sampleAnswer:
        "L'analyse ergonomique du travail part d'une demande sociale. L'ergonome procède à des observations rigoureuses de l'activité réelle et à des verbalisations provoquées pour comprendre la distance entre la tâche prescrite et l'activité réelle afin d'établir un diagnostic et transformer le travail.",
    },
  ],
};
