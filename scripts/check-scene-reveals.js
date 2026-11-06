// Run with playwright-cli run-code --filename=scripts/check-scene-reveals.js.
async (page) => {
  const checks = [], errors = [], failed = [];
  const check = (ok, name) => { if (!ok) throw new Error(name); checks.push(name); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && /\.(webp|jpg|js|css)(\?|$)/.test(response.url())) failed.push(response.url()); });
  const theme = async value => {
    if (await page.locator('html').getAttribute('data-theme') !== value)
      await page.getByRole('button', { name: `Switch to ${value} theme`, exact: true }).click();
  };
  const visible = locator => locator.evaluate(el => getComputedStyle(el).opacity === '1');
  const reveal = async locator => {
    await locator.scrollIntoViewIfNeeded();
    await page.waitForFunction(el => getComputedStyle(el).opacity === '1', await locator.elementHandle());
  };
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4174/');
  await page.locator('#journey-details[data-reveal]').waitFor({state:'attached'});
  check(!await visible(page.locator('#journey-details')), 'Details wait for the reader to reach them');
  check(await page.locator('.cinematic-home > .image-surface').count() === 10, 'All ten post-film sections have imagery');
  for (const section of await page.locator('.cinematic-home > .image-surface').all()) {
    await reveal(section);
    const image = section.locator('.scene-backdrop img');
    await image.evaluate(img => img.decode());
    check(await image.evaluate(img => img.naturalWidth > 0), `Section image loads: ${await section.getAttribute('id') || 'information'}`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Section stays within the mobile width');
  }
  const details = page.locator('#journey-details');
  const quote = page.locator('#quotation-brief');
  await reveal(quote);
  await quote.locator('select').first().selectOption('Germany');
  await quote.locator('select').first().evaluate(el => el.blur());
  for (let pass = 0; pass < 2; pass++) {
    await page.locator('#ingredient').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('#journey-details').dataset.visible === 'false');
    await reveal(details);
    check(await details.getAttribute('data-visible') === 'true', `Upward reveal replays on pass ${pass + 1}`);
    await page.locator('#export-journey').evaluate(el => scrollTo(0, el.offsetTop));
    await page.waitForFunction(() => document.querySelector('#quotation-brief').dataset.visible === 'false');
    await reveal(quote);
    check(await quote.locator('select').first().inputValue() === 'Germany', `Downward reveal replays and keeps form entries on pass ${pass + 1}`);
  }
  check(await quote.evaluate(el => el.offsetHeight >= innerHeight - 84), 'Quotation scene occupies at least a full screen below the header');
  check(await page.locator('.home-info-card > .site-icon,.buyer-card-top').count() === 0, 'Information rows have no decorative icon badges');
  check(await page.locator('.home-info-card').first().evaluate(el => getComputedStyle(el).backgroundColor === 'rgba(0, 0, 0, 0)' && getComputedStyle(el).borderRadius === '0px'), 'Information uses open rows instead of boxed cards');
  await page.goto('http://127.0.0.1:4174/');
  const input = page.locator('#quotation-brief select').first();
  await input.focus();
  check(await page.locator('#quotation-brief').getAttribute('data-visible') === 'true', 'Keyboard focus immediately reveals the quotation section');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check(await page.locator('[data-reveal]').evaluateAll(nodes => nodes.every(el => getComputedStyle(el).opacity === '1')), 'Reduced motion leaves every section visible');
  const centered = await page.locator('#ingredient .scene-backdrop').boundingBox();
  check(Math.abs(centered.x) < 2 && Math.abs(centered.width - 390) < 2, 'Reduced motion keeps photo backgrounds centered');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Quality', exact: true }).click();
  await page.locator('.page-intro[data-reveal][data-visible=true]').waitFor();
  await reveal(page.locator('.page-intro'));
  check(await visible(page.locator('.page-intro')), 'Lazy page content reveals after navigation from the homepage');
  const routes = ['products/moringa-leaf-powder', 'quality-documentation', 'bulk-supply', 'global-markets', 'about', 'contact', 'request-quote', 'enquiry-received', 'privacy-policy', 'missing-page'];
  for (const value of ['dark', 'light']) {
    await theme(value);
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:4174/${route}`);
      await page.locator('h1').waitFor();
      await page.locator('.page-backdrop img').evaluate(img => img.decode());
      await page.waitForFunction(() => [...document.querySelectorAll('[data-reveal]')].filter(el => {
        const r = el.getBoundingClientRect(); return r.bottom > 100 && r.top < innerHeight - 48;
      }).every(el => getComputedStyle(el).opacity === '1'));
      check(await page.locator('.page-backdrop img').evaluate(img => img.naturalWidth > 0), `${value}: ${route} background loads`);
      if (route === 'products/moringa-leaf-powder') check(await page.locator('.feature-check,.product-plus-number').count() === 0, `${value}: product highlights have no decorative badges`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${value}: ${route} has no mobile overflow`);
      if (['quality-documentation', 'request-quote', 'products/moringa-leaf-powder'].includes(route))
        await page.screenshot({ path: `output/playwright/background-${value}-${route.replaceAll('/', '-')}.png`, scale: 'css' });
    }
  }
  await page.goto('http://127.0.0.1:4174/');
  for (const [width, height] of [[320,568], [844,390]]) {
    await page.setViewportSize({width,height});
    const times = [0,12,20,29,37,44,55];
    for (let index = 0; index < times.length; index++) {
      const seconds = times[index];
      await page.locator('#export-journey').evaluate((el, seconds) => {
        scrollTo(0, el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * seconds / (59 + 1/3));
      }, seconds);
      await page.waitForFunction(index => document.querySelector('#export-journey').dataset.stage === String(index), index);
      await page.waitForFunction(() => {
        const el = document.querySelector('#export-journey');
        return el.dataset.frame === el.dataset.scrollFrame && Number(el.style.getPropertyValue('--copy-opacity')) > .9;
      });
      const bounds = await page.evaluate(() => {
        const card = document.querySelector('.cinema-chapter[data-active=true]').getBoundingClientRect();
        return {top:card.top,bottom:card.bottom,header:document.querySelector('.site-header').getBoundingClientRect().bottom,footer:document.querySelector('.cinema-bottom').getBoundingClientRect().top};
      });
      check(bounds.top >= bounds.header && bounds.bottom <= bounds.footer, `${width}x${height}: chapter at ${seconds}s fits above controls (${JSON.stringify(bounds)})`);
    }
    await page.screenshot({path:`output/playwright/cinema-small-${width}.png`,scale:'css'});
  }
  check(failed.length === 0, 'No missing image or code assets');
  check(errors.length === 0, 'No browser exceptions');
  return {checks,errors,failed};
}
