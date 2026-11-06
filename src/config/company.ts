/**
 * ALTIVONGLOBAL — Consolidated Company Configuration
 * Single source of truth for public business details, contact information,
 * and verification metadata.
 *
 * NOTE: Fields marked as "pending_client_document" are sourced from earlier
 * project materials and require final signed/original certificates from the
 * client before formal production certification.
 */

export interface CompanyConfig {
  brandName: string;
  legalEntityName: string;
  tagline: string;
  businessType: string;
  founder: {
    name: string;
    role: string;
    status: "unverified" | "verified";
  };
  tradeDesk: {
    email: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    location: string;
  };
  registeredOffice: {
    provisionalAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    status: "unverified" | "verified";
    internalNote: string;
  };
  registrations: {
    iec: {
      code: string;
      issuingAuthority: string;
      status: "unverified" | "verified";
    };
    gstin: {
      code: string;
      state: string;
      status: "unverified" | "verified";
    };
    apeda: {
      category: string;
      status: "unverified" | "verified";
    };
  };
  contact: {
    email: string;
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    address: {
      city: string;
      state: string;
      country: string;
      postalCode: string;
      fullProvisional: string;
      status: "unverified" | "verified";
    };
  };
  logistics: {
    maritimePorts: string[];
    sourcingRegions: string[];
  };
}

export const COMPANY: CompanyConfig = {
  brandName: "AltivonGlobal",
  legalEntityName: "ALTIVONGLOBAL",
  tagline: "Elevate · Evolve · Export",
  businessType: "Merchant Exporter",
  founder: {
    name: "Nirmit Shah",
    role: "Founder & Commercial Lead",
    status: "unverified",
  },
  tradeDesk: {
    email: "inquiry@altivonglobal.com",
    phone: "+919662243324",
    phoneFormatted: "+91 96622 43324",
    whatsapp: "+919662243324",
    location: "Vadodara, Gujarat, India",
  },
  registeredOffice: {
    provisionalAddress:
      "B/204 Govardhan 2, Near Panchmukhi Hanuman Temple, Vasna Bhayli Road, Vadodara, Gujarat, India 391410",
    city: "Vadodara",
    state: "Gujarat",
    country: "India",
    postalCode: "391410",
    status: "unverified",
    internalNote: "Legal registered address on provisional file pending physical certificate verification.",
  },
  registrations: {
    iec: {
      code: "BNAPS9308F",
      issuingAuthority: "DGFT, Ministry of Commerce & Industry, Government of India",
      status: "unverified",
    },
    gstin: {
      code: "24BNAPS9308F1Z0",
      state: "Gujarat (State Code 24)",
      status: "unverified",
    },
    apeda: {
      category: "Agricultural & Processed Food Products Export Promotion Authority",
      status: "unverified",
    },
  },
  // Backward compatibility alias
  contact: {
    email: "inquiry@altivonglobal.com",
    phone: "+919662243324",
    phoneFormatted: "+91 96622 43324",
    whatsapp: "+919662243324",
    address: {
      city: "Vadodara",
      state: "Gujarat",
      country: "India",
      postalCode: "391410",
      fullProvisional:
        "B/204 Govardhan 2, Near Panchmukhi Hanuman Temple, Vasna Bhayli Road, Vadodara, Gujarat, India 391410",
      status: "unverified",
    },
  },
  logistics: {
    maritimePorts: [
      "Nhava Sheva (JNPT Mumbai, INNSA)",
      "Mundra Port (Gujarat, INMUN)",
      "Chennai Port (Tamil Nadu, INMAA)",
    ],
    sourcingRegions: [
      "Southern Botanical Corridors (Tamil Nadu)",
      "Western Agricultural Belt (Gujarat)",
    ],
  },
};
