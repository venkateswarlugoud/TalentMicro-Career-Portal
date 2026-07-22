import { Injectable, computed, signal } from '@angular/core';

import {
  DEFAULT_JOB_DETAIL,
  FEATURE_HIGHLIGHTS,
  FEATURED_JOB_COUNT,
  JOB_CATEGORIES,
  JOB_DETAIL_CATALOG,
  JOB_LISTINGS,
  RELATED_JOB_IDS,
} from '../data/job.data';
import type { FeatureHighlight, JobCategory } from '../models/home.model';
import type {
  FeaturedJob,
  JobDetail,
  JobListing,
  JobSummary,
  RelatedJob,
} from '../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly listings = signal(JOB_LISTINGS);

  readonly allJobs = this.listings.asReadonly();
  readonly categories = signal<JobCategory[]>(JOB_CATEGORIES).asReadonly();
  readonly features = signal<FeatureHighlight[]>(FEATURE_HIGHLIGHTS).asReadonly();

  readonly featuredJobs = computed(() =>
    this.listings()
      .slice(0, FEATURED_JOB_COUNT)
      .map((job) => this.toFeaturedJob(job)),
  );

  getListingById(id: string): JobListing | undefined {
    return this.listings().find((job) => job.id === id);
  }

  getJobSummary(id: string): JobSummary {
    const listing = this.getListingById(id) ?? this.getListingById('1');
    return this.toJobSummary(listing!);
  }

  getJobDetail(id: string): JobDetail {
    const catalogEntry = JOB_DETAIL_CATALOG[id];
    const listing = this.getListingById(id);

    if (catalogEntry && listing) {
      return {
        id: listing.id,
        title: listing.title,
        company: listing.company,
        location: listing.location,
        type: listing.type,
        experience: listing.experience,
        salary: listing.salaryLabel,
        postedDate: catalogEntry.postedDate,
        logoInitials: listing.logoInitials,
        logoColor: listing.logoColor,
        skills: listing.skills,
        workingMode: catalogEntry.workingMode,
        vacancyCount: catalogEntry.vacancyCount,
        description: catalogEntry.description,
        responsibilities: catalogEntry.responsibilities,
        qualifications: catalogEntry.qualifications,
        benefits: catalogEntry.benefits,
        aboutCompany: catalogEntry.aboutCompany,
      };
    }

    return {
      ...DEFAULT_JOB_DETAIL,
      id,
    };
  }

  getRelatedJobs(excludeId: string, limit = 3): RelatedJob[] {
    return RELATED_JOB_IDS.map((id) => this.getListingById(id))
      .filter((job): job is JobListing => !!job && job.id !== excludeId)
      .slice(0, limit)
      .map((job) => this.toRelatedJob(job));
  }

  private toFeaturedJob(job: JobListing): FeaturedJob {
    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salaryLabel,
      logoInitials: job.logoInitials,
      logoColor: job.logoColor,
    };
  }

  private toJobSummary(job: JobListing): JobSummary {
    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      logoInitials: job.logoInitials,
      logoColor: job.logoColor,
    };
  }

  private toRelatedJob(job: JobListing): RelatedJob {
    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salaryLabel,
      logoInitials: job.logoInitials,
      logoColor: job.logoColor,
    };
  }
}
