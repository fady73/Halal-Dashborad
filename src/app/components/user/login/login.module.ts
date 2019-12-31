import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  // {
  //   path:'forgetPassword',
  //   component:ForgetPasswordComponent
  // },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes),ReactiveFormsModule,
    HttpClientModule,SharedModule
  ],
  exports: [RouterModule],
  declarations: [LoginComponent]
})
export class LoginModule { }
