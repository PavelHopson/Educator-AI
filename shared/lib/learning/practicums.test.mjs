import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('./practicums.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { practicums, emptyAttempt, submitAttempt, editAttempt, canReview, practicumReport, planPracticum } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('each original practicum has situation, task, deliverable, rubric, debrief and transfer', () => {
  assert.equal(new Set(practicums.map(item => item.id)).size, 2);
  for (const item of practicums) {
    for (const key of ['situation', 'task', 'deliverable', 'debrief', 'transfer']) assert.ok(item[key].length > 30);
    assert.equal(item.criteria.length, 4);
  }
});
test('submission gate checks only input length, not correctness', () => {
  assert.equal(canReview(emptyAttempt()), false);
  assert.throws(() => submitAttempt(' '.repeat(90)));
  assert.throws(() => submitAttempt('x'.repeat(79)));
  assert.throws(() => submitAttempt('x'.repeat(8001)));
  assert.equal(canReview(submitAttempt('x'.repeat(80))), true);
});
test('editing invalidates self-review without silently losing submitted answer', () => {
  const old = { ...submitAttempt('Исходный ответ '.repeat(10)), checks: [0, 2] };
  const edited = editAttempt(old, 'Исправленный ответ '.repeat(10));
  assert.equal(edited.submitted, old.submitted);
  assert.equal(canReview(edited), false);
  assert.deepEqual(edited.checks, []);
  assert.equal(canReview(submitAttempt(edited.answer)), true);
});
test('report cannot imply certification or reuse outdated checks', () => {
  const old = { ...submitAttempt('Исходный ответ '.repeat(10)), checks: [0, 1, 2, 3] };
  const edited = { ...old, answer: 'Новый черновик' };
  const report = practicumReport('support-analysis', edited);
  assert.match(report, /Не стажировка, не работа и не сертификат/);
  assert.match(report, /Самооценка не завершена/);
  assert.doesNotMatch(report, /\[x\]/);
  assert.throws(() => practicumReport('unknown', old));
});
test('analyst reference arithmetic is reproducible', () => {
  let backlog = 12;
  const daily = [[20,18],[24,15],[17,21],[31,20],[18,22]].map(([received, closed]) => (backlog += received - closed));
  assert.deepEqual(daily, [14,23,19,30,26]);
  assert.ok(practicums[1].debrief.includes(daily.join(', ')));
});

test('gap mapping requires explicit supported focus and bounded requirement', () => {
  assert.throws(() => planPracticum(' ', 'accessible-form'));
  assert.throws(() => planPracticum('x'.repeat(601), 'support-analysis'));
  assert.throws(() => planPracticum('Kubernetes', 'other'), /пока нет/);
  assert.throws(() => planPracticum('Формы', ''), /Выберите навык/);
  assert.equal(planPracticum('  Проверять формы  ', 'accessible-form').requirement, 'Проверять формы');
  assert.equal(planPracticum('Проверять гипотезы', 'support-analysis').id, 'support-analysis');
});

test('training goal is exported but never certifies competency', () => {
  const report = practicumReport('accessible-form', emptyAttempt(), 'Проверять ошибки');
  assert.match(report, /Проверять ошибки/);
  assert.match(report, /не закрывает требование автоматически/);
  assert.doesNotMatch(report, /\[x\]/);
  assert.match(practicumReport('support-analysis', emptyAttempt()), /свободная практика/);
});
