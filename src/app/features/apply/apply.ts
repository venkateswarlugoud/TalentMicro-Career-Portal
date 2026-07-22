import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import {
  APPLY_EXPERIENCE_OPTIONS,
  APPLY_NOTICE_PERIOD_OPTIONS,
  APPLY_QUALIFICATION_OPTIONS,
} from '../../core/constants/job.constants';
import { JobService } from '../../core/services/job.service';
import {
  CTC_PATTERN,
  PHONE_PATTERN,
  requiredFileValidator,
  resumeFileValidator,
} from '../../core/validators/file.validators';

@Component({
  selector: 'app-apply',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './apply.html',
  styleUrl: './apply.scss',
})
export class Apply {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);

  protected readonly experienceOptions = APPLY_EXPERIENCE_OPTIONS;
  protected readonly qualificationOptions = APPLY_QUALIFICATION_OPTIONS;
  protected readonly noticePeriodOptions = APPLY_NOTICE_PERIOD_OPTIONS;

  private readonly jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

  protected readonly job = computed(() => this.jobService.getJobSummary(this.jobId()));

  protected readonly applicationForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    currentLocation: ['', [Validators.required, Validators.minLength(2)]],
    experience: ['', Validators.required],
    highestQualification: ['', Validators.required],
    skills: ['', [Validators.required, Validators.minLength(10)]],
    currentCompany: ['', [Validators.required, Validators.minLength(2)]],
    currentCtc: ['', [Validators.required, Validators.pattern(CTC_PATTERN)]],
    expectedCtc: ['', [Validators.required, Validators.pattern(CTC_PATTERN)]],
    noticePeriod: ['', Validators.required],
    resume: [null as File | null, [requiredFileValidator, resumeFileValidator]],
    coverLetter: ['', [Validators.required, Validators.minLength(50)]],
  });

  protected readonly selectedFileName = signal('');

  protected onResumeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.applicationForm.patchValue({ resume: file });
    this.applicationForm.get('resume')?.markAsTouched();
    this.applicationForm.get('resume')?.updateValueAndValidity();
    this.selectedFileName.set(file?.name ?? '');
  }

  protected onSubmit(): void {
    this.applicationForm.markAllAsTouched();

    if (this.applicationForm.invalid) {
      return;
    }

    this.router.navigate(['/thank-you'], {
      queryParams: { jobId: this.job().id },
    });
  }

  protected onReset(): void {
    this.applicationForm.reset();
    this.selectedFileName.set('');
  }

  protected hasError(controlName: string, errorCode: string): boolean {
    const control = this.applicationForm.get(controlName);
    return !!(control?.hasError(errorCode) && (control.touched || control.dirty));
  }

  protected showError(controlName: string): boolean {
    const control = this.applicationForm.get(controlName);
    return !!(control?.invalid && (control.touched || control.dirty));
  }
}
