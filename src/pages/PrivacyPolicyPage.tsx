import { Link } from "react-router-dom";
import { COMPANY } from "@/config/publicCompany";
import { IS_PREVIEW, PageIntro } from "@/components/PageElements";
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
        {IS_PREVIEW && (
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
          about information shared directly with AltivonGlobal. The enquiry
          handling and retention details must be confirmed before live form
          delivery is enabled.
        </p>
        <Link className="text-link" to="/contact">
          Contact AltivonGlobal →
        </Link>
      </div>
    </div>
  );
}
