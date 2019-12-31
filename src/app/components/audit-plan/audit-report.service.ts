import { ApiService } from '../../shared/services/api.service';
import { Injectable } from '@angular/core';
import { AuditPlanCreateViewModel } from './audit-plan-create.model';
import { AuditPlanSearchViewModel } from './audit-plan-search.model';
import { AuditPlanViewModel } from './audit-plan.model';
import { NCRFileCreateViewModel } from './NCR-file-create.model';
import { NCRCreateViewModel } from './ncr/ncr-create.model';
import { NCSCommentCreateViewModel } from './ncs-comment-create.model';
import { AuditReportSection1CreateViewModel } from './audit-report-section1-create-view.model';
import { AuditReportSection3CreateViewModel } from './audit-report-section3-create-view.model';
import { AuditReportSection2CreateViewModel } from './audit-report-section2-create-view.model';

@Injectable( { providedIn: 'root' } )
export class AuditReportService {

  controller = 'AuditReport';
  constructor( private apiService: ApiService ) { }

  get( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetByRequestID?requestID=${requestID}` );
  }

  GetSection3ByRequestID( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetSection3ByRequestID?requestID=${requestID}` );
  }

  GetSection2ByRequestID( requestID: number ) {
    return this.apiService.get( `/${this.controller}/GetSection2ByRequestID?requestID=${requestID}` );
  }

  getProductCategory() {
    return this.apiService.get( `/ProductCategory/GetList` );
  }
  POSTSection1( body: AuditReportSection1CreateViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTSection1`, body );
  }
  POSTSection2( body: AuditReportSection2CreateViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTSection2`, body );
  }
  POSTSection3( body: AuditReportSection3CreateViewModel ) {
    return this.apiService.post( `/${this.controller}/POSTSection3`, body );
  }
}
