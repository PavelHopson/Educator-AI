import assert from 'node:assert/strict';
import test from 'node:test';
import {
  APP_BUILDING_TRACK_VERSION,
  appBuildingProgressPercent,
  nextAppBuildingModule,
  normalizeAppBuildingProgress,
  toggleAppBuildingModule,
} from './appBuildingTrack.mjs';

test('normalizes malformed local progress without trusting unknown fields', () => {
  assert.deepEqual(normalizeAppBuildingProgress(null), {
    version: APP_BUILDING_TRACK_VERSION,
    completed: [],
  });
  assert.deepEqual(normalizeAppBuildingProgress({
    version: 'old',
    completed: [2, 0, 2, -1, 99, '1'],
    token: 'must-not-persist',
  }), {
    version: APP_BUILDING_TRACK_VERSION,
    completed: [0, 2],
  });
});

test('toggles modules and calculates deterministic progress', () => {
  let progress = toggleAppBuildingModule(null, 0);
  progress = toggleAppBuildingModule(progress, 2);
  assert.equal(appBuildingProgressPercent(progress), 67);
  assert.equal(nextAppBuildingModule(progress), 1);
  progress = toggleAppBuildingModule(progress, 0);
  assert.deepEqual(progress.completed, [2]);
});

test('rejects module indexes outside the fixed track', () => {
  assert.throws(() => toggleAppBuildingModule(null, 3), RangeError);
  assert.throws(() => toggleAppBuildingModule(null, -1), RangeError);
});