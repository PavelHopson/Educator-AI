export const PRODUCTION_TRACK_VERSION = 'educator.production-track.v2';
export const PRODUCTION_TRACK_MODULES = Object.freeze([
  { id: 'vibe-coding', title: 'Vibe Coding with boundaries', evidence: ['one-sentence user job', 'non-goals', 'human-controlled actions'] },
  { id: 'spec-kit', title: 'Spec Kit', evidence: ['main flow', 'loading/empty/error/success states', 'acceptance criteria'] },
  { id: 'harness-engineering', title: 'Harness Engineering', evidence: ['repeatable command', 'deterministic fixture', 'failure report'] },
  { id: 'safe-skills', title: 'Safe Skills', evidence: ['least privilege', 'untrusted-input boundary', 'approval for external actions'] },
  { id: 'production-project', title: 'Production Project', evidence: ['tests and build', 'security review', 'manual release decision'] },
]);

export const FIRST_PARTY_TEMPLATES = Object.freeze({
  brief: ['User and job', 'Main path', 'Non-goals', 'States', 'Acceptance criteria'],
  harness: ['Command', 'Fixture', 'Expected output', 'Failure evidence', 'Cleanup'],
  skillReview: ['Inputs', 'Permissions', 'Side effects', 'Approval points', 'Abuse cases'],
  release: ['Build', 'Tests', 'Security findings', 'Known limitations', 'Human approver'],
});

export function normalizeProductionProgress(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { version: PRODUCTION_TRACK_VERSION, completed: [] };
  const allowed = new Set(PRODUCTION_TRACK_MODULES.map((module) => module.id));
  const completed = Array.isArray(value.completed) ? [...new Set(value.completed.filter((id) => typeof id === 'string' && allowed.has(id)))] : [];
  return { version: PRODUCTION_TRACK_VERSION, completed };
}

export function completeProductionModule(progress, moduleId, evidence) {
  const module = PRODUCTION_TRACK_MODULES.find((item) => item.id === moduleId);
  if (!module) throw new RangeError('Unknown production learning module.');
  if (!evidence || typeof evidence !== 'object' || module.evidence.some((key) => typeof evidence[key] !== 'string' || evidence[key].trim().length < 3)) throw new Error('Every required evidence field must be completed.');
  const normalized = normalizeProductionProgress(progress);
  return { version: PRODUCTION_TRACK_VERSION, completed: normalized.completed.includes(moduleId) ? normalized.completed : [...normalized.completed, moduleId] };
}
