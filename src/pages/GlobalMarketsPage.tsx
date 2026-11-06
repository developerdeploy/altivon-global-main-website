import { useState } from "react";
import { SITE_IMAGES } from "@/config/images";
import { Disclosure, Icon, PageIntro, QuoteCTA } from "@/components/PageElements";

const planning = [
  { name: "Intended use", title: "Start with the application.", description: "Food, beverage, supplement and other uses can follow different rules. Identify the product and proposed use before discussing a destination or freight plan.", note: "Moringa, beetroot and ashwagandha powders" },
  { name: "Destination", title: "Check the market before the route.", description: "Your importer or adviser should confirm product eligibility, registrations, labelling and import requirements with the destination authority. A country selection is an enquiry, not confirmation of market access.", note: "Country, destination port and importer responsibilities" },
  { name: "Documents", title: "Agree the evidence and paperwork.", description: "Product specifications and lot reports support technical review. Invoices, packing lists and transport documents support the shipment. Additional certificates depend on the transaction.", note: "Required tests, document scope and availability" },
  { name: "Freight", title: "Define the handover together.", description: "Quantity, packing, delivery point, freight booking and insurance help determine the transport arrangement and trade term. Origin, loading port, costs and timing are confirmed for the proposed order.", note: "Named place or port and agreed Incoterms edition" },
];

export default function GlobalMarketsPage() {
  const [selected, setSelected] = useState(0);
  const item = planning[selected];
  return (
    <div className="section-container page-space">
      <PageIntro eyebrow="Export planning" seoTitle="Botanical Powder Export Planning and Trade Terms" title="Plan the product. Then plan the journey." description="Plan a botanical powder enquiry around intended use, destination rules, shipment documents, freight and agreed trade terms." path="/global-markets" />
      <section className="split-feature markets-feature">
        <div className="feature-image"><img src={SITE_IMAGES.moringaPlantation} alt="Illustrative moringa cultivation in India" /></div>
        <div className="market-content">
          <p className="eyebrow">FOUR PARTS OF THE BRIEF</p>
          <div className="market-options" role="group" aria-label="Export planning topics">
            {planning.map((topic, i) => <button key={topic.name} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{topic.name}</button>)}
          </div>
          <div className="market-panel" aria-live="polite"><h2>{item.title}</h2><p>{item.description}</p><div className="route-note"><span>{item.note}</span></div></div>
        </div>
      </section>
      <section className="section-space export-planning-notes">
        <p className="eyebrow">MARKET STATUS COMES FIRST</p>
        <h2>Requirements differ by country and use.</h2>
        <p>Destination eligibility is reviewed for each enquiry. The examples below explain why a route, a product image or a shipping term does not establish permission to import or sell an ingredient.</p>
        <p className="quiet-note">Authority guidance reviewed 6 November 2026. Check the current rules before ordering.</p>
        <Disclosure title="Australia and New Zealand: food-use status">
          <p>FSANZ states that Moringa oleifera is not permitted as a food or food ingredient for retail sale following its rejected novel-food application. Food-use supply needs to be assessed against that position; therapeutic goods are a separate category.</p>
          <a className="text-link" href="https://www.foodstandards.gov.au/business/novel/moringa-oleifera-novel-food" target="_blank" rel="noreferrer">Read FSANZ guidance <Icon>north_east</Icon></a>
        </Disclosure>
        <Disclosure title="United States: confirm the import pathway">
          <p>US food imports involve importer responsibilities and can require facility registration, prior notice and foreign-supplier verification. Scope and exemptions depend on the transaction. No FDA registration or product approval is claimed for AltivonGlobal or its proposed suppliers here.</p>
          <a className="text-link" href="https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states" target="_blank" rel="noreferrer">Read FDA import guidance <Icon>north_east</Icon></a>
        </Disclosure>
        <Disclosure title="Other destinations and intended uses">
          <p>Check the appropriate food, supplement, plant-health and customs authorities for the country and intended use. The EU and UK need separate reviews. The appropriate authority and product classification for UAE enquiries also need confirmation. No blanket destination approval or countries-served list is presented.</p>
        </Disclosure>
      </section>
      <section id="trade-terms" className="export-planning-notes section-space">
        <p className="eyebrow">THE COMMERCIAL HANDOVER</p>
        <h2>A term is part of the agreement.</h2>
        <div className="three-facts"><div><span className="small-label">Any-mode examples</span><p>FCA · CPT · CIP</p></div><div><span className="small-label">Sea / inland-waterway examples</span><p>FOB · CFR · CIF</p></div><div><span className="small-label">Agree explicitly</span><p>Named place or port · Edition</p></div></div>
        <p>Choose a rule with your counterpart and forwarder around the actual delivery point, transport, insurance and responsibilities. Container or multimodal arrangements may call for FCA, CPT or CIP; the vessel shown in the animation does not determine the term.</p>
        <a className="text-link" href="https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf" target="_blank" rel="noreferrer">ICC guide to selecting a rule <Icon>north_east</Icon></a>
      </section>
      <QuoteCTA title="Start with your destination and intended use." description="Add approximate quantity, packing and any required tests or documents to your enquiry." />
    </div>
  );
}
