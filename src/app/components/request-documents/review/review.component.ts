import { RequestViewModel } from './../../request/request.model';
import { Page } from './../../../shared/view-models/page.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReviewDocumentViewModel } from '../review-document.model';
import { RequestDocumentsService } from '../request-documents.service';
import { AlertService } from '../../alert/alert.service';
import { RequestService } from '../../request/request.service';
import { CompanyDetailsViewModel } from '../../request/viewModels/company-details.model';

@Component( {
  templateUrl: './review.component.html',
  // styleUrls: ['./index.component.css']
} )
export class ReviewComponent implements OnInit {
  page: Page = new Page();
  model: ReviewDocumentViewModel = new ReviewDocumentViewModel();
  isUploading = false;
  requestID: number = 0;
  validAll: boolean = false;
  request: RequestViewModel = new RequestViewModel();
  isPageLoaded = false;
  isSaving = false;
  CompanyDetailsModalType: number;
  constructor(
    private _documentService: RequestDocumentsService,
    private _requestService: RequestService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alertService: AlertService
  ) {

  }
  companyDetailsViewModel: CompanyDetailsViewModel = new CompanyDetailsViewModel();

  ngOnInit() {
    this.initializePage();
    this.getCompanyDetails();
    
  }

  initializePage() {
    this._activatedRoute.paramMap.subscribe( params => {
      this.model.ID = +params.get( 'id' );
      forkJoin( [
        this._documentService.getList( this.model.ID ),
        this._requestService.getByID( this.model.ID )
      ] ).subscribe( res => {
        this.model = res[0].Data;
        this.request = res[1].Data;
        this.isPageLoaded = true;
      } );
    } )

  }
  getCompanyDetails() {
    this._requestService.getByID( this.model.ID ).subscribe( response => {
      this.companyDetailsViewModel = response.Data;
      this.CompanyDetailsModalType=this.companyDetailsViewModel.CompanyType
    } );
  }
  onValidChanged( status: boolean, index: number ) {
    // if(status==true){
    //   this.model.Documents[index].Notes="";
    // }
    this.model.Documents[index].Valid = status;
    // alert( status );
  }

  onValidAllChanged() {
    if ( !this.validAll ) {
      this.validAll = true;
      this.model.Documents.forEach( item => {
        item.Valid = true;
      } )
    }
    else {
      this.validAll = false;
      this.model.Documents.forEach( item => {
        item.Valid = false;
      } )
    }

  }
  onFinalNoteChanged() {
    this.model.IsFinalNoteSelected = !this.model.IsFinalNoteSelected;
  }
  save() {
    this.isSaving = true;
    this._documentService.post( this.model ).subscribe( response => {
      this.isSaving = true;
      if ( response.Success ) {
        let requestID = response.Data as number;
        this._alertService.success( response.Message );
        // this.isUploaded = false;
        this._router.navigateByUrl( `/request/index` );
      }
      else {
        this._alertService.error( response.Message );
      }
    }, () => {
      this.isSaving = false;
    } );
  }
  removeAttachment( ID: number, index: number ) {
    this.model[ID].Attachments.splice( index, 1 );
  }

  openNewTab( url ) {
    window.open( url );
  }
}
