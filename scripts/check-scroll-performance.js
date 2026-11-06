// Playwright CLI regression: fast scrolling with uncached images, 80ms latency and mobile CPU throttling.
async (page) => {
 const cdp = await page.context().newCDPSession(page);
 const results=[];
 for (const scenario of [{name:'laptop',width:1440,height:900,cpu:1},{name:'mobile-4x-cpu',width:390,height:844,cpu:4}]) {
  await page.setViewportSize({width:scenario.width,height:scenario.height});
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:1500000,uploadThroughput:750000});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:scenario.cpu});
  await page.goto('http://127.0.0.1:4174/');
  await page.locator('#export-journey[data-painted=true]').waitFor();
  const result=await page.evaluate(async () => {
   const root=document.querySelector('#export-journey');
   const travel=root.offsetHeight-innerHeight;
   const requested=new Set(),painted=new Set(); let last=root.dataset.frame,changed=performance.now(),maxGap=0,frames=0,late=0;
   const start=performance.now();
   await new Promise(resolve=>{
    const tick=now=>{
     const p=Math.min(1,(now-start)/5000);
     scrollTo(0,travel*.55*p);
     requested.add(root.dataset.targetFrame);
     painted.add(root.dataset.frame);
     if(last!==root.dataset.frame){maxGap=Math.max(maxGap,now-changed);changed=now;last=root.dataset.frame;}
     if(Number(root.dataset.targetFrame)-Number(root.dataset.frame)>8)late++;
     frames++;
     if(p<1)requestAnimationFrame(tick);else resolve();
    };requestAnimationFrame(tick);
   });
   maxGap=Math.max(maxGap,performance.now()-changed);
   const requests=performance.getEntriesByType('resource').filter(r=>r.name.includes('/frames/export-journey/'));
   return {requestedFrames:requested.size,paintedFrames:painted.size,maxPaintGapMs:Math.round(maxGap),behindSamples:late,totalSamples:frames,requests:requests.length,transferredKB:Math.round(requests.reduce((sum,r)=>sum+r.encodedBodySize,0)/1024),cache:root.dataset.cachedFrames};
  });
  results.push({scenario:scenario.name,...result});
 }
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
 await cdp.detach();
 for (const result of results) {
  if (result.paintedFrames < 25 || result.maxPaintGapMs > 1000 || Number(result.cache) > 17)
   throw new Error('Scroll pipeline regression: '+JSON.stringify(result));
 }
 return results;
}
