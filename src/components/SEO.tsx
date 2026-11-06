import { Helmet } from "react-helmet-async";
import { COMPANY } from "@/config/publicCompany";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  structuredData?: Record<string, any>;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://altivonglobal.com";

export default function SEO({
  title,
  description,
  canonical,
  noindex = import.meta.env.VITE_CLIENT_PREVIEW === "true" || ["/enquiry-received", "/404"].includes(canonical || ""),
  structuredData,
  image = "/images/catalogue-moringa-powder.webp",
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
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
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
      "Beetroot Powder",
      "Ashwagandha Powder",
      "Botanical Ingredient Export",
      "Agricultural Commodities",
      "B2B Commercial Sourcing",
    ],
  };

  const socialImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const crumbs = canonical?.startsWith("/products/")
    ? [{ name: "Home", item: `${SITE_URL}/` }, { name: "Products", item: `${SITE_URL}/products` }, { name: title.split(" Supplier")[0].split(" Exporter")[0], item: canonicalUrl }]
    : [{ name: "Home", item: `${SITE_URL}/` }, ...(canonical && canonical !== "/" ? [{ name: title, item: canonicalUrl }] : [])];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      defaultOrganizationSchema,
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: COMPANY.brandName, publisher: { "@id": `${SITE_URL}/#organization` } },
      { "@type": canonical === "/products" ? "CollectionPage" : "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: fullTitle, description, isPartOf: { "@id": `${SITE_URL}/#website` }, ...(structuredData ? { mainEntity: { "@id": structuredData["@id"] } } : {}) },
      ...(crumbs.length > 1 ? [{ "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })) }] : []),
      ...(structuredData ? [structuredData] : []),
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
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:image" content={socialImage} />
      <link rel="describedby" href={`${SITE_URL}/llms.txt`} type="text/plain" />

      <script type="application/ld+json">
        {JSON.stringify(graph).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
