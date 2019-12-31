import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'index',component:IndexComponent},
];

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class ComplaintModule { }
