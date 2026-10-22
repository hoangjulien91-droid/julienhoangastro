"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  X,
  Zap,
  Quote,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface Briefing30sProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

interface BriefingData {
  ue: string;
  title: string;
  theseCentrale: string;
  citations: { auteur: string; texte: string }[];
  conceptsCles: { terme: string; def: string }[];
  erreurFatale: string;
  checklist: string[];
}

const BRIEFINGS: Record<string, BriefingData> = {
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
    title: "Déontologie, Bilan & Conseil en Orientation",
    theseCentrale:
      "L'indépendance technique et morale du psychologue du travail ainsi que le secret professionnel sont les garants absolus de la protection psychique du bénéficiaire face aux pressions d'évaluation ou de sélection managériale.",
    citations: [
      {
        auteur: "Code de Déontologie ( Principe 1 )",
        texte:
          "Le respect de la personne dans sa dimension psychique est un droit inaliénable. Sa reconnaissance fonde l'action des psychologues.",
      },
      {
        auteur: "Code du Travail (Art. L. 6313-4)",
        texte:
          "Les résultats détaillés et le document de synthèse du bilan de compétences ne peuvent être communiqués à un tiers qu'avec l'accord du bénéficiaire.",
      },
      {
        auteur: "Paul Ricœur (1990)",
        texte:
          "La visée éthique : la vie bonne, avec et pour autrui, dans des institutions justes.",
      },
    ],
    conceptsCles: [
      {
        terme: "Secret professionnel",
        def: "Obligation légale (Art. 226-13 C. Pénal) et déontologique couvrant tout ce qui est confié.",
      },
      {
        terme: "Propriété de la synthèse",
        def: "En bilan de compétences, le document appartient au seul salarié, même si l'employeur paie.",
      },
      {
        terme: "Consentement éclairé",
        def: "Adhésion libre, révocable à tout moment, après information sur les finalités et méthodes.",
      },
      {
        terme: "Indépendance professionnelle",
        def: "Le psychologue choisit ses outils et refuse toute injonction de résultat prédéterminé.",
      },
    ],
    erreurFatale:
      "Accepter de transmettre le document de synthèse d'un bilan de compétences à la DRH sous prétexte que l'entreprise a financé la prestation sur le plan de développement des compétences.",
    checklist: [
      "Ai-je cité le Code de déontologie des psychologues (1996 actualisé 2021) ?",
      "Ai-je distingué les 3 phases légales du bilan (préliminaire, investigation, conclusion) ?",
      "Ai-je protégé l'anonymat et la non-communication des notes brutes et tests ?",
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

export function PstBriefing30sModal({
  isOpen,
  onClose,
  defaultModule = "PST106",
}: Briefing30sProps) {
  const normModule = defaultModule?.toUpperCase();
  const initialUe = normModule && BRIEFINGS[normModule] ? normModule : "PST106";
  const [selectedUe, setSelectedUe] = useState<string>(initialUe);

  useEffect(() => {
    if (defaultModule) {
      const norm = defaultModule.toUpperCase();
      if (BRIEFINGS[norm]) setSelectedUe(norm);
    }
  }, [defaultModule, isOpen]);

  useEffect(() => {
    const handleEvent = (e: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.module;
      if (targetMod) {
        const norm = String(targetMod).toUpperCase();
        if (BRIEFINGS[norm]) setSelectedUe(norm);
      }
    };
    window.addEventListener("pst:open-briefing-30s", handleEvent);
    return () =>
      window.removeEventListener("pst:open-briefing-30s", handleEvent);
  }, []);

  if (!isOpen) return null;

  const data = BRIEFINGS[selectedUe] || BRIEFINGS.PST106;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Synthèse Flash 30 Secondes"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-card text-foreground border border-border border-t-4 border-t-accent rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xs">
              <Zap className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-serif font-bold text-foreground m-0">
                  Briefing Tactique 30 Secondes
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/25">
                  Haute Visibilité Jour J
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground m-0 font-mono">
                {data.ue} · {data.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* UE Selector Pills */}
        <div className="px-6 py-2.5 border-b border-border/70 bg-background flex items-center gap-1.5 overflow-x-auto shrink-0">
          {Object.keys(BRIEFINGS).map((ue) => (
            <button
              key={ue}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedUe(ue);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer ${
                selectedUe === ue
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {ue}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* 1. Thèse Centrale */}
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-accent flex items-center gap-1.5">
              <Target className="size-3.5" />
              <span>1. Thèse Centrale à défendre dès l'introduction :</span>
            </span>
            <p className="text-foreground text-xs sm:text-[13px] font-serif font-semibold leading-relaxed m-0">
              {data.theseCentrale}
            </p>
          </div>

          {/* 2. Concepts Clés (Grid 2x2) */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
              2. Les 4 Concepts Discriminants :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.conceptsCles.map((c) => (
                <div
                  key={c.terme}
                  className="p-3 rounded-xl border border-border bg-background space-y-0.5"
                >
                  <span className="font-bold text-foreground text-xs block">
                    {c.terme}
                  </span>
                  <span className="text-[11px] text-muted-foreground leading-snug block">
                    {c.def}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Les 3 Citations Imparables */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
              3. Citations Piliers pour la Copie :
            </span>
            <div className="space-y-2">
              {data.citations.map((cit, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-border bg-card flex items-start gap-2.5"
                >
                  <Quote className="size-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-[11px] text-accent block">
                      {cit.auteur}
                    </span>
                    <p className="text-foreground font-serif italic text-xs m-0 mt-0.5 leading-relaxed">
                      « {cit.texte} »
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Erreur Éliminatoire */}
          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs block">
                Piège Éliminatoire à bannir absolument :
              </span>
              <p className="text-[11px] m-0 mt-0.5 leading-relaxed">
                {data.erreurFatale}
              </p>
            </div>
          </div>

          {/* 5. Checklist de relecture */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-foreground block">
              Checklist de contrôle avant remise de la copie :
            </span>
            <ul className="space-y-1.5 m-0 pl-0 list-none">
              {data.checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/10 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Prêt pour l'épreuve
          </button>
        </div>
      </div>
    </div>
  );
}
