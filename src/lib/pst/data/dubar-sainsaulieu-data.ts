export interface DubarQuadrant {
  id: "promotion" | "blocage" | "conversion" | "exclusion";
  nom: string;
  sousTitre: string;
  pourSoi: string; // biographique
  pourAutrui: string; // relationnel
  description: string;
  exemples: string;
  citationDubar: string;
  conseilExamen: string;
  accent: string;
}

export const DUBAR_QUADRANTS: DubarQuadrant[] = [
  {
    id: "promotion",
    nom: "Identité de Promotion (ou d'Entreprise)",
    sousTitre: "Accord soi / autrui dans la continuité",
    pourSoi: "Continuité biographique (fidélité à sa trajectoire)",
    pourAutrui: "Reconnaissance institutionnelle positive (statut validé, promotion interne)",
    description:
      "L'individu adhère aux valeurs de l'entreprise qui, en retour, valorise son engagement par des titres, de la mobilité ascendante ou des responsabilités reconnues. L'identité pour soi et l'identité pour autrui coïncident harmonieusement.",
    exemples: "Ouvrier devenu chef d'équipe par promotion interne ; jeune cadre intégrant les codes de la firme.",
    citationDubar: "« L'identité d'entreprise repose sur une transaction relationnelle positive qui confirme la transaction biographique de continuité. » (Dubar, 1991)",
    conseilExamen: "Insistez sur la stabilité identitaire : pas de décalage conflictuel entre ce que le salarié revendique et ce que la hiérarchie lui accorde.",
    accent: "#10b981", // emerald
  },
  {
    id: "blocage",
    nom: "Identité de Blocage (ou Hors-Travail)",
    sousTitre: "Revendication pour soi refusée par l'institution",
    pourSoi: "Continuité biographique ou aspiration à monter (diplôme, compétences réelles)",
    pourAutrui: "Non-reconnaissance institutionnelle (stagnation, assignation à un sous-statut)",
    description:
      "Le salarié possède des qualifications ou une ambition qu'il revendique, mais l'organisation refuse de les reconnaître (absence de promotion, salaire bloqué). Il développe alors un désinvestissement défensif et transfère son identité dans la sphère hors-travail.",
    exemples: "Salarié ayant validé une licence ou un master par le CNAM mais maintenu à son poste d'exécutant.",
    citationDubar: "« Le blocage résulte de la non-reconnaissance par autrui d'une identité pour soi pourtant légitimée par des titres scolaires ou des savoirs d'expérience. »",
    conseilExamen: "Cas d'examen ultra-fréquent au CNAM pour illustrer la crise identitaire et le repli vers le loisir ou la famille.",
    accent: "#ef4444", // red
  },
  {
    id: "conversion",
    nom: "Identité de Conversion (ou Réseau)",
    sousTitre: "Rupture biographique + Reconnaissance externe",
    pourSoi: "Rupture biographique assumée (bifurcation, reconversion professionnelle)",
    pourAutrui: "Reconnaissance de la nouvelle identité par le nouveau collectif de pairs ou le marché",
    description:
      "L'individu quitte son univers d'origine, abandonne ses repères antérieurs et investit un nouveau métier. La réussite de la conversion dépend de l'accueil du nouveau milieu qui valide ses actes d'appartenance par des actes d'attribution légitimes.",
    exemples: "Ancien ingénieur devenant maraîcher bio ou psychologue du travail après une reprise d'études.",
    citationDubar: "« La conversion exige le deuil de l'identité antérieure et l'apprentissage de nouveaux codes de socialisation secondaire. »",
    conseilExamen: "À mobiliser pour analyser les trajectoires d'adultes en formation continue au CNAM (bifurcation existentielle).",
    accent: "#6366f1", // indigo
  },
  {
    id: "exclusion",
    nom: "Identité d'Exclusion (ou de Précarité)",
    sousTitre: "Rupture biographique subie + Non-reconnaissance",
    pourSoi: "Rupture subie, sentiment de déclassement et d'inutilité sociale",
    pourAutrui: "Stigmatisation institutionnelle, étiquetage de 'chômeur', 'inadapté' ou 'intérimaire'",
    description:
      "Double négation : ni le passé n'offre de continuité protectrice, ni le présent n'accorde de statut reconnu. L'individu subit la désaffiliation sociale (Robert Castel) et la perte de tous les repères de reconnaissance.",
    exemples: "Chômeur de longue durée après un plan social ; jeune enchaînant les contrats précaires sans ancrage.",
    citationDubar: "« L'exclusion est la forme limite où la transaction identitaire se brise des deux côtés : ni pour soi ni pour autrui le travail ne fait sens. »",
    conseilExamen: "Liez ce quadrant avec le concept de désaffiliation de Robert Castel et la destruction de l'estime de soi d'Axel Honneth.",
    accent: "#f59e0b", // amber
  },
];

export interface SainsaulieuModel {
  id: "fusionnel" | "negociation" | "affinitaire" | "retrait";
  nom: string;
  populationTypique: string;
  pouvoirSurPoste: string;
  dependanceRelationnelle: string;
  valeurCardinale: string;
  rapportAutorite: string;
  citationSainsaulieu: string;
  conseilExamen: string;
  accent: string;
}

export const SAINSAULIEU_MODELS: SainsaulieuModel[] = [
  {
    id: "fusionnel",
    nom: "1. Modèle Fusionnel",
    populationTypique: "Ouvriers spécialisés (OS), agents d'exécution répétitive sans marge de manœuvre",
    pouvoirSurPoste: "FAIBLE (tâche parcellaire, cadences imposées)",
    dependanceRelationnelle: "FORTE (besoin vital du groupe des pairs pour tenir face aux cadences)",
    valeurCardinale: "Solidarité égalitaire, camaraderie défensive, refus de toute tête qui dépasse",
    rapportAutorite: "Opposition viscérale au chef ou dépendance affective (le bon contre le mauvais chef)",
    citationSainsaulieu: "« Le modèle fusionnel est la réponse collective des faibles : quand on n'a aucun pouvoir individuel sur sa machine, on se serre les coudes contre la hiérarchie. » (1977)",
    conseilExamen: "Attention : le collectif y est chaleureux mais très conformiste. Quiconque essaie de négocier seul avec la direction est traité de traître.",
    accent: "#ec4899", // pink
  },
  {
    id: "negociation",
    nom: "2. Modèle de Négociation",
    populationTypique: "Ouvriers qualifiés (OQ), techniciens, professionnels de métier, soignants expérimentés",
    pouvoirSurPoste: "FORT (maîtrise technique, savoirs d'expérience indispensables)",
    dependanceRelationnelle: "FORTE (les pairs sont des alliés mais aussi des interlocuteurs exigeants)",
    valeurCardinale: "Discussion démocratique, compromis rationnel, reconnaissance mutuelle des compétences",
    rapportAutorite: "L'autorité doit prouver sa compétence ; conflit légitime et institutionnalisé (syndicats)",
    citationSainsaulieu: "« C'est dans le modèle de négociation que s'épanouit la démocratie industrielle : le pouvoir technique autorise la contestation argumentée. »",
    conseilExamen: "C'est le modèle le plus proche de la clinique de l'activité (PST106) : le genre professionnel vivant permet la controverse réglée.",
    accent: "#3b82f6", // blue
  },
  {
    id: "affinitaire",
    nom: "3. Modèle Affinitaire",
    populationTypique: "Cadres intermédiaires, jeunes diplômés, managers de projet en concurrence",
    pouvoirSurPoste: "MOYEN à FORT (autonomie encadrée)",
    dependanceRelationnelle: "SÉLECTIVE (on choisit ses alliés utiles, constitution de clans)",
    valeurCardinale: "Opportunisme relationnel, mobilité ascendante, affinités électives",
    rapportAutorite: "Séduction hiérarchique, proximité avec les décideurs, jeu politique interne",
    citationSainsaulieu: "« Le modèle affinitaire substitue à la solidarité ouvrière des réseaux sélectifs d'intérêts et de sympathies électives. »",
    conseilExamen: "Montrez que les relations n'y sont pas gratuites : elles sont instrumentées pour la progression de carrière.",
    accent: "#8b5cf6", // purple
  },
  {
    id: "retrait",
    nom: "4. Modèle de Retrait",
    populationTypique: "Employés de bureau isolés, vacataires, intérimaires, salariés désabusés",
    pouvoirSurPoste: "FAIBLE",
    dependanceRelationnelle: "FAIBLE (isolement physique ou psychique, rejet du collectif d'entreprise)",
    valeurCardinale: "Travail alimentaire : 'je fais mes heures et je rentre', la vraie vie est ailleurs",
    rapportAutorite: "Indifférence polie, soumission de façade sans aucun investissement affectif",
    citationSainsaulieu: "« Le retrait n'est pas paresse mais protection subjective : on refuse de donner son âme à une organisation qui ne donne rien en retour. »",
    conseilExamen: "Faites le lien avec l'identité de blocage de Dubar : le retrait est la conséquence d'espoirs professionnels déçus.",
    accent: "#64748b", // slate
  },
];

export interface CasCliniqueIdentite {
  id: string;
  nomSalarie: string;
  agePoste: string;
  verbatim: string;
  contexte: string;
  bonneReponseDubar: "promotion" | "blocage" | "conversion" | "exclusion";
  bonneReponseSainsaulieu: "fusionnel" | "negociation" | "affinitaire" | "retrait";
  explicationCopie: string;
  piegeEviter: string;
}

export const CAS_CLINIQUES_EXAMEN: CasCliniqueIdentite[] = [
  {
    id: "c1",
    nomSalarie: "Karim, 38 ans",
    agePoste: "Technicien de maintenance industrielle en usine agroalimentaire",
    contexte:
      "Karim est titulaire d'un BTS et a 15 ans d'ancienneté. Les machines n'ont aucun secret pour lui. Quand une panne complexe survient, même les ingénieurs viennent lui demander conseil.",
    verbatim:
      "« Avec les collègues techniciens, on n'est pas toujours d'accord sur le diagnostic, on s'engueule parfois fort sur la méthode pour réparer, mais au final on trouve le compromis. Quand le chef nous impose une pièce pas adaptée, on va dans son bureau avec nos schémas et on discute d'égal à égal jusqu'à ce qu'il cède. »",
    bonneReponseDubar: "promotion",
    bonneReponseSainsaulieu: "negociation",
    explicationCopie:
      "Chez Sainsaulieu, c'est l'archétype du MODÈLE DE NÉGOCIATION : pouvoir fort issu de l'expertise technique, dépendance relationnelle forte mais conflictuelle et argumentée. Chez Dubar, Karim vit une IDENTITÉ DE PROMOTION/MÉTIER : ses compétences réelles sont pleinement reconnues par les pairs et la direction (accord pour soi / pour autrui).",
    piegeEviter:
      "Ne pas confondre avec le modèle fusionnel sous prétexte qu'il 'discute avec les collègues' : le modèle fusionnel refuse le débat contradictoire interne.",
  },
  {
    id: "c2",
    nomSalarie: "Nathalie, 44 ans",
    agePoste: "Adjointe administrative dans une collectivité territoriale",
    contexte:
      "Nathalie a obtenu un Master en droit public en cours du soir il y a 3 ans. Elle postule à chaque poste de cadre disponible, mais la DRH préfère recruter des contractuels externes.",
    verbatim:
      "« J'ai fait 3 ans d'efforts au CNAM en dormant 4h par nuit pour avoir ce diplôme. Au bureau, on me donne toujours le même classement de dossiers. Pour eux, je reste la 'petite secrétaire'. Maintenant, j'arrive à 8h59, je pars à 17h pile. Mon énergie, je la garde pour mon association d'aide aux réfugiés. »",
    bonneReponseDubar: "blocage",
    bonneReponseSainsaulieu: "retrait",
    explicationCopie:
      "Chez Dubar, c'est le cas typique de l'IDENTITÉ DE BLOCAGE (ou hors-travail) : rupture entre les actes d'appartenance revendiqués (diplôme bac+5) et les actes d'attribution de l'institution (assignation au statut d'exécutante). Chez Sainsaulieu, elle bascule dans le MODÈLE DU RETRAIT défensif.",
    piegeEviter:
      "Ne pas diagnostiquer une démotivation psychologique individuelle sans relier cela au refus institutionnel de validation de son titre.",
  },
  {
    id: "c3",
    nomSalarie: "Sylvie et ses collègues",
    agePoste: "Opératrices sur chaîne d'emballage en industrie pharmaceutique",
    contexte:
      "Cadence de 800 boîtes/heure. Caméras au-dessus de la ligne. Le chef de ligne surveille les moindres retards aux pauses toilettes.",
    verbatim:
      "« C'est un boulot de robot. Si on n'était pas là toutes ensemble pour blaguer et se passer les chocolats en douce sous la table, on deviendrait folles. Si l'une a un coup de pompe, les autres accélèrent pour qu'elle ne prenne pas de réprimande. Le chef, c'est l'ennemi juré, on ne lui dit rien et gare à celle qui lui fait des sourires ! »",
    bonneReponseDubar: "blocage",
    bonneReponseSainsaulieu: "fusionnel",
    explicationCopie:
      "Pour Sainsaulieu, c'est la définition pure du MODÈLE FUSIONNEL : pouvoir nul sur le poste, dépendance relationnelle maximale face à la pénibilité, camaraderie égalitaire et rejet total de toute entente avec la hiérarchie.",
    piegeEviter:
      "Ne pas croire que le collectif est serein : le contrôle social entre paires y est féroce (« gare à celle qui sourit au chef »).",
  },
  {
    id: "c4",
    nomSalarie: "Antoine, 31 ans",
    agePoste: "Chef de projet dans une ESN (Entreprise de Services Numériques)",
    contexte:
      "Antoine change de mission tous les 6 mois. Il passe beaucoup de temps aux pots internes et sélectionne soigneusement ses relations.",
    verbatim:
      "« Dans cette boîte, si tu restes dans ton coin à coder comme un technicien, tu es mort. Avec 3 ou 4 autres consultants qui montent, on déjeune toujours ensemble et on s'échange les infos sur les missions prestigieuses avant qu'elles soient publiées. Il faut savoir se rendre indispensable auprès du directeur associé. »",
    bonneReponseDubar: "promotion",
    bonneReponseSainsaulieu: "affinitaire",
    explicationCopie:
      "Chez Sainsaulieu, c'est le MODÈLE AFFINITAIRE par excellence : relations sélectives, courtisanerie stratégique et constitution de coteries pour gravir les échelons hiérarchiques.",
    piegeEviter:
      "Ne pas le qualifier de modèle de négociation : Antoine ne négocie pas des règles démocratiques de métier, il maximise son intérêt individuel en réseau.",
  },
];
