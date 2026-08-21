'use client'

import { useState } from 'react'
import type { ConsumerWinery } from '../types/consumer'

function QuickTile({ icon, label, value, tone = 'plum' }: { icon: string; label: string; value?: string | null; tone?: string }) {
  return <article className={`quick-tile tone-${tone} ${!value ? 'tile-unknown' : ''}`}><div className="quick-icon" aria-hidden="true">{icon}</div><div><span>{label}</span><strong>{value ?? 'Not yet verified'}</strong></div></article>
}

function Fact({ label, value }: { label: string; value?: string | null }) {
  return <div className={`fact ${!value ? 'fact-unknown' : ''}`}><span>{label}</span><strong>{value ?? 'Not yet verified'}</strong></div>
}

const eventImages = [
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80'
]

const happenings = {
  Today: [{ time: '5:30 PM', title: 'Golden-hour tasting', meta: 'Prototype event · patio tasting', image: eventImages[0] }],
  Tomorrow: [{ time: '6:00 PM', title: 'Live music on the patio', meta: 'Prototype event · outdoor', image: eventImages[1] }],
  'This Weekend': [{ time: 'SAT · 12 PM', title: 'Weekend wine + food pairing', meta: 'Prototype event · reservations recommended', image: eventImages[2] }, { time: 'SUN · 11 AM', title: 'Sunday brunch experience', meta: 'Prototype event · dining', image: eventImages[0] }],
  'Next 7 Days': [{ time: 'FRI · 6 PM', title: 'Live music', meta: 'Prototype event', image: eventImages[1] }, { time: 'SUN · 11 AM', title: 'Brunch', meta: 'Prototype event', image: eventImages[2] }, { time: 'WED · 3 PM', title: 'Winery tour', meta: 'Prototype event', image: eventImages[0] }]
}

export function WineryProfile({ winery }: { winery: ConsumerWinery }) {
  const w = winery
  const isDoffo = w.id === 'doffo'
  const [happeningTab, setHappeningTab] = useState<keyof typeof happenings>('This Weekend')
  const heroStyle = w.presentation.heroImage ? { backgroundImage: `url(${w.presentation.heroImage})` } : undefined
  const portfolio = isDoffo ? [['Cabernet Sauvignon',92],['Malbec',82],['Zinfandel',72],['Syrah + blends',64],['White / Rosé',28]] : [['Cabernet / Bordeaux',90],['Syrah / Rhône reds',78],['Blends',68],['White wines',44],['Rosé / sparkling',30]]
  const gallery = isDoffo ? ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1000&q=80'] : ['https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1566995541428-f2246c17cda1?auto=format&fit=crop&w=1000&q=80']
  const food = w.vinny.quickLook.find(x => x.key === 'food')?.value
  const known = w.presentation.knownFor.slice(0,3)

  return <main className={`founder-modern traveler-profile theme-${w.presentation.themeKey ?? 'default'}`}>
    <div className="demo-banner">OUT IN THE VINES · VISUAL TRAVELER PROFILE POC · PROTOTYPE DATA</div>
    <header className="topbar"><a className="brand" href="/"><span className="brand-mark">O</span><span className="brand-copy"><strong>Out in the Vines</strong><small>TEMECULA WINE COUNTRY</small></span></a><nav className="desktop-nav"><a href="#quicklook">Quick Look</a><a href="#happening">Happening</a><a href="#wine">Wine</a><a href="#feel">Experience</a><a href="#plan">Plan</a></nav><div className="specimen-switcher"><a href="/">Leoness</a><a href="/doffo">Doffo</a></div></header>

    <section className="winery-hero" style={heroStyle}><div className="hero-welcome"><span className="welcome-icon">V</span><div><small>VINNY WELCOME</small><strong>Review in progress</strong></div></div><div className="winery-hero-content"><p className="eyebrow gold">{w.identity.subregion}</p><h1>{w.identity.name}</h1><p>{w.presentation.shortDescription}</p><div className="hero-tags">{w.presentation.vibeLabels.map(item => <span key={item}>{item}</span>)}</div></div></section>

    <section className="section traveler-shell">
      <div className="traveler-main">
        <section className="decision-card"><div className="vinny-intro"><div className="vinny-badge">V</div><div><p className="eyebrow teal">VINNY’S TAKE</p><div className="verdict">“{w.vinny.verdict}”</div></div></div><div className="decision-fit"><div><span>BEST KNOWN FOR</span><strong>{known.join(' · ')}</strong></div><div><span>BEST FOR</span><strong>{w.presentation.vibeLabels.slice(0,3).join(' · ')}</strong></div><div><span>PLAN AROUND</span><strong>{w.planning.reservations ?? 'Reservation details still being verified'}</strong></div></div></section>

        <section id="quicklook" className="visual-quick traveler-section"><div className="section-head"><div><p className="eyebrow gold">QUICK LOOK</p><h2>Know the essentials before you go.</h2></div></div><div className="quick-tile-grid"><QuickTile icon="🍷" label="Tasting style" value={isDoffo ? 'Relaxed, personality-led' : 'Hosted, unhurried'} tone="plum"/><QuickTile icon="$" label="Typical tasting" value="$30–$45 · illustrative" tone="gold"/><QuickTile icon="◷" label="Reservations" value={w.planning.reservations} tone="teal"/><QuickTile icon="🍽" label="Food" value={food} tone="rose"/><QuickTile icon="⏱" label="Time to allow" value={w.planning.visitLength} tone="blue"/><QuickTile icon="👥" label="Groups" value={w.planning.groups} tone="grape"/><QuickTile icon="★" label="Best known for" value={known.slice(0,2).join(' · ')} tone="gold"/><QuickTile icon="♡" label="Welcome" value="Review in progress" tone="teal"/></div></section>

        <section id="happening" className="happening-block traveler-section"><div className="section-head"><div><p className="eyebrow teal">WHAT’S HAPPENING</p><h2>Make the timing part of the experience.</h2></div></div><div className="date-tabs">{(Object.keys(happenings) as (keyof typeof happenings)[]).map(tab => <button key={tab} className={happeningTab === tab ? 'active' : ''} onClick={() => setHappeningTab(tab)}>{tab}</button>)}</div><div className="event-card-grid">{happenings[happeningTab].map(event => <article className="event-card" key={event.time+event.title}><div className="event-image" style={{backgroundImage:`url(${event.image})`}}><span>{event.time}</span></div><div className="event-copy"><strong>{event.title}</strong><small>{event.meta}</small><button>Details →</button></div></article>)}</div><button className="text-link">View full event calendar →</button></section>

        <section id="wine" className="wine-portfolio traveler-section"><div className="section-head"><div><p className="eyebrow gold">WINE PORTFOLIO</p><h2>See where the cellar leans.</h2></div></div><p className="portfolio-note">{w.domains.wine?.summary ?? 'Portfolio character is still being verified.'}</p><div className="portfolio-bars">{portfolio.map(([label,value]) => <div className="portfolio-row" key={label as string}><span>{label}</span><div><i style={{width:`${value}%`}} /></div></div>)}</div><div className="tags">{w.domains.wine?.highlights?.map(item => <span key={item} className="tag">{item}</span>)}</div><button className="text-link">Explore full wine portfolio →</button></section>

        <div className="image-story-grid traveler-gallery"><img src={gallery[0]} alt="Prototype winery experience"/><div><img src={gallery[1]} alt="Prototype tasting experience"/><img src={gallery[2]} alt="Prototype winery atmosphere"/></div><span>Prototype imagery · final site uses winery-specific governed media</span></div>

        <section id="feel" className="traveler-section feel-block"><div className="section-head"><div><p className="eyebrow plum">THE EXPERIENCE</p><h2>What it feels like to spend time here.</h2></div></div><p className="experience-summary">{w.domains.experiences?.summary ?? w.presentation.shortDescription}</p><div className="tags">{w.domains.experiences?.highlights?.map(item => <span key={item} className="tag">{item}</span>)}</div></section>

        <section className="traveler-section split-travel"><article><p className="eyebrow gold">FOOD</p><h2>{food ?? 'Food details in review'}</h2><p>{w.domains.food?.summary ?? 'Current dining details are still being verified.'}</p><button className="text-link">See food & menu details →</button></article><article><p className="eyebrow plum">SPACES & GROUPS</p><h2>Bringing your people?</h2><p>{w.planning.groups ?? 'Group guidance is still being verified.'}</p><div className="tags"><span className="tag">Outdoor</span><span className="tag">Indoor</span><span className="tag">Private events</span></div><button className="text-link">See group & private-event details →</button></article></section>

        <section id="plan" className="traveler-section plan-full"><div className="section-head"><div><p className="eyebrow gold">PLAN YOUR VISIT</p><h2>Know before you go.</h2></div></div><div className="glance-grid"><Fact label="Hours" value="See current hours · prototype"/><Fact label="Reservations" value={w.planning.reservations}/><Fact label="Parking" value="On-site · detail in review"/><Fact label="Accessibility" value="Details in review"/><Fact label="Kids" value="Policy in review"/><Fact label="Pets" value="Policy in review"/><Fact label="Groups" value={w.planning.groups}/><Fact label="Recommended time" value={w.planning.visitLength}/></div><div className="plan-actions"><button>♡ Save</button><button>＋ Add to My Day</button><a href={w.actions.directionsUrl ?? '#'}>Get directions</a><button className="ask-vinny">Ask Vinny</button></div></section>

        <section className="founder-card"><p className="eyebrow gold">TWO HUSBANDS. TWO PALATES.</p><h2>Andrew & Antonio</h2><p className="founder-lead">{w.editorial.founderNote}</p><div className="duo-notes"><article><span>ANDREW</span><strong>{w.editorial.andrewPick?.title}</strong><p>{w.editorial.andrewPick?.note}</p></article><article><span>ANTONIO</span><strong>{w.editorial.antonioPick?.title}</strong><p>{w.editorial.antonioPick?.note}</p></article></div></section>
      </div>
      <aside className="plan-rail"><div className="welcome-rail"><div className="welcome-rail-head"><span className="welcome-icon">V</span><div><small>VINNY WELCOME</small><strong>Review in progress</strong></div></div><p>{w.welcome.publicSummary}</p><button className="text-link">See Welcome Report →</button></div><div className="plan-rail-card"><strong>Plan this stop</strong><small>{w.planning.visitLength ?? 'Visit timing in review'}</small><button>♡ Save</button><button>＋ Add to My Day</button><a href={w.actions.directionsUrl ?? '#'}>Directions</a><button className="ask-vinny">Ask Vinny</button></div></aside>
    </section>
    <p className="source-note traveler-source">POC only. Pricing, portfolio shares, events and selected planning facts are illustrative until certified Vinny data is connected.</p>
    <nav className="bottom-nav"><a href="#quicklook">Quick Look</a><a href="#happening">Happening</a><button className="ask-vinny">Ask Vinny</button></nav>
  </main>
}
