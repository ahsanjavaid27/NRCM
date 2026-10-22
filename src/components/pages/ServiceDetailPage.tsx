import { Link } from "react-router-dom";
import { ArrowRight, Check, Info } from "lucide-react";
import Breadcrumbs from "../layout/Breadcrumbs";
import Accordion from "../ui/Accordion";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { SERVICE_DETAILS, type ServiceDetailData } from "../../data/serviceDetails";
import "./ServiceDetailPage.css";

export interface ServiceDetailPageProps {
  slug: string;
  /** Overrides the data entry in SERVICE_DETAILS when provided. */
  data?: ServiceDetailData;
}

export default function ServiceDetailPage({ slug, data }: ServiceDetailPageProps) {
  const service = data ?? SERVICE_DETAILS[slug];

  if (!service) {
    return (
      <div className="service-detail">
        <div className="container">
          <h1 className="h1">Service not found</h1>
          <Link to="/services" className="btn btn--primary btn--md">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="service-detail">
      <div className="container">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.eyebrow, href: `/services/${service.slug}` },
          ]}
        />
      </div>

      {/* Page header */}
      <header className="service-detail__header">
        <div className="container">
          <p className="eyebrow service-detail__eyebrow">{service.eyebrow}</p>
          <h1 className="h1 service-detail__title">{service.title}</h1>
          <p className="lead service-detail__subtitle">{service.subtitle}</p>
          <div className="service-detail__actions">
            <Button to="/request-a-quote" variant="primary" size="md">
              Request a Consultation
              <ArrowRight className="btn__icon" size={16} />
            </Button>
            <Button to="/services" variant="secondary" size="md">
              All Services
            </Button>
          </div>
        </div>
      </header>

      {/* Intro + scope */}
      <section className="service-detail__section">
        <div className="container">
          <div className="service-detail__intro-grid">
            <div className="service-detail__intro">
              <h2 className="h3">{service.introTitle}</h2>
              {service.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {service.confirmationNote && (
                <p className="service-detail__note">
                  <Info className="service-detail__note-icon" size={18} />
                  <span>{service.confirmationNote}</span>
                </p>
              )}
            </div>

            <aside className="service-detail__scope">
              <h3 className="h4">{service.includesTitle}</h3>
              <ul className="service-detail__list">
                {service.includes.map((item) => (
                  <li key={item}>
                    <Check className="service-detail__list-icon" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="service-detail__section service-detail__section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Outcomes"
            title={service.benefitsTitle}
            subtitle="What practices typically experience when this function is handled by a dedicated team."
          />
          <div className="service-detail__benefits">
            {service.benefits.map((benefit) => (
              <div key={benefit.lead} className="service-detail__benefit">
                <h4 className="h4">{benefit.lead}</h4>
                <p>{benefit.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section className="service-detail__section">
          <div className="container">
            <SectionHeading
              eyebrow="Process"
              title={`How ${service.eyebrow} Works`}
              subtitle="The sequence we follow, and what happens at each stage."
            />
            <ol className="service-detail__process">
              {service.process.map((step, index) => (
                <li key={step.title} className="service-detail__process-step">
                  <span className="service-detail__process-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="h4">{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="service-detail__section service-detail__section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title={`${service.eyebrow} Questions`}
            subtitle="Common questions we are asked about this service."
          />
          <div className="service-detail__faq">
            <Accordion
              items={service.faqs.map((faq, index) => ({
                id: `${service.slug}-faq-${index}`,
                title: faq.q,
                content: <p>{faq.a}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="service-detail__section">
        <div className="container">
          <SectionHeading
            eyebrow="Related Services"
            title="How This Fits With The Rest"
            subtitle="Services that commonly work alongside this one."
          />
          <div className="service-detail__related">
            {service.related.map((item) => (
              <Link key={item.href} to={item.href} className="service-detail__related-card">
                <h4 className="h4">{item.name}</h4>
                <p>{item.desc}</p>
                <span className="service-detail__related-link">
                  Learn more <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-detail__cta">
        <div className="container">
          <div className="service-detail__cta-inner">
            <div>
              <h2 className="h2">Talk through your revenue cycle with us</h2>
              <p className="lead">
                A short, no-obligation conversation about how this service fits your
                practice. No patient information required.
              </p>
            </div>
            <Button to="/request-a-quote" variant="accent" size="lg">
              Request a Consultation
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
