"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Scale,
  Sparkles,
  Layers,
  FileText,
  Clock,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { MODULES, type ModuleInfo } from "@/lib/pst/hub-stats";

interface WorkshopDoctrineData {
  id: string;
  name: string;
  ects: number;
  prof: string;
  focus: string;
  authors: { name: string; role: string; quote: string }[];
  methodologies: { title: string; desc: string }[];
  examType: string;
  examDesc: string;
}

export const WORKSHOPS_DATA: Record<string, WorkshopDoctrineData> = {
  pst106: {
    id: "pst106",
    name: "Clinique de l'activité & Ergonomie constructive",
    ects: 6,
    prof: "Équipe Chaire Psychologie du Travail",
    focus:
      "Transformer le travail pour transformer le sujet. Réel de l'activité, discordances, pouvoir d'agir et architecture du collectif.",
    authors: [
      {
        name: "Yves Clot",
        role: "Fondateur de la clinique de l'activité (CNAM)",
        quote:
          "L'activité réalisée n'est qu'une part minuscule du réel de l'activité : le non-fait, l'empêché et le contrarié pèsent tout autant.",
      },
      {
        name: "Alain Wisner",
        role: "Père de l'ergonomie de langue française (CNAM)",
        quote:
          "Le travail réel ne coïncide jamais avec le travail prescrit. L'ouvrier n'est pas un opérateur passif, il régule.",
      },
      {
        name: "Lev Vygotski",
        role: "Psychologie historico-culturelle",
        quote:
          "L'instrument psychologique médiatise la pensée et reconfigure les fonctions psychiques supérieures.",
      },
      {
        name: "Jacques Leplat",
        role: "Psychologie ergonomique",
        quote:
          "La tâche détermine le but prescrit ; l'activité correspond à la conduite humaine mobilisée pour l'atteindre.",
      },
    ],
    methodologies: [
      {
        title: "Auto-confrontation simple",
        desc: "L'opérateur visionne les traces vidéo de son activité filmée en situation réelle et commente ses gestes face au psychologue du travail.",
      },
      {
        title: "Auto-confrontation croisée",
        desc: "Deux collègues du même métier débattent ensemble de la vidéo de l'un d'eux, mettant en tension le genre professionnel et leurs styles individuels.",
      },
      {
        title: "Instruction au sosie (Oddone)",
        desc: "« Imagine que je sois ton sosie et que demain je doive te remplacer : explique-moi tout pour que personne ne s'en aperçoive. »",
      },
    ],
    examType: "Dossier d'intervention clinique / Étude de cas",
    examDesc:
      "Analyse d'une situation de travail conflictuelle ou d'un métier contrarié avec proposition d'un cadre méthodologique en auto-confrontation.",
  },
  pst108: {
    id: "pst108",
    name: "Langage, communication & clinique du dialogue",
    ects: 6,
    prof: "Chaire Psychologie du Travail CNAM",
    focus:
      "Le dialogue comme instrument de pensée et levier d'action. Les controverses de métier et la dispute professionnelle réglée.",
    authors: [
      {
        name: "Yves Clot",
        role: "Clinique du travail & dialogue",
        quote:
          "Le travail bien fait a besoin de dispute professionnelle : quand la délibération sur la qualité est étouffée, la santé vacille.",
      },
      {
        name: "John L. Austin",
        role: "Philosophie du langage",
        quote:
          "Quand dire c'est faire : dimension performative et actes de langage dans les organisations.",
      },
      {
        name: "Mikhaïl Bakhtine",
        role: "Théorie du dialogisme",
        quote:
          "Tout énoncé est habité par la voix d'autrui et s'adresse à un sur-destinataire.",
      },
    ],
    methodologies: [
      {
        title: "Dispute professionnelle réglée",
        desc: "Dispositif d'institution de la controverse sur les critères du travail bien fait entre pairs et hiérarchie.",
      },
      {
        title: "Clinique du dialogue de métier",
        desc: "Analyse des énoncés en situation de travail pour restaurer la fonction psychologique du collectif.",
      },
    ],
    examType: "Écrit terminal / Analyse de corpus discursif",
    examDesc:
      "Déconstruction d'un échange langagier de travail ou d'une controverse organisationnelle avec concepts sémiotiques et dialogiques.",
  },
  pst120: {
    id: "pst120",
    name: "Psychodynamique du travail & RPS",
    ects: 6,
    prof: "Laboratoire PCPP / CNAM",
    focus:
      "La centralité du travail dans la constitution du sujet. Conflit entre le sujet et l'organisation, souffrance, défenses et reconnaissance.",
    authors: [
      {
        name: "Christophe Dejours",
        role: "Fondateur de la psychodynamique du travail",
        quote:
          "Le travail est ce qui implique, du point de vue humain, le fait de faire l'expérience du réel : c'est ce qui résiste aux savoirs et à la maîtrise.",
      },
      {
        name: "Pascale Molinier",
        role: "Théoricienne du care & psychodynamique",
        quote:
          "L'idéologie défensive virile occulte la vulnérabilité et bloque l'expression de la souffrance au travail.",
      },
      {
        name: "Georges Canguilhem",
        role: "Philosophie de la médecine et de la vie",
        quote:
          "Être en bonne santé, c'est être capable de tomber malade et de s'en relever : c'est être normatif et instaurer ses propres normes.",
      },
    ],
    methodologies: [
      {
        title: "Enquête en psychodynamique du travail",
        desc: "Dispositif d'intervention collective fondé sur l'écoute de la souffrance partagée, l'élaboration de la parole et l'analyse des stratégies de défense.",
      },
      {
        title: "Jugement de beauté & jugement d'utilité",
        desc: "Les deux piliers de la dynamique de la reconnaissance : jugement technique par les pairs et économique par la hiérarchie.",
      },
    ],
    examType: "Examen écrit terminal (Cas clinique de souffrance)",
    examDesc:
      "Diagnostic différentiel d'une situation de RPS, déconstruction des défenses collectives et préconisations d'intervention.",
  },
  pst123: {
    id: "pst123",
    name: "Déontologie, bilan & conseil en orientation",
    ects: 6,
    prof: "Département Travail & Société CNAM",
    focus:
      "Cadre éthique du psychologue du travail, code de déontologie (1996/2021), conduite du bilan de compétences et accompagnement de transitions.",
    authors: [
      {
        name: "Code de Déontologie (1996/2021)",
        role: "Texte fondateur FFPP / SFP",
        quote:
          "Le respect de la personne dans sa dimension psychique est un droit inaliénable. Sa reconnaissance fonde l'action du psychologue.",
      },
      {
        name: "Donald Super",
        role: "Développement vocationnel",
        quote:
          "La carrière est une construction dynamique tout au long de la vie à travers l'expression du concept de soi.",
      },
    ],
    methodologies: [
      {
        title: "Bilan de compétences réglementé (Code du Travail)",
        desc: "Phase préliminaire, phase d'investigation et phase de conclusion avec restitution d'un document de synthèse confidentiel au seul bénéficiaire.",
      },
      {
        title: "Conseil en évolution professionnelle (CEP)",
        desc: "Accompagnement émancipateur respectant le secret professionnel et le consentement éclairé de la personne.",
      },
    ],
    examType: "Dossier déontologique & Note de cadrage de bilan",
    examDesc:
      "Analyse d'un cas de tension éthique (pression de l'employeur, secret professionnel) et structuration d'un protocole d'évaluation.",
  },
  pst124: {
    id: "pst124",
    name: "Transformations numériques & usages situés",
    ects: 6,
    prof: "Chaire Psychologie du Travail CNAM",
    focus:
      "L'impact des technologies émergentes (IA, plateformes, télétravail, ERP) sur l'activité réelle, genèse instrumentale et acceptation située.",
    authors: [
      {
        name: "Pierre Rabardel",
        role: "Théorie de la genèse instrumentale",
        quote:
          "L'artefact n'est pas l'instrument. L'instrument est un artefact approprié par le sujet avec ses propres schèmes d'utilisation.",
      },
      {
        name: "Marc-Éric Bobillier Chaumon",
        role: "Acceptation située des TIC",
        quote:
          "La technologie doit être étudiée non pas en laboratoire, mais dans son écologie réelle de travail avec ses paradoxes organisationnels.",
      },
      {
        name: "Yrjö Engeström",
        role: "Théorie de l'activité historico-culturelle",
        quote:
          "L'apprentissage expansif naît de la résolution des contradictions internes aux systèmes d'activité.",
      },
    ],
    methodologies: [
      {
        title: "Genèse instrumentale (Instrumentation & Instrumentalisation)",
        desc: "Analyse des bifurcations d'usage, des ruses et des détournements créatifs opérés par les salariés face au logiciel.",
      },
      {
        title: "Diagnostic d'impact digital",
        desc: "Audit de la charge cognitive, de l'intensification du travail et des paradoxes de l'hyperconnexion.",
      },
    ],
    examType: "Projet de diagnostic de transformation digitale",
    examDesc:
      "Étude d'un déploiement d'outil numérique (ex: IA générative, ERP) et conception d'une méthodologie participative d'appropriation.",
  },
};

interface AtelierSlideOverProps {
  moduleId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AtelierSlideOver({
  moduleId,
  isOpen,
  onClose,
}: AtelierSlideOverProps) {
  const [activeTab, setActiveTab] = useState<
    "synthese" | "methodes" | "auteurs" | "examen"
  >("synthese");

  if (!isOpen || !moduleId) return null;

  const data = WORKSHOPS_DATA[moduleId] || {
    id: moduleId,
    name: `Atelier ${moduleId.toUpperCase()}`,
    ects: 6,
    prof: "CNAM Psychologie du Travail",
    focus: "Enseignement théorique et clinique spécialisé.",
    authors: [],
    methodologies: [],
    examType: "Épreuve terminale",
    examDesc: "Modalités conformes à la maquette pédagogique du CNAM.",
  };

  const routePath = `/pst/${data.id.replace("pst", "")}/`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Inspection de l'atelier ${data.id.toUpperCase()}`}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Container (Linear standard 460px) */}
      <div
        className="relative w-full max-w-lg bg-card text-foreground shadow-2xl border-l border-border flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-border/80 flex items-center justify-between shrink-0 bg-muted/20">
          <div className="flex items-center gap-2.5">
            <span className="size-8 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs flex items-center justify-center shadow-xs">
              {data.id.toUpperCase()}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-serif font-bold text-foreground leading-tight m-0">
                  {data.name}
                </h2>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {data.ects} ECTS · {data.prof}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Fermer le volet"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-border/60 flex items-center gap-1 text-xs font-medium shrink-0 bg-card">
          <button
            type="button"
            onClick={() => setActiveTab("synthese")}
            className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "synthese"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Synthèse
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("auteurs")}
            className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "auteurs"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Auteurs ({data.authors.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("methodes")}
            className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "methodes"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Protocoles ({data.methodologies.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("examen")}
            className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "examen"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Modalités Épreuve
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
          {activeTab === "synthese" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent block mb-1">
                  Enjeu Pédagogique Fondamental
                </span>
                <p className="text-foreground text-xs leading-relaxed font-serif italic m-0">
                  « {data.focus} »
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Aperçu de l'arsenal didactique :
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg border border-border bg-card">
                    <span className="font-mono text-xs font-bold text-foreground block">
                      60 Heures
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Volume d'ateliers
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-card">
                    <span className="font-mono text-xs font-bold text-accent block">
                      {data.ects} ECTS
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Crédits validants
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Auteurs fondamentaux :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.authors.map((a) => (
                    <span
                      key={a.name}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "auteurs" && (
            <div className="space-y-3">
              {data.authors.map((a) => (
                <div
                  key={a.name}
                  className="p-3.5 rounded-xl border border-border bg-card space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-xs">
                      {a.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {a.role}
                    </span>
                  </div>
                  <blockquote className="text-[11px] text-muted-foreground italic border-l-2 border-accent pl-2.5 m-0 leading-relaxed font-serif">
                    « {a.quote} »
                  </blockquote>
                </div>
              ))}
            </div>
          )}

          {activeTab === "methodes" && (
            <div className="space-y-3">
              {data.methodologies.map((m) => (
                <div
                  key={m.title}
                  className="p-3.5 rounded-xl border border-border bg-card space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-accent shrink-0" />
                    <span className="font-bold text-foreground text-xs">
                      {m.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed m-0 pl-5.5">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "examen" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-accent" />
                  <span className="font-bold text-xs text-foreground">
                    {data.examType}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed m-0">
                  {data.examDesc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                <Clock className="size-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    Critère d'Assiduité CNAM :
                  </span>
                  <span className="text-[11px]">
                    Présence obligatoire à 80% des séances présentielles et
                    visio-conférences pour valider l'admissibilité au mémoire.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-5 border-t border-border shrink-0 bg-muted/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <Link
            href={routePath}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <span>Ouvrir l'Atelier {data.id.toUpperCase()}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
