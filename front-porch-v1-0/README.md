# Front Porch — Master Component v1.0 + POS-Lite handoff

[Open Front Porch](https://jcholman.github.io/proam-labs-demos/front-porch-v1-0/) · [Open POS-Lite v0.35](https://jcholman.github.io/thinking-graph-arena/pos-lite/)

Recovered from the master HTML component in the saved “Front Porch to Website · Logo Design Feedback” conversation, August 6, 2026. Private conversation content is not published.

## November 7 integration

- Orientation question updated to “What are we going to do, now?”
- Enter POS-Lite opens the verified POS-Lite v0.35 demo in the same tab.
- Example prompts fill the starting context; Enter also activates the handoff.
- Starting context is placed in sessionStorage on the shared jcholman.github.io origin, never in URL parameters. POS-Lite displays it as plain text, separate from fixtures. Context expires after one hour and can be cleared there. No server API receives it.
- Minor viewport adjustments keep the added handoff controls reachable.

Original cinematic, standard, and static SVG modes remain available. The Git history preserves the recovered original.

## Boundaries

This connects two static prototypes. It does not add AI interpretation, registration, durable context storage, automatic fixture matching, Thinking Graph ingestion, or real output execution. Future POS-Lite hosting on another origin requires a new handoff contract; sessionStorage does not cross origins.
