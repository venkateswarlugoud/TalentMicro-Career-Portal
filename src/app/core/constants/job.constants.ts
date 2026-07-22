import type { JobFilters, SalaryRangeOption, SortOptionItem } from '../models/job.model';

export const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'] as const;

export const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead'] as const;

export const SALARY_RANGES: SalaryRangeOption[] = [
  { value: '0-10', label: 'Up to ₹10L' },
  { value: '10-20', label: '₹10L – ₹20L' },
  { value: '20-30', label: '₹20L – ₹30L' },
  { value: '30+', label: '₹30L+' },
];

export const JOB_SORT_OPTIONS: SortOptionItem[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
  { value: 'title', label: 'Title: A to Z' },
];

export const JOBS_PAGE_SIZE = 6;

export const EMPTY_JOB_FILTERS: JobFilters = {
  keyword: '',
  location: '',
  employmentType: '',
  experienceLevel: '',
  salaryRange: '',
};

export const APPLY_EXPERIENCE_OPTIONS = [
  'Fresher (0 years)',
  '1–2 years',
  '2–4 years',
  '4–6 years',
  '6–8 years',
  '8+ years',
] as const;

export const APPLY_QUALIFICATION_OPTIONS = [
  'High School',
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'MBA',
  'PhD',
  'Other',
] as const;

export const APPLY_NOTICE_PERIOD_OPTIONS = [
  'Immediate',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
  '90 days',
  'More than 90 days',
] as const;
