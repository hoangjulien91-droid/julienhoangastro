import { ERAS } from "@/lib/pst/data/pst106";

export function Frise106() {
  return (
    <div>
      <p className="hint">
        La <b>frise historique</b> de la discipline : chaque époque croise le
        contexte du travail, l&apos;état de la discipline, ses auteurs de
        référence et sa conception de la santé.
      </p>
      <div className="frise-timeline">
        {ERAS.map((era, i) => (
          <div
            className="frise-card"
            key={era.key}
            style={{ marginBottom: 18 }}
          >
            <div
              className="frise-header"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                className="frise-year"
                style={{ fontWeight: 700, color: "var(--accent)" }}
              >
                {era.year}
              </span>
              <h4 style={{ margin: 0 }}>{era.name}</h4>
            </div>
            <div
              className="frise-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              <div>
                <span
                  className="frise-label"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Travail
                </span>
                <p
                  style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: era.travail }}
                />
              </div>
              <div>
                <span
                  className="frise-label"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Discipline
                </span>
                <p
                  style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: era.discipline }}
                />
              </div>
              <div>
                <span
                  className="frise-label"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Auteur(s)
                </span>
                <p
                  style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: era.auteur }}
                />
              </div>
              <div>
                <span
                  className="frise-label"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Santé
                </span>
                <p
                  style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45 }}
                  dangerouslySetInnerHTML={{ __html: era.sante }}
                />
              </div>
            </div>
            {i < ERAS.length - 1 && (
              <div
                className="frise-connector"
                style={{
                  height: 20,
                  borderLeft: "2px dashed var(--line)",
                  marginLeft: 8,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
