import React, { useRef, useState } from 'react';
import { deckToLessonMarkdown, parseApprovedDeckJob, type ImportedDeckJob } from '../../shared/lib/deck/deckJob';

const MAX_FILE_BYTES = 128 * 1024;

function downloadLesson(deck: ImportedDeckJob) {
  const url = URL.createObjectURL(new Blob([deckToLessonMarkdown(deck)], { type: 'text/markdown;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${deck.input.title.slice(0, 60).replace(/[\\/:*?"<>|]+/g, '').trim() || 'lesson'}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const DeckImportView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [deck, setDeck] = useState<ImportedDeckJob | null>(null);
  const [error, setError] = useState('');
  const [teacherReviewed, setTeacherReviewed] = useState(false);
  const [loading, setLoading] = useState(false);

  const importFile = async (file?: File) => {
    if (!file) return;
    setError('');
    setDeck(null);
    setTeacherReviewed(false);
    if (file.size > MAX_FILE_BYTES) { setError('Файл больше безопасного лимита 128 КБ'); return; }
    if (!file.name.toLowerCase().endsWith('.json')) { setError('Выберите JSON-файл из Eclipse Deck Studio'); return; }
    setLoading(true);
    try { setDeck(parseApprovedDeckJob(await file.text())); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Не удалось импортировать deck job'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <header className="quest-card rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div><div className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.2em]">Deck → урок</div><h1 className="mt-2 text-2xl font-display font-bold text-white">Импорт учебной презентации</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Выберите утверждённый deck.job.v1 из Eclipse AI Hub. Файл проверяется локально и никуда не отправляется.</p></div>
          <button type="button" onClick={onExit} className="min-h-11 px-4 rounded-xl border border-quest-700/30 text-sm text-slate-300 hover:bg-quest-800/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-300">Вернуться к курсам</button>
        </div>
      </header>

      {!deck && <section className="quest-card rounded-2xl p-6 md:p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-quest-500/30 bg-quest-500/10 text-2xl" aria-hidden="true">▤</div>
        <h2 className="mt-4 text-xl font-bold text-white">Выберите deck.job.v1.json</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-400">Поддерживаются только 3–20 слайдов, HTTPS-источники и полностью утверждённый контракт. HTML и команды из файла не выполняются.</p>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={(event) => importFile(event.target.files?.[0])} className="sr-only" />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={loading} className="mt-5 min-h-12 rounded-xl bg-quest-500 px-6 font-semibold text-white hover:bg-quest-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-quest-950 focus-visible:ring-quest-300">{loading ? 'Проверяем файл…' : 'Выбрать JSON'}</button>
        {error && <div role="alert" className="mx-auto mt-4 max-w-xl rounded-xl border border-red-500/30 bg-red-900/20 p-3 text-sm text-red-200">{error}</div>}
      </section>}

      {deck && <>
        <section className="quest-card rounded-2xl p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div><div className="text-xs uppercase tracking-wider text-emerald-300">Contract valid · local review required</div><h2 className="mt-2 text-2xl font-bold text-white">{deck.input.title}</h2><p className="mt-2 text-sm text-slate-300">{deck.input.objective}</p><div className="mt-3 text-xs text-slate-500">{deck.slides.length} слайдов · для: {deck.input.audience}</div></div>
            <button type="button" onClick={() => { setDeck(null); setTeacherReviewed(false); if (fileRef.current) fileRef.current.value = ''; }} className="min-h-11 rounded-xl border border-quest-700/30 px-4 text-sm text-slate-300 hover:bg-quest-800/30">Выбрать другой файл</button>
          </div>
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed text-amber-100">Approval из AI Hub подтверждает подготовку автора, но не переносится автоматически. Преподаватель заново проверяет материал в контексте урока.</div>
        </section>
        <section className="space-y-3">
          {deck.slides.map((slide, index) => <article key={slide.id} className="quest-card rounded-2xl p-5"><div className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-quest-500/30 bg-quest-500/10 text-sm text-quest-200">{index + 1}</span><div className="min-w-0"><h3 className="font-semibold text-white">{slide.title}</h3><ul className="mt-3 space-y-2 text-sm text-slate-300">{slide.bullets.map((bullet, bulletIndex) => <li key={slide.id + '-' + bulletIndex} className="flex gap-2"><span className="text-quest-300">•</span><span>{bullet}</span></li>)}</ul>{slide.speakerNotes && <div className="mt-4 border-l-2 border-amber-400/40 pl-3 text-xs leading-relaxed text-slate-400"><span className="font-semibold text-amber-200">Заметки:</span> {slide.speakerNotes}</div>}</div></div></article>)}
        </section>
        <section className="quest-card rounded-2xl p-5 md:p-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-200"><input type="checkbox" checked={teacherReviewed} onChange={(event) => setTeacherReviewed(event.target.checked)} className="mt-1 accent-[#6BA3FF]" /><span>Я проверил факты, возрастную уместность, права на материалы и заметки каждого слайда.</span></label>
          <button type="button" onClick={() => downloadLesson(deck)} disabled={!teacherReviewed} className="mt-5 min-h-12 w-full rounded-xl bg-quest-500 px-5 font-semibold text-white hover:bg-quest-400 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest-300">Скачать план урока .md</button>
        </section>
      </>}
    </div>
  );
};
