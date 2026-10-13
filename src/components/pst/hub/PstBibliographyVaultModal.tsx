import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  BookMarked,
  Search,
  Copy,
  Check,
  Plus,
  Trash2,
  Download,
  Tag,
  Quote,
  Sparkles,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface PstBibliographyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BiblioReference {
  id: string;
  authors: string;
  year: string;
  title: string;
  publisherOrJournal: string;
  apa7Full: string;
  inTextCitation: string;
  stream: string;
  ues: string[];
  keyConcept: string;
  examUsageTip: string;
  isCustom?: boolean;
}

const CORE_CNAM_REFERENCES: BiblioReference[] = [
  {
    id: "clot-1999",
    authors: "Clot, Y.",
    year: "1999",
    title: "La fonction psychologique du travail",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full: "Clot, Y. (1999). *La fonction psychologique du travail*. Presses Universitaires de France.",
    inTextCitation: "(Clot, 1999)",
    stream: "Clinique de l'activité",
    ues: ["106", "123", "124"],
    keyConcept: "Genre professionnel, style, activité réalisée vs réel de l'activité",
    examUsageTip:
      "Indispensable pour démontrer que la souffrance au travail provient de l'activité empêchée et de la nécrose du genre professionnel.",
  },
  {
    id: "clot-2008",
    authors: "Clot, Y.",
    year: "2008",
    title: "Travail et pouvoir d'agir",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full: "Clot, Y. (2008). *Travail et pouvoir d'agir*. Presses Universitaires de France.",
    inTextCitation: "(Clot, 2008)",
    stream: "Clinique de l'activité",
    ues: ["106", "108", "123"],
    keyConcept: "Pouvoir d'agir, architecture des 4 dimensions du métier (P-I-T-I), controverse sur le travail bien fait",
    examUsageTip:
      "À mobiliser dès qu'un sujet porte sur la santé au travail comme pouvoir d'agir et sur l'autoconfrontation croisée.",
  },
  {
    id: "dejours-1993",
    authors: "Dejours, C.",
    year: "1993",
    title: "Travail : usure mentale. De la psychopathologie à la psychodynamique du travail",
    publisherOrJournal: "Bayard",
    apa7Full:
      "Dejours, C. (1993). *Travail : usure mentale. De la psychopathologie à la psychodynamique du travail* (Nouv. éd. augm.). Bayard.",
    inTextCitation: "(Dejours, 1993)",
    stream: "Psychodynamique du travail",
    ues: ["106", "123"],
    keyConcept: "Stratégies collectives de défense, dynamique de la reconnaissance (jugement d'utilité et de beauté), sublimation",
    examUsageTip:
      "Essentiel pour analyser le déni du risque, la souffrance éthique et le rôle protecteur ou aliénant des défenses collectives.",
  },
  {
    id: "leplat-hoc-1983",
    authors: "Leplat, J., & Hoc, J.-M.",
    year: "1983",
    title: "Tâche et activité dans l'analyse psychologique des situations",
    publisherOrJournal: "Cahiers de Psychologie Cognitive, 3(1), 49–63",
    apa7Full:
      "Leplat, J., & Hoc, J.-M. (1983). Tâche et activité dans l'analyse psychologique des situations. *Cahiers de Psychologie Cognitive*, 3(1), 49–63.",
    inTextCitation: "(Leplat & Hoc, 1983)",
    stream: "Ergonomie de l'activité",
    ues: ["106", "108", "124"],
    keyConcept: "Distinction fondatrice entre Tâche prescrite (ce qui est à faire) et Activité réelle (ce qui se fait et coûte au sujet)",
    examUsageTip:
      "La référence socle absolue à placer en introduction de toute étude de cas ergonomique ou clinique au CNAM.",
  },
  {
    id: "wisner-1995",
    authors: "Wisner, A.",
    year: "1995",
    title: "Réflexions sur l'ergonomie (1962–1995)",
    publisherOrJournal: "Octarès",
    apa7Full: "Wisner, A. (1995). *Réflexions sur l'ergonomie (1962–1995)*. Octarès.",
    inTextCitation: "(Wisner, 1995)",
    stream: "Ergonomie de l'activité",
    ues: ["106", "124"],
    keyConcept: "Ergonomie située, intelligence de la pratique, anthropotechnologie, analyse de la demande",
    examUsageTip:
      "Idéal pour justifier la nécessité de l'observation située du travail réel contre les modèles tayloriens désincarnés.",
  },
  {
    id: "rabardel-1995",
    authors: "Rabardel, P.",
    year: "1995",
    title: "Les hommes et les technologies : approche cognitive des instruments contemporains",
    publisherOrJournal: "Armand Colin",
    apa7Full:
      "Rabardel, P. (1995). *Les hommes et les technologies : approche cognitive des instruments contemporains*. Armand Colin.",
    inTextCitation: "(Rabardel, 1995)",
    stream: "Approche instrumentale",
    ues: ["106", "124"],
    keyConcept: "Artefact vs Instrument, genèse instrumentale (instrumentation / instrumentalisation), catachrèse",
    examUsageTip:
      "Référence clé pour PST124 (Transformations digitales, IA, cobotique) afin de distinguer l'outil prescrit de l'instrument approprié.",
  },
  {
    id: "vygotski-1934",
    authors: "Vygotski, L. S.",
    year: "1934/1997",
    title: "Pensée et langage (F. Sève, Trad.)",
    publisherOrJournal: "La Dispute",
    apa7Full: "Vygotski, L. S. (1997). *Pensée et langage* (F. Sève, Trad.). La Dispute. (Ouvrage original publié en 1934).",
    inTextCitation: "(Vygotski, 1934/1997)",
    stream: "Psychologie historico-culturelle",
    ues: ["106", "120", "123"],
    keyConcept: "Langage intérieur vs langage extérieur, zone proximale de développement (ZPD), méthode indirecte",
    examUsageTip:
      "Permet d'expliquer pourquoi la pensée ne s'exprime pas simplement dans le mot mais se réalise et se transforme dans l'énonciation (PST120).",
  },
  {
    id: "bakhtine-1984",
    authors: "Bakhtine, M.",
    year: "1984",
    title: "Esthétique de la création verbale",
    publisherOrJournal: "Gallimard",
    apa7Full: "Bakhtine, M. (1984). *Esthétique de la création verbale*. Gallimard.",
    inTextCitation: "(Bakhtine, 1984)",
    stream: "Dialogisme",
    ues: ["120", "123"],
    keyConcept: "Dialogisme, genres de discours, polyphonie énonciative, destinataire et surdestinataire",
    examUsageTip:
      "Incontournable en PST120 et PST123 pour analyser comment chaque énoncé d'autoconfrontation est adressé au pair, au chercheur et au métier.",
  },
  {
    id: "canguilhem-1966",
    authors: "Canguilhem, G.",
    year: "1966",
    title: "Le normal et le pathologique",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full: "Canguilhem, G. (1966). *Le normal et le pathologique*. Presses Universitaires de France.",
    inTextCitation: "(Canguilhem, 1966)",
    stream: "Philosophie de la vie & Santé",
    ues: ["106", "123"],
    keyConcept: "Normativité vitale, santé comme capacité à instituer de nouvelles normes dans l'épreuve du milieu",
    examUsageTip:
      "Donne une profondeur épistémologique décisive pour définir la santé au travail autrement que par l'absence de maladie.",
  },
  {
    id: "oddone-1981",
    authors: "Oddone, I., Re, A., & Briante, G.",
    year: "1981",
    title: "Redécouvrir l'expérience ouvrière : vers une autre psychologie du travail ?",
    publisherOrJournal: "Éditions Sociales",
    apa7Full:
      "Oddone, I., Re, A., & Briante, G. (1981). *Redécouvrir l'expérience ouvrière : vers une autre psychologie du travail ?* Éditions Sociales.",
    inTextCitation: "(Oddone et al., 1981)",
    stream: "Clinique de l'activité / Communauté scientifique élargie",
    ues: ["106", "108", "123"],
    keyConcept: "Instruction au sosie, communauté scientifique élargie, co-analyse de l'expérience",
    examUsageTip:
      "À citer dès que vous mobilisez l'Instruction au sosie (« Si quelqu'un devait me remplacer demain sans qu'on s'en aperçoive... »).",
  },
  {
    id: "molinier-2013",
    authors: "Molinier, P.",
    year: "2013",
    title: "Le travail du care",
    publisherOrJournal: "La Dispute",
    apa7Full: "Molinier, P. (2013). *Le travail du care*. La Dispute.",
    inTextCitation: "(Molinier, 2013)",
    stream: "Psychodynamique & Éthique du Care",
    ues: ["106", "123"],
    keyConcept: "Savoir-faire discrets, travail inestimable, vulnérabilité partagée, division sexuelle et morale du travail",
    examUsageTip:
      "Très apprécié par le jury sur les terrains médico-sociaux, hospitaliers ou de services pour visibiliser le travail invisible.",
  },
  {
    id: "bobillier-2021",
    authors: "Bobillier Chaumon, M.-É.",
    year: "2021",
    title: "Les transformations digitales à l'épreuve de l'activité et des salariés",
    publisherOrJournal: "ISTE Éditions",
    apa7Full:
      "Bobillier Chaumon, M.-É. (2021). *Les transformations digitales à l'épreuve de l'activité et des salariés : comprendre et accompagner les mutations technologiques émergentes*. ISTE Éditions.",
    inTextCitation: "(Bobillier Chaumon, 2021)",
    stream: "Psychologie ergonomique & Technologies émergentes",
    ues: ["124"],
    keyConcept: "Clinique de l'usage, acceptabilité située vs acceptation pratique, intensification et porosité techno-induite",
    examUsageTip:
      "Référence directe du titulaire de la chaire CNAM pour PST124 : indispensable pour tout sujet sur la digitalisation, l'IA ou le télétravail.",
  },
  {
    id: "austin-1970",
    authors: "Austin, J. L.",
    year: "1970",
    title: "Quand dire, c'est faire",
    publisherOrJournal: "Éditions du Seuil",
    apa7Full: "Austin, J. L. (1970). *Quand dire, c'est faire* (G. Lane, Trad.). Éditions du Seuil.",
    inTextCitation: "(Austin, 1970)",
    stream: "Pragmatique du langage",
    ues: ["120"],
    keyConcept: "Actes de langage (locutoire, illocutoire, perlocutoire), performativité de la parole en situation",
    examUsageTip:
      "Ancrage linguistique clé en PST120 pour démontrer que le langage au travail est une action qui modifie les rapports sociaux.",
  },
  {
    id: "pastre-2011",
    authors: "Pastré, P.",
    year: "2011",
    title: "La didactique professionnelle : approche anthropologique du développement chez les adultes",
    publisherOrJournal: "Presses Universitaires de France",
    apa7Full:
      "Pastré, P. (2011). *La didactique professionnelle : approche anthropologique du développement chez les adultes*. Presses Universitaires de France.",
    inTextCitation: "(Pastré, 2011)",
    stream: "Didactique professionnelle",
    ues: ["108", "124"],
    keyConcept: "Structure conceptuelle de la situation, concepts pragmatiques, modèle opératif vs modèle cognitif",
    examUsageTip:
      "Crucial en PST108 (Parcours, compétences, VAE, bilan) pour analyser la conceptualisation dans l'action et la transmission de l'expérience.",
  },
];

const STORAGE_KEY = "pst_bibliography_vault_v1";

export const PstBibliographyVaultModal: React.FC<PstBibliographyVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [customRefs, setCustomRefs] = useState<BiblioReference[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUe, setSelectedUe] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New custom reference fields
  const [newAuthors, setNewAuthors] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newStream, setNewStream] = useState("Clinique de l'activité");
  const [newUe, setNewUe] = useState("106");
  const [newConcept, setNewConcept] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCustomRefs(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveCustomRefs = (next: BiblioReference[]) => {
    setCustomRefs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allReferences = useMemo(() => {
    return [...customRefs, ...CORE_CNAM_REFERENCES];
  }, [customRefs]);

  const filteredReferences = useMemo(() => {
    return allReferences.filter((ref) => {
      const matchesUe = selectedUe === "ALL" || ref.ues.includes(selectedUe);
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesUe;
      const hay = `${ref.authors} ${ref.year} ${ref.title} ${ref.stream} ${ref.keyConcept} ${ref.examUsageTip}`.toLowerCase();
      return matchesUe && hay.includes(q);
    });
  }, [allReferences, selectedUe, searchQuery]);

  if (!isOpen) return null;

  const handleCopy = async (text: string, badgeId: string) => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(text.replace(/\*/g, ""));
      setCopiedId(badgeId);
      playSuccessSound();
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback
    }
  };

  const handleAddCustomRef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthors.trim() || !newYear.trim() || !newTitle.trim()) return;
    playClickSound();
    const cleanAuthors = newAuthors.trim();
    const cleanYear = newYear.trim();
    const cleanTitle = newTitle.trim();
    const cleanPub = newPublisher.trim() || "Éditeur académique";
    const firstSurname = cleanAuthors.split(",")[0].trim();

    const customEntry: BiblioReference = {
      id: `custom-${Date.now()}`,
      authors: cleanAuthors,
      year: cleanYear,
      title: cleanTitle,
      publisherOrJournal: cleanPub,
      apa7Full: `${cleanAuthors} (${cleanYear}). *${cleanTitle}*. ${cleanPub}.`,
      inTextCitation: `(${firstSurname}, ${cleanYear})`,
      stream: newStream,
      ues: [newUe],
      keyConcept: newConcept.trim() || "Concept personnel ajouté au corpus",
      examUsageTip: "Référence personnelle intégrée au coffre bibliographique local.",
      isCustom: true,
    };

    saveCustomRefs([customEntry, ...customRefs]);
    setNewAuthors("");
    setNewYear("");
    setNewTitle("");
    setNewPublisher("");
    setNewConcept("");
    setShowAddForm(false);
    playSuccessSound();
  };

  const handleDeleteCustom = (id: string) => {
    playClickSound();
    saveCustomRefs(customRefs.filter((r) => r.id !== id));
  };

  const handleExportAllApa7 = () => {
    playClickSound();
    const sorted = [...filteredReferences].sort((a, b) =>
      a.apa7Full.localeCompare(b.apa7Full, "fr")
    );
    const lines = [
      "# Bibliographie Académique Norme APA 7e Édition — CNAM Psychologie du Travail",
      "",
      ...sorted.map((r) => `- ${r.apa7Full}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bibliographie_APA7_CNAM_${selectedUe}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-biblio-vault-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                  COFFRE BIBLIOGRAPHIQUE · NORME APA 7e ÉDITION
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {allReferences.length} références canoniques
                </span>
              </div>
              <h2
                id="pst-biblio-vault-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Référentiel des Auteurs Fondamentaux CNAM & Citations Prêtes à Copier
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowAddForm((v) => !v);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Ajouter référence
            </button>

            <button
              type="button"
              onClick={handleExportAllApa7}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Exporter APA 7 (.MD)
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer le coffre bibliographique"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un auteur (Clot, Dejours, Rabardel...), un concept (catachrèse, genre, care)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {["ALL", "106", "108", "120", "123", "124"].map((ue) => (
              <button
                key={ue}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedUe(ue);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedUe === ue
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {ue === "ALL" ? "Toutes UE" : `PST${ue}`}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Reference Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddCustomRef}
            className="px-5 py-4 border-b border-indigo-500/20 bg-indigo-500/5 grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-end"
          >
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Auteur(s) (ex: Schwartz, Y.)
              </label>
              <input
                type="text"
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
                required
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="2000"
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Titre de l'ouvrage / article
              </label>
              <input
                type="text"
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
                value={newConcept}
                onChange={(e) => setNewConcept(e.target.value)}
                placeholder="Corps-soi, dramatique d'usage de soi, renormalisation..."
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}

        {/* References Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 dark:bg-[#070A10]">
          {filteredReferences.map((ref) => {
            const isFullCopied = copiedId === `${ref.id}-full`;
            const isShortCopied = copiedId === `${ref.id}-short`;

            return (
              <div
                key={ref.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {ref.stream}
                      </span>
                      {ref.ues.map((u) => (
                        <span
                          key={u}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          PST{u}
                        </span>
                      ))}
                    </div>

                    {ref.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustom(ref.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Supprimer cette référence personnalisée"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* APA 7 Formatted Box */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/90 font-serif text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed mb-2.5">
                    {ref.apa7Full.split("*").map((chunk, idx) =>
                      idx % 2 === 1 ? (
                        <em key={idx} className="italic font-semibold">
                          {chunk}
                        </em>
                      ) : (
                        <span key={idx}>{chunk}</span>
                      )
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-900 dark:text-white">
                          Concepts clés :
                        </strong>{" "}
                        {ref.keyConcept}
                      </span>
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-800 dark:text-slate-200">
                          Usage examen :
                        </strong>{" "}
                        {ref.examUsageTip}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Copy Actions */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(ref.inTextCitation, `${ref.id}-short`)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {isShortCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Quote className="w-3 h-3 text-slate-400" />
                        {ref.inTextCitation}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(ref.apa7Full, `${ref.id}-full`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
                  >
                    {isFullCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Référence APA 7 copiée
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copier Bibliographie APA 7
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PstBibliographyVaultModal;
