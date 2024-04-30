import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10)]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
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
    this.http
      .post('http://localhost:3000/signupUsers', this.signupForm.value)
      .subscribe(
        (res) => {
          this.successSnackBar();
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
    }
  }

  successSnackBar(){
    this._snackBar.open('Signup success!!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
  

  get fullName() {
    return this.signupForm.get('fullName');
  }
  get email() {
    return this.signupForm.get('email')
  }
  get mobile() {
    return this.signupForm.get('mobile')
  }
  get password(){
    return this.signupForm.get('password')
  }
}
