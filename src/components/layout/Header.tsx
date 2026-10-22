import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import "../../styles/global.css";
import "../../styles/tokens.css";
import "./Header.css";
import { BRAND } from '../../data/brand';
import { SERVICES } from '../../data/services';

const NAV_ITEMS = [
  { name: 'Home', to: '/' },
  { name: 'Specialties', to: '/specialties' },
  { name: 'How It Works', to: '/how-it-works' },
  { name: 'Resources', to: '/resources' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const dropdownId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const isServicesActive = location.pathname.startsWith('/services');

  // Close everything on navigation.
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Escape closes the dropdown and the mobile menu.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Close the mobile menu when clicking outside of the header.
  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [mobileOpen]);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  }, []);

  const closeDropdownNow = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(false);
  }, []);

  const onDropdownKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setServicesOpen(true);
      window.requestAnimationFrame(() => {
        const first = document.querySelector<HTMLAnchorElement>(
          `#${CSS.escape(dropdownId)} a[href]`,
        );
        first?.focus();
      });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setServicesOpen(false);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner container-wide">
        <div className="header__brand">
          <Link to="/" className="header__logo" aria-label={`${BRAND.name} home`}>
            <span className="logo__text">{BRAND.name.replace(/RCM$/, "")}</span>
            <span className="logo__accent">RCM</span>
          </Link>
        </div>

        <nav className="header__nav" aria-label="Main">
          <ul className="header__nav-list">
            <li
              className="header__nav-item header__nav-item--has-dropdown"
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
              onKeyDown={onDropdownKeyDown}
            >
              <button
                type="button"
                className={`header__nav-link header__nav-trigger ${
                  isServicesActive ? 'header__nav-link--active' : ''
                }`}
                aria-expanded={servicesOpen}
                aria-controls={dropdownId}
                aria-haspopup="true"
                onClick={() => setServicesOpen((open) => !open)}
                onFocus={openDropdown}
              >
                Services
                <ChevronDown
                  className={`header__chevron ${servicesOpen ? 'header__chevron--open' : ''}`}
                  size={14}
                  aria-hidden="true"
                />
              </button>

              <div
                id={dropdownId}
                className={`header__dropdown ${servicesOpen ? 'header__dropdown--open' : ''}`}
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
                hidden={!servicesOpen}
              >
                <ul className="header__dropdown-list">
                  {SERVICES.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={service.href}
                        className="header__dropdown-link"
                        onClick={closeDropdownNow}
                      >
                        <span className="header__dropdown-title">{service.name}</span>
                        <span className="header__dropdown-desc">{service.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="header__dropdown-all"
                  onClick={closeDropdownNow}
                >
                  View all services
                </Link>
              </div>
            </li>

            {NAV_ITEMS.map((item) => (
              <li key={item.name} className="header__nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                  }
                  end={item.to === '/'}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Link to="/request-a-quote" className="btn btn--primary btn--sm header__cta">
            Request a Quote
          </Link>
          <button
            type="button"
            className="header__menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`header__mobile-menu ${mobileOpen ? 'header__mobile-menu--open' : ''}`}
        hidden={!mobileOpen}
      >
        <div className="header__mobile-header">
          <span className="header__mobile-title">Menu</span>
          <button
            type="button"
            className="header__mobile-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="header__mobile-list">
            <li className="header__mobile-list-item">
              <button
                type="button"
                className="header__mobile-link header__mobile-toggle"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((open) => !open)}
              >
                Services
                <ChevronDown
                  className={`header__chevron ${mobileServicesOpen ? 'header__chevron--open' : ''}`}
                  size={16}
                  aria-hidden="true"
                />
              </button>
              <ul
                className={`header__mobile-sublist ${
                  mobileServicesOpen ? 'header__mobile-sublist--open' : ''
                }`}
                hidden={!mobileServicesOpen}
              >
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link to={service.href} className="header__mobile-sublink">
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services" className="header__mobile-sublink">
                    View all services
                  </Link>
                </li>
              </ul>
            </li>

            {NAV_ITEMS.map((item) => (
              <li key={item.name} className="header__mobile-list-item">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `header__mobile-link ${isActive ? 'header__mobile-link--active' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/request-a-quote"
          className="btn btn--primary btn--md header__mobile-cta"
        >
          Request a Quote
        </Link>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
