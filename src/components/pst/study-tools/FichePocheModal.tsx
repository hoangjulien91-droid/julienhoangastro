"use client";

import { useState } from "react";
import { X, Printer, Copy, Check, Download, Sparkles, FileText } from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

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

  if (!isOpen) return null;

  function handlePrint() {
    playSuccessSound();
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function handleCopy() {
    playSuccessSound();
    const el = document.getElementById("fiche-poche-content");
    if (!el) return;
    navigator.clipboard.writeText(el.innerText);
    setCopied(true);
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
                  Format A4 Recto-Verso Imprimable
                </span>
                <span className="text-xs text-slate-500">Synthèse d&apos;examen</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                La Fiche Mémo de Poche ({selectedModule.toUpperCase()})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="size-3.5" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              <span>{copied ? "Copié" : "Copier"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* SÉLECTEUR DE MODULES */}
        <div className="no-print flex items-center gap-2 flex-wrap">
          {["pst108", "pst106", "pst120", "pst123", "pst124"].map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedModule(mod);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                selectedModule === mod
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {mod.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENU IMPRIMABLE (Zone blanche optimisée print) */}
        <div
          id="fiche-poche-content"
          className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-inner space-y-4 text-xs font-sans leading-relaxed print:p-0 print:border-none print:shadow-none"
        >
          {selectedModule === "pst108" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST108 — Pratiques de la communication professionnelle
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Enseignants : M. Éric LUCY &amp; M. Francis VALLS · Cnam Nouvelle-Aquitaine
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN
                </div>
              </div>

              {/* GRILLE 3 COLONNES D'AUTEURS FONDAMENTAUX */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    1. Pierre Bourdieu (1982)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Status est magistratus :</b> Le pouvoir des mots découle du statut institutionnel délégué.<br/>
                    • <b>Marché linguistique :</b> Rapports de force et profit de distinction symbolique.<br/>
                    • <b>Lit de justice (Sarah Hanley) :</b> Présence royale qui éteint la délibération parlementaire.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    2. Jürgen Habermas (1981)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Agir communicationnel :</b> Visée d&apos;entente intersubjective (<i>Verständigung</i>).<br/>
                    • <b>4 Prétentions universelles :</b> Intelligibilité, Vérité factuelle, Justesse normative, Sincérité.<br/>
                    • <b>Diskursethik &amp; Principe D :</b> Seules sont valides les normes approuvées par tous les concernés.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    3. Axel Honneth (1992, 2007)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>3 Sphères morales :</b> Amour (confiance), Droit (respect), Solidarité/Travail (estime de soi).<br/>
                    • <b>Réification :</b> Oubli de la reconnaissance préalable du sujet.<br/>
                    • <b>Invisibilité :</b> « Le noble nu devant ses domestiques » (transparence figurative et effective).
                  </div>
                </div>
              </div>

              {/* AXES RECHERCHE DE TERRAIN : ÉRIC LUCY & FRANCIS VALLS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 space-y-1">
                  <div className="font-black text-indigo-950 text-[11px] uppercase">
                    Recherches d&apos;Éric Lucy (Empan 2021 &amp; Sociographe 2020)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>L&apos;Insulte (Empan 2021) :</b> Violence symbolique et acte d&apos;institution/destitution. Hexis de la « grande gueule » populaire contre la « fine bouche » éducative.<br/>
                    • <b>SAMU Social (Sociographe 2020) :</b> La parole en maraude comme réinstitution du sujet face au risque de « contrat léonin » et « charité musclée » (Robert Castel).
                  </div>
                </div>

                <div className="p-3 rounded-xl border-l-4 border-purple-600 bg-purple-50/40 space-y-1">
                  <div className="font-black text-purple-950 text-[11px] uppercase">
                    Méthode IOD — Francis Valls &amp; Denis Castra (2007)
                  </div>
                  <div className="text-[10px] text-slate-700 leading-snug">
                    • <b>Rupture avec l&apos;employabilité :</b> Rejet du ciblage déficitaire des exclus.<br/>
                    • <b>4 Règles déontologiques IOD :</b> (1) Refus absolu du tri préalable ; (2) Non-mise en concurrence ; (3) Accès direct au droit commun salarial ; (4) Médiation bilatérale continue en entreprise.
                  </div>
                </div>
              </div>

              {/* NOVLANGUE & HARCÈLEMENT MORAL INSTITUTIONNEL */}
              <div className="p-3 rounded-xl border border-amber-300 bg-amber-50/40 space-y-1">
                <div className="font-black text-amber-950 text-[11px] uppercase">
                  Novlangue managériale &amp; Procès France Télécom (Cour d&apos;appel, 2022)
                </div>
                <div className="text-[10px] text-slate-700 leading-snug">
                  • <b>Valeur performative des mots :</b> « Par la fenêtre ou par la porte », « dégraissage » : les mots créent la violence.<br/>
                  • <b>Usage orwellien :</b> Euphémisation (<i>Time to Move</i>, <i>projet personnel accompagné</i>) violant les 4 prétentions d&apos;Habermas pour sidérer la contestation.
                </div>
              </div>
            </>
          )}

          {selectedModule === "pst106" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST106 — Psychologie du travail et ergonomie
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Cours officiel : Pr. Christine LAGABRIELLE · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    1. Alain Wisner (Ergonomie)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Travail prescrit vs Travail réel :</b> L&apos;écart irréductible face aux pannes.<br/>
                    • <b>Activité :</b> Mobilisation physique, cognitive et psychique globale face aux contraintes.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    2. Yves Clot (Clinique de l&apos;activité)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Activité empêchée :</b> La souffrance du travail nié et bâclé.<br/>
                    • <b>Genre vs Style :</b> La mémoire du métier réinvestie par le sujet.<br/>
                    • <b>Auto-confrontation croisée :</b> Débattre du travail bien fait.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    3. Christophe Dejours (Psychodynamique)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Défenses collectives :</b> L&apos;armure psychologique contre la peur.<br/>
                    • <b>Reconnaissance :</b> Jugement d&apos;utilité (hiérarchie) et de beauté (pairs).<br/>
                    • <b>Sublimation :</b> Transformer la souffrance en plaisir et santé.
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedModule === "pst123" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST123 — L&apos;Identité sociale et professionnelle &amp; Déontologie
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Cours officiel : Mme Élisabeth LUCY · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    Claude Dubar (Double Transaction)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Biographique (pour soi) :</b> Actes d&apos;appartenance dans le temps.<br/>
                    • <b>Relationnelle (pour autrui) :</b> Actes d&apos;attribution institutionnels.<br/>
                    • <b>4 Formes :</b> Promotion interne, blocage interne, conversion externe, exclusion externe.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    Renaud Sainsaulieu (4 Modèles)
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Fusionnel :</b> Camaraderie unanime ouvrière sans divergence.<br/>
                    • <b>Retrait :</b> Travail alimentaire, investissement hors-travail.<br/>
                    • <b>Négociateur :</b> Expertise, débat démocratique et rivalité pacifiée.<br/>
                    • <b>Affinitaire :</b> Clans électifs et quête de proximité avec le chef.
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedModule === "pst120" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST120 — Psychodynamique et psychopathologie du travail
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Fondateur : Pr. Christophe DEJOURS · CNAM &amp; Chaire Psychanalyse-Santé-Travail
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    1. Travail réel &amp; Épreuve
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Définition :</b> Le travail est ce qui résiste à l&apos;ordonnancement et à la machine.<br/>
                    • <b>Tricherie légitime :</b> Obligation de transgresser le prescrit pour faire fonctionner le réel.<br/>
                    • <b>Endurance :</b> L&apos;intelligence du corps au contact de la matière.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    2. Défenses &amp; Souffrance
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Stratégies collectives de défense :</b> Cynisme viril, déni collectif de la peur.<br/>
                    • <b>Souffrance éthique :</b> Conflit moral d&apos;infliger une maltraitance ou de saboter la qualité.<br/>
                    • <b>Peur de l&apos;incompétence :</b> Hantise du défaut de métier révélé aux pairs.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    3. Sublimation &amp; Reconnaissance
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Jugement d&apos;utilité :</b> Porté par la ligne hiérarchique et l&apos;organisation.<br/>
                    • <b>Jugement de beauté :</b> Attribué exclusivement par la communauté des pairs.<br/>
                    • <b>Coopération :</b> Espace de délibération où s&apos;arbitrent les règles de métier.
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedModule === "pst124" && (
            <>
              <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
                <div>
                  <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
                    PST124 — Organisation du travail, gestion et systèmes numériques
                  </h1>
                  <div className="text-[11px] text-slate-600 font-semibold">
                    Cours officiel : M. Philippe SARNIN &amp; M. Frédéric GUERIN · Cnam
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono font-bold text-slate-500">
                  FICHE MÉMO OFFICIELLE EXAMEN
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    Modèles d&apos;organisation &amp; Lean
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Taylorisme / Fordisme :</b> Division horizontale (parcellisation) et verticale (conception vs exécution).<br/>
                    • <b>Toyotisme &amp; Flux tendu :</b> Élimination des stocks tampons (muda) reportant l&apos;aléa sur la santé de l&apos;opérateur.<br/>
                    • <b>Intensification du travail :</b> Densification temporelle sans marges de manœuvre.
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900 text-[11px] uppercase">
                    Transformation Digitale &amp; Télétravail
                  </div>
                  <div className="text-[10px] text-slate-600 leading-snug">
                    • <b>Systèmes d&apos;information (ERP / IA) :</b> Rigidification des procédures et perte de vision globale du métier.<br/>
                    • <b>Télétravail :</b> Dilution des frontières vie pro/vie privée, sentiment d&apos;invisibilité, affaiblissement des collectifs informels.<br/>
                    • <b>Déterminants organisationnels :</b> Agir sur la gouvernance et le pouvoir d&apos;agir des équipes.
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
