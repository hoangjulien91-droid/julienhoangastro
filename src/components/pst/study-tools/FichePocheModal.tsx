"use client";

import { useEffect, useState } from "react";
import { X, Printer, Copy, Check, FileText } from "lucide-react";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

interface FichePocheModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function FichePocheModal({
  isOpen,
  onClose,
  defaultModule = "pst108",
}: FichePocheModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "pst108",
  );
  const [copied, setCopied] = useState(false);

  // Synchronisation avec le module actif quand la modale s'ouvre ou defaultModule change
  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
    }
  }, [defaultModule, isOpen]);

  // Écoute des événements d'ouverture avec module spécifique en détail
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.module;
      if (targetMod && /^pst(106|108|120|123|124)$/.test(targetMod)) {
        setSelectedModule(targetMod);
      }
    };
    window.addEventListener("pst:open-fiche-poche", handleEvent);
    return () => window.removeEventListener("pst:open-fiche-poche", handleEvent);
  }, []);

  if (!isOpen) return null;

  function handlePrint() {
    triggerHaptic("success");
    playSuccessSound();
    if (typeof window !== "undefined") {
      document.body.classList.add("printing-fiche-poche");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-fiche-poche");
      }, 1000);
    }
  }

  function handleCopy() {
    triggerHaptic("success");
    playSuccessSound();
    const el = document.getElementById("fiche-poche-content");
    if (!el) return;
    navigator.clipboard.writeText(el.innerText);
    setCopied(true);
    toast.success("Fiche mémo A4 copiée dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      id="fiche-poche-modal-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="fiche-poche-modal-card"
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER MODAL */}
        <div className="no-print flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <FileText className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Format A4 Recto-Verso Imprimable (RNCP Niveau 7)
                </span>
                <span className="text-xs text-slate-500">Synthèse d&apos;examen Cnam</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 m-0">
                La Fiche Mémo de Poche ({selectedModule.toUpperCase()})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Printer className="size-3.5" />
              <span>Imprimer en A4 / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copié !" : "Copier Texte"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* SÉLECTEUR DE MODULES AVEC BADGES */}
        <div className="no-print flex items-center gap-2 flex-wrap">
          {[
            { id: "pst106", label: "PST106 · Clinique du Travail & Ergo" },
            { id: "pst108", label: "PST108 · Communication & IOD" },
            { id: "pst123", label: "PST123 · Identités & Déontologie" },
            { id: "pst120", label: "PST120 · Psychodynamique (Dejours)" },
            { id: "pst124", label: "PST124 · Organisation & Numérique" },
          ].map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedModule(mod.id);
              }}
              className={}
            >
              {mod.label}
            </button>
          ))}
        </div>

        {/* CONTENU IMPRIMABLE (Zone blanche haute densité optimisée print A4) */}
        <div
          id="fiche-poche-content"
          className="p-5 sm:p-6 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-inner space-y-3.5 text-xs font-sans leading-relaxed print:p-0 print:border-none print:shadow-none"
        >
          {/* ========================================================================= */}
          {/* PST106 : CLINIQUE DU TRAVAIL & ERGONOMIE                                  */}
          {/* ========================================================================= */}
          {selectedModule === "pst106" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST106 — Clinique du Travail, Psychodynamique &amp; Ergonomie de l&apos;Activité
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Enseignante responsable : Pr. Christine LAGABRIELLE · Cnam Paris &amp; Régions
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN · 2H00 SANS DOCUMENTS
                </div>
              </div>

              {/* GRILLE 3 COLONNES DES COURANTS CANONIQUES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    1. Alain Wisner — Ergonomie de l&apos;Activité
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Tâche prescrite vs Activité réelle :</b> Écart irréductible entre les consignes formelles et la réalité des situations (pannes, variabilité des matières, aléas).</p>
                    <p className="m-0">• <b>Compromis opératoire :</b> Régulations cognitives et physiologiques permanentes déployées par l&apos;opérateur pour faire fonctionner la production tout en préservant sa santé.</p>
                    <p className="m-0">• <b>Déterminants / Effets :</b> Analyse systémique des conditions internes (âge, santé) et externes (ambiances, cadences) produisant des effets sur la santé et la performance.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    2. Yves Clot — Clinique de l&apos;Activité
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Réel de l&apos;activité :</b> L&apos;activité réalisée n&apos;est qu&apos;une partie. Le réel englobe le possible, l&apos;impossible, le suspendu et <b>l&apos;activité empêchée</b> (source majeure de souffrance éthique et travail bâclé).</p>
                    <p className="m-0">• <b>Genre professionnel vs Style :</b> Le genre est la mémoire transpersonnelle et vivante du métier (règles de l&apos;art tacites partagées) ; le style est sa réappropriation singulière par le travailleur.</p>
                    <p className="m-0">• <b>Méthodes cliniques :</b> Autoconfrontation simple (face à sa vidéo), Autoconfrontation croisée (controverse professionnelle entre pairs sur le travail bien fait), Instruction au sosie.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    3. Christophe Dejours — Psychodynamique
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Épreuve du réel :</b> Le travail est ce qui résiste aux savoirs et à la prescription. Exige la mobilisation de l&apos;<b>intelligence pratique (la mêtis)</b>, rusée et en partie transgressive.</p>
                    <p className="m-0">• <b>Défenses collectives :</b> Armure psychologique construite en collectif contre l&apos;angoisse et le danger (ex. idéologie virile dans le BTP, cynisme partagé).</p>
                    <p className="m-0">• <b>Dynamique de la reconnaissance :</b> Moteur de la santé. Deux jugements indissociables : jugement d&apos;utilité (hiérarchie/bénéficiaires) et jugement de beauté/conformité (pairs, règles de l&apos;art) $ightarrow$ <b>Sublimation</b>.</p>
                  </div>
                </div>
              </div>

              {/* HISTOIRE & MÉTHODOLOGIE D'EXAMEN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="print-card p-2.5 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 space-y-1">
                  <div className="font-black text-indigo-950 text-[11px] uppercase">
                    Histoire : Psychotechnique &amp; Rupture Ergonomique
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Jean-Maurice Lahy (1916) :</b> Pionnier de la psychotechnique expérimentale, il dénonce très tôt l&apos;usure ouvrière sous cadences tayloriennes et la sélection passive.<br/>
                    • <b>Rupture de langue française (Self, 1963) :</b> Rejet de l&apos;adaptation passive de l&apos;homme au poste $ightarrow$ transformation de la situation pour développer le pouvoir d&apos;agir.<br/>
                    • <b>Canguilhem :</b> La santé n&apos;est pas la normalité statique, mais la capacité normative de créer de nouvelles normes vitales dans son milieu.
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 space-y-1">
                  <div className="font-black text-emerald-950 text-[11px] uppercase">
                    Méthodologie d&apos;Examen Cnam (Plan 18+/20)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Option A (Dissertation) :</b> Problématiser le sujet $ightarrow$ Axe 1 Wisner (tâche/activité) $ightarrow$ Axe 2 Clot (pouvoir d&apos;agir/genre) $ightarrow$ Axe 3 Dejours (souffrance/reconnaissance) $ightarrow$ Synthèse transformatrice.<br/>
                    • <b>Option B (Cas clinique) :</b> Dépouiller les verbatims $ightarrow$ identifier l&apos;activité empêchée et les défenses collectives $ightarrow$ formuler l&apos;hypothèse clinique $ightarrow$ cadre d&apos;intervention paritaire.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* PST108 : COMMUNICATION PROFESSIONNELLE & IOD                             */}
          {/* ========================================================================= */}
          {selectedModule === "pst108" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST108 — Pratiques de la Communication Professionnelle &amp; Méthodes d&apos;Intervention
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Enseignants responsables : M. Éric LUCY &amp; M. Francis VALLS · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN · 2H00 SANS DOCUMENTS
                </div>
              </div>

              {/* GRILLE 3 COLONNES THÉORIQUES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    1. Karl Bühler (1934) — L&apos;Organon
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Modèle de l&apos;Organon :</b> Le langage comme outil à 3 fonctions sémiotiques simultanées :</p>
                    <p className="m-0">• <b>Représentation (Darstellung) :</b> SYMBOLE des faits objectifs et des états de choses (axe cognitif/référentiel).</p>
                    <p className="m-0">• <b>Expression (Ausdruck) :</b> SYMPTÔME de l&apos;intériorité et de l&apos;émotion du locuteur (axe subjectif).</p>
                    <p className="m-0">• <b>Appel (Appell) :</b> SIGNAL vers l&apos;interlocuteur pour orienter son action (axe conatif/interactif).</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    2. Pierre Bourdieu (1982) — Marché &amp; Pouvoir
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Marché linguistique :</b> La parole est située dans des rapports de domination symbolique ; les mots tirent leur valeur du capital des locuteurs.</p>
                    <p className="m-0">• <b>Status est magistratus :</b> La force de l&apos;énoncé découle de l&apos;autorité institutionnelle déléguée à celui qui parle, non de sa syntaxe.</p>
                    <p className="m-0">• <b>Lit de justice (Sarah Hanley) :</b> Présence royale qui éteint la délibération parlementaire (imposition managériale fermant le débat).</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    3. Jürgen Habermas (1981) — Agir Communicationnel
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Agir stratégique vs Communicationnel :</b> Agir orienté vers le succès (instrumentalisation) vs agir orienté vers l&apos;intercompréhension libre (<i>Verständigung</i>).</p>
                    <p className="m-0">• <b>4 Prétentions universelles à la validité :</b> (1) Intelligibilité, (2) Vérité factuelle, (3) Justesse normative, (4) Sincérité subjective.</p>
                    <p className="m-0">• <b>Diskursethik &amp; Principe D :</b> Seules sont valides les normes approuvées librement par tous les participants concernés.</p>
                  </div>
                </div>
              </div>

              {/* AXES HONNETH, VALLS IOD ET RECHERCHES D'ÉRIC LUCY */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    4. Axel Honneth — Reconnaissance
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>3 Sphères morales :</b> Amour (confiance en soi), Droit (respect de soi), Solidarité/Travail (estime sociale de sa contribution).</p>
                    <p className="m-0">• <b>Réification :</b> Oubli de la reconnaissance préalable du sujet, réduit à une ressource technique quantifiable.</p>
                    <p className="m-0">• <b>Invisibilité :</b> « Le noble nu devant ses domestiques » (transparence figurative et indifférence méprisante).</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 space-y-1">
                  <div className="font-black text-indigo-950 text-[11px] uppercase">
                    5. Éric Lucy (Empan 2021, Sociographe 2020)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>L&apos;Insulte :</b> Violence symbolique et acte d&apos;institution/destitution. Hexis de la « grande gueule » populaire contre la « fine bouche » éducative.</p>
                    <p className="m-0">• <b>SAMU Social :</b> La parole en maraude comme réinstitution du sujet face au risque de « contrat léonin » et « charité musclée » (Robert Castel).</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border-l-4 border-purple-600 bg-purple-50/40 space-y-1">
                  <div className="font-black text-purple-950 text-[11px] uppercase">
                    6. Méthode IOD (Francis Valls &amp; D. Castra)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Rupture avec l&apos;employabilité :</b> Rejet du ciblage déficitaire ; action directe sur le milieu de travail et les offres d&apos;emploi.</p>
                    <p className="m-0">• <b>4 Règles IOD :</b> (1) Refus absolu du tri préalable ; (2) Non-mise en concurrence ; (3) Accès direct au droit commun salarial ; (4) Médiation continue bilatérale en entreprise.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* PST123 : IDENTITÉS PROFESSIONNELLES & DÉONTOLOGIE DU PSYCHOLOGUE          */}
          {/* ========================================================================= */}
          {selectedModule === "pst123" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST123 — L&apos;Identité Sociale et Professionnelle &amp; Déontologie du Psychologue
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Enseignante responsable : Mme Élisabeth LUCY · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN · 2H00 SANS DOCUMENTS
                </div>
              </div>

              {/* BLOC DÉONTOLOGIE ABSOLUMENT CRITIQUE */}
              <div className="print-card p-2.5 rounded-xl border-2 border-rose-500/60 bg-rose-50/40 space-y-1.5">
                <div className="font-black text-rose-950 text-[11px] uppercase flex items-center justify-between border-b border-rose-200 pb-0.5">
                  <span>Code de Déontologie des Psychologues (Mars 2021) — Cadre Légal &amp; Éthique Obligatoire</span>
                  <span className="font-mono text-[9px] text-rose-700 font-bold">PILLIER CENTRAL DE L&apos;ÉVALUATION CNAM</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px] text-slate-800 leading-snug">
                  <div>
                    <b className="text-rose-900 block">Article 7 — Consentement :</b>
                    Information préalable obligatoire des personnes sur les objectifs, méthodes, limites et destinataires finaux. Droit de refus sans sanction ni préjudice.
                  </div>
                  <div>
                    <b className="text-rose-900 block">Article 11 — Confidentialité :</b>
                    Secret professionnel absolu. Données brutes et verbatims protégés. Restitutions institutionnelles collectives et strictement anonymisées.
                  </div>
                  <div>
                    <b className="text-rose-900 block">Article 15 — Indépendance :</b>
                    Refus total d&apos;instrumentalisation managériale (licenciement masqué, sélection punitive). Autonomie complète dans le choix des outils et méthodes.
                  </div>
                  <div>
                    <b className="text-rose-900 block">Articles 29 &amp; 44 — Restitution :</b>
                    Restitution prioritaire aux salariés participants. Devoir d&apos;alerte éthique et protection en cas d&apos;atteinte grave à l&apos;intégrité psychique.
                  </div>
                </div>
              </div>

              {/* THÉORIES DE L'IDENTITÉ PROFESSIONNELLE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    1. Claude Dubar — La Double Transaction
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Transaction biographique (pour soi) :</b> Continuité/rupture temporelle du parcours, identité visée par le sujet.</p>
                    <p className="m-0">• <b>Transaction relationnelle (pour autrui) :</b> Attribution institutionnelle, étiquetage et reconnaissance par l&apos;organisation.</p>
                    <p className="m-0">• <b>4 Formes identitaires :</b> Promotion interne (continuité reconnue), Blocage interne (compétences niées), Conversion externe (bifurcation), Retrait/Exclusion.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    2. Renaud Sainsaulieu (1977) — 4 Modèles
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Fusionnel :</b> Camaraderie ouvrière, unanimisme, rejet des différences, forte solidarité d&apos;atelier face à la hiérarchie.</p>
                    <p className="m-0">• <b>Négociateur :</b> Expertise technique, acceptation des divergences régulées par le débat démocratique et la négociation syndicale.</p>
                    <p className="m-0">• <b>De Retrait :</b> Travail purement alimentaire, faible investissement collectif, épanouissement déplacé hors-travail.</p>
                    <p className="m-0">• <b>Affinitaire :</b> Réseaux électifs de proximité, allégeance personnelle au chef pour progresser.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    3. Posture du Psychologue en Intervention
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Négociation de la commande :</b> Transformer la demande brute de la direction ("calmez le stress") en problème réel d&apos;organisation du travail.</p>
                    <p className="m-0">• <b>Comité de pilotage paritaire :</b> Associer Direction, CSE/CSSCT et représentants pour garantir la légitimité et la neutralité.</p>
                    <p className="m-0">• <b>Analyse des situations :</b> Dégager les déterminants organisationnels sans jamais psychologiser les personnes.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* PST120 : PSYCHODYNAMIQUE & PSYCHOPATHOLOGIE DU TRAVAIL                   */}
          {/* ========================================================================= */}
          {selectedModule === "pst120" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST120 — Psychodynamique et Psychopathologie du Travail
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Fondateur de la discipline : Pr. Christophe DEJOURS · Chaire Psychanalyse-Santé-Travail, CNAM
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN · 2H00 SANS DOCUMENTS
                </div>
              </div>

              {/* GRILLE 3 COLONNES CLINIQUE DEJOURS, MOLINIER & PEZÉ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    1. C. Dejours — Épreuve du Réel &amp; Santé
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Épreuve du réel :</b> Le travail commence là où la technique échoue. Travailler confronte à la résistance du réel $ightarrow$ souffrance inhérente.</p>
                    <p className="m-0">• <b>Souffrance créatrice vs Pathogène :</b> Créatrice quand mobilisée dans l&apos;inventivité (mêtis) et reconnue ; pathogène si les défenses s&apos;effondrent dans l&apos;isolement.</p>
                    <p className="m-0">• <b>Dynamique de reconnaissance :</b> Jugement d&apos;utilité (hiérarchie) + Jugement de beauté/conformité (pairs sur les règles de l&apos;art) $ightarrow$ <b>Sublimation</b>.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    2. P. Molinier — Genre, Virilité &amp; Care
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Idéologie défensive virile :</b> Normes collectives masculines imposant le déni du danger et le mépris de la peur (ex. sidérurgie, BTP).</p>
                    <p className="m-0">• <b>Travail du Care (Souci de l&apos;autre) :</b> Compétences affectives, relationnelles et morales indispensables aux métiers du soin, structurellement invisibilisées et dévalorisées.</p>
                    <p className="m-0">• <b>Souffrance éthique du soignant :</b> Conflit déchirant entre rentabilité comptable (minutage des actes) et éthique de la bientraitance.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    3. M. Pezé — Décompensation &amp; Harcèlement
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Consultations Souffrance et Travail :</b> Diagnostic de l&apos;usure psychophysique, des décompensations dépressives et du stress post-traumatique.</p>
                    <p className="m-0">• <b>Burnout (Épuisement professionnel) :</b> Rupture brutale chez des salariés ultra-engagés piégés dans le surinvestissement sans régulation collective.</p>
                    <p className="m-0">• <b>Somatisation :</b> Le corps qui cède (TMS, accidents vasculaires, pathologies immunitaires) quand la parole est interdite.</p>
                  </div>
                </div>
              </div>

              {/* PRÉCURSEURS & DISPOSITIF CLINIQUE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="print-card p-2.5 rounded-xl border-l-4 border-amber-600 bg-amber-50/40 space-y-1">
                  <div className="font-black text-amber-950 text-[11px] uppercase">
                    Précurseurs de la Psychopathologie du Travail
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Louis Le Guillant (1956) :</b> <i>Le syndrome de la téléphoniste</i> (choc de cadence, morcellement des tâches, névrose industrielle).<br/>
                    • <b>Paul Sivadon (1952) :</b> Rôle thérapeutique et réadaptatif de l&apos;aménagement spatial du travail sur la structuration du Moi.<br/>
                    • <b>Claude Veil (1957) :</b> Limites de l&apos;adaptation humaine et concept de vulnérabilité ouvrière face aux cadences d&apos;usine.
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border-l-4 border-teal-600 bg-teal-50/40 space-y-1">
                  <div className="font-black text-teal-950 text-[11px] uppercase">
                    Dispositif de l&apos;Enquête en Psychodynamique (Méthode Dejours)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Règles fondamentales :</b> Demande émanant des salariés eux-mêmes, volontariat, séparation stricte de la hiérarchie dans les groupes.<br/>
                    • <b>Processus :</b> Levée des défenses collectives $ightarrow$ co-analyse de la souffrance $ightarrow$ restitution collective validée $ightarrow$ transformation des espaces de délibération.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* PST124 : ORGANISATION DU TRAVAIL & SYSTÈMES NUMÉRIQUES                   */}
          {/* ========================================================================= */}
          {selectedModule === "pst124" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST124 — Organisation du Travail, Gestion et Systèmes Numériques
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Enseignants responsables : M. Philippe SARNIN &amp; M. Frédéric GUERIN · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN · 2H00 SANS DOCUMENTS
                </div>
              </div>

              {/* GRILLE 3 COLONNES RABARDEL, ENGESTRÖM & MODÈLES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    1. Pierre Rabardel (1995) — Approche Instrumentale
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Artefact vs Instrument :</b> L&apos;artefact est l&apos;objet technique conçu par les ingénieurs. L&apos;instrument est une entité mixte (artefact + schèmes d&apos;utilisation développés par l&apos;opérateur).</p>
                    <p className="m-0">• <b>Genèse instrumentale :</b> Double mouvement bidirectionnel :</p>
                    <p className="m-0">- <i>Instrumentation :</i> L&apos;outil contraint et modifie les schèmes cognitifs de l&apos;humain.</p>
                    <p className="m-0">- <i>Instrumentalisation :</i> L&apos;opérateur adapte, personnalise ou détourne l&apos;artefact pour réussir son travail (<b>catachrèse ergonomique</b>).</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    2. Yrjö Engeström — Théorie de l&apos;Activité
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Système d&apos;Activité :</b> Modélisation triangulaire reliant Sujet $\leftrightarrow$ Outils/Artefacts $\leftrightarrow$ Objet $\leftrightarrow$ Règles $\leftrightarrow$ Communauté $\leftrightarrow$ Division du Travail.</p>
                    <p className="m-0">• <b>Contradictions expansives :</b> Les tiraillements structurels (ex. règles comptables rigides contredisant l&apos;objet du travail) sont les moteurs essentiels de l&apos;apprentissage expansif et de l&apos;innovation organisationnelle.</p>
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
                    3. Modèles d&apos;Organisation &amp; Lean
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug space-y-1">
                    <p className="m-0">• <b>Taylorisme &amp; Fordisme :</b> Double division (verticale : concepteurs vs exécutants ; horizontale : parcellisation des tâches, "one best way").</p>
                    <p className="m-0">• <b>Toyotisme &amp; Lean Management :</b> Flux tendu, chasse au gaspillage (<i>muda</i>). Élimine les stocks tampons et reporte tous les aléas industriels sur la santé de l&apos;opérateur.</p>
                    <p className="m-0">• <b>Gérard de Terssac :</b> L&apos;organisation est un compromis négocié permanent entre règles de contrôle et règles autonomes.</p>
                  </div>
                </div>
              </div>

              {/* ACCEPTABILITÉ SITUÉE & TÉLÉTRAVAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="print-card p-2.5 rounded-xl border-l-4 border-cyan-600 bg-cyan-50/40 space-y-1">
                  <div className="font-black text-cyan-950 text-[11px] uppercase">
                    Acceptabilité Située &amp; Numérisation (Brangier &amp; Bobillier-Chaumon)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Au-delà de l&apos;utilisabilité technique (TAM de Davis) :</b> L&apos;acceptation réelle dépend du sens que l&apos;outil prend dans l&apos;activité, de la préservation de l&apos;identité professionnelle et du maintien du pouvoir d&apos;agir.<br/>
                    • <b>Aliénation par les algorithmes :</b> Standardisation des scripts de travail privant l&apos;opérateur de son pouvoir de régulation fine et de discernement clinique.
                  </div>
                </div>

                <div className="print-card p-2.5 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 space-y-1">
                  <div className="font-black text-indigo-950 text-[11px] uppercase">
                    Télétravail &amp; Nouveaux Modes d&apos;Organisation
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Effets sur les collectifs :</b> Dilution de la frontière vie professionnelle/vie personnelle, risque d&apos;hyper-disponibilité, disparition des régulations informelles.<br/>
                    • <b>Posture d&apos;intervention :</b> Ne jamais agir uniquement sur l&apos;ergonomie du poste informatique individuel, mais réinterroger la gouvernance, les critères d&apos;évaluation et la charge de travail réelle.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
