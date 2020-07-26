import { TaskManagementServiceService } from './../task-management-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private taskService : TaskManagementServiceService ,private _snackBar: MatSnackBar,private router: Router ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public login(){
    console.log("login form submited",this.loginForm.value)
    let data = this.loginForm.value;
   // data.password = btoa(this.loginForm.value)
    this.taskService.login(data).subscribe(
      data => {
        console.log("login api response",data)
        let statusCode = data['statusCode']
        if(statusCode == '200'){
          this.router.navigate(['/tasks'])
        }
      }
      ,error => {
        console.log("error",error)
        this._snackBar.open(error.statusText,'dismiss',{
          duration:2000,
          panelClass:['dark-bg']
      });
      },()=>{
        console.log(btoa("onComlete"))
      }
    )
  }

  register(){
    this.router.navigate(['/register'])
  }

}
