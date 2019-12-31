import { ActivatedRoute, Router } from '@angular/router';
import { ColumnViewModel } from 'src/app/shared/view-models/column-view-model';
import { CompanyService } from './../../../shared/services/company.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { CityService } from '../../admin/city/city.service';
import { RequestService } from '../../request/request.service';
import { BsModalRef } from 'ngx-bootstrap';
import { AgreementSearchViewModel } from '../agreement-search.model';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { RequestViewModel } from '../../request/request.model';
import { AgreementViewModel } from '../agreement.model';
import { AgreementService } from '../agreement.service';
import { AgreementStatus } from '../agreement-status.enum';
import { AgreementCancelViewModel } from '../agreement-cancel.model';


@Component( {
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
} )
export class ConfirmComponent implements OnInit {

  page: Page = new Page();
  item: AgreementViewModel = new AgreementViewModel();
  selectedItem: AgreementViewModel = new AgreementViewModel();
  agreementCancelViewModel: AgreementCancelViewModel = new AgreementCancelViewModel();
  modalRef: BsModalRef;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;
  @ViewChild( 'declineTemplate', { static: false } ) declineTemplate: any;

  constructor( private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private crud: CrudService,
    private activatedRoute: ActivatedRoute,
    private _agreementService: AgreementService,
    private _router: Router ) { }

  ngOnInit() {
    this.page.columns = [
      { Name: "SubmissionDate", Title: "Submission date", Selectable: true, Sortable: true },
      { Name: "CompanyName", Title: "Company name", Selectable: true, Sortable: true },
      { Name: "CompanyCountry", Title: "Company country", Selectable: true, Sortable: true },
      { Name: "CompanyAddress", Title: "Company address", Selectable: true, Sortable: true }
    ];



    this.initializePage();
    // this.search();
  }

  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.item.RequestID = +params.get( 'id' );
      }
      // alert( "here" )
      this.page.isLoading = true;
      this._agreementService.getById( this.item.RequestID ).subscribe( response => {
        if ( response.Success ) {
          this.item = response.Data;
          this.page.isLoading = false;
          if ( this.item.StaffSignedAggrementFilePath == null )
            this.item.StaffSignedAggrementFilePath = "";
          if ( this.item.ConsumerSignedAggrementFilePath == null )
            this.item.ConsumerSignedAggrementFilePath = "";
        }
      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );
  };
  showApproveConfirmation( selectedItem: AgreementViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, { class: 'modal-md' } );
  }



  showDeclineConfirmation( selectedItem: AgreementViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.declineTemplate, { class: 'modal-md' } );
  }


  approve() {
    this.item.Status = AgreementStatus.Approved;
    this.item.StatusName = "Approved";
    this.item.StaffRequiredAction = 0;
    this._agreementService.approved( this.item ).subscribe( response => {

      this.alertService.success( response.Message );
      this._router.navigateByUrl( `/request/index` );
    },
      error => {

        this.alertService.error( "An error occured , Please try again later    " );
      },
      () => { }

    );
  }
  decline() {
    this.item.Status = AgreementStatus.Decline;
    this.item.StatusName = "Decline";
    this.item.StaffRequiredAction = 0;
    this.agreementCancelViewModel.AgreementID = this.item.ID;
    this._agreementService.decline( this.agreementCancelViewModel ).subscribe( response => {

      this.alertService.success( response.Message );
      this._router.navigateByUrl( `/request/index` );
    },
      error => {

        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => { }

    );
  }
}

