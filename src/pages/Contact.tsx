import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { BRAND } from '../data/brand';
import './Contact.css';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  practice: string;
  message: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: '',
  email: '',
  phone: '',
  practice: '',
  message: '',
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!values.email.trim()) {
      next.email = 'Please enter your business email address.';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.practice.trim()) {
      next.practice = 'Please enter your practice or business name.';
    }
    if (!values.message.trim()) {
      next.message = 'Please tell us briefly how we can help.';
    }
    if (!values.consent) {
      next.consent = 'Please confirm that you have read the privacy note.';
    }
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    // No submission service is wired up in this front-end build, so the form
    // intentionally does not report a successful delivery. See README for the
    // short list of ways to connect a secure form provider.
  };

  const fieldProps = (key: keyof FormValues) => ({
    id: `contact-${key}`,
    name: key,
    value: typeof values[key] === 'boolean' ? undefined : (values[key] as string),
    'aria-invalid': Boolean(errors[key]) || undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
  });

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            subtitle="Have questions about our services or want to discuss your practice's revenue cycle needs? We would like to hear from you."
            center
          />
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__card">
                <h3 className="h4">
                  <Phone size={18} aria-hidden="true" /> Phone
                </h3>
                <p>
                  <a href={`tel:${BRAND.contact.phone.replace(/[^\d+]/g, "")}`}>
                    {BRAND.contact.phone}
                  </a>
                </p>
                <p className="contact__hours">{BRAND.contact.hours}</p>
              </div>

              <div className="contact__card">
                <h3 className="h4">
                  <Mail size={18} aria-hidden="true" /> Email
                </h3>
                <p>
                  <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>
                </p>
                <p className="contact__hours">
                  Response time is typically within one business day. This value
                  is configurable in the brand settings.
                </p>
              </div>

              <div className="contact__card">
                <h3 className="h4">
                  <MapPin size={18} aria-hidden="true" /> Address
                </h3>
                <p>{BRAND.contact.address}</p>
              </div>

              <div className="contact__card contact__card--note">
                <h3 className="h4">Looking for a scoped proposal?</h3>
                <p>
                  The quote request form walks through your practice details in
                  four short steps so we can review the fit before we speak.
                </p>
                <Link to="/request-a-quote" className="btn btn--accent btn--sm">
                  Request a Quote
                </Link>
              </div>
            </div>

            <div className="contact__form">
              <h3 className="h4">Send a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input type="text" {...fieldProps('name')} required />
                  {errors.name && (
                    <span className="form-error" id="contact-name-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Business Email</label>
                  <input type="email" {...fieldProps('email')} required />
                  {errors.email && (
                    <span className="form-error" id="contact-email-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">Business Phone</label>
                  <input type="tel" {...fieldProps('phone')} />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-practice">Practice or Business Name</label>
                  <input type="text" {...fieldProps('practice')} required />
                  {errors.practice && (
                    <span className="form-error" id="contact-practice-error" role="alert">
                      {errors.practice}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea {...fieldProps('message')} rows={5} required />
                  {errors.message && (
                    <span className="form-error" id="contact-message-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    name="consent"
                    checked={values.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    aria-invalid={Boolean(errors.consent) || undefined}
                    aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                  />
                  <label htmlFor="contact-consent">
                    I understand this form collects business inquiry information
                    only and does not process protected health information (PHI).
                    Do not include patient names, records, or insurance member
                    IDs.
                  </label>
                </div>
                {errors.consent && (
                  <span className="form-error" id="contact-consent-error" role="alert">
                    {errors.consent}
                  </span>
                )}

                <Button type="submit" variant="primary" size="md" fullWidth>
                  Send Message
                </Button>

                {submitted && Object.keys(errors).length === 0 && (
                  <div className="form-status form-status--notice" role="status">
                    <AlertTriangle size={18} aria-hidden="true" />
                    <div>
                      <p className="form-status__title">
                        This form is not connected to a delivery service yet.
                      </p>
                      <p>
                        Your message was not sent anywhere. Connect a secure form
                        provider (Formspree, Basin, Netlify Forms, or your own
                        endpoint) to start receiving submissions. The setup steps
                        are documented in the README.
                      </p>
                    </div>
                  </div>
                )}

                {submitted && Object.keys(errors).length > 0 && (
                  <div className="form-status form-status--error" role="alert">
                    <AlertTriangle size={18} aria-hidden="true" />
                    <div>
                      <p className="form-status__title">
                        Please correct the highlighted fields.
                      </p>
                      <p>Your message has not been sent.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="privacy-section">
        <div className="container">
          <div className="privacy__card">
            <h3 className="h4">
              <CheckCircle2 size={18} aria-hidden="true" /> Privacy &amp; Security
            </h3>
            <p>
              This is a marketing website. We collect business inquiry information
              only — names, practice names, email addresses, and phone numbers. We
              do not collect patient names, medical records, diagnoses, dates of
              birth, insurance member IDs, or claim documents through this site.
            </p>
            <p>
              We do not claim HIPAA compliance simply because the site uses HTTPS
              or publishes a privacy policy. If you engage us for billing services,
              we will provide details about our security practices separately.
            </p>
            <p>
              <Link to="/privacy">Read the full privacy policy</Link> and{' '}
              <Link to="/terms">the terms of use</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Prefer to Speak Directly?</h2>
          <p className="cta-section__text">
            Call us at{' '}
            <a
              href={`tel:${BRAND.contact.phone.replace(/[^\d+]/g, "")}`}
              className="cta__phone"
            >
              {BRAND.contact.phone}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${BRAND.contact.email}`} className="cta__email">
              {BRAND.contact.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
