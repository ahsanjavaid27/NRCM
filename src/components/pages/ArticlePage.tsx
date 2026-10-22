import { Link } from "react-router-dom";
import { ArrowRight, Clock, Check, AlertTriangle } from "lucide-react";
import Breadcrumbs from "../layout/Breadcrumbs";
import Button from "../ui/Button";
import { type Article } from "../../data/articles";
import "./ArticlePage.css";

export interface ArticlePageProps {
  article: Article;
  /** Display name for the current page in the breadcrumb trail. */
  crumbLabel: string;
}

export default function ArticlePage({ article, crumbLabel }: ArticlePageProps) {
  return (
    <div className="article">
      <header className="article__header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: crumbLabel, href: `/resources/${article.slug}` },
            ]}
          />
          <p className="eyebrow article__eyebrow">{article.category}</p>
          <h1 className="article__title">{article.title}</h1>
          <p className="lead article__summary">{article.summary}</p>
          <div className="article__meta">
            <span className="article__meta-item">
              <Clock size={14} aria-hidden="true" />
              {article.readTime}
            </span>
            <span className="article__meta-item">Educational resource</span>
          </div>
        </div>
      </header>

      <div className="article__body">
        <div className="container article__body-grid">
          <div className="article__content">
            {article.sections.map((section) => (
              <section key={section.heading} className="article__section">
                <h2 className="article__heading">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="article__list">
                    {section.list.map((item) => (
                      <li key={item} className="article__list-item">
                        <Check className="article__list-icon" size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="article__disclaimer">
              <AlertTriangle
                className="article__disclaimer-icon"
                size={18}
                aria-hidden="true"
              />
              <p>{article.disclaimer}</p>
            </div>

            <div className="article__cta">
              <h2 className="h3">Not sure where to start?</h2>
              <p>
                The right first step is usually a conversation about your practice revenue
                cycle. This article is informational only, so our team can help you decide
                what to outsource and how to organize it.
              </p>
              <Button to="/request-a-quote" variant="primary">
                Request a Consultation
                <ArrowRight className="btn__icon" size={16} />
              </Button>
            </div>
          </div>

          <aside className="article__aside">
            <div className="article__aside-card">
              <h3 className="h4">Related resources</h3>
              <ul className="article__aside-list">
                <li>
                  <Link to="/resources/medical-billing-basics">Medical Billing Basics</Link>
                </li>
                <li>
                  <Link to="/resources/understanding-claim-denials">
                    Understanding Claim Denials
                  </Link>
                </li>
                <li>
                  <Link to="/resources/revenue-cycle-management">
                    Revenue Cycle Management Explained
                  </Link>
                </li>
              </ul>
              <Link to="/resources" className="article__aside-all">
                View all resources
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
