export function FichePochePst106() {
  return (
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
            <p className="m-0">
              • <b>Tâche prescrite vs Activité réelle :</b> Écart irréductible entre les consignes formelles et la réalité des situations (pannes, variabilité des matières, aléas).
            </p>
            <p className="m-0">
              • <b>Compromis opératoire :</b> Régulations cognitives et physiologiques permanentes déployées par l&apos;opérateur pour faire fonctionner la production tout en préservant sa santé.
            </p>
            <p className="m-0">
              • <b>Déterminants / Effets :</b> Analyse systémique des conditions internes (âge, santé) et externes (ambiances, cadences) produisant des effets sur la santé et la performance.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            2. Yves Clot — Clinique de l&apos;Activité
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Réel de l&apos;activité :</b> L&apos;activité réalisée n&apos;est qu&apos;une partie. Le réel englobe le possible, l&apos;impossible, le suspendu et <b>l&apos;activité empêchée</b> (source majeure de souffrance éthique et travail bâclé).
            </p>
            <p className="m-0">
              • <b>Genre professionnel vs Style :</b> Le genre est la mémoire transpersonnelle et vivante du métier (règles de l&apos;art tacites partagées) ; le style est sa réappropriation singulière par le travailleur.
            </p>
            <p className="m-0">
              • <b>Méthodes cliniques :</b> Autoconfrontation simple (face à sa vidéo), Autoconfrontation croisée (controverse professionnelle entre pairs sur le travail bien fait), Instruction au sosie.
            </p>
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
          <div className="font-black text-slate-900 text-[11px] uppercase border-b border-slate-200 pb-0.5">
            3. Christophe Dejours — Psychodynamique
          </div>
          <div className="text-[10px] text-slate-700 leading-snug space-y-1">
            <p className="m-0">
              • <b>Épreuve du réel :</b> Le travail est ce qui résiste aux savoirs et à la prescription. Exige la mobilisation de l&apos;<b>intelligence pratique (la mêtis)</b>, rusée et en partie transgressive.
            </p>
            <p className="m-0">
              • <b>Défenses collectives :</b> Armure psychologique construite en collectif contre l&apos;angoisse et le danger (ex. idéologie virile dans le BTP, cynisme partagé).
            </p>
            <p className="m-0">
              • <b>Dynamique de la reconnaissance :</b> Moteur de la santé. Deux jugements indissociables : jugement d&apos;utilité (hiérarchie/bénéficiaires) et jugement de beauté/conformité (pairs, règles de l&apos;art) → <b>Sublimation</b>.
            </p>
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
            • <b>Jean-Maurice Lahy (1916) :</b> Pionnier de la psychotechnique expérimentale, il dénonce très tôt l&apos;usure ouvrière sous cadences tayloriennes et la sélection passive.
            <br />• <b>Rupture de langue française (Self, 1963) :</b> Rejet de l&apos;adaptation passive de l&apos;homme au poste → transformation de la situation pour développer le pouvoir d&apos;agir.
            <br />• <b>Canguilhem :</b> La santé n&apos;est pas la normalité statique, mais la capacité normative de créer de nouvelles normes vitales dans son milieu.
          </div>
        </div>

        <div className="print-card p-2.5 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/40 space-y-1">
          <div className="font-black text-emerald-950 text-[11px] uppercase">
            Méthodologie d&apos;Examen Cnam (Plan 18+/20)
          </div>
          <div className="text-[10px] text-slate-700 leading-snug">
            • <b>Option A (Dissertation) :</b> Problématiser le sujet → Axe 1 Wisner (tâche/activité) → Axe 2 Clot (pouvoir d&apos;agir/genre) → Axe 3 Dejours (souffrance/reconnaissance) → Synthèse transformatrice.
            <br />• <b>Option B (Cas clinique) :</b> Dépouiller les verbatims → identifier l&apos;activité empêchée et les défenses collectives → formuler l&apos;hypothèse clinique → cadre d&apos;intervention paritaire.
          </div>
        </div>
      </div>
    </>
  );
}
