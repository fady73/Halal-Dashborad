import { CrudService } from 'src/app/shared/services/crud.service';
import { CRUDIndexPage } from './../../../../shared/view-models/crud-index.model';
import { ActivateViewModel } from './../../../../shared/view-models/activate-view-model';
import { environment } from './../../../../../environments/environment.prod';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ColumnViewModel } from 'src/app/shared/view-models/column-view-model';

import { NgxSpinnerService } from 'ngx-spinner';
import { RoleViewModel } from '../role.model';
import { RoleService } from '../role.service';
import { PageEnum } from '../page-enum.enum';
import { BsModalRef } from 'ngx-bootstrap';
import { ActionEnum } from '../action-enum.enum';

@Component( {
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
} )
export class IndexComponent implements OnInit {
  name: string = "";
  brandId: number = -1;
  page: CRUDIndexPage = new CRUDIndexPage();
  currentPage: PageEnum = PageEnum.Role;
  selectedAll: any;
  items: RoleViewModel[] = [];
  modalRef: BsModalRef;
  selectedItem: RoleViewModel = new RoleViewModel();
  @ViewChild( 'deleteTemplate', { static: false } ) deleteTemplate: any;

  options = { itemsPerPage: environment.pageSize, currentPage: 1, id: 'Pagination', totalItems: 0, totalPages: 0 }
  constructor( private alertService: AlertService,
    private roleService: RoleService,
    private _notificationsService: NotificationsService,
    private crud: CrudService,
  ) {
    this.page.columns = [
      { Name: "Name", Title: "shared.name", Selectable: true, Sortable: true },
      { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
    ];
  }

  ngOnInit() {
    this.search();
  }
  search() {
    this.page.isSearching = true;
    this.roleService.get( this.page.orderBy, this.page.isAscending, this.page.options.currentPage, environment.pageSize ).subscribe( response => {
      this.page.isSearching = false;
      if ( response.Success ) {
        this.page.isAllSelected = false;
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as RoleViewModel[];
        this.items.forEach( x => x.IsSelected = false );
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
  onSortClicked( name ) {

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
  showDeleteConfirmation( selectedItem: RoleViewModel ) {
    this.selectedItem = selectedItem;
    this.modalRef = this.crud.modalService.show( this.deleteTemplate, { class: 'modal-sm' } );
  }
  showDeleteAllConfirmation() {
    this.selectedItem = null;
    this.modalRef = this.crud.modalService.show( this.deleteTemplate, { class: 'modal-sm' } );
  }
  remove() {
    if ( !this.canDelete() )
      return;

    this.selectedItem.IsDeleting = true;
    this.roleService.remove( this.selectedItem.ID ).subscribe( response => {
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
    this.roleService.changeActivationStatus( activateViewModelList ).subscribe( response => {
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

  changeActivationStatus( model: RoleViewModel ) {
    model.IsActive = !model.IsActive;
    let activateViewModelList: ActivateViewModel[] = [];
    let activateViewModel: ActivateViewModel = new ActivateViewModel();
    activateViewModel.ID = model.ID;
    activateViewModel.IsActive = model.IsActive
    activateViewModelList.push( activateViewModel );

    this.roleService.changeActivationStatus( activateViewModelList ).subscribe( response => {
    }, error => { model.IsActive = !model.IsActive; } );
  }


  selectAll() {

    this.page.isAllSelected = !this.page.isAllSelected;
    this.items.forEach( item => {
      item.IsSelected = this.page.isAllSelected
    } );

  }

}
