# Continuity Value Explorer v0.1

A static, browser-local, mobile-responsive demonstration of a **hypothesis about the potential value of recovered organizational context**. It visually follows the proAM Labs “Find Your Thread” demo and reuses the identical emblem already committed at `../continuity-search-v0-1/assets/proam-emblem.png`.

[Open rendered interactive preview](https://raw.githack.com/jcholman/proam-labs-demos/main/continuity-value-v0-1/index.html) (served from this public repository through a third-party static preview CDN). [View HTML source](./index.html). No build tool, authentication, app analytics, application backend, or live Thinking Graph data is required. The third-party preview host can receive standard requests and access logs; calculator inputs stay browser-local.

## Assumptions and model

Default illustrative inputs (not empirical observations):

| Variable | Default | Meaning |
|---|---:|---|
| People affected | 100 | Number of potential beneficiaries |
| Minutes recovered/person/day | 15 | Incremental time saved relative to the existing baseline |
| Fully loaded labor cost | $75/hour | Cost proxy, not salary or product revenue |
| Applicable workdays/year | 220 | Days when the savings might recur |
| Value realization | 60% | Adoption, usable recovery, and conversion into useful capacity |
| Annual operating cost | Unknown (blank) | No automatic zero assumption |
| One-time implementation cost | Unknown (blank) | No automatic zero assumption |

```text
annual_productive_hours =
  people * (minutes_per_person_per_day / 60) * workdays * (realization_pct / 100)

annual_gross_recovered_capacity_value =
  annual_productive_hours * fully_loaded_hourly_cost

ongoing_annual_net_capacity_value =
  annual_gross_recovered_capacity_value - specified_annual_operating_cost

year_one_net_capacity_value =
  annual_gross_recovered_capacity_value
  - specified_annual_operating_cost
  - specified_one_time_implementation_cost
```

The initial example yields **3,300 hours** and **$247,500 in annual gross recovered-capacity value**, not cash savings or a product valuation. Net outputs remain unmodeled until the necessary costs are entered; blank is distinct from explicit zero.

## Interpretation boundary

- The calculator is **illustrative** and does not establish that proAM Labs or the Thinking Graph has saved any measured time.
- Time recovered is not automatically realized payroll reduction, revenue, or willingness to pay.
- Annual cost inputs should account for licensing, integration, upkeep, evidence qualification, human review, security, and change management.
- Personal well-being, confidence, retention, decision quality, avoided risk, and other non-time benefits are **not monetized** in this version.
- Inputs stay in the browser and are not persisted. The download action creates a local plain-text scenario. It makes no claims of proof of value, profitability, or product-market fit.
- The demo does not connect to canonical evidence, qualifications, organizational data, a Thinking Graph, or live production services.

## Potential extension

The `calculateValue` function in the HTML is a deterministic, UI-independent calculation boundary. A future website implementation may separate the model into a shared module, add validated organization-specific inputs, compare against measured baselines, incorporate uncertainty ranges, and version scenarios. Those enhancements require independent evidence and explicit authorization; this public demo should not be used as a financial planning assurance.

## Suggested verification

1. At default values, check annual hours = 3,300 and gross capacity value = $247,500.
2. Set minutes or realization to zero; gross value should become $0.
3. Leave a cost blank; year-one net must remain “Not modeled.”
4. Enter $40,000 annual and $80,000 implementation costs; ongoing annual net = $207,500 and year-one net = $127,500.
5. Reset, then download the scenario. Confirm that the disclaimer and assumptions are retained in the text file.
6. On a mobile screen, verify sliders, cost fields, navigation, and summary wrapping.

No real customer outcomes or nonpublic organizational information are used.