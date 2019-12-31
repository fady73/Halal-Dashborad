import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'upload/:id', component: UploadComponent },
  { path: 'view/:id', component: ViewComponent }
];
@NgModule( {
  declarations: [IndexComponent, UploadComponent, ViewComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
} )
export class CertificateModule { }
