export interface ServiceDetailData {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introTitle: string;
  introParagraphs: string[];
  includesTitle: string;
  includes: string[];
  benefitsTitle: string;
  benefits: { lead: string; detail: string }[];
  process?: { title: string; description: string }[];
  metrics?: { label: string; value: string; note: string }[];
  faqs: { q: string; a: string }[];
  related: { name: string; desc: string; href: string }[];
  confirmationNote?: string;
}

export const SERVICE_PAGE_ORDER = [
  "medical-billing",
  "revenue-cycle-management",
  "denial-management",
  "claims-management",
  "credentialing",
  "payment-posting",
  "eligibility-verification",
  "accounts-receivable",
];

export const SERVICE_DETAILS: Record<string, ServiceDetailData> = {
  "medical-billing": {
    slug: "medical-billing",
    eyebrow: "Medical Billing",
    title: "End-to-End Medical Billing Services",
    subtitle:
      "Complete charge entry, claim submission, payment posting, and patient billing support designed to keep your revenue cycle running smoothly.",
    introTitle: "What Our Medical Billing Service Covers",
    introParagraphs: [
      "Our medical billing service handles the complete revenue cycle from charge entry through patient billing. We work with your practice to ensure claims are submitted accurately, tracked diligently, and paid promptly.",
      "Billing work is rarely the bottleneck on its own — it is usually the missing visibility. A claim that was never scrubbed, a payment that was posted to the wrong account, a balance that fell through the patient statement process. We take ownership of those handoffs so the revenue cycle behaves predictably.",
    ],
    includesTitle: "Core billing activities",
    includes: [
      "Charge entry and coding review",
      "Pre-submission claim scrubbing",
      "Electronic claim submission to all major payers",
      "Real-time claim status tracking",
      "Payment posting and reconciliation",
      "Patient statement generation and delivery",
      "Patient billing support and correspondence",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Fewer avoidable denials",
        detail:
          "Claims are reviewed before they leave the office, so common errors are caught while they are still cheap to fix.",
      },
      {
        lead: "Faster collections",
        detail:
          "Proactive status tracking and payer follow-up move claims through the adjudication cycle faster.",
      },
      {
        lead: "Transparent reporting",
        detail:
          "You see where every claim stands — submitted, pending, denied, or paid — without having to ask.",
      },
      {
        lead: "A dedicated billing team",
        detail:
          "Your practice is supported by people who know your payers, your workflows, and your volumes.",
      },
    ],
    process: [
      {
        title: "Charge Entry",
        description:
          "Services provided are documented and converted into billable charges using the appropriate CPT and HCPCS codes.",
      },
      {
        title: "Claim Scrubbing",
        description:
          "Claims are reviewed against payer-specific edits and rules before submission to reduce rejections and denials.",
      },
      {
        title: "Submission",
        description:
          "Clean claims are submitted electronically to payers through established clearinghouse connections.",
      },
      {
        title: "Tracking",
        description:
          "Claim status is monitored in real time, with follow-up actions taken on unpaid or delayed claims.",
      },
      {
        title: "Payment Posting",
        description:
          "Payments are posted and reconciled against ERA and EOB data from payers.",
      },
      {
        title: "Patient Billing",
        description:
          "Patient statements are generated and sent for any remaining balance after insurance payment.",
      },
    ],
    faqs: [
      {
        q: "How quickly are claims submitted after services are provided?",
        a: "Claims are typically submitted within 24 to 48 hours of charge entry. Exact turnaround depends on the cadence of documentation in your practice, which we map during onboarding.",
      },
      {
        q: "Do you handle patient billing as well as payer billing?",
        a: "Yes. Patient statements are generated and sent for balances that remain after insurance payment, and we handle routine correspondence with patients regarding those balances.",
      },
      {
        q: "What happens when a claim is denied?",
        a: "Denied claims are tracked, analyzed for root cause, and resubmitted with corrections where appropriate. Appeals are prepared and submitted as part of denial management.",
      },
      {
        q: "Will you work with our existing practice management system?",
        a: "Yes. Billing operations are built around your existing systems wherever possible. Integration requirements are assessed during the practice needs assessment so we can plan a realistic transition.",
      },
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "Full revenue cycle oversight from registration through final payment.",
        href: "/services/revenue-cycle-management",
      },
      {
        name: "Denial Management & Appeals",
        desc: "Denial tracking, root-cause analysis, and structured appeal workflows.",
        href: "/services/denial-management",
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Real-time eligibility checks to confirm coverage before services are rendered.",
        href: "/services/eligibility-verification",
      },
    ],
  },
  "revenue-cycle-management": {
    slug: "revenue-cycle-management",
    eyebrow: "Revenue Cycle Management",
    title: "Full Revenue Cycle Oversight",
    subtitle:
      "Complete revenue cycle management from patient registration through final payment — helping practices maintain healthy, predictable cash flow.",
    introTitle: "What Revenue Cycle Management Includes",
    introParagraphs: [
      "Revenue cycle management is the whole financial journey of a patient encounter, not a single task at the end of it. It starts at registration, where coverage and information accuracy are set, and ends when a remaining balance is resolved.",
      "We take responsibility for the whole cycle. That means the same team owns the handoffs — the eligibility check feeds the charge capture, the claim status feeds the follow-up, and the posted payment feeds the patient balance. Nothing gets dropped between functions.",
    ],
    includesTitle: "Full-cycle scope",
    includes: [
      "Patient registration support and insurance eligibility verification",
      "Charge capture, coding review, and documentation alignment",
      "Claim scrubbing, submission, and real-time status tracking",
      "Denial analysis, correction, resubmission, and appeal preparation",
      "Payment posting, ERA/EOB processing, and reconciliation",
      "Patient statements, balances, and collection follow-up",
      "Performance reporting, trend analysis, and workflow refinement",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Improved cash flow",
        detail:
          "Fewer claims stall in the adjudication cycle, and problems are surfaced while they are still inexpensive to fix.",
      },
      {
        lead: "Lower administrative burden",
        detail:
          "One team owns the full cycle, so your staff is not reconciling work that crosses department boundaries.",
      },
      {
        lead: "Revenue cycle visibility",
        detail:
          "Consistent reporting shows where money is sitting, what is blocking it, and what changed since last month.",
      },
      {
        lead: "Proactive optimization",
        detail:
          "Payer policy shifts and denial patterns are reviewed continuously rather than discovered at month end.",
      },
    ],
    process: [
      {
        title: "Intake & Eligibility",
        description:
          "Coverage is confirmed and patient details are verified before services are rendered.",
      },
      {
        title: "Charge Capture",
        description:
          "Documented services are converted into billable charges and reviewed for coding accuracy.",
      },
      {
        title: "Claim Adjudication",
        description:
          "Claims are scrubbed, submitted, and tracked through payer adjudication.",
      },
      {
        title: "Exception Handling",
        description:
          "Denials and underpayments are investigated, corrected, and appealed where appropriate.",
      },
      {
        title: "Payment Application",
        description:
          "Payments are posted, reconciled, and applied against the correct patient accounts.",
      },
      {
        title: "Patient Balance",
        description:
          "Remaining balances are billed to patients with follow-up through resolution.",
      },
      {
        title: "Performance Review",
        description:
          "Trends are analyzed and workflows are adjusted against what the data actually shows.",
      },
    ],
    faqs: [
      {
        q: "How is this different from medical billing alone?",
        a: "Medical billing is one function within the revenue cycle. Full RCM covers the work on both sides of the payer — intake, eligibility, patient balances, and reporting — with a single team accountable for the whole path.",
      },
      {
        q: "How do you measure performance?",
        a: "We report on the metrics that describe cycle health: days in A/R, clean claim rate, denial rate by reason, net collection rate, and A/R aging distribution. The exact report set is agreed during onboarding.",
      },
      {
        q: "Can RCM work alongside our in-house staff?",
        a: "Yes. Many practices use a hybrid model where we take on the high-volume or specialized pieces — denial management, A/R follow-up, or patient billing — while internal staff retain other responsibilities.",
      },
      {
        q: "How often will we receive reports?",
        a: "Reporting cadence is agreed during onboarding. Monthly performance summaries are standard, and quarterly business reviews are used to review trends and adjust workflows.",
      },
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "Charge entry, submission, posting, and patient billing support.",
        href: "/services/medical-billing",
      },
      {
        name: "Denial Management & Appeals",
        desc: "Root-cause analysis and structured recovery workflows.",
        href: "/services/denial-management",
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Electronic submission and payer-specific follow-up.",
        href: "/services/claims-management",
      },
    ],
  },
  "denial-management": {
    slug: "denial-management",
    eyebrow: "Denial Management & Appeals",
    title: "Denial Tracking, Analysis, and Appeals",
    subtitle:
      "Proactive denial management that identifies root causes, resubmits corrected claims, and works to recover revenue that was left behind.",
    introTitle: "Our Denial Management Process",
    introParagraphs: [
      "A denial is not necessarily a loss. It is a claim that was returned for a specific, usually correctable, reason. Left unmanaged, denials age into write-offs — not because the service was not rendered or not covered, but because nobody picked the work back up.",
      "Our denial management service treats denials as a workflow with owners and deadlines. Every denial is categorized, corrected at the source, resubmitted, and tracked until it is closed. The pattern analysis that comes out of that work is what prevents the same denials from recurring.",
    ],
    includesTitle: "What the service covers",
    includes: [
      "Real-time denial capture and categorization by reason code",
      "Root-cause analysis at the individual claim level",
      "Corrected claim preparation and resubmission",
      "Appeal letter drafting and payer submission",
      "Payer follow-up and escalation where a first appeal is not enough",
      "Timely filing and appeal deadline monitoring",
      "Denial trend reporting and prevention recommendations",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Recovered revenue",
        detail:
          "Denials are worked rather than filed away, so billable work that was already performed gets paid.",
      },
      {
        lead: "Fewer repeat denials",
        detail:
          "Pattern analysis identifies the workflow gaps behind repeat reason codes and fixes them upstream.",
      },
      {
        lead: "Consistent appeal quality",
        detail:
          "Standardized appeal construction means the argument is well-supported every time, not improvised under deadline pressure.",
      },
      {
        lead: "Deadline confidence",
        detail:
          "Timely filing and appeal windows are tracked so a deadline is never missed for administrative reasons.",
      },
    ],
    process: [
      {
        title: "Capture & Categorize",
        description:
          "Denied claims are pulled from remittance data and sorted by reason code and payer.",
      },
      {
        title: "Analyze",
        description:
          "Each denial is reviewed to determine the actual cause — coding, authorization, eligibility, or documentation.",
      },
      {
        title: "Correct & Resubmit",
        description:
          "Corrected claims are prepared and resubmitted where a corrected claim is the right path.",
      },
      {
        title: "Appeal",
        description:
          "Where a clinical or contractual argument applies, an appeal is drafted with supporting documentation and submitted.",
      },
      {
        title: "Follow Up",
        description:
          "Outstanding denials are followed up with payers and escalated when a response is overdue.",
      },
      {
        title: "Prevent",
        description:
          "Recurring patterns are reported with recommended workflow changes to reduce future denials.",
      },
    ],
    faqs: [
      {
        q: "Which denials are worth appealing?",
        a: "Not all denials are worth the effort. We work each one to determine whether the claim was actually billable and payable, then prioritize accordingly — so effort goes to the denials with real recovery potential.",
      },
      {
        q: "Do you write the appeal letters?",
        a: "Yes. We prepare the appeal content, including the clinical and contractual rationale, and coordinate submission to the payer.",
      },
      {
        q: "What do you need from our practice to work a denial?",
        a: "Access to the relevant clinical documentation and the remittance information for the claim. The specific requirements are confirmed during onboarding and vary by payer.",
      },
      {
        q: "How do you report on denial performance?",
        a: "We report denial volume and value by reason code and payer, resolution rates, and average time to resolution — with notes on what is driving the pattern.",
      },
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "Full-cycle oversight that includes denials as a core function.",
        href: "/services/revenue-cycle-management",
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Cleaner claims mean fewer denials to work in the first place.",
        href: "/services/claims-management",
      },
      {
        name: "Payment Posting & Reconciliation",
        desc: "Accurate posting and reconciliation from remittance data.",
        href: "/services/payment-posting",
      },
    ],
  },
  "claims-management": {
    slug: "claims-management",
    eyebrow: "Claims Submission & Tracking",
    title: "Electronic Claims Management",
    subtitle:
      "Electronic claims submission, real-time status tracking, and payer-specific follow-up that keeps claims moving toward payment.",
    introTitle: "What Our Claims Management Covers",
    introParagraphs: [
      "Most claim problems are visible long before the money is actually late. A claim that was rejected at the front door, one that was never acknowledged, one that has been sitting in a payer queue — each of these is a delay that shows up weeks later as an aging balance.",
      "Claims management is the discipline of watching that queue. We submit electronically, confirm that payers actually received what we sent, track status to resolution, and act on the claims that stall instead of waiting for the aging report to flag them.",
    ],
    includesTitle: "Submission and tracking scope",
    includes: [
      "Electronic claims submission through established clearinghouse connections",
      "Pre-submission scrubbing against payer-specific edits",
      "Clearinghouse acknowledgement and rejection monitoring",
      "Real-time claim status tracking across payer systems",
      "Unacknowledged and rejected claim recovery",
      "Payer-specific follow-up protocols for stalled claims",
      "Submission and acknowledgment reporting",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Faster reimbursement",
        detail:
          "Electronic submission removes the mail-handling delay that still affects a meaningful share of claims.",
      },
      {
        lead: "Fewer front-door rejections",
        detail:
          "Rejected claims are caught at the clearinghouse and corrected immediately rather than aged out.",
      },
      {
        lead: "Real-time status visibility",
        detail:
          "You can see which claims are acknowledged, in adjudication, or needing attention.",
      },
      {
        lead: "Proactive follow-up",
        detail:
          "Payer follow-up happens on a defined cadence, not when a report surfaces a problem.",
      },
    ],
    process: [
      {
        title: "Scrub",
        description:
          "Claims are checked against payer edits and rules before submission.",
      },
      {
        title: "Submit",
        description:
          "Clean claims are transmitted electronically through the clearinghouse.",
      },
      {
        title: "Confirm",
        description:
          "Clearinghouse acknowledgements are monitored and rejections are corrected and re-sent.",
      },
      {
        title: "Track",
        description:
          "Claim status is tracked through payer adjudication in real time.",
      },
      {
        title: "Follow Up",
        description:
          "Claims that stall beyond expected timelines are worked with the payer directly.",
      },
      {
        title: "Report",
        description:
          "Submission volumes, rejection rates, and aging patterns are reported for review.",
      },
    ],
    faqs: [
      {
        q: "Which payers do you submit to?",
        a: "We submit through clearinghouse connections that cover the major national and regional payers your practice works with. Your specific payer mix is confirmed during the practice needs assessment.",
      },
      {
        q: "How do you handle claims rejected at the clearinghouse?",
        a: "Rejected claims are returned to the queue for correction and resubmitted. Rejection reasons are also analyzed in aggregate, because a repeated rejection usually points to a fixable configuration issue.",
      },
      {
        q: "What does real-time tracking actually mean in practice?",
        a: "Claim status is checked against payer responses throughout the day rather than in a single end-of-day batch. When a claim deviates from the expected path, it is picked up rather than left to age.",
      },
      {
        q: "Can you work with our existing clearinghouse?",
        a: "In many cases, yes. Where a payer or configuration requires a different approach, we will explain the reason and the implications during the needs assessment.",
      },
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "The full billing workflow that submission sits inside.",
        href: "/services/medical-billing",
      },
      {
        name: "Denial Management & Appeals",
        desc: "What happens once a claim comes back denied.",
        href: "/services/denial-management",
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Confirming coverage before a claim is created.",
        href: "/services/eligibility-verification",
      },
    ],
  },
  "credentialing": {
    slug: "credentialing",
    eyebrow: "Medical Credentialing",
    title: "Provider Enrollment & Credentialing",
    subtitle:
      "Provider enrollment and credentialing support with insurance payers. Service availability is subject to business confirmation.",
    introTitle: "Credentialing Support",
    introParagraphs: [
      "Credentialing determines whether a provider can bill a payer at all. It is paperwork-heavy, deadline-driven, and easy to let slip between competing administrative priorities — particularly as a practice grows and new payers are added.",
      "We offer support with provider enrollment and credentialing to reduce that administrative load and keep applications moving.",
    ],
    includesTitle: "Potential support scope",
    includes: [
      "Provider enrollment applications and payer-specific forms",
      "Credentialing packet preparation and document assembly",
      "Verification calls and payer follow-up",
      "Tracking of application status and outstanding items",
      "Re-credentialing and re-enrollment cycles",
      "Maintenance of credentialing status records",
    ],
    benefitsTitle: "Potential benefits",
    benefits: [
      {
        lead: "Faster enrollment",
        detail:
          "Complete, accurate applications move through payer review with fewer avoidable delays.",
      },
      {
        lead: "Less internal administrative load",
        detail:
          "Follow-up and document tracking are handled off the practice's plate.",
      },
      {
        lead: "Continuity",
        detail:
          "Re-credentialing cycles are tracked so participation does not lapse unnoticed.",
      },
      {
        lead: "Clear status visibility",
        detail:
          "You know where each application stands and what is still outstanding.",
      },
    ],
    confirmationNote:
      "Credentialing service availability is subject to business confirmation. Please contact us to confirm whether this service is offered for your specialty, payer mix, and location before relying on it.",
    faqs: [
      {
        q: "Is credentialing currently offered?",
        a: "This offering is marked as requiring business confirmation. Reach out to our team and we will confirm availability for your specific situation.",
      },
      {
        q: "Which payers do you work with for enrollment?",
        a: "Payer coverage for credentialing depends on the service being confirmed. Your payer mix is reviewed as part of the needs assessment.",
      },
      {
        q: "What do you need from us to start?",
        a: "Provider demographic details, licensure and credentialing documentation, and the payer enrollment applications to be completed. The specific checklist is provided once the scope is confirmed.",
      },
      {
        q: "How long does credentialing take?",
        a: "Timelines vary substantially by payer and can range from weeks to several months. We will set expectations for each payer during the assessment rather than quoting a single figure.",
      },
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "The broader financial operations that credentialing supports.",
        href: "/services/revenue-cycle-management",
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Confirming active coverage once a provider is enrolled.",
        href: "/services/eligibility-verification",
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Submitting claims once enrollment is in place.",
        href: "/services/claims-management",
      },
    ],
  },
  "payment-posting": {
    slug: "payment-posting",
    eyebrow: "Payment Posting & Reconciliation",
    title: "Accurate Payment Posting and Reconciliation",
    subtitle:
      "Precise posting of payer and patient payments against the right accounts, with reconciliation that surfaces what was missed.",
    introTitle: "What Payment Posting Covers",
    introParagraphs: [
      "Posting is where a claim becomes money. If a payment is posted to the wrong account, deferred, or never applied, the practice still performed the work and the payer still paid — but the balance does not close, and it quietly ages.",
      "We post systematically against remittance data and reconcile deposits against what actually arrived. Discrepancies are identified and resolved rather than absorbed into the aging report.",
    ],
    includesTitle: "Posting and reconciliation scope",
    includes: [
      "ERA and EOB interpretation and claim-level payment application",
      "Patient payment posting including copays, deductibles, and adjustments",
      "Adjustment and write-off processing per contractual terms",
      "Bank deposit reconciliation against remittance and payment records",
      "Variance identification between expected and actual payer payment",
      "Unapplied cash and suspense resolution",
      "Posted payment reporting and audit trails",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Balances that close accurately",
        detail:
          "Payments land on the right accounts, so completed work is reflected in your revenue.",
      },
      {
        lead: "Recovered underpayments",
        detail:
          "Contract variances are identified instead of being written off automatically.",
      },
      {
        lead: "No unapplied cash sitting idle",
        detail:
          "Suspense balances are worked and cleared rather than accumulating.",
      },
      {
        lead: "A reliable audit trail",
        detail:
          "Every posting and adjustment is traceable, which matters when questions come up later.",
      },
    ],
    faqs: [
      {
        q: "Which remittance formats do you process?",
        a: "We work from electronic remittance advice and paper explanation of benefits documents, with the formats confirmed against what your payers actually send you.",
      },
      {
        q: "How do you handle underpayments?",
        a: "Payments below the contracted amount are flagged, investigated against the payer's fee schedule, and appealed or adjusted as appropriate.",
      },
      {
        q: "Can you post into our existing practice management system?",
        a: "Posting is performed within the systems you already use wherever possible. Requirements are assessed during onboarding.",
      },
      {
        q: "How is reconciliation different from posting?",
        a: "Posting assigns money to accounts. Reconciliation confirms that the money you received matches what the payer said it sent — and that every dollar was applied.",
      },
    ],
    related: [
      {
        name: "Accounts Receivable Follow-up",
        desc: "Working outstanding balances across the aging report.",
        href: "/services/accounts-receivable",
      },
      {
        name: "Denial Management & Appeals",
        desc: "Recovering amounts that were never paid in the first place.",
        href: "/services/denial-management",
      },
      {
        name: "Medical Billing",
        desc: "The full billing workflow posting sits inside.",
        href: "/services/medical-billing",
      },
    ],
  },
  "eligibility-verification": {
    slug: "eligibility-verification",
    eyebrow: "Insurance Eligibility Verification",
    title: "Eligibility Verification Before Services Are Rendered",
    subtitle:
      "Real-time eligibility checks that confirm coverage, benefits, and patient responsibility before a service is provided.",
    introTitle: "Why Verification Matters",
    introParagraphs: [
      "Coverage that was not active on the date of service cannot be made active retroactively in most situations. Verification performed after the visit is a report on what happened; verification performed before it is a chance to change what happens.",
      "We confirm benefits, coverage status, copay and deductible amounts, and any referral or authorization requirements before the appointment — while there is still time to act on the information.",
    ],
    includesTitle: "What verification covers",
    includes: [
      "Real-time eligibility checks through payer connectivity",
      "Coverage status and effective date confirmation",
      "Copay, coinsurance, and deductible amount retrieval",
      "Referral and prior authorization requirement identification",
      "Coordination of benefits determination for secondary payers",
      "Out-of-pocket estimate communication to patients",
      "Verification exception escalation",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Fewer surprises for patients",
        detail:
          "Responsibility amounts are known before the visit, not after the bill arrives.",
      },
      {
        lead: "Reduced claim denials",
        detail:
          "Coverage and authorization issues are caught before the claim is built.",
      },
      {
        lead: "Better patient experience",
        detail:
          "Verification conversations happen at scheduling, when they are useful.",
      },
      {
        lead: "Secondary payer clarity",
        detail:
          "Coordination of benefits is settled before services are rendered.",
      },
    ],
    faqs: [
      {
        q: "When is verification performed?",
        a: "Verification is performed before the appointment wherever the schedule allows, and the same day for visits booked close to the service date.",
      },
      {
        q: "How are verification results delivered to staff?",
        a: "Results are delivered into your existing workflow so front desk and clinical staff can see status without checking a separate system.",
      },
      {
        q: "What happens when eligibility cannot be confirmed?",
        a: "The exception is escalated to a specialist who works the payer directly and updates the record so staff can advise the patient accurately.",
      },
      {
        q: "Does verification replace authorization?",
        a: "No. Verification confirms coverage; prior authorization is a separate payer requirement. Our verification identifies where authorization is needed so it can be obtained in time.",
      },
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "The billing workflow verification protects.",
        href: "/services/medical-billing",
      },
      {
        name: "Revenue Cycle Management",
        desc: "Full-cycle oversight including intake and eligibility.",
        href: "/services/revenue-cycle-management",
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Submitting claims with accurate coverage information.",
        href: "/services/claims-management",
      },
    ],
  },
  "accounts-receivable": {
    slug: "accounts-receivable",
    eyebrow: "Accounts Receivable Follow-up",
    title: "Proactive Accounts Receivable Follow-up",
    subtitle:
      "Structured A/R review, payer follow-up, and patient balance management that works the aging report instead of reporting on it.",
    introTitle: "What A/R Follow-Up Covers",
    introParagraphs: [
      "An aging report is a snapshot. It tells you what is outstanding and how old it is, but by itself it does not do anything about the balances in it. A/R follow-up is the active work of closing those balances — and the discipline of doing it before they become write-offs.",
      "We work the aging report on a defined cadence, sorting balances by age, payer, and probability of collection, then taking the right action on each: payer follow-up, claim correction, appeal, or patient contact.",
    ],
    includesTitle: "A/R follow-up scope",
    includes: [
      "Regular A/R aging review and balance prioritization",
      "Payer follow-up on outstanding insurance balances",
      "Patient balance follow-up and statement delivery",
      "Claim status correction and resubmission as needed",
      "Coordination between denial management and collections activity",
      "Escalation of high-value or aged balances",
      "A/R performance reporting and reduction recommendations",
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Balances worked, not just reported",
        detail:
          "The aging report becomes a work queue with owners rather than a monthly document.",
      },
      {
        lead: "Earlier intervention",
        detail:
          "Balances are addressed while they are still recoverable and before they age into write-off.",
      },
      {
        lead: "Prioritized effort",
        detail:
          "High-value and high-probability balances get attention first, so effort is not spread thin.",
      },
      {
        lead: "Clear write-off decisions",
        detail:
          "Balances that genuinely cannot be collected are identified and processed deliberately.",
      },
    ],
    faqs: [
      {
        q: "How often is the A/R reviewed?",
        a: "Review cadence is agreed during onboarding and depends on volume. Higher-volume practices are typically worked on a tighter cycle.",
      },
      {
        q: "Does A/R follow-up include patient balances?",
        a: "Yes. Patient statement delivery and patient balance follow-up are included alongside payer follow-up.",
      },
      {
        q: "How do you decide what to write off?",
        a: "Balances are reviewed individually against payer and patient contact history. Write-off decisions are made deliberately and reported, rather than defaulting to whatever has aged past a threshold.",
      },
      {
        q: "Can we see the A/R status at any time?",
        a: "Status reporting is part of the standard reporting cadence and can be structured to match how your practice reviews financials.",
      },
    ],
    related: [
      {
        name: "Payment Posting & Reconciliation",
        desc: "Accurate posting so balances close correctly in the first place.",
        href: "/services/payment-posting",
      },
      {
        name: "Denial Management & Appeals",
        desc: "Recovering balances that require a payer appeal.",
        href: "/services/denial-management",
      },
      {
        name: "Revenue Cycle Management",
        desc: "The full-cycle context for A/R performance.",
        href: "/services/revenue-cycle-management",
      },
    ],
  },
};
