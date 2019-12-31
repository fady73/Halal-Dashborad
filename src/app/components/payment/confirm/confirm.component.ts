import { CompanyService } from './../../../shared/services/company.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CityService } from './../../admin/city/city.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { PaymentViewModel } from '../payment.model';
import { PaymentSearchViewModel } from '../payment-search.model';
import { UserService } from '../../user/user.service';
import { PaymentService } from '../payment.service';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { BsModalRef } from 'ngx-bootstrap';
import { RequestService } from '../../request/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentCancelViewModel } from '../payment-cancel.model';

@Component( {
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  // styleUrls: ['./index.component.css']
} )
export class ConfirmComponent implements OnInit {
  page: Page = new Page();
  searchViewModel: PaymentSearchViewModel = new PaymentSearchViewModel();
  items: PaymentViewModel[];
  selectedItem: PaymentViewModel = new PaymentViewModel();
  paymentCancelViewModel: PaymentCancelViewModel = new PaymentCancelViewModel();
  requestID: number;
  modalRef: BsModalRef;
  @ViewChild( 'cancelTemplate', { static: false } ) cancelTemplate: any;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;


  constructor(
    private alertService: AlertService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private crud: CrudService,
    private _router: Router,
    private spinner: NgxSpinnerService ) {
  }

  ngOnInit() {
    this.page.columns = [
      { Name: "Name", Title: "shared.name", Selectable: true, Sortable: true },
      { Name: "Mobile", Title: "shared.mobile", Selectable: true, Sortable: true },
      { Name: "Email", Title: "shared.email", Selectable: true, Sortable: true },
      { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
    ];
    this.initializePage();
  }
  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.requestID = +params.get( 'id' );
      }
      this.page.isLoading = true;
      this.paymentService.GetRequestPendingPayments( this.requestID ).subscribe( response => {
        if ( response.Success ) {
          this.items = response.Data;
          this.page.isLoading = false;
        }
      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );
  }

  showApproveConfirmation( selectedItem: PaymentViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, {
      class: 'modal-md'
    } );
  }

  showCancelConfirmation( selectedItem: PaymentViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.cancelTemplate, {
      class: 'modal-md'
    } );
  }

  approve() {
    let index = this.items.indexOf( this.selectedItem );
    this.items[index].Confirmed = true;
    this.items[index].StatusName = "Confirmed";
    this.paymentService.approved( this.selectedItem ).subscribe( response => {
      this.alertService.success( response.Message );
    },
      error => {
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => {
        this._router.navigateByUrl( "/request/index" );
      }
    );
  }

  cancel() {
    let index = this.items.indexOf( this.selectedItem );
    this.items.splice( 1, index );
    this.paymentCancelViewModel.RequestID = this.items[index].RequestID;
    this.paymentCancelViewModel.PaymentID = this.items[index].ID;
    this.paymentService.cancel( this.paymentCancelViewModel ).subscribe( response => {
       this.alertService.success( response.Message );
    },
      error => {
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => {
        this._router.navigateByUrl( "/request/index" );
      }
    );
  }
}
