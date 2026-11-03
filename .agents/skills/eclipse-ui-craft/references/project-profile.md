# Educator AI — product / editorial learning

The product turns learning material into quizzes, quests and structured practice.
Preserve the learner's place, answer and progress. Feedback should explain the outcome
without distracting from reading; an animation is not proof of learning or a saved answer.

## Product sources

- [Repository guide](../../../../docs/repository-guide.md)
- [Styles](../../../../index.css), [Tailwind tokens](../../../../tailwind.config.js)
- [Active shared button](../../../../shared/ui/Button.tsx)
- [Quiz view](../../../../shared/lib/game/components/QuizView.tsx)
- [Package manifest](../../../../package.json)

Keep quest-* dark surfaces, blue signal, green success, Inter/Outfit/JetBrains Mono and
existing component/icon conventions. Do not turn question or answer screens into cinematic
marketing. Preserve text-size usability, long Russian copy and clear correct/error states.
The manifest pins framer-motion 10.16.4; do not copy newer Motion API examples without
checking installed types/docs. CSS transitions remain valid alongside the existing library.

## One next pilot — proposed, not implemented

[shared/ui/Button.tsx](../../../../shared/ui/Button.tsx): review its loading state so the
original action remains understandable while busy, with accessible busy/status semantics
and visible focus. The component currently replaces children with a spinner and «Думаю...».
The old components/Button.tsx is only a moved-file stub; do not implement there.

Acceptance: loading does not erase action context for assistive technology; disabled prevents
duplicate activation; reduced motion suppresses nonessential pulse/scale but keeps status;
success appears only when the actual learning/generation operation confirms it. Validate
normal, loading, error recovery and long-label mobile cases with local fixtures.

## Checks and boundaries

Docs-only checks: frontmatter, links, provenance, conflict and diff review.
Do not modify tutoring/game system prompts, scoring, saved answers, APIs or student data.
Full teaching usability, screen-reader and runtime checks belong to the subsequent UI pilot.
Existing package scripts define application checks; this foundation changes no runtime files.
