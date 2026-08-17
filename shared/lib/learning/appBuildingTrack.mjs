export const APP_BUILDING_TRACK_VERSION = 'educator.app-building-track.v1';
export const APP_BUILDING_MODULE_COUNT = 3;

export function normalizeAppBuildingProgress(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { version: APP_BUILDING_TRACK_VERSION, completed: [] };
  }
  const completed = Array.isArray(value.completed)
    ? [...new Set(value.completed.filter((item) => Number.isInteger(item) && item >= 0 && item < APP_BUILDING_MODULE_COUNT))]
        .sort((a, b) => a - b)
    : [];
  return { version: APP_BUILDING_TRACK_VERSION, completed };
}

export function toggleAppBuildingModule(progress, moduleIndex) {
  if (!Number.isInteger(moduleIndex) || moduleIndex < 0 || moduleIndex >= APP_BUILDING_MODULE_COUNT) {
    throw new RangeError('moduleIndex is outside the app-building track');
  }
  const normalized = normalizeAppBuildingProgress(progress);
  const completed = normalized.completed.includes(moduleIndex)
    ? normalized.completed.filter((item) => item !== moduleIndex)
    : [...normalized.completed, moduleIndex].sort((a, b) => a - b);
  return { version: APP_BUILDING_TRACK_VERSION, completed };
}

export function appBuildingProgressPercent(progress) {
  return Math.round((normalizeAppBuildingProgress(progress).completed.length / APP_BUILDING_MODULE_COUNT) * 100);
}

export function nextAppBuildingModule(progress) {
  const completed = new Set(normalizeAppBuildingProgress(progress).completed);
  for (let index = 0; index < APP_BUILDING_MODULE_COUNT; index += 1) {
    if (!completed.has(index)) return index;
  }
  return APP_BUILDING_MODULE_COUNT - 1;
}