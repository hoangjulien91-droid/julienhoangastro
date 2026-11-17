"use client";

import { SchemaListView } from "./schemas/SchemaListView";
import { SchemaInspectorView } from "./schemas/SchemaInspectorView";
import { SchemasMatricesHeader } from "./schemas/SchemasMatricesHeader";
import { useSchemasMatricesState } from "./schemas/useSchemasMatricesState";

interface SchemasMatricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
  initialSchemaId?: string;
}

export function SchemasMatricesModal({
  isOpen,
  onClose,
  defaultModule,
  initialSchemaId,
}: SchemasMatricesModalProps) {
  const {
    selectedModule,
    setSelectedModule,
    selectedSchemaId,
    setSelectedSchemaId,
    viewMode,
    setViewMode,
    copied,
    clozeAnswers,
    selectedSlotId,
    setSelectedSlotId,
    filtered,
    activeSchema,
    challenges,
    correctCount,
    isAllSolved,
    allAvailableBadges,
    handleCopyAscii,
    handlePrintPlanche,
    handleOpenPalais,
    handleSelectClozeOption,
  } = useSchemasMatricesState(defaultModule, initialSchemaId, onClose);

  if (!isOpen) return null;

  return (
    <div
      id="schemas-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Boîte à Schémas & Matrices Visuelles 18/20"
    >
      <div
        id="schemas-modal-card"
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <SchemasMatricesHeader
          onOpenPalais={handleOpenPalais}
          onPrintPlanche={handlePrintPlanche}
          onClose={onClose}
          selectedModule={selectedModule}
          onSelectModule={setSelectedModule}
          viewMode={viewMode}
          onSetViewMode={setViewMode}
        />

        {/* Content Body: Split View Left Selector (Desktop) & Right Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Left Column: Schema List */}
          <div className="hidden md:block md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/30">
            <SchemaListView
              schemas={filtered}
              selectedSchemaId={activeSchema.id}
              onSelectSchemaId={setSelectedSchemaId}
            />
          </div>

          {/* Right Column: Schema Detailed View */}
          <div className="col-span-1 md:col-span-8 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-5 bg-white dark:bg-slate-900">
            <SchemaInspectorView
              activeSchema={activeSchema}
              filteredSchemas={filtered}
              selectedSchemaId={activeSchema.id}
              onSelectSchemaId={setSelectedSchemaId}
              viewMode={viewMode}
              copied={copied}
              onCopyAscii={handleCopyAscii}
              challenges={challenges}
              clozeAnswers={clozeAnswers}
              selectedSlotId={selectedSlotId}
              setSelectedSlotId={setSelectedSlotId}
              correctCount={correctCount}
              isAllSolved={isAllSolved}
              allAvailableBadges={allAvailableBadges}
              onSelectClozeOption={handleSelectClozeOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
