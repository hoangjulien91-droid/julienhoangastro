export interface GlobalEra {
  key: string;
  year: string;
  name: string;
  desc: string;
  pst106?: string;
  pst108?: string;
  pst120?: string;
  pst123?: string;
  pst124?: string;
}

export const GLOBAL_ERAS: GlobalEra[] = [
  {
    key: "era1",
    year: "1910s",
    name: "Psychotechnique",
    desc: "Mesure des aptitudes physiques et Taylorisme industriel.",
    pst106:
      "<b>Sélection des aptitudes</b> : Lahy cherche à rationaliser le travail en adaptant l'homme à la machine par des tests psychotechniques.",
    pst108:
      "<b>Langage-signal</b> : Le langage est réduit à des codes de transmission simples de consignes unilatérales.",
    pst123:
      "<b>Surcharges physiques</b> : Risques de fatigue mécanique, peu de place pour le psychisme individuel.",
  },
  {
    key: "era2",
    year: "1950s",
    name: "Ergonomie de l'Activité",
    desc: "Naissance de l'ergonomie de terrain de Wisner en France.",
    pst106:
      "<b>Tâche vs Activité</b> : Wisner sépare la tâche (prescrite) de l'activité (réelle, ce que le travailleur met en œuvre).",
    pst120:
      "<b>Premières interfaces</b> : Naissance des problématiques cognitives face aux signaux visuels complexes.",
    pst124:
      "<b>Analyse sur le terrain</b> : L'ergonome descend dans l'atelier pour observer le travail réel.",
  },
  {
    key: "era3",
    year: "1980s",
    name: "Psychodynamique",
    desc: "Christophe Dejours introduit le plaisir et la souffrance psychique au travail.",
    pst106:
      "<b>Plaisir vs Souffrance</b> : Le travail n'est pas neutre pour la santé mentale ; il peut être source d'émancipation ou d'aliénation.",
    pst123:
      "<b>Stratégies de défense</b> : Les collectifs élaborent des rituels et des défenses communes pour conjurer la peur et nier le danger.",
    pst124:
      "<b>Écoute clinique</b> : Valorisation de la parole des salariés et de la subjectivité face aux prescriptions.",
  },
  {
    key: "era4",
    year: "2000s",
    name: "Clinique de l'Activité",
    desc: "Yves Clot et le développement du pouvoir d'agir.",
    pst106:
      "<b>Genre vs Style</b> : L'activité est médiatisée par le genre (règles collectives) réapproprié par le style propre du sujet.",
    pst108:
      "<b>Langage-instrument</b> : Le dialogue professionnel redevient un outil de travail et de controverse pour développer le métier.",
    pst123:
      "<b>Individualisation</b> : L'évaluation individuelle des performances détruit le lien social et affaiblit les défenses.",
  },
];
