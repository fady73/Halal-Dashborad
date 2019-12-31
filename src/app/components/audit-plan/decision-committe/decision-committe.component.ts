import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditPlanViewModel } from '../audit-plan.model';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { forkJoin } from 'rxjs';
import { EmployeeService } from '../../admin/employee/employee.service';
import { CityService } from '../../admin/city/city.service';
import { AuditPlanService } from '../audit-plan.service';
import { RequestService } from '../../request/request.service';
import { AlertService } from '../../alert/alert.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudService } from 'src/app/shared/services/crud.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { AuditPlanSearchViewModel } from '../audit-plan-search.model';
import { Page } from 'src/app/shared/view-models/page.model';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
import { BsModalRef } from 'ngx-bootstrap';
import { PaymentViewModel } from '../../payment/payment.model';
import { PaymentSearchViewModel } from '../../payment/payment-search.model';
import { PaymentService } from '../../payment/payment.service';
import { CommitteeDecisionService } from '../committee-decision.service';
import { RequestCommitteeDecisionCreate, ApproveStatus } from '../request-committee-decision-create';
import { DecisionCommitte } from '../decision-committe';

@Component( {
  selector: 'app-decision-committe',
  templateUrl: './decision-committe.component.html',
  styleUrls: ['./decision-committe.component.css']
} )
export class DecisionCommitteComponent implements OnInit {

  page: Page = new Page();
  searchViewModel: PaymentSearchViewModel = new PaymentSearchViewModel();
  items: DecisionCommitte[] = [];

  countries: SelectItem[] = [];
  requestTypes: SelectItem[] = [];
  requestStatus: SelectItem[] = [];
  companies: SelectItem[] = [];
  employees: SelectItem[] = [];
  hide: boolean = false;
  accept: boolean = false;
  reject: boolean = false;
  inputValue: string;
  selectedItems: DecisionCommitte = new DecisionCommitte();
  modalRef: BsModalRef;
  PostData: RequestCommitteeDecisionCreate = new RequestCommitteeDecisionCreate();

  haveNCRFile: boolean = false;
  haveCorrectivePalnFile: boolean = false;

  private showUploadFile: boolean = false;
  @ViewChild( 'employeeTemplate', { static: false } ) employeeTemplate: any;
  @ViewChild( 'confirmativeTemplate', { static: false } ) confirmativeTemplate: any;
  constructor(
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private requestService: RequestService,
    private _auditPlanService: AuditPlanService,
    private paymentService: PaymentService,
    private crud: CrudService,
    private _countryService: CityService,
    private _employeeService: EmployeeService,
    private _committeDesisionService: CommitteeDecisionService,
    private spinner: NgxSpinnerService ) {

  }

  ngOnInit() {
    this.initializePage();
    this.createSearchForm();
    this.search();
  }
  showtoggle() {
    this.showUploadFile = true;

  }
  hidetoggle() {
    this.showUploadFile = false;

  }
  createSearchForm() {
    this.searchViewModel.ToDate = new Date();
    this.searchViewModel.FromDate = this.crud.dateService.getFirstDayCurrentMonth();
    // .setDate( ( new Date() ).getDate() - 30 );
    this.page.seachForm = this._formBuilder.group( {
      ID: [this.searchViewModel.ID],
      CountryID: [this.searchViewModel.CountryID],
      FromDate: [moment( this.searchViewModel.FromDate ).format( 'MM-DD-YYYY' )],
      ToDate: [moment( this.searchViewModel.ToDate ).format( 'MM-DD-YYYY' )],
      CompanyID: [this.searchViewModel.CompanyID],
      StatusID: [this.searchViewModel.StatusID],
      TypeID: [this.searchViewModel.TypeID],
      Finalcomment: new FormControl( null ),
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
      this._employeeService.getList()
    ] ).subscribe( res => {
      this.requestTypes = res[0].Data;
      this.companies = res[1].Data;
      this.requestStatus = res[2].Data;
      this.countries = res[3].Data;
      this.employees = res[4].Data;

      this.createSearchForm();
      this.search();
    }, error => { }, () => {
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
    this.searchViewModel.FromDate = moment( this.searchViewModel.FromDate ).format( 'MM-DD-YYYY' );
    this.searchViewModel.ToDate = moment( this.searchViewModel.ToDate ).format( 'MM-DD-YYYY' );
    this.items = [];
    this._committeDesisionService.GetCommitteeDecision( this.searchViewModel, orderBy, isAscending, pageIndex ).subscribe( response => {
      if ( response.Success ) {
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result;
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
  openNewTab( url ) {
    window.open( url );
  }
  onKey( event ) {
    this.inputValue = event.target.value;
  }

  getNextPrevData( pageIndex ) {

    this.search( this.page.orderBy, this.page.isAscending, pageIndex );
    this.page.options.currentPage = pageIndex;
  }
  SetItem( selectedItem: DecisionCommitte ) {
    this.selectedItems = selectedItem;
  }

  ShowDone( choose: number ) {
    this.PostData.RequestID = this.selectedItems.RequestID;
    // this.items.find( e => e.ID == this.selectedItems.ID ).CommitteeDecision = this.PostData;
    this.PostData.Note = this.inputValue;
    if ( choose == 0 ) {
      this.PostData.ApproveStatus = choose;
      this.accept = true;
      this.items.find( e => e.ID == this.selectedItems.ID ).ApproveStatus = 0;
      this.reject = false;
    }
    if ( choose == 1 ) {
      this.PostData.ApproveStatus = choose;
      this.accept = false;
      this.items.find( e => e.ID == this.selectedItems.ID ).ApproveStatus = 1;
      this.reject = true;
    }

    this.items.find( e => e.ID == this.selectedItems.ID ).StaffRequiredAction = 0;
    this._committeDesisionService.PostCommitteeDecision( this.PostData ).subscribe(
      data => {
        this.PostData = new RequestCommitteeDecisionCreate();
        this.hide = true;
      } );
  }


}
