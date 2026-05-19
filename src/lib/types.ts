export interface SocialLink {
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email" | "cv";
}

export interface SiteIdentity {
  name: string;
  shortName: string;
  monogram: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cvPath: string;
}

export interface ExpertiseColumn {
  title: string;
  points: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  status: string;
  coursework: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  identity: SiteIdentity;
  nav: NavItem[];
  socials: SocialLink[];
  heroTagline: string;
  about: string;
  quickFacts: { label: string; value: string }[];
  expertise: ExpertiseColumn[];
  techStack: SkillGroup[];
  spokenLanguages: string[];
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem;
}
