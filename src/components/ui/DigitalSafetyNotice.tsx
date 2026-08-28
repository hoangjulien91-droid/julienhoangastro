import { ShieldAlert } from "lucide-react";

/**
 * Encart de sécurité numérique pour les pages à risque (violences,
 * harcèlement, stalking) : la visite du site peut elle-même exposer la
 * victime si son appareil est surveillé.
 */
export function DigitalSafetyNotice() {
  return (
    <aside className="mb-12 border-2 rounded-xl p-6 md:p-8 bg-warning-bg border-warning-border">
      <div className="flex items-start gap-4">
        <ShieldAlert className="shrink-0 text-warning-text size-8" />
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 mt-0 text-warning-text">
            Votre sécurité numérique d'abord
          </h2>
          <ul className="space-y-2 font-medium leading-relaxed text-warning-text/90 list-disc pl-5">
            <li>
              Si vous pensez que votre téléphone ou votre ordinateur est
              surveillé, consultez ce site depuis un{" "}
              <strong>appareil sûr</strong> : celui d'une personne de confiance,
              de votre travail ou d'une bibliothèque.
            </li>
            <li>
              Utilisez la <strong>navigation privée</strong> et effacez
              l'historique après votre visite.
            </li>
            <li>
              Le bouton <strong>« Quitter ce site »</strong> (en bas à gauche)
              ou un <strong>double appui sur la touche Échap</strong> vous
              redirige immédiatement vers une page neutre.
            </li>
            <li>
              En cas de danger immédiat, appelez le <strong>17</strong>. Le{" "}
              <strong>3919</strong> (Violences Femmes Info) est anonyme,
              gratuit, et n'apparaît pas sur les factures de téléphone.
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
