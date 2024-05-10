import { ValidatorFn, AbstractControl } from "@angular/forms";

export function passwordMatchValidator(passwordControl: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const confirmPaswwordValue = control.value;
    const passwordValue = control.parent?.get(passwordControl)?.value;
    const passwordMismatch = confirmPaswwordValue !== passwordValue;
    if(passwordMismatch)
      {
        return { pMismatch : true}
      }
    else{
      return null;
    }
  };
}