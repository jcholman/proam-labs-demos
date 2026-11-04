# Find your thread — Continuity Search v0.1

An interactive, responsive HTML prototype extending POS-Lite from search to prior-thread orientation, artifact navigation, and continuation. Open index.html directly; no build or network service is required.

## Try it

- Search by the readiness, missing-image, or tailored-resume suggestions.
- Filter Publications or RTS.
- Select a thread, inspect Artifacts, and switch between two publications.
- Prepare an editable continuation brief; copy or download it as Markdown.
- Inspect Source & limits.
- On narrow screens, results and details become sequential views with Back navigation.

## Search boundary

Browser-local curated concept/synonym matching plus token matching over four fixtures. This demonstrates semantic discovery UX; it is not embedding retrieval, a full-corpus index, or a live Thinking Graph query. Results explain matched concepts and do not fabricate confidence scores or graph edges.

## Data boundary

This public repository contains de-identified illustrative fixtures with no private source, artifact, or conversation URLs, no resume contents, and no credentials. Owner-private preview records can be supplied through the same records.js interface. Qualification, capture, artifact presence, publication readiness, authorization, and placement are distinct states.

Continue opens only a grounded thread URL. When absent, the interface offers a derived continuation brief. No prompt is automatically sent and no external record is written. Run It Back explains its adapter boundary; it does not execute validation.

## Validation

Inline JavaScript parses; private and public data scripts parse; public fixture checked for private Drive and conversation links. Browser checks covered idea search, resume ranking, publication switching, continuation-brief preparation, clipboard fallback, and empty search. Download and external destination authorization are not end-to-end verified.

No canonical TG, LAND, inventory, or production record is changed. This is a review prototype, not accepted production functionality.
