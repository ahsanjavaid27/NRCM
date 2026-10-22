import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { BRAND } from '../data/brand';

export default function Privacy() {
  return (
    <div className="page">
      <SectionHeading
        title="Privacy Policy"
        subtitle="For business and legal review."
      />
      <section className="policy">
        <h2>1. What We Collect</h2>
        <p>
          This site collects business inquiry information only. Through the
          contact form and quote request form, we collect your name, business
          email, practice name, business phone, and service interest details.
        </p>
        <p>
          We do not collect protected health information, medical records,
          diagnoses, dates of birth, insurance member IDs, claim documents, or
          other protected health information through our marketing forms.
        </p>

        <h2>2. How Your Information Is Used</h2>
        <p>
          Your business inquiry information is used solely to facilitate
          consultation scheduling, service matching, and responding to your
          contact request. We do not sell, share, or transfer your information
          to third parties.
        </p>

        <h2>3. Third-Party Form Services</h2>
        <p>
          If you connect a secure form submission service (such as Formspree,
          Basin, Netlify Forms, or similar), we will share only the information
          you explicitly submit through that service. We will not access or
          read the submitted content ourselves.
        </p>

        <h2>4. Legal Review Required</h2>
        <p>
          This is a starter privacy policy prepared for business and legal
          review. It does not constitute legal advice. You are responsible for
          reviewing and updating this policy to meet your specific regulatory
          obligations.
        </p>

        <h2>5. Contact</h2>
        <p>
          For privacy-related questions, contact us at{' '}
          <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>.
        </p>

        <div className="policy__actions">
          <Link to="/contact">
            <Button variant="primary">Contact Us</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
