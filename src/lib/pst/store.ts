/**
 * Moteur de persistance et gestionnaire d'état pour les révisions PST.
 * Gère le stockage local (localStorage), les scores, l'historique d'examens
 * et implémente l'algorithme de répétition espacée SuperMemo SM-2.
 */

export interface SM2State {
  interval: number; // en jours
  repetitions: number; // nombre de succès consécutifs
  easeFactor: number; // facteur de facilité (EF)
  dueDate: string; // date de prochaine révision (ISO-8601)
}

export interface ScoreRecord {
  score: number;
  total: number;
  pct: number;
}

export interface ScoreHistoryEntry {
  pct: number;
  date: string; // ISO-8601
}

export interface ExamRecord {
  score: number;
  total: number;
  date: string; // ISO ou format d'affichage
  time?: string;
  type?: string;
}

export interface WrongAnswer {
  id: string;
  type: string;
  question: string;
  correctAnswer: string;
  userSelection?: string;
  explanation: string;
  timestamp: string;
}

export interface FeynmanAttempt {
  conceptId: string;
  conceptTitle: string;
  userText: string;
  score: number;
  missingKeywords: string[];
  foundKeywords: string[];
  timestamp: string;
}

export interface PstData {
  marks: Record<string, unknown>;
  scores: Record<string, ScoreRecord>;
  scoreHistory?: Record<string, ScoreHistoryEntry[]>;
  exams: ExamRecord[];
  sessions: string[];
  sm2: Record<string, SM2State>;
  debats?: unknown[];
  badges?: string[];
  wrongAnswers?: WrongAnswer[];
  feynmanHistory?: FeynmanAttempt[];
}

export class PstStore {
  public readonly key: string;
  private data: PstData;

  constructor(moduleKey: string) {
    this.key = moduleKey;
    this.data = {
      marks: {},
      scores: {},
      scoreHistory: {},
      exams: [],
      sessions: [],
      sm2: {},
      debats: [],
      badges: [],
      wrongAnswers: [],
      feynmanHistory: [],
    };

    this.load();
  }

  private load() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.data = {
          marks: parsed.marks || {},
          scores: parsed.scores || {},
          scoreHistory: parsed.scoreHistory || {},
          exams: parsed.exams || [],
          sessions: parsed.sessions || [],
          sm2: parsed.sm2 || {},
          debats: parsed.debats || [],
          badges: parsed.badges || [],
          wrongAnswers: parsed.wrongAnswers || [],
          feynmanHistory: parsed.feynmanHistory || [],
        };
      }
    } catch (e) {
      console.error(`Failed to load data for key ${this.key}:`, e);
    }
  }

  private save() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    } catch (e) {
      console.error(`Failed to save data for key ${this.key}:`, e);
    }
  }

  // --- Flashcards / Fiches classiques ---

  public getMarks(): Record<string, unknown> {
    return this.data.marks;
  }

  public setMark(id: string | number, value: unknown) {
    const idStr = String(id);
    this.data.marks[idStr] = value;

    // Si c'est une métadonnée Leitner (ex: box_X), on ne met pas à jour le SM-2 directement
    if (idStr.startsWith("box_")) {
      this.save();
      return;
    }

    // Initialisation ou synchronisation SM-2
    if (!this.data.sm2[idStr]) {
      this.data.sm2[idStr] = this.getDefaultSM2State();
    }

    // Détermination de la note de qualité SM-2 à partir de la valeur reçue (vrai/faux ou ok/mid/ko)
    let q = 0;
    if (value === true || value === "ok") {
      q = 5;
    } else if (value === "mid") {
      q = 3;
    } else if (value === false || value === "ko") {
      q = 0;
    } else if (typeof value === "number") {
      q = value;
    }

    this.updateSM2Card(idStr, q);
    this.save();
  }

  public clearMarks() {
    this.data.marks = {};
    this.data.sm2 = {};
    this.save();
  }

  // --- Scores ---

  public recordScore(mode: string, score: number, total: number) {
    const pct = Math.round((100 * score) / total);
    const existing = this.data.scores[mode];
    if (!existing || pct > existing.pct) {
      this.data.scores[mode] = { score, total, pct };
    }
    // Historique complet (pas seulement le meilleur) pour suivre la progression
    if (!this.data.scoreHistory) this.data.scoreHistory = {};
    const hist = this.data.scoreHistory[mode] || [];
    hist.push({ pct, date: new Date().toISOString() });
    this.data.scoreHistory[mode] = hist.slice(-50);
    this.save();
  }

  public getScoreHistory(mode: string): ScoreHistoryEntry[] {
    return this.data.scoreHistory?.[mode] || [];
  }

  public getScore(mode: string): ScoreRecord | null {
    return this.data.scores[mode] || null;
  }

  public getScores(): Record<string, ScoreRecord> {
    return this.data.scores;
  }

  // --- Examens ---

  public addExam(record: ExamRecord) {
    this.data.exams.unshift(record);
    if (this.data.exams.length > 50) {
      this.data.exams = this.data.exams.slice(0, 50);
    }
    this.save();
  }

  public getExams(): ExamRecord[] {
    return this.data.exams;
  }

  public clearExams() {
    this.data.exams = [];
    this.save();
  }

  // --- Sessions d'apprentissage ---

  public recordSession() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.data.sessions[this.data.sessions.length - 1] !== today) {
      this.data.sessions.push(today);
      if (this.data.sessions.length > 365) {
        this.data.sessions = this.data.sessions.slice(-365);
      }
      this.save();
    }
  }

  public getSessions(): string[] {
    return this.data.sessions;
  }

  public getStreak(): number {
    const days = this.data.sessions;
    if (!days || !days.length) return 0;
    const MS = 86400000;
    const today = new Date().toISOString().slice(0, 10);
    const last = days[days.length - 1];
    if (!last) return 0;
    const lastT = new Date(last).getTime();
    const todayT = new Date(today).getTime();
    if (todayT - lastT > MS) return 0; // streak brisée

    let count = 0;
    let prevT = todayT + MS;
    for (let i = days.length - 1; i >= 0; i--) {
      const dayStr = days[i];
      if (!dayStr) break;
      const d1 = new Date(dayStr).getTime();
      const diff = prevT - d1;
      if (diff === MS || diff === 0) {
        if (diff === MS) count++;
        prevT = d1;
      } else {
        break;
      }
    }
    return count;
  }

  // --- Algorithme de Répétition Espacée SuperMemo SM-2 ---

  private getDefaultSM2State(): SM2State {
    return {
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
    };
  }

  public getSM2State(id: string): SM2State {
    return this.data.sm2[id] || this.getDefaultSM2State();
  }

  /**
   * Met à jour l'état SM-2 d'une carte selon le retour utilisateur (évaluation q entre 0 et 5)
   * q = 0: Oubli complet
   * q = 1: Réponse incorrecte avec vague souvenir
   * q = 2: Réponse incorrecte mais facile à se rappeler une fois la solution vue
   * q = 3: Réponse correcte avec effort de rappel difficile
   * q = 4: Réponse correcte après réflexion moyenne
   * q = 5: Rappel parfait et immédiat
   */
  public updateSM2Card(id: string, q: number) {
    let state = this.data.sm2[id];
    if (!state) {
      state = this.getDefaultSM2State();
    }

    // Validation de la note q (doit être entre 0 et 5)
    q = Math.max(0, Math.min(5, Math.round(q)));

    if (q >= 3) {
      // Rappel correct
      if (state.repetitions === 0) {
        state.interval = 1;
      } else if (state.repetitions === 1) {
        state.interval = 6;
      } else {
        state.interval = Math.round(state.interval * state.easeFactor);
      }
      state.repetitions += 1;
    } else {
      // Rappel incorrect / oubli
      state.repetitions = 0;
      state.interval = 1;
      state.easeFactor = Math.max(1.3, state.easeFactor - 0.2); // pénalité sur erreur
    }

    // Calcul du nouveau facteur de facilité (Ease Factor) pour q >= 3
    if (q >= 3) {
      // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      state.easeFactor =
        state.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
      if (state.easeFactor < 1.3) {
        state.easeFactor = 1.3;
      }
    }

    // Calcul de la date d'échéance (due date)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + state.interval);
    state.dueDate = dueDate.toISOString();

    // Enregistrement dans le dictionnaire
    this.data.sm2[id] = state;

    // Synchronisation avec marks classique (true si q >= 3, sinon false)
    // On conserve les chaînes de caractères spécifiques 'ok', 'mid', 'ko' de l'application
    const currentMark = this.data.marks[id];
    if (currentMark === "ok" || currentMark === "mid" || currentMark === "ko") {
      if (q >= 3 && currentMark === "ko") {
        this.data.marks[id] = "ok";
      } else if (q < 3 && (currentMark === "ok" || currentMark === "mid")) {
        this.data.marks[id] = "ko";
      }
    } else {
      this.data.marks[id] = q >= 3;
    }

    this.save();
  }

  /**
   * Retourne la liste des cartes dues aujourd'hui parmi un sous-ensemble d'IDs.
   */
  public getDueCardIds(cardIds: string[]): string[] {
    const now = new Date();
    return cardIds.filter((id) => {
      const state = this.data.sm2[id];
      if (!state) return true; // Les nouvelles cartes sont toujours dues
      return new Date(state.dueDate) <= now;
    });
  }

  // --- Backwards Compatibility Helpers for Legacy Modules ---

  public getBox(id: string | number): number {
    const val = this.data.marks["box_" + id];
    return typeof val === "number" ? val : 1;
  }

  public getBoxes(): Record<string, number> {
    const boxes: Record<string, number> = {};
    for (const key of Object.keys(this.data.marks)) {
      if (key.startsWith("box_")) {
        const id = key.substring(4);
        const val = this.data.marks[key];
        boxes[id] = typeof val === "number" ? val : 1;
      }
    }
    return boxes;
  }

  public markCard(id: string | number, result: "ok" | "mid" | "ko") {
    const cur = this.getBox(id);
    let next = cur;
    if (result === "ok") next = Math.min(5, cur + 1);
    else if (result === "ko") next = 1;
    this.setMark("box_" + id, next);

    if (result === "ok") this.setMark(id, "ok");
    else if (result === "ko") this.setMark(id, "ko");
    else if (result === "mid") this.setMark(id, "mid");
  }

  public resetBoxes() {
    for (const key of Object.keys(this.data.marks)) {
      if (key.startsWith("box_")) {
        delete this.data.marks[key];
      } else if (
        this.data.marks[key] === "ok" ||
        this.data.marks[key] === "mid" ||
        this.data.marks[key] === "ko"
      ) {
        delete this.data.marks[key];
      }
    }
    this.save();
  }

  public getDebats(): unknown[] {
    return this.data.debats || [];
  }

  public setDebat(i: number, v: unknown) {
    if (!this.data.debats) this.data.debats = [];
    this.data.debats[i] = v;
    this.save();
  }

  // --- Réinitialisation globale ---

  public resetAll() {
    this.data = {
      marks: {},
      scores: {},
      scoreHistory: {},
      exams: [],
      sessions: [],
      sm2: {},
      debats: [],
      badges: [],
      wrongAnswers: [],
      feynmanHistory: [],
    };
    this.save();
  }

  public getBadges(): string[] {
    if (!this.data.badges) this.data.badges = [];
    return this.data.badges;
  }

  public unlockBadge(id: string): boolean {
    if (!this.data.badges) this.data.badges = [];
    if (this.data.badges.includes(id)) return false;
    this.data.badges.push(id);
    this.save();
    return true;
  }

  // --- Carnet d'Erreurs ---

  public getErrors(): WrongAnswer[] {
    if (!this.data.wrongAnswers) this.data.wrongAnswers = [];
    return this.data.wrongAnswers;
  }

  public logError(
    type: string,
    id: string,
    question: string,
    explanation: string,
    correctAnswer: string,
    userSelection?: string,
  ) {
    if (!this.data.wrongAnswers) this.data.wrongAnswers = [];
    // Éviter les doublons pour le même ID de question
    this.data.wrongAnswers = this.data.wrongAnswers.filter(
      (err) => err.id !== id,
    );
    this.data.wrongAnswers.push({
      id,
      type,
      question,
      correctAnswer,
      ...(userSelection !== undefined ? { userSelection } : {}),
      explanation,
      timestamp: new Date().toISOString(),
    });
    this.save();
  }

  public removeError(id: string) {
    if (!this.data.wrongAnswers) this.data.wrongAnswers = [];
    this.data.wrongAnswers = this.data.wrongAnswers.filter(
      (err) => err.id !== id,
    );
    this.save();
  }

  public clearErrors() {
    this.data.wrongAnswers = [];
    this.save();
  }

  // --- Feynman Sandbox ---

  public getFeynmanHistory(): FeynmanAttempt[] {
    if (!this.data.feynmanHistory) this.data.feynmanHistory = [];
    return this.data.feynmanHistory;
  }

  public saveFeynmanAttempt(
    conceptId: string,
    conceptTitle: string,
    userText: string,
    score: number,
    missingKeywords: string[],
    foundKeywords: string[],
  ) {
    if (!this.data.feynmanHistory) this.data.feynmanHistory = [];
    this.data.feynmanHistory.push({
      conceptId,
      conceptTitle,
      userText,
      score,
      missingKeywords,
      foundKeywords,
      timestamp: new Date().toISOString(),
    });
    this.save();
  }

  public exportData(): string {
    return JSON.stringify(this.data);
  }

  public importData(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      this.data = {
        marks: parsed.marks || {},
        scores: parsed.scores || {},
        scoreHistory: parsed.scoreHistory || {},
        exams: parsed.exams || [],
        sessions: parsed.sessions || [],
        sm2: parsed.sm2 || {},
        debats: parsed.debats || [],
        badges: parsed.badges || [],
        wrongAnswers: parsed.wrongAnswers || [],
        feynmanHistory: parsed.feynmanHistory || [],
      };
      this.save();
      return true;
    } catch (e) {
      console.error("Failed to import data:", e);
      return false;
    }
  }
}
