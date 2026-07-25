const CACHE="oitv-founders-v2";
const ASSETS=["./","./index.html","./styles.css","./data.js","./winery-data.js","./app.js","./manifest.webmanifest",
"./data/schemas/winery-profile.schema.json",
"./data/profiles/wineries/leoness.json","./data/profiles/wineries/akash.json","./data/profiles/wineries/doffo.json","./data/profiles/wineries/europa.json","./data/profiles/wineries/wilson.json",
"./assets/brand/primary-logo.png","./assets/brand/vinny-hero.png","./assets/brand/app-icon.png",
"./assets/people/andrew-antonio-ai.png","./assets/people/andrew-antonio-card.jpg","./VINNY_WELCOME_STANDARD.md","./WINERY_PROFILE_DATA_MODEL.md","./WINERY_PROFILE_THEME_SYSTEM.md","./FOUNDERS_EDITION_MANIFESTO.md","./VINNY_VERIFIED_BADGE_SYSTEM.md"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request))));
