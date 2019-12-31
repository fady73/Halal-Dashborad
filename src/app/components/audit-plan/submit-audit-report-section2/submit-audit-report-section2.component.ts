import { CrudService } from 'src/app/shared/services/crud.service';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuditReportSection2CreateViewModel } from '../audit-report-section2-create-view.model';
import { AuditReportService } from '../audit-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

@Component( {
  selector: 'app-submit-audit-report-section2',
  templateUrl: './submit-audit-report-section2.component.html',
  styleUrls: ['./submit-audit-report-section2.component.css']
} )
export class SubmitAuditReportSection2Component implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
  model: AuditReportSection2CreateViewModel = new AuditReportSection2CreateViewModel();

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

      console.log( "model.ID", this.model.ID );
      forkJoin( [
        this._auditReportService.GetSection2ByRequestID( this.model.RequestID )
      ] ).subscribe( res => {
        this.model = res[0].Data;
        if ( params.has( 'id' ) ) {
          this.model.ID = +params.get( "id" );
        }
        this.createForm()
        this.page.isPageLoaded = true;
      }
      );
    } );
  }

  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      ID: [this.model.ID],
      MeetAllRequirements: [this.model.MeetAllRequirements, Validators.required],
      AchieveObejectives: [this.model.AchieveObejectives, Validators.required],
      ComplyWithRequirements: [this.model.ComplyWithRequirements, Validators.required],
      ConfirmPlannedAgreement: [this.model.ConfirmPlannedAgreement, Validators.required],
      AuditScope: [this.model.AuditScope, Validators.required]
    } )
  }

  save() {
    this.page.isSaving = true;
    // let ID = this.model.ID;
    Object.assign( this.model, this.page.form.value );
    // this.model.ID = ID;
    // console.log( JSON.stringify( ID ) )
    console.log( JSON.stringify( this.model ) )
    this._auditReportService.POSTSection2( this.model ).subscribe( response => {
      // this.isSaving = true;
      // console.log( "Response" + response.Data );
      if ( response.Success ) {
        // let requestID = response.Data as number;
        this._crudService.alert.success( response.Message );
        // this.isUploaded = false;
        this._router.navigateByUrl( `/audit-plan/submit-audit-report-section3/${this.model.RequestID}/${this.model.ID}` );
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
