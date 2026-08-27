# CW-01 — Founder Prototype Salvage Audit

## Verdict
Preserve the Founder’s Edition repository as a reference specimen. Do not convert the current static runtime in place.

## Keep as product/UX patterns
- Mobile-first, vibe-first discovery.
- Dual entry points: plan ahead vs. already in Temecula.
- Vinny Quick Match.
- Winery cards, favorites, Nearby, Events, My Day, and three-stop itinerary constraint.
- Homepage mix of discovery, editorial, trust, and founder voice.
- Shared winery-profile structure with winery-specific visual personality.
- Andrew & Antonio editorial layer distinct from governed winery intelligence.
- Explicit trust/provenance presentation and last-verified concepts.
- Five-primary-destination mobile navigation principle.

## Rebuild, do not port
- index.html application shell.
- app.js interaction/runtime ownership.
- data.js as a fake database.
- Static demo ratings, hard-coded status strings, and prototype Welcome/Verified logic.
- Any presentation logic that infers truth from UI strings.

## Authority rules for the new consumer product
1. Vinny Intelligence owns governed winery intelligence.
2. The consumer API contract is the only Vinny-facing dependency of the public site.
3. Next.js/React owns application behavior and consumer rendering.
4. Editorial/CMS tooling may control copy, media, section composition, guides, and campaigns, but never governed winery facts or Welcome/Verified authority.
5. The Founder prototype is a visual/interaction donor, not a schema or runtime donor.

## Salvage classification
### Strong keep
- Start With the Vibe
- Vinny Quick Match
- Already in Temecula / Nearby intent
- My Day
- Favorites
- Winery profile information hierarchy
- Editorial founder notes
- Winery-specific visual expression within a consistent profile system

### Keep but reconcile with Vinny 2.x
- Welcome presentation
- Verification/confidence/date presentation
- Known For
- Perfect For / Maybe Skip If
- Planning essentials
- Events
- Quick Look practical facts

### Retire
- Demo numeric ratings as authority
- Hard-coded evidence summaries
- Static operational truth
- data.js data ownership
- One-file application architecture

## CW-01 status
CERTIFIED FOR POC USE — product patterns salvaged; legacy runtime explicitly excluded.