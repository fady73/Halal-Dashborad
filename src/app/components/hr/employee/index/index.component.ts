import { ActivateViewModel } from './../../../../shared/view-models/activate-view-model';
import { AlertService } from 'src/app/components/alert/alert.service';
import { environment } from './../../../../../environments/environment.prod';
import { ColumnViewModel } from './../../../../shared/view-models/column-view-model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeViewModel } from '../Employee.model';

import { EmployeeService } from '../Employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name: string = "";
  brandId: number = -1;
  orderBy: string = "ID";
  isAscending: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  selectedAll: any;
  isPageLoaded: boolean = false;
  columns: ColumnViewModel[];
  items: EmployeeViewModel[] = [];
  options = { itemsPerPage: environment.pageSize, currentPage: 1, id: 'Pagination', totalItems: 0, totalPages: 0 }
  constructor(private alertService: AlertService,
    private _hotkeysService: HotkeysService,
    private EmployeeService: EmployeeService,
    private router:Router,
      private spinner: NgxSpinnerService) {
  
  }

  ngOnInit() {
    this.createNewHotKey();
 
    this.columns = [
    { Name: "Code", Title: "shared.code", Selectable: true, Sortable: true },
    { Name: "Name", Title: "shared.name", Selectable: true, Sortable: true },

    { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
  ];
    this.spinner.show();
    this.search(name, this.brandId, this.orderBy, this.isAscending, this.pageIndex, environment.pageSize);
  }
  createNewHotKey()
  {
    this._hotkeysService.add(new Hotkey('shift+n', (event: KeyboardEvent): boolean => {
      this.router.navigateByUrl("/hr/employee/create");
       return false; // Prevent bubbling
   }));
  }
  search(name: string, brandId: number, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number) {
    //alert("search page size : "+pageSize);
    this.EmployeeService.get(orderBy, isAscending, pageIndex, environment.pageSize).subscribe(response => {
      if (response.Success) {
        this.selectedAll = false;
        // setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        // this.isPageLoaded = true;
        // }, 5000);
        this.options.totalItems = response.Data.Records;
        this.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as EmployeeViewModel[];
      }

    });
  }
  OnSearchClicked() {
    this.options.currentPage = 1;
    this.search(this.name, this.brandId, "ID", this.isAscending, 1, environment.pageSize);
  }
  OnSortClicked(name) {
    this.options.currentPage = 1;

    if (name === this.orderBy) {
      this.isAscending = !this.isAscending;
    }
    else {
      this.isAscending = true;
    }
    this.orderBy = name;
    this.search(this.name, this.brandId, this.orderBy, this.isAscending, 1, environment.pageSize);
  }
  getNextPrevData(pageIndex) {
    this.search(this.name, this.brandId, this.orderBy, this.isAscending, pageIndex, environment.pageSize);
    this.options.currentPage = pageIndex;
  }

  isColumnSelected(column: string): number {
    return (column != this.orderBy) ? 0 : (this.isAscending ? 1 : 2);
  }
  remove(item: EmployeeViewModel) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.EmployeeService.remove(item.ID).subscribe(response => {
      let pageIndex: number = this.options.currentPage;
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

 
  changeActivationStatusForAll(isActive: boolean) {
    let activateViewModelList: ActivateViewModel[] = [];
    this.items.forEach(item => {
      if (item.IsSelected) {
        let activateViewModel: ActivateViewModel = new ActivateViewModel();
        activateViewModel.ID = item.ID;
        activateViewModel.IsActive = isActive
        activateViewModelList.push(activateViewModel);
      }
    });

    this.EmployeeService.changeActivationStatus(activateViewModelList).subscribe(response => {
      this.items.forEach(item => {
        if (item.IsSelected) {
          item.IsActive = isActive;
          item.IsSelected = false;
          this.selectedAll = false;
        }
      })
    }, error => {
      this.getNextPrevData(this.options.currentPage);
    });
  }

  deActivateStatusForAll(isActive: boolean) {

    let activateViewModelList: ActivateViewModel[] = [];
    this.items.forEach(item => {
      if (item.IsSelected) {
        let activateViewModel: ActivateViewModel = new ActivateViewModel();
        activateViewModel.ID = item.ID;
        activateViewModel.IsActive = false;
        activateViewModelList.push(activateViewModel);
      }
    });



    this.EmployeeService.changeActivationStatus(activateViewModelList).subscribe(response => {
      this.items.forEach(item => {
        if (item.IsSelected) {
          item.IsActive = false;
          item.IsSelected = false;
          this.selectedAll = false;
        }
      })
    }, error => {
      this.getNextPrevData(this.options.currentPage);
    });
  }


  changeActivationStatus(model: EmployeeViewModel) {
    model.IsActive = !model.IsActive;
    let activateViewModelList: ActivateViewModel[] = [];
    let activateViewModel: ActivateViewModel = new ActivateViewModel();
    activateViewModel.ID = model.ID;
    activateViewModel.IsActive = model.IsActive
    activateViewModelList.push(activateViewModel);

    this.EmployeeService.changeActivationStatus(activateViewModelList).subscribe(response => {
    }, error => { model.IsActive = !model.IsActive; });
  }
 

  selectAll() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].IsSelected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.items.every(function (item: any) {
      return item.selected == true;
    })
  }
}
