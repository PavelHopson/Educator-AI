import assert from 'node:assert/strict';
import test from 'node:test';
import { FIRST_PARTY_TEMPLATES, PRODUCTION_TRACK_MODULES, completeProductionModule, normalizeProductionProgress } from './productionTrack.v2.mjs';
test('defines the five-stage production track and original templates', () => {
  assert.deepEqual(PRODUCTION_TRACK_MODULES.map((item) => item.id), ['vibe-coding', 'spec-kit', 'harness-engineering', 'safe-skills', 'production-project']);
  assert.deepEqual(Object.keys(FIRST_PARTY_TEMPLATES), ['brief', 'harness', 'skillReview', 'release']);
});
test('does not grant completion without concrete evidence', () => {
  assert.throws(() => completeProductionModule(null, 'vibe-coding', {}), /evidence/i);
  const progress = completeProductionModule(null, 'vibe-coding', { 'one-sentence user job': 'Plan a safe release', 'non-goals': 'No automatic publish', 'human-controlled actions': 'Release approval' });
  assert.deepEqual(progress.completed, ['vibe-coding']);
  assert.deepEqual(normalizeProductionProgress({ completed: ['vibe-coding', 'unknown'], token: 'drop-me' }).completed, ['vibe-coding']);
});
