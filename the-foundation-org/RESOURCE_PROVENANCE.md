# Foundation resource provenance and promotion rules

Status: candidate operating convention · November 16, 2026

## Separate authenticity from qualification

**Origin (what the record represents)**
- `SYNTHETIC`: invented demonstrations, fictional organizations or events, and simulated observations. Always label in every rendered card, chart, and detail view. Never report synthetic metrics as community evidence.
- `REAL_WORLD_SOURCE`: externally documented actual program, event, or organization with source and review date. Real-world existence **does not establish** current availability, a provider relationship, or an individual’s eligibility.
- `UNKNOWN`: source origin unresolved. Fail closed: do not promote to a live/public opportunity.

**Qualification (what is known)**
- `DISCOVERED`: candidate observation, not checked against a primary provider source.
- `SOURCE_VERIFIED`: dated primary-source review. Not provider-confirmed.
- `PROVIDER_CONFIRMED`: dated confirmation of the relevant facts **from the provider**; expires or requires recheck when time-sensitive.
- Person-specific `REFERRAL_READY`: a separate consent and human-authorization decision, never inferred from a resource’s qualification.

**Separate state dimensions:** Provider/service availability (checked / not checked / changed), program eligibility rules, and person-specific eligibility (not inferred) must not be collapsed into a generic “real,” “verified,” or “available” badge.

## Current demonstration baseline
- Find Support: 21 real-world **source-based** resources in the 2026-11-09 candidate catalog. Program existence and source-review history are distinct from availability, capacity, and actual referral readiness.
- Your Community: 16 synthetic event fixture records in the November 2026 example dataset; any cards, metrics, chronology, and insight examples derived from them remain synthetic. No live community event feed.
- VET TEC 2.0: source-verified 2026-11-16 **candidate**, preserved separately from the live catalog; see `candidates/va-vet-tec-2.candidate.json`.

## Synthetic-to-real migration
1. Discover the potential real resource/event and preserve official source URL, effective dates, source review timestamp, geography, provider and program version.
2. Reconcile against existing records, including superseded programs or duplicate event listings. Do not create a “new” resource just because a current source mentions it.
3. Qualify real-world source assertions independently of availability and individual eligibility. Put uncertain or contradictory claims on HOLD/RECHECK; do not silently repair them.
4. Require explicit review/authorization before publication; mark source-backed material as **availability unconfirmed** unless the current availability evidence supports more.
5. Replace the synthetic card on the *consumer surface* only when a qualified real record serves the same purpose. Keep fixtures in a separate TEST/QA dataset for demonstrative/regression use rather than deleting the historical evidence or passing synthetic metrics off as real observations.
6. Never combine synthetic and real counts into unqualified community statistics. Label mixed displays by origin and source review date; do not project synthetic trends onto real community needs.

**Boundaries:** Capability ≠ authorization; official source review ≠ provider confirmation; real-world source ≠ current availability; evidence ≠ eligibility; publication ≠ referral.
