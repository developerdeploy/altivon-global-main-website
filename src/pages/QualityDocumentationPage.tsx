import { Link } from "react-router-dom";
import { SITE_IMAGES } from "@/config/images";
import { Disclosure, Icon, PageIntro, QuoteCTA } from "@/components/PageElements";

export default function QualityDocumentationPage() {
  return (
    <div className="section-container page-space">
      <PageIntro eyebrow="Quality & documentation" seoTitle="Moringa Powder COA, Specification and Test Reports" title="Know the document. Understand the evidence." description="Learn how a specification, batch COA, independent test report and facility certificate differ, and what to ask for before ordering moringa powder." path="/quality-documentation" />
      <div className="split-feature">
        <div className="feature-copy">
          <p className="eyebrow">CLARITY BEFORE COMMITMENT</p>
          <h2>A specification.<br />A sample.<br />The relevant evidence.</h2>
          <p>Start with your intended use, destination and target specification. Ask which current product, batch and supplier documents can be provided for your review.</p>
          <Link className="btn-primary" to="/request-quote?type=docs">Discuss documents <Icon>arrow_forward</Icon></Link>
        </div>
        <div className="feature-image"><img src={SITE_IMAGES.qualityLaboratory} alt="Illustrative laboratory review of a botanical ingredient" /></div>
      </div>
      <section className="section-space documents-grid evidence-documents" aria-label="Four types of product evidence">
        {[
          ["Product specification", "The agreed product identity, parameters, limits and test methods. It describes the offer; it is not a test result for a shipment."],
          ["Batch COA", "A certificate of analysis reports results for a particular lot. Check the lot reference, test date, method, units and reported limits."],
          ["Independent test report", "Shows which laboratory examined which sample, using which methods and when. Check the sample identity and the laboratory’s relevant accreditation scope."],
          ["Facility certification", "Covers the named site, activities and certification scope. Check issuer, validity and scope; it does not replace a batch test report."],
        ].map(([title, body]) => <article className="document-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
      </section>
      <Disclosure title="What should I check on a COA or laboratory report?">
        <p>Match the lot or sample reference to the proposed goods. Review the test date, laboratory name, relevant accreditation scope, methods, units, specification limits, results and authorised sign-off. Ask how the sample was taken and which evidence relates to the offered lot.</p>
      </Disclosure>
      <Disclosure title="Which testing should I request?">
        <p>Testing depends on the destination, intended use and buyer specification. Microbiological, pesticide-residue and heavy-metal checks may be relevant. Agree the test list, methods and limits before ordering; no single set of numerical limits is presented as suitable for every market.</p>
      </Disclosure>
      <Disclosure title="Which product and shipment documents can I ask about?">
        <p>Ask about the product specification, batch COA and relevant independent reports. Separately, discuss commercial and transport documents such as the invoice, packing list and transport document. Origin, phytosanitary or other certificates depend on the goods, destination and transaction. Availability and responsibilities must be confirmed for your order.</p>
      </Disclosure>
      <Disclosure title="Does this page mean a certification is held?">
        <p>These explanations help you review evidence. They do not establish that a particular certification, approval or test report is held. Request the current documents relevant to the proposed supplier, facility and lot.</p>
      </Disclosure>
      <div className="mt-12"><QuoteCTA title="Bring your technical brief." description="Tell us the intended use, required tests and documents your buying process needs." /></div>
    </div>
  );
}
