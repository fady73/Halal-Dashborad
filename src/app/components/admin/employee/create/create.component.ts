import { Patterns } from './../../../../shared/common/patterns';
import { BranchService } from './../../../admin/branch/branch.service';
import { CRUDCreatePage } from './../../../../shared/view-models/crud-create.model';
import { Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { EmployeeCreateViewModel, Division } from '../employee-create.model';
import { EmployeeService } from '../employee.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { Hotkey } from 'angular2-hotkeys';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserRoleViewModel } from '../../user/user-role.model';
import { RoleService } from '../../role/role.service';
import { DivisionView } from '../division-view';


@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {
  isPageLoaded = false;
  page: CRUDCreatePage = new CRUDCreatePage();
  branches: SelectItem[] = [];
  userRoles: UserRoleViewModel[] = [];
  roles: SelectItem[] = [];
  division: DivisionView[];
  modalRef: BsModalRef;
  select: number;
  selectRole: number;
  @ViewChild( 'deleteTemplate', { static: false } ) deleteTemplate: any;
  model: EmployeeCreateViewModel = new EmployeeCreateViewModel();
  constructor(
    private _crudService: CrudService,
    private _employeeService: EmployeeService,
    //private _branchService: BranchService,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    this.registerHotKey();
    this.initializePage();
  }
  initializePage(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.ID = +params.get( "id" );
        this.page.isEdit = this.model.ID > 0;
      }

      forkJoin( [
        this._employeeService.getEditableById( this.model.ID ),
        this._roleService.getRoleList(),
        //this._branchService.getList(),
        this._employeeService.getDivision()

      ] ).subscribe( res => {
        this.model = res[0].Data;
        this.roles = res[1].Data;
        this.division = res[2].Data

        this.selectRole=this.model.Role;
        this.select = this.model.Division;
        if ( this.select == undefined ) {
          this.select = 0;
        }
        if ( this.selectRole == undefined ) {
          this.selectRole = 0;
        }

        //this.branches=res[1].Data;
        // if(!this.page.isEdit && this.branches && this.branches.length>0)
        //    this.model.BranchID=this.branches[0].ID;
        if ( this.page.isEdit ) {
          // delete the next row of it work from backend
          // this.model.Roles=[];
          // this.roles.forEach( item => {
          //   item.Selected = this.model.Roles.filter( x => x.RoleID == item.ID ).length > 0;
          // } );
        }

        this.createForm();
        this.page.isPageLoaded = true;
      }
      );

    } );

  }

  showDeleteConfirmation() {
    this.modalRef = this.modalService.show( this.deleteTemplate, { class: 'modal-sm' } );
  }

  delete(): void {
    this.modalRef.hide();
    this._employeeService.remove( this.model.ID ).subscribe( res => {
      if ( res.Success ) {
        this._crudService.alert.success( res.Message );
        this._crudService.router.navigateByUrl( "/admin/employee" );
      }

      if ( !res.Success )
        this._crudService.alert.error( res.Message );
    } );

  }


  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      //Code: [this.model.Code, [Validators.maxLength(100)]],
      //BranchID: [this.model.BranchID,[Validators.required]],
      FirstName: [this.model.FirstName, [Validators.required, Validators.maxLength( 100 )]],
      LastName: [this.model.LastName, [Validators.required, Validators.maxLength( 100 )]],
      Phone: [this.model.Phone, [Validators.required, Validators.maxLength( 100 ), Validators.pattern( Patterns.OnlyNumbers )]],
      Email: [this.model.Email, [Validators.required, Validators.maxLength( 40 ), Validators.pattern( Patterns.Email )]],
      Division: [this.model.Division],
      Role: [this.model.Role],
      IsActive: [this.model.IsActive]
    } )
  }

  disabledSubmit(): boolean {
    return this.page.isSaving || this.page.isUploading || !this.page.form.valid;
  }
  save(): void {
    if ( this.disabledSubmit() )
      return;
    this.page.isSaving = true;
    Object.assign( this.model, this.page.form.value ) as EmployeeCreateViewModel;
    // this.roles.filter( x => x.Selected ).forEach( item => {
    //   this.model.Roles.push( { ID: 0, RoleID: item.ID, UserID: this.model.ID } );
    // } );
    this._employeeService.postOrUpdate( this.model ).subscribe( response => {
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if ( response.Success ) {

        if ( this.model.ID == 0 ) {
          this.model = new EmployeeCreateViewModel();
          this.createForm();
        }
        this._crudService.alert.success( response.Message );
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
  registerHotKey(): void {
    //New
    this._crudService.hotkeys.add( new Hotkey( 'shift+n', ( event: KeyboardEvent ): boolean => {
      this._crudService.router.navigateByUrl( "/admin/employee/create" );
      return false; // Prevent bubbling
    } ) );

    //Save
    this._crudService.hotkeys.add( new Hotkey( 'shift+s', ( event: KeyboardEvent ): boolean => {
      this.save();
      return false; // Prevent bubbling
    } ) );

    //Delete
    this._crudService.hotkeys.add( new Hotkey( 'shift+d', ( event: KeyboardEvent ): boolean => {
      this.showDeleteConfirmation();
      //this.openDeleteModal(this.deleteTemplate);
      return false; // Prevent bubbling
    } ) );

    //Back to Index
    this._crudService.hotkeys.add( new Hotkey( 'esc', ( event: KeyboardEvent ): boolean => {
      this._crudService.router.navigateByUrl( "/admin/employee/index" );
      return false; // Prevent bubbling
    } ) );
  }

}
