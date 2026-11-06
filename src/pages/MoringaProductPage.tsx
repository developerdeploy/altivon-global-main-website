import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Disclosure, Icon, QuoteCTA } from "@/components/PageElements";
import ProductGallery from "@/components/ProductGallery";
import ProductImage from "@/components/ProductImage";
import { SITE_IMAGES } from "@/config/images";

export default function MoringaProductPage() {
  return (
    <div className="ingredient-product-page">
      <SEO
        title="Conventional Moringa Leaf Powder for B2B | AltivonGlobal"
        description="Review the product, specification topics, packing, samples and documents for conventional moringa leaf powder, then request a quotation."
        canonical="/products/moringa-leaf-powder"
      />
      <div className="section-container product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Moringa leaf powder</span>
      </div>
      <section className="section-container ingredient-product-hero">
        <ProductGallery />
        <div className="ingredient-product-copy">
          <p className="eyebrow">
            <span className="status-point" /> INDIAN ORIGIN / CONVENTIONAL LEAF
            POWDER
          </p>
          <h1>
            Bulk moringa
            <br />
            <em>leaf powder.</em>
          </h1>
          <p className="ingredient-lead">
            A natural starting point for your next product.
          </p>
          <p className="ingredient-description">
            Source conventional Moringa oleifera leaf powder from India for your
            business. Start with your application, specification and destination.
          </p>
          <div className="product-use-chips">
            <span>Importers & distributors</span>
            <span>Ingredient buyers</span>
            <span>Brands</span>
          </div>
          <ul className="product-feature-list">
            {[
              [
                "Conventional leaf powder",
                "A clear, focused ingredient offer.",
              ],
              [
                "Sourced from India",
                "For importers, distributors, and brands.",
              ],
              [
                "Packing around your brief",
                "Discuss bulk and private label requirements.",
              ],
              [
                "Evaluate before ordering",
                "Ask about samples and product documents.",
              ],
            ].map(([title, copy]) => (
              <li key={title}>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="action-row">
            <Link className="btn-gold" to="/request-quote">
              Request bulk pricing <Icon>north_east</Icon>
            </Link>
            <Link
              className="product-sample-link"
              to="/request-quote?type=sample"
            >
              Discuss a sample <Icon>arrow_forward</Icon>
            </Link>
          </div>
          <a className="product-spec-link" href="#product-details">
            Explore product details <Icon>south</Icon>
          </a>
          <span className="ingredient-reference">
            01 / THE ALTIVONGLOBAL INGREDIENT EDIT
          </span>
        </div>
      </section>
      <nav
        className="section-container product-section-links"
        aria-label="Product sections"
      >
        <a href="#product-details">Specifications & samples</a>
        <Link to="/bulk-supply">
          Packaging & private label <Icon>north_east</Icon>
        </Link>
        <Link to="/quality-documentation">
          Quality documents <Icon>north_east</Icon>
        </Link>
      </nav>
      <section className="section-container product-plus-section">
        <div className="product-plus-heading">
          <p className="eyebrow">ONE INGREDIENT. DIFFERENT BUYING NEEDS.</p>
          <h2>A better view of what you’re sourcing.</h2>
          <p>
            Explore the ingredient, then build a brief around the way your
            business will use it.
          </p>
        </div>
        <div className="product-plus-grid">
          {[
            [
              "Food & beverage",
              "Share your formulation and specification. Food-use eligibility and suitability need checking for the destination before ordering.",
            ],
            [
              "Supplement ingredients",
              "Discuss your intended formulation, ingredient status and the evidence your technical team needs. No blanket supplement approval is implied.",
            ],
            [
              "Wholesale & private label",
              "Plan your quantity, packing, artwork, and destination. Available options and charges are checked for your order.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-container product-evaluation">
        <div className="product-evaluation-image">
          <ProductImage
            src={SITE_IMAGES.moringaFoliage}
            alt="Fresh moringa leaf stems on pale limestone in soft natural light"
            loading="lazy"
          />
        </div>
        <div>
          <p className="eyebrow">YOUR EVALUATION CHECKLIST</p>
          <h2>
            From first look
            <br />
            to a considered order.
          </h2>
          <ol className="product-buying-list">
            {[
              [
                "Define your application",
                "Tell us the intended use, destination, and approximate quantity.",
              ],
              [
                "Agree the product brief",
                "Share physical parameters, test limits, and packing needs.",
              ],
              [
                "Review a sample and documents",
                "Discuss availability and check evidence relevant to the proposed supply.",
              ],
              [
                "Confirm the commercial details",
                "Agree the grade, quantity, packing, timing, and quotation basis.",
              ],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        id="product-details"
        className="section-container section-space product-buyer-details"
      >
        <div>
          <p className="eyebrow">THE DETAILS THAT MATTER</p>
          <h2>
            Built around
            <br />
            <em>your requirements.</em>
          </h2>
          <p>
            Keep the buying decision clear. Agree the product, review the
            evidence, then confirm the order.
          </p>
          <a
            className="text-link"
            href={`${import.meta.env.BASE_URL}product-overview.html`}
            target="_blank"
            rel="noreferrer"
          >
            View product overview <Icon>north_east</Icon>
          </a>
          <small>Indicative summary · Opens in a new tab</small>
        </div>
        <div>
          <Disclosure title="Product specifications">
            <dl className="spec-list">
              <div>
                <dt>Product</dt>
                <dd>Moringa leaf powder</dd>
              </div>
              <div>
                <dt>Offer</dt>
                <dd>Conventional</dd>
              </div>
              <div>
                <dt>Origin</dt>
                <dd>India</dd>
              </div>
              <div>
                <dt>Grade & physical parameters</dt>
                <dd>Agree against the current product specification</dd>
              </div>
              <div>
                <dt>MOQ, packing & shelf life</dt>
                <dd>Confirm for the proposed supply</dd>
              </div>
            </dl>
            <p className="quiet-note">
              Share required particle size, moisture, test limits, and storage
              needs. Final values must match the offered product and lot.
            </p>
          </Disclosure>
          <Disclosure title="Samples and order approval">
            <p>
              Tell us what you need to evaluate and where the sample should go.
              Availability, charges, and dispatch timing are confirmed before
              arrangement.
            </p>
            <Link className="text-link" to="/request-quote?type=sample">
              Discuss a sample <Icon>arrow_forward</Icon>
            </Link>
          </Disclosure>
          <Disclosure title="Bulk packaging and private label">
            <p>
              Share your pack size, material, artwork, quantity, and
              destination. We check available options, minimums, charges, and
              label responsibilities for your order.
            </p>
            <Link className="text-link" to="/bulk-supply">
              Explore packaging <Icon>arrow_forward</Icon>
            </Link>
          </Disclosure>
          <Disclosure title="Is this certified organic?">
            <p>
              Our current offer is conventional moringa leaf powder. It is not
              sold as certified organic.
            </p>
          </Disclosure>
          <Disclosure title="What affects price and minimum quantity?">
            <p>
              The proposed grade, quantity, packing, and shipment terms shape
              your quotation. Send your approximate requirements so we can
              confirm the minimum and quote basis.
            </p>
            <Link className="text-link" to="/request-quote">
              Build your enquiry <Icon>arrow_forward</Icon>
            </Link>
          </Disclosure>
          <Disclosure title="Can I sell this as food or a supplement in my country?">
            <p>Product status and requirements differ by country and intended use. Ask your importer or adviser to confirm eligibility, required testing and labelling before ordering. Some markets restrict moringa leaf as a food.</p>
            <Link className="text-link" to="/global-markets">Review export planning <Icon>arrow_forward</Icon></Link>
          </Disclosure>
          <Disclosure title="Which tests and documents should I request?">
            <p>Start with the specification and a batch COA, then discuss relevant independent reports. Microbiological, pesticide-residue and heavy-metal checks may be needed for your destination or buyer specification. Agree the methods, units and limits; no universal numerical limits are published here.</p>
          </Disclosure>
        </div>
      </section>
      <div className="section-container product-final-cta">
        <QuoteCTA
          title="Your next ingredient starts here."
          description="Send your quantity, intended use, and destination. Let’s discuss the right next step."
        />
      </div>
      <aside
        className="product-mobile-actions"
        aria-label="Product enquiry actions"
      >
        <Link to="/request-quote">
          Request bulk pricing <Icon>north_east</Icon>
        </Link>
        <Link to="/request-quote?type=sample">Discuss a sample</Link>
      </aside>
    </div>
  );
}
