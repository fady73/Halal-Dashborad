import { ChangeEmployeePassword } from './../../../../shared/view-models/change-employee-password';
import { ColumnViewModel } from 'src/app/shared/view-models/column-view-model';
import { ActivateViewModel } from './../../../../shared/view-models/activate-view-model';
import { AlertService } from './../../../alert/alert.service';
import { ActionEnum } from './../../../admin/role/action-enum.enum';
import { PageEnum } from './../../../admin/role/page-enum.enum';
import { CrudService } from 'src/app/shared/services/crud.service';
import { CRUDIndexPage } from './../../../../shared/view-models/crud-index.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Hotkey } from 'angular2-hotkeys';
import { BsModalRef } from 'ngx-bootstrap';
import { EmployeeViewModel } from '../employee.model';
import { DivisionView } from '../division-view';
import { RoleAction } from '../../user/role-action.model';
import { RoleService } from '../../role/role.service';

@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  // styleUrls: ['./index.component.css']
} )
export class IndexComponent implements OnInit {
  page: CRUDIndexPage = new CRUDIndexPage();
  currentPage: PageEnum = PageEnum.Employee;
  items: EmployeeViewModel[] = [];
  actions: RoleAction[] = [];
  // division:DivisionView[]=[];

  selectedItem: EmployeeViewModel = new EmployeeViewModel();
  modalRef: BsModalRef;
  @ViewChild( 'deleteTemplate', { static: false } ) deleteTemplate: any;
  @ViewChild( 'changePasswordTemplate', { static: false } ) changePasswordTemplate: any;

  
  constructor( private alertService: AlertService,
    // private modalService: BsModalService,
    private crud: CrudService,
    private employeeService: EmployeeService,
    private _roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.registerHotKey();

    this.page.columns = [
      // { Name: "ID", Title: "shared.id", Selectable: true, Sortable: true },
      { Name: "FirstName", Title: "shared.name", Selectable: true, Sortable: true },
      { Name: "Phone", Title: "shared.phone", Selectable: true, Sortable: true },
      // { Name: "Division", Title: "shared.Division", Selectable: true, Sortable: true },
      { Name: "Email", Title: "shared.email", Selectable: false, Sortable: false },
      { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
    ];
    this._roleService.getPageActions( PageEnum.Employee ).subscribe( res => {
      this.actions = res.Data;
    } );

    this.search();
  }
  registerHotKey() {
    //New
    if ( this.canAdd() ) {
      this.crud.hotkeys.add( new Hotkey( 'shift+n', ( event: KeyboardEvent ): boolean => {
        this.crud.router.navigateByUrl( "/admin/employee/create" );
        return false; // Prevent bubbling
      } ) );
    }


    //Delete
    if ( this.canDelete() ) {
      this.crud.hotkeys.add( new Hotkey( 'shift+d', ( event: KeyboardEvent ): boolean => {
        this.showDeleteAllConfirmation()
        return false; // Prevent bubbling
      } ) );
    }


    //Activate All
    if ( this.canEdit() ) {
      this.crud.hotkeys.add( new Hotkey( 'shift+a', ( event: KeyboardEvent ): boolean => {
        this.changeActivationStatusForAll( true );
        return false; // Prevent bubbling
      } ) );
    }


    //Deactivate All
    if ( this.canEdit() ) {
      this.crud.hotkeys.add( new Hotkey( 'shift+x', ( event: KeyboardEvent ): boolean => {
        this.changeActivationStatusForAll( false );
        return false; // Prevent bubbling
      } ) );

    }

  }
  search() {
    this.page.isSearching = true;
    this.items = [];
    // this.employeeService.getDivision().subscribe(data=>{
    //   this.division=data.Data
    // })

    this.employeeService.get( this.page.orderBy, this.page.isAscending, this.page.options.currentPage ).subscribe( response => {
      this.page.isSearching = false;
      if ( response.Success ) {
        this.page.isAllSelected = false;
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as EmployeeViewModel[];
        this.items.forEach( x => {
          x.IsSelected = false;
          //  x.DivisionName=this.division[x.Division].Name;
        } );
      }

    } );

  }
  onSearchClicked() {
    this.page.options.currentPage = 1;
    this.page.orderBy = "ID";
    this.page.isAscending = false;
    this.search();
  }
  canAdd(): boolean {
    return this.crud.userService.isUserHasRoleAction( this.currentPage, ActionEnum.POST );
  }
  canEdit(): boolean {
    return this.crud.userService.isUserHasRoleAction( this.currentPage, ActionEnum.PUT );
  }
  canDelete(): boolean {
    return this.crud.userService.isUserHasRoleAction( this.currentPage, ActionEnum.DELETE );
  }
  onSortClicked( column: ColumnViewModel ) {
    // alert( column )
    if ( !column.Sortable )
      return;
    let name = column.Name;
    if ( name === this.page.orderBy ) {
      this.page.isAscending = !this.page.isAscending;
    }
    else {
      this.page.isAscending = true;
    }
    this.page.orderBy = name;

    this.page.options.currentPage = 1;
    this.search();
  }
  getNextPrevData( pageIndex ) {
    this.page.options.currentPage = pageIndex;
    this.search();

  }

  isColumnSelected( column: string ): number {
    return ( column != this.page.orderBy ) ? 0 : ( this.page.isAscending ? 1 : 2 );
  }
  showDeleteConfirmation( selectedItem: EmployeeViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.deleteTemplate, { class: 'modal-sm' } );
  }
  showDeleteAllConfirmation() {
    this.selectedItem = null;
    this.modalRef = this.crud.modalService.show( this.deleteTemplate, { class: 'modal-sm' } );
  }
  showChangePasswordConfirmation(index:number) {
    this.selectedItem = this.items[index];
    this.selectedItem.Password="";
    this.modalRef = this.crud.modalService.show( this.changePasswordTemplate, { class: 'modal-sm' } );
  }
  changePassword(password:string){
    if(password!=null && password!="" && password.length>=6)
    {
      let passwordViewModel=new ChangeEmployeePassword();
      passwordViewModel.UserID=this.selectedItem.ID;
      passwordViewModel.Password=password;
      this.employeeService.changeEmployeePassword(passwordViewModel).subscribe(response=>{
        if(response.Success)
            this.alertService.success(response.Message);
        else
        this.alertService.error(response.Message);
      });

    }
    else{
      if (localStorage.getItem("lang")=="en") {
        this.alertService.error("error password must be 6 characters");

      }
      else{
        this.alertService.error("حدث خطا ما كلمه المرور يجب ان تكون من 6 حروف");

      }

    }
  }
  remove() {
    if ( !this.canDelete() )
      return;

    this.selectedItem.IsDeleting = true;
    this.employeeService.remove( this.selectedItem.ID ).subscribe( response => {
      this.selectedItem.IsDeleting = false;
      if ( response.Success ) {
        let index = this.items.indexOf( this.selectedItem );
        this.items.splice( index, 1 );
        let pageIndex: number = this.page.options.currentPage;
        if ( this.items.length == 0 ) {
          pageIndex = pageIndex > 1 ? --pageIndex : 1;
          this.alertService.success( response.Message );
        }

      }

    },
      error => {
        //this.items.splice(index, 0, this.selectedItem);
        this.alertService.error( "حدث خطأ اثناء عملية الحذف" )
      },
      () => { }

    );
  }
  removeAll() {
    if ( !this.canDelete() )
      return;

    let IDs: number[] = [];
    this.items.filter( x => x.IsSelected ).forEach( x => {
      x.IsDeleting = true;
      IDs.push( x.ID );
    } );
    if ( IDs && IDs.length > 0 ) {
      this.employeeService.removeAll( IDs ).subscribe( response => {
        if ( response.Success ) {
          this.crud.alert.success( response.Message );
          this.page.options.currentPage = 1;
          this.search();
        }

        else
          this.crud.alert.error( response.Message );

      } );
    }

  }

  changeActivationStatusForAll( isActive: boolean ) {
    //  alert("changeActivationStatusForAll");
    let activateViewModelList: ActivateViewModel[] = [];
    this.items.forEach( item => {
      if ( item.IsSelected && item.IsActive != isActive ) {
        let activateViewModel: ActivateViewModel = new ActivateViewModel();
        activateViewModel.ID = item.ID;
        activateViewModel.IsActive = isActive
        activateViewModelList.push( activateViewModel );
      }
    } );
    if ( activateViewModelList.length == 0 )
      return;
    this.employeeService.changeActivationStatus( activateViewModelList ).subscribe( response => {
      if ( response.Success )
        this.alertService.success( response.Message );
      this.items.forEach( item => {
        if ( item.IsSelected ) {
          item.IsActive = isActive;
          // item.IsSelected = false;
          // this.page.isAllSelected = false;
        }

      } )
    }, error => {
      this.getNextPrevData( this.page.options.currentPage );
    } );
  }

  changeActivationStatus( model: EmployeeViewModel ) {
    model.IsActive = !model.IsActive;
    let activateViewModelList: ActivateViewModel[] = [];
    let activateViewModel: ActivateViewModel = new ActivateViewModel();
    activateViewModel.ID = model.ID;
    activateViewModel.IsActive = model.IsActive
    activateViewModelList.push( activateViewModel );

    this.employeeService.changeActivationStatus( activateViewModelList ).subscribe( response => {
    }, error => { model.IsActive = !model.IsActive; } );
  }


  selectAll() {

    this.page.isAllSelected = !this.page.isAllSelected;
    this.items.forEach( item => {
      item.IsSelected = this.page.isAllSelected
    } );

  }

}
