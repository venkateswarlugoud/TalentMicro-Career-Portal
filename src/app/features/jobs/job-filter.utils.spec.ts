import { describe, expect, it } from 'vitest';
import {
  matchesKeywordQuery,
  matchesLocationQuery,
  matchesSalaryRangeQuery,
  parseSalaryLabelLakhs,
} from './job-filter.utils';

describe('job-filter.utils', () => {
  const sampleJob = {
    title: 'Senior Frontend Developer',
    company: 'TechNova Solutions',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
    location: 'Bangalore, India',
    salaryLabel: '₹18L – ₹24L / year',
    salary: 2200000,
    type: 'Full-time',
  };

  it('matches partial multi-word keywords', () => {
    expect(matchesKeywordQuery(sampleJob, 'senior frontend deve')).toBe(true);
    expect(matchesKeywordQuery(sampleJob, 'angular developer')).toBe(true);
  });

  it('matches common location typos and aliases', () => {
    expect(matchesLocationQuery(sampleJob.location, 'banglore')).toBe(true);
    expect(matchesLocationQuery(sampleJob.location, 'bengaluru')).toBe(true);
    expect(matchesLocationQuery(sampleJob.location, 'bang')).toBe(true);
  });

  it('matches the screenshot search scenario', () => {
    expect(matchesKeywordQuery(sampleJob, 'senior frontend deve')).toBe(true);
    expect(matchesLocationQuery(sampleJob.location, 'banglore')).toBe(true);
  });

  it('matches salary ranges using label ranges', () => {
    expect(parseSalaryLabelLakhs(sampleJob.salaryLabel)).toEqual({ min: 18, max: 24 });
    expect(matchesSalaryRangeQuery(sampleJob, '10-20')).toBe(true);
    expect(matchesSalaryRangeQuery(sampleJob, '20-30')).toBe(true);
  });
});
