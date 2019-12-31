import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent }
];
@NgModule( {
  declarations: [IndexComponent, CreateComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
} )
export class SurveillanceModule { }
