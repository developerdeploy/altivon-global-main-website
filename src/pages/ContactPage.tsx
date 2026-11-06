import { useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/config/publicCompany";
import { createEnquirySubmission } from "@/lib/sendEnquiry";
import {
  Disclosure,
  Icon,
  ENQUIRIES_ENABLED,
  PageIntro,
  PreviewNotice,
} from "@/components/PageElements";

export default function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sendEnquiry] = useState(createEnquirySubmission);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ENQUIRIES_ENABLED) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await sendEnquiry({
            contact_name: String(form.get("name") || "").trim(),
            company_name: "Direct Contact Form",
            work_email: String(form.get("email") || "").trim(),
            additional_notes: String(form.get("message") || "").trim(),
            enquiry_scope: "contact_message",
            destination_market: "Worldwide",
            botanical_product: "general_inquiry",
            order_quantity: null,
            quantity_unit: "kg",
            website_url: String(form.get("website") || ""),
            consent: form.get("consent") === "on",
          });
      setSent(true);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Please contact us directly.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="section-container page-space">
      <PageIntro
        eyebrow="Contact"
        title="Contact AltivonGlobal."
        seoTitle="Contact AltivonGlobal | Moringa Bulk Enquiries"
        description="Talk to us about moringa sourcing, samples, or your next shipment."
        path="/contact"
      />
      <div className="contact-layout">
        <div className="contact-details">
          <div>
            <div>
              <span className="small-label">Email</span>
              <a href={`mailto:${COMPANY.contact.email}`}>
                {COMPANY.contact.email}
              </a>
            </div>
          </div>
          <div>
            <div>
              <span className="small-label">Phone & WhatsApp</span>
              <a href={`tel:${COMPANY.contact.phone}`}>
                {COMPANY.contact.phoneFormatted}
              </a>
            </div>
          </div>
          <div>
            <div>
              <span className="small-label">Based in</span>
              <p>Vadodara, Gujarat, India</p>
            </div>
          </div>
          <Disclosure title="Business verification">
            <p>
              Contact our team for business details relevant to your supplier
              review.
            </p>
          </Disclosure>
          <Link className="text-link" to="/request-quote">
            Have an order in mind? Request a quote <Icon>arrow_forward</Icon>
          </Link>
        </div>
        <div className="enquiry-form">
          <h2>Send a message.</h2>
          {sent ? (
            <p className="success-note" role="status">
              Thank you. Your message has been received.
            </p>
          ) : (
            <form onSubmit={submit}>
              <label hidden aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <div className="form-grid">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Full name"
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
                <label className="full-field">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={3000}
                    placeholder="How can we help?"
                  />
                </label>
              </div>
              <label className="contact-consent"><input name="consent" type="checkbox" required /> I agree to be contacted about this enquiry. <Link to="/privacy-policy">Privacy policy</Link>.</label>
              <PreviewNotice />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="btn-primary"
                type="submit"
                disabled={!ENQUIRIES_ENABLED || busy}
              >
                {busy ? "Sending…" : "Send message"}
                <Icon>arrow_forward</Icon>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
