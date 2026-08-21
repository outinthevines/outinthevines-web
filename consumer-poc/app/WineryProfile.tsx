import type { ConsumerWinery } from '../types/consumer'

function Fact({ label, value, unknown = false }: { label: string; value?: string | null; unknown?: boolean }) {
  return (
    <div className={`fact ${unknown ? 'fact-unknown' : ''}`}>
      <span>{label}</span>
      <strong>{value ?? 'Not yet verified'}</strong>
    </div>
  )
}

function ExperienceSection({ title, summary, highlights }: { title: string; summary?: string | null; highlights?: string[] }) {
  if (!summary && (!highlights || highlights.length === 0)) return null
  return (
    <section className="experience-section">
      <p className="eyebrow plum">{title}</p>
      {summary ? <p className="experience-summary">{summary}</p> : null}
      {highlights?.length ? (
        <div className="tags">
          {highlights.map((item) => <span key={item} className="tag">{item}</span>)}
        </div>
      ) : null}
    </section>
  )
}

export function WineryProfile({ winery }: { winery: ConsumerWinery }) {
  const w = winery
  const heroStyle = w.presentation.heroImage ? { backgroundImage: `url(${w.presentation.heroImage})` } : undefined

  return (
    <main className={`founder-modern theme-${w.presentation.themeKey ?? 'default'}`}>
      <div className="demo-banner">OUT IN THE VINES · CONSUMER POC · TEMECULA</div>

      <header className="topbar">
        <a className="brand" href="/" aria-label="Out in the Vines home">
          <span className="brand-mark">O</span>
          <span className="brand-copy"><strong>Out in the Vines</strong><small>TEMECULA WINE COUNTRY</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Prototype navigation">
          <a href="#overview">Overview</a>
          <a href="#experience">Experience</a>
          <a href="#plan">Plan</a>
          <a href="#founders">Our Take</a>
        </nav>
        <div className="specimen-switcher" aria-label="POC winery switcher">
          <a href="/">Leoness</a>
          <a href="/doffo">Doffo</a>
        </div>
      </header>

      <section className="winery-hero" style={heroStyle}>
        <div className="winery-hero-content">
          <p className="eyebrow gold">{w.identity.subregion}</p>
          <h1>{w.identity.name}</h1>
          <p>{w.presentation.shortDescription}</p>
          <div className="hero-tags">
            {w.presentation.vibeLabels.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="overview" className="section detail-grid">
        <div className="detail-main">
          <div className="vinny-intro">
            <div className="vinny-badge">V</div>
            <div>
              <p className="eyebrow teal">VINNY’S TAKE</p>
              <div className="verdict">“{w.vinny.verdict}”</div>
            </div>
          </div>

          <div className="fit-strip">
            <div>
              <p className="eyebrow plum">GREAT FOR</p>
              <div className="tags">{w.vinny.bestFor.map((item) => <span key={item} className="tag">{item}</span>)}</div>
            </div>
            <div>
              <p className="eyebrow plum">MAYBE SKIP IF</p>
              <div className="tags muted-tags">{w.vinny.mayNotSuit.map((item) => <span key={item} className="tag">{item}</span>)}</div>
            </div>
          </div>

          <section id="experience" className="experience-block">
            <div className="section-head">
              <div><p className="eyebrow gold">THE EXPERIENCE</p><h2>Why you’d go</h2></div>
            </div>
            <ExperienceSection title="WINE" {...(w.domains.wine ?? {})} />
            <ExperienceSection title="FOOD" {...(w.domains.food ?? {})} />
            <ExperienceSection title="EXPERIENCE" {...(w.domains.experiences ?? {})} />
            <ExperienceSection title="EVENTS" {...(w.domains.events ?? {})} />
          </section>

          <section id="founders" className="founder-card">
            <p className="eyebrow gold">TWO HUSBANDS. TWO PALATES.</p>
            <h2>Andrew & Antonio</h2>
            <p className="founder-lead">{w.editorial.founderNote}</p>
            <div className="duo-notes">
              <article><span>ANDREW</span><strong>{w.editorial.andrewPick?.title}</strong><p>{w.editorial.andrewPick?.note}</p></article>
              <article><span>ANTONIO</span><strong>{w.editorial.antonioPick?.title}</strong><p>{w.editorial.antonioPick?.note}</p></article>
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <div className="rating-box">
            <p className="eyebrow gold">WELCOME</p>
            <div className="welcome-state">Review in progress</div>
            <small>{w.welcome.publicSummary}</small>
          </div>

          <section className="quick-card">
            <h2>Quick look</h2>
            <div className="fact-list">
              {w.vinny.quickLook.map((fact) => <Fact key={fact.key} label={fact.label} value={fact.value} unknown={fact.state === 'unknown'} />)}
            </div>
          </section>

          <section id="plan" className="quick-card planning-card">
            <h2>Plan your visit</h2>
            <div className="fact-list">
              <Fact label="Time to give it" value={w.planning.visitLength} unknown={!w.planning.visitLength} />
              <Fact label="Reservations" value={w.planning.reservations} unknown={!w.planning.reservations} />
              <Fact label="Groups" value={w.planning.groups} unknown={!w.planning.groups} />
              <Fact label="Best time" value={w.planning.bestTime} unknown={!w.planning.bestTime} />
            </div>
          </section>

          <div className="detail-actions">
            <button>♡ Save</button>
            <button>＋ Add to My Day</button>
            <a href={w.actions.directionsUrl ?? '#'}>Get directions</a>
            <button className="ask-vinny">Ask Vinny</button>
          </div>

          <p className="source-note">Prototype only. Unresolved governed facts stay unresolved until supplied by certified Vinny Intelligence.</p>
        </aside>
      </section>

      <nav className="bottom-nav">
        <a href="#overview">Overview</a>
        <a href="#experience">Experience</a>
        <button className="ask-vinny">Ask Vinny</button>
      </nav>
    </main>
  )
}
