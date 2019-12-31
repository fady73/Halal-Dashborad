import { CrudService } from 'src/app/shared/services/crud.service';
import { CityService } from './../../admin/city/city.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { ConsumerViewModel } from '../consumer.model';
import { ConsumerSearchViewModel } from '../consumer-search.model';
import { UserService } from '../../user/user.service';
import { ConsumerService } from '../consumer.service';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { BsModalRef } from 'ngx-bootstrap';
import { ConsumerStatus } from '../consumer-status.enum';
import { RoleService } from '../../admin/role/role.service';
import { PageEnum } from '../../admin/role/page-enum.enum';
import { RoleAction } from '../../admin/user/role-action.model';

@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  // styleUrls: ['./index.component.css']
} )
export class IndexComponent implements OnInit {
  page: Page = new Page();
  searchViewModel: ConsumerSearchViewModel = new ConsumerSearchViewModel();
  items: ConsumerViewModel[] = [];
  countries: SelectItem[] = [];
  consumerStatus: SelectItem[] = [];
  actions:RoleAction[]=[];
  selectedItem: ConsumerViewModel = new ConsumerViewModel();
  modalRef: BsModalRef;
  @ViewChild( 'cancelTemplate', { static: false } ) cancelTemplate: any;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;
  @ViewChild( 'declineTemplate', { static: false } ) declineTemplate: any;
  @ViewChild( 'viewTemplate', { static: false } ) viewTemplate: any;

  constructor(
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private consumerService: ConsumerService,
    private crud: CrudService,
    private _countryService: CityService,
    private _roleService: RoleService,
    private spinner: NgxSpinnerService ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.page.columns = [
      { Name: "Name", Title: "shared.name", Selectable: true, Sortable: true },
      { Name: "Mobile", Title: "shared.mobile", Selectable: true, Sortable: true },
      { Name: "Email", Title: "shared.email", Selectable: true, Sortable: true },
      { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
    ];
    this.initializePage();
    this.createSearchForm();
    this.search();
  }
  createSearchForm() {
    this.searchViewModel.ToDate = new Date();
    this.searchViewModel.FromDate=this.crud.dateService.getFirstDayCurrentMonth();
    //.setDate( ( new Date() ).getDate() - 30 );
    this.page.seachForm = this._formBuilder.group( {
      ID: [this.searchViewModel.ID],
      CountryID: [this.searchViewModel.CountryID],
      FromDate: [moment( this.searchViewModel.FromDate ).format( 'MM-DD-YYYY' )],
      ToDate: [moment( this.searchViewModel.ToDate ).format( 'MM-DD-YYYY' )],
      Phone: [this.searchViewModel.Phone],
      Status: [this.searchViewModel.Status],
      Name: [this.searchViewModel.Name],
    } );
  }
  initializePage() {
    this.spinner.show();
    forkJoin( [
      this.consumerService.getStatusList(),
      this._countryService.getList(),
      this._roleService.getPageActions(PageEnum.Consumer)
    ] ).subscribe( res => {
      this.consumerStatus = res[0].Data;
      this.countries = res[1].Data;
      this.actions =res[2].Data;
      this.createSearchForm();
      this.search();
    }, error => { }, () => {
      this.spinner.hide();
      this.page.isPageLoaded = true;

    } );
  };
  onSearchClicked() {
    this.items = [];
    Object.assign( this.searchViewModel, this.page.seachForm.value );
    this.search();
  }
  search( orderBy: string = "ID", isAscending: boolean = false, pageIndex: number = 1 ) {
    this.page.isLoading = true;
    this.searchViewModel.FromDate=moment( this.searchViewModel.FromDate).format('MM-DD-YYYY');
    this.searchViewModel.ToDate=moment( this.searchViewModel.ToDate).format('MM-DD-YYYY');

    this.consumerService.get( this.searchViewModel, orderBy, isAscending, pageIndex ).subscribe( response => {
      if ( response.Success ) {

        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as ConsumerViewModel[];

        this.page.isLoading = false;
      }

    }, null, () => {
      this.page.selectedAll = false;
      this.spinner.hide();
      this.page.isPageLoaded = true;
    } );
  }
  OnSearchClicked() {
    this.page.options.currentPage = 1;
    this.search( "ID", this.page.isAscending, 1 );
  }
  OnSortClicked( name ) {
    this.page.options.currentPage = 1;

    if ( name === this.page.orderBy ) {
      this.page.isAscending = !this.page.isAscending;
    }
    else {
      this.page.isAscending = true;
    }
    this.page.orderBy = name;
    this.search( this.page.orderBy, this.page.isAscending, 1 );
  }
  getNextPrevData( pageIndex ) {
    this.search( this.page.orderBy, this.page.isAscending, pageIndex );
    this.page.options.currentPage = pageIndex;
  }

  isColumnSelected( column: string ): number {
    return ( column != this.page.orderBy ) ? 0 : ( this.page.isAscending ? 1 : 2 );
  }
  
  approve() {
    let index = this.items.indexOf( this.selectedItem );
    this.items[index].Status =  ConsumerStatus.Approved;
    this.items[index].StatusName = "Approved";
    this.consumerService.approved( this.selectedItem ).subscribe( response => {
  
      this.alertService.success( response.Message );
    },
      error => {
        
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => { }

    );
  }
  decline() {
    let index = this.items.indexOf( this.selectedItem );
    this.items[index].Status =  ConsumerStatus.Decline;
    this.items[index].StatusName = "Decline";
    this.consumerService.approved( this.selectedItem ).subscribe( response => {
  
      this.alertService.success( response.Message );
    },
      error => {
        
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => { }

    );
  }
  cancel() {
    let index = this.items.indexOf( this.selectedItem );
    this.items[index].Status =  3;
    this.items[index].StatusName = "Rejected";
    this.consumerService.cancel( this.selectedItem ).subscribe( response => {
      let pageIndex: number = this.page.options.currentPage;
      // if ( this.items.length == 0 ) {
      //   pageIndex = pageIndex > 1 ? --pageIndex : 1;
      // }
      this.alertService.success( response.Message );
    },
      error => {
        // this.items.splice( index, 0, item );
        this.items[index].Status = 0;
        this.items[index].StatusName = "New";
        this.alertService.error( "An error occur , Please try again later    " )
      },
      () => { }

    );
  }
  remove( item: ConsumerViewModel ) {
    let index = this.items.indexOf( item );
    this.items.splice( index, 1 );
    this.consumerService.remove( item.ID ).subscribe( response => {
      let pageIndex: number = this.page.options.currentPage;
      if ( this.items.length == 0 ) {
        pageIndex = pageIndex > 1 ? --pageIndex : 1;
      }
      this.alertService.success( response.Message );
    },
      error => {
        this.items.splice( index, 0, item );
        this.alertService.error( "حدث خطأ اثناء عملية الحذف" )
      },
      () => { }

    );
  }




  showCancelConfirmation( selectedItem: ConsumerViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.cancelTemplate, { class: 'modal-lg' } );
  }
  showApproveConfirmation( selectedItem: ConsumerViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, { class: 'modal-lg' } );
  }
  showDeclineConfirmation( selectedItem: ConsumerViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.declineTemplate, { class: 'modal-lg' } );
  }
  
  showViewModal(selectedItem: ConsumerViewModel)
  {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.viewTemplate, { class: 'modal-lg' } );
  }

  selectAll() {
    for ( var i = 0; i < this.items.length; i++ ) {
      this.items[i].IsSelected = this.page.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.page.selectedAll = this.items.every( function ( item: any ) {
      return item.selected == true;
    } )
  }
}
