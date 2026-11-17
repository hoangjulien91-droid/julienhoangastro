"use client";

import { MatriceDubarSainsaulieu } from "./panels/MatriceDubarSainsaulieu";
import { Atelier123AnnalesSection } from "./atelier/Atelier123AnnalesSection";
import { Atelier123MethodeSection } from "./atelier/Atelier123MethodeSection";
import { Atelier123BrouillonSection } from "./atelier/Atelier123BrouillonSection";
import { Atelier123OralSection } from "./atelier/Atelier123OralSection";
import { Atelier123Header } from "./atelier/Atelier123Header";
import { useAtelier123State } from "./atelier/useAtelier123State";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export function Atelier123() {
  const {
    activeMode,
    setActiveMode,
    selectedSubjectIdx,
    setSelectedSubjectIdx,
    showCorrige,
    setShowCorrige,
    copied,
    oralDuration,
    setOralDuration,
    oralTimeRemaining,
    setOralTimeRemaining,
    oralRunning,
    setOralRunning,
    selectedOralCaseIdx,
    setSelectedOralCaseIdx,
    oralChecklist,
    toggleOralChecklist,
    checkedCriteria,
    toggleCriterion,
    doneCriteria,
    pctCriteria,
    draftDissert,
    updateDraftDissert,
    annaleDrafts,
    updateAnnaleDraft,
    copyCorrige,
    dissertWordCount,
  } = useAtelier123State();

  return (
    <div className="space-y-6">
      <Atelier123Header
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        dissertWordCount={dissertWordCount}
      />

      {/* MODE 1 : ANNALES OFFICIELLES & CAS CLINIQUES */}
      {activeMode === "annales" && (
        <Atelier123AnnalesSection
          selectedSubjectIdx={selectedSubjectIdx}
          onSelectSubjectIdx={(idx) => {
            setSelectedSubjectIdx(idx);
            setShowCorrige(false);
          }}
          showCorrige={showCorrige}
          onToggleShowCorrige={() => setShowCorrige((v) => !v)}
          copied={copied}
          onCopyCorrige={copyCorrige}
          annaleDrafts={annaleDrafts}
          onUpdateAnnaleDraft={updateAnnaleDraft}
        />
      )}

      {/* MODE 2 : MÉTHODOLOGIE & GRILLES CONCEPTUELLES */}
      {activeMode === "methode" && (
        <Atelier123MethodeSection
          checkedCriteria={checkedCriteria}
          onToggleCriterion={toggleCriterion}
          doneCriteria={doneCriteria}
          pctCriteria={pctCriteria}
        />
      )}

      {/* MODE 3 : BROUILLON LIBRE DE COMPOSITION */}
      {activeMode === "brouillon" && (
        <Atelier123BrouillonSection
          draftDissert={draftDissert}
          onUpdateDraftDissert={updateDraftDissert}
          dissertWordCount={dissertWordCount}
        />
      )}

      {/* MODE 4 : PRÉSENTATION ORALE (SÉANCES 4 & 5 E. LUCY) */}
      {activeMode === "oral" && (
        <Atelier123OralSection
          oralDuration={oralDuration}
          onSetOralDuration={setOralDuration}
          oralTimeRemaining={oralTimeRemaining}
          onSetOralTimeRemaining={setOralTimeRemaining}
          oralRunning={oralRunning}
          onToggleOralRunning={() => {
            triggerHaptic("selection");
            playClickSound();
            setOralRunning((r) => !r);
          }}
          onResetOralTimer={() => {
            triggerHaptic("selection");
            playClickSound();
            setOralRunning(false);
            setOralTimeRemaining(oralDuration);
          }}
          selectedOralCaseIdx={selectedOralCaseIdx}
          onSelectOralCaseIdx={setSelectedOralCaseIdx}
          oralChecklist={oralChecklist}
          onToggleOralChecklist={toggleOralChecklist}
        />
      )}

      {/* MODE 5 : MATRICE DUBAR & SAINSAULIEU */}
      {activeMode === "matrice" && (
        <div className="space-y-5 animate-fadeIn">
          <MatriceDubarSainsaulieu />
        </div>
      )}
    </div>
  );
}
