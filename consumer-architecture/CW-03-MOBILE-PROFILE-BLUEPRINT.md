# CW-03 — Mobile Winery Profile Blueprint

## Goal
Use Leoness as the first complete mobile-first consumer specimen. Build from the ConsumerWinery contract, not from legacy DOM/data.js behavior.

## Mobile information hierarchy
1. Hero media + winery identity
2. Vinny one-line verdict
3. Welcome / Vinny Verified public state
4. Sticky actions: Save · Add to My Day · Directions · Ask Vinny
5. Quick Look practical facts
6. Why go / Best For / Maybe Skip If
7. Wine
8. Food
9. Experiences & hospitality
10. Events
11. Visit planning
12. Accessibility & policies
13. Andrew & Antonio notes
14. Freshness / verification disclosure

## Component blueprint
```text
WineryProfilePage
├── WineryHero
├── WineryIdentityBlock
├── VinnyVerdict
├── WelcomeStatusCard
├── MobileActionBar
├── QuickLookGrid
├── FitSummary
│   ├── BestForList
│   └── MayNotSuitList
├── DomainSection[Wine]
├── DomainSection[Food]
├── DomainSection[Experiences]
├── DomainSection[Hospitality]
├── EventsRail
├── PlanningCard
├── DomainSection[Accessibility]
├── DomainSection[Policies]
├── FounderNotes
├── FreshnessDisclosure
└── AskVinnyEntry
```

## Presentation ownership
### React/code-owned
- Navigation and route behavior
- Profile component structure
- Quick Look state semantics
- Welcome/Verified badge rendering rules
- Save/My Day interactions
- Ask Vinny interaction shell
- Accessibility behavior
- Responsive states
- Consumer-contract validation

### CMS/editor-eligible
- Hero crop/media selection
- Editorial headline/dek where explicitly non-governed
- Founder notes
- Editorial feature modules
- Promotional modules
- Guide/campaign callouts
- Optional section ordering only where it cannot distort governed meaning

### Vinny-owned / never visually authored
- Governed winery facts
- Public Welcome state
- Vinny Verified authorization
- Confidence/freshness/provenance states
- Domain membership
- Material-change state

## Design system salvage
Use the Founder prototype's Estate expression for Leoness as a starting visual direction: elegant serif display, restrained vineyard/rose tone, crisp geometry. Convert this into design tokens rather than per-page arbitrary CSS.

Global OITV rules remain consistent across wineries. Winery personality is expressed with controlled theme tokens, imagery, and editorial accents rather than a different information architecture per winery.

## POC acceptance criteria
- Works cleanly at 375px mobile width first.
- No horizontal overflow.
- Primary actions reachable one-handed.
- User can identify the winery, vibe, Welcome state, and core planning facts without hunting.
- Unknown/null governed facts fail gracefully without invented fallback copy.
- Same component tree can render a second winery using a different theme key.
- No component reads data.js or reaches directly into Vinny persistence.

## CW-03 status
BLUEPRINT LOCKED FOR POC IMPLEMENTATION.