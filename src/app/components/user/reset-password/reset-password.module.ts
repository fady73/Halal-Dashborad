
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../../shared/modules/shared.module';

const routes: Routes = [
 
  // {
  //   path:'',
  //   component:CreateComponent
  // },
  {
    path:'',
    component:CreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),SharedModule,
    NgxPaginationModule,
    UiSwitchModule,
    NgxSpinnerModule
  ],
  declarations: [CreateComponent]
})
export class ResetPasswordModule { }
