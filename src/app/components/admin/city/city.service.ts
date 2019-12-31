import { ActivateViewModel } from './../../../shared/view-models/activate-view-model';
import { ResultViewModel } from '../../../shared/view-models/result-view-models';

import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CityCreateViewModel } from './city-create';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable( {
  providedIn: 'root'
} )
export class CityService {
  controller: string = "Country";
  constructor( private apiService: ApiService ) { }

  get( orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number ) {
    return this.apiService.get( `/${this.controller}/get?orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=${pageSize}` );
  }



  getList() {
    return this.apiService.get( `/Country/GetList` );
  }

  changeActivationStatus( body: ActivateViewModel[] ) {
    return this.apiService.post( '/Country/ChangeActivationStatus', body );
  }
  deleteAllSelected( body: number[] ) {
    return this.apiService.post( '/Country/RemoveAllSelected', body );

  }
  postEntry( body ) {
    return this.apiService.update( `/entry/Put`, body )
  }


  remove( Id: number ) {
    return this.apiService.remove( `/Country/delete/${Id}` );
  }
  getEditableById( Id: number ) {
    if ( Id == 0 ) {
      let resultViewModel: ResultViewModel = { Data: new CityCreateViewModel(), Success: true, Message: '', IsAuthorized: true };
      return Observable.of( resultViewModel );
    }

    return this.apiService.get( `/Country/GetEditableByID?id=${Id}` );
  }
  getAccounts( id: number ) {
    return this.apiService.get( `/Country/GetCityAccounts/${id}` );
  }
  getCityAccountsWithBalance( id: number ) {
    return this.apiService.get( `/Country/GetCityAccountsWithBalance/${id}` );
  }
  postOrUpdate( body: CityCreateViewModel ) {
    if ( body.ID == 0 )
      return this.apiService.post( '/Country/Post', body );
    else
      return this.apiService.update( '/Country/Put', body );
  }
  getCurrencies() {

    return this.apiService.get( `/Country/GetList` );

  }

  removeAll( IDs: number[] ) {
    return this.apiService.post( `/Country/RemoveAllSelected`, IDs );
  }


}
