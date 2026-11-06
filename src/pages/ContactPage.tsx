import { useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/config/publicCompany";
import {
  Disclosure,
  Icon,
  IS_PREVIEW,
  PageIntro,
  PreviewNotice,
} from "@/components/PageElements";

export default function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (IS_PREVIEW) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `${(import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "")}/inquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contact_name: String(form.get("name") || "").trim(),
            company_name: "Direct Contact Form",
            work_email: String(form.get("email") || "").trim(),
            additional_notes: String(form.get("message") || "").trim(),
            enquiry_scope: "contact_message",
            destination_market: "Worldwide",
            botanical_product: "general_inquiry",
            order_quantity: 1,
            quantity_unit: "kg",
          }),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Message could not be sent.");
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
              <PreviewNotice />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="btn-primary"
                type="submit"
                disabled={IS_PREVIEW || busy}
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
