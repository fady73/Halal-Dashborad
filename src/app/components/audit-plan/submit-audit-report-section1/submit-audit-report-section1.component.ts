import { EmployeeService } from './../../admin/employee/employee.service';
import { Validators } from '@angular/forms';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { AuditPlanService } from '../audit-plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditReportSection1CreateViewModel } from '../audit-report-section1-create-view.model';
import { forkJoin } from 'rxjs';
import { AuditReportService } from '../audit-report.service';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')

@Component( {
  templateUrl: './submit-audit-report-section1.component.html',
  styleUrls: ['./submit-audit-report-section1.component.css']
} )
export class SubmitAuditReportSection1Component implements OnInit {


  page: CRUDCreatePage = new CRUDCreatePage();
  model: AuditReportSection1CreateViewModel = new AuditReportSection1CreateViewModel();
  productCategory: SelectItem[] = [];
  leadAuditors: number[] = [];
  affairsExperts: number[] = [];

  constructor(
    private _crudService: CrudService,
    private _auditReportService: AuditReportService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'requestID' ) ) {
        this.model.RequestID = +params.get( "requestID" );
      }
      forkJoin( [
        this._auditReportService.get( this.model.RequestID ),
        this._auditReportService.getProductCategory()
      ] ).subscribe( res => {
        if ( res[0].Data != null )
          this.model = res[0].Data;
        // else this.model =[];
        this.productCategory = res[1].Data;
        this.createForm();
        this.page.isPageLoaded = true;
      }
      );
    } );
  }

  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      OtherSpecifications: [this.model.OtherSpecifications],
      AuditAddress: [this.model.AuditAddress],
      ApprovalAuthority: [this.model.ApprovalAuthority, Validators.required],
      AuditType: [this.model.AuditType, Validators.required],
      LastAuditType: [this.model.LastAuditType, Validators.required],
      LastAuditDate: [moment( this.model.LastAuditDate ).format( 'MM-DD-YYYY' ), [Validators.required]],
      AuditTimeJustification: [moment( this.model.AuditTimeJustification ).format( 'MM-DD-YYYY' ), [Validators.required]],
      CertificateExpirationDate: [moment( this.model.CertificateExpirationDate ).format( 'MM-DD-YYYY' ), [Validators.required]],
      CategoryID: [this.model.CategoryID, [Validators.required]],
      NumberOfEmployees: [this.model.NumberOfEmployees, [Validators.required, Validators.min( 0 )]],
      NumberOfShifts: [this.model.NumberOfShifts, [Validators.required, , Validators.min( 0 )]],
      NumberOfProductionLines: [this.model.NumberOfProductionLines, [Validators.required, Validators.min( 0 )]],
      HCCPLinesNumber: [this.model.NumberOfProductionLines, [Validators.required, Validators.min( 0 )]],
      AuditTeamLeaderID: [this.model.AuditTeamLeaderID, [Validators.required, Validators.min( 0 )]],
      IslamicAffairsExpertID: [this.model.IslamicAffairsExpertID, [Validators.required, Validators.min( 0 )]],
      AdditionalAttendees: [this.model.AdditionalAttendees, [Validators.required]],
      Deviation: [this.model.Deviation],
      CertificateScope: [this.model.CertificateScope],
      ScopeExceptions: [this.model.ScopeExceptions],
      OrganizationDescription: [this.model.OrganizationDescription]
    } )
  }

  save() {
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value );
    // this.model.IslamicAffairsExpertID = + this.model.IslamicAffairsExpertID;
    // this.model.AuditTeamLeaderID = + this.model.AuditTeamLeaderID;
    // this.model.CategoryID = + this.model.IslamicAffairsExpertID;
    console.log( JSON.stringify( this.model ) );
    this._auditReportService.POSTSection1( this.model ).subscribe( response => {
      // this.isSaving = true;
      if ( response.Success ) {
        // let requestID = response.Data as number;
        this._crudService.alert.success( response.Message );
        // this.isUploaded = false;
        console.log( "Response" + response.Data.ID );
        this._router.navigateByUrl( `/audit-plan/submit-audit-report-section2/${this.model.RequestID}/${response.Data.ID}` );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, () => {
      this.page.isSaving = false;
    } );
  }

  disableSubmit(): boolean {
    return this.page.isSaving || !this.page.form.valid;
  }

}
