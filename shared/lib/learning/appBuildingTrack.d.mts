export type AppBuildingProgress = {
  version: 'educator.app-building-track.v1';
  completed: number[];
};

export const APP_BUILDING_TRACK_VERSION: 'educator.app-building-track.v1';
export const APP_BUILDING_MODULE_COUNT: 3;
export function normalizeAppBuildingProgress(value: unknown): AppBuildingProgress;
export function toggleAppBuildingModule(progress: unknown, moduleIndex: number): AppBuildingProgress;
export function appBuildingProgressPercent(progress: unknown): number;
export function nextAppBuildingModule(progress: unknown): number;