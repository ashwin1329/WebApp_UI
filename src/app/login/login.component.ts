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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  LoginhorizontalPosition: MatSnackBarHorizontalPosition = 'start';
  LoginverticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    if (this.loginForm) {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
    if (this.loginForm.valid){
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.successSnackBar();

          this.loginForm.reset();

          this.router.navigate(['dashboard']);
        } else {
          this.invalidSnackbar();
        }
      },
      (err) => {
        alert('Something went wrong!!');
      }
    );
  }
}

successSnackBar(){
  this._snackBar.open('Login success!!', 'close', {
    horizontalPosition: this.LoginhorizontalPosition,
    verticalPosition: this.LoginverticalPosition
  });
}

invalidSnackbar() {
  this._snackBar.open('Invalid email or password!!', 'close', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

get email() {
  return this.loginForm.get('email')
}

get password() {
  return this.loginForm.get('password')
}

}
