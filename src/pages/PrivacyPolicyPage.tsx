import { Link } from "react-router-dom";
import { COMPANY } from "@/config/publicCompany";
import { ENQUIRIES_ENABLED, PageIntro } from "@/components/PageElements";
export default function PrivacyPolicyPage() {
  return (
    <div className="section-container page-space">
      <PageIntro
        eyebrow="Privacy & enquiries"
        title="Your business information."
        description="Information used to discuss your sourcing requirements."
        path="/privacy-policy"
      />
      <div className="prose-content" style={{ maxWidth: 750, lineHeight: 1.9 }}>
        {!ENQUIRIES_ENABLED && (
          <p className="preview-note">
            This is a client preview. The enquiry forms do not send or save your
            entries to a backend. Details remain in the current page session and
            can be cleared by reloading.
          </p>
        )}
        <h2>Information in an enquiry</h2>
        <p>
          The forms ask for business contact details and product requirements,
          such as company, email, destination, intended use, quantity, and
          packing preferences.
        </p>
        <h2>Direct contact</h2>
        {ENQUIRIES_ENABLED && <p>When you submit a form, your business contact details and requirements are saved in a private Google Sheet managed for AltivonGlobal. An email alert is sent to the team so they can respond. Cloudflare processes the submission and Google processes the storage and alert. Your consent covers contact about this enquiry, not a marketing subscription. Contact us to request correction or deletion of your enquiry details.</p>}
        <p>
          If you choose an email or phone link, your email or telephone provider
          handles that communication. Share only the information needed to
          discuss your requirement. Confirm arrangements with our team before
          sharing confidential specifications or artwork.
        </p>
        <h2>Questions</h2>
        <p>
          Contact{" "}
          <a href={`mailto:${COMPANY.contact.email}`}>
            {COMPANY.contact.email}
          </a>{" "}
          about information shared with AltivonGlobal or an enquiry you have submitted.
        </p>
        <Link className="text-link" to="/contact">
          Contact AltivonGlobal →
        </Link>
      </div>
    </div>
  );
}
