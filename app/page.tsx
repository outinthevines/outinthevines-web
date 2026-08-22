'use client'

const ASSET = 'https://outinthevines.github.io/outinthevines-web/assets'

const vibes = [
  ['💕','Romantic Escape','Sunsets, dining, slow sips'],
  ['🍷','Big Reds','Cab Franc, Syrah, bold blends'],
  ['🥂','Celebration','Bubbles, birthdays, good news'],
  ['🍽️','Foodie Day','Real meals and pairings'],
  ['🎶','Live & Lively','Music, groups, energy'],
  ['🏍️','Something Different','Not your standard tasting'],
  ['🌿','Hidden Gems','Lower-key, less hurried'],
  ['🌈','Feel Welcome','Hospitality that matters']
]

export default function HomePage(){
  return <>
    <div className="demo-banner">OUT IN THE VINES · FOUNDER’S EDITION · NEXT.JS MIGRATION</div>
    <header className="topbar">
      <button className="brand"><img className="brand-logo-img" src={`${ASSET}/brand/primary-logo.png`} alt="Out in the Vines" /></button>
      <nav className="desktop-nav"><button>Explore</button><button>Map</button><button>Our Picks</button><button>Nearby</button><button>Meet Vinny</button><button>Inclusivity</button></nav>
      <button className="icon-btn">♡ 0</button>
    </header>
    <main>
      <section id="home" className="view active">
        <div className="hero"><div className="hero-shade"/><div className="hero-content">
          <div className="vinny-card"><div className="vinny-illustration realistic"><img src={`${ASSET}/brand/vinny-hero.png`} alt="Vinny" /></div><div><span className="script">Hey there,</span><h2>I’m Vinny!</h2><p>Your guide to wine country where you belong.</p></div></div>
          <p className="eyebrow">TEMECULA, CALIFORNIA</p><h1>Find your kind of<br/><em>wine country.</em></h1><p className="hero-copy">Inclusive insights, honest local recommendations, and really good wine.</p>
          <div className="hero-actions hero-actions-v2"><button className="primary">Plan by vibe</button><button className="secondary light">I’m already in Temecula</button></div>
        </div></div>

        <section className="section trust-strip">
          <article><span>🌈</span><div><strong>Welcome, researched</strong><small>Transparent methodology, never pay-to-play rankings.</small></div></article>
          <article><span>🍷</span><div><strong>Wine, personally tasted</strong><small>Distinct recommendations from Andrew and Antonio.</small></div></article>
          <article><span>🐦</span><div><strong>Guided by Vinny</strong><small>Fast, friendly answers built for the moment.</small></div></article>
        </section>

        <section className="section intro"><p className="eyebrow plum">START WITH THE VIBE</p><h2>What kind of wine day are we having?</h2><div className="mood-grid vibe-grid">{vibes.map(([icon,title,copy])=><button key={title}><span>{icon}</span><strong>{title}</strong><small>{copy}</small></button>)}</div></section>

        <section className="section picks-preview"><div className="section-head"><div><p className="eyebrow gold">TWO HUSBANDS. TWO PALATES.</p><h2>Andrew & Antonio’s picks</h2></div><button className="text-btn">See all →</button></div><div className="duo-grid"><article className="pick-card andrew"><span className="person">ANDREW’S CURRENT PICK</span><h3>Leoness Cabernet Franc</h3><p>A slow-afternoon red with the structure and depth Andrew keeps coming back for.</p><button>View Leoness</button></article><article className="pick-card antonio"><span className="person">ANTONIO’S CURRENT PICK</span><h3>Antonio’s current pour</h3><p>Bright, expressive and exactly the kind of bottle he tells friends to order first.</p><button>See Antonio’s pick</button></article></div></section>

        <section className="welcome-home"><div className="welcome-home-inner"><div className="welcome-home-badge"><div className="verified-medal"><img src={`${ASSET}/brand/vinny-pride.png`} alt="Vinny Welcome"/><span>VINNY VERIFIED™</span><strong>Highly Welcoming</strong><small>WELCOME INDEX™</small></div></div><div className="welcome-home-copy"><p className="eyebrow gold">THE WELCOME INDEX™</p><h2>Hospitality is not a footnote.</h2><p>It is the reason many travelers choose one winery over another. The Welcome Index™ turns hospitality, guest comfort, public actions and lived experience into a transparent editorial report.</p><p><strong>Vinny Verified™</strong> is recognition wineries can earn when the evidence supports consistently exceptional hospitality.</p><div className="welcome-home-actions"><button className="primary">How the index works</button><button className="secondary light">Explore wineries</button></div></div></div></section>

        <section className="founders-section"><div className="founders-photo"><img src={`${ASSET}/people/andrew-antonio-ai.png`} alt="Andrew and Antonio in wine country"/></div><div className="founders-copy"><p className="eyebrow gold">MEET YOUR LOCAL GUIDES</p><h2>Andrew & Antonio</h2><p className="founders-lead">Two husbands, two palates, and one shared belief: wine country should feel welcoming before you ever step through the door.</p><p>Local perspective, strong opinions, actual visits and a queer lens on the hospitality details travelers often have to guess about.</p><div className="founder-pills"><span>🍷 Real recommendations</span><span>🌈 Queer perspective</span><span>📍 Temecula locals</span></div><button className="primary">See our picks</button></div></section>

        <section className="section roadmap-preview"><div className="section-head"><div><p className="eyebrow gold">COMING INTO VIEW</p><h2>The future travel companion</h2></div></div><div className="preview-grid"><article><span>📍</span><h3>Vinny Nearby</h3><p>Open now, close by, and right for the moment.</p><button>Explore nearby</button></article><article><span>🍇</span><h3>Wine Passport</h3><p>Track wineries visited and unlock regional milestones.</p><button>Preview passport</button></article><article><span>🗓️</span><h3>Events</h3><p>Music, dinners, drag brunches, tastings, and more.</p><button>Browse events</button></article></div></section>

        <section className="winery-spotlight"><div className="spotlight-media"><img src={`${ASSET}/wineries/leoness.jpg`} alt="Leoness Cellars"/><div className="spotlight-badge"><img src={`${ASSET}/brand/vinny-cheers.png`} alt=""/><div><span>WINERY SPOTLIGHT</span><strong>Leoness Cellars</strong></div></div></div><div className="spotlight-copy"><p className="eyebrow plum">WINERY SPOTLIGHT</p><h2>One of Temecula’s best places to slow down.</h2><p className="spotlight-dek">Leoness is the kind of winery that rewards an unhurried afternoon: estate wines, vineyard views, and a meal worth planning around.</p><blockquote>“We’ve returned enough times to know the magic isn’t one single thing. It’s the way the wine, the view, and the pace all work together.”</blockquote><div className="spotlight-actions"><button className="primary">Explore Leoness</button><button className="secondary">Read our notes</button></div></div></section>

        <section className="section currently-pouring"><div className="section-head"><div><p className="eyebrow gold">CURRENTLY POURING</p><h2>What’s in our glasses</h2></div></div><div className="pour-grid"><article className="pour-card"><div className="pour-bottle">🍷</div><div><span>ANDREW</span><h3>Leoness Cabernet Franc</h3><p>“Still my benchmark red for a slow Temecula afternoon.”</p></div></article><article className="pour-card"><div className="pour-bottle">🥂</div><div><span>ANTONIO</span><h3>Antonio’s current favorite</h3><p>“The bottle I’d order when friends are in town.”</p></div></article></div></section>

        <section className="section noteworthy"><div className="section-head"><div><p className="eyebrow teal">NEW & NOTEWORTHY</p><h2>Right now in wine country</h2></div></div><div className="noteworthy-grid"><article><span>EVENTS</span><h3>What’s happening this weekend</h3><p>Music, dinners and reasons to choose one stop over another.</p><button>Browse events</button></article><article><span>GUIDE</span><h3>Three wineries. One excellent day.</h3><p>Build a realistic itinerary without turning wine tasting into a race.</p><button>Build My Day</button></article><article><span>WELCOME INDEX</span><h3>Hospitality, made transparent</h3><p>See how welcome intelligence becomes something useful to travelers.</p><button>Explore the standard</button></article></div></section>
      </section>
    </main>
    <div className="migration-note">Founder visual parity · React migration branch</div>
  </>
}
