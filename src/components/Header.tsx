import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { Icon } from "./PageElements";
import { ThemeToggle } from "./ThemeProvider";

const links = [
  ["/products/moringa-leaf-powder", "Moringa"],
  ["/quality-documentation", "Quality"],
  ["/bulk-supply", "Bulk supply"],
  ["/global-markets", "Export planning"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className={`site-header${pathname === "/" ? " cinematic-header" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="trade-strip">
        <div className="section-container">
          <span>Moringa sourcing · Vadodara, India</span>
          <span className="hidden sm:block">
            Sourcing · Samples · Export support
          </span>
        </div>
      </div>
      <div className="section-container header-row">
        <Link to="/" aria-label="AltivonGlobal home" className="brand-home">
          <BrandLogo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/request-quote" className="btn-primary header-quote">
            Get a quote <Icon>north_east</Icon>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon>{open ? "close" : "menu"}</Icon>
          </button>
          <ThemeToggle />
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {links.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
              <Icon>arrow_forward</Icon>
            </NavLink>
          ))}
          <Link className="btn-primary" to="/request-quote">
            Get a quote <Icon>north_east</Icon>
          </Link>
        </nav>
      )}
    </header>
  );
}
