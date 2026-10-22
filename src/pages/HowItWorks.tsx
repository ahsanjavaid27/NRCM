import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useReveal } from "../hooks/useReveal";
import "./HowItWorks.css";

const STEPS = [
  {
    number: 1,
    label: "Initial Consultation",
    title: "Initial Consultation",
    description:
      "We start with a thorough discovery call to understand your practice's specialty, current billing workflow, pain points, and goals. This helps us scope the right solution rather than defaulting to a package.",
    details: [
      "Practice profile and specialty review",
      "Current RCM workflow analysis",
      "Pain point identification",
      "Goal alignment and success criteria",
    ],
    duration: "Week 1",
  },
  {
    number: 2,
    label: "Needs Assessment",
    title: "Practice Needs Assessment",
    description:
      "Our team conducts a deep dive into your claims data, denial patterns, A/R aging, and payer mix to identify where revenue is being lost and what is worth fixing first.",
    details: [
      "Claims and denial audit",
      "A/R aging analysis",
      "Payer mix evaluation",
      "Revenue leakage identification",
    ],
    duration: "Weeks 1–2",
  },
  {
    number: 3,
    label: "Onboarding",
    title: "Onboarding & Workflow Setup",
    description:
      "We configure our systems to match your practice, integrate with your EHR or practice management system, set up clearinghouse connections, and train your staff on the new workflow.",
    details: [
      "EHR and practice management integration",
      "Clearinghouse and payer setup",
      "Workflow configuration",
      "Staff training sessions",
    ],
    duration: "Weeks 2–4",
  },
  {
    number: 4,
    label: "Billing & Claims",
    title: "Billing & Claims Workflow",
    description:
      "Day-to-day operations begin: charge entry, claim scrubbing, electronic submission, real-time status tracking, and proactive payer follow-up on anything that stalls.",
    details: [
      "Charge capture and entry",
      "Automated claim scrubbing",
      "Electronic submission",
      "Real-time tracking and follow-up",
    ],
    duration: "Ongoing",
  },
  {
    number: 5,
    label: "Issue Resolution",
    title: "Follow-Up & Issue Resolution",
    description:
      "Denials are tracked, analyzed for root cause, and resubmitted with corrections. A/R aging is reviewed on a set cadence. Patient statements are managed on your schedule.",
    details: [
      "Denial analysis and appeals",
      "Scheduled A/R review",
      "Patient statement management",
      "Payer escalation when needed",
    ],
    duration: "Ongoing",
  },
  {
    number: 6,
    label: "Reporting",
    title: "Reporting & Ongoing Improvement",
    description:
      "Monthly performance reports with actionable insights. Quarterly business reviews. Continuous workflow optimization based on the data and on payer rules that change without notice.",
    details: [
      "Monthly KPI reporting",
      "Quarterly business reviews",
      "Workflow optimization",
      "Payer policy monitoring",
    ],
    duration: "Ongoing",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const step = STEPS[active];

  const select = (index: number) => setActive(index);
  const previous = () => setActive((i) => Math.max(i - 1, 0));
  const next = () => setActive((i) => Math.min(i + 1, STEPS.length - 1));

  return (
    <div className="how-it-works-page">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "How It Works", href: "/how-it-works" },
            ]}
          />
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work With Your Practice"
            subtitle="A structured, transparent approach that takes you from initial assessment to ongoing optimization — with clear milestones at every stage."
            center
          />
        </div>
      </header>

      {/* Interactive explorer */}
      <section className="process-section">
        <div className="container">
          <div className="process-explorer">
            {/* Step rail */}
            <div className="process-rail" role="tablist" aria-label="Engagement phases">
              {STEPS.map((item, index) => (
                <button
                  key={item.number}
                  role="tab"
                  id={`process-tab-${item.number}`}
                  aria-selected={index === active}
                  aria-controls={`process-panel-${item.number}`}
                  tabIndex={index === active ? 0 : -1}
                  className={`process-rail__item ${
                    index === active ? "process-rail__item--active" : ""
                  } ${index < active ? "process-rail__item--done" : ""}`}
                  onClick={() => select(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      next();
                      document.getElementById(`process-tab-${STEPS[Math.min(active + 1, STEPS.length - 1)].number}`)?.focus();
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      previous();
                      document.getElementById(`process-tab-${STEPS[Math.max(active - 1, 0)].number}`)?.focus();
                    }
                  }}
                >
                  <span className="process-rail__number">{item.number}</span>
                  <span className="process-rail__label">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div
              role="tabpanel"
              id={`process-panel-${step.number}`}
              aria-labelledby={`process-tab-${step.number}`}
              className="process-panel"
              key={step.number}
            >
              <p className="eyebrow process-panel__eyebrow">
                Phase {step.number} of {STEPS.length} · {step.duration}
              </p>
              <h2 className="h2 process-panel__title">{step.title}</h2>
              <p className="lead process-panel__description">{step.description}</p>

              <ul className="process-panel__list">
                {step.details.map((detail) => (
                  <li key={detail}>
                    <Check className="process-panel__check" size={16} aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="process-panel__nav">
                <button
                  type="button"
                  onClick={previous}
                  disabled={active === 0}
                  className="process-panel__nav-btn"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Previous
                </button>
                <span className="process-panel__counter">
                  {active + 1} / {STEPS.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  disabled={active === STEPS.length - 1}
                  className="process-panel__nav-btn"
                >
                  Next
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="timeline-section">
        <div className="container">
          <div className="timeline" ref={ref} data-reveal={isVisible ? "true" : undefined}>
            {STEPS.map((item) => (
              <article
                key={item.number}
                className={`timeline-step ${
                  item.number === active + 1 ? "timeline-step--current" : ""
                }`}
                onClick={() => select(item.number - 1)}
              >
                <div className="timeline__connector" />
                <div className="timeline__content">
                  <div className="timeline__number">{item.number}</div>
                  <div className="timeline__body">
                    <p className="eyebrow timeline__duration">{item.duration}</p>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__description">{item.description}</p>
                    <ul className="timeline__details">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Ready to Begin?</h2>
          <p className="cta-section__text">
            The first step is a conversation. No commitment, and no patient information
            required — just a clear understanding of what is possible for your practice.
          </p>
          <Button to="/request-a-quote" variant="primary" size="md">
            Start Your Consultation
            <ArrowRight className="btn__icon" size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
