export interface Service {
  id: string;
  name: string;
  summary: string;
  icon: string;
  confirmed: boolean; // true if business confirms they offer this service
  href: string;
}

export const SERVICES: Service[] = [
  {
    id: "medical-billing",
    name: "Medical Billing",
    summary: "End-to-end medical billing services including charge entry, claim submission, payment posting, and patient billing support.",
    icon: "FileText",
    confirmed: true,
    href: "/services/medical-billing",
  },
  {
    id: "revenue-cycle-management",
    name: "Revenue Cycle Management",
    summary: "Full revenue cycle oversight from patient registration through final payment, helping practices maintain healthy cash flow.",
    icon: "Activity",
    confirmed: true,
    href: "/services/revenue-cycle-management",
  },
  {
    id: "denial-management",
    name: "Denial Management & Appeals",
    summary: "Denial tracking, root-cause analysis, appeal letter preparation, and resubmission workflows.",
    icon: "ShieldAlert",
    confirmed: true,
    href: "/services/denial-management",
  },
  {
    id: "claims-management",
    name: "Claims Submission & Tracking",
    summary: "Electronic claims submission, real-time status tracking, and payer-specific follow-up.",
    icon: "Send",
    confirmed: true,
    href: "/services/claims-management",
  },
  {
    id: "payment-posting",
    name: "Payment Posting & Reconciliation",
    summary: "Accurate payment posting, ERA/EOB processing, and bank reconciliation.",
    icon: "CreditCard",
    confirmed: true,
    href: "/services/payment-posting",
  },
  {
    id: "eligibility-verification",
    name: "Insurance Eligibility Verification",
    summary: "Real-time eligibility checks to confirm patient coverage before services are rendered.",
    icon: "CheckCircle",
    confirmed: true,
    href: "/services/eligibility-verification",
  },
  {
    id: "credentialing",
    name: "Medical Credentialing",
    summary: "Provider enrollment and credentialing support with insurance payers. Service availability subject to business confirmation.",
    icon: "UserCheck",
    confirmed: false,
    href: "/services/credentialing",
  },
  {
    id: "accounts-receivable",
    name: "Accounts Receivable Follow-up",
    summary: "Proactive A/R aging review, payer follow-up, and patient statement management.",
    icon: "Clock",
    confirmed: true,
    href: "/services/accounts-receivable",
  },
];
