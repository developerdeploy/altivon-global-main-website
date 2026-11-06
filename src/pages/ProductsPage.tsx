import SEO from "@/components/SEO";
import ProductCollection from "@/components/ProductCollection";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  return (
    <div className="section-container page-space catalogue-page">
      <SEO title="Botanical Powders: Moringa, Beetroot & Ashwagandha" description="Explore AltivonGlobal’s Indian-origin moringa, beetroot and ashwagandha powders. Review product details, download catalogues and request bulk pricing." canonical="/products" />
      <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Products</span></nav>
      <header className="catalogue-intro" data-reveal>
        <p className="eyebrow">THE ALTIVONGLOBAL COLLECTION</p>
        <h1>Botanical powders.<br />From India.</h1>
        <p>Indian-origin botanical and agricultural powders for business buyers. Choose an ingredient to explore its applications, specifications, packing and catalogue.</p>
      </header>
      <ProductCollection />
      <div className="catalogue-sourcing" data-reveal>
        <h2>Your specification.<br />Our starting point.</h2>
        <div><p>Share the product, intended use, quantity and destination. We’ll review the available grade, documentation and commercial terms for your enquiry.</p><Link className="btn-primary" to="/request-quote">Discuss your requirement ↗</Link></div>
      </div>
    </div>
  );
}
