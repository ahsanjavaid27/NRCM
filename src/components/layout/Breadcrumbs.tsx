import { Link } from "react-router-dom";
import "../../styles/global.css";
import "./Breadcrumbs.css";

type BreadcrumbsProps = {
  items: { name: string; href: string }[];
  className?: string;
};

export default function Breadcrumbs({
  items,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className={`breadcrumbs ${className}`.trim()}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => (
          <li key={item.name} className="breadcrumbs__item">
            {index > 0 && (
              <span className="breadcrumbs__separator" aria-hidden="true">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M1 1l6 6M1 7l6-6" />
                </svg>
              </span>
            )}
            <Link to={item.href} className="breadcrumbs__link">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
