import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { PROTO, APPROCHES } from "@/lib/pst/data/pst106-inline";

export function Protocole106() {
  return (
    <div>
      <Protocole
        data={PROTO}
        hint="La chronologie rigoureuse de l'intervention en clinique de l'activité (Clot & Faïta), puis la posture face aux RPS (séance 14)."
        referenceExplanation="Le comité de pilotage paritaire (1) est un prérequis politique avant toute observation (2). La trace vidéo (3) rend possible l'autoconfrontation simple (4), qui prépare le sujet à affronter le regard d'un pair en autoconfrontation croisée (5) — la controverse professionnelle. L'intervention se conclut par la restitution organisationnelle (6), qui redonne aux travailleurs la main sur la transformation de leur métier."
      />

      <div
        className="vh"
        style={{
          fontWeight: 700,
          color: "var(--accent)",
          fontSize: 14,
          textTransform: "uppercase",
          margin: "22px 0 10px",
        }}
      >
        Séance 14 — Quelle intervention face aux RPS ?
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 15,
        }}
      >
        {APPROCHES.map((ap) => (
          <div
            key={ap.title}
            className="qbox"
            style={{ borderTop: `4px solid ${ap.col}` }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: ap.col,
                marginBottom: 4,
              }}
            >
              {ap.title}
            </div>
            <div
              style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}
            >
              {ap.sub}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.5, margin: "0 0 8px" }}>
              {ap.desc}
            </p>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: ap.col }}>
              → {ap.verdict}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
