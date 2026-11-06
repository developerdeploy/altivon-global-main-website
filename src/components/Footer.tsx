import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { COMPANY } from "@/config/publicCompany";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-grid">
          <div>
            <Link to="/" aria-label="AltivonGlobal home">
              <BrandLogo />
            </Link>
            <p className="footer-description">
              Moringa leaf powder from Vadodara, India, for business buyers.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/company/altivon-indian-exporter/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.instagram.com/altivonglobal/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
            </div>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <div className="footer-links">
              <Link to="/products/moringa-leaf-powder">Moringa powder</Link>
              <Link to="/quality-documentation">Quality & documents</Link>
              <Link to="/bulk-supply">Bulk supply</Link>
            <Link to="/global-markets">Export planning</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow">Let’s connect</p>
            <div className="footer-links">
              <a href={`mailto:${COMPANY.contact.email}`}>
                {COMPANY.contact.email}
              </a>
              <a href={`tel:${COMPANY.contact.phone}`}>
                {COMPANY.contact.phoneFormatted}
              </a>
              <span>Vadodara, Gujarat, India</span>
              <Link to="/contact">Contact details →</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AltivonGlobal</span>
          <div>
            <Link to="/about">About</Link>
            <Link to="/privacy-policy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
