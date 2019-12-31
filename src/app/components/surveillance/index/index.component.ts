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
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { PageEnum } from '../../admin/role/page-enum.enum';
import { RoleService } from '../../admin/role/role.service';
import { RoleAction } from '../../admin/user/role-action.model';
import { SurveillanceSearchViewModel } from '../surveillance-search.model';
import { SurveillanceViewModel } from '../surveillance.model';
import { SurveillanceService } from '../surveillance.service';


@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
} )
export class IndexComponent implements OnInit {

  page: Page = new Page();
  searchViewModel: SurveillanceSearchViewModel = new SurveillanceSearchViewModel();
  items: SurveillanceViewModel[] = [];
  countries: SelectItem[] = [];
  companies: SelectItem[] = [];
  actions: RoleAction[] = [];
  selectedItem: SurveillanceViewModel = new SurveillanceViewModel();
  modalRef: BsModalRef;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;
  @ViewChild( 'declineTemplate', { static: false } ) declineTemplate: any;

  constructor( private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private requestService: RequestService,
    private crud: CrudService,
    private _countryService: CityService,
    private _companyService: CompanyService,
    private _roleService: RoleService,
    private _surveillanceService: SurveillanceService ) { }

  ngOnInit() {
    this.page.columns = [
      { Name: "SubmissionDate", Title: "Submission date", Selectable: true, Sortable: true },
      { Name: "CompanyName", Title: "Company name", Selectable: true, Sortable: true },
      { Name: "CompanyCountry", Title: "Company country", Selectable: true, Sortable: true },
      { Name: "CompanyAddress", Title: "Company address", Selectable: true, Sortable: true }
    ];

    this.initializePage();
    this.createSearchForm();
    this.search();
  }

  createSearchForm() {
    this.page.seachForm = this._formBuilder.group( {
      ID: [this.searchViewModel.ID],
      CountryID: [this.searchViewModel.CountryID],
      CompanyID: [this.searchViewModel.CompanyID]
    } );
  }
  initializePage() {
    forkJoin( [
      this._companyService.getList(),
      this._countryService.getList(),
      this._roleService.getPageActions( PageEnum.Agreement )
    ] ).subscribe( res => {
      this.companies = res[0].Data;
      this.countries = res[1].Data;
      this.actions = res[2].Data;

      this.createSearchForm();
      this.search();
    }, error => { }, () => {
      this.page.isPageLoaded = true;
    } );
  };
  onSortClicked( column: ColumnViewModel ) {
    // alert( column )
    if ( !column.Sortable )
      return;
    let name = column.Name;
    if ( name === this.page.orderBy ) {
      this.page.isAscending = !this.page.isAscending;
    }
    else {
      this.page.isAscending = true;
    }
    this.page.orderBy = name;

    this.page.options.currentPage = 1;
    this.search();
  }

  onSearchClicked() {
    this.items = [];
    Object.assign( this.searchViewModel, this.page.seachForm.value );
    this.search();
  }
  search( orderBy: string = "ID", isAscending: boolean = false, pageIndex: number = 1 ) {
    this.page.isLoading = true;
    this._surveillanceService.get( true, this.searchViewModel, orderBy, isAscending, pageIndex ).subscribe( response => {
      if ( response.Success ) {
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as SurveillanceViewModel[];
        this.items.forEach( item => {
          if ( item.StaffSignedAggrementFilePath == null )
            item.StaffSignedAggrementFilePath = "";
          if ( item.ConsumerSignedAggrementFilePath == null )
            item.ConsumerSignedAggrementFilePath = "";
        } )
        this.page.isLoading = false;
      }

    }, null, () => {
      this.page.selectedAll = false;
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




  showApproveConfirmation( selectedItem: SurveillanceViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, { class: 'modal-md' } );
  }



  showDeclineConfirmation( selectedItem: SurveillanceViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.declineTemplate, { class: 'modal-md' } );
  }

}

