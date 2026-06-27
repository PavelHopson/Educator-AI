import React, { useRef, useState } from 'react';
import { Button } from '../../shared/ui/Button';
import { tutorReply } from '../../shared/lib/ai/educatorTools';
import { Language, TutorMessage, TutorScenario } from '../../shared/lib/game/types';

const SCENARIOS: { key: TutorScenario; label: string; icon: string; hint: string }[] = [
  { key: 'conversation', label: 'Разговор', icon: '💬', hint: 'Живой диалог с «носителем» + мягкие правки' },
  { key: 'lesson', label: 'Мини-урок', icon: '📘', hint: 'Тема → теория, упражнения, мини-тест' },
  { key: 'flashcards', label: 'Карточки', icon: '🃏', hint: 'Список слов → карточки с мнемоникой' },
  { key: 'errors', label: 'Разбор ошибок', icon: '🛠️', hint: 'Ваш текст → ошибки и правила' },
  { key: 'exam', label: 'Экзамен', icon: '📝', hint: '10 заданий → ответы → балл' },
  { key: 'immersion', label: 'Погружение', icon: '🌊', hint: 'Перевод текста + вопросы' },
  { key: 'free', label: 'Свободно', icon: '✨', hint: 'Просто практика' },
];

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const TutorView: React.FC<{ language: Language }> = ({ language }) => {
  const [targetLanguage, setTargetLanguage] = useState('Английский');
  const [level, setLevel] = useState('A2');
  const [scenario, setScenario] = useState<TutorScenario>('conversation');
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const next: TutorMessage[] = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await tutorReply(next, { targetLanguage, level, scenario, uiLanguage: language });
      setMessages((m) => [...m, { role: 'model', text: reply }]);
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 50);
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const activeHint = SCENARIOS.find((s) => s.key === scenario)?.hint;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="quest-card rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-display font-extrabold text-white mb-2 text-glow-blue">🗣️ Языковой репетитор</h1>
          <p className="text-quest-200">Любой язык, 6 режимов. Сохраняйте диалог и занимайтесь каждый день.</p>
        </div>

        {/* Конфиг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">Язык</label>
            <input
              className="w-full bg-quest-950/50 border border-quest-700/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-quest-500/50 outline-none"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              placeholder="Английский / 日本語 / Español…"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">Уровень</label>
            <select
              className="w-full bg-quest-950/50 border border-quest-700/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-quest-500/50 outline-none"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Сценарии */}
        <div className="flex flex-wrap gap-2 mb-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors border ${scenario === s.key ? 'bg-quest-500/15 border-quest-500/40 text-white' : 'border-quest-700/30 text-slate-400 hover:bg-quest-800/30'}`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        {activeHint && <p className="text-xs text-quest-300 mb-4">{activeHint}</p>}

        {/* Диалог */}
        <div ref={scrollRef} className="h-[42vh] overflow-y-auto bg-quest-950/40 border border-quest-700/20 rounded-xl p-4 mb-4 space-y-3">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center text-slate-500 text-sm px-6">
              Выберите режим, язык и уровень — и напишите первое сообщение (например, тему для разговора или текст для разбора).
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'bg-quest-500/20 text-white border border-quest-500/30' : 'bg-quest-800/40 text-slate-200 border border-quest-700/30'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-quest-300 text-sm animate-pulse">Репетитор печатает…</div>}
        </div>

        {error && <div className="mb-3 p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-sm">{error}</div>}

        <div className="flex gap-3 items-end">
          <textarea
            className="flex-1 h-20 bg-quest-950/50 border border-quest-700/30 rounded-xl p-3 text-slate-200 focus:ring-2 focus:ring-quest-500/50 outline-none resize-none text-sm"
            placeholder="Ваше сообщение…  (Ctrl+Enter — отправить)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); }}
          />
          <Button onClick={send} isLoading={loading} className="px-6 py-3">Отправить</Button>
        </div>
      </div>
    </div>
  );
};
