import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

const MotionContext = createContext({
  enabled: false,
  reduced: false,
  quality: "full" as "full" | "light",
});
export const useSiteMotion = () => useContext(MotionContext);

export function MotionSystem({ children }: { children: ReactNode }) {
  const [requested] = useState(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    return (
      !connection?.saveData &&
      !/^(slow-2g|2g)$/.test(connection?.effectiveType || "")
    );
  });
  const [quality] = useState<"full" | "light">(() =>
    window.matchMedia("(pointer: coarse), (max-width: 767px)").matches ||
    navigator.hardwareConcurrency <= 4
      ? "light"
      : "full",
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const { pathname } = useLocation();
  const enabled = requested && !reduced;
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(preference.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const main = document.querySelector("main");
    if (!main) return;
    const registered = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
          } else if (!entry.target.contains(document.activeElement)) {
            (entry.target as HTMLElement).dataset.visible = "false";
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    );
    const scan = () => main.querySelectorAll<HTMLElement>([
      "[data-reveal]", ".cinematic-home > :not(#export-journey)", ".page-intro",
      ".split-feature", ".documents-grid", ".steps-grid", ".three-facts",
      ".export-planning-notes", ".ingredient-product-hero", ".product-plus-section",
      ".product-evaluation", ".product-buyer-details", ".product-final-cta",
      ".enquiry-layout", ".contact-layout", ".prose-content",
    ].join(",")).forEach(element => {
      if (registered.has(element)) return;
      registered.add(element);
      element.dataset.reveal = "";
      observer.observe(element);
    });
    const revealFocused = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      let element = event.target.closest<HTMLElement>("[data-reveal]");
      while (element) {
        element.dataset.visible = "true";
        element = element.parentElement?.closest<HTMLElement>("[data-reveal]") || null;
      }
    };
    const resetBlurred = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let element = event.target.closest<HTMLElement>("[data-reveal]");
      while (element) {
        const bounds = element.getBoundingClientRect();
        if (!element.contains(event.relatedTarget as Node | null) && (bounds.bottom <= 0 || bounds.top >= innerHeight - 48)) element.dataset.visible = "false";
        element = element.parentElement?.closest<HTMLElement>("[data-reveal]") || null;
      }
    };
    const changes = new MutationObserver(scan);
    changes.observe(main, { childList: true, subtree: true });
    main.addEventListener("focusin", revealFocused);
    main.addEventListener("focusout", resetBlurred);
    scan();
    return () => {
      changes.disconnect();
      observer.disconnect();
      main.removeEventListener("focusin", revealFocused);
      main.removeEventListener("focusout", resetBlurred);
    };
  }, [enabled, pathname]);
  return (
    <MotionContext.Provider
      value={{
        enabled,
        reduced,
        quality,
      }}
    >
      <div className={enabled ? "motion-on" : "motion-off"}>{children}</div>
    </MotionContext.Provider>
  );
}

export function DepthCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { enabled } = useSiteMotion();
  return (
    <div
      className={`depth-card ${className}`}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--tilt-x",
          `${(-(event.clientY - box.top - box.height / 2) / box.height) * 8}deg`,
        );
        event.currentTarget.style.setProperty(
          "--tilt-y",
          `${((event.clientX - box.left - box.width / 2) / box.width) * 9}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
      }}
    >
      {children}
    </div>
  );
}
