import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from '../index/index.component';

const routes: Routes = [
  { path: 'index/:id', component: IndexComponent }
  // { path: 'confirm/:id', component: ConfirmComponent },
  // { path: 'confirmappeal/:id', component: ConfirmappealComponent },
];
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
})
export class AppealModule { }
