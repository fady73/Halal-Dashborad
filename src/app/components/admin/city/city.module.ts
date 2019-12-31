
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { Routes, RouterModule, Route } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ActionEnum } from '../role/action-enum.enum';
import { RoleGuard } from '../../shared/services/role-guard.guard';
import { PageEnum } from '../role/page-enum.enum';

const routes:Route[]=[
  {path:'create',component:CreateComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.POST}},
  {path:'edit/:id',component:CreateComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.PUT}},
  {path:'index',component:IndexComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}},
  {path:'',component:IndexComponent,canActivate:[RoleGuard],data:{page:PageEnum.City,action:ActionEnum.INDEX}}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),SharedModule,
    NgxPaginationModule,
    UiSwitchModule,
    NgxSpinnerModule
  ],
  declarations: [CreateComponent, IndexComponent]
})
export class CityModule { }
