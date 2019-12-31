import { ActivateViewModel } from './../../../shared/view-models/activate-view-model';
import { ApiService } from './../../../shared/services/api.service';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { EmployeeCreateViewModel } from './Employee-create';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService:ApiService) { }
  
  get(orderBy:string, isAscending:boolean, pageIndex:number, pageSize:number){
    return this.apiService.get(`/Employee/get`)
  }

 

  getList(){
    return this.apiService.get(`/Employee/GetList`)
  }
  
  changeActivationStatus(body: ActivateViewModel[]) {
    return this.apiService.post('/Employee/ChangeActivationStatus',body);
}
deleteAllSelected(body : number[]){
  return this.apiService.post('/Employee/RemoveAllSelected',body);
  
}
postEntry(body){
  return this.apiService.update(`/entry/Put`,body)
}


  remove(Id:number){
    return this.apiService.remove(`/Employee/delete/${Id}`);
  }
  getEditableById(Id:number){
    if(Id==0)
    {
      let resultViewModel:ResultViewModel={Data:new EmployeeCreateViewModel(),Success:true,Message:'',IsAuthorized:true}; 
      return Observable.of(resultViewModel);
    }
    
    return this.apiService.get(`/Employee/GetEditableByID?id=${Id}`);
  }
  getAccounts(id:number)
  {
    return this.apiService.get(`/Employee/GetEmployeeAccounts/${id}`);
  }
  getEmployeeAccountsWithBalance(id:number)
  {
    return this.apiService.get(`/Employee/GetEmployeeAccountsWithBalance/${id}`);
  }
  postOrUpdate(body: EmployeeCreateViewModel) {
    //debugger;
    if(body.ID==0)
        return this.apiService.post('/Employee/Post',body);
     else
        return this.apiService.update('/Employee/Put',body);
      }
  getCurrencies(){
    
    return this.apiService.get(`/Employee/GetList`);
    
  }
 
 
}
