import { SITE_IMAGES } from "@/config/images";
import { Disclosure, PageIntro, QuoteCTA } from "@/components/PageElements";
import ProductImage from "@/components/ProductImage";
export default function BulkSupplyPage() {
  return (
    <div className="section-container page-space">
      <PageIntro
        eyebrow="Bulk supply"
        seoTitle="Bulk Botanical Powders and Private Label Enquiries"
        title="Botanical powder packaging & private label."
        description="Discuss bulk supply, custom packing and private label for moringa, beetroot and ashwagandha powders. Minimums and details are confirmed per enquiry."
        path="/bulk-supply"
      />
      <div className="split-feature">
        <div className="feature-image">
          <ProductImage
            src={SITE_IMAGES.bulkPackaging}
            alt="Illustrative plain kraft sack, ivory pouch and carton in soft natural light"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Your order. Your requirements.</p>
          <h2>
            Your product.
            <br />
            Your preferred pack.
          </h2>
          <div className="stacked-options">
            {[
              [
                "Bulk packing",
                "Share your pack weight, material, and handling needs.",
              ],
              [
                "Custom packaging",
                "Available formats and charges are checked for your requirement.",
              ],
              [
                "Private label",
                "Discuss artwork, label language, quantity, and destination.",
              ],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section id="packing-details" className="section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A simple process</p>
            <h2>Agree the brief before dispatch.</h2>
          </div>
        </div>
        <div className="steps-grid">
          {[
            [
              "01",
              "Confirm",
              "Agree on quantity, specifications, and packaging.",
            ],
            ["02", "Prepare", "Review samples, documents, and trade terms."],
            ["03", "Ship", "Coordinate inspection, freight, and dispatch."],
          ].map(([n, title, body]) => (
            <div className="step" key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <Disclosure title="Who confirms the label and market requirements?">
        <p>For private label, share the proposed artwork, language, claims and intended market. The brand owner and importer need to confirm the applicable label requirements; available packing capability, artwork checks and approval responsibilities are agreed for the order.</p>
      </Disclosure>
      <Disclosure title="What should the outer packing brief include?">
        <p>Discuss pack count, carton dimensions, net and gross weights, shipping marks and batch identification. Pallet size, stacking, wrapping and any applicable wooden-packaging requirements should be checked with the forwarder for the destination. The pictured sack, pouch and carton are illustrative formats.</p>
      </Disclosure>
      <Disclosure title="Volumes, freight & lead times">
        <p>
          Minimum quantities, packing formats, lead times, and shipment terms
          are confirmed for the proposed supply. Share your destination,
          approximate quantity, and required timing for a current quotation.
        </p>
      </Disclosure>
      <div className="mt-12">
        <QuoteCTA
          title="Tell us your quantity."
          description="We’ll review packaging and freight options for your order."
        />
      </div>
    </div>
  );
}
