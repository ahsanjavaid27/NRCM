import "./SectionHeading.css";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  center = false,
}: SectionHeadingProps) {
  const cls = [
    "section-heading",
    center ? "section-heading--center" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {eyebrow && <span className="eyebrow section-heading__eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="lead">{subtitle}</p>}
    </div>
  );
}
