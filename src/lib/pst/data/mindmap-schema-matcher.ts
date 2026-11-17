export function findSchemaForNode(label: string, category: string): string | null {
  const hay = (label + " " + category).toLowerCase();
  if (
    hay.includes("leplat") ||
    (hay.includes("tâche") && hay.includes("régulation")) ||
    (hay.includes("tâche") && hay.includes("activité"))
  )
    return "schema-leplat-regulation";
  if (hay.includes("clot") || hay.includes("genre") || hay.includes("réel"))
    return "schema-clot-activite-reelle";
  if (
    hay.includes("dejours") ||
    hay.includes("reconnaissance") ||
    hay.includes("souffrance") ||
    hay.includes("psychodynamique")
  )
    return "schema-dejours-reconnaissance";
  if (
    hay.includes("bourdieu") ||
    hay.includes("habitus") ||
    hay.includes("capital") ||
    hay.includes("champ")
  )
    return "schema-bourdieu-algorithme";
  if (
    hay.includes("habermas") ||
    hay.includes("communication") ||
    hay.includes("validité") ||
    hay.includes("délibération")
  )
    return "schema-habermas-validite";
  if (
    hay.includes("honneth") ||
    hay.includes("mépris") ||
    hay.includes("sphères")
  )
    return "schema-honneth-spheres";
  if (
    hay.includes("bühler") ||
    hay.includes("buhler") ||
    hay.includes("organon")
  )
    return "schema-buhler-organon";
  if (
    hay.includes("iod") ||
    hay.includes("valls") ||
    hay.includes("castra") ||
    hay.includes("insertion")
  )
    return "schema-valls-iod";
  if (
    hay.includes("dubar") ||
    hay.includes("transaction") ||
    hay.includes("biographique")
  )
    return "schema-dubar-double-transaction";
  if (
    hay.includes("sainsaulieu") ||
    hay.includes("culture") ||
    hay.includes("fusionnel") ||
    hay.includes("négociateur")
  )
    return "schema-sainsaulieu-matrice";
  if (
    hay.includes("castel") ||
    hay.includes("désaffiliation") ||
    hay.includes("vulnérabilité")
  )
    return "schema-castel-desaffiliation";
  return null;
}
