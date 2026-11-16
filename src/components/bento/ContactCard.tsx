"use client";

import { Compass, Scale, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

type ContactCardProps = {
  email: string;
};

export function ContactCard({ email }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="surface-card animate-in animate-in-delay-1 flex flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-foreground font-serif text-xl font-bold">
            Prendre Contact
          </h2>
          <span className="border-border/80 bg-secondary/80 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium">
            Orientation Confidentielle
          </span>
        </div>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          Choisissez le canal adapté pour une prise en charge immédiate sous
          secret professionnel :
        </p>

        <div className="flex flex-col gap-2.5">
          {/* Option Ikerketa */}
          <a
            href="https://ikerketa.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3 text-left transition-all hover:border-primary/50 hover:bg-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold group-hover:text-primary transition-colors">
                  Agence Ikerketa (Terrain)
                </p>
                <p className="text-muted-foreground text-xs">
                  Surveillances & filatures · Pays Basque & National
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors" />
          </a>

          {/* Option Détective Conseil */}
          <a
            href="https://detective-conseil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-border/80 bg-secondary/50 p-3 text-left transition-all hover:border-primary/40 hover:bg-secondary/90"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground border border-border">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold group-hover:text-primary transition-colors">
                  Détective Conseil (Visio & Audit)
                </p>
                <p className="text-muted-foreground text-xs">
                  Stratégie de preuve & cadrage de faits (100% à distance)
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors" />
          </a>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-xs">
        <span className="text-muted-foreground">Courriel direct :</span>
        <div className="inline-flex items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="text-foreground hover:text-primary font-mono font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="border-border/80 bg-secondary/70 text-muted-foreground hover:border-primary/40 hover:text-primary inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title="Copier l’adresse email"
            aria-label="Copier l’adresse email"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold" aria-live="polite">
                <Check className="h-3 w-3" aria-hidden="true" /> Copié
              </span>
            ) : (
              <>
                <Copy className="h-3 w-3" aria-hidden="true" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
