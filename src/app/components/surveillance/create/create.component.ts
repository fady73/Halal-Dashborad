import { AgreementCreateViewModel } from './../../agreement/agreement-create.model';
import { AgreementService } from './../../agreement/agreement.service';
import { CrudService } from './../../../shared/services/crud.service';
import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/common/patterns';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { RequestService } from '../../request/request.service';
import { RequestViewModel } from '../../request/request.model';
import { SurveillanceCreateViewModel } from '../surveillance-create.model';
import { SurveillanceService } from '../surveillance.service';

@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
  model: SurveillanceCreateViewModel = new SurveillanceCreateViewModel();
  request: RequestViewModel = new RequestViewModel();
  SubmissionDay: Date = new Date();
  constructor(
    private _crudService: CrudService,
    private _surveillanceService: SurveillanceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {

    this.SubmissionDay = new Date();
    this.SubmissionDay = moment( this.SubmissionDay ).format( 'MM-DD-YYYY' );
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.RequestID = +params.get( "id" );
        this.page.isEdit = this.model.RequestID > 0;
      }

      forkJoin( [
        this._surveillanceService.getById( this.model.RequestID ),
      ] ).subscribe( res => {
        this.model = res[0].Data;
        this.model.RequestID = this.model.ID;
        // this.request = res[1].Data;
        console.log( this.model );
        this.createForm();
        this.page.isPageLoaded = true;
      }
      );
    } );
  }


  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      NumberOfAuditDays: [this.model.NumberOfAuditDays, [Validators.required, Validators.pattern( Patterns.OnlyNumbers ), Validators.min( 1 ), Validators.maxLength( 100 )]],
      NumberOfAuditors: [this.model.NumberOfAuditors, [Validators.required, Validators.pattern( Patterns.OnlyNumbers ), Validators.min( 1 ), Validators.maxLength( 100 )]],
      TotalOffer: [this.model.TotalOffer],
      TechnicalTeamVisitFee: [this.model.TechnicalTeamVisitFee, [Validators.maxLength( 9 )]],
      TotalRemuneration: [this.model.TotalRemuneration],
    } )
  }

  CalcRemuneration() {
    if ( this.page.form.valid ) {
      this.page.form.patchValue( {
        TotalRemuneration: ( this.page.form.controls['NumberOfAuditDays'].value * this.page.form.controls['NumberOfAuditors'].value + this.page.form.controls['TechnicalTeamVisitFee'].value )
      } );

    }
  }
  CalcTotalOffer() {
    if ( this.page.form.valid ) {
      this.page.form.patchValue( {
        TotalOffer: ( this.page.form.controls['TotalRemuneration'].value * this.model.FixedFees )
      } );
    }
  }

  disabledSubmit(): boolean {
    return this.page.isSaving || this.page.isUploading || !this.page.form.valid;
  }
  save(): void {
    if ( this.disabledSubmit() )
      return;
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value ) as SurveillanceCreateViewModel;
    this._surveillanceService.postOrUpdate( this.model ).subscribe( response => {
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if ( response.Success ) {
        // window.open( response.Data['FilePath'] );
        this._crudService.router.navigateByUrl( `/request/index` );
        if ( this.model.ID == 0 ) {
          this.model = new SurveillanceCreateViewModel();
          this.createForm();
        }
        this._crudService.alert.success( response.Message );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, error => {
      this._crudService.alert.error( error ); this.page.isSaving = false;
    }, () => { this.page.isSaving = false; } );
  }


}

