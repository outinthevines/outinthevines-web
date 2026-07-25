const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE = 'http://localhost:8099/';
const WINERY_IDS = ['doffo', 'leoness', 'akash', 'europa', 'wilson'];
const WINERY_NAMES = {
  doffo: 'Doffo Winery', leoness: 'Leoness Cellars', akash: 'Akash Winery',
  europa: 'Europa Village', wilson: 'Wilson Creek Winery'
};
const WINERY_THEMES = {
  doffo: 'moto', leoness: 'estate', akash: 'modern',
  europa: 'european', wilson: 'celebration'
};
const WINERY_SIGNATURES = {
  doffo: 'MOTO + MALBAC', leoness: 'ESTATE EXPERIENCE',
  akash: 'OPEN-AIR ENERGY', europa: 'THREE VILLAGES',
  wilson: 'POP THE ALMOND'
};
const WINERY_ACCENTS = {
  doffo: '#A66A3F', leoness: '#8D5A57', akash: '#20A58E',
  europa: '#B48243', wilson: '#B22A69'
};

const results = { passed: [], failed: [], warnings: [], consoleErrors: [], consoleWarnings: [], networkErrors: [], screenshots: [] };

function logPass(test) { results.passed.push(test); console.log('✅ PASS:', test); }
function logFail(test, detail) { results.failed.push({test, detail}); console.log('❌ FAIL:', test, detail ? '— ' + detail : ''); }
function logWarn(test) { results.warnings.push(test); console.log('⚠️  WARN:', test); }

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    headless: 'new'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Collect console messages
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') results.consoleErrors.push(text);
    else if (type === 'warning') results.consoleWarnings.push(text);
  });
  page.on('requestfailed', req => {
    results.networkErrors.push(`${req.url()} — ${req.failure().errorText}`);
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      results.networkErrors.push(`${resp.url()} — HTTP ${resp.status()}`);
    }
  });

  // ====== 1. Homepage loads ======
  console.log('\n=== 1. Homepage Load ===');
  try {
    await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 15000 });
    const title = await page.title();
    if (title === 'Out in the Vines') logPass(`Homepage loads (title: "${title}")`);
    else logFail('Homepage title', `got "${title}"`);

    const banner = await page.$eval('.demo-banner', el => el.textContent.trim()).catch(() => null);
    if (banner && banner.includes('OUT IN THE VINES')) logPass('Demo banner visible');
    else logFail('Demo banner visible');

    const heroH1 = await page.$eval('.hero h1', el => el.textContent.trim()).catch(() => null);
    if (heroH1 && heroH1.includes('Find your kind of')) logPass(`Hero headline present: "${heroH1.replace(/\n/g,' ')}"`);
    else logFail('Hero headline present', heroH1);

    // Wait for async winery data to load (initWineryData fetches JSON)
    await page.waitForFunction(() => window.WINERIES && window.WINERIES.length === 5, { timeout: 10000 });
    logPass('Async winery data loaded (WINERIES array populated)');

    await page.screenshot({ path: '/tmp/screenshots/01-homepage.png', fullPage: false });
    results.screenshots.push('01-homepage.png');
    logPass('Homepage screenshot taken');
  } catch (e) {
    logFail('Homepage load', e.message);
  }

  // ====== 2. Console errors / network errors ======
  console.log('\n=== 2. Console & Network Errors ===');
  // Wait a moment for any async errors
  await new Promise(r => setTimeout(r, 1000));
  if (results.consoleErrors.length === 0) logPass('No JavaScript console errors');
  else { results.consoleErrors.forEach(e => console.log('   CONSOLE ERROR:', e)); logFail(`${results.consoleErrors.length} console errors`); }
  if (results.consoleWarnings.length === 0) logPass('No console warnings');
  else { console.log(`   ${results.consoleWarnings.length} warnings:`); results.consoleWarnings.slice(0,5).forEach(w => console.log('   WARN:', w)); logWarn(`${results.consoleWarnings.length} console warnings`); }
  if (results.networkErrors.length === 0) logPass('No failed network requests');
  else { results.networkErrors.forEach(e => console.log('   NETWORK ERROR:', e)); logFail(`${results.networkErrors.length} network errors`); }

  // ====== 3. Featured Wineries section ======
  console.log('\n=== 3. Featured Wineries ===');
  try {
    await page.waitForSelector('#featuredWineries .winery-card', { timeout: 5000 });
    const cards = await page.$$('#featuredWineries .winery-card');
    if (cards.length === 5) logPass(`Featured Wineries shows ${cards.length} cards`);
    else logFail('Featured Wineries card count', `expected 5, got ${cards.length}`);

    // Check card content
    const firstCardText = await page.$eval('#featuredWineries .winery-card:first-child h3', el => el.textContent.trim());
    if (firstCardText) logPass(`First featured card has name: "${firstCardText}"`);
    else logFail('First featured card name empty');

    // Check for card image
    const cardImg = await page.$eval('#featuredWineries .winery-card:first-child .card-image', el => el.style.backgroundImage);
    if (cardImg && cardImg.includes('url')) logPass('Featured card has background image');
    else logFail('Featured card background image missing');
  } catch (e) {
    logFail('Featured Wineries section', e.message);
  }

  // ====== 4. Explore view ======
  console.log('\n=== 4. Explore View ===');
  try {
    await page.evaluate(() => showView('explore'));
    await page.waitForSelector('#exploreGrid .winery-card', { timeout: 5000 });
    const cards = await page.$$('#exploreGrid .winery-card');
    if (cards.length === 5) logPass(`Explore view shows ${cards.length} winery cards`);
    else logFail('Explore view card count', `expected 5, got ${cards.length}`);

    // Test search filter
    await page.type('#searchInput', 'leoness');
    await new Promise(r => setTimeout(r, 300));
    const filtered = await page.$$('#exploreGrid .winery-card');
    if (filtered.length === 1) logPass('Explore search filter works (1 result for "leoness")');
    else logFail('Explore search filter', `expected 1, got ${filtered.length}`);
    // Clear search
    await page.$eval('#searchInput', el => { el.value = ''; el.dispatchEvent(new Event('input')); });
    await new Promise(r => setTimeout(r, 300));

    // Test filter buttons
    await page.$eval('#filters button[data-filter="food"]', el => el.click());
    await new Promise(r => setTimeout(r, 300));
    const foodFiltered = await page.$$('#exploreGrid .winery-card');
    if (foodFiltered.length > 0 && foodFiltered.length < 5) logPass(`Explore food filter works (${foodFiltered.length} results)`);
    else logFail('Explore food filter', `got ${foodFiltered.length} results`);
    // Reset
    await page.$eval('#filters button[data-filter="all"]', el => el.click());
    await new Promise(r => setTimeout(r, 300));
  } catch (e) {
    logFail('Explore view', e.message);
  }

  // ====== 5. Picks view ======
  console.log('\n=== 5. Picks View ===');
  try {
    await page.evaluate(() => showView('picks'));
    await page.waitForSelector('#picksGrid .pick-card', { timeout: 5000 });
    const pickCards = await page.$$('#picksGrid .pick-card');
    if (pickCards.length === 5) logPass(`Picks view shows ${pickCards.length} founder pick cards (1 per winery, alternating Andrew/Antonio)`);
    else if (pickCards.length > 0) logWarn(`Picks view shows ${pickCards.length} pick cards (expected 5)`);
    else logFail('Picks view pick cards', 'none found');

    // Check andrew/antonio labels
    const andrewCards = await page.$$('#picksGrid .pick-card.andrew');
    const antonioCards = await page.$$('#picksGrid .pick-card.antonio');
    if (andrewCards.length > 0 && antonioCards.length > 0) logPass(`Picks has Andrew (${andrewCards.length}) and Antonio (${antonioCards.length}) cards`);
    else logFail('Picks Andrew/Antonio split', `andrew=${andrewCards.length}, antonio=${antonioCards.length}`);
  } catch (e) {
    logFail('Picks view', e.message);
  }

  // ====== 6. Nearby view ======
  console.log('\n=== 6. Nearby View ===');
  try {
    await page.evaluate(() => showView('nearby'));
    await page.waitForSelector('#nearbyGrid .nearby-card', { timeout: 5000 });
    const nearbyCards = await page.$$('#nearbyGrid .nearby-card');
    if (nearbyCards.length === 5) logPass(`Nearby view shows ${nearbyCards.length} nearby winery cards`);
    else logFail('Nearby view card count', `expected 5, got ${nearbyCards.length}`);

    // Check distance labels
    const dist = await page.$eval('#nearbyGrid .nearby-card:first-child .distance', el => el.textContent.trim());
    if (dist && dist.includes('mi away')) logPass(`Nearby card shows distance: "${dist}"`);
    else logFail('Nearby card distance', `got "${dist}"`);

    // Test nearby filter buttons
    await page.evaluate(() => renderNearby('food'));
    await new Promise(r => setTimeout(r, 300));
    const foodCards = await page.$$('#nearbyGrid .nearby-card');
    if (foodCards.length > 0 && foodCards.length < 5) logPass(`Nearby food filter works (${foodCards.length} results)`);
    else logFail('Nearby food filter', `got ${foodCards.length}`);
  } catch (e) {
    logFail('Nearby view', e.message);
  }

  // ====== 7. Passport view ======
  console.log('\n=== 7. Passport View ===');
  try {
    await page.evaluate(() => showView('passport'));
    await page.waitForSelector('#passportGrid article', { timeout: 5000 });
    const stamps = await page.$$('#passportGrid article');
    if (stamps.length === 5) logPass(`Passport view shows ${stamps.length} passport entries`);
    else logFail('Passport entries', `expected 5, got ${stamps.length}`);

    const visited = await page.$$('#passportGrid article.visited');
    if (visited.length === 2) logPass(`Passport shows ${visited.length} visited wineries`);
    else logFail('Passport visited count', `expected 2, got ${visited.length}`);

    // Check progress bar
    const progress = await page.$eval('.progress span', el => el.style.width);
    if (progress === '40%') logPass('Passport progress bar at 40% (2 of 5)');
    else logFail('Passport progress bar', `expected 40%, got "${progress}"`);
  } catch (e) {
    logFail('Passport view', e.message);
  }

  // ====== 8. Favorites view ======
  console.log('\n=== 8. Favorites View ===');
  try {
    // Clear localStorage to test empty state
    await page.evaluate(() => { localStorage.removeItem('oitv-favorites'); });
    await page.evaluate(() => { favorites = []; updateCounts(); });
    await page.evaluate(() => showView('favorites'));
    await new Promise(r => setTimeout(r, 500));
    await page.evaluate(() => renderFavorites());
    await new Promise(r => setTimeout(r, 300));
    const emptyState = await page.$('#favoritesGrid .empty');
    if (emptyState) logPass('Favorites shows empty state when no favorites');
    else logFail('Favorites empty state', 'not found');

    // Add a favorite and check - need to also call renderFeatured/renderExplore to update internal state
    await page.evaluate(() => { favorites = ['leoness']; localStorage.setItem('oitv-favorites', JSON.stringify(favorites)); updateCounts(); renderFavorites(); });
    await new Promise(r => setTimeout(r, 500));
    const favCards = await page.evaluate(() => document.querySelectorAll('#favoritesGrid .winery-card').length);
    if (favCards === 1) logPass('Favorites shows 1 card after adding favorite');
    else logFail('Favorites with 1 fav', `got ${favCards} cards`);
    // Reset
    await page.evaluate(() => { localStorage.removeItem('oitv-favorites'); favorites = []; });
  } catch (e) {
    logFail('Favorites view', e.message);
  }

  // ====== 9. My Day view ======
  console.log('\n=== 9. My Day View ===');
  try {
    await page.evaluate(() => { localStorage.removeItem('oitv-day'); myDay = []; });
    await page.evaluate(() => showView('myday'));
    await new Promise(r => setTimeout(r, 300));
    await page.evaluate(() => renderDay());
    await new Promise(r => setTimeout(r, 300));
    const emptyDay = await page.$('#dayList .empty');
    if (emptyDay) logPass('My Day shows empty state when no items');
    else logFail('My Day empty state', 'not found');

    // Add items to day
    await page.evaluate(() => { myDay = ['leoness', 'akash']; localStorage.setItem('oitv-day', JSON.stringify(myDay)); renderDay(); });
    await new Promise(r => setTimeout(r, 500));
    const dayItems = await page.evaluate(() => document.querySelectorAll('#dayList .day-item').length);
    if (dayItems === 2) logPass('My Day shows 2 items after adding');
    else logFail('My Day with items', `got ${dayItems} items`);

    // Test 3-item limit
    await page.evaluate(() => addToDay('doffo'));
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => addToDay('europa'));
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => renderDay());
    await new Promise(r => setTimeout(r, 300));
    const dayItems3 = await page.evaluate(() => document.querySelectorAll('#dayList .day-item').length);
    if (dayItems3 === 3) logPass('My Day enforces 3-item max (3 items, 4th rejected)');
    else logFail('My Day 3-item limit', `got ${dayItems3} items`);
    // Reset
    await page.evaluate(() => { localStorage.removeItem('oitv-day'); myDay = []; });
  } catch (e) {
    logFail('My Day view', e.message);
  }

  // ====== 10 & 11 & 12. Winery profiles ======
  console.log('\n=== 10-12. Winery Profile Verification ===');
  for (const slug of WINERY_IDS) {
    console.log(`\n--- Winery: ${slug} (${WINERY_NAMES[slug]}) ---`);
    try {
      // Open winery profile
      await page.evaluate((id) => openWinery(id), slug);
      await page.waitForSelector('#wineryDetail .winery-profile', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 500));

      // Hero section
      const heroName = await page.$eval('.winery-hero h1', el => el.textContent.trim()).catch(() => null);
      if (heroName === WINERY_NAMES[slug]) logPass(`[${slug}] Hero shows name: "${heroName}"`);
      else logFail(`[${slug}] Hero name`, `expected "${WINERY_NAMES[slug]}", got "${heroName}"`);

      const heroImg = await page.$eval('.winery-hero', el => el.style.backgroundImage).catch(() => null);
      if (heroImg && heroImg.includes('url')) logPass(`[${slug}] Hero has background image`);
      else logFail(`[${slug}] Hero background image`, 'missing');

      const heroBack = await page.$('.winery-hero .back');
      if (heroBack) logPass(`[${slug}] Hero has back button`);
      else logFail(`[${slug}] Hero back button`, 'missing');

      // Welcome strip
      const welcomeStrip = await page.$('.profile-welcome-strip');
      if (welcomeStrip) logPass(`[${slug}] Welcome strip appears below hero`);
      else logFail(`[${slug}] Welcome strip`, 'not found');

      const welcomeDesignation = await page.$eval('.profile-welcome-badge strong', el => el.textContent.trim()).catch(() => null);
      if (welcomeDesignation) logPass(`[${slug}] Welcome designation: "${welcomeDesignation}"`);
      else logFail(`[${slug}] Welcome designation`, 'empty');

      // Signature line
      const sigText = await page.$eval('.profile-signature strong', el => el.textContent.trim()).catch(() => null);
      const sigEyebrow = await page.$eval('.profile-signature span', el => el.textContent.trim()).catch(() => null);
      if (sigEyebrow && sigEyebrow.includes(WINERY_SIGNATURES[slug])) logPass(`[${slug}] Signature eyebrow: "${sigEyebrow}"`);
      else logFail(`[${slug}] Signature line`, `expected "${WINERY_SIGNATURES[slug]}", got "${sigEyebrow}"`);
      if (sigText) logPass(`[${slug}] Signature headline: "${sigText}"`);

      // Overview section
      const verdict = await page.$eval('#overview .verdict', el => el.textContent.trim()).catch(() => null);
      if (verdict && verdict.includes('🐦')) logPass(`[${slug}] Overview verdict present: "${verdict.substring(0,50)}..."`);
      else logFail(`[${slug}] Overview verdict`, `got "${verdict}"`);

      const knownForTags = await page.$$('#overview .known-for span');
      if (knownForTags.length > 0) logPass(`[${slug}] Known for tags: ${knownForTags.length} tags`);
      else logFail(`[${slug}] Known for tags`, 'none found');

      // Quick Look section
      const quickFacts = await page.$$('#quick-look .quick-facts-grid .quick-fact');
      if (quickFacts.length === 8) logPass(`[${slug}] Quick Look: ${quickFacts.length} quick facts`);
      else logFail(`[${slug}] Quick Look facts`, `expected 8, got ${quickFacts.length}`);

      const perfectPills = await page.$$('#quick-look .perfect-pills span');
      if (perfectPills.length > 0) logPass(`[${slug}] Perfect for: ${perfectPills.length} pills`);
      else logFail(`[${slug}] Perfect for pills`, 'none');

      const skipItems = await page.$$('#quick-look .fit-grid article:last-child ul li');
      if (skipItems.length > 0) logPass(`[${slug}] Skip if: ${skipItems.length} items`);
      else logFail(`[${slug}] Skip if items`, 'none');

      const scoreRows = await page.$$('#quick-look .scorecard .score-row');
      if (scoreRows.length === 8) logPass(`[${slug}] Scorecard: ${scoreRows.length} score rows`);
      else logFail(`[${slug}] Scorecard rows`, `expected 8, got ${scoreRows.length}`);

      // Plan Your Visit section
      const planGrid = await page.$$('.planning-grid article');
      if (planGrid.length === 4) logPass(`[${slug}] Plan Your Visit: ${planGrid.length} planning items`);
      else logFail(`[${slug}] Plan Your Visit grid`, `expected 4, got ${planGrid.length}`);

      const amenities = await page.$$('.amenity-grid span');
      if (amenities.length > 0) logPass(`[${slug}] Amenities: ${amenities.length} items`);
      else logFail(`[${slug}] Amenities`, 'none');

      // Hours section
      const hoursRows = await page.$$('#hours .hours-table .hours-row');
      if (hoursRows.length > 0) logPass(`[${slug}] Hours: ${hoursRows.length} rows`);
      else logFail(`[${slug}] Hours rows`, 'none');

      // Events section
      const eventCards = await page.$$('#events-profile .events-list .profile-event');
      if (eventCards.length > 0) logPass(`[${slug}] Events: ${eventCards.length} event cards`);
      else logFail(`[${slug}] Event cards`, 'none');

      // Reviews section
      const editorial = await page.$eval('#reviews-profile .editorial-review p', el => el.textContent.trim()).catch(() => null);
      if (editorial && editorial.length > 20) logPass(`[${slug}] Editorial take present (${editorial.length} chars)`);
      else logFail(`[${slug}] Editorial take`, 'missing or too short');

      const visitorNotes = await page.$$('#reviews-profile .visitor-notes li');
      if (visitorNotes.length > 0) logPass(`[${slug}] Visitor patterns: ${visitorNotes.length} notes`);
      else logFail(`[${slug}] Visitor patterns`, 'none');

      // Andrew & Antonio section
      const andrewCard = await page.$('.duo-grid .pick-card.andrew');
      const antonioCard = await page.$('.duo-grid .pick-card.antonio');
      if (andrewCard && antonioCard) logPass(`[${slug}] Andrew & Antonio: 2 pick cards present`);
      else logFail(`[${slug}] Andrew & Antonio cards`, `andrew=${!!andrewCard}, antonio=${!!antonioCard}`);

      // First Visit Essentials sidebar
      const essentials = await page.$$('.profile-side-card .fact-list .fact');
      const essentialsHeader = await page.$eval('.profile-side-card h3', el => el.textContent.trim()).catch(() => null);
      if (essentials.length > 0 && essentialsHeader && essentialsHeader.includes('First-visit')) logPass(`[${slug}] First Visit Essentials: ${essentials.length} items`);
      else logFail(`[${slug}] First Visit Essentials`, `header="${essentialsHeader}", facts=${essentials.length}`);

      // Official Information sidebar
      const officialLinks = await page.$$('.profile-side-card a[target="_blank"]');
      let officialFound = false;
      for (const link of officialLinks) {
        const text = await page.evaluate(el => el.textContent, link);
        if (text.includes('official winery page')) { officialFound = true; break; }
      }
      if (officialFound) logPass(`[${slug}] Official Information sidebar card appears`);
      else logFail(`[${slug}] Official Information sidebar`, 'link not found');

      // Theme verification (check 11)
      const themeClass = await page.$eval('.winery-profile', el => el.className).catch(() => '');
      const expectedTheme = WINERY_THEMES[slug];
      if (themeClass.includes(`theme-${expectedTheme}`)) logPass(`[${slug}] Theme class: theme-${expectedTheme}`);
      else logFail(`[${slug}] Theme class`, `expected theme-${expectedTheme}, got "${themeClass}"`);

      // Check CSS variable for accent color
      const accentVar = await page.$eval('.winery-profile', el => getComputedStyle(el).getPropertyValue('--profile-accent').trim()).catch(() => '');
      const expectedAccent = WINERY_ACCENTS[slug].toLowerCase();
      if (accentVar && accentVar.toLowerCase().includes(expectedAccent.replace('#',''))) logPass(`[${slug}] Theme accent color: ${accentVar}`);
      else logFail(`[${slug}] Theme accent color`, `expected ${expectedAccent}, got "${accentVar}"`);

      // Screenshot for doffo and leoness (check 13)
      if (slug === 'doffo' || slug === 'leoness') {
        const ssPath = `/tmp/screenshots/13-${slug}-profile.png`;
        await page.screenshot({ path: ssPath, fullPage: false });
        results.screenshots.push(`${slug}-profile.png`);
        logPass(`[${slug}] Screenshot saved: ${ssPath}`);
      }

    } catch (e) {
      logFail(`[${slug}] Profile load`, e.message);
    }
  }

  // ====== 12. Sequential winery opening reliability ======
  console.log('\n=== 12. Sequential Opening Reliability ===');
  try {
    const seq = ['leoness', 'doffo', 'wilson'];
    for (const slug of seq) {
      await page.evaluate((id) => openWinery(id), slug);
      await page.waitForSelector('#wineryDetail .winery-profile', { timeout: 8000 });
      await new Promise(r => setTimeout(r, 300));
      const name = await page.$eval('.winery-hero h1', el => el.textContent.trim());
      if (name === WINERY_NAMES[slug]) logPass(`Sequential open: ${slug} → "${name}" ✓`);
      else logFail(`Sequential open: ${slug}`, `got "${name}"`);
    }
    logPass('Sequential winery opening works reliably (3 in a row)');
  } catch (e) {
    logFail('Sequential opening reliability', e.message);
  }

  // ====== 14. Mobile viewport ======
  console.log('\n=== 14. Mobile Viewport ===');
  try {
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => showView('home'));
    await new Promise(r => setTimeout(r, 500));

    // Check bottom nav is visible on mobile
    const bottomNav = await page.$('.bottom-nav');
    const navVisible = await page.$eval('.bottom-nav', el => {
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }).catch(() => false);
    if (navVisible) logPass('Mobile: Bottom nav visible');
    else logFail('Mobile: Bottom nav visible', 'hidden');

    // Check featured cards on mobile
    await page.evaluate(() => showView('explore'));
    await new Promise(r => setTimeout(r, 500));
    const mobileCards = await page.evaluate(() => document.querySelectorAll('#exploreGrid .winery-card').length);
    if (mobileCards === 5) logPass(`Mobile: Explore shows ${mobileCards} cards`);
    else logFail('Mobile: Explore cards', `got ${mobileCards}`);

    // Open a winery on mobile
    await page.evaluate(() => openWinery('leoness'));
    await page.waitForSelector('#wineryDetail .winery-profile', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 500));
    const mobileHeroName = await page.$eval('.winery-hero h1', el => el.textContent.trim());
    if (mobileHeroName === 'Leoness Cellars') logPass('Mobile: Winery profile opens correctly');
    else logFail('Mobile: Winery profile', `got "${mobileHeroName}"`);

    await page.screenshot({ path: '/tmp/screenshots/14-mobile-leoness.png', fullPage: false });
    results.screenshots.push('14-mobile-leoness.png');
    logPass('Mobile screenshot taken');

    // Reset viewport
    await page.setViewport({ width: 1440, height: 900 });
  } catch (e) {
    logFail('Mobile viewport', e.message);
  }

  await browser.close();

  // ====== Summary ======
  console.log('\n========================================');
  console.log('   VERIFICATION SUMMARY');
  console.log('========================================');
  console.log(`Tests Passed:   ${results.passed.length}`);
  console.log(`Tests Failed:   ${results.failed.length}`);
  console.log(`Warnings:       ${results.warnings.length}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Console Warnings: ${results.consoleWarnings.length}`);
  console.log(`Network Errors: ${results.networkErrors.length}`);
  console.log(`Screenshots:    ${results.screenshots.length}`);
  console.log('========================================');
  if (results.failed.length > 0) {
    console.log('\nFAILED TESTS:');
    results.failed.forEach(f => console.log(`  ❌ ${f.test}${f.detail ? ' — ' + f.detail : ''}`));
  }
  if (results.consoleErrors.length > 0) {
    console.log('\nCONSOLE ERRORS:');
    results.consoleErrors.forEach(e => console.log(`  ⚠️  ${e}`));
  }
  if (results.networkErrors.length > 0) {
    console.log('\nNETWORK ERRORS:');
    results.networkErrors.forEach(e => console.log(`  ⚠️  ${e}`));
  }

  // Write results to file
  fs.writeFileSync('/tmp/verification-results.json', JSON.stringify(results, null, 2));
  console.log('\nFull results written to /tmp/verification-results.json');
})();
