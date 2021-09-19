export interface ResumeData {
  metadata: Metadata;
  education: Education[];
  work: Work[];
  projects: Project[];
  skills: string[];
  languages: string[];
  achievements: Achievements[];
  socials: { name: string; link: string }[];
}

export interface Education {
  name: string;
  startYear: number;
  endYear: number;
  field: string;
}
export interface Project {
  name: string;
  links: any[];
  technologies: string[];
  data: string[];
}

export interface Achievements {
  title: string;
  data: string[];
}
export interface Metadata {
  name: string;
  email: string;
  website: string;
  phone: string;
  address: string;
}

export interface Work {
  company: string;
  startYear: number;
  endYear: number | null;
  present: boolean;
  role: string;
  location: string;
  technologies: string[];
  data: string[];
}
