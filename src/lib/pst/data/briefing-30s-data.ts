export interface BriefingData {
  ue: string;
  title: string;
  theseCentrale: string;
  citations: { auteur: string; texte: string }[];
  conceptsCles: { terme: string; def: string }[];
  erreurFatale: string;
  checklist: string[];
}

export const BRIEFINGS: Record<string, BriefingData> = {
  PST106: {
    ue: "PST106",
    title: "Clinique de l'activité & Ergonomie",
    theseCentrale:
      "La santé au travail ne réside pas dans l'absence de contraintes, mais dans le développement du pouvoir d'agir et la vitalité du genre professionnel permettant de surmonter l'écart irréductible entre travail prescrit et travail réel.",
    citations: [
      {
        auteur: "Yves Clot (1999)",
        texte:
          "Le réel de l'activité, c'est aussi ce qui ne se fait pas, ce qu'on cherche à faire sans y parvenir — le drame des échecs —, ce qu'on aurait voulu ou pu faire.",
      },
      {
        auteur: "Alain Wisner (1995)",
        texte:
          "L'écart entre le travail prescrit et le travail réel est universel : sans l'intelligence régulatrice de l'opérateur, aucune production ne fonctionnerait.",
      },
      {
        auteur: "Ivar Oddone (1981)",
        texte:
          "Dis-moi comment tu travailles de telle sorte que si je te remplace demain comme ton sosie, personne ne s'aperçoive de la substitution.",
      },
    ],
    conceptsCles: [
      {
        terme: "Tâche vs Activité",
        def: "Ce qui est à faire (prescrit) vs ce qui se fait réellement (coût et régulation).",
      },
      {
        terme: "Réel de l'activité",
        def: "Inclut l'activité réalisée + l'empêché, le contrarié, le suspendu.",
      },
      {
        terme: "Genre professionnel",
        def: "Mémoire transpersonnelle et intercalaire social d'un milieu de travail.",
      },
      {
        terme: "Style",
        def: "Retravaillle stylistique du genre par le sujet en situation singulière.",
      },
    ],
    erreurFatale:
      "Confondre l'activité réalisée (ce qui est observable sur le terrain ou la vidéo) avec le réel de l'activité (qui englobe tout ce que l'opérateur a dû ravaler ou empêcher).",
    checklist: [
      "Ai-je bien distingué la commande managériale de la demande clinique ?",
      "Ai-je mentionné le volontariat absolu des professionnels filmés ?",
      "Ai-je articulé auto-confrontation simple (sujet/chercheur) puis croisée (entre pairs) ?",
      "Ai-je évité toute posture d'expert prescripteur de solutions ?",
    ],
  },
  PST108: {
    ue: "PST108",
    title: "Langage, communication & clinique du dialogue",
    theseCentrale:
      "Le dialogue n'est pas un simple véhicule d'informations, mais un instrument psychologique performatif : c'est par la dispute professionnelle réglée sur la qualité du travail que le collectif protège la santé de chacun.",
    citations: [
      {
        auteur: "Mikhaïl Bakhtine (1984)",
        texte:
          "Tout énoncé est un maillon dans la chaîne de l'échange verbal : il répond à des énoncés antérieurs et anticipe la réplique active d'autrui.",
      },
      {
        auteur: "John L. Austin (1962)",
        texte:
          "Quand dire, c'est faire : l'énoncé performatif accomplit un acte social qui transforme les droits et obligations des interlocuteurs.",
      },
      {
        auteur: "Lev Vygotski (1934)",
        texte:
          "La pensée ne s'exprime pas simplement dans le mot, elle se réalise et se transforme dans le mot.",
      },
    ],
    conceptsCles: [
      {
        terme: "Dialogisme / Polyphonie",
        def: "Pluralité des voix sociales qui habitent chaque parole singulière.",
      },
      {
        terme: "Sur-destinataire",
        def: "Instance tierce idéale (le métier, la règle de l'art) qui arbitre le dialogue.",
      },
      {
        terme: "Acte illocutoire",
        def: "Ce que l'on fait en parlant (promettre, ordonner, alerter, contester).",
      },
      {
        terme: "Dispute professionnelle",
        def: "Controverse instituée entre pairs sur les critères du travail bien fait.",
      },
    ],
    erreurFatale:
      "Analyser un dialogue de travail avec le schéma télégraphique Émetteur → Message → Récepteur (Shannon) en oubliant l'adresse à autrui et le sous-texte de métier.",
    checklist: [
      "Ai-je identifié les trois fonctions de l'Organon de Bühler ou la pragmatique d'Austin ?",
      "Ai-je repéré le sur-destinataire (le métier) derrière le conflit interpersonnel ?",
      "Ai-je montré comment le langage fait passer l'affect passif en pensée active ?",
    ],
  },
  PST120: {
    ue: "PST120",
    title: "Psychodynamique du travail & RPS",
    theseCentrale:
      "Travailler, c'est faire l'expérience de la résistance du réel (souffrance créatrice ou pathogène) : seule la dynamique de la reconnaissance (jugement de beauté par les pairs, jugement d'utilité par la hiérarchie) permet la sublimation identitaire.",
    citations: [
      {
        auteur: "Christophe Dejours (1993)",
        texte:
          "La reconnaissance ne porte jamais directement sur la personne, elle porte toujours sur le faire, sur la qualité du travail accompli.",
      },
      {
        auteur: "Pascale Molinier (2013)",
        texte:
          "Les stratégies collectives de défense permettent de tenir au travail en anesthésiant la perception de ce qui fait souffrir.",
      },
      {
        auteur: "Georges Canguilhem (1943)",
        texte:
          "Je me porte bien dans la mesure où je me sens capable de porter la responsabilité de mes actes et de créer de nouvelles normes.",
      },
    ],
    conceptsCles: [
      {
        terme: "Jugement de beauté",
        def: "Prononcé par les pairs sur la conformité aux règles de l'art et l'originalité.",
      },
      {
        terme: "Jugement d'utilité",
        def: "Prononcé par la hiérarchie/clients sur la valeur économique et sociale.",
      },
      {
        terme: "Stratégie collective de défense",
        def: "Déni partagé du risque ou de la souffrance (ex: cynisme viril).",
      },
      {
        terme: "Souffrance éthique",
        def: "Souffrance née de la participation active à des actes que l'on réprouve moralement.",
      },
    ],
    erreurFatale:
      "Dire que la reconnaissance porte sur l'être ('tu es quelqu'un de bien') alors qu'en psychodynamique elle porte exclusivement sur le FAIRE (le travail accompli) avant de rejaillir sur l'identité.",
    checklist: [
      "Ai-je distingué les deux jugements (utilité vs beauté) et leurs acteurs respectifs ?",
      "Ai-je analysé le rôle ambivalent des stratégies de défense (protègent mais aliènent) ?",
      "Ai-je rappelé que l'enquête psychodynamique exige une demande émanant des travailleurs ?",
    ],
  },
  PST123: {
    ue: "PST123",
    title: "Le psychologue, le travail et l'emploi",
    theseCentrale:
      "L'identité professionnelle se co-construit dans une double transaction indissociablement biographique (pour soi) et relationnelle (pour autrui) : le psychologue du travail doit garantir l'indépendance technique, le secret professionnel et le cadre déontologique face aux pressions d'assignation managériale.",
    citations: [
      {
        auteur: "Claude Dubar (1991)",
        texte:
          "L'identité n'est jamais donnée, elle est toujours construite et à reconstruire dans une double transaction, biographique et relationnelle.",
      },
      {
        auteur: "Renaud Sainsaulieu (1977)",
        texte:
          "L'identité au travail se forge dans l'expérience des relations de pouvoir au sein de l'atelier : elle produit des cultures de retrait, de fusion, de négociation ou d'affinité.",
      },
      {
        auteur: "Code de Déontologie (Principe 1)",
        texte:
          "Le respect de la personne dans sa dimension psychique est un droit inaliénable. Sa reconnaissance fonde l'action des psychologues.",
      },
    ],
    conceptsCles: [
      {
        terme: "Double Transaction (Dubar)",
        def: "Transaction biographique (temporalité interne, pour soi) vs transaction relationnelle (reconnaissance par autrui).",
      },
      {
        terme: "Formes identitaires",
        def: "4 configurations issues du croisement attribution/appartenance : de métier, statutaire, bloquée, de réseau.",
      },
      {
        terme: "Habitus & Champs (Bourdieu)",
        def: "Système de dispositions durables et transposables, intériorisation des structures sociales objectives.",
      },
      {
        terme: "Indépendance & Secret (Code 2021)",
        def: "Obligation légale et déontologique (Art. 226-13 C. Pénal) protégeant le sujet contre toute instrumentalisation.",
      },
    ],
    erreurFatale:
      "Confondre l'identité pour soi (processus biographique subjectif) avec l'identité pour autrui (actes d'attribution statutaires et étiquetage social), ou subordonner l'éthique du psychologue aux objectifs de rentabilité de l'organisation.",
    checklist: [
      "Ai-je articulé la double transaction de Claude Dubar (biographique vs relationnelle) ?",
      "Ai-je mobilisé les 4 modèles relationnels d'accès au pouvoir de Sainsaulieu ?",
      "Ai-je cité le Code de déontologie actualisé (2021) et l'indépendance technique du psychologue ?",
      "Ai-je rappelé la non-communication des données brutes et le consentement libre et éclairé ?",
    ],
  },
  PST124: {
    ue: "PST124",
    title: "Transformations digitales & Usages situés",
    theseCentrale:
      "Un dispositif numérique (ERP, IA, plateforme) n'est qu'un artefact inerte tant qu'il n'a pas fait l'objet d'une genèse instrumentale par l'opérateur et d'une acceptation située à l'épreuve des contradictions réelles de l'activité.",
    citations: [
      {
        auteur: "Pierre Rabardel (1995)",
        texte:
          "L'instrument n'est pas donné d'emblée : il est une entité mixte composée de l'artefact matériel et des schèmes d'utilisation construits par le sujet.",
      },
      {
        auteur: "M.-É. Bobillier Chaumon (2016)",
        texte:
          "L'acceptation située évalue comment la technologie soutient ou entrave le pouvoir d'agir dans l'écologie réelle du travail.",
      },
      {
        auteur: "Yrjö Engeström (1987)",
        texte:
          "Les contradictions systémiques entre l'outil, les règles et la division du travail sont le moteur de l'apprentissage expansif.",
      },
    ],
    conceptsCles: [
      {
        terme: "Instrumentation",
        def: "Mouvement tourné vers le sujet : l'opérateur adapte ses schèmes cognitifs à l'outil.",
      },
      {
        terme: "Instrumentalisation",
        def: "Mouvement tourné vers l'artefact : le sujet détourne ou personnalise les fonctions de l'outil.",
      },
      {
        terme: "Catachrèse",
        def: "Détournement d'usage créatif d'un outil pour résoudre un aléa non prévu par le concepteur.",
      },
      {
        terme: "Acceptation située",
        def: "Appropriation effective a posteriori en situation réelle (vs acceptabilité a priori TAM/UTAUT).",
      },
    ],
    erreurFatale:
      "Interpréter les contournements du logiciel (fichiers Excel parallèles, post-it, catachrèses) comme de la 'résistance au changement' alors qu'il s'agit de régulations vitales pour tenir la qualité.",
    checklist: [
      "Ai-je bien distingué Instrumentation (vers le sujet) et Instrumentalisation (vers l'artefact) ?",
      "Ai-je opposé les modèles prédictifs a priori (TAM/UTAUT) à l'acceptation située ?",
      "Ai-je proposé une démarche de conception participative / anthropocentrique ?",
    ],
  },
};
