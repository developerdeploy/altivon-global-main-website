// Playwright CLI: first-visit theme, glass header and native phone scrolling.
async (page) => {
  const checks = [];
  const check = (value, label) => { if (!value) throw new Error(label); checks.push(label); };
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:4174/');
  await page.evaluate(() => localStorage.removeItem('altivon-theme'));
  await page.reload();
  await page.locator('#export-journey[data-painted=true]').waitFor();
  check(await page.locator('html').getAttribute('data-theme') === 'light', 'First visit opens in light mode');
  check(await page.locator('.motion-toggle').count() === 0, 'Pause button is absent on phone');
  const glass = await page.locator('.site-header').evaluate(el => ({blur:getComputedStyle(el).backdropFilter,bg:getComputedStyle(el).backgroundColor}));
  check(glass.blur.includes('blur') && glass.bg.includes('rgba'), 'Header uses translucent Gaussian blur');
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  const before = await page.evaluate(() => scrollY);
  const swipe = async (from, to) => {
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:195,y:from}]});
    for (let step=1; step<=8; step++) {
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:195,y:from+(to-from)*step/8}]});
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
    }
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  };
  await swipe(650,200);
  await page.waitForFunction(y => scrollY > y + 200, before);
  await page.waitForFunction(() => {const e=document.querySelector('#export-journey');return e.dataset.frame === e.dataset.scrollFrame;});
  const forward = Number(await page.locator('#export-journey').getAttribute('data-frame'));
  check(forward > 0, 'Native touch swipe scrolls the page and advances the film');
  await swipe(200,600);
  await page.waitForFunction(frame => Number(document.querySelector('#export-journey').dataset.frame) < frame, forward);
  check(true, 'Upward touch swipe reverses the film');
  await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:false});
  await cdp.detach();
  await page.screenshot({path:'output/playwright/glass-header-mobile.png',scale:'css'});
  await page.getByRole('button',{name:'Switch to dark theme',exact:true}).click();
  await page.reload();
  check(await page.locator('html').getAttribute('data-theme') === 'dark', 'An explicitly chosen dark theme persists');
  await page.getByRole('button',{name:'Switch to light theme',exact:true}).click();
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:4174/');
  check(await page.locator('.motion-toggle').count() === 0, 'Pause button is absent on desktop');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.motion-off').waitFor();
  check(await page.evaluate(() => getComputedStyle(document.documentElement).overflowY !== 'hidden' && getComputedStyle(document.body).overflowY !== 'hidden'), 'Reduced motion keeps native page scrolling available');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return checks;
}
