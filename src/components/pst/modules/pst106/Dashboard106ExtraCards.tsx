"use client";

import { Dashboard106ExamCourseCards } from "./dashboard-cards/Dashboard106ExamCourseCards";
import { Dashboard106ExamPrepCards } from "./dashboard-cards/Dashboard106ExamPrepCards";
import {
  Dashboard106ResourcesCards,
  genFicheRevision106,
} from "./dashboard-cards/Dashboard106ResourcesCards";

export { genFicheRevision106 };

interface Dashboard106ExtraCardsProps {
  onGoTab?: (panel: string) => void;
}

export function Dashboard106ExtraCards({
  onGoTab,
}: Dashboard106ExtraCardsProps) {
  return (
    <div className="space-y-4 pt-2">
      <Dashboard106ExamCourseCards onGoTab={onGoTab} />
      <Dashboard106ExamPrepCards />
      <Dashboard106ResourcesCards onGoTab={onGoTab} />
    </div>
  );
}
