import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'src/app/shared/view-models/page.model';
import { ComplaintModel } from '../complaint-model';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { RoleAction } from '../../admin/user/role-action.model';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { ComplaintServiceService } from '../complaint-service.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CityService } from '../../admin/city/city.service';
import { RoleService } from '../../admin/role/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { CreateComplaintModel, ComplaintStatus } from '../create-complaint-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page: Page = new Page();
 id:number;
  items: ComplaintModel[] = [];

  countries: SelectItem[] = [];
  requestTypes: SelectItem[] = [];
  requestStatus: SelectItem[] = [];
  companies: SelectItem[] = [];
  employees: SelectItem[] = [];
  hide: boolean = false;
  accept: boolean = false;
  reject: boolean = false;
  inputValue: string;
   selectedItem: ComplaintModel = new ComplaintModel();
   data:CreateComplaintModel=new CreateComplaintModel();
  modalRef: BsModalRef;


  haveNCRFile: boolean = false;
  haveCorrectivePalnFile: boolean = false;
  compmaintstatus:ComplaintStatus=new ComplaintStatus();
  private showUploadFile: boolean = false;
  form: FormGroup;
  formd: FormGroup;
  @ViewChild( 'employeeTemplate', { static: false } ) employeeTemplate: any;
  @ViewChild( 'confirmativeTemplate', { static: false } ) confirmativeTemplate: any;
  @ViewChild( 'approveTemplate', { static: false } ) approveTemplate: any;
  @ViewChild( 'declineTemplate', { static: false } ) declineTemplate: any;
  constructor(
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private complaintervice: ComplaintServiceService,

    private crud: CrudService,
    private _countryService: CityService,
   private _router:Router,
    
    private spinner: NgxSpinnerService ) {

  }

  ngOnInit() {
    
    
    this.search();
    
  this.createForm();
  }
  createForm() {
    this.form = this._formBuilder.group( {
      Message: [this.data.Comment],
    }
    );
    this.formd = this._formBuilder.group( {
      Message: [this.data.Comment],
    }
    );
  }
  showtoggle() {
    this.showUploadFile = true;

  }
  hidetoggle() {
    this.showUploadFile = false;

  }

  


  search( orderBy: string = "ID", isAscending: boolean = false, pageIndex: number = 1 ) {
    this.page.isLoading = true;

    this.items = [];
    this.complaintervice.Get( ).subscribe( response => {
      if ( response.Success ) {
        // this.page.options.totalItems = response.Data.Records;
        // this.page.options.totalPages = response.Data.Pages;
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
  // SetItem( selectedItem: DecisionCommitte ) {
  //   this.selectedItems = selectedItem;
  // }
  approve() {
    let index = this.items.indexOf(this.selectedItem);
    this.items[index].ComplaintStatus =  this.compmaintstatus.Approve;
 
    this.data.ComplaintID=this.items[index].ID;
    this.data.ComplaintStatus=this.items[index].ComplaintStatus;
    Object.assign( this.data, this.form.value );
    // this.items[index].StatusName = "Approved";
    this.complaintervice.approved( this.data ).subscribe( response => {
  
      this.alertService.success( response.Message );
    },
      error => {
        
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => { }

    );
  }
  decline() {
    let index = this.items.indexOf(this.selectedItem);
    this.items[index].ComplaintStatus =  this.compmaintstatus.Decline;
 
    this.data.ComplaintID=this.items[index].ID;
    this.data.ComplaintStatus=this.items[index].ComplaintStatus;
    Object.assign( this.data, this.formd.value );
    console.log(this.data)
    // this.items[index].StatusName = "Approved";
    this.complaintervice.approved( this.data ).subscribe( response => {
  
      this.alertService.success( response.Message );
    },
      error => {
        
        this.alertService.error( "An error occured , Please try again later    " )
      },
      () => { }

    );
  }
  showApproveConfirmation( selectedItem: ComplaintModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.approveTemplate, { class: 'modal-lg' } );
  }
  showDeclineConfirmation( selectedItem: ComplaintModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.declineTemplate, { class: 'modal-lg' } );
  }
 



}
