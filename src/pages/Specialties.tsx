import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SPECIALTIES } from "../data/specialties";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import "./Specialties.css";

export default function Specialties() {
  return (
    <div className="specialties-page">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Specialties", href: "/specialties" },
            ]}
          />
          <SectionHeading
            eyebrow="Medical Specialties"
            title="Specialties we can support"
            subtitle="Each specialty carries its own coding patterns, payer behaviour, and documentation expectations. These are the areas we are prepared to support — confirm availability for yours and we will set expectations properly."
          />
        </div>
      </header>

      <section className="specialties-grid-section">
        <div className="container">
          <ul className="specialties__grid">
            {SPECIALTIES.map((specialty, index) => (
              <li key={specialty.id} className="specialty">
                <div className="specialty__head">
                  <span className="specialty__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="specialty__title">{specialty.name}</h2>
                </div>
                <p className="specialty__desc">{specialty.description}</p>
                <div className="specialty__foot">
                  <span className="specialty__flag">Availability subject to confirmation</span>
                  <Link to="/request-a-quote" className="specialty__link">
                    Ask about this specialty
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="specialties-note">
        <div className="container">
          <div className="specialties-note__inner">
            <h2 className="h3">Why we ask rather than assume</h2>
            <p>
              We would rather tell you that a specialty needs to be confirmed than
              imply an experience we have not verified. When you reach out about a
              specialty, we will tell you plainly whether we can support it and what
              the onboarding would look like for a practice like yours.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Don&apos;t see your specialty?</h2>
          <p className="cta-section__text">
            We work with practices across a range of specialties and are always
            evaluating where we can add value. Ask us about yours.
          </p>
          <Button to="/contact" variant="primary" size="md">
            Contact Us
            <ArrowRight className="btn__icon" size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
