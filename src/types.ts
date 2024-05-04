export interface Job {
  id: string;
  datePosted: string;
  company: { name: string; description: string; logo: string };
  title: string;
  location: string;
  skills: string[];
  experience: { min: number; max?: number };
  estimatedSalary: { min: number; max: number };
  viewLink: string;
  applyLink: string;
}
