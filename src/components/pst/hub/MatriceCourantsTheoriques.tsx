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
  Copy,
  Check,
  X,
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCourants = COURANTS.filter((c) => {
    if (selectedCourant !== "all" && c.id !== selectedCourant) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.nom.toLowerCase().includes(q) ||
        c.auteurs.some((a) => a.toLowerCase().includes(q)) ||
        c.statutReel.toLowerCase().includes(q) ||
        c.collectifGenre.toLowerCase().includes(q) ||
        c.methodeIntervention.toLowerCase().includes(q) ||
        c.uePrincipale.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyCard = (c: CourantTheorique) => {
    triggerHaptic("success");
    playSuccessSound();
    const textToCopy = `[${c.uePrincipale}] ${c.nom} (${c.auteurs.join(", ")})\n\n• STATUT DU RÉEL : ${c.statutReel}\n• PLACE DU COLLECTIF & DU GENRE : ${c.collectifGenre}\n• MÉTHODE D'INTERVENTION : ${c.methodeIntervention}\n• QUESTION TYPE D'EXAMEN : ${c.questionExamen}\n• PIÈGE DOCTRINAL : ${c.piegeEviter}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(c.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20 shadow-2xs">
            <Scale className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight m-0">
              Matrice Doctrinale Comparative des 5 Courants
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
              Repères d'excellence pour les écrits terminaux, le Grand Oral et le Mémoire CNAM
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedCourant("all");
            }}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer active:scale-95 shadow-2xs ${
              selectedCourant === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:white border border-slate-200/80 dark:border-slate-700/80"
            }`}
          >
            Tous (5 courants)
          </button>
          {COURANTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCourant(c.id);
              }}
              className={`px-2.5 py-1.5 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-2xs ${
                selectedCourant === c.id
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
              }`}
            >
              {c.uePrincipale}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Instant Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un auteur (Clot, Wisner, Dejours, Rabardel...), un concept (genre, réel, catachrèse...) ou une méthode..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-2xs transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSearch("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Effacer la recherche"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {filteredCourants.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-muted-foreground">
            Aucun courant ne correspond à votre recherche « {search} ».
          </div>
        ) : (
          filteredCourants.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-xs transition-all space-y-4 shadow-2xs"
              style={{ borderLeftWidth: "4px", borderLeftColor: c.accent }}
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-2xs">
                    {c.uePrincipale}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                    {c.nom}
                  </h4>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {c.auteurs.map((author) => (
                      <span
                        key={author}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-muted/70 text-foreground border border-border/80"
                      >
                        {author}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCard(c)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-850 hover:bg-muted text-slate-600 dark:text-slate-300 hover:text-foreground transition-all cursor-pointer shadow-2xs"
                    title="Copier la fiche de controverse doctrinale"
                  >
                    {copiedId === c.id ? (
                      <>
                        <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-300">Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-muted-foreground" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Matrix grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {/* 1. Statut du Réel */}
                <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
                    Statut du Réel
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
                    {c.statutReel}
                  </p>
                </div>

                {/* 2. Collectif & Genre */}
                <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
                    Place du Collectif &amp; Genre
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
                    {c.collectifGenre}
                  </p>
                </div>

                {/* 3. Méthode d'intervention */}
                <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
                    Méthode d'Intervention
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
                    {c.methodeIntervention}
                  </p>
                </div>
              </div>

              {/* Bottom highlight: Question type & Piège */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 backdrop-blur-sm flex items-start gap-2.5 shadow-2xs">
                  <HelpCircle className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 text-[11px] block">
                      Question Type d'Examen :
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 text-[11px] italic m-0 mt-0.5">
                      {c.questionExamen}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 backdrop-blur-sm flex items-start gap-2.5 text-amber-900 dark:text-amber-200 shadow-2xs">
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
          ))
        )}
      </div>
    </div>
  );
}
