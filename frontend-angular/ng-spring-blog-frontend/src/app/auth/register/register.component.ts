import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterPayload} from "../register-payload";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  errorMsg ='';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit(){

    // @ts-ignore
    this.registerPayload.username=this.registerForm.get('username').value;

   // @ts-ignore
    this.registerPayload.email= this.registerForm.get('email').value;

   // @ts-ignore
    this.registerPayload.password= this.registerForm.get('password').value;

  // @ts-ignore
    this.registerPayload.confirmPassword=  this.registerForm.get('confirmPassword').value;

    if(this.isValid()){
      this.authService.register(this.registerForm.getRawValue()).subscribe(
        data => {

          console.log("register success");
          this.router.navigateByUrl("/register-success");
        },
        error => {
          // console.log(this.registerPayload);
          alert("Registration Unscuessfull !")
        });
    }else{

    }





  }
  isValid():Boolean{
   var valid  = false;
    // @ts-ignore
    if (this.registerPayload.username!=null && this.registerPayload.email!=null &&this.registerPayload.confirmPassword !=null &&this.registerPayload.password !=null ) {
      if (this.signupCheck(this.registerPayload.username) && this.signupCheck(this.registerPayload.password) && this.signupCheck(this.registerPayload.confirmPassword) && this.signupCheck(this.registerPayload.email)) {
        if (this.registerPayload.password === this.registerPayload.confirmPassword) {
          valid = true;
        } else {
          alert("Password and Confirm Password is not matched ");

        }

      } else {
        alert("Need to fill all the fields !!!");
      }
    }
      else{
        alert("Need to fill all the fields !!!");
      }



    return valid;
  }

  signupCheck(field:String):Boolean{
    if(field.trim().length > 0){
       return  true;
    }
  else{
    return  false;
    }
}

}
