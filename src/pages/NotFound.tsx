import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="page page--not-found">
      <SectionHeading title="404" subtitle="Page not found" />
      <p className="not-found__text">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="not-found__actions">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
        <Link to="/services">
          <Button variant="secondary">Explore Services</Button>
        </Link>
      </div>
    </div>
  );
}
