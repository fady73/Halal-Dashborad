import { SharedModule } from './../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { Routes, RouterModule } from '@angular/router';
import { InformationsComponent } from './informations/informations.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BasicComponent } from './basic/basic.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { AuditPlanComponent } from './audit-plan/audit-plan.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { CertifcateComponent } from './certifcate/certifcate.component';
import { PaymentsComponent } from './payments/payments.component';
import { ComitteeComponent } from './comittee/comittee.component';
import { HalallogoComponent } from './halalLogo/halallogo/halallogo.component';

const routes:Routes=[
  {path:'index',component:IndexComponent},
  {path:'edit/:id',component:CreateComponent},
  {path:'view/:id',component:InformationsComponent},
  {path:'logo-request/:id',component:HalallogoComponent}

];
@NgModule({
  declarations: [IndexComponent,CreateComponent, InformationsComponent, BasicComponent, UploadFilesComponent, AuditPlanComponent, AgreementsComponent, CertifcateComponent, PaymentsComponent, ComitteeComponent, HalallogoComponent],
  imports: [NgbModule,
    CommonModule,RouterModule.forChild(routes),SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class RequestModule { }
