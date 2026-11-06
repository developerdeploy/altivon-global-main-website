import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/config/publicCompany";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://altivonglobal.com";

export default function SEO({
  title,
  description,
  canonical,
  noindex = import.meta.env.VITE_CLIENT_PREVIEW === "true",
  structuredData,
}: SEOProps) {
  const fullTitle = /altivonglobal/i.test(title)
    ? title
    : `${title} | AltivonGlobal`;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  const defaultOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/altivonglobal-transparent.png`,
    description: COMPANY.tagline,
    email: COMPANY.contact.email,
    telephone: COMPANY.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.contact.address.city,
      addressRegion: COMPANY.contact.address.state,
      addressCountry: COMPANY.contact.address.country,
    },
    sameAs: [
      "https://www.linkedin.com/company/altivon-indian-exporter/",
      "https://www.instagram.com/altivonglobal/",
    ],
    knowsAbout: [
      "Moringa Leaf Powder",
      "Botanical Ingredient Export",
      "Agricultural Commodities",
      "B2B Commercial Sourcing",
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large"
        />
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={COMPANY.brandName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultOrganizationSchema)}
      </script>
    </Helmet>
  );
}
