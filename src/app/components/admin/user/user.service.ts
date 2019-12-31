import { Page } from 'src/app/shared/view-models/page.model';
import { environment } from './../../../../environments/environment.prod';
import { ActivateViewModel } from './../../../shared/view-models/activate-view-model';
import { ActionEnum } from './../role/action-enum.enum';
import { PageEnum } from './../role/page-enum.enum';

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

import { UserSearchViewModel } from './user-search.model';
import { UserCreateViewModel } from './user-create';
import { LoginViewModel } from '../../user/login/models/login.model';
import { RoleActionViewModel } from '../role/role-action.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }
  get(searchViewModel:UserSearchViewModel,orderBy:string, isAscending:boolean, pageIndex:number){
    return this.apiService.get(`/User/get?name=${searchViewModel.Name}&mobile=${searchViewModel.Mobile}&nid=${searchViewModel.NID}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}`);
  }
  
  changeActivationStatus(body: ActivateViewModel[]) {
    return this.apiService.post('/User/ChangeActivationStatus',body);
}
deleteAllSelected(body : ActivateViewModel[]){
  return this.apiService.post('/User/RemoveAllSelected',body);
  
}
setUserActions(actions:RoleActionViewModel[])
{
  localStorage.setItem("Roles",JSON.stringify(actions));
}
removeUserActions()
{
  localStorage.removeItem("Roles");
}
getUserActions():RoleActionViewModel[]
{
 return JSON.parse(localStorage.getItem("Roles")) as RoleActionViewModel[] ;
}
testRole():boolean
{
  return true
}
isUserHasRoleAction(pageID:PageEnum,actionID:ActionEnum):boolean
{
  return this.getUserActions().some(action=>action.PageID==pageID && action.ActionID==actionID);
}

signOut() {
  this.removeUserActions();
  localStorage.removeItem("userToken");

  return this.apiService.get(`/User/SignOut`);
}
login(model:LoginViewModel){
  return this.apiService.post(`/User/login`,model);

}

  postOrUpdate(body: UserCreateViewModel) {
if(body.ID==0)
    return this.apiService.post('/User/Post',body);
 else
    return this.apiService.update('/User/Put',body);
  }
  upload(body: Object) {
    return this.apiService.upload('/Upload/Upload',body);
  }
  remove(Id:number){
    return this.apiService.remove(`/User/delete/${Id}`);
  }
  
  getLoggedUserDetails(){
    return this.apiService.get(`/User/getLoggedUserDetails`);
  }
  getUserModules(){
    return this.apiService.get(`/User/GetUserModules`);
  }
  getUserRoles(Id:number){
    return this.apiService.get(`/User/GetUserRoles/${Id}`);
  }
  getById(Id:number){
    return this.apiService.get(`/User/getById/${Id}`);
  }
  getEditableById(Id:number){
    return this.apiService.get(`/User/GetEditableById/${Id}`);
  }
  
  getList(){
    return this.apiService.get(`/User/getList`);
  }
  
  
 
}


