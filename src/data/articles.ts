export interface ArticleSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  disclaimer: string;
  sections: ArticleSection[];
}

export const ARTICLES: Record<string, Article> = {
  "medical-billing-basics": {
    slug: "medical-billing-basics",
    title: "Medical Billing Basics",
    category: "Guides",
    readTime: "6 min read",
    summary:
      "A plain-language introduction to how medical billing works — from the encounter to the remittance.",
    disclaimer:
      "This article is general educational information for healthcare professionals. It is not legal, financial, or reimbursement advice, and it does not replace guidance from your payers, your compliance team, or your own counsel.",
    sections: [
      {
        heading: "What medical billing actually does",
        body: [
          "Medical billing is the process of turning a documented patient encounter into a payment. The work sits between clinical documentation and the payer, and its job is to make sure the two sides match — that the service that was performed is the service that was billed, and that it is billed in the format the payer will accept.",
          "When that process is clean, claims are paid on the first pass. When it is not, the cost shows up three ways: staff time spent reworking claims, delay before the money arrives, and balances that age out and are eventually written off.",
        ],
      },
      {
        heading: "The four things a biller does",
        body: [
          "Most billing workflows collapse into four distinct responsibilities, and it helps to be able to name them.",
        ],
        list: [
          "Charge capture and coding — turning the clinical record into billable line items using the appropriate CPT, HCPCS, and ICD-10 codes.",
          "Claim assembly and submission — building the claim in the format the payer requires and transmitting it electronically or on paper.",
          "Follow-up — tracking what happened to the claim after submission, and acting on rejections, denials, and non-responses.",
          "Payment posting and patient balance — applying what was paid against the right account and billing the patient what remains.",
        ],
      },
      {
        heading: "Where practices lose money",
        body: [
          "Revenue loss in medical billing is rarely a single dramatic failure. It accumulates in small, ordinary ways that nobody is measuring closely enough to catch.",
        ],
        list: [
          "Documentation that does not support the code that was billed. If the record does not describe the service, the claim is exposed to denial no matter how correct the coding was.",
          "Eligibility gaps. Coverage that was not active on the date of service rarely can be made active retroactively.",
          "Unworked denials. A denial that nobody picks up is functionally a write-off, even if the balance still shows as open.",
          "Underpayments. Contract variances are frequently posted out without anyone comparing them to the fee schedule.",
          "Authorization and referral requirements that were never checked before the service was rendered.",
        ],
      },
      {
        heading: "The metrics worth watching",
        body: [
          "A practice does not need a large reporting operation to see whether its billing function is working. A short set of measures covers most of it.",
        ],
        list: [
          "Clean claim rate — the share of claims accepted without rework on first submission.",
          "Days in accounts receivable — how long it takes for a billed service to become collected cash.",
          "Denial rate by reason — where rejections are concentrated, which tells you what to fix first.",
          "Net collection rate — the share of what was actually billed that was actually collected.",
          "A/R aging distribution — how much of the outstanding balance is still recoverable and how quickly it is being worked.",
        ],
      },
      {
        heading: "What good looks like",
        body: [
          "A well-run billing function is boring, which is the point. Claims go out on a predictable cadence, rejections are caught and corrected the same day, denials are worked on a schedule, and the aging report is used as a work queue rather than a monthly document that gets filed away.",
          "If your team is spending significant time reworking claims, chasing status, or correcting patient statements, that is a workflow problem rather than a staffing problem. Fixing the workflow is usually cheaper than adding headcount to absorb it.",
        ],
      },
    ],
  },

  "understanding-claim-denials": {
    slug: "understanding-claim-denials",
    title: "Understanding Claim Denials",
    category: "Guides",
    readTime: "7 min read",
    summary:
      "Why claims get denied, what the common reason codes actually mean, and how practices respond effectively.",
    disclaimer:
      "This article is general educational information for healthcare professionals. Reason codes, appeal windows, and payer rules vary and change. Verify specifics against your payer contracts and current guidance, and consult your compliance or legal team before acting on any of this material.",
    sections: [
      {
        heading: "Denial, rejection, and the difference that matters",
        body: [
          "A rejection is a technical refusal — the claim never reached the payer's adjudication system. Something was missing or malformed: no diagnosis code, invalid modifier, missing member identifier, a claim that did not pass a front-end edit. Rejected claims are relatively easy to fix, because the payer has told you exactly what was wrong.",
          "A denial is different. The claim was adjudicated, and the payer has decided it will not pay it as submitted. Denials are what most practices mean when they talk about denials, and they require actual analysis — reading the remittance, understanding the reason, and determining the right response.",
        ],
      },
      {
        heading: "Common denial categories",
        body: [
          "Denial reasons cluster into a few families. Knowing which family a denial belongs to tells you who needs to act on it.",
        ],
        list: [
          "Coverage and eligibility — coverage was not active on the date of service, the member was not found, or the service was not a covered benefit under the plan.",
          "Authorization and referral — a required prior authorization was absent, expired, or did not match the service billed.",
          "Coding and medical necessity — the diagnosis did not support the procedure, the modifier was incorrect, or a higher level of service was billed than was documented.",
          "Duplicate and bundling — the payer considered the claim a duplicate, or that a code should have been bundled into a related line.",
          "Coordination of benefits — the payer was not the primary payer, and the claim was processed against the wrong payer.",
          "Contract and fee schedule — the billed amount exceeded the contracted rate, or the service was not in the agreement.",
        ],
      },
      {
        heading: "The two clocks that matter",
        body: [
          "Most denials carry a filing deadline and, separately, an appeal deadline. They are different deadlines, they are often different lengths, and missing one is frequently what turns a recoverable denial into a write-off.",
        ],
        list: [
          "The corrected claim window — usually longer, and allows a claim to be resubmitted with the correction rather than formally appealed.",
          "The appeal window — usually shorter, and used when the claim itself was correct and the payer\'s determination is disputed.",
        ],
      },
      {
        heading: "Choosing a response",
        body: [
          "Not every denial deserves an appeal. Working one that cannot succeed consumes effort that would be better spent on claims with real recovery potential. A useful triage asks three questions: was the service actually rendered, was it actually billable, and was the claim correct as submitted?",
          "If the answer to the first two is no, the denial is correct and should be written off cleanly rather than appealed. If the claim was correct, the denial is worth challenging within the window.",
        ],
      },
      {
        heading: "Prevention beats recovery",
        body: [
          "Every denial represents work that was performed and then had to be undone. The more valuable measure is not how many denials you recovered, but how many you never generated.",
          "Denial reasons are highly concentrated. A practice that reviews denials by reason code each month will usually find that a small number of categories account for most of the loss — a missing authorization step, an inconsistent modifier, a documentation gap for one particular service. Those are workflow problems, and they are fixable at the source.",
        ],
      },
    ],
  },

  "revenue-cycle-management": {
    slug: "revenue-cycle-management",
    title: "Revenue Cycle Management Explained",
    category: "Guides",
    readTime: "8 min read",
    summary:
      "A complete walkthrough of the revenue cycle — the seven stages between a scheduled visit and a collected balance.",
    disclaimer:
      "This article is general educational information for healthcare professionals. It is not legal, financial, or reimbursement advice. Benchmarks and best practices vary by specialty, payer mix, and practice size.",
    sections: [
      {
        heading: "What revenue cycle management covers",
        body: [
          "Revenue cycle management is the management of everything that happens to a patient balance between the moment a service is scheduled and the moment the last dollar is collected. It is a broader discipline than medical billing, because it includes the work on both sides of the payer — intake and patient balances, not just claims.",
          "Practices typically adopt it in one of two ways: as a complete outsourced function, or as a hybrid where internal staff keep some responsibilities and an external team takes the high-volume or specialized pieces.",
        ],
      },
      {
        heading: "The seven stages",
        body: [
          "The cycle is usually described as a sequence. Each stage has its own failure modes, and most of them compound.",
        ],
        list: [
          "Registration and scheduling — the patient's information is captured accurately and the visit is on the schedule.",
          "Eligibility and benefits verification — coverage is confirmed as active, and responsibility amounts and authorization requirements are identified.",
          "Charge capture — the documented encounter is converted into billable charges by someone who understands both the clinical record and the coding rules.",
          "Claim assembly and submission — the claim is built to payer specification, scrubbed, and transmitted.",
          "Adjudication and follow-up — the claim is tracked, and rejections, denials, and non-responses are worked actively.",
          "Payment posting and reconciliation — money received is applied to the right accounts, and variances are caught.",
          "Patient balance and collection — what remains is billed to the patient, followed up, and resolved or written off deliberately.",
        ],
      },
      {
        heading: "Why handoffs are the real risk",
        body: [
          "Most revenue problems are not caused by a stage failing outright. They happen in the gaps between stages — a verification result that never reaches the person building the claim, a payment posted to the wrong account, a denial that sits in a queue nobody owns.",
          "The practical conclusion is that the model matters more than the tooling. A practice with a clean process and a modest toolset will usually outperform one with sophisticated software and unclear ownership.",
        ],
      },
      {
        heading: "Choosing what to outsource",
        body: [
          "The right split depends on where the pain actually is, which is usually not where the practice assumes it is.",
        ],
        list: [
          "If claims are being rejected and reworked, the problem is likely upstream in coding and documentation alignment — outsourcing claim submission alone will not fix it.",
          "If denials are not being worked, the highest-leverage engagement is denial management and appeals.",
          "If patient balances are not being collected, the gap is in statements and follow-up rather than payer-side work.",
          "If nobody can say where the money is sitting, the first step is reporting, not outsourcing — a team needs visibility before it can be held accountable.",
        ],
      },
      {
        heading: "The reporting that makes it manageable",
        body: [
          "Full RCM should come with a defined reporting cadence, not just a service. The measures that matter most are days in A/R, clean claim rate, denial rate by reason, net collection rate, and A/R aging distribution.",
          "The reason to insist on these is that they describe the system rather than the effort. Activity metrics — claims touched, calls made — are easy to inflate and hard to interpret. Cycle measures are slower to move and much more useful for deciding what to change.",
        ],
      },
    ],
  },
};

export const ARTICLE_ORDER = [
  "medical-billing-basics",
  "understanding-claim-denials",
  "revenue-cycle-management",
];
