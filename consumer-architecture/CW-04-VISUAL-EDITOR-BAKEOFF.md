# CW-04 — Visual Editor Bakeoff

## Objective
Choose the smallest visual/content layer that gives Andrew meaningful manual control without allowing a third-party editor to become an authority source for Vinny intelligence or core application behavior.

## Candidates
- Payload CMS
- Plasmic
- Builder.io

## Test specimen
Use the exact same Leoness Next.js winery-profile POC and ask each candidate to support the same bounded editorial changes:
1. Replace/crop hero media.
2. Edit a non-governed editorial headline/dek.
3. Add a campaign callout module.
4. Reorder two explicitly editor-safe editorial modules.
5. Preview mobile/tablet/desktop.
6. Use existing React components rather than recreating them as independent UI.
7. Confirm Vinny-owned fields cannot be edited through the visual layer.

## Scoring
Each candidate is scored 1–5 on:
- Manual visual control for a non-developer
- Next.js/React fit
- Ability to use our own components/design system
- Mobile preview quality
- Free-tier viability for the POC
- Lock-in / ejectability
- Performance impact
- Governance boundary clarity
- Developer maintenance burden
- Eventual coexistence with a separate Expo app

## Current hypothesis before hands-on test
### Payload
Best architecture/ownership posture. Fully open-source/self-hostable and a strong Next.js-native content/admin layer. Live Preview is useful, but it is primarily structured CMS editing rather than free-form visual page building.

### Plasmic
Best current candidate for Andrew's requested hands-on visual control. React/Next.js-oriented, supports bringing our own components, can be adopted incrementally, and is currently generous enough on its free tier for a serious POC.

### Builder.io
Still viable, especially for drag-and-drop composition with registered React components. Keep as the third benchmark; do not adopt by default without proving it gives us a better editing experience than Plasmic and a cleaner boundary than Payload.

## Decision rule
Do not pick the tool with the longest feature list. Pick the tool that lets Andrew make the intended editorial/layout changes to the real Leoness page while:
- preserving React ownership,
- keeping Vinny-owned truth read-only,
- avoiding duplicated rendering authority,
- remaining viable at the expected launch scale.

If none provides enough benefit, ship Next.js + a structured CMS/editor without a free-form visual builder.

## CW-04 status
BAKEOFF SPEC LOCKED. Hands-on comparison begins after the Leoness Next.js POC exists.