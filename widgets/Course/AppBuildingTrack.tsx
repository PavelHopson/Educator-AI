import React, { useMemo, useState } from 'react';
import { Language } from '../../shared/lib/game/types';
import {
  appBuildingProgressPercent,
  nextAppBuildingModule,
  normalizeAppBuildingProgress,
  toggleAppBuildingModule,
  type AppBuildingProgress,
} from '../../shared/lib/learning/appBuildingTrack.mjs';

const STORAGE_KEY = 'educator_app_building_track_v1';

const COPY = {
  ru: {
    eyebrow: 'Практический learning track · около 2 часов',
    title: 'Соберите первое приложение с AI — без иллюзии production-ready',
    intro: 'Три коротких этапа: понять границы AI, составить проверяемую спецификацию и собрать прототип с обязательной QA-проверкой.',
    complete: 'Отметить этап выполненным',
    reopen: 'Вернуть этап в работу',
    done: 'Трек завершён',
    reset: 'Сбросить прогресс',
    resetConfirm: 'Сбросить весь прогресс этого learning track?',
    back: 'Вернуться к курсам',
    local: 'Прогресс хранится только в этом браузере. API-ключ не нужен.',
    source: 'Открыть официальный курс Google',
    safety: 'Не вставляйте API-ключи, клиентские данные и закрытый код. Результат AI Studio — прототип, пока он не прошёл review, tests и security checks.',
  },
  en: {
    eyebrow: 'Practical learning track · about 2 hours',
    title: 'Build your first AI-assisted app without mistaking it for production',
    intro: 'Three bounded stages: understand AI limits, write a testable specification, and build a prototype with a mandatory QA pass.',
    complete: 'Mark stage complete',
    reopen: 'Reopen stage',
    done: 'Track complete',
    reset: 'Reset progress',
    resetConfirm: 'Reset all progress for this learning track?',
    back: 'Back to courses',
    local: 'Progress stays in this browser. No API key is required.',
    source: 'Open the official Google course',
    safety: 'Do not paste API keys, customer data, or private code. An AI Studio result is a prototype until it passes review, tests, and security checks.',
  },
};

const MODULES = {
  ru: [
    {
      time: '5–10 минут',
      title: '1. Понять, где AI помогает, а где ошибается',
      outcome: 'Вы сформулируете одну небольшую проблему и определите, что останется под ручным контролем.',
      actions: ['Запишите пользователя и его одну главную задачу.', 'Отметьте данные, секреты и действия, которые нельзя доверять модели.'],
      proof: 'Готово, если задачу можно объяснить одним предложением без названия технологии.',
    },
    {
      time: '45–55 минут',
      title: '2. Сделать brief до генерации кода',
      outcome: 'Получится проверяемая мини-спецификация: сценарий, входы, выходы, состояния и критерии готовности.',
      actions: ['Опишите основной путь пользователя от первого экрана до результата.', 'Добавьте loading, empty, error, success и запрет опасных действий по умолчанию.'],
      proof: 'Готово, если другой человек понимает, что проверить, не задавая вам вопросов.',
    },
    {
      time: '50–60 минут',
      title: '3. Собрать прототип и провести QA',
      outcome: 'Вы создадите ограниченный прототип в AI Studio и отделите рабочие факты от красивой демонстрации.',
      actions: ['Используйте только публичные или учебные данные.', 'Проверьте mobile, keyboard focus, ошибки, утечки секретов и каждый внешний action.'],
      proof: 'Готово, если найденные ограничения записаны рядом с результатом, а публикация остаётся ручной.',
    },
  ],
  en: [
    {
      time: '5–10 minutes',
      title: '1. Learn where AI helps and where it fails',
      outcome: 'Define one small user problem and what must remain under human control.',
      actions: ['Write down the user and their single main job.', 'Mark data, secrets, and actions the model must never control.'],
      proof: 'Done means the problem fits in one sentence without naming a technology.',
    },
    {
      time: '45–55 minutes',
      title: '2. Write the brief before generating code',
      outcome: 'Create a testable mini-spec: flow, inputs, outputs, states, and acceptance criteria.',
      actions: ['Describe the main path from first screen to result.', 'Add loading, empty, error, success, and safe defaults.'],
      proof: 'Done means another person can test it without asking you questions.',
    },
    {
      time: '50–60 minutes',
      title: '3. Build the prototype and run QA',
      outcome: 'Create a bounded AI Studio prototype and separate verified behavior from presentation.',
      actions: ['Use only public or practice data.', 'Check mobile, keyboard focus, failures, secret leakage, and every external action.'],
      proof: 'Done means limitations are recorded and publishing remains manual.',
    },
  ],
};

function loadProgress(): AppBuildingProgress {
  try {
    return normalizeAppBuildingProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'));
  } catch {
    return normalizeAppBuildingProgress(null);
  }
}

export const AppBuildingTrack: React.FC<{ language: Language; onExit: () => void }> = ({ language, onExit }) => {
  const copy = COPY[language];
  const modules = MODULES[language];
  const [progress, setProgress] = useState<AppBuildingProgress>(loadProgress);
  const [active, setActive] = useState(() => nextAppBuildingModule(progress));
  const percent = appBuildingProgressPercent(progress);
  const complete = progress.completed.length === modules.length;
  const activeModule = modules[active];

  const save = (next: AppBuildingProgress) => {
    setProgress(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleActive = () => {
    const next = toggleAppBuildingModule(progress, active);
    save(next);
    if (!progress.completed.includes(active)) setActive(nextAppBuildingModule(next));
  };

  const reset = () => {
    if (!window.confirm(copy.resetConfirm)) return;
    const next = normalizeAppBuildingProgress(null);
    save(next);
    setActive(0);
  };

  const status = useMemo(
    () => language === 'ru'
      ? progress.completed.length + ' из ' + modules.length + ' этапов'
      : progress.completed.length + ' of ' + modules.length + ' stages',
    [language, modules.length, progress.completed.length],
  );

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <button type="button" onClick={onExit} className="text-sm text-quest-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-300 rounded-lg px-2 py-1">
        ← {copy.back}
      </button>

      <section className="quest-card rounded-2xl p-6 md:p-8" aria-labelledby="app-track-title">
        <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em]">{copy.eyebrow}</div>
        <h1 id="app-track-title" className="text-2xl md:text-3xl font-display font-bold text-white mt-2">{copy.title}</h1>
        <p className="text-slate-300 leading-relaxed mt-3 max-w-3xl">{copy.intro}</p>
        <div className="mt-6" aria-label={status}>
          <div className="flex items-center justify-between text-xs text-quest-200 mb-2">
            <span>{status}</span><span>{percent}%</span>
          </div>
          <div className="h-2 rounded-full bg-quest-950/70 overflow-hidden">
            <div className="h-full bg-emerald-400 transition-[width] motion-reduce:transition-none" style={{ width: String(percent) + '%' }} />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">{copy.local}</p>
      </section>

      <div className="grid gap-3 md:grid-cols-3" aria-label={language === 'ru' ? 'Этапы трека' : 'Track stages'}>
        {modules.map((module, index) => {
          const isDone = progress.completed.includes(index);
          const isActive = active === index;
          return (
            <button
              type="button"
              key={module.title}
              onClick={() => setActive(index)}
              aria-current={isActive ? 'step' : undefined}
              className={'text-left rounded-xl border p-4 min-h-32 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-300 ' + (
                isActive ? 'border-quest-400/70 bg-quest-500/15' : 'border-quest-700/30 bg-quest-950/30 hover:bg-quest-800/25'
              )}
            >
              <div className="text-xs text-quest-300">{module.time}</div>
              <div className="font-semibold text-white mt-2">{module.title}</div>
              <div className={'text-xs mt-3 ' + (isDone ? 'text-emerald-300' : 'text-slate-400')}>
                {isDone ? '✓ ' : ''}{isDone ? (language === 'ru' ? 'Выполнено' : 'Completed') : (language === 'ru' ? 'Открыть этап' : 'Open stage')}
              </div>
            </button>
          );
        })}
      </div>

      <section className="quest-card rounded-2xl p-6 md:p-8" aria-live="polite">
        <div className="text-xs font-semibold text-quest-300">{activeModule.time}</div>
        <h2 className="text-xl font-bold text-white mt-2">{activeModule.title}</h2>
        <p className="text-slate-300 mt-3"><strong className="text-white">{language === 'ru' ? 'Результат:' : 'Outcome:'}</strong> {activeModule.outcome}</p>
        <ol className="mt-5 space-y-3">
          {activeModule.actions.map((action, index) => (
            <li key={action} className="flex gap-3 text-sm text-slate-200">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-quest-500/20 text-quest-100 flex items-center justify-center font-bold">{index + 1}</span>
              <span className="pt-1">{action}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4 text-sm text-emerald-100">{activeModule.proof}</div>
        <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-950/15 p-4 text-sm text-amber-100">{copy.safety}</div>
        <button
          type="button"
          onClick={toggleActive}
          className="mt-6 min-h-12 w-full md:w-auto px-6 rounded-xl bg-quest-500 text-white font-semibold hover:bg-quest-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-quest-950 focus-visible:ring-quest-300"
        >
          {progress.completed.includes(active) ? copy.reopen : (complete ? copy.done : copy.complete)}
        </button>
      </section>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <a href="https://www.coursera.org/learn/google-ai-for-app-building" target="_blank" rel="noreferrer" className="text-sm text-quest-200 hover:text-white underline underline-offset-4">
          {copy.source} ↗
        </a>
        <button type="button" onClick={reset} disabled={progress.completed.length === 0} className="text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">
          {copy.reset}
        </button>
      </div>
    </div>
  );
};