import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppealModel } from './appeal-model';
import { AppealCancleModel } from './appeal-cancle-model';

@Injectable({
  providedIn: 'root'
})
export class AppealService {

  constructor(private apiService: ApiService) { }
  get(RequestID: number) {
    // tslint:disable-next-line:max-line-length
    return this.apiService.get(`AppealRequest/Get?requestID=${RequestID}&companyID=null&orderBy=null&isAscending=null&pageIndex=null&pageSize=null`);
  }
  approvedappeal( item: AppealModel ) {
    return this.apiService.post( `AppealRequest/AcceptAppeal?appealID=${item.appealID}`, item );
  }
  cancelappeal( item: AppealCancleModel ) {
    return this.apiService.post( `AppealRequest/RejectAppeal`,item);
  }
}
