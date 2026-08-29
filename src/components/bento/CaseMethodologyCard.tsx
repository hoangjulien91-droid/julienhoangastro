import { useState } from 'react';
import { FolderSearch, ArrowRight, ShieldCheck } from 'lucide-react';

type CaseStudy = {
  id: string;
  label: string;
  category: string;
  scope: string;
  factualElements: string;
  restitution: string;
  deontology: string;
};

const CASES: CaseStudy[] = [
  {
    id: 'concurrence',
    label: 'Concurrence Déloyale & Détournement',
    category: 'Entreprise & Affaires',
    scope: 'Vérification du respect des clauses de non-concurrence, d’exclusivité ou d’absence de manœuvres déloyales.',
    factualElements: 'Constatations visuelles d’exercice d’une activité concurrente, démarchage effectif, flux logistiques anormaux, analyse OSINT de structures écrans.',
    restitution: 'Rapport de mission circonstancié, précis et horodaté, assorti de clichés photographiques pris depuis le domaine public.',
    deontology: 'Recherches proportionnées aux intérêts légitimes en cause, respect de la vie privée.',
  },
  {
    id: 'actifs',
    label: 'Recherche d’Actifs & Organisation d’Insolvabilité',
    category: 'Recouvrement & Procédure',
    scope: 'Recherche d’éléments patrimoniaux tangibles en vue de l’exécution d’une décision ou d’une mesure conservatoire.',
    factualElements: 'Identification de participations sociétaires, domiciliations effectives, train de vie apparent, patrimoine immobilier détenu en propre ou via des structures.',
    restitution: 'Synthèse factuelle documentée facilitant l’orientation des actes d’exécution par les auxiliaires de justice.',
    deontology: 'Exploitation rigoureuse de sources ouvertes légales et vérifications matérielles de terrain.',
  },
  {
    id: 'prestation',
    label: 'Affaires Familiales & Prestation Compensatoire',
    category: 'Droit de la Famille',
    scope: 'Éclairage factuel sur la situation économique réelle ou les conditions de vie d’une partie dans un contentieux familial.',
    factualElements: 'Relevé d’activité professionnelle non déclarée, constatation matérielle d’une communauté de vie stable et continue.',
    restitution: 'Rapport d’enquête factuel et objectif, communicable aux conseils et soumis au débat contradictoire.',
    deontology: 'Neutralité probatoire stricte, respect absolu des lieux privés et du secret professionnel.',
  },
  {
    id: 'arret_maladie',
    label: 'Arrêt de Travail & Suspicion de Fraude',
    category: 'Droit du Travail',
    scope: 'Vérification de l’existence d’une activité concurrente ou incompatible durant la suspension du contrat de travail.',
    factualElements: 'Constatation matérielle d’actes d’exercice professionnel ou de prestation de services rémunérée pendant l’arrêt.',
    restitution: 'Rapport d’observations objectives remis à l’employeur ou à son conseil pour appréciation de la suite juridique.',
    deontology: 'Observations cantonnées à la voie publique, respect scrupuleux des heures de sortie autorisées.',
  },
];

export function CaseMethodologyCard() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASES[0].id);

  const activeCase = CASES.find((c) => c.id === selectedCaseId) || CASES[0];

  return (
    <section className="surface-card animate-in animate-in-delay-3 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <FolderSearch className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">Typologie & Restitution Factuelle</h3>
              <p className="text-xs text-muted-foreground">Cadre d’intervention & méthodologie probatoire</p>
            </div>
          </div>
          <span className="rounded-full border border-border/80 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Art. L.621-1 CSI
          </span>
        </div>

        {/* Boutons Sélecteurs */}
        <div className="mb-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {CASES.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCaseId(item.id)}
                className={`rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-primary/50 bg-primary/10 text-primary shadow-xs'
                    : 'border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:bg-secondary/70'
                }`}
              >
                <div className="line-clamp-1 font-semibold">{item.label.split('&')[0]}</div>
                <div className="text-[10px] opacity-75">{item.category.split('&')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Détail du Cas Sélectionné */}
        <div className="rounded-xl border border-border/60 bg-secondary/30 p-3.5 text-xs">
          <div className="mb-2.5 flex items-center justify-between border-b border-border/40 pb-2">
            <span className="font-semibold text-foreground">{activeCase.label}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Cadre légal & contradictoire
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Cadre d’intervention : </span>
              <span className="text-foreground/90">{activeCase.scope}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Éléments susceptibles d’être documentés : </span>
              <span className="text-muted-foreground">{activeCase.factualElements}</span>
            </div>
            <div className="pt-0.5">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Restitution factuelle : </span>
              <span className="text-muted-foreground">{activeCase.restitution}</span>
            </div>
            <div className="pt-1 text-[11px] text-muted-foreground/80 italic border-t border-border/30">
              <span className="font-medium not-italic text-foreground">Exigence déontologique : </span>
              {activeCase.deontology}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
        <span className="text-muted-foreground">Appréciation préalable de faisabilité juridique :</span>
        <a
          href="https://detective-conseil.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          <span>Cadrer votre dossier</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}

