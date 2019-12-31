import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [
  { path: 'review/:id', component: ReviewComponent },
  { path: 'view/:id', component: ViewComponent },
];
@NgModule( {
  declarations: [ViewComponent, ReviewComponent],
  imports: [
    CommonModule, RouterModule.forChild( routes ), SharedModule, FormsModule, ReactiveFormsModule
  ]
} )
export class RequestDocumentsModule { }
