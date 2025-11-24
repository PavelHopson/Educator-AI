// #region Enums
export enum GameType {
  Quiz = 'QUIZ',
  EscapeRoom = 'ESCAPE_ROOM',
  Simulation = 'SIMULATION'
}

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export enum AppState {
  Upload = 'UPLOAD',
  Config = 'CONFIG',
  Generating = 'GENERATING',
  Playing = 'PLAYING',
  Results = 'RESULTS'
}

export type Language = 'ru' | 'en';
// #endregion

// #region Game Data Structures
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
}

export interface EscapeRoomScene {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; 
  choices: {
    text: string;
    nextSceneId: string;
    requiredItem?: string;
  }[];
  itemFound?: string;
}

// Unified Game Content Interface
export interface GameContent {
  title: string;
  description: string;
  type: GameType;
  quizData?: QuizQuestion[];
  escapeRoomData?: {
    startSceneId: string;
    scenes: EscapeRoomScene[];
  };
}
// #endregion

export interface GenerationConfig {
  sourceText: string;
  gameType: GameType;
  difficulty: Difficulty;
  language: string;
}