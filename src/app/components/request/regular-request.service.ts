import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegularRequestService {

  controller="RegularRequest";
  constructor(private apiService: ApiService) { }
  // name: string, brandId: number, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number
  get() {
    return this.apiService.get(`/company/GetRequests`)
  }
  
  getProductionFloorAreaInMeterList() {
    return this.apiService.get(`/${this.controller}/GetProductionFloorAreaInMeterList`)
  }
  getProductionFloorAreaInFeetList() {
    return this.apiService.get(`/${this.controller}/GetProductionFloorAreaInFeetList`)
  }
  getEditableByID(id:number) {
    return this.apiService.get(`/${this.controller}/GetEditableByID/${id}`);
  }
  getMarketingCountry(id:number) {
    return this.apiService.get(`/${this.controller}/GetMarketingCountry?regularRequestID=${id}`);
  }
  

  
  
  getBusinessConditions(){
    return this.apiService.get(`/BusinessCondition/getList`)
  }
  getTimeScales(){
    return this.apiService.get(`/TimeScale/getList`)
  }
  

}
