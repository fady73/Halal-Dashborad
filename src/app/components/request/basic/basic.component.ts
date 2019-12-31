import { AppendixClassificationService } from './../appendix-classification.service';
import { ScopeProcessesViewModel, RecognitionRequestCreateViewMode } from './../viewModels/scope-processes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { RequestViewModel } from '../request.model';
import { RequestService } from '../request.service';
import { RequestCommentViewModel } from '../request-comment.model';
import { CertificateViewModel } from '../viewModels/certificate.model';
import { SalesViewModel } from '../viewModels/sales.model';
import { VisitCostViewModel } from '../viewModels/visit-cost.model';
import { OperationsViewModel } from '../viewModels/operations.model';
import { CompanyDetailsViewModel } from '../viewModels/company-details.model';
import { ProductCategoryViewModel } from '../product-category.model';
import { RequestAppendixIViewModel } from '../request-appendixI.model';
import { RegularRequestCreateViewModel } from '../regular-request-create.model';
import { RegularRequestService } from '../regular-request.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})

export class BasicComponent implements OnInit {
  @Input() requestID=0
  form: FormGroup;
  appendixI: ProductCategoryViewModel[] = [];
  isUploading = false;
  isEdit = false;
  isSaving = false;
  resultViewModel: ResultViewModel;
  regularRequestViewModel: RegularRequestCreateViewModel = new RegularRequestCreateViewModel();
  RecognitionRequestCreateViewMode:RecognitionRequestCreateViewMode=new RecognitionRequestCreateViewMode();

  companyDetailsViewModel: CompanyDetailsViewModel = new CompanyDetailsViewModel();
  certificationsViewModel: CertificateViewModel = new CertificateViewModel();
  operationsViewModel: OperationsViewModel = new OperationsViewModel();
  SalesViewModel: SalesViewModel[] = [];
  visitCostViewModel: VisitCostViewModel = new VisitCostViewModel();
  scopeProcessesViewModel: ScopeProcessesViewModel = new ScopeProcessesViewModel();
  isPageLoaded = false;
  
  isProcesses2ModalLoaded=false;
  isCompanyDetailsModalLoaded = false;
  isCertifictionsModalLoaded = false;
  isProcessesModalLoaded = false;
  isOperationsModalLoaded = false;
  isSalesModalLoaded = false;
  isVisitCostModalLoaded = false;
  comments: RequestCommentViewModel[] = [];
  selectedCategories: RequestAppendixIViewModel[] = [];
  model: RequestViewModel = new RequestViewModel();
  constructor( private formBuilder: FormBuilder,
    private _requestService: RequestService,
    private _regularRequestService: RegularRequestService,

    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private _appendixClassificationService: AppendixClassificationService,
    private _spinner: NgxSpinnerService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    for ( let step = 1; step <= 8; step++ ) {
      this.comments.push( { ID: 0, Comment: "", StepNumber: step, RequestID: 0, CommentStatus: 1, Confirmed: false } );
    }

    this.initializePage();
    this.getCompanyDetails();
  }
  initializePage() {
    this._spinner.show();
    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.ID = +params.get( 'id' );
        this.isEdit = this.model.ID > 0;
      }

      forkJoin( [
        this._requestService.getByID( this.model.ID ),
        this._requestService.getComments( this.model.ID ),
        this._appendixClassificationService.getProductCategories(),
        this._appendixClassificationService.getAppendixI( this.model.ID ),
        this._regularRequestService.getEditableByID( this.model.ID ),

        // this._requestService.getRequiredCertificate( this.model.ID )
        // this.userService.getUserRoles(this.model.ID)
      ] ).subscribe( res => {
        this.model = res[0].Data;
        let requestComments = res[1].Data as RequestCommentViewModel[];
        this.comments.forEach( comment => {
          if ( requestComments && requestComments.some( x => x.StepNumber == comment.StepNumber ) ) {
            let seletcedComment = requestComments.filter( x => x.StepNumber == comment.StepNumber )[0];
            comment.Comment = seletcedComment.Comment;
            comment.ID = seletcedComment.ID;
            comment.Confirmed = seletcedComment.Confirmed;
            comment.RequestID = seletcedComment.RequestID;
          }
        } );
        this.appendixI = res[2].Data.Result;
        this.selectedCategories = res[3].Data;
        this.appendixI.forEach( item => {
          item.IsSelected = this.selectedCategories && this.selectedCategories.some( x => x.ProductCategoryID == item.ID );
        } );

        // this.certificationsViewModel = res[2].Data;
        // this.userRoles=res[1].Data;
        // this.createForm();
        this.regularRequestViewModel = res[4].Data;

        this.isPageLoaded = true;
        this._spinner.hide();
      }
      );

    } );

  }
  getScopeProcessesType2() {
    this.isProcesses2ModalLoaded = false;
    this._requestService.getScopeProcessesTypeTwo( this.model.ID ).subscribe( response => {
      this.RecognitionRequestCreateViewMode = response.Data;
      this.isProcesses2ModalLoaded = true;
    } );
  }
  save() {
    let comments = this.comments;
    //comments = comments.filter( x => x.Comment != "" && x.Comment != null );
    comments.forEach( comment => {
      comment.RequestID = this.model.ID;
    } );
    this._requestService.POSTRequestComments( comments ).subscribe( response => {
      if ( response.Success ) {
        this._alertService.success( response.Message );
        this._router.navigateByUrl( "/request/index" );
      }
      else {
        this._alertService.error( response.Message );

      }
    } );
  }
  getCompanyDetails() {
    this.isCompanyDetailsModalLoaded = false;
    this._requestService.getByID( this.model.ID ).subscribe( response => {
      this.companyDetailsViewModel = response.Data;
      this.isCompanyDetailsModalLoaded = true;
    } );
  }
  postRequestComment( stepNumber: number, comment: string ) {
    const commentViewModel = new RequestCommentViewModel();
    commentViewModel.Comment = comment;
    commentViewModel.RequestID = this.model.ID;
    commentViewModel.StepNumber = stepNumber;
    this._requestService.postRequestComment( commentViewModel ).subscribe( response => {
      if ( response.Success ) {
        this._alertService.success( response.Message );
      } else {
        this._alertService.error( response.Message );
      }
      // alert( response.Message );
    } );
  }

  disabledSubmit() {
    return this.isSaving || this.isUploading || !this.form.valid;
  }


  get name() {
    return this.form.controls.Name;
  }
  get password() {
    return this.form.controls.Password;
  }
  get email() {
    return this.form.controls.Email;
  }
  get mobile() {
    return this.form.controls.Mobile;
  }
  get code() {
    return this.form.controls.Code;
  }
  get address() {
    return this.form.controls.Address;
  }
  get NID() {
    return this.form.controls.NID;
  }
  get whatsNumber() {
    return this.form.controls.WhatsNumber;
  }
  get viberNumber() {
    return this.form.controls.ViberNumber;
  }
  get notes() {
    return this.form.controls.Notes;
  }


 


  getCertificates() {
    this.isCertifictionsModalLoaded = false;
    this._requestService.getRequiredCertificate( this.model.ID ).subscribe( response => {
      this.certificationsViewModel = response.Data;
      if(this.certificationsViewModel.CertificateDescription=="null")
      {
        this.certificationsViewModel.CertificateDescription=""

      }
      this.isCertifictionsModalLoaded = true;
    } );
  }
  getScopeProcesses() {
    this.isProcessesModalLoaded = false;
    this._requestService.getScopeProcesses( this.model.ID ).subscribe( response => {
      this.scopeProcessesViewModel = response.Data;
      this.isProcessesModalLoaded = true;
    } );
  }
  getOperations() {
    this.isOperationsModalLoaded = false;
    this._requestService.getOperations( this.model.ID ).subscribe( response => {

      this.operationsViewModel = response.Data;
      this.isOperationsModalLoaded = true;
    } );
  }

  toggle( status ) {

  }
  removeAttachment( index: number ) {
    this.certificationsViewModel.PreviousAuditAttachments.splice( index, 1 );
  }
  getSales() {
    this.isSalesModalLoaded = false;
    this._requestService.getSales( this.model.ID ).subscribe( response => {
      this.SalesViewModel = response.Data;
      this.isSalesModalLoaded = true;
    } );
  }
  getVisitCost() {
    this.isVisitCostModalLoaded = false;
    this._requestService.getVisitCost( this.model.ID ).subscribe( response => {
      this.visitCostViewModel = response.Data;
      this.isVisitCostModalLoaded = true;
    } );
  }

  openNewTab( url ) {
    window.open( url );
  }

}

