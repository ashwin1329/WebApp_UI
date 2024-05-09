import { ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const cpassword = formGroup.get('cpassword');

    if (!password || !cpassword) {
      return null;
    }

    const passwordMismatch = password.value !== cpassword.value;
    if(passwordMismatch)
      {
        return {'pMismatch' : true}
      }
    else{
      return null;
    }
  };
}