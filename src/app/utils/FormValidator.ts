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
