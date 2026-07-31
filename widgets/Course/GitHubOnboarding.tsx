import React, { useMemo, useState } from 'react';
import { Language } from '../../shared/lib/game/types';

const STORAGE_KEY = 'educator_github_onboarding_v1';
const GITHUB_GUIDE_URL = 'https://docs.github.com/en/get-started/using-github/hello-world';
const NEW_REPOSITORY_URL = 'https://github.com/new';

interface Progress {
  completed: number[];
  activeStep: number;
}

interface StepCopy {
  title: string;
  result: string;
  why: string;
  actions: string[];
  check: string;
}

interface Copy {
  eyebrow: string;
  title: string;
  intro: string;
  safety: string;
  progress: string;
  openGitHub: string;
  openGuide: string;
  markDone: string;
  completed: string;
  next: string;
  previous: string;
  restart: string;
  restartConfirm: string;
  finishTitle: string;
  finishBody: string;
  finishAction: string;
  outcome: string;
  whyLabel: string;
  selfCheck: string;
  steps: StepCopy[];
}

const COPY: Record<Language, Copy> = {
  ru: {
    eyebrow: 'Практика без установки',
    title: 'Первый проект на GitHub',
    intro: 'За 10–15 минут вы создадите учебный репозиторий, отдельную ветку и pull request прямо в браузере.',
    safety: 'Не добавляйте в репозиторий пароли, API-ключи, документы клиентов и другие личные данные.',
    progress: 'Прогресс',
    openGitHub: 'Открыть GitHub',
    openGuide: 'Свериться с официальной инструкцией',
    markDone: 'Готово, перейти дальше',
    completed: 'Шаг выполнен',
    next: 'Следующий шаг',
    previous: 'Назад',
    restart: 'Начать заново',
    restartConfirm: 'Сбросить сохранённый прогресс и начать заново?',
    finishTitle: 'Вы прошли полный GitHub Flow',
    finishBody: 'Теперь вы умеете безопасно отделять изменения в ветке, показывать их на проверку и добавлять в основную версию проекта.',
    finishAction: 'Повторить на новом учебном проекте',
    outcome: 'Результат',
    whyLabel: 'Зачем это нужно',
    selfCheck: 'Проверьте себя',
    steps: [
      {
        title: 'Создайте учебный репозиторий',
        result: 'На GitHub появится отдельная папка проекта с файлом README.',
        why: 'Репозиторий хранит файлы проекта и всю историю их изменений.',
        actions: [
          'Нажмите «Открыть GitHub».',
          'Назовите репозиторий github-first-steps.',
          'Выберите Public или Private и включите Add a README file.',
          'Нажмите Create repository.',
        ],
        check: 'Я вижу страницу репозитория и файл README.md.',
      },
      {
        title: 'Создайте рабочую ветку',
        result: 'Изменения будут отделены от основной версии main.',
        why: 'Ветка позволяет экспериментировать, не ломая готовую версию проекта.',
        actions: [
          'Откройте список веток, где сейчас написано main.',
          'Введите имя readme-edits.',
          'Выберите Create branch: readme-edits from main.',
        ],
        check: 'Над файлами выбрана ветка readme-edits.',
      },
      {
        title: 'Измените README и сделайте commit',
        result: 'GitHub сохранит новую версию файла с понятным объяснением.',
        why: 'Commit — это зафиксированная точка истории, которую можно проверить или вернуть.',
        actions: [
          'Откройте README.md и нажмите кнопку редактирования.',
          'Добавьте одну строку о том, чему хотите научиться.',
          'Нажмите Commit changes.',
          'Оставьте сообщение Update learning goal и подтвердите commit.',
        ],
        check: 'В README появилась моя строка, а в истории виден новый commit.',
      },
      {
        title: 'Откройте pull request',
        result: 'GitHub покажет разницу между readme-edits и main перед объединением.',
        why: 'Pull request даёт безопасное место для проверки и обсуждения изменений.',
        actions: [
          'Откройте вкладку Pull requests и нажмите New pull request.',
          'Сравните base: main и compare: readme-edits.',
          'Проверьте, что показана только ваша строка.',
          'Нажмите Create pull request, добавьте понятное название и подтвердите.',
        ],
        check: 'Pull request открыт, и я вижу только ожидаемое изменение.',
      },
      {
        title: 'Проверьте и объедините изменения',
        result: 'Изменение попадёт в main, а учебная ветка больше не понадобится.',
        why: 'Финальная проверка защищает основную версию от случайных изменений.',
        actions: [
          'Ещё раз откройте Files changed и проверьте разницу.',
          'Нажмите Merge pull request, затем Confirm merge.',
          'После успешного merge нажмите Delete branch.',
          'Вернитесь на вкладку Code и убедитесь, что ваша строка есть в main.',
        ],
        check: 'Pull request отмечен как Merged, а строка видна в ветке main.',
      },
    ],
  },
  en: {
    eyebrow: 'No-install practice',
    title: 'Your first GitHub project',
    intro: 'In 10–15 minutes, you will create a practice repository, a separate branch, and a pull request in the browser.',
    safety: 'Never add passwords, API keys, client documents, or other personal data to this repository.',
    progress: 'Progress',
    openGitHub: 'Open GitHub',
    openGuide: 'Check the official guide',
    markDone: 'Done, continue',
    completed: 'Step completed',
    next: 'Next step',
    previous: 'Back',
    restart: 'Start over',
    restartConfirm: 'Clear saved progress and start over?',
    finishTitle: 'You completed the GitHub Flow',
    finishBody: 'You can now isolate work in a branch, review it before merging, and safely update the main version of a project.',
    finishAction: 'Practice with another project',
    outcome: 'Outcome',
    whyLabel: 'Why it matters',
    selfCheck: 'Self-check',
    steps: [
      {
        title: 'Create a practice repository',
        result: 'GitHub will create a project folder with a README file.',
        why: 'A repository stores project files and their complete change history.',
        actions: [
          'Select “Open GitHub”.',
          'Name the repository github-first-steps.',
          'Choose Public or Private and enable Add a README file.',
          'Select Create repository.',
        ],
        check: 'I can see the repository page and README.md.',
      },
      {
        title: 'Create a working branch',
        result: 'Your changes will stay separate from the main version.',
        why: 'A branch lets you experiment without breaking finished work.',
        actions: [
          'Open the branch menu that currently says main.',
          'Enter readme-edits.',
          'Select Create branch: readme-edits from main.',
        ],
        check: 'The branch menu above the files says readme-edits.',
      },
      {
        title: 'Edit README and make a commit',
        result: 'GitHub will save a new file version with a clear explanation.',
        why: 'A commit is a recorded point in history that you can review or restore.',
        actions: [
          'Open README.md and select the edit button.',
          'Add one line about what you want to learn.',
          'Select Commit changes.',
          'Use the message Update learning goal and confirm the commit.',
        ],
        check: 'My line is in README and the new commit appears in the history.',
      },
      {
        title: 'Open a pull request',
        result: 'GitHub will show the difference between readme-edits and main before merging.',
        why: 'A pull request is a safe place to review and discuss a change.',
        actions: [
          'Open Pull requests and select New pull request.',
          'Compare base: main with compare: readme-edits.',
          'Confirm that only your new line is shown.',
          'Select Create pull request, add a clear title, and confirm.',
        ],
        check: 'The pull request is open and shows only the expected change.',
      },
      {
        title: 'Review and merge the change',
        result: 'Your change will reach main and the practice branch can be removed.',
        why: 'A final review protects the main version from accidental changes.',
        actions: [
          'Open Files changed and review the difference once more.',
          'Select Merge pull request, then Confirm merge.',
          'After a successful merge, select Delete branch.',
          'Return to Code and confirm your line is visible on main.',
        ],
        check: 'The pull request says Merged and my line is visible on main.',
      },
    ],
  },
};

function loadProgress(stepCount: number): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<Progress>;
    const completed = Array.isArray(saved.completed)
      ? saved.completed.filter((value) => Number.isInteger(value) && value >= 0 && value < stepCount)
      : [];
    const activeStep = Number.isInteger(saved.activeStep)
      ? Math.min(Math.max(saved.activeStep as number, 0), stepCount - 1)
      : 0;
    return { completed: [...new Set(completed)], activeStep };
  } catch {
    return { completed: [], activeStep: 0 };
  }
}

export const GitHubOnboarding: React.FC<{ language: Language; onExit: () => void }> = ({ language, onExit }) => {
  const copy = COPY[language];
  const [progress, setProgress] = useState<Progress>(() => loadProgress(copy.steps.length));
  const isFinished = progress.completed.length === copy.steps.length;
  const active = copy.steps[progress.activeStep];
  const percent = Math.round((progress.completed.length / copy.steps.length) * 100);
  const activeCompleted = progress.completed.includes(progress.activeStep);

  const save = (next: Progress) => {
    setProgress(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const markDone = () => {
    const completed = [...new Set([...progress.completed, progress.activeStep])].sort((a, b) => a - b);
    save({
      completed,
      activeStep: Math.min(progress.activeStep + 1, copy.steps.length - 1),
    });
  };

  const reset = () => {
    if (!window.confirm(copy.restartConfirm)) return;
    localStorage.removeItem(STORAGE_KEY);
    setProgress({ completed: [], activeStep: 0 });
  };

  const stepLabels = useMemo(
    () => copy.steps.map((step, index) => ({
      ...step,
      index,
      completed: progress.completed.includes(index),
    })),
    [copy.steps, progress.completed],
  );

  return (
    <section className="max-w-5xl mx-auto" aria-labelledby="github-onboarding-title">
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={onExit}
          className="min-h-11 px-3 rounded-lg border border-quest-700/30 text-sm text-slate-300 hover:text-white hover:border-quest-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400"
        >
          {copy.previous}
        </button>
        <a
          href={GITHUB_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-quest-300 hover:text-quest-100 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400 rounded"
        >
          {copy.openGuide}
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.6fr)]">
        <aside className="quest-card rounded-2xl p-5 h-fit" aria-label={copy.progress}>
          <div className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.2em]">{copy.eyebrow}</div>
          <h1 id="github-onboarding-title" className="text-2xl font-display font-bold text-white mt-2">{copy.title}</h1>
          <p className="text-sm text-slate-300 leading-relaxed mt-2">{copy.intro}</p>

          <div className="mt-5" aria-label={`${copy.progress}: ${percent}%`}>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>{copy.progress}</span>
              <span>{progress.completed.length}/{copy.steps.length}</span>
            </div>
            <div className="h-2 rounded-full bg-quest-950/70 overflow-hidden">
              <div className="h-full bg-quest-400 transition-[width] duration-300" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <nav className="mt-5 space-y-2" aria-label={copy.title}>
            {stepLabels.map((step) => (
              <button
                type="button"
                key={step.title}
                onClick={() => save({ ...progress, activeStep: step.index })}
                aria-current={progress.activeStep === step.index ? 'step' : undefined}
                className={`w-full min-h-11 flex items-center gap-3 rounded-xl px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400 ${
                  progress.activeStep === step.index
                    ? 'bg-quest-500/15 border border-quest-500/40 text-white'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-quest-950/40'
                }`}
              >
                <span className={`w-7 h-7 shrink-0 rounded-full grid place-items-center text-xs font-bold border ${
                  step.completed ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' : 'border-quest-700/40'
                }`}>
                  {step.completed ? '✓' : step.index + 1}
                </span>
                <span className="text-sm leading-tight">{step.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          {isFinished ? (
            <div className="quest-card rounded-2xl p-6 md:p-8" role="status">
              <div className="w-12 h-12 rounded-full grid place-items-center bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xl font-bold">✓</div>
              <h2 className="text-2xl font-display font-bold text-white mt-5">{copy.finishTitle}</h2>
              <p className="text-slate-300 leading-relaxed mt-2">{copy.finishBody}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 min-h-12 px-5 rounded-xl bg-quest-500 text-white font-semibold hover:bg-quest-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-quest-950 focus-visible:ring-quest-300"
              >
                {copy.finishAction}
              </button>
            </div>
          ) : (
            <>
              <article className="quest-card rounded-2xl p-6 md:p-8">
                <div className="text-xs font-bold text-quest-300 uppercase tracking-[0.18em]">
                  {progress.activeStep + 1} / {copy.steps.length}
                </div>
                <h2 className="text-2xl font-display font-bold text-white mt-2">{active.title}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-quest-700/30 bg-quest-950/35 p-4">
                    <div className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.18em]">{copy.outcome}</div>
                    <p className="text-sm text-slate-200 mt-2 leading-relaxed">{active.result}</p>
                  </div>
                  <div className="rounded-xl border border-quest-700/30 bg-quest-950/35 p-4">
                    <div className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.18em]">{copy.whyLabel}</div>
                    <p className="text-sm text-slate-200 mt-2 leading-relaxed">{active.why}</p>
                  </div>
                </div>

                <ol className="mt-6 space-y-3">
                  {active.actions.map((action, index) => (
                    <li key={action} className="flex gap-3 text-slate-200 leading-relaxed">
                      <span className="w-6 h-6 mt-0.5 shrink-0 rounded-full bg-quest-500/15 text-quest-200 grid place-items-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.18em]">{copy.selfCheck}</div>
                  <p className="text-sm text-emerald-100 mt-2">{active.check}</p>
                </div>

                {progress.activeStep === 0 && (
                  <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-950/20 p-4 text-sm text-amber-100 leading-relaxed">
                    {copy.safety}
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={progress.activeStep === 0 ? NEW_REPOSITORY_URL : GITHUB_GUIDE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-12 px-5 rounded-xl bg-quest-500 text-white font-semibold inline-flex items-center justify-center hover:bg-quest-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-quest-950 focus-visible:ring-quest-300"
                  >
                    {progress.activeStep === 0 ? copy.openGitHub : copy.openGuide}
                  </a>
                  <button
                    type="button"
                    onClick={markDone}
                    disabled={activeCompleted}
                    className="min-h-12 px-5 rounded-xl border border-quest-500/40 text-quest-100 font-semibold hover:bg-quest-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {activeCompleted ? copy.completed : copy.markDone}
                  </button>
                </div>
              </article>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => save({ ...progress, activeStep: Math.max(0, progress.activeStep - 1) })}
                  disabled={progress.activeStep === 0}
                  className="min-h-11 px-3 text-sm text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400 rounded-lg"
                >
                  {copy.previous}
                </button>
                <button
                  type="button"
                  onClick={() => save({ ...progress, activeStep: Math.min(copy.steps.length - 1, progress.activeStep + 1) })}
                  disabled={progress.activeStep === copy.steps.length - 1}
                  className="min-h-11 px-3 text-sm text-quest-300 hover:text-quest-100 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400 rounded-lg"
                >
                  {copy.next}
                </button>
              </div>
            </>
          )}

          {progress.completed.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-slate-500 hover:text-red-300 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-400 rounded"
            >
              {copy.restart}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
