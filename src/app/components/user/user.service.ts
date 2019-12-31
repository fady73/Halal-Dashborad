import { ChangePasswordViewModel } from './change-password/change-password.model';
import { ActionEnum } from './../admin/role/action-enum.enum';
import { PageEnum } from './../admin/role/page-enum.enum';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { LoginViewModel } from './login/models/login.model';
import { RoleActionViewModel } from '../admin/role/role-action.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }
  isUserHasRoleAction(pageID:PageEnum,actionID:ActionEnum):boolean
  {
    return true;
    return this.getUserActions().some(action=>action.PageID==pageID && action.ActionID==actionID);
  }
  getUserActions():RoleActionViewModel[]
{
 return JSON.parse(localStorage.getItem("Roles")) as RoleActionViewModel[] ;
}
setUserActions(actions:RoleActionViewModel[])
{
  localStorage.setItem("Roles",JSON.stringify(actions));
}
removeUserActions()
{
  localStorage.removeItem("Roles");
}
signOut() {
  this.removeUserActions();
  return this.apiService.get(`/User/SignOut`);
}
changePassword(viewModel:ChangePasswordViewModel)
{
  return this.apiService.post(`/User/ChangePassword`,viewModel);

}
  
}
