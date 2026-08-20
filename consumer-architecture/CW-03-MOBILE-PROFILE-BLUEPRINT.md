# CW-03 — Responsive Winery Profile Blueprint

## Goal
Use Leoness as the first complete responsive consumer specimen. Mobile is the priority interaction context, but desktop must be deliberately designed rather than treated as a stretched mobile layout. Build from the ConsumerWinery contract, not from legacy DOM/data.js behavior.

## Shared information hierarchy
1. Hero media + winery identity
2. Vinny one-line verdict
3. Welcome / Vinny Verified public state
4. Primary actions: Save · Add to My Day · Directions · Ask Vinny
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
├── ResponsiveActionBar
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

## Responsive experience rule
The experience is mobile-priority, not mobile-only.

### Mobile
- One-handed primary actions.
- Efficient vertical scan.
- Sticky bottom actions where useful.
- Progressive disclosure for dense planning detail.
- Strong hierarchy without excessive card stacking.

### Tablet
- Two-column opportunities for Quick Look, Fit Summary, planning, and editorial modules.
- Preserve touch-friendly controls.
- Avoid simply enlarging mobile widths.

### Desktop
- Purposeful wide-screen composition with stronger editorial rhythm.
- Use multi-column layouts, side rails, larger media, and whitespace where they improve comprehension.
- Primary actions may move from a mobile bottom bar into a contextual/sticky desktop action area.
- Hero composition, typography scale, and information density should be designed specifically for desktop.
- Avoid giant full-width paragraphs, oversized mobile cards, or excessive vertical scrolling caused by carrying mobile stacking directly to desktop.

The same component/data model should serve all breakpoints, but layout composition may change substantially by viewport.

## Presentation ownership
### React/code-owned
- Navigation and route behavior
- Profile component structure
- Quick Look state semantics
- Welcome/Verified badge rendering rules
- Save/My Day interactions
- Ask Vinny interaction shell
- Accessibility behavior
- Responsive states and breakpoint composition
- Consumer-contract validation

### CMS/editor-eligible
- Hero crop/media selection, including breakpoint-aware crops where supported
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
- Works cleanly at 375px and 430px mobile widths.
- Works deliberately at tablet width.
- Works deliberately at 1280px+ desktop width; desktop is not merely centered/stretched mobile.
- No horizontal overflow at any target breakpoint.
- Primary actions are appropriate to the input mode and viewport.
- User can identify the winery, vibe, Welcome state, and core planning facts without hunting.
- Unknown/null governed facts fail gracefully without invented fallback copy.
- Same component tree can render a second winery using a different theme key.
- No component reads data.js or reaches directly into Vinny persistence.

## CW-03 status
RESPONSIVE BLUEPRINT LOCKED FOR POC IMPLEMENTATION.