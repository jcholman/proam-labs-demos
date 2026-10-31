# v0.2 — Design Qualification and Acceptance Register

**As of:** October 31, 2026  
**Implementation:** static, disposable visualization only  
**Disposition:** PROTOTYPE_COMMITTED / STATIC_INVARIANTS_CHECKED / HUMAN_ACCEPTANCE_NOT_EVIDENCED

## Basis / records
See `projection.json` (source inventory, per-observation governed reference paths, qualification limits, historical statement inventory). Base projection: `orientation-graph-v0-1/projection.json`.

The originating, private `proAMLabs/proam-convergence` evidence includes:
- `governance/checkpoints/BMV4_PRE48_OPERATING_CHECKPOINT_v0.1.md` — 24 verified / 25 materialized; OBS-024 readback not evidenced.
- `governance/checkpoints/step6b_current_observation_processing_navigation_v0.2.md` — exact 24 and lineage groups.
- `governance/cohorts/obs002_obs004_end_to_end_governed_bindings_v0.1.json` — 6 historical statements.
- `governance/cohorts/step6b_remaining10_end_to_end_governed_bindings_v0.1.json` — 30 historical statements.
- `governance/cohorts/step6b_a_g_historical_governed_bindings_v0.1.json` — derived historical meaning, debt for representative six, but no exact bounded statement array entered into v0.2.
- `governance/experiments/step5-land-live-tg-pilot/obs011_tg_pre_assimilation_entry_v0.1.json` — historical OBS-011 Ψ/RP/pre-assimilation and missing assimilation authorization.
- `governance/projections/step6b_held12_observation_state_v0.1.md` and `governance/checkpoints/step6b_12_observation_cohort_closure_v0.1.json` — two historical scoped processing checkpoints.

### Static invariant checks

| Claim | Basis | Outcome |
|---|---|---|
| Exactly 24 verified observation identities | v0.1 & v0.2 projection | checked |
| OBS-024 is external, not verified core | pre-48 checkpoint | checked |
| OBS-017, 018, 020, 022, 026 excluded | defined population | checked |
| 12 source-detailed observation neighborhoods | source-bound statement arrays | checked |
| 36 historical TG statements | 6 + 30, no model-generated semantic edges | checked |
| No independently loaded current cross-observation canonical edge set | projection contract | checked |
| Graph only renders exact statement source/predicate/target strings | static JS rendering implementation | code inspected |
| Candidate predicate is visually different from recorded non-candidate | SVG class distinction | code inspected |
| Unresolved parent is not invented | explicit open endpoint | code inspected |
| Logo remains the previously supplied proAM emblem | copied unchanged from v0.1 header asset | checked |
| Read-only/no remote writes or analytics | static code pattern | code inspected |

### Implemented interface

Clickable 24-node landscape; readable local statement neighborhood; role/type distinction; observation selection and search; filters for retrieved/unretrieved/unresolved; historical processing checkpoint comparison; frozen Executor Orientation; separate JSON feedback download; clickable governed evidence references; desktop/mobile responsive layout; Back and Reset.

### Qualifications that remain OPEN

- Desktop/mobile browser interaction not independently exercised by an authorized tester.
- GitHub Pages publishing/caching not independently verified.
- Public-safe summaries were inherited from v0.1 and still require owner review before broad external publication.
- Six individually processed observations lack independently retrieved per-observation statement-level evidence in this static projection.
- Representative-six `graph_effects` are textual historical records; no semantic statement graph was inferred by parsing them.
- No complete, currently canonical cross-observation qualified semantic edge inventory was obtained; the constellation is a set of evidence neighborhoods, **not** a qualified cross-observation network.
- OBS-034 unresolved-parent presentation follows the Product Owner's design directive; its original Relationship Index row was not retrieved into the demo.
- No user-study timings, observed false conclusions, accessibility audit, or user acceptance have yet been recorded.

### Human acceptance exercise

Ask the viewer to explain (a) what the 24 nodes mean, (b) how a historical statement differs from a canonical qualified edge, (c) whether two observations that discuss similar concepts are connected in this graph, (d) why OBS-024 is external, (e) what changed between two checkpoints, (f) what the Executor is **not** authorized to do.

Log time, source inspections, incorrect inferences, missed constraints, questions and navigation friction using Alex Notes. Acceptance must not be claimed before exercise/inspection.

**This document and the diagram do not provide independent semantic or execution authority.**
