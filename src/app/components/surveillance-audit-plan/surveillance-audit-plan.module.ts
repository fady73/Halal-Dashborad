import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { SurveillanceDecisionCommitteConfirmComponent } from './surveillance-decision-committe-confirm/surveillance-decision-committe-confirm.component';


const routes: Routes = [
  {
    path: 'create/:id',
    component: CreateComponent
  },
  {
    path: 'decision-committee-confirm/:id',
    component: SurveillanceDecisionCommitteConfirmComponent
  }

];

@NgModule( {
  declarations: [CreateComponent, SurveillanceDecisionCommitteConfirmComponent],
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
export class SurveillanceAuditPlanModule { }
