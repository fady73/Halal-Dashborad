import { ApiService } from '../../shared/services/api.service';
import { Injectable } from '@angular/core';
import { AuditPlanCreateViewModel } from './audit-plan-create.model';
import { AuditPlanSearchViewModel } from './audit-plan-search.model';
import { AuditPlanViewModel } from './audit-plan.model';
import { NCRFileCreateViewModel } from './NCR-file-create.model';
import { NCRCreateViewModel } from './ncr/ncr-create.model';
import { NCSCommentCreateViewModel } from './ncs-comment-create.model';

@Injectable( { providedIn: 'root' } )
export class NCRService {

  controller = 'NCR';
  constructor( private apiService: ApiService ) { }


  get( searchViewModel: AuditPlanSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // return this.apiService.get( `/${this.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}&orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=environment.pageSize` );
    return this.apiService.get( `/${this.controller}/get?forStaff=true&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}` );
  }

  getByAuditPlanID( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetByRequestID?requestID=${requestID}` );
  }

  getById( Id: number ) {
    return this.apiService.get( `/${this.controller}/GetByID/${Id}` );
  }

  getByRequestID( requestID: number, version: number = null ) {
    return this.apiService.get( `/${this.controller}/GetByRequestID?requestID=${requestID}&version=${version}` );
  }
  GetNCSAcceptanceByRequestID( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetNCSAcceptanceByRequestID?requestID=${requestID}` );
  }
  getAllVersions( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetAllVersions?requestID=${requestID}` );
  }
  post( body: NCRCreateViewModel ) {
    // if ( body.ID == 0 )
    return this.apiService.post( `/${this.controller}/Post`, body );
    // else
    // return this.apiService.update( `/${this.controller}/Put`, body );
  }
  postNCSComment( body: NCSCommentCreateViewModel[] ) {
    return this.apiService.post( `/${this.controller}/POSTNCSComment`, body );
  }
  // upload( body: AuditPlanUploadViewModel ) {
  //   return this.apiService.post( `/${this.controller}/UploadStaffFinancialOffer`, body );
  // }
  GetNCClosingStatusList() {
    return this.apiService.get( `/${this.controller}/GetNCClosingStatusList` );
  }
  confirmAuditPlanByStaff( requestID ) {
    return this.apiService.post( `/${this.controller}/ConfirmAuditPlanByStaff?requestID=${requestID}`, {} );
  }
  POSTUploadNCR( item: NCRFileCreateViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTUploadNCR`, item );
  }
  approved( item: AuditPlanViewModel ) {
    return this.apiService.post( `/${this.controller}/ConfirmAuditPlan?AuditPlanID=${item.ID}`, item );
  }
  decline( item: AuditPlanViewModel ) {
    return this.apiService.post( `/${this.controller}/DeclineAuditPlan?AuditPlanID=${item.ID}`, item );
  }
}
