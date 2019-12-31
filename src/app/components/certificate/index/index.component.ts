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
import { CertificateViewModel } from '../../request/viewModels/certificate.model';
import { CertificateSearchViewModel } from '../certificate-search.model';
import { CertificateService } from '../certificate.service';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { RoleAction } from '../../admin/user/role-action.model';
import { RoleService } from '../../admin/role/role.service';
import { PageEnum } from '../../admin/role/page-enum.enum';


@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
} )
export class IndexComponent implements OnInit {

  page: Page = new Page();
  searchViewModel: CertificateSearchViewModel = new CertificateSearchViewModel();
  items: CertificateViewModel[] = [];
  countries: SelectItem[] = [];
  companies: SelectItem[] = [];
  requestTypes: SelectItem[] = [];
  requestStatus: SelectItem[] = [];
  actions:RoleAction[]=[];
  selectedItem: CertificateViewModel = new CertificateViewModel();
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
    private _cerificateService: CertificateService ) { }

  ngOnInit() {
    this.page.columns = [
      { Name: "SubmissionDate", Title: "Submission date", Selectable: true, Sortable: true },
      { Name: "CompanyName", Title: "Company name", Selectable: true, Sortable: true },
      { Name: "CompanyCountry", Title: "Company country", Selectable: true, Sortable: true },
      { Name: "RequestType", Title: "Request type", Selectable: true, Sortable: true }
    ];

    this.initializePage();
    this.createSearchForm();
    this.search();
  }


  createSearchForm() {
    this.searchViewModel.ToDate = new Date();
    this.searchViewModel.FromDate = this.crud.dateService.getFirstDayCurrentMonth();
    this.page.seachForm = this._formBuilder.group( {
      ID: [this.searchViewModel.ID],
      CountryID: [this.searchViewModel.CountryID],
      FromDate: [moment( this.searchViewModel.FromDate ).format( 'MM-DD-YYYY' )],
      ToDate: [moment( this.searchViewModel.ToDate ).format( 'MM-DD-YYYY' )],
      CompanyID: [this.searchViewModel.CompanyID],
      StatusID: [this.searchViewModel.StatusID],
      TypeID: [this.searchViewModel.TypeID],
      NID: [this.searchViewModel.NID]
    } );
  }
  initializePage() {
    forkJoin( [
      this._countryService.getList(),
      this.requestService.getRequestTypeList(),
      this.requestService.getCompaniesList(),
      this.requestService.getRequestStatusList(),
      this._roleService.getPageActions(PageEnum.Certificate)

    ] ).subscribe( res => {
      this.countries = res[0].Data;
      this.requestTypes = res[1].Data;
      this.companies = res[2].Data;
      this.requestStatus = res[3].Data;
      this.actions = res[4].Data;
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
    this._cerificateService.get( true, this.searchViewModel, orderBy, isAscending, pageIndex ).subscribe( response => {
      if ( response.Success ) {
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as CertificateViewModel[];
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

}

