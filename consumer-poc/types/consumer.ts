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

export type ConsumerWinery = {
  id: string
  slug: string
  identity: {
    name: string
    region: string
    subregion?: string | null
    address?: string | null
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
