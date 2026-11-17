export function FichePochePst120() {
  return (
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
            <p className="m-0">
              • <b>Épreuve du réel :</b> Le travail commence là où la technique échoue. Travailler confronte à la résistance du réel → souffrance inhérente.
            </p>
            <p className="m-0">
              • <b>Souffrance créatrice vs Pathogène :</b> Créatrice quand mobilisée dans l&apos;inventivité (mêtis) et reconnue ; pathogène si les défenses s&apos;effondrent dans l&apos;isolement.
            </p>
            <p className="m-0">
              • <b>Dynamique de reconnaissance :</b> Jugement d&apos;utilité (hiérarchie) + Jugement de beauté/conformité (pairs sur les règles de l&apos;art) → <b>Sublimation</b>.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            2. P. Molinier — Genre, Virilité &amp; Care
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Idéologie défensive virile :</b> Normes collectives masculines imposant le déni du danger et le mépris de la peur (ex. sidérurgie, BTP).
            </p>
            <p className="m-0">
              • <b>Travail du Care (Souci de l&apos;autre) :</b> Compétences affectives, relationnelles et morales indispensables aux métiers du soin, structurellement invisibilisées et dévalorisées.
            </p>
            <p className="m-0">
              • <b>Souffrance éthique du soignant :</b> Conflit déchirant entre rentabilité comptable (minutage des actes) et éthique de la bientraitance.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            3. M. Pezé — Décompensation &amp; Harcèlement
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Consultations Souffrance et Travail :</b> Diagnostic de l&apos;usure psychophysique, des décompensations dépressives et du stress post-traumatique.
            </p>
            <p className="m-0">
              • <b>Burnout (Épuisement professionnel) :</b> Rupture brutale chez des salariés ultra-engagés piégés dans le surinvestissement sans régulation collective.
            </p>
            <p className="m-0">
              • <b>Somatisation :</b> Le corps qui cède (TMS, accidents vasculaires, pathologies immunitaires) quand la parole est interdite.
            </p>
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
            • <b>Louis Le Guillant (1956) :</b> <i>Le syndrome de la téléphoniste</i> (choc de cadence, morcellement des tâches, névrose industrielle).
            <br />• <b>Paul Sivadon (1952) :</b> Rôle thérapeutique et réadaptatif de l&apos;aménagement spatial du travail sur la structuration du Moi.
            <br />• <b>Claude Veil (1957) :</b> Limites de l&apos;adaptation humaine et concept de vulnérabilité ouvrière face aux cadences d&apos;usine.
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border-l-4 border-teal-600 bg-teal-50/40 space-y-1">
          <div className="font-black text-teal-950 text-[11px] uppercase">
            Dispositif de l&apos;Enquête en Psychodynamique (Méthode Dejours)
          </div>
          <div className="text-[10px] text-slate-700 leading-snug">
            • <b>Règles fondamentales :</b> Demande émanant des salariés eux-mêmes, volontariat, séparation stricte de la hiérarchie dans les groupes.
            <br />• <b>Processus :</b> Levée des défenses collectives → co-analyse de la souffrance → restitution collective validée → transformation des espaces de délibération.
          </div>
        </div>
      </div>
    </>
  );
}
