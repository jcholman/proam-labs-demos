# POS-Lite v4.0_shell — Option A implementation v0.2

**STATUS:** CANDIDATE / FRONTEND SHELL ONLY / NO MODEL EXECUTION / NOT QUALIFIED  
**Authority:** Alpha — Human Product Owner  
**Created:** November 25, 2026

## Why a separate version?

The existing POS-Lite v0.35 remains unchanged in `jcholman/thinking-graph-arena/pos-lite/`. This successor shell resides in `jcholman/proam-labs-demos/pos-lite-v4-0-shell/` **on the same origin as the Athena Integrity Agent Front Porch**. Its purpose is to permit a narrow, reviewable browser-session handoff without passing private observation text in a URL.

This is a new *candidate shell*, not an upgrade or deployment of POS-Lite v0.35's full queue, metrics, or Thinking Graph integration. Existing v0.35 prototype remains separately accessible and continues to document historical capability.

## Architecture

```text
Athena Front Porch (same GitHub Pages origin)
  └── Explicit "Continue to POS-Lite" click
      └── sessionStorage handoff (15-minute freshness limit; 3000-character limit)
          └── POS-Lite v4.0_shell
              ├── Record original observation (explicit user action)
              ├── Tab-local candidate history and append-only revisions
              ├── Run Standard  [DISABLED — no backend]
              ├── Run Athena    [DISABLED — contracts not frozen or bound]
              ├── Run Both      [DISABLED — neither condition executes]
              ├── Inspect candidate request envelopes [LOCAL ONLY]
              └── Preview AT-01 side-by-side UI [SYNTHETIC FIXTURE ONLY]
```

## November 26: Logo display correction

The same `showcase/assets/proam-logo.png` is used in POS-Lite v0.35 and this shell. The image is **opaque (not an alpha-transparent source)** and displays white square corners when rendered unmasked in v4.0_shell. POS-Lite v0.35 presents it in a circular frame. The v4.0_shell header now applies a centered CSS circular clip and transparent background to restore the established presentation without altering the original logo asset. The source PNG was not modified or replaced by an invented emblem. Human mobile approval remains pending.

## What actually works

- User-triggered same-origin handoff through `sessionStorage`.
- Source text is transferred verbatim and shown for review; **never auto-submitted**.
- Append-only candidate records with identifiers, timestamps, and revision pointers.
- Browser-tab session storage and local export. Do not claim long-term or cross-device persistence.
- Static responsive preview of a fictional side-by-side comparison; both sides conspicuously labeled **NOT AI OUTPUT**.
- Display the would-be Standard and Athena request envelopes as JSON, with both conditions tied to the same observation ID and text.
- No external requests. A restrictive `connect-src 'none'` Content Security Policy prevents accidental model API invocation from this page.

## What remains intentionally unimplemented

- Secure model execution backend and provider authentication.
- Frozen, verified Athena Agent Profile and Operating Contract injection; no Qualification Suite is injected into Athena.
- Actual Run Standard, Run Athena, or Run Both behavior; buttons remain disabled.
- Comparison of actual independent response outputs and automatic differences.
- Persistent observation records, access control, revocation, and real cross-role handoffs.
- Qualified Thinking Graph assimilation or canonical promotion.
- AT-01 independent agent behavior qualification and human-value measurement.

## Future request envelope / Switching Quarterbacks

Provider selection is independent of agent condition. A single frozen observation may be evaluated under multiple *conditions* and *providers*. For an initial controlled comparison, hold provider, model, tools, and input context equivalent across Standard and Athena:

- `observation`: immutable ID and verbatim source text
- `condition`: `standard` or `athena`
- `model`: provider ID, model ID and runtime version (unbound in this candidate)
- `contract`: Profile and Operating Contract frozen revision identifiers only for Athena
- `authorization`: exact scope, tools and data grants
- `output`: observed output, errors, trace, and any artifact references
- `qualification`: evaluator receipt, independent of candidate generation
- `continuity`: what changed, unresolved questions, original source pointer

Potential providers include OpenAI, Gemini, Claude and local models, **not current integrations**. Do not assume identical provider capabilities. If one execution fails, preserve the other's actual result and error separately.

## Privacy and source boundaries

Do not enter personal, sensitive, confidential, or private information in this public candidate prototype. Session data is stored locally in the user's browser tab only; local export may contain the user's input and should be reviewed before sharing. No document in Google Drive is automatically loaded by this website. GitHub holds public code/fixtures, **not original private observations**.

The Google Drive folder `00.00 proAM Labs Data Integrity Agents` remains the candidate agent-contract source. The Thinking Graph has its own separately qualified assimilation path. `Record observation` here is **NOT** LAND, qualification, or canonization.

## Human acceptance checklist

- [ ] Original v0.35 demo remains unchanged
- [ ] Original Front Porch v1.0 remains unchanged
- [ ] Athena Front Porch's final teal helmet is small and top-right; intro helmet still transitions gold→white→teal
- [ ] On iPhone, entering a synthetic observation and choosing Continue opens POS-Lite v4.0_shell with the exact same text
- [ ] Handoff does not send text through URL parameters
- [ ] Recording creates one candidate, session-local observation and readback works
- [ ] Revision creates a new candidate and preserves the first
- [ ] Run Standard / Athena / Both are visibly disabled
- [ ] The synthetic comparison is explicitly NOT an AI response
- [ ] Clearing the session is user-confirmed
- [ ] No private credentials, direct LLM API calls, or automatic Thinking Graph writes
- [ ] Public links in both Basic and Enhanced Demo pages are correct

## Next gates

1. Human mobile visual and handoff acceptance.
2. Freeze accepted contract versions and verify their source fidelity.
3. Design an authenticated provider-agnostic execution backend.
4. Add independent execution under matched conditions.
5. Run AT-01 and preserve observable evidence in Google Drive.
6. Independent reviewer disposition; no canonical promotion without authorization.
