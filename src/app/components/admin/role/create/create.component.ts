import { CrudService } from 'src/app/shared/services/crud.service';
import { CRUDCreatePage } from './../../../../shared/view-models/crud-create.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResultViewModel } from 'src/app/shared/view-models/result-view-models';
import { SelectItem } from 'src/app/shared/view-models/select-view-model';
import { forkJoin } from 'rxjs';
import { RoleActionViewModel } from '../role-action.model';
import { RoleCreateViewModel } from '../role-create';
import { RoleService } from '../role.service';
import { RolePageViewModel } from '../role-page-model';


@Component( {
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {

  form: FormGroup;
  isUploading: boolean = false;
  isEdit: boolean = false;
  isSaving: boolean = false;
  resultViewModel: ResultViewModel;
  isPageLoaded: boolean = false;
  pages: RolePageViewModel[] = [];
  page: CRUDCreatePage = new CRUDCreatePage();
  roleAccount: RoleActionViewModel = new RoleActionViewModel();
  model: RoleCreateViewModel = new RoleCreateViewModel();
  constructor( private formBuilder: FormBuilder,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    private _crudService: CrudService,
    private _alertService: AlertService
  ) {
    ( 1 );
  }

  ngOnInit() {
    this.initializePage();
  }

  initializePage(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      if ( params.has( 'id' ) ) {
        this.model.ID = +params.get( "id" );
        this.page.isEdit = this.model.ID > 0;
      }

      forkJoin( [
        this.roleService.getEditableById( this.model.ID ),
        this.roleService.getPagesWithActions()
        //this._branchService.getList(),

      ] ).subscribe( res => {
        this.model = res[0].Data;
        this.pages = res[1].Data;
        this.pages.forEach( page => page.Actions.forEach( action => {
          action.IsSelected = false;
        } ) )

        this.model.Actions.forEach( selectedAction => {
          this.pages.forEach( page => {
            page.Actions.forEach( action => {
              if ( action.PageID == selectedAction.PageID && action.ActionID == selectedAction.ActionID ) {
                //alert(1);
                action.IsSelected = true;
              }
            } );
          } );
        } );


        this.createForm();
        this.page.isPageLoaded = true;
      }
      );

    } );

  }

  pageSelectAll( id: number ) {

    let selectedPage: RolePageViewModel = this.pages.find( x => x.ID == id );
    selectedPage.IsSelected = !selectedPage.IsSelected;

    selectedPage.Actions.forEach( action => {
      action.IsSelected = selectedPage.IsSelected;
    } );

  }

  disabledAddAccount() {
    return false;
  }
  addAccount() {
    let account: RoleActionViewModel = new RoleActionViewModel();
    Object.assign( account, this.roleAccount );
    this.model.Actions.push( account );
  }
  removeAccount( index: number ) {
    this.model.Actions.splice( index, 1 );
  }
  getByID( id: number ) {
    // this._spinner.show();
    this.isPageLoaded = false;
    this.roleService.getEditableById( id ).subscribe( response => {
      if ( response.Success ) {
        // this._spinner.hide();
        this.model = response.Data;
        this.model.Actions.forEach( selectedAction => {
          this.pages.forEach( page => {
            page.Actions.forEach( action => {
              if ( action.PageID == selectedAction.PageID && action.ActionID == selectedAction.ActionID ) {
                //alert(1);
                action.IsSelected = true;
              }
            } );
          } );
        } );
        this.isPageLoaded = true;
        this.createForm();
      }
    } );
  }
  createForm() {
    // alert( "Success" );
    this.page.form = this.formBuilder.group( {
      NameArabic: [this.model.NameArabic, [Validators.required, Validators.maxLength( 100 )]],
      // NameEnglish: [this.model.NameEnglish, [Validators.required,  Validators.maxLength(100)]],
      //Symbol: [this.model.Symbol, [Validators.required,  Validators.maxLength(100)]],
      //BuyExchangeRate: [this.model.BuyExchangeRate, [Validators.required]],
      //SellExchangeRate: [this.model.SellExchangeRate, [Validators.required]],
      IsActive: [this.model.IsActive]
    } )
  }

  disabledSubmit() {
    return this.page.isSaving || this.page.isUploading || !this.page.form.valid;
  }
  save() {
    this.page.isSaving = true;
    let model = Object.assign( {}, this.model, this.page.form.value ) as RoleCreateViewModel;
    this.model = model;
    this.model.NameEnglish = this.model.NameArabic;
    // this.model.RedirectUrl="";
    this.model.Actions = [];
    this.pages.forEach( page => {
      page.Actions.filter( action => action.IsSelected ).forEach( action => {
        let newAction: RoleActionViewModel = new RoleActionViewModel();
        newAction.PageID = page.ID;
        newAction.ActionID = action.ActionID;
        newAction.RoleID = this.model.ID
        this.model.Actions.push( newAction );
      } );
    } );


    this.roleService.postOrUpdate( this.model ).subscribe( response => {
      //this.createNotify(response.Message,response.Success);
      // this.isSaving = false;
      // this.resultViewModel = response;
      this.page.isSaving = false;
      this.page.resultViewModel = response;
      if ( response.Success ) {
        // alert( this.model.ID )
        if ( this.model.ID == 0 ) {
          this.createForm();
          this.model.Actions = [];
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

  get icon() {
    return this.form.controls["Symbol"];
  }
  get buyExchangeRate() {
    return this.form.controls["BuyExchangeRate"];
  }
  get sellExchangeRate() {
    return this.form.controls["SellExchangeRate"];
  }


}
