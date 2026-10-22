import { Link } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  ShieldAlert,
  FileText,
  Send,
  CreditCard,
  CheckCircle,
  UserCheck,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { SERVICES } from "../data/services";
import { SPECIALTIES } from "../data/specialties";
import { FAQS } from "../data/faqs";
import { useReveal } from "../hooks/useReveal";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import "./Home.css";

const ICONS: Record<string, typeof FileText> = {
  FileText,
  Activity,
  ShieldAlert,
  Send,
  CreditCard,
  CheckCircle,
  UserCheck,
  Clock,
};

const APPROACH = [
  {
    title: "One accountable team",
    body: "The same people own intake, claims, denials, posting, and patient balances. Nothing falls between handoffs, because there are no handoffs to fall through.",
  },
  {
    title: "Visibility before optimisation",
    body: "We report on the state of the cycle before proposing changes. A workflow cannot be improved until it is measured, and it cannot be measured until it is visible.",
  },
  {
    title: "Prevention over recovery",
    body: "Recovering a denied claim costs far more than never sending a claim that would have been denied. Most of our work is upstream of the claim.",
  },
  {
    title: "Your systems, not ours",
    body: "We build operations around the practice management and EHR systems you already run wherever possible, so adoption does not become a second project.",
  },
];

const HOME_FAQS = FAQS.filter((item) =>
  ["faq-1", "faq-2", "faq-5", "faq-6"].includes(item.id),
);

export default function Home() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div className="home">
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              Medical Billing &amp; Revenue Cycle Management
            </p>
            <h1 className="hero__title">
              Revenue operations your practice can
              <span className="hero__title-accent"> actually rely on</span>
            </h1>
            <p className="lead hero__lede">
              We run the billing function for US healthcare practices — claims,
              denials, posting, and patient balances — with the reporting and
              discipline to keep it improving after we get there.
            </p>

            <div className="hero__actions">
              <Button to="/request-a-quote" variant="primary" size="lg">
                Request a Consultation
                <ArrowRight className="btn__icon" size={16} />
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                Explore Our Services
              </Button>
            </div>

            <p className="hero__note">
              <ShieldAlert size={15} aria-hidden="true" />
              Business inquiries only. No patient information is collected through
              this site.
            </p>
          </div>

          <div className="hero__visual">
            <RevenueDashboard />
          </div>
        </div>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section className="strip">
        <div className="container">
          <ul className="strip__list">
            {[
              "Full-cycle ownership",
              "Payer-specific follow-up",
              "Denial root-cause analysis",
              "Reporting you can act on",
            ].map((item) => (
              <li key={item} className="strip__item">
                <CheckCircle size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow text-accent">Services</p>
              <h2 className="h2">Eight functions, one revenue cycle</h2>
            </div>
            <p className="section-head__aside">
              Each service has its own page, its own scope, and its own
              accountability. Take the ones you need, or hand us the whole cycle.
            </p>
          </div>

          <div className="svc-grid">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.icon] ?? FileText;
              return (
                <Link
                  key={service.id}
                  to={service.href}
                  className="svc-card"
                >
                  <span className="svc-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="svc-card__title">{service.name}</span>
                  <span className="svc-card__body">{service.summary}</span>
                  <span className="svc-card__link">
                    {service.confirmed ? "Explore service" : "Check availability"}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Approach ---------------- */}
      <section className="section section--tint" id="approach">
        <div className="container">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we work is the product"
            subtitle="Billing software is widely available and rarely the constraint. The constraint is almost always operational — ownership, sequencing, and whether anyone is measuring the result."
          />

          <div className="approach" ref={ref} data-reveal={isVisible ? "true" : undefined}>
            {APPROACH.map((item, index) => (
              <article key={item.title} className="approach__item">
                <span className="approach__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="h4 approach__title">{item.title}</h3>
                <p className="approach__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Workflow ---------------- */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Workflow"
            title="From first call to steady state"
            subtitle="Six phases, each with a clear deliverable and a clear owner."
          />

          <ol className="flow">
            {[
              { label: "Consultation", note: "Scope and goals" },
              { label: "Needs assessment", note: "Data review" },
              { label: "Onboarding", note: "Systems and training" },
              { label: "Billing operations", note: "Daily workflow" },
              { label: "Issue resolution", note: "Denials and A/R" },
              { label: "Reporting", note: "Improvement loop" },
            ].map((step, index) => (
              <li key={step.label} className="flow__step">
                <span className="flow__marker" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="flow__label">{step.label}</span>
                <span className="flow__note">{step.note}</span>
              </li>
            ))}
          </ol>

          <div className="flow__cta">
            <Button to="/how-it-works" variant="secondary" size="md">
              See the full process
              <ArrowRight className="btn__icon" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- Specialties ---------------- */}
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow text-accent">Specialties</p>
              <h2 className="h2">Specialties we support</h2>
            </div>
            <p className="section-head__aside">
              Coverage varies by specialty and location. Every listing below is
              marked for confirmation until the business confirms it.
            </p>
          </div>

          <ul className="spec-grid">
            {SPECIALTIES.map((specialty) => (
              <li key={specialty.id} className="spec">
                <span className="spec__name">{specialty.name}</span>
                <span className="spec__desc">{specialty.description}</span>
              </li>
            ))}
          </ul>

          <div className="flow__cta">
            <Button to="/specialties" variant="secondary" size="md">
              View all specialties
              <ArrowRight className="btn__icon" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ preview ---------------- */}
      <section className="section">
        <div className="container">
          <div className="faq-preview">
            <div className="faq-preview__intro">
              <p className="eyebrow text-accent">Common questions</p>
              <h2 className="h2">What practices ask us first</h2>
              <p className="lead faq-preview__lede">
                Straight answers on scope, privacy, and what working with us
                actually looks like.
              </p>
              <Button to="/faq" variant="ghost" size="md">
                All questions
                <ArrowRight className="btn__icon" size={16} />
              </Button>
            </div>

            <ul className="faq-preview__list">
              {HOME_FAQS.map((item) => (
                <li key={item.id} className="faq-preview__item">
                  <h3 className="faq-preview__q">{item.question}</h3>
                  <p className="faq-preview__a">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="cta">
        <div className="container">
          <div className="cta__inner">
            <div className="cta__copy">
              <h2 className="h2">Start with a conversation, not a contract</h2>
              <p className="lead">
                Tell us what is not working. We will tell you what we think the
                problem is, what we would do about it, and what it would take.
              </p>
            </div>
            <div className="cta__actions">
              <Button to="/request-a-quote" variant="accent" size="lg">
                Request a Consultation
              </Button>
              <Button to="/contact" variant="inverse" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Illustrative dashboard mockup — sample data, not client results.   */
/* ------------------------------------------------------------------ */
function RevenueDashboard() {
  const bars = [42, 58, 51, 66, 74, 69, 82, 88];
  const rows = [
    { label: "Submitted", value: 1_284, state: "ok" },
    { label: "Acknowledged", value: 1_279, state: "ok" },
    { label: "In adjudication", value: 411, state: "wait" },
    { label: "Denied — working", value: 63, state: "alert" },
  ];

  return (
    <figure className="dash">
      <figcaption className="dash__caption">
        <span className="dash__caption-title">Revenue cycle overview</span>
        <span className="dash__caption-note">Illustrative sample data</span>
      </figcaption>

      <div className="dash__head">
        <span className="dash__head-label">Claim volume</span>
        <span className="dash__head-trend">
          <TrendingUp size={14} aria-hidden="true" />
          Last 8 weeks
        </span>
      </div>

      <div className="dash__chart" role="img" aria-label="Illustrative bar chart showing claim volume rising over eight weeks">
        {bars.map((height, index) => (
          <span key={index} className="dash__bar" style={{ height: `${height}%` }} />
        ))}
      </div>

      <ul className="dash__rows">
        {rows.map((row) => (
          <li key={row.label} className={`dash__row dash__row--${row.state}`}>
            <span className="dash__row-label">{row.label}</span>
            <span className="dash__row-value">
              {row.value.toLocaleString("en-US")}
            </span>
            <span className="dash__row-icon" aria-hidden="true">
              {row.state === "alert" ? (
                <AlertCircle size={15} />
              ) : row.state === "wait" ? (
                <Clock size={15} />
              ) : (
                <CheckCircle size={15} />
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="dash__disclaimer">
        Illustrative interface demonstration. Figures shown are sample data and
        are not results for any client.
      </p>
    </figure>
  );
}
