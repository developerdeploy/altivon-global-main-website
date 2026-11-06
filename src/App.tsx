import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { lazy } from "react";
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const QualityDocumentationPage = lazy(
  () => import("@/pages/QualityDocumentationPage"),
);
const BulkSupplyPage = lazy(() => import("@/pages/BulkSupplyPage"));
const GlobalMarketsPage = lazy(() => import("@/pages/GlobalMarketsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const RequestQuotePage = lazy(() => import("@/pages/RequestQuotePage"));
const EnquiryReceivedPage = lazy(() => import("@/pages/EnquiryReceivedPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/moringa-leaf-powder" element={<ProductDetailPage slug="moringa-leaf-powder" />} />
        <Route path="/products/beetroot-powder" element={<ProductDetailPage slug="beetroot-powder" />} />
        <Route path="/products/ashwagandha-powder" element={<ProductDetailPage slug="ashwagandha-powder" />} />
        {/* Canonical 301/SPA Aliases & Legacy Route Redirects */}
        <Route
          path="/moringa-oleifera"
          element={<Navigate to="/products/moringa-leaf-powder" replace />}
        />
        <Route
          path="/products/moringa-oleifera"
          element={<Navigate to="/products/moringa-leaf-powder" replace />}
        />
        <Route
          path="/moringa-leaf-powder"
          element={<Navigate to="/products/moringa-leaf-powder" replace />}
        />

        <Route
          path="/quality-documentation"
          element={<QualityDocumentationPage />}
        />
        <Route path="/bulk-supply" element={<BulkSupplyPage />} />
        <Route path="/global-markets" element={<GlobalMarketsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/request-quote" element={<RequestQuotePage />} />
        <Route path="/enquiry-received" element={<EnquiryReceivedPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
