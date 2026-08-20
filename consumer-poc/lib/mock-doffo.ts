import type { ConsumerWinery } from '../types/consumer'

export const doffo: ConsumerWinery = {
  id: 'doffo',
  slug: 'doffo-winery',
  identity: {
    name: 'Doffo Winery',
    region: 'Temecula Valley',
    subregion: 'De Portola Wine Trail',
    address: '36083 Summitville St, Temecula, CA',
    websiteUrl: 'https://doffowines.com/'
  },
  presentation: {
    heroImage: 'https://raw.githubusercontent.com/outinthevines/outinthevines-web/main/assets/wineries/doffo.jpg',
    heroAlt: 'Prototype wine-country imagery for Doffo Winery',
    shortDescription: 'Family-owned wine country with serious reds, a distinctive motorcycle identity, and an experience that feels unlike any other stop in Temecula.',
    vibeLabels: ['Distinctive', 'Red-wine focused', 'Moto culture'],
    knownFor: ['Red wines', 'MotoDoffo collection', 'Family-owned identity', 'Brunch and events'],
    themeKey: 'moto'
  },
  vinny: {
    verdict: 'Come for the motorcycles. Give the wine your full attention too.',
    bestFor: ['Red-wine drinkers', 'Repeat visitors', 'People who want something genuinely different', 'Brunch days'],
    mayNotSuit: ['You want polished resort energy', 'You are looking for a generic tasting-room experience'],
    quickLook: [
      { key: 'food', label: 'Food', value: 'Brunch House', state: 'yes' },
      { key: 'events', label: 'Events', value: 'Concerts and seasonal programming', state: 'partial' },
      { key: 'groups', label: 'Groups', value: 'Coordinate ahead', state: 'partial' },
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
    wine: { summary: 'A red-forward wine program is central to the Doffo experience rather than secondary to the motorcycle collection.', highlights: ['Malbec', 'Zinfandel', 'Cabernet Sauvignon', 'Syrah and red blends'], lastVerified: null },
    food: { summary: 'Brunch House gives Doffo a meaningful food dimension beyond a standard tasting-room visit.', highlights: ['Brunch House', 'Morning-friendly visits'], lastVerified: null },
    experiences: { summary: 'MotoDoffo gives the property one of Temecula wine country’s most recognizable identities.', highlights: ['Vintage motorcycles', 'Distinctive family story', 'Outdoor patio'] },
    events: { summary: 'Concerts and seasonal programming can significantly change the energy of a visit.', highlights: ['Concerts', 'Seasonal events', 'Special programming'] },
    accessibility: null, policies: null, hospitality: null, membership: null, visitor: null
  },
  planning: { hours: null, reservations: 'Check current requirements for tours and ticketed events.', visitLength: '2–3 hours', groups: 'Coordinate larger parties ahead of time.', bestTime: 'Morning brunch or a quieter weekday.' },
  editorial: {
    andrewPick: { title: 'Andrew’s Doffo pick', note: 'Founder tasting note placeholder — intentionally separate from governed Vinny intelligence.' },
    antonioPick: { title: 'Antonio’s Doffo pick', note: 'Founder tasting note placeholder — intentionally separate from governed Vinny intelligence.' },
    founderNote: 'Doffo works because the personality is real. It never feels like a theme pasted onto a winery.'
  },
  actions: { directionsUrl: 'https://maps.google.com/?q=Doffo+Winery+Temecula', reservationUrl: 'https://doffowines.com/', eventsUrl: 'https://doffowines.com/calevents/' },
  freshness: { wineryUpdatedAt: null, materialChangePending: false }
}
