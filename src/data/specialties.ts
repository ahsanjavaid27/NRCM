export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  confirmed: boolean;
}

export const SPECIALTIES: Specialty[] = [
  {
    id: "primary-care",
    name: "Primary Care",
    description: "Billing support for family medicine, internal medicine, and general practice settings.",
    icon: "Stethoscope",
    confirmed: false,
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Specialized billing for cardiovascular practices including procedure-specific coding.",
    icon: "Heart",
    confirmed: false,
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Revenue cycle support for orthopedic surgery and sports medicine practices.",
    icon: "Bone",
    confirmed: false,
  },
  {
    id: "mental-health",
    name: "Mental Health",
    description: "Billing and claims support for behavioral health, psychiatry, and therapy practices.",
    icon: "Brain",
    confirmed: false,
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Specialized billing support for dermatology and skin care practices.",
    icon: "CircleDot",
    confirmed: false,
  },
  {
    id: "urgent-care",
    name: "Urgent Care",
    description: "High-volume billing support for urgent care and walk-in clinic environments.",
    icon: "Activity",
    confirmed: false,
  },
  {
    id: "multispecialty",
    name: "Multispecialty Practices",
    description: "Coordinated revenue cycle management for practices with multiple specialties under one roof.",
    icon: "Building",
    confirmed: false,
  },
];
