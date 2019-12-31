import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecognitionRequestModificationService {

  controller = "RecognitionRequest";
  constructor(private apiService: ApiService) { }
  // name: string, brandId: number, orderBy: string, isAscending: boolean, pageIndex: number, pageSize: number
  get(requestID: number) {
    return this.apiService.get(`/RecognitionRequest/GetRequestModification?requestID=${requestID}`)
  }


  approveRequest(requestID: number, fees: number) {
    return this.apiService.post(`RecognitionRequest/AcceptRequestModification?requestID=${requestID}&fees=${fees}`)
  }

}
