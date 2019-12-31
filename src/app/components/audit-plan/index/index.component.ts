import { AuditPlanService } from './../audit-plan.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CityService } from './../../admin/city/city.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { UserService } from '../../user/user.service';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { BsModalRef } from 'ngx-bootstrap';
import { EmployeeService } from '../../admin/employee/employee.service';
import { AgreementViewModel } from '../../agreement/agreement.model';
import { AuditPlanSearchViewModel } from '../audit-plan-search.model';
import { AuditPlanViewModel } from '../audit-plan.model';
import { RequestService } from '../../request/request.service';
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
  searchViewModel: AuditPlanSearchViewModel = new AuditPlanSearchViewModel();
  items: AuditPlanViewModel[] = [];
  countries: SelectItem[] = [];
  requestTypes: SelectItem[] = [];
  requestStatus: SelectItem[] = [];
  companies: SelectItem[] = [];
  employees: SelectItem[] = [];
  actions:RoleAction[]=[];
  selectedItem: AuditPlanViewModel = new AuditPlanViewModel();
  modalRef: BsModalRef;
  haveNCRFile: boolean = false;
  haveCorrectivePalnFile: boolean = false;

  private showUploadFile:boolean=false;
  @ViewChild( 'employeeTemplate', { static: false } ) employeeTemplate: any;
  @ViewChild( 'confirmativeTemplate', { static: false } ) confirmativeTemplate: any;
  constructor(
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private requestService: RequestService,
    private _auditPlanService: AuditPlanService,
    private _roleService: RoleService,
    private crud: CrudService,
    private _countryService: CityService,
    private _employeeService: EmployeeService,
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
  showtoggle(){
    this.showUploadFile=true;

  }
  hidetoggle(){
    this.showUploadFile=false;

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
      CompanyID: [this.searchViewModel.CompanyID],
      StatusID: [this.searchViewModel.StatusID],
      TypeID: [this.searchViewModel.TypeID],

      NID: [this.searchViewModel.NID]
    } );
  }
  initializePage() {
    this.spinner.show();
    forkJoin( [
      this.requestService.getRequestTypeList(),
      this.requestService.getCompaniesList(),
      this.requestService.getRequestStatusList(),
      this._countryService.getList(),
      this._employeeService.getList(),
      this._roleService.getPageActions(PageEnum.AuditPlan)
    ] ).subscribe( res => {
      this.requestTypes = res[0].Data;
      this.companies = res[1].Data;
      this.requestStatus = res[2].Data;
      this.countries = res[3].Data;
      this.employees = res[4].Data;
      this.actions=res[5].Data;
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

    this._auditPlanService.get(this.searchViewModel, orderBy, isAscending, pageIndex ).subscribe( response => {
      if ( response.Success ) {

        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as AuditPlanViewModel[];
        this.items.forEach(item => {
          if(item.NCRFilePath == null)
          item.NCRFilePath="";
          if(item.CorrectivePlanFilePath == null)
          item.CorrectivePlanFilePath="";
        });
        if ( this.items.some( x => x.NCRFilePath.length > 0 ) ) {
          this.haveNCRFile = true;
        }
        if ( this.items.some( x => x.CorrectivePlanFilePath.length > 0 ) )
          this.haveCorrectivePalnFile = true;
     
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
  
 
  remove( item: AuditPlanViewModel ) {
    let index = this.items.indexOf( item );
    this.items.splice( index, 1 );
    this.requestService.remove( item.ID ).subscribe( response => {
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


 
  showAssignConfirmation( selectedItem: AuditPlanViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.employeeTemplate, { class: 'modal-lg' } );
  }

  // showCancelConfirmation( selectedItem: AuditPlanViewModel ) {
  //   this.selectedItem = selectedItem;
  //   this.modalRef = this.crud.modalService.show( this.cancelTemplate, { class: 'modal-sm' } );
  // }

  showApproveConfirmation( selectedItem: AuditPlanViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.confirmativeTemplate, { class: 'modal-md' } );
  }
  

  checkIfAllSelected() {
    this.page.selectedAll = this.items.every( function ( item: any ) {
      return item.selected == true;
    } )
  }
}
