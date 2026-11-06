import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./PageElements";
import { useSiteMotion } from "./MotionSystem";
import { journeyStages } from "@/data/exportJourney";
import { exportFrames } from "@/data/exportFrames";
import "./export-journey.css";

export default function ExportJourney() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const { enabled, quality } = useSiteMotion();

  useEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    const context = surface?.getContext("2d", { alpha: false });
    if (!element || !surface || !context) return;
    const cache = new Map<number, HTMLImageElement>();
    const decoded = new Set<number>();
    const pending = new Set<number>();
    const unavailable = new Set<number>();
    let disposed = false;
    let frame = 0;
    let wanted = 0;
    let last = -1;
    let frozenStage = -1;
    let start = 0;
    let travel = 1;
    let playhead = -1;
    let lastTime = 0;
    let variant = "";
    let direction = 1;
    let speed = 0;
    let requestedAt = 0;
    let currentStage = -1;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const draw = () => {
      if (disposed) return;
      const index = [...decoded].filter(index => {
        if (!enabled) return true;
        if (last < 0) return (index - wanted) * direction <= 0;
        return index >= Math.min(last, wanted) && index <= Math.max(last, wanted);
      }).sort((a, b) => Math.abs(a - wanted) - Math.abs(b - wanted))[0];
      if (index === undefined || last === index) return;
      const image = cache.get(index);
      if (!image) return;
      context.drawImage(image, 0, 0, surface.width, surface.height);
      last = index;
      element.dataset.frame = String(index);
      element.dataset.painted = "true";
      element.dataset.loading = "false";
      setFailed(false);
    };
    const load = (index: number, priority: "high" | "low") => {
      if (index < 0 || index >= exportFrames.count || cache.has(index) || unavailable.has(index)) return;
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = priority;
      cache.set(index, image);
      pending.add(index);
      const fail = () => {
        if (disposed || cache.get(index) !== image) return;
        pending.delete(index);
        cache.delete(index);
        unavailable.add(index);
        if (wanted === index) { element.dataset.loading = "false"; setFailed(true); }
        pump();
      };
      image.onload = () => {
        image.decode().then(() => {
          if (disposed || cache.get(index) !== image) return;
          pending.delete(index);
          decoded.add(index);
          draw();
          pump();
        }).catch(fail);
      };
      image.onerror = fail;
      image.src = `${import.meta.env.BASE_URL}frames/export-journey/${variant}/${String(index).padStart(4, "0")}.webp`;
    };
    const pump = () => {
      if (disposed) return;
      const lead = Math.min(12, Math.max(1, Math.round(speed * 140)));
      const candidates = [wanted];
      if (enabled) {
        candidates.push(wanted + direction * lead);
        for (let distance = 1; distance <= 8; distance++) candidates.push(wanted + direction * distance);
        for (let distance = 1; distance <= 2; distance++) candidates.push(wanted - direction * distance);
      }
      for (const index of candidates) {
        if (pending.size >= 4) break;
        load(index, index === wanted ? "high" : "low");
      }
      // Keep in-flight decodes alive; cancelling them on every scroll starves the canvas.
      const oldest = [...decoded].sort((a, b) => Math.abs(b - wanted) - Math.abs(a - wanted));
      for (const index of oldest) {
        if (cache.size <= 17) break;
        cache.delete(index);
        decoded.delete(index);
      }
      element.dataset.cachedFrames = String(cache.size);
    };
    const show = (index: number) => {
      const now = performance.now();
      if (index !== wanted) {
        direction = index > wanted ? 1 : -1;
        speed = requestedAt ? Math.abs(index - wanted) / Math.max(8, now - requestedAt) : 0;
      }
      requestedAt = now;
      wanted = index;
      element.dataset.targetFrame = String(index);
      element.dataset.loading = String(last < 0);
      draw();
      pump();
    };
    const paint = (now: number) => {
      frame = 0;
      const target = clamp((window.scrollY - start) / travel) * exportFrames.duration;
      const outside = window.scrollY < start || window.scrollY > start + travel;
      if (outside && playhead === target && last >= 0) return;
      if (!enabled || playhead < 0 || outside) playhead = target;
      else playhead += (target - playhead) * (1 - Math.exp(-Math.min(48, Math.max(8, now - lastTime)) / 90));
      if (Math.abs(target - playhead) < 0.02) playhead = target;
      lastTime = now;
      let current = 0;
      journeyStages.forEach((stage, i) => { if (playhead >= stage.start) current = i; });
      const stage = journeyStages[current];
      const progress = enabled ? clamp((playhead - stage.start) / (stage.end - stage.start)) : 0.5;
      const seconds = stage.start + progress * (stage.end - stage.start);
      const index = Math.min(exportFrames.count - 1, Math.round(seconds * exportFrames.fps));
      if (current !== currentStage) { currentStage = current; setActive(current); }
      element.dataset.stage = String(current);
      element.dataset.scrollFrame = String(enabled ? Math.min(exportFrames.count - 1, Math.round(target * exportFrames.fps)) : index);
      element.style.setProperty("--journey-progress", String(seconds / exportFrames.duration));
      const enter = current === 0 ? 1 : clamp(progress / 0.16);
      const leave = current === journeyStages.length - 1 ? 1 : clamp((1 - progress) / 0.16);
      element.style.setProperty("--copy-opacity", String(enabled ? Math.min(enter, leave) : 1));
      element.style.setProperty("--copy-y", `${enabled ? (1 - enter) * 36 - (1 - leave) * 28 : 0}px`);
      if ((enabled && (index !== wanted || last < 0)) || (!enabled && frozenStage !== current)) show(index);
      frozenStage = current;
      if (enabled && playhead !== target) frame = requestAnimationFrame(paint);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const measure = () => {
      const nextVariant = quality === "light" || window.innerWidth <= 800 || window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop";
      if (variant !== nextVariant) {
        cache.forEach(image => { image.onload = null; image.onerror = null; if (!image.complete) image.src = ""; });
        cache.clear();
        decoded.clear(); pending.clear(); unavailable.clear();
        variant = nextVariant;
        surface.width = variant === "mobile" ? exportFrames.mobileWidth : exportFrames.width;
        surface.height = surface.width * 9 / 16;
        last = -1; frozenStage = -1;
        element.dataset.painted = "false";
      }
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 84;
      element.style.setProperty("--cinema-header", `${headerHeight}px`);
      start = element.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, element.offsetHeight - window.innerHeight);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      cache.forEach(image => { image.onload = null; image.onerror = null; if (!image.complete) image.src = ""; });
      cache.clear();
    };
  }, [enabled, quality]);

  return (
    <section ref={root} id="export-journey" className="export-journey" aria-label="From moringa leaf to export planning">
      <div className="cinema-stage">
        <div className="journey-film" role="img" aria-label={`Illustrative export sequence: ${journeyStages[active].name.toLowerCase()}`}>
          <img className="journey-poster" src={`${import.meta.env.BASE_URL}images/export-journey-poster.webp`} width="1440" height="810" alt="" decoding="async" fetchPriority="high" />
          <canvas ref={canvas} width="1440" height="810" aria-hidden="true" />
        </div>
        <div className="cinema-shade" aria-hidden="true" />
        <div className="cinema-copy">
          {journeyStages.map((stage, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            return <article key={stage.name} className="cinema-chapter" data-active={active === i} aria-hidden={active !== i} inert={active !== i}>
              <Heading>{stage.displayTitle}</Heading>
              <p className="cinema-intro">{stage.copy}</p>
              <Link className="cinema-cta" to={stage.link}>{stage.cta}<Icon>north_east</Icon></Link>
            </article>;
          })}
        </div>
        <div className="cinema-bottom">
          <div className="cinema-status"><span>{enabled ? "Scroll to explore" : "Scroll through the chapters"} <span aria-hidden="true">↓</span></span><a href="#quotation-brief">Skip to enquiry <Icon>north_east</Icon></a></div>
          <div className="journey-progress" aria-hidden="true"><span /></div>
        </div>
        <span className="journey-buffering" aria-hidden="true">Loading scene…</span>
        {failed && <p className="journey-load-error" role="status">The scene could not load. <a href="#journey-details">Read the journey details</a> or <a href="#quotation-brief">build your quotation</a>.</p>}
      </div>
    </section>
  );
}
