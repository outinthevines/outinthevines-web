# Vinny Knowledge Taxonomy v1.0

**Project:** Out in the Vines  
**System:** Vinny Intelligence  
**Status:** Locked foundation for implementation  
**Owner:** Andrew Mason  
**Purpose:** Define the stable vocabulary Vinny uses to describe winery knowledge independently of page layout, UI, or profile JSON structure.

---

# 1. How to Read the Taxonomy

Each piece of knowledge receives a permanent semantic key.

Example:

```text
visit.hours.tasting_room
```

That key means:

- `visit` = knowledge domain
- `hours` = knowledge group
- `tasting_room` = specific attribute

The key describes what the knowledge means, not where it appears on a page.

Avoid keys like:

```text
hours[2].text
profile.section_4.card_1
```

Those are presentation paths and may change.

---

# 2. Naming Rules

All stable attributes must follow these rules:

- lowercase only
- snake_case within each segment
- dot notation between levels
- no winery names in the key
- no dates or version numbers in the key
- no UI language such as card, section, block, or tab
- describe one concept per key
- prefer durable meaning over current implementation

Recommended pattern:

```text
domain.group.attribute
```

Optional deeper pattern:

```text
domain.group.subgroup.attribute
```

Examples:

```text
visit.hours.tasting_room
visit.seating.outdoor.shaded
wine.style.full_bodied
welcome.signals.explicit_lgbtq_inclusion
accessibility.mobility.step_free_entry
```

---

# 3. Core Knowledge Domains

Vinny v1 uses these top-level domains:

1. `identity`
2. `location`
3. `contact`
4. `visit`
5. `wine`
6. `food`
7. `experience`
8. `amenities`
9. `accessibility`
10. `welcome`
11. `events`
12. `pricing`
13. `planning`
14. `relationships`
15. `operations`
16. `trust`
17. `media`
18. `editorial`
19. `meta`

---

# 4. Identity

Stable facts describing the winery as an entity.

```text
identity.official_name
identity.display_name
identity.legal_name
identity.slug
identity.alias
identity.business_type
identity.parent_company
identity.ownership.structure
identity.ownership.owner_name
identity.ownership.family_owned
identity.ownership.minority_owned
identity.ownership.lgbtq_owned
identity.ownership.woman_owned
identity.ownership.veteran_owned
identity.founding_year
identity.opening_year
identity.current_operating_name
identity.brand_story
identity.description.short
identity.description.long
```

Notes:

- ownership identity claims require especially careful evidence
- legal and public-facing names may differ
- aliases may repeat as separate claims

---

# 5. Location

```text
location.address.street
location.address.city
location.address.state
location.address.postal_code
location.address.country
location.coordinates.latitude
location.coordinates.longitude
location.region
location.subregion
location.wine_trail
location.neighborhood
location.setting.rural
location.setting.urban
location.setting.hillside
location.setting.vineyard
location.setting.mountain_view
location.setting.valley_view
location.distance.from_old_town_temecula
location.distance.from_freeway
```

---

# 6. Contact

```text
contact.phone.main
contact.phone.reservations
contact.email.general
contact.email.events
contact.website.official
contact.reservations.url
contact.social.instagram
contact.social.facebook
contact.social.tiktok
contact.social.youtube
contact.social.threads
```

---

# 7. Visit

## Hours

```text
visit.hours.tasting_room
visit.hours.restaurant
visit.hours.kitchen
visit.hours.gift_shop
visit.hours.member_lounge
visit.hours.last_seating
visit.hours.last_pour
visit.hours.seasonal
visit.hours.holiday
```

## Reservations

```text
visit.reservations.required
visit.reservations.recommended
visit.reservations.walk_ins_accepted
visit.reservations.same_day_available
visit.reservations.group_required
visit.reservations.minimum_group_size
visit.reservations.maximum_group_size
visit.reservations.deposit_required
visit.reservations.cancellation_policy
visit.reservations.booking_window
```

## Entry and Arrival

```text
visit.entry.age_requirement
visit.entry.id_required
visit.entry.cover_charge
visit.entry.member_only
visit.arrival.check_in_process
visit.arrival.recommended_arrival_time
visit.arrival.wait_time_typical
visit.arrival.weekend_congestion
```

## Seating

```text
visit.seating.indoor.available
visit.seating.indoor.capacity
visit.seating.outdoor.available
visit.seating.outdoor.covered
visit.seating.outdoor.shaded
visit.seating.outdoor.heated
visit.seating.outdoor.misters
visit.seating.outdoor.reservable
visit.seating.communal
visit.seating.private
visit.seating.bar
visit.seating.picnic
visit.seating.lounge
visit.seating.comfort
```

## Visit Policies

```text
visit.policy.children
visit.policy.infants
visit.policy.dogs
visit.policy.service_animals
visit.policy.outside_food
visit.policy.outside_beverages
visit.policy.decorations
visit.policy.photography
visit.policy.professional_photography
visit.policy.smoking
visit.policy.vaping
visit.policy.large_groups
visit.policy.limousines
visit.policy.party_buses
visit.policy.bachelorette_groups
visit.policy.bachelor_groups
visit.policy.designated_driver
```

---

# 8. Wine

## Production and Focus

```text
wine.production.estate_grown
wine.production.on_site
wine.production.annual_cases
wine.production.small_lot
wine.production.organic_practices
wine.production.biodynamic_practices
wine.production.sustainable_practices
wine.production.natural_wine
wine.production.winemaker
wine.production.consulting_winemaker
```

## Varietals

```text
wine.varietals.primary
wine.varietals.secondary
wine.varietals.signature
wine.varietals.red
wine.varietals.white
wine.varietals.rose
wine.varietals.sparkling
wine.varietals.dessert
```

Recommended varietal values are controlled vocabulary entries, not free-text labels.

## Style

```text
wine.style.light_bodied
wine.style.medium_bodied
wine.style.full_bodied
wine.style.dry
wine.style.off_dry
wine.style.sweet
wine.style.fruit_forward
wine.style.earthy
wine.style.oak_forward
wine.style.acid_driven
wine.style.tannin_forward
wine.style.old_world_inspired
wine.style.new_world_inspired
wine.style.experimental
wine.style.approachable
wine.style.collector_focused
```

## Tastings

```text
wine.tasting.flight_available
wine.tasting.guided
wine.tasting.self_paced
wine.tasting.seated
wine.tasting.bar
wine.tasting.blind
wine.tasting.library
wine.tasting.reserve
wine.tasting.vertical
wine.tasting.food_pairing
wine.tasting.customizable
wine.tasting.number_of_pours
wine.tasting.typical_duration
wine.tasting.price
```

## Sales

```text
wine.sales.by_glass
wine.sales.by_bottle
wine.sales.case_discount
wine.sales.shipping
wine.sales.club_only_wines
wine.sales.library_wines
wine.sales.current_release
wine.sales.inventory_note
```

## Wine Club

```text
wine.club.available
wine.club.tiers
wine.club.shipments_per_year
wine.club.minimum_commitment
wine.club.member_discount
wine.club.member_lounge
wine.club.priority_reservations
wine.club.events
wine.club.waitlist
```

---

# 9. Food

```text
food.available
food.service_type
food.kitchen.full
food.kitchen.limited
food.restaurant.on_site
food.cafe.on_site
food.snacks.available
food.charcuterie.available
food.food_truck
food.rotating_vendor
food.menu.url
food.menu.seasonal
food.dietary.vegetarian
food.dietary.vegan
food.dietary.gluten_free
food.dietary.dairy_free
food.dietary.allergen_information
food.pairing.available
food.pairing.guided
food.outside_food_allowed
food.typical_price
food.reservation_required
food.last_order_time
```

---

# 10. Experience

## Atmosphere

```text
experience.atmosphere.relaxed
experience.atmosphere.lively
experience.atmosphere.romantic
experience.atmosphere.refined
experience.atmosphere.casual
experience.atmosphere.rustic
experience.atmosphere.modern
experience.atmosphere.intimate
experience.atmosphere.social
experience.atmosphere.quiet
experience.atmosphere.high_energy
experience.atmosphere.luxury
experience.atmosphere.unpretentious
```

## Best For

```text
experience.best_for.first_date
experience.best_for.anniversary
experience.best_for.celebration
experience.best_for.solo_visit
experience.best_for.couples
experience.best_for.groups
experience.best_for.families
experience.best_for.wine_beginners
experience.best_for.wine_enthusiasts
experience.best_for.collectors
experience.best_for.photo_ops
experience.best_for.sunset
experience.best_for.live_music
experience.best_for.relaxing
experience.best_for.quick_stop
experience.best_for.full_afternoon
experience.best_for.business_gathering
experience.best_for.out_of_town_guests
```

## Crowd and Pace

```text
experience.crowd.typical
experience.crowd.weekday
experience.crowd.weekend
experience.crowd.event_day
experience.pace.relaxed
experience.pace.structured
experience.pace.fast
experience.wait.typical
experience.service.attentive
experience.service.educational
experience.service.personalized
experience.service.consistent
experience.service.friendliness
```

## Visual and Sensory

```text
experience.visual.vineyard_views
experience.visual.mountain_views
experience.visual.sunset_views
experience.visual.architecture
experience.visual.gardens
experience.visual.photo_worthy
experience.sound.live_music
experience.sound.quiet_spaces
experience.sound.noise_level
experience.weather.hot_day_suitability
experience.weather.cold_day_suitability
experience.weather.rainy_day_suitability
```

---

# 11. Amenities

```text
amenities.parking.general
amenities.parking.free
amenities.parking.valet
amenities.parking.overflow
amenities.parking.accessible
amenities.parking.ev_charging
amenities.parking.rideshare
amenities.restrooms
amenities.wifi
amenities.air_conditioning
amenities.heating
amenities.fire_pits
amenities.misters
amenities.gift_shop
amenities.picnic_area
amenities.lawn
amenities.games
amenities.pool
amenities.viewing_platform
amenities.private_room
amenities.event_space
amenities.wedding_venue
amenities.lodging
amenities.restaurant
amenities.member_lounge
amenities.charging_outlets
amenities.water_station
```

---

# 12. Accessibility

Accessibility attributes should describe observable features rather than make sweeping guarantees.

## Mobility

```text
accessibility.mobility.step_free_entry
accessibility.mobility.wheelchair_route
accessibility.mobility.accessible_parking
accessibility.mobility.drop_off_area
accessibility.mobility.ramp
accessibility.mobility.elevator
accessibility.mobility.surface_type
accessibility.mobility.path_grade
accessibility.mobility.distance_from_parking
accessibility.mobility.accessible_seating
accessibility.mobility.restroom_access
accessibility.mobility.staff_assistance
```

## Restrooms

```text
accessibility.restroom.accessible_stall
accessibility.restroom.grab_bars
accessibility.restroom.turning_space
accessibility.restroom.gender_neutral
accessibility.restroom.single_occupancy
```

## Sensory and Communication

```text
accessibility.sensory.quiet_area
accessibility.sensory.noise_level
accessibility.sensory.lighting
accessibility.sensory.crowd_intensity
accessibility.communication.large_print
accessibility.communication.digital_menu
accessibility.communication.captioning
accessibility.communication.sign_language
accessibility.communication.staff_accommodation
```

## Evidence Quality

```text
accessibility.evidence.firsthand_verified
accessibility.evidence.officially_documented
accessibility.evidence.community_reported
accessibility.evidence.last_verified
accessibility.evidence.completeness
```

---

# 13. Welcome

Welcome attributes must separate evidence, signals, editorial conclusions, and public labels.

## Explicit Signals

```text
welcome.signals.explicit_lgbtq_inclusion
welcome.signals.pride_participation
welcome.signals.lgbtq_partnership
welcome.signals.inclusive_marketing
welcome.signals.gender_inclusive_language
welcome.signals.same_sex_couples_visible
welcome.signals.pronoun_inclusion
welcome.signals.nondiscrimination_policy
welcome.signals.gender_neutral_restroom
welcome.signals.diverse_staff_representation
welcome.signals.community_support
```

## Observed Experience

```text
welcome.observed.same_sex_couple_treatment
welcome.observed.gender_expression_respect
welcome.observed.staff_warmth
welcome.observed.consistent_treatment
welcome.observed.group_comfort
welcome.observed.authenticity
welcome.observed.belonging
```

## Community Evidence

```text
welcome.community.positive_reports
welcome.community.mixed_reports
welcome.community.negative_reports
welcome.community.repeated_concerns
welcome.community.recent_concerns
welcome.community.resolved_concerns
welcome.community.source_diversity
```

## Internal Assessment

```text
welcome.assessment.internal_score
welcome.assessment.confidence
welcome.assessment.evidence_depth
welcome.assessment.firsthand_weight
welcome.assessment.community_weight
welcome.assessment.recency
welcome.assessment.editorial_notes
```

## Public Label

```text
welcome.public_label
```

Allowed public values:

```text
highly_welcoming
welcoming
promising
use_your_judgment
insufficient_evidence
community_caution
```

### Meaning of `community_caution`

Use when credible signals or repeated community concerns warrant care, but the evidence does not justify declaring a place categorically unsafe.

This label requires human approval.

---

# 14. Events

```text
events.event_name
events.event_type
events.start_datetime
events.end_datetime
events.recurrence
events.location
events.ticket_required
events.ticket_price
events.member_only
events.age_requirement
events.food_available
events.live_music
events.pride_related
events.community_related
events.reservation_url
events.cancellation_status
events.last_verified
```

Event claims are time-bound and should expire automatically after the event window.

---

# 15. Pricing

```text
pricing.tasting.standard
pricing.tasting.reserve
pricing.tasting.library
pricing.tasting.food_pairing
pricing.glass.typical
pricing.bottle.entry
pricing.bottle.typical
pricing.bottle.premium
pricing.food.typical
pricing.club.entry
pricing.club.typical
pricing.experience.private
pricing.parking
pricing.cover_charge
pricing.value_perception
pricing.price_band
```

Recommended price bands:

```text
budget_friendly
moderate
premium
luxury
varies
```

---

# 16. Planning

```text
planning.visit_duration.minimum
planning.visit_duration.typical
planning.visit_duration.maximum
planning.advance_booking
planning.best_day.weekday
planning.best_day.weekend
planning.best_time.morning
planning.best_time.afternoon
planning.best_time.sunset
planning.avoid_time
planning.weather.hot
planning.weather.cold
planning.weather.rain
planning.group.small
planning.group.medium
planning.group.large
planning.transportation.designated_driver
planning.transportation.rideshare
planning.transportation.tour_bus
planning.transportation.limo
planning.route.nearby_wineries
planning.route.cluster
planning.backup_option
```

---

# 17. Relationships

Use this claim type for formal or meaningful associations.

```text
relationships.membership.wine_growers_association
relationships.membership.chamber
relationships.membership.lgbtq_chamber
relationships.partnership.tourism_board
relationships.partnership.community_organization
relationships.partnership.lgbtq_organization
relationships.certification.sustainability
relationships.certification.organic
relationships.certification.accessibility
relationships.award.wine
relationships.award.hospitality
relationships.award.community
relationships.distribution.restaurant
relationships.distribution.retail
```

---

# 18. Operations

This replaces the generic claim type name `status`.

The claim type is:

```text
operational_advisory
```

Stable attributes:

```text
operations.state.open
operations.state.temporarily_closed
operations.state.seasonal
operations.state.permanently_closed
operations.state.coming_soon
operations.state.under_renovation
operations.state.new_ownership
operations.state.rebranding
operations.state.relocation
operations.advisory.temporary_hours
operations.advisory.road_closure
operations.advisory.parking_change
operations.advisory.weather_closure
operations.advisory.private_event
operations.advisory.harvest_traffic
operations.advisory.service_disruption
operations.advisory.reservation_restriction
operations.advisory.capacity_limit
operations.advisory.last_verified
```

---

# 19. Trust

```text
trust.source.primary
trust.source.secondary
trust.source.community
trust.confidence.score
trust.confidence.band
trust.conflict.exists
trust.conflict.severity
trust.conflict.summary
trust.verification.last_verified
trust.verification.method
trust.verification.firsthand
trust.verification.direct_contact
trust.verification.official_source
trust.staleness.base_days
trust.staleness.dynamic_days
trust.staleness.state
trust.volatility.score
trust.volatility.pattern
```

Trust attributes are primarily internal and should not be exposed directly unless intentionally translated into public-facing language.

---

# 20. Media

```text
media.logo
media.hero_image
media.gallery
media.video
media.map_image
media.menu
media.wine_list
media.accessibility_photo
media.source_credit
media.alt_text
media.usage_rights
media.last_verified
```

---

# 21. Editorial

```text
editorial.summary.short
editorial.summary.long
editorial.why_go
editorial.know_before_you_go
editorial.insider_tip
editorial.best_for
editorial.not_ideal_for
editorial.signature_experience
editorial.local_context
editorial.accessibility_note
editorial.welcome_note
editorial.caution_note
editorial.confidence_note
editorial.recommendation_strength
```

Editorial attributes should be generated only from approved claims.

---

# 22. Meta

```text
meta.schema_version
meta.profile_version
meta.created_at
meta.updated_at
meta.published_at
meta.last_full_review
meta.review_owner
meta.profile_completeness
meta.public_visibility
meta.deprecation_reason
```

These support system behavior and are not normal research claims unless explicitly needed.

---

# 23. Claim Types

Allowed claim types for v1:

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

Examples:

| Claim Type | Example |
|---|---|
| fact | The winery is located at a specific address |
| policy | Dogs are allowed on the patio |
| observation | Staff provided personalized tasting guidance |
| recommendation | Best for a relaxed anniversary |
| score | Internal Welcome Score assessment |
| event | Pride brunch on June 14 |
| relationship | Member of a local LGBTQ+ chamber |
| operational_advisory | Temporary road closure affects access |

---

# 24. Claim Lifecycle

Allowed statuses:

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

Meaning:

- `pending`: newly discovered and not yet evaluated
- `needs_research`: plausible but incomplete
- `verified`: evidence assessment completed, awaiting human decision
- `conflicting`: meaningful unresolved contradiction exists
- `approved`: accepted by a human editor
- `rejected`: declined by a human editor
- `superseded`: replaced by newer approved knowledge
- `stale`: no longer current enough to rely on without rechecking

---

# 25. Attribute Value Types

Every attribute definition should declare one value type.

Allowed initial types:

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

Examples:

```text
visit.reservations.required → boolean
pricing.tasting.standard → currency
experience.atmosphere → multi_enum
visit.hours.tasting_room → structured_json
welcome.public_label → enum
```

---

# 26. Controlled Vocabularies

Use controlled values whenever consistency matters.

Initial vocabularies should include:

- wine varietals
- atmosphere
- best-for use cases
- price bands
- public Welcome labels
- claim types
- claim statuses
- evidence stance
- confidence bands
- event types
- service types
- operational advisory types
- accessibility evidence levels

Controlled vocabularies must be versioned and documented.

---

# 27. Staleness Defaults

Initial base review windows:

| Attribute Category | Default Review Window |
|---|---:|
| operating hours | 30 days |
| reservations | 60 days |
| event information | until event end |
| food availability | 60 days |
| wine list and tasting details | 60 days |
| pricing | 90 days |
| dog and child policies | 120 days |
| accessibility | 120 days |
| welcome evidence | 180 days |
| ownership | 365 days |
| address and contact | 365 days |
| editorial recommendations | 180 days |
| operational advisories | 7 to 30 days |

Dynamic monitoring may shorten these windows based on observed volatility.

---

# 28. Vinny Wisdom

Vinny Wisdom records patterns learned over time.

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

Wisdom influences:

- Watch frequency
- confidence adjustments
- research priority
- evidence requirements
- Concierge caution language

Wisdom does not automatically become public content.

---

# 29. Public Versus Private Attributes

## Usually Public

```text
identity.display_name
location.address.*
visit.hours.*
visit.reservations.*
visit.policy.*
wine.varietals.*
food.*
experience.*
amenities.*
accessibility.*
welcome.public_label
events.*
pricing.*
planning.*
editorial.*
operations.advisory.*
```

## Usually Private

```text
welcome.assessment.*
trust.*
editorial.internal_notes
source excerpts
model prompts
specialist reasoning
conflict details
unapproved claims
Vinny Wisdom
```

---

# 30. Canonical JSON Mapping

The taxonomy is the meaning layer.

The Winery Profile JSON is the delivery layer.

Example:

```text
Stable attribute:
visit.hours.tasting_room

Approved value:
{
  "monday": "11:00–17:00",
  "tuesday": "closed",
  "wednesday": "11:00–17:00"
}

Current profile mapping:
visit.hours.tasting_room → profile.hours.tasting_room
```

A future profile redesign may map the same attribute elsewhere without changing the claim.

---

# 31. Example Claim Record

```json
{
  "winery_id": "uuid",
  "attribute_key": "visit.policy.dogs",
  "claim_type": "policy",
  "value_type": "enum",
  "claim_value": {
    "value": "patio_only"
  },
  "status": "pending",
  "confidence_score": 0.72,
  "profile_path": "visit.policies.dogs"
}
```

---

# 32. Example Welcome Claim Set

```text
welcome.signals.explicit_lgbtq_inclusion = true
welcome.signals.pride_participation = true
welcome.observed.same_sex_couple_treatment = positive
welcome.community.mixed_reports = false
welcome.assessment.confidence = high
welcome.public_label = highly_welcoming
```

The public label requires human approval even when the supporting claims are strong.

---

# 33. What Must Be Built From This Document

## Database

Bolt should use this taxonomy to add:

- `attribute_key`
- `claim_type`
- `value_type`
- `claim_value`
- `profile_path`
- staleness metadata
- confidence metadata

## Taxonomy Registry

Create a machine-readable registry containing:

- attribute key
- display label
- description
- value type
- allowed values
- allowed claim types
- public/private classification
- default staleness window
- profile mapping
- active/deprecated state

## VI HQ

The taxonomy should power:

- claim creation dropdowns
- filters
- validation
- evidence review
- profile completeness
- missing data reports
- controlled vocabularies

## AI Specialists

Scout, Watch, Intelligence, Editor, and Librarian must only create or reason over approved taxonomy keys.

Unknown attributes should be proposed for review rather than silently invented.

---

# 34. Governance

The taxonomy is versioned.

Changes require one of these actions:

```text
add
clarify
deprecate
replace
merge
split
```

Rules:

- never rename a live key without migration
- never delete a key that has claim history
- deprecated keys remain readable
- replacement keys must be documented
- new keys require a definition and value type
- public Welcome keys require human review
- accessibility keys must describe observable conditions whenever possible

---

# 35. Locked Decisions

1. Stable semantic attributes use hierarchical dot notation.
2. Claim types include `operational_advisory` instead of generic `status`.
3. Claim lifecycle includes `needs_research`.
4. Monitoring uses base staleness plus dynamic volatility.
5. The platform is designed for future roles but initially operated primarily by Andrew.
6. Public Welcome labels are:
   - Highly Welcoming
   - Welcoming
   - Promising
   - Use Your Judgment
   - Insufficient Evidence
   - Community Caution
7. Mutable, meaningful knowledge becomes claims.
8. Small evidence excerpts stay in Postgres; large raw assets go to Supabase Storage.
9. Full prompts and outputs are retained temporarily; long-term summaries and provenance are preserved.
10. Vinny Wisdom stores learned internal patterns.

---

# 36. Immediate Implementation Scope

For the first five wineries, implement only the attributes actually required by the existing canonical profiles plus these high-priority areas:

```text
identity.*
location.*
contact.*
visit.hours.*
visit.reservations.*
visit.policy.*
wine.varietals.*
wine.tasting.*
food.*
experience.atmosphere.*
experience.best_for.*
amenities.*
accessibility.*
welcome.*
pricing.*
planning.*
operations.*
editorial.*
meta.*
```

Do not attempt to populate every attribute in v1.

The taxonomy defines what Vinny can know.

The imported profiles define what Vinny knows today.
