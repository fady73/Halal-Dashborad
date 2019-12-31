import { ActionEnum } from './action-enum.enum';
import { ResultViewModel } from './../../../shared/view-models/result-view-models';
import { ActivateViewModel } from './../../../shared/view-models/activate-view-model';

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { RoleCreateViewModel } from './role-create';
import { Observable } from 'rxjs';
import { PageEnum } from './page-enum.enum';
import { RoleAction } from '../user/role-action.model';

@Injectable( {
  providedIn: 'root'
} )
export class RoleService {

  constructor( private apiService: ApiService ) { }

  get( orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number ) {
    return this.apiService.get( `/Role/get?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}` )
  }

  getPagesWithActions() {
    return this.apiService.get( `/Role/GetPagesWithActions` );
  }
isUserHasAction(actions:RoleAction[],action:ActionEnum){
 return actions.some(a=>a.Action==action);
}
  getList() {
    return this.apiService.get( `/Role/GetList` );
  }
  getPageActions(page:PageEnum) {
    return this.apiService.get(`/user/GetLoggedUserAllowedActions?pageID=${page}`);
  }
  getRoleList() {
    return this.apiService.get( `/user/getroleslist` );

  }

  changeActivationStatus( body: ActivateViewModel[] ) {
    return this.apiService.post( '/Role/ChangeActivationStatus', body );
  }
  deleteAllSelected( body: number[] ) {
    return this.apiService.post( '/Role/RemoveAllSelected', body );

  }
  postEntry( body ) {
    return this.apiService.update( `/entry/Put`, body )
  }


  remove( Id: number ) {
    return this.apiService.remove( `/Role/delete/${Id}` );
  }

  getEditableById( Id: number ) {
    if ( Id == 0 ) {
      let resultViewModel: ResultViewModel = { Data: new RoleCreateViewModel(), Success: true, Message: '', IsAuthorized: true };
      return Observable.of( resultViewModel );
    }
    return this.apiService.get( `/role/GetEditableByID?id=${Id}` );
  }

  // getEditableById( Id: number ) {
  //   return this.apiService.get( `/role/GetEditableByID?id=${Id}` );
  // }
  getAccounts( id: number ) {
    return this.apiService.get( `/role/GetRoleAccounts/${id}` );
  }
  getRoleAccountsWithBalance( id: number ) {
    return this.apiService.get( `/role/GetRoleAccountsWithBalance/${id}` );
  }
  postOrUpdate( body: RoleCreateViewModel ) {
    if ( body.ID == 0 )
      return this.apiService.post( '/role/Post', body );
    else
      return this.apiService.update( '/role/Put', body );
  }
  getCurrencies() {

    return this.apiService.get( `/Role/GetList` );

  }


}
