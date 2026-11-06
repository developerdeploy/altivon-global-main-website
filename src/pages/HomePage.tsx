import { Link } from "react-router-dom";
import { SITE_IMAGES, SITE_BACKDROPS } from "@/config/images";
import SEO from "@/components/SEO";
import { Disclosure, Icon, QuoteCTA } from "@/components/PageElements";
import ProductCollection from "@/components/ProductCollection";
import QuickEnquiry from "@/components/QuickEnquiry";
import ProductImage from "@/components/ProductImage";
import ExportJourney from "@/components/ExportJourney";
import SceneBackdrop from "@/components/SceneBackdrop";

export default function HomePage() {
  return (
    <div className="cinematic-home">
      <SEO
        title="Botanical Powder Exporter in India | AltivonGlobal"
        description="Source moringa leaf powder, beetroot powder and ashwagandha powder from India. Bulk supply, 25 kg and 50 kg packs, samples and export enquiries."
        canonical="/"
      />
      <ExportJourney />
      <section id="products" className="section-container homepage-products image-surface" data-reveal>
        <SceneBackdrop {...SITE_BACKDROPS.leaf} />
        <div className="home-info-header"><div><p className="eyebrow">WHAT WE SUPPLY</p><h2>Three powders.<br />A world of possibilities.</h2></div><p>Moringa, beetroot and ashwagandha. Explore Indian-origin ingredients for your business, with the full specification and catalogue on each product page.</p></div>
        <ProductCollection />
        <Link className="text-link" to="/products">Explore all products →</Link>
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
                link: "/products",
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
          <Disclosure title="Which products do you supply?">
            <p>Our current collection includes moringa leaf powder, beetroot powder and ashwagandha powder. Explore the product pages for applications, specifications, packing details and downloadable catalogues.</p>
            <Link className="text-link" to="/products">View the collection →</Link>
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
