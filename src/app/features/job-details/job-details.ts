import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobService);

  private readonly jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

  protected readonly job = computed(() => this.jobService.getJobDetail(this.jobId()));

  protected readonly relatedJobs = computed(() =>
    this.jobService.getRelatedJobs(this.jobId()),
  );

  protected copyJobLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
