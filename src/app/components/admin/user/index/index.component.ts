import { ActivateViewModel } from './../../../../shared/view-models/activate-view-model';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Page } from 'src/app/shared/view-models/page.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'; //.format('YYYY-MM-DDTHH:mm:ss')
import { UserViewModel } from '../user.model';
import { UserSearchViewModel } from '../user-search.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page:Page=new Page();
  searchViewModel:UserSearchViewModel=new UserSearchViewModel();
  items: UserViewModel[] = [];
  constructor(
    private _formBuilder:FormBuilder,
    private alertService: AlertService,
     private userService: UserService,
      private spinner: NgxSpinnerService) {
    
  }

  ngOnInit() {
    this.spinner.show();
    this.page.columns = [
      { Name: "Name", Title: "shared.name", Selectable: true, Sortable: true },
      { Name: "Mobile", Title: "shared.mobile", Selectable: true, Sortable: true  },
      { Name: "Email", Title: "shared.email", Selectable: true, Sortable: true  },
      { Name: "IsActive", Title: "shared.status", Selectable: true, Sortable: true },
    ];
    this.createSearchForm();
    this.search();
  }
  createSearchForm()
  {
    this.searchViewModel.ToDate=new Date();
    this.searchViewModel.FromDate.setDate((new Date()).getDate()-30);
    this.page.seachForm=this._formBuilder.group({
      ID:[this.searchViewModel.ID],
      Name:[this.searchViewModel.Name],
      FromDate:[moment(this.searchViewModel.FromDate).format('MM-DD-YYYY')],
      ToDate:[moment(this.searchViewModel.ToDate).format('MM-DD-YYYY')],
      Mobile:[this.searchViewModel.Mobile],
      NID:[this.searchViewModel.NID]
    });
  }
  onSearchClicked()
  {
    Object.assign(this.searchViewModel,this.page.seachForm.value);
    this.search();
  }
  search(orderBy: string="ID", isAscending: boolean=false, pageIndex: number=1) {
    this.userService.get(this.searchViewModel, orderBy, isAscending, pageIndex).subscribe(response => {
      if (response.Success) {
        
        this.page.options.totalItems = response.Data.Records;
        this.page.options.totalPages = response.Data.Pages;
        this.items = response.Data.Result as UserViewModel[];
      }

    },null,()=>{
      this.page.selectedAll = false;
        this.spinner.hide();
        this.page.isPageLoaded=true;
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
  remove(item: UserViewModel) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.userService.remove(item.ID).subscribe(response => {
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

    this.userService.changeActivationStatus(activateViewModelList).subscribe(response => {
      this.items.forEach(item => {
        if (item.IsSelected) {
          item.IsActive = isActive;
          item.IsSelected = false;
          this.page.selectedAll = false;
        }
      })
    }, error => {
      this.getNextPrevData(this.page.options.currentPage);
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



    this.userService.changeActivationStatus(activateViewModelList).subscribe(response => {
      this.items.forEach(item => {
        if (item.IsSelected) {
          item.IsActive = false;
          item.IsSelected = false;
          this.page.selectedAll = false;
        }
      })
    }, error => {
      this.getNextPrevData(this.page.options.currentPage);
    });
  }


  deleteAllSelected(isActive: boolean) {

    let activateViewModelList: ActivateViewModel[] = [];
    this.items.forEach(item => {
      if (item.IsSelected) {
        let activateViewModel: ActivateViewModel = new ActivateViewModel();
        activateViewModel.ID = item.ID;
        activateViewModel.IsActive = true;
        activateViewModelList.push(activateViewModel);
      }
    });
    this.userService.deleteAllSelected(activateViewModelList).subscribe(response => {
      this.search(this.page.orderBy, this.page.isAscending, 1);

    }, error => {
      this.getNextPrevData(this.page.options.currentPage);
    });
  }
  changeActivationStatus(model: UserViewModel) {
    model.IsActive = !model.IsActive;
    let activateViewModelList: ActivateViewModel[] = [];
    let activateViewModel: ActivateViewModel = new ActivateViewModel();
    activateViewModel.ID = model.ID;
    activateViewModel.IsActive = model.IsActive
    activateViewModelList.push(activateViewModel);

    this.userService.changeActivationStatus(activateViewModelList).subscribe(response => {
    }, error => { model.IsActive = !model.IsActive; });
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
}
