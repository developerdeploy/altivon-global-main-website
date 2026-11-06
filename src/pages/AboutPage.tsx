import { Disclosure, PageIntro, QuoteCTA } from "@/components/PageElements";
export default function AboutPage() {
  return (
    <div className="section-container page-space">
      <PageIntro
        eyebrow="About us"
        title="About AltivonGlobal."
        description="Botanical powder supplier and exporter in Vadodara, Gujarat, India. Discuss your business requirements with Nirmit Shah."
        path="/about"
      />
      <div className="split-feature about-feature">
        <div className="brand-story-art">
          <img
            src={`${import.meta.env.BASE_URL}brand/altivonglobal-transparent.png`}
            alt="AltivonGlobal gold eagle and globe logo with its original wordmark and Elevate, Evolve, Export tagline"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Elevate · Evolve · Export</p>
          <h2>
            Connecting origins
            <br />
            with opportunity.
          </h2>
          <p>
            We help international businesses source botanical ingredients from
            India, including moringa, beetroot and ashwagandha powders.
          </p>
          <p>
            From the first enquiry to shipment planning, we coordinate sourcing,
            documentation, and export logistics.
          </p>
          <div className="founder-note">
            <span className="small-label">Nirmit Shah</span>
            <p>Sales and Marketing Head</p>
          </div>
        </div>
      </div>
      <section className="section-space three-facts">
        <div>
          <span className="small-label">Our base</span>
          <p>Vadodara, Gujarat</p>
        </div>
        <div>
          <span className="small-label">Our focus</span>
          <p>Botanical ingredient sourcing</p>
        </div>
        <div>
          <span className="small-label">Our approach</span>
          <p>Clear communication, practical support</p>
        </div>
      </section>
      <Disclosure title="Business details">
        <p>
          Based in Vadodara, Gujarat, India. Contact our team to discuss company
          verification and the documents needed for your buying process.
        </p>
      </Disclosure>
      <div className="mt-12">
        <QuoteCTA title="Let’s build your supply connection." />
      </div>
    </div>
  );
}
