export * from "./seances-types";
import type { SeanceCoursItem } from "./seances-types";
import { SEANCES_PST106 } from "./seances-pst106";
import { SEANCES_PST108 } from "./seances-pst108";
import { SEANCES_PST123 } from "./seances-pst123";

export const SEANCES_COURS_DATA: SeanceCoursItem[] = [
  ...SEANCES_PST106,
  ...SEANCES_PST108,
  ...SEANCES_PST123,
];
