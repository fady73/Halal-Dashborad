import { ConfirmComponent } from './confirm/confirm.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmappealComponent } from './confirmappeal/confirmappeal.component';
const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'confirmappeal/:id', component: ConfirmappealComponent },
];
@NgModule( {
  declarations: [IndexComponent, ConfirmComponent, ConfirmappealComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
} )
export class PaymentModule { }
