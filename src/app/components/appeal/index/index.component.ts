import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'src/app/shared/view-models/page.model';
import { PaymentSearchViewModel } from '../../payment/payment-search.model';
import { AppealModel } from '../appeal-model';
import { AlertService } from '../../alert/alert.service';
import { BsModalRef } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/services/crud.service';
import { AppealService } from '../appeal.service';
import { AppealCancleModel } from '../appeal-cancle-model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  page: Page = new Page();
  searchViewModel: PaymentSearchViewModel = new PaymentSearchViewModel();
  items: AppealModel[]=[];
  selectedItem: AppealModel = new AppealModel();
  appealCancelViewModel: AppealCancleModel;
  requestID: number;
  modalRef: BsModalRef;
  appealid:number;
  @ViewChild( 'cancelTemplate', { static: false } ) cancelTemplate: any;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;


  constructor(
    private alertService: AlertService,
    private AppealService: AppealService,
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
      this.AppealService.get( this.requestID ).subscribe( response => {
        console.log(response)
        if ( response.Success ) {
          this.items = response.Data.Result;
          this.appealid=response.Data.Result[0].ID;
          this.page.isLoading = false;
        }
      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );
  }

  showApproveConfirmation( selectedItem: AppealModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, {
      class: 'modal-md'
    } );
  }

  showCancelConfirmation( selectedItem: AppealModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.cancelTemplate, {
      class: 'modal-md'
    } );
  }

  approve() {
    let index = this.items.indexOf( this.selectedItem );
    this.items[index].appealID = this.appealid;
     
    this.AppealService.approvedappeal( this.selectedItem ).subscribe( response => {
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
    this.appealCancelViewModel.RequestID = this.requestID;
    this.appealCancelViewModel.appealID = this.appealid;
    this.AppealService.cancelappeal( this.appealCancelViewModel ).subscribe( response => {
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
