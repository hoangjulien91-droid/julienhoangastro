export function FichePochePst124() {
  return (
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
            <p className="m-0">
              • <b>Artefact vs Instrument :</b> L&apos;artefact est l&apos;objet technique conçu par les ingénieurs. L&apos;instrument est une entité mixte (artefact + schèmes d&apos;utilisation développés par l&apos;opérateur).
            </p>
            <p className="m-0">
              • <b>Genèse instrumentale :</b> Double mouvement bidirectionnel :
            </p>
            <p className="m-0">
              - <i>Instrumentation :</i> L&apos;outil contraint et modifie les schèmes cognitifs de l&apos;humain.
            </p>
            <p className="m-0">
              - <i>Instrumentalisation :</i> L&apos;opérateur adapte, personnalise ou détourne l&apos;artefact pour réussir son travail (<b>catachrèse ergonomique</b>).
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            2. Yrjö Engeström — Théorie de l&apos;Activité
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Système d&apos;Activité :</b> Modélisation triangulaire reliant Sujet ↔ Outils/Artefacts ↔ Objet ↔ Règles ↔ Communauté ↔ Division du Travail.
            </p>
            <p className="m-0">
              • <b>Contradictions expansives :</b> Les tiraillements structurels (ex. règles comptables rigides contredisant l&apos;objet du travail) sont les moteurs essentiels de l&apos;apprentissage expansif et de l&apos;innovation organisationnelle.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            3. Modèles d&apos;Organisation &amp; Lean
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Taylorisme &amp; Fordisme :</b> Double division (verticale : concepteurs vs exécutants ; horizontale : parcellisation des tâches, &quot;one best way&quot;).
            </p>
            <p className="m-0">
              • <b>Toyotisme &amp; Lean Management :</b> Flux tendu, chasse au gaspillage (<i>muda</i>). Élimine les stocks tampons et reporte tous les aléas industriels sur la santé de l&apos;opérateur.
            </p>
            <p className="m-0">
              • <b>Gérard de Terssac :</b> L&apos;organisation est un compromis négocié permanent entre règles de contrôle et règles autonomes.
            </p>
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
            • <b>Au-delà de l&apos;utilisabilité technique (TAM de Davis) :</b> L&apos;acceptation réelle dépend du sens que l&apos;outil prend dans l&apos;activité, de la préservation de l&apos;identité professionnelle et du maintien du pouvoir d&apos;agir.
            <br />• <b>Aliénation par les algorithmes :</b> Standardisation des scripts de travail privant l&apos;opérateur de son pouvoir de régulation fine et de discernement clinique.
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border-l-4 border-indigo-600 bg-indigo-50/40 space-y-1">
          <div className="font-black text-indigo-950 text-[11px] uppercase">
            Télétravail &amp; Nouveaux Modes d&apos;Organisation
          </div>
          <div className="text-[10px] text-slate-700 leading-snug">
            • <b>Effets sur les collectifs :</b> Dilution de la frontière vie professionnelle/vie personnelle, risque d&apos;hyper-disponibilité, disparition des régulations informelles.
            <br />• <b>Posture d&apos;intervention :</b> Ne jamais agir uniquement sur l&apos;ergonomie du poste informatique individuel, mais réinterroger la gouvernance, les critères d&apos;évaluation et la charge de travail réelle.
          </div>
        </div>
      </div>
    </>
  );
}
