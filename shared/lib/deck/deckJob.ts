export interface ImportedDeckSlide {
  id: string;
  kind: 'cover' | 'content' | 'evidence' | 'summary';
  title: string;
  bullets: string[];
  speakerNotes: string;
  sourceRefs: string[];
}

export interface ImportedDeckJob {
  schemaVersion: 'deck.job.v1';
  id: string;
  status: 'approved';
  input: {
    title: string;
    objective: string;
    audience: string;
    format: 'project-recap' | 'lesson' | 'pitch';
    evidenceUrls: string[];
  };
  slides: ImportedDeckSlide[];
  upstreamApprovedAt: string;
}

const MAX_BYTES = 128 * 1024;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

function object(value: unknown, field: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${field}: ожидался объект`);
  return value as Record<string, unknown>;
}

function keys(value: Record<string, unknown>, allowed: string[], field: string): void {
  const unexpected = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unexpected.length) throw new Error(`${field}: неизвестное поле ${unexpected[0]}`);
}

function text(value: unknown, field: string, min: number, max: number): string {
  if (typeof value !== 'string' || value.length < min || value.length > max || CONTROL_CHARACTERS.test(value)) {
    throw new Error(`${field}: некорректный текст`);
  }
  return value;
}

function dateTime(value: unknown, field: string): string {
  const result = text(value, field, 10, 64);
  if (Number.isNaN(Date.parse(result))) throw new Error(field + ': некорректная дата');
  return result;
}

function list(value: unknown, field: string, min: number, max: number): unknown[] {
  if (!Array.isArray(value) || value.length < min || value.length > max) {
    throw new Error(`${field}: ожидалось от ${min} до ${max} элементов`);
  }
  return value;
}

function httpsUrl(value: unknown, field: string): string {
  const raw = text(value, field, 8, 480);
  let url: URL;
  try { url = new URL(raw); } catch { throw new Error(`${field}: некорректная ссылка`); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`${field}: разрешён только HTTPS без credentials`);
  url.hash = '';
  return url.toString();
}

function parseSlide(value: unknown, index: number): ImportedDeckSlide {
  const label = `Слайд ${index + 1}`;
  const slide = object(value, label);
  keys(slide, ['id', 'kind', 'title', 'bullets', 'speakerNotes', 'sourceRefs'], label);
  if (!['cover', 'content', 'evidence', 'summary'].includes(String(slide.kind))) {
    throw new Error(`${label}: неизвестный тип`);
  }
  return {
    id: text(slide.id, `${label} / id`, 1, 256),
    kind: slide.kind as ImportedDeckSlide['kind'],
    title: text(slide.title, `${label} / заголовок`, 2, 120),
    bullets: list(slide.bullets, `${label} / тезисы`, 1, 8).map((item) => text(item, 'Тезис', 2, 500)),
    speakerNotes: text(slide.speakerNotes, `${label} / заметки`, 0, 2_000),
    sourceRefs: list(slide.sourceRefs, `${label} / источники`, 0, 12).map((item) => text(item, 'Источник', 1, 32)),
  };
}

export function parseApprovedDeckJob(raw: string): ImportedDeckJob {
  if (new TextEncoder().encode(raw).byteLength > MAX_BYTES) throw new Error('Файл больше безопасного лимита 128 КБ');
  let decoded: unknown;
  try { decoded = JSON.parse(raw); } catch { throw new Error('Не удалось прочитать JSON'); }
  const root = object(decoded, 'Deck job');
  keys(root, ['schemaVersion', 'id', 'status', 'createdAt', 'updatedAt', 'input', 'slides', 'policy', 'approval'], 'Deck job');
  if (root.schemaVersion !== 'deck.job.v1') throw new Error('Поддерживается только deck.job.v1');
  if (root.status !== 'approved') throw new Error('Сначала утвердите deck job в Eclipse AI Hub');
  dateTime(root.createdAt, 'Дата создания');
  dateTime(root.updatedAt, 'Дата обновления');

  const input = object(root.input, 'Исходные данные');
  keys(input, ['title', 'objective', 'audience', 'format', 'sourceText', 'evidenceUrls'], 'Исходные данные');
  if (!['project-recap', 'lesson', 'pitch'].includes(String(input.format))) throw new Error('Неизвестный тип презентации');
  text(input.sourceText, 'Исходный материал', 40, 60_000);

  const policy = object(root.policy, 'Политика');
  keys(policy, ['externalActions', 'toolsAllowed', 'sourceContentTrusted', 'autoPublishAllowed', 'pptxRendered'], 'Политика');
  for (const field of ['externalActions', 'toolsAllowed', 'sourceContentTrusted', 'autoPublishAllowed', 'pptxRendered']) {
    if (policy[field] !== false) throw new Error(`Небезопасная политика: ${field} должен быть false`);
  }

  const approval = object(root.approval, 'Approval');
  keys(approval, ['claimsVerified', 'rightsConfirmed', 'finalReviewComplete', 'approvedAt'], 'Approval');
  if (approval.claimsVerified !== true || approval.rightsConfirmed !== true || approval.finalReviewComplete !== true) {
    throw new Error('Upstream approval заполнен не полностью');
  }

  const slides = list(root.slides, 'Слайды', 3, 20).map(parseSlide);
  if (new Set(slides.map((slide) => slide.id)).size !== slides.length) throw new Error('ID слайдов должны быть уникальными');
  return {
    schemaVersion: 'deck.job.v1',
    id: text(root.id, 'ID deck job', 1, 128),
    status: 'approved',
    input: {
      title: text(input.title, 'Название', 3, 120),
      objective: text(input.objective, 'Цель', 10, 500),
      audience: text(input.audience, 'Аудитория', 3, 240),
      format: input.format as ImportedDeckJob['input']['format'],
      evidenceUrls: list(input.evidenceUrls, 'Источники', 0, 12).map((item) => httpsUrl(item, 'Источник')),
    },
    slides,
    upstreamApprovedAt: dateTime(approval.approvedAt, 'Дата upstream approval'),
  };
}

export function deckToLessonMarkdown(deck: ImportedDeckJob): string {
  let markdown = `# ${deck.input.title}\n\n`;
  markdown += `> Цель: ${deck.input.objective}\n>\n> Аудитория: ${deck.input.audience}\n\n`;
  deck.slides.forEach((slide, index) => {
    markdown += `## ${index + 1}. ${slide.title}\n\n`;
    slide.bullets.forEach((bullet) => { markdown += `- ${bullet}\n`; });
    if (slide.speakerNotes) markdown += `\n_Заметки преподавателя:_ ${slide.speakerNotes}\n`;
    markdown += '\n';
  });
  if (deck.input.evidenceUrls.length) {
    markdown += '## Источники\n\n';
    deck.input.evidenceUrls.forEach((url, index) => { markdown += `${index + 1}. ${url}\n`; });
  }
  return markdown;
}
