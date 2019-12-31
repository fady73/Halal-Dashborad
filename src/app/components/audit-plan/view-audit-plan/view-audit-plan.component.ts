import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { SelectItem } from './../../../shared/view-models/select-view-model';
import { CrudService } from './../../../shared/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditPlanService } from '../audit-plan.service';
import { EmployeeService } from '../../admin/employee/employee.service';
import { AuditPlanViewModel } from '../audit-plan.model';
import { forkJoin } from 'rxjs';
import { NCRService } from '../ncr.service';
import { NCRCreateViewModel } from '../ncr/ncr-create.model';
import { NCRNCSCreateViewModel } from '../ncr/ncr-ncs-create.model';
import { NCSCommentCreateViewModel } from '../ncs-comment-create.model';
import { Validators, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component( {
  selector: 'app-view-audit-plan',
  templateUrl: './view-audit-plan.component.html',
  styleUrls: ['./view-audit-plan.component.css']
} )
export class ViewAuditPlanComponent implements OnInit {
  page: CRUDCreatePage = new CRUDCreatePage();
  requestID: number = 0;
  auditPlanViewModel: AuditPlanViewModel = new AuditPlanViewModel();
  ncrViewModel: NCRCreateViewModel = new NCRCreateViewModel();
  model: NCSCommentCreateViewModel[] = [];
  ncsAcceptanceViewModel: NCRNCSCreateViewModel[] = [];
  closingStatus: SelectItem[] = [];
  selectedItem: NCSCommentCreateViewModel = new NCSCommentCreateViewModel();
  hasCAB = false;
  modalRef: BsModalRef;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;
  @ViewChild( 'declineTemplate', { static: false } ) declineTemplate: any;

  constructor(
    private _auditPlanService: AuditPlanService,
    private _ncrService: NCRService,
    private _employeeService: EmployeeService,
    private _crudService: CrudService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.requestID = +params.get( "id" );
      }

      forkJoin( [
        this._auditPlanService.getByRequestID( this.requestID ),
        this._ncrService.getByRequestID( this.requestID ),
        this._ncrService.GetNCClosingStatusList(),
        // this._employeeService.getList()
      ] ).subscribe( res => {
        this.auditPlanViewModel = res[0].Data;
        this.ncrViewModel = res[1].Data;
        //error in this line
        // this.ncrViewModel.NCSs.every( ncs => { ncs.expanded = false } );
        this.closingStatus = res[2].Data;
        this.ncrViewModel.NCSs.forEach( ( ncs, i ) => {
          if ( ncs.CABAcceptance )
            this.hasCAB = true;
        } );
       
        this.createForm();
        this.page.isPageLoaded = true;
      }
      );
    } );
    // this.createForm();
  }

  // createForm(): void {
  //   this.page.form = this._crudService.formBuilder.group( {
  //     FinalComment: [this.model.FinalComment],
  //     NextAssessment: [this.model.NextAssessment],
  //     CorrectiveActionEvaluation: [this.model.CorrectiveActionEvaluation, Validators.required],
  //     NCSCloseStatus: [this.model.NCSCloseStatus]
  //   } )
  // }

  createForm() {
    let arr = [];
    for ( let i = 0; i < this.ncrViewModel.NCSs.length; i++ ) {
      arr.push( this.BuildFormDynamic( this.ncrViewModel.NCSs[i] ) )

    }
    this.page.form = this._crudService.formBuilder.group( {
      NCSsForm: this._crudService.formBuilder.array( arr )
    } )
  }

  BuildFormDynamic( NCS ): FormGroup {
    return this._crudService.formBuilder.group( {
      NCSID: [0],
      FinalComment: [''],
      NextAssessment: [''],
      CorrectiveActionEvaluation: ['', Validators.required],
      NCCloseStatus: [0]
    } )
  }
  toggle( index ) {
    this.ncrViewModel.NCSs[index].expanded = !this.ncrViewModel.NCSs[index].expanded;
  }

  save() {
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value.NCSsForm );
    this.page.form.value.NCSsForm.forEach( ( obj, index ) => {
      this.model[index].NCSID = this.ncrViewModel.NCSs[index].ID;
      this.model[index].FinalComment = obj.FinalComment;
      this.model[index].NextAssessment = obj.NextAssessment;
      this.model[index].CorrectiveActionEvaluation = obj.CorrectiveActionEvaluation;
      this.model[index].NCCloseStatus  = + obj.NCCloseStatus ;
      this.model[index].Status = this.ncrViewModel.NCSs[index].Status;
      this.model[index].StatusName = this.ncrViewModel.NCSs[index].StatusName;
      this.model[index].DeclineReason = this.ncrViewModel.NCSs[index].DeclineReason;

    
    
    } 
    
    
    )

    this._ncrService.postNCSComment( this.model ).subscribe( response => {
      // this.isSaving = true;
      if ( response.Success ) {
        this._crudService.alert.success( response.Message );
        this._router.navigateByUrl( `/request/index` );
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, () => {
      this.page.isSaving = false;
    } );
  }
  showApproveConfirmation( selectedItem: NCSCommentCreateViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this._crudService.modalService.show( this.approveTemplate, { class: 'modal-md' } );
  }



  showDeclineConfirmation( selectedItem: NCSCommentCreateViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this._crudService.modalService.show( this.declineTemplate, { class: 'modal-md' } );
  }


  approve( selectedItem ) {
    let index = this.ncrViewModel.NCSs.findIndex( x => x == selectedItem );
    this.ncrViewModel.NCSs[index].Status = 1;
    this.ncrViewModel.NCSs[index].StatusName = "Approved";
  }
  decline( selectedItem ) {
    let index = this.ncrViewModel.NCSs.findIndex( x => x == selectedItem );
    this.ncrViewModel.NCSs[index].Status = 2;
    this.ncrViewModel.NCSs[index].StatusName = "Decline";
    this.ncrViewModel.NCSs[index].DeclineReason = selectedItem.DeclineReason;

  }
}
