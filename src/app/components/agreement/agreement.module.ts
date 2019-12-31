import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { ConfirmComponent } from './confirm/confirm.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'create', component: CreateComponent },
  { path: 'upload/:id', component: UploadComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'edit/:id', component: CreateComponent }
];
@NgModule( {
  declarations: [IndexComponent, CreateComponent, UploadComponent, ConfirmComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
} )
export class AgreementModule { }
