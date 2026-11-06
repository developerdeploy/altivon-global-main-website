import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { countries } from "@/data/formData";
import { COMPANY } from "@/config/publicCompany";
import { products } from "@/data/products";
import { createEnquirySubmission } from "@/lib/sendEnquiry";
import {
  Icon,
  ENQUIRIES_ENABLED,
  PageIntro,
  PreviewNotice,
} from "@/components/PageElements";

export default function RequestQuotePage() {
  const [params, setParams] = useSearchParams();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const requested = params.get("type");
  const type =
    requested === "sample" || requested === "docs" ? requested : "quotation";
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [sendEnquiry] = useState(createEnquirySubmission);
  const [draft, setDraft] = useState({
    product: products.find(item => item.id === params.get("product"))?.id || products[0].id,
    name: "",
    company: "",
    email: "",
    country: countries.includes(params.get("country") || "")
      ? params.get("country")!
      : "",
    quantity: params.get("quantity") || "",
    port: "",
    phone: "",
    packaging: "To be discussed",
    terms: "To be discussed",
    application: "",
    notes: "",
    targetTiming: "",
    orderFrequency: "",
    website: "",
  });
  const product = products.find(item => item.id === draft.product) || products[0];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setStep(1);
  }, [type]);
  const change = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) =>
    setDraft((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  const advance = (next: number) => {
    setStep(next);
    setError("");
    requestAnimationFrame(() =>
      titleRef.current?.focus({ preventScroll: true }),
    );
  };
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      advance(step + 1);
      return;
    }
    if (!ENQUIRIES_ENABLED) return;
    const payload = {
      contact_name: draft.name.trim(),
      company_name: draft.company.trim(),
      work_email: draft.email.trim(),
      country: draft.country,
      destination_market: draft.country,
      destination_port: draft.port.trim(),
      botanical_product: product.id,
      order_quantity: draft.quantity ? Number(draft.quantity) : null,
      quantity_unit: "kg",
      enquiry_scope: type,
      additional_notes: draft.notes.trim(),
      intended_use: draft.application,
      target_timing: draft.targetTiming,
      order_frequency: draft.orderFrequency,
      consent,
      phone_number: draft.phone.trim(),
      packaging_format: draft.packaging,
      incoterms_preference: draft.terms,
      website_url: draft.website.trim(),
    };
    setBusy(true);
    setError("");
    try {
      const data = await sendEnquiry(payload);
      navigate("/enquiry-received", {
        state: { ...payload, ...data.data, docket_id: data.docket_id },
      });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Please try again or contact us directly.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="section-container page-space enquiry-page">
      <PageIntro
        seoTitle="Request a Botanical Powder Quotation"
        eyebrow="Your next sourcing conversation"
        title="A better brief. A better beginning."
        description="Prepare a brief with intended use, destination, approximate quantity and packing preference. Review it before the next sourcing conversation."
        path="/request-quote"
      />
      <div className="enquiry-layout">
        {!ready ? <p role="status">Loading enquiry form…</p> : (
        <form className="enquiry-form guided-form" onSubmit={submit}>
          <ol className="form-progress" aria-label="Enquiry progress">
            {["Requirements", "Your details", "Review"].map((name, i) => (
              <li
                key={name}
                aria-current={step === i + 1 ? "step" : undefined}
                className={step > i + 1 ? "complete" : ""}
              >
                <span>{step > i + 1 ? "✓" : `0${i + 1}`}</span>
                {name}
              </li>
            ))}
          </ol>
          <h2 ref={titleRef} tabIndex={-1} className="step-heading">
            {step === 1
              ? "What are you sourcing?"
              : step === 2
                ? "How can we reach you?"
                : "Review your request."}
          </h2>
          {step === 1 && (
            <>
              <div
                className="enquiry-types"
                role="group"
                aria-label="Enquiry type"
              >
                {[
                  ["quotation", "Bulk quote"],
                  ["sample", "Sample"],
                  ["docs", "Documents"],
                ].map(([key, label]) => (
                  <button
                    type="button"
                    aria-pressed={type === key}
                    key={key}
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set("type", key);
                      setParams(next, { replace: true });
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="selected-product">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                />
                <label>
                  <span className="small-label">Your ingredient</span>
                  <select name="product" value={draft.product} onChange={change} required>
                    {products.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                  <small>Indian origin · Bulk supply</small>
                </label>
              </div>
              <div className="form-grid">
                <label>
                  Destination country
                  <select
                    name="country"
                    value={draft.country}
                    onChange={change}
                    required
                    autoComplete="country-name"
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </label>
                <label>
                  {type === "quotation"
                    ? "Estimated quantity (kg)"
                    : "Planned quantity (kg, optional)"}
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    max="10000000"
                    value={draft.quantity}
                    onChange={change}
                    required={type === "quotation"}
                    placeholder="e.g. 1000"
                  />
                </label>
                <label>
                  Packaging
                  <select
                    name="packaging"
                    value={draft.packaging}
                    onChange={change}
                  >
                    <option>To be discussed</option>
                    <option>Bulk packing</option>
                    <option>25 kg bulk packs</option>
                    <option>50 kg bulk packs</option>
                    <option>Custom packaging</option>
                    <option>Private label</option>
                  </select>
                </label>
                <label className="full-field">
                  Intended use
                  <select
                    name="application"
                    required
                    value={draft.application}
                    onChange={change}
                  >
                    <option value="" disabled>
                      Select intended use
                    </option>
                    <option>Food or beverage ingredient</option>
                    <option>Supplement formulation</option>
                    <option>Wholesale or repacking</option>
                    <option>To be discussed</option>
                    <option>Other application</option>
                  </select>
                </label>
              </div>
              {product.id === "moringa_leaf_powder" && (["Australia", "New Zealand"].includes(draft.country)) && <p className="destination-note">Moringa food-use status needs particular attention for this destination. <Link to="/global-markets">Read the current FSANZ guidance</Link> before planning an order.</p>}
              <details className="enquiry-optional">
                <summary>Add timing, tests and shipment preferences <span aria-hidden="true">+</span></summary>
                <div className="form-grid">
                  <label>Target timing (optional)<select name="targetTiming" value={draft.targetTiming} onChange={change}><option value="">To be discussed</option><option>This month</option><option>One to three months</option><option>Later</option><option>Just exploring</option></select></label>
                  <label>Order pattern (optional)<select name="orderFrequency" value={draft.orderFrequency} onChange={change}><option value="">To be discussed</option><option>One-off order</option><option>Recurring requirement</option><option>Evaluation first</option></select></label>
                  <label className="full-field">Preferred trade term (optional)<select name="terms" value={draft.terms} onChange={change}><option>To be discussed</option><option>EXW — named place to be agreed</option><option>FCA — named place to be agreed</option><option>CPT — named destination to be agreed</option><option>CIP — named destination to be agreed</option><option>FOB — named port to be agreed</option><option>CIF — named port to be agreed</option></select></label>
                  <label className="full-field">Specification, tests or documents wanted (optional)<textarea name="notes" rows={4} maxLength={3000} value={draft.notes} onChange={change} placeholder="For example: target specification, batch COA, microbiological tests, pesticide residues, heavy metals, packing or label requirements" /></label>
                </div>
              </details>
            </>
          )}
          {step === 2 && (
            <div className="form-grid">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  value={draft.name}
                  onChange={change}
                  placeholder="Full name"
                />
              </label>
              <label>
                Company
                <input
                  name="company"
                  autoComplete="organization"
                  required
                  value={draft.company}
                  onChange={change}
                  placeholder="Company name"
                />
              </label>
              <label className="full-field">
                Work email
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  value={draft.email}
                  onChange={change}
                  placeholder="you@company.com"
                />
              </label>
              <label>
                Phone (optional)
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={draft.phone}
                  onChange={change}
                  placeholder="Including country code"
                />
              </label>
              <label>
                Destination port (optional)
                <input
                  name="port"
                  value={draft.port}
                  onChange={change}
                  placeholder="Preferred port"
                />
              </label>
              <label className="full-field enquiry-consent"><input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} /><span>I agree to be contacted about this enquiry. Read the <Link to="/privacy-policy">privacy policy</Link>.</span></label>
            </div>
          )}
          {step === 3 && (
            <div className="enquiry-review">
              <div className="review-intro">
                <p>
                  Your request is ready to review.{" "}
                  {!ENQUIRIES_ENABLED
                    ? "Nothing will be sent from this preview."
                    : "Check your details before sending."}
                </p>
              </div>
              <dl className="spec-list">
                {[
                  [
                    "Request",
                    type === "sample"
                      ? "Evaluation sample"
                      : type === "docs"
                        ? "Product documents"
                        : "Bulk quotation",
                  ],
                  ["Ingredient", product.name],
                  ["Intended use", draft.application],
                  ["Destination", draft.country],
                  [
                    "Quantity",
                    draft.quantity ? `${draft.quantity} kg` : "To be discussed",
                  ],
                  ["Packaging", draft.packaging],
                  ["Trade terms", draft.terms],
                  ...(draft.targetTiming ? [["Target timing", draft.targetTiming]] : []),
                  ...(draft.orderFrequency ? [["Order pattern", draft.orderFrequency]] : []),
                  ["Contact", `${draft.name} · ${draft.company}`],
                  ["Email", draft.email],
                  ...(draft.notes ? [["Notes", draft.notes]] : []),
                ].map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <PreviewNotice />
              <p className="quiet-note">An enquiry is not an order or a price commitment. Availability, specifications, packing and terms are confirmed for the proposed supply.</p>
            </div>
          )}
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave blank
              <input
                name="website"
                value={draft.website}
                onChange={change}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-step-actions">
            {step > 1 && (
              <button
                type="button"
                className="text-link"
                onClick={() => advance(step - 1)}
              >
                <Icon>arrow_back</Icon>Back
              </button>
            )}
            <button
              className="btn-primary"
              type="submit"
              disabled={busy || (step === 3 && !ENQUIRIES_ENABLED)}
            >
              {busy
                ? "Sending…"
                : step === 1
                  ? "Continue to your details"
                  : step === 2
                    ? "Review my enquiry"
                    : "Send enquiry"}
              <Icon>arrow_forward</Icon>
            </button>
          </div>
          {!ENQUIRIES_ENABLED && step < 3 && (
            <p className="quiet-note">
              Try the complete enquiry journey. Delivery stays off in this
              client preview.
            </p>
          )}
        </form>
        )}
      </div>
      <div className="enquiry-direct-contact">
        <span>Prefer a direct conversation?</span>
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>
        <a href="/privacy-policy">Privacy policy</a>
      </div>
    </div>
  );
}
