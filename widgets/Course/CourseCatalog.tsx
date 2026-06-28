import React, { useMemo, useState } from 'react';
import { COURSE_CATALOG, CatalogCourse } from '../../shared/lib/data/courseCatalog';

interface Props {
  onPick: (course: CatalogCourse) => void;
}

// Каталог тем для генератора: выбор готовой темы вместо ручного ввода.
// Темы — по мотивам Open Culture / Free-Certifications (см. courseCatalog.ts).
export const CourseCatalog: React.FC<Props> = ({ onPick }) => {
  const [active, setActive] = useState<string>(COURSE_CATALOG[0].key);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  // Поиск идёт по всем категориям; без запроса показываем активную вкладку.
  const filtered = useMemo(() => {
    if (!q) {
      const cat = COURSE_CATALOG.find((c) => c.key === active) ?? COURSE_CATALOG[0];
      return cat.courses.map((course) => ({ course, cat }));
    }
    return COURSE_CATALOG.flatMap((cat) =>
      cat.courses
        .filter((course) =>
          course.title.toLowerCase().includes(q) || (course.blurb ?? '').toLowerCase().includes(q),
        )
        .map((course) => ({ course, cat })),
    );
  }, [q, active]);

  const activeCat = COURSE_CATALOG.find((c) => c.key === active) ?? COURSE_CATALOG[0];
  const source = q ? null : activeCat.source;

  return (
    <div className="quest-card rounded-2xl p-5 mb-4">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.2em]">📖 Каталог курсов</div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по каталогу…"
          className="bg-quest-950/50 border border-quest-700/30 rounded-lg px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-quest-500/40 outline-none w-full sm:w-56"
        />
      </div>

      {!q && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {COURSE_CATALOG.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-colors ${active === cat.key ? 'bg-quest-500/20 text-quest-200 border border-quest-500/40' : 'text-slate-400 hover:text-slate-200 border border-quest-700/30'}`}
            >
              {cat.icon}<span className="hidden sm:inline"> {cat.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filtered.map(({ course, cat }, i) => (
          <button
            key={`${cat.key}-${i}`}
            onClick={() => onPick(course)}
            className="text-left bg-quest-950/40 border border-quest-700/20 rounded-xl p-3 hover:border-quest-500/40 hover:bg-quest-800/20 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{cat.icon}</span>
              <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{course.title}</span>
            </div>
            {course.blurb && <div className="text-xs text-slate-400 mt-1 leading-snug">{course.blurb}</div>}
            <div className="text-[10px] text-quest-300 uppercase tracking-wider mt-1.5">{course.level}</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-slate-400 col-span-full py-4 text-center">Ничего не нашлось — попробуйте другое слово или введите тему вручную.</div>
        )}
      </div>

      {source && (
        <div className="text-[11px] text-slate-500 mt-3">
          Источник тем:{' '}
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-quest-300 hover:text-quest-200 underline underline-offset-2">
            {source.label} ↗
          </a>
        </div>
      )}
    </div>
  );
};
