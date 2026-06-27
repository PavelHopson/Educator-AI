import React, { useState } from 'react';
import { Button } from '../../shared/ui/Button';
import { generateCourse } from '../../shared/lib/ai/educatorTools';
import { CourseContent, Language } from '../../shared/lib/game/types';

const LEVELS = ['Новичок', 'Средний', 'Продвинутый'];

const QuizItem: React.FC<{ q: { question: string; answer: string } }> = ({ q }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)} className="w-full text-left bg-quest-950/40 border border-quest-700/20 rounded-lg p-3 hover:border-quest-500/30 transition-colors">
      <div className="text-sm text-slate-200 font-medium">❓ {q.question}</div>
      {open && <div className="text-sm text-emerald-300 mt-2">✅ {q.answer}</div>}
      {!open && <div className="text-[11px] text-quest-300 mt-1 uppercase tracking-wider">показать ответ</div>}
    </button>
  );
};

export const CourseView: React.FC<{ language: Language }> = ({ language }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Новичок');
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (topic.trim().length < 3) { setError('Введите тему курса'); return; }
    setError(null);
    setLoading(true);
    setCourse(null);
    try {
      setCourse(await generateCourse(topic.trim(), level, language));
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="quest-card rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-display font-extrabold text-white mb-2 text-glow-blue">📚 Генератор курсов</h1>
          <p className="text-quest-200">Тема → готовая учебная программа: модули, уроки, примеры, квизы.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">Тема</label>
            <input
              className="w-full bg-quest-950/50 border border-quest-700/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-quest-500/50 outline-none"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
              placeholder="Напр. «Основы React» / «Подготовка к собеседованию по SQL»"
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

        {error && <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-sm">{error}</div>}
        <Button onClick={run} isLoading={loading} className="w-full py-3">Собрать курс</Button>
      </div>

      {course && (
        <div className="space-y-5">
          <div className="quest-card rounded-2xl p-6">
            <h2 className="text-2xl font-display font-bold text-white text-glow-blue">{course.title}</h2>
            <div className="text-xs text-quest-300 uppercase tracking-wider mt-1">Уровень: {course.level}</div>
            <p className="text-slate-300 mt-3 leading-relaxed">{course.summary}</p>
          </div>

          {course.modules.map((mod, mi) => (
            <div key={mi} className="quest-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-quest-500/20 border border-quest-500/30 flex items-center justify-center text-sm">{mi + 1}</span>
                {mod.title}
              </h3>
              <div className="space-y-4">
                {mod.lessons.map((les, li) => (
                  <div key={li} className="border-l-2 border-quest-500/40 pl-4">
                    <div className="font-semibold text-quest-100">{les.heading}</div>
                    <p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap leading-relaxed">{les.content}</p>
                    {les.example && (
                      <pre className="mt-2 bg-quest-950/60 border border-quest-700/20 rounded-lg p-3 text-xs text-emerald-200 whitespace-pre-wrap overflow-x-auto">{les.example}</pre>
                    )}
                  </div>
                ))}
              </div>
              {mod.quiz && mod.quiz.length > 0 && (
                <div className="mt-5">
                  <div className="text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">Проверь себя</div>
                  <div className="space-y-2">
                    {mod.quiz.map((q, qi) => <QuizItem key={qi} q={q} />)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
