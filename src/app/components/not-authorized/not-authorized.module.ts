import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthorizedComponent } from './not-authorized.component';
import { Route, RouterModule } from '@angular/router';

const routes:Route[]=[
  {path:'',component:NotAuthorizedComponent}
];
@NgModule({
  declarations: [NotAuthorizedComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class NotAuthorizedModule { }
