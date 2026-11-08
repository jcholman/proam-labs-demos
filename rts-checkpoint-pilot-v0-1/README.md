# Resume-to-Submission — RTS Checkpoint Pilot v0.1

**Status:** Interactive **demo** / personal pilot candidate; not a replacement for the canonical RTS tracker or a production measurement system.

This pilot addresses the gap between creating a resume and establishing subsequent human-reviewed readiness, verified submission, and observed outcome. It tests whether brief human feedback at meaningful state transitions can create useful, recurring evidence for improving the workflow.

## Open

- [Interactive RTS checkpoint demo on existing GitHub Pages](https://jcholman.github.io/proam-labs-demos/rts-checkpoint-pilot-v0-1/)
- [Basic demo index](../README.md)

The official logo is reused from `../continuity-search-v0-1/assets/proam-emblem.png` (no duplicated branding or third-party preview service). No build required.

## Six checkpoint stages

1. `QUALIFIED_TO_WORK` — qualified opportunity and source.
2. `ALIGNMENT_REVIEWED` — job-to-candidate evidence alignment assessed.
3. `RESUME_VERIFIED` — role-specific artifact reviewed for fidelity.
4. `READY_TO_SUBMIT` — explicit human readiness declaration (no actual submission permission or action).
5. `SUBMISSION_VERIFIED` — required confirmation/receipt locator supplied; **not independently validated by demo**.
6. `OUTCOME_OBSERVED` — outcome or follow-up observed; no employment outcome inferred from submission alone.

These are *pilot display stages*, aligned in spirit with the RTS operating sequence, not replacements for its fuller control rules. Some checkpoints intentionally omit mandatory artifact requirements in demo mode; the canonical rules remain authoritative.

## Minimal human feedback at each checkpoint

**Q1:** “Is the information presented trustworthy and fit for your particular personal purpose?” Yes/No/Skip. If No, reveal a field to paste the specific excerpt plus a second optional correction/reason field. No triggers a `HOLD` event, leaves stage unchanged, and requires a correction note on subsequent acceptance.

**Q2:** “Did this checkpoint materially improve your personal continuity?” Yes/No/Skip. If No, reveal an optional context box to capture what was missing, repeated, or could improve. No produces an improvement observation, not a blocker.

**Submission pulse:** At the `SUBMISSION_VERIFIED` step, optionally record time saved / about the same / extra time / unknown, with user-estimated minutes only when a saved/extra response is provided. Actual active effort is separately optional at every checkpoint.

A “Record without survey” option records both questions as `skip` (not measured), avoiding a reporting blockade. Survey questions are *human self-reports*, not source validation or objective performance claims.

## Event contract

Each client-side event records `event_id`, `at`, `stage`, `kind` (`ACCEPTED`/`HOLD`), `from_state`, `to_state`, optional `evidence`, `evidence_status` (either user-provided but unverified, or not provided), optional `active_minutes`, optional explicit readiness declaration, previous-HOLD correction, two feedback answers with conditional notes, and optional completion time-impact estimate.

This preserves the distinction among **generated work**, **artifact possession**, **human authorization**, **external placement**, and **observed outcome**. A user-entered evidence reference is not checked; the demo is not permitted to submit, authorize, or modify any external record.

## Recurring measurement / data handling

- Can create and revisit multiple locally named opportunities and see a dated history.
- Uses browser `localStorage`, versioned under `proam-rts-checkpoint-pilot-v0-1`; no backend, login, cross-device sync, analytics, or API writes.
- Export all cases as JSON or CSV for user-controlled review. Browser storage may be cleared; export for portability.
- The source copy of a claim stays unchanged; a quoted observation and correction are recorded **separately**.
- The per-case summary shows milestones accepted, trust and continuity feedback counts, and *self-estimated* time impact. It makes **no causal or financial claim**.
- Avoid entering confidential resumes, names, employer portals, or personal identifiers into this public demo's fields. Local storage can be accessible to other users of the same browser profile; exports can contain all user-entered text.
- No Thinking Graph, LAND, RTS Inventory, Drive, or employer ATS data is read or written.

## Suggested review checks

1. On a new sample, answer Yes to both questions and record the first checkpoint. Verify stage advances and event appears.
2. On the second checkpoint answer No to trust; quote a problem and record. Verify HOLD is preserved and stage does not advance. Without a correction note, acceptance should be rejected.
3. Answer Yes after supplying correction and review note. Verify accepted state advances while original HOLD remains in history.
4. Answer No to personal continuity and enter a reason. Verify feedback is preserved without blocking advancement.
5. Verify READY_TO_SUBMIT requires the human-review declaration; SUBMISSION_VERIFIED requires a reference.
6. On the submission checkpoint select time saved and supply minutes; verify the result stays labeled *self-estimated*.
7. Reload. Confirm state remains in this browser. Add a second opportunity, then export JSON and CSV and check that separate case histories are present.
8. Check mobile layout and keyboard access.

## Pilot learning questions

- Are checkpoints sufficiently frequent to preserve continuity, but sparse enough not to interrupt RTS work?
- How many No responses lead to a useful correction or workflow change?
- Does preserved history reduce re-orientation or repeated candidate explanation on the next opportunity?
- Is the personal value pulse short enough to use consistently, and can we later compare its estimates against actual effort?

**Scope:** Basic View index entry + standalone GitHub Pages demo. Not added to the enhanced demo library, public website showcase, or `proamlabs.org` navigation.