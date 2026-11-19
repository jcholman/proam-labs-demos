# Find Support — v2 Plain-Language Search QA

Created November 19, 2026. **Test candidate only**: original `resources.html` is the current reference and was not modified.

## Isolated assets

- Test page: `the-foundation-org/resources-v2.html`
- Search logic: `the-foundation-org/assets/find-support-search-v2.js`
- Current reference: `the-foundation-org/resources.html`
- Source data baseline: 47 existing source-reviewed records, embedded identically in v2. No catalog edits.

## Changes

1. Replace technical search label with **What do you need help with?** and explanatory plain-language instructions.
2. Six selectable everyday examples which populate the search field.
3. Deterministic 14-intent vocabulary with bounded record-ID mappings, diacritic normalization and conservative fallback to source text.
4. Score matching entries ahead of keyword-only matches; show **Why this appeared** on each result without claiming availability, personal eligibility, referral readiness or provider affiliation.
5. Keep original pathway, support type and geography controls, official provider links, and detailed qualification text.
6. No model API, server, participant profile, monitoring, or automatic publication. No provider records are changed.

## Manual acceptance

- Compare v1 and v2 under the same pathway filter. v1 must remain unchanged.
- Try the six examples and custom conversational phrases. Ensure results connect to real sources without irrelevant recommendations.
- Search `LFPL` and confirm all 16 preexisting library-service records appear under Community support.
- Try a nonexistent term and verify it fails closed with suggestions (never synthetic fillers).
- Change to Veterans & military families and ensure only veteran-track records appear. Change support type and geography and verify filters are enforced.
- Follow the official website link from each sample card. Confirm that underlying `Eligibility, costs & next step` remains intact.
- Test mobile screen widths, keyboard navigation and result announcements.
- Before any future swap, re-synchronize the v2 embedded resource snapshot against the latest `resources.json`, rerun deterministic tests, obtain human sign-off, and only then promote.

**Known limitations:** Curated vocabulary is incomplete; the search recognizes patterns rather than understanding free-form intent. Relevance is not eligibility or current availability. The v2 page is discoverable by direct URL and `noindex` is not an access control.
