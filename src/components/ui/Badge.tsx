import type { ReactNode } from "react";
import "./Badge.css";

export interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "info" | "neutral";
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  const cls = ["badge", `badge--${variant}`, className].filter(Boolean).join(" ");

  return <span className={cls}>{children}</span>;
}
