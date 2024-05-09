import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasLowerCase(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasLowerCase = /[a-z]+/.test(value);
        return !hasLowerCase ? {Lcase:true}: null;
    }
}