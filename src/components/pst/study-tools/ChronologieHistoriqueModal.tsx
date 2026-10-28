"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  History,
  Calendar,
  Sparkles,
  ArrowRight,
  GitCommit,
  BookOpen,
  Scale,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface Milestone {
  id: string;
  annee: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124" | "global";
  titre: string;
  auteur: string;
  ouvrage: string;
  ruptureEpistemologique: string;
  formuleMatrice: string;
  citation: string;
}

const HISTORICAL_MILESTONES: Milestone[] = [
  {
    id: "m-1910",
    annee: "1910",
    moduleKey: "pst106",
    titre: "Psychotechnique & Physiologie du Travail",
    auteur: "Jean-Maurice Lahy & Alfred Binet",
    ouvrage: "Recherches sur le travail dactylographique (1913)",
    ruptureEpistemologique:
      "Rupture avec le taylorisme pur : Lahy refuse le chronométrage aveugle et étudie la fatigue nerveuse et les aptitudes psychophysiologiques de l'ouvrier.",
    formuleMatrice:
      "Sélection des aptitudes + Étude de la fatigue = Protection relative contre l'épuisement taylorien.",
    citation:
      "« L'homme n'est pas un appendice de la machine : il a des limites physiologiques que l'organisation doit respecter. »",
  },
  {
    id: "m-1955",
    annee: "1955",
    moduleKey: "pst106",
    titre: "Fondation de l'Ergonomie au Cnam",
    auteur: "Alain Wisner (Chaire d'Ergonomie du Cnam)",
    ouvrage: "Réflexions sur l'ergonomie (1995)",
    ruptureEpistemologique:
      "Rupture avec l'adaptation de l'homme au travail : naissance de l'adage 'Adapter le travail à l'homme' et découverte de l'écart irréductible entre prescrit et réel.",
    formuleMatrice:
      "Travail Prescrit ≠ Travail Réel (L'activité est toujours une création adaptative face à l'imprévu).",
    citation:
      "« Si les travailleurs appliquaient strictement la consigne, les usines s'arrêteraient en une heure. »",
  },
  {
    id: "m-1956",
    annee: "1956",
    moduleKey: "pst120",
    titre: "Syndrome de la Téléphoniste & Psychopathologie",
    auteur: "Louis Le Guillant",
    ouvrage: "La névrose des téléphonistes (1956)",
    ruptureEpistemologique:
      "Naissance de la psychopathologie du travail en France : mise en évidence que la répétition taylorienne et le cadencement forcé génèrent des troubles psychiques spécifiques et non une simple fatigue musculaire.",
    formuleMatrice:
      "Contrainte temporelle + Parcellisation du geste = Souffrance nerveuse et décompensation psychopathologique.",
    citation:
      "« Ce n'est pas le travail qui fatigue, c'est l'empêchement de travailler selon ses propres normes vitales. »",
  },
  {
    id: "m-1977",
    annee: "1977",
    moduleKey: "pst123",
    titre: "L'Identité au Travail : 4 Modèles de Pouvoir",
    auteur: "Renaud Sainsaulieu",
    ouvrage: "L'identité au travail (1977)",
    ruptureEpistemologique:
      "Rupture avec l'École des relations humaines : l'entreprise n'est pas un lieu affectif ou familial, c'est une école politique de socialisation par l'accès au pouvoir.",
    formuleMatrice:
      "Accès au pouvoir sur le poste ➔ 4 Modèles (Fusionnel, Négociateur, Retrait, Affinitaire).",
    citation:
      "« L'entreprise est un lieu d'apprentissage culturel des relations de pouvoir. »",
  },
  {
    id: "m-1980",
    annee: "1980",
    moduleKey: "pst120",
    titre: "Psychodynamique du Travail & Souffrance",
    auteur: "Christophe Dejours",
    ouvrage: "Travail, usure mentale (1980)",
    ruptureEpistemologique:
      "Rupture avec le modèle passif du stress : le sujet n'est pas une victime inerte mais développe des stratégies collectives de défense et mobilise son intelligence pratique (la mêtis) pour endiguer la souffrance.",
    formuleMatrice:
      "Épreuve du réel + Stratégies de défense + Reconnaissance = Transformation de la souffrance en plaisir et santé.",
    citation:
      "« Travailler, c'est combler l'écart entre le prescrit et le réel, et cela ne se fait jamais sans souffrance. »",
  },
  {
    id: "m-1981",
    annee: "1981",
    moduleKey: "pst108",
    titre: "Théorie de l'Agir Communicationnel",
    auteur: "Jürgen Habermas",
    ouvrage: "Théorie de l'agir communicationnel (1981)",
    ruptureEpistemologique:
      "Rupture avec la dialectique négative de Francfort : réhabilitation de la raison délibérative par les 4 prétentions à la validité contre l'agir stratégique managérial.",
    formuleMatrice:
      "Agir Stratégique (succès/manipulation) VS Agir Communicationnel (entente rationnelle libre).",
    citation:
      "« La recherche d'une entente désintéressée est le seul antidote à la violence de l'agir stratégique masqué. »",
  },
  {
    id: "m-1982",
    annee: "1982",
    moduleKey: "pst108",
    titre: "Ce que parler veut dire : Status est magistratus",
    auteur: "Pierre Bourdieu",
    ouvrage: "Ce que parler veut dire (1982)",
    ruptureEpistemologique:
      "Rupture avec l'illusion internaliste d'Austin : le pouvoir des mots ne vient pas de la grammaire ou de la linguistique, mais du mandat institutionnel délégué au locuteur.",
    formuleMatrice:
      "[(Habitus) × (Capital)] + Champ = Pouvoir symbolique & Marché linguistique.",
    citation:
      "« C'est en tant qu'il est institué par les rapports sociaux que le discours produit des effets : status est magistratus. »",
  },
  {
    id: "m-1983",
    annee: "1983",
    moduleKey: "pst106",
    titre: "Tâche vs Activité & Régulation Ergonomique",
    auteur: "Jacques Leplat & Jean-Marie Hoc",
    ouvrage:
      "Tâche et Activité dans l'analyse psychologique des situations (1983)",
    ruptureEpistemologique:
      "Modélisation cognitive de l'activité comme compromis opératoire entre conditions externes (machines) et internes (opérateur).",
    formuleMatrice:
      "Tâche prescrite ➔ Régulation cognitive permanente face aux aléas ➔ Effets Système et Homme.",
    citation:
      "« La tâche est ce qui est à faire ; l'activité est ce qui se fait par un opérateur singulier. »",
  },
  {
    id: "m-1985",
    annee: "1985",
    moduleKey: "pst123",
    titre: "Protection du Titre de Psychologue (Loi 1985)",
    auteur: "Législateur français (Loi n° 85-772 du 25 juillet 1985)",
    ouvrage: "Journal Officiel de la République Française (art. 44)",
    ruptureEpistemologique:
      "Fin du flou corporatiste : le titre de psychologue devient un titre protégé par la loi (Titre RNCP niveau 7 Cnam ou Master 2 exigé), garantissant son autonomie technique face aux employeurs.",
    formuleMatrice:
      "Titre protégé + Titre RNCP 7 Cnam / Bac+5 = Indépendance clinique garantie par la loi.",
    citation:
      "« L'usage professionnel du titre de psychologue est réservé aux titulaires de diplômes d'État de niveau bac+5. »",
  },
  {
    id: "m-1991",
    annee: "1991",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire",
    auteur: "Claude Dubar",
    ouvrage:
      "La socialisation : construction des identités sociales et professionnelles (1991)",
    ruptureEpistemologique:
      "Dépassement du structuralisme passif : l'identité est le compromis permanent entre identité pour soi (biographie) et identité pour autrui (attribution relationnelle).",
    formuleMatrice:
      "Transaction Biographique (pour soi) ⟷ Transaction Relationnelle (pour autrui).",
    citation:
      "« L'identité est le résultat d'une double transaction : biographique pour soi et relationnelle pour autrui. »",
  },
  {
    id: "m-1993",
    annee: "1993",
    moduleKey: "pst106",
    titre: "Psychodynamique du Travail & Reconnaissance",
    auteur: "Christophe Dejours",
    ouvrage: "Travail, usure mentale (1993) & Souffrance en France (1998)",
    ruptureEpistemologique:
      "Rupture avec le modèle du stress quantitatif : la souffrance n'est pas une anomalie médicale mais l'épreuve incontournable du réel, sublimable par la reconnaissance des pairs.",
    formuleMatrice:
      "Souffrance ➔ Double Jugement (Utilité de la direction + Beauté des pairs) ➔ Sublimation et Santé.",
    citation:
      "« Le jugement de beauté ne peut être porté que par les pairs qui connaissent les règles de l'art du métier. »",
  },
  {
    id: "m-1995",
    annee: "1995",
    moduleKey: "pst123",
    titre: "La Désaffiliation Sociale en 3 Zones",
    auteur: "Robert Castel",
    ouvrage: "Les Métamorphoses de la question sociale (1995)",
    ruptureEpistemologique:
      "Rupture avec la notion statique d'exclusion : modélisation dynamique du décrochage de la société salariale en 3 zones associant travail et sociabilité.",
    formuleMatrice:
      "Zone d'Intégration ➔ Zone de Vulnérabilité ➔ Zone de Désaffiliation.",
    citation:
      "« La désaffiliation n'est pas un état, mais la trajectoire conjointe de rupture du travail et des liens protecteurs. »",
  },
  {
    id: "m-1995-rabardel",
    annee: "1995",
    moduleKey: "pst124",
    titre: "Approche Instrumentale & Genèse de l'Outil",
    auteur: "Pierre Rabardel",
    ouvrage: "Les hommes et les technologies (1995)",
    ruptureEpistemologique:
      "Rupture avec l'illusion technocentrée : l'artefact technique n'est pas l'instrument. L'instrument est une construction mixte associant l'artefact matériel et les schèmes d'utilisation du travailleur.",
    formuleMatrice:
      "Artefact + Schèmes d'action (Instrumentation + Instrumentalisation) = Instrument psychologique opérant.",
    citation:
      "« L'instrument ne se décrète pas à la livraison du matériel : il émerge dans l'activité par genèse instrumentale. »",
  },
  {
    id: "m-1999",
    annee: "1999",
    moduleKey: "pst106",
    titre: "Clinique de l'Activité & Travail Empêché",
    auteur: "Yves Clot (Chaire de Psychologie du Travail du Cnam)",
    ouvrage:
      "La fonction psychologique du travail (1999) & Le travail à cœur (2010)",
    ruptureEpistemologique:
      "Rupture avec la psychologie cognitive désincarnée : l'activité est un drame subjectif et social où le travail bien fait et le genre professionnel protègent la santé mentale.",
    formuleMatrice:
      "Genre professionnel + Style singulier + Auto-confrontation = Développement du pouvoir d'agir.",
    citation: "« L'activité empêchée est le poison de la santé au travail. »",
  },
  {
    id: "m-2007",
    annee: "2007",
    moduleKey: "pst108",
    titre: "La Méthode IOD : Refus Déontologique du Tri",
    auteur: "Francis Valls & Denis Castra",
    ouvrage: "L'insertion professionnelle des personnes en difficulté (2007)",
    ruptureEpistemologique:
      "Rupture radicale avec l'idéologie de l'employabilité préalable : refus d'évaluer le demandeur d'emploi et action directe de négociation sur le travail réel de droit commun.",
    formuleMatrice:
      "Refus du tri préalable + Négociation avec l'entreprise + Médiation continue = Accès au droit commun.",
    citation:
      "« On n'entraîne pas les gens à nager sur la berge : l'insertion se fait directement dans l'eau du travail réel. »",
  },
  {
    id: "m-2016",
    annee: "2016",
    moduleKey: "pst124",
    titre: "Modèle de l'Acceptation Située des Technologies",
    auteur: "Marie-Éric Bobillier-Chaumon & C. Dubois",
    ouvrage:
      "Les nouvelles formes d'organisation du travail et technologies (2016)",
    ruptureEpistemologique:
      "Rupture avec les modèles prédictifs a priori (TAM de Davis / UTAUT) : l'appropriation technologique dépend des 4 dimensions situées (utilité, utilisabilité, intégration collective et retentissement identitaire).",
    formuleMatrice:
      "Acceptation située = Préservation du métier + Maintien du pouvoir d'agir + Soutien du collectif.",
    citation:
      "« La résistance au changement est presque toujours la réponse saine d'un collectif face à une technologie incapacitante. »",
  },
  {
    id: "m-2021",
    annee: "2021",
    moduleKey: "global",
    titre: "Révision du Code de Déontologie des Psychologues",
    auteur: "Organisations représentatives de psychologues (FFPP, SNP, AEPU)",
    ouvrage: "Code de Déontologie révisé (septembre 2021)",
    ruptureEpistemologique:
      "Actualisation des principes de consentement éclairé, secret professionnel, indépendance technique et rigueur scientifique face aux nouvelles plateformes et audits managériaux.",
    formuleMatrice:
      "Respect des droits fondamentaux + Autonomie technique + Secret professionnel = Posture éthique inviolable.",
    citation:
      "« Le psychologue refuse tout acte ou démarche qui compromettrait son indépendance professionnelle. »",
  },
];

interface ChronologieHistoriqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function ChronologieHistoriqueModal({
  isOpen,
  onClose,
  defaultModule,
}: ChronologieHistoriqueModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
    }
  }, [defaultModule, isOpen]);

  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    HISTORICAL_MILESTONES[0]!.id,
  );

  const filtered = useMemo(() => {
    return HISTORICAL_MILESTONES.filter((m) =>
      selectedModule === "all"
        ? true
        : m.moduleKey === selectedModule || m.moduleKey === "global",
    );
  }, [selectedModule]);

  const activeMilestone =
    filtered.find((m) => m.id === selectedMilestoneId) ||
    filtered[0] ||
    HISTORICAL_MILESTONES[0]!;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
              <History className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">Frise Historique &amp; Théories</span>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-extrabold uppercase shrink-0">
                  1880 - 2026
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden xs:block">
                Généalogie des ruptures épistémologiques du travail et du Cnam
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            {
              key: "all",
              label: `Toute la frise (${HISTORICAL_MILESTONES.length})`,
            },
            { key: "pst106", label: "PST106 · Activité" },
            { key: "pst108", label: "PST108 · Dialogue" },
            { key: "pst120", label: "PST120 · Psychodynamique" },
            { key: "pst123", label: "PST123 · Travail & emploi" },
            { key: "pst124", label: "PST124 · Digital" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule(f.key);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                selectedModule === f.key
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Axe Chronologique Défilant Horizontalement */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/60 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {filtered.map((m) => {
            const isSelected = activeMilestone.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setSelectedMilestoneId(m.id);
                }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs transition-all border shrink-0 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 min-w-[70px] ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200/70"
                }`}
              >
                <span className="font-mono font-black text-xs sm:text-sm">{m.annee}</span>
                <span className="text-[10px] font-semibold truncate max-w-[100px]">
                  {m.auteur.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body: Inspector */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {activeMilestone.annee}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 uppercase">
                  {activeMilestone.moduleKey.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {activeMilestone.titre}
              </h3>
              <p className="text-xs text-slate-500 m-0">
                {activeMilestone.auteur} · <i>{activeMilestone.ouvrage}</i>
              </p>
            </div>
          </div>

          {/* Rupture Épistémologique Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5 text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-600 shrink-0" />
              <span>Rupture Épistémologique majeure :</span>
            </span>
            <p className="leading-relaxed text-slate-800 dark:text-slate-200 m-0">
              {activeMilestone.ruptureEpistemologique}
            </p>
          </div>

          {/* Formule Matrice & Citation Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <GitCommit className="size-3.5 text-emerald-600 shrink-0" />
                <span>Formule Matrice d&apos;Examen :</span>
              </span>
              <p className="leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-semibold">
                {activeMilestone.formuleMatrice}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1">
              <span className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
                <BookOpen className="size-3.5 text-indigo-600 shrink-0" />
                <span>Citation Clé à citer en copie :</span>
              </span>
              <p className="leading-relaxed text-slate-800 dark:text-slate-200 font-serif italic m-0">
                {activeMilestone.citation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
