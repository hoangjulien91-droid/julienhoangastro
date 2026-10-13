"use client";

import React, { useState } from "react";
import {
  Scale,
  BookOpen,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Users,
  Search,
  Filter,
} from "lucide-react";

interface CourantTheorique {
  id: string;
  nom: string;
  auteurs: string[];
  uePrincipale: string;
  accent: string;
  statutReel: string;
  collectifGenre: string;
  methodeIntervention: string;
  conflitCentral: string;
  questionExamen: string;
  piegeEviter: string;
}

const COURANTS: CourantTheorique[] = [
  {
    id: "clinique-activite",
    nom: "Clinique de l'activité",
    auteurs: ["Yves Clot", "Dominique Lhuilier", "Lidia Prot"],
    uePrincipale: "PST106",
    accent: "#2e6e9e",
    statutReel: "Le réel de l'activité déborde l'activité réalisée : c'est ce qui ne se fait pas, ce qu'on cherche à faire, ce qu'on fait pour ne pas faire ce qui est à faire. Le réel résiste et ouvre le pouvoir d'agir.",
    collectifGenre: "Le 'genre professionnel' est la mémoire impersonnelle du métier, ressource et boîte à outils pour le style personnel. Quand le genre est appauvri, le collectif devient mortifère.",
    methodeIntervention: "Auto-confrontation simple puis croisée (vidéo), Instruction au sosie (Oddone), mise en délibération des controverses de métier.",
    conflitCentral: "Conflit entre activité empêchée / contrariée et pouvoir d'agir ; tension entre genre (mémoire collective) et style (signature du sujet).",
    questionExamen: "« En quoi l'auto-confrontation croisée restaure-t-elle le pouvoir d'agir des professionnels face à un travail empêché ? »",
    piegeEviter: "Confondre activité réalisée (la trace visible) et réel de l'activité (l'ensemble des possibles et des empêchements).",
  },
  {
    id: "psychodynamique",
    nom: "Psychodynamique du travail",
    auteurs: ["Christophe Dejours", "Pascale Molinier", "Isabelle Gernet"],
    uePrincipale: "PST120",
    accent: "#7a5aa6",
    statutReel: "Le réel est ce qui se fait connaître à celui qui travaille par sa résistance à la maîtrise et au savoir. Il impose l'endurance de la souffrance et l'intelligence rusée (métis).",
    collectifGenre: "Le collectif repose sur des 'règles de métier' et des accords normatifs protecteurs. Construction de stratégies collectives de défense contre la souffrance (déni viril, cynisme).",
    methodeIntervention: "Enquête en psychodynamique du travail : espace de délibération collective fondé sur le volontariat, la levée des défenses et l'analyse de la parole partagée.",
    conflitCentral: "Conflit entre l'organisation prescrite du travail et la santé mentale ; dynamique souffrance ↔ plaisir conditionnée par la reconnaissance.",
    questionExamen: "« Analysez les deux formes du jugement dans la dynamique de la reconnaissance et leur impact sur le basculement pathologique. »",
    piegeEviter: "Réduire la souffrance au travail à un stress individuel ou biologique, en occultant les stratégies défensives collectives et la lutte pour la reconnaissance.",
  },
  {
    id: "ergonomie-activite",
    nom: "Ergonomie de langue française",
    auteurs: ["Alain Wisner", "Jacques Leplat", "François Daniellou"],
    uePrincipale: "PST106",
    accent: "#0e7c86",
    statutReel: "Disparité indépassable entre tâche (ce qui est prescrit par l'ingénieur/gestionnaire) et activité (ce que déploie l'opérateur en situation pour pallier les aléas).",
    collectifGenre: "Régulation collective des contraintes : le travail n'est jamais purement individuel, il s'inscrit dans un milieu de travail et une structure socio-technique.",
    methodeIntervention: "Analyse ergonomique du travail (AET) : observations systématiques en situation naturelle, verbalisations simultanées, chronogrammes, analyse des variabilités.",
    conflitCentral: "Écart tâche prescrite vs activité réelle ; inadéquation des dispositifs techniques et managériaux face aux charges physiques, cognitives et organisationnelles.",
    questionExamen: "« Pourquoi la tâche prescrite ne peut-elle jamais anticiper la totalité de l'activité de travail ? Développez les concepts de régulation et de variabilité. »",
    piegeEviter: "Considérer l'écart au prescrit comme une faute, une négligence ou une anomalie, alors qu'il est la condition même de la réussite de la production.",
  },
  {
    id: "historico-culturel",
    nom: "Clinique du dialogue & Psychologie historico-culturelle",
    auteurs: ["Lev Vygotski", "Mikhaïl Bakhtine", "John L. Austin"],
    uePrincipale: "PST108",
    accent: "#b0501e",
    statutReel: "Le réel du langage et de la pensée : la parole comme action performative ('dire c'est faire') et instrument de reconfiguration psychique. Le dialogue est l'organe du développement.",
    collectifGenre: "Dialogisme : toute parole est une réplique adressée à un interlocuteur et à un sur-destinataire. Institutionnalisation de la 'dispute professionnelle réglée' sur les critères du travail bien fait.",
    methodeIntervention: "Analyse des interactions discursives en milieu de travail, organisation de débats réglés sur le travail bien fait, mise en circulation des énoncés.",
    conflitCentral: "Conflit entre voix hétérogènes (polyphonie) et monologue managérial ; empêchement de la délibération sur la qualité du travail.",
    questionExamen: "« Comment la dispute professionnelle réglée transforme-t-elle le conflit interpersonnel en ressource dialogique pour la santé collective ? »",
    piegeEviter: "Réduire la communication au travail à un simple transfert d'informations neutre (modèle de Shannon) en occultant sa dimension sémiotique et idéologique.",
  },
  {
    id: "digital-activite",
    nom: "Transformations numériques & Usages situés",
    auteurs: ["Pierre Rabardel", "Marc-Éric Bobillier Chaumon", "Yrjö Engeström"],
    uePrincipale: "PST124",
    accent: "#3f63d6",
    statutReel: "L'artefact technique (algorithme, ERP, IA) n'est pas l'instrument. L'instrument est un construit mixte qui émerge de l'appropriation situated de l'usager.",
    collectifGenre: "Communauté de pratique et genèse instrumentale partagée : émergence de nouveaux schèmes d'usage, de ruses et de catachrèses face aux contraintes algorithmiques.",
    methodeIntervention: "Observation de l'activité instrumentée, analyse des contradictions expansives (modèle Engeström), co-conception continue des artefacts.",
    conflitCentral: "Acceptabilité a priori (sur plan technique) vs acceptation située (mise à l'épreuve par l'activité vivante) ; charge cognitive et surveillance numérique.",
    questionExamen: "« Exposez la différence conceptuelle entre artefact et instrument selon Rabardel. Quelles sont les conséquences d'un déficit d'instrumentalisation pour la santé ? »",
    piegeEviter: "Croire que l'outil numérique s'impose de lui-même ou que les réticences sont une simple 'résistance au changement' irrationnelle des utilisateurs.",
  },
];

export function MatriceCourantsTheoriques() {
  const [selectedCourant, setSelectedCourant] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredCourants = COURANTS.filter((c) => {
    if (selectedCourant !== "all" && c.id !== selectedCourant) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.nom.toLowerCase().includes(q) ||
        c.auteurs.some((a) => a.toLowerCase().includes(q)) ||
        c.statutReel.toLowerCase().includes(q) ||
        c.methodeIntervention.toLowerCase().includes(q) ||
        c.uePrincipale.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="card p-6 bg-card/90 border border-border rounded-2xl shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-accent/10 text-accent">
            <Scale className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-foreground leading-tight m-0">
              Matrice Doctrinale Comparative des 5 Courants
            </h3>
            <p className="text-xs text-muted-foreground m-0 mt-0.5 font-mono">
              Repères d'excellence pour les écrits terminaux, le Grand Oral et le Mémoire CNAM
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCourant("all")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedCourant === "all"
                ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Tous les 5 courants
          </button>
          {COURANTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCourant(c.id)}
              className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-colors cursor-pointer ${
                selectedCourant === c.id
                  ? "bg-accent text-accent-foreground font-bold shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.uePrincipale}
            </button>
          ))}
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {filteredCourants.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl border border-border/80 bg-background/50 hover:border-accent/40 transition-all space-y-4"
            style={{ borderLeftWidth: "4px", borderLeftColor: c.accent }}
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-muted text-foreground border border-border">
                  {c.uePrincipale}
                </span>
                <h4 className="text-sm font-bold text-foreground m-0">
                  {c.nom}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Users className="size-3.5 text-accent" />
                <span>{c.auteurs.join(", ")}</span>
              </div>
            </div>

            {/* Matrix grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {/* 1. Statut du Réel */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent block">
                  Statut du Réel
                </span>
                <p className="text-muted-foreground m-0 leading-relaxed text-[11px]">
                  {c.statutReel}
                </p>
              </div>

              {/* 2. Collectif & Genre */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent block">
                  Place du Collectif &amp; Genre
                </span>
                <p className="text-muted-foreground m-0 leading-relaxed text-[11px]">
                  {c.collectifGenre}
                </p>
              </div>

              {/* 3. Méthode d'intervention */}
              <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent block">
                  Méthode d'Intervention
                </span>
                <p className="text-muted-foreground m-0 leading-relaxed text-[11px]">
                  {c.methodeIntervention}
                </p>
              </div>
            </div>

            {/* Bottom highlight: Question type & Piège */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-2.5">
                <HelpCircle className="size-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-accent text-[11px] block">
                    Question Type d'Examen :
                  </span>
                  <p className="text-foreground text-[11px] font-serif italic m-0 mt-0.5">
                    {c.questionExamen}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-amber-900 dark:text-amber-200">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[11px] block">
                    Piège Doctrinal Fréquent :
                  </span>
                  <p className="text-[11px] m-0 mt-0.5 leading-relaxed">
                    {c.piegeEviter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
