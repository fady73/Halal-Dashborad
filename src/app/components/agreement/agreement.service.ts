import { ResultViewModel } from './../../shared/view-models/result-view-models';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { AgreementCreateViewModel } from './agreement-create.model';
import { Observable } from 'rxjs';
import { AgreementSearchViewModel } from './agreement-search.model';
import { AgreementUploadViewModel } from './agreement-upload.model';
import { AgreementViewModel } from './agreement.model';
import { AgreementCancelViewModel } from './agreement-cancel.model';

@Injectable( {
  providedIn: 'root'
} )
export class AgreementService {

  controller = 'ServiceAgreement';
  constructor( private apiService: ApiService ) { }


  get( forStaff: boolean = true, searchViewModel: AgreementSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}&orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=environment.pageSize` );
    return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}` );
  }


  getById( Id: number ) {
    // if ( Id == 0 ) {
    //   let resultViewModel: ResultViewModel = { Data: new AgreementCreateViewModel(), Success: true, Message: '', IsAuthorized: true };
    //   return Observable.of( resultViewModel );
    // }
    return this.apiService.get( `/${this.controller}/GetByID/${Id}` );
  }

  getByRequestID( RequestID: number ) {
    return this.apiService.get( `/${this.controller}/getByRequestID?RequestID=${RequestID}` );
  }
  postOrUpdate( body: AgreementCreateViewModel ) {
    // if ( body.ID == 0 )
    return this.apiService.post( `/${this.controller}/Post`, body );
    // else
    // return this.apiService.update( `/${this.controller}/Put`, body );
  }

  upload( body: AgreementUploadViewModel ) {
    return this.apiService.post( `/${this.controller}/UploadStaffFinancialOffer`, body );
  }

  approved( item: AgreementViewModel ) {
    return this.apiService.post( `/${this.controller}/ConfirmAgreement?agreementID=${item.ID}`, item );
  }
  decline( item: AgreementCancelViewModel ) {
    return this.apiService.post( `/${this.controller}/DeclineAgreement?agreementID=${item.AgreementID}`, item );
  }
}


