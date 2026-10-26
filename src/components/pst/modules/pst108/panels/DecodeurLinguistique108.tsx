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
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-orange-950/20 to-slate-900/70 p-6 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
              <span>PST108 · Psychologie du Langage &amp; Clinique du Dialogue</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Le Décodeur Pragmatique &amp; Linguistique du Travail
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Analysez la parole au travail à travers les 4 grilles fondamentales d&apos;Éric Lucy : l&apos;Organon de <b>Bühler</b>, l&apos;agir communicationnel d&apos;<b>Habermas</b>, le pouvoir symbolique de <b>Bourdieu/Austin</b> et la médiation sémiotique de <b>Vygotski</b>.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Enoncés */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Sélectionnez un énoncé de terrain à décoder :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {ENONCES_TRAVAIL_PST108.map((e) => {
            const isSelected = e.id === enonce.id;
            return (
              <button
                key={e.id}
                onClick={() => {
                  setSelectedEnonceId(e.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all truncate max-w-xs ${
                  isSelected
                    ? "bg-amber-600 border-amber-400 text-white shadow-md shadow-amber-950/50"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                {e.enonce}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Utterance Card */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
            Énoncé Réel Recueilli In Situ
          </span>
          <span className="text-xs text-slate-400">
            {enonce.locuteur} ➔ {enonce.destinataire}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-white italic">
          {enonce.enonce}
        </h3>
        <p className="text-xs text-slate-400">
          <strong>Contexte :</strong> {enonce.contexte}
        </p>
      </div>

      {/* Theory Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTheorie("buhler");
            playClickSound();
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTheorie === "buhler"
              ? "bg-amber-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          1. Karl Bühler (Organon 3 Fonctions)
        </button>
        <button
          onClick={() => {
            setActiveTheorie("habermas");
            playClickSound();
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTheorie === "habermas"
              ? "bg-indigo-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          2. Habermas (3 Prétentions à la Validité)
        </button>
        <button
          onClick={() => {
            setActiveTheorie("bourdieu");
            playClickSound();
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTheorie === "bourdieu"
              ? "bg-purple-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          3. Bourdieu &amp; Austin (Pouvoir Symbolique)
        </button>
        <button
          onClick={() => {
            setActiveTheorie("vygotski");
            playClickSound();
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTheorie === "vygotski"
              ? "bg-teal-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          4. Lev Vygotski (Médiation &amp; ZPD)
        </button>
      </div>

      {/* Tab 1 : BUHLER */}
      {activeTheorie === "buhler" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-400">
                  1. Fonction Expressive (Symptôme)
                </span>
                <span className="text-[10px] text-slate-400">Émetteur</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {enonce.grilleBuhler.expression}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-400">
                  2. Fonction d&apos;Appel (Signal)
                </span>
                <span className="text-[10px] text-slate-400">Récepteur</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {enonce.grilleBuhler.appel}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-400">
                  3. Fonction Représentative (Symbole)
                </span>
                <span className="text-[10px] text-slate-400">Monde &amp; Objets</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {enonce.grilleBuhler.representation}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Schéma d&apos;examen (Bühler, 1934) :</strong> Le triangle de l&apos;Organon place le signe linguistique au centre, reliant simultanément l&apos;émetteur (expression), le récepteur (appel) et l&apos;état des choses (représentation).
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 : HABERMAS */}
      {activeTheorie === "habermas" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              Type d&apos;action selon Jürgen Habermas :
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                enonce.grilleHabermas.typeAgir === "communicationnel"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              Agir {enonce.grilleHabermas.typeAgir}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-400 uppercase text-[10px] block">
                1. Vérité Objective (Monde Physique)
              </span>
              <p className="text-slate-300">{enonce.grilleHabermas.pretentionVerite}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-400 uppercase text-[10px] block">
                2. Justesse Normative (Monde Social)
              </span>
              <p className="text-slate-300">{enonce.grilleHabermas.pretentionJustesse}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-400 uppercase text-[10px] block">
                3. Sincérité Subjective (Monde Intérieur)
              </span>
              <p className="text-slate-300">{enonce.grilleHabermas.pretentionSincerite}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200">
            <strong>Verdict critique :</strong> {enonce.grilleHabermas.verdict}
          </div>
        </div>
      )}

      {/* Tab 3 : BOURDIEU & AUSTIN */}
      {activeTheorie === "bourdieu" && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 uppercase text-[10px] block">
                Force Illocutoire (John Austin · Performativité)
              </span>
              <p className="text-slate-300 leading-relaxed">
                {enonce.grilleBourdieuAustin.forceIllocutoire}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 uppercase text-[10px] block">
                Pouvoir Symbolique &amp; Doxa (Pierre Bourdieu)
              </span>
              <p className="text-slate-300 leading-relaxed">
                {enonce.grilleBourdieuAustin.pouvoirSymbolique}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-slate-300 space-y-1">
            <strong className="text-purple-300 uppercase text-[10px] block">
              Délégation d&apos;autorité institutionnelle :
            </strong>
            <p>{enonce.grilleBourdieuAustin.autoriteDeleguee}</p>
          </div>
        </div>
      )}

      {/* Tab 4 : VYGOTSKI */}
      {activeTheorie === "vygotski" && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-xs">
            <Brain className="h-4 w-4" />
            <span>Médiation Sémiotique &amp; Intériorisation (Lev Vygotski)</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {enonce.grilleVygotski}
          </p>
          <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-800/40 text-teal-200 italic">
            « La pensée ne s&apos;exprime pas simplement dans le mot : elle s&apos;y accomplit. Le langage social précède et construit le langage intérieur de l&apos;action. » (Vygotski, 1934)
          </div>
        </div>
      )}
    </div>
  );
}
