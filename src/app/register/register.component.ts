import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskManagementServiceService } from '../task-management-service.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private taskService : TaskManagementServiceService ,private _snackBar: MatSnackBar,private router: Router ) { }
  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public register(){
    console.log("login form submited",this.registerForm.value)
    let data = this.registerForm.value;
   // data.password = btoa(this.loginForm.value)
    this.taskService.register(data).subscribe(
      data => {
        console.log("login api response",data)
        let statusCode = data['statusCode']

        if(statusCode == '200'){
          this.router.navigate(['/login'])
          this._snackBar.open(data['data'],'dismiss',{
            duration:2000,
            panelClass:['dark-bg']
        });
        }else{
          this._snackBar.open(data['data'],'dismiss',{
            duration:2000,
            panelClass:['dark-bg']
        });
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

}
