# CW-02 — Leoness Consumer Contract Specimen

## Purpose
Define the shape the public OITV frontend needs without exposing Vinny internal tables, specialist runs, evidence graphs, or runtime implementation details.

## Contract principles
- Consumer-safe and stable.
- No frontend inference of authority.
- Explicit nullability for unresolved data.
- Provenance/status metadata travels with governed facts where needed.
- Editorial founder content is separate from governed Vinny intelligence.
- Media is a presentation concern and may be CMS-managed while identity/association remains governed.

## Proposed TypeScript shape
```ts
export type ConsumerWinery = {
  id: string
  slug: string
  identity: {
    name: string
    region: string
    subregion?: string | null
    address?: string | null
    coordinates?: { lat: number; lng: number } | null
    websiteUrl?: string | null
  }
  presentation: {
    heroImage?: string | null
    heroAlt?: string | null
    shortDescription?: string | null
    vibeLabels: string[]
    knownFor: string[]
    themeKey?: string | null
  }
  vinny: {
    verdict?: string | null
    bestFor: string[]
    mayNotSuit: string[]
    quickLook: Array<{
      key: string
      label: string
      value?: string | null
      state: 'yes' | 'no' | 'partial' | 'unknown'
      lastVerified?: string | null
    }>
  }
  welcome: {
    publicState: 'verified' | 'highly_welcoming' | 'welcoming' | 'review_in_progress' | 'insufficient_evidence' | 'not_published'
    designation?: string | null
    confidence?: 'high' | 'medium' | 'low' | null
    reviewedAt?: string | null
    publicSummary?: string | null
    reportUrl?: string | null
  }
  domains: {
    wine?: ConsumerDomain | null
    food?: ConsumerDomain | null
    hospitality?: ConsumerDomain | null
    events?: ConsumerDomain | null
    experiences?: ConsumerDomain | null
    membership?: ConsumerDomain | null
    policies?: ConsumerDomain | null
    accessibility?: ConsumerDomain | null
    visitor?: ConsumerDomain | null
  }
  planning: {
    hours?: Array<{ label: string; value: string; lastVerified?: string | null }> | null
    reservations?: string | null
    visitLength?: string | null
    groups?: string | null
    bestTime?: string | null
    transportation?: string | null
  }
  editorial: {
    andrewPick?: FounderPick | null
    antonioPick?: FounderPick | null
    founderNote?: string | null
  }
  actions: {
    directionsUrl?: string | null
    reservationUrl?: string | null
    eventsUrl?: string | null
  }
  freshness: {
    wineryUpdatedAt?: string | null
    materialChangePending: boolean
  }
}

export type ConsumerDomain = {
  summary?: string | null
  highlights: string[]
  details?: Array<{ label: string; value: string }> | null
  lastVerified?: string | null
}

export type FounderPick = {
  title: string
  note: string
  tastedAt?: string | null
}
```

## Leoness specimen mapping
The existing Founder’s Edition Leoness record supplies useful placeholder UX content for: identity, area, vibe, short description, verdict, known-for, planning, amenities, events, founder placeholders, theme, quick facts, perfect-for, and skip-if.

For the POC these values may seed a mock object, but all static Welcome authority and operational claims are marked mock/reference-only until replaced by the certified Vinny consumer API.

## Explicit non-goals
- No direct Supabase table reads from the public frontend.
- No specialist-run details in the public contract.
- No claim adjudication in React.
- No calculation of Vinny Verified in the frontend.
- No translation layer from old data.js into production authority.

## CW-02 status
CONTRACT V0.1 LOCKED FOR FRONTEND POC — subject to final reconciliation against certified Vinny Publisher output.