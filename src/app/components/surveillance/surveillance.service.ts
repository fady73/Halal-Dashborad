import { ResultViewModel } from './../../shared/view-models/result-view-models';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveillanceCreateViewModel } from './surveillance-create.model';
import { SurveillanceViewModel } from './surveillance.model';
import { SurveillanceSearchViewModel } from './surveillance-search.model';


@Injectable( {
  providedIn: 'root'
} )
export class SurveillanceService {

  controller = 'SurveillanceAgreement';
  constructor( private apiService: ApiService ) { }


  get( forStaff: boolean = true, searchViewModel: SurveillanceSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}&orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=environment.pageSize` );
    return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}` );
  }


  getById( Id: number ) {
    return this.apiService.get( `/${this.controller}/GetByID/${Id}` );
  }

  getByRequestID( RequestID: number ) {
    return this.apiService.get( `/${this.controller}/getByRequestID?RequestID=${RequestID}` );
  }
  postOrUpdate( body: SurveillanceCreateViewModel ) {
    return this.apiService.post( `/${this.controller}/Post`, body );
  }

  approved( item: SurveillanceViewModel ) {
    return this.apiService.post( `/${this.controller}/ConfirmAgreement?agreementID=${item.ID}`, item );
  }

}


