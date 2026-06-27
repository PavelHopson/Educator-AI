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

// #region Educator tools (Языковой репетитор + Генератор курсов)
export type Tool = 'games' | 'tutor' | 'course';

export interface TutorMessage {
  role: 'user' | 'model';
  text: string;
}

// Сценарии репетитора = 6 курированных промптов (Eclipse Library).
export type TutorScenario =
  | 'conversation' | 'lesson' | 'flashcards' | 'errors' | 'exam' | 'immersion' | 'free';

export interface CourseLesson {
  heading: string;
  content: string;
  example?: string;
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
  quiz?: { question: string; answer: string }[];
}

export interface CourseContent {
  title: string;
  summary: string;
  level: string;
  modules: CourseModule[];
}
// #endregion