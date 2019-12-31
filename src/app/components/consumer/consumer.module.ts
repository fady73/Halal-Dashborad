import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule } from '@angular/router';
const routes:Routes=[
  {path:'index',component:IndexComponent},
];
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class ConsumerModule { }
