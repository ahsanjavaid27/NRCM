import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { BRAND } from '../data/brand';

export default function Terms() {
  return (
    <div className="page">
      <SectionHeading
        title="Terms of Service"
        subtitle="For business and legal review."
      />
      <section className="policy">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using this website, you agree to the terms described below.
          These terms may be updated from time to time.
        </p>

        <h2>2. Service Description</h2>
        <p>
          This website is a marketing site for our medical billing and revenue
          cycle management services. It provides general information about our
          offerings and does not constitute a legal or financial engagement.
        </p>

        <h2>3. No Guarantees</h2>
        <p>
          While we strive to provide accurate information, we do not make any
          guarantees about specific results or outcomes. Any service
          engagements are governed by a separate service agreement.
        </p>

        <h2>4. Contact</h2>
        <p>
          For questions about these terms, contact us at{' '}
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
