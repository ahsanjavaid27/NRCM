import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useLocation, Link, NavLink, useParams, BrowserRouter, Routes, Route } from "react-router-dom";
import { useId, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, Menu, X, ArrowRight, ShieldAlert, CheckCircle, Clock, UserCheck, CreditCard, Send, Activity, FileText, TrendingUp, AlertCircle, Check, ChevronLeft, ChevronRight, Search, Phone, Mail, MapPin, AlertTriangle, CheckCircle2, ArrowLeft, Loader2, Info } from "lucide-react";
import { useReducedMotion, motion } from "motion/react";
const BRAND = {
  name: "NexaRCM",
  contact: {
    phone: "+1 (800) 555-0123",
    email: "hello@nexarcm.com",
    address: "123 Healthcare Plaza, Boston, MA 02108",
    hours: "Mon-Fri: 9AM - 6PM EST"
  },
  social: {
    linkedin: "https://linkedin.com/company/nexarcm",
    twitter: "https://twitter.com/nexarcm"
  }
};
const SERVICES = [
  {
    id: "medical-billing",
    name: "Medical Billing",
    summary: "End-to-end medical billing services including charge entry, claim submission, payment posting, and patient billing support.",
    icon: "FileText",
    confirmed: true,
    href: "/services/medical-billing"
  },
  {
    id: "revenue-cycle-management",
    name: "Revenue Cycle Management",
    summary: "Full revenue cycle oversight from patient registration through final payment, helping practices maintain healthy cash flow.",
    icon: "Activity",
    confirmed: true,
    href: "/services/revenue-cycle-management"
  },
  {
    id: "denial-management",
    name: "Denial Management & Appeals",
    summary: "Denial tracking, root-cause analysis, appeal letter preparation, and resubmission workflows.",
    icon: "ShieldAlert",
    confirmed: true,
    href: "/services/denial-management"
  },
  {
    id: "claims-management",
    name: "Claims Submission & Tracking",
    summary: "Electronic claims submission, real-time status tracking, and payer-specific follow-up.",
    icon: "Send",
    confirmed: true,
    href: "/services/claims-management"
  },
  {
    id: "payment-posting",
    name: "Payment Posting & Reconciliation",
    summary: "Accurate payment posting, ERA/EOB processing, and bank reconciliation.",
    icon: "CreditCard",
    confirmed: true,
    href: "/services/payment-posting"
  },
  {
    id: "eligibility-verification",
    name: "Insurance Eligibility Verification",
    summary: "Real-time eligibility checks to confirm patient coverage before services are rendered.",
    icon: "CheckCircle",
    confirmed: true,
    href: "/services/eligibility-verification"
  },
  {
    id: "credentialing",
    name: "Medical Credentialing",
    summary: "Provider enrollment and credentialing support with insurance payers. Service availability subject to business confirmation.",
    icon: "UserCheck",
    confirmed: false,
    href: "/services/credentialing"
  },
  {
    id: "accounts-receivable",
    name: "Accounts Receivable Follow-up",
    summary: "Proactive A/R aging review, payer follow-up, and patient statement management.",
    icon: "Clock",
    confirmed: true,
    href: "/services/accounts-receivable"
  }
];
const NAV_ITEMS = [
  { name: "Home", to: "/" },
  { name: "Specialties", to: "/specialties" },
  { name: "How It Works", to: "/how-it-works" },
  { name: "Resources", to: "/resources" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" }
];
function Header() {
  const location = useLocation();
  const dropdownId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef(null);
  const headerRef = useRef(null);
  const isServicesActive = location.pathname.startsWith("/services");
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
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
  const onDropdownKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setServicesOpen(true);
      window.requestAnimationFrame(() => {
        const first = document.querySelector(
          `#${CSS.escape(dropdownId)} a[href]`
        );
        first == null ? void 0 : first.focus();
      });
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setServicesOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "header", ref: headerRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "header__inner container-wide", children: [
      /* @__PURE__ */ jsx("div", { className: "header__brand", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "header__logo", "aria-label": `${BRAND.name} home`, children: [
        /* @__PURE__ */ jsx("span", { className: "logo__text", children: BRAND.name.replace(/RCM$/, "") }),
        /* @__PURE__ */ jsx("span", { className: "logo__accent", children: "RCM" })
      ] }) }),
      /* @__PURE__ */ jsx("nav", { className: "header__nav", "aria-label": "Main", children: /* @__PURE__ */ jsxs("ul", { className: "header__nav-list", children: [
        /* @__PURE__ */ jsxs(
          "li",
          {
            className: "header__nav-item header__nav-item--has-dropdown",
            onMouseEnter: openDropdown,
            onMouseLeave: scheduleClose,
            onKeyDown: onDropdownKeyDown,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: `header__nav-link header__nav-trigger ${isServicesActive ? "header__nav-link--active" : ""}`,
                  "aria-expanded": servicesOpen,
                  "aria-controls": dropdownId,
                  "aria-haspopup": "true",
                  onClick: () => setServicesOpen((open) => !open),
                  onFocus: openDropdown,
                  children: [
                    "Services",
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: `header__chevron ${servicesOpen ? "header__chevron--open" : ""}`,
                        size: 14,
                        "aria-hidden": "true"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  id: dropdownId,
                  className: `header__dropdown ${servicesOpen ? "header__dropdown--open" : ""}`,
                  onMouseEnter: openDropdown,
                  onMouseLeave: scheduleClose,
                  hidden: !servicesOpen,
                  children: [
                    /* @__PURE__ */ jsx("ul", { className: "header__dropdown-list", children: SERVICES.map((service) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: service.href,
                        className: "header__dropdown-link",
                        onClick: closeDropdownNow,
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "header__dropdown-title", children: service.name }),
                          /* @__PURE__ */ jsx("span", { className: "header__dropdown-desc", children: service.summary })
                        ]
                      }
                    ) }, service.id)) }),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: "/services",
                        className: "header__dropdown-all",
                        onClick: closeDropdownNow,
                        children: "View all services"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        NAV_ITEMS.map((item) => /* @__PURE__ */ jsx("li", { className: "header__nav-item", children: /* @__PURE__ */ jsx(
          NavLink,
          {
            to: item.to,
            className: ({ isActive }) => `header__nav-link ${isActive ? "header__nav-link--active" : ""}`,
            end: item.to === "/",
            children: item.name
          }
        ) }, item.name))
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "header__actions", children: [
        /* @__PURE__ */ jsx(Link, { to: "/request-a-quote", className: "btn btn--primary btn--sm header__cta", children: "Request a Quote" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "header__menu-toggle",
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            "aria-expanded": mobileOpen,
            "aria-controls": "mobile-menu",
            onClick: () => setMobileOpen((open) => !open),
            children: /* @__PURE__ */ jsx(Menu, { size: 22 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: "mobile-menu",
        className: `header__mobile-menu ${mobileOpen ? "header__mobile-menu--open" : ""}`,
        hidden: !mobileOpen,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "header__mobile-header", children: [
            /* @__PURE__ */ jsx("span", { className: "header__mobile-title", children: "Menu" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "header__mobile-close",
                "aria-label": "Close menu",
                onClick: () => setMobileOpen(false),
                children: /* @__PURE__ */ jsx(X, { size: 22 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "Mobile", children: /* @__PURE__ */ jsxs("ul", { className: "header__mobile-list", children: [
            /* @__PURE__ */ jsxs("li", { className: "header__mobile-list-item", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "header__mobile-link header__mobile-toggle",
                  "aria-expanded": mobileServicesOpen,
                  onClick: () => setMobileServicesOpen((open) => !open),
                  children: [
                    "Services",
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: `header__chevron ${mobileServicesOpen ? "header__chevron--open" : ""}`,
                        size: 16,
                        "aria-hidden": "true"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "ul",
                {
                  className: `header__mobile-sublist ${mobileServicesOpen ? "header__mobile-sublist--open" : ""}`,
                  hidden: !mobileServicesOpen,
                  children: [
                    SERVICES.map((service) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: service.href, className: "header__mobile-sublink", children: service.name }) }, service.id)),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services", className: "header__mobile-sublink", children: "View all services" }) })
                  ]
                }
              )
            ] }),
            NAV_ITEMS.map((item) => /* @__PURE__ */ jsx("li", { className: "header__mobile-list-item", children: /* @__PURE__ */ jsx(
              NavLink,
              {
                to: item.to,
                end: item.to === "/",
                className: ({ isActive }) => `header__mobile-link ${isActive ? "header__mobile-link--active" : ""}`,
                children: item.name
              }
            ) }, item.name))
          ] }) }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/request-a-quote",
              className: "btn btn--primary btn--md header__mobile-cta",
              children: "Request a Quote"
            }
          )
        ]
      }
    ),
    mobileOpen && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "header__backdrop",
        "aria-label": "Close menu",
        onClick: () => setMobileOpen(false)
      }
    )
  ] });
}
function Footer({
  className,
  contact,
  socialLinks
}) {
  const resolvedContact = {
    phone: (contact == null ? void 0 : contact.phone) ?? BRAND.contact.phone,
    email: (contact == null ? void 0 : contact.email) ?? BRAND.contact.email,
    address: (contact == null ? void 0 : contact.address) ?? BRAND.contact.address,
    hours: (contact == null ? void 0 : contact.hours) ?? BRAND.contact.hours
  };
  const resolvedSocialLinks = socialLinks ?? [
    { label: "LinkedIn", href: BRAND.social.linkedin, external: true },
    { label: "Twitter", href: BRAND.social.twitter, external: true }
  ];
  return /* @__PURE__ */ jsxs("footer", { className: `footer ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs("div", { className: "footer__container container-wide", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer__brand", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "footer__logo", children: [
          /* @__PURE__ */ jsx("span", { className: "logo__text", children: BRAND.name.replace(/RCM$/, "") }),
          /* @__PURE__ */ jsx("span", { className: "logo__accent", children: "RCM" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "footer__description", children: "Medical billing and revenue cycle management for US healthcare providers. We help practices build reliable billing workflows, reduce avoidable rework, and keep revenue operations visible." }),
        /* @__PURE__ */ jsx("ul", { className: "footer__social", children: resolvedSocialLinks.map((social) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: social.href,
            className: "footer__social-link",
            target: social.external ? "_blank" : void 0,
            rel: social.external ? "noreferrer noopener" : void 0,
            children: social.label
          }
        ) }, social.label)) })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "footer__column", "aria-label": "Company", children: [
        /* @__PURE__ */ jsx("h2", { className: "footer__heading", children: "Company" }),
        /* @__PURE__ */ jsxs("ul", { className: "footer__nav", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/how-it-works", children: "How It Works" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/specialties", children: "Specialties" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/faq", children: "FAQ" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "footer__column", "aria-label": "Services", children: [
        /* @__PURE__ */ jsx("h2", { className: "footer__heading", children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "footer__nav", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services/medical-billing", children: "Medical Billing" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services/revenue-cycle-management", children: "Revenue Cycle Management" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services/claims-management", children: "Claims Management" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services/denial-management", children: "Denial Management" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services/credentialing", children: "Credentialing" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "footer__column", "aria-label": "Resources", children: [
        /* @__PURE__ */ jsx("h2", { className: "footer__heading", children: "Resources" }),
        /* @__PURE__ */ jsxs("ul", { className: "footer__nav", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/medical-billing-basics", children: "Medical Billing Basics" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/understanding-claim-denials", children: "Understanding Claim Denials" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/revenue-cycle-management", children: "Revenue Cycle Management" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources", children: "Resource Center" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer__column footer__column--contact", children: [
        /* @__PURE__ */ jsx("h2", { className: "footer__heading", children: "Contact" }),
        /* @__PURE__ */ jsxs("address", { className: "footer__contact", children: [
          /* @__PURE__ */ jsx("a", { href: `tel:${resolvedContact.phone.replace(/[^\d+]/g, "")}`, children: resolvedContact.phone }),
          /* @__PURE__ */ jsx("a", { href: `mailto:${resolvedContact.email}`, children: resolvedContact.email }),
          /* @__PURE__ */ jsx("span", { className: "footer__address", children: resolvedContact.address }),
          /* @__PURE__ */ jsx("span", { className: "footer__hours", children: resolvedContact.hours })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/request-a-quote", className: "btn btn--accent btn--sm footer__cta", children: "Request a Quote" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "footer__bottom", children: /* @__PURE__ */ jsxs("div", { className: "footer__bottom-inner container-wide", children: [
      /* @__PURE__ */ jsxs("p", { className: "footer__copyright", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        BRAND.name,
        ". All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "Legal", children: /* @__PURE__ */ jsxs("ul", { className: "footer__legal", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacy", children: "Privacy Policy" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/terms", children: "Terms of Use" }) })
      ] }) })
    ] }) })
  ] });
}
function PageTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  if (reduceMotion || typeof window === "undefined") {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      children
    },
    location.pathname
  );
}
function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
}
function Layout({ children }) {
  useScrollToTop();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("a", { className: "skip-link", href: "#main", children: "Skip to main content" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { id: "main", children: /* @__PURE__ */ jsx(PageTransition, { children }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const SPECIALTIES$1 = [
  {
    id: "primary-care",
    name: "Primary Care",
    description: "Billing support for family medicine, internal medicine, and general practice settings.",
    icon: "Stethoscope",
    confirmed: false
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Specialized billing for cardiovascular practices including procedure-specific coding.",
    icon: "Heart",
    confirmed: false
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Revenue cycle support for orthopedic surgery and sports medicine practices.",
    icon: "Bone",
    confirmed: false
  },
  {
    id: "mental-health",
    name: "Mental Health",
    description: "Billing and claims support for behavioral health, psychiatry, and therapy practices.",
    icon: "Brain",
    confirmed: false
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Specialized billing support for dermatology and skin care practices.",
    icon: "CircleDot",
    confirmed: false
  },
  {
    id: "urgent-care",
    name: "Urgent Care",
    description: "High-volume billing support for urgent care and walk-in clinic environments.",
    icon: "Activity",
    confirmed: false
  },
  {
    id: "multispecialty",
    name: "Multispecialty Practices",
    description: "Coordinated revenue cycle management for practices with multiple specialties under one roof.",
    icon: "Building",
    confirmed: false
  }
];
const FAQS = [
  {
    id: "faq-1",
    question: "What is revenue cycle management?",
    answer: "Revenue cycle management (RCM) is the financial process that healthcare providers use to track patient care episodes from registration and appointment scheduling to the final payment of a balance. It includes charge capture, claim submission, payment posting, denial management, and patient billing.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "Does NexaRCM collect protected health information through this website?",
    answer: "No. Our marketing website collects business inquiry information only, such as your name, practice name, email, and phone number. We do not collect patient names, medical records, diagnoses, dates of birth, insurance member IDs, or claim documents through this site.",
    category: "privacy"
  },
  {
    id: "faq-3",
    question: "Is NexaRCM HIPAA-compliant?",
    answer: "We do not claim HIPAA compliance simply because we use HTTPS or have a privacy policy. If you engage us for billing services, we will provide details about our security practices and compliance posture separately. This website is a marketing site and does not process protected health information.",
    category: "privacy"
  },
  {
    id: "faq-4",
    question: "What specialties does NexaRCM support?",
    answer: "We support a range of specialties including primary care, cardiology, orthopedics, mental health, dermatology, urgent care, and multispecialty practices. Specialty availability is subject to business confirmation - please contact us to confirm support for your specific specialty.",
    category: "services"
  },
  {
    id: "faq-5",
    question: "How do I get started?",
    answer: "Request a consultation or submit a quote request through our contact or quote pages. We will review your practice needs and discuss next steps. No protected health information is needed for the initial inquiry.",
    category: "getting-started"
  },
  {
    id: "faq-6",
    question: "Does NexaRCM guarantee revenue increases?",
    answer: "No. We do not make unsupported guarantees about revenue increases or specific financial outcomes. Our services are designed to support efficient billing and claims workflows, but actual results depend on many factors including payer mix, practice volume, and existing processes.",
    category: "services"
  },
  {
    id: "faq-7",
    question: "How long does onboarding take?",
    answer: "Onboarding timelines vary by practice size and complexity. After your initial consultation, we will provide a tailored onboarding plan with estimated timelines.",
    category: "onboarding"
  },
  {
    id: "faq-8",
    question: "What happens if a claim is denied?",
    answer: "Denied claims are tracked, analyzed for root cause, and resubmitted with corrections when appropriate. Our denial management service includes appeal letter preparation and payer follow-up.",
    category: "services"
  }
];
function useReveal(options = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}
const classNames = (...values) => values.filter(Boolean).join(" ");
function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  className,
  ariaLabel
}) {
  const classes = classNames(
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    className
  );
  if (to) {
    return /* @__PURE__ */ jsx(Link, { to, className: classes, "aria-label": ariaLabel, onClick, children });
  }
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: classes,
        "aria-label": ariaLabel,
        target: href.startsWith("http") ? "_blank" : void 0,
        rel: href.startsWith("http") ? "noreferrer noopener" : void 0,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: classes,
      onClick,
      disabled,
      "aria-label": ariaLabel,
      children
    }
  );
}
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  center = false
}) {
  const cls = [
    "section-heading",
    center ? "section-heading--center" : null,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: cls, children: [
    eyebrow && /* @__PURE__ */ jsx("span", { className: "eyebrow section-heading__eyebrow", children: eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "h2", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "lead", children: subtitle })
  ] });
}
const ICONS = {
  FileText,
  Activity,
  ShieldAlert,
  Send,
  CreditCard,
  CheckCircle,
  UserCheck,
  Clock
};
const APPROACH = [
  {
    title: "One accountable team",
    body: "The same people own intake, claims, denials, posting, and patient balances. Nothing falls between handoffs, because there are no handoffs to fall through."
  },
  {
    title: "Visibility before optimisation",
    body: "We report on the state of the cycle before proposing changes. A workflow cannot be improved until it is measured, and it cannot be measured until it is visible."
  },
  {
    title: "Prevention over recovery",
    body: "Recovering a denied claim costs far more than never sending a claim that would have been denied. Most of our work is upstream of the claim."
  },
  {
    title: "Your systems, not ours",
    body: "We build operations around the practice management and EHR systems you already run wherever possible, so adoption does not become a second project."
  }
];
const HOME_FAQS = FAQS.filter(
  (item) => ["faq-1", "faq-2", "faq-5", "faq-6"].includes(item.id)
);
function Home() {
  const { ref, isVisible } = useReveal();
  return /* @__PURE__ */ jsxs("div", { className: "home", children: [
    /* @__PURE__ */ jsx("section", { className: "hero", children: /* @__PURE__ */ jsxs("div", { className: "container hero__inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "hero__copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow hero__eyebrow", children: "Medical Billing & Revenue Cycle Management" }),
        /* @__PURE__ */ jsxs("h1", { className: "hero__title", children: [
          "Revenue operations your practice can",
          /* @__PURE__ */ jsx("span", { className: "hero__title-accent", children: " actually rely on" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "lead hero__lede", children: "We run the billing function for US healthcare practices — claims, denials, posting, and patient balances — with the reporting and discipline to keep it improving after we get there." }),
        /* @__PURE__ */ jsxs("div", { className: "hero__actions", children: [
          /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "lg", children: [
            "Request a Consultation",
            /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
          ] }),
          /* @__PURE__ */ jsx(Button, { to: "/services", variant: "secondary", size: "lg", children: "Explore Our Services" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "hero__note", children: [
          /* @__PURE__ */ jsx(ShieldAlert, { size: 15, "aria-hidden": "true" }),
          "Business inquiries only. No patient information is collected through this site."
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hero__visual", children: /* @__PURE__ */ jsx(RevenueDashboard, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "strip", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("ul", { className: "strip__list", children: [
      "Full-cycle ownership",
      "Payer-specific follow-up",
      "Denial root-cause analysis",
      "Reporting you can act on"
    ].map((item) => /* @__PURE__ */ jsxs("li", { className: "strip__item", children: [
      /* @__PURE__ */ jsx(CheckCircle, { size: 16, "aria-hidden": "true" }),
      item
    ] }, item)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section", id: "services", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-head", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Services" }),
          /* @__PURE__ */ jsx("h2", { className: "h2", children: "Eight functions, one revenue cycle" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "section-head__aside", children: "Each service has its own page, its own scope, and its own accountability. Take the ones you need, or hand us the whole cycle." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "svc-grid", children: SERVICES.map((service) => {
        const Icon = ICONS[service.icon] ?? FileText;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: service.href,
            className: "svc-card",
            children: [
              /* @__PURE__ */ jsx("span", { className: "svc-card__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { size: 20 }) }),
              /* @__PURE__ */ jsx("span", { className: "svc-card__title", children: service.name }),
              /* @__PURE__ */ jsx("span", { className: "svc-card__body", children: service.summary }),
              /* @__PURE__ */ jsxs("span", { className: "svc-card__link", children: [
                service.confirmed ? "Explore service" : "Check availability",
                /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
              ] })
            ]
          },
          service.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section section--tint", id: "approach", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Our Approach",
          title: "How we work is the product",
          subtitle: "Billing software is widely available and rarely the constraint. The constraint is almost always operational — ownership, sequencing, and whether anyone is measuring the result."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "approach", ref, "data-reveal": isVisible ? "true" : void 0, children: APPROACH.map((item, index) => /* @__PURE__ */ jsxs("article", { className: "approach__item", children: [
        /* @__PURE__ */ jsx("span", { className: "approach__index", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("h3", { className: "h4 approach__title", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "approach__body", children: item.body })
      ] }, item.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Workflow",
          title: "From first call to steady state",
          subtitle: "Six phases, each with a clear deliverable and a clear owner."
        }
      ),
      /* @__PURE__ */ jsx("ol", { className: "flow", children: [
        { label: "Consultation", note: "Scope and goals" },
        { label: "Needs assessment", note: "Data review" },
        { label: "Onboarding", note: "Systems and training" },
        { label: "Billing operations", note: "Daily workflow" },
        { label: "Issue resolution", note: "Denials and A/R" },
        { label: "Reporting", note: "Improvement loop" }
      ].map((step, index) => /* @__PURE__ */ jsxs("li", { className: "flow__step", children: [
        /* @__PURE__ */ jsx("span", { className: "flow__marker", "aria-hidden": "true", children: index + 1 }),
        /* @__PURE__ */ jsx("span", { className: "flow__label", children: step.label }),
        /* @__PURE__ */ jsx("span", { className: "flow__note", children: step.note })
      ] }, step.label)) }),
      /* @__PURE__ */ jsx("div", { className: "flow__cta", children: /* @__PURE__ */ jsxs(Button, { to: "/how-it-works", variant: "secondary", size: "md", children: [
        "See the full process",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section section--tint", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "section-head", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Specialties" }),
          /* @__PURE__ */ jsx("h2", { className: "h2", children: "Specialties we support" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "section-head__aside", children: "Coverage varies by specialty and location. Every listing below is marked for confirmation until the business confirms it." })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "spec-grid", children: SPECIALTIES$1.map((specialty) => /* @__PURE__ */ jsxs("li", { className: "spec", children: [
        /* @__PURE__ */ jsx("span", { className: "spec__name", children: specialty.name }),
        /* @__PURE__ */ jsx("span", { className: "spec__desc", children: specialty.description })
      ] }, specialty.id)) }),
      /* @__PURE__ */ jsx("div", { className: "flow__cta", children: /* @__PURE__ */ jsxs(Button, { to: "/specialties", variant: "secondary", size: "md", children: [
        "View all specialties",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "faq-preview", children: [
      /* @__PURE__ */ jsxs("div", { className: "faq-preview__intro", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Common questions" }),
        /* @__PURE__ */ jsx("h2", { className: "h2", children: "What practices ask us first" }),
        /* @__PURE__ */ jsx("p", { className: "lead faq-preview__lede", children: "Straight answers on scope, privacy, and what working with us actually looks like." }),
        /* @__PURE__ */ jsxs(Button, { to: "/faq", variant: "ghost", size: "md", children: [
          "All questions",
          /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "faq-preview__list", children: HOME_FAQS.map((item) => /* @__PURE__ */ jsxs("li", { className: "faq-preview__item", children: [
        /* @__PURE__ */ jsx("h3", { className: "faq-preview__q", children: item.question }),
        /* @__PURE__ */ jsx("p", { className: "faq-preview__a", children: item.answer })
      ] }, item.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "cta", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "cta__inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "cta__copy", children: [
        /* @__PURE__ */ jsx("h2", { className: "h2", children: "Start with a conversation, not a contract" }),
        /* @__PURE__ */ jsx("p", { className: "lead", children: "Tell us what is not working. We will tell you what we think the problem is, what we would do about it, and what it would take." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cta__actions", children: [
        /* @__PURE__ */ jsx(Button, { to: "/request-a-quote", variant: "accent", size: "lg", children: "Request a Consultation" }),
        /* @__PURE__ */ jsx(Button, { to: "/contact", variant: "inverse", size: "lg", children: "Contact us" })
      ] })
    ] }) }) })
  ] });
}
function RevenueDashboard() {
  const bars = [42, 58, 51, 66, 74, 69, 82, 88];
  const rows = [
    { label: "Submitted", value: 1284, state: "ok" },
    { label: "Acknowledged", value: 1279, state: "ok" },
    { label: "In adjudication", value: 411, state: "wait" },
    { label: "Denied — working", value: 63, state: "alert" }
  ];
  return /* @__PURE__ */ jsxs("figure", { className: "dash", children: [
    /* @__PURE__ */ jsxs("figcaption", { className: "dash__caption", children: [
      /* @__PURE__ */ jsx("span", { className: "dash__caption-title", children: "Revenue cycle overview" }),
      /* @__PURE__ */ jsx("span", { className: "dash__caption-note", children: "Illustrative sample data" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dash__head", children: [
      /* @__PURE__ */ jsx("span", { className: "dash__head-label", children: "Claim volume" }),
      /* @__PURE__ */ jsxs("span", { className: "dash__head-trend", children: [
        /* @__PURE__ */ jsx(TrendingUp, { size: 14, "aria-hidden": "true" }),
        "Last 8 weeks"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "dash__chart", role: "img", "aria-label": "Illustrative bar chart showing claim volume rising over eight weeks", children: bars.map((height, index) => /* @__PURE__ */ jsx("span", { className: "dash__bar", style: { height: `${height}%` } }, index)) }),
    /* @__PURE__ */ jsx("ul", { className: "dash__rows", children: rows.map((row) => /* @__PURE__ */ jsxs("li", { className: `dash__row dash__row--${row.state}`, children: [
      /* @__PURE__ */ jsx("span", { className: "dash__row-label", children: row.label }),
      /* @__PURE__ */ jsx("span", { className: "dash__row-value", children: row.value.toLocaleString("en-US") }),
      /* @__PURE__ */ jsx("span", { className: "dash__row-icon", "aria-hidden": "true", children: row.state === "alert" ? /* @__PURE__ */ jsx(AlertCircle, { size: 15 }) : row.state === "wait" ? /* @__PURE__ */ jsx(Clock, { size: 15 }) : /* @__PURE__ */ jsx(CheckCircle, { size: 15 }) })
    ] }, row.label)) }),
    /* @__PURE__ */ jsx("p", { className: "dash__disclaimer", children: "Illustrative interface demonstration. Figures shown are sample data and are not results for any client." })
  ] });
}
function Breadcrumbs({
  items,
  className
}) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", className: `breadcrumbs ${className}`.trim(), children: /* @__PURE__ */ jsx("ol", { className: "breadcrumbs__list", children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "breadcrumbs__item", children: [
    index > 0 && /* @__PURE__ */ jsx("span", { className: "breadcrumbs__separator", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
      "svg",
      {
        width: "8",
        height: "8",
        viewBox: "0 0 8 8",
        fill: "none",
        stroke: "currentColor",
        children: /* @__PURE__ */ jsx("path", { d: "M1 1l6 6M1 7l6-6" })
      }
    ) }),
    /* @__PURE__ */ jsx(Link, { to: item.href, className: "breadcrumbs__link", children: item.name })
  ] }, item.name)) }) });
}
function Services() {
  return /* @__PURE__ */ jsxs("div", { className: "services-page", children: [
    /* @__PURE__ */ jsx("header", { className: "page-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Our Services",
          title: "Comprehensive revenue cycle solutions",
          subtitle: "Each service is scoped and priced on its own, and every one of them is designed to work inside the workflow you already have. Pick the functions you want us to take on, or hand us the whole cycle."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "services-grid-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "services__grid", children: SERVICES.map((service) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: `service-card ${service.confirmed ? "" : "service-card--unconfirmed"}`,
        children: [
          /* @__PURE__ */ jsxs("header", { className: "service-card__header", children: [
            /* @__PURE__ */ jsx("h2", { className: "service-card__title", children: service.name }),
            !service.confirmed && /* @__PURE__ */ jsx("span", { className: "service-card__flag", children: "Confirmation needed" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "service-card__summary", children: service.summary }),
          /* @__PURE__ */ jsxs(Link, { to: service.href, className: "service-card__link", children: [
            service.confirmed ? "Learn more" : "Check availability",
            /* @__PURE__ */ jsx(ArrowRight, { size: 15, "aria-hidden": "true" })
          ] })
        ]
      },
      service.id
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "services-note", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "services-note__inner", children: [
      /* @__PURE__ */ jsx("h2", { className: "h3", children: "A note on what we can confirm" }),
      /* @__PURE__ */ jsx("p", { children: "Services marked “confirmation needed” are part of our intended offering but are subject to business confirmation before they can be contracted. We flag them rather than listing them as available, because a commitment we cannot keep is worse than a question you ask us." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Need something not listed here?" }),
      /* @__PURE__ */ jsx("p", { className: "cta-section__text", children: "Most practices end up with a combination rather than a single service. Tell us what is not working and we will suggest what to take on first." }),
      /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "md", children: [
        "Request a Consultation",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] })
    ] }) })
  ] });
}
function Specialties() {
  return /* @__PURE__ */ jsxs("div", { className: "specialties-page", children: [
    /* @__PURE__ */ jsx("header", { className: "page-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "Specialties", href: "/specialties" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Medical Specialties",
          title: "Specialties we can support",
          subtitle: "Each specialty carries its own coding patterns, payer behaviour, and documentation expectations. These are the areas we are prepared to support — confirm availability for yours and we will set expectations properly."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "specialties-grid-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("ul", { className: "specialties__grid", children: SPECIALTIES$1.map((specialty, index) => /* @__PURE__ */ jsxs("li", { className: "specialty", children: [
      /* @__PURE__ */ jsxs("div", { className: "specialty__head", children: [
        /* @__PURE__ */ jsx("span", { className: "specialty__index", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("h2", { className: "specialty__title", children: specialty.name })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "specialty__desc", children: specialty.description }),
      /* @__PURE__ */ jsxs("div", { className: "specialty__foot", children: [
        /* @__PURE__ */ jsx("span", { className: "specialty__flag", children: "Availability subject to confirmation" }),
        /* @__PURE__ */ jsxs(Link, { to: "/request-a-quote", className: "specialty__link", children: [
          "Ask about this specialty",
          /* @__PURE__ */ jsx(ArrowRight, { size: 14, "aria-hidden": "true" })
        ] })
      ] })
    ] }, specialty.id)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "specialties-note", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "specialties-note__inner", children: [
      /* @__PURE__ */ jsx("h2", { className: "h3", children: "Why we ask rather than assume" }),
      /* @__PURE__ */ jsx("p", { children: "We would rather tell you that a specialty needs to be confirmed than imply an experience we have not verified. When you reach out about a specialty, we will tell you plainly whether we can support it and what the onboarding would look like for a practice like yours." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Don't see your specialty?" }),
      /* @__PURE__ */ jsx("p", { className: "cta-section__text", children: "We work with practices across a range of specialties and are always evaluating where we can add value. Ask us about yours." }),
      /* @__PURE__ */ jsxs(Button, { to: "/contact", variant: "primary", size: "md", children: [
        "Contact Us",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] })
    ] }) })
  ] });
}
const VALUES = [
  {
    title: "Clarity over claims",
    body: "We describe what we do, what we do not do, and what we need from you. If a part of your revenue cycle needs someone else, we will say so rather than stretch the scope of an agreement."
  },
  {
    title: "Measure before changing",
    body: "Every workflow change starts with understanding the current state. We would rather spend a week looking at the data than a month optimising the wrong thing."
  },
  {
    title: "Prevention before recovery",
    body: "Recovering a denied claim is more expensive than preventing it. We spend most of our effort upstream of submission, where the cost of correction is lowest."
  },
  {
    title: "Documentation as a deliverable",
    body: "Process notes, decision logs, and reporting are part of the work, not an extra. You should never have to guess why something was done a particular way."
  },
  {
    title: "Respect for clinical judgment",
    body: "Billing decisions touch clinical records. We work within the documentation as recorded and defer to clinical staff on clinical questions."
  },
  {
    title: "Reliable communication",
    body: "A named point of contact, a defined response time, and no surprises. If something slips, you hear about it from us before you notice it in a report."
  }
];
const COMMITMENTS = [
  {
    title: "Quality",
    points: [
      "Multi-layer review before claims are released",
      "Sample audits of posted payments and adjustments",
      "Denial trend analysis feeding back into upstream workflows",
      "Payer rule changes monitored and reflected in the process"
    ]
  },
  {
    title: "Communication",
    points: [
      "A named account contact for your practice",
      "A regular reporting cadence agreed at onboarding",
      "Escalation path for anything time-sensitive",
      "Written summaries of decisions that affect your revenue"
    ]
  },
  {
    title: "Security",
    points: [
      "Encrypted transmission for anything sent or received",
      "Role-based access to practice and billing data",
      "Access limited to personnel working on your account",
      "Documented handling procedures for incoming documentation"
    ]
  }
];
const TEAM = [
  {
    role: "Leadership",
    focus: "Service scope, pricing, and account ownership",
    detail: "Responsible for what is delivered and what is not."
  },
  {
    role: "Billing operations",
    focus: "Charge entry, coding review, and claim submission",
    detail: "Holds day-to-day responsibility for the claim pipeline."
  },
  {
    role: "Denial and A/R",
    focus: "Denial analysis, appeals, and balance follow-up",
    detail: "Works the accounts that require judgment and persistence."
  },
  {
    role: "Quality and compliance",
    focus: "Audit, payer policy, and process integrity",
    detail: "Checks that the work holds up on its own merits."
  }
];
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "about-page", children: [
    /* @__PURE__ */ jsx("header", { className: "page-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "About NexaRCM",
          title: "A billing partner, not a claims black box",
          subtitle: "We are a revenue cycle management company built around a simple idea: practices do better when the billing function is operated deliberately and the people running it can explain every decision."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section section--tint", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "mission", children: [
      /* @__PURE__ */ jsx("div", { className: "mission__label", children: /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Our mission" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mission__body", children: [
        /* @__PURE__ */ jsx("p", { className: "mission__statement", children: "To give independent medical practices the same level of financial discipline that large health systems invest in — without the overhead, the reporting lag, or the loss of visibility that comes with it." }),
        /* @__PURE__ */ jsx("p", { className: "mission__detail", children: "We take responsibility for the full revenue cycle, document what we do, and report on outcomes in terms a practice administrator can act on. Where a problem sits outside our scope, we say so early rather than late." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "story", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Our story" }),
        /* @__PURE__ */ jsx("h2", { className: "h2 story__title", children: "Started with the same problem our clients have" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "story__body", children: [
        /* @__PURE__ */ jsx("p", { children: "This section is a placeholder for the business's own origin story. It exists so the page structure is complete and the final copy can be written into it without touching the layout." }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("span", { className: "story__placeholder", children: [
          /* @__PURE__ */ jsx("strong", { children: "To be completed:" }),
          " the founding story, the circumstances that led to the company, and the reasoning behind the operating model described elsewhere on this page."
        ] }) }),
        /* @__PURE__ */ jsx("p", { children: "We would rather leave a clearly marked gap than fill it with a narrative that has not been confirmed by the business." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section section--tint", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Values",
          title: "Operating principles",
          subtitle: "These are the standards we hold the work to. They are written as principles rather than slogans because each one changes what we do day to day."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "values", children: VALUES.map((value) => /* @__PURE__ */ jsxs("article", { className: "value", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4 value__title", children: value.title }),
        /* @__PURE__ */ jsx("p", { className: "value__body", children: value.body })
      ] }, value.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "approach-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "approach-grid__intro", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow text-accent", children: "Service approach" }),
        /* @__PURE__ */ jsx("h2", { className: "h2", children: "How the work is structured" }),
        /* @__PURE__ */ jsx("p", { className: "lead", children: "The same sequence applies whether you engage us for one function or the whole cycle. Scope changes; discipline does not." })
      ] }),
      /* @__PURE__ */ jsx("ol", { className: "approach-grid__list", children: [
        {
          title: "We start with your data, not our pitch",
          body: "The practice needs assessment examines claims, denials, A/R, and payer mix before we propose anything. If the data does not support a change, we do not recommend it."
        },
        {
          title: "We integrate rather than replace",
          body: "Billing operations are built around the practice management and EHR systems you already run wherever possible. Replacing working infrastructure is rarely the answer."
        },
        {
          title: "We assign ownership",
          body: "Every function has a named owner and a defined handoff. Work does not sit in a queue because nobody was sure whose turn it was."
        },
        {
          title: "We report on the cycle, not the effort",
          body: "Days in A/R, clean claim rate, denial reasons, and collection performance. Activity numbers are easy to produce and hard to act on."
        },
        {
          title: "We improve continuously",
          body: "Payer policy changes constantly. The process is reviewed against those changes rather than left running on assumptions made at onboarding."
        }
      ].map((item, index) => /* @__PURE__ */ jsxs("li", { className: "approach-grid__item", children: [
        /* @__PURE__ */ jsx("span", { className: "approach-grid__index", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "h4", children: item.title }),
          /* @__PURE__ */ jsx("p", { children: item.body })
        ] })
      ] }, item.title)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section section--tint", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Commitments",
          title: "What we hold ourselves to",
          subtitle: "Specific, checkable commitments rather than general assurances."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "commitments", children: COMMITMENTS.map((group) => /* @__PURE__ */ jsxs("article", { className: "commitment", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4 commitment__title", children: group.title }),
        /* @__PURE__ */ jsx("ul", { className: "commitment__list", children: group.points.map((point) => /* @__PURE__ */ jsx("li", { children: point }, point)) })
      ] }, group.title)) }),
      /* @__PURE__ */ jsx("p", { className: "commitments__note", children: "These are working commitments for the service relationship. Formal security and compliance documentation is provided separately during contracting, and this marketing site does not itself claim HIPAA compliance." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Team",
          title: "Who does the work",
          subtitle: "Individual names, titles, and credentials are shown as placeholders until the business confirms them. The functional roles below are how the work is actually organised."
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "team", children: TEAM.map((member) => /* @__PURE__ */ jsxs("li", { className: "team-card", children: [
        /* @__PURE__ */ jsx("span", { className: "team-card__role", children: member.role }),
        /* @__PURE__ */ jsx("span", { className: "team-card__focus", children: member.focus }),
        /* @__PURE__ */ jsx("span", { className: "team-card__detail", children: member.detail }),
        /* @__PURE__ */ jsx("span", { className: "team-card__placeholder", children: "Profile placeholder — names and credentials to be confirmed" })
      ] }, member.role)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Let's talk about your practice" }),
      /* @__PURE__ */ jsx("p", { className: "cta-section__text", children: "Bring the questions you have about your own revenue cycle. We will answer them directly, including the ones about whether we are the right fit." }),
      /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "md", children: [
        "Request a Consultation",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] })
    ] }) })
  ] });
}
const STEPS$1 = [
  {
    number: 1,
    label: "Initial Consultation",
    title: "Initial Consultation",
    description: "We start with a thorough discovery call to understand your practice's specialty, current billing workflow, pain points, and goals. This helps us scope the right solution rather than defaulting to a package.",
    details: [
      "Practice profile and specialty review",
      "Current RCM workflow analysis",
      "Pain point identification",
      "Goal alignment and success criteria"
    ],
    duration: "Week 1"
  },
  {
    number: 2,
    label: "Needs Assessment",
    title: "Practice Needs Assessment",
    description: "Our team conducts a deep dive into your claims data, denial patterns, A/R aging, and payer mix to identify where revenue is being lost and what is worth fixing first.",
    details: [
      "Claims and denial audit",
      "A/R aging analysis",
      "Payer mix evaluation",
      "Revenue leakage identification"
    ],
    duration: "Weeks 1–2"
  },
  {
    number: 3,
    label: "Onboarding",
    title: "Onboarding & Workflow Setup",
    description: "We configure our systems to match your practice, integrate with your EHR or practice management system, set up clearinghouse connections, and train your staff on the new workflow.",
    details: [
      "EHR and practice management integration",
      "Clearinghouse and payer setup",
      "Workflow configuration",
      "Staff training sessions"
    ],
    duration: "Weeks 2–4"
  },
  {
    number: 4,
    label: "Billing & Claims",
    title: "Billing & Claims Workflow",
    description: "Day-to-day operations begin: charge entry, claim scrubbing, electronic submission, real-time status tracking, and proactive payer follow-up on anything that stalls.",
    details: [
      "Charge capture and entry",
      "Automated claim scrubbing",
      "Electronic submission",
      "Real-time tracking and follow-up"
    ],
    duration: "Ongoing"
  },
  {
    number: 5,
    label: "Issue Resolution",
    title: "Follow-Up & Issue Resolution",
    description: "Denials are tracked, analyzed for root cause, and resubmitted with corrections. A/R aging is reviewed on a set cadence. Patient statements are managed on your schedule.",
    details: [
      "Denial analysis and appeals",
      "Scheduled A/R review",
      "Patient statement management",
      "Payer escalation when needed"
    ],
    duration: "Ongoing"
  },
  {
    number: 6,
    label: "Reporting",
    title: "Reporting & Ongoing Improvement",
    description: "Monthly performance reports with actionable insights. Quarterly business reviews. Continuous workflow optimization based on the data and on payer rules that change without notice.",
    details: [
      "Monthly KPI reporting",
      "Quarterly business reviews",
      "Workflow optimization",
      "Payer policy monitoring"
    ],
    duration: "Ongoing"
  }
];
function HowItWorks() {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useReveal();
  const step = STEPS$1[active];
  const select = (index) => setActive(index);
  const previous = () => setActive((i) => Math.max(i - 1, 0));
  const next = () => setActive((i) => Math.min(i + 1, STEPS$1.length - 1));
  return /* @__PURE__ */ jsxs("div", { className: "how-it-works-page", children: [
    /* @__PURE__ */ jsx("header", { className: "page-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "How It Works", href: "/how-it-works" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Our Process",
          title: "How We Work With Your Practice",
          subtitle: "A structured, transparent approach that takes you from initial assessment to ongoing optimization — with clear milestones at every stage.",
          center: true
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "process-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "process-explorer", children: [
      /* @__PURE__ */ jsx("div", { className: "process-rail", role: "tablist", "aria-label": "Engagement phases", children: STEPS$1.map((item, index) => /* @__PURE__ */ jsxs(
        "button",
        {
          role: "tab",
          id: `process-tab-${item.number}`,
          "aria-selected": index === active,
          "aria-controls": `process-panel-${item.number}`,
          tabIndex: index === active ? 0 : -1,
          className: `process-rail__item ${index === active ? "process-rail__item--active" : ""} ${index < active ? "process-rail__item--done" : ""}`,
          onClick: () => select(index),
          onKeyDown: (event) => {
            var _a, _b;
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault();
              next();
              (_a = document.getElementById(`process-tab-${STEPS$1[Math.min(active + 1, STEPS$1.length - 1)].number}`)) == null ? void 0 : _a.focus();
            }
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault();
              previous();
              (_b = document.getElementById(`process-tab-${STEPS$1[Math.max(active - 1, 0)].number}`)) == null ? void 0 : _b.focus();
            }
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "process-rail__number", children: item.number }),
            /* @__PURE__ */ jsx("span", { className: "process-rail__label", children: item.label })
          ]
        },
        item.number
      )) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          role: "tabpanel",
          id: `process-panel-${step.number}`,
          "aria-labelledby": `process-tab-${step.number}`,
          className: "process-panel",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "eyebrow process-panel__eyebrow", children: [
              "Phase ",
              step.number,
              " of ",
              STEPS$1.length,
              " · ",
              step.duration
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "h2 process-panel__title", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "lead process-panel__description", children: step.description }),
            /* @__PURE__ */ jsx("ul", { className: "process-panel__list", children: step.details.map((detail) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { className: "process-panel__check", size: 16, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { children: detail })
            ] }, detail)) }),
            /* @__PURE__ */ jsxs("div", { className: "process-panel__nav", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: previous,
                  disabled: active === 0,
                  className: "process-panel__nav-btn",
                  children: [
                    /* @__PURE__ */ jsx(ChevronLeft, { size: 16, "aria-hidden": "true" }),
                    "Previous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "process-panel__counter", children: [
                active + 1,
                " / ",
                STEPS$1.length
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: next,
                  disabled: active === STEPS$1.length - 1,
                  className: "process-panel__nav-btn",
                  children: [
                    "Next",
                    /* @__PURE__ */ jsx(ChevronRight, { size: 16, "aria-hidden": "true" })
                  ]
                }
              )
            ] })
          ]
        },
        step.number
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "timeline-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "timeline", ref, "data-reveal": isVisible ? "true" : void 0, children: STEPS$1.map((item) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: `timeline-step ${item.number === active + 1 ? "timeline-step--current" : ""}`,
        onClick: () => select(item.number - 1),
        children: [
          /* @__PURE__ */ jsx("div", { className: "timeline__connector" }),
          /* @__PURE__ */ jsxs("div", { className: "timeline__content", children: [
            /* @__PURE__ */ jsx("div", { className: "timeline__number", children: item.number }),
            /* @__PURE__ */ jsxs("div", { className: "timeline__body", children: [
              /* @__PURE__ */ jsx("p", { className: "eyebrow timeline__duration", children: item.duration }),
              /* @__PURE__ */ jsx("h3", { className: "timeline__title", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "timeline__description", children: item.description }),
              /* @__PURE__ */ jsx("ul", { className: "timeline__details", children: item.details.map((detail) => /* @__PURE__ */ jsx("li", { children: detail }, detail)) })
            ] })
          ] })
        ]
      },
      item.number
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Ready to Begin?" }),
      /* @__PURE__ */ jsx("p", { className: "cta-section__text", children: "The first step is a conversation. No commitment, and no patient information required — just a clear understanding of what is possible for your practice." }),
      /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "md", children: [
        "Start Your Consultation",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] })
    ] }) })
  ] });
}
const ARTICLES = {
  "medical-billing-basics": {
    slug: "medical-billing-basics",
    title: "Medical Billing Basics",
    category: "Guides",
    readTime: "6 min read",
    summary: "A plain-language introduction to how medical billing works — from the encounter to the remittance.",
    disclaimer: "This article is general educational information for healthcare professionals. It is not legal, financial, or reimbursement advice, and it does not replace guidance from your payers, your compliance team, or your own counsel.",
    sections: [
      {
        heading: "What medical billing actually does",
        body: [
          "Medical billing is the process of turning a documented patient encounter into a payment. The work sits between clinical documentation and the payer, and its job is to make sure the two sides match — that the service that was performed is the service that was billed, and that it is billed in the format the payer will accept.",
          "When that process is clean, claims are paid on the first pass. When it is not, the cost shows up three ways: staff time spent reworking claims, delay before the money arrives, and balances that age out and are eventually written off."
        ]
      },
      {
        heading: "The four things a biller does",
        body: [
          "Most billing workflows collapse into four distinct responsibilities, and it helps to be able to name them."
        ],
        list: [
          "Charge capture and coding — turning the clinical record into billable line items using the appropriate CPT, HCPCS, and ICD-10 codes.",
          "Claim assembly and submission — building the claim in the format the payer requires and transmitting it electronically or on paper.",
          "Follow-up — tracking what happened to the claim after submission, and acting on rejections, denials, and non-responses.",
          "Payment posting and patient balance — applying what was paid against the right account and billing the patient what remains."
        ]
      },
      {
        heading: "Where practices lose money",
        body: [
          "Revenue loss in medical billing is rarely a single dramatic failure. It accumulates in small, ordinary ways that nobody is measuring closely enough to catch."
        ],
        list: [
          "Documentation that does not support the code that was billed. If the record does not describe the service, the claim is exposed to denial no matter how correct the coding was.",
          "Eligibility gaps. Coverage that was not active on the date of service rarely can be made active retroactively.",
          "Unworked denials. A denial that nobody picks up is functionally a write-off, even if the balance still shows as open.",
          "Underpayments. Contract variances are frequently posted out without anyone comparing them to the fee schedule.",
          "Authorization and referral requirements that were never checked before the service was rendered."
        ]
      },
      {
        heading: "The metrics worth watching",
        body: [
          "A practice does not need a large reporting operation to see whether its billing function is working. A short set of measures covers most of it."
        ],
        list: [
          "Clean claim rate — the share of claims accepted without rework on first submission.",
          "Days in accounts receivable — how long it takes for a billed service to become collected cash.",
          "Denial rate by reason — where rejections are concentrated, which tells you what to fix first.",
          "Net collection rate — the share of what was actually billed that was actually collected.",
          "A/R aging distribution — how much of the outstanding balance is still recoverable and how quickly it is being worked."
        ]
      },
      {
        heading: "What good looks like",
        body: [
          "A well-run billing function is boring, which is the point. Claims go out on a predictable cadence, rejections are caught and corrected the same day, denials are worked on a schedule, and the aging report is used as a work queue rather than a monthly document that gets filed away.",
          "If your team is spending significant time reworking claims, chasing status, or correcting patient statements, that is a workflow problem rather than a staffing problem. Fixing the workflow is usually cheaper than adding headcount to absorb it."
        ]
      }
    ]
  },
  "understanding-claim-denials": {
    slug: "understanding-claim-denials",
    title: "Understanding Claim Denials",
    category: "Guides",
    readTime: "7 min read",
    summary: "Why claims get denied, what the common reason codes actually mean, and how practices respond effectively.",
    disclaimer: "This article is general educational information for healthcare professionals. Reason codes, appeal windows, and payer rules vary and change. Verify specifics against your payer contracts and current guidance, and consult your compliance or legal team before acting on any of this material.",
    sections: [
      {
        heading: "Denial, rejection, and the difference that matters",
        body: [
          "A rejection is a technical refusal — the claim never reached the payer's adjudication system. Something was missing or malformed: no diagnosis code, invalid modifier, missing member identifier, a claim that did not pass a front-end edit. Rejected claims are relatively easy to fix, because the payer has told you exactly what was wrong.",
          "A denial is different. The claim was adjudicated, and the payer has decided it will not pay it as submitted. Denials are what most practices mean when they talk about denials, and they require actual analysis — reading the remittance, understanding the reason, and determining the right response."
        ]
      },
      {
        heading: "Common denial categories",
        body: [
          "Denial reasons cluster into a few families. Knowing which family a denial belongs to tells you who needs to act on it."
        ],
        list: [
          "Coverage and eligibility — coverage was not active on the date of service, the member was not found, or the service was not a covered benefit under the plan.",
          "Authorization and referral — a required prior authorization was absent, expired, or did not match the service billed.",
          "Coding and medical necessity — the diagnosis did not support the procedure, the modifier was incorrect, or a higher level of service was billed than was documented.",
          "Duplicate and bundling — the payer considered the claim a duplicate, or that a code should have been bundled into a related line.",
          "Coordination of benefits — the payer was not the primary payer, and the claim was processed against the wrong payer.",
          "Contract and fee schedule — the billed amount exceeded the contracted rate, or the service was not in the agreement."
        ]
      },
      {
        heading: "The two clocks that matter",
        body: [
          "Most denials carry a filing deadline and, separately, an appeal deadline. They are different deadlines, they are often different lengths, and missing one is frequently what turns a recoverable denial into a write-off."
        ],
        list: [
          "The corrected claim window — usually longer, and allows a claim to be resubmitted with the correction rather than formally appealed.",
          "The appeal window — usually shorter, and used when the claim itself was correct and the payer's determination is disputed."
        ]
      },
      {
        heading: "Choosing a response",
        body: [
          "Not every denial deserves an appeal. Working one that cannot succeed consumes effort that would be better spent on claims with real recovery potential. A useful triage asks three questions: was the service actually rendered, was it actually billable, and was the claim correct as submitted?",
          "If the answer to the first two is no, the denial is correct and should be written off cleanly rather than appealed. If the claim was correct, the denial is worth challenging within the window."
        ]
      },
      {
        heading: "Prevention beats recovery",
        body: [
          "Every denial represents work that was performed and then had to be undone. The more valuable measure is not how many denials you recovered, but how many you never generated.",
          "Denial reasons are highly concentrated. A practice that reviews denials by reason code each month will usually find that a small number of categories account for most of the loss — a missing authorization step, an inconsistent modifier, a documentation gap for one particular service. Those are workflow problems, and they are fixable at the source."
        ]
      }
    ]
  },
  "revenue-cycle-management": {
    slug: "revenue-cycle-management",
    title: "Revenue Cycle Management Explained",
    category: "Guides",
    readTime: "8 min read",
    summary: "A complete walkthrough of the revenue cycle — the seven stages between a scheduled visit and a collected balance.",
    disclaimer: "This article is general educational information for healthcare professionals. It is not legal, financial, or reimbursement advice. Benchmarks and best practices vary by specialty, payer mix, and practice size.",
    sections: [
      {
        heading: "What revenue cycle management covers",
        body: [
          "Revenue cycle management is the management of everything that happens to a patient balance between the moment a service is scheduled and the moment the last dollar is collected. It is a broader discipline than medical billing, because it includes the work on both sides of the payer — intake and patient balances, not just claims.",
          "Practices typically adopt it in one of two ways: as a complete outsourced function, or as a hybrid where internal staff keep some responsibilities and an external team takes the high-volume or specialized pieces."
        ]
      },
      {
        heading: "The seven stages",
        body: [
          "The cycle is usually described as a sequence. Each stage has its own failure modes, and most of them compound."
        ],
        list: [
          "Registration and scheduling — the patient's information is captured accurately and the visit is on the schedule.",
          "Eligibility and benefits verification — coverage is confirmed as active, and responsibility amounts and authorization requirements are identified.",
          "Charge capture — the documented encounter is converted into billable charges by someone who understands both the clinical record and the coding rules.",
          "Claim assembly and submission — the claim is built to payer specification, scrubbed, and transmitted.",
          "Adjudication and follow-up — the claim is tracked, and rejections, denials, and non-responses are worked actively.",
          "Payment posting and reconciliation — money received is applied to the right accounts, and variances are caught.",
          "Patient balance and collection — what remains is billed to the patient, followed up, and resolved or written off deliberately."
        ]
      },
      {
        heading: "Why handoffs are the real risk",
        body: [
          "Most revenue problems are not caused by a stage failing outright. They happen in the gaps between stages — a verification result that never reaches the person building the claim, a payment posted to the wrong account, a denial that sits in a queue nobody owns.",
          "The practical conclusion is that the model matters more than the tooling. A practice with a clean process and a modest toolset will usually outperform one with sophisticated software and unclear ownership."
        ]
      },
      {
        heading: "Choosing what to outsource",
        body: [
          "The right split depends on where the pain actually is, which is usually not where the practice assumes it is."
        ],
        list: [
          "If claims are being rejected and reworked, the problem is likely upstream in coding and documentation alignment — outsourcing claim submission alone will not fix it.",
          "If denials are not being worked, the highest-leverage engagement is denial management and appeals.",
          "If patient balances are not being collected, the gap is in statements and follow-up rather than payer-side work.",
          "If nobody can say where the money is sitting, the first step is reporting, not outsourcing — a team needs visibility before it can be held accountable."
        ]
      },
      {
        heading: "The reporting that makes it manageable",
        body: [
          "Full RCM should come with a defined reporting cadence, not just a service. The measures that matter most are days in A/R, clean claim rate, denial rate by reason, net collection rate, and A/R aging distribution.",
          "The reason to insist on these is that they describe the system rather than the effort. Activity metrics — claims touched, calls made — are easy to inflate and hard to interpret. Cycle measures are slower to move and much more useful for deciding what to change."
        ]
      }
    ]
  }
};
const ARTICLE_ORDER = [
  "medical-billing-basics",
  "understanding-claim-denials",
  "revenue-cycle-management"
];
const TERMINOLOGY = [
  {
    term: "Claim Denial",
    definition: "A claim a payer has returned without payment, usually for a specific reason code that can be corrected or appealed."
  },
  {
    term: "ERA / EOB",
    definition: "Electronic Remittance Advice or Explanation of Benefits — the payer document explaining how a claim was adjudicated."
  },
  {
    term: "A/R Aging",
    definition: "A report grouping outstanding balances by how long they have remained unpaid."
  },
  {
    term: "Charge Capture",
    definition: "Recording a billable service so it can be turned into a claim."
  },
  {
    term: "Claim Scrubbing",
    definition: "Reviewing a claim against payer rules before submission to catch errors and reduce rejections."
  },
  {
    term: "Clean Claim Rate",
    definition: "The share of claims accepted by the payer on first submission without rework."
  },
  {
    term: "Days in A/R",
    definition: "Average number of days between a charge being billed and the balance being collected."
  },
  {
    term: "Payer Mix",
    definition: "The proportion of a practice's patient volume covered by each insurance payer."
  },
  {
    term: "Timely Filing",
    definition: "The window within which a claim must be submitted, set by the payer or by contract."
  },
  {
    term: "Net Collection Rate",
    definition: "The share of total charges that was actually collected, after contractual adjustments."
  }
];
const GUIDES = ARTICLE_ORDER.map((slug) => ARTICLES[slug]);
function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(GUIDES.map((guide) => guide.category)))],
    []
  );
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return GUIDES.filter((guide) => {
      const matchesQuery = term.length === 0 || guide.title.toLowerCase().includes(term) || guide.summary.toLowerCase().includes(term) || guide.sections.some(
        (section) => section.heading.toLowerCase().includes(term)
      );
      const matchesCategory = category === "all" || guide.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);
  return /* @__PURE__ */ jsxs("div", { className: "resources-page", children: [
    /* @__PURE__ */ jsx("header", { className: "page-header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "Resources", href: "/resources" }
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Resource Center",
          title: "Practical education for practice administrators",
          subtitle: "Original guides on billing, denials, and revenue cycle operations — written for the people who actually run the numbers. These are educational resources, not legal, financial, or reimbursement advice."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "filters-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "filters", children: [
      /* @__PURE__ */ jsxs("div", { className: "search", children: [
        /* @__PURE__ */ jsx(Search, { className: "search__icon", size: 17, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "search",
            placeholder: "Search guides and terminology",
            value: query,
            onChange: (event) => setQuery(event.target.value),
            "aria-label": "Search resources"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "filters__chips", role: "group", "aria-label": "Filter by category", children: categories.map((item) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setCategory(item),
          "aria-pressed": category === item,
          className: `chip ${category === item ? "chip--active" : ""}`,
          children: item === "all" ? "All" : item
        },
        item
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "guides-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "guides-head", children: [
        /* @__PURE__ */ jsx("h2", { className: "h3", children: "Featured guides" }),
        /* @__PURE__ */ jsxs("p", { className: "guides-count", children: [
          filtered.length,
          " ",
          filtered.length === 1 ? "guide" : "guides"
        ] })
      ] }),
      filtered.length > 0 ? /* @__PURE__ */ jsx("div", { className: "guides-grid", children: filtered.map((guide) => /* @__PURE__ */ jsxs("article", { className: "guide", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow guide__category", children: guide.category }),
        /* @__PURE__ */ jsx("h3", { className: "guide__title", children: /* @__PURE__ */ jsx(Link, { to: `/resources/${guide.slug}`, children: guide.title }) }),
        /* @__PURE__ */ jsx("p", { className: "guide__summary", children: guide.summary }),
        /* @__PURE__ */ jsx("p", { className: "guide__meta", children: guide.readTime }),
        /* @__PURE__ */ jsxs(Link, { to: `/resources/${guide.slug}`, className: "guide__link", children: [
          "Read the guide",
          /* @__PURE__ */ jsx(ArrowRight, { size: 15, "aria-hidden": "true" })
        ] })
      ] }, guide.slug)) }) : /* @__PURE__ */ jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsx("p", { className: "empty-state__title", children: "Nothing matched your search" }),
        /* @__PURE__ */ jsx("p", { className: "empty-state__body", children: "Try a broader term, or reset the filters to see everything in the resource center." }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => {
              setQuery("");
              setCategory("all");
            },
            children: "Clear filters"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "terminology-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Reference",
          title: "Medical billing terminology",
          subtitle: "Plain definitions for the terms that come up in day-to-day revenue cycle work."
        }
      ),
      /* @__PURE__ */ jsx("dl", { className: "glossary", children: TERMINOLOGY.map((entry) => /* @__PURE__ */ jsxs("div", { className: "glossary__row", children: [
        /* @__PURE__ */ jsx("dt", { className: "glossary__term", children: entry.term }),
        /* @__PURE__ */ jsx("dd", { className: "glossary__definition", children: entry.definition })
      ] }, entry.term)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Want this applied to your practice?" }),
      /* @__PURE__ */ jsx("p", { className: "cta-section__text", children: "Reading about revenue cycles is useful. Having someone own the operational side of it is usually more useful." }),
      /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "md", children: [
        "Request a Consultation",
        /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
      ] })
    ] }) })
  ] });
}
function Accordion({ items, className }) {
  var _a;
  const [open, setOpen] = useState(((_a = items[0]) == null ? void 0 : _a.id) ?? null);
  const isOpen = (id) => open === id;
  const handleClick = (id) => setOpen((prev) => prev === id ? null : id);
  const classes = ["accordion", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: classes, children: items.map((item) => {
    const expanded = isOpen(item.id);
    return /* @__PURE__ */ jsxs("div", { className: "accordion__item", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: `accordion__trigger ${expanded ? "accordion__trigger--open" : ""}`,
          onClick: () => handleClick(item.id),
          "aria-expanded": expanded,
          type: "button",
          children: [
            /* @__PURE__ */ jsx("span", { className: "accordion__title", children: item.title }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "accordion__icon", size: 18 })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `accordion__panel ${expanded ? "accordion__panel--open" : ""}`,
          hidden: !expanded,
          children: /* @__PURE__ */ jsx("div", { className: "accordion__content", children: item.content })
        }
      )
    ] }, item.id);
  }) });
}
const CATEGORY_LABELS = {
  general: "General",
  services: "Services",
  privacy: "Privacy & Security",
  "getting-started": "Getting Started",
  onboarding: "Onboarding"
};
function FAQ() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => {
    const found = new Set(FAQS.map((faq) => faq.category));
    return ["all", ...Array.from(found)];
  }, []);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const matchesCategory = category === "all" || faq.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      return faq.question.toLowerCase().includes(term) || faq.answer.toLowerCase().includes(term) || faq.category.toLowerCase().includes(term);
    });
  }, [search, category]);
  const items = filtered.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: faq.answer }),
      /* @__PURE__ */ jsx("span", { className: "faq__tag", children: CATEGORY_LABELS[faq.category] ?? faq.category })
    ] })
  }));
  const reset = () => {
    setSearch("");
    setCategory("all");
  };
  return /* @__PURE__ */ jsxs("div", { className: "page faq", children: [
    /* @__PURE__ */ jsx("section", { className: "page-header", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(
      SectionHeading,
      {
        eyebrow: "Support",
        title: "Frequently Asked Questions",
        subtitle: "Direct answers about our services, onboarding, communication, and how we handle your data.",
        center: true
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "faq__section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { className: "faq__controls", children: [
        /* @__PURE__ */ jsxs("div", { className: "faq__search-wrap", children: [
          /* @__PURE__ */ jsx(Search, { size: 18, "aria-hidden": "true", className: "faq__search-icon" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "search",
              className: "faq__search",
              placeholder: "Search questions and answers",
              value: search,
              onChange: (event) => setSearch(event.target.value),
              "aria-label": "Search frequently asked questions"
            }
          ),
          search && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "faq__search-clear",
              onClick: () => setSearch(""),
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsx(X, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "faq__categories",
            role: "group",
            "aria-label": "Filter questions by category",
            children: categories.map((item) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: `faq__chip ${category === item ? "faq__chip--active" : ""}`,
                "aria-pressed": category === item,
                onClick: () => setCategory(item),
                children: item === "all" ? "All questions" : CATEGORY_LABELS[item] ?? item
              },
              item
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "faq__count", "aria-live": "polite", children: [
        filtered.length,
        " ",
        filtered.length === 1 ? "question" : "questions",
        category !== "all" ? ` in ${CATEGORY_LABELS[category] ?? category}` : ""
      ] }),
      items.length > 0 ? /* @__PURE__ */ jsx(Accordion, { items, className: "faq__accordion" }) : /* @__PURE__ */ jsxs("div", { className: "faq__empty", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4", children: "No matching questions" }),
        /* @__PURE__ */ jsx("p", { children: "We could not find a question that matches your search. Try a different term, or send us the question directly and we will answer it." }),
        /* @__PURE__ */ jsxs("div", { className: "faq__empty-actions", children: [
          /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: reset, children: "Clear filters" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Ask us directly" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "faq__cta", children: /* @__PURE__ */ jsxs("div", { className: "container faq__cta-inner", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "h2", children: "Still have a question?" }),
        /* @__PURE__ */ jsx("p", { className: "lead", children: "Send a note and we will come back to you with a straight answer. No patient information is required for an initial conversation." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "faq__cta-actions", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(Button, { variant: "primary", size: "lg", children: "Contact Us" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/request-a-quote", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "lg", children: "Request a Quote" }) })
      ] })
    ] }) })
  ] });
}
const EMPTY_VALUES = {
  name: "",
  email: "",
  phone: "",
  practice: "",
  message: "",
  consent: false
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function Contact() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const update = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
  };
  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your business email address.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.practice.trim()) {
      next.practice = "Please enter your practice or business name.";
    }
    if (!values.message.trim()) {
      next.message = "Please tell us briefly how we can help.";
    }
    if (!values.consent) {
      next.consent = "Please confirm that you have read the privacy note.";
    }
    return next;
  };
  const handleSubmit = (event) => {
    var _a;
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(true);
    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      (_a = document.getElementById(`contact-${firstField}`)) == null ? void 0 : _a.focus();
      return;
    }
  };
  const fieldProps = (key) => ({
    id: `contact-${key}`,
    name: key,
    value: typeof values[key] === "boolean" ? void 0 : values[key],
    "aria-invalid": Boolean(errors[key]) || void 0,
    "aria-describedby": errors[key] ? `contact-${key}-error` : void 0
  });
  return /* @__PURE__ */ jsxs("div", { className: "contact-page", children: [
    /* @__PURE__ */ jsx("section", { className: "page-header", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(
      SectionHeading,
      {
        eyebrow: "Get in Touch",
        title: "Contact Us",
        subtitle: "Have questions about our services or want to discuss your practice's revenue cycle needs? We would like to hear from you.",
        center: true
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "contact-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "contact__grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "contact__info", children: [
        /* @__PURE__ */ jsxs("div", { className: "contact__card", children: [
          /* @__PURE__ */ jsxs("h3", { className: "h4", children: [
            /* @__PURE__ */ jsx(Phone, { size: 18, "aria-hidden": "true" }),
            " Phone"
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: `tel:${BRAND.contact.phone.replace(/[^\d+]/g, "")}`, children: BRAND.contact.phone }) }),
          /* @__PURE__ */ jsx("p", { className: "contact__hours", children: BRAND.contact.hours })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact__card", children: [
          /* @__PURE__ */ jsxs("h3", { className: "h4", children: [
            /* @__PURE__ */ jsx(Mail, { size: 18, "aria-hidden": "true" }),
            " Email"
          ] }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: `mailto:${BRAND.contact.email}`, children: BRAND.contact.email }) }),
          /* @__PURE__ */ jsx("p", { className: "contact__hours", children: "Response time is typically within one business day. This value is configurable in the brand settings." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact__card", children: [
          /* @__PURE__ */ jsxs("h3", { className: "h4", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, "aria-hidden": "true" }),
            " Address"
          ] }),
          /* @__PURE__ */ jsx("p", { children: BRAND.contact.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact__card contact__card--note", children: [
          /* @__PURE__ */ jsx("h3", { className: "h4", children: "Looking for a scoped proposal?" }),
          /* @__PURE__ */ jsx("p", { children: "The quote request form walks through your practice details in four short steps so we can review the fit before we speak." }),
          /* @__PURE__ */ jsx(Link, { to: "/request-a-quote", className: "btn btn--accent btn--sm", children: "Request a Quote" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "contact__form", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4", children: "Send a Message" }),
        /* @__PURE__ */ jsxs("form", { className: "contact-form", onSubmit: handleSubmit, noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-name", children: "Full Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...fieldProps("name"), required: true }),
            errors.name && /* @__PURE__ */ jsx("span", { className: "form-error", id: "contact-name-error", role: "alert", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-email", children: "Business Email" }),
            /* @__PURE__ */ jsx("input", { type: "email", ...fieldProps("email"), required: true }),
            errors.email && /* @__PURE__ */ jsx("span", { className: "form-error", id: "contact-email-error", role: "alert", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-phone", children: "Business Phone" }),
            /* @__PURE__ */ jsx("input", { type: "tel", ...fieldProps("phone") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-practice", children: "Practice or Business Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", ...fieldProps("practice"), required: true }),
            errors.practice && /* @__PURE__ */ jsx("span", { className: "form-error", id: "contact-practice-error", role: "alert", children: errors.practice })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-message", children: "Message" }),
            /* @__PURE__ */ jsx("textarea", { ...fieldProps("message"), rows: 5, required: true }),
            errors.message && /* @__PURE__ */ jsx("span", { className: "form-error", id: "contact-message-error", role: "alert", children: errors.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group checkbox", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "contact-consent",
                name: "consent",
                checked: values.consent,
                onChange: (e) => update("consent", e.target.checked),
                "aria-invalid": Boolean(errors.consent) || void 0,
                "aria-describedby": errors.consent ? "contact-consent-error" : void 0
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "contact-consent", children: "I understand this form collects business inquiry information only and does not process protected health information (PHI). Do not include patient names, records, or insurance member IDs." })
          ] }),
          errors.consent && /* @__PURE__ */ jsx("span", { className: "form-error", id: "contact-consent-error", role: "alert", children: errors.consent }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", size: "md", fullWidth: true, children: "Send Message" }),
          submitted && Object.keys(errors).length === 0 && /* @__PURE__ */ jsxs("div", { className: "form-status form-status--notice", role: "status", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "form-status__title", children: "This form is not connected to a delivery service yet." }),
              /* @__PURE__ */ jsx("p", { children: "Your message was not sent anywhere. Connect a secure form provider (Formspree, Basin, Netlify Forms, or your own endpoint) to start receiving submissions. The setup steps are documented in the README." })
            ] })
          ] }),
          submitted && Object.keys(errors).length > 0 && /* @__PURE__ */ jsxs("div", { className: "form-status form-status--error", role: "alert", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "form-status__title", children: "Please correct the highlighted fields." }),
              /* @__PURE__ */ jsx("p", { children: "Your message has not been sent." })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "privacy-section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "privacy__card", children: [
      /* @__PURE__ */ jsxs("h3", { className: "h4", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 18, "aria-hidden": "true" }),
        " Privacy & Security"
      ] }),
      /* @__PURE__ */ jsx("p", { children: "This is a marketing website. We collect business inquiry information only — names, practice names, email addresses, and phone numbers. We do not collect patient names, medical records, diagnoses, dates of birth, insurance member IDs, or claim documents through this site." }),
      /* @__PURE__ */ jsx("p", { children: "We do not claim HIPAA compliance simply because the site uses HTTPS or publishes a privacy policy. If you engage us for billing services, we will provide details about our security practices separately." }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx(Link, { to: "/privacy", children: "Read the full privacy policy" }),
        " and",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/terms", children: "the terms of use" }),
        "."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "cta-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h2", { className: "cta-section__title", children: "Prefer to Speak Directly?" }),
      /* @__PURE__ */ jsxs("p", { className: "cta-section__text", children: [
        "Call us at",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `tel:${BRAND.contact.phone.replace(/[^\d+]/g, "")}`,
            className: "cta__phone",
            children: BRAND.contact.phone
          }
        ),
        " ",
        "or email",
        " ",
        /* @__PURE__ */ jsx("a", { href: `mailto:${BRAND.contact.email}`, className: "cta__email", children: BRAND.contact.email }),
        "."
      ] })
    ] }) })
  ] });
}
const SPECIALTIES = [
  "Primary care",
  "Cardiology",
  "Orthopedics",
  "Mental health",
  "Dermatology",
  "Urgent care",
  "Multispecialty practice",
  "Other"
];
const PROVIDER_COUNTS = ["1", "2-5", "6-15", "16-50", "51+"];
const PRACTICE_TYPES = [
  "Independent practice",
  "Hospital-owned / employed",
  "Multi-site group",
  "Management services organization",
  "Other"
];
const BILLING_ARRANGEMENTS = [
  "Fully in-house",
  "Outsourced to a billing company",
  "Hybrid — in-house plus outsourced",
  "Mixed across providers",
  "Not currently billing consistently"
];
const CHALLENGES = [
  "Denials and appeals are not being worked",
  "Slow reimbursement and aging A/R",
  "Patient statements and balances are not collected",
  "Eligibility and authorization issues cause denials",
  "Lack of visibility into revenue performance",
  "Staff bandwidth is limited",
  "Preparing for a payer contract change",
  "Looking to evaluate alternatives"
];
const INITIAL = {
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
  consent: false
};
const STEPS = [
  { id: 1, title: "Contact information", hint: "How we reach you" },
  { id: 2, title: "Practice details", hint: "Your practice profile" },
  { id: 3, title: "Service requirements", hint: "What you need" },
  { id: 4, title: "Review and submit", hint: "Confirm your answers" }
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function validateStep(step, data) {
  const errors = {};
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
      errors.consent = "Please confirm you understand this form collects business information only.";
  }
  return errors;
}
function RequestAQuote() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const progress = (step - 1) / (STEPS.length - 1) * 100;
  const selectedServices = useMemo(
    () => SERVICES.filter((service) => data.services.includes(service.id)),
    [data.services]
  );
  const update = (key, value) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (touched) setErrors(validateStep(step, next));
      return next;
    });
  };
  const toggleListValue = (key, value) => {
    setData((prev) => {
      const current = prev[key];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      const updated = { ...prev, [key]: next };
      if (touched) setErrors(validateStep(step, updated));
      return updated;
    });
  };
  const goNext = () => {
    var _a;
    const stepErrors = validateStep(step, data);
    setTouched(true);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      (_a = document.querySelector("[aria-invalid='true']")) == null ? void 0 : _a.focus();
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
  const goToStep = (target) => {
    if (target < step) {
      setErrors({});
      setTouched(false);
      setStep(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    const allErrors = validateStep(4, data);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;
    setStatus("submitting");
    setSubmitError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("error");
      setSubmitError(
        "This form is not connected to a submission service yet, so your request was not sent. The steps for connecting one are below."
      );
    } catch {
      setStatus("error");
      setSubmitError("Something went wrong while preparing your request. Please try again.");
    }
  };
  const errorFor = (key) => touched ? errors[key] : void 0;
  if (status === "error") {
    return /* @__PURE__ */ jsxs("div", { className: "quote-page", children: [
      /* @__PURE__ */ jsx("header", { className: "quote-page__header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsx(
          Breadcrumbs,
          {
            items: [
              { name: "Home", href: "/" },
              { name: "Request a Quote", href: "/request-a-quote" }
            ]
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "h1 quote-page__title", children: "Your request is ready to send" }),
        /* @__PURE__ */ jsx("p", { className: "lead quote-page__subtitle", children: "We have prepared your quote request, but no delivery endpoint is configured in this project yet, so nothing has been transmitted." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "quote-page__section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
        /* @__PURE__ */ jsxs("div", { className: "quote-status quote-status--error", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "quote-status__icon", size: 22, "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "h4", children: "Not delivered" }),
            /* @__PURE__ */ jsx("p", { children: submitError })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-setup", children: [
          /* @__PURE__ */ jsx("h2", { className: "h3", children: "Connecting a form service" }),
          /* @__PURE__ */ jsx("p", { children: "This project is a front-end demonstration. To make the form deliver inquiries, point it at a form backend appropriate for your business." }),
          /* @__PURE__ */ jsxs("ol", { className: "quote-setup__steps", children: [
            /* @__PURE__ */ jsx("li", { children: "Choose a provider — for example Formspree, Basin, Netlify Forms, a Google Apps Script, or a small serverless function on your own infrastructure." }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Add the endpoint in",
              " ",
              /* @__PURE__ */ jsx("code", { className: "quote-setup__code", children: "src/pages/RequestAQuote.tsx" }),
              " ",
              "inside ",
              /* @__PURE__ */ jsx("code", { className: "quote-setup__code", children: "handleSubmit" }),
              " and send the form payload."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Keep any provider key on a server or serverless runtime environment. Never hard-code a secret into a client-side bundle." }),
            /* @__PURE__ */ jsx("li", { children: "Replace this state with a success state driven by the provider response, so a confirmation is shown only after a real delivery." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "quote-setup__note", children: "Do not send protected health information through this form. Business inquiry details are appropriate; patient data is not." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-status__actions", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: () => setStatus("idle"), children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "btn__icon", size: 16 }),
            "Back to the form"
          ] }),
          /* @__PURE__ */ jsx(Button, { to: "/contact", variant: "primary", children: "Contact us directly" })
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "quote-page", children: [
    /* @__PURE__ */ jsx("header", { className: "quote-page__header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "Request a Quote", href: "/request-a-quote" }
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "h1 quote-page__title", children: "Request a Quote" }),
      /* @__PURE__ */ jsx("p", { className: "lead quote-page__subtitle", children: "Four short steps. We use this to understand your practice before we talk, so the first conversation is useful rather than introductory." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "quote-progress", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("div", { className: "quote-progress__bar", role: "presentation", children: /* @__PURE__ */ jsx("div", { className: "quote-progress__fill", style: { width: `${progress}%` } }) }),
      /* @__PURE__ */ jsx("ol", { className: "quote-progress__steps", children: STEPS.map((item) => {
        const state = item.id === step ? "current" : item.id < step ? "complete" : "upcoming";
        return /* @__PURE__ */ jsx(
          "li",
          {
            className: `quote-progress__step quote-progress__step--${state}`,
            children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => goToStep(item.id),
                disabled: item.id > step,
                "aria-current": item.id === step ? "step" : void 0,
                className: "quote-progress__button",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "quote-progress__marker", children: state === "complete" ? /* @__PURE__ */ jsx(Check, { size: 14, "aria-hidden": "true" }) : item.id }),
                  /* @__PURE__ */ jsx("span", { className: "quote-progress__label", children: item.title })
                ]
              }
            )
          },
          item.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "quote-page__section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("form", { className: "quote-form", onSubmit: handleSubmit, noValidate: true, children: [
      step === 1 && /* @__PURE__ */ jsxs("fieldset", { className: "quote-step", children: [
        /* @__PURE__ */ jsxs("legend", { className: "quote-step__legend", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Step 1 of 4" }),
          /* @__PURE__ */ jsx("span", { className: "h3", children: "Contact information" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "quote-step__hint", children: "Business contact details only. We will use these to respond to your request." }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "fullName", children: [
            "Full name ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "fullName",
              name: "fullName",
              type: "text",
              autoComplete: "name",
              value: data.fullName,
              onChange: (e) => update("fullName", e.target.value),
              "aria-invalid": Boolean(errorFor("fullName")),
              "aria-describedby": errorFor("fullName") ? "fullName-error" : void 0
            }
          ),
          errorFor("fullName") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "fullName-error", children: errorFor("fullName") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "email", children: [
            "Business email ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              name: "email",
              type: "email",
              autoComplete: "email",
              value: data.email,
              onChange: (e) => update("email", e.target.value),
              "aria-invalid": Boolean(errorFor("email")),
              "aria-describedby": errorFor("email") ? "email-error" : void 0
            }
          ),
          errorFor("email") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "email-error", children: errorFor("email") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "practiceName", children: [
            "Practice name ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "practiceName",
              name: "practiceName",
              type: "text",
              autoComplete: "organization",
              value: data.practiceName,
              onChange: (e) => update("practiceName", e.target.value),
              "aria-invalid": Boolean(errorFor("practiceName")),
              "aria-describedby": errorFor("practiceName") ? "practiceName-error" : void 0
            }
          ),
          errorFor("practiceName") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "practiceName-error", children: errorFor("practiceName") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "phone", children: [
            "Business phone ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "phone",
              name: "phone",
              type: "tel",
              autoComplete: "tel",
              value: data.phone,
              onChange: (e) => update("phone", e.target.value),
              "aria-invalid": Boolean(errorFor("phone")),
              "aria-describedby": errorFor("phone") ? "phone-error" : void 0
            }
          ),
          errorFor("phone") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "phone-error", children: errorFor("phone") })
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxs("fieldset", { className: "quote-step", children: [
        /* @__PURE__ */ jsxs("legend", { className: "quote-step__legend", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Step 2 of 4" }),
          /* @__PURE__ */ jsx("span", { className: "h3", children: "Practice details" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "quote-step__hint", children: "This helps us scope the right level of support. Estimates are fine." }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "specialty", children: [
            "Specialty ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "specialty",
              name: "specialty",
              value: data.specialty,
              onChange: (e) => update("specialty", e.target.value),
              "aria-invalid": Boolean(errorFor("specialty")),
              "aria-describedby": errorFor("specialty") ? "specialty-error" : void 0,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a specialty" }),
                SPECIALTIES.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: item }, item))
              ]
            }
          ),
          errorFor("specialty") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "specialty-error", children: errorFor("specialty") })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "quote-field quote-field--group", children: [
          /* @__PURE__ */ jsxs("legend", { children: [
            "Approximate number of providers",
            " ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "quote-chips", children: PROVIDER_COUNTS.map((count) => /* @__PURE__ */ jsxs(
            "label",
            {
              className: `quote-chip ${data.providerCount === count ? "quote-chip--active" : ""}`,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "providerCount",
                    value: count,
                    checked: data.providerCount === count,
                    onChange: () => update("providerCount", count),
                    className: "quote-chip__input"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: count })
              ]
            },
            count
          )) }),
          errorFor("providerCount") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", children: errorFor("providerCount") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "practiceType", children: [
            "Practice type ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "practiceType",
              name: "practiceType",
              value: data.practiceType,
              onChange: (e) => update("practiceType", e.target.value),
              "aria-invalid": Boolean(errorFor("practiceType")),
              "aria-describedby": errorFor("practiceType") ? "practiceType-error" : void 0,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a practice type" }),
                PRACTICE_TYPES.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: item }, item))
              ]
            }
          ),
          errorFor("practiceType") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "practiceType-error", children: errorFor("practiceType") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "billingArrangement", children: [
            "Current billing arrangement",
            " ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "billingArrangement",
              name: "billingArrangement",
              value: data.billingArrangement,
              onChange: (e) => update("billingArrangement", e.target.value),
              "aria-invalid": Boolean(errorFor("billingArrangement")),
              "aria-describedby": errorFor("billingArrangement") ? "billingArrangement-error" : void 0,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select an arrangement" }),
                BILLING_ARRANGEMENTS.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: item }, item))
              ]
            }
          ),
          errorFor("billingArrangement") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", id: "billingArrangement-error", children: errorFor("billingArrangement") })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs("fieldset", { className: "quote-step", children: [
        /* @__PURE__ */ jsxs("legend", { className: "quote-step__legend", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Step 3 of 4" }),
          /* @__PURE__ */ jsx("span", { className: "h3", children: "Service requirements" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "quote-step__hint", children: "Select everything that applies. We will confirm availability in our first reply." }),
        /* @__PURE__ */ jsxs("fieldset", { className: "quote-field quote-field--group", children: [
          /* @__PURE__ */ jsxs("legend", { children: [
            "Services of interest",
            " ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "quote-chips quote-chips--wrap", children: SERVICES.map((service) => {
            const active = data.services.includes(service.id);
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: `quote-chip ${active ? "quote-chip--active" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      value: service.id,
                      checked: active,
                      onChange: () => toggleListValue("services", service.id),
                      className: "quote-chip__input"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: service.name }),
                  !service.confirmed && /* @__PURE__ */ jsx("span", { className: "quote-chip__flag", children: "Confirm availability" })
                ]
              },
              service.id
            );
          }) }),
          errorFor("services") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", children: errorFor("services") })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { className: "quote-field quote-field--group", children: [
          /* @__PURE__ */ jsxs("legend", { children: [
            "Current challenges",
            " ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__required", children: "Required" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "quote-checks", children: CHALLENGES.map((challenge) => {
            const active = data.challenges.includes(challenge);
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: `quote-check ${active ? "quote-check--active" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      value: challenge,
                      checked: active,
                      onChange: () => toggleListValue("challenges", challenge),
                      className: "quote-check__input"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "quote-check__box", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Check, { size: 13 }) }),
                  /* @__PURE__ */ jsx("span", { children: challenge })
                ]
              },
              challenge
            );
          }) }),
          errorFor("challenges") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", children: errorFor("challenges") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-field", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "message", children: [
            "Anything else we should know?",
            " ",
            /* @__PURE__ */ jsx("span", { className: "quote-field__optional", children: "Optional" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              rows: 5,
              value: data.message,
              onChange: (e) => update("message", e.target.value),
              placeholder: "For example: current billing vendor, contract end date, or a specific problem you want solved first."
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "quote-field__help", children: "Please keep this to business information. Do not include patient names, medical record numbers, diagnoses, or insurance member IDs." })
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxs("fieldset", { className: "quote-step", children: [
        /* @__PURE__ */ jsxs("legend", { className: "quote-step__legend", children: [
          /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "Step 4 of 4" }),
          /* @__PURE__ */ jsx("span", { className: "h3", children: "Review and submit" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "quote-step__hint", children: "Check your answers below. Use Edit to go back to any section." }),
        /* @__PURE__ */ jsxs("div", { className: "quote-review", children: [
          /* @__PURE__ */ jsxs("div", { className: "quote-review__group", children: [
            /* @__PURE__ */ jsxs("div", { className: "quote-review__header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Contact information" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => goToStep(1),
                  className: "quote-review__edit",
                  children: "Edit"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("dl", { className: "quote-review__list", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Full name" }),
                /* @__PURE__ */ jsx("dd", { children: data.fullName })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Business email" }),
                /* @__PURE__ */ jsx("dd", { children: data.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Practice name" }),
                /* @__PURE__ */ jsx("dd", { children: data.practiceName })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Business phone" }),
                /* @__PURE__ */ jsx("dd", { children: data.phone })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "quote-review__group", children: [
            /* @__PURE__ */ jsxs("div", { className: "quote-review__header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Practice details" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => goToStep(2),
                  className: "quote-review__edit",
                  children: "Edit"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("dl", { className: "quote-review__list", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Specialty" }),
                /* @__PURE__ */ jsx("dd", { children: data.specialty })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Providers" }),
                /* @__PURE__ */ jsx("dd", { children: data.providerCount })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Practice type" }),
                /* @__PURE__ */ jsx("dd", { children: data.practiceType })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Current billing arrangement" }),
                /* @__PURE__ */ jsx("dd", { children: data.billingArrangement })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "quote-review__group", children: [
            /* @__PURE__ */ jsxs("div", { className: "quote-review__header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Service requirements" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => goToStep(3),
                  className: "quote-review__edit",
                  children: "Edit"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("dl", { className: "quote-review__list", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Services of interest" }),
                /* @__PURE__ */ jsx("dd", { children: selectedServices.length > 0 ? selectedServices.map((service) => service.name).join(", ") : "—" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Current challenges" }),
                /* @__PURE__ */ jsx("dd", { children: data.challenges.length > 0 ? data.challenges.join(", ") : "—" })
              ] }),
              data.message && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { children: "Additional message" }),
                /* @__PURE__ */ jsx("dd", { children: data.message })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-consent", children: [
          /* @__PURE__ */ jsxs("label", { className: "quote-check", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.consent,
                onChange: (e) => update("consent", e.target.checked),
                className: "quote-check__input",
                "aria-invalid": Boolean(errorFor("consent"))
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "quote-check__box", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Check, { size: 13 }) }),
            /* @__PURE__ */ jsx("span", { children: "I understand this form collects business inquiry information only, and that no patient information should be submitted through it." })
          ] }),
          errorFor("consent") && /* @__PURE__ */ jsx("p", { className: "quote-field__error", children: errorFor("consent") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "quote-status quote-status--info", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "quote-status__icon", size: 20, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { children: "This project does not have a submission service configured. Submitting will show the setup instructions rather than a delivery confirmation." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "quote-form__nav", children: [
        step > 1 ? /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: goBack, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "btn__icon", size: 16 }),
          "Back"
        ] }) : /* @__PURE__ */ jsx(Link, { to: "/services", className: "quote-form__skip", children: "Explore services first" }),
        step < STEPS.length ? /* @__PURE__ */ jsxs(Button, { variant: "primary", onClick: goNext, children: [
          "Continue",
          /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
        ] }) : /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: status === "submitting", children: status === "submitting" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "btn__icon btn__icon--spin", size: 16 }),
          "Preparing request"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Submit Request",
          /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "page page--not-found", children: [
    /* @__PURE__ */ jsx(SectionHeading, { title: "404", subtitle: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "not-found__text", children: "The page you are looking for does not exist or has been moved." }),
    /* @__PURE__ */ jsxs("div", { className: "not-found__actions", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Back to Home" }) }),
      /* @__PURE__ */ jsx(Link, { to: "/services", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Explore Services" }) })
    ] })
  ] });
}
function Privacy() {
  return /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsx(
      SectionHeading,
      {
        title: "Privacy Policy",
        subtitle: "For business and legal review."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "policy", children: [
      /* @__PURE__ */ jsx("h2", { children: "1. What We Collect" }),
      /* @__PURE__ */ jsx("p", { children: "This site collects business inquiry information only. Through the contact form and quote request form, we collect your name, business email, practice name, business phone, and service interest details." }),
      /* @__PURE__ */ jsx("p", { children: "We do not collect protected health information, medical records, diagnoses, dates of birth, insurance member IDs, claim documents, or other protected health information through our marketing forms." }),
      /* @__PURE__ */ jsx("h2", { children: "2. How Your Information Is Used" }),
      /* @__PURE__ */ jsx("p", { children: "Your business inquiry information is used solely to facilitate consultation scheduling, service matching, and responding to your contact request. We do not sell, share, or transfer your information to third parties." }),
      /* @__PURE__ */ jsx("h2", { children: "3. Third-Party Form Services" }),
      /* @__PURE__ */ jsx("p", { children: "If you connect a secure form submission service (such as Formspree, Basin, Netlify Forms, or similar), we will share only the information you explicitly submit through that service. We will not access or read the submitted content ourselves." }),
      /* @__PURE__ */ jsx("h2", { children: "4. Legal Review Required" }),
      /* @__PURE__ */ jsx("p", { children: "This is a starter privacy policy prepared for business and legal review. It does not constitute legal advice. You are responsible for reviewing and updating this policy to meet your specific regulatory obligations." }),
      /* @__PURE__ */ jsx("h2", { children: "5. Contact" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For privacy-related questions, contact us at",
        " ",
        /* @__PURE__ */ jsx("a", { href: `mailto:${BRAND.contact.email}`, children: BRAND.contact.email }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "policy__actions", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Contact Us" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Back to Home" }) })
      ] })
    ] })
  ] });
}
function Terms() {
  return /* @__PURE__ */ jsxs("div", { className: "page", children: [
    /* @__PURE__ */ jsx(
      SectionHeading,
      {
        title: "Terms of Service",
        subtitle: "For business and legal review."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "policy", children: [
      /* @__PURE__ */ jsx("h2", { children: "1. Acceptance of Terms" }),
      /* @__PURE__ */ jsx("p", { children: "By using this website, you agree to the terms described below. These terms may be updated from time to time." }),
      /* @__PURE__ */ jsx("h2", { children: "2. Service Description" }),
      /* @__PURE__ */ jsx("p", { children: "This website is a marketing site for our medical billing and revenue cycle management services. It provides general information about our offerings and does not constitute a legal or financial engagement." }),
      /* @__PURE__ */ jsx("h2", { children: "3. No Guarantees" }),
      /* @__PURE__ */ jsx("p", { children: "While we strive to provide accurate information, we do not make any guarantees about specific results or outcomes. Any service engagements are governed by a separate service agreement." }),
      /* @__PURE__ */ jsx("h2", { children: "4. Contact" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For questions about these terms, contact us at",
        " ",
        /* @__PURE__ */ jsx("a", { href: `mailto:${BRAND.contact.email}`, children: BRAND.contact.email }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "policy__actions", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Contact Us" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Back to Home" }) })
      ] })
    ] })
  ] });
}
const SERVICE_DETAILS = {
  "medical-billing": {
    slug: "medical-billing",
    eyebrow: "Medical Billing",
    title: "End-to-End Medical Billing Services",
    subtitle: "Complete charge entry, claim submission, payment posting, and patient billing support designed to keep your revenue cycle running smoothly.",
    introTitle: "What Our Medical Billing Service Covers",
    introParagraphs: [
      "Our medical billing service handles the complete revenue cycle from charge entry through patient billing. We work with your practice to ensure claims are submitted accurately, tracked diligently, and paid promptly.",
      "Billing work is rarely the bottleneck on its own — it is usually the missing visibility. A claim that was never scrubbed, a payment that was posted to the wrong account, a balance that fell through the patient statement process. We take ownership of those handoffs so the revenue cycle behaves predictably."
    ],
    includesTitle: "Core billing activities",
    includes: [
      "Charge entry and coding review",
      "Pre-submission claim scrubbing",
      "Electronic claim submission to all major payers",
      "Real-time claim status tracking",
      "Payment posting and reconciliation",
      "Patient statement generation and delivery",
      "Patient billing support and correspondence"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Fewer avoidable denials",
        detail: "Claims are reviewed before they leave the office, so common errors are caught while they are still cheap to fix."
      },
      {
        lead: "Faster collections",
        detail: "Proactive status tracking and payer follow-up move claims through the adjudication cycle faster."
      },
      {
        lead: "Transparent reporting",
        detail: "You see where every claim stands — submitted, pending, denied, or paid — without having to ask."
      },
      {
        lead: "A dedicated billing team",
        detail: "Your practice is supported by people who know your payers, your workflows, and your volumes."
      }
    ],
    process: [
      {
        title: "Charge Entry",
        description: "Services provided are documented and converted into billable charges using the appropriate CPT and HCPCS codes."
      },
      {
        title: "Claim Scrubbing",
        description: "Claims are reviewed against payer-specific edits and rules before submission to reduce rejections and denials."
      },
      {
        title: "Submission",
        description: "Clean claims are submitted electronically to payers through established clearinghouse connections."
      },
      {
        title: "Tracking",
        description: "Claim status is monitored in real time, with follow-up actions taken on unpaid or delayed claims."
      },
      {
        title: "Payment Posting",
        description: "Payments are posted and reconciled against ERA and EOB data from payers."
      },
      {
        title: "Patient Billing",
        description: "Patient statements are generated and sent for any remaining balance after insurance payment."
      }
    ],
    faqs: [
      {
        q: "How quickly are claims submitted after services are provided?",
        a: "Claims are typically submitted within 24 to 48 hours of charge entry. Exact turnaround depends on the cadence of documentation in your practice, which we map during onboarding."
      },
      {
        q: "Do you handle patient billing as well as payer billing?",
        a: "Yes. Patient statements are generated and sent for balances that remain after insurance payment, and we handle routine correspondence with patients regarding those balances."
      },
      {
        q: "What happens when a claim is denied?",
        a: "Denied claims are tracked, analyzed for root cause, and resubmitted with corrections where appropriate. Appeals are prepared and submitted as part of denial management."
      },
      {
        q: "Will you work with our existing practice management system?",
        a: "Yes. Billing operations are built around your existing systems wherever possible. Integration requirements are assessed during the practice needs assessment so we can plan a realistic transition."
      }
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "Full revenue cycle oversight from registration through final payment.",
        href: "/services/revenue-cycle-management"
      },
      {
        name: "Denial Management & Appeals",
        desc: "Denial tracking, root-cause analysis, and structured appeal workflows.",
        href: "/services/denial-management"
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Real-time eligibility checks to confirm coverage before services are rendered.",
        href: "/services/eligibility-verification"
      }
    ]
  },
  "revenue-cycle-management": {
    slug: "revenue-cycle-management",
    eyebrow: "Revenue Cycle Management",
    title: "Full Revenue Cycle Oversight",
    subtitle: "Complete revenue cycle management from patient registration through final payment — helping practices maintain healthy, predictable cash flow.",
    introTitle: "What Revenue Cycle Management Includes",
    introParagraphs: [
      "Revenue cycle management is the whole financial journey of a patient encounter, not a single task at the end of it. It starts at registration, where coverage and information accuracy are set, and ends when a remaining balance is resolved.",
      "We take responsibility for the whole cycle. That means the same team owns the handoffs — the eligibility check feeds the charge capture, the claim status feeds the follow-up, and the posted payment feeds the patient balance. Nothing gets dropped between functions."
    ],
    includesTitle: "Full-cycle scope",
    includes: [
      "Patient registration support and insurance eligibility verification",
      "Charge capture, coding review, and documentation alignment",
      "Claim scrubbing, submission, and real-time status tracking",
      "Denial analysis, correction, resubmission, and appeal preparation",
      "Payment posting, ERA/EOB processing, and reconciliation",
      "Patient statements, balances, and collection follow-up",
      "Performance reporting, trend analysis, and workflow refinement"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Improved cash flow",
        detail: "Fewer claims stall in the adjudication cycle, and problems are surfaced while they are still inexpensive to fix."
      },
      {
        lead: "Lower administrative burden",
        detail: "One team owns the full cycle, so your staff is not reconciling work that crosses department boundaries."
      },
      {
        lead: "Revenue cycle visibility",
        detail: "Consistent reporting shows where money is sitting, what is blocking it, and what changed since last month."
      },
      {
        lead: "Proactive optimization",
        detail: "Payer policy shifts and denial patterns are reviewed continuously rather than discovered at month end."
      }
    ],
    process: [
      {
        title: "Intake & Eligibility",
        description: "Coverage is confirmed and patient details are verified before services are rendered."
      },
      {
        title: "Charge Capture",
        description: "Documented services are converted into billable charges and reviewed for coding accuracy."
      },
      {
        title: "Claim Adjudication",
        description: "Claims are scrubbed, submitted, and tracked through payer adjudication."
      },
      {
        title: "Exception Handling",
        description: "Denials and underpayments are investigated, corrected, and appealed where appropriate."
      },
      {
        title: "Payment Application",
        description: "Payments are posted, reconciled, and applied against the correct patient accounts."
      },
      {
        title: "Patient Balance",
        description: "Remaining balances are billed to patients with follow-up through resolution."
      },
      {
        title: "Performance Review",
        description: "Trends are analyzed and workflows are adjusted against what the data actually shows."
      }
    ],
    faqs: [
      {
        q: "How is this different from medical billing alone?",
        a: "Medical billing is one function within the revenue cycle. Full RCM covers the work on both sides of the payer — intake, eligibility, patient balances, and reporting — with a single team accountable for the whole path."
      },
      {
        q: "How do you measure performance?",
        a: "We report on the metrics that describe cycle health: days in A/R, clean claim rate, denial rate by reason, net collection rate, and A/R aging distribution. The exact report set is agreed during onboarding."
      },
      {
        q: "Can RCM work alongside our in-house staff?",
        a: "Yes. Many practices use a hybrid model where we take on the high-volume or specialized pieces — denial management, A/R follow-up, or patient billing — while internal staff retain other responsibilities."
      },
      {
        q: "How often will we receive reports?",
        a: "Reporting cadence is agreed during onboarding. Monthly performance summaries are standard, and quarterly business reviews are used to review trends and adjust workflows."
      }
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "Charge entry, submission, posting, and patient billing support.",
        href: "/services/medical-billing"
      },
      {
        name: "Denial Management & Appeals",
        desc: "Root-cause analysis and structured recovery workflows.",
        href: "/services/denial-management"
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Electronic submission and payer-specific follow-up.",
        href: "/services/claims-management"
      }
    ]
  },
  "denial-management": {
    slug: "denial-management",
    eyebrow: "Denial Management & Appeals",
    title: "Denial Tracking, Analysis, and Appeals",
    subtitle: "Proactive denial management that identifies root causes, resubmits corrected claims, and works to recover revenue that was left behind.",
    introTitle: "Our Denial Management Process",
    introParagraphs: [
      "A denial is not necessarily a loss. It is a claim that was returned for a specific, usually correctable, reason. Left unmanaged, denials age into write-offs — not because the service was not rendered or not covered, but because nobody picked the work back up.",
      "Our denial management service treats denials as a workflow with owners and deadlines. Every denial is categorized, corrected at the source, resubmitted, and tracked until it is closed. The pattern analysis that comes out of that work is what prevents the same denials from recurring."
    ],
    includesTitle: "What the service covers",
    includes: [
      "Real-time denial capture and categorization by reason code",
      "Root-cause analysis at the individual claim level",
      "Corrected claim preparation and resubmission",
      "Appeal letter drafting and payer submission",
      "Payer follow-up and escalation where a first appeal is not enough",
      "Timely filing and appeal deadline monitoring",
      "Denial trend reporting and prevention recommendations"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Recovered revenue",
        detail: "Denials are worked rather than filed away, so billable work that was already performed gets paid."
      },
      {
        lead: "Fewer repeat denials",
        detail: "Pattern analysis identifies the workflow gaps behind repeat reason codes and fixes them upstream."
      },
      {
        lead: "Consistent appeal quality",
        detail: "Standardized appeal construction means the argument is well-supported every time, not improvised under deadline pressure."
      },
      {
        lead: "Deadline confidence",
        detail: "Timely filing and appeal windows are tracked so a deadline is never missed for administrative reasons."
      }
    ],
    process: [
      {
        title: "Capture & Categorize",
        description: "Denied claims are pulled from remittance data and sorted by reason code and payer."
      },
      {
        title: "Analyze",
        description: "Each denial is reviewed to determine the actual cause — coding, authorization, eligibility, or documentation."
      },
      {
        title: "Correct & Resubmit",
        description: "Corrected claims are prepared and resubmitted where a corrected claim is the right path."
      },
      {
        title: "Appeal",
        description: "Where a clinical or contractual argument applies, an appeal is drafted with supporting documentation and submitted."
      },
      {
        title: "Follow Up",
        description: "Outstanding denials are followed up with payers and escalated when a response is overdue."
      },
      {
        title: "Prevent",
        description: "Recurring patterns are reported with recommended workflow changes to reduce future denials."
      }
    ],
    faqs: [
      {
        q: "Which denials are worth appealing?",
        a: "Not all denials are worth the effort. We work each one to determine whether the claim was actually billable and payable, then prioritize accordingly — so effort goes to the denials with real recovery potential."
      },
      {
        q: "Do you write the appeal letters?",
        a: "Yes. We prepare the appeal content, including the clinical and contractual rationale, and coordinate submission to the payer."
      },
      {
        q: "What do you need from our practice to work a denial?",
        a: "Access to the relevant clinical documentation and the remittance information for the claim. The specific requirements are confirmed during onboarding and vary by payer."
      },
      {
        q: "How do you report on denial performance?",
        a: "We report denial volume and value by reason code and payer, resolution rates, and average time to resolution — with notes on what is driving the pattern."
      }
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "Full-cycle oversight that includes denials as a core function.",
        href: "/services/revenue-cycle-management"
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Cleaner claims mean fewer denials to work in the first place.",
        href: "/services/claims-management"
      },
      {
        name: "Payment Posting & Reconciliation",
        desc: "Accurate posting and reconciliation from remittance data.",
        href: "/services/payment-posting"
      }
    ]
  },
  "claims-management": {
    slug: "claims-management",
    eyebrow: "Claims Submission & Tracking",
    title: "Electronic Claims Management",
    subtitle: "Electronic claims submission, real-time status tracking, and payer-specific follow-up that keeps claims moving toward payment.",
    introTitle: "What Our Claims Management Covers",
    introParagraphs: [
      "Most claim problems are visible long before the money is actually late. A claim that was rejected at the front door, one that was never acknowledged, one that has been sitting in a payer queue — each of these is a delay that shows up weeks later as an aging balance.",
      "Claims management is the discipline of watching that queue. We submit electronically, confirm that payers actually received what we sent, track status to resolution, and act on the claims that stall instead of waiting for the aging report to flag them."
    ],
    includesTitle: "Submission and tracking scope",
    includes: [
      "Electronic claims submission through established clearinghouse connections",
      "Pre-submission scrubbing against payer-specific edits",
      "Clearinghouse acknowledgement and rejection monitoring",
      "Real-time claim status tracking across payer systems",
      "Unacknowledged and rejected claim recovery",
      "Payer-specific follow-up protocols for stalled claims",
      "Submission and acknowledgment reporting"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Faster reimbursement",
        detail: "Electronic submission removes the mail-handling delay that still affects a meaningful share of claims."
      },
      {
        lead: "Fewer front-door rejections",
        detail: "Rejected claims are caught at the clearinghouse and corrected immediately rather than aged out."
      },
      {
        lead: "Real-time status visibility",
        detail: "You can see which claims are acknowledged, in adjudication, or needing attention."
      },
      {
        lead: "Proactive follow-up",
        detail: "Payer follow-up happens on a defined cadence, not when a report surfaces a problem."
      }
    ],
    process: [
      {
        title: "Scrub",
        description: "Claims are checked against payer edits and rules before submission."
      },
      {
        title: "Submit",
        description: "Clean claims are transmitted electronically through the clearinghouse."
      },
      {
        title: "Confirm",
        description: "Clearinghouse acknowledgements are monitored and rejections are corrected and re-sent."
      },
      {
        title: "Track",
        description: "Claim status is tracked through payer adjudication in real time."
      },
      {
        title: "Follow Up",
        description: "Claims that stall beyond expected timelines are worked with the payer directly."
      },
      {
        title: "Report",
        description: "Submission volumes, rejection rates, and aging patterns are reported for review."
      }
    ],
    faqs: [
      {
        q: "Which payers do you submit to?",
        a: "We submit through clearinghouse connections that cover the major national and regional payers your practice works with. Your specific payer mix is confirmed during the practice needs assessment."
      },
      {
        q: "How do you handle claims rejected at the clearinghouse?",
        a: "Rejected claims are returned to the queue for correction and resubmitted. Rejection reasons are also analyzed in aggregate, because a repeated rejection usually points to a fixable configuration issue."
      },
      {
        q: "What does real-time tracking actually mean in practice?",
        a: "Claim status is checked against payer responses throughout the day rather than in a single end-of-day batch. When a claim deviates from the expected path, it is picked up rather than left to age."
      },
      {
        q: "Can you work with our existing clearinghouse?",
        a: "In many cases, yes. Where a payer or configuration requires a different approach, we will explain the reason and the implications during the needs assessment."
      }
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "The full billing workflow that submission sits inside.",
        href: "/services/medical-billing"
      },
      {
        name: "Denial Management & Appeals",
        desc: "What happens once a claim comes back denied.",
        href: "/services/denial-management"
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Confirming coverage before a claim is created.",
        href: "/services/eligibility-verification"
      }
    ]
  },
  "credentialing": {
    slug: "credentialing",
    eyebrow: "Medical Credentialing",
    title: "Provider Enrollment & Credentialing",
    subtitle: "Provider enrollment and credentialing support with insurance payers. Service availability is subject to business confirmation.",
    introTitle: "Credentialing Support",
    introParagraphs: [
      "Credentialing determines whether a provider can bill a payer at all. It is paperwork-heavy, deadline-driven, and easy to let slip between competing administrative priorities — particularly as a practice grows and new payers are added.",
      "We offer support with provider enrollment and credentialing to reduce that administrative load and keep applications moving."
    ],
    includesTitle: "Potential support scope",
    includes: [
      "Provider enrollment applications and payer-specific forms",
      "Credentialing packet preparation and document assembly",
      "Verification calls and payer follow-up",
      "Tracking of application status and outstanding items",
      "Re-credentialing and re-enrollment cycles",
      "Maintenance of credentialing status records"
    ],
    benefitsTitle: "Potential benefits",
    benefits: [
      {
        lead: "Faster enrollment",
        detail: "Complete, accurate applications move through payer review with fewer avoidable delays."
      },
      {
        lead: "Less internal administrative load",
        detail: "Follow-up and document tracking are handled off the practice's plate."
      },
      {
        lead: "Continuity",
        detail: "Re-credentialing cycles are tracked so participation does not lapse unnoticed."
      },
      {
        lead: "Clear status visibility",
        detail: "You know where each application stands and what is still outstanding."
      }
    ],
    confirmationNote: "Credentialing service availability is subject to business confirmation. Please contact us to confirm whether this service is offered for your specialty, payer mix, and location before relying on it.",
    faqs: [
      {
        q: "Is credentialing currently offered?",
        a: "This offering is marked as requiring business confirmation. Reach out to our team and we will confirm availability for your specific situation."
      },
      {
        q: "Which payers do you work with for enrollment?",
        a: "Payer coverage for credentialing depends on the service being confirmed. Your payer mix is reviewed as part of the needs assessment."
      },
      {
        q: "What do you need from us to start?",
        a: "Provider demographic details, licensure and credentialing documentation, and the payer enrollment applications to be completed. The specific checklist is provided once the scope is confirmed."
      },
      {
        q: "How long does credentialing take?",
        a: "Timelines vary substantially by payer and can range from weeks to several months. We will set expectations for each payer during the assessment rather than quoting a single figure."
      }
    ],
    related: [
      {
        name: "Revenue Cycle Management",
        desc: "The broader financial operations that credentialing supports.",
        href: "/services/revenue-cycle-management"
      },
      {
        name: "Insurance Eligibility Verification",
        desc: "Confirming active coverage once a provider is enrolled.",
        href: "/services/eligibility-verification"
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Submitting claims once enrollment is in place.",
        href: "/services/claims-management"
      }
    ]
  },
  "payment-posting": {
    slug: "payment-posting",
    eyebrow: "Payment Posting & Reconciliation",
    title: "Accurate Payment Posting and Reconciliation",
    subtitle: "Precise posting of payer and patient payments against the right accounts, with reconciliation that surfaces what was missed.",
    introTitle: "What Payment Posting Covers",
    introParagraphs: [
      "Posting is where a claim becomes money. If a payment is posted to the wrong account, deferred, or never applied, the practice still performed the work and the payer still paid — but the balance does not close, and it quietly ages.",
      "We post systematically against remittance data and reconcile deposits against what actually arrived. Discrepancies are identified and resolved rather than absorbed into the aging report."
    ],
    includesTitle: "Posting and reconciliation scope",
    includes: [
      "ERA and EOB interpretation and claim-level payment application",
      "Patient payment posting including copays, deductibles, and adjustments",
      "Adjustment and write-off processing per contractual terms",
      "Bank deposit reconciliation against remittance and payment records",
      "Variance identification between expected and actual payer payment",
      "Unapplied cash and suspense resolution",
      "Posted payment reporting and audit trails"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Balances that close accurately",
        detail: "Payments land on the right accounts, so completed work is reflected in your revenue."
      },
      {
        lead: "Recovered underpayments",
        detail: "Contract variances are identified instead of being written off automatically."
      },
      {
        lead: "No unapplied cash sitting idle",
        detail: "Suspense balances are worked and cleared rather than accumulating."
      },
      {
        lead: "A reliable audit trail",
        detail: "Every posting and adjustment is traceable, which matters when questions come up later."
      }
    ],
    faqs: [
      {
        q: "Which remittance formats do you process?",
        a: "We work from electronic remittance advice and paper explanation of benefits documents, with the formats confirmed against what your payers actually send you."
      },
      {
        q: "How do you handle underpayments?",
        a: "Payments below the contracted amount are flagged, investigated against the payer's fee schedule, and appealed or adjusted as appropriate."
      },
      {
        q: "Can you post into our existing practice management system?",
        a: "Posting is performed within the systems you already use wherever possible. Requirements are assessed during onboarding."
      },
      {
        q: "How is reconciliation different from posting?",
        a: "Posting assigns money to accounts. Reconciliation confirms that the money you received matches what the payer said it sent — and that every dollar was applied."
      }
    ],
    related: [
      {
        name: "Accounts Receivable Follow-up",
        desc: "Working outstanding balances across the aging report.",
        href: "/services/accounts-receivable"
      },
      {
        name: "Denial Management & Appeals",
        desc: "Recovering amounts that were never paid in the first place.",
        href: "/services/denial-management"
      },
      {
        name: "Medical Billing",
        desc: "The full billing workflow posting sits inside.",
        href: "/services/medical-billing"
      }
    ]
  },
  "eligibility-verification": {
    slug: "eligibility-verification",
    eyebrow: "Insurance Eligibility Verification",
    title: "Eligibility Verification Before Services Are Rendered",
    subtitle: "Real-time eligibility checks that confirm coverage, benefits, and patient responsibility before a service is provided.",
    introTitle: "Why Verification Matters",
    introParagraphs: [
      "Coverage that was not active on the date of service cannot be made active retroactively in most situations. Verification performed after the visit is a report on what happened; verification performed before it is a chance to change what happens.",
      "We confirm benefits, coverage status, copay and deductible amounts, and any referral or authorization requirements before the appointment — while there is still time to act on the information."
    ],
    includesTitle: "What verification covers",
    includes: [
      "Real-time eligibility checks through payer connectivity",
      "Coverage status and effective date confirmation",
      "Copay, coinsurance, and deductible amount retrieval",
      "Referral and prior authorization requirement identification",
      "Coordination of benefits determination for secondary payers",
      "Out-of-pocket estimate communication to patients",
      "Verification exception escalation"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Fewer surprises for patients",
        detail: "Responsibility amounts are known before the visit, not after the bill arrives."
      },
      {
        lead: "Reduced claim denials",
        detail: "Coverage and authorization issues are caught before the claim is built."
      },
      {
        lead: "Better patient experience",
        detail: "Verification conversations happen at scheduling, when they are useful."
      },
      {
        lead: "Secondary payer clarity",
        detail: "Coordination of benefits is settled before services are rendered."
      }
    ],
    faqs: [
      {
        q: "When is verification performed?",
        a: "Verification is performed before the appointment wherever the schedule allows, and the same day for visits booked close to the service date."
      },
      {
        q: "How are verification results delivered to staff?",
        a: "Results are delivered into your existing workflow so front desk and clinical staff can see status without checking a separate system."
      },
      {
        q: "What happens when eligibility cannot be confirmed?",
        a: "The exception is escalated to a specialist who works the payer directly and updates the record so staff can advise the patient accurately."
      },
      {
        q: "Does verification replace authorization?",
        a: "No. Verification confirms coverage; prior authorization is a separate payer requirement. Our verification identifies where authorization is needed so it can be obtained in time."
      }
    ],
    related: [
      {
        name: "Medical Billing",
        desc: "The billing workflow verification protects.",
        href: "/services/medical-billing"
      },
      {
        name: "Revenue Cycle Management",
        desc: "Full-cycle oversight including intake and eligibility.",
        href: "/services/revenue-cycle-management"
      },
      {
        name: "Claims Submission & Tracking",
        desc: "Submitting claims with accurate coverage information.",
        href: "/services/claims-management"
      }
    ]
  },
  "accounts-receivable": {
    slug: "accounts-receivable",
    eyebrow: "Accounts Receivable Follow-up",
    title: "Proactive Accounts Receivable Follow-up",
    subtitle: "Structured A/R review, payer follow-up, and patient balance management that works the aging report instead of reporting on it.",
    introTitle: "What A/R Follow-Up Covers",
    introParagraphs: [
      "An aging report is a snapshot. It tells you what is outstanding and how old it is, but by itself it does not do anything about the balances in it. A/R follow-up is the active work of closing those balances — and the discipline of doing it before they become write-offs.",
      "We work the aging report on a defined cadence, sorting balances by age, payer, and probability of collection, then taking the right action on each: payer follow-up, claim correction, appeal, or patient contact."
    ],
    includesTitle: "A/R follow-up scope",
    includes: [
      "Regular A/R aging review and balance prioritization",
      "Payer follow-up on outstanding insurance balances",
      "Patient balance follow-up and statement delivery",
      "Claim status correction and resubmission as needed",
      "Coordination between denial management and collections activity",
      "Escalation of high-value or aged balances",
      "A/R performance reporting and reduction recommendations"
    ],
    benefitsTitle: "What practices gain",
    benefits: [
      {
        lead: "Balances worked, not just reported",
        detail: "The aging report becomes a work queue with owners rather than a monthly document."
      },
      {
        lead: "Earlier intervention",
        detail: "Balances are addressed while they are still recoverable and before they age into write-off."
      },
      {
        lead: "Prioritized effort",
        detail: "High-value and high-probability balances get attention first, so effort is not spread thin."
      },
      {
        lead: "Clear write-off decisions",
        detail: "Balances that genuinely cannot be collected are identified and processed deliberately."
      }
    ],
    faqs: [
      {
        q: "How often is the A/R reviewed?",
        a: "Review cadence is agreed during onboarding and depends on volume. Higher-volume practices are typically worked on a tighter cycle."
      },
      {
        q: "Does A/R follow-up include patient balances?",
        a: "Yes. Patient statement delivery and patient balance follow-up are included alongside payer follow-up."
      },
      {
        q: "How do you decide what to write off?",
        a: "Balances are reviewed individually against payer and patient contact history. Write-off decisions are made deliberately and reported, rather than defaulting to whatever has aged past a threshold."
      },
      {
        q: "Can we see the A/R status at any time?",
        a: "Status reporting is part of the standard reporting cadence and can be structured to match how your practice reviews financials."
      }
    ],
    related: [
      {
        name: "Payment Posting & Reconciliation",
        desc: "Accurate posting so balances close correctly in the first place.",
        href: "/services/payment-posting"
      },
      {
        name: "Denial Management & Appeals",
        desc: "Recovering balances that require a payer appeal.",
        href: "/services/denial-management"
      },
      {
        name: "Revenue Cycle Management",
        desc: "The full-cycle context for A/R performance.",
        href: "/services/revenue-cycle-management"
      }
    ]
  }
};
function ServiceDetailPage({ slug, data }) {
  const service = data ?? SERVICE_DETAILS[slug];
  if (!service) {
    return /* @__PURE__ */ jsx("div", { className: "service-detail", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("h1", { className: "h1", children: "Service not found" }),
      /* @__PURE__ */ jsx(Link, { to: "/services", className: "btn btn--primary btn--md", children: "Back to Services" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("article", { className: "service-detail", children: [
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx(
      Breadcrumbs,
      {
        items: [
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.eyebrow, href: `/services/${service.slug}` }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("header", { className: "service-detail__header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow service-detail__eyebrow", children: service.eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "h1 service-detail__title", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "lead service-detail__subtitle", children: service.subtitle }),
      /* @__PURE__ */ jsxs("div", { className: "service-detail__actions", children: [
        /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", size: "md", children: [
          "Request a Consultation",
          /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
        ] }),
        /* @__PURE__ */ jsx(Button, { to: "/services", variant: "secondary", size: "md", children: "All Services" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "service-detail__section", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "service-detail__intro-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "service-detail__intro", children: [
        /* @__PURE__ */ jsx("h2", { className: "h3", children: service.introTitle }),
        service.introParagraphs.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 40))),
        service.confirmationNote && /* @__PURE__ */ jsxs("p", { className: "service-detail__note", children: [
          /* @__PURE__ */ jsx(Info, { className: "service-detail__note-icon", size: 18 }),
          /* @__PURE__ */ jsx("span", { children: service.confirmationNote })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "service-detail__scope", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4", children: service.includesTitle }),
        /* @__PURE__ */ jsx("ul", { className: "service-detail__list", children: service.includes.map((item) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Check, { className: "service-detail__list-icon", size: 16 }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "service-detail__section service-detail__section--tint", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Outcomes",
          title: service.benefitsTitle,
          subtitle: "What practices typically experience when this function is handled by a dedicated team."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "service-detail__benefits", children: service.benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { className: "service-detail__benefit", children: [
        /* @__PURE__ */ jsx("h4", { className: "h4", children: benefit.lead }),
        /* @__PURE__ */ jsx("p", { children: benefit.detail })
      ] }, benefit.lead)) })
    ] }) }),
    service.process && service.process.length > 0 && /* @__PURE__ */ jsx("section", { className: "service-detail__section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Process",
          title: `How ${service.eyebrow} Works`,
          subtitle: "The sequence we follow, and what happens at each stage."
        }
      ),
      /* @__PURE__ */ jsx("ol", { className: "service-detail__process", children: service.process.map((step, index) => /* @__PURE__ */ jsxs("li", { className: "service-detail__process-step", children: [
        /* @__PURE__ */ jsx("span", { className: "service-detail__process-index", "aria-hidden": "true", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "h4", children: step.title }),
          /* @__PURE__ */ jsx("p", { children: step.description })
        ] })
      ] }, step.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "service-detail__section service-detail__section--tint", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "FAQ",
          title: `${service.eyebrow} Questions`,
          subtitle: "Common questions we are asked about this service."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "service-detail__faq", children: /* @__PURE__ */ jsx(
        Accordion,
        {
          items: service.faqs.map((faq, index) => ({
            id: `${service.slug}-faq-${index}`,
            title: faq.q,
            content: /* @__PURE__ */ jsx("p", { children: faq.a })
          }))
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "service-detail__section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          eyebrow: "Related Services",
          title: "How This Fits With The Rest",
          subtitle: "Services that commonly work alongside this one."
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "service-detail__related", children: service.related.map((item) => /* @__PURE__ */ jsxs(Link, { to: item.href, className: "service-detail__related-card", children: [
        /* @__PURE__ */ jsx("h4", { className: "h4", children: item.name }),
        /* @__PURE__ */ jsx("p", { children: item.desc }),
        /* @__PURE__ */ jsxs("span", { className: "service-detail__related-link", children: [
          "Learn more ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
        ] })
      ] }, item.href)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "service-detail__cta", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "service-detail__cta-inner", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "h2", children: "Talk through your revenue cycle with us" }),
        /* @__PURE__ */ jsx("p", { className: "lead", children: "A short, no-obligation conversation about how this service fits your practice. No patient information required." })
      ] }),
      /* @__PURE__ */ jsx(Button, { to: "/request-a-quote", variant: "accent", size: "lg", children: "Request a Consultation" })
    ] }) }) })
  ] });
}
function ServiceDetailRoute() {
  const { slug = "" } = useParams();
  return /* @__PURE__ */ jsx(ServiceDetailPage, { slug });
}
function ArticlePage({ article, crumbLabel }) {
  return /* @__PURE__ */ jsxs("div", { className: "article", children: [
    /* @__PURE__ */ jsx("header", { className: "article__header", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          items: [
            { name: "Home", href: "/" },
            { name: "Resources", href: "/resources" },
            { name: crumbLabel, href: `/resources/${article.slug}` }
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "eyebrow article__eyebrow", children: article.category }),
      /* @__PURE__ */ jsx("h1", { className: "article__title", children: article.title }),
      /* @__PURE__ */ jsx("p", { className: "lead article__summary", children: article.summary }),
      /* @__PURE__ */ jsxs("div", { className: "article__meta", children: [
        /* @__PURE__ */ jsxs("span", { className: "article__meta-item", children: [
          /* @__PURE__ */ jsx(Clock, { size: 14, "aria-hidden": "true" }),
          article.readTime
        ] }),
        /* @__PURE__ */ jsx("span", { className: "article__meta-item", children: "Educational resource" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "article__body", children: /* @__PURE__ */ jsxs("div", { className: "container article__body-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "article__content", children: [
        article.sections.map((section) => /* @__PURE__ */ jsxs("section", { className: "article__section", children: [
          /* @__PURE__ */ jsx("h2", { className: "article__heading", children: section.heading }),
          section.body.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph.slice(0, 32))),
          section.list && /* @__PURE__ */ jsx("ul", { className: "article__list", children: section.list.map((item) => /* @__PURE__ */ jsxs("li", { className: "article__list-item", children: [
            /* @__PURE__ */ jsx(Check, { className: "article__list-icon", size: 16, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] }, section.heading)),
        /* @__PURE__ */ jsxs("div", { className: "article__disclaimer", children: [
          /* @__PURE__ */ jsx(
            AlertTriangle,
            {
              className: "article__disclaimer-icon",
              size: 18,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("p", { children: article.disclaimer })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "article__cta", children: [
          /* @__PURE__ */ jsx("h2", { className: "h3", children: "Not sure where to start?" }),
          /* @__PURE__ */ jsx("p", { children: "The right first step is usually a conversation about your practice revenue cycle. This article is informational only, so our team can help you decide what to outsource and how to organize it." }),
          /* @__PURE__ */ jsxs(Button, { to: "/request-a-quote", variant: "primary", children: [
            "Request a Consultation",
            /* @__PURE__ */ jsx(ArrowRight, { className: "btn__icon", size: 16 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "article__aside", children: /* @__PURE__ */ jsxs("div", { className: "article__aside-card", children: [
        /* @__PURE__ */ jsx("h3", { className: "h4", children: "Related resources" }),
        /* @__PURE__ */ jsxs("ul", { className: "article__aside-list", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/medical-billing-basics", children: "Medical Billing Basics" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/understanding-claim-denials", children: "Understanding Claim Denials" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/resources/revenue-cycle-management", children: "Revenue Cycle Management Explained" }) })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/resources", className: "article__aside-all", children: "View all resources" })
      ] }) })
    ] }) })
  ] });
}
function ResourceDetailRoute() {
  const { slug = "" } = useParams();
  const article = ARTICLES[slug];
  if (!article) {
    return /* @__PURE__ */ jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsx("h1", { className: "h1", children: "Resource not found" }),
      /* @__PURE__ */ jsx("p", { className: "lead", children: "The educational resource you are looking for does not exist or has moved." }),
      /* @__PURE__ */ jsxs("div", { className: "not-found__actions", children: [
        /* @__PURE__ */ jsx(Link, { to: "/resources", children: /* @__PURE__ */ jsx(Button, { variant: "primary", children: "Back to Resources" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Back to Home" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx(ArticlePage, { article, crumbLabel: article.title });
}
function App() {
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services", element: /* @__PURE__ */ jsx(Services, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/services/:slug", element: /* @__PURE__ */ jsx(ServiceDetailRoute, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/specialties", element: /* @__PURE__ */ jsx(Specialties, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/how-it-works", element: /* @__PURE__ */ jsx(HowItWorks, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/resources", element: /* @__PURE__ */ jsx(Resources, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/resources/:slug", element: /* @__PURE__ */ jsx(ResourceDetailRoute, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/faq", element: /* @__PURE__ */ jsx(FAQ, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/request-a-quote", element: /* @__PURE__ */ jsx(RequestAQuote, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(Terms, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) }) });
}
export {
  App
};
//# sourceMappingURL=ssr-entry.mjs.map
