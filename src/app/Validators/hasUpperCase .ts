import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasUpperCase(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);
        return !hasUpperCase ? {Ucase:true}: null;
    }
}