import React, { useState } from 'react';
import { AppState, GameType, Difficulty, GameContent, Language } from './shared/lib/game/types';
import { generateGame } from './shared/lib/ai/geminiClient';
import { Button } from './shared/ui/Button';
import { GamePlayer } from './widgets/GamePlayer';
import { LandingPage } from './widgets/Landing/LandingPage';
import { Logo } from './shared/ui/Branding';

const TEXTS = {
  en: {
    placeholder: `Paste your educational content here.
Example:
"Photosynthesis is a chemical process that converts light energy into chemical energy..."`,
    title: 'Create a New Quest',
    subtitle: 'Paste your content, choose your adventure.',
    step1: '1. Source Material',
    step2: '2. Game Type',
    step3: '3. Difficulty',
    btnGenerate: 'Generate Game',
    generatingTitle: 'Questifying...',
    generatingDesc: 'Gemini is weaving your content into an interactive experience.',
    errorLen: 'Please enter more text (min 50 chars) for AI to work.'
  },
  ru: {
    placeholder: `Вставьте текст учебного материала сюда.
Например:
"Фотосинтез — сложный химический процесс преобразования энергии света в энергию химических связей..."`,
    title: 'Создать Новый Квест',
    subtitle: 'Вставьте контент, выберите жанр приключения.',
    step1: '1. Исходный материал',
    step2: '2. Тип игры',
    step3: '3. Сложность',
    btnGenerate: 'Сгенерировать Игру',
    generatingTitle: 'Квестификация...',
    generatingDesc: 'Gemini превращает ваш текст в интерактивный опыт.',
    errorLen: 'Пожалуйста, введите больше текста (минимум 50 символов).'
  }
};

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [language, setLanguage] = useState<Language>('ru'); // Default to Russian
  const [appState, setAppState] = useState<AppState>(AppState.Upload);
  const [sourceText, setSourceText] = useState('');
  const [selectedType, setSelectedType] = useState<GameType>(GameType.Quiz);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [generatedGame, setGeneratedGame] = useState<GameContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = TEXTS[language];

  const handleGenerate = async () => {
    if (!sourceText || sourceText.length < 50) {
      setError(t.errorLen);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAppState(AppState.Generating);

    try {
      // Pass language to AI service
      const game = await generateGame(sourceText, selectedType, difficulty, language);
      setGeneratedGame(game);
      setAppState(AppState.Playing);
    } catch (e: any) {
      setError(e.message || "Error");
      setAppState(AppState.Config);
    } finally {
      setIsLoading(false);
    }
  };

  // Show Landing Page first
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} language={language} setLanguage={setLanguage} />;
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.Upload:
      case AppState.Config:
        return (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="quest-card rounded-2xl p-8 shadow-2xl">
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-display font-extrabold text-white mb-3 text-glow-blue">
                  {t.title}
                </h1>
                <p className="text-quest-200 text-lg tracking-wide">{t.subtitle}</p>
              </div>

              {/* Step 1: Input */}
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">
                  {t.step1}
                </label>
                <textarea
                  className="w-full h-48 bg-quest-950/50 border border-quest-700/30 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-quest-500/50 focus:border-quest-500/30 transition-all resize-none font-mono text-sm leading-relaxed placeholder:text-slate-600"
                  placeholder={t.placeholder}
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
              </div>

              {/* Step 2: Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="block text-[10px] font-bold text-quest-300 mb-3 uppercase tracking-[0.2em]">{t.step2}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedType(GameType.Quiz)}
                      className={`quest-card p-4 rounded-xl flex flex-col items-center gap-2 transition-all group ${selectedType === GameType.Quiz ? 'bg-quest-500/15 border-quest-500/40 text-white shadow-lg shadow-quest-500/10' : 'text-slate-400 hover:bg-quest-800/30'}`}
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">📝</span>
                      <span className="font-semibold text-sm tracking-wide">Quiz</span>
                    </button>
                    <button
                      onClick={() => setSelectedType(GameType.EscapeRoom)}
                      className={`quest-card p-4 rounded-xl flex flex-col items-center gap-2 transition-all group ${selectedType === GameType.EscapeRoom ? 'bg-quest-500/15 border-quest-500/40 text-white shadow-lg shadow-quest-500/10' : 'text-slate-400 hover:bg-quest-800/30'}`}
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">🗝️</span>
                      <span className="font-semibold text-sm tracking-wide">Escape Room</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-quest-300 mb-3 uppercase tracking-[0.2em]">{t.step3}</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full bg-quest-950/50 border border-quest-700/30 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-quest-500/50 outline-none appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236BA3FF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.65em auto' }}
                  >
                    <option value={Difficulty.Easy}>Easy / Легко</option>
                    <option value={Difficulty.Medium}>Medium / Нормально</option>
                    <option value={Difficulty.Hard}>Hard / Сложно</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                className="w-full text-lg py-4"
                isLoading={isLoading}
              >
                {t.btnGenerate}
              </Button>
            </div>
          </div>
        );

      case AppState.Generating:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative mb-8 spinner-glow">
               <div className="w-24 h-24 border-4 border-quest-500/20 rounded-full"></div>
               <div className="w-24 h-24 border-4 border-quest-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
               <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">✨</div>
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-3 text-glow-blue">{t.generatingTitle}</h2>
            <p className="text-quest-200 max-w-md animate-pulse tracking-wide">
              {t.generatingDesc}
            </p>
          </div>
        );

      case AppState.Playing:
        return <GamePlayer game={generatedGame} onExit={() => setAppState(AppState.Config)} />;

      default:
        return null;
    }
  };

  return (
    <div className="grain min-h-screen bg-quest-950 text-slate-100 selection:bg-quest-500/25 selection:text-white font-sans cyber-grid">
      {/* App Header */}
      <header className="glass-panel border-b border-quest-700/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setAppState(AppState.Config)}>
            <Logo size={28} className="group-hover:drop-shadow-[0_0_10px_rgba(107,163,255,0.5)] transition-all" />
            <span className="font-display font-bold text-xl tracking-tight text-glow-blue">Questify</span>
          </div>

          <div className="flex items-center gap-4">
             {/* Language Switcher Mini */}
             <div className="hidden sm:flex bg-quest-950/80 rounded-lg p-1 border border-quest-700/30 mr-2">
                <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${language === 'en' ? 'bg-quest-500/20 text-quest-300' : 'text-slate-500'}`}>EN</button>
                <button onClick={() => setLanguage('ru')} className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${language === 'ru' ? 'bg-quest-500/20 text-quest-300' : 'text-slate-500'}`}>RU</button>
             </div>

             {process.env.API_KEY ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                  <span className="text-[10px] font-medium text-emerald-400 tracking-wider uppercase">Gemini Pro</span>
                </div>
             ) : (
               <span className="text-[10px] bg-red-900/20 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 font-medium tracking-wider uppercase">
                 API Key Missing
               </span>
             )}
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-quest-400 to-amber-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-quest-950 flex items-center justify-center text-[10px] font-bold tracking-wider">HEX</div>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
