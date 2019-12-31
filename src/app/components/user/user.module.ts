import { SharedModule } from './../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'',component:ChangePasswordComponent},

  {path:'change-password',component:ChangePasswordComponent}
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule
  ]
})
export class UserModule { }
