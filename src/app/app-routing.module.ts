import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminRoutingModule } from './routing/admin.routing';

const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate:[AuthGuard],canActivateChild:[AuthGuard],
    component: LayoutComponent,
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: './components/home/home.module#HomeModule',

  },

  {
    path: 'not-authorized',
    component: LayoutComponent,
    loadChildren: './components/not-authorized/not-authorized.module#NotAuthorizedModule',

  },

  {
    path: 'agreement',
    component: LayoutComponent,
    loadChildren: './components/agreement/agreement.module#AgreementModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'surveillance',
    component: LayoutComponent,
    loadChildren: './components/surveillance/surveillance.module#SurveillanceModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'certificate',
    component: LayoutComponent,
    loadChildren: './components/certificate/certificate.module#CertificateModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'request',
    component: LayoutComponent,
    loadChildren: './components/request/request.module#RequestModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },

  {
    path: 'payment',
    component: LayoutComponent,
    loadChildren: './components/payment/payment.module#PaymentModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'request-documents',
    component: LayoutComponent,
    loadChildren: './components/request-documents/request-documents.module#RequestDocumentsModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'consumer',
    component: LayoutComponent,
    loadChildren: './components/consumer/consumer.module#ConsumerModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'audit-plan',
    component: LayoutComponent,
    loadChildren: './components/audit-plan/audit-plan.module#AuditPlanModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'surveillance-audit-plan',
    component: LayoutComponent,
    loadChildren: './components/surveillance-audit-plan/surveillance-audit-plan.module#SurveillanceAuditPlanModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/user',
    component: LayoutComponent,
    loadChildren: './components/admin/user/user.module#UserModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/role',
    component: LayoutComponent,
    loadChildren: './components/admin/role/role.module#RoleModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/configration',
    component: LayoutComponent,
    loadChildren: './components/admin/configration/configration.module#ConfigrationModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },


  {
    path: 'admin/notification',
    component: LayoutComponent,
    loadChildren: './components/admin/show-notification/show-notification.module#ShowNotificationModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'hr/job',
    component: LayoutComponent,
    loadChildren: './components/hr/job/job.module#JobModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'hr/employee',
    component: LayoutComponent,
    loadChildren: './components/hr/employee/employee.module#EmployeeModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    //component: LayoutComponent,
    loadChildren: './components/user/login/login.module#LoginModule',
    //canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  }
  ,
  {
    path: 'forget-password',
    component: LayoutComponent,
    loadChildren: './components/user/forget-password/forget-password.module#ForgetPasswordModule',
    // canActivate: [AuthGuard],canActivateChild:[AuthGuard]
  },
  {
    path: 'reset-password',
    component: LayoutComponent,
    loadChildren: './components/user/reset-password/reset-password.module#ResetPasswordModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'complaint',
    component: LayoutComponent,
    loadChildren: './components/complaint/complaint/complaint.module#ComplaintModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  {
    path: 'appeal',
    component: LayoutComponent,
    loadChildren: './components/appeal/appeal/appeal.module#AppealModule',
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  // ,
  // {
  //   path: '**',
  //   loadChildren: './components/shared/not-found/not-found.module#NotFoundModule'
  // }
];

@NgModule( {
  imports: [RouterModule.forRoot( routes ), AdminRoutingModule],
  exports: [RouterModule, AdminRoutingModule]
} )
export class AppRoutingModule { }
