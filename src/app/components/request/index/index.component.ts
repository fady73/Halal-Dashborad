import { AttachmentCreateViewModel } from 'src/app/shared/view-models/attachment-create.model';
import { UploadFile } from 'src/app/shared/view-models/upload-file';
import { ActionEnum } from './../../admin/role/action-enum.enum';
import { AuditPlanService } from './../../audit-plan/audit-plan.service';
import { AttachmentService } from './../../../shared/services/attachment.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CityService } from './../../admin/city/city.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { RequestViewModel } from '../request.model';
import { RequestSearchViewModel } from '../request-search.model';
import { RequestService } from '../request.service';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { BsModalRef } from 'ngx-bootstrap';
import { EmployeeService } from '../../admin/employee/employee.service';
import { AgreementViewModel } from '../../agreement/agreement.model';
import { NCRFileCreateViewModel } from '../../audit-plan/NCR-file-create.model';
import { RoleAction } from '../../admin/user/role-action.model';
import { PageEnum } from '../../admin/role/page-enum.enum';
import { UserService } from '../../admin/user/user.service';
import { RoleService } from '../../admin/role/role.service';
import { AppendixClassificationService } from '../appendix-classification.service';
import { ProductCategoryViewModel } from '../product-category.model';
import { RecognitionRequestModificationService } from '../recognition-request-modification.service';
import { RecognitionRequestModification } from '../viewModels/recognition-request-modification-model';
import { RequestFinalActionCreateViewModel } from '../viewModels/request-final-action-create-view-model';
import { RegularModificationModel } from '../viewModels/regular-modification-model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'

})
export class IndexComponent implements OnInit {
  page: Page = new Page();
  searchViewModel: RequestSearchViewModel = new RequestSearchViewModel();
  items: RequestViewModel[] = [];
  productCategoryItems: ProductCategoryViewModel[] = [];
  countries: SelectItem[] = [];
  requestTypes: SelectItem[] = [];
  requestStatus: SelectItem[] = [];
  companies: SelectItem[] = [];
  employees: SelectItem[] = [];
  requestEmployees: SelectItem[] = [];
  comments: string = "kjnljjlkjl kjna;klnfklsajlknf    kan;jfkl;nsklanl;kfksndlknf laknskmnfkndknfakjn ";
  NCRFile: NCRFileCreateViewModel = new NCRFileCreateViewModel();
  requestFinalActionCreateViewModel: RequestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
  finalActionReasonsList: SelectItem[] = [];
  hasNonConfirmative = false;
  selectedItem: RequestViewModel = new RequestViewModel();
  modalRef: BsModalRef;
  actions: RoleAction[] = [];
  canAssignEmployee: boolean = false;
  isRecognitionModificationLoaded = false;
  fees: number = 0;
  recognitionRequestModificationModel: RecognitionRequestModification = new RecognitionRequestModification();
  regularModificationModel:RegularModificationModel=new RegularModificationModel();
  private showUploadFile: boolean = false;
  isReasonsLoaded = false;
  cancelForm: FormGroup;
  suspendForm: FormGroup;
  withdrawForm: FormGroup;
  minDate: string;
  suspendMaxEndDate: string;
  suspendMinEndDate: string;
  isSaving = false;
  @ViewChild('dropzone', { static: false }) dropzone: any;
  @ViewChild('employeeTemplate', { static: false }) employeeTemplate: any;
  @ViewChild('approveTemplate', { static: false }) approveTemplate: any;
  @ViewChild('confirmativeTemplate', { static: false }) confirmativeTemplate: any;
  @ViewChild('recognitionModificationApproveTemplate', { static: false }) recognitionModificationApproveTemplate: any;
  @ViewChild('cancelRequestTemplate', { static: false }) cancelRequestTemplate: any;
  @ViewChild('withdrawRequestTemplate', { static: false }) withdrawRequestTemplate: any;
  @ViewChild('suspendRequestTemplate', { static: false }) suspendRequestTemplate: any;
  @ViewChild('resumeCertificateTemplate', { static: false }) resumeCertificateTemplate: any;
  @ViewChild('regularModificationApproveTemplate', { static: false }) regularModificationApproveTemplate: any;
 
  constructor(
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private requestService: RequestService,
    private crud: CrudService,
    private _auditPlanService: AuditPlanService,
    private _appendixClassificationService: AppendixClassificationService,
    private _roleService: RoleService,
    private _recognitionRequestModificationService: RecognitionRequestModificationService,
    private _attachmentService: AttachmentService,
    private _countryService: CityService,
    private _employeeService: EmployeeService) {
    this.minDate = this.formatDate(new Date());
  }

  ngOnInit() {
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
  showtoggle() {
    this.showUploadFile = true;

  }
  hidetoggle() {
    this.showUploadFile = false;

  }
  createSearchForm() {
    this.searchViewModel.ToDate = new Date();
    this.searchViewModel.FromDate = this.crud.dateService.getFirstDayCurrentMonth();
    //.setDate( ( new Date() ).getDate() - 30 );
    this.page.seachForm = this._formBuilder.group({
      ID: [this.searchViewModel.ID],
      CountryID: [this.searchViewModel.CountryID],
      FromDate: [moment(this.searchViewModel.FromDate).format('MM-DD-YYYY')],
      ToDate: [moment(this.searchViewModel.ToDate).format('MM-DD-YYYY')],
      CompanyID: [this.searchViewModel.CompanyID],
      StatusID: [this.searchViewModel.StatusID],
      TypeID: [this.searchViewModel.TypeID],

      NID: [this.searchViewModel.NID]
    });
  }

  createCancelRequestForm() {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.requestFinalActionCreateViewModel.Date = new Date();
    this.cancelForm = this._formBuilder.group({
      ActionReason: [0, [Validators.required]],
      Reason: ['', [Validators.required]],
      EmployeeID: [null, [Validators.required]],
      Date: [this.formatDate(this.requestFinalActionCreateViewModel.Date), [Validators.required]]
    });
  }

  createWithdrawRequestForm() {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.requestFinalActionCreateViewModel.Date = new Date();
    this.withdrawForm = this._formBuilder.group({
      ActionReason: [3, [Validators.required]],
      Reason: ['', [Validators.required]],
      EmployeeID: [null, [Validators.required]],
      Date: [this.formatDate(this.requestFinalActionCreateViewModel.Date), [Validators.required]]
    });
  }

  createSuspendRequestForm() {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.requestFinalActionCreateViewModel.Date = new Date();
    this.requestFinalActionCreateViewModel.SuspensionStartDate = new Date();
    this.requestFinalActionCreateViewModel.SuspensionEndDate = new Date((new Date).setMonth((new Date).getMonth() + 6));
    this.suspendMinEndDate = this.minDate;
    this.suspendMaxEndDate = this.formatDate(this.requestFinalActionCreateViewModel.SuspensionEndDate);
    this.suspendForm = this._formBuilder.group({
      ActionReason: [3, [Validators.required]],
      Reason: ['', [Validators.required]],
      EmployeeID: [null, [Validators.required]],
      SuspensionStartDate: [this.formatDate(this.requestFinalActionCreateViewModel.SuspensionStartDate), [Validators.required]],
      SuspensionEndDate: [this.formatDate(this.requestFinalActionCreateViewModel.SuspensionEndDate), [Validators.required]]
    });
  }

  initializePage() {
    forkJoin([
      this.requestService.getRequestTypeList(),
      this.requestService.getCompaniesList(),
      this.requestService.getRequestStatusList(),
      this._countryService.getList(),
      this._employeeService.getList(),
      this._roleService.getPageActions(PageEnum.Requests)
    ]).subscribe(res => {
      this.requestTypes = res[0].Data;
      this.companies = res[1].Data;
      this.requestStatus = res[2].Data;
      this.countries = res[3].Data;
      this.employees = res[4].Data;
      this.actions = res[5].Data;

      this.canAssignEmployee = this._roleService.isUserHasAction(this.actions, ActionEnum.AssigningRequestToStaffMembers);

      this.createSearchForm();
      this.search();
    }, error => { }, () => {
      this.page.isPageLoaded = true;

    });
  };
  onSearchClicked() {
    this.items = [];
    Object.assign(this.searchViewModel, this.page.seachForm.value);
    this.search();
  }
  search(orderBy: string = "ID", isAscending: boolean = false, pageIndex: number = 1) {
    this.page.isLoading = true;
    this.searchViewModel.FromDate = null;
    this.searchViewModel.ToDate = moment(this.searchViewModel.ToDate).format('MM-DD-YYYY');

    this.requestService.get(this.searchViewModel, orderBy, isAscending, pageIndex).subscribe(response => {
      if (response.Success) {
        console.log(response.Data)
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        console.log(response.Data.Result)
        this.items = response.Data.Result as RequestViewModel[];
        this.page.isLoading = false;
      }

    }, null, () => {
      this.page.selectedAll = false;
      this.page.isPageLoaded = true;
    });
  }
  OnSearchClicked() {
    this.page.options.currentPage = 1;
    this.search("ID", this.page.isAscending, 1);
  }
  OnSortClicked(name) {
    this.page.options.currentPage = 1;

    if (name === this.page.orderBy) {
      this.page.isAscending = !this.page.isAscending;
    }
    else {
      this.page.isAscending = true;
    }
    this.page.orderBy = name;
    this.search(this.page.orderBy, this.page.isAscending, 1);
  }
  getNextPrevData(pageIndex) {
    this.search(this.page.orderBy, this.page.isAscending, pageIndex);
    this.page.options.currentPage = pageIndex;
  }

  isColumnSelected(column: string): number {
    return (column != this.page.orderBy) ? 0 : (this.page.isAscending ? 1 : 2);
  }

  compareSuspensionEndDate(endDate) {
    if (endDate == null || endDate == undefined)
      return true;
    var endDateSuspention = new Date(endDate);
    if (endDateSuspention < new Date()) {
      return true;
    }
    return false;
  }

  assign() {
    let index = this.items.indexOf(this.selectedItem);
    this.items[index].AssignedEmployees.push({
      EmployeeName: this.employees.filter(x => x.ID == this.selectedItem.AssignedEmployeeID)[0].Name,
      EmployeeID: this.selectedItem.AssignedEmployeeID
    }
    );
    this.requestService.assign(this.selectedItem).subscribe(response => {

      this.alertService.success(response.Message);
    },
      error => {
        this.alertService.error("An error occur , Please try again later    ")
      },
      () => { }

    );

    // let index = this.items.indexOf( this.selectedItem );


  }
  unAssign(emp, item, index) {
    let itemIndex = this.items.indexOf(item);
    this.items[itemIndex].AssignedEmployees.splice(index, 1);
    this.requestService.unAssign(emp).subscribe(response => {
      this.alertService.success(response.Message);
    },
      error => {
        this.alertService.error("An error occur , Please try again later    ")
      },
      () => { }

    );
  }
  cancel() {
    let index = this.items.indexOf(this.selectedItem);
    // this.items[index].Status = 3;
    // this.items[index].StatusName = "Cancelled";
    this.items[index].RequestCancellationStatus = 2
    this.requestService.cancel(this.selectedItem).subscribe(response => {
      let pageIndex: number = this.page.options.currentPage;
      // if ( this.items.length == 0 ) {
      //   pageIndex = pageIndex > 1 ? --pageIndex : 1;
      // }
      this.alertService.success(response.Message);
    },
      error => {
        // this.items.splice( index, 0, item );
        // this.items[index].Status = 0;
        // this.items[index].StatusName = "New";
        // this.alertService.error( "An error occur , Please try again later    " )
      },
      () => { }

    );
  }
  Decline() {
    let index = this.items.indexOf(this.selectedItem);
    this.items[index].RequestCancellationStatus = 3

    this.requestService.decline(this.selectedItem).subscribe(response => {
      let pageIndex: number = this.page.options.currentPage;
      // if ( this.items.length == 0 ) {
      //   pageIndex = pageIndex > 1 ? --pageIndex : 1;
      // }
      this.alertService.success(response.Message);
    },
      error => {
        // this.items.splice( index, 0, item );
        // this.items[index].Status = 0;
        // this.items[index].StatusName = "New";
        // this.alertService.error( "An error occur , Please try again later    " )
      },
      () => { }

    );

  }
  remove(item: RequestViewModel) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.requestService.remove(item.ID).subscribe(response => {
      let pageIndex: number = this.page.options.currentPage;
      if (this.items.length == 0) {
        pageIndex = pageIndex > 1 ? --pageIndex : 1;
      }
      this.alertService.success(response.Message);
    },
      error => {
        this.items.splice(index, 0, item);
        this.alertService.error("حدث خطأ اثناء عملية الحذف")
      },
      () => { }

    );
  }


  onNonConfirmativeChaged() {
    this.hasNonConfirmative = !this.hasNonConfirmative;

    this.NCRFile = new NCRFileCreateViewModel();
  }
  showAssignConfirmation(selectedItem: RequestViewModel) {
    this.selectedItem = selectedItem;

    // this.employees.forEach( emp => {
    //   let status = this.selectedItem.AssignedEmployees.some( em => { em.EmployeeID == emp.ID } );

    //   if ( ! status  )
    //     this.requestEmployees.push( emp )
    // } )
    this.modalRef = this.crud.modalService.show(this.employeeTemplate, { class: 'modal-md' });


  }

  // showCancelConfirmation( selectedItem: RequestViewModel ) {
  //   this.selectedItem = selectedItem;
  //   this.modalRef = this.crud.modalService.show( this.cancelTemplate, { class: 'modal-sm' } );
  // }
  showApproveConfirmation(selectedItem: RequestViewModel) {
    if (selectedItem.RequestCancellationStatus >= 2) { }
    else {
      this.selectedItem = selectedItem;
      this.modalRef = this.crud.modalService.show(this.approveTemplate, { class: 'modal-md' });
    }
  }
  showConfirmativeTemplate(selectedItem: RequestViewModel) {
    this.NCRFile = new NCRFileCreateViewModel();
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show(this.confirmativeTemplate, { class: 'modal-md' });
  }
  showRegularRequestModificationTemplate(selectedItem: RequestViewModel)
  {
    this.regularModificationModel = new RegularModificationModel();
    this.isRecognitionModificationLoaded = false;
    this.selectedItem = selectedItem;
    this.productCategoryItems = [];
    this.fees = 0;
    forkJoin([
      this._appendixClassificationService.getProductCategories(),
      this.requestService.getregularmodificate(selectedItem.ID),
      //this._requestService.getIsEditableSection(this.id, 7)
    ]).subscribe(res => {
      var list: ProductCategoryViewModel[] = res[0].Data.Result;
      this.regularModificationModel = res[1].Data;
      //this.isEditable = res[2].Data;
      list.forEach(item => {
        if (this.regularModificationModel.ProductCategoriesIDs.filter(id => id == item.ID).length > 0) {
          item.IsSelected = true;
          this.productCategoryItems.push(item);
        }
      });
      this.isRecognitionModificationLoaded = true;
    });

    this.modalRef = this.crud.modalService.show(this.regularModificationApproveTemplate, { class: 'modal-lg' });
  }
  showRecognitionRequestModificationTemplate(selectedItem: RequestViewModel) {
    this.recognitionRequestModificationModel = new RecognitionRequestModification();
    this.isRecognitionModificationLoaded = false;
    this.selectedItem = selectedItem;
    this.productCategoryItems = [];
    this.fees = 0;
    forkJoin([
      this._appendixClassificationService.getProductCategories(),
      this._recognitionRequestModificationService.get(selectedItem.ID),
      //this._requestService.getIsEditableSection(this.id, 7)
    ]).subscribe(res => {
      var list: ProductCategoryViewModel[] = res[0].Data.Result;
      this.recognitionRequestModificationModel = res[1].Data;
      //this.isEditable = res[2].Data;
      list.forEach(item => {
        if (this.recognitionRequestModificationModel.ProductCategoriesIDs.filter(id => id == item.ID).length > 0) {
          item.IsSelected = true;
          this.productCategoryItems.push(item);
        }
      });
      this.isRecognitionModificationLoaded = true;
    });

    this.modalRef = this.crud.modalService.show(this.recognitionModificationApproveTemplate, { class: 'modal-lg' });
  }

  uploadNCRFile(file: File) {
    let isAllawableExt = true;
    let isBiggerThan5MB = false;
    let formData: FormData = new FormData();
    var ext = file[0].name.split('.')[1];

    if (ext != "pdf") {
      isAllawableExt = false;
    }
    else if ((file[0].size / 1024 / 1024) > 5) {
      isBiggerThan5MB = true;
    }
    else {
      formData.append('uploadFile_' + 0, file[0], file[0].name);
    }
    if (isAllawableExt == false) {
      this.crud.alert.error("Only allawable files are pdf");
      //this.dropzone.reset();
    }
    else if (isBiggerThan5MB == true) {
      this.crud.alert.error("Maximum file size is 5 MB");
      //this.dropzone.reset();
    }
    else {
      this._attachmentService.upload(formData).subscribe(response => {
        if (response.Success) {
          // fileList = []
          //this.dropzone.reset();
          let file = response.Data[0];
          this.NCRFile.FilePath = file.FilePath;
          this.NCRFile.FileName = file.FileName;
        }
      },
        error => {
          this.crud.alert.error("Maximum file size is 5 MB");
        }
        , () => { });
    }

  }





  removeNCRFile() {
    this.NCRFile = new NCRFileCreateViewModel();
  }
  saveNCRFile() {

    if (this.hasNonConfirmative && this.NCRFile.FilePath) {
      this.NCRFile.RequestID = this.selectedItem.ID;
      this._auditPlanService.POSTUploadNCR(this.NCRFile).subscribe(response => {
        //alert(response.Success);
        if (response.Success) {
          this.crud.alert.success(response.Message);
        }
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      });
    }
    else {
      // this.requestService.ProceedToAuditReport().subscribe( res => { } );
      this._auditPlanService.confirmAuditPlanByStaff(this.selectedItem.ID).subscribe(response => {
        if (response.Success) {
          this.crud.alert.success(response.Message);
        }
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      });
    }


  }

  recogntionModificationRequest() {
    if (this.fees > 0) {
      this.modalRef.hide();
      console.log(this.selectedItem.ID);
      this._recognitionRequestModificationService.approveRequest(this.selectedItem.ID, this.fees).subscribe(response => {
        if (response.Success) {
          this.alertService.success(response.Message);
          this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
        } else {
          this.alertService.error(response.Message);
        }
      });
    }
  }

  regularModificationRequest()
  {
    if (this.fees > 0) {
      this.modalRef.hide();
      console.log(this.selectedItem.ID);
      this.requestService.approveRequestModification(this.selectedItem.ID, this.fees).subscribe(response => {
        if (response.Success) {
          this.alertService.success(response.Message);
          this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
        } else {
          this.alertService.error(response.Message);
        }
      });
    }
  }
  showCancelRequestTemplate(selectedItem: RequestViewModel) {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.createCancelRequestForm();
    this.isReasonsLoaded = false;
    this.isRecognitionModificationLoaded = false;
    this.selectedItem = selectedItem;
    this.finalActionReasonsList = [];
    forkJoin([
      this.requestService.getCancelActionReasonsList(),
    ]).subscribe(res => {
      this.finalActionReasonsList = res[0].Data;
      console.log(this.finalActionReasonsList)
      this.isReasonsLoaded = true;
    });
    this.modalRef = this.crud.modalService.show(this.cancelRequestTemplate, { class: 'modal-md' });
  }

  cancelRequest() {
    Object.assign(this.requestFinalActionCreateViewModel, this.cancelForm.value);
    this.requestFinalActionCreateViewModel.Action = 3;
    this.requestFinalActionCreateViewModel.RequestID = this.selectedItem.ID;
    this.requestFinalActionCreateViewModel.Date =
      moment(this.requestFinalActionCreateViewModel.Date).format('MM-DD-YYYY');
    console.log(this.requestFinalActionCreateViewModel)
    this.isSaving = true;
    this.requestService.cancelRequest(this.requestFinalActionCreateViewModel).subscribe(respnose => {
      this.isSaving = false;
      if (respnose.Success) {
        this.alertService.success(respnose.Message);
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      } else {
        this.alertService.error(respnose.Message);
      }
    });
  }


  showWithdrawRequestTemplate(selectedItem: RequestViewModel) {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.createWithdrawRequestForm();
    this.isReasonsLoaded = false;
    this.isRecognitionModificationLoaded = false;
    this.selectedItem = selectedItem;
    this.finalActionReasonsList = [];
    forkJoin([
      this.requestService.getWithdrawActionReasonsList(),
    ]).subscribe(res => {
      this.finalActionReasonsList = res[0].Data;
      console.log(this.finalActionReasonsList)
      this.isReasonsLoaded = true;
    });
    this.modalRef = this.crud.modalService.show(this.withdrawRequestTemplate, { class: 'modal-md' });
  }

  withdrawRequest() {
    Object.assign(this.requestFinalActionCreateViewModel, this.withdrawForm.value);
    this.requestFinalActionCreateViewModel.Action = 1;
    this.requestFinalActionCreateViewModel.RequestID = this.selectedItem.ID;
    this.requestFinalActionCreateViewModel.Date =
      moment(this.requestFinalActionCreateViewModel.Date).format('MM-DD-YYYY');
    console.log(this.requestFinalActionCreateViewModel)
    this.isSaving = true;
    this.requestService.withdrawRequest(this.requestFinalActionCreateViewModel).subscribe(respnose => {
      this.isSaving = false;
      console.log(respnose);
      if (respnose.Success) {
        this.alertService.success(respnose.Message);
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      } else {
        this.alertService.error(respnose.Message);
      }
    });
  }

  showSuspendRequestTemplate(selectedItem: RequestViewModel) {
    this.requestFinalActionCreateViewModel = new RequestFinalActionCreateViewModel();
    this.createSuspendRequestForm();
    this.isReasonsLoaded = false;
    this.isRecognitionModificationLoaded = false;
    this.selectedItem = selectedItem;
    this.finalActionReasonsList = [];
    forkJoin([
      this.requestService.getSuspendActionReasonsList(),
    ]).subscribe(res => {
      this.finalActionReasonsList = res[0].Data;
      console.log(this.finalActionReasonsList)
      this.isReasonsLoaded = true;
    });
    this.modalRef = this.crud.modalService.show(this.suspendRequestTemplate, { class: 'modal-md' });
  }

  suspendRequest() {
    Object.assign(this.requestFinalActionCreateViewModel, this.suspendForm.value);
    this.requestFinalActionCreateViewModel.Action = 2;
    this.requestFinalActionCreateViewModel.RequestID = this.selectedItem.ID;
    this.requestFinalActionCreateViewModel.Date =
      moment(this.requestFinalActionCreateViewModel.SuspensionStartDate).format('MM-DD-YYYY');
    this.requestFinalActionCreateViewModel.SuspensionStartDate =
      moment(this.requestFinalActionCreateViewModel.SuspensionStartDate).format('MM-DD-YYYY');
    this.requestFinalActionCreateViewModel.SuspensionEndDate =
      moment(this.requestFinalActionCreateViewModel.SuspensionEndDate).format('MM-DD-YYYY');

    console.log(this.requestFinalActionCreateViewModel)
    this.isSaving = true;
    this.requestService.suspendRequest(this.requestFinalActionCreateViewModel).subscribe(respnose => {
      this.isSaving = false;
      if (respnose.Success) {
        this.alertService.success(respnose.Message);
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      } else {
        this.alertService.error(respnose.Message);
      }
    });

  }
  showResumeCertificatetemplate(selectedItem: RequestViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show(this.resumeCertificateTemplate, { class: 'modal-md' });
  }
  resumeCertificate() {
    this.isSaving = true;
    this.requestService.resumeRequest(this.selectedItem.ID).subscribe(respnose => {
      this.isSaving = false;
      console.log(respnose);
      if (respnose.Success) {
        this.alertService.success(respnose.Message);
        this.search(this.page.orderBy, this.page.isAscending, this.page.options.currentPage);
      } else {
        this.alertService.error(respnose.Message);
      }

    });
  }

  selectAll() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].IsSelected = this.page.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.page.selectedAll = this.items.every(function (item: any) {
      return item.selected == true;
    })
  }
  formatDate(d) {
    //get the month
    var month = d.getMonth();
    //get the day
    //convert day to string
    var day = d.getDate().toString();
    //get the year
    var year = d.getFullYear();

    //increment month by 1 since it is 0 indexed
    //converts month to a string
    month = (month + 1).toString();

    //if month is 1-9 pad right with a 0 for two digits
    if (month.length === 1) {
      month = "0" + month;
    }

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length === 1) {
      day = "0" + day;
    }

    //return the string "MMddyy"
    return year + '-' + month + '-' + day;
  }

  changeSuspendStartDate() {
    var startDate = new Date(this.suspendForm.controls["SuspensionStartDate"].value);
    console.log(startDate);
    this.suspendMinEndDate = this.formatDate(startDate);
    this.requestFinalActionCreateViewModel.SuspensionEndDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
    var formattedEndDate = this.formatDate(this.requestFinalActionCreateViewModel.SuspensionEndDate);
    this.suspendForm.controls["SuspensionEndDate"].setValue(formattedEndDate);
    this.suspendMaxEndDate = formattedEndDate;
  }
}
