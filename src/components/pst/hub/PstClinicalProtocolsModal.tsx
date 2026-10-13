"use client";

import React, { useState } from "react";
import {
  Scale,
  FileText,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  X,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface ClinicalProtocolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProtocolId =
  | "consentement"
  | "cadrage"
  | "sosie"
  | "psychodynamique"
  | "bilan"
  | "digital";

interface ProtocolTemplate {
  id: ProtocolId;
  code: string;
  label: string;
  ue: string;
  refLegale: string;
  generateText: (intervenant: string, organisation: string, collectif: string) => string;
}

const PROTOCOLS: ProtocolTemplate[] = [
  {
    id: "consentement",
    code: "ACTE-01",
    label: "Formulaire de Consentement Éclairé (Auto-confrontation vidéo)",
    ue: "PST106 / PST123",
    refLegale: "Code de Déontologie des Psychologues (Art. 9 à 14) & RGPD (Art. 6 et 7)",
    generateText: (intervenant, organisation, collectif) =>
      `FORMULAIRE DE CONSENTEMENT LIBRE ET ÉCLAIRÉ
Intervention en Clinique de l'Activité — Recueil de traces vidéo et entretiens d'auto-confrontation

1. CADRE ET FINALITÉ DE L'INTERVENTION
La présente démarche est conduite par ${intervenant} (Psychologue du travail stagiaire / praticien — CNAM) au sein de l'organisation « ${organisation} », auprès du collectif professionnel : ${collectif}.
L'objectif exclusif de ce dispositif est l'analyse clinique de l'activité réelle de travail en vue de soutenir le pouvoir d'agir des professionnels et la délibération sur la qualité du travail. Il ne s'agit en aucun cas d'une évaluation individuelle des performances ou des personnes.

2. MODALITÉS MÉTHODOLOGIQUES (AUTO-CONFRONTATION SIMPLE ET CROISÉE)
Avec mon accord exprès, des séquences de mon activité de travail habituelle seront filmées, puis visionnées et commentées :
- En auto-confrontation simple (avec l'intervenant uniquement) ;
- En auto-confrontation croisée (avec un pair volontaire du même collectif de métier), sous réserve de ma validation préalable des extraits sélectionnés.

3. GARANTIES DÉONTOLOGIQUES ET PROPRIÉTÉ DES TRACES
Conformément au Code de déontologie des psychologues (1996, actualisé 2021) :
- Volontariat et révocabilité : Ma participation est strictement volontaire. Je conserve le droit de suspendre l'enregistrement ou de retirer mon consentement à tout moment, sans avoir à me justifier et sans aucune conséquence professionnelle.
- Secret professionnel et maîtrise de la diffusion : Les enregistrements bruts demeurent sous la garde exclusive de l'intervenant. Aucune image ou bande sonore ne sera communiquée à la ligne hiérarchique ou à la direction sans l'accord explicite et préalable des professionnels concernés.
- Anonymisation : Toute retranscription écrite destinée au mémoire académique ou à la restitution sera intégralement anonymisée.

Fait à ______________________, le ${new Date().toLocaleDateString("fr-FR")}
Signature du participant volontaire (précédée de la mention « Lu et approuvé ») :`,
  },
  {
    id: "cadrage",
    code: "ACTE-02",
    label: "Note de Cadrage d'Intervention Clinique (Comité de Pilotage)",
    ue: "PST106 / PST108",
    refLegale: "Méthodologie Chaire de Psychologie du Travail CNAM",
    generateText: (intervenant, organisation, collectif) =>
      `NOTE DE CADRAGE MÉTHODOLOGIQUE ET DÉONTOLOGIQUE
Passage de la commande managériale à la demande d'intervention clinique

Établissement : ${organisation}
Collectif associé : ${collectif}
Intervenant : ${intervenant} (CNAM — Titre RNCP Niveau 7 Psychologue du Travail)

1. REFORMULATION DE LA COMMANDE EN DEMANDE DE MÉTIER
Suite aux échanges préliminaires, l'intervention ne visera pas le traitement symptomatique ou prescriptif des comportements individuels, mais l'exploration conjointe des discordances entre l'organisation prescrite du travail et l'activité réelle déployée quotidiennement par les opérateurs.

2. ARCHITECTURE DU DISPOSITIF : DOUBLE INSTANCE
Pour garantir la pérennité des transformations et la sécurité psychologique des acteurs, deux instances distinctes sont instituées :
- Le Collectif d'Atelier (Professionnels volontaires : ${collectif}) : lieu d'analyse des situations réelles de travail, d'instruction des controverses de métier et de co-analyse (auto-confrontations / disputes professionnelles réglées).
- Le Comité de Pilotage (Direction, représentants du personnel, encadrement, médecine du travail) : instance de suivi où sont mises en discussion les questions de métier instruites par les opérateurs, dans le strict respect de l'anonymat des propos individuels.

3. ENGAGEMENT D'INDÉPENDANCE TECHNIQUE
L'intervenant exerce sa mission en toute indépendance méthodologique. Il est garant du cadre dialogique et du respect absolu du secret professionnel.`,
  },
  {
    id: "sosie",
    code: "ACTE-03",
    label: "Protocole & Consigne d'Instruction au Sosie (Oddone / Clot)",
    ue: "PST106",
    refLegale: "Protocole Ivar Oddone (1981) repris en Clinique de l'activité (Yves Clot)",
    generateText: (intervenant, organisation, collectif) =>
      `GRILLE DE CONDUITE D'ENTRETIEN — INSTRUCTION AU SOSIE
Intervenant (« Le Sosie ») : ${intervenant}
Instructeur (Professionnel du collectif ${collectif} — ${organisation})

1. CONSIGNE INAUGURALE OFFICIELLE (À ÉNONCER MOT POUR MOT)
« Suppose que je sois ton sosie et que demain je me trouve en situation de devoir te remplacer dans ton travail chez ${organisation}. Quelles sont les instructions que tu devrais me transmettre afin que personne ne s'avise de la substitution ? »

2. RÈGLES D'OR DE RELANCE DU SOSIE (POSTURE DE L'INTERVENANT)
- Refuser les généralités et le travail prescrit : L'instructeur tente spontanément de décrire sa fiche de poste idéale. Le sosie doit l'en empêcher par des questions obsédantes sur le COMMENT FAIRE concret (« Comment je tiens l'outil ? », « Qui je salue en premier ? », « Si le chef me demande cela à 8h10, qu'est-ce que je réponds exactement ? »).
- Explorer les obstacles et transgressions : Faire émerger les ruses du métier, les règles informelles du genre professionnel et les arbitrages cachés (« Et si la machine bloque, j'appelle la maintenance officielle ou je bricole moi-même ? »).
- Maintenir la contrainte d'illusion : « Si je fais exactement comme dit la procédure officielle, est-ce que les collègues vont tout de suite voir que ce n'est pas toi ? »

3. PHASE SECONDE : RETOUR SUR LA TRACE
L'entretien enregistré est retranscrit, puis remis à l'instructeur qui rédige un commentaire écrit sur son propre texte : c'est dans ce dédoublement que le sujet découvre le réel de son activité.`,
  },
  {
    id: "psychodynamique",
    code: "ACTE-04",
    label: "Charte d'Enquête en Psychodynamique du Travail (Dejours)",
    ue: "PST120",
    refLegale: "Méthode d'enquête Christophe Dejours — Laboratoire PCPP CNAM",
    generateText: (intervenant, organisation, collectif) =>
      `CHARTE D'ENQUÊTE EN PSYCHODYNAMIQUE DU TRAVAIL
Organisation : ${organisation} | Collectif : ${collectif}
Cliniciens : ${intervenant}

1. PRÉREQUIS DE LA DEMANDE ET CONSTITUTION DU GROUPE D'ENQUÊTE
L'enquête en psychodynamique du travail ne peut s'engager que sur la base d'une demande formulée ou appropriée par les travailleurs eux-mêmes. Le groupe d'enquête est constitué exclusivement de salariés volontaires (${collectif}).

2. ESPACE DE DÉLIBÉRATION ET ÉCOUTE RISQUÉE
Les séances collectives visent la mise en mots du vécu subjectif du travail : l'expérience de la résistance du réel, les stratégies collectives de défense (cynisme, déni du risque, virilisme) et les modalités d'exercice des jugements de reconnaissance (jugement de beauté par les pairs, jugement d'utilité par la hiérarchie).

3. VALIDATION CONTRADICTOIRE DU RAPPORT D'ENQUÊTE
À l'issue des séances, le rapport rédigé par ${intervenant} est intégralement soumis et lu mot à mot au collectif des travailleurs ayant participé à l'enquête.
Aucune version définitive ne peut être arrêtée, ni a fortiori transmise à l'employeur ou aux instances représentatives, sans l'amendement et la validation formelle du collectif des participants.`,
  },
  {
    id: "bilan",
    code: "ACTE-05",
    label: "Engagement de Confidentialité — Bilan de Compétences",
    ue: "PST123",
    refLegale: "Articles L. 6313-4, R. 6313-4 à R. 6313-8 du Code du Travail & Code de Déontologie",
    generateText: (intervenant, organisation, collectif) =>
      `CONVENTION DÉONTOLOGIQUE DE CONFIDENTIALITÉ — BILAN DE COMPÉTENCES
Prestataire / Psychologue du Travail : ${intervenant}
Entreprise / Contexte : ${organisation} (${collectif})

1. LES TROIS PHASES RÉGLEMENTAIRES (ART. R. 6313-4 C. TRAVAIL)
L'accompagnement s'articule obligatoirement autour de trois phases :
- Phase préliminaire : analyse de la demande, détermination du format et information sur les méthodes ;
- Phase d'investigation : construction du projet professionnel, analyse des motivations, compétences et possibilités d'évolution ;
- Phase de conclusion : entretiens personnalisés, recensement des facteurs favorisant la réalisation du projet et rédaction du document de synthèse.

2. PROPRIÉTÉ EXCLUSIVE DU DOCUMENT DE SYNTHÈSE (ART. L. 6313-4 C. TRAVAIL)
Conformément à la loi et au Code de déontologie des psychologues :
« Le bénéficiaire du bilan est seul destinataire des résultats détaillés et d'un document de synthèse. Ils ne peuvent être communiqués à un tiers (y compris l'employeur ou le financeur ${organisation}) qu'avec l'accord exprès du bénéficiaire. »

3. DESTRUCTION LÉGALE DES ARCHIVES (ART. R. 6313-7 C. TRAVAIL)
Les documents élaborés pour la réalisation du bilan de compétences sont immédiatement détruits par le psychologue dès la remise du document de synthèse, sauf demande écrite du bénéficiaire fondée sur la nécessité d'un suivi de sa situation (conservation maximale d'un an).`,
  },
  {
    id: "digital",
    code: "ACTE-06",
    label: "Protocole de Diagnostic de Genèse Instrumentale & Usages Situés",
    ue: "PST124",
    refLegale: "Modèle de Genèse Instrumentale (Rabardel, 1995) & Acceptation Située (Bobillier Chaumon)",
    generateText: (intervenant, organisation, collectif) =>
      `PROTOCOLE D'AUDIT D'APPROPRIATION TECHNOLOGIQUE ET D'USAGES SITUÉS
Organisation : ${organisation} | Utilisateurs / Métier : ${collectif}
Analyste : ${intervenant}

1. DÉPASSEMENT DES MODÈLES D'ACCEPTABILITÉ A PRIORI (TAM / UTAUT)
Ce protocole écarte l'évaluation purement déclarative ou sur plan de l'outil numérique pour observer l'acceptation située en écologie réelle de travail.

2. GRILLE D'OBSERVATION DE LA GENÈSE INSTRUMENTALE (RABARDEL)
L'audit documente le double processus par lequel l'artefact technique devient (ou échoue à devenir) un véritable instrument psychologique :
- Processus d'Instrumentation (vers le sujet) : Comment l'opérateur modifie-t-il ses schèmes d'action, ses routines cognitives et ses gestes professionnels pour intégrer les contraintes du logiciel ?
- Processus d'Instrumentalisation (vers l'artefact) : Quelles fonctions de l'outil sont détournées, enrichies ou contournées (catachrèses, tableaux parallèles, post-it) par les salariés pour sauvegarder l'efficacité et le sens du travail ?

3. ÉVALUATION DES INCIDENCES SUR LE POUVOIR D'AGIR ET LA SANTÉ
- Analyse de la porosité des temps, de la surcharge informationnelle et de l'intensification ;
- Vérification que l'outil numérique ne détruit pas les espaces de régulation collective du métier (${collectif}).`,
  },
];

export function PstClinicalProtocolsModal({
  isOpen,
  onClose,
}: ClinicalProtocolsModalProps) {
  const [activeId, setActiveId] = useState<ProtocolId>("consentement");
  const [intervenant, setIntervenant] = useState("Julien Hoang (Psychologue du Travail CNAM)");
  const [organisation, setOrganisation] = useState("Établissement / Organisation d'accueil");
  const [collectif, setCollectif] = useState("Collectif des opérateurs volontaires");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const current = PROTOCOLS.find((p) => p.id === activeId) || PROTOCOLS[0];
  const generatedText = current.generateText(intervenant, organisation, collectif);

  function handleCopy() {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast.success("Protocole copié dans le presse-papier.");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Actes et Protocoles Cliniques d'Intervention"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:px-6 border-b border-border bg-muted/20 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Scale className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-serif font-bold text-foreground m-0">
                  Actes &amp; Protocoles Cliniques d'Intervention
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                  {current.code} · {current.ue}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground m-0">
                Cadres méthodologiques et déontologiques prêts pour vos dossiers CNAM et interventions terrain
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

        {/* Protocol Tabs */}
        <div className="px-4 py-2 border-b border-border/70 bg-background flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          {PROTOCOLS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeId === p.id
                  ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{p.code}</span>
              <span>{p.label.split("(")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Dynamic variables inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border border-border bg-muted/20 text-xs">
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Intervenant / Psychologue :
              </label>
              <input
                type="text"
                value={intervenant}
                onChange={(e) => setIntervenant(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Organisation / Terrain :
              </label>
              <input
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-foreground block mb-1 text-[11px]">
                Collectif de métier :
              </label>
              <input
                type="text"
                value={collectif}
                onChange={(e) => setCollectif(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs"
              />
            </div>
          </div>

          {/* Legal reference banner */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-xs">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Fondement réglementaire &amp; doctrinal : {current.refLegale}</span>
            </div>
          </div>

          {/* Document Output */}
          <pre className="p-5 rounded-xl border border-border bg-background font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap select-all overflow-x-auto">
            {generatedText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-border bg-muted/10 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="size-3.5 text-accent" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-300" />
                  <span>Protocole copié !</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copier l'Acte Officiel</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
