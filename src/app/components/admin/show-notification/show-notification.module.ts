import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowNotificationComponent } from './show-notification/show-notification.component';
import { RoleGuard } from '../../shared/services/role-guard.guard';
import { PageEnum } from '../role/page-enum.enum';
import { ActionEnum } from '../role/action-enum.enum';
import { Route, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const routes:Route[]=[
  {path:'index',component:ShowNotificationComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}},
  {path:'',component:ShowNotificationComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}}
];
@NgModule({
  declarations: [ShowNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    UiSwitchModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class ShowNotificationModule { }
