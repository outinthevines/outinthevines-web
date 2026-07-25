/**
 * WineryRepository — lowest-level data access.
 * Knows where canonical JSON lives today. In Phase 3 this is the only
 * file that changes when the source switches to Supabase.
 */
const WineryRepository = (() => {
  const BASE = "data/profiles/wineries/";
  const SLUGS = ["leoness", "akash", "doffo", "europa", "wilson"];

  async function fetchProfile(slug) {
    const res = await fetch(BASE + slug + ".json");
    if (!res.ok) return null;
    return res.json();
  }

  async function fetchAll() {
    return Promise.all(SLUGS.map(fetchProfile));
  }

  return { fetchProfile, fetchAll, slugs: () => [...SLUGS] };
})();

/**
 * ProfileService — the only interface the renderer talks to.
 * Returns canonical Winery Profile objects. Caches by slug so repeated
 * openWinery() calls for the same winery do not re-fetch.
 */
const ProfileService = (() => {
  const cache = new Map();
  let allCache = null;

  async function getWineryProfile(slug) {
    if (cache.has(slug)) return cache.get(slug);
    const profile = await WineryRepository.fetchProfile(slug);
    if (profile) cache.set(slug, profile);
    return profile;
  }

  async function listWineryProfiles() {
    if (allCache) return allCache;
    const all = await WineryRepository.fetchAll();
    allCache = all.filter(Boolean);
    allCache.forEach(p => cache.set(p.identity.slug, p));
    return allCache;
  }

  return { getWineryProfile, listWineryProfiles };
})();

/**
 * Legacy adapter — projects a canonical profile into the flat shape
 * the existing listing helpers (card, renderExplore, renderNearby, etc.)
 * still expect. This keeps app.js listing code unchanged in Phase 1.
 */
function toLegacyCardModel(p) {
  if (!p) return null;
  const t = p.meta.theme || {};
  return {
    id: p.identity.id,
    slug: p.identity.slug,
    name: p.identity.name,
    area: p.identity.region,
    image: p.hero.imageUrl,
    imageAlt: p.hero.imageAlt,
    vibe: p.hero.subtitle,
    short: p.reviewSnapshot.brief || "",
    tags: p.wine.styleTags || [],
    icon: p.identity.icon || "",
    gradient: p.hero.cardGradient || "",
    welcome: {
      designation: p.welcome.overall || "Review in Progress",
      recognition: p.welcome.label || "WELCOME INDEX™",
      confidence: p.welcome.confidence || "Low",
      reviewed: p.welcome.lastReviewedAt || (p.trust.lastVerifiedAt || ""),
      summary: p.welcome.explanation || "Assessment in progress.",
      evidence: p.welcome.evidence || []
    },
    address: p.identity.official.address || "",
    demoRating: p.trust.demoRating || "",
    status: p.trust.publicationStatus || "",
    theme: {
      name: t.name || "default",
      accent: t.accent || "#7A2E6B",
      surface: t.surface || "#F1E8D9",
      ink: t.ink || "#241c24",
      display: t.displayFont || "Playfair Display"
    },
    andrew: (p.personalNotes?.andrew?.headline) || "",
    antonio: (p.personalNotes?.antonio?.headline) || "",
    andrewNote: (p.personalNotes?.andrew?.note) || "",
    antonioNote: (p.personalNotes?.antonio?.note) || ""
  };
}
