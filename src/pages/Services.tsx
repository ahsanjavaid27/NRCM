import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../data/services";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import "./Services.css";

export default function Services() {
  return (
    <div className="services-page">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ]}
          />
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive revenue cycle solutions"
            subtitle="Each service is scoped and priced on its own, and every one of them is designed to work inside the workflow you already have. Pick the functions you want us to take on, or hand us the whole cycle."
          />
        </div>
      </header>

      <section className="services-grid-section">
        <div className="container">
          <div className="services__grid">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className={`service-card ${
                  service.confirmed ? "" : "service-card--unconfirmed"
                }`}
              >
                <header className="service-card__header">
                  <h2 className="service-card__title">{service.name}</h2>
                  {!service.confirmed && (
                    <span className="service-card__flag">Confirmation needed</span>
                  )}
                </header>
                <p className="service-card__summary">{service.summary}</p>
                <Link to={service.href} className="service-card__link">
                  {service.confirmed ? "Learn more" : "Check availability"}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-note">
        <div className="container">
          <div className="services-note__inner">
            <h2 className="h3">A note on what we can confirm</h2>
            <p>
              Services marked &ldquo;confirmation needed&rdquo; are part of our intended
              offering but are subject to business confirmation before they can be
              contracted. We flag them rather than listing them as available, because a
              commitment we cannot keep is worse than a question you ask us.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Need something not listed here?</h2>
          <p className="cta-section__text">
            Most practices end up with a combination rather than a single service.
            Tell us what is not working and we will suggest what to take on first.
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
