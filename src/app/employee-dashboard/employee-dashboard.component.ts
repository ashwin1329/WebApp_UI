import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomUppercasePipe } from '../custom.pipe';
import { AuthService } from '../services/auth.service';
import { EmployeeModel } from './employee-dashboard.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formbuilder: FormBuilder, private auth: AuthService, private _snackBar: MatSnackBar, private customUppercasePipe: CustomUppercasePipe) {}

  ngOnInit(): void {
    this.employeeForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10)]],
      salary: ['',[Validators.required,Validators.pattern("[0-9]*")]],
    });
    this.getAllEmployee();
    
  }

  postEmployeeDetails() {
    if (this.employeeForm) {
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
    this.employeeModelObj.firstName = this.employeeForm.value.firstName;
    this.employeeModelObj.lastName = this.employeeForm.value.lastName;
    this.employeeModelObj.email = this.employeeForm.value.email;
    this.employeeModelObj.mobile = this.employeeForm.value.mobile;
    this.employeeModelObj.salary = this.employeeForm.value.salary;
    if (this.employeeForm.valid) {
    // this.auth.postEmploye(this.employeeModelObj)
    // .subscribe(res=> {
    //     console.log(res);
    //     this.AddSnackbar();
    //     let ref = document.getElementById("cancel");
    //     ref?.click();
    //     this.employeeForm.reset();
    //     this.getAllEmployee();
    // },
    // err=> {
    //   console.log(err);
    //   alert('Something went wrong');
    // });
  }
  
}

  getAllEmployee(){
    // this.api.getEmployee()
    // .subscribe(res=>{
    //   this.employeeData = res; 
    // })
  }

  deleteEmployeeData(id: number){
    // this.api.deleteEmployee(id)
    // .subscribe(res=>{

    
    //   console.log(res);
    //   this.deleteSnackbar();
    //   this.getAllEmployee();
    // })
  }

  dataEdit(row: any){ 
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.employeeForm.controls['firstName'].setValue(row.firstName);     
    this.employeeForm.controls['lastName'].setValue(this.customUppercasePipe.transform(row.lastName));    
    this.employeeForm.controls['email'].setValue(row.email);   
    this.employeeForm.controls['mobile'].setValue(row.mobile);   
    this.employeeForm.controls['salary'].setValue(row.salary);   
  }

  updateEmployeeDetails(){
    if (this.employeeForm) {
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
 
    this.employeeModelObj.firstName = this.employeeForm.value.firstName;     
    this.employeeModelObj.lastName = this.employeeForm.value.lastName;    
    this.employeeModelObj.email = this.employeeForm.value.email;   
    this.employeeModelObj.mobile = this.employeeForm.value.mobile;   
    this.employeeModelObj.salary = this.employeeForm.value.salary;
    if (this.employeeForm.valid) {
    // this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    // .subscribe(res=>{   
    // this.editSnackbar();

    // let ref = document.getElementById('cancel')  
    // ref?.click(); 
    // this.employeeForm.reset();

    // this.getAllEmployee();
     
    // });
    }
  }

    clickAdd(){
      this.employeeForm.reset();
      this.showAdd = true;
      this.showUpdate = false;
    }

    AddSnackbar() {
      this._snackBar.open('Employee Added Successfully!!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    deleteSnackbar() {
      this._snackBar.open('Employee deleted!!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    editSnackbar() {
      this._snackBar.open('Updated Successfully!!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    get firstName(){
      return this.employeeForm.get('firstName');
    }

    get lastName(){
      return this.employeeForm.get('lastName');
    }

    get email(){
      return this.employeeForm.get('email');
    }

    get mobile(){
      return this.employeeForm.get('mobile');
    }

    get salary(){
      return this.employeeForm.get('salary');
    }
}
