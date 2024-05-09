import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function hasSpecialCharecter(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasSpecialCharecter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        return !hasSpecialCharecter ? {SpecialCharecter:true}: null;
    }
}