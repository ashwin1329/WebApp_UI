import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasNumber(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasNumber = /[0-9]+/.test(value);
        return !hasNumber ? {number:true}: null;
    }
}