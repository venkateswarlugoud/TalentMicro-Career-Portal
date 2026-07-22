import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobService);
  });

  it('returns all job listings', () => {
    expect(service.allJobs().length).toBe(12);
  });

  it('returns featured jobs', () => {
    expect(service.featuredJobs().length).toBe(6);
  });

  it('returns job detail from catalog', () => {
    const detail = service.getJobDetail('1');
    expect(detail.title).toBe('Senior Frontend Developer');
    expect(detail.workingMode).toBe('Hybrid');
  });

  it('returns default detail for unknown catalog entries', () => {
    const detail = service.getJobDetail('99');
    expect(detail.id).toBe('99');
    expect(detail.title).toBe('Software Engineer');
  });

  it('returns job summary with fallback', () => {
    const summary = service.getJobSummary('99');
    expect(summary.id).toBe('1');
  });

  it('excludes current job from related jobs', () => {
    const related = service.getRelatedJobs('4');
    expect(related.every((job) => job.id !== '4')).toBe(true);
    expect(related.length).toBeLessThanOrEqual(3);
  });
});
