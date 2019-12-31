import { ApiService } from './../../shared/services/api.service';
import { Injectable } from '@angular/core';
import { AuditPlanCreateViewModel } from './audit-plan-create.model';
import { AuditPlanSearchViewModel } from './audit-plan-search.model';
import { AuditPlanViewModel } from './audit-plan.model';
import { NCRFileCreateViewModel } from './NCR-file-create.model';

@Injectable( { providedIn: 'root' } )
export class AuditPlanService {

  controller = 'AuditPlan';
  constructor( private apiService: ApiService ) { }


  get( searchViewModel: AuditPlanSearchViewModel, orderBy: string, isAscending: boolean, pageIndex: number ) {
    // return this.apiService.get( `/${thi  s.controller}/get?forStaff=${forStaff}&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}&orderBy=${orderBy}&isAscending=${isAscending}&pageIndex=${pageIndex}&pageSize=environment.pageSize` );
    return this.apiService.get( `/${this.controller}/get?forStaff=true&companyID=${searchViewModel.CompanyID}&countryID=${searchViewModel.CountryID}` );
  }


  getById( Id: number ) {
    return this.apiService.get( `/${this.controller}/GetByID/${Id}` );
  }
  getByRequestID( requestID: number, version: number = null ) {
    if ( version == 0 )
      return this.apiService.get( `/${this.controller}/GetByRequestID?requestID=${requestID}` );
    else
      return this.apiService.get( `/${this.controller}/GetByRequestID?requestID=${requestID}&version=${version}` );
  }
  getAllVersions( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetAllVersions?requestID=${requestID}` );
  }

  post( body: AuditPlanCreateViewModel ) {
    // if ( body.ID == 0 )
    return this.apiService.post( `/${this.controller}/Post`, body );
    // else
    // return this.apiService.update( `/${this.controller}/Put`, body );
  }

  // upload( body: AuditPlanUploadViewModel ) {
  //   return this.apiService.post( `/${this.controller}/UploadStaffFinancialOffer`, body );
  // }
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