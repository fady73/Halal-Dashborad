import { ActivateViewModel } from './../../../shared/view-models/activate-view-model';
import { ApiService } from './../../../shared/services/api.service';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { Injectable } from '@angular/core';
import { JobCreateViewModel } from './job-create.model';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  controller : string = "Job";
  constructor(private apiService:ApiService) { }
  
  get(orderBy:string, isAscending:boolean, pageIndex:number, pageSize:number){
    return this.apiService.get(`/${this.controller}/get?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

 

  getList(branchID:number=1){
    return this.apiService.get(`/${this.controller}/GetList?branchID=${branchID}`)
  }
  
  changeActivationStatus(body: ActivateViewModel[]) {
    return this.apiService.post(`/${this.controller}/ChangeActivationStatus`,body);
}
deleteAllSelected(body : number[]){
  return this.apiService.post(`/${this.controller}/RemoveAllSelected`,body);
  
}
postEntry(body){
  return this.apiService.update(`/entry/Put`,body)
}
removeAll(IDs: number[]){
  return this.apiService.post(`/${this.controller}/RemoveAllSelected`,IDs);
}

  remove(Id:number){
    return this.apiService.remove(`/${this.controller}/delete/${Id}`);
  }
  getEditableById(Id:number){
    if(Id==0)
    {
      let resultViewModel:ResultViewModel={Data:new JobCreateViewModel(),Success:true,Message:'',IsAuthorized:true}; 
      return Observable.of(resultViewModel);
    }
    
    return this.apiService.get(`/${this.controller}/GetEditableByID?id=${Id}`);
  }
  getAccounts(id:number)
  {
    return this.apiService.get(`/${this.controller}/GetJobAccounts/${id}`);
  }
  getJobAccountsWithBalance(id:number)
  {
    return this.apiService.get(`/${this.controller}/GetJobAccountsWithBalance/${id}`);
  }
  postOrUpdate(body: JobCreateViewModel) {
    if(body.ID==0)
        return this.apiService.post(`/${this.controller}/Post`,body);
     else
        return this.apiService.update(`/${this.controller}/Put`,body);
      }
}
