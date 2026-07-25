# 003 — Vinny Editorial Intelligence System Architecture v2.0

**Project:** Out in the Vines  
**System:** Vinny Intelligence  
**Version:** 2.0  
**Status:** Authoritative implementation specification  
**Owner:** Andrew Mason, Founder & Editor-in-Chief  
**Supersedes:** Vinny Editorial Intelligence System — Minimal AI-Native Architecture  
**Companion documents:**
- 001 — Vinny Intelligence Constitution & Operating Blueprint v1.0
- 002 — Vinny Knowledge Taxonomy v1.0

---

# 1. Purpose

This document is the definitive technical architecture for Vinny Intelligence v1.

It merges:

1. the approved seven-table AI-native architecture
2. the Vinny Constitution and editorial governance model
3. the stable Knowledge Taxonomy
4. the approved claim types and claim lifecycle
5. adaptive staleness
6. public Welcome labels
7. Vinny Wisdom
8. prompt-retention rules
9. the human publication boundary
10. compatibility with the canonical Winery Profile JSON

This document should be treated as an implementation specification, not a brainstorming document.

Bolt and future engineering systems may identify technical conflicts, security risks, or migration concerns. They should not redesign the editorial philosophy, taxonomy, specialist responsibilities, or human approval model without explicit approval.

---

# 2. Architecture Principles

## 2.1 Claims, not facts, are the unit of discovery

AI specialists do not discover truth directly.

They create claims that may be:

- supported
- contradicted
- contextualized
- stale
- incomplete
- approved
- rejected
- superseded

An approved claim is accepted internal knowledge. It becomes public only when included in a human-published profile version.

```text
Observation
↓
Claim
↓
Evidence
↓
Confidence and conflict assessment
↓
Human editorial decision
↓
Approved knowledge
↓
Draft profile
↓
Human publication
↓
Public profile
```

## 2.2 The public profile is the publication boundary

The website and future mobile app read only complete published profile snapshots.

They do not query:

- claims
- sources
- evidence
- editorial decisions
- specialist runs
- private Welcome assessments
- Vinny Wisdom

The canonical Winery Profile JSON remains the public contract.

## 2.3 AI prepares; humans publish

AI specialists may discover, extract, compare, validate, score, draft, and recommend.

AI specialists may not:

- approve or reject claims
- create editorial decision records
- publish a profile
- retire a live profile
- roll back a profile
- alter Welcome methodology
- invent taxonomy keys
- delete editorial history

## 2.4 Stable meaning is separate from presentation

Claims use a stable semantic `attribute_key`, such as:

```text
visit.policy.dogs
visit.hours.tasting_room
welcome.signals.pride_participation
accessibility.mobility.step_free_entry
```

A separate optional `profile_path` describes where that approved knowledge currently appears in the canonical JSON.

```text
attribute_key = visit.policy.dogs
profile_path  = practical.policies.dogs
```

The interface may change without invalidating claim history.

## 2.5 The system fails closed

When evidence is absent, conflicting, stale, or ambiguous:

- public knowledge is not silently changed
- current published content remains live
- AI does not manufacture a replacement
- the issue is sent to human review or research

## 2.6 Generalize the intelligence platform; specialize the domain

The core architecture should remain reusable for future destination knowledge.

Wine, winery visits, Welcome methodology, and Temecula-specific vocabulary are domain layers on top of the general claims-and-evidence system.

---

# 3. System Boundaries

## 3.1 Private intelligence boundary

Never publicly readable:

- `sources`
- `claims`
- `claim_evidence`
- `editorial_decisions`
- `specialist_runs`
- internal taxonomy metadata
- internal Welcome scoring
- confidence rationales
- source excerpts
- prompt and model output
- Vinny Wisdom patterns

## 3.2 Publication boundary

The only public winery intelligence is the latest human-published row in `winery_profile_versions`.

## 3.3 Application boundary

### Public website and future app

May:

- list active wineries through approved public endpoints
- retrieve latest published profile JSON
- use published profile information for public recommendations

May not:

- query private tables
- mutate editorial data
- receive service-role credentials
- expose internal source material

### VI HQ

Authenticated editorial application that may:

- review claims
- inspect evidence
- record decisions
- preview profile diffs
- publish
- retire
- roll back
- manage approved taxonomy changes

### Specialist Edge Functions

Server-controlled functions that:

- call AI models
- validate structured output
- perform narrowly scoped database actions
- never expose database secrets to the model

---

# 4. Core Architecture

Vinny v1 has **seven core operational tables**:

1. `wineries`
2. `sources`
3. `claims`
4. `claim_evidence`
5. `editorial_decisions`
6. `winery_profile_versions`
7. `specialist_runs`

A machine-readable taxonomy registry is also required. It is configuration infrastructure rather than an eighth editorial workflow table.

The recommended registry design is hybrid:

- version-controlled JSON is the authoritative source definition
- a synchronized database registry supports runtime validation, filtering, and VI HQ

This preserves the conceptual seven-table model while giving the system an enforceable vocabulary.

---

# 5. Relationship Model

```text
wineries
├── claims
│   ├── claim_evidence ── sources
│   └── editorial_decisions
├── winery_profile_versions
│   └── editorial_decisions
└── specialist_runs
    ├── produces claims
    ├── produces evidence
    └── produces draft profile versions

taxonomy registry
└── validates claims.attribute_key, value_type, claim_type,
    visibility, allowed values, and staleness defaults
```

Key relationships:

- one winery has many claims
- one winery has many profile versions
- one winery has many specialist runs
- one claim has many evidence relationships
- one source may support many claims
- one claim may have multiple editorial decisions over time
- one profile version may have review and publication decisions
- one specialist run may create many claims and evidence records
- claims may self-reference conflicts and supersession

---

# 6. Table Specifications

## 6.1 `wineries`

### Purpose

Master identity record for each winery.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `slug` | text | Yes | Unique stable public identifier |
| `display_name` | text | Yes | Current public-facing name |
| `official_name` | text | No | Legal or official name |
| `region` | text | No | Current region label |
| `operating_state` | text | Yes | Entity-level state, not claim type |
| `created_at` | timestamptz | Yes | Default now |
| `updated_at` | timestamptz | Yes | Default now |

### Allowed `operating_state`

```text
draft
active
inactive
archived
```

Temporary closures, renovation, rebranding, and similar conditions belong in claims with claim type `operational_advisory`, not in the entity lifecycle field.

### Constraints

- unique `slug`
- no AI specialist may create or activate a winery automatically
- proposed new wineries require identity resolution and human confirmation

---

## 6.2 `sources`

### Purpose

Record each distinct information retrieval or firsthand evidence event.

A URL is not itself a source record. Each meaningful retrieval creates a time-stamped source record so the system can distinguish what was seen and when.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `winery_id` | uuid | No | Optional direct association |
| `source_type` | text | Yes | Controlled vocabulary |
| `url` | text | No | Nullable for calls, email, visits |
| `title` | text | Yes | Human-readable source name |
| `publisher_or_owner` | text | No | Source owner |
| `excerpt_or_summary` | text | No | Small evidence text stored in Postgres |
| `storage_path` | text | No | Large raw content in Supabase Storage |
| `content_hash` | text | No | Duplicate and change detection |
| `retrieval_metadata` | jsonb | Yes | HTTP state, capture metadata, etc. |
| `observed_at` | timestamptz | No | When the underlying event occurred |
| `retrieved_at` | timestamptz | Yes | When Vinny accessed it |
| `created_by_run_id` | uuid | No | Provenance |
| `created_at` | timestamptz | Yes | Default now |

### Initial `source_type` values

```text
official_website
official_reservation_system
official_event_page
official_social
official_policy
direct_email
direct_phone_call
firsthand_visit
tourism_board
local_news
trusted_partner
review_platform
community_report
guest_social_post
historical_snapshot
other
```

### Storage rule

Store in Postgres:

- source metadata
- relevant excerpt
- concise transcript
- human summary
- hashes and retrieval information

Store in Supabase Storage:

- full HTML captures
- PDFs
- menus
- full screenshots
- large transcripts
- images
- video
- raw model-input packages

---

## 6.3 `claims`

### Purpose

Store individual statements about a winery that may or may not be accepted as true.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `winery_id` | uuid | Yes | Winery subject |
| `attribute_key` | text | Yes | Stable approved taxonomy key |
| `profile_path` | text | No | Current canonical JSON mapping |
| `claim_type` | text | Yes | Approved controlled value |
| `value_type` | text | Yes | Approved controlled value |
| `claim_value` | jsonb | Yes | Structured asserted value |
| `claim_text` | text | Yes | Human-readable statement |
| `claim_origin` | text | Yes | How it entered the system |
| `status` | text | Yes | Claim lifecycle |
| `confidence_score` | numeric | No | 0.00–1.00 |
| `confidence_band` | text | No | low, medium, high |
| `confidence_rationale` | text | No | Private explanation |
| `conflicts_with` | uuid | No | Initial direct conflict link |
| `superseded_by` | uuid | No | Replacement claim |
| `specialist_run_id` | uuid | No | Provenance |
| `observed_at` | timestamptz | No | When it was true/observed |
| `last_verified_at` | timestamptz | No | Most recent confirmation |
| `base_staleness_days` | integer | No | Copied from registry |
| `dynamic_staleness_days` | integer | No | Adjusted monitoring interval |
| `stale_after` | timestamptz | No | Calculated next review point |
| `created_by` | uuid | No | Human creator where applicable |
| `created_at` | timestamptz | Yes | Default now |
| `updated_at` | timestamptz | Yes | Default now |

### Approved claim types

```text
fact
policy
observation
recommendation
score
event
relationship
operational_advisory
```

### Claim lifecycle

```text
pending
needs_research
verified
conflicting
approved
rejected
superseded
stale
```

### Lifecycle meanings

| Status | Meaning |
|---|---|
| `pending` | Newly created and not fully assessed |
| `needs_research` | Plausible, but evidence is insufficient |
| `verified` | Intelligence assessment complete; awaiting human decision |
| `conflicting` | Material unresolved contradiction exists |
| `approved` | Human accepted the claim as internal knowledge |
| `rejected` | Human declined the claim |
| `superseded` | Replaced by newer approved knowledge |
| `stale` | Too old or unstable to rely on without rechecking |

### Claim origins

```text
scout_discovery
watch_change
intelligence_assessment
human_entry
initial_import
editorial_derivation
```

### Value types

```text
boolean
text
integer
decimal
currency
date
datetime
time_range
duration
url
enum
multi_enum
geo_point
structured_json
```

### Required validation

Before insertion:

1. `attribute_key` must exist and be active in the registry.
2. `claim_type` must be permitted for that attribute.
3. `value_type` must match the registry.
4. enum values must be allowed.
5. unknown taxonomy keys are rejected and routed to a proposal queue.
6. AI may not silently create attributes.
7. duplicate checks must consider winery, attribute, normalized value, source, and lifecycle.
8. public Welcome label claims require human approval.

### Conflict behavior

Multiple claims may coexist for the same `attribute_key`.

Do not overwrite an approved claim when a new claim appears.

The new claim enters `pending` or `conflicting`, and the current published profile remains unchanged until human resolution and republication.

---

## 6.4 `claim_evidence`

### Purpose

Connect claims to evidence and describe how each source relates to each claim.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `claim_id` | uuid | Yes | FK |
| `source_id` | uuid | Yes | FK |
| `stance` | text | Yes | supports, contradicts, contextualizes |
| `excerpt` | text | No | Relevant source fragment |
| `evidence_strength` | numeric | Yes | 0.00–1.00 |
| `independence_group` | text | No | Detect copied/dependent sources |
| `notes` | text | No | Editorial context |
| `created_by_run_id` | uuid | No | Provenance |
| `created_at` | timestamptz | Yes | Default now |

### Evidence stance

```text
supports
contradicts
contextualizes
```

### Important rule

Evidence quantity is not automatically evidence strength.

Five reviews copying the same incorrect listing should not outweigh one current direct confirmation merely because five is greater than one.

The `independence_group` field helps Intelligence detect source dependence.

---

## 6.5 `editorial_decisions`

### Purpose

Immutable record of every consequential human editorial action.

This is the human audit trail.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `claim_id` | uuid | No | Claim decision target |
| `profile_version_id` | uuid | No | Profile decision target |
| `action` | text | Yes | Controlled value |
| `decision_notes` | text | No | Human reasoning |
| `edited_value` | jsonb | No | Proposed correction |
| `decided_by` | uuid | Yes | Authenticated human |
| `decided_at` | timestamptz | Yes | Default now |
| `created_at` | timestamptz | Yes | Default now |

### Initial actions

```text
approved
rejected
edited
deferred
superseded
published
retired
rolled_back
```

### Rules

- insert only
- never update
- never delete through normal application workflows
- AI specialists cannot insert
- every publication and rollback requires a decision record
- edits should normally create a corrected claim and preserve the original

---

## 6.6 `winery_profile_versions`

### Purpose

Store immutable complete snapshots of the canonical public Winery Profile JSON.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `winery_id` | uuid | Yes | FK |
| `version` | integer | Yes | Sequential per winery |
| `profile_json` | jsonb | Yes | Complete canonical profile |
| `schema_version` | text | Yes | Public contract version |
| `change_summary` | text | No | Human-readable diff summary |
| `validation_result` | jsonb | No | Schema and policy validation |
| `publication_status` | text | Yes | Lifecycle |
| `assembled_by_run_id` | uuid | No | Draft provenance |
| `published_by` | uuid | No | Human publisher |
| `created_at` | timestamptz | Yes | Default now |
| `published_at` | timestamptz | No | Publication time |
| `retired_at` | timestamptz | No | Retirement time |
| `rollback_source_version_id` | uuid | No | Previous snapshot used |

### Publication states

```text
draft
in_review
published
retired
```

### Constraints

- unique `(winery_id, version)`
- one published profile per winery
- only humans may change a row to `published`
- AI may insert drafts only
- published and retired profile JSON is immutable
- rollback creates a new version rather than reactivating an old row

---

## 6.7 `specialist_runs`

### Purpose

Store provenance and operational history for every AI specialist run.

### Recommended columns

| Column | Type | Required | Notes |
|---|---|---:|---|
| `id` | uuid | Yes | Primary key |
| `specialist` | text | Yes | Controlled value |
| `winery_id` | uuid | No | Nullable for cross-winery runs |
| `status` | text | Yes | running, completed, failed, cancelled |
| `prompt_template_version` | text | No | Stable prompt reference |
| `prompt` | text | No | Temporarily retained |
| `prompt_metadata` | jsonb | Yes | Model and run configuration |
| `model_output` | text | No | Temporarily retained |
| `output_metadata` | jsonb | Yes | Tokens, latency, cost, finish reason |
| `result_summary` | text | No | Permanent concise summary |
| `claims_produced` | integer | Yes | Default 0 |
| `evidence_produced` | integer | Yes | Default 0 |
| `drafts_produced` | integer | Yes | Default 0 |
| `error_message` | text | No | Failure detail |
| `retention_expires_at` | timestamptz | No | Prompt/output purge date |
| `started_at` | timestamptz | Yes | Default now |
| `completed_at` | timestamptz | No | Completion |
| `created_at` | timestamptz | Yes | Default now |

### Specialist values

```text
scout
watch
intelligence
editor
publisher
librarian
concierge
planner
sommelier
```

Traveler-facing specialists may use separate operational stores later, but the enum should be future-compatible.

### Run states

```text
running
completed
failed
cancelled
```

### Retention rule

Full prompt and raw model output should normally be retained for 90–180 days.

Keep permanently:

- prompt template version
- specialist
- model version
- execution metadata
- result summary
- claims and evidence produced
- profile draft references
- token use
- cost
- latency
- errors

A scheduled retention job should remove expired prompt and raw output content without deleting the run record.

---

# 7. Taxonomy Registry

## 7.1 Recommended hybrid design

### Authoritative source

Version-controlled file:

```text
config/vinny-taxonomy.v1.json
```

This is reviewed like source code and versioned with the application.

### Runtime registry

Synchronized database registry, preferably:

```text
vinny_attribute_registry
```

This is not part of the seven-table editorial lifecycle. It is configuration used to enforce vocabulary and validation.

### Required registry fields

| Field | Purpose |
|---|---|
| `attribute_key` | Permanent semantic identifier |
| `display_label` | VI HQ label |
| `description` | Meaning |
| `domain` | Top-level taxonomy domain |
| `value_type` | Required value shape |
| `allowed_values` | Enum or multi-enum values |
| `allowed_claim_types` | Permitted claim types |
| `visibility` | public, private, mixed |
| `default_staleness_days` | Base review window |
| `profile_path` | Current JSON mapping |
| `active` | Runtime availability |
| `deprecated_at` | Deprecation date |
| `replacement_attribute_key` | Migration target |
| `taxonomy_version` | Registry version |
| `created_at` | Audit |
| `updated_at` | Audit |

## 7.2 Governance

Allowed taxonomy operations:

```text
add
clarify
deprecate
replace
merge
split
```

Rules:

- live keys are not renamed without migration
- keys with history are never deleted
- deprecated keys remain readable
- replacement mappings are explicit
- AI can propose but not activate a key
- Welcome and accessibility taxonomy changes require human review
- profile mappings may change without changing attribute keys

---

# 8. Approved Knowledge Domains

The v1 registry may support these domains:

```text
identity
location
contact
visit
wine
food
experience
amenities
accessibility
welcome
events
pricing
planning
relationships
operations
trust
media
editorial
meta
```

The first implementation should register only attributes required by the existing five profiles plus high-priority editorial fields.

Do not create empty claims for every possible taxonomy key.

---

# 9. Welcome Architecture

## 9.1 Separation of layers

Welcome intelligence must separate:

1. explicit signals
2. observed experience
3. community evidence
4. internal assessment
5. public label

Examples:

```text
welcome.signals.explicit_lgbtq_inclusion
welcome.observed.same_sex_couple_treatment
welcome.community.repeated_concerns
welcome.assessment.confidence
welcome.public_label
```

## 9.2 Approved public labels

```text
highly_welcoming
welcoming
promising
use_your_judgment
insufficient_evidence
community_caution
```

Human-facing labels:

- Highly Welcoming
- Welcoming
- Promising
- Use Your Judgment
- Insufficient Evidence
- Community Caution

## 9.3 Community Caution

Use when credible signals or repeated community concerns warrant additional traveler care, but the evidence does not justify declaring the winery categorically unsafe.

Requirements:

- human decision
- documented evidence
- recent enough to remain relevant
- review schedule
- carefully written public context
- no automated assignment

## 9.4 Welcome constraints

AI may assess and recommend a label.

AI may not:

- publish a label
- infer inclusion solely from absence of negative reports
- treat Pride marketing as proof of consistent treatment
- hide contradictory community evidence
- make legal or categorical safety declarations without an editorial basis

---

# 10. Staleness and Adaptive Monitoring

## 10.1 Base review windows

| Category | Default |
|---|---:|
| operating hours | 30 days |
| reservations | 60 days |
| event details | event end |
| food availability | 60 days |
| wine list and tasting details | 60 days |
| pricing | 90 days |
| dog and child policies | 120 days |
| accessibility | 120 days |
| Welcome evidence | 180 days |
| ownership | 365 days |
| address and contact | 365 days |
| editorial recommendations | 180 days |
| operational advisories | 7–30 days |

## 10.2 Dynamic review interval

```text
dynamic_staleness_days
=
base_staleness_days
× volatility modifier
× consequence modifier
× evidence-quality modifier
```

Examples:

- frequent hour changes shorten monitoring
- accessibility claims with weak evidence shorten monitoring
- stable address data may keep the base interval
- an active road closure may be checked daily or weekly
- high-traffic wineries may receive priority

## 10.3 Unchanged re-verification

When Watch finds the same value:

- do not create a duplicate claim
- attach new evidence when useful
- update `last_verified_at`
- recalculate `stale_after`
- preserve approved status
- log the specialist run

## 10.4 Failed retrieval

A failed request is not proof that the claim is false.

Watch should:

- record the retrieval failure
- avoid changing the public profile
- mark the claim for review only when thresholds are met
- retry or request alternate-source research

---

# 11. Vinny Wisdom

## 11.1 Purpose

Vinny Wisdom represents learned internal patterns across time.

Examples:

```text
hours_change_frequently
event_details_published_late
official_site_often_stale
social_channel_more_current
accessibility_data_incomplete
community_feedback_mixed
strong_firsthand_coverage
seasonal_reservation_pressure
frequent_operational_advisories
```

## 11.2 v1 storage strategy

Do not add a separate Wisdom table in the first migration.

Derive Wisdom from:

- claim history
- source history
- specialist runs
- repeated conflicts
- verification intervals
- editorial decisions

Store calculated Wisdom initially in:

- winery-level internal metadata
- specialist output summaries
- materialized analytical views
- controlled JSON returned by Librarian jobs

A dedicated Wisdom table may be added later when patterns require:

- explicit lifecycle
- human confirmation
- cross-entity relationships
- long-term model features
- query performance beyond derived views

## 11.3 Use

Wisdom may influence:

- Watch frequency
- evidence requirements
- confidence
- Librarian priorities
- Concierge caution wording

Wisdom is private and does not automatically become a public claim.

---

# 12. Specialist Permissions

## 12.1 Vinny Scout

May:

- create source records
- create `pending` or `needs_research` claims
- attach evidence
- create and complete Scout runs

May not:

- approve
- reject
- publish
- edit approved knowledge directly
- invent taxonomy keys

## 12.2 Vinny Watch

May:

- retrieve known sources
- update verification metadata through controlled functions
- add re-verification evidence
- create changed-value claims
- flag stale candidates
- create operational advisories as pending claims

May not:

- overwrite an approved value
- treat page failure as factual change
- publish

## 12.3 Vinny Intelligence

May:

- assess confidence
- identify source dependence
- mark claims `verified`, `needs_research`, or `conflicting`
- add contextual evidence
- recommend editorial actions

May not:

- approve
- reject
- publish
- conceal contradiction

## 12.4 Vinny Editor

May:

- assemble approved claims into complete canonical JSON
- generate public wording
- create draft profile versions
- produce diffs and warnings

May not:

- use pending claims as facts
- invent missing values
- publish

## 12.5 Vinny Publisher

May:

- validate draft profile JSON
- verify publication requirements
- calculate version metadata
- prepare a publication candidate

May not:

- set `published`
- retire the current profile
- bypass blocking validation

## 12.6 Vinny Librarian

May:

- audit coverage
- identify weak, stale, duplicated, or unsupported areas
- recommend research priority
- derive Wisdom patterns

May not:

- create public claims from patterns alone
- approve
- publish

## 12.7 Traveler-facing specialists

Concierge, Planner, and Sommelier may read only:

- current published profiles
- approved public content
- authorized current logistics tools
- session-level traveler preferences

They may not access private intelligence.

---

# 13. Confidence Model

Initial guidance:

```text
source agreement      35%
source trust          30%
recency               20%
evidence depth        15%
```

This is not a simple vote count.

Required considerations:

- independence
- specificity
- relevance
- recency
- directness
- source incentives
- firsthand quality
- unresolved contradiction

Confidence is private by default. Public language may express uncertainty through approved editorial wording.

---

# 14. Editorial Workflows

## 14.1 New claim

```text
Scout discovers
↓
source + pending claim + evidence
↓
Intelligence assesses
↓
verified / needs_research / conflicting
↓
human approves, rejects, edits, or defers
↓
Editor assembles draft
↓
Publisher validates
↓
human publishes
```

## 14.2 Conflict

```text
current approved claim A
+
new claim B for same attribute
↓
both preserved
↓
Intelligence compares evidence
↓
human chooses:
- approve B and supersede A
- reject B and retain A
- create corrected claim C
↓
new draft and publication if public profile changes
```

The existing approved claim should not be automatically demoted merely because a new conflicting claim appears. It remains approved internal knowledge but is flagged as contested until a human resolves the conflict.

## 14.3 Human edit

Preferred flow:

1. decision records `edited`
2. corrected claim is created
3. corrected claim is human-approved
4. prior claims are superseded
5. profile draft is assembled

## 14.4 Publication

A profile may publish only when:

- schema validation passes
- winery identity matches
- required fields are present
- no pending or rejected claim is represented as approved fact
- Welcome labels have a human decision
- the diff is visible
- the change summary is present
- a human confirms publication

## 14.5 Rollback

Rollback:

1. selects an earlier profile version
2. copies its JSON into a new version
3. records `rollback_source_version_id`
4. validates against the current canonical schema
5. requires human publication
6. records a `rolled_back` decision
7. preserves all history

---

# 15. Public Interface

## 15.1 Public view

Provide a public view that returns only:

- active winery identity
- latest published profile JSON
- profile version metadata
- publication timestamp

## 15.2 Public RPC

Recommended function:

```text
get_winery_profile(slug)
```

Behavior:

- returns only the latest published profile for an active winery
- returns no private source, claim, decision, or run data
- uses a stable return shape
- supports the current repository layer

## 15.3 Winery summaries

A second approved public endpoint may provide minimal card/list data.

It should derive from published profile snapshots, not private tables.

## 15.4 Website migration

The current renderer should continue receiving the same canonical JSON.

Repository behavior:

1. request Supabase published profile
2. validate response
3. pass unchanged shape into renderer
4. optionally use local JSON fallback during transition
5. log failures privately

---

# 16. Security Model

## 16.1 Access tiers

| Tier | Identity | Capability |
|---|---|---|
| Public | anon | published profiles only |
| Human editorial | authenticated JWT | private review and explicit editorial actions |
| Specialist | Edge Function | narrowly scoped writes and reads |

## 16.2 Critical enforcement

1. AI models never receive the service-role key.
2. AI writes only through validated Edge Functions.
3. AI cannot insert editorial decisions.
4. AI cannot approve or reject claims.
5. AI can insert profile versions only as `draft`.
6. AI cannot update profile status to `published`.
7. anon has no access to intelligence tables.
8. publication should occur through a transactional human-only function.
9. profile publication and retirement should be atomic.
10. prompt and source storage must never be exposed by public buckets.

## 16.3 Important Supabase caveat

Service-role access bypasses RLS.

Therefore, RLS is not by itself a backstop for Edge Functions using the service-role key.

The implementation must enforce specialist permissions through:

- separate Edge Function routes
- strict request validation
- hardcoded permitted operations
- database functions with limited behavior
- transaction-level checks
- never passing arbitrary table/column operations from model output

Where practical, use narrowly permissioned database functions rather than generic service-role CRUD.

---

# 17. Import Strategy for the Five Canonical Profiles

Initial wineries:

- Doffo
- Leoness
- Akash
- Europa
- Wilson Creek

## 17.1 Import winery records

Create human-approved winery master rows using canonical profile identity values.

## 17.2 Import profile version 1

For each:

- store the full existing canonical JSON unchanged
- mark version `1`
- mark `published`
- record initial human importer
- set change summary to initial canonical import

## 17.3 Seed taxonomy registry

Register only attributes required to map the five current profiles and the approved initial high-priority domains.

## 17.4 Seed claims selectively

Do not mechanically convert every JSON field into a claim.

Seed mutable and meaningful knowledge, including:

- hours
- reservation requirements
- policies
- food
- tasting details
- wine focus
- pricing
- amenities
- accessibility
- experience
- Welcome evidence and public label
- operational advisories
- editorial recommendations where provenance is known

Do not seed purely presentational fields as claims unless needed:

- theme
- schema version
- component layout
- visual ornament settings

## 17.5 Provenance

Claims imported without original evidence should be clearly marked:

```text
claim_origin = initial_import
```

and should not be falsely linked to the official website unless that source actually supports them.

Where source support is unknown:

- import the profile
- mark claim evidence as incomplete
- allow Librarian to prioritize verification

## 17.6 Compatibility validation

Required tests:

- all five imported profiles equal the original canonical JSON
- public RPC returns unchanged shape
- current renderer displays each profile without visual regression
- incomplete profiles degrade gracefully
- public roles cannot query private data
- only one published version exists per winery
- AI cannot publish

---

# 18. VI HQ Requirements

Minimum editorial interface:

## Dashboard

- pending claims
- conflicts
- needs research
- stale knowledge
- draft profiles
- recent specialist failures
- high-priority Librarian findings

## Claim review

- winery
- stable attribute label and key
- current approved claim
- proposed claim
- evidence side by side
- source dates
- confidence rationale
- approve
- reject
- edit
- defer
- request research

## Profile review

- full draft preview
- current versus proposed diff
- validation warnings
- source coverage warnings
- Welcome label confirmation
- publish control
- rollback control

## Taxonomy administration

Initially restricted to Andrew:

- propose key
- review definition
- activate
- deprecate
- map profile path
- manage controlled values

---

# 19. Controlled Vocabularies

The registry must version at least:

- claim types
- claim statuses
- value types
- evidence stance
- confidence bands
- public Welcome labels
- source types
- event types
- operational advisories
- wine varietals
- atmosphere tags
- best-for tags
- accessibility evidence levels
- price bands
- food service types

Controlled values should be machine-readable and human-labeled.

---

# 20. Performance and Indexing

Recommended indexes:

- `wineries(slug)`
- `claims(winery_id, attribute_key, status)`
- `claims(stale_after, status)`
- `claims(specialist_run_id)`
- `claim_evidence(claim_id)`
- `claim_evidence(source_id)`
- `sources(url, retrieved_at)`
- `sources(content_hash)`
- `winery_profile_versions(winery_id, publication_status)`
- unique partial index for one published version
- `specialist_runs(specialist, status, started_at)`
- registry primary index on `attribute_key`

Use JSONB for flexible structured values, but keep core lifecycle, identity, status, and indexing fields relational.

---

# 21. Transactional Operations

Human editorial actions should use database functions or API transactions for consistency.

Recommended operations:

```text
approve_claim(...)
reject_claim(...)
edit_and_approve_claim(...)
supersede_claim(...)
publish_profile_version(...)
rollback_profile_version(...)
reverify_claim(...)
mark_claim_stale(...)
```

These functions should:

- validate human authorization
- insert editorial decision
- update claim/profile state
- enforce constraints
- return a clear result
- avoid partial writes

---

# 22. Failure Modes and Recovery

## Duplicate claim

Normalize and compare before insertion. Re-verification should update metadata rather than create duplicates.

## Wrong winery identity

Keep discovery unlinked and require human resolution.

## Source unavailable

Record failure. Do not infer factual change.

## Schema validation failure

Keep draft unpublished and return actionable errors.

## Taxonomy mismatch

Reject the claim and create a taxonomy proposal for human review.

## Specialist malformed output

Do not write partial data. Mark run failed and retain the validation error.

## Publication transaction failure

Keep current published version live and leave the candidate in review.

## Incorrect publication

Use version rollback to create and publish a new corrective version.

---

# 23. Data Retention

## Permanent

- winery records
- claims
- evidence relationships
- source metadata
- editorial decisions
- profile versions
- run summaries
- model/version metadata
- costs and latency
- errors
- provenance links

## Temporary by default

- full AI prompts
- raw AI outputs
- full raw website captures
- large screenshots
- large transcripts

Default retention for prompt/output:

```text
90–180 days
```

Retention may be extended for:

- active investigations
- disputed editorial decisions
- debugging
- legal or compliance needs
- model-quality evaluation

---

# 24. Implementation Phases

## Phase 1 — Foundation

Build:

- seven core tables
- taxonomy JSON
- runtime registry
- constraints
- human authentication
- private/public RLS
- public view and RPC
- initial migrations
- five profile imports
- import validation

No AI automation yet.

## Phase 2 — Public data migration

- connect repository layer to Supabase
- preserve canonical JSON
- retain temporary local fallback
- test all five winery profiles
- verify public isolation

## Phase 3 — VI HQ editorial core

- dashboard
- claim queue
- evidence review
- editorial decisions
- draft profile preview
- diff
- publication
- rollback

## Phase 4 — Scout and Watch

- controlled retrieval
- source capture
- taxonomy validation
- new claim discovery
- re-verification
- change detection
- specialist run logging

## Phase 5 — Intelligence, Editor, Publisher, Librarian

- confidence
- conflict handling
- profile assembly
- validation
- quality audits
- adaptive monitoring
- Vinny Wisdom derivation

## Phase 6 — Traveler intelligence

- Concierge
- Planner
- Sommelier
- vibe search
- comparisons
- what-changed experience
- personalization

---

# 25. Deferred Architecture

Defer until justified:

- dedicated Wisdom table
- standalone events entity
- regions
- wine/grape entity graph
- restaurant and lodging entities
- traveler accounts
- favorites
- saved itineraries
- collaborative comments
- scheduled publication
- advanced source trust model
- external partner portal
- multi-region tenancy
- vector search infrastructure

Do not add these to the initial migration merely for future-proofing.

---

# 26. Locked Decisions

1. The canonical Winery Profile JSON remains the public contract.
2. Public clients are read-only.
3. Private intelligence never reaches the public interface.
4. AI cannot approve, reject, publish, retire, or roll back.
5. Claims and evidence are the knowledge foundation.
6. Stable `attribute_key` values are independent of JSON paths.
7. Claim types are:
   - fact
   - policy
   - observation
   - recommendation
   - score
   - event
   - relationship
   - operational_advisory
8. Claim statuses include `needs_research`.
9. Monitoring combines base staleness with adaptive volatility.
10. Public Welcome labels are:
    - Highly Welcoming
    - Welcoming
    - Promising
    - Use Your Judgment
    - Insufficient Evidence
    - Community Caution
11. Community Caution requires human approval.
12. Only mutable, meaningful knowledge becomes claims.
13. Small evidence lives in Postgres; large raw assets live in Storage.
14. Full prompts and outputs are temporary; permanent provenance remains.
15. Vinny Wisdom is private learned behavior.
16. The initial workflow uses seven core tables.
17. The taxonomy registry uses a hybrid file-and-database model.
18. AI may never invent taxonomy keys.
19. Rollback creates a new version.
20. Andrew is the primary editorial authority in v1.

---

# 27. Bolt Implementation Directive

Use this document, the Constitution, and the Knowledge Taxonomy as authoritative inputs.

Before writing SQL, Bolt should return:

1. final proposed columns and constraints
2. taxonomy registry format
3. canonical-profile mapping plan
4. RLS and Edge Function permission matrix
5. transactional human-only database functions
6. five-profile import plan
7. validation and test plan
8. technical conflicts or unresolved decisions

Bolt should not:

- replace the claims model with a traditional CMS
- add unnecessary workflow tables
- use fragile JSON paths as the only claim identity
- expose intelligence tables publicly
- allow service-role model-driven generic CRUD
- permit AI publication
- populate every taxonomy attribute
- alter public Welcome labels
- rewrite the canonical Winery Profile JSON

---

# Final Principle

Vinny should do the heavy lifting without pretending to be the final authority.

The system is strongest when:

- AI searches widely
- evidence stays visible internally
- uncertainty remains honest
- editorial judgment remains human
- public recommendations feel effortless
- every answer serves the traveler
