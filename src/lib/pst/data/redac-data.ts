export const REDAC_DRAFTS_KEY = "pst_redac_drafts_v1";

export interface RedacCriterion {
  key: "c1" | "c2" | "c3" | "c4";
  title: string;
  desc: string;
  pts: number;
}

export const CNAM_REDAC_CRITERIA: RedacCriterion[] = [
  {
    key: "c1",
    title: "1. Problématisation & Cadrage (5 pts)",
    desc: "Évite la récitation brute, délimite le sujet, formule une tension dialectique nette.",
    pts: 5,
  },
  {
    key: "c2",
    title: "2. Concepts & Verbatim (5 pts)",
    desc: "Auteurs canoniques cités, définitions exactes du référentiel (Leplat, Clot, Dejours, Bourdieu...).",
    pts: 5,
  },
  {
    key: "c3",
    title: "3. Structure Dialectique (5 pts)",
    desc: "Plan équilibré en 2 parties démontrées, transitions argumentées, confrontation théorique.",
    pts: 5,
  },
  {
    key: "c4",
    title: "4. Posture Clinique & Déontologie (5 pts)",
    desc: "Code de déontologie des psychologues, indépendance, refus de l'instrumentalisation.",
    pts: 5,
  },
];

export interface IntroComponents {
  amorce: string;
  defs: string;
  pb: string;
  plan: string;
}

export function getDefaultIntro(subjectTitle: string): IntroComponents {
  return {
    amorce:
      "Dans les contextes contemporains de mutation du travail, l'activité est soumise à des impératifs croissants de performance et d'adaptation.",
    defs: `Le sujet (« ${subjectTitle} ») interroge la dialectique entre travail prescrit et travail réel.`,
    pb: `Dès lors, dans quelle mesure ce dilemme interroge-t-il les fondements théoriques et les pratiques d'intervention du psychologue du travail ?`,
    plan: "Dans un premier temps, nous analyserons les impasses cliniques observées sur le terrain ; dans un second temps, nous examinerons la rupture conceptuelle qui permet de refonder le pouvoir d'agir.",
  };
}

export function buildCompiledIntro(intro: IntroComponents): string {
  return `--- INTRODUCTION TYPE 18/20 ---\n[Accroche] ${intro.amorce.trim()}\n[Définitions] ${intro.defs.trim()}\n[Problématique] ${intro.pb.trim()}\n[Annonce de plan] ${intro.plan.trim()}\n--------------------------------\n\n`;
}

export function formatRedacTimer(s: number): string {
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) {
    return `${hrs}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
