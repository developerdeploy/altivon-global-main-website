import { Link } from "react-router-dom";
import { SITE_IMAGES, SITE_BACKDROPS } from "@/config/images";
import SEO from "@/components/SEO";
import { Disclosure, Icon, QuoteCTA } from "@/components/PageElements";
import { DepthCard } from "@/components/MotionSystem";
import QuickEnquiry from "@/components/QuickEnquiry";
import ProductImage from "@/components/ProductImage";
import ExportJourney from "@/components/ExportJourney";
import { journeyStages } from "@/data/exportJourney";
import SceneBackdrop from "@/components/SceneBackdrop";

export default function HomePage() {
  return (
    <div className="cinematic-home">
      <SEO
        title="AltivonGlobal | Moringa Leaf Powder from India"
        description="B2B sourcing and export coordination for conventional moringa leaf powder from India. Ask about samples, packing and a quotation."
        canonical="/"
      />
      <ExportJourney />
      <section id="journey-details" className="section-container homepage-information journey-deep-details image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.milling} />
        <div className="home-info-header"><div><p className="eyebrow">BEHIND THE JOURNEY</p><h2>The details<br />that matter.</h2></div><p>The film illustrates the process; it does not document specific facilities or shipments. Explore the specification, packing and export questions for your order.</p></div>
        {journeyStages.map(stage => <Disclosure key={stage.name} title={stage.title}><p>{stage.detail}</p><Link className="text-link" to={stage.link}>{stage.cta}<Icon>arrow_forward</Icon></Link></Disclosure>)}
      </section>
      <div id="quotation-brief" className="section-container enquiry-bridge journey-quote image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.shipping} />
        <div className="quotation-story">
          <p className="eyebrow">A QUOTATION BUILT AROUND YOU</p>
          <h2>Your market.<br />Your next<br />shipment.</h2>
          <p>From Indian origins to your destination. Start with your buying brief, and let’s plan the details together.</p>
        </div>
        <div className="quotation-inputs">
          <QuickEnquiry />
          <p className="quiet-note">Requirements differ by country and intended use. <Link to="/global-markets">Review destination planning</Link> before ordering. Quantity choices are estimates, not minimum order commitments.</p>
        </div>
      </div>
      <section
        id="ingredient"
        className="section-container section-space ingredient-story image-surface"
      >
        <SceneBackdrop {...SITE_BACKDROPS.powder} />
        <div className="ingredient-story-copy" data-reveal>
          <p className="eyebrow">01 / THE INGREDIENT</p>
          <h2>
            One leaf.
            <br />
            <em>A world of applications.</em>
          </h2>
          <p>
            Conventional moringa leaf powder sourced from India for business
            buyers. Start with the application and specification you need.
          </p>
          <p>
            Our current offer is conventional moringa leaf powder. Tell us the
            specification and application you are working with so we can check
            the proposed supply against your requirements.
          </p>
          <div className="application-chips">
            <span>Food & beverage</span>
            <span>Nutritional blends</span>
            <span>Wholesale supply</span>
          </div>
          <Link className="text-link" to="/products/moringa-leaf-powder">
            Explore product specifications <Icon>arrow_forward</Icon>
          </Link>
          <p className="quiet-note">
            Food, beverage and supplement applications need a destination and
            intended-use review. The current offer is not certified organic.
          </p>
        </div>
        <DepthCard className="ingredient-depth">
          <div className="ingredient-photo">
            <ProductImage
              src={SITE_IMAGES.moringaPowder}
              alt="Soft green moringa leaf powder in a shallow ivory dish on warm limestone"
              loading="lazy"
            />
          </div>
          <div className="floating-spec spec-top">
            <span>BOTANICAL IDENTITY</span>
            <b>Moringa leaf powder</b>
            <small>Leaf · Powder · India</small>
          </div>
          <div className="floating-spec spec-bottom">
            <div>
              <b>Built for bulk.</b>
              <small>Packing agreed per order</small>
            </div>
          </div>
          <span className="ingredient-index" aria-hidden="true">
            01
          </span>
        </DepthCard>
      </section>
      <section className="section-container homepage-information image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.leaf} />
        <div className="home-info-header">
          <div>
            <p className="eyebrow">FOR THE WAY YOUR BUSINESS BUYS</p>
            <h2>
              Different buyers.
              <br />A clear starting point.
            </h2>
          </div>
          <p>
            We begin with your buying requirements. The product, available
            documents, packaging, and quotation are discussed together before
            you decide.
          </p>
        </div>
        <div className="home-info-grid">
          {[
            {
              title: "Importers & distributors",
              copy: "Plan a bulk ingredient enquiry with your destination, approximate volume, and preferred packing. Share the documents your supplier review needs.",
              items: [
                "Bulk buying requirements",
                "Destination and shipment planning",
                "Product and batch information",
              ],
            },
            {
              title: "Manufacturers & formulators",
              copy: "Evaluate the powder for your intended food, beverage, or supplement application. Send your target specification and sample evaluation requirements.",
              items: [
                "Particle size and physical parameters",
                "Relevant tests and methods",
                "Sample assessment before an order",
              ],
            },
            {
              title: "Brands & private label buyers",
              copy: "Discuss packing for your business or brand. We check the proposed format, minimum quantity, artwork process, and costs against your requirement.",
              items: [
                "Pack weight and material",
                "Label language and destination",
                "Artwork and approval responsibilities",
              ],
            },
          ].map((item) => (
            <article className="home-info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul>
                {item.items.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="buyer-confidence image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.milling} />
        <div className="section-container section-space">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">02 / YOUR BUYING DECISION</p>
              <h2>Clarity before commitment.</h2>
            </div>
            <p className="section-intro">
              The details that help you decide, without the back-and-forth.
            </p>
          </div>
          <div className="buyer-card-grid">
            {[
              {
                title: "Know the product.",
                copy: "Agree product identity, physical parameters and the specification needed for your intended use.",
                link: "/products/moringa-leaf-powder",
                cta: "See product details",
              },
              {
                title: "Evaluate the quality.",
                copy: "Discuss a sample and the documents available for your review.",
                link: "/quality-documentation",
                cta: "Explore documentation",
              },
              {
                title: "Plan the shipment.",
                copy: "Match your quantity, destination, and preferred trade terms.",
                link: "/bulk-supply",
                cta: "Review supply options",
              },
            ].map((item) => (
              <article className="buyer-card" key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link className="text-link" to={item.link}>
                  {item.cta}
                  <Icon>arrow_forward</Icon>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-container homepage-information home-info-split image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.packing} />
        <div className="home-packing-photo">
          <ProductImage
            src={SITE_IMAGES.bulkPackaging}
            alt="Illustrative kraft sack, ivory pouch and carton with a fresh moringa sprig"
            loading="lazy"
          />
        </div>
        <div className="home-info-copy">
          <p className="eyebrow">BULK PACKING & PRIVATE LABEL</p>
          <h2>
            Your order.
            <br />
            Your packing brief.
          </h2>
          <p>
            Packaging affects handling, cost, presentation, and the information
            a buyer needs. Share the format you have in mind so the available
            options can be checked before quotation.
          </p>
          <ul>
            <li>
              Required pack weight, total quantity, and preferred material.
            </li>
            <li>Any liner, sealing, storage, or handling requirements.</li>
            <li>Brand artwork, label language, and destination market.</li>
            <li>
              Target timing, minimum quantity, and approval responsibilities.
            </li>
          </ul>
          <p>
            Available formats, charges, and lead times are confirmed for each
            order. Illustrative packing images do not guarantee a particular
            format.
          </p>
          <Link className="text-link" to="/bulk-supply">
            Explore packaging options <Icon>arrow_forward</Icon>
          </Link>
        </div>
      </section>
      <section className="section-container homepage-information image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.laboratory} />
        <div className="home-info-header">
          <div>
            <p className="eyebrow">PRODUCT EVALUATION & DOCUMENTS</p>
            <h2>
              Know what to ask for.
              <br />
              Know what you’re reviewing.
            </h2>
          </div>
          <p>
            A specification, a batch test report, and a certification serve
            different purposes. Request the information relevant to your
            proposed product and intended use.
          </p>
        </div>
        <div className="home-info-grid">
          {[
            [
              "Product specification",
              "Agree the product identity, grade, physical parameters, packing, shelf life, and storage conditions against the current specification. Share any required limits before ordering.",
            ],
            [
              "Batch analysis & samples",
              "Ask which COA and relevant test reports are available for the proposed supply. Discuss the sample, courier charges, and evaluation process before arranging it.",
            ],
            [
              "Destination requirements",
              "State the country and intended use early. The required tests, documents, label responsibilities, and shipment terms need checking for that particular transaction.",
            ],
          ].map(([title, copy]) => (
            <article className="home-info-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className="text-link" to="/quality-documentation">
                Discuss product documents <Icon>arrow_forward</Icon>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section-container section-space origin-story image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.origin} />
        <div className="origin-photo" data-reveal>
          <ProductImage
            src={SITE_IMAGES.moringaPlantation}
            alt="Moringa cultivation in India"
            loading="lazy"
          />
          <span>FROM INDIAN ORIGINS</span>
        </div>
        <div className="origin-story-copy" data-reveal>
          <p className="eyebrow">03 / A CLEARER PATH TO EXPORT</p>
          <h2>
            From first question
            <br />
            <em>to shipment planning.</em>
          </h2>
          <ol className="export-timeline">
            {[
              ["Understand", "Your application, volume, and destination."],
              ["Evaluate", "Samples, specifications, and available documents."],
              ["Agree", "Packaging, pricing, and trade terms."],
              ["Prepare", "Order-specific checks and dispatch coordination."],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="text-link" to="/global-markets">
            Explore export planning<Icon>arrow_forward</Icon>
          </Link>
        </div>
      </section>
      <section className="section-container homepage-information home-faq-layout image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.leaf} />
        <div>
          <p className="eyebrow">BEFORE YOUR FIRST ENQUIRY</p>
          <h2>
            The questions
            <br />
            buyers ask first.
          </h2>
          <p>
            Start with the details you know. We can discuss the product,
            samples, documents, and commercial requirements from there.
          </p>
          <Link className="text-link" to="/contact">
            Contact AltivonGlobal <Icon>arrow_forward</Icon>
          </Link>
        </div>
        <div>
          <Disclosure title="What moringa product do you currently offer?">
            <p>
              Our current offer is conventional moringa leaf powder from India
              for business buyers. It is not sold as certified organic. Grade
              and physical parameters are confirmed against the proposed product
              specification.
            </p>
          </Disclosure>
          <Disclosure title="What quantity should I enquire for?">
            <p>
              Send your approximate requirement, even if the final quantity is
              still being discussed. We confirm the minimum for the proposed
              product and packing option. Bulk and private label requirements
              can have different minimums and costs.
            </p>
          </Disclosure>
          <Disclosure title="Can I evaluate a sample before a bulk order?">
            <p>
              Enquire about a sample and explain what you need to assess.
              Availability, sample and courier charges, dispatch timing, and the
              evaluation process are confirmed before arrangement.
            </p>
            <Link className="text-link" to="/request-quote?type=sample">
              Discuss a sample <Icon>arrow_forward</Icon>
            </Link>
          </Disclosure>
          <Disclosure title="Can you supply my destination market?">
            <p>
              Destinations are reviewed enquiry by enquiry. Share the country,
              intended use, packing and quantity. Product status, import rules
              and documents need to be checked before an offer is confirmed.
              Some markets restrict moringa leaf as a food.
            </p>
            <Link className="text-link" to="/global-markets">Review destination planning <Icon>arrow_forward</Icon></Link>
          </Disclosure>
          <Disclosure title="What should I include in a quotation request?">
            <p>
              Your business name, country, intended use, approximate quantity,
              packing preference, and target timing make a useful starting
              brief. Add any specification, test, or document requirements so
              they can be reviewed together.
            </p>
          </Disclosure>
        </div>
      </section>
      <section className="section-container section-space final-enquiry image-surface">
        <SceneBackdrop {...SITE_BACKDROPS.shipping} />
        <QuoteCTA
          title="Let’s turn your requirement into a conversation."
          description="Start with the product, quantity, and destination. We’ll take it from there."
        />
      </section>
    </div>
  );
}
