import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  const isOpen = (id: string) => open === id;
  const handleClick = (id: string) => setOpen((prev) => (prev === id ? null : id));

  const classes = ['accordion', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {items.map((item) => {
        const expanded = isOpen(item.id);
        return (
          <div key={item.id} className="accordion__item">
            <button
              className={`accordion__trigger ${expanded ? 'accordion__trigger--open' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-expanded={expanded}
              type="button"
            >
              <span className="accordion__title">{item.title}</span>
              <ChevronDown className="accordion__icon" size={18} />
            </button>
            <div
              className={`accordion__panel ${expanded ? 'accordion__panel--open' : ''}`}
              hidden={!expanded}
            >
              <div className="accordion__content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
