import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);

  protected searchKeyword = '';
  protected searchLocation = '';

  protected readonly categories = this.jobService.categories;
  protected readonly featuredJobs = this.jobService.featuredJobs;
  protected readonly features = this.jobService.features;

  protected onSearch(): void {
    this.router.navigate(['/jobs'], {
      queryParams: {
        keyword: this.searchKeyword.trim() || null,
        location: this.searchLocation.trim() || null,
      },
    });
  }
}
