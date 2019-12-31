import { ApiService } from 'src/app/shared/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NcrService {
 controller="NCR";
  constructor(private apiService:ApiService) { }
  getByAuditPlanID(id:number)
  {
    return this.apiService.get(`${this.controller}/GetByAuditPlanID?auditPlanID=${id}`);
  }

  getByRequestID(id:number){
    return this.apiService.get(`${this.controller}/GetByRequestID?requestID=${id}`);
  }
  POSTNCSCABAcceptance(ncs:any)
  {
    return this.apiService.post(`${this.controller}/POSTNCSCABAcceptance`,ncs);
  }
  POSTCorrectiveAction(ncs:any)
  {
    return this.apiService.post(`${this.controller}/POSTCorrectiveAction`,ncs);
  }
  UploadSuppliedDocument(ncs:any)
  {
    return this.apiService.post(`${this.controller}/UploadSuppliedDocument`,ncs);
  }
  SaveNCS(ncs:any){
    return this.apiService.post(`${this.controller}/SaveNCS`,ncs);
  }
  
}
