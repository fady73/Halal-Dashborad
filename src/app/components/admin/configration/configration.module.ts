import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Route } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ActionEnum } from '../role/action-enum.enum';
import { RoleGuard } from '../../shared/services/role-guard.guard';
import { PageEnum } from '../role/page-enum.enum';

import { ConfigrationComponent } from './configration/configration.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes:Route[]=[
  {path:'edit',component:ConfigrationComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.PUT}},
  {path:'index',component:ConfigrationComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}},
  {path:'',component:ConfigrationComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}}
];

@NgModule({
  declarations: [ConfigrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),SharedModule,
    NgxPaginationModule,
    UiSwitchModule,
    NgxSpinnerModule

  ]
})
export class ConfigrationModule { }
