import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { empty } from './utils';

export function strictlyPositiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (empty(value)) {
      return null;
    }
    return value > 0 ? null : { notPositive: true };
  };
}

export function dateFieldsStrictlyGreaterThanOtherValidator(
  date1Field: string,
  date2Field: string
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const date1Control = control.get(date1Field);
    const date2Control = control.get(date2Field);
    if (date1Control && date2Control) {
      const date1: Date = date1Control.value;
      const date2: Date = date2Control.value;

      if (date2 <= date1) {
        return { dateError: true };
      }
    }

    return null;
  };
}
