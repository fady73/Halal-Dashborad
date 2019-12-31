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
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
  templateUrl: './decision-committe-confirm.component.html',
} )
export class DecisionCommitteConfirmComponent implements OnInit {
  page: Page = new Page();
  item: DecisionCommitte = new DecisionCommitte();
  hide: boolean = false;
  accept: boolean = false;
  reject: boolean = false;
  inputValue: string;
  selectedItems: DecisionCommitte = new DecisionCommitte();
  modalRef: BsModalRef;
  PostData: RequestCommitteeDecisionCreate = new RequestCommitteeDecisionCreate();
  haveNCRFile: boolean = false;
  haveCorrectivePalnFile: boolean = false;
  RequestID: number;
  private showUploadFile: boolean = false;
  @ViewChild( 'employeeTemplate', { static: false } ) employeeTemplate: any;
  @ViewChild( 'confirmativeTemplate', { static: false } ) confirmativeTemplate: any;
  constructor(
    private _committeDesisionService: CommitteeDecisionService,
    private activatedRoute: ActivatedRoute, private _router: Router,
  ) {

  }

  ngOnInit() {
    this.initializePage();
  }
  showtoggle() {
    this.showUploadFile = true;

  }
  hidetoggle() {
    this.showUploadFile = false;
  }

  initializePage() {
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.RequestID = +params.get( 'id' );
      }
      this.page.isLoading = true;
      this._committeDesisionService.GetCommitteeDecisionByRequestID( this.RequestID ).subscribe( response => {
        if ( response.Success ) {
          this.item = response.Data.Result[0];
          this.page.isLoading = false;
        }

      }, null, () => {
        this.page.isPageLoaded = true;
      } );
    } );

  }


  openNewTab( url ) {
    window.open( url );
  }
  onKey( event ) {
    this.inputValue = event.target.value;
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
      this.item.ApproveStatus = 0;
      this.reject = false;
    }
    if ( choose == 1 ) {
      this.PostData.ApproveStatus = choose;
      this.accept = false;
      this.item.ApproveStatus = 1;
      this.reject = true;
    }

    this.item.StaffRequiredAction = 0;
    this._committeDesisionService.PostCommitteeDecision( this.PostData ).subscribe(
      data => {

        this.PostData = new RequestCommitteeDecisionCreate();
        this.hide = true;
        this._router.navigateByUrl( `/request/index` );
      } );
  }


}
