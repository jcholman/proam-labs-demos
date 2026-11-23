# Interface Continuity Telemetry — candidate v0.1

Status: SCHEMA DEFINED; CENTRAL INGESTION NOT DEPLOYED OR VERIFIED.

## Boundaries
GitHub Pages is a static host. Do not embed Google OAuth tokens, service-account keys, Drive credentials, or a writable Drive URL in client-side JavaScript. A separate protected server-side endpoint must validate and write to the governed Google Drive folder. Until deployed, retain the existing local-only diagnostics; do not claim centralized delivery.

Google Drive target folder: 1l9BTpqtL7TJ4MCkoAkPiX7Dm04pgAHdH

## Allowed event JSON
{
  "schema_version":"0.1",
  "event":"next_step_written",
  "timestamp":"2026-11-23T00:00:00.000Z",
  "surface":"conceptualists",
  "build_version":"candidate",
  "browser_family":"Safari",
  "os_family":"iOS",
  "device_category":"phone",
  "context_present":true,
  "context_length_bucket":"1-500",
  "result":"success",
  "error_code":null
}

Allowed events: plan_created, next_step_written, front_porch_received, front_porch_animation_complete, pos_lite_transfer, pos_lite_arrival, handoff_error.
Allowed result: success, failure, unknown.
Allowed context length buckets: 0, 1-500, 501-2000, 2001-5000, 5000+.
No raw context, query strings, referrers, IP addresses, names, precise phone models, persistent IDs, full user-agent strings, or stack traces. Avoid cookies or fingerprints. Browser transport inevitably exposes source IP to hosting infrastructure; collector must not persist it.

## Collector contract
POST /v1/interface-events with JSON <= 2KB; allowlisted event fields and CORS origin; rate limit; reject unexpected fields; no credentials in frontend. Use a server-side Google OAuth/service account credential scoped to the destination. Restrict Drive folder access, define retention/deletion, record failed writes, test mobile Safari and in-app browsers. Cross-origin events cannot be guaranteed to arrive, so best-effort with bounded retry and local failure status. No visitor login or SAML.

## Acceptance
1. End-to-end test Conceptualists -> Front Porch -> POS-Lite.
2. Verify all checkpoints land in Drive.
3. Verify no user-authored text or identifying headers are stored.
4. Verify blocked network does not interrupt visitor workflow.
5. Verify retention, restricted access, and deletion.
