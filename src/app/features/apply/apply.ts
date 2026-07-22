import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

interface JobSummary {
  id: string;
  title: string;
  company: string;
  location: string;
  logoInitials: string;
  logoColor: string;
}

const PHONE_PATTERN = /^(\+?\d{1,3}[-\s]?)?\d{10}$/;
const CTC_PATTERN = /^[\d.,]+(\s*(LPA|lpa|L|l|k|K))?$/;
const RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function requiredFileValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as File | null;
  return value instanceof File && value.size > 0 ? null : { required: true };
}

function resumeFileValidator(control: AbstractControl): ValidationErrors | null {
  const file = control.value as File | null;

  if (!(file instanceof File) || file.size === 0) {
    return { required: true };
  }

  if (!RESUME_TYPES.includes(file.type)) {
    return { invalidFileType: true };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { maxFileSize: true };
  }

  return null;
}

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

  protected readonly experienceOptions = [
    'Fresher (0 years)',
    '1–2 years',
    '2–4 years',
    '4–6 years',
    '6–8 years',
    '8+ years',
  ];

  protected readonly qualificationOptions = [
    'High School',
    'Diploma',
    "Bachelor's Degree",
    "Master's Degree",
    'MBA',
    'PhD',
    'Other',
  ];

  protected readonly noticePeriodOptions = [
    'Immediate',
    '15 days',
    '30 days',
    '45 days',
    '60 days',
    '90 days',
    'More than 90 days',
  ];

  private readonly jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

  private readonly jobsCatalog: Record<string, JobSummary> = {
    '1': {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Bangalore, India',
      logoInitials: 'TN',
      logoColor: '#0d6efd',
    },
    '2': {
      id: '2',
      title: 'Data Scientist',
      company: 'Insight Analytics',
      location: 'Hyderabad, India',
      logoInitials: 'IA',
      logoColor: '#6610f2',
    },
    '3': {
      id: '3',
      title: 'UI/UX Designer',
      company: 'PixelCraft Studio',
      location: 'Remote',
      logoInitials: 'PC',
      logoColor: '#d63384',
    },
    '4': {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudScale Inc.',
      location: 'Pune, India',
      logoInitials: 'CS',
      logoColor: '#198754',
    },
    '5': {
      id: '5',
      title: 'Product Manager',
      company: 'Innovate Labs',
      location: 'Mumbai, India',
      logoInitials: 'IL',
      logoColor: '#fd7e14',
    },
    '6': {
      id: '6',
      title: 'Backend Developer',
      company: 'DataFlow Systems',
      location: 'Chennai, India',
      logoInitials: 'DF',
      logoColor: '#0dcaf0',
    },
  };

  protected readonly job = computed(() => {
    const id = this.jobId();
    return this.jobsCatalog[id] ?? this.jobsCatalog['1'];
  });

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

  protected selectedFileName = '';

  protected onResumeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.applicationForm.patchValue({ resume: file });
    this.applicationForm.get('resume')?.markAsTouched();
    this.applicationForm.get('resume')?.updateValueAndValidity();
    this.selectedFileName = file?.name ?? '';
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
    this.selectedFileName = '';
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
