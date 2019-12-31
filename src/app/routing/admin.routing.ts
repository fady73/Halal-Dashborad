import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/shared/layout/layout.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: '../components/user/user.module#UserModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/employee',
    component: LayoutComponent,
    loadChildren: '../components/admin/employee/employee.module#EmployeeModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  

  {
    path: 'admin/country',
    component: LayoutComponent,
    loadChildren: '../components/admin/city/city.module#CityModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },

  {
    path: 'admin/user',
    component: LayoutComponent,
    loadChildren: '../components/admin/user/user.module#UserModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },

  {
    path: 'admin/user/create',
    component: LayoutComponent,
    //loadChildren: '../components/admin/user/create/create.module#CreateModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  }

 

]

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule],
  declarations: [],
} )
export class AdminRoutingModule { }