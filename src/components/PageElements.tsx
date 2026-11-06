import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import SEO from "./SEO";

export function Icon({ children }: { children: string }) {
  const paths: Record<string, ReactNode> = {
    arrow_forward: <path d="M4 12h16m-6-6 6 6-6 6" />,
    arrow_back: <path d="M20 12H4m6-6-6 6 6 6" />,
    north_east: <path d="M6 18 18 6M6 6h12v12" />,
    south: <path d="M12 3v18m-6-6 6 6 6-6" />,
    add: <path d="M12 4v16M4 12h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    description: (
      <>
        <path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    science: <path d="M9 3h6m-5 0v7L4 20h16l-6-10V3M7 15h10" />,
    inventory_2: <path d="M3 3h18v5H3zM5 8v13h14V8M9 12h6" />,
    eco: <path d="M20 3C9 3 3 7 5 14s13 8 15-11ZM4 21 16 9" />,
    sailing: (
      <path d="M12 3v14H3L12 3Zm2 4 7 10h-7M2 20c3 3 6-3 10 0s7-3 10 0" />
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7h.01" />
      </>
    ),
    fact_check: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m6 10 2 2 3-4m2 2h5M6 16h12" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    call: (
      <path d="m7 3 3 5-3 2c1 3 4 6 7 7l2-3 5 3c0 3-2 5-5 4C8 19 3 13 3 6c0-2 2-3 4-3Z" />
    ),
    location_on: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    open_in_full: (
      <path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5M9 9 4 4m11 5 5-5M9 15l-5 5m11-5 5 5" />
    ),
    zoom_in: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6M7 10h6m-3-3v6" />
      </>
    ),
    zoom_out: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6M7 10h6" />
      </>
    ),
    content_copy: (
      <>
        <rect x="8" y="8" width="13" height="13" rx="1" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    print: (
      <>
        <path d="M7 7V3h10v4M7 17H3V7h18v10h-4M7 14h10v7H7zM17 10h1" />
      </>
    ),
  };
  return (
    <svg
      className="material-symbols-outlined site-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {paths[children] || paths.description}
    </svg>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  path,
  seoTitle,
}: {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  seoTitle?: string;
}) {
  return (
    <>
      <SEO
        title={seoTitle || title}
        description={description}
        canonical={path}
      />
      <div className="page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-copy">{description}</p>
      </div>
    </>
  );
}
export function QuoteCTA({
  title = "Let’s plan your next shipment.",
  description = "Share your quantity and destination. We’ll help with the next step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="quote-banner">
      <div>
        <p className="eyebrow">From India, to your market</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="btn-gold" to="/request-quote">
        Request a quote <Icon>arrow_forward</Icon>
      </Link>
    </section>
  );
}
export function Disclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="disclosure">
      <summary>
        {title}
        <Icon>add</Icon>
      </summary>
      <div className="disclosure-content">{children}</div>
    </details>
  );
}
export const IS_PREVIEW = import.meta.env.VITE_CLIENT_PREVIEW === "true";
export const ENQUIRIES_ENABLED = import.meta.env.VITE_ENQUIRIES_ENABLED === "true";
export function PreviewNotice() {
  return !ENQUIRIES_ENABLED ? (
    <p className="preview-note">
      Client preview · Form delivery is not connected yet.
    </p>
  ) : null;
}
