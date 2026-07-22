import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  EMPTY_JOB_FILTERS,
  JOB_SORT_OPTIONS,
  JOBS_PAGE_SIZE,
  SALARY_RANGES,
} from '../../core/constants/job.constants';
import type { JobFilters, JobSortOption, JobsViewMode } from '../../core/models/job.model';
import { JobService } from '../../core/services/job.service';
import {
  matchesEmploymentTypeQuery,
  matchesKeywordQuery,
  matchesLocationQuery,
  matchesSalaryRangeQuery,
} from './job-filter.utils';
import {
  getPaginationRange,
  getVisiblePageNumbers,
  type PageNumber,
} from './pagination.utils';

@Component({
  selector: 'app-jobs',
  imports: [FormsModule, RouterLink, MatIconModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);

  protected readonly pageSize = JOBS_PAGE_SIZE;
  protected readonly currentPage = signal(1);
  protected readonly viewMode = signal<JobsViewMode>('grid');
  protected readonly sortBy = signal<JobSortOption>('newest');
  protected readonly savedJobIds = signal<Set<string>>(new Set());

  protected filterForm: JobFilters = { ...EMPTY_JOB_FILTERS };

  private readonly activeFilters = signal<JobFilters>({ ...EMPTY_JOB_FILTERS });

  protected readonly employmentTypes = EMPLOYMENT_TYPES;
  protected readonly experienceLevels = EXPERIENCE_LEVELS;
  protected readonly salaryRanges = SALARY_RANGES;
  protected readonly sortOptions = JOB_SORT_OPTIONS;

  protected readonly filteredJobs = computed(() => {
    let jobs = [...this.jobService.allJobs()];
    const filters = this.activeFilters();

    if (filters.keyword) {
      jobs = jobs.filter((job) => matchesKeywordQuery(job, filters.keyword));
    }

    if (filters.location) {
      jobs = jobs.filter((job) => matchesLocationQuery(job.location, filters.location));
    }

    if (filters.employmentType) {
      jobs = jobs.filter((job) => matchesEmploymentTypeQuery(job, filters.employmentType));
    }

    if (filters.experienceLevel) {
      jobs = jobs.filter((job) => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.salaryRange) {
      jobs = jobs.filter((job) => matchesSalaryRangeQuery(job, filters.salaryRange));
    }

    switch (this.sortBy()) {
      case 'oldest':
        jobs.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        break;
      case 'salary-high':
        jobs.sort((a, b) => b.salary - a.salary);
        break;
      case 'salary-low':
        jobs.sort((a, b) => a.salary - b.salary);
        break;
      case 'title':
        jobs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    return jobs;
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredJobs().length / this.pageSize)),
  );

  protected readonly paginatedJobs = computed(() => {
    const jobs = this.filteredJobs();
    const totalPages = Math.max(1, Math.ceil(jobs.length / this.pageSize));
    const page = Math.min(Math.max(1, this.currentPage()), totalPages);
    const start = (page - 1) * this.pageSize;
    return jobs.slice(start, start + this.pageSize);
  });

  protected readonly visiblePageNumbers = computed((): PageNumber[] =>
    getVisiblePageNumbers(this.currentPage(), this.totalPages()),
  );

  protected readonly paginationRange = computed(() =>
    getPaginationRange(this.currentPage(), this.pageSize, this.filteredJobs().length),
  );

  constructor() {
    effect(() => {
      const totalPages = this.totalPages();
      if (this.currentPage() > totalPages) {
        this.currentPage.set(totalPages);
      }
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const keyword = params.get('keyword')?.trim() ?? '';
      const location = params.get('location')?.trim() ?? '';
      const page = this.parsePageParam(params.get('page'));

      const filtersChanged =
        keyword !== this.filterForm.keyword || location !== this.filterForm.location;
      const pageChanged = page !== this.currentPage();

      if (!filtersChanged && !pageChanged) {
        return;
      }

      if (filtersChanged) {
        this.filterForm.keyword = keyword;
        this.filterForm.location = location;
        this.syncActiveFilters(false);
      }

      if (pageChanged) {
        this.currentPage.set(page);
      }
    });
  }

  protected applyFilters(): void {
    this.syncActiveFilters();
    this.syncUrlQueryParams();
  }

  protected clearFilters(): void {
    this.filterForm = { ...EMPTY_JOB_FILTERS };
    this.syncActiveFilters();
    this.router.navigate(['/jobs'], { replaceUrl: true });
  }

  protected setViewMode(mode: JobsViewMode): void {
    this.viewMode.set(mode);
  }

  protected onSortChange(value: JobSortOption): void {
    this.sortBy.set(value);
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.currentPage.set(page);
    this.syncUrlQueryParams();
    this.scrollToResults();
  }

  protected isEllipsis(page: PageNumber): page is 'ellipsis-start' | 'ellipsis-end' {
    return page === 'ellipsis-start' || page === 'ellipsis-end';
  }

  protected toggleSaveJob(jobId: string): void {
    this.savedJobIds.update((ids) => {
      const updated = new Set(ids);
      if (updated.has(jobId)) {
        updated.delete(jobId);
      } else {
        updated.add(jobId);
      }
      return updated;
    });
  }

  protected isJobSaved(jobId: string): boolean {
    return this.savedJobIds().has(jobId);
  }

  private syncActiveFilters(resetPage = true): void {
    this.activeFilters.set(this.normalizeFilters(this.filterForm));

    if (resetPage) {
      this.currentPage.set(1);
    }
  }

  private syncUrlQueryParams(includePage = true): void {
    const normalized = this.normalizeFilters(this.filterForm);

    this.router.navigate(['/jobs'], {
      replaceUrl: true,
      queryParams: {
        keyword: normalized.keyword || null,
        location: normalized.location || null,
        page: includePage && this.currentPage() > 1 ? this.currentPage() : null,
      },
    });
  }

  private normalizeFilters(filters: JobFilters): JobFilters {
    return {
      keyword: (filters.keyword ?? '').trim(),
      location: (filters.location ?? '').trim(),
      employmentType: filters.employmentType ?? '',
      experienceLevel: filters.experienceLevel ?? '',
      salaryRange: filters.salaryRange ?? '',
    };
  }

  private parsePageParam(value: string | null): number {
    const page = Number.parseInt(value ?? '1', 10);
    return Number.isFinite(page) && page > 0 ? page : 1;
  }

  private scrollToResults(): void {
    queueMicrotask(() => {
      document.getElementById('jobs-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
