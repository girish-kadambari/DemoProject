import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSucessComponent } from './auth/register-sucess/register-sucess.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {HttpClientInterceptor} from "./http-client-intercepter";
import { PostComponent } from './post/post.component';
import {AuthGuard} from "./auth.guard";
import { ErrorPageComponent } from './error-page/error-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSucessComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    EditorModule,
    RouterModule.forRoot([
      {path:'error',component:ErrorPageComponent},
      {path:'post/:id',component:PostComponent},
      {path:'',component:HomeComponent},
      {path:'register',component:RegisterComponent},
      {path :"login",component:LoginComponent},
      {path:"register-success",component:RegisterSucessComponent},
      {path:"home",component:HomeComponent},
      {path:"add-post",component:AddPostComponent,canActivate:[AuthGuard]}
    ])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
