import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { ARTICLES, ARTICLE_ORDER } from "../data/articles";
import SectionHeading from "../components/ui/SectionHeading";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import "./Resources.css";

const TERMINOLOGY = [
  {
    term: "Claim Denial",
    definition:
      "A claim a payer has returned without payment, usually for a specific reason code that can be corrected or appealed.",
  },
  {
    term: "ERA / EOB",
    definition:
      "Electronic Remittance Advice or Explanation of Benefits — the payer document explaining how a claim was adjudicated.",
  },
  {
    term: "A/R Aging",
    definition:
      "A report grouping outstanding balances by how long they have remained unpaid.",
  },
  {
    term: "Charge Capture",
    definition:
      "Recording a billable service so it can be turned into a claim.",
  },
  {
    term: "Claim Scrubbing",
    definition:
      "Reviewing a claim against payer rules before submission to catch errors and reduce rejections.",
  },
  {
    term: "Clean Claim Rate",
    definition:
      "The share of claims accepted by the payer on first submission without rework.",
  },
  {
    term: "Days in A/R",
    definition:
      "Average number of days between a charge being billed and the balance being collected.",
  },
  {
    term: "Payer Mix",
    definition:
      "The proportion of a practice's patient volume covered by each insurance payer.",
  },
  {
    term: "Timely Filing",
    definition:
      "The window within which a claim must be submitted, set by the payer or by contract.",
  },
  {
    term: "Net Collection Rate",
    definition:
      "The share of total charges that was actually collected, after contractual adjustments.",
  },
];

const GUIDES = ARTICLE_ORDER.map((slug) => ARTICLES[slug]);

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(GUIDES.map((guide) => guide.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return GUIDES.filter((guide) => {
      const matchesQuery =
        term.length === 0 ||
        guide.title.toLowerCase().includes(term) ||
        guide.summary.toLowerCase().includes(term) ||
        guide.sections.some((section) =>
          section.heading.toLowerCase().includes(term),
        );
      const matchesCategory =
        category === "all" || guide.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="resources-page">
      <header className="page-header">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
            ]}
          />
          <SectionHeading
            eyebrow="Resource Center"
            title="Practical education for practice administrators"
            subtitle="Original guides on billing, denials, and revenue cycle operations — written for the people who actually run the numbers. These are educational resources, not legal, financial, or reimbursement advice."
          />
        </div>
      </header>

      {/* Search + filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters">
            <div className="search">
              <Search className="search__icon" size={17} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search guides and terminology"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search resources"
              />
            </div>
            <div className="filters__chips" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`chip ${category === item ? "chip--active" : ""}`}
                >
                  {item === "all" ? "All" : item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="guides-section">
        <div className="container">
          <div className="guides-head">
            <h2 className="h3">Featured guides</h2>
            <p className="guides-count">
              {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="guides-grid">
              {filtered.map((guide) => (
                <article key={guide.slug} className="guide">
                  <p className="eyebrow guide__category">{guide.category}</p>
                  <h3 className="guide__title">
                    <Link to={`/resources/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="guide__summary">{guide.summary}</p>
                  <p className="guide__meta">{guide.readTime}</p>
                  <Link to={`/resources/${guide.slug}`} className="guide__link">
                    Read the guide
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state__title">Nothing matched your search</p>
              <p className="empty-state__body">
                Try a broader term, or reset the filters to see everything in the
                resource center.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Terminology */}
      <section className="terminology-section">
        <div className="container">
          <SectionHeading
            eyebrow="Reference"
            title="Medical billing terminology"
            subtitle="Plain definitions for the terms that come up in day-to-day revenue cycle work."
          />
          <dl className="glossary">
            {TERMINOLOGY.map((entry) => (
              <div key={entry.term} className="glossary__row">
                <dt className="glossary__term">{entry.term}</dt>
                <dd className="glossary__definition">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">Want this applied to your practice?</h2>
          <p className="cta-section__text">
            Reading about revenue cycles is useful. Having someone own the
            operational side of it is usually more useful.
          </p>
          <Button to="/request-a-quote" variant="primary" size="md">
            Request a Consultation
            <ArrowRight className="btn__icon" size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
