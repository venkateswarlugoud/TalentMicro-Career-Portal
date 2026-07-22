export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  experienceLevel: string;
  salary: number;
  salaryLabel: string;
  type: string;
  skills: string[];
  postedDate: string;
  postedDaysAgo: number;
  logoInitials: string;
  logoColor: string;
}

export interface JobDetailContent {
  workingMode: string;
  vacancyCount: number;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  aboutCompany: string;
}

export interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate: string;
  logoInitials: string;
  logoColor: string;
  skills: string[];
  workingMode: string;
  vacancyCount: number;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  aboutCompany: string;
}

export interface JobSummary {
  id: string;
  title: string;
  company: string;
  location: string;
  logoInitials: string;
  logoColor: string;
}

export interface FeaturedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logoInitials: string;
  logoColor: string;
}

export interface RelatedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  logoInitials: string;
  logoColor: string;
}

export interface JobFilters {
  keyword: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryRange: string;
}

export type JobSortOption = 'newest' | 'oldest' | 'salary-high' | 'salary-low' | 'title';

export type JobsViewMode = 'grid' | 'list';

export interface SalaryRangeOption {
  value: string;
  label: string;
}

export interface SortOptionItem {
  value: JobSortOption;
  label: string;
}

export type JobSearchTarget = Pick<
  JobListing,
  'title' | 'company' | 'skills' | 'location' | 'salaryLabel' | 'salary' | 'type'
>;
