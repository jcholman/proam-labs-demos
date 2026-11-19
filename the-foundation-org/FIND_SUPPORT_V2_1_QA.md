# Find Support v2.1 — catalog-aware search QA
Date: 2026-11-19. Status: test candidate, not authorized for promotion.

This page is distinct from `resources.html` (v1) and `resources-v2.html` (v2). The canonical 47-record catalog is unchanged.

## Behavior
- Curated need definitions remain explicit, but the visible examples are computed from matching catalog IDs subject to Pathway, Support type and Geography.
- The initial six are shown; **Show more topics** reveals others. Examples with zero matching records are hidden.
- The number beside each example means *documented matching catalog records*, not current availability, confirmed intake, or individual eligibility.
- Community housing uses **Explore housing referrals**. Veterans housing uses **Explore veteran housing pathways**.
- Search, official provider URLs, qualifications and card details reuse v2. No AI API is used.

## Test cases
1. Community: check printing, computers and résumé; housing says referrals.
2. Veterans: computer printing and small-business examples disappear; housing says veteran housing pathways.
3. Support type = Business & entrepreneurship: unrelated suggestions disappear.
4. Geography = Online / virtual: geographically unsupported suggestions disappear.
5. Try More/Fewer, then click examples. Results should honor all filters.
6. Direct search for LFPL still finds 16 library records.
7. Unsupported need produces an honest empty state. No synthetic fixtures.

## Boundary
This is dynamic **catalog coverage**, not a live provider-capacity index. Adding a new kind of service still requires editorial mapping to a governed need category. No v1/v2 replacement until human approval.
