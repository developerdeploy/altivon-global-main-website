import { Link, NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { Icon } from "./PageElements";
import { ThemeToggle } from "./ThemeProvider";

const links = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/quality-documentation", "Quality"],
  ["/global-markets", "Exports"],
  ["/contact", "Contact"],
];
export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className={`site-header${pathname === "/" ? " cinematic-header" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="trade-strip">
        <div className="section-container">
          <span>Botanical ingredients · Vadodara, India</span>
          <span className="hidden sm:block">
            Sourcing · Samples · Export support
          </span>
        </div>
      </div>
      <div className="section-container header-row">
        <Link to="/" aria-label="AltivonGlobal home" className="brand-home">
          <BrandLogo />
        </Link>
        <nav className="catalogue-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/request-quote" className="btn-primary header-quote">
            Get a quote <Icon>north_east</Icon>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
