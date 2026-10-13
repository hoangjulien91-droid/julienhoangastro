"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Copy,
  Check,
  Download,
  Building2,
  Users,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface PstInterventionCommsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommTemplate {
  id: string;
  title: string;
  category: string;
  recipientRole: string;
  subject: (vars: CommVars) => string;
  body: (vars: CommVars) => string;
}

interface CommVars {
  orgName: string;
  recipientName: string;
  practitionerName: string;
  serviceName: string;
}

const COMM_TEMPLATES: CommTemplate[] = [
  {
    id: "approche_stage_rncp7",
    title: "1. Proposition de Recherche-Intervention / Stage RNCP 7 (500h)",
    category: "Cadrage & Négociation",
    recipientRole: "DRH / Direction d'Établissement / SST",
    subject: (v) =>
      `Proposition d'intervention clinique et ergonomique du travail (Cadre CNAM RNCP Niveau 7) — ${v.orgName}`,
    body: (v) => `Madame, Monsieur ${v.recipientName},

Dans le cadre du cursus de Psychologue du Travail du Conservatoire National des Arts et Métiers (Titre RNCP Niveau 7 — Chaire de Psychologie du Travail et d'Ergonomie), je vous sollicite afin d'étudier l'opportunité d'une recherche-intervention au sein de ${v.orgName} (périmètre pressenti : ${v.serviceName}).

Contrairement à un audit prescriptif standard, la démarche clinique et ergonomique du CNAM s'appuie sur l'analyse fine du travail réel (écart entre tâche prescrite et activité effective) afin de :
1. Identifier les déterminants organisationnels et techniques pesant sur la régulation de la charge, la qualité du travail et la santé des collectifs ;
2. Co-construire, sous l'égide d'un Comité de Pilotage (COPIL) paritaire, des pistes de transformation opérationnelles et durables ;
3. Garantir un cadre strictement confidentiel, volontaire et conforme au Code de déontologie des psychologues (révision 2021).

Je me tiens à votre entière disposition pour un entretien exploratoire de 30 minutes afin d'instruire ensemble vos enjeux actuels et de définir les contours d'une note de cadrage.

Je vous prie d'agréer, Madame, Monsieur ${v.recipientName}, l'expression de mes salutations distinguées.

${v.practitionerName}
Psychologue du Travail (Cursus CNAM RNCP Niveau 7)`,
  },
  {
    id: "appel_volontariat_salaries",
    title: "2. Note d'Information aux Salariés & Appel à Volontariat",
    category: "Collectif de Métier",
    recipientRole: "Équipes opérationnelles / Professionnels du service",
    subject: (v) =>
      `Note d'information : Démarche d'analyse du travail réel — Service ${v.serviceName}`,
    body: (v) => `À l'attention des professionnels du service ${v.serviceName} (${v.orgName}),

Une démarche d'analyse psychologique et ergonomique du travail est engagée au sein de votre unité afin de mieux comprendre les conditions réelles d'exercice de votre métier, vos contraintes quotidiennes et les ressources nécessaires pour réaliser un « travail bien fait ».

Ce dispositif repose sur quatre garanties déontologiques absolues (Code de déontologie des psychologues, 2021) :
- VOLONTARIAT : La participation aux observations situées et aux entretiens repose exclusivement sur votre accord libre et éclairé, révocable à tout moment.
- NON-ÉVALUATION DES PERSONNES : L'analyse porte strictement sur l'organisation, les outils et l'activité de travail — jamais sur l'évaluation individuelle des salariés.
- SECRET PROFESSIONNEL & ANONYMAT : Aucun propos nominatif ni aucune trace brute (notes, enregistrements) ne seront transmis à la hiérarchie ou à la direction.
- VALIDATION PRÉALABLE : Toute synthèse destinée au Comité de Pilotage sera préalablement discutée et validée avec le groupe de professionnels concernés.

Les personnes souhaitant participer au groupe de métier ou poser des questions sur le cadre de cette intervention peuvent me contacter directement en toute confidentialité.

${v.practitionerName}
Intervenant en Psychologie du Travail — CNAM`,
  },
  {
    id: "convocation_copil_paritaire",
    title: "3. Convocation & Ordre du Jour du Comité de Pilotage (COPIL)",
    category: "Instances & Gouvernance",
    recipientRole: "Direction, Représentants CSE/CSSCT, Médecine du Travail",
    subject: (v) =>
      `Invitation Comité de Pilotage (COPIL) — Intervention Psychologie du Travail (${v.serviceName})`,
    body: (v) => `Madame, Monsieur ${v.recipientName}, Membres du Comité de Pilotage,

J'ai le plaisir de vous convier à la réunion du Comité de Pilotage paritaire relative à l'intervention menée au sein du service ${v.serviceName} (${v.orgName}).

ORDRE DU JOUR PROPOSÉ :
1. Rappel du cadre méthodologique et déontologique de l'intervention (passage de la commande initiale à la demande instruite sur le terrain) ;
2. Présentation anonymisée des premiers constats issus des observations ergonomiques situées (analyse de l'écart tâche prescrite / activité réelle) ;
3. Mise en discussion des points de blocage techniques et organisationnels identifiés par le collectif de métier ;
4. Validation du calendrier de la phase suivante (entretiens d'autoconfrontation et groupes de délibération sur la qualité du travail).

Pour rappel, conformément au cadre contractuel et au Code de déontologie des psychologues (2021), les échanges en COPIL portent exclusivement sur les déterminants collectifs et organisationnels du travail, à l'exclusion de toute situation individuelle nominative.

Bien cordialement,

${v.practitionerName}
Psychologue du Travail (CNAM)`,
  },
  {
    id: "invitation_autoconfrontation",
    title: "4. Invitation à une Séance d'Autoconfrontation (PST106 / Clinique)",
    category: "Protocole Clinique",
    recipientRole: "Opérateurs volontaires du Groupe de Métier",
    subject: (v) =>
      `Séance d'analyse conjointe de l'activité (Autoconfrontation) — ${v.serviceName}`,
    body: (v) => `Bonjour,

Dans le prolongement de la séquence d'observation réalisée sur votre poste au sein du service ${v.serviceName}, je vous propose de nous retrouver pour notre séance d'autoconfrontation.

OBJECTIF DE LA SÉANCE (45 à 60 minutes) :
Il ne s'agit en aucun cas de juger votre performance, mais d'analyser ensemble, à partir des traces de votre activité, les arbitrages, les gestes de métier et les régulations que vous déployez face aux imprévus du réel (ce que l'on ne voit pas dans les procédures prescrites).

GARANTIES DE CONFIDENTIALITÉ :
- Vous restez seul propriétaire de votre parole et des séquences commentées ;
- Vous pouvez demander à tout instant l'arrêt ou l'effacement d'un passage ;
- Seuls les enseignements anonymisés que vous aurez explicitement validés pourront nourrir la réflexion collective du groupe de métier.

Je vous remercie par avance pour votre contribution essentielle à l'analyse du métier.

${v.practitionerName}
Psychologue du Travail — CNAM`,
  },
  {
    id: "refus_deontologique_opposable",
    title: "5. Courrier Opposable de Refus de Transmission Nominative",
    category: "Bouclier Déontologique",
    recipientRole: "Direction / DRH / Donneur d'Ordre",
    subject: (v) =>
      `Rappel du cadre déontologique et d'incommunicabilité des données individuelles — Intervention ${v.orgName}`,
    body: (v) => `Madame, Monsieur ${v.recipientName},

Faisant suite à votre sollicitation visant à obtenir la communication d'éléments nominatifs ou de notes brutes d'entretiens issus de l'intervention menée au sein du service ${v.serviceName} (${v.orgName}), je suis tenu de vous rappeler les règles impératives régissant l'exercice de la psychologie du travail.

En application du Principe I (Respect des droits de la personne), de l'Article 1er (Secret professionnel), de l'Article 3 (Indépendance professionnelle) et de l'Article 20 du Code de déontologie des psychologues (révision 2021), les matériaux cliniques bruts (notes d'observation, verbatims individuels, enregistrements) sont couverts par un secret absolu et demeurent la propriété exclusive du psychologue.

Le financement de l'intervention par ${v.orgName} ouvre droit à une restitution analytique approfondie portant sur les processus de travail, les dysfonctionnements organisationnels et les leviers de transformation collective, mais ne saurait en aucun cas lever la confidentialité due aux salariés ayant accordé leur confiance au dispositif.

Je vous confirme que le rapport de synthèse anonymisé vous sera présenté lors du prochain Comité de Pilotage.

Je vous prie d'agréer, Madame, Monsieur ${v.recipientName}, l'expression de ma considération distinguée.

${v.practitionerName}
Psychologue du Travail (CNAM)`,
  },
];

export const PstInterventionCommsModal: React.FC<
  PstInterventionCommsModalProps
> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId] = useState<string>(COMM_TEMPLATES[0].id);
  const [vars, setVars] = useState<CommVars>({
    orgName: "Groupe Industriel / Établissement Santé",
    recipientName: "Directeur des Ressources Humaines",
    practitionerName: "Auditeur Psychologue du Travail CNAM",
    serviceName: "Unité Logistique & Régulation",
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeTemplate =
    COMM_TEMPLATES.find((t) => t.id === selectedId) || COMM_TEMPLATES[0];

  const fullText = `OBJET : ${activeTemplate.subject(vars)}\n\n${activeTemplate.body(vars)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    playSuccessSound();
    setCopied(true);
    toast.success("Courrier institutionnel copié dans le presse-papiers.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    playClickSound();
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courrier_pst_${activeTemplate.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Générateur de Courriers et Communications d'Intervention Terrain"
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-5xl bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border/80 flex items-center justify-between gap-3 bg-muted/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center shrink-0">
              <Mail className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-accent/15 text-accent font-bold">
                COMMUNICATIONS OFFICIELLES &amp; CADRAGE TERRAIN
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-foreground m-0 mt-0.5">
                Générateur de Courriers &amp; Notes d'Intervention Clinique
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Dynamic Variables Bar */}
        <div className="p-4 border-b border-border/70 bg-muted/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs shrink-0">
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Organisation / Entreprise
            </label>
            <input
              type="text"
              value={vars.orgName}
              onChange={(e) => setVars({ ...vars, orgName: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Service / Unité observée
            </label>
            <input
              type="text"
              value={vars.serviceName}
              onChange={(e) =>
                setVars({ ...vars, serviceName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Destinataire (DRH / Direction)
            </label>
            <input
              type="text"
              value={vars.recipientName}
              onChange={(e) =>
                setVars({ ...vars, recipientName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
              Signataire (Intervenant PST)
            </label>
            <input
              type="text"
              value={vars.practitionerName}
              onChange={(e) =>
                setVars({ ...vars, practitionerName: e.target.value })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left selector */}
          <div className="lg:col-span-5 border-r border-border/80 overflow-y-auto p-3 space-y-2 bg-muted/10">
            {COMM_TEMPLATES.map((tpl) => {
              const isSelected = tpl.id === activeTemplate.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedId(tpl.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent/10 shadow-xs"
                      : "border-border/80 bg-card hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                      {tpl.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {tpl.recipientRole}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-foreground m-0">
                    {tpl.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-7 flex flex-col overflow-hidden p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 shrink-0">
              <span className="text-xs font-mono font-bold text-muted-foreground">
                Destinataire : {activeTemplate.recipientRole}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Exporter .TXT</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copied ? "Copié !" : "Copier le courrier"}</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 rounded-xl border border-border bg-background font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed select-all">
              {fullText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PstInterventionCommsModal;
