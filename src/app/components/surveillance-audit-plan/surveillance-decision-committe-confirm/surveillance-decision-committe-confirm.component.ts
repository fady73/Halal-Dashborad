import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'src/app/shared/view-models/page.model';
import { BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionCommitte } from '../../audit-plan/decision-committe';
import { SurveillanceDecisionCommitteCreateViewModel } from '../surveillance-decision-committe-create.model';
import { SurveillanceDecisionCommitte } from '../surveillance-decision-committe';
import { SurveillanceCommitteeDecisionService } from '../surveillance-committee-decision.service';
import { SurveillanceStatus } from '../surveillance-status.enum';

@Component( {
  templateUrl: './surveillance-decision-committe-confirm.component.html',
} )
export class SurveillanceDecisionCommitteConfirmComponent implements OnInit {
  page: Page = new Page();
  item: SurveillanceDecisionCommitte = new SurveillanceDecisionCommitte();
  hide: boolean = false;
  accept: boolean = false;
  hold: boolean = false;
  withdraw: boolean = false;
  reject: boolean = false;
  inputValue: string;
  selectedItems: SurveillanceDecisionCommitte = new SurveillanceDecisionCommitte();
  modalRef: BsModalRef;
  PostData: SurveillanceDecisionCommitteCreateViewModel = new SurveillanceDecisionCommitteCreateViewModel();
  haveNCRFile: boolean = false;
  haveCorrectivePalnFile: boolean = false;
  RequestID: number;
  private showUploadFile: boolean = false;
  @ViewChild( 'employeeTemplate', { static: false } ) employeeTemplate: any;
  @ViewChild( 'confirmativeTemplate', { static: false } ) confirmativeTemplate: any;
  constructor(
    private _committeDesisionService: SurveillanceCommitteeDecisionService,
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


  SetItem( selectedItem: SurveillanceDecisionCommitte ) {
    this.selectedItems = selectedItem;
  }

  ShowDone( choose: number ) {
    this.PostData.RequestID = this.selectedItems.RequestID;
    // this.items.find( e => e.ID == this.selectedItems.ID ).CommitteeDecision = this.PostData;
    this.PostData.Reason = this.inputValue;
    if ( choose == 0 ) {
      this.PostData.Status = SurveillanceStatus.Approve;
      this.accept = true;
      this.item.ApproveStatus = 0;
      this.reject = false;
    }
    if ( choose == 1 ) {
      this.PostData.Status = SurveillanceStatus.Withdraw;
      this.accept = false;
      this.reject=false;
      this.hold=false;
      this.item.ApproveStatus = 1;
      this.withdraw = true;
    }
    if ( choose == 2 ) {
      this.PostData.Status = SurveillanceStatus.Hold;
      this.accept = false;
      this.reject=false;
      this.withdraw = false;
      this.item.ApproveStatus = 2;
      this.hold = true;
    }
    if ( choose == 3 ) {
      this.PostData.Status = SurveillanceStatus.Cancel;
      this.accept = false;
      this.withdraw = false;
      this.hold =false;
      this.item.ApproveStatus = 3;
      this.reject = true;
    }

    this.item.StaffRequiredAction = 0;
    this._committeDesisionService.PostCommitteeDecision( this.PostData ).subscribe(
      data => {

        this.PostData = new SurveillanceDecisionCommitteCreateViewModel();
        this.hide = true;
        this._router.navigateByUrl( `/request/index` );
      } );
  }


}
