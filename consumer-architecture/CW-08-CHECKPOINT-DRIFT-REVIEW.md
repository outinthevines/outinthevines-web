# CW-08 — Consumer POC Checkpoint + Drift Review

## Checkpoint scope
CW-01 through CW-07 are represented on the isolated `cw-consumer-architecture-poc` branch. This checkpoint evaluates architecture drift before any merge or Vinny production connection.

## Current state
- Founder prototype remains intact on `main`.
- Consumer POC remains isolated under `consumer-poc/` plus branch-only preview scaffolding.
- Leoness and Doffo render through one shared `WineryProfile` component.
- Winery-specific expression is controlled through theme tokens, not duplicated page architecture.
- Mobile-priority responsive behavior is implemented with explicit desktop composition at large breakpoints.
- No Supabase reads/writes.
- No Vinny production calls.
- No legacy `data.js` runtime dependency.
- Welcome / Vinny Verified authority is not calculated by React.
- Unresolved governed fields remain unresolved.

## Responsive drift review
### Mobile
- Sticky bottom action surface remains mobile-only.
- Two-column Quick Look prioritizes scanning.
- Content remains linear and one-handed.

### Tablet
- Actions and Quick Look expand without forcing desktop composition prematurely.

### Desktop
- Hero scale and alignment become editorial rather than stretched-mobile.
- Lead content and Welcome surface become an intentional two-column composition.
- Domain cards use a two-column editorial grid.
- Planning details use desktop space horizontally.
- Founder section becomes an asymmetric editorial layout.
- Mobile bottom bar is removed.

Verdict: desktop is being designed as a first-class responsive state, not treated as an enlarged phone.

## Portability check
Doffo uses the same component tree as Leoness while receiving a distinct Moto visual expression through theme tokens and different consumer data. No Doffo-specific branching is required in the profile renderer.

Verdict: PASS for two-specimen component portability.

## Authority drift review
- Vinny owns governed intelligence: PASS.
- React owns rendering/interaction: PASS.
- Founder/editorial content remains separate from governed facts: PASS.
- No visual editor has been granted authority: PASS.
- Legacy prototype remains donor/reference only: PASS.

## Current blocker
A live preview is not yet certified because the existing Vercel projects are configured around legacy project roots/framework assumptions. This is deployment configuration, not consumer rendering authority. Do not weaken the architecture by moving the POC into legacy runtime ownership just to satisfy the existing Vercel configuration.

## CW-08 status
CHECKPOINT PASS WITH DEPLOYMENT PREVIEW OPEN — architecture and responsive drift are clean; live visual certification remains pending a clean preview deployment.
