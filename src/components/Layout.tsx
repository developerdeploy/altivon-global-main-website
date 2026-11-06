import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { MotionSystem } from "./MotionSystem";
import SceneBackdrop from "./SceneBackdrop";
import { SITE_BACKDROPS } from "@/config/images";

const pageBackgrounds: Record<string, keyof typeof SITE_BACKDROPS> = {
  "/products/moringa-leaf-powder": "powder",
  "/quality-documentation": "laboratory",
  "/bulk-supply": "packing",
  "/global-markets": "shipping",
  "/about": "origin",
  "/contact": "shipping",
  "/request-quote": "shipping",
  "/enquiry-received": "shipping",
  "/privacy-policy": "leaf",
};
export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <MotionSystem>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className={`flex-1${pathname !== "/" ? " has-page-backdrop" : ""}`} tabIndex={-1}>
          {pathname !== "/" && <SceneBackdrop {...SITE_BACKDROPS[pageBackgrounds[pathname] || "leaf"]} className="page-backdrop" loading="eager" />}
          <Suspense
            fallback={
              <div
                className="section-container page-space"
                style={{ minHeight: "100vh" }}
                role="status"
              >
                Loading page…
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </MotionSystem>
  );
}
