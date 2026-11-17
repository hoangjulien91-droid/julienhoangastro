export interface DialogueTurn {
  id: number;
  phase: "simple" | "croisee" | "sosie";
  titrePhase: string;
  contexteVideo: string;
  verbatimOperateur: string;
  choixPsychologue: {
    id: "a" | "b" | "c";
    texte: string;
    points: number;
    verdict: "optimal" | "acceptable" | "inadapte";
    analyseClinique: string;
    conceptClot: string;
  }[];
}

export const DIALOGUES_AUTOCONFRONTATION: DialogueTurn[] = [
  {
    id: 1,
    phase: "simple",
    titrePhase: "Étape 1 · Auto-Confrontation Simple (Face à sa propre trace)",
    contexteVideo:
      "Marc, conducteur de train avec 12 ans d'expérience, visionne la vidéo où on le voit ralentir très tôt à l'approche d'un aiguillage, bien avant le repère officiel prescrit.",
    verbatimOperateur:
      "Marc (regardant l'écran, un peu gêné) : « Là, vous voyez, je freine déjà. C'est pas dans le règlement, je sais que l'encadrement me reprocherait de perdre 40 secondes... mais je ne peux pas m'en empêcher. »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Pourquoi ne respectez-vous pas le règlement ? Vous avez peur d'un déraillement ou c'est un manque de confiance en vous ? »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Erreur classique : la question 'Pourquoi' pousse le salarié à se justifier ou à psychologiser sa peur. Le psychologue se positionne en censeur ou en inspecteur.",
        conceptClot:
          "L'intervenant ne doit jamais demander 'pourquoi' (culpabilisation), mais 'comment' et 'qu'est-ce qui se passe ici'.",
      },
      {
        id: "b",
        texte:
          "« Qu'est-ce qui se joue pour vous à cet endroit précis de la voie pour que votre main anticipe le geste de freinage ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Relance clinique parfaite : elle déplace le regard de la faute vers l'expérience incorporée et les repères sensoriels invisibles du métier.",
        conceptClot:
          "L'auto-confrontation simple transforme l'activité réalisée en un objet d'observation pour le sujet lui-même (Vygotski/Clot).",
      },
      {
        id: "c",
        texte:
          "« C'est très intéressant, je note dans mon rapport que le règlement prescrit est inadapté à ce virage. »",
        points: 1,
        verdict: "acceptable",
        analyseClinique:
          "L'intervenant conclut à la place du travailleur et transforme prématurément une intuition en revendication sans laisser Marc élaborer son geste.",
        conceptClot:
          "Le psychologue n'est pas un expert du contenu : il est le garant du cadre d'élaboration de la pensée.",
      },
    ],
  },
  {
    id: 2,
    phase: "croisee",
    titrePhase: "Étape 2 · Auto-Confrontation Croisée (La controverse de métier)",
    contexteVideo:
      "Marc et son collègue Julien (conducteur plus jeune, 3 ans d'ancienneté) regardent ensemble la même séquence vidéo. Julien réagit vivement.",
    verbatimOperateur:
      "Julien : « Mais Marc, pourquoi tu freines si tôt ? Moi je garde la traction jusqu'au jalon jaune ! Si on freine tous comme toi, on flingue la grille horaire et les usagers râlent. »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Julien, calmez-vous, Marc a plus d'expérience que vous, respectez son ancienneté. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Étuvage de la controverse : le psychologue fait appel à l'autorité statutaire et éteint le débat technique qui est pourtant le moteur du développement du genre professionnel.",
        conceptClot:
          "La dispute professionnelle réglée est la condition vitale de la santé du collectif (le 'genre'). La policer, c'est tuer la pensée.",
      },
      {
        id: "b",
        texte:
          "« Marc, que réponds-tu à Julien sur cette tension entre la grille horaire et ce que tu ressens dans la motrice à ce moment-là ? Et toi Julien, as-tu déjà conduit sur cette voie par temps de pluie ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Relance dialectique idéale : l'intervenant maintient la controverse ouverte, convoque les conditions réelles (la pluie, les rails gras) et invite à délibérer sur la qualité du travail.",
        conceptClot:
          "L'auto-confrontation croisée met le style singulier de chacun à l'épreuve du genre professionnel partagé.",
      },
      {
        id: "c",
        texte:
          "« On voit bien que vous n'êtes pas d'accord. Faisons un vote pour savoir qui a raison. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Absurdité méthodologique : la clinique de l'activité ne cherche pas un consensus mou ou un vote majoritaire, mais la richesse des controverses de métier.",
        conceptClot:
          "Le collectif n'est pas unanime : c'est un ensemble d'arbitrages contradictoires vivants.",
      },
    ],
  },
  {
    id: 3,
    phase: "sosie",
    titrePhase: "Étape 3 · L'Instruction au Sosie (Transmission de l'indicible)",
    contexteVideo:
      "Exercice d'instruction au sosie (Oddone) avec une infirmière expérimentée en réanimation pédiatrique préparant un cathéter complexe.",
    verbatimOperateur:
      "L'infirmière : « Comment je fais ? Ben, je pique dans la veine, c'est tout, c'est l'habitude, ça ne s'explique pas... »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« D'accord, si ça ne s'explique pas, je vais me baser sur le manuel de procédure de la Haute Autorité de Santé. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Renoncement total à l'explicitation des savoirs tacites : le psychologue retombe dans la tâche prescrite désincarnée.",
        conceptClot:
          "L'instruction au sosie a justement pour vocation de rendre dicible l'indicible du travail réel.",
      },
      {
        id: "b",
        texte:
          "« Imagine que demain je suis ton sosie parfait. J'ai ton visage, ta blouse, mais je n'y connais rien. À quel détail de la peau du nouveau-né, à quelle résistance sous tes doigts dois-je prêter attention pour que personne dans le service ne découvre la supercherie ? »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Formulation canonique de l'instruction au sosie d'Ivar Oddone : la fiction du remplacement oblige à verbaliser les micromouvements, les sensations tactiles et les ruses de métier.",
        conceptClot:
          "« Le sosie oblige le sujet à devenir l'observateur instruit de sa propre activité. » (Ivar Oddone, 1981)",
      },
      {
        id: "c",
        texte:
          "« Vous devez faire un effort de mémoire, c'est important pour notre recherche universitaire. »",
        points: 1,
        verdict: "inadapte",
        analyseClinique:
          "Pression académique inutile qui bloque l'élaboration et renforce la position de défense de l'opératrice.",
        conceptClot:
          "La méthode doit être au service du pouvoir d'agir des travailleurs, pas de la publication du chercheur.",
      },
    ],
  },
  {
    id: 4,
    phase: "croisee",
    titrePhase: "Étape 4 · Du Dialogue au Pouvoir d'Agir (Restitution collective)",
    contexteVideo:
      "La séance d'auto-confrontation se termine. Les opérateurs ont mis au jour que la consigne prescrite les oblige à tricher pour tenir la qualité.",
    verbatimOperateur:
      "Marc et Julien : « Bon, maintenant qu'on a discuté entre nous et qu'on est d'accord sur le fait que la procédure est inapplicable, vous allez voir la direction pour leur dire de changer la règle ? »",
    choixPsychologue: [
      {
        id: "a",
        texte:
          "« Oui, je vais voir la direction demain matin et je leur impose vos conclusions au nom de la psychologie du travail. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Posture de substitut héroïque : le psychologue confisque le pouvoir d'agir des salariés en devenant leur porte-parole providentiel.",
        conceptClot:
          "Le psychologue ne se substitue jamais aux collectifs ni aux partenaires sociaux.",
      },
      {
        id: "b",
        texte:
          "« Non, mon rôle s'arrête ici, je suis clinicien, ce que vous en faites avec votre direction ne me regarde pas. »",
        points: 0,
        verdict: "inadapte",
        analyseClinique:
          "Cynisme clinique d'abandon : susciter des controverses sans organiser leur résonance dans l'organisation crée de la frustration et de l'amertume.",
        conceptClot:
          "L'intervention doit créer des arènes de délibération durable dans l'entreprise pour transformer le travail.",
      },
      {
        id: "c",
        texte:
          "« Nous allons préparer ensemble la restitution. Vous présenterez vous-mêmes à la direction les extraits vidéo choisis et les dilemmes du métier, pour ouvrir une négociation paritaire sur les critères du travail bien fait. Je serai là comme garant de la méthode. »",
        points: 5,
        verdict: "optimal",
        analyseClinique:
          "Dénouement magistral conforme à Yves Clot : les professionnels deviennent les auteurs et les acteurs de la transformation de leur propre travail.",
        conceptClot:
          "Le pouvoir d'agir restauré : le travailleur retrouve sa capacité à agir sur son milieu et sur son organisation (Canguilhem/Clot).",
      },
    ],
  },
];
