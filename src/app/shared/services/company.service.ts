import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
} )
export class CompanyService {

  controller = 'company';
  constructor( private _apiService: ApiService ) { }
  getList() {
    return this._apiService.get( `/${this.controller}/getList` );
  }
  getLoggedCompany() {
    return this._apiService.get( `/${this.controller}/GetLoggedCompany` );
  }
  getCompanyUserName() {
    return this._apiService.get( `/${this.controller}/getCompanyUserName` );
  }

  getCompanyName() {
    return this._apiService.get( `/${this.controller}/getCompanyName` );
  }
  getLoggedConsumerCopmany() {
    return this._apiService.get( `/${this.controller}/GetLoggedConsumerCopmany` );
  }
  getTypes() {
    return this._apiService.get( `/${this.controller}/GetTypes` );
  }
}
