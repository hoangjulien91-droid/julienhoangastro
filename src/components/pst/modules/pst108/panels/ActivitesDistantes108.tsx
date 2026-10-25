"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  BookOpen,
  Calendar,
  Sparkles,
  Copy,
  Brain,
  Quote,
  GraduationCap,
  ExternalLink,
  Headphones,
  Check,
  Building2,
  Users,
  Compass,
  Search,
  CheckCircle2,
  HelpCircle,
  Layers,
  ChevronDown,
  ArrowRight,
  ShieldAlert,
  MessageSquare,
  Wrench,
} from "lucide-react";
import {
  PST108_AD_DATA,
  type Pst108Document,
  type Pst108TeacherAd,
  type Pst108ExerciseValls,
  type Pst108CaseValls,
  type Pst108DispositifMarot,
  type Pst108AdMarot,
} from "@/lib/pst/data/pst108-ad";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

const LUCY_CATEGORIES = [
  { key: "all", label: "Tous les 26 documents (Moodle)" },
  { key: "lucy", label: "Éric Lucy (Clinique & Enquêtes)" },
  { key: "habermas", label: "Jürgen Habermas (Agir communicationnel)" },
  { key: "honneth", label: "Axel Honneth (Reconnaissance & Mépris)" },
  { key: "bourdieu", label: "Pierre Bourdieu (Pouvoir symbolique)" },
  { key: "linguistique", label: "Linguistique & Structuralisme (Sapir, Lévi-Strauss...)" },
  { key: "organisation", label: "Organisations & Travail (France Télécom, Philorama...)" },
];

export function ActivitesDistantes108() {
  const [activeProf, setActiveProf] = useState<"lucy" | "valls" | "marot">("marot");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sous-onglets spécifiques pour Francis Valls
  const [vallsTab, setVallsTab] = useState<"exercices" | "cas" | "theorie" | "docs">("exercices");
  const [selectedExNum, setSelectedExNum] = useState<number>(1);

  // Sous-onglets spécifiques pour Véronique Marot
  const [marotTab, setMarotTab] = useState<"dispositifs" | "ad_miossec" | "theorie" | "textes">("dispositifs");
  const [selectedDispId, setSelectedDispId] = useState<string>("marot-disp-sosie");
  const [selectedAdDate, setSelectedAdDate] = useState<"04nov" | "10nov">("04nov");

  const teacherData: Pst108TeacherAd = PST108_AD_DATA[activeProf];

  function handleCopy(text: string, key: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
      playSuccessSound();
    }
  }

  // Filtrage des documents
  const filteredDocs = useMemo(() => {
    let docs = teacherData.documentsClefs;
    if (activeProf === "lucy" && selectedCat !== "all") {
      docs = docs.filter((d) => d.categorie === selectedCat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      docs = docs.filter(
        (d) =>
          d.titre.toLowerCase().includes(q) ||
          d.auteur.toLowerCase().includes(q) ||
          d.fichierLocal.toLowerCase().includes(q) ||
          d.concept18.toLowerCase().includes(q) ||
          d.resumePedagogique.toLowerCase().includes(q),
      );
    }
    return docs;
  }, [teacherData.documentsClefs, activeProf, selectedCat, searchQuery]);

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM PST108 ───────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-amber-500/15 border border-indigo-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Semestre 1 · Cnam Nouvelle-Aquitaine</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/30">
              3 Enseignants Responsables
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30">
              Moodle Synchronisé
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            PST108 · Psychologie du Langage &amp; Clinique du Dialogue
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) &amp; Travaux Préparatoires aux Webconférences
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            Retrouvez pour chaque enseignant l&apos;ensemble des consignes officielles, des modèles de réponses rédigés (critères 18/20), des études de cas, des dispositifs d&apos;intervention et des textes ressources.
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DES 3 PROFESSEURS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("marot");
            setSelectedDocId(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "marot"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Users className="size-4 shrink-0" />
          <div className="text-left">
            <div>Mme Véronique MAROT ✦</div>
            <div className="text-[10px] font-normal opacity-80">Sosie, Autoconfrontation &amp; AD 04/11 &amp; 10/11</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("valls");
            setSelectedDocId(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "valls"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Building2 className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Francis VALLS ✦</div>
            <div className="text-[10px] font-normal opacity-80">Approche psychosociale &amp; Exercices 1-2-3</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("lucy");
            setSelectedDocId(null);
            setSelectedCat("all");
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "lucy"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <GraduationCap className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Éric LUCY (26 docs)</div>
            <div className="text-[10px] font-normal opacity-80">Pragmatique, Reconnaissance &amp; Tour de Babel</div>
          </div>
        </button>
      </div>

      {/* ── EN-TÊTE DU MODULE DE L'ENSEIGNANT CHOISI ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                {teacherData.prof}
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Moodle : {teacherData.moodleSectionId}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {teacherData.role} · <em>{teacherData.themeGeneral}</em>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={teacherData.moodleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
            >
              <span>Accéder à l&apos;espace Moodle</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {/* Podcast Philorama (pour Lucy) */}
        {teacherData.audioResource && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 mt-0.5">
                <Headphones className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {teacherData.audioResource.title}
                  </span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-200">
                    {teacherData.audioResource.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {teacherData.audioResource.summary}
                </p>
              </div>
            </div>
            <a
              href={teacherData.audioResource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs shrink-0"
            >
              <span>Écouter le podcast</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU SPÉCIFIQUE MME VÉRONIQUE MAROT ───────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeProf === "marot" && (
        <div className="space-y-6">
          {/* Sous-onglets Marot */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMarotTab("ad_miossec");
              }}
              className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                marotTab === "ad_miossec"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📝 AD du 04/11 &amp; 10/11 (Miossec) ✦
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMarotTab("dispositifs");
              }}
              className={`flex-1 min-w-[180px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                marotTab === "dispositifs"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🛠️ Les 3 Dispositifs Cliniques
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMarotTab("theorie");
              }}
              className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                marotTab === "theorie"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📐 Vygotski vs Piaget &amp; Bakhtine
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMarotTab("textes");
              }}
              className={`flex-1 min-w-[160px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                marotTab === "textes"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📚 Textes Téléchargés ({teacherData.documentsClefs.length})
            </button>
          </div>

          {/* 1. ACTIVITÉS DISTANTES DES 04/11 ET 10/11 (YVON MIOSSEC 2019) */}
          {marotTab === "ad_miossec" && (
            <div className="space-y-4">
              {/* Sélecteur de la partie d'AD */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedAdDate("04nov");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedAdDate === "04nov"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  📅 Séance du 04 novembre 2026 (Partie 1/2 : Problématique &amp; Rôle)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedAdDate("10nov");
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedAdDate === "10nov"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  📅 Séance du 10 novembre 2026 (Partie 2/2 : Effets santé &amp; Réfutation)
                </button>
              </div>

              {/* Rendu de l'AD choisie */}
              {teacherData.adSeancesMarot
                ?.filter((ad: Pst108AdMarot) => (selectedAdDate === "04nov" ? ad.id === "ad-marot-4nov" : ad.id === "ad-marot-10nov"))
                .map((ad: Pst108AdMarot) => (
                  <div
                    key={ad.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                            {ad.seanceDate} · {ad.partie}
                          </span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            Mme MAROT
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-1">
                          {ad.titre}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                          Lecture officielle : <strong>{ad.lecturePrescrite}</strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(ad.texteCompletCopier, ad.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                      >
                        {copiedKey === ad.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copié dans le presse-papier !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copier tout pour le Forum Moodle</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">Objectif visé : </span>
                      {ad.objectif}
                    </div>

                    {/* Liste des questions officielles avec corrigé 18/20 */}
                    <div className="space-y-4">
                      {ad.questions.map((q) => (
                        <div
                          key={q.num}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-800/30"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                              <HelpCircle className="size-3.5" />
                              <span>Question {q.num} : {q.titreQuestion}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(`【Question ${q.num} : ${q.titreQuestion}】\n\n${q.reponseRedigee18}`, `${ad.id}-q${q.num}`)}
                              className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === `${ad.id}-q${q.num}` ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                              <span>{copiedKey === `${ad.id}-q${q.num}` ? "Copié !" : "Copier la question"}</span>
                            </button>
                          </div>

                          <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold italic">
                            « {q.enonceOfficiel} »
                          </div>

                          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                            {q.reponseRedigee18}
                          </div>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {q.pointsCles.map((pk, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                              >
                                ✓ {pk}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* 2. LES 3 DISPOSITIFS CLINIQUES D'INTERVENTION */}
          {marotTab === "dispositifs" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
                <span className="font-bold">Programme officiel de Mme Marot (Séances des 27/11 et 10/12) :</span> « Les dispositifs d&apos;entretien en psychologie clinique du travail : L&apos;instruction au sosie, l&apos;autoconfrontation simple, l&apos;autoconfrontation croisée. »
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                {teacherData.dispositifsMarot?.map((disp: Pst108DispositifMarot) => (
                  <button
                    key={disp.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedDispId(disp.id);
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedDispId === disp.id
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {disp.nom}
                  </button>
                ))}
              </div>

              {teacherData.dispositifsMarot
                ?.filter((disp: Pst108DispositifMarot) => disp.id === selectedDispId)
                .map((disp: Pst108DispositifMarot) => (
                  <div
                    key={disp.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Dispositif Clinique Cnam · Fondateurs : {disp.inventeur}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                          {disp.nom}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `【${disp.nom} - ${disp.inventeur}】\nProtocole : ${disp.protocole}\n\nCas concret : ${disp.casCliniqueConcret.titre} (${disp.casCliniqueConcret.profession})\n${disp.casCliniqueConcret.analyse}\n\nDéplacement clinique : ${disp.casCliniqueConcret.deplacementClinique}`,
                            disp.id,
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                      >
                        {copiedKey === disp.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copier la fiche méthodologique</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-white">Protocole d&apos;intervention : </span>
                      {disp.protocole}
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50 dark:to-slate-800/50 border border-indigo-500/20 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Brain className="size-4 text-indigo-600 dark:text-indigo-400" />
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white m-0">
                            Cas Clinique de Référence : {disp.casCliniqueConcret.titre}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                          {disp.casCliniqueConcret.profession}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {disp.casCliniqueConcret.analyse}
                      </p>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2">
                        <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                            Effet psychologique &amp; Déplacement clinique (18/20 à l&apos;examen) :
                          </div>
                          <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium leading-relaxed">
                            {disp.casCliniqueConcret.deplacementClinique}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {disp.conceptsCles.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                        >
                          ✦ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* 3. THÉORIE : VYGOTSKI VS PIAGET & DIALOGISME BAKHTINIEN */}
          {marotTab === "theorie" && (
            <div className="space-y-4">
              {teacherData.slideMasterclass && (
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                      Cadre Conceptuel Officiel Mme Véronique MAROT
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-0.5">
                      {teacherData.slideMasterclass.titre}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {teacherData.slideMasterclass.axes.map((axe) => (
                      <div
                        key={axe.num}
                        className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                              {axe.num}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                              {axe.titre}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {axe.description}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                          <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                            Concepts clés :
                          </div>
                          <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                            {axe.notionsCles.map((nc, idx) => (
                              <li key={idx} className="leading-snug">
                                {nc}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {axe.auteurs.map((aut, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                {aut}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. LES TEXTES FONDAMENTAUX DE MME MAROT */}
          {marotTab === "textes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                    Articles &amp; Textes de Référence de Mme Marot ({teacherData.documentsClefs.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Dossier local : <code className="text-indigo-600 font-mono text-[11px]">~/Downloads/</code>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {teacherData.documentsClefs.map((doc: Pst108Document) => {
                  const isExpanded = selectedDocId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isExpanded
                          ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                          : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {doc.type} · {doc.annee}
                            </span>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              {doc.auteur}
                            </span>
                            {doc.externalUrl && (
                              <a
                                href={doc.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                              >
                                <ExternalLink className="size-2.5" />
                                <span>Lien Cairn / Persée</span>
                              </a>
                            )}
                          </div>
                          <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                            {doc.titre}
                          </h5>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                            <FileText className="size-3 shrink-0" />
                            <span>{doc.fichierLocal}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setSelectedDocId(isExpanded ? null : doc.id);
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                          >
                            {isExpanded ? "Replier" : "Fiche synthèse"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                                doc.id,
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                          >
                            {copiedKey === doc.id ? (
                              <>
                                <Check className="size-3 text-emerald-600" />
                                <span>Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="size-3" />
                                <span>Copier</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                            {doc.resumePedagogique}
                          </p>
                          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                            <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                                Notion Maîtresse 18/20 :
                              </div>
                              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                                {doc.concept18}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU M. ÉRIC LUCY (26 DOCUMENTS) OU FRANCIS VALLS ──────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeProf === "valls" && (
        <div className="space-y-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setVallsTab("exercices");
              }}
              className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vallsTab === "exercices"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ✍️ Les 3 Exercices Distanciel
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setVallsTab("cas");
              }}
              className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vallsTab === "cas"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🎯 Les 4 Études de Cas Cliniques
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setVallsTab("theorie");
              }}
              className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vallsTab === "theorie"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📐 Théorie : Ghiglione vs Shannon
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setVallsTab("docs");
              }}
              className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vallsTab === "docs"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📚 Documents &amp; SAVPJJ
            </button>
          </div>

          {/* 1. LES 3 EXERCICES DU DISTANCIEL DE VALLS */}
          {vallsTab === "exercices" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">Consignes officielles de M. Valls :</span> « En prévision de nos échanges à distance, merci de prendre connaissance des consignes ci-jointes pour chacun des 3 exercices suivants et de dégager pour vous-même et/ou de rédiger des premiers éléments de réponse. »
              </div>

              <div className="flex gap-2">
                {teacherData.exercicesDistanciel?.map((ex: Pst108ExerciseValls) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedExNum(ex.num);
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedExNum === ex.num
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    Exercice {ex.num} · {ex.num === 1 ? "R.L. KAHN" : ex.num === 2 ? "Le goût des autres" : "Corps & Voix"}
                  </button>
                ))}
              </div>

              {teacherData.exercicesDistanciel
                ?.filter((ex: Pst108ExerciseValls) => ex.num === selectedExNum)
                .map((ex: Pst108ExerciseValls) => (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          Exercice {ex.num} · Référence : {ex.auteurRef}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                          {ex.titre}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(ex.modeleReponse18.syntheseForum, `ex-${ex.num}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                      >
                        {copiedKey === `ex-${ex.num}` ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copié dans le presse-papier !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copier pour la Webconférence</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-white">Contexte d&apos;analyse : </span>
                      {ex.contexte}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                        <HelpCircle className="size-3.5" />
                        <span>Questions posées par M. Valls :</span>
                      </div>
                      <ul className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 pl-4 list-disc font-medium">
                        {ex.questionsOfficielles.map((q, idx) => (
                          <li key={idx} className="leading-snug">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {ex.conceptsAPrivilegier.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                        >
                          ✦ {c}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-800/50 border border-emerald-500/25 space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                        <h5 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200 m-0">
                          Proposition de réponse rédigée d&apos;excellence (Critères 18/20) :
                        </h5>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {ex.modeleReponse18.analyseDetaillee}
                      </div>

                      <div className="space-y-1 pt-2 border-t border-emerald-500/20">
                        <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                          Points clés à valoriser lors de la webconférence :
                        </div>
                        <ul className="text-[11px] text-emerald-800 dark:text-emerald-400 space-y-0.5 pl-4 list-disc">
                          {ex.modeleReponse18.pointsClesExamen.map((pk, idx) => (
                            <li key={idx}>{pk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* 2. LES 4 ÉTUDES DE CAS CLINIQUES DE VALLS */}
          {vallsTab === "cas" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
                <span className="font-bold">Scènes d&apos;interlocution de M. Valls :</span> « Au travers de situations concrètes d&apos;échanges verbaux tendus ou asymétriques, nous mettons au jour la co-construction de la référence, la rupture des scripts et la pluralité des grandeurs en jeu. »
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacherData.etudesDeCas?.map((cas: Pst108CaseValls) => (
                  <div
                    key={cas.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-800/50">
                          {cas.auteurRef}
                        </span>
                      </div>
                      <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                        {cas.titre}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {cas.contexte}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Analyse clinique du psychologue :
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cas.analyseClinique}
                      </p>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="size-3 shrink-0" />
                        <span>{cas.notionCle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. THÉORIE & SCHÉMAS */}
          {vallsTab === "theorie" && (
            <div className="space-y-4">
              {teacherData.slideMasterclass && (
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                      Cadre Conceptuel Officiel M. Francis Valls
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-0.5">
                      {teacherData.slideMasterclass.titre}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {teacherData.slideMasterclass.axes.map((axe) => (
                      <div
                        key={axe.num}
                        className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                              {axe.num}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                              {axe.titre}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {axe.description}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                          <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                            Points clés du cours :
                          </div>
                          <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                            {axe.notionsCles.map((nc, idx) => (
                              <li key={idx} className="leading-snug">
                                {nc}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {axe.auteurs.map((aut, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                {aut}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. DOCUMENTS RESSOURCES DE VALLS */}
          {vallsTab === "docs" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                    Documents du cours de M. Valls ({teacherData.documentsClefs.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Section Moodle : <code className="text-indigo-600 font-mono text-[11px]">68130</code>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {teacherData.documentsClefs.map((doc: Pst108Document) => {
                  const isExpanded = selectedDocId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isExpanded
                          ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                          : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {doc.type} · {doc.annee}
                            </span>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              {doc.auteur}
                            </span>
                          </div>
                          <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                            {doc.titre}
                          </h5>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                            <FileText className="size-3 shrink-0" />
                            <span>{doc.fichierLocal}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setSelectedDocId(isExpanded ? null : doc.id);
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                          >
                            {isExpanded ? "Replier" : "Fiche synthèse"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                                doc.id,
                              )
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                          >
                            {copiedKey === doc.id ? (
                              <>
                                <Check className="size-3 text-emerald-600" />
                                <span>Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="size-3" />
                                <span>Copier</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                            {doc.resumePedagogique}
                          </p>
                          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                            <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                                Notion Maîtresse 18/20 :
                              </div>
                              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                                {doc.concept18}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU M. ÉRIC LUCY (26 DOCUMENTS) ──────────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {activeProf === "lucy" && (
        <div className="space-y-4">
          {teacherData.slideMasterclass && (
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="size-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h4 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                      {teacherData.slideMasterclass.titre}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                      Cadre de référence officiel : {teacherData.slideMasterclass.oeuvreArt} ({teacherData.slideMasterclass.annee})
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                  Programme Examen RNCP 7
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {teacherData.slideMasterclass.axes.map((axe) => (
                  <div
                    key={axe.num}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                          {axe.num}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                          {axe.titre}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {axe.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                        Notions maîtresses :
                      </div>
                      <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                        {axe.notionsCles.map((nc, idx) => (
                          <li key={idx} className="leading-snug">
                            {nc}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {axe.auteurs.map((aut, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {aut}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
                  Documents Ressources ({filteredDocs.length})
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Index local des supports d&apos;enseignement
                </p>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un auteur, concept..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {LUCY_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedCat(cat.key);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCat === cat.key
                    ? "bg-indigo-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredDocs.map((doc: Pst108Document) => {
              const isExpanded = selectedDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isExpanded
                      ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                      : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {doc.type} · {doc.annee}
                        </span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {doc.auteur}
                        </span>
                        {doc.externalUrl && (
                          <a
                            href={doc.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            <ExternalLink className="size-2.5" />
                            <span>Lien direct web / vidéo</span>
                          </a>
                        )}
                      </div>
                      <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                        {doc.titre}
                      </h5>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                        <FileText className="size-3 shrink-0" />
                        <span className="break-all">{doc.fichierLocal}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedDocId(isExpanded ? null : doc.id);
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        {isExpanded ? "Replier" : "Fiche synthèse"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                            doc.id,
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                      >
                        {copiedKey === doc.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                          <Quote className="size-3 text-indigo-500" />
                          <span>Résumé analytique pour le cours &amp; l&apos;examen :</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                          {doc.resumePedagogique}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                        <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                            Notion Maîtresse 18/20 pour l&apos;examen RNCP 7 :
                          </div>
                          <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                            {doc.concept18}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
