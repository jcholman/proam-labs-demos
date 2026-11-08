# Resume-to-Submission — RTS Checkpoint Pilot v0.2

**Status:** An interactive personal pilot and review aid, not a production RTS workflow, ATS integration, proof of verified submission, or guaranteed time savings.

## Open

- [Interactive demo on existing GitHub Pages](https://jcholman.github.io/proam-labs-demos/rts-checkpoint-pilot-v0-2/)
- [Basic View index](../README.md)
- [Previous v0.1](../rts-checkpoint-pilot-v0-1/), retained as a separate version

This version keeps the navy/gold visual system and references the preexisting official logo at `../continuity-search-v0-1/assets/proam-emblem.png` without copying it. It has no build dependencies or application backend.

## Why checkpoint timestamps matter

A resume could be presented at 10:05 and accepted as **Ready to Submit** at 10:15, or it could take ten calendar days of review, waiting, reconsideration, sourcing, and iteration. The workflow should preserve both timestamps and the full **elapsed calendar interval**; it should not claim that ten days were spent continuously working.

**There are three separate time measures:**

1. **Wall-clock elapsed time (timestamped):** the difference between a checkpoint's recorded start and accepted end, including overnight gaps and waiting.
2. **Active effort (optional, self-recorded):** minutes the candidate actually worked, separately entered per checkpoint; not automatically captured by this static demo.
3. **Time saved (optional, self-estimated):** a comparison with a counterfactual workflow, asked at submission and **not** established by elapsed time alone.

## Seven milestones

1. `QUALIFIED_TO_WORK` — qualified opportunity with source/identity.
2. `ALIGNMENT_REVIEWED` — requirements and candidate evidence reviewed.
3. **`RESUME_PRESENTED`** — user records when the resume draft was actually shown. This anchors the specific Resume Presented → Ready to Submit interval.
4. `RESUME_VERIFIED` — derived resume reviewed for factual fidelity and possession.
5. **`READY_TO_SUBMIT`** — explicit human-reviewed eligibility to submit; **no submission occurs**. This closes the resume-to-readiness interval.
6. `SUBMISSION_VERIFIED` — a user-provided ATS/portal confirmation locator is required; not independently verified by the demo.
7. `OUTCOME_OBSERVED` — follow-up or an observed outcome, not inferred from submission.

The seven milestone labels are **pilot display checkpoints** aligned with the current RTS operating sequence; they do not replace the authoritative control plane or automatically qualify a source, artifact, decision, or outcome.

## Clock rules (v0.2)

- When starting an opportunity, select **Start checkpoint now** for the first stage, or use the optional **Started earlier** field to enter a known local time. Creating a new opportunity starts the first clock at the moment of creation. The illustrative example starts with **no clock**, not a fabricated start time.
- Each subsequent stage **begins at the prior accepted checkpoint's completion time**. The current wall-clock interval is shown while in progress and is recoverable after a page reload because its timestamp is stored, not just a running JavaScript counter.
- A HOLD records an event and its current elapsed duration, but **does not close or advance** the checkpoint. Once the correction is reviewed and accepted, the checkpoint ends, and the next begins.
- Recording a checkpoint sets its **actual occurred-at** timestamp to the browser's current time. If recording it later, the optional historical local-time input can supply the time it actually occurred; it is explicitly tagged `USER_ENTERED_HISTORICAL` and kept distinct from `logged_at`.
- A historical event must not precede the current checkpoint start or an unresolved earlier HOLD, and future timestamps are rejected. Invalid times do not advance a stage.
- For each event, `timing.began_at`, `timing.ended_at`, and `timing.elapsed_ms` are retained. When the first start was never recorded, its elapsed time is `null` / `NOT_MEASURED`, **never zero**.
- The additional summary uses the accepted `RESUME_PRESENTED` and `READY_TO_SUBMIT` occurred-at events. It can show the duration accumulating while eligibility is still pending; after readiness, it shows the final duration.
- Timestamps are recorded as ISO 8601 UTC instants and displayed in the browser's local timezone. Elapsed milliseconds are calculated from those instants, so ordinary time-zone and daylight-saving changes do not inflate the elapsed duration. Local clock correctness and user-entered historical values cannot be independently certified in this demo.

**Important limitation:** the standalone GitHub Pages demo does not observe ChatGPT delivering a resume or an employer accepting an application. A candidate must record the presentation and later readiness milestones near the event, or retrospectively enter dates with clear provenance. Browser storage is local to the browser/profile; cross-device access or browser clearing can interrupt tracking.

## Lightweight human feedback preserved

**Q1:** *Is the information presented trustworthy and fit for your particular personal purpose?* Yes / No / Skip. A No opens the text excerpt and correction context fields, records HOLD, and requires correction before advancement.

**Q2:** *Did this checkpoint materially improve your personal continuity?* Yes / No / Skip. A No opens a conditional improvement note but does not itself block progress.

**Completion pulse:** Optional self-estimated time impact at verified submission. A separate active-minutes field stays optional at every milestone. Survey skipping is saved as `skip` rather than interpreted as Yes.

## Privacy, persistence, portability

- The page stores each opportunity and its event history under the separate `localStorage` key `proam-rts-checkpoint-pilot-v0-2`. Existing v0.1 records remain under their own key; **automatic migration is deliberately not performed**, since v0.1 lacked the Resume Presented milestone and trustworthy start timestamps.
- No cloud synchronization, authentication, application submission, tracker writes, or live Thinking Graph/Drive access.
- Export **JSON or CSV** to preserve event provenance, timestamp sources, measured elapsed intervals, optional active minutes, and subjective feedback. Treat exports as personal/private; they may contain the excerpt or locator you entered. CSV string values are protected against accidental spreadsheet formula interpretation on open.
- User-provided evidence locators are not independently verified. A READY-to-SUBMIT declaration does not confer ATS authority. No time savings or personal value is objectively proven by the elapsed duration.
- Avoid entering sensitive names, credentials, detailed resumes, or recruiter details in this public demonstration. Local records can be accessed by other users of the same browser profile, and are not encrypted by this page.

## Review / test matrix

| Test | Expected behavior |
| --- | --- |
| Open illustrative example | First checkpoint has **Not measured** start; no synthetic interval |
| Click Start checkpoint now | Current start timestamp saved; timer shows elapsed interval |
| Record each milestone | `began_at`, `ended_at`, elapsed milliseconds, and source recorded; next stage begins at prior accepted end |
| Answer No to trust | HOLD retained; no state advancement; correction required for later acceptance |
| Answer No to continuity | Improvement note retained without automatic HOLD |
| Resume Presented followed by Ready to Submit | Dedicated presentation-to-eligibility duration appears independently of submission time |
| Historical 10-day review | 10 days of **wall-clock** time are shown; active minutes remain separate |
| Record after the fact | User-entered occurred-at and browser logged-at retained separately |
| Invalid chronology | Future or pre-start event rejected; no false transition |
| Ready to Submit without human approval | Blocked |
| Submission without confirmation locator | Blocked |
| Download CSV/JSON | Timestamp/feedback fields included with provenance labels |
| Reload, then continue | Existing intervals reconstruct from stored timestamps, not a running background task |
| Narrow-screen review | Responsive layout without horizontal overflow |

Locally executed browser interaction tests covered the normal flow, HOLD and correction, approvals, receipts, a ten-day historical interval, timestamp provenance, and a mobile viewport. This document does not establish employer-facing workflow integration or externally validated business impact.

**Scope restriction:** Linked only from the Basic View; not added to the enhanced demo library, the separate website showcase, or proamlabs.org. The existing v0.1 remains intact.