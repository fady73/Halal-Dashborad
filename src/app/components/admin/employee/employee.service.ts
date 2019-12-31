import { environment } from '../../../../environments/environment.prod';
import { ActivateViewModel } from '../../../shared/view-models/activate-view-model';
import { ApiService } from '../../../shared/services/api.service';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';
import { Injectable } from '@angular/core';
import { EmployeeCreateViewModel } from './employee-create.model';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { ChangeEmployeePassword } from 'src/app/shared/view-models/change-employee-password';


@Injectable( {
  providedIn: 'root'
} )
export class EmployeeService {

  controller: string = "Employee";
  constructor( private apiService: ApiService ) { }

  get( orderBy: string, isAscending: boolean, pageIndex: number ) {
    return this.apiService.get( `/${this.controller}/get?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${environment.pageSize}` );
  }
  getDivision(){
    return this.apiService.get(`/${this.controller}/GetDivisionsList`);
  }
 
  changeEmployeePassword(viewModel:ChangeEmployeePassword)
  {
    return this.apiService.post(`/user/ChangeUserPassword`,viewModel );
  }

  getList( branchID: number = 1 ) {
    return this.apiService.get( `/${this.controller}/GetList?branchID=${branchID}` )
  }

  GetAuditList( branchID: number = 1 ) {
    return this.apiService.get( `/${this.controller}/GetAuditList?branchID=${branchID}` )
  }

  changeActivationStatus( body: ActivateViewModel[] ) {
    return this.apiService.post( `/${this.controller}/ChangeActivationStatus`, body );
  }
  deleteAllSelected( body: number[] ) {
    return this.apiService.post( `/${this.controller}/RemoveAllSelected`, body );

  }
  postEntry( body ) {
    return this.apiService.update( `/entry/Put`, body )
  }
  removeAll( IDs: number[] ) {
    return this.apiService.post( `/${this.controller}/RemoveAllSelected`, IDs );
  }

  remove( Id: number ) {
    return this.apiService.remove( `/${this.controller}/delete/${Id}` );
  }
  getEditableById( Id: number ) {
    if ( Id == 0 ) {
      let resultViewModel: ResultViewModel = { Data: new EmployeeCreateViewModel(), Success: true, Message: '', IsAuthorized: true };
      return Observable.of( resultViewModel );
    }

    return this.apiService.get( `/${this.controller}/GetEditableByID?id=${Id}` );
  }
  GetByID( Id: number ) {
    if ( Id == 0 ) {
      let resultViewModel: ResultViewModel = { Data: new EmployeeCreateViewModel(), Success: true, Message: '', IsAuthorized: true };
      return Observable.of( resultViewModel );
    }

    return this.apiService.get( `/${this.controller}/GetByID?id=${Id}` );
  }
  getAccounts( id: number ) {
    return this.apiService.get( `/${this.controller}/GetEmployeeAccounts/${id}` );
  }
  getEmployeeAccountsWithBalance( id: number ) {
    return this.apiService.get( `/${this.controller}/GetEmployeeAccountsWithBalance/${id}` );
  }
  postOrUpdate( body: EmployeeCreateViewModel ) {
    if ( body.ID == 0 )
      return this.apiService.post( `/${this.controller}/Post`, body );
    else
      return this.apiService.update( `/${this.controller}/Put`, body );
  }
}
