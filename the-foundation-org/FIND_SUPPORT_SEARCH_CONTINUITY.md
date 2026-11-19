# Find Support — search continuity after v2.1 promotion
**Promoted:** November 19, 2026 · **Authorization:** user explicitly approved swap.

## Canonical page and catalog
`the-foundation-org/resources.html` is the primary consumer entrypoint, reached through the existing Foundation navigation. It now uses a stable production script `assets/find-support-search.js`, with the tested v2.1 deterministic need matcher and catalog-aware suggestions. The 47-source-backed-record baseline comes from `resources.json` and must match the in-page embedded catalog JSON. The current content is a **dated snapshot**, not a live feed.

## Preserved rollback and QA
- Original v1: `resources-v1-archive.html` (noindex, labeled archival, inline original search).
- Separate v2: `resources-v2.html`.
- Separate v2.1: `resources-v2-1.html` and `assets/find-support-search-v2-1.js`.
- Stable production: `resources.html` and `assets/find-support-search.js`.

To roll back, restore the prior `resources.html` from the parent Git commit, or use the archived v1 content after removing its archive warning and noindex. Independently verify catalog parity and public links afterward.

## Contract and future refinement
Example counts mean **source-backed catalog record matches** only. They are not vacancies, remaining funds, confirmed enrollment, individualized eligibility, referrals, or provider endorsements. The editorial need mappings use existing resource IDs and follow pathway, type, and geography filters. Entirely new need categories require reviewed mappings.

**Future semantic search is NOT deployed.** Any semantic candidate matcher should return qualified catalog record IDs with explainable evidence, retain direct primary source links and deterministic fallback, measure relevance and false positive rates (particularly for housing and benefits), and never infer availability from semantic similarity. Introducing external model access, transmitting visitor queries, storing personal data, or auto-publishing results requires independent privacy and human authorization.

## Post-promotion acceptance
1. Canonical URL loads 47 records and does not show TEST or noindex labels.
2. Community and Veterans filters change supported examples and correctly qualify housing as referrals/pathways.
3. Support type and geography hide suggestions unsupported by current catalog.
4. More/fewer examples, query entry, why-match explanations, reset and source links work.
5. v1 archive plus v2/v2.1 tests remain available but are not primary navigation.
6. Maintain `resources.json` ↔ embedded catalog parity on subsequent authorized updates.

**Protect the House — deterministic search is the operational baseline; semantic search remains exploratory.**
