import type { ConsumerWinery } from '../types/consumer'

function EditorialDomain({ title, summary, highlights, index }: { title: string; summary?: string | null; highlights?: string[]; index: string }) {
  if (!summary && (!highlights || highlights.length === 0)) return null
  return (
    <section className="editorial-domain">
      <div className="editorial-domain-index">{index}</div>
      <div>
        <p className="eyebrow">{title}</p>
        {summary ? <p className="editorial-domain-summary">{summary}</p> : null}
        {highlights?.length ? <div className="inline-highlights">{highlights.map((item) => <span key={item}>{item}</span>)}</div> : null}
      </div>
    </section>
  )
}

export function WineryProfile({ winery }: { winery: ConsumerWinery }) {
  const w = winery
  const heroStyle = w.presentation.heroImage ? { backgroundImage: `url(${w.presentation.heroImage})` } : undefined

  return (
    <main className={`theme-${w.presentation.themeKey ?? 'default'}`}>
      <div className="specimen-switcher" aria-label="POC winery switcher">
        <span>Founder’s Edition · Next</span>
        <a href="/">Leoness</a>
        <a href="/doffo">Doffo</a>
      </div>

      <section className="editorial-hero" style={heroStyle}>
        <div className="editorial-hero-shade" />
        <div className="editorial-hero-content">
          <p className="eyebrow hero-eyebrow">{w.identity.subregion}</p>
          <h1>{w.identity.name}</h1>
          <p className="hero-vibe">{w.presentation.vibeLabels.join(' · ')}</p>
          <p className="hero-dek">{w.presentation.shortDescription}</p>
        </div>
        <div className="hero-number">01</div>
      </section>

      <section className="story-shell">
        <div className="story-lead">
          <div>
            <p className="eyebrow">VINNY’S TAKE</p>
            <blockquote>“{w.vinny.verdict}”</blockquote>
          </div>
          <div className="welcome-note">
            <span className="welcome-mark">V</span>
            <div>
              <p className="eyebrow">WELCOME STATUS</p>
              <strong>Review in progress</strong>
              <p>{w.welcome.publicSummary}</p>
            </div>
          </div>
        </div>

        <div className="primary-actions" aria-label="Winery actions">
          <button>♡ Save</button>
          <button>＋ My Day</button>
          <a href={w.actions.directionsUrl ?? '#'}>Directions ↗</a>
          <button className="ask">Ask Vinny</button>
        </div>

        <section className="quick-story">
          <div className="section-title-block">
            <p className="eyebrow">THE QUICK READ</p>
            <h2>Know the vibe before you pull in.</h2>
          </div>
          <div className="quick-rail">
            {w.vinny.quickLook.map((fact) => (
              <article key={fact.key} className={`quick-story-item ${fact.state}`}>
                <span>{fact.label}</span>
                <strong>{fact.value ?? 'Not yet verified'}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="fit-editorial">
          <div className="fit-column">
            <p className="eyebrow">THIS IS YOUR PLACE IF</p>
            <ul>{w.vinny.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="fit-column muted-fit">
            <p className="eyebrow">MAYBE NOT TODAY IF</p>
            <ul>{w.vinny.mayNotSuit.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="domain-story">
          <div className="section-title-block wide-title">
            <p className="eyebrow">WHY YOU’D GO</p>
            <h2>The experience, without the brochure copy.</h2>
          </div>
          <div className="editorial-domain-list">
            <EditorialDomain index="01" title="WINE" {...(w.domains.wine ?? {})} />
            <EditorialDomain index="02" title="FOOD" {...(w.domains.food ?? {})} />
            <EditorialDomain index="03" title="EXPERIENCE" {...(w.domains.experiences ?? {})} />
            <EditorialDomain index="04" title="EVENTS" {...(w.domains.events ?? {})} />
          </div>
        </section>

        <section className="planning-editorial">
          <div className="planning-heading">
            <p className="eyebrow light">PLAN THE STOP</p>
            <h2>The part that keeps a gorgeous wine day from becoming a logistical mess.</h2>
          </div>
          <dl>
            <div><dt>Time to give it</dt><dd>{w.planning.visitLength ?? 'Not yet verified'}</dd></div>
            <div><dt>Reservations</dt><dd>{w.planning.reservations ?? 'Not yet verified'}</dd></div>
            <div><dt>Groups</dt><dd>{w.planning.groups ?? 'Not yet verified'}</dd></div>
            <div><dt>Best time</dt><dd>{w.planning.bestTime ?? 'Not yet verified'}</dd></div>
          </dl>
        </section>

        <section className="founder-editorial">
          <div className="founder-copy">
            <p className="eyebrow gold">TWO HUSBANDS. TWO PALATES.</p>
            <h2>Andrew & Antonio</h2>
            <p className="founder-lead">{w.editorial.founderNote}</p>
          </div>
          <div className="founder-notes">
            <article><span>ANDREW</span><h3>{w.editorial.andrewPick?.title}</h3><p>{w.editorial.andrewPick?.note}</p></article>
            <article><span>ANTONIO</span><h3>{w.editorial.antonioPick?.title}</h3><p>{w.editorial.antonioPick?.note}</p></article>
          </div>
        </section>

        <section className="freshness-editorial">
          <span>ABOUT THIS PROFILE</span>
          <p>This prototype keeps unresolved governed facts unresolved. Production freshness, confidence and authority will come from certified Vinny Intelligence.</p>
        </section>
      </section>

      <nav className="mobile-bar">
        <button>♡ Save</button>
        <button>＋ My Day</button>
        <button className="ask">Ask Vinny</button>
      </nav>
    </main>
  )
}
