"use client";

import { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowRight,
  Brain,
  Quote,
  CheckCircle2,
  HelpCircle,
  Layers,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface EnonceTravail {
  id: string;
  enonce: string;
  contexte: string;
  locuteur: string;
  destinataire: string;
  grilleBuhler: {
    expression: string;
    appel: string;
    representation: string;
  };
  grilleHabermas: {
    typeAgir: "communicationnel" | "stratégique";
    pretentionVerite: string;
    pretentionJustesse: string;
    pretentionSincerite: string;
    verdict: string;
  };
  grilleBourdieuAustin: {
    forceIllocutoire: string;
    pouvoirSymbolique: string;
    autoriteDeleguee: string;
  };
  grilleVygotski: string;
  piegeExamen: string;
}

const ENONCES_TRAVAIL_PST108: EnonceTravail[] = [
  {
    id: "e1",
    enonce: "« Je veux ce rapport de production sur mon bureau demain 8h pétantes, sans faute. »",
    contexte: "Fin de journée, le chef d'atelier s'adresse à un technicien méthodes qui allait partir.",
    locuteur: "Chef d'atelier (autorité hiérarchique)",
    destinataire: "Technicien méthodes (subordonné)",
    grilleBuhler: {
      expression: "Symptôme de l'émetteur : anxiété managériale, pression temporelle subie de la direction, volonté de domination.",
      appel: "Signal vers le récepteur : injonction d'obéissance, sommation de rester tard le soir, menace implicite de sanction.",
      representation: "Symbole / Objet du monde : le rapport de production écrit, le délai temporel fixé (demain 8h00).",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Factuellement discutable : le délai de 8h est-il techniquement indispensable ou arbitraire ?",
      pretentionJustesse: "Normativement contestable : le respect des horaires légaux de repos quotidien de 11h consécutives est violé.",
      pretentionSincerite: "Subjectivement opaque : le chef masque sa propre peur de sa hiérarchie derrière un ton autoritaire péremptoire.",
      verdict: "Agir stratégique ouvertement fondé sur la contrainte hiérarchique sans recherche d'intercompréhension.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte directif (ordre formel contraignant pour le destinataire).",
      pouvoirSymbolique: "L'énoncé ne tire son efficacité que du statut de chef conféré par l'institution : sans le titre hiérarchique, la phrase serait ridicule.",
      autoriteDeleguee: "Le chef agit comme porte-parole autorisé de l'organisation ; il use du capital institutionnel.",
    },
    grilleVygotski:
      "Ce mot d'ordre social extérieur est intériorisé par le technicien sous forme de langage intérieur anxiogène : « Il faut que je me dépêche, sinon je suis viré ».",
    piegeExamen:
      "Ne pas confondre la force linguistique de l'énoncé (Austin) avec le pouvoir social conféré par l'institution (Bourdieu).",
  },
  {
    id: "e2",
    enonce: "« Dans cette entreprise, on forme une grande famille, alors on ne compte pas ses heures. »",
    contexte: "Entretien d'évaluation annuel ou discours d'intégration d'un nouveau salarié cadre.",
    locuteur: "Directeur des Ressources Humaines",
    destinataire: "Jeune cadre recruté",
    grilleBuhler: {
      expression: "Émetteur : désir de séduction narcissique, instrumentalisation de l'affectivité pour maximiser la docilité.",
      appel: "Récepteur : injonction à la dévotion totale, culpabilisation par anticipation de toute revendication d'heures sup.",
      representation: "Objets : l'entreprise assimilée métaphoriquement à la sphère privée familiale (confusion des genres).",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Faillite de la vérité : une entreprise à but lucratif n'est pas une famille biologique désintéressée.",
      pretentionJustesse: "Violation normative : le droit du travail distingue rigoureusement le contrat de travail de l'engagement familial.",
      pretentionSincerite: "Insincérité systémique : manipulation idéologique destinée à obtenir un travail gratuit consenti.",
      verdict: "Agir stratégique dissimulé (pseudo-communicationnel) : emprise managériale par subversion des repères moraux.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte assertif en apparence (« nous sommes une famille »), mais prescriptif en réalité.",
      pouvoirSymbolique: "Violence symbolique pure : le dominé est incité à consentir à sa propre exploitation par l'adhésion affective à l'institution.",
      autoriteDeleguee: "L'institution s'octroie le monopole de la définition légitime du dévouement.",
    },
    grilleVygotski:
      "La métaphore de la 'famille' colonise la conscience du salarié : l'instrument sémiotique aliène la pensée au lieu de la libérer.",
    piegeExamen:
      "Ne pas qualifier cela de 'gentillesse managériale' : c'est l'exemple d'école de l'idéologie gestionnaire de Vincent de Gaulejac et de la violence symbolique de Bourdieu.",
  },
  {
    id: "e3",
    enonce: "« De toute façon, t'es qu'un bon à rien d'incapable, t'arriveras jamais à tenir ce poste ! »",
    contexte: "Altercation vive dans un vestiaire d'usine entre un tuteur et son apprenti suite à une pièce rebutée.",
    locuteur: "Ouvrier tuteur excédé",
    destinataire: "Jeune apprenti en formation",
    grilleBuhler: {
      expression: "Émetteur : explosion de colère, sentiment d'impuissance pédagogique et peur que la responsabilité du rebut retombe sur lui.",
      appel: "Récepteur : anéantissement symbolique, humiliation publique, assignation à l'indignité professionnelle.",
      representation: "Objets : le statut d'incapable érigé en vérité ontologique définitive.",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Faux factuellement : l'erreur d'apprentissage ne préjuge pas de l'incapacité globale du sujet.",
      pretentionJustesse: "Rupture absolue de la justesse : infraction déontologique et harcèlement moral potentiel.",
      pretentionSincerite: "Émotion débordante sans régulation éthique.",
      verdict: "Destruction pure de l'espace communicationnel par disqualification du sujet parlant.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte injurieux : acte de langage performatif dégradant cherchant à blesser par le verbe (Éric Lucy).",
      pouvoirSymbolique: "L'insulte opère comme un verdict social négatif, un stigmate cherchant à figer le dominé dans son infériorité.",
      autoriteDeleguee: "Le tuteur abuse de sa position d'ancien pour exercer une violence verbale sans légitimité juridique.",
    },
    grilleVygotski:
      "Impact traumatique : l'insulte sociale devient pour l'apprenti un langage intérieur destructeur bloquant sa zone proximale de développement (ZPD).",
    piegeExamen:
      "Éric Lucy a consacré un séminaire à l'insulte au travail : toujours rappeler que l'insulte vise à dénier à autrui sa qualité d'interlocuteur valable.",
  },
];

export function DecodeurLinguistique108() {
  const [selectedEnonceId, setSelectedEnonceId] = useState<string>(ENONCES_TRAVAIL_PST108[0].id);
  const [activeTheorie, setActiveTheorie] = useState<"buhler" | "habermas" | "bourdieu" | "vygotski">("buhler");

  const enonce =
    ENONCES_TRAVAIL_PST108.find((e) => e.id === selectedEnonceId) ?? ENONCES_TRAVAIL_PST108[0];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-white/90 to-orange-500/[0.06] dark:from-amber-950/40 dark:via-slate-900/90 dark:to-orange-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <MessageSquare className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>PST108 · Psychologie du Langage &amp; Clinique du Dialogue</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Le Décodeur Pragmatique &amp; Linguistique du Travail
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Analysez la parole au travail à travers les 4 grilles fondamentales d&apos;Éric Lucy : l&apos;Organon de <b>Bühler</b>, l&apos;agir communicationnel d&apos;<b>Habermas</b>, le pouvoir symbolique de <b>Bourdieu/Austin</b> et la médiation sémiotique de <b>Vygotski</b>.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Enoncés */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Sélectionnez un énoncé de terrain à décoder :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ENONCES_TRAVAIL_PST108.map((e) => {
            const isSelected = e.id === enonce.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  setSelectedEnonceId(e.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold border transition-all truncate max-w-xs shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-amber-600 border-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                }`}
              >
                {e.enonce}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Utterance Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
            Énoncé Réel Recueilli In Situ
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            {enonce.locuteur} ➔ {enonce.destinataire}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white italic m-0">
          {enonce.enonce}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
          <strong className="text-slate-900 dark:text-slate-200">Contexte :</strong> {enonce.contexte}
        </p>
      </div>

      {/* Theory Tabs — Mobile Scrollable Segmented Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("buhler");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "buhler"
              ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          1. Karl Bühler (Organon)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("habermas");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "habermas"
              ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          2. Habermas (3 Validités)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("bourdieu");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "bourdieu"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          3. Bourdieu &amp; Austin (Pouvoir)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("vygotski");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "vygotski"
              ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          4. Vygotski (Médiation)
        </button>
      </div>

      {/* Tab 1 : BUHLER */}
      {activeTheorie === "buhler" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  1. Fonction Expressive (Symptôme)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Émetteur</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.expression}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  2. Fonction d&apos;Appel (Signal)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Récepteur</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.appel}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  3. Fonction Représentative (Symbole)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Monde &amp; Objets</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.representation}
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
            <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Schéma d&apos;examen (Bühler, 1934) :</strong> Le triangle de l&apos;Organon place le signe linguistique au centre, reliant simultanément l&apos;émetteur (expression), le récepteur (appel) et l&apos;état des choses (représentation).
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 : HABERMAS */}
      {activeTheorie === "habermas" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
              Type d&apos;action selon Jürgen Habermas :
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-mono font-bold uppercase ${
                enonce.grilleHabermas.typeAgir === "communicationnel"
                  ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30"
              }`}
            >
              Agir {enonce.grilleHabermas.typeAgir}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                1. Vérité Objective (Monde Physique)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionVerite}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                2. Justesse Normative (Monde Social)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionJustesse}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                3. Sincérité Subjective (Monde Intérieur)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionSincerite}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/25 border border-indigo-200/80 dark:border-indigo-800/40 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
            <strong>Verdict critique :</strong> {enonce.grilleHabermas.verdict}
          </div>
        </div>
      )}

      {/* Tab 3 : BOURDIEU & AUSTIN */}
      {activeTheorie === "bourdieu" && (
        <div className="space-y-4 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] block">
                Force Illocutoire (John Austin · Performativité)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleBourdieuAustin.forceIllocutoire}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] block">
                Pouvoir Symbolique &amp; Doxa (Pierre Bourdieu)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleBourdieuAustin.pouvoirSymbolique}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 text-slate-800 dark:text-slate-300 space-y-1 leading-relaxed">
            <strong className="text-purple-800 dark:text-purple-300 font-mono uppercase text-[10px] block">
              Délégation d&apos;autorité institutionnelle :
            </strong>
            <p className="m-0">{enonce.grilleBourdieuAustin.autoriteDeleguee}</p>
          </div>
        </div>
      )}

      {/* Tab 4 : VYGOTSKI */}
      {activeTheorie === "vygotski" && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider text-xs">
            <Brain className="size-4 shrink-0" />
            <span>Médiation Sémiotique &amp; Intériorisation (Lev Vygotski)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed m-0">
            {enonce.grilleVygotski}
          </p>
          <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/25 border border-teal-200/80 dark:border-teal-800/40 text-teal-950 dark:text-teal-200 italic leading-relaxed">
            « La pensée ne s&apos;exprime pas simplement dans le mot : elle s&apos;y accomplit. Le langage social précède et construit le langage intérieur de l&apos;action. » (Vygotski, 1934)
          </div>
        </div>
      )}
    </div>
  );
}
