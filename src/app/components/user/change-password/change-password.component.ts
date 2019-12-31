import { CRUDCreatePage } from './../../../shared/view-models/crud-create.model';
import { UserService } from './../user.service';
import { Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Hotkey } from 'angular2-hotkeys';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ChangePasswordViewModel } from './change-password.model';
import { MustMatch } from 'src/app/shared/common/validators/must-match.validator';


@Component( {
  selector: 'app-create',
  templateUrl: './change-password.component.html',
  // styleUrls: ['./create.component.css']
} )
export class ChangePasswordComponent implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
 
  model:  ChangePasswordViewModel= new ChangePasswordViewModel();
  constructor(
    private _crudService: CrudService,
    private _userService: UserService,
    private _router:Router,
    //private _branchService: BranchService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    this.createForm();
  }
 



  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      Password: [this.model.Password, [Validators.required,Validators.minLength(6),Validators.maxLength( 100 )]],
      OldPassword: [this.model.OldPassword, [Validators.required,Validators.minLength(6), Validators.maxLength( 100 )]],
      ConfirmPassword: [this.model.ConfirmPassword, [Validators.required,Validators.minLength(6), Validators.maxLength( 100 )]],
      
    } , {
      validator: MustMatch( 'Password', 'ConfirmPassword' )
    } )
  }

  disabledSubmit(): boolean {
    return this.page.isSaving || this.page.isUploading || !this.page.form.valid;
  }
  save(): void {
    if ( this.disabledSubmit() )
      return;
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value ) as ChangePasswordViewModel;
    this._userService.changePassword( this.model ).subscribe( response => {
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if ( response.Success ) {
        this._crudService.alert.success( response.Message );
      this._userService.signOut();
        this._router.navigateByUrl("/login");
      }
      else {
        this._crudService.alert.error( response.Message );
      }
    }, error => {
      this._crudService.alert.error( error ); this.page.isSaving = false;
    }, () => { this.page.isSaving = false; } );
  }

  get controls() {
    return this.page.form.controls;
  }
  isValidControl( name: string ): boolean {
    let control = this.page.form.controls[name];
    return control.valid && control.touched;
  }
  

}
