async (page) => {
  const base = new URL(page.url()).origin;
  const checks = [], errors = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); checks.push(message); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/api/inquiry', route => route.abort());
  await page.emulateMedia({reducedMotion:'no-preference'});
  for (const [width,height] of [[390,844],[320,568]]) {
    await page.setViewportSize({width,height});
    await page.goto(`${base}/`);
    await page.locator('.motion-on').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const nav = page.getByRole('navigation',{name:'Mobile navigation'});
    await nav.waitFor({state:'visible'});
    const bounds = await nav.boundingBox();
    check(Math.abs(bounds.y + bounds.height + 12 - height) < 2, `${width}px: mobile navigation floats above the bottom edge`);
    check(await nav.getByRole('link').count() === 5, `${width}px: all five navigation links are present`);
    check(await nav.locator('svg.nav-sculpture').count() === 5, `${width}px: all five pages have sculpted icons and labels`);
    check(await nav.evaluate(element => parseFloat(getComputedStyle(element).borderRadius) >= 24), `${width}px: navigation has rounded corners`);
    check(!await page.getByRole('navigation',{name:'Main navigation'}).isVisible(), `${width}px: top navigation is hidden`);
    check(await page.locator('.journey-poster').evaluate(image => image.currentSrc.includes('poster-mobile')), `${width}px: lightweight mobile poster selected`);
    for (const [index,seconds] of [[0,0],[2,20],[4,37],[6,55]]) {
      await page.locator('#export-journey').evaluate((element, seconds) => scrollTo(0, element.getBoundingClientRect().top + scrollY + (element.offsetHeight-innerHeight)*seconds/(59+1/3)),seconds);
      await page.waitForFunction(index => document.querySelector('#export-journey').dataset.stage === String(index),index);
      const fit = await page.evaluate(() => {
        const card = document.querySelector('.cinema-chapter[data-active=true]').getBoundingClientRect();
        const status = document.querySelector('.cinema-bottom').getBoundingClientRect();
        const header = document.querySelector('.site-header').getBoundingClientRect();
        const nav = document.querySelector('.mobile-bottom-nav').getBoundingClientRect();
        return {cardTop:card.top, cardBottom:card.bottom, headerBottom:header.bottom, statusTop:status.top, statusBottom:status.bottom, navTop:nav.top};
      });
      check(fit.cardTop >= fit.headerBottom && fit.cardBottom <= fit.statusTop && fit.statusBottom <= fit.navTop, `${width}px: chapter ${index+1} stays clear of both navigation bars (${JSON.stringify(fit)})`);
    }
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px: no horizontal overflow`);
  }
  await page.setViewportSize({width:390,height:844});
  for (const product of ['moringa-leaf-powder','beetroot-powder','ashwagandha-powder']) {
    await page.goto(`${base}/products/${product}`);
    await page.locator('.motion-on').waitFor();
    await page.waitForFunction(() => document.querySelectorAll('.catalogue-hero-photo img').length === 1 && document.querySelector('.catalogue-hero')?.getAttribute('data-visible') === 'true');
    check(await page.locator('link[rel=canonical]').count() === 1, `${product}: one canonical after hydration`);
    check(await page.locator('.catalogue-hero-photo img').evaluate(image => image.complete && image.naturalWidth > 0), `${product}: product photo loaded`);
    check(await page.locator('meta[name=robots]').getAttribute('content') === 'index, follow, max-snippet:-1, max-image-preview:large', `${product}: indexable metadata`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${product}: fits mobile width`);
  }
  await page.locator('a[href*="type=sample"]').first().click();
  await page.locator('select[name=product]').waitFor();
  check(await page.locator('select[name=product]').inputValue() === 'ashwagandha_powder', 'Product sample link selects Ashwagandha');
  check(await page.getByRole('button',{name:'Sample',exact:true}).getAttribute('aria-pressed') === 'true', 'Query-selected enquiry type survives hydration');
  await page.getByRole('button',{name:'Switch to dark theme',exact:true}).click();
  await page.reload();
  await page.getByRole('button',{name:'Switch to light theme',exact:true}).waitFor();
  check(await page.locator('html').getAttribute('data-theme') === 'dark','Saved dark preference survives hydration and reload');
  await page.getByRole('button',{name:'Switch to light theme',exact:true}).click();
  await page.waitForFunction(() => document.querySelectorAll('[data-reveal]').length > 0 && [...document.querySelectorAll('[data-reveal]')].filter(element => element.getBoundingClientRect().top < innerHeight && element.getBoundingClientRect().bottom > 80).every(element => getComputedStyle(element).opacity === '1'));
  await page.screenshot({path:'output/playwright/seo-mobile-bottom-navigation.png',fullPage:false});
  await page.setViewportSize({width:1440,height:1000});
  check(await page.getByRole('navigation',{name:'Main navigation'}).isVisible(),'Desktop keeps its top navigation');
  check(!await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),'Desktop has no bottom bar');
  await page.goto(`${base}/products`);
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Home',exact:true}).click();
  await page.waitForFunction(() => document.querySelector('link[rel=canonical]')?.getAttribute('href') === 'https://altivonglobal.com/');
  check((await page.locator('link[rel=canonical]').getAttribute('href')) === 'https://altivonglobal.com/','Client navigation updates the canonical');
  check(errors.length === 0, `No browser or hydration errors: ${errors.join('; ')}`);
  return {checks,errors};
}
