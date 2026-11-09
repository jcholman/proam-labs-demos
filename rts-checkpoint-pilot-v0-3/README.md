# Resume-to-Submission · Checkpoint & Personal Continuity Pilot v0.3

**Status:** Independently versioned, static GitHub Pages **demo** for a bounded personal RTS pilot. Not a production resume system, employer application service, autonomous time tracker, canonical RTS tracker, or audited measurement system.

- [Launch interactive v0.3 demo](https://jcholman.github.io/proam-labs-demos/rts-checkpoint-pilot-v0-3/)
- [Basic View](../README.md)
- [v0.2 prior version](../rts-checkpoint-pilot-v0-2/), preserved unchanged

## Source-backed gallery and public proof-of-work supplement (November 9, 2026)

The existing URL now defaults to a **read-only tracker-backed workspace** rather than an empty Illustrative RTS opportunity. Select among the five opportunity records from the public, anyone-with-link Viewer RTS Inventory. Google Sheets is queried from the browser when available; a published, dated JSON snapshot is an explicitly marked fallback.

The original localStorage-driven eight-checkpoint experiment is **not deleted or synchronized**. Switch to **Local checkpoint measurement pilot** to see its independent forms and local timeline. The tracker mirror shows only what the source establishes: accepted checkpoints for Humana R-425570, historical stages for earlier opportunities, owner-reported submission claims without receipt verification, and NOT_MEASURED where timing evidence is missing. Jack's unresolved role remains blocked; Advantage Tech's GEHA-named resume mismatch is not silently promoted. No ATS action, tracker write, fabricated receipt or inferred authorization is implemented by the public site.

- [Open connected v0.3 tracker workspace — Humana R-425570](https://jcholman.github.io/proam-labs-demos/rts-checkpoint-pilot-v0-3/?case=R-425570#rtsTrackerMirror)
- [Open print-friendly portfolio companion (optional resume supplement)](https://jcholman.github.io/proam-labs-demos/rts-checkpoint-pilot-v0-3/proof-of-work.html?case=R-425570)
- [Read source RTS Inventory](https://docs.google.com/spreadsheets/d/14LChbwEP7Ugd2tUbSqKuGFInVPECnb78Jb6wTnyzh5M/edit?gid=1043935481)

Portfolio maturity language: the webpage demonstrates a working prototype and read-only file navigation; the LLM-assisted employer-thread workflow, not this browser application, produced the resume versions. Individual source documents, code and employer outcomes need their own assurance.

## Why v0.3 exists

The primary process starts when the **opportunity / job description is presented**. The primary clock **does not** begin when a resume draft is shown or submitted. A resume is a derivative artifact within the larger process; external placement and outcomes are distinct later states.

The eight pilot checkpoint stages, in order:

| # | Milestone | Meaning / evidence boundary |
|---|---|---|
| 1 | `OPPORTUNITY_PRESENTED` | JD first received/opened; starts primary and end-to-end clocks; source locator required for pilot event. **No canonical folder yet.** |
| 2 | `QUALIFIED_TO_WORK` | Identity and pursuit qualification; canonical opportunity folder becomes appropriate under existing RTS operating rules. |
| 3 | `ALIGNMENT_REVIEWED` | JD requirements compared with candidate evidence; known gaps remain explicit. |
| 4 | `RESUME_PRESENTED` | Derived candidate resume supplied for review; starts *secondary* resume-review clock. |
| 5 | `RESUME_VERIFIED` | Resume reviewed for accuracy, provenance, and suitability. |
| 6 | `READY_TO_SUBMIT` | Candidate's explicit human approval; **ends primary clock**. Does not apply for a job. |
| 7 | `SUBMISSION_VERIFIED` | Actual application and user-entered receipt reference; **ends end-to-end clock**, not an outcome. |
| 8 | `OUTCOME_OBSERVED` | Record observed follow-up/interview/rejection/offer/withdrawal or other evidenced outcome. |

These are pilot display checkpoints, not a replacement for the richer canonical RTS lifecycle. The demo does not create folders, persist resume artifacts, validate external receipts, or change existing trackers.

## The three time windows (and per-checkpoint measurement)

1. **PRIMARY:** Opportunity / JD Presented → Ready to Submit: elapsed **calendar** time between `tracking_started_at` and the accepted `READY_TO_SUBMIT` event. This includes research, waiting, interruptions, overnight periods, and corrections. This is the cycle-time KPI for the personal pilot.
2. **END-TO-END:** Opportunity / JD Presented → Submission Verified: elapsed calendar time ending at the user-attested submission event and reference.
3. **SECONDARY:** Resume Presented → Ready to Submit: elapsed calendar time of resume review, corrections, and readiness approval. This is *not* the starting point of the workflow.

Each completed checkpoint also records `began_at`, `ended_at`, `elapsed_ms`, timestamp provenance, and `logged_at`. For the first event, `OPPORTUNITY_PRESENTED.occurred_at` uses the recorded presentation timestamp (not the later survey completion time). Later checkpoint intervals begin at the preceding accepted milestone and end at the new accepted milestone. HOLD events preserve interval progression without changing the accepted stage.

**Crucial distinction:** These are **wall-clock durations**, not automatically measured active work time, money saved, or causal benefit. Active effort minutes and time saved/extra time remain optional **separately self-reported** values. Browser-derived times assume the device clock is reasonable; it is not externally verified.

## Beginning the pilot correctly

- Start a **new opportunity** when a job description is actually presented. This creates only a local demo record—no canonical folder or external resource.
- Immediately press **Record JD presentation time now**, or use **Set historical JD presentation time** when you can provide the earlier actual time. Earlier entered timestamps are labeled `USER_ENTERED_HISTORICAL` and retain their later `logged_at` time.
- Supply a source reference (URL, conversation ID, or short reference) and answer two lightweight trust/continuity questions, or choose *Record without survey* (both `skip`, not Yes) at the first milestone.
- Record each subsequent milestone and source locator where available. A readiness checkbox is required for `READY_TO_SUBMIT`, while a receipt reference is required to mark `SUBMISSION_VERIFIED`.
- Do not infer a submission, job outcome, consent, or qualified artifact from a generated resume or a checkbox alone. The source link is not independently validated.

## When an opportunity should not be pursued

A job that is not a fit should not need a resume or a submission. The active case includes **Defer / revisit later** and **Decline / do not pursue**. These preserve dated `DISPOSITION` events and stop the displayed running clock; they **do not count as `ACCEPTED` milestones**. Reopening appends a `REOPENED` event and returns the case to its actual stage. Since the duration is calendar elapsed, any deferral time is included if the opportunity is later pursued. A negative trust answer still creates a separate `HOLD` and requires a documented correction before acceptance. Negative personal continuity is retained as an improvement signal without automatically blocking.

## Human feedback: 2 questions at each meaningful checkpoint

1. **Is the information presented trustworthy and fit for your particular personal purpose?** Yes / No / Skip. No opens a quoted excerpt and correction context box and creates `HOLD`.
2. **Did this checkpoint materially improve your personal continuity?** Yes / No / Skip. No opens optional improvement context without an automatic block.

A completion pulse at `SUBMISSION_VERIFIED` asks whether this workflow saved time, took extra time, was about the same, or is unknown. Time saved/extra minutes are user estimates only.

**Lightweight principle:** no unnecessary forms, no mandatory narrative for the positive path, no automatic survey answers, and no requirement to continue a task that has been deferred or declined. The log exists to support work rather than displace it.

## Local storage and export

- Browser `localStorage` key: `proam-rts-checkpoint-pilot-v0-3`. v0.1/v0.2 remain independent, not automatically migrated, so older measurements cannot silently be reinterpreted under a changed clock definition.
- JSON and CSV exports include milestone identity, event kind, timestamps and provenance, interval elapsed time, human trust and continuity feedback, optional active time/estimated time saved, disposition and corrections. CSV escapes formula-leading values.
- **No cross-device sync or server storage**: clearing the browser can remove data. Export at the end of each pilot session. Avoid sensitive names, identifiers, resume content, or recruiter information in this demo or shared exports.
- Browser-local storage is not guaranteed private from other users of the same device/browser profile; avoid confidential data.
- The official logo is reused at `../continuity-search-v0-1/assets/proam-emblem.png`; no new logo, external scripts, preview-CDN, third-party tracking or build dependencies.

## Verification performed for v0.3

- Eight stages in correct order, with distinct opportunity and resume presentation events.
- First-stage action requires an opportunity presentation timestamp; a job-description source reference is required.
- Test of negative trust triggering HOLD, mandatory correction before advancement, and negative continuity retaining an observation.
- Readiness human-approval declaration and submission receipt reference validation.
- Completed lifecycle and the optional user-estimated time impact.
- Defer, reopen, and decline preserve events and do not fabricate a submission.
- Historical 10-day JD-to-ready scenario and separate 7-day resume-to-ready scenario; preserves the entered occurrence date separate from the actual logging time.
- Browser-side JavaScript syntax, responsive mobile rendering, and no horizontal overflow; no browser script exceptions in tests.

These are browser/synthetic tests. GitHub Pages deployment verification and human acceptance are separate checks. Measurement efficacy, user savings and persistence across devices are **not** validated by synthetic tests.

## Governance and extension

Basic View link only: do not add this v0.3 pilot to the enhanced demo library, website showcase, proamlabs.org or canonical RTS tracker. No Thinking Graph/LAND changes. A later approved integration could record events in a governed store, auto-observe real task handoffs, and compare measured active time against user estimates. **Capability ≠ Authorization.**