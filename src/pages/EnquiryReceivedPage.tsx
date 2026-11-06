import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, PageIntro } from "@/components/PageElements";
import { products } from "@/data/products";
export default function EnquiryReceivedPage() {
  const { state } = useLocation();
  const [copied, setCopied] = useState(false);
  const docket = state?.docket_id;
  return (
    <div className="section-container page-space narrow-page">
      <PageIntro
        eyebrow="Enquiry status"
        title={docket ? "Thank you. We’re on it." : "No enquiry to display."}
        description={
          docket
            ? "Keep your reference for any follow-up with our team."
            : "Your enquiry summary will appear here after a successful submission."
        }
        path="/enquiry-received"
      />
      {docket && (
        <div className="enquiry-form">
          <span className="small-label">Your reference</span>
          <h2>{docket}</h2>
          <dl className="spec-list">
            {state.botanical_product && <div><dt>Product</dt><dd>{products.find(product => product.id === state.botanical_product)?.name || "General enquiry"}</dd></div>}
            <div>
              <dt>Name</dt>
              <dd>{state.contact_name}</dd>
            </div>
            <div>
              <dt>Company</dt>
              <dd>{state.company_name}</dd>
            </div>
            <div>
              <dt>Destination</dt>
              <dd>{state.destination_market}</dd>
            </div>
          </dl>
          <div className="action-row">
            <button
              type="button"
              className="btn-secondary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(docket);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Copied" : "Copy reference"}
              <Icon>content_copy</Icon>
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => window.print()}
            >
              Print<Icon>print</Icon>
            </button>
          </div>
        </div>
      )}
      <Link className="text-link mt-8" to={docket ? "/" : "/request-quote"}>
        {docket ? "Back to home" : "Start an enquiry"}
        <Icon>arrow_forward</Icon>
      </Link>
    </div>
  );
}
