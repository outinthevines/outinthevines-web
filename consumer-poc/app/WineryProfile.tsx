'use client'

import { useState } from 'react'
import type { ConsumerWinery } from '../types/consumer'

function Fact({ label, value, unknown = false }: { label: string; value?: string | null; unknown?: boolean }) {
  return <div className={`fact ${unknown ? 'fact-unknown' : ''}`}><span>{label}</span><strong>{value ?? 'Not yet verified'}</strong></div>
}

function ExperienceSection({ title, summary, highlights }: { title: string; summary?: string | null; highlights?: string[] }) {
  if (!summary && (!highlights || highlights.length === 0)) return null
  return <section className="experience-section"><p className="eyebrow plum">{title}</p>{summary ? <p className="experience-summary">{summary}</p> : null}{highlights?.length ? <div className="tags">{highlights.map((item) => <span key={item} className="tag">{item}</span>)}</div> : null}</section>
}

const happenings = {
  Today: [{ time: '5:30 PM', title: 'Golden-hour tasting', type: 'Prototype event' }],
  Tomorrow: [{ time: '6:00 PM', title: 'Live music on the patio', type: 'Prototype event' }],
  'This Weekend': [
    { time: 'SAT · 12 PM', title: 'Weekend wine + food pairing', type: 'Prototype event' },
    { time: 'SUN · 11 AM', title: 'Sunday brunch experience', type: 'Prototype event' }
  ],
  'Next 7 Days': [
    { time: 'FRI · 6 PM', title: 'Live music', type: 'Prototype event' },
    { time: 'SUN · 11 AM', title: 'Brunch', type: 'Prototype event' },
    { time: 'WED · 3 PM', title: 'Winery tour', type: 'Prototype event' }
  ]
}

export function WineryProfile({ winery }: { winery: ConsumerWinery }) {
  const w = winery
  const heroStyle = w.presentation.heroImage ? { backgroundImage: `url(${w.presentation.heroImage})` } : undefined
  const [happeningTab, setHappeningTab] = useState<keyof typeof happenings>('This Weekend')
  const isDoffo = w.id === 'doffo'
  const portfolio = isDoffo
    ? [['Cabernet Sauvignon', 92], ['Malbec', 82], ['Zinfandel', 72], ['Syrah + blends', 64], ['White / Rosé', 28]]
    : [['Cabernet / Bordeaux', 90], ['Syrah / Rhône reds', 78], ['Blends', 68], ['White wines', 44], ['Rosé / sparkling', 30]]
  const gallery = isDoffo
    ? ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1000&q=80']
    : ['https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1566995541428-f2246c17cda1?auto=format&fit=crop&w=1000&q=80']

  return (
    <main className={`founder-modern theme-${w.presentation.themeKey ?? 'default'}`}>
      <div className="demo-banner">OUT IN THE VINES · RICH PROFILE POC · PROTOTYPE DATA</div>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Out in the Vines home"><span className="brand-mark">O</span><span className="brand-copy"><strong>Out in the Vines</strong><small>TEMECULA WINE COUNTRY</small></span></a>
        <nav className="desktop-nav"><a href="#overview">Overview</a><a href="#happening">Happening</a><a href="#wine">Wine</a><a href="#spaces">Spaces</a><a href="#plan">Plan</a></nav>
        <div className="specimen-switcher"><a href="/">Leoness</a><a href="/doffo">Doffo</a></div>
      </header>

      <section className="winery-hero" style={heroStyle}><div className="winery-hero-content"><p className="eyebrow gold">{w.identity.subregion}</p><h1>{w.identity.name}</h1><p>{w.presentation.shortDescription}</p><div className="hero-tags">{w.presentation.vibeLabels.map((item) => <span key={item}>{item}</span>)}</div></div></section>

      <section id="overview" className="section detail-grid">
        <div className="detail-main">
          <div className="vinny-intro"><div className="vinny-badge">V</div><div><p className="eyebrow teal">VINNY’S TAKE</p><div className="verdict">“{w.vinny.verdict}”</div></div></div>

          <section className="known-for"><p className="eyebrow gold">BEST KNOWN FOR · VINNY INTELLIGENCE</p><div className="known-grid">{w.presentation.knownFor.slice(0,4).map((item, i) => <article key={item}><span>0{i+1}</span><strong>{item}</strong></article>)}</div></section>

          <section className="glance-rich"><div className="section-head"><div><p className="eyebrow gold">AT A GLANCE</p><h2>Before you pull in</h2></div></div><div className="glance-grid">
            <Fact label="Tasting style" value={isDoffo ? 'Relaxed, personality-led tasting' : 'Hosted, unhurried tasting'} />
            <Fact label="Typical tasting price" value="$30–$45 · illustrative POC" />
            <Fact label="Reservations" value={w.planning.reservations} />
            <Fact label="Food" value={w.vinny.quickLook.find(x => x.key === 'food')?.value} />
            <Fact label="Groups" value={w.planning.groups} />
            <Fact label="Visit length" value={w.planning.visitLength} />
          </div></section>

          <div className="image-story-grid"><img src={gallery[0]} alt="Prototype wine country visual"/><div><img src={gallery[1]} alt="Prototype tasting visual"/><img src={gallery[2]} alt="Prototype winery visual"/></div><span>Prototype imagery · final site will use governed winery media</span></div>

          <section id="happening" className="happening-block"><div className="section-head"><div><p className="eyebrow teal">WHAT’S HAPPENING</p><h2>Make the timing part of the plan.</h2></div></div><div className="date-tabs">{(Object.keys(happenings) as (keyof typeof happenings)[]).map(tab => <button key={tab} className={happeningTab === tab ? 'active' : ''} onClick={() => setHappeningTab(tab)}>{tab}</button>)}</div><div className="event-list">{happenings[happeningTab].map(event => <article key={event.time + event.title}><span>{event.time}</span><div><strong>{event.title}</strong><small>{event.type} · live data comes from Vinny</small></div><button>Details →</button></article>)}</div></section>

          <section id="wine" className="wine-portfolio"><div className="section-head"><div><p className="eyebrow gold">WINE PORTFOLIO</p><h2>What the cellar leans toward</h2></div></div><p className="portfolio-note">Illustrative visualization for the POC. Production values will be derived from Vinny’s governed menu and portfolio intelligence.</p><div className="portfolio-bars">{portfolio.map(([label, value]) => <div className="portfolio-row" key={label as string}><span>{label}</span><div><i style={{width: `${value}%`}} /></div></div>)}</div><div className="tags">{w.domains.wine?.highlights?.map(item => <span key={item} className="tag">{item}</span>)}</div></section>

          <section id="experience" className="experience-block"><div className="section-head"><div><p className="eyebrow gold">THE EXPERIENCE</p><h2>Why you’d go</h2></div></div><ExperienceSection title="FOOD & DINING" {...(w.domains.food ?? {})} /><ExperienceSection title="EXPERIENCE" {...(w.domains.experiences ?? {})} /></section>

          <section id="spaces" className="spaces-block"><div className="section-head"><div><p className="eyebrow plum">SPACES & GROUPS</p><h2>Can your people actually fit?</h2></div></div><div className="space-grid"><article><strong>Outdoor</strong><p>Patio / vineyard-facing space · prototype summary</p></article><article><strong>Indoor</strong><p>Tasting and dining spaces · prototype summary</p></article><article><strong>Groups</strong><p>{w.planning.groups ?? 'Awaiting governed detail'}</p></article><article><strong>Private events</strong><p>Availability and capacity will come from Vinny’s governed events/venue intelligence.</p></article></div><button className="text-link">See full space & group details →</button></section>

          <section id="founders" className="founder-card"><p className="eyebrow gold">TWO HUSBANDS. TWO PALATES.</p><h2>Andrew & Antonio</h2><p className="founder-lead">{w.editorial.founderNote}</p><div className="duo-notes"><article><span>ANDREW</span><strong>{w.editorial.andrewPick?.title}</strong><p>{w.editorial.andrewPick?.note}</p></article><article><span>ANTONIO</span><strong>{w.editorial.antonioPick?.title}</strong><p>{w.editorial.antonioPick?.note}</p></article></div></section>
        </div>

        <aside className="detail-side"><div className="rating-box"><p className="eyebrow gold">WELCOME</p><div className="welcome-state">Review in progress</div><small>{w.welcome.publicSummary}</small></div><section id="plan" className="quick-card planning-card"><h2>Plan your visit</h2><div className="fact-list"><Fact label="Time to give it" value={w.planning.visitLength}/><Fact label="Reservations" value={w.planning.reservations}/><Fact label="Groups" value={w.planning.groups}/><Fact label="Best time" value={w.planning.bestTime}/></div></section><div className="detail-actions"><button>♡ Save</button><button>＋ Add to My Day</button><a href={w.actions.directionsUrl ?? '#'}>Get directions</a><button className="ask-vinny">Ask Vinny</button></div><p className="source-note">POC only. Pricing, portfolio shares, events and space summaries on this page are illustrative until certified Vinny data is connected.</p></aside>
      </section>
      <nav className="bottom-nav"><a href="#overview">Overview</a><a href="#happening">Happening</a><button className="ask-vinny">Ask Vinny</button></nav>
    </main>
  )
}
