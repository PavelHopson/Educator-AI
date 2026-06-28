import React, { useState } from 'react';
import { Button } from '../../shared/ui/Button';
import { generateCourse } from '../../shared/lib/ai/educatorTools';
import { CourseContent, Language } from '../../shared/lib/game/types';
import { CourseCatalog } from './CourseCatalog';
import { CatalogCourse } from '../../shared/lib/data/courseCatalog';

const LEVELS = ['Новичок', 'Средний', 'Продвинутый'];

interface SavedCourse { ts: number; course: CourseContent }
const HISTORY_KEY = 'educator_courses';

function loadHistory(): SavedCourse[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}
function saveToHistory(course: CourseContent): void {
  const list = loadHistory().filter((x) => x.course.title !== course.title);
  list.unshift({ ts: Date.now(), course });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 5)));
}

function courseToMarkdown(c: CourseContent): string {
  let md = `# ${c.title}\n\n_Уровень: ${c.level}_\n\n${c.summary}\n\n`;
  c.modules.forEach((m, i) => {
    md += `## ${i + 1}. ${m.title}\n\n`;
    m.lessons.forEach((l) => {
      md += `### ${l.heading}\n\n${l.content}\n\n`;
      if (l.example) md += '```\n' + l.example + '\n```\n\n';
    });
    if (m.quiz && m.quiz.length) {
      md += `**Проверь себя:**\n\n`;
      m.quiz.forEach((q) => { md += `- ${q.question}\n  - _Ответ:_ ${q.answer}\n`; });
      md += '\n';
    }
  });
  return md;
}

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

export const CourseView: React.FC<{ language: Language; onMakeQuiz?: (text: string) => void }> = ({ language, onMakeQuiz }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Новичок');
  const [course, setCourse] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<SavedCourse[]>(loadHistory());

  const exportCopy = () => {
    if (!course) return;
    navigator.clipboard?.writeText(courseToMarkdown(course))
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
      .catch(() => {});
  };

  const exportDownload = () => {
    if (!course) return;
    const blob = new Blob([courseToMarkdown(course)], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title.slice(0, 60).replace(/[\\/:*?"<>|]+/g, '').trim() || 'course'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Ядро генерации — переиспользуется ручным вводом и выбором из каталога.
  const generate = async (topicVal: string, levelVal: string) => {
    if (topicVal.trim().length < 3) { setError('Введите тему курса'); return; }
    setTopic(topicVal);
    setLevel(levelVal);
    setError(null);
    setLoading(true);
    setCourse(null);
    try {
      const c = await generateCourse(topicVal.trim(), levelVal, language);
      setCourse(c);
      saveToHistory(c);
      setHistory(loadHistory());
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const run = () => generate(topic, level);
  const pickFromCatalog = (c: CatalogCourse) => generate(c.title, c.level);

  return (
    <div className="max-w-4xl mx-auto">
      {history.length > 0 && !course && (
        <div className="quest-card rounded-2xl p-4 mb-4">
          <div className="text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">Недавние курсы</div>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <button key={i} onClick={() => setCourse(h.course)} className="px-3 py-1.5 rounded-lg text-sm border border-quest-700/30 text-slate-300 hover:bg-quest-800/30 transition-colors">
                {h.course.title}
              </button>
            ))}
          </div>
        </div>
      )}
      {!course && !loading && <CourseCatalog onPick={pickFromCatalog} />}
      <div className="quest-card rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-display font-extrabold text-white mb-2 text-glow-blue">📚 Генератор курсов</h1>
          <p className="text-quest-200">Выберите тему из каталога или впишите свою — ИИ соберёт модули, уроки, примеры и квизы.</p>
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
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={exportCopy} className="px-3 py-1.5 rounded-lg text-sm border border-quest-700/30 text-slate-300 hover:bg-quest-800/30 transition-colors">
                {copied ? '✓ Скопировано' : '📋 Скопировать (.md)'}
              </button>
              <button onClick={exportDownload} className="px-3 py-1.5 rounded-lg text-sm border border-quest-700/30 text-slate-300 hover:bg-quest-800/30 transition-colors">
                ⬇️ Скачать .md
              </button>
              {onMakeQuiz && (
                <button onClick={() => onMakeQuiz(courseToMarkdown(course))} className="px-3 py-1.5 rounded-lg text-sm border border-quest-500/40 bg-quest-500/15 text-quest-100 hover:bg-quest-500/25 transition-colors">
                  🎯 Квиз по курсу
                </button>
              )}
            </div>
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
