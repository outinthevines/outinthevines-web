import type { ConsumerWinery } from '../types/consumer'

export const leoness: ConsumerWinery = {
  id: 'leoness',
  slug: 'leoness-cellars',
  identity: {
    name: 'Leoness Cellars',
    region: 'Temecula Valley',
    subregion: 'De Portola Wine Trail',
    address: '38311 De Portola Rd, Temecula, CA',
    websiteUrl: 'https://leonesscellars.com/'
  },
  presentation: {
    heroImage: 'https://raw.githubusercontent.com/outinthevines/outinthevines-web/main/assets/wineries/leoness.jpg',
    heroAlt: 'Prototype vineyard imagery for Leoness Cellars',
    shortDescription: 'Estate wine, vineyard views, tours, and destination dining built for an unhurried afternoon.',
    vibeLabels: ['Scenic', 'Wine-focused', 'Elevated dining'],
    knownFor: ['Estate wines', 'Vineyard tours', 'Destination dining', 'Sweeping vineyard views'],
    themeKey: 'estate'
  },
  vinny: {
    verdict: 'Give this stop time. The view, food, and wine deserve more than a rushed tasting.',
    bestFor: ['Romantic afternoons', 'Wine-focused meals', 'Golden hour', 'Visitors who want to linger'],
    mayNotSuit: ['You only have 45 minutes', 'You want a very casual drop-in'],
    quickLook: [
      { key: 'food', label: 'Food', value: 'Full restaurant', state: 'yes' },
      { key: 'reservations', label: 'Reservations', value: 'Recommended', state: 'partial' },
      { key: 'groups', label: 'Groups', value: 'Plan ahead', state: 'partial' },
      { key: 'accessibility', label: 'Accessibility', value: 'Awaiting governed detail', state: 'unknown' }
    ]
  },
  welcome: {
    publicState: 'review_in_progress',
    designation: null,
    confidence: null,
    reviewedAt: null,
    publicSummary: 'POC only. The production site will render the governed public Welcome state supplied by certified Vinny Intelligence.',
    reportUrl: null
  },
  domains: {
    wine: { summary: 'Estate-focused wine program with a strong red-wine identity.', highlights: ['Estate wines', 'Hosted tastings', 'Tours'], lastVerified: null },
    food: { summary: 'A full restaurant experience makes Leoness a legitimate meal stop, not just a tasting room.', highlights: ['Full restaurant', 'Terrace dining', 'Sunday brunch'], lastVerified: null },
    experiences: { summary: 'The strongest fit is an unhurried visit that combines wine, views, and dining.', highlights: ['Vineyard views', 'Tours', 'Golden-hour appeal'] },
    events: { summary: 'Live music, brunch, and seasonal programming can materially shape the visit.', highlights: ['Live music', 'Sunday brunch', 'Seasonal events'] },
    accessibility: null, policies: null, hospitality: null, membership: null, visitor: null
  },
  planning: { hours: null, reservations: 'Recommended for dining, tours, and larger groups.', visitLength: '2–3 hours', groups: 'Plan ahead for groups.', bestTime: 'Weekday afternoon or golden hour.' },
  editorial: {
    andrewPick: { title: 'Andrew’s Leoness pick', note: 'Founder tasting note placeholder — intentionally separate from governed Vinny intelligence.' },
    antonioPick: { title: 'Antonio’s Leoness pick', note: 'Founder tasting note placeholder — intentionally separate from governed Vinny intelligence.' },
    founderNote: 'Leoness is the kind of place that rewards slowing down.'
  },
  actions: { directionsUrl: 'https://maps.google.com/?q=Leoness+Cellars+Temecula', reservationUrl: 'https://leonesscellars.com/', eventsUrl: 'https://leonesscellars.com/events/calendar/' },
  freshness: { wineryUpdatedAt: null, materialChangePending: false }
}
