# Educator-AI roadmap

## Current release slice

- [x] Teach the GitHub flow interactively without credentials or external mutations.
- [x] Import an approved Eclipse deck.job.v1 as a local lesson outline.
- [x] Enforce a 128 KB file limit, exact object fields, HTTPS-only sources, bounded slides and text,
      fail-closed policy flags and unique slide identifiers.
- [x] Reset upstream approval at the Educator trust boundary and require a teacher review before
      exporting lesson Markdown.

## Next

- [ ] Consume DeckJob through an authenticated Eclipse Chat handoff instead of manual files.
- [ ] Add an editable lesson theme and citations panel without hiding the original evidence.
- [ ] Render approved lesson decks to editable PPTX only through the isolated Eclipse renderer.
- [ ] Add automated unit tests for the import validator without moving provider credentials into
      the browser bundle.

## Changelog

- 2026-08-04: added the first DeckJob consumer for local, schema-bounded lesson import and
  teacher-reviewed Markdown export.
