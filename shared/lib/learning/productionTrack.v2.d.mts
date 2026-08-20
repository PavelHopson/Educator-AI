export type ProductionTrackProgress = { version: 'educator.production-track.v2'; completed: string[] };
export const PRODUCTION_TRACK_VERSION: 'educator.production-track.v2';
export const PRODUCTION_TRACK_MODULES: ReadonlyArray<{ id: string; title: string; evidence: string[] }>;
export const FIRST_PARTY_TEMPLATES: Readonly<Record<string, readonly string[]>>;
export function normalizeProductionProgress(value: unknown): ProductionTrackProgress;
export function completeProductionModule(progress: unknown, moduleId: string, evidence: Record<string, string>): ProductionTrackProgress;
