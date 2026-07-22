import { AbstractControl, ValidationErrors } from '@angular/forms';

export const PHONE_PATTERN = /^(\+?\d{1,3}[-\s]?)?\d{10}$/;
export const CTC_PATTERN = /^[\d.,]+(\s*(LPA|lpa|L|l|k|K))?$/;

const RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function requiredFileValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as File | null;
  return value instanceof File && value.size > 0 ? null : { required: true };
}

export function resumeFileValidator(control: AbstractControl): ValidationErrors | null {
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
