import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Disclosure } from "@/components/PageElements";
import { products, productEnquiry } from "@/data/products";

export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = products.find(item => item.slug === slug)!;
  const origin = import.meta.env.VITE_SITE_URL || "https://altivonglobal.com";
  const path = `/products/${product.slug}`;
  return (
    <div className="section-container page-space catalogue-detail" key={product.id}>
      <SEO title={product.seoTitle} description={`Source ${product.name} from India. 500 kg catalogue MOQ, 25 kg and 50 kg bulk packs, samples and export enquiries. Download the AltivonGlobal catalogue.`} canonical={path} image={product.image} structuredData={{
        "@type": "Product", "@id": `${origin}${path}#product`, name: product.name,
        description: product.description, image: `${origin}${product.image}`, url: `${origin}${path}`,
        category: "Botanical and agricultural ingredient powders", brand: { "@type": "Brand", name: "AltivonGlobal" },
        countryOfOrigin: { "@type": "Country", name: "India" },
        additionalProperty: [{ "@type": "PropertyValue", name: "Catalogue minimum order", value: "500 kg" }, { "@type": "PropertyValue", name: "Bulk packaging", value: "25 kg and 50 kg; confirm per order" }],
      }} />
      <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/products">Products</Link><span>/</span><span>{product.name}</span></nav>
      <section className="catalogue-hero" data-reveal>
        <figure className="catalogue-hero-photo"><img src={product.image} alt={product.imageAlt} width="461" height="461" fetchPriority="high" /><figcaption>Product imagery from the AltivonGlobal catalogue. Appearance varies by batch.</figcaption></figure>
        <div className="catalogue-hero-copy">
          <p className="eyebrow">BULK SUPPLY & EXPORT FROM INDIA</p>
          <h1>{product.name}.</h1>
          <p className="catalogue-lead">{product.subtitle}</p>
          <p>{product.description}</p>
          <dl className="catalogue-facts">
            <div><dt>Catalogue MOQ</dt><dd>500 kg</dd></div>
            <div><dt>Bulk pack sizes</dt><dd>25 kg / 50 kg</dd></div>
            <div><dt>Trade terms</dt><dd>FOB / CIF / EXW</dd></div>
            <div><dt>Custom packing</dt><dd>On request</dd></div>
          </dl>
          <p className="quiet-note">Availability, final specification, packing and named trade terms are confirmed in your quotation.</p>
          <div className="action-row"><Link className="btn-primary" to={productEnquiry(product)}>Request a quotation ↗</Link><Link className="text-link" to={productEnquiry(product, "sample")}>Discuss a sample ↗</Link></div>
          <a className="text-link catalogue-download" href={product.catalogue} download>Download product catalogue (PDF) ↓</a>
        </div>
      </section>
      <section className="catalogue-editorial" data-reveal>
        <div><p className="eyebrow">POTENTIAL APPLICATIONS</p><h2>Made for your<br />buying brief.</h2><p>Applications depend on the agreed grade, buyer specification and applicable food, supplement and destination-country regulations.</p><ul>{product.applications.map(item => <li key={item}>{item}</li>)}</ul></div>
        <figure><img src={product.originImage} alt={product.originAlt} width="461" height="461" loading="lazy" decoding="async" /><figcaption>Catalogue illustration of the source ingredient.</figcaption></figure>
      </section>
      <section className="catalogue-specification" data-reveal>
        <div><p className="eyebrow">THE PRODUCT IN DETAIL</p><h2>Define the grade.<br />Agree the details.</h2><p>The catalogue is a starting point. Confirm values using the current specification and available batch documentation.</p></div>
        <dl className="catalogue-spec-list">
          {[
            ["Raw material", product.material],
            ["Form", "Powder"],
            ["Mesh size", product.mesh],
            ["Colour, aroma & taste", "Confirm against the actual production batch and approved specification."],
            ["Moisture, ash & nutrition", "Values from the current specification and/or laboratory report."],
            ["Microbiology, heavy metals & pesticides", "Batch-specific results / COA where available and agreed."],
            ["Shelf life", "Confirm from the validated product specification."],
            ["Storage", "Keep sealed in a cool, dry place, away from sunlight and moisture."],
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>
      <section className="catalogue-order-details" data-reveal>
        <p className="eyebrow">PACKING, QUALITY & EXPORT</p><h2>Before the order moves.</h2>
        <Disclosure title="Bulk packing and private label"><p>Standard catalogue pack sizes are 25 kg and 50 kg. Custom packaging and private-label options are available on request, subject to confirmation. Agree food-contact materials, moisture protection, labels and artwork for the selected pack.</p><Link className="text-link" to="/bulk-supply">Discuss packing options ↗</Link></Disclosure>
        <Disclosure title="Commercial terms and delivery"><p>The catalogue lists a 500 kg minimum order and company monthly supply capacity of 20–25 MT, subject to product availability and scheduling. Confirm capacity for your chosen product. FOB, CIF or EXW terms, named place or port, payment terms and delivery schedule are agreed in the quotation.</p></Disclosure>
        <Disclosure title="Product documents and business verification"><p>Request the current product specification, a batch-specific COA and supporting reports where available. The catalogues list APEDA, FSSAI, IEC, GST, Udyam / MSME and Certificate of Origin documents. Ask which documents apply to the proposed supply and verify their availability, scope and current validity.</p><Link className="text-link" to={productEnquiry(product, "docs")}>Request product documents ↗</Link></Disclosure>
        <Disclosure title="Destination and intended use"><p>Share the destination country and intended application early. Import requirements, permitted uses, tests and labelling responsibilities must be checked for your particular transaction before order confirmation.</p><Link className="text-link" to="/global-markets">Review export planning ↗</Link></Disclosure>
      </section>
      <section className="catalogue-sourcing" data-reveal><h2>Let’s talk<br />{product.shortName.toLowerCase()}.</h2><div><p>Send your quantity, specification, packing preference and destination for availability and a commercial offer.</p><Link className="btn-primary" to={productEnquiry(product)}>Build my enquiry ↗</Link><Link className="text-link" to="/products">Explore all products →</Link></div></section>
    </div>
  );
}
