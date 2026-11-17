export function FichePochePst123() {
  return (
    <>
      <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-base font-black uppercase tracking-wider text-slate-950 m-0">
            PST123 : Le psychologue, le travail et l&apos;emploi (2026 - 2027 Semestre 1)
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
          <span>
            Code de Déontologie des Psychologues (Mars 2021) — Cadre Légal &amp; Éthique Obligatoire
          </span>
          <span className="font-mono text-[9px] text-rose-700 font-bold">
            PILLIER CENTRAL DE L&apos;ÉVALUATION CNAM
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px] text-slate-800 leading-snug">
          <div>
            <b className="text-rose-900 block">
              Article 7 — Consentement :
            </b>
            Information préalable obligatoire des personnes sur les objectifs, méthodes, limites et destinataires finaux. Droit de refus sans sanction ni préjudice.
          </div>
          <div>
            <b className="text-rose-900 block">
              Article 11 — Confidentialité :
            </b>
            Secret professionnel absolu. Données brutes et verbatims protégés. Restitutions institutionnelles collectives et strictement anonymisées.
          </div>
          <div>
            <b className="text-rose-900 block">
              Article 15 — Indépendance :
            </b>
            Refus total d&apos;instrumentalisation managériale (licenciement masqué, sélection punitive). Autonomie complète dans le choix des outils et méthodes.
          </div>
          <div>
            <b className="text-rose-900 block">
              Articles 29 &amp; 44 — Restitution :
            </b>
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
            <p className="m-0">
              • <b>Transaction biographique (pour soi) :</b> Continuité/rupture temporelle du parcours, identité visée par le sujet.
            </p>
            <p className="m-0">
              • <b>Transaction relationnelle (pour autrui) :</b> Attribution institutionnelle, étiquetage et reconnaissance par l&apos;organisation.
            </p>
            <p className="m-0">
              • <b>4 Formes identitaires :</b> Promotion interne (continuité reconnue), Blocage interne (compétences niées), Conversion externe (bifurcation), Retrait/Exclusion.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            2. Renaud Sainsaulieu (1977) — 4 Modèles
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Fusionnel :</b> Camaraderie ouvrière, unanimisme, rejet des différences, forte solidarité d&apos;atelier face à la hiérarchie.
            </p>
            <p className="m-0">
              • <b>Négociateur :</b> Expertise technique, acceptation des divergences régulées par le débat démocratique et la négociation syndicale.
            </p>
            <p className="m-0">
              • <b>De Retrait :</b> Travail purement alimentaire, faible investissement collectif, épanouissement déplacé hors-travail.
            </p>
            <p className="m-0">
              • <b>Affinitaire :</b> Réseaux électifs de proximité, allégeance personnelle au chef pour progresser.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            3. Posture du Psychologue en Intervention
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Négociation de la commande :</b> Transformer la demande brute de la direction (&quot;calmez le stress&quot;) en problème réel d&apos;organisation du travail.
            </p>
            <p className="m-0">
              • <b>Comité de pilotage paritaire :</b> Associer Direction, CSE/CSSCT et représentants pour garantir la légitimité et la neutralité.
            </p>
            <p className="m-0">
              • <b>Analyse des situations :</b> Dégager les déterminants organisationnels sans jamais psychologiser les personnes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
