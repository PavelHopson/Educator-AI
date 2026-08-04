import assert from 'node:assert/strict';
import test from 'node:test';
import { deckToLessonMarkdown, parseApprovedDeckJob } from './deckJob.ts';

function approvedDeck(overrides = {}) {
  return {
    schemaVersion: 'deck.job.v1',
    id: 'deck-1',
    status: 'approved',
    createdAt: '2026-08-04T10:00:00.000Z',
    updatedAt: '2026-08-04T10:10:00.000Z',
    input: {
      title: 'Проверенный урок',
      objective: 'Объяснить безопасный выбор AI-инструмента',
      audience: 'Начинающие разработчики',
      format: 'lesson',
      sourceText: 'Каталог показывает назначение, лицензию, ограничения и официальный источник каждого инструмента.',
      evidenceUrls: ['https://library.eclipse-forge.ru/'],
    },
    slides: [
      { id: 's1', kind: 'cover', title: 'Введение', bullets: ['Что узнаем на уроке'], speakerNotes: 'Назовите цель.', sourceRefs: [] },
      { id: 's2', kind: 'content', title: 'Проверка', bullets: ['Откройте официальный источник'], speakerNotes: 'Покажите пример.', sourceRefs: ['S1'] },
      { id: 's3', kind: 'summary', title: 'Итог', bullets: ['Сначала факты, затем решение'], speakerNotes: '', sourceRefs: [] },
    ],
    policy: {
      externalActions: false,
      toolsAllowed: false,
      sourceContentTrusted: false,
      autoPublishAllowed: false,
      pptxRendered: false,
    },
    approval: {
      claimsVerified: true,
      rightsConfirmed: true,
      finalReviewComplete: true,
      approvedAt: '2026-08-04T10:10:00.000Z',
    },
    ...overrides,
  };
}

test('imports an approved bounded deck and exports lesson Markdown', () => {
  const deck = parseApprovedDeckJob(JSON.stringify(approvedDeck()));
  assert.equal(deck.status, 'approved');
  assert.equal(deck.slides.length, 3);
  assert.match(deckToLessonMarkdown(deck), /Заметки преподавателя/);
});

test('rejects a draft and unsafe policy flags', () => {
  assert.throws(() => parseApprovedDeckJob(JSON.stringify(approvedDeck({ status: 'draft' }))), /утвердите/);
  const unsafe = approvedDeck();
  unsafe.policy.toolsAllowed = true;
  assert.throws(() => parseApprovedDeckJob(JSON.stringify(unsafe)), /toolsAllowed/);
});

test('rejects unknown fields, credential URLs and duplicate slide ids', () => {
  assert.throws(() => parseApprovedDeckJob(JSON.stringify({ ...approvedDeck(), unexpected: true })), /неизвестное поле/);
  const credentialUrl = approvedDeck();
  credentialUrl.input.evidenceUrls = ['https://user:pass@example.com/'];
  assert.throws(() => parseApprovedDeckJob(JSON.stringify(credentialUrl)), /credentials/);
  const duplicate = approvedDeck();
  duplicate.slides[1].id = duplicate.slides[0].id;
  assert.throws(() => parseApprovedDeckJob(JSON.stringify(duplicate)), /уникальными/);
});
