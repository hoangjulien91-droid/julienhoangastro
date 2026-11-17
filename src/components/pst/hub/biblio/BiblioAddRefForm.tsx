"use client";

import React, { useState } from "react";

export interface BiblioAddRefFormProps {
  onAdd: (data: {
    authors: string;
    year: string;
    title: string;
    publisher: string;
    stream: string;
    ue: string;
    concept: string;
  }) => void;
}

export function BiblioAddRefForm({ onAdd }: BiblioAddRefFormProps) {
  const [newAuthors, setNewAuthors] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newStream] = useState("Clinique de l'activité");
  const [newUe, setNewUe] = useState("106");
  const [newConcept, setNewConcept] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthors.trim() || !newYear.trim() || !newTitle.trim()) return;
    onAdd({
      authors: newAuthors.trim(),
      year: newYear.trim(),
      title: newTitle.trim(),
      publisher: newPublisher.trim(),
      stream: newStream,
      ue: newUe,
      concept: newConcept.trim(),
    });
    setNewAuthors("");
    setNewYear("");
    setNewTitle("");
    setNewPublisher("");
    setNewConcept("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-5 py-4 border-b border-indigo-500/20 bg-indigo-500/5 grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-end"
    >
      <div className="sm:col-span-2">
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          Auteur(s) (ex: Schwartz, Y.)
        </label>
        <input
          type="text"
          aria-label="Auteur(s)"
          required
          value={newAuthors}
          onChange={(e) => setNewAuthors(e.target.value)}
          placeholder="Schwartz, Y."
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        />
      </div>
      <div>
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          Année
        </label>
        <input
          type="text"
          aria-label="Année de publication"
          required
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          placeholder="2000"
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          Titre de l&apos;ouvrage / article
        </label>
        <input
          type="text"
          aria-label="Titre de l'ouvrage ou article"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Le paradigme ergologique..."
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        />
      </div>
      <div>
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          UE Cible
        </label>
        <select
          aria-label="UE Cible"
          value={newUe}
          onChange={(e) => setNewUe(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        >
          <option value="106">PST106</option>
          <option value="108">PST108</option>
          <option value="120">PST120</option>
          <option value="123">PST123</option>
          <option value="124">PST124</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          Éditeur / Revue
        </label>
        <input
          type="text"
          aria-label="Éditeur ou Revue"
          value={newPublisher}
          onChange={(e) => setNewPublisher(e.target.value)}
          placeholder="Octarès"
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        />
      </div>
      <div className="sm:col-span-3">
        <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
          Concept clé associé
        </label>
        <input
          type="text"
          aria-label="Concept clé associé"
          value={newConcept}
          onChange={(e) => setNewConcept(e.target.value)}
          placeholder="Corps-soi, dramatique d'usage de soi, renormalisation..."
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
