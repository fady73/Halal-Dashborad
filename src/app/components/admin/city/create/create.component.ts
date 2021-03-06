import { BranchService } from './../../../admin/branch/branch.service';
import { CRUDCreatePage } from './../../../../shared/view-models/crud-create.model';
import { Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { CityService } from '../city.service';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { Hotkey } from 'angular2-hotkeys';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CityCreateViewModel } from '../city-create';


@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  // styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
  branches: SelectItem[] = [];
  modalRef: BsModalRef;
  @ViewChild( 'deleteTemplate', { static: false } ) deleteTemplate: any;
  model: CityCreateViewModel = new CityCreateViewModel();
  constructor(
    private _crudService: CrudService,
    private _cityService: CityService,
    //private _branchService: BranchService,
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
        this._cityService.getEditableById( this.model.ID ),
        //this._branchService.getList(),

      ] ).subscribe( res => {
        this.model = res[0].Data;
        //this.branches=res[1].Data;
        if ( !this.page.isEdit && this.branches && this.branches.length > 0 )
          this.model.BranchID = this.branches[0].ID;

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
    this._cityService.remove( this.model.ID ).subscribe( res => {
      if ( res.Success ) {
        this._crudService.alert.success( res.Message );
        this._crudService.router.navigateByUrl( "/admin/country/index" );
      }

      if ( !res.Success )
        this._crudService.alert.error( res.Message );
    } );

  }


  createForm(): void {
    this.page.form = this._crudService.formBuilder.group( {
      Code: [this.model.Code, [Validators.maxLength( 100 )]],
      //BranchID: [this.model.BranchID,[Validators.required]],
      NameArabic: [this.model.NameArabic, [Validators.required, Validators.maxLength( 100 )]],
      NameEnglish: [this.model.NameEnglish, [Validators.required, Validators.maxLength( 100 )]],
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
    Object.assign( this.model, this.page.form.value ) as CityCreateViewModel;
    this._cityService.postOrUpdate( this.model ).subscribe( response => {
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if ( response.Success ) {
        if ( this.model.ID == 0 ) {
          this.model = new CityCreateViewModel();
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
      this._crudService.router.navigateByUrl( "/admin/country/create" );
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
      this._crudService.router.navigateByUrl( "/admin/country/index" );
      return false; // Prevent bubbling
    } ) );
  }

}
