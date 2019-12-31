import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { SubmitNcrComponent } from './submit-ncr/submit-ncr.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewAuditPlanComponent } from './view-audit-plan/view-audit-plan.component';
import { SubmitAuditReportSection1Component } from './submit-audit-report-section1/submit-audit-report-section1.component';
import { SubmitAuditReportSection2Component } from './submit-audit-report-section2/submit-audit-report-section2.component';
import { SubmitAuditReportSection3Component } from './submit-audit-report-section3/submit-audit-report-section3.component';
import { DecisionCommitteComponent } from './decision-committe/decision-committe.component';

import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewComponent } from './view/view.component';
import { DecisionCommitteConfirmComponent } from './decision-committe-confirm/decision-committe-confirm.component';
import { CorrectiveActionComponent } from './corrective-action/corrective-action.component';
import { ViewNcrComponent } from './view-ncr/view-ncr.component';
import { AcceptingIndexComponent } from './accepting-index/accepting-index.component';



const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'submit-ncr/:id',
    component: SubmitNcrComponent
  },
  {
    path: 'edit-ncr/:id',
    component: AcceptingIndexComponent
  },
  {
    path: 'create/:id',
    component: CreateComponent
  }
  ,
  {
    path: 'edit/:id/:version',
    component: CreateComponent
  }
  ,

  {
    path: 'view-audit-plan/:id',
    component: ViewAuditPlanComponent
  }
  ,
  {
    path: 'view/:id',
    component: ViewComponent
  }
  ,
  {
    path: 'view-corrective-action/:id',
    component: CorrectiveActionComponent
  },
  {
    path: 'view-ncr/:id',
    component: ViewNcrComponent
    
  },
  {
    path: 'submit-audit-report-section1/:requestID',
    component: SubmitAuditReportSection1Component
  }
  ,
  {
    path: 'submit-audit-report-section2/:requestID/:id',
    component: SubmitAuditReportSection2Component
  }
  ,
  {
    path: 'submit-audit-report-section3/:requestID/:id',
    component: SubmitAuditReportSection3Component
  }
  ,
  {
    path: 'decision-committee',
    component: DecisionCommitteComponent
  }
  ,
  {
    path: 'decision-committee-confirm/:id',
    component: DecisionCommitteConfirmComponent
  }
];

@NgModule( {
  declarations: [IndexComponent, CreateComponent, SubmitNcrComponent, ViewComponent,
    ViewAuditPlanComponent, SubmitAuditReportSection1Component ,ViewNcrComponent
    , SubmitAuditReportSection2Component, SubmitAuditReportSection3Component,AcceptingIndexComponent,
    DecisionCommitteComponent, DecisionCommitteConfirmComponent, CorrectiveActionComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild( routes )
    , SharedModule,
    NgxDropzoneModule,
    NgxPaginationModule,
    NgSelectModule,
    HttpClientModule,
    ModalModule.forRoot()

  ], providers: [BsModalRef]


} )
export class AuditPlanModule { }
