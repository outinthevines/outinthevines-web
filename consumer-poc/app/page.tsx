import { leoness } from '../lib/mock-leoness'

function Domain({ title, summary, highlights }: { title: string; summary?: string | null; highlights?: string[] }) {
  if (!summary && (!highlights || highlights.length === 0)) return null
  return (
    <section className="card domain">
      <p className="eyebrow">{title}</p>
      {summary ? <p className="domain-summary">{summary}</p> : null}
      {highlights?.length ? <div className="chips">{highlights.map((item) => <span key={item}>{item}</span>)}</div> : null}
    </section>
  )
}

export default function Page() {
  const w = leoness
  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow light">{w.identity.subregion}</p>
          <h1>{w.identity.name}</h1>
          <p>{w.presentation.vibeLabels.join(' · ')}</p>
        </div>
      </section>

      <section className="content intro">
        <p className="dek">{w.presentation.shortDescription}</p>
        <div className="vinny-verdict">
          <span>VINNY SAYS</span>
          <p>“{w.vinny.verdict}”</p>
        </div>

        <section className="welcome-card">
          <div>
            <p className="eyebrow">WELCOME</p>
            <h2>Review in progress</h2>
          </div>
          <p>{w.welcome.publicSummary}</p>
        </section>

        <div className="actions" aria-label="Winery actions">
          <button>♡ Save</button>
          <button>＋ My Day</button>
          <a href={w.actions.directionsUrl ?? '#'}>Directions</a>
          <button className="ask">Ask Vinny</button>
        </div>

        <section>
          <div className="section-heading">
            <p className="eyebrow">QUICK LOOK</p>
            <h2>Know before you go.</h2>
          </div>
          <div className="quick-grid">
            {w.vinny.quickLook.map((fact) => (
              <article key={fact.key} className={`quick ${fact.state}`}>
                <strong>{fact.label}</strong>
                <span>{fact.value ?? 'Not yet verified'}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="fit-grid">
          <article className="card">
            <p className="eyebrow">PERFECT FOR</p>
            <ul>{w.vinny.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="card subtle">
            <p className="eyebrow">MAYBE SKIP IF</p>
            <ul>{w.vinny.mayNotSuit.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </section>

        <Domain title="WINE" {...(w.domains.wine ?? {})} />
        <Domain title="FOOD" {...(w.domains.food ?? {})} />
        <Domain title="EXPERIENCE" {...(w.domains.experiences ?? {})} />
        <Domain title="EVENTS" {...(w.domains.events ?? {})} />

        <section className="card planning">
          <p className="eyebrow">PLAN YOUR VISIT</p>
          <dl>
            <div><dt>Time to give it</dt><dd>{w.planning.visitLength ?? 'Not yet verified'}</dd></div>
            <div><dt>Reservations</dt><dd>{w.planning.reservations ?? 'Not yet verified'}</dd></div>
            <div><dt>Groups</dt><dd>{w.planning.groups ?? 'Not yet verified'}</dd></div>
            <div><dt>Best time</dt><dd>{w.planning.bestTime ?? 'Not yet verified'}</dd></div>
          </dl>
        </section>

        <section className="founders">
          <p className="eyebrow light">TWO HUSBANDS. TWO PALATES.</p>
          <h2>Andrew & Antonio</h2>
          <p>{w.editorial.founderNote}</p>
          <div className="founder-grid">
            <article><strong>{w.editorial.andrewPick?.title}</strong><p>{w.editorial.andrewPick?.note}</p></article>
            <article><strong>{w.editorial.antonioPick?.title}</strong><p>{w.editorial.antonioPick?.note}</p></article>
          </div>
        </section>

        <section className="freshness">
          <strong>About this profile</strong>
          <p>This proof of concept intentionally leaves unresolved governed facts unresolved. Production freshness, confidence and authority will come from the certified Vinny consumer API.</p>
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
