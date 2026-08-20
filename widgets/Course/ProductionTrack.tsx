import React, { useMemo, useState } from 'react';
import { Language } from '../../shared/lib/game/types';
import { FIRST_PARTY_TEMPLATES, PRODUCTION_TRACK_MODULES, completeProductionModule, normalizeProductionProgress, type ProductionTrackProgress } from '../../shared/lib/learning/productionTrack.v2.mjs';

const STORAGE_KEY = 'educator_production_track_v2';
const load = (): ProductionTrackProgress => { try { return normalizeProductionProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); } catch { return normalizeProductionProgress(null); } };

export const ProductionTrack: React.FC<{ language: Language; onExit: () => void }> = ({ language, onExit }) => {
  const [progress, setProgress] = useState<ProductionTrackProgress>(load);
  const [active, setActive] = useState(0);
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const module = PRODUCTION_TRACK_MODULES[active];
  const complete = progress.completed.includes(module.id);
  const canComplete = module.evidence.every((key) => (evidence[key] || '').trim().length >= 3);
  const percent = Math.round(progress.completed.length / PRODUCTION_TRACK_MODULES.length * 100);
  const templateKey = ['brief', 'brief', 'harness', 'skillReview', 'release'][active];
  const template = FIRST_PARTY_TEMPLATES[templateKey];

  const status = useMemo(() => language === 'ru' ? `${progress.completed.length} из ${PRODUCTION_TRACK_MODULES.length} этапов` : `${progress.completed.length} of ${PRODUCTION_TRACK_MODULES.length} stages`, [language, progress.completed.length]);
  const finish = () => {
    try {
      const next = completeProductionModule(progress, module.id, evidence); setProgress(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setMessage(language === 'ru' ? 'Evidence сохранён локально. Этап завершён.' : 'Evidence saved locally. Stage completed.');
      const nextIndex = PRODUCTION_TRACK_MODULES.findIndex((item) => !next.completed.includes(item.id));
      if (nextIndex >= 0) { setActive(nextIndex); setEvidence({}); }
    } catch (caught) { setMessage(caught instanceof Error ? caught.message : 'Unable to complete stage.'); }
  };

  return <div className="max-w-5xl mx-auto space-y-5">
    <button type="button" onClick={onExit} className="ef-keyboard-focus rounded-lg px-2 py-1 text-sm text-quest-200 hover:text-white">← {language === 'ru' ? 'К курсам' : 'Back to courses'}</button>
    <section className="quest-card rounded-2xl p-6 md:p-8" aria-labelledby="production-track-title">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">Eclipse Forge · first-party track</div>
      <h1 id="production-track-title" className="mt-2 text-2xl font-display font-bold text-white md:text-3xl">Vibe Coding → Spec Kit → Harness Engineering → Safe Skills → Production</h1>
      <p className="mt-3 max-w-3xl text-slate-300">{language === 'ru' ? 'Пять этапов ведут от идеи к проверенному проекту. Этап завершается только после конкретного evidence, а не простого клика.' : 'Five stages lead from an idea to a verified project. Completion requires concrete evidence, not a click-through.'}</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-quest-950/70"><div className="h-full bg-emerald-400 transition-[width] motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div>
      <p className="mt-2 text-xs text-slate-400">{status} · {language === 'ru' ? 'данные остаются в браузере' : 'data stays in this browser'}</p>
    </section>
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5" aria-label="Production track stages">{PRODUCTION_TRACK_MODULES.map((item, index) => <button type="button" key={item.id} onClick={() => { setActive(index); setEvidence({}); setMessage(''); }} aria-current={active === index ? 'step' : undefined} className={`ef-keyboard-focus min-h-24 rounded-xl border p-3 text-left ${active === index ? 'border-quest-400 bg-quest-500/15' : 'border-quest-700/30 bg-quest-950/30'}`}><span className="text-xs text-quest-300">0{index + 1}</span><strong className="mt-2 block text-sm text-white">{item.title}</strong><span className={progress.completed.includes(item.id) ? 'mt-2 block text-xs text-emerald-300' : 'mt-2 block text-xs text-slate-400'}>{progress.completed.includes(item.id) ? 'Completed' : 'Open'}</span></button>)}</div>
    <section className="quest-card rounded-2xl p-6 md:p-8" aria-live="polite">
      <h2 className="text-xl font-bold text-white">{module.title}</h2>
      <div className="mt-4 rounded-xl border border-quest-700/30 bg-quest-950/30 p-4"><strong className="text-sm text-quest-200">First-party template</strong><ul className="mt-2 grid gap-1 text-sm text-slate-300 sm:grid-cols-2">{template.map((item) => <li key={item}>— {item}</li>)}</ul></div>
      <div className="mt-5 grid gap-4">{module.evidence.map((key) => <label key={key} className="block text-sm text-slate-200">{key}<textarea value={evidence[key] || ''} disabled={complete} onChange={(event) => { setEvidence((value) => ({ ...value, [key]: event.target.value })); setMessage(''); }} rows={2} className="ef-keyboard-focus mt-2 w-full resize-y rounded-xl border border-quest-700/30 bg-quest-950/50 px-4 py-3 text-white disabled:opacity-50" placeholder={language === 'ru' ? 'Запишите проверяемый результат…' : 'Record verifiable evidence…'} /></label>)}</div>
      <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-950/15 p-4 text-sm text-amber-100">{language === 'ru' ? 'Не вставляйте API-ключи, клиентские данные, закрытый код или чужие prompts. External actions остаются под ручным approval.' : 'Do not paste API keys, customer data, private code, or third-party prompts. External actions stay behind manual approval.'}</div>
      <button type="button" onClick={finish} disabled={!canComplete || complete} className="ef-keyboard-focus mt-5 min-h-12 w-full rounded-xl bg-quest-500 px-6 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 md:w-auto">{complete ? (language === 'ru' ? 'Этап завершён' : 'Stage completed') : (language === 'ru' ? 'Сохранить evidence и завершить' : 'Save evidence and complete')}</button>
      <p className="mt-3 text-sm text-slate-400" role={message.includes('Unable') ? 'alert' : 'status'}>{message || (!canComplete && !complete ? (language === 'ru' ? 'Заполните все evidence-поля.' : 'Complete every evidence field.') : '')}</p>
    </section>
  </div>;
};
