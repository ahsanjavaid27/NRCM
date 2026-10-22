import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/tokens.css";
import "./Footer.css";
import { BRAND } from "../../data/brand";

type FooterProps = {
  className?: string;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  socialLinks?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

export default function Footer({
  className,
  contact,
  socialLinks,
}: FooterProps) {
  const resolvedContact = {
    phone: contact?.phone ?? BRAND.contact.phone,
    email: contact?.email ?? BRAND.contact.email,
    address: contact?.address ?? BRAND.contact.address,
    hours: contact?.hours ?? BRAND.contact.hours,
  };

  const resolvedSocialLinks =
    socialLinks ??
    [
      { label: "LinkedIn", href: BRAND.social.linkedin, external: true },
      { label: "Twitter", href: BRAND.social.twitter, external: true },
    ];

  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="footer__container container-wide">
        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="logo__text">{BRAND.name.replace(/RCM$/, "")}</span>
            <span className="logo__accent">RCM</span>
          </Link>
          <p className="footer__description">
            Medical billing and revenue cycle management for US healthcare
            providers. We help practices build reliable billing workflows,
            reduce avoidable rework, and keep revenue operations visible.
          </p>
          <ul className="footer__social">
            {resolvedSocialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="footer__social-link"
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer noopener" : undefined}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        <nav className="footer__column" aria-label="Company">
          <h2 className="footer__heading">Company</h2>
          <ul className="footer__nav">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/specialties">Specialties</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </nav>

        <nav className="footer__column" aria-label="Services">
          <h2 className="footer__heading">Services</h2>
          <ul className="footer__nav">
            <li><Link to="/services/medical-billing">Medical Billing</Link></li>
            <li>
              <Link to="/services/revenue-cycle-management">
                Revenue Cycle Management
              </Link>
            </li>
            <li><Link to="/services/claims-management">Claims Management</Link></li>
            <li><Link to="/services/denial-management">Denial Management</Link></li>
            <li><Link to="/services/credentialing">Credentialing</Link></li>
          </ul>
        </nav>

        <nav className="footer__column" aria-label="Resources">
          <h2 className="footer__heading">Resources</h2>
          <ul className="footer__nav">
            <li>
              <Link to="/resources/medical-billing-basics">
                Medical Billing Basics
              </Link>
            </li>
            <li>
              <Link to="/resources/understanding-claim-denials">
                Understanding Claim Denials
              </Link>
            </li>
            <li>
              <Link to="/resources/revenue-cycle-management">
                Revenue Cycle Management
              </Link>
            </li>
            <li><Link to="/resources">Resource Center</Link></li>
          </ul>
        </nav>

        {/* Contact column */}
        <div className="footer__column footer__column--contact">
          <h2 className="footer__heading">Contact</h2>
          <address className="footer__contact">
            <a href={`tel:${resolvedContact.phone.replace(/[^\d+]/g, "")}`}>
              {resolvedContact.phone}
            </a>
            <a href={`mailto:${resolvedContact.email}`}>{resolvedContact.email}</a>
            <span className="footer__address">{resolvedContact.address}</span>
            <span className="footer__hours">{resolvedContact.hours}</span>
          </address>
          <Link to="/request-a-quote" className="btn btn--accent btn--sm footer__cta">
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container-wide">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="footer__legal">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
