import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {LoginPayload} from "../login-payload";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  // @ts-ignore
  loginPayload: LoginPayload;



  constructor(private authService : AuthService,private router:Router) {
    this.loginForm= new FormGroup(
      {
        username: new FormControl(),
        password : new FormControl()
      }
    );
    this.loginPayload = {
      username : '',
      password : ''
    }

  }

  ngOnInit(): void {
  }

  onSubmit(){
    // @ts-ignore

    this.loginPayload.username=this.loginForm.get('username').value;
    // @ts-ignore
    this.loginPayload.password=this.loginForm.get('password').value;
    this.authService.login(this.loginPayload).subscribe(
      data => {
        if(data){
          this.router.navigateByUrl("/home");
          console.log("Login  Sucessfull");
        }else{
          console.log("Failed to login");
        }
      }

    );
  }

}
