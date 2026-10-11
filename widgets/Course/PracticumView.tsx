import React, { useState } from 'react';
import { Button } from '../../shared/ui/Button';
import { canReview, editAttempt, emptyAttempt, practicums, practicumReport, planPracticum, submitAttempt, PracticumAttempt } from '../../shared/lib/learning/practicums';

export function PracticumView() {
  const [selected, setSelected] = useState<string>(practicums[0].id);
  const [attempts, setAttempts] = useState<Record<string, PracticumAttempt>>({});
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [gap, setGap] = useState('');
  const [focus, setFocus] = useState('');
  const [goals, setGoals] = useState<Record<string, string>>({});
  const [planError, setPlanError] = useState('');
  const [planNotice, setPlanNotice] = useState('');
  const practicum = practicums.find(item => item.id === selected)!;
  const attempt = attempts[selected] || emptyAttempt();
  const setAttempt = (value: PracticumAttempt) => { setAttempts(current => ({ ...current, [selected]: value })); setNotice(''); };
  const report = practicumReport(selected, attempt, goals[selected]);
  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([report], { type: 'text/plain;charset=utf-8' }));
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = `practicum-${selected}.txt`; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice('Файл подготовлен. Проверьте загрузки. В отчёте сохранены ваш ответ и самооценка, а не аттестация.');
    } catch { setError('Файл не удалось подготовить. Скопируйте текст из предпросмотра отчёта ниже.'); }
  };
  return <section aria-labelledby="practicum-title" className="max-w-4xl mx-auto space-y-8">
    <header className="space-y-3">
      <p className="text-sm text-quest-300">Практика без AI-ключа</p>
      <h1 id="practicum-title" className="text-3xl font-bold">От задачи к своему результату</h1>
      <p className="text-slate-300">Два оригинальных практикума: выполните задание, сохраните результат, затем сравните его с критериями и разбором.</p>
      <p className="text-sm text-slate-400">Не стажировка и не сертификат работодателя. Данные только в памяти вкладки до перезагрузки, ничего не отправляется модели. Не вводите реальные контакты, секреты или закрытые материалы.</p>
    </header>
    <section aria-labelledby="gap-title" className="border-t border-quest-700 pt-6 space-y-4">
      <h2 id="gap-title" className="text-xl font-semibold">Из требования в практикум</h2>
      <p className="text-sm text-slate-300">Перенесите один пробел из InterviewForge или вакансии. Выберите навык сами: отсутствие артефакта ещё не означает отсутствие умения. Чужие задания не загружаются.</p>
      <label className="block text-sm">Требование для тренировки<textarea rows={3} maxLength={600} className="mt-2 w-full bg-quest-950 border border-quest-700 rounded-lg p-3 text-white" value={gap} onChange={e => { setGap(e.target.value); setPlanNotice(''); }} placeholder="Например: проверять сохранение данных формы после ошибки" /></label>
      <label className="block text-sm">Какой навык нужно отработать<select className="mt-2 w-full bg-quest-950 border border-quest-700 rounded-lg p-3 text-white" value={focus} onChange={e => { setFocus(e.target.value); setPlanNotice(''); }}>
        <option value="">Выберите направление</option><option value="accessible-form">Формы, доступность и проверка ошибок</option><option value="support-analysis">Расчёты, анализ данных и проверка гипотез</option><option value="other">Другой навык — практикума пока нет</option>
      </select></label>
      {focus === 'other' && <p className="text-sm text-amber-300">Не будем подменять пробел неподходящим заданием. Уточните собственный проект или обсудите упражнение с наставником.</p>}
      <Button onClick={() => { try { const plan = planPracticum(gap, focus); setSelected(plan.id); setGoals(current => ({ ...current, [plan.id]: plan.requirement })); setError(''); setNotice(''); setConfirmReset(false); setPlanError(''); setPlanNotice(`Выбран практикум «${plan.title}» по указанному вами навыку. Задание ниже; прежние ответы сохранены.`); } catch (e) { setPlanError((e as Error).message); setPlanNotice(''); } }}>Подобрать практикум</Button>
      {planError && <p role="alert" className="text-red-300">{planError}</p>}
      {planNotice && <p role="status" className="text-quest-200">{planNotice}</p>}
    </section>
    <label className="block text-sm">Выберите практикум
      <select className="mt-2 w-full bg-quest-950 border border-quest-700 rounded-lg p-3 text-white" value={selected} onChange={event => { setSelected(event.target.value); setError(''); setNotice(''); setPlanNotice(''); setConfirmReset(false); }}>
        {practicums.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
    </label>
    <article className="quest-card p-5 sm:p-8 space-y-6">
      <div><p className="text-sm text-quest-300">{practicum.role} · {practicum.time}</p><h2 className="text-2xl font-bold mt-2">{practicum.title}</h2></div>
      {goals[selected] && <p className="text-quest-200 break-words">Ваша цель: {goals[selected]}</p>}
      <section><h3 className="font-semibold mb-2">1. Рабочая ситуация</h3><p className="text-slate-300">{practicum.situation}</p></section>
      <section><h3 className="font-semibold mb-2">2. Задание</h3><p className="text-slate-300">{practicum.task}</p></section>
      <section><h3 className="font-semibold mb-2">3. Что подготовить</h3><p className="text-slate-300">{practicum.deliverable}</p></section>
      <section><h3 className="font-semibold mb-2">4. Критерии известны заранее</h3><ul className="list-disc pl-5 space-y-2 text-slate-300">{practicum.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul></section>
      <label className="block text-sm font-semibold">Ваш результат и место, где его можно проверить
        <textarea className="block mt-2 w-full rounded-lg border border-quest-700 bg-quest-950 p-3 text-white font-normal" rows={7} maxLength={8000} value={attempt.answer} onChange={event => setAttempt(editAttempt(attempt, event.target.value))} placeholder="Что сделали лично, где лежит артефакт, как проверили результат и что осталось нерешённым. Ссылки не открываются автоматически." />
      </label>
      <p className="text-sm text-slate-400">{attempt.answer.length} / 8000 символов. Минимум 80 для открытия разбора — это не проверка правильности.</p>
      {error && <p role="alert" className="text-red-300">{error}</p>}
      <Button onClick={() => { try { setAttempt(submitAttempt(attempt.answer)); setError(''); setNotice('Ответ зафиксирован. Ниже открыт разбор; качество работы ещё не оценено.'); } catch (e) { setError((e as Error).message); } }}>
        {attempt.submitted ? 'Зафиксировать новую версию' : 'Зафиксировать ответ и открыть разбор'}
      </Button>
      {attempt.submitted && <section className="border-t border-quest-700 pt-6 space-y-4" aria-labelledby="debrief-title">
        <h3 id="debrief-title" className="text-xl font-semibold">5. Разбор и самостоятельная оценка</h3>
        <p className="text-slate-300">{practicum.debrief}</p>
        {!canReview(attempt) && <p role="status" className="text-amber-300">Ответ изменён. Зафиксируйте новую версию перед самооценкой; старые отметки сброшены.</p>}
        {practicum.criteria.map((criterion, index) => <label key={criterion} className="flex gap-3 text-sm text-slate-300">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-blue-400" checked={attempt.checks.includes(index)} disabled={!canReview(attempt)} onChange={event => setAttempt({ ...attempt, checks: event.target.checked ? [...attempt.checks, index] : attempt.checks.filter(value => value !== index) })} />
          <span>Я проверил: {criterion}</span>
        </label>)}
        <p className="text-sm text-slate-400">Отмечено вами: {attempt.checks.length} / {practicum.criteria.length}. Это самооценка, не балл за компетентность. Для независимой оценки передайте отчёт и артефакт наставнику самостоятельно.</p>
        <div><h3 className="font-semibold mb-2">Перенесите навык в собственный проект</h3><p className="text-slate-300">{practicum.transfer}</p></div>
        <p className="text-sm text-slate-300">Затем вернитесь в InterviewForge: укажите собственный артефакт, личный вклад и способ проверки. Практикум не добавляет опыт в резюме и не подтверждает навык автоматически.</p>
      </section>}
    </article>
    <details className="border border-quest-700 rounded-lg p-4"><summary className="cursor-pointer">Предпросмотр отчёта</summary><pre className="whitespace-pre-wrap break-words text-xs leading-6 mt-4 max-h-96 overflow-auto" tabIndex={0}>{report}</pre></details>
    <div className="flex flex-wrap gap-3"><Button onClick={download} disabled={!attempt.answer.trim()}>Скачать свой отчёт .txt</Button><Button variant="outline" onClick={() => setConfirmReset(true)}>Очистить этот практикум</Button></div>
    {confirmReset && <div className="border border-quest-700 p-4 space-y-3"><p>Удалить ответ и отметки только для «{practicum.title}»? Другой практикум останется.</p><div className="flex flex-wrap gap-3"><Button variant="danger" onClick={() => { setAttempt(emptyAttempt()); setError(''); setConfirmReset(false); }}>Удалить ответ</Button><Button variant="outline" onClick={() => setConfirmReset(false)}>Отмена</Button></div></div>}
    {notice && <p role="status" className="text-quest-200">{notice}</p>}
  </section>;
}
