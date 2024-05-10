import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { hasUpperCase } from '../Validators/hasUpperCase ';
import { hasLowerCase } from '../Validators/hasLowerCase';
import { hasSpecialCharecter } from '../Validators/hasSpecialCharecter';
import { hasNumber } from '../Validators/hasNumber';
import { passwordMatchValidator } from '../Validators/passwordMatchValidator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public _snackBar: MatSnackBar,
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      LastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10)]],
      password: ['',[Validators.required, Validators.minLength(6), hasUpperCase(), hasLowerCase(), hasSpecialCharecter(), hasNumber()]],
      cpassword: ['', [Validators.required, passwordMatchValidator('password')]]      
    }
  );
  }

  signUp() {
    if (this.signupForm) {
      Object.keys(this.signupForm.controls).forEach((key) => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
    if (this.signupForm.valid) {
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res=>{
          this.successSnackBar();
          this.signupForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert('Something went wrong');
        })
      })








    // this.http
    //   .post('http://localhost:3000/signupUsers', this.signupForm.value)
    //   .subscribe(
    //     (res) => {
    //       this.successSnackBar();
    //       this.signupForm.reset();
    //       this.router.navigate(['login']);
    //     },
    //     (err) => {
    //       alert('Something went wrong');
    //     }
    //   );
    }
  }

  successSnackBar(){
    this._snackBar.open('Signup success!!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
  

  get FirstName() {
    return this.signupForm.get('FirstName');
  }
  get LastName() {
    return this.signupForm.get('LastName');
  }
  get email() {
    return this.signupForm.get('email')
  }
  get username() {
    return this.signupForm.get('username');
  }
  get mobile() {
    return this.signupForm.get('mobile')
  }
  get password(){
    return this.signupForm.get('password')
  }
  get cpassword(){
    return this.signupForm.get('cpassword')
  }
}
