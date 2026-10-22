export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "What is revenue cycle management?",
    answer: "Revenue cycle management (RCM) is the financial process that healthcare providers use to track patient care episodes from registration and appointment scheduling to the final payment of a balance. It includes charge capture, claim submission, payment posting, denial management, and patient billing.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "Does NexaRCM collect protected health information through this website?",
    answer: "No. Our marketing website collects business inquiry information only, such as your name, practice name, email, and phone number. We do not collect patient names, medical records, diagnoses, dates of birth, insurance member IDs, or claim documents through this site.",
    category: "privacy",
  },
  {
    id: "faq-3",
    question: "Is NexaRCM HIPAA-compliant?",
    answer: "We do not claim HIPAA compliance simply because we use HTTPS or have a privacy policy. If you engage us for billing services, we will provide details about our security practices and compliance posture separately. This website is a marketing site and does not process protected health information.",
    category: "privacy",
  },
  {
    id: "faq-4",
    question: "What specialties does NexaRCM support?",
    answer: "We support a range of specialties including primary care, cardiology, orthopedics, mental health, dermatology, urgent care, and multispecialty practices. Specialty availability is subject to business confirmation - please contact us to confirm support for your specific specialty.",
    category: "services",
  },
  {
    id: "faq-5",
    question: "How do I get started?",
    answer: "Request a consultation or submit a quote request through our contact or quote pages. We will review your practice needs and discuss next steps. No protected health information is needed for the initial inquiry.",
    category: "getting-started",
  },
  {
    id: "faq-6",
    question: "Does NexaRCM guarantee revenue increases?",
    answer: "No. We do not make unsupported guarantees about revenue increases or specific financial outcomes. Our services are designed to support efficient billing and claims workflows, but actual results depend on many factors including payer mix, practice volume, and existing processes.",
    category: "services",
  },
  {
    id: "faq-7",
    question: "How long does onboarding take?",
    answer: "Onboarding timelines vary by practice size and complexity. After your initial consultation, we will provide a tailored onboarding plan with estimated timelines.",
    category: "onboarding",
  },
  {
    id: "faq-8",
    question: "What happens if a claim is denied?",
    answer: "Denied claims are tracked, analyzed for root cause, and resubmitted with corrections when appropriate. Our denial management service includes appeal letter preparation and payer follow-up.",
    category: "services",
  },
];
