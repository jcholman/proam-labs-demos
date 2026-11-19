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
- Find Support: 31 source-backed records (21 baseline + 4 subsequent VA program/benefit entries + six FY2027 GPD provider awardees). All GPD bed numbers are funded-bed records, NOT available vacancies. Provider intake and eligibility unconfirmed.
- Your Community: 16 synthetic event fixture records in the November 2026 example dataset; any cards, metrics, chronology, and insight examples derived from them remain synthetic. No live community event feed.
- VET TEC 2.0: source-verified 2026-11-16 and listed in the concept website directory, not provider-confirmed; see `candidates/va-vet-tec-2.candidate.json` for record and publication history. All resource cards now offer a direct provider website link as well as dated evidence in expandable details.

## Synthetic-to-real migration
1. Discover the potential real resource/event and preserve official source URL, effective dates, source review timestamp, geography, provider and program version.
2. Reconcile against existing records, including superseded programs or duplicate event listings. Do not create a “new” resource just because a current source mentions it.
3. Qualify real-world source assertions independently of availability and individual eligibility. Put uncertain or contradictory claims on HOLD/RECHECK; do not silently repair them.
4. Require explicit review/authorization before publication; mark source-backed material as **availability unconfirmed** unless the current availability evidence supports more.
5. Replace the synthetic card on the *consumer surface* only when a qualified real record serves the same purpose. Keep fixtures in a separate TEST/QA dataset for demonstrative/regression use rather than deleting the historical evidence or passing synthetic metrics off as real observations.
6. Never combine synthetic and real counts into unqualified community statistics. Label mixed displays by origin and source review date; do not project synthetic trends onto real community needs.

**Boundaries:** Capability ≠ authorization; official source review ≠ provider confirmation; real-world source ≠ current availability; evidence ≠ eligibility; publication ≠ referral.

## Additional reconciliation (2026-11-16)
- VGLI premium holiday is an effective-date-bound change to an existing insurance program (November 1, 2026–January 31, 2027); not a separate permanent new VA program. Policy eligibility requires personal verification.
- SSVF and GPD are distinct, actual VA-funded housing service programs. FY2027 grant announcements do not prove individual providers are accepting applicants or have open beds.
- VA Louisville reported $32,891,584 awarded to 17 organizations on September 15, 2026; awardees and current intakes remain a separate local reconciliation task, not 17 public resource cards.

## Six reconciled local FY2027 GPD awardees (2026-11-16)
Four Louisville VA awardees plus Deans House (Elizabethtown) and Fire Mission Ministries (Shelbyville) are listed with award FAIN, funded beds, official provider URL and source date. Provider website/legal entity matching for Dean’s House and Fire Missions remains provisional. These records do not imply partnerships, open housing placements, or individual eligibility. The VA award funding announcement remains a separate background record. Synthetic community event fixtures remain separate.

## Real-life default for Your Community (2026-11-16)
Five verified, dated organizer listings are added: three local LFPL in-person events and two virtual Hiring Our Heroes events. Public view defaults to real-life only; users can include virtual records by unchecking in-person-only. Synthetic fixtures (16) remain for QA via explicit `?qa=1` option. They are excluded before metrics, map, insights and cards are calculated. No JavaScript fallback lists only real source-backed activities. Official event URLs are directly linked from individual real-world cards. This is a source-reviewed snapshot, not a live event feed or registration guarantee.

## Louisville Free Public Library service review (2026-11-16)
- Added 12 individual source-backed LFPL service/access cards as records 32–43. Each has an official `lfpl.org` outbound link, dated source, card/cost/access constraints, `SOURCE_VERIFIED` origin and unconfirmed live availability.
- LFPL Job Seekers is a library-curated gateway and is not duplicated as separate KentuckianaWorks or Kentucky Career Center services already in the catalog.
- Library services and date-specific LFPL events in Your Community remain separate record families; 16 synthetic events remain reserved for QA only, outside real-life counts.
- Library card access depends on Jefferson County ties or a paid card for certain neighboring counties; LinkedIn Learning requires an LFPL card in good standing. LFPL reports the temporary Computer Center at 721 S Brook and its restricted weekday hours. Candid research is marked **in-library only**. Meeting rooms prohibit fundraising/commercial solicitation and require approval; exam proctoring is requested at least five days ahead.
- Real, source-verified does not mean currently bookable, personally eligible, partnered, guaranteed or provider-confirmed. No individual patrons were profiled or referred.

## LFPL source-to-register delta — November 19, 2026

Four previously unlisted LFPL service pathways were source-reviewed and added: branch computer/Wi-Fi access; printing, copying and free faxing; Ask a Librarian reference assistance; Small Business Reference Center. The existing temporary Computer Center was linked to the separate all-branch computer offering. Meeting-room publicity restrictions were added to the existing card. Original IDs and the other 41 records remain unchanged. New total: **47 Find Support records, 16 LFPL services**.

This is a source-backed concept directory, not an active referral or eligibility service. Provider-published fees, hours, access rules and response expectations are dated observations rather than guaranteed current availability. No provider contact, participant record or editorial page was changed.
