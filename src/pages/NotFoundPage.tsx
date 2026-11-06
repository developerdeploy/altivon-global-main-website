import { Link } from "react-router-dom";
import { PageIntro } from "@/components/PageElements";
export default function NotFoundPage() {
  return (
    <div className="section-container page-space narrow-page">
      <PageIntro
        eyebrow="404"
        title="A little off course."
        description="We couldn’t find that page. Let’s take you back."
        path="/404"
      />
      <Link className="btn-primary" to="/">
        Back to home
      </Link>
    </div>
  );
}
