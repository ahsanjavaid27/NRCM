import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import { FAQS as faqs } from '../data/faqs';
import './FAQ.css';

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  services: 'Services',
  privacy: 'Privacy & Security',
  'getting-started': 'Getting Started',
  onboarding: 'Onboarding',
};

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const found = new Set(faqs.map((faq) => faq.category));
    return ['all', ...Array.from(found)];
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = category === 'all' || faq.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;
      return (
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.category.toLowerCase().includes(term)
      );
    });
  }, [search, category]);

  const items = filtered.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div>
        <p>{faq.answer}</p>
        <span className="faq__tag">
          {CATEGORY_LABELS[faq.category] ?? faq.category}
        </span>
      </div>
    ),
  }));

  const reset = () => {
    setSearch('');
    setCategory('all');
  };

  return (
    <div className="page faq">
      <section className="page-header">
        <div className="container">
          <SectionHeading
            eyebrow="Support"
            title="Frequently Asked Questions"
            subtitle="Direct answers about our services, onboarding, communication, and how we handle your data."
            center
          />
        </div>
      </section>

      <section className="faq__section">
        <div className="container">
          <div className="faq__controls">
            <div className="faq__search-wrap">
              <Search size={18} aria-hidden="true" className="faq__search-icon" />
              <input
                type="search"
                className="faq__search"
                placeholder="Search questions and answers"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search frequently asked questions"
              />
              {search && (
                <button
                  type="button"
                  className="faq__search-clear"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div
              className="faq__categories"
              role="group"
              aria-label="Filter questions by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`faq__chip ${category === item ? 'faq__chip--active' : ''}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item === 'all'
                    ? 'All questions'
                    : (CATEGORY_LABELS[item] ?? item)}
                </button>
              ))}
            </div>
          </div>

          <p className="faq__count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
            {category !== 'all'
              ? ` in ${CATEGORY_LABELS[category] ?? category}`
              : ''}
          </p>

          {items.length > 0 ? (
            <Accordion items={items} className="faq__accordion" />
          ) : (
            <div className="faq__empty">
              <h3 className="h4">No matching questions</h3>
              <p>
                We could not find a question that matches your search. Try a
                different term, or send us the question directly and we will
                answer it.
              </p>
              <div className="faq__empty-actions">
                <Button variant="secondary" onClick={reset}>
                  Clear filters
                </Button>
                <Link to="/contact">
                  <Button variant="primary">Ask us directly</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="faq__cta">
        <div className="container faq__cta-inner">
          <div>
            <h2 className="h2">Still have a question?</h2>
            <p className="lead">
              Send a note and we will come back to you with a straight answer.
              No patient information is required for an initial conversation.
            </p>
          </div>
          <div className="faq__cta-actions">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/request-a-quote">
              <Button variant="secondary" size="lg">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
