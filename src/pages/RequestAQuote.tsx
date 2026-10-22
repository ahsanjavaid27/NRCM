import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import Button from "../components/ui/Button";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { SERVICES } from "../data/services";
import "./RequestAQuote.css";

type FormData = {
  fullName: string;
  email: string;
  practiceName: string;
  phone: string;
  specialty: string;
  providerCount: string;
  practiceType: string;
  billingArrangement: string;
  services: string[];
  challenges: string[];
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormData, string>>;

const SPECIALTIES = [
  "Primary care",
  "Cardiology",
  "Orthopedics",
  "Mental health",
  "Dermatology",
  "Urgent care",
  "Multispecialty practice",
  "Other",
];

const PROVIDER_COUNTS = ["1", "2-5", "6-15", "16-50", "51+"];

const PRACTICE_TYPES = [
  "Independent practice",
  "Hospital-owned / employed",
  "Multi-site group",
  "Management services organization",
  "Other",
];

const BILLING_ARRANGEMENTS = [
  "Fully in-house",
  "Outsourced to a billing company",
  "Hybrid — in-house plus outsourced",
  "Mixed across providers",
  "Not currently billing consistently",
];

const CHALLENGES = [
  "Denials and appeals are not being worked",
  "Slow reimbursement and aging A/R",
  "Patient statements and balances are not collected",
  "Eligibility and authorization issues cause denials",
  "Lack of visibility into revenue performance",
  "Staff bandwidth is limited",
  "Preparing for a payer contract change",
  "Looking to evaluate alternatives",
];

const INITIAL: FormData = {
  fullName: "",
  email: "",
  practiceName: "",
  phone: "",
  specialty: "",
  providerCount: "",
  practiceType: "",
  billingArrangement: "",
  services: [],
  challenges: [],
  message: "",
  consent: false,
};

const STEPS = [
  { id: 1, title: "Contact information", hint: "How we reach you" },
  { id: 2, title: "Practice details", hint: "Your practice profile" },
  { id: 3, title: "Service requirements", hint: "What you need" },
  { id: 4, title: "Review and submit", hint: "Confirm your answers" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (!data.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!data.email.trim()) {
      errors.email = "Please enter your business email address.";
    } else if (!EMAIL_RE.test(data.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!data.practiceName.trim())
      errors.practiceName = "Please enter your practice name.";
    if (!data.phone.trim()) {
      errors.phone = "Please enter your business phone number.";
    } else if (data.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (step === 2) {
    if (!data.specialty) errors.specialty = "Please select your specialty.";
    if (!data.providerCount) errors.providerCount = "Please select a provider count.";
    if (!data.practiceType) errors.practiceType = "Please select your practice type.";
    if (!data.billingArrangement)
      errors.billingArrangement = "Please select your current billing arrangement.";
  }

  if (step === 3) {
    if (data.services.length === 0)
      errors.services = "Please select at least one service of interest.";
    if (data.challenges.length === 0)
      errors.challenges = "Please select at least one current challenge.";
  }

  if (step === 4) {
    if (!data.consent)
      errors.consent =
        "Please confirm you understand this form collects business information only.";
  }

  return errors;
}

export default function RequestAQuote() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ ...INITIAL });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const selectedServices = useMemo(
    () => SERVICES.filter((service) => data.services.includes(service.id)),
    [data.services],
  );

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (touched) setErrors(validateStep(step, next));
      return next;
    });
  };

  const toggleListValue = (key: "services" | "challenges", value: string) => {
    setData((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      const updated = { ...prev, [key]: next };
      if (touched) setErrors(validateStep(step, updated));
      return updated;
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    setTouched(true);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStep((prev) => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setTouched(false);
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (target: number) => {
    if (target < step) {
      setErrors({});
      setTouched(false);
      setStep(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    const allErrors = validateStep(4, data);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setStatus("submitting");
    setSubmitError("");

    // NOTE: no submission endpoint is configured in this project. The request is
    // deliberately NOT reported as sent, because nothing has been transmitted.
    // To go live, POST `data` to your form provider here and only set the success
    // state after the provider confirms receipt. Keep any provider secret on a
    // server or serverless runtime — never in this client bundle.
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("error");
      setSubmitError(
        "This form is not connected to a submission service yet, so your request was not sent. The steps for connecting one are below.",
      );
    } catch {
      setStatus("error");
      setSubmitError("Something went wrong while preparing your request. Please try again.");
    }
  };

  const errorFor = (key: keyof FormData) => (touched ? errors[key] : undefined);

  if (status === "error") {
    return (
      <div className="quote-page">
        <header className="quote-page__header">
          <div className="container">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Request a Quote", href: "/request-a-quote" },
              ]}
            />
            <h1 className="h1 quote-page__title">Your request is ready to send</h1>
            <p className="lead quote-page__subtitle">
              We have prepared your quote request, but no delivery endpoint is configured
              in this project yet, so nothing has been transmitted.
            </p>
          </div>
        </header>

        <section className="quote-page__section">
          <div className="container">
            <div className="quote-status quote-status--error">
              <AlertCircle className="quote-status__icon" size={22} aria-hidden="true" />
              <div>
                <h2 className="h4">Not delivered</h2>
                <p>{submitError}</p>
              </div>
            </div>

            <div className="quote-setup">
              <h2 className="h3">Connecting a form service</h2>
              <p>
                This project is a front-end demonstration. To make the form deliver
                inquiries, point it at a form backend appropriate for your business.
              </p>
              <ol className="quote-setup__steps">
                <li>
                  Choose a provider — for example Formspree, Basin, Netlify Forms, a
                  Google Apps Script, or a small serverless function on your own
                  infrastructure.
                </li>
                <li>
                  Add the endpoint in{" "}
                  <code className="quote-setup__code">src/pages/RequestAQuote.tsx</code>{" "}
                  inside <code className="quote-setup__code">handleSubmit</code> and send
                  the form payload.
                </li>
                <li>
                  Keep any provider key on a server or serverless runtime environment.
                  Never hard-code a secret into a client-side bundle.
                </li>
                <li>
                  Replace this state with a success state driven by the provider response,
                  so a confirmation is shown only after a real delivery.
                </li>
              </ol>
              <p className="quote-setup__note">
                Do not send protected health information through this form. Business
                inquiry details are appropriate; patient data is not.
              </p>
            </div>

            <div className="quote-status__actions">
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                <ArrowLeft className="btn__icon" size={16} />
                Back to the form
              </Button>
              <Button to="/contact" variant="primary">
                Contact us directly
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <header className="quote-page__header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Request a Quote", href: "/request-a-quote" },
            ]}
          />
          <h1 className="h1 quote-page__title">Request a Quote</h1>
          <p className="lead quote-page__subtitle">
            Four short steps. We use this to understand your practice before we talk, so
            the first conversation is useful rather than introductory.
          </p>
        </div>
      </header>

      <div className="quote-progress">
        <div className="container">
          <div className="quote-progress__bar" role="presentation">
            <div className="quote-progress__fill" style={{ width: `${progress}%` }} />
          </div>
          <ol className="quote-progress__steps">
            {STEPS.map((item) => {
              const state =
                item.id === step ? "current" : item.id < step ? "complete" : "upcoming";
              return (
                <li
                  key={item.id}
                  className={`quote-progress__step quote-progress__step--${state}`}
                >
                  <button
                    type="button"
                    onClick={() => goToStep(item.id)}
                    disabled={item.id > step}
                    aria-current={item.id === step ? "step" : undefined}
                    className="quote-progress__button"
                  >
                    <span className="quote-progress__marker">
                      {state === "complete" ? <Check size={14} aria-hidden="true" /> : item.id}
                    </span>
                    <span className="quote-progress__label">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <section className="quote-page__section">
        <div className="container">
          <form className="quote-form" onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <fieldset className="quote-step">
                <legend className="quote-step__legend">
                  <span className="eyebrow">Step 1 of 4</span>
                  <span className="h3">Contact information</span>
                </legend>
                <p className="quote-step__hint">
                  Business contact details only. We will use these to respond to your
                  request.
                </p>

                <div className="quote-field">
                  <label htmlFor="fullName">
                    Full name <span className="quote-field__required">Required</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={data.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    aria-invalid={Boolean(errorFor("fullName"))}
                    aria-describedby={errorFor("fullName") ? "fullName-error" : undefined}
                  />
                  {errorFor("fullName") && (
                    <p className="quote-field__error" id="fullName-error">
                      {errorFor("fullName")}
                    </p>
                  )}
                </div>

                <div className="quote-field">
                  <label htmlFor="email">
                    Business email <span className="quote-field__required">Required</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errorFor("email"))}
                    aria-describedby={errorFor("email") ? "email-error" : undefined}
                  />
                  {errorFor("email") && (
                    <p className="quote-field__error" id="email-error">
                      {errorFor("email")}
                    </p>
                  )}
                </div>

                <div className="quote-field">
                  <label htmlFor="practiceName">
                    Practice name <span className="quote-field__required">Required</span>
                  </label>
                  <input
                    id="practiceName"
                    name="practiceName"
                    type="text"
                    autoComplete="organization"
                    value={data.practiceName}
                    onChange={(e) => update("practiceName", e.target.value)}
                    aria-invalid={Boolean(errorFor("practiceName"))}
                    aria-describedby={
                      errorFor("practiceName") ? "practiceName-error" : undefined
                    }
                  />
                  {errorFor("practiceName") && (
                    <p className="quote-field__error" id="practiceName-error">
                      {errorFor("practiceName")}
                    </p>
                  )}
                </div>

                <div className="quote-field">
                  <label htmlFor="phone">
                    Business phone <span className="quote-field__required">Required</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={Boolean(errorFor("phone"))}
                    aria-describedby={errorFor("phone") ? "phone-error" : undefined}
                  />
                  {errorFor("phone") && (
                    <p className="quote-field__error" id="phone-error">
                      {errorFor("phone")}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="quote-step">
                <legend className="quote-step__legend">
                  <span className="eyebrow">Step 2 of 4</span>
                  <span className="h3">Practice details</span>
                </legend>
                <p className="quote-step__hint">
                  This helps us scope the right level of support. Estimates are fine.
                </p>

                <div className="quote-field">
                  <label htmlFor="specialty">
                    Specialty <span className="quote-field__required">Required</span>
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={data.specialty}
                    onChange={(e) => update("specialty", e.target.value)}
                    aria-invalid={Boolean(errorFor("specialty"))}
                    aria-describedby={errorFor("specialty") ? "specialty-error" : undefined}
                  >
                    <option value="">Select a specialty</option>
                    {SPECIALTIES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errorFor("specialty") && (
                    <p className="quote-field__error" id="specialty-error">
                      {errorFor("specialty")}
                    </p>
                  )}
                </div>

                <fieldset className="quote-field quote-field--group">
                  <legend>
                    Approximate number of providers{" "}
                    <span className="quote-field__required">Required</span>
                  </legend>
                  <div className="quote-chips">
                    {PROVIDER_COUNTS.map((count) => (
                      <label
                        key={count}
                        className={`quote-chip ${
                          data.providerCount === count ? "quote-chip--active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="providerCount"
                          value={count}
                          checked={data.providerCount === count}
                          onChange={() => update("providerCount", count)}
                          className="quote-chip__input"
                        />
                        <span>{count}</span>
                      </label>
                    ))}
                  </div>
                  {errorFor("providerCount") && (
                    <p className="quote-field__error">{errorFor("providerCount")}</p>
                  )}
                </fieldset>

                <div className="quote-field">
                  <label htmlFor="practiceType">
                    Practice type <span className="quote-field__required">Required</span>
                  </label>
                  <select
                    id="practiceType"
                    name="practiceType"
                    value={data.practiceType}
                    onChange={(e) => update("practiceType", e.target.value)}
                    aria-invalid={Boolean(errorFor("practiceType"))}
                    aria-describedby={
                      errorFor("practiceType") ? "practiceType-error" : undefined
                    }
                  >
                    <option value="">Select a practice type</option>
                    {PRACTICE_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errorFor("practiceType") && (
                    <p className="quote-field__error" id="practiceType-error">
                      {errorFor("practiceType")}
                    </p>
                  )}
                </div>

                <div className="quote-field">
                  <label htmlFor="billingArrangement">
                    Current billing arrangement{" "}
                    <span className="quote-field__required">Required</span>
                  </label>
                  <select
                    id="billingArrangement"
                    name="billingArrangement"
                    value={data.billingArrangement}
                    onChange={(e) => update("billingArrangement", e.target.value)}
                    aria-invalid={Boolean(errorFor("billingArrangement"))}
                    aria-describedby={
                      errorFor("billingArrangement")
                        ? "billingArrangement-error"
                        : undefined
                    }
                  >
                    <option value="">Select an arrangement</option>
                    {BILLING_ARRANGEMENTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errorFor("billingArrangement") && (
                    <p className="quote-field__error" id="billingArrangement-error">
                      {errorFor("billingArrangement")}
                    </p>
                  )}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="quote-step">
                <legend className="quote-step__legend">
                  <span className="eyebrow">Step 3 of 4</span>
                  <span className="h3">Service requirements</span>
                </legend>
                <p className="quote-step__hint">
                  Select everything that applies. We will confirm availability in our first
                  reply.
                </p>

                <fieldset className="quote-field quote-field--group">
                  <legend>
                    Services of interest{" "}
                    <span className="quote-field__required">Required</span>
                  </legend>
                  <div className="quote-chips quote-chips--wrap">
                    {SERVICES.map((service) => {
                      const active = data.services.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={`quote-chip ${active ? "quote-chip--active" : ""}`}
                        >
                          <input
                            type="checkbox"
                            value={service.id}
                            checked={active}
                            onChange={() => toggleListValue("services", service.id)}
                            className="quote-chip__input"
                          />
                          <span>{service.name}</span>
                          {!service.confirmed && (
                            <span className="quote-chip__flag">Confirm availability</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {errorFor("services") && (
                    <p className="quote-field__error">{errorFor("services")}</p>
                  )}
                </fieldset>

                <fieldset className="quote-field quote-field--group">
                  <legend>
                    Current challenges{" "}
                    <span className="quote-field__required">Required</span>
                  </legend>
                  <div className="quote-checks">
                    {CHALLENGES.map((challenge) => {
                      const active = data.challenges.includes(challenge);
                      return (
                        <label
                          key={challenge}
                          className={`quote-check ${active ? "quote-check--active" : ""}`}
                        >
                          <input
                            type="checkbox"
                            value={challenge}
                            checked={active}
                            onChange={() => toggleListValue("challenges", challenge)}
                            className="quote-check__input"
                          />
                          <span className="quote-check__box" aria-hidden="true">
                            <Check size={13} />
                          </span>
                          <span>{challenge}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errorFor("challenges") && (
                    <p className="quote-field__error">{errorFor("challenges")}</p>
                  )}
                </fieldset>

                <div className="quote-field">
                  <label htmlFor="message">
                    Anything else we should know?{" "}
                    <span className="quote-field__optional">Optional</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="For example: current billing vendor, contract end date, or a specific problem you want solved first."
                  />
                  <p className="quote-field__help">
                    Please keep this to business information. Do not include patient names,
                    medical record numbers, diagnoses, or insurance member IDs.
                  </p>
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="quote-step">
                <legend className="quote-step__legend">
                  <span className="eyebrow">Step 4 of 4</span>
                  <span className="h3">Review and submit</span>
                </legend>
                <p className="quote-step__hint">
                  Check your answers below. Use Edit to go back to any section.
                </p>

                <div className="quote-review">
                  <div className="quote-review__group">
                    <div className="quote-review__header">
                      <h3>Contact information</h3>
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="quote-review__edit"
                      >
                        Edit
                      </button>
                    </div>
                    <dl className="quote-review__list">
                      <div>
                        <dt>Full name</dt>
                        <dd>{data.fullName}</dd>
                      </div>
                      <div>
                        <dt>Business email</dt>
                        <dd>{data.email}</dd>
                      </div>
                      <div>
                        <dt>Practice name</dt>
                        <dd>{data.practiceName}</dd>
                      </div>
                      <div>
                        <dt>Business phone</dt>
                        <dd>{data.phone}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="quote-review__group">
                    <div className="quote-review__header">
                      <h3>Practice details</h3>
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="quote-review__edit"
                      >
                        Edit
                      </button>
                    </div>
                    <dl className="quote-review__list">
                      <div>
                        <dt>Specialty</dt>
                        <dd>{data.specialty}</dd>
                      </div>
                      <div>
                        <dt>Providers</dt>
                        <dd>{data.providerCount}</dd>
                      </div>
                      <div>
                        <dt>Practice type</dt>
                        <dd>{data.practiceType}</dd>
                      </div>
                      <div>
                        <dt>Current billing arrangement</dt>
                        <dd>{data.billingArrangement}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="quote-review__group">
                    <div className="quote-review__header">
                      <h3>Service requirements</h3>
                      <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="quote-review__edit"
                      >
                        Edit
                      </button>
                    </div>
                    <dl className="quote-review__list">
                      <div>
                        <dt>Services of interest</dt>
                        <dd>
                          {selectedServices.length > 0
                            ? selectedServices.map((service) => service.name).join(", ")
                            : "—"}
                        </dd>
                      </div>
                      <div>
                        <dt>Current challenges</dt>
                        <dd>
                          {data.challenges.length > 0 ? data.challenges.join(", ") : "—"}
                        </dd>
                      </div>
                      {data.message && (
                        <div>
                          <dt>Additional message</dt>
                          <dd>{data.message}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                <div className="quote-consent">
                  <label className="quote-check">
                    <input
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      className="quote-check__input"
                      aria-invalid={Boolean(errorFor("consent"))}
                    />
                    <span className="quote-check__box" aria-hidden="true">
                      <Check size={13} />
                    </span>
                    <span>
                      I understand this form collects business inquiry information only, and
                      that no patient information should be submitted through it.
                    </span>
                  </label>
                  {errorFor("consent") && (
                    <p className="quote-field__error">{errorFor("consent")}</p>
                  )}
                </div>

                <div className="quote-status quote-status--info">
                  <AlertCircle className="quote-status__icon" size={20} aria-hidden="true" />
                  <p>
                    This project does not have a submission service configured. Submitting
                    will show the setup instructions rather than a delivery confirmation.
                  </p>
                </div>
              </fieldset>
            )}

            <div className="quote-form__nav">
              {step > 1 ? (
                <Button variant="secondary" onClick={goBack}>
                  <ArrowLeft className="btn__icon" size={16} />
                  Back
                </Button>
              ) : (
                <Link to="/services" className="quote-form__skip">
                  Explore services first
                </Link>
              )}

              {step < STEPS.length ? (
                <Button variant="primary" onClick={goNext}>
                  Continue
                  <ArrowRight className="btn__icon" size={16} />
                </Button>
              ) : (
                <Button type="submit" variant="primary" disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="btn__icon btn__icon--spin" size={16} />
                      Preparing request
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="btn__icon" size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
