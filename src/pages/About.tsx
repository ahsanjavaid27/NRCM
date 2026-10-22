import { ArrowRight } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import "./About.css";

const VALUES = [
  {
    title: "Clarity over claims",
    body: "We describe what we do, what we do not do, and what we need from you. If a part of your revenue cycle needs someone else, we will say so rather than stretch the scope of an agreement.",
  },
  {
    title: "Measure before changing",
    body: "Every workflow change starts with understanding the current state. We would rather spend a week looking at the data than a month optimising the wrong thing.",
  },
  {
    title: "Prevention before recovery",
    body: "Recovering a denied claim is more expensive than preventing it. We spend most of our effort upstream of submission, where the cost of correction is lowest.",
  },
  {
    title: "Documentation as a deliverable",
    body: "Process notes, decision logs, and reporting are part of the work, not an extra. You should never have to guess why something was done a particular way.",
  },
  {
    title: "Respect for clinical judgment",
    body: "Billing decisions touch clinical records. We work within the documentation as recorded and defer to clinical staff on clinical questions.",
  },
  {
    title: "Reliable communication",
    body: "A named point of contact, a defined response time, and no surprises. If something slips, you hear about it from us before you notice it in a report.",
  },
];

const COMMITMENTS = [
  {
    title: "Quality",
    points: [
      "Multi-layer review before claims are released",
      "Sample audits of posted payments and adjustments",
      "Denial trend analysis feeding back into upstream workflows",
      "Payer rule changes monitored and reflected in the process",
    ],
  },
  {
    title: "Communication",
    points: [
      "A named account contact for your practice",
      "A regular reporting cadence agreed at onboarding",
      "Escalation path for anything time-sensitive",
      "Written summaries of decisions that affect your revenue",
    ],
  },
  {
    title: "Security",
    points: [
      "Encrypted transmission for anything sent or received",
      "Role-based access to practice and billing data",
      "Access limited to personnel working on your account",
      "Documented handling procedures for incoming documentation",
    ],
  },
];

/**
 * Placeholder team profiles.
 * Replace the entries below with confirmed team information. Until the business
 * confirms names, titles, and credentials, these are shown as functional roles
 * rather than individuals.
 */
const TEAM = [
  {
    role: "Leadership",
    focus: "Service scope, pricing, and account ownership",
    detail: "Responsible for what is delivered and what is not.",
  },
  {
    role: "Billing operations",
    focus: "Charge entry, coding review, and claim submission",
    detail: "Holds day-to-day responsibility for the claim pipeline.",
  },
  {
    role: "Denial and A/R",
    focus: "Denial analysis, appeals, and balance follow-up",
    detail: "Works the accounts that require judgment and persistence.",
  },
  {
    role: "Quality and compliance",
    focus: "Audit, payer policy, and process integrity",
    detail: "Checks that the work holds up on its own merits.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
          <SectionHeading
            eyebrow="About NexaRCM"
            title="A billing partner, not a claims black box"
            subtitle="We are a revenue cycle management company built around a simple idea: practices do better when the billing function is operated deliberately and the people running it can explain every decision."
          />
        </div>
      </header>

      {/* Mission */}
      <section className="section section--tint">
        <div className="container">
          <div className="mission">
            <div className="mission__label">
              <p className="eyebrow text-accent">Our mission</p>
            </div>
            <div className="mission__body">
              <p className="mission__statement">
                To give independent medical practices the same level of financial
                discipline that large health systems invest in — without the
                overhead, the reporting lag, or the loss of visibility that comes
                with it.
              </p>
              <p className="mission__detail">
                We take responsibility for the full revenue cycle, document what we
                do, and report on outcomes in terms a practice administrator can
                act on. Where a problem sits outside our scope, we say so early
                rather than late.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="story">
            <div>
              <p className="eyebrow text-accent">Our story</p>
              <h2 className="h2 story__title">
                Started with the same problem our clients have
              </h2>
            </div>
            <div className="story__body">
              <p>
                This section is a placeholder for the business&apos;s own origin
                story. It exists so the page structure is complete and the final
                copy can be written into it without touching the layout.
              </p>
              <p>
                <span className="story__placeholder">
                  <strong>To be completed:</strong> the founding story, the
                  circumstances that led to the company, and the reasoning behind
                  the operating model described elsewhere on this page.
                </span>
              </p>
              <p>
                We would rather leave a clearly marked gap than fill it with a
                narrative that has not been confirmed by the business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Values"
            title="Operating principles"
            subtitle="These are the standards we hold the work to. They are written as principles rather than slogans because each one changes what we do day to day."
          />
          <div className="values">
            {VALUES.map((value) => (
              <article key={value.title} className="value">
                <h3 className="h4 value__title">{value.title}</h3>
                <p className="value__body">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container">
          <div className="approach-grid">
            <div className="approach-grid__intro">
              <p className="eyebrow text-accent">Service approach</p>
              <h2 className="h2">How the work is structured</h2>
              <p className="lead">
                The same sequence applies whether you engage us for one function
                or the whole cycle. Scope changes; discipline does not.
              </p>
            </div>
            <ol className="approach-grid__list">
              {[
                {
                  title: "We start with your data, not our pitch",
                  body: "The practice needs assessment examines claims, denials, A/R, and payer mix before we propose anything. If the data does not support a change, we do not recommend it.",
                },
                {
                  title: "We integrate rather than replace",
                  body: "Billing operations are built around the practice management and EHR systems you already run wherever possible. Replacing working infrastructure is rarely the answer.",
                },
                {
                  title: "We assign ownership",
                  body: "Every function has a named owner and a defined handoff. Work does not sit in a queue because nobody was sure whose turn it was.",
                },
                {
                  title: "We report on the cycle, not the effort",
                  body: "Days in A/R, clean claim rate, denial reasons, and collection performance. Activity numbers are easy to produce and hard to act on.",
                },
                {
                  title: "We improve continuously",
                  body: "Payer policy changes constantly. The process is reviewed against those changes rather than left running on assumptions made at onboarding.",
                },
              ].map((item, index) => (
                <li key={item.title} className="approach-grid__item">
                  <span className="approach-grid__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="h4">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Commitments"
            title="What we hold ourselves to"
            subtitle="Specific, checkable commitments rather than general assurances."
          />
          <div className="commitments">
            {COMMITMENTS.map((group) => (
              <article key={group.title} className="commitment">
                <h3 className="h4 commitment__title">{group.title}</h3>
                <ul className="commitment__list">
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="commitments__note">
            These are working commitments for the service relationship. Formal
            security and compliance documentation is provided separately during
            contracting, and this marketing site does not itself claim HIPAA
            compliance.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Team"
            title="Who does the work"
            subtitle="Individual names, titles, and credentials are shown as placeholders until the business confirms them. The functional roles below are how the work is actually organised."
          />
          <ul className="team">
            {TEAM.map((member) => (
              <li key={member.role} className="team-card">
                <span className="team-card__role">{member.role}</span>
                <span className="team-card__focus">{member.focus}</span>
                <span className="team-card__detail">{member.detail}</span>
                <span className="team-card__placeholder">
                  Profile placeholder — names and credentials to be confirmed
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Let&apos;s talk about your practice</h2>
          <p className="cta-section__text">
            Bring the questions you have about your own revenue cycle. We will
            answer them directly, including the ones about whether we are the
            right fit.
          </p>
          <Button to="/request-a-quote" variant="primary" size="md">
            Request a Consultation
            <ArrowRight className="btn__icon" size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
