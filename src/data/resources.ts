export interface Resource {
  id: string;
  title: string;
  summary: string;
  category: string;
  href: string;
}

export const RESOURCES: Resource[] = [
  {
    id: "medical-billing-basics",
    title: "Medical Billing Basics",
    summary: "An introduction to medical billing concepts including charge entry, claims submission, and patient statements.",
    category: "guides",
    href: "/resources/medical-billing-basics",
  },
  {
    id: "understanding-claim-denials",
    title: "Understanding Claim Denials",
    summary: "Common reasons for claim denials and how practices can respond effectively.",
    category: "guides",
    href: "/resources/understanding-claim-denials",
  },
  {
    id: "revenue-cycle-management",
    title: "Revenue Cycle Management Explained",
    summary: "A guide to the revenue cycle from patient registration through final payment.",
    category: "guides",
    href: "/resources/revenue-cycle-management",
  },
];
