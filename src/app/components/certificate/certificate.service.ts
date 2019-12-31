import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';
import { CertificateSearchViewModel } from './certificate-search.model';
import { CertificateUploadViewModel } from './certificate-upload.model';
@Injectable( {
  providedIn: 'root'
} )
export class CertificateService {
  controller = 'Request';
  constructor( private apiService: ApiService ) { }
  get( forStaff: boolean = true, searchViewModel: CertificateSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}&orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=environment.pageSize` );
    return this.apiService.get( `/${this.controller}/GetCertificates?requestType=${searchViewModel.TypeID}&requestStatus=${searchViewModel.StatusID}&CountryID=${searchViewModel.CountryID}&CompanyID=${searchViewModel.CompanyID}&ToDate=${searchViewModel.ToDate}&FromDate=${searchViewModel.FromDate}&orderBy=${orderBy}&pageIndex=${pageIndex}&isAscending=${isAscending}&pageSize=${environment.pageSize}` );
  }

  getByRequestID( ID: number ) {
    return this.apiService.get( `/${this.controller}/GetCertificates?requestID=${ID}` );
  }
  getById( Id: number ) {
    return this.apiService.get( `/${this.controller}/GetByID/${Id}` );
  }
  upload( body: CertificateUploadViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTHalaCertificate`, body );
  }
}
