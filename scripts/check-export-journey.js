// Run with playwright-cli run-code --filename=scripts/check-export-journey.js.
async (page) => {
  const checks = [], errors = [], backend = [];
  const check = (ok, name) => { if (!ok) throw new Error(name); checks.push(name); };
  page.on("pageerror", error => errors.push(error.message));
  page.on("request", request => { if (/\/api\/|\/inquiry$/.test(request.url())) backend.push(request.url()); });
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const ready = () => page.waitForFunction(() => {
    const node = document.querySelector("#export-journey");
    return node?.dataset.painted === "true" && node.dataset.frame === node.dataset.scrollFrame;
  });
  const align = async (index, fraction = 0) => {
    const seconds = [0, 12, 20, 29, 37, 44, 55][index];
    await page.locator('#export-journey').evaluate((element, seconds) => {
      const distance = element.offsetHeight - innerHeight;
      scrollTo(0, element.getBoundingClientRect().top + scrollY + distance * seconds / (59 + 1 / 3));
    }, seconds);
    await page.waitForFunction(i => document.querySelector('#export-journey').dataset.stage === String(i), index);
    await page.waitForFunction(() => Number(document.querySelector('#export-journey').style.getPropertyValue('--copy-opacity')) > .9);
    await ready();
    if (fraction) { await page.mouse.wheel(0, fraction * 400); await settle(); await ready(); }
  };
  const frame = () => page.locator("#export-journey").getAttribute("data-frame").then(Number);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:4174/");
  await page.locator("#export-journey").waitFor(); await ready();
  check(await page.locator(".cinema-chapter").count() === 7, "Seven overlaid chapters from the supplied research handoff");
  check(await page.locator('.journey-stages,.cinema-index,.cinema-kicker,.cinema-specs').count() === 0, 'Number blocks, decorative counters and tiny labels are removed');
  await page.waitForFunction(() => document.querySelector('#journey-details').hasAttribute('data-reveal'));
  check(await page.locator('#journey-details').evaluate(el => getComputedStyle(el).opacity === '0'), 'Post-film details stay unrevealed before scrolling');
  check(await page.locator("#export-journey video, #export-journey .journey-art").count() === 0 && await page.locator(".journey-film canvas").count() === 1, "Video is rendered as scroll frames, replacing the SVG draft");
  const initialRequests = await page.evaluate(() => performance.getEntriesByType("resource").filter(entry => entry.name.includes("/frames/export-journey/")).length);
  check(initialRequests <= 15, `Initial load fetches nearby frames only (${initialRequests})`);
  for (const value of ["dark", "light"]) {
    if (await page.locator("html").getAttribute("data-theme") !== value) await page.getByRole("button", { name: `Switch to ${value} theme`, exact: true }).click();
    for (let i = 0; i < 7; i++) {
      await align(i);
      check(await page.locator("#export-journey").getAttribute("data-stage") === String(i), `${value}: chapter ${i + 1} and its video frame load`);
      check(Number(await page.locator("#export-journey").getAttribute("data-cached-frames")) <= 17, `${value}: chapter ${i + 1} keeps a bounded frame cache`);
      const screen = await page.locator('.cinema-stage').boundingBox();
      check(Math.abs(screen.width - 1440) < 2 && screen.height >= 900, `${value}: chapter ${i + 1} fills the available viewport`);
      if ([0, 1, 4, 5, 6].includes(i)) await page.screenshot({ path: `output/playwright/film-${value}-${i + 1}.png`, scale: "css" });
    }
  }
  await align(2); const before = await frame();
  await page.mouse.wheel(0, 220); await settle(); await ready(); const after = await frame();
  check(after > before, "Scrolling down advances frames within a chapter");
  await page.mouse.wheel(0, -220); await settle(); await ready(); check(await frame() < after, "Scrolling up reverses frames");
  check(await page.locator('.motion-toggle').count() === 0, 'No pause control on desktop or mobile');
  for (const width of [320, 390, 690]) {
    await page.setViewportSize({ width, height: 844 }); await settle(); await align(3);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px: no horizontal overflow`);
    check(await page.locator(".journey-film canvas").getAttribute("width") === "720", `${width}px: lighter mobile frames selected`);
    const art = await page.locator(".cinema-stage").boundingBox();
    check(Math.abs(art.y) < 2 && Math.abs(art.y + art.height - 844) < 3, `${width}px: full-screen scene extends behind the glass header`);
    await page.screenshot({ path: `output/playwright/film-mobile-${width}.png`, scale: "css" });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await align(4);
  await page.waitForFunction(() => document.querySelector("#export-journey").dataset.stage === "4");
  await page.waitForFunction(() => {
    const card = document.querySelector('.cinema-chapter[data-active=true]').getBoundingClientRect();
    const timeline = document.querySelector('.cinema-bottom').getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect();
    return card.top > header.bottom && card.bottom < timeline.top;
  });
  check(true, "Mobile overlaid copy fits between the header and footer controls");
  const detail = page.locator(".journey-deep-details details").nth(4);
  await detail.locator("summary").click();
  check(await detail.getAttribute("open") !== null, "Technical detail expands natively");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator('.motion-off').waitFor();
  await align(5, -.2); const reduced = await frame();
  await align(5, .2); check(reduced === await frame(), "System reduced motion stops continuous frame scrubbing");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#quotation-brief").scrollIntoViewIfNeeded();
  await page.locator("#quotation-brief select").first().selectOption("Germany");
  const href = await page.getByRole("link", { name: "Build my enquiry", exact: true }).getAttribute("href");
  check(href.includes("country=Germany"), "Quotation planner preserves destination");
  check(await page.locator("#ingredient").count() === 1 && await page.locator(".home-faq-layout details").count() === 5, "Substantial homepage information remains available");
  await page.goto("http://127.0.0.1:4174/request-quote");
  await page.locator("select[name=country]").waitFor();
  await page.locator("select[name=country]").selectOption("Australia");
  check(await page.locator(".destination-note").isVisible(), "Destination status guidance appears for Australia");
  await page.locator("select[name=country]").selectOption("Germany");
  await page.locator("input[name=quantity]").fill("1000");
  await page.locator("select[name=application]").selectOption("Food or beverage ingredient");
  await page.locator(".enquiry-optional summary").click();
  await page.locator("select[name=targetTiming]").selectOption("One to three months");
  await page.locator("select[name=orderFrequency]").selectOption("Recurring requirement");
  await page.locator("select[name=terms]").selectOption({ label: "FCA — named place to be agreed" });
  await page.locator("textarea[name=notes]").fill("QA example: specification, COA and test requirements");
  await page.getByRole("button", { name: "Continue to your details" }).click();
  await page.locator("input[name=name]").fill("Preview QA");
  await page.locator("input[name=company]").fill("Example Buyer");
  await page.locator("input[name=email]").fill("qa@example.com");
  await page.locator("input[type=checkbox]").check();
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  const review = await page.locator(".enquiry-review").innerText();
  check(review.includes("Recurring requirement") && review.includes("One to three months") && review.includes("FCA"), "New optional requirements reach the review step");
  check(await page.getByRole("button", { name: "Send enquiry", exact: true }).isDisabled(), "Final delivery remains disabled");
  await page.goto("http://127.0.0.1:4174/global-markets");
  await page.locator(".market-panel h2").waitFor();
  await page.getByRole("button", { name: "Destination", exact: true }).click();
  check((await page.locator(".market-panel h2").innerText()).includes("market"), "Destination planning replaces unsupported served-market claims");
  await page.getByText("Australia and New Zealand: food-use status", { exact: true }).click();
  check(await page.getByRole("link", { name: "Read FSANZ guidance" }).isVisible(), "Dated destination guidance links to the official source");
  check(backend.length === 0, "No enquiry backend requests");
  check(errors.length === 0, "No uncaught browser errors");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:4174/");
  await page.locator("#export-journey").waitFor(); await align(0);
  await page.screenshot({ path: "output/playwright/cinema-final-preview.png", scale: "css" });
  return { checks, errors, backend };
}
