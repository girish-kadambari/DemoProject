import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "./register-payload";
import {map, Observable} from "rxjs";
import {LoginPayload} from "./login-payload";
import {JwtAuthResponse} from "./jwt-auth-response";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  url = "http://localhost:8080/api/auth/";

  constructor(private  httpClient : HttpClient,private localSotrageService : LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<any>{
    return this.httpClient.post(this.url + "signup", registerPayload);
  }

  login(loginPayload: LoginPayload) {
   return  this.httpClient.post<JwtAuthResponse>(this.url+"login",loginPayload).pipe(
      map(data => {
        this.localSotrageService.store("authenticationToken", data.authenticationToken);
        this.localSotrageService.store("username", data.username);
        return true;
      }
      ));
  }

  isAuthenticated():Boolean{

    // @ts-ignore
    return this.localSotrageService.retrieve("username") != null;
  }

  logout(){
    console.log(  this.localSotrageService.retrieve("authenticationtoken"))
    this.localSotrageService.clear("authenticationtoken");
    this.localSotrageService.clear("username");

  }

}
